
(function () {
    'use strict';
    var network = new Lampa.Reguest();
    var num;
    function douban_review(kpid, imdbid, num) {
        // Lampa.Controller.toggle('full_start');
        if (kpid != '') {
            $.get('https://movie.douban.com/j/subject_suggest?q=' + imdbid, function (data) { 
                if (data.length) {
                    network["native"]('https://m.douban.com/rexxar/api/v2/movie/' + data[0].id + '/interests?count=30&order_by=hot&anony=0&start=0&ck=&for_mobile=1', function (json) {
                        var button = json.interests.map(function (element) {
                            return '<div class="items-line__head" style="margin-bottom: 0.4em;"><div class="items-line__title">' + element.create_time + '</div><div>' + (element.rating ? element.rating.value + '颗星 ' : '') + '评论人: ' + element.user.name + '</div></div><div class="items-line__body"><div class="full-descr"><div class="full-descr__left"><div>' + element.comment + '</div></div></div></div>';
                        }).join('');


                        var modal = $('<div><div class="broadcast__text" style="text-align:left"><div class="otzyv">' + button + '</div></div></div>');
                        // var enabled = Lampa.Controller.enabled().name;
                        Lampa.Modal.open({
                            title: "",
                            html: modal,
                            size: "large",
                            mask: !0,
                            onBack: function () {
                                Lampa.Modal.close(), Lampa.Controller.toggle('full_start')
                                // Lampa.Controller.toggle(enabled)
                            },
                            onSelect: function () { }
                        });
                    }, function (a, c) {
                        // console.log(a.responseJSON)
                        if (a.responseJSON.code == 1287) {
                            Lampa.Noty.show('只支持在Android客户端上展示。');
                        } else {
                            Lampa.Noty.show(network.errorDecode(a, c));
                        }
                    }, false, {
                        dataType: 'json',
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
                            'Referer': "https://m.douban.com/movie/subject/" + data[0].id + "/comments"
                        }
                    });
                } else {
                    Lampa.Noty.show('没有找到影评。');  
                }

            });

        }
        network.clear();
    }
    // $('.otzyvb').on('hover:enter', function () {
    //     console.log(123);
    // });

    function startPlugin() {
        window.douban_reviewplugin = true;
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var num = 0;
                $('.full-start-new__buttons').append('<div class="full-start__button selector button--db"><svg height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="1.5" y="1.5" width="25" height="31" rx="2.5" stroke="currentColor" stroke-width="3"></rect><rect x="6" y="7" width="9" height="9" rx="1" fill="currentColor"></rect><rect x="6" y="19" width="16" height="3" rx="1.5" fill="currentColor"></rect><rect x="6" y="25" width="11" height="3" rx="1.5" fill="currentColor"></rect><rect x="17" y="7" width="5" height="3" rx="1.5" fill="currentColor"></rect> </svg><span>影评</span></div>');
                $('.button--db').on('hover:enter', function (card) {
                    if (num > 9) num = 0;
                    douban_review(e.data.movie['kinopoisk_id'], e.data.movie['imdb_id'], num);
                    num += 1;
                });
            }
        });

    }
    if (!window.douban_reviewplugin) startPlugin();
})();

