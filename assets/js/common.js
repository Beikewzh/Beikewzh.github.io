// Backstop loader for any legacy `.lazy` elements with data-src (older
// showcase item bodies). Current pages use native loading="lazy" instead.
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img.lazy[data-src], div.lazy[data-src]").forEach(function (el) {
        var src = el.getAttribute("data-src");
        if (!src) return;
        if (el.tagName === "IMG") {
            el.src = src;
        } else {
            el.style.backgroundImage = "url('" + src + "')";
            el.style.backgroundSize = "cover";
            el.style.backgroundPosition = "center";
        }
        el.removeAttribute("data-src");
        el.classList.add("loaded");
    });
});
