(function () {
    'use strict';
    var lrcObj_ = {};
    var musiclist_ = [];
    var currentplaylist_ = [];
    var currentIndex_ = 0;
    var aipurl = 'https://zz123.com/ajax/';
    function ZZMUSIC(object) {
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
        var player = window.radio_player1_;

        this.getUrlParamsAndBuildQueryString = function(url) {
            var queryString = url.split('?')[1]; // 获取问号后面的查询字符串
          
            var paramObject = {};
          
            // 解析查询字符串为参数对象
            queryString.replace(/([^&=]+)=([^&]*)/g, function(match, key, value) {
              key = decodeURIComponent(key);
              value = decodeURIComponent(value);
              if (paramObject[key]) {
                // 如果参数名已经存在，将值转换为数组并追加新值
                if (!Array.isArray(paramObject[key])) {
                  paramObject[key] = [paramObject[key]];
                }
                paramObject[key].push(value);
              } else {
                // 参数名不存在，直接赋值
                paramObject[key] = value;
              }
            });
          
            var urlParams = [];
          
            // 遍历参数对象，将参数添加到数组中
            for (var paramKey in paramObject) {
              if (paramObject.hasOwnProperty(paramKey)) {
                var paramValue = paramObject[paramKey];
                if (Array.isArray(paramValue)) {
                  // 如果值是数组，将每个值都添加到参数中
                  for (var i = 0; i < paramValue.length; i++) {
                    urlParams.push(encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramValue[i]));
                  }
                } else {
                  // 单个值的情况
                  urlParams.push(encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramValue));
                }
              }
            }
          
            return urlParams.join('&'); // 获取生成的查询字符串
        };

        this.create = function () {
            var _this = this;

            this.activity.loader(true);
            musiclist_ = [];
            var postdata = this.getUrlParamsAndBuildQueryString(object.url).replace(/(page=)\d+/g, `$1${object.page}`);
            if (!!window.cordova) {
                network.silent(aipurl + '?' + postdata, this.build.bind(this), function () {
                    var empty = new Lampa.Empty();
                    html.append(empty.render());
                    _this.start = empty.start;

                    _this.activity.loader(false);

                    _this.activity.toggle();
                }, postdata, {
                    dataType: 'json',
                    headers: {
                        'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                    }
                });
            } else {
                network["native"](aipurl + '?' + postdata, this.build.bind(this), function () {
                    var empty = new Lampa.Empty();
                    html.append(empty.render());
                    _this.start = empty.start;

                    _this.activity.loader(false);

                    _this.activity.toggle();
                }, postdata, {
                    dataType: 'json',
                    headers: {
                        'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                    }
                });
            }
            return this.render();
        };

        this.next = function () {
            
            var _this2 = this;

            if (waitload) return;
            waitload = true;
            object.page++;
            // var postdata = this.getUrlParamsAndBuildQueryString(object.url)+ '&page=' + object.page;
            var postdata = this.getUrlParamsAndBuildQueryString(object.url).replace(/(page=)\d+/g, `$1${object.page}`);
            // console.log(this.getUrlParamsAndBuildQueryString(object.url),aipurl + '?' + postdata)
            if (!!window.cordova) {
                network.silent(aipurl + '?' + postdata, function (result) {
                    _this2.donext(result);
                    Lampa.Controller.enable('content');
                }, postdata , {
                    dataType: 'json',
                    headers: {
                        'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                    }
                });
            } else {
                network["native"](aipurl + '?' + postdata, function (result) {
                    _this2.donext(result);
                    Lampa.Controller.enable('content');
                }, postdata , {
                    dataType: 'json',
                    headers: {
                        'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                    }
                });
            }
        };
        this.donext = function (result) {
            var _this2 = this;
            if (result.data.length > 0) {
                _this2.append(result);
                if (result.data.length) waitload = false;
            }
        }
        this.append = function (data) {
            var _this3 = this;
            data.data.forEach(function (element,i) {
                musiclist_.push([element.mname, element.id, element.mp3 , element.sname])
                
                var mytitle = element.mname.replace('/', ' ');
                if (mytitle.indexOf(' ' != -1)) mytitle = mytitle.split(' ')[0]

                var card = Lampa.Template.get('card', {
                    title: element.mname,
                    release_year: element.sname
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
                
                card.find('.card__img').attr('src', element.pic.replace('w_50,h_50,','w_200,h_200,'));
                if (element.play_time) {
                card.find('.card__view').append('<div class="card__type"></div>');
                card.find('.card__type').text(element.play_time);
                }

                if (element.publishTime) {
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(new Date(element.publishTime).getFullYear());
                };

                card.on('hover:focus', function () {
                    last = card[0];
                    scroll.update(card, true);
                    info.find('.info__title').text(element.mname);
                    info.find('.info__title-original').text(element.sname);
                    info.find('.info__rate span').text(element.rate);
                    info.find('.info__rate').toggleClass('hide', !(element.rate > 0));
                    var maxrow = Math.ceil(items.length / 7) - 1;
                    if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
                    
                    // if (element.cover||element.img||element.al.picUrl) Lampa.Background.change(cardImgBackground(element.cover||element.img||element.al.picUrl));
                    // }
                    if (Lampa.Helper) Lampa.Helper.show('zz123_detail', '长按住 (ОК) 可进行更多操作', card);
                });
                // if (object.type == 'list' || object.type == 'playlist_detail'){
                card.on('hover:long', function () {
                    var archiveMenu = [];
                    archiveMenu.push({
                        title: '查看'+element.sname+'所有歌曲',
                        url: aipurl + '?act=search&key='+element.sname+'&lang=&page=1',
                        // connectype: 'native'
                    });
                    Lampa.Select.show({
                        title: '操作',
                        items: archiveMenu,
                        onSelect: function (sel) {
                            Lampa.Activity.push({
                                url: sel.url,
                                title: '听歌 - ' + sel.title,
                                component: 'ZZMUSIC',
                                // connectype: sel.connectype, 
                                page: 1
                            });
                        },
                        onBack: function () {
                            Lampa.Controller.toggle('content');
                        }
                    })
				});
                // }
                card.on('hover:enter', function (target, card_data) {
                    // console.log(items.indexOf(card))
                    playEndedHandler_(items.indexOf(card));
                    // currentplaylist_ = null;
                    // network["native"](aipurl, function (result) {
                    //     if (result.status == 200) {
                    //         lrcObj_ = {}
                    //         if (result.data.lrc) {
                    //             var lyrics = result.data.lrc.split("\n");
                    //             for (var i = 0; i < lyrics.length; i++) {
                    //                 var lyric = decodeURIComponent(lyrics[i]);
                    //                 var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                    //                 var timeRegExpArr = lyric.match(timeReg);
                    //                 if (!timeRegExpArr) continue;
                    //                 var clause = lyric.replace(timeReg, '');
                    //                 for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                    //                     var t = timeRegExpArr[k];
                    //                     var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    //                         sec = Number(String(t.match(/\:\d*/i)).slice(1));
                    //                     var time = min * 60 + sec;
                    //                     lrcObj_[time] = clause;
                    //                 }
                    //             }
                    //         }
                    //         var data = {
                    //             url: element.mp3 || 'https://zz123.com'+result.data.mp3,
                    //             title: element.mname,
                    //             playall: false
                    //         }
                    //         player.play(data);
                    //         card.find('.card__view').append('<div class="card__quality"></div>');
                    //         card.find('.card__quality').text('听');
                    //         // console.log(lrcObj_)
                    //     }
                    // }, function (a, c) {
                    //     // Lampa.Noty.show('无法取得播放链接');
                    // }, 'act=songinfo&lang=&id=' + element.id, {
                    //     dataType: 'json',
                    //     headers: {
                    //         'Referer': aipurl,
                    //     }

                    // });
                });
                body.append(card);
                items.push(card);
            });
            // console.log(musiclist_)
        };

        this.build = function (data) {
            var _this2 = this;
            // Lampa.Template.add('_style', '<style>.freetv_n.category-full{padding-bottom:10em}</style>');
            // $('body').append(Lampa.Template.get('_style', {}, true));
            //info = Lampa.Template.get('info');style="height:5em"
            // <div class="info__lyric" style="position: fixed; left: 50%; bottom: 30px; transform: translateX(-50%); width: 800px; height: 80px; background-color: rgba(0, 0, 0, 0.8); color: rgb(243, 217, 0); text-align: center; border-radius: 1em; display: flex; justify-content: center; align-items: center; z-index: 9999; font-size: 3em; font-size: 1.8em; line-height: 1.3; white-space: nowrap; overflow: hidden;"></div>
            Lampa.Template.add('button_category', "<style>.freetv_n.category-full{padding-bottom:8em} @media screen and (max-width: 2560px) {.freetv_n .card--collection {width: 16.6%!important;}}@media screen and (max-width: 800px) {.freetv_n .card--collection {width: 24.6%!important;}}@media screen and (max-width: 500px) {.freetv_n .card--collection {width: 33.3%!important;}}</style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div>  <div class=\"full-start__button selector open--play\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 0.72 0.72\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M.556.27.266.104a.103.103 0 0 0-.154.09v.334A.103.103 0 0 0 .215.63.103.103 0 0 0 .266.616L.556.45a.103.103 0 0 0 0-.178Zm-.03.126-.29.169a.043.043 0 0 1-.043 0A.043.043 0 0 1 .172.528V.193A.043.043 0 0 1 .193.156.045.045 0 0 1 .215.15a.046.046 0 0 1 .021.006l.29.167a.043.043 0 0 1 0 .074Z\" fill=\"currentColor\"></path></svg>   <span>播放全部</span>\n    </div>            <div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div></div>");
			Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__rate"><span></span></div><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
			var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
				_this2.selectGroup();
			});
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: '听歌 - 搜索 歌曲名、歌手名、风格标签',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        // console.log(new_value)
                        var search_tempalte = aipurl + '?act=search&key=#msearchword&lang=&page=1';
                        var searchurl = search_tempalte.replace('#msearchword', encodeURIComponent(new_value));
                        Lampa.Activity.push({
                            url: searchurl,
                            title: '听歌 - 搜索"' + new_value + '"',
                            // waitload: false,
                            component: 'ZZMUSIC',
                            // connectype: 'native',
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                });
            });
            info.find('.open--play').on('hover:enter hover:click', function () {
                playAll();
			});
            this.selectGroup = function () {
                let result = [];

                $('.aside-menu-list.channel a.menu-link').each(function () {
                    let value = $(this).text().replace(/\n/g, ',').replace(/\s/g, '').replace(/,,/g, '');  // 取出元素的值
                    let value1 = $(this).attr('href').replace(/\.htm/g, '');  // 取出元素的值

                    let subArray = [value, value1];  // 创建包含两个值的子数组
                    result.push(subArray);  // 将子数组添加到结果数组中
                });

                console.log(result);
                listmenu();
            };
            //info.find('.info__rate,.info__right').remove();
            scroll.render().addClass('layer--wheight').data('mheight', info);

            var havedata, listdata;
            listdata = data.data;
            havedata = data.data;
            
            if (havedata) {
                if (listdata.length) {
                    html.append(info);
                    html.append(scroll.render());
                    this.append(data);
                    scroll.append(body);
                    this.activity.loader(false);
                    this.activity.toggle();
                }
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
                  } else if (info.find('.open--play').hasClass('focus')) {
                      Lampa.Controller.toggle('content');
                  } else if (info.find('.open--find').hasClass('focus')) {
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
        };
    }

    var catalogs = [{
        title: '首页',
        url: 'https://zz123.com/ajax/?act=index_faxian&lang=&page=1',
        code: '',
        type: 'playlist',
        connectype: ''
    },{
        title: '热门歌手',
        url: 'https://zz123.com/ajax/',
        code: '',
        type: 'playlist',
        connectype: ''
    },{
        title: '歌单',
        url: 'https://zz123.com/ajax/',
        code: '',
        type: 'playlist',
        connectype: ''
    },{
        title: '榜单',
        url: 'https://zz123.com/ajax/',
        code: '',
        type: 'playlist',
        connectype: ''
    },{
        title: '老歌',
        url: 'https://zz123.com/ajax/',
        code: '',
        type: 'playlist',
        connectype: ''
    },{
        title: '年代',
        url: 'https://zz123.com/ajax/',
        code: '',
        type: 'playlist',
        connectype: ''
    },{
        title: '流行',
        url: 'https://zz123.com/ajax/',
        code: '',
        type: 'playlist',
        connectype: ''
    },];

    function player() {
        var html = Lampa.Template.get('radio_player', {});
        var audio = new Audio();
        var url = '';
        var played = false;
        var hls;
        var playall = false;
        audio.addEventListener("play", function (event) {
          played = true;
          html.toggleClass('loading', false);
        });
  
        function prepare() {
          if (audio.canPlayType('audio/mpeg;') || audio.canPlayType('application/vnd.apple.mpegurl') || url.indexOf('.mp3') > 0) load();else if (Hls.isSupported()) {
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
              if ((Object.keys(lrcObj_).length) == 0){
                $(".info__title-original").text('');
              };
              audio.addEventListener("timeupdate", function () {

                  var currentTime = audio.currentTime;

                  var obj = lrcObj_[Math.floor(currentTime)];
                  if (obj != undefined) {
                      $('.info__title-original').css('color', 'f3d900');
                      $(".info__title-original").text(obj ? obj : '♪...');
                    // $(".info__lyric").text(obj ? obj : '♪...');
                  } 
                  var duration = audio.duration;

                  var minutes = Math.floor(currentTime / 60);
                  var seconds = Math.floor(currentTime % 60);

                  var durationMinutes = Math.floor(duration / 60);
                  var durationSeconds = Math.floor(duration % 60);

                //   var progress = (audio.currentTime / audio.duration) * 100;
                  //   console.log(progress)
                  //   progressBar.css("width", progress + "%");

                  // 更新进度条文本
                  $(".info__create").text(
                      ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + " / " + ("0" + durationMinutes).slice(-2) + ":" + ("0" + durationSeconds).slice(-2)
                  );
              });
              if (playall) { audio.addEventListener("ended", playEndedHandler, false); }
              

               
          } catch (e) {}
  
          if (playPromise !== undefined) {
            playPromise.then(function () {
                
              console.log('Music', 'start plaining');
              
            })["catch"](function (e) {
              console.log('Music', 'play promise error:', e.message);
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

        html.on('hover:long', function () {
            var balanser_ = Lampa.Storage.get('online_music_balanser');
            // && balanser_ === 'zz123'
            if (currentplaylist_) {
                var sources = [];
                var num = 3;
                var playlistData = currentplaylist_;
                // console.log(playlistData)

                playlistData.forEach(function (html,i) {
                    sources.push({
                        title: currentplaylist_[i][3] + '-' +currentplaylist_[i][0],
                        url: currentplaylist_[i][0]
                    });

                });
                // console.log(sources)
                var html_ = $('<div></div>');
                var navigation = $('<div class="navigation-tabs"></div>');

                sources.forEach(function (tab, i) {
                    // console.log(html.find('.radio-player__name').text(),tab.url,(html.find('.radio-player__name').text() === tab.url))
                    var ifplaynow = (html.find('.radio-player__name').text() === tab.url) ? "active" : "selector";
                    var button = $('<div class="navigation-tabs__button '+ifplaynow+'">' + tab.title + '</div>');
                    button.on('hover:enter', function () {
                        playEndedHandler_(i-1);
                        Lampa.Modal.close();
                        Lampa.Controller.toggle('content');
                    });

                    if (i > 0 && i % num != 0) navigation.append('<div class="navigation-tabs__split">|</div>');
                    if (i % num == 0) { // 当 i 是 num 的倍数时，将当前行容器加入到总容器，并新建一个行容器
                        if (i > 0) html_.append(navigation);
                        navigation = $('<div class="navigation-tabs"></div>');
                    }
                    navigation.append(button);
                });

                html_.append(navigation);
                // console.log(navigation)

                Lampa.Modal.open({
                    title: '当前播放列表',
                    html: html_,
                    size: 'medium',
                    // align: 'center',
                    // select: html.find('.navigation-tabs .active')[0],
                    mask: true,
                    onBack: function onBack() {
                        Lampa.Modal.close();
                        Lampa.Api.clear();
                        Lampa.Controller.toggle('content');
                    }
                });
                sources = null;
                playlistData = null;
            }
        });
  
        this.create = function () {
          $('.head__actions .open--search').before(html);
        };
  
        this.play = function (data) {
          stop();
          url = data.url;
          playall = data.playall;
          html.find('.radio-player__name').text(data.title);
          html.toggleClass('hide', false);
          play();
        };
    }

    function playEndedHandler(){
        if (currentplaylist_.length > 0) {
            var network = new Lampa.Reguest();
            var player = window.radio_player1_;
            currentIndex_ = (currentIndex_ + 1) % currentplaylist_.length;
            network["native"](aipurl, function (result) {
                if (result.status == 200) {
                    lrcObj_ = {}
                    // console.log(result.lrc.lyric)
                    if (result.data.lrc) {
                        var lyrics = result.data.lrc.split("\n");
                        for (var i = 0; i < lyrics.length; i++) {
                            var lyric = decodeURIComponent(lyrics[i]);
                            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                            var timeRegExpArr = lyric.match(timeReg);
                            if (!timeRegExpArr) continue;
                            var clause = lyric.replace(timeReg, '');
                            for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                                var t = timeRegExpArr[k];
                                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                                var time = min * 60 + sec;
                                lrcObj_[time] = clause;
                            }
                        }
                    }
                    var data = {
                        url: currentplaylist_[currentIndex_][2] || 'https://zz123.com'+result.data.mp3,
                        title: currentplaylist_[currentIndex_][0],
                        playall: true
                    }
                    player.play(data);
                }
            }, function (a, c) {
                // Lampa.Noty.show('无法取得播放链接');
            }, 'act=songinfo&lang=&id=' + currentplaylist_[currentIndex_][1], {
                dataType: 'json',
                headers: {
                    'Referer': aipurl,
                }

            });
        }
    }

    function playEndedHandler_(pos){
        if (currentplaylist_.length > 0) {
            var network = new Lampa.Reguest();
            var player = window.radio_player1_;
            currentIndex_ = pos;
            currentIndex_ = (currentIndex_ + 1) % currentplaylist_.length;
            network["native"](aipurl, function (result) {
                if (result.status == 200) {
                    lrcObj_ = {}
                    // console.log(result.lrc.lyric)
                    if (result.data.lrc) {
                        var lyrics = result.data.lrc.split("\n");
                        for (var i = 0; i < lyrics.length; i++) {
                            var lyric = decodeURIComponent(lyrics[i]);
                            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                            var timeRegExpArr = lyric.match(timeReg);
                            if (!timeRegExpArr) continue;
                            var clause = lyric.replace(timeReg, '');
                            for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                                var t = timeRegExpArr[k];
                                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                                var time = min * 60 + sec;
                                lrcObj_[time] = clause;
                            }
                        }
                    }
                    var data = {
                        url: currentplaylist_[currentIndex_][2] || 'https://zz123.com'+result.data.mp3,
                        title: currentplaylist_[currentIndex_][0],
                        playall: true
                    }
                    player.play(data);
                }
            }, function (a, c) {
                // Lampa.Noty.show('无法取得播放链接');
            }, 'act=songinfo&lang=&id=' + currentplaylist_[currentIndex_][1], {
                dataType: 'json',
                headers: {
                    'Referer': aipurl,
                }
            });
        }
    }

    function playAll(){
        currentplaylist_ = musiclist_;
        if (currentplaylist_.length > 0) {
            Lampa.Storage.set('online_music_balanser', 'zz123');
            var network = new Lampa.Reguest();
            var player = window.radio_player1_;
            currentIndex_ = 0;
            // console.log('播放完毕，准备下一首歌。')

            network["native"](aipurl, function (result) {
                if (result.status == 200) {
                    lrcObj_ = {}
                    // console.log(result.lrc.lyric)
                    if (result.data.lrc) {
                        var lyrics = result.data.lrc.split("\n");
                        for (var i = 0; i < lyrics.length; i++) {
                            var lyric = decodeURIComponent(lyrics[i]);
                            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                            var timeRegExpArr = lyric.match(timeReg);
                            if (!timeRegExpArr) continue;
                            var clause = lyric.replace(timeReg, '');
                            for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                                var t = timeRegExpArr[k];
                                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                                var time = min * 60 + sec;
                                lrcObj_[time] = clause;
                            }
                        }
                    }
                    var data = {
                        url: currentplaylist_[currentIndex_][2] || 'https://zz123.com'+result.data.mp3,
                        title: currentplaylist_[currentIndex_][0],
                        playall: true
                    }
                    player.play(data);
                }
            }, function (a, c) {
                // Lampa.Noty.show('无法取得播放链接');
            }, 'act=songinfo&lang=&id=' + currentplaylist_[currentIndex_][1], {
                dataType: 'json',
                headers: {
                    'Referer': aipurl,
                }

            });
        } else {
            Lampa.Noty.show('没有可以播放的歌曲。');
        }
    }

    function popupWindows(playlistname, gourl, num, gotype, titlename) {
        var sources = [];
        // var songling = playlistname;
        var playlistData = playlistname;//songling.split(',');
        // console.log(playlistData)

        playlistData.forEach(function (html) {
            sources.push({
                title: html[0],
                cat:html[1],
                url: gourl
            });

        });
        // console.log(sources)
        var html_ = $('<div></div>');
        var navigation = $('<div class="navigation-tabs"></div>');
        
        sources.forEach(function (tab, i) {
            var button = $('<div class="navigation-tabs__button selector">' + tab.title + '</div>');
            button.on('hover:enter', function () {
                Lampa.Activity.push({
                    url: tab.url+tab.cat,
                    title: '听歌 - '+ titlename +' - ' + tab.title,
                    // code: '',
                    component: 'ZZMUSIC',
                    type: gotype,
                    // connectype: '',
                    page: 1
                });
                Lampa.Modal.close();
            });

            if (i > 0 && i % num != 0) navigation.append('<div class="navigation-tabs__split">|</div>');
            if (i % num == 0) { // 当 i 是 num 的倍数时，将当前行容器加入到总容器，并新建一个行容器
                if (i > 0) html_.append(navigation);
                navigation = $('<div class="navigation-tabs"></div>');
            }
            navigation.append(button);
        });

        html_.append(navigation);
        // console.log(navigation)

        Lampa.Modal.open({
            title: titlename,
            html: html_,
            size: 'medium',
            // align: 'center',
            // select: html.find('.navigation-tabs .active')[0],
            mask: true,
            onBack: function onBack() {
                Lampa.Modal.close();
                Lampa.Api.clear();
                Lampa.Controller.toggle('content');
            }
        });
        sources = null;
        playlistData = null;

    }

    function listmenu(){
        var playlistname;
        Lampa.Select.show({
            title: '分类',
            items: catalogs,
            onSelect: function onSelect(a) {
                if (a.title == '歌单') {
                    playlistname =[
                        [
                            "榜单",
                            "vszs"
                        ],
                        [
                            "老歌",
                            "azz"
                        ],
                        [
                            "古风",
                            "mv"
                        ],
                        [
                            "Soul",
                            "akda"
                        ],
                        [
                            "儿童",
                            "zud"
                        ],
                        [
                            "乡村",
                            "aku"
                        ],
                        [
                            "助眠",
                            "d"
                        ],
                        [
                            "纯音乐",
                            "az"
                        ],
                        [
                            "茶道",
                            "vadqm"
                        ],
                        [
                            "抖音",
                            "mszm"
                        ],
                        [
                            "DJ",
                            "msdm"
                        ],
                        [
                            "00后",
                            "msuv"
                        ],
                        [
                            "场景",
                            "zxzxu"
                        ],
                        [
                            "语种",
                            "vmvav"
                        ],
                        [
                            "心情",
                            "kuau"
                        ],
                        [
                            "神曲",
                            "asx"
                        ],
                        [
                            "广场舞",
                            "ssmma"
                        ],
                        [
                            "网络",
                            "sxuus"
                        ],
                        [
                            "相声",
                            "qdsam"
                        ],
                        [
                            "流行",
                            "quvma"
                        ],
                        [
                            "影视",
                            "qdk"
                        ],
                        [
                            "铃声",
                            "szdd"
                        ],
                        [
                            "戏曲",
                            "saak"
                        ],
                        [
                            "基督教",
                            "vamau"
                        ],
                        [
                            "佛教",
                            "azss"
                        ],
                        [
                            "民谣",
                            "ms"
                        ],
                        [
                            "说唱",
                            "qz"
                        ],
                        [
                            "健身",
                            "qqs"
                        ],
                        [
                            "女声",
                            "uz"
                        ],
                        [
                            "KTV",
                            "akka"
                        ],
                        [
                            "欧美",
                            "ka"
                        ],
                        [
                            "HIFI",
                            "qmkv"
                        ],
                        [
                            "婚礼",
                            "aaq"
                        ],
                        [
                            "红歌",
                            "mqmz"
                        ],
                        [
                            "好听",
                            "aza"
                        ],
                        [
                            "民歌",
                            "mqvk"
                        ],
                        [
                            "军旅",
                            "mkzmx"
                        ],
                        [
                            "精选",
                            "mdz"
                        ],
                        [
                            "酒廊情歌",
                            "mqms"
                        ],
                        [
                            "圣诞节",
                            "mxqv"
                        ],
                        [
                            "情人节",
                            "asuuq"
                        ],
                        [
                            "新年",
                            "qux"
                        ],
                        [
                            "商业",
                            "aqsvau"
                        ],
                        [
                            "叫声",
                            "aqsvmx"
                        ],
                        [
                            "年龄",
                            "aqsvms"
                        ],
                        [
                            "最火",
                            "qda"
                        ],
                        [
                            "年代",
                            "vvxmx"
                        ]
                    ];
                    popupWindows(playlistname, aipurl+'?act=tag_music&type=tuijian&lang=&page=1&tid=', 5, "playlist", "分类") 
                } else if (a.title == '榜单'){
                    playlistname =[
                        [
                            "热歌榜",
                            "mxuxuu"
                        ],
                        [
                            "新歌榜",
                            "mxuxzv"
                        ],
                        [
                            "抖音歌曲榜",
                            "mxuxkm"
                        ],
                        [
                            "DJ嗨歌榜",
                            "mxuxds"
                        ],
                        [
                            "极品电音榜",
                            "mxuxkd"
                        ],
                        [
                            "流行趋势榜",
                            "mxuxkz"
                        ],
                        [
                            "彩铃榜",
                            "mxuass"
                        ],
                        [
                            "尖叫热歌榜",
                            "mxuask"
                        ],
                        [
                            "飙升榜",
                            "mxuxvd"
                        ],
                        [
                            "台湾地区榜",
                            "mxuxqk"
                        ],
                        [
                            "欧美榜",
                            "mxuxqq"
                        ],
                        [
                            "韩国榜",
                            "mxuaxv"
                        ],
                        [
                            "香港地区榜",
                            "mxuaxd"
                        ],
                        [
                            "日本榜",
                            "mxuaaa"
                        ],
                        [
                            "内地榜",
                            "mxuaak"
                        ],
                        [
                            "港台榜",
                            "mxuasv"
                        ],
                        [
                            "越南语榜",
                            "mxuxux"
                        ],
                        [
                            "Beatport全球电子舞曲榜",
                            "mxuxuk"
                        ],
                        [
                            "日本Oricon榜",
                            "mxuxuq"
                        ],
                        [
                            "美国BillBoard榜",
                            "mxuamx"
                        ],
                        [
                            "美国iTunes榜",
                            "mxuavu"
                        ],
                        [
                            "听歌识曲榜",
                            "mxuxda"
                        ],
                        [
                            "睡前放松榜",
                            "mxuxdd"
                        ],
                        [
                            "禅心佛乐榜",
                            "mxuxku"
                        ],
                        [
                            "酷我铃声榜",
                            "mxuxdz"
                        ],
                        [
                            "酷我热评榜",
                            "mxuxdk"
                        ],
                        [
                            "酷我综艺榜",
                            "mxuxkx"
                        ],
                        [
                            "酷我新歌榜",
                            "mxuasq"
                        ],
                        [
                            "酷我飙升榜",
                            "mxuavx"
                        ],
                        [
                            "酷我热歌榜",
                            "mxuava"
                        ],
                        [
                            "酷狗音乐人原创榜",
                            "mxuaxm"
                        ],
                        [
                            "酷狗分享榜",
                            "mxuaad"
                        ],
                        [
                            "酷狗飙升榜",
                            "mxuams"
                        ],
                        [
                            "云音乐韩语榜",
                            "mxuxud"
                        ],
                        [
                            "云音乐古典榜",
                            "mxuxzx"
                        ],
                        [
                            "云音乐ACGVOCALOID榜",
                            "mxuxza"
                        ],
                        [
                            "云音乐ACG动画榜",
                            "mxuxzk"
                        ],
                        [
                            "云音乐国电榜",
                            "mxuxvk"
                        ],
                        [
                            "云音乐欧美热歌榜",
                            "mxuxvq"
                        ],
                        [
                            "云音乐欧美新歌榜",
                            "mxuxum"
                        ],
                        [
                            "云音乐ACG游戏榜",
                            "mxuxus"
                        ],
                        [
                            "原创榜",
                            "mxuxuz"
                        ],
                        [
                            "潜力爆款榜",
                            "mxuxzm"
                        ],
                        [
                            "最强翻唱榜",
                            "mxuxdv"
                        ],
                        [
                            "通勤路上榜",
                            "mxuxdu"
                        ],
                        [
                            "网红新歌榜",
                            "mxuxdq"
                        ],
                        [
                            "会员畅听榜",
                            "mxuxka"
                        ],
                        [
                            "冬日恋曲榜",
                            "mxuxks"
                        ],
                        [
                            "宝宝哄睡榜",
                            "mxuxkv"
                        ],
                        [
                            "经典怀旧榜",
                            "mxuxkk"
                        ],
                        [
                            "跑步健身榜",
                            "mxuxkq"
                        ],
                        [
                            "古风音乐榜",
                            "mxuxqx"
                        ],
                        [
                            "KTV点唱榜",
                            "mxuxqa"
                        ],
                        [
                            "车载嗨曲榜",
                            "mxuxqm"
                        ],
                        [
                            "熬夜修仙榜",
                            "mxuxqs"
                        ],
                        [
                            "Vlog必备榜",
                            "mxuxqv"
                        ],
                        [
                            "爆笑相声榜",
                            "mxuxqu"
                        ],
                        [
                            "DJ热歌榜",
                            "mxuaax"
                        ],
                        [
                            "快手热歌榜",
                            "mxuaas"
                        ],
                        [
                            "尖叫新歌榜",
                            "mxuaav"
                        ],
                        [
                            "影视金曲榜",
                            "mxuaau"
                        ],
                        [
                            "俄语榜",
                            "mxuavm"
                        ],
                        [
                            "KTV榜",
                            "mxuavz"
                        ],
                        [
                            "尖叫原创榜",
                            "mxuavd"
                        ],
                        [
                            "法国NRJVosHits周榜",
                            "mxuxua"
                        ]
                    ];
                    popupWindows(playlistname, aipurl+'?act=tag_music&type=tuijian&lang=&page=1&tid=', 5, "playlist", "榜单") 
                } else if (a.title == '老歌') {
                    playlistname = [
                        [
                            "老歌",
                            "azz"
                        ],
                        [
                            "热门",
                            "aaxu"
                        ],
                        [
                            "经典歌曲",
                            "mmak"
                        ],
                        [
                            "经典老歌",
                            "ddda"
                        ],
                        [
                            "欧美经典",
                            "maak"
                        ],
                        [
                            "经典女声",
                            "suzd"
                        ],
                        [
                            "经典粤语歌",
                            "vkms"
                        ],
                        [
                            "流行经典",
                            "mzsk"
                        ],
                        [
                            "不朽的经典",
                            "dzmd"
                        ]
                    ];
                    popupWindows(playlistname, aipurl+'?act=tag_music&type=tuijian&lang=&page=1&tid=', 5, "playlist", "老歌") 
                } else if (a.title == '年代') {
                    playlistname = [
                        [
                            "学生年代",
                            "avzd"
                        ],
                        [
                            "80年代",
                            "avqs"
                        ],
                        [
                            "90年代",
                            "avqv"
                        ],
                        [
                            "50年代",
                            "mquv"
                        ],
                        [
                            "70年代",
                            "ssvu"
                        ],
                        [
                            "00年代",
                            "vmzus"
                        ]
                    ];
                    popupWindows(playlistname, aipurl+'?act=tag_music&type=tuijian&lang=&page=1&tid=', 5, "playlist", "年代") 
                } else if (a.title == '流行') {
                    playlistname = [
                        [
                            "流行",
                            "quvma"
                        ],
                        [
                            "国语流行",
                            "vsk"
                        ],
                        [
                            "欧美流行",
                            "mdv"
                        ],
                        [
                            "粤语流行",
                            "adqs"
                        ],
                        [
                            "日本流行",
                            "asa"
                        ],
                        [
                            "韩语流行",
                            "vkz"
                        ],
                        [
                            "独立流行",
                            "sdss"
                        ]
                    ];
                    popupWindows(playlistname, aipurl+'?act=tag_music&type=tuijian&lang=&page=1&tid=', 5, "playlist", "流行") 
                } else if (a.title == '热门歌手') {
                    playlistname =[
                        [
                            "周杰伦",
                            "dqk"
                        ],
                        [
                            "卦者灵风",
                            "maxqkx"
                        ],
                        [
                            "薛之谦",
                            "msqq"
                        ],
                        [
                            "陈奕迅",
                            "vx"
                        ],
                        [
                            "五月天",
                            "auks"
                        ],
                        [
                            "陈一发儿",
                            "zvaka"
                        ],
                        [
                            "买辣椒也用券",
                            "zzdxa"
                        ],
                        [
                            "Beyond",
                            "axdu"
                        ],
                        [
                            "陈慧娴",
                            "aad"
                        ],
                        [
                            "周传雄",
                            "dkq"
                        ],
                        [
                            "程响",
                            "azkss"
                        ],
                        [
                            "TaylorSwift",
                            "dvkd"
                        ],
                        [
                            "毛不易",
                            "zvxqu"
                        ],
                        [
                            "伍佰",
                            "umk"
                        ],
                        [
                            "凤凰传奇",
                            "mdaa"
                        ],
                        [
                            "轻音乐",
                            "ksmu"
                        ],
                        [
                            "王菲",
                            "zxk"
                        ],
                        [
                            "蔡健雅",
                            "zx"
                        ],
                        [
                            "张杰",
                            "mmaa"
                        ],
                        [
                            "周深",
                            "uzmku"
                        ],
                        [
                            "S.H.E",
                            "avxk"
                        ],
                        [
                            "许嵩",
                            "mkmx"
                        ],
                        [
                            "刘若英",
                            "sua"
                        ],
                        [
                            "李荣浩",
                            "sdxqs"
                        ],
                        [
                            "张学友",
                            "dmm"
                        ],
                        [
                            "孙燕姿",
                            "umd"
                        ],
                        [
                            "莫文蔚",
                            "vqm"
                        ],
                        [
                            "汪苏泷",
                            "kqmq"
                        ],
                        [
                            "阿梨粤",
                            "maxqqq"
                        ],
                        [
                            "海来阿木",
                            "zqdvs"
                        ],
                        [
                            "刘艺雯",
                            "maxdmd"
                        ],
                        [
                            "手机铃声",
                            "axdsz"
                        ],
                        [
                            "抖音歌曲",
                            "zkxuq"
                        ],
                        [
                            "刘德华",
                            "svq"
                        ],
                        [
                            "任贤齐",
                            "vmq"
                        ],
                        [
                            "王琪",
                            "uavaz"
                        ],
                        [
                            "赵雷",
                            "suxuq"
                        ],
                        [
                            "梁静茹",
                            "sdk"
                        ],
                        [
                            "半吨兄弟",
                            "dxxzk"
                        ],
                        [
                            "邓紫棋",
                            "zzxm"
                        ],
                        [
                            "张信哲",
                            "daq"
                        ],
                        [
                            "魏佳艺",
                            "sxsv"
                        ],
                        [
                            "邓紫棋",
                            "uusam"
                        ],
                        [
                            "张碧晨",
                            "uudva"
                        ],
                        [
                            "周华健",
                            "dqu"
                        ],
                        [
                            "告五人",
                            "dxxsv"
                        ],
                        [
                            "庄心妍",
                            "vadzx"
                        ],
                        [
                            "许巍",
                            "axaq"
                        ],
                        [
                            "张韶涵",
                            "ksd"
                        ],
                        [
                            "谭咏麟",
                            "vuv"
                        ],
                        [
                            "任然",
                            "akkkq"
                        ],
                        [
                            "刀郎",
                            "kuu"
                        ],
                        [
                            "张雨生",
                            "dsd"
                        ],
                        [
                            "七叔（叶泽浩）",
                            "maxdvd"
                        ],
                        [
                            "温奕心",
                            "damxv"
                        ],
                        [
                            "梦然",
                            "vxmus"
                        ],
                        [
                            "陈百强",
                            "az"
                        ],
                        [
                            "陶喆",
                            "vud"
                        ],
                        [
                            "豆包",
                            "uvkqx"
                        ],
                        [
                            "张震岳",
                            "dvs"
                        ],
                        [
                            "朴树",
                            "qzz"
                        ],
                        [
                            "G.E.M.邓紫棋",
                            "dsxds"
                        ],
                        [
                            "逃跑计划",
                            "svdzu"
                        ],
                        [
                            "一支榴莲",
                            "daqkq"
                        ],
                        [
                            "旺仔小乔",
                            "akukzv"
                        ],
                        [
                            "林宥嘉",
                            "zsxq"
                        ],
                        [
                            "杨千嬅",
                            "zqm"
                        ],
                        [
                            "王心凌",
                            "udv"
                        ],
                        [
                            "张国荣",
                            "zzs"
                        ],
                        [
                            "李宗盛",
                            "mqu"
                        ],
                        [
                            "DJ舞曲",
                            "aau"
                        ],
                        [
                            "李昕融",
                            "zszvk"
                        ],
                        [
                            "郑中基",
                            "ddk"
                        ],
                        [
                            "张宇",
                            "dsx"
                        ],
                        [
                            "徐誉滕",
                            "mdkv"
                        ],
                        [
                            "胡彦斌",
                            "kqq"
                        ],
                        [
                            "王杰",
                            "vdm"
                        ],
                        [
                            "杨宗纬",
                            "szku"
                        ],
                        [
                            "蓝心羽",
                            "zqvxm"
                        ],
                        [
                            "筷子兄弟",
                            "aksvk"
                        ],
                        [
                            "纯音乐合辑",
                            "axv"
                        ],
                        [
                            "JustinBieber",
                            "qxks"
                        ],
                        [
                            "房东的猫",
                            "zvuzm"
                        ],
                        [
                            "DJ小鱼儿",
                            "zmdmx"
                        ],
                        [
                            "动力火车",
                            "aask"
                        ],
                        [
                            "队长",
                            "dxqzu"
                        ],
                        [
                            "艾辰",
                            "zvvmm"
                        ],
                        [
                            "经典老歌",
                            "masu"
                        ],
                        [
                            "林子祥",
                            "mzm"
                        ],
                        [
                            "汪峰",
                            "qqv"
                        ],
                        [
                            "田馥甄",
                            "szaa"
                        ],
                        [
                            "飞儿乐团",
                            "mxak"
                        ],
                        [
                            "儿歌大全",
                            "mmdq"
                        ],
                        [
                            "华语群星",
                            "uqxdm"
                        ],
                        [
                            "音阙诗听",
                            "zzaaq"
                        ],
                        [
                            "萧亚轩",
                            "zzm"
                        ],
                        [
                            "抖音热歌",
                            "zqmkz"
                        ],
                        [
                            "李玉刚",
                            "zkdu"
                        ],
                        [
                            "承桓",
                            "mmkxqq"
                        ],
                        [
                            "免费铃声下载",
                            "adaku"
                        ],
                        [
                            "宝石Gem",
                            "dxzds"
                        ],
                        [
                            "刘珂矣",
                            "usduv"
                        ],
                        [
                            "blackpink",
                            "dsava"
                        ],
                        [
                            "邓丽君",
                            "avd"
                        ],
                        [
                            "郑智化",
                            "ddz"
                        ],
                        [
                            "杨小壮",
                            "daxmv"
                        ],
                        [
                            "AlanWalker",
                            "zxsmx"
                        ],
                        [
                            "yihuik苡慧",
                            "maxmqs"
                        ],
                        [
                            "手机铃声1",
                            "zuqss"
                        ],
                        [
                            "林志炫",
                            "ssq"
                        ],
                        [
                            "彭佳慧",
                            "uxz"
                        ],
                        [
                            "张惠妹",
                            "ksv"
                        ],
                        [
                            "泥土音乐",
                            "vvdsm"
                        ],
                        [
                            "苏打绿",
                            "mdvm"
                        ],
                        [
                            "阿冗",
                            "dxqqx"
                        ],
                        [
                            "叶倩文",
                            "dvm"
                        ],
                        [
                            "刘大拿",
                            "mmzvxd"
                        ],
                        [
                            "中文舞曲",
                            "adaqz"
                        ],
                        [
                            "信乐团",
                            "azxk"
                        ],
                        [
                            "BrunoMars",
                            "akdka"
                        ],
                        [
                            "莫叫姐姐",
                            "maxzkm"
                        ],
                        [
                            "那英",
                            "quq"
                        ],
                        [
                            "xxxTENTACION",
                            "dsmsu"
                        ],
                        [
                            "弦子",
                            "mvxm"
                        ],
                        [
                            "大欢",
                            "dxmzz"
                        ],
                        [
                            "张敬轩",
                            "axsa"
                        ],
                        [
                            "YOASOBI",
                            "dmqsk"
                        ],
                        [
                            "河图",
                            "dsvq"
                        ],
                        [
                            "罗大佑",
                            "sdm"
                        ],
                        [
                            "Westlife",
                            "azzm"
                        ],
                        [
                            "GI-DLE",
                            "adqmuu"
                        ],
                        [
                            "张靓颖",
                            "msvk"
                        ],
                        [
                            "陈淑桦",
                            "ka"
                        ],
                        [
                            "方大同",
                            "akzqa"
                        ],
                        [
                            "韩红",
                            "qxz"
                        ],
                        [
                            "郑源",
                            "mmzs"
                        ],
                        [
                            "CharliePuth",
                            "skaqs"
                        ],
                        [
                            "SEVENTEEN",
                            "dmkkk"
                        ],
                        [
                            "澤野弘之",
                            "ssakd"
                        ],
                        [
                            "郭顶",
                            "mmmm"
                        ],
                        [
                            "苏星婕",
                            "aqzsmv"
                        ],
                        [
                            "降央卓玛",
                            "qmza"
                        ],
                        [
                            "Eminem",
                            "akdkk"
                        ],
                        [
                            "BY2",
                            "skud"
                        ],
                        [
                            "RADWIMPS",
                            "amkzv"
                        ],
                        [
                            "陈瑞",
                            "mksv"
                        ],
                        [
                            "王靖雯不胖",
                            "dmsqk"
                        ],
                        [
                            "王赫野",
                            "akkkua"
                        ],
                        [
                            "庞龙",
                            "mxuq"
                        ],
                        [
                            "LBI利比",
                            "maxdxq"
                        ],
                        [
                            "李丽芬",
                            "ddsq"
                        ],
                        [
                            "法老",
                            "zvauq"
                        ],
                        [
                            "孙露",
                            "szau"
                        ],
                        [
                            "孟庭苇",
                            "vqx"
                        ],
                        [
                            "EXO",
                            "vskuz"
                        ],
                        [
                            "李克勤",
                            "mmk"
                        ],
                        [
                            "华晨宇",
                            "vzaxz"
                        ],
                        [
                            "水木年华",
                            "avzs"
                        ],
                        [
                            "抖音最火歌曲",
                            "dsvuu"
                        ],
                        [
                            "黄品源",
                            "azv"
                        ],
                        [
                            "迦南诗选",
                            "vvdza"
                        ],
                        [
                            "光良",
                            "amx"
                        ],
                        [
                            "黄小琥",
                            "mza"
                        ],
                        [
                            "Sia",
                            "dqsu"
                        ],
                        [
                            "米津玄师",
                            "vsvvz"
                        ],
                        [
                            "等什么君邓寓君",
                            "maaxva"
                        ],
                        [
                            "阿悠悠",
                            "zqqss"
                        ],
                        [
                            "闻人听書_",
                            "dmvzk"
                        ],
                        [
                            "徐良",
                            "adqzu"
                        ],
                        [
                            "花姐",
                            "zuudz"
                        ],
                        [
                            "陈楚生",
                            "samq"
                        ],
                        [
                            "李圣杰",
                            "msd"
                        ],
                        [
                            "黄霄雲",
                            "zdksd"
                        ],
                        [
                            "Adele",
                            "dvqv"
                        ],
                        [
                            "海伦",
                            "daxqs"
                        ],
                        [
                            "薛凯琪",
                            "zkd"
                        ],
                        [
                            "梅艳芳",
                            "vkd"
                        ],
                        [
                            "单依纯",
                            "dsuxs"
                        ],
                        [
                            "韩宝仪",
                            "mmaq"
                        ],
                        [
                            "Coldplay",
                            "svam"
                        ],
                        [
                            "戴羽彤",
                            "daxsz"
                        ],
                        [
                            "小阿枫",
                            "dxkum"
                        ],
                        [
                            "TFBOYS",
                            "vdasu"
                        ],
                        [
                            "大壮",
                            "zvazu"
                        ],
                        [
                            "群星",
                            "ausm"
                        ],
                        [
                            "范晓萱",
                            "azd"
                        ],
                        [
                            "ImagineDragons",
                            "uvdud"
                        ],
                        [
                            "容祖儿",
                            "uak"
                        ],
                        [
                            "陈雪凝",
                            "zvadu"
                        ],
                        [
                            "鞠婧祎",
                            "zadsx"
                        ],
                        [
                            "范玮琪",
                            "auk"
                        ],
                        [
                            "李健",
                            "mmau"
                        ],
                        [
                            "Edsheeran",
                            "vxmma"
                        ],
                        [
                            "白小白",
                            "zaqdu"
                        ],
                        [
                            "王以太",
                            "dxkzk"
                        ],
                        [
                            "Maroon5",
                            "zxsdm"
                        ],
                        [
                            "迪克牛仔",
                            "us"
                        ],
                        [
                            "苏谭谭",
                            "zqukz"
                        ],
                        [
                            "MichaelJackson",
                            "aqxa"
                        ],
                        [
                            "孙楠",
                            "qkm"
                        ],
                        [
                            "KellyClarkson",
                            "mvkv"
                        ],
                        [
                            "Bigbang",
                            "qdak"
                        ],
                        [
                            "海鸣威",
                            "mqqk"
                        ],
                        [
                            "柯柯柯啊",
                            "maxzzq"
                        ],
                        [
                            "摇滚音乐",
                            "adazk"
                        ],
                        [
                            "祁隆",
                            "dmks"
                        ],
                        [
                            "曲婉婷",
                            "akkxx"
                        ],
                        [
                            "大张伟",
                            "dmdv"
                        ],
                        [
                            "王贰浪",
                            "zqdad"
                        ],
                        [
                            "ZyBoy忠宇",
                            "mmusum"
                        ],
                        [
                            "黑鸭子组合",
                            "dskas"
                        ],
                        [
                            "谢霆锋",
                            "uum"
                        ],
                        [
                            "花粥",
                            "vksqk"
                        ],
                        [
                            "徐佳莹",
                            "davd"
                        ],
                        [
                            "GALA",
                            "qkmx"
                        ],
                        [
                            "h3R3",
                            "dxkxk"
                        ],
                        [
                            "阿YueYue",
                            "zzums"
                        ],
                        [
                            "庾澄庆",
                            "zmd"
                        ],
                        [
                            "基督教歌曲",
                            "vxzmk"
                        ],
                        [
                            "丁当",
                            "sadu"
                        ],
                        [
                            "林忆莲",
                            "vsx"
                        ],
                        [
                            "戏曲",
                            "zqma"
                        ],
                        [
                            "MariahCarey",
                            "akzz"
                        ],
                        [
                            "付豪",
                            "mkkvs"
                        ],
                        [
                            "邰正宵",
                            "vua"
                        ],
                        [
                            "吴雨霏",
                            "mzsx"
                        ],
                        [
                            "RichardClayderman",
                            "sau"
                        ],
                        [
                            "黄静美",
                            "dmmsk"
                        ],
                        [
                            "一人一首成名曲",
                            "azskm"
                        ],
                        [
                            "米津玄師",
                            "kaqua"
                        ],
                        [
                            ".",
                            "dddvm"
                        ],
                        [
                            "蔡琴",
                            "dv"
                        ],
                        [
                            "金玟岐",
                            "uxddx"
                        ],
                        [
                            "银临",
                            "vvkzq"
                        ],
                        [
                            "LinkinPark",
                            "amuv"
                        ],
                        [
                            "1K",
                            "mmkxss"
                        ],
                        [
                            "华语群星",
                            "mxxv"
                        ],
                        [
                            "F.I.R.",
                            "vqvmd"
                        ],
                        [
                            "程佳佳",
                            "dxumz"
                        ],
                        [
                            "麦小兜",
                            "zuvzm"
                        ],
                        [
                            "李翊君",
                            "vzv"
                        ],
                        [
                            "阿桑",
                            "sz"
                        ],
                        [
                            "姜育恒",
                            "aqm"
                        ],
                        [
                            "任夏",
                            "mmsdmv"
                        ],
                        [
                            "铃声",
                            "akvqq"
                        ],
                        [
                            "张紫豪",
                            "zkuzz"
                        ],
                        [
                            "金润吉",
                            "vuudq"
                        ],
                        [
                            "杨清柠",
                            "zsdda"
                        ],
                        [
                            "胡歌",
                            "mzsm"
                        ],
                        [
                            "阿杜",
                            "m"
                        ],
                        [
                            "现场串烧",
                            "vakmz"
                        ],
                        [
                            "胡夏",
                            "akuzs"
                        ],
                        [
                            "焦迈奇",
                            "zuzdu"
                        ],
                        [
                            "赵乃吉",
                            "uzavz"
                        ],
                        [
                            "小阿七",
                            "dxkvd"
                        ],
                        [
                            "郁可唯",
                            "dmzv"
                        ],
                        [
                            "周柏豪",
                            "suxv"
                        ],
                        [
                            "南拳妈妈",
                            "asud"
                        ],
                        [
                            "Twins",
                            "auvx"
                        ],
                        [
                            "金莎",
                            "mmvv"
                        ],
                        [
                            "郑润泽",
                            "mxzkau"
                        ],
                        [
                            "徐怀钰",
                            "zsv"
                        ],
                        [
                            "毛宁",
                            "qzs"
                        ],
                        [
                            "谢和弦",
                            "zkam"
                        ],
                        [
                            "刘惜君",
                            "svxu"
                        ],
                        [
                            "盛哲",
                            "aqvzkk"
                        ],
                        [
                            "麦子",
                            "udkds"
                        ],
                        [
                            "Lenka",
                            "dvsa"
                        ],
                        [
                            "魏新雨",
                            "vxmmd"
                        ],
                        [
                            "赵传",
                            "dzx"
                        ],
                        [
                            "王不醒",
                            "mmzsxx"
                        ],
                        [
                            "少女时代",
                            "zqua"
                        ],
                        [
                            "乌兰图雅",
                            "akkmd"
                        ],
                        [
                            "于文文",
                            "umqqm"
                        ],
                        [
                            "黎明",
                            "mau"
                        ],
                        [
                            "陈芳语",
                            "vquav"
                        ],
                        [
                            "李袁杰",
                            "zdxuz"
                        ],
                        [
                            "云朵",
                            "zvva"
                        ],
                        [
                            "尹昔眠",
                            "dvzsd"
                        ],
                        [
                            "Eric周兴哲",
                            "maxdzm"
                        ],
                        [
                            "PostMalone",
                            "uqmsz"
                        ],
                        [
                            "詹雯婷",
                            "dmamv"
                        ],
                        [
                            "平生不晚",
                            "mxuquv"
                        ],
                        [
                            "TizzyT",
                            "zvavz"
                        ],
                        [
                            "佛教音乐",
                            "azsux"
                        ],
                        [
                            "群星",
                            "azsqd"
                        ],
                        [
                            "梦涵",
                            "dxmqq"
                        ],
                        [
                            "广场舞",
                            "akvam"
                        ],
                        [
                            "王小帅",
                            "zqdsz"
                        ],
                        [
                            "生命河灵粮堂",
                            "vvzks"
                        ],
                        [
                            "胡66",
                            "zzqzu"
                        ],
                        [
                            "柳爽",
                            "zvsds"
                        ],
                        [
                            "ArianaGrande",
                            "vukzs"
                        ],
                        [
                            "屠洪刚",
                            "qkk"
                        ],
                        [
                            "韩磊",
                            "mdxd"
                        ],
                        [
                            "盛晓玫",
                            "aadxu"
                        ],
                        [
                            "Capper",
                            "ddzxs"
                        ],
                        [
                            "夏日入侵企画",
                            "daszk"
                        ],
                        [
                            "郭静",
                            "sazx"
                        ],
                        [
                            "Tank",
                            "mzvv"
                        ],
                        [
                            "虎二",
                            "zkzzv"
                        ],
                        [
                            "陈小春",
                            "su"
                        ],
                        [
                            "封茗囧菌",
                            "zmdad"
                        ],
                        [
                            "宇多田光",
                            "aukz"
                        ],
                        [
                            "劲舞团",
                            "dqqm"
                        ],
                        [
                            "周笔畅",
                            "msad"
                        ],
                        [
                            "林志颖",
                            "svm"
                        ],
                        [
                            "欢子",
                            "sdzm"
                        ],
                        [
                            "龙梅子",
                            "smvz"
                        ],
                        [
                            "葛漂亮",
                            "mmqvks"
                        ],
                        [
                            "MyLittleAirport",
                            "aqqa"
                        ],
                        [
                            "网络歌曲",
                            "mmzv"
                        ],
                        [
                            "古巨基",
                            "aax"
                        ],
                        [
                            "威少-DJ.HouseU盘",
                            "makvvx"
                        ],
                        [
                            "鹿晗",
                            "uzuuu"
                        ],
                        [
                            "纯音乐",
                            "kuad"
                        ],
                        [
                            "等什么君",
                            "zqdvq"
                        ],
                        [
                            "冷漠",
                            "zqsa"
                        ],
                        [
                            "郑伊健",
                            "ddv"
                        ],
                        [
                            "秋裤大叔",
                            "udzaz"
                        ],
                        [
                            "BryanAdams",
                            "assd"
                        ],
                        [
                            "誓言",
                            "mzux"
                        ],
                        [
                            "毛阿敏",
                            "qum"
                        ],
                        [
                            "Maroon5",
                            "udsk"
                        ],
                        [
                            "EllieGoulding",
                            "qkau"
                        ],
                        [
                            "李玖哲",
                            "mzuv"
                        ],
                        [
                            "李常超",
                            "vkvua"
                        ],
                        [
                            "GAI周延",
                            "zdumz"
                        ],
                        [
                            "HOYO-MiX",
                            "dvzqa"
                        ],
                        [
                            "沈以诚",
                            "zuuxa"
                        ],
                        [
                            "Brazzaville",
                            "akkaa"
                        ],
                        [
                            "东来东往",
                            "madz"
                        ],
                        [
                            "崔子格",
                            "mkqzz"
                        ],
                        [
                            "林海",
                            "qvx"
                        ],
                        [
                            "关歆",
                            "mmvmzk"
                        ],
                        [
                            "王优秀",
                            "mmvaku"
                        ],
                        [
                            "温岚",
                            "zaa"
                        ],
                        [
                            "后弦",
                            "mszs"
                        ],
                        [
                            "爱唱歌的骡子",
                            "mmukxm"
                        ],
                        [
                            "米线",
                            "mquk"
                        ],
                        [
                            "高进",
                            "mqsm"
                        ],
                        [
                            "好听的dj",
                            "admva"
                        ],
                        [
                            "烟许佳豪",
                            "maxzmx"
                        ],
                        [
                            "郑少秋",
                            "ddm"
                        ],
                        [
                            "萧煌奇",
                            "uvx"
                        ],
                        [
                            "王靖雯",
                            "dskmq"
                        ],
                        [
                            "赞美之泉",
                            "skvmq"
                        ],
                        [
                            "hillsongyoung",
                            "aqkzva"
                        ],
                        [
                            "王富贵",
                            "mmszuq"
                        ],
                        [
                            "陈粒",
                            "udksm"
                        ],
                        [
                            "时代少年团",
                            "dakkv"
                        ],
                        [
                            "王馨",
                            "amaxz"
                        ],
                        [
                            "安儿陈",
                            "mxmzsz"
                        ],
                        [
                            "吾恩",
                            "umuxx"
                        ],
                        [
                            "王忻辰",
                            "dskmz"
                        ],
                        [
                            "袁树雄",
                            "qkzv"
                        ],
                        [
                            "周慧敏",
                            "kxm"
                        ],
                        [
                            "任素汐",
                            "zsvms"
                        ],
                        [
                            "约瑟诗歌",
                            "zsqxk"
                        ],
                        [
                            "吕方",
                            "szu"
                        ],
                        [
                            "许冠杰",
                            "uzs"
                        ],
                        [
                            "隔壁老樊",
                            "zqvqa"
                        ],
                        [
                            "一只白羊",
                            "mmqvdv"
                        ],
                        [
                            "MariaArredondo",
                            "zuzu"
                        ],
                        [
                            "车载音乐",
                            "qvqs"
                        ],
                        [
                            "久石让",
                            "duxz"
                        ],
                        [
                            "金志文",
                            "smkd"
                        ],
                        [
                            "小田音乐社",
                            "dzqzm"
                        ],
                        [
                            "黄龄",
                            "mqkx"
                        ],
                        [
                            "安静",
                            "szauq"
                        ],
                        [
                            "甜馨&贾乃亮",
                            "uqvus"
                        ],
                        [
                            "小羊诗歌",
                            "vxzsv"
                        ],
                        [
                            "刘紫玲",
                            "zqzm"
                        ],
                        [
                            "感恩的泪",
                            "vxzsa"
                        ],
                        [
                            "Aimer",
                            "zdduv"
                        ],
                        [
                            "展展与罗罗",
                            "zkzzz"
                        ],
                        [
                            "卓依婷",
                            "ddx"
                        ],
                        [
                            "太一",
                            "zquva"
                        ],
                        [
                            "本兮",
                            "amaxv"
                        ],
                        [
                            "OneRepublic",
                            "qamz"
                        ],
                        [
                            "杨和苏KeyNG",
                            "dxsqk"
                        ],
                        [
                            "曲肖冰",
                            "zmqqk"
                        ],
                        [
                            "伊格赛听",
                            "daqzx"
                        ],
                        [
                            "凤飞飞",
                            "azx"
                        ],
                        [
                            "AvrilLavigne",
                            "amdq"
                        ],
                        [
                            "阿牛",
                            "u"
                        ],
                        [
                            "齐秦",
                            "vad"
                        ],
                        [
                            "慢摇舞曲",
                            "admxx"
                        ],
                        [
                            "初音未来",
                            "axxqk"
                        ],
                        [
                            "刘欢",
                            "qvz"
                        ],
                        [
                            "鱼仙儿",
                            "mmdvuz"
                        ],
                        [
                            "郭富城",
                            "ams"
                        ],
                        [
                            "谢安琪",
                            "mmus"
                        ],
                        [
                            "老狼",
                            "qma"
                        ],
                        [
                            "张远",
                            "samu"
                        ],
                        [
                            "双笙陈元汐",
                            "mxduua"
                        ],
                        [
                            "Bandari",
                            "axqz"
                        ],
                        [
                            "魏如萱",
                            "svqa"
                        ],
                        [
                            "萧敬腾",
                            "zssa"
                        ],
                        [
                            "王朝1982",
                            "mmvvqm"
                        ],
                        [
                            "孙子涵",
                            "mkuzz"
                        ],
                        [
                            "郭德纲",
                            "svuas"
                        ],
                        [
                            "DanielPowter",
                            "vvas"
                        ],
                        [
                            "JS",
                            "aqqm"
                        ],
                        [
                            "雨中百合",
                            "zsaqu"
                        ],
                        [
                            "白虹",
                            "kumms"
                        ],
                        [
                            "老二道半吨兄弟",
                            "maxkzu"
                        ],
                        [
                            "Rag’n’BoneMan",
                            "mmszqv"
                        ],
                        [
                            "慕容晓晓",
                            "axssd"
                        ],
                        [
                            "斯琴高丽",
                            "smkz"
                        ],
                        [
                            "Avicii",
                            "uuqkv"
                        ],
                        [
                            "摩登兄弟刘宇宁",
                            "zksvk"
                        ],
                        [
                            "麦振鸿",
                            "sxkza"
                        ],
                        [
                            "彭佳慧手机铃声",
                            "usxqm"
                        ],
                        [
                            "饶雪漫",
                            "szsks"
                        ],
                        [
                            "蔡国权",
                            "ax"
                        ],
                        [
                            "易烊千玺",
                            "uxkmd"
                        ],
                        [
                            "姜玉阳",
                            "mkdm"
                        ],
                        [
                            "欧得洋",
                            "vxs"
                        ],
                        [
                            "祖海",
                            "mmxx"
                        ],
                        [
                            "影视歌曲合集",
                            "auqxz"
                        ],
                        [
                            "LanaDelRey",
                            "vxsam"
                        ],
                        [
                            "TWICE",
                            "zdszk"
                        ],
                        [
                            "IN-K",
                            "dskmu"
                        ],
                        [
                            "马頔",
                            "vzvzz"
                        ],
                        [
                            "黄韵玲",
                            "mkx"
                        ],
                        [
                            "井胧",
                            "daada"
                        ],
                        [
                            "周林枫",
                            "mmzkmv"
                        ],
                        [
                            "余超颖",
                            "vavkm"
                        ],
                        [
                            "雨生",
                            "maqmuk"
                        ],
                        [
                            "树屋女孩",
                            "zaqka"
                        ],
                        [
                            "张镐哲",
                            "zzx"
                        ],
                        [
                            "叶启田",
                            "uqm"
                        ],
                        [
                            "特效音效手机铃声",
                            "usxud"
                        ],
                        [
                            "小洲",
                            "dxxua"
                        ],
                        [
                            "沙一汀EL",
                            "dmsua"
                        ],
                        [
                            "宋祖英",
                            "qdu"
                        ],
                        [
                            "唐古",
                            "vmvvz"
                        ],
                        [
                            "TheWeeknd",
                            "uqaqq"
                        ],
                        [
                            "叶炫清",
                            "zsqzz"
                        ],
                        [
                            "范倪Liu",
                            "dvvuu"
                        ],
                        [
                            "王筝",
                            "qqu"
                        ],
                        [
                            "胡伟立",
                            "dskkq"
                        ],
                        [
                            "小潘潘",
                            "zduka"
                        ],
                        [
                            "萨顶顶",
                            "svsq"
                        ],
                        [
                            "hanser",
                            "zuquv"
                        ],
                        [
                            "贝乐虎",
                            "dvumz"
                        ],
                        [
                            "徐小凤",
                            "zzk"
                        ],
                        [
                            "千百惠",
                            "mkqu"
                        ],
                        [
                            "马思唯",
                            "zdxqx"
                        ],
                        [
                            "指尖笑",
                            "maxdad"
                        ],
                        [
                            "好听的纯音乐",
                            "azssk"
                        ],
                        [
                            "万芳",
                            "ukm"
                        ],
                        [
                            "中国娃娃",
                            "azdx"
                        ],
                        [
                            "阿肆",
                            "vusvd"
                        ],
                        [
                            "游鸿明",
                            "zad"
                        ],
                        [
                            "JohnnyCash",
                            "vssm"
                        ],
                        [
                            "蒋大为",
                            "aamqa"
                        ],
                        [
                            "蜡笔小心",
                            "daqus"
                        ],
                        [
                            "Era",
                            "duzz"
                        ],
                        [
                            "华人的敬拜赞美",
                            "vvdua"
                        ],
                        [
                            "李宇春",
                            "msvd"
                        ],
                        [
                            "奚秀兰圣歌",
                            "vvdux"
                        ],
                        [
                            "孟颖",
                            "dauax"
                        ],
                        [
                            "刘文正",
                            "mzu"
                        ],
                        [
                            "不才",
                            "vzdxk"
                        ],
                        [
                            "LittleMix",
                            "vzvsa"
                        ],
                        [
                            "蒋雪儿",
                            "qmxm"
                        ],
                        [
                            "林依晨",
                            "suux"
                        ],
                        [
                            "冯曦妤",
                            "zvsq"
                        ],
                        [
                            "VariousArtists",
                            "svmu"
                        ],
                        [
                            "深海鱼子酱",
                            "dvsqs"
                        ],
                        [
                            "梁博",
                            "vavqs"
                        ],
                        [
                            "HITA",
                            "szasv"
                        ],
                        [
                            "杨青",
                            "zssx"
                        ],
                        [
                            "L（桃籽）",
                            "mmdzmz"
                        ],
                        [
                            "陈洁丽",
                            "kka"
                        ],
                        [
                            "洛先生",
                            "maxzuq"
                        ],
                        [
                            "BackstreetBoys",
                            "msud"
                        ],
                        [
                            "",
                            "javascript:;"
                        ],
                        [
                            "刘晓超",
                            "mmskma"
                        ],
                        [
                            "杨钰莹",
                            "axam"
                        ],
                        [
                            "TheChainsmokers",
                            "uqmzm"
                        ],
                        [
                            "谢军",
                            "mmxm"
                        ],
                        [
                            "要不要买菜",
                            "daauz"
                        ],
                        [
                            "关淑怡",
                            "akq"
                        ],
                        [
                            "HansZimmer",
                            "vsuu"
                        ],
                        [
                            "国风新语",
                            "aqkskx"
                        ],
                        [
                            "Uu",
                            "dxavu"
                        ],
                        [
                            "贝瓦儿歌",
                            "vmdxs"
                        ],
                        [
                            "福禄寿FloruitShow",
                            "dmzqm"
                        ],
                        [
                            "黄莺莺",
                            "mdd"
                        ],
                        [
                            "文夫",
                            "dvakz"
                        ],
                        [
                            "小蓝背心",
                            "maxmuu"
                        ],
                        [
                            "陈雅森",
                            "zsud"
                        ],
                        [
                            "音效",
                            "uuzza"
                        ],
                        [
                            "皮卡丘多多",
                            "dakdm"
                        ],
                        [
                            "陈柯宇",
                            "zuuzs"
                        ],
                        [
                            "徐梦圆",
                            "zqvzx"
                        ],
                        [
                            "张叶蕾",
                            "zmzvs"
                        ]
                    ];
                    popupWindows(playlistname, aipurl+'?act=geshou_music&lang=&page=1&id=', 6, "playlist", "热门歌手") 
                }
                else {
                    Lampa.Activity.push({
                        url: a.url,
                        title: '听歌 - ' + a.title,
                        // code: a.code,
                        component: 'ZZMUSIC',
                        type: a.type,
                        // connectype: a.connectype,
                        page: 1
                    });
                }
            },
            onBack: function onBack() {
                Lampa.Controller.toggle('menu');
            }
        });
    }

    function startZZMUSIC() {
        window.radio = true;
      
        Lampa.Template.add('radio_item', "<div class=\"selector radio-item\">\n        <div class=\"radio-item__imgbox\">\n            <img class=\"radio-item__img\" />\n        </div>\n\n        <div class=\"radio-item__name\">{name}</div>\n    </div>");
        Lampa.Template.add('radio_player', "<div class=\"selector radio-player stop hide\">\n        <div class=\"radio-player__name\">Music Player</div>\n\n        <div class=\"radio-player__button\">\n            <i></i>\n            <i></i>\n            <i></i>\n            <i></i>\n        </div>\n    </div>");
        Lampa.Template.add('radio_style', "<style>\n    .radio-item {\n        width: 8em;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-item__imgbox {\n        background-color: #3E3E3E;\n        padding-bottom: 83%;\n        position: relative;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n      }\n      .radio-item__img {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n      .radio-item__name {\n        font-size: 1.1em;\n        margin-top: 0.8em;\n      }\n      .radio-item.focus .radio-item__imgbox:after {\n        border: solid 0.4em #fff;\n        content: \"\";\n        display: block;\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n      }\n      .radio-item + .radio-item {\n        margin-left: 1em;\n      }\n      \n      @-webkit-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @-moz-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @-o-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      @-webkit-keyframes sound-loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n                  transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n                  transform: rotate(360deg);\n        }\n      }\n      @-moz-keyframes sound-loading {\n        0% {\n          -moz-transform: rotate(0deg);\n               transform: rotate(0deg);\n        }\n        100% {\n          -moz-transform: rotate(360deg);\n               transform: rotate(360deg);\n        }\n      }\n      @-o-keyframes sound-loading {\n        0% {\n          -o-transform: rotate(0deg);\n             transform: rotate(0deg);\n        }\n        100% {\n          -o-transform: rotate(360deg);\n             transform: rotate(360deg);\n        }\n      }\n      @keyframes sound-loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n             -moz-transform: rotate(0deg);\n               -o-transform: rotate(0deg);\n                  transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n             -moz-transform: rotate(360deg);\n               -o-transform: rotate(360deg);\n                  transform: rotate(360deg);\n        }\n      }\n      .radio-player {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n           -moz-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n        padding: 0.2em 0.8em;\n        background-color: rgb(255 255 255 / 0%);\n      }\n      .radio-player__name {\n        margin-right: 1em;\n        white-space: nowrap;\n        overflow: hidden;\n        -o-text-overflow: ellipsis;\n           text-overflow: ellipsis;\n        max-width: 8em;\n      }\n      @media screen and (max-width: 385px) {\n        .radio-player__name {\n          display: none;\n        }\n      }\n      .radio-player__button {\n        position: relative;\n        width: 1.5em;\n        height: 1.5em;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n           -moz-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n           -moz-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player__button i {\n        display: block;\n        width: 0.2em;\n        background-color: #fff;\n        margin: 0 0.1em;\n        -webkit-animation: sound 0ms -800ms linear infinite alternate;\n           -moz-animation: sound 0ms -800ms linear infinite alternate;\n             -o-animation: sound 0ms -800ms linear infinite alternate;\n                animation: sound 0ms -800ms linear infinite alternate;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player__button i:nth-child(1) {\n        -webkit-animation-duration: 474ms;\n           -moz-animation-duration: 474ms;\n             -o-animation-duration: 474ms;\n                animation-duration: 474ms;\n      }\n      .radio-player__button i:nth-child(2) {\n        -webkit-animation-duration: 433ms;\n           -moz-animation-duration: 433ms;\n             -o-animation-duration: 433ms;\n                animation-duration: 433ms;\n      }\n      .radio-player__button i:nth-child(3) {\n        -webkit-animation-duration: 407ms;\n           -moz-animation-duration: 407ms;\n             -o-animation-duration: 407ms;\n                animation-duration: 407ms;\n      }\n      .radio-player__button i:nth-child(4) {\n        -webkit-animation-duration: 458ms;\n           -moz-animation-duration: 458ms;\n             -o-animation-duration: 458ms;\n                animation-duration: 458ms;\n      }\n      .radio-player.stop .radio-player__button {\n        -webkit-border-radius: 100%;\n           -moz-border-radius: 100%;\n                border-radius: 100%;\n        border: 0.2em solid #fff;\n      }\n      .radio-player.stop .radio-player__button i {\n        display: none;\n      }\n      .radio-player.stop .radio-player__button:after {\n        content: \"\";\n        width: 0.5em;\n        height: 0.5em;\n        background-color: #fff;\n      }\n      .radio-player.loading .radio-player__button:before {\n        content: \"\";\n        display: block;\n        border-top: 0.2em solid #fff;\n        border-left: 0.2em solid transparent;\n        border-right: 0.2em solid transparent;\n        border-bottom: 0.2em solid transparent;\n        -webkit-animation: sound-loading 1s linear infinite;\n           -moz-animation: sound-loading 1s linear infinite;\n             -o-animation: sound-loading 1s linear infinite;\n                animation: sound-loading 1s linear infinite;\n        width: 0.9em;\n        height: 0.9em;\n        -webkit-border-radius: 100%;\n           -moz-border-radius: 100%;\n                border-radius: 100%;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player.loading .radio-player__button i {\n        display: none;\n      }\n      .radio-player.focus {\n        background-color: #fff;\n        color: #000;\n      }\n      .radio-player.focus .radio-player__button {\n        border-color: #000;\n      }\n      .radio-player.focus .radio-player__button i, .radio-player.focus .radio-player__button:after {\n        background-color: #000;\n      }\n      .radio-player.focus .radio-player__button:before {\n        border-top-color: #000;\n      }\n    </style>");
        
        window.plugin_ZZMUSIC_ready = true;
        Lampa.Component.add('ZZMUSIC', ZZMUSIC);
        
        function addSettingsZZMUSIC() {
            window.radio_player1_ = new player();
            var ico = '<svg width="32px" height="32px" viewBox="0 0 0.72 0.72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.18 0.36c0 -0.067 0.036 -0.125 0.09 -0.156m0.27 0.15c0 0.067 -0.036 0.125 -0.09 0.156m0.18 -0.15a0.27 0.27 0 1 1 -0.54 0 0.27 0.27 0 0 1 0.54 0Zm-0.21 0a0.06 0.06 0 1 1 -0.12 0 0.06 0.06 0 0 1 0.12 0Z" stroke="currentColor" stroke-width="0.06" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="ZZMUSIC"><div class="menu__ico">' + ico + '</div><div class="menu__text">听歌</div></li>');
            menu_item.on('hover:enter', function () {
                listmenu();
            });
            $('.menu .menu__list').eq(0).append(menu_item);
            //$('.menu .menu__list .menu__item.selector').eq(1).after(menu_item);
            window.radio_player1_.create();
        }
    
        if (window.appready) addSettingsZZMUSIC()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsZZMUSIC()
            })
        }
    }

    if (!window.plugin_ZZMUSIC_ready) startZZMUSIC();
    musiclist_ = null;
    currentplaylist_ = null;
})();
