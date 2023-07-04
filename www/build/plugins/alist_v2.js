(function () {
    'use strict';
    var catalogs_alist;

    // network["native"](Lampa.Storage.field('alist_site_json') + '?v=' + Math.random(), function (j) {
    //     if (j) {
    //         if (j.length > 0) {
    //             catalogs_alist = j;
    //         } else {
    //             Lampa.Noty.show('Alsit配置无法加载，请检查JSON地址。');
    //         }
    //         console.log(j)
    //     }
    // }, false, false, {
    //     dataType: 'json'
    // });

  function component(object) {
    var network = new Lampa.Reguest();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true
    });
    var files = new Lampa.Files(object);
    var filter = new Lampa.Filter(object);
    var filter_translate = {
      season: '季',
      voice: '翻译'
    };
    var filter_items = {
        season: [],
        voice: [],
        voice_info: [],
        order:[]
      };
    var results = [];
    var filtred = [];
    var last;
    var last_filter;
    scroll.minus();
    scroll.body().addClass('torrent-list');
    var listlink = {
      data: [{
        media: [],
        "iframe_src": "",
        translations: []
      }]
    };
    var url;
    var contextmenu_all = [];
    var cors = Lampa.Utils.checkHttp('proxy.cub.watch/cdn/');
    //var cors_https = /https/.test(cors) ? cors : '';
    var cors_https = '';

    this.order = [{ title: '原始顺序', id: 'normal' },
    { title: '倒序', id: 'invers' }]; 
   
    this.create = function () {
        var _this = this;
        this.activity.loader(true);
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));

        var getlink = object.url;

        if (getlink.endsWith("/")) {
            getlink = getlink;
        } else {
            getlink = (getlink + "/");
        };
        url = getlink;
        var baseurl = getlink.match(/http.*:\/\/.*?\//, getlink)[0];
        (baseurl.indexOf('http://') !== -1) ? baseurl = cors_https + baseurl : baseurl;
        
        
        network["native"](baseurl + "api/public/settings", function (json) {
            var url;
            var ver = typeof json.data.version !== 'undefined' ? ver = 3 : ver = 2;
            var pat = getlink.replace(baseurl, "");
            var param = {
                "path": "/" + pat
            };

            (ver == 3) ? url = baseurl + "api/fs/list" : url = baseurl + "api/public/path";
            _this.dolist (_this,ver,url,param);

        }, false, false, {
            dataType: 'json'
        });

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
        return this.render();
      };

      this.dolist = function (_this,ver,url,param) {
        // console.log('param',param)
        network["native"](url, function (json) {
            if (json.message == "success") {
                var datatype;
                (ver == 3) ? datatype = json.data.content : datatype = json.data.files;
                
                datatype.forEach(function (item, index) {
                    //if (item.type ==1 || item.type ==3) {
                    listlink.data[0].media.push({
                        translation_id: item.name,
                        max_quality: item.type == 1 ? '文件夹' : item.name.substr(item.name.lastIndexOf('.') + 1).toUpperCase() + ' / ' + get_size(item.size),
                        title: item.name.replace("\.mp4", "").replace("\.mkv", ""),
                        type: item.type,
                        drive_id: item.type,
                        file_id: item.thumb || item.url || item.name,
                        share_id: ''
                    });
                    //}
                });

                results = listlink.data;

                _this.build();

                _this.activity.loader(false);

                _this.activity.toggle();
            } else {
                _this.empty('哦: ' + json.message);
            }
        }, function (a, c) {
            //console.log(a.responseText,a.status)
            _this.empty('哦: ' + network.errorDecode(a, c));
        }, JSON.stringify(param), {
            dataType: "json",
            headers: {
                "content-type": "application/json",
            }
        });
      }

      this.empty = function (descr) {
        var empty = new Lampa.Empty({
          descr: descr
        });
        // filter.empty()
        files.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.buildFilterd = function (select_season) {
        var select = [];

        var add = function add(type, title) {
          var need = Lampa.Storage.get('online_filter', '{}');
          var items = filter_items[type];
          var subitems = [];
          var value = need[type];
          items.forEach(function (name, i) {
            subitems.push({
              title: name,
              selected: value == i,
              index: i
            });
          });
          select.push({
            title: title,
            subtitle: items[value],
            items: subitems,
            stype: type
          });
        };

        filter_items.voice = [];
        filter_items.season = [];
        filter_items.voice_info = [];
        filter_items.order = [];
        this.order.forEach(function (i){
					filter_items.order.push(i.title);
				});
        var choice = {
          season: 0,
          voice: 0
        };
        results.slice(0, 1).forEach(function (movie) {
          if (movie.season_count) {
            var s = movie.season_count;

            while (s--) {
              filter_items.season.push('季 ' + (movie.season_count - s));
            }

            choice.season = typeof select_season == 'undefined' ? filter_items.season.length - 1 : select_season;
          }

          if (filter_items.season.length) {
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == choice.season + 1) {
                episode.media.forEach(function (media) {
                  if (filter_items.voice.indexOf(media.translation.smart_title) == -1) {
                    filter_items.voice.push(media.translation.smart_title);
                    filter_items.voice_info.push({
                      id: media.translation.id
                    });
                  }
                });
              }
            });
          } else {
            movie.translations.forEach(function (element) {
              filter_items.voice.push(element.smart_title);
              filter_items.voice_info.push({
                id: element.id
              });
            });
          }
        });
        Lampa.Storage.set('online_filter', object.movie.number_of_seasons ? choice : {});
        select.push({
          title: '重置筛选',
          reset: true
        });

        if (object.movie.number_of_seasons) {
          add('voice', '翻译');
          add('season', '季');
        }
        if (filter_items.order && filter_items.order.length) add('order', '剧集排序');
        filter.set('filter', select);
        this.selectedFilter();
      };

      this.selectedFilter = function () {
        var need = Lampa.Storage.get('online_filter', '{}'),
            select = [];

        for (var i in need) {
          select.push(((i == 'order') ? '排序' : filter_translate[i]) + ': ' + filter_items[i][need[i]]);
        }

        filter.chosen('filter', select);
      };

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
      };

      this.build = function () {
        var _this3 = this;

        this.buildFilterd();
        this.filtred();

        
        filter.onSelect = function (type, a, b) {
          if (type == 'filter') {
            if (a.reset) {
              _this3.buildFilterd();
            } else {
              if (a.stype == 'season') {
                _this3.buildFilterd(b.index);
              } else {
                var filter_data = Lampa.Storage.get('online_filter', '{}');
                filter_data[a.stype] = b.index;
                a.subtitle = b.title;
                Lampa.Storage.set('online_filter', filter_data);
              }
            }
          }

          _this3.applyFilter();

          _this3.start();
        };

        this.showResults();
      };

      this.filtred = function () {
        filtred = [];
          results.slice(0, 1).forEach(function (movie) {
            movie.media.forEach(function (element) {
              filtred.push({
                  title: element.title,
                  quality: element.max_quality,
                  translation: element.translation_id,
                  type: element.type,
                  file_id: element.file_id,
                  share_id: element.share_id 
              });
            });
          });
          var filter_data = Lampa.Storage.get('online_filter', '{}');
          this.order[filter_data.order] ? (this.order[filter_data.order].id == 'invers' ? filtred.reverse() : filtred) : filtred;
      };

      this.applyFilter = function () {
        this.filtred();
        this.selectedFilter();
        this.reset();
        this.showResults();
        last = scroll.render().find('.selector').eq(1)[0];
      };

      this.showResults = function (data) {
        filter.render().addClass('torrent-filter');
        scroll.append(filter.render());
        filter.render().find('.filter--search').remove();
        //filter.render().find('.filter--sort').hide();
        //filter.render().find('.filter--filter').hide();
        
        this.append(filtred);
        files.append(scroll.render());
        //$(".scroll").find(".torrent-filter").remove();
        $(".scroll").find(".torrent-filter").css({
          marginBottom: '1em' // you can write with quotes "margin-bottom" too
        });
      };

      this.reset = function () {
        last = false;
        filter.render().detach();
        scroll.clear();
      };

      this.doview = function (url,file,element,view) {
        // console.log('param',param)
        network["native"](url+'/api/fs/get', function (j) {
            if (j.message == "success") {
                var playlist = [];
                var first = {
                  url: j.data.raw_url,
                  timeline: view,
                  title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality
                };
                Lampa.Player.play(first);

                playlist.push(first);
                Lampa.Player.playlist(playlist);
              } else {
                  //Lampa.Noty.show('获取Alsit播放地址失败。');
                  var playlist = [];
                  var first = {
                    url: file1,
                    timeline: view,
                    title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality
                  };
                  Lampa.Player.play(first);

                  playlist.push(first);
                  Lampa.Player.playlist(playlist);
              }
        }, function (a, c) {
            //console.log(a.responseText,a.status)
            _this.empty('哦: ' + network.errorDecode(a, c));
        }, JSON.stringify({
            "path": file.replace(url+'/',''),
            "password": ""
          }), {
            dataType: "json",
            headers: {
                "content-type": "application/json",
            }
        });
      }

      this.append = function (items) {
        var _this4 = this;
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.translation ? [element.translation, element.title].join('') : element.title);
          var view = Lampa.Timeline.view(hash);
          var item;
          
          if (element.type == 1) {
            item = Lampa.Template.get('alist_folder', element);
          }else{
            item = Lampa.Template.get('alist', element);
          };
          
          var hash_file = Lampa.Utils.hash(element.translation ? [element.translation, element.title].join('') : element.title + 'libio');
          
          element.timeline = view;

          item.append(Lampa.Timeline.render(view));
          
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }

          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
        
          item.on('hover:focus', function (e) {

            if (element.type == 1) {
              //setTimeout(function () {
              $('.broadcast__scan').remove();
              $(".full-start__poster").after('<div class="broadcast__scan"><div></div></div>');
              var reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5\d+|\/]+/;
              //    var chinese_title = element.title.replace(/《|【|》|】|\./g, ' ').match(reg) ? element.title.replace(/《|【|》|】|\./g, ' ').match(reg)[0] : element.title;
              //    network.silent('https://filebox-douban.vercel.app/api/search?keyword=' + encodeURIComponent(chinese_title), function (json) {
              //      if (json.length > 0) { $(".full-start__img").attr('src', json[0].cover_url) }
              //      else { $(".full-start__img").attr('src', './img/img_broken.svg'); };
              //      $('.broadcast__scan').remove();
              //    }, function (a, c) {
              //      //Lampa.Noty.show(network.errorDecode(a, c));
              //    }, false, {
              //      dataType: 'json'
              //    });
              $('.card__type').remove();
              var chinese_title = element.title.replace(/4K|《|【|》|】|\./g, ' ').match(reg) ? element.title.replace(/4K|《|【|》|】|\./g, ' ').match(reg)[0] : element.title;
              network["native"]('https://www.laodouban.com/s?c=' + encodeURIComponent(chinese_title), function (json) {
                var poster_douban = $('div:last-child > div.haibao > a > img', json).attr('src');
                var rating_douban = $('div:last-child > div.wenzi.d-flex.flex-column.justify-content-between > div.xia.text-muted.d-flex.align-items-center > span.fen.pl-1', json).text();
                if (rating_douban) {
                  //$(".files__title").append("<br/> <br/> 豆瓣："+rating_douban);
                  $(".full-start__poster").after('<div class="card__type" style="left:1em;top:70">豆瓣：' + rating_douban + '</div>');
                  //$(".full-start__img").after('<div class="card--new_ser" style="right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;">豆瓣：'+ rating_douban +'</div>');
                };
                if (poster_douban) {
                  if (Lampa.Storage.field('douban_img_proxy')) {
                    //豆瓣图片域名
                    if (/playwoool\.com|doubanio\.com|img\.yts\.mx/.test(poster_douban) && /^([^:]+):\/\/([^:\/]+)(:\d*)?(\/.*)?$/.test(poster_douban)) {//ii.indexOf('://') == 5
                      poster_douban = 'https://images.weserv.nl/?url=' + poster_douban.replace('https://', '')
                    } else if (poster_douban.indexOf('pic.imgdb.cn') !== -1) {
                      poster_douban = 'http://www.dydhhy.com/wp-content/themes/bokeX/thumb.php?src=' + poster_douban + '&w=270&h=405'
                    };
                  };
                  $(".full-start__img").attr('src', poster_douban);
                } else {
                  $(".full-start__img").attr('src', './img/img_broken.svg');
                };
                $('.broadcast__scan').remove();
              }, function (a, c) {
                //Lampa.Noty.show(network.errorDecode(a, c));
              }, false, {
                dataType: 'text'
              });
              //}, 1501);
            };
            if (Lampa.Helper) Lampa.Helper.show('alist_detail1', '更好的播放体验请用外部播放器 长按选择Android', item);
            last = e.target;
            scroll.update($(e.target), true);
          }).on('hover:enter', function () {
            var myurl = element.file_id;
            if (element.type == 1) {
              //_this4.search(element);
              element.img = object.movie.img;
              element.original_title = '';
              Lampa.Activity.push({
                url: object.url+'/'+element.title,
                title: 'Alist - '+ element.title,
                component: 'alist',
                movie: element,
                page: 1
              });
            } else {
              /* console.log(element);
              console.log("取得播放地址");*/
              var file =element.file_id;
              
                if (file) {
                  //_this4.start();
                  //if (file.indexOf('aliyundrive') !== -1) {
                    var arr = object.url.split("/");
                    var result = arr[0] + "//" + arr[2];

                    var file1 = encodeURI(object.url.replace(result, result + '/d') + '/' + element.translation)
                    file = object.url+ '/' + element.translation
                    
                    var r = ('' + file).match(/^(https?:)?\/\/[^/]+/i);
                    //console.log(r[0])
                    // $.ajax({
                    //   url: file,
                    //   type: 'GET',
                    //   async: false,
                    //   beforeSend: null,
                    //   success: function success(result, textStatus, xhr) {
                    //     if (xhr.getResponseHeader('REQUIRES_AUTH') === '1') {
                    //       XMLHttpRequest.abort(); // terminate further ajax execution
                    //       file = location;
                    //   }
                    //   },
                    //   error: function error() {
                
                    //   }
                    // });
                    _this4.doview (r[0],file,element,view);
                //     $.ajax({
                //       url: r[0]+'/api/fs/get',
                //       type: 'POST',
                //       async: true,
                //       data: {
                //         "path": file.replace(r[0]+'/',''),
                //         "password": ""
                //       },
                //       dataType: 'json',
                //       success: function success(j) {
                //           if (j.message == "success") {
                //             var playlist = [];
                //             var first = {
                //               url: j.data.raw_url,
                //               timeline: view,
                //               title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality
                //             };
                //             Lampa.Player.play(first);
          
                //             playlist.push(first);
                //             Lampa.Player.playlist(playlist);
                //           } else {
                //               //Lampa.Noty.show('获取Alsit播放地址失败。');
                //               var playlist = [];
                //               var first = {
                //                 url: file1,
                //                 timeline: view,
                //                 title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality
                //               };
                //               Lampa.Player.play(first);
            
                //               playlist.push(first);
                //               Lampa.Player.playlist(playlist);
                //           }
                //       },
                //       error: function error() {
                //           Lampa.Noty.show('获取Alsit播放地址失败。');
                //       }
                //   });
                    //console.log(file)
                  //};
                  
                } else {
                  Lampa.Noty.show('无法检索链接');
                }
            }
            if (viewed.indexOf(hash_file) == -1) {
              viewed.push(hash_file);
              item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
              Lampa.Storage.set('online_view', viewed);
            };
          }
          );
          
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
        _this4.start(true);
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
          if (Lampa.Helper) Lampa.Helper.show('pikpak_detail', '如遇播放卡顿建议长按OK键选择Android播放器。', params.item);
        });
      };

      this.start = function (first_select) {
        if (Lampa.Activity.active().activity !== this.activity) return; //обязательно, иначе наблюдается баг, активность создается но не стартует, в то время как компонент загружается и стартует самого себя.
        if (first_select) {
          // var last_views = scroll.render().find('.selector.online').find('.torrent-item__viewed').parent().last();
          // if (last_views.length) last = last_views.eq(0)[0];else last = scroll.render().find('.selector').eq(1)[0];
          last = scroll.render().find('.selector').eq(1)[0];
        }
        
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(scroll.render(), files.render());
            Lampa.Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) {
              if (scroll.render().find('.selector').slice(1).index(last) == 0 && last_filter) {
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

    function get_size(sz) {
      if (sz <= 0) return "";
      let filesize = "";
      if (sz > 1024 * 1024 * 1024 * 1024.0) {
        sz /= (1024 * 1024 * 1024 * 1024.0);
        filesize = "TB";
      } else if (sz > 1024 * 1024 * 1024.0) {
        sz /= (1024 * 1024 * 1024.0);
        filesize = "GB";
      } else if (sz > 1024 * 1024.0) {
        sz /= (1024 * 1024.0);
        filesize = "MB";
      } else {
        sz /= 1024.0;
        filesize = "KB";
      }
      return sz.toFixed(2) + filesize
    }    

    function startPlugin() {
      window.plugin_alist_ready = true;
      Lampa.Component.add('alist', component);
      Lampa.Template.add('button_pikpak', "<div class=\"full-start__button selector view--online\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n    </g></svg>\n\n    <span>网盘观看</span>\n    </div>");
      Lampa.Template.add('alist', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"64\" cy=\"64\" r=\"56\" stroke=\"white\" stroke-width=\"16\"/>\n                    <path d=\"M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">Alist / {quality}</div>\n        </div>\n    </div>");
      Lampa.Template.add('alist_folder', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"/>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"/>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">Alist / {quality}</div>\n        </div>\n    </div>");
    }

    if (!window.plugin_alist_ready) startPlugin();
        if (Lampa.Storage.get('alist_site_json')) {
        $.ajax({
            url: Lampa.Storage.field('alist_site_json') + '?v=' + Math.random(),
            type: 'GET',
            async: false,
            dataType: 'json',
            success: function success(j) {
                if (j.length > 0) {
                    catalogs_alist = j;
                } else {
                    Lampa.Noty.show('Alsit配置无法加载，请检查JSON地址。');
                }
            },
            error: function error() {
                Lampa.Noty.show('Alist配置无法加载，请检查JSON地址。');
            }
        });
  } else {
    //Lampa.Noty.show('Alist配置无法加载，请检查JSON地址。');
  };
    Lampa.Params.select('alist_site_json', '', '');
    Lampa.Template.add('settings_mod_alist', "<div>\n  <div class=\"settings-param selector\" data-name=\"alist_site_json\" data-type=\"input\" placeholder=\"\"> <div class=\"settings-param__name\">Json地址</div> <div class=\"settings-param__value\">请填写json地址</div> <div class=\"settings-param__status\"></div><div class=\"settings-param__descr\">填写Alist网站配置地址</div> </div>\n   </div>\n</div>");
    
    function addSettingsAlist() {
      if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="mod_alist"]').length) {
        let field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"mod_alist\">\n            <div class=\"settings-folder__icon\">\n                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-triangle\"><path d=\"M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/></svg>\n            </div>\n            <div class=\"settings-folder__name\">Alist</div>\n        </div>"));
        Lampa.Settings.main().render().find('[data-component="more"]').after(field)
        Lampa.Settings.main().update()
      };
      var ico = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-triangle"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>';
      var menu_item = $('<li class="menu__item selector focus" data-action="alist"><div class="menu__ico">' + ico + '</div><div class="menu__text">Alist</div></li>');
      var element = {};
      element.img = './img/img_broken.svg';
      element.original_title = '';
      element.title = 'Alist内容';
      menu_item.on('hover:enter', function () {
        if (catalogs_alist){
          Lampa.Select.show({
            title: 'Alist',
            items: catalogs_alist,
            onSelect: function onSelect(a) {
                Lampa.Activity.push({
                    url: a.url,
                    title: 'Alist - '+a.title,
                    component: 'alist',
                    movie: element,
                    page: 1
                });
            },
            onBack: function onBack() {
                Lampa.Controller.toggle('menu');
            }
        });
      } else {
          Lampa.Noty.show('Alist配置无法加载，请在设置中检查JSON地址。');
      }
    }
    );
    $('.menu .menu__list').eq(0).append(menu_item);
    //  $('*[data-type="book"]').before(menu_item);
    }

    if (window.appready) addSettingsAlist()
    else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') addSettingsAlist()
      })
    }
  
    // Lampa.Listener.follow('app', function (e) {
    //   if (e.type == 'ready' && Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="mod_alist"]').length) {
    //     var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"mod_alist\">\n            <div class=\"settings-folder__icon\">\n                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-triangle\"><path d=\"M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/></svg>\n            </div>\n            <div class=\"settings-folder__name\">Alist</div>\n        </div>"));
    //     Lampa.Settings.main().render().find('[data-component="more"]').after(field);
    //     Lampa.Settings.main().update();
    //   };
      
    //   var ico = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-triangle"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>';
    //   var menu_item = $('<li class="menu__item selector focus" data-action="mypikpak"><div class="menu__ico">' + ico + '</div><div class="menu__text">Alist</div></li>');
    //   var element = {};
    //   element.img = './img/img_broken.svg';
    //   element.original_title = '';
    //   element.title = 'Alist内容';
    //   menu_item.on('hover:enter', function () {
    //     if (catalogs_alist){
    //       Lampa.Select.show({
    //         title: 'Alist',
    //         items: catalogs_alist,
    //         onSelect: function onSelect(a) {
    //             Lampa.Activity.push({
    //                 url: a.url,
    //                 title: 'Alist - '+a.title,
    //                 component: 'alist',
    //                 movie: element,
    //                 page: 1
    //             });
    //         },
    //         onBack: function onBack() {
    //             Lampa.Controller.toggle('menu');
    //         }
    //     });
    //   } else {
    //       Lampa.Noty.show('Alist配置无法加载，请在设置中检查JSON地址。');
    //   }
    // }
    // );
    //   $('*[data-type="book"]').before(menu_item);
    // });
    


    function check(name) {
      var item = $('[data-name="' + name + '"]').find('.settings-param__status').removeClass('active error wait').addClass('wait');
      var url = Lampa.Storage.get(name);

      if (url) {
        var torrent_net = new Lampa.Reguest();
        torrent_net.timeout(10000);
        torrent_net.silent(Lampa.Utils.checkHttp(Lampa.Storage.get(name))+'?v=' + Math.random(), function (json) {
          catalogs_alist = json;
          item.removeClass('active error wait').addClass('active');
        }, function (a, c) {
          catalogs_alist = '';
          Lampa.Noty.show(torrent_net.errorDecode(a, c) + ' - ' + url);
          item.removeClass('active error wait').addClass('error');
        }, false, {
          dataType: 'json'
        });
      }
    }

    Lampa.Storage.listener.follow('change', function (e) {
      if (e.name == 'alist_site_json') check(e.name);
    });

    // Lampa.Settings.listener.follow('open', function (e) {
    //   if (e.name == 'mod_alist') {
    //     var item = e.body.find('[data-name="alist_site_json"]');
    //         item.unbind('hover:enter').on('hover:enter', function () {
    //             $('.settings-param__status', item).removeClass('active error wait').addClass('active');
    //         });
    //   }
    // });
})();
