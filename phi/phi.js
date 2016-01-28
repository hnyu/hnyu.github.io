// currently depends on sylvester
// should implement vector computation instead

// I = (1+e)N(Vb-Va)N/(1/ma+1/mb)
// Va += I/ma
// Vb -= I/mb
// b moves towards a, where e=min(ea, eb)

var PHI = (function(){
    // private
    var origin = $V([0, 0]);
    var e = [$V([1, 0]), $V([0, 1])];
    var jumpTable = {
	'rect': {'rect': rectVsRect,
		 'circle': rectVsCircle},
	'circle': {'rect': rectVsCircle,
		   'circle': circleVsCircle}
    };
    var scJumpTable = {
	'rect': {'rect': rectClosestPoints,
		 'circle': rectCircleClosestPoints},
	'circle': {'rect': rectCircleClosestPoints,
		   'circle': circleClosestPoints}
    };
    var tolerance = 1e-10;

    // public
    var gravity = 9.8;
    // this is the simulation timestep, not the actual computational time between frames
    // the smaller this value is, the smaller step we take between frames
    // and the better simulation results
    // but the poorer efficiency
    var timestep = 1 / 30; 

    function kineticRectToPhiRect(kRect, v){
	var phiRect = new Rect(kRect.position().x,
			       kRect.position().y,
			       kRect.width() / 2,
			       kRect.height() / 2,
			       kRect.rotation() * Math.PI / 180,
			       v);
	return phiRect;
    }

    function kineticCircleToPhiCircle(kCircle, v){
	var phiCircle = new Circle(kCircle.position().x,
				   kCircle.position().y,
				   kCircle.radius(),
				   v);
	return phiCircle;
    }

    // rot: the angle with x-asix in clockwise direction
    // x, y: right, up
    function Rect(x, y, w, h, rot, v){
	this.u = [];
	this.x = [];
	this.x[0] = w;
	this.x[1] = h;    
	this.u[0] = e[0].rotate(-rot, origin);
	this.u[1] = e[1].rotate(-rot, origin);    
	this.center = $V([x, -y]);
	if (w * h == 0){
	    this.invM = 0;
	} else{
	    this.invM = 1 / (4*w*w*h*h);
	}
	this.restitution = 0.2; // hard-wired	
	this.shape = 'rect';
	this.velocity = v;
    }
    
    function Circle(x, y, r, v){	
	this.r = r;
	this.center = $V([x, -y]);
	if (r == 0){
	    this.invM = 0;
	} else{
	    this.invM = 1 / (Math.PI*r*r); 
	}
	this.restitution = 0.1; // hard-wired
	this.shape = 'circle';
	this.velocity = v;
    }

    function Manifold(o1, o2){
	this.oA = o1;
	this.oB = o2;
	this.penetration = Number.POSITIVE_INFINITY;
	this.normal = $V([1,0]);
    }
    
    /////////////////////// discrete collision detection ////////////////////

    function rectVsRect(manifold){
	var min = [], max = [], axes, depth;
	var rects = [manifold.oA, manifold.oB];
	var trans, rr, w, h, oldPositions, newPositions;
	for (var k = 0; k < 2; k ++){
	    // translation from rects[k] to rects[1-
	    trans = rects[1-k].center.subtract(rects[k].center);
	    w = rects[1-k].x[0];
	    h = rects[1-k].x[1];
	    rr = Math.acos(rects[k].u[0].dot(rects[1-k].u[0]));
	    if (rects[k].u[0].dot(rects[1-k].u[1]) > 0){
		rr = -rr;
	    }
	    oldPositions = [$V([w,h]),$V([-w,h]),$V([-w,-h]), $V([w,-h])];
	    newPositions = oldPositions.map(function (v){
		return v.rotate(rr, origin);
	    });
	    for (var i = 0; i < rects[k].u.length; i ++){
		min[k] = -rects[k].x[i];
		max[k] = rects[k].x[i];	    
		axes = newPositions.map(function (p){
		    return p.dot(e[i])+trans.dot(rects[k].u[i]);
		});
		min[1-k] = Math.min.apply(Math, axes);
		max[1-k] = Math.max.apply(Math, axes);
		if (max[k] < min[1-k] || max[1-k] < min[k]){
		    manifold.penetration = -1;
		    return false;
		}
		// generate the manfiold
		// take the smallest penetration
		depth = Math.abs(max[k] - min[1-k]);
		if (manifold.penetration > depth){
		    manifold.penetration = depth;
		    manifold.normal = rects[k].u[i];
		}
		depth = Math.abs(min[k] - max[1-k]);
		if (manifold.penetration > depth){
		    manifold.penetration = depth;
		    manifold.normal = rects[k].u[i].x(-1);
		}
	    }
	}	
	return true;
    }

    function rectVsCircle(manifold){
	var min, max, trans, rr, w, h, depth, R, distance, flag = false;
	var rect = manifold.oA;
	var circle = manifold.oB;
	if (rect.shape == 'circle'){
	    var tmp = rect; // swap
	    rect = circle;
	    circle = tmp;
	}	    
	trans = circle.center.subtract(rect.center);
	// four faces
	R = $M([[rect.u[0].e(1), rect.u[0].e(2)],
		[rect.u[1].e(1), rect.u[1].e(2)]]);
	rr = R.x(trans);
	for (var i = 0; i < rect.u.length; i ++){
	    min = -rect.x[i];
	    max = rect.x[i];
	    if (rr.e(i+1) + circle.r < min || rr.e(i+1) - circle.r > max){
		manifold.penetration = -1;
		return false;
	    }
	    depth = Math.abs(rr.e(i+1)+circle.r-min);
	    if (manifold.penetration > depth){
		manifold.penetration = depth;
		manifold.normal = rect.u[i].x(-1);
	    }
	    depth = Math.abs(rr.e(i+1)-circle.r-max);
	    if (manifold.penetration > depth){
		manifold.penetration = depth;
		manifold.normal = rect.u[i];
	    }
	}
	w = rect.x[0];
	h = rect.x[1];	
	if (Math.abs(rr.e(1)) <= w || Math.abs(rr.e(2)) <= h){
	    return true;
	}
	manifold.penetration = -1;
	// four vertices
	var vertices = [$V([w,h]),$V([-w,h]),$V([-w,-h]), $V([w,-h])];

	for (var i = 0; i < vertices.length; i ++){
	    if (rr.e(1)*vertices[i].e(1) > 0 &&
		rr.e(2)*vertices[i].e(2) > 0){
		distance = rr.subtract(vertices[i]);
		depth = circle.r - distance.distanceFrom(origin);
		if (depth > 0){
		    flag = true;
		    manifold.penetration = depth;
		    manifold.normal = R.transpose().x(distance).toUnitVector();
		}
	    }
	}
	return flag;
    }

    function circleVsCircle(manifold){
	var circle1 = manifold.oA;
	var circle2 = manifold.oB;
	var dis = circle1.center.subtract(circle2.center);
	manifold.penetration = circle1.r + circle2.r - dis.distanceFrom(origin);
	manifold.normal = dis.toUnitVector();
	return manifold.penetration >= 0;
    }
    
    function shapeVsShape(manifold){
	return (jumpTable[manifold.oA.shape][manifold.oB.shape])(manifold);
    }

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    function supportPoint(rect, d){
	var a = rect.u[0].dot(d);
	var c = rect.u[1].dot(d);
	var b = rect.u[0].dot($V([-d.e(2),d.e(1)]));
	var d = rect.u[1].dot($V([-d.e(2),d.e(1)]));
	var w = rect.x[0];
	var h = rect.x[1];
	// mush be clockwise or anti-clockwise (linked list)
	var vertices = [$V([w,h]), $V([w,-h]), $V([-w,-h]), $V([-w,h])];	
	var xprojs = vertices.map(function (x){
	    return x.e(1) * a + x.e(2) * c;
	});	
	var yprojs = vertices.map(function (x){
	    return x.e(1) * b + x.e(2) * d;
	});
	var sp, support = Number.NEGATIVE_INFINITY, y = Number.POSITIVE_INFINITY;
	for (var i = 0; i < vertices.length; i ++){
	    if (xprojs[i] > support - tolerance){
		if (xprojs[i] > support + tolerance
		    || yprojs[i] < y){
		    support = xprojs[i];
		    sp = vertices[i];
		    y = yprojs[i];
		}
	    }
	}	
	return $V([sp.e(1)*rect.u[0].e(1)+sp.e(2)*rect.u[1].e(1),
		   sp.e(1)*rect.u[0].e(2)+sp.e(2)*rect.u[1].e(2)]).add(rect.center);
    }

    function supportPointDiff(rectA, rectB, d){
	var spA = supportPoint(rectA, d);
	var spB = supportPoint(rectB, d.x(-1));
	return spA.subtract(spB);
    }

    function closePointOnSegmentToPoint(p, x, y){
	var xy = y.subtract(x);
	var xp = p.subtract(x);
	var t = xp.dot(xy) / xy.dot(xy);
	if (t <= 0){
	    return x;
	} else if (0 < t && t < 1){
	    return x.add(xy.x(t));
	} else{
	    return y;
	}	
    }

    function distanceFromPointToSegment(p, x, y){
	var closestPoint = closePointOnSegmentToPoint(p, x, y);
	return p.distanceFrom(closestPoint);
    }

    /////////////////////////// contact solver ///////////////////////////
    
    function contactSolver(manifold, dt){
	var A = manifold.oA;
	var B = manifold.oB;
	var closeVector, normal, maxDistance;
	// no collision, compute closest points
	if (manifold.penetration < 0){
	    closeVector = (scJumpTable[A.shape][B.shape])(A, B);
	    normal = closeVector.toUnitVector();
	    maxDistance = closeVector.distanceFrom(origin);	
	} else{
	    normal = manifold.normal;
	    maxDistance = -manifold.penetration;
	}
	if (normal.dot(B.center.subtract(A.center)) < 0)
	    normal= normal.x(-1);

	var vAB = A.velocity.subtract(B.velocity);
	var pVAB = vAB.dot(normal);
	if (dt * pVAB <= maxDistance) // do nothing
	    return false;
	var remove = pVAB - maxDistance / dt;
	var I = normal.x(remove / (A.invM + B.invM));
	A.velocity = A.velocity.subtract(I.x(A.invM));
	B.velocity = B.velocity.add(I.x(B.invM));
	return true;
    }

    // rectA and rectB must not overlap!
    function rectClosestPoints(rectA, rectB){
	var d = $V([1,0]); // this direction can be arbitary
	var X, Y, Z, XY, ax, ay, bx, by, az, bz;
	ax = supportPoint(rectA, d);
	bx = supportPoint(rectB, d.x(-1));
	X = ax.subtract(bx);
	ay = supportPoint(rectA, d.x(-1));
	by = supportPoint(rectB, d);
	Y = ay.subtract(by);
	while (true){
	    XY = X.subtract(Y);
	    d = $V([-XY.e(2),XY.e(1)]).toUnitVector();
	    if (d.dot(X) > 0){
		d = d.x(-1); // d towards origin
	    }
	    az = supportPoint(rectA, d);
	    bz = supportPoint(rectB, d.x(-1));
	    Z = az.subtract(bz);
	    if (Math.abs(d.dot(X) - d.dot(Z)) < tolerance){
		var p = closePointOnSegmentToPoint(origin, X, Y);
		// do something
		// p = t * X + (1-t) * Y
		//   = t * (ax - bx) + (1-t) * (ay - by)
		//   = (t*ax + (1-t)*ay) - (t*bx + (1-t)*by)
		var t = p.subtract(Y).distanceFrom(origin) 
		    / X.subtract(Y).distanceFrom(origin);		
		var A = ax.x(t).add(ay.x(1-t));
		var B = bx.x(t).add(by.x(1-t));
		// A and B is the pair of the closest points
		return A.subtract(B);
	    }
	    if (distanceFromPointToSegment(origin, X, Z) >
		distanceFromPointToSegment(origin, Y, Z)){		
		X = Z;
		ax = az;
		bx = bz;
	    } else{
		Y = Z;
		ay = az;
		by = bz;
	    }
	}
    }

    function rectCircleClosestPoints(rect, circle){
	if (rect.shape == 'circle'){
	    var tmp = rect; // swap
	    rect = circle;
	    circle = tmp;
	}	
	var a = rect.u[0].e(1);
	var b = rect.u[0].e(2);
	var c = rect.u[1].e(1);
	var d = rect.u[1].e(2);
	var w = rect.x[0];
	var h = rect.x[1];
	var vertices = [$V([w,h]), $V([w,-h]), $V([-w,-h]), $V([-w,h])];
	vertices = vertices.map(function (p){
	    return $V([p.e(1)*a+p.e(2)*c,p.e(1)*b+p.e(2)*d]).add(rect.center);
	});
	
	var closest = Number.POSITIVE_INFINITY, closestPoint, p, dis;
	for (var i = 0; i < vertices.length; i ++){
	    p = closePointOnSegmentToPoint(circle.center, vertices[i], 
					   vertices[(i+1)%vertices.length]);
	    dis = p.distanceFrom(circle.center);
	    if (dis < closest){
		closest = dis;
		closestPoint = p;
	    }
	}
	return closestPoint.subtract(circle.center).x((closest-circle.r)/closest);
    }

    function circleClosestPoints(circle1, circle2){
	var closeVector = circle2.center.subtract(circle1.center);
	var distance = closeVector.distanceFrom(origin);
	return closeVector.x((distance-circle1.r-circle2.r)/distance);
    }

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    ///////////////////////////////// resolve collision ///////////////////////////////
    // needswork: rotation
    function resolveCollision(manifold){
	var A = manifold.oA;
	var B = manifold.oB;
	// do not resolve two infinite-mass objects
	if (A.invM == 0 && B.invM == 0) return;
	var e = Math.min(A.restitution, B.restitution);
	var N;
	if (manifold.normal.dot(B.center.subtract(A.center)) < 0){
	    N = manifold.normal;
	} else{
	    N = manifold.normal.x(-1);
	}
	// do not resolve two objects that are separating
	var velAlongNormal = N.dot(B.velocity.subtract(A.velocity));
	if (velAlongNormal < 0) return;
	var wA = A.invM/(A.invM+B.invM);
	var wB = B.invM/(A.invM+B.invM);
	// resolve velocity
	var I = N.x((1+e)*velAlongNormal);
	manifold.oA.velocity = A.velocity.add(I.x(wA));
	manifold.oB.velocity = B.velocity.subtract(I.x(wB));
	//// resolve penetration
	//// shouldn't do this if we have contact solver
	// var d = manifold.penetration;
	// manifold.oA.center = A.center.add(N.x(d*wA));
	// manifold.oB.center = B.center.subtract(N.x(d*wB));
    }
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // export 
    return {
	Rect: Rect,
	Circle: Circle,
	rectVsRect: rectVsRect,
	rectVsCircle: rectVsCircle,
	circleVsCircle: circleVsCircle,
	Manifold: Manifold,
	gravity: gravity,
	kineticRectToPhiRect: kineticRectToPhiRect,
	kineticCircleToPhiCircle: kineticCircleToPhiCircle,
	shapeVsShape: shapeVsShape,
	resolveCollision: resolveCollision,
	contactSolver: contactSolver,
	timestep: timestep
    };
})();


// 