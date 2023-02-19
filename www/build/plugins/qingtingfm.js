(function () {
    'use strict';
    Lampa.Template.add('tv_style', '<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div.activity.layer--width.activity--active > div.activity__body > div > div.scroll.scroll--mask.scroll--over.layer--wheight > div > div > div > div.card.selector.card--collection.card--loaded.focus > div.card__view > img{box-shadow: 0 0 0 0.5em #fff10d!important;}</style>');
    $('body').append(Lampa.Template.get('tv_style', {}, true));

    function qingtingfm(object) {
      var network = new Lampa.Reguest();
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true,
        step: 250
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="freetv_n category-full"></div>');
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
        var postdata;
        if (object.keyword){
            postdata = { "query": "{\n        searchResultsPage(keyword:\""+ object.keyword +"\", page:1, include:\"channel_live\" ) {\n          tdk,\n          searchData,\n          numFound\n        }\n      }"};
        } else {
            postdata = { "query": "{\n    radioPage(cid:" + object.cid + ", page:" + object.page + "){\n      contents\n    }\n  }" }
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
        var postdata;
        if (object.keyword){
            postdata = postdata = { "query": "{\n        searchResultsPage(keyword:\""+ object.keyword +"\", page:"+ (parseInt(object.page++)+1) +", include:\"channel_live\" ) {\n          tdk,\n          searchData,\n          numFound\n        }\n      }"};;
        } else {
            postdata = { "query": "{\n    radioPage(cid:" + object.cid + ", page:" + (parseInt(object.page++)+1) + "){\n      contents\n    }\n  }" };
        };
        
        //console.log(postdata)
        
        var _this2 = this;

        if (waitload) return;

        //if (object.page < 50) {
          waitload = true;
          //object.page++;
          var new_data;
          network.silent(object.url, function (result) {
            if (object.keyword){
                new_data = result.data.searchResultsPage.searchData;
            } else {
                new_data = result.data.radioPage.contents.items;
            };
            _this2.append(new_data);
            if (new_data.length) waitload = false;
            Lampa.Controller.enable('content');
          }, false,postdata);
        //}
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

          // card.addClass('card--category');
          card.addClass('card--collection');
          // card.find('.card__view').css({
          //   'padding-bottom': '120%',
          // }).width('auto');
          var img = card.find('.card__img')[0];
          img.onload = function () {
            card.addClass('card--loaded');
          };
          img.onerror = function (e) {
            img.src = './img/img_broken.svg';
          };
          card.find('.card__img').attr('src', (element.cover || 'https:' + element.imgUrl));
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
            info.find('.info__title').text(element.title);
            info.find('.info__title-original').text(element.desc);
            /*info.find('.info__rate span').text(element.score);
            info.find('.info__rate').toggleClass('hide', !(element.score > 0));*/
            var maxrow = Math.ceil(items.length / 7) - 1;
            //console.log(Math.ceil(items.indexOf(card) / 7), maxrow)
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow && maxrow >0 && items.length >= 12) _this3.next();
            //if (element.imgUrl) Lampa.Background.change('https:' + element.imgUrl.replace('l_ratio_poster','s_ratio_poster'));
            //if (Lampa.Helper) Lampa.Helper.show('qt_detail', '长按住 (ОК) 键查看详情', card);
          });
//           card.on('hover:long', function (target, card_data) {
            
//             Lampa.Modal.open({
//               title: '',
//               html: Lampa.Template.get('modal_loading'),
//               size: 'small',
//               mask: true,
//               onBack: function onBack() {
//                 Lampa.Modal.close();
//                 Lampa.Api.clear();
//                 Lampa.Controller.toggle('content');
//               }
//             });
//             var a = {};
//             Lampa.Api.search({
//               query: encodeURIComponent(mytitle)
//             }, function (find) {
// /*              console.log(find)
//               console.log(element);*/
//               Lampa.Modal.close();
//               var finded = _this3.finds(find, element);

//               if (finded) {
//                 Lampa.Activity.push({
//                   url: '',
//                   component: 'full',
//                   id: finded.id,
//                   method: finded.name ? 'tv' : 'movie',
//                   card: finded
//                 });
//               } else {
//                 Lampa.Noty.show('找不到影片信息。');
//                 Lampa.Controller.toggle('content');
//               }
//             }, function () {
//               Lampa.Modal.close();
//               Lampa.Noty.show('找不到影片信息。');
//               Lampa.Controller.toggle('content');
//             });
          

//           });
          card.on('hover:enter', function (target, card_data) {
            var video = {
                title: element.title,
                //url: 'http://lhttp.qingting.fm/live/' + element.id + '/64k.mp3',
                url: 'https://ls.qingting.fm/live/' + element.id + '.m3u8',
                tv: true
            };
            var playlist = [];
            //http://lhttp.qingting.fm/live/
            //https://lhttp.qtfm.cn/live/
              data.forEach(function (elem) {
                  playlist.push({
                    title: elem.title,
                    //url: 'http://lhttp.qingting.fm/live/' + elem.id + '/64k.mp3',
                    url: 'https://ls.qingting.fm/live/' + elem.id + '.m3u8',
                    tv: true
                  });
              });
            Lampa.Player.play(video);
            Lampa.Player.playlist(playlist);
          });

          body.append(card);
          items.push(card);
        });
      };

      this.build = function (data) {
        var _this2 = this;
        Lampa.Background.change();
            //info = Lampa.Template.get('info');style="height:5em"
            Lampa.Template.add('button_category', "<style>@media screen and (max-width: 2560px) {.freetv_n .card--collection {width: 16.6%!important;}}@media screen and (max-width: 385px) {.freetv_n .card--collection {width: 33.3%!important;}}</style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div><div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div></div>");
			Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
			var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
				_this2.selectGroup();
			});
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: '蜻蜓FM - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        //console.log(new_value)
                        var searchurl = 'https://webbff.qingting.fm/www';
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            title: '蜻蜓FM - 搜索"'+new_value+'"',
                            component: 'qingtingfm',
                            keyword: new_value,
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                }) 
			});
            this.selectGroup = function () {
                Lampa.Select.show({
                    title: '蜻蜓FM',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        Lampa.Activity.push({
                            url: a.url,
                            title: '蜻蜓FM - ' + a.title,
                            cid: a.cid,
                            component: 'qingtingfm',
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
        var new_data;
        if (object.keyword){
            new_data = data.data.searchResultsPage.searchData;
        } else {
            new_data = data.data.radioPage.contents.items;
        };
        if (new_data.length) {
            html.append(info);
            html.append(scroll.render());
            this.append(new_data);
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
                      if (!info.find('.view--category').hasClass('focus')) {
                          if (!info.find('.view--category').hasClass('focus')) {
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
    var class_name = '广东&浙江&北京&天津&河北&上海&山西&内蒙古&辽宁&吉林&黑龙江&江苏&安徽&福建&江西&山东&河南&湖北&湖南&广西&海南&重庆&四川&贵州&云南&陕西&甘肃&宁夏&新疆&西藏&青海&资讯台&音乐台&交通台&经济台&文艺台&都市台&体育台&双语台&综合台&生活台&旅游台&曲艺台&方言台';
    var class_url = '217&99&3&5&7&83&19&31&44&59&69&85&111&129&139&151&169&187&202&239&254&257&259&281&291&316&327&351&357&308&342&433&442&429&439&432&441&430&431&440&438&435&436&434';
    var url_link = 'https://webbff.qingting.fm/www';

    var list_radio_name = class_name.split('&');
    var list_radio_id = class_url.split('&');
    
    var catalogs = [];
    $.each(list_radio_name, function (i, val) {
        catalogs.push({
            title: val,
            url: url_link,
            cid: list_radio_id[i],
        });
    }); 

    function startqingtingfm() {
      window.plugin_qingting_ready = true;
      Lampa.Component.add('qingtingfm', qingtingfm);
      
      function addSettingsXztiao() {
        var ico = '<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="radioIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <title id="radioIconTitle">Radio</title> <path d="M5.44972845 6C2.18342385 9.2663046 2.18342385 14.7336954 5.44972845 18M8.59918369 8C6.46693877 10.1322449 6.46693877 13.8677551 8.59918369 16M18.5502716 18C21.8165761 14.7336954 21.8165761 9.2663046 18.5502716 6M15.4008163 16C17.5330612 13.8677551 17.5330612 10.1322449 15.4008163 8"/> <circle cx="12" cy="12" r="1"/> </svg>';
        var menu_item = $('<li class="menu__item selector focus" data-action="qingting"><div class="menu__ico">' + ico + '</div><div class="menu__text">蜻蜓</div></li>');
        menu_item.on('hover:enter', function () {
          Lampa.Select.show({
            title: '蜻蜓FM',
            items: catalogs,
            onSelect: function onSelect(a) {
              Lampa.Activity.push({
                url: a.url,
                title: '蜻蜓FM - ' + a.title,
                cid: a.cid,
                component: 'qingtingfm',
                page: 1
              });
            },
            onBack: function onBack() {
              Lampa.Controller.toggle('menu');
            }
          });
        });
        $('.menu .menu__list').eq(0).append(menu_item);
        //$('.menu .menu__list .menu__item.selector').eq(1).after(menu_item);
      }
  
      if (window.appready) addSettingsXztiao()
      else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') addSettingsXztiao()
        })
      }
    }

    if (!window.plugin_qingting_ready) startqingtingfm();

})();
