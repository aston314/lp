(function () {
    'use strict';
Lampa.Platform.tv();
Lampa.SettingsApi.addComponent({
			component: 'add_online_plugin',
			name: '在线插件',
			icon: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M448.801,271H497c8.284,0,15-6.716,15-15V111.4c0-8.284-6.716-15-15-15H367.4V63.2c0-34.849-28.352-63.2-63.2-63.2 S241,28.352,241,63.2v33.2H111.4c-8.284,0-15,6.716-15,15V241H63.2C28.352,241,0,269.352,0,304.2s28.352,63.2,63.2,63.2h33.2V497 c0,8.284,6.716,15,15,15H256c8.284,0,15-6.716,15-15v-48.2c0-18.307,14.894-33.2,33.2-33.2c18.306,0,33.2,14.894,33.2,33.2V497 c0,8.284,6.716,15,15,15H497c8.284,0,15-6.716,15-15V352.4c0-8.284-6.716-15-15-15h-48.199c-18.308,0-33.201-14.894-33.201-33.2 C415.6,285.894,430.493,271,448.801,271z M448.801,367.4H482V482H367.4v-33.2c0-34.849-28.352-63.2-63.2-63.2 S241,413.951,241,448.8V482H126.4V352.4c0-8.284-6.716-15-15-15H63.2c-18.307,0-33.2-14.894-33.2-33.2 c0-18.306,14.894-33.2,33.2-33.2h48.2c8.284,0,15-6.716,15-15V126.4H256c8.284,0,15-6.716,15-15V63.2 c0-18.307,14.894-33.2,33.2-33.2c18.306,0,33.2,14.894,33.2,33.2v48.2c0,8.284,6.716,15,15,15H482V241h-33.199 c-34.85,0-63.201,28.352-63.201,63.2S413.951,367.4,448.801,367.4z" fill="#000000" style="fill: rgb(255, 255, 255);"></path></g></g></svg>'
		});
        Lampa.SettingsApi.addParam({
			component: 'add_online_plugin',
			param: {
				name: 'Website',
                type: 'select',
                values: {
                   1:        '安装',
                },
                default: '1',
            },
			field: {
				name: '网站',
				description: '点击安装插件'
			},
			onChange: function(value) {
              if (value == '1') {
                var script = document.createElement ('script');
                script.src = 'https://l.aston.rocks/plugins/web.js';
                document.getElementsByTagName ('head')[0].appendChild (script);
                Lampa.Settings.update();
                Lampa.Noty.show("网站 插件安装成功");
              }
             },
             onRender: function (item) {
               setTimeout(function() {
                 if($('div[data-name="Website"]').length > 1) item.hide();
                   $('.settings-param__name', item).css('color','f3d900');
               }, 0);
             },
        });
        Lampa.SettingsApi.addParam({
                        component: 'add_online_plugin',
                        param: {
                                name: 'Online_Mod',
                  type: 'select',
                  values: {
                     1:        '安装',
                  },
                  default: '1',
              },
                          field: {
                                 name: 'Online_Mod',
                                 description: '点击安装插件'
                          },
                          onChange: function(value) {
                  if (value == '1') {
                    var script = document.createElement ('script');
                    script.src = 'http://lampa32.ru/onplugins/onlinemod.js';
                    document.getElementsByTagName ('head')[0].appendChild (script);
                    Lampa.Settings.update();
                    Lampa.Noty.show("插件 Online Mod 安装成功");
                  }
               },
               onRender: function (item) {
                 setTimeout(function() {
                   if($('div[data-name="Online_Mod"]').length > 1) item.hide();
                     $('.settings-param__name', item).css('color','f3d900');
                 }, 0);
               },
        });
        Lampa.SettingsApi.addParam({
                        component: 'add_online_plugin',
                        param: {
                                name: '在线_Prestige',
                  type: 'select',
                  values: {
                     1:        '安装',
                  },
                  default: '1',
              },
                          field: {
                                 name: '在线 Prestige',
                                 description: '点击安装插件'
                          },
                          onChange: function(value) {
                  if (value == '1') {
                    var script = document.createElement ('script');
                    script.src = 'http://lampa32.ru/onplugins/prestige.js';
                    document.getElementsByTagName ('head')[0].appendChild (script);
                    Lampa.Settings.update();
                    Lampa.Noty.show("插件 在线 Prestige 安装成功");
                  }
               },
               onRender: function (item) {
                 setTimeout(function() {
                   if($('div[data-name="在线 Prestige"]').length > 1) item.hide();
                     $('.settings-param__name', item).css('color','f3d900');
                 }, 0);
               },
        });
        Lampa.SettingsApi.addParam({
                        component: 'add_online_plugin',
                        param: {
                                name: '在线',
                   type: 'select',
                   values: {
                      1:        '安装',
                   },
                   default: '1',
               },
                           field: {
                                  name: '在线',
                                  description: '点击安装插件'
                           },
                           onChange: function(value) {
                   if (value == '1') {
                     var script = document.createElement ('script');
                     script.src = 'http://lampa32.ru/onplugins/online.js';
                     document.getElementsByTagName ('head')[0].appendChild (script);
                     Lampa.Settings.update();
                     Lampa.Noty.show("插件 在线 安装成功");
                   }
                },
                onRender: function (item) {
                  setTimeout(function() {
                    if($('div[data-name="在线"]').length > 1) item.hide();
                      $('.settings-param__name', item).css('color','f3d900');
                  }, 0);
                },
         });
         Lampa.SettingsApi.addParam({
                         component: 'add_online_plugin',
                         param: {
                                 name: '在线_Stream',
                    type: 'select',
                    values: {
                       1:        '安装',
                    },
                    default: '1',
                },
                            field: {
                                   name: '在线 Stream',
                                   description: '点击安装插件'
                            },
                            onChange: function(value) {
                    if (value == '1') {
                      var script = document.createElement ('script');
                      script.src = 'http://lampa32.ru/onplugins/onlinestream.js';
                      document.getElementsByTagName ('head')[0].appendChild (script);
                      Lampa.Settings.update();
                      Lampa.Noty.show("插件 在线 Stream 安装成功");
                    }
                 },
                 onRender: function (item) {
                   setTimeout(function() {
                     if($('div[data-name="在线 Stream"]').length > 1) item.hide();
                       $('.settings-param__name', item).css('color','f3d900');
                   }, 0);
                 },
         });
         Lampa.SettingsApi.addParam({
                         component: 'add_online_plugin',
                         param: {
                                 name: 'Stream',
                     type: 'select',
                     values: {
                        1:        '安装',
                     },
                     default: '1',
                 },
                             field: {
                                    name: 'Stream',
                                    description: '点击安装插件'
                             },
                             onChange: function(value) {
                     if (value == '1') {
                       var script = document.createElement ('script');
                       script.src = 'http://lampa32.ru/onplugins/stream.js';
                       document.getElementsByTagName ('head')[0].appendChild (script);
                       Lampa.Settings.update();
                       Lampa.Noty.show("插件 Stream 安装成功");
                     }
                  },
                  onRender: function (item) {
                    setTimeout(function() {
                      if($('div[data-name="Stream"]').length > 1) item.hide();
                        $('.settings-param__name', item).css('color','f3d900');
                    }, 0);
                  },
         });
         Lampa.SettingsApi.addParam({
                         component: 'add_online_plugin',
                         param: {
                                 name: 'Ebuland',
                       type: 'select',
                       values: {
                          1:        '安装',
                       },
                       default: '1',
                   },
                               field: {
                                      name: 'Ebu.land (仅付费访问)',
                                      description: '点击安装插件'
                               },
                               onChange: function(value) {
                        if (value == '1') {
                          var script = document.createElement ('script');
                          script.src = 'http://lampa32.ru/onplugins/ebuland.js';
                          document.getElementsByTagName ('head')[0].appendChild (script);
                          Lampa.Settings.update();
                          Lampa.Noty.show("插件 Ebu.land 安装成功");
                        }
                     },
                     onRender: function (item) {
                       setTimeout(function() {
                         if($('div[data-name="Ebu.land"]').length > 1) item.hide();
                           $('.settings-param__name', item).css('color','f3d900');
                       }, 0);
                     },
         });
})();