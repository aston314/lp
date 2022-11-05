(function () {
	'use strict';

	function rating_db_imdb(card) {
		var clean_title = card.title.replace(/[ .,:;!?]+/g, ' ').trim();
		var search_date = card.release_date || card.first_air_date || card.last_air_date || '0000';
		var search_year = parseInt((search_date + '').slice(0, 4));
		var orig = card.original_title || card.original_name;
		var params = {
			id: card.id,
			cache_time: 60 * 60 * 24 * 1000 //86400000 сек = 1день Время кэша в секундах
		};
		getRating();

		function getRating() {
			var network = new Lampa.Reguest();
			var movieRating = _getCache(params.id);
			if (movieRating) {
				return _showRating(movieRating[params.id]);
			} else {
				network.clear();
				network.timeout(5000);
				network.silent(params.url + 'https://m.douban.com/search/?query=' + encodeURIComponent(orig), function (json) {
					var poster_douban = $('.search-results-modules-name:contains(电影) + ul > li:nth-child(1) > a', json).attr('href');
                    var rating_douban = $('.search-results-modules-name:contains(电影) + ul > li:nth-child(1) > a > div > p > span:nth-child(2)', json).text();
					if (poster_douban) {
						network.clear();
						network.timeout(5000);
						network.silent('https://movie.douban.com/'+poster_douban.replace('/movie/',''), function (data) {
							movieRating = _setCache(params.id, {
								db: rating_douban,
								imdb: 0,
								timestamp: new Date().getTime()
							}); // Кешируем данные
							return _showRating(movieRating, params.id);
						}, function (a, c) {
							Lampa.Noty.show(network.errorDecode(a, c));
						}, false, {
							headers: params.headers
						});
					} else {
						movieRating = _setCache(params.id, {
							db: 0,
							imdb: 0,
							timestamp: new Date().getTime()
						}); // Кешируем данные
						return _showRating(movieRating);
					}
				}, function (a, c) {
					Lampa.Noty.show('豆瓣   ' + network.errorDecode(a, c));
				}, false, {
					
				});
			}
		}

		function _getCache(movie) {
			var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache('db_rating', 500, {}); //500 это лимит ключей
			if (cache[movie]) {
				if ((timestamp - cache[movie].timestamp) > params.cache_time) {
					// Если кеш истёк, чистим его
					delete cache[movie];
					Lampa.Storage.set('db_rating', cache);
					return false;
				}
			} else return false;
			return cache;
		}

		function _setCache(movie, data) {
			var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache('db_rating', 500, {}); //500 это лимит ключей
			if (!cache[movie]) {
				cache[movie] = data;
				Lampa.Storage.set('db_rating', cache);
			} else {
				if ((timestamp - cache[movie].timestamp) > params.cache_time) {
					data.timestamp = timestamp;
					cache[movie] = data;
					Lampa.Storage.set('db_rating', cache);
				} else data = cache[movie];
			}
			return data;
		}

		function _showRating(data, movie) {
			if (data) {
				var db_rating = !isNaN(data.db) && data.db !== null ? parseFloat(data.db).toFixed(1) : '0.0';
				var imdb_rating = !isNaN(data.imdb) && data.imdb !== null ? parseFloat(data.imdb).toFixed(1) : '0.0';
				var render = Lampa.Activity.active().activity.render();
				$('.wait_rating', render).remove();
				$('.rate--imdb', render).removeClass('hide').find('> div').eq(0).text(imdb_rating);
				$('.rate--db', render).removeClass('hide').find('> div').eq(0).text(db_rating);
			}
		}
	}

	function startPlugin() {
		window.db_rating_plugin = true;
		Lampa.Listener.follow('full', function (e) {
			if (e.type == 'complite') {
				var render = e.object.activity.render();
				if ($('.rate--db', render).hasClass('hide') && !$('.wait_rating', render).length) {
					$('.info__rate', render).after('<div style="width:2em;margin-top:1em;margin-right:1em" class="wait_rating"><div class="broadcast__scan"><div></div></div><div>');
					rating_db_imdb(e.data.movie);
				}
			}
		});
	}
	if (!window.db_rating_plugin) startPlugin();
})();
