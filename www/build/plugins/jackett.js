(function() {
	'use strict';
Lampa.Platform.tv();
Lampa.Storage.set('parser_use', true)

Lampa.SettingsApi.addParam({
    component: 'parser',
    param: {
     name: 'jackett_url2',
     type: 'select',
     values: {
        no_parser:        '未选择',
        jac_lampa32_ru:   'jac.lampa32.ru',
        j_yourok_ru:      'j.yourok.ru',
        jacc_drstein_xyz: 'jacc.drstein.xyz',
        jac_my_to:        'jac.my.to',
        spawn_pp_ua:      'spawn.pp.ua',
        jacred_cf:        'jacred.cf',
        unknown:          'unknown',
     },
     default: 'no_parser'
    },
    field: {
     name: 'Jackett服务器',
     description: '点击选择一个种子解析器'
    },
    onChange: function (value) {
     if (value == 'no_parser') Lampa.Storage.set('jackett_url', '')&Lampa.Storage.set('jackett_key', '')&Lampa.Storage.set('jackett_interview','all')&Lampa.Storage.set('parse_in_search', false)&Lampa.Storage.set('parse_lang', 'lg');
     if (value == 'jac_lampa32_ru') Lampa.Storage.set('jackett_url', 'jac.lampa32.ru')&Lampa.Storage.set('jackett_key', '')&Lampa.Storage.set('jackett_interview','all')&Lampa.Storage.set('parse_in_search', false)&Lampa.Storage.set('parse_lang', 'lg');
     if (value == 'j_yourok_ru') Lampa.Storage.set('jackett_url', 'j.yourok.ru')&Lampa.Storage.set('jackett_key', '1')&Lampa.Storage.set('jackett_interview', 'healthy')&Lampa.Storage.set('parse_in_search', false)&Lampa.Storage.set('parse_lang', 'df_lg');
     if (value == 'jacc_drstein_xyz') Lampa.Storage.set('jackett_url', 'jacc.drstein.xyz')&Lampa.Storage.set('jackett_key', '')&Lampa.Storage.set('jackett_interview', 'all')&Lampa.Storage.set('parse_in_search', false)&Lampa.Storage.set('parse_lang', 'df_lg');
     if (value == 'jac_my_to') Lampa.Storage.set('jackett_url', 'jac.my.to')&Lampa.Storage.set('jackett_key', '')&Lampa.Storage.set('jackett_interview', 'all')&Lampa.Storage.set('parse_in_search', false)&Lampa.Storage.set('parse_lang', 'df');
     if (value == 'spawn_pp_ua') Lampa.Storage.set('jackett_url', 'spawn.pp.ua:59117')&Lampa.Storage.set('jackett_key', '2')&Lampa.Storage.set('jackett_interview', 'healthy')&Lampa.Storage.set('parse_in_search', false)&Lampa.Storage.set('parse_lang', 'df');
     if (value == 'jacred_cf') Lampa.Storage.set('jackett_url', 'jacred.cf')&Lampa.Storage.set('jackett_key', '')&Lampa.Storage.set('jackett_interview','all')&Lampa.Storage.set('parse_in_search', false)&Lampa.Storage.set('parse_lang', 'lg');
     if (value == 'unknown') Lampa.Storage.set('jackett_url', 'http://188.119.113.252:9117')&Lampa.Storage.set('jackett_key', '1')&Lampa.Storage.set('jackett_interview', 'healthy')&Lampa.Storage.set('parse_in_search', false)&Lampa.Storage.set('parse_lang', 'df');
     Lampa.Settings.update();
    },
     onRender: function (item) {
       setTimeout(function() {
        $('div[data-children="parser"]').on('hover:enter', function(){
        Lampa.Settings.update();
        });
        if(Lampa.Storage.field('parser_use')) item.show()&$('.settings-param__name', item).css('color','f3d900')&$('div[data-name="jackett_url2"]').insertAfter('div[data-children="parser"]');
        else item.hide();
          }, 0);
        }
   });

 })();
