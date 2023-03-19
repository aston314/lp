(function () {
    'use strict';
    var MOBILE_UA = "Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36";
    var PC_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36";
    var UA = "Mozilla/5.0";
    var UC_UA = "Mozilla/5.0 (Linux; U; Android 9; zh-CN; MI 9 Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.5.5.1035 Mobile Safari/537.36";
    var IOS_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

    function WC(object) {
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

        this.create = function () {
            //console.log(object.url)
            var _this = this;

            this.activity.loader(true);

            network["native"](object.url, function (str) {
                //this.build.bind(this)
                if (object.type == 'live') {
                    //console.log($('.embed-responsive-item', str).attr('src'))
                    var empty = new Lampa.Empty({
                        descr: object.title.replace('直播源 - ',''),
                        title: object.content
                    });
                    html.append(empty.render());
                    _this.activity.loader(false);
                    // //worked = true;
                    // var chrome = $('<div class="screensaver-chrome"><iframe referrerPolicy="no-referrer" allowfullscreen src="'+$('.embed-responsive-item', str).attr('src')+'" class="screensaver-chrome__iframe"></iframe><div class="live-chrome__overlay"></div></div>');
                    // console.log(chrome)
                    // chrome.find('.live-chrome__overlay').on('click', function () {
                    // //stopSlideshow();
                    // if (chrome) {
                    //     chrome.remove();
                    //     chrome = false;
                    // }
                    // });
                    
                    // $('body').append(chrome);

                    // Lampa.Controller.add('iframe', {
                    //     toggle: function toggle() {},
                    //     back: close$1
                    //   });
                    //   Lampa.Controller.toggle('iframe');
                    Lampa.Iframe.show({
                        //url: $('.embed-responsive-item', str).attr('src'),
                        url: object.url,
                        onBack: function onBack() {
                          Lampa.Controller.toggle('content');
                        }
                      });
                      $('.iframe__body iframe').removeClass('iframe__window');
                      $('.iframe__body iframe').addClass('screensaver-chrome__iframe');
                } else {
                    var data = _this.card(str);
                    _this.build(data);
                };
                
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
                    'User-Agent': PC_UA
                }
            });
            return this.render();
        };

        this.next = function () {
            var _this2 = this;
            if (waitload) return;
            if (object.gotopage) {
                var postdata = {
                    before: object.gotopage[0],
                };
                waitload = true;
                object.page++;
                network.silent(object.url + '?before=' + object.gotopage[0], function (str) {
                    var result = _this2.card(str);
                    _this2.append(result);
                    if (result.card.length) waitload = false;
                    Lampa.Controller.enable('content');
                }, false, postdata, {
                    dataType: 'text'
                });
            }
        };

        this.card = function (str) {
            var _this5 = this;

            var card = [];
            var page;

            str = str.replace(/\n/g, '');
            // var h =  $(v+object.quantity, str);
            // //console.log(h)
            // total_pages = $(p, str).find('a').length;

            var host = object.url.indexOf('http') == -1 ? '' : object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0];
            // //console.log($(p, str).find('a').last().attr('href'))
            // // :last-child
            // //page = $(p, str).find('a').last().attr('href').indexOf('http') == -1 ? host+$(p, str).find('a').last().attr('href') : $(p, str).find('a').last().attr('href');
            page = $('.page-link', str).attr('href') ? $('.page-link', str).attr('href').match(/[0-9]+(?=[^0-9]*$)(.*)/) : null;

            if (page) {
                object.gotopage = page;
            } else {
                page = '';
            };

            $('.list-group-item', str).each(function (i, html) {
                    card.push({
                        //title: catalogs1[0].list.title.attrName =='text' ? t1.text().replace(/( 第.+?季)/,'') : t1.attr(catalogs1[0].list.title.attrName).replace(/( 第.+?季)/,''),
                        title: $('.text-right',html).length == 1 ? $('.text-right',html).text().replace(/\n/g,'') + ' VS ' + $('.text-left',html).text().replace(/\n/g,'') : $(this).text().trim(),
                        original_title: '',
                        title_org: '',
                        //url: catalogs1[0].list.link.attrName =='text' ? host+u1.text() : host+u1.attr(catalogs1[0].list.link.attrName),
                        url: $('.pay-btn',html).text().indexOf('暂无') != -1 ? '未开' : 'http://www.88kanqiu.top' + (typeof $('a.btn[target=\'_blank\']',html).attr('href') !== 'undefined' ? $('a.btn[target=\'_blank\']',html).attr('href') : $('a',html).attr('href')) ,
                        //img: catalogs1[0].list.thumb.attrName =='text' ? (i1.text().indexOf('http') == -1 ? host+i1.text() : i1.text()) : (i1.attr(catalogs1[0].list.thumb.attrName).indexOf('http') == -1 ? host+i1.attr(catalogs1[0].list.thumb.attrName) : i1.attr(catalogs1[0].list.thumb.attrName)),
                        img: $('div.text-right + div.col-xs-1 img',html).attr('src') =='/static/img/default-img.png' ? 'http://www.88kanqiu.top/static/img/default-img.png' : $('div.text-right + div.col-xs-1 img',html).attr('src'),
                        quantity: $('.game-type',html).text(),
                        year: '',
                        rate:$('.category-game-time',html).text().replace(/\n/g,''),
                        episodes_info: $('.pay-btn',html).text().indexOf('暂无') != -1 ? '未开始' : $('.pay-btn',html).text(),
                        update: '',//$('span.pic-text', html).text().indexOf('/' != -1) ? $('span.pic-text', html).text().split('/')[0].replace('已完结','') : $('span.pic-text', html).text().replace('已完结',''),
                        score: '',//$('span.pic-tag', html).text()
                    });
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
                //card.addClass('card--category');
                card.addClass('card--collection');
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
                    info.find('.info__title-original').text(element.quantity);
                    info.find('.info__rate span').text(element.rate);
                    info.find('.info__create').text(element.episodes_info);
                    info.find('.info__rate').toggleClass('hide', !(element.rate > 0));
                    var maxrow = Math.ceil(items.length / 7) - 1;
                    if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
                    if (element.img) Lampa.Background.change(cardImgBackground(element.img));
                    //if (Lampa.Helper) Lampa.Helper.show('tg_detail', '长按住 (ОК) 键查看详情', card);
                });
                //console.log(element.url)
                //console.log((element.episodes_info.trim().indexOf('直播中') !== -1))
                if (element.episodes_info.trim() == '直播中'){
                card.on('hover:enter', function (target, card_data) {
                    var sources = [];

                    network["native"](element.url+'-url', function (str) {
                        //$('.btn-group a.line-pay-btn', str).each(function (i, str) {
                        str.forEach(function (element) {
                            sources.push({
                                title:  element.name,
                                url: element.url,
                            });
                    });

                    Lampa.Select.show({
                        title: '直播源',
                        items: sources,
                        onSelect: function onSelect(a) {
                            // Lampa.Activity.push({
                            //     url: a.url,
                            //     title: '直播源 - ' + a.title,
                            //     component: 'worldcup',
                            //     type: 'live',
                            //     content: element.title,
                            //     page: 1
                            // });
                            Lampa.Iframe.show({
                                //url: $('.embed-responsive-item', str).attr('src'),
                                url: a.url,
                                onBack: function onBack() {
                                  Lampa.Controller.toggle('content');
                                }
                              });
                              $('.iframe__body iframe').removeClass('iframe__window');
                              $('.iframe__body iframe').addClass('screensaver-chrome__iframe');
                        },
                        onBack: function onBack() {
                            Lampa.Controller.toggle('content');
                        }
                    });

                    }, function (a, c) {
                        Lampa.Noty.show(network.errorDecode(a, c));
                    }, false, {
                        dataType: 'json'
                    });

                    // //console.log(element)
                    // //element.img = element.cover;
                    // element.original_title = '';
                    // element.title = mytitle;
                    // //element.img = object.movie.img;
                    // var playlist = [{ title: 'CCTV-5FHD', url: 'http://60.213.134.68/tlivecloud-ipv6.ysp.cctv.cn/ysp/2000205103.m3u8', tv: true }, { title: 'CCTV-5HD', url: 'http://39.135.138.58:18890/PLTV/88888888/224/3221225633/index.m3u8', tv: true }, { title: 'CCTV-5HD', url: 'http://39.135.138.58:18890/PLTV/88888888/224/3221225751/index.m3u8', tv: true }, { title: 'CCTV-5HD', url: 'http://39.135.138.58:18890/PLTV/88888888/224/3221225752/index.m3u8', tv: true }, { title: 'CCTV-5HD', url: 'http://39.135.138.58:18890/PLTV/88888888/224/3221225753/index.m3u8', tv: true }, { title: 'CCTV-5HD', url: 'http://39.135.138.58:18890/PLTV/88888888/224/3221225754/index.m3u8', tv: true }, { title: 'CCTV-5HD', url: 'http://39.135.138.58:18890/PLTV/88888888/224/3221225755/index.m3u8', tv: true }, { title: 'CCTV-5HD', url: 'http://39.135.138.58:18890/PLTV/88888888/224/3221225756/index.m3u8', tv: true }, { title: 'CCTV-5HD', url: 'http://39.134.115.163:8080/PLTV/88888910/224/3221225633/index.m3u8', tv: true }, { title: 'CCTV-5+HD', url: 'http://39.135.138.58:18890/PLTV/88888888/224/3221225649/index.m3u8', tv: true }, { title: 'CCTV-5+HD', url: 'http://39.135.138.58:18890/PLTV/88888888/224/3221225706/index.m3u8', tv: true }, { title: 'CCTV-5+HD', url: 'http://39.134.115.163:8080/PLTV/88888910/224/3221225649/index.m3u8', tv: true }];
                    
                    // var video = {
                    //     title: element.title,
                    //     url: 'http://60.213.134.68/tlivecloud-ipv6.ysp.cctv.cn/ysp/2000205103.m3u8',
                    //     tv: true
                    // };
                    // Lampa.Player.play(video);
                    // Lampa.Player.playlist(playlist);
                });
                }
                body.append(card);
                items.push(card);
            });
        };

        this.build = function (data) {
            var _this2 = this;
            //info = Lampa.Template.get('info');style="height:5em"
            Lampa.Template.add('button_category', "<style>@media screen and (max-width: 2560px) {.card--collection {width: 16.6%!important;}}@media screen and (max-width: 385px) {.card--collection {width: 33.3%!important;}}</style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div>  </div>");
            Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
            var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: '频道 - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        //console.log(new_value)
                        var searchurl = object.url.match(/\?q=(.+)/) ? object.url.replace(object.url.match(/\?q=(.+)/)[1], encodeURIComponent(new_value)) : (object.url.indexOf('q=' == -1) ? object.url + '?q=' + encodeURIComponent(new_value) : object.url.replace('q=', 'q=' + encodeURIComponent(new_value)));
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            title: '频道 - 搜索"' + new_value + '"',
                            component: 'tg',
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                })
            });
            this.selectGroup = function () {
                Lampa.Select.show({
                    title: '赛事',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '赛事 - ' + a.title,
                            component: 'worldcup',
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

        function cardImgBackground(card_data) {
            if (Lampa.Storage.field('background')) {
                return Lampa.Storage.get('background_type', 'complex') == 'poster' && card_data ? card_data : card_data;
            }
            return '';
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
            //doubanitem = null;
        };
    }

    var catalogs = [{
        title: '首页',
        url: 'http://www.88kanqiu.top/'
    },{
        title: 'NBA',
        url: 'http://www.88kanqiu.top/match/1/live'
    },{
        title: '英超',
        url: 'http://www.88kanqiu.top/match/8/live'
    },{
        title: '西甲',
        url: 'http://www.88kanqiu.top/match/9/live'
    }, {
        title: '意甲',
        url: 'http://www.88kanqiu.top/match/10/live'
    },{
        title: '德甲',
        url: 'http://www.88kanqiu.top/match/14/live'
    },{
        title: '法甲',
        url: 'http://www.88kanqiu.top/match/15/live'
    },{
        title: '中超',
        url: 'http://www.88kanqiu.top/match/17/live'
    },{
        title: '欧冠',
        url: 'http://www.88kanqiu.top/match/12/live'
    },{
        title: 'CBA',
        url: 'http://www.88kanqiu.top/match/2/live'
    }, {
        title: '网球',
        url: 'http://www.88kanqiu.top/match/29/live'
    },{
        title: '斯诺克',
        url: 'http://www.88kanqiu.top/match/30/live'
    },     ];

    function startworldcup() {
        window.plugin_wc_ready = true;
        Lampa.Component.add('worldcup', WC);

        function addSettingsWC() {
            var ico = '<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.666 28.667a13.001 13.001 0 1 1 13.001-13.001 13.012 13.012 0 0 1-13.001 13.001Zm0-24a11 11 0 1 0 11.002 10.999 11.013 11.013 0 0 0-11-11Z" fill="#fff"/><path d="M7.121 20.387a12.494 12.494 0 0 1-3.214-.413 1.001 1.001 0 0 1-.733-1.213 1.012 1.012 0 0 1 1.213-.721c.896.209 1.812.306 2.734.293a11.013 11.013 0 0 0 11-11 10.584 10.584 0 0 0-.439-3.067 1.027 1.027 0 1 1 1.987-.52 12.692 12.692 0 0 1 .52 3.64A13.012 13.012 0 0 1 7.121 20.387Zm9.012 8.268a1.001 1.001 0 0 1-.987-.84 9.038 9.038 0 0 1-.133-1.6 10.467 10.467 0 0 1 10.452-10.452 9.665 9.665 0 0 1 2.348.268.987.987 0 0 1 .748 1.201 1.001 1.001 0 0 1-1.201.748 8.003 8.003 0 0 0-1.893-.212 8.456 8.456 0 0 0-8.466 8.453c.001.424.037.847.108 1.266a1.012 1.012 0 0 1-.814 1.16l-.16.014Z" fill="#fff"/><path d="M24.146 25.147a1.053 1.053 0 0 1-.707-.293L6.481 7.892a1.001 1.001 0 0 1 0-1.413.987.987 0 0 1 1.413 0l16.96 16.96a1.001 1.001 0 0 1 0 1.413 1.053 1.053 0 0 1-.707.293Z" fill="#fff"/></svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="worldcup"><div class="menu__ico">' + ico + '</div><div class="menu__text">体育</div></li>');
            menu_item.on('hover:enter', function () {
                Lampa.Select.show({
                    title: '赛事',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '赛事 - ' + a.title,
                            component: 'worldcup',
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

        if (window.appready) addSettingsWC()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsWC()
            })
        }
    }

    if (!window.plugin_wc_ready) startworldcup();

})();
