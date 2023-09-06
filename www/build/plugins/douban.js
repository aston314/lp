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
        var body = $('<div class="freetv category-full"></div>');
        var info;
        var last;
        var waitload;
        var doubanitem = [];
        var datatye;

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
            if (object.url.includes('api.douban.com')){
                network["native"](object.url, this.build.bind(this), function () {
                    var empty = new Lampa.Empty();
                    html.append(empty.render());
                    _this.start = empty.start;
    
                    _this.activity.loader(false);
    
                    _this.activity.toggle();
                }, 'apikey=0ab215a8b1977939201640fa14c66bab', false, {
                    dataType: 'json',
                    headers: {
                        'Referer' :'https://movie.douban.com/',
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
                    }
                }); 
            } else {
                network["native"](object.url, this.build.bind(this), function () {
                    var empty = new Lampa.Empty();
                    html.append(empty.render());
                    _this.start = empty.start;
    
                    _this.activity.loader(false);
    
                    _this.activity.toggle();
                }, false, false, {
                    dataType: 'json',
                    headers: {
                        'Referer' :'https://movie.douban.com/',
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
                    }
                }); 
            }
            

            // if (!!window.cordova) {
            //     network.silent(object.url, this.build.bind(this), function () {
            //         var empty = new Lampa.Empty();
            //         html.append(empty.render());
            //         _this.start = empty.start;

            //         _this.activity.loader(false);

            //         _this.activity.toggle();
            //     });
            // } else {
                
            //     network["native"](object.url, this.build.bind(this), function () {
            //         var empty = new Lampa.Empty();
            //         html.append(empty.render());
            //         _this.start = empty.start;

            //         _this.activity.loader(false);

            //         _this.activity.toggle();
            //     });
            // }
            
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


            //if (object.page < 300) {
                waitload = true;
                object.page++;
                //var u = new URLSearchParams(postdata).toString();
                //console.log(u);
                if (object.url.includes('api.douban.com')){
                    network["native"](object.url.replace(/start=\d+/, 'start='+(object.page - 1) * 20) , function (result) {
                        _this2.append(result,true);
        
                        // object.type == 'list' ? datatye = result.subjects : datatye = result;
                        // result.total
                        if (result.subjects.length) waitload = false;
                        // Lampa.Controller.enable('content');
                    }, false, 'apikey=0ab215a8b1977939201640fa14c66bab', {
                        dataType: 'json',
                        headers: {
                            'Referer' :'https://movie.douban.com/',
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
                        }
                    }); 
                } else{
                    network["native"](object.url.replace(/page_start=\d+/, 'page_start=') + (object.page - 1) * 20, function (result) {
                        _this2.append(result,true);
        
                        object.type == 'list' ? datatye = result.subjects : datatye = result;
                        if (datatye.length) waitload = false;
                        // Lampa.Controller.enable('content');
                    }, false, false, {
                        dataType: 'json',
                        headers: {
                            'Referer' :'https://movie.douban.com/',
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
                        }
                    });
                }
            

                // if (!!window.cordova) {
                //     network.silent(object.url.replace(/page_start=\d+/, 'page_start=') + (object.page - 1) * 20, function (result) {
                //         _this2.append(result);
                        
                //         object.type == 'list' ? datatye = result.subjects : datatye = result ;
                //         if (datatye.length) waitload = false;
                //         Lampa.Controller.enable('content');
                //     }, false);
                // } else {
                //     network["native"](object.url.replace(/page_start=\d+/, 'page_start=') + (object.page - 1) * 20, function (result) {
                //         _this2.append(result);
                        
                //         object.type == 'list' ? datatye = result.subjects : datatye = result ;
                //         if (datatye.length) waitload = false;
                //         Lampa.Controller.enable('content');
                //     }, false);
                // }
                
            //}
        };

        this.append = function (data,append) {
            var _this3 = this;

            
            object.type == 'list' ? datatye = data.subjects : datatye = data ;

            datatye.forEach(function (element) {
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
                // 解决403图片缓存问题
                // function getImages(_url){
                //     if (_url !== undefined) {
                //         let _u = _url.substring(7);
                //         return 'https://images.weserv.nl/?url=' + _u;
                //     }
                // }
                if (Lampa.Storage.field('douban_img_proxy')) {
                    //console.log(ii.indexOf('://'))
                    //豆瓣图片域名
                    if (element.cover.includes('doubanio.com') && element.cover.indexOf('://') == 5) {
                        element.cover = element.cover.replace('https://', 'https://images.weserv.nl/?url=')
                    };
                };
                //   element.cover||element.img
                // card.find('.card__img').attr('src', 'https://dou.img.lithub.cc/movie/' + element.id + '.jpg');
                card.find('.card__img').attr('src', element.cover||element.img || element.images.small);
                // if (element.rate) {
                //     card.find('.card__view').append('<div class="card__type"></div>');
                //     card.find('.card__type').text(element.rate);
                // };
                if (element.hasOwnProperty("rate") || element.hasOwnProperty("rating")) {
                    card.find('.card__view').append('<div class="card__vote"></div>');
                    card.find('.card__vote').text(element.hasOwnProperty("rate") ? element.rate :'' || element.hasOwnProperty("rating") ? element.rating.average : '');
                };
                /*card.find('.card__view').append('<div class="card__quality"></div>');
                card.find('.card__quality').text(element.score);*/
                if (element.episodes_info){
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(element.episodes_info.replace('更新至','第'));
                };

                card.on('hover:focus', function () {
                    last = card[0];
                    scroll.update(card, true);
                    info.find('.info__title').text(element.title);
                    info.find('.info__title-original').text(element.episodes_info);
                    info.find('.info__rate span').text(element.rate);
                    info.find('.info__rate').toggleClass('hide', !(element.rate > 0));
                    if (object.type == 'list') {
                    var maxrow = Math.ceil(items.length / 7) - 1;
                    if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
                    if (element.cover||element.img) Lampa.Background.change(cardImgBackground(element.cover||element.img));
                    }
                    if (Lampa.Helper) Lampa.Helper.show('db_detail', '长按住 (ОК) 键查看详情', card);
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

                    _this3.find_douban(element);
				});
                card.on('hover:enter', function (target, card_data) {
                    Lampa.Modal.open({
                        title: '',
                        html: Lampa.Template.get('modal_loading'),
                        size: 'small',
                        mask: true,
                        onBack: function onBack() {
                            Lampa.Modal.close();
                            Lampa.Controller.toggle('content');
                        }
                    });
                    //console.log(element)
                    // element.img = element.cover || element.img;
                    // element.original_title = '';
                    // element.title = mytitle;
                    // Lampa.Activity.push({
                    //     url: '',
                    //     title: '在线观看',
                    //     component: 'aston_modss_online',
                    //     search: element.title,
                    //     search_one: element.title,
                    //     search_two: element.title,
                    //     movie: element,
                    //     page: 1
                    // });
                    Lampa.Api.search({
                        //query: encodeURIComponent((doubanitem.sub_title || element.title))
                        query: encodeURIComponent(element.title.replace(/第(.+)季/, ''))
                    }, function (find) {
                        Lampa.Modal.close();
                        //var finded = _this2.finds(find, (doubanitem || element));
                        // console.log(find, element)
                        var finded = _this3.finds_(find, element);
                        if (finded) {
                            finded.title = element.title;
                            finded.istv = _this3.seasonNumber(element.title) !== '' ? true : (element.episodes_info !== '' ? true : false);
                            finded.website = '豆瓣';
                            finded.img = element.cover;
                            finded.url = element.url;
                            finded.score = element.rate;
                            finded.title_org = element.title;
                            Lampa.Activity.push({
                                url: element.url,
                                title: '在线观看',
                                // component: 'online_mod',
                                component: 'aston_modss_online',
                                search: element.title.replace(/( 第.+?季)/, ''),
                                search_one: element.title,
                                search_two: finded.original_name,
                                movie: finded,
                                page: 1
                            });
                        } else {
                            Lampa.Activity.push({
                                url: element.url,
                                title: '在线观看',
                                // component: 'online_mod',
                                component: 'aston_modss_online',
                                search: element.title.replace(/( 第.+?季)/, ''),
                                search_one: element.title,
                                search_two: element.title,
                                movie: element,
                                page: 1
                            });
                        }
                    }, function () {
                        Lampa.Modal.close();
                        Lampa.Activity.push({
                            url: element.url,
                            title: '在线观看',
                            // component: 'online_mod',
                            component: 'aston_modss_online',
                            search: element.title.replace(/( 第.+?季)/, ''),
                            search_one: element.title,
                            search_two: element.title,
                            movie: element,
                            page: 1
                        });
                    });  
                });
                body.append(card);
                if (append) Lampa.Controller.collectionAppend(card);
                items.push(card);
            });
        };

        function chineseToArabicNumber(chineseNumber) {
            if (isNaN(chineseNumber)) {
                var chineseNumberMap = {
                    一: 1, 二: 2, 三: 3, 四: 4, 五: 5,
                    六: 6, 七: 7, 八: 8, 九: 9, 十: 10
                };
    
                let arabicNumber = 0;
                let tempValue = 0;
    
                for (let char of chineseNumber) {
                    if (chineseNumberMap[char] !== undefined) {
                        if (chineseNumberMap[char] === 10) {
                            tempValue *= 10;
                        } else {
                            tempValue += chineseNumberMap[char];
                        }
                    } else {
                        arabicNumber += tempValue === 0 ? 1 : tempValue;
                        tempValue = 0;
                    }
                }
    
                arabicNumber += tempValue;
                return arabicNumber;
            } else {
                return chineseNumber;
            }
        }

        this.seasonNumber = function(text) {
            // 匹配季数和集数的正则表达式模式（支持中文数字）
            var seasonPattern = /(?:第)?([0-9一二三四五六七八九十]+)季/i; // 可能包含"第"，然后捕获季数
    
            // 提取季数和集数的逻辑
            var seasonMatch = text.match(seasonPattern);
            if (seasonMatch) {
                var seasonNumber = seasonMatch ? chineseToArabicNumber(seasonMatch[1]) : 1;
                return seasonNumber;
            } else {
                return '';
            }
        }

        this.finds_ = function (find) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var finded;
            //console.log(params)
            var filtred = function filtred(items) {
                //console.log(items)
                //   for (var i = 0; i < items.length; i++) {
                //     var item = items[i];

                //     if (params.sub_title == item.original_title || params.title == item.name || params.original_title == item.name) {
                //       finded = item;
                //       break;
                //     }
                //   }
                finded = items.filter(function (fp) {
                    //return (fp.original_name === params.sub_title || fp.title === params.title  || fp.name === params.title || params.title.indexOf(fp.title) !==-1)
                    return ((fp.original_title || fp.original_name) == params.sub_title || (fp.title || fp.name) == params.title || params.title.indexOf((fp.title || fp.name)) !== -1)
                    //return (((fp.original_title || fp.original_name) === params.sub_title || (fp.title || fp.name) === params.title)&& parseInt(params.year) == (fp.first_air_date || fp.release_date).split('-').shift() )
                });
            };

            // if (params.title_org) {
            //     if (find.movie && find.movie.results.length) filtred(find.movie.results);
            //     if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
            // } else {
                if (params.istv) {
                    if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
                } else {
                    if (find.movie && find.movie.results.length) filtred(find.movie.results);
                };
                if (typeof finded === "undefined") {
                    if (find.movie && find.movie.results.length) filtred(find.movie.results);
                    if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
                };
            // }
            return finded ? finded[0] : finded;
        };

        this.build = function (data) {
            var _this2 = this;
            //info = Lampa.Template.get('info');style="height:5em"
            Lampa.Template.add('button_category', "<style>.freetv.category-full{padding-bottom:8em;}</style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div><div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div></div>");
			Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__rate"><span></span></div><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
			var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
				_this2.selectGroup();
			});
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: '豆瓣 - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        //console.log(new_value)
                        var search_tempalte = 'https://movie.douban.com/j/subject_suggest?q=#msearchword';
                        var searchurl = search_tempalte.replace('#msearchword',encodeURIComponent(new_value));
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            title: '豆瓣 - 搜索"'+new_value+'"',
                            waitload: false,
                            component: 'db',
                            type: 'search',
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                }) 
			});
            this.selectGroup = function () {
                Lampa.Select.show({
                    title: '频道',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '豆瓣 - '+a.title,
                            component: 'db',
                            type: 'list',
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
        
        object.type == 'list' ? datatye = data.subjects : datatye = data ;
        if (datatye.length) {
            html.append(info);
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

            var s,a = params.title.replace(element.title, '').replace('(' + params.release_year + ')', '').replace(/(Season\s\d)/, '').replace(/‎/g, '').trim();

            if (a === '') {
                s = element.title.replace(/第(.+)季/, '');
            } else {
                s = a;
            };

            //console.log(s)

            var filtred = function filtred(items) {
                if (items.length == 1) {
                    finded =items;
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
                // console.log(json);
                //doubanitem = JSON.parse(json);
                _this.find_tmdb(json,element);
            }, function (a, c) {
                this.empty(network.errorDecode(a, c));
            }, false, {
                dataType: 'json'
            });
        };
        this.find_tmdb = function (data,element) {
            var _this1 = this;
            var s, str = data.subject;

            network["native"](str.url, function (json) {
                var s = json.match(/tt(\d+)/, 'g');
                s = s ? s[0] : s;
                //console.log(element);
                //console.log(s)
                if (s) {
                    var dom = Lampa.Storage.field('proxy_tmdb') ? 'http://apitmdb.cub.watch/3/' : 'https://api.themoviedb.org/3/';
                    network.silent(dom + 'find/'+s+'?api_key=4ef0d7355d9ffb5151e987764708ce96&external_source=imdb_id&language=zh-CN', function (json) {
                        
                        var json = str.is_tv ? json.tv_results[0] :json.movie_results[0];
                        //console.log(json);
                        if (json){
                            Lampa.Activity.push({
                                url: '',
                                component: 'full',
                                id: json.id,
                                method: str.is_tv ? 'tv' : 'movie',
                                card: json
                            });
                            Lampa.Modal.close();
                        }else{
                            var a = str.title.replace(element.title,'').replace('('+str.release_year+')','').replace(/(Season\s\d)/, '').replace(/‎/g, '').trim();
                            
                            if (a === ''){
                                s = element.title.replace(/第(.+)季/, '');
                            }else{
                                s = a.replace('II','2');
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
                                var finded = _this1.finds(find, str , element);
                
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
                        s = a.replace('II','2');
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
                        var finded = _this1.finds(find, str , element);
        
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
            doubanitem = null;
        };
    }
    
    var catalogs = [{
        title: '正在热映',
        url: 'https://api.douban.com/v2/movie/in_theaters?start=0&count=20'
    },{
        title: '即将上映',
        url: 'https://api.douban.com/v2/movie/coming_soon?start=0&count=20'
    },{
        title: 'Top250',
        url: 'https://api.douban.com/v2/movie/top250?start=0&count=20'
    },{
        title: '热门电影',
        url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'
    }, {
        title: '最新电影',
        url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E6%9C%80%E6%96%B0&page_limit=20&page_start=0'
    },
    {
        title: '高分电影',
        url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&page_limit=50&page_start=0'
    }, 
    {
        title: '热门电视剧',
        url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'
    }, {
        title: '热门美剧',
        url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BE%8E%E5%89%A7&sort=recommend&page_limit=20&page_start=0'
    },{
        title: '美剧',
        url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BE%8E%E5%89%A7&sort=time&page_limit=20&page_start=0'
    },  {
        title: '热门韩剧',
        url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E9%9F%A9%E5%89%A7&sort=recommend&page_limit=20&page_start=0'
    },{
        title: '韩剧',
        url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E9%9F%A9%E5%89%A7&sort=time&page_limit=20&page_start=0'
    }, {
        title: '热门国产剧',
        url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E5%9B%BD%E4%BA%A7%E5%89%A7&sort=recommend&page_limit=20&page_start=0'
    },{
        title: '国产剧',
        url: 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E5%9B%BD%E4%BA%A7%E5%89%A7&sort=time&page_limit=20&page_start=0'
    }, {
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

    function startDOUBAN() {
        window.plugin_douban_ready = true;
        Lampa.Component.add('db', DOUBAN);

        function addSettingsDounan() {
            var ico = '<svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M0.268 0.383v1.005h9.464V0.383H0.268zm0.822 2.052v3.925h7.818V2.436H1.091zm1.133 1.003h5.564v1.918H2.224V3.438zm0.691 3.088 -1.047 0.392a13.664 13.664 0 0 1 1.047 1.705H0v0.994h10v-0.994h-2.782a11.159 11.159 0 0 0 0.959 -1.705l-1.138 -0.392a12.48 12.48 0 0 1 -1.032 2.096H4.028c-0.328 -0.818 -0.698 -1.518 -1.113 -2.096z" fill="#fff"/></svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="douban"><div class="menu__ico">' + ico + '</div><div class="menu__text">豆瓣</div></li>');
            menu_item.on('hover:enter', function () {
                Lampa.Select.show({
                    title: '豆瓣',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '豆瓣 - ' + a.title,
                            component: 'db',
                            type: 'list',
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
    
        if (window.appready) addSettingsDounan()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsDounan()
            })
        }
    }

    if (!window.plugin_douban_ready) startDOUBAN();

})();
