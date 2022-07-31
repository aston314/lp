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
      var doreg = {};
      var allowdebug = true;
      

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
      
        var url1 = object.movie.url;
        //console.log(url1);
        parse(object.movie.url);

          function parse(url) {
              //取得具体页面的详情地址
              network["native"](url, function (str) {
                  var str = str.replace(/\n|\r/g, '')
                  var h =  $(object.detail.videoscontainer.selector, str);
                  var t = object.detail.title.selector ? object.detail.title.selector : 'a';
                  var l = object.detail.link.selector ? object.detail.link.selector : 'a';

                  $(h).each(function (i, html) {
                    var r = (object.detail.title.attrName == 'text' || object.detail.title.attrName == '') ? $(this).find(t).text() :  $(this).find(t).attr(object.detail.title.attrName);
                    r = object.detail.title.filter !== '' ? (r.match(new RegExp(object.detail.title.filter)) ? r.match(new RegExp(object.detail.title.filter))[1] : r) : r;
                    var host = object.url.indexOf('http') == -1 ? '' : object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0];
                    var f = $(this).find(l).attr('href');
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
                _this.filtred();
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
              }, {
                  headers: {
                      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
                  }
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
              if (file.indexOf('://') === -1) {
                  if (file.indexOf('magnet:?') !== -1) {
                      var intentExtra = {
                          title: element.title,
                          poster: '',
                          action: "play",
                          data: {
                              lampa: true
                          }
                      };
                      if (window.intentShim) {
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
                          Lampa.Noty.show('只能在安卓平台上打开磁力链接。');
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
                        Lampa.Noty.show('只能在安卓平台上打开该链接。');
                    }
                  };
                  
              }
              else {
                //console.log(file)
                  if ((file.indexOf('.mp4') !== -1) || (file.indexOf('.m3u8') !== -1) || (file.indexOf('.mp3') !== -1)) {
                      var video = {
                          title: element.title,
                          url: file
                      };
                      Lampa.Player.play(video);
                      Lampa.Player.playlist([video]);
                  } else {
                    
                      network.silent(file, function (result) {
                          var v = result.replace(/\n|\r/g, '').replace(/\\/g,'').match(/https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|](.mp4|.m3u8)/);
                          var videolink = v ? v[0] : '';
                          if (videolink) {
                              //Lampa.Modal.close();
                              var video = {
                                  title: element.title,
                                  url: videolink
                              };
                              Lampa.Player.play(video);
                              Lampa.Player.playlist([video]);
                          } else {
                              //Lampa.Modal.close();
                              Lampa.Noty.show('没有找到对应影片。');
                              //Lampa.Controller.toggle('content');
                          };
                      }, function (a, c) {
                          Lampa.Noty.show(network.errorDecode(a, c));
                      }, false, {
                          dataType: 'text'
                      });
                      //Lampa.Noty.show('无法检索链接');
                  }
              }
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
          });
          scroll.append(item);
        });
      };

      this.back = function () {
        Lampa.Activity.backward();
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
