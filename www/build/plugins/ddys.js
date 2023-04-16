(function () {
    'use strict';

    function DDYS(object) {
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
        //var cors = Lampa.Utils.checkHttp('proxy.cub.watch/cdn/');
        var cors = 'https://cors.eu.org/';



        // this.getQueryString = function (link, name) {
        //     let reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
        //     //console.log(link)
        //     let r = link.match(reg);
        //     if (r != null) {
        //         return decodeURIComponent(r[2]);
        //     };
        //     return null;
        // };

        this.create = function () {
            //console.log(object.url)
            var _this = this;

            this.activity.loader(true);

            network["native"](object.url, function (str) {
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
                dataType: 'text',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15',
                    'Referer': "https://ddys.pro/"
                }
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
                network["native"](object.url + 'page/' + object.page+'/', function (str) {
                    var result = _this2.card(str);
                    _this2.append(result);
                    if (result.card.length) waitload = false;
                    Lampa.Controller.enable('content');
                },function (a, c) {
                    Lampa.Noty.show(network.errorDecode(a, c));
                }, false, {
                    dataType: 'text',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15',
                        'Referer': "https://ddys.pro/"
                    }
                });
            //}
        };

        this.card = function (str) {
            var _this5 = this;

            var card = [];
            var page;

            str = str.replace(/\n/g, '');
            // var h =  $(v+object.quantity, str);
            // //console.log(h)
            // total_pages = $(p, str).find('a').length;

            // var host = object.url.indexOf('http') == -1 ? '' : object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0];
            // //console.log($(p, str).find('a').last().attr('href'))
            // // :last-child
            // //page = $(p, str).find('a').last().attr('href').indexOf('http') == -1 ? host+$(p, str).find('a').last().attr('href') : $(p, str).find('a').last().attr('href');
            // page = $('.tme_messages_more', str).attr('href') ? $('.tme_messages_more', str).attr('href').match(/[0-9]+(?=[^0-9]*$)(.*)/) : null;

            // if (page) {
            //     object.gotopage = page;
            // } else {
            //     page = '';
            // };


            // //console.log(object.search)
            // if (page) {
            //     if (page.indexOf('http') == -1) {
            //         page = host + page;
            //     };
            //     if (page.indexOf('#') !== -1) {
            //         page = object.url;
            //     };
            // };
            //console.log(page)
            ($('div.post-box-container', str)||$('article', str)).each(function (i, html) {
                //if ($('.tgme_widget_message_text.js-message_text', html).text().match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
                    var regex = /第(\d+)季/;
                    var match = regex.exec($('h2 > a', html).text()) ? regex.exec($('h2 > a', html).text())[1] + "/" : "";
                    card.push({
                        //title: catalogs1[0].list.title.attrName =='text' ? t1.text().replace(/( 第.+?季)/,'') : t1.attr(catalogs1[0].list.title.attrName).replace(/( 第.+?季)/,''),
                        title: $('h2 > a', html).text(),
                        original_title: '',
                        title_org: '',
                        //url: catalogs1[0].list.link.attrName =='text' ? host+u1.text() : host+u1.attr(catalogs1[0].list.link.attrName),
                        url: $('h2 > a', html).attr('href') + match,
                        //img: catalogs1[0].list.thumb.attrName =='text' ? (i1.text().indexOf('http') == -1 ? host+i1.text() : i1.text()) : (i1.attr(catalogs1[0].list.thumb.attrName).indexOf('http') == -1 ? host+i1.attr(catalogs1[0].list.thumb.attrName) : i1.attr(catalogs1[0].list.thumb.attrName)),
                        img: /url\((.*?)\)/.exec($('div.post-box-image', html).attr('style'))[1],
                        quantity: ' ',
                        year: '',
                        update: '',//$('span.pic-text', html).text().indexOf('/' != -1) ? $('span.pic-text', html).text().split('/')[0].replace('已完结','') : $('span.pic-text', html).text().replace('已完结',''),
                        score: ''//$('span.pic-tag', html).text()
                    });
                //};
            });
            return {
                card: card,
                page: page,
                //total_pages: total_pages
            };
        };

        this.append = function (data) {
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
                    if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
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
                    Lampa.Modal.open({
                        title: '',
                        html: Lampa.Template.get('modal_loading'),
                        size: 'small',
                        align: 'center',
                        mask: true,
                        onBack: function onBack() {
                          Lampa.Modal.close();
                          Lampa.Api.clear();
                          Lampa.Controller.toggle('content');
                        }
                      });
                    //console.log(element)
                    //element.img = element.cover;
                    element.original_title = '';
                    element.title = mytitle;
                    //element.img = object.movie.img;
                    // Lampa.Activity.push({
                    //     url: element.url,
                    //     title: '阿里云盘播放',
                    //     component: 'yunpan2',
                    //     movie: element,
                    //     page: 1
                    // });
                    // network["native"](element.url, function (json) {
                    //     if (json.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
                    //         var link = json.match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)[0];
                    //         //element.img = object.element.img;
                    //         //element.original_title = '';
                    //         Lampa.Activity.push({
                    //             url: link,
                    //             title: '阿里云盘播放',
                    //             component: 'yunpan2',
                    //             movie: element,
                    //             page: 1
                    //         });
                    //     } else Lampa.Noty.show('没有找到对应的阿里云盘资源');

                    // }, function (a, c) {
                    //     Lampa.Noty.show(network.errorDecode(a, c));
                    // }, false, {
                    //     dataType: 'text',
                    // });
                    var sources = [];

                    network["native"](element.url, function (str) {
                        Lampa.Modal.close();
                        // Lampa.Api.clear();
                        // Lampa.Controller.toggle('content');
                        //$('.btn-group a.line-pay-btn', str).each(function (i, str) {
                        var playlistScript = $('.wp-playlist-script', str).text();
                        var playlistData = JSON.parse(playlistScript);
                        // console.log(playlistData.tracks)
                        
                        playlistData.tracks.forEach(function (html) {
                            sources.push({
                                title: html.caption,
                                url: "https://ddys.pro/getvddr/video?dim=1080P&type=mix&id=" + html.src1,
                                subtitles: []
                            });
                            
                        });
                        // console.log(sources)
                        

                        var html_ = $('<div></div>');
                        var navigation = $('<div class="navigation-tabs"></div>');
                        sources.forEach(function (tab, i) {
                            var button = $('<div class="navigation-tabs__button selector">' + tab.title + '</div>');
                            button.on('hover:enter', function () {
                                // _this.display = tab.name;

                                // _this.open();
                                network["native"](tab.url, function (data) {
                                    if (data.url) {
                                        var playlist = [];
                                        var first = {
                                            url: data.url,
                                            //   timeline: view,
                                            title: a.title,
                                            subtitles: a.subtitles
                                        };
                                        Lampa.Player.play(first);

                                        playlist.push(first);
                                        Lampa.Player.playlist(playlist);

                                    } else {
                                        Lampa.Noty.show('无法检索播放链接');
                                    }
                                    // Lampa.Controller.toggle('content');

                                }, function (a, c) {
                                    Lampa.Noty.show(network.errorDecode(a, c));
                                }, false, {
                                    dataType: 'json',
                                    headers: {
                                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15',
                                        'Referer': "https://ddys.pro/"
                                    }
                                });
                            });
                            // if (tab.name == _this.display) button.addClass('active');
                            if (i > 0) navigation.append('<div class="navigation-tabs__split">|</div>');
                            if (i % 3 == 0) { // 当 i 是 3 的倍数时，将当前行容器加入到总容器，并新建一个行容器
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


                        // Lampa.Select.show({
                        //     title: '播放列表',
                        //     items: sources,
                        //     onSelect: function onSelect(a) {
                        //         // Lampa.Activity.push({
                        //         //     url: a.url,
                        //         //     title: '阿里云盘播放',
                        //         //     component: 'yunpan2',
                        //         //     movie: element,
                        //         //     page: 1
                        //         // });
                        //         network["native"](a.url, function (data) {
                        //             if (data.url) {
                        //                 var playlist = [];
                        //                 var first = {
                        //                     url: data.url,
                        //                     //   timeline: view,
                        //                     title: a.title,
                        //                     subtitles: a.subtitles
                        //                 };
                        //                 Lampa.Player.play(first);

                        //                 playlist.push(first);
                        //                 Lampa.Player.playlist(playlist);

                        //             } else {
                        //                 Lampa.Noty.show('无法检索播放链接');
                        //             }
                        //             Lampa.Controller.toggle('content');

                        //         }, function (a, c) {
                        //             Lampa.Noty.show(network.errorDecode(a, c));
                        //         }, false, {
                        //             dataType: 'json',
                        //             headers: {
                        //                 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15',
                        //                 'Referer': "https://ddys.pro/"
                        //             }
                        //         });
                        //     },
                        //     onBack: function onBack() {
                        //         Lampa.Controller.toggle('content');
                        //     }
                        // });

                        

                    }, function (a, c) {
                        Lampa.Noty.show(network.errorDecode(a, c));
                    }, false, {
                        dataType: 'text',
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15',
                            'Referer': "https://ddys.pro/"
                        }
                    });
                });
                body.append(card);
                items.push(card);
            });
        };

        this.build = function (data) {
            var _this2 = this;
            //info = Lampa.Template.get('info');style="height:5em"
            Lampa.Template.add('button_category', "<div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div><div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div></div>");
            Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
            var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: '低端影视 - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        //console.log(new_value)
                        var search_tempalte = 'https://ddys.pro/?s=#msearchword&post_type=post';
                        var searchurl = search_tempalte.replace('#msearchword',encodeURIComponent(new_value));
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            title: '低端影视 - 搜索"' + new_value + '"',
                            component: 'ddys',
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                })
            });
            this.selectGroup = function () {
                Lampa.Select.show({
                    title: '低端影视',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '低端影视 - ' + a.title,
                            component: 'ddys',
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

    var catalogs = [
    {
        title: '首页',
        url: 'https://ddys.pro/'
    },
    {
        title: '电影',
        url: 'https://ddys.pro/category/movie/'
    },
    {
        title: '剧集',
        url: 'https://ddys.pro/category/airing/'
    },
    {
        title: '欧美剧',
        url: 'https://ddys.pro/category/drama/western-drama/'
    },
    {
        title: '韩剧',
        url: 'https://ddys.pro/category/drama/kr-drama/'
    },
    {
        title: '日剧',
        url: 'https://ddys.pro/category/drama/jp-drama/'
    },
    {
        title: '动画',
        url: 'https://ddys.pro/category/anime/'
    }];

    function startDDYS() {
        window.plugin_ddys_ready = true;
        Lampa.Component.add('ddys', DDYS);

        function addSettingsDDYS() {
            var ico = '<svg width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17H18C18.5523 17 19 16.5523 19 16V8C19 7.44772 18.5523 7 18 7H14ZM17 9H15V15H17V9Z\" fill=\"white\"/> <path d=\"M6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H6Z\" fill=\"white\"/> <path d=\"M6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6Z\" fill=\"white\"/> <path d=\"M5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16Z\" fill=\"white\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z\" fill=\"white\"/> </svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="channel"><div class="menu__ico">' + ico + '</div><div class="menu__text">低端</div></li>');
            menu_item.on('hover:enter', function () {
                Lampa.Select.show({
                    title: '低端影视',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '低端影视 - ' + a.title,
                            component: 'ddys',
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

        if (window.appready) addSettingsDDYS()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsDDYS()
            })
        }

        // Lampa.Listener.follow('app', function (e) {
        //     if (e.type == 'ready') {
        //         var ico = '<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="#fff"><path d="M19.553 2.997a2.231 2.231 0 0 0-.7.167h-.003c-.214.085-1.23.512-2.775 1.16l-5.537 2.332C6.565 8.328 2.66 9.976 2.66 9.976l.046-.018s-.269.088-.55.281a1.522 1.522 0 0 0-.44.425 1.248 1.248 0 0 0-.208.833c.068.541.419.866.67 1.045.255.181.498.266.498.266h.006l3.662 1.234c.164.527 1.116 3.656 1.345 4.377.135.43.266.7.43.905.08.105.173.193.284.263a.839.839 0 0 0 .184.08l-.038-.009c.011.003.02.012.028.015.03.008.05.011.088.017.58.176 1.045-.184 1.045-.184l.026-.021 2.162-1.969 3.624 2.78.083.035c.755.332 1.52.147 1.924-.178.407-.328.566-.747.566-.747l.026-.068 2.8-14.347c.08-.354.1-.685.012-1.007a1.355 1.355 0 0 0-.586-.785 1.404 1.404 0 0 0-.8-.203Zm-.076 1.537c-.003.047.006.042-.015.133v.008l-2.774 14.197c-.012.02-.032.065-.088.109-.058.046-.105.076-.349-.021l-4.433-3.398-2.677 2.441.563-3.593 7.242-6.75c.298-.277.199-.336.199-.336.021-.341-.451-.1-.451-.1l-9.132 5.657-.003-.015-4.377-1.474v-.003l-.011-.002a.203.203 0 0 0 .022-.009l.024-.012.023-.008 7.881-3.32c1.989-.838 3.993-1.681 5.534-2.333A605.484 605.484 0 0 1 19.4 4.558c.061-.024.032-.024.076-.024Z" stroke-width="2"/></svg>';
        //         var menu_item = $('<li class="menu__item selector focus" data-action="yyds"><div class="menu__ico">' + ico + '</div><div class="menu__text">频道</div></li>');
        //         menu_item.on('hover:enter', function () {
        //             Lampa.Select.show({
        //                 title: '频道',
        //                 items: catalogs,
        //                 onSelect: function onSelect(a) {
        //                     Lampa.Activity.push({
        //                         url: a.url,
        //                         title: '频道 - ' + a.title,
        //                         component: 'tg',
        //                         page: 1
        //                     });
        //                 },
        //                 onBack: function onBack() {
        //                     Lampa.Controller.toggle('menu');
        //                 }
        //             });
        //         });
        //         //$('.menu .menu__list').eq(0).append(menu_item);
        //         $('.menu .menu__list .menu__item.selector').eq(1).after(menu_item);
        //     }
        // });
    }

    if (!window.plugin_ddys_ready) startDDYS();

})();
