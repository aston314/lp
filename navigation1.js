'use strict';
(function () {
    Lampa.Listener.follow("app", function (e$jscomp$7) {
        if (e$jscomp$7.type == "ready") {
            setTimeout(function () {
                $("[data-action=collections]").eq(0).remove();
                $("[data-action=relise]").eq(0).remove();
                $("[data-action=anime]").eq(0).remove();
            }, 10);
        }
    });
})();
