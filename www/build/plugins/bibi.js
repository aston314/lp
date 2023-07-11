(function () {
    'use strict';
    var MOBILE_UA = "Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36";
    var PC_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36";
    var UA = "Mozilla/5.0";
    var UC_UA = "Mozilla/5.0 (Linux; U; Android 9; zh-CN; MI 9 Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.5.5.1035 Mobile Safari/537.36";
    var IOS_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";;

    var catalogs = [
        {
            title: "NJAV.tv",
            link: "https://njav.tv",
            show: "portrait",
            next: "search",
            datasort: "",
            use_referer: true,
            category: [{
                title: '首页',
                url: 'https://njav.tv/zh/',
                quantity: ':gt(9)'
            }, {
                title: '全新上市',
                url: 'https://njav.tv/zh/new-release',
                quantity: ''
            }, {
                title: '最近更新',
                url: 'https://njav.tv/zh/recent-update',
                quantity: ''
            }],
            list: {
                page: {
                    selector: ".pagination"
                },
                videoscontainer: {
                    selector: "div.box-item",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: ".detail a",
                    attrName: "text",
                    filter: ""
                },
                thumb: {
                    selector: "img",
                    attrName: "data-src",
                    filter: ""
                },
                link: {
                    selector: ".detail a",
                    attrName: "href",
                    filter: ""
                },
                game_status: {
                    selector: ".pay-btn",
                    attrName: "",
                    filter: ""
                },
                game_type: {
                    selector: ".game-type",
                    attrName: "",
                    filter: ""
                },
                game_time: {
                    selector: ".duration",
                    attrName: "",
                    filter: ""
                },
                team_home: {
                    selector: ".text-right",
                    attrName: "",
                    filter: ""
                },
                team_away: {
                    selector: ".text-left",
                    attrName: "",
                    filter: ""
                },
            },
            detail: {
                videoscontainer: {
                    selector: '',
                    attrName: '',
                    filter: ''
                },
                title: {
                    selector: 'a',
                    attrName: 'text',
                    filter: ''
                },
                link: {
                    selector: 'a',
                    attrName: 'href',
                    filter: ''
                }
            },
            search: {
                url: 'https://njav.tv/zh/search?keyword=%E7%88%B1'
            }
        },
    ];
    
    function BIBI(object) {
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true,
            step: 250
        });
        var items = [];
        var html = $('<div></div>');
        var body = $('<div class="freetv_sport category-full"></div>');
        var info;
        var last;
        var waitload;
        var cors = 'https://api.allorigins.win/get?url=';
        // if (Lampa.Platform.is('android')) {
        //     cors = '';
        // } else {
        //     cors = 'https://cors.eu.org/';
        // }

        this.create = function () {
            //console.log(object.url)
            var _this = this;

            this.activity.loader(true);

            network["native"](cors + object.url, function (str) {
                //this.build.bind(this)
                if (object.type == 'live') {
                    //console.log($('.embed-responsive-item', str).attr('src'))
                    var empty = new Lampa.Empty({
                        descr: object.title.replace('直播源 - ',''),
                        title: object.content
                    });
                    html.append(empty.render());
                    _this.activity.loader(false);
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
                dataType: 'json',
                // headers: {
                //     'User-Agent': PC_UA
                // }
            });
            return this.render();
        };

        this.next = function () {
            var _this2 = this;
            if (waitload) return;
            // if (object.gotopage) {
            // var postdata = {
            //     before: object.gotopage[0],
            // };
            waitload = true;
            object.page++;
            network.silent(cors + object.url + '?page=' + object.page, function (str) {
                var result = _this2.card(str);
                _this2.append(result, true);
                if (result.card.length) waitload = false;
                Lampa.Controller.enable('content');
            }, function (a, c) {
                Lampa.Noty.show(network.errorDecode(a, c));
            }, false, {
                dataType: 'json'
            });
            // }
        };

        this.card = function (str) {
            
            var _this5 = this;

            var card = [];
            var page;

            str = str.contents.replace(/\n/g, '');
            var balanser = Lampa.Storage.get('online_bibi_balanser');

            var catalogs1 = catalogs.filter(function (fp) {
                return fp.title === balanser
            });
            // var h =  $(v+object.quantity, str);
            // //console.log(h)
            // total_pages = $(p, str).find('a').length;

            var host = object.url.indexOf('http') == -1 ? '' : object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0];
            // //console.log($(p, str).find('a').last().attr('href'))
            // // :last-child
            // //page = $(p, str).find('a').last().attr('href').indexOf('http') == -1 ? host+$(p, str).find('a').last().attr('href') : $(p, str).find('a').last().attr('href');
            var p = catalogs1[0].list.page.selector;
            var total_pages = $(p, str).find('a').last().attr('href') ? $(p, str).find('a').length : $(p, str).length;
            page = $(p, str).find('a').last().attr('href') ? $(p, str).find('a').last().attr('href') : $(p, str).attr('href');
            // page = $($(catalogs1[0].list.page.selector), str).attr('href') ? $($(catalogs1[0].list.page.selector), str).attr('href').match(/[0-9]+(?=[^0-9]*$)(.*)/) : null;
             
            if (page) {
                object.gotopage = page;
            } else {
                page = '';
            };
            
            $(catalogs1[0].list.videoscontainer.selector + object.quantity, str).each(function (i, html) {                
                    card.push({
                        title: $(catalogs1[0].list.title.selector,html).text(),
                        original_title: '',
                        title_org: '',
                        //url: catalogs1[0].list.link.attrName =='text' ? host+u1.text() : host+u1.attr(catalogs1[0].list.link.attrName),
                        url:  'https://njav.tv/zh/' +$(catalogs1[0].list.link.selector,html).attr('href') ,
                        //img: catalogs1[0].list.thumb.attrName =='text' ? (i1.text().indexOf('http') == -1 ? host+i1.text() : i1.text()) : (i1.attr(catalogs1[0].list.thumb.attrName).indexOf('http') == -1 ? host+i1.attr(catalogs1[0].list.thumb.attrName) : i1.attr(catalogs1[0].list.thumb.attrName)),
                        img: $(catalogs1[0].list.thumb.selector,html).attr(catalogs1[0].list.thumb.attrName),
                        quantity: '',
                        year: '',
                        rate:$(catalogs1[0].list.game_time.selector,html).text().trim().replace(/\n/g,'').replace(/\S+\s+/g, ''),
                        episodes_info: ($(catalogs1[0].list.game_status.selector,html).text().indexOf('无') != -1 || $(catalogs1[0].list.game_status.selector,html).text().indexOf('未') != -1) ? '未开始' : $(catalogs1[0].list.game_status.selector,html).text(),
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
                //card.addClass('card--category');
                card.addClass('card--collection');
                var img = card.find('.card__img')[0];
                img.onload = function () {
                    card.addClass('card--loaded');
                };
                img.onerror = function (e) {
                    // img.src = './img/img_broken.svg';
                    var hex = (Lampa.Utils.hash(element.title) * 1).toString(16);
                    while (hex.length < 6) hex += hex;
                    hex = hex.substring(0, 6);
                    var r = parseInt(hex.slice(0, 2), 16),
                        g = parseInt(hex.slice(2, 4), 16),
                        b = parseInt(hex.slice(4, 6), 16);
                    var hexText = (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF';
                    card.find('.card__img').replaceWith('<div class="card__img">' + element.title.replace("-", " ") + '</div>');
                    card.find('.card__view').css({ 'background-color': '#' + hex, 'color': hexText });
                    card.addClass('card--loaded');
                };
                if (element.img) img.src = element.img;else img.onerror();
                // card.find('.card__img').attr('src', element.img);
                if (element.rate) {
                    card.find('.card__view').append('<div class="card__type"></div>');
                    card.find('.card__type').text(element.rate);
                };
                // console.log(element.quantity.length)
                if (element.quantity) {
                    // var icon = document.createElement('div');
                    // icon.classList.add('card__icon');
                    // icon.classList.add('icon--sport');
                    // card.find('.card__icons-inner').append(icon);
                    card.find('.card__icons-inner').text(element.quantity)
                    card.find('.card__icons-inner').css({'padding': '0.4em 0.4em'})
                    // card.find('.card__view').append('<div class="card__icons"></div>');
                    // card.find('.card__icons-inner').text(element.quantity);
                }
                /*card.find('.card__view').append('<div class="card__quality"></div>');
                card.find('.card__quality').text(element.score);*/
                if (element.episodes_info || element.update) {
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(element.episodes_info|| element.update);
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
                    // if (scroll.isEnd()) _this3.next();
                    // if (element.img) Lampa.Background.change(cardImgBackground(element.img));
                    //if (Lampa.Helper) Lampa.Helper.show('tg_detail', '长按住 (ОК) 键查看详情', card);
                });
                //console.log(element.url)
                //console.log((element.episodes_info.trim().indexOf('直播中') !== -1))
                // if (element.episodes_info.trim() == '直播中' || element.title.indexOf('纬来体育')!==-1 || element.episodes_info.trim() ==''){
                card.on('hover:enter', function (target, card_data) {
                    last = card[0];
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
                    var balanser = Lampa.Storage.get('online_bibi_balanser');
                    var catalogs1 = catalogs.filter(function (fp) {
                        return fp.title === balanser
                    });
                    network["native"](cors + element.url, function (str) {
                        var regex = /Video\({id:\s*'(\d+)'\}\)/;
                        var match = str.contents.match(regex);
                        var id = match && match[1];
                        if (id) {
                            network["native"](cors + 'https://njav.tv/zh/api/v/' + id + '/videos?r=' + Math.random(), function (str) {
                                Lampa.Modal.close();
                                str = JSON.parse(str.contents)
                                if (str.status == 200) {
                                    // console.log(str.data[0].url)
                                    Lampa.Iframe.show({
                                        //url: $('.embed-responsive-item', str).attr('src'),
                                        url: str.data[0].url,
                                        onBack: function onBack() {
                                            Lampa.Controller.toggle('content');
                                        }
                                    });
                                    $('.iframe__body iframe').removeClass('iframe__window');
                                    $('.iframe__body iframe').addClass('screensaver-chrome__iframe');
                                }
                            }, function (a, c) {
                                Lampa.Noty.show(network.errorDecode(a, c));
                            }, false, {
                                dataType: 'json'
                            });
                        }
                    }, function (a, c) {
                        Lampa.Noty.show(network.errorDecode(a, c));
                    }, false, {
                        dataType: 'json'
                    });
                });
                // }
                body.append(card);
                if (append) Lampa.Controller.collectionAppend(card);
                items.push(card);
            });
        };

        this.build = function (data) {
            var _this2 = this;
            //info = Lampa.Template.get('info');style="height:5em"
            var channelbutton = '<div class=\"full-start__button selector view--channel\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.5 3.588c-.733 0-1.764.175-2.448.311a.191.191 0 0 0-.153.153c-.136.684-.31 1.715-.31 2.448 0 .733.174 1.764.31 2.448a.191.191 0 0 0 .153.153c.684.136 1.715.31 2.448.31.733 0 1.764-.174 2.448-.31a.191.191 0 0 0 .153-.153c.136-.684.31-1.715.31-2.448 0-.733-.174-1.764-.31-2.448a.191.191 0 0 0-.153-.153c-.684-.136-1.715-.31-2.448-.31ZM3.741 2.342C4.427 2.205 5.595 2 6.5 2c.905 0 2.073.205 2.759.342a1.78 1.78 0 0 1 1.4 1.4c.136.685.341 1.853.341 2.758s-.205 2.073-.342 2.759a1.78 1.78 0 0 1-1.4 1.4C8.574 10.794 7.406 11 6.5 11s-2.073-.205-2.759-.342a1.78 1.78 0 0 1-1.4-1.4C2.206 8.574 2 7.406 2 6.5s.205-2.073.342-2.759a1.78 1.78 0 0 1 1.4-1.4ZM6.5 14.588c-.733 0-1.764.175-2.448.311a.191.191 0 0 0-.153.153c-.136.684-.31 1.715-.31 2.448 0 .733.174 1.764.31 2.448a.191.191 0 0 0 .153.153c.684.136 1.715.31 2.448.31.733 0 1.764-.174 2.448-.31a.191.191 0 0 0 .153-.153c.136-.684.31-1.715.31-2.448 0-.733-.174-1.764-.31-2.448a.191.191 0 0 0-.153-.153c-.684-.136-1.715-.31-2.448-.31Zm-2.759-1.246C4.427 13.205 5.595 13 6.5 13c.905 0 2.073.205 2.759.342a1.78 1.78 0 0 1 1.4 1.4c.136.685.341 1.853.341 2.758s-.205 2.073-.342 2.759a1.78 1.78 0 0 1-1.4 1.4C8.574 21.794 7.406 22 6.5 22s-2.073-.205-2.759-.342a1.78 1.78 0 0 1-1.4-1.4C2.206 19.574 2 18.406 2 17.5s.205-2.073.342-2.759a1.78 1.78 0 0 1 1.4-1.4ZM17.5 3.588c-.733 0-1.764.175-2.448.311a.191.191 0 0 0-.153.153c-.136.684-.31 1.715-.31 2.448 0 .733.174 1.764.31 2.448a.191.191 0 0 0 .153.153c.684.136 1.715.31 2.448.31.733 0 1.764-.174 2.448-.31a.191.191 0 0 0 .153-.153c.136-.684.31-1.715.31-2.448 0-.733-.174-1.764-.31-2.448a.191.191 0 0 0-.153-.153c-.684-.136-1.715-.31-2.448-.31Zm-2.759-1.246C15.427 2.205 16.595 2 17.5 2c.905 0 2.073.205 2.759.342a1.78 1.78 0 0 1 1.4 1.4c.136.685.341 1.853.341 2.758s-.205 2.073-.342 2.759a1.78 1.78 0 0 1-1.4 1.4c-.685.136-1.853.341-2.758.341s-2.073-.205-2.759-.342a1.78 1.78 0 0 1-1.4-1.4C13.206 8.574 13 7.406 13 6.5s.205-2.073.342-2.759a1.78 1.78 0 0 1 1.4-1.4ZM17.5 14.588c-.733 0-1.764.175-2.448.311a.191.191 0 0 0-.153.153c-.136.684-.31 1.715-.31 2.448 0 .733.174 1.764.31 2.448a.191.191 0 0 0 .153.153c.684.136 1.715.31 2.448.31.733 0 1.764-.174 2.448-.31a.191.191 0 0 0 .153-.153c.136-.684.31-1.715.31-2.448 0-.733-.174-1.764-.31-2.448a.191.191 0 0 0-.153-.153c-.684-.136-1.715-.31-2.448-.31Zm-2.759-1.246c.686-.137 1.854-.342 2.759-.342.905 0 2.073.205 2.759.342a1.78 1.78 0 0 1 1.4 1.4c.136.685.341 1.853.341 2.758s-.205 2.073-.342 2.759a1.78 1.78 0 0 1-1.4 1.4c-.685.136-1.853.341-2.758.341s-2.073-.205-2.759-.342a1.78 1.78 0 0 1-1.4-1.4C13.206 19.574 13 18.406 13 17.5s.205-2.073.342-2.759a1.78 1.78 0 0 1 1.4-1.4Z\" fill=\"currentColor\"/></svg>   <span>网站</span>\n    </div>'
            var findbutton ='<div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div>'
            Lampa.Template.add('button_category', "<style>.freetv_sport.category-full .card__icons {top: 0.3em;right: 0.3em;justify-content: center !important;}.freetv_sport.category-full{ padding-bottom:8em } .freetv_sport div.card__view{ position:relative; background-color:#353535; background-color:#353535a6; border-radius:1em; cursor:pointer; padding-bottom:60% } .freetv_sport.square_icons div.card__view{ padding-bottom:100% } .freetv_sport img.card__img,.freetv_sport div.card__img{ text-align: center;background-color:unset; border-radius:unset; max-height:100%; max-width:100%; height:auto; width:auto; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:2em } .freetv_sport.category-full .card__icons { top:0.3em; right:0.3em; justify-content:right; } @media screen and (max-width: 2560px) { .card--collection { width: 16.6%!important; } } @media screen and (max-width: 385px) { .card--collection { width: 33.3%!important; } } </style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div>" + channelbutton + findbutton + "  </div>");
            Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
            var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--channel').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.view--category').on('hover:enter hover:click', function () {
                listNavigation();
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
                        searchurl = 'https://njav.tv/zh/search?keyword=' + encodeURIComponent(new_value)
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            title: '频道 - 搜索"' + new_value + '"',
                            component: 'bibi',
                            quantity: '',
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                })
            });

            this.selectGroup = function () {
                
                var balanser_ = Lampa.Storage.get('online_bibi_balanser')
                Lampa.Select.show({
                    title: '网站',
                    // items: catalogs,
                    items: catalogs.map(function (elem, index) {
                        elem.selected = (balanser_ == elem.title);
                        return elem;
                    }),
                    onSelect: function onSelect(a) {
                        Lampa.Storage.set('online_bibi_balanser', a.title);

                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: a.category[0].url,
                            title: a.title + ' - ' + a.category[0].title,
                            quantity: a.category[0].quantity,
                            component: 'bibi',
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
                        if (info) {
                            if (!info.find('.view--category').hasClass('focus')) {
                                Lampa.Controller.collectionSet(info);
                                Navigator.move('right')
                            } else Lampa.Controller.toggle('head');
                        } else Lampa.Controller.toggle('head');
                    }
                },
                down: function down() {
                    // if (Navigator.canmove('down')) Navigator.move('down');
                    if (Navigator.canmove('down')) Navigator.move('down');
                    else if (info) {
                        if (info.find('.view--category').hasClass('focus')) {
                            Lampa.Controller.toggle('content');
                        }
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

    function listNavigation() {
            if (Lampa.Storage.get('online_bibi_balanser') == '') {
                Lampa.Storage.set('online_bibi_balanser', catalogs[0].title);
            }

            var balanser = Lampa.Storage.get('online_bibi_balanser');

            var catalogs1 = catalogs.filter(function (fp) {
                return fp.title === balanser
            });

            if (catalogs1.length === 0) {
                catalogs1[0] = catalogs[0];
                Lampa.Storage.set('online_bibi_balanser', catalogs[0].title);
            };

            Lampa.Select.show({
                title: catalogs1[0].title,
                items: catalogs1[0].category,
                onSelect: function onSelect(a) {
                    Lampa.Activity.push({
                        url: a.url,
                        title: catalogs1[0].title + ' - ' + a.title,
                        quantity: a.quantity,
                        component: 'bibi',
                        page: 1
                    });
                },
                onBack: function onBack() {
                    // Lampa.Controller.toggle('menu');
                    Lampa.Controller.toggle('content');
                }
            });
        
    };

    function startbibi() {
        window.plugin_BIBI_ready = true;
        Lampa.Component.add('bibi', BIBI);

        function addSettingsBIBI() {
            var ico = '<svg width=\"200\" height=\"243\" viewBox=\"0 0 200 243\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M187.714 130.727C206.862 90.1515 158.991 64.2019 100.983 64.2019C42.9759 64.2019 -4.33044 91.5669 10.875 130.727C26.0805 169.888 63.2501 235.469 100.983 234.997C138.716 234.526 168.566 171.303 187.714 130.727Z\" stroke=\"currentColor\" stroke-width=\"15\"/><path d=\"M102.11 62.3146C109.995 39.6677 127.46 28.816 169.692 24.0979C172.514 56.1811 135.338 64.2018 102.11 62.3146Z\" stroke=\"currentColor\" stroke-width=\"15\"/><path d=\"M90.8467 62.7863C90.2285 34.5178 66.0667 25.0419 31.7127 33.063C28.8904 65.1461 68.8826 62.7863 90.8467 62.7863Z\" stroke=\"currentColor\" stroke-width=\"15\"/><path d=\"M100.421 58.5402C115.627 39.6677 127.447 13.7181 85.2149 9C82.3926 41.0832 83.5258 35.4214 100.421 58.5402Z\" stroke=\"currentColor\" stroke-width=\"15\"/><rect x=\"39.0341\" y=\"98.644\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"90.8467\" y=\"92.0388\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"140.407\" y=\"98.644\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"116.753\" y=\"139.22\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"64.9404\" y=\"139.22\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/><rect x=\"93.0994\" y=\"176.021\" width=\"19.1481\" height=\"30.1959\" rx=\"9.57407\" fill=\"currentColor\"/></svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="bibi"><div class="menu__ico">' + ico + '</div><div class="menu__text">草莓</div></li>');
            menu_item.on('hover:enter', function () {
                listNavigation();
            });
            $('.menu .menu__list').eq(0).append(menu_item);
            //$('.menu .menu__list .menu__item.selector').eq(1).after(menu_item);
        }

        if (window.appready) addSettingsBIBI()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsBIBI()
            })
        }
    }

    if (!window.plugin_BIBI_ready) startbibi();

})();
