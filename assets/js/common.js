// Vanilla lazy loading + Masonry layout (no jQuery).
document.addEventListener("DOMContentLoaded", function () {
    var grids = [];

    if (window.Masonry) {
        document.querySelectorAll(".grid").forEach(function (grid) {
            var msnry = new Masonry(grid, {
                percentPosition: true,
                itemSelector: ".grid-item",
                columnWidth: ".grid-sizer"
            });
            grids.push({ el: grid, msnry: msnry });
            if (window.imagesLoaded) {
                imagesLoaded(grid).on("progress", function () {
                    msnry.layout();
                });
            }
        });
    }

    // Batch relayouts: many images finishing together trigger one layout
    // per grid instead of one per image.
    var dirty = new Set();
    var layoutTimer = null;

    function flushLayouts() {
        layoutTimer = null;
        dirty.forEach(function (entry) { entry.msnry.layout(); });
        dirty.clear();
    }

    function relayout(el) {
        for (var i = 0; i < grids.length; i++) {
            if (grids[i].el.contains(el)) {
                dirty.add(grids[i]);
                if (!layoutTimer) layoutTimer = setTimeout(flushLayouts, 120);
                return;
            }
        }
    }

    function loadElement(el) {
        var src = el.getAttribute("data-src");
        if (!src) return;
        if (el.tagName === "IMG") {
            el.addEventListener("load", function () {
                el.classList.add("loaded");
                relayout(el);
            }, { once: true });
            el.src = src;
        } else {
            var img = new Image();
            img.addEventListener("load", function () {
                el.style.backgroundImage = "url('" + src + "')";
                el.style.backgroundSize = "cover";
                el.style.backgroundPosition = "center";
                el.classList.add("loaded");
                relayout(el);
            }, { once: true });
            img.src = src;
        }
        el.removeAttribute("data-src");
    }

    document.querySelectorAll(".lazy.always-load").forEach(loadElement);

    var deferred = document.querySelectorAll("img.lazy[data-src], div.lazy[data-src]");
    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    loadElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "300px 0px" });
        deferred.forEach(function (el) { observer.observe(el); });
    } else {
        deferred.forEach(loadElement);
    }
});
