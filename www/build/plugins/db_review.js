
(function () {
    'use strict';
    var network = new Lampa.Reguest();
    var num;
    function douban_review(object, kpid, imdbid, num , type, typename) {
        var _this = this;
        var display = '热门短评';
        // Lampa.Controller.toggle('full_start');
        if (kpid != '') {
            Lampa.Modal.open({
                title: '',
                html: Lampa.Template.get('modal_loading'),
                size: 'small',
                align: 'center',
                mask: true,
                onBack: function onBack() {
                    Lampa.Modal.close();
                    Lampa.Api.clear();
                    Lampa.Controller.toggle('full_start');
                }
            });
            // $.get('https://movie.douban.com/j/subject_suggest?q=' + imdbid, function (data) {
            network["native"]('https://movie.douban.com/j/subject_suggest?q=' + imdbid, function (data) {

                if (data.length) {
                    var html = $('<div></div>');
                    var navigation = $('<div class="navigation-tabs"></div>');
                    var tabs = [];
                    tabs.push({
                        name: '热门影评',
                        type: 'hot'
                    }, {
                        name: '最新影评',
                        type: 'latest'
                    });

                    tabs.forEach(function (tab, i) {
                        var ifplaynow = (typename === tab.name) ? "active" : "selector";
                        var button = $('<div class="navigation-tabs__button ' + ifplaynow + '">' + tab.name + '</div>');
                        button.on('hover:enter', function () {
                            display = tab.name;
                            douban_review(object, kpid, imdbid, num, tab.type, tab.name);
                        });
                        // if (tab.name == display) button.addClass('active');
                        if (i > 0) navigation.append('<div class="navigation-tabs__split">|</div>');
                        navigation.append(button);
                    });
                    html.append(navigation);

                    network["native"]('https://m.douban.com/rexxar/api/v2/movie/' + data[0].id + '/interests?count=30&order_by='+type+'&anony=0&start=0&ck=&for_mobile=1', function (json) {
                        Lampa.Modal.close();
                        // var button = json.interests.map(function (element) {
                        //     return '<div class="items-line__head" style="margin-bottom: 0.4em;"><div class="items-line__title">' + element.create_time + '</div><div>' + (element.rating ? element.rating.value + '颗星 ' : '') + '评论人: ' + element.user.name + '</div></div><div class="items-line__body"><div class="full-descr"><div class="full-descr__left"><div>' + element.comment + '</div></div></div></div>';
                        // }).join('');

                        json.interests.forEach(function (element) {
                            var item = Lampa.Template.get('notice_card', {});
                            var icon = object.data.movie.img.replace('w500', 'w300');
                            var author_data = {};
                            var author_html;
                            item.addClass('image--poster');
                            item.find('.notice__title').html((element.rating ? element.rating.value + '颗星' : ''));
                            item.find('.notice__descr').html(element.comment);
                            item.find('.notice__time').html(element.create_time);


                            author_html = $("<div class=\"notice__author\">\n                    <div class=\"notice__author-img\">\n                        <img />\n                    </div>\n                    <div class=\"notice__author-body\">\n                        <div class=\"notice__author-name\"></div>\n                        <div class=\"notice__author-text\"></div>\n                    </div>\n                </div>");
                            author_html.find('.notice__author-name').html(element.user.name);
                            author_html.find('.notice__author-text').html((element.user.loc ? element.user.loc.name : '') + (element.user.gender == 'M' ? ' 男生' : ' 女生'));
                            item.find('.notice__body').append(author_html);


                            item.on('visible', function () {
                                if (icon) {
                                    if (icon.indexOf('http') == -1) icon = Lampa.TMDB.image('t/p/w300/' + icon);
                                    var img_icon = item.find('.notice__left img')[0] || {};
                                    var img_author = item.find('.notice__author img')[0] || {};

                                    img_icon.onload = function () {
                                        item.addClass('image--loaded');
                                    };

                                    img_icon.onerror = function () {
                                        img_icon.src = './img/img_broken.svg';
                                    };

                                    img_author.onload = function () {
                                        item.addClass('image-author--loaded');
                                    };

                                    img_author.onerror = function () {
                                        img_author.src = './img/img_broken.svg';
                                    };

                                    img_icon.src = icon;
                                    img_author.src = element.user.avatar;
                                }
                            });
                            html.append(item);
                        });


                        // var modal = $('<div><div class="broadcast__text" style="text-align:left"><div class="otzyv">' + button + '</div></div></div>');
                        // var enabled = Lampa.Controller.enabled().name;
                        Lampa.Modal.open({
                            title: "",
                            html: html,//modal,
                            size: "large",
                            mask: !0,
                            onBack: function () {
                                Lampa.Modal.close(), Lampa.Controller.toggle('full_start')
                                // Lampa.Controller.toggle(enabled)
                            },
                            onSelect: function () { }
                        });
                    }, function (a, c) {
                        if (a.responseJSON.code == 1287) {
                            Lampa.Noty.show('只支持在Android客户端上展示。');
                        } else {
                            Lampa.Noty.show(network.errorDecode(a, c));
                        }
                        Lampa.Modal.close();
                        Lampa.Controller.toggle('full_start');
                    }, false, {
                        dataType: 'json',
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
                            'Referer': "https://m.douban.com/movie/subject/" + data[0].id + "/comments"
                        }
                    });
                } else {
                    Lampa.Modal.close();
                    Lampa.Noty.show('没有找到影评。');
                    Lampa.Controller.toggle('full_start');
                }

            }, function (a, c) {
                Lampa.Noty.show(network.errorDecode(a, c));
            }, false, {
                dataType: 'json',
            });
        } else {
            Lampa.Noty.show('没有找到影评。');
        }
        // network.clear();
    }

    function startPlugin() {
        window.douban_reviewplugin = true;
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var num = 0;
                $('.full-start-new__buttons').append('<div class="full-start__button selector button--db"><svg height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="1.5" y="1.5" width="25" height="31" rx="2.5" stroke="currentColor" stroke-width="3"></rect><rect x="6" y="7" width="9" height="9" rx="1" fill="currentColor"></rect><rect x="6" y="19" width="16" height="3" rx="1.5" fill="currentColor"></rect><rect x="6" y="25" width="11" height="3" rx="1.5" fill="currentColor"></rect><rect x="17" y="7" width="5" height="3" rx="1.5" fill="currentColor"></rect> </svg><span>影评</span></div>');
                $('.button--db').on('hover:enter', function (card) {
                    if (num > 9) num = 0;
                    douban_review(e, e.data.movie['kinopoisk_id'], e.data.movie['imdb_id'], num, 'hot', '热门影评');
                    num += 1;
                });
            }
        });

    }
    if (!window.douban_reviewplugin) startPlugin();
})();
