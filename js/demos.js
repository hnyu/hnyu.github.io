// Each demo has a title, a one-line description, and a list
// of media items. A media item is either a local video file ({video: path},
// with a poster frame so mobile browsers show something before playback), a
// YouTube video ({youtube: video_id}), or a still photo ({image: path}).
// A demo may also set `columns` to override the media grid's column widths,
// which is how a row of differing aspect ratios is kept level.
var demos = [
    {title: "NVIDIA GB300 tester busbar assembly",
     description: "A robot assembling busbars on NVIDIA GB300 tester boards. For the full long-horizon task, it has to place the busbar and jigs on the board, tighten screws following a specific order, and remove the jigs.",
     media: [
         {youtube: "ZSXQW6PLJrM", caption: "Live at GTC 2026"},
         {video: "./assets/busbar_grid.mp4", poster: "./assets/posters/busbar_grid.jpg", caption: "Policy robust to distractors and lighting changes"}
     ]
    },
    {title: "Humanoid desk cleanup",
     description: "A humanoid robot cleaning a desk by putting containers into a bin.",
     media: [
         {video: "./assets/desk_cleanup.mp4", poster: "./assets/posters/desk_cleanup.jpg", caption: "Bimanual pick & place trained with offline RL for behavior efficiency"},
         {video: "./assets/desk_cleanup_clutter.mp4", poster: "./assets/posters/desk_cleanup_clutter.jpg", caption: "Clearing a cluttered desk with bowls, a mug, a box, a can and an apple"}
     ]
    },
    {title: "SLIM",
     description: "A quadrupedal mobile manipulator performing long-horizon pick-and-place "
                + "outdoors, over mulch and grass, around obstacles and distractors. The "
                + "visuomotor policy is trained in simulation and transferred to the real "
                + "robot <b>zero-shot</b>. The policy is conditioned on a single monocular "
                + "RGB wrist camera, the proprioception and a text command. "
                + "Demos shown below are from a single policy, with no fine-tuning or adaptation.",
     media: [
         {video: "./assets/slim_mulch.mp4", poster: "./assets/posters/slim_mulch.jpg", caption: "[Mulch] red cube -> red basket"},
         {video: "./assets/slim_obstacle.mov", poster: "./assets/posters/slim_obstacle.jpg", caption: "[Obstacles] red cube -> blue basket"},
         {video: "./assets/slim_grass.MOV", poster: "./assets/posters/slim_grass.jpg", caption: "[Grass] yellow cube -> red basket"},
         {video: "./assets/slim_distractors.mov", poster: "./assets/posters/slim_distractors.jpg", caption: "[Concrete surface] green cube -> red basket"},
     ]
    }
];

// Real-world deployments, rendered by the same code as the demos above.
var deployment = [
    // One clip per row at full page width: these are headline results, and a
    // factory line carries detail that a half-width tile loses.
    {columns: "minmax(0, 1fr)",
     description: "Bimanual UR deployed on a real assembly line at the Foxconn factory in Texas, July 2026 (<a href='https://blogs.nvidia.com/blog/skild-ai-s1-physical-ai/'>NVIDIA blog</a>). "
                + "The robot is an upgraded version of the one from the GTC demo.",
     media: [
         {video: "./assets/server_factory.mp4", poster: "./assets/posters/server_factory.jpg"}
     ]
    }
];
