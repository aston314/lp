(function () {
    'use strict';

    function YYDS(object) {
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
        category_id: this.getQueryString(object.url,"category_id"),
        skip: this.getQueryString(object.url,"skip"),
        limit: "24",
        keyword: this.getQueryString(object.url,"keyword")
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
        category_id: this.getQueryString(object.url,"category_id"),
        skip: object.page*24,
        limit: "24",
        keyword: this.getQueryString(object.url,"keyword")
        };

        var _this2 = this;

        if (waitload) return;


        if (object.page < 50) {
          waitload = true;
          object.page++;
          network.silent(object.url + (object.url.indexOf('?') >= 0 ? '&' : '?') +'pg=' + object.page, function (result) {
            _this2.append(result);
            if (result.data.list.length) waitload = false;
            Lampa.Controller.enable('content');
          }, false,postdata);
        }
      };

      this.append = function (data) {
        var _this3 = this;

        data.data.list.forEach(function (element) {
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
          card.find('.card__img').attr('src', element.cover.replace('l_ratio_poster','s_ratio_poster'));
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
            info.find('.info__title-original').text(element.year + (element.region ? ' / ' + element.region : ''));
            info.find('.info__rate span').text(element.score);
            info.find('.info__rate').toggleClass('hide', !(element.score > 0));
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow && maxrow >0 && items.length >= 24) _this3.next();
            if (element.cover) Lampa.Background.change(element.cover.replace('l_ratio_poster','s_ratio_poster'));
            if (Lampa.Helper) Lampa.Helper.show('aliyun_detail', '长按住 (ОК) 键查看详情', card);
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
            element.img = element.cover.replace('l_ratio_poster','s_ratio_poster');
            element.original_title = '';
            element.title = mytitle;
            Lampa.Activity.push({
              url: '',
              title: '在线观看',
              component: 'online_mod',
              search: mytitle,
              search_one: mytitle,
              search_two: mytitle,
              movie: element,
              page: 1
            });
          });

          body.append(card);
          items.push(card);
        });
      };

      this.build = function (data) {
        var _this2 = this;
            //info = Lampa.Template.get('info');style="height:5em"
            Lampa.Template.add('button_category', "<div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div><div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div></div>");
			Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__rate"><span></span></div><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
			var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
				_this2.selectGroup();
			});
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: 'YYDS - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        //console.log(new_value)
                        var search_tempalte = 'https://cmn.yydshd.com/api/posts?category_id=-1&skip=0&limit=24&keyword=#msearchword';
                        var searchurl = search_tempalte.replace('#msearchword',encodeURIComponent(new_value));
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            title: 'YYDS - 搜索"'+new_value+'"',
                            waitload: false,
                            component: 'yy',
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                }) 
			});
            this.selectGroup = function () {
                Lampa.Select.show({
                    title: '频道',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: 'YYDS - '+a.title,
                            component: 'yy',
                            page: 1
                        });
                    },
                    onBack: function onBack() {
                        Lampa.Controller.toggle('content');
                    }
                });
            };
        //info.find('.info__rate,.info__right').remove();
        scroll.render().addClass('layer--wheight').data('mheight', info);
        if (data.data.list.length) {
            html.append(info);
            html.append(scroll.render());
            this.append(data);
            scroll.append(body);
            this.activity.loader(false);
            this.activity.toggle();
        } else {
            html.append(scroll.render());
            _this2.empty();
        }
      };

      this.empty = function () {
        var empty = new Lampa.Empty();
        scroll.append(empty.render());
        this.start = empty.start;
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
					else _this.selectGroup();
                },
                up: function up() {
                    // if (Navigator.canmove('up')) Navigator.move('up');
                    // else Lampa.Controller.toggle('head');
                    if (Navigator.canmove('up')) {
						Navigator.move('up');
					} else {
					 	if (!info.find('.view--category').hasClass('focus') ) {
							if (!info.find('.view--category').hasClass('focus') ) {
								Lampa.Controller.collectionSet(info);
					  		Navigator.move('right')
							}
						} else Lampa.Controller.toggle('head');
					}
                },
                down: function down() {
                    // if (Navigator.canmove('down')) Navigator.move('down');
                    if (Navigator.canmove('down')) Navigator.move('down');
					else if (info.find('.view--category').hasClass('focus')) {
						 Lampa.Controller.toggle('content');
					} 
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

    var catalogs = [{
      title: '首页',
      url: 'https://cmn.yydshd.com/api/posts?category_id=-1&skip=0&limit=24&keyword='
    }, {
      title: '热门精选',
      url: 'https://cmn.yydshd.com/api/posts?category_id=0&skip=0&limit=24&keyword='
    }, {
      title: '电影',
      url: 'https://cmn.yydshd.com/api/posts?category_id=3&skip=0&limit=24&keyword='
    }, {
      title: '剧集',
      url: 'https://cmn.yydshd.com/api/posts?category_id=12&skip=0&limit=24&keyword='
    }, {
      title: '综艺',
      url: 'https://cmn.yydshd.com/api/posts?category_id=10&skip=0&limit=24&keyword='
    }, {
      title: '国产剧',
      url: 'https://cmn.yydshd.com/api/posts?category_id=15&skip=0&limit=24&keyword='
    }, {
      title: '欧美剧',
      url: 'https://cmn.yydshd.com/api/posts?category_id=5&skip=0&limit=24&keyword='
    }, {
      title: '港台剧',
      url: 'https://cmn.yydshd.com/api/posts?category_id=16&skip=0&limit=24&keyword='
    }, {
      title: '日韩剧',
      url: 'https://cmn.yydshd.com/api/posts?category_id=13&skip=0&limit=24&keyword='
    }, {
      title: '纪录片',
      url: 'https://cmn.yydshd.com/api/posts?category_id=1&skip=0&limit=24&keyword='
    }, {
      title: '动漫',
      url: 'https://cmn.yydshd.com/api/posts?category_id=4&skip=0&limit=24&keyword='
    }];

    function startYYDS() {
      window.plugin_yyds_ready = true;
      Lampa.Component.add('yy', YYDS);

      function addSettingsYyds() {
        var ico = '<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.091 6c2.261 0 4.1 1.918 4.1 4.273 0 .163-.014.348-.044.581l-.247 1.913c-.052.398.223.78.634.784l1.98.012c1.15.007 2.087 1.002 2.087 2.218 0 1.224-.942 2.22-2.1 2.22H5C3.566 18 2.4 16.774 2.4 15.266c0-1.096.623-2.082 1.588-2.514l.781-.349c.276-.124.61-.517.619-.93l.019-.857c.014-.642.505-1.164 1.092-1.164.038 0 .113.007.248.042l1.247.317c.318.08.727-.079.876-.371l.604-1.177C10.192 6.868 11.578 6 13.091 6m0-2.4c-2.497 0-4.663 1.448-5.752 3.569a3.401 3.401 0 0 0-.839-.115c-1.904 0-3.448 1.565-3.492 3.509A5.136 5.136 0 0 0 0 15.266C0 18.102 2.238 20.4 5 20.4h14.5c2.485 0 4.5-2.069 4.5-4.62 0-2.542-2-4.602-4.474-4.618.037-.292.064-.587.064-.889.001-3.685-2.909-6.673-6.499-6.673z\" fill=\"white\"/></svg>';
        var menu_item = $('<li class="menu__item selector focus" data-action="yyds"><div class="menu__ico">' + ico + '</div><div class="menu__text">云盘</div></li>');
        menu_item.on('hover:enter', function () {
          Lampa.Select.show({
            title: 'YYDS.FAN',
            items: catalogs,
            onSelect: function onSelect(a) {
              Lampa.Activity.push({
                url: a.url,
                title: 'YYDS - ' + a.title,
                component: 'yy',
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

    if (window.appready) addSettingsYyds()
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') addSettingsYyds()
        })
    }
      
      // Lampa.Listener.follow('app', function (e) {
      //   if (e.type == 'ready') {
      //     //<svg width=\"36px\" height=\"36px\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\"> <path d=\"M959.2 383.9c-.3-82.1-66.9-148.6-149.1-148.6H575.9l21.6 85.2 201 43.7a42.58 42.58 0 0 1 32.9 39.7c.1.5.1 216.1 0 216.6a42.58 42.58 0 0 1-32.9 39.7l-201 43.7-21.6 85.3h234.2c82.1 0 148.8-66.5 149.1-148.6V383.9zM225.5 660.4a42.58 42.58 0 0 1-32.9-39.7c-.1-.6-.1-216.1 0-216.6.8-19.4 14.6-35.5 32.9-39.7l201-43.7 21.6-85.2H213.8c-82.1 0-148.8 66.4-149.1 148.6V641c.3 82.1 67 148.6 149.1 148.6H448l-21.6-85.3-200.9-43.9zm200.9-158.8h171v21.3h-171z\" fill=\"white\"/> </svg>
      //     var ico = '<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.091 6c2.261 0 4.1 1.918 4.1 4.273 0 .163-.014.348-.044.581l-.247 1.913c-.052.398.223.78.634.784l1.98.012c1.15.007 2.087 1.002 2.087 2.218 0 1.224-.942 2.22-2.1 2.22H5C3.566 18 2.4 16.774 2.4 15.266c0-1.096.623-2.082 1.588-2.514l.781-.349c.276-.124.61-.517.619-.93l.019-.857c.014-.642.505-1.164 1.092-1.164.038 0 .113.007.248.042l1.247.317c.318.08.727-.079.876-.371l.604-1.177C10.192 6.868 11.578 6 13.091 6m0-2.4c-2.497 0-4.663 1.448-5.752 3.569a3.401 3.401 0 0 0-.839-.115c-1.904 0-3.448 1.565-3.492 3.509A5.136 5.136 0 0 0 0 15.266C0 18.102 2.238 20.4 5 20.4h14.5c2.485 0 4.5-2.069 4.5-4.62 0-2.542-2-4.602-4.474-4.618.037-.292.064-.587.064-.889.001-3.685-2.909-6.673-6.499-6.673z\" fill=\"white\"/></svg>';
      //     var menu_item = $('<li class="menu__item selector focus" data-action="yyds"><div class="menu__ico">' + ico + '</div><div class="menu__text">云盘</div></li>');
      //     menu_item.on('hover:enter', function () {
      //       Lampa.Select.show({
      //         title: 'YYDS.FAN',
      //         items: catalogs,
      //         onSelect: function onSelect(a) {
      //           Lampa.Activity.push({
      //             url: a.url,
      //             title: 'YYDS - '+a.title,
      //             component: 'yy',
      //             page: 1
      //           });
      //         },
      //         onBack: function onBack() {
      //           Lampa.Controller.toggle('menu');
      //         }
      //       });
      //     });
      //     //$('.menu .menu__list').eq(0).append(menu_item);
      //     $('.menu .menu__list .menu__item.selector').eq(1).after(menu_item);
      //   }
      // });
    }

    if (!window.plugin_yyds_ready) startYYDS();

})();
