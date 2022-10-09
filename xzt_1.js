(function () {
    'use strict';

    function xiaozhitiao(object) {
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
      
      this.getQueryString = function (link,name) {
        let reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
        //console.log(link)
        let r = link.match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        };
        return null;
      };

      this.create = function () {
        var postdata = {
            action: this.getQueryString(object.url, "action"),
            cat: this.getQueryString(object.url, "cat"),
            num: this.getQueryString(object.url, "num")
        };
        
        var _this = this;

        this.activity.loader(true);
        
        network.silent(object.url, this.build.bind(this), function () {
          var empty = new Lampa.Empty();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        }, postdata);
        return this.render();
      };

      this.next = function () {
        
        var postdata = {
            action: this.getQueryString(object.url,"action"),
            cat: this.getQueryString(object.url,"cat"),
            num: 1+object.page++
        };
        
        var _this2 = this;

        if (waitload) return;


        if (object.page < 50) {
          waitload = true;
          //object.page++;
          network.silent(object.url, function (result) {
            _this2.append(result);
            if (result.length) waitload = false;
            Lampa.Controller.enable('content');
          }, false,postdata);
        }
      };

      this.append = function (data) {
        var _this3 = this;

        data.forEach(function (element) {
          var mytitle = element.title.replace('/',' ');
          if(mytitle.indexOf(' ' != -1)) mytitle = mytitle.split(' ')[0]
          var card = Lampa.Template.get('card', {
            title: element.title.replace(/\(.+?\)/,''),
            release_year: ''
          });
          //            release_year: (element.year != null && element.region != null) ? (element.year + ' / ' + element.region) : (element.year != null ? element.year : element.region)

          card.addClass('card--category');
          //card.addClass('card--collection');
          var img = card.find('.card__img')[0];
          img.onload = function () {
            card.addClass('card--loaded');
          };
          img.onerror = function (e) {
            img.src = './img/img_broken.svg';
          };
          card.find('.card__img').attr('src', element.cover);
          if (element.subtitle){
            card.find('.card__view').append('<div class="card__quality"></div>');
            card.find('.card__quality').text(element.subtitle.split(' ')[0]);
          };
          if (element.score){
          card.find('.card__view').append('<div class="card__type"></div>');
          card.find('.card__type').text(element.score);
          };
          /*card.find('.card__view').append('<div class="card__quality"></div>');
          card.find('.card__quality').text(element.score);*/
          
          card.on('hover:focus', function () {
            last = card[0];
            scroll.update(card, true);
            info.find('.info__title').text(mytitle);
            //info.find('.info__title-original').text(element.year + (element.region ? ' / ' + element.region : ''));
            /*info.find('.info__rate span').text(element.score);
            info.find('.info__rate').toggleClass('hide', !(element.score > 0));*/
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
            if (element.cover) Lampa.Background.change(element.cover.replace('l_ratio_poster','s_ratio_poster'));
            if (Lampa.Helper) Lampa.Helper.show('xztiao_detail', '长按住 (ОК) 键查看详情', card);
          });
          card.on('hover:long', function (target, card_data) {
            
            Lampa.Modal.open({
              title: '',
              html: Lampa.Template.get('modal_loading'),
              size: 'small',
              mask: true,
              onBack: function onBack() {
                Lampa.Modal.close();
                Lampa.Api.clear();
                Lampa.Controller.toggle('content');
              }
            });
            var a = {};
            Lampa.Api.search({
              query: encodeURIComponent(mytitle)
            }, function (find) {
/*              console.log(find)
              console.log(element);*/
              Lampa.Modal.close();
              var finded = _this3.finds(find, element);

              if (finded) {
                Lampa.Activity.push({
                  url: '',
                  component: 'full',
                  id: finded.id,
                  method: finded.name ? 'tv' : 'movie',
                  card: finded
                });
              } else {
                Lampa.Noty.show('找不到影片信息。');
                Lampa.Controller.toggle('content');
              }
            }, function () {
              Lampa.Modal.close();
              Lampa.Noty.show('找不到影片信息。');
              Lampa.Controller.toggle('content');
            });
          

          });
          card.on('hover:enter', function (target, card_data) {
            element.img = element.cover || './img/img_broken.svg';
            element.original_title = '';
            element.title = mytitle;
            Lampa.Activity.push({
                url: 'https://www.aliyundrive.com/s/' + element.key,
                title: '阿里云盘播放',
                component: 'yunpan2',
                movie: element,
                page: 1
              });
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


      this.finds = function(find) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var finded;

        var filtred = function filtred(items) {
          for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (params.original_title == item.original_title || params.title == item.title || params.original_title == item.name) {
              finded = item;
              break;
            }
          }
        };

        if (find.movie && find.movie.results.length) filtred(find.movie.results);
        if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
        return finded;
      }

      this.finds1 = function (element, find) {
      var finded;
      var filtred = function filtred(items) {
        for (var i = 0; i < items.length; i++) {
          var mytitle = element.title.replace('/',' ');
          if(mytitle.indexOf(' ' != -1)) mytitle = mytitle.split(' ')[0]

          var item = items[i];
          if (( mytitle == (item.title || item.name)) && parseInt(element.year) == (item.first_air_date || item.release_date).split('-').shift()) {
            finded = item;
            break;
          }
        }
      };
      if (find.movie && find.movie.results.length) filtred(find.movie.results);
      if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
      return finded;
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

    function startXZT() {
      window.plugin_xzt_ready = true;
      Lampa.Component.add('xiaozhitiao', xiaozhitiao);
        var catalogs = [
            {
                title: '电影 - 欧美',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=omdy&num=1'
            },
            {
                title: '电影 - 日韩',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=rhdy&num=1'
            }, 
            {
                title: '电影 - 华语',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=hydy&num=1'
            }, 
            {
                title: '电影 - 其他',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=qtdy&num=1'
            },
            {
                title: '电视 - 欧美',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=omds&num=1'
            },
            {
                title: '电视 - 日韩',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=rhds&num=1'
            }, 
            {
                title: '电视 - 华语',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=hyds&num=1'
            }, 
            {
                title: '电视 - 其他',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=qtds&num=1'
            }, {
                title: '动漫 - 国漫',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=hydm&num=1'
            }, {
                title: '动漫 - 日本',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=rhdm&num=1'
            }, {
                title: '动漫 - 欧美',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=omdm&num=1'
            },
            {
                title: '视频 - 综艺',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=zyp&num=1'
            },
            {
                title: '视频 - 纪录',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=jlp&num=1'
            }, {
                title: '视频 - 教育',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=jypx&num=1'
            }, {
                title: '视频 - 其他',
                url: 'https://gitcafe.net/tool/alipaper/?action=viewcat&cat=qtsp&num=1'
            }];
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') {
          //<svg width=\"36px\" height=\"36px\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\"> <path d=\"M959.2 383.9c-.3-82.1-66.9-148.6-149.1-148.6H575.9l21.6 85.2 201 43.7a42.58 42.58 0 0 1 32.9 39.7c.1.5.1 216.1 0 216.6a42.58 42.58 0 0 1-32.9 39.7l-201 43.7-21.6 85.3h234.2c82.1 0 148.8-66.5 149.1-148.6V383.9zM225.5 660.4a42.58 42.58 0 0 1-32.9-39.7c-.1-.6-.1-216.1 0-216.6.8-19.4 14.6-35.5 32.9-39.7l201-43.7 21.6-85.2H213.8c-82.1 0-148.8 66.4-149.1 148.6V641c.3 82.1 67 148.6 149.1 148.6H448l-21.6-85.3-200.9-43.9zm200.9-158.8h171v21.3h-171z\" fill=\"white\"/> </svg>
          var ico = '<svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 3.538c-1.525 0-3.572.168-5.005.307A1.221 1.221 0 0 0 5.891 4.97C5.75 6.818 5.548 9.813 5.548 12c0 2.187.201 5.183.343 7.03a1.22 1.22 0 0 0 1.104 1.125c1.433.14 3.48.306 5.005.306s3.572-.167 5.005-.306a1.221 1.221 0 0 0 1.104-1.125c.142-1.848.343-4.843.343-7.03 0-.705-.021-1.496-.055-2.308h-3.3V8.153h3.224c-.19-2.437-2.093-4.379-4.515-4.557v3.276c0 .708.578 1.282 1.29 1.282v.77l.002.768a2.83 2.83 0 0 1-2.84-2.82V3.54A22.861 22.861 0 0 0 12 3.538Zm1.057-1.517A30.125 30.125 0 0 0 12 2c-1.607 0-3.72.174-5.155.314a2.765 2.765 0 0 0-2.497 2.538C4.205 6.701 4 9.748 4 12s.205 5.3.348 7.148a2.764 2.764 0 0 0 2.497 2.538c1.436.14 3.548.314 5.155.314 1.607 0 3.72-.174 5.155-.314a2.765 2.765 0 0 0 2.497-2.538C19.796 17.299 20 14.252 20 12c0-.948-.036-2.034-.089-3.11v-.01a73.891 73.891 0 0 0-.036-.69c-.18-3.28-2.757-5.963-6.092-6.137a44.523 44.523 0 0 0-.717-.032\" fill=\"white\"/></svg>';
          var menu_item = $('<li class="menu__item selector focus" data-action="yyds"><div class="menu__ico">' + ico + '</div><div class="menu__text">纸条</div></li>');
          menu_item.on('hover:enter', function () {
            Lampa.Select.show({
              title: '小纸条',
              items: catalogs,
              onSelect: function onSelect(a) {
                Lampa.Activity.push({
                  url: a.url,
                  title: '小纸条 - '+a.title,
                  component: 'xiaozhitiao',
                  page: 1
                });
              },
              onBack: function onBack() {
                Lampa.Controller.toggle('menu');
              }
            });
          });
          //$('.menu .menu__list').eq(0).append(menu_item);
          $('.menu .menu__list .menu__item.selector').eq(1).after(menu_item);
        }
      });
    }

    if (!window.plugin_xzt_ready) startXZT();

})();
