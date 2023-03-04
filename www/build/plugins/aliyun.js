(function () {
    'use strict';
  var firstlogin = false;
  function component(object) {
    var network = new Lampa.Reguest();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true
    });
    var files = new Lampa.Files(object);
    var filter = new Lampa.Filter(object);
    var extract = {};
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
    var token = '';
    var getShareId;
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
    var url, jsonsearch;
    var contextmenu_all = [];

    this.order = [{title: '原始顺序', id: 'normal'}, 
		              {title: '倒序', id: 'invers'}];  
    this.create = function () {
        var _this = this;

        var deviceId = _this.generateUUID();
        var nonce = 0;
        // console.log(deviceId)

        

        this.activity.loader(true);
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));

        token = Lampa.Storage.get('aliyun_token');
        if (token) {
          var getlink = object.url;
          //console.log(getlink);
          if (getlink) {
            //console.log("取得阿里云盘分享链接:"+getlink);
            var match = getlink.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/);
            getShareId = match ? match[1] : null;
            var _file_id = '';
            //console.log(getShareId);
            url = "https://auth.aliyundrive.com/v2/account/token";
            jsonsearch = {
              refresh_token: token,
              grant_type: 'refresh_token'
            };
            var p = {
              dataType: "json",
              headers: {
                "content-type": "application/json;charset=utf-8",
              },
            };
            network.silent(url, function (json) {
              if (json) {
                if (getShareId === null) {
                  //console.log(json)
                  //$('.files__left').hide();
                  if (object.movie.img == './img/img_broken.svg') {
                    $(".full-start__poster").after('<div class="broadcast__scan"><div></div></div>');
                    var reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5\d+|\/]+/;
                    // network.silent('https://filebox-douban.vercel.app/api/search?keyword=' + encodeURIComponent(object.movie.title.replace(/《|【|》|】|\./g, ' ').match(reg)[0] ), function (json) {
                    //   if (json.length > 0) { $(".full-start__img").attr('src', json[0].cover_url) };
                    //   $('.broadcast__scan').remove();
                    // }, function (a, c) {
                    //   //Lampa.Noty.show(network.errorDecode(a, c));
                    // }, false, {
                    //   dataType: 'json'
                    // });
                    var chinese_title = object.movie.title.replace(/4K|《|【|》|】|\./g, ' ').match(reg) ? object.movie.title.replace(/4K|《|【|》|】|\./g, ' ').match(reg)[0] : object.movie.title;
                    network.silent('https://www.laodouban.com/s?c=' + encodeURIComponent(chinese_title), function (json) {
                      var poster_douban = $('div:last-child > div.haibao > a > img', json).attr('src');
                      var rating_douban = $('div:last-child > div.wenzi.d-flex.flex-column.justify-content-between > div.xia.text-muted.d-flex.align-items-center > span.fen.pl-1', json).text();
                      if (rating_douban){
                        //$(".files__title").append("<br/> <br/> 豆瓣："+rating_douban);
                        $(".full-start__poster").after('<div class="card__type" style="left:1em;top:70">豆瓣：'+ rating_douban +'</div>');
                      };
                      if (poster_douban) {
                        $(".full-start__img").attr('src', poster_douban)
                      };
                      $('.broadcast__scan').remove();
                    }, function (a, c) {
                      //Lampa.Noty.show(network.errorDecode(a, c));
                    }, false, {
                      dataType: 'text'
                    });
                  };
                  var signature_ = _this.get_signature(deviceId,json.user_id,nonce);
                  // console.log(signature_)
                  var signature = JSON.parse(signature_).signature;
                  var publickey  = JSON.parse(signature_).publicKey;
                  // console.log(publickey,(nonce ==0))

                 var requestURL = `https://api.aliyundrive.com/users/v1/users/device/${nonce != 0 ? 'renew_session' : 'create_session'}`;
                var dataJSON = {};

                dataJSON["deviceName"] = "Edge浏览器";
                dataJSON["modelName"] = "Windows网页版";
                dataJSON["pubKey"] = publickey;
                // // // if (nonce == 0){
                // $.ajax({
                //     url: requestURL,
                //     data: JSON.stringify(dataJSON),
                //     type: "POST",
                //     dataType: "json",
                //     contentType: "application/json;charset=utf-8",
                //     headers: {
                //     "authorization": "Bearer "+ json.access_token +"",
                //     "origin": "https://www.aliyundrive.com",
                //     "referer": "https://www.aliyundrive.com/",
                //     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41",
                //     "x-canary": "client=web,app=adrive,version=v3.17.0",
                //     "x-device-id": deviceId,
                //     "x-signature": signature,
                //    },
                //     success: function(returnData){
                //         console.log(returnData);
                //     },
                //     error: function(xhr, ajaxOptions, thrownError){
                //         console.log(xhr.status);
                //         console.log(thrownError);
                //     }
                // });

                // var requestURL = `https://aliyun-1-c3851719.deta.app/api/create_session`;
                // var dataJSON = {};

                // dataJSON["appId"] = "5dde4e1bdf9e4966b387ba58f4b3fdc3";
                // dataJSON["deviceId"] = deviceId;
                // dataJSON["userId"] = json.user_id;
                // dataJSON["nonce"] = 0;
                // dataJSON["accessToken"] = json.access_token;
                // // // if (nonce == 0){
                // $.ajax({
                //     url: requestURL,
                //     data: JSON.stringify(dataJSON),
                //     type: "POST",
                //     dataType: "json",
                //     contentType: "application/json;charset=utf-8",
                //     success: function(returnData){
                //         console.log(returnData);
                //     },
                //     error: function(xhr, ajaxOptions, thrownError){
                //         console.log(xhr.status);
                //         console.log(thrownError);
                //     }
                // });
                
              //   const headers = {
              //     "authorization": "Bearer "+ json.access_token +"",
              //     "origin": "https://www.aliyundrive.com",
              //     "referer": "https://www.aliyundrive.com/",
              //     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41",
              //     "x-canary": "client=web,app=adrive,version=v3.17.0",
              //     "x-device-id": deviceId,
              //     "x-signature": signature,
              // };

              //   $.loadScript('https://cdn.jsdelivr.net/npm/axios@1.3.4/dist/axios.min.js', function () {
              //     axios.post(
              //       "https://api.aliyundrive.com/users/v1/users/device/create_session",
              //       {
              //           "deviceName": "Edge浏览器",
              //           "modelName": "Windows网页版",
              //           "pubKey": publickey,
              //       },
              //       {
              //           headers: headers,
              //       }
              //   ).then((response) => {
              //       console.log(response.data);
              //   }).catch((error) => {
              //       console.error(error);
              //   });

              //   })
              if (!!window.cordova) {
                cordovaFetch(requestURL, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    name: 'Hubot',
                    login: 'hubot',
                  })
                })
              } else {
                network.silent(requestURL, function (result) {
                }, false,JSON.stringify(dataJSON), {
                  //dataType: 'text',
                  dataType: "json",
                contentType: "application/json;charset=utf-8",
                headers: {
                "authorization": "Bearer "+ json.access_token +"",
                "origin": "https://www.aliyundrive.com",
                "referer": "https://www.aliyundrive.com/",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41",
                "x-canary": "client=web,app=adrive,version=v3.17.0",
                "x-device-id": deviceId,
                "x-signature": signature,
               }
              });
            }

              
                nonce++;

                  // console.log(json)
                  var get_list = $.parseJSON(_this.get_file_(getlink, json.default_drive_id, json.access_token, deviceId, signature));
                  //console.log(get_list)
                  if (get_list.message && get_list.message == 'invalid X-Device-Id') {
                    Lampa.Noty.show('阿里云盘访问错误：invalid X-Device-Id');
                  } else {
                    get_list.items.forEach(function (item, index) {
                      //setTimeout(function() {
                      if (item.category == "video" || item.type == "folder") {
                        listlink.data[0].media.push({
                          translation_id: item.file_id,
                          max_quality: item.category == "video" ? item.name.substr(item.name.lastIndexOf('.') + 1).toUpperCase() + ' / ' + get_size(item.size) : '文件夹',
                          title: item.name.replace("\.mp4", "").replace("\.mkv", ""),
                          type: item.type,
                          drive_id: item.drive_id,
                          file_id: item.file_id,
                          share_id: item.share_id
                          //iframe_src : matches[0],
                          //translation : mytranslation
                        });
                      };
                      //}, 66 * index);
                    });
                    results = listlink.data;
                    //console.log(results[0].translations.length);
                    _this.build();
                  };

                  _this.activity.loader(false);

                  _this.activity.toggle();
                }
              else{
                var token_refresh = json;
                //Lampa.Storage.set('aliyun_token', json.refresh_token);
                //console.log(json)

                //取得file_id
                url = "https://api.aliyundrive.com/adrive/v3/share_link/get_share_by_anonymous?share_id=" + getShareId;
                jsonsearch = {
                  share_id: getShareId
                };
                var p = {
                  dataType: "json",
                  headers: {
                    "content-type": "application/json;charset=utf-8",
                  },
                };
                network.silent(url, function (json) {
                  if (json) {
                    var file_id_json = json;
                    if (file_id_json.code) {
                      _this.empty('哦，该资源已经取消分享');
                    }
                    else {

                      //console.log(file_id_json.code);
                      //if (file_id_json.code == "ShareLink.Forbidden"){} ;
                      var file_id = file_id_json.file_infos[0].file_id;
                      var file_type = file_id_json.file_infos[0].type;
                      if (object.movie.img == './img/img_broken.svg') {
                        $(".full-start__poster").after('<div class="broadcast__scan"><div></div></div>');
                        object.movie.title = '推送：'+(file_id_json.file_infos[0].file_name||file_id_json.file_infos[0]);
                        //var reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5\d+|a-zA-Z|\/]+/;
                        var reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5|\d+|\/]+/;
                        var foldername = (file_id_json.file_infos[0].file_name.match(reg)[0] ? file_id_json.file_infos[0].file_name.match(reg)[0] : file_id_json.file_infos[0]).replace(/4K|《|【|》|】|\./g, ' ');
                        network.silent('https://m.douban.com/search/?query=' + encodeURIComponent(foldername.match(reg) ? foldername.match(reg)[0] : foldername), function (json) {
                          // var poster_douban = $('div:first-child > div.haibao > a > img', json).attr('src');
                          // var rating_douban = $('div:first-child > div.wenzi.d-flex.flex-column.justify-content-between > div.xia.text-muted.d-flex.align-items-center > span.fen.pl-1', json).text();
                          var poster_douban = $('.search-results-modules-name:contains(电影) + ul > li:nth-child(1) > a > img', json).attr('src');
                          var rating_douban = $('.search-results-modules-name:contains(电影) + ul > li:nth-child(1) > a > div > p > span:nth-child(2)', json).text();
                          if (rating_douban) {
                            //$(".files__title").append("<br/> <br/> 豆瓣："+rating_douban);
                            $(".full-start__poster").after('<div class="card__type" style="left:1em;top:70">豆瓣：' + rating_douban + '</div>');
                          };
                          if (poster_douban) {
                            $(".full-start__img").attr('src', poster_douban);
                            object.movie.img = poster_douban;
                          };
                          $('.broadcast__scan').remove();
                        }, function (a, c) {
                          //Lampa.Noty.show(network.errorDecode(a, c));
                        }, false, {
                          dataType: 'text'
                        });
                      };
                      //if (object.title == '阿里云盘播放') {
                        $(".files__title").text(file_id_json.file_infos[0].file_name);
                        
                      // } 
                      // else {
                      //   // if (object.movie.img == './img/img_broken.svg') {
                      //   //   $(".full-start__poster").after('<div class="broadcast__scan"><div></div></div>');
                      //   //   var reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5\d+|a-zA-Z|\/]+/;
                      //   //   network.silent('https://filebox-douban.vercel.app/api/search?keyword=' + encodeURIComponent(file_id_json.file_infos[0].file_name.match(reg)[0] ? file_id_json.file_infos[0].file_name.match(reg)[0] : file_id_json.file_infos[0]), function (json) {
                      //   //     if (json.length > 0) { $(".full-start__img").attr('src', json[0].cover_url) };
                      //   //     $('.broadcast__scan').remove();
                      //   //   }, function (a, c) {
                      //   //     //Lampa.Noty.show(network.errorDecode(a, c));
                      //   //   }, false, {
                      //   //     dataType: 'json'
                      //   //   });
                      //   // };
                      //   $(".files__title-original").text(file_id_json.file_infos[0].file_name);
                      // };
                      //console.log(file_id);
                      //console.log(file_id_json);
                      url = "https://api.aliyundrive.com/v2/share_link/get_share_token";
                      jsonsearch = {
                        share_id: getShareId,
                        share_pwd: ""
                      };
                      var p = {
                        dataType: "json",
                        headers: {
                          "content-type": "application/json;charset=utf-8",
                        },
                      };
                      _this.get_file(url, jsonsearch, file_id, file_type, getShareId, p);
                    };
                  } else _this.empty('哦，该资源已经取消分享。');
                }, function (a, c) {
                  _this.empty('哦: ' + network.errorDecode(a, c));
                }, JSON.stringify(jsonsearch), p);
              };
              } else _this.empty('哦, 阿里云盘Token失效了，请在设置中重新填写。');
            }, function (a, c) {
              _this.empty('哦: ' + network.errorDecode(a, c));
            }, JSON.stringify(jsonsearch), p);
          }
          else {
            _this.empty('哦，该资源还未分享');
          };
        } else {
          var i = void 0;
          firstlogin = true;
          var modal = $('<div><div class="broadcast__text">请用阿里云盘 App 扫码</div><div class="broadcast__device selector" style="text-align: center;"><div id="qrcode-container"  style="display: flex; justify-content: center; align-items: center;"></div></div><div class="broadcast__scan"><div></div></div></div></div>');
          Lampa.Modal.open({
            title: '',
            html: modal,
            onBack: function onBack() {
              Lampa.Modal.close();
              //Lampa.Controller.toggle('settings_component');
              //clearInterval(ping_auth);
              clearInterval(i);
            },
          });
          ping_auth = setTimeout(function () {
            network.clear();
            network.timeout(10000);
            //https://passport.aliyundrive.com/newlogin/qrcode/generate.do?appName=aliyun_drive&fromSite=52&appName=aliyun_drive&appEntrance=web&_csrf_token=X5vxoYz2z12UalF5Sw5DG6&umidToken=1112cd325b4b833b2c397da867e6b7e3865c9aaa&isMobile=true&lang=zh_CN&returnUrl=&hsiz=1f59a0289eb8d12691c959648e423ace&fromSite=52&bizParams=&_bx-v=2.0.31
            //https://auth.aliyundrive.com/v2/oauth/authorize?client_id=25dzX3vbYqktVxyX&redirect_uri=https%3A%2F%2Fwww.aliyundrive.com%2Fsign%2Fcallback&response_type=code&login_type=custom&state=%7B%22origin%22%3A%22https%3A%2F%2Fwww.aliyundrive.com%22%7D
            var qrurl = "https://passport.aliyundrive.com/newlogin/qrcode/generate.do?" +
              "appName=aliyun_drive" +
              "&fromSite=52" +
              "&appName=aliyun_drive" +
              "&appEntrance=web" +
              "&isMobile=false" +
              "&lang=zh_CN" +
              "&returnUrl=" +
              "&fromSite=52" +
              "&bizParams=" +
              "&_bx-v=2.0.31"
            var q = 'https://passport.aliyundrive.com/newlogin/qrcode/generate.do?appName=aliyun_drive&fromSite=52&appName=aliyun_drive&appEntrance=web&_csrf_token=IpKi8OVx0jll143OHXI8l3&umidToken=ae5ade1374e4fc0550f57becbf9e30524e8a9385&isMobile=false&lang=zh_CN&returnUrl=&hsiz=1e60c0224917cae8309e7e64540a536d&fromSite=52&bizParams='
            network.quiet(qrurl, function (found) {
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
           _this.empty('哦，未找到阿里云盘Token，请在设置中填写。');
          }
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

      this.get_file = function (url, jsonsearch, file_id, file_type, getShareId, p) {
        var _this = this;
        network.silent(url, function (json) {
          if (json) {
            var get_share_token = json;
            if (file_type == 'file') {
              url = "https://api.aliyundrive.com/v2/file/get";
              jsonsearch = {
                share_id: getShareId,
                file_id: file_id,
                fields: "*",
                image_thumbnail_process: "image/resize,w_400/format,jpeg",
                image_url_process: "image/resize,w_375/format,jpeg",
                video_thumbnail_process: "video/snapshot,t_1000,f_jpg,ar_auto,w_375"
              };
              var get_file_get = $.parseJSON(_this.getRemote(url, "POST", "json", jsonsearch, get_share_token.share_token));
              //console.log(get_file_get);

              //setTimeout(function() {
              if (get_file_get.category == "video") {
                listlink.data[0].media.push({
                  translation_id: get_file_get.file_id,
                  max_quality: get_file_get.name,
                  title: get_file_get.name.replace("\.mp4", "").replace("\.mkv", ""),
                  // type: item.type,
                  // file_id: item.file_id,
                  // share_id: item.share_id 
                  //iframe_src : matches[0],
                  //translation : mytranslation
                });
              };
              //}, 66);
            } else {
              url = "https://api.aliyundrive.com/adrive/v3/file/list";
              jsonsearch = {
                share_id: getShareId,
                parent_file_id: object.movie.file_id ? object.movie.file_id : file_id,
                limit: 100,
                image_thumbnail_process: "image/resize,w_160/format,jpeg",
                image_url_process: "image/resize,w_1920/format,jpeg",
                video_thumbnail_process: "video/snapshot,t_1000,f_jpg,ar_auto,w_300",
                order_by: "name",
                order_direction: "ASC"
              };

              var get_file_list = $.parseJSON(_this.getRemote(url, "POST", "json", jsonsearch, get_share_token.share_token));
              //console.log(obj.file_page.access_token);
              var itemsProcessed = 0;

              get_file_list.items.forEach(function (item, index) {
                //setTimeout(function() {
                if (item.category == "video" || item.type == "folder") {
                  listlink.data[0].media.push({
                    translation_id: item.file_id,
                    max_quality: item.category == "video" ? item.name.substr(item.name.lastIndexOf('.') + 1).toUpperCase() + ' / ' + get_size(item.size): '文件夹',
                    title: item.name.replace("\.mp4", "").replace("\.mkv", ""),
                    type: item.type,
                    file_id: item.file_id,
                    share_id: item.share_id
                    //iframe_src : matches[0],
                    //translation : mytranslation
                  });
                };
                //}, 66 * index);
              });
            };
            results = listlink.data;
            //console.log(results[0].translations.length);
            _this.build();

            _this.activity.loader(false);

            _this.activity.toggle();

          } else _this.empty('哦，未搜索到该资源 (' + object.movie.title + ')');
        }, function (a, c) {
          _this.empty('哦: ' + network.errorDecode(a, c));
        }, JSON.stringify(jsonsearch), p);
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

      this.get_download_url_ = function (file_id, driveId, accesstoken) {
        return $.ajax({
          type: "post",
          url: "https://api.aliyundrive.com/v2/file/get_download_url",
          data: JSON.stringify({
            expire_sec: 14400,
            file_id: file_id,
            drive_id: driveId,
          }),
          headers: {
            "authorization": "".concat("Bearer" || "", " ").concat(accesstoken || ""),
            "content-type": "application/json;charset=utf-8",
          },
          async: false
        }).responseText;;
      };

      this.get_file_ = function (path, driveId, accesstoken, deviceId, signature) {
        return $.ajax({
          type: "post",
          url: "https://api.aliyundrive.com/v2/file/list",
          data: JSON.stringify({
            drive_id: driveId,
            fields: '*',
            parent_file_id: path,
            limit: 200
          }),
          headers: {
            "authorization": "".concat("Bearer" || "", " ").concat(accesstoken || ""),
            "content-type": "application/json;charset=utf-8",
            "origin": "https://aliyundrive.com",
            "Accept-Language": "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "x-canary": "client=web,app=adrive,version=v3.17.0",
            "x-device-id": deviceId,
            "x-signature": signature,
          },
          async: false
        }).responseText;;
      };

      this.get_signature = function (deviceId, userId, nonce) {
        return $.ajax({
          type: "post",
          url: "https://aliyun-1-c3851719.deta.app/api/sign",
          data: JSON.stringify({
            appId: "5dde4e1bdf9e4966b387ba58f4b3fdc3",
            deviceId: deviceId,
            userId: userId,
            nonce: nonce
          }),
          headers: {
            //"authorization": "".concat("Bearer" || "", " ").concat(accesstoken || ""),
            "content-type": "application/json;charset=utf-8",
          },
          async: false
        }).responseText;;
      };

      this.generateUUID = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
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

      this.getFile = function (element, show_error) {
        //console.log(element)
        var translat = element.translation;
        // var jsonresult = $.parseJSON(this.getRemote("http://proxy.cub.watch/cdn/https://rentry.co/qptpt/raw","GET","json","",""));
        // token = jsonresult.data[0].t;
        token = Lampa.Storage.get('aliyun_token');

        url = "https://auth.aliyundrive.com/v2/account/token";
        jsonsearch = {
            refresh_token: token,
            grant_type: 'refresh_token'
        };
        //accesstoken
        var token_refresh  = $.parseJSON(this.getRemote(url,"POST","json",jsonsearch,""));
        
        Lampa.Storage.set('aliyun_token', token_refresh.refresh_token);
        var get_download_url;
        if (element.share_id) {
          url = "https://api.aliyundrive.com/v2/share_link/get_share_token";
          var jsonsearch = {
            share_id: getShareId,
            share_pwd: ""
          };
          var get_share_token = $.parseJSON(this.getRemote(url, "POST", "json", jsonsearch, ""));

          get_download_url = this.getShareLinkDownloadUrl(translat, getShareId, get_share_token.share_token, token_refresh.access_token);
          get_download_url = $.parseJSON(get_download_url).download_url;
        } else {
          url = "https://auth.aliyundrive.com/v2/account/token";
          jsonsearch = {
            refresh_token: token,
            grant_type: 'refresh_token'
          };
          var get_folder_token = $.parseJSON(this.getRemote(url, "POST", "json", jsonsearch, ""));
          //console.log(get_folder_token)

          get_download_url = this.get_download_url_(element.file_id, get_folder_token.default_drive_id, get_folder_token.access_token);
          get_download_url = $.parseJSON(get_download_url).url;
        };
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
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {

          var hash = Lampa.Utils.hash(element.translation ? [element.translation, element.title].join('') : element.title);
          var view = Lampa.Timeline.view(hash);
          var item;
          if (element.type == 'folder') {
            item = Lampa.Template.get('yunpan2_folder', element);
          }else{
            item = Lampa.Template.get('yunpan2', element);
          };
          
          var hash_file = Lampa.Utils.hash(element.translation ? [element.translation, element.title].join('') : element.title + 'libio');
          element.timeline = view;

          item.append(Lampa.Timeline.render(view));
          
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }

          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');

            item.on('hover:focus', function (e) {

              if (element.type == 'folder'&& object.title !== '阿里云盘推送' && object.title !== '阿里云盘播放') {
                //setTimeout(function () {
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
                  network.silent('https://www.laodouban.com/s?c=' + encodeURIComponent(chinese_title), function (json) {
                    var poster_douban = $('div:last-child > div.haibao > a > img', json).attr('src');
                    var rating_douban = $('div:last-child > div.wenzi.d-flex.flex-column.justify-content-between > div.xia.text-muted.d-flex.align-items-center > span.fen.pl-1', json).text();
                    if (rating_douban){
                      //$(".files__title").append("<br/> <br/> 豆瓣："+rating_douban);
                      $(".full-start__poster").after('<div class="card__type" style="left:1em;top:70">豆瓣：'+ rating_douban +'</div>');
                      //$(".full-start__img").after('<div class="card--new_ser" style="right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;">豆瓣：'+ rating_douban +'</div>');
                    };
                    if (poster_douban) {
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
              if (Lampa.Helper) Lampa.Helper.show('aliyun_detail1', '更好的播放体验请用外部播放器 长按选择Android', item);
              last = e.target;
              scroll.update($(e.target), true);
            }).on('hover:enter', function () {

                if (element.type == 'folder') {
                    //_this4.search(element);
                    element.img = object.movie.img;
                    element.original_title = '';
                    
                    var myurl = element.share_id ? 'https://www.aliyundrive.com/s/'+element.share_id: element.file_id;
                    
                    Lampa.Activity.push({
                        url: myurl,
                        title: '阿里云盘播放 ',
                        component: 'yunpan2',
                        movie: element,
                        page: 1
                    });
                } else {
                  if (object.title == '阿里云盘推送') {
                    object.movie.id = object.movie.title;
                    object.movie.url = object.url;
                    if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100)
                  };
                    /* console.log(element);
                    console.log("这里");*/
                    var file = _this4.getFile(element, true);
                    /*console.log(file);
                      console.log("取得播放地址");*/

                    if (file) {
                        //_this4.start();

                        var playlist = [];
                        var first = {
                            url: file,
                            timeline: view,
                            title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality
                        };
                        Lampa.Player.play(first);

                        playlist.push(first);
                        Lampa.Player.playlist(playlist);
                        // if (window.intentShim) {
                        //     window.plugins.intentShim.startActivity(
                        //         {
                        //             action: window.plugins.intentShim.ACTION_VIEW,
                        //             package: "is.xyz.mpv", //setPackage
                        //             url: file,
                        //             type: 'video/mp4',
                        //             extras: {
                        //                 'http-header-fields': 'referer:https://www.aliyundrive.com/'
                        //             }
                        //         },
                        //         function () { },
                        //         function () { console.log('Failed to open URL via Android Intent') }
                        //     );
                        // } else {
                        //     Lampa.Noty.show('请在在安卓平台上，使用MPV播放器播放该视频。');
                        // };
                    } else {
                        Lampa.Noty.show('无法检索链接');
                    }
                    
                }
                if (viewed.indexOf(hash_file) == -1) {
                  viewed.push(hash_file);
                  item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                  Lampa.Storage.set('online_view', viewed);
              }
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
          if (Lampa.Helper) Lampa.Helper.show('aliyun_detail', '如遇播放卡顿建议长按OK键选择Android播放器。', params.item);
        });
      };

      this.start = function (first_select) {
        if (Lampa.Activity.active().activity !== this.activity) return; //обязательно, иначе наблюдается баг, активность создается но не стартует, в то время как компонент загружается и стартует самого себя.
        if (first_select) {
          var last_views = scroll.render().find('.selector.online').find('.torrent-item__viewed').parent().last();
          if (last_views.length) last = last_views.eq(0)[0];else last = scroll.render().find('.selector').eq(1)[0];
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
      window.plugin_yunpan2_ready = true;
      Lampa.Component.add('yunpan2', component);
      Lampa.Template.add('button_yunpan2', "<div class=\"full-start__button selector view--online\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n    </g></svg>\n\n    <span>网盘观看</span>\n    </div>");
      Lampa.Template.add('yunpan2', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"64\" cy=\"64\" r=\"56\" stroke=\"white\" stroke-width=\"16\"/>\n                    <path d=\"M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">阿里云盘 / {quality}</div>\n        </div>\n    </div>");
      Lampa.Template.add('yunpan2_folder', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"/>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"/>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">阿里云盘 / {quality}</div>\n        </div>\n    </div>");
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
    Lampa.Template.add('settings_mod_aliyun', "<div>\n <div class=\"settings-param selector\" data-name=\"aliyun_token\" data-type=\"input\" placeholder=\"例如: nxjekeb57385b..\"> <div class=\"settings-param__name\">手动添加 Refresh token </div> <div class=\"settings-param__value\">例如: nxjekeb57385b..</div> <div class=\"settings-param__descr\">必须使用移动端token</div> </div>\n \n    <div class=\"settings-param selector\" data-name=\"aliyun_qr\" data-static=\"true\">\n        <div class=\"settings-param__name\">扫码获取Refresh token</div>\n    <div class=\"settings-param__descr\">扫码获取token更方便</div> </div>\n</div>\n</div>");
    
    function addSettingsAliyun() {
      if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="mod_aliyun"]').length) {
          let field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"mod_aliyun\">\n            <div class=\"settings-folder__icon\">\n                <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-hard-drive\"><line x1=\"22\" y1=\"12\" x2=\"2\" y2=\"12\"></line><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path><line x1=\"6\" y1=\"16\" x2=\"6.01\" y2=\"16\"></line><line x1=\"10\" y1=\"16\" x2=\"10.01\" y2=\"16\"></line></svg>\n            </div>\n            <div class=\"settings-folder__name\">阿里云盘</div>\n        </div>"));
          Lampa.Settings.main().render().find('[data-component="more"]').after(field)
          Lampa.Settings.main().update()
      };

      var ico = '<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-hard-drive\"><line x1=\"22\" y1=\"12\" x2=\"2\" y2=\"12\"></line><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path><line x1=\"6\" y1=\"16\" x2=\"6.01\" y2=\"16\"></line><line x1=\"10\" y1=\"16\" x2=\"10.01\" y2=\"16\"></line></svg>';
      var menu_item = $('<li class="menu__item selector focus" data-action="myaliyundrive"><div class="menu__ico">' + ico + '</div><div class="menu__text">云盘</div></li>');
      var element = {};
      element.img = './img/img_broken.svg';
      element.original_title = '';
      element.title = '云盘内容';
      menu_item.on('hover:enter', function () {
        Lampa.Activity.push({
          url: 'root',
          title: '我的阿里云盘',
          component: 'yunpan2',
          movie: element,
          page: 1
        });
      });
      $('.menu .menu__list').eq(0).append(menu_item);
      //$('*[data-type="book"]').before(menu_item);
  }

  if (window.appready) addSettingsAliyun()
  else {
      Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') {
            addSettingsAliyun();
            var pushualiyunBut = $('<div class="head__action pushualiyunBut selector"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-airplay\"><path d=\"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1\"></path><polygon points=\"12 15 17 21 7 21 12 15\"></polygon></svg></div>');
					$('.head__actions .open--notice').after(pushualiyunBut);
					pushualiyunBut.on('hover:enter click.hover', function () {
						Lampa.Input.edit({
              title: '填写阿里云盘分享或磁力链接 - 推送',
              value: '',
              free: true,
              nosave: true
          }, function (new_value) {
              if (new_value) {
                  //console.log(new_value)
                  //var searchurl = object.search.replace('#msearchword',encodeURIComponent(new_value));
                var element = {};
                element.img = './img/img_broken.svg';
                element.original_title = '';
                if (/^https:\/\/www\.aliyundrive\.com\/s\/[a-zA-Z\d]+/i.test(new_value)) {
                  element.title = '阿里云盘推送';
                  Lampa.Activity.push({
                    url: new_value,
                    title: '阿里云盘推送',
                    component: 'yunpan2',
                    movie: element,
                    page: 1
                  });
                } else if (/^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/i.test(new_value)) {
                  if (window.intentShim) {
                    window.plugins.intentShim.startActivity(
                        {
                            action: window.plugins.intentShim.ACTION_VIEW,
                            url: new_value
                        },
                        function () { },
                        function () { console.log('Failed to open URL via Android Intent') }

                    );
                };
                Lampa.Controller.toggle('content');
                };
                
                  // Lampa.Activity.push({
                  //     //	url: cors + a.url,
                  //     url: searchurl,
                  //     quantity: object.quantity,
                  //     title: Lampa.Storage.get('online_web_balanser')+' - 搜索"'+new_value+'"',
                  //     component: 'mod_web',
                  //     show: object.show,
                  //     next: object.next,
                  //     search: object.search,
                  //     detail: object.detail,
                  //     page: 1
                  // });
              }
              else Lampa.Controller.toggle('content');
          })
          //$('.settings-input__title').before($('<div class=\"settings-input__title\"><div style=\"width:80px\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-cast\"> <path d=\"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6\"></path> <line x1=\"2\" y1=\"20\" x2=\"2.01\" y2=\"20\"></line> </svg></div><div style=\"height:15px\"></div></div>'));
					});
          }
      })
  }
    // Lampa.Listener.follow('app', function (e) {
    //   // if (e.type == 'ready' && Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="mod_aliyun"]').length) {
    //   //   var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"mod_aliyun\">\n            <div class=\"settings-folder__icon\">\n                <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-hard-drive\"><line x1=\"22\" y1=\"12\" x2=\"2\" y2=\"12\"></line><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path><line x1=\"6\" y1=\"16\" x2=\"6.01\" y2=\"16\"></line><line x1=\"10\" y1=\"16\" x2=\"10.01\" y2=\"16\"></line></svg>\n            </div>\n            <div class=\"settings-folder__name\">阿里云盘</div>\n        </div>"));
    //   //   Lampa.Settings.main().render().find('[data-component="more"]').after(field);
    //   //   Lampa.Settings.main().update();
    //   // };
    //   // if (e.type == 'ready') {
		// 	// 	//FullScreen 
		// 	// 		var pushualiyunBut = $('<div class="head__action pushualiyunBut selector"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-airplay\"><path d=\"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1\"></path><polygon points=\"12 15 17 21 7 21 12 15\"></polygon></svg></div>');
		// 	// 		$('.head__actions .open--notice').after(pushualiyunBut);
		// 	// 		pushualiyunBut.on('hover:enter click.hover', function () {
		// 	// 			Lampa.Input.edit({
    //   //         title: '填写阿里云盘分享或磁力链接 - 推送',
    //   //         value: '',
    //   //         free: true,
    //   //         nosave: true
    //   //     }, function (new_value) {
    //   //         if (new_value) {
    //   //             //console.log(new_value)
    //   //             //var searchurl = object.search.replace('#msearchword',encodeURIComponent(new_value));
    //   //           var element = {};
    //   //           element.img = './img/img_broken.svg';
    //   //           element.original_title = '';
    //   //           if (/^https:\/\/www\.aliyundrive\.com\/s\/[a-zA-Z\d]+/i.test(new_value)) {
    //   //             element.title = '阿里云盘推送';
    //   //             Lampa.Activity.push({
    //   //               url: new_value,
    //   //               title: '阿里云盘推送',
    //   //               component: 'yunpan2',
    //   //               movie: element,
    //   //               page: 1
    //   //             });
    //   //           } else if (/^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/i.test(new_value)) {
    //   //             if (window.intentShim) {
    //   //               window.plugins.intentShim.startActivity(
    //   //                   {
    //   //                       action: window.plugins.intentShim.ACTION_VIEW,
    //   //                       url: new_value
    //   //                   },
    //   //                   function () { },
    //   //                   function () { console.log('Failed to open URL via Android Intent') }

    //   //               );
    //   //           };
    //   //           Lampa.Controller.toggle('content');
    //   //           };
                
    //   //             // Lampa.Activity.push({
    //   //             //     //	url: cors + a.url,
    //   //             //     url: searchurl,
    //   //             //     quantity: object.quantity,
    //   //             //     title: Lampa.Storage.get('online_web_balanser')+' - 搜索"'+new_value+'"',
    //   //             //     component: 'mod_web',
    //   //             //     show: object.show,
    //   //             //     next: object.next,
    //   //             //     search: object.search,
    //   //             //     detail: object.detail,
    //   //             //     page: 1
    //   //             // });
    //   //         }
    //   //         else Lampa.Controller.toggle('content');
    //   //     })
    //   //     //$('.settings-input__title').before($('<div class=\"settings-input__title\"><div style=\"width:80px\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-cast\"> <path d=\"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6\"></path> <line x1=\"2\" y1=\"20\" x2=\"2.01\" y2=\"20\"></line> </svg></div><div style=\"height:15px\"></div></div>'));
		// 	// 		});
		// 	// };
    //   // var ico = '<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-hard-drive\"><line x1=\"22\" y1=\"12\" x2=\"2\" y2=\"12\"></line><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path><line x1=\"6\" y1=\"16\" x2=\"6.01\" y2=\"16\"></line><line x1=\"10\" y1=\"16\" x2=\"10.01\" y2=\"16\"></line></svg>';
    //   // var menu_item = $('<li class="menu__item selector focus" data-action="myaliyundrive"><div class="menu__ico">' + ico + '</div><div class="menu__text">云盘</div></li>');
    //   // var element = {};
    //   // element.img = './img/img_broken.svg';
    //   // element.original_title = '';
    //   // element.title = '云盘内容';
    //   // menu_item.on('hover:enter', function () {
    //   //   Lampa.Activity.push({
    //   //     url: 'root',
    //   //     title: '我的阿里云盘',
    //   //     component: 'yunpan2',
    //   //     movie: element,
    //   //     page: 1
    //   //   });
    //   // });
    //   // $('*[data-type="book"]').before(menu_item);
    // });
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
                    //https://passport.aliyundrive.com/newlogin/qrcode/generate.do?appName=aliyun_drive&fromSite=52&appName=aliyun_drive&appEntrance=web&_csrf_token=X5vxoYz2z12UalF5Sw5DG6&umidToken=1112cd325b4b833b2c397da867e6b7e3865c9aaa&isMobile=true&lang=zh_CN&returnUrl=&hsiz=1f59a0289eb8d12691c959648e423ace&fromSite=52&bizParams=&_bx-v=2.0.31
                    //https://auth.aliyundrive.com/v2/oauth/authorize?client_id=25dzX3vbYqktVxyX&redirect_uri=https%3A%2F%2Fwww.aliyundrive.com%2Fsign%2Fcallback&response_type=code&login_type=custom&state=%7B%22origin%22%3A%22https%3A%2F%2Fwww.aliyundrive.com%22%7D
                   var qrurl = "https://passport.aliyundrive.com/newlogin/qrcode/generate.do?" +
                                "appName=aliyun_drive" +
                                "&fromSite=52" +
                                "&appName=aliyun_drive" +
                                "&appEntrance=web" +
                                "&isMobile=false" +
                                "&lang=zh_CN" +
                                "&returnUrl=" +
                                "&fromSite=52" +
                                "&bizParams=" +
                                "&_bx-v=2.0.31"
                    var q = 'https://passport.aliyundrive.com/newlogin/qrcode/generate.do?appName=aliyun_drive&fromSite=52&appName=aliyun_drive&appEntrance=web&_csrf_token=IpKi8OVx0jll143OHXI8l3&umidToken=ae5ade1374e4fc0550f57becbf9e30524e8a9385&isMobile=false&lang=zh_CN&returnUrl=&hsiz=1e60c0224917cae8309e7e64540a536d&fromSite=52&bizParams='
                    network.quiet(qrurl, function (found) {
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
        network.quiet("https://passport.aliyundrive.com/newlogin/qrcode/query.do?appName=aliyun_drive&fromSite=52", function (found) {
            var scaned = false;
            // NEW / SCANED / EXPIRED / CANCELED / CONFIRMED
            if (["EXPIRED"].includes(found.content.data.qrCodeStatus)) {
                clearInterval(i);
                $('#qrcode-container').text('二维码已过期');
            } else if (["SCANED"].includes(found.content.data.qrCodeStatus)) {
                if (!scaned) {
                    $('#qrcode-container').text('扫描成功, 请在手机上根据提示确认登录');
                }
                scaned = true;
            } else if (["CANCELED"].includes(found.content.data.qrCodeStatus)) {
                clearInterval(i);
                $('#qrcode-container').text('您已取消登录');
            }
            else {
                if (["CONFIRMED"].includes(found.content.data.qrCodeStatus)) {
                    clearInterval(i);
                    var resultjson = JSON.parse(atob(found.content.data.bizExt));
                    Lampa.Storage.set("aliyun_token", resultjson.pds_login_result.refreshToken);
                    $('.settings [data-name="aliyun_token"] .settings-param__value').text(resultjson.pds_login_result.refreshToken);
                    Lampa.Modal.close();
                    Lampa.Controller.toggle('settings_component');
                  if (firstlogin) {
                    var element = {};
                    element.img = './img/img_broken.svg';
                    element.original_title = '';
                    element.title = '云盘内容';
                    Lampa.Activity.push({
                      url: 'root',
                      title: '我的阿里云盘',
                      component: 'yunpan2',
                      movie: element,
                      page: 1
                    });
                  };//window.location.reload();
                }
            }
        }, function (a, c) {
            Lampa.Noty.show(network.errorDecode(a, c));
        }, {
          ck: c.ck,
          t: c.t,
          AppName: "aliyun_drive",
          AppEntrance: "web",
          IsMobile: "false",
          Lang: "zh_CN",
          ReturnURL: "",
          FromSite: "52",
          BizParams: "",
          Navlanguage: "zh-CN",
          NavPlatform: "MacIntel",
        });
    }
})();
