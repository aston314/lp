(function () {
    'use strict';
    var lrcObj = {};
    var musiclist_ = [];
    var currentplaylist_ = [];
    var currentIndex = 0;
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
            if (!!window.cordova) {
                network.silent(object.url, this.build.bind(this), function () {
                    var empty = new Lampa.Empty();
                    html.append(empty.render());
                    _this.start = empty.start;

                    _this.activity.loader(false);

                    _this.activity.toggle();
                }, this.getUrlParamsAndBuildQueryString(object.url), {
                    dataType: 'json',
                    headers: {
                        'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                    }
                });
            } else {
                network["native"](object.url, this.build.bind(this), function () {
                    var empty = new Lampa.Empty();
                    html.append(empty.render());
                    _this.start = empty.start;

                    _this.activity.loader(false);

                    _this.activity.toggle();
                }, this.getUrlParamsAndBuildQueryString(object.url), {
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
            if (!!window.cordova) {
                network.silent(object.url, function (result) {
                    _this2.donext(result);
                    Lampa.Controller.enable('content');
                }, this.getUrlParamsAndBuildQueryString(object.url).replace(/(page=)\d+/g, `$1${object.page}`), {
                    dataType: 'json',
                    headers: {
                        'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                    }
                });
            } else {
                network["native"](object.url, function (result) {
                    _this2.donext(result);
                    Lampa.Controller.enable('content');
                }, this.getUrlParamsAndBuildQueryString(object.url).replace(/(page=)\d+/g, `$1${object.page}`), {
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
                // if (object.type == 'list' || object.type == 'album' || object.type == 'playlist_detail') {
                    musiclist_.push([element.mname, element.id, element.fee , element.sname, element.copyright])
                // }
                
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
                
                card.find('.card__img').attr('src', element.pic);
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
                    // if (object.type == 'list') {
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
                        url: 'https://zz123.com/ajax/?act=search&key='+element.sname+'&lang=&page=1',
                        connectype: 'native'
                    });
                    Lampa.Select.show({
                        title: '操作',
                        items: archiveMenu,
                        onSelect: function (sel) {
                            Lampa.Activity.push({
                                url: sel.url,
                                title: '听歌 - ' + sel.title,
                                component: 'ZZMUSIC',
                                connectype: sel.connectype, 
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
                    currentplaylist_ = null;
                    var songurl = 'https://zz123.com/ajax/?act=songinfo&lang=&id=' + element.id
                    console.log(element.id)
                    network["native"](songurl, function (result) {
                        if (result.status == 200) {
                            lrcObj = {}
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
                                        lrcObj[time] = clause;
                                    }
                                }
                            }
                            var data = {
                                url: 'https://zz123.com/ajax'+result.data.mp3,
                                title: result.data.mname,
                                playall: false
                            }
                            player.play(data);
                            card.find('.card__view').append('<div class="card__quality"></div>');
                            card.find('.card__quality').text('听');
                            // console.log(lrcObj)
                        }
                    }, 'act=songinfo&lang=&id=' + element.id, {
                        dataType: 'json',
                        headers: {
                            'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                        }

                    });
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
                    title: '听歌 - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        // console.log(new_value)
                        var search_tempalte = 'https://zz123.com/ajax/?act=search&key=#msearchword&lang=&page=1';
                        var searchurl = search_tempalte.replace('#msearchword', encodeURIComponent(new_value));
                        Lampa.Activity.push({
                            url: searchurl,
                            title: '听歌 - 搜索"' + new_value + '"',
                            waitload: false,
                            component: 'ZZMUSIC',
                            type: listype,
                            connectype: 'native',
                            code: '',
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
                // let result = [];

                // $('.aside-menu-list.channel a.menu-link').each(function () {
                //     let value = $(this).text().replace(/\n/g, ',').replace(/\s/g, '').replace(/,,/g, '');  // 取出元素的值
                //     let value1 = $(this).attr('href').replace(/\.htm/g, '');  // 取出元素的值

                //     let subArray = [value, value1];  // 创建包含两个值的子数组
                //     result.push(subArray);  // 将子数组添加到结果数组中
                // });

                // console.log(result);
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
              if ((Object.keys(lrcObj).length) == 0){
                $(".info__title-original").text('');
              };
              audio.addEventListener("timeupdate", function () {

                  var currentTime = audio.currentTime;

                  let obj = lrcObj[Math.floor(currentTime)];
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
            currentIndex = (currentIndex + 1) % currentplaylist_.length;
            network["native"]('https://zz123.com/ajax/', function (result) {
                if (result.status == 200) {
                    lrcObj = {}
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
                                lrcObj[time] = clause;
                            }
                        }
                    }
                    var data = {
                        url: 'https://zz123.com/ajax' + result.data.mp3,
                        title: currentplaylist_[currentIndex][0],
                        playall: true
                    }
                    player.play(data);
                }
            }, 'act=songinfo&lang=&id=' + currentplaylist_[currentIndex][1], {
                dataType: 'json',
                headers: {
                    'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                }

            });
        }
    }

    function playEndedHandler_(pos){
        if (currentplaylist_.length > 0) {
            var network = new Lampa.Reguest();
            var player = window.radio_player1_;
            currentIndex = pos;
            currentIndex = (currentIndex + 1) % currentplaylist_.length;
            network["native"]('https://zz123.com/ajax/', function (result) {
                if (result.status == 200) {
                    lrcObj = {}
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
                                lrcObj[time] = clause;
                            }
                        }
                    }
                    var data = {
                        url: 'https://zz123.com/ajax' + result.data.mp3,
                        title: currentplaylist_[currentIndex][0],
                        playall: true
                    }
                    player.play(data);
                }
            }, 'act=songinfo&lang=&id=' + currentplaylist_[currentIndex][1], {
                dataType: 'json',
                headers: {
                    'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                }
            });
        }
    }

    function playAll(){
        currentplaylist_ = musiclist_;
        if (currentplaylist_.length > 0) {
            var network = new Lampa.Reguest();
            var player = window.radio_player1_;
            currentIndex = 0;
            // console.log('播放完毕，准备下一首歌。')

            network["native"]('https://zz123.com/ajax/', function (result) {
                if (result.status == 200) {
                    lrcObj = {}
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
                                lrcObj[time] = clause;
                            }
                        }
                    }
                    var data = {
                        url: 'https://zz123.com/ajax' + result.data.mp3,
                        title: currentplaylist_[currentIndex][0],
                        playall: true
                    }
                    player.play(data);
                }
            }, 'act=songinfo&lang=&id=' + currentplaylist_[currentIndex][1], {
                dataType: 'json',
                headers: {
                    'Referer': 'https://zz123.com/ajax/',
                }

            });
        } else {
            Lampa.Noty.show('没有可以播放的歌曲。');
        }
    }

    function popupWindows(playlistname, gourl, num, gotype, titlename) {
        var sources = [];
        var songling = playlistname;
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
                    url: tab.url+'?act=tag_music&type=tuijian&lang=&page=1&tid='+tab.cat,
                    title: '听歌 - '+ titlename +' - ' + tab.title,
                    code: '',
                    component: 'ZZMUSIC',
                    type: gotype,
                    connectype: '',
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
            title: '歌单分类',
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
        Lampa.Select.show({
            title: '分类',
            items: catalogs,
            onSelect: function onSelect(a) {
                if (a.title == '歌单') {
                    var playlistname =[
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
                    ]
                    popupWindows(playlistname, "https://zz123.com/ajax/", 5, "playlist", "分类") 
                } else if (a.title == '榜单'){
                    var playlistname1 =[
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
                    ]
                    popupWindows(playlistname1, "https://zz123.com/ajax/", 5, "playlist", "榜单") 
                } else {
                    Lampa.Activity.push({
                        url: a.url,
                        title: '听歌 - ' + a.title,
                        code: a.code,
                        component: 'ZZMUSIC',
                        type: a.type,
                        connectype: a.connectype,
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
        
        window.plugin_music_ready = true;
        Lampa.Component.add('ZZMUSIC', ZZMUSIC);
        
        function addSettingsZZMUSIC() {
            window.radio_player1_ = new player();
            var ico = '<svg width="24" height="24" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg"><path d="M.649.068A.03.03 0 0 0 .625.061l-.39.06A.03.03 0 0 0 .21.15v.31A.104.104 0 0 0 .165.45.105.105 0 1 0 .27.555V.326L.6.274V.4A.104.104 0 0 0 .555.39.105.105 0 1 0 .66.495V.09A.03.03 0 0 0 .649.068ZM.165.6A.045.045 0 1 1 .21.555.045.045 0 0 1 .165.6Zm.39-.06A.045.045 0 1 1 .6.495.045.045 0 0 1 .555.54ZM.6.214l-.33.05v-.09L.6.126Z" fill="white"/></svg>';
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
