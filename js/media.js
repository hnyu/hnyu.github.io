// Renders a list of media entries (see demos.js for the shape) into the page.
// Shared by the Demos and Deployment sections, which differ only in their data.
// Uses document.write, so it must be called from an inline script sitting where
// the markup belongs, exactly as the publication list does.
function writeMediaEntries(entries) {
    for (var i = 0; i < entries.length; i += 1) {
        var entry = entries[i];
        document.write("<div class='demo-entry'>");
        // A lone clip needs no heading of its own; the section's own <h4> says it.
        if ("title" in entry) {
            document.write("<p class='demo-title'>");
            if ("url" in entry) {
                document.write("<a href='" + entry["url"] + "'>" + entry["title"] + "</a>");
            } else {
                document.write(entry["title"]);
            }
            document.write("</p>");
        }
        if ("description" in entry) {
            document.write("<p class='demo-desc'>" + entry["description"] + "</p>");
        }
        // Set as a custom property, not grid-template-columns directly, so the
        // one-column phone rule in the stylesheet still takes precedence.
        document.write("<div class='demo-media'"
                       + ("columns" in entry
                          ? " style='--demo-cols: " + entry["columns"] + "'" : "")
                       + ">");
        for (var j = 0; j < entry["media"].length; j += 1) {
            var item = entry["media"][j];
            var label = "title" in entry ? entry["title"] : "";
            document.write("<figure class='demo-item'>");
            if ("youtube" in item) {
                document.write("<iframe src='https://www.youtube.com/embed/" + item["youtube"]
                               + "' title='" + label + "' frameborder='0' allowfullscreen"
                               + " allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'>"
                               + "</iframe>");
            } else if ("image" in item) {
                document.write("<img class='demo-photo' src='" + item["image"]
                               + "' alt='" + label + "' loading='lazy'>");
            } else {
                // Poster frame + no preload: mobile browsers ignore preload='metadata'
                // and would otherwise show an empty box until the clip is tapped.
                // loop: these are short task clips, so they repeat until the
                // viewer stops them. Only local clips -- the YouTube embed is
                // handled above and has its own player.
                document.write("<video controls playsinline loop preload='none'"
                               + ("poster" in item ? " poster='" + item["poster"] + "'" : "")
                               + ">");
                document.write("<source src='" + item["video"] + "' type='video/mp4'>");
                document.write("</video>");
            }
            if ("caption" in item) {
                document.write("<figcaption>" + item["caption"] + "</figcaption>");
            }
            document.write("</figure>");
        }
        document.write("</div>");
        document.write("</div>");
    }
}
