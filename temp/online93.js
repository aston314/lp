//04.11.2022 - 去除无用解析器

(function () {
    'use strict';
    var extract_rule = {
      "rule": [
        {
          name: '完美看看',
          websitelink: 'https://www.wanmeikk.film/',
          listlink: true,
          use_proxy: false,
          search_url: 'https://www.wanmeikk.film/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'div.stui-pannel_bd.col-pd',
          videoparse: 'browser',
          videocontainer: '.MacPlayer',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: 'LIBVIO',
          websitelink: 'https://www.libvio.me',
          listlink: true,
          use_proxy: false,
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
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '在线之家',
          websitelink: 'https://zxzj.vip',
          listlink: true,
          use_proxy: false,
          search_url: 'https://zxzj.vip/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'video',
          detail_url_selector: '.play-item.cont.active',
          videoparse: 'browser',
          videocontainer: '.MacPlayer',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '凌云影视',
          websitelink: 'https://www.lingyun.in',
          listlink: true,
          use_proxy: false,
          search_url: 'https://www.lingyun.in/search.html?wd=#msearchword',
          search_json: false,
          node_json: 'data',
          name_json: 'title',
          id_json: 'url',
          first_page_json: '',
          search_html_selector: 'dl > dd > p:nth-child(1) > strong',
          link_folder: '',
          detail_url_selector: '.player.ckp:first-child',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: true,
          js_execute_key: ['maccms', 'player_data']
        },
        {
          name: '剧白白',
          websitelink: 'https://www.jubaibai.cc',
          listlink: true,
          use_proxy: false,
          search_url: 'https://www.jubaibai.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'div.play-item.cont.active',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '秋霞电影',
          websitelink: 'https://www.7xiady.cc',
          listlink: true,
          use_proxy: false,
          search_url: 'https://www.7xiady.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: '.stui-pannel_bd.col-pd.clearfix',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: false,
          js_execute_key: ['maccms', 'player_data']
        },
        // {
        //   name : '乐猪TV',
        //   websitelink : 'http://www.lezhutv.com/',
        //   listlink : true,
        //   use_proxy: false,
        //   search_url : 'http://www.lezhutv.com/search-pg-1-wd-#msearchword.html',
        //   search_json : false,
        //   node_json : '',
        //   name_json : '',
        //   id_json : '',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder : 'play',
        //   videoparse: 'default',
        //   videocontainer: '.MacPlayer',
        //   use_referer : false,
        //   js_execute_key : ['maccms','player_aaaa']
        // },
        // {
        //   name : '9亿看看',
        //   websitelink : 'https://www.9eguoyu.com',
        //   listlink : true,
        //   use_proxy: false,
        //   search_url : 'https://www.9eguoyu.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json : true,
        //   node_json : 'list',
        //   name_json : 'name',
        //   id_json : 'id',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder : 'vodplay',
        //   videoparse: 'default',
        ///  videocontainer: '.MacPlayer',
        //   use_referer : false,
        //   js_execute_key : ['maccms','player_aaaa']
        // },
        {
          name: 'AUETE影视',
          websitelink: 'https://auete.com',
          listlink: true,
          use_proxy: false,
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
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: false,
          js_execute_key: [';var vfrom=']
        },
        {
          name: '欧乐影视',
          websitelink: 'https://www.olehdtv.com/',
          listlink: true,
          use_proxy: false,
          search_url: 'https://www.olehdtv.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'index.php/vod/detail/id',
          detail_url_selector: 'div.playlist_full',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        // {
        //   name: '追剧喵',
        //   websitelink: 'https://zjmiao.com/',
        //   listlink: true,
        //   use_proxy: false,
        //   search_url: 'https://zjmiao.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json: true,
        //   node_json: 'list',
        //   name_json: 'name',
        //   id_json: 'id',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder: 'index.php/vod/detail/id',
        //   detail_url_selector: 'div.playlist_notfull:eq(0)',
        //   videoparse: 'default',
        //   videocontainer: '.MacPlayer',
        //   use_referer: false,
        //   js_execute_key: ['maccms', 'player_aaaa']
        // },
        // {
        //   name : '555电影',
        //   websitelink : 'https://www.555dy.me',
        //   listlink : true,
        //   use_proxy: false,
        //   search_url : 'https://www.555dy.me/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json : true,
        //   node_json : 'list',
        //   name_json : 'name',
        //   id_json : 'id',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder : 'vodplay',
        //   detail_url_selector: '.module-list.sort-list.tab-list.play-tab-list.active',
        //   videoparse: 'default',
        //   videocontainer: '.MacPlayer',
        //   use_referer : false,
        //  js_execute_key : ['maccms','player_aaaa']
        // },
        // {
        //   name : '看视界',
        //   websitelink : 'https://www.1080kan.cc',
        //   listlink : true,
        //   use_proxy: false,
        //   search_url : 'https://www.1080kan.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json : true,
        //   node_json : 'list',
        //   name_json : 'name',
        //   id_json : 'id',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder : 'video',
        //   detail_url_selector: '.module-list.sort-list.tab-list.play-tab-list.active',
        //   videoparse: 'default',
        //   videocontainer: '.MacPlayer',
        //   use_referer : false,
        //  js_execute_key : ['maccms','player_aaaa']
        // },
        {
          name: '乌龟影院',
          websitelink: 'https://www.wuguiyy.com',
          listlink: true,
          use_proxy: false,
          search_url: 'https://www.wuguiyy.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'div:nth-child(3) > div > div.stui-pannel_bd.col-pd.clearfix > ul > li',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '达达龟',
          websitelink: 'https://www.dadagui.me/',
          listlink: true,
          use_proxy: false,
          search_url: 'https://www.dadagui.me/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'vodplay',
          detail_url_selector: 'div#play-box div.play-item.cont.active > ul',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name : '大师兄',
          websitelink : 'https://dsxys.com/',
          listlink : true,
          use_proxy: false,
          search_url : 'https://dsxys.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json : true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder : 'p',
          detail_url_selector : 'div.player-list',
          videoparse: 'browser',
          videocontainer: '.player-box-main',
          use_referer : false,
          js_execute_key : ['maccms','player_aaaa']
        },
        {
          name: '神马影院',
          websitelink: 'https://www.smdyy.cc',
          listlink: true,
          use_proxy: false,
          search_url: 'https://www.smdyy.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'ul.stui-play__list',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: 'voflix HD',
          websitelink: 'https://www.voflix.com',
          listlink: true,
          use_proxy: false,
          search_url: 'https://www.voflix.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: '.module-list.sort-list.tab-list.play-tab-list.active',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '剧荒TV',
          websitelink: 'https://juhuang.tv',
          listlink: true,
          use_proxy: false,
          search_url: 'https://so.juhuang.tv/soapi.php?wd=#msearchword',
          search_json: true,
          node_json: 'list',
          name_json: 'vod_name',
          id_json: 'vod_id',
          first_page_json: '_play_1_1.html',
          search_html_selector: '',
          link_folder: 'play',
          detail_url_selector: 'div.scroll-content',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '厂长资源',
          websitelink: 'https://www.czspp.com',
          listlink: false,
          use_proxy: false,
          search_url: 'https://www.czspp.com/xssearch?q=#msearchword',
          search_json: false,
          node_json: '',
          name_json: '',
          id_json: '',
          first_page_json: '',
          search_html_selector: 'h3.dytit',
          link_folder: '',
          detail_url_selector: 'div.paly_list_btn',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: true,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '素白白',
          websitelink: 'https://www.subaibaiys.com',
          listlink: false,
          use_proxy: false,
          search_url: 'https://www.subaibaiys.com/grabble?q=#msearchword',
          search_json: false,
          node_json: '',
          name_json: '',
          id_json: '',
          first_page_json: '',
          search_html_selector: 'h3.dytit',
          link_folder: '',
          detail_url_selector: 'div.paly_list_btn',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: true,
          js_execute_key: []
        },
        // {
        //   name: '独播库',
        //   websitelink: 'https://u.duboku.io',
        //   listlink: true,
        //   use_proxy: false,
        //   search_url: 'https://u.duboku.io/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json: true,
        //   node_json: 'list',
        //   name_json: 'name',
        //   id_json: 'id',
        //   first_page_json: '.html',
        //   search_html_selector: '',
        //   link_folder: 'voddetail',
        //   detail_url_selector: 'div.tab-content.myui-panel_bd',
        //   videoparse: 'default',
        //   videocontainer: '.MacPlayer',
        //   use_referer: false,
        //   js_execute_key: ['maccms', 'player_data']
        // },
        // {
        //   name: '网飞TV',
        //   websitelink: 'https://www.wangfei.tv',
        //   listlink: true,
        //   use_proxy: false,
        //   search_url: 'https://www.wangfei.tv/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json: true,
        //   node_json: 'list',
        //   name_json: 'name',
        //   id_json: 'id',
        //   first_page_json: '.html',
        //   search_html_selector: '',
        //   link_folder: 'voddetail',
        //   detail_url_selector: '.module-play-list:eq(0)',
        //   videoparse: 'default',
        //   videocontainer: '.MacPlayer',
        //   use_referer: false,
        //   js_execute_key: ['maccms', 'player_aaaa']
        // },
        {
          name: '鸭奈飞',
          websitelink: 'https://netflix.mom',
          listlink: true,
          use_proxy: false,
          search_url: 'https://netflix.mom/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'vodplay',
          detail_url_selector: '.module-play-list:eq(0)',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: false,
          js_execute_key: ['maccms', 'player_aaaa']
        },
        {
          name: '爱看',
          websitelink: 'https://ikan6.vip',
          listlink: true,
          use_proxy: false,
          search_url: 'https://ikan6.vip/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
          search_json: true,
          node_json: 'list',
          name_json: 'name',
          id_json: 'id',
          first_page_json: '-1-1.html',
          search_html_selector: '',
          link_folder: 'vodplay',
          detail_url_selector: 'ul.myui-content__list',
          videoparse: 'default',
          videocontainer: '.MacPlayer',
          use_referer: true,
          js_execute_key: ['maccms', 'player_data']
        },
        // {
        //   name: '黑洞网',
        //   websitelink: 'https://www.nulltm.com',
        //   listlink: true,
        //   use_proxy: false,
        //   search_url: 'https://www.nulltm.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
        //   search_json: true,
        //   node_json: 'list',
        //   name_json: 'name',
        //   id_json: 'id',
        //   first_page_json: '-1-1.html',
        //   search_html_selector: '',
        //   link_folder: 'vodplay',
        //   detail_url_selector: '.hl-plays-list',
        //   videoparse: 'default',
        //   videocontainer: '.MacPlayer',
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
      ],
      "resource_site": [
        {
          site_name: '采集网1080',
          site_search_url: 'https://api.1080zyku.com/inc/apijson.php?ac=search&wd=#msearchword',
          site_detail_url: 'https://api.1080zyku.com/inc/apijson.php?ac=detail&ids=#id'
        },
        {
          site_name: '多多资源网',
          site_search_url: 'https://www.ddzyz1.com/api.php/provide/vod/?ac=search&wd=#msearchword',
          site_detail_url: 'https://www.ddzyz1.com/api.php/provide/vod/?ac=detail&ids=#id'
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
  
    function web(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        order: 0,
        last_viewed: ''
      };
      var get_links_wait = false;
      var rslt = [];
      var proxy_url;
      //var proxy = 'https://proxy.cub.watch/cdn/'
      var proxy = 'https://cors.eu.org/'
      
      

      //var url = 'http://proxy.cub.watch/cdn/https://rentry.co/lampa_rule/raw';
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
        (doreg.use_proxy === true) ? proxy_url = proxy : proxy_url = '';
        
        network.clear();
        network.timeout(1000*15);
        network.silent(proxy_url + url1, function (str) {
          
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

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
      };
      /**
       * Сброс фильтра
       */
  
  
      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          last_viewed: ''
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
        (doreg.use_proxy === true) ? proxy_url = proxy : proxy_url = '';
        network.silent(proxy_url + link, function (data) {

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
        var match, aa = [], setting_js = false ,setting_link;
        while (match = re.exec(str)) {
          var cc = match[1].slice(0,2) == './' ? match[1].replace('./', MacPlayer_.split(url1_[0])[0] + '/' + url1_[1] + '/') : (match[1].slice(0,1) !== '/' &&  match[1].indexOf('http') == -1 ? MacPlayer_.match(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/)[0]+'/'+match[1] : match[1]);
          //cc = match[1].slice(0,1) !== '/' &&  match[1].indexOf('http') == -1 ? MacPlayer_.match(/https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/)[0]+'/'+match[1] : match[1];
          
          if (!/DPlayer|jquery|setting|-player|c606e5caeee702a784a0204d31ea3403|35a898211164a6b8a9a21a045dba9f8a|805d73dedddd5daf87bdbd38488362f8|33d6112475ac4d264c333fe9a5252aff|hls|flv/.test(cc)) {
            aa.push(cc);
          }
          //setting[\s\S]*\.js
          if (/setting[\s\S]*\.js/.test(cc)) {
            setting_js = true;
            setting_link = cc;
          }
        };
        //[^/]+(?=/[^/]+$)
        //\/([^\/]+)\/[^\/]+$
        //"([^.]*)\.(.*)"
        //console.log(setting_link,setting_js)
        str = str.replace(/<!--[\s\S]*?-->/g, '');
        var pattern = /<script[^>]*>([\s\S]*?)<\/script>/gi; //whole thing.
        //var pattern = /<script type="text\/javascript">([\s\S]*?)<\/script>/gi; //whole thing.
        var match_, aa_ = [];
        while (match_ = pattern.exec(str)) {
          //console.log(match[1]);
          if (match_[1]) {
            var cc = match_[1].replace(';!function(n)', '//;!function(n)');
            aa_.push(cc);
          }
        };
        var joinedaa = aa_.join("\r\n");
        //console.log(joinedaa)
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
            //var s_js = getRemote(MacPlayer_.replace('/' + doreg.link_folder + '/', '').split(url1_[0])[0] + '/' + url1_[1] + '/js/setting.js');
            var s_js = getRemote(setting_link);
            
            var b_js = s_js.match(/\.post|GET|POST/);
            var f_js = b_js[0] == 'GET' ? 'GET' : 'POST';
            var c_js = s_js.match(/[\'\"]([^.]*)\.(php|jpg|png)[\"\']/)
            c_js = c_js[0].replace(/'|"/g, '');
            var d_sj = MacPlayer_.replace('/' + doreg.link_folder + '/', '').split(url1_[0])[0] + '/' + url1_[1] + '/' + c_js;
            var e_js = s_js.match(/("sign"|sign): [\"\'](.+?)[\"\']/)[2];
            //console.log(config.url,config.vkey,config.token,d_sj,e_js)
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
                  //console.log(data)
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
                  //console.log('解析失败，请重试或切换线路~');
                }
              },
              error: function () {
                //handlePlayerLoadError();
                $(".noty").show();
                Lampa.Noty.show('解析失败，请重试或切换线路~');
                //console.log('解析失败，请重试或切换线路~');
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));

          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }

          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);

            if (element.file) {
              var videocontainer = doreg.videocontainer;
              var iabRef = null;
              function playershow() {
                iabRef.insertCSS({ code: '.focus { border: 2px solid #0f0f0f;}.dplayer-web-fullscreen-fix1{position:fixed;top:0;left:0;margin:0;padding:0}' + videocontainer + ' { position:fixed;z-index:2147483649;left:0;top:0;width:100%!important;height:100%!important}' });
                //iabRef.insertCSS({ code: 'a:hover{border: 2px solid #006}.MacPlayer { position:fixed;z-index:100000;left:0;top:0;width:100%!important;height:100%!important }' });
                //iabRef.executeScript({ code: `document.querySelector(".dplayer-full-icon").click();` });
                iabRef.executeScript({
                  code: '\
                  document.body.classList.add("dplayer-web-fullscreen-fix1");\
                  jQuery("div:not('+ videocontainer + ')").hide();  \
                  //jQuery("body > :not('+ videocontainer + ')").hide();\
                  jQuery("'+ videocontainer + '").appendTo("body"); \
                  //jQuery("'+ videocontainer + '").attr("id", "myLampaplayer0");\
                  //jQuery("'+ videocontainer + '").attr("tbaindex", "0"); \
                  //jQuery("'+ videocontainer + '").attr("tabindex",-1).focus();\
                  '});

                // iabRef.executeScript(
                //   {
                //     file: "https://cdn.jsdelivr.net/gh/simpleRobort/TV-Focus.js/focus.js"
                //     //webURL works fine with 'file'
                //   }, function () {
                //     iabRef.executeScript(
                //       {
                //         code: '\
                //         var vm = new FOCUS({\
                //           domIdName: "myLampaplayer", \
                //           event: {\
                //             keyOkEvent: function (focusId) {\
                //               console.log("点击了确认键，当前获得焦点的索引为：" + focusId)\
                //               switch (focusId) {\
                //                 case 0:\
                //                 \
                //                   break\
                //               }\
                //             },\
                //             keyBackEvent: function (focusId) {\
                //               console.log("点击了返回键，当前获得焦点的索引为：" + focusId)\
                //               switch (focusId) {\
                //                 case 6:\
                //                 case 7:\
                //                 \
                //                   break\
                //               }\
                //             }\
                //           }\
                //         })\
                //         '
                //       }, function () {
                //         console.log('摇控器支持脚本');
                //       });
                //   });

                //iabRef.show();
              };
              function iabClose(event) {
                iabRef.removeEventListener('loadstop', playershow);
                iabRef.removeEventListener('exit', iabClose);
              };
              (doreg.use_proxy === true) ? proxy_url = proxy : proxy_url = '';
              if (!!window.cordova && doreg.videoparse == 'browser') {
                iabRef = cordova.InAppBrowser.open(proxy_url + element.file, "_blank", "shouldPauseOnSuspend=yes,location=no,hidden=no,beforeload=no,mediaPlaybackRequiresUserAction=no");
                iabRef.addEventListener('loadstop', playershow);
                iabRef.addEventListener('exit', iabClose);
              } else {
                network.silent(proxy_url + element.file, function (str) {
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

                    $.getMultiScripts(script_arr, proxy_url + url).done(function () {
                      // all scripts loaded
                      //console.log(MacPlayer)
                      //$(".noty").hide();
                      $.getScript(proxy_url + url + MacPlayer.Path + MacPlayer.PlayFrom + ".js")
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
                            if (/ikanm3u8/.test(MacPlayer.PlayUrl)) {
                              var ikan_url = 'https://weiyunsha.ikan6.vip/tsjmjson/' + MacPlayer.PlayUrl.replace('ikanm3u8_', '') + '.m3u8'
                              var playlist = [];
                              var first = {
                                url: ikan_url,
                                timeline: view,
                                title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                                subtitles: element.subtitles
                              };
                              Lampa.Player.play(first);
                              playlist.push(first);
                              Lampa.Player.playlist(playlist);
                            } else {
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
                                if (navigator.userAgent.toLowerCase().indexOf("lampa_client") == -1) {
                                  $(".noty").show();
                                  Lampa.Noty.show('因CORS限制，该视频只能在安卓上观看。');
                                };

                                //if (navigator.userAgent.toLowerCase().indexOf("lampa_client") > -1) {
                                network["native"](MacPlayer_, function (str) {
                                  doparse(element, view, url1_, MacPlayer_, str);
                                }, function (a, c) {
                                  Lampa.Noty.show(network.errorDecode(a, c));
                                }, false, {
                                  dataType: 'text',
                                  headers: {
                                    'Referer': url + '/',
                                  }
                                });
                                //};
                              };
                            }
                          } else {
                            if (file) {
                              if (/if101\.tv/.test(file)) file = proxy + file;
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
              };

              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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
        voice: 0,
        last_viewed: ''
      };
      var sj = +new Date;
      var rslt = [];
      
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      function getdetail(url) {
          //component.reset();
          //Lampa.Noty.show('酷云线路只能在安卓上观看。');
          network["native"](url, function (json) {
            if (json.msg == '非法请求' || json.data.episodes.length == 0) {
              component.emptyForQuery(select_title)
            } else {
              parse(json);
            };
            component.loading(false);
          }, function (a, c) {
            Lampa.Noty.show(network.errorDecode(a, c));
          }, false, {
            dataType: 'json',
            headers: {
              'User-Agent': 'okhttp/3.12.0',
            }
          });
        
      };

      this.search = function (_object, kinopoisk_id) {
        var _this = this;
        object = _object;
        select_title = object.movie.title;
        doreg = rule;
        //console.log(kinopoisk_id)
        //console.log(select_title.replace(/第(.+)季/, '').trim());
        // var cors = Lampa.Utils.checkHttp('proxy.cub.watch/cdn/');
        // var cors_https = /https/.test(cors) ? cors : '';
        var url;
        kinopoisk_id === parseInt(kinopoisk_id, 10) ? url = 'https://api.kunyu77.com/api.php/provide/videoPlaylist?ids=' + kinopoisk_id + 'devid=453CA5D864457C7DB4D0EAA93DE96E66&package=com.sevenVideo.app.android&pcode=010110004&sysver=9&model=OPPO%20R9tm&sys=android&version=1.8.7&brand=OPPO&sj=' + sj : url = 'https://api.kunyu77.com/api.php/provide/searchVideo?searchName=' + encodeURIComponent(object.movie.title);
        
        //url = url.replace('#msearchword',encodeURIComponent(object.movie.title));
          if (kinopoisk_id === parseInt(kinopoisk_id, 10)) {
              getdetail(url);
          } else {
              network.silent(url, function (json) {
                  if (json) {
                      //console.log(json.data.length)
                      if (json.data.length !== 0) {
                          //parse(json);
                          if (json.data.length == 1) {
                              var id = json.data[0].id;
                              url = 'https://api.kunyu77.com/api.php/provide/videoPlaylist?ids=' + id + '&devid=453CA5D864457C7DB4D0EAA93DE96E66&package=com.sevenVideo.app.android&pcode=010110004&sysver=9&model=OPPO%20R9tm&sys=android&version=1.8.7&brand=OPPO&sj=' + sj;
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

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
          // if (window.cordova){
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
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
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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
        voice: 0,
        last_viewed: ''
      };
      var rslt = [];
      var cors = Lampa.Utils.checkHttp('proxy.cub.watch/cdn/');
      var cors_https = /https/.test(cors) ? cors : '';
      
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
        parseFloat(kinopoisk_id)? url = 'http://47.242.89.48/video/xiaoshu.php/detail?action=plus&code=8ff57a4df664974eca05970c7dadfc8e&vod_id=' + kinopoisk_id : url = 'http://47.242.89.48/video/xiaoshu.php/list?action=plus&code=8ff57a4df664974eca05970c7dadfc8e&wd=' + encodeURIComponent(object.movie.title);
        
        //url = url.replace('#msearchword',encodeURIComponent(object.movie.title));
          if (parseFloat(kinopoisk_id)) {
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
                if (json.code != 0) {
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

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
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
                    item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
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

          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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

    function resource_site(component, _object, searchurl, detailid) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        last_viewed: ''
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
        //doreg = rule;
        //console.log(kinopoisk_id)
        //console.log(select_title.replace(/第(.+)季/, '').trim());
        var url
        parseFloat(kinopoisk_id) ? url = detailid.replace('#id', kinopoisk_id) : url =  searchurl.replace('#msearchword', encodeURIComponent(object.movie.title));
        
        //url = url.replace('#msearchword',encodeURIComponent(object.movie.title));
          if (parseFloat(kinopoisk_id)) {
              network.silent(url, function (json) {
                  if (json) {
                      if (json.list.length == 0) {
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
                if (json.code != 0) {
                      //console.log(json.data.length)
                      if (json.list.length !== 0) {
                          //parse(json);
                          if (json.list.length == 1) {
                              var id = json.list[0].vod_id;
                              url = detailid.replace('#id', id);
                              network.silent(url, function (json) {
                                  if (json) {
                                      if (json.list.length == 0) {
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
                              json.list.forEach(function (l) {
                                  similars.push({
                                      is_similars: true,
                                      title: l.vod_name,
                                      link: '',
                                      filmId: l.vod_id,
                                      year: l.vod_play_from,
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

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
          var vodlist = json.list[0].vod_play_url.split('#');
          vodlist.forEach(function (episode) {
              
              //if (episode.playurl.indexOf('.m3u8' !== -1)) {
                  rslt.push({
                      file: episode.split('$')[1],
                      quality: json.list[0].vod_play_from.toUpperCase() + ' / ' +json.list[0].vod_remarks+ ' / ' +episode.split('$')[0],
                      title: episode.split('$')[0],
                      season: '',
                      episode: '',
                      info: '',
                      allepisode: json.list[0].vod_play_url
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
  
            if (element.file) {
                  var playlist = [];
                  var first = {
                      url: element.file,
                      timeline: view,
                      title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                      subtitles: element.subtitles
                  };
                  var vodlist = element.allepisode.split('#');
                  vodlist.forEach(function (elem) {
                    playlist.push({
                      title: elem.split('$')[0],
                      url: elem.split('$')[1],
                      tv: true
                    });
                  });
                  Lampa.Player.play(first);
                  Lampa.Player.playlist(playlist);
              
              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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

    function zyk1080html(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        last_viewed: ''
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
        //https://1080zyk3.com/index.php?m=vod-search-wd-#msearchword.html
        kinopoisk_id.indexOf('vod-detail-id') !== -1 ? url = 'https://1080zyk3.com' + kinopoisk_id : url = 'https://1080zyk3.com/index.php?m=vod-search-wd-#msearchword.html'.replace('#msearchword', encodeURIComponent(object.movie.title));

        //url = url.replace('#msearchword',encodeURIComponent(object.movie.title));
        if (kinopoisk_id.indexOf('vod-detail-id') !== -1) {
          network.silent(url, function (json) {
            if (json) {
              // if (json.data.length == 0) {
              //     component.emptyForQuery(select_title)
              // } else {
              parse(json);
              //}
            } else component.emptyForQuery(select_title);

            component.loading(false);
          }, function (a, c) {
            component.empty(network.errorDecode(a, c));
          }, false, {
            dataType: 'text'
          });

        } else {
          network.silent(url, function (json) {
            if (json.indexOf('&nbsp;0&nbsp;') == -1) {
              //console.log(json.data.length)
              rslt = [];
              var str = json.replace(/\n/g, '');
              var h = $('span.xing_vb4 > a', str);
              if (h.length == 1) {
                url = 'https://1080zyk3.com' + $(h).attr('href');
                network.silent(url, function (json) {
                  if (json) {
                    parse(json);
                  } else component.emptyForQuery(select_title);

                  component.loading(false);
                }, function (a, c) {
                  component.empty(network.errorDecode(a, c));
                }, false, {
                  dataType: 'text'
                });

              } else {
                _this.wait_similars = true;
                var similars = [];
                $(h).each(function (i, html) {
                  similars.push({
                    is_similars: true,
                    title: $(html).text(),
                    link: '',
                    filmId: $(html).attr('href'),
                    year: '',
                    episodes_count: ''
                  });
                });
                component.similars(similars);
              }

            } else component.emptyForQuery(select_title);

            component.loading(false);
          }, function (a, c) {
            component.empty(network.errorDecode(a, c));
          }, false, {
            dataType: 'text',
          });
        };     
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
        var h = $('div#play_1 > ul > li > a:nth-child(1)', str);
        $(h).each(function (i, html) {
          rslt.push({
            file: $(html).text().split('$')[1],
            quality: $(html).text().split('$')[0],
            //quality: $('p',html).text().replace(/文件夹/,'目录'),
            title: $(html).text().split('$')[0],
            season: '',
            episode: '',
            info: ''
          });
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
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
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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
        voice: 0,
        last_viewed: ''
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

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
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
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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
        voice: 0,
        last_viewed: ''
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

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
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
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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

    function yiso(component, _object, rule) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var select_title = '';
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        last_viewed: ''
      };
      var rslt    = [];
      
      /**
       * Поиск
       * @param {Object} _object 
       */
  
      this.search = function (_object, kinopoisk_id) {
        object = _object;
        select_title = object.movie.title;
        doreg = rule;
        var url1 = 'https://yiso.fun/api/search?name=#msearchword&pageNo=1&from=ali';
        url1 = url1.replace('#msearchword',encodeURIComponent(object.movie.title));

        network.clear();
        network.timeout(1000 * 15);
        network.silent(url1, function (json) {
          if (json.data.list.length > 0) {
            parse(json);
          } else component.emptyForQuery(select_title);
  
          component.loading(false);
        }, function (a, c) {
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'json',
        });
      };
  
      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
        json.data.list.forEach(function (a) {
          rslt.push({
            file: a.url,
            quality: '收录时间: '+a.gmtCreate,
            //quality: $('p',html).text().replace(/文件夹/,'目录'),
            title: a.name.replace(/(<([^>]+)>)/ig, ''),
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
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
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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
        voice: 0,
        last_viewed: ''
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

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
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
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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
        voice: 0,
        last_viewed: ''
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
            if ($('a[target="_blank"]', json).length > 4) {
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

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
              quality: $(html).html().replace(/(<([^>]+)>)/ig, '').match(/时间: (.+?)\s/) ? '收录' + $(html).html().replace(/(<([^>]+)>)/ig, '').match(/时间: (.+?)\s/)[0] : '',
              //quality: $('p',html).text().replace(/文件夹/,'目录'),
              title: select_title,
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
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
              network.native(element.file.replace('/s/','/cv/'), function (json) {
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
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
                  'Referer': element.file
                }
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
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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
        voice: 0,
        last_viewed: ''
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
        //Lampa.Utils.checkHttp('proxy.cub.watch/cdn/')+
        var url1 = 'https://cors.eu.org/https://tx.me/s/'+ tg_channel_name +'?q=#msearchword';
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

      this.extendChoice_ = function (saved) {
        Lampa.Arrays.extend({origin_order:false,order:0}, saved, true);
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
        items.forEach(function (element, item_id) {
          var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod_folder', element);
          var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));
  
          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }
  
          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          item.on('hover:enter', function () {
            object.movie.id = object.url;
            choice.last_viewed = item_id;
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
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            choice: choice,
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
  
      if (last_bls[object.movie.id|| object.movie.url]) {
        balanser = last_bls[object.movie.id|| object.movie.url];
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
        无名资源: new noname(this, object),
        找资源: new zhaoziyuan(this, object),
        小纸条: new xiaozhitiao(this, object),
        易搜: new yiso(this, object),
        猫狸盘搜: new alipansou(this, object),
        霸王龙压制组: new trex(this, object),
      };
  
      var sname = [];
      var _this5 = this;
      
      if (doregjson.rule !== 'undefined') {
        doregjson.rule.forEach(function (elem) {
          sources[elem.name] = new web(_this5, object, elem);
          sname.push(elem.name);
        });
      };

      var tg_sname = [];
      if (doregjson.tg_channel !== 'undefined') {
        doregjson.tg_channel.forEach(function (elem) {
          sources[elem.channel_name] = new tg_share_channel(_this5, object, elem.channel_uri);
          tg_sname.push(elem.channel_name);
        });
      };

      var resource_sname = [];
      if (doregjson.resource_site !== 'undefined') {
        doregjson.resource_site.forEach(function (elem) {
          sources[elem.site_name] = new resource_site(_this5, object, elem.site_search_url, elem.site_detail_url);
          resource_sname.push(elem.site_name);
        });
      };

      var last;
      var last_filter;
      var extended;
      var selected_id;
      var filter_translate = {
        season: Lampa.Lang.translate('torrent_serial_season'),
        voice: Lampa.Lang.translate('torrent_parser_voice'),
        source: Lampa.Lang.translate('settings_rest_source')
      };
      //, 'videocdn', 'rezka', 'kinobase', 'collaps', 'cdnmovies', 'filmix', 'hdvb', 'videoapi'
      var filter_sources = ['找资源', '小纸条', '猫狸盘搜', '易搜', '霸王龙压制组', '无名资源']; // шаловливые ручки
      filter_sources = resource_sname.concat(filter_sources);
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
            last_bls[object.movie.id || object.movie.url] = balanser;
  
            if (Lampa.Storage.field('online_mod_save_last_balanser') !== false) {
              Lampa.Storage.set('online_mod_last_balanser', last_bls);
            }
  
            _this.search();
  
            setTimeout(Lampa.Select.close, 10);
          }
        };
  
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
        _this2.extendChoice_();
        sources[balanser].search(object, encodeURIComponent(_this2.cleanTitle(query)), '');
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
  
      this.extendChoice_ = function () {
        var data = Lampa.Storage.cache('online_mod_choice_' + balanser, 500, {});
        var save = data[selected_id || object.movie.id || object.movie.url] || {};
        extended = true;
        sources[balanser].extendChoice(save);

        var data_ = Lampa.Storage.cache('online_mod_first_order_'+ balanser, 500, {});
        var save_ = data_[selected_id || object.movie.id || object.movie.url] || {};
        sources[balanser].extendChoice_(save_);
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
              select.push(((i == 'order') ? '排序' : filter_translate[i]) + ': ' + filter_items[i][need[i]]);
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
        var _this = this;
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
                  params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
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
        }).on('hover:enter', function(){
          _this.saveChoice(params.choice);
          // Lampa.PlayerPlaylist.listener.follow('select', function(e){
          //   next(e, params.choice);
          // });
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
          
          var data = Lampa.Storage.get('online_mod_choice_' + balanser);
          var data_filter = Lampa.Storage.get('online_mod_filter');

          var data_ = Lampa.Storage.cache('online_mod_first_order_'+ balanser, 500, {});
          var choice_ = {};

          if (data_filter.order === 1 && data_filter.last_viewed === '') {
            choice_ = { origin_order: true, order: 1 }
            data_[selected_id || object.movie.id || object.movie.url] = choice_;
            Lampa.Storage.set('online_mod_first_order_' + balanser, data_);
          } else {
            if (data_filter.order === 0 && data_filter.last_viewed === '') {
              choice_ = { origin_order: false, order: 0 }
              data_[selected_id || object.movie.id || object.movie.url] = choice_;
              Lampa.Storage.set('online_mod_first_order_' + balanser, data_);
            };
          };

          var data_order = Lampa.Storage.cache('online_mod_first_order_'+ balanser, 500, {});
          var order_json = data_order[selected_id || object.movie.id || object.movie.url];
          //console.log(data_filter.order,order_json,data_filter.last_viewed)
          
    	    var cont = data[selected_id || object.movie.id || object.movie.url];
          var neworder = cont && cont.last_viewed || 0 ;
          var new_order ;

          if (order_json) {
            if (typeof cont !== "undefined") {
              //console.log(Lampa.Storage.get('online_mod_first_order_'),cont.order,cont.last_viewed,first_order)
              if (order_json.order === cont.order) {
                cont.last_viewed === '' ? new_order = 0 : new_order = neworder;
              } else {
                cont.last_viewed === '' ? new_order = 0 : new_order = - Math.abs(neworder + 1);
              }
            };
          } else {
            new_order = 0
          };

          //console.log(new_order,cont)
          
          var last_views = scroll.render().find('.selector.online').eq(new_order);
          //console.log(last_views)
          if (last_views.length) last = last_views.eq(0)[0];
          else last = scroll.render().find('.selector').eq(3)[0];
  			  
          // if (typeof cont !== "undefined" && cont.order === 0 && cont.last_viewed >=0 ) {
          //   Lampa.Storage.set('online_mod_choice_first_order',false);
          // };
          
          //var last_views = scroll.render().find('.selector.online').find('.torrent-item__viewed').parent().last();
          //if (object.movie.number_of_seasons && last_views.length) last = last_views.eq(0)[0];else last = scroll.render().find('.selector').eq(3)[0];
          //if (last_views.length) last = last_views.eq(0)[0];else last = scroll.render().find('.selector').eq(3)[0];
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
        sources.无名资源.destroy();
        sources.找资源.destroy();
        sources.小纸条.destroy();
        sources.易搜.destroy();
        sources.霸王龙压制组.destroy();
        sources.猫狸盘搜.destroy();
        doregjson.resource_site.forEach(function (elem) {
          sources[elem.site_name].destroy();
        });
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
  
    Lampa.Component.add('online_mod', component); 
  
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
    }); 
     Lampa.Params.trigger('online_mod_save_last_balanser', true);
    // <div class=\"settings-param selector\" data-name=\"online_mod_proxy_other\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_other}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_videocdn\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} videocdn</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_rezka\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} rezka</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kinobase\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} kinobase</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_collaps\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} collaps</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_cdnmovies\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} cdnmovies</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_hdvb\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} hdvb</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_videoapi\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} videoapi</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kp\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_kp}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_skip_kp_search\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_skip_kp_search}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n
    Lampa.Template.add('settings_online_mod', "<div>\n        <div class=\"settings-param selector\" data-name=\"online_mod_save_last_balanser\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_save_last_balanser}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_clear_last_balanser\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_clear_last_balanser}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n</div>");
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
