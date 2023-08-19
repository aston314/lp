(function () {
    'use strict';

    function XIAOYA(object) {
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
        var cors;
        //  = Lampa.Utils.checkHttp('proxy.cub.watch/cdn/');
        // var cors = 'https://cors.eu.org/';
        if (Lampa.Platform.is('android') || Lampa.Storage.get('platform', 'noname') === 'noname') {
            cors = '';
        } else {
            cors = 'https://cors.eu.org/';
        }
        this.create = function () {
            //console.log(object.url)
            var _this = this;

            this.activity.loader(true);

            network["native"](alistip + object.url, function (str) {
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
                network["native"](alistip + object.url + 'page/' + object.page, function (str) {
                    var result = _this2.card(str);
                    _this2.append(result,true);
                    if (result.card.length) waitload = false;
                    // Lampa.Controller.enable('content');
                },function (a, c) {
                    if (a.status == 404 || a.status == 0) {
                        // Lampa.Noty.show('ohh,已经是最后一页了');
                    } else {
                        Lampa.Noty.show(network.errorDecode(a, c));
                    }
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
            var mtype;
            if (str.includes('figure')){
                mtype = $('figure', str);
            } else {
                mtype = $("a", str);
            };
            mtype.each(function (i, html) {
                    card.push({
                        title: str.includes('figure') ? $('figcaption a', html).text() : html.text ,
                        original_title: '',
                        title_org: '',
                        url: str.includes('figure') ? $('a', html).attr('href') : '/'+html.text,
                        img: $('img', html).attr('src'),
                        quantity: ' ',
                        year: '',
                        update: '',//$('span.pic-text', html).text().indexOf('/' != -1) ? $('span.pic-text', html).text().split('/')[0].replace('已完结','') : $('span.pic-text', html).text().replace('已完结',''),
                        score: $('figcaption', html).text().replace('豆瓣评分： ','').replace($('figcaption a', html).text(),''),//$('span.pic-tag', html).text()
                    });
                //};
            });
            if (!str.includes('figure')) {
                card.splice(0, 2);
            };
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
                if (element.rate) {
                    card.find('.card__view').append('<div class="card__type"></div>');
                    card.find('.card__type').text(element.rate);
                };
                /*card.find('.card__view').append('<div class="card__quality"></div>');
                card.find('.card__quality').text(element.score);*/
                if (element.episodes_info) {
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(element.episodes_info.replace('更新至', '第'));
                };
                if (element.score) {
                    card.find('.card__view').append('<div class="card__vote"></div>');
                    card.find('.card__vote').text(element.score);
                };

                card.on('hover:focus', function () {
                    last = card[0];

                    scroll.update(card, true);
                    info.find('.info__title').text(element.title);
                    info.find('.info__title-original').text(element.episodes_info);
                    info.find('.info__rate span').text(element.rate);
                    info.find('.info__rate').toggleClass('hide', !(element.rate > 0));
                    var maxrow = Math.ceil(items.length / 7) - 1;
                    // console.log(maxrow)
                    // console.log(card)
                    // console.log(items.indexOf(card))
                    // console.log(Math.ceil(items.indexOf(card) / 7))
                    // if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
                    // if (scroll.isEnd()) _this3.next();
                    if (element.img) Lampa.Background.change(cardImgBackground(element.img));
                    //if (Lampa.Helper) Lampa.Helper.show('tg_detail', '长按住 (ОК) 键查看详情', card);
                });
                // card.on('hover:long', function () {
                // 	//contextmenu();
                //     Lampa.Modal.open({
                //         title: '',
                //         html: Lampa.Template.get('modal_loading'),
                //         size: 'small',
                //         mask: true,
                //         onBack: function onBack() {
                //             Lampa.Modal.close();
                //             Lampa.Api.clear();
                //             Lampa.Controller.toggle('content');
                //         }
                //     });

                //     _this3.find_douban(element);
                // });
                card.on('hover:enter', function (target, card_data) {
                    element.original_title = '';
                    Lampa.Activity.push({
                        url: alistip + element.url,
                        title: 'Alist - ' + element.title,
                        component: 'alist',
                        movie: element,
                        page: 1
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
            Lampa.Template.add('button_category', "<style>.freetv.category-full{padding-bottom:8em;}</style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div><div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div></div>");
            Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
            var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: '小雅Alist - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        //console.log(new_value)
                        var search_tempalte = '/search?box=#msearchword&type=video&url=';
                        var searchurl = search_tempalte.replace('#msearchword',encodeURIComponent(new_value));
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            title: '小雅Alist - 搜索"' + new_value + '"',
                            component: 'xiaoya',
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                })
            });
            this.selectGroup = function () {
                Lampa.Select.show({
                    title: '小雅Alist',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '小雅Alist - ' + a.title,
                            component: 'xiaoya',
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
                // scroll.onEnd = function () {
                //     _this2.next();
                // };
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
        this.getRemote = function (remote_url) {
            return $.ajax({
                type: "GET",
                url: remote_url,
                async: false
            }).responseText;
        };
        this.start = function () {
            // Lampa.Controller.add('content', {
            //     toggle: function toggle() {
            //         Lampa.Controller.collectionSet(scroll.render());
            //         Lampa.Controller.collectionFocus(last || false, scroll.render());
            //     },
            //     left: function left() {
            //         if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu');
            //     },
            //     right: function right() {
            //         Navigator.move('right');
            //     },
            //     up: function up() {
            //         if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head');
            //     },
            //     down: function down() {
            //         if (Navigator.canmove('down')) Navigator.move('down');
            //     },
            //     back: function back() {
            //         Lampa.Activity.backward();
            //     }
            // });
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

    var alistip = 'http://192.168.2.1:8678';
    var catalogs =[];
    var maincontent = `<div class="markdown-body">   
    <a href="http://img.xiaoya.pro/dashan.png" key="a-6-1-2" target="_self" class="" style=""><img src="https://s2.loli.net/2023/02/19/JKsEuWwYLTNfme8.png" width="30%" align="right" valign="top" key="img-6-42-0"></a>
    <p key="p-8-1-4"><a href="https://t.me/xiaoyaliu" target="_self" key="a-8-1-0" class="" style=""></a></p><h3 key="h3-8-46-5"><a href="https://t.me/xiaoyaliu" target="_self" key="a-8-1-0" class="" style="">订阅小雅的tg频道</a></h3>
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=daily" target="_self" key="a-9-1-7" style="color: rgb(0, 102, 102);" class=""><h3 key="h3-9-100-0">每日更新</h3></a>
    标签：<br key="br-10-4-9">
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=tv.china" target="_self" key="a-11-1-11" style="color: rgb(0, 102, 102);" class="">国产剧</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=tv.hktw" target="_self" key="a-12-1-13" style="color: rgb(0, 102, 102);" class="">港台剧</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=tv.korea" target="_self" key="a-13-1-15" style="color: rgb(0, 102, 102);" class="">韩剧</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=tv.us" target="_self" key="a-14-1-17" style="color: rgb(0, 102, 102);" class="">美剧</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=tv.uk" target="_self" key="a-15-1-19" style="color: rgb(0, 102, 102);" class="">英剧</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=tv.japan" target="_self" key="a-16-1-21" style="color: rgb(0, 102, 102);" class="">日剧</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=comics.china" target="_self" key="a-17-1-23" style="color: rgb(0, 102, 102);" class="">国漫</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=comics.japan" target="_self" key="a-18-1-25" style="color: rgb(0, 102, 102);" class="">日漫</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=comics" target="_self" key="a-19-1-27" style="color: rgb(0, 102, 102);" class="">动漫</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.china" target="_self" key="a-20-1-29" style="color: rgb(0, 102, 102);" class="">🎬中国</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.top" target="_self" key="a-21-1-31" style="color: rgb(0, 102, 102);" class="">🎬豆瓣榜</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.thai" target="_self" key="a-22-1-33" style="color: rgb(0, 102, 102);" class="">🎬泰国</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.hktw" target="_self" key="a-23-1-35" style="color: rgb(0, 102, 102);" class="">🎬港台</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.western" target="_self" key="a-24-1-37" style="color: rgb(0, 102, 102);" class="">🎬欧美</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.japan" target="_self" key="a-25-1-39" style="color: rgb(0, 102, 102);" class="">🎬日本</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.korea" target="_self" key="a-26-1-41" style="color: rgb(0, 102, 102);" class="">🎬韩国</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.india" target="_self" key="a-27-1-43" style="color: rgb(0, 102, 102);" class="">🎬印度</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.dolby" target="_self" key="a-28-1-45" style="color: rgb(0, 102, 102);" class="">🎬杜比</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=movie.4kremux" target="_self" key="a-29-1-47" style="color: rgb(0, 102, 102);" class="">🎬4K REMUX</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=docu.history" target="_self" key="a-30-1-49" style="color: rgb(0, 102, 102);" class="">纪录片.历史</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=docu.food" target="_self" key="a-31-1-51" style="color: rgb(0, 102, 102);" class="">纪录片.美食</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=docu.archeology" target="_self" key="a-32-1-53" style="color: rgb(0, 102, 102);" class="">纪录片.考古</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=docu.explore" target="_self" key="a-33-1-55" style="color: rgb(0, 102, 102);" class="">纪录片.探索发现</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=docu.natgeo" target="_self" key="a-34-1-57" style="color: rgb(0, 102, 102);" class="">纪录片.国家地理</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=docu.bbc" target="_self" key="a-35-1-59" style="color: rgb(0, 102, 102);" class="">纪录片.BBC</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=docu.nhk" target="_self" key="a-36-1-61" style="color: rgb(0, 102, 102);" class="">纪录片.NHK</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=docu.bilibili" target="_self" key="a-37-1-63" style="color: rgb(0, 102, 102);" class="">纪录片.哔哩哔哩</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=docu" target="_self" key="a-38-1-65" style="color: rgb(0, 102, 102);" class="">纪录片</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=comics.child" target="_self" key="a-39-1-67" style="color: rgb(0, 102, 102);" class="">儿童</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=music" target="_self" key="a-40-1-69" style="color: rgb(0, 102, 102);" class="">音乐</a>&emsp;
    <a href="/whatsnew?filter=last&amp;num=100&amp;type=video&amp;cat=reality" target="_self" key="a-41-1-71" style="color: rgb(0, 102, 102);" class="">综艺</a>&emsp;
    <br key="br-42-1-73">
    小雅的近期推荐：
    <a href="http://recommend.xiaoya.pro/xiaoya/1.html" target="_self" key="a-44-1-75" class="" style="">一期</a>&emsp;
    <a href="http://recommend.xiaoya.pro/xiaoya/2.html" target="_self" key="a-45-1-77" class="" style="">二期</a>&emsp;
    <a href="http://recommend.xiaoya.pro/xiaoya/3.html" target="_self" key="a-46-1-79" class="" style="">三期</a>&emsp;
    <a href="http://recommend.xiaoya.pro/xiaoya/4.html" target="_self" key="a-47-1-81" class="" style="">四期</a>&emsp;
    <a href="http://recommend.xiaoya.pro/xiaoya/5.html" target="_self" key="a-48-1-83" class="" style="">五期</a>&emsp;
    <a href="http://recommend.xiaoya.pro/xiaoya/6.html" target="_self" key="a-49-1-85" class="" style="">六期</a><br key="br-49-71-86"><p key="p---87"></p>
    <p key="p-51-1-89">
    </p><h3 key="h3-52-1-90" style="color: rgb(204, 51, 51);">本网站的阿里分享限速已经全部解锁，需要你自行下载docker来使用，网站的阿里分享资源不提供在线播放，如果没有docker环境，或者不愿意折腾的，可以联系我 tg:<a href="https://t.me/liuxiaoya00" key="a-52-111-1" target="_self" class="" style=""> t.me/liuxiaoya00 </a>  邮箱:<a href="mailto:xiaoyaliu00@gmail.com" key="a-52-171-3" target="_self" class="" style=""> xiaoyaliu00@gmail.com </a>代建托管，18元/月</h3>
    <p key="p-53-1-92">
    <b key="b-54-1-1" style="color: rgb(0, 102, 102);">一键安装和更新容器，标准模式，打开端口 5678</b><br key="br-54-56-2">
    bash -c "$(curl http://docker.xiaoya.pro/update_new.sh)"
    </p><p key="p-56-1-93">
    <b key="b-57-1-1" style="color: rgb(0, 102, 102);">一键安装和更新容器，host模式（推荐，软路由和NAS上更少网络故障，打开端口 6789）</b><br key="br-57-77-2">
    bash -c "$(curl http://docker.xiaoya.pro/update_new.sh)" -s host
    </p><p key="p-59-1-94">
    <b key="b-60-1-1" style="color: rgb(0, 102, 102);">如果docker.com被墙，请使用</b><br key="br-60-50-2">
    bash -c "$(curl http://docker.xiaoya.pro/update_private.sh)"
    </p><p key="p-62-1-95">
    webdav 账号密码<br key="br-63-12-1">
    用户: guest
    密码: guest_Api789
    </p><p key="p-66-1-96">
    <b key="b-67-1-1">重启就会自动更新数据库及搜索索引文件</b><br key="br-67-26-2">
    docker restart xiaoya
    </p><p key="p-69-1-97">
    <a href="https://xiaoyaliu.notion.site/xiaoya-docker-69404af849504fa5bcf9f2dd5ecaa75f" target="_self" key="a-70-1-1" style="color: black;" class=""></a></p><h1 key="h1-70-123-98" style="color: black;"><a href="https://xiaoyaliu.notion.site/xiaoya-docker-69404af849504fa5bcf9f2dd5ecaa75f" target="_self" key="a-70-1-0" style="color: black;" class="">详细的配置指南请点击打开</a></h1>
    </div>`
    // 创建一个临时的 DOM 元素，将模板字符串的内容设置为其 innerHTML
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = maincontent;

    // 使用 jQuery 的 $ 选择器来选取链接元素并添加到 catalogs 数组中
    $('a[href*="whatsnew"]', tempDiv).each(function (i, html) {
        catalogs.push({
            url: $(html).attr('href'),
            title: $(html).text(),
        });
    });

    function startXIAOYA() {
        window.plugin_xiaoya_ready = true;
        Lampa.Component.add('xiaoya', XIAOYA);

        function addSettingsXIAOYA() {
            var ico = '<svg width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17H18C18.5523 17 19 16.5523 19 16V8C19 7.44772 18.5523 7 18 7H14ZM17 9H15V15H17V9Z\" fill=\"white\"/> <path d=\"M6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H6Z\" fill=\"white\"/> <path d=\"M6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6Z\" fill=\"white\"/> <path d=\"M5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16Z\" fill=\"white\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z\" fill=\"white\"/> </svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="channel"><div class="menu__ico">' + ico + '</div><div class="menu__text">小雅</div></li>');
            menu_item.on('hover:enter', function () {
                Lampa.Select.show({
                    title: '小雅Alist',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '小雅Alist - ' + a.title,
                            component: 'xiaoya',
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

        if (window.appready) addSettingsXIAOYA()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsXIAOYA()
            })
        }
    }

    if (!window.plugin_xiaoya_ready) startXIAOYA();

})();
