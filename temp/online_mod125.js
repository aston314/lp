//15.08.2022 - Sync with upstream

(function () {
    'use strict';
    var extract_rule = {
      "rule": [
        {
          name: '完美看看',
          websitelink: 'https://www.wanmeikk.film/',
          listlink: true,
          search_url: 'https://www.wanmeikk.film/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'div.stui-pannel_bd.col-pd',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: 'LIBVIO',
          websitelink: 'https://www.libvio.me',
          listlink: true,
          search_url: 'https://www.libvio.me/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '.html',
          search_html_selector: '',
          link_folder: 'detail',
          //detail_url_selector: '.stui-pannel__head:contains(LINE)+ul',
          detail_url_selector: 'div > div:nth-child(2) > ul',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '在线之家',
          websitelink: 'https://zxzj.vip',
          listlink: true,
          search_url: 'https://zxzj.vip/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'video',
          detail_url_selector: '.play-item.cont.active',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '凌云影视',
          websitelink: 'https://www.lingyun.in/',
          listlink: true,
          search_url: 'https://www.lingyun.in/ajax/search?wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'data',
          name_json: 'title',
          id_json: 'url',
          first_page_json: '',
          search_html_selector: '',
          link_folder: '',
          detail_url_selector: '.player.ckp:first-child',
          use_referer: true,
          js_execute_key: ['maccms', 'player_data']
        },
        {
          name: '剧白白',
          websitelink: 'https://www.jubaibai.cc',
          listlink: true,
          search_url: 'https://www.jubaibai.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'div.play-item.cont.active',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '秋霞电影',
          websitelink: 'https://www.7xiady.cc',
          listlink: true,
          search_url: 'https://www.7xiady.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: '.stui-pannel_bd.col-pd.clearfix',
          use_referer: false,
          js_execute_key: ['maccms', 'player_data']
        },
        // {
        //   name : '乐猪TV',
        //   websitelink : 'http://www.lezhutv.com/',
        //   listlink : true,
        //   search_url : 'http://www.lezhutv.com/search-pg-1-wd-#msearchword.html',
        //   search_json : false,
        //   node_json : '',
        //   name_json : '',
        //   id_json : '',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder : 'play',
        //   use_referer : false,
        //   js_execute_key : ['maccms','player_aaaa']
        // },
        // {
        //   name : '9亿看看',
        //   websitelink : 'https://www.9eguoyu.com',
        //   listlink : true,
        //   search_url : 'https://www.9eguoyu.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json : true,
        //   node_json : 'list',
        //   name_json : 'name',
        //   id_json : 'id',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder : 'vodplay',
        //   use_referer : false,
        //   js_execute_key : ['maccms','player_aaaa']
        // },
        {
          name: 'AUETE影视',
          websitelink: 'https://auete.com',
          listlink: true,
          search_url: 'https://auete.com/search.php?searchword=#msearchword',
          search_json: false,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '',
          search_html_selector: '.subject.break-all',
          link_folder: '',
          detail_url_reg: '<div id="player_list" class="clearfix mt-3">(.*?)<\/div>',
          detail_url_selector: '#player_list',
          use_referer: false,
          js_execute_key: [';var vfrom=']
        },
        {
          name: '欧乐影视',
          websitelink: 'https://www.olehdtv.com/',
          listlink: true,
          search_url: 'https://www.olehdtv.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'index.php/vod/detail/id',
          detail_url_selector: '.content_playlist.clearfix',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        // {
        //   name : '555电影',
        //   websitelink : 'https://www.555dy.me',
        //   listlink : true,
        //   search_url : 'https://www.555dy.me/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json : true,
        //   node_json : 'list',
        //   name_json : 'name',
        //   id_json : 'id',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder : 'vodplay',
        //   detail_url_selector: '.module-list.sort-list.tab-list.play-tab-list.active',
        //   use_referer : false,
        //  js_execute_key : ['maccms','player_aaaa']
        // },
        // {
        //   name : '看视界',
        //   websitelink : 'https://www.1080kan.cc',
        //   listlink : true,
        //   search_url : 'https://www.1080kan.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json : true,
        //   node_json : 'list',
        //   name_json : 'name',
        //   id_json : 'id',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder : 'video',
        //   detail_url_selector: '.module-list.sort-list.tab-list.play-tab-list.active',
        //   use_referer : false,
        //  js_execute_key : ['maccms','player_aaaa']
        // },
        {
          name: '乌龟影院',
          websitelink: 'https://www.wuguiyy.com',
          listlink: true,
          search_url: 'https://www.wuguiyy.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'div:nth-child(3) > div > div.stui-pannel_bd.col-pd.clearfix > ul > li',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '达达龟',
          websitelink: 'https://www.dadagui.me/',
          listlink: true,
          search_url: 'https://www.dadagui.me/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'vodplay',
          detail_url_selector: 'div#play-box div.play-item.cont.active > ul',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        //   {
        //   name : '大师兄',
        //   websitelink : 'https://dsxys.com/',
        //   listlink : true,
        //   search_url : 'https://dsxys.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json : true,
        //   node_json : '',
        //   name_json : '',
        //   id_json : '',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder : 'p',
        //   detail_url_selector : 'div.player-list',
        //   use_referer : false,
        //   js_execute_key : ['maccms','player_aaaa']
        // },
        {
          name: '神马影院',
          websitelink: 'https://www.smdyy.cc',
          listlink: true,
          search_url: 'https://www.smdyy.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'ul.stui-play__list',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: 'voflix HD',
          websitelink: 'https://www.voflix.com',
          listlink: true,
          search_url: 'https://www.voflix.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: '.module-list.sort-list.tab-list.play-tab-list.active',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '剧荒TV',
          websitelink: 'https://juhuang.tv',
          listlink: true,
          search_url: 'https://so.juhuang.tv/soapi.php?wd=#msearchword',
          search_json: true,
          node_json: 'list',
          name_json: 'vod_name',
          id_json: 'vod_id',
          first_page_json: '_play_1_1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'div.scroll-content',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '厂长资源',
          websitelink: 'https://www.czspp.com',
          listlink: false,
          search_url: 'https://www.czspp.com/xssearch?q=#msearchword',
          search_json: false,
          node_json: '',
          name_json: '',
          id_json: '',
          first_page_json: '',
          search_html_selector: 'h3.dytit',
          link_folder: '',
          detail_url_selector: 'div.paly_list_btn',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '素白白',
          websitelink: 'https://www.subaibaiys.com',
          listlink: false,
          search_url: 'https://www.subaibaiys.com/grabble?q=#msearchword',
          search_json: false,
          node_json: '',
          name_json: '',
          id_json: '',
          first_page_json: '',
          search_html_selector: 'h3.dytit',
          link_folder: '',
          detail_url_selector: 'div.paly_list_btn',
          use_referer: true,
          js_execute_key: []
        },
        // {
        //   name: '独播库',
        //   websitelink: 'https://u.duboku.io',
        //   listlink: true,
        //   search_url: 'https://u.duboku.io/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json: true,
        //   node_json: 'list',
        //   name_json: 'name',
        //   id_json: 'id',
        //   first_page_json: '.html',
        //   search_html_selector: '',
        //   link_folder: 'voddetail',
        //   detail_url_selector: 'div.tab-content.myui-panel_bd',
        //   use_referer: false,
        //   js_execute_key: ['maccms', 'player_data']
        // },
        {
          name: '奈飞中文',
          websitelink: 'https://www.naifei.org',
          listlink: true,
          search_url: 'https://www.naifei.org/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'vodplay',
          detail_url_selector: '.scroll-content:eq(0)',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '鸭奈飞',
          websitelink: 'https://netflix.mom',
          listlink: true,
          search_url: 'https://netflix.mom/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'vodplay',
          detail_url_selector: '.module-play-list:eq(0)',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        // {
        //   name: '黑洞网',
        //   websitelink: 'https://www.nulltm.com',
        //   listlink: true,
        //   search_url: 'https://www.nulltm.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json: true,
        //   node_json: 'list',
        //   name_json: 'name',
        //   id_json: 'id',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder: 'vodplay',
        //   detail_url_selector: '.hl-plays-list',
        //   use_referer: false,
        //   js_execute_key: ['maccms', 'player_aaaa']
        // },
      ],
      "tg_channel": [
        {
          channel_name: 'TG-阿里云盘发布频道',
          channel_uri: 'Aliyundrive_Share_Channel'
        },
        {
          channel_name: 'TG-阿里云盘盘',
          channel_uri: 'yunpanpan'
        },
        {
          channel_name: 'TG-阿里云盘4K影视',
          channel_uri: 'Aliyun_4K_Movies'
        },
        {
          channel_name: 'TG-在花盘',
          channel_uri: 'zaihuayun'
        },
        {
          channel_name: 'TG-肯德基电影院',
          channel_uri: 'XiangxiuNB'
        },
      ]
    };
    var doreg = {};
    var doregjson = {};
    doregjson = extract_rule;
  
    function _typeof(obj) {
      "@babel/helpers - typeof";
  
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
  
    function videocdn(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = [];
      var object = _object;
      var select_title = '';
      var get_links_wait = false;
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: '',
        voice_id: 0
      };
      /**
       * Начать поиск
       * @param {Object} _object 
       * @param {String} kinopoisk_id
       */
  
      this.search = function (_object, kinopoisk_id, data) {
        object = _object;
        var itm = data[0];
        select_title = itm.title || object.movie.title;
        get_links_wait = true;
        var prox = component.proxy('videocdn');
        var url = prox ? prox + 'https://videocdn.tv/api/' : 'http://cdn.svetacdn.in/api/';
        var type = itm.iframe_src.split('/').slice(-2)[0];
        if (type == 'movie') type = 'movies';
        if (type == 'anime') type = 'animes';
        url += type;
        url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
        url = Lampa.Utils.addUrlComponent(url, itm.imdb_id ? 'imdb_id=' + encodeURIComponent(itm.imdb_id) : 'title=' + encodeURIComponent(select_title));
        url = Lampa.Utils.addUrlComponent(url, 'field=' + encodeURIComponent('global'));
        network.silent(url, function (found) {
          results = found.data.filter(function (elem) {
            return elem.id == itm.id;
          });
          success(results);
          component.loading(false);
          if (!results.length) component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: '',
          voice_id: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
  
        if (a.stype == 'voice') {
          choice.voice_name = filter_items.voice[b.index];
          choice.voice_id = filter_items.voice_info[b.index] && filter_items.voice_info[b.index].id;
        }
  
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        results = null;
      };
      /**
       * Успешно, есть данные
       * @param {Object} json 
       */
  
  
      function success(json) {
        results = json;
        extractData(json);
        filter();
        append(filtred());
      }
      /**
       * Получить потоки
       * @param {String} str 
       * @returns array
       */
  
  
      function extractItems(str) {
        try {
          var items = component.parsePlaylist(str).map(function (item) {
            var quality = item.label.match(/(\d\d\d+)p/);
            var file = item.links[0];
            if (file) file = 'http:' + file;
            return {
              label: item.label,
              quality: quality ? parseInt(quality[1]) : NaN,
              file: file || ''
            };
          });
          items.sort(function (a, b) {
            if (b.quality > a.quality) return 1;
            if (b.quality < a.quality) return -1;
            if (b.label > a.label) return 1;
            if (b.label < a.label) return -1;
            return 0;
          });
          return items;
        } catch (e) {}
  
        return [];
      }
      /**
       * Получить информацию о фильме
       * @param {Arrays} results 
       */
  
  
      function extractData(results) {
        network.timeout(20000);
        var movie = results.slice(0, 1)[0];
        extract = {};
  
        if (movie) {
          var src = movie.iframe_src;
          network.silent('http:' + src, function (raw) {
            get_links_wait = false;
            component.render().find('.broadcast__scan').remove();
            var math = raw.replace(/\n/g, '').match(/id="files" value="(.*?)"/);
  
            if (math) {
              var text = document.createElement("textarea");
              text.innerHTML = math[1];
              var json = Lampa.Arrays.decodeJson(text.value, {});
  
              for (var i in json) {
                if (0 === i - 0) {
                  continue;
                }
  
                extract[i] = {
                  json: _typeof(json[i]) == 'object' ? json[i] : Lampa.Arrays.decodeJson(json[i], {}),
                  items: extractItems(json[i])
                };
  
                for (var a in extract[i].json) {
                  var elem = extract[i].json[a];
  
                  if (elem.folder) {
                    for (var f in elem.folder) {
                      var folder = elem.folder[f];
                      folder.items = extractItems(folder.file);
                    }
                  } else elem.items = extractItems(elem.file);
                }
              }
            }
          }, function () {
            get_links_wait = false;
            component.render().find('.broadcast__scan').remove();
          }, false, {
            dataType: 'text'
          });
        }
      }
      /**
       * Найти поток
       * @param {Object} element 
       * @param {Int} max_quality
       * @returns string
       */
  
  
      function getFile(element, max_quality) {
        var translat = extract[element.translation];
        var id = element.season + '_' + element.episode;
        var file = '';
        var items = [];
        var quality = false;
  
        if (translat) {
          if (element.season) {
            for (var i in translat.json) {
              var elem = translat.json[i];
  
              if (elem.folder) {
                for (var f in elem.folder) {
                  var folder = elem.folder[f];
  
                  if (folder.id == id) {
                    items = folder.items;
                    break;
                  }
                }
              } else if (elem.id == id) {
                items = elem.items;
                break;
              }
            }
          } else {
            items = translat.items;
          }
        }
  
        if (items && items.length) {
          max_quality = parseInt(max_quality);
  
          if (max_quality) {
            items = items.filter(function (item) {
              return item.quality <= max_quality;
            });
          }
  
          if (items.length) {
            file = items[0].file;
            quality = {};
            items.forEach(function (item) {
              quality[item.label] = item.file;
            });
            var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
            if (quality[preferably]) file = quality[preferably];
          }
        }
  
        return {
          file: file,
          quality: quality
        };
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          order: [],
          voice_info: []
        };
        results.slice(0, 1).forEach(function (movie) {
          if (movie.season_count) {
            var s = movie.season_count;
  
            while (s--) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (movie.season_count - s));
            }
          }
  
          if (!filter_items.season[choice.season]) choice.season = 0;
  
          if (movie.episodes) {
            component.order.forEach(function (i){
              filter_items.order.push(i.title);
            });
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == choice.season + 1) {
                episode.media.forEach(function (media) {
                  if (!filter_items.voice_info.find(function (v) {
                    return v.id == media.translation.id;
                  })) {
                    filter_items.voice.push(media.translation.shorter_title);
                    filter_items.voice_info.push({
                      id: media.translation.id
                    });
                  }
                });
              }
            });
          }
        });
        if (!filter_items.season[choice.season]) choice.season = 0;
        if (!filter_items.voice[choice.voice]) choice.voice = 0;
  
        if (choice.voice_name) {
          var inx = -1;
  
          if (choice.voice_id) {
            var voice = filter_items.voice_info.find(function (v) {
              return v.id == choice.voice_id;
            });
            if (voice) inx = filter_items.voice_info.indexOf(voice);
          }
  
          if (inx == -1) inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
  
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
        var filtred = [];
        var filter_data = Lampa.Storage.get('online_mod_filter', '{}');
        results.slice(0, 1).forEach(function (movie) {
          if (movie.episodes) {
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == choice.season + 1) {
                var temp = episode.media.filter(function (m) {
                  return filter_items.voice_info[choice.voice] && m.translation.id == filter_items.voice_info[choice.voice].id;
                });
                temp.sort(function (a, b) {
                  return b.max_quality - a.max_quality;
                });
                temp.slice(0, 1).forEach(function (media) {
                  filtred.push({
                    episode: parseInt(episode.num),
                    season: episode.season_num,
                    title: 'S' + episode.season_num + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + episode.num + ' - ' + (episode.ru_title || episode.orig_title),
                    quality: media.max_quality + 'p',
                    info: ' / ' + filter_items.voice[choice.voice],
                    max_quality: media.max_quality,
                    translation: media.translation_id
                  });
                });
              }
            });
          } else if (movie.media) {
            movie.media.forEach(function (element) {
              filtred.push({
                title: element.translation.title,
                quality: element.max_quality + 'p' + (element.source_quality ? ' - ' + element.source_quality.toUpperCase() : ''),
                info: '',
                max_quality: element.max_quality,
                translation: element.translation_id
              });
            });
          }
        });

        // return filtred;
        return component.order[filter_data.order].id == 'invers' ? filtred.reverse() : filtred;
      }
      /**
       * Добавить видео
       * @param {Array} items 
       */
  
  
      function append(items) {
        component.reset();
        if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = filter_items.voice[choice.voice];
          }
  
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          item.addClass('video--stream');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            var extra = getFile(element, element.max_quality);
  
            if (extra.file) {
              var playlist = [];
              var first = {
                url: extra.file,
                quality: extra.quality,
                timeline: element.timeline,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
  
              if (element.season) {
                items.forEach(function (elem) {
                  var ex = getFile(elem, elem.max_quality);
                  playlist.push({
                    url: ex.file,
                    quality: ex.quality,
                    timeline: elem.timeline,
                    title: elem.title
                  });
                });
              } else {
                playlist.push(first);
              }
  
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
  
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate(get_links_wait ? 'online_mod_waitlink' : 'online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            element: element,
            file: function file(call) {
              call(getFile(element, element.max_quality));
            }
          });
        });
        component.start(true);
      }
    }
  
    function rezka(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var embed = component.proxy('rezka') + 'https://voidboost.net/';
      var object = _object;
      var select_title = '';
      var select_id = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_id = kinopoisk_id;
        select_title = object.movie.title;
        getFirstTranlate(kinopoisk_id, function (voice) {
          getFilm(kinopoisk_id, voice);
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        component.loading(true);
        getFirstTranlate(select_id, function (voice) {
          getFilm(select_id, voice);
        });
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        filter();
        component.loading(true);
        choice.voice_token = extract.voice[choice.voice].token;
        getFilm(select_id, choice.voice_token);
        component.saveChoice(choice);
        setTimeout(component.closeFilter, 10);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
      };
  
      function getSeasons(voice, call) {
        var url = embed + 'serial/' + voice + '/iframe?h=gidonline.io';
        network.clear();
        network.timeout(10000);
        network.silent(url, function (str) {
          extractData(str);
          call();
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      }
  
      function getChoiceVoice() {
        var res = extract.voice[0];
  
        if (choice.voice_token) {
          extract.voice.forEach(function (voice) {
            if (voice.token === choice.voice_token) res = voice;
          });
        }
  
        return res;
      }
  
      function getFirstTranlate(id, call) {
        network.clear();
        network.timeout(10000);
        network.silent(embed + 'embed/' + id, function (str) {
          extractData(str);
          if (extract.voice.length) call(getChoiceVoice().token);else component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      }
  
      function getEmbed(url) {
        network.clear();
        network.timeout(10000);
        network.silent(url, function (str) {
          component.loading(false);
          extractData(str);
          filter();
          append();
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      }
      /**
       * Запросить фильм
       * @param {Int} id 
       * @param {String} voice 
       */
  
  
      function getFilm(id, voice) {
        network.clear();
        network.timeout(10000);
        var url = embed;
  
        if (voice) {
          if (extract.season.length) {
            var ses = extract.season[Math.min(extract.season.length - 1, choice.season)].id;
            url += 'serial/' + voice + '/iframe?s=' + ses + '&h=gidonline.io';
            return getSeasons(voice, function () {
              var check = extract.season.filter(function (s) {
                return s.id == ses;
              });
  
              if (!check.length) {
                choice.season = extract.season.length - 1;
                url = embed + 'serial/' + voice + '/iframe?s=' + extract.season[choice.season].id + '&h=gidonline.io';
              }
  
              getEmbed(url);
            });
          } else {
            url += 'movie/' + voice + '/iframe?h=gidonline.io';
            getEmbed(url);
          }
        } else {
          url += 'embed/' + id;
          getEmbed(url);
        }
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: extract.season.map(function (v) {
            return v.name;
          }),
          voice: extract.season.length ? extract.voice.map(function (v) {
            return v.name;
          }) : []
        };
        if (!filter_items.season[choice.season]) choice.season = 0;
        if (!filter_items.voice[choice.voice]) choice.voice = 0;
  
        if (choice.voice_name) {
          var inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
  
        component.filter(filter_items, choice);
      }
  
      function parseSubtitles(str) {
        var subtitles = [];
        var subtitle = str.match("'subtitle': '(.*?)'");
  
        if (subtitle) {
          subtitles = component.parsePlaylist(subtitle[1]).map(function (item) {
            return {
              label: item.label,
              url: item.links[0]
            };
          });
        }
  
        return subtitles.length ? subtitles : false;
      }
      /**
       * Получить потоки
       * @param {String} str 
       * @returns array
       */
  
  
      function extractItems(str) {
        try {
          var items = component.parsePlaylist(str).map(function (item) {
            var quality = item.label.match(/(\d\d\d+)p/);
            return {
              label: item.label,
              quality: quality ? parseInt(quality[1]) : NaN,
              file: item.links.filter(function (url) {
                return /\.mp4$/i.test(url);
              })[0]
            };
          });
          items.sort(function (a, b) {
            if (b.quality > a.quality) return 1;
            if (b.quality < a.quality) return -1;
            if (b.label > a.label) return 1;
            if (b.label < a.label) return -1;
            return 0;
          });
          return items;
        } catch (e) {}
  
        return [];
      }
      /**
       * Получить поток
       * @param {*} element 
       */
  
  
      function getStream(element, call, error) {
        if (element.stream) return call(element);
        var url = embed;
  
        if (element.season) {
          url += 'serial/' + element.voice.token + '/iframe?s=' + element.season + '&e=' + element.episode + '&h=gidonline.io';
        } else {
          url += 'movie/' + element.voice.token + '/iframe?h=gidonline.io';
        }
  
        network.clear();
        network.timeout(3000);
        network.silent(url, function (str) {
          var videos = str.match("'file': '(.*?)'");
  
          if (videos) {
            var video = decode(videos[1]),
                file = '',
                quality = false;
            var items = extractItems(video);
  
            if (items && items.length) {
              file = items[0].file;
              quality = {};
              items.forEach(function (item) {
                quality[item.label] = item.file;
              });
              var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
              if (quality[preferably]) file = quality[preferably];
            }
  
            if (file) {
              element.stream = file;
              element.qualitys = quality;
              element.subtitles = parseSubtitles(str);
              call(element);
            } else error();
          } else error();
        }, error, false, {
          dataType: 'text'
        });
      }
  
      function decode(data) {
        var enc = function enc(str) {
          return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
          }));
        };
  
        var dec = function dec(str) {
          return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
        };
  
        var trashList = ['$$$####!!!!!!!', '^^^^^^##@', '@!^^!@#@@$$$$$', '^^#@@!!@#!$', '@#!@@@##$$@@'];
        var x = data.substring(2);
        trashList.forEach(function (trash) {
          x = x.replace('//_//' + enc(trash), '');
        });
  
        try {
          x = dec(x);
        } catch (e) {
          x = '';
        }
  
        return x;
      }
      /**
       * Получить данные о фильме
       * @param {String} str 
       */
  
  
      function extractData(str) {
        extract.voice = [];
        extract.season = [];
        extract.episode = [];
        str = str.replace(/\n/g, '');
        var voices = str.match('<select name="translator"[^>]+>(.*?)</select>');
        var sesons = str.match('<select name="season"[^>]+>(.*?)</select>');
        var episod = str.match('<select name="episode"[^>]+>(.*?)</select>');
  
        if (sesons) {
          var select = $('<select>' + sesons[1] + '</select>');
          $('option', select).each(function () {
            extract.season.push({
              id: $(this).attr('value'),
              name: $(this).text()
            });
          });
        }
  
        if (voices) {
          var _select = $('<select>' + voices[1] + '</select>');
  
          $('option', _select).each(function () {
            var token = $(this).attr('data-token');
  
            if (token) {
              extract.voice.push({
                token: token,
                name: $(this).text(),
                id: $(this).val()
              });
            }
          });
        }
  
        if (episod) {
          var _select2 = $('<select>' + episod[1] + '</select>');
  
          $('option', _select2).each(function () {
            extract.episode.push({
              id: $(this).attr('value'),
              name: $(this).text()
            });
          });
        }
      }
      /**
       * Показать файлы
       */
  
  
      function append() {
        component.reset();
        var items = [];
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
  
        if (extract.season.length) {
          var ses = extract.season[Math.min(extract.season.length - 1, choice.season)].id;
          var voice = getChoiceVoice();
          extract.episode.forEach(function (episode) {
            items.push({
              title: 'S' + ses + ' / ' + episode.name,
              quality: '360p ~ 1080p',
              season: parseInt(ses),
              episode: parseInt(episode.id),
              info: ' / ' + voice.name,
              voice: voice
            });
          });
        } else {
          extract.voice.forEach(function (voice) {
            items.push({
              title: voice.name.length > 3 ? voice.name : select_title,
              quality: '360p ~ 1080p',
              voice: voice,
              info: ''
            });
          });
        }
  
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.voice.name].join('') : object.movie.original_title + element.voice.name);
          element.timeline = view;
  
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = element.voice.name;
          }
  
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            getStream(element, function (element) {
              var first = {
                url: element.stream,
                quality: element.qualitys,
                subtitles: element.subtitles,
                timeline: element.timeline,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
              Lampa.Player.play(first);
  
              if (element.season && Lampa.Platform.version) {
                var playlist = [];
                items.forEach(function (elem) {
                  if (elem == element) {
                    playlist.push(first);
                  } else {
                    var cell = {
                      url: function url(call) {
                        getStream(elem, function (elem) {
                          cell.url = elem.stream;
                          cell.quality = elem.qualitys;
                          cell.subtitles = elem.subtitles;
                          call();
                        }, function () {
                          cell.url = '';
                          call();
                        });
                      },
                      timeline: elem.timeline,
                      title: elem.title
                    };
                    playlist.push(cell);
                  }
                });
                Lampa.Player.playlist(playlist);
              } else {
                Lampa.Player.playlist([first]);
              }
  
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            }, function () {
              Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
            });
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            element: element,
            file: function file(call) {
              getStream(element, function (element) {
                call({
                  file: element.stream,
                  quality: element.qualitys
                });
              }, function () {
                Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
              });
            }
          });
        });
        component.start(true);
      }
    }
  
    function kinobase(component, _object) {
      var network = new Lampa.Reguest();
      var extract = [];
      var embed = component.proxy('kinobase') + 'https://kinobase.org/';
      var object = _object;
      var select_title = '';
      var select_id = '';
      var is_playlist = false;
      var quality_type = '';
      var translation = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
      /**
       * Поиск
       * @param {Object} _object
       * @param {String} kinopoisk_id
       */
  
      this.search = function (_object, kinopoisk_id, data) {
        var _this = this;
  
        if (this.wait_similars && data && data[0].is_similars) return getPage(data[0].link);
        object = _object;
        select_title = object.search || object.movie.title;
        var url = embed + "search?query=" + encodeURIComponent(component.cleanTitle(select_title));
        network.silent(url, function (str) {
          str = str.replace(/\n/g, '');
          var links = object.movie.number_of_seasons ? str.match(/<a href="\/serial\/([^"]*)" class="link"[^>]*>(.*?)<\/a>/g) : str.match(/<a href="\/film\/([^"]*)" class="link"[^>]*>(.*?)<\/a>/g);
          var search_date = object.search_date || object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
          var search_year = parseInt((search_date + '').slice(0, 4));
  
          if (links) {
            var cards = [];
            links.forEach(function (l) {
              var link = $(l),
                  titl = link.attr('title') || link.text() || '';
              var year = parseInt(titl.split('(').pop().slice(0, -1));
              if (!year || !search_year || year > search_year - 2 && year < search_year + 2) cards.push({
                year: year,
                title: titl.split(/\(\d{4}\)/)[0].trim(),
                link: link.attr('href')
              });
            });
  
            if (cards.length > 1) {
              var tmp = cards.filter(function (c) {
                return c.year == search_year;
              });
              if (tmp.length) cards = tmp;
            }
  
            if (cards.length > 1) {
              var _tmp = cards.filter(function (c) {
                return c.title == select_title;
              });
  
              if (_tmp.length) cards = _tmp;
            }
  
            if (cards.length == 1 && cards[0].link) getPage(cards[0].link);else if (links.length > 1) {
              _this.wait_similars = true;
              var similars = [];
              links.forEach(function (l) {
                var link = $(l),
                    titl = link.attr('title') || link.text();
                similars.push({
                  is_similars: true,
                  title: titl,
                  link: link.attr('href'),
                  filmId: 'similars'
                });
              });
              component.similars(similars);
              component.loading(false);
            } else component.emptyForQuery(select_title);
          } else component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type
       * @param {*} a
       * @param {*} b
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
      };
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
  
        if (is_playlist) {
          extract.forEach(function (item) {
            if (item.playlist) {
              filter_items.season.push(item.comment);
            }
          });
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
  
        if (is_playlist) {
          extract.forEach(function (item, i) {
            if (item.playlist) {
              if (i == choice.season) {
                item.playlist.forEach(function (eps) {
                  if (eps.file) {
                    component.parsePlaylist(eps.file).forEach(function (el) {
                      if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
                        filter_items.voice.push(el.voice);
                      }
                    });
                  }
                });
              }
            } else if (item.file) {
              component.parsePlaylist(item.file).forEach(function (el) {
                if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
                  filter_items.voice.push(el.voice);
                }
              });
            }
          });
        }
  
        if (!filter_items.voice[choice.voice]) choice.voice = 0;
        component.filter(filter_items, choice);
      }
  
      function filtred() {
        var filtred = [];
  
        if (is_playlist) {
          var playlist = extract;
          var season = object.movie.number_of_seasons && 1;
  
          if (extract[choice.season] && extract[choice.season].playlist) {
            playlist = extract[choice.season].playlist;
            season = parseInt(extract[choice.season].comment);
            if (isNaN(season)) season = 1;
          }
  
          playlist.forEach(function (eps, index) {
            var items = extractItems(eps.file, filter_items.voice[choice.voice]);
  
            if (items.length) {
              var alt_voice = eps.comment.match(/\d+ серия (.*)$/i);
              var info = items[0].voice || alt_voice && alt_voice[1].trim() || translation;
              if (info == eps.comment) info = '';
  
              if (season) {
                var episode = parseInt(eps.comment);
                if (isNaN(episode)) episode = index + 1;
                filtred.push({
                  file: eps.file,
                  season: season,
                  episode: episode,
                  title: 'S' + season + ' / ' + eps.comment,
                  quality: items[0].quality + 'p' + (quality_type ? ' - ' + quality_type : ''),
                  info: info ? ' / ' + info : '',
                  voice: items[0].voice,
                  subtitles: parseSubs(eps.subtitle || '')
                });
              } else {
                filtred.push({
                  file: eps.file,
                  title: eps.comment,
                  quality: items[0].quality + 'p' + (quality_type ? ' - ' + quality_type : ''),
                  info: info ? ' / ' + info : '',
                  voice: items[0].voice,
                  subtitles: parseSubs(eps.subtitle || '')
                });
              }
            }
          });
        } else {
          filtred = extract;
        }
  
        return filtred;
      }
  
      function parseSubs(vod) {
        var subtitles = component.parsePlaylist(vod).map(function (item) {
          return {
            label: item.label,
            url: item.links[0]
          };
        });
        return subtitles.length ? subtitles : false;
      }
      /**
       * Получить данные о фильме
       * @param {String} str
       */
  
  
      function extractData(str, page) {
        var quality_match = page.match(/<li><b>Качество:<\/b>([^<,]+)<\/li>/i);
        var translation_match = page.match(/<li><b>Перевод:<\/b>([^<,]+)<\/li>/i);
        quality_type = quality_match ? quality_match[1].trim() : '';
        translation = translation_match ? translation_match[1].trim() : '';
        var vod = str.split('|');
  
        if (vod[0] == 'file') {
          var file = vod[1];
          var found = [];
          var subtiles = parseSubs(vod[2]);
  
          if (file) {
            var voices = {};
            component.parsePlaylist(file).forEach(function (item) {
              var prev = voices[item.voice || ''];
              var quality_str = item.label.match(/(\d\d\d+)p/);
              var quality = quality_str ? parseInt(quality_str[1]) : NaN;
  
              if (!prev || quality > prev.quality) {
                voices[item.voice || ''] = {
                  quality: quality
                };
              }
            });
  
            for (var voice in voices) {
              var el = voices[voice];
              found.push({
                file: file,
                title: voice || translation || object.movie.title,
                quality: el.quality + 'p' + (quality_type ? ' - ' + quality_type : ''),
                info: '',
                voice: voice,
                subtitles: subtiles
              });
            }
          }
  
          extract = found;
          is_playlist = false;
        } else if (vod[0] == 'pl') {
          extract = Lampa.Arrays.decodeJson(vod[1], []);
          is_playlist = true;
        } else component.emptyForQuery(select_title);
      }
  
      function getPage(url) {
        network.clear();
        network.timeout(1000 * 10);
        network.silent(embed + url, function (str) {
          str = str.replace(/\n/g, '');
          var MOVIE_ID = str.match('var MOVIE_ID = ([^;]+);');
          var IDENTIFIER = str.match('var IDENTIFIER = "([^"]+)"');
          var PLAYER_CUID = str.match('var PLAYER_CUID = "([^"]+)"');
  
          if (MOVIE_ID && IDENTIFIER && PLAYER_CUID) {
            select_id = MOVIE_ID[1];
            var identifier = IDENTIFIER[1];
            var player_cuid = PLAYER_CUID[1];
            var data_url = "user_data";
            data_url = Lampa.Utils.addUrlComponent(data_url, "page=movie");
            data_url = Lampa.Utils.addUrlComponent(data_url, "movie_id=" + select_id);
            data_url = Lampa.Utils.addUrlComponent(data_url, "cuid=" + player_cuid);
            data_url = Lampa.Utils.addUrlComponent(data_url, "device=DESKTOP");
            data_url = Lampa.Utils.addUrlComponent(data_url, "_=" + Date.now());
            network.clear();
            network.timeout(1000 * 10);
            network.silent(embed + data_url, function (user_data) {
              if (user_data.vod_hash && user_data.vod_time) {
                var file_url = "vod/" + select_id;
                file_url = Lampa.Utils.addUrlComponent(file_url, "identifier=" + identifier);
                file_url = Lampa.Utils.addUrlComponent(file_url, "player_type=new");
                file_url = Lampa.Utils.addUrlComponent(file_url, "file_type=mp4");
                file_url = Lampa.Utils.addUrlComponent(file_url, "st=" + user_data.vod_hash);
                file_url = Lampa.Utils.addUrlComponent(file_url, "e=" + user_data.vod_time);
                file_url = Lampa.Utils.addUrlComponent(file_url, "_=" + Date.now());
                network.clear();
                network.timeout(1000 * 10);
                network.silent(embed + file_url, function (files) {
                  component.loading(false);
                  extractData(files, str);
                  filter();
                  append(filtred());
                }, function (a, c) {
                  component.empty(network.errorDecode(a, c));
                }, false, {
                  dataType: 'text'
                });
              } else component.empty(Lampa.Lang.translate('torrent_parser_no_hash'));
            }, function (a, c) {
              component.empty(network.errorDecode(a, c));
            });
          } else component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      }
      /**
       * Получить потоки
       * @param {String} str
       * @param {String} voice
       * @returns array
       */
  
  
      function extractItems(str, voice) {
        try {
          var list = component.parsePlaylist(str);
  
          if (voice) {
            var tmp = list.filter(function (el) {
              return el.voice == voice;
            });
  
            if (tmp.length) {
              list = tmp;
            } else {
              list = list.filter(function (el) {
                return typeof el.voice == 'undefined';
              });
            }
          }
  
          var items = list.map(function (item) {
            var quality = item.label.match(/(\d\d\d+)p/);
            return {
              label: item.label,
              voice: item.voice,
              quality: quality ? parseInt(quality[1]) : NaN,
              file: item.links[0]
            };
          });
          items.sort(function (a, b) {
            if (b.quality > a.quality) return 1;
            if (b.quality < a.quality) return -1;
            if (b.label > a.label) return 1;
            if (b.label < a.label) return -1;
            return 0;
          });
          return items;
        } catch (e) {}
  
        return [];
      }
  
      function getStream(element) {
        var file = '',
            quality = false;
        var items = extractItems(element.file, element.voice);
  
        if (items && items.length) {
          file = items[0].file;
          quality = {};
          items.forEach(function (item) {
            quality[item.label] = item.file;
          });
          var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
          if (quality[preferably]) file = quality[preferably];
        }
  
        element.stream = file;
        element.qualitys = quality;
        return {
          file: file,
          quality: quality
        };
      }
      /**
       * Показать файлы
       */
  
  
      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element, index) {
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.title, 'kinobase'].join('') : object.movie.original_title + element.quality + 'kinobase');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            getStream(element);
  
            if (element.stream) {
              var playlist = [];
              var first = {
                url: element.stream,
                quality: element.qualitys,
                subtitles: element.subtitles,
                timeline: element.timeline,
                title: element.season ? element.title : object.movie.title + (element.title == object.movie.title ? '' : ' / ' + element.title)
              };
  
              if (element.season) {
                items.forEach(function (elem) {
                  getStream(elem);
                  playlist.push({
                    url: elem.stream,
                    quality: elem.qualitys,
                    subtitles: elem.subtitles,
                    timeline: elem.timeline,
                    title: elem.title
                  });
                });
              } else {
                playlist.push(first);
              }
  
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
  
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call(getStream(element));
            }
          });
        });
        component.start(true);
      }
    }
  
    function collaps(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var embed = component.proxy('collaps') + 'http://api.tobaco.ws/embed/';
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_title = object.movie.title;
        var url = embed + 'kp/' + kinopoisk_id;
        network.silent(url, function (str) {
          if (str) {
            parse(str);
          } else component.emptyForQuery(select_title);
  
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
      };
  
      function parse(str) {
        str = str.replace(/\n/g, '');
        var find = str.match('makePlayer\\({(.*?)}\\);');
        var json;
  
        try {
          json = find && eval('({' + find[1] + '})');
        } catch (e) {}
  
        if (json) {
          extract = json;
  
          if (extract.playlist && extract.playlist.seasons) {
            extract.playlist.seasons.sort(function (a, b) {
              return a.season - b.season;
            });
          }
  
          filter();
          append(filtred());
        } else component.emptyForQuery(select_title);
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
  
        if (extract.playlist && extract.playlist.seasons) {
          extract.playlist.seasons.forEach(function (season) {
            filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
          });
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
        var filtred = [];
  
        if (extract.playlist) {
          extract.playlist.seasons.forEach(function (season, i) {
            if (i == choice.season) {
              season.episodes.forEach(function (episode) {
                var audio_tracks = episode.audio.names.map(function (name) {
                  return {
                    language: name
                  };
                });
                filtred.push({
                  file: episode.hls,
                  episode: parseInt(episode.episode),
                  season: season.season,
                  title: episode.title,
                  quality: '',
                  info: episode.audio.names.slice(0, 5).join(', '),
                  subtitles: episode.cc ? episode.cc.map(function (c) {
                    return {
                      label: c.name,
                      url: c.url
                    };
                  }) : false,
                  audio_tracks: audio_tracks.length ? audio_tracks : false
                });
              });
            }
          });
        } else if (extract.source) {
          var resolution = Lampa.Arrays.getKeys(extract.qualityByWidth).pop();
          var max_quality = extract.qualityByWidth ? extract.qualityByWidth[resolution] || 0 : 0;
          var audio_tracks = extract.source.audio.names.map(function (name) {
            return {
              language: name
            };
          });
          filtred.push({
            file: extract.source.hls,
            title: extract.title,
            quality: max_quality ? max_quality + 'p / ' : '',
            info: extract.source.audio.names.slice(0, 5).join(', '),
            subtitles: extract.source.cc ? extract.source.cc.map(function (c) {
              return {
                label: c.name,
                url: c.url
              };
            }) : false,
            audio_tracks: audio_tracks.length ? audio_tracks : false
          });
        }
  
        return filtred;
      }
      /**
       * Показать файлы
       */
  
  
      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.title].join('') : object.movie.original_title + 'collaps');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
  
            if (element.file) {
              var playlist = [];
              var first = {
                url: element.file,
                subtitles: element.subtitles,
                translate: {
                  tracks: element.audio_tracks
                },
                timeline: element.timeline,
                title: element.season ? element.title : object.movie.title + (element.title == object.movie.title ? '' : ' / ' + element.title)
              };
  
              if (element.season) {
                items.forEach(function (elem) {
                  playlist.push({
                    url: elem.file,
                    subtitles: elem.subtitles,
                    translate: {
                      tracks: elem.audio_tracks
                    },
                    timeline: elem.timeline,
                    title: elem.title
                  });
                });
              } else {
                playlist.push(first);
              }
  
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
  
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }
  
    function cdnmovies(component, _object) {
      var network = new Lampa.Reguest();
      var extract = [];
      var object = _object;
      var select_title = '';
      var embed = component.proxy('cdnmovies') + 'https://cdnmovies.net/api/short';
      var token = '02d56099082ad5ad586d7fe4e2493dd9';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      /**
       * Начать поиск
       * @param {Object} _object 
       * @param {String} kinopoisk_id
       */
  
      this.search = function (_object, kinopoisk_id) {
        var _this = this;
  
        object = _object;
        select_title = object.movie.title;
        var url = embed;
        url = Lampa.Utils.addUrlComponent(url, 'token=' + token);
        url = Lampa.Utils.addUrlComponent(url, 'kinopoisk_id=' + kinopoisk_id);
        network.silent(url, function (str) {
          var iframe = String(str).match('"iframe_src":"(.*?)"');
  
          if (iframe && iframe[1]) {
            iframe = 'https:' + iframe[1].split('\\').join('');
  
            _this.find(iframe);
          } else {
            component.emptyForQuery(select_title);
          }
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      };
  
      this.find = function (url) {
        network.clear();
        network.timeout(10000);
        network.silent(url, function (json) {
          parse(json);
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
      };
  
      function parse(str) {
        str = str.replace(/\n/g, '');
        var find = str.match("Playerjs\\({.*?\\bfile:'(.*?)'}\\);");
        var video = find && (decode(find[1]) || find[1]);
        var json;
  
        try {
          json = video && JSON.parse(video);
        } catch (e) {}
  
        if (json) {
          extract = json;
          filter();
          append(filtred());
        } else component.emptyForQuery(select_title);
      }
  
      function decode(data) {
        data = data.replace('#2', '').replace('//NTR2amZoY2dkYnJ5ZGtjZmtuZHo1Njg0MzZmcmVkKypk', '').replace('//YXorLWVydyozNDU3ZWRndGpkLWZlcXNwdGYvcmUqcSpZ', '').replace('//LSpmcm9mcHNjcHJwYW1mcFEqNDU2MTIuMzI1NmRmcmdk', '').replace('//ZGY4dmc2OXI5enhXZGx5ZisqZmd4NDU1ZzhmaDl6LWUqUQ==', '').replace('//bHZmeWNnbmRxY3lkcmNnY2ZnKzk1MTQ3Z2ZkZ2YtemQq', '');
  
        try {
          return decodeURIComponent(atob(data).split("").map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(""));
        } catch (e) {
          return '';
        }
      }
      /**
       * Получить потоки
       * @param {String} str 
       * @returns array
       */
  
  
      function extractItems(str, url) {
        try {
          var base_url = url.substring(0, url.lastIndexOf('/'));
          var items = component.parseM3U(str).map(function (item) {
            var link = item.link.replace(/(\.mp4):hls:manifest\.m3u8$/i, '$1');
            var quality = item.height;
            var alt_quality = link.match(/\b(\d\d\d+)\b/);
  
            if (alt_quality) {
              var alt_height = parseInt(alt_quality[1]);
              if (alt_height > quality && alt_height <= 4320) quality = alt_height;
            }
  
            return {
              label: quality ? quality + 'p' : '360p ~ 1080p',
              quality: quality,
              file: link.indexOf('://') == -1 ? base_url + '/' + link : link
            };
          });
          items.sort(function (a, b) {
            if (b.quality > a.quality) return 1;
            if (b.quality < a.quality) return -1;
            if (b.label > a.label) return 1;
            if (b.label < a.label) return -1;
            return 0;
          });
          return items;
        } catch (e) {}
  
        return [];
      }
      /**
       * Получить поток
       * @param {*} element 
       */
  
  
      function getStream(element, call, error) {
        if (element.stream) return call(element);
        var url = element.file;
        network.clear();
        network.timeout(3000);
        network.silent(url, function (str) {
          var file = '';
          var quality = false;
          var items = extractItems(str, url);
  
          if (items && items.length) {
            file = items[0].file;
            quality = {};
            items.forEach(function (item) {
              quality[item.label] = item.file;
            });
            var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
            if (quality[preferably]) file = quality[preferably];
          }
  
          if (file) {
            element.stream = file;
            element.qualitys = quality;
            call(element);
          } else error();
        }, error, false, {
          dataType: 'text'
        });
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
        extract.forEach(function (season) {
          if (season.folder) filter_items.season.push(season.title);
        });
        if (!filter_items.season[choice.season]) choice.season = 0;
  
        if (extract[choice.season] && extract[choice.season].folder) {
          extract[choice.season].folder.forEach(function (f) {
            f.folder.forEach(function (t) {
              if (filter_items.voice.indexOf(t.title) == -1) filter_items.voice.push(t.title);
            });
          });
        }
  
        if (!filter_items.voice[choice.voice]) choice.voice = 0;
  
        if (choice.voice_name) {
          var inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
  
        component.filter(filter_items, choice);
      }
  
      function parseSubs(str) {
        var subtitles = component.parsePlaylist(str).map(function (item) {
          return {
            label: item.label,
            url: item.links[0]
          };
        });
        return subtitles.length ? subtitles : false;
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
        var filtred = [];
        extract.forEach(function (data) {
          if (data.folder) {
            if (data.title == filter_items.season[choice.season]) {
              data.folder.forEach(function (se) {
                se.folder.forEach(function (eps) {
                  if (eps.title == filter_items.voice[choice.voice]) {
                    var episode_num = parseInt(se.title.match(/\d+/));
                    var season_num = parseInt(data.title.match(/\d+/));
                    filtred.push({
                      file: eps.file,
                      episode: episode_num,
                      season: season_num,
                      title: 'S' + season_num + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + episode_num,
                      quality: '360p ~ 1080p',
                      info: ' / ' + Lampa.Utils.shortText(eps.title, 50)
                    });
                  }
                });
              });
            }
          } else {
            filtred.push({
              file: data.file,
              title: data.title,
              quality: '360p ~ 1080p',
              info: '',
              subtitles: data.subtitle ? parseSubs(data.subtitle) : false
            });
          }
        });
        return filtred;
      }
      /**
       * Добавить видео
       * @param {Array} items 
       */
  
  
      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          item.addClass('video--stream');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            getStream(element, function (element) {
              var first = {
                url: element.stream,
                quality: element.qualitys,
                subtitles: element.subtitles,
                timeline: element.timeline,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
              Lampa.Player.play(first);
  
              if (element.season && Lampa.Platform.version) {
                var playlist = [];
                items.forEach(function (elem) {
                  if (elem == element) {
                    playlist.push(first);
                  } else {
                    var cell = {
                      url: function url(call) {
                        getStream(elem, function (elem) {
                          cell.url = elem.stream;
                          cell.quality = elem.qualitys;
                          cell.subtitles = elem.subtitles;
                          call();
                        }, function () {
                          cell.url = '';
                          call();
                        });
                      },
                      timeline: elem.timeline,
                      title: elem.title
                    };
                    playlist.push(cell);
                  }
                });
                Lampa.Player.playlist(playlist);
              } else {
                Lampa.Player.playlist([first]);
              }
  
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            }, function () {
              Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
            });
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              getStream(element, function (element) {
                call({
                  file: element.stream,
                  quality: element.qualitys
                });
              }, function () {
                Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
              });
            }
          });
        });
        component.start(true);
      }
    }
  
    function filmix(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = {};
      var object = _object;
      var embed = 'http://filmixapp.cyou/api/v2/';
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      var token = Lampa.Storage.get('filmix_token', '');
  
      if (!window.filmix) {
        window.filmix = {
          max_qualitie: 720,
          is_max_qualitie: false
        };
      }
  
      var dev_token = '?user_dev_apk=1.1.2&&user_dev_name=Xiaomi&user_dev_os=11&user_dev_token=' + token + '&user_dev_vendor=Xiaomi';
      /**
       * Начать поиск
       * @param {Object} _object 
       * @param {String} kinopoisk_id
       */
  
      this.search = function (_object, kinopoisk_id, data) {
        var _this = this;
  
        if (this.wait_similars && data && data[0].is_similars) return this.find(data[0].id);
        object = _object;
        select_title = object.search || object.movie.title;
        var search_date = object.search_date || object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
        var search_year = parseInt((search_date + '').slice(0, 4));
        var orig = object.movie.original_title || object.movie.original_name;
        var url = embed + 'suggest';
        url = Lampa.Utils.addUrlComponent(url, 'word=' + encodeURIComponent(component.cleanTitle(select_title)));
        network.clear();
        network.timeout(10000);
        network.silent(url, function (json) {
          var cards = json.filter(function (c) {
            if (!c.year && c.alt_name) c.year = parseInt(c.alt_name.split('-').pop());
            return !c.year || !search_year || c.year > search_year - 2 && c.year < search_year + 2;
          });
  
          if (cards.length > 1) {
            var tmp = cards.filter(function (c) {
              return c.year == search_year;
            });
            if (tmp.length) cards = tmp;
          }
  
          if (cards.length > 1) {
            var _tmp = cards.filter(function (c) {
              return c.original_title == orig;
            });
  
            if (_tmp.length) cards = _tmp;
          }
  
          if (cards.length > 1) {
            var _tmp2 = cards.filter(function (c) {
              return c.title == select_title;
            });
  
            if (_tmp2.length) cards = _tmp2;
          }
  
          if (cards.length == 1) _this.find(cards[0].id);else if (json.length > 1) {
            _this.wait_similars = true;
            json.forEach(function (c) {
              c.is_similars = true;
            });
            component.similars(json);
            component.loading(false);
          } else component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        });
      };
  
      this.find = function (filmix_id) {
        var url = embed;
  
        if (!window.filmix.is_max_qualitie && token) {
          window.filmix.is_max_qualitie = true;
          network.clear();
          network.timeout(10000);
          network.silent(url + 'user_profile' + dev_token, function (found) {
            if (found && found.user_data) {
              if (found.user_data.is_pro) window.filmix.max_qualitie = 1080;
              if (found.user_data.is_pro_plus) window.filmix.max_qualitie = 2160;
            }
  
            end_search(filmix_id);
          });
        } else end_search(filmix_id);
  
        function end_search(filmix_id) {
          network.clear();
          network.timeout(10000);
          network.silent(window.filmix.is_max_qualitie ? url + 'post/' + filmix_id + dev_token : url + 'post/' + filmix_id, function (found) {
            if (found && Object.keys(found).length) {
              success(found);
              component.loading(false);
            } else component.emptyForQuery(select_title);
          }, function (a, c) {
            component.empty(network.errorDecode(a, c));
          });
        }
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        extractData(results);
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        extractData(results);
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        results = null;
      };
      /**
       * Успешно, есть данные
       * @param {Object} json
       */
  
  
      function success(json) {
        results = json;
        extractData(json);
        filter();
        append(filtred());
      }
      /**
       * Получить информацию о фильме
       * @param {Arrays} data
       */
  
  
      function extractData(data) {
        extract = {};
        var pl_links = data.player_links || {};
  
        if (pl_links.playlist && Object.keys(pl_links.playlist).length > 0) {
          var seas_num = 0;
  
          for (var season in pl_links.playlist) {
            var episode = pl_links.playlist[season];
            ++seas_num;
            var transl_id = 0;
  
            for (var voice in episode) {
              var episode_voice = episode[voice];
              ++transl_id;
              var items = [];
  
              for (var ID in episode_voice) {
                var file_episod = episode_voice[ID];
                var quality_eps = file_episod.qualities.filter(function (qualitys) {
                  return qualitys <= window.filmix.max_qualitie;
                });
                quality_eps.sort(function (a, b) {
                  return b - a;
                });
                var max_quality = quality_eps[0];
                var stream_url = file_episod.link;
                var s_e = stream_url.substring(stream_url.lastIndexOf('/'));
                var str_s_e = s_e.match(/s(\d+)e(\d+)_%s\.mp4/i);
  
                if (str_s_e) {
                  var _seas_num = parseInt(str_s_e[1]);
  
                  var _epis_num = parseInt(str_s_e[2]);
  
                  items.push({
                    id: _seas_num + '_' + _epis_num,
                    file: stream_url,
                    episode: _epis_num,
                    season: _seas_num,
                    quality: max_quality,
                    qualities: quality_eps,
                    translation: transl_id
                  });
                }
              }
  
              if (!extract[transl_id]) extract[transl_id] = {
                json: [],
                file: ''
              };
              extract[transl_id].json.push({
                id: seas_num,
                folder: items,
                translation: transl_id
              });
            }
          }
        } else if (pl_links.movie && pl_links.movie.length > 0) {
          var _transl_id = 0;
  
          for (var _ID in pl_links.movie) {
            var _file_episod = pl_links.movie[_ID];
            ++_transl_id;
            var _max_quality = window.filmix.max_qualitie;
  
            var _quality_eps = _file_episod.link.match(/\[([\d,]*)\]\.mp4/i);
  
            if (_quality_eps) {
              _quality_eps = _quality_eps[1].split(',').map(function (quality) {
                return parseInt(quality);
              }).filter(function (quality) {
                return quality <= window.filmix.max_qualitie;
              });
  
              _quality_eps.sort(function (a, b) {
                return b - a;
              });
  
              _max_quality = _quality_eps[0];
            }
  
            var file_url = _file_episod.link.replace(/\[[\d,]*\](\.mp4)/i, '%s$1');
  
            extract[_transl_id] = {
              file: file_url,
              translation: _file_episod.translation,
              quality: _max_quality,
              qualities: _quality_eps
            };
          }
        }
      }
      /**
       * Найти поток
       * @param {Object} element
       * @param {Int} max_quality
       * @returns string
       */
  
  
      function getFile(element, max_quality) {
        var translat = extract[element.translation];
        var id = element.season + '_' + element.episode;
        var file = '';
        var eps = {};
        var quality = false;
  
        if (translat) {
          if (element.season) for (var i in translat.json) {
            var elem = translat.json[i];
            if (elem.folder) for (var f in elem.folder) {
              var folder = elem.folder[f];
  
              if (folder.id == id) {
                eps = folder;
                break;
              }
            } else {
              if (elem.id == id) {
                eps = elem;
                break;
              }
            }
          } else eps = translat;
        }
  
        file = eps.file;
  
        if (file) {
          quality = {};
  
          if (eps.qualities) {
            eps.qualities.forEach(function (q) {
              quality[q + 'p'] = file.replace(/%s(\.mp4)/i, q + '$1');
            });
            file = file.replace(/%s(\.mp4)/i, eps.qualities[0] + '$1');
          }
  
          var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
          if (quality[preferably]) file = quality[preferably];
        }
  
        return {
          file: file,
          quality: quality
        };
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          voice_info: []
        };
  
        if (results.last_episode && results.last_episode.season) {
          var s = results.last_episode.season;
  
          while (s--) {
            filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (results.last_episode.season - s));
          }
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
        var seas_num = 0;
        var pl_links = results.player_links || {};
  
        for (var Id in pl_links.playlist) {
          var season = pl_links.playlist[Id];
          ++seas_num;
  
          if (seas_num == choice.season + 1) {
            var d = 0;
  
            for (var voic in season) {
              ++d;
  
              if (filter_items.voice.indexOf(voic) == -1) {
                filter_items.voice.push(voic);
                filter_items.voice_info.push({
                  id: d
                });
              }
            }
          }
        }
  
        if (!filter_items.voice[choice.voice]) choice.voice = 0;
  
        if (choice.voice_name) {
          var inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
  
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
        var filtred = [];
        var pl_links = results.player_links || {};
  
        if (pl_links.playlist && Object.keys(pl_links.playlist).length) {
          for (var transl in extract) {
            var element = extract[transl];
  
            for (var season_id in element.json) {
              var episode = element.json[season_id];
  
              if (episode.id == choice.season + 1) {
                episode.folder.forEach(function (media) {
                  if (filter_items.voice_info[choice.voice] && media.translation == filter_items.voice_info[choice.voice].id) {
                    filtred.push({
                      episode: media.episode,
                      season: media.season,
                      title: 'S' + media.season + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + media.episode,
                      quality: media.quality + 'p',
                      info: ' / ' + Lampa.Utils.shortText(filter_items.voice[choice.voice], 50),
                      translation: media.translation
                    });
                  }
                });
              }
            }
          }
        } else if (pl_links.movie && Object.keys(pl_links.movie).length) {
          for (var transl_id in extract) {
            var _element = extract[transl_id];
            filtred.push({
              title: _element.translation,
              quality: _element.quality + 'p',
              info: '',
              qualitys: _element.qualities,
              translation: transl_id
            });
          }
        }
  
        return filtred;
      }
      /**
       * Добавить видео
       * @param {Array} items 
       */
  
  
      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = filter_items.voice[choice.voice];
          }
  
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          item.addClass('video--stream');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            var extra = getFile(element, element.quality);
  
            if (extra.file) {
              var playlist = [];
              var first = {
                url: extra.file,
                quality: extra.quality,
                timeline: element.timeline,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
  
              if (element.season) {
                items.forEach(function (elem) {
                  var ex = getFile(elem, elem.quality);
                  playlist.push({
                    url: ex.file,
                    quality: ex.quality,
                    timeline: elem.timeline,
                    title: elem.title
                  });
                });
              } else {
                playlist.push(first);
              }
  
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
  
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            element: element,
            file: function file(call) {
              call(getFile(element, element.quality));
            }
          });
        });
        component.start(true);
      }
    }
  
    function hdvb(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = [];
      var object = _object;
      var select_title = '';
      var select_id = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        quality: 0
      };
      var translator = {};
      /**
       * Поиск
       * @param {Object} _object
       */
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_id = kinopoisk_id;
        select_title = object.movie.title;
  
        if (isNaN(kinopoisk_id)) {
          component.empty("kinopoisk_id is null");
          return;
        }
  
        var url = 'https://apivb.info/api/videos.json?token=5e2fe4c70bafd9a7414c4f170ee1b192&id_kp=' + kinopoisk_id;
        network.clear();
        network.timeout(10000);
        network.silent(url, function (found) {
          if (found) {
            (typeof found === "string" ? JSON.parse(found) : found).forEach(function (result, keyt) {
              result.link = result.iframe_url;
              result.serial = result.type == 'serial' ? 1 : 0;
              result.translation_id = keyt;
              result.translation = result.translator;
              result.max_qual = '2160';
  
              if (result.serial == 1) {
                result.playlists = [];
                result.serial_episodes.forEach(function (season, keys) {
                  result.last_season = season.season_number;
                  result.playlists[season.season_number] = [];
  
                  if (season.episodes) {
                    season.episodes.forEach(function (episode, keye) {
                      result.playlists[season.season_number][episode] = {};
                      result.playlists[season.season_number][episode][result.max_qual] = result.link;
                    });
                  }
                });
                var season = 0;
  
                while (++season <= result.season) {
                  result.playlists[season] = [];
                }
              } else {
                result.playlists = {};
                result.playlists[result.max_qual] = result.link;
              }
  
              translator[result.translation] = result.translation_id;
              results[result.translation_id] = Object.assign({}, result);
            });
            success(results);
          }
  
          component.loading(false);
  
          if (!Object.keys(results).length) {
            if (found.error) component.empty(found.error);else component.emptyForQuery(select_title);
          }
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        extractData(results);
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type
       * @param {*} a
       * @param {*} b
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        extractData(results);
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        results = null;
      };
      /**
       * Успешно, есть данные
       * @param {Object} json
       */
  
  
      function success(json) {
        results = json;
        extractData(json);
        filter();
        append(filtred());
      }
      /**
       * Получить потоки
       * @param {String} str
       * @param {Int} max_quality
       * @returns string
       */
  
  
      function extractData(json) {
        json.forEach(function (translations, keyt) {
          if (translations.serial == 1) {
            extract[keyt] = {
              json: [],
              file: translations.link,
              serial: translations.serial
            };
  
            for (var keys in translations.playlists) {
              var seasons = translations.playlists[keys];
              var folder = [];
  
              for (var keye in seasons) {
                var episode = seasons[keye];
                var quality = Math.max.apply(null, Object.keys(episode));
                var link = episode[quality] || '';
                folder[keye] = {
                  id: keys + '_' + keye,
                  season: keys,
                  episode: keye,
                  file: link,
                  quality: quality,
                  qualities: episode,
                  translation: keyt
                };
              }
  
              extract[keyt].json[keys] = {
                id: keys,
                folder: folder,
                translation: keyt
              };
            }
          } else if (translations.serial == 0) {
            var movie = translations.playlists;
  
            var _quality = Math.max.apply(null, Object.keys(movie));
  
            var _link = movie[_quality] || '';
  
            extract[keyt] = {
              json: {},
              file: _link,
              quality: _quality,
              qualities: movie,
              translation: translations.translation,
              serial: translations.serial
            };
          }
        });
      }
      /**
       * Найти поток
       * @param {Object} element
       * @param {Int} max_quality
       * @returns string
       */
  
  
      function getFile(element, max_quality) {
        var media = element.season ? extract[element.translation].json[element.season].folder[element.episode] : extract[element.translation];
        var file = media.file;
        var qualities = media.qualities;
        var quality = false;
  
        if (qualities && Object.keys(qualities).length) {
          quality = {};
  
          for (var n in qualities) {
            quality[n + 'p'] = qualities[n];
          }
  
          var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
          if (quality[preferably]) file = quality[preferably];
        }
  
        return {
          file: file,
          quality: quality
        };
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          voice_info: []
        };
        results.forEach(function (translation, keyt) {
          if (translation.serial == 1) {
            var s = translation.last_season;
  
            while (s--) {
              if (filter_items.season.indexOf(Lampa.Lang.translate('torrent_serial_season') + ' ' + (translation.last_season - s)) == -1) filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (translation.last_season - s));
            }
          }
        });
        if (!filter_items.season[choice.season]) choice.season = 0;
        results.forEach(function (translation, keyt) {
          if (translation.serial == 1) {
            if (translation.playlists[choice.season + 1] && translation.playlists[choice.season + 1].length) {
              if (filter_items.voice.indexOf(translation.translation) == -1) {
                filter_items.voice.push(translation.translation);
                filter_items.voice_info.push({
                  id: keyt
                });
              }
            }
          }
        });
        if (!filter_items.voice[choice.voice]) choice.voice = 0;
  
        if (choice.voice_name) {
          var inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
  
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
        var filtred = [];
  
        var _loop = function _loop(keym) {
          var movie = extract[keym];
  
          if (movie.serial == 1) {
            for (var keye in movie.json) {
              var episode = movie.json[keye];
  
              if (episode.id == choice.season + 1) {
                episode.folder.forEach(function (media) {
                  if (filter_items.voice_info[choice.voice] && media.translation == filter_items.voice_info[choice.voice].id) {
                    filtred.push({
                      episode: media.episode,
                      season: media.season,
                      title: 'S' + media.season + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + media.episode,
                      quality: media.qualities.length > 1 ? media.quality + 'p' : results[keym].quality,
                      info: ' / ' + filter_items.voice[choice.voice],
                      translation: media.translation
                    });
                  }
                });
              }
            }
          } else {
            filtred.push({
              title: Lampa.Utils.capitalizeFirstLetter(movie.translation),
              quality: movie.qualities.length > 1 ? movie.quality + 'p' : results[keym].quality,
              info: '',
              translation: keym
            });
          }
        };
  
        for (var keym in extract) {
          _loop(keym);
        }
  
        return filtred;
      }
  
      function getStreamQuality(element, call) {
        network.clear();
        network.timeout(10000);
        network.silent(element.link, function (plist) {
          var base_url = element.link.substring(0, element.link.lastIndexOf('/'));
          var playlists = {};
          component.parseM3U(plist).forEach(function (item) {
            var link = item.link;
            var quality = item.height;
            var alt_quality = link.match(/\b(\d\d\d+)\b/);
  
            if (alt_quality) {
              var alt_height = parseInt(alt_quality[1]);
              if (alt_height > quality && alt_height <= 4320) quality = alt_height;
            }
  
            playlists[quality] = link.indexOf('://') == -1 ? base_url + '/' + link : link;
          });
          if (results[element.translation].serial == 1) results[element.translation].playlists[element.season][element.episode] = playlists;else results[element.translation].playlists = playlists;
          extractData(results);
          append(filtred());
          return call(element);
        }, function (a, c) {
          return call(element);
        }, false, {
          dataType: 'text'
        });
      }
  
      function getStream(element, call, error) {
        if (element.season) element.link = extract[element.translation].json[element.season].folder[element.episode].file;else element.link = extract[element.translation].file;
  
        if (element.link.substr(-5) === ".m3u8") {
          if (results[element.translation].serial == 0 && Object.keys(results[element.translation].playlists).length > 1) return call(getFile(element, element.quality));
          if (results[element.translation].serial == 1 && Object.keys(results[element.translation].playlists[element.season][element.episode]).length > 1) return call(getFile(element, element.quality));
          getStreamQuality(element, function (extra) {
            return call(getFile(element, element.quality));
          });
          return;
        }
  
        var post_data = {
          serial: results[element.translation].serial,
          link: element.link,
          referer: element.link,
          translator: results[element.translation].translation,
          season: element.season,
          episode: element.episode
        };
  
        if (!element.link.startsWith('http')) {
          post_data.referer = results[element.translation].link;
          post_data.host = results[element.translation].host;
          post_data.key = results[element.translation].key;
        }
  
        var url = component.proxy('hdvb') + 'http://freebie.tom.ru/hdvburl?v=800&id_kp=' + select_id;
        if (element.translation) url = Lampa.Utils.addUrlComponent(url, 'translation=' + element.translation);
        if (element.season) url = Lampa.Utils.addUrlComponent(url, 'season=' + element.season);
        if (element.episode) url = Lampa.Utils.addUrlComponent(url, 'episode=' + element.episode);
        network.clear();
        network.timeout(15000);
        network.silent(url, function (str) {
          if (str == 'VideoNotFound' || str == '10' || str.indexOf('error') > 0) {
            error(str);
            return;
          }
  
          var result = results[element.translation];
  
          if (result.serial == 1) {
            if (result.key && typeof str === "string") {
              result.playlists[element.season][element.episode][result.max_qual] = str;
              element.link = str;
            } else {
              JSON.parse(str).forEach(function (season) {
                result.host = season.host;
                result.key = season.key;
                season.folder.forEach(function (episode) {
                  episode.folder.forEach(function (translation) {
                    var keyt = translator[translation.title];
  
                    if (keyt != undefined) {
                      results[keyt].playlists[season.id][episode.episode][result.max_qual] = translation.file;
  
                      if (translation.file.substr(-5) === ".m3u8") {
                        element.link = translation.file;
                      }
                    }
                  });
                });
              });
              results.forEach(function (translation) {
                translation.host = result.host;
                translation.key = result.key;
              });
            }
          } else {
            result.playlists[result.max_qual] = str;
            element.link = str;
          }
  
          extractData(results);
  
          if (results) {
            getStreamQuality(element, function (extra) {
              return call(getFile(element, element.quality));
            });
          }
        }, function (a, c) {
          error(network.errorDecode(a, c));
        }, JSON.stringify(post_data), {
          dataType: 'text'
        });
      }
      /**
       * Добавить видео
       * @param {Array} items
       */
  
  
      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = filter_items.voice[choice.voice];
          }
  
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          item.addClass('video--stream');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            getStream(element, function (extra) {
              var first = {
                url: extra.file,
                quality: extra.quality,
                timeline: element.timeline,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
              Lampa.Player.play(first);
  
              if (element.season && Lampa.Platform.version) {
                var playlist = [];
                items.forEach(function (elem) {
                  if (elem == element) {
                    playlist.push(first);
                  } else {
                    var cell = {
                      url: function url(call) {
                        getStream(elem, function (ex) {
                          cell.url = ex.file;
                          cell.quality = ex.quality;
                          call();
                        }, function () {
                          cell.url = '';
                          call();
                        });
                      },
                      timeline: elem.timeline,
                      title: elem.title
                    };
                    playlist.push(cell);
                  }
                });
                Lampa.Player.playlist(playlist);
              } else {
                Lampa.Player.playlist([first]);
              }
  
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            }, function (error) {
              Lampa.Noty.show(error || Lampa.Lang.translate('online_mod_nolink'));
            });
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              getStream(element, function (extra) {
                call({
                  file: extra.file,
                  quality: extra.quality
                });
              }, function (error) {
                Lampa.Noty.show(error || Lampa.Lang.translate('online_mod_nolink'));
              });
            }
          });
        });
        component.start(true);
      }
    }
  
    function videoapi(component, _object) {
      var network = new Lampa.Reguest();
      var extract = {};
      var results = [];
      var object = _object;
      var select_title = '';
      var get_links_wait = false;
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: '',
        voice_id: 0
      };
      /**
       * Начать поиск
       * @param {Object} _object 
       * @param {String} kinopoisk_id
       */
  
      this.search = function (_object, kinopoisk_id, data) {
        object = _object;
        var itm = data[0];
        select_title = itm.title || object.movie.title;
        get_links_wait = true;
        var url = component.proxy('videoapi') + 'http://5100.svetacdn.in/api/';
        var type = itm.iframe_src.split('/').slice(-2)[0];
        if (type == 'movie') type = 'movies';
        if (type == 'anime') type = 'animes';
        url += type;
        url = Lampa.Utils.addUrlComponent(url, 'api_token=qR0taraBKvEZULgjoIRj69AJ7O6Pgl9O');
        url = Lampa.Utils.addUrlComponent(url, itm.imdb_id ? 'imdb_id=' + encodeURIComponent(itm.imdb_id) : 'title=' + encodeURIComponent(select_title));
        url = Lampa.Utils.addUrlComponent(url, 'field=' + encodeURIComponent('global'));
        network.silent(url, function (found) {
          results = found.data.filter(function (elem) {
            return elem.id == itm.id;
          });
          success(results);
          component.loading(false);
          if (!results.length) component.emptyForQuery(select_title);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: '',
          voice_id: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
  
        if (a.stype == 'voice') {
          choice.voice_name = filter_items.voice[b.index];
          choice.voice_id = filter_items.voice_info[b.index] && filter_items.voice_info[b.index].id;
        }
  
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        results = null;
      };
      /**
       * Успешно, есть данные
       * @param {Object} json 
       */
  
  
      function success(json) {
        results = json;
        extractData(json);
        filter();
        append(filtred());
      }
      /**
       * Получить потоки
       * @param {String} str 
       * @returns array
       */
  
  
      function extractItems(str) {
        try {
          var items = component.parsePlaylist(str).map(function (item) {
            var quality = item.label.match(/(\d\d\d+)p/);
            var file = item.links[0];
            if (file) file = 'http:' + file;
            return {
              label: item.label,
              quality: quality ? parseInt(quality[1]) : NaN,
              file: file || ''
            };
          });
          items.sort(function (a, b) {
            if (b.quality > a.quality) return 1;
            if (b.quality < a.quality) return -1;
            if (b.label > a.label) return 1;
            if (b.label < a.label) return -1;
            return 0;
          });
          return items;
        } catch (e) {}
  
        return [];
      }
      /**
       * Получить информацию о фильме
       * @param {Arrays} results 
       */
  
  
      function extractData(results) {
        network.timeout(20000);
        var movie = results.slice(0, 1)[0];
        extract = {};
  
        if (movie) {
          var src = movie.iframe_src;
          network.silent(src, function (raw) {
            get_links_wait = false;
            component.render().find('.broadcast__scan').remove();
            var math = raw.replace(/\n/g, '').match(/id="files" value="(.*?)"/);
  
            if (math) {
              var text = document.createElement("textarea");
              text.innerHTML = math[1];
              var json = Lampa.Arrays.decodeJson(text.value, {});
  
              for (var i in json) {
                if (0 === i - 0) {
                  continue;
                }
  
                extract[i] = {
                  json: _typeof(json[i]) == 'object' ? json[i] : Lampa.Arrays.decodeJson(json[i], {}),
                  items: extractItems(json[i])
                };
  
                for (var a in extract[i].json) {
                  var elem = extract[i].json[a];
  
                  if (elem.folder) {
                    for (var f in elem.folder) {
                      var folder = elem.folder[f];
                      folder.items = extractItems(folder.file);
                    }
                  } else elem.items = extractItems(elem.file);
                }
              }
            }
          }, function () {
            get_links_wait = false;
            component.render().find('.broadcast__scan').remove();
          }, false, {
            dataType: 'text'
          });
        }
      }
      /**
       * Найти поток
       * @param {Object} element 
       * @param {Int} max_quality
       * @returns string
       */
  
  
      function getFile(element, max_quality) {
        var translat = extract[element.translation];
        var id = element.season + '_' + element.episode;
        var file = '';
        var items = [];
        var quality = false;
  
        if (translat) {
          if (element.season) {
            for (var i in translat.json) {
              var elem = translat.json[i];
  
              if (elem.folder) {
                for (var f in elem.folder) {
                  var folder = elem.folder[f];
  
                  if (folder.id == id) {
                    items = folder.items;
                    break;
                  }
                }
              } else if (elem.id == id) {
                items = elem.items;
                break;
              }
            }
          } else {
            items = translat.items;
          }
        }
  
        if (items && items.length) {
          max_quality = parseInt(max_quality);
  
          if (max_quality) {
            items = items.filter(function (item) {
              return item.quality <= max_quality;
            });
          }
  
          if (items.length) {
            file = items[0].file;
            quality = {};
            items.forEach(function (item) {
              quality[item.label] = item.file;
            });
            var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
            if (quality[preferably]) file = quality[preferably];
          }
        }
  
        return {
          file: file,
          quality: quality
        };
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          voice_info: []
        };
        results.slice(0, 1).forEach(function (movie) {
          if (movie.season_count) {
            var s = movie.season_count;
  
            while (s--) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (movie.season_count - s));
            }
          }
  
          if (!filter_items.season[choice.season]) choice.season = 0;
  
          if (movie.episodes) {
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == choice.season + 1) {
                episode.media.forEach(function (media) {
                  if (!filter_items.voice_info.find(function (v) {
                    return v.id == media.translation.id;
                  })) {
                    filter_items.voice.push(media.translation.shorter_title);
                    filter_items.voice_info.push({
                      id: media.translation.id
                    });
                  }
                });
              }
            });
          }
        });
        if (!filter_items.season[choice.season]) choice.season = 0;
        if (!filter_items.voice[choice.voice]) choice.voice = 0;
  
        if (choice.voice_name) {
          var inx = -1;
  
          if (choice.voice_id) {
            var voice = filter_items.voice_info.find(function (v) {
              return v.id == choice.voice_id;
            });
            if (voice) inx = filter_items.voice_info.indexOf(voice);
          }
  
          if (inx == -1) inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }
  
        component.filter(filter_items, choice);
      }
  
      function parseSubtitles(subs) {
        var subtitles = [];
  
        if (Lampa.Arrays.isArray(subs)) {
          subtitles = subs.map(function (item) {
            return {
              label: item.lang,
              url: 'http:' + item.url
            };
          });
        }
  
        return subtitles.length ? subtitles : false;
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
        var filtred = [];
        results.slice(0, 1).forEach(function (movie) {
          if (movie.episodes) {
            movie.episodes.forEach(function (episode) {
              if (episode.season_num == choice.season + 1) {
                var temp = episode.media.filter(function (m) {
                  return filter_items.voice_info[choice.voice] && m.translation.id == filter_items.voice_info[choice.voice].id;
                });
                temp.sort(function (a, b) {
                  return b.max_quality - a.max_quality;
                });
                temp.slice(0, 1).forEach(function (media) {
                  filtred.push({
                    episode: parseInt(episode.num),
                    season: episode.season_num,
                    title: 'S' + episode.season_num + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + episode.num + ' - ' + (episode.ru_title || episode.orig_title),
                    quality: media.max_quality + 'p',
                    info: ' / ' + filter_items.voice[choice.voice],
                    max_quality: media.max_quality,
                    translation: media.translation_id,
                    subtitles: parseSubtitles(media.subtitles)
                  });
                });
              }
            });
          } else if (movie.translations) {
            movie.translations.forEach(function (translation) {
              var element = {
                max_quality: 1080
              };
  
              if (movie.media && movie.media.length) {
                element = movie.media.filter(function (media) {
                  return media.translation_id == translation.id;
                })[0];
                if (!element) element = movie.media[0];
              }
  
              filtred.push({
                title: translation.title,
                quality: element.max_quality + 'p' + (element.source_quality ? ' - ' + element.source_quality.toUpperCase() : ''),
                info: '',
                max_quality: element.max_quality,
                translation: translation.id,
                subtitles: parseSubtitles(element.subtitles)
              });
            });
          }
        });
        return filtred;
      }
      /**
       * Добавить видео
       * @param {Array} items 
       */
  
  
      function append(items) {
        component.reset();
        if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = filter_items.voice[choice.voice];
          }
  
          var hash = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          item.addClass('video--stream');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            var extra = getFile(element, element.max_quality);
  
            if (extra.file) {
              var playlist = [];
              var first = {
                url: extra.file,
                quality: extra.quality,
                subtitles: element.subtitles,
                timeline: element.timeline,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title
              };
  
              if (element.season) {
                items.forEach(function (elem) {
                  var ex = getFile(elem, elem.max_quality);
                  playlist.push({
                    url: ex.file,
                    quality: ex.quality,
                    subtitles: elem.subtitles,
                    timeline: elem.timeline,
                    title: elem.title
                  });
                });
              } else {
                playlist.push(first);
              }
  
              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);
  
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate(get_links_wait ? 'online_mod_waitlink' : 'online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            element: element,
            file: function file(call) {
              call(getFile(element, element.max_quality));
            }
          });
        });
        component.start(true);
      }
    }
  
    function web(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
      var get_links_wait = false;
      var rslt = [];

      var url = 'http://proxy.cub.watch/cdn/https://rentry.co/lampa_rule/raw';
      //     //var url = 'https://cdn.jsdelivr.net/gh/aston314/lampa@main/online_rule.json';
      //     //var url = 'https://cors.eu.org/https://rentry.co/lampa_rule/raw';
      //     var xhr = new XMLHttpRequest();
      //     xhr.open('GET', url, true);
      //     xhr.send();
              
      //     xhr.onload = function() {
      //     var results_json = xhr.responseText;
      //     doregjson = $.parseJSON(results_json);
      // }
      //doregjson = $.parseJSON(getRemote(url));
      //doregjson = extract_rule;
      
      /**
       * Поиск
       * @param {Object} _object 
       */
      function getRemote(remote_url) {
          return $.ajax({
             type: "GET",
             url: remote_url,
             async: false
          }).responseText;
      }; 
  
      function fuzzyQuery(list, keyWord) {
          var arr = [];
          for (var i = 0; i < list.length; i++) {
              if (list[i].indexOf(keyWord) >= 0) {
                  arr.push(list[i]);
              }
          }
          return arr;
      };

      function getValues(obj, key) {
        var objects = [];
        for (var i in obj) {
          if (!obj.hasOwnProperty(i)) continue;
          if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
          } else if (i == key) {
            objects.push(obj[i]);
          }
        }
      };
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_title = object.movie.title;
        doreg = rule;
        get_links_wait = true;
        var url1 = doreg.search_url.replace('#msearchword',encodeURIComponent(object.movie.title.replace(/第(.+)季/, '')));
        
        network.clear();
        network.timeout(1000*15);
        network.silent(url1, function (str) {
          
          var parsedData = doreg.search_json ? JSON.parse(str) : str;
          
          var searchresult = doreg.search_json ? (parsedData.code === 999 ? 0 :(parsedData[doreg.node_json] ? parsedData[doreg.node_json].length : 0)) : $(doreg.search_html_selector, parsedData).find('a').length;

          if (searchresult > 0) {
            parse(parsedData);
          } else component.emptyForQuery(select_title);
  
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text'
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
        rslt = null;
      };
  
      function parse(str) {
        var item = {};
        var doonce = 0;
        if (doreg.search_json) {
          try {
            str[doreg.node_json].forEach(function (e) {
              item.Title = e[doreg.name_json];
              item.Link = doreg.websitelink + '/' + doreg.link_folder + '/' + e[doreg.id_json] + doreg.first_page_json;
              dodetail(item.Link, str, item.Title);
              doonce++;
              if (doonce === 1) {
                throw 'Break';
              }
            });
          } catch (e) {
            if (e !== 'Break') throw e
          };
        } else {
          var math = $(doreg.search_html_selector, str.replace(/\n|\r/g, ''));
          $(math).find('a').each(function (i, a) {
            item.Title = ($(a).attr('title') || $(a).text());
            item.Link = $(a).attr('href').indexOf('http') == -1 ? doreg.websitelink + $(a).attr('href') : $(a).attr('href');
            dodetail(item.Link, str, item.Title);
            doonce++;
            if (doonce === 1) return false;
          });
          $(math).remove();
        };
      }
      /**
       * Построить фильтр
       */

      function dodetail(link, data, title) {
        //取得具体页面的详情地址
        network["native"](link, function (data) {

          var math = $(doreg.detail_url_selector, data.replace(/\n|\r/g, '').replace(/href="javascript:;"/g,''));
          rslt = [];
          $(math).find('a').each(function (i, a) {
            rslt.push({
              file: doreg.listlink ? doreg.websitelink + $(a).attr('href') : $(a).attr('href'),
              quality: doreg.name + ' / ' + ($(a).text() || $(a).attr('title')),
              title: title,
              season: '',
              episode: '',
              info: ''
            });
          });
				  filter();
          append(filtred());
          setTimeout(function () {
            get_links_wait = false;
            component.render().find('.broadcast__scan').remove();
          }, 1000);
          
          //rslt = [];
          $(math).remove();
        }, function (a, c) {
          //component.empty('哦，' + network.errorDecode(a, c) + ' ');
          component.emptyForQuery(title);
        }, false, {
          dataType: 'text'
        });
      };
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: [],
          order: []
        };
        
        if (extract.playlist) {
          if (extract.playlist.seasons) {
            extract.playlist.seasons.forEach(function (season) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
            });
          }
        }

        if (!filter_items.season[choice.season]) choice.season = 0;
        //console.log('component.order' + component.order)
        component.order.forEach(function (i){
					filter_items.order.push(i.title);
				});
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
        var filter_data = Lampa.Storage.get('online_mod_filter', '{}');
        var mapResult = rslt.map(function (item, index, array) {
          return item;
        });
        return component.order[filter_data.order] ? (component.order[filter_data.order].id == 'invers' ? mapResult.reverse() : mapResult) : mapResult;
        //return rslt;
      }
      /**
       * Показать файлы
       */
      $.getMultiScripts = function (arr, path) {
        var _arr = $.map(arr, function (scr) {
          if (scr.indexOf('http') !== -1) path = '';
          return $.getScript((path || "") + scr);
        });

        _arr.push($.Deferred(function (deferred) {
          $(deferred.resolve);
        }));

        return $.when.apply($, _arr);
      };

      function getScripts(scripts, callback) {
        var progress = 0;
        scripts.forEach(function (script) {
          $.getScript(script, function () {
            if (++progress == scripts.length) callback();
          });
        });
      };

      function doparse(element, view, url1_, url, data) {
        var element = element;
        var view = view;
        var url1_ = url1_;
        var MacPlayer_ = url;
        var str = data;
        
        //var url1_ = MacPlayer_.replace('/' + doreg.link_folder + '/', '').match(/\/([^\/]+)\/[^\/]+$/);
        var re = /<script.*?src="(.*?)"/gm;
        //re = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g
        var match, aa = [], setting_js = false;
        while (match = re.exec(str)) {
          var cc = match[1].slice(0,1) == '.' ? match[1].replace('./', MacPlayer_.split(url1_[0])[0] + '/' + url1_[1] + '/') : match[1];
          cc = match[1].slice(0,1) !== '/' &&  match[1].indexOf('http') == -1 ? MacPlayer_.match(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/)[0]+'/'+match[1] : match[1];
          
          if (!/DPlayer|jquery|setting|-player|c606e5caeee702a784a0204d31ea3403|35a898211164a6b8a9a21a045dba9f8a|805d73dedddd5daf87bdbd38488362f8|33d6112475ac4d264c333fe9a5252aff|hls|flv/.test(cc)) {
            aa.push(cc);
          }
          if (/setting\.js/.test(cc)) {
            setting_js = true;
          }
        };
        //[^/]+(?=/[^/]+$)
        //\/([^\/]+)\/[^\/]+$
        //"([^.]*)\.(.*)"

        var pattern = /<script[^>]*>([\s\S]*?)<\/script>/gi; //whole thing.
        var match_, aa_ = [];
        while (match_ = pattern.exec(str)) {
          //console.log(match[1]);
          if (match_[1]) {
            var cc = match_[1].replace(';!function(n)', '//;!function(n)');
            aa_.push(cc);
          }
        };
        var joinedaa = aa_.join("\r\n");
        $.getMultiScripts(aa, '').done(function () {
          try {
            window.eval(joinedaa);
          } catch (e) {
            if (e instanceof SyntaxError) {
              console.log(e.message);
            }
          };
          //console.log(config.token);
          if (setting_js) {
            var s_js = getRemote(MacPlayer_.replace('/' + doreg.link_folder + '/', '').split(url1_[0])[0] + '/' + url1_[1] + '/js/setting.js');
            var b_js = s_js.match(/\.post|GET|POST/);
            var f_js = b_js[0] == 'GET' ? 'GET' : 'POST';
            var c_js = s_js.match(/[\'\"]([^.]*)\.(php|jpg|png)[\"\']/)
            c_js = c_js[0].replace(/'|"/g, '');
            var d_sj = MacPlayer_.replace('/' + doreg.link_folder + '/', '').split(url1_[0])[0] + '/' + url1_[1] + '/' + c_js;
            var e_js = s_js.match(/("sign"|sign): [\"\'](.+?)[\"\']/)[2];
            $.ajax({
              url: d_sj,
              type: f_js,
              dataType: 'JSON',
              timeout: 3000,
              data: {
                tm: (new Date().getTime()),
                url: config.url,
                vkey: config.vkey,
                token: config.token,
                sign: e_js
              },
              success: function (data) {
                if (data.code === 200) {
                  var playlist = [];
                  var first = {
                    url: getVideoInfo(data.url),
                    timeline: view,
                    title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                    subtitles: element.subtitles
                  };
                  Lampa.Player.play(first);
                  playlist.push(first);
                  Lampa.Player.playlist(playlist);
                } else {
                  //handlePlayerLoadError();
                  $(".noty").show();
                  Lampa.Noty.show('解析失败，请重试或切换线路~');
                  console.log('解析失败，请重试或切换线路~');
                }
              },
              error: function () {
                //handlePlayerLoadError();
                $(".noty").show();
                Lampa.Noty.show('解析失败，请重试或切换线路~');
                console.log('解析失败，请重试或切换线路~');
              }
            });
          };

          if (typeof urls !== "undefined") {
            var file = urls;
            //console.log(file);
            if (file) {
              var playlist = [];
              var first = {
                url: file,
                timeline: view,
                title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                subtitles: element.subtitles
              };
              Lampa.Player.play(first);
              playlist.push(first);
              Lampa.Player.playlist(playlist);
            } else {
              Lampa.Noty.show('无法检索链接');
            }
          };
        });
      };
  
      function append(items) {
        var _this = this;
        component.reset();
        if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));

          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }

          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = element.title;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);

            if (element.file) {
              network.silent(element.file, function (str) {
                if (str) {

                  var czspp = str.match(/window.wp_nonce=".*";([\s\S]*?)\/\/ localStorage/);
                  czspp = czspp ? czspp[0] : null;
                  if (czspp) {
                    $(".noty").hide();
                    czspp = czspp.replace('eval', 'var doczspp = ');
                    
                    $.getScript("https://cdn.jsdelivr.net/gh/aston314/lampa@main/lib/md5.js")
                      .done(function () {
                        window.eval(czspp);
                        if (typeof doczspp !== 'undefined') {
                          //console.log(doczspp);
                          var v = doczspp.match(/url: "(.*?)"/);
                          v = v ? v[1] : '';
                          //console.log(v)
                          if (v) {
                            var playlist = [];
                            var first = {
                              url: v,
                              timeline: view,
                              title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                              subtitles: element.subtitles
                            };
                            Lampa.Player.play(first);
                            playlist.push(first);
                            Lampa.Player.playlist(playlist);
                          };
                        } else {
                          $(".noty").show();
                          Lampa.Noty.show('无法检索链接');
                        };
                      });
                  };
                  //console.log(czspp);
                  $(".noty").hide();
                  var MacPlayer_, file_ = [], a;
                  var url = element.file.indexOf('http') == -1 ? '' : element.file.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0];
                  var d = str.match(/<script\b[^>]*>([\s\S]*?)<\/script\b[^>]*>/g);
                  var b;
                  doreg.js_execute_key.forEach(function (s, index) {
                    b = fuzzyQuery(d, s);
                    a = b.length > 0 ? b[0].replace(/<.+?>/g, '') : '1';
                    window.eval('function base64decode(str){ return atob(str); };' + a);
                  });

                  if (typeof now !== 'undefined') {
                    var playlist = [];
                    var first = {
                      url: 'https://datas-s8pwfqdu9yystn90fb----------------cache.haozhansou.com/' + now,
                      timeline: view,
                      title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                      subtitles: element.subtitles
                    };
                    Lampa.Player.play(first);
                    playlist.push(first);
                    Lampa.Player.playlist(playlist);
                  };

                  var script_arr = [
                    '/static/js/playerconfig.js',
                    '/static/js/player.js'
                  ];

                  $.getMultiScripts(script_arr, url).done(function () {
                    // all scripts loaded
                    //console.log(MacPlayer)
                    //$(".noty").hide();
                    $.getScript(url + MacPlayer.Path + MacPlayer.PlayFrom + ".js")
                      .done(function () {
                        //$(".noty").show();
                        //console.log($(MacPlayer.Html).attr('src'))
                        MacPlayer_ = $(MacPlayer.Html).attr('src');
                        MacPlayer_ = MacPlayer_.slice(0, 1) !== '/' ? MacPlayer_ : element.file.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + MacPlayer_;
                        
                        var file1 = $(MacPlayer.Html).attr('src') ? $(MacPlayer.Html).attr('src') : MacPlayer.PlayUrl;
                        //console.log(MacPlayer_)

                        //if (MacPlayer.PlayUrl.indexOf('.m3u8') !== -1) {
                        if (/\.m3u8|\.mp4/.test(MacPlayer.PlayUrl)) {
                          file1 = MacPlayer.PlayUrl;
                        };
                        file_.push(file1);
                        //console.log(file_);
                        var file = file_[0];
                        //if (MacPlayer_ && MacPlayer.PlayUrl.indexOf('.m3u8') == -1) {
                        if (MacPlayer_ && !/\.m3u8|\.mp4/.test(MacPlayer.PlayUrl)) {
                          var url1_ = MacPlayer_.replace('/' + doreg.link_folder + '/', '').match(/\/([^\/]+)\/[^\/]+$/);
                          if (!doreg.use_referer) {
                            //console.log(MacPlayer_)
                            //var url_ = MacPlayer_.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0];
                            network.silent(MacPlayer_, function (str) {
                              doparse(element, view, url1_, MacPlayer_, str);
                            }, function (a, c) {
                              Lampa.Noty.show(network.errorDecode(a, c));
                            }, false, {
                              dataType: 'text'
                            });
                          } else {
                            if (window.cordovaHTTP) {
                              function fn1() {
                                return new Promise(function (resolve, reject) {
                                  cordovaHTTP.acceptAllCerts(true, function () {
                                    //console.log('success!');
                                  }, function () {
                                    console.log('error :(');
                                  });
                                  cordovaHTTP.get(MacPlayer_, {
                                  }, {
                                    'Referer': url + '/',
                                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
                                  }, function (response) {
                                    // prints 200
                                    console.log(response.status);
                                    try {
                                      //console.log(response.data);
                                      doparse(element, view, url1_, MacPlayer_, response.data);
                                      resolve(value)
                                    } catch (e) {
                                      console.error("parsing error");
                                      //Lampa.Noty.show("播放地址解析出错");
                                    }
                                  }, function (response) {
                                    // prints 403
                                    //reject(response.error);
                                    console.log(response.status + ' ' + response.error);
                                    //prints Permission denied 
                                    //console.log(response.error);
                                  });

                                });
                              }
                              fn1().then(function (value) {
                                //do something
                              })
                            } else {
                              if (navigator.userAgent.toLowerCase().indexOf("lampa_client") == -1) {
                                $(".noty").show();
                                Lampa.Noty.show('因CORS限制，该视频只能在安卓上观看。');
                              };
                              
                              if (navigator.userAgent.toLowerCase().indexOf("lampa_client") > -1) {
                                network.silent(MacPlayer_, function (str) {
                                  doparse(element, view, url1_, MacPlayer_, str);
                                }, function (a, c) {
                                  Lampa.Noty.show(network.errorDecode(a, c));
                                }, false, {
                                  dataType: 'text',
                                  headers: {
                                    'Referer': url + '/',
                                  }
                                });
                              };
                            };
                          }
                        }
                        else {
                          if (file) {
                            var playlist = [];
                            var first = {
                              url: file,
                              timeline: view,
                              title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                              subtitles: element.subtitles
                            };
                            Lampa.Player.play(first);
                            playlist.push(first);
                            Lampa.Player.playlist(playlist);

                          } else {
                            $(".noty").show();
                            Lampa.Noty.show('无法检索链接');
                          }
                        }
                      });
                  });
                } else component.emptyForQuery(select_title);

                component.loading(false);
              }, function (a, c) {
                component.empty(network.errorDecode(a, c));
              }, false, {
                dataType: 'text'
              });

              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }
  
    function kunyu77(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
      var sj = '1664512158';
      var rslt = [];
      
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      function getdetail(url) {
        
        if (window.cordovaHTTP) {
          // function fn2() {
          //   return new Promise(function (resolve, reject) {
              cordovaHTTP.acceptAllCerts(true, function () {
                //console.log('success!');
              }, function () {
                console.log('error :(');
              });
              cordovaHTTP.get(url, {}, {
                'User-Agent': 'Dalvik/2.1.0',
                TK: '18984afc5571e198b77b3f98332e0b89',
                t: sj,
                Host: 'api.kunyu77.com'
                //'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; MI 9 Build/LMY48Z)'
              }, function (response) {
                // prints 200
                //console.log('酷云播放地址：' + response.status);
                try {
                  var json1 = JSON.parse(response.data);
                  //console.log(json1.msg);
                  if (json1.msg == '非法请求' || json1.data.episodes.length == 0) {
                    component.emptyForQuery(select_title)
                  } else {
                    parse(json1);
                  };
                  component.loading(false);
                  //resolve(value)
                } catch (e) {
                  console.error("parsing error");
                  //Lampa.Noty.show("播放地址解析出错");
                }
                //component.loading(false);
              });

            //});
          // }
          // fn2().then(function (value) {
          //   //do something
          //   console.log('酷云')
          // })
        }
        else {
          component.reset();
          Lampa.Noty.show('酷云线路只能在安卓上观看。');
        }
      };

      this.search = function (_object, kinopoisk_id) {
        var _this = this;
        object = _object;
        select_title = object.movie.title;
        doreg = rule;
        //console.log(kinopoisk_id)
        //console.log(select_title.replace(/第(.+)季/, '').trim());
        var url;
        kinopoisk_id === parseInt(kinopoisk_id, 10) ? url = 'http://api.kunyu77.com/api.php/provide/videoPlaylist?ids=' + kinopoisk_id + '&version=2.0.4&sj=' + sj : url = 'http://api.kunyu77.com/api.php/provide/searchVideo?searchName=' + encodeURIComponent(object.movie.title);
        
        //url = url.replace('#msearchword',encodeURIComponent(object.movie.title));
          if (kinopoisk_id === parseInt(kinopoisk_id, 10)) {
              // network.silent(url, function (json) {
              //     if (json) {
              //         if (json.data.episodes.length == 0) {
              //             component.emptyForQuery(select_title)
              //         } else {
              //             parse(json);
              //         }
              //     } else component.emptyForQuery(select_title);
  
              //     component.loading(false);
              // }, function (a, c) {
              //     component.empty(network.errorDecode(a, c));
              // }, false, {
              //     dataType: 'json',
              //     headers: {
              //       TK: 'd1de96c69368f43852693acb884cad68',
              //       t: '1662003259'
              //     }
              // });
              getdetail(url);
          } else {
              network.silent(url, function (json) {
                  if (json) {
                      //console.log(json.data.length)
                      if (json.data.length !== 0) {
                          //parse(json);
                          if (json.data.length == 1) {
                              var id = json.data[0].id;
                              url = 'http://api.kunyu77.com/api.php/provide/videoPlaylist?ids=' + id + '&version=2.0.4&sj=' + sj;
                              // network.silent(url, function (json) {
                              //     if (json) {
                              //         if (json.data.episodes.length == 0) {
                              //             component.emptyForQuery(select_title)
                              //         } else {
                              //             parse(json);
                              //         }
                              //     } else component.emptyForQuery(select_title);
  
                              //     component.loading(false);
                              // }, function (a, c) {
                              //     component.empty(network.errorDecode(a, c));
                              // }, false, {
                              //     dataType: 'json',
                              //     headers: {
                              //       TK: 'd1de96c69368f43852693acb884cad68',
                              //       t: '1662003259'
                              //     }
                              // });
                              getdetail(url);
                          } else {
                              _this.wait_similars = true;
                              var similars = [];
                              json.data.forEach(function (l) {
                                  similars.push({
                                      is_similars: true,
                                      title: l.videoName,
                                      link: '',
                                      filmId: l.id,
                                      year: l.year,
                                      episodes_count: l.msg
                                  });
                              });
                              component.similars(similars);
                          }
                      } else component.emptyForQuery(select_title);
                  } else component.emptyForQuery(select_title);
  
                  component.loading(false);
              }, function (a, c) {
                  if (network.errorDecode(a, c).indexOf('很抱歉') !== -1) {
                      component.empty('需要将User-Agent需改为：Dalvik，才能访问酷云。');
                  } else {
                      component.empty(network.errorDecode(a, c));
                  }
              }, false, {
                  dataType: 'json',
              });
          };     
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
        rslt = null;
      };
  
      function parse(json) {
         
          // var list = json.data[0].videoUrls.toString().split('$$$')[0].replace(/"/g,'').split(',');
          //  $.each(list, function(i,val){        
          //     //console.log(val);
          //      if (val.split('$')[1].indexOf('.m3u8' !== -1)) {
          //          rslt.push({
          //              file: val.split('$')[1],
          //              quality: val.split('$')[0],
          //              title: json.data[0].videoName,
          //              season: '',
          //              episode: '',
          //              info: ''
          //          });
          //      }
          // }); 
          //http://api.kunyu77.com/api.php/provide/videoPlaylist?ids=142546
          // if (window.cordovaHTTP){
          //     //UserAgent.set('Dalvik/2.1.0 (Linux; U; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00)');
          // }
          // else {
          //     Lampa.Noty.show('酷云线路只能在安卓上观看。');
          // };
          rslt = [];
          json.data.episodes.forEach(function (episode) {
              
              if (episode.playurl.indexOf('.m3u8' !== -1)) {
                  rslt.push({
                      file: episode.playurl,
                      quality: episode.title.replace(episode.albumTitle, ''),
                      title: episode.albumTitle,
                      season: '',
                      episode: episode.episode,
                      info: ''
                  });
              }
          });
          
          append(filtred());
          //rslt = [];
  
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
  
        if (extract.playlist) {
          if (extract.playlist.seasons) {
            extract.playlist.seasons.forEach(function (season) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
            });
          }
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
  
        return rslt;
      }
      /**
       * Показать файлы
       */
  
  
      function append(items) {
        var _this = this;
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = element.title;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
  
            if (element.file) {
                  var playlist = [];
                  var first = {
                      url: element.file,
                      timeline: view,
                      title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                      subtitles: element.subtitles
                  };
                  Lampa.Player.play(first);
                  
                  playlist.push(first);
                  Lampa.Player.playlist(playlist);
              
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }

    function noname(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
      var rslt = [];
      
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      

      this.search = function (_object, kinopoisk_id) {
        var _this = this;
        object = _object;
        select_title = object.movie.title;
        doreg = rule;
        //console.log(kinopoisk_id)
        //console.log(select_title.replace(/第(.+)季/, '').trim());
        var url;
        kinopoisk_id === parseInt(kinopoisk_id, 10) ? url = 'http://47.242.89.48/video/xiaoshu.php/detail?action=plus&code=8ff57a4df664974eca05970c7dadfc8e&vod_id=' + kinopoisk_id : url = 'http://47.242.89.48/video/xiaoshu.php/list?action=plus&code=8ff57a4df664974eca05970c7dadfc8e&wd=' + encodeURIComponent(object.movie.title);
        
        //url = url.replace('#msearchword',encodeURIComponent(object.movie.title));
          if (kinopoisk_id === parseInt(kinopoisk_id, 10)) {
              network.silent(url, function (json) {
                  if (json) {
                      if (json.data.length == 0) {
                          component.emptyForQuery(select_title)
                      } else {
                          parse(json);
                      }
                  } else component.emptyForQuery(select_title);
  
                  component.loading(false);
              }, function (a, c) {
                  component.empty(network.errorDecode(a, c));
              }, false, {
                  dataType: 'json'
              });
              //getdetail(url);
          } else {
              network.silent(url, function (json) {
                  if (json) {
                      //console.log(json.data.length)
                      if (json.data.list.length !== 0) {
                          //parse(json);
                          if (json.data.list.length == 1) {
                              var id = json.data.list[0].vod_id;
                              url = 'http://47.242.89.48/video/xiaoshu.php/detail?action=plus&code=8ff57a4df664974eca05970c7dadfc8e&vod_id=' + id ;
                              network.silent(url, function (json) {
                                  if (json) {
                                      if (json.data.length == 0) {
                                          component.emptyForQuery(select_title)
                                      } else {
                                          parse(json);
                                      }
                                  } else component.emptyForQuery(select_title);
  
                                  component.loading(false);
                              }, function (a, c) {
                                  component.empty(network.errorDecode(a, c));
                              }, false, {
                                  dataType: 'json'
                              });
                              //getdetail(url);
                          } else {
                              _this.wait_similars = true;
                              var similars = [];
                              json.data.list.forEach(function (l) {
                                  similars.push({
                                      is_similars: true,
                                      title: l.vod_name,
                                      link: '',
                                      filmId: l.vod_id,
                                      year: l.vod_play_from.toUpperCase().split('$$$')[0],
                                      episodes_count: l.vod_remarks
                                  });
                              });
                              component.similars(similars);
                          }
                      } else component.emptyForQuery(select_title);
                  } else component.emptyForQuery(select_title);
  
                  component.loading(false);
              }, function (a, c) {
                  component.empty(network.errorDecode(a, c));
              }, false, {
                  dataType: 'json',
              });
          };     
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
        rslt = null;
      };
  
      function parse(json) {
          rslt = [];
          json.data.vod_play_list[0].urls.forEach(function (episode) {
              
              //if (episode.playurl.indexOf('.m3u8' !== -1)) {
                  rslt.push({
                      file: episode.url,
                      quality: episode.name,
                      title: episode.name,
                      season: '',
                      episode: '',
                      info: ''
                  });
              //}
          });
          filter();
          append(filtred());
          //rslt = [];
  
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: [],
          order:[]
        };
  
        if (extract.playlist) {
          if (extract.playlist.seasons) {
            extract.playlist.seasons.forEach(function (season) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
            });
          }
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
        //console.log('component.order' + component.order)
        component.order.forEach(function (i){
					filter_items.order.push(i.title);
				});
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
        var filter_data = Lampa.Storage.get('online_mod_filter', '{}');
        var mapResult = rslt.map(function (item, index, array) {
          return item;
        });
        return component.order[filter_data.order] ? (component.order[filter_data.order].id == 'invers' ? mapResult.reverse() : mapResult) : mapResult;
        //return rslt;
      }
      /**
       * Показать файлы
       */
  
  
      function append(items) {
        var _this = this;
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = element.title;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);

            var url = 'http://47.242.89.48/video/xiaoshu.php?action=config&app=analysis2&code=8ff57a4df664974eca05970c7dadfc8e&url=' + element.file;
            network.silent(url, function (json) {
              if (json) {
                if (json.code !== 200 ) {
                  Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));//component.emptyForQuery(select_title)
                } else {
                  var playlist = [];
                  var first = {
                    url: json.url,
                    timeline: view,
                    title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                    subtitles: element.subtitles
                  };
                  Lampa.Player.play(first);

                  playlist.push(first);
                  Lampa.Player.playlist(playlist);

                  if (viewed.indexOf(hash_file) == -1) {
                    viewed.push(hash_file);
                    item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                    Lampa.Storage.set('online_view', viewed);
                  }
                }
              } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));//component.emptyForQuery(select_title);

              //component.loading(false);
            }, function (a, c) {
              component.empty(network.errorDecode(a, c));
            }, false, {
              dataType: 'json'
            });
  
            // if (element.file) {
            //       var playlist = [];
            //       var first = {
            //           url: element.file,
            //           timeline: view,
            //           title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
            //           subtitles: element.subtitles
            //       };
            //       Lampa.Player.play(first);
                  
            //       playlist.push(first);
            //       Lampa.Player.playlist(playlist);
              
            //   if (viewed.indexOf(hash_file) == -1) {
            //     viewed.push(hash_file);
            //     item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
            //     Lampa.Storage.set('online_view', viewed);
            //   }
            // } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }
  
    function zhaoziyuan(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
        var resp;
        var search_videos;
        var find_videos;
        var rslt    = [];
      
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_title = object.movie.title;
        doreg = rule;
        var url1 = 'https://zhaoziyuan.la/so?filename=#msearchword';
        url1 = url1.replace('#msearchword',encodeURIComponent(object.movie.title));
  
        network.clear();
        network.timeout(1000 * 15);
        network.silent(url1, function (json) {
          if (json.indexOf('此刻找不到') == -1) {
            parse(json);
          } else component.emptyForQuery(select_title);
  
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text',
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
        rslt = null;
      };
  
      function parse(json) {
          rslt = [];
          var str = json.replace(/\n/g, '');
          var h =  $('div.news_text > a', str);
          $(h).each(function (i, html) {
            rslt.push({
              file: 'https://zhaoziyuan.la/'+$(html).attr('href'),
              quality: $('p',html).text().replace(/类别：(文件|文件夹) \| /g,''),
              //quality: $('p',html).text().replace(/文件夹/,'目录'),
              title: $('h3',html).text(),
              season: '',
              episode: '',
              info: ''
          });
          });  
  
          append(filtred());
          //rslt = [];
  
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
  
        if (extract.playlist) {
          if (extract.playlist.seasons) {
            extract.playlist.seasons.forEach(function (season) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
            });
          }
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
  
        return rslt;
      }
      /**
       * Показать файлы
       */
  
  
      function append(items) {
        var _this = this;
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = element.title;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            component.activity.loader(true);
            if (element.file) {
                  // var playlist = [];
                  // var first = {
                  //     url: element.file,
                  //     timeline: view,
                  //     title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                  //     subtitles: element.subtitles
                  // };
                  // Lampa.Player.play(first);
                  
                  // playlist.push(first);
                  // Lampa.Player.playlist(playlist);
              network.silent(element.file, function (json) {
                if (json.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
                  var str = json.replace(/\n/g, '');
                  var h = $('section > div > a', str);
                  var link = $(h).attr('href');
                  element.img = object.movie.img;
                  element.original_title = '';
                  Lampa.Activity.push({
                    url: link,
                    title: '阿里云盘播放',
                    component: 'yunpan2',
                    movie: element,
                    page: 1
                  });
                } else component.emptyForQuery(select_title);
  
                component.loading(false);
              }, function (a, c) {
                component.empty(network.errorDecode(a, c));
              }, false, {
                dataType: 'text',
              });
              
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }

    function xiaozhitiao(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
        var resp;
        var search_videos;
        var find_videos;
        var rslt    = [];
      
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_title = object.movie.title;
        doreg = rule;
        var url1 = 'https://gitcafe.net/tool/alipaper/';
        url1 = url1.replace('#msearchword',encodeURIComponent(object.movie.title));

        network.clear();
        network.timeout(1000 * 15);
        network.silent(url1, function (json) {
          if (json.length > 0) {
            parse(json);
          } else component.emptyForQuery(select_title);
  
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, {
          action: 'search',
          keyword: object.movie.title
        }, {
          dataType: 'json',
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
        rslt = null;
      };
  
      function parse(json) {
          // var str = json.replace(/\n/g, '');
          // var h =  $('div.news_text > a', str);
          // $(h).each(function (i, html) {
        rslt = [];
        json.forEach(function (a) {
          rslt.push({
            file: 'https://www.aliyundrive.com/s/'+a.key,
            quality: '小纸条-阿里云盘',
            //quality: $('p',html).text().replace(/文件夹/,'目录'),
            title: a.title,
            season: '',
            episode: '',
            info: ''
          });
        });
          //});  
  
          append(filtred());
          //rslt = [];
  
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
  
        if (extract.playlist) {
          if (extract.playlist.seasons) {
            extract.playlist.seasons.forEach(function (season) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
            });
          }
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
  
        return rslt;
      }
      /**
       * Показать файлы
       */
  
  
      function append(items) {
        var _this = this;
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = element.title;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            component.activity.loader(true);

            if (element.file) {
                  // var playlist = [];
                  // var first = {
                  //     url: element.file,
                  //     timeline: view,
                  //     title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                  //     subtitles: element.subtitles
                  // };
                  // Lampa.Player.play(first);
                  
                  // playlist.push(first);
                  // Lampa.Player.playlist(playlist);
              // network.silent(element.file, function (json) {
              //   if (json.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
              //     var str = json.replace(/\n/g, '');
              //     var h = $('section > div > a', str);
              //     var link = $(h).attr('href');
              //     element.img = object.movie.img;
              //     element.original_title = '';
              //     Lampa.Activity.push({
              //       url: link,
              //       title: '阿里云盘播放',
              //       component: 'yunpan2',
              //       movie: element,
              //       page: 1
              //     });
              //   } else component.emptyForQuery(select_title);
  
              //   component.loading(false);
              // }, function (a, c) {
              //   component.empty(network.errorDecode(a, c));
              // }, false, {
              //   dataType: 'text',
              // });
              element.img = object.movie.img;
              element.original_title = '';
              Lampa.Activity.push({
                url: element.file,
                title: '阿里云盘播放',
                component: 'yunpan2',
                movie: element,
                page: 1
              });
              component.loading(false);
              
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }

    function trex(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
        var resp;
        var search_videos;
        var find_videos;
        var rslt    = [];
      
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_title = object.movie.title;
        doreg = rule;
        var url1 = 'https://t-rex.tzfile.com/wp-admin/admin-ajax.php';
        url1 = url1.replace('#msearchword',encodeURIComponent(object.movie.title));

        network.clear();
        network.timeout(1000 * 15);
        network.silent(url1, function (json) {
          if (json.length > 0) {
            parse(json);
          } else component.emptyForQuery(select_title);
  
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, {
          action: 'ajax_search',
          text: object.movie.title
        }, {
          dataType: 'json',
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
        rslt = null;
      };
  
      function parse(json) {
          // var str = json.replace(/\n/g, '');
          // var h =  $('div.news_text > a', str);
          // $(h).each(function (i, html) {
        rslt = [];
        json.forEach(function (a) {
          rslt.push({
            file: a.url,
            quality: '霸王龙压制组',
            //quality: $('p',html).text().replace(/文件夹/,'目录'),
            title: a.title,
            season: '',
            episode: '',
            info: ''
          });
        });
          //});  
  
          append(filtred());
          //rslt = [];
  
      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
  
        if (extract.playlist) {
          if (extract.playlist.seasons) {
            extract.playlist.seasons.forEach(function (season) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
            });
          }
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
  
        return rslt;
      }
      /**
       * Показать файлы
       */
  
  
      function append(items) {
        var _this = this;
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = element.title;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            component.activity.loader(true);

            if (element.file) {
              network.silent(element.file, function (json) {
                if (json.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
                 var link = json.match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)[0];
                  element.img = object.movie.img;
                  element.original_title = '';
                  Lampa.Activity.push({
                    url: link,
                    title: '阿里云盘播放',
                    component: 'yunpan2',
                    movie: element,
                    page: 1
                  });
                } else component.emptyForQuery(select_title);
  
                component.loading(false);
              }, function (a, c) {
                component.empty(network.errorDecode(a, c));
              }, false, {
                dataType: 'text',
              });
              component.loading(false);
              
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }
  
    function alipansou(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
        var resp;
        var search_videos;
        var find_videos;
        var rslt    = [];
      
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_title = object.movie.title;
        doreg = rule;
        var url1 = 'https://alipansou.com/search?k=#msearchword&s=1&t=7';
        url1 = url1.replace('#msearchword',encodeURIComponent(object.movie.title));
  
        network.clear();
        network.timeout(1000 * 15);
        network.silent(url1, function (json) {
          if (json) {
            //console.log($('.van-row > a[target="_blank"]',json))
            if ($('a[target="_blank"]')) {
              parse(json);
            } else component.emptyForQuery(select_title);
          } else component.emptyForQuery(select_title);
  
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text',
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
        rslt = null;
      };
  
      function parse(json) {
        rslt = [];
        var str = json.replace(/\n/g, '');
        
        var h = $('a[target="_blank"]', str);
        
        $(h).each(function (i, html) {
            if (($(html).attr('href')).indexOf(/s/) == 0) {
              //console.log($(html).text())
            rslt.push({
              file: 'https://alipansou.com' + $(html).attr('href'),
              quality: '阿里云盘',
              //quality: $('p',html).text().replace(/文件夹/,'目录'),
              title: select_title+ ' - 资源'+(i+1),
              season: '',
              episode: '',
              info: ''
            });
            }
        });

        append(filtred());
        //rslt = [];

      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
  
        if (extract.playlist) {
          if (extract.playlist.seasons) {
            extract.playlist.seasons.forEach(function (season) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
            });
          }
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
  
        return rslt;
      }
      /**
       * Показать файлы
       */
  
  
      function append(items) {
        var _this = this;
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = element.title;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            component.activity.loader(true);
            if (element.file) {
                  // var playlist = [];
                  // var first = {
                  //     url: element.file,
                  //     timeline: view,
                  //     title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                  //     subtitles: element.subtitles
                  // };
                  // Lampa.Player.play(first);
                  
                  // playlist.push(first);
                  // Lampa.Player.playlist(playlist);
              network.silent(element.file, function (json) {
                if (json.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
                  var link = json.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/)[0];
                  element.img = object.movie.img;
                  element.original_title = '';
                  Lampa.Activity.push({
                    url: link,
                    title: '阿里云盘播放',
                    component: 'yunpan2',
                    movie: element,
                    page: 1
                  });
                } else component.emptyForQuery(select_title);
  
                component.loading(false);
              }, function (a, c) {
                component.empty(network.errorDecode(a, c));
              }, false, {
                dataType: 'text',
              });
              // element.img = object.movie.img;
              // element.original_title = '';
              // Lampa.Activity.push({
              //   url: element.file,
              //   title: '阿里云盘播放',
              //   component: 'yunpan2',
              //   movie: element,
              //   page: 1
              // });
              component.loading(false);
              
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }

    function tg_share_channel(component, _object,tg_channel_name) {
      var tg_channel_name = tg_channel_name;
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0
      };
      var rslt    = [];
      
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_title = object.movie.title;
        //doreg = rule;
        var url1 = 'http://proxy.cub.watch/cdn/https://tx.me/s/'+ tg_channel_name +'?q=#msearchword';
        url1 = url1.replace('#msearchword',encodeURIComponent(object.movie.title));
  
        network.clear();
        network.timeout(1000 * 15);
        network.silent(url1, function (json) {
          if (json) {
            if (json.indexOf('No posts found') == -1) {
              parse(json);
            } else component.emptyForQuery(select_title);
          } else component.emptyForQuery(select_title);
  
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'text',
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type 
       * @param {*} a 
       * @param {*} b 
       */
  
  
      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */
  
  
      this.destroy = function () {
        network.clear();
        extract = null;
        rslt = null;
      };
      
      function utc2beijing(utc_datetime) {
        // 转为正常的时间格式 年-月-日 时:分:秒
        var T_pos = utc_datetime.indexOf('T');
        var Z_pos = utc_datetime.indexOf('+');
        var year_month_day = utc_datetime.substr(0, T_pos);
        var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
        var new_datetime = year_month_day + " " + hour_minute_second;

        // 处理成为时间戳
        timestamp = new Date(Date.parse(new_datetime));
        timestamp = timestamp.getTime();
        timestamp = timestamp / 1000;

        // 增加8个小时，北京时间比utc时间多八个时区
        var timestamp = timestamp + 8 * 60 * 60;

        // 时间戳转为时间
        var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
        return beijing_datetime.replace(/\//g,'-');
      };
      
      function parse(json) {
        var str = json.replace(/\n/g, '');
        var h = $('.tgme_widget_message_bubble', str);
        $(h).each(function (i, html) {
          
          if ($(html).text().match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
            rslt.push({
              file: $(html).text().match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)[0],
              quality: '发布于：' + utc2beijing($('.time', html).attr('datetime')),
              //quality: $('p',html).text().replace(/文件夹/,'目录'),
              title: $('.highlight:first', html).text() + ($(html).html().match(/<\/mark>(.+?)<br>/) ? $(html).html().match(/<\/mark>(.+?)<br>/)[1].replace(/(<([^>]+)>)/ig, '').replace(/《|【|》|】|\./g, ' ') : ''),
              season: '',
              episode: '',
              info: ''
            });
          };
        });

        append(filtred());
        rslt = [];

      }
      /**
       * Построить фильтр
       */
  
  
      function filter() {
        filter_items = {
          season: [],
          voice: [],
          quality: []
        };
  
        if (extract.playlist) {
          if (extract.playlist.seasons) {
            extract.playlist.seasons.forEach(function (season) {
              filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
            });
          }
        }
  
        if (!filter_items.season[choice.season]) choice.season = 0;
        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */
  
  
      function filtred() {
        
        return rslt.reverse();
      }
      /**
       * Показать файлы
       */
  
  
      function append(items) {
        var _this = this;
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        items.forEach(function (element) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = element.title;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            component.activity.loader(true);
            if (element.file) {
                  // var playlist = [];
                  // var first = {
                  //     url: element.file,
                  //     timeline: view,
                  //     title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                  //     subtitles: element.subtitles
                  // };
                  // Lampa.Player.play(first);
                  
                  // playlist.push(first);
                  // Lampa.Player.playlist(playlist);
              // network.silent(element.file, function (json) {
              //   if (json.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
              //     var str = json.replace(/\n/g, '');
              //     var h = $('section > div > a', str);
              //     var link = $(h).attr('href');
              //     element.img = object.movie.img;
              //     element.original_title = '';
              //     Lampa.Activity.push({
              //       url: link,
              //       title: '阿里云盘播放',
              //       component: 'yunpan2',
              //       movie: element,
              //       page: 1
              //     });
              //   } else component.emptyForQuery(select_title);
  
              //   component.loading(false);
              // }, function (a, c) {
              //   component.empty(network.errorDecode(a, c));
              // }, false, {
              //   dataType: 'text',
              // });
              element.img = object.movie.img;
              element.original_title = '';
              Lampa.Activity.push({
                url: element.file,
                title: '阿里云盘播放',
                component: 'yunpan2',
                movie: element,
                page: 1
              });
              component.loading(false);
              
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            file: function file(call) {
              call({
                file: element.file
              });
            }
          });
        });
        component.start(true);
      }
    }

    function component(object) {
      var network = new Lampa.Reguest();
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      var files = new Lampa.Files(object);
      var filter = new Lampa.Filter(object);
      var balanser = Lampa.Storage.get('online_mod_balanser', '完美看看');
      var last_bls = Lampa.Storage.field('online_mod_save_last_balanser') === false ? {} : Lampa.Storage.cache('online_mod_last_balanser', 200, {});
      var contextmenu_all = [];
  
      if (last_bls[object.movie.id]) {
        balanser = last_bls[object.movie.id];
      }
  
      this.proxy = function (name) {
        if (Lampa.Storage.field('online_mod_proxy_' + name) === true) {
          if (name === 'kp') return 'https://lampa-cors.herokuapp.com/';
          if (name === 'rezka') return 'https://lampa-cors.herokuapp.com/';
          if (name === 'hdvb') return 'https://cors.eu.org/';
  
          if (Lampa.Storage.field('online_mod_proxy_other') === true) {
            return 'http://proxy.cub.watch/cdn/';
          } else {
            return 'https://lampa-cors.herokuapp.com/';
          }
        }
  
        return '';
      };
  
      var sources = {
        videocdn: new videocdn(this, object),
        rezka: new rezka(this, object),
        kinobase: new kinobase(this, object),
        collaps: new collaps(this, object),
        cdnmovies: new cdnmovies(this, object),
        filmix: new filmix(this, object),
        hdvb: new hdvb(this, object),
        videoapi: new videoapi(this, object),
        酷云: new kunyu77(this, object),
        无名资源: new noname(this, object),
        找资源: new zhaoziyuan(this, object),
        小纸条: new xiaozhitiao(this, object),
        猫狸盘搜: new alipansou(this, object),
        
      };
  
      var sname = [];
      var _this5 = this;
      doregjson.rule.forEach(function (elem) {
          sources[elem.name] = new web(_this5, object, elem);
          sname.push(elem.name);
      });
      
      var tg_sname = [];
      doregjson.tg_channel.forEach(function (elem) {
          sources[elem.channel_name] = new tg_share_channel(_this5, object, elem.channel_uri);
          tg_sname.push(elem.channel_name);
      });

      var last;
      var last_filter;
      var extended;
      var selected_id;
      var filter_translate = {
        season: Lampa.Lang.translate('torrent_serial_season'),
        voice: Lampa.Lang.translate('torrent_parser_voice'),
        source: Lampa.Lang.translate('settings_rest_source')
      };
      var filter_sources = ['找资源', '小纸条', '猫狸盘搜', '无名资源', '酷云',  'videocdn', 'rezka', 'kinobase', 'collaps', 'cdnmovies', 'filmix', 'hdvb', 'videoapi']; // шаловливые ручки
      filter_sources = tg_sname.concat(filter_sources);
      filter_sources = sname.concat(filter_sources);
  
      if (filter_sources.indexOf(balanser) == -1) {
        balanser = '完美看看';
        Lampa.Storage.set('online_mod_balanser', '完美看看');
      }
  
      scroll.body().addClass('torrent-list');
  
      function minus() {
        scroll.minus(window.innerWidth > 580 ? false : files.render().find('.files__left'));
      }
  
      window.addEventListener('resize', minus, false);
      minus();
      /**
       * Подготовка
       */
  
      this.create = function () {
        var _this = this;
  
        this.activity.loader(true);
        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
  
        filter.onSearch = function (value) {
          Lampa.Activity.replace({
            search: value,
            search_date: '',
            clarification: true
          });
        };
  
        filter.onBack = function () {
          _this.start();
        };
  
        filter.render().find('.selector').on('hover:focus', function (e) {
          last_filter = e.target;
        });
  
        filter.onSelect = function (type, a, b) {
          if (type == 'filter') {
            if (a.reset) {
              if (extended) sources[balanser].reset();else _this.start();
            } else {
              sources[balanser].filter(type, a, b);
              //console.log(type,a,b)
            }
          } else if (type == 'sort') {
            balanser = a.source;
            Lampa.Storage.set('online_mod_balanser', balanser);
            last_bls[object.movie.id] = balanser;
  
            if (Lampa.Storage.field('online_mod_save_last_balanser') !== false) {
              Lampa.Storage.set('online_mod_last_balanser', last_bls);
            }
  
            _this.search();
  
            setTimeout(Lampa.Select.close, 10);
          }
        };
  
        //filter.render().find('.filter--search').hide();
        //filter.render().find('.filter--filter').hide();
        //filter.render().find('.filter--filter').before('<div class="simple-button simple-button--filter selector filter--sortnew"><span>倒序</span><div class="hide"></div> </div>');
        // var clicknum,flag = true;
        // filter.render().find('.filter--sortnew').on('hover:enter click.hover', function () {
        //   if(flag){
        //     clicknum = 1;
        //     flag = false;
        //   }
        //   else{
        //     clicknum = 0
        //     flag = true;
        //   };
        //   sources[balanser].filter('filter',{
        //     "title": "剧集排序",
        //     "subtitle": "倒序",
        //     "items": [
        //         {
        //             "title": "原始顺序",
        //             "selected": false,
        //             "index": 0
        //         },
        //         {
        //             "title": "倒序",
        //             "selected": true,
        //             "index": 1
        //         }
        //     ],
        //     "stype": "order",
        //     "selected": true
        // },{
        //     "title": "倒序",
        //     "selected": true,
        //     "index": clicknum
        // })
        // });
        filter.render().find('.filter--sort span').text(Lampa.Lang.translate('online_mod_balanser'));
        filter.render();
        files.append(scroll.render());
        scroll.append(filter.render());
        this.search();
        return this.render();
      };
      /**
       * Начать поиск
       */
  
  
      this.search = function () {
        this.activity.loader(true);
        this.filter({
          source: filter_sources
        }, {
          source: 0
        });
        this.reset();
        this.find();
      };
  
      this.cleanTitle = function (str) {
        return str.replace(/[ .:]+/g, ' ');
      };
  
      this.find = function () {
        var _this2 = this;
        var query = object.search || object.movie.title;
        var arr = ['videocdn', 'rezka', 'kinobase', 'collaps', 'cdnmovies', 'filmix', 'hdvb', 'videoapi'];
        if (arr.indexOf(balanser) === -1) {
          _this2.extendChoice();
          sources[balanser].search(object, encodeURIComponent(_this2.cleanTitle(query)), '');
        }
        else {
        var imdb_id;
        var search_date = object.search_date || object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
        var search_year = parseInt((search_date + '').slice(0, 4));
        var orig = object.movie.original_title || object.movie.original_name;
  
        var display = function display(items) {
          if (items && items.length) {
            if (object.movie.imdb_id) {
              var tmp = items.filter(function (elem) {
                return (elem.imdb_id || elem.imdbId) == object.movie.imdb_id;
              });
              if (tmp.length) items = tmp;
            }
  
            var cards = items.filter(function (c) {
              var year = c.start_date || c.year || '0000';
              c.tmp_year = parseInt((year + '').slice(0, 4));
              return !c.tmp_year || !search_year || c.tmp_year > search_year - 2 && c.tmp_year < search_year + 2;
            });
  
            if (cards.length > 1) {
              var _tmp = cards.filter(function (c) {
                return c.tmp_year == search_year;
              });
  
              if (_tmp.length) cards = _tmp;
            }
  
            if (cards.length > 1 && orig) {
              var _tmp2 = cards.filter(function (elem) {
                return (elem.orig_title || elem.nameOriginal || elem.nameEn || elem.nameRu) == orig;
              });
  
              if (_tmp2.length) cards = _tmp2;
            }
  
            if (cards.length > 1) {
              var _tmp3 = cards.filter(function (elem) {
                return (elem.title || elem.nameRu || elem.nameEn) == query;
              });
  
              if (_tmp3.length) cards = _tmp3;
            }
  
            if (cards.length == 1) {
              _this2.extendChoice();
  
              sources[balanser].search(object, cards[0].kp_id || cards[0].kinopoiskId || cards[0].filmId, cards);
            } else {
              _this2.similars(items);
  
              _this2.loading(false);
            }
          } else _this2.emptyForQuery(query);
        };
  
        var vcdn_search = function vcdn_search() {
          var url;
  
          if (balanser == 'videoapi') {
            url = _this2.proxy('videoapi') + 'http://5100.svetacdn.in/api/short';
            url = Lampa.Utils.addUrlComponent(url, 'api_token=qR0taraBKvEZULgjoIRj69AJ7O6Pgl9O');
          } else {
            var prox = _this2.proxy('videocdn');
  
            url = prox ? prox + 'https://videocdn.tv/api/short' : 'http://cdn.svetacdn.in/api/short';
            url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
          }
  
          var url_by_title = Lampa.Utils.addUrlComponent(url, 'title=' + encodeURIComponent(query));
          if (imdb_id) url = Lampa.Utils.addUrlComponent(url, 'imdb_id=' + encodeURIComponent(imdb_id));else url = url_by_title;
          network.timeout(1000 * 15);
          network.silent(url, function (json) {
            if (json.data && json.data.length) display(json.data);else if (imdb_id) {
              network.timeout(1000 * 15);
              network.silent(url_by_title, function (json) {
                if (json.data && json.data.length) display(json.data);else display([]);
              }, function (a, c) {
                _this2.empty(network.errorDecode(a, c));
              });
            } else display([]);
          }, function (a, c) {
            _this2.empty(network.errorDecode(a, c));
          });
        };
  
        var kp_search = function kp_search() {
          var url = _this2.proxy('kp') + 'https://kinopoiskapiunofficial.tech/api/';
          var url_by_title = Lampa.Utils.addUrlComponent(url + 'v2.1/films/search-by-keyword', 'keyword=' + encodeURIComponent(_this2.cleanTitle(query)));
          if (imdb_id) url = Lampa.Utils.addUrlComponent(url + 'v2.2/films', 'imdbId=' + encodeURIComponent(imdb_id));else url = url_by_title;
          network.timeout(1000 * 15);
          network.silent(url, function (json) {
            if (json.items && json.items.length) display(json.items);else if (json.films && json.films.length) display(json.films);else if (imdb_id) {
              network.timeout(1000 * 15);
              network.silent(url_by_title, function (json) {
                if (json.items && json.items.length) display(json.items);else if (json.films && json.films.length) display(json.films);else vcdn_search();
              }, function (a, c) {
                vcdn_search();
              }, false, {
                headers: {
                  'X-API-KEY': '2d55adfd-019d-4567-bbf7-67d503f61b5a'
                }
              });
            } else vcdn_search();
          }, function (a, c) {
            vcdn_search();
          }, false, {
            headers: {
              'X-API-KEY': '2d55adfd-019d-4567-bbf7-67d503f61b5a'
            }
          });
        };
  
        var letgo = function letgo(id) {
          imdb_id = id;
  
          if (balanser == 'kinobase' || balanser == 'filmix') {
            _this2.extendChoice();
  
            sources[balanser].search(object);
          } else {
            if (balanser == 'videocdn' || balanser == 'videoapi' || Lampa.Storage.field('online_mod_skip_kp_search') === true) vcdn_search();else kp_search();
          }
        };
  
        network.clear();
  
        if (object.movie.imdb_id) {
          letgo(object.movie.imdb_id);
        } else if (object.movie.source == 'tmdb' || object.movie.source == 'cub') {
          var tmdburl = (object.movie.name ? 'tv' : 'movie') + '/' + object.movie.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru';
          var baseurl = typeof Lampa.TMDB !== 'undefined' ? Lampa.TMDB.api(tmdburl) : 'http://api.themoviedb.org/3/' + tmdburl;
          network.timeout(1000 * 15);
          network.silent(baseurl, function (ttid) {
            letgo(ttid.imdb_id);
          }, function (a, c) {
            _this2.empty(network.errorDecode(a, c));
          });
        } else {
          letgo();
        }
        }
      };
  
      this.parsePlaylist = function (str) {
        var pl = [];
  
        try {
          if (str.charAt(0) === '[') {
            str.substring(1).split(',[').forEach(function (item) {
              var label_end = item.indexOf(']');
  
              if (label_end >= 0) {
                var label = item.substring(0, label_end);
  
                if (item.charAt(label_end + 1) === '{') {
                  item.substring(label_end + 2).split(';{').forEach(function (voice_item) {
                    var voice_end = voice_item.indexOf('}');
  
                    if (voice_end >= 0) {
                      var voice = voice_item.substring(0, voice_end);
                      pl.push({
                        label: label,
                        voice: voice,
                        links: voice_item.substring(voice_end + 1).split(' or ')
                      });
                    }
                  });
                } else {
                  pl.push({
                    label: label,
                    links: item.substring(label_end + 1).split(' or ')
                  });
                }
              }
            });
          }
        } catch (e) {}
  
        return pl;
      };
  
      this.parseM3U = function (str) {
        var pl = [];
  
        try {
          var width = 0;
          var height = 0;
          str.split('\n').forEach(function (line) {
            if (line.charAt(0) == '#') {
              var resolution = line.match(/\bRESOLUTION=(\d+)x(\d+)\b/);
  
              if (resolution) {
                width = parseInt(resolution[1]);
                height = parseInt(resolution[2]);
              }
            } else if (line.trim().length) {
              pl.push({
                width: width,
                height: height,
                link: line
              });
              width = 0;
              height = 0;
            }
          });
        } catch (e) {}
  
        return pl;
      };
  
      this.extendChoice = function () {
        var data = Lampa.Storage.cache('online_mod_choice_' + balanser, 500, {});
        var save = data[selected_id || object.movie.id || object.movie.url] || {};
        extended = true;
        sources[balanser].extendChoice(save);
      };
  
      this.saveChoice = function (choice) {
        var data = Lampa.Storage.cache('online_mod_choice_' + balanser, 500, {});
        data[selected_id || object.movie.id || object.movie.url] = choice;
        Lampa.Storage.set('online_mod_choice_' + balanser, data);
      };
      this.order = [{title: '原始顺序', id: 'normal'}, 
		              {title: '倒序', id: 'invers'}];
      /**
       * Есть похожие карточки
       * @param {Object} json 
       */
  
  
      this.similars = function (json) {
        var _this3 = this;
  
        json.forEach(function (elem) {
          var year = elem.start_date || elem.year || '';
          var info = [];
          if (elem.seasons_count) info.push(Lampa.Lang.translate('online_mod_seasons_count') + ': ' + elem.seasons_count);
          if (elem.episodes_count) info.push(Lampa.Lang.translate('online_mod_episodes_count') + ': ' + elem.episodes_count);
          elem.title = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
          elem.quality = year ? (year + '').slice(0, 4) : '----';
          elem.info = info.length ? ' / ' + info.join(' / ') : '';
          var item = Lampa.Template.get('online_mod_folder', elem);
          item.on('hover:enter', function () {
            _this3.activity.loader(true);
  
            _this3.reset();
  
            object.search = elem.title;
            object.search_date = year;
            selected_id = elem.id;
  
            _this3.extendChoice();
  
            sources[balanser].search(object, elem.kp_id || elem.kinopoiskId || elem.filmId, [elem]);
          });
  
          _this3.append(item);
        });
      };
      /**
       * Очистить список файлов
       */
  
  
      this.reset = function () {
        contextmenu_all = [];
        last = false;
        scroll.render().find('.empty').remove();
        filter.render().detach();
        scroll.clear();
        scroll.append(filter.render());
      };
      /**
       * Загрузка
       */
  
  
      this.loading = function (status) {
        if (status) this.activity.loader(true);else {
          this.activity.loader(false);
          this.activity.toggle();
        }
      };
      /**
       * Построить фильтр
       */
  
  
      this.filter = function (filter_items, choice) {
        var select = [];
  
        var add = function add(type, title) {
          var need = Lampa.Storage.get('online_mod_filter', '{}');
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
  
        filter_items.source = filter_sources;
        choice.source = filter_sources.indexOf(balanser);
        select.push({
          title: Lampa.Lang.translate('torrent_parser_reset'),
          reset: true
        });
        Lampa.Storage.set('online_mod_filter', choice);
        if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
        if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
        if (filter_items.order && filter_items.order.length) add('order', '剧集排序' + '');
        filter.set('filter', select);
        filter.set('sort', filter_sources.map(function (e) {
          return {
            title: e,
            source: e,
            selected: e == balanser
          };
        }));
        this.selected(filter_items);
      };
      /**
       * Закрыть фильтр
       */
  
  
      this.closeFilter = function () {
        if ($('body').hasClass('selectbox--open')) Lampa.Select.close();
      };
      /**
       * Показать что выбрано в фильтре
       */
  
  
      this.selected = function (filter_items) {
        var need = Lampa.Storage.get('online_mod_filter', '{}'),
            select = [];
  
        for (var i in need) {
          if (filter_items[i] && filter_items[i].length) {
            if (i == 'voice') {
              select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
            } else if (i !== 'source') {
              if (filter_items.season.length >= 1) {
                select.push(filter_translate.season + ': ' + filter_items[i][need[i]]);
              }
            }
          }
        }
  
        filter.chosen('filter', select);
        filter.chosen('sort', [balanser]);
      };
      /**
       * Добавить файл
       */
  
  
      this.append = function (item) {
        item.on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        scroll.append(item);
      };
      /**
       * Меню
       */
  
  
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
          if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('online_mod_file_helper'), params.item);
        });
      };
      /**
       * Показать пустой результат
       */
  
  
      this.empty = function (msg) {
        var empty = Lampa.Template.get('list_empty');
        if (msg) empty.find('.empty__descr').text(msg);
        scroll.append(empty);
        this.loading(false);
      };
      /**
       * Показать пустой результат по ключевому слову
       */
  
  
      this.emptyForQuery = function (query) {
        this.empty(Lampa.Lang.translate('online_mod_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_mod_query_end'));
      };
  
      this.getLastEpisode = function (items) {
        var last_episode = 0;
        items.forEach(function (e) {
          if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
        });
        return last_episode;
      };
      /**
       * Начать навигацию по файлам
       */
  
  
      this.start = function (first_select) {
        if (Lampa.Activity.active().activity !== this.activity) return; //обязательно, иначе наблюдается баг, активность создается но не стартует, в то время как компонент загружается и стартует самого себя.
  
        if (first_select) {
          var last_views = scroll.render().find('.selector.online').find('.torrent-item__viewed').parent().last();
          if (object.movie.number_of_seasons && last_views.length) last = last_views.eq(0)[0];else last = scroll.render().find('.selector').eq(3)[0];
        }
  
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(scroll.render(), files.render());
            Lampa.Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) {
              if (scroll.render().find('.selector').slice(3).index(last) == 0 && last_filter) {
                Lampa.Controller.collectionFocus(last_filter, scroll.render());
              } else Navigator.move('up');
            } else Lampa.Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            if (Navigator.canmove('right')) Navigator.move('right');else filter.show(Lampa.Lang.translate('title_filter'), 'filter');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
          },
          back: this.back
        });
        Lampa.Controller.toggle('content');
      };
  
      this.render = function () {
        return files.render();
      };
  
      this.back = function () {
        Lampa.Activity.backward();
      };
  
      this.pause = function () {};
  
      this.stop = function () {};
  
      this.destroy = function () {
        network.clear();
        files.destroy();
        scroll.destroy();
        network = null;
        sources.videocdn.destroy();
        sources.rezka.destroy();
        sources.kinobase.destroy();
        sources.collaps.destroy();
        sources.cdnmovies.destroy();
        sources.filmix.destroy();
        sources.hdvb.destroy();
        sources.videoapi.destroy();
        sources.酷云.destroy();
        sources.无名资源.destroy();
        sources.找资源.destroy();
        sources.小纸条.destroy();
        sources.猫狸盘搜.destroy();
        doregjson.tg_channel.forEach(function (elem) {
          sources[elem.channel_name].destroy();
        });
        doregjson.rule.forEach(function (elem) {
          sources[elem.name].destroy();
        });
        window.removeEventListener('resize', minus);
      };
    }
  
    if (!Lampa.Lang) {
      var lang_data = {};
      Lampa.Lang = {
        add: function add(data) {
          lang_data = data;
        },
        translate: function translate(key) {
          return lang_data[key] ? lang_data[key].ru : key;
        }
      };
    }
  
    Lampa.Lang.add({
      online_mod_nolink: {
        ru: 'Не удалось извлечь ссылку',
        uk: 'Неможливо отримати посилання',
        be: 'Не ўдалося атрымаць спасылку',
        en: 'Failed to fetch link',
        zh: '获取链接失败'
      },
      online_mod_waitlink: {
        ru: 'Работаем над извлечением ссылки, подождите...',
        uk: 'Працюємо над отриманням посилання, зачекайте...',
        be: 'Працуем над выманнем спасылкі, пачакайце...',
        en: 'Working on extracting the link, please wait...',
        zh: '正在提取链接，请稍候...'
      },
      online_mod_balanser: {
        ru: 'Балансер',
        uk: 'Балансер',
        be: 'Балансер',
        en: 'Balancer',
        zh: '换源'
      },
      online_mod_file_helper: {
        ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
        uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
        be: 'Утрымлівайце клавішу "ОК" для выкліку кантэкстнага меню',
        en: 'Hold the "OK" key to bring up the context menu',
        zh: '按住“确定”键调出上下文菜单'
      },
      online_mod_clearmark_all: {
        ru: 'Снять отметку у всех',
        uk: 'Зняти позначку у всіх',
        be: 'Зняць адзнаку ва ўсіх',
        en: 'Uncheck all',
        zh: '取消所有'
      },
      online_mod_timeclear_all: {
        ru: 'Сбросить тайм-код у всех',
        uk: 'Скинути тайм-код у всіх',
        be: 'Скінуць тайм-код ва ўсіх',
        en: 'Reset timecode for all',
        zh: '重置所有的时间码'
      },
      online_mod_query_start: {
        ru: 'По запросу',
        uk: 'На запит',
        be: 'Па запыце',
        en: 'On request',
        zh: '您搜索的'
      },
      online_mod_query_end: {
        ru: 'нет результатов',
        uk: 'немає результатів',
        be: 'няма вынікаў',
        en: 'no results',
        zh: '找不到资源，请切换其它网站源试试。'
      },
      online_mod_title: {
        ru: 'Онлайн',
        uk: 'Онлайн',
        be: 'Анлайн',
        en: 'Online',
        zh: '观看'
      },
      online_mod_title_full: {
        ru: 'Онлайн Мод',
        uk: 'Онлайн Мод',
        be: 'Анлайн Мод',
        en: 'Online Mod',
        zh: '在线观看'
      },
      online_mod_proxy_other: {
        ru: 'Использовать альтернативный прокси',
        uk: 'Використовувати альтернативний проксі',
        be: 'Выкарыстоўваць альтэрнатыўны проксі',
        en: 'Use an alternative proxy',
        zh: '使用备用代理'
      },
      online_mod_proxy_balanser: {
        ru: 'Проксировать',
        uk: 'Проксирувати',
        be: 'Праксіраваць',
        en: 'Proxy',
        zh: '代理'
      },
      online_mod_proxy_kp: {
        ru: 'Проксировать КиноПоиск',
        uk: 'Проксирувати КиноПоиск',
        be: 'Праксіраваць КиноПоиск',
        en: 'Proxy KinoPoisk',
        zh: '代理 KinoPoisk'
      },
      online_mod_skip_kp_search: {
        ru: 'Не искать в КиноПоиск',
        uk: 'Не шукати у КиноПоиск',
        be: 'Не шукаць у КиноПоиск',
        en: 'Skip search in KinoPoisk',
        zh: '在 KinoPoisk 中跳过搜索'
      },
      online_mod_save_last_balanser: {
        ru: 'Сохранять историю балансеров',
        uk: 'Зберігати історію балансерів',
        be: 'Захоўваць гісторыю балансараў',
        en: 'Save history of balancers',
        zh: '保存换源历史'
      },
      online_mod_clear_last_balanser: {
        ru: 'Очистить историю балансеров',
        uk: 'Очистити історію балансерів',
        be: 'Ачысціць гісторыю балансараў',
        en: 'Clear history of balancers',
        zh: '清除换源历史',
      },
      online_mod_seasons_count: {
        ru: 'Сезонов',
        uk: 'Сезонів',
        be: 'Сезонаў',
        en: 'Seasons',
        zh: '季'
      },
      online_mod_episodes_count: {
        ru: 'Эпизодов',
        uk: 'Епізодів',
        be: 'Эпізодаў',
        en: 'Episodes',
        zh: '集'
      },
      online_mod_filmix_param_add_title: {
        ru: 'Добавить ТОКЕН от Filmix',
        uk: 'Додати ТОКЕН від Filmix',
        be: 'Дадаць ТОКЕН ад Filmix',
        en: 'Add TOKEN from Filmix',
        zh: '添加 Filmix TOKEN '
      },
      online_mod_filmix_param_add_descr: {
        ru: 'Добавьте ТОКЕН для подключения подписки',
        uk: 'Додайте ТОКЕН для підключення передплати',
        be: 'Дадайце ТОКЕН для падлучэння падпіскі',
        en: 'Add a TOKEN to connect a subscription',
        zh: '添加 TOKEN 以连接订阅'
      },
      online_mod_filmix_param_placeholder: {
        ru: 'Например: nxjekeb57385b..',
        uk: 'Наприклад: nxjekeb57385b..',
        be: 'Напрыклад: nxjekeb57385b..',
        en: 'For example: nxjekeb57385b..',
        zh: '例如： nxjekeb57385b..'
      },
      online_mod_filmix_param_add_device: {
        ru: 'Добавить устройство на Filmix',
        uk: 'Додати пристрій на Filmix',
        be: 'Дадаць прыладу на Filmix',
        en: 'Add Device to Filmix',
        zh: '将设备添加到 Filmix'
      },
      online_mod_filmix_modal_text: {
        ru: 'Введите его на странице https://filmix.ac/consoles в вашем авторизованном аккаунте!',
        uk: 'Введіть його на сторінці https://filmix.ac/consoles у вашому авторизованому обліковому записі!',
        be: 'Увядзіце яго на старонцы https://filmix.ac/consoles у вашым аўтарызаваным акаўнце!',
        en: 'Enter it at https://filmix.ac/consoles in your authorized account!',
        zh: '在您的授权帐户中的 https://filmix.ac/consoles 中输入！'
      },
      online_mod_filmix_modal_wait: {
        ru: 'Ожидаем код',
        uk: 'Очікуємо код',
        be: 'Чакаем код',
        en: 'Waiting for the code',
        zh: '等待验证码'
      },
      online_mod_filmix_copy_secuses: {
        ru: 'Код скопирован в буфер обмена',
        uk: 'Код скопійовано в буфер обміну',
        be: 'Код скапіяваны ў буфер абмену',
        en: 'Code copied to clipboard',
        zh: '验证码已经复制到剪贴板'
      },
      online_mod_filmix_copy_fail: {
        ru: 'Ошибка при копировании',
        uk: 'Помилка при копіюванні',
        be: 'Памылка пры капіяванні',
        en: 'Copy error',
        zh: '复制错误'
      },
      online_mod_filmix_nodevice: {
        ru: 'Устройство не авторизовано',
        uk: 'Пристрій не авторизований',
        be: 'Прылада не аўтарызавана',
        en: 'Device not authorized',
        zh: '设备未授权'
      },
      online_mod_filmix_status: {
        ru: 'Статус',
        uk: 'Статус',
        be: 'Статус',
        en: 'Status',
        zh: '状态'
      },
      online_mod_voice_subscribe: {
        ru: 'Подписаться на перевод',
        uk: 'Підписатися на переклад',
        be: 'Падпісацца на пераклад',
        en: 'Subscribe to translation',
        zh: '订阅翻译'
      },
      online_mod_voice_success: {
        ru: 'Вы успешно подписались',
        uk: 'Ви успішно підписалися',
        be: 'Вы паспяхова падпісаліся',
        en: 'You have successfully subscribed',
        zh: '您已成功订阅'
      },
      online_mod_voice_error: {
        ru: 'Возникла ошибка',
        uk: 'Виникла помилка',
        be: 'Узнікла памылка',
        en: 'An error has occurred',
        zh: '发生了错误'
      }
    });
  
    function resetTemplates() {
      Lampa.Template.add('online_mod', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"64\" cy=\"64\" r=\"56\" stroke=\"white\" stroke-width=\"16\"/>\n                    <path d=\"M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
      Lampa.Template.add('online_mod_folder', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"/>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"/>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
    }
  
    var button = "<div class=\"full-start__button selector view--online_mod\" data-subtitle=\"\">\n    <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-video\"><polygon points=\"23 7 16 12 23 17 23 7\"></polygon><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" ry=\"2\"></rect></svg>\n\n    <span>#{online_mod_title}</span>\n    </div>"; // нужна заглушка, а то при страте лампы говорит пусто
  
    Lampa.Component.add('online_mod', component); //то же самое
  
    resetTemplates();
    Lampa.Listener.follow('full', function (e) {
      if (e.type == 'complite') {
        var btn = $(Lampa.Lang.translate(button));
        btn.on('hover:enter', function () {
          resetTemplates();
          Lampa.Component.add('online_mod', component);
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('online_mod_title_full'),
            component: 'online_mod',
            search: e.data.movie.title,
            search_one: e.data.movie.title,
            search_two: e.data.movie.original_title,
            movie: e.data.movie,
            page: 1
          });
        });
        $('.view--torrent').addClass('selector').empty().append('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.501953 4.125 C 12.485953 4.125 3.5019531 13.11 3.5019531 24.125 C 3.5019531 32.932677 9.2467538 40.435277 17.179688 43.091797 L 17.146484 42.996094 L 7 16 L 15 14 C 17.573 20.519 20.825516 32.721688 27.728516 30.929688 C 35.781516 28.948688 28.615 16.981172 27 12.076172 L 34 11 C 38.025862 19.563024 39.693648 25.901226 43.175781 27.089844 C 43.191423 27.095188 43.235077 27.103922 43.275391 27.113281 C 43.422576 26.137952 43.501953 25.140294 43.501953 24.125 C 43.501953 13.11 34.517953 4.125 23.501953 4.125 z M 34.904297 29.314453 C 34.250297 34.648453 28.811359 37.069578 21.943359 35.517578 L 26.316406 43.763672 L 26.392578 43.914062 C 33.176993 42.923925 38.872645 38.505764 41.660156 32.484375 C 41.603665 32.485465 41.546284 32.486418 41.529297 32.486328 C 38.928405 32.472567 36.607552 31.572967 34.904297 29.314453 z"/></svg><span>' + Lampa.Lang.translate('full_torrents') + '</span>');
        e.object.activity.render().find('.view--torrent').after(btn);
      }
    }); ///////FILMIX/////////
  
    var network = new Lampa.Reguest();
    var api_url = 'http://filmixapp.cyou/api/v2/';
    var user_dev = '?user_dev_apk=1.1.3&user_dev_id=' + Lampa.Utils.uid(16) + '&user_dev_name=Xiaomi&user_dev_os=11&user_dev_vendor=Xiaomi&user_dev_token=';
    var ping_auth;
    Lampa.Params.select('filmix_token', '', '');
    Lampa.Template.add('settings_filmix', "<div>\n    <div class=\"settings-param selector\" data-name=\"filmix_token\" data-type=\"input\" placeholder=\"#{online_mod_filmix_param_placeholder}\">\n        <div class=\"settings-param__name\">#{online_mod_filmix_param_add_title}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{online_mod_filmix_param_add_descr}</div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"filmix_add\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_filmix_param_add_device}</div>\n    </div>\n</div>");
    Lampa.Storage.listener.follow('change', function (e) {
      if (e.name == 'filmix_token') {
        if (e.value) checkPro(e.value);else {
          Lampa.Storage.set("filmix_status", {});
          showStatus();
        }
      }
    });
    Lampa.Listener.follow('app', function (e) {
      if (e.type == 'ready' && Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="filmix"]').length) {
        var field = $("<div class=\"settings-folder selector\" data-component=\"filmix\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"57\" viewBox=\"0 0 58 57\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z\" fill=\"white\"/>\n                <rect x=\"2\" y=\"2\" width=\"54\" height=\"53\" rx=\"5\" stroke=\"white\" stroke-width=\"4\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">Filmix</div>\n        </div>");
        Lampa.Settings.main().render().find('[data-component="more"]').after(field);
        Lampa.Settings.main().update();
      }
    });
    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name == 'filmix') {
        e.body.find('[data-name="filmix_add"]').unbind('hover:enter').on('hover:enter', function () {
          var user_code = '';
          var user_token = '';
          var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('online_mod_filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">' + Lampa.Lang.translate('online_mod_filmix_modal_wait') + '...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
          Lampa.Modal.open({
            title: '',
            html: modal,
            onBack: function onBack() {
              Lampa.Modal.close();
              Lampa.Controller.toggle('settings_component');
              clearInterval(ping_auth);
            },
            onSelect: function onSelect() {
              Lampa.Utils.copyTextToClipboard(user_code, function () {
                Lampa.Noty.show(Lampa.Lang.translate('online_mod_filmix_copy_secuses'));
              }, function () {
                Lampa.Noty.show(Lampa.Lang.translate('online_mod_filmix_copy_fail'));
              });
            }
          });
          ping_auth = setInterval(function () {
            checkPro(user_token, function () {
              Lampa.Modal.close();
              clearInterval(ping_auth);
              Lampa.Storage.set("filmix_token", user_token);
              e.body.find('[data-name="filmix_token"] .settings-param__value').text(user_token);
              Lampa.Controller.toggle('settings_component');
            });
          }, 10000);
          network.clear();
          network.timeout(10000);
          network.quiet(api_url + 'token_request' + user_dev, function (found) {
            if (found.status == 'ok') {
              user_token = found.code;
              user_code = found.user_code;
              modal.find('.selector').text(user_code); //modal.find('.broadcast__scan').remove()
            } else {
              Lampa.Noty.show(found);
            }
          }, function (a, c) {
            Lampa.Noty.show(network.errorDecode(a, c));
          });
        });
        showStatus();
      }
    });
  
    function showStatus() {
      var status = Lampa.Storage.get("filmix_status", '{}');
      var info = Lampa.Lang.translate('online_mod_filmix_nodevice');
  
      if (status.login) {
        if (status.is_pro) info = status.login + ' - PRO ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else if (status.is_pro_plus) info = status.login + ' - PRO_PLUS ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else info = status.login + ' - NO PRO';
      }
  
      var field = $(Lampa.Lang.translate("\n        <div class=\"settings-param\" data-name=\"filmix_status\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{online_mod_filmix_status}</div>\n            <div class=\"settings-param__value\">".concat(info, "</div>\n        </div>")));
      $('.settings [data-name="filmix_status"]').remove();
      $('.settings [data-name="filmix_add"]').after(field);
    }
  
    function checkPro(token, call) {
      network.clear();
      network.timeout(8000);
      network.silent(api_url + 'user_profile' + user_dev + token, function (json) {
        if (json) {
          if (json.user_data) {
            Lampa.Storage.set("filmix_status", json.user_data);
            if (call) call();
          } else {
            Lampa.Storage.set("filmix_status", {});
          }
  
          showStatus();
        }
      }, function (a, c) {
        Lampa.Noty.show(network.errorDecode(a, c));
      });
    } ///////Онлайн Мод/////////
  
  
    Lampa.Params.trigger('online_mod_proxy_other', false);
    Lampa.Params.trigger('online_mod_proxy_videocdn', false);
    Lampa.Params.trigger('online_mod_proxy_rezka', false);
    Lampa.Params.trigger('online_mod_proxy_kinobase', false);
    Lampa.Params.trigger('online_mod_proxy_collaps', false);
    Lampa.Params.trigger('online_mod_proxy_cdnmovies', false);
    Lampa.Params.trigger('online_mod_proxy_hdvb', false);
    Lampa.Params.trigger('online_mod_proxy_videoapi', false);
    Lampa.Params.trigger('online_mod_proxy_kp', false);
    Lampa.Params.trigger('online_mod_skip_kp_search', false);
    Lampa.Params.trigger('online_mod_save_last_balanser', true);
    Lampa.Template.add('settings_online_mod', "<div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_other\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_other}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_videocdn\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} videocdn</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_rezka\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} rezka</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kinobase\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} kinobase</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_collaps\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} collaps</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_cdnmovies\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} cdnmovies</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_hdvb\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} hdvb</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_videoapi\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} videoapi</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kp\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_kp}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_skip_kp_search\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_skip_kp_search}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_save_last_balanser\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_save_last_balanser}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_clear_last_balanser\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_clear_last_balanser}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n</div>");
    Lampa.Listener.follow('app', function (e) {
      if (e.type == 'ready' && Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="online_mod"]').length) {
        var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"online_mod\">\n            <div class=\"settings-folder__icon\">\n                <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-video\"><polygon points=\"23 7 16 12 23 17 23 7\"></polygon><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" ry=\"2\"></rect></svg>\n            </div>\n            <div class=\"settings-folder__name\">#{online_mod_title_full}</div>\n        </div>"));
        Lampa.Settings.main().render().find('[data-component="more"]').after(field);
        Lampa.Settings.main().update();
      }
    });
    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name == 'online_mod') {
        var item = e.body.find('[data-name="online_mod_clear_last_balanser"]');
        item.unbind('hover:enter').on('hover:enter', function () {
          Lampa.Storage.set('online_mod_last_balanser', {});
          $('.settings-param__status', item).removeClass('active error wait').addClass('active');
        });
      }
    });
  
  })();
