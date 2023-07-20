(function () {
    'use strict';
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
        var player = window.radio_player_;

        this.getQueryString = function (link, name) {
            let reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
            //console.log(link)
            let r = link.match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            };
            return null;
        };

        this.create = function () {
            var _this = this;
            if (object.type == 'play') {
                //console.log(object);
                this.activity.loader(true);

                Lampa.Template.add('play_list', "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css\"><div class=\"player\"> <div class=\"details\"> <div class=\"now-playing\">PLAYING x OF y</div> <div class=\"track-art\"></div> <div class=\"track-name\">Track Name</div> <div class=\"track-artist\">Track Artist</div> </div> <div class=\"buttons\"> <div class=\"prev-track selector\"><i class=\"fa fa-step-backward fa-2x\"></i></div> <div class=\"playpause-track selector\"><i class=\"fa fa-play-circle fa-5x\"></i></div> <div class=\"next-track selector\"><i class=\"fa fa-step-forward fa-2x\"></i></div> </div> <div class=\"slider_container\"> <div class=\"current-time\">00:00</div> <input type=\"range\" min=\"1\" max=\"100\" value=\"0\" class=\"seek_slider\"> <div class=\"total-duration\">00:00</div> </div> <div class=\"slider_container\"> <i class=\"fa fa-volume-down\"></i> <input type=\"range\" min=\"1\" max=\"100\" value=\"99\" class=\"volume_slider\" onchange=\"setVolume()\"> <i class=\"fa fa-volume-up\"></i> </div> </div>");
                Lampa.Template.add('play_style', "<style>.player {  display: flex; align-items: center; flex-direction: column; justify-content: center; } .details { display: flex; align-items: center; flex-direction: column; justify-content: center; margin-top: 25px; margin-bottom: 15px; } .track-art { margin: 25px; height: 250px; width: 250px; background-image: url(\"https://images.pexels.com/photos/262034/pexels-photo-262034.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260\"); background-size: cover; border-radius: 15%; } .now-playing { font-size: 1em; } .track-name { font-size: 3em; margin-bottom: 10px; } .track-artist { font-size: 1.5em; } .buttons { display: flex; flex-direction: row; align-items: center; } .playpause-track, .prev-track, .next-track { padding: 25px; opacity: 0.8; /* Smoothly transition the opacity */ transition: opacity .2s; } .playpause-track:hover, .prev-track:hover, .next-track:hover { opacity: 1.0; } .slider_container { width: 75%; max-width: 400px; display: flex; justify-content: center; align-items: center; } /* Modify the appearance of the slider */ .seek_slider, .volume_slider { -webkit-appearance: none; -moz-appearance: none; appearance: none; height: 5px; background: black; opacity: 0.7; -webkit-transition: .2s; transition: opacity .2s; } /* Modify the appearance of the slider thumb */ .seek_slider::-webkit-slider-thumb, .volume_slider::-webkit-slider-thumb { -webkit-appearance: none; -moz-appearance: none; appearance: none; width: 15px; height: 15px; background: white; cursor: pointer; border-radius: 50%; } .seek_slider:hover, .volume_slider:hover { opacity: 1.0; } .seek_slider { width: 60%; } .volume_slider { width: 30%; } .current-time, .total-duration { padding: 10px; } i.fa-volume-down, i.fa-volume-up { padding: 10px; } i.fa-play-circle, i.fa-pause-circle, i.fa-step-forward, i.fa-step-backward { cursor: pointer; } </style>");
                $('body').append(Lampa.Template.get('play_style', {}, true));
                var btn = Lampa.Template.get('play_list');
                var empty = new Lampa.Empty({
                });
                //console.log(empty)
                html.append(empty.render());
                html.find('.empty').append(btn);
                // html.find('.empty').hide();

                var now_playing = html.find(".now-playing");
                var track_art = html.find(".track-art");
                var track_name = html.find(".track-name");
                var track_artist = html.find(".track-artist");

                var playpause_btn = html.find(".playpause-track");
                var next_btn = html.find(".next-track");
                var prev_btn = html.find(".prev-track");

                var seek_slider = html.find(".seek_slider");
                var volume_slider = html.find(".volume_slider");
                var curr_time = html.find(".current-time");
                var total_duration = html.find(".total-duration");

                var track_index = 0;
                var isPlaying = false;
                var updateTimer;

                // Create new audio element
                var curr_track = new Audio();


                // Define the tracks that have to be played
                // console.log(object)
                // var track_list = [
                //   {
                //     name: object.content.title,
                //     artist: object.content.desc.replace('正在直播： ','',),
                //     image: 'https:'+ object.content.imgUrl,
                //     path: object.url,
                //   },
                //   {
                //     name: "Enthusiast",
                //     artist: "Tours",
                //     image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
                //     path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
                //   },
                //   {
                //     name: "Shipping Lanes",
                //     artist: "Chad Crouch",
                //     image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
                //     path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
                //   },
                // ];
                var track_list = object.content;

                function loadTrack(track_index) {
                    clearInterval(updateTimer);
                    resetValues();

                    // Load a new track
                    curr_track.src = track_list[track_index].path;
                    curr_track.load();

                    // Update details of the track
                    //   track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
                    // empty.render().find('.track-art').attr('src', object.url);
                    track_art.css("background-image", "url(" + track_list[track_index].image + ")");
                    track_name.text(track_list[track_index].name);
                    track_artist.text(track_list[track_index].artist);
                    now_playing.text("PLAYING " + (track_index + 1) + " OF " + track_list.length);

                    // Set an interval of 1000 milliseconds for updating the seek slider
                    updateTimer = setInterval(seekUpdate, 1000);

                    // Move to the next track if the current one finishes playing
                    curr_track.addEventListener("ended", nextTrack);

                    // Apply a random background color
                    random_bg_color();
                }

                function random_bg_color() {

                    // Get a random number between 64 to 256 (for getting lighter colors)
                    var red = (Math.random() * 128) | 0;
                    var green = (Math.random() * 128) | 0;
                    var blue = (Math.random() * 128) | 0;

                    // Construct a color withe the given values
                    var bgColor = "rgb(" + red + "," + green + "," + blue + ")";

                    // Set the background to that color
                    //   document.body.style.background = bgColor;
                    //   console.log($('.empty'))
                    //   $('.activity__body')
                    // prev_btn.toggleClass('focus');
                    // playpause_btn.toggleClass('focus');

                    seek_slider.css("background-color", '#ffffff');
                    html.find('.empty__img').remove();
                    html.find('.empty__title').remove();
                    html.find('.empty__descr').remove();
                    html.find('.player').css("background-color", bgColor);
                    html.find('.slider_container').eq(1).hide();
                }

                // Reset Values
                function resetValues() {
                    curr_time.text("00:00");
                    total_duration.text("00:00");
                    seek_slider.val(0);
                }

                function playpauseTrack() {
                    if (!isPlaying) playTrack();
                    else pauseTrack();
                }

                function playTrack() {
                    if (typeof curr_track.play === 'function') {
                        curr_track.play();
                    }

                    isPlaying = true;

                    // Replace icon with the pause icon
                    //   playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
                    playpause_btn.html('<i class="fa fa-pause-circle fa-5x"></i>');


                }

                function pauseTrack() {
                    if (typeof curr_track.pause === 'function') {
                        curr_track.pause();
                    }

                    isPlaying = false;

                    // Replace icon with the play icon
                    //   playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
                    playpause_btn.html('<i class="fa fa-play-circle fa-5x"></i>');
                }

                function nextTrack() {
                    if (track_index < track_list.length - 1)
                        track_index += 1;
                    else track_index = 0;
                    loadTrack(track_index);
                    playTrack();
                }

                function prevTrack() {
                    if (track_index > 0)
                        track_index -= 1;
                    else track_index = track_list.length;
                    loadTrack(track_index);
                    playTrack();
                }

                function seekTo() {
                    var seekto = curr_track.duration * (seek_slider.val() / 100);
                    curr_track.currentTime = seekto;
                }

                function setVolume() {
                    curr_track.volume = volume_slider.val() / 100;
                }
                

                function seekUpdate() {
                    var seekPosition = 0;

                    // Check if the current track duration is a legible number
                    if (!isNaN(curr_track.duration)) {
                        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                        seek_slider.val(seekPosition);

                        // Calculate the time left and the total duration
                        var currentMinutes = Math.floor(curr_track.currentTime / 60);
                        var currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                        var durationMinutes = Math.floor(curr_track.duration / 60);
                        var durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

                        // Adding a zero to the single digit time values
                        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

                        curr_time.text(currentMinutes + ":" + currentSeconds);
                        total_duration.text(durationSeconds ? durationMinutes + ":" + durationSeconds : '∞');
                    }
                }
                //   function setButtonStyles(buttonId,buttonHtml) {
                //       var buttons = ["playpause_btn", "next_btn", "prev_btn"];

                //       const focusStyles = {
                //           "border-radius": "50%",
                //           "background-color": "transparent", // Set transparent background by default
                //       };

                //       const commonStyles = {
                //           "background-color": "rgba(128, 128, 128, 0.5)",
                //       };


                //       if (buttons.includes(buttonId)) {
                //         buttonHtml.css(commonStyles)
                //       } else {

                //       }
                //   }

                // 调用函数并传入按钮名称
                // setButtonStyles("playpause_btn");
                // setButtonStyles("next_btn");
                // setButtonStyles("prev_btn");


                // 调用函数并传入按钮名称
                // setButtonStyles("playpause_btn");
                // setButtonStyles("next_btn");
                // setButtonStyles("prev_btn");

                // Load the first track in the tracklist
                loadTrack(track_index);
                playpause_btn.on('hover:enter click', function () {
                    playpauseTrack();
                });
                playpause_btn.on('hover:focus', function () {
                    playpause_btn.css({
                        "background-color": "rgba(128, 128, 128, 0.5)", /* 0.5 represents 50% opacity (semi-transparent gray) */
                        "border-radius": "50%",
                    });
                    next_btn.css({
                        "background-color": "transparent",
                        "border-radius": "50%",
                    });
                    prev_btn.css({
                        "background-color": "transparent",
                        "border-radius": "50%",
                    });

                    //   console.log('fff')
                    // setButtonStyles("playpause_btn");
                });
                prev_btn.on('hover:enter click', function () {
                    prevTrack();
                });
                prev_btn.on('hover:focus', function () {
                    prev_btn.css({
                        "background-color": "rgba(128, 128, 128, 0.5)", /* 0.5 represents 50% opacity (semi-transparent gray) */
                        "border-radius": "50%",
                    });
                    playpause_btn.css({
                        "background-color": "transparent",
                        "border-radius": "50%",
                    });
                    next_btn.css({
                        "background-color": "transparent",
                        "border-radius": "50%",
                    });
                    //   console.log('<')
                    // setButtonStyles("prev_btn");
                });
                next_btn.on('hover:enter click', function () {
                    nextTrack();
                });
                next_btn.on('hover:focus', function () {
                    next_btn.css({
                        "background-color": "rgba(128, 128, 128, 0.5)", /* 0.5 represents 50% opacity (semi-transparent gray) */
                        "border-radius": "50%",
                    });
                    playpause_btn.css({
                        "background-color": "transparent",
                        "border-radius": "50%",
                    });
                    prev_btn.css({
                        "background-color": "transparent",
                        "border-radius": "50%",
                    });
                    // console.log('>')
                    // setButtonStyles("next_btn");
                });
                // seek_slider.on('hover:enter click', function () {
                //     seekTo();
                // });

                //console.log(object)

                // var audioPlayer, progressBar;
                // var playPauseButton = empty.render().find('#play-pause-button');
                // // console.log(audioPlayer,playPauseButton)
                // empty.render().find('#audio-player').attr('src', object.url);

                // progressBar = empty.render().find("#progress");
                // audioPlayer = empty.render().find('#audio-player')[0];

                // // 初始化HLS.js
                // if (Hls.isSupported()) {
                //   var hls = new Hls();
                //   hls.loadSource(object.url);
                //   hls.attachMedia(audioPlayer);
                //   hls.on(Hls.Events.MANIFEST_PARSED, function () {
                //     audioPlayer.play();
                //     // 绑定timeupdate事件
                //     //audioPlayer.addEventListener("timeupdate", playbackTimeUpdate(audioPlayer));
                //   });
                // } else if (audioPlayer.canPlayType("application/vnd.apple.mpegurl")) {
                //   audioPlayer.src = object.url;
                // }

                // if (audioPlayer.paused) {
                //   playPauseButton.removeClass("play").addClass("pause");
                // }

                // empty.render().find('#play-pause-button').on('hover:enter click', function () {
                //   if (audioPlayer.paused) {
                //     audioPlayer.play();
                //     playPauseButton.removeClass("play").addClass("pause");
                //   } else {
                //     audioPlayer.pause();
                //     //audioPlayer.currentTime = 0;
                //     //hls.detachMedia();
                //     //hls.destroy();
                //     // audioPlayer.dispose();
                //     playPauseButton.removeClass("pause").addClass("play");
                //   }
                // });

                // audioPlayer.addEventListener("loadedmetadata", function () {
                //   audioPlayer.addEventListener("timeupdate", function () {
                //     var currentTime = audioPlayer.currentTime;
                //     var duration = audioPlayer.duration;

                //     var minutes = Math.floor(currentTime / 60);
                //     var seconds = Math.floor(currentTime % 60);

                //     var durationMinutes = Math.floor(duration / 60);
                //     var durationSeconds = Math.floor(duration % 60);

                //     var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                //     //console.log(progress)
                //     progressBar.css("width", progress + "%");

                //     // 更新进度条文本
                //     empty.render().find(".progress-text").text(
                //       //("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + " / " + ("0" + durationMinutes).slice(-2) + ":" + ("0" + durationSeconds).slice(-2)
                //       ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + " / ∞ "
                //     );
                //   });
                // });


                _this.start = empty.start;
                _this.activity.loader(false);
                _this.activity.toggle();

            } else {
                var postdata;
                if (object.keyword) {
                    postdata = { "query": "{\n        searchResultsPage(keyword:\"" + object.keyword + "\", page:1, include:\"channel_live\" ) {\n          tdk,\n          searchData,\n          numFound\n        }\n      }" };
                } else {
                    postdata = { "query": "{\n    radioPage(cid:" + object.cid + ", page:" + object.page + "){\n      contents\n    }\n  }" }
                };

                this.activity.loader(true);

                network.silent(object.url, this.build.bind(this), function () {
                    var empty = new Lampa.Empty();
                    html.append(empty.render());
                    _this.start = empty.start;

                    _this.activity.loader(false);

                    _this.activity.toggle();
                }, postdata);
                return this.render();
            }
        };

        this.next = function () {
            var postdata;
            if (object.keyword) {
                postdata = postdata = { "query": "{\n        searchResultsPage(keyword:\"" + object.keyword + "\", page:" + (parseInt(object.page++) + 1) + ", include:\"channel_live\" ) {\n          tdk,\n          searchData,\n          numFound\n        }\n      }" };;
            } else {
                postdata = { "query": "{\n    radioPage(cid:" + object.cid + ", page:" + (parseInt(object.page++) + 1) + "){\n      contents\n    }\n  }" };
            };

            //console.log(postdata)

            var _this2 = this;

            if (waitload) return;

            //if (object.page < 50) {
            waitload = true;
            //object.page++;
            var new_data;
            network.silent(object.url, function (result) {
                if (object.keyword) {
                    new_data = result.data.searchResultsPage.searchData;
                } else {
                    new_data = result.data.radioPage.contents.items;
                };
                _this2.append(new_data);
                if (new_data.length) waitload = false;
                Lampa.Controller.enable('content');
            }, false, postdata);
            //}
        };

        this.append = function (data) {
            var _this3 = this;

            data.forEach(function (element) {
                var mytitle = element.title.replace('/', ' ');
                if (mytitle.indexOf(' ' != -1)) mytitle = mytitle.split(' ')[0]
                var card = Lampa.Template.get('card', {
                    title: element.title.replace(/\(.+?\)/, ''),
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
                if (element.subtitle) {
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(element.subtitle.split(' ')[0]);
                };
                if (element.score) {
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
                    if (Math.ceil(items.indexOf(card) / 7) >= maxrow && maxrow > 0 && items.length >= 12) _this3.next();
                    //if (element.imgUrl) Lampa.Background.change('https:' + element.imgUrl.replace('l_ratio_poster','s_ratio_poster'));
                    //if (Lampa.Helper) Lampa.Helper.show('qt_detail', '长按住 (ОК) 键查看详情', card);
                });

                // card.on('hover:enter', function (target, card_data) {
                //     // if (!!window.cordova) {
                //     //   var video = {
                //     //     title: element.title,
                //     //     //url: 'http://lhttp.qingting.fm/live/' + element.id + '/64k.mp3',
                //     //     url: 'https://ls.qingting.fm/live/' + element.id + '.m3u8',
                //     //     tv: true
                //     //   };
                //     //   var playlist = [];
                //     //   //http://lhttp.qingting.fm/live/
                //     //   //https://lhttp.qtfm.cn/live/
                //     //   data.forEach(function (elem) {
                //     //     playlist.push({
                //     //       title: elem.title,
                //     //       //url: 'http://lhttp.qingting.fm/live/' + elem.id + '/64k.mp3',
                //     //       url: 'https://ls.qingting.fm/live/' + elem.id + '.m3u8',
                //     //       tv: true
                //     //     });
                //     //   });
                //     //   Lampa.Player.play(video);
                //     //   Lampa.Player.playlist(playlist);
                //     // } else {

                //     Lampa.Utils.putScriptAsync(['https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js'], function () {
                //         var localDateTime = new Date();
                //         // var newTime = new Date(localDateTime.getTime() + 1 * 60 * 60 * 1000); // 在当前时间上增加1小时
                //         // var unixTimestamp = Math.floor(newTime.getTime() / 1000); // 转换为 Unix 时间戳
                //         // var hexString = unixTimestamp.toString(16); // 转换为十六进制字符串


                //         // var video = {
                //         //   title: element.title,
                //         //   url: "https://lhttp.qtfm.cn" + t + "?app_id=" + r + "&ts=" + n + "&sign=" + encodeURIComponent(o),
                //         //   tv: true
                //         // };
                //         // var playlist = [];

                //         // Lampa.Player.play(video);
                //         // Lampa.Player.playlist(playlist);
                //         //   var data = {
                //         //     name: element.title,
                //         //     playUrl: { 
                //         //       ts64: "https://lhttp.qtfm.cn" + t + "?app_id=" + r + "&ts=" + n + "&sign=" + encodeURIComponent(o)
                //         //     }
                //         //   };
                //         //   player.play(data);
                //         var playlist = [];
                //         data.forEach(function (elem) {
                //             localDateTime.setHours(localDateTime.getHours() + 1);
                //             var t = "/live/" + elem.id + "/64k.mp3";
                //             var n = Math.floor(localDateTime.getTime() / 1000).toString(16);
                //             var r = "web";
                //             var i = encodeURIComponent(t);
                //             var a = "app_id=" + r + "&path=" + i + "&ts=" + n;
                //             var o = CryptoJS.HmacMD5(a, "Lwrpu$K5oP").toString();
                //             playlist.push({
                //                 name: elem.title,
                //                 artist: elem.desc.replace('正在直播： ', '',),
                //                 image: 'https:' + elem.imgUrl,
                //                 path: "https://lhttp.qtfm.cn" + t + "?app_id=" + r + "&ts=" + n + "&sign=" + encodeURIComponent(o),
                //             });
                //         });
                //         Lampa.Activity.push({
                //             url: "",
                //             title: '蜻蜓FM - ' + element.title,
                //             component: 'qingtingfm',
                //             type: 'play',
                //             content: playlist,
                //             page: 1
                //         });
                //     });



                //     // }
                // });

                body.append(card);
                items.push(card);
            });
        };

        this.build = function (data) {
            var _this2 = this;
            Lampa.Background.change();
            Lampa.Template.add('tv_style', '<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div.activity.layer--width.activity--active > div.activity__body > div > div.scroll.scroll--mask.scroll--over.layer--wheight > div > div > div > div.card.selector.card--collection.card--loaded.focus > div.card__view > img{box-shadow: 0 0 0 0.5em #fff10d!important;}</style>');
            $('body').append(Lampa.Template.get('tv_style', {}, true));
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
                            title: '蜻蜓FM - 搜索"' + new_value + '"',
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
            if (object.keyword) {
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

        this.pause = function () { };

        this.stop = function () { };

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

    function player() {
        var html = Lampa.Template.get('radio_player', {});
        var audio = new Audio();
        var url = '';
        var played = false;
        var hls;
        audio.addEventListener("canplay", function (event) {
            played = true;
            html.toggleClass('loading', false);
        });

        function prepare() {
            if (audio.canPlayType('audio/mpeg;') || audio.canPlayType('application/vnd.apple.mpegurl') || url.indexOf('.aacp') > 0 || url.indexOf('.mp3') > 0) load(); else if (Hls.isSupported()) {
                try {
                    hls = new Hls();
                    hls.attachMedia(audio);
                    hls.loadSource(url);
                    hls.on(Hls.Events.ERROR, function (event, data) {
                        if (data.details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR) {
                            if (data.reason === "no EXTM3U delimiter") {
                                Lampa.Noty.show('流媒体文件加载错误');
                            }
                        }
                    });
                    hls.on(Hls.Events.MANIFEST_LOADED, function () {
                        start();
                    });
                } catch (e) {
                    Lampa.Noty.show('流媒体文件加载错误');
                }
            } else load();
        }

        function load() {
            audio.src = url;
            audio.load();
            start();
        }

        function start() {
            var playPromise;

            try {
                playPromise = audio.play();
            } catch (e) { }

            if (playPromise !== undefined) {
                playPromise.then(function () {
                    console.log('Radio', 'start plaining');
                })["catch"](function (e) {
                    console.log('Radio', 'play promise error:', e.message);
                });
            }
        }

        function play() {
            html.toggleClass('loading', true);
            html.toggleClass('stop', false);
            prepare();
        }

        function stop() {
            played = false;
            html.toggleClass('stop', true);
            html.toggleClass('loading', false);

            if (hls) {
                hls.destroy();
                hls = false;
            }

            audio.src = '';
        }

        html.on('hover:enter', function () {
            if (played) stop(); else if (url) play();
        });

        html.on('hover:long', function () {
            if (played) stop();
            html.toggleClass('hide', true);
        });

        this.create = function () {
            $('.head__actions .open--search').before(html);
        };

        this.play = function (data) {
            stop();
            //   url = data.stream_320 ? data.stream_320 : data.stream_128 ? data.stream_128 : data.stream_hls.replace('playlist.m3u8', '96/playlist.m3u8');
            //   url = data.playUrl.ts64;
            url = data.playUrl.ts64;
            html.find('.radio-player__name').text(data.name);
            html.toggleClass('hide', false);
            play();
        };
    }

    function startqingtingfm() {
        window.plugin_qingting_ready = true;
        Lampa.Component.add('qingtingfm', qingtingfm);

        function addSettingsXztiao() {
            Lampa.Template.add('radio_item', "<div class=\"selector radio-item\">\n        <div class=\"radio-item__imgbox\">\n            <img class=\"radio-item__img\" />\n        </div>\n\n        <div class=\"radio-item__name\">{name}</div>\n    </div>");
            Lampa.Template.add('radio_player', "<div class=\"selector radio-player stop hide\">\n        <div class=\"radio-player__name\">Radio Record</div>\n\n        <div class=\"radio-player__button\">\n            <i></i>\n            <i></i>\n            <i></i>\n            <i></i>\n        </div>\n    </div>");
            Lampa.Template.add('radio_style', "<style>\n    .radio-item {\n        width: 8em;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-item__imgbox {\n        background-color: #3E3E3E;\n        padding-bottom: 83%;\n        position: relative;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n      }\n      .radio-item__img {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n      .radio-item__name {\n        font-size: 1.1em;\n        margin-top: 0.8em;\n      }\n      .radio-item.focus .radio-item__imgbox:after {\n        border: solid 0.4em #fff;\n        content: \"\";\n        display: block;\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n      }\n      .radio-item + .radio-item {\n        margin-left: 1em;\n      }\n      \n      @-webkit-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @-moz-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @-o-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      @-webkit-keyframes sound-loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n                  transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n                  transform: rotate(360deg);\n        }\n      }\n      @-moz-keyframes sound-loading {\n        0% {\n          -moz-transform: rotate(0deg);\n               transform: rotate(0deg);\n        }\n        100% {\n          -moz-transform: rotate(360deg);\n               transform: rotate(360deg);\n        }\n      }\n      @-o-keyframes sound-loading {\n        0% {\n          -o-transform: rotate(0deg);\n             transform: rotate(0deg);\n        }\n        100% {\n          -o-transform: rotate(360deg);\n             transform: rotate(360deg);\n        }\n      }\n      @keyframes sound-loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n             -moz-transform: rotate(0deg);\n               -o-transform: rotate(0deg);\n                  transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n             -moz-transform: rotate(360deg);\n               -o-transform: rotate(360deg);\n                  transform: rotate(360deg);\n        }\n      }\n      .radio-player {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n           -moz-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n        padding: 0.2em 0.8em;\n        background-color: rgb(255 255 255 / 0%);\n      }\n      .radio-player__name {\n        margin-right: 1em;\n        white-space: nowrap;\n        overflow: hidden;\n        -o-text-overflow: ellipsis;\n           text-overflow: ellipsis;\n        max-width: 8em;\n      }\n      @media screen and (max-width: 385px) {\n        .radio-player__name {\n          display: none;\n        }\n      }\n      .radio-player__button {\n        position: relative;\n        width: 1.5em;\n        height: 1.5em;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n           -moz-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n           -moz-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player__button i {\n        display: block;\n        width: 0.2em;\n        background-color: #fff;\n        margin: 0 0.1em;\n        -webkit-animation: sound 0ms -800ms linear infinite alternate;\n           -moz-animation: sound 0ms -800ms linear infinite alternate;\n             -o-animation: sound 0ms -800ms linear infinite alternate;\n                animation: sound 0ms -800ms linear infinite alternate;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player__button i:nth-child(1) {\n        -webkit-animation-duration: 474ms;\n           -moz-animation-duration: 474ms;\n             -o-animation-duration: 474ms;\n                animation-duration: 474ms;\n      }\n      .radio-player__button i:nth-child(2) {\n        -webkit-animation-duration: 433ms;\n           -moz-animation-duration: 433ms;\n             -o-animation-duration: 433ms;\n                animation-duration: 433ms;\n      }\n      .radio-player__button i:nth-child(3) {\n        -webkit-animation-duration: 407ms;\n           -moz-animation-duration: 407ms;\n             -o-animation-duration: 407ms;\n                animation-duration: 407ms;\n      }\n      .radio-player__button i:nth-child(4) {\n        -webkit-animation-duration: 458ms;\n           -moz-animation-duration: 458ms;\n             -o-animation-duration: 458ms;\n                animation-duration: 458ms;\n      }\n      .radio-player.stop .radio-player__button {\n        -webkit-border-radius: 100%;\n           -moz-border-radius: 100%;\n                border-radius: 100%;\n        border: 0.2em solid #fff;\n      }\n      .radio-player.stop .radio-player__button i {\n        display: none;\n      }\n      .radio-player.stop .radio-player__button:after {\n        content: \"\";\n        width: 0.5em;\n        height: 0.5em;\n        background-color: #fff;\n      }\n      .radio-player.loading .radio-player__button:before {\n        content: \"\";\n        display: block;\n        border-top: 0.2em solid #fff;\n        border-left: 0.2em solid transparent;\n        border-right: 0.2em solid transparent;\n        border-bottom: 0.2em solid transparent;\n        -webkit-animation: sound-loading 1s linear infinite;\n           -moz-animation: sound-loading 1s linear infinite;\n             -o-animation: sound-loading 1s linear infinite;\n                animation: sound-loading 1s linear infinite;\n        width: 0.9em;\n        height: 0.9em;\n        -webkit-border-radius: 100%;\n           -moz-border-radius: 100%;\n                border-radius: 100%;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player.loading .radio-player__button i {\n        display: none;\n      }\n      .radio-player.focus {\n        background-color: #fff;\n        color: #000;\n      }\n      .radio-player.focus .radio-player__button {\n        border-color: #000;\n      }\n      .radio-player.focus .radio-player__button i, .radio-player.focus .radio-player__button:after {\n        background-color: #000;\n      }\n      .radio-player.focus .radio-player__button:before {\n        border-top-color: #000;\n      }\n    </style>");
            window.radio_player_ = new player();

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
            $('body').append(Lampa.Template.get('radio_style', {}, true));
            window.radio_player_.create();
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
