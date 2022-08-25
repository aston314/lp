(function () {
    'use strict';

    Lampa.Listener.follow('app', (e) => {
        if (e.type == 'ready') {
            setTimeout(function () {
                $("[data-action=collections]").eq(0).remove();
                $("[data-action=relise]").eq(0).remove();
                $("[data-action=anime]").eq(0).remove();
            }, 10);
        }
    });

})();
