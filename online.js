(function () {
    'use strict';

    function component(object) {
      var network = new Lampa.Reguest();
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      var files = new Lampa.Files(object);
      var filter = new Lampa.Filter(object);
      var results = [];
      var filtred = [];
      var extract = {};
      var token = '3i40G5TSECmLF77oAqnEgbx61ZWaOYaE';
      var last;
      var last_filter;
      var filter_items = {
        season: [],
        voice: [],
        voice_info: []
      };
      var filter_translate = {
        season: '季',
        voice: '翻译'
      };
      scroll.minus();
      scroll.body().addClass('torrent-list');
      var listlink = {
        data:[{
          media:[],
          "iframe_src": "",
          translations:[]
        }]
      };
      var websitelink = "https://www.7xiady.cc";

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
        var url = 'https://videocdn.tv/api/' + (object.movie.number_of_seasons ? 'tv-series' : 'movies');
        url = Lampa.Utils.addUrlComponent(url, 'api_token=' + token);
        url = Lampa.Utils.addUrlComponent(url, 'query=' + encodeURIComponent(object.search));
        if (object.movie.release_date && object.movie.release_date !== '0000') url = Lampa.Utils.addUrlComponent(url, 'year=' + (object.movie.release_date + '').slice(0, 4));
        //console.log(url);
        //搜索关键字

        var url1="https://www.7xiady.cc/index.php/search/"+ encodeURIComponent(object.search_one)+"----------1---/";
        console.log(url1);

        


        //network.silent("https://rentry.co/testjson/raw", function (json) {
          //if (json.data && json.data.length) {
            //results = json.data;
            //console.log(listlink);
            //json.data[0].translations.push(listlink.Results);
            //json.data[0].media.push(listlink.Results);
            

        network.timeout(1000 * 60);
        /*listlink = {
            Results: []
          };*/
        network["native"](url1, function (str) {

        function oncomplite(str) {
          return str.length > 1 ? str[1] : undefined;
        };
        function onerror(str) {
          return str.length > 2 ? str[2] : undefined;
        };

        var titleRegExp = /<ul class="stui-vodlist clearfix">([\s\S]*?)<\/ul>/g;
        var searchresult = titleRegExp.exec(str);
        //console.log(searchresult);
        
        //var searchresult = str.match(new RegExp('\.html\('(.+?)'\)', 'g'));
        var searchresult = searchresult[1].search("stui-vodlist__item");
        //console.log(str.includes('To be'));

        //console.log(searchresult);
        //console.log("searchresult");
        //console.log(75 = -1);

        if(searchresult < 0){
/*          listlink = {
            Results: []
          };*/
          _this.empty('哦，我们没有找到 (' + object.search_one + ') 静待资源上线');
        }
        else{
        var math = str.replace(/\n|\r/g, '').match(new RegExp('<li class="stui-vodlist__item">(.*?)<\/li>', ''));
        var data = {
          Results: []
        };
        $.each(math, function (i, a) {
          if(i == 1){
            return false;
          };
          var element = $(a),
              item = {};
          item.Title = $('.stui-vodlist__thumb', element).attr('title');
          item.Link = websitelink+$('.stui-vodlist__thumb', element).attr('href');
          var searchtitle = item.Title;
          console.log(item.Link);
                  //取得具体页面的详情地址
                  network["native"](item.Link, function (str) {
                  var math = str.replace(/\n|\r/g, '').match(new RegExp('<div class="stui-pannel_bd col-pd clearfix">(.*?)<\/div>', 'g'));
                  var data = {
                    Results: []
                  };
                  $.each(math, function (i, a) {
                    //console.log(a);
                    var element = $(a),
                        item = {
                          translation: {},
                        };
                    //console.log(element);
                    //console.log("电视剧");
/*                    $("li").each(function(index){
                        console.log(index + ": " + $('a').text());
                    });
                   $('ul>li a').each(function(index,a){
                      var self=$(this);
                      console.log(self.text());
                      console.log("fuck");
                    });*/
                    var titleRegExp = /<a href="(.+?)">(.+?)<\/a>/g;

                    //let result = titleRegExp.exec(a);
//console.log(titleRegExp.exec(a));
                    
                    var matches = [];
                    //var rslt    = [];
                     
                    while((matches = titleRegExp.exec(a)) != null){
                          
                          matches.shift();

/*                          item.translation_id = matches[0];
                          item.max_quality = matches[1];

                          item.title = object.search_one;
                          item.iframe_src = matches[0];
                          var mytranslation = {};
                          item.translation=mytranslation;*/
                          //console.log("生成item");
                          //console.log(JSON.stringify(item));
                          var mytranslation = {};

                          data.Results.push({
                            translation_id : websitelink+matches[0],
                            max_quality : matches[1],
                            title : searchtitle,
                            iframe_src : matches[0],
                            translation : mytranslation
                        });

/*                      item.translation_id = $('li>a', element).attr('href');
                      item.max_quality = $('li>a', element).text();

                      //item.id = 381
                      item.title = object.search_one;
                      //item.iframe = ""
                      item.iframe_src = $('li>a', element).attr('href');
                      var mytranslation = {  
                      //id:381,
                      //title:object.search_one,
                      //iframe:"",
                      //iframe_src:$('li>a', element).attr('href')
                      };
                      item.translation=mytranslation;*/

                    /*item.short_title = $('li>a', element).text();
                    item.shorter_title = $('li>a', element).text();
                    item.smart_title = $('li>a', element).text();
                    item.title = $('li>a', element).text();*/

                    /*item.url = $('li>a', element).attr('href');
                    item.resolution = 720;
                    item.media_id = ""*/
                   
                    /*//console.log(item.Link);
                          //取得播放地址
                          network["native"](item.iframe_src, function (str) {
                          var math = str.replace(/\n|\r/g, '').match(new RegExp('url\":\"(http[^\"]+)', 'g'));
                          var data = {
                            Results: []
                          };
                          $.each(math, function (i, a) {
                            a = a.replace('url\":\"','');
                            var element = $(a),
                                item = {};
                            //item.Title = $('li>a', element).text();
                            item.Link = a
                            //console.log(item.Link);
                            
                            element.remove();
                            if (item.Link) data.Results.push(item);
                            
                          });
                          oncomplite(data);
                          //console.log(data);
                        }, function (a, c) {
                          onerror(network.errorDecode(a, c));
                        }, false, {
                          dataType: 'text'
                        });*/

                    
                    //if (item.title && item.iframe_src) data.Results.push(item);
                    };
                    element.remove();
                    //console.log(item);
                  });
                  //listlink = data;
                  oncomplite(data);
                  for (let i = 0; i < data.Results.length; ++i) {
                      listlink.data[0].media.push(data.Results[i]);
                      //console.log(i);
                  }
                  //console.log(listlink.Results[0]);
                  //console.log(data.Results.length);
                  //console.log("data.Results.length");
                  
                  //console.log("listlink------crape");
                  //console.log(listlink);
                  //console.log("listlink------crape");
                  results = listlink.data;
                  //console.log(JSON.stringify(results));
                  _this.build();

                  _this.activity.loader(false);

                  _this.activity.toggle();

                  //json.data[0].media[0].qualities.push(listlink.Results[0]);
                  //console.log(JSON.stringify(json));
                  //listlink = JSON.stringify(listlink);
                  //console.log(jsonarray);
                }, function (a, c) {
                  //onerror(network.errorDecode(a, c));
                  _this.empty('哦，' + network.errorDecode(a, c) + ' ');
                }, false, {
                  dataType: 'text'
                });

          element.remove();
          if (item.Title && item.Link) data.Results.push(item);
        });
        }
          data;
          //console.log(data);

        }, function (a, c) {
          //onerror(network.errorDecode(a, c));
          _this.empty('哦，' + network.errorDecode(a, c) + ' ');
        }, false, {
          dataType: 'text'
        });
        //console.log("这里");
        //console.log("listlink");
        //console.log(json.data);
        /*if (listlink.data && listlink.data.length) {
        results = listlink.data;
        console.log(JSON.stringify(results));
            _this.build();

            _this.activity.loader(false);

            _this.activity.toggle();
          } else _this.empty('哦，我们没有找到 (' + object.search + ')');
        }, function (a, c) {
          _this.empty('响应: ' + network.errorDecode(a, c));
        });*/

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
        var choice = {
          season: 0,
          voice: 0
        };
        results.slice(0, 1).forEach(function (movie) {
/*          if (movie.season_count) {
            var s = movie.season_count;

            while (s--) {
              filter_items.season.push('季 ' + (movie.season_count - s));
            }

            choice.season = typeof select_season == 'undefined' ? filter_items.season.length - 1 : select_season;
          }*/

          /*if (filter_items.season.length) {
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
          } else {*/
            movie.translations.forEach(function (element) {
              filter_items.voice.push(element.smart_title);
              filter_items.voice_info.push({
                id: element.id
              });
            });
          //}
        });
        Lampa.Storage.set('online_filter', object.movie.number_of_seasons ? choice : {});
        select.push({
          title: '重置过滤器',
          reset: true
        });

        if (object.movie.number_of_seasons) {
          add('voice', '翻译');
          add('season', '季');
        }

        filter.set('filter', select);
        this.selectedFilter();
      };

      this.selectedFilter = function () {
        var need = Lampa.Storage.get('online_filter', '{}'),
            select = [];

        for (var i in need) {
          select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
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

      this.build = function () {
        var _this3 = this;

        //this.buildFilterd();
        this.filtred();
        //this.extractData();

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
        var filter_data = Lampa.Storage.get('online_filter', '{}');

/*        if (object.movie.number_of_seasons) {
          results.slice(0, 1).forEach(function (movie) {
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == filter_data.season + 1) {
                episode.media.forEach(function (media) {
                  if (media.translation.id == filter_items.voice_info[filter_data.voice].id) {
                    filtred.push({
                      episode: parseInt(episode.num),
                      season: episode.season_num,
                      title: episode.num + ' - ' + episode.ru_title,
                      quality: media.max_quality ,
                      translation: media.translation_id
                    });
                  }
                });
              }
            });
          });
        } else {*/
          
          console.log(results.slice(0, 1));
          console.log("results");
          results.slice(0, 1).forEach(function (movie) {
              console.log(movie);
              console.log("movie");
            movie.media.forEach(function (element) {
              console.log(element);
              console.log("element");
              filtred.push({
                title: element.title,
                quality: element.max_quality ,
                translation: element.translation_id
              });
              console.log(filtred);
              console.log("filtred");
            });
          });
        //}
      };

      this.applyFilter = function () {
        this.filtred();
        this.selectedFilter();
        this.reset();
        this.showResults();
        last = scroll.render().find('.torrent-item:eq(0)')[0];
      };

      this.showResults = function (data) {
        filter.render().addClass('torrent-filter');
        scroll.append(filter.render());
        this.append(filtred);
        files.append(scroll.render());
      };

      this.reset = function () {
        last = false;
        filter.render().detach();
        scroll.clear();
      };

      this.getFile = function (element, show_error) {
        console.log(element.translation);
        console.log("element.translation");
        //var translat = extract[element.translation];
        var translat = element.translation;
        console.log(translat);
        console.log("translat");
        var link;
        //console.log(item.Link);
        //取得播放地址
        if (translat) {

          function getRemote(remote_url) {
             return $.ajax({
                type: "GET",
                url: remote_url,
                async: false
             }).responseText;
          };
          //console.log(getRemote(translat));
           var str = getRemote(translat);
           //return network["native"](translat, function (str) {
            var math = str.replace(/\n|\r/g, '').match(new RegExp('url\":\"(http[^\"]+)', 'g'));
            var data = {
              Results: []
            };
            $.each(math, function (i, a) {
              a = decodeURIComponent(a.replace(/\+/g,  " ")).replace('url\":\"','');
              var element = $(a),
                  item = {};
              //item.Title = $('li>a', element).text();
              item.file = a
              //console.log(item.Link);
              
              element.remove();
              if (item.file) data.Results.push(item);
              
            });
            link=data.Results[0].file;
            link=link.replace(/\\/g,"");
            console.log(link);
            return link;
            //console.log(data.Results[0].file);
/*          }, function (a, c) {
            onerror(network.errorDecode(a, c));
          }, false, {
            dataType: 'text'
          });*/
        //console.log(link);
        //return link;
        //var id = element.season + '_' + element.episode;

        //if (translat) {
/*          if (element.season) {
            for (var i in translat.json) {
              var elem = translat.json[i];

              if (elem.folder) {
                for (var f in elem.folder) {
                  var folder = elem.folder[f];
                  if (folder.id == id) return folder.file;
                }
              } else if (elem.id == id) {
                return elem.file;
              }
            }
          } else return translat.file;*/
        }

        if (show_error) Lampa.Noty.show('无法检索链接');
      };

      this.append = function (items) {
        var _this4 = this;

        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online', element);
          item.append(Lampa.Timeline.render(view));
          item.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          }).on('hover:enter', function () {
            console.log("这里");
            console.log(element);
            console.log("这里");
            var file = _this4.getFile(element, true);
            console.log(file);
            //file="https://aidi.tv/m3u8/atHiRa0nccHiMw6aLnyg9ltuMoy5haWRpLnR2L20zdTgvc2hhcWl1L3NoYXFpdV8zX0hEMTA4MFAubTN1OAO0O0OO0O0O/4e5cf6197068636ed89d7384388f8d9d/1636696379.m3u8";
            console.log("取得播放地址");

            if (file) {
              _this4.start();

              Lampa.Player.play({
                url: file,
                timeline: view,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              });
              var playlist = [];
              items.forEach(function (elem) {
                playlist.push({
                  title: elem.title,
                  url: _this4.getFile(elem)
                });
              });
              Lampa.Player.playlist(playlist);
            } else {
              Lampa.Noty.show('无法检索链接');
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

    Lampa.Component.add('online', component);
    Lampa.Template.add('button_online', "<div class=\"full-start__button selector view--online\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n<g xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n    <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n</g></svg>\n\n<span>在线观看</span>\n</div>");
    Lampa.Template.add('online', "<div class=\"online selector\">\n    <div class=\"online__body\">\n        <div class=\"online__title\">{title}</div>\n        <div class=\"online__quality\">{quality}</div>\n    </div>\n</div>");
    Lampa.Listener.follow('full', function (e) {
      if (e.type == 'complite') {
        var btn = Lampa.Template.get('button_online');
        btn.on('hover:enter', function () {
          Lampa.Activity.push({
            url: '',
            title: '在线观看',
            component: 'online',
            //search: e.data.movie.title,
            search: e.data.movie.original_title,
            search_one: e.data.movie.title,
            search_two: e.data.movie.original_title,
            movie: e.data.movie,
            page: 1
          });
        });
        e.object.activity.render().find('.view--torrent').after(btn);
      }
    });

})();
