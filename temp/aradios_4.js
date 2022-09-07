(function() {
	'use strict';

	function radio_n(object) {
		var audio = new Audio();
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
		var catalogs = [{
			title: '新加坡电台',
			url: 'http://proxy.cub.watch/cdn/https://rentry.co/sgradio/raw'
		},{
			title: '音乐台',
			url: 'http://proxy.cub.watch/cdn/https://rentry.co/yytradio/raw'
		},{
			title: '交通台',
			url: 'http://proxy.cub.watch/cdn/https://rentry.co/jttradio/raw'
		},{
			title: '资讯台',
			url: 'http://proxy.cub.watch/cdn/https://rentry.co/zxtradio/raw'
		},{
			title: '经济台',
			url: 'http://proxy.cub.watch/cdn/https://rentry.co/jjtradio/raw'
		},{
			title: '文艺台',
			url: 'http://proxy.cub.watch/cdn/https://rentry.co/wytradio/raw'
		},{
			title: '都市台',
			url: 'http://proxy.cub.watch/cdn/https://rentry.co/dstradio/raw'
		},{
			title: '体育台',
			url: 'http://proxy.cub.watch/cdn/https://rentry.co/tytradio/raw'
		},  {
			title: 'rock',
			url: 'http://llpp.xyz/r/rock/'
		}, {
			title: 'dance',
			url: 'http://llpp.xyz/r/dance/'
		}, {
			title: 'rap',
			url: 'http://llpp.xyz/r/rap/'
		}, {
			title: 'fon',
			url: 'http://llpp.xyz/r/fon/'
		}, {
			title: 'jazz',
			url: 'http://llpp.xyz/r/jazz/'
		}];
		this.create = function() {
			var _this = this;
			this.activity.loader(true);
			network.silent(object.url, this.build.bind(this), function() {
				var empty = new Lampa.Empty();
				html.append(empty.render());
				_this.start = empty.start;
				_this.activity.loader(false);
				_this.activity.toggle();
			});
			return this.render();
		};
		this.append = function(data) {
			var _this3 = this;
			var name = null;
			var playlist = [];
			data.forEach(function(element) {
				var url_song = element.video;
				var name_song = element.name;
				if (name == null) name = name_song, audio.src = url_song;
				var card = Lampa.Template.get('card', {
					title: name_song,
					release_year: ''
				});
				playlist.push({
					title: name_song,
					url: url_song
				});
				var img = card.find('.card__img')[0];
                img.onload = function () {
                    card.addClass('card--loaded');
                };
                img.onerror = function (e) {
                    img.src = './img/img_broken.svg';
                };
                
				card.addClass('card--category');
				card.find('.card__img').css({
					'cursor': 'pointer',
					'background-color': '#ffffff'
				}).attr('src', element.picture);

                card.find('.card__view').css({
                	'padding-bottom': '110%',
				}).width('auto');

				card.on('hover:focus mouseover', function() {
					last = card[0];
					scroll.update(card, true);
					info.find('.info__title').text(name_song);
					//info.find('.info__title-original').text(element.time + (element.quality ? ' / ' + element.quality : ''));
				});
				card.hover(function() {
					if ($(this).hasClass('focus')) $(this).removeClass('focus');
					else $(this).addClass('focus');
				}, function() {
					$(this).removeClass('focus');
				});
				card.on('hover:enter click', function() {
					$(this).addClass('focus');
					$('.info__title-original').text('正在播放：'+name_song);
					card.find('.card--category').addClass('focus');
					if (url_song.indexOf('.m3u8') !== -1) {
						var video = {
							title: name_song,
							url: url_song
						};
						Lampa.Player.play(video);
						Lampa.Player.playlist(playlist);
					}
					else {
						if (audio.paused || audio.src !== '' && audio.src !== url_song) {
							audio.src = url_song;
							_this3.playing('play');
						}
						else _this3.playing('pause');
					}
				});
				body.append(card);
				items.push(card);
			});
			if (info.find('.info__title-original').text() == '') info.find('.info__title-original').text(name);
		};
		this.playing = function(ifs) {
			if (ifs == 'play') {
				audio.play();
				info.find('.info__title-original').removeClass('blink2');
				info.find('#plbut').removeClass('play').addClass('pause');
			}
			else {
				audio.pause();
				info.find('.info__title-original').addClass('blink2');
				info.find('#plbut').removeClass('pause').addClass('play');
			};
		};
		this.build = function(data) {
			var _this2 = this;
			//Lampa.Background.change('http://llpp.xyz/r/back.jpg');
			var but_style = '<style>.blink2{-webkit-animation:blink2 1.5s linear infinite;animation:blink2 1.5s linear infinite}@-webkit-keyframes blink2{100%{color:rgba(34,34,34,0)}}@keyframes blink2{100%{color:rgba(34,34,34,0)}}.controll,.controll *{box-sizing:content-box;letter-spacing:0}.controll{transition: .5s linear;border:none;background-color:#353535;border-radius:50%;margin-top:40px;padding:15px;width:50;height:50;font-size:0;white-space:nowrap;text-align:center;cursor:pointer}.controll.pause{background-color: #353535;    border: none;    color: #000;}.controll,.controll .but_left,.controll .but_right,.controll:before{display:inline-block;vertical-align:middle;transition:border .2s,width .2s,height .2s,margin .2s, transition: 10s linear; }.controll.pause .but_left,.controll.pause .but_right{margin-left:-1px;margin-top:3px;border-left:20px solid #fff;border-top:0 solid transparent;border-bottom:0 solid transparent;height:45px;}.controll.pause .but_left{border-right:10px solid transparent}.controll.play .but_left{margin-left:7.666667px;margin-top:-3px;border-left:48.496px solid #b0b0b0;border-top:28px solid transparent;border-bottom:28px solid transparent;border-right:0 solid transparent;}.controll.play .but_right{margin-left:-48px;margin-top:-3px;border-left:48.496px solid #b0b0b0;border-top:28px solid transparent;border-bottom:28px solid transparent}.controll:hover, .controll.focus {background-color: #fff;    border: none;    color: #000;}.controll.play.focus{background-color: #fff;    border: none;    color: #000;} .controll.play {border-color:#cecece} .controll.focus .but_left,.controll.focus .but_right, .controll:hover .but_left,.controll:hover .but_right {border-left-color:#cecece}</style>';
			but_style += '<style>.Radio_n .card__view {padding-bottom: 65%!important;}.stbut,.stbut *{box-sizing:content-box;letter-spacing:0}.stbut{transition: .5s linear; border: 0px solid #632B2B; background-color: #3e3e3e; border-radius: 5px; margin-top: 56px; margin-right: 20px; padding: 10px 20px 10px 20px; width: 140px;   height: 30px;   font-size: 30px;   color: #fff;   white-space: nowrap;  cursor: pointer;}.stbut:hover, .stbut.focus{background-color: #fff;color: #1e1e1e;}</style>';
			Lampa.Template.add('info_radio', '<div class="radio_r info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">   <div id="stantion_filtr"><div id="stbut" class="stbut full-start__button selector"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg><span>电台分类</span></div></div>    <div id="player_radio"><div id="plbut" class="controll selector play"><span class="but_left"></span><span class="but_right"></span></div>' + but_style + '</div></div></div>');
			info = Lampa.Template.get('info_radio');
			info.find('#plbut').on('hover:enter click', function() {
				audio.paused ? _this2.playing('play') : _this2.playing('pause');
			});
			info.find('#stbut').on('hover:enter click', function() {
			  _this2.selectGroup();
			});
			scroll.render().addClass('layer--wheight').data('mheight', info);
			html.append(info.append());
			html.append(scroll.render());
			this.append(data);
			scroll.append(body);
			this.activity.loader(false);
			this.activity.toggle();
		};
		this.selectGroup = function () {
		  	Lampa.Select.show({
					title: '分类',
					items: catalogs,
					onSelect: function onSelect(a) {
						Lampa.Activity.push({
							url: a.url,
							title: a.title,
							component: 'radio_n_',
							page: 1
						})
					},
					onBack: function onBack() {
						Lampa.Controller.toggle('content');
					}
				});
		};
		this.start = function() {
			var _this = this;
			Lampa.Controller.add('content', {
				toggle: function toggle() {
					Lampa.Controller.collectionSet(scroll.render());
					Lampa.Controller.collectionFocus(last || false, scroll.render());
				},
				left: function left() {
					if (Navigator.canmove('left')) {
						Navigator.move('left');
					}
					else Lampa.Controller.toggle('menu');
				},
				right: function right() {
					//Navigator.move('right');
					if (Navigator.canmove('right')) Navigator.move('right');
					else _this.selectGroup();
				},
				up: function up() {
					if (Navigator.canmove('up')) {
						Navigator.move('up');
					}
					else {
						if (!$('#stbut').hasClass('focus') && !$('#plbut').hasClass('focus')) {
							if (!$('#stbut').hasClass('focus')) {
								Lampa.Controller.collectionSet(info);
								Navigator.move('right')
							}
						}
						else Lampa.Controller.toggle('head');
					}
				},
				down: function down() {
					if (Navigator.canmove('down')) Navigator.move('down');
					else Lampa.Controller.toggle('content');
				},
				back: function back() {
					Lampa.Activity.backward();
				}
			});
			Lampa.Controller.toggle('content');
		};
		this.pause = function() {
			audio.pause();
		};
		this.stop = function() {};
		this.render = function() {
			return html;
		};
		this.destroy = function() {
			network.clear();
			scroll.destroy();
			if (info) info.remove();
			html.remove();
			body.remove();
			audio = null;
			network = null;
			items = null;
			html = null;
			body = null;
			info = null;
		};
	}

	function startRadio_n() {
		window.plugin_Radio_N_ready_ = true;
		Lampa.Component.add('radio_n_', radio_n);
		Lampa.Listener.follow('app', function(r) {
			if (r.type == 'ready') {
				var ico = '<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="radioIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <title id="radioIconTitle">Radio</title> <path d="M5.44972845 6C2.18342385 9.2663046 2.18342385 14.7336954 5.44972845 18M8.59918369 8C6.46693877 10.1322449 6.46693877 13.8677551 8.59918369 16M18.5502716 18C21.8165761 14.7336954 21.8165761 9.2663046 18.5502716 6M15.4008163 16C17.5330612 13.8677551 17.5330612 10.1322449 15.4008163 8"/> <circle cx="12" cy="12" r="1"/> </svg>';
				var menu_items = $('<li class="menu__item selector focus" data-action="radio_r"><div class="menu__ico">' + ico + '</div><div class="menu__text">电台</div></li>');
				menu_items.on('hover:enter', function() {
					Lampa.Activity.push({
						url: 'http://proxy.cub.watch/cdn/https://rentry.co/sgradio/raw',
						title: '新加坡电台',
						component: 'radio_n_',
						page: 1
					});
				});
				$('.menu .menu__list').eq(0).append(menu_items);
			}
		});
	}
	if (!window.plugin_Radio_N_ready_) startRadio_n();
})();
