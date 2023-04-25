(function () {
    'use strict';

    function component(object) {
      //console.log(object)
      var network = new Lampa.Reguest();
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      var rslt = [];
      var files = new Lampa.Files(object);
      var filter = new Lampa.Filter(object);
      var results = [];
      var filtred = [];
      var extract = {};
      
      var last;
      var last_filter;
      var contextmenu_all = [];
    //   var filter_items = {
    //     season: [],
    //     voice: [],
    //     voice_info: []
    //   };
    //   var filter_translate = {
    //     season: '季',
    //     voice: '翻译'
    //   };
      scroll.minus();
      scroll.body().addClass('torrent-list');
      

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
      
        //console.log(object);
        parse(object.movie.url);

          function parse(url) {
              //取得具体页面的详情地址
              network["native"](url, function (str) {
                  var str = str.replace(/\n|\r/g, '')
                  var h =  $(object.detail.videoscontainer.selector, str);
                  var t = object.detail.title.selector;
                  var l = object.detail.link.selector;

                  $(h).each(function (i, html) {
                    var t1 = t ? $(this).find(t) : $(this);
                    var l1 = l ? $(this).find(l) : $(this);
                    var r = (object.detail.title.attrName == 'text' || object.detail.title.attrName == '') ? t1.text() :  t1.attr(object.detail.title.attrName);
                    r = object.detail.title.filter !== '' ? (r.match(new RegExp(object.detail.title.filter)) ? r.match(new RegExp(object.detail.title.filter))[1] : r) : r;
                    
                    var host = object.url.indexOf('http') == -1 ? '' : object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0];
                    var f = (object.detail.link.attrName == 'text' || object.detail.link.attrName == '') ? l1.text() :  l1.attr(object.detail.link.attrName);
                    f = object.detail.link.filter !== '' ? (f.match(new RegExp(object.detail.link.filter)) ? f.match(new RegExp(object.detail.link.filter))[1] : f) : f;
                    //var f = l1.attr('href');
                    //console.log(f.substr(0,1) =='/')
                    f = f.substr(0,1) =='/' ? host+f : f;
                    filtred.push({
                        file: f,
                        quality: r,
                        title: object.movie.title,
                        season: '',
                        episode: '',
                        info: '',
                        sitename: object.title.split(' - ')[0]
                    });
                      
                }); 
                //_this.filtred();
                  //console.log(filtred)
                  // append(_this.filtred());
                  //_this.build();
                  _this.showResults();
                  _this.activity.loader(false);

                  _this.activity.toggle();
                  filtred = [];
                  //element.remove();
              }, function (a, c) {
                  _this.empty('哦，' + network.errorDecode(a, c) + ' ');
                  //component.emptyForQuery(select_title);
              }, false, {
                  dataType: 'text'
              });

          };

          filter.onSearch = function (value) {
              Lampa.Activity.replace({
                  search: value,
                  clarification: true
              });
          };

          filter.onBack = function () {
              _this.start();
          };

          filter.render().find('.selector').on('hover:focus', function (e) {
              last_filter = e.target;
          });
          filter.render().find('.filter--sort').remove();
          return this.render();
      };

      this.empty = function (descr) {
        var empty = new Lampa.Empty({
          descr: descr
        });
        files.append(empty.render(filter.empty()));
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

    //   this.buildFilterd = function (select_season) {
    //     var select = [];

    //     var add = function add(type, title) {
    //       var need = Lampa.Storage.get('online_filter', '{}');
    //       var items = filter_items[type];
    //       var subitems = [];
    //       var value = need[type];
    //       items.forEach(function (name, i) {
    //         subitems.push({
    //           title: name,
    //           selected: value == i,
    //           index: i
    //         });
    //       });
    //       select.push({
    //         title: title,
    //         subtitle: items[value],
    //         items: subitems,
    //         stype: type
    //       });
    //     };

    //     filter_items.voice = [];
    //     filter_items.season = [];
    //     filter_items.voice_info = [];
    //     var choice = {
    //       season: 0,
    //       voice: 0
    //     };
    //     results.slice(0, 1).forEach(function (movie) {
    //         movie.translations.forEach(function (element) {
    //           filter_items.voice.push(element.smart_title);
    //           filter_items.voice_info.push({
    //             id: element.id
    //           });
    //         });
    //     });
    //     Lampa.Storage.set('online_filter', object.movie.number_of_seasons ? choice : {});
    //     select.push({
    //       title: '重置过滤器',
    //       reset: true
    //     });

    //     if (object.movie.number_of_seasons) {
    //       add('voice', '翻译');
    //       add('season', '季');
    //     }

    //     filter.set('filter', select);
    //     this.selectedFilter();
    //   };

    //   this.selectedFilter = function () {
    //     var need = Lampa.Storage.get('online_filter', '{}'),
    //         select = [];

    //     for (var i in need) {
    //       select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
    //     }

    //     filter.chosen('filter', select);
    //   };

      this.extractFile = function (str) {
        var url = '';

        try {
          var items = str.split(',').map(function (item) {
            return {
              quality: parseInt(item.match(/\[(\d+)p\]/)[1]),
              file: item.replace(/\[\d+p\]/, '').split(' or ')[0]
            };
          });
          items.sort(function (a, b) {
            return b.quality - a.quality;
          });
          url = items[0].file;
          url = 'http:' + url.slice(0, url.length - 32) + '.mp4';
        } catch (e) {}

        return url;
        console.log(url);
        console.log("播放链接");
      };

      this.extractData = function () {
        var _this2 = this;

        network.timeout(5000);
        var movie = results.slice(0, 1)[0];
        console.log(movie);
        console.log("解析链接");
        extract = {};

        if (movie) {
          network["native"]('http:' + movie.iframe_src, function (raw) {
            console.log(movie.iframe_src)
            var math = raw.replace(/\n/g, '').match(/id="files" value="(.*?)"/);

            if (math) {
              var json = Lampa.Arrays.decodeJson(math[1].replace(/&quot;/g, '"'), {});
              var text = document.createElement("textarea");
              console.log(json);
              for (var i in json) {
                text.innerHTML = json[i];
                Lampa.Arrays.decodeJson(text.value, {});
                extract[i] = {
                  json: Lampa.Arrays.decodeJson(text.value, {}),
                  file: _this2.extractFile(json[i])
                };

                for (var a in extract[i].json) {
                  var elem = extract[i].json[a];

                  if (elem.folder) {
                    for (var f in elem.folder) {
                      var folder = elem.folder[f];
                      folder.file = _this2.extractFile(folder.file);
                    }
                  } else elem.file = _this2.extractFile(elem.file);
                }
              }
            }
            console.log(extract);
            console.log("解析结果");
          }, false, false, {
            dataType: 'text'
          });
        }
      };
      //console.log(extract);

      this.getRemote = function (remote_url) {
         return $.ajax({
            type: "GET",
            url: remote_url,
            async: false
         }).responseText;
      };

    //   this.build = function () {
    //     var _this3 = this;

    //     //this.buildFilterd();
    //     this.filtred();
    //     //this.extractData();

    //     filter.onSelect = function (type, a, b) {
    //       if (type == 'filter') {
    //         if (a.reset) {
    //           _this3.buildFilterd();
    //         } else {
    //           if (a.stype == 'season') {
    //             _this3.buildFilterd(b.index);
    //           } else {
    //             var filter_data = Lampa.Storage.get('online_filter', '{}');
    //             filter_data[a.stype] = b.index;
    //             a.subtitle = b.title;
    //             Lampa.Storage.set('online_filter', filter_data);
    //           }
    //         }
    //       }

    //       _this3.applyFilter();

    //       _this3.start();
    //     };

    //     this.showResults();
    //   };

      this.filtred = function () {
        //console.log(filtred[0])
        //filtred = filtred;
        //return filtred;
        // console.log(a)
        // filtred = [];
        // filtred = a;
        // console.log(filtred)
        // var filter_data = Lampa.Storage.get('online_filter', '{}');
        //   results.slice(0, 1).forEach(function (movie) {
        //     movie.media.forEach(function (element) {
        //       filtred.push({
        //         title: element.title,
        //         quality: element.max_quality ,
        //         translation: element.translation_id,
        //         sitename: doreg.name
        //       });
        //     });
        //   });
        // //}
      };

    //   this.applyFilter = function () {
    //     this.filtred();
    //     this.selectedFilter();
    //     this.reset();
    //     this.showResults();
    //     last = scroll.render().find('.torrent-item:eq(0)')[0];
    //   };

      this.showResults = function (data) {
        filter.render().addClass('torrent-filter');
        scroll.append(filter.render());
        this.append(filtred);
        files.append(scroll.render());
        //console.log($(".scroll").find(".scroll__content"))
        $(".scroll").find(".torrent-filter").remove();
        //scroll.body().addClass('torrent-list');
        //   $(".scroll").find(".torrent-filter").css({
        //       'margin-bottom': '2em',
        //   });
      };

      this.reset = function () {
        last = false;
        filter.render().detach();
        scroll.clear();
      };

      this.getFile = function (element, show_error) {

        var translat = element.file;
        //var link;
        if (translat) {
            return element.file;

        }

        if (show_error) Lampa.Noty.show('无法检索链接');
      };


      this.append = function (items) {
        var _this4 = this;
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
            var hash = Lampa.Utils.hash(element.file ? [element.file, element.quality].join('') : object.movie.title);
            var view = Lampa.Timeline.view(hash);
            var item = Lampa.Template.get('detail_mod', element);
            var hash_file = Lampa.Utils.hash(element.file ? [element.file, element.quality].join('') : object.movie.title + 'libio');
            element.timeline = view;
            
            item.append(Lampa.Timeline.render(view));

            if (Lampa.Timeline.details) {
                item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
            }

            if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
        
          //item.append(Lampa.Timeline.render(view));
          item.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          }).on('hover:enter', function () {
            if(object.movie.id) Lampa.Favorite.add('history', object.movie, 100)

            //var file = _this4.getFile(element, true);
            var file = element.file;
                     
              //!new RegExp("^(http|https)://", "i").test(file)
              // if (file.indexOf('://') === -1) {
              if (/^https?:\/\//i.test(file) === false) {
                  if (file.indexOf('magnet:?') !== -1) {
                      if (window.intentShim) {
                        var intentExtra = {
                          title: element.title,
                          poster: object.movie.img,
                          action: "play",
                          data: {
                            lampa: true
                          }
                        };
                        window.plugins.intentShim.startActivity(
                          {
                            action: window.plugins.intentShim.ACTION_VIEW,
                            url: file,
                            extras: intentExtra
                          },
                          function () { },
                          function () { console.log('Failed to open magnet URL via Android Intent') }

                        );
                      } else {
                          //Lampa.Noty.show('只能在安卓平台上打开磁力链接。');
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
                        SERVER.object.MagnetUri = file;
                        SERVER.movie.title = element.title;
                        SERVER.object.poster = object.movie.img;
                        Lampa.Android.openTorrent(SERVER);
                      }
                  } else {
                    if (window.intentShim) {
                        window.plugins.intentShim.startActivity(
                            {
                                action: window.plugins.intentShim.ACTION_VIEW,
                                url: file
                            },
                            function () { },
                            function () { console.log('Failed to open URL via Android Intent') }

                        );
                    } else {
                        //Lampa.Noty.show('只能在安卓平台上打开该链接。');
                        $('<a href="' + file + '"/>')[0].click();
                    }
                  };    
              }
              else {
                // console.log(object)
                // console.log(file.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/))
                  if (/\.(m3u8|mp4|mp3)$/.test(file)) {
                      var video = {
                          title: element.title,
                          url: file,
                          timeline: view
                      };
                      Lampa.Player.play(video);
                      Lampa.Player.playlist([video]);
                  } else if (/\.(jpe?g|png|gif|bmp|apk)$/.test(file)) {
                      if (window.intentShim) {
                          window.plugins.intentShim.startActivity(
                              {
                                  action: window.plugins.intentShim.ACTION_VIEW,
                                  url: file
                              },
                              function () { },
                              function () { console.log('Failed to open URL via Android Intent') }

                          );
                      } else {
                          //Lampa.Noty.show('只能在安卓平台上打开该链接。');
                          $('<a href="' + file + '"/>')[0].click();
                      }
                  } else if (file.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
                    element.img = object.movie.img;
                    element.original_title = '';
                    Lampa.Activity.push({
                        url: file,
                        title: '阿里云盘播放',
                        component: 'yunpan2',
                        movie: element,
                        page: 1
                      });
                  }
                  else {
                    //jrkan
                    var iszhubo = false;
                    
                    if (file.indexOf('/play/sm.html') !== -1) {
                      file = 'https://play.sportsteam365.com/play/' + file.match(/\?id=(.+?)&/)[1] + '.html';
                      iszhubo = true;
                    }

                      network.silent(file, function (result) {
                        var v,videolink;
                        //jrkan
                        if (result.indexOf('player/pap.html') !==-1 || iszhubo){
                          v = result.replace(/\n|\r/g, '').replace(/\\/g,'').match(/\?id=(.+?)('|")/);
                          videolink = v ? v[1] : '';
                        }else{
                          v = result.replace(/\n|\r/g, '').replace(/\\/g,'').match(/https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|](.mp4|.m3u8)/);
                          videolink = v ? v[0] : '';
                        }
                          
                          if (videolink) {
                              //Lampa.Modal.close();
                              var video = {
                                  title: element.title,
                                  url: videolink,
                                  timeline: view
                              };
                              Lampa.Player.play(video);
                              Lampa.Player.playlist([video]);
                          } else {
                              //Lampa.Modal.close();
                              //Lampa.Noty.show('没有找到对应影片。');
                              Lampa.Iframe.show({
                                //url: $('.embed-responsive-item', str).attr('src'),
                                url: file,
                                onBack: function onBack() {
                                  Lampa.Controller.toggle('content');
                                }
                              });
                              $('.iframe__body iframe').removeClass('iframe__window');
                              $('.iframe__body iframe').addClass('screensaver-chrome__iframe');
                              //Lampa.Controller.toggle('content');
                          };
                      }, function (a, c) {
                          Lampa.Noty.show(network.errorDecode(a, c));
                      }, false, {
                          dataType: 'text'
                      });
                      //Lampa.Noty.show('无法检索链接');
                  }


                  // Lampa.Iframe.show({
                  //   //url: $('.embed-responsive-item', str).attr('src'),
                  //   url: file,
                  //   onBack: function onBack() {
                  //     Lampa.Controller.toggle('content');
                  //   }
                  // });
                  // $('.iframe__body iframe').removeClass('iframe__window');
                  // $('.iframe__body iframe').addClass('screensaver-chrome__iframe');
              }
              //jrkan && file.indexOf('https://play.sportsteam365.com') == -1
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
          });
          scroll.append(item);
          _this4.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            element: element,
            file: function file(call) {
              call({
                file: _this4.getFile(element, true),
              });
            }
          });
        });
      };

      this.back = function () {
        Lampa.Activity.backward();
      };

      this.contextmenu = function (params) {
        contextmenu_all.push(params);
        params.item.on('hover:long', function () {
          function copylink(extra) {
            if (extra.quality) {
              var qual = [];
  
              for (var i in extra.quality) {
                qual.push({
                  title: i,
                  file: extra.quality[i]
                });
              }
  
              Lampa.Select.show({
                title: 'Ссылки',
                items: qual,
                onBack: function onBack() {
                  Lampa.Controller.toggle(enabled);
                },
                onSelect: function onSelect(b) {
                  Lampa.Utils.copyTextToClipboard(b.file, function () {
                    Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
                  }, function () {
                    Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
                  });
                }
              });
            } else {
              Lampa.Utils.copyTextToClipboard(extra.file, function () {
                Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
              }, function () {
                Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
              });
            }
          }

          function download2pikpak(element) {
            if (element.file.indexOf('magnet:?') !== -1) {
              Lampa.Modal.open({
                title: '发送到PikPak',
                html: Lampa.Template.get('modal_loading'),
                size: 'small',
                mask: true,
                onBack: function onBack() {
                  Lampa.Modal.close();
                  Lampa.Api.clear();
                  Lampa.Controller.toggle('content');
                }
              });
  
              var p;
              var info = Lampa.Storage.get("pikpakUserInfo","");
              
              if (!info.loginInfo || info.loginInfo.expires < new Date().getTime()) {
                var url = 'https://user.mypikpak.com/v1/auth/signin';
                var postdata =
                {
                  "client_id": "YNxT9w7GMdWvEOKa",
                  "client_secret": "dbw2OtmVEeuUvIptb1Coyg",
                  "password": Lampa.Storage.get('pikpak_userPass', ''),
                  "username": Lampa.Storage.get('pikpak_userName', '')
                };
                
                $.ajax({
                  url: url,
                  type: 'POST',
                  data: postdata,
                  async: false,
                  dataType: 'json',
                  success: function success(json) {
                    if (json && (json.access_token || json.type == 'Bearer')) {
                      var info = {};
                      info.loginInfo = json;
                      if (!info.loginInfo.expires && info.loginInfo.expires_in) {
                        info.loginInfo.expires = new Date().getTime() + 1000 * info.loginInfo.expires_in;
                      };
                      Lampa.Storage.set("pikpakUserInfo", info);
                    } else {
                      Lampa.Storage.set("pikpakUserInfo", "");
                      if (json && json.error) Lampa.Noty.show(json.details[1].message);
                    }
                  },
                  error: function error() {
                    //Lampa.Noty.show('请在设置中使用正确的用户名和密码登陆PikPak。');
                  }
                });
          
                info = Lampa.Storage.get("pikpakUserInfo","");
                
                if (info.loginInfo) {
                  p = {
                    dataType: "json",
                    headers: {
                      "content-type": "application/json;charset=utf-8",
                      authorization: info.loginInfo.token_type + ' ' + info.loginInfo.access_token
                    },
                  };
                } else {
                  p = {
                    dataType: "json",
                    headers: {
                      "content-type": "application/json;charset=utf-8",
                    },
                  };
                };
              } else {
                p = {
                  dataType: "json",
                  headers: {
                    "content-type": "application/json;charset=utf-8",
                    authorization: info.loginInfo.token_type + ' ' + info.loginInfo.access_token
                  },
                };
              };
  
              var postData_ = {
                kind: "drive#file",
                name: "",
                // parent_id: route.params.id || '',
                upload_type: "UPLOAD_TYPE_URL",
                url: {
                  url: element.file
                },
                params: {"from":"file"},
                folder_type: "DOWNLOAD"
              };
  
              network.native(PikPakProxy() + 'https://api-drive.mypikpak.com/drive/v1/files', function (json) {
                if ("error" in json) {
                  Lampa.Noty.show('哦，' + json.error_description + '，添加到 PikPak 失败。');
                } else {
                  if (json.upload_type === "UPLOAD_TYPE_URL") {
                    Lampa.Noty.show(element.title + ' 的磁力链接已成功添加到 PikPak。');
                  };
                }
                Lampa.Modal.close();
                Lampa.Controller.toggle('content');
              }, function (a, c) {
                Lampa.Noty.show('哦: ' + network.errorDecode(a, c));
                Lampa.Modal.close();
                Lampa.Controller.toggle('content');
              }, JSON.stringify(postData_), p);
            } else {
              Lampa.Noty.show('不是磁力链接，添加失败。'); 
            }
          }

          function PikPakProxy() {
            var url ;
            //https://api-pikpak.tjsky.cf/
            Lampa.Storage.get('pikpak_proxy') ? url = 'https://cors.eu.org/': url = '';
            return url;
          };

          var enabled = Lampa.Controller.enabled().name;
          var menu = [{
            title: Lampa.Lang.translate('torrent_parser_label_title'),
            mark: true
          }, {
            title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
            clearmark: true
          }, {
            title: Lampa.Lang.translate('online_mod_clearmark_all'),
            clearmark_all: true
          }, {
            title: Lampa.Lang.translate('time_reset'),
            timeclear: true
          }, {
            title: Lampa.Lang.translate('online_mod_timeclear_all'),
            timeclear_all: true
          }];
  
          if (Lampa.Platform.is('webos')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Webos',
              player: 'webos'
            });
          }
  
          if (Lampa.Platform.is('android')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Android',
              player: 'android'
            });
          }
  
          menu.push({
            title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
            player: 'lampa'
          });
  
          if (params.file) {
            menu.push({
              title: '磁力下载到PikPak',
              pikpak: true
            });
            menu.push({
              title: Lampa.Lang.translate('copy_link'),
              copylink: true
            });
          }
  
          if (Lampa.Account.working() && params.element && typeof params.element.season !== 'undefined' && Lampa.Account.subscribeToTranslation) {
            menu.push({
              title: Lampa.Lang.translate('online_mod_voice_subscribe'),
              subscribe: true
            });
          }
  
          Lampa.Select.show({
            title: Lampa.Lang.translate('title_action'),
            items: menu,
            onBack: function onBack() {
              Lampa.Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              if (a.clearmark) {
                Lampa.Arrays.remove(params.viewed, params.hash_file);
                Lampa.Storage.set('online_view', params.viewed);
                params.item.find('.torrent-item__viewed').remove();
              }
  
              if (a.clearmark_all) {
                contextmenu_all.forEach(function (params) {
                  Lampa.Arrays.remove(params.viewed, params.hash_file);
                  Lampa.Storage.set('online_view', params.viewed);
                  params.item.find('.torrent-item__viewed').remove();
                });
              }
  
              if (a.mark) {
                if (params.viewed.indexOf(params.hash_file) == -1) {
                  params.viewed.push(params.hash_file);
                  params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                  Lampa.Storage.set('online_view', params.viewed);
                }
              }
  
              if (a.timeclear) {
                params.view.percent = 0;
                params.view.time = 0;
                params.view.duration = 0;
                Lampa.Timeline.update(params.view);
              }
  
              if (a.timeclear_all) {
                contextmenu_all.forEach(function (params) {
                  params.view.percent = 0;
                  params.view.time = 0;
                  params.view.duration = 0;
                  Lampa.Timeline.update(params.view);
                });
              }
  
              Lampa.Controller.toggle(enabled);
  
              if (a.player) {
                Lampa.Player.runas(a.player);
                params.item.trigger('hover:enter');
              }
  
              if (a.copylink) {
                params.file(copylink);
              }

              if (a.pikpak) {
                download2pikpak(params.element);
              }
  
              if (a.subscribe) {
                Lampa.Account.subscribeToTranslation({
                  card: object.movie,
                  season: params.element.season,
                  episode: params.element.translate_episode_end,
                  voice: params.element.translate_voice
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('online_mod_voice_success'));
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('online_mod_voice_error'));
                });
              }
            }
          });
        }).on('hover:focus', function () {
          if (Lampa.Helper) Lampa.Helper.show('detail_detail', '如遇播放卡顿建议长按OK键选择Android播放器。', params.item);
        });
      };

      this.start = function () {
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(scroll.render(), files.render());
            Lampa.Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) {
              if (scroll.render().find('.selector').slice(2).index(last) == 0 && last_filter) {
                Lampa.Controller.collectionFocus(last_filter, scroll.render());
              } else Navigator.move('up');
            } else Lampa.Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
          },
          back: this.back
        });
        Lampa.Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return files.render();
      };

      this.destroy = function () {
        network.clear();
        files.destroy();
        scroll.destroy();
        results = null;
        network = null;
      };
      
    }

    function startPlugin() {
      window.plugin_detail_mod_ready = true;
      Lampa.Component.add('detail_mod', component);
      Lampa.Template.add('button_detail_mod', "<div class=\"full-start__button selector view--online\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n    </g></svg>\n\n    <span>观看</span>\n    </div>");
      Lampa.Template.add('detail_mod', "<div class=\"online selector\">\n        <div class=\"online__body\">\n<div style='position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em'>    <svg style='height: 2.4em; width:  2.4em;' viewBox='0 0 128 128' fill='none' xmlns=Lampa.Utils.protocol() + 'www.w3.org/2000/svg'>   <circle cx='64' cy='64' r='56' stroke='white' stroke-width='16'/>   <path d='M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z' fill='white'/>    </svg></div>            <div class=\"online__title\"  style='padding-left: 2.1em;'>{title}</div>\n            <div class=\"online__quality\"  style='padding-left: 3.4em;'>{sitename} / {quality}</div>\n        </div>\n    </div>");
    //   Lampa.Listener.follow('full', function (e) {
    //     if (e.type == 'complite') {
    //       var btn = Lampa.Template.get('button_detail_mod');
    //       btn.on('hover:enter', function () {
    //         Lampa.Activity.push({
    //           url: '',
    //           title: '在线观看',
    //           component: 'detail_mod',
    //           search: e.data.movie.title,
    //           search_one: e.data.movie.title,
    //           search_two: e.data.movie.original_title,
    //           movie: e.data.movie,
    //           region: e.object.card.region,
    //           page: 1
    //         });
    //       });
    //       e.object.activity.render().find('.view--torrent').after(btn);
    //     }
    //   });
    }

    if (!window.plugin_detail_mod_ready) startPlugin();

})();
