(function () {
  'use strict';

  function rtv(object) {
    var network = new Lampa.Reguest();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true,
      step: 250
    });
    var items = [];
    var html = $('<div></div>');
    var body = $('<div class="category-full"></div>');
    var info;
    var last;
    var waitload;

    this.create = function () {
      var _this = this;
      this.activity.loader(true);

      network["native"](object.url + '?v=' + Math.random(), this.build.bind(this), function () {
        var empty = new Lampa.Empty();
        html.append(empty.render());
        _this.start = empty.start;

        _this.activity.loader(false);

        _this.activity.toggle();
      }, false, false, {
        dataType: 'json'
      });

      // if (!!window.cordova) {
      //   network.silent(object.url + '?v=' + Math.random(), this.build.bind(this), function () {
      //     var empty = new Lampa.Empty();
      //     html.append(empty.render());
      //     _this.start = empty.start;

      //     _this.activity.loader(false);

      //     _this.activity.toggle();
      //   });
      // }
      // else {
      //   network["native"](object.url + '?v=' + Math.random(), this.build.bind(this), function () {
      //     var empty = new Lampa.Empty();
      //     html.append(empty.render());
      //     _this.start = empty.start;

      //     _this.activity.loader(false);

      //     _this.activity.toggle();
      //   });
      // }

      return this.render();
    };

    this.next = function () {
      var _this2 = this;

      if (waitload) return;

      if (object.page < 1) {
        waitload = true;
        object.page++;
        network["native"](object.url + '?pg=' + object.page, function (result) {
          _this2.append(result);

          if (result.length) waitload = false;
          Lampa.Controller.enable('content');
        });
      }
    };

    this.append = function (data) {
      var _this3 = this;

      data.data.forEach(function (element) {
        var card = Lampa.Template.get('card', {
          title: element.name,
          //release_year: element.time + (element.quality ? ' / ' + element.quality : '')
          release_year: ''
        });
        card.addClass('card--category');
        card.find('.card__img').attr('src', element.picture);
        var regexp = /[0-9]+(\.[0-9]{1,2})?(GB|MB|gb|mb|p)/g;

        var regexp_ = /[0-9]+(\.[0-9]{1,2})?(p)/g;
        var c = element.oname.match(regexp);
        if (c){
        var quality = c[0].match(regexp_) ? c[0].match(regexp_):'';
        if (quality){
                card.find('.card__view').append('<div class="card__quality"></div>');
                card.find('.card__quality').text(quality);
            };
        };
        /*card.addClass('card--collection').width('14.266%');
        //card.find('.card__img').attr('src', element.picture);
        card.find('.card__img').css({
        'cursor': 'pointer',
        'background-color': '#353535'
      }).width('118.3 px').height('auto').attr('src', element.picture);

        card.find('.card__view').css({
                'padding-bottom': '150%',
      }).width('auto');*/
        var regexp1 = /\d{4}[\s|)|.]/g;
        var myear = element.oname.match(regexp1) ? element.oname.match(regexp1).toString().replace(' ', '').replace('.', '').replace(')', '') : '';
        card.find('.card__view').append('<div class="card__type"></div>');
        card.find('.card__type').text(myear);

        card.on('hover:focus', function () {
          last = card[0];
          scroll.update(card, true);
          info.find('.info__title').text(element.name);
          //console.log(element.oname.match(regexp));
          //info.find('.info__title-original').text(element.time + (element.quality ? ' / ' + element.quality : ''));
          info.find('.info__title-original').text(myear + (element.oname.match(regexp)? ' - ' + element.oname.match(regexp).join(" ").toUpperCase(): ''));
          
          var maxrow = Math.ceil(items.length / 7) - 1;
          if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
          if (element.picture) Lampa.Background.change(element.picture);
          if (Lampa.Helper) Lampa.Helper.show('magnet_detail5', '长按住 (ОК) 键下载至 PikPak', card);
        });
        card.on('hover:enter', function () {
          var video = {
            title: element.name,
            url: element.video
          };
          
          /*Lampa.Player.play(video);
          Lampa.Player.playlist([video]);*/
          
            if (window.intentShim) {
                var intentExtra = {
                    title: element.name,
                    poster: element.picture,
                    action: "play",
                    data: {
                        lampa: true
                    }
                };
                window.plugins.intentShim.startActivity(
                    {
                        action: window.plugins.intentShim.ACTION_VIEW,
                        url: element.video,
                        extras: intentExtra
                    },
                    function () { },
                    function () { console.log('Failed to open magnet URL via Android Intent') }

                );
            } else {
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
              SERVER.object.MagnetUri = element.video;
              SERVER.movie.title = element.name;
              SERVER.object.poster = element.picture;
              Lampa.Android.openTorrent(SERVER);
            };
        });
        card.on('hover:long', function (target, card_data) {
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
              url: element.video
            },
            params: {"from":"file"},
            folder_type: "DOWNLOAD"
          };

          network.native(PikPakProxy() + 'https://api-drive.mypikpak.com/drive/v1/files', function (json) {
            if ("error" in json) {
              Lampa.Noty.show('哦，' + json.error_description + '，添加到 PikPak 失败。');
            } else {
              if (json.upload_type === "UPLOAD_TYPE_URL") {
                Lampa.Noty.show(element.name + ' 的磁力链接已成功添加到 PikPak。');
              };
            }
            Lampa.Modal.close();
            Lampa.Controller.toggle('content');
          }, function (a, c) {
            Lampa.Noty.show('哦: ' + network.errorDecode(a, c));
            Lampa.Modal.close();
            Lampa.Controller.toggle('content');
          }, JSON.stringify(postData_), p);
        });
        
        body.append(card);
        items.push(card);
      });
    };

    function PikPakProxy() {
      var url ;
      //https://api-pikpak.tjsky.cf/
      Lampa.Storage.get('pikpak_proxy') ? url = 'https://cors.eu.org/': url = '';
      return url;
    };

    this.build = function (data) {
      info = Lampa.Template.get('info');
      info.find('.info__rate,.info__right').remove();
      scroll.render().addClass('layer--wheight').data('mheight', info);
      html.append(info);
      html.append(scroll.render());
      this.append(data);
      scroll.append(body);
      this.activity.loader(false);
      this.activity.toggle();
    };

    this.start = function () {
      Lampa.Controller.add('content', {
        toggle: function toggle() {
          Lampa.Controller.collectionSet(scroll.render());
          Lampa.Controller.collectionFocus(last || false, scroll.render());
        },
        left: function left() {
          if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
        },
        right: function right() {
          Navigator.move('right');
        },
        up: function up() {
          if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
        },
        down: function down() {
          if (Navigator.canmove('down')) Navigator.move('down');
        },
        back: function back() {
          Lampa.Activity.backward();
        }
      });
      Lampa.Controller.toggle('content');
    };

    this.pause = function () {};

    this.stop = function () {};

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

  function startmagnet() {
    window.plugin_magnet_ready = true;
    Lampa.Component.add('magnet', rtv);
    var catalogs = [
    {
      title: '今日趋势种子',
      url: 'https://raw.githubusercontents.com/aston314/lampa/main/data/1337x1.json'
    },
    {
      title: '今日热门种子',
      url: 'https://raw.githubusercontents.com/aston314/lampa/main/data/1337x3.json'
    },
    {
      title: '本周热门种子',
      url: 'https://raw.githubusercontents.com/aston314/lampa/main/data/1337x2.json'
    }];


    function addSettingsMagnet() {
      var ico = '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><path d="M19 3h-3c-1.103 0-2 .897-2 2v8c0 1.103-.897 2-2 2s-2-.897-2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v8c0 4.963 4.037 9 9 9s9-4.037 9-9V5c0-1.103-.897-2-2-2zm-3 2h3v3h-3V5zM5 5h3v3H5V5zm7 15c-3.859 0-7-3.141-7-7v-3h3v3c0 2.206 1.794 4 4 4s4-1.794 4-4v-3h3v3c0 3.859-3.141 7-7 7z"/></svg>';
      var menu_item = $('<li class="menu__item selector focus" data-action="rtv"><div class="menu__ico">' + ico + '</div><div class="menu__text">磁力</div></li>');
      menu_item.on('hover:enter', function () {
        Lampa.Select.show({
          title: '磁力',
          items: catalogs,
          onSelect: function onSelect(a) {
            Lampa.Activity.push({
              url: a.url,
              title: a.title,
              component: 'magnet',
              page: 1
            });
          },
          onBack: function onBack() {
            Lampa.Controller.toggle('menu');
          }
        });
      });
      $('.menu .menu__list').eq(0).append(menu_item);
    }

    if (window.appready) addSettingsMagnet()
    else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') addSettingsMagnet()
      })
    }

    // Lampa.Listener.follow('app', function (e) {
    //   if (e.type == 'ready') {
    //     var ico = '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><path d="M19 3h-3c-1.103 0-2 .897-2 2v8c0 1.103-.897 2-2 2s-2-.897-2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v8c0 4.963 4.037 9 9 9s9-4.037 9-9V5c0-1.103-.897-2-2-2zm-3 2h3v3h-3V5zM5 5h3v3H5V5zm7 15c-3.859 0-7-3.141-7-7v-3h3v3c0 2.206 1.794 4 4 4s4-1.794 4-4v-3h3v3c0 3.859-3.141 7-7 7z"/></svg>';
    //      var menu_item = $('<li class="menu__item selector focus" data-action="rtv"><div class="menu__ico">' + ico + '</div><div class="menu__text">磁力</div></li>');
    //     menu_item.on('hover:enter', function () {
    //       Lampa.Select.show({
    //         title: '磁力',
    //         items: catalogs,
    //         onSelect: function onSelect(a) {
    //           Lampa.Activity.push({
    //             url: a.url,
    //             title: a.title,
    //             component: 'magnet',
    //             page: 1
    //           });
    //         },
    //         onBack: function onBack() {
    //           Lampa.Controller.toggle('menu');
    //         }
    //       });
    //     });
    //     $('.menu .menu__list').eq(0).append(menu_item);
    //   }
    // });
  }

  if (!window.plugin_magnet_ready) startmagnet();

})();
