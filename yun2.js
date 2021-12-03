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
      var token = '';
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
      var url;

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
        //var url = 'https://videocdn.tv/api/' + (object.movie.number_of_seasons ? 'tv-series' : 'movies');
        //url = Lampa.Utils.addUrlComponent(url, 'api_token=' + token);
        //url = Lampa.Utils.addUrlComponent(url, 'query=' + encodeURIComponent(object.search));
        //if (object.movie.release_date && object.movie.release_date !== '0000') url = Lampa.Utils.addUrlComponent(url, 'year=' + (object.movie.release_date + '').slice(0, 4));
        
        url = 'https://rentry.co/qptpt/raw';
        network.silent(url, function (json)
		{
          if (json.data && json.data.length) {
            token = json.data[0].t;
            //console.log(token);
            if(object.movie.source == 'yyds'){
                var getid = object.movie.id;
                //console.log(getid);
                url = 'https://cmn.yyds.fans/api/post-info';
                var jsonsearch = {
                    id: getid
                };
            }
            else{
                url = 'https://cmn.yyds.fans/api/posts';
                var jsonsearch = {
                    category_id: "-1",
                    skip: "0",
                    limit: "1",
                    keyword: object.search_one
                };
            };

            network.silent(url, function (json)
            {
              if (json.data.length !==0) {
                if(object.movie.source == 'yyds'){
                    var getid = object.movie.id;
                }
                else{
                    var getid = json.data[0].id;
                };
                
                //console.log(getid);
                url = 'https://cmn.yyds.fans/api/post-info';
                var jsonsearch = {
                    id: getid
                };
                network.silent(url, function (json)
                {
                if (json.data) {
                    //console.log(json.data);
                    var getlink = _this.getFilteredElement(json,"link","aliyundrive");
                    if (getlink.length>0){
                        getlink = getlink[0];
        
                        //console.log("取得阿里云盘分享链接:"+getlink);
                
                        var match = getlink.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/);
                        var getShareId = match ? match[1] : null;
                        //console.log(getShareId);
                
                        url = "https://api.aliyundrive.com/token/refresh";
                        jsonsearch = {
                            refresh_token: token
                        };
                        var p = {
                            dataType : "json",
                            headers: {
                                "content-type": "application/json;charset=utf-8",
                              },
                        };
                        network.silent(url, function (json)
                        {
                        if (json) {
                            var token_refresh = json;
                            
                            //取得file_id
                            url = "https://api.aliyundrive.com/adrive/v3/share_link/get_share_by_anonymous?share_id="+getShareId;
                            jsonsearch = {
                                share_id: getShareId
                            };
                            var p = {
                                dataType : "json",
                                headers: {
                                    "content-type": "application/json;charset=utf-8",
                                },
                            };
                            network.silent(url, function (json)
                            {
                            if (json) {
                                var file_id_json  = json;
                                if (file_id_json.code){
                                _this.empty('哦，该资源已经取消分享');
                                }
                                else{
                                    //console.log(file_id_json.code);
                                    //if (file_id_json.code == "ShareLink.Forbidden"){} ;
                                    var file_id = file_id_json.file_infos[0].file_id;
                                    var file_type = file_id_json.file_infos[0].type;
                                    //console.log(file_id);
                                    //console.log(file_id_json);
            
                                    url = "https://api.aliyundrive.com/v2/share_link/get_share_token";
                                    jsonsearch = {
                                        share_id: getShareId,
                                        share_pwd: ""
                                    };
                                    var p = {
                                        dataType : "json",
                                        headers: {
                                            "content-type": "application/json;charset=utf-8",
                                        },
                                    };
                                    network.silent(url, function (json)
                                    {
                                    if (json) {
                                        var get_share_token  = json;
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
                                            //console.log(get_file_get);
                                            
                                            setTimeout(function() {
                                                _this.getvideopreviewplayinfo(get_file_get.file_id, getShareId, get_share_token.share_token, token_refresh.access_token, function (download_url) {
                                                    get_file_get.download_url = download_url;
                                                    if (get_file_get.category == "video"){
                                                        listlink.data[0].media.push({
                                                            translation_id : get_file_get.download_url,
                                                            max_quality : get_file_get.name,
                                                            title : get_file_get.name.replace("\.mp4","").replace("\.mkv",""),
                                                            //iframe_src : matches[0],
                                                            //translation : mytranslation
                                                            });
                                                    };
                                                    results = listlink.data;
                                                    //console.log(results);
                                                    _this.build();
            
                                                    _this.activity.loader(false);
            
                                                    _this.activity.toggle(); 

                                                });
                                            }, 66);
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
                                                var itemsProcessed = 0;

                                                get_file_list.items.forEach(function (item, index) {
                                                    setTimeout(function() {
                                                    _this.getvideopreviewplayinfo(item.file_id, getShareId, get_share_token.share_token, token_refresh.access_token, function (download_url) {
                                                        item.download_url = download_url;
                                                        itemsProcessed++;
                                                        if (item.category == "video"){
                                                            listlink.data[0].media.push({
                                                                translation_id : item.download_url,
                                                                max_quality : item.name,
                                                                title : item.name.replace("\.mp4","").replace("\.mkv",""),
                                                                //iframe_src : matches[0],
                                                                //translation : mytranslation
                                                                });
                                                        };
                                                        if(itemsProcessed  === get_file_list.items.length) {
                                                                //foreach work done
                                                                results = listlink.data;
                                                                //console.log(results);
                                                                _this.build();
                        
                                                                _this.activity.loader(false);
                        
                                                                _this.activity.toggle(); 
                                                        }
                                                    });
                                                }, 66 * index);
                                                        
                                                });
                                                };
                                                
                                    } else _this.empty('哦，未搜索到该资源 (' + object.search + ')');
                                    }, function (a, c) {
                                    _this.empty('哦: ' + network.errorDecode(a, c));
                                    },JSON.stringify(jsonsearch),p);
                                            
                                    };
                            } else _this.empty('哦，该资源已经取消分享 (' + object.search + ')');
                            }, function (a, c) {
                            _this.empty('哦: ' + network.errorDecode(a, c));
                            },JSON.stringify(jsonsearch),p);

                        } else _this.empty('哦, 阿里云盘Token失效了 (' + object.search + ')');
                        }, function (a, c) {
                        _this.empty('哦: ' + network.errorDecode(a, c));
                        },JSON.stringify(jsonsearch),p);
        
                    }
                    else{
                        _this.empty('哦，该资源还未分享');
                    };
                } else _this.empty('哦，未搜索到该资源 (' + object.search + ')');
                }, function (a, c) {
                _this.empty('哦: ' + network.errorDecode(a, c));
                },jsonsearch);
    
              } else _this.empty('哦，未搜索到该资源 (' + object.search + ')');
            }, function (a, c) {
              _this.empty('哦: ' + network.errorDecode(a, c));
            },jsonsearch);
          } else _this.empty('哦，未找到阿里云盘Token (' + object.search + ')');
        }, function (a, c) {
          _this.empty('哦: ' + network.errorDecode(a, c));
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
        filter.render().find('.filter--sort').remove();
        return this.render();
      };

      this.getFilteredElement = function (jsonresult, key, value) {
        var linkFilter = [];
        jsonresult.data.links.forEach(function(item) {
           var getFilterField = item[key];
           if(getFilterField){
              var keyArray = item[key].split(',');
              if (keyArray[0].indexOf(value) != -1) {
                linkFilter.push(item.link);
              };
          };
        });
        return linkFilter;
      };

      this.getRemote = function (remote_url, type, datatype, data, token) {
        return $.ajax({
          type: type,
          url: remote_url,
          dataType: datatype,
          data: JSON.stringify(data),
          headers: {
            "authorization": "",
            "content-type": "application/json;charset=utf-8",
            "x-share-token": token
          },
          async: false
        }).responseText;
      };

      this.getvideopreviewplayinfo = function (file_id, share_id, shareToken, accesstoken, callback) {
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
        async: true,
        success: function (response) {
            if (response.video_preview_play_info.live_transcoding_task_list.slice(-1)[0].url) {
                callback && callback(response.video_preview_play_info.live_transcoding_task_list.slice(-1)[0].url);
            }
            else {
                console.error("getvideopreviewplayinfo 失败", response);
                callback && callback("");
            }
        },
        error: function (error) {
            console.error("getvideopreviewplayinfo 错误", error);
            callback && callback("");
        }
        });
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

      this.getShareLinkDownloadUrl_ = function (file_id, share_id, shareToken, accesstoken, callback) {
        $.ajax({
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
            async: true,
            success: function (response) {
                if (response.download_url) {
                    callback && callback(response.download_url);
                }
                else {
                    console.error("getShareLinkDownloadUrl 失败", response);
                    callback && callback("");
                }
            },
            error: function (error) {
                console.error("getShareLinkDownloadUrl 错误", error);
                callback && callback("");
            }
        });
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
        var translat = element.translation;
        var link;
        if (translat) {
            return translat;
        }
        if (show_error) Lampa.Noty.show('无法检索链接，阿里云盘token失效。');
      };

      this.append = function (items) {
        var _this4 = this;

        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.translation ? [element.translation, element.quality, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('yunpan2', element);
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
      window.plugin_yunpan2_ready = true;
      Lampa.Component.add('yunpan2', component);
      Lampa.Template.add('button_yunpan2', "<div class=\"full-start__button selector view--online\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n    </g></svg>\n\n    <span>网盘观看</span>\n    </div>");
      Lampa.Template.add('yunpan2', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div class=\"online__title\">{title}</div>\n            <div class=\"online__quality\">yyds.fans / {quality}</div>\n        </div>\n    </div>");
      Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
          var btn = Lampa.Template.get('button_yunpan2');
          btn.on('hover:enter', function () {
            Lampa.Activity.push({
              url: '',
              title: '在线观看',
              component: 'yunpan2',
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

    if (!window.plugin_yunpan2_ready) startPlugin();

})();
