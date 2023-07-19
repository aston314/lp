(function () {
    'use strict';
    var musiclist = [];
    var currentplaylist = [];
    var currentIndex = 0;
    // https://mu-api.yuk0.com
    // https://ncm.icodeq.com/
    // https://netease-cloud-music-api-psi-silk.vercel.app
    // https://api-mymusic.vercel.app
    // https://mu-api.yuk0.com
    var apiurl = 'https://ncm.icodeq.com'
    function MUSIC(object) {
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
        

        this.getAsUriParameters = function (data) {
            var url = '';
            for (var prop in data) {
                url += encodeURIComponent(prop) + '=' +
                    encodeURIComponent(data[prop]) + '&';
            }
            return url.substring(0, url.length - 1)
        }
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
            //console.log(object.url)
            //s: 关键字

            // limit: 返回数据条数限制

            // type: 搜索类型

            // 1 单曲
            // 10 专辑
            // 100 歌手
            // 1000 歌单
            // 1002 用户
            // 1009 电台
            // NULL 推荐（实测失效）
            // offset: 偏移数量，用于分页
            // http://music.163.com/api/search/get/web?csrf_token=hlpretag=&hlposttag=&s={搜索内容}&type=1&offset=0&total=true&limit=20
            // https://blog.51cto.com/u_15064627/2597877
            // limit：返回数据条数（每页获取的数量），默认为20，可以自行更改
            // offset：偏移量（翻页），offset需要是limit的倍数

            // type：搜索的类型
            // type=1 单曲
            // type=10 专辑
            // type=100 歌手
            // type=1000 歌单
            // type=1002 用户
            // type=1004 MV
            // type=1006 歌词
            // type=1009 主播电台
            var postdata = {
                // s: this.getQueryString(object.url, "s"),
                type: 1,
                limit: 24,
                total: "true",
                offset: 0
            };

            var _this = this;

            this.activity.loader(true);
            var urlpara;
            musiclist = [];
            // var current_version = typeof AndroidJS !== "undefined" ? AndroidJS.appVersion() : "0";
            // var isLampaTV = current_version.startsWith("7.");
            if (!!window.cordova) {
                if (object.type == 'album') {
                    urlpara = '';
                } else {
                    urlpara = (object.url.indexOf("?") !== -1 ? '&' : '?') + this.getAsUriParameters(postdata);
                }
                network.silent(object.url + urlpara, this.build.bind(this), function () {
                    var empty = new Lampa.Empty();
                    html.append(empty.render());
                    _this.start = empty.start;

                    _this.activity.loader(false);

                    _this.activity.toggle();
                }, false, false, {
                    dataType: 'json'
                });
            } else {
                urlpara = (object.url.indexOf("?") !== -1 ? '&' : '?') + this.getAsUriParameters(postdata);
                object.code == '1' ? urlpara = '' : urlpara;

                network["native"](object.url + urlpara, this.build.bind(this), function () {
                    var empty = new Lampa.Empty();
                    html.append(empty.render());
                    _this.start = empty.start;

                    _this.activity.loader(false);

                    _this.activity.toggle();
                }, false, false, {
                    dataType: 'json'
                });
            }

            return this.render();
        };

        this.next = function () {

            var postdata = {
                // s: this.getQueryString(object.url, "s"),
                type: 1,
                limit: 24,
                total: "true",
                offset: object.page * 24 + 1
            };
            // console.log(postdata)

            var _this2 = this;

            if (waitload) return;


            //if (object.page < 300) {
            waitload = true;
            object.page++;
            //var u = new URLSearchParams(postdata).toString();
            //console.log(u);
            var urlpara;
            if (object.type == 'album') {
                urlpara = '';
            } else {
                urlpara = (object.url.indexOf("?") !== -1 ? '&' : '?') + this.getAsUriParameters(postdata);
            }
            // var current_version = typeof AndroidJS !== "undefined" ? AndroidJS.appVersion() : "0";
            // var isLampaTV = current_version.startsWith("7.");
            if (!!window.cordova) {
                network.silent(object.url + urlpara, function (result) {
                    _this2.donext(result);
                    // Lampa.Controller.enable('content');
                }, false, false, {
                    dataType: 'json'
                });
            } else {
                network["native"](object.url + urlpara, function (result) {
                    _this2.donext(result);
                    // Lampa.Controller.enable('content');
                }, false, false, {
                    dataType: 'json'
                });
            }

            //}
        };
        this.donext = function (result) {
            var _this2 = this;
            switch (object.type) {
                case 'list':
                    if (object.code == '1') {
                        // _this2.append(result);
                        if (result.length) waitload = false;
                    } else {
                        if (result.result.songCount > 0) {
                            _this2.append(result, true);
                            if (currentplaylist) {
                                if (compareFirstArray(currentplaylist, musiclist)) { currentplaylist = musiclist; }
                            };
                            // console.log(currentplaylist)
                            if (result.result.songs.length) waitload = false;
                        }
                    }
                    break;
                case 'albums':

                    if (result.hasOwnProperty("hotAlbums")) {
                        _this2.append(result, true);
                        if (result.hotAlbums.length) waitload = false;
                    } else {
                        if (result.result.albumCount > 0) {
                            _this2.append(result, true);
                            if (result.result.albums.length) waitload = false;
                        }
                    }
                    break;
                case 'album':
                    _this2.append(result, true);
                    if (currentplaylist) {
                        if (compareFirstArray(currentplaylist, musiclist)) { currentplaylist = musiclist; }
                    };
                    // console.log(currentplaylist)
                    if (result.songs.length) waitload = false;
                    // console.log(result)
                    break;
                case 'playlist':
                    if (result.hasOwnProperty("playlists")) {
                        _this2.append(result, true);
                        if (result.playlists.length) waitload = false;
                    } else {
                        if (result.result.playlistCount > 0) {
                            _this2.append(result, true);
                            if (result.result.playlists.length) waitload = false;
                        }
                    }
                    break;
                case 'playlist_detail':
                    if (result.hasOwnProperty("songs")) {
                        _this2.append(result, true);
                        if (currentplaylist) {
                            if (compareFirstArray(currentplaylist, musiclist)) { currentplaylist = musiclist; }
                        };
                        // console.log(currentplaylist)
                        // console.log(result.songs.length)
                        if (result.songs.length) waitload = false;
                    } else if (result.hasOwnProperty("playlist")) {
                        if (result.playlist.tracks.length) waitload = false;
                    }
                    break;
                default:
                    if (result.result.songCount > 0) {
                        _this2.append(result, true);
                        if (result.result.songs.length) waitload = false;
                    }
            }
        }
        this.append = function (data, append) {
            var _this3 = this;
            var listdata;

            switch (object.type) {
                case 'list':
                    object.code == '1' ? listdata = data : (listdata = data.result ? data.result.songs : []);
                    // if (data.result.hasOwnProperty("songs")) {
                    //     listdata = data.result.songs;
                    // } else if (data.result.hasOwnProperty("albums")) {
                    //     listdata = data.result.albums;
                    // } else if (data.result.hasOwnProperty("playlists")) {
                    //     listdata = data.result.playlists;
                    // }
                    break;
                case 'albums':
                    // listdata = data.hotAlbums;
                    if (data.hasOwnProperty("hotAlbums")) {
                        listdata = data.hotAlbums;
                    } else {
                        listdata = data.result.albums;
                    }
                    // $(".open--play").hide();
                    break;
                case 'album':
                    listdata = data.songs;
                    break;
                case 'playlist':
                    if (data.hasOwnProperty("playlists")) {
                        listdata = data.playlists;
                    } else {
                        listdata = data.result.playlists;
                    }
                    break;
                case 'playlist_detail':
                    if (data.hasOwnProperty("songs")) {
                        listdata = data.songs;
                    } else if (data.hasOwnProperty("playlist")) {
                        listdata = data.playlist.tracks;
                    }
                    break;
                default:
                    listdata = data.result ? data.result.songs : [];
            }

            listdata.forEach(function (element, i) {
                if (object.type == 'list' || object.type == 'album' || object.type == 'playlist_detail') {
                    musiclist.push([element.name, element.id, element.fee, (object.code == '1' ? element.artists[0].name : element.ar[0].name), element.copyright])
                }

                var mytitle = element.name.replace('/', ' ');
                if (mytitle.indexOf(' ' != -1)) mytitle = mytitle.split(' ')[0]

                var card = Lampa.Template.get('card', {
                    title: element.name,
                    release_year: (object.type == 'list' || object.type == 'playlist_detail') ? (object.code == '1' ? element.artists[0].name + ' - ' + element.album.name : element.ar[0].name + ' - ' + element.al.name) : (object.type == 'album' ? object.albumname : '')
                });
                // card.addClass('card--category');
                card.addClass('card--collection');
                var img = card.find('.card__img')[0];
                img.onload = function () {
                    card.addClass('card--loaded');
                };
                img.onerror = function (e) {
                    img.src = './img/img_broken.svg';
                };

                switch (object.type) {
                    case 'list':
                        if (object.code == '1') {
                            card.find('.card__img').attr('src', element.album.picUrl + "?param=200y200g");
                        } else {
                            card.find('.card__img').attr('src', element.cover || element.img || element.pic || element.al.picUrl + "?param=200y200g" || element.blurPicUrl + "?param=200y200g");
                        }
                        break;
                    case 'albums':
                        card.find('.card__img').attr('src', element.picUrl + "?param=200y200g");
                        break;
                    case 'album':
                        card.find('.card__img').attr('src', element.al.picUrl + "?param=200y200g");
                        break;
                    case 'playlist':
                        card.find('.card__img').attr('src', element.coverImgUrl + "?param=200y200g");
                        break;
                    default:
                        card.find('.card__img').attr('src', element.cover || element.img || element.pic || element.al.picUrl + "?param=200y200g" || element.blurPicUrl + "?param=200y200g");
                }
                if (object.type == 'list' || object.type == 'playlist_detail' || object.type == 'album') {
                    if (element.fee !== 1 && element.copyright <= 1) {
                        card.find('.card__view').append('<div class="card__type"></div>');
                        card.find('.card__type').text('免费');
                    }
                }
                /*card.find('.card__view').append('<div class="card__quality"></div>');
                card.find('.card__quality').text(element.score);*/
                if (element.publishTime) {
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(new Date(element.publishTime).getFullYear());
                };

                card.on('hover:focus', function () {
                    last = card[0];
                    scroll.update(card, true);
                    info.find('.info__title').text(element.name);
                    // info.find('.info__title-original').text(element.al.name);
                    info.find('.info__rate span').text(element.rate);
                    info.find('.info__rate').toggleClass('hide', !(element.rate > 0));
                    // if (object.type == 'list') {
                    var maxrow = Math.ceil(items.length / 7) - 1;
                    if (object.type !== 'album') {
                        if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
                    }
                    // if (element.cover||element.img||element.al.picUrl) Lampa.Background.change(cardImgBackground(element.cover||element.img||element.al.picUrl));
                    // }
                    if (Lampa.Helper) Lampa.Helper.show('music_detail', '长按住 (ОК) 可进行更多操作', card);
                });
                if (object.type == 'list' || object.type == 'playlist_detail') {
                    card.on('hover:long', function () {
                        // console.log(element.al.name)
                        //contextmenu();
                        var archiveMenu = [];
                        archiveMenu.push({
                            title: '查看' + (object.code == '1' ? element.artists[0].name : element.ar[0].name) + '所有专辑',
                            url: 'http://music.163.com/api/artist/albums/' + (object.code == '1' ? element.artists[0].id : element.ar[0].id) + '?id=' + (object.code == '1' ? element.artists[0].id : element.ar[0].id),
                            id: (object.code == '1' ? element.artists[0].id : element.ar[0].id),
                            type: 'albums',
                            albumname: '',
                            connectype: 'native'
                        });
                        archiveMenu.push({
                            title: '查看所属专辑歌曲',
                            // https://ncm.icodeq.com
                            url: apiurl + '/album?id=' + (object.code == '1' ? element.album.id : element.al.id),
                            id: '',
                            type: 'album',
                            connectype: '',
                            albumname: (object.code == '1' ? element.album.name : element.al.name)
                        });
                        Lampa.Select.show({
                            title: '操作',
                            items: archiveMenu,
                            onSelect: function (sel) {
                                // var video = {
                                //     title: sel.title,
                                //     url: sel.url,
                                // }
                                // Lampa.Controller.toggle('content');
                                Lampa.Activity.push({
                                    url: sel.url,
                                    title: '音乐 - ' + sel.title,
                                    component: 'music',
                                    type: sel.type,
                                    albumname: sel.albumname,
                                    connectype: sel.connectype,
                                    page: 1
                                });
                            },
                            onBack: function () {
                                Lampa.Controller.toggle('content');
                            }
                        })
                    });
                }
                card.on('hover:enter', function (target, card_data) {
                    // var ids = element.url.match(/id=([^&]+)/)[1];
                    // console.log(items.indexOf(card))
                    switch (object.type) {
                        case 'albums':
                            Lampa.Activity.push({
                                // https://ncm.icodeq.com/
                                url: apiurl + '/album?id=' + element.id,
                                title: '音乐 - 查看所属专辑歌曲',
                                component: 'music',
                                type: 'album',
                                albumname: element.name,
                                page: 1
                            });
                            break;
                        case 'playlist':
                            Lampa.Activity.push({
                                // https://ncm.icodeq.com/
                                url: apiurl + '/playlist/track/all?id=' + element.id,
                                title: '音乐 - 歌单详情',
                                component: 'music',
                                type: 'playlist_detail',
                                albumname: element.name,
                                page: 1
                            });
                            break;
                        default:
                            // tv表示翻译，-1是要，1是不要
                            button.hide();
                            currentplaylist = null;
                            var lrcObj = {};
                            var player = window.radio_player2_;
                            network["native"]('https://music.163.com/api/song/lyric?id=' + + element.id + '&lv=1&kv=1&tv=-1', function (result) {
                                if (result.code == 200) {
                                    // console.log(result.lrc.lyric)
                                    if (result.lrc) {
                                        var lyrics = result.lrc.lyric.split("\n");
                                        for (var i = 0; i < lyrics.length; i++) {
                                            var lyric = decodeURIComponent(lyrics[i]);
                                            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                                            var timeRegExpArr = lyric.match(timeReg);
                                            if (!timeRegExpArr) continue;
                                            var clause = lyric.replace(timeReg, '');
                                            for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                                                var t = timeRegExpArr[k];
                                                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                                                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                                                var time = min * 60 + sec;
                                                lrcObj[time] = clause;
                                            }
                                        }
                                    }
                                    // console.log(lrcObj)
                                }
                            }, false, false, {
                                dataType: 'json'
                            });

                            if (element.fee !== 1 && element.copyright <= 1) {
                                // network.silent('https://ncm.icodeq.com/song/url?id=' + element.id, function (result) {
                                //     //console.log(result.data[0].url)
                                //     // var video = {
                                //     //     title: element.title,
                                //     //     url: result.data[0].url,
                                //     //     // plugin: plugin.component,
                                //     //     tv: false
                                //     // };
                                //     // var playlist = [];
                                //     // data.forEach(function (elem) {
                                //     //     playlist.push({
                                //     //         title: elem.title,
                                //     //         url: elem.url,
                                //     //         // plugin: plugin.component,
                                //     //         tv: false
                                //     //     });
                                //     // });
                                //     // // Lampa.Keypad.listener.destroy()
                                //     // // Lampa.Keypad.listener.follow('keydown', keydown);
                                //     // Lampa.Player.play(video);
                                //     // Lampa.Player.playlist(video);
                                //     var data = {
                                //         url: result.data[0].url,
                                //         title: element.name,
                                //         playall: false
                                //     }
                                //     player.play(data);
                                //     card.find('.card__view').append('<div class="card__quality"></div>');
                                //     card.find('.card__quality').text('听');
                                // }, false, false, {
                                //     dataType: 'json'
                                // });
                                var data = {
                                    url: 'https://music.163.com/song/media/outer/url?id=' + element.id,
                                    title: element.name,
                                    playall: false,
                                    lrc: lrcObj,
                                    list: null
                                }
                                player.play(data);
                                card.find('.card__view').append('<div class="card__quality"></div>');
                                card.find('.card__quality').text('听');

                            } else {
                                Lampa.Modal.open({
                                    title: '',
                                    html: Lampa.Template.get('modal_loading'),
                                    size: 'small',
                                    align: 'center',
                                    mask: true,
                                    onBack: function onBack() {
                                        Lampa.Modal.close();
                                        Lampa.Api.clear();
                                        Lampa.Controller.toggle('content');
                                    }
                                });
                                //https://diii.tk/
                                network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&name=' + encodeURIComponent((object.code == '1' ? element.artists[0].name : element.ar[0].name) + ' ' + element.name.replace('(Live)', '')), function (result) {
                                    if (result.code === 0) {
                                        var queryData = result.data.filter(function (fp) {
                                            // console.log(fp.name ,(object.code == '1' ? element.artists[0].name: element.ar[0].name))
                                            return (fp.name.replace('G.E.M. 邓紫棋', 'G.E.M.邓紫棋') === (object.code == '1' ? element.artists[0].name : element.ar[0].name) || fp.name.indexOf((object.code == '1' ? element.artists[0].name : element.ar[0].name)) !== -1) && fp.songname === element.name.replace('(Live)', '')
                                        })
                                        // console.log(queryData)
                                        if (queryData.length > 0) {
                                            network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&mid=' + queryData[0].mid, function (result) {
                                                // if (result.msg == '成功') {
                                                var data = {
                                                    url: result.data.src,
                                                    title: element.name,
                                                    playall: false,
                                                    lrc: lrcObj,
                                                    list: null
                                                }
                                                player.play(data);
                                                card.find('.card__view').append('<div class="card__quality"></div>');
                                                card.find('.card__quality').text('听');
                                                Lampa.Modal.close();
                                                Lampa.Controller.toggle('content');
                                            }, false, false, {
                                                dataType: 'json'
                                            });
                                        } else {
                                            network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&mid=' + result.data[0].mid, function (result) {
                                                // if (result.msg == '成功') {
                                                var data = {
                                                    url: result.data.src,
                                                    title: element.name,
                                                    playall: false,
                                                    lrc: lrcObj,
                                                    list: null
                                                }
                                                player.play(data);
                                                card.find('.card__view').append('<div class="card__quality"></div>');
                                                card.find('.card__quality').text('听');
                                                Lampa.Modal.close();
                                                Lampa.Controller.toggle('content');
                                            }, false, false, {
                                                dataType: 'json'
                                            });
                                            Lampa.Modal.close();
                                            Lampa.Controller.toggle('content');
                                            // Lampa.Noty.show('找不到相关歌曲音频文件。');
                                        }
                                    } else {
                                        Lampa.Noty.show('找不到相关歌曲音频文件。');
                                        Lampa.Modal.close();
                                        Lampa.Controller.toggle('content');
                                    }
                                }, false, false, {
                                    dataType: 'json'
                                });

                                // network["native"]('https://www.fangpi.net/s/'+ encodeURIComponent((object.code == '1' ? element.artists[0].name: element.ar[0].name) + ' ' + element.name), function (str) {
                                //     var musc_list = [];
                                //     str = str.replace(/\n/g, '');

                                //     $('a.text-primary', str).each(function (i, html) {
                                //         musc_list.push('https://www.fangpi.net' +  $(html).attr('href'));
                                //     });
                                //     // console.log(musc_list)

                                //     if (musc_list.length > 0) {
                                //         network["native"](musc_list[1], function (str) {
                                //             var urlPattern = /['|"](https?:\/\/[^'"]+\.(?:mp3|m3u8)[^'"]*)['|"]/;
                                //             var match = str.match(urlPattern);

                                //             if (match) {
                                //                 var urlvideo = match[1];
                                //                 var data = {
                                //                     url: urlvideo,
                                //                     title: element.name,
                                //                     playall: false
                                //                 }
                                //                 player.play(data);
                                //                 card.find('.card__view').append('<div class="card__quality"></div>');
                                //                 card.find('.card__quality').text('听');
                                //             } else {
                                //                 Lampa.Noty.show('找不到相关歌曲音频文件。');
                                //             }
                                //             Lampa.Modal.close();
                                //             Lampa.Controller.toggle('content');
                                //         }, function (a, c) {
                                //             Lampa.Noty.show(network.errorDecode(a, c));
                                //         }, false, {
                                //             dataType: 'text',
                                //             headers: {
                                //                 'Referer': 'https://www.fangpi.net/'
                                //             }
                                //         });
                                //     } else {
                                //         Lampa.Modal.close();
                                //         Lampa.Controller.toggle('content');
                                //         Lampa.Noty.show('找不到相关歌曲音频文件。');
                                //     }

                                // }, function (a, c) {
                                //     Lampa.Noty.show(network.errorDecode(a, c));
                                // }, false, {
                                //     dataType: 'text',
                                //     headers: {
                                //         'Referer': 'https://www.fangpi.net/'
                                //     }
                                // });
                            }
                    }
                });
                body.append(card);
                if (append) Lampa.Controller.collectionAppend(card);
                items.push(card);
            });
            // console.log(musiclist)
        };

        this.build = function (data) {

            var _this2 = this;
            // Lampa.Template.add('_style', '<style>.freetv_n.category-full{padding-bottom:10em}</style>');
            // $('body').append(Lampa.Template.get('_style', {}, true));
            //info = Lampa.Template.get('info');style="height:5em"
            // <div class="info__lyric" style="position: fixed; left: 50%; bottom: 30px; transform: translateX(-50%); width: 800px; height: 80px; background-color: rgba(0, 0, 0, 0.8); color: rgb(243, 217, 0); text-align: center; border-radius: 1em; display: flex; justify-content: center; align-items: center; z-index: 9999; font-size: 3em; font-size: 1.8em; line-height: 1.3; white-space: nowrap; overflow: hidden;"></div>
            Lampa.Template.add('button_category', "<style>.freetv_n.category-full{padding-bottom:8em} @media screen and (max-width: 2560px) {.freetv_n .card--collection {width: 16.6%!important;}}@media screen and (max-width: 800px) {.freetv_n .card--collection {width: 24.6%!important;}}@media screen and (max-width: 500px) {.freetv_n .card--collection {width: 33.3%!important;}}</style><div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>分类</span>\n    </div>  <div class=\"full-start__button selector open--play\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 0.72 0.72\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M.556.27.266.104a.103.103 0 0 0-.154.09v.334A.103.103 0 0 0 .215.63.103.103 0 0 0 .266.616L.556.45a.103.103 0 0 0 0-.178Zm-.03.126-.29.169a.043.043 0 0 1-.043 0A.043.043 0 0 1 .172.528V.193A.043.043 0 0 1 .193.156.045.045 0 0 1 .215.15a.046.046 0 0 1 .021.006l.29.167a.043.043 0 0 1 0 .074Z\" fill=\"currentColor\"></path></svg>   <span>播放全部</span>\n    </div>            <div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div></div>");
            Lampa.Template.add('info_web', '<div class="info layer--width"><div class="info__rate"><span></span></div><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
            var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.open--find').on('hover:enter hover:click', function () {
                // Lampa.Keypad.listener.follow('keydown', function (event) {
                //     var code = event.code;
                //     if (((code === 39 || code === 5) && $('.simple-keyboard').length && !$('.modal__content').length && ($(".simple-keyboard-input").val() !==""))) {
                //         $(".simple-keyboard-input").blur();

                //         // sources = null;
                //         // playlistData = null;

                //     } 
                //     // else if ((code === 37 || code === 4) && $('.simple-keyboard').length) {
                //     //     // $(".simple-keyboard-input").focus();
                //     // }
                // });
                // Lampa.Helper.show('keyboard_search', '输入关键字后，按右方向键选择搜索类型。');
                var searchcat = [{
                    title: '单曲/歌手',
                    value: 1
                }, {
                    title: '专辑',
                    value: 10
                }, {
                    title: '歌单',
                    value: 1000
                },];
                // Lampa.Select.show({
                //     title: '选择搜索类型',
                //     items: searchcat,
                //     onSelect: function onSelect(a) {
                //         var currentVal = $(".simple-keyboard-input").val();
                //         if (currentVal === "") {
                //             Lampa.Noty.show('请先输入搜索关键词。')
                //             // $(".simple-keyboard-input").focus();
                //         } else {
                //             var newVal;
                //             if (currentVal.indexOf('||||') !== -1) {
                //                 newVal = removeAfterDelimiter(currentVal, "||||") + "||||" + a.value;
                //             } else {
                //                 newVal = currentVal + "||||" + a.value;
                //             }
                //             // var newVal = currentVal + "||||"+ a.value;
                //             $(".simple-keyboard-input").val(newVal);
                //             // $(".simple-keyboard-input").focus();
                //         }
                //         $(".simple-keyboard-input").focus();
                //     },
                //     onBack: function onBack() {
                //         $(".simple-keyboard-input").focus();
                //         // Lampa.Controller.toggle('content');
                //     }
                // });

                var num = 3;

                var html_ = $('<div></div>');
                var navigation = $('<div class="navigation-tabs"></div>');

                searchcat.forEach(function (tab, i) {
                    var button = $('<div class="navigation-tabs__button selector">' + tab.title + '</div>');
                    button.on('hover:enter', function () {
                        var listype, titlename;
                        if (tab.value === 1) {
                            // codetype = '';
                            titlename = '单曲';
                            listype = 'list';
                        } else if (tab.value === 10) {
                            // codetype = '2';
                            titlename = '专辑';
                            listype = 'albums';
                        } else if (tab.value === 1000) {
                            // codetype = '2';
                            titlename = '歌单';
                            listype = 'playlist';
                        }

                        Lampa.Input.edit({
                            title: '音乐 - 搜索' + titlename,
                            value: '',
                            free: true,
                            nosave: true
                        }, function (new_value) {
                            if (new_value) {
                                // console.log(new_value)
                                var search_tempalte = 'https://music.163.com/api/cloudsearch/pc?s=#msearchword&type=#searchtype';
                                var searchurl = search_tempalte.replace('#msearchword', encodeURIComponent(new_value)).replace('#searchtype', encodeURIComponent(tab.value));
                                Lampa.Activity.push({
                                    url: searchurl,
                                    title: '音乐 - 搜索' + titlename + '"' + new_value + '"',
                                    waitload: false,
                                    component: 'music',
                                    type: listype,
                                    connectype: 'native',
                                    code: '',
                                    page: 1
                                });
                            }
                            else Lampa.Controller.toggle('content');
                        });

                        Lampa.Modal.close();
                    });

                    if (i > 0 && i % num != 0) navigation.append('<div class="navigation-tabs__split">|</div>');
                    if (i % num == 0) { // 当 i 是 num 的倍数时，将当前行容器加入到总容器，并新建一个行容器
                        if (i > 0) html_.append(navigation);
                        navigation = $('<div class="navigation-tabs"></div>');
                    }
                    navigation.append(button);
                });

                html_.append(navigation);
                // console.log(navigation)

                Lampa.Modal.open({
                    title: '搜索',
                    html: html_,
                    size: 'small',
                    // align: 'center',
                    // select: html.find('.navigation-tabs .active')[0],
                    mask: true,
                    onBack: function onBack() {
                        Lampa.Modal.close();
                        Lampa.Api.clear();
                        Lampa.Controller.toggle('content')
                    }
                });
                searchcat = null;
            });
            info.find('.open--play').on('hover:enter hover:click', function () {
                playAll();
            });
            this.selectGroup = function () {
                Lampa.Select.show({
                    title: '分类',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        if (a.title == '歌单') {
                            var playlistname = '华语,粤语,欧美,日语,韩语,流行,摇滚,民谣,电子,舞曲,说唱,轻音乐,爵士,乡村,R&B/Soul,古典,民族,英伦,金属,朋克,蓝调,雷鬼,世界音乐,拉丁,New Age,古风,后摇,Bossa Nova,清晨,夜晚,学习,工作,午休,下午茶,地铁,驾车,运动,旅行,散步,酒吧,怀旧,清新,浪漫,伤感,治愈,放松,孤独,感动,兴奋,快乐,安静,思念,综艺,影视原声,ACG,儿童,校园,游戏,70后,80后,90后,网络歌曲,KTV,经典,翻唱,吉他,钢琴,器乐,榜单,00后';
                            popupWindows(playlistname, "https://music.163.com/api/playlist/list/?cat=", 5, "playlist", "歌单")
                        } else {
                            Lampa.Activity.push({
                                url: a.url,
                                title: '音乐 - ' + a.title,
                                code: a.code,
                                component: 'music',
                                type: a.type,
                                connectype: a.connectype,
                                page: 1
                            });
                        }
                    },
                    onBack: function onBack() {
                        Lampa.Controller.toggle('content');
                    }
                });
            };
            //info.find('.info__rate,.info__right').remove();
            scroll.render().addClass('layer--wheight').data('mheight', info);

            // object.type == 'list' ? datatye = data.subjects : datatye = data ;
            var havedata, listdata;

            switch (object.type) {
                case 'list':
                    if (object.code == '1') {
                        listdata = data;
                        havedata = data;
                    } else {
                        listdata = data.result ? data.result.songs : [];
                        // if (data.result.hasOwnProperty("songs")) {
                        //     listdata = data.result.songs;
                        //     havedata = data.result.songs;
                        // } else if (data.result.hasOwnProperty("albums")) {
                        //     listdata = data.result.albums;
                        //     havedata = data.result.albums
                        // } else if (data.result.hasOwnProperty("playlists")) {
                        //     listdata = data.result.playlists;
                        //     havedata = data.result.playlists
                        // }
                        havedata = data.result;
                    }
                    break;
                case 'albums':
                    // listdata = data.hotAlbums;
                    // havedata = data.hotAlbums;
                    if (data.hasOwnProperty("hotAlbums")) {
                        listdata = data.hotAlbums;
                        havedata = data.hotAlbums;
                    } else {
                        listdata = data.result.albums;
                        havedata = data.result.albums;
                    }
                    break;
                case 'album':
                    listdata = data.songs;
                    havedata = data.songs;
                    break;
                case 'playlist':
                    if (data.hasOwnProperty("playlists")) {
                        listdata = data.playlists;
                        havedata = data.playlists;
                    } else {
                        listdata = data.result.playlists;
                        havedata = data.result.playlists;
                    }
                    break;
                case 'playlist_detail':
                    if (data.hasOwnProperty("songs")) {
                        listdata = data.songs;
                        havedata = data.songs;
                    } else if (data.hasOwnProperty("playlist")) {
                        listdata = data.playlist.tracks;
                        havedata = data.playlist.tracks
                    }

                    break;
                default:
                    listdata = data.result ? data.result.songs : [];
                    havedata = data.result;
            }

            if (havedata) {
                if (listdata.length) {
                    html.append(info);
                    html.append(scroll.render());
                    scroll.onEnd = function () {
                        _this2.next();
                    };
                    this.append(data);
                    scroll.append(body);
                    this.activity.loader(false);
                    this.activity.toggle();
                }
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

        function cardImgBackground(card_data) {
            if (Lampa.Storage.field('background')) {
                return Lampa.Storage.get('background_type', 'complex') == 'poster' && card_data ? card_data : card_data;
            }
            return '';
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
                    } else if (info.find('.open--play').hasClass('focus')) {
                        Lampa.Controller.toggle('content');
                    } else if (info.find('.open--find').hasClass('focus')) {
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
    // 歌单接口 https://api.xtaoa.com/doc/wyygd.php
    // https://music.163.com/api/playlist/list
    var catalogs = [{
        title: '推荐',
        url: 'https://music.163.com/api/playlist/list',
        code: '',
        type: 'playlist',
        connectype: ''
    }, {
        title: '歌单',
        url: 'https://music.163.com/api/playlist/list',
        code: '',
        type: 'playlist',
        connectype: ''
    }, {
        title: '飙升榜',
        url: 'https://ncm.icodeq.com/playlist/detail?id=19723756',
        code: '',
        type: 'playlist_detail',
        connectype: 'native'
    }, {
        title: '新歌榜',
        url: 'https://ncm.icodeq.com/playlist/detail?id=3779629',
        code: '',
        type: 'playlist_detail',
        connectype: 'native'
    }, {
        title: '热歌榜',
        url: 'https://ncm.icodeq.com/playlist/detail?id=3778678',
        code: '',
        type: 'playlist_detail',
        connectype: 'native'
    }, {
        title: '原创榜',
        url: 'https://ncm.icodeq.com/playlist/detail?id=2884035',
        code: '',
        type: 'playlist_detail',
        connectype: 'native'
    }, {
        title: '伊能静',
        url: 'https://music.163.com/api/cloudsearch/pc?s=伊能静',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '王力宏',
        url: 'https://music.163.com/api/cloudsearch/pc?s=王力宏',
        code: '',
        type: 'list',
        connectype: 'native'
    },
    {
        title: '陈奕迅',
        url: 'https://music.163.com/api/cloudsearch/pc?s=陈奕迅',
        code: '',
        type: 'list',
        connectype: 'native'
    },
    {
        title: '林俊杰',
        url: 'https://music.163.com/api/cloudsearch/pc?s=林俊杰',
        code: '',
        type: 'list',
        connectype: 'native'
    },
    {
        title: '任贤齐',
        url: 'https://music.163.com/api/cloudsearch/pc?s=任贤齐',
        code: '',
        type: 'list',
        connectype: 'native'
    },
    {
        title: '王菲',
        url: 'https://music.163.com/api/cloudsearch/pc?s=王菲',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '孙燕姿',
        url: 'https://music.163.com/api/cloudsearch/pc?s=孙燕姿',
        code: '',
        type: 'list',
        connectype: 'native'
    }, , {
        title: '抖音',
        url: 'https://music.163.com/api/cloudsearch/pc?s=抖音',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '爵士',
        url: 'https://music.163.com/api/cloudsearch/pc?s=爵士',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '轻音乐',
        url: 'https://music.163.com/api/cloudsearch/pc?s=轻音乐',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '乡村',
        url: 'https://music.163.com/api/cloudsearch/pc?s=乡村',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '民谣',
        url: 'https://music.163.com/api/cloudsearch/pc?s=民谣',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '电子',
        url: 'https://music.163.com/api/cloudsearch/pc?s=电子',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '舞曲',
        url: 'https://music.163.com/api/cloudsearch/pc?s=舞曲',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '说唱',
        url: 'https://music.163.com/api/cloudsearch/pc?s=说唱',
        code: '',
        type: 'list',
        connectype: 'native'
    }, {
        title: '流行',
        url: 'https://music.163.com/api/cloudsearch/pc?s=流行',
        code: '',
        type: 'list',
        connectype: 'native'
    }];

    function player() {
        var html = Lampa.Template.get('radio_player', {});
        var audio = new Audio();
        var url = '';
        var played = false;
        var hls;
        var playall = false;
        var lrc = {};
        var currentplaylist = [];
        audio.addEventListener("canplay", function (event) {
            played = true;
            html.toggleClass('loading', false);
        });

        function prepare() {
            if (audio.canPlayType('audio/mpeg;') || audio.canPlayType('application/vnd.apple.mpegurl') || url.indexOf('.mp3') > 0) load(); else if (Hls.isSupported()) {
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

                if ((Object.keys(lrc).length) == 0) {
                    $(".info__title-original").text('');
                };

                audio.addEventListener("timeupdate", function () {

                    var currentTime = audio.currentTime;

                    let obj = lrc[Math.floor(currentTime)];
                    if (obj != undefined) {
                        $('.info__title-original').css('color', 'f3d900');
                        $(".info__title-original").text(obj ? obj : '♪...');
                        // $(".info__lyric").text(obj ? obj : '♪...');
                    }
                    var duration = audio.duration;

                    var minutes = Math.floor(currentTime / 60);
                    var seconds = Math.floor(currentTime % 60);

                    var durationMinutes = Math.floor(duration / 60);
                    var durationSeconds = Math.floor(duration % 60);

                    //   var progress = (audio.currentTime / audio.duration) * 100;
                    //   console.log(progress)
                    //   progressBar.css("width", progress + "%");

                    // 更新进度条文本
                    $(".info__create").text(
                        ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + " / " + ("0" + durationMinutes).slice(-2) + ":" + ("0" + durationSeconds).slice(-2)
                    );
                });
                if (playall) { 
                    audio.addEventListener("ended", playEndedHandler, false); 
                    // audio.addEventListener("ended", function () {
                    //     playEndedHandler(currentplaylist);
                    // }, false);
                }



            } catch (e) { }

            if (playPromise !== undefined) {
                playPromise.then(function () {

                    console.log('Music', 'start plaining');

                })["catch"](function (e) {
                    console.log('Music', 'play promise error:', e.message);
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
        
        // html.on('hover:long', function () {
        //     var balanser_ = Lampa.Storage.get('online_music_balanser');
        //     // console.log(balanser_,currentplaylist)
        //     //  && balanser_ === 'neteasemusic'
        //     if (currentplaylist) {
        //         var sources = [];
        //         var num = 3;
        //         var playlistData = currentplaylist;
        //         // console.log(playlistData)

        //         playlistData.forEach(function (html, i) {
        //             sources.push({
        //                 title: currentplaylist[i][3] + '-' + currentplaylist[i][0],
        //                 url: currentplaylist[i][0]
        //             });

        //         });
        //         // console.log(sources)
        //         var html_ = $('<div></div>');
        //         var navigation = $('<div class="navigation-tabs"></div>');

        //         sources.forEach(function (tab, i) {
        //             // console.log(html.find('.radio-player__name').text(),tab.url,(html.find('.radio-player__name').text() === tab.url))
        //             // var ifplaynow = (html.find('.radio-player__name').text() === tab.url) ? "selector active" : "selector";
        //             var button = $('<div class="navigation-tabs__button selector>' + tab.title + '</div>');
        //             button.on('hover:enter', function () {
        //                 playEndedHandler_(i - 1);
        //                 Lampa.Modal.close();
        //                 Lampa.Controller.toggle('content');
        //             });
        //             if (html_.find('.radio-player__name').text() === tab.url) button.addClass('active');
        //             if (i > 0 && i % num != 0) navigation.append('<div class="navigation-tabs__split">|</div>');
        //             if (i % num == 0) { // 当 i 是 num 的倍数时，将当前行容器加入到总容器，并新建一个行容器
        //                 if (i > 0) html_.append(navigation);
        //                 navigation = $('<div class="navigation-tabs"></div>');
        //             }
        //             navigation.append(button);
        //         });

        //         html_.append(navigation);
        //         // console.log(navigation)

        //         Lampa.Modal.open({
        //             title: '当前播放列表',
        //             html: html_,
        //             size: 'medium',
        //             // align: 'center',
        //             select: html_.find('.navigation-tabs .active')[0],
        //             mask: true,
        //             onBack: function onBack() {
        //                 Lampa.Modal.close();
        //                 Lampa.Api.clear();
        //                 Lampa.Controller.toggle('content');
        //             }
        //         });
        //         sources = null;
        //         playlistData = null;
        //     }
        // });

        // html.onMenu = function (target, data) {
        //     console.log('ddd')
        //     var items = [];
        //     items.push({
        //         title: '关闭',
        //         subtitle: '退出该播放',
        //         a: 'exit'
        //     });
        //     Lampa.Select.show({
        //         title: Lampa.Lang.translate('title_action'),
        //         items: items,
        //         onBack: function onBack() {
        //             Lampa.Controller.toggle(enabled);
        //         },
        //         onSelect: function onSelect(a) {
        //             if (a.where == 'exit') {  
        //                 html.hide();
        //                 played = false;

        //                 if (hls) {
        //                     hls.destroy();
        //                     hls = false;
        //                 }

        //                 audio.src = '';
        //             }
        //             Lampa.Controller.toggle(enabled);
        //         }
        //     });
        // }

        this.create = function () {
            $('.head__actions .open--search').before(html);
        };

        this.play = function (data) {
            stop();
            url = data.url;
            playall = data.playall;
            lrc = data.lrc;
            currentplaylist = data.list;
            html.find('.radio-player__name').text(data.title);
            html.toggleClass('hide', false);
            play();
        };
    }

    function playEndedHandler() {
        if (currentplaylist != null) {
            if (currentplaylist.length > 0) {
                var lrcObj = {};
                var network = new Lampa.Reguest();
                var player = window.radio_player2_;
                // var src = currentplaylist.pop();
                // var src = currentplaylist.shift();
                currentIndex = (currentIndex + 1) % currentplaylist.length;
                // console.log(currentIndex)
                // myAudio.src = src;
                // currentplaylist.unshift(src);
                // myAudio.play();
                // console.log('播放完毕，准备下一首歌。')
                // https://music.163.com/api/song/media?id=2046829307
                network["native"]('https://music.163.com/api/song/lyric?id=' + + currentplaylist[currentIndex][1] + '&lv=1&kv=1&tv=-1', function (result) {
                    if (result.code == 200) {
                        // console.log(result.lrc.lyric)
                        if (result.lrc && result.lrc.lyric) {
                            var lyrics = result.lrc.lyric.split("\n");
                            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                            for (var i = 0; i < lyrics.length; i++) {
                                var lyric = decodeURIComponent(lyrics[i]);
                                var timeRegExpArr = lyric.match(timeReg);
                                if (!timeRegExpArr) continue;
                                var clause = lyric.replace(timeReg, '');
                                var min, sec, time;
                                for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                                    var t = timeRegExpArr[k];
                                    min = Number(String(t.match(/\[\d*/i)).slice(1));
                                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                                    time = min * 60 + sec;
                                    lrcObj[time] = clause;
                                }
                            }
                        }
                        // console.log(lrcObj)
                    }
                }, false, false, {
                    dataType: 'json'
                });
                if (currentplaylist[currentIndex][2] !== 1 && currentplaylist[currentIndex][4] <= 1) {
                    // network.silent('https://ncm.icodeq.com/song/url?id=' + currentplaylist[currentIndex][1], function (result) {
                    //     var data = {
                    //         url: result.data[0].url,
                    //         title: currentplaylist[currentIndex][0],
                    //         playall: true
                    //     }
                    //     player.play(data);
                    // }, false, false, {
                    //     dataType: 'json'
                    // });
                    var data = {
                        url: 'https://music.163.com/song/media/outer/url?id=' + currentplaylist[currentIndex][1],
                        title: currentplaylist[currentIndex][0],
                        playall: true,
                        lrc: lrcObj,
                        list: currentplaylist
                    }
                    player.play(data);
                } else {
                    // Lampa.Modal.open({
                    //     title: '',
                    //     html: Lampa.Template.get('modal_loading'),
                    //     size: 'small',
                    //     align: 'center',
                    //     mask: true,
                    //     onBack: function onBack() {
                    //         Lampa.Modal.close();
                    //         Lampa.Api.clear();
                    //         Lampa.Controller.toggle('content');
                    //     }
                    // });
                    //https://diii.tk/
                    network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&name=' + encodeURIComponent(currentplaylist[currentIndex][3] + ' ' + currentplaylist[currentIndex][0].replace('(Live)', '')), function (result) {
                        if (result.code === 0) {
                            var queryData = result.data.filter(function (fp) {
                                // console.log(fp.name ,(object.code == '1' ? element.artists[0].name: element.ar[0].name))
                                return (fp.name.replace('G.E.M. 邓紫棋', 'G.E.M.邓紫棋') === currentplaylist[currentIndex][3] || fp.name.indexOf(currentplaylist[currentIndex][3]) !== -1) && fp.songname === currentplaylist[currentIndex][0].replace('(Live)', '')
                            })

                            if (queryData.length > 0) {
                                // console.log(queryData,queryData[0].mid)
                                network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&mid=' + queryData[0].mid, function (result) {
                                    // if (result.msg == '成功') {
                                    var data = {
                                        url: result.data.src,
                                        title: currentplaylist[currentIndex][0],
                                        playall: true,
                                        lrc: lrcObj,
                                        list: currentplaylist
                                    }
                                    player.play(data);
                                    // Lampa.Modal.close();
                                    // Lampa.Controller.toggle('content');
                                }, false, false, {
                                    dataType: 'json'
                                });
                            } else {
                                // Lampa.Modal.close();
                                // Lampa.Controller.toggle('content');
                                network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&mid=' + result.data[0].mid, function (result) {
                                    // if (result.msg == '成功') {
                                    var data = {
                                        url: result.data.src,
                                        title: currentplaylist[currentIndex][0],
                                        playall: true,
                                        lrc: lrcObj,
                                        list: currentplaylist
                                    }
                                    player.play(data);
                                    // Lampa.Modal.close();
                                    // Lampa.Controller.toggle('content');
                                }, false, false, {
                                    dataType: 'json'
                                });
                                // Lampa.Noty.show('找不到相关歌曲音频文件。');
                            }
                        }
                    }, false, false, {
                        dataType: 'json'
                    });
                    // network["native"]('https://www.fangpi.net/s/' + encodeURIComponent(currentplaylist[currentIndex][3] + ' ' + currentplaylist[currentIndex][0]), function (str) {
                    //     var musc_list = [];
                    //     str = str.replace(/\n/g, '');

                    //     $('a.text-primary', str).each(function (i, html) {
                    //         musc_list.push('https://www.fangpi.net' + $(html).attr('href'));
                    //     });
                    //     // console.log(musc_list)

                    //     if (musc_list.length > 0) {
                    //         network["native"](musc_list[1], function (str) {
                    //             var urlPattern = /['|"](https?:\/\/[^'"]+\.(?:mp3|m3u8)[^'"]*)['|"]/;
                    //             var match = str.match(urlPattern);

                    //             if (match) {
                    //                 var urlvideo = match[1];
                    //                 var data = {
                    //                     url: urlvideo,
                    //                     title: currentplaylist[currentIndex][0],
                    //                     playall: false
                    //                 }
                    //                 player.play(data);
                    //             } else {
                    //                 Lampa.Noty.show('找不到相关歌曲音频文件。');
                    //             }
                    //             // Lampa.Modal.close();
                    //             // Lampa.Controller.toggle('content');
                    //         }, function (a, c) {
                    //             Lampa.Noty.show(network.errorDecode(a, c));
                    //         }, false, {
                    //             dataType: 'text',
                    //             headers: {
                    //                 'Referer': 'https://www.fangpi.net/'
                    //             }
                    //         });
                    //     } else {
                    //         // Lampa.Modal.close();
                    //         // Lampa.Controller.toggle('content');
                    //         Lampa.Noty.show('找不到相关歌曲音频文件。');
                    //     }

                    // }, function (a, c) {
                    //     Lampa.Noty.show(network.errorDecode(a, c));
                    // }, false, {
                    //     dataType: 'text',
                    //     headers: {
                    //         'Referer': 'https://www.fangpi.net/'
                    //     }
                    // });
                }
            }
        }
    }

    function playEndedHandler_(pos) {
        if (currentplaylist != null) {
            if (currentplaylist.length > 0) {
                var lrcObj = {};
                var network = new Lampa.Reguest();
                var player = window.radio_player2_;
                // var src = currentplaylist.pop();
                // var src = currentplaylist.shift();
                currentIndex = pos;
                currentIndex = (currentIndex + 1) % currentplaylist.length;
                // console.log(currentIndex)
                // myAudio.src = src;
                // currentplaylist.unshift(src);
                // myAudio.play();
                // console.log('播放完毕，准备下一首歌。')
                // https://music.163.com/api/song/media?id=2046829307
                network["native"]('https://music.163.com/api/song/lyric?id=' + + currentplaylist[currentIndex][1] + '&lv=1&kv=1&tv=-1', function (result) {
                    if (result.code == 200) {
                        // console.log(result.lrc.lyric)
                        if (result.lrc && result.lrc.lyric) {
                            var lyrics = result.lrc.lyric.split("\n");
                            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                            for (var i = 0; i < lyrics.length; i++) {
                                var lyric = decodeURIComponent(lyrics[i]);
                                var timeRegExpArr = lyric.match(timeReg);
                                if (!timeRegExpArr) continue;
                                var clause = lyric.replace(timeReg, '');
                                var min, sec, time;
                                for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                                    var t = timeRegExpArr[k];
                                    min = Number(String(t.match(/\[\d*/i)).slice(1));
                                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                                    time = min * 60 + sec;
                                    lrcObj[time] = clause;
                                }
                            }
                        }
                        // console.log(lrcObj)
                    }
                }, false, false, {
                    dataType: 'json'
                });
                if (currentplaylist[currentIndex][2] !== 1 && currentplaylist[currentIndex][4] <= 1) {
                    // network.silent('https://ncm.icodeq.com/song/url?id=' + currentplaylist[currentIndex][1], function (result) {
                    //     var data = {
                    //         url: result.data[0].url,
                    //         title: currentplaylist[currentIndex][0],
                    //         playall: true
                    //     }
                    //     player.play(data);
                    // }, false, false, {
                    //     dataType: 'json'
                    // });
                    var data = {
                        url: 'https://music.163.com/song/media/outer/url?id=' + currentplaylist[currentIndex][1],
                        title: currentplaylist[currentIndex][0],
                        playall: true,
                        lrc: lrcObj,
                        list: currentplaylist
                    }
                    player.play(data);
                } else {
                    // Lampa.Modal.open({
                    //     title: '',
                    //     html: Lampa.Template.get('modal_loading'),
                    //     size: 'small',
                    //     align: 'center',
                    //     mask: true,
                    //     onBack: function onBack() {
                    //         Lampa.Modal.close();
                    //         Lampa.Api.clear();
                    //         Lampa.Controller.toggle('content');
                    //     }
                    // });
                    //https://diii.tk/
                    network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&name=' + encodeURIComponent(currentplaylist[currentIndex][3] + ' ' + currentplaylist[currentIndex][0].replace('(Live)', '')), function (result) {
                        if (result.code === 0) {
                            var queryData = result.data.filter(function (fp) {
                                // console.log(fp.name ,(object.code == '1' ? element.artists[0].name: element.ar[0].name))
                                return (fp.name.replace('G.E.M. 邓紫棋', 'G.E.M.邓紫棋') === currentplaylist[currentIndex][3] || fp.name.indexOf(currentplaylist[currentIndex][3]) !== -1) && fp.songname === currentplaylist[currentIndex][0].replace('(Live)', '')
                            })

                            if (queryData.length > 0) {
                                // console.log(queryData,queryData[0].mid)
                                network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&mid=' + queryData[0].mid, function (result) {
                                    // if (result.msg == '成功') {
                                    var data = {
                                        url: result.data.src,
                                        title: currentplaylist[currentIndex][0],
                                        playall: true,
                                        lrc: lrcObj,
                                        list: currentplaylist
                                    }
                                    player.play(data);
                                    // Lampa.Modal.close();
                                    // Lampa.Controller.toggle('content');
                                }, false, false, {
                                    dataType: 'json'
                                });
                            } else {
                                // Lampa.Modal.close();
                                // Lampa.Controller.toggle('content');
                                network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&mid=' + result.data[0].mid, function (result) {
                                    // if (result.msg == '成功') {
                                    var data = {
                                        url: result.data.src,
                                        title: currentplaylist[currentIndex][0],
                                        playall: true,
                                        lrc: lrcObj,
                                        list: currentplaylist
                                    }
                                    player.play(data);
                                    // Lampa.Modal.close();
                                    // Lampa.Controller.toggle('content');
                                }, false, false, {
                                    dataType: 'json'
                                });
                                // Lampa.Noty.show('找不到相关歌曲音频文件。');
                            }
                        }
                    }, false, false, {
                        dataType: 'json'
                    });
                    // network["native"]('https://www.fangpi.net/s/' + encodeURIComponent(currentplaylist[currentIndex][3] + ' ' + currentplaylist[currentIndex][0]), function (str) {
                    //     var musc_list = [];
                    //     str = str.replace(/\n/g, '');

                    //     $('a.text-primary', str).each(function (i, html) {
                    //         musc_list.push('https://www.fangpi.net' + $(html).attr('href'));
                    //     });
                    //     // console.log(musc_list)

                    //     if (musc_list.length > 0) {
                    //         network["native"](musc_list[1], function (str) {
                    //             var urlPattern = /['|"](https?:\/\/[^'"]+\.(?:mp3|m3u8)[^'"]*)['|"]/;
                    //             var match = str.match(urlPattern);

                    //             if (match) {
                    //                 var urlvideo = match[1];
                    //                 var data = {
                    //                     url: urlvideo,
                    //                     title: currentplaylist[currentIndex][0],
                    //                     playall: false
                    //                 }
                    //                 player.play(data);
                    //             } else {
                    //                 Lampa.Noty.show('找不到相关歌曲音频文件。');
                    //             }
                    //             // Lampa.Modal.close();
                    //             // Lampa.Controller.toggle('content');
                    //         }, function (a, c) {
                    //             Lampa.Noty.show(network.errorDecode(a, c));
                    //         }, false, {
                    //             dataType: 'text',
                    //             headers: {
                    //                 'Referer': 'https://www.fangpi.net/'
                    //             }
                    //         });
                    //     } else {
                    //         // Lampa.Modal.close();
                    //         // Lampa.Controller.toggle('content');
                    //         Lampa.Noty.show('找不到相关歌曲音频文件。');
                    //     }

                    // }, function (a, c) {
                    //     Lampa.Noty.show(network.errorDecode(a, c));
                    // }, false, {
                    //     dataType: 'text',
                    //     headers: {
                    //         'Referer': 'https://www.fangpi.net/'
                    //     }
                    // });
                }
            }
        }
    }

    function playAll() {
        currentplaylist = musiclist;
        if (currentplaylist.length > 0) {
            button.show();
            var lrcObj = {};
            Lampa.Storage.set('online_music_balanser', 'neteasemusic');
            var network = new Lampa.Reguest();
            var player = window.radio_player2_;
            // var src = currentplaylist.pop();
            // var src = currentplaylist.shift();
            // myAudio.src = src;
            // currentplaylist.unshift(src);
            // myAudio.play();
            currentIndex = 0;
            // console.log('播放完毕，准备下一首歌。')

            network["native"]('https://music.163.com/api/song/lyric?id=' + + currentplaylist[currentIndex][1] + '&lv=1&kv=1&tv=-1', function (result) {
                if (result.code == 200) {
                    // console.log(result.lrc.lyric)
                    if (result.lrc && result.lrc.lyric) {
                        var lyrics = result.lrc.lyric.split("\n");
                        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                        for (var i = 0; i < lyrics.length; i++) {
                            var lyric = decodeURIComponent(lyrics[i]);
                            var timeRegExpArr = lyric.match(timeReg);
                            if (!timeRegExpArr) continue;
                            var clause = lyric.replace(timeReg, '');
                            var min, sec, time;
                            for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                                var t = timeRegExpArr[k];
                                min = Number(String(t.match(/\[\d*/i)).slice(1));
                                sec = Number(String(t.match(/\:\d*/i)).slice(1));
                                time = min * 60 + sec;
                                lrcObj[time] = clause;
                            }
                        }
                    }
                    // console.log(lrcObj)
                }
            }, false, false, {
                dataType: 'json'
            });
            if (currentplaylist[currentIndex][2] !== 1 && currentplaylist[currentIndex][4] <= 1) {
                // network.silent('https://ncm.icodeq.com/song/url?id=' + currentplaylist[currentIndex][1], function (result) {
                //     var data = {
                //         url: result.data[0].url,
                //         title: currentplaylist[currentIndex][0],
                //         playall: true
                //     }
                //     player.play(data);
                // }, false, false, {
                //     dataType: 'json'
                // });
                var data = {
                    url: 'https://music.163.com/song/media/outer/url?id=' + currentplaylist[currentIndex][1],
                    title: currentplaylist[currentIndex][0],
                    playall: true,
                    lrc: lrcObj,
                    list: currentplaylist
                }
                player.play(data);
            } else {
                Lampa.Modal.open({
                    title: '',
                    html: Lampa.Template.get('modal_loading'),
                    size: 'small',
                    align: 'center',
                    mask: true,
                    onBack: function onBack() {
                        Lampa.Modal.close();
                        Lampa.Api.clear();
                        Lampa.Controller.toggle('content');
                    }
                });
                //https://diii.tk/
                network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&name=' + encodeURIComponent(currentplaylist[currentIndex][3] + ' ' + currentplaylist[currentIndex][0].replace('(Live)', '')), function (result) {
                    if (result.code === 0) {
                        var queryData = result.data.filter(function (fp) {
                            // console.log(fp.name ,(object.code == '1' ? element.artists[0].name: element.ar[0].name))
                            return (fp.name.replace('G.E.M. 邓紫棋', 'G.E.M.邓紫棋') === currentplaylist[currentIndex][3] || fp.name.indexOf(currentplaylist[currentIndex][3]) !== -1) && fp.songname === currentplaylist[currentIndex][0].replace('(Live)', '')
                        })

                        if (queryData.length > 0) {
                            // console.log(queryData,queryData[0].mid)
                            network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&mid=' + queryData[0].mid, function (result) {
                                // if (result.msg == '成功') {
                                var data = {
                                    url: result.data.src,
                                    title: currentplaylist[currentIndex][0],
                                    playall: true,
                                    lrc: lrcObj,
                                    list: currentplaylist
                                }
                                player.play(data);
                                Lampa.Modal.close();
                                Lampa.Controller.toggle('content');
                            }, false, false, {
                                dataType: 'json'
                            });
                        } else {
                            network["native"]('https://api.xingzhige.com/API/QQmusicVIP/?max=50&br=8&type=json&mid=' + result.data[0].mid, function (result) {
                                // if (result.msg == '成功') {
                                var data = {
                                    url: result.data.src,
                                    title: currentplaylist[currentIndex][0],
                                    playall: true,
                                    lrc: lrcObj,
                                    list: currentplaylist
                                }
                                player.play(data);
                                Lampa.Modal.close();
                                Lampa.Controller.toggle('content');
                            }, false, false, {
                                dataType: 'json'
                            });
                            // Lampa.Modal.close();
                            // Lampa.Controller.toggle('content');
                            // Lampa.Noty.show('找不到相关歌曲音频文件。');
                        }
                    }
                }, false, false, {
                    dataType: 'json'
                });

                // network["native"]('https://www.fangpi.net/s/' + encodeURIComponent(currentplaylist[currentIndex][3] + ' ' + currentplaylist[currentIndex][0]), function (str) {
                //     var musc_list = [];
                //     str = str.replace(/\n/g, '');

                //     $('a.text-primary', str).each(function (i, html) {
                //         musc_list.push('https://www.fangpi.net' + $(html).attr('href'));
                //     });
                //     // console.log(musc_list)

                //     if (musc_list.length > 0) {
                //         network["native"](musc_list[1], function (str) {
                //             var urlPattern = /['|"](https?:\/\/[^'"]+\.(?:mp3|m3u8)[^'"]*)['|"]/;
                //             var match = str.match(urlPattern);

                //             if (match) {
                //                 var urlvideo = match[1];
                //                 var data = {
                //                     url: urlvideo,
                //                     title: currentplaylist[currentIndex][0],
                //                     playall: false
                //                 }
                //                 player.play(data);
                //             } else {
                //                 Lampa.Noty.show('找不到相关歌曲音频文件。');
                //             }
                //             Lampa.Modal.close();
                //             Lampa.Controller.toggle('content');
                //         }, function (a, c) {
                //             Lampa.Noty.show(network.errorDecode(a, c));
                //         }, false, {
                //             dataType: 'text',
                //             headers: {
                //                 'Referer': 'https://www.fangpi.net/'
                //             }
                //         });
                //     } else {
                //         Lampa.Modal.close();
                //         Lampa.Controller.toggle('content');
                //         Lampa.Noty.show('找不到相关歌曲音频文件。');
                //     }

                // }, function (a, c) {
                //     Lampa.Noty.show(network.errorDecode(a, c));
                // }, false, {
                //     dataType: 'text',
                //     headers: {
                //         'Referer': 'https://www.fangpi.net/'
                //     }
                // });
            }
        } else {
            Lampa.Noty.show('没有可以播放的歌曲。');
        }
    }

    function compareFirstArray(array1, array2) {
        if (array1.length === 0 || array2.length === 0) {
            return false;
        }
        return array1[0] === array2[0];
    }

    function removeAfterDelimiter(str, delimiter) {
        const index = str.indexOf(delimiter);
        if (index !== -1) {
            return str.substring(0, index);
        }
        return str;
    }

    function popupWindows(playlistname, gourl, num, gotype, titlename) {
        var sources = [];
        var songling = playlistname;
        var playlistData = songling.split(',');
        // console.log(playlistData)

        playlistData.forEach(function (html) {
            sources.push({
                title: html,
                url: gourl + html
            });

        });
        // console.log(sources)
        var html_ = $('<div></div>');
        var navigation = $('<div class="navigation-tabs"></div>');

        sources.forEach(function (tab, i) {
            var button = $('<div class="navigation-tabs__button selector">' + tab.title + '</div>');
            button.on('hover:enter', function () {
                Lampa.Activity.push({
                    url: tab.url,
                    title: '音乐 - ' + titlename + ' - ' + tab.title,
                    code: '',
                    component: 'music',
                    type: gotype,
                    connectype: '',
                    page: 1
                });
                Lampa.Modal.close();
            });

            if (i > 0 && i % num != 0) navigation.append('<div class="navigation-tabs__split">|</div>');
            if (i % num == 0) { // 当 i 是 num 的倍数时，将当前行容器加入到总容器，并新建一个行容器
                if (i > 0) html_.append(navigation);
                navigation = $('<div class="navigation-tabs"></div>');
            }
            navigation.append(button);
        });

        html_.append(navigation);
        // console.log(navigation)

        Lampa.Modal.open({
            title: '歌单分类',
            html: html_,
            size: 'medium',
            // align: 'center',
            // select: html.find('.navigation-tabs .active')[0],
            mask: true,
            onBack: function onBack() {
                Lampa.Modal.close();
                Lampa.Api.clear();
                Lampa.Controller.toggle('content');
            }
        });
        sources = null;
        playlistData = null;

    }
    var button = $("<div class=\"head__action head__settings selector\">\n            <svg fill=\"currentColor\" width=\"28px\" height=\"28px\" viewBox=\"0 0 0.84 0.84\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M0.77 0.595v0.07H0.28v-0.07h0.49Zm0 -0.21v0.07H0.28v-0.07h0.49Zm0 -0.21v0.07H0.28V0.175h0.49ZM0.14 0.7a0.07 0.07 0 1 1 0 -0.14 0.07 0.07 0 0 1 0 0.14Zm0 -0.21a0.07 0.07 0 1 1 0 -0.14 0.07 0.07 0 0 1 0 0.14Zm0 -0.21a0.07 0.07 0 1 1 0 -0.14 0.07 0.07 0 0 1 0 0.14Z\"/></svg>\n        </div>");

    function addFilter() {
        var activi;
        var timer;
        // button.hide().on('hover:enter', function () {
        //   if (activi) {
        //     activi.activity.component().filter();
        //   }
        // });

        button.hide().on('hover:enter', function () {
            if (activi && currentplaylist) {
                var balanser_ = Lampa.Storage.get('online_music_balanser');
                // && balanser_ === 'zz123'
                var sources = [];
                var num = 3;
                var playlistData = currentplaylist;

                playlistData.forEach(function (html, i) {
                    sources.push({
                        title: currentplaylist[i][3] + '-' + currentplaylist[i][0],
                        url: currentplaylist[i][0]
                    });
                });

                var html_ = $('<div></div>');
                var navigation = $('<div class="navigation-tabs"></div>');

                sources.forEach(function (tab, i) {
                    var ifplaynow = ($('.radio-player__name').text().replace(/Radio Record|Music Player/g, '') === tab.url) ? " active" : "";
                    var button = $('<div class="navigation-tabs__button selector'+ifplaynow+'">' + tab.title + '</div>');

                    button.on('hover:enter', function () {
                        playEndedHandler_(i - 1);
                        Lampa.Modal.close();
                        Lampa.Controller.toggle('content');
                    });
                    // if (html_.find('.radio-player__name').text().replace(/Radio Record|Music Player/g,'') === tab.url) button.addClass('active');
                    if (i > 0 && i % num !== 0) {
                        navigation.append('<div class="navigation-tabs__split">|</div>');
                    }

                    if (i % num === 0) {
                        if (i > 0) {
                            html_.append(navigation);
                        }
                        navigation = $('<div class="navigation-tabs"></div>');
                    }

                    navigation.append(button);
                });

                html_.append(navigation);

                Lampa.Modal.open({
                    title: '当前播放列表',
                    select: html_.find('.navigation-tabs .active')[0],
                    html: html_,
                    size: 'medium',
                    mask: true,
                    onBack: function () {
                        Lampa.Modal.close();
                        Lampa.Api.clear();
                        Lampa.Controller.toggle('content');
                    }
                });

                sources = null;
                playlistData = null;
            }
        });


        $('.head__actions .open--search').before(button);
        Lampa.Listener.follow('activity', function (e) {
            if (e.type == 'start') activi = e.object;
            clearTimeout(timer);
            timer = setTimeout(function () {
                if (activi) {
                    if (activi.component !== 'music') {
                        button.hide();
                        activi = false;
                    }
                }
            }, 1000);

            if (e.type == 'start' && e.component == 'music' && currentplaylist) {
                button.show();
                activi = e.object;
            }
        });
    };

    function startMUSIC() {
        Lampa.Template.add('radio_item', "<div class=\"selector radio-item\">\n        <div class=\"radio-item__imgbox\">\n            <img class=\"radio-item__img\" />\n        </div>\n\n        <div class=\"radio-item__name\">{name}</div>\n    </div>");
        Lampa.Template.add('radio_player', "<div class=\"selector radio-player stop hide\">\n        <div class=\"radio-player__name\">Music Player</div>\n\n        <div class=\"radio-player__button\">\n            <i></i>\n            <i></i>\n            <i></i>\n            <i></i>\n        </div>\n    </div>");
        Lampa.Template.add('radio_style', "<style>\n    .radio-item {\n        width: 8em;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-item__imgbox {\n        background-color: #3E3E3E;\n        padding-bottom: 83%;\n        position: relative;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n      }\n      .radio-item__img {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n      .radio-item__name {\n        font-size: 1.1em;\n        margin-top: 0.8em;\n      }\n      .radio-item.focus .radio-item__imgbox:after {\n        border: solid 0.4em #fff;\n        content: \"\";\n        display: block;\n        position: absolute;\n        left: 0;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n      }\n      .radio-item + .radio-item {\n        margin-left: 1em;\n      }\n      \n      @-webkit-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @-moz-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @-o-keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      \n      @keyframes sound {\n        0% {\n          height: 0.1em;\n        }\n        100% {\n          height: 1em;\n        }\n      }\n      @-webkit-keyframes sound-loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n                  transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n                  transform: rotate(360deg);\n        }\n      }\n      @-moz-keyframes sound-loading {\n        0% {\n          -moz-transform: rotate(0deg);\n               transform: rotate(0deg);\n        }\n        100% {\n          -moz-transform: rotate(360deg);\n               transform: rotate(360deg);\n        }\n      }\n      @-o-keyframes sound-loading {\n        0% {\n          -o-transform: rotate(0deg);\n             transform: rotate(0deg);\n        }\n        100% {\n          -o-transform: rotate(360deg);\n             transform: rotate(360deg);\n        }\n      }\n      @keyframes sound-loading {\n        0% {\n          -webkit-transform: rotate(0deg);\n             -moz-transform: rotate(0deg);\n               -o-transform: rotate(0deg);\n                  transform: rotate(0deg);\n        }\n        100% {\n          -webkit-transform: rotate(360deg);\n             -moz-transform: rotate(360deg);\n               -o-transform: rotate(360deg);\n                  transform: rotate(360deg);\n        }\n      }\n      .radio-player {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n           -moz-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-border-radius: 0.3em;\n           -moz-border-radius: 0.3em;\n                border-radius: 0.3em;\n        padding: 0.2em 0.8em;\n        background-color: rgb(255 255 255 / 0%);\n      }\n      .radio-player__name {\n        margin-right: 1em;\n        white-space: nowrap;\n        overflow: hidden;\n        -o-text-overflow: ellipsis;\n           text-overflow: ellipsis;\n        max-width: 8em;\n      }\n      @media screen and (max-width: 385px) {\n        .radio-player__name {\n          display: none;\n        }\n      }\n      .radio-player__button {\n        position: relative;\n        width: 1.5em;\n        height: 1.5em;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -moz-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n           -moz-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n           -moz-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player__button i {\n        display: block;\n        width: 0.2em;\n        background-color: #fff;\n        margin: 0 0.1em;\n        -webkit-animation: sound 0ms -800ms linear infinite alternate;\n           -moz-animation: sound 0ms -800ms linear infinite alternate;\n             -o-animation: sound 0ms -800ms linear infinite alternate;\n                animation: sound 0ms -800ms linear infinite alternate;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player__button i:nth-child(1) {\n        -webkit-animation-duration: 474ms;\n           -moz-animation-duration: 474ms;\n             -o-animation-duration: 474ms;\n                animation-duration: 474ms;\n      }\n      .radio-player__button i:nth-child(2) {\n        -webkit-animation-duration: 433ms;\n           -moz-animation-duration: 433ms;\n             -o-animation-duration: 433ms;\n                animation-duration: 433ms;\n      }\n      .radio-player__button i:nth-child(3) {\n        -webkit-animation-duration: 407ms;\n           -moz-animation-duration: 407ms;\n             -o-animation-duration: 407ms;\n                animation-duration: 407ms;\n      }\n      .radio-player__button i:nth-child(4) {\n        -webkit-animation-duration: 458ms;\n           -moz-animation-duration: 458ms;\n             -o-animation-duration: 458ms;\n                animation-duration: 458ms;\n      }\n      .radio-player.stop .radio-player__button {\n        -webkit-border-radius: 100%;\n           -moz-border-radius: 100%;\n                border-radius: 100%;\n        border: 0.2em solid #fff;\n      }\n      .radio-player.stop .radio-player__button i {\n        display: none;\n      }\n      .radio-player.stop .radio-player__button:after {\n        content: \"\";\n        width: 0.5em;\n        height: 0.5em;\n        background-color: #fff;\n      }\n      .radio-player.loading .radio-player__button:before {\n        content: \"\";\n        display: block;\n        border-top: 0.2em solid #fff;\n        border-left: 0.2em solid transparent;\n        border-right: 0.2em solid transparent;\n        border-bottom: 0.2em solid transparent;\n        -webkit-animation: sound-loading 1s linear infinite;\n           -moz-animation: sound-loading 1s linear infinite;\n             -o-animation: sound-loading 1s linear infinite;\n                animation: sound-loading 1s linear infinite;\n        width: 0.9em;\n        height: 0.9em;\n        -webkit-border-radius: 100%;\n           -moz-border-radius: 100%;\n                border-radius: 100%;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n      }\n      .radio-player.loading .radio-player__button i {\n        display: none;\n      }\n      .radio-player.focus {\n        background-color: #fff;\n        color: #000;\n      }\n      .radio-player.focus .radio-player__button {\n        border-color: #000;\n      }\n      .radio-player.focus .radio-player__button i, .radio-player.focus .radio-player__button:after {\n        background-color: #000;\n      }\n      .radio-player.focus .radio-player__button:before {\n        border-top-color: #000;\n      }\n    </style>");

        window.plugin_music_ready = true;
        Lampa.Component.add('music', MUSIC);

        function addSettingsMusic() {
            window.radio_player2_ = new player();
            var ico = '<svg width="24" height="24" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg"><path d="M.649.068A.03.03 0 0 0 .625.061l-.39.06A.03.03 0 0 0 .21.15v.31A.104.104 0 0 0 .165.45.105.105 0 1 0 .27.555V.326L.6.274V.4A.104.104 0 0 0 .555.39.105.105 0 1 0 .66.495V.09A.03.03 0 0 0 .649.068ZM.165.6A.045.045 0 1 1 .21.555.045.045 0 0 1 .165.6Zm.39-.06A.045.045 0 1 1 .6.495.045.045 0 0 1 .555.54ZM.6.214l-.33.05v-.09L.6.126Z" fill="white"/></svg>';
            var menu_item = $('<li class="menu__item selector focus" data-action="music"><div class="menu__ico">' + ico + '</div><div class="menu__text">音乐</div></li>');
            menu_item.on('hover:enter', function () {
                Lampa.Select.show({
                    title: '分类',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                        if (a.title == '歌单') {
                            var playlistname = '华语,粤语,欧美,日语,韩语,流行,摇滚,民谣,电子,舞曲,说唱,轻音乐,爵士,乡村,R&B/Soul,古典,民族,英伦,金属,朋克,蓝调,雷鬼,世界音乐,拉丁,New Age,古风,后摇,Bossa Nova,清晨,夜晚,学习,工作,午休,下午茶,地铁,驾车,运动,旅行,散步,酒吧,怀旧,清新,浪漫,伤感,治愈,放松,孤独,感动,兴奋,快乐,安静,思念,综艺,影视原声,ACG,儿童,校园,游戏,70后,80后,90后,网络歌曲,KTV,经典,翻唱,吉他,钢琴,器乐,榜单,00后';
                            popupWindows(playlistname, "https://music.163.com/api/playlist/list/?cat=", 5, "playlist", "歌单")
                        } else {
                            Lampa.Activity.push({
                                url: a.url,
                                title: '音乐 - ' + a.title,
                                code: a.code,
                                component: 'music',
                                type: a.type,
                                connectype: a.connectype,
                                page: 1
                            });
                        }
                    },
                    onBack: function onBack() {
                        Lampa.Controller.toggle('menu');
                    }
                });
            });
            $('.menu .menu__list').eq(0).append(menu_item);
            //$('.menu .menu__list .menu__item.selector').eq(1).after(menu_item);
            addFilter();
            $('body').append(Lampa.Template.get('radio_style', {}, true));
            window.radio_player2_.create();
        }

        if (window.appready) addSettingsMusic()
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addSettingsMusic()
            })
        }
    }

    if (!window.plugin_music_ready) startMUSIC();
    musiclist = null;
    currentplaylist = null;
})();
