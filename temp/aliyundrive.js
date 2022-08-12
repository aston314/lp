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
      var token = 'd21f21a35da7486b9628596fbbbed7e9';
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

      var doreg = {};
      var doregjson = {};
      //var xhr = new XMLHttpRequest();
      var resp;
      var search_videos;
      var find_videos;
      var obj = {
        file_page: {
            parent_file_id: "root",
            token_type: "",
            access_token: "",
            items: []
        },
      };
      var newXHR = null;
      
      
      //console.log(doreg.search_url);

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
        var url = 'https://videocdn.tv/api/' + (object.movie.number_of_seasons ? 'tv-series' : 'movies');
        url = Lampa.Utils.addUrlComponent(url, 'api_token=' + token);
        url = Lampa.Utils.addUrlComponent(url, 'query=' + encodeURIComponent(object.search));
        if (object.movie.release_date && object.movie.release_date !== '0000') url = Lampa.Utils.addUrlComponent(url, 'year=' + (object.movie.release_date + '').slice(0, 4));
        
        //取得token
        //obj.file_page.access_token || _this.tokenRefresh();

        var jsonsearch = {
            category_id: "-1",
            skip: "0",
            limit: "1",
            keyword: object.search_one
        };
        //console.log($.parseJSON(_this.getRemote("https://cmn.yyds.fans/api/posts","POST","json",jsonsearch,"")));
        var jsonresult = $.parseJSON(_this.getRemote("https://cmn.yyds.fans/api/posts","POST","json",jsonsearch,""));
        
        if (!jsonresult.data.length){
         _this.empty('哦，未搜索到该资源');
        }
        else{
        var getid = jsonresult.data[0].id;
        //console.log(getid);

        jsonsearch = {
            id: getid
        };
        //console.log($.parseJSON(_this.getRemote("https://cmn.yyds.fans/api/post-info","POST","json",jsonsearch,"")));
        jsonresult = $.parseJSON(_this.getRemote("https://cmn.yyds.fans/api/post-info","POST","json",jsonsearch,""));
        //var getlink = jsonresult.data.links[0].link;
        //console.log(jsonresult.data.links.find(element => element.link.includes("aliyundrive")));
        var getlink = jsonresult.data.links.find(element => element.link.includes("aliyundrive"))
        if (getlink){
            getlink = getlink.link;
        
        //console.log("取得阿里云盘分享链接:"+getlink);

        var match = getlink.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/);
        var getShareId = match ? match[1] : null;
        //console.log(getShareId);

        /*url = "https://api.aliyundrive.com/v2/file/get_video_preview_play_info";
        var jsonsearch = {
            drive_id: "50101781",
            file_id: "619da957d1d4ce10d20b49fbb5921020a2085832",
            category: "live_transcoding",
            template_id: ""
        };

        //preview_play_info
        var preview_play_info  = $.parseJSON(_this.getRemote(url,"POST","json",jsonsearch,""));
        _this.sendXHR("POST", url, JSON.stringify(jsonsearch),"", function(response) {
          var preview_play_info = JSON.parse(response);
          console.log(preview_play_info);
          console.log("播放地址");
        });*/

        url = "https://api.aliyundrive.com/token/refresh";
        jsonsearch = {
            refresh_token: token
        };
        //accesstoken
        var token_refresh  = $.parseJSON(_this.getRemote(url,"POST","json",jsonsearch,""));
        //console.log("取得access_tocken:");
        //console.log(token_refresh.access_token);


        //取得file_id
        url = "https://api.aliyundrive.com/adrive/v3/share_link/get_share_by_anonymous?share_id="+getShareId;
        jsonsearch = {
            share_id: getShareId
        };
        
        var file_id_json  = $.parseJSON(_this.getRemote(url,"POST","json",jsonsearch,""));
        if (file_id_json.code){
          _this.empty('哦，该资源已经取消分享');
        }
        else{
        console.log(file_id_json.code);
        //if (file_id_json.code == "ShareLink.Forbidden"){} ;
        var file_id = file_id_json.file_infos[0].file_id;
        var file_type = file_id_json.file_infos[0].type;
        //console.log(file_id);
        console.log(file_id_json);

        url = "https://api.aliyundrive.com/v2/share_link/get_share_token";
        jsonsearch = {
            share_id: getShareId,
            share_pwd: ""
        };
        var get_share_token  = $.parseJSON(_this.getRemote(url,"POST","json",jsonsearch,""));
        console.log(get_share_token);
                  
                  if(file_type=='file'){
                      url = "https://api.aliyundrive.com/v2/file/get";
                      jsonsearch = {
                          share_id: getShareId,
                          file_id: file_id,
                          fields: "*",
                          image_thumbnail_process: "image/resize,w_400/format,jpeg",
                          image_url_process: "image/resize,w_375/format,jpeg",
                          video_thumbnail_process: "video/snapshot,t_1000,f_jpg,ar_auto,w_375"
                        };
                       var get_file_get  = $.parseJSON(_this.getRemote(url,"POST","json",jsonsearch,get_share_token.share_token));
                       console.log(get_file_get);
                       var get_download_url = _this.getShareLinkDownloadUrl(get_file_get.file_id, getShareId, get_share_token.share_token, token_refresh.access_token);
                            get_download_url = $.parseJSON(get_download_url).download_url;

                                listlink.data[0].media.push({
                                translation_id : get_download_url,
                                max_quality : get_file_get.name,
                                title : get_file_get.name.replace("\.mp4",""),
                                //iframe_src : matches[0],
                                //translation : mytranslation
                                });

                  }else{
                      url = "https://api.aliyundrive.com/adrive/v3/file/list";
                      jsonsearch = {
                          share_id: getShareId,
                          parent_file_id: file_id,
                          limit: 100,
                          image_thumbnail_process: "image/resize,w_160/format,jpeg",
                          image_url_process: "image/resize,w_1920/format,jpeg",
                          video_thumbnail_process: "video/snapshot,t_1000,f_jpg,ar_auto,w_300",
                          order_by: "name",
                          order_direction: "ASC"
                        };

                      var get_file_list  = $.parseJSON(_this.getRemote(url,"POST","json",jsonsearch,get_share_token.share_token));
                          //console.log(obj.file_page.access_token);
                          //console.log("看看");
                          get_file_list.items.forEach(function (item) {
                            if (item.category !== "video") return false;
                            var get_download_url = _this.getShareLinkDownloadUrl(item.file_id, getShareId, get_share_token.share_token, token_refresh.access_token);
                            //var get_video_preview_play_info = _this.getvideopreviewplayinfo(item.file_id, getShareId, get_share_token.share_token, token_refresh.access_token);
                            get_download_url = $.parseJSON(get_download_url).download_url;

                                listlink.data[0].media.push({
                                translation_id : get_download_url,
                                max_quality : item.name,
                                title : item.name.replace("\.mp4","").replace("\.mkv",""),
                                //iframe_src : matches[0],
                                //translation : mytranslation
                                });

                          });

                          console.log(get_file_list);
                        };

                          results = listlink.data;
                          //console.log(JSON.stringify(results));
                          //console.log("JSON.stringify(results)");
                          _this.build();

                          _this.activity.loader(false);

                          _this.activity.toggle(); 

              //});

              
        //});
          };
        }
        else{
            _this.empty('哦，该资源还未分享');
        };
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

        this.getRemote_ = function (remote_url,type,datatype,data) {
        //this.getRemote = function (remote_url) {
         return $.ajax({
            type: type,
            //contentType: "application/json; charset=utf-8",
            url: remote_url,
            dataType:datatype,
            data:data,
            async: false
         }).responseText;
        };

        this.getRemote = function (remote_url,type,datatype,data,token) {
         return $.ajax({
            type: type,
            url: remote_url,
            dataType:datatype,
            data:JSON.stringify(data),
            headers: {
                "authorization": "",
                "content-type": "application/json;charset=utf-8",
                "x-share-token": token
            },
            async: false
         }).responseText;
        };

/*        this.sendXHR = function (type, url, data, token, callback) {
          newXHR = new XMLHttpRequest();
          newXHR.open(type, url, true);
          newXHR.setRequestHeader("Content-Type", "application/json");
          newXHR.setRequestHeader("x-share-token", token);
          newXHR.send(data);
          newXHR.onreadystatechange = function() {
            if (this.status === 200 && this.readyState === 4) {
              callback(this.response);
            }
          };
        };*/

        this.getvideopreviewplayinfo = function (file_id, share_id, shareToken, accesstoken) {
        return $.ajax({
            type: "post",
            url: "https://api.aliyundrive.com/v2/file/get_share_link_video_preview_play_info",
            data: JSON.stringify({
                file_id: file_id,
                category: "live_transcoding",
                share_id: share_id,
                template_id: "",
                get_preview_url: true
            }),
            headers: {
                "authorization": "".concat("Bearer" || "", " ").concat(accesstoken || ""),
                "content-type": "application/json;charset=utf-8",
                "x-share-token": shareToken
            },
            async: false
        }).responseText;;
      };

        this.getShareLinkDownloadUrl = function (file_id, share_id, shareToken, accesstoken) {
        return $.ajax({
            type: "post",
            url: "https://api.aliyundrive.com/v2/file/get_share_link_download_url",
            data: JSON.stringify({
                expire_sec: 600,
                file_id: file_id,
                share_id: share_id
            }),
            headers: {
                "authorization": "".concat("Bearer" || "", " ").concat(accesstoken || ""),
                "content-type": "application/json;charset=utf-8",
                "x-share-token": shareToken
            },
            async: false
        }).responseText;;
      };

      /*this.tokenRefresh = function (callback) {
       //var token = obj.getItem("token"), refresh_token = token.refresh_token;
        var refresh_token = "d21f21a35da7486b9628596fbbbed7e9";
        if (!refresh_token) {
            callback && callback("");
            return;
        }
        $.ajax({
            type: "post",
            url: "https://api.aliyundrive.com/token/refresh",
            data: JSON.stringify({
                refresh_token: refresh_token
            }),
            headers: {
                "Content-type": "application/json;charset=utf-8",
            },
            success: function (response) {
                if (response && response.access_token) {
                    obj.file_page.token_type = response.token_type;
                    obj.file_page.access_token = response.access_token;
                    console.log(response.access_token);
                    console.log(response.token_type);
                    console.log("response.access_token");

                    callback && callback(response);
                }
                else {
                    callback && callback("");
                }
            },
            error: function () {
                callback && callback("");
            }
        });
      };*/

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
          
          /*console.log(results.slice(0, 1));
          console.log("results");*/
          results.slice(0, 1).forEach(function (movie) {
              /*console.log(movie);
              console.log("movie");*/
            movie.media.forEach(function (element) {
              /*console.log(element);
              console.log("element");*/
              filtred.push({
                title: element.title,
                quality: element.max_quality ,
                translation: element.translation_id
              });
              /*console.log(filtred);
              console.log("filtred");*/
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
        /*console.log(element.translation);
        console.log("element.translation");*/
        //var translat = extract[element.translation];
        var translat = element.translation;
        /*console.log(translat);
        console.log("translat");*/
        //var link;
        //console.log(item.Link);
        //取得播放地址
        if (translat) {

/*          function getRemote(remote_url) {
             return $.ajax({
                type: "GET",
                url: remote_url,
                async: false
             }).responseText;
          };*/
          console.log("translat");
          console.log(translat);
          console.log("translat");

            return translat;
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
          var hash = Lampa.Utils.hash(element.translation ? [element.translation, element.quality, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('aliyundrive', element);
          item.append(Lampa.Timeline.render(view));
          item.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          }).on('hover:enter', function () {
            if(object.movie.id) Lampa.Favorite.add('history', object.movie, 100)
/*            console.log("这里");
            console.log(element);
            console.log("这里");*/
            var file = _this4.getFile(element, true);
            /*console.log(file);
            console.log("取得播放地址");*/

            /*if (file) {
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
            } else {*/
            if (file) {
              _this4.start();

              var playlist = [];
              var first = {
                url: file,
                timeline: view,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title+ ' / ' + element.quality
              };
              Lampa.Player.play(first);
              //object.movie.number_of_seasons!== 'undefined' element.season
              if (element.season) {
                items.forEach(function (elem) {
                  console.log(elem)
                  console.log("elem")
                  playlist.push({
                    title: elem.quality+ ' / ' +elem.title,
                    url: _this4.getFile(elem)
                  });
                });
              } else {
                playlist.push(first);
              }

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

    function startPlugin() {
      window.plugin_aliyundrive_ready = true;
      Lampa.Component.add('aliyundrive', component);
      Lampa.Template.add('button_aliyundrive', "<div class=\"full-start__button selector view--online\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n    </g></svg>\n\n    <span>网盘观看</span>\n    </div>");
      Lampa.Template.add('aliyundrive', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div class=\"online__title\">{title}</div>\n            <div class=\"online__quality\">yyds.fans / {quality}</div>\n        </div>\n    </div>");
      Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
          var btn = Lampa.Template.get('button_aliyundrive');
          btn.on('hover:enter', function () {
            Lampa.Activity.push({
              url: '',
              title: '网盘观看',
              component: 'aliyundrive',
              search: e.data.movie.title,
              search_one: e.data.movie.title,
              search_two: e.data.movie.original_title,
              movie: e.data.movie,
              page: 1
            });
          });
          e.object.activity.render().find('.view--torrent').after(btn);
        }
      });
    }

    if (!window.plugin_aliyundrive_ready) startPlugin();

})();
