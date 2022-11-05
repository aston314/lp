'use strict';
(function () {
    function naviSettings() {
        setTimeout(function () {
            $("[data-action=collections]").eq(0).remove();
            $("[data-action=relise]").eq(0).remove();
            $("[data-action=anime]").eq(0).remove();
        }, 10);
    }

    if (window.appready) naviSettings()
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') naviSettings()
        })
    }
})();
