(function () {
    'use strict';
    var catalogs = [
        {
            title: '1337x',
            Keyword: '1337x',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'Torrent Galaxy',
            Keyword: 'tgx',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        }, 
        {
            title: 'Torlock',
            Keyword: 'torlock',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'PirateBay',
            Keyword: 'piratebay',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'Nyaasi',
            Keyword: 'nyaasi',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: false
            },],
        },
        {
            title: 'Zooqle',
            Keyword: 'zooqle',
            search_available: false,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'KickAss',
            Keyword: 'kickass',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'Bitsearch',
            Keyword: 'bitsearch',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: false
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'MagnetDL',
            Keyword: 'magnetdl',
            search_available: false,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'Libgen',
            Keyword: 'libgen',
            search_available: false,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'YTS',
            Keyword: 'yts',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'Limetorrent',
            Keyword: 'limetorrent',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'TorrentFunk',
            Keyword: 'torrentfunk',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'Glodls',
            Keyword: 'glodls',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'TorrentProject',
            Keyword: 'torrentproject',
            search_available: false,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },
        {
            title: 'YourBittorrent',
            Keyword: 'ybt',
            search_available: true,
            limit: 20,
            category: [{
                title: '最新',
                type: 'recent',
                category_available: true
            }, {
                title: '热门',
                type: 'trending',
                category_available: true
            },],
        },];
    function torrentapi(object) {
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true,
            step: 250
        });
        var items = [];
        var html = $('<div></div>');
        var body = $('<div class="freetv_torrent category-full"></div>');
        var info;
        var last;
        var waitload;

        this.create = function () {
            // https://tapi3.onrender.com
            var geturl = 'https://torrentapipy-1-x2651286.deta.app/api/v1/';
            switch (object.type) {
                case 'search':
                    var myear;
                    if (object.movie.release_date){
                        myear = ' ' + new Date(object.movie.release_date).getFullYear();
                    }
                    geturl = geturl + object.type + '?site=' + object.keyword + '&query='+ encodeURIComponent(object.search_two + myear) +'&limit=' + object.limit;
                    break;
                default:
                    geturl = geturl + object.type + '?site=' + object.keyword + '&limit=' + object.limit;
            }
            var _this = this;
            this.activity.loader(true);

            network["native"](geturl, this.build.bind(this), function (a,c) {                
                // console.log(a)
                // Lampa.Noty.show(network.errorDecode(a, c));
                if (a.hasOwnProperty("responseText")) {
                    var empty = new Lampa.Empty({
                        descr: '哦，无法获取 ' + object.title + ' 的内容。'
                    });
                    html.append(empty.render());
                    
                    var bn = $('<div class="simple-button selector"><span>选择其他网站</span></div>');
                    var ft = $('<div class="empty__footer"></div>');
                    bn.on('hover:enter', function () {
                        _this.selectGroup();
                    });
                    ft.append(bn);
                    empty.append(ft);
                    html.append(empty)
                    
                    // if (a.hasOwnProperty("responseJSON")) {
                    //     Lampa.Noty.show(a.responseJSON.error);
                    // } else {
                    //     Lampa.Noty.show(a.statusText);
                    // }
                    // Lampa.Storage.set('online_torrentsite_balanser', catalogs[0].Keyword);
                } else {
                    var empty = new Lampa.Empty({
                        descr: '在 ' + object.keyword + ' 中没有找到 ' + object.search + ' 的磁力内容。'
                    });
                    html.append(empty.render());
                    
                    var bn = $('<div class="simple-button selector"><span>选择其他网站</span></div>');
                    var ft = $('<div class="empty__footer"></div>');
                    bn.on('hover:enter', function () {
                        _this.selectGroup();
                    });
                    ft.append(bn);
                    empty.append(ft);
                    html.append(empty)
                    // var empty = new Lampa.Empty();
                    // html.append(empty.render());
                    // html.find('.empty__descr').text('在'+object.keyword+'中没有找到相关磁力内容');
                }
                _this.start = empty.start;

                _this.activity.loader(false);

                _this.activity.toggle();
            }, false, false, {
                dataType: 'json'
            });

            return this.render();
        };

        this.next = function () {
            var _this2 = this;

            if (waitload) return;
            var geturl = 'https://torrentapipy-1-x2651286.deta.app/api/v1/';
            switch (object.type) {
                case 'search':
                    var myear;
                    if (object.movie.release_date){
                        myear = ' ' + new Date(object.movie.release_date).getFullYear();
                    }
                    geturl = geturl + object.type + '?site=' + object.keyword + '&query='+ encodeURIComponent(object.search_two + myear) +'&limit=' + object.limit;
                    break;
                default:
                    geturl = geturl + object.type + '?site=' + object.keyword + '&limit=' + object.limit;
            }

            //   if (object.page < 1) {
            waitload = true;
            object.page++;
            network["native"](geturl + '&page=' + object.page, function (result) {
                _this2.append(result,true);

                if (result.data.length) waitload = false;
                // Lampa.Controller.enable('content');
            });
            //   }
        };

        this.append = function (data,append) {
            var _this3 = this;

            data.data.forEach(function (element) {
                var card = Lampa.Template.get('card', {
                    title: element.name,
                    release_year: (element.size ? element.size : '') + ' ' + (element.leechers ? element.leechers : '') + ' ' + (element.seeders ? element.seeders : '') + ' ' + (element.date ? element.date : '')
                });
                card.addClass('card--category');
                card.find('.card__img').attr('src', element.poster ? element.poster.replace('large', 'medium') : './img/img_load.svg');
                var regexp = /[0-9]+(\.[0-9]{1,2})?(GB|MB|gb|mb|p)/g;

                var regexp_ = /([0-9]{3,4}[pi])/g;
                if (element.name && element.rating) {
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(element.rating);
                } else if (element.name) {
                    var c = element.name.match(regexp);
                    if (c) {
                        var quality = c[0].match(regexp_) || '';
                        if (quality) {
                            card.find('.card__view').append('<div class="card__quality"></div>');
                            card.find('.card__quality').text(quality.toString().replace(/([\[\(]?((?:19[0-9]|20[0123])[0-9])[\]\)]?)/, ''));
                        }
                    }
                }
                
                /*card.addClass('card--collection').width('14.266%');
                //card.find('.card__img').attr('src', element.picture);
                card.find('.card__img').css({
                'cursor': 'pointer',
                'background-color': '#353535'
              }).width('118.3 px').height('auto').attr('src', element.picture);
        
                card.find('.card__view').css({
                        'padding-bottom': '150%',
              }).width('auto');*/
                var regexp1 = /([\[\(]?((?:19[0-9]|20[0123])[0-9])[\]\)]?)/g;
                if (element.name) {
                    var myear = element.name.match(regexp1) ? element.name.match(regexp1).toString().replace(/ |\.|\(|\)/g, '') : '';
                    if (myear !== '') {
                        card.find('.card__view').append('<div class="card__type"></div>');
                        card.find('.card__type').text((element.release_date ? new Date(element.release_date).getFullYear() : myear));
                    }
                };

                var regexp2 = /(?:PPV.)?[HP]DTV|(?:HD)?TC|[cC]am|(?:HD)?CAM|B[rR]Rip|WEBRip|WEB-Rip|WEB-DL|WEB|TS|(?:PPV )?WEB-?DL(?: DVDRip)?|H[dD]Rip|DVDRip|DVDRiP|DVDRIP|CamRip|W[EB]B[rR]ip|HDRIP|[Bb]lu[Rr]ay|DvDScr|hdtv/;
                if (element.name) {
                    var quality = element.name.match(regexp2) ? element.name.match(regexp2).toString().replace(/ |\.|\(|\)/g, '') : '';
                    if (quality) {
                        card.find('.card__icons-inner').text(quality)
                        card.find('.card__icons-inner').css({ 'padding': '0.4em 0.4em' })
                    }
                    
                } 

                card.on('hover:focus', function () {
                    last = card[0];
                    scroll.update(card, true);
                    info.find('.info__title').text(element.name);
                    //console.log(element.oname.match(regexp));
                    //info.find('.info__title-original').text(element.time + (element.quality ? ' / ' + element.quality : ''));
                    info.find('.info__title-original').text((element.size?element.size:'') +' ' + myear + (element.name.match(regexp) ? ' ' +(element.name.match(regexp)?element.name.match(regexp).join(" ").toUpperCase().replace(/([\[\(]?((?:19[0-9]|20[0123])[0-9])[\]\)]?)/, ''):'') : ''));
                    // info.find('.info__rate span').text(parseFloat((element.tmdbrate ? element.tmdbrate : 0)).toPrecision(2).replace(/\.0+$/, ''));
                    // info.find('.info__rate').toggleClass('hide', !(parseFloat((element.tmdbrate ? element.tmdbrate :0)).toPrecision(2).replace(/\.0+$/,'') > 0));

                    var maxrow = Math.ceil(items.length / 7) - 1;
                    if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
                    if (element.picture) Lampa.Background.change(element.picture);
                    // if (Lampa.Helper) Lampa.Helper.show('torrentapi_detail5', '长按住 (ОК) 键下载至 PikPak', card);
                });
                card.on('hover:enter', function() {
                  if (element.torrents && element.torrents.length) {
                    var sources = element.torrents.map(function(item) {
                      return {
                        title: item.quality + ' ' + (item.type ? item.type : '') + ' ' + (item.size ? item.size : ''),
                        url: item.magnet
                      };
                    });
                
                    var html_ = $('<div></div>');
                    var navigation = $('<div class="navigation-tabs"></div>');
                
                    sources.forEach(function(tab, i) {
                      var button = $('<div class="navigation-tabs__button selector">' + tab.title + '</div>');
                      button.on('hover:enter', function() {
                        last = card[0];
                        if (!Lampa.Platform.is("android")) {
                          Lampa.Modal.close();
                        }
                
                        var SERVER1 = {
                          "title": element.name,
                          "MagnetUri": tab.url,
                          "poster": element.poster || (object.movie ? Lampa.Utils.protocol() + 'imagetmdb.com/t/p/w200' + object.movie.poster_path : '')
                        };
                
                        Lampa.Torrent.start(SERVER1, (object.movie ? object.movie : {
                          title: element.name
                        }));
                      });
                
                      if (i > 0 && i % 2 != 0) {
                        navigation.append('<div class="navigation-tabs__split">|</div>');
                      }
                
                      if (i % 2 == 0) {
                        if (i > 0) {
                          html_.append(navigation);
                        }
                        navigation = $('<div class="navigation-tabs"></div>');
                      }
                
                      navigation.append(button);
                    });
                
                    html_.append(navigation);
                
                    Lampa.Modal.open({
                      title: element.name,
                      html: html_,
                      size: 'medium',
                      select: html_.find('.navigation-tabs .active')[0],
                      mask: true,
                      onBack: function() {
                        Lampa.Modal.close();
                        Lampa.Api.clear();
                        Lampa.Controller.toggle('content');
                      }
                    });
                  } else {
                    last = card[0];
                    var SERVER1 = {
                      "title": element.name,
                      "MagnetUri": element.magnet,
                      "poster": element.poster || (object.movie ? Lampa.Utils.protocol() + 'imagetmdb.com/t/p/w200' + object.movie.poster_path : '')
                    };
                
                    Lampa.Torrent.start(SERVER1, (object.movie ? object.movie : {
                      title: element.name
                    }));
                  }
                });
                
                // card.on('hover:long', function (target, card_data) {
                //   Lampa.Modal.open({
                //     title: '发送到PikPak',
                //     html: Lampa.Template.get('modal_loading'),
                //     size: 'small',
                //     mask: true,
                //     onBack: function onBack() {
                //       Lampa.Modal.close();
                //       Lampa.Api.clear();
                //       Lampa.Controller.toggle('content');
                //     }
                //   });

                //   var p;
                //   var info = Lampa.Storage.get("pikpakUserInfo","");

                //   if (!info.loginInfo || info.loginInfo.expires < new Date().getTime()) {
                //     var url = 'https://user.mypikpak.com/v1/auth/signin';
                //     var postdata =
                //     {
                //       "client_id": "YNxT9w7GMdWvEOKa",
                //       "client_secret": "dbw2OtmVEeuUvIptb1Coyg",
                //       "password": Lampa.Storage.get('pikpak_userPass', ''),
                //       "username": Lampa.Storage.get('pikpak_userName', '')
                //     };

                //     $.ajax({
                //       url: url,
                //       type: 'POST',
                //       data: postdata,
                //       async: false,
                //       dataType: 'json',
                //       success: function success(json) {
                //         if (json && (json.access_token || json.type == 'Bearer')) {
                //           var info = {};
                //           info.loginInfo = json;
                //           if (!info.loginInfo.expires && info.loginInfo.expires_in) {
                //             info.loginInfo.expires = new Date().getTime() + 1000 * info.loginInfo.expires_in;
                //           };
                //           Lampa.Storage.set("pikpakUserInfo", info);
                //         } else {
                //           Lampa.Storage.set("pikpakUserInfo", "");
                //           if (json && json.error) Lampa.Noty.show(json.details[1].message);
                //         }
                //       },
                //       error: function error() {
                //         //Lampa.Noty.show('请在设置中使用正确的用户名和密码登陆PikPak。');
                //       }
                //     });

                //     info = Lampa.Storage.get("pikpakUserInfo","");

                //     if (info.loginInfo) {
                //       p = {
                //         dataType: "json",
                //         headers: {
                //           "content-type": "application/json;charset=utf-8",
                //           authorization: info.loginInfo.token_type + ' ' + info.loginInfo.access_token
                //         },
                //       };
                //     } else {
                //       p = {
                //         dataType: "json",
                //         headers: {
                //           "content-type": "application/json;charset=utf-8",
                //         },
                //       };
                //     };
                //   } else {
                //     p = {
                //       dataType: "json",
                //       headers: {
                //         "content-type": "application/json;charset=utf-8",
                //         authorization: info.loginInfo.token_type + ' ' + info.loginInfo.access_token
                //       },
                //     };
                //   };

                //   var postData_ = {
                //     kind: "drive#file",
                //     name: "",
                //     // parent_id: route.params.id || '',
                //     upload_type: "UPLOAD_TYPE_URL",
                //     url: {
                //       url: element.video
                //     },
                //     params: {"from":"file"},
                //     folder_type: "DOWNLOAD"
                //   };

                //   network.native(PikPakProxy() + 'https://api-drive.mypikpak.com/drive/v1/files', function (json) {
                //     if ("error" in json) {
                //       Lampa.Noty.show('哦，' + json.error_description + '，添加到 PikPak 失败。');
                //     } else {
                //       if (json.upload_type === "UPLOAD_TYPE_URL") {
                //         Lampa.Noty.show(element.name + ' 的磁力链接已成功添加到 PikPak。');
                //       };
                //     }
                //     Lampa.Modal.close();
                //     Lampa.Controller.toggle('content');
                //   }, function (a, c) {
                //     Lampa.Noty.show('哦: ' + network.errorDecode(a, c));
                //     Lampa.Modal.close();
                //     Lampa.Controller.toggle('content');
                //   }, JSON.stringify(postData_), p);
                // });

                body.append(card);
                if (append) Lampa.Controller.collectionAppend(card);
                items.push(card);
            });
        };


        this.build = function (data) {
            var _this2 = this;
            // $(".info__left").before('<div class="info__rate"><span></span></div>')
            var channelbutton = '<div class=\"full-start__button selector view--channel\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.5 3.588c-.733 0-1.764.175-2.448.311a.191.191 0 0 0-.153.153c-.136.684-.31 1.715-.31 2.448 0 .733.174 1.764.31 2.448a.191.191 0 0 0 .153.153c.684.136 1.715.31 2.448.31.733 0 1.764-.174 2.448-.31a.191.191 0 0 0 .153-.153c.136-.684.31-1.715.31-2.448 0-.733-.174-1.764-.31-2.448a.191.191 0 0 0-.153-.153c-.684-.136-1.715-.31-2.448-.31ZM3.741 2.342C4.427 2.205 5.595 2 6.5 2c.905 0 2.073.205 2.759.342a1.78 1.78 0 0 1 1.4 1.4c.136.685.341 1.853.341 2.758s-.205 2.073-.342 2.759a1.78 1.78 0 0 1-1.4 1.4C8.574 10.794 7.406 11 6.5 11s-2.073-.205-2.759-.342a1.78 1.78 0 0 1-1.4-1.4C2.206 8.574 2 7.406 2 6.5s.205-2.073.342-2.759a1.78 1.78 0 0 1 1.4-1.4ZM6.5 14.588c-.733 0-1.764.175-2.448.311a.191.191 0 0 0-.153.153c-.136.684-.31 1.715-.31 2.448 0 .733.174 1.764.31 2.448a.191.191 0 0 0 .153.153c.684.136 1.715.31 2.448.31.733 0 1.764-.174 2.448-.31a.191.191 0 0 0 .153-.153c.136-.684.31-1.715.31-2.448 0-.733-.174-1.764-.31-2.448a.191.191 0 0 0-.153-.153c-.684-.136-1.715-.31-2.448-.31Zm-2.759-1.246C4.427 13.205 5.595 13 6.5 13c.905 0 2.073.205 2.759.342a1.78 1.78 0 0 1 1.4 1.4c.136.685.341 1.853.341 2.758s-.205 2.073-.342 2.759a1.78 1.78 0 0 1-1.4 1.4C8.574 21.794 7.406 22 6.5 22s-2.073-.205-2.759-.342a1.78 1.78 0 0 1-1.4-1.4C2.206 19.574 2 18.406 2 17.5s.205-2.073.342-2.759a1.78 1.78 0 0 1 1.4-1.4ZM17.5 3.588c-.733 0-1.764.175-2.448.311a.191.191 0 0 0-.153.153c-.136.684-.31 1.715-.31 2.448 0 .733.174 1.764.31 2.448a.191.191 0 0 0 .153.153c.684.136 1.715.31 2.448.31.733 0 1.764-.174 2.448-.31a.191.191 0 0 0 .153-.153c.136-.684.31-1.715.31-2.448 0-.733-.174-1.764-.31-2.448a.191.191 0 0 0-.153-.153c-.684-.136-1.715-.31-2.448-.31Zm-2.759-1.246C15.427 2.205 16.595 2 17.5 2c.905 0 2.073.205 2.759.342a1.78 1.78 0 0 1 1.4 1.4c.136.685.341 1.853.341 2.758s-.205 2.073-.342 2.759a1.78 1.78 0 0 1-1.4 1.4c-.685.136-1.853.341-2.758.341s-2.073-.205-2.759-.342a1.78 1.78 0 0 1-1.4-1.4C13.206 8.574 13 7.406 13 6.5s.205-2.073.342-2.759a1.78 1.78 0 0 1 1.4-1.4ZM17.5 14.588c-.733 0-1.764.175-2.448.311a.191.191 0 0 0-.153.153c-.136.684-.31 1.715-.31 2.448 0 .733.174 1.764.31 2.448a.191.191 0 0 0 .153.153c.684.136 1.715.31 2.448.31.733 0 1.764-.174 2.448-.31a.191.191 0 0 0 .153-.153c.136-.684.31-1.715.31-2.448 0-.733-.174-1.764-.31-2.448a.191.191 0 0 0-.153-.153c-.684-.136-1.715-.31-2.448-.31Zm-2.759-1.246c.686-.137 1.854-.342 2.759-.342.905 0 2.073.205 2.759.342a1.78 1.78 0 0 1 1.4 1.4c.136.685.341 1.853.341 2.758s-.205 2.073-.342 2.759a1.78 1.78 0 0 1-1.4 1.4c-.685.136-1.853.341-2.758.341s-2.073-.205-2.759-.342a1.78 1.78 0 0 1-1.4-1.4C13.206 19.574 13 18.406 13 17.5s.205-2.073.342-2.759a1.78 1.78 0 0 1 1.4-1.4Z\" fill=\"currentColor\"/></svg>   <span>网站</span>\n    </div>'
            Lampa.Template.add('button_category', "<style>.freetv_torrent.category-full .card__icons {top: 0.3em;right: 0.3em;justify-content: center !important;}.freetv_torrent.category-full{ padding-bottom:8em } .freetv_torrent div.card__view{ position:relative; background-color:#353535; background-color:#353535a6; border-radius:1em; cursor:pointer; padding-bottom:60% } .freetv_torrent.square_icons div.card__view{ padding-bottom:100% } .freetv_torrent.category-full .card__icons { top:0.3em; right:0.3em; justify-content:right; } @media screen and (max-width: 2560px) { .card--collection { width: 16.6%!important; } } @media screen and (max-width: 385px) { .card--collection { width: 33.3%!important; } } </style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div>" + channelbutton + "  </div>");

            Lampa.Template.add('_style', '<style>.freetv.category-full{padding-bottom:8em;}</style>');
            Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
            $('body').append(Lampa.Template.get('_style', {}, true));
            var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--channel').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.view--category').on('hover:enter hover:click', function () {
                listNavigation();
            });
            
            // info.find('.info__rate,.info__right').remove();
            scroll.render().addClass('layer--wheight').data('mheight', info);
            html.append(info);
            html.append(scroll.render());
            scroll.onEnd = function () {
                _this2.next();
            };
            this.append(data);
            scroll.append(body);
            this.activity.loader(false);
            this.activity.toggle();
        };

        this.selectGroup = function () {
            //console.log(catalogs)
            var balanser_ = Lampa.Storage.get('online_torrentsite_balanser')
            Lampa.Select.show({
                title: '网站',
                // items: catalogs,
                items: catalogs.filter(function (n){
                    return n.search_available == true;
                }).map(function (elem, index) {
                    elem.selected = balanser_ == elem.Keyword;
                    // console.log(balanser_,elem)
                    return elem;
                }),
                onSelect: function onSelect(a) {
                    //console.log(a)
                    Lampa.Storage.set('online_torrentsite_balanser', a.Keyword);
                    if (object.type == 'search') {
                        Lampa.Activity.push({
                            search: object.search,
                            search_one: object.search_one,
                            search_two: object.search_two,
                            movie: object.movie,
                            type: 'search',
                            keyword: a.Keyword,
                            limit: a.limit,
                            title: '磁力搜索 - ' + a.title + ' - '+ object.search,
                            component: 'torrentapi',
                            page: 1
                        });
                    } else {
                        Lampa.Activity.push({
                            type: a.category[0].type,
                            keyword: a.Keyword,
                            limit: a.limit,
                            title: a.title + ' - ' + a.category[0].title,
                            component: 'torrentapi',
                            page: 1
                        });
                    }
                    
                },
                onBack: function onBack() {
                    Lampa.Controller.toggle('content');
                }
            });
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
                    else listNavigation();//_this.selectGroup();
                },
                up: function up() {
                    // if (Navigator.canmove('up')) Navigator.move('up');
                    // else Lampa.Controller.toggle('head');
                    if (Navigator.canmove('up')) {
                        Navigator.move('up');
                    } else {
                        if (info) {
                            if (!info.find('.view--category').hasClass('focus')) {
                                Lampa.Controller.collectionSet(info);
                                Navigator.move('right')
                            } else Lampa.Controller.toggle('head');
                        } else Lampa.Controller.toggle('head');
                    }
                },
                down: function down() {
                    // if (Navigator.canmove('down')) Navigator.move('down');
                    if (Navigator.canmove('down')) Navigator.move('down');
                    else if (info) {
                        if (info.find('.view--category').hasClass('focus')) {
                            Lampa.Controller.toggle('content');
                        }
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
    function listNavigation() {
        if (Lampa.Storage.get('online_torrentsite_balanser') == '') {
            Lampa.Storage.set('online_torrentsite_balanser', catalogs[0].Keyword);
        }

        var balanser = Lampa.Storage.get('online_torrentsite_balanser');

        var catalogs1 = catalogs.filter(function (fp) {
            return fp.Keyword === balanser
        });

        if (catalogs1.length === 0) {
            catalogs1[0] = catalogs[0];
            Lampa.Storage.set('online_torrentsite_balanser', catalogs[0].Keyword);
        };

        Lampa.Select.show({
            title: catalogs1[0].title,
            items: catalogs1[0].category.filter(function (fp) {
            return fp.category_available == true
        }),
            onSelect: function onSelect(a) {
                Lampa.Activity.push({
                    type: a.type,
                    keyword: catalogs1[0].Keyword,
                    limit: catalogs1[0].limit,
                    title: catalogs1[0].title + ' - ' + a.title,
                    component: 'torrentapi',
                    page: 1
                });
            },
            onBack: function onBack() {
                // Lampa.Controller.toggle('menu');
                Lampa.Controller.toggle('content');
            }
        });

    };
    
    function starttorrentapi() {
        window.plugin_torrentapi_ready = true;
        Lampa.Component.add('torrentapi', torrentapi);
        function addSettingsMagnet() {
            var ico = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path d="M16 1.28C7.883 1.28 1.28 7.883 1.28 16s6.603 14.72 14.72 14.72 14.72 -6.603 14.72 -14.72S24.117 1.28 16 1.28zm9.92 18.536c-1.984 0 -3.136 -1.536 -3.136 -1.536S21.824 22.4 17.28 22.4c-0.896 0 -2.304 -0.536 -2.304 -0.536l2.669 6.172c-0.54 0.073 -1.085 0.124 -1.645 0.124a12.115 12.115 0 0 1 -3.939 -0.665l-6.149 -16.71s-0.448 -0.768 0.256 -0.96c0.704 -0.192 3.456 -0.768 3.456 -0.768s0.944 -0.316 1.152 0.32c0.32 0.832 2.6 7.112 2.6 7.112S14.464 18.56 17.536 18.56c3.008 0 3.776 -2.2 3.648 -2.52 -0.768 -1.92 -3.196 -7.592 -3.196 -7.592s-0.384 -0.704 0.512 -0.896c0.896 -0.192 2.432 -0.448 2.432 -0.448s0.707 -0.104 1.024 0.512c0.472 0.92 3.324 7.208 3.324 7.208s0.704 1.856 2.112 1.856c0.297 0 0.534 -0.029 0.737 -0.067a12.168 12.168 0 0 1 -0.524 3.021c-0.38 0.119 -0.883 0.18 -1.686 0.18z" fill="currentColor"/></svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="torrentapi"><div class="menu__ico">' + ico + '</div><div class="menu__text">磁力</div></li>');
            menu_item.on('hover:enter', function () {
                listNavigation();
            });
            $('.menu .menu__list').eq(0).append(menu_item);
        }

        if (window.appready) addSettingsMagnet()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsMagnet()
            })
        }

        var button = "<div class=\"full-start__button selector view--online_findtorrent\" data-subtitle=\"\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\" width=\"50px\" height=\"50px\"> <path d=\"M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4 S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851 c0,0-0.7-1.2,0.4-1.5c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29 c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8 c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104c-0.082,1.635-0.348,3.221-0.817,4.722 C42.541,30.867,41.756,30.963,40.5,30.963z\" fill=\"currentColor\"></path> </svg>\n\n    <span>搜索磁力</span>\n    </div>";
        
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var btn = $(button);
                btn.on('hover:enter', function () {
                    if (Lampa.Storage.get('online_torrentsite_balanser') == '') {
                        Lampa.Storage.set('online_torrentsite_balanser', catalogs[0].Keyword);
                    }
                    var balanser = Lampa.Storage.get('online_torrentsite_balanser');
                    Lampa.Activity.push({
                        url: '',
                        title: '磁力搜索 - ' + balanser + ' - ' + e.data.movie.title,
                        component: 'torrentapi',
                        search: e.data.movie.title,
                        search_one: e.data.movie.title,
                        search_two: e.data.movie.original_title,
                        movie: e.data.movie,
                        type: 'search',
                        limit: 20,
                        keyword: balanser,
                        page: 1
                    });
                });
                e.object.activity.render().find('.view--torrent').after(btn);
            }
        });

    }

    if (!window.plugin_torrentapi_ready) starttorrentapi();

})();
