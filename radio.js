(function () {
    'use strict';

    function Rad(object) {
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

        if (object.page < 20) {
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

        data.forEach(function (element) {
          var card = Lampa.Template.get('card', {
            title: element.name,
            //release_year: element.time + (element.quality ? ' / ' + element.quality : '')
            release_year: ''
          });
          card.addClass('card--collection');
          card.find('.card__img').attr('src', element.picture);
          card.on('hover:focus', function () {
            last = card[0];
            scroll.update(card, true);
            info.find('.info__title').text(element.name);
            //info.find('.info__title-original').text(element.time + (element.quality ? ' / ' + element.quality : ''));
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
          });
          card.on('hover:enter', function () {
            var video = {
              title: element.name,
              url: element.video
            };
            Lampa.Player.play(video);
            Lampa.Player.playlist([video]);
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

    function startRad() {
      window.plugin_Rad_ready = true;
      Lampa.Component.add('Rad', Rad);
      var catalogs = [{
        title: '国内电视台',
        url: 'https://rentry.co/cniptv/raw'
      },{
        title: 'Pluto.TV',
        url: 'https://rentry.co/PlutoTVjson/raw'
      },
      {
        title: 'PLEX.TV',
        url: 'https://rentry.co/plextv/raw'
      },
      {
        title: 'SAMSUNG.TV',
        url: 'https://rentry.co/SAMSUNGTV/raw'
      }];
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') {
          var ico = '<svg width="200" height="243" viewBox="0 0 200 243" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M187.714 130.727C206.862 90.1515 158.991 64.2019 100.983 64.2019C42.9759 64.2019 -4.33044 91.5669 10.875 130.727C26.0805 169.888 63.2501 235.469 100.983 234.997C138.716 234.526 168.566 171.303 187.714 130.727Z" stroke="white" stroke-width="15"/><path d="M102.11 62.3146C109.995 39.6677 127.46 28.816 169.692 24.0979C172.514 56.1811 135.338 64.2018 102.11 62.3146Z" stroke="white" stroke-width="15"/><path d="M90.8467 62.7863C90.2285 34.5178 66.0667 25.0419 31.7127 33.063C28.8904 65.1461 68.8826 62.7863 90.8467 62.7863Z" stroke="white" stroke-width="15"/><path d="M100.421 58.5402C115.627 39.6677 127.447 13.7181 85.2149 9C82.3926 41.0832 83.5258 35.4214 100.421 58.5402Z" stroke="white" stroke-width="15"/><rect x="39.0341" y="98.644" width="19.1481" height="30.1959" rx="9.57407" fill="white"/><rect x="90.8467" y="92.0388" width="19.1481" height="30.1959" rx="9.57407" fill="white"/><rect x="140.407" y="98.644" width="19.1481" height="30.1959" rx="9.57407" fill="white"/><rect x="116.753" y="139.22" width="19.1481" height="30.1959" rx="9.57407" fill="white"/><rect x="64.9404" y="139.22" width="19.1481" height="30.1959" rx="9.57407" fill="white"/><rect x="93.0994" y="176.021" width="19.1481" height="30.1959" rx="9.57407" fill="white"/></svg>';
          var menu_item = $('<li class="menu__item selector focus" data-action="Rad"><div class="menu__ico">' + ico + '</div><div class="menu__text">电视</div></li>');
          menu_item.on('hover:enter', function () {
            Lampa.Select.show({
              title: '电视',
              items: catalogs,
              onSelect: function onSelect(a) {
                Lampa.Activity.push({
                  url: a.url,
                  title: a.title,
                  component: 'Rad',
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

    if (!window.plugin_Rad_ready) startRad();

})();