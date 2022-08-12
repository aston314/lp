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
      var getShareId;
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
      var url,jsonsearch;
      
      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
        
        // url = 'http://proxy.cub.watch/cdn/https://rentry.co/qptpt/raw';
        // network.silent(url, function (json)
		// {
        token = Lampa.Storage.get('aliyun_token');
          if (token) {
            //token = json.data[0].t;
            //console.log(token);
            // if(object.movie.source == 'yyds'){
            //     var getid = object.movie.yydsid;
            //     //console.log(getid);
            //     url = 'https://cmn.yyds.fans/api/post-info';
            //     var jsonsearch = {
            //         id: getid
            //     };
            // }
            // else{
            //     url = 'https://cmn.yyds.fans/api/posts';
            //     var jsonsearch = {
            //         category_id: "-1",
            //         skip: "0",
            //         limit: "1",
            //         keyword: object.search_one
            //     };
            // };

            // network.silent(url, function (json)
            // {
            //   if (json.data.length !==0) {
                // if(object.movie.source == 'yyds'){
                //     var getid = object.movie.yydsid;
                // }
                // else{
                //     var getid = json.data[0].id;
                // };
                
                // //console.log(getid);
                // url = 'https://cmn.yyds.fans/api/post-info';
                // var jsonsearch = {
                //     id: getid
                // };
                // network.silent(url, function (json)
                // {
                // if (json.status_code === 200) {
                    //console.log(json.data);
                    var getlink = object.url;
                    //var getlink = json.data.links[2].item[0].link;
                    //console.log(getlink);
                    if (getlink){

                        //getlink = JSON.stringify(getlink);;
        
                        //console.log("取得阿里云盘分享链接:"+getlink);
                
                        var match = getlink.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/);
                        getShareId = match ? match[1] : null;
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
                                            
                                            //setTimeout(function() {
                                              if (get_file_get.category == "video"){
                                                listlink.data[0].media.push({
                                                    translation_id : get_file_get.file_id,
                                                    max_quality : get_file_get.name,
                                                    title : get_file_get.name.replace("\.mp4","").replace("\.mkv",""),
                                                    //iframe_src : matches[0],
                                                    //translation : mytranslation
                                                    });
                                            };
                                            //}, 66);
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
                                                    //setTimeout(function() {
                                                    if (item.category == "video"){
                                                            listlink.data[0].media.push({
                                                                translation_id : item.file_id,
                                                                max_quality : item.name,
                                                                title : item.name.replace("\.mp4","").replace("\.mkv",""),
                                                                //iframe_src : matches[0],
                                                                //translation : mytranslation
                                                                });
                                                        };
                                                //}, 66 * index);
                                                });
                                                };
                                                results = listlink.data;
                                                //console.log(results);
                                                _this.build();
        
                                                _this.activity.loader(false);
        
                                                _this.activity.toggle(); 
                                                
                                    } else _this.empty('哦，未搜索到该资源 (' + object.movie.title + ')');
                                    }, function (a, c) {
                                    _this.empty('哦: ' + network.errorDecode(a, c));
                                    },JSON.stringify(jsonsearch),p);
                                            
                                    };
                            } else _this.empty('哦，该资源已经取消分享。');
                            }, function (a, c) {
                            _this.empty('哦: ' + network.errorDecode(a, c));
                            },JSON.stringify(jsonsearch),p);

                        } else _this.empty('哦, 阿里云盘Token失效了，请在设置中重新填写。');
                        }, function (a, c) {
                        _this.empty('哦: ' + network.errorDecode(a, c));
                        },JSON.stringify(jsonsearch),p);
        
                    }
                    else{
                        _this.empty('哦，该资源还未分享');
                    };
                // } else _this.empty('哦，未搜索到该资源 (' + object.search + ')');
                // }, function (a, c) {
                // _this.empty('哦: ' + network.errorDecode(a, c));
                // },jsonsearch);
    
            //   } else _this.empty('哦，未搜索到该资源 (' + object.search + ')');
            // }, function (a, c) {
            //   _this.empty('哦: ' + network.errorDecode(a, c));
            // },jsonsearch);
          } else _this.empty('哦，未找到阿里云盘Token，请在设置中填写。');
        // }, function (a, c) {
        //   _this.empty('哦: ' + network.errorDecode(a, c));
        // });
        

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
           //console.log(getFilterField);
           if(getFilterField){
              var keyArray = item[key].split(',');
              //console.log(keyArray);
              if (keyArray[0].indexOf(value) != -1) {
                //console.log(item)

                linkFilter.push(item);
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
        $(".scroll").find(".torrent-filter").remove();
      };

      this.reset = function () {
        last = false;
        filter.render().detach();
        scroll.clear();
      };

      this.getFile = function (element, show_error) {
        var translat = element.translation;
        // var jsonresult = $.parseJSON(this.getRemote("http://proxy.cub.watch/cdn/https://rentry.co/qptpt/raw","GET","json","",""));
        // token = jsonresult.data[0].t;
        token = Lampa.Storage.get('aliyun_token');

        url = "https://api.aliyundrive.com/token/refresh";
        jsonsearch = {
            refresh_token: token
        };
        //accesstoken
        var token_refresh  = $.parseJSON(this.getRemote(url,"POST","json",jsonsearch,""));
        
        Lampa.Storage.set('aliyun_token', token_refresh.refresh_token);

        url = "https://api.aliyundrive.com/v2/share_link/get_share_token";
        var jsonsearch = {
            share_id: getShareId,
            share_pwd: ""
        };
        var get_share_token  = $.parseJSON(this.getRemote(url,"POST","json",jsonsearch,""));

        var get_download_url = this.getShareLinkDownloadUrl(translat, getShareId, get_share_token.share_token, token_refresh.access_token);
        var get_download_url = $.parseJSON(get_download_url).download_url;

        //https://api.aliyundrive.com/v2/share_link/get_share_token
        //http://81.68.244.5/tv/alitk
        //https://api.aliyundrive.com/token/refresh
        //https://api.aliyundrive.com/v2/file/get_share_link_video_preview_play_info
        if (get_download_url) {
            return get_download_url;
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
            if (Lampa.Helper) Lampa.Helper.show('aliyun_detail', '用mpv播放视频，在mpv.conf中添加 referrer="https://www.aliyundrive.com/"', item);
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

            //   var playlist = [];
            //   var first = {
            //     url: file,
            //     timeline: view,
            //     title: element.season ? element.title : object.movie.title + ' / ' + element.title+ ' / ' + element.quality
            //   };
            //   Lampa.Player.play(first);
            //   //object.movie.number_of_seasons!== 'undefined' element.season
            //   if (element.season) {
            //     items.forEach(function (elem) {
            //       console.log(elem)
            //       console.log("elem")
            //       playlist.push({
            //         title: elem.quality+ ' / ' +elem.title,
            //         url: _this4.getFile(elem)
            //       });
            //     });
            //   } else {
            //     playlist.push(first);
            //   }

            //   Lampa.Player.playlist(playlist);
                if (window.intentShim) {
                    window.plugins.intentShim.startActivity(
                        {
                            action: window.plugins.intentShim.ACTION_VIEW,
                            package: "is.xyz.mpv", //setPackage
                            url: file,
                            type: 'video/mp4',
                            extras: {
                                'http-header-fields': 'referer:https://www.aliyundrive.com/'
                            }
                        },
                        function () { },
                        function () { console.log('Failed to open URL via Android Intent') }
                    );
                } else {
                    Lampa.Noty.show('请在在安卓平台上，使用MPV播放器播放该视频。');
                };
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
      Lampa.Template.add('yunpan2', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div class=\"online__title\">{title}</div>\n            <div class=\"online__quality\">阿里云盘 / {quality}</div>\n        </div>\n    </div>");
    //   Lampa.Listener.follow('full', function (e) {
    //     if (e.type == 'complite') {
    //       var btn = Lampa.Template.get('button_yunpan2');
    //       btn.on('hover:enter', function () {
    //         Lampa.Activity.push({
    //           url: '',
    //           title: '在线观看',
    //           component: 'yunpan2',
    //           search: e.data.movie.title,
    //           search_one: e.data.movie.title,
    //           search_two: e.data.movie.original_title,
    //           movie: e.data.movie,
    //           page: 1
    //         });
    //       });
    //       e.object.activity.render().find('.view--torrent').after(btn);
    //     }
    //   });
    }

    if (!window.plugin_yunpan2_ready) startPlugin();
    Lampa.Params.select('aliyun_token', '', '');
    Lampa.Template.add('settings_mod_aliyun', "<div>\n <div class=\"settings-param selector\" data-name=\"aliyun_token\" data-type=\"input\" placeholder=\"例如: nxjekeb57385b..\"> <div class=\"settings-param__name\">手动添加 Refresh token </div> <div class=\"settings-param__value\">例如: nxjekeb57385b..</div> <div class=\"settings-param__descr\">填写Refresh token</div> </div>\n \n    <div class=\"settings-param selector\" data-name=\"aliyun_qr\" data-static=\"true\">\n        <div class=\"settings-param__name\">扫码获取Refresh token</div>\n    </div>\n</div>");
    Lampa.Listener.follow('app', function (e) {
      if (e.type == 'ready' && Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="mod_aliyun"]').length) {
        var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"mod_aliyun\">\n            <div class=\"settings-folder__icon\">\n                <svg width=\"36px\" height=\"36px\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\"><path d=\"M959.2 383.9c-0.3 -82.1 -66.9 -148.6 -149.1 -148.6H575.9l21.6 85.2 201 43.7a42.58 42.58 0 0 1 32.9 39.7c0.1 0.5 0.1 216.1 0 216.6a42.58 42.58 0 0 1 -32.9 39.7l-201 43.7 -21.6 85.3h234.2c82.1 0 148.8 -66.5 149.1 -148.6V383.9zM225.5 660.4a42.58 42.58 0 0 1 -32.9 -39.7c-0.1 -0.6 -0.1 -216.1 0 -216.6 0.8 -19.4 14.6 -35.5 32.9 -39.7l201 -43.7 21.6 -85.2H213.8c-82.1 0 -148.8 66.4 -149.1 148.6V641c0.3 82.1 67 148.6 149.1 148.6H448l-21.6 -85.3 -200.9 -43.9zm200.9 -158.8h171v21.3h-171z\" fill=\"white\"/></svg>\n            </div>\n            <div class=\"settings-folder__name\">阿里云盘</div>\n        </div>"));
        Lampa.Settings.main().render().find('[data-component="more"]').after(field);
        Lampa.Settings.main().update();
      }
    });
    var network = new Lampa.Reguest();
    var ping_auth;
    var i = void 0;
    var c = "";

    Lampa.Settings.listener.follow('open', function (e) {
        if (e.name == 'mod_aliyun') {
            e.body.find('[data-name="aliyun_qr"]').unbind('hover:enter').on('hover:enter', function () {
                var modal = $('<div><div class="broadcast__text">请用阿里云盘 App 扫码</div><div class="broadcast__device selector" style="text-align: center;"><div id="qrcode-container"  style="display: flex; justify-content: center; align-items: center;"></div></div><div class="broadcast__scan"><div></div></div></div></div>');
                Lampa.Modal.open({
                    title: '',
                    html: modal,
                    onBack: function onBack() {
                        Lampa.Modal.close();
                        Lampa.Controller.toggle('settings_component');
                        //clearInterval(ping_auth);
                        clearInterval(i);
                    },
                });
                ping_auth = setTimeout(function () {
                    network.clear();
                    network.timeout(10000);
                    network.quiet('https://passport.aliyundrive.com/newlogin/qrcode/generate.do?appName=aliyun_drive&fromSite=52&appName=aliyun_drive&appEntrance=web&_csrf_token=X5vxoYz2z12UalF5Sw5DG6&umidToken=1112cd325b4b833b2c397da867e6b7e3865c9aaa&isMobile=true&lang=zh_CN&returnUrl=&hsiz=1f59a0289eb8d12691c959648e423ace&fromSite=52&bizParams=&_bx-v=2.0.31', function (found) {
                        if (found.content.success) {
                            c = found.content.data;
                            if (typeof QRCode == 'undefined') {
                                $.loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js', function () {
                                    //Stuff to do after someScript has loaded   
                                    var qrc = new QRCode(
                                        document.getElementById("qrcode-container"),
                                        found.content.data.codeContent
                                    );
                                    i = setInterval(getcode, 2500);
                                })
                            } else {
                                var qrc = new QRCode(
                                    document.getElementById("qrcode-container"),
                                    found.content.data.codeContent
                                );
                                i = setInterval(getcode, 2500);
                            };
                        } else {
                            Lampa.Noty.show(found);
                        }
                    }, function (a, c) {
                        Lampa.Noty.show(network.errorDecode(a, c));
                    });
                }, 200);
            });

        }
    });

    jQuery.loadScript = function (url, callback) {
        jQuery.ajax({
            url: url,
            dataType: 'script',
            success: callback,
            async: true
        });
    };

    function getcode() {
        network.clear();
        network.timeout(10000);
        network.quiet("https://passport.aliyundrive.com/newlogin/qrcode/query.do", function (found) {
            if (["EXPIRED", "CANCELED"].includes(found.content.data.qrCodeStatus)) {
                clearInterval(i);
                $('#qrcode-container').text('二维码已失效');
            } else {
                if (["CONFIRMED"].includes(found.content.data.qrCodeStatus)) {
                    clearInterval(i);
                    var resultjson = JSON.parse(atob(found.content.data.bizExt));
                    Lampa.Storage.set("aliyun_token", resultjson.pds_login_result.refreshToken);
                    $('.settings [data-name="aliyun_token"] .settings-param__value').text(resultjson.pds_login_result.refreshToken);
                    Lampa.Modal.close();
                    Lampa.Controller.toggle('settings_component');
                }
            }
        }, function (a, c) {
            Lampa.Noty.show(network.errorDecode(a, c));
        }, {
            ck: c.ck,
            t: c.t,
            appName: 'aliyun_drive',
            fromSite: '52',
            "_bx-v": '2.0.31'
        });
    }
})();
