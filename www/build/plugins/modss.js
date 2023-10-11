Date.now||(Date.now=function(){return(new Date.getTime())}),function(){"use strict";for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e){var i=t[e];window.requestAnimationFrame=window[i+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i+"CancelAnimationFrame"]||window[i+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var s=0;window.requestAnimationFrame=function(t){var e=Date.now(),i=Math.max(s+16,e);return setTimeout(function(){t(s=i)},i-e)},window.cancelAnimationFrame=clearTimeout}}(),function(t){t.snowfall=function(e,i){function s(s,n,a,r){this.x=s,this.y=n,this.size=a,this.speed=r,this.step=0,this.stepSize=h(1,10)/100,i.collection&&(this.target=m[h(0,m.length-1)]);var p=null;i.image?(p=document.createElement("img"),p.src=i.image):(p=document.createElement("div"),t(p).css({background:i.flakeColor})),t(p).attr({"class":"snowfall-flakes"}).css({width:this.size,height:this.size,position:i.flakePosition,top:this.y,left:this.x,fontSize:0,zIndex:i.flakeIndex}),t(e).get(0).tagName===t(document).get(0).tagName?(t("body").append(t(p)),e=t("body")):t(e).append(t(p)),this.element=p,this.update=function(){if(this.y+=this.speed,this.y>l-(this.size+6)&&this.reset(),this.element.style.top=this.y+"px",this.element.style.left=this.x+"px",this.step+=this.stepSize,y===!1?this.x+=Math.cos(this.step):this.x+=y+Math.cos(this.step),i.collection&&this.x>this.target.x&&this.x<this.target.width+this.target.x&&this.y>this.target.y&&this.y<this.target.height+this.target.y){var t=this.target.element.getContext("2d"),e=this.x-this.target.x,s=this.y-this.target.y,n=this.target.colData;if(void 0!==n[parseInt(e)][parseInt(s+this.speed+this.size)]||s+this.speed+this.size>this.target.height)if(s+this.speed+this.size>this.target.height){for(;s+this.speed+this.size>this.target.height&&this.speed>0;)this.speed*=.5;t.fillStyle=o.flakeColor,void 0==n[parseInt(e)][parseInt(s+this.speed+this.size)]?(n[parseInt(e)][parseInt(s+this.speed+this.size)]=1,t.fillRect(e,s+this.speed+this.size,this.size,this.size)):(n[parseInt(e)][parseInt(s+this.speed)]=1,t.fillRect(e,s+this.speed,this.size,this.size)),this.reset()}else this.speed=1,this.stepSize=0,parseInt(e)+1<this.target.width&&void 0==n[parseInt(e)+1][parseInt(s)+1]?this.x++:parseInt(e)-1>0&&void 0==n[parseInt(e)-1][parseInt(s)+1]?this.x--:(t.fillStyle=o.flakeColor,t.fillRect(e,s,this.size,this.size),n[parseInt(e)][parseInt(s)]=1,this.reset())}(this.x+this.size>d-c||this.x<c)&&this.reset()},this.reset=function(){this.y=0,this.x=h(c,d-c),this.stepSize=h(1,10)/100,this.size=h(100*i.minSize,100*i.maxSize)/100,this.element.style.width=this.size+"px",this.element.style.height=this.size+"px",this.speed=h(i.minSpeed,i.maxSpeed)}}function n(){for(r=0;r<a.length;r+=1)a[r].update();p=requestAnimationFrame(function(){n()})}var a=[],o={flakeCount:35,flakeColor:"#ffffff",flakePosition:"absolute",flakeIndex:999999,minSize:1,maxSize:2,minSpeed:1,maxSpeed:5,round:!1,shadow:!1,collection:!1,collectionHeight:40,deviceorientation:!1},i=t.extend(o,i),h=function(t,e){return Math.round(t+Math.random()*(e-t))};t(e).data("snowfall",this);var r=0,l=t(e).height(),d=t(e).width(),c=0,p=0;if(i.collection!==!1){var f=document.createElement("canvas");if(f.getContext&&f.getContext("2d"))for(var m=[],w=t(i.collection),g=i.collectionHeight,r=0;r<w.length;r++){var u=w[r].getBoundingClientRect(),x=t("<canvas/>",{"class":"snowfall-canvas"}),z=[];if(u.top-g>0){t("body").append(x),x.css({position:i.flakePosition,left:u.left+"px",top:u.top-g+"px"}).prop({width:u.width,height:g});for(var v=0;v<u.width;v++)z[v]=[];m.push({element:x.get(0),x:u.left,y:u.top-g,width:u.width,height:g,colData:z})}}else i.collection=!1}for(t(e).get(0).tagName===t(document).get(0).tagName&&(c=25),t(window).bind("resize",function(){l=t(e)[0].clientHeight,d=t(e)[0].offsetWidth}),r=0;r<i.flakeCount;r+=1)a.push(new s(h(c,d-c),h(0,l),h(100*i.minSize,100*i.maxSize)/100,h(i.minSpeed,i.maxSpeed)));i.round&&t(".snowfall-flakes").css({"-moz-border-radius":i.maxSize,"-webkit-border-radius":i.maxSize,"border-radius":i.maxSize}),i.shadow&&t(".snowfall-flakes").css({"-moz-box-shadow":"1px 1px 1px #555","-webkit-box-shadow":"1px 1px 1px #555","box-shadow":"1px 1px 1px #555"});var y=!1;i.deviceorientation&&t(window).bind("deviceorientation",function(t){y=.1*t.originalEvent.gamma}),n(),this.clear=function(){t(".snowfall-canvas").remove(),t(e).children(".snowfall-flakes").remove(),cancelAnimationFrame(p)}},t.fn.snowfall=function(e){return"object"==typeof e||void 0==e?this.each(function(i){new t.snowfall(this,e)}):"string"==typeof e?this.each(function(e){var i=t(this).data("snowfall");i&&i.clear()}):void 0}}(jQuery);

(function () {
	'use strict';

	var version_modss = '3.0', API = 'http://api.lampa.stream/', type = '', jackets = {}, cards, ping_auth, manifest, menu_list = [], vip = false, user_id = '', uid = 'bb04b81f6297b1b6280ea8273e515d81', IP, logged = false, doregjson = {}, inner_extract_rule = {}, extract_rule = {};
	
	var Modss = {
		init: function () {

			// this.collections();
			this.getconfig();
			// this.sources();
			this.buttBack();
			this.getcustomfunction();
			// ForkTV.init();
			// this.radio();
			// this.snow();
			// Lampa.Settings.main().render().find('[data-component="plugins"]').unbind('hover:enter').on('hover:enter', function () {
			// 	Lampa.Extensions.show();
			// 	setTimeout(function () {
			// 		$('.extensions__item-author', Lampa.Extensions.render()).map(function (i, e) {
			// 			if (e.textContent == '@modss_group') $(e).html('💎').append('<span class="extensions__item-premium">VIP buy at @modssmy_bot</span>');
			// 		});
			// 	}, 200);
			// });
			if (Lampa.Storage.field('mods_tv_butt_ch')) Lampa.Keypad.listener.follow('keydown', function (e) {
				var next = (e.code == 427 || e.code == 33 || e.code == 39);
				var prev = (e.code == 428 || e.code == 34 || e.code == 37);
				var none = !$('.panel--visible .focus').length && Lampa.Controller.enabled().name !== 'select';
				if (Lampa.Activity.active() && Lampa.Activity.active().component == 'modss_tv' && Lampa.Player.opened()) {
					//Lampa.Noty.show('code_ '+e.code);
					if (prev && none) {
						//Lampa.Noty.show('code_prev');
						Lampa.PlayerPlaylist.prev();
					}
					if (next && none) {
						//Lampa.Noty.show('code_ next');
						Lampa.PlayerPlaylist.next();
					}
				}
			});
			if (!window.FX) {
				window.FX = {
					max_qualitie: 480,
					is_max_qualitie: false,
					auth: false
				};
			}
			if (!IP) {
				$.ajax({
					url: 'http://ip-api.com/json?fields=query',
					type: 'get',
					dataType: 'json'
				}).done(function (data) {
					IP = data.query;
				});
			}
			// var ads_4k = ['<div style="padding: 1.5em 2em; padding-top: 0;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="line-height: 1.4;">Надоело смотреть в плохом качестве?<br>Хочешь смотреть в FHD и 4K? Переходи в телеграм бот <span style="color: #24b4f9">@modssmy_bot</span> для подключения VIP</div>', '</div>', '</div>'].join('');
			// Lampa.Controller.listener.follow('toggle', function (e) {
			// 	if (e.name == 'select' && !vip) {
			// 		setTimeout(function () {
			// 			if ($('.selectbox .scroll__body div:eq(0)').html().indexOf('.land') >= 0)
			// 				$('.selectbox .scroll__body div:eq(0)').remove();
			// 			if ($('.selectbox .selectbox-item__icon svg').length && Lampa.Activity.active().component == 'full') $('.selectbox .scroll__body').prepend($(ads_4k));
			// 		}, 10);
			// 	}
			// });
			var mynotice = new Lampa.NoticeClassLampa({ name: 'Modss', db_name: 'notice_modss' });
			Lampa.Notice.addClass('modss', mynotice);
		},
		// snow: function () {
		// 	$(document).snowfall(Lampa.Storage.field('mods_snow') == true ? {
		// 		deviceorientation: true,
		// 		round: true,
		// 		maxSize: 10,
		// 		maxSpeed: 5,
		// 		flakeCount: 30,
		// 		flakeIndex: 9
		// 	} : 'clear');
		// },
		// radio: function () {
		// 	var ico = '<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="radioIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <title id="radioIconTitle">Radio</title> <path d="M5.44972845 6C2.18342385 9.2663046 2.18342385 14.7336954 5.44972845 18M8.59918369 8C6.46693877 10.1322449 6.46693877 13.8677551 8.59918369 16M18.5502716 18C21.8165761 14.7336954 21.8165761 9.2663046 18.5502716 6M15.4008163 16C17.5330612 13.8677551 17.5330612 10.1322449 15.4008163 8"/> <circle cx="12" cy="12" r="1"/> </svg>';
		// 	var menu_item = $('<li class="menu__item selector" data-action="Radio_n"><div class="menu__ico">' + ico + '</div><div class="menu__text">' + Lampa.Lang.translate('title_radio') + '</div></li>');
		// 	menu_item.on('hover:enter', function () {
		// 		Lampa.Activity.push({
		// 			url: API + 'r/record/',
		// 			title: Lampa.Lang.translate('title_radio'),
		// 			component: 'Radio_n',
		// 			page: 1
		// 		});
		// 	});
		// 	if (Lampa.Storage.get('mods_radio')) $('body').find('.menu .menu__list').eq(0).append(menu_item);
		// 	else $('body').find('[data-action="Radio_n"]').remove();
		// },

		// sources: function () {
		// 	var sources;
		// 	if (Lampa.Params.values && Lampa.Params.values['source']) {
		// 		sources = Object.assign({}, Lampa.Params.values['source']);
		// 		sources.pub = 'PUB';
		// 		sources.filmix = 'FILMIX';
		// 	} else {
		// 		sources = {
		// 			'tmdb': 'TMDB',
		// 			'cub': 'CUB',
		// 			'pub': 'PUB',
		// 			'filmix': 'FILMIX'
		// 		};
		// 	}

		// 	Lampa.Params.select('source', sources, 'tmdb');
		// },
		online: function (back) {
			var params = {
				url: '',
				title: Lampa.Lang.translate('modss_title_online') + "",
				component: 'aston_modss_online',
				search: cards.title,
				search_one: cards.title,
				search_two: cards.original_title,
				movie: cards,
				page: 1
			};
			this.params = params;
			var _this = this;
			function inf() {
				_this.balanser = Lampa.Storage.get('modss_last_balanser');
				_this.data = Lampa.Storage.cache('online_choice_' + _this.balanser[card.id], 3000, {});
				_this.is_continue = card.number_of_seasons && _this.data[card.id] && Lampa.Arrays.getKeys(_this.data[card.id].episodes_view).length;
				_this.last_s = _this.is_continue ? ('S' + (_this.data[card.id].season + 1) + ' - ' + (_this.data[card.id].episodes_view[_this.data[card.id].season == 0 ? 1 : (_this.data[card.id].season + 1)]) + ' ' + Lampa.Lang.translate('torrent_serial_episode').toLowerCase()) : '';
				_this.title = _this.is_continue && Lampa.Storage.field('online_continued') ? '#{title_online_continue} ' : '#{modss_title_online}';
			}
			function openOnline() {
				Lampa.Activity.push(params);
			}
			function shows(last) {
				Lampa.Select.show({
					title: Lampa.Lang.translate('title_action'),
					items: [{
						title: Lampa.Lang.translate('title_online_continue') + '? ' + _this.last_s,
						yes: true
					}, {
						title: Lampa.Lang.translate('settings_param_no')
					}],
					onBack: function onBack() {
						Lampa.Select.hide();
						Lampa.Controller.toggle('content');
					},
					onSelect: function onSelect(a) {
						if (a.yes) {
							_this.data[card.id].continued = true;
							Lampa.Storage.set('online_choice_' + _this.balanser[card.id], _this.data);
						}
						openOnline();
					}
				});
			}
			var card = cards;
			var balanser = this.balanser;
			var data = this.data;
			var is_continue = this.is_continue;
			var last_s = this.last_s;
			inf();

			var loader = '<svg class="modss-balanser-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="94px" height="94px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="5" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>';
			var ico = '<svg class="modss-online-icon" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>';
			var button = "<div data-subtitle='modss_v".concat(manifest.version, " (14 Balansers, 7 in vip)' class='full-start__button selector view--modss_online'>" + ico + "<span>" + this.title + "</span></div>");
			var btn = $(Lampa.Lang.translate(button));
			this.btn = btn;
			//	if (Lampa.Storage.field('online_but_first')) Lampa.Storage.set('full_btn_priority', Lampa.Utils.hash(btn.clone().removeClass('focus').prop('outerHTML')));

			if (back == 'delete') Lampa.Activity.active().activity.render().find('.view--modss_online').remove();
			if (back && back !== 'delete') back.find('span').text(Lampa.Lang.translate(this.title));
			if (!back && Lampa.Storage.field('mods_onl')) {
				setTimeout(function () {
					if (Lampa.Controller.enabled().name == 'full_start' && !Lampa.Activity.active().activity.render().find('.view--modss_online').length) {
						if (Lampa.Activity.active().activity.render().find('.button--priority').length) {
							Lampa.Activity.active().activity.render().find('.full-start-new__buttons').prepend(btn);
							Lampa.Controller.toggle('full_start');
							Navigator.focus(btn[0]);
						} else if ((Lampa.Storage.field('online_but_first') && Lampa.Activity.active().activity.render().find('.button--play').length) || !Lampa.Activity.active().activity.render().find('.view--torrent').length) {
							Lampa.Activity.active().activity.render().find('.button--play').before(btn);
							Lampa.Controller.toggle('full_start');
							Navigator.focus(btn[0]);
						} else {
							Lampa.Activity.active().activity.render().find('.view--torrent').before(btn);
							Lampa.Controller.toggle('full_start');
						}
					}
					//if(Lampa.Storage.field('online_but_first')) Navigator.focus(btn[0]);
				}, 100);
				btn.unbind('hover:enter hover.click').on('hover:enter hover.click', function () {
					inf();
					Lampa.Activity.active().activity.render().find('.view--modss_online').html(Lampa.Lang.translate(ico + '<span>' + _this.title + '</span>'));
					if (_this.is_continue && Lampa.Storage.field('online_continued')) shows(_this.last_s);
					else openOnline();
				});
			}
		},


		// collections: function () {
		// 	var menu_item = $('<li class="menu__item selector" data-action="collection"><div class="menu__ico"><img src="./img/icons/menu/catalog.svg"/></div><div class="menu__text">' + Lampa.Lang.translate('title_collections') + '</div></li>');
		// 	if (Lampa.Storage.get('mods_collection')) $('body').find('.menu .menu__list li:eq(3)').after(menu_item)
		// 	else $('body').find('[data-action="collection"]').remove();
		// 	menu_item.on('hover:enter', function () {
		// 		var item = [{
		// 			/*title: Lampa.Lang.translate('menu_collections')+' '+Lampa.Lang.translate('title_on_the')+ ' filmix',
		// 				url: 'https://filmix.ac/playlists/rateup',
		// 				source: 'filmix'
		// 			}, {*/
		// 			title: Lampa.Lang.translate('menu_collections') + ' ' + Lampa.Lang.translate('title_on_the') + ' rezka',
		// 			url: 'http://hdrezka.co/collections/',
		// 			source: 'rezka'
		// 		}, {
		// 			title: Lampa.Lang.translate('menu_collections') + ' ' + Lampa.Lang.translate('title_on_the') + ' kinopub',
		// 			url: Pub.baseurl + 'v1/collections',
		// 			source: 'pub'
		// 		}];
		// 		if (Lampa.Arrays.getKeys(Lampa.Storage.get('my_col')).length) {
		// 			item.push({
		// 				title: Lampa.Lang.translate('title_my_collections') + ' - ' + Lampa.Arrays.getKeys(Lampa.Storage.get('my_col')).length,
		// 				url: Pub.baseurl + 'v1/collections',
		// 				source: 'my_coll'
		// 			});
		// 		}
		// 		Lampa.Select.show({
		// 			title: Lampa.Lang.translate('menu_collections'),
		// 			items: item,
		// 			onSelect: function onSelect(a) {
		// 				Lampa.Activity.push({
		// 					url: a.url || '',
		// 					sourc: a.source,
		// 					source: Lampa.Storage.field('source'),
		// 					title: a.title,
		// 					card_cat: true,
		// 					category: true,
		// 					component: a.url ? 'collection' : 'collections',
		// 					page: 1
		// 				});
		// 			},
		// 			onBack: function onBack() {
		// 				Lampa.Controller.toggle('content');
		// 			}
		// 		});
		// 	});
		// },
		Timer: function (tpl) {
			var self = this;
			self.tpl = tpl;
			self.startTime = 0;
			self.paused = true;
			self.msElapsed = 0;
			self.intervalId = null;

			self.start = function () {
				self.paused = false;
				self.startTime = Date.now();
				Lampa.Activity.active().activity.render().find(self.tpl).html('');
				self.intervalId = setInterval(function () {
					var curTime = Date.now();
					self.msElapsed = curTime - self.startTime;
					var sek = self.formatTime(self.msElapsed);
					Lampa.Activity.active().activity.render().find(self.tpl).html(sek);
				}, 100);
			};
			self.stop = function () {
				clearInterval(self.intervalId);
				self.intervalId = null;
				self.paused = true;
				return self.formatTime(self.msElapsed);
			};
			self.formatTime = function (ms) {
				var totalSeconds = Math.floor(ms / 1000);
				var minutes = Math.floor(totalSeconds / 60);
				var seconds = totalSeconds % 60;
				var milliseconds = Math.floor((ms % 1000) / 10);
				var sec = seconds < 10 ? '0' + seconds : seconds;
				var milsec = milliseconds < 10 ? '0' + milliseconds : milliseconds;
				return sec + ':' + milsec + ' c';
			};
		},
		buttBack: function (pos) {
			if ((/iPhone|iPad|iPod|android|x11/i.test(navigator.userAgent) || (Lampa.Platform.is('android') && window.innerHeight < 1080)) && Lampa.Storage.get('mods_butt_back')) {
				$('body').find('.elem-mobile-back').remove();
				var position = Lampa.Storage.field('mods_butt_pos') == 'left' ? 'left: 0;transform: scaleX(-1);' : 'right: 0;';
				$('body').append('<div class="elem-mobile-back"><style>.elem-mobile-back {' + position + 'position: fixed;z-index:99999;top: 50%;width: 3em;height: 6em;background-image: url(../icons/player/prev.svg);background-repeat: no-repeat;background-position: 100% 50%;-webkit-background-size: contain;-moz-background-size: contain;-o-background-size: contain;background-size: contain;margin-top: -3em;font-size: .72em;display: block}</style><svg width="131" height="262" viewBox="0 0 131 262" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M131 0C58.6507 0 0 58.6507 0 131C0 203.349 58.6507 262 131 262V0Z" fill="white"/><path d="M50.4953 125.318C50.9443 124.878 51.4313 124.506 51.9437 124.183L86.2229 90.4663C89.5671 87.1784 94.9926 87.1769 98.3384 90.4679C101.684 93.7573 101.684 99.0926 98.3384 102.385L68.8168 131.424L98.4907 160.614C101.836 163.904 101.836 169.237 98.4907 172.531C96.817 174.179 94.623 175 92.4338 175C90.2445 175 88.0489 174.179 86.3768 172.531L51.9437 138.658C51.4313 138.335 50.9411 137.964 50.4953 137.524C48.7852 135.842 47.9602 133.626 48.0015 131.421C47.9602 129.216 48.7852 127.002 50.4953 125.318Z" fill="black"/></svg></div>');
				$(".elem-mobile-back").on("click", function () {
					Lampa.Activity.back();
				});
			}
		},
		last_view: function (data) {
			var episodes = Lampa.TimeTable.get(data);
			var viewed;
			episodes.forEach(function (ep) {
				var hash = Lampa.Utils.hash([ep.season_number, ep.episode_number, data.original_title].join(''));
				var view = Lampa.Timeline.view(hash);
				if (view.percent) viewed = {
					ep: ep,
					view: view
				};
			});
			if (viewed) {
				var ep = viewed.ep.episode_number;
				var se = viewed.ep.season_number;
				var last_view = 'S' + se + ':E' + ep;
				if ($('body').find('.full-start__buttons,.full-start-new__buttons').length) {
					$('.timeline, .card--last_view').remove();
					$('body').find('.full-start__poster,.full-start-new__poster').append("<div class='card--last_view' style='top:0.6em;right: -.5em;position: absolute;background: #168FDF;color: #fff;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'><div style='float:left;margin:-5px 0 -4px -4px' class='card__icon icon--history'></div>" + last_view + "</div>").parent().append('<div class="timeline" style="position:relative;"></div>');
					$('body').find('.timeline').append(Lampa.Timeline.render(viewed.view));
				}
				if ($('body').find('.filter--sort').length) $('body').find('.files__left .time-line, .card--last_view').remove();
			} else $('body').find('.timeline,.card--last_view').remove();
			if ($('body').find('.online').length == 0) $('.card--new_ser,.card--viewed').remove();
		},
		serialInfo: function (card) {
			if (Lampa.Storage.field('mods_serial_info') && card.source == 'tmdb' && card.seasons && card.last_episode_to_air) {
				var last_seria_inseason = card.last_episode_to_air.season_number;
				var air_new_episode = card.last_episode_to_air.episode_number;
				var next_episode = card.next_episode_to_air;
				var last_seria = next_episode && new Date(next_episode.air_date) <= Date.now() ? next_episode.episode_number : card.last_episode_to_air.episode_number;
				var new_ser;
				this.last_view(card);
				var count_eps_last_seas = card.seasons.find(function (eps) {
					return eps.season_number == last_seria_inseason;
				}).episode_count;

				if (card.next_episode_to_air) {
					var add_ = '<b>' + last_seria;
					var notices = Lampa.Storage.get('account_notice', []).filter(function (n) {
						return n.card_id == card.id;
					});
					if (notices.length) {
						var notice = notices.find(function (itm) {
							return itm.episode == last_seria;
						});

						if (notice) {
							var episod_new = JSON.parse(notice.data).card.seasons;
							if (Lampa.Utils.parseTime(notice.date).full == Lampa.Utils.parseTime(Date.now()).full)
								add_ = '#{season_new} <b>' + episod_new[last_seria_inseason];
						}
					}
					new_ser = add_ + '</b> #{torrent_serial_episode} #{season_from} ' + count_eps_last_seas + ' - S' + last_seria_inseason;
				} else new_ser = last_seria_inseason + ' #{season_ended}';

				if (!$('.card--new_seria', Lampa.Activity.active().activity.render()).length) {
					if (window.innerWidth > 585) $('.full-start__poster,.full-start-new__poster', Lampa.Activity.active().activity.render()).append("<div class='card--new_seria' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;bottom:.6em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate(new_ser) + "</div>");
					else {
						if ($('.card--new_seria', Lampa.Activity.active().activity.render()).length) $('.full-start__tags', Lampa.Activity.active().activity.render()).append('<div class="full-start__tag card--new_seria"><img src="./img/icons/menu/movie.svg" /> <div>' + Lampa.Lang.translate(new_ser) + '</div></div>');
						else $('.full-start-new__details', Lampa.Activity.active().activity.render()).append('<span class="full-start-new__split">●</span><div class="card--new_seria"><div>' + Lampa.Lang.translate(new_ser) + '</div></div>');
					}
				}
			}
		},
		rating_kp_imdb: function (card) {
			function fetchDoubanData(card) {
				return new Promise(function (resolve, reject) {
					Pub.network["native"]('https://movie.douban.com/j/subject_suggest?q=' + card.imdb_id, function (data) {
						if (data.length) {
							Pub.network["native"]('https://movie.douban.com/j/subject_abstract?subject_id=' + data[0].id, function (json) {
								if (json.hasOwnProperty("subject")) {
									var douban_rating = !isNaN(json.subject.rate) && json.subject.rate !== null && json.subject.rate !== '' ? parseFloat(json.subject.rate).toFixed(1) : '0.0';
									$('.rate--imdb', Lampa.Activity.active().activity.render()).before('<div class="full-start__rate rate--douban"><div>' + douban_rating + '</div><div>豆瓣</div></div>');
								}
								resolve(); // 解决 Promise
							}, function (a, c) {
								resolve(); // 解决 Promise
								Lampa.Noty.show(Pub.network.errorDecode(a, c));
							}, false, {
								dataType: 'json'
							});
						} else {
							resolve(); // 解决 Promise
						}
					}, function (a, c) {
						resolve(); // 解决 Promise
						// Lampa.Noty.show('豆瓣：' + Pub.network.errorDecode(a, c));
					}, false, {
						dataType: 'json',
					});
				});
			}

			function fetchRottenTomatoesData(card) {
				return new Promise(function (resolve, reject) {
					Pub.network["native"]('https://www.rottentomatoes.com/m/' + card.original_title.replace(/:|-/, "").replace(/\s+/g, "_").replace(/\W+/g, "").replace(/_+/g, "_").toLowerCase(), function (data) {
						var scriptRegex = /script type="application\/ld\+json">([^<]*)<\/script>/;
						var match = scriptRegex.exec(data);

						if (match) {
							var jsonContent = match[1];
							var jsonData = JSON.parse(jsonContent);
							if (jsonData.hasOwnProperty("aggregateRating")){
								$('.rate--kp', Lampa.Activity.active().activity.render()).after('<div class="full-start__rate rate--rottentomatoes"><div>' + jsonData.aggregateRating.ratingValue + '%</div><div>烂番茄</div></div>');
							}
						}
						resolve(); // 解决 Promise
					}, function (a, c) {
						resolve(); // 解决 Promise
						// Lampa.Noty.show('烂番茄：' + Pub.network.errorDecode(a, c));
					}, false, {
						dataType: 'text',
					});
				});
			}
			return new Promise(function (resolve, reject) {
				var relise = (card.number_of_seasons ? card.first_air_date : card.release_date) || '0000';
				var year = parseInt((relise + '').slice(0, 4));
				//	if (Lampa.Storage.field('mods_rating') && $('.rate--kp', Lampa.Activity.active().activity.render()).hasClass('hide') && !$('.wait_rating', Lampa.Activity.active().activity.render()).length) 
				if (['filmix', 'pub'].indexOf(card.source) == -1 && Lampa.Storage.field('mods_rating'))
					$('.info__rate', Lampa.Activity.active().activity.render()).after('<div style="width:2em;margin-top:1em;margin-right:1em" class="wait_rating"><div class="broadcast__scan"><div></div></div><div>');
				Pub.network.clear();
				Pub.network.timeout(10000);
				Pub.network.silent(API + 'KPrating', function (json) {
					if (!card.kinopoisk_id && json.data && json.data.kp_id) card.kinopoisk_ID = json.data.kp_id;
					var kp = json.data && json.data.kp_rating || 0;
					var imdb = json.data && json.data.imdb_rating || 0;
					var auth = json.data.auth;
					if (logged !== auth) {
						logged = auth;
						window.location.reload();
					}
					var kp_rating = !isNaN(kp) && kp !== null ? parseFloat(kp).toFixed(1) : '0.0';
					var imdb_rating = !isNaN(imdb) && imdb !== null ? parseFloat(imdb).toFixed(1) : '0.0';
					if (['filmix', 'pub'].indexOf(card.source) == -1 && Lampa.Storage.field('mods_rating')) {
						$('.wait_rating', Lampa.Activity.active().activity.render()).remove();
						$('.rate--imdb', Lampa.Activity.active().activity.render()).removeClass('hide').find('> div').eq(0).text(imdb_rating);
						$('.rate--kp', Lampa.Activity.active().activity.render()).removeClass('hide').find('> div').eq(0).text(kp_rating);
						fetchRottenTomatoesData(card)
							.then(function () {
								return fetchDoubanData(card);
							})
							.then(function () {
								// console.log("两个请求都已完成");
							})
							.catch(function (error) {
								console.error("发生错误:", error);
							});
					}
					resolve();
				}, function (a, c) {
					resolve();
					Lampa.Noty.show('评分   ' + Pub.network.errorDecode(a, c));
				}, {
					title: card.title,
					year: year,
					card_id: card.id,
					imdb: card.imdb_id,
					user_id: user_id,
					uid: uid
				});
			});
		},
		Notice: function (data) {
			var id = data.id;
			var card = JSON.parse(data.data).card;
			setTimeout(function () {
				if (Lampa.Notice.classes.modss.notices.find(function (n) {
					return n.id == id;
				})) return;

				var bals = [];
				for (var b in data.find) {
					bals.push('<b>' + b + '</b> - ' + data.find[b].join(', '));
				}
				Lampa.Notice.pushNotice('modss', {
					id: id,
					from: 'modss',
					title: card.name,
					text: 'Переводы на балансерах где есть ' + data.episode + ' серия',
					time: Date.now(),
					poster: card.poster_path,
					card: card,
					labels: bals
				}, function () {
					console.log('Успешно');
				}, function (e) {
					console.log('Чет пошло не так', e);
				});
			}, 1000);

			Lampa.Notice.listener.follow('select', function (e) {
				if (e.element.from == 'modss') {
					Lampa.Notice.close();
				}
			});
		},
		balansers: function () {
			var balansers = {};
			// { "videocdn": "VideoCDN", "collaps": "Collaps", "kinobase": "Kinobase", "filmix": "Filmix", "cdnmovies": "CDNmovies", "rezka": "Rezka", "pub": "Pub <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" /><img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBkYXRhLW5hbWU9IjRLIj48cGF0aCBkPSJNNDYxLjEzNyAxMjYuMDlhOCA4IDAgMCAwLTkuNDIzLTcuODcybC0xNy42NjcgMy4xOTJBMTAwNC4wOSAxMDA0LjA5IDAgMCAxIDI1NiAxMzcuMzY1IDEwMDQuMTE0IDEwMDQuMTE0IDAgMCAxIDc3Ljk1MiAxMjEuNDFsLTE3LjY2Ny0zLjE5MmE3Ljk5OSA3Ljk5OSAwIDAgMC05LjQyMiA3Ljg3MnYyNTkuODJhNy45OTkgNy45OTkgMCAwIDAgOS40MjIgNy44NzNsMTcuNjY3LTMuMTkzYTEwMDEuNDIzIDEwMDEuNDIzIDAgMCAxIDM1Ni4wOTYgMGwxNy42NjcgMy4xOTNhOCA4IDAgMCAwIDkuNDIzLTcuODcyWm0tMzEgMjcuNDgzdjIwNC44NTRhMTAyOC41OTQgMTAyOC41OTQgMCAwIDAtMzQ4LjI3NCAwVjE1My41NzNhMTAyOC41MzggMTAyOC41MzggMCAwIDAgMzQ4LjI3NSAwWiIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PHBhdGggZD0iTTIzNS40MTMgMjY0LjE5NXYtMjQuOTU2YTggOCAwIDAgMC0xNiAwdjI0Ljk1NkgxODQuNTFsMzcuNzQ2LTUzLjI4OGE4IDggMCAwIDAtMTMuMDU2LTkuMjQ4bC00Ni42ODggNjUuOTEyYTggOCAwIDAgMCA2LjUyOCAxMi42MjRoNTAuMzcydjI1LjUyM2E4IDggMCAwIDAgMTYgMHYtMjUuNTIzaDE4Ljc2NWE4IDggMCAxIDAgMC0xNlpNMjg1LjQ3IDMxMy43MTdhOCA4IDAgMCAwIDgtOHYtMzUuNDI2bDEzLjI0NS0xMi43MDQgMzQuMTYyIDUwLjQ3YTggOCAwIDAgMCAxMy4yNS04Ljk2OWwtMzUuNjk2LTUyLjczNyAzNC42MDgtMzMuMTkzYTggOCAwIDEgMC0xMS4wNzQtMTEuNTQ3bC00OC40OTUgNDYuNTEydi00MS44NGE4IDggMCAwIDAtMTYgMHY5OS40MzRhOCA4IDAgMCAwIDggOFoiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvZz48L3N2Zz4=\" />", "hdr": "HDR MODS's <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" /><img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBkYXRhLW5hbWU9IjRLIj48cGF0aCBkPSJNNDYxLjEzNyAxMjYuMDlhOCA4IDAgMCAwLTkuNDIzLTcuODcybC0xNy42NjcgMy4xOTJBMTAwNC4wOSAxMDA0LjA5IDAgMCAxIDI1NiAxMzcuMzY1IDEwMDQuMTE0IDEwMDQuMTE0IDAgMCAxIDc3Ljk1MiAxMjEuNDFsLTE3LjY2Ny0zLjE5MmE3Ljk5OSA3Ljk5OSAwIDAgMC05LjQyMiA3Ljg3MnYyNTkuODJhNy45OTkgNy45OTkgMCAwIDAgOS40MjIgNy44NzNsMTcuNjY3LTMuMTkzYTEwMDEuNDIzIDEwMDEuNDIzIDAgMCAxIDM1Ni4wOTYgMGwxNy42NjcgMy4xOTNhOCA4IDAgMCAwIDkuNDIzLTcuODcyWm0tMzEgMjcuNDgzdjIwNC44NTRhMTAyOC41OTQgMTAyOC41OTQgMCAwIDAtMzQ4LjI3NCAwVjE1My41NzNhMTAyOC41MzggMTAyOC41MzggMCAwIDAgMzQ4LjI3NSAwWiIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PHBhdGggZD0iTTIzNS40MTMgMjY0LjE5NXYtMjQuOTU2YTggOCAwIDAgMC0xNiAwdjI0Ljk1NkgxODQuNTFsMzcuNzQ2LTUzLjI4OGE4IDggMCAwIDAtMTMuMDU2LTkuMjQ4bC00Ni42ODggNjUuOTEyYTggOCAwIDAgMCA2LjUyOCAxMi42MjRoNTAuMzcydjI1LjUyM2E4IDggMCAwIDAgMTYgMHYtMjUuNTIzaDE4Ljc2NWE4IDggMCAxIDAgMC0xNlpNMjg1LjQ3IDMxMy43MTdhOCA4IDAgMCAwIDgtOHYtMzUuNDI2bDEzLjI0NS0xMi43MDQgMzQuMTYyIDUwLjQ3YTggOCAwIDAgMCAxMy4yNS04Ljk2OWwtMzUuNjk2LTUyLjczNyAzNC42MDgtMzMuMTkzYTggOCAwIDEgMC0xMS4wNzQtMTEuNTQ3bC00OC40OTUgNDYuNTEydi00MS44NGE4IDggMCAwIDAtMTYgMHY5OS40MzRhOCA4IDAgMCAwIDggOFoiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvZz48L3N2Zz4=\" />", "hdrezka": "HDRezka <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" /><img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBkYXRhLW5hbWU9IjRLIj48cGF0aCBkPSJNNDYxLjEzNyAxMjYuMDlhOCA4IDAgMCAwLTkuNDIzLTcuODcybC0xNy42NjcgMy4xOTJBMTAwNC4wOSAxMDA0LjA5IDAgMCAxIDI1NiAxMzcuMzY1IDEwMDQuMTE0IDEwMDQuMTE0IDAgMCAxIDc3Ljk1MiAxMjEuNDFsLTE3LjY2Ny0zLjE5MmE3Ljk5OSA3Ljk5OSAwIDAgMC05LjQyMiA3Ljg3MnYyNTkuODJhNy45OTkgNy45OTkgMCAwIDAgOS40MjIgNy44NzNsMTcuNjY3LTMuMTkzYTEwMDEuNDIzIDEwMDEuNDIzIDAgMCAxIDM1Ni4wOTYgMGwxNy42NjcgMy4xOTNhOCA4IDAgMCAwIDkuNDIzLTcuODcyWm0tMzEgMjcuNDgzdjIwNC44NTRhMTAyOC41OTQgMTAyOC41OTQgMCAwIDAtMzQ4LjI3NCAwVjE1My41NzNhMTAyOC41MzggMTAyOC41MzggMCAwIDAgMzQ4LjI3NSAwWiIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PHBhdGggZD0iTTIzNS40MTMgMjY0LjE5NXYtMjQuOTU2YTggOCAwIDAgMC0xNiAwdjI0Ljk1NkgxODQuNTFsMzcuNzQ2LTUzLjI4OGE4IDggMCAwIDAtMTMuMDU2LTkuMjQ4bC00Ni42ODggNjUuOTEyYTggOCAwIDAgMCA2LjUyOCAxMi42MjRoNTAuMzcydjI1LjUyM2E4IDggMCAwIDAgMTYgMHYtMjUuNTIzaDE4Ljc2NWE4IDggMCAxIDAgMC0xNlpNMjg1LjQ3IDMxMy43MTdhOCA4IDAgMCAwIDgtOHYtMzUuNDI2bDEzLjI0NS0xMi43MDQgMzQuMTYyIDUwLjQ3YTggOCAwIDAgMCAxMy4yNS04Ljk2OWwtMzUuNjk2LTUyLjczNyAzNC42MDgtMzMuMTkzYTggOCAwIDEgMC0xMS4wNzQtMTEuNTQ3bC00OC40OTUgNDYuNTEydi00MS44NGE4IDggMCAwIDAtMTYgMHY5OS40MzRhOCA4IDAgMCAwIDggOFoiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvZz48L3N2Zz4=\" />", "bazon": "Bazon <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" /><img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBkYXRhLW5hbWU9IjRLIj48cGF0aCBkPSJNNDYxLjEzNyAxMjYuMDlhOCA4IDAgMCAwLTkuNDIzLTcuODcybC0xNy42NjcgMy4xOTJBMTAwNC4wOSAxMDA0LjA5IDAgMCAxIDI1NiAxMzcuMzY1IDEwMDQuMTE0IDEwMDQuMTE0IDAgMCAxIDc3Ljk1MiAxMjEuNDFsLTE3LjY2Ny0zLjE5MmE3Ljk5OSA3Ljk5OSAwIDAgMC05LjQyMiA3Ljg3MnYyNTkuODJhNy45OTkgNy45OTkgMCAwIDAgOS40MjIgNy44NzNsMTcuNjY3LTMuMTkzYTEwMDEuNDIzIDEwMDEuNDIzIDAgMCAxIDM1Ni4wOTYgMGwxNy42NjcgMy4xOTNhOCA4IDAgMCAwIDkuNDIzLTcuODcyWm0tMzEgMjcuNDgzdjIwNC44NTRhMTAyOC41OTQgMTAyOC41OTQgMCAwIDAtMzQ4LjI3NCAwVjE1My41NzNhMTAyOC41MzggMTAyOC41MzggMCAwIDAgMzQ4LjI3NSAwWiIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PHBhdGggZD0iTTIzNS40MTMgMjY0LjE5NXYtMjQuOTU2YTggOCAwIDAgMC0xNiAwdjI0Ljk1NkgxODQuNTFsMzcuNzQ2LTUzLjI4OGE4IDggMCAwIDAtMTMuMDU2LTkuMjQ4bC00Ni42ODggNjUuOTEyYTggOCAwIDAgMCA2LjUyOCAxMi42MjRoNTAuMzcydjI1LjUyM2E4IDggMCAwIDAgMTYgMHYtMjUuNTIzaDE4Ljc2NWE4IDggMCAxIDAgMC0xNlpNMjg1LjQ3IDMxMy43MTdhOCA4IDAgMCAwIDgtOHYtMzUuNDI2bDEzLjI0NS0xMi43MDQgMzQuMTYyIDUwLjQ3YTggOCAwIDAgMCAxMy4yNS04Ljk2OWwtMzUuNjk2LTUyLjczNyAzNC42MDgtMzMuMTkzYTggOCAwIDEgMC0xMS4wNzQtMTEuNTQ3bC00OC40OTUgNDYuNTEydi00MS44NGE4IDggMCAwIDAtMTYgMHY5OS40MzRhOCA4IDAgMCAwIDggOFoiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvZz48L3N2Zz4=\" />", "qiwi": "Qiwi <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" /><img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBkYXRhLW5hbWU9IjRLIj48cGF0aCBkPSJNNDYxLjEzNyAxMjYuMDlhOCA4IDAgMCAwLTkuNDIzLTcuODcybC0xNy42NjcgMy4xOTJBMTAwNC4wOSAxMDA0LjA5IDAgMCAxIDI1NiAxMzcuMzY1IDEwMDQuMTE0IDEwMDQuMTE0IDAgMCAxIDc3Ljk1MiAxMjEuNDFsLTE3LjY2Ny0zLjE5MmE3Ljk5OSA3Ljk5OSAwIDAgMC05LjQyMiA3Ljg3MnYyNTkuODJhNy45OTkgNy45OTkgMCAwIDAgOS40MjIgNy44NzNsMTcuNjY3LTMuMTkzYTEwMDEuNDIzIDEwMDEuNDIzIDAgMCAxIDM1Ni4wOTYgMGwxNy42NjcgMy4xOTNhOCA4IDAgMCAwIDkuNDIzLTcuODcyWm0tMzEgMjcuNDgzdjIwNC44NTRhMTAyOC41OTQgMTAyOC41OTQgMCAwIDAtMzQ4LjI3NCAwVjE1My41NzNhMTAyOC41MzggMTAyOC41MzggMCAwIDAgMzQ4LjI3NSAwWiIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9ImZpbGwtMDAwMDAwIj48L3BhdGg+PHBhdGggZD0iTTIzNS40MTMgMjY0LjE5NXYtMjQuOTU2YTggOCAwIDAgMC0xNiAwdjI0Ljk1NkgxODQuNTFsMzcuNzQ2LTUzLjI4OGE4IDggMCAwIDAtMTMuMDU2LTkuMjQ4bC00Ni42ODggNjUuOTEyYTggOCAwIDAgMCA2LjUyOCAxMi42MjRoNTAuMzcydjI1LjUyM2E4IDggMCAwIDAgMTYgMHYtMjUuNTIzaDE4Ljc2NWE4IDggMCAxIDAgMC0xNlpNMjg1LjQ3IDMxMy43MTdhOCA4IDAgMCAwIDgtOHYtMzUuNDI2bDEzLjI0NS0xMi43MDQgMzQuMTYyIDUwLjQ3YTggOCAwIDAgMCAxMy4yNS04Ljk2OWwtMzUuNjk2LTUyLjczNyAzNC42MDgtMzMuMTkzYTggOCAwIDEgMC0xMS4wNzQtMTEuNTQ3bC00OC40OTUgNDYuNTEydi00MS44NGE4IDggMCAwIDAtMTYgMHY5OS40MzRhOCA4IDAgMCAwIDggOFoiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvZz48L3N2Zz4=\" />", "videodb": "VideoDB <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" />", "zetflix": "Zetflix <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" />", "uakino": "UAKino <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" />", "eneida": "Eneida(Ukr) <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" />", "kodik": "Kodik <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" />", "anilibria": "Anilibria <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" />", "hdvb": "HDVB <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" />", "kinotochka": "KinoTochka <img style=\"width:2em!important;height:1.1em!important\" src=\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0yIDE5aDIwdjJIMnYtMnptOS0xMWgydjhoLTJWOHpNNy45NjUgOGgyLjEyNWwtMi45ODYgNy45NjRoLTJMMi4xMTggOGgyLjEyNWwxLjg2MSA1LjExM0w3Ljk2NSA4ek0xNyAxNHYyaC0yVjhoNGEzIDMgMCAwIDEgMCA2aC0yem0wLTR2MmgyYTEgMSAwIDAgMCAwLTJoLTJ6TTIgM2gyMHYySDJWM3oiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==\" />" };
			var tg_sname = {}, resource_sname = {}, sname = {}, function_sname = {};
			if (doregjson.hasOwnProperty("tg_channel") && typeof doregjson.tg_channel === "object" && Object.keys(doregjson.tg_channel).length > 0) {
				doregjson.tg_channel.forEach(function (elem) {
					tg_sname[elem.channel_name] = elem.channel_name;
				});
			};

			if (doregjson.hasOwnProperty("resource_site") && typeof doregjson.resource_site === "object" && Object.keys(doregjson.resource_site).length > 0) {
				doregjson.resource_site.forEach(function (elem) {
					resource_sname[elem.site_name] = elem.site_name;
				});
			};

			if (doregjson.hasOwnProperty("rule") && typeof doregjson.rule === "object" && Object.keys(doregjson.rule).length > 0) {
				doregjson.rule.forEach(function (elem) {
					sname[elem.name] = elem.name;
				});
			};

			if (doregjson.hasOwnProperty("custom_function") && typeof doregjson.custom_function === "object" && Object.keys(doregjson.custom_function).length > 0) {
				doregjson.custom_function.forEach(function (elem) {
					function_sname[elem.resource_name] = elem.resource_name;
				});
			};

			balansers = Object.assign({}, tg_sname, balansers);
			balansers = Object.assign({}, resource_sname, balansers);
			balansers = Object.assign({}, function_sname, balansers);
			balansers = Object.assign({}, sname, balansers);
			
			// console.log('所有视频源',balansers)

			if (Lampa.Storage.get('pro_pub', false)) balansers = Object.assign({ "pub": "Pub" }, balansers);
			return balansers;
		},
		check: function (name, call) {
			var json = Modss.jack[name];
			var item = $('.settings-param__status.one');
			var item2 = $('.settings-param__status.act');
			var url = (json && json.url || Lampa.Storage.get('jackett_url'));
			var u = url + '/api/v2.0/indexers/' + (Lampa.Storage.field('jackett_interview') == 'healthy' ? 'status:healthy' : 'all') + '/results?apikey=' + (json && json.key || Lampa.Storage.get('jackett_key'));
			Pub.network.timeout(10000);
			var check = function check(ok) {
				Pub.network["native"](Lampa.Utils.checkHttp(u), function (t) {
					if (name && !call) item2.removeClass('active error wait').addClass('active');
					if (call) {
						if (name && !Modss.jack[name].check) Modss.jack[name].check = true;
						if (name && !Modss.jack[name].ok) Modss.jack[name].ok = true;
						call(true);
					}
				}, function (a, c) {
					console.error('Request', 'parser error - ', Lampa.Utils.checkHttp(u));
					Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - ' + url);
					if (name && !call) item2.removeClass('active error wait').addClass('error');
					if (call) {
						if (ok && name && !Modss.jack[name].check) Modss.jack[name].check = true;
						if (ok && name && !Modss.jack[name].ok) Modss.jack[name].ok = false;
						call(false);
					}
				});
			};
			if (name && !call) check();
			else if (call && name && !Modss.jack[name].check) check(true);
			else {
				if (name && Modss.jack[name].ok) if (call) call(true);
				if (name && !Modss.jack[name].ok) if (call) call(false);
				if (Boolean(Modss.jack[Lampa.Storage.get('jackett_url2')])) item.removeClass('wait').addClass(Modss.jack[Lampa.Storage.get('jackett_url2')].ok ? 'active' : 'error');
			}
		},
		jack: {
			j_yourok_ru: { url: 'j.yourok.ru', key: 1, lang: 'df_lg', interv: 'healthy' },
			jacred_xyz: { url: 'jacred.xyz', key: '', lang: 'df_lg', interv: 'all' },
			spawn_pp_ua: { url: 'spawn.pp.ua:59117', key: 2, lang: 'df', interv: 'all' },
			jacred_ru: { url: 'jacred.ru', key: '', lang: 'lg', interv: 'healthy' },
			jac_unknown: { url: '188.119.113.252:9117', key: 1, lang: 'lg', interv: 'healthy' },
		},
		showModal: function (text, onselect) {
			Lampa.Modal.open({
				title: '',
				align: 'center',
				zIndex: 300,
				html: $('<div class="about">' + text + '</div>'),
				buttons: [{
					name: Lampa.Lang.translate('settings_param_no'),
					onSelect: function onSelect() {
						Lampa.Modal.close();
						Lampa.Controller.toggle('content');
					}
				}, {
					name: Lampa.Lang.translate('settings_param_yes'),
					onSelect: onselect
				}]
			});
		},
		balansPrf: '网站-LIBVIO',
		getcustomfunction: function () {
			if (doregjson.hasOwnProperty("custom_function") && typeof doregjson.custom_function === "object" && Object.keys(doregjson.custom_function).length > 0) {
				doregjson.custom_function.forEach(function (elem) {
					if (elem.ext_js_url !== '') {
						include(elem.ext_js_url)
					}
				});
			};
			function include(url) {
				var script = document.createElement('script');
				script.src = url;
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		},
		getconfig: function () {
			extract_rule = {};
			inner_extract_rule = {
				"rule": [
					{
						name: '网站-LIBVIO',
						available: true,
						websitelink: 'https://www.libvio.pro',
						listlink: true,
						use_proxy: false,
						search_url: 'https://www.libvio.pro/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
						search_json: true,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '.html',
						search_html_selector: '',
						link_folder: 'detail/',
						// detail_url_selector: '.stui-pannel__head:contains(LINE)+ul',
						// ul.stui-content__playlist:gt(0):lt(1)
						// .stui-pannel__head:contains(BD2播放)+ul,.stui-pannel__head:contains(BD播放)+ul,.stui-pannel__head:contains(HD播放)+ul 
						detail_url_selector: 'div > div:nth-child(2) > ul',
						// detail_url_selector: '.stui-pannel__head:contains(HD播放)+ul',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: true,
						js_execute_key: ['maccms', 'player_aaaa']
					},
					{
						name: '网站-在线之家',
						available: true,
						websitelink: 'https://www.zxzj.pro',
						listlink: true,
						use_proxy: true,
						search_url: 'https://www.zxzj.pro/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
						search_json: true,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '-1-1.html',
						search_html_selector: '',
						link_folder: 'video/',
						detail_url_selector: '.play-item.cont.active',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: true,
						js_execute_key: ['maccms', 'player_aaaa']
					},
					{
						name: '网站-低端影视',
						available: true,
						websitelink: 'https://ddys.pro',
						listlink: true,
						use_proxy: false,
						search_url: 'https://ddys.pro/?s=#msearchword&post_type=post',
						search_json: false,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '-1-1.html',
						search_html_selector: 'h2.post-title',
						link_folder: 'video/',
						detail_url_selector: '.wp-playlist-script',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: true,
						js_execute_key: []
					},
					// {
					//   name: '网站-凌云影视',
					//   available: false,
					//   websitelink: 'https://www.lyys8.com/',
					//   listlink: true,
					//   use_proxy: false,
					//   search_url: 'https://www.lyys8.com/s.html?wd=#msearchword',
					//   search_json: false,
					//   node_json: 'data',
					//   name_json: 'title',
					//   id_json: 'url',
					//   first_page_json: '',
					//   search_html_selector: 'dl > dd > p:nth-child(1) > strong',
					//   link_folder: '',
					//   detail_url_selector: '.player.ckp:first-child',
					//   videoparse: 'default',
					//   videocontainer: '.MacPlayer',
					//   use_referer: true,
					//   js_execute_key: ['maccms', 'player_data']
					// },
					{
						name: '网站-剧白白',
						available: true,
						websitelink: 'https://www.jubaibaic.com',
						listlink: true,
						use_proxy: false,
						search_url: 'https://www.jubaibaic.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
						search_json: true,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '-1-1.html',
						search_html_selector: '',
						link_folder: 'p/',
						detail_url_selector: '.playlist.column',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: true,
						js_execute_key: ['maccms', 'player_aaaa']
					},
					{
						name: '网站-秋霞电影',
						available: true,
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
						link_folder: 'play/',
						detail_url_selector: '.stui-pannel_bd.col-pd.clearfix:eq(0)',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: false,
						js_execute_key: ['maccms', 'player_aaaa']
					},
					// {
					//   name : '网站-乐猪TV[!]',
					//   available: false,
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
					//   available: false,
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
						name: '网站-AUETE影视',
						available: false,
						websitelink: 'https://auete.art',
						listlink: true,
						use_proxy: false,
						search_url: 'https://auete.art/auete2so.php?searchword=#msearchword',
						search_json: false,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '',
						search_html_selector: '.subject.break-all',
						link_folder: '',
						// detail_url_reg: '<div id="player_list" class="clearfix mt-3">(.*?)<\/div>',
						detail_url_selector: '#player_list',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: false,
						js_execute_key: [';var vfrom=']
					},
					{
						name: '网站-欧乐影视',
						available: true,
						websitelink: 'https://www.olevod.com/',
						listlink: true,
						use_proxy: false,
						search_url: 'https://www.olevod.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
						search_json: true,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '/sid/1/nid/1.html',
						search_html_selector: '',
						link_folder: '/index.php/vod/play/id/',
						detail_url_selector: 'div.playlist_full',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: false,
						js_execute_key: ['maccms', 'player_aaaa']
					},
					// {
					//   name: '追剧喵',
					//   available: false,
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
					//   name : '网站-555电影',
					//   available: false,
					//   websitelink : 'https://www.5dy1.cc',
					//   listlink : true,
					//   use_proxy: false,
					//   search_url : 'https://www.5dy1.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
					//   search_json : true,
					//   node_json : 'list',
					//   name_json : 'name',
					//   id_json : 'id',
					//   first_page_json: '.html',
					//   search_html_selector: '',
					//   link_folder : 'voddetail/',
					//   detail_url_selector: '.module-play-list:first-child',
					//   videoparse: 'default',
					//   videocontainer: '.MacPlayer',
					//   use_referer : false,
					//  js_execute_key : ['maccms','player_aaaa']
					// },
					// {
					//   name : '看视界',
					//   available: false,
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
					// {
					//   name: '网站-乌龟影院',
					//   available: false,
					//   websitelink: 'https://www.wuguiyy.com',
					//   listlink: true,
					//   use_proxy: false,
					//   search_url: 'https://www.wuguiyy.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
					//   search_json: true,
					//   node_json: 'list',
					//   name_json: 'name',
					//   id_json: 'id',
					//   first_page_json: '-1-1.html',
					//   search_html_selector: '',
					//   link_folder: 'play',
					//   detail_url_selector: 'div:nth-child(3) > div > div.stui-pannel_bd.col-pd.clearfix > ul > li',
					//   videoparse: 'default',
					//   videocontainer: '.MacPlayer',
					//   use_referer: false,
					//   js_execute_key: ['maccms', 'player_aaaa']
					// },
					// {
					// 	name: '网站-影视TV',
					// 	available: true,
					// 	websitelink: 'https://www.yingshi.tv/',
					// 	listlink: true,
					// 	use_proxy: false,
					// 	search_url: 'https://www.yingshi.tv/ajax/search.html?wd=#msearchword&mid=1&limit=18&page=1',
					// 	search_json: true,
					// 	node_json: 'list',
					// 	name_json: 'name',
					// 	id_json: 'vod_id',
					// 	first_page_json: '/sid/1/nid/1.html',
					// 	search_html_selector: 'h4.title',
					// 	link_folder: 'vod/play/id/',
					// 	detail_url_selector: '.stui-vodlist__head:contains(量子云播) + ul',
					// 	videoparse: 'default',
					// 	videocontainer: '.MacPlayer',
					// 	use_referer: true,
					// 	js_execute_key: ['maccms', 'player_aaaa']
					// },
					{
						name: '网站-达达龟',
						available: true,
						websitelink: 'https://www.dadagui.me/',
						listlink: true,
						use_proxy: false,
						search_url: 'https://www.dadagui.me/vodsearch/#msearchword----------1---.html',
						search_json: false,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '-1-1.html',
						search_html_selector: 'h4.title',
						link_folder: 'vodplay/',
						detail_url_selector: '.stui-vodlist__head:contains(量子云播) + ul',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: true,
						js_execute_key: ['maccms', 'player_aaaa']
					},
					// {
					//   name : '大师兄',
					//   available: false,
					//   websitelink : 'https://dsxys.com/',
					//   listlink : true,
					//   use_proxy: false,
					//   search_url : 'https://dsxys.com/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
					//   search_json : true,
					//   node_json: 'list',
					//   name_json: 'name',
					//   id_json: 'id',
					//   first_page_json: '-1-1.html',
					//   search_html_selector: '',
					//   link_folder : 'p',
					//   detail_url_selector : 'div.player-list',
					//   videoparse: 'browser',
					//   videocontainer: '.player-box-main',
					//   use_referer : false,
					//   js_execute_key : ['maccms','player_aaaa']
					// },
					{
						name: '网站-voflix HD',
						available: true,
						websitelink: 'https://www.voflix.me',
						listlink: true,
						use_proxy: false,
						search_url: 'https://www.voflix.me/search/#msearchword----------1---.html',
						search_json: false,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '-1-1.html',
						search_html_selector: 'div.module-card-item-title',
						link_folder: 'play/',
						detail_url_selector: 'div.module-play-list',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: true,
						js_execute_key: ['maccms', 'player_aaaa']
					},
					{
						name: '网站-神马影院',
						available: false,
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
						link_folder: 'play/',
						detail_url_selector: 'ul.stui-play__list',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: false,
						js_execute_key: ['maccms', 'player_aaaa']
					},
					{
						name: '网站-皮皮鸭',
						available: true,
						websitelink: 'https://www.pipiya.cc',
						listlink: true,
						use_proxy: false,
						search_url: 'https://www.pipiya.cc/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
						search_json: true,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '.html',
						search_html_selector: '',
						link_folder: 'voddetail/',
						detail_url_selector: 'ul.anthology-list-play:first',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: true,
						js_execute_key: ['maccms', 'player_aaaa']
					},
					{
						name: '网站-奇米动漫',
						available: true,
						websitelink: 'http://www.qimiqimi.net',
						listlink: true,
						use_proxy: false,
						search_url: 'http://www.qimiqimi.net/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
						search_json: true,
						node_json: 'list',
						name_json: 'name',
						id_json: 'id',
						first_page_json: '.html',
						search_html_selector: '',
						link_folder: 'detail/',
						detail_url_selector: 'a[href*="/1/"]',
						videoparse: 'default',
						videocontainer: '.MacPlayer',
						use_referer: true,
						js_execute_key: ['maccms', 'player_data']
					},
					// {
					//   name: '网站-剧荒TV',
					//   available: false,
					//   websitelink: 'https://juhuang.tv',
					//   listlink: true,
					//   use_proxy: false,
					//   search_url: 'https://so.juhuang.tv/soapi.php?wd=#msearchword',
					//   search_json: true,
					//   node_json: 'list',
					//   name_json: 'vod_name',
					//   id_json: 'vod_id',
					//   first_page_json: '_play_1_1.html',
					//   search_html_selector: '',
					//   link_folder: 'play',
					//   detail_url_selector: 'div.scroll-content',
					//   videoparse: 'default',
					//   videocontainer: '.MacPlayer',
					//   use_referer: false,
					//   js_execute_key: ['maccms', 'player_aaaa']
					// },
					// {
					//   name: '网站-厂长资源',
					//   available: false,
					//   websitelink: 'https://czzy01.com',
					//   listlink: false,
					//   use_proxy: false,
					//   search_url: 'https://czzy01.com/xssearch?q=#msearchword',
					//   search_json: false,
					//   node_json: '',
					//   name_json: '',
					//   id_json: '',
					//   first_page_json: '',
					//   search_html_selector: 'h3.dytit',
					//   link_folder: '',
					//   detail_url_selector: 'div.paly_list_btn',
					//   videoparse: 'default',
					//   videocontainer: '.MacPlayer',
					//   use_referer: true,
					//   js_execute_key: ['maccms', 'player_aaaa']
					// },
					{
						name: '网站-麦豆TV',
						available: false,
						websitelink: 'https://www.mdoutv.com',
						listlink: false,
						use_proxy: false,
						search_url: 'https://www.mdoutv.com/search/#msearchword',
						search_json: false,
						node_json: '',
						name_json: '',
						id_json: '',
						first_page_json: '',
						search_html_selector: 'h3.dytit',
						link_folder: '',
						detail_url_selector: 'div.paly_list_btn',
						videoparse: 'browser',
						videocontainer: '.viframe',
						use_referer: false,
						js_execute_key: []
					},
					// {
					//   name: '素白白',
					//   available: true,
					//   websitelink: 'https://www.subaibaiys.com',
					//   listlink: false,
					//   use_proxy: false,
					//   search_url: 'https://www.subaibaiys.com/search?q=#msearchword',
					//   search_json: false,
					//   node_json: '',
					//   name_json: '',
					//   id_json: '',
					//   first_page_json: '',
					//   search_html_selector: 'h3.dytit',
					//   link_folder: '',
					//   detail_url_selector: 'div.paly_list_btn',
					//   videoparse: 'default',
					//   videocontainer: '.MacPlayer',
					//   use_referer: true,
					//   js_execute_key: []
					// },
					// {
					//   name: '网站-独播库',
					//   available: true,
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
					//   link_folder: 'voddetail/',
					//   detail_url_selector: 'div.tab-content.myui-panel_bd',
					//   videoparse: 'default',
					//   videocontainer: '.MacPlayer',
					//   use_referer: false,
					//   js_execute_key: ['maccms', 'player_data']
					// },
					// {
					//   name: '网飞TV',
					//   available: false,
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
					// {
					//   name: '网站-鸭奈飞',
					//   available: false,
					//   websitelink: 'https://netflix.mom',
					//   listlink: true,
					//   use_proxy: false,
					//   search_url: 'https://netflix.mom/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
					//   search_json: true,
					//   node_json: 'list',
					//   name_json: 'name',
					//   id_json: 'id',
					//   first_page_json: '-1-1.html',
					//   search_html_selector: '',
					//   link_folder: 'vodplay',
					//   detail_url_selector: '.module-play-list:eq(0)',
					//   videoparse: 'default',
					//   videocontainer: '.MacPlayer',
					//   use_referer: false,
					//   js_execute_key: ['maccms', 'player_aaaa']
					// },
					// {
					//   name: '网站-爱看[!]',
					//   available: false,
					//   websitelink: 'https://ikan6.vip',
					//   listlink: true,
					//   use_proxy: false,
					//   search_url: 'https://ikan6.vip/index.php/ajax/suggest?mid=1&wd=#msearchword&limit=1',
					//   search_json: true,
					//   node_json: 'list',
					//   name_json: 'name',
					//   id_json: 'id',
					//   first_page_json: '-1-1.html',
					//   search_html_selector: '',
					//   link_folder: 'vodplay',
					//   detail_url_selector: 'ul.myui-content__list',
					//   videoparse: 'browser',
					//   videocontainer: '.MacPlayer',
					//   use_referer: true,
					//   js_execute_key: ['maccms', 'player_data']
					// },
					// {
					//   name: '黑洞网',
					//   vailable: false,
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
						channel_name: 'TG-阿里云盘发布频道2',
						channel_uri: 'shareAliyun'
					},
					// {
					//   channel_name: 'TG-阿里云盘盘',
					//   channel_uri: 'yunpanpan'
					// },
					{
						channel_name: 'TG-阿里云盘4K影视',
						channel_uri: 'Aliyun_4K_Movies'
					},
					// {
					//   channel_name: 'TG-在花盘',
					//   channel_uri: 'zaihuayun'
					// },
					{
						channel_name: 'TG-肯德基电影院',
						channel_uri: 'XiangxiuNB'
					},
					{
						channel_name: 'TG-全网云盘资源社',
						channel_uri: 'quanziyuanshe'
					},
					{
						channel_name: 'TG-阿里(高品质)影视',
						channel_uri: 'alyp_1'
					},
					{
						channel_name: 'TG-阿里云影视',
						channel_uri: 'aliyunys'
					},
				],
				"custom_function": [
					//   {
					// 	resource_name: '网站-低端视频',
					// 	function_name: 'ddys',
					// 	ext_js_url: ''
					//   },
					{
						resource_name: '网站-厂长资源*',
						function_name: 'czzy',
						ext_js_url: ''
					},
					{
						resource_name: '网站-哔嘀影视*',
						function_name: 'bdys',
						ext_js_url: ''
					},
					{
						resource_name: '网站-哔嘀影视2*',
						function_name: 'bdys1',
						ext_js_url: ''
					},
					{
						resource_name: '云盘-DYD',
						function_name: 'dyd',
						ext_js_url: 'https://qu.ax/Qroc.js'
					},
					{
						resource_name: '云盘-玩偶哥哥',
						function_name: 'wogg',
						ext_js_url: ''
					},
					{
						resource_name: '云盘-小雅Alist',
						function_name: 'xiaoyaalist',
						ext_js_url: ''
					},
					{
						resource_name: '云盘-霸王龙压制组',
						function_name: 'trex',
						ext_js_url: ''
					},
					// {
					// 	resource_name: 'VideoCDN',
					// 	function_name: 'collaps',
					// 	ext_js_url: ''
					// },
					// {
					// 	resource_name: 'Collaps',
					// 	function_name: 'collaps',
					// 	ext_js_url: ''
					// },
					// {
					// 	resource_name: 'Kinobase',
					// 	function_name: 'kinobase',
					// 	ext_js_url: ''
					// },
					// {
					// 	resource_name: 'Filmix',
					// 	function_name: 'filmix',
					// 	ext_js_url: ''
					// },
					// {
					// 	resource_name: 'CDNmovies',
					// 	function_name: 'cdnmovies',
					// 	ext_js_url: ''
					// },
					// {
					// 	resource_name: 'Rezka',
					// 	function_name: 'rezka',
					// 	ext_js_url: ''
					// },
				],
				"resource_site": [
					{
						site_name: '采集-1080资源库',
						site_search_url: 'https://api.1080zyku.com/inc/apijson.php?ac=search&wd=#msearchword',
						site_detail_url: 'https://api.1080zyku.com/inc/apijson.php?ac=detail&ids=#id'
					},
					{
						site_name: '采集-量子资源网',
						site_search_url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://cj.lziapi.com/api.php/provide/vod/?ac=search&wd=') + '#msearchword',
						site_detail_url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://cj.lziapi.com/api.php/provide/vod/?ac=detail&ids') + '=#id'
					},
					{
						site_name: '采集-非凡资源站',
						site_search_url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('http://cj.ffzyapi.com/api.php/provide/vod/?ac=search&wd=') + '#msearchword',
						site_detail_url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('http://cj.ffzyapi.com/api.php/provide/vod/?ac=detail&ids=') + '#id'
					},
					// {
					// 	site_name: '采集-无尽资源站',
					// 	site_search_url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://api.wujinapi.me/api.php/provide/vod/?ac=search&wd=') + '#msearchword',
					// 	site_detail_url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://api.wujinapi.me/api.php/provide/vod/?ac=detail&ids=') + '#id'
					// },
					// {
					//   site_name: '采集-人人影视',
					//   site_search_url: 'https://www.188zy.org/api.php/provide/vod/?ac=search&wd=#msearchword',
					//   site_detail_url: 'https://www.188zy.org/api.php/provide/vod/?ac=detail&ids=#id'
					// },
					// {
					//   site_name: '采集-人人影视',
					//   site_search_url: 'https://www.rrvipw.com/api.php/provide/vod/?ac=search&wd=#msearchword',
					//   site_detail_url: 'https://www.rrvipw.com/api.php/provide/vod/?ac=detail&ids=#id'
					// },
					// {
					//   site_name: '快播资源网',
					//   site_search_url: 'https://www.kuaibozy.com/api.php/provide/vod/?ac=search&wd=#msearchword',
					//   site_detail_url: 'https://www.kuaibozy.com/api.php/provide/vod/?ac=detail&ids=#id'
					// },
					// {
					//   site_name: '采集-iKun资源网',
					//   site_search_url: 'https://ikunzyapi.com/api.php/provide/vod/?ac=search&wd=#msearchword',
					//   site_detail_url: 'https://ikunzyapi.com/api.php/provide/vod/?ac=detail&ids=#id'
					// },
					// {
					//   site_name: '采集-极速资源网(有广告)',
					//   site_search_url: 'https://jszyapi.com/api.php/provide/vod/?ac=search&wd=#msearchword',
					//   site_detail_url: 'https://jszyapi.com/api.php/provide/vod/?ac=detail&ids=#id'
					// },
				],
			};

			var modsUseJsonUrl = Lampa.Storage.get('mods_use_json_url');
			if (Lampa.Storage.get('mods_use_json') && typeof modsUseJsonUrl === 'string' && modsUseJsonUrl.indexOf('http') !== -1) {
				$.ajax({
					url: Lampa.Storage.get('mods_use_json_url') + '?v=' + Math.random(),
					type: 'GET',
					async: false,
					dataType: 'json',
					success: function success(j) {
						var hasValidConfig = Object.keys(j).length > 0 && (j.hasOwnProperty("rule") || j.hasOwnProperty("tg_channel") || j.hasOwnProperty("custom_function") || j.hasOwnProperty("resource_site"));
						if (hasValidConfig) {
							extract_rule = j;
						} else {
							Lampa.Noty.show('外置视频源配置格式不正确，已使用内置规则。');
							extract_rule = inner_extract_rule;
						}
					},
					error: function error() {
						// Lampa.Noty.show('视频源配置无法加载，请检查JSON地址。');
						extract_rule = inner_extract_rule;
					}
				});
			} else {
				extract_rule = inner_extract_rule;
			};

			if (extract_rule.hasOwnProperty("rule")) {
				var filteredRule = extract_rule.rule.filter(function (fp) {
					return fp.available === true;
				});

				extract_rule.rule = filteredRule;
			}
			
			doregjson = extract_rule;
		}
	}; 
	var Filmix = {
  	network: new Lampa.Reguest(),
  	api_url: 'http://filmixapp.cyou/api/v2/',
  	token: Lampa.Storage.get('filmix_token', ''),
  	user_dev: 'user_dev_apk=2.0.9&user_dev_id=' + Lampa.Utils.uid(16) + '&user_dev_name=Xiaomi&user_dev_os=11&user_dev_vendor=Xiaomi&user_dev_token=',
  	add_new: function () {
  		var user_code = '';
  		var user_token = '';
  		var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">Ожидаем код...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
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
  					Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
  				}, function () {
  					Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
  				});
  			}
  		});
  		ping_auth = setInterval(function () {
  			Filmix.checkPro(user_token, function (json) {
  				if (json && json.user_data) {
  					Lampa.Modal.close();
  					clearInterval(ping_auth);
  					Lampa.Storage.set("filmix_token", user_token);
  					Filmix.token = user_token;
  					$('[data-name="filmix_token"] .settings-param__value').text(user_token);
  					Lampa.Controller.toggle('settings_component');
  				}
  			});
  		}, 2000);
  		this.network.clear();
  		this.network.timeout(10000);
  		this.network.quiet(this.api_url + 'token_request?' + this.user_dev, function (found) {
  			if (found.status == 'ok') {
  				user_token = found.code;
  				user_code = found.user_code;
  				modal.find('.selector').text(user_code);
  			} else {
  				Lampa.Noty.show(found);
  			}
  		}, function (a, c) {
  			Lampa.Noty.show(Filmix.network.errorDecode(a, c));
  		});
  	},
  	showStatus: function (ch) {
  		var status = Lampa.Storage.get("filmix_status", '{}');
  		var statuss = $('.settings-param__status', ch).removeClass('active error wait').addClass('wait');
  		var info = Lampa.Lang.translate('filmix_nodevice');
  		statuss.removeClass('wait').addClass('error');
  		if (status.login) {
  			statuss.removeClass('wait').addClass('active');
  			var foto = '<img width="30em" src="' + (status.foto.indexOf('noavatar') == -1 ? status.foto : './img/logo-icon.svg') + '"> <span style="vertical-align: middle;"><b style="font-size:1.3em;color:#FF8C00">' + status.login + '</b>';
  			if (status.is_pro || status.is_pro_plus) info = foto + ' - <b>' + (status.is_pro ? 'PRO' : 'PRO_PLUS') + '</b> ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date + '</span>';
  			else info = foto + ' - <b>NO PRO</b> - MAX 720p</span>';
  		}
  		if (ch) $('.settings-param__descr', ch).html(info);
  		else $('.settings-param__descr:eq(0)').html(info);
  	},
  	checkPro: function (token, call, err) {
  		if (!token && typeof call == 'function') call({});
  		this.network.clear();
  		this.network.timeout(8000);
  		token = token ? token : Lampa.Storage.get("filmix_token");
  		var url = this.api_url + 'user_profile?' + this.user_dev + token;
  		this.network.silent(url, function (json) {
  			window.FX.max_qualitie = 480;
  			window.FX.auth = false;
  		  window.FX.is_max_qualitie = false;
  			if (json) {
  				if (json.user_data) {
  			    window.FX.max_qualitie = 720;
  					Lampa.Storage.set("filmix_status", json.user_data);
  					if (typeof call == 'function') call(json);
  				} else {
  					Lampa.Storage.set("filmix_status", {});
  					if (typeof call == 'function') call({});
  				}
  				if(call) Filmix.showStatus();
  			}
  		}, function (a, c) {
  			if(err) err();
  			Lampa.Noty.show(Filmix.network.errorDecode(a, c));
  		});
  	}
  };
	// var ForkTV = {
	// 	network: new Lampa.Reguest(),
	// 	url: 'http://no_save.forktv.me',
	// 	forktv_id: Lampa.Storage.field('forktv_id'),
	// 	act_forktv_id: Lampa.Storage.field('act_forktv_id'),
	// 	user_dev: 'box_client=lg&box_mac=' + Lampa.Storage.field('forktv_id') + '&initial=ForkXMLviewer|' + Lampa.Storage.field('forktv_id') + '|web-android|' + Lampa.Storage.field('forktv_id') + '|MTY3MTgyOTI5NQR=E2161|DE0A8464D885761|android|1|Android_web-android&vr=0&platform=android&country=&tvp=0&hw=1.6&refresh=true',
	// 	openBrowser: function (url) {
	// 		if (Lampa.Platform.is('tizen')) {
	// 			var e = new tizen.ApplicationControl("https://tizen.org/appcontrol/operation/view", url);
	// 			tizen.application.launchAppControl(e, null, function () {}, function (e) {
	// 				Lampa.Noty.show(e);
	// 			});
	// 		} else if (Lampa.Platform.is('webos')) {
	// 			webOS.service.request("luna://com.webos.applicationManager", {
	// 				method: "launch",
	// 				parameters: {
	// 					id: "com.webos.app.browser",
	// 					params: {
	// 						target: url
	// 					}
	// 				},
	// 				onSuccess: function () {},
	// 				onFailure: function (e) {
	// 					Lampa.Noty.show(e);
	// 				}
	// 			});
	// 		} else window.open(url, '_blank');
	// 	},
	// 	init: function () {
	// 		if (Lampa.Storage.get('mods_fork')) this.check_forktv('', true);
	// 		if (this.forktv_id == 'undefined') {
	// 			this.forktv_id = this.create_dev_id();
	// 			Lampa.Storage.set('forktv_id', this.forktv_id);
	// 		}
	// 		if (this.act_forktv_id == 'undefined') {
	// 			this.act_forktv_id = this.create__id();
	// 			Lampa.Storage.set('act_forktv_id', this.act_forktv_id);
	// 		}
	// 	},
	// 	create__id: function () {
	// 	  var randomNum = Math.floor(Math.random() * 900000) + 100000;
	// 		return randomNum;
	// 	},
	// 	create_dev_id: function () {
	// 		var charsets, index, result;
	// 		result = "";
	// 		charsets = "0123456789abcdef";
	// 		while (result.length < 12) {
	// 			index = parseInt(Math.floor(Math.random() * 15));
	// 			result = result + charsets[index];
	// 		}
	// 		return result;
	// 	},
	// 	copyCode: function (id) {
	// 		Lampa.Utils.copyTextToClipboard(id, function () {
	// 			Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
	// 		}, function () {
	// 			Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
	// 		});
	// 	},
	// 	cats_fork: function (json) {
	// 		var item = [];
	// 		var get_cach = Lampa.Storage.get('ForkTv_cat', '');
	// 		if (!get_cach) {
	// 			json.forEach(function (itm, i) {
	// 			//	if (itm.title !== 'Новости' /* && itm.title !== 'IPTV'*/ ) {
	// 					item.push({
	// 						title: itm.title,
	// 						url: itm.playlist_url,
	// 						img: itm.logo_30x30,
	// 						checkbox: true
	// 					});
	// 				//}
	// 			});
	// 		} else item = get_cach.cat;

	// 		function select(where, a) {
	// 			where.forEach(function (element) {
	// 				element.selected = false;
	// 			});
	// 			a.selected = true;
	// 		}

	// 		function main() {
	// 			Lampa.Controller.toggle('settings_component');
	// 			var cache = Lampa.Storage.cache('ForkTv_cat', 1, {});
	// 			var catg = [];
	// 			item.forEach(function (a) {
	// 				catg.push(a);
	// 			});
	// 			if (catg.length > 0) {
	// 				cache = {
	// 					cat: catg
	// 				};
	// 				Lampa.Storage.set('ForkTv_cat', cache);
	// 			}
	// 			Lampa.Controller.toggle('settings');
	// 			Lampa.Activity.back();
	// 			ForkTV.parse();
	// 		}
	// 		Lampa.Select.show({
	// 			items: item,
	// 			title: get_cach ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
	// 			onBack: main,
	// 			onSelect: function onSelect(a) {
	// 				select(item, a);
	// 				main();
	// 			}
	// 		});
	// 	},
	// 	but_add: function () {
	// 		var ico = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>';
	// 		var menu_item = $('<li class="menu__item selector" data-action="forktv"><div class="menu__ico">' + ico + '</div><div class="menu__text">ForkTV</div></li>');
	// 		menu_item.on('hover:enter', this.parse);
	// 		$('body').find('[data-action="forktv"]').remove();
	// 		if (Lampa.Storage.get('mods_fork') && Lampa.Storage.get('forktv_auth')) $('.menu .menu__list').eq(0).append(menu_item);
	// 	},
	// 	updMac: function (itm) {
	// 		clearInterval(ping_auth);
	// 		ForkTV.check_forktv(itm);
	// 		Lampa.Noty.show('CODE ' + Lampa.Lang.translate('succes_update_noty'));
	// 	},
	// 	parse: function () {
	// 		ForkTV.check(ForkTV.url, function (json) {
	// 			json = json.channels;
	// 			if (json.length === 1) ForkTV.checkAdd();
	// 			else {
	// 				ForkTV.but_add();
	// 				if (Lampa.Storage.get('ForkTv_cat') !== '') {
	// 					var get_cach = Lampa.Storage.get('ForkTv_cat');
	// 					var itms = [];
	// 					get_cach.cat.forEach(function (it) {
	// 						if (it.checked) itms.push({
	// 							title: it.title,
	// 							playlist_url: it.url,
	// 							logo_30x30: it.img,
	// 							home: true
	// 						});
	// 					});
	// 					if (itms.length > 0) {
	// 						Lampa.Activity.push({
	// 							title: 'ForkTV',
	// 							url: {
	// 								channels: itms
	// 							},
	// 							submenu: true,
	// 							component: 'forktv',
	// 							page: 1
	// 						});
	// 					} else ForkTV.cats_fork(json);
	// 				} else ForkTV.cats_fork(json);
	// 			}
	// 		});
	// 	},
	// 	check_forktv: function (itm, ar) {
	// 		var status = $('.settings-param__status', itm).removeClass('active error wait').addClass('wait');
	// 		this.network["native"](ForkTV.url + '?' + ForkTV.user_dev, function (json) {
	// 			if (json.channels.length === 1) {
	// 		    ForkTV.act_forktv_id = json.channels[0].title;
	// 		    Lampa.Storage.set('act_forktv_id', ForkTV.act_forktv_id);
	// 				if (ar) {
	// 					Lampa.Storage.set('forktv_auth', false);
	// 					status.removeClass('wait').addClass('error');
	// 					$('.settings-param__descr', itm).text(Lampa.Lang.translate('filmix_nodevice'));
	// 					$('body').find('[data-action="forktv"]').remove();
	// 				} else {
	// 					ForkTV.checkAdd();
	// 					$('body').find('[data-action="forktv"]').remove();
	// 					$('.settings [data-static="true"]:eq(1), .settings [data-static="true"]:eq(2)').hide();
	// 					$('.settings [data-static="true"]:eq(0) .settings-param__status').removeClass('active').addClass('error');
	// 					$('.settings [data-static="true"]:eq(0) .settings-param__descr').text(Lampa.Lang.translate('filmix_nodevice'));
	// 				}
	// 			} else {
	// 				ForkTV.but_add();
	// 				Lampa.Storage.set('forktv_auth', true);
	// 				status.removeClass('wait').addClass('active');
	// 				if (itm) {
	// 					if (itm.text().indexOf('код') == -1 || itm.text().indexOf('code') == -1) $('.settings-param__descr', itm).html('<img width="30em" src="./img/logo-icon.svg"> <b style="vertical-align: middle;font-size:1.4em;color:#FF8C00">' + Lampa.Lang.translate('account_authorized') + '</b>');
	// 					if (itm.find('.settings-param__name').text().indexOf('раздел') > -1 || itm.find('.settings-param__name').text().indexOf('Sections') > -1) ForkTV.cats_fork(json.channels);
	// 				}
	// 			}
	// 		}, function (e) {
	// 			if (ar) {
	// 				Lampa.Storage.set('forktv_auth', false);
	// 				status.removeClass('wait').addClass('error');
	// 				$('.settings-param__descr', itm).text(Lampa.Lang.translate('filmix_nodevice'));
	// 				$('body').find('[data-action="forktv"]').remove();
	// 			} else {
	// 				ForkTV.checkAdd();
	// 				$('body').find('[data-action="forktv"]').remove();
	// 				$('.settings [data-static="true"]:eq(0) .settings-param__status').removeClass('active').addClass('error');
	// 				$('.settings [data-static="true"]:eq(0) .settings-param__descr').text(Lampa.Lang.translate('filmix_nodevice'));
	// 				$('.settings [data-static="true"]:eq(1), .settings [data-static="true"]:eq(2)').hide();
	// 			}
	// 		}, false, {
	// 			dataType: 'json'
	// 		});
	// 	},
	// 	checkAdd: function () {
  	// 	var enabled = Lampa.Controller.enabled().name;
	// 		ForkTV.check(ForkTV.url, function (json) {
	// 		  var title = json.channels[0].title;
	// 		  var id = json.channels[0].description.match(/> (\d+)</)[1];
	// 		  ForkTV.act_forktv_id = id;
	// 			var modal = $('<div><div class="broadcast__text" style="text-align:left">' + Lampa.Lang.translate('fork_auth_modal_title') + '</div><div class="broadcast__device selector" style="background-color:#fff;color:#000;text-align: center">' + ForkTV.act_forktv_id + '</div></div><br><div class="broadcast__scan"><div></div></div><br><div class="broadcast__text">' + Lampa.Lang.translate('fork_modal_wait') + '</div></div>');
  	// 		Lampa.Modal.open({
  	// 			title: title,
  	// 			html: modal,
  	// 			size: 'small',
  	// 			mask: true,
  	// 			onBack: function onBack() {
  	// 				clearInterval(ping_auth);
  	// 				Lampa.Modal.close();
  	// 				Lampa.Controller.toggle(enabled);
  	// 			},
  	// 			onSelect: function onSelect() {
  	// 				ForkTV.copyCode(ForkTV.act_forktv_id);
  	// 			}
  	// 		});
  	// 		if (!Lampa.Platform.tv()) {
  	// 			setTimeout(function () {
  	// 				ForkTV.copyCode(id);
  	// 			}, 1000);
  	// 		}
  	// 		modal.find('a').on('click', function () {
  	// 			ForkTV.openBrowser('http://forktv.me');
  	// 		});
	// 		});
			
	// 		ping_auth = setInterval(function () {
	// 			ForkTV.check(ForkTV.url, function () {
	// 				Lampa.Modal.close();
	// 				clearInterval(ping_auth);
	// 				if (enabled == 'settings_component') Lampa.Activity.back();
	// 				Lampa.Controller.toggle(enabled);
	// 				Lampa.Storage.set('forktv_auth', true);
	// 				ForkTV.parse();
	// 			}, true);
	// 		}, 5000);
	// 	},
	// 	check: function (url, call, ar) {
	// 		this.network.clear();
	// 		this.network.timeout(8000);
	// 		this.network["native"](url + '?' + ForkTV.user_dev, function (json) {
	// 			if (json) {
	// 			  if (ar && json.channels.length > 1) {
	// 					if (call) call(json);
	// 				} else if (!ar) call(json);
	// 			}
	// 		}, function (a, c) {
	// 			Lampa.Noty.show(ForkTV.network.errorDecode(a, c));
	// 		});
	// 	}
	// };
	var Pub = {
  	network: new Lampa.Reguest(),
  	baseurl: 'https://api.service-kp.com/',
  	tock: 'uirmqgdg5s3w9sq05udmjlca897oxrgk',
  	token: Lampa.Storage.get('pub_access_token', 'uirmqgdg5s3w9sq05udmjlca897oxrgk'),
  	openBrowser: function (url) {
  		if (Lampa.Platform.is('tizen')) {
  			var e = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", url);
  			tizen.application.launchAppControl(e, null, function (r) {}, function (e) {
  				Lampa.Noty.show(e);
  			});
  		} else if (Lampa.Platform.is('webos')) {
  			webOS.service.request("luna://com.webos.applicationManager", {
  				method: "launch",
  				parameters: {
  					id: "com.webos.app.browser",
  					params: {
  						target: url
  					}
  				},
  				onSuccess: function () {},
  				onFailure: function (e) {
  					Lampa.Noty.show(e);
  				}
  			});
  		} else window.open(url, '_blank');
  	},
  	Auth_pub: function () {
  		Pub.network.silent(Pub.baseurl + 'oauth2/device', function (json) {
  			Lampa.Storage.set('pub_user_code', json.user_code);
  			Lampa.Storage.set('pub_code', json.code);
  			Pub.checkAdd();
  		}, function (a, c) {
  			Lampa.Noty.show(Pub.network.errorDecode(a, c));
  		}, {
  			'grant_type': 'device_code',
  			'client_id': 'xbmc',
  			'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
  		});
  	},
  	checkAdd: function () {
  		var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('pub_modal_title') + '</div><div class="broadcast__device selector" style="background-color:#fff;color:#000;text-align: center"></div></div><br><div class="broadcast__scan"><div></div></div><br><div class="broadcast__text"><b style="font-size:1em">' + Lampa.Lang.translate('pub_title_wait') + '</b></div></div>');
  		Lampa.Modal.open({
  			title: '',
  			html: modal,
  			size: 'small',
  			mask: true,
  			onBack: function onBack() {
  				Lampa.Modal.close();
  				clearInterval(ping_auth);
  				Lampa.Controller.toggle('settings_component');
  			},
  			onSelect: function onSelect() {
  				if (!Lampa.Platform.tv()) {
  					Lampa.Utils.copyTextToClipboard(Lampa.Storage.get('pub_user_code'), function () {
  						Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
  					}, function () {
  						Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
  					});
  				} else Pub.openBrowser('http://kino.pub');
  			}
  		});
  		modal.find('a').on('click', function () {
  			Pub.openBrowser('http://kino.pub');
  		});
  		modal.find('.selector').text(Lampa.Storage.get('pub_user_code'));
  		var check = function check(url, call) {
  			Pub.network.clear();
  			Pub.network.timeout(8000);
  			Pub.network.silent(url, function (json) {
  				Lampa.Storage.set('pub_access_token', json.access_token);
  				Lampa.Storage.set('pub_refresh_token', json.refresh_token);
  				Pub.token = Lampa.Storage.get('pub_access_token');
  				if (!Lampa.Platform.is('android')) var uas = navigator.userAgent.match(/((.*?))/i)[1].split(';');
  				Pub.network.silent(Pub.baseurl + 'v1/device/info?access_token=' + json.access_token, function (json) {
  					Pub.network.silent(Pub.baseurl + 'v1/device/notify?access_token=' + Pub.token, function (json) {
  						if (call) call();
  					}, function (a, c) {
  						Lampa.Noty.show(Pub.network.errorDecode(a, c));
  					}, {
  						'title': Lampa.Platform.is('android') ? 'KinoPub Android-Lampa' : uas.length > 3 ? 'Kinopub TV-Lampa' : uas[0] + ' ' + Lampa.Platform.get().toUpperCase(),
  						'hardware': Lampa.Platform.is('android') ? 'Android 10' : uas[2],
  						'software': Lampa.Platform.is('android') ? 'Android' : uas.length > 3 ? uas[1] : uas[0]
  					});
  				});
  			}, false, {
  				'grant_type': 'device_token',
  				'client_id': 'xbmc',
  				'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh',
  				'code': Lampa.Storage.get('pub_code')
  			});
  		};
  		ping_auth = setInterval(function () {
  			check(Pub.baseurl + 'oauth2/device', function () {
  				clearInterval(ping_auth);
  				Lampa.Modal.close();
  				Lampa.Storage.set('logined_pub', true);
  				Lampa.Settings.update();
  			});
  		}, 5000);
  	},
  	refreshTok: function () {
  		this.network.silent(Pub.baseurl + 'oauth2/token', function (json) {
  			Lampa.Storage.set('pub_access_token', json.access_token);
  			Lampa.Storage.set('pub_refresh_token', json.refresh_token);
  			Pub.token = Lampa.Storage.get('pub_access_token');
  			Lampa.Noty.show('ТОКЕН обновлён');
  		}, function (a, c) {
  			Lampa.Noty.show(Pub.network.errorDecode(a, c));
  		}, {
  			'grant_type': 'refresh_token',
  			'refresh_token': Lampa.Storage.get('pub_refresh_token'),
  			'client_id': 'xbmc',
  			'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
  		});
  	},
  	userInfo: function (itm, ur) {
  		var status = $('.settings-param__status', itm).removeClass('active error wait').addClass('wait');
  		if (!Pub.token) status.removeClass('wait').addClass('error');
  		else {
  			this.network.silent(Pub.baseurl + 'v1/user?access_token=' + Pub.token, function (json) {
  				$('.settings-param__' + (!ur ? 'name' : 'descr'), itm).html('<img width="30em" src="' + json.user.profile.avatar + '">  <span style="vertical-align: middle;"><b style="font-size:1.4em;color:#FF8C00">' + json.user.username + '</b> - ' + Lampa.Lang.translate('pub_title_left_days') + '<b>' + json.user.subscription.days + '</b> ' + Lampa.Lang.translate('pub_title_left_days_d') + '</span>');
  				$('.settings-param__' + (!ur ? 'descr' : ''), itm).html(Lampa.Lang.translate('pub_title_regdate') + ' ' + Lampa.Utils.parseTime(json.user.reg_date * 1000).full + '<br>' + (json.user.subscription.active ? Lampa.Lang.translate('pub_date_end_pro') + ' ' + Lampa.Utils.parseTime(json.user.subscription.end_time * 1000).full : '<b style="color:#cdd419">' + Lampa.Lang.translate('pub_title_not_pro') + '</b>'));
  				status.removeClass('wait').addClass('active');
  				Lampa.Storage.set('logined_pub', true);
  				Lampa.Storage.set('pro_pub', json.user.subscription.active);
  			}, function (a, c) {
  				status.removeClass('wait').addClass('error');
  				Lampa.Storage.set('pro_pub', false);
  				Lampa.Storage.set('pub_access_token', '');
  				Lampa.Storage.set('logined_pub', false);
  				Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
  				Pub.userInfo(itm, ur);
  			});
  		}
  	},
  	info_device: function () {
  		this.network.silent(Pub.baseurl + 'v1/device/info?access_token=' + Pub.token, function (json) {
  			var enabled = Lampa.Controller.enabled().name;
  			var opt = json.device.settings;
  			var subtitle = {
  				supportSsl: {
  					title: 'Использовать SSL (https) для картинок и видео'
  				},
  				supportHevc: {
  					title: 'HEVC или H.265 — формат Видеосжатия с применением более эффективных алгоритмов по сравнению с H.264/AVC. Убедитесь, что ваше устройство поддерживает Данный формат.'
  				},
  				support4k: {
  					title: '4K или Ultra HD - фильм в сверхвысокой чёткости 2160p. Убедитесь, что ваше устройство и ТВ, поддерживает данный формат.'
  				},
  				mixedPlaylist: {
  					title: 'Плейлист с AVC и HEVC потоками. В зависимости от настроек, устройство будет автоматически проигрывать нужный поток. Доступно только для 4К - фильмов. Убедитесь, что ваше устройство поддерживает данный формат плейлиста.'
  				},
  				HTTP: {
  					title: 'Неадаптивный, качество через настройки (Настройки > плеер > качество видео), все аудио, нет сабов.'
  				},
  				HLS: {
  					title: 'Неадаптивный, качество через настройки, одна аудиодорожка, нет сабов.'
  				},
  				HLS2: {
  					title: 'Адаптивный, качество автоматом, одна аудиодорожка, нет сабов.'
  				},
  				HLS4: {
  					title: 'Рекомендуется! - Адаптивный, качество автоматом, все аудио, сабы.'
  				}
  			};
  			var item = [{
  				title: 'Тип потока',
  				value: opt.streamingType,
  				type: 'streamingType'
  		}, {
  				title: 'Переключить сервер',
  				value: opt.serverLocation,
  				type: 'serverLocation'
  		}];
  			Lampa.Arrays.getKeys(opt).forEach(function (key) {
  				var k = opt[key];
  				if (!k.type && ['supportHevc', 'support4k'].indexOf(key) > - 1) item.push({
  					title: k.label,
  					value: k.value,
  					type: key,
  					subtitle: subtitle[key] && subtitle[key].title,
  					checkbox: k.type ? false : true,
  					checked: k.value == 1 ? true : false
  				});
  			});
  
  			function main(type, value) {
  				var edited = {};
  				item.forEach(function (a) {
  					if (a.checkbox) edited[a.type] = a.checked ? 1 : 0;
  				});
  				if (type) edited[type] = value;
  				Pub.network.silent(Pub.baseurl + 'v1/device/' + json.device.id + '/settings?access_token=' + Pub.token, function (json) {
  					Lampa.Noty.show(Lampa.Lang.translate('pub_device_options_edited'));
  					Lampa.Controller.toggle(enabled);
  				}, function (a, c) {
  					Lampa.Noty.show(Pub.network.errorDecode(a, c));
  				}, edited);
  			}
  			Lampa.Select.show({
  				items: item,
  				title: Lampa.Lang.translate('pub_device_title_options'),
  				onBack: main,
  				onSelect: function (i) {
  					var serv = [];
  					i.value.value.forEach(function (i) {
  						serv.push({
  							title: i.label,
  							value: i.id,
  							subtitle: subtitle[i.label] && subtitle[i.label].title,
  							selected: i.selected
  						});
  					});
  					Lampa.Select.show({
  						items: serv,
  						title: i.title,
  						onBack: main,
  						onSelect: function (a) {
  							main(i.type, a.value);
  						}
  					});
  				}
  			});
  		}, function (a, c) {
  			Lampa.Noty.show(Pub.network.errorDecode(a, c));
  		});
  	},
  	delete_device: function (call) {
  		this.network.silent(Pub.baseurl + 'v1/device/unlink?access_token=' + Pub.token, function (json) {
  			Lampa.Noty.show(Lampa.Lang.translate('pub_device_dell_noty'));
  			Lampa.Storage.set('logined_pub', false);
  			Lampa.Storage.set('pub_access_token', '');
  			Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
  			if (call) call();
  		}, function (a, c) {
  			Lampa.Noty.show(Lampa.Lang.translate('pub_device_dell_noty'));
  			Lampa.Storage.set('logined_pub', false);
  			Lampa.Storage.set('pub_access_token', '');
  			Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
  			if (call) call();
  			Lampa.Noty.show(Pub.network.errorDecode(a, c));
  		}, {});
  	}
  };
	// var Douban = {
	// 	network: new Lampa.Reguest(),
	// 	baseurl: 'https://frodo.douban.com/api/v2/',
	// 	apiKey: '0ac44ae016490db2204ce0a042db2916',
	// 	browserheader: {
    //         "Host": "frodo.douban.com",
    //         "Connection": "Keep-Alive",
    //         "Referer": "https://servicewechat.com/wx2f9b06c1de1ccfca/84/page-frame.html",
    //         "User-Agent": "MicroMessenger/"
    // },
	// class_url:'interests&hot_gaia&tv_hot&show_hot&movie&tv&rank_list_movie&rank_list_tv',
    // filter:{'interests': [{'key': 'status', 'name': '状态', 'value': [{'n': '想看', 'v': 'mark'}, {'n': '在看', 'v': 'doing'}, {'n': '看过', 'v': 'done'}]}, {'key': 'subtype_tag', 'name': '形式', 'value': [{'n': '全部', 'v': ''}, {'n': '电影', 'v': 'movie'}, {'n': '电视', 'v': 'tv'}]}, {'key': 'year_tag', 'name': '年代', 'value': [{'n': '全部', 'v': '全部'}, {'n': '2023', 'v': '2023'}, {'n': '2022', 'v': '2022'}, {'n': '2021', 'v': '2021'}, {'n': '2020', 'v': '2020'}, {'n': '2019', 'v': '2019'}, {'n': '2010年代', 'v': '2010年代'}, {'n': '2000年代', 'v': '2000年代'}, {'n': '90年代', 'v': '90年代'}, {'n': '80年代', 'v': '80年代'}, {'n': '70年代', 'v': '70年代'}, {'n': '60年代', 'v': '60年代'}, {'n': '更早', 'v': '更早'}]}], 'hot_gaia': [{'key': 'sort', 'name': '排序', 'value': [{'n': '热度', 'v': 'recommend'}, {'n': '最新', 'v': 'time'}, {'n': '评分', 'v': 'rank'}]}, {'key': 'area', 'name': '地区', 'value': [{'n': '全部', 'v': '全部'}, {'n': '华语', 'v': '华语'}, {'n': '欧美', 'v': '欧美'}, {'n': '韩国', 'v': '韩国'}, {'n': '日本', 'v': '日本'}]}], 'tv_hot': [{'key': 'type', 'name': '分类', 'value': [{'n': '综合', 'v': 'tv_hot'}, {'n': '国产剧', 'v': 'tv_domestic'}, {'n': '欧美剧', 'v': 'tv_american'}, {'n': '日剧', 'v': 'tv_japanese'}, {'n': '韩剧', 'v': 'tv_korean'}, {'n': '动画', 'v': 'tv_animation'}]}], 'show_hot': [{'key': 'type', 'name': '分类', 'value': [{'n': '综合', 'v': 'show_hot'}, {'n': '国内', 'v': 'show_domestic'}, {'n': '国外', 'v': 'show_foreign'}]}], 'movie': [{'key': '类型', 'name': '类型', 'value': [{'n': '全部类型', 'v': ''}, {'n': '喜剧', 'v': '喜剧'}, {'n': '爱情', 'v': '爱情'}, {'n': '动作', 'v': '动作'}, {'n': '科幻', 'v': '科幻'}, {'n': '动画', 'v': '动画'}, {'n': '悬疑', 'v': '悬疑'}, {'n': '犯罪', 'v': '犯罪'}, {'n': '惊悚', 'v': '惊悚'}, {'n': '冒险', 'v': '冒险'}, {'n': '音乐', 'v': '音乐'}, {'n': '历史', 'v': '历史'}, {'n': '奇幻', 'v': '奇幻'}, {'n': '恐怖', 'v': '恐怖'}, {'n': '战争', 'v': '战争'}, {'n': '传记', 'v': '传记'}, {'n': '歌舞', 'v': '歌舞'}, {'n': '武侠', 'v': '武侠'}, {'n': '情色', 'v': '情色'}, {'n': '灾难', 'v': '灾难'}, {'n': '西部', 'v': '西部'}, {'n': '纪录片', 'v': '纪录片'}, {'n': '短片', 'v': '短片'}]}, {'key': '地区', 'name': '地区', 'value': [{'n': '全部地区', 'v': ''}, {'n': '华语', 'v': '华语'}, {'n': '欧美', 'v': '欧美'}, {'n': '韩国', 'v': '韩国'}, {'n': '日本', 'v': '日本'}, {'n': '中国大陆', 'v': '中国大陆'}, {'n': '美国', 'v': '美国'}, {'n': '中国香港', 'v': '中国香港'}, {'n': '中国台湾', 'v': '中国台湾'}, {'n': '英国', 'v': '英国'}, {'n': '法国', 'v': '法国'}, {'n': '德国', 'v': '德国'}, {'n': '意大利', 'v': '意大利'}, {'n': '西班牙', 'v': '西班牙'}, {'n': '印度', 'v': '印度'}, {'n': '泰国', 'v': '泰国'}, {'n': '俄罗斯', 'v': '俄罗斯'}, {'n': '加拿大', 'v': '加拿大'}, {'n': '澳大利亚', 'v': '澳大利亚'}, {'n': '爱尔兰', 'v': '爱尔兰'}, {'n': '瑞典', 'v': '瑞典'}, {'n': '巴西', 'v': '巴西'}, {'n': '丹麦', 'v': '丹麦'}]}, {'key': 'sort', 'name': '排序', 'value': [{'n': '近期热度', 'v': 'T'}, {'n': '首映时间', 'v': 'R'}, {'n': '高分优先', 'v': 'S'}]}, {'key': '年代', 'name': '年代', 'value': [{'n': '全部年代', 'v': ''}, {'n': '2023', 'v': '2023'}, {'n': '2022', 'v': '2022'}, {'n': '2021', 'v': '2021'}, {'n': '2020', 'v': '2020'}, {'n': '2019', 'v': '2019'}, {'n': '2010年代', 'v': '2010年代'}, {'n': '2000年代', 'v': '2000年代'}, {'n': '90年代', 'v': '90年代'}, {'n': '80年代', 'v': '80年代'}, {'n': '70年代', 'v': '70年代'}, {'n': '60年代', 'v': '60年代'}, {'n': '更早', 'v': '更早'}]}], 'tv': [{'key': '类型', 'name': '类型', 'value': [{'n': '不限', 'v': ''}, {'n': '电视剧', 'v': '电视剧'}, {'n': '综艺', 'v': '综艺'}]}, {'key': '电视剧形式', 'name': '电视剧形式', 'value': [{'n': '不限', 'v': ''}, {'n': '喜剧', 'v': '喜剧'}, {'n': '爱情', 'v': '爱情'}, {'n': '悬疑', 'v': '悬疑'}, {'n': '动画', 'v': '动画'}, {'n': '武侠', 'v': '武侠'}, {'n': '古装', 'v': '古装'}, {'n': '家庭', 'v': '家庭'}, {'n': '犯罪', 'v': '犯罪'}, {'n': '科幻', 'v': '科幻'}, {'n': '恐怖', 'v': '恐怖'}, {'n': '历史', 'v': '历史'}, {'n': '战争', 'v': '战争'}, {'n': '动作', 'v': '动作'}, {'n': '冒险', 'v': '冒险'}, {'n': '传记', 'v': '传记'}, {'n': '剧情', 'v': '剧情'}, {'n': '奇幻', 'v': '奇幻'}, {'n': '惊悚', 'v': '惊悚'}, {'n': '灾难', 'v': '灾难'}, {'n': '歌舞', 'v': '歌舞'}, {'n': '音乐', 'v': '音乐'}]}, {'key': '综艺形式', 'name': '综艺形式', 'value': [{'n': '不限', 'v': ''}, {'n': '真人秀', 'v': '真人秀'}, {'n': '脱口秀', 'v': '脱口秀'}, {'n': '音乐', 'v': '音乐'}, {'n': '歌舞', 'v': '歌舞'}]}, {'key': '地区', 'name': '地区', 'value': [{'n': '全部地区', 'v': ''}, {'n': '华语', 'v': '华语'}, {'n': '欧美', 'v': '欧美'}, {'n': '国外', 'v': '国外'}, {'n': '韩国', 'v': '韩国'}, {'n': '日本', 'v': '日本'}, {'n': '中国大陆', 'v': '中国大陆'}, {'n': '中国香港', 'v': '中国香港'}, {'n': '美国', 'v': '美国'}, {'n': '英国', 'v': '英国'}, {'n': '泰国', 'v': '泰国'}, {'n': '中国台湾', 'v': '中国台湾'}, {'n': '意大利', 'v': '意大利'}, {'n': '法国', 'v': '法国'}, {'n': '德国', 'v': '德国'}, {'n': '西班牙', 'v': '西班牙'}, {'n': '俄罗斯', 'v': '俄罗斯'}, {'n': '瑞典', 'v': '瑞典'}, {'n': '巴西', 'v': '巴西'}, {'n': '丹麦', 'v': '丹麦'}, {'n': '印度', 'v': '印度'}, {'n': '加拿大', 'v': '加拿大'}, {'n': '爱尔兰', 'v': '爱尔兰'}, {'n': '澳大利亚', 'v': '澳大利亚'}]}, {'key': 'sort', 'name': '排序', 'value': [{'n': '近期热度', 'v': 'T'}, {'n': '首播时间', 'v': 'R'}, {'n': '高分优先', 'v': 'S'}]}, {'key': '年代', 'name': '年代', 'value': [{'n': '全部', 'v': ''}, {'n': '2023', 'v': '2023'}, {'n': '2022', 'v': '2022'}, {'n': '2021', 'v': '2021'}, {'n': '2020', 'v': '2020'}, {'n': '2019', 'v': '2019'}, {'n': '2010年代', 'v': '2010年代'}, {'n': '2000年代', 'v': '2000年代'}, {'n': '90年代', 'v': '90年代'}, {'n': '80年代', 'v': '80年代'}, {'n': '70年代', 'v': '70年代'}, {'n': '60年代', 'v': '60年代'}, {'n': '更早', 'v': '更早'}]}, {'key': '平台', 'name': '平台', 'value': [{'n': '全部', 'v': ''}, {'n': '腾讯视频', 'v': '腾讯视频'}, {'n': '爱奇艺', 'v': '爱奇艺'}, {'n': '优酷', 'v': '优酷'}, {'n': '湖南卫视', 'v': '湖南卫视'}, {'n': 'Netflix', 'v': 'Netflix'}, {'n': 'HBO', 'v': 'HBO'}, {'n': 'BBC', 'v': 'BBC'}, {'n': 'NHK', 'v': 'NHK'}, {'n': 'CBS', 'v': 'CBS'}, {'n': 'NBC', 'v': 'NBC'}, {'n': 'tvN', 'v': 'tvN'}]}], 'rank_list_movie': [{'key': '榜单', 'name': '榜单', 'value': [{'n': '实时热门电影', 'v': 'movie_real_time_hotest'}, {'n': '一周口碑电影榜', 'v': 'movie_weekly_best'}, {'n': '豆瓣电影Top250', 'v': 'movie_top250'}]}], 'rank_list_tv': [{'key': '榜单', 'name': '榜单', 'value': [{'n': '实时热门电视', 'v': 'tv_real_time_hotest'}, {'n': '华语口碑剧集榜', 'v': 'tv_chinese_best_weekly'}, {'n': '全球口碑剧集榜', 'v': 'tv_global_best_weekly'}, {'n': '国内口碑综艺榜', 'v': 'show_chinese_best_weekly'}, {'n': '国外口碑综艺榜', 'v': 'show_global_best_weekly'}]}]},
    // limit:20,
	// };
	
	
  function web(component, _object, doreg) {
    var network = new Lampa.Reguest();
    var extract = {};
	var results = [];
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var choice = {
		season: 0,
		voice: 0,
		voice_name: '',
		voice_id: 0, 
		order: 0
	};
    var get_links_wait = false;
    var proxy_url;
    var proxy = 'https://cors.eu.org/';
    var proxy_alt = 'https://api.allorigins.win/raw?url=';
  
    this.searchByTitle = function (_object, kinopoisk_id) {
      object = _object;
      select_title = object.search || object.movie.title;
    //   doreg = rule;
      get_links_wait = true;
      var url1 = doreg.search_url.replace('#msearchword', encodeURIComponent(select_title.replace(/第(.+)季/, '')));
      if (doreg.use_proxy) {
          proxy_url = proxy;
          proxy_alt = proxy_alt;
      } else {
          proxy_url = '';
          proxy_alt = '';
      };

      var ifjson = doreg.search_json ? "json" : "text";
      network.clear();
      network.timeout(1000 * 15);
      network["native"](proxy_url + url1, function (str) {
        // var parsedData = doreg.search_json ? str : str;
        var parsedData = str;

        var searchresult = doreg.search_json ? (parsedData.code === 999 ? 0 : (parsedData[doreg.node_json] ? parsedData[doreg.node_json].length : 0)) : $(doreg.search_html_selector, parsedData).find('a').length;

        if (searchresult > 0) {
          parse(parsedData);
        } else component.emptyForQuery(select_title);

        component.loading(false);
      }, function (a, c) {
        component.empty(network.errorDecode(a, c));
      }, false, {
        dataType: ifjson
      });
    };
	this.extendChoice = function (saved) {
		Lampa.Arrays.extend(choice, saved, true);
	};
	this.reset = function () {
		component.reset();
		choice = {
		  season: 0,
		  voice: 0,
		  voice_name: '',
		  voice_id: 0, 
		  order: 0
		};
		filter();
		append(filtred());
	};
	this.filter = function (type, a, b) {
		choice[a.stype] = b.index;
	
		if (a.stype == 'voice') {
		  choice.voice_name = filter_items.voice[b.index];
		  choice.voice_id = filter_items.voice_info[b.index] && filter_items.voice_info[b.index].id;
		}
	
		component.reset();
		filter();
		append(filtred());
	};
	this.destroy = function () {
		network.clear();
		results = null;
	};

    function parse(str) {
      if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
      var item = {};
      var doonce = 0;
		if (doreg.search_json) {
			try {
				str[doreg.node_json].forEach(function (e) {
					item.Title = e[doreg.name_json];
					item.Link = doreg.websitelink + '/' + doreg.link_folder + e[doreg.id_json] + doreg.first_page_json;
					// item.Link = doreg.websitelink + '/' + doreg.link_folder + '/' + e[doreg.id_json] + doreg.first_page_json;
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
			if (str.includes('https://ddys.pro')) {
				var regex = /第(\d+)季/;
				var match_ = regex.exec($('h2 > a', str).text()) ? regex.exec($('h2 > a', str).text())[1] + "/" : "";
			}
			var math = $(doreg.search_html_selector, str.replace(/\n|\r/g, ''));
			$(math).find('a').each(function (i, a) {
				item.Title = ($(a).attr('title') || $(a).text());
				if (str.includes('https://ddys.pro')) {
					item.Link = $(a).attr('href').indexOf('http') == -1 ? 'https://ddys.art/' + $(a).attr('href') + match_ : $(a).attr('href') + match_;
				} else {
					item.Link = $(a).attr('href').indexOf('http') == -1 ? doreg.websitelink + $(a).attr('href') : $(a).attr('href');
				}
				dodetail(item.Link, str, item.Title);
				doonce++;
				if (doonce === 1) return false;
			});


			$(math).remove();
		};
    };

	  function dodetail(link, data, title) {
		  var hasSeason = object.hasOwnProperty("movie") && object.movie.hasOwnProperty("number_of_seasons");

		  // console.log(object,component.seasonNumber(title),title,hasSeason)
		  //取得具体页面的详情地址
		  if (doreg.use_proxy) {
			  proxy_url = proxy;
			  proxy_alt = proxy_alt;
		  } else {
			  proxy_url = '';
			  proxy_alt = '';
		  };

		  network["native"](proxy_url + link, function (data) {
			  // console.log(component.extractTitleContent(data))
			  if (link.includes('ddys')) {
				  var playlistScript = $(doreg.detail_url_selector, data).text();
				  var playlistData = JSON.parse(playlistScript);

				  playlistData.tracks.forEach(function (html) {
					  results.push({
						  file: "https://ddys.pro/getvddr2/video?type=mix&id=" + html.src1,
						  quality: '低端影视 / ' + html.caption,
						  title: html.caption,
						  season: object.ext_seasonnumber ? object.ext_seasonnumber : (component.seasonNumber(title) !== '' ? component.seasonNumber(title) : (hasSeason ? 1 : (component.episodeNumber(html.caption) ? 1 : ''))),
						  episode: object.ext_seasonnumber ? component.extractEpisodeNumber(html.caption) : (component.seasonNumber(title) !== '' ? component.extractEpisodeNumber(html.caption) : (hasSeason ? component.extractEpisodeNumber(html.caption) : (component.episodeNumber(html.caption) ? component.extractEpisodeNumber(html.caption) : ''))),
						  info: '',
						  src: html.src1
					  });
				  });
			  } else {
				  var math = $(doreg.detail_url_selector, data.replace(/\n|\r/g, '').replace(/href="javascript:;"/g, ''));
				  // results = [];
				  if ($(math).find('a').length) {
					  $(math).find('a').each(function (i, a) {
						  results.push({
							  file: doreg.listlink ? doreg.websitelink + $(a).attr('href') : $(a).attr('href'),
							  quality: doreg.name + ' / ' + ($(a).text() || $(a).attr('title')),
							  title: title,
							  season: object.ext_seasonnumber ? object.ext_seasonnumber : (component.seasonNumber(title) !== '' ? component.seasonNumber(title) : (hasSeason ? 1 : (component.episodeNumber($(a).text() || $(a).attr('title')) ? 1 : ''))),
							  episode: object.ext_seasonnumber ? component.extractEpisodeNumber($(a).text() || $(a).attr('title')) : (component.seasonNumber(title) !== '' ? component.extractEpisodeNumber($(a).text() || $(a).attr('title')) : (hasSeason ? component.extractEpisodeNumber($(a).text() || $(a).attr('title')) : (component.episodeNumber($(a).text() || $(a).attr('title')) ? component.extractEpisodeNumber($(a).text() || $(a).attr('title')) : ''))),
							  info: ''
						  });
					  });
				  } else {
					  $(math, data).each(function (i, a) {
						  results.push({
							  file: doreg.listlink ? doreg.websitelink + $(a).attr('href') : $(a).attr('href'),
							  quality: doreg.name + ' / ' + ($(a).text() || $(a).attr('title')),
							  title: title,
							  season: object.ext_seasonnumber ? object.ext_seasonnumber : (component.seasonNumber(title) !== '' ? component.seasonNumber(title) : ''),
							  episode: object.ext_seasonnumber ? component.extractEpisodeNumber($(a).text() || $(a).attr('title')) : '',
							  info: ''
						  });
					  });
				  }
			  }

			  filter();
			  append(filtred());

			  get_links_wait = false;
			  component.render().find('.broadcast__scan').remove();

			  //results = [];
			  $(math).remove();
		  }, function (a, c) {
			  //component.empty('哦，' + network.errorDecode(a, c) + ' ');
			  get_links_wait = false;
			  component.render().find('.broadcast__scan').remove();
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
      component.order.forEach(function (i){
		filter_items.order.push(i.title);
	});
      component.filter(filter_items, choice);
    };

    function filtred() {

      var mapResult = results.map(function (item, index, array) {
        return item;
      });
      //return component.order[filter_data.order] ? (component.order[filter_data.order].id == 'invers' ? mapResult.reverse() : mapResult) : mapResult;
      return component.order[choice.order].id == 'invers' ? mapResult.reverse() : mapResult;
      // return mapResult;
    };

    function doparse(element, url, data, call, error) {
    //   var element = element;
    //   var view = view;
    //   var url11_ = url1_;
    //   var MacPlayer_ = url;
      // data = "<html xmlns=\"http://www.w3.org/1999/xhtml\"> <head> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/> <meta name=\"referrer\" content=\"never\"> <title>网盘播放器v201812 parse.hcc11.com</title> <script src=\"//cdn.staticfile.org/jquery/2.0.3/jquery.min.js\"></script> <link href=\"/Content/index.css?v=1.3\" rel=\"stylesheet\"/> <script src=\"/Scripts/parse.js\"></script> </head> <body> <div id=\"div_player\"> <div style=\"text-align: center\"> <img src=\"//img.vim-cn.com/6f/b497e2244ddba298e4598c0101538c606da7ae.gif\" style=\"width: 300px; height: 250px;\"/> </div> </div> <script src=\"//cdn.staticfile.org/hls.js/1.2.4/hls.min.js\"></script> <link href=\"//cdn.staticfile.org/dplayer/1.25.0/DPlayer.min.css\" rel=\"stylesheet\"> <script src=\"//cdn.staticfile.org/dplayer/1.25.0/DPlayer.min.js\"></script> <script type=\"text/javascript\"> var url = '0353530343635323037313338373431353D344946455D2A7D616D28762531373636393632303930363135393D3449455D2A7D616D2876293734343739363336313D354A5943564D2A7D616D287624307D6F2F656469667D356079747D247E65647E6F636D25637E6F60737562762030343230313D3564716274796D696C6D2A7D616D2876283939393531323936313D337562796078754625554B44483050556678466A5331714467376C403D346949756B4373756363614357514624433523675E4D683E497A58494350755833656F2537694258415058643E4D35627574716E676963562E475F4E4B4E455D3E4945405954545E45494C434D2A7D616D28762055353132393631325F434D3E494540595454455F4C434D2A7D616D28762E475F4E4B4E455D3B425F4754554E445E45494C434D2A7D616D287624307D6E2130345E41465946573235273235283D2644555443352A256D616E656C696662433522323524307D6E2130345E41465946523235244335256D616E656C6966624335247E656D6863616474716D3E6F696479637F607379646D247E65647E6F636D25637E6F607375627F34307D6E2234346162603936326164656D236567383D253133343D273932393D25333637346564363F24455F4C43495C494D41464F2E636E23787E657974736E23737F693A776E256D6F686D29766D21676A776D216964656D6F2F2A33707474786', err = '',dmId=0,vt='2'; </script> <script src=\"/ParsePlayer/Player/Js?time="+Math.floor(Date.now() / 1000)+"&amp;key=55eab43a2996b8891d19318a56e2a9bf\" type=\"text/javascript\"></script> </body> </html>"

      if (element.file.includes('zxzj')) {
        // var randMatch = data.match(/var url = '(.*?)'/)[1].split('').reverse().join('')
		var randMatch = data.match(/"data":"([^"]+)"/)[1].split('').reverse().join('')
		
        var temp = '';
        for (var i = 0x0; i < randMatch.length; i = i + 0x2) {
          temp += String.fromCharCode(parseInt(randMatch[i] + randMatch[i + 0x1], 0x10))
        }
        var input = temp.substring(0x0, (temp.length - 0x7) / 0x2) + temp.substring((temp.length - 0x7) / 0x2 + 0x7);
        // var playlist = [];
        // var first = {
        //   url: input,
        //   timeline: view,
        //   title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
        //   subtitles: element.subtitles,
        //   tv: false
        // };
        // Lampa.Player.play(first);
        // playlist.push(first);
        // Lampa.Player.playlist(playlist);
		  if (input) {
			  element.stream = input;
			  // element.qualitys = quality;
			  call(element.stream);
		  } else error();
      } else {
        var str = data
          .replace(/src="\/\//g, 'src="https://')
          .replace(/href="\/\//g, 'href="https://')
          .replace(/<\/?(head|meta|body|html)[^>]*>/g, '')
          .replace(/<title>.*?<\/title>/g, '')
          .replace(/\/1\.(23|24|25|26)\.0\/DPlayer\.min\.js/, '/1.27.0/DPlayer.min.js')
          .replace(/<script[^>]*src=["'][^"']*jquery[^"']*["'][^>]*><\/script>/gi, '')
          .replace(/src="[^"]*DPlayer\.min\.js"/g, 'src="https://qu.ax/CYir.js"')
        // .replace(/src="[^"]*Js\?time[^"]*/g, 'src="https://qu.ax/oRMc.js"');

        // 获取当前页面的 URL
        var currentPageUrl = url;
        // console.log(currentPageUrl)
        // 判断当前页面的 URL 是否是绝对路径

        str = str.replace(/(src|href)=("|')((?!http|https|\/\/|data:)[^"']+)/ig, function (match, p1, p2, p3) {
          return p1 + '=' + p2 + component.getAbsolutePath(currentPageUrl.split("?")[0] ? currentPageUrl.split("?")[0] : currentPageUrl, p3);
        });

        $('.iframe').remove();
        Lampa.Template.add('playerwindow', "<div class=\"iframe\"></div>");
        // <div class=\"iframe__body\">\n   </div>\n
        var html$2 = Lampa.Template.get('playerwindow');

        $('body').append(html$2);

        return new Promise(function (resolve, reject) {
          $('.iframe').append(`
      ${str}
    `);
          resolve(); // 表示添加完成
        })
          .then(function () {
            // console.log('执行网页完成')
            // 在append完成后触发事件
            // html$2.removeClass('iframe--loaded');
            // console.log($('.dplayer'))
            // console.log(window._0x41b364)
            // window._0x41b364.focus;
            // 在 DPlayer 脚本加载后获取变量
            // var regex = /src="([^"]*Js\?time=[^"]*)"/;

            // var match = str.match(regex);
            // var srcValue;
            // if (match) {
            //   srcValue = match[1];
            //   console.log("Matched:", match[0]);
            //   console.log("Src value:", srcValue);
            //   var dplayerScript = document.querySelector('script[src="'+srcValue+'"]');
            //   dplayerScript.onload = function () {
            //     // 在这里获取 DPlayer 的变量
            //     // 例如：var dplayerVersion = DPlayer.version;
            //     // 请参考 DPlayer 文档以了解可用的变量和方法
            //     // console.log(_0x4f591e)
            //   };
            // } else {
            //   console.log("No match found.");
            // }

            toggle();
            // var playulr =$('.dplayer-video').attr('src');
            // document.querySelector('video').src
            // document.querySelector('.dplayer-video').pause();
            // document.querySelector('.dplayer-video').play();
            // document.querySelector('.dplayer-video').focus();


            // 获取特定类名的元素中所有子元素的src属性值
            // function getSrcValuesInClass(className) {
            //   var srcValues = [];

            //   // 获取所有具有指定类名的元素
            //   var elements = $(className);

            //   // 遍历具有指定类名的元素
            //   for (var i = 0; i < elements.length; i++) {
            //     var element = elements[i];
            //     var childNodes = element.childNodes;

            //     for (var j = 0; j < childNodes.length; j++) {
            //       var child = childNodes[j];
            //       if (child.nodeType === Node.ELEMENT_NODE) {
            //         var src = child.getAttribute('src');
            //         if (src) {
            //           srcValues.push(src);
            //         }
            //       }
            //     }
            //   }

            //   return srcValues;
            // }

            // // 获取具有特定类名的元素中所有子元素的src属性值
            // var className = '.iframe'; // 替换为实际的类名
            // var srcValuesInClass = getSrcValuesInClass(className);

            // // 输出结果
            // console.log('src values in elements with class', className + ':', srcValuesInClass);

            var playulr = $('video').attr('src') || document.querySelector('source').src;
            // var videoElement = $('video')[0];
            // var playulr = videoElement ? videoElement.src : (document.querySelector('source') ? document.querySelector('source').src : undefined);

            // var playulr = $('video').attr('src') || $('video source').attr('src');
            console.log('playulr=', playulr)
            if (typeof playulr !== "undefined") {
              var file = playulr;
              //console.log(file);
              if (file) {
                // var playlist = [];
                // var first = {
                //   url: file,
                //   timeline: view,
                //   title: element.season ? element.title : object.movie.title + ' / ' + element.title + ' / ' + element.quality,
                //   subtitles: element.subtitles,
                //   tv: false
                // };
                // Lampa.Player.play(first);
                // playlist.push(first);
                // Lampa.Player.playlist(playlist);
				if (file) {
					element.stream = file;
					// element.qualitys = quality;
					call(element.stream);
				} else error();
                close();
              } else {
                Lampa.Noty.show('无法检索链接');
                close();
              }
            } else {
              Lampa.Noty.show('无法找到视频地址');
              close();
            };
          })
          .catch(function (error) {
            console.error('添加内容时出错：', error);
          });

        function toggle() {
          Lampa.Controller.add('playerwindow', {
            toggle: function toggle() {
              var focus = $('.iframe > div').addClass('selector');
              // console.log(focus[0])
              Lampa.Controller.collectionSet($('.iframe'));
              Lampa.Controller.collectionFocus(focus[0], $('.iframe'));
            },
            back: close
          });
          Lampa.Controller.toggle('playerwindow');
        }

        function close() {
          // html$2.removeClass('iframe--loaded');
          // Lampa.Keypad.listener.destroy();
          html$2.detach();
          Lampa.Controller.toggle('content');
          // html$2.find('iframe').attr('src', '');
          html$2.find('iframe').html('');
          // if (object.onBack) object.onBack();
        }
      }

    };

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
		  quality = {};
		  var mass = [1080, 720, 480, 360];
		  mass.forEach(function (n) {
			var exes = items.find(function (a) {
			  return a.quality == n;
			});
	
			if (exes) {
			  if (!file) file = exes.file;
			  quality[n + 'p'] = exes.file;
			}
		  });
		  var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
		  if (quality[preferably]) file = quality[preferably];
		}
	
		return {
		  file: file,
		  quality: quality
		};
	};

	function extractScriptContentAsString(keywords, webpageContent) {
		let resultString = "";
  
		for (var keyword of keywords) {
		  var regex = new RegExp(`<script\\b[^>]*>([^<]*${keyword}[^<]*)<\\/script\\b[^>]*>`, 'g');
		  var match;
  
		  while ((match = regex.exec(webpageContent)) !== null) {
			resultString += match[1]+ "\n"; // Add a newline for each match
		  }
		}
  
		return resultString;
	};

	function getStream(element, call, error) {
		if (element.stream) return call(element.stream);
		// var url = element.file || '';

		if (element.file) {
			var videocontainer = doreg.videocontainer;
			(doreg.use_proxy === true) ? proxy_url = proxy : proxy_url = '';
			if (doreg.videoparse == 'browser') {
			  network["native"](proxy_url + element.file, function (str) {
				if (str) {
				  var iframelink = $(videocontainer, str).attr('src');
				  Lampa.Iframe.show({
					url: iframelink,
					onBack: function onBack() {
					  Lampa.Controller.toggle('content');
					}
				  });
				  // }

				  $('.iframe__body iframe').removeClass('iframe__window');
				  $('.iframe__body iframe').addClass('screensaver-chrome__iframe');

				} else component.emptyForQuery(select_title);

				// component.loading(false);
			  }, function (a, c) {
				component.empty(network.errorDecode(a, c));
			  }, false, {
				dataType: 'text'
			  });
			} else {
			//   loadingshow();
			  network["native"](proxy_url + element.file, function (str) {
				if (str) {					
					$(".noty").hide();
					var MacPlayer_, file_ = [], a;
					var url = element.file.indexOf('http') == -1 ? '' : element.file.match(/(http|https):\/\/(www\.)?([\w-]+(\.)?)+/)[0];
					var keyjs = extractScriptContentAsString(doreg.js_execute_key, str);
					var evaluatedCodeResult = window.eval('function base64decode(str){ return atob(str); };' + keyjs.replace(/undefined|NaN/g,''));
					var parsedJson;
					if (!element.file.includes('ddys')) {
						var text = $('script:contains(player_)', str).html();
						if (text) {
							try {
								var jsonStart = text.indexOf('{'); // 找到第一个大括号的位置
								var jsonEnd = text.lastIndexOf('}'); // 找到最后一个大括号的位置
								if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
									var jsonString = text.substring(jsonStart, jsonEnd + 1); // 提取大括号内的内容
									var parsedJson = JSON.parse(jsonString); // 解析 JSON 字符串

								}
							} catch (error) {
								console.error("Error parsing JSON:", error.message);
							}
						}
					};
					var isJsonValid = typeof parsedJson === 'object' && parsedJson !== null;
					var hasM3u8Url = isJsonValid && parsedJson.url && parsedJson.url.includes('.m3u8');	

					if (element.file.includes('ddys')){
						if (element.file) {
							network["native"](element.file, function (data) {
								if (data.url) {
									element.stream = data.url;
									// element.qualitys = quality;
									call(element.stream);
								} else {
									network["native"]('https://ddys.pro/getvddr3/video?id='+element.src+'&type=json', function (data) {
										if (data.url) {
											element.stream = data.url;
											// element.qualitys = quality;
											call(element.stream);
										} else error();
									}, function (a, c) {
									  Lampa.Noty.show(network.errorDecode(a, c));
									}, false, {
									  dataType: 'json',
									  headers: {
										'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
										'Referer': "https://ddys.pro/"
									  }
									});
								};
							}, function (a, c) {
							  Lampa.Noty.show(network.errorDecode(a, c));
							}, false, {
							  dataType: 'json',
							  headers: {
								'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
								'Referer': "https://ddys.pro/"
							  }
							});
						  } else {
							error();
							return;
						  }
					}
					else if (typeof now == 'string') {
						if (now) {
							element.stream = now;
							// element.qualitys = quality;
							call(element.stream);
						} else error();
						now = null;
						// Lampa.Modal.close();
					} else if (hasM3u8Url) {
						// if (parsedJson.url.includes('.m3u8')) {
							element.stream = parsedJson.url;
							// element.qualitys = quality;
							call(element.stream);
						// } else error();
					} else {
						var queue = [
							proxy_url + url + '/static/js/playerconfig.js',
							proxy_url + url + '/static/js/player.js'
						];
					
						function ProcessScripts(cb, index) {
							getScript(queue[index], function () {
								index++;
								if (index === queue.length) {
									cb();
								} else {
									ProcessScripts(cb, index);
								}
							});
						}
					
						function getScript(script, callback) {
							$.getScript(script, function () {
								callback();
							});
						}
					
						ProcessScripts(function () {
							Lampa.Utils.putScriptAsync([proxy_url + url + MacPlayer.Path + MacPlayer.PlayFrom + ".js"], function () {
								// Lampa.Modal.close();
								MacPlayer_ = $(MacPlayer.Html).attr('src');
								MacPlayer_ = MacPlayer_.slice(0, 1) !== '/' ? MacPlayer_ : element.file.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + MacPlayer_;
								var file1 = $(MacPlayer.Html).attr('src') ? $(MacPlayer.Html).attr('src') : MacPlayer.PlayUrl;
					
								if (/\.m3u8|\.mp4/.test(MacPlayer.PlayUrl)) {
									file1 = MacPlayer.PlayUrl;
								}
								file_.push(file1);
								var file = file_[0];
					
								if (MacPlayer_ && !/\.m3u8|\.mp4/.test(MacPlayer.PlayUrl)) {
									var url1_ = MacPlayer_.replace('/' + doreg.link_folder + '/', '').match(/\/([^\/]+)\/[^\/]+$/);
									if (!doreg.use_referer) {
									  // 用户iframe打开页面
									  Lampa.Iframe.show({
										url: MacPlayer_,
										onBack: function onBack() {
										  Lampa.Controller.toggle('content');
										}
									  });
									  $('.iframe__body iframe').removeClass('iframe__window');
									  $('.iframe__body iframe').addClass('screensaver-chrome__iframe');
									} else {
									  if (navigator.userAgent.toLowerCase().indexOf("lampa_client") == -1) {
										// $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent(MacPlayer_), function (data) {
										//   console.log(data.contents);
										// });
										$(".noty").show();
										component.render().find('.online_modss__scan-file').remove();
										Lampa.Noty.show('因Referer限制，该视频只能在安卓上观看。');
										Lampa.Controller.toggle('content');
									  } else {
										// if (MacPlayer_.includes('cfnode1.xyz')){
										// 	MacPlayer_ = 'https://cors.eu.org/'+MacPlayer_
										// };
										network["native"](MacPlayer_, function (str) {
										//   |'(https:\/\/[^\/]+aliyundrive\.net[^']+)'
										  var urlPattern = /['|"](https?:\/\/[^'"]+\.(?:mp4|m3u8)[^'"]*)['|"]|var vid = '(.+?)';|var\s+urls\s*=\s*'([^']+)'/;
										  var match = str.match(urlPattern);
		  
										  if (match) {
											// console.log(match)
											var urlvideo = match[1] || match[2] || match[3];
											if (urlvideo) {
												element.stream = urlvideo;
												// element.qualitys = quality;
												call(element.stream);
											} else error();
										  } else {
											doparse(element, MacPlayer_, str, call, error);
										  }
		  
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
									
								  } else {
									if (file) {
										if (file) {
											element.stream = file;
											// element.qualitys = quality;
											call(element.stream);
										} else error();
									} else {
										$(".noty").show();
										Lampa.Noty.show('无法检索链接');
									}
								}
							});
						}, 0);
					}
					evaluatedCodeResult = null;
				} else component.emptyForQuery(select_title);
			  }, function (a, c) {
				error();
			  }, false, {
				dataType: 'text'
			  });
			};
		  } else {
			error();
			return;
		};
	
		// if (url) {
		//   element.stream = url;
		//   element.qualitys = false;
		//   call(element);
		// } else error();
	};

	function append(items) {
		component.reset();
		component.draw(items, {
		  onRender: function onRender(item, html) {
			if (get_links_wait) html.find('.online_modss__body').append($('<div class="online_modss__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
		  },
		  onEnter: function onEnter(item, html) {
			  if (item.loading) return;
			  item.loading = true;
			  component.render().find('.online_modss__scan-file').remove();
			  html.find('.online_modss__body').append($('<div class="online_modss__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
			  getStream(item, function (stream) {
				item.loading = false;
				var first = {
				  url: stream,
				  timeline: item.timeline,
				  quality: item.qualitys,
				  subtitles: item.subtitles,
				  title: item.title + ' / ' + item.quality
				};
				Lampa.Player.play(first);
	  
				if (item.season) {
				  var playlist = [];
				  items.forEach(function (elem) {
					var cell = {
					  url: function url(call) {
						getStream(elem, function (stream) {
						  cell.url = stream;
						  cell.quality = elem.qualitys;
						  call.subtitles = elem.subtitles;
						  elem.mark();
						  call();
						}, function () {
						  cell.url = '';
						  call();
						});
					  },
					  timeline: elem.timeline,
					  title: elem.title
					};
					if (elem == item) cell.url = stream;
					playlist.push(cell);
				  });
				  Lampa.Player.playlist(playlist);
				} else {
				  Lampa.Player.playlist([first]);
				}
				html.find('.online_modss__scan-file').remove();
				component.savehistory(object);
				item.mark();
			  }, function (data) {
				html.find('.online_modss__scan-file').remove();
				item.loading = false;
				$(".noty").show();
				// Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
				Lampa.Noty.show(data ? network.errorDecode(data) : Lampa.Lang.translate('modss_nolink'));
				Lampa.Controller.toggle('content');
			  });
		  },
		  onContextMenu: function onContextMenu(item, html, data, call) {
			call(getFile(item, item.quality));
		  }
		});
	};
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
      order: 0,
      voice_name: ''
    };
    var results = [];
    var get_links_wait = false;

    function closeloading() {
      get_links_wait = false;
      component.render().find('.broadcast__scan').remove();
    }

	this.searchByKinopoisk = function (_object, kp_id) {
		var _this = this;
		object = _object;
		select_title = object.search || object.movie.title;
		var url = detailid.replace('#id', kp_id);
		// var url = embed;
		// url = Lampa.Utils.addUrlComponent(url, 'token=' + token);
		// url = Lampa.Utils.addUrlComponent(url, 'kinopoisk_id=' + kp_id);
		network.clear();
		network.timeout(10000);
		network["native"](url, function (json) {
			if (json) {
			  if (json.list && json.list.length == 0) {
				closeloading();
				component.emptyForQuery(select_title)
			  } else {
				parse(json);
			  }
			} else {
			  closeloading();
			  component.emptyForQuery(select_title)
			};
  
			component.loading(false);
		  }, function (a, c) {
			closeloading();
			component.empty(network.errorDecode(a, c));
		  }, false, {
			dataType: 'json'
		  });
		// network.silent(url, function (json) {
		// 	json = Lampa.Arrays.getValues(json.data)[0];
		// 	if (json) {
		// 		var iframe_src = 'http:' + json.iframe_src;
		// 		medias = json.medias;
		// 		_this.find(iframe_src);
		// 	} else component.emptyForQuery(select_title);
		// }, function (a, c) {
		// 	component.empty(network.errorDecode(a, c));
		// });
	};

    this.searchByTitle = function (_object, kinopoisk_id) {
      network.clear();
      network.timeout(1000 * 15);
      get_links_wait = true;
      if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
      var _this = this;
      object = _object;
      select_title = object.search || object.movie.title;
      //doreg = rule;
      //console.log(kinopoisk_id)
      //console.log(select_title.replace(/第(.+)季/, '').trim());
      var url;
      parseFloat(kinopoisk_id) ? url = detailid.replace('#id', kinopoisk_id) : url = searchurl.replace('#msearchword', encodeURIComponent(select_title));

      //url = url.replace('#msearchword',encodeURIComponent(object.movie.title));
      if (parseFloat(kinopoisk_id)) {
        network["native"](url, function (json) {
          if (json) {
            if (json.list && json.list.length == 0) {
              closeloading();
              component.emptyForQuery(select_title)
            } else {
              parse(json);
            }
          } else {
            closeloading();
            component.emptyForQuery(select_title)
          };

          component.loading(false);
        }, function (a, c) {
          closeloading();
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'json'
        });
        //getdetail(url);
      } else {
        network["native"](url, function (json) {
          if (json.code != 0) {
            //console.log(json.data.length)
            if (json.list && json.list.length !== 0) {
              //parse(json);
              if (json.list.length == 1) {
                var id = json.list[0].vod_id;
                url = detailid.replace('#id', id);
                network["native"](url, function (json) {
                  if (json) {
                    if (json.list.length == 0) {
                      closeloading();
                      component.emptyForQuery(select_title)
                    } else {
                      parse(json);
                    }
                  } else {
                    closeloading();
                    component.emptyForQuery(select_title)
                  };

                  component.loading(false);
                }, function (a, c) {
                  closeloading();
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
                closeloading();
              }
            } else {
              component.emptyForQuery(select_title)
              closeloading();
            };
          } else {
            closeloading();
            component.emptyForQuery(select_title)
          };

          component.loading(false);
        }, function (a, c) {
          closeloading();
          component.empty(network.errorDecode(a, c));
        }, false, {
          dataType: 'json',
        });
      };
    };

    this.extendChoice = function (saved) {
      Lampa.Arrays.extend(choice, saved, true);
    };

    this.reset = function () {
      component.reset();
      choice = {
        season: 0,
        voice: 0,
        order: 0
      };
      filter();
      append(filtred());
      component.saveChoice(choice);
    };

    this.filter = function (type, a, b) {
      choice[a.stype] = b.index;
      component.reset();
      filter();
      append(filtred());
      component.saveChoice(choice);
    };

    this.destroy = function () {
      network.clear();
      extract = null;
      results = null;
    };

    function parse(json) {
	//   results = [];
      var vodlist;
      if (json.list[0].vod_play_url.indexOf('$$$') !== -1) {
        vodlist = json.list[0].vod_play_url.split('$$$')[1].split('#');
      } else {
        vodlist = json.list[0].vod_play_url.split('#');
      }
      // var vodlist = json.list[0].vod_play_url.split('#');
      vodlist.forEach(function (episode) {

        //if (episode.playurl.indexOf('.m3u8' !== -1)) {
		results.push({
          file: episode.split('$')[1],
          quality: json.list[0].vod_play_from.toUpperCase().replace('$$$', ' / ') + ' / ' + episode.split('$')[0],
          title: episode.split('$')[0],
		  season: object.ext_seasonnumber ? object.ext_seasonnumber : '',
          episode: object.ext_seasonnumber ? component.extractEpisodeNumber(episode.split('$')[0]) : '',
          info: '',
          allepisode: json.list[0].vod_play_url
        });
        //}
      });
      filter();
      append(filtred());
      get_links_wait = false;
      component.render().find('.broadcast__scan').remove();
    }

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
      component.order.forEach(function (i) {
        filter_items.order.push(i.title);
      });
      component.filter(filter_items, choice);
    }

    function filtred() {

      var mapResult = results.map(function (item, index, array) {
        return item;
      });
      return component.order[choice.order].id == 'invers' ? mapResult.reverse() : mapResult;
      // return mapResult;
    }

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
		  quality = {};
		  var mass = [1080, 720, 480, 360];
		  mass.forEach(function (n) {
			var exes = items.find(function (a) {
			  return a.quality == n;
			});
	
			if (exes) {
			  if (!file) file = exes.file;
			  quality[n + 'p'] = exes.file;
			}
		  });
		  var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
		  if (quality[preferably]) file = quality[preferably];
		}
	
		return {
		  file: file,
		  quality: quality
		};
	};

	function append(items) {
		component.reset();
		component.draw(items, {
		  onEnter: function onEnter(item, html) {
				if (item.file) {
					var playlist = [];
					var first = {
					  url: item.file,
					  timeline: item.timeline,
					  title: item.season ? item.title + ' / ' + item.quality : object.movie.title + ' / ' + item.title + ' / ' + item.quality,
					  subtitles: item.subtitles,
					  tv: false
					};
					var vodlist = item.allepisode.split('#');
					vodlist.forEach(function (elem) {
					  playlist.push({
						title: elem.split('$')[0],
						url: elem.split('$')[1].replace('yzzy-tv-cdn.com', 'yzzy-kb-cdn.com'),
						tv: false
					  });
					});
					Lampa.Player.play(first);
					Lampa.Player.playlist(playlist);
					item.mark();
					component.savehistory(object);
				  } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
		  },
		  onContextMenu: function onContextMenu(item, html, data, call) {
			call(getFile(item, item.quality));
		  }
		});
	}
  }

  function tg_share_channel(component, _object, tg_channel_name) {
    var tg_channel_name = tg_channel_name;
    var network = new Lampa.Reguest();
    var extract = {};
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var choice = {
      season: 0,
      voice: 0,
      order: 0,
      voice_name: ''
    };
    var results = [];

    this.searchByTitle = function (_object, kinopoisk_id) {
      object = _object;
      select_title = object.search || object.movie.title;
      //doreg = rule;
      //Lampa.Utils.checkHttp('proxy.cub.watch/cdn/')+
      var url1 = 'https://api.allorigins.win/raw?url=https://tx.me/s/' + tg_channel_name + '?q=#msearchword';
      url1 = url1.replace('#msearchword', encodeURIComponent(select_title));

      network.clear();
      network.timeout(1000 * 15);
      network["native"](url1, function (json) {
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

    this.filter = function (type, a, b) {
      choice[a.stype] = b.index;
      component.reset();
      filter();
      append(filtred());
      component.saveChoice(choice);
    };

    this.destroy = function () {
      network.clear();
      extract = null;
      results = null;
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
      return beijing_datetime.replace(/\//g, '-');
    };

    function parse(json) {
      var str = json.replace(/\n/g, '');
      var h = $('.tgme_widget_message_bubble', str);
      $(h).each(function (i, html) {

        if ($(html).text().match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
          results.push({
            file: $(html).text().match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)[0],
            quality: '发布于：' + utc2beijing($('.time', html).attr('datetime')),
            //quality: $('p',html).text().replace(/文件夹/,'目录'),
            title: $('.highlight:first', html).text() + ($(html).html().match(/<\/mark>(.+?)<br>/) ? $(html).html().match(/<\/mark>(.+?)<br>/)[1].replace(/(<([^>]+)>)/ig, '').replace(/《|【|》|】|\./g, ' ') : ''),
            season: '',
            episode: '',
            info: '',
			time: ''
          });
        };
      });

      append(filtred());
      results = [];

    }

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
      component.order.forEach(function (i) {
        filter_items.order.push(i.title);
      });
      component.filter(filter_items, choice);
    }

    function filtred() {

      return results.reverse();
    }

    function append(items) {
      var _this = this;
      component.reset();
      var viewed = Lampa.Storage.cache('online_view', 5000, []);
      items.forEach(function (element, item_id) {
        var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
        var view = Lampa.Timeline.view(hash);
        var item = Lampa.Template.get('modss_online_folder', element);
        var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
        element.timeline = view;
        item.append(Lampa.Timeline.render(view));

        if (Lampa.Timeline.details) {
          item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
        }

        if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
        item.on('hover:enter', function () {
          // object.movie.id = object.url;
          choice.last_viewed = item_id;
          if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
          component.activity.loader(true);
          if (element.file) {
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
        // component.contextmenu({
        //   item: item,
        //   view: view,
        //   viewed: viewed,
        //   choice: choice,
        //   hash_file: hash_file,
        //   file: function file(call) {
        //     call({
        //       file: element.file
        //     });
        //   }
        // });
      });
      component.start(true);
    }
  }

  function czzy(component, _object, rule) {
    var network = new Lampa.Reguest();
    var extract = {};
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var choice = {
      season: 0,
      voice: 0,
      order: 0,
      voice_name: ''
    };
    var get_links_wait = false;
    var results = [];
    var proxy_url = 'https://cors.eu.org/';
    var proxy = 'https://cors.eu.org/';

    this.searchByTitle = function (_object, kinopoisk_id) {
      object = _object;
      select_title = object.search || object.movie.title;
      // doreg = rule;
      get_links_wait = true;
      // var searchUrl = 'https://ddys.pro/?s=#msearchword&post_type=post';
      // var seasonRemovedTitle = select_title.replace(/第(.+)季/, '');
      // var encodedTitle = encodeURIComponent(seasonRemovedTitle);
      // var url1 = searchUrl.replace('#msearchword', encodedTitle);

      network.clear();
      network.timeout(1000 * 15);
      network["native"](proxy_url + object.url, function (str) {
        // var parsedData = doreg.search_json ? str : str;

        var parsedData = str;

        var searchresult = $('.paly_list_btn', parsedData).find('a').length;

        if (searchresult > 0) {
          dodetail(parsedData);
        } else component.emptyForQuery(select_title);

        component.loading(false);
      }, function (a, c) {
        component.empty(network.errorDecode(a, c));
      }, false, {
        dataType: 'text',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
          // 'Referer': ""
        }
      });
    };

	this.extendChoice = function (saved) {
		Lampa.Arrays.extend(choice, saved, true);
	  };
	  this.reset = function () {
		component.reset();
		choice = {
		  season: 0,
		  voice: 0,
		  voice_name: '',
		  voice_id: 0, 
		  order: 0
		};
		filter();
		append(filtred());
	  };
	  this.filter = function (type, a, b) {
		choice[a.stype] = b.index;
	
		if (a.stype == 'voice') {
		  choice.voice_name = filter_items.voice[b.index];
		  choice.voice_id = filter_items.voice_info[b.index] && filter_items.voice_info[b.index].id;
		}
	
		component.reset();
		filter();
		append(filtred());
	  };
	  this.destroy = function () {
		network.clear();
		results = null;
	  };

    function parse(str) {
      if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
        // dodetail(item.Link, str, item.Title);
    }

    function dodetail(str) {
      //取得具体页面的详情地址
      // if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
      results = [];
      $('.paly_list_btn', str).find('a').each(function (i, a) {
        results.push({
          file: $(a).attr('href'),
          quality: '厂长资源 / ' + ($(a).attr('title') || $(a).text()),
          title: ($(a).attr('title') || $(a).text()),
		  season: object.ext_seasonnumber ? object.ext_seasonnumber : '',
          episode: object.ext_seasonnumber ? component.extractEpisodeNumber($(a).attr('title') || $(a).text()) : '',
          info: ''
        });
      });
      filter();
      append(filtred());
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
      component.order.forEach(function (i) {
        filter_items.order.push(i.title);
      });
      component.filter(filter_items, choice);
    }

    function filtred() {

      var mapResult = results.map(function (item, index, array) {
        return item;
      });
      //return component.order[filter_data.order] ? (component.order[filter_data.order].id == 'invers' ? mapResult.reverse() : mapResult) : mapResult;
      return component.order[choice.order].id == 'invers' ? mapResult.reverse() : mapResult;
      // return mapResult;
    }

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
		  quality = {};
		  var mass = [1080, 720, 480, 360];
		  mass.forEach(function (n) {
			var exes = items.find(function (a) {
			  return a.quality == n;
			});
	
			if (exes) {
			  if (!file) file = exes.file;
			  quality[n + 'p'] = exes.file;
			}
		  });
		  var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
		  if (quality[preferably]) file = quality[preferably];
		}
	
		return {
		  file: file,
		  quality: quality
		};
	}

	function getStream(element, call, error) {
		if (element.stream) return call(element.stream);
		// var url = element.file || '';
	
		if (element.file) {
			network["native"](proxy_url + element.file, function (data) {
				var iframe = $('iframe', data);
				if (iframe.length > 0) {
					network["native"]($(iframe[0]).attr('src'), function (data) {
						Lampa.Utils.putScriptAsync(["https://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"], function () {
							var randMatch = data.match(/var rand = "(.*?)";/);
							var playerMatch = data.match(/var player = "(.*?)";/);
							var rand, player;
							if (randMatch && randMatch.length > 1) {
								rand = randMatch[1];
							} else {
								rand = '';
							}

							if (playerMatch && playerMatch.length > 1) {
								player = playerMatch[1];
							} else {
								player = '';
							}

							function js_decrypt(str, key, iv) {
								var key = CryptoJS.enc.Utf8.parse(key);
								var iv = CryptoJS.enc.Utf8.parse(iv);
								var decrypted = CryptoJS.AES.decrypt(str, key, {
									iv: iv,
									padding: CryptoJS.pad.Pkcs7
								}).toString(CryptoJS.enc.Utf8);
								return decrypted
							}
							var config = JSON.parse(js_decrypt(player, 'VFBTzdujpR9FWBhe', rand));
							if (config.url) {
								element.stream = config.url;
								// element.qualitys = quality;
								call(element.stream);
							} else error();
						});

					}, function (a, c) {
						Lampa.Noty.show(network.errorDecode(a, c));
					}, false, {
						dataType: 'text',
						headers: {
							'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
						}
					});

				} else {
					var js = $('script:contains(window.wp_nonce)', data).html();
					var group = js.match(/(var.*)eval\((\w*\(\w*\))\)/);
					Lampa.Utils.putScriptAsync(["https://qu.ax/MhrO.js"], function () {
						var result = eval(group[1] + group[2]);
						var playUrl = result.match(/url:.*?['"](.*?)['"]/)[1];
						if (playUrl) {
							element.stream = playUrl;
							// element.qualitys = quality;
							call(element.stream);
						} else error();
					})
				}
			}, function (a, c) {
				Lampa.Noty.show(network.errorDecode(a, c));
			}, false, {
				dataType: 'text',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
				}
			});
		} else {
			error();
			return;
		}
	  }

	function append(items) {
		component.reset();
		component.draw(items, {
		//   onRender: function onRender(item, html) {
		// 	if (get_links_wait) html.find('.online_modss__body').append($('<div class="online_modss__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
		//   },
		onEnter: function onEnter(item, html) {
			  component.render().find('.online_modss__scan-file').remove();  
			  html.find('.online_modss__body').append($('<div class="online_modss__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
			  getStream(item, function (stream) {
				var first = {
				  url: stream,
				  timeline: item.timeline,
				  quality: item.qualitys,
				  subtitles: item.subtitles,
				  title: item.title + ' / ' + item.quality
				};
				Lampa.Player.play(first);
	  
				if (item.season) {
				  var playlist = [];
				  items.forEach(function (elem) {
					var cell = {
					  url: function url(call) {
						getStream(elem, function (stream) {
						  cell.url = stream;
						  cell.quality = elem.qualitys;
						  call.subtitles = elem.subtitles;
						  elem.mark();
						  call();
						}, function () {
						  cell.url = '';
						  call();
						});
					  },
					  timeline: elem.timeline,
					  title: elem.title
					};
					if (elem == item) cell.url = stream;
					playlist.push(cell);
				  });
				  Lampa.Player.playlist(playlist);
				} else {
				  Lampa.Player.playlist([first]);
				}
				html.find('.online_modss__scan-file').remove();
				component.savehistory(object);
				item.mark();
			  }, function () {
				html.find('.online_modss__scan-file').remove();
				Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
				Lampa.Controller.toggle('content');
			  });
			
		  },
		  onContextMenu: function onContextMenu(item, html, data, call) {
			call(getFile(item, item.quality));
		  }
		});
	}
  }

  function bdys(component, _object, rule) {
    var network = new Lampa.Reguest();
    var extract = {};
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var choice = {
      season: 0,
      voice: 0,
      order: 0,
      voice_name: ''
    };
    var get_links_wait = false;
    var results = [];
    var proxy_url = '';
    var proxy = 'https://cors.eu.org/';

    this.searchByTitle = function (_object, kinopoisk_id) {
      object = _object;
      select_title = object.search || object.movie.title;
      // doreg = rule;
      get_links_wait = true;

      network.clear();
      network.timeout(1000 * 15);
      network["native"](proxy_url + object.url, function (str) {
        // var parsedData = doreg.search_json ? str : str;

        var parsedData = str;

        var searchresult = $('div#play-list > div', parsedData).find('a').length;
        if (searchresult > 0) {
          dodetail(parsedData);
        } else component.emptyForQuery(select_title);

        component.loading(false);
      }, function (a, c) {
        component.empty(network.errorDecode(a, c));
      }, false, {
        dataType: 'text',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
          // 'Referer': ""
        }
      });
    };

	this.extendChoice = function (saved) {
		Lampa.Arrays.extend(choice, saved, true);
	  };
	  this.reset = function () {
		component.reset();
		choice = {
		  season: 0,
		  voice: 0,
		  voice_name: '',
		  voice_id: 0, 
		  order: 0
		};
		filter();
		append(filtred());
	  };
	  this.filter = function (type, a, b) {
		choice[a.stype] = b.index;
	
		if (a.stype == 'voice') {
		  choice.voice_name = filter_items.voice[b.index];
		  choice.voice_id = filter_items.voice_info[b.index] && filter_items.voice_info[b.index].id;
		}
	
		component.reset();
		filter();
		append(filtred());
	  };
	  this.destroy = function () {
		network.clear();
		results = null;
	  };

    function parse(str) {
      if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
        // dodetail(item.Link, str, item.Title);
    }

    function dodetail(str) {
      //取得具体页面的详情地址
      results = [];
	  
      $('div#play-list > div', str).find('a').each(function (i, a) {
        results.push({
          file: 'https://www.bdys10.com' + $(a).attr('href'),
          quality: '哔嘀影视 / ' + ($(a).attr('title') || $(a).text()),
          title: ($(a).attr('title') || $(a).text()),
		  season: object.ext_seasonnumber ? object.ext_seasonnumber : '',
          episode: object.ext_seasonnumber ? component.extractEpisodeNumber($(a).attr('title') || $(a).text()) : '',
          info: ''
        });
      });
      filter();
      append(filtred());
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
      component.order.forEach(function (i) {
        filter_items.order.push(i.title);
      });
      component.filter(filter_items, choice);
    }

    function filtred() {

      var mapResult = results.map(function (item, index, array) {
        return item;
      });
      //return component.order[filter_data.order] ? (component.order[filter_data.order].id == 'invers' ? mapResult.reverse() : mapResult) : mapResult;
      return component.order[choice.order].id == 'invers' ? mapResult.reverse() : mapResult;
      // return mapResult;
    }

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
		  quality = {};
		  var mass = [1080, 720, 480, 360];
		  mass.forEach(function (n) {
			var exes = items.find(function (a) {
			  return a.quality == n;
			});
	
			if (exes) {
			  if (!file) file = exes.file;
			  quality[n + 'p'] = exes.file;
			}
		  });
		  var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
		  if (quality[preferably]) file = quality[preferably];
		}
	
		return {
		  file: file,
		  quality: quality
		};
	}

	function getStream(element, call, error) {
		if (element.stream) return call(element.stream);
		// var url = element.file || '';
		function base64ToHex(_0xfff091) {
			const _0x31f23b = atob(_0xfff091);
			let _0x500fbb = '';
			for (let _0x5206a2 = 0; _0x5206a2 < _0x31f23b.length; _0x5206a2++) {
			  const _0xe600d0 = _0x31f23b.charCodeAt(_0x5206a2).toString(16);
			  _0x500fbb += _0xe600d0.length === 2 ? _0xe600d0 : '0' + _0xe600d0;
			}
			return _0x500fbb.toUpperCase();
		  }

		if (element.file) {
			network["native"](element.file, function (data) {
				// 通过正则表达式匹配pid的值
				var pid;
				var match = data.match(/var pid = (\d+);/);
				// 检查是否匹配到pid
				if (match && match.length === 2) {
					pid = parseInt(match[1], 10);
					Lampa.Utils.putScriptAsync(["https://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.min.js", "https://qu.ax/QlBB.js"], function () {
						var currentTime = new Date().getTime();
						var utf8Key = CryptoJS.enc.Utf8.parse(md5(pid + '-' + currentTime).substring(0, 16));
						var encryptedData = CryptoJS.AES.encrypt(pid + '-' + currentTime, utf8Key, {
							'mode': CryptoJS.mode.ECB,
							'padding': CryptoJS.pad.Pkcs7
						});
						var timestamp = currentTime;
						var signature = base64ToHex(encryptedData + '');
						
						network["native"]('https://www.bdys10.com/lines?t=' + timestamp + '&sg=' + signature + '&pid=' + pid + '', function (json) {
							if (json.msg == '成功') {
								if (json.hasOwnProperty("data")) {
									if (json.data.hasOwnProperty("url3")) {
										element.stream = json.data.url3;
										// element.qualitys = quality;
										call(element.stream);
									} else {
										error();	
									}
								} else {
									error();
								}
							}
						}, function (a, c) {
							error();
							// Lampa.Noty.show(network.errorDecode(a, c));
						}, false, {
							dataType: 'json',
						});
					});
				} else {
					error();
				}
			}, function (a, c) {
				Lampa.Noty.show(network.errorDecode(a, c));
			}, false, {
				dataType: 'text',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
				}
			});
		} else {
			error();
			return;
		}
	  }

	function append(items) {
		component.reset();
		component.draw(items, {
		//   onRender: function onRender(item, html) {
		// 	if (get_links_wait) html.find('.online_modss__body').append($('<div class="online_modss__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
		//   },
		onEnter: function onEnter(item, html) {
			  component.render().find('.online_modss__scan-file').remove();  
			  html.find('.online_modss__body').append($('<div class="online_modss__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
			  getStream(item, function (stream) {
				var first = {
				  url: stream,
				  timeline: item.timeline,
				  quality: item.qualitys,
				  subtitles: item.subtitles,
				  title: item.title + ' / ' + item.quality
				};
				Lampa.Player.play(first);
	  
				if (item.season) {
				  var playlist = [];
				  items.forEach(function (elem) {
					var cell = {
					  url: function url(call) {
						getStream(elem, function (stream) {
						  cell.url = stream;
						  cell.quality = elem.qualitys;
						  call.subtitles = elem.subtitles;
						  elem.mark();
						  call();
						}, function () {
						  cell.url = '';
						  call();
						});
					  },
					  timeline: elem.timeline,
					  title: elem.title
					};
					if (elem == item) cell.url = stream;
					playlist.push(cell);
				  });
				  Lampa.Player.playlist(playlist);
				} else {
				  Lampa.Player.playlist([first]);
				}
				html.find('.online_modss__scan-file').remove();
				component.savehistory(object);
				item.mark();
			  }, function () {
				html.find('.online_modss__scan-file').remove();
				Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
				Lampa.Controller.toggle('content');
			  });
			
		  },
		  onContextMenu: function onContextMenu(item, html, data, call) {
			call(getFile(item, item.quality));
		  }
		});
	}
  }

  function bdys1(component, _object, rule) {
    var network = new Lampa.Reguest();
    var extract = {};
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var choice = {
      season: 0,
      voice: 0,
      order: 0,
      voice_name: ''
    };
    var get_links_wait = false;
    var results = [];
    var proxy_url = '';
    var proxy = 'https://cors.eu.org/';

    this.searchByTitle = function (_object, kinopoisk_id) {
      object = _object;
      select_title = object.search || object.movie.title;
      // doreg = rule;
      get_links_wait = true;

      network.clear();
      network.timeout(1000 * 15);
      network["native"](proxy_url + object.url, function (str) {
        // var parsedData = doreg.search_json ? str : str;

        var parsedData = str;

        var searchresult = $('div#play-list > div', parsedData).find('a').length;
        if (searchresult > 0) {
          dodetail(parsedData);
        } else component.emptyForQuery(select_title);

        component.loading(false);
      }, function (a, c) {
        component.empty(network.errorDecode(a, c));
      }, false, {
        dataType: 'text',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
          // 'Referer': ""
        }
      });
    };

	this.extendChoice = function (saved) {
		Lampa.Arrays.extend(choice, saved, true);
	  };
	  this.reset = function () {
		component.reset();
		choice = {
		  season: 0,
		  voice: 0,
		  voice_name: '',
		  voice_id: 0, 
		  order: 0
		};
		filter();
		append(filtred());
	  };
	  this.filter = function (type, a, b) {
		choice[a.stype] = b.index;
	
		if (a.stype == 'voice') {
		  choice.voice_name = filter_items.voice[b.index];
		  choice.voice_id = filter_items.voice_info[b.index] && filter_items.voice_info[b.index].id;
		}
	
		component.reset();
		filter();
		append(filtred());
	  };
	  this.destroy = function () {
		network.clear();
		results = null;
	  };

    function parse(str) {
      if (get_links_wait) component.append($('<div class="broadcast__scan"><div></div></div>'));
        // dodetail(item.Link, str, item.Title);
    }

    function dodetail(str) {
      //取得具体页面的详情地址
      results = [];
	  
      $('div#play-list > div', str).find('a').each(function (i, a) {
        results.push({
          file: 'https://www.bdys10.com' + $(a).attr('href'),
          quality: '哔嘀影视 / ' + ($(a).attr('title') || $(a).text()),
          title: ($(a).attr('title') || $(a).text()),
		  season: object.ext_seasonnumber ? object.ext_seasonnumber : '',
          episode: object.ext_seasonnumber ? component.extractEpisodeNumber($(a).attr('title') || $(a).text()) : '',
          info: ''
        });
      });
      filter();
      append(filtred());
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
      component.order.forEach(function (i) {
        filter_items.order.push(i.title);
      });
      component.filter(filter_items, choice);
    }

    function filtred() {

      var mapResult = results.map(function (item, index, array) {
        return item;
      });
      return component.order[choice.order].id == 'invers' ? mapResult.reverse() : mapResult;
    }

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
		  quality = {};
		  var mass = [1080, 720, 480, 360];
		  mass.forEach(function (n) {
			var exes = items.find(function (a) {
			  return a.quality == n;
			});
	
			if (exes) {
			  if (!file) file = exes.file;
			  quality[n + 'p'] = exes.file;
			}
		  });
		  var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
		  if (quality[preferably]) file = quality[preferably];
		}
	
		return {
		  file: file,
		  quality: quality
		};
	}

	function getStream(element, call, error) {
		function removeScriptContentWithKeywords(keywords, webpageContent) {
			for (var keyword of keywords) {
			  var regex = new RegExp(`<script\\b[^>]*>[^<]*${keyword}[^<]*<\\/script\\b[^>]*>`, 'g');
			  webpageContent = webpageContent.replace(regex, '');
			}
		  
			return webpageContent;
		  }
		if (element.stream) return call(element.stream);
		// var url = element.file || '';

		if (element.file) {
			network["native"](element.file, function (data) {
				var str = data
					.replace(/src="\/\//g, 'src="https://')
					.replace(/href="\/\//g, 'href="https://')
					.replace(/<\/?(head|meta|body|html)[^>]*>/g, '')
					.replace(/<title>.*?<\/title>/g, '')
					.replace(/\/1\.(23|24|25|26)\.0\/DPlayer\.min\.js/, '/1.27.0/DPlayer.min.js')
					.replace(/<script[^>]*src=["'][^"']*jquery[^"']*["'][^>]*><\/script>/gi, '')
					.replace(/<script[^>]*src=["'][^"']*comment[^"']*["'][^>]*><\/script>/gi, '')
					.replace(/<script[^>]*src=["'][^"']*common[^"']*["'][^>]*><\/script>/gi, '')

					// .replace(/<script[^>]*src=["'][^"']*crypto-js[^"']*["'][^>]*><\/script>/gi, '')
					.replace(/src="[^"]*crypto-js\.min\.js"/g, 'src="https://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"')
					.replace(/src="[^"]*crypto-js\.js"/g, 'src="https://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"')
					.replace(/src="[^"]*md5\.min\.js"/g, 'src="https://qu.ax/QlBB.js"')
				// .replace('/v4/js/bdplayer.js?v=1.0.6', 'https://qu.ax/LpHD.js');
				

				// 获取当前页面的 URL
				var currentPageUrl = element.file;
				// 判断当前页面的 URL 是否是绝对路径

				str = str.replace(/(src|href)=("|')((?!http|https|\/\/|data:)[^"']+)/ig, function (match, p1, p2, p3) {
					return p1 + '=' + p2 + component.getAbsolutePath(currentPageUrl.split("?")[0] ? currentPageUrl.split("?")[0] : currentPageUrl, p3);
				});
				str = removeScriptContentWithKeywords(['lozad()', 'IsPC'], str)
				// console.log($(str).children(":not(#video)").remove().end().html());
				// 使用 jQuery 创建一个虚拟 DOM 元素
				// console.log(str)
// 				var $html = $("<div>").html(str);

// 				// 提取#video元素的内容
// 				// var videoContent = $html.find("#video").html();
// 				var videoContent = $html.find("#video")[0].outerHTML;
				
// 				// 提取所有的内联 JavaScript 代码和外部 JavaScript 文件引用，保持原始顺序
// 				var scriptTags = $html.find("script").map(function () {
// 					return this;
// 				}).get();

// 				// 创建一个新的 HTML 字符串，包含#video元素内容和内联 JavaScript 代码
// 				var newHTML = `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <title>播放页面</title>
//     </head>
//     <body>
//       ${videoContent}
//     </body>
//   </html>
// `;

// 				// 将内联 JavaScript 代码和外部 JavaScript 文件引用添加到新 HTML 字符串中，保持原始顺序
// 				scriptTags.forEach(function (tag) {
// 					newHTML = newHTML.replace('</body>', tag.outerHTML + '</body>');
// 				});

// 				console.log(newHTML); // 输出新的 HTML 字符串
				var $html = $("<div>").html(str);

				// 提取#video元素的内容
				var videoContent = $html.find("#video")[0].outerHTML;

				// 提取所有的内联 JavaScript 代码和外部 JavaScript 文件引用，保持原始顺序
				var scriptTags = $html.remove("#video").find("script").map(function () {
					return this;
				}).get();

				// 创建一个新的 HTML 字符串，包含#video元素内容
				var newHTML = `
    <head>
    </head>
    <body>
      ${videoContent}
    </body>
`;

				// 将内联 JavaScript 代码和外部 JavaScript 文件引用添加到新 HTML 字符串中，保持原始顺序
				scriptTags.forEach(function (tag) {
					if (tag.src) {
						newHTML = newHTML.replace('</body>', tag.outerHTML + '</body>');
					} else {
						newHTML = newHTML.replace('</head>', tag.outerHTML + '</head>');
					}
				});
				newHTML = newHTML.replace(/<\/?head>|<\/?body>/g, '');

				// console.log(newHTML); // 输出新的 HTML 字符串

				$('.iframe').remove();
				Lampa.Template.add('playerwindow', "<div class=\"iframe\">\n    </div>");
				var html$2 = Lampa.Template.get('playerwindow');
				$('body').append(html$2);

				return new Promise(function (resolve, reject) {
					$('.iframe').append(`
                ${newHTML}
              `);
					resolve(); // 表示添加完成
				})
					.then(function () {
						toggle();
						setTimeout(function () {
							var playulr = $('video').attr('src') || document.querySelector('source').src;
							console.log('playulr=', playulr)
							if (typeof playulr !== "undefined") {
								var file = playulr;
								//console.log(file);
								if (file) {
									if (file) {
										element.stream = file;
										// element.qualitys = quality;
										call(element.stream);
									} else error();
									$('#artplayer').remove();
									close();
								} else {
									// Lampa.Noty.show('无法检索链接');
									error();
									close();
								}
							} else {
								// Lampa.Noty.show('无法找到视频地址');
								error();
								close();
							};
						}, 300);

					})
					.catch(function (error) {
						console.error('添加内容时出错：', error);
					});

				function toggle() {
					Lampa.Controller.add('playerwindow', {
						toggle: function toggle() {
							var focus = $('.iframe > div').addClass('selector');
							// console.log(focus[0])
							Lampa.Controller.collectionSet($('.iframe'));
							Lampa.Controller.collectionFocus(focus[0], $('.iframe'));
						},
						back: close
					});
					Lampa.Controller.toggle('playerwindow');
				}

				function close() {
					// html$2.removeClass('iframe--loaded');
					// Lampa.Keypad.listener.destroy();
					html$2.detach();
					Lampa.Controller.toggle('content');
					// html$2.find('iframe').attr('src', '');
					html$2.find('iframe').html('');
					// if (object.onBack) object.onBack();
				}
			}, function (a, c) {
				Lampa.Noty.show(network.errorDecode(a, c));
			}, false, {
				dataType: 'text',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36',
				}
			});
		} else {
			error();
			return;
		}
	  }

	function append(items) {
		component.reset();
		component.draw(items, {
		//   onRender: function onRender(item, html) {
		// 	if (get_links_wait) html.find('.online_modss__body').append($('<div class="online_modss__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
		//   },
		onEnter: function onEnter(item, html) {
			  component.render().find('.online_modss__scan-file').remove();  
			  html.find('.online_modss__body').append($('<div class="online_modss__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
			  getStream(item, function (stream) {
				var first = {
				  url: stream,
				  timeline: item.timeline,
				  quality: item.qualitys,
				  subtitles: item.subtitles,
				  title: item.title + ' / ' + item.quality
				};
				Lampa.Player.play(first);
	  
				if (item.season) {
				  var playlist = [];
				  items.forEach(function (elem) {
					var cell = {
					  url: function url(call) {
						getStream(elem, function (stream) {
						  cell.url = stream;
						  cell.quality = elem.qualitys;
						  call.subtitles = elem.subtitles;
						  elem.mark();
						  call();
						}, function () {
						  cell.url = '';
						  call();
						});
					  },
					  timeline: elem.timeline,
					  title: elem.title
					};
					if (elem == item) cell.url = stream;
					playlist.push(cell);
				  });
				  Lampa.Player.playlist(playlist);
				} else {
				  Lampa.Player.playlist([first]);
				}
				html.find('.online_modss__scan-file').remove();
				component.savehistory(object);
				item.mark();
			  }, function () {
				html.find('.online_modss__scan-file').remove();
				Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
				Lampa.Controller.toggle('content');
			  });
			
		  },
		  onContextMenu: function onContextMenu(item, html, data, call) {
			call(getFile(item, item.quality));
		  }
		});
	}
  }

  function xiaoyaalist(component, _object, doreg) {
    var alistip = Lampa.Utils.checkHttp(Lampa.Storage.get("online_mod_alist"));//'http://192.168.2.1:8678';

    //var alistip = 'http://alist.xiaoya.pro';
    var network = new Lampa.Reguest();
    var extract = {};
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var choice = {
      season: 0,
      voice: 0,
      order: 0,
      voice_name: ''
    };
    var resp;
    var search_videos;
    var find_videos;
    var results = [];

    this.searchByTitle = function (_object, kinopoisk_id) {
      object = _object;
      select_title = object.search || object.movie.title;
    //   doreg = rule;
      var url1 = alistip + '/search?box=#msearchword&url=&type=video';
      url1 = url1.replace('#msearchword', encodeURIComponent(select_title));

      network.clear();
      network.timeout(1000 * 15);
      network["native"](url1, function (json) {
        //console.log($("a", json))
        //console.log($("a", json).length)
        if ($("a", json).length > 2) {
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

    this.filter = function (type, a, b) {
      choice[a.stype] = b.index;
      component.reset();
      filter();
      append(filtred());
      component.saveChoice(choice);
    };

    this.destroy = function () {
      network.clear();
      extract = null;
      results = null;
    };

    function parse(json) {
      var str = json.replace(/\n/g, '');
      var h = $("a", str);
      //console.log(h)
      results = [];
      $(h).each(function (i, html) {

        //console.log(html)
        //json.forEach(function (a) {
        //console.log(html.text)
        //if ((html.text != '') || (html.text !='关注小雅的tg频道')){
        results.push({
          file: html.href,
          quality: '小雅的Alist',
          //quality: $('p',html).text().replace(/文件夹/,'目录'),
          title: html.text,
          season: '',
          episode: '',
          info: '',
          search_title: select_title,
		  time: ''
        });
        //}
        //});
      });
      //删除前两个数组
      results.splice(0, 2);
      // result.sort(function(a, b) {
      //   if (a.title < b.title) {
      //     return 1;
      //   } else if (a.title > b.title) {
      //     return -1;
      //   }
      //   return 0;
      // });

      append(filtred());
      results = [];

    }

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
      component.order.forEach(function (i) {
        filter_items.order.push(i.title);
      });
      component.filter(filter_items, choice);
    }

    function filtred() {
      return results;
    }

    function append(items) {
      var _this = this;
      component.reset();
      var viewed = Lampa.Storage.cache('online_view', 5000, []);
      items.forEach(function (element, item_id) {
        var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
        var view = Lampa.Timeline.view(hash);
        var item = Lampa.Template.get('modss_online_folder', element);
        var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
        element.timeline = view;
        item.append(Lampa.Timeline.render(view));

        if (Lampa.Timeline.details) {
          item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
        }

        if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
        item.on('hover:enter', function () {
          // object.movie.id = object.url;
          choice.last_viewed = item_id;
          if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
          component.activity.loader(true);

          element.img = object.movie.img;
          element.original_title = '';
          // Lampa.Activity.push
          Lampa.Activity.replace({
            url: alistip + '/' + element.title,
            title: 'Alist - ' + element.search_title,
            component: 'alist',
            movie: element,
            page: 1
          });

          // if (element.file) {
          //   network["native"](element.file, function (json) {
          //     if (json.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
          //      var link = json.match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)[0];
          //       element.img = object.movie.img;
          //       element.original_title = '';
          //       Lampa.Activity.push({
          //         url: link,
          //         title: '阿里云盘播放',
          //         component: 'yunpan2',
          //         movie: element,
          //         page: 1
          //       });
          //     } else component.emptyForQuery(select_title);

          //     component.loading(false);
          //   }, function (a, c) {
          //     component.empty(network.errorDecode(a, c));
          //   }, false, {
          //     dataType: 'text',
          //   });
          //   component.loading(false);

          //   if (viewed.indexOf(hash_file) == -1) {
          //     viewed.push(hash_file);
          //     item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          //     Lampa.Storage.set('online_view', viewed);
          //   }
          // } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
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

  function trex(component, _object, doreg) {
    var network = new Lampa.Reguest();
    var extract = {};
    var object = _object;
    var select_title = '';
    var filter_items = {};
    var choice = {
      season: 0,
      voice: 0,
      order: 0,
      voice_name: ''
    };

    var results = [];

    this.searchByTitle = function (_object, kinopoisk_id) {
      object = _object;
      select_title = object.search || object.movie.title;
    //   doreg = rule;
      var url1 = 'https://t-rex.tzfile.com/movies?archiveSearch=#msearchword';
	  
      url1 = url1.replace('#msearchword', encodeURIComponent(object.movie.title)).replace(/\([^)]*\)/g, '').trim();

      network.clear();
      network.timeout(1000 * 15);
      network["native"](url1, function (json) {
        if ($('div.post-module-thumb > a', json).length > 0) {
          parse(json);
        } else component.emptyForQuery(select_title);

        component.loading(false);
      }, function (a, c) {
        component.empty(network.errorDecode(a, c));
      }, false, {
        dataType: 'text',
        headers: {
          'Referer': 'https://t-rex.tzfile.com/',
          'User-Agent': component.UC_UA
        }
      });
    };

    this.extendChoice = function (saved) {
      Lampa.Arrays.extend(choice, saved, true);
    };

    this.reset = function () {
      component.reset();
      choice = {
        season: 0,
        voice: 0,
        order: 0
      };
      filter();
      append(filtred());
      component.saveChoice(choice);
    };

    this.filter = function (type, a, b) {
      choice[a.stype] = b.index;
      component.reset();
      filter();
      append(filtred());
      component.saveChoice(choice);
    };

    this.destroy = function () {
      network.clear();
      extract = null;
      results = null;
    };

    function parse(json) {
      var str = json.replace(/\n/g, '');
      var h = $('div.post-module-thumb > a', str);
      //console.log(h)
      results = [];
      $(h).each(function (i, html) {

        //console.log(html)
        //json.forEach(function (a) {
        results.push({
          file: html.href,
          quality: '霸王龙压制组',
          //quality: $('p',html).text().replace(/文件夹/,'目录'),
          title: $('img.post-thumb',html).attr('alt'),
          season: '',
          episode: '',
          info: '',
		  time: ''
        });
        //});
      });

      append(filtred());
      results = [];

    }

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
      component.order.forEach(function (i) {
        filter_items.order.push(i.title);
      });
      component.filter(filter_items, choice);
    }

    function filtred() {

      return results;
    }

    function append(items) {
      var _this = this;
      component.reset();
      var viewed = Lampa.Storage.cache('online_view', 5000, []);
      items.forEach(function (element, item_id) {
        var hash = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title].join('') : object.movie.original_title);
        var view = Lampa.Timeline.view(hash);
        var item = Lampa.Template.get('modss_online_folder', element);
        var hash_file = Lampa.Utils.hash(element.quality ? [element.quality, element.title, element.file, object.movie.original_title, element.title].join('') : object.movie.original_title + 'libio');
        element.timeline = view;
        item.append(Lampa.Timeline.render(view));

        if (Lampa.Timeline.details) {
          item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
        }

        if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
        item.on('hover:enter', function () {
          // object.movie.id = object.url;
          choice.last_viewed = item_id;
          if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
          component.activity.loader(true);

          if (element.file) {
            network["native"](element.file, function (json) {
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
              headers: {
                'Referer': 'https://t-rex.tzfile.com/',
                'User-Agent': component.UC_UA
              }
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
        // component.contextmenu({
        //   item: item,
        //   view: view,
        //   viewed: viewed,
        //   choice: choice,
        //   hash_file: hash_file,
        //   file: function file(call) {
        //     call({
        //       file: element.file
        //     });
        //   }
        // });
      });
      component.start(true);
    }
  }

//   function videocdn(component, _object) {
//     var network = new Lampa.Reguest();
//     var extract = {};
//     var results = [];
//     var object = _object;
//     var get_links_wait = false;
//     var filter_items = {};
//     var choice = {
//       season: 0,
//       voice: 0,
//       voice_name: '',
//       voice_id: 0, 
//       order: 0
//     };
    
//     function _typeof(obj) {
//   		"@babel/helpers - typeof";
//   		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
//   			return typeof obj;
//   		} : function (obj) {
//   			return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
//   		}, _typeof(obj);
//   	}

//     this.search = function (_object,data) {
//       object = _object;
//       var itm = data[0];
//       var select_title = itm.title || object.movie.title;
//       var url = 'http://videocdn.tv/api/';
//       var type = itm.iframe_src.split('/').slice(-2)[0];
//       if (type == 'movie') type = 'movies';
//       if (type == 'anime') type = 'animes';
//       url += type;
//       url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
//       url = Lampa.Utils.addUrlComponent(url, 'query=' + (itm.imdb_id ? encodeURIComponent(itm.imdb_id) : (itm.kinopoisk_id || itm.kinopoisk_ID) ? encodeURIComponent(itm.kinopoisk_id || itm.kinopoisk_ID) : encodeURIComponent(select_title)));
//       url = Lampa.Utils.addUrlComponent(url, 'field=' + (itm.imdb_id ? 'imdb_id' : (itm.kinopoisk_id || itm.kinopoisk_ID) ? 'kinopoisk_id' : 'title'));
//       network.clear();
//       network.timeout(20000);
//       network.silent(url, function (found) {
//         results = found.data.filter(function (elem) {
//           return elem.id == itm.id;
//         });
//         success(results);
//         component.loading(false);
//         if (!results.length) component.emptyForQuery(select_title);
//       }, function (a, c) {
//         component.empty(network.errorDecode(a, c));
//       });
//     };
//     this.extendChoice = function (saved) {
//       Lampa.Arrays.extend(choice, saved, true);
//     };
//     this.reset = function () {
//       component.reset();
//       choice = {
//         season: 0,
//         voice: 0,
//         voice_name: '',
//         voice_id: 0, 
//         order: 0
//       };
//       filter();
//       append(filtred());
//     };
//     this.filter = function (type, a, b) {
//       choice[a.stype] = b.index;
  
//       if (a.stype == 'voice') {
//         choice.voice_name = filter_items.voice[b.index];
//         choice.voice_id = filter_items.voice_info[b.index] && filter_items.voice_info[b.index].id;
//       }
  
//       component.reset();
//       filter();
//       append(filtred());
//     };
//     this.destroy = function () {
//       network.clear();
//       results = null;
//     };
//     function success(json) {
//       results = json;
//       extractData(json);
//       filter();
//       append(filtred());
//     }
//     function extractItems(str) {
//       try {
//         var items = component.parsePlaylist(str).map(function (item) {
//           var quality = item.label.match(/(\d\d\d+)p/);
//           var file = item.links[0];
//           if (file) file = 'http:' + file;
//           return {
//             label: item.label,
//             quality: quality ? parseInt(quality[1]) : NaN,
//             file: file || ''
//           };
//         });
//         items.sort(function (a, b) {
//           if (b.quality > a.quality) return 1;
//           if (b.quality < a.quality) return -1;
//           if (b.label > a.label) return 1;
//           if (b.label < a.label) return -1;
//           return 0;
//         });
//         return items;
//       } catch (e) {}
  
//       return [];
//     }
//     function extractData(results) {
//       network.timeout(20000);
//       var movie = results.slice(0, 1)[0];
//       extract = {};
  
//       if (movie) {
//         var src = movie.iframe_src;
//         var meta = $('head meta[name="referrer"]');
//         var referrer = meta.attr('content') || 'never';
//         meta.attr('content', 'unsafe-url');
//         network.silent('http:' + src, function (raw) {
//           meta.attr('content', referrer);
//           get_links_wait = false;
//           component.render().find('.online_modss__scan-file').remove();
//           var math = raw.replace(/\n/g, '').match(/id="files" value="(.*?)"/);
          
//           if (!math) {
//             math = raw.replace(/\n/g, '').match(/id="files" value='(.*?)'/);
//           }
  
//           if (math) {
//             var text = document.createElement("textarea");
//             text.innerHTML = math[1];
//             var json = Lampa.Arrays.decodeJson(text.value, {});
  
//             for (var i in json) {
//               if (0 === i - 0) {
//                 continue;
//               }
  
//               extract[i] = {
//                 json: _typeof(json[i]) === 'object' ? json[i] : Lampa.Arrays.decodeJson(json[i], {}),
//                 items: extractItems(json[i])
//               };
  
//               for (var a in extract[i].json) {
//                 var elem = extract[i].json[a];
  
//                 if (elem.folder) {
//                   for (var f in elem.folder) {
//                     var folder = elem.folder[f];
//                     folder.items = extractItems(folder.file);
//                   }
//                 } else elem.items = extractItems(elem.file);
//               }
//             }
//           }
//         }, function () {
//           meta.attr('content', referrer);
//           get_links_wait = false;
//           component.render().find('.online_modss__scan-file').remove();
//         }, false, {
//           dataType: 'text'
//         });
//       }
//     }
//     function getFile(element, max_quality) {
//       var translat = extract[element.translation];
//       var id = element.season + '_' + element.episode;
//       var file = '';
//       var items = [];
//       var quality = false;
  
//       if (translat) {
//         if (element.season) {
//           for (var i in translat.json) {
//             var elem = translat.json[i];
  
//             if (elem.folder) {
//               for (var f in elem.folder) {
//                 var folder = elem.folder[f];
  
//                 if (folder.id == id) {
//                   items = folder.items;
//                   break;
//                 }
//               }
//             } else if (elem.id == id) {
//               items = elem.items;
//               break;
//             }
//           }
//         } else {
//           items = translat.items;
//         }
//       }
  
//       if (items && items.length) {
//         quality = {};
//         var mass = [1080, 720, 480, 360];
//         mass.forEach(function (n) {
//           var exes = items.find(function (a) {
//             return a.quality == n;
//           });
  
//           if (exes) {
//             if (!file) file = exes.file;
//             quality[n + 'p'] = exes.file;
//           }
//         });
//         var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
//         if (quality[preferably]) file = quality[preferably];
//       }
  
//       return {
//         file: file,
//         quality: quality
//       };
//     }
//     function filter() {
//       filter_items = {
//         season: [],
//         voice: [],
//         voice_info: [], 
//         order: []
//       };
//       results.slice(0, 1).forEach(function (movie) {
//         if (movie.episodes) {
//           var season_count = 1;
//           movie.episodes.forEach(function (episode) {
//             if (episode.season_num > season_count) {
//               season_count = episode.season_num;
//             }
//           });
//           var s = season_count;
  
//           while (s--) {
//             filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (season_count - s));
//           }
//         }
  
//         if (!filter_items.season[choice.season]) choice.season = 0;
  
//         if (movie.episodes) {
//           component.order.forEach(function (i){
//   					filter_items.order.push(i.title);
//   				});
//           movie.episodes.forEach(function (episode) {
//             if (episode.season_num == choice.season + 1) {
//               episode.media.forEach(function (media) {
//                 if (!filter_items.voice_info.find(function (v) {
//                   return v.id == media.translation.id;
//                 })) {
//                   filter_items.voice.push(media.translation.shorter_title || media.translation.short_title || media.translation.title);
//                   filter_items.voice_info.push({
//                     id: media.translation.id
//                   });
//                 }
//               });
//             }
//           });
//         }
//       });
//       if (!filter_items.season[choice.season]) choice.season = 0;
//       if (!filter_items.voice[choice.voice]) choice.voice = 0;
  
//       if (choice.voice_name) {
//         var inx = -1;
  
//         if (choice.voice_id) {
//           var voice = filter_items.voice_info.find(function (v) {
//             return v.id == choice.voice_id;
//           });
//           if (voice) inx = filter_items.voice_info.indexOf(voice);
//         }
  
//         if (inx == -1) inx = filter_items.voice.indexOf(choice.voice_name);
//         if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
//           choice.voice = inx;
//         }
//       }
  
//       component.filter(filter_items, choice);
//     }    
//     function filtred() {
//       var filtred = [];
//         results.slice(0, 1).forEach(function (movie) {
//         if (movie.episodes) {
//           movie.episodes.forEach(function (episode) {
//             if (episode.season_num == choice.season + 1) {
//               var temp = episode.media.filter(function (m) {
//                 return filter_items.voice_info[choice.voice] && m.translation.id == filter_items.voice_info[choice.voice].id;
//               });
//               temp.sort(function (a, b) {
//                 return b.max_quality - a.max_quality;
//               });
//               temp.slice(0, 1).forEach(function (media) {
//                 var num = parseInt(episode.num);
//                 if (isNaN(num)) num = episode.num;
//                 filtred.push({
//                   episode: num,
//                   season: episode.season_num,
//                   title: episode.ru_title,
//                   quality: media.max_quality + 'p' + (media.source_quality ? ' - ' + media.source_quality.toUpperCase() : ''),
//                   translation: media.translation_id,
//                   info: filter_items.voice[choice.voice],
//                   voice_name: filter_items.voice[choice.voice]
//                 });
//               });
//               filtred.sort(function (a, b) {
//                 return a.episode - b.episode;
//               });
//             }
//           });
//         } else if(movie.media){
//           movie.media.forEach(function (element) {
//             filtred.push({
//               title: element.translation.shorter_title,
//               quality: element.max_quality + 'p' + (element.source_quality ? ' - ' + element.source_quality.toUpperCase() : ''),
//               translation: element.translation_id,
//               voice_name: element.translation.shorter_title
//             });
//           });
//         }
//       });
//       return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
//     }
//     function toPlayElement(element) {
//       var extra = getFile(element, element.quality);
//       var play = {
//         title: element.title,
//         url: extra.file,
//         quality: extra.quality,
//         timeline: element.timeline,
//         callback: element.mark
//       };
//       return play;
//     }
//     function append(items) {
//       component.reset();
//       component.draw(items, {
//         onRender: function onRender(item, html) {
//           if (get_links_wait) html.find('.online_modss__body').append($('<div class="online_modss__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
//         },
//         onEnter: function onEnter(item, html) {
//           var extra = getFile(item, item.quality);
  
//           if (extra.file) {
//             var playlist = [];
//             var first = toPlayElement(item);
  
//             if (item.season) {
//               items.forEach(function (elem) {
//                 playlist.push(toPlayElement(elem));
//               });
//             } else {
//               playlist.push(first);
//             }
  
//             if (playlist.length > 1) first.playlist = playlist;
//             Lampa.Player.play(first);
//             Lampa.Player.playlist(playlist);
//             item.mark();
//           } else Lampa.Noty.show(Lampa.Lang.translate(get_links_wait ? 'modss_waitlink' : 'modss_nolink'));
//         },
//         onContextMenu: function onContextMenu(item, html, data, call) {
//           call(getFile(item, item.quality));
//         }
//       });
//     }
//   }
  
//   function rezka(component, _object) {
//     var network = new Lampa.Reguest();
//     var extract = {};
//     var prox = component.proxy('hdrezka');
//     var embed = prox ? prox + 'http://voidboost.tv/' : 'https://voidboost.tv/';
//     var object = _object;
//     var select_id = '';
//     var filter_items = {};
//     var choice = {
//       season: 0,
//       voice: 0,
//       order: 0,
//       voice_name: ''
//     };
//     this.searchByKinopoisk = function (_object, id) {
//       object = _object;
//       select_id = id;
//       getFirstTranlate(id, function (voice) {
//         getFilm(id, voice);
//       });
//     };
//     this.searchByImdbID = function (_object, id) {
//       object = _object;
//       select_id = id;
//       getFirstTranlate(id, function (voice) {
//         getFilm(id, voice);
//       });
//     };
//     this.extendChoice = function (saved) {
//       Lampa.Arrays.extend(choice, saved, true);
//     };
//     this.reset = function () {
//       component.reset();
//       choice = {
//         season: 0,
//         voice: 0,
//         voice_name: ''
//       };
//       component.loading(true);
//       getFirstTranlate(select_id, function (voice) {
//         getFilm(select_id, voice);
//       });
//       component.saveChoice(choice);
//     };
//     this.filter = function (type, a, b) {
//       choice[a.stype] = b.index;
//       if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
//       component.reset();
//       filter();
//       component.loading(true);
//       choice.voice_token = extract.voice[choice.voice].token;
//       getFilm(select_id, choice.voice_token);
//       component.saveChoice(choice);
//       setTimeout(component.closeFilter, 10);
//     };
//     this.destroy = function () {
//       network.clear();
//       extract = null;
//     };
//     function getSeasons(voice, call) {
//       var url = embed + 'serial/' + voice + '/iframe?h=gidonline.io';
//       network.clear();
//       network.timeout(10000);
//       network["native"](url, function (str) {
//         extractData(str);
//         call();
//       }, function (a, c) {
//         component.doesNotAnswer();
//       }, false, {
//         dataType: 'text'
//       });
//     }
//     function getChoiceVoice() {
//       var res = extract.voice[0];
  
//       if (choice.voice_token) {
//         extract.voice.forEach(function (voice) {
//           if (voice.token === choice.voice_token) res = voice;
//         });
//       }
  
//       return res;
//     }
//     function getFirstTranlate(id,call) {
//       network.clear();
//       network.timeout(10000);
      
//       network["native"](embed + 'embed/' + id, function (str) {
//         extractData(str);
//         if (extract.voice.length) call(getChoiceVoice().token);
//         else component.doesNotAnswer(object.movie.title);
//       }, function (a, c) {
//         component.doesNotAnswer(a.status == 404 && a.responseText && (a.responseText.indexOf('Видео не найдено') !== -1 ||  a.responseText.indexOf('Not Found') !== -1) ? object.movie.title : '');
//       }, false, {
//         dataType: 'text'
//       });
//     }
//     function getEmbed(url) {
//       network.clear();
//       network.timeout(10000);
//       network.silent(url, function (str) {
//         component.loading(false);
//         extractData(str);
//         filter();
//         append();
//       }, function (a, c) {
//         component.doesNotAnswer();
//       }, false, {
//         dataType: 'text'
//       });
//     }
//     function getFilm(id, voice) {
//       var url = embed;
//       if (voice) {
//         if (extract.season.length) {
//           var ses = extract.season[Math.min(extract.season.length - 1, choice.season)].id;
//           url += 'serial/' + voice + '/iframe?s=' + ses + '&h=gidonline.io';
//           return getSeasons(voice, function () {
//             var check = extract.season.filter(function (s) {
//               return s.id == ses;
//             });
  
//             if (!check.length) {
//               choice.season = extract.season.length - 1;
//               url = embed + 'serial/' + voice + '/iframe?s=' + extract.season[choice.season].id + '&h=gidonline.io';
//             }
  
//             getEmbed(url);
//           });
//         } else {
//           url += 'movie/' + voice + '/iframe?h=gidonline.io';
//           getEmbed(url);
//         }
//       } else {
//         url += 'embed/' + id;
//         getEmbed(url);
//       }
//     }
//     function filter() {
//       filter_items = {
//         season: extract.season.map(function (v) {
//           return v.name;
//         }),
//         voice: extract.season.length ? extract.voice.map(function (v) {
//           return v.name;
//         }) : []
//       };
  
//       if (choice.voice_name) {
//         var inx = filter_items.voice.map(function (v) {
//           return v.toLowerCase();
//         }).indexOf(choice.voice_name.toLowerCase());
//         if (inx == -1) choice.voice = 0;
//         else if (inx !== choice.voice) {
//           choice.voice = inx;
//         }
//       }
      
//       if(!extract.season[choice.season]) choice.season = 0;
//       else choice.seasons = filter_items.season.length;
  
//       component.filter(filter_items, choice);
//     }
//     function parseSubtitles(str) {
//       var subtitles = [];
//       var subtitle = str.match("'subtitle': '(.*?)'");
  
//       if (subtitle) {
//         subtitles = component.parsePlaylist(subtitle[1]).map(function (item) {
//           return {
//             label: item.label,
//             url: item.links[0]
//           };
//         });
//       }
  
//       return subtitles.length ? subtitles : false;
//     }
//     function extractItems(str) {
//       try {
//         var items = component.parsePlaylist(str).map(function (item) {
//           var quality = item.label.match(/(\d\d\d+)p/);
//           var links;
  
//           links = item.links.filter(function (url) {
//             return /\.mp4$/i.test(url);
//           });
          
//           if (!links.length) links = item.links;
//           return {
//             label: item.label,
//             quality: quality ? parseInt(quality[1]) : NaN,
//             file: links[0]
//           };
//         });
//         items.sort(function (a, b) {
//           if (b.quality > a.quality) return 1;
//           if (b.quality < a.quality) return -1;
//           if (b.label > a.label) return 1;
//           if (b.label < a.label) return -1;
//           return 0;
//         });
//         return items;
//       } catch (e) {}
  
//       return [];
//     }
//     function getStream(element, call, error) {
//       if (element.stream) return call(element.stream);
//       var url = embed;
  
//       if (element.season) {
//         url += 'serial/' + element.voice.token + '/iframe?s=' + element.season + '&e=' + element.episode + '&h=gidonline.io';
//       } else {
//         url += 'movie/' + element.voice.token + '/iframe?h=gidonline.io';
//       }
  
//       network.clear();
//       network.timeout(5000);
//       network["native"](url, function (str) {
//         var videos = str.match("'file': '(.*?)'");
  
//         if (videos) {
//           var video = decode(videos[1]),
//               file = '',
//               quality = false;
//           var items = extractItems(video);
  
//           if (items && items.length) {
//             file = items[0].file;
//             quality = {};
//             items.forEach(function (item) {
//               quality[item.label] = item.file;
//             });
//             var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
//             if (quality[preferably]) file = quality[preferably];
//           }
  
//           if (file) {
//             element.stream = file;
//             element.qualitys = quality;
//             element.subtitles = parseSubtitles(str);
//             call(element.stream);
//           } else error();
//         } else error();
//       }, error, false, {
//         dataType: 'text'
//       });
//     }
//     function decode(data) {
//       if (data.charAt(0) !== '#') return data;
  
//       var enc = function enc(str) {
//         return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
//           return String.fromCharCode('0x' + p1);
//         }));
//       };
  
//       var dec = function dec(str) {
//         return decodeURIComponent(atob(str).split('').map(function (c) {
//           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));
//       };
      
//       var trashList =  ['$$$####!!!!!!!', '^^^^^^##@', '@!^^!@#@@$$$$$', '^^#@@!!@#!$', '@#!@@@##$$@@'];
  
//       var x = data.substring(2);
//       trashList.forEach(function (trash) {
//         x = x.replace('//_//' + enc(trash), '');
//       });
  
//       try {
//         x = dec(x);
//       } catch (e) {
//         x = '';
//       }
  
//       return x;
//     }
//     function extractData(str) {
//       extract.voice = [];
//       extract.season = [];
//       extract.episode = [];
//       str = str.replace(/\n/g, '');
//       var voices = str.match('<select name="translator"[^>]+>(.*?)</select>');
//       var sesons = str.match('<select name="season"[^>]+>(.*?)</select>');
//       var episod = str.match('<select name="episode"[^>]+>(.*?)</select>');
  
//       if (sesons) {
//         var select = $('<select>' + sesons[1] + '</select>');
//         $('option', select).each(function () {
//           extract.season.push({
//             id: $(this).attr('value'),
//             name: $(this).text()
//           });
//         });
//       }
  
//       if (voices) {
//         var _select = $('<select>' + voices[1] + '</select>');
  
//         $('option', _select).each(function () {
//           var token = $(this).attr('data-token');
  
//           if (token) {
//             extract.voice.push({
//               token: token,
//               name: $(this).text(),
//               id: $(this).val()
//             });
//           }
//         });
//       }
  
//       if (episod) {
//         var _select2 = $('<select>' + episod[1] + '</select>');
  
//         $('option', _select2).each(function () {
//           extract.episode.push({
//             id: $(this).attr('value'),
//             name: $(this).text()
//           });
//         });
//       }
//     }
//     function append() {
//       component.reset();
//       var items = [];
  
//       if (extract.season.length) {
//         extract.episode.forEach(function (episode) {
//           items.push({
//             title: episode.name,
//             quality: '720p ~ 1080p',
//             season: extract.season[Math.min(extract.season.length - 1, choice.season)].id,
//             episode: parseInt(episode.id),
//             info: extract.voice[choice.voice].name,
//             voice: extract.voice[choice.voice],
//             voice_name: extract.voice[choice.voice].name
//           });
//         });
//       } else {
//         extract.voice.forEach(function (voice) {
//           items.push({
//             title: voice.name.length > 3 ? voice.name : object.movie.title,
//             quality: '720p ~ 1080p',
//             voice: voice,
//             info: '',
//             voice_name: voice.name
//           });
//         });
//       }
  
//       component.draw(items, {
//         onEnter: function onEnter(item, html) {
//           getStream(item, function (stream) {
//             var first = {
//               url: stream,
//               timeline: item.timeline,
//               quality: item.qualitys,
//               subtitles: item.subtitles,
//               title: item.title
//             };
//             Lampa.Player.play(first);
  
//             if (item.season) {
//               var playlist = [];
//               items.forEach(function (elem) {
//                 var cell = {
//                   url: function url(call) {
//                     getStream(elem, function (stream) {
//                       cell.url = stream;
//                       cell.quality = elem.qualitys;
//                       call.subtitles = elem.subtitles;
//                       elem.mark();
//                       call();
//                     }, function () {
//                       cell.url = '';
//                       call();
//                     });
//                   },
//                   timeline: elem.timeline,
//                   title: elem.title
//                 };
//                 if (elem == item) cell.url = stream;
//                 playlist.push(cell);
//               });
//               Lampa.Player.playlist(playlist);
//             } else {
//               Lampa.Player.playlist([first]);
//             }
//             item.mark();
//           }, function () {
//             Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
//           });
//         },
//         onContextMenu: function onContextMenu(item, html, data, call) {
//           getStream(item, function (stream) {
//             call({
//               file: stream,
//               quality: item.qualitys
//             });
//           });
//         }
//       });
//     }
//   }
  
//   function filmix(component, _object) {
//   	var network = new Lampa.Reguest();
//   	var results = [];
//   	var object = _object;
//   	var embed = Filmix.api_url;
//   	var select_title = '';
//   	var filter_items = {};
//   	var wait_similars;
//   	var id_filmix;
//   	var count = 0;
//   	var choice = {
//   		season: 0,
//   		voice: 0,
//   		order: 0,
//   		voice_name: ''
//   	};
//   	var dev_token = Filmix.user_dev + Filmix.token;
//   	if (!window.FX) {
//   		window.FX = {
//   			max_qualitie: 480,
//   			is_max_qualitie: false, 
//   			auth: false
//   		};
//   	}
//   	this.search = function (_object, sim) {
//       if (wait_similars) this.find(sim[0].id);
//     };
//   	this.searchByTitle = function (_object, query) {
//   		var _this = this;
//   		object = _object;
//   		select_title = query || object.search;
//   		if (object.movie.source == 'filmix') return this.find(object.movie.id);
//   		var search_date = object.search_date || (object.movie.number_of_seasons ? object.movie.first_air_date : object.movie.release_date) || '0000';
//   		var search_year = parseInt((search_date + '').slice(0, 4));
//   		var orig = object.movie.original_title || object.movie.original_name;
//   		var clean_title = component.cleanTitle(select_title).replace(/\b(\d\d\d\d+)\b/g, '+$1');
//   		if (search_year) clean_title = clean_title.replace(new RegExp(' +(' + search_year + ')'), ' $1');
//   		var url = embed + 'search';
//   		url = Lampa.Utils.addUrlComponent(url, 'story=' + encodeURIComponent(clean_title));
//   		url = Lampa.Utils.addUrlComponent(url, dev_token);
//   		network.clear();
//   		network.timeout(15 * 1000);
//   		network.silent(url, function (json) {
//   			var is_sure = false;
//   			if (count == 0 && json.length == 0) _this.searchByTitle(object, object.search_two)&count++;
//   			else if (count == 1 && json.length == 0) component.doesNotAnswer(select_title);
//   			else {
//   		    var cards = json.filter(function (c) {
//             if (!c.year && c.alt_name) c.year = parseInt(c.alt_name.split('-').pop());
//             return !c.year || !search_year || c.year > search_year - 2 && c.year < search_year + 2;
//           });
          
//           if (orig) {
//             var tmp = cards.filter(function (c) {
//               return component.equalTitle(c.original_title, orig);
//             });
//             if (tmp.length) {
//               cards = tmp;
//               is_sure = true;
//             }
//           }
  
//           if (select_title) {
//             var _tmp = cards.filter(function (c) {
//               return component.equalTitle(c.title, select_title);
//             });
//             if (_tmp.length) {
//               cards = _tmp;
//               is_sure = true;
//             }
//           }
  
//           if (cards.length > 1 && search_year) {
//             var _tmp2 = cards.filter(function (c) {
//               return c.year == search_year;
//             });
//             if (_tmp2.length) cards = _tmp2;
//           }
  
//           /*    
//           if (cards.length > 1) {
//             var tmp = cards.filter(function (c) {
//               return c.year == search_year;
//             });
//             if (tmp.length) cards = tmp;
//           }
  
//           if (cards.length > 1) {
//             var _tmp = cards.filter(function (c) {
//               return c.original_title == orig;
//             });
  
//             if (_tmp.length) cards = _tmp;
//           }
  
//           if (cards.length > 1) {
//             var _tmp2 = cards.filter(function (c) {
//               return c.title == select_title;
//             });
  
//             if (_tmp2.length) cards = _tmp2;
//           }
//     				*/
//   				if (cards.length == 1 && is_sure) _this.find(cards[0].id);
//   				else if (json.length) {
//   					wait_similars = true;
//   					json.forEach(function (c) {
//   					  c.type = c.last_episode?'serial':'film';
//   					  c.seasons_count = c.last_episode.season;
//   					  c.episodes_count = c.last_episode.episode;
//   					  c.translations = c.last_episode.translation;
//   					});
//   					component.similars(json);
//   					component.loading(false);
//   				} else component.doesNotAnswer(select_title);
//   			}
//   		}, function (a, c) {
//   			component.doesNotAnswer();
//   		});
//   	};
//   	this.find = function (filmix_id) {
// 			if (!window.FX.is_max_qualitie && !window.FX.auth) {
// 				Filmix.checkPro(Filmix.token, function (found) {
// 				 	window.FX.auth = false;
// 					window.FX.is_max_qualitie = false;
// 					if (found && found.user_data) {
// 					  window.FX.auth = true;
// 				    window.FX.date = found.user_data.pro_date;
// 						window.FX.max_qualitie = 720;
// 				    if (found.user_data.is_pro || found.user_data.is_pro_plus) window.FX.is_max_qualitie = true;
// 						if (found.user_data.is_pro) window.FX.max_qualitie = 1080;
// 						if (found.user_data.is_pro_plus) window.FX.max_qualitie = 2160;
// 					}
// 					end_search(filmix_id);
// 				}, function () {
// 				  window.FX.auth = false;
// 				  window.FX.max_qualitie = 480;
// 				  end_search(filmix_id);
// 				});
// 			} else end_search(filmix_id);

// 		  function end_search(filmix_id) {
// 				id_filmix = filmix_id;
//   			network.clear();
//   			network.timeout(20 * 1000);
//   			network.silent(embed + 'post/' + filmix_id +'?'+ dev_token, function (found) {
//   			  if(found) {
//             found = {
//               playlist: found.player_links.playlist,
//               movie: found.player_links.movie,
//               max: found.quality,
//               quality: found.rip && found.rip.split(' ')[0] || found.rip
//             };
//             if (found && Lampa.Arrays.getKeys(found).length && (found.movie.length || Lampa.Arrays.getKeys(found.playlist).length)) {
//     				  success(found);
//     					component.loading(false);
//     				} else component.doesNotAnswer(select_title);
//   				} else component.doesNotAnswer(select_title);
//   			}, function (a, c) {
//   				component.doesNotAnswer();
//   			});
//   		}
// 		};
// 		this.extendChoice = function (saved) {
//   		Lampa.Arrays.extend(choice, saved, true);
//   	};
//   	this.reset = function () {
//   		component.reset();
//   		choice = {
//   			season: 0,
//   			voice: 0,
//   			order: 0,
//   			voice_name: ''
//   		};
//   		filter();
//   		append(filtred());
//   	};
//   	this.filter = function (type, a, b) {
//   		choice[a.stype] = b.index;
//   		if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
//   		component.reset();
//   		filter();
//   		append(filtred());
//   	};
//   	this.destroy = function () {
//   		network.clear();
//   		results = null;
//   	};
//   	function success(json) {
//   		results = json;
//   		filter();
//   		append(filtred());
//   	}
//   	function filter() {
//   		filter_items = {
//   			season: [],
//   			season_id: [],
//   			voice: [],
//   			order: [],
//   			voice_info: []
//   		};
//       if (results.playlist && Object.keys(results.playlist).length > 0) {
//         component.order.forEach(function (i){
//   				filter_items.order.push(i.title);
//   			});
  			
//   			for (var seasons in results.playlist){
//           filter_items.season_id.push(seasons);
//           filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + seasons);
//         } 
//   		  Lampa.Arrays.getKeys(results.playlist[filter_items.season[choice.season].split(' ')[1]]).forEach(function (v){
//   		    filter_items.voice.push(v);
//   		  });
  			
//         if (!filter_items.voice[choice.voice]) choice.voice = 0;
//   			choice.seasons = filter_items.season.length;
//   		}
//   		component.filter(filter_items, choice);
//   	}
//   	function getQuality(link){
// 		  var qualities = link.match(/\[([\d,]*)\]\.mp4/i);
// 		  if (qualities) qualities = qualities[1].split(",").filter(function (elem) {
// 				return parseInt(elem) <= window.FX.max_qualitie && parseInt(elem) !== 0;
// 			}).sort(function (a, b) {
//         return b - a;
//       });
// 			var qualitie = qualities.length > 0 && Math.max.apply(null, qualities) || false;
// 			return {
// 			  max: qualitie,
// 			  quals: qualities
// 			};
// 		}
// 	function filtred() {
//   		var filtred = [];
//   		if (results.playlist && Object.keys(results.playlist).length > 0) {
//   		for (var seasons in results.playlist){
//   		  if(seasons == filter_items.season_id[choice.season]){
//     		  var season = results.playlist[seasons][filter_items.voice[choice.voice]];
//     		 	for (var episode in season) {
//       		  var eps = season[episode]; 
//       		  var quality = season[episode].qualities.filter(function (elem) {
//       				return parseInt(elem) <= window.FX.max_qualitie && parseInt(elem) !== 0;
//       			}).sort(function(a, b) {
//     		      return b - a;
//     		    });  
//     		    filtred.push({
//   						episode: parseInt(episode),
//   						season: parseInt(seasons),
//   						link: season[episode].link,
//   						title: Lampa.Lang.translate('torrent_serial_episode') + ' ' +  episode,
//   						qualityes: quality, 
//   						quality: results.quality + ' - ' + quality[0] + 'p ',
//   						info: filter_items.voice[choice.voice], 
//   						voice_name: filter_items.voice[choice.voice]
//   					});
//     		  }
//   		  } 
//   		}
//   		} else if (results.movie && results.movie.length > 0) {
//   			for (var keyt in results.movie) {
//   				var movie = results.movie[keyt];
//   				var q = getQuality(movie.link);
//   				if(q.max) filtred.push({
//   					title: movie.translation,
//   					link: movie.link,
//   					qualityes: q.quals, 
//   					quality: results.quality + ' - ' + q.max + 'p ',
//   					voice_name: movie.translation, 
//   					info: ''
//   				});
//   			}
//   		}
//   		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
//   	}
//   	function getFile(element) {
//       var quality = {};
//       var files;
//       if (element.qualityes) {
//         var qualities = element.qualityes//JSON.parse(element.qualityes);
//         if (qualities) {
//           qualities.forEach(function (q) {
//             var files = object.movie.number_of_seasons ? element.link.replace(/%s(\.mp4)/i, q + "$1"): element.link.replace(/\[[\d,]*\](\.mp4)/i, q + "$1");
//             quality[q + 'p'] = files;
//           });
//           files = Lampa.Arrays.getValues(quality)[0];
//         }
//       } 
//       return {
//         file: files,
//         quality: quality
//       };
//     }
//     function toPlayElement(element) {
//       var ex = getFile(element);
//       var play = {
//         title: element.title,
//         url: ex.file,
//         quality: ex.quality,
//         timeline: element.timeline,
//         callback: element.mark
//       };
//       return play;
//     }
//     function append(items) {
//       component.reset();
//       component.draw(items, {
//         onEnter: function onEnter(item, html) {
//           var ex = getFile(item);
//           if (ex.file) {
//             var playlist = [];
//             var first = toPlayElement(item);

//             if (item.season) {
//               items.forEach(function (elem) {
//                 playlist.push(toPlayElement(elem));
//               });
//             } else {
//               playlist.push(first);
//             }

//             if (playlist.length > 1) first.playlist = playlist;
//             Lampa.Player.play(first);
//             Lampa.Player.playlist(playlist);
//             item.mark();
//           } else Lampa.Noty.show(Lampa.Lang.translate(get_links_wait ? 'online_waitlink' : 'online_nolink'));
//         },
//         onContextMenu: function onContextMenu(item, html, data, call) {
//           call(getFile(item));
//         }
//       });
//     }
//   }
  
//   function kinobase(component, _object) {
//   	var network = new Lampa.Reguest();
//   	var extract = [];
//   	var is_playlist = false;
//   	var quality_type = '';
//   	var translation = '';
//   	var prox = component.proxy('kinobase');
//     var embed = 'https://kinobase.org/';
//   	var object = _object;
//   	var data;
//   	var select_title = '';
//   	var select_id = '';
//   	var filter_items = {};
//   	var voic = '';
//   	var wait_similars;
//   	var choice = {
//   		season: 0,
//   		voice: 0, 
//   		order: 0,
//   		voice_name:''
//   	};
  
//   	this.search = function (_object, sim) {
//       if (wait_similars && sim) return getPage(sim[0].link);
//     };
//   	this.searchByTitle = function (_object, query) {
//       object = _object;
//       select_title = object.search;
//       var url = embed + "search?query=" + encodeURIComponent(component.cleanTitle(select_title));
//       network.clear();
//       network.timeout(1000 * 10);
//       network["native"](url, function (str) {
//         str = str.replace(/\n/g, '');
//         var links = object.movie.number_of_seasons ? str.match(/<a href="\/(serial|tv_show)\/([^"]*)" class="link"[^>]*>(.*?)<\/a>/g) : str.match(/<a href="\/film\/([^"]*)" class="link"[^>]*>(.*?)<\/a>/g);
//         var search_date = object.search_date || object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
//         var search_year = parseInt((search_date + '').slice(0, 4));
  
//         if (links) {
//           var is_sure = false;

//           var items = links.map(function (l) {
//             var link = $(l),
//                 titl = link.attr('title') || link.text() || '';
//             var year;
//             var found = titl.match(/^(.*)\((\d{4})\)$/);
  
//             if (found) {
//               year = parseInt(found[2]);
//               titl = found[1].trim();
//             }
  
//             return {
//               year: year,
//               title: titl,
//               link: link.attr('href')
//             };
//           });
//           var cards = items;

//           if (cards.length) {
//             if (select_title) {
//               var _tmp = cards.filter(function (c) {
//                 return component.containsTitle(c.title, select_title);
//               });

//               if (_tmp.length) {
//                 cards = _tmp;
//                 is_sure = true;
//               }
//             }

//             if (cards.length > 1 && search_year) {
//               var _tmp2 = cards.filter(function (c) {
//                 return c.year == search_year;
//               });

//               if (!_tmp2.length) _tmp2 = cards.filter(function (c) {
//                 return c.year && c.year > search_year - 2 && c.year < search_year + 2;
//               });
//               if (_tmp2.length) cards = _tmp2;
//             }
//           }

//           if (cards.length == 1 && is_sure) {
//             if (search_year && cards[0].year) {
//               is_sure = cards[0].year > search_year - 2 && cards[0].year < search_year + 2;
//             }

//             if (is_sure) {
//               is_sure = false;

//               if (select_title) {
//                 is_sure |= component.equalTitle(cards[0].title, select_title);
//               }
//             }
//           }

//           if (cards.length == 1 && is_sure) getPage(cards[0].link);
//           else if (items.length) {
//             wait_similars = true;
//             var similars = [];
//             links.forEach(function (l) {
//               var link = $(l),
//                   titl = link.attr('title') || link.text();
//                   type = link.attr('href').indexOf('film') > -1 ? 'film' : 'serial';
//               similars.push({
//                 title: titl,
//                 type: type, 
//                 link: link.attr('href')
//               });
//             });
//             component.similars(similars);
//             component.loading(false);
//           } else component.doesNotAnswer(select_title);
//         } else if (str.indexOf('/recaptcha/api.js') !== -1 || str.indexOf('form action="/check?') !== -1) {
//           component.empty(Lampa.Lang.translate('title_kb_captcha_address') + embed);
//         } else component.doesNotAnswer(select_title);
//       }, function (a, c) {
//         component.doesNotAnswer();
//       }, false, {
//         dataType: 'text'
//       });
//     };
//   	this.extendChoice = function (saved) {
//   		Lampa.Arrays.extend(choice, saved, true);
//   	};
//   	this.reset = function () {
//   		component.reset();
//   		choice = {
//   			season: 0,
//   			voice: 0, 
//   			order: 0
//   		};
//   		filter();
//   		append(filtred());
//   	};
//   	this.filter = function (type, a, b) {
//   		choice[a.stype] = b.index;
//   		component.reset();
//   		filter();
//   		append(filtred());
//   	};
//   	this.destroy = function () {
//   		network.clear();
//   		extract = null;
//   	};
//   	function filter() {
//       filter_items = {
//         season: [],
//         voice: [],
//         order: []
//       };
  
//       if (is_playlist) {
//         component.order.forEach(function (i){
//   				filter_items.order.push(i.title);
//   			});
//         extract.forEach(function (item) {
//           if (item.playlist || item.folder) {
//             filter_items.season.push(item.title || item.comment || '');
//           }
//         });
//       }
  
//       if (!filter_items.season[choice.season]) choice.season = 0;
  
//       if (is_playlist) {
//         extract.forEach(function (item, i) {
//           var playlist = item.playlist || item.folder;
  
//           if (playlist) {
//             if (i == choice.season) {
//               playlist.forEach(function (eps) {
//                 if (eps.file) {
//                   component.parsePlaylist(eps.file).forEach(function (el) {
//                     if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
//                       filter_items.voice.push(el.voice);
//                     }
//                   });
//                 }
//               });
//             }
//           } else if (item.file) {
//             component.parsePlaylist(item.file).forEach(function (el) {
//               if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
//                 filter_items.voice.push(el.voice);
//               }
//             });
//           }
//         });
//       }
  
//       if (!filter_items.voice[choice.voice]) choice.voice = 0;
//       component.filter(filter_items, choice);
//     }
//   	function filtred() {
//   		var filtred = [];
//   		if (is_playlist) {
//   			var playlist = extract;
//   			var season = object.movie.number_of_seasons && 1;
//   			if (extract[choice.season] && (extract[choice.season].playlist || extract[choice.season].folder)) {
//           playlist = extract[choice.season].playlist || extract[choice.season].folder;
//           season = parseInt(extract[choice.season].title || extract[choice.season].comment || '');
//           if (isNaN(season)) season = 1;
//         }
//   			playlist.forEach(function (eps, index) {
//   				var items = extractItems(eps.file, filter_items.voice[choice.voice]);
//   				if (items.length) {
//   					var title = eps.title || eps.comment || '';
//   					var alt_voice = (eps.comment || eps.title).match(/\d+ серия (.*)$/i);
//   					var info = items[0].voice || (alt_voice && alt_voice[1].trim()) || translation;
  				
//   					if (info == title) info = '';
//   					if(season){
//   					  var episode = parseInt(title);
//               if (isNaN(episode)) episode = index + 1;
//               filtred.push({
//   							file: eps.file,
//   							title: title,
//   							quality: (quality_type ? quality_type + ' - ' : '') + items[0].quality + 'p',
//   							season: season,
//   							episode: episode,
//   							info: info ? info : '',
//   							voice: info,
//   							voice_name: info,
//   							subtitles: parseSubs(eps.subtitle || '')
//   						});
//   				  } else {
//               filtred.push({
//                 file: eps.file,
//                 title: title,
//   							quality: (quality_type ? quality_type + ' - ' : '') + items[0].quality + 'p',
//                 info: info ? ' / ' + info : '',
//                 voice: items[0].voice,
//   							voice_name: info,
//                 subtitles: parseSubs(eps.subtitle || '')
//               });
//             }
//   				}
//   			});
//   		} else {
//   			filtred = extract;
//   		}
//   		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
//   	}
//   	function parseSubs(vod) {
//   		var subtitles = component.parsePlaylist(vod).map(function (item) {
//   			return {
//   				label: item.label,
//   				url: item.links[0]
//   			};
//   		});
//   		return subtitles.length ? subtitles : false;
//   	}
//   	function extractData(str, page) {
//   		var quality_match = page.match(/<li><b>Качество:<\/b>([^<,]+)<\/li>/i);
//   		var translation_match = page.match(/<li><b>Перевод:<\/b>([^<,]+)<\/li>/i);
//   		quality_type = quality_match ? quality_match[1].trim() : '';
//   		translation = translation_match ? translation_match[1].trim() : '';
//   		var vod = str.split('|');
//   		if (vod[0] == 'file') {
//   			var file = vod[1];
//   			var found = [];
//   			var subtiles = parseSubs(vod[2]);
//   			if (file) {
//   				var voices = {};
//   				component.parsePlaylist(file).forEach(function (item) {
//   					var prev = voices[item.voice || ''];
//   					var quality_str = item.label.match(/(\d\d\d+)p/);
//   					var quality = quality_str ? parseInt(quality_str[1]) : NaN;
//   					if (!prev || quality > prev.quality) {
//   						voices[item.voice || ''] = {
//   							quality: quality
//   						};
//   					}
//   				});
//   				for (var voice in voices) {
//   					var el = voices[voice];
//   					found.push({
//   						file: file,
//   						title: voice || translation || object.movie.title,
//   						quality: (quality_type ? quality_type + ' - ' : '') + el.quality + 'p',
//   						info: '',
//   						voice: voice,
//   						voice_name: voice,
//   						subtitles: subtiles
//   					});
//   				}
//   			}
//   			extract = found;
//   			is_playlist = false;
//   		} else if (vod[0] == 'pl') {
//   			extract = Lampa.Arrays.decodeJson(vod[1], []);
//   			is_playlist = true;
//   		} else component.doesNotAnswer(select_title);
//   	}
//   	function getPage(url) {
// 			network.clear();
// 			network.timeout(1000 * 10);
// 			network["native"](embed + url, function (str) {
// 				str = str.replace(/\n/g, '');
// 				var voices = str.match('<ul class="list-unstyled details">(.*?)</ul>');
// 				$(voices, 'li').each(function (r, a) {
// 					var vsrt = a.match('<li><b>Перевод:</b>(.*?)</li>');
// 					voic = vsrt && vsrt[1];
// 				});
// 				var MOVIE_ID = str.match('var MOVIE_ID = ([^;]+);');
// 				var IDENTIFIER = str.match('var IDENTIFIER = "([^"]+)"');
// 				var PLAYER_CUID = str.match('var PLAYER_CUID = "([^"]+)"');
				
// 				if (MOVIE_ID && IDENTIFIER && PLAYER_CUID) {
// 					select_id = MOVIE_ID[1];
// 					var identifier = IDENTIFIER[1];
// 					var player_cuid = PLAYER_CUID[1];
					
// 					var user_url = "user_data";
//           user_url = Lampa.Utils.addUrlComponent(user_url, "page=movie");
//           user_url = Lampa.Utils.addUrlComponent(user_url, "movie_id=" + select_id);
//           user_url = Lampa.Utils.addUrlComponent(user_url, "cuid=" + player_cuid);
//           user_url = Lampa.Utils.addUrlComponent(user_url, "device=DESKTOP");
//           user_url = Lampa.Utils.addUrlComponent(user_url, "_=" + Date.now());
          
// 					var data_url = "videoplayer.js";
// 					data_url = Lampa.Utils.addUrlComponent(data_url, "movie_id=" + select_id);
//           data_url = Lampa.Utils.addUrlComponent(data_url, "IDENTIFIER=" + identifier);
//           data_url = Lampa.Utils.addUrlComponent(data_url, "player_type=new");
//           data_url = Lampa.Utils.addUrlComponent(data_url, "file_type=mp4");
// 					data_url = Lampa.Utils.addUrlComponent(data_url, "_=" + Math.floor(Date.now() / 1e3));
					
// 					network.clear();
//           network.timeout(1000 * 10);
//           network["native"](embed + user_url, function () {}, function () {}, false, {
//             dataType: 'text',
//             withCredentials: !prox
//           });
					
// 					network.clear();
// 					network.timeout(1000 * 10);
// 					network["native"](embed + data_url, function (vod_script) {
//             var vod_data, vod_url;
//             try {
//               var tmp = $.get;
//               try {
//                 vod_data = (0, eval)('"use strict"; (function () { var url, params, $ = {}; $.get = function (u, p) { if (u && u.startsWith("/vod/")) { url = u; params = p; } }; var XMLHttpRequest = function XMLHttpRequest() { this.open = function (m, u) { if (u && u.startsWith("/vod/")) { url = u; } }; this.send = function () {}; }; try { eval(' + JSON.stringify(vod_script) + '); } catch (e) {} return {url: url, params: params}; })();');
//               } finally {
//                 $.get = tmp;
//               }
//             } catch (e) {}

//             if (vod_data && vod_data.url) {
//                vod_url = vod_data.url;
//                if (vod_data.params) {
//                  for (var name in vod_data.params) {
//                    vod_url = Lampa.Utils.addUrlComponent(vod_url, name + "=" + encodeURIComponent(vod_data.params[name]));
//                  }
//                }
//             }
            
//             if (vod_url) {
//               network.clear();
//               network.timeout(1000 * 10);
//               network["native"](embed + vod_url, function (files) {
//                 component.loading(false);
//                 extractData(files, str);
//                 filter();
//                 append(filtred());
//               }, function (a, c) {
//                 component.empty(network.errorDecode(a, c));
//               }, false, {
//                 dataType: 'text'
//               });
//             } else component.empty(Lampa.Lang.translate('torrent_parser_no_hash'));

// 					}, function (a, c) {
// 						component.doesNotAnswer();
// 					}, false, {
// 						dataType: 'text'
// 					});
// 				} else component.doesNotAnswer();
// 			}, function (a, c) {
// 				component.doesNotAnswer();
// 			}, false, {
// 				dataType: 'text'
// 			});
// 		}
// 		function extractItems(str, voice) {
//   		try {
//   			var list = component.parsePlaylist(str);
//   			if (voice) {
//   				var tmp = list.filter(function (el) {
//   					return el.voice == voice;
//   				});
//   				if (tmp.length) {
//   					list = tmp;
//   				} else {
//   					list = list.filter(function (el) {
//   						return typeof el.voice == 'undefined';
//   					});
//   				}
//   			}
//   			var items = list.map(function (item) {
//   				var quality = item.label.match(/(\d\d\d+)p/);
//   				return {
//   					label: item.label,
//   					voice: item.voice,
//   					quality: quality ? parseInt(quality[1]) : NaN,
//   					file: item.links[0]
//   				};
//   			});
//   			items.sort(function (a, b) {
//   				if (b.quality > a.quality) return 1;
//   				if (b.quality < a.quality) return -1;
//   				if (b.label > a.label) return 1;
//   				if (b.label < a.label) return -1;
//   				return 0;
//   			});
//   			return items;
//   		} catch (e) {}
//   		return [];
//   	}
//   	function getFile(element) {
//   		var file = '',
//   			quality = false;
//   		var items = extractItems(element.file, element.voice);
//   		if (items && items.length) {
//   			file = items[0].file;
//   			quality = {};
//   			items.forEach(function (item) {
//   				quality[item.label] = item.file;
//   			});
//   			var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
//   			if (quality[preferably]) file = quality[preferably];
//   		}
//   		element.stream = file;
//   		element.qualitys = quality;
//   		return {
//   			file: file,
//   			quality: quality
//   		};
//   	}
//   	function toPlayElement(element) {
//       getFile(element);
//       var play = {
//         url: element.stream,
//         timeline: element.timeline,
//         title: element.title,
//         subtitles: element.subtitles,
//         quality: element.qualitys,
//         callback: element.mark
//       };
//       return play;
//     }
//     function append(items) {
//       component.reset();
//       component.draw(items, {
//         similars: wait_similars,
//         onEnter: function onEnter(item, html) {
//           getFile(item);
  
//           if (item.stream) {
//             var playlist = [];
//             var first = toPlayElement(item);
  
//             if (item.season) {
//               items.forEach(function (elem) {
//                 playlist.push(toPlayElement(elem));
//               });
//             } else {
//               playlist.push(first);
//             }
  
//             if (playlist.length > 1) first.playlist = playlist;
//             Lampa.Player.play(first);
//             Lampa.Player.playlist(playlist);
//             item.mark();
//           } else Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
//         },
//         onContextMenu: function onContextMenu(item, html, data, call) {
//           call(getFile(item));
//         }
//       });
//     }
//   }
  
//   function collaps(component, _object) {
//   	var network = new Lampa.Reguest();
//   	var extract = {};
//   	var prox = component.proxy('collaps');
//   	var embed = prox ? prox + 'https://api.topdbltj.ws/embed/' : 'https://api.strvid.ws/embed/';
//   	var select_title = '';
//   	var filter_items = {};
//   	var prefer_dash = Lampa.Storage.field('online_dash') === true;
//   	var choice = {
//   		season: 0,
//   		voice: 0, 
//   		order: 0
//   	};
//     this.searchByKinopoisk = function (_object, id) {
//       this.searchIn('kp', id);
//     };
//     this.searchByImdbID = function (_object, id) {
//       this.searchIn('imdb', id);
//     };
//     this.searchIn = function (where, id) {
//    		select_title = _object.search;
//       var url = embed + where + '/' + id;
//   		network.clear();
//       network.timeout(10000);
//      	network.silent(url, function (str) {
//   			if (str) {
//   				parse(str);
//   			} else component.doesNotAnswer(select_title);
//   			component.loading(false);
//   		}, function (a, c) {
//   			component.doesNotAnswer(a.status == 404 && a.responseText && a.responseText.indexOf('видео недоступно') !== -1 ? select_title : '');
//   		}, false, {
//   			dataType: 'text'
//   		});
//   	};
//   	this.extendChoice = function (saved) {
//   		Lampa.Arrays.extend(choice, saved, true);
//   	};
//   	this.reset = function () {
//   		component.reset();
//   		choice = {
//   			season: 0,
//   			voice: 0, 
//   			order: 0
//   		};
//   		filter();
//   		append(filtred());
//   		component.saveChoice(choice);
//   	};
//   	this.filter = function (type, a, b) {
//   		choice[a.stype] = b.index;
//   		component.reset();
//   		filter();
//   		append(filtred());
//   		component.saveChoice(choice);
//   	};
//   	this.destroy = function () {
//   		network.clear();
//   		extract = null;
//   	};
//   	function parse(str) {
//   		str = str.replace(/\n/g, '');
//   		var find = str.match('makePlayer\\({(.*?)}\\);');
//   		var json;
//   		try {
//   			json = find && eval('({' + find[1] + '})');
//   		} catch (e) {}
//   		if (json) {
//   			extract = json;
//   			if (extract.playlist && extract.playlist.seasons) {
//   				extract.playlist.seasons.sort(function (a, b) {
//   					return a.season - b.season;
//   				});
//   			}
//   			filter();
//   			append(filtred());
//   		} else component.doesNotAnswer(select_title);
//   	}
//   	function filter() {
//   		filter_items = {
//   			season: [],
//   			voice: [],
//   			order: []
//   		};
//   		if (extract.playlist && extract.playlist.seasons) {
//   			component.order.forEach(function (i){
//   				filter_items.order.push(i.title);
//   			});
//   			extract.playlist.seasons.forEach(function (season) {
//   				filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
//   			});
//   			choice.seasons = filter_items.season.length;
//   		}
  		
//   		filter_items.season.sort(function(a,b){
//         var n_a = parseInt(a.replace(/\D/g,''));
//         var n_b = parseInt(b.replace(/\D/g,''));
//         if(n_a > n_b) return 1;
//         else if(n_a < n_b) return -1;
//         else return 0;
//       });
  		
//   		if (!filter_items.season[choice.season]) choice.season = 0;
//   		component.filter(filter_items, choice);
//   	}
//   	function filtred() {
//   		var filtred = [];
//   		if (extract.playlist) {
//   			extract.playlist.seasons.forEach(function (season, i) {
//   				var season_id = parseInt(filter_items.season[choice.season].split(' ').pop());
//   	  	  if(season.season == season_id) {
//   				  season.episodes.forEach(function (episode) {
//   						var resolution = Lampa.Arrays.getKeys(extract.qualityByWidth).pop();
//   						var max_quality = resolution ? extract.qualityByWidth[resolution] || 0 : '';
//   						var audio_tracks = episode.audio.names.map(function (name) {
//   							return {
//   								language: name
//   							};
//   						});
//   						filtred.push({
//   							file: prefer_dash && episode.dash || episode.hls,
//   							episode: parseInt(episode.episode),
//   							season: parseInt(season.season),
//   							title: episode.title,
//   							quality: max_quality ? max_quality + 'p' : '',
//   							voice: episode.audio.names.join('<br>'),
//   							info: episode.audio.names.slice(0, 5).join(', '),
//   							subtitles: episode.cc ? episode.cc.map(function (c) {
//   								return {
//   									label: c.name,
//   									url: c.url
//   								};
//   							}) : false,
//   							audio_tracks: audio_tracks.length ? audio_tracks : false
//   						});
//   					});
//   				}
//   			});
//   		} else if (extract.source) {
//   			var resolution = Lampa.Arrays.getKeys(extract.qualityByWidth).pop();
//   			var max_quality = extract.qualityByWidth ? extract.qualityByWidth[resolution] || 0 : 0;
//   			var audio_tracks = extract.source.audio.names.map(function (name) {
//   				return {
//   					language: name
//   				};
//   			});
//   			filtred.push({
//   				file: prefer_dash && extract.source.dash || extract.source.hls,
//   				title: extract.title,
//   				quality: max_quality ? max_quality + 'p' : '',
//   				info: extract.source.audio.names.slice(0, 5).join(', '),
//   				voice: extract.source.audio.names.join('<br>'),
//   				subtitles: extract.source.cc ? extract.source.cc.map(function (c) {
//   					return {
//   						label: c.name,
//   						url: c.url
//   					};
//   				}) : false,
//   				audio_tracks: audio_tracks.length ? audio_tracks : false
//   			});
//   		}
//   		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
//   	}
//     function append(items) {
//       component.reset();
//       component.draw(items, {
//         onEnter: function onEnter(item, html) {
//           if (item.file) {
//             var playlist = [];
//             var first = {
//               url: item.file,
//               timeline: item.timeline,
//               title: item.title,
//               subtitles: item.subtitles, 
//               translate: {
//                 tracks: item.audio_tracks
//               }
//             };
  
//             if (item.season) {
//               items.forEach(function (elem) {
//                 playlist.push({
//                   title: elem.title,
//                   url: elem.file,
//                   timeline: elem.timeline,
//                   subtitles: elem.subtitles,
//                   translate: {
//                     tracks: elem.audio_tracks
//                   },
//                   callback: function callback() {
//                     elem.mark();
//                   }
//                 });
//               });
//             } else {
//               playlist.push(first);
//             }
  
//             if (playlist.length > 1) first.playlist = playlist;
//             Lampa.Player.play(first);
//             Lampa.Player.playlist(playlist);
//             item.mark();
//           } else Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
//         },
//         onContextMenu: function onContextMenu(item, html, data, call) {
//           call({
//             file: item.file
//           });
//         }
//       });
//     }
//   }
  
//   function cdnmovies(component, _object) {
//   	var network = new Lampa.Reguest();
//   	var extract = [];
//   	var medias;
//   	var object = _object;
//   	var select_title = '';
//   	var embed = 'https://cdnmovies.net/api/short';
//   	var token = '02d56099082ad5ad586d7fe4e2493dd9';
//   	var filter_items = {};
//   	var wait_similars;
//   	var choice = {
//   		season: 0,
//   		voice: 0,
//   		order: 0,
//   		voice_name: '', 
//   		last_viewed: ''
//   	};
//     this.search = function (_object, sim) {
//       if (wait_similars) this.find(sim[0].iframe_src);
//     };
  	
//   	this.searchByKinopoisky = function (_object, kp_id) {
//   		var _this = this;
//   		object = _object;
//   		select_title = object.search;
//   		var url = embed;
//   		url = Lampa.Utils.addUrlComponent(url, 'token=' + token);
//   		url = Lampa.Utils.addUrlComponent(url, 'kinopoisk_id=' + kp_id);
//   		network.clear();
//   		network.timeout(10000);
//   		network.silent(url, function (json) {
//   			json = Lampa.Arrays.getValues(json.data)[0];
//   			if (json) {
//   				var iframe_src = 'http:' + json.iframe_src;
//   				medias = json.medias;
//   				_this.find(iframe_src);
//   			} else component.emptyForQuery(select_title);
//   		}, function (a, c) {
//   			component.empty(network.errorDecode(a, c));
//   		});
//   	};
  	
//   	this.searchByTitle = function (_object, query) {
//       var _this = this;
//       if (this.wait_similars && data && data[0].is_similars) return this.find(data[0].iframe_src);
//       object = _object;
//       select_title = object.search || object.movie.title;
//       var search_date = object.search_date || object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
//       var search_year = parseInt((search_date + '').slice(0, 4));
//       var orig = object.movie.original_title || object.movie.original_name;
  
//       var display = function display(data) {
//         if (data && Object.keys(data).length) {
//           var is_sure = false;
//           var items = [];

//           for (var id in data) {
//             items.push(data[id]);
//           }

//           items.forEach(function (c) {
//             var year = c.start_date || c.year || '0000';
//             c.tmp_year = parseInt((year + '').slice(0, 4));
//           });

//           if (object.movie.imdb_id) {
//             var tmp = items.filter(function (elem) {
//               return elem.imdb_id == object.movie.imdb_id;
//             });

//             if (tmp.length) {
//               items = tmp;
//               is_sure = true;
//             }
//           }

//           var cards = items;

//           if (cards.length) {
//             if (orig) {
//               var _tmp = cards.filter(function (elem) {
//                 return component.equalTitle(elem.orig_title || elem.en_title || elem.ru_title, orig);
//               });

//               if (_tmp.length) {
//                 cards = _tmp;
//                 is_sure = true;
//               }
//             }

//             if (select_title) {
//               var _tmp2 = cards.filter(function (elem) {
//                 return component.equalTitle(elem.title || elem.ru_title || elem.en_title || elem.orig_title, select_title);
//               });

//               if (_tmp2.length) {
//                 cards = _tmp2;
//                 is_sure = true;
//               }
//             }

//             if (cards.length > 1 && search_year) {
//               var _tmp3 = cards.filter(function (c) {
//                 return c.tmp_year == search_year;
//               });

//               if (!_tmp3.length) _tmp3 = cards.filter(function (c) {
//                 return !c.tmp_year && c.tmp_year > search_year - 2 && c.tmp_year < search_year + 2;
//               });
//               if (_tmp3.length) cards = _tmp3;
//             }
//           }
  
//           if (cards.length == 1 && is_sure) {
//             medias = cards[0].medias;
//             _this.find(cards[0].iframe_src);
//           } else {
//             wait_similars = true;
//             items.forEach(function (c) {
//               c.is_similars = true;
//               c.seasons_count = c.last_season;
//               c.episodes_count = c.last_episode;
//             });
//             component.similars(items);
//             component.loading(false);
//           }
//         } else component.doesNotAnswer(select_title);
//       };
  
//       var url = embed;
//       url = Lampa.Utils.addUrlComponent(url, 'token=' + token);
//       var url_by_title = Lampa.Utils.addUrlComponent(url, 'search=' + encodeURIComponent(select_title));
//       if (object.movie.imdb_id) url = Lampa.Utils.addUrlComponent(url, 'imdb_id=' + encodeURIComponent(object.movie.imdb_id));
//       else if (+object.movie.kinopoisk_id || +object.movie.kinopoisk_ID) url = Lampa.Utils.addUrlComponent(url, 'kinopoisk_id=' + encodeURIComponent(+object.movie.kinopoisk_id || +object.movie.kinopoisk_ID));
//       else url = url_by_title;
//       network.clear();
//       network.timeout(5000);
//       network["native"](url, function (json) {
//   		  medias = json.medias;
//   		  if (json.data && Object.keys(json.data).length) display(json.data);
//         else if (url !== url_by_title) {
//           network.clear();
//           network.timeout(5000);
//           network["native"](url_by_title, function (json) {
//             if (json.data && Object.keys(json.data).length) display(json.data);
//             else display({});
//           }, function (a, c) {
//             component.doesNotAnswer(network.errorDecode(a, c));
//           });
//         } else display({});
//       }, function (a, c) {
//         component.empty(network.errorDecode(a, c));
//       });
//     };
//   	this.find = function (url) {
//   		network.clear();
//   		network.timeout(10000);
//   		network["native"]('https:' +url, function (json) {
//   			parse(json);
//   			component.loading(false);
//   		}, function (a, c) {
//   			component.doesNotAnswer(network.errorDecode(a, c));
//   		}, false, {
//   			dataType: 'text'
//   		});
//   	};
//   	this.extendChoice = function (saved) {
//   		Lampa.Arrays.extend(choice, saved, true);
//   	};
//   	this.reset = function () {
//   		component.reset();
//   		choice = {
//   			season: 0,
//   			voice: 0,
//   			order: 0,
//   			voice_name: ''
//   		};
//   		filter();
//   		append(filtred());
//   		component.saveChoice(choice);
//   	};
//   	this.filter = function (type, a, b) {
//   		choice[a.stype] = b.index;
//   		if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
//   		component.reset();
//   		filter();
//   		append(filtred());
//   		component.saveChoice(choice);
//   	};
//   	this.destroy = function () {
//   		network.clear();
//   	};
//   	function parse(str) {
//   		str = str.replace(/\n/g, '');
//   		var find = str.match("Playerjs\\({.*?\\bfile:\\s*'(.*?)'\\s*}\\);");
//   		var video = find && decode(find[1]);
//   		var json;
//   		try {
//   			json = video && JSON.parse(video);
//   		} catch (e) {}
//   		if (json) {
//   			extract = json;
//   			filter();
//   			append(filtred());
//   		} else component.doesNotAnswer(select_title);
//   	}
//     function decode(data) {
//       if (data.charAt(0) !== '#') return data;
  
//       var enc = function enc(str) {
//         return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
//           return String.fromCharCode('0x' + p1);
//         }));
//       };
  
//       var dec = function dec(str) {
//         return decodeURIComponent(atob(str).split('').map(function (c) {
//           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));
//       };
  
//       var trashList = ['-*frofpscprpamfpQ*45612.3256dfrgd', '54vjfhcgdbrydkcfkndz568436fred+*d', 'lvfycgndqcydrcgcfg+95147gfdgf-zd*', 'az+-erw*3457edgtjd-feqsptf/re*q*Y', 'df8vg69r9zxWdlyf+*fgx455g8fh9z-e*Q'];
//       var x = data.substring(2);
//       trashList.forEach(function (trash) {
//         x = x.replace('//' + enc(trash), '');
//       });
  
//       try {
//         x = dec(x);
//       } catch (e) {
//         x = '';
//       }
  
//       return x;
//     }
//   	function extractItems(str, url) {
//       try {
//         var base_url = url.substring(0, url.lastIndexOf('/'));
//         var items = component.parseM3U(str).map(function (item) {
//           var link = item.link.replace(/(\.mp4):hls:manifest\.m3u8$/i, '$1');
//           var quality = item.height;
//           var alt_quality = link.match(/\b(\d\d\d+)\b/);
  
//           if (alt_quality) {
//             var alt_height = parseInt(alt_quality[1]);
//             if (alt_height > quality && alt_height <= 4320) quality = alt_height;
//           }
  
//           return {
//             label: quality ? quality + 'p' : '360p ~ 1080p',
//             quality: quality,
//             file: link.indexOf('://') == -1 ? base_url + '/' + link : link
//           };
//         });
//         items.sort(function (a, b) {
//           if (b.quality > a.quality) return 1;
//           if (b.quality < a.quality) return -1;
//           if (b.label > a.label) return 1;
//           if (b.label < a.label) return -1;
//           return 0;
//         });
//         return items;
//       } catch (e) {}
  
//       return [];
//     }
//   	function extractItemsPlaylist(str, url) {
//       try {
//         var items = component.parsePlaylist(str).map(function (item) {
//           var quality = item.label.match(/(\d\d\d+)p/);
//           var link = item || '';
//           return {
//             label: item.label,
//             quality: quality ? parseInt(quality[1]) : NaN,
//             file: link
//           };
//         });
//         items.sort(function (a, b) {
//           if (b.quality > a.quality) return 1;
//           if (b.quality < a.quality) return -1;
//           if (b.label > a.label) return 1;
//           if (b.label < a.label) return -1;
//           return 0;
//         });
//         return items;
//       } catch (e) {}
  
//       return [];
//     }
//     function parseStream(element, call, error, itemsExtractor, str, url) {
//       var file = '';
//       var quality = false;
//       var items = itemsExtractor(str, url);
  
//       if (items && items.length) {
//         file = items[0].file;
//         quality = {};
//         items.forEach(function (item) {
//           quality[item.label] = item.file;
//         });
//         var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
//         if (quality[preferably]) file = quality[preferably];
//       }
  
//       if (file) {
//         element.stream = file;
//         element.qualitys = quality;
//         call(element.stream);
//       } else error();
//     }
//     function getStreamM3U(element, call, error, file) {
//       var hls_file = file.replace(/\/\d*([^\/]*\.m3u8)$/, '/hls$1');
//       network.clear();
//       network.timeout(5000);
//       network["native"](hls_file, function (str) {
//         parseStream(element, call, error, extractItems, str, hls_file);
//       }, function (a, c) {
//         if (file != hls_file) {
//           network.clear();
//           network.timeout(5000);
//           network["native"](file, function (str) {
//             parseStream(element, call, error, extractItems, str, file);
//           }, function (a, c) {
//             error();
//           }, false, {
//             dataType: 'text'
//           });
//         } else error();
//       }, false, {
//         dataType: 'text'
//       });
//     }
//     function getStream(element, call, error) {
//       if (element.stream) return call(element.stream);
//       var url = element.file || '';
  
//       if (url.charAt(0) === '[') {
//         var file = '';
//         var items = extractItemsPlaylist(url);
  
//         if (items && items.length) {
//           file = items[0].file || '';
//         }
  
//         if (file.substr(-5) === '.m3u8') {
//           getStreamM3U(element, call, error, file);
//           return;
//         }
  
//         parseStream(element, call, error, extractItemsPlaylist, url, '');
//         return;
//       }
  
//       if (url.substr(-5) === '.m3u8') {
//         getStreamM3U(element, call, error, url);
//         return;
//       }
  
//       if (url) {
//         element.stream = url;
//         element.qualitys = false;
//         call(element);
//       } else error();
//     }
//   	function filter() {
// 			filter_items = {
// 				season: [],
// 				voice: [],
// 				order: []
// 			};
// 			extract.forEach(function (season) {
//         if (season.folder) filter_items.season.push(season.title);
//       });
//       if (!filter_items.season[choice.season]) choice.season = 0;

//       if (extract[choice.season] && extract[choice.season].folder) {
//         component.order.forEach(function (i){
// 					filter_items.order.push(i.title);
// 				});
//         extract[choice.season].folder.forEach(function (f) {
//           f.folder.forEach(function (t) {
//             if (filter_items.voice.indexOf(t.title) == -1) filter_items.voice.push(t.title);
//           });
//         });
//       }

//       if (!filter_items.voice[choice.voice]) choice.voice = 0;

//       if (choice.voice_name) {
//         var inx = filter_items.voice.indexOf(choice.voice_name);
//         if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
//           choice.voice = inx;
//         }
//       }

// 			component.filter(filter_items, choice);
// 		}
//   	function parseSubs(str) {
//   		var subtitles = component.parsePlaylist(str).map(function (item) {
//   			return {
//   				label: item.label,
//   				url: item.links[0]
//   			};
//   		});
//   		return subtitles.length ? subtitles : false;
//   	}
//   	function filtred() {
//   		var filtred = [];
//   		extract.forEach(function (data) {
//   			if (data.folder) {
//   				if (data.title == filter_items.season[choice.season]) {
//   					data.folder.forEach(function (se) {
//   						se.folder.forEach(function (eps) {
//   							if (eps.title == filter_items.voice[choice.voice]) {
//   								var m = Lampa.Arrays.getValues(medias).filter(function (itm) {
//   									return itm.translation == eps.title;
//   								});
//   								filtred.push({
//   									file: eps.file,
//   									title: Lampa.Lang.translate('full_episode') + ' ' + parseInt(se.title.match(/\d+/)),
//   									episode: parseInt(se.title.match(/\d+/)),
//   									season: parseInt(data.title.match(/\d+/)),
//   									quality: m.length ? (m[0].source_quality + ' - ' + m[0].quality + 'p') : '',
//   									info: Lampa.Utils.shortText(eps.title, 50)
//   								});
//   							}
//   						});
//   					});
//   				}
//   			} else {
//   				var m = Lampa.Arrays.getValues(medias).filter(function (itm) {
//   					return itm.translation == data.title;
//   				});
//   				filtred.push({
//   					file: data.file,
//   					title: data.title,
//   					quality: m.length ? (m[0].source_quality + ' - ' + m[0].quality + 'p') : '',
//   					info: '',
//   					subtitles: data.subtitle ? parseSubs(data.subtitle) : false
//   				});
//   			}
//   		});
//   		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
//   	}
//     function append(items) {
//       component.reset();
//       component.draw(items, {
//         similars: wait_similars, 
//         onEnter: function onEnter(item, html) {
//           if (item.loading) return;
//           item.loading = true;
//           getStream(item, function (stream) {
//             item.loading = false;
//             var first = {
//               url: stream,
//               timeline: item.timeline,
//               quality: item.qualitys,
//               subtitle: item.subtitles,
//               title: item.title
//             };
//             Lampa.Player.play(first);
  
//             if (item.season) {
//               var playlist = [];
//               items.forEach(function (elem) {
//                 var cell = {
//                   url: function url(call) {
//                     getStream(elem, function (stream) {
//                       cell.url = stream;
//                       cell.quality = elem.qualitys;
//                       cell.subtitles = elem.subtitles;
//                       elem.mark();
//                       call();
//                     }, function () {
//                       cell.url = '';
//                       call();
//                     });
//                   },
//                   timeline: elem.timeline,
//                   title: elem.title
//                 };
//                 if (elem == item) cell.url = stream;
//                 playlist.push(cell);
//               });
//               Lampa.Player.playlist(playlist);
//             } else {
//               Lampa.Player.playlist([first]);
//             }
  
//             if (item.subtitles && Lampa.Player.subtitles) Lampa.Player.subtitles(item.subtitles);
//             item.mark();
//           }, function (data) {
//             item.loading = false;
//             Lampa.Noty.show(data ? network.errorDecode(data) : Lampa.Lang.translate('modss_nolink'));
//           });
//         },
//         onContextMenu: function onContextMenu(item, html, data, call) {
//           getStream(item, function (stream) {
//             call({
//               file: stream,
//               quality: item.qualitys
//             });
//           }, function (data) {
//             Lampa.Noty.show(data ? network.errorDecode(data) : Lampa.Lang.translate('modss_nolink'));
//           });
//         }
//       });
//     }
//   }
  
//   function pub(component, _object) {
//   	var network = new Lampa.Reguest();
//   	var extract = {};
//   	var results = [];
//   	var object = _object;
//   	var filter_items = {};
//   	var embed = Pub.baseurl + 'v1/items';
//   	var streamingType;
//   	var supportHevc;
//   	var wait_similars;
//   	var choice = {
//   		season: 0,
//   		voice: 0,
//   		order: 0,
//   		type: 0
//   	};
//   	this.search = function (_object, sim) {
//   		if (wait_similars && sim) return this.find(sim[0].id);
//   	};
//   	this.searchByTitle = function (_object, query) {
//   		object = _object;
//   		var _this = this;
//   		var title = object.search.trim();
//   		var relise = object.search_date || (object.movie.number_of_seasons ? object.movie.first_air_date : object.movie.release_date) || '0000';
//   		var year = parseInt((relise + '').slice(0, 4));
//   		var orig = object.movie.original_title || object.movie.original_name;
//   		var imdb = object.movie.imdb_id && parseInt(object.movie.imdb_id.slice(2));
//   		var kpID = object.movie.kinopoisk_id || object.movie.kinopoisk_ID;
//   		var url = embed + '/search';
//   		url = Lampa.Utils.addUrlComponent(url, 'q=' + encodeURIComponent(title));
//   		url = Lampa.Utils.addUrlComponent(url, 'access_token=' + Pub.token);
//   		network.clear();
//   		network.timeout(10000);
//   		network.silent(url, function (json) {
//   			json = json.items;
//   			if (json.length == 0) component.doesNotAnswer(title);
//   			else {
//   				var cards = json.filter(function (c) {
//   					return c.imdb == imdb || c.kinopoisk == kpID;
//   				});
//   				if (!cards.length) {
//   					cards = json.filter(function (c) {
//   						return c.year > year - 2 && c.year < year + 2;
//   					});
//   					var tmp = cards.filter(function (c) {
//   						return c.year == year;
//   					});
//   					if (tmp.length) cards = tmp;
//   					else return component.doesNotAnswer(title);
//   				}
//   				if (cards.length) {
//   					var _tmp = cards.filter(function (c) {
//   						c.title_ru = c.title.split(' / ')[0];
//   						return component.equalTitle(c.title_ru.replace(/\s/, ' '), title.replace(/\s/, ' '));
//   					});
//   					if (_tmp.length) cards = _tmp;
//   					var _tmp2 = cards.filter(function (c) {
//   						c.title_org = c.title.split(' / ')[1];
//   						if (!c.title_org) return;
//   						return component.equalTitle(c.title_org.replace(/\s/, ' '), orig.replace(/\s/, ' '));
//   					});
//   					if (_tmp2.length) cards = _tmp2;
//   				}
//   				if (cards.length == 1) _this.find(cards[0].id);
//   				else if (json.length > 1) {
//   				  wait_similars = true;
//   					component.similars(json);
//   					component.loading(false);
//   				} else component.doesNotAnswer(title);
//   			}
//   		}, function (a, c) {
//   			component.doesNotAnswer();
//   		});
//   	};
//   	this.find = function (id) {
//   		network.clear();
//   		network.timeout(10000);
//   		var url = embed + '/' + id;
//   		url = Lampa.Utils.addUrlComponent(url, 'access_token=' + Pub.token);
//   		network.silent(url, function (json) {
//   			if (Lampa.Arrays.getKeys(json.item).length) {
//   				network.silent(embed.slice(0, -6) + '/device/info?access_token=' + Pub.token, function (param) {
//   					streamingType = param.device.settings.streamingType.value.find(function (t) {
//   						return t.selected == 1;
//   					});
//   					supportHevc = param.device.settings.supportHevc.value == 1;
//   					choice.type = streamingType.id - 1;
//   					success(json.item);
//   					component.loading(false);
//   				}, function (a, c) {
//   					component.doesNotAnswer();
//   				});
//   			} else component.doesNotAnswer(object.search);
//   		}, function (a, c) {
//   			component.doesNotAnswer();
//   		});
//   	};
//   	this.extendChoice = function (saved) {
//   		Lampa.Arrays.extend(choice, saved, true);
//   	};
//   	this.reset = function () {
//   		component.reset();
//   		choice = {
//   			season: 0,
//   			voice: 0,
//   			order: 0, 
//   			type: 0
//   		};
//   		append(filtred());
//   		component.saveChoice(choice);
//   	};
//   	this.filter = function (type, a, b) {
//   		choice[a.stype] = b.index;
//   		component.reset();
//   		filter();
//   		append(filtred());
//   		component.saveChoice(choice);
//   	};
//   	this.destroy = function () {
//   		network.clear();
//   		results = null;
//   	};
//   	function success(json) {
//   		results = json;
//   		filter();
//   		append(filtred());
//   	}
//   	function filter() {
//   		filter_items = {
//   			season: [],
//   			voice: [],
//   			type: [], 
//   			order: []
//   		};
//   	  ['HTTP', 'HLS', 'HLS2', 'HLS4'].forEach(function (t) {
//   			filter_items.type.push(t);
//   		});
//   		if (results.seasons) {
//   		  component.order.forEach(function (i){
//   				filter_items.order.push(i.title);
//   			});
//   			results.seasons.forEach(function (season) {
//   				filter_items.season.push(parseInt(season.number) + ' ' + Lampa.Lang.translate('torrent_serial_season'));
//   			});
//   			choice.seasons = filter_items.season.length;
//   		}
//   		if(!filter_items.type[choice.type]) choice.type = 2;
//   		component.filter(filter_items, choice);
//   	}
//   	function filtred() {
//   		var filtred = [];
//   		var type = filter_items.type[choice.type];
//   		var CODEC = supportHevc ? 'HEVC' : 'AVC';
//   		if (results.seasons) {
//   			results.seasons.forEach(function (season) {
//   				if (season.number == parseInt(filter_items.season[choice.season])) {
//   					season.episodes.forEach(function (ep) {
//   						if(ep.files[0]) filtred.push({
//   							title: ep.title || Lampa.Lang.translate('full_episode')+' '+ep.number,
//   							season: ep.snumber,
//   							episode: ep.number,
//   							quality: ep.files[0].quality + ' (' + CODEC + ')',
//   							file: ep.files,
//   							codec: CODEC,
//   							voice: parseTrackss(ep.audios).join('<br>'), 
//   							tracks: parseTracks(ep.audios || ''),
//   							subtitles: parseSubs(ep.subtitles || ''),
//   							info: type
//   						});
//   					});
//   				}
//   			});
//   		} else {
//   			results.videos.forEach(function (movie) {
//   				filtred.push({
//   					title: object.movie.title,
//   					quality: movie.files[0].quality + ' (' + CODEC + ')',
//   					file: movie.files,
//   					codec: CODEC,
//   					voice: parseTrackss(movie.audios).join('<br>'), 
//   					tracks: parseTracks(movie.audios || ''),
//   					subtitles: parseSubs(movie.subtitles || ''),
//   					info: type
//   				});
//   			});
//   		}
//   		return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
//   	}
//   	function parseSubs(vod) {
//   		var subtitles = vod.map(function (item) {
//   			return {
//   				label: item.lang.toUpperCase() + (item.forced && ' - [FORCED]' || ''),
//   				url: item.url
//   			};
//   		});
//   		return subtitles.length ? subtitles : false;
//   	}
//   	function parseTracks(vod) {
//   		var tracks = vod.map(function (track) {
//   			return {
//   				language: track.lang.toUpperCase(),
//   				label: track.codec.toUpperCase() + (track.channels && (' - ' + (track.channels == 6 ? '5.1' : track.channels)) || '') + (track.type && ' - ' + track.type.title || '') + (track.author && ' - ' + track.author.title || '')
//   			};
//   		});
//   		return tracks.length ? tracks : false;
//   	}
//   	function parseTrackss(vod) {
//   		var tracks = vod.map(function (track, i) {
//   			return (i+1)+ (track.type && '. ' + track.type.title || '') + (track.author && ' - ' + track.author.title || '') + (track.lang && '(' + track.lang+')' || '');
//   		});
//   		return tracks.length ? tracks : false;
//   	}
//   	function getFile(element) {
//   		var file = '';
//   		var quality = {};
//   		var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
//   		/*
//   		var codec = element.file.filter(function (q) {
//   			return q.codec == filter_items.codec[choice.codec].toLowerCase();
//   		});
//   		if (codec.length == 0) codec = element.file;
//   		*/
//   		element.file.forEach(function (item) {
//   			quality[item.quality] = item.url[filter_items.type[choice.type].toLowerCase()];
//   		});
//   		var max_quality = Lampa.Arrays.getKeys(quality)[0];
//   		file = quality[max_quality];
//   		if (quality[preferably]) file = quality[preferably];
//   		return {
//   			stream: file,
//   			quality: ['HLS2', 'HLS4'].indexOf(filter_items.type[choice.type]) > - 1 ? '' : quality
//   		};
//   	}
//     function toPlayElement(element) {
//       var ex = getFile(element);
//       var play = {
//         url: ex.stream,
//         timeline: element.timeline,
//         title: element.title,
//         subtitles: element.subtitles,
//         translate: {
//   				tracks: element.tracks
//   			},
//         quality: ex.quality,
//         callback: element.mark
//       };
//       return play;
//     }
//     function append(items) {
//       component.reset();
//       component.draw(items, {
//         similars: wait_similars,
//         onEnter: function onEnter(item, html) {
//           var ex = getFile(item);
  
//           if (ex.stream) {
//             var playlist = [];
//             var first = toPlayElement(item);
  
//             if (item.season) {
//               items.forEach(function (elem) {
//                 playlist.push(toPlayElement(elem));
//               });
//             } else {
//               playlist.push(first);
//             }
  
//             if (playlist.length > 1) first.playlist = playlist;
//             Lampa.Player.play(first);
//             Lampa.Player.playlist(playlist);
//             item.mark();
//           } else Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
//         },
//         onContextMenu: function onContextMenu(item, html, data, call) {
//           call(getFile(item));
//         }
//       });
//     }
//   }
  
  function component(object) {
    var network = new Lampa.Reguest();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true
    });
    var files = new Lampa.Explorer(object);
    var filter = new Lampa.Filter(object);
    var last;
    var extended;
    var selected_id;
    var sources = {};
    var source;
    var balanser;
    var initialized;
    var balanser_timer;
    var images = [];
  	var balansers = Modss.balansers();
	var contextmenu_all = [];
	var HISTORY_WEBS_KEY = 'history_web';
	this.MOBILE_UA = "Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36";
    this.PC_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36";
    this.UA = "Mozilla/5.0";
    this.UC_UA = "Mozilla/5.0 (Linux; U; Android 9; zh-CN; MI 9 Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.5.5.1035 Mobile Safari/537.36";
    this.IOS_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

  
    var filter_sources = Lampa.Arrays.getKeys(balansers);
    var filter_translate = {
      season: Lampa.Lang.translate('torrent_serial_season'),
      voice: Lampa.Lang.translate('torrent_parser_voice'),
      source: Lampa.Lang.translate('settings_rest_source')
    };
    this.initialize = function () {
      var _this = this;
      try {
        // filter_sources.forEach(function(b){
		// 	// console.log('b',b)
    	// 	  sources[b] = eval(b);
    	// 	});
		var _this1 = this;

		  if (doregjson.hasOwnProperty("rule") && typeof doregjson.rule === "object" && Object.keys(doregjson.rule).length > 0) {
			  doregjson.rule.forEach(function (elem) {
				  try {
					  sources[elem.name] = new web(_this1, object, elem);
					  sources[elem.name] = Object.assign({}, sources[elem.name]);
				  } catch (e) { }
			  });
		  }

		  if (doregjson.hasOwnProperty("tg_channel") && typeof doregjson.tg_channel === "object" && Object.keys(doregjson.tg_channel).length > 0) {
			  doregjson.tg_channel.forEach(function (elem) {
				  try {
					  sources[elem.channel_name] = new tg_share_channel(_this1, object, elem.channel_uri);
					  sources[elem.channel_name] = Object.assign({}, sources[elem.channel_name]);
				  } catch (e) { }
			  });
		  };

		  if (doregjson.hasOwnProperty("resource_site") && typeof doregjson.resource_site === "object" && Object.keys(doregjson.resource_site).length > 0) {
			  doregjson.resource_site.forEach(function (elem) {
				  try {
					  sources[elem.site_name] = new resource_site(_this1, object, elem.site_search_url, elem.site_detail_url);
					  sources[elem.site_name] = Object.assign({}, sources[elem.site_name]);
				  } catch (e) { }
			  });
		  };

		  if (doregjson.hasOwnProperty("custom_function") && typeof doregjson.custom_function === "object" && Object.keys(doregjson.custom_function).length > 0) {
			  doregjson.custom_function.forEach(function (elem) {
				if (isValidFunctionName(elem.function_name)) {
				  try {
					  var func = eval(elem.function_name);;
					  if (typeof func === 'function') {
						  sources[elem.resource_name] = Object.assign({}, new func(_this1, object));
					  }
				  } catch (e) { }
				}
			  });
		  };

      } catch (e) {}

	  function isValidFunctionName(name) {
		return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
	  };
	
      source = this.createSource();

      filter.onSearch = function (value) {
        Lampa.Activity.replace({
          search: value,
          clarification: true
        });
      };
  
      filter.onBack = function () {
        _this.start();
      };
      
      filter.render().find('.selector').on('hover:enter', function () {
        clearInterval(balanser_timer);
      })
  
      filter.onSelect = function (type, a, b) {
        if (type == 'filter') {
          if (a.reset) {
            if (extended) source.reset();else _this.start();
          } else {
            source.filter(type, a, b);
          }
        } else if (type == 'sort') {
          Lampa.Select.close();
		//   console.log(sources)
          if (Lampa.Arrays.getKeys(sources).indexOf(a.source) !== -1) {
            // if (!Lampa.Storage.get('pro_pub', false) && a.source == 'pub')
            // return Lampa.Noty.show('使用机器人 @modssmy_bot 成为VIP用户');
            _this.changeBalanser(a.source);
         } else Lampa.Noty.show('请检查与'+ a.source + '相关的函数定义是否正常。');
        }
        // if (object.movie.number_of_seasons || balanser == 'pub' || balanser == 'bazon') filter.render().find('.filter--filter').show();
  		//   else filter.render().find('.filter--filter').hide();
		filter.render().find('.filter--filter').show()

      };
  
    //   if (object.movie.number_of_seasons || balanser == 'pub' || balanser == 'bazon') filter.render().find('.filter--filter').show();
  	//   else filter.render().find('.filter--filter').hide();
	  filter.render().find('.filter--filter').show()
  	  filter.render().find('.filter--sort').on('hover:enter', function () {
  			$('body').find('.selectbox__title').text(Lampa.Lang.translate('modss_balanser'));
  		});
  		if (filter.addButtonBack) filter.addButtonBack();
      filter.render().find('.filter--sort span').text(Lampa.Lang.translate('modss_balanser'));
      files.appendFiles(scroll.render());
      files.appendHead(filter.render());
      filter.render().find('.filter--filter').after(filter.render().find('.filter--search'));
      scroll.body().addClass('torrent-list');
      scroll.minus(files.render().find('.explorer__files-head'));
      this.search();
    };
    this.changeBalanser = function (balanser_name) {
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      last_select_balanser[object.movie.id] = balanser_name;
      Lampa.Storage.set('online_last_balanser', last_select_balanser);
      var to  = this.getChoice(balanser_name);
      var from = this.getChoice();
      if(from.voice_name) to.voice_name = from.voice_name;
      this.saveChoice(to, balanser_name);
      Lampa.Activity.replace();
    };
    this.createSource = function () {
      var priority_balanser = Lampa.Storage.get('priority_balanser', Modss.balansPrf);
      if(priority_balanser == undefined) priority_balanser = Modss.balansPrf;
	  
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      if (last_select_balanser[object.movie.id]) {
        balanser = last_select_balanser[object.movie.id];
        Lampa.Storage.set('online_last_balanser', last_select_balanser);
      } else balanser = priority_balanser;
      
      if (!sources[balanser]) balanser = priority_balanser;
      
      if (balanser == 'undefined') balanser = priority_balanser;

      if (!sources[balanser]) balanser = Lampa.Arrays.getKeys(sources)[0];

    //   return new sources[balanser](this, object);
      return  sources[balanser];
    };
    this.proxy = function (name) {
  		var proxy = '';
  		var need = Lampa.Storage.field('mods_proxy_' + name);
  		var need_url = Lampa.Storage.get('onl_mods_proxy_' + name);
  		var prox = Lampa.Storage.get('mods_proxy_all');
  		var main = Lampa.Storage.get('mods_proxy_main', false);
  		var myprox = 'http://prox.lampa.stream/';
  		var pr = 'https://cors.eu.org/';
  		var reserv = 'http://lampa.stream/prox/';
  		//if (Lampa.Storage.field('mods_proxy_main') === true || (need == 'on' && need_url.length == 0 && prox == '')) proxy = myprox;
  		if ((need == 'on' || main) && name == 'videocdn' && (need_url.length == 0 || need_url.indexOf('cors.eu.org') > -1)) return '';
  		if ((need == 'on' || main) && name == 'collaps' && need_url.length == 0) return myprox;
  		if ((need == 'on' || main) && name == 'hdrezka' && need_url.length == 0) return myprox;
  		if ((need == 'on' || main) && name == 'kinobase' && need_url.length == 0) return myprox;
  		else if (need == 'on' && need_url.length >= 0 && prox !== '') proxy = prox;
  		else if (need == 'url' || (need == 'on' && need_url.length > 0)) proxy = need_url;
  		else if (prox && need == 'on') proxy = prox;
  		//else if (main && need == 'on') proxy = myprox;
  		if (proxy && proxy.slice(-1) !== '/') {
  			proxy += '/';
  		}
  		return proxy;
  	};
    this.create = function () {
      return this.render();
    };
    this.search = function () {
      this.activity.loader(true);
      this.filter({
        source: filter_sources
      }, this.getChoice());
      this.find();
    };
    this.find = function () {
  		var _this2 = this;
  		var query = (object.search || object.movie.title).trim();
  		var search_date = object.search_date || object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
  		var search_year = parseInt((search_date + '').slice(0, 4));
  		var orig = object.movie.original_title || object.movie.original_name;
  		
  		var display = function display(items) {
        if (items && items.length) {
          var is_sure = false;
          if (object.movie.imdb_id) {
            var tmp = items.filter(function (elem) {
              return (elem.imdb_id || elem.imdbId) == object.movie.imdb_id;
            });
  
            if (tmp.length) {
              items = tmp;
              is_sure = true;
            }
          }
          var cards = items.filter(function (c) {
            var year = c.start_date || c.year || '0000';
            c.tmp_year = parseInt((year + '').slice(0, 4));
            return !c.tmp_year || !search_year || c.tmp_year > search_year - 2 && c.tmp_year < search_year + 2;
          });
          
          if(cards.length) {
            if (orig) {
              var _tmp = cards.filter(function (elem) {
                return _this2.equalTitle(elem.orig_title || elem.nameOriginal || elem.en_title || elem.nameEn || elem.ru_title || elem.nameRu, orig);
              });
  
              if (_tmp.length) {
                cards = _tmp;
                is_sure = true;
              }
            }
  
            if (query) {
              var _tmp2 = cards.filter(function (elem) {
                return _this2.equalTitle(elem.title || elem.ru_title || elem.nameRu || elem.en_title || elem.nameEn || elem.orig_title || elem.nameOriginal, query);
              });
  
              if (_tmp2.length) {
                cards = _tmp2;
                is_sure = true;
              }
            }
  
            if (cards.length > 1 && search_year) {
              var _tmp3 = cards.filter(function (c) {
                return c.tmp_year == search_year;
              });
              if (_tmp3.length) cards = _tmp3;
            }
          } else cards = items;
          
          if (cards.length == 1 && is_sure) {
            _this2.extendChoice();
            var kinopoisk_id = cards[0].kinopoisk_id || cards[0].kinopoisk_ID || cards[0].kp_id || cards[0].kinopoiskId || cards[0].filmId;
  
            if (kinopoisk_id && source.searchByKinopoisk) {
              source.searchByKinopoisk(object, kinopoisk_id);
            } else if (cards[0].imdb_id && source.searchByImdbID) {
              source.searchByImdbID(object, cards[0].imdb_id);
            } else if (source.search) {
              source.search(object, cards);
            } else {
              _this2.doesNotAnswer();
            }
          } else {
            _this2.similars(items);
            _this2.loading(false);
          }
        } else _this2.doesNotAnswer(query);
      };
  
  		var vcdn_search = function vcdn_search() {
  			var url;
        if (balanser == 'videoapi') {
          url = 'http://5100.svetacdn.in/api/short';
          url = Lampa.Utils.addUrlComponent(url, 'api_token=qR0taraBKvEZULgjoIRj69AJ7O6Pgl9O');
        } else {
          var prox = _this2.proxy('videocdn');
          url = 'http://videocdn.tv/api/short';
          url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
        }
  			var url_by_title = Lampa.Utils.addUrlComponent(url, 'title=' + encodeURIComponent(query));
  			if (object.movie.imdb_id) url = Lampa.Utils.addUrlComponent(url, 'imdb_id=' + encodeURIComponent(object.movie.imdb_id));
  			if (object.movie.kinopoisk_id || object.movie.kinopoisk_ID) url = Lampa.Utils.addUrlComponent(url, 'kinopoisk_id=' + encodeURIComponent(object.movie.kinopoisk_id || object.movie.kinopoisk_ID));
  			else url = url_by_title;
  			network.timeout(1000 * 15);
  			network.silent(url, function (json) {
  				if (json.data && json.data.length) display(json.data);
  				else if (object.movie.imdb_id) {
  					network.timeout(1000 * 15);
  					network.silent(url_by_title, function (json) {
  						if (json.data && json.data.length) display(json.data);
  						else display([]);
  					}, function (a, c) {
              _this2.doesNotAnswer();
            });
  				} else display([]);
  			}, function (a, c) {
          _this2.doesNotAnswer();
        });
  		};
  		
  		var kp_search = function kp_search() {
  			var url = API + 'KPfind/' + encodeURIComponent(query);
  			if(object.movie.imdb_id) url = API + 'KPimdb/' + encodeURIComponent(object.movie.imdb_id);
  			network.timeout(1000 * 15);
  			network.silent(url, function (json) {
  			  if (json.items && json.items.length) display(json.items);
  			  else if (json.films && json.films.length) display(json.films);
  			  else display([]);
  			}, function (a, c) {
  				vcdn_search();
  			});
  		};
  		
  	  var letgo = function letgo(imdb_id) {
  			if (['videocdn', 'videoapi'].indexOf(balanser) >= 0) vcdn_search();
  			else if(source.searchByKinopoisk) kp_search();
  			else if (imdb_id && source.searchByImdbID) {
          _this2.extendChoice();
          source.searchByImdbID(object, imdb_id);
        } else {
          var url = 'http://videocdn.tv/api/short';
          url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
          var url_end = Lampa.Utils.addUrlComponent(url, imdb_id ? 'imdb_id=' + encodeURIComponent(imdb_id) : 'title=' + encodeURIComponent(query));
          network.timeout(1000 * 15);
          network["native"](url_end, function (json) {
            if (json.data && json.data.length) display(json);else {
              network["native"](Lampa.Utils.addUrlComponent(url, 'title=' + encodeURIComponent(query)), display.bind(_this2), kp_search());
            }
          }, kp_search());
        }
  		};
  	  
  	  if (source.searchByTitle) {
        this.extendChoice();
        source.searchByTitle(object, query);
  	  } else if (object.movie.imdb_id && source.searchByImdbID) {
        this.extendChoice();
        source.searchByImdbID(object, object.movie.imdb_id);
      } else if ((object.movie.kinopoisk_id || object.movie.kinopoisk_ID) && source.searchByKinopoisk) {
        this.extendChoice();
        source.searchByKinopoisk(object, object.movie.kinopoisk_id || object.movie.kinopoisk_ID);
  	  } else if (object.movie.imdb_id) {
        letgo(object.movie.imdb_id);
      } else if (!object.movie.imdb_id && (object.movie.source == 'tmdb' || object.movie.source == 'cub')) {
        var tmdburl = (object.movie.name ? 'tv' : 'movie') + '/' + object.movie.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru';
        var baseurl = Lampa.TMDB.api(tmdburl);
        network.timeout(1000 * 10);
        network["native"](baseurl, function (ttid) {
  		    object.movie.imdb_id = ttid.imdb_id;
          letgo(ttid.imdb_id);
        }, function (a, c) {
          letgo();
        });
      } else letgo();
  	};
    this.cleanTitle = function (str) {
      return str.replace(/[\s.,:;!?]+/g, ' ').trim();
    };
    this.equalTitle = function (t1, t2) {
      return typeof t1 === 'string' && typeof t2 === 'string' && t1.toLowerCase().replace(/—/g, '-').replace(/[\s.,:;!?]+/g, ' ').trim() === t2.toLowerCase().replace(/—/g, '-').replace(/[\s.,:;!?]+/g, ' ').trim();
    };
    this.containsTitle = function (str, title) {
      if (typeof str === 'string' && typeof title === 'string') {
        var s = str.toLowerCase().replace(/—/g, '-').replace(/[\s.,:;!?]+/g, ' ').trim();
        var t = title.toLowerCase().replace(/—/g, '-').replace(/[\s.,:;!?]+/g, ' ').trim();
        return s.indexOf(t) !== -1;
      }

      return false;
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
  					return null;
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
  	this.ReverseObject = function (Obj){
      var TempArr = [];
      var NewObj = {};
      for (var Key in Obj){
          TempArr.push(Key);
      }
      for (var i = TempArr.length-1; i >= 0; i--){
          NewObj[TempArr[i]] = Obj[TempArr[i]];
      }
      return NewObj;
    };
    this.getChoice = function (for_balanser) {
      var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
      var save = data[selected_id || object.movie.id] || {};
      Lampa.Arrays.extend(save, {
        season: 0,
        voice: 0,
        voice_name: '',
        voice_id: 0,
        episodes_view: {},
        movie_view: ''
      });
      return save;
    };
    this.extendChoice = function () {
      extended = true;
      source.extendChoice(this.getChoice());
    };
    this.saveChoice = function (choice, for_balanser) {
      var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
      data[selected_id || object.movie.id] = choice;
      Lampa.Storage.set('online_choice_' + (for_balanser || balanser), data);
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      last_select_balanser[object.movie.id] = (for_balanser || balanser);
      Lampa.Storage.set('online_last_balanser', last_select_balanser);
    };
    this.similars = function (json) {
      var _this3 = this;
      json.forEach(function (elem) {
        var info = [];
        var year = ((elem.start_date || elem.year || '') + '').slice(0, 4);
      	var transl = elem.translations ? String(elem.translations).split(',').slice(0, 2) : '';
  			var count_s = elem.seasons_count ? elem.seasons_count + ' ' + Lampa.Lang.translate('torrent_serial_season').toLowerCase() + _this3.num_word(elem.seasons_count, ['', 'а', 'ов']) : '';
  			var count_eps = elem.episodes_count ? elem.episodes_count + ' эпизод' + _this3.num_word(elem.episodes_count, ['', 'а', 'ов']) : '';
        if (year) info.push(year);
  			if (elem.type) info.push(elem.type == 'serial' || elem.type == 'MINI_SERIES' ? ('Cериал' + (count_s && ' - ' + count_s + ' из них ' + count_eps)) : 
  			           elem.type == 'TV_SHOW' ? 'Тв-Шоу' : 
  			           elem.type == ('movie' || 'film' || 'FILM') ? 'Фильм' : elem.type);
  			if (transl) info.push(transl);
        if (elem.rating && elem.rating !== 'null' && elem.filmId) info.push(Lampa.Template.get('modss_online_rate', {
          rate: elem.rating
        }, true));
        if (elem.quality && elem.quality.length) info.push(elem.quality);
  
        if (elem.countries && elem.countries.length) {
          info.push((elem.filmId ? elem.countries.map(function (c) {
            return c.country;
          }) : elem.countries.map(function(c){
            return c.title || c;
          })).join(', '));
        }
  
        if (elem.categories && elem.categories.length) {
        //  info.push(elem.categories.slice(0, 4).join(', '));
        }
  
        var name = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
        var orig = elem.orig_title || elem.nameEn || '';
        elem.title = name + (orig && orig !== name ? ' / ' + orig : '');
        elem.time = elem.filmLength || '';
        elem.info = info.join('<span class="online_modss-split">●</span>');
        var item = Lampa.Template.get('modss_online_folder', elem);
        item.on('hover:enter', function () {
          _this3.activity.loader(true);
  
          _this3.reset();
  
          object.search_date = year;
          selected_id = elem.id;
  
          _this3.extendChoice();
  
          var kinopoisk_id = elem.kp_id || elem.filmId;

          if (kinopoisk_id && source.searchByKinopoisk) {
            source.searchByKinopoisk(object, kinopoisk_id);
          } else if (source.search) {
            source.search(object, [elem]);
          } else {
            _this3.doesNotAnswer();
          }
        }).on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        scroll.append(item);
      });
    };
    this.clearImages = function () {
      images.forEach(function (img) {
        img.onerror = function () {};
  
        img.onload = function () {};
  
        img.src = '';
      });
      images = [];
    };
    this.reset = function () {
      last = false;
      clearInterval(balanser_timer);
      network.clear();
      this.clearImages();
      scroll.render().find('.empty').remove();
      scroll.clear();
    };
    this.loading = function (status) {
      if (status) this.activity.loader(true);else {
        this.activity.loader(false);
        this.activity.toggle();
      }
    };
    // 定义名为 filter 的函数，接收两个参数：filter_items 和 choice
	this.filter = function (filter_items, choice) {
		
	  var _this4 = this; // 存储当前函数上下文
	
	  var select = []; // 存储生成的选择菜单项的数组
	
	  // 定义名为 add 的函数，用于向 select 数组添加选择菜单项
	  var add = function add(type, title) {
		var need = _this4.getChoice(); // 获取选择条件
		var items = filter_items[type]; // 获取特定类型的过滤项
		var subitems = []; // 存储子菜单项的数组
		var value = need[type]; // 获取选择条件的特定类型的值
		items.forEach(function (name, i) {
		  subitems.push({
			title: name,
			selected: value == i,
			index: i
		  });
		});
		// 将选择菜单项的相关信息添加到 select 数组中
		select.push({
		  title: title,
		  subtitle: items[value],
		  items: subitems,
		  stype: type
		});
	  };
	
	  // 设置 filter_items 的 source 属性为 filter_sources
	  filter_items.source = filter_sources;
	  // 设置 choice 的 source 属性为 balanser 在 filter_sources 中的索引
	  choice.source = filter_sources.indexOf(balanser);
	
	  // 向 select 数组添加一个重置选择的菜单项
	  select.push({
		title: Lampa.Lang.translate('torrent_parser_reset'),
		reset: true
	  });
	
	  this.saveChoice(choice); // 保存选择条件
	
	  // 根据 filter_items 中的不同属性生成选择菜单项
	  if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
	  if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
	  if (filter_items.type && filter_items.type.length) add('type', Lampa.Lang.translate('filter_video_stream') + '');
	  if (filter_items.server && filter_items.server.length) add('server', Lampa.Lang.translate('filter_video_server') + '');
	  if (filter_items.order && filter_items.order.length) add('order', Lampa.Lang.translate('filter_series_order') + '');
	
	  // 将生成的选择菜单项应用到名为 filter 的对象中的 filter 属性
	  filter.set('filter', select);
	
	  // 根据 filter_sources 生成排序信息，并应用到名为 filter 的对象中的 sort 属性
	  filter.set('sort', filter_sources.map(function (e, i) {
		var tpl = {
		  title: balansers[e],
		  source: e,
		  selected: e == balanser,
		//   ghost: i >= (Lampa.Storage.get('pro_pub', false) ? 7 : 6) ? true : false
		};
		// if(i >= (Lampa.Storage.get('pro_pub', false) ? 7 : 6)) {
		//   tpl.template = 'selectbox_icon';
		//   tpl.icon = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" viewBox="0 0 401.998 401.998" xml:space="preserve"><path d="M357.45 190.721c-5.331-5.33-11.8-7.993-19.417-7.993h-9.131v-54.821c0-35.022-12.559-65.093-37.685-90.218C266.093 12.563 236.025 0 200.998 0c-35.026 0-65.1 12.563-90.222 37.688-25.126 25.126-37.685 55.196-37.685 90.219v54.821h-9.135c-7.611 0-14.084 2.663-19.414 7.993-5.33 5.326-7.994 11.799-7.994 19.417V374.59c0 7.611 2.665 14.086 7.994 19.417 5.33 5.325 11.803 7.991 19.414 7.991H338.04c7.617 0 14.085-2.663 19.417-7.991 5.325-5.331 7.994-11.806 7.994-19.417V210.135c.004-7.612-2.669-14.084-8.001-19.414zm-83.363-7.993H127.909v-54.821c0-20.175 7.139-37.402 21.414-51.675 14.277-14.275 31.501-21.411 51.678-21.411 20.179 0 37.399 7.135 51.677 21.411 14.271 14.272 21.409 31.5 21.409 51.675v54.821z" fill="currentColor"></path></svg>'
		// };
		return tpl;
	  }));
	
	  // 处理选定的选择条件
	  this.selected(filter_items);
	};
	
    this.closeFilter = function () {
      if ($('body').hasClass('selectbox--open')) Lampa.Select.close();
    };
    this.selected = function (filter_items) {
      var need = this.getChoice(), 
          select = [];
  
      for (var i in need) {
        if (filter_items[i] && filter_items[i].length) {
          if (i == 'voice') {
            select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
          } else if (i !== 'source') {
            if (filter_items.season.length >= 1) {
              select.push(filter_translate.season + ': ' + filter_items[i][need[i]]);
            } else {
			  select.push(filter_items[i][need[i]]);
			}
          }
        }
      }
  
      filter.chosen('filter', select);
      filter.chosen('sort', [balanser]);
      this.new_seria();
    };
    this.getEpisodes = function (season, call) {
      var episodes = [];
      if (typeof object.movie.id == 'number' && object.movie.name) {
        var tmdburl = 'tv/' + object.movie.id + '/season/' + season + '?api_key=4ef0d7355d9ffb5151e987764708ce96&language=' + Lampa.Storage.get('language', 'ru');
        var baseurl = Lampa.TMDB.api(tmdburl);
        if(object.movie.source == 'pub') baseurl = Pub.baseurl+'v1/items/'+object.movie.id+'?access_token='+ Pub.token;
        network.timeout(1000 * 10);
        network["native"](baseurl, function (data) {
          if(object.movie.source == 'pub') {
            episodes = data.item.seasons.find(function (s){
              return s.number == season;
            });
            episodes = episodes && episodes.episodes || [];
          } else episodes = data.episodes || [];
          call(episodes);
        }, function (a, c) {
          call(episodes);
        });
      } else call(episodes);
    };
    this.append = function (item) {
      item.on('hover:focus', function (e) {
        last = e.target;
        scroll.update($(e.target), true);
      });
      scroll.append(item);
    };
    this.draw = function (items) {
      var _this4 = this;
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var choice = _this4.getChoice();
      if (!items.length) return this.empty();
     
      this.getEpisodes((object.movie.source == 'pub' || balanser == 'pub') || (object.movie.original_language !== 'ja' || object.movie.number_of_seasons >= choice.seasons) ? items[0].season : 1, function (episodes) {
        // 使用 Lampa.Storage.cache() 方法创建一个名为 'online_view' 的缓存，过期时间为 5000 毫秒，初始值为空数组
		var viewed = Lampa.Storage.cache('online_view', 5000, []);
		
		// 检查对象的 movie 属性中是否存在 name 属性，如果存在则将 serial 设置为 true，否则设置为 false
		var serial = object.movie.name ? true : false;
		
        // 检查窗口宽度是否大于 480 像素
		var fully = window.innerWidth > 480;
		
		// 初始化一个用于滚动到特定元素的标志变量，默认为 false
		var scroll_to_element = false;
		
		// 初始化一个用于滚动到特定标记的标志变量，默认为 false
		var scroll_to_mark = false;
		
        
        // 检查条件：如果对象的电影的原始语言为 'ja'、剧集数大于已有剧集数，并且电影的季数小于选择的季数，则将 more 设置为 true，否则为 false
		var more = object.movie.original_language == 'ja' && episodes.length > items.length && (object.movie.number_of_seasons < choice.seasons);
		
		// 初始化 ismore 为 true
		var ismore = true;
		
		// 如果 more 为 true，则执行以下代码块
		if (more) {
		  // 根据条件判断是否截取剧集，如果 more 为 true，则从已有剧集后截取剩余剧集，否则直接使用全部剧集
		  var ep = more ? episodes.slice(items.length) : episodes;
		
		  // 检查条件：如果已有剧集中的最后一集的集数大于等于剩余剧集中的第一集的集数，则将 ismore 设置为 false
		  ismore = items[items.length - 1].episode >= episodes[ep.length].episode_number;
		
		  // 如果 ismore 仍然为 true，则根据条件判断是否再次截取剧集
		  if (ismore) {
			// 根据条件判断截取剧集的位置，如果剩余剧集数小于已有剧集数，则截取位置为剩余剧集数减去 2，否则截取位置为已有剧集数减去 1
			ep = episodes.slice(items.length - ((episodes.length - items.length) < items.length - 1 ? 2 : 1));
		  }
		}
		
        
        // 对数组 items 中的每个元素进行遍历
		items.forEach(function (element, index) {
		  // 根据一些条件查找对应的 episode 和 episodee
		  // 定义变量 episode，根据条件判断是否为真值，如果满足条件则执行三元运算符逻辑，否则赋值为 false
		  var episode = serial && episodes.length && !params.similars ? ((ismore && more) ? ep : episodes).find(function (e, i) {
			// 根据条件判断返回值，如果满足条件 (ismore && more)，则判断 index 是否等于当前循环索引 i，否则判断当前循环项的集数是否等于 element 的集数
			return (ismore && more) ? index == i : ((e.episode_number || e.number) == element.episode);
		  }) : false;
		  
		  // 定义变量 episodee，根据条件判断是否为真值，如果满足条件则执行数组的 find 方法逻辑，否则赋值为 false
		  var episodee = serial && episodes.length && !params.similars ? episodes.find(function (e, i) {
			// 判断当前循环项的集数是否等于 element 的集数
			return (e.episode_number || e.number) == element.episode;
		  }) : false;
		  
		  
		  // 设置 episode_num 和 episode_last 变量
		  var episode_num = element.episode || index + 1;
		  var episode_last = choice.episodes_view[element.season];
		
		  // 扩展 element 对象的属性
		  Lampa.Arrays.extend(element, {
			info: '',
			quality: '',
			time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true)
		  });
		  
		  // 计算哈希值以用于时间线和标记
		  // 根据条件判断是否为某一季节，如果满足条件则拼接字符串并计算哈希值，否则只计算电影原始标题的哈希值
		  var hash_timeline = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.quality, element.file].join('') : [object.movie.original_title, element.file, element.quality].join('') );
		  
		  // 根据条件判断是否为某一季节，如果满足条件则拼接字符串并计算哈希值，否则拼接电影原始标题和声音名称，并计算哈希值
		  var hash_behold = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.voice_name, element.quality, element.file].join('') : object.movie.original_title + element.voice_name + element.file + element.quality);
		  
		  // 定义对象 data，包含两个属性，分别对应之前计算得到的哈希值
		  var data = {
			hash_timeline: hash_timeline,
			hash_behold: hash_behold
		  };
		  
		  // 定义空数组 info，用于存储信息，目前数组为空
		  var info = [];
		  
		
		  // 如果存在 season，设置一些属性
		  if (element.season) {
			element.translate_episode_end = _this4.getLastEpisode(items);
			element.translate_voice = element.voice_name;
		  }
		
		  // 获取时间线并设置元素的标题和信息
		  element.timeline = Lampa.Timeline.view(hash_timeline);
		  
		  if (episode) {
			element.title = (element.episode_name || episode.name || episode.title || element.title);
			if (!element.info && episode.vote_average) info.push(Lampa.Template.get('modss_online_rate', {
			  rate: parseFloat(episode.vote_average + '').toFixed(1)
			}, true));
			if (episode.air_date && fully) info.push(Lampa.Utils.parseTime(episode.air_date).full);
		  } else if (object.movie.release_date && object.movie.release_date.length > 4 && fully) {
			info.push(Lampa.Utils.parseTime(object.movie.release_date).full);
		  }
		  
		  // 根据条件添加信息到数组 info
		  if (!serial && object.movie.tagline && element.info.length < 30) info.push(object.movie.tagline);
		  if (element.info) info.push(element.info);
		  if (info.length) element.info = info.map(function (i) {
			return '<span>' + i + '</span>';
		  }).join('<span class="online_modss-split">●</span>');
		  
		  // 获取模板并生成 HTML 内容
		  var html = Lampa.Template.get('modss_online_full', element);
		  var loader = html.find('.online_modss__loader');
		  var image = html.find('.online_modss__img');
		  
		  // 根据条件判断是否滚动到指定元素
		  // 如果 serial 为空，则进入条件判断
		  if (!serial) {
			// 如果选择的电影视图与 hash_behold 相符，则将滚动位置设置为 html 元素
			if (choice.movie_view == hash_behold) scroll_to_element = html;
		  } else if (typeof episode_last !== 'undefined' && episode_last == episode_num) {
			// 如果 serial 不为空且满足条件 episode_last 未定义且 episode_last 等于 episode_num
			// 则将滚动位置设置为 html 元素
			scroll_to_element = html;
		  
			// 获取选项 cont，并检查是否需要继续播放在线内容
			var cont = _this4.getChoice();
			if (Lampa.Storage.field('online_continued') && cont && cont.continued) {
			  // 将继续播放标志设为 false，并保存选项
			  cont.continued = false;
			  _this4.saveChoice(cont);
		  
			  // 扩展选项并设置定时器
			  _this4.extendChoice();
			  setTimeout(function () {
				// 触发 hover:enter 事件，延迟时间取决于 balanser 的值
				$(html).trigger('hover:enter');
			  }, balanser == 'videocdn' ? 2000 : 50);
			}
		  }
		  
		  
		  // 根据条件添加剧集编号到图片中
		  if (serial && element.episode) image.append('<div class="online_modss__episode-number-season">S' + (element.season || episode.snumber || episode.season_number || 0) + ':E' + (element.episode || episode.number || episode.episode_number || 0) + '</div>');
		  
		  // 添加剧集编号到图片中，并根据条件移除 loader
		  if (serial && !episode) {
			image.append('<div class="online_modss__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
			loader.remove();
		  } else {
			// 处理图片加载和错误情况
			var img = html.find('img')[0];
			img.onerror = function () {
			  img.src = './img/img_broken.svg';
			};
			img.onload = function () {
			  image.addClass('online_modss__img--loaded');
			  loader.remove();
			};
			img.src = object.movie.source == 'filmix' ? object.movie.img : object.movie.source == 'pub' ? (episode && episode.thumbnail || object.movie.background_image) : Lampa.TMDB.image('t/p/w300' + (episode ? episode.still_path : object.movie.backdrop_path));
			images.push(img);
		  }
		  
		  // 在 HTML 中添加时间线
		  html.find('.online_modss__timeline').append(Lampa.Timeline.render(element.timeline));
		  
		  // 根据条件添加时间线详情
		  if (Lampa.Timeline.details) {
			html.find('.online_modss__timeline').append(Lampa.Timeline.details(element.timeline));
		  }
		  
		  // 根据条件添加已查看标记
		  if (viewed.indexOf(hash_behold) !== -1) {
			scroll_to_mark = html;
			html.find('.online_modss__img').append('<div class="online_modss__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
		  }
		  
		  // 标记方法
		  element.mark = function () {
			viewed = Lampa.Storage.cache('online_view', 5000, []);
			if (viewed.indexOf(hash_behold) == -1) {
			  viewed.push(hash_behold);
			  Lampa.Storage.set('online_view', viewed);
			  if (html.find('.online_modss__viewed').length == 0) {
				html.find('.online_modss__img').append('<div class="online_modss__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
			  }
			}
			choice = _this4.getChoice();
			if (!serial) {
			  choice.movie_view = hash_behold;
			} else {
			  choice.episodes_view[element.season] = episode_num 
			choice.episodes_view[element.season] = episode_num;
		  }
		  _this4.saveChoice(choice);
		  _this4.new_seria();
		};
		
		// 取消标记方法
		element.unmark = function () {
		  viewed = Lampa.Storage.cache('online_view', 5000, []);
		  if (viewed.indexOf(hash_behold) !== -1) {
			Lampa.Arrays.remove(viewed, hash_behold);
			Lampa.Storage.set('online_view', viewed);
			if(Lampa.Manifest.app_digital >= 177) Lampa.Storage.remove('online_view', hash_behold);
			html.find('.online_modss__viewed').remove();
			_this4.new_seria();
		  }
		};
		
		// 清除时间线方法
		element.timeclear = function () {
		  element.timeline.percent = 0;
		  element.timeline.time = 0;
		  element.timeline.duration = 0;
		  Lampa.Timeline.update(element.timeline);
		  _this4.new_seria();
		};
		
		// 添加鼠标进入和聚焦事件处理
		html.on('hover:enter', function () {
		  if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
		  if (params.onEnter) params.onEnter(element, html, data);
		}).on('hover:focus', function (e) {
		  last = e.target;
		  if(['pub', 'collaps'].indexOf(balanser) >= 0){
			$('.voices').remove();
			$('.explorer-card__descr').hide().after('<div class="voices"></div>');
			$('.voices').html(Lampa.Lang.translate('<b>#{torrent_parser_voice}:</b><br>' +element.voice));
		  } 
		  if (params.onFocus) params.onFocus(element, html, data);
		  scroll.update($(e.target), true);
		});
		
		// 如果存在 onRender 回调，调用它
		if (params.onRender) params.onRender(element, html, data);
		
		// 调用上下文菜单方法并传递参数
		_this4.contextMenu({
		  html: html,
		  element: element,
		  onFile: function onFile(call) {
			if (params.onContextMenu) params.onContextMenu(element, html, data, call);
		  },
		  onClearAllMark: function onClearAllMark() {
			items.forEach(function (elem) {
			  elem.unmark();
			});
		  },
		  onClearAllTime: function onClearAllTime() {
			items.forEach(function (elem) {
			  elem.timeclear();
			});
		  }
		});
		
		// 将生成的 HTML 添加到滚动区域
		scroll.append(html);
		});
		
        
        if (serial && object.movie.number_of_seasons >= choice.seasons && episodes.length > items.length && !params.similars) {
          var left = episodes.slice(items.length);
          left.forEach(function (episode) {
            var info = [];
            if (episode.vote_average) info.push(Lampa.Template.get('modss_online_rate', {
              rate: parseFloat(episode.vote_average + '').toFixed(1)
            }, true));
            if (episode.air_date) info.push(Lampa.Utils.parseTime(episode.air_date).full);
            var air = new Date((episode.air_date + '').replace(/-/g, '/'));
            var now = Date.now();
            var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
            var txt = Lampa.Lang.translate('full_episode_days_left') + ': ' + day;
            var html = Lampa.Template.get('modss_online_full', {
              time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true),
              info: info.length ? info.map(function (i) {
                return '<span>' + i + '</span>';
              }).join('<span class="online_modss-split">●</span>') : '',
              title: episode.name,
              quality: day > 0 ? txt : ''
            });
            html.css('opacity','0.3');
            
            var loader = html.find('.online_modss__loader');
            var image = html.find('.online_modss__img');
            var season = items[0] ? items[0].season : 1;
            html.find('.online_modss__timeline').append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([season, episode.episode_number, object.movie.original_title].join('')))));
            var img = html.find('img')[0];
  
            if (episode.still_path) {
              img.onerror = function () {
                img.src = './img/img_broken.svg';
              };
  
              img.onload = function () {
                image.addClass('online_modss__img--loaded');
                loader.remove();
                image.append('<div class="online_modss__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
              };
  
              img.src = Lampa.TMDB.image('t/p/w300' + episode.still_path);
              images.push(img);
            } else {
              loader.remove();
              image.append('<div class="online_modss__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
            }
  
            html.on('hover:focus', function (e) {
              last = e.target;
              scroll.update($(e.target), true);
            });
            scroll.append(html);
          });
        }
  
        // 如果存在要滚动到的元素（scroll_to_element），则将最后一个滚动目标设置为该元素
		if (scroll_to_element) {
		  last = scroll_to_element[0];
		} 
		// 否则，如果存在要滚动到的标记（scroll_to_mark），将最后一个滚动目标设置为该标记
		else if (scroll_to_mark) {
		  last = scroll_to_mark[0];
		}
		
  
        Lampa.Controller.enable('content');
      });
    };
    this.contextMenu = function (params) {
      params.html.on('hover:long', function () {
        function show(extra) {
          var enabled = Lampa.Controller.enabled().name;
          var menu = [];
  
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
          menu.push({
            title: Lampa.Lang.translate('modss_video'),
            separator: true
          });
          menu.push({
            title: Lampa.Lang.translate('torrent_parser_label_title'),
            mark: true
          });
          menu.push({
            title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
            unmark: true
          });
          menu.push({
            title: Lampa.Lang.translate('time_reset'),
            timeclear: true
          });
  
          if (extra) {
            menu.push({
              title: Lampa.Lang.translate('copy_link'),
              copylink: true
            });
          }
  
          menu.push({
            title: Lampa.Lang.translate('more'),
            separator: true
          });
  
          if (Lampa.Account.logged() && params.element && typeof params.element.season !== 'undefined' && params.element.translate_voice) {
            menu.push({
              title: Lampa.Lang.translate('modss_voice_subscribe'),
              subscribe: true
            });
          }
  
          menu.push({
            title: Lampa.Lang.translate('modss_clear_all_marks'),
            clearallmark: true
          });
          menu.push({
            title: Lampa.Lang.translate('modss_clear_all_timecodes'),
            timeclearall: true
          });
          Lampa.Select.show({
            title: Lampa.Lang.translate('title_action'),
            items: menu,
            onBack: function onBack() {
              Lampa.Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              if (a.mark) params.element.mark();
              if (a.unmark) params.element.unmark();
              if (a.timeclear) params.element.timeclear();
              if (a.clearallmark) params.onClearAllMark();
              if (a.timeclearall) params.onClearAllTime();
              Lampa.Controller.toggle(enabled);
  
              if (a.player) {
                Lampa.Player.runas(a.player);
                params.html.trigger('hover:enter');
              }
  
              if (a.copylink) {
                if (extra.quality) {
                  var qual = [];
  
                  for (var i in extra.quality) {
                    qual.push({
                      title: i,
                      file: extra.quality[i]
                    });
                  }
  
                  Lampa.Select.show({
                    title: Lampa.Lang.translate('settings_server_links'),
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
  
              if (a.subscribe) {
                Lampa.Account.subscribeToTranslation({
                  card: object.movie,
                  season: params.element.season,
                  episode: params.element.translate_episode_end,
                  voice: params.element.translate_voice
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('modss_voice_success'));
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('modss_voice_error'));
                });
              }
            }
          });
        }
  
        params.onFile(show);
      }).on('hover:focus', function () {
        if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.html);
      });
    };
    this.empty = function (er) {
      var html = Lampa.Template.get('modss_does_not_answer', {});
      html.find('.online-empty__buttons').remove();
      html.find('.online-empty__title').text(er && er.vip ? er.vip.title : Lampa.Lang.translate('empty_title_two'));
      html.find('.online-empty__time').text(er && er.vip ? er.vip.msg : er ? er: Lampa.Lang.translate('empty_text'));
      scroll.append(html);
      this.loading(false);
    };
    this.doesNotAnswer = function (query) {
      var _this6 = this;
      this.reset();
      var html = Lampa.Template.get('modss_does_not_answer', {
        title: (query && query.length) ? (Lampa.Lang.translate('online_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_query_end') + Lampa.Lang.translate('modss_balanser_dont_work_from')) : Lampa.Lang.translate('modss_balanser_dont_work'), 
        balanser: balansers[balanser]
      });
      var tic = 10;
      html.find('.cancel').on('hover:enter', function () {
        clearInterval(balanser_timer);
      });
      html.find('.change').on('hover:enter', function () {
        clearInterval(balanser_timer);
        filter.render().find('.filter--sort').trigger('hover:enter');
      });
      scroll.append(html);
      this.loading(false);
      balanser_timer = setInterval(function () {
        tic--;
        html.find('.timeout').text(tic);
  
        if (tic == 0) {
          clearInterval(balanser_timer);
          var keys = Lampa.Arrays.getKeys(sources);
          var indx = keys.indexOf(balanser);
          var next = keys[indx + 1];
          if (!next) next = keys[0];
          balanser = next;
          if (Lampa.Activity.active().activity == _this6.activity) _this6.changeBalanser(balanser);
        }
      }, 1000);
    };
    this.emptyForQuery = function (query) {
      this.empty(Lampa.Lang.translate('online_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_query_end'));
    };
    this.getLastEpisode = function (items) {
      var last_episode = 0;
      items.forEach(function (e) {
        if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
      });
      return last_episode;
    };
    this.new_seria = function () {
  		if (object.movie.number_of_seasons) {
  			setTimeout(function () {
  				$('.card--new_ser, .card--viewed, .full-start__right .time-line, .card--last_view').remove();
  				if ($('body').find('.online').length !== 0) {
  					if ($('body').find('.online:last-child .torrent-item__viewed').length == 1 || $('body').find('.online:last-child .time-line.hide').length == 0) $('body').find('.full-start__poster').append("<div class='card--viewed' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate('online_viewed') + "</div>");
  					else $('body').find('.full-start__poster').append("<div class='card--new_ser' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate('season_new') + " " + Lampa.Lang.translate('torrent_serial_episode') + "</div>");
  				}
  				Modss.last_view(object.movie);
  			}, 50);
  		}
  	};
    this.num_word = function (value, words) {
  		value = Math.abs(value) % 100;
  		var num = value % 10;
  		if (value > 10 && value < 20) return words[2];
  		if (num > 1 && num < 5) return words[1];
  		if (num == 1) return words[0];
  		return words[2];
  	};
    this.order = [{title: '默认排序', id: 'normal'}, {title: '倒序', id: 'invers'}];
    this.start = function () {
      var _this7 = this;
      if (Lampa.Activity.active().activity !== this.activity) return;
  
      if (!initialized) {
        initialized = true;
        this.initialize();
      }
  
      Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(object.movie));
      Lampa.Controller.add('content', {
        toggle: function toggle() {
          Lampa.Controller.collectionSet(scroll.render(), files.render());
          Lampa.Controller.collectionFocus(last || false, scroll.render());
        },
        up: function up() {
          if (Navigator.canmove('up')) {
            Navigator.move('up');
          } else Lampa.Controller.toggle('head');
        },
        down: function down() {
          Navigator.move('down');
        },
        right: function right() {
          if (Navigator.canmove('right')) Navigator.move('right');
          else if (object.movie.number_of_seasons) filter.show(Lampa.Lang.translate('title_filter'), 'filter');
  				else filter.show(Lampa.Lang.translate('modss_balanser'), 'sort');
        },
        left: function left(){
          var poster = files.render().find('.explorer-card__head-img');
          if(poster.hasClass('focus')) Lampa.Controller.toggle('menu');
          else if(Navigator.canmove('left')) Navigator.move('left');
          else Navigator.focus(poster[0]);
        },
        gone: function gone() {
          clearInterval(balanser_timer);
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
      this.clearImages();
      files.destroy();
      scroll.destroy();
      clearInterval(balanser_timer);
      if (source) source.destroy();
    };
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
				title: '链接',
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
			title: Lampa.Lang.translate('modss_clear_all_marks'),
			clearmark_all: true
		  }, {
			title: Lampa.Lang.translate('time_reset'),
			timeclear: true
		  }, {
			title: Lampa.Lang.translate('modss_clear_all_timecodes'),
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
	function getWebs() {
		return JSON.parse(localStorage.getItem(HISTORY_WEBS_KEY)) || [];
	  };
  
	  function saveWeb(el) {
		// if (!el.hasOwnProperty("adult")) {
		// 	console.log(el)
		//   if (!el.hasOwnProperty("title_org")) {
		// 	  el.title_org = element.title;
		// 	  el.website = 'TMDB';
		//   }
		if (el.url && el.hasOwnProperty("title_org") ) {
		  var webs = getWebs();
		  webs.push(el);
		  localStorage.setItem(HISTORY_WEBS_KEY, JSON.stringify(webs));
		}
	  };
  
	  function removeWeb(el) {
		var updatedHistory = getWebs().filter(function (obj) { return obj.url !== el.url });
		Lampa.Storage.set(HISTORY_WEBS_KEY, updatedHistory);
	  };
  
	  function isFavorite(el) {
		var webs = getWebs();
		return webs.some(function (a) {
		  return a.url === el;
		});
	  };
  
	  this.savehistory = function (object) {
		var el = object.movie;
		// element.website = object.setup.title;
		var isHistory = isFavorite(el.url);
		if (isHistory) {
		  removeWeb(el);
		};
		saveWeb(el);
	  };

	  function resolveRelativePath(currentPageUrl, relativePath) {
		// console.log(relativePath)
		// 如果是绝对路径，则直接返回
		/* if (isAbsolutePath) {
		  return relativePath;
		} */
  
		// 如果是以 / 开头的相对路径，则加上当前网站的基础路径
		if (relativePath.startsWith('/')) {
		  // const baseUrl = new URL(currentPageUrl);
		  var baseUrl = resolveUrl(currentPageUrl);
		  return `${baseUrl.origin}${relativePath}`;
		}
  
		if (relativePath.startsWith('../')) {
		  // 如果是相对路径，则分别处理 ./ 和 ../
		  let arr = currentPageUrl.split('/');
		  let hostUrl = arr[0] + '//' + arr[2];
		  let temp = currentPageUrl.substr(currentPageUrl.indexOf(arr[3]));
		  temp = temp.substring(0, temp.lastIndexOf('/') + 1);
		  while (relativePath.indexOf('../') === 0) {
			temp = temp.substring(0, temp.substr(0, temp.length - 1).lastIndexOf('/') + 1);
			relativePath = relativePath.substring(3);
		  }
		  return `${hostUrl}${temp}${relativePath}`;
		}
  
		if (relativePath.startsWith('./')) {
		  var stack = currentPageUrl.split('/');
		  var parts = relativePath.split('/');
		  stack.pop(); // remove current file name (or empty string)
  
		  for (var i = 0; i < parts.length; i++) {
			if (parts[i] == '.')
			  continue;
			if (parts[i] == '..')
			  stack.pop();
			else
			  stack.push(parts[i]);
		  }
		  return stack.join('/');
		}
	  }
  
	  this.getAbsolutePath = function (currentPageUrl, value) {
		var absolutePath;
		// 判断属性值是否以相对路径开头
		if (value.startsWith('./') || value.startsWith('../') || value.startsWith('/')) {
		  if (value.startsWith('//')) {
			absolutePath = value.replace("//", "https://");
		  } else {
			// 将相对路径转换成绝对路径
			absolutePath = resolveRelativePath(currentPageUrl, value);
		  }
		  // console.log('absolutePath', absolutePath)
		  return absolutePath;
		} else {
		  if (Boolean(value.match(/^(http|https|ftp):\/\//i))) {
			return value;
		  } else {
			absolutePath = currentPageUrl.substring(0, currentPageUrl.lastIndexOf("/") + 1) + value;
			// console.log('absolutePath', absolutePath + value)
			return absolutePath;
		  }
		}
	  }
  
	  function resolveUrl(currentPageUrl) {
		var link = $('<a>').prop('href', currentPageUrl);
		return link[0]; // 返回原生的链接元素对象
	  }

	  this.extractEpisodeNumber = function (inputString) {
		// 使用正则表达式匹配数字部分
		var strippedString = inputString.replace(/\d+季\s*/, ''); // 移除季数部分
		var match = strippedString.match(/\d+/); // 匹配剩余字符串中的数字
		if (match) {
			// 获取匹配到的数字并移除开头的 0
			var episodeNumber = parseInt(match[0]);
			return episodeNumber; // 返回提取的季数
		} else {
			// 没有匹配到数字，返回原字符串
			return inputString; // 返回原输入字符串
		}
	}
	  this.extractTitleContent = function (inputString) {
		var match = inputString.match(/<title>(.*?)<\/title>/);
	
		if (match && match[1]) {
			var extractedContent = match[1];
			return extractedContent;
		} else {
			return inputString;
		}
	}
	function chineseToArabicNumber(chineseNumber) {
		if (isNaN(chineseNumber)) {
			var chineseNumberMap = {
				一: 1, 二: 2, 三: 3, 四: 4, 五: 5,
				六: 6, 七: 7, 八: 8, 九: 9, 十: 10
			};

			let arabicNumber = 0;
			let tempValue = 0;

			for (let char of chineseNumber) {
				if (chineseNumberMap[char] !== undefined) {
					if (chineseNumberMap[char] === 10) {
						tempValue *= 10;
					} else {
						tempValue += chineseNumberMap[char];
					}
				} else {
					arabicNumber += tempValue === 0 ? 1 : tempValue;
					tempValue = 0;
				}
			}

			arabicNumber += tempValue;
			return arabicNumber;
		} else {
			return chineseNumber;
		}
	}
	this.seasonNumber = function(text) {
		// 匹配季数和集数的正则表达式模式（支持中文数字）
		var seasonPattern = /(?:第)?([0-9一二三四五六七八九十]+)季/i; // 可能包含"第"，然后捕获季数

		// 提取季数和集数的逻辑
		var seasonMatch = text.match(seasonPattern);
		if (seasonMatch) {
			var seasonNumber = seasonMatch ? chineseToArabicNumber(seasonMatch[1]) : 1;
			return seasonNumber;
		} else {
			return '';
		}
	}
	this.episodeNumber =function (text) {
		var episodePattern = /(?:第)?([0-9一二三四五六七八九十]+)集/i; // 可能包含"第"，然后捕获集数
		var episodeMatch = text.match(episodePattern);
		if (episodeMatch) {
			return true;
		} else {
			return false;
		}
	}
  
  }
	
//   function forktv(object) {
//   	var network = new Lampa.Reguest();
//   	var scroll = new Lampa.Scroll({
//   		mask: true,
//   		over: true,
//   		step: 250
//   	});
//   	var items = [];
//   	var contextmenu_all = [];
//   	var html = $('<div class="forktv"></div>');
//   	var body = $('<div class="category-full"></div>');
//   	var last;
//   	var waitload = false;
//   	var active = 0;
//   	this.create = function () {
//   		var _this = this;
//   		this.activity.loader(true);
//   		if (object.submenu) _this.build(object.url);
//   		else {
//   			var u = object.url && object.url.indexOf('?') > -1 ? '&' : '?';
//   			network["native"](object.url + u + ForkTV.user_dev, function (found) {
//   				_this.build(found);
//   			}, function (a, c) {
//   				_this.build(a);
//   				Lampa.Noty.show(network.errorDecode(a, c));
//   			});
//   		}
//   		return this.render();
//   	};
//   	this.next = function (next_page_url) {
//   		var _this2 = this;
//   		if (waitload) return;
//   		if (object.page < 90) {
//   			waitload = true;
//   			object.page++;
//   			network["native"](next_page_url + '&' + ForkTV.user_dev, function (result) {
//   				_this2.append(result);
//   				if (result.channels.length) waitload = false;
//   				Lampa.Controller.enable('content');
//   				_this2.activity.loader(false);
//   			}, function (a, c) {
//   				Lampa.Noty.show(network.errorDecode(a, c));
//   			});
//   		}
//   	};
//   	this.stream = function (data, title, youtube, subs, element, view) {
//   		var _this = this;
//   		if (data.indexOf('getstream') == -1 && (data.indexOf('rgfoot') > -1 || data.indexOf('torrstream') > -1 || data.indexOf('torrent') > -1)) {
//   			this.activity.loader(true);
//   			network.timeout(10000);
//   			network["native"](data + '&' + ForkTV.user_dev, function (json) {
//   				_this.activity.loader(false);
//   				if (json.channels.length > 0) {
//   					var playlist = [];
//   					var data = json.channels[0];
//   					if (data.stream_url) {
//   						var first = {
//   							title: data.title,
//   							url: data.stream_url,
//   							timeline: view
//   						};
//   						if (json.channels.length > 1) {
//   							json.channels.forEach(function (elem) {
//   								playlist.push({
//   									title: elem.title,
//   									url: elem.stream_url
//   								});
//   							});
//   						} else playlist.push(first);
//   						if (playlist.length > 1) first.playlist = playlist;
//   						Lampa.Player.play(first);
//   						Lampa.Player.playlist(playlist);
//   					} else Lampa.Noty.show(data.title);
//   				} else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
//   			}, function (a, e) {
//   				_this.activity.loader(false);
//   				Lampa.Noty.show(network.errorDecode(a, e));
//   			}, false, {
//   				dataType: 'json'
//   			});
//   		} else if (data && data.match(/magnet|videos|stream\?|mp4|mkv|m3u8/i)) {
//   			if (object.title == 'IPTV') {
//   				Lampa.Activity.push({
//   					url: data + '?' + ForkTV.user_dev,
//   					title: "MODS's TV",
//   					component: 'modss_tv',
//   					page: 1
//   				});
//   			} else {
//   				var subtitles = [];
//   				if (subs) {
//   					subs.forEach(function (e) {
//   						subtitles.push({
//   							label: e[0],
//   							url: e[1]
//   						});
//   					});
//   				}
//   				var playlist = [];
//   				var first = {
//   					title: title,
//   					url: data,
//   					subtitles: subtitles,
//   					timeline: view
//   				};
//   				if (element.length > 1) {
//   					JSON.parse(element).forEach(function (elem) {
//   						if (elem.title.match('Описание|Торрент|Трейлер|Страны|Жанр|Похож|Модел|Студи|Катег|Превь|Тег|Порноз') == null) playlist.push({
//   							title: elem.title,
//   							url: elem.stream_url
//   						});
//   					});
//   				} else playlist.push(first);
//   				if (playlist.length > 1) first.playlist = playlist;
//   				Lampa.Player.play(first);
//   				Lampa.Player.playlist(playlist);
//   			}
//   		} else if (youtube) {
//   			var id = youtube.split('=')[1];
//   			if (Lampa.Platform.is('android')) Lampa.Android.openYoutube(id);
//   			else _this.YouTube(id);
//   		}
//   	};
//   	this.append = function (data) {
//   		var _this3 = this;
//   		var viewed = Lampa.Storage.cache('online_view', 5000, []);
//   		var bg_img = JSON.stringify(data).replace('background-image', 'background_image');
//   		bg_img = JSON.parse(bg_img);
//   		bg_img.background_image && Lampa.Background.immediately(bg_img.background_image);
//   		if (data.channels && data.channels.length == 0) {
//   			Lampa.Noty.show('Ничего не найдено');
//   		} else {
//   			var json = data.channels && data.menu && data.menu.length > 0 && data.menu[0].title != 'Трейлер' && data.next_page_url && data.next_page_url.indexOf('page=1') > -1 ? data.menu.concat(data.channels) : (object.title == 'SerialHD' && data.next_page_url && data.next_page_url.split('page=')[1] != 2) ? data.channels.slice(1) : data.channels;
//   			json = JSON.stringify(json).replace('<br \/>', '<br>').replace(/\)|\(|%20/g, '');
//   			if (data.title == 'HDGO') {
//   					[{
//   					name: 'Быстрый доступ',
//   					id: [0, 1, 2, 3]
//   					}, {
//   					name: 'Фильмы',
//   					id: [4, 14,15,16,17]
//   					}, {
//   					name: 'Сериалы',
//   					id: [5, 18,19,20,21,22]
//   					}, {
//   					name: 'Мультфильмы',
//   					id: [6, 23,24,25]
//   					}, {
//   					name: 'Мультсериалы',
//   					id: [7, 26,27,28,29]
//   					}, {
//   					name: 'Аниме',
//   					id: [8, 30,31,32,33]
//   					}, {
//   					name: 'Тв-Шоу',
//   					id: [9, 34, 35,36]
//   					}, {
//   					name: 'Док. Сериалы',
//   					id: [10, 37,38,39]
//   					}, {
//   					name: 'Док. Фильмы',
//   					id: [11, 40,41]
//   					}].map(function (i) {
//   					_this3.appendHdgo({
//   						title: i.name,
//   						results: JSON.parse(json).filter(function (element, id) {
//   							if (i.id.indexOf(id) > -1) return element;
//   						})
//   					});
//   				});
//   			} else {
//   				var element = JSON.parse(json)[0];
//   				var infos = element.description ? element.description : element.template;
//   				var voic = infos && infos.match(/Озвучка:(.*?)<br/) || infos && infos.match(/Перевод:(.*?)(<br|Разм|Обн|Реж|Вр|Фор)/) || '';
//   				if (element.template && element.template.indexOf('film.') > -1 || element.logo_30x30 && element.logo_30x30.match('mediafil') || element.logo_30x30 && element.logo_30x30.match('folder') && element.playlist_url && element.playlist_url.indexOf('torrstream?magnet') > -1) {
//   					var image = element.before && element.before.indexOf('src') > -1 ? $('img', element.before).attr('src') : element.template && element.template.indexOf('src') > -1 ? $('img', element.template).attr('src') : element.description && element.description.indexOf('src') > -1 ? $('img', element.description).attr('src') : element.logo_30x30 && element.logo_30x30.indexOf('png') > -1 ? element.logo_30x30 : element.details && element.details.poster ? element.details.poster : './img/icons/film.svg';
//   					object.movie = {
//   						img: image,
//   						title: object.title,
//   						original_title: '',
//   						id: 1
//   					};
//   					var files = new Lampa.Files(object);
//   					files.append(scroll.render());
//   					html.append(files.render());
//   					html.find('.selector').unbind('hover:enter').on('hover:enter', function () {
//   						if (element.description || element.template) Lampa.Modal.open({
//   							title: element.title,
//   							size: 'medium',
//   							html: $(element.description ? $(element.description).attr('style', '') : element.template),
//   							onBack: function onBack() {
//   								Lampa.Modal.close();
//   								Lampa.Controller.toggle('content');
//   							}
//   						});
//   					});
//   				}
//   				JSON.parse(json).forEach(function (element) {
//   					var stream = element.stream_url ? element.stream_url : element.playlist_url;
//   					if (element.title.match('Описание|Трейлер') == null) {
//   						if (element.template && element.template.indexOf('film.') > -1 || element.logo_30x30 && element.logo_30x30.match('mediafil') || element.logo_30x30 && element.logo_30x30.match('folder') && element.playlist_url && element.playlist_url.indexOf('torrstream?magnet') > -1) {
//   							body.attr('class', '');
//   							scroll.body().addClass('torrent-list');
//   							element.quality = (voic && voic[0]) || '';
//   							element.info = '';
//   							if (element.logo_30x30 && element.logo_30x30.match(/folder|mediafil/) && stream && stream.match(/torrstream\?magnet|getstream|kinomix/)) {
//   								var des = $(element.template || element.description).text();
//   								var vo = des.match(/Озвучка(.*?)Вид/) || des.match(/Перевод:(.*?)Разм/);
//   								var vid = des.match(/Видео[:](.*?)[|]/) || des.match(/Видео[:](.*?)Длит/) || des.match(/Видео(.*?)$/);
//   								var sed_per = des.match(/Раздают:(.*?)Качают:(.*?)(Обн|Кач|Длит)/) || des.match(/Раздают:(.*?)\s[|]\sКачают:(.*?)(Обн|Кач|Длит)/);
//   								var size1 = des.match(/t\/s(.*?)Озв/) || des.match(/Размер:(.*?)Разд/) || $(element.template || element.description).find('.trt-size').text();
//   								var sizes = size1 && size1[1] || $(element.template || element.description).find('.trt-size').text();
//   								element.quality = '';
//   								if (sed_per || vid || sizes || vo) element.info = (sed_per ? '<b style="color:green">&#8679;' + parseInt(sed_per[1]) + '</b><b style="color:red">&#8659;' + parseInt(sed_per[2]) + '</b> - ' : '') + (vo ? vo[1] + ' / ' : '') + (sizes && ' <b>' + sizes + '</b><br><hr>' || '') + (vid ? vid[0].replace(/Аудио|Звук/, ' | Аудио') : '');
//   							}
//   							var card = Lampa.Template.get('onlines_v1', element);
//   							var hash = Lampa.Utils.hash([element.title, element.ident, stream].join(''));
//   							var view = Lampa.Timeline.view(hash);
//   							var hash_file = Lampa.Utils.hash([element.title, element.ident, stream].join(''));
//   							element.timeline = view;
//   							card.append(Lampa.Timeline.render(view));
//   							if (Lampa.Timeline.details) card.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
//   							if (viewed.indexOf(hash_file) !== -1) card.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
//   						} else {
//   							var image = element.before && element.before.indexOf('src') > -1 ? $('img', element.before).attr('src') : element.template && element.template.indexOf('src') > -1 ? $('img', element.template).attr('src') : element.description && element.description.indexOf('src') > -1 ? $('img', element.description).attr('src') : element.logo_30x30 && element.logo_30x30.indexOf('png') > -1 ? element.logo_30x30 : element.details && element.details.poster ? element.details.poster : './img/icons/film.svg';
//   							if (!element.search_on) {
//   								var time = $($(element.description).children()[0]).parent().text();
//   								time = time.match(/Продолжительность: (.*?)?./i);
//   								time = time && time.shift() + ' - ' || '';
//   								var descr = !element.ident && element.description && $($(element.description).children()[1]) ? $($(element.description).children()[1]).text().slice(0, 130) || $($(element.description).children()[0]).parent().text().slice(0, 130) : '';
//   								var info = element.description ? element.description : element.template;
//   								var voice = info && info.match(/Озвучка[:](.*?)(Субтит|<\/div><\/div>|<br)/) || info && info.match(/Перевод:(.*?)(<br|Разм|Обн|Реж|Вр|Фор)/) || '';
//   								var size = info && info.match(/(Размер|Size):(.*?)<br/) || '';
//   								var qual = info && info.match(/Качество:(.*?)<br/) || '';
//   								var qual2 = qual ? qual[1].split(' ')[1] : voice ? voice[1] && voice[1].split('>')[2].trim().split(/,\s|\s/)[0] : '';
//   								var rating = $(element.template).find('.a-r').text();
//   								var peer = info && info.split(/<br[^>]*>|<\/div>/).find(function (itm) {
//   									if (itm.match(/Качают|Скачивают|Leechers/)) return itm;
//   								});
//   								var seed = info && info.split(/<br[^>]*>|<\/div>/).find(function (itm) {
//   									if (itm.match('Раздают|Seeders')) return itm;
//   								});
//   							}
//   							var card = Lampa.Template.get('card', {
//   								title: element.title || element.details && element.details.name,
//   								release_year: (size && size[0] + ' | ') + voice && voice[1] ? (voice[1].indexOf(',') > -1 ? voice[1].split(',')[0] : voice[1]) : ''
//   							});
//   							if (rating) card.find('.card__view').append('<div class="card__type a-r' + (rating <= 5 ? ' b' : (rating >= 5 && rating <= 7) ? ' de' : ' g') + '" style="background-color: #ff9455;">' + rating + '</div>');
//   							if (qual2) card.find('.card__view').append('<div class="card__quality">' + qual2 + '</div>');
//   							if (seed) card.find('.card__view').append('<div class="card__type" style="background:none;font-size:1em;left:-.2em;top:-.5em"><b style="position:relative ;background: green;color: #fff;" class="card__type">' + parseInt(seed.match(/ \d+/) ? seed.match(/ \d+/)[0] : seed.match(/\d+/)[0]) + '</b><b class="card__type" style="position:relative;background: #ff4242;color: #fff;left:-1em!important;border-bottom-left-radius: 0;border-top-left-radius: 0" class="info_peer">' + parseInt(peer.match(/ \d+/) ? peer.match(/ \d+/)[0] : peer.match(/\d+/)[0]) + '</b></div>');
//   							card.addClass(isNaN(element.ident) && (element.home || typeof element.details != 'undefined' || element.title == 'Все' || element.title.match(/Всі|Обновлен|жанры|сезон|Наше|Зарубеж|Женск|Муж|Отеч|Фил|Сериал|Мул|Худ/g) !== null || element.template && element.template.indexOf('svg') > -1 || element.logo_30x30 && element.logo_30x30.match(/ttv|right|succes|server|info|cloud|translate|error|trailer|uhd|webcam|mediafile|viewed|new|top|country|genre|similarmenu|filter/g) != null || stream && (stream.indexOf('browse') > -1 || stream.indexOf('viewforum') > -1 || stream.indexOf('me/list?actor=') > -1 || stream.indexOf('genre=') > -1) || element.playlist_url && element.playlist_url.indexOf('actor') == -1 && element.playlist_url && element.playlist_url.indexOf('voice?') == -1 && element.playlist_url && element.playlist_url.match(/cat=|page=|year=|list\?direc|genre|list\?actor|country/g) !== null || element.playlist_url && element.playlist_url.indexOf('view?id') == -1 && element.playlist_url && element.playlist_url.indexOf('stream?id') == -1 && element.playlist_url && element.playlist_url.indexOf('details?') == -1 && object.title.indexOf('HDGO') > -1 || element.logo_30x30 && element.logo_30x30.indexOf('webcam') > -1) ? 'card--collection' : 'card--category');
//   							if (!data.landscape && !data.details && ((/iPhone|android/i.test(navigator.userAgent) || Lampa.Platform.is('android')))) card.addClass('mobile');
//   							if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) card.addClass('pc');
//   							if (/Mozilla/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent) || Lampa.Platform.tv()) card.addClass('tv');
//   							if (data.details && !data.details.images && stream && stream.match(/subcategory|submenu|page=|year=|list\?direc|genre|list\?actor|country/g) !== null) card.addClass('mobiles');
//   							if (element.description && element.description.indexOf('linear-gradientto') > -1 || data.landscape || data.next_page_url && data.next_page_url.indexOf('girl') > -1) card.addClass('nuam');
//   							if (data.next_page_url && data.next_page_url.indexOf('girl') > -1 && stream.indexOf('vporn/list?cat')) card.addClass('card--category').removeClass('card--collection');
//   							if (element.logo_30x30 && element.logo_30x30.match(/country|genre|filter|mediafolder/g) != null) card.addClass('hdgo');
//   							if (element.logo_30x30 && element.logo_30x30.match(/\/folder\./g) && stream.match(/stream|magnet|view\?|view=|\/details/g)) card.addClass('mobile card--category').removeClass('card--collection');
//   							if (element.logo_30x30 && element.logo_30x30.indexOf('/folder.') > -1 && stream.match(/view=/g)) card.addClass('card--category hdgo').removeClass('card--collection nuam mobile');
//   							if (element.logo_30x30 && element.logo_30x30.match(/mediafolder/g)) card.addClass('card--category').removeClass('card--collection');
//   							if (bg_img.background_image && bg_img.background_image.indexOf('18') > -1 && ((data.next_page_url && data.next_page_url.indexOf('girl') > -1) && stream.match(/pornst|models/g) !== null)) card.addClass('card--category').removeClass('nuam hdgo mobile card--collection');
//   							if (image && image.indexOf('film.svg') > -1) card.addClass('card--collection nuam');
//   							if (bg_img.background_image && bg_img.background_image.indexOf('18') > -1 && stream.match(/view\?|hdporn|channel=/g)) card.addClass('card--collection').removeClass('nuam hdgo mobile card--category');
//   							if (object.title.match(/Торренты|ForkTV|18\+/g)) card.addClass('home');
//   							if (element.logo_30x30 && element.logo_30x30.match(/country|genre|filter/g)) card.addClass('sort');
//   							if ((stream && stream.match(/filmix\?subcategory|rutor/) || element.submenu && element.submenu[0] && element.submenu[0].playlist_url && element.submenu[0].playlist_url.indexOf('rutor') > -1) && element.logo_30x30 && element.logo_30x30.match(/filter/g)) card.addClass('two');
//   							if (element.title == 'Поиск' && (stream && stream.match(/coldfilm/) || object.title == 'SerialHD')) card.addClass('searc');
//   							var img = card.find('img')[0];
//   							img.onload = function () {
//   								card.addClass('card--loaded');
//   							};
//   							img.onerror = function (e) {
//   								img.src = './img/img_broken.svg';
//   							};
//   							var picture = image && image.indexOf('yandex') > -1 ? 'https://cors.eu.org/' + image : image && image.indexOf('svg') > -1 ? image : image;
//   							img.src = image;
//   						}
//   						//console.log ('class', card[0].className, window.innerWidth)
//   						card.on('hover:focus hover:touch', function () {
//   							if (this.className.indexOf('card--category') > -1) {
//   								if (Lampa.Helper) Lampa.Helper.show('online_file', 'Удерживайте клавишу (ОК) для просмотра описания', card);
//   								//Lampa.Background.immediately(image);
//   							}
//   							last = card[0];
//   							scroll.update(card, true);
//   							var maxrow = Math.ceil(items.length / 7) - 1;
//   							if (Math.ceil(items.indexOf(card) / 7) >= maxrow)
//   								if (data.next_page_url) _this3.next(data.next_page_url);
//   						}).on('hover:enter', function () {
//   							if (stream || data.channels.length > 0) {
//   								if (element.event || (stream && stream.match(/youtube|stream\?|mp4|mkv|m3u8/i))) {
//   									_this3.stream(stream, element.title, element.infolink || element.stream_url, element.subtitles, json, view);
//   									if (viewed.indexOf(hash_file) == -1) {
//   										viewed.push(hash_file);
//   										card.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
//   										Lampa.Storage.set('online_view', viewed);
//   									}
//   								} else if (element.search_on) {
//   									Lampa.Input.edit({
//   										value: element.playlist_url.indexOf('newserv') > -1 && Lampa.Storage.get('server_ip') ? Lampa.Storage.get('server_ip') : '',
//   										free: true
//   									}, function (new_value) {
//   										if (new_value == '') {
//   											Lampa.Controller.toggle('content');
//   											return;
//   										}
//   										if (element.playlist_url.indexOf('newserv') > -1) Lampa.Storage.set('server_ip', new_value);
//   										var query = element.playlist_url.indexOf('newserv') > -1 ? Lampa.Storage.get('server_ip') : new_value;
//   										var u = element.playlist_url && element.playlist_url.indexOf('?') > -1 ? '&' : '/?';
//   										network["native"](element.playlist_url + u + 'search=' + query + '&' + ForkTV.user_dev, function (json) {
//   											if (json.channels && json.channels[0].title.indexOf('по запросу') > -1) {
//   												if (json.channels.length == 0) {
//   													Lampa.Controller.toggle('content');
//   													return;
//   												}
//   												Lampa.Modal.open({
//   													title: '',
//   													size: 'medium',
//   													html: Lampa.Template.get('error', {
//   														title: 'Ошибка',
//   														text: json.channels[0].title
//   													}),
//   													onBack: function onBack() {
//   														Lampa.Modal.close();
//   														Lampa.Controller.toggle('content');
//   													}
//   												});
//   											} else {
//   												Lampa.Activity.push({
//   													title: element.title,
//   													url: json,
//   													submenu: true,
//   													component: 'forktv',
//   													page: 1
//   												});
//   											}
//   										});
//   									});
//   								} else if (stream == '' || image.indexOf('info.png') > -1) {
//   									Lampa.Modal.open({
//   										title: element.title,
//   										size: 'medium',
//   										html: $('<div style="font-size:4vw">' + $(element.description)[0].innerHTML + '</div>'),
//   										onBack: function onBack() {
//   											Lampa.Modal.close();
//   											Lampa.Controller.toggle('content');
//   										}
//   									});
//   								} else if (stream) {
//   									var goto = function goto() {
//   										var title = /*stream == 'submenu' ? element.submenu && element.submenu[0].title : */ element.details && element.details.title ? element.details.title : element.title && element.title.indexOf('l-count') > -1 ? element.title.split(' ').shift() : element.details && element.details.name ? element.details.name : element.title;
//   										//console.log (element.submenu)
//   										var url = stream == 'submenu' ? {
//   											channels: element.submenu
//   										} : stream;
//   										Lampa.Activity.push({
//   											title: title,
//   											url: url,
//   											submenu: stream == 'submenu',
//   											component: 'forktv',
//   											page: 1
//   										});
//   									};
//   									if (element.title == '18+' && Lampa.Storage.get('mods_password')) {
//   										Lampa.Input.edit({
//   											value: "",
//   											title: "Введите пароль доступа",
//   											free: true,
//   											nosave: true
//   										}, function (t) {
//   											if (Lampa.Storage.field('mods_password') == t) goto();
//   											else {
//   												Lampa.Noty.show('Неверный пароль.');
//   												Lampa.Controller.toggle('content');
//   											}
//   										});
//   									} else goto();
//   								} else if (element.description && element.description.indexOf('доступа') > -1) {
//   									ForkTV.checkAdd('content');
//   								}
//   							}
//   						}).on('hover:long', function () {
//   							if (stream && stream.match('bonga|chatur|rgfoot') == null && stream.match(/stream\?|mp4|mkv|m3u8/i)) {
//   								_this3.contextmenu({
//   									item: card,
//   									view: view,
//   									viewed: viewed,
//   									hash_file: hash_file,
//   									file: stream
//   								});
//   							}
//   							if ((element.template || element.description) && stream && stream.match('torrstream|getstream|mp4|kinomix') == null && stream.match(/viewtube|details|season|view\?|voice|magnet|stream\?id|mp4|m3u8/i) && (element.description || element.template)) {
//   								Lampa.Modal.open({
//   									title: element.title,
//   									size: 'medium',
//   									html: $(element.description ? $(element.description).attr('style', '') : element.template),
//   									onBack: function onBack() {
//   										Lampa.Modal.close();
//   										Lampa.Controller.toggle('content');
//   									}
//   								});
//   							}
//   						});
//   						body.append(card);
//   						items.push(card);
//   					}
//   				});
//   			}
//   		}
//   	};
//   	this.build = function (data) {
//   		if (data.channels && data.channels.length) {
//   			scroll.minus();
//   			html.append(scroll.render());
//   			this.append(data);
//   			scroll.append(body);
//   			this.activity.toggle();
//   		} else {
//   			this.activity.toggle();
//   			html.append(scroll.render());
//   			this.empty();
//   		}
//   		this.activity.loader(false);
//   	};
//   	this.createHdGO = function (data) {
//   		var content = Lampa.Template.get('items_line', {
//   			title: data.title
//   		});
//   		var body = content.find('.items-line__body');
//   		var scroll = new Lampa.Scroll({
//   			horizontal: true,
//   			step: 300
//   		});
//   		var items = [];
//   		var active = 0;
//   		var last;
//   		this.create = function () {
//   			scroll.render().find('.scroll__body').addClass('items-cards');
//   			content.find('.items-line__title').text(data.title);
//   			data.results.forEach(this.append.bind(this));
//   			body.append(scroll.render());
//   		};
//   		this.item = function (data) {
//   			var item = Lampa.Template.get('hdgo_item', {
//   				title: data.title
//   			});
//   			if (/iPhone|x11|nt|Mozilla/i.test(navigator.userAgent) || Lampa.Platform.tv()) item.addClass('card--collection').find('.card__age').remove();
//   			if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) item.addClass('hdgo pc');
//   			if (Lampa.Platform.tv()) item.addClass('hdgo tv');
//   			var logo = data.logo_30x30 ? data.logo_30x30 : data.template && data.template.indexOf('src') > -1 ? $('img', data.template).attr('src') : 'img/actor.svg';
//   			var img = item.find('img')[0];
//   			img.onerror = function () {
//   				img.src = './img/img_broken.svg';
//   			};
//   			img.src = logo;
//   			this.render = function () {
//   				return item;
//   			};
//   			this.destroy = function () {
//   				img.onerror = function () {};
//   				img.onload = function () {};
//   				img.src = '';
//   				item.remove();
//   			};
//   		};
//   		this.append = function (element) {
//   			var _this = this;
//   			var item$1 = new _this.item(element);
//   			item$1.render().on('hover:focus hover:touch', function () {
//   				scroll.render().find('.last--focus').removeClass('last--focus');
//   		    item$1.render().addClass('last--focus');

//   				last = item$1.render()[0];
//   				active = items.indexOf(item$1);
//   				scroll.update(items[active].render(), true);
//   			}).on('hover:enter', function () {
//   				if (element.search_on) {
//   					Lampa.Input.edit({
//   						value: '',
//   						free: true
//   					}, function (new_value) {
//   						var query = new_value;
//   						var u = element.playlist_url && element.playlist_url.indexOf('?') > -1 ? '&' : '/?';
//   						network["native"](element.playlist_url + u + 'search=' + query + '&' + ForkTV.user_dev, function (json) {
//   							if (json.channels[0].title.indexOf('Нет результатов') == -1) {
//   								Lampa.Activity.push({
//   									title: element.title,
//   									url: json,
//   									submenu: true,
//   									component: 'forktv',
//   									page: 1
//   								});
//   							} else {
//   								Lampa.Modal.open({
//   									title: '',
//   									size: 'medium',
//   									html: Lampa.Template.get('error', {
//   										title: 'Ошибка',
//   										text: json.channels[0].title
//   									}),
//   									onBack: function onBack() {
//   										Lampa.Modal.close();
//   										Lampa.Controller.toggle('content');
//   									}
//   								});
//   							}
//   						});
//   					});
//   				} else {
//   					Lampa.Activity.push({
//   						title: element.title,
//   						url: element.playlist_url,
//   						submenu: false,
//   						component: 'forktv',
//   						page: 1
//   					});
//   				}
//   			});
//   			scroll.append(item$1.render());
//   			items.push(item$1);
//   		};
//   		this.toggle = function () {
//   			var _this = this;
//   			Lampa.Controller.add('hdgo_line', {
//   				toggle: function toggle() {
//   					Lampa.Controller.collectionSet(scroll.render());
//   					Lampa.Controller.collectionFocus(last || false, scroll.render());
//   				},
//   				right: function right() {
//   					Navigator.move('right');
//   					Lampa.Controller.enable('hdgo_line');
//   				},
//   				left: function left() {
//   					if (Navigator.canmove('left')) Navigator.move('left');
//   					else if (_this.onLeft) _this.onLeft();
//   					else Lampa.Controller.toggle('menu');
//   				},
//   				down: this.onDown,
//   				up: this.onUp,
//   				gone: function gone() {},
//   				back: this.onBack
//   			});
//   			Lampa.Controller.toggle('hdgo_line');
//   		};
//   		this.render = function () {
//   			return content;
//   		};
//   		this.destroy = function () {
//   			Lampa.Arrays.destroy(items);
//   			scroll.destroy();
//   			content.remove();
//   			items = null;
//   		};
//   	};
//   	this.appendHdgo = function (data) {
//   		var _this = this;
//   		var item = new _this.createHdGO(data);
//   		item.create();
//   		item.onDown = this.down.bind(this);
//   		item.onUp = this.up.bind(this);
//   		item.onBack = this.back.bind(this);
//   		scroll.append(item.render());
//   		items.push(item);
//   	};
//   	this.YouTube = function (id) {
//   		var player, html$7, timer$1;
  
//   		function create$f(id) {
//   			html$7 = $('<div class="youtube-player"><div id="youtube-player"></div><div id="youtube-player__progress" class="youtube-player__progress"></div></div>');
//   			$('body').append(html$7);
//   			player = new YT.Player('youtube-player', {
//   				height: window.innerHeight,
//   				width: window.innerWidth,
//   				playerVars: {
//   					'controls': 0,
//   					'showinfo': 0,
//   					'autohide': 1,
//   					'modestbranding': 1,
//   					'autoplay': 1
//   				},
//   				videoId: id,
//   				events: {
//   					onReady: function onReady(event) {
//   						event.target.playVideo();
//   						update$2();
//   					},
//   					onStateChange: function onStateChange(state) {
//   						if (state.data == 0) {
//   							Lampa.Controller.toggle('content');
//   						}
//   					}
//   				}
//   			});
//   		}
  
//   		function update$2() {
//   			timer$1 = setTimeout(function () {
//   				var progress = player.getCurrentTime() / player.getDuration() * 100;
//   				$('#youtube-player__progress').css('width', progress + '%');
//   				update$2();
//   			}, 400);
//   		}
  
//   		function play(id) {
//   			create$f(id);
//   			Lampa.Controller.add('youtube', {
//   				invisible: true,
//   				toggle: function toggle() {},
//   				right: function right() {
//   					player.seekTo(player.getCurrentTime() + 10, true);
//   				},
//   				left: function left() {
//   					player.seekTo(player.getCurrentTime() - 10, true);
//   				},
//   				enter: function enter() {},
//   				gone: function gone() {
//   					destroy$2();
//   				},
//   				back: function back() {
//   					Lampa.Controller.toggle('content');
//   				}
//   			});
//   			Lampa.Controller.toggle('youtube');
//   		}
  
//   		function destroy$2() {
//   			clearTimeout(timer$1);
//   			player.destroy();
//   			html$7.remove();
//   			html$7 = null;
//   		}
//   		play(id);
//   	};
//   	this.contextmenu = function (params) {
//   		var _this = this;
//   		contextmenu_all.push(params);
//   		var enabled = Lampa.Controller.enabled().name;
//   		var menu = [{
//   			title: Lampa.Lang.translate('torrent_parser_label_title'),
//   			mark: true
//   			}, {
//   			title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
//   			clearmark: true
//   			}, {
//   			title: Lampa.Lang.translate('online_title_clear_all_mark'),
//   			clearmark_all: true
//   			}, {
//   			title: Lampa.Lang.translate('time_reset'),
//   			timeclear: true
//   			}, {
//   			title: Lampa.Lang.translate('online_title_clear_all_timecode'),
//   			timeclear_all: true
//   			}, {
//   			title: Lampa.Lang.translate('copy_link'),
//   			copylink: true
//   			}];
//   		if (Lampa.Platform.is('webos')) {
//   			menu.push({
//   				title: Lampa.Lang.translate('player_lauch') + ' - Webos',
//   				player: 'webos'
//   			});
//   		}
//   		if (Lampa.Platform.is('android')) {
//   			menu.push({
//   				title: Lampa.Lang.translate('player_lauch') + ' - Android',
//   				player: 'android'
//   			});
//   		}
//   		menu.push({
//   			title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
//   			player: 'lampa'
//   		});
//   		Lampa.Select.show({
//   			title: Lampa.Lang.translate('title_action'),
//   			items: menu,
//   			onBack: function onBack() {
//   				Lampa.Controller.toggle(enabled);
//   			},
//   			onSelect: function onSelect(a) {
//   				if (a.clearmark) {
//   					Lampa.Arrays.remove(params.viewed, params.hash_file);
//   					Lampa.Storage.set('online_view', params.viewed);
//   					params.item.find('.torrent-item__viewed').remove();
//   				}
//   				if (a.clearmark_all) {
//   					contextmenu_all.forEach(function (params) {
//   						Lampa.Arrays.remove(params.viewed, params.hash_file);
//   						Lampa.Storage.set('online_view', params.viewed);
//   						params.item.find('.torrent-item__viewed').remove();
//   					});
//   				}
//   				if (a.mark) {
//   					if (params.viewed.indexOf(params.hash_file) == -1) {
//   						params.viewed.push(params.hash_file);
//   						params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
//   						Lampa.Storage.set('online_view', params.viewed);
//   					}
//   				}
//   				if (a.timeclear) {
//   					params.view.percent = 0;
//   					params.view.time = 0;
//   					params.view.duration = 0;
//   					Lampa.Timeline.update(params.view);
//   					Lampa.Arrays.remove(params.viewed, params.hash_file);
//   					params.item.find('.torrent-item__viewed').remove();
//   					Lampa.Storage.set('online_view', params.viewed);
//   				}
//   				if (a.timeclear_all) {
//   					contextmenu_all.forEach(function (params) {
//   						params.view.percent = 0;
//   						params.view.time = 0;
//   						params.view.duration = 0;
//   						Lampa.Timeline.update(params.view);
//   						Lampa.Arrays.remove(params.viewed, params.hash_file);
//   						params.item.find('.torrent-item__viewed').remove();
//   						Lampa.Storage.set('online_view', params.viewed);
//   					});
//   				}
//   				Lampa.Controller.toggle(enabled);
//   				if (a.player) {
//   					Lampa.Player.runas(a.player);
//   					params.item.trigger('hover:enter');
//   				}
//   				if (a.copylink) {
//   					Lampa.Utils.copyTextToClipboard(params.file, function () {
//   						Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
//   					}, function () {
//   						Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
//   					});
//   				}
//   			}
//   		});
//   	};
//   	this.empty = function () {
//   		var empty = new Lampa.Empty();
//   		scroll.append(empty.render());
//   		this.start = empty.start;
//   		this.activity.loader(false);
//   		this.activity.toggle();
//   	};
//   	this.start = function () {
//   		Lampa.Controller.add('content', {
//   			toggle: function toggle() {
//   				if (object.title == 'HDGO' && items.length) {
//   					items[active].toggle();
//   				} else {
//   					Lampa.Controller.collectionSet(scroll.render(), html);
//   					Lampa.Controller.collectionFocus(last || false, scroll.render());
//   				}
//   			},
//   			left: function left() {
//   				if (Navigator.canmove('left')) {
//   					Navigator.move('left');
//   				} else Lampa.Controller.toggle('menu');
//   			},
//   			right: function right() {
//   				Navigator.move('right');
//   			},
//   			up: function up() {
//   				if (Navigator.canmove('up')) Navigator.move('up');
//   				else Lampa.Controller.toggle('head');
//   			},
//   			down: function down() {
//   				if (Navigator.canmove('down')) Navigator.move('down');
//   			},
//   			back: this.back
//   		});
//   		Lampa.Controller.toggle('content');
//   	};
//   	this.down = function () {
//   		active++;
//   		active = Math.min(active, items.length - 1);
//   		items[active].toggle();
//   		scroll.update(items[active].render());
//   	};
//   	this.up = function () {
//   		active--;
//   		if (active < 0) {
//   			active = 0;
//   			Lampa.Controller.toggle('head');
//   		} else {
//   			items[active].toggle();
//   		}
//   		scroll.update(items[active].render());
//   	};
//   	this.back = function () {
//   		Lampa.Activity.backward();
//   	};
//   	this.pause = function () {};
//   	this.stop = function () {};
//   	this.render = function () {
//   		return html;
//   	};
//   	this.destroy = function () {
//   		network.clear();
//   		scroll.destroy();
//   		html.remove();
//   		body.remove();
//   		network = null;
//   		items = null;
//   		html = null;
//   		body = null;
//   	};
//   }
  
//   function collection(object) {
//   	var network = new Lampa.Reguest();
//   	var scroll = new Lampa.Scroll({
//   		mask: true,
//   		over: true,
//   		step: 250
//   	});
//   	var items = [];
//   	var html = $('<div></div>');
//   	var body = $('<div class="category-full"></div>');
//   	var cors = object.sour == 'rezka' || object.sourc == 'rezka' ? Lampa.Utils.protocol() + 'prox.lampa.stream/' : object.sour == 'filmix' || object.sourc == 'filmix' ? 'http://corsanywhere.herokuapp.com/' : '';
//   	var cache = Lampa.Storage.cache('my_col', 5000, {});
//   	var info;
//   	var last;
//   	var waitload = false;
//   	var relises = [];
//   	var total_pages;
//   	var _this1 = this;
//   	this.create = function () {
//   		var _this = this;
//   		var url;
//   		if (object.sourc == 'my_coll') {
//   			_this.build({
//   				card: cache
//   			});
//   		} else {
//   			if (object.card && isNaN(object.id)) url = object.id;
//   			else if (object.sourc == 'pub') {
//   				if (object.search) url = object.url + '?title=' + object.search + '&sort=views-&access_token=' + Pub.token;
//   				else url = object.url + '?sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
//   			} else if (object.sourc == 'rezka') url = object.url + '?filter=last';
// 				else url = object.url;
				
//   			if ((object.page == 1 && object.card_cat) || object.cards || (!object.card && !Lampa.Storage.field('light_version') && object.card_cat)) {
//   				this.activity.loader(true);
//   				network.silent(cors + url, function (str) {
//   					var data = _this.card(str);
//   					_this.build(data);
//   					if (object.card) $('.head__title').append(' - ' + data.card.length);
//   				}, function (a, c) {
//   					_this.empty(network.errorDecode(a, c));
//   				}, false, {
//   					dataType: 'text'
//   				});
//   			} else _this.build(object.data);
//   		}
//   		return this.render();
//   	};
//   	this.next = function (page) {
//   		var _this2 = this;
//   		var url;
//   		if (total_pages == 0 || total_pages == page) waitload = true;
//   		if (waitload) return;
//   		waitload = true;
//   		object.page++;
//   		network.clear();
//   		network.timeout(1000 * 40);
//   		if (typeof page == 'undefined') return;
//   		if (object.sourc == 'pub') url = object.url + '?page=' + object.page + '&sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
//   		else url = page.replace(/(\d+)\/\?filter/,object.page+'/?filter');
//   		network.silent(cors + url, function (result) {
//   			var data = _this2.card(result);
//   			object.data = data;
//   			_this2.append(data, true);
//   			if (data.card.length) waitload = false;
//   			//Lampa.Controller.toggle('content');
//   			_this2.activity.loader(false);
//   		}, function (a, c) {
//   			Lampa.Noty.show(network.errorDecode(a, c));
//   		}, false, {
//   			dataType: 'text'
//   		});
//   	};
//   	this.append = function (data, append) {
//   		var _this1 = this;
//   		var datas = Lampa.Arrays.isArray(data.card) ? data.card : Lampa.Arrays.getValues(data.card).reverse();
//   		datas.forEach(function (element) {
//   			var card = new Lampa.Card(element, {
//   				card_category: object.sourc == 'my_coll' || object.sourc == 'pub' || object.sourc == 'filmix' || !object.card_cat || object.cards ? true : false,
//   				card_collection: object.sourc == 'my_coll' || object.sourc == 'pub' || object.sourc == 'filmix' || !object.card_cat || object.cards ? false : true,
//   				object: object
//   			});
//   			card.create();
//   			if(object.category && (element.watch || element.quantity)) card.render().find('.card__view').append('<div style="background-color: rgba(0,0,0, 0.7);padding:.5em;position:absolute;border-radius:.3em;right:3;bottom:3">' + (element.watch || element.quantity) + '</div>');
//   			card.onFocus = function (target, card_data) {
//   				last = target;
//   				scroll.update(card.render(), true);
//   				Lampa.Background.change(card_data.img);
//   				if (scroll.isEnd()) _this1.next(data.page);
//   				if (!Lampa.Platform.tv() || !Lampa.Storage.field('light_version')) {
//   					var maxrow = Math.ceil(items.length / 7) - 1;
//   					//if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this1.next(data.page);
//   				}
//   			};
//   			card.onEnter = function (target, card_data) {
//   				last = target;
//   				if (object.sour == 'rezka' || object.sour == 'filmix' || (Lampa.Storage.field('light_version') && !object.cards) && !object.card_cat || object.cards) {
//   					Lampa.Api.search({
//   						query: encodeURIComponent(element.title_org)
//   					}, function (find) {
//   						var finded = _this1.finds(element, find);
//   						if (finded) {
//   							Lampa.Activity.push({
//   								url: '',
//   								component: 'full',
//   								id: finded.id,
//   								method: finded.name ? 'tv' : 'movie',
//   								card: finded
//   							});
//   						} else {
//   							Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
//   							Lampa.Controller.toggle('content');
//   						}
//   					}, function () {
//   						Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
//   						Lampa.Controller.toggle('content');
//   					});
//   				} else if (object.sourc == 'pub' || object.sourc == 'my_coll') {
//   					Lampa.Activity.push({
//   						title: element.title,
//   						url: object.url + '/view?id=' + (object.sourc == 'my_coll' ? element.id : element.url) + '&access_token=' + Pub.token,
//   						sourc: 'pub',
//   						sour: element.source,
//   						source: 'pub',
//   						id: element.url,
//   						card: element,
//   						card_cat: true,
//   						component: !object.category ? 'full' : 'collection',
//   						page: 1
//   					});
//   				} else {
//   					Lampa.Activity.push({
//   						title: element.title,
//   						url: element.url,
//   						component: 'collection',
//   						cards: true,
//   						sourc: object.sourc,
//   						source: object.source,
//   						page: 1
//   					});
//   				}
//   			};
//   			card.onMenu = function (target, data) {
//   				var _this2 = this;
//   				var enabled = Lampa.Controller.enabled().name;
//   				var status = Lampa.Favorite.check(data);
//   				var items = [];
//   				if (object.category) {
//   					items.push({
//   						title: cache['id_' + data.id] ? Lampa.Lang.translate('card_my_clear') : Lampa.Lang.translate('card_my_add'),
//   						subtitle: Lampa.Lang.translate('card_my_descr'),
//   						where: 'book'
//   					});
//   				} else {
//   					items.push({
//   						title: status.book ? Lampa.Lang.translate('card_book_remove') : Lampa.Lang.translate('card_book_add'),
//   						subtitle: Lampa.Lang.translate('card_book_descr'),
//   						where: 'book'
//   					}, {
//   						title: status.like ? Lampa.Lang.translate('card_like_remove') : Lampa.Lang.translate('card_like_add'),
//   						subtitle: Lampa.Lang.translate('card_like_descr'),
//   						where: 'like'
//   					}, {
//   						title: status.wath ? Lampa.Lang.translate('card_wath_remove') : Lampa.Lang.translate('card_wath_add'),
//   						subtitle: Lampa.Lang.translate('card_wath_descr'),
//   						where: 'wath'
//   					}, {
//   						title: status.history ? Lampa.Lang.translate('card_history_remove') : Lampa.Lang.translate('card_history_add'),
//   						subtitle: Lampa.Lang.translate('card_history_descr'),
//   						where: 'history'
//   					});
//   				}
//   				if (object.sourc == 'my_coll') {
//   					items.push({
//   						title: Lampa.Lang.translate('card_my_clear_all'),
//   						subtitle: Lampa.Lang.translate('card_my_clear_all_descr'),
//   						where: 'clear'
//   					});
//   				}
//   				Lampa.Select.show({
//   					title: Lampa.Lang.translate('title_action'),
//   					items: items,
//   					onBack: function onBack() {
//   						Lampa.Controller.toggle(enabled);
//   					},
//   					onSelect: function onSelect(a) {
//   						if (a.where == 'clear') {
//   							Lampa.Storage.set('my_col', '');
//   							Lampa.Activity.push({
//   								url: object.url,
//   								sourc: object.sourc,
//   								source: object.source,
//   								title: object.title,
//   								card_cat: true,
//   								category: true,
//   								component: 'collection',
//   								page: 1
//   							});
//   							Lampa.Noty.show(Lampa.Lang.translate('saved_collections_clears'));
//   						} else if (object.category) {
//   							data.source = object.sourc;
//   							_this1.favorite(data, card.render());
//   						} else {
//   							if (object.sour == 'filmix' || object.sour == 'rezka' || object.sourc == 'rezka' || object.sourc == 'filmix') {
//   								Lampa.Api.search({
//   									query: encodeURIComponent(data.title_org)
//   								}, function (find) {
//   									var finded = _this1.finds(data, find);
//   									if (finded) {
//   										finded.url = (finded.name ? 'tv' : 'movie') + '/' + finded.id;
//   										Lampa.Favorite.toggle(a.where, finded);
//   									} else {
//   										Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
//   										Lampa.Controller.toggle('content');
//   									}
//   								}, function () {
//   									Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
//   									Lampa.Controller.toggle('content');
//   								});
//   							} else {
//   								data.source = object.source;
//   								Lampa.Favorite.toggle(a.where, data);
//   							}
//   							_this2.favorite();
//   						}
//   						Lampa.Controller.toggle(enabled);
//   					}
//   				});
//   			};
//   			card.visible();
//   			body.append(card.render());
//   			if (cache['id_' + element.id]) _this1.addicon('book', card.render());
//   			if (append) Lampa.Controller.collectionAppend(card.render());
//   			items.push(card);
//   		});
//   	};
//   	this.addicon = function (name, card) {
//   		card.find('.card__icons-inner').append('<div class="card__icon icon--' + name + '"></div>');
//   	};
//   	this.favorite = function (data, card) {
//   		var _this = this;
//   		if (!cache['id_' + data.id]) {
//   			cache['id_' + data.id] = data;
//   			Lampa.Storage.set('my_col', cache);
//   		} else {
//   			delete cache['id_' + data.id];
//   			Lampa.Storage.set('my_col', cache);
//   			Lampa.Activity.push({
//   				url: object.url,
//   				sourc: object.sourc,
//   				source: object.source,
//   				title: object.title,
//   				card_cat: true,
//   				category: true,
//   				component: 'collection',
//   				page: 1
//   			});
//   		}
//   		card.find('.card__icon').remove();
//   		if (cache['id_' + data.id]) _this.addicon('book', card);
//   	};
//   	this.build = function (data) {
//   		var _this1 = this;
//   		if (data.card.length || Lampa.Arrays.getKeys(data.card).length) {
//   			Lampa.Template.add('info_coll', Lampa.Lang.translate('<div class="info layer--width" style="height:6.2em"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div><div class="full-start__button selector view--category"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="currentColor" d="M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848S326.847,409.323,225.474,409.323z"/><path fill="currentColor" d="M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z"/></svg>   <span>#{pub_search_coll}</span> </div></div><div class="info__right">  <div class="full-start__button selector view--filter"><svg style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="info"/><g id="icons"><g id="menu"><path d="M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z" fill="currentColor"/><path d="M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z" fill="currentColor"/><path d="M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z" fill="currentColor"/></g></g></svg>  <span>#{title_filter}</span></div></div></div>'));
//   			info = Lampa.Template.get('info_coll');
//   			info.find('.view--category').on('hover:enter hover:click', function () {
//   				Lampa.Input.edit({
//   					value: '',
//   					free: true
//   				}, function (name) {
//   					if (name == '') {
//   						Lampa.Controller.toggle('content');
//   						return;
//   					}
//   					Lampa.Activity.push({
//   						title: 'Поиск по - ' + name,
//   						url: Pub.baseurl + 'v1/collections',
//   						component: 'collection',
//   						search: name,
//   						card_cat: true,
//   						category: true,
//   						sourc: 'pub',
//   						source: 'pub',
//   						page: 1
//   					});
//   				});
//   			});
//   			info.find('.view--filter').on('hover:enter hover:click', function () {
//   				var enabled = Lampa.Controller.enabled().name;
//   				var items = [{
//   					title: Lampa.Lang.translate('pub_sort_views'),
//   					id: 'views-'
//   				}, {
//   					title: Lampa.Lang.translate('pub_sort_watchers'),
//   					id: 'watchers-'
//   				}, {
//   					title: Lampa.Lang.translate('pub_sort_updated'),
//   					id: 'updated-'
//   				}, {
//   					title: Lampa.Lang.translate('pub_sort_created'),
//   					id: 'created-'
//   				}].filter(function (el, i) {
//   					if (object.sort == el.id) el.selected = true;
//   					return el;
//   				});
//   				Lampa.Select.show({
//   					title: Lampa.Lang.translate('title_filter'),
//   					items: items,
//   					onBack: function onBack() {
//   						Lampa.Controller.toggle(enabled);
//   					},
//   					onSelect: function onSelect(a) {
//   						Lampa.Activity.push({
//   							title: Lampa.Lang.translate('title_filter') + ' ' + a.title.toLowerCase(),
//   							url: Pub.baseurl + 'v1/collections',
//   							component: 'collection',
//   							sort: a.id,
//   							card_cat: true,
//   							category: true,
//   							sourc: 'pub',
//   							source: 'pub',
//   							page: 1
//   						});
//   					}
//   				});
//   			});
//   			scroll.render().addClass('layer--wheight').data('mheight', info);
//   			if (object.sourc == 'pub' && object.category) html.append(info);
//   			html.append(scroll.render());
//   			scroll.onEnd = function(){
//   			  _this1.next(data.page);
//   			}
//   			this.append(data);
  	
//   		//	if (Lampa.Platform.tv() && Lampa.Storage.field('light_version')) this.more(data);
//   			scroll.append(body);
//   			this.activity.loader(false);
//   			this.activity.toggle();
//   		} else {
//   			html.append(scroll.render());
//   			this.empty(object.search ? Lampa.Lang.translate('online_query_start') + ' (' + object.search + ') ' + Lampa.Lang.translate('online_query_end') : '');
//   		}
//   	};
//   	this.empty = function (msg) {
//   		var empty = msg == undefined ? new Lampa.Empty() : new Lampa.Empty({
//   		  title: '',
//   			descr: msg
//   		});
//   		html.append(empty.render());
//   		_this1.start = empty.start;
//   		_this1.activity.loader(false);
//   		_this1.activity.toggle();
//   	};
//   	this.more = function (data) {
//   		var _this = this;
//   	//	var more = $('<div class="category-full__more selector"><span>' + Lampa.Lang.translate('show_more') + '</span></div>');
//   	//	more.on('hover:focus hover:touch', function (e) {
//   			Lampa.Controller.collectionFocus(last || false, scroll.render());
//   			var next = Lampa.Arrays.clone(object);
//   			if (data.total_pages == 0 || data.total_pages == undefined) {
//   				more.remove();
//   				return;
//   			}
//   			network.clear();
//   			network.timeout(1000 * 20);
//   			var url;
//   			if (object.sourc == 'pub') url = object.url + '?page=' + data.page + '&sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
//   			else url = data.page;
//   			network.silent(cors + url, function (result) {
//   				var card = _this.card(result);
//   				next.data = card;
//   				if (object.cards) next.cards = false;
//   				delete next.activity;
//   				next.page++;
//   				if (card.card.length == 0) more.remove();
//   				else Lampa.Activity.push(next);
//   			}, function (a, c) {
//   				Lampa.Noty.show(network.errorDecode(a, c));
//   			}, false, {
//   				dataType: 'text'
//   			});
//   	//	});
//   		body.append(more);
//   	};
//   	this.back = function () {
//   		last = items[0].render()[0];
//   		var more = $('<div class="selector" style="width: 100%; height: 5px"></div>');
//   		more.on('hover:focus', function (e) {
//   			if (object.page > 1) {
//   				Lampa.Activity.backward();
//   			} else {
//   				Lampa.Controller.toggle('head');
//   			}
//   		});
//   		body.prepend(more);
//   	};
//   	this.card = function (str) {
//   		var card = [];
//   		var page;
//   		if (object.sourc != 'pub') str = str.replace(/\n/g, '');
//   		if (object.card && object.card.source == 'rezka' || object.sourc == 'rezka') {
//   			var h = $('.b-content__inline_item', str).length ? $('.b-content__inline_item', str) : $('.b-content__collections_item', str);
//   			total_pages = $('.b-navigation', str).find('a:last-child').length;
//   			page = $('.b-navigation', str).find('a:last-child').attr('href');
//   			$(h).each(function (i, html) {
//   				card.push({
//   					id: $('a', html).attr('href').split('-')[0].split('/').pop(),
//   					title: $('a:eq(1)', html).text().split(' / ').shift() || $('.title', html).text(),
//   					title_org: $('a:eq(1)', html).text().split(' / ').shift(),
//   					url: $('a', html).attr('href'),
//   					img: $('img', html).attr('src'),
//   					quantity: $('.num', html).text() + ' видео',
//   					year: $('div:eq(2)', html).text().split(' - ').shift()
//   				});
//   			});
//   		} else if (object.card && object.card.source == 'filmix' || object.sourc == 'filmix') {
//   			var d = $('.playlist-articles', str);
//   			var str = d.length ? d.html() : $('.m-list-movie', str).html();
//   			$(str).each(function (i, html) {
//   				if (html.tagName == 'DIV') {
//   					page = $(html).find('.next').attr('href');
//   					total_pages = $(html).find('a:last-child').length;
//   				}
//   				if (html.tagName == 'ARTICLE') card.push({
//   					id: $('a', html).attr('href').split('-')[0].split('/').pop(),
//   					title: $('.m-movie-title', html).text() || ($('.poster', html).attr('alt') && $('.poster', html).attr('alt').split(',').shift()),
//   					title_org: $('.m-movie-original', html).text() || $('.origin-name', html).text(),
//   					url: $('a', html).attr('href'),
//   					img: $('img', html).attr('src'),
//   					quantity: $('.m-movie-quantity', html).text() || $('.count', html).text(),
//   					year: $('.grid-item', html).text() || ($('.poster', html).attr('alt') && $('.poster', html).attr('alt').split(',').pop())
//   				});
//   			});
//   		} else if (object.card && object.card.source == 'pub' || object.sourc == 'pub') {
//   			str = JSON.parse(str);
//   			if (str.pagination) {
//   				total_pages = str.pagination.total + 1;
//   				page = str.pagination.current + 1;
//   			}
//   			if (str.items) str.items.forEach(function (element) {
//   				card.push({
//   					url: element.id,
//   					id: element.id,
//   					watch: element.views + '/' + element.watchers,
//   					title: element.title.split('/')[0],
//   					original_title: element.title.split('/')[1] || element.title,
//   					release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
//   					first_air_date: element.type && (element.type.match('serial|docuserial|tvshow') ? 'tv' : '') || '',
//   					vote_average: element.imdb_rating || 0,
//   					img: element.posters.big,
//   					year: element.year,
//   					years: element.years
//   				});
//   			});
//   		}
//   		return {
//   			card: card,
//   			page: page,
//   			total_pages: total_pages
//   		};
//   	};
//   	this.finds = function (element, find) {
//   		var finded;
//   		var filtred = function filtred(items) {
//   			for (var i = 0; i < items.length; i++) {
//   				var item = items[i];
//   				if ((element.title_org == (item.original_title || item.original_name) || element.title == (item.title || item.name)) && (item.first_air_date || item.release_date) && parseInt(element.year) == (item.first_air_date || item.release_date).split('-').shift()) {
//   					finded = item;
//   					break;
//   				}
//   			}
//   		};
//   		if (find.movie && find.movie.results.length) filtred(find.movie.results);
//   		if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
//   		return finded;
//   	};
//   	this.start = function () {
//   		Lampa.Controller.add('content', {
//   			toggle: function toggle() {
//   				Lampa.Controller.collectionSet(scroll.render(), info);
//   				Lampa.Controller.collectionFocus(last || false, scroll.render());
//   			},
//   			left: function left() {
//   				if (Navigator.canmove('left')) Navigator.move('left');
//   				else Lampa.Controller.toggle('menu');
//   			},
//   			right: function right() {
//   				Navigator.move('right');
//   			},
//   			up: function up() {
//   				if (Navigator.canmove('up')) Navigator.move('up');
//   				else Lampa.Controller.toggle('head');
//   			},
//   			down: function down() {
//   				if (Navigator.canmove('down')) Navigator.move('down');
//   			},
//   			back: function back() {
//   				Lampa.Activity.backward();
//   			}
//   		});
//   		Lampa.Controller.toggle('content');
//   	};
//   	this.pause = function () {};
//   	this.stop = function () {};
//   	this.render = function () {
//   		return html;
//   	};
//   	this.destroy = function () {
//   		network.clear();
//   		Lampa.Arrays.destroy(items);
//   		scroll.destroy();
//   		html.remove();
//   		body.remove();
//   		network = null;
//   		items = null;
//   		html = null;
//   		body = null;
//   		info = null;
//   	};
//   }
  
//   function Radio_n(object) {
//   	var audio = new Audio();
//   	var network = new Lampa.Reguest();
//   	var scroll = new Lampa.Scroll({
//   		mask: true,
//   		over: true,
//   		step: 250
//   	});
//   	var items = [];
//   	var html = $('<div></div>');
//   	var body = $('<div class="Radio_n category-full"></div>');
//   	var info;
//   	var last;
//   	var song;
//   	var playing = false;
//   	this.create = function () {
//   		var _this = this;
//   		this.activity.loader(true);
//   		network.silent(object.url.replace('api.',''), this.build.bind(this), function () {
//   			var empty = new Lampa.Empty();
//   			html.append(empty.render());
//   			_this.start = empty.start;
//   			_this.activity.loader(false);
//   			_this.activity.toggle();
//   		});
//   		return this.render();
//   	};
//   	this.append = function (data) {
//   		var _this3 = this;
//   		var name = null;
//   		var playlist = [];
//   		data.forEach(function (element) {
//   			var url_song = element.video;
//   			var name_song = element.name;
//   			if (name == null) name = name_song, song = url_song;
//   			var card = Lampa.Template.get('card', {
//   				title: name_song,
//   				release_year: ''
//   			});
//   			playlist.push({
//   				title: name_song,
//   				url: url_song
//   			});
//   			card.addClass('card--radio');
//   			card.find('.card__img').css({
//   				'cursor': 'pointer',
//   				'background-color': '#353535a6'
//   			}).attr('src', element.picture ? element.picture : './img/welcome.jpg');
//   			card.on('hover:focus', function () {
//   				last = card[0];
//   				scroll.update(card, true);
//   				info.find('.info__title').text(name_song);
//   				info.find('.info__title-original').text(element.time + (element.quality ? ' / ' + element.quality : ''));
//   			});
//   			card.on('hover:enter', function () {
//   				//$(this).addClass('focus');
//   				$('.title_plaing').text(name_song);
//   				card.find('.card--category').addClass('focus');
//   				if (url_song.indexOf('.m3u8') !== -1) {
//   					var video = {
//   						title: name_song,
//   						url: url_song
//   					};
//   					Lampa.Player.play(video);
//   					Lampa.Player.playlist(playlist);
//   				} else _this3.Player(url_song);
//   			});
//   			body.append(card);
//   			items.push(card);
//   		});
//   		if (info.find('.title_plaing').text() == '') info.find('.title_plaing').text(name);
//   	};
//   	this.build = function (data) {
//   		var _this2 = this;
//   		Lampa.Background.change(API.replace('api.','') + 'r/back.jpg');
//   		info = Lampa.Template.get('info_radio');
//   		info.find('#plbut').on('hover:enter hover:click', function () {
//   			_this2.Player(audio.src ? audio.src : song);
//   		});
//   		info.find('#stbut').on('hover:enter hover:click', function () {
//   			_this2.showStancia();
//   		});
//   		scroll.render().addClass('layer--wheight').data('mheight', info);
//   		html.append(info.append());
//   		html.append(scroll.render());
//   		this.append(data);
//   		scroll.append(body);
//   		this.activity.loader(false);
//   		this.activity.toggle();
//   	};
//   	this.showStancia = function () {
//   		var catalogs = [{
//   			title: 'Radio Record',
//   			url: API + 'r/record/'
//   		}, {
//   			title: 'Ukraine',
//   			url: API + 'r/ukraine/'
//   		}, {
//   		  title: 'Russia',
//   			url: API + 'r/russia/'
//   		}, {
//   			title: 'Rock',
//   			url: API + 'r/rock/'
//   		}, {
//   			title: 'Dance',
//   			url: API + 'r/dance/'
//   		}, {
//   			title: 'Rap',
//   			url: API + 'r/rap/'
//   		}, {
//   			title: 'Background',
//   			url: API + 'r/fon/'
//   		}, {
//   			title: 'Jazz blues',
//   			url: API + 'r/jazz/'
//   		}];
//   		Lampa.Select.show({
//   			title: Lampa.Lang.translate('radio_style'),
//   			items: catalogs,
//   			onBack: function onBack() {
//   				Lampa.Controller.toggle('content');
//   			},
//   			onSelect: function onSelect(a) {
//   				Lampa.Activity.push({
//   					url: a.url.replace('api.',''),
//   					title: a.title,
//   					component: 'Radio_n',
//   					page: 1
//   				});
//   			}
//   		});
//   	};
//   	this.Player = function (file) {
//   		if (audio.paused || (audio.src !== file || audio.src == null)) {
//   			audio.src = file;
//   			audio.play();
//   			info.find('.title_plaing').removeClass('blink2');
//   			info.find('#plbut').removeClass('play').addClass('pause');
//   		} else {
//   			audio.pause();
//   			info.find('.title_plaing').addClass('blink2');
//   			info.find('#plbut').removeClass('pause').addClass('play');
//   		}
//   	};
//   	this.start = function () {
//   		var _this = this;
//   		Lampa.Controller.add('content', {
//   			toggle: function toggle() {
//   				Lampa.Controller.collectionSet(scroll.render(), info);
//   				Lampa.Controller.collectionFocus(last || false, scroll.render());
//   			},
//   			left: function left() {
//   				if (Navigator.canmove('left')) Navigator.move('left');
//   				else Lampa.Controller.toggle('menu');
//   			},
//   			right: function right() {
//   				if (Navigator.canmove('right')) Navigator.move('right');
//   				else _this.showStancia();
//   			},
//   			up: function up() {
//   				if (Navigator.canmove('up')) {
//   					Navigator.move('up');
//   				} else {
//   					if (!$('body').find('#stbut').hasClass('focus') && !$('body').find('#plbut').hasClass('focus')) {
//   						if (!$('body').find('#stbut').hasClass('focus')) {
//   							Lampa.Controller.collectionSet(info);
//   							Navigator.move('right');
//   						}
//   					} else Lampa.Controller.toggle('head');
//   				}
//   			},
//   			down: function down() {
//   				if (Navigator.canmove('down')) Navigator.move('down');
//   				else Lampa.Controller.toggle('content');
//   			},
//   			back: function back() {
//   				Lampa.Activity.backward();
//   			}
//   		});
//   		Lampa.Controller.toggle('content');
//   	};
//   	this.pause = function () {
//   		audio.pause();
//   	};
//   	this.stop = function () {};
//   	this.render = function () {
//   		return html;
//   	};
//   	this.destroy = function () {
//   		audio.pause();
//   		network.clear();
//   		scroll.destroy();
//   		info.remove();
//   		html.remove();
//   		body.remove();
//   		audio = null;
//   		network = null;
//   		items = null;
//   		html = null;
//   		body = null;
//   		info = null;
//   	};
//   }
	
  function startPlugin() {
		window.plugin_modss = true;
		// Lampa.Component.add('forktv', forktv);
		// Lampa.Component.add('Radio_n', Radio_n);
		
		Lampa.Component.add('aston_modss_online', component);
		// Lampa.Component.add('collection', collection);
		
		Lampa.Template.add('onlines_v1', "<div class='online onlines_v1 selector'><div class='online__body'><div style='position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em'><svg style='height: 2.4em; width:  2.4em;' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'>   <circle cx='64' cy='64' r='56' stroke='white' stroke-width='16'/>   <path d='M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z' fill='white'/></svg>  </div><div class='online__title' style='padding-left: 2.1em;'>{title}</div><div class='online__quality' style='padding-left: 3.4em;'>{quality}{info}</div> </div></div>");
		Lampa.Template.add('modss_online_css', "<style>@charset 'UTF-8';.full-start-new__buttons .full-start__button.view--modss_online span{display:block;} .online_modss__episode-number-season{font-size:1em;font-weight:700;color:#fff;position:absolute;top:.5em;right:.5em;background-color: rgba(0, 0, 0, 0.4);padding:0.2em;-webkit-border-radius: 0.3em;moz-border-radius: 0.3em;border-radius: 0.3em;} .online_modss{position:relative;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online_modss__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online_modss__body{padding:.8em 1.2em}}.online_modss__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online_modss__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.online_modss__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online_modss__img{width:7em;min-height:6em}}.online_modss__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online_modss__folder>svg{width:4.4em!important;height:4.4em!important}.online_modss__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online_modss__viewed>svg{width:1.5em!important;height:1.5em!important;}.online_modss__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online_modss__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;-webkit-background-size:contain;-moz-background-size:contain;-o-background-size:contain;background-size:contain}.online_modss__head,.online_modss__footer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_modss__timeline{margin:.8em 0}.online_modss__timeline>.time-line{display:block !important}.online_modss__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online_modss__title{font-size:1.4em}}.online_modss__time{padding-left:2em}.online_modss__info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_modss__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online_modss__quality{padding-left:1em;white-space:nowrap}.online_modss__scan-file{position:absolute;bottom:0;left:0;right:0}.online_modss__scan-file .broadcast__scan{margin:0}.online_modss .online_modss-split{font-size:.8em;margin:0 1em;flex-shrink: 0;}.online_modss.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;-moz-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online_modss+.online_modss{margin-top:1.5em}.online_modss--folder .online_modss__footer{margin-top:.8em}.online_modss-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_modss-rate>svg{width:1.3em!important;height:1.3em!important;}.online_modss-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;-moz-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em} .online-modss-watched{padding:1em}.online-modss-watched__icon>svg{width:1.5em!important;height:1.5em!important;}.online-modss-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-modss-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}   </style>");
		Lampa.Template.add('modss_online_full', "<div class=\"online_modss online_modss--full selector\"><div class=\"online_modss__img\">    <img alt=\"\">    <div class=\"online_modss__loader\"></div></div><div class=\"online_modss__body\">    <div class=\"online_modss__head\">        <div class=\"online_modss__title\">{title}</div>        <div class=\"online_modss__time\">{time}</div>    </div><div class=\"online_modss__timeline\"></div><div class=\"online_modss__footer\">        <div class=\"online_modss__info\">{info}</div>        <div class=\"online_modss__quality\">{quality}</div>    </div></div>    </div>");
    Lampa.Template.add('modss_does_not_answer', "<div class=\"online-empty\"><div class=\"online-empty__title\">    {title}</div><div class=\"online-empty__time\">    #{modss_balanser_timeout}</div><div class=\"online-empty__buttons\">    <div class=\"online-empty__button selector cancel\">#{cancel}</div>    <div class=\"online-empty__button selector change\">#{modss_change_balanser}</div></div><div class=\"online-empty__templates\">    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div>    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div>    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div></div>    </div>");
    Lampa.Template.add('modss_online_rate', "<div class=\"online_modss-rate\"><svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">    <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path></svg><span>{rate}</span>    </div>");
    Lampa.Template.add('modss_online_folder', "<div class=\"online_modss online_modss--folder selector\"><div class=\"online_modss__folder\">    <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>        <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>        <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>    </svg></div><div class=\"online_modss__body\">    <div class=\"online_modss__head\">        <div class=\"online_modss__title\">{title}</div>        <div class=\"online_modss__time\">{time}</div>    </div><div class=\"online_modss__footer\">        <div class=\"online_modss__info\">{info}</div>    </div></div>    </div>");
    Lampa.Template.add('modss_online_watched', "<div class=\"online_modss online-modss-watched selector\"><div class=\"online-modss-watched__icon\">    <svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"currentColor\" stroke-width=\"3\"/>        <path d=\"M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z\" fill=\"currentColor\"/>    </svg></div><div class=\"online-modss-watched__body\">    </div></div>");
    Lampa.Template.add('epg_modss', "<div class=\"notice notice--card selector layer--render image--loaded\"><div class=\"notice__left\"><div class=\"notice__img\"><img/></div></div> <div class=\"notice__body\"> <div class=\"notice__head\"><div class=\"notice__title\">{title}</div><div class=\"notice__time\">{time}</div></div><div class=\"notice__descr\">{descr}</div></div></div>");
		
		Lampa.Template.add('modss_style', "<style>.program-body .notice__left{width:15em!important;} .program-body .notice__img{padding-bottom: 57% !important;} @media screen and (max-width:2560px){.epg--img{width:10em;}}@media screen and (max-width:420px){.program-body .notice--card{display:block} .program-body .notice__left{float:left;width:32em!important}.program-body .notice__body{float:left;} .program-body .notice__img{padding-bottom: 56% !important;}} .mods_iptv__program{padding:0 1em}.iptv-list{padding:1.5em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding-bottom:1em}.iptv-list__ico{width:4.5em;margin-bottom:2em;height:4.5em}.iptv-list__ico>svg{width:4.5em;height:4.5em}.iptv-list__title{font-size:1.9em;margin-bottom:1em}.iptv-list__items{width:80%;margin:0 auto}.iptv-list__items .scroll{height:22em}.iptv-list__item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;padding:1em;background-color:rgba(255,255,255,0.1);font-size:1.3em;line-height:1.3;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;margin:1em}.iptv-list__item-name{width:40%;padding-right:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:left}.iptv-list__item-url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-list__item.focus{background-color:#fff;color:black}@media screen and (max-width: 585px) {.timeline{bottom:12em}.card--new_seria {right:2em!important;bottom:10em!important} .card--last_viewD{right:80%!important;top:2em!important}}</style>");
		Lampa.Template.add('hdgo_item', '<div class="selector hdgo-item"><div class="hdgo-item__imgbox"><img class="hdgo-item__img"/><div class="card__icons"><div class="card__icons-inner"></div></div></div><div class="hdgo-item__name">{title}</div></div>');
		Lampa.Template.add('hdgo_style', '<style>.last--focus .hdgo-item__imgbox::after {content: "";position: absolute;top: -0.4em;left: -0.4em;right: -0.4em;bottom: -0.4em;border: .3em solid red;-webkit-border-radius: .8em;-moz-border-radius: .8em;border-radius: .8em;opacity: .4}.modss-channel__name {padding:20px;text-align: center;font-size: 1.2em}.forktv.focus .hdgo-item__imgbox::after, .modss__tv.focus .hdgo-item__imgbox::after {opacity: 1}.nuamtv {filter: blur(7px);}.nuamtv:hover, .nuamtv:action {filter: blur(0px);}.a-r.b{color:#fff;background: linear-gradient(to right, rgba(204,0,0,1) 0%,rgba(150,0,0,1) 100%);}.a-r.de{color:#fff;background: linear-gradient(to right, #ffbc54 0%,#ff5b55 100%);}.a-r.g{background: linear-gradient(to right, rgba(205,235,142,1) 0%,rgba(165,201,86,1) 100%);color: #12420D;}.card.home.focus .card__img {border-color: green!important;-webkit-box-shadow: 0 0 0 0.4em green!important;-moz-box-shadow: 0 0 0 0.4em green!important;box-shadow: 0 0 0 0.4em green!important;}@media screen and (max-width: 2560px) {.pc.hdgo.card--collection,.pc.card--collection{width:11em!important} .tv_tv{width:12.5%!important}.tv_tv_c{width:20%!important}.tv_pc{width:16.66%!important}.tv.hdgo.card--collection{width:10.3em!important} .tv.card--collection{width:14.2%!important}.tv.sort.card--collection{width:25%!important}.tv.sort.hdgo.card--collection{width:25%!important}  .sort.hdgo.card--collection .card__view {padding-bottom:25%!important} .tv.two.sort.card--collection .card__view {padding-bottom: 10%!important} .tv.two.sort.card--collection{height:20%!important;width:50%!important}.pc.card--category, .tv.card--category{width:14.28%}.nuam.card--collection{width:20%!important}}  @media screen and (max-width: 1380px) {.pc.card--collection,.mobile,.mobile_tv{width:16.6%!important} .tv_pc{width:14.28%!important} .tv_pc_c{width:14.28%!important} .tv_tv{width:14.28%!important} .pc.hdgo.card--collection,.hdgo.card--collection{width:10em!important}.sort.pc.card--collection{width:25%!important}.sort.hdgo.card--collection{width:25%!important} .sort.hdgo.card--collection .card__view {padding-bottom:40%!important} .two.sort.card--collection{width:50%!important} .pc.two.sort.card--collection .card__view {padding-bottom: 33%!important} .pc.card--category,.nuam.card--category{width:11.5em!important}}  @media screen and (max-width: 420px) {.pc.card--collection,.mobile{width:10.3em!important}.mobile_tv{width:33.3%!important}  .pc.hdgo.card--collection,.hdgo.card--collection{width:10em!important}.pc.card--category,.nuam.card--category{width:7.9em!important}.nuam.card--collection{width:33.3%!important}.sort.hdgo.card--collection .card__view {padding-bottom:60%!important}}   .searc.card--collection .card__view {padding-bottom: 5%!important}.searc.card--collection{width:100%!important}.searc.card--collection .card__img{height:100%!important;}.hdgo-item{margin:0 .3em;width:10.4em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.hdgo-item__imgbox{background-color:#3e3e3e;padding-bottom:60%;position:relative;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.hdgo-item__img{position:absolute;top:0;left:0;width:100%;height:100%}.hdgo-item__name{font-size:1.1em;margin-top:.8em}.hdgo-item.focus .hdgo-item__imgbox::after{content:"";display:block;position:absolute;left:-.4em;top:-.4em;right:-.4em;bottom:-.4em;-border: .2em solid red;opacity:.6;-webkit-border-radius: .8em;-moz-border-radius: .8em;border-radius: .8em}.hdgo-item +.hdgo-item{margin:0 .3em}.modss_tv .items-line + .items-line, .forktv .items-line + .items-line {margin-top:0!important;}</style>');
		Lampa.Template.add('mods_radio_style', "<style>.blink2{-webkit-animation:blink2 1.5s linear infinite;animation:blink2 1.5s linear infinite}@-webkit-keyframes blink2{100%{color:rgba(34,34,34,0)}}@keyframes blink2{100%{color:rgba(34,34,34,0)}}.controll,.controll *{box-sizing:content-box;letter-spacing:0;}.controll{position:relative;transition:.5s linear;border:.3em solid #fff;background-color:#fff;border-radius:50%;bottom:4.19em;float:right;right:0;padding:1.7em;width:.2em;height:.2em;white-space:nowrap;text-align:center;cursor:pointer}.controll.pause{background-color:#353434;border-color:#3b6531}.controll,.controll .but_left,.controll .but_right,.controll:before{display:inline-block}.controll.pause .but_left,.controll.pause .but_right{margin-left:-8px;margin-top:-8px;border-left:8px solid #fff;border-top:0 solid transparent;border-bottom:0 solid transparent;height:18px}.controll.pause .but_left{border-right:10px solid transparent}.controll.play .but_right{margin-left:-5px;margin-top:-9px;border-left:15px solid #525252;border-top:10px solid transparent;border-bottom:10px solid transparent}.controll:hover,.controll.focus{background-color:#fff}.controll.play.focus{border-color:#8a8a8a}.controll.focus .but_left,.controll.focus .but_right,.controll:hover .but_left,.controll:hover .but_right{border-left-color:#252525}.Radio_n .card__view {padding-bottom: 75%!important;}.stbut,.stbut *{box-sizing:content-box;letter-spacing:0}.title_plaing{position:absolute;text-align:center;width:15em;margin-top:-1.2em;font-size:1.1em}.stbut{transition:.5s linear;border:.15em solid #fbfbfb;background-color:#000;border-radius:4em;margin-top:1em;padding:0.3em 4em 0em 0.5em;font-size:2em;cursor:pointer;height:1.5em;max-width:4em}.stbut:hover, .stbut.focus{background-color:#edebef;color:#616060;border-color:#8e8e8e}</style>");
		Lampa.Template.add('info_radio', '<div style="height:8em" class="radio_r info layer--width"><div class="info__left"><div style="margin-top:25px" class="info__title"></div><div class="info__create"></div></div><div style="display:block" class="info__right"> <b class="title_plaing"></b>   <div id="stantion_filtr"><div id="stbut" class="stbut selector"><b>СТАНЦИИ</b></div></div>    <div id="player_radio"><div id="plbut" class="controll selector play"><span class="but_left"></span><span class="but_right"></span></div></div></div></div>');
		Lampa.Template.add('mods_iptv_details', '<div class="mods_iptv-details"><div class="mods_epg-load" style="display:none;margin-bottom:-2em;position:relative"><div class="broadcast__text">' + Lampa.Lang.translate('search_searching') + '</div><div class="broadcast__scan"><div></div></div></div><div class="mods_iptv__program"></div></div>');
    Lampa.Template.add('mods_iptv_list', "<div class=\"iptv-list layer--height\"><div class=\"iptv-list__ico\"><svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>        <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>        <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg></div><div class=\"iptv-list__title\">#{iptv_select_playlist}</div><div class=\"iptv-list__items\"></div></div>");
    
    manifest = {
      type: 'video',
      version: version_modss,
      name: "在线的 - MODS's v" + version_modss,
      description: '用于观看连续剧和电影的插件',
      component: 'aston_modss_online',
      onContextMenu: function onContextMenu(object) {
        return {
          name: Lampa.Lang.translate('online_watch'),
          description: ''
        };
      },
      onContextLauch: function onContextLauch(object) {
        Lampa.Activity.push({
					url: '',
					title: Lampa.Lang.translate('modss_title_online') + " - MODS's v" + version_modss,
					component: 'aston_modss_online',
					search: object.title,
					search_one: object.title,
					search_two: object.original_title,
					movie: object,
					page: 1
				});
      }
    };
	  Lampa.Manifest.plugins = manifest;
	  if (!Lampa.Lang) {
		  var lang_data = {};
		  Lampa.Lang = {
			  add: function (data) {
				  lang_data = data;
			  },
			  translate: function (key) {
				  return lang_data[key] ? lang_data[key].ru : key;
			  }
		  }
	  }
	  Lampa.Lang.add({
		  iptv_select_playlist: {
			  ru: 'Выберите плейлист',
			  uk: 'Виберіть плейлист',
			  en: 'Choose a playlist',
			  zh: '选择播放列表'
		  },
		  iptv_add_fav: {
			  ru: 'Добавить в избранное',
			  uk: 'Додати в обране',
			  en: 'Add to favourites',
			  zh: '添加到收藏夹'
		  },
		  iptv_remove_fav: {
			  ru: 'Убрать из избранного',
			  uk: 'Прибрати з вибраного',
			  en: 'Remove from favorites',
			  zh: '从收藏夹中移除'
		  },
		  iptv_later: {
			  ru: 'Потом',
			  uk: 'Потім',
			  en: 'Later',
			  zh: '以后'
		  },
		  iptv_now: {
			  ru: 'Сейчас на:',
			  uk: 'Зараз на:',
			  en: 'Now on:',
			  zh: '当前播放：'
		  },
		  pub_sort_views: {
			  ru: 'По просмотрам',
			  uk: 'По переглядах',
			  en: 'By views',
			  zh: '按浏览量排序'
		  },
		  pub_sort_watchers: {
			  ru: 'По подпискам',
			  uk: 'За підписками',
			  en: 'Subscriptions',
			  zh: '按订阅排序'
		  },
		  pub_sort_updated: {
			  ru: 'По обновлению',
			  uk: 'За оновленням',
			  en: 'By update',
			  zh: '按更新排序'
		  },
		  pub_sort_created: {
			  ru: 'По дате добавления',
			  uk: 'За датою додавання',
			  en: 'By date added',
			  zh: '按添加日期排序'
		  },
		  pub_search_coll: {
			  ru: 'Поиск по подборкам',
			  uk: 'Пошук по добіркам',
			  en: 'Search by collections',
			  zh: '按集合搜索'
		  },
		  pub_title_all: {
			  ru: 'Все',
			  uk: 'Все',
			  en: 'All',
			  zh: '全部'
		  },
		  pub_title_popular: {
			  ru: 'Популярные',
			  uk: 'Популярнi',
			  en: 'Popular',
			  zh: '热门'
		  },
		  pub_title_new: {
			  ru: 'Новые',
			  uk: 'Новi',
			  en: 'New',
			  zh: '新的'
		  },
		  pub_title_hot: {
			  ru: 'Горячие',
			  uk: 'Гарячi',
			  en: 'Hot',
			  zh: '热门'
		  },
		  pub_title_fresh: {
			  ru: 'Свежие',
			  uk: 'Свiжi',
			  en: 'Fresh',
			  zh: '新鲜的'
		  },
		  pub_title_rating: {
			  ru: 'Рейтинговые',
			  uk: 'Рейтинговi',
			  en: 'Rating',
			  zh: '评分'
		  },
		  pub_title_allingenre: {
			  ru: 'Всё в жанре',
			  uk: 'Все у жанрі',
			  en: 'All in the genre',
			  zh: '所有在流派中'
		  },
		  pub_title_popularfilm: {
			  ru: 'Популярные фильмы',
			  uk: 'Популярні фільми',
			  en: 'Popular movies',
			  zh: '热门电影'
		  },
		  pub_title_popularserial: {
			  ru: 'Популярные сериалы',
			  uk: 'Популярні сериали',
			  en: 'Popular series',
			  zh: '热门连续剧'
		  },
		  pub_title_newfilm: {
			  ru: 'Новые фильмы',
			  uk: 'Новi фiльми',
			  en: 'New movies',
			  zh: '新电影'
		  },
		  pub_title_newserial: {
			  ru: 'Новые сериалы',
			  uk: 'Новi серiali',
			  en: 'New series',
			  zh: '新连续剧'
		  },
		  pub_title_newconcert: {
			  ru: 'Новые концерты',
			  uk: 'Новi концерти',
			  en: 'New concerts',
			  zh: '新音乐会'
		  },
		  pub_title_newdocfilm: {
			  ru: 'Новые док. фильмы',
			  uk: 'Новi док. фiльми',
			  en: 'New document movies',
			  zh: '新纪录片电影'
		  },
		  pub_title_newdocserial: {
			  ru: 'Новые док. сериалы',
			  uk: 'Новi док. серiали',
			  en: 'New document series',
			  zh: '新纪录片连续剧'
		  },
		  pub_title_newtvshow: {
			  ru: 'Новое ТВ шоу',
			  uk: 'Нове ТБ шоу',
			  en: 'New TV show',
			  zh: '新电视节目'
		  },
		  pub_modal_title: {
			  ru: '1. Авторизируйтесь на сайте: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. В поле "Активация устройства" введите код.',
			  uk: '1. Авторизуйтесь на сайті: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2.  Введіть код у полі "Активація пристрою".',
			  en: '1. Log in to the site: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2.  Enter the code in the "Device activation" field.',
			  zh: '1. 在网站上进行授权登录：<a style="color:#fff" href="#">https://kino.pub/device</a><br>2. 在“设备激活”字段中输入代码。'
		  },
		  pub_title_wait: {
			  ru: 'Ожидание идентификации кода',
			  uk: 'Очікування ідентифікації коду',
			  en: 'Waiting for code identification',
			  zh: '等待代码识别'
		  },
		  pub_title_left_days: {
			  ru: 'Осталось: ',
			  uk: 'Залишилось: ',
			  en: 'Left days: ',
			  zh: '剩余天数：'
		  },
		  pub_title_left_days_d: {
			  ru: 'дн.',
			  uk: 'дн.',
			  en: 'd.',
			  zh: '天'
		  },
		  pub_title_regdate: {
			  ru: 'Дата регистрации:',
			  uk: 'Дата реєстрації:',
			  en: 'Date of registration:',
			  zh: '注册日期：'
		  },
		  pub_date_end_pro: {
			  ru: 'ПРО заканчивается:',
			  uk: 'ПРО закінчується:',
			  en: 'PRO ends:',
			  zh: '高级会员结束：'
		  },
		  pub_auth_add_descr: {
			  ru: 'Добавить в свой профиль устройство',
			  uk: 'Додати у свій профіль пристрій',
			  en: 'Add a device to your profile',
			  zh: '将设备添加到您的个人资料'
		  },
		  pub_title_not_pro: {
			  ru: 'ПРО не активирован',
			  uk: 'ПРО не активований',
			  en: 'PRO is not activated',
			  zh: '高级会员未激活'
		  },
		  pub_device_dell_noty: {
			  ru: 'Устройство успешно удалено',
			  uk: 'Пристрій успішно видалено',
			  en: 'Device deleted successfully',
			  zh: '设备删除成功'
		  },

		  online_no_watch_history: {
			  ru: 'Нет истории просмотра',
			  en: 'No browsing history',
			  ua: 'Немає історії перегляду',
			  zh: '没有浏览历史'
		  },
		  modss_video: {
			  ru: 'Видео',
			  en: 'Video',
			  ua: 'Відео',
			  zh: '视频'
		  },
		  pub_device_title_options: {
			  ru: 'Настройки устройства',
			  uk: 'Налаштування пристрою',
			  en: 'Device Settings',
			  zh: '设备设置'
		  },
		  pub_device_options_edited: {
			  ru: 'Настройки устройства изменены',
			  uk: 'Установки пристрою змінено',
			  en: 'Device settings changed',
			  zh: '设备设置已更改'
		  },
		  params_pub_clean_tocken: {
			  ru: 'Очистить токен',
			  uk: 'Очистити токен',
			  en: 'Clear token',
			  zh: '清除令牌'
		  },
		  saved_collections_clears: {
			  ru: 'Сохранённые подборки очищены',
			  uk: 'Збірки очищені',
			  en: 'Saved collections cleared',
			  zh: '已清除保存的收藏夹'
		  },
		  card_my_clear: {
			  ru: 'Убрать с моих подборок',
			  uk: 'Прибрати з моїх добірок',
			  en: 'Remove from my collections',
			  zh: '从我的收藏中移除'
		  },
		  card_my_add: {
			  ru: 'Добавить в мои подборки',
			  uk: 'Додати до моїх добірок',
			  en: 'Add to my collections',
			  zh: '添加到我的收藏'
		  },
		  card_my_descr: {
			  ru: 'Смотрите в меню (Подборки)',
			  uk: 'Дивитесь в меню (Підбірки)',
			  en: 'Look in the menu (Collections)',
			  zh: '在菜单中查看（收藏夹）'
		  },
		  card_my_clear_all: {
			  ru: 'Удалить всё',
			  uk: 'Видалити все',
			  en: 'Delete all',
			  zh: '全部删除'
		  },
		  card_my_clear_all_descr: {
			  ru: 'Очистит все сохранённые подборки',
			  uk: 'Очистити всі збережені збірки',
			  en: 'Clear all saved selections',
			  zh: '清除所有保存的选项'
		  },
		  radio_style: {
			  ru: 'Стиль',
			  uk: 'Стиль',
			  en: 'Style',
			  zh: '风格'
		  },
		  title_on_the: {
			  ru: 'на',
			  uk: 'на',
			  en: 'on',
			  zh: '在'
		  },
		  title_my_collections: {
			  ru: 'Мои подборки',
			  uk: 'Мої добірки',
			  en: 'My collections',
			  zh: '我的收藏夹'
		  },
		  modss_watch: {
			  ru: 'Смотреть онлайн',
			  en: 'Watch online',
			  ua: 'Дивитися онлайн',
			  zh: '在线观看'
		  },
		  modss_nolink: {
			  ru: 'Не удалось извлечь ссылку',
			  uk: 'Неможливо отримати посилання',
			  en: 'Failed to fetch link',
			  zh: '获取链接失败'
		  },
		  modss_viewed: {
			  ru: 'Просмотрено',
			  uk: 'Переглянуто',
			  en: 'Viewed',
			  zh: '已查看'
		  },
		  modss_balanser: {
			  ru: 'Балансер',
			  uk: 'Балансер',
			  en: 'Balancer',
			  zh: '视频源'
		  },
		  helper_online_file: {
			  ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
			  uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
			  en: 'Hold the "OK" key to bring up the context menu',
			  zh: '按住"OK"键调出上下文菜单'
		  },
		  filter_series_order: {
			  ru: 'Порядок серий',
			  uk: 'Порядок серій',
			  en: 'Series order',
			  zh: '排序'
		  },
		  filter_video_stream: {
			  ru: 'Видео поток',
			  uk: 'Відео потік',
			  en: 'Video stream',
			  zh: '视频流'
		  },
		  filter_video_codec: {
			  ru: 'Кодек',
			  uk: 'Кодек',
			  en: 'Codec',
			  zh: '编解码器'
		  },
		  filter_video_server: {
			  ru: 'Сервер',
			  uk: 'Сервер',
			  en: 'Server',
			  zh: '服务器'
		  },
		  modss_title_online: {
			  ru: 'Онлайн',
			  uk: 'Онлайн',
			  en: 'Online',
			  zh: '在线观看'
		  },
		  modss_change_balanser: {
			  ru: 'Изменить балансер',
			  uk: 'Змінити балансер',
			  en: 'Change balancer',
			  zh: '更改视频源'
		  },
		  modss_clear_all_marks: {
			  ru: 'Очистить все метки',
			  uk: 'Очистити всі мітки',
			  en: 'Clear all labels',
			  zh: '清除所有标签'
		  },
		  modss_clear_all_timecodes: {
			  ru: 'Очистить все тайм-коды',
			  uk: 'Очистити всі тайм-коди',
			  en: 'Clear all timecodes',
			  zh: '清除所有时间代码'
		  },
		  modss_title_clear_all_mark: {
			  ru: 'Снять отметку у всех',
			  uk: 'Зняти відмітку у всіх',
			  en: 'Unmark all',
			  zh: '取消所有标记'
		  },
		  modss_title_clear_all_timecode: {
			  ru: 'Сбросить тайм-код у всех',
			  uk: 'Скинути тайм-код у всіх',
			  en: 'Reset timecode for all',
			  zh: '重置所有时间代码'
		  },
		  modss_title_links: {
			  ru: 'Качество',
			  uk: 'Якість',
			  en: 'Quality',
			  zh: '质量'
		  },
		  title_proxy: {
			  ru: 'Прокси',
			  uk: 'Проксі',
			  en: 'Proxy',
			  zh: '代理'
		  },
		  online_proxy_title: {
			  ru: 'Личный прокси',
			  uk: 'Особистий проксі',
			  en: 'Your proxy',
			  zh: '个人代理'
		  },
		  online_proxy_title_descr: {
			  ru: 'Если балансер недоступен или不响应，请在您选择的视频源中"启用"代理，或者指定"自定义 URL"。',
			  uk: 'Якщо балансер недоступний або не відповідає, потрібно у вибраному Вами балансері "Увімкнути" проксі, або вказати посилання на "Свій URL"',
			  en: 'If the balancer is not available or does not respond, you need to "Enable" the proxy in the balancer you have chosen, or specify a link to "Custom URL"',
			  zh: '如果视频源不可用或未响应，请在您选择的视频源中"启用"代理，或者指定"自定义 URL"。'
		  },
		  online_proxy_title_main: {
			  ru: 'Встроенный прокси',
			  uk: 'Вбудований проксі',
			  en: 'Built-in proxy',
			  zh: '内置代理'
		  },
		  online_proxy_title_main_descr: {
			  ru: 'Позволяет使用系统内置的代理来处理所有的视频源',
			  uk: 'Дозволяє використовувати вбудований у систему проксі для всіх балансерів',
			  en: 'Allows you to use the built-in proxy for all balancers',
			  zh: '允许您在所有视频源中使用内置代理'
		  },
		  online_proxy_descr: {
			  ru: 'Позволяет为所有视频源设置个人代理',
			  uk: 'Дозволяє встановити особистий проксі для всіх балансерів',
			  en: 'Allows you to set a personal proxy for all balancers',
			  zh: '允许您为所有视频源设置个人代理'
		  },
		  online_proxy_placeholder: {
			  ru: 'Например: http://proxy.com',
			  uk: 'Наприклад: http://proxy.com',
			  en: '例如：http://proxy.com',
			  zh: '例如：http://proxy.com'
		  },
		  online_proxy_url: {
			  ru: 'Свой URL',
			  uk: 'Свiй URL',
			  en: '自定义 URL',
			  zh: '自定义 URL'
		  },
		  modss_voice_subscribe: {
			  ru: 'Подписаться на перевод',
			  uk: 'Підписатися на переклад',
			  en: 'Subscribe to translation',
			  zh: '订阅翻译'
		  },
		  modss_voice_success: {
			  ru: 'Вы успешно подписались',
			  uk: 'Ви успішно підписалися',
			  en: 'You have successfully subscribed',
			  zh: '您已成功订阅'
		  },
		  modss_voice_error: {
			  ru: 'Возникла ошибка',
			  uk: 'Виникла помилка',
			  en: 'An error has occurred',
			  zh: '出现错误'
		  },
		  modss_balanser_dont_work: {
			  ru: 'Балансер ({balanser}) не отвечает на запрос.',
			  uk: 'Балансер ({balanser}) не відповідає на запит.',
			  en: 'Balancer ({balanser}) does not respond to the request.',
			  zh: '视频源（{balanser}）未响应请求。'
		  },
		  modss_balanser_timeout: {
			  ru: 'Балансер будет переключен автоматически через <span class="timeout">10</span> секунд.',
			  uk: 'Балансер буде переключено автоматично через <span class="timeout">10</span> секунд.',
			  en: 'Balancer will be switched automatically in <span class="timeout">10</span> seconds.',
			  zh: '视频源将在<span class="timeout">10</span>秒内自动切换。'
		  },
		  modss_does_not_answer_text: {
			  ru: 'Сервер не отвечает на запрос.',
			  uk: 'Сервер не відповідає на запит.',
			  en: 'Server does not respond to the request.',
			  zh: '服务器未响应请求。'
		  },
		  modss_balanser_dont_work_from: {
			  ru: ' на балансере <b>{balanser}</b>',
			  uk: ' на балансері <b>{balanser}</b>',
			  en: ' on balancer <b>{balanser}</b>',
			  zh: ' on balancer <b>{balanser}</b>'
		  },
		  online_dash: {
			  ru: 'Предпочитать DASH вместо HLS',
			  uk: 'Віддавати перевагу DASH замість HLS',
			  be: 'Аддаваць перавагу DASH замест HLS',
			  en: 'Prefer DASH over HLS',
			  zh: '更喜欢 DASH 而不是 HLS'
		  },
		  online_query_start: {
			  ru: 'По запросу',
			  uk: 'На запит',
			  en: 'On request',
			  zh: '您请求的'
		  },
		  online_query_end: {
			  ru: 'нет результатов',
			  uk: 'немає результатів',
			  en: 'no results',
			  zh: '没有找到资源'
		  },
		  title_online_continue: {
			  ru: 'Продолжить',
			  uk: 'Продовжити',
			  en: 'Continue',
			  zh: '继续'
		  },
		  title_kb_captcha_address: {
			  ru: 'Требуется пройти капчу по адресу: ',
			  uk: 'Потрібно пройти капчу за адресою: ',
			  en: 'It is required to pass the captcha at: ',
			  zh: '需要在以下地址通过验证码：'
		  },
		  title_online_first_but: {
			  ru: 'Кнопка онлайн всегда первая',
			  uk: 'Кнопка онлайн завжди перша',
			  en: 'Online button always first',
			  zh: '播放钮始终排在第一位'
		  },
		  title_online_continued: {
			  ru: 'Продолжить просмотр',
			  uk: 'Продовжити перегляд',
			  en: 'Continue browsing',
			  zh: '继续浏览'
		  },
		  title_online_descr: {
			  ru: 'Позволяет запускать плеер сразу на том месте, где остановили просмотр. Работает только в ВСТРОЕННОМ плеере。',
			  uk: 'Дозволяє запускати плеєр одразу на тому місці, де зупинили перегляд.  Працює тільки у Вбудованому плеєрі。',
			  en: 'Allows you to start the player immediately at the place where you stopped browsing.  Works only in the INTEGRATED player。',
			  zh: '允许您立即在停止浏览的地方启动播放器。仅在内置播放器中有效。'
		  },
		  title_online_hevc: {
			  ru: 'Включить поддержку HDR',
			  uk: 'Включити підтримку HDR',
			  en: 'Enable HDR Support',
			  zh: '启用 HDR 支持'
		  },
		  title_online__hevc_descr: {
			  ru: 'Использовать HEVC / HDR если он доступен',
			  uk: 'Використовувати HEVC / HDR якщо він доступний',
			  en: 'Use HEVC / HDR if available',
			  zh: '如果可用，使用HEVC / HDR',
		  },
		  title_prioriry_balanser: {
			  ru: 'Балансер по умолчанию',
			  uk: 'Балансер за замовчуванням',
			  en: 'Default balancer',
			  zh: '默认视频源',
		  },
		  title_prioriry_balanser_descr: {
			  ru: 'Балансер фильмов по умолчанию',
			  uk: 'Джерело фільмів за замовчуванням',
			  en: 'Default movie source',
			  zh: '默认视频源',
		  },
		  filmix_param_add_title: {
			  ru: 'Добавить ТОКЕН от Filmix',
			  uk: 'Додати ТОКЕН від Filmix',
			  en: 'Add TOKEN from Filmix',
			  zh: '添加来自Filmix的令牌',
		  },
		  filmix_param_add_descr: {
			  ru: 'Добавьте ТОКЕН для подключения подписки',
			  uk: 'Додайте ТОКЕН для підключення передплати',
			  en: 'Add a TOKEN to connect a subscription',
			  zh: '添加令牌以连接订阅',
		  },
		  filmix_param_placeholder: {
			  ru: 'Например: nxjekeb57385b..',
			  uk: 'Наприклад: nxjekeb57385b..',
			  en: 'For example: nxjekeb57385b..',
			  zh: '例如：nxjekeb57385b..',
		  },
		  filmix_params_add_device: {
			  ru: 'Добавить устройство на ',
			  uk: 'Додати пристрій на ',
			  en: 'Add Device to ',
			  zh: '将设备添加到 '
		  },
		  filmix_modal_text: {
			  ru: 'Введите его на странице https://filmix.ac/consoles в вашем авторизованном аккаунте!',
			  uk: 'Введіть його на сторінці https://filmix.ac/consoles у вашому авторизованому обліковому записі!',
			  en: 'Enter it at https://filmix.ac/consoles in your authorized account!',
			  zh: '在 https://filmix.ac/consoles 页面中输入它，在您的已授权帐户中！'
		  },
		  filmix_modal_wait: {
			  ru: 'Ожидаем код',
			  uk: 'Очікуємо код',
			  en: 'Waiting for the code',
			  zh: '等待验证码'
		  },
		  filmix_copy_secuses: {
			  ru: 'Код скопирован в буфер обмена',
			  uk: 'Код скопійовано в буфер обміну',
			  en: 'Code copied to clipboard',
			  zh: '代码已复制到剪贴板'
		  },
		  filmix_copy_fail: {
			  ru: 'Ошибка при копировании',
			  uk: 'Помилка при копіюванні',
			  en: 'Copy error',
			  zh: '复制错误'
		  },
		  filmix_nodevice: {
			  ru: 'Устройство не авторизовано',
			  uk: 'Пристрій не авторизований',
			  en: 'Device not authorized',
			  zh: '设备未授权'
		  },
		  filmix_auth_onl: {
			  ru: 'Для просмотра в качестве 720p нужно добавить устройство в свой аккаунт на сайте filmix иначе будет заставка на видео.<br><br>Перейти в настройки и добавить?',
			  uk: 'Для перегляду в якостi 720p потрібно додати пристрій до свого облікового запису на сайті filmix інакше буде заставка на відео.<br><br>Перейти до налаштувань і додати?',
			  en: 'To view in 720p quality, you need to add a device to your account on the filmix website, otherwise there will be a splash screen on the video.<br><br>Go to settings and add?',
			  zh: '要以720p的质量观看，您需要将设备添加到filmix网站上的帐户中，否则视频将出现闪屏。<br><br>前往设置并添加？'
		  },
		  fork_auth_modal_title: {
			  ru: '1. Авторизируйтесь на: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Потребуется оформить подписку<br>3. В поле "Ваш ID/MAC" добавьте код',
			  uk: '1. Авторизуйтесь на: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Потрібно оформити передплату<br>3. У полі "Ваш ID/MAC" додайте код',
			  en: '1. Log in to: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Subscription required<br>3. In the "Your ID / MAC" field, add the code',
			  zh: '1. 登录至：<a style="color:#fff" href="#">http://forktv.me</a><br>2. 需要订阅<br>3. 在 "您的ID / MAC" 字段中添加代码',
		  },
		  fork_modal_wait: {
			  ru: '<b style="font-size:1em">Ожидание идентификации кода</b><hr>После завершения идентификации произойдет перенаправление в обновленный раздел ForkTV',
			  uk: '<b style="font-size:1em">Очiкуемо ідентифікації коду</b><hr>Після завершення ідентифікації відбудеться перенаправлення в оновлений розділ ForkTV',
			  en: '<b style="font-size:1em">Waiting for code identification</b><hr>After identification is completed, you will be redirected to the updated ForkTV section',
			  zh: '<b style="font-size:1em">等待代码识别</b><hr>识别完成后，您将被重定向到更新后的ForkTV部分',
		  },
		  title_status: {
			  ru: 'Статус',
			  uk: 'Статус',
			  en: 'Status',
			  zh: '状态'
		  },
		  season_ended: {
			  ru: 'сезон завершён',
			  uk: 'сезон завершено',
			  en: 'season ended',
			  zh: '季结束'
		  },
		  season_from: {
			  ru: 'из',
			  uk: 'з',
			  en: 'from',
			  zh: '共'
		  },
		  season_new: {
			  ru: 'Новая',
			  uk: 'Нова',
			  en: 'New',
			  zh: '新'
		  },
		  info_attention: {
			  ru: 'Внимание',
			  uk: 'Увага',
			  en: 'Attention',
			  zh: '注意'
		  },
		  info_pub_descr: {
			  ru: '<b>KinoPub</b> платный ресурс, просмотр онлайн с балансера, а также спортивные ТВ каналы будут доступны после покупки <b>PRO</b> в аккаунте на сайте',
			  uk: '<b>KinoPub</b> платний ресурс, перегляд онлайн з балансера, а також спортивні ТБ канали будуть доступні після покупки <b>PRO</b> в обліковому записі на сайті',
			  en: '<b>KinoPub</b> a paid resource, online viewing from a balancer, as well as sports TV channels will be available after purchasing <b>PRO</b> in your account on the site',
			  zh: '<b>KinoPub</b> 是付费资源，从视频源在线观看，购买<b>PRO</b>会员后，还可以在网站账户中获得体育电视频道的访问权限',
		  },
		  info_filmix_descr: {
			  ru: 'Максимально доступное качество для просмотра без подписки - 720p. Для того, чтобы смотреть фильмы и сериалы в качестве - 1080р-2160р требуется подписка <b>PRO</b> или <b>PRO-PLUS</b> на сайте',
			  uk: 'Максимально доступна якість для перегляду без підписки – 720p.  Для того, щоб дивитися фільми та серіали як - 1080р-2160р потрібна підписка <b>PRO</b> або <b>PRO-PLUS</b> на сайтi',
			  en: 'The maximum available quality for viewing without a subscription is 720p.  In order to watch movies and series in quality - 1080p-2160p, you need a <b>PRO</b> or <b>PRO-PLUS</b> subscription to the site',
			  zh: '在没有订阅的情况下观看的最高可用质量为720p。要观看1080p-2160p质量的电影和系列节目，您需要在网站上订阅<b>PRO</b>或<b>PRO-PLUS</b>',
		  },
		  params_pub_on: {
			  ru: 'Включить',
			  uk: 'Увiмкнути',
			  en: 'Enable',
			  zh: '启用'
		  },
		  params_pub_off: {
			  ru: 'Выключить',
			  uk: 'Вимкнути',
			  en: 'Disable',
			  zh: '禁用',
		  },
		  params_pub_on_descr: {
			  ru: 'Отображает источник "<b>KinoPub</b>", а также подборки. Для просмотра с балансера, а также ТВ спорт каналов <span style="color:#ffd402">требуется подписка<span>',
			  uk: 'Відображає джерело "<b>KinoPub</b>", а також добірки.  Для перегляду з балансера, а також ТБ спорт каналів <span style="color:#ffd402">потрібна підписка<span>',
			  en: 'Displays the "<b>KinoPub</b>" source as well as collections.  To view from the balancer, as well as TV sports channels <span style="color:#ffd402">subscription<span> is required',
			  zh: '显示 "<b>KinoPub</b>" 源以及收藏。要从视频源查看，以及观看电视体育频道，<span style="color:#ffd402">需要订阅<span>',
		  },
		  params_pub_add_source: {
			  ru: 'Установить источник',
			  uk: 'Встановити джерело',
			  en: 'Set source',
			  zh: '设置来源',
		  },
		  pub_source_add_noty: {
			  ru: 'KinoPub установлен источником по умолчанию',
			  uk: 'KinoPub встановлений стандартним джерелом',
			  en: 'KinoPub set as default source',
			  zh: 'KinoPub 设置为默认来源',
		  },
		  descr_pub_settings: {
			  ru: 'Настройки сервера, типа потока...',
			  uk: 'Налаштування сервера типу потоку...',
			  en: 'Server settings, stream type...',
			  zh: '服务器设置，流类型...',
		  },
		  params_pub_add_source_descr: {
			  ru: 'Установить источник по умолчанию на KinoPub',
			  uk: 'Встановити стандартне джерело на KinoPub',
			  en: 'Set Default Source to KinoPub',
			  zh: '将默认来源设置为 KinoPub',
		  },
		  params_pub_update_tocken: {
			  ru: 'Обновить токен',
			  uk: 'Оновити токен',
			  en: 'Update token',
			  zh: '更新令牌',
		  },
		  params_pub_dell_device: {
			  ru: 'Удалить привязку устройства',
			  uk: 'Видалити прив\'язку пристрою',
			  en: 'Remove device link',
			  zh: '移除设备链接',
		  },
		  params_pub_dell_descr: {
			  ru: 'Будет удалено устройство с привязанных устройств в аккаунте',
			  uk: 'Буде видалено пристрій із прив\'язаних пристроїв в обліковому записі',
			  en: 'The device will be removed from linked devices in the account',
			  zh: '该设备将从帐户中的链接设备中删除',
		  },
		  params_radio_enable: {
			  ru: 'Включить радио',
			  uk: 'Увімкнути радіо',
			  en: 'Enable radio',
			  zh: '启用收音机',
		  },
		  params_radio_enable_descr: {
			  ru: 'Отображает пункт "Радио" в главном меню с популярными радиостанциями',
			  uk: 'Відображає пункт "Радіо" в головному меню з популярними радіостанціями',
			  en: 'Displays the item "Radio" in the main menu with popular radio stations',
			  zh: '在主菜单中显示带有热门广播电台的项目',
		  },
		  params_tv_enable: {
			  ru: 'Включить ТВ',
			  uk: 'Увімкнути ТВ',
			  en: 'Enable TV',
			  zh: '启用电视',
		  },
		  params_tv_enable_descr: {
			  ru: 'Отображает пункт "Modss-TV" в главном меню с популярными каналами',
			  uk: 'Відображає пункт "Modss-TV" в головному меню з популярними каналами',
			  en: 'Displays the item "Modss-TV" in the main menu with popular channels',
			  zh: '在主菜单中显示带有热门频道的项目',
		  },
		  params_collections_descr: {
			  ru: 'Добавляет в пункт "Подборки" популярные разделы, такие как Rezka, Filmix, KinoPub',
			  uk: 'Додає до пункту "Підбірки" популярні розділи, такі як Rezka, Filmix, KinoPub',
			  en: 'Adds to "Collections" popular sections such as Rezka, Filmix, KinoPub',
			  zh: '将 Rezka、Filmix、KinoPub 等热门分区添加到"收藏"中',
		  },
		  params_styles_title: {
			  ru: 'Стилизация',
			  uk: 'Стилізація',
			  en: 'Stylization',
			  zh: '其它',
		  },
		  placeholder_password: {
			  ru: 'Введите пароль',
			  uk: 'Введіть пароль',
			  en: 'Enter password',
			  zh: '请输入密码',
		  },
		  title_parent_contr: {
			  ru: 'Родительский контроль',
			  uk: 'Батьківський контроль',
			  en: 'Parental control',
			  zh: '家长控制',
		  },
		  title_addons: {
			  ru: 'Дополнения',
			  uk: 'Додатки',
			  en: 'Add-ons',
			  zh: '插件',
		  },
		  onl_enable_descr: {
			  ru: 'Позволяет просматривать фильмы, сериалы в режиме Stream',
			  uk: 'Дозволяє переглядати фільми, серіали в режимі Stream',
			  en: 'Allows you to watch movies, series in Stream mode',
			  zh: '允许您在流媒体模式下观看电影、剧集',
		  },
		  fork_enable_descr: {
			  ru: 'Отображает пункт <b>"ForkTV"</b> в главном меню с популярными источниками, торрентами',
			  uk: 'Відображає пункт <b>"ForkTV"</b> у головному меню з популярними джерелами, торрентами',
			  en: 'Displays <b>"ForkTV"</b> item in main menu with popular sources, torrents',
			  zh: '在主菜单中显示带有热门来源、种子的<b>"ForkTV"</b>项目',
		  },
		  title_fork_edit_cats: {
			  ru: 'Изменить разделы',
			  uk: 'Змінити розділи',
			  en: 'Edit Sections',
			  zh: '编辑分区',
		  },
		  title_fork_add_cats: {
			  ru: 'Добавить разделы',
			  uk: 'Додати розділи',
			  en: 'Add Sections',
			  zh: '添加分区',
		  },
		  title_fork_clear: {
			  ru: 'Очистить разделы',
			  uk: 'Очистити розділи',
			  en: 'Clear Sections',
			  zh: '清除分区',
		  },
		  title_fork_clear_descr: {
			  ru: 'Будет выполнена очистка всех выбранных разделов',
			  uk: 'Буде виконано очищення всіх вибраних розділів',
			  en: 'All selected partitions will be cleared',
			  zh: '将清除所有选定的分区',
		  },
		  title_fork_clear_noty: {
			  ru: 'Разделы успешно очищены',
			  uk: 'Розділи успішно очищені',
			  en: 'Partitions cleared successfully',
			  zh: '分区清除成功',
		  },
		  title_fork_reload_code: {
			  ru: 'Обновить код',
			  uk: 'Оновити код',
			  en: 'Update Code',
			  zh: '更新代码',
		  },
		  title_fork_current: {
			  ru: 'Текущий',
			  uk: 'Поточний',
			  en: 'Current',
			  zh: '当前',
		  },
		  title_fork_new: {
			  ru: 'Новый',
			  uk: 'Новий',
			  en: 'New',
			  zh: '新建',
		  },
		  title_tv_clear_fav: {
			  ru: 'Очистить избранное',
			  uk: 'Очистити вибране',
			  en: 'Clear Favorites',
			  zh: '清除收藏',
		  },
		  title_tv_clear__fav_descr: {
			  ru: 'Будет выполнена очистка избранных каналов',
			  uk: 'Буде виконано очищення обраних каналів',
			  en: 'Favorite channels will be cleared',
			  zh: '将清除收藏的频道',
		  },
		  title_tv_clear_fav_noty: {
			  ru: 'Все избранные каналы удалены',
			  uk: 'Усі вибрані канали видалені',
			  en: 'All favorite channels have been deleted',
			  zh: '所有收藏的频道已被删除',
		  },
		  succes_update_noty: {
			  ru: 'успешно обновлён',
			  uk: 'успішно оновлено',
			  en: 'successfully updated',
			  zh: '更新成功',
		  },
		  title_enable_rating: {
			  ru: 'Включить рейтинг',
			  uk: 'Увiмкнути рейтинг',
			  en: 'Enable rating',
			  zh: '显示评分',
		  },
		  title_enable_rating_descr: {
			  ru: 'Отображает в карточке рейтинг Кинопоиск и IMDB',
			  uk: 'Відображає у картці рейтинг Кінопошук та IMDB',
			  en: 'Displays the Kinopoisk and IMDB rating in the card',
			  zh: '在卡片中显示Kinopoisk和IMDB评分',
		  },
		  title_info_serial: {
			  ru: 'Информация о карточке',
			  uk: 'Інформація про картку',
			  en: 'Card Information',
			  zh: '卡片信息',
		  },
		  title_info_serial_descr: {
			  ru: 'Отображает информацию о количестве серий в карточке, в том числе последнею серию на постере',
			  uk: 'Відображає інформацію про кількість серій у картці, у тому числі останню серію на постері',
			  en: 'Displays information about the number of episodes in the card, including the last episode on the poster',
			  zh: '在卡片中显示有关剧集数量的信息，包括海报上的最新剧集',
		  },
		  title_add_butback: {
			  ru: 'Включить кнопку "Назад"',
			  uk: 'Увiмкнути кнопку "Назад"',
			  en: 'Enable back button',
			  zh: '启用返回按钮',
		  },
		  title_add_butback_descr: {
			  ru: 'Отображает внешнюю кнопку "Назад" для удобной навигации в полноэкранном режиме на различных смартфонах',
			  uk: 'Відображає зовнішню кнопку "Назад" для зручної навігації в повноекранному режимі на різних смартфонах',
			  en: 'Displays an external back button for easy full-screen navigation on various smartphones',
			  zh: '在各种智能手机上显示外部返回按钮，以便在全屏模式下进行轻松导航',
		  },
		  title_butback_pos: {
			  ru: 'Положение кнопки "Назад"',
			  uk: 'Розташування кнопки "Назад"',
			  en: 'Back button position',
			  zh: '返回按钮位置'
		  },
		  buttback_right: {
			  ru: 'Справа',
			  uk: 'Праворуч',
			  en: 'Right',
			  zh: '右'
		  },
		  buttback_left: {
			  ru: 'Слева',
			  uk: 'Лiворуч',
			  en: 'Left',
			  zh: '左'
		  },
		  title_close_app: {
			  ru: 'Закрыть приложение',
			  uk: 'Закрити додаток',
			  en: 'Close application',
			  zh: '关闭应用'
		  },
		  title_radio: {
			  ru: 'Радио',
			  uk: 'Радiо',
			  en: 'Radio',
			  zh: '电台'
		  },
		  use_json_enable: {
			  ru: 'Внешняя конфигурация',
			  uk: 'Зовнішня конфігурація',
			  en: 'External Configuration',
			  zh: '外部配置'
		  },
		  use_json_enable_descr: {
			ru: 'По умолчанию используется встроенная конфигурация.',
			uk: 'Використовувати вбудовану конфігурацію за замовчуванням.',
			en: 'Defaulting to built-in configuration.',
			zh: '默认使用内置配置规则',
		  },
		  use_json_url: {
			ru: 'URL конфигурации',
			uk: 'URL конфігурації',
			en: 'Configuration URL',
			zh: '配置地址'
		  },
		  use_json_url_descr: {
			ru: 'URL-адрес JSON-файла',
			uk: 'URL-адреса JSON-файлу',
			en: 'JSON URL Address.',
			zh: 'JSON URL地址'
		  },
		  use_json_url_placeholder: {
			ru: 'Например: http://apc.com/a.json',
			uk: 'Наприклад: http://apc.com/a.json',
			en: '例如：http://abc.com/a.json',
			zh: '例如：http://abc.com/a.json'
		},
		title_xiaoya: {
			ru: "Адрес Alist для Xiaoya",
			uk: "Адреса Alist для Xiaoya",
			en: "Xiaoya Alist Address",
			zh: "小雅Alist地址"
		  },
		  title_xiaoya_descr: {
			ru: "Введите адрес и порт",
			uk: "Введіть адресу та порт",
			en: "Enter the address and port",
			zh: "填写地址和端口"
		  },
		  title_xiaoya_placeholder: {
			ru: "Например: 192.168.2.1:5678",
			uk: "Наприклад: 192.168.2.1:5678",
			en: "For example: 192.168.2.1:5678",
			zh: "例如：192.168.2.1:5678"
		  },
	  });
		function FreeJaketOpt() {
  			Lampa.Arrays.getKeys(Modss.jack).map(function (el){
  			  jackets[el] = el.replace(/_/g,'.');
  			});
  			var params = Lampa.SettingsApi.getParam('parser')
        if(params){
           var param = params.find(function (p){
             return p.param.name == 'jackett_url2';
           });
          if(param) Lampa.Arrays.remove(params, param);
        }
		//jackett
        // Lampa.SettingsApi.addParam({
  		// 		component: 'parser',
  		// 		param: {
  		// 			name: 'jackett_url2', 
  		// 			type: 'select', 			
  		// 			values: jackets,
  		// 			default: 'jacred_ru'				
  		// 		},
  		// 		field: {
		// 			name: 'Public JACKett Ⓜ️', 
		// 			description: 'Will update after exiting settings'
  		// 		},
  		// 		onChange: function (value) { 	
  		// 			Lampa.Storage.set('jackett_url', Modss.jack[value].url);
  		// 			Lampa.Storage.set('jackett_key', Modss.jack[value].key);
  		// 			Lampa.Storage.set('jackett_interview',Modss.jack[value].interv);
  		// 			Lampa.Storage.set('parse_in_search', false);
  		// 			Lampa.Storage.set('parse_lang', Modss.jack[value].lang);
  		// 			Lampa.Settings.update();							
  		// 	 	},
  		// 	  onRender: function (item) {
  		// 	    setTimeout(function() {
  		//         $('div[data-children="parser"]').on('hover:enter', function(){
  		// 		  		Lampa.Settings.update();							
  		// 		    });
  		// 		    $('[data-name="jackett_url2"]').on('hover:enter', function (el){
    	// 	        Lampa.Select.render().find('.selectbox-item__title').map(function(i, item){
    	// 	          Modss.check($(item).text().toLowerCase().replace(/\./g,'_'), function(e){
    	// 	            $(item).css('color', e ? '#23ff00' : '#d10000');
    	// 	          });
    	// 	        });
      	// 	    });
  		// 		    if(Lampa.Storage.field('parser_use')) {
    	// 			    item.show();
    	// 			    if(Boolean(Modss.jack[Lampa.Storage.get('jackett_url2')])) $('.settings-param__name', item).before('<div class="settings-param__status one '+(Modss.jack[Lampa.Storage.get('jackett_url2')].ok ? "active" : "error")+'"></div>');
    	// 		      $('[data-name="jackett_url"] .settings-param__name').before('<div class="settings-param__status wait act"></div>');
    	// 		      $('.settings-param__name', item).css('color','#f3d900');
    	// 			    $('div[data-name="jackett_url2"]').insertAfter('div[data-children="parser"]');
    	// 			    Modss.check($('.settings-param__value', item).text().toLowerCase().replace(/\./g,'_'), function(e){
    	// 		        Modss.check(Lampa.Storage.get('jackett_url'));
        //           $($('.settings-param__status', item)).removeClass('active error wait').addClass(e ? 'active' : 'error');
        //         });
  		// 		    } else item.hide();
        //     }, 50);
     	//     }
  		// 	});
  		}
		Lampa.Listener.follow('full', function (e) {
			if (e.type == 'complite') {
				cards = e.data.movie;
				Modss.serialInfo(e.data.movie);
				Modss.online();
				Modss.rating_kp_imdb(e.data.movie).then(function (e) {
				  
				})['catch'](function(e){
				  {START_PRELOAD}
				});
				$('.view--torrent').addClass('selector').empty().append('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.501953 4.125 C 12.485953 4.125 3.5019531 13.11 3.5019531 24.125 C 3.5019531 32.932677 9.2467538 40.435277 17.179688 43.091797 L 17.146484 42.996094 L 7 16 L 15 14 C 17.573 20.519 20.825516 32.721688 27.728516 30.929688 C 35.781516 28.948688 28.615 16.981172 27 12.076172 L 34 11 C 38.025862 19.563024 39.693648 25.901226 43.175781 27.089844 C 43.191423 27.095188 43.235077 27.103922 43.275391 27.113281 C 43.422576 26.137952 43.501953 25.140294 43.501953 24.125 C 43.501953 13.11 34.517953 4.125 23.501953 4.125 z M 34.904297 29.314453 C 34.250297 34.648453 28.811359 37.069578 21.943359 35.517578 L 26.316406 43.763672 L 26.392578 43.914062 C 33.176993 42.923925 38.872645 38.505764 41.660156 32.484375 C 41.603665 32.485465 41.546284 32.486418 41.529297 32.486328 C 38.928405 32.472567 36.607552 31.572967 34.904297 29.314453 z"/></svg><span>' + Lampa.Lang.translate('full_torrents') + '</span>');
				$('.view--trailer').empty().append("<svg enable-background='new 0 0 512 512' id='Layer_1' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path fill='currentColor' d='M260.4,449c-57.1-1.8-111.4-3.2-165.7-5.3c-11.7-0.5-23.6-2.3-35-5c-21.4-5-36.2-17.9-43.8-39c-6.1-17-8.3-34.5-9.9-52.3   C2.5,305.6,2.5,263.8,4.2,222c1-23.6,1.6-47.4,7.9-70.3c3.8-13.7,8.4-27.1,19.5-37c11.7-10.5,25.4-16.8,41-17.5   c42.8-2.1,85.5-4.7,128.3-5.1c57.6-0.6,115.3,0.2,172.9,1.3c24.9,0.5,50,1.8,74.7,5c22.6,3,39.5,15.6,48.5,37.6   c6.9,16.9,9.5,34.6,11,52.6c3.9,45.1,4,90.2,1.8,135.3c-1.1,22.9-2.2,45.9-8.7,68.2c-7.4,25.6-23.1,42.5-49.3,48.3   c-10.2,2.2-20.8,3-31.2,3.4C366.2,445.7,311.9,447.4,260.4,449z M205.1,335.3c45.6-23.6,90.7-47,136.7-70.9   c-45.9-24-91-47.5-136.7-71.4C205.1,240.7,205.1,287.6,205.1,335.3z'/></g></svg><span>" + Lampa.Lang.translate('full_trailers') + "</span>");
			}
		});
		Lampa.Listener.follow('activity', function (e) { 
      if (e.component == 'full' && e.type == 'start') { 
        var button = Lampa.Activity.active().activity.render().find('.view--modss_online');
       if(button.length){
         cards = e.object.card;
		  	 Modss.online(button);
				 Modss.last_view(e.object.card);
       }
     } 
    });
		Lampa.Storage.listener.follow('change', function (e) {
		  //if(e.name == 'jackett_key' || e.name == 'jackett_url') Modss.check(e.value);
		});
		Lampa.Settings.listener.follow('open', function (e) {
			if (e.name == 'main') {
				if (Lampa.Settings.main().render().find('[data-component="pub_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'pub_param',
						name: 'KinoPub',
						icon: '<svg viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zM13 14.6H8.6c-.3 0-.5.2-.5.5v4.2H6V4.7h7c2.7 0 5 2.2 5 5 0 2.7-2.2 4.9-5 4.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path><path d="M13 6.8H8.6c-.3 0-.5.2-.5.5V12c0 .3.2.5.5.5H13c1.6 0 2.8-1.3 2.8-2.8.1-1.6-1.2-2.9-2.8-2.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="fork_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'fork_param',
						name: 'ForkTV',
						icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="rezka_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'rezka_param',
						name: 'HDRezka',
						icon: '<svg height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="filmix_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'filmix_param',
						name: 'Filmix',
						icon: '<svg height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_tv_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_tv_param',
						name: 'Modss-TV',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_online_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_online_param',
						name: 'Modss-Online',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				Lampa.Settings.main().update();
				Lampa.Settings.main().render().find('[data-component="modss_online_param"], [data-component="filmix"], [data-component="rezka_param"], [data-component="pub_param"], [data-component="filmix_param"], [data-component="fork_param"], [data-component="modss_tv_param"]').addClass('hide');
			}
			if (e.name == 'mods_proxy') {
				$('.settings__title').text(Lampa.Lang.translate('title_proxy') + " MODS's");
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{online_proxy_title_descr}</div>', '</div>', '</div>'].join('');
				e.body.find('[data-name="mods_proxy_all"]').before(Lampa.Lang.translate(ads));
			} else $('.settings__title').text(Lampa.Lang.translate('menu_settings'));
			if (e.name == 'fork_param') $('.settings__title').append(" ForkTV");
			if (e.name == 'filmix_param') {
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{info_filmix_descr} <span style="color: #24b4f9">filmix.ac</span></div>', '</div>', '</div>'].join('');
				e.body.find('[data-static="true"]:eq(0)').after(Lampa.Lang.translate(ads));
				$('.settings__title').append(" Filmix");
			}
			if (e.name == 'pub_param') {
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{info_pub_descr} <span style="color: #24b4f9">kino.pub</span></div>', '</div>', '</div>'].join('');
				e.body.find('[data-static="true"]:eq(0)').after(Lampa.Lang.translate(ads));
				$('.settings__title').append(" KinoPub");
			}
			if (e.name == 'modss_online_param') {
			  $('.settings__title').text("MODS's Online");
			  var title = $('[data-name="priority_balanser"] .settings-param__value', e.body);
			  title.text(title.text().split('<').shift());
			}
			if (e.name == 'settings_modss') {
			  $('.settings__title').text("MODS's ");
			  var title = $('[data-name="priority_balanser"] .settings-param__value', e.body);
			  title.text(title.text().split('<').shift());
			}
			if (e.name == 'parser') FreeJaketOpt();
		});
		if (Lampa.Manifest.app_digital >= 177) {
      Lampa.Storage.sync('my_col', 'object_object');
      Lampa.Storage.sync('fav_chns', 'object_object');
      Lampa.Storage.sync('history_web', 'object_object');
      Lampa.Storage.sync('favorite_Playlists', 'object_object');
      Lampa.Storage.sync('online_watched_last', 'object_object');
      var balansers_sync = ["filmix", "kinobase", "hdrezka", "rezka", "videocdn", "videodb", "collaps", "hdvb", "kodik", "uakino", "kinotochka", "cdnmovies", "anilibria", "videoapi", "bazon", "pub"];
      balansers_sync.forEach(function (name) {
        Lampa.Storage.sync('online_choice_' + name, 'object_object');
      });
    }
		function add() {
      Modss.init();
      $('body').append(Lampa.Template.get('hdgo_style', {}, true));
			$('body').append(Lampa.Template.get('mods_radio_style', {}, true));
			$('body').append(Lampa.Template.get('modss_style', {}, true));
			$('body').append(Lampa.Template.get('modss_online_css', {}, true));
			//	Lampa.Storage.set('guide', '');
			setTimeout(function () {
				//if (window.innerHeight > 700 && Lampa.Storage.field('guide') == 'undefined') guide();
			}, 3000);
			Lampa.SettingsApi.addComponent({
				component: 'settings_modss',
				name: "MODS's ",
				icon: "<svg viewBox='0 0 24 24' xml:space='preserve' xmlns='https://www.w3.org/2000/svg'><path d='M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zm-2.1 16.4c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1V8.4l-3.2 5.4-.1.1-.1.1h-.6s-.1 0-.1-.1l-.1-.1-3-5.4v8.5h1c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1V7.1h-1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1.7c.1 0 .2.1.2.2l3.7 6.2 3.7-6.2.2-.2h1.7c.3 0 .5.2.5.5s-.2.5-.5.5h-1v9.8h1z' fill='#ffffff' class='fill-000000'></path></svg>"
			});
			// <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" aria-labelledby=\"videoIconTitle\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" color=\"#000\"><path d=\"m18 12-9 4.9V7z\"/><circle cx=\"12\" cy=\"12\" r=\"10\"/></svg>
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'settings_modss',
	// 			param: {
	// 				name: 'mods_status',
	// 				type: 'title'
	// 			},
	// 			field: {
	// 				name: '<div class="settings-folder" style="padding:0!important"><div style="width:3em;height:2.3em;margin-top:-.5em;padding-right:.5em"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z"></path><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 5.5v7h2v-7h-2zm-.285 0H8.601l-1.497 4.113L5.607 8.5H3.493l2.611 6.964h2L10.715 8.5zm5.285 5h1.5a2.5 2.5 0 1 0 0-5H14v7h2v-2zm0-2v-1h1.5a.5.5 0 1 1 0 1H16z" fill="#ffffff" class="fill-000000"></path></svg></div><div style="font-size:1.3em">Не подключён</div></div>',
	// 				description: 'Для активации <b style="color: #ffd402;">Vip</b> статуса перейдите в телеграм бот <span style="color: #24b4f9;">@modssmy_bot</span><br>По вопросам <span style="color: #24b4f9;">@modss_group</span>'
	// 			}
	// 		});
			
    //   Lampa.SettingsApi.addParam({
	// 			component: 'settings_modss',
	// 			param: {
	// 				name: 'mods_device',
	// 				type: 'title'
	// 			},
	// 			field: {
	// 				name: ' 💻 Macintosh'
	// 			}
	// 		});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_password',
					type: 'static', //доступно select,input,trigger,title,static
					placeholder: Lampa.Lang.translate('placeholder_password'),
					values: '',
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_parent_contr'),
					description: Lampa.Lang.translate('placeholder_password')
				},
				onRender: function (item) {
					function pass() {
						Lampa.Input.edit({
							value: '' + Lampa.Storage.get('mods_password') + '',
							free: true,
							nosave: true
						}, function (t) {
							Lampa.Storage.set('mods_password', t);
							Lampa.Settings.update();
						});
					}
					item.on('hover:enter', function () {
						if (Lampa.Storage.get('mods_password')) Lampa.Input.edit({
							value: '',
							title: 'Enter the old password',
							free: true,
							nosave: true
						}, function (t) {
							if (t == Lampa.Storage.get('mods_password')) pass();
							else Lampa.Noty.show('Incorrect password');
						});
						else pass();
					});
					if (Lampa.Storage.get('mods_password')) item.find('.settings-param__descr').text('Change password');
					else item.find('.settings-param__descr').text(Lampa.Lang.translate('placeholder_password'));
				},
				onChange: function (value) {
					if (value) $('body').find('.settings-param__descr').text('Change password');
					else $('body').find('.settings-param__descr').text(Lampa.Lang.translate('placeholder_password'));
				}
			});
			//Add-ons
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_onl',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('params_pub_on') + ' ' + Lampa.Lang.translate('modss_title_online').toLowerCase(),
					description: Lampa.Lang.translate('onl_enable_descr')
				},
				onChange: function (value) {
				  if(cards) Modss.online('delete');
					Lampa.Settings.update();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_use_json',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_pub_on') + ' ' + Lampa.Lang.translate('use_json_enable').toLowerCase(),
					description: Lampa.Lang.translate('use_json_enable_descr')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_onl')) {
						item.show();
					} else item.hide();
					Lampa.Controller.enabled().controller.back = function () {
						if (Lampa.Activity.active().component == 'aston_modss_online') {
							Lampa.Activity.replace(Lampa.Activity.active());
						} else {
							Lampa.Controller.toggle('content');
						}
					};
				},
				onChange: function (value) {
					if (value == 'true') {
						var url = Lampa.Storage.get('mods_use_json_url');

						if (typeof url === 'string' && url.indexOf('http') !== -1){
							var torrent_net = new Lampa.Reguest();
							torrent_net.timeout(10000);
							torrent_net.silent(url + '?v=' + Math.random(), function (json) {
								if (Lampa.Storage.field('mods_use_json')) {
									var hasValidConfig = Object.keys(json).length > 0 && (json.hasOwnProperty("rule") || json.hasOwnProperty("tg_channel") || json.hasOwnProperty("custom_function") || json.hasOwnProperty("resource_site"));
									if (hasValidConfig) {
										extract_rule = json;
										if (extract_rule.hasOwnProperty("rule")) {
											var filteredRule = extract_rule.rule.filter(function (fp) {
												return fp.available === true;
											});
							
											extract_rule.rule = filteredRule;
										}
										doregjson = extract_rule;
										$('[data-name="mods_use_json_url').find('.settings-param__descr').text('√ 配置链接可访问');
									} else {
										// extract_rule = inner_extract_rule;
										$('[data-name="mods_use_json_url').find('.settings-param__descr').text('！链接中的配置内容格式不正确');
									}
								};
								
								setTimeout(function () {
									$('div[data-name="mods_use_json_url"]').append('<div class="settings-param__status one"></div>')
									$('div[data-name="mods_use_json_url"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
								}, 100);
							}, function (a, c) {
								// extract_rule = inner_extract_rule;
								Lampa.Noty.show(torrent_net.errorDecode(a, c) + ' - ' + url);
								$('[data-name="mods_use_json_url').find('.settings-param__descr').text('！配置链接不可访问');
								setTimeout(function () {
									$('div[data-name="mods_use_json_url"]').append('<div class="settings-param__status one"></div>')
									$('div[data-name="mods_use_json_url"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}, 100);
							}, false, {
								dataType: 'json'
							});
						} else {
							if (url !== '') {
								setTimeout(function () {
									$('[data-name="mods_use_json_url').find('.settings-param__descr').text('！配置链接不可访问');
									$('div[data-name="mods_use_json_url"]').append('<div class="settings-param__status one"></div>')
									$('div[data-name="mods_use_json_url"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}, 100);
							}
						}
					} else {
						extract_rule = inner_extract_rule;
						if (extract_rule.hasOwnProperty("rule")) {
							var filteredRule = extract_rule.rule.filter(function (fp) {
								return fp.available === true;
							});
			
							extract_rule.rule = filteredRule;
						}
						doregjson = extract_rule;
					}
					Lampa.Settings.update();
					// if (Lampa.Activity.active().component == 'aston_modss_online'){
					// 	Lampa.Activity.replace(Lampa.Activity.active());
					// }
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_use_json_url',
					type: 'input', //доступно select,input,trigger,title,static
					values: '',
					default: '',
					placeholder: Lampa.Lang.translate('use_json_url_placeholder')
				},
				field: {
					name: Lampa.Lang.translate('use_json_url').toLowerCase(),
					description: Lampa.Lang.translate('use_json_url_descr')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_use_json')) {
						if (Lampa.Storage.field('mods_onl')) {
							item.show();
						} else {
							item.hide();
						}
					} else item.hide();
					Lampa.Controller.enabled().controller.back = function () {
						if (Lampa.Activity.active().component == 'aston_modss_online') {
							Lampa.Activity.replace(Lampa.Activity.active());
						} else {
							Lampa.Controller.toggle('content');
						}
					};
				},
				onChange: function (value) {
					if (Lampa.Storage.field('mods_use_json')) {
						var url = value;
							if (typeof url === 'string' && url.indexOf('http') !== -1){
							var torrent_net = new Lampa.Reguest();
							torrent_net.timeout(10000);
							torrent_net.silent(url + '?v=' + Math.random(), function (json) {
								if (Lampa.Storage.field('mods_use_json')) {
									var hasValidConfig = Object.keys(json).length > 0 && (json.hasOwnProperty("rule") || json.hasOwnProperty("tg_channel") || json.hasOwnProperty("custom_function") || json.hasOwnProperty("resource_site"));
									if (hasValidConfig) {
										extract_rule = json;
										var filteredRule = extract_rule.rule.filter(function (fp) {
											return fp.available === true;
										});
							
										extract_rule.rule = filteredRule;
										doregjson = extract_rule;
										$('[data-name="mods_use_json_url').find('.settings-param__descr').text('√ 配置链接可访问');
										// if (Lampa.Activity.active().component == 'aston_modss_online'){
										// 	Lampa.Activity.replace(Lampa.Activity.active());
										// }
									} else {
										// extract_rule = inner_extract_rule;
										$('[data-name="mods_use_json_url').find('.settings-param__descr').text('！链接中的配置内容格式不正确');
									}
								};
								setTimeout(function () {
									$('div[data-name="mods_use_json_url"]').append('<div class="settings-param__status one"></div>')
									$('div[data-name="mods_use_json_url"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
								}, 100);
							}, function (a, c) {
								// extract_rule = inner_extract_rule;
								Lampa.Noty.show(torrent_net.errorDecode(a, c) + ' - ' + url);
								$('[data-name="mods_use_json_url').find('.settings-param__descr').text('！配置链接不可访问');
								setTimeout(function () {
									$('div[data-name="mods_use_json_url"]').append('<div class="settings-param__status one"></div>')
									$('div[data-name="mods_use_json_url"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}, 100);
							}, false, {
								dataType: 'json'
							});
						} else {
							if (url !== '') {
								setTimeout(function () {
									$('[data-name="mods_use_json_url').find('.settings-param__descr').text('！配置链接不可访问');
									$('div[data-name="mods_use_json_url"]').append('<div class="settings-param__status one"></div>')
									$('div[data-name="mods_use_json_url"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}, 100);
							}
						}
					}
					Lampa.Settings.update();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'modss_online_param',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg></div><div style="font-size:1.3em">在线观看</div></div>'
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_onl')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function () {
						Lampa.Settings.create('modss_online_param');
						Lampa.Controller.enabled().controller.back = function(){
         		  Lampa.Settings.create('settings_modss');
            }
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'priority_balanser',
					type: 'select', //доступно select,input,trigger,title,static
					values: Modss.balansers(),
					default: Modss.balansPrf
				},
				field: {
					name: Lampa.Lang.translate('title_prioriry_balanser'),
					description: Lampa.Lang.translate('title_prioriry_balanser_descr')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_onl')) item.show(); 
					else item.hide();
				}, 
				onChange: function (values) {
				  var title = $('body').find('[data-name="priority_balanser"] .settings-param__value');
			    title.text(title.text().split('<').shift());
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'online_but_first',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_online_first_but'),
				},
				onChange: function (item) {
					Lampa.Storage.set('full_btn_priority', '');
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_onl')) item.show(); 
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'online_continued',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_online_continued'),
					description: Lampa.Lang.translate('title_online_descr')
				},
				onRender: function (item) {
					if (Lampa.Storage.field('mods_onl')) item.show(); 
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'online_mod_alist',
					type: 'input', //доступно select,input,trigger,title,static
					values: '',
					placeholder: Lampa.Lang.translate('title_xiaoya_placeholder'),
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_xiaoya'),
					description: Lampa.Lang.translate('title_xiaoya_descr')
				},
				onChange: function (values) {
					if (Lampa.Storage.field('online_mod_alist')) {
						var url = values;
							if (typeof url === 'string'){
							var torrent_net = new Lampa.Reguest();
							torrent_net.timeout(10000);
							torrent_net.silent(Lampa.Utils.checkHttp(url) + '?v=' + Math.random(), function (json) {
								$('[data-name="online_mod_alist').find('.settings-param__descr').text('√ 链接可访问');
								setTimeout(function () {
									$('div[data-name="online_mod_alist"]').append('<div class="settings-param__status one"></div>')
									$('div[data-name="online_mod_alist"]').find('.settings-param__status').removeClass('active error wait').addClass('active')
								}, 100);
							}, function (a, c) {
								Lampa.Noty.show(torrent_net.errorDecode(a, c) + ' - ' + url);
								$('[data-name="online_mod_alist').find('.settings-param__descr').text('！链接不可访问');
								setTimeout(function () {
									$('div[data-name="online_mod_alist"]').append('<div class="settings-param__status one"></div>')
									$('div[data-name="online_mod_alist"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}, 100);
							}, false, {
								dataType: 'text'
							});
						} else {
							if (url !== '') {
								setTimeout(function () {
									$('[data-name="online_mod_alist').find('.settings-param__descr').text('！链接不可访问');
									$('div[data-name="online_mod_alist"]').append('<div class="settings-param__status one"></div>')
									$('div[data-name="online_mod_alist"]').find('.settings-param__status').removeClass('active error wait').addClass('error')
								}, 100);
							}
						}
					}
					Lampa.Settings.update();
				}
			});
			// Lampa.SettingsApi.addParam({
			// 	component: 'modss_online_param',
			// 	param: {
			// 		name: 'online_dash',
			// 		type: 'trigger', //доступно select,input,trigger,title,static
			// 		default: false
			// 	},
			// 	field: {
			// 		name: Lampa.Lang.translate('online_dash'), 
			// 		description: Lampa.Lang.translate('modss_balanser') + ' Collaps'
			// 	},
			// 	onRender: function (item) {
			// 		if (Lampa.Storage.field('mods_onl')) item.show(); 
			// 		else item.hide();
			// 	}
			// });
	// 		//Filmix
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'modss_online_param',
	// 			param: {
	// 				name: 'filmix_param',
	// 				type: 'static', //доступно select,input,trigger,title,static
	// 				default: true
	// 			},
	// 			field: {
	// 				name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg height="26" width="26" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg></div><div style="font-size:1.3em">Filmix</div></div>',
	// 				description: ' '
	// 			},
	// 			onRender: function (item) {
	// 				if (Lampa.Storage.field('mods_onl')) {
	// 					item.show();
	// 					$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
	// 					Filmix.checkPro(Filmix.token);
	// 					Filmix.showStatus(item);
	// 				} else item.hide();
	// 				item.on('hover:enter', function () {
	// 					Lampa.Settings.create('filmix_param');
	// 					Lampa.Controller.enabled().controller.back = function(){
    //      		  Lampa.Settings.create('modss_online_param');
    //         }
	// 				});
	// 			}
	// 		});
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'filmix_param',
	// 			param: {
	// 				name: 'filmix_status',
	// 				type: 'title', //доступно select,input,trigger,title,static
	// 				default: ''
	// 			},
	// 			field: {
	// 				name: '<b style="color:#fff">' + Lampa.Lang.translate('title_status') + '</b>',
	// 				description: ' '
	// 			},
	// 			onRender: function (item) {
	// 				$('.settings-param__descr', item).before('<div class="settings-param__status"></div>');
	// 				Filmix.showStatus(item);
	// 			}
	// 		});
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'filmix_param',
	// 			param: {
	// 				name: 'filmix_token',
	// 				type: 'input', //доступно select,input,trigger,title,static
	// 				values: '',
	// 				placeholder: Lampa.Lang.translate('filmix_param_placeholder'),
	// 				default: ''
	// 			},
	// 			field: {
	// 				name: Lampa.Lang.translate('filmix_param_add_title'),
	// 				description: Lampa.Lang.translate('filmix_param_add_descr')
	// 			},
	// 			onChange: function (value) {
	// 				if (value) {
	// 				  Filmix.checkPro(value, true);
	// 				  Filmix.token = value;
	// 				} else {
	// 					Lampa.Storage.set("filmix_status", {});
	// 				  Filmix.token = value;
	// 					Filmix.showStatus();
	// 				}
	// 			}
	// 		});
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'filmix_param',
	// 			param: {
	// 				name: 'filmix_add',
	// 				type: 'static', //доступно select,input,trigger,title,static
	// 				default: ''
	// 			},
	// 			field: {
	// 				name: Lampa.Lang.translate('filmix_params_add_device') + ' Filmix',
	// 				description: ''
	// 			},
	// 			onRender: function (item) {
	// 				item.on('hover:enter', function () {
	// 					Filmix.add_new();
	// 				});
	// 			}
	// 		});
	// 		//Pub
    //   Lampa.SettingsApi.addParam({
    //   	component: 'modss_online_param',
    //   	param: {
    //   		name: 'pub_param',
    //   		type: 'static', //доступно select,input,trigger,title,static
    //   		default: true
    //   	},
    //   	field: {
    //   		name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg height="26" width="26" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zM13 14.6H8.6c-.3 0-.5.2-.5.5v4.2H6V4.7h7c2.7 0 5 2.2 5 5 0 2.7-2.2 4.9-5 4.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path><path d="M13 6.8H8.6c-.3 0-.5.2-.5.5V12c0 .3.2.5.5.5H13c1.6 0 2.8-1.3 2.8-2.8.1-1.6-1.2-2.9-2.8-2.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path></svg></div><div style="font-size:1.3em">KinoPub</div></div>',
    //   		description: Lampa.Lang.translate('filmix_nodevice')
    //   	},
    //   	onRender: function (item) {
    //   		if (Lampa.Storage.field('mods_onl')) {
    //   			item.show();
    //   			$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
    //   			Pub.userInfo(item, true);
    //   		} else item.hide();
    //   		item.on('hover:enter', function () {
    //   			Lampa.Settings.create('pub_param');
    //   			Lampa.Controller.enabled().controller.back = function(){
    //      		  Lampa.Settings.create('modss_online_param');
    //         };
    //   		});
    //   	}
    //   });
    // 	Lampa.SettingsApi.addParam({
    // 		component: 'pub_param',
    // 		param: {
    // 			name: 'pub_auth',
    // 			type: 'static' //доступно select,input,trigger,title,static
    // 		},
    // 		field: {
    // 			name: ' ',
    // 			description: ' ',
    // 		},
    // 		onRender: function (item) {
    // 			$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
    // 			Pub.userInfo(item);
    // 		}
    // 	});
    // 	Lampa.SettingsApi.addParam({
    // 		component: 'pub_param',
    // 		param: {
    // 			name: 'pub_auth_add',
    // 			type: 'static' //доступно select,input,trigger,title,static
    // 		},
    // 		field: {
    // 			name: Lampa.Lang.translate('filmix_params_add_device') + ' KinoPub',
    // 			description: Lampa.Lang.translate('pub_auth_add_descr')
    // 		},
    // 		onRender: function (item) {
    // 			item.on('hover:enter', function () {
    // 				Pub.Auth_pub();
    // 			});
    // 		}
    // 	});
    	// Lampa.SettingsApi.addParam({
    	// 	component: 'modss_online_param',
    	// 	param: {
    	// 		name: 'pub_speed',
    	// 		type: 'static', //доступно select,input,trigger,title,static
    	// 	},
    	// 	field: {
    	// 		name: 'SpeedTest',
    	// 		description: 'Choosing the Best Server Pub'
    	// 	},
    	// 	onRender: function (item) {
    	// 		item.on('hover:enter', function(){
    	// 		  Lampa.Iframe.show({
        //       url: 'http://zamerka.com/',
        //       onBack: function onBack() {
        //         Lampa.Controller.toggle('settings_component');
        //       }
        //     });
    	// 		});
    	// 		if (!Lampa.Storage.field('mods_onl')) item.hide();
    	// 	}
    	// });
    	// Lampa.SettingsApi.addParam({
    	// 	component: 'pub_param',
    	// 	param: {
    	// 		name: 'pub_parametrs',
    	// 		type: 'static' //доступно select,input,trigger,title,static
    	// 	},
    	// 	field: {
    	// 		name: Lampa.Lang.translate('title_settings'),
    	// 		description: Lampa.Lang.translate('descr_pub_settings')
    	// 	},
    	// 	onRender: function (item) {
    	// 		if (!Lampa.Storage.get('logined_pub')) item.hide();
    	// 		item.on('hover:enter', function () {
    	// 			Pub.info_device();
    	// 		});
    	// 	}
    	// });
    	// Lampa.SettingsApi.addParam({
    	// 	component: 'pub_param',
    	// 	param: {
    	// 		name: 'pub_source',
    	// 		type: 'static' //доступно select,input,trigger,title,static
    	// 	},
    	// 	field: {
    	// 		name: Lampa.Lang.translate('params_pub_add_source'),
    	// 		description: Lampa.Lang.translate('params_pub_add_source_descr')
    	// 	},
    	// 	onRender: function (item) {
    	// 		item.on('hover:enter', function () {
    	// 			Lampa.Noty.show(Lampa.Lang.translate('pub_source_add_noty'));
    	// 			Lampa.Storage.set('source', 'pub');
    	// 		});
    	// 	}
    	// });
    	// Lampa.SettingsApi.addParam({
		// 		component: 'pub_param',
		// 		param: {
		// 			name: 'pub_del_device',
		// 			type: 'static' //доступно select,input,trigger,title,static
		// 		},
		// 		field: {
		// 			name: Lampa.Lang.translate('params_pub_dell_device'),
		// 			description: Lampa.Lang.translate('params_pub_dell_descr')
		// 		},
		// 		onRender: function (item) {
		// 			item.on('hover:enter', function () {
		// 				Pub.delete_device(function () {
		// 			    Lampa.Storage.set('pro_pub', false);
		// 					Lampa.Settings.create('pub_param');
		// 				});
		// 			});
		// 			if (!Lampa.Storage.get('pro_pub', false)) item.hide();
		// 		}
		// 	});
    	// Lampa.SettingsApi.addParam({
    	// 	component: 'pub_param',
    	// 	param: {
    	// 		name: 'pub_clear_tocken',
    	// 		type: 'static' //доступно select,input,trigger,title,static
    	// 	},
    	// 	field: {
    	// 		name: Lampa.Lang.translate('params_pub_clean_tocken')
    	// 	},
    	// 	onRender: function (item) {
    	// 		item.on('hover:enter', function () {
    	// 			Lampa.Storage.set('pub_access_token', Pub.token);
    	// 			Lampa.Storage.set('logined_pub', false);
    	// 			Lampa.Noty.show('Cleared');
    	// 		  Lampa.Settings.update();
    	// 		});
    	// 	}
    	// });

    //   Lampa.SettingsApi.addParam({
	// 			component: 'settings_modss',
	// 			param: {
	// 				name: 'mods_title',
	// 				type: 'title', //доступно select,input,trigger,title,static
	// 				default: true
	// 			},
	// 			field: {
	// 				name: Lampa.Lang.translate('title_addons')
	// 			}
	// 		});
      
	// 		//ForkTV
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'settings_modss',
	// 			param: {
	// 				name: 'mods_fork',
	// 				type: 'trigger', //доступно select,input,trigger,title,static
	// 				default: false
	// 			},
	// 			field: {
	// 				name: Lampa.Lang.translate('params_pub_on') + ' ForkTV',
	// 				description: Lampa.Lang.translate('fork_enable_descr')
	// 			},
	// 			onChange: function (value) {
	// 				if (value) ForkTV.check_forktv('', true);
	// 				Lampa.Settings.update();
	// 			}
	// 		});
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'settings_modss',
	// 			param: {
	// 				name: 'fork_param',
	// 				type: 'static', //доступно select,input,trigger,title,static
	// 				default: true
	// 			},
	// 			field: {
	// 				name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-alpha-f-box-outline" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9,7H15V9H11V11H14V13H11V17H9V7M3,5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5M5,5V19H19V5H5Z" /></svg></div><div style="font-size:1.3em">ForkTV</div></div>',
	// 				description: Lampa.Lang.translate('filmix_nodevice')
	// 			},
	// 			onRender: function (item) {
	// 				if (Lampa.Storage.field('mods_fork')) {
	// 					item.show();
	// 					$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
	// 					ForkTV.check_forktv(item, true);
	// 				} else item.hide();
	// 				item.on('hover:enter', function () {
	// 					Lampa.Settings.create('fork_param');
	// 					Lampa.Controller.enabled().controller.back = function(){
    //      		  Lampa.Settings.create('settings_modss');
    //         }
	// 				});
	// 			}
	// 		});
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'fork_param',
	// 			param: {
	// 				name: 'forktv_url',
	// 				type: 'static' //доступно select,input,trigger,title,static
	// 			},
	// 			field: {
	// 				name: 'http://no_save.forktv.me',
	// 				description: Lampa.Lang.translate('filmix_nodevice')
	// 			},
	// 			onRender: function (item) {
	// 				$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
	// 				ForkTV.check_forktv(item);
	// 			}
	// 		});
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'fork_param',
	// 			param: {
	// 				name: 'ForkTV_add',
	// 				type: 'static', //доступно select,input,trigger,title,static
	// 				default: ''
	// 			},
	// 			field: {
	// 				name: Lampa.Storage.get('ForkTv_cat') ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
	// 				description: ''
	// 			},
	// 			onRender: function (item) {
	// 				if (Lampa.Storage.get('forktv_auth')) {
	// 					item.show();
	// 				} else item.hide();
	// 				item.on('hover:enter', function () {
	// 					ForkTV.check_forktv(item);
	// 				});
	// 			}
	// 		});
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'fork_param',
	// 			param: {
	// 				name: 'ForkTV_clear',
	// 				type: 'static', //доступно select,input,trigger,title,static
	// 				default: ''
	// 			},
	// 			field: {
	// 				name: Lampa.Lang.translate('title_fork_clear'),
	// 				description: Lampa.Lang.translate('title_fork_clear_descr')
	// 			},
	// 			onRender: function (item) {
	// 				if (Lampa.Storage.get('forktv_auth')) {
	// 					item.show();
	// 				} else item.hide();
	// 				item.on('hover:enter', function () {
	// 					Lampa.Storage.set('ForkTv_cat', '');
	// 					Lampa.Noty.show(Lampa.Lang.translate('title_fork_clear_noty'));
	// 				});
	// 			}
	// 		});
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'fork_param',
	// 			param: {
	// 				name: 'ForkTV_clearMac',
	// 				type: 'static', //доступно select,input,trigger,title,static
	// 				default: ''
	// 			},
	// 			field: {
	// 				name: Lampa.Lang.translate('title_fork_reload_code'),
	// 				description: ' '
	// 			},
	// 			onRender: function (item) {
	// 				item.on('hover:enter', function () {
	// 					ForkTV.updMac(item);
	// 				});
	// 			}
	// 		});
	// 		//Radio
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'settings_modss',
	// 			param: {
	// 				name: 'mods_radio',
	// 				type: 'trigger', //доступно select,input,trigger,title,static
	// 				default: false
	// 			},
	// 			field: {
	// 				name: Lampa.Lang.translate('params_radio_enable'),
	// 				description: Lampa.Lang.translate('params_radio_enable_descr')
	// 			},
	// 			onChange: function (value) {
	// 				Modss.radio();
	// 			}
	// 		});
	// 		//Collection
	// 		Lampa.SettingsApi.addParam({
	// 			component: 'settings_modss',
	// 			param: {
	// 				name: 'mods_collection',
	// 				type: 'trigger', //доступно select,input,trigger,title,static
	// 				default: false
	// 			},
	// 			field: {
	// 				name: Lampa.Lang.translate('params_pub_on') + ' ' + Lampa.Lang.translate('menu_collections').toLowerCase(),
	// 				description: Lampa.Lang.translate('params_collections_descr')
	// 			},
	// 			onChange: function (value) {
	// 				if (value == 'true') Modss.collections();
	// 				else $('body').find('.menu [data-action="collection"]').remove();
	// 			}
	// 		});
			//Styles
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_title',
					type: 'title', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('params_styles_title')
				}
			});
			// Lampa.SettingsApi.addParam({
			// 	component: 'settings_modss',
			// 	param: {
			// 		name: 'mods_snow',
			// 		type: 'trigger', //доступно select,input,trigger,title,static
			// 		default: false
			// 	},
			// 	field: {
			// 		name: 'Snow'
			// 	},
			// 	onChange: function (value) {
			// 		Modss.snow();
			// 	}
			// });
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_rating',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_enable_rating'),
					description: Lampa.Lang.translate('title_enable_rating_descr')
				},
				onChange: function (value) {
				  if (value == 'true') {
  				  $('body').find('.rate--kp, .rate--imdb').removeClass('hide');
  				  Modss.rating_kp_imdb(cards);
  				} else $('body').find('.rate--kp, .rate--imdb').addClass('hide');
  			}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_serial_info',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_info_serial'),
					description: Lampa.Lang.translate('title_info_serial_descr')
				},
				onChange: function (value) {
					if (value == 'true' && $('body').find('.full-start__poster').length) Modss.serialInfo(cards);
					else $('body').find('.files__left .time-line, .card--last_view, .card--new_seria').remove();
				}
			});
			if (/iPhone|iPad|iPod|android|x11/i.test(navigator.userAgent) || (Lampa.Platform.is('android') && window.innerHeight < 1080)) {
				Lampa.SettingsApi.addParam({
					component: 'settings_modss',
					param: {
						name: 'mods_butt_back',
						type: 'trigger', //доступно select,input,trigger,title,static
						default: false
					},
					field: {
						name: Lampa.Lang.translate('title_add_butback'),
						description: Lampa.Lang.translate('title_add_butback_descr')
					},
					onChange: function (value) {
						Lampa.Settings.update();
						if (value == 'true') Modss.buttBack();
						else $('body').find('.elem-mobile-back').remove();
					}
				});
				Lampa.SettingsApi.addParam({
					component: 'settings_modss',
					param: {
						name: 'mods_butt_pos',
						type: 'select', //доступно select,input,trigger,title,static
						values: {
							right: Lampa.Lang.translate('buttback_right'),
							left: Lampa.Lang.translate('buttback_left')
						},
						default: 'right'
					},
					field: {
						name: Lampa.Lang.translate('title_butback_pos'),
					},
					onRender: function (item) {
						if (Lampa.Storage.field('mods_butt_back')) item.show();
						else item.hide();
					},
					onChange: function (value) {
						Modss.buttBack(value);
					}
				});
			}
		  //Proxy mods
		// 	Lampa.SettingsApi.addComponent({
		// 		component: 'mods_proxy',
		// 		name: Lampa.Lang.translate('title_proxy') + " MODS's",
		// 		icon: '<svg fill=none height=46 viewBox="0 0 42 46"xmlns=http://www.w3.org/2000/svg><rect height=18 rx=1.5 width=39 y=26.5 x=1.5 stroke=white stroke-width=3 /><circle cx=9.5 cy=35.5 fill=white r=3.5 /><circle cx=26.5 cy=35.5 fill=white r=2.5 /><circle cx=32.5 cy=35.5 fill=white r=2.5 /><circle cx=21.5 cy=5.5 fill=white r=5.5 /><rect height=3 rx=1.5 width=11 y=4 fill=white x=31 /><rect height=3 rx=1.5 width=11 y=4 fill=white /><rect height=7 rx=1.5 width=3 y=14 fill=white x=20 /></svg>'
		// 	});
		// 	Lampa.SettingsApi.addParam({
		// 		component: 'mods_proxy',
		// 		param: {
		// 			name: 'mods_proxy_all',
		// 			type: 'input', //доступно select,input,trigger,title,static
		// 			values: '',
		// 			default: '',
		// 			placeholder: Lampa.Lang.translate('online_proxy_placeholder')
		// 		},
		// 		field: {
		// 			name: Lampa.Lang.translate('online_proxy_title'),
		// 			description: Lampa.Lang.translate('online_proxy_descr')
		// 		}
		// 	});
		//   ['HDRezka', 'Collaps'].forEach(function (itm) {
		// 		Lampa.SettingsApi.addParam({
		// 			component: 'mods_proxy',
		// 			param: {
		// 				name: 'mods_proxy_' + itm.toLowerCase(),
		// 				type: 'select', //доступно select,input,trigger,title,static
		// 				values: {
		// 					on: Lampa.Lang.translate('params_pub_on'),
		// 					off: Lampa.Lang.translate('params_pub_off'),
		// 					url: Lampa.Lang.translate('online_proxy_url')
		// 				},
		// 				default: 'off'
		// 			},
		// 			field: {
		// 				name: itm,
		// 				description: Lampa.Storage.get('onl_mods_proxy_' + itm.toLowerCase()) || ' '
		// 			},
		// 			onRender: function (item) {
		// 				var url = Lampa.Storage.get('onl_mods_proxy_' + itm.toLowerCase());
		// 				if (url.length > 0) item.find('.settings-param__descr').text(url);
		// 				if (url.length == 0) item.find('.settings-param__descr').addClass('hide');
		// 				//вызывается когда срабатывает рендер параметра
		// 			},
		// 			onChange: function (value) {
		// 				if (value == 'url') {
		// 					var name = itm.toLowerCase();
		// 					Lampa.Input.edit({
		// 						value: Lampa.Storage.get('onl_mods_proxy_' + name) || '',
		// 					}, function (t) {
		// 						if (t !== '') {
		// 							Lampa.Storage.set('onl_mods_proxy_' + name, t);
		// 							$('[data-name="mods_proxy_' + name).find('.settings-param__descr').removeClass('hide').text(t);
		// 						} else if (t == '') {
		// 							Lampa.Storage.set('mods_proxy_' + name, 'off');
		// 							Lampa.Storage.set('onl_mods_proxy_' + name, '');
		// 							$('[data-name="mods_proxy_' + name + '"]').find('.settings-param__descr').addClass('hide').text('');
		// 						}
		// 					});
		// 				}
		// 			}
		// 		});
		// 	});
			
			//Close_app 
			if (Lampa.Platform.is('android')) {
				Lampa.SettingsApi.addComponent({
					component: 'mods_exit',
					name: Lampa.Lang.translate('title_close_app'),
					icon: '<svg data-name="Layer 1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><rect height="46" rx="4" ry="4" width="46" x="1" y="1" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" class="stroke-1d1d1b"></rect><path d="m12 12 24 24M12 36l24-24" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" class="stroke-1d1d1b"></path></svg>'
				});
				Lampa.SettingsApi.addParam({
					component: 'mods_exit',
					param: {
						name: 'close_app',
						type: 'static', //доступно select,input,trigger,title,static
						default: true
					},
					field: {
						name: ''
					},
					onRender: function (item) {
						Lampa.Android.exit();
					}
				});
			}
			FreeJaketOpt();
		}
		
		if (window.appready) add();else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') add();
      });
    }
		
    // function url$1(u) {
	// 		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	// 		if (params.genres) u = add$4(u, 'genre=' + params.genres);
	// 		if (params.page) u = add$4(u, 'page=' + params.page);
	// 		if (params.query) u = add$4(u, 'q=' + params.query);
	// 		if (params.type) u = add$4(u, 'type=' + params.type);
	// 		if (params.field) u = add$4(u, 'field=' + params.field);
	// 		if (params.id) u = add$4(u, 'actor=' + params.id);
	// 		if (params.perpage) u = add$4(u, 'perpage=' + params.perpage);
	// 		u = add$4(u, 'access_token=' + Pub.token);
	// 		if (params.filter) {
	// 			for (var i in params.filter) {
	// 				u = add$4(u, i + '=' + params.filter[i]);
	// 			}
	// 		}
	// 		return Pub.baseurl + u;
	// 	}
	// 	function add$4(u, params) {
	// 		return u + (/\?/.test(u) ? '&' : '?') + params;
	// 	}
	// 	function get$6(method, call) {
	// 		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	// 		var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
	// 		var onerror = arguments.length > 3 ? arguments[3] : undefined;
	// 		var u = url$1(method, params);
	// 		Pub.network.silent(u, function (json) {
	// 			json.url = method;
	// 			oncomplite(json);
	// 		}, onerror);
	// 	}
	// 	function tocard(element) {
	// 		return {
	// 			url: '',
	// 			id: element.id,
	// 			type: element.type,
	// 			title: element.title.split('/')[0],
	// 			promo_title: element.title.split('/')[0],
	// 			original_title: element.title.split('/')[1] || element.title,
	// 			release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
	// 			first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year : '',
	// 			vote_averagey: parseFloat((element.imdb_rating || 0) + '').toFixed(1),
	// 			vote_average: element.imdb_rating || 0,
	// 			poster: element.posters.big,
	// 			cover: element.posters.wide,
	// 			background_image: element.posters.wide,
    //     imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
    //     kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
	// 			year: element.year,
	// 			years: element.years
	// 		};
	// 	}
	// 	function list$2(params, oncomplite, onerror) {
	// 		var url = url$1('v1/items', params, params.type = type);
	// 		if (!params.genres) url = url$1(params.url, params);
	// 		Pub.network["native"](url, function (json) {
	// 			var items = [];
	// 			if (json.items) {
	// 				json.items.forEach(function (element) {
	// 					items.push(tocard(element));
	// 				});
	// 			}
	// 			oncomplite({
	// 				results: items,
	// 				page:json.pagination.current,
	// 				total_pages: json.pagination.total
	// 			});
	// 		}, onerror);
	// 	}
	// 	function main$2(params, oncomplite, onerror) {
	// 		var status = new Lampa.Status(9);
	// 		status.onComplite = function () {
	// 			var fulldata = [];
	// 			var data = status.data;
	// 			for (var i = 1; i <= 9; i++) {
	// 				var ipx = 's' + i;
	// 				if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
	// 			}
	// 			if (fulldata.length) oncomplite(fulldata);
	// 			else onerror();
	// 		};
	// 		var append = function append(title, name, json) {
	// 			json.title = title;
	// 			var data = [];
	// 			json.items.forEach(function (element) {
	// 				data.push(tocard(element));
	// 			});
	// 			if(name == 's1' || name == 's6') {
	// 			  json.wide = true;
	// 			  json.small = true;
	// 			}
	// 			if(name == 's2') {
	// 			  data.forEach(function (el){
	// 			    el.poster = el.cover;
	// 			  });
	// 			  json.collection = true;
	// 			  json.line_type  = 'collection';
	// 			}
	// 			json.results = data;
	// 			status.append(name, json);
	// 		};
	// 		get$6('v1/items/popular?type=movie&sort=views', params, function (json) {
	// 			append(Lampa.Lang.translate('pub_title_popularfilm'), 's1', json);
	// 			Lampa.VideoQuality.add(json.results);
	// 		}, status.error.bind(status));
	// 		get$6('v1/items?type=movie&sort=updated-', params, function (json) {
	// 			append(Lampa.Lang.translate('pub_title_newfilm'), 's2', json);
	// 		}, status.error.bind(status));
	// 		get$6('v1/items/popular?type=serial&sort=views', params, function (json) {
	// 			append(Lampa.Lang.translate('pub_title_popularserial'), 's3', json);
	// 			Lampa.VideoQuality.add(json.results);
	// 		}, status.error.bind(status));
	// 		get$6('v1/items?type=serial&sort=updated-', params, function (json) {
	// 			append(Lampa.Lang.translate('pub_title_newserial'), 's4', json);
	// 		}, status.error.bind(status));
	// 		get$6('v1/items?type=concert&sort=updated-', params, function (json) {
	// 			append(Lampa.Lang.translate('pub_title_newconcert'), 's5', json);
	// 		}, status.error.bind(status));
	// 		get$6('v1/items?type=&quality=4', params, function (json) {
	// 			append('4K', 's6', json);
	// 		}, status.error.bind(status));
	// 		get$6('v1/items?type=documovie&sort=updated-', params, function (json) {
	// 			append(Lampa.Lang.translate('pub_title_newdocfilm'), 's7', json);
	// 		}, status.error.bind(status));
	// 		get$6('v1/items?type=docuserial&sort=updated-', params, function (json) {
	// 			append(Lampa.Lang.translate('pub_title_newdocserial'), 's8', json);
	// 		}, status.error.bind(status));
	// 		get$6('v1/items?type=tvshow&sort=updated-', params, function (json) {
	// 			append(Lampa.Lang.translate('pub_title_newtvshow'), 's9', json);
	// 		}, status.error.bind(status));
	// 	}
	// 	function category$1(params, oncomplite, onerror) {
	// 		var books = Lampa.Favorite.continues(params.url);
	// 		var status = new Lampa.Status(5);
	// 		status.onComplite = function () {
	// 			var fulldata = [];
	// 			if (books.length) fulldata.push({
	// 				results: books,
	// 				title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
	// 			});
	// 			var data = status.data;
	// 			for (var i = 1; i <= 5; i++) {
	// 				var ipx = 's' + i;
	// 				if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
	// 			}
	// 			if (fulldata.length) oncomplite(fulldata);
	// 			else onerror();
	// 		};
	// 		var append = function append(title, name, json) {
	// 			json.title = title;
	// 			var data = [];
	// 			json.items.forEach(function (element) {
	// 				data.push(tocard(element));
	// 			});
	// 			json.results = data;
	// 			status.append(name, json);
	// 		};
	// 		var type = params.url == 'tv' ? 'serial' : params.url;
	// 		var Name = params.genres ? params.typeName.toLowerCase() : params.url == 'tv' ? Lampa.Lang.translate('menu_tv').toLowerCase() : Lampa.Lang.translate('menu_movies').toLowerCase();
	// 		if (params.genres) {
	// 			get$6('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function (json) {
	// 				append(Lampa.Lang.translate('pub_title_new') + ' ' + params.janr.toLowerCase(), 's1', json);
	// 			}, status.error.bind(status));
	// 			get$6('v1/items?type=' + type + 'sort=rating-', params, function (json) {
	// 				append(Lampa.Lang.translate('pub_title_rating') + ' ' + Name, 's2', json);
	// 			}, status.error.bind(status));
	// 			get$6('v1/items?type=' + type + '&sort=updated-', params, function (json) {
	// 				append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
	// 			}, status.error.bind(status));
	// 			get$6('v1/items?type=' + type + '&sort=views-', params, function (json) {
	// 				append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
	// 			}, status.error.bind(status));
	// 			get$6('v1/items?type=' + type + '&quality=4', params, function (json) {
	// 				append('4K ' + Name, 's5', json);
	// 			}, status.error.bind(status));
	// 		} else {
	// 			get$6('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function (json) {
	// 				append(Lampa.Lang.translate('pub_title_new') + ' ' + Name, 's1', json);
	// 			}, status.error.bind(status));
	// 			get$6('v1/items/popular?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
	// 				append(Lampa.Lang.translate('pub_title_popular') + ' ' + Name, 's2', json);
	// 			}, status.error.bind(status));
	// 			get$6('v1/items/fresh?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
	// 				append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
	// 			}, status.error.bind(status));
	// 			get$6('v1/items/hot?type=' + type + '&sort=created-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
	// 				append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
	// 			}, status.error.bind(status));
	// 			get$6('v1/items?type=' + type + '&quality=4', params, function (json) {
	// 				append('4K ' + Name, 's5', json);
	// 			}, status.error.bind(status));
	// 		}
	// 	}
	// 	function full$1(params, oncomplite, onerror) {
	// 		var status = new Lampa.Status(Lampa.Storage.get('pro_pub', false) ? 5 : 4);
	// 		status.onComplite = oncomplite;
	// 		var url = 'v1/items/' + params.id;
	// 		get$6(url, params, function (json) {
	// 			json.source = 'pub';
	// 			var data = {};
	// 			var element = json.item;
	// 			get$6('v1/items/similar?id=' + element.id, params, function (json) {
	// 				var similars = [];
	// 				if (json.items) {
	// 					for (var i in json.items) {
	// 						var item = json.items[i];
	// 						similars.push(tocard(item));
	// 					}
	// 					status.append('simular', {
	// 						results: similars
	// 					});
	// 				}
	// 			}, onerror);
	// 			get$6('v1/items/comments?id=' + element.id, params, function (json) {
	// 				var comments = [];
	// 				if (json.comments) {
	// 					for (var i in json.comments) {
	// 						var com = json.comments[i];
	// 						com.text = com.message.replace(/\[n|r|t]/g, '');
	// 						com.like_count = com.rating;
	// 						comments.push(com);
	// 					}
	// 					status.append('comments', comments);
	// 				}
	// 			}, onerror);
	// 			data.movie = {
	// 				id: element.id,
	// 				url: url,
	// 				type: element.type,
	// 				source: 'pub',
	// 				title: element.title.split('/')[0],
	// 				original_title: element.title.split('/')[1] ? element.title.split('/')[1] : element.title.split('/')[0],
	// 				name: element.seasons ? element.title.split('/')[0] : '',
	// 				original_name: element.seasons ? element.title.split('/')[1] : '',
	// 				overview: element.plot.replace(/\[n|r|t]/g, ''),
	// 				img: element.posters.big,
	// 				runtime: (element.duration.average || 0) / 1000 / 6 * 100,
	// 				genres: genres$1(element, json.item),
	// 				vote_average: parseFloat(element.imdb_rating || element.kinopoisk_rating || '0'),
	// 				production_companies: [],
	// 				production_countries: countries(element.countries, json.item),
	// 				budget: element.budget || 0,
	// 				seasons: element.seasons && element.seasons.filter(function (el){
	// 				  el.episode_count = 1;
	// 				  return el
	// 				}) || '',
	// 				release_date: element.year || Lampa.Utils.parseTime(element.created_at).full || '0000',
	// 				number_of_seasons: seasonsCount(element).seasons,
	// 				number_of_episodes: seasonsCount(element).episodes,
	// 				first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year || Lampa.Utils.parseTime(element.created_at).full || '0000' : '', 
	// 				background_image: element.posters.wide,
    //       imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
    //       kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
    //       imdb_id:'tt' +element.imdb,
    //       kinopoisk_id:element.kinopoisk
	// 			};
	// 			status.append('persons', persons(json));
	// 			status.append('movie', data.movie);
	// 			if(Lampa.Storage.get('pro_pub', false)) status.append('videos', videos(element));
	// 		}, onerror);
	// 	}
	// 	function menu$1(params, oncomplite) {
	// 		var u = url$1('v1/types', params);
	// 		var typeName = '';
	// 		Pub.network["native"](u, function (json) {
	// 			Lampa.Select.show({
	// 				title: Lampa.Lang.translate('title_category'),
	// 				items: json.items,
	// 				onBack: this.onBack,
	// 				onSelect: function onSelect(a) {
	// 					type = a.id;
	// 					typeName = a.title;
	// 					get$6('v1/genres?type=' + a.id, params, function (jsons) {
	// 						Lampa.Select.show({
	// 							title: Lampa.Lang.translate('full_genre'),
	// 							items: jsons.items,
	// 							onBack: function onBack() {
	// 								menu$1(params, oncomplite);
	// 							},
	// 							onSelect: function onSelect(a) {
	// 								Lampa.Activity.push({
	// 									url: type,
	// 									title: Lampa.Lang.translate('title_catalog') + ' - ' + typeName + ' - ' + a.title + ' - KinoPUB',
	// 									component: 'category',
	// 									typeName: typeName,
	// 									janr: a.title,
	// 									genres: a.id,
	// 									id: a.id,
	// 									source: 'pub',
	// 									card_type: true,
	// 									page: 1
	// 								});
	// 							}
	// 						});
	// 					}, onerror);
	// 				}
	// 			});
	// 		});
	// 	}
	// 	function seasons$2(tv, from, oncomplite) {
	// 		Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
	// 	}
	// 	function person$2(params, oncomplite, onerror) {
	// 		var u = url$1('v1/items', params);
	// 		Pub.network["native"](u, function (json, all) {
	// 			var data = {};
	// 			if (json.items) {
	// 				data.person = {
	// 					name: params.id,
	// 					biography: '',
	// 					img: '',
	// 					place_of_birth: '',
	// 					birthday: '----'
	// 				};
	// 				var similars = [];
	// 				for (var i in json.items) {
	// 					var item = json.items[i];
	// 					similars.push(tocard(item));
	// 				}
	// 				data.credits = {
	// 					movie: similars,
	// 					knownFor: [{
	// 					  name: '', 
	// 					  credits: similars
	// 					}]
	// 				};
	// 			}
	// 			oncomplite(data);
	// 		}, onerror);
	// 	}
	// 	function clear$3() {
	// 		Pub.network.clear();
	// 	}
	// 	function seasonsCount(element) {
	// 		var data = {
	// 			seasons: 0,
	// 			episodes: 0
	// 		};
	// 		if (element.seasons) {
	// 			data.seasons = element.seasons.length;
	// 			element.seasons.forEach(function (ep) {
	// 				data.episodes += ep.episodes.length;
	// 			})
	// 		}
	// 		return data;
	// 	}
	// 	function videos(element) {
	// 		var data = [];
	// 		if (element.trailer) {
	// 			data.push({
	// 				name: element.trailer.title,
	// 				url: element.trailer.url,
	// 				player: true
	// 			});
	// 		}
	// 		return data.length ? {
	// 			results: data
	// 		} : false;
	// 	}
	// 	function persons(json) {
	// 		var data = [];
	// 		if (json.item.cast) {
	// 			json.item.cast.split(',').forEach(function (name) {
	// 				data.push({
	// 					name: name,
	// 					id: name,
	// 					character: Lampa.Lang.translate('title_actor'),
	// 				});
	// 			});
	// 		}
	// 		return data.length ? {
	// 			cast: data
	// 		} : false;
	// 	}
	// 	function genres$1(element, json) {
	// 		var data = [];
	// 		element.genres.forEach(function (id) {
	// 			if (id) {
	// 				data.push({
	// 					id: id.id,
	// 					name: id.title
	// 				});
	// 			}
	// 		});
	// 		return data;
	// 	}
	// 	function countries(element, json) {
	// 		var data = [];
	// 		if (element && json.countries) {
	// 			data.push({
	// 				name: element[0].title
	// 			});
	// 		}
	// 		return data;
	// 	}
	// 	function search$3() {
	// 		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	// 		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
	// 		var status = new Lampa.Status(2);
	// 		status.onComplite = function (data) {
	// 			var items = [];
	// 			if (data.movie && data.movie.results.length) items.push(data.movie);
	// 			if (data.tv && data.tv.results.length) items.push(data.tv);
	// 			oncomplite(items);
	// 		};
	// 		var mov = params;
	// 		mov.type = '';
	// 		mov.field = 'title';
	// 		mov.perpage = 20;
	// 		get$6('v1/items/search', mov, function (json) {
	// 			var items = [];
	// 			var itemss = [];
	// 			if (json.items) {
	// 				json.items.forEach(function (element) {
	// 					if(element.type == 'movie') items.push(tocard(element));
	// 					else itemss.push(tocard(element));
	// 				});
	// 				var movie = {
	// 					results: items,
	// 					page: json.pagination.current,
	// 					total_pages: json.pagination.total,
	// 					total_results: json.pagination.total_items,
	// 					title: Lampa.Lang.translate('menu_movies') +' ('+items.length+')',
	// 					type: 'movie'
	// 				};
	// 				status.append('movie', movie);
	// 				var tv = {
	// 					results: itemss,
	// 					page: json.pagination.current,
	// 					total_pages: json.pagination.total,
	// 					total_results: json.pagination.total_items,
	// 					title: Lampa.Lang.translate('menu_tv') +' ('+itemss.length+')',
	// 					type: 'tv'
	// 				};
	// 				status.append('tv', tv);
	// 			}
	// 		}, status.error.bind(status));
	// 	}
	// 	function discovery() {
	// 		return {
	// 			title: 'PUB',
	// 			search: search$3,
	// 			params: {
	// 				align_left: true,
	// 				object: {
	// 					source: 'pub'
	// 				}
	// 			},
	// 			onMore: function onMore(params) {
	// 				Lampa.Activity.push({
	// 					url: 'v1/items/search?field=title&type=' + params.data.type,
	// 					title: Lampa.Lang.translate('search') + ' - ' + params.query,
	// 					component: 'category_full',
	// 					page: 2,
	// 					query: encodeURIComponent(params.query),
	// 					source: 'pub'
	// 				});
	// 			},
	// 			onCancel: Pub.network.clear.bind(Pub.network)
	// 		};
	// 	}
	// 	var PUB = {
	// 		main: main$2,
	// 		menu: menu$1,
	// 		full: full$1,
	// 		search: search$3,
	// 		person: person$2,
	// 		list: list$2,
	// 		seasons: seasons$2,
	// 		category: category$1,
	// 		clear: clear$3,
	// 		discovery: discovery
	// 	};
	// 	Lampa.Api.sources.pub = PUB;
    
    // function url$2(u) {
	// 		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	// 		u = (u == 'undefined' ? '' : u)
	// 		if (params.genres) u = 'catalog' +add$5(u, 'orderby=date&orderdir=desc&filter=s996-' + params.genres.replace('f','g'));
	// 		if (params.page) u = add$5(u, 'page=' + params.page);
	// 		if (params.query) u = add$5(u, 'story=' + params.query);
	// 		if (params.type) u = add$5(u, 'type=' + params.type);
	// 		if (params.field) u = add$5(u, 'field=' + params.field);
	// 		if (params.perpage) u = add$5(u, 'perpage=' + params.perpage);
	// 		u = add$5(u, Filmix.user_dev + Lampa.Storage.get('filmix_token', 'aaaabbbbccccddddeeeeffffaaaabbbb'));
	// 		if (params.filter) {
	// 			for (var i in params.filter) {
	// 				u = add$5(u, i + '=' + params.filter[i]);
	// 			}
	// 		}
	// 		return Filmix.api_url + u;
	// 	}
	// 	function add$5(u, params) {
	// 		return u + (/\?/.test(u) ? '&' : '?') + params;
	// 	}
	// 	function get$7(method, call) {
	// 		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	// 		var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
	// 		var onerror = arguments.length > 3 ? arguments[3] : undefined;
	// 		var u = url$2(method, params);
	// 		Filmix.network["native"](u, function (json) {
	// 			json.url = method;
	// 			oncomplite(json);
	// 		}, onerror);
	// 	}
	// 	function tocardf(element, type) {
	// 		return {
	// 			url: '',
	// 			id: element.id,
	// 			type: type || (((element.serial_stats && element.serial_stats.post_id) || (element.last_episode && element.last_episode.post_id)) ? 'tv' : 'movie'),
	// 			source: 'filmix',
	// 			quality: element.quality && element.quality.split(' ').shift() || '',
	// 			title: element.title,
	// 			original_title: element.original_title || element.title,
	// 			release_date: (element.year || element.date && element.date.split(' ')[2] || '0000'),
	// 			first_air_date: (type == 'tv' || ((element.serial_stats && element.serial_stats.post_id) || (element.last_episode && element.last_episode.post_id))) ? element.year : '',
	// 			img: element.poster,
	// 			cover: element.poster,
	// 			background_image: element.poster,
    //     vote_average: parseFloat(element.kp_rating || '0.0').toFixed(1),
    //     imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
    //     kp_rating: parseFloat(element.kp_rating || '0.0').toFixed(1),
	// 			year: element.year
	// 		};
	// 	}
	// 	function list$3(params, oncomplite, onerror) {
	// 		var page = 2;
	// 		var url = url$2(params.url, params);
	// 		Filmix.network["native"](url, function (json) {
	// 			var items = [];
	// 			if (json) {
	// 				json.forEach(function (element) {
	// 					items.push(tocardf(element));
	// 				});
	// 			}
	// 			oncomplite({
	// 				results: items,
	// 				page: page,
	// 				total_pages: 50
	// 			});
	// 			page++
	// 		}, onerror);
	// 	}
	// 	function main$1(params, oncomplite, onerror) {
	// 	  var source = [{
	// 	    title: 'title_now_watch',
	// 	    url: 'top_views'
	// 	  }, {
	// 	    title: 'title_new', 
	// 	    url: 'catalog?orderby=date&orderdir=desc'
	// 	  }, {
	// 	    title: 'title_new_this_year', 
	// 	    url: 'catalog?orderby=year&orderdir=desc'
	// 	  }, {
	// 	    title: 'pub_title_newfilm', 
	// 	    url: 'catalog?orderby=date&orderdir=desc&filter=s0'
	// 	  }, {
	// 	    title: '4K', 
	// 	    url: 'catalog?orderby=date&orderdir=desc&filter=s0-q4'
	// 	  }, {
	// 	    title: 'pub_title_popularfilm', 
	// 	    url: 'popular'
	// 	  }, {
	// 	    title: 'pub_title_popularserial', 
	// 	    url: 'popular?section=7'
	// 	  }, {
	// 	    title: 'title_in_top', 
	// 	    url: 'catalog?orderby=rating&orderdir=desc'
	// 	  }];
	// 		var status = new Lampa.Status(Lampa.Arrays.getKeys(source).length);
	// 		status.onComplite = function () {
	// 			var fulldata = [];
	// 			var data = status.data;
	// 			source.forEach(function (q) {
    //       if (status.data[q.title] && status.data[q.title].results.length) {
    //         fulldata.push(status.data[q.title]);
    //       }
    //     });
	// 			if (fulldata.length) oncomplite(fulldata);
	// 			else onerror();
	// 		};
	// 		var append = function append(title, name, json) {
	// 			json.title = title;
	// 			var data = [];
	// 			json.forEach(function (element) {
	// 				data.push(tocardf(element));
	// 			});
    //   	json.results = data;
	// 			status.append(name, json);
	// 		};
    //   source.forEach(function (q) {
	// 		  get$7(q.url, params, function (json) {
    //       append(Lampa.Lang.translate(q.title), q.title, json);
    //     }, status.error.bind(status));
    //   });
	// 	}
	// 	function category$2(params, oncomplite, onerror) {
	// 		var books = Lampa.Favorite.continues(params.url);
	// 		var type = params.url == 'tv' ? 7 : 0;
	// 		var source = [{
	// 	    title: 'title_new_this_year',
	// 	    url: 'catalog?orderby=year&orderdir=desc&filter=s'+type
	// 	  }, {
	// 	    title: 'title_new', 
	// 	    url: 'catalog?orderby=date&orderdir=desc&filter=s'+type
	// 	  }, {
	// 	    title: 'title_popular', 
	// 	    url: 'popular?section='+type
	// 	  }, {
	// 	    title: 'title_in_top', 
	// 	    url: 'catalog?orderby=rating&orderdir=desc&filter=s'+type
	// 	  }];
	// 		var status = new Lampa.Status(Lampa.Arrays.getKeys(source).length);
	// 		status.onComplite = function () {
	// 			var fulldata = [];
	// 			var data = status.data;
	// 			if (books.length) fulldata.push({
	// 				results: books,
	// 				title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
	// 			});
	// 			source.forEach(function (q) {
    //       if (data[q.title] && data[q.title].results.length) {
    //         fulldata.push(data[q.title]);
    //       }
    //     });
	// 			if (fulldata.length) oncomplite(fulldata);
	// 			else onerror();
	// 		};
	// 		var append = function append(title, name, json) {
	// 			json.title = title;
	// 			var data = [];
	// 			json.forEach(function (element) {
	// 				data.push(tocardf(element, params.url));
	// 			});
	// 			json.results = data;
	// 			status.append(name, json);
	// 		};
    //   source.forEach(function (q) {
	// 		  get$7(q.url, params, function (json) {
    //       append(Lampa.Lang.translate(q.title), q.title, json);
    //     }, status.error.bind(status));
    //   });
	// 	}
	// 	function full$2(params, oncomplite, onerror) {
	// 		var status = new Lampa.Status(5);
	// 		status.onComplite = oncomplite;
	// 		var url = 'post/' + params.id;
	// 		get$7(url, params, function (json) {
	// 			json.source = 'filmix';
	// 			var data = {};
	// 			var element = json;
			
	// 			var similars = [];
	// 			if (json.relates) {
	// 				for (var i in json.relates) {
	// 					var item = json.relates[i];
	// 					similars.push(tocardf(item));
	// 				}
	// 				status.append('simular', {
	// 					results: similars
	// 				});
	// 			}
			
	// 			data.movie = {
	// 				id: element.id,
	// 				url: url,
	// 				type: Lampa.Arrays.getValues(element.player_links.playlist).length ? 'tv' : 'movie',
	// 				source: 'filmix',
	// 				title: element.title,
	// 				original_title: element.original_title,
	// 				name: Lampa.Arrays.getValues(element.player_links.playlist).length ? element.title : '',
	// 				original_name: Lampa.Arrays.getValues(element.player_links.playlist).length ? element.original_title : '',
	// 				overview: element.short_story.replace(/\[n|r|t]/g, ''),
	// 				img: element.poster,
	// 				runtime: (element.duration || 0),
	// 				genres: genres$2(element),
	// 				vote_average: parseFloat(element.imdb_rating || element.kp_rating || '0'),
	// 				production_companies: [],
	// 				production_countries: countries2(element.countries),
	// 				budget: element.budget || 0,
	// 				release_date: element.year || element.date.split(' ')[2] || '0000',
	// 				seasons: Lampa.Arrays.getValues(element.player_links.playlist).filter(function (el){
	// 				  el.episode_count = 1;
	// 				  return el
	// 				}),
	// 				quality: element.rip && element.rip.split(' ').shift() || '',
	// 				number_of_seasons: Lampa.Arrays.getValues(element.player_links.playlist).length || '',
	// 				number_of_episodes: element.last_episode && element.last_episode.episode || '',
	// 				first_air_date: Lampa.Arrays.getValues(element.player_links.playlist).length ? element.year || element.date_atom || '0000' : '', 
	// 				background_image: element.poster,
    //       imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
    //       kp_rating: parseFloat(element.kp_rating || '0.0').toFixed(1),
    //  		};
	// 			get$7('comments/' + element.id, params, function (json) {
	// 				var comments = [];
	// 				if (json) {
	// 					json.forEach(function(com) {
	// 						com.text = com.text.replace(/\[n|r|t]/g, '');
	// 						com.like_count = '';
	// 						comments.push(com);
	// 					});
	// 					status.append('comments', comments);
	// 					$('.full-review__footer', Lampa.Activity.active().activity.render()).hide();
	// 				}
	// 			}, onerror);
    //  		status.append('persons', persons2(json));
	// 			status.append('movie', data.movie);
	// 			status.append('videos', videos2(element.player_links));			
	// 		}, onerror);
	// 	}
	// 	function menu$2(params, oncomplite) {
  	// 	var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    //   var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
    //   if (menu_list.length) oncomplite(menu_list);else {
    //     var us = url$2('filter_list', params);
    //     var u = url$2('category_list', params);
    //     Filmix.network["native"](u, function (j) {
    //       Lampa.Arrays.getKeys(j).forEach(function (g) {
    //         menu_list.push({
    //           title: j[g],
    //           id: g
    //         });
    //       });
    //       console.log (menu_list)
    //       oncomplite(menu_list);
    //     });
    //   }
	// 	}
	// 	function seasons$1(tv, from, oncomplite) {
	// 		Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
	// 	}
	// 	function formatDate(dateString) {
    //   var months = [
    //     { name: 'января', number: '01' },
    //     { name: 'февраля', number: '02' },
    //     { name: 'марта', number: '03' },
    //     { name: 'апреля', number: '04' },
    //     { name: 'мая', number: '05' },
    //     { name: 'июня', number: '06' },
    //     { name: 'июля', number: '07' },
    //     { name: 'августа', number: '08' },
    //     { name: 'сентября', number: '09' },
    //     { name: 'октября', number: '10' },
    //     { name: 'ноября', number: '11' },
    //     { name: 'декабря', number: '12' }
    //   ];
    
    //   var parts = dateString.split(' ');
    //   var day = parts[0];
    //   var monthName = parts[1];
    //   var year = parts[2];
      
    //   var monthNumber;
    //   for (var i = 0; i < months.length; i++) {
    //     if (months[i].name === monthName) {
    //       monthNumber = months[i].number;
    //       break;
    //     }
    //   }
      
    //   var formattedDate = year + '-' + monthNumber + '-' + day;
    //   return formattedDate;
    // }
	// 	function person$3(params, oncomplite, onerror) {
	// 		var u = url$2('person/'+params.id, params);
	// 		Filmix.network["native"](u, function (json, all) {
	// 			var data = {};
	// 			if (json) {
	// 				data.person = {
	// 					id: params.id,
	// 					name: json.name,
	// 					biography: json.about,
	// 					img: json.poster,
	// 					place_of_birth: json.birth_place,
	// 					birthday: formatDate(json.birth)
	// 				};
	// 				var similars = [];
	// 				for (var i in json.movies) {
	// 					var item = json.movies[i];
	// 					similars.push(tocardf(item));
	// 				}
	// 				data.credits = {
	// 					movie: similars,
	// 					knownFor: [{
	// 					  name: json.career, 
	// 					  credits: similars
	// 					}]
	// 				};
	// 			}
	// 			oncomplite(data);
	// 		}, onerror);
	// 	}
	// 	function clear$4() {
	// 		Filmix.network.clear();
	// 	}
	// 	function videos2(element) {
	// 		var data = [];
	// 		if (element.trailer.length) {
	// 			element.trailer.forEach(function (el){
  	// 			var qualities = el.link.match(/\[(.*?)\]/);
  	// 		  qualities = qualities[1].split(',').filter(function (quality){
    //         if (quality === '') return false
    //         return true
    //       }).sort(function (a, b) {
    //         return b - a
    //       }).map(function (quality) {
    //         data.push({
    // 					name: el.translation+' '+quality+'p',
    // 					url: el.link.replace(/\[(.*?)\]/, quality),
    // 					player: true
    // 				});
    //       });
	// 			});
	// 		}
	// 		return data.length ? {
	// 			results: data
	// 		} : false;
	// 	}
	// 	function persons2(json) {
	// 		var data = [];
	// 		if (json.actors) {
	// 			json.found_actors.filter(function (act){
	// 				data.push({
	// 					name: act.name,
	// 					id: act.id,
	// 					character: Lampa.Lang.translate('title_actor'),
	// 				});
	// 			});
	// 		}
	// 		return data.length ? {
	// 			cast: data
	// 		} : false;
	// 	}
	// 	function genres$2(element) {
	// 		var data = [];
	// 		var u = url$2('category_list');
    //   Filmix.network["native"](u, function (j) {
  	// 		element.categories.forEach(function (name, i) {
  	// 			if (name) {
    //         var _id = Object.entries(j).find(function (g) {
    //           return g[1] == name
    //         });
  	// 			 	data.push({
  	// 					id: _id && _id[0] || '',
  	// 					name: name
  	// 				});
  	// 			}
  	// 		});
    //   });
	// 		return data;
	// 	}
	// 	function countries2(element) {
	// 		var data = [];
	// 		if (element) {
	// 			element.forEach(function (el) {
  	// 			data.push({
  	// 				name: el
  	// 			});
	// 			});
	// 		}
	// 		return data;
	// 	}
	// 	function search$4() {
	// 		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	// 		var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
	// 		var status = new Lampa.Status(2);
	// 		status.onComplite = function (data) {
	// 			var items = [];
	// 			if (data.movie && data.movie.results.length) items.push(data.movie);
	// 			if (data.tv && data.tv.results.length) items.push(data.tv);
	// 			oncomplite(items);
	// 		};
	// 		get$7('search', params, function (json) {
	// 			var items = [];
	// 			var itemss = [];
	// 			if (json) {
	// 				json.forEach(function (element) {
	// 					if(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status) itemss.push(tocardf(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status ? 'tv' : 'movie'));
	// 					else items.push(tocardf(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status ? 'tv' : 'movie'));
	// 				});
	// 				var movie = {
	// 					results: items,
	// 					page: 1,
	// 					total_pages: 1,
	// 					total_results: json.length,
	// 					title: Lampa.Lang.translate('menu_movies') +' ('+items.length+')',
	// 					type: 'movie'
	// 				};
	// 				status.append('movie', movie);
	// 				var tv = {
	// 					results: itemss,
	// 					page: 1,
	// 					total_pages: 1,
	// 					total_results: json.length,
	// 					title: Lampa.Lang.translate('menu_tv') +' ('+itemss.length+')',
	// 					type: 'tv'
	// 				};
	// 				status.append('tv', tv);
	// 			}
	// 		}, status.error.bind(status));
	// 	}
	// 	function discovery$1() {
	// 		return {
	// 			title: 'FILMIX',
	// 			search: search$4,
	// 			params: {
	// 				align_left: true,
	// 				object: {
	// 					source: 'filmix'
	// 				}
	// 			},
	// 			onMore: function onMore(params) {
	// 				Lampa.Activity.push({
	// 					url: 'search',
	// 					title: Lampa.Lang.translate('search') + ' - ' + params.query,
	// 					component: 'category_full',
	// 					query: encodeURIComponent(params.query),
	// 					source: 'filmix'
	// 				});
	// 			},
	// 			onCancel: Pub.network.clear.bind(Pub.network)
	// 		};
	// 	}
	// 	var FILMIX = {
	// 		main: main$1,
	// 		menu: menu$2,
	// 		full: full$2,
	// 		search: search$4,
	// 		person: person$3,
	// 		list: list$3,
	// 		seasons: seasons$1,
	// 		category: category$2,
	// 		clear: clear$4,
	// 		discovery: discovery$1
	// 	};
	// 	Lampa.Api.sources.filmix = FILMIX;
	
	    // function url$1_(u) {
		// 	var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		// 	if (params.genres) u = add$4_(u, 'genre=' + params.genres);
		// 	if (params.page) u = add$4_(u, 'page=' + params.page);
		// 	if (params.query) u = add$4_(u, 'q=' + params.query);
		// 	if (params.type) u = add$4_(u, 'type=' + params.type);
		// 	if (params.field) u = add$4_(u, 'field=' + params.field);
		// 	if (params.id) u = add$4_(u, 'actor=' + params.id);
		// 	if (params.perpage) u = add$4_(u, 'perpage=' + params.perpage);
		// 	u = add$4_(u, 'access_token=' + Pub.token);
		// 	if (params.filter) {
		// 		for (var i in params.filter) {
		// 			u = add$4__(u, i + '=' + params.filter[i]);
		// 		}
		// 	}
		// 	return Pub.baseurl + u;
		// }
		// function add$4_(u, params) {
		// 	return u + (/\?/.test(u) ? '&' : '?') + params;
		// }
		// function get$6_(method, call) {
		// 	var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		// 	var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
		// 	var onerror = arguments.length > 3 ? arguments[3] : undefined;
		// 	var u = url$1_(method, params);
		// 	Pub.network.silent(u, function (json) {
		// 		json.url = method;
		// 		oncomplite(json);
		// 	}, onerror);
		// }
		// function tocard_(element) {
		// 	return {
		// 		url: '',
		// 		id: element.id,
		// 		type: element.type,
		// 		title: element.title.split('/')[0],
		// 		promo_title: element.title.split('/')[0],
		// 		original_title: element.title.split('/')[1] || element.title,
		// 		release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
		// 		first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year : '',
		// 		vote_averagey: parseFloat((element.imdb_rating || 0) + '').toFixed(1),
		// 		vote_average: element.imdb_rating || 0,
		// 		poster: element.posters.big,
		// 		cover: element.posters.wide,
		// 		background_image: element.posters.wide,
        // imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
        // kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
		// 		year: element.year,
		// 		years: element.years
		// 	};
		// }
		// function list$2_(params, oncomplite, onerror) {
		// 	var url = url$1_('v1/items', params, params.type = type);
		// 	if (!params.genres) url = url$1_(params.url, params);
		// 	Pub.network["native"](url, function (json) {
		// 		var items = [];
		// 		if (json.items) {
		// 			json.items.forEach(function (element) {
		// 				items.push(tocard_(element));
		// 			});
		// 		}
		// 		oncomplite({
		// 			results: items,
		// 			page:json.pagination.current,
		// 			total_pages: json.pagination.total
		// 		});
		// 	}, onerror);
		// }
		// function main$2_(params, oncomplite, onerror) {
		// 	var status = new Lampa.Status(9);
		// 	status.onComplite = function () {
		// 		var fulldata = [];
		// 		var data = status.data;
		// 		for (var i = 1; i <= 9; i++) {
		// 			var ipx = 's' + i;
		// 			if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
		// 		}
		// 		if (fulldata.length) oncomplite(fulldata);
		// 		else onerror();
		// 	};
		// 	var append = function append(title, name, json) {
		// 		json.title = title;
		// 		var data = [];
		// 		json.items.forEach(function (element) {
		// 			data.push(tocard_(element));
		// 		});
		// 		if(name == 's1' || name == 's6') {
		// 		  json.wide = true;
		// 		  json.small = true;
		// 		}
		// 		if(name == 's2') {
		// 		  data.forEach(function (el){
		// 		    el.poster = el.cover;
		// 		  });
		// 		  json.collection = true;
		// 		  json.line_type  = 'collection';
		// 		}
		// 		json.results = data;
		// 		status.append(name, json);
		// 	};
		// 	get$6_('v1/items/popular?type=movie&sort=views', params, function (json) {
		// 		append(Lampa.Lang.translate('pub_title_popularfilm'), 's1', json);
		// 		Lampa.VideoQuality.add(json.results);
		// 	}, status.error.bind(status));
		// 	get$6_('v1/items?type=movie&sort=updated-', params, function (json) {
		// 		append(Lampa.Lang.translate('pub_title_newfilm'), 's2', json);
		// 	}, status.error.bind(status));
		// 	get$6_('v1/items/popular?type=serial&sort=views', params, function (json) {
		// 		append(Lampa.Lang.translate('pub_title_popularserial'), 's3', json);
		// 		Lampa.VideoQuality.add(json.results);
		// 	}, status.error.bind(status));
		// 	get$6_('v1/items?type=serial&sort=updated-', params, function (json) {
		// 		append(Lampa.Lang.translate('pub_title_newserial'), 's4', json);
		// 	}, status.error.bind(status));
		// 	get$6_('v1/items?type=concert&sort=updated-', params, function (json) {
		// 		append(Lampa.Lang.translate('pub_title_newconcert'), 's5', json);
		// 	}, status.error.bind(status));
		// 	get$6_('v1/items?type=&quality=4', params, function (json) {
		// 		append('4K', 's6', json);
		// 	}, status.error.bind(status));
		// 	get$6_('v1/items?type=documovie&sort=updated-', params, function (json) {
		// 		append(Lampa.Lang.translate('pub_title_newdocfilm'), 's7', json);
		// 	}, status.error.bind(status));
		// 	get$6_('v1/items?type=docuserial&sort=updated-', params, function (json) {
		// 		append(Lampa.Lang.translate('pub_title_newdocserial'), 's8', json);
		// 	}, status.error.bind(status));
		// 	get$6_('v1/items?type=tvshow&sort=updated-', params, function (json) {
		// 		append(Lampa.Lang.translate('pub_title_newtvshow'), 's9', json);
		// 	}, status.error.bind(status));
		// }
		// function category$1_(params, oncomplite, onerror) {
		// 	var books = Lampa.Favorite.continues(params.url);
		// 	var status = new Lampa.Status(5);
		// 	status.onComplite = function () {
		// 		var fulldata = [];
		// 		if (books.length) fulldata.push({
		// 			results: books,
		// 			title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
		// 		});
		// 		var data = status.data;
		// 		for (var i = 1; i <= 5; i++) {
		// 			var ipx = 's' + i;
		// 			if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
		// 		}
		// 		if (fulldata.length) oncomplite(fulldata);
		// 		else onerror();
		// 	};
		// 	var append = function append(title, name, json) {
		// 		json.title = title;
		// 		var data = [];
		// 		json.items.forEach(function (element) {
		// 			data.push(tocard_(element));
		// 		});
		// 		json.results = data;
		// 		status.append(name, json);
		// 	};
		// 	var type = params.url == 'tv' ? 'serial' : params.url;
		// 	var Name = params.genres ? params.typeName.toLowerCase() : params.url == 'tv' ? Lampa.Lang.translate('menu_tv').toLowerCase() : Lampa.Lang.translate('menu_movies').toLowerCase();
		// 	if (params.genres) {
		// 		get$6_('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function (json) {
		// 			append(Lampa.Lang.translate('pub_title_new') + ' ' + params.janr.toLowerCase(), 's1', json);
		// 		}, status.error.bind(status));
		// 		get$6_('v1/items?type=' + type + 'sort=rating-', params, function (json) {
		// 			append(Lampa.Lang.translate('pub_title_rating') + ' ' + Name, 's2', json);
		// 		}, status.error.bind(status));
		// 		get$6_('v1/items?type=' + type + '&sort=updated-', params, function (json) {
		// 			append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
		// 		}, status.error.bind(status));
		// 		get$6_('v1/items?type=' + type + '&sort=views-', params, function (json) {
		// 			append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
		// 		}, status.error.bind(status));
		// 		get$6_('v1/items?type=' + type + '&quality=4', params, function (json) {
		// 			append('4K ' + Name, 's5', json);
		// 		}, status.error.bind(status));
		// 	} else {
		// 		get$6_('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function (json) {
		// 			append(Lampa.Lang.translate('pub_title_new') + ' ' + Name, 's1', json);
		// 		}, status.error.bind(status));
		// 		get$6_('v1/items/popular?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
		// 			append(Lampa.Lang.translate('pub_title_popular') + ' ' + Name, 's2', json);
		// 		}, status.error.bind(status));
		// 		get$6_('v1/items/fresh?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
		// 			append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
		// 		}, status.error.bind(status));
		// 		get$6_('v1/items/hot?type=' + type + '&sort=created-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function (json) {
		// 			append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
		// 		}, status.error.bind(status));
		// 		get$6_('v1/items?type=' + type + '&quality=4', params, function (json) {
		// 			append('4K ' + Name, 's5', json);
		// 		}, status.error.bind(status));
		// 	}
		// }
		// function full$1_(params, oncomplite, onerror) {
		// 	var status = new Lampa.Status(Lampa.Storage.get('pro_pub', false) ? 5 : 4);
		// 	status.onComplite = oncomplite;
		// 	var url = 'v1/items/' + params.id;
		// 	get$6_(url, params, function (json) {
		// 		json.source = 'pub';
		// 		var data = {};
		// 		var element = json.item;
		// 		get$6_('v1/items/similar?id=' + element.id, params, function (json) {
		// 			var similars = [];
		// 			if (json.items) {
		// 				for (var i in json.items) {
		// 					var item = json.items[i];
		// 					similars.push(tocard_(item));
		// 				}
		// 				status.append('simular', {
		// 					results: similars
		// 				});
		// 			}
		// 		}, onerror);
		// 		get$6_('v1/items/comments?id=' + element.id, params, function (json) {
		// 			var comments = [];
		// 			if (json.comments) {
		// 				for (var i in json.comments) {
		// 					var com = json.comments[i];
		// 					com.text = com.message.replace(/\[n|r|t]/g, '');
		// 					com.like_count = com.rating;
		// 					comments.push(com);
		// 				}
		// 				status.append('comments', comments);
		// 			}
		// 		}, onerror);
		// 		data.movie = {
		// 			id: element.id,
		// 			url: url,
		// 			type: element.type,
		// 			source: 'pub',
		// 			title: element.title.split('/')[0],
		// 			original_title: element.title.split('/')[1] ? element.title.split('/')[1] : element.title.split('/')[0],
		// 			name: element.seasons ? element.title.split('/')[0] : '',
		// 			original_name: element.seasons ? element.title.split('/')[1] : '',
		// 			overview: element.plot.replace(/\[n|r|t]/g, ''),
		// 			img: element.posters.big,
		// 			runtime: (element.duration.average || 0) / 1000 / 6 * 100,
		// 			genres: genres$1_(element, json.item),
		// 			vote_average: parseFloat(element.imdb_rating || element.kinopoisk_rating || '0'),
		// 			production_companies: [],
		// 			production_countries: countries(element.countries, json.item),
		// 			budget: element.budget || 0,
		// 			seasons: element.seasons && element.seasons.filter(function (el){
		// 			  el.episode_count = 1;
		// 			  return el
		// 			}) || '',
		// 			release_date: element.year || Lampa.Utils.parseTime(element.created_at).full || '0000',
		// 			number_of_seasons: seasonsCount_(element).seasons,
		// 			number_of_episodes: seasonsCount_(element).episodes,
		// 			first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year || Lampa.Utils.parseTime(element.created_at).full || '0000' : '', 
		// 			background_image: element.posters.wide,
        //   imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
        //   kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
        //   imdb_id:'tt' +element.imdb,
        //   kinopoisk_id:element.kinopoisk
		// 		};
		// 		status.append('persons', persons(json));
		// 		status.append('movie', data.movie);
		// 		if(Lampa.Storage.get('pro_pub', false)) status.append('videos', videos(element));
		// 	}, onerror);
		// }
		// function menu$1_(params, oncomplite) {
		// 	var u = url$1_('v1/types', params);
		// 	var typeName = '';
		// 	Pub.network["native"](u, function (json) {
		// 		Lampa.Select.show({
		// 			title: Lampa.Lang.translate('title_category'),
		// 			items: json.items,
		// 			onBack: this.onBack,
		// 			onSelect: function onSelect(a) {
		// 				type = a.id;
		// 				typeName = a.title;
		// 				get$6_('v1/genres?type=' + a.id, params, function (jsons) {
		// 					Lampa.Select.show({
		// 						title: Lampa.Lang.translate('full_genre'),
		// 						items: jsons.items,
		// 						onBack: function onBack() {
		// 							menu$1_(params, oncomplite);
		// 						},
		// 						onSelect: function onSelect(a) {
		// 							Lampa.Activity.push({
		// 								url: type,
		// 								title: Lampa.Lang.translate('title_catalog') + ' - ' + typeName + ' - ' + a.title + ' - KinoPUB',
		// 								component: 'category',
		// 								typeName: typeName,
		// 								janr: a.title,
		// 								genres: a.id,
		// 								id: a.id,
		// 								source: 'pub',
		// 								card_type: true,
		// 								page: 1
		// 							});
		// 						}
		// 					});
		// 				}, onerror);
		// 			}
		// 		});
		// 	});
		// }
		// function seasons$2_(tv, from, oncomplite) {
		// 	Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
		// }
		// function person$2_(params, oncomplite, onerror) {
		// 	var u = url$1_('v1/items', params);
		// 	Pub.network["native"](u, function (json, all) {
		// 		var data = {};
		// 		if (json.items) {
		// 			data.person = {
		// 				name: params.id,
		// 				biography: '',
		// 				img: '',
		// 				place_of_birth: '',
		// 				birthday: '----'
		// 			};
		// 			var similars = [];
		// 			for (var i in json.items) {
		// 				var item = json.items[i];
		// 				similars.push(tocard_(item));
		// 			}
		// 			data.credits = {
		// 				movie: similars,
		// 				knownFor: [{
		// 				  name: '', 
		// 				  credits: similars
		// 				}]
		// 			};
		// 		}
		// 		oncomplite(data);
		// 	}, onerror);
		// }
		// function clear$3_() {
		// 	Douban.network.clear();
		// }
		// function seasonsCount_(element) {
		// 	var data = {
		// 		seasons: 0,
		// 		episodes: 0
		// 	};
		// 	if (element.seasons) {
		// 		data.seasons = element.seasons.length;
		// 		element.seasons.forEach(function (ep) {
		// 			data.episodes += ep.episodes.length;
		// 		})
		// 	}
		// 	return data;
		// }
		// function videos(element) {
		// 	var data = [];
		// 	if (element.trailer) {
		// 		data.push({
		// 			name: element.trailer.title,
		// 			url: element.trailer.url,
		// 			player: true
		// 		});
		// 	}
		// 	return data.length ? {
		// 		results: data
		// 	} : false;
		// }
		// function persons(json) {
		// 	var data = [];
		// 	if (json.item.cast) {
		// 		json.item.cast.split(',').forEach(function (name) {
		// 			data.push({
		// 				name: name,
		// 				id: name,
		// 				character: Lampa.Lang.translate('title_actor'),
		// 			});
		// 		});
		// 	}
		// 	return data.length ? {
		// 		cast: data
		// 	} : false;
		// }
		// function genres$1_(element, json) {
		// 	var data = [];
		// 	element.genres.forEach(function (id) {
		// 		if (id) {
		// 			data.push({
		// 				id: id.id,
		// 				name: id.title
		// 			});
		// 		}
		// 	});
		// 	return data;
		// }
		// function countries(element, json) {
		// 	var data = [];
		// 	if (element && json.countries) {
		// 		data.push({
		// 			name: element[0].title
		// 		});
		// 	}
		// 	return data;
		// }
		// function search$3_() {
		// 	var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		// 	var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
		// 	var status = new Lampa.Status(2);
		// 	status.onComplite = function (data) {
		// 		var items = [];
		// 		if (data.movie && data.movie.results.length) items.push(data.movie);
		// 		if (data.tv && data.tv.results.length) items.push(data.tv);
		// 		oncomplite(items);
		// 	};
		// 	var mov = params;
		// 	mov.type = '';
		// 	mov.field = 'title';
		// 	mov.perpage = 20;
		// 	get$6_('v1/items/search', mov, function (json) {
		// 		var items = [];
		// 		var itemss = [];
		// 		if (json.items) {
		// 			json.items.forEach(function (element) {
		// 				if(element.type == 'movie') items.push(tocard_(element));
		// 				else itemss.push(tocard_(element));
		// 			});
		// 			var movie = {
		// 				results: items,
		// 				page: json.pagination.current,
		// 				total_pages: json.pagination.total,
		// 				total_results: json.pagination.total_items,
		// 				title: Lampa.Lang.translate('menu_movies') +' ('+items.length+')',
		// 				type: 'movie'
		// 			};
		// 			status.append('movie', movie);
		// 			var tv = {
		// 				results: itemss,
		// 				page: json.pagination.current,
		// 				total_pages: json.pagination.total,
		// 				total_results: json.pagination.total_items,
		// 				title: Lampa.Lang.translate('menu_tv') +' ('+itemss.length+')',
		// 				type: 'tv'
		// 			};
		// 			status.append('tv', tv);
		// 		}
		// 	}, status.error.bind(status));
		// }
		// function discovery() {
		// 	return {
		// 		title: 'PUB',
		// 		search: search$3_,
		// 		params: {
		// 			align_left: true,
		// 			object: {
		// 				source: 'pub'
		// 			}
		// 		},
		// 		onMore: function onMore(params) {
		// 			Lampa.Activity.push({
		// 				url: 'v1/items/search?field=title&type=' + params.data.type,
		// 				title: Lampa.Lang.translate('search') + ' - ' + params.query,
		// 				component: 'category_full',
		// 				page: 2,
		// 				query: encodeURIComponent(params.query),
		// 				source: 'pub'
		// 			});
		// 		},
		// 		onCancel: Pub.network.clear.bind(Pub.network)
		// 	};
		// }
		// var DOUBAN = {
		// 	main: main$2_,
		// 	menu: menu$1_,
		// 	full: full$1_,
		// 	search: search$3_,
		// 	person: person$2_,
		// 	list: list$2_,
		// 	seasons: seasons$2_,
		// 	category: category$1_,
		// 	clear: clear$3_,
		// 	discovery: discovery
		// };
		// Lampa.Api.sources.douban = DOUBAN;
    
    // function include(url) {
    //   var script = document.createElement('script');
    //   script.src = url;
    //   document.getElementsByTagName('head')[0].appendChild(script);
    // }
    
	}
	if (!window.plugin_modss) startPlugin();

})();
 
