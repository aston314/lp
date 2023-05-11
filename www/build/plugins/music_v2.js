(function () {
    'use strict';

    function FANGPI(object) {
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true,
            step: 250
        });
        var items = [];
        var html = $('<div></div>');
        var body = $('<div class="freetv_n category-full"></div>');
        var info;
        var last;
        var waitload;
        var player = window.radio_player_;
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
                    'Referer': 'https://www.fangpi.net/'
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
                network["native"](object.url + 'page/' + object.page, function (str) {
                    var result = _this2.card(str);
                    _this2.append(result);
                    if (result.card.length) waitload = false;
                    Lampa.Controller.enable('content');
                },function (a, c) {
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
            $('table > tbody > tr', str).each(function (i, html) {
                // console.log($('a.text-primary',html).text())
                //if ($('.tgme_widget_message_text.js-message_text', html).text().match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
                    card.push({
                        //title: catalogs1[0].list.title.attrName =='text' ? t1.text().replace(/( 第.+?季)/,'') : t1.attr(catalogs1[0].list.title.attrName).replace(/( 第.+?季)/,''),
                        title: $('a.text-primary',html).text(),
                        original_title: '',
                        title_org: '',
                        //url: catalogs1[0].list.link.attrName =='text' ? host+u1.text() : host+u1.attr(catalogs1[0].list.link.attrName),
                        url: 'https://www.fangpi.net/' + $('a.text-primary',html).attr('href'),
                        //img: catalogs1[0].list.thumb.attrName =='text' ? (i1.text().indexOf('http') == -1 ? host+i1.text() : i1.text()) : (i1.attr(catalogs1[0].list.thumb.attrName).indexOf('http') == -1 ? host+i1.attr(catalogs1[0].list.thumb.attrName) : i1.attr(catalogs1[0].list.thumb.attrName)),
                        img: '',
                        quantity: ' ',
                        year: $('.text-success',html).text(),
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
                    release_year: element.year
                });
                // card.addClass('card--category');
                card.addClass('card--collection');
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
                if (element.episodes_info) {
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(element.episodes_info.replace('更新至', '第'));
                };

                card.on('hover:focus', function () {
                    last = card[0];

                    scroll.update(card, true);
                    info.find('.info__title').text(element.title);
                    info.find('.info__title-original').text(element.year);
                    info.find('.info__rate span').text(element.rate);
                    info.find('.info__rate').toggleClass('hide', !(element.rate > 0));
                    var maxrow = Math.ceil(items.length / 7) - 1;
                    // console.log(maxrow)
                    // console.log(card)
                    // console.log(items.indexOf(card))
                    // console.log(Math.ceil(items.indexOf(card) / 7))
                    // if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
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
                        //$('.btn-group a.line-pay-btn', str).each(function (i, str) {
                    //         $('a[href*="www.aliyundrive.com"],a[href*="magnet:?xt=urn:btih:"]', str).each(function (i, html) {
                    //         sources.push({
                    //             title: /.*www\.aliyundrive\.com.*/.test(html.href) ? '阿里云盘 - 资源' + (i + 1) : '磁力链接 - 资源' + (i + 1),
                    //             url: html.href,
                    //         });
                    // });

                    // Lampa.Select.show({
                    //     title: '观看资源',
                    //     items: sources,
                    //     onSelect: function onSelect(a) {
                    //         if (/.*www\.aliyundrive\.com.*/.test(a.url)) {
                    //             Lampa.Activity.push({
                    //                 url: a.url,
                    //                 title: '阿里云盘播放',
                    //                 component: 'yunpan2',
                    //                 movie: element,
                    //                 page: 1
                    //             });
                    //         } else {
                    //             var video = {
                    //                 title: element.name,
                    //                 url: element.video
                    //             };

                    //             if (window.intentShim) {
                    //                 var intentExtra = {
                    //                     title: element.title,
                    //                     poster: element.img,
                    //                     action: "play",
                    //                     data: {
                    //                         lampa: true
                    //                     }
                    //                 };
                    //                 window.plugins.intentShim.startActivity(
                    //                     {
                    //                         action: window.plugins.intentShim.ACTION_VIEW,
                    //                         url: a.url,
                    //                         extras: intentExtra
                    //                     },
                    //                     function () { },
                    //                     function () { console.log('Failed to open magnet URL via Android Intent') }

                    //                 );
                    //             } else {
                    //                 var SERVER = {
                    //                     "object": {
                    //                         "Title": "",
                    //                         "MagnetUri": "",
                    //                         "poster": ""
                    //                     },
                    //                     "movie": {
                    //                         "title": "",
                    //                     }
                    //                 };
                    //                 SERVER.object.MagnetUri = a.url;
                    //                 SERVER.movie.title = element.title;
                    //                 SERVER.object.poster = element.img;
                    //                 Lampa.Android.openTorrent(SERVER);
                    //             };
                    //             Lampa.Controller.toggle('content');
                    //         }

                    //     },
                    //     onBack: function onBack() {
                    //         Lampa.Controller.toggle('content');
                    //     }
                    // });


                    // var html_ = $('<div></div>');
                    //     var navigation = $('<div class="navigation-tabs"></div>');
                    //     sources.forEach(function (tab, i) {
                    //         var button = $('<div class="navigation-tabs__button selector">' + tab.title + '</div>');
                    //         button.on('hover:enter', function () {
                    //             // _this.display = tab.name;

                    //             // _this.open();
                    //             if (/.*www\.aliyundrive\.com.*/.test(tab.url)) {
                    //                 Lampa.Modal.close();
                    //                 Lampa.Activity.push({
                    //                     url: tab.url,
                    //                     title: '阿里云盘播放',
                    //                     component: 'yunpan2',
                    //                     movie: element,
                    //                     page: 1
                    //                 });
                    //             } else {
                    //                 var video = {
                    //                     title: element.name,
                    //                     url: element.video
                    //                 };
    
                    //                 if (window.intentShim) {
                    //                     var intentExtra = {
                    //                         title: element.title,
                    //                         poster: element.img,
                    //                         action: "play",
                    //                         data: {
                    //                             lampa: true
                    //                         }
                    //                     };
                    //                     window.plugins.intentShim.startActivity(
                    //                         {
                    //                             action: window.plugins.intentShim.ACTION_VIEW,
                    //                             url: tab.url,
                    //                             extras: intentExtra
                    //                         },
                    //                         function () { },
                    //                         function () { console.log('Failed to open magnet URL via Android Intent') }
    
                    //                     );
                    //                 } else {
                    //                     var SERVER = {
                    //                         "object": {
                    //                             "Title": "",
                    //                             "MagnetUri": "",
                    //                             "poster": ""
                    //                         },
                    //                         "movie": {
                    //                             "title": "",
                    //                         }
                    //                     };
                    //                     SERVER.object.MagnetUri = tab.url;
                    //                     SERVER.movie.title = element.title;
                    //                     SERVER.object.poster = element.img;
                    //                     Lampa.Android.openTorrent(SERVER);
                    //                 };
                    //                 // Lampa.Controller.toggle('content');
                    //             }
                    //         });
                    //         // if (tab.name == _this.display) button.addClass('active');
                    //         if (i > 0 && i % 3 != 0) navigation.append('<div class="navigation-tabs__split">|</div>');
                    //         if (i % 3 == 0) { // 当 i 是 3 的倍数时，将当前行容器加入到总容器，并新建一个行容器
                    //             if (i > 0) html_.append(navigation);
                    //             navigation = $('<div class="navigation-tabs"></div>');
                    //         }
                    //         navigation.append(button);
                    //     });
                        
                    //     html_.append(navigation);

                    //     Lampa.Modal.open({
                    //         title: element.title,
                    //         html: html_,
                    //         size: 'medium',
                    //         select: html.find('.navigation-tabs .active')[0],
                    //         mask: true,
                    //         onBack: function onBack() {
                    //             Lampa.Modal.close();
                    //             Lampa.Api.clear();
                    //             Lampa.Controller.toggle('content');
                    //         }
                    //     });
                        var urlPattern1 = /['|"](https?:\/\/[^'"]+\.(?:jpg)[^'"]*)['|"]/;
                        var match1 = str.match(urlPattern1);

                        if (match1) {
                            var singercover = match1[1];
                            card.find('.card__img').attr('src', singercover);
                        }
                    

                        var urlPattern = /['|"](https?:\/\/[^'"]+\.(?:mp3|m3u8)[^'"]*)['|"]/;
                        var match = str.match(urlPattern);

                        if (match) {
                            var urlvideo = match[1];
                            var data = {
                                url: urlvideo,
                                title: element.title
                            }
                            player.play(data);
                            // // console.log(urlvideo);
                            // var playlist = [];
                            // var first = {
                            //     url: urlvideo,
                            //     //   timeline: view,
                            //     title: element.title,
                            //     //   subtitles: element.subtitles
                            // };
                            // Lampa.Player.play(first);
                            // playlist.push(first);
                            // Lampa.Player.playlist(playlist);

                        } else {
                            // doparse(element, view, url1_, MacPlayer_, str);
                        }
                    }, function (a, c) {
                        Lampa.Noty.show(network.errorDecode(a, c));
                    }, false, {
                        dataType: 'text',
                        headers: {
                            'Referer': 'https://www.fangpi.net/'
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
            Lampa.Template.add('button_category', "<style>@media screen and (max-width: 2560px) {.freetv_n .card--collection {width: 16.6%!important;}}@media screen and (max-width: 385px) {.freetv_n .card--collection {width: 33.3%!important;}}</style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div><div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div></div>");
            Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
            var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: '音乐 - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        //console.log(new_value)
                        var search_tempalte = 'https://www.fangpi.net/s/#msearchword';
                        var searchurl = search_tempalte.replace('#msearchword',encodeURIComponent(new_value));
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            title: '音乐 - 搜索"' + new_value + '"',
                            component: 'fangpi',
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                })
            });
            this.selectGroup = function () {
                Lampa.Select.show({
                    title: '音乐',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '音乐 - ' + a.title,
                            component: 'fangpi',
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
        title: '伊能静',
        url: 'https://www.fangpi.net/s/%E4%BC%8A%E8%83%BD%E9%9D%99'
    },
    {
        title: '薛之谦',
        url: 'https://www.fangpi.net/s/%E8%96%9B%E4%B9%8B%E8%B0%A6'
    },
    {
        title: '王菲',
        url: 'https://www.fangpi.net/s/%E7%8E%8B%E8%8F%B2'
    },
    {
        title: '陈奕迅',
        url: 'https://www.fangpi.net/s/%E9%99%88%E5%A5%95%E8%BF%85'
    },
    {
        title: 'Beyond',
        url: 'https://www.fangpi.net/s/Beyond'
    },
    {
        title: '周杰伦',
        url: 'https://www.fangpi.net/s/%E5%91%A8%E6%9D%B0%E4%BC%A6'
    },
    {
        title: '孙燕姿',
        url: 'https://www.fangpi.net/s/%E5%AD%99%E7%87%95%E5%A7%BF'
    },
    {
        title: '王力宏',
        url: 'https://www.fangpi.net/s/%E7%8E%8B%E5%8A%9B%E5%AE%8F'
    }, {
        title: '抖音',
        url: 'https://www.fangpi.net/s/%E6%8A%96%E9%9F%B3'
    }];

    function player() {
        var html = Lampa.Template.get('radio_player', {});
        var audio = new Audio();
        var url = '';
        var played = false;
        var hls;
        audio.addEventListener("play", function (event) {
          played = true;
          html.toggleClass('loading', false);
        });
  
        function prepare() {
          if (audio.canPlayType('application/vnd.apple.mpegurl') || url.indexOf('.mp3') > 0) load();else if (Hls.isSupported()) {
            try {
              hls = new Hls();
              hls.attachMedia(audio);
              hls.loadSource(url);
              hls.on(Hls.Events.ERROR, function (event, data) {
                if (data.details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR) {
                  if (data.reason === "no EXTM3U delimiter") {
                    Lampa.Noty.show('流媒体文件加载错误');
                  }
                }
              });
              hls.on(Hls.Events.MANIFEST_LOADED, function () {
                start();
              });
            } catch (e) {
              Lampa.Noty.show('流媒体文件加载错误');
            }
          } else load();
        }
  
        function load() {
          audio.src = url;
          audio.load();
          start();
        }
  
        function start() {
          var playPromise;
  
          try {
            playPromise = audio.play();
          } catch (e) {}
  
          if (playPromise !== undefined) {
            playPromise.then(function () {
              console.log('Radio', 'start plaining');
            })["catch"](function (e) {
              console.log('Radio', 'play promise error:', e.message);
            });
          }
        }
  
        function play() {
          html.toggleClass('loading', true);
          html.toggleClass('stop', false);
          prepare();
        }
  
        function stop() {
          played = false;
          html.toggleClass('stop', true);
          html.toggleClass('loading', false);
  
          if (hls) {
            hls.destroy();
            hls = false;
          }
  
          audio.src = '';
        }
  
        html.on('hover:enter', function () {
          if (played) stop();else if (url) play();
        });
  
        this.create = function () {
          $('.head__actions .open--search').before(html);
        };
  
        this.play = function (data) {
          stop();
        //   url = data.stream_320 ? data.stream_320 : data.stream_128 ? data.stream_128 : data.stream_hls.replace('playlist.m3u8', '96/playlist.m3u8');
        //   url = data.playUrl.ts64;
          url = data.url;
          html.find('.radio-player__name').text(data.title);
          html.toggleClass('hide', false);
          play();
        };
    }

    function startFANGPI() {
        window.radio = true;
      
        Lampa.Template.add('radio_item', "<div class=\"selector radio-item\">\n        <div class=\"radio-item__imgbox\">\n            <img class=\"radio-item__img\" />\n        </div>\n\n        <div class=\"radio-item__name\">{name}</div>\n    </div>");
        Lampa.Template.add('radio_player', "<div class=\"selector radio-player stop hide\">\n        <div class=\"radio-player__name\">Radio Record</div>\n\n        <div class=\"radio-player__button\">\n            <i></i>\n            <i></i>\n            <i></i>\n            <i></i>\n        </div>\n    </div>");
        Lampa.Template.add('radio_style', "<style>\n    .radio-item {\n        width: 8em;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-item__imgbox {\n        background-color: #3E3E3E;\n        padding-bottom: 83%;\n        position: relative;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n      }\n      .radio-item__img {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n      .radio-item__name {\n        font-size: 1.1em;\n        margin-top: 0.8em;\n      }\n      .radio-item.focus .radio-item__imgbox:after {\n        border: solid 0.4em #fff;\n        content: \"\";\n        display: block;\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n      }\n      .radio-item + .radio-item {\n        margin-left: 1em;\n      }\n      \n      @-webkit-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @-moz-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @-o-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      @-webkit-keyframes sound-loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n                  transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n                  transform: rotate(360deg);\n        }\n      }\n      @-moz-keyframes sound-loading {\n        0% {\n          -moz-transform: rotate(0deg);\n               transform: rotate(0deg);\n        }\n        100% {\n          -moz-transform: rotate(360deg);\n               transform: rotate(360deg);\n        }\n      }\n      @-o-keyframes sound-loading {\n        0% {\n          -o-transform: rotate(0deg);\n             transform: rotate(0deg);\n        }\n        100% {\n          -o-transform: rotate(360deg);\n             transform: rotate(360deg);\n        }\n      }\n      @keyframes sound-loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n             -moz-transform: rotate(0deg);\n               -o-transform: rotate(0deg);\n                  transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n             -moz-transform: rotate(360deg);\n               -o-transform: rotate(360deg);\n                  transform: rotate(360deg);\n        }\n      }\n      .radio-player {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n           -moz-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n        padding: 0.2em 0.8em;\n        background-color: rgb(255 255 255 / 0%);\n      }\n      .radio-player__name {\n        margin-right: 1em;\n        white-space: nowrap;\n        overflow: hidden;\n        -o-text-overflow: ellipsis;\n           text-overflow: ellipsis;\n        max-width: 8em;\n      }\n      @media screen and (max-width: 385px) {\n        .radio-player__name {\n          display: none;\n        }\n      }\n      .radio-player__button {\n        position: relative;\n        width: 1.5em;\n        height: 1.5em;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n           -moz-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n           -moz-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player__button i {\n        display: block;\n        width: 0.2em;\n        background-color: #fff;\n        margin: 0 0.1em;\n        -webkit-animation: sound 0ms -800ms linear infinite alternate;\n           -moz-animation: sound 0ms -800ms linear infinite alternate;\n             -o-animation: sound 0ms -800ms linear infinite alternate;\n                animation: sound 0ms -800ms linear infinite alternate;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player__button i:nth-child(1) {\n        -webkit-animation-duration: 474ms;\n           -moz-animation-duration: 474ms;\n             -o-animation-duration: 474ms;\n                animation-duration: 474ms;\n      }\n      .radio-player__button i:nth-child(2) {\n        -webkit-animation-duration: 433ms;\n           -moz-animation-duration: 433ms;\n             -o-animation-duration: 433ms;\n                animation-duration: 433ms;\n      }\n      .radio-player__button i:nth-child(3) {\n        -webkit-animation-duration: 407ms;\n           -moz-animation-duration: 407ms;\n             -o-animation-duration: 407ms;\n                animation-duration: 407ms;\n      }\n      .radio-player__button i:nth-child(4) {\n        -webkit-animation-duration: 458ms;\n           -moz-animation-duration: 458ms;\n             -o-animation-duration: 458ms;\n                animation-duration: 458ms;\n      }\n      .radio-player.stop .radio-player__button {\n        -webkit-border-radius: 100%;\n           -moz-border-radius: 100%;\n                border-radius: 100%;\n        border: 0.2em solid #fff;\n      }\n      .radio-player.stop .radio-player__button i {\n        display: none;\n      }\n      .radio-player.stop .radio-player__button:after {\n        content: \"\";\n        width: 0.5em;\n        height: 0.5em;\n        background-color: #fff;\n      }\n      .radio-player.loading .radio-player__button:before {\n        content: \"\";\n        display: block;\n        border-top: 0.2em solid #fff;\n        border-left: 0.2em solid transparent;\n        border-right: 0.2em solid transparent;\n        border-bottom: 0.2em solid transparent;\n        -webkit-animation: sound-loading 1s linear infinite;\n           -moz-animation: sound-loading 1s linear infinite;\n             -o-animation: sound-loading 1s linear infinite;\n                animation: sound-loading 1s linear infinite;\n        width: 0.9em;\n        height: 0.9em;\n        -webkit-border-radius: 100%;\n           -moz-border-radius: 100%;\n                border-radius: 100%;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player.loading .radio-player__button i {\n        display: none;\n      }\n      .radio-player.focus {\n        background-color: #fff;\n        color: #000;\n      }\n      .radio-player.focus .radio-player__button {\n        border-color: #000;\n      }\n      .radio-player.focus .radio-player__button i, .radio-player.focus .radio-player__button:after {\n        background-color: #000;\n      }\n      .radio-player.focus .radio-player__button:before {\n        border-top-color: #000;\n      }\n    </style>");
        
        window.plugin_fangpi_ready = true;
        Lampa.Component.add('fangpi', FANGPI);

        function addSettingsFANGPI() {
            window.radio_player_ = new player();
            var ico = '<svg width="24" height="24" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg"><path d="M.649.068A.03.03 0 0 0 .625.061l-.39.06A.03.03 0 0 0 .21.15v.31A.104.104 0 0 0 .165.45.105.105 0 1 0 .27.555V.326L.6.274V.4A.104.104 0 0 0 .555.39.105.105 0 1 0 .66.495V.09A.03.03 0 0 0 .649.068ZM.165.6A.045.045 0 1 1 .21.555.045.045 0 0 1 .165.6Zm.39-.06A.045.045 0 1 1 .6.495.045.045 0 0 1 .555.54ZM.6.214l-.33.05v-.09L.6.126Z" fill="white"/></svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="channel"><div class="menu__ico">' + ico + '</div><div class="menu__text">音乐</div></li>');
            menu_item.on('hover:enter', function () {
                Lampa.Select.show({
                    title: '音乐',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '音乐 - ' + a.title,
                            component: 'fangpi',
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
            window.radio_player_.create();
        }

        if (window.appready) addSettingsFANGPI()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsFANGPI()
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

    if (!window.plugin_fangpi_ready) startFANGPI();

})();
