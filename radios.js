! function() {
    "use strict";
    var t, e, a, n, o = !1,
        i = !1;

    function r() {
        this.create = function() {
            var r = this;
            t = new Lampa.Template.get("radio_player"), n = t.find(".info__icon"), a = t.find(".audio__player"), n.on("hover:enter", (function() {
                o = r.playpause(), n.toggleClass("active", !o)
            })), Lampa.Controller.add("radio", {
                toggle: function() {
                    i ? (Lampa.Controller.collectionSet(t), Lampa.Controller.collectionFocus(e, t)) : Lampa.Controller.toggle("head")
                },
                left: function() {
                    Lampa.Controller.toggle("menu")
                },
                down: function() {
                    Lampa.Controller.toggle("content")
                },
                up: function() {
                    Lampa.Controller.toggle("head")
                },
                back: function() {
                    Lampa.Activity.backward()
                }
            }), Lampa.Listener.follow("start_play", (function() {
                n.hasClass("hide") && (n.toggleClass("hide", !1), t.find(".selector").data("controller", "radio").on("hover:focus", (function(t) {
                    e = t.target
                })))
            })), i = !0
        }, this.play = function(t) {
            t.title && $(".radio__title").text(t.title), t.url && (a.attr("src", t.url), a[0].play(), o = !0, Lampa.Listener.send("start_play"), n.toggleClass("active", !1))
        }, this.stop = function() {
            a && o && a[0].pause()
        }, this.pause = function() {
            a && o && a[0].pause()
        }, this.playpause = function() {
            return a && o ? (a[0].pause(), !o) : a && !o ? (a[0].play(), !o) : void 0
        }, this.destroy = function() {
            //t.remove(),
             t = null;
        }, this.render = function() {
            return t
        }
    }

    function l(t) {
        var e, a, n = new Lampa.Reguest,
            o = new Lampa.Scroll({
                mask: !0,
                over: !0,
                step: 250
            }),
            i = new r,
            l = [],
            s = [],
            c = $("<div></div>"),
            d = $('<div class="category-full"></div>');
            var url = t.url; 
        this.create = function() {
            var t = this;
            return this.activity.loader(!0), n.silent(url, this.build.bind(this), (function() {
                var e = new Lampa.Empty;
                c.append(e.render()), t.start = e.start, t.activity.loader(!1), t.activity.toggle()
            })), this.render()
        }, this.build = function(t) {
            e = Lampa.Template.get("info"), i.create(), e.find(".info__rate,.info__icon").remove(), e.find(".info__right").append(i.render()), o.render().addClass("layer--wheight").data("mheight", e), c.append(e), c.append(o.render()), this.append(t), o.append(d), this.activity.loader(!1), this.activity.toggle()
        }, this.append = function(t) {
            (s = t.sort((function(t, e) {
                return t.sort - e.sort
            }))).forEach((function(t) {
                var n = new Lampa.Template.get("card", {
                    title: t.name,
                    release_year: ""
                });
                n.addClass("card--collection"), n.find(".card__age").remove(), n.find(".card__img").attr("src", t.picture), t.new && (n.append('<div class="card__type"></div>'), n.find(".card__type").text("NEW!"), n.addClass("card--tv")), n.on("hover:focus", (function(i) {
                    a = i.currentTarget, o.update(n, !0), e.find(".info__title").text(t.name), e.find(".info__title-original").text(t.name)//, e.find(".info__create").text(t.name)
                })).on("hover:enter", (function() {
                    var e = {
                        title: t.name,
                        url: t.video
                    };
                    i.play(e)
                })), d.append(n), s.push(t), l.push(n)
            }))
        }, this.start = function() {
            Lampa.Controller.add("content", {
                toggle: function() {
                    Lampa.Controller.collectionSet(o.render()), Lampa.Controller.collectionFocus(a || !1, o.render())
                },
                left: function() {
                    Navigator.canmove("left") ? Navigator.move("left") : Lampa.Controller.toggle("menu")
                },
                right: function() {
                    Navigator.move("right")
                },
                up: function() {
                    Navigator.canmove("up") ? Navigator.move("up") : Lampa.Controller.toggle("radio")
                },
                down: function() {
                    Navigator.canmove("down") && Navigator.move("down")
                },
                back: function() {
                    Lampa.Activity.backward()
                }
            }), Lampa.Controller.toggle("content")
        }, this.pause = function() {
            i.pause()
        }, this.stop = function() {
            i.stop()
        }, this.render = function() {
            return c
        }, this.destroy = function() {
            n.clear(), Lampa.Arrays.destroy(l), o.destroy(), e && e.remove(), c.remove(), d.remove(), i.destroy(), n = null, l = null, c = null, d = null, e = null
        }
    }
    window.plugin_rr_ready || (window.plugin_rr_ready = !0, Lampa.Component.add("radio_record", l), Lampa.Template.add("radio_player", '<div class="radio__player">\n    <div class="radio__player radio__title" style="margin-bottom: 10px"></div>\n    <div class="radio__player info__icon selector hide" style="margin: 0 auto"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"\nwidth="64" height="64"\nviewBox="0 0 172 172"\nstyle=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M169.34609,86c0,-46.02344 -37.32266,-83.34609 -83.34609,-83.34609c-46.02344,0 -83.34609,37.32266 -83.34609,83.34609c0,46.02344 37.32266,83.34609 83.34609,83.34609c46.02344,0 83.34609,-37.32266 83.34609,-83.34609z" fill="#34495e"></path><path d="M77.60156,43.33594h-20.15625c-1.84766,0 -3.35937,1.51172 -3.35937,3.35938v78.60938c0,1.84766 1.51172,3.35938 3.35938,3.35938h20.15625c1.84766,0 3.35938,-1.51172 3.35938,-3.35937v-78.60937c0,-1.84766 -1.51172,-3.35937 -3.35937,-3.35937zM114.55469,43.33594h-20.15625c-1.84766,0 -3.35937,1.51172 -3.35937,3.35938v78.60938c0,1.84766 1.51172,3.35938 3.35938,3.35938h20.15625c1.84766,0 3.35938,-1.51172 3.35938,-3.35937v-78.60937c0,-1.84766 -1.51172,-3.35937 -3.35937,-3.35937z" fill="#ffffff"></path></g></g></svg></div>\n    <div class="radio__player player__container"><audio class="audio__player" style="display: none" preload="none"></audio></div>\n    </div>'), Lampa.Template.add("menu_rr", '<li class="menu__item selector" data-action="radio_record"><div class="menu__ico">\n    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 200 200" style="fill: #ffffff"><path class="cls-1" d="M185.91,73.06a1,1,0,0,0-1.26-.53c-8.77,3.25-16.21,6.33-23.4,9.31A456.58,456.58,0,0,1,114.56,98.9L107,92a1,1,0,0,0-.67-.26l-12.87,0h0a1,1,0,0,0-.67.26l-7.83,7A448.51,448.51,0,0,1,38.72,81.94c-7.17-3-14.59-6.1-23.37-9.38a1,1,0,0,0-1.26.53,1,1,0,0,0,.44,1.29C42,89,72,106.73,86.46,127.11a1,1,0,0,0,.81.42h25.45a1,1,0,0,0,.81-.42c17.39-24.22,45.88-39.12,66.68-50l5.26-2.75A1,1,0,0,0,185.91,73.06Zm-82.42,39.3c-1.24,1.61-2.61,2.52-3.81,2.56h-.16c-1.14,0-2.39-.85-3.54-2.34a12.15,12.15,0,0,1-2.5-6.13v-.12c0-.12,0-.24,0-.36,0-2.75,2.85-5.07,6.25-5.07h.07a6.94,6.94,0,0,1,4.42,1.55,4.78,4.78,0,0,1,1.76,3.64A11.73,11.73,0,0,1,103.49,112.36Z"/></svg>       \n    </div><div class="menu__text">电台</div></li>'), Lampa.Listener.follow("app", (function(t) {
        if ("ready" == t.type) {
            var e = Lampa.Template.get("menu_rr");
            var catalogs = [{
                title: '新加坡电台',
                url: 'https://rentry.co/sgradio/raw'
              }];
            e.on("hover:enter", (function() {
                Lampa.Select.show({
                    title: '电台',
                    items: catalogs,
                    onSelect: function onSelect(a) {
                      Lampa.Activity.push({
                        url: a.url,
                        title: a.title,
                        component: 'radio_record',
                        page: 1
                      });
                    },
                    onBack: function onBack() {
                      Lampa.Controller.toggle('menu_rr');
                    }
                  });
            })), $(".menu .menu__list").eq(0).append(e)
        }
    })))
}();