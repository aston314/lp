(function () {
    'use strict';

    function DOUBAN(object) {
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true,
            step: 250
        });
        var items = [];
        var html = $('<div></div>');
        var body = $('<div class="category-full"></div>');
        var info;
        var last;
        var waitload;
        var doubanitem = [];

        this.getQueryString = function (link, name) {
            let reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
            //console.log(link)
            let r = link.match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            };
            return null;
        };

        this.create = function () {
            //console.log(object.url)
            var postdata = {
                category_id: this.getQueryString(object.url, "category_id"),
                skip: this.getQueryString(object.url, "skip"),
                limit: "24",
                keyword: ""
            };

            var _this = this;

            this.activity.loader(true);

            network.silent(object.url, this.build.bind(this), function () {
                var empty = new Lampa.Empty();
                html.append(empty.render());
                _this.start = empty.start;

                _this.activity.loader(false);

                _this.activity.toggle();
            });
            return this.render();
        };

        this.next = function () {
            var postdata = {
                category_id: this.getQueryString(object.url, "category_id"),
                skip: object.page * 20,
                limit: "24",
                keyword: ""
            };

            var _this2 = this;

            if (waitload) return;


            if (object.page < 300) {
                waitload = true;
                object.page++;
                network.silent(object.url.replace(/page_start=\d+/, 'page_start=') + (object.page - 1) * 20, function (result) {
                    _this2.append(result);
                    if (result.subjects.length) waitload = false;
                    Lampa.Controller.enable('content');
                }, false, postdata);
            }
        };

        this.append = function (data) {
            var _this3 = this;

            data.subjects.forEach(function (element) {
                var mytitle = element.title.replace('/', ' ');
                if (mytitle.indexOf(' ' != -1)) mytitle = mytitle.split(' ')[0]
                var card = Lampa.Template.get('card', {
                    title: element.title,
                    release_year: element.episodes_info
                });
                card.addClass('card--category');
                //card.addClass('card--collection');
                var img = card.find('.card__img')[0];
                img.onload = function () {
                    card.addClass('card--loaded');
                };
                img.onerror = function (e) {
                    img.src = './img/img_broken.svg';
                };
                card.find('.card__img').attr('src', element.cover);
                if (element.rate) {
                    card.find('.card__view').append('<div class="card__type"></div>');
                    card.find('.card__type').text(element.rate);
                };
                /*card.find('.card__view').append('<div class="card__quality"></div>');
                card.find('.card__quality').text(element.score);*/

                card.on('hover:focus', function () {
                    last = card[0];
                    scroll.update(card, true);
                    info.find('.info__title').text(mytitle);
                    info.find('.info__title-original').text(element.episodes_info);
                    info.find('.info__rate span').text(element.rate);
                    info.find('.info__rate').toggleClass('hide', !(element.rate > 0));
                    var maxrow = Math.ceil(items.length / 7) - 1;
                    if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
                });
                card.on('hover:enter', function (target, card_data) {

                    Lampa.Modal.open({
                        title: '',
                        html: Lampa.Template.get('modal_loading'),
                        size: 'small',
                        mask: true,
                        onBack: function onBack() {
                            Lampa.Modal.close();
                            Lampa.Api.clear();
                            Lampa.Controller.toggle('content');
                        }
                    });

                    _this3.find_douban(element.id);
                    //var str = _this3.getRemote('https://movie.douban.com/j/subject_abstract?subject_id=' + element.id);
                    //str = JSON.parse(str);
                    //console.log(str)

                    // if (typeof str === 'undefined') {
                    //     Lampa.Modal.close();
                    //     Lampa.Noty.show('豆瓣访问频次限制，请稍候重试。');
                    //     Lampa.Controller.toggle('content');
                    // }
                    // else {
                    //     var s, str = str.subject;
                    //     if (str.region == '中国大陆') {
                    //         s = str.title.replace(/‎/g, '').replace(/\(\d{4}\)/, '').replace(/第(.+)季/, '').trim();
                    //     }
                    //     else {
                    //         if (str.region == '韩国' || str.region == '中国香港') {
                    //             s = str.title.replace(/‎/g, '').replace(/\(\d{4}\)/, '').replace(/第(.+)季/, '').trim();
                    //             //s = s.match(new RegExp('^([^\s]*)', 'g'));
                    //             s = s.split(' ').shift();
                    //         } else {
                    //             s = str.title.replace(/‎/g, '').replace(/^([^\s]*)/, '').replace(/\(\d{4}\)/, '').replace(/第(.+)季/, '').replace(/(Season\s\d)/, '').trim();
                    //         }
                    //     }

                    //     //console.log(s)
                    //     //var mysubtitle = str.sub_title.replace('/', ' ');
                    //     //if (mysubtitle.indexOf(' ' != -1)) mysubtitle = mysubtitle.split(' ')[0]
                    //     //console.log(s.replace(/\d$/, ''))
                    //     Lampa.Api.search({
                    //         //doubanitem.sub_title
                    //         query: encodeURIComponent(s.replace(/\d$/, ''))
                    //     }, function (find) {
                    //         /*              console.log(find)
                    //                       console.log(element);*/
                    //         Lampa.Modal.close();
                    //         var finded = _this3.finds(find, (str || element));

                    //         if (finded) {
                    //             Lampa.Activity.push({
                    //                 url: '',
                    //                 component: 'full',
                    //                 id: finded.id,
                    //                 method: finded.name ? 'tv' : 'movie',
                    //                 card: finded
                    //             });
                    //         } else {
                    //             Lampa.Noty.show('在TMDB中找不到影片信息。');
                    //             Lampa.Controller.toggle('content');
                    //         }
                    //     }, function () {
                    //         Lampa.Modal.close();
                    //         Lampa.Noty.show('在TMDB中找不到影片信息。');
                    //         Lampa.Controller.toggle('content');
                    //     });

                    // }
                });
                body.append(card);
                items.push(card);
            });
        };

        this.build = function (data) {
            info = Lampa.Template.get('info');
            //info.find('.info__rate,.info__right').remove();
            scroll.render().addClass('layer--wheight').data('mheight', info);
            html.append(info);
            html.append(scroll.render());
            this.append(data);
            scroll.append(body);
            this.activity.loader(false);
            this.activity.toggle();
        };

        this.finds = function (find) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var finded;
            //console.log(params)

            var filtred = function filtred(items) {
                finded = items.filter(function (fp) {
                    if (params.region == '中国大陆' || params.region == '韩国' || params.region == '中国香港') {
                        //console.log('中文')
                        return ((fp.title || fp.name) == params.title.replace(/\(\d{4}\)/, '').replace(/\d$/, '').replace(/第(.+)季/, '').trim() || params.title.indexOf((fp.title || fp.name)) !== -1)
                    } else {
                        return ((fp.original_title || fp.original_name) == params.title.replace(/^([^\s]*)/, '').replace(/\(\d{4}\)/, '').replace(/第(.+)季/, '').replace(/\d$/, '').trim() || params.title.indexOf((fp.original_title || fp.original_name)) !== -1)
                    }
                });
            };

            if (params.is_tv) {
                if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
            } else {
                if (find.movie && find.movie.results.length) filtred(find.movie.results);
            };

            return finded ? finded[0] : finded;
        };

        this.finds1 = function (element, find) {
            var finded;
            var filtred = function filtred(items) {
                for (var i = 0; i < items.length; i++) {
                    var mytitle = element.title.replace('/', ' ');
                    if (mytitle.indexOf(' ' != -1)) mytitle = mytitle.split(' ')[0]

                    var item = items[i];
                    if ((mytitle == (item.title || item.name)) && parseInt(element.year) == (item.first_air_date || item.release_date).split('-').shift()) {
                        finded = item;
                        break;
                    }
                }
            };
            if (find.movie && find.movie.results.length) filtred(find.movie.results);
            if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
            return finded;
        };
        this.find_douban = function (url) {
            var _this = this;
            network.clear();
            network.timeout(10000);
            network.silent('https://movie.douban.com/j/subject_abstract?subject_id=' + url, function (json) {
                //console.log(JSON.parse(json));
                //doubanitem = JSON.parse(json);
                _this.find_tmdb(JSON.parse(json));
            }, function (a, c) {
                this.empty(network.errorDecode(a, c));
            }, false, {
                dataType: 'text'
            });
        };
        this.find_tmdb = function (data) {
            var _this1 = this;
            var s, str = data.subject;
            if (str.region == '中国大陆') {
                s = str.title.replace(/‎/g, '').replace(/\(\d{4}\)/, '').replace(/第(.+)季/, '').trim();
            }
            else {
                if (str.region == '韩国' || str.region == '中国香港') {
                    s = str.title.replace(/‎/g, '').replace(/\(\d{4}\)/, '').replace(/第(.+)季/, '').trim();
                    //s = s.match(new RegExp('^([^\s]*)', 'g'));
                    s = s.split(' ').shift();
                } else {
                    s = str.title.replace(/‎/g, '').replace(/^([^\s]*)/, '').replace(/\(\d{4}\)/, '').replace(/第(.+)季/, '').replace(/(Season\s\d)/, '').trim();
                }
            }

            //console.log(s)
            //var mysubtitle = str.sub_title.replace('/', ' ');
            //if (mysubtitle.indexOf(' ' != -1)) mysubtitle = mysubtitle.split(' ')[0]
            //console.log(s.replace(/\d$/, ''))
            Lampa.Api.search({
                //doubanitem.sub_title
                query: encodeURIComponent(s.replace(/\d$/, ''))
            }, function (find) {
                /*              console.log(find)
                              console.log(element);*/
                Lampa.Modal.close();
                var finded = _this1.finds(find, (str || element));

                if (finded) {
                    Lampa.Activity.push({
                        url: '',
                        component: 'full',
                        id: finded.id,
                        method: finded.name ? 'tv' : 'movie',
                        card: finded
                    });
                } else {
                    Lampa.Noty.show('在TMDB中找不到影片信息。');
                    Lampa.Controller.toggle('content');
                }
            }, function () {
                Lampa.Modal.close();
                Lampa.Noty.show('在TMDB中找不到影片信息。');
                Lampa.Controller.toggle('content');
            });

        };
        this.getRemote = function (remote_url) {
            return $.ajax({
                type: "GET",
                url: remote_url,
                async: false
            }).responseText;
        };
        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function toggle() {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function left() {
                    if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu');
                },
                right: function right() {
                    Navigator.move('right');
                },
                up: function up() {
                    if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head');
                },
                down: function down() {
                    if (Navigator.canmove('down')) Navigator.move('down');
                },
                back: function back() {
                    Lampa.Activity.backward();
                }
            });
            Lampa.Controller.toggle('content');
        };

        this.pause = function () { };

        this.stop = function () { };

        this.render = function () {
            return html;
        };

        this.destroy = function () {
            network.clear();
            scroll.destroy();
            if (info) info.remove();
            html.remove();
            body.remove();
            network = null;
            items = null;
            html = null;
            body = null;
            info = null;
            doubanitem = null;
        };
    }

    function startDOUBAN() {
        window.plugin_douban_ready = true;
        Lampa.Component.add('db', DOUBAN);
        var catalogs = [{
            title: '热门电影',
            url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=time&page_limit=20&page_start=0'
        }, {
            title: '高分电影',
            url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&page_limit=50&page_start=0'
        }, {
            title: '最新电影',
            url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E6%9C%80%E6%96%B0&page_limit=20&page_start=0'
        }, {
            title: '热门电视剧',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'
        }, {
            title: '美剧',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BE%8E%E5%89%A7&sort=time&page_limit=20&page_start=0'
        }, {
            title: '韩剧',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E9%9F%A9%E5%89%A7&sort=time&page_limit=20&page_start=0'
        }, {
            title: '国产剧',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E5%9B%BD%E4%BA%A7%E5%89%A7&sort=time&page_limit=20&page_start=0'
        }, , {
            title: '港剧',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%B8%AF%E5%89%A7&sort=time&page_limit=20&page_start=0'
        }, {
            title: '日剧',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E5%89%A7&sort=time&page_limit=20&page_start=0'
        }, {
            title: '英剧',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E8%8B%B1%E5%89%A7&sort=time&page_limit=20&page_start=0'
        }, {
            title: '动画',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=time&page_limit=20&page_start=0'
        }, {
            title: '综艺',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BB%BC%E8%89%BA&sort=time&page_limit=20&page_start=0'
        }, {
            title: '纪录片',
            url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BA%AA%E5%BD%95%E7%89%87&sort=time&page_limit=20&page_start=0'
        }];
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                var ico = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="white"><path fill="none" d="M0 0h24v24H0z" /><path d="M15.273 15H5V7h14v8h-1.624l-1.3 4H21v2H3v-2h4.612L6.8 16.5l1.902-.618L9.715 19h4.259l1.3-4zM3.5 3h17v2h-17V3zM7 9v4h10V9H7z" fill="white"/></svg>';
                var menu_item = $('<li class="menu__item selector focus" data-action="yyds"><div class="menu__ico">' + ico + '</div><div class="menu__text">豆瓣</div></li>');
                menu_item.on('hover:enter', function () {
                    Lampa.Select.show({
                        title: '豆瓣',
                        items: catalogs,
                        onSelect: function onSelect(a) {
                            Lampa.Activity.push({
                                url: a.url,
                                title: a.title,
                                component: 'db',
                                page: 1
                            });
                        },
                        onBack: function onBack() {
                            Lampa.Controller.toggle('menu');
                        }
                    });
                });
                $('.menu .menu__list').eq(0).append(menu_item);
            }
        });
    }

    if (!window.plugin_douban_ready) startDOUBAN();

})();
