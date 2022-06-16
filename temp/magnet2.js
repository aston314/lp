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
        network.silent(object.url, this.build.bind(this), function () {
          var empty = new Lampa.Empty();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.next = function () {
        var _this2 = this;

        if (waitload) return;

        if (object.page < 1) {
          waitload = true;
          object.page++;
          network.silent(object.url + '?pg=' + object.page, function (result) {
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
          card.addClass('card--collection').width('14.266%');
          //card.find('.card__img').attr('src', element.picture);
          card.find('.card__img').css({
          'cursor': 'pointer',
          'background-color': '#353535'
        }).width('118.3 px').height('auto').attr('src', element.picture);

          card.find('.card__view').css({
                  'padding-bottom': '150%',
        }).width('auto');

          card.on('hover:focus', function () {
            last = card[0];
            scroll.update(card, true);
            info.find('.info__title').text(element.name);
            //info.find('.info__title-original').text(element.time + (element.quality ? ' / ' + element.quality : ''));
            info.find('.info__title-original').text('');
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
          });
          card.on('hover:enter', function () {
            var video = {
              title: element.name,
              url: element.video
            };
            /*Lampa.Player.play(video);
            Lampa.Player.playlist([video]);*/
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
            function() {},
            function() {console.log('Failed to open magnet URL via Android Intent')}

            );
          });
          body.append(card);
          items.push(card);
        });
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
        title: '今日观看趋势',
        url: 'https://raw.githubusercontent.com/aston314/lampa/main/1337x1.json'
      }];
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') {var ico = '<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tv"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>';
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
      });
    }

    if (!window.plugin_magnet_ready) startmagnet();

})();
