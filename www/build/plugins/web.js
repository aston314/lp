(function () {
    'use strict';
    var catalogs;

    var MOBILE_UA = "Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36";
    var PC_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36";
    var UA = "Mozilla/5.0";
    var UC_UA = "Mozilla/5.0 (Linux; U; Android 9; zh-CN; MI 9 Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.5.5.1035 Mobile Safari/537.36";
    var IOS_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

    var inner_catalogs = [
        // {
        //     title: "完美看看",
        //     link: "https://www.wanmeikk.film",
        //     show: "portrait",
        //     next:"search",
        //     datasort: "",
        //     use_referer: false,
        //    category: [{
        //         title: "最近更新",
        //         url: "https://www.wanmeikk.film",
        //         quantity: ':lt(15)'
        //     },
        //     {
        //         title: "电影",
        //         url: "https://www.wanmeikk.film/category/1.html",
        //         quantity: ''
        //     },
        //     {
        //         title: "韩剧",
        //         url: "https://www.wanmeikk.film/category/3.html",
        //         quantity: ''
        //     },
        //     {
        //         title: "国产剧",
        //         url: "https://www.wanmeikk.film/category/5.html",
        //         quantity: ''
        //     },
        //     {
        //         title: "欧美剧",
        //         url: "https://www.wanmeikk.film/category/2.html",
        //         quantity: ''
        //     },
        //     {
        //         title: "日剧",
        //         url: "https://www.wanmeikk.film/category/4.html",
        //         quantity: ''
        //     },
        //     {
        //         title: "动漫",
        //         url: "https://www.wanmeikk.film/category/6.html",
        //         quantity: ''
        //     },
        //     {
        //         title: "综艺",
        //         url: "https://www.wanmeikk.film/category/7.html",
        //         quantity: ''
        //     }],
        //     list: {
        //         page: {
        //             selector: "ul.stui-page"
        //         },
        //         videoscontainer: {
        //             selector: ".stui-vodlist__box",
        //             attrName: "",
        //             filter: ""
        //         },
        //         title: {
        //             selector: "a.stui-vodlist__thumb",
        //             attrName: "title",
        //             filter: ""
        //         },
        //         thumb: {
        //             selector: "a.stui-vodlist__thumb",
        //             attrName: "data-original",
        //             filter: ""
        //         },
        //         link: {
        //             selector: "a.stui-vodlist__thumb",
        //             attrName: "href",
        //             filter: ""
        //         }
        //     },
        //     search: {
        //         url: "https://www.wanmeikk.film/so/-------------.html?wd=#msearchword&submit="
        //     }
        // },
        {
            title: "LIBVIO",
            link: "https://libvio.fun",
            show: "portrait",
            next: "search",
            datasort: "",
            use_referer: true,
            category: [{
                title: '最近更新',
                url: 'https://libvio.fun/',
                quantity: ':lt(12)'
            }, {
                title: '电影',
                url: 'https://libvio.fun/type/1.html',
                quantity: ''
            }, {
                title: '剧集',
                url: 'https://libvio.fun/type/2.html',
                quantity: ''
            }, {
                title: '日韩剧',
                url: 'https://libvio.fun/type/15.html',
                quantity: ''
            }, {
                title: '国产剧',
                url: 'https://libvio.fun/type/13.html',
                quantity: ''
            }, {
                title: '欧美剧',
                url: 'https://libvio.fun/type/16.html',
                quantity: ''
            }, {
                title: '港台剧',
                url: 'https://libvio.fun/type/14.html',
                quantity: ''
            }, {
                title: '动漫',
                url: 'https://libvio.fun/type/4.html',
                quantity: ''
            }],
            list: {
                page: {
                    selector: "div.stui-pannel__ft"
                },
                videoscontainer: {
                    selector: ".stui-vodlist__box",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: "a.stui-vodlist__thumb",
                    attrName: "title",
                    filter: ""
                },
                thumb: {
                    selector: "a.stui-vodlist__thumb",
                    attrName: "data-original",
                    filter: ""
                },
                link: {
                    selector: "a.stui-vodlist__thumb",
                    attrName: "href",
                    filter: ""
                }
            },
            detail: {
                videoscontainer: {
                    selector: 'div > div:nth-child(2) > ul > li',
                    attrName: '',
                    filter: ''
                },
                title: {
                    selector: 'a',
                    attrName: 'text',
                    filter: ''
                },
                link: {
                    selector: 'a',
                    attrName: 'href',
                    filter: ''
                }
            },
            search: {
                url: 'https://libvio.fun/search/-------------.html?wd=#msearchword&submit='
            }
        },
        {
            title: "欧乐影院",
            link: "https://www.olevod.com",
            show: "portrait",
            next: "search",
            datasort: "",
            use_referer: false,
            category: [{
                title: "电影",
                url: "https://www.olevod.com/index.php/vod/show/id/1.html",
                quantity: ''
            },
            {
                title: "电视剧",
                url: "https://www.olevod.com/index.php/vod/show/id/2.html",
                quantity: ''
            },
            {
                title: "国产剧",
                url: "https://olevod.com/index.php/vod/show/id/202.html",
                quantity: ''
            },
            {
                title: "日韩剧",
                url: "https://www.olevod.com/index.php/vod/show/id/204.html",
                quantity: ''
            },
            {
                title: "欧美剧",
                url: "https://www.olevod.com/index.php/vod/show/id/201.html",
                quantity: ''
            },
            {
                title: "港台剧",
                url: "https://www.olevod.com/index.php/vod/show/id/203.html",
                quantity: ''
            },
            {
                title: "综艺",
                url: "https://www.olevod.com/index.php/vod/show/id/3.html",
                quantity: ''
            },
            {
                title: "动漫",
                url: "https://www.olevod.com/index.php/vod/show/id/4.html",
                quantity: ''
            }],
            list: {
                page: {
                    selector: "ul.page.text_center"
                },
                videoscontainer: {
                    selector: "ul.vodlist li",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: "a",
                    attrName: "title",
                    filter: ""
                },
                thumb: {
                    selector: "a",
                    attrName: "data-original",
                    filter: ""
                },
                link: {
                    selector: "a",
                    attrName: "href",
                    filter: ""
                }
            },
            search: {
                url: "https://www.olevod.com/index.php/vod/search.html?wd=#msearchword&submit="
            }
        },
        {
            title: "在线之家",
            link: "https://www.zxzj.org",
            show: "portrait",
            next: "search",
            datasort: "",
            use_referer: false,
            category: [{
                title: "首页",
                url: "https://zxzj.org",
                quantity: ':gt(11)'
            }, {
                title: "电影",
                url: "https://zxzj.org/list/1.html",
                quantity: ''
            },
            {
                title: "美剧",
                url: "https://zxzj.org/list/2.html",
                quantity: ''
            },
            {
                title: "韩剧",
                url: "https://zxzj.org/list/3.html",
                quantity: ''
            },
            {
                title: "日剧",
                url: "https://zxzj.org/list/4.html",
                quantity: ''
            },
            {
                title: "泰剧",
                url: "https://zxzj.org/list/5.html",
                quantity: ''
            },
            {
                title: "动漫",
                url: "https://zxzj.org/list/6.html",
                quantity: ''
            }],
            list: {
                page: {
                    selector: "ul.stui-page__item"
                },
                videoscontainer: {
                    selector: ".stui-vodlist__box",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: "a.stui-vodlist__thumb",
                    attrName: "title",
                    filter: ""
                },
                thumb: {
                    selector: "a.stui-vodlist__thumb",
                    attrName: "data-original",
                    filter: ""
                },
                link: {
                    selector: "a.stui-vodlist__thumb",
                    attrName: "href",
                    filter: ""
                }
            },
            search: {
                url: "https://zxzj.org/vodsearch/-------------.html?wd=#msearchword&submit="
            }
        },
        {
            title: "秋霞电影",
            link: "https://www.7xiady.cc",
            show: "portrait",
            next: "search",
            datasort: "",
            use_referer: false,
            category: [{
                title: "电影",
                url: "https://www.7xiady.cc/type/dianying",
                quantity: ''
            },
            {
                title: "连续剧",
                url: "https://www.7xiady.cc/type/lianxuju",
                quantity: ''
            },
            {
                title: "动漫",
                url: "https://www.7xiady.cc/type/dongman",
                quantity: ''
            },
            {
                title: "综艺",
                url: "https://www.7xiady.cc/type/zongyi",
                quantity: ''
            }],
            list: {
                page: {
                    selector: "ul.stui-page"
                },
                videoscontainer: {
                    selector: "li.stui-vodlist__item",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: "a.stui-vodlist__thumb",
                    attrName: "title",
                    filter: ""
                },
                thumb: {
                    selector: "a.stui-vodlist__thumb",
                    attrName: "data-original",
                    filter: ""
                },
                link: {
                    selector: "a.stui-vodlist__thumb",
                    attrName: "href",
                    filter: ""
                }
            },
            search: {
                url: "https://www.7xiady.cc/search/#msearchword----------1---/"
            }
        },
        {
            title: "低端影视",
            link: "https://ddys.one",
            show: "portrait",
            next: "search",
            datasort: "",
            use_referer: true,
            category: [{
                title: "电影",
                url: "https://ddys.one/category/movie/",
                quantity: ''
            },
            {
                title: "剧集",
                url: "https://ddys.one/category/airing/",
                quantity: ''
            },
            {
                title: "欧美剧",
                url: "https://ddys.one/category/drama/western-drama/",
                quantity: ''
            },
            {
                title: "韩剧",
                url: "https://ddys.one/category/drama/kr-drama/",
                quantity: ''
            },
            {
                title: "日剧",
                url: "https://ddys.one/category/drama/jp-drama/",
                quantity: ''
            },
            {
                title: "动画",
                url: "https://ddys.one/category/anime/",
                quantity: ''
            }],
            list: {
                page: {
                    selector: ".nav-links"
                },
                videoscontainer: {
                    selector: "div.post-box-container",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: "h2 > a",
                    attrName: "text",
                    filter: "(.+?) \\("
                },
                thumb: {
                    selector: "",
                    attrName: "html",
                    filter: '["|\(](\/.+?.jpg)'
                },
                link: {
                    selector: "h2 > a",
                    attrName: "href",
                    filter: ""
                }
            },
            search: {
                url: ""
            }
        },
        {
            title: "厂长资源",
            next: "search",
            link: "https://www.czspp.com",
            show: "portrait",
            datasort: "",
            use_referer: false,
            category: [{
                title: "电影",
                url: "https://www.czspp.com/zuixindianying",
                quantity: ''
            },
            {
                title: "电视剧",
                url: "https://www.czspp.com/dsj",
                quantity: ''
            },
            {
                title: "美剧",
                url: "https://www.czspp.com/meijutt",
                quantity: ''
            },
            {
                title: "韩剧",
                url: "https://www.czspp.com/hanjutv",
                quantity: ''
            },
            {
                title: "国产剧",
                url: "https://www.czspp.com/gcj",
                quantity: ''
            },
            {
                title: "动漫",
                url: "https://www.czspp.com/dm",
                quantity: ''
            },
            {
                title: "番剧",
                url: "https://www.czspp.com/fanju",
                quantity: ''
            },
            {
                title: "豆瓣电影Top250",
                url: "https://www.czspp.com/gaofenyingshi",
                quantity: ''
            }],
            list: {
                page: {
                    selector: "div.pagenavi_txt"
                },
                videoscontainer: {
                    selector: "div.bt_img > ul > li",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: "img",
                    attrName: "alt",
                    filter: ""
                },
                thumb: {
                    selector: "img",
                    attrName: "data-original",
                    filter: ""
                },
                link: {
                    selector: "a",
                    attrName: "href",
                    filter: ""
                }
            },
            search: {
                url: "https://www.czspp.com/xssearch?q=#msearchword"
            }
        },
        // {
        //     title: "COKEMV影视",
        //     link: "https://cokemv.me",
        //     show: "portrait",
        //     next:"search",
        //     datasort: "",
        //     use_referer: false,
        //    category: [{
        //         title: "电影",
        //         url: "https://cokemv.me/vodshow/1-----------.html",
        //         quantity: ''
        //     },
        //     {
        //         title: "电视剧",
        //         url: "https://cokemv.me/vodshow/2-----------.html",
        //         quantity: ''
        //     },
        //     {
        //         title: "动漫",
        //         url: "https://cokemv.me/vodshow/3-----------.html",
        //         quantity: ''
        //     },
        //     {
        //         title: "综艺",
        //         url: "https://cokemv.me/vodshow/29-----------.html",
        //         quantity: ''
        //     }],
        //     list: {
        //         page: {
        //             selector: "#page"
        //         },
        //         videoscontainer: {
        //             selector: "a.module-poster-item.module-item",
        //             attrName: "",
        //             filter: ""
        //         },
        //         title: {
        //             selector: "img.lazy.lazyload",
        //             attrName: "alt",
        //             filter: ""
        //         },
        //         thumb: {
        //             selector: "img.lazy.lazyload",
        //             attrName: "data-original",
        //             filter: ""
        //         },
        //         link: {
        //             selector: "",
        //             attrName: "href",
        //             filter: ""
        //         }
        //     },
        //     search: {
        //         url: "https://cokemv.me/vodsearch/-------------.html?wd=#msearchword"
        //     }
        // },
        {
            title: "乐猪TV",
            link: "http://www.lezhutv.com",
            show: "portrait",
            next: "search",
            datasort: "",
            use_referer: false,
            category: [{
                title: "电影",
                url: "http://www.lezhutv.com/type/1-1.html",
                quantity: ''
            },
            {
                title: "连续剧",
                url: "http://www.lezhutv.com/type/2-1.html",
                quantity: ''
            },
            {
                title: "韩剧",
                url: "http://www.lezhutv.com/type/14-1.html",
                quantity: ''
            },
            {
                title: "美剧",
                url: "http://www.lezhutv.com/type/15-1.html",
                quantity: ''
            },
            {
                title: "动漫",
                url: "http://www.lezhutv.com/type/4-1.html",
                quantity: ''
            },
            {
                title: "综艺",
                url: "http://www.lezhutv.com/type/3-1.html",
                quantity: ''
            }],
            list: {
                page: {
                    selector: "div.menu"
                },
                videoscontainer: {
                    selector: "li.vbox",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: "a",
                    attrName: "title",
                    filter: ""
                },
                thumb: {
                    selector: "a",
                    attrName: "data-original",
                    filter: ""
                },
                link: {
                    selector: "a",
                    attrName: "href",
                    filter: ""
                }
            },
            search: {
                url: "http://www.lezhutv.com/search-pg-1-wd-#msearchword.html"
            }
        },
        {
            title: "Auete影视",
            link: "https://auete.com",
            show: "portrait",
            next: "search",
            datasort: "",
            use_referer: false,
            category: [{
                title: "电影",
                url: "https://auete.com/Movie/index.html",
                quantity: ''
            },
            {
                title: "电视剧",
                url: "https://auete.com/Tv/index.html",
                quantity: ''
            },
            {
                title: "综艺",
                url: "https://auete.com/Zy/index.html",
                quantity: ''
            },
            {
                title: "动漫",
                url: "https://auete.com/Dm/index.html",
                quantity: ''
            },
            {
                title: "其他",
                url: "https://auete.com/qita/index.html",
                quantity: ''
            }],
            list: {
                page: {
                    selector: "ul.pagination"
                },
                videoscontainer: {
                    selector: "ul.threadlist > li.trans_3",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: "img",
                    attrName: "alt",
                    filter: ""
                },
                thumb: {
                    selector: "img",
                    attrName: "src",
                    filter: ""
                },
                link: {
                    selector: "a",
                    attrName: "href",
                    filter: ""
                }
            },
            search: {
                url: "https://auete.com/search.php?searchword=#msearchword"
            }
        },
        // {
        //     title: "JableTV",
        //     link: "https://jable.tv",
        //     show: "landscape",
        //     next:"play",
        //     datasort: "",
        //     use_referer: false,
        //    category: [{
        //         title: "最近更新",
        //         url: "https://jable.tv/latest-updates/",
        //         quantity: ''
        //     },
        //     {
        //         title: "全新上市",
        //         url: "https://jable.tv/new-release/",
        //         quantity: ''
        //     }],
        //     list: {
        //         page: {
        //             selector: "ul.pagination"
        //         },
        //         videoscontainer: {
        //             selector: "div.video-img-box",
        //             attrName: "",
        //             filter: ""
        //         },
        //         title: {
        //             selector: "h6.title a",
        //             attrName: "text",
        //             filter: ""
        //         },
        //         thumb: {
        //             selector: "img",
        //             attrName: "data-src",
        //             filter: ""
        //         },
        //         link: {
        //             selector: "h6.title a",
        //             attrName: "href",
        //             filter: ""
        //         }
        //     },
        //     search: {
        //         url: "https://jable.tv/search/?q=#msearchword&from_videos=1"
        //     }
        // },
        {
            title: "YTS.MX - 磁力下载",
            link: "https://yts.mx",
            show: "portrait",
            next: "detail",
            datasort: "",
            use_referer: false,
            category: [{
                title: "热门电影",
                url: "https://yts.mx/browse-movies/0/all/all/0/featured/0/all",
                quantity: ''
            },
            {
                title: "今年电影",
                url: "https://yts.mx/browse-movies/0/all/all/0/latest/2022/all",
                quantity: ''
            },
            {
                title: "今日趋势",
                url: "https://yts.mx/trending-movies",
                quantity: ''
            },
            {
                title: "更新电影",
                url: "https://yts.mx/browse-movies",
                quantity: ''
            },
            {
                title: "4K电影",
                url: "https://yts.mx/browse-movies/0/2160p/all/0/latest/0/all",
                quantity: ''
            }],
            list: {
                page: {
                    selector: "div:nth-child(5) > ul"
                },
                videoscontainer: {
                    selector: ".browse-movie-wrap",
                    attrName: "",
                    filter: ""
                },
                title: {
                    selector: ".browse-movie-bottom",
                    attrName: "text",
                    filter: ""
                },
                thumb: {
                    selector: ".img-responsive",
                    attrName: "src",
                    filter: ""
                },
                link: {
                    selector: ".browse-movie-title",
                    attrName: "href",
                    filter: ""
                }
            },
            detail: {
                videoscontainer: {
                    selector: '.modal-torrent',
                    attrName: '',
                    filter: ''
                },
                title: {
                    selector: '.magnet-download',
                    attrName: 'title',
                    filter: '([0-9]+[0-9]{1,2}?p)'
                },
                link: {
                    selector: '.magnet-download',
                    attrName: 'href',
                    filter: ''
                }
            },
            search: {
                url: "https://yts.mx/browse-movies/#msearchword/all/all/0/latest/0/all"
            }
        },
        // {
        //     title: "乌龟影视",
        //     link: "https://www.wuguiyy.com",
        //     show: "portrait",
        //     next:"detail",
        //     datasort: "",
        //     use_referer: false,
        //    category: [{
        //         title: "电影",
        //         url: "https://www.wuguiyy.com/show/dianying-----------/",
        //         quantity: ''
        //     },
        //     {
        //         title: "连续剧",
        //         url: "https://www.wuguiyy.com/show/lianxuju-----------/",
        //         quantity: ''
        //     },
        //     {
        //         title: "欧美剧",
        //         url: "https://www.wuguiyy.com/show/lianxuju---%E6%AC%A7%E7%BE%8E%E5%89%A7--------/",
        //         quantity: ''
        //     },
        //     {
        //         title: "国产剧",
        //         url: "https://www.wuguiyy.com/show/lianxuju---%E5%9B%BD%E4%BA%A7%E5%89%A7--------/",
        //         quantity: ''
        //     },
        //     {
        //         title: "日韩剧",
        //         url: "https://www.wuguiyy.com/show/lianxuju---%E6%97%A5%E9%9F%A9%E5%89%A7--------/",
        //         quantity: ''
        //     },
        //     {
        //         title: "港台剧",
        //         url: "https://www.wuguiyy.com/show/lianxuju---%E6%B8%AF%E5%8F%B0%E5%89%A7--------/",
        //         quantity: ''
        //     },
        //     {
        //         title: "动漫",
        //         url: "https://www.wuguiyy.com/show/dongman-----------/",
        //         quantity: ''
        //     },
        //     {
        //         title: "综艺",
        //         url: "https://www.wuguiyy.com/show/zongyi-----------/",
        //         quantity: ''
        //     }],
        //     list: {
        //         page: {
        //             selector: "ul.stui-page"
        //         },
        //         videoscontainer: {
        //             selector: ".stui-vodlist__box",
        //             attrName: "",
        //             filter: ""
        //         },
        //         title: {
        //             selector: "a.stui-vodlist__thumb",
        //             attrName: "title",
        //             filter: ""
        //         },
        //         thumb: {
        //             selector: "a.stui-vodlist__thumb",
        //             attrName: "data-original",
        //             filter: ""
        //         },
        //         link: {
        //             selector: "a.stui-vodlist__thumb",
        //             attrName: "href",
        //             filter: ""
        //         }
        //     },
        //     detail:{
        //         videoscontainer:{
        //            selector:'div:nth-child(2) > div > div.stui-pannel_bd.col-pd.clearfix > ul > li',
        //            attrName:'',
        //            filter:''
        //         },
        //         title:{
        //            selector:'a',
        //            attrName:'text',
        //            filter:''
        //         },
        //         link:{
        //            selector:'a',
        //            attrName:'href',
        //            filter:''
        //         }
        //     },
        //     search: {
        //         url: "https://www.wuguiyy.com/search/-------------/?wd=#msearchword-&submit="
        //     }
        // }
    ];
    if (Lampa.Storage.get('json_use')) {
        $.ajax({
            url: Lampa.Storage.field('web_rule_json') + '?v=' + Math.random(),
            type: 'GET',
            async: false,
            dataType: 'json',
            success: function success(j) {
                if (j.length > 0) {
                    catalogs = j;
                } else {
                    Lampa.Noty.show('网站配置无法加载，请检查JSON地址。');
                }
            },
            error: function error() {
                Lampa.Noty.show('网站配置无法加载，请检查JSON地址。');
            }
        });
    } else {
        catalogs = inner_catalogs;
    };
    function filtred_(json) {
        catalogs = json;
    };

    //console.log(catalogs)

    function collection(object) {
        //console.log(catalogs);
        if (catalogs === 'undefined') {
            Lampa.Noty.show('未能获取网站配置，请从导航条重新进入。');
        };
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true,
            step: 250
        });

        var s, s_name;
        if (object.show == 'minilandscape') {
            s = '<style>@media screen and (max-width: 2560px) {.freetv_n .card--collection {width: 16.6%!important;}}@media screen and (max-width: 385px) {.freetv_n .card--collection {width: 33.3%!important;}}</style>';
            s_name = 'freetv_n ';
        } else {
            s = '';
            s_name = '';
        }

        //console.log(object)
        var items = [];
        var html = $('<div></div>');
        var body = $('<div class="' + s_name + 'category-full"></div>');
        //var cors = object.source == 'rezka' ? 'https://cors.eu.org/' : 'http://corsanywhere.herokuapp.com/';
        var cors = '';
        var info;
        var last;
        var waitload = false;
        var relises = [];
        var doubanitem = [];
        var total_pages;
        this.create = function () {
            var _this = this;
            // console.log(object.page);
            //console.log(object.cards);
            if ((object.page == 1) || object.cards || (!object.card && !Lampa.Storage.field('light_version') && object.card_cat)) {
                this.activity.loader(true);
                if (object.use_referer) {
                    network["native"](cors + object.url, function (str) {
                        var data = _this.card(str);
                        _this.build(data);
                    }, function (a, c) {
                        //_this.selectGroup();
                        // $(".noty:hidden").show();
                        // _this.activity.loader(false);
                        // Lampa.Noty.show(network.errorDecode(a, c)+' 请在右侧选择其他网站');
                        var empty = new Lampa.Empty({
                            descr: '哦，无法获取 ' + object.title + ' 的内容。'
                        });
                        html.append(empty.render());
                        $(".empty__descr").after('<div class="empty__footer"><div class="simple-button selector">选择其他网站</div></div>');
                        //console.log(object)
                        empty.render().find('.simple-button').on('hover:enter', function () {
                            //$(".empty__footer").on('hover:enter hover:click', function () {
                            _this.selectGroup();
                        });
                        _this.start = empty.start;
                        _this.activity.loader(false);
                        _this.activity.toggle();
                        return;
                    }, false, {
                        dataType: 'text',
                        headers: {
                            'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                            'User-Agent': MOBILE_UA
                        }
                    });
                } else {
                    network["native"](cors + object.url, function (str) {
                        var data = _this.card(str);
                        _this.build(data);
                    }, function (a, c) {
                        //_this.selectGroup();
                        // $(".noty:hidden").show();
                        // _this.activity.loader(false);
                        // Lampa.Noty.show(network.errorDecode(a, c)+' 请在右侧选择其他网站');
                        var empty = new Lampa.Empty({
                            descr: '哦，无法获取 ' + object.title + ' 的内容。'
                        });
                        html.append(empty.render());
                        $(".empty__descr").after('<div class="empty__footer"><div class="simple-button selector">选择其他网站</div></div>');
                        empty.render().find('.simple-button').on('hover:enter', function () {
                            //$(".empty__footer").on('hover:enter hover:click', function () {
                            _this.selectGroup();
                        });
                        _this.start = empty.start;
                        _this.activity.loader(false);
                        _this.activity.toggle();
                        return;
                    }, false, {
                        dataType: 'text'
                    });
                };

            } else _this.build(object.data);
            return this.render();
        };
        this.next = function (page) {
            var _this2 = this;
            if (total_pages == 1 || total_pages == 0) waitload = true;
            if (waitload) return;
            waitload = true;
            object.page++;
            //console.log(object.page);
            network.clear();
            network.timeout(1000 * 40);
            if (typeof page == 'undefined') return;
            if (page.indexOf('undefined') != -1) return;
            //console.log(page);
            //var page1 = page.match(new RegExp('-([0-9])\.', ''))[0];
            //console.log(page1[0]);
            //page = page.replace(page.match(/-(\d+)/)[0],'-'+ object.page)
            //console.log(page.match(/[0-9]+(?=[^0-9]*$)(.+)/))
            //var ext = page.match(/[0-9]+(?=[^0-9]*$)(.*)/)[1] ? page.match(/[0-9]+(?=[^0-9]*$)(.*)/)[1] : '';
            if (page.indexOf('before=') !== -1) {
                //page = page.replace('http://proxy.cub.watch/','http://proxy.cub.watch/cdn/https://tx.me/')
            } else {
                const regex = /page=(\d+)/;  // 正则表达式
                const match = page.match(regex);  // 使用 match() 方法来匹配

                if (match) {
                    //console.log("找到了 page 参数：" + match[1]);  // 输出匹配到的数字部分
                    page = page.replace('page=' + match[1], 'page=' + match[1]++)
                } else {
                    page = page.replace(page.match(/[0-9]+(?=[^0-9]*$)(.*)/)[0], '') + object.page + (page.match(/[0-9]+(?=[^0-9]*$)(.*)/)[1] ? page.match(/[0-9]+(?=[^0-9]*$)(.*)/)[1] : '');

                }
            }
            //console.log(page);
            //console.log(object)
            if (object.use_referer) {
                network["native"](cors + page, function (result) {
                    var data = _this2.card(result);
                    object.data = data;
                    _this2.append(data);
                    if (data.card.length) waitload = false;
                    Lampa.Controller.toggle('content');
                    _this2.activity.loader(false);
                }, function (a, c) {
                    Lampa.Noty.show(network.errorDecode(a, c));
                }, false, {
                    dataType: 'text',
                    headers: {
                        'Referer': object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] + '/',
                        'User-Agent': MOBILE_UA
                    }
                });
            } else {
                network["native"](cors + page, function (result) {
                    var data = _this2.card(result);
                    object.data = data;
                    _this2.append(data);
                    if (data.card.length) waitload = false;
                    Lampa.Controller.toggle('content');
                    _this2.activity.loader(false);
                }, function (a, c) {
                    Lampa.Noty.show(network.errorDecode(a, c));
                }, false, {
                    dataType: 'text'
                });
            };
        };

        this.append = function (data) {
            var _this2 = this;
            data.card.forEach(function (element) {
                var card = Lampa.Template.get('card', {
                    title: element.title_org,
                    release_year: object.cards || !object.card_cat ? element.year : element.quantity
                });

                card.addClass(object.show.indexOf('landscape') != -1 ? 'card--collection' : 'card--category');
                //card.addClass(object.title.indexOf('jable') !== -1 || !object.card_cat || object.cards ? 'card--category' : 'card--collection');
                //card.addClass('card--collection');
                //card.addClass('card--category');
                // card.find('.info').css({
                //     'height': '5em',
                // });

                if (object.card) {
                    card.find('.card__age').text('');
                }
                var img = card.find('.card__img')[0];
                img.onload = function () {
                    card.addClass('card--loaded');
                };
                img.onerror = function (e) {
                    img.src = './img/img_broken.svg';
                };
                //var picture = Lampa.Storage.field('proxy_other') === false ? element.img : Lampa.Utils.protocol() + 'proxy.cub.watch/img/' + element.img;
                var picture = element.img;
                img.src = picture;
                if (element.update) {
                    card.find('.card__view').append('<div class="card__quality"></div>');
                    card.find('.card__quality').text(element.update);
                };
                if (element.score) {
                    card.find('.card__view').append('<div class="card__type"></div>');
                    card.find('.card__type').text(element.score);
                };
                //Lampa.Background.change(element.img);
                //Lampa.Background.immediately(element.img);
                card.on('hover:focus', function () {
                    last = card[0];
                    scroll.update(card, true);
                    if (!Lampa.Storage.field('light_version')) {
                        var maxrow = Math.ceil(items.length / 7) - 1;
                        if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this2.next(data.page);
                    };
                    info.find(".info__title-original").text(element.title);
                    if (element.img) Lampa.Background.change(element.img);
                    if (Lampa.Helper) Lampa.Helper.show('tmdb_detail5', '长按住 (ОК) 键查看详情', card);
                });
                card.on('hover:long', function () {
                    Lampa.Modal.open({
                        title: '',
                        html: Lampa.Template.get('modal_loading'),
                        size: 'small',
                        mask: true,
                        onBack: function onBack() {
                            Lampa.Modal.close();
                            Lampa.Api.clear();
                            Lampa.Controller.toggle('content');
                        }
                    });

                    //var douban_cover=element.img.replace(/(.*\/)*([^.]+).*/ig,"$2");
                    //_this2.find_douban('https://movie.douban.com/j/subject_suggest?q=' + element.title_org, element.title_org);

                    Lampa.Api.search({
                        //query: encodeURIComponent((doubanitem.sub_title || element.title))
                        query: encodeURIComponent(element.title_org.replace(/第(.+)季/, ''))
                    }, function (find) {
                        Lampa.Modal.close();
                        //var finded = _this2.finds(find, (doubanitem || element));
                        var finded = _this2.finds(find, element);
                        if (finded) {
                            Lampa.Activity.push({
                                url: '',
                                component: 'full',
                                id: finded.id,
                                method: finded.name ? 'tv' : 'movie',
                                card: finded
                            });
                        } else {
                            Lampa.Noty.show('在TMDB中找不到影片信息。');
                            Lampa.Controller.toggle('content');
                        }
                    }, function () {
                        Lampa.Modal.close();
                        Lampa.Noty.show('在TMDB中找不到影片信息。');
                        Lampa.Controller.toggle('content');
                    });
                });
                card.on('hover:enter', function (target, card_data) {
                    if (object.next == 'search') {
                        Lampa.Activity.push({
                            url: '',
                            title: '在线观看',
                            component: 'online_mod',
                            search: element.title.replace(/( 第.+?季)/, ''),
                            search_one: element.title,
                            search_two: element.title,
                            movie: element,
                            page: 1
                        });
                    } else if (object.next == 'aliyundrive') {
                        if (element.url.match(/https:\/\/www\.aliyundrive\.com\/s\/([a-zA-Z\d]+)/)) {
                            Lampa.Activity.push({
                                url: element.url,
                                title: '阿里云盘播放',
                                component: 'yunpan2',
                                movie: element,
                                page: 1
                            });
                        } else {
                            Lampa.Noty.show('没有找到阿里云盘链接。');;
                        };
                    } else if (object.next == 'detail') {
                        Lampa.Activity.push({
                            url: element.url,
                            title: object.title,
                            component: 'detail_mod',
                            search: element.title,
                            search_one: element.title,
                            search_two: element.title,
                            movie: element,
                            detail: object.detail,
                            page: 1
                        });
                    } else if (object.next == 'play') {
                        network.silent(element.url, function (result) {
                            // /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
                            //var videolink = result.match(/https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|](.mp4|.m3u8)/)[0];
                            var v = result.replace(/\n|\r/g, '').replace(/\\/g, '').match(/https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|](.mp4|.m3u8)/);
                            var videolink = v ? v[0] : '';
                            if (videolink) {
                                //Lampa.Modal.close();
                                var video = {
                                    title: element.title,
                                    url: videolink
                                };
                                Lampa.Player.play(video);
                                Lampa.Player.playlist([video]);
                            } else {
                                //Lampa.Modal.close();
                                Lampa.Noty.show('没有找到对应影片。');
                                //Lampa.Controller.toggle('content');
                            };
                        }, function (a, c) {
                            Lampa.Noty.show(network.errorDecode(a, c));
                        }, false, {
                            dataType: 'text'
                        });
                    }
                });
                body.append(card);
                items.push(card);
            });
        };
        this.build = function (data) {
            var _this2 = this;
            var search_button;
            //是否显示搜索按钮
            if (object.search) {
                search_button = '<div class=\"full-start__button selector open--find\"><svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5122 4.43902C7.60446 4.43902 4.43902 7.60283 4.43902 11.5026C4.43902 15.4024 7.60446 18.5662 11.5122 18.5662C13.4618 18.5662 15.225 17.7801 16.5055 16.5055C17.7918 15.2251 18.5854 13.4574 18.5854 11.5026C18.5854 7.60283 15.4199 4.43902 11.5122 4.43902ZM2 11.5026C2 6.25314 6.26008 2 11.5122 2C16.7643 2 21.0244 6.25314 21.0244 11.5026C21.0244 13.6919 20.2822 15.7095 19.0374 17.3157L21.6423 19.9177C22.1188 20.3936 22.1193 21.1658 21.6433 21.6423C21.1673 22.1188 20.3952 22.1193 19.9187 21.6433L17.3094 19.037C15.7048 20.2706 13.6935 21.0052 11.5122 21.0052C6.26008 21.0052 2 16.7521 2 11.5026Z\" fill=\"currentColor\"/> </svg></div>';
            } else {
                search_button = '';
            }
            Lampa.Template.add('button_category', "" + s + "<div class=\"full-start__buttons\"><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>网站</span>\n    </div>" + search_button + "</div>");
            Lampa.Template.add('info_web', '<div class="info layer--width" style="height:5em"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="web_filtr"></div></div></div>');
            var btn = Lampa.Template.get('button_category');
            info = Lampa.Template.get('info_web');
            info.find('#web_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.open--find').on('hover:enter hover:click', function () {
                Lampa.Input.edit({
                    title: Lampa.Storage.get('online_web_balanser') + ' - 搜索',
                    value: '',
                    free: true,
                    nosave: true
                }, function (new_value) {
                    if (new_value) {
                        //console.log(new_value)
                        var searchurl = object.search.replace('#msearchword', encodeURIComponent(new_value));
                        Lampa.Activity.push({
                            //	url: cors + a.url,
                            url: searchurl,
                            quantity: object.quantity,
                            title: Lampa.Storage.get('online_web_balanser') + ' - 搜索"' + new_value + '"',
                            component: 'mod_web',
                            show: object.show,
                            next: object.next,
                            search: object.search,
                            detail: object.detail,
                            use_referer: object.use_referer,
                            page: 1
                        });
                    }
                    else Lampa.Controller.toggle('content');
                })
            });
            if (data.card.length) {
                html.append(info.append());
                scroll.minus();
                html.append(scroll.render());
                this.append(data);
                if (Lampa.Storage.field('light_version')) this.more(data);
                scroll.append(body);
                this.activity.loader(false);
                this.activity.toggle();
            } else {
                html.append(scroll.render());
                this.empty();
            }
        };
        this.selectGroup = function () {
            //console.log(catalogs)
            var balanser_ = Lampa.Storage.get('online_web_balanser')
            Lampa.Select.show({
                title: '网站',
                // items: catalogs,
                items: catalogs.map(function (elem, index) {
                    elem.selected = balanser_ == elem.title;
                    // console.log(balanser_,elem)
                    return elem;
                  }),
                onSelect: function onSelect(a) {
                    //console.log(a)
                    Lampa.Storage.set('online_web_balanser', a.title);
                    Lampa.Activity.push({
                        //	url: cors + a.url,
                        url: a.category[0].url,
                        quantity: a.category[0].quantity,
                        title: a.title + ' - ' + a.category[0].title,
                        component: 'mod_web',
                        show: a.show,
                        next: a.next,
                        search: a.search.url,
                        detail: a.detail,
                        use_referer: a.use_referer,
                        page: 1
                    });
                },
                onBack: function onBack() {
                    Lampa.Controller.toggle('content');
                }
            });
        };
        this.empty = function () {
            var empty = new Lampa.Empty();
            scroll.append(empty.render());
            this.start = empty.start;
            this.activity.loader(false);
            this.activity.toggle();
        };
        this.more = function (data) {
            var _this = this;
            var more = $('<div class="category-full__more selector"><span>显示更多</span></div>');
            more.on(!Lampa.Platform.get() ? 'hover:enter' : 'hover:focus', function (e) {
                Lampa.Controller.collectionFocus(last || false, scroll.render());
                var next = Lampa.Arrays.clone(object);
                if (data.total_pages == 0) {
                    more.remove();
                    return;
                }
                network.clear();
                network.timeout(1000 * 20);
                var page = data.page;
                var pagenum = object.page + 1;
                page = page.replace(page.match(/[0-9]+(?=[^0-9]*$)(.*)/)[0], '') + pagenum + (page.match(/[0-9]+(?=[^0-9]*$)(.*)/)[1] ? page.match(/[0-9]+(?=[^0-9]*$)(.*)/)[1] : '');
                network.silent(cors + page, function (result) {
                    var card = _this.card(result);
                    next.data = card;
                    if (object.cards) next.cards = false;
                    delete next.activity;
                    next.page++;
                    if (card.card.length == 0) more.remove();
                    else Lampa.Activity.push(next);
                }, function (a, c) {
                    Lampa.Noty.show(network.errorDecode(a, c));
                }, false, {
                    dataType: 'text'
                });
            });
            body.append(more);
        };

        this.card = function (str) {
            var card = [];
            var page;
            if (typeof catalogs === 'undefined') {
                return {
                    card: {},
                    page: 0,
                    total_pages: 0
                };
            } else {
                var _this5 = this;
                if (Lampa.Storage.get('online_web_balanser') === '') {
                    Lampa.Storage.set('online_web_balanser', catalogs[0].title);
                };
                var balanser = Lampa.Storage.get('online_web_balanser');

                // if (typeof catalogs === 'undefined') {
                //     Lampa.Noty.show('请从导航- 网站 重新进入。');
                //     _this5.empty('请从导航重新进入。')
                // }

                var catalogs1 = catalogs.filter(function (fp) {
                    return fp.title === balanser
                });

                if (catalogs1.length === 0) {
                    catalogs1[0] = catalogs[0];
                    Lampa.Storage.set('online_web_balanser', catalogs[0].title);
                };

                //console.log(catalogs1[0].list);
                // console.log(catalogs1[0].list.link);
                // console.log(catalogs1[0].list.thumb);
                // console.log(catalogs1[0].list.title);
                //console.log(catalogs1[0].list.videoscontainer.selector);
                //console.log(catalogs1[0].list.page);


                var v = catalogs1[0].list.videoscontainer.selector;
                // var t = catalogs1[0].list.title.selector ? catalogs1[0].list.title.selector : v;
                // var th = catalogs1[0].list.thumb.selector ? catalogs1[0].list.thumb.selector : v;
                // var l = catalogs1[0].list.link.selector ? catalogs1[0].list.link.selector : v;
                var t = catalogs1[0].list.title.selector;
                var th = catalogs1[0].list.thumb.selector;
                var l = catalogs1[0].list.link.selector;
                var p = catalogs1[0].list.page.selector;
                //console.log(t,th,l);


                //not(div.stui-pannel__bd > ul:nth-child(1) > li > div)
                //:lt(12) 小于
                //:gt(12) 大于
                str = str.replace(/\n/g, '');
                var h = $(v + object.quantity, str);
                //console.log(h)
                total_pages = $(p, str).find('a').last().attr('href') ? $(p, str).find('a').length : $(p, str).length;
                //console.log('总分页',total_pages)


                var position = object.url.indexOf('http');
                var count = 0;
                while (position !== -1) {
                    count++;
                    position = object.url.indexOf('http', position + 1);
                };

                var host, host_img;
                if (count == 0) {
                    host = '';
                } else {
                    if (count == 1) {
                        host = object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0];
                        host_img = host;
                    } else {
                        var last_host = object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/g)[count - 1];
                        host_img = last_host;
                        host = object.url.substring(0, object.url.indexOf(last_host)) + last_host;
                    }
                };
                //var host = count == 0 ? '' : (count == 1 ? object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0] : object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/g)[0] + '/' +object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/g)[count-1]);
                //console.log($(p, str).find('a').last().attr('href'))
                // :last-child
                //page = $(p, str).find('a').last().attr('href').indexOf('http') == -1 ? host+$(p, str).find('a').last().attr('href') : $(p, str).find('a').last().attr('href');
                page = $(p, str).find('a').last().attr('href') ? $(p, str).find('a').last().attr('href') : $(p, str).attr('href');

                //console.log(object.search)
                if (page) {
                    if (page.indexOf('http') == -1) {
                        page = host + (page.startsWith('/') ? page : '/'+ page);
                    };
                    if (page.indexOf('#') !== -1) {
                        page = object.url;
                    };
                } else {
                    page = object.url;
                    //console.log(/[0-9]+(?=[^0-9]*$)(.*)/i.test(page))
                    if (/[0-9]+(?=[^0-9]*$)(.*)/i.test(page) && object.url !== object.url.match(/(http|https):\/\/(www.)?(\w+(\.)?)+/)[0]) {
                        total_pages = 1;
                    };
                };

                // console.log(page,total_pages)
                $(h).each(function (i, html) {

                    //console.log($(html).attr('href'))
                    //var t1 = t ? $(t, html) : $(html);
                    var t1 = t ? $(html).find(t) : $(html);
                    //var u1 = l ? $(l, html) : $(html);
                    var u1 = l ? $(html).find(l) : $(html);
                    //var i1 = th ? $(th, html) : $(html);
                    var i1 = th ? $(html).find(th) : $(html);
                    //$(html.attr('href'))
                    var tt; //= catalogs1[0].list.title.attrName == 'text' ? t1.text().replace(/( 第.+?季)/, '') : t1.attr(catalogs1[0].list.title.attrName).replace(/( 第.+?季)/, '');
                    switch (catalogs1[0].list.title.attrName) {
                        case 'text':
                            tt = t1.text();
                            break;
                        case 'html':
                            tt = t1.html();
                            break;
                        default:
                            tt = t1.attr(catalogs1[0].list.title.attrName);
                    };
                    if (typeof tt === 'undefined') return;
                    tt = catalogs1[0].list.title.filter !== '' ? (tt.match(new RegExp(catalogs1[0].list.title.filter)) ? tt.match(new RegExp(catalogs1[0].list.title.filter))[1] : tt) : tt;
                    //正则表达式来获取第一个空格前的字符
                    //tt = tt.match(/^[^ ]+(?=.*\s)|^[^ ]+/) ? tt.match(/^[^ ]+(?=.*\s)|^[^ ]+/)[0] : tt;
                    //console.log(tt)
                    //var tt1 = catalogs1[0].list.title.attrName == 'text' ? t1.text() : t1.attr(catalogs1[0].list.title.attrName);
                    //tt = catalogs1[0].list.title.filter !== '' ? (tt1.match(new RegExp(catalogs1[0].list.title.filter)) ? tt1.match(new RegExp(catalogs1[0].list.title.filter))[1] : tt1) : tt1;

                    // var oo = catalogs1[0].list.title.attrName =='text' ? t1.text() : t1.attr(catalogs1[0].list.title.attrName);
                    var uu; // = catalogs1[0].list.link.attrName == 'text' ? (u1.text().indexOf('http') == -1 ? host + u1.text() : u1.text()) : (u1.attr(catalogs1[0].list.link.attrName).indexOf('http') == -1 ? host + u1.attr(catalogs1[0].list.link.attrName) : u1.attr(catalogs1[0].list.link.attrName));
                    //uu = catalogs1[0].list.link.attrName == 'text' ? host + u1.text() : host + u1.attr(catalogs1[0].list.link.attrName);
                    switch (catalogs1[0].list.link.attrName) {
                        case 'text':
                            uu = u1.text().indexOf('http') == -1 ? host + u1.text() : u1.text();
                            break;
                        case 'html':
                            uu = u1.html();
                            break;
                        default:
                            uu = u1.attr(catalogs1[0].list.link.attrName).indexOf('http') == -1 ? host + (u1.attr(catalogs1[0].list.link.attrName).startsWith('/') ? u1.attr(catalogs1[0].list.link.attrName) : '/' + u1.attr(catalogs1[0].list.link.attrName)) : u1.attr(catalogs1[0].list.link.attrName);
                    };
                    uu = catalogs1[0].list.link.filter !== '' ? (uu.match(new RegExp(catalogs1[0].list.link.filter)) ? uu.match(new RegExp(catalogs1[0].list.link.filter))[1] : uu) : uu;
                    //console.log(uu)
                    var ii; // = catalogs1[0].list.thumb.attrName == 'text' ? (i1.text().indexOf('http') == -1 ? host + i1.text() : i1.text()) : (i1.attr(catalogs1[0].list.thumb.attrName).indexOf('http') == -1 ? host + i1.attr(catalogs1[0].list.thumb.attrName) : i1.attr(catalogs1[0].list.thumb.attrName));
                    switch (catalogs1[0].list.thumb.attrName) {
                        case 'text':
                            ii = i1.text().indexOf('http') == -1 ? host_img + i1.text() : i1.text();
                            break;
                        case 'html':
                            ii = i1.html();
                            break;
                        default:
                            ii = i1.attr(catalogs1[0].list.thumb.attrName) ? (i1.attr(catalogs1[0].list.thumb.attrName).indexOf('http') == -1 ? host_img + (i1.attr(catalogs1[0].list.thumb.attrName).startsWith('/') ? i1.attr(catalogs1[0].list.thumb.attrName) : '/' + i1.attr(catalogs1[0].list.thumb.attrName)) : i1.attr(catalogs1[0].list.thumb.attrName)) : '';
                    };


                    ii = catalogs1[0].list.thumb.filter !== '' ? (ii.match(new RegExp(catalogs1[0].list.thumb.filter)) ? ii.match(new RegExp(catalogs1[0].list.thumb.filter))[1] : './img/img_broken.svg') : ii;
                    //console.log(ii)
                    if (ii !== undefined && ii.startsWith('/')) ii = catalogs1[0].link + ii;

                    if (Lampa.Storage.field('douban_img_proxy')) {
                        //console.log(ii.indexOf('://'))
                        //豆瓣图片域名
                        if (/playwoool\.com|doubanio\.com|img\.yts\.mx/.test(ii) && /^([^:]+):\/\/([^:\/]+)(:\d*)?(\/.*)?$/.test(ii)) {//ii.indexOf('://') == 5
                            ii = 'https://images.weserv.nl/?url=' + ii.replace('https://', '')
                        } else if (ii.indexOf('pic.imgdb.cn') !== -1) {
                            //console.log(ii.indexOf('www.dydhhy.com'))
                            //http://www.dydhhy.com/wp-content/themes/bokeX/thumb.php?src=https://pic.imgdb.cn/item/63dcde3c98e1d752347d0e72.jpg&w=270&h=405
                            ii = 'http://www.dydhhy.com/wp-content/themes/bokeX/thumb.php?src=' + ii + '&w=270&h=405'
                        };
                    };

                    card.push({
                        //title: catalogs1[0].list.title.attrName =='text' ? t1.text().replace(/( 第.+?季)/,'') : t1.attr(catalogs1[0].list.title.attrName).replace(/( 第.+?季)/,''),
                        title: tt.replace(/(<([^>]+)>)/ig, '').replace(/4K|资源标题：|资源名称：|名称：/, '').replace(/第(.+)季/, '').trim(),
                        original_title: '',
                        title_org: tt.replace(/(<([^>]+)>)/ig, '').replace(/4K|资源标题：|资源名称：|名称：/, ''),
                        //catalogs1[0].list.title.attrName =='text' ? t1.text() : t1.attr(catalogs1[0].list.title.attrName),
                        //url: catalogs1[0].list.link.attrName =='text' ? host+u1.text() : host+u1.attr(catalogs1[0].list.link.attrName),
                        url: uu,
                        //img: catalogs1[0].list.thumb.attrName =='text' ? (i1.text().indexOf('http') == -1 ? host+i1.text() : i1.text()) : (i1.attr(catalogs1[0].list.thumb.attrName).indexOf('http') == -1 ? host+i1.attr(catalogs1[0].list.thumb.attrName) : i1.attr(catalogs1[0].list.thumb.attrName)),
                        img: ii,
                        quantity: ' ',
                        year: '',
                        update: $('span.pic-text', html).text().indexOf('/' != -1) ? $('span.pic-text', html).text().split('/')[0].replace('已完结', '') : $('span.pic-text', html).text().replace('已完结', ''),
                        score: $('span.pic-tag', html).text()
                    });
                });

                return {
                    card: catalogs1[0].datasort == 'reverse' ? card.reverse() : card,
                    page: page,
                    total_pages: total_pages
                };
            }
        };
        this.finds = function (find) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var finded;
            //console.log(params)
            var filtred = function filtred(items) {
                //console.log(items)
                //   for (var i = 0; i < items.length; i++) {
                //     var item = items[i];

                //     if (params.sub_title == item.original_title || params.title == item.name || params.original_title == item.name) {
                //       finded = item;
                //       break;
                //     }
                //   }
                finded = items.filter(function (fp) {
                    //return (fp.original_name === params.sub_title || fp.title === params.title  || fp.name === params.title || params.title.indexOf(fp.title) !==-1)
                    return ((fp.original_title || fp.original_name) == params.sub_title || (fp.title || fp.name) == params.title || params.title.indexOf((fp.title || fp.name)) !== -1)
                    //return (((fp.original_title || fp.original_name) === params.sub_title || (fp.title || fp.name) === params.title)&& parseInt(params.year) == (fp.first_air_date || fp.release_date).split('-').shift() )
                });
            };

            if (params.title_org) {
                if (find.movie && find.movie.results.length) filtred(find.movie.results);
                if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
            } else {
                if (params.episode) {
                    if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
                } else {

                    if (find.movie && find.movie.results.length) filtred(find.movie.results);
                };
            }
            doubanitem = [];
            return finded ? finded[0] : finded;
        };
        this.finds1 = function (element, find) {
            var finded;
            var filtred = function filtred(items) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if ((element.title_org == (item.original_title || item.original_name) || element.title == (item.title || item.name)) && parseInt(element.year) == (item.first_air_date || item.release_date).split('-').shift()) {
                        finded = item;
                        break;
                    }
                }
            };
            if (find.movie && find.movie.results.length) filtred(find.movie.results);
            if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
            return finded;
        };
        this.find_douban = function (url, id) {
            network.clear();
            network.timeout(10000);
            network.silent(url, function (json) {
                parse_douban(json, id);
            }, function (a, c) {
                this.empty(network.errorDecode(a, c));
            }, false, {
                dataType: 'text'
            });
        };
        function parse_douban(json, id) {
            // var sortjson = JSON.parse(json).sort(function(a, b){
            //     return b.year - a.year;
            // });
            // console.log(sortjson)
            var queryData = JSON.parse(json).filter(function (fp) {
                return fp.title === id
                //return fp.img.indexOf(id) !==-1
            });
            var json;
            try {
                json = queryData;
            } catch (e) { }

            if (json) {
                doubanitem = json[0];
                // filter();
                // append(filtred());
                //console.log(doubanitem);
            } else
                this.empty('没有找到 (' + select_title + ') 相关影片');
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
                    else //_this.selectGroup();
                    {
                        listNavigation();
                    }
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
            Lampa.Arrays.destroy(items);
            scroll.destroy();
            html.remove();
            body.remove();
            network = null;
            items = null;
            html = null;
            body = null;
            info = null;
        };
    }

    function listNavigation() {
        if (typeof catalogs === 'undefined') {
            Lampa.Noty.show('网站配置无法加载，请检查JSON地址。');
        } else {
            if (Lampa.Storage.get('online_web_balanser') == '') {
                Lampa.Storage.set('online_web_balanser', catalogs[0].title);
            }

            var balanser = Lampa.Storage.get('online_web_balanser');

            var catalogs1 = catalogs.filter(function (fp) {
                return fp.title === balanser
            });

            if (catalogs1.length === 0) {
                catalogs1[0] = catalogs[0];
                Lampa.Storage.set('online_web_balanser', catalogs[0].title);
            };

            Lampa.Select.show({
                title: catalogs1[0].title,
                items: catalogs1[0].category,
                onSelect: function onSelect(a) {
                    Lampa.Activity.push({
                        url: a.url,
                        quantity: a.quantity,
                        title: catalogs1[0].title + ' - ' + a.title,
                        component: 'mod_web',
                        show: catalogs1[0].show,
                        next: catalogs1[0].next,
                        search: catalogs1[0].search.url,
                        detail: catalogs1[0].detail,
                        use_referer: catalogs1[0].use_referer,
                        page: 1
                    });
                },
                onBack: function onBack() {
                    Lampa.Controller.toggle('menu');
                }
            });
        }
    };

    function startWEB() {
        window.plugin_web_ready = true;
        Lampa.Component.add('mod_web', collection);
        //   Lampa.Listener.follow('app', function (e) {
        //     if (e.type == 'ready') {
        //       var ico = '<svg width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17H18C18.5523 17 19 16.5523 19 16V8C19 7.44772 18.5523 7 18 7H14ZM17 9H15V15H17V9Z\" fill=\"white\"/> <path d=\"M6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H6Z\" fill=\"white\"/> <path d=\"M6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6Z\" fill=\"white\"/> <path d=\"M5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16Z\" fill=\"white\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z\" fill=\"white\"/> </svg>';
        //       var menu_item = $('<li class="menu__item selector focus" data-action="doweb"><div class="menu__ico">' + ico + '</div><div class="menu__text">网站</div></li>');
        //       menu_item.on('hover:enter', function () {
        //         listNavigation();
        //       });
        //       //$('.menu .menu__list').eq(0).append(menu_item);
        //       $('.menu .menu__list .menu__item.selector').eq(0).after(menu_item);
        //     }
        //   });
    }

    if (!window.plugin_web_ready) startWEB();
    Lampa.Params.trigger('json_use', false);
    Lampa.Params.trigger('douban_img_proxy', false);
    Lampa.Params.select('web_rule_json', '', '');
    Lampa.Template.add('settings_mod_web', "<div>\n <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"json_use\">\n        <div class=\"settings-param__name\">使用外部网站配置</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">默认使用内置的网站配置</div>\n    </div>\n\n  <div class=\"settings-param selector\" data-name=\"web_rule_json\" data-type=\"input\" placeholder=\"例如：http://www.xx.com/x.json\">\n        <div class=\"settings-param__name\">配置地址</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__status\"></div><div class=\"settings-param__descr\">JSON文件地址</div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"mod_web_clear_data\" data-static=\"true\">\n        <div class=\"settings-param__name\">清除已选网站</div>\n        <div class=\"settings-param__status\"></div>\n<div class=\"settings-param__descr\">当已选网站不能访问时使用，以免出错</div>    </div><div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"douban_img_proxy\"><div class=\"settings-param__name\">豆瓣海报图片代理</div><div class=\"settings-param__value\"></div><div class=\"settings-param__descr\">豆瓣海报不能正常显示时使用，当然显示会慢些</div></div>\n</div>");

    function addSettingsWeb() {
        if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="mod_web"]').length) {
            let field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"mod_web\">\n            <div class=\"settings-folder__icon\">\n                <svg width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17H18C18.5523 17 19 16.5523 19 16V8C19 7.44772 18.5523 7 18 7H14ZM17 9H15V15H17V9Z\" fill=\"white\"/> <path d=\"M6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H6Z\" fill=\"white\"/> <path d=\"M6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6Z\" fill=\"white\"/> <path d=\"M5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16Z\" fill=\"white\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z\" fill=\"white\"/> </svg>\n            </div>\n            <div class=\"settings-folder__name\">网站</div>\n        </div>"));
            Lampa.Settings.main().render().find('[data-component="more"]').after(field)
            Lampa.Settings.main().update()
        };
        var ico = '<svg width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17H18C18.5523 17 19 16.5523 19 16V8C19 7.44772 18.5523 7 18 7H14ZM17 9H15V15H17V9Z\" fill=\"white\"/> <path d=\"M6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H6Z\" fill=\"white\"/> <path d=\"M6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6Z\" fill=\"white\"/> <path d=\"M5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16Z\" fill=\"white\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z\" fill=\"white\"/> </svg>';
        var menu_item = $('<li class="menu__item selector focus" data-action="doweb"><div class="menu__ico">' + ico + '</div><div class="menu__text">网站</div></li>');
        menu_item.on('hover:enter', function () {
            listNavigation();
        });
        $('.menu .menu__list').eq(0).append(menu_item);
        //$('.menu .menu__list .menu__item.selector').eq(0).after(menu_item);
    }

    if (window.appready) addSettingsWeb()
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') addSettingsWeb()
        })
    }

    // Lampa.Listener.follow('app', function (e) {
    //   if (e.type == 'ready' && Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="mod_web"]').length) {
    //     var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"mod_web\">\n            <div class=\"settings-folder__icon\">\n                <svg width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17H18C18.5523 17 19 16.5523 19 16V8C19 7.44772 18.5523 7 18 7H14ZM17 9H15V15H17V9Z\" fill=\"white\"/> <path d=\"M6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H6Z\" fill=\"white\"/> <path d=\"M6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6Z\" fill=\"white\"/> <path d=\"M5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16Z\" fill=\"white\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z\" fill=\"white\"/> </svg>\n            </div>\n            <div class=\"settings-folder__name\">网站</div>\n        </div>"));
    //     Lampa.Settings.main().render().find('[data-component="more"]').after(field);
    //     Lampa.Settings.main().update();
    //   }
    // });

    Lampa.Storage.listener.follow('change', function (e) {
        if (e.name == 'web_rule_json') check(e.name);
        if (e.name == 'json_use' && Lampa.Storage.field('web_rule_json').indexOf('http') !== -1) {
            if (Lampa.Storage.field('json_use')) {
                check('web_rule_json');
            } else {
                catalogs = inner_catalogs;
            };
        }
    });

    Lampa.Settings.listener.follow('open', function (e) {
        if (e.name == 'mod_web') {
            var item = e.body.find('[data-name="mod_web_clear_data"]');
            item.unbind('hover:enter').on('hover:enter', function () {
                Lampa.Storage.set('online_web_balanser', '');
                $('.settings-param__status', item).removeClass('active error wait').addClass('active');
            });
        }
    });

    function check(name) {
        var item = $('[data-name="' + name + '"]').find('.settings-param__status').removeClass('active error wait').addClass('wait');
        var url = Lampa.Storage.get(name);

        if (url) {
            var torrent_net = new Lampa.Reguest();
            torrent_net.timeout(10000);
            torrent_net.silent(Lampa.Utils.checkHttp(Lampa.Storage.get(name)) + '?v=' + Math.random(), function (json) {
                if (Lampa.Storage.field('json_use')) catalogs = json;
                item.removeClass('active error wait').addClass('active');
            }, function (a, c) {
                catalogs = '';
                Lampa.Noty.show(torrent_net.errorDecode(a, c) + ' - ' + url);
                item.removeClass('active error wait').addClass('error');
            }, false, {
                dataType: 'json'
            });
        }
    }
})();
