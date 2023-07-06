(function () {
    'use strict';

    function x1337(object) {
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true,
            step: 250
        });
        var items = [];
        var html = $('<div></div>');
        var body = $('<div class="freetv category-full"></div>');
        var info;
        var last;
        var waitload;
        var doubanitem = [];
        //var cors = Lampa.Utils.checkHttp('proxy.cub.watch/cdn/');
        var cors = 'https://cors.eu.org/';



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
            var _this = this;

            this.activity.loader(true);

            network["native"](cors + object.url, function (str) {
                //this.build.bind(this)
                var data = _this.card(str);
                _this.build(data);
                // var empty = new Lampa.Empty();
                // html.append(empty.render());
                // _this.start = empty.start;

                // _this.activity.loader(false);

                //_this.activity.toggle();
            }, function (a, c) {
                Lampa.Noty.show(network.errorDecode(a, c));
            }, false, {
                dataType: 'text'
            });
            return this.render();
        };

        this.next = function () {
            //console.log('下一页');
            var _this2 = this;
            if (waitload) return;
            //if (object.gotopage) {
            // var postdata = {
            //     //before: object.gotopage[0],
            // };
            waitload = true;
            object.page++;
            // console.log(object.page)
            network["native"](cors + object.url.replace(/\/\d+\//, '/' + object.page + '/'), function (str) {
                var result = _this2.card(str);
                _this2.append(result, true);
                if (result.card.length) waitload = false;
                // Lampa.Controller.enable('content');
                _this2.activity.loader(false);
            }, function (a, c) {
                Lampa.Noty.show(network.errorDecode(a, c));
            }, false, {
                dataType: 'text'
            });
            //}
        };

        this.card = function (str) {
            var _this5 = this;

            var card = [];
            var page;

            str = str.replace(/\n/g, '');
            $('div.library-box ul li', str).each(function (i, html) {
                //if ($('.tgme_widget_message_text.js-message_text', html).text().match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
                card.push({
                    //title: catalogs1[0].list.title.attrName =='text' ? t1.text().replace(/( 第.+?季)/,'') : t1.attr(catalogs1[0].list.title.attrName).replace(/( 第.+?季)/,''),
                    title: $('div.modal-header > h3 > a', html).text(),
                    original_title: '',
                    title_org: '',
                    //url: catalogs1[0].list.link.attrName =='text' ? host+u1.text() : host+u1.attr(catalogs1[0].list.link.attrName),
                    url: 'https://www.1377x.to' + $('div.modal-header > h3 > a', html).attr('href'),
                    //img: catalogs1[0].list.thumb.attrName =='text' ? (i1.text().indexOf('http') == -1 ? host+i1.text() : i1.text()) : (i1.attr(catalogs1[0].list.thumb.attrName).indexOf('http') == -1 ? host+i1.attr(catalogs1[0].list.thumb.attrName) : i1.attr(catalogs1[0].list.thumb.attrName)),
                    img: 'https://www.1377x.to' + $('img.lazy', html).attr('data-original'),
                    quantity: '',
                    year: '',
                    release_year: $('div.modal-header > h3 > a', html).attr('href').match(/-(\d{4})\//) ? $('div.modal-header > h3 > a', html).attr('href').match(/-(\d{4})\//)[1] : '',
                    update: '',//$('span.pic-text', html).text().indexOf('/' != -1) ? $('span.pic-text', html).text().split('/')[0].replace('已完结','') : $('span.pic-text', html).text().replace('已完结',''),
                    score: ($('span.rating > i', html).attr('style').replace(/width: |%;/g, '') / 10).toFixed(1),//$('span.pic-tag', html).text(),
                    episodes_info: $('div.modal-header > h3 > a', html).attr('href').match(/-(\d{4})\//) ? $('div.modal-header > h3 > a', html).attr('href').match(/-(\d{4})\//)[1] : ''
                });
                //};
            });
            return {
                card: card,
                page: page,
                //total_pages: total_pages
            };
        };

        this.append = function (data,append) {
            var _this3 = this;
            //console.log(data)
            data.card.forEach(function (element) {
                //console.log(element)
                var mytitle = element.title.replace('/', ' ');
                if (mytitle.indexOf(' ' != -1)) mytitle = mytitle.split(' ')[0]
                var card = Lampa.Template.get('card', {
                    title: element.title,
                    release_year: ''
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
                card.find('.card__img').attr('src', element.img);
                if (element.score) {
                    card.find('.card__view').append('<div class="card__type"></div>');
                    card.find('.card__type').text(element.score);
                };
                /*card.find('.card__view').append('<div class="card__quality"></div>');
                card.find('.card__quality').text(element.score);*/
                if (element.episodes_info) {
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(element.episodes_info);
                };

                card.on('hover:focus', function () {
                    last = card[0];

                    scroll.update(card, true);
                    info.find('.info__title').text(element.title);
                    info.find('.info__title-original').text(element.episodes_info);
                    info.find('.info__rate span').text(element.score);
                    // info.find('.info__rate').toggleClass('hide', !(element.rate > 0));
                    var maxrow = Math.ceil(items.length / 7) - 1;
                    // console.log(maxrow)
                    // console.log(card)
                    // console.log(items.indexOf(card))
                    // console.log(Math.ceil(items.indexOf(card) / 7))
                    // if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
                    if (scroll.isEnd()) _this3.next();
                    if (element.img) Lampa.Background.change(cardImgBackground(element.img));
                    if (Lampa.Helper) Lampa.Helper.show('x1337_detail', '长按住 (ОК) 键查看详情', card);
                });
                card.on('hover:long', function () {
                    //contextmenu();
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
                    _this3.finds1(element);
                });
                card.on('hover:enter', function (target, card_data) {
                    //console.log(element)
                    //element.img = element.cover;
                    element.original_title = '';
                    var sources = [];

                    network["native"](cors + element.url, function (str) {
                        //$('.btn-group a.line-pay-btn', str).each(function (i, str) {
                        $('tbody tr', str).each(function (i, html) {
                            sources.push({
                                title: $('td.coll-1.name > a', html).text() + ' / ' + $('td.seeds', html).text() + ' / ' + $('td.leeches', html).text() + ' / ' + $('td.mob-uploader', html).text(),
                                url: 'https://www.1377x.to' + $('td.coll-1.name > a:nth-child(2)', html).attr('href'),
                            });
                        });

                        var html_ = $('<div></div>');
                        var navigation = $('<div class="navigation-tabs"></div>');
                        sources.forEach(function (tab, i) {
                            var button = $('<div class="navigation-tabs__button selector">' + tab.title + '</div>');
                            button.on('hover:enter', function () {
                                console.log(element)
                                network["native"](cors + tab.url, function (str) {
                                    $('a.torrentdown1', str).each(function (i, html) {
                                        var mlink = html.href;

                                        var video = {
                                            title: element.title,
                                            url: element.video
                                        };

                                        if (window.intentShim) {
                                            var intentExtra = {
                                                title: element.title,
                                                poster: element.img,
                                                action: "play",
                                                data: {
                                                    lampa: true
                                                }
                                            };
                                            window.plugins.intentShim.startActivity(
                                                {
                                                    action: window.plugins.intentShim.ACTION_VIEW,
                                                    url: mlink,
                                                    extras: intentExtra
                                                },
                                                function () { },
                                                function () { console.log('Failed to open magnet URL via Android Intent') }

                                            );
                                        } else {
                                            var SERVER = {
                                                "object": {
                                                    "Title": "",
                                                    "MagnetUri": "",
                                                    "poster": ""
                                                },
                                                "movie": {
                                                    "title": "",
                                                }
                                            };
                                            var SERVER1 = {
                                                "title": "",
                                                "MagnetUri": "",
                                                "poster": ""
                                            };
                                            SERVER1.MagnetUri = mlink;
                                            SERVER1.title = element.title;
                                            SERVER1.poster = element.img;
                                            
                                            SERVER.object.MagnetUri = mlink;
                                            SERVER.movie.title = element.title;
                                            SERVER.object.poster = element.img;
                                            // console.log(SERVER1)
                                            // Lampa.Android.openTorrent(SERVER);
                                            Lampa.Torrent.start(SERVER1,{
                                                title: element.title
                                            });
                                        };
                                    });

                                }, function (a, c) {
                                    Lampa.Noty.show(network.errorDecode(a, c));
                                }, false, {
                                    dataType: 'text'
                                });

                            });
                            // if (tab.name == _this.display) button.addClass('active');
                            if (i > 0 && i % 1 != 0) navigation.append('<div class="navigation-tabs__split">|</div>');
                            if (i % 1 == 0) { // 当 i 是 3 的倍数时，将当前行容器加入到总容器，并新建一个行容器
                                if (i > 0) html_.append(navigation);
                                navigation = $('<div class="navigation-tabs"></div>');
                            }
                            navigation.append(button);
                        });

                        html_.append(navigation);

                        Lampa.Modal.open({
                            title: element.title,
                            html: html_,
                            size: 'medium',
                            select: html.find('.navigation-tabs .active')[0],
                            mask: true,
                            onBack: function onBack() {
                                Lampa.Modal.close();
                                Lampa.Api.clear();
                                Lampa.Controller.toggle('content');
                            }
                        });

                    }, function (a, c) {
                        Lampa.Noty.show(network.errorDecode(a, c));
                    }, false, {
                        dataType: 'text'
                    });
                });
                body.append(card);
                if (append) Lampa.Controller.collectionAppend(card);
                items.push(card);
            });
        };

        this.build = function (data) {
            var _this2 = this;
            //info = Lampa.Template.get('info');style="height:5em"
            Lampa.Template.add('button_category', "<style>.freetv.category-full{padding-bottom:8em;}</style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div><div style=\"display:none\" class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div></div>");
            Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__rate"><span></span></div><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
            var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: '1377x - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        //console.log(new_value)
                        var search_tempalte = 'http://www.dydhhy.com/?s=#msearchword';
                        var searchurl = search_tempalte.replace('#msearchword', encodeURIComponent(new_value));
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            title: '1377x - 搜索"' + new_value + '"',
                            component: 'x1337',
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                })
            });
            this.selectGroup = function () {
                Lampa.Select.show({
                    title: '1377x',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '1337x - ' + a.title,
                            component: 'x1337',
                            page: 1
                        });
                    },
                    onBack: function onBack() {
                        Lampa.Controller.toggle('content');
                    }
                });
            };
            //info.find('.info__rate,.info__right').remove();
            scroll.render().addClass('layer--wheight').data('mheight', info);
            if (data.card.length) {
                html.append(info);
                scroll.minus();
                html.append(scroll.render());
                scroll.onEnd = function () {
                    _this2.next();
                };
                this.append(data);
                scroll.append(body);
                this.activity.loader(false);
                this.activity.toggle();
            } else {
                html.append(scroll.render());
                _this2.empty();
            }
        };

        this.empty = function () {
            var empty = new Lampa.Empty();
            scroll.append(empty.render());
            this.start = empty.start;
            this.activity.loader(false);
            this.activity.toggle();
        };

        this.finds = function (find) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var element = arguments.length > 1 && arguments[2] !== undefined ? arguments[2] : {};
            var finded;
            //console.log(element)

            var s, a = params.title.replace(element.title, '').replace('(' + params.release_year + ')', '').replace(/(Season\s\d)/, '').replace(/‎/g, '').trim();

            if (a === '') {
                s = element.title.replace(/第(.+)季/, '');
            } else {
                s = a;
            };

            //console.log(s)

            var filtred = function filtred(items) {
                if (items.length == 1) {
                    finded = items;
                    //return items;
                } else {
                    finded = items.filter(function (fp) {
                        // if (params.region == '中国大陆' || params.region == '韩国' || params.region == '中国香港') {
                        //     //console.log('中文')
                        //     return ((fp.title || fp.name) == s || params.title.indexOf((fp.title || fp.name)) !== -1)
                        // } else {
                        //     return ((fp.original_title || fp.original_name) == s || params.title.indexOf((fp.original_title || fp.original_name)) !== -1)
                        // }
                        return ((fp.title || fp.name) == s || params.title.indexOf((fp.title || fp.name)) !== -1 || (fp.original_title || fp.original_name) == s || params.title.indexOf((fp.original_title || fp.original_name)) !== -1)
                    });
                    //console.log(finded);
                }
            };

            if (params.is_tv) {
                if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
            } else {
                if (find.movie && find.movie.results.length) filtred(find.movie.results);
            };

            return finded ? finded[0] : finded;
        };

        this.finds1 = function (element) {
            var _this1 = this;
            Lampa.Api.search({
                //doubanitem.sub_title
                query: encodeURIComponent(element.title)
            }, function (find) {
                /*              console.log(find)
                              console.log(element);*/
                Lampa.Modal.close();
                var finded = _this1.finds(find, element, element);

                if (finded) {
                    Lampa.Activity.push({
                        url: '',
                        component: 'full',
                        id: finded.id,
                        method: 'movie',
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

        this.find_douban = function (element) {
            var _this = this;
            network.clear();
            network.timeout(10000);
            network["native"]('https://movie.douban.com/j/subject_abstract?subject_id=' + element.id, function (json) {
                //console.log(JSON.parse(json));
                //doubanitem = JSON.parse(json);
                _this.find_tmdb(JSON.parse(json), element);
            }, function (a, c) {
                this.empty(network.errorDecode(a, c));
            }, false, {
                dataType: 'text'
            });
        };
        this.find_tmdb = function (data, element) {
            var _this1 = this;
            var s, str = data.subject;

            network["native"](str.url, function (json) {
                var s = json.match(/tt(\d+)/, 'g');
                s = s ? s[0] : s;
                //console.log(element);
                //console.log(s)
                if (s) {
                    var dom = Lampa.Storage.field('proxy_tmdb') ? 'http://apitmdb.cub.watch/3/' : 'https://api.themoviedb.org/3/';
                    network["native"](dom + 'find/' + s + '?api_key=4ef0d7355d9ffb5151e987764708ce96&external_source=imdb_id&language=zh-CN', function (json) {

                        var json = str.is_tv ? json.tv_results[0] : json.movie_results[0];
                        //console.log(json);
                        if (json) {
                            Lampa.Activity.push({
                                url: '',
                                component: 'full',
                                id: json.id,
                                method: str.is_tv ? 'tv' : 'movie',
                                card: json
                            });
                            Lampa.Modal.close();
                        } else {
                            var a = str.title.replace(element.title, '').replace('(' + str.release_year + ')', '').replace(/(Season\s\d)/, '').replace(/‎/g, '').trim();

                            if (a === '') {
                                s = element.title.replace(/第(.+)季/, '');
                            } else {
                                s = a.replace('II', '2');
                            };

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
                                var finded = _this1.finds(find, str, element);

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
                        }


                    });
                } else {
                    var a = str.title.replace(element.title, '').replace('(' + str.release_year + ')', '').replace(/(Season\s\d)/, '').replace(/‎/g, '').trim();

                    if (a === '') {
                        s = element.title.replace(/第(.+)季/, '');
                    } else {
                        s = a.replace('II', '2');
                    };

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
                        var finded = _this1.finds(find, str, element);

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
                }
            }, function (a, c) {
                //_this1.empty(network.errorDecode(a, c));
            }, false, {
                dataType: 'text'
            });



        };
        function cardImgBackground(card_data) {
            if (Lampa.Storage.field('background')) {
                return Lampa.Storage.get('background_type', 'complex') == 'poster' && card_data ? card_data : card_data;
            }
            return '';
        };

        this.start = function () {
            var _this = this;
            Lampa.Controller.add('content', {
                toggle: function toggle() {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function left() {
                    if (Navigator.canmove('left')) Navigator.move('left');
                    else Lampa.Controller.toggle('menu');
                },
                right: function right() {
                    // Navigator.move('right');
                    if (Navigator.canmove('right')) Navigator.move('right');
                    else _this.selectGroup();
                },
                up: function up() {
                    // if (Navigator.canmove('up')) Navigator.move('up');
                    // else Lampa.Controller.toggle('head');
                    if (Navigator.canmove('up')) {
                        Navigator.move('up');
                    } else {
                        if (!info.find('.view--category').hasClass('focus')) {
                            if (!info.find('.view--category').hasClass('focus')) {
                                Lampa.Controller.collectionSet(info);
                                Navigator.move('right')
                            }
                        } else Lampa.Controller.toggle('head');
                    }
                },
                down: function down() {
                    // if (Navigator.canmove('down')) Navigator.move('down');
                    if (Navigator.canmove('down')) Navigator.move('down');
                    else if (info.find('.view--category').hasClass('focus')) {
                        Lampa.Controller.toggle('content');
                    }
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

    var catalogs = [
        {
            title: '电影',
            url: 'https://www.1377x.to/movie-library/1/'
        },
    ];

    function startx1337() {
        window.plugin_x1337_ready = true;
        Lampa.Component.add('x1337', x1337);

        function addSettingsx1337() {
            var ico = '<svg width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17H18C18.5523 17 19 16.5523 19 16V8C19 7.44772 18.5523 7 18 7H14ZM17 9H15V15H17V9Z\" fill=\"white\"/> <path d=\"M6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H6Z\" fill=\"white\"/> <path d=\"M6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6Z\" fill=\"white\"/> <path d=\"M5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16Z\" fill=\"white\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z\" fill=\"white\"/> </svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="channel"><div class="menu__ico">' + ico + '</div><div class="menu__text">1337</div></li>');
            menu_item.on('hover:enter', function () {
                Lampa.Select.show({
                    title: '1337x',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '1337x - ' + a.title,
                            component: 'x1337',
                            page: 1
                        });
                    },
                    onBack: function onBack() {
                        Lampa.Controller.toggle('menu');
                    }
                });
            });
            $('.menu .menu__list').eq(0).append(menu_item);
            //$('.menu .menu__list .menu__item.selector').eq(1).after(menu_item);
        }

        if (window.appready) addSettingsx1337()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsx1337()
            })
        }
    }

    if (!window.plugin_x1337_ready) startx1337();

})();
