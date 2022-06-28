(function () {
    'use strict';

    function subscribe() {
      this.add = function (type, listener) {
        if (this._listeners === undefined) this._listeners = {};
        var listeners = this._listeners;

        if (listeners[type] === undefined) {
          listeners[type] = [];
        }

        if (listeners[type].indexOf(listener) === -1) {
          listeners[type].push(listener);
        }
      };

      this.follow = function (type, listener) {
        var _this = this;

        type.split(',').forEach(function (name) {
          _this.add(name, listener);
        });
      };

      this.has = function (type, listener) {
        if (this._listeners === undefined) return false;
        var listeners = this._listeners;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
      };

      this.remove = function (type, listener) {
        if (this._listeners === undefined) return;
        var listeners = this._listeners;
        var listenerArray = listeners[type];

        if (listenerArray !== undefined) {
          var index = listenerArray.indexOf(listener);

          if (index !== -1) {
            listenerArray.splice(index, 1);
          }
        }
      };

      this.send = function (type) {
        var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this._listeners === undefined) return;
        var listeners = this._listeners;
        var listenerArray = listeners[type];

        if (listenerArray !== undefined) {
          event.target = this;
          var array = listenerArray.slice(0);

          for (var i = 0, l = array.length; i < l; i++) {
            array[i].call(this, event);
          }
        }
      };

      this.destroy = function () {
        this._listeners = null;
      };
    }

    function start$4() {
      return new subscribe();
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);

        if (enumerableOnly) {
          symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }

        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;

      var _s, _e;

      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function toObject(a) {
      if (Object.prototype.toString.call(a) === '[object Object]') return a;else {
        a = {};
        return a;
      }
    }

    function toArray(a) {
      if (Object.prototype.toString.call(a) === '[object Object]') {
        var b = [];

        for (var i in a) {
          b.push(a[i]);
        }

        return b;
      } else if (typeof a == 'string' || a == null || typeof a == 'number' || typeof a == 'undefined') return [];else return a;
    }

    function decodeJson(string, empty) {
      var json = empty || {};

      if (string) {
        try {
          json = JSON.parse(string);
        } catch (e) {}
      }

      return json;
    }

    function isObject(a) {
      return Object.prototype.toString.call(a) === '[object Object]';
    }

    function isArray(a) {
      return Object.prototype.toString.call(a) === '[object Array]';
    }

    function extend(a, b, replase) {
      for (var i in b) {
        if (_typeof(b[i]) == 'object') {
          if (a[i] == undefined) a[i] = Object.prototype.toString.call(b[i]) == '[object Array]' ? [] : {};
          this.extend(a[i], b[i], replase);
        } else if (a[i] == undefined || replase) a[i] = b[i];
      }
    }

    function empty$1(a, b) {
      for (var i in b) {
        if (!a[i]) a[i] = b[i];
      }
    }

    function getKeys(a, add) {
      var k = add || [];

      for (var i in a) {
        k.push(i);
      }

      return k;
    }

    function getValues(a, add) {
      var k = add || [];

      for (var i in a) {
        k.push(a[i]);
      }

      return k;
    }

    function remove$2(from, need) {
      var inx = from.indexOf(need);
      if (inx >= 0) from.splice(inx, 1);
    }

    function clone(a) {
      return JSON.parse(JSON.stringify(a));
    }

    function insert(where, index, item) {
      where.splice(index, 0, item);
    }

    function destroy$8(arr) {
      var call_function = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'destroy';
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var where = toArray(arr);

      for (var i = where.length - 1; i >= 0; i--) {
        if (where[i] && where[i][call_function]) where[i][call_function](value);
      }
    }

    function groupBy(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }

    function removeNoIncludes(where, items) {
      for (var i = where.length - 1; i >= 0; i--) {
        if (items.indexOf(where[i]) === -1) remove$2(where, where[i]);
      }

      return where;
    }

    function shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    }

    var Arrays = {
      toObject: toObject,
      toArray: toArray,
      decodeJson: decodeJson,
      isObject: isObject,
      isArray: isArray,
      extend: extend,
      getKeys: getKeys,
      getValues: getValues,
      insert: insert,
      clone: clone,
      remove: remove$2,
      destroy: destroy$8,
      empty: empty$1,
      groupBy: groupBy,
      removeNoIncludes: removeNoIncludes,
      shuffle: shuffle
    };

    var html$1i = "<div class=\"head\">\n    <div class=\"head__body\">\n        <div class=\"head__logo-icon\">\n            <img src=\"./img/logo-icon.svg\" />\n        </div>\n\n        <div class=\"head__split\"></div>\n\n        <div class=\"head__logo\">\n            <img src=\"./img/logo.svg\" />\n        </div>\n\n        <div class=\"head__title\">\n            \n        </div>\n        <div class=\"head__actions\">\n            <div class=\"head__action head__settings selector open--search\">\n                <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                    viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                        <path fill=\"currentColor\" d=\"M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474\n                            c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323\n                            c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848\n                            S326.847,409.323,225.474,409.323z\"/>\n                        <path fill=\"currentColor\" d=\"M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328\n                            c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z\"/>\n                </svg>\n            </div>\n\n            <div class=\"head__action head__settings selector open--broadcast\">\n                <svg viewBox=\"0 0 42 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M3.00006 3H39.0001V31H23.9777C23.9925 31.3315 24 31.6649 24 32C24 32.6742 23.9697 33.3413 23.9103 34H42.0001V0H6.10352e-05V10.0897C0.658765 10.0303 1.32584 10 2 10C2.33516 10 2.66856 10.0075 3.00006 10.0223V3Z\" fill=\"currentColor\"/>\n                <path d=\"M18.8836 34C18.9605 33.344 19 32.6766 19 32C19 22.6112 11.3888 15 2 15C1.32339 15 0.65602 15.0395 6.10352e-05 15.1164V18.1418C0.653248 18.0483 1.32098 18 2 18C9.73199 18 16 24.268 16 32C16 32.679 15.9517 33.3468 15.8582 34H18.8836Z\" fill=\"currentColor\"/>\n                <path d=\"M10.777 34C10.923 33.3568 11.0001 32.6874 11.0001 32C11.0001 27.0294 6.97062 23 2.00006 23C1.31267 23 0.643284 23.0771 6.10352e-05 23.223V34H10.777Z\" fill=\"currentColor\"/>\n                </svg>\n            \n            </div>\n\n            <div class=\"head__action selector open--settings\">\n                <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 368 368\" style=\"enable-background:new 0 0 368 368;\" xml:space=\"preserve\">\n                    <path fill=\"currentColor\" d=\"M344,144h-29.952c-2.512-8.2-5.8-16.12-9.792-23.664l21.16-21.16c4.528-4.528,7.024-10.56,7.024-16.984\n                        c0-6.416-2.496-12.448-7.024-16.976l-22.64-22.64c-9.048-9.048-24.888-9.072-33.952,0l-21.16,21.16\n                        c-7.536-3.992-15.464-7.272-23.664-9.792V24c0-13.232-10.768-24-24-24h-32c-13.232,0-24,10.768-24,24v29.952\n                        c-8.2,2.52-16.12,5.8-23.664,9.792l-21.168-21.16c-9.36-9.36-24.592-9.36-33.952,0l-22.648,22.64\n                        c-9.352,9.36-9.352,24.592,0,33.952l21.16,21.168c-3.992,7.536-7.272,15.464-9.792,23.664H24c-13.232,0-24,10.768-24,24v32\n                        C0,213.232,10.768,224,24,224h29.952c2.52,8.2,5.8,16.12,9.792,23.664l-21.16,21.168c-9.36,9.36-9.36,24.592,0,33.952\n                        l22.64,22.648c9.36,9.352,24.592,9.352,33.952,0l21.168-21.16c7.536,3.992,15.464,7.272,23.664,9.792V344\n                        c0,13.232,10.768,24,24,24h32c13.232,0,24-10.768,24-24v-29.952c8.2-2.52,16.128-5.8,23.664-9.792l21.16,21.168\n                        c9.072,9.064,24.912,9.048,33.952,0l22.64-22.64c4.528-4.528,7.024-10.56,7.024-16.976c0-6.424-2.496-12.448-7.024-16.976\n                        l-21.16-21.168c3.992-7.536,7.272-15.464,9.792-23.664H344c13.232,0,24-10.768,24-24v-32C368,154.768,357.232,144,344,144z\n                            M352,200c0,4.408-3.584,8-8,8h-36c-3.648,0-6.832,2.472-7.744,6c-2.832,10.92-7.144,21.344-12.832,30.976\n                        c-1.848,3.144-1.344,7.144,1.232,9.72l25.44,25.448c1.504,1.504,2.336,3.512,2.336,5.664c0,2.152-0.832,4.16-2.336,5.664\n                        l-22.64,22.64c-3.008,3.008-8.312,3.008-11.328,0l-25.44-25.44c-2.576-2.584-6.576-3.08-9.728-1.232\n                        c-9.616,5.68-20.04,10-30.968,12.824c-3.52,0.904-5.992,4.088-5.992,7.736v36c0,4.408-3.584,8-8,8h-32c-4.408,0-8-3.592-8-8v-36\n                        c0-3.648-2.472-6.832-6-7.744c-10.92-2.824-21.344-7.136-30.976-12.824c-1.264-0.752-2.664-1.112-4.064-1.112\n                        c-2.072,0-4.12,0.8-5.664,2.344l-25.44,25.44c-3.128,3.12-8.2,3.12-11.328,0l-22.64-22.64c-3.128-3.128-3.128-8.208,0-11.328\n                        l25.44-25.44c2.584-2.584,3.088-6.584,1.232-9.72c-5.68-9.632-10-20.048-12.824-30.976c-0.904-3.528-4.088-6-7.736-6H24\n                        c-4.408,0-8-3.592-8-8v-32c0-4.408,3.592-8,8-8h36c3.648,0,6.832-2.472,7.744-6c2.824-10.92,7.136-21.344,12.824-30.976\n                        c1.856-3.144,1.352-7.144-1.232-9.72l-25.44-25.44c-3.12-3.12-3.12-8.2,0-11.328l22.64-22.64c3.128-3.128,8.2-3.12,11.328,0\n                        l25.44,25.44c2.584,2.584,6.576,3.096,9.72,1.232c9.632-5.68,20.048-10,30.976-12.824c3.528-0.912,6-4.096,6-7.744V24\n                        c0-4.408,3.592-8,8-8h32c4.416,0,8,3.592,8,8v36c0,3.648,2.472,6.832,6,7.744c10.928,2.824,21.352,7.144,30.968,12.824\n                        c3.152,1.856,7.152,1.36,9.728-1.232l25.44-25.44c3.016-3.024,8.32-3.016,11.328,0l22.64,22.64\n                        c1.504,1.504,2.336,3.52,2.336,5.664s-0.832,4.16-2.336,5.664l-25.44,25.44c-2.576,2.584-3.088,6.584-1.232,9.72\n                        c5.688,9.632,10,20.048,12.832,30.976c0.904,3.528,4.088,6,7.736,6h36c4.416,0,8,3.592,8,8V200z\"/>\n                    \n                    <path fill=\"currentColor\" d=\"M184,112c-39.696,0-72,32.304-72,72s32.304,72,72,72c39.704,0,72-32.304,72-72S223.704,112,184,112z M184,240 c-30.88,0-56-25.12-56-56s25.12-56,56-56c30.872,0,56,25.12,56,56S214.872,240,184,240z\"/>\n                    \n                </svg>\n            </div>\n\n            <div class=\"head__action selector open--notice notice--icon\">\n                <svg enable-background=\"new 0 0 512 512\" height=\"512\" viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><g><path fill=\"currentColor\" d=\"m411 262.862v-47.862c0-69.822-46.411-129.001-110-148.33v-21.67c0-24.813-20.187-45-45-45s-45 20.187-45 45v21.67c-63.59 19.329-110 78.507-110 148.33v47.862c0 61.332-23.378 119.488-65.827 163.756-4.16 4.338-5.329 10.739-2.971 16.267s7.788 9.115 13.798 9.115h136.509c6.968 34.192 37.272 60 73.491 60 36.22 0 66.522-25.808 73.491-60h136.509c6.01 0 11.439-3.587 13.797-9.115s1.189-11.929-2.97-16.267c-42.449-44.268-65.827-102.425-65.827-163.756zm-170-217.862c0-8.271 6.729-15 15-15s15 6.729 15 15v15.728c-4.937-.476-9.94-.728-15-.728s-10.063.252-15 .728zm15 437c-19.555 0-36.228-12.541-42.42-30h84.84c-6.192 17.459-22.865 30-42.42 30zm-177.67-60c34.161-45.792 52.67-101.208 52.67-159.138v-47.862c0-68.925 56.075-125 125-125s125 56.075 125 125v47.862c0 57.93 18.509 113.346 52.671 159.138z\"/><path fill=\"currentColor\" d=\"m451 215c0 8.284 6.716 15 15 15s15-6.716 15-15c0-60.1-23.404-116.603-65.901-159.1-5.857-5.857-15.355-5.858-21.213 0s-5.858 15.355 0 21.213c36.831 36.831 57.114 85.8 57.114 137.887z\"/><path fill=\"currentColor\" d=\"m46 230c8.284 0 15-6.716 15-15 0-52.086 20.284-101.055 57.114-137.886 5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0-42.497 42.497-65.901 98.999-65.901 159.099 0 8.284 6.716 15 15 15z\"/></g></svg>\n            </div>\n\n            <div class=\"head__action hide selector open--profile\">\n                <svg height=\"158\" viewBox=\"0 0 145 158\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"72.5\" cy=\"39.5\" r=\"32.5\" stroke=\"currentColor\" stroke-width=\"14\"/>\n                <path d=\"M138 157.5C138 121.325 108.675 92 72.5 92C36.3253 92 7 121.325 7 157.5\" stroke=\"currentColor\" stroke-width=\"14\"/>\n                </svg>\n            </div>\n        </div>\n\n        <div class=\"head__split\"></div>\n\n        <div class=\"head__time\">\n            <div class=\"head__time-now time--clock\"></div>\n            <div>\n                <div class=\"head__time-date time--full\"></div>\n                <div class=\"head__time-week time--week\"></div>\n            </div>\n        </div>\n    </div>\n</div>";

    var html$1h = "<div class=\"wrap layer--height layer--width\">\n    <div class=\"wrap__left layer--height\"></div>\n    <div class=\"wrap__content layer--height layer--width\"></div>\n</div>";

    var html$1g = "<div class=\"menu\">\n\n    <div class=\"menu__case\">\n        <ul class=\"menu__list\">\n            <li class=\"menu__item selector\" data-action=\"main\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/home.svg\" /></div>\n                <div class=\"menu__text\">#{menu_main}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"movie\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/movie.svg\" /></div>\n                <div class=\"menu__text\">#{menu_movies}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"tv\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/tv.svg\" /></div>\n                <div class=\"menu__text\">#{menu_tv}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"catalog\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/catalog.svg\" /></div>\n                <div class=\"menu__text\">#{menu_catalog}</div>\n            </li>\n            <li class=\"menu__item selector\" data-action=\"filter\">\n                <div class=\"menu__ico\">\n                    <svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"33\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                        <rect x=\"7\" y=\"8\" width=\"24\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                        <rect x=\"7\" y=\"16\" width=\"24\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                        <rect x=\"7\" y=\"25\" width=\"24\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                        <circle cx=\"13.5\" cy=\"17.5\" r=\"3.5\" fill=\"white\"/>\n                        <circle cx=\"23.5\" cy=\"26.5\" r=\"3.5\" fill=\"white\"/>\n                        <circle cx=\"21.5\" cy=\"9.5\" r=\"3.5\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">#{menu_filter}</div>\n            </li>\n            <li class=\"menu__item selector\" data-action=\"collections\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/catalog.svg\" /></div>\n                <div class=\"menu__text\">#{menu_collections}</div>\n            </li>\n            <li class=\"menu__item selector\" data-action=\"relise\">\n                <div class=\"menu__ico\">\n                    <svg height=\"30\" viewBox=\"0 0 38 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"27\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <path d=\"M18.105 22H15.2936V16H9.8114V22H7V8H9.8114V13.6731H15.2936V8H18.105V22Z\" fill=\"white\"/>\n                    <path d=\"M20.5697 22V8H24.7681C25.9676 8 27.039 8.27885 27.9824 8.83654C28.9321 9.38782 29.6724 10.1763 30.2034 11.2019C30.7345 12.2212 31 13.3814 31 14.6827V15.3269C31 16.6282 30.7376 17.7853 30.2128 18.7981C29.6943 19.8109 28.9602 20.5962 28.0105 21.1538C27.0609 21.7115 25.9895 21.9936 24.7962 22H20.5697ZM23.3811 10.3365V19.6827H24.7399C25.8395 19.6827 26.6798 19.3141 27.2608 18.5769C27.8419 17.8397 28.1386 16.7853 28.1511 15.4135V14.6731C28.1511 13.25 27.8637 12.1731 27.289 11.4423C26.7142 10.7051 25.8739 10.3365 24.7681 10.3365H23.3811Z\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">#{menu_relises}</div>\n            </li>\n            <li class=\"menu__item selector\" data-action=\"anime\">\n                <div class=\"menu__ico\">\n                    <svg height=\"173\" viewBox=\"0 0 180 173\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M126 3C126 18.464 109.435 31 89 31C68.5655 31 52 18.464 52 3C52 2.4505 52.0209 1.90466 52.0622 1.36298C21.3146 15.6761 0 46.8489 0 83C0 132.706 40.2944 173 90 173C139.706 173 180 132.706 180 83C180 46.0344 157.714 14.2739 125.845 0.421326C125.948 1.27051 126 2.13062 126 3ZM88.5 169C125.779 169 156 141.466 156 107.5C156 84.6425 142.314 64.6974 122 54.0966C116.6 51.2787 110.733 55.1047 104.529 59.1496C99.3914 62.4998 94.0231 66 88.5 66C82.9769 66 77.6086 62.4998 72.4707 59.1496C66.2673 55.1047 60.3995 51.2787 55 54.0966C34.6864 64.6974 21 84.6425 21 107.5C21 141.466 51.2208 169 88.5 169Z\" fill=\"white\"/>\n                    <path d=\"M133 121.5C133 143.315 114.196 161 91 161C67.804 161 49 143.315 49 121.5C49 99.6848 67.804 116.5 91 116.5C114.196 116.5 133 99.6848 133 121.5Z\" fill=\"white\"/>\n                    <path d=\"M72 81C72 89.8366 66.1797 97 59 97C51.8203 97 46 89.8366 46 81C46 72.1634 51.8203 65 59 65C66.1797 65 72 72.1634 72 81Z\" fill=\"white\"/>\n                    <path d=\"M131 81C131 89.8366 125.18 97 118 97C110.82 97 105 89.8366 105 81C105 72.1634 110.82 65 118 65C125.18 65 131 72.1634 131 81Z\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">#{menu_anime}</div>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"menu__split\"></div>\n\n    <div class=\"menu__case\">\n        <ul class=\"menu__list\">\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"book\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/bookmark.svg\" /></div>\n                <div class=\"menu__text\">#{menu_bookmark}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"like\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/like.svg\" /></div>\n                <div class=\"menu__text\">#{menu_like}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"wath\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/time.svg\" /></div>\n                <div class=\"menu__text\">#{menu_time}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"history\">\n                <div class=\"menu__ico\">\n                    <svg height=\"34\" viewBox=\"0 0 28 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"1.5\" width=\"25\" height=\"31\" rx=\"2.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <rect x=\"6\" y=\"7\" width=\"9\" height=\"9\" rx=\"1\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"19\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"25\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect x=\"17\" y=\"7\" width=\"5\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">#{menu_history}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"timetable\">\n                <div class=\"menu__ico\">\n                    <svg height=\"28\" viewBox=\"0 0 28 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect x=\"1.5\" y=\"3.5\" width=\"25\" height=\"23\" rx=\"2.5\" stroke=\"white\" stroke-width=\"3\"/>\n                        <rect x=\"6\" width=\"3\" height=\"7\" rx=\"1.5\" fill=\"white\"/>\n                        <rect x=\"19\" width=\"3\" height=\"7\" rx=\"1.5\" fill=\"white\"/>\n                        <circle cx=\"7\" cy=\"12\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"7\" cy=\"19\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"14\" cy=\"12\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"14\" cy=\"19\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"21\" cy=\"12\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"21\" cy=\"19\" r=\"2\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">#{menu_timeline}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"mytorrents\">\n                <div class=\"menu__ico\">\n                    <svg height=\"34\" viewBox=\"0 0 28 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"1.5\" width=\"25\" height=\"31\" rx=\"2.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <rect x=\"6\" y=\"7\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"13\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">#{menu_torrents}</div>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"menu__split\"></div>\n\n    <div class=\"menu__case\">\n        <ul class=\"menu__list\">\n            <li class=\"menu__item selector\" data-action=\"settings\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/settings.svg\" /></div>\n                <div class=\"menu__text\">#{menu_settings}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"about\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/info.svg\" /></div>\n                <div class=\"menu__text\">#{menu_about}</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"console\">\n                <div class=\"menu__ico\">\n                    <svg height=\"30\" viewBox=\"0 0 38 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"27\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <rect x=\"6\" y=\"7\" width=\"25\" height=\"3\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"13\" width=\"13\" height=\"3\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"19\" width=\"19\" height=\"3\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">#{menu_console}</div>\n            </li>\n        </ul>\n    </div>\n</div>";

    var html$1f = "<div class=\"activitys layer--width\">\n    <div class=\"activitys__slides\"></div>\n</div>";

    var html$1e = "<div class=\"activity layer--width\">\n    <div class=\"activity__body\"></div>\n    <div class=\"activity__loader\"></div>\n</div>";

    var html$1d = "<div class=\"scroll\">\n    <div class=\"scroll__content\">\n        <div class=\"scroll__body\">\n            \n        </div>\n    </div>\n</div>";

    var html$1c = "<div class=\"settings\">\n    <div class=\"settings__layer\"></div>\n    <div class=\"settings__content layer--height\">\n        <div class=\"settings__head\">\n            <div class=\"settings__title\">#{title_settings}</div>\n        </div>\n        <div class=\"settings__body\"></div>\n    </div>\n</div>";

    var html$1b = "<div>\n    <div class=\"settings-folder selector\" data-component=\"account\">\n        <div class=\"settings-folder__icon\">\n            <svg height=\"169\" viewBox=\"0 0 172 169\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"85.765\" cy=\"47.5683\" r=\"15.5683\" stroke=\"white\" stroke-width=\"12\"/>\n                <path d=\"M121.53 112C121.53 92.2474 105.518 76.2349 85.7651 76.2349C66.0126 76.2349 50 92.2474 50 112\" stroke=\"white\" stroke-width=\"12\"/>\n                <rect x=\"44\" y=\"125\" width=\"84\" height=\"16\" rx=\"8\" fill=\"white\"/>\n                <rect x=\"6\" y=\"6\" width=\"160\" height=\"157\" rx=\"21\" stroke=\"white\" stroke-width=\"12\"/>\n            </svg>\n        </div>\n        <div class=\"settings-folder__name\">#{settings_main_account}</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"interface\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/panel.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">#{settings_main_interface}</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"player\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/player.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">#{settings_main_player}</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"parser\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/parser.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">#{settings_main_parser}</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"server\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/server.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">#{settings_main_torrserver}</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"plugins\">\n        <div class=\"settings-folder__icon\">\n            <svg height=\"44\" viewBox=\"0 0 44 44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect width=\"21\" height=\"21\" rx=\"2\" fill=\"white\"/>\n            <mask id=\"path-2-inside-1_154:24\" fill=\"white\">\n            <rect x=\"2\" y=\"27\" width=\"17\" height=\"17\" rx=\"2\"/>\n            </mask>\n            <rect x=\"2\" y=\"27\" width=\"17\" height=\"17\" rx=\"2\" stroke=\"white\" stroke-width=\"6\" mask=\"url(#path-2-inside-1_154:24)\"/>\n            <rect x=\"27\" y=\"2\" width=\"17\" height=\"17\" rx=\"2\" fill=\"white\"/>\n            <rect x=\"27\" y=\"34\" width=\"17\" height=\"3\" fill=\"white\"/>\n            <rect x=\"34\" y=\"44\" width=\"17\" height=\"3\" transform=\"rotate(-90 34 44)\" fill=\"white\"/>\n            </svg>\n        </div>\n        <div class=\"settings-folder__name\">#{settings_main_plugins}</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"more\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/more.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">#{settings_main_rest}</div>\n    </div>\n    \n</div>";

    var html$1a = "<div>\n    <div class=\"settings-param selector\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_interface_lang}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"light_version\">\n        <div class=\"settings-param__name\">#{settings_interface_type}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"interface_size\">\n        <div class=\"settings-param__name\">#{settings_interface_size}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>#{settings_interface_background}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"background\">\n        <div class=\"settings-param__name\">#{settings_interface_background_use}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"background_type\">\n        <div class=\"settings-param__name\">#{settings_interface_background_type}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>#{settings_interface_performance}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"animation\">\n        <div class=\"settings-param__name\">#{settings_interface_animation}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_interface_animation_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"mask\">\n        <div class=\"settings-param__name\">#{settings_interface_attenuation}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_interface_attenuation_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"scroll_type\">\n        <div class=\"settings-param__name\">#{settings_interface_scroll}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"card_views_type\">\n        <div class=\"settings-param__name\">#{settings_interface_view_card}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_interface_view_card_descr}</div>\n    </div>\n\n</div>";

    var html$19 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parser_use\">\n        <div class=\"settings-param__name\">#{settings_parser_use}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_parser_use_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parser_torrent_type\">\n        <div class=\"settings-param__name\">#{settings_parser_type}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>Jackett</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"jackett_url\" placeholder=\"#{settings_parser_jackett_placeholder}\">\n        <div class=\"settings-param__name\">#{settings_parser_jackett_link}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_parser_jackett_link_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"jackett_key\" placeholder=\"#{settings_parser_jackett_key_placeholder}\">\n        <div class=\"settings-param__name\">#{settings_parser_jackett_key}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_parser_jackett_key_descr}</div>\n    </div>\n\n    <div class=\"settings-param-title is--torllok\"><span>Torlook</span></div> \n\n    <div class=\"settings-param selector is--torllok\" data-type=\"toggle\" data-name=\"torlook_parse_type\">\n        <div class=\"settings-param__name\">#{settings_parser_torlook_type}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector is--torllok\" data-type=\"input\" data-name=\"parser_website_url\" placeholder=\"#{settings_parser_scraperapi_placeholder}\">\n        <div class=\"settings-param__name\">#{settings_parser_scraperapi_link}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_parser_scraperapi_descr}</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>#{more}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parse_lang\">\n        <div class=\"settings-param__name\">#{settings_parser_search}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_parser_search_descr}</div>\n    </div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parse_in_search\">\n        <div class=\"settings-param__name\">#{settings_parser_in_search}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_parser_in_search_descr}</div>\n    </div>\n</div>";

    var html$18 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_use_link\">\n        <div class=\"settings-param__name\">#{settings_server_link}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>#{settings_server_links}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_url\" placeholder=\"#{settings_server_placeholder}\">\n        <div class=\"settings-param__name\">#{settings_server_link_one}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_server_link_one_descr}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_url_two\" placeholder=\"#{settings_server_placeholder}\">\n        <div class=\"settings-param__name\">#{settings_server_link_two}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_server_link_two_descr}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    \n    <div class=\"settings-param-title\"><span>#{settings_server_additionally}</span></div>\n\n    <div class=\"settings-param selector is--android\" data-type=\"toggle\" data-name=\"internal_torrclient\">\n        <div class=\"settings-param__name\">#{settings_server_client}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_server_client_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_savedb\">\n        <div class=\"settings-param__name\">#{settings_server_base}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_server_base_descr}</div>\n    </div>\n    \n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_preload\">\n        <div class=\"settings-param__name\">#{settings_server_preload}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_server_preload_descr}</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>#{settings_server_auth}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_auth\">\n        <div class=\"settings-param__name\">#{settings_server_password_use}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_login\" placeholder=\"#{settings_server_not_specified}\">\n        <div class=\"settings-param__name\">#{settings_server_login}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_password\" data-string=\"true\" placeholder=\"#{settings_server_not_specified}\">\n        <div class=\"settings-param__name\">#{settings_server_password}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n</div>";

    var html$17 = "<div>\n    <div class=\"settings-param selector is--player\" data-type=\"toggle\" data-name=\"player\">\n        <div class=\"settings-param__name\">#{settings_player_type}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_player_type_descr}</div>\n    </div>\n    \n    <div class=\"settings-param selector is--android\" data-type=\"button\" data-name=\"reset_player\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_player_reset}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_player_reset_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector is--nw\" data-type=\"input\" data-name=\"player_nw_path\" placeholder=\"\">\n        <div class=\"settings-param__name\">#{settings_player_path}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_player_path_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"player_normalization\">\n        <div class=\"settings-param__name\">#{settings_player_normalization}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_player_normalization_descr}</div>\n    </div>\n    \n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"playlist_next\">\n        <div class=\"settings-param__name\">#{settings_player_next_episode}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_player_next_episode_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"player_timecode\">\n        <div class=\"settings-param__name\">#{settings_player_timecode}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_player_timecode_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"player_scale_method\">\n        <div class=\"settings-param__name\">#{settings_player_scale}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_player_scale_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"player_hls_method\">\n        <div class=\"settings-param__name\">#{settings_player_hls_title}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_player_hls_descr}</div>\n    </div>\n    \n    <div class=\"is--has_subs\">\n        <div class=\"settings-param-title\"><span>#{settings_player_subs}</span></div>\n\n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"subtitles_start\">\n            <div class=\"settings-param__name\">#{settings_player_subs_use}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{settings_player_subs_use_descr}</div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"subtitles_size\">\n            <div class=\"settings-param__name\">#{settings_player_subs_size}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{settings_player_subs_size_descr}</div>\n        </div>\n        \n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"subtitles_stroke\">\n            <div class=\"settings-param__name\">#{settings_player_subs_stroke_use}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{settings_player_subs_stroke_use_descr}</div>\n        </div>\n        \n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"subtitles_backdrop\">\n            <div class=\"settings-param__name\">#{settings_player_subs_backdrop_use}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{settings_player_subs_backdrop_use_descr}</div>\n        </div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>#{more}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"video_quality_default\">\n        <div class=\"settings-param__name\">#{settings_player_quality}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_player_quality_descr}</div>\n    </div>\n</div>";

    var html$16 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"start_page\">\n        <div class=\"settings-param__name\">#{settings_rest_start}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_rest_start_descr}</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>#{settings_rest_source}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"source\">\n        <div class=\"settings-param__name\">#{settings_rest_source_use}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_rest_source_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"tmdb_lang\">\n        <div class=\"settings-param__name\">TMDB</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_rest_tmdb_lang}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"proxy_tmdb\">\n        <div class=\"settings-param__name\">#{settings_rest_tmdb_prox}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"poster_size\">\n        <div class=\"settings-param__name\">#{settings_rest_tmdb_posters}</div>\n        <div class=\"settings-param__value\"></div>\n    </div> \n\n    <div class=\"settings-param-title\"><span>#{settings_rest_screensaver}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"screensaver\">\n        <div class=\"settings-param__name\">#{settings_rest_screensaver_use}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"screensaver_type\">\n        <div class=\"settings-param__name\">#{settings_rest_screensaver_type}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>#{settings_rest_helper}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"helper\">\n        <div class=\"settings-param__name\">#{settings_rest_helper_use}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector helper--start-again\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_rest_helper_reset}</div>\n    </div>\n    \n    <div class=\"settings-param-title\"><span>#{more}</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"pages_save_total\">\n        <div class=\"settings-param__name\">#{settings_rest_pages}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_rest_pages_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"select\" data-name=\"time_offset\">\n        <div class=\"settings-param__name\">#{settings_rest_time}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"select\" data-name=\"navigation_type\">\n        <div class=\"settings-param__name\">#{settings_rest_navigation}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"select\" data-name=\"keyboard_type\">\n        <div class=\"settings-param__name\">#{settings_rest_keyboard}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"device_name\" placeholder=\"#{settings_rest_device_placeholder}\">\n        <div class=\"settings-param__name\">#{settings_rest_device}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector clear-storage\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_rest_cache}</div>\n        <div class=\"settings-param__value\">#{settings_rest_cache_descr}</div>\n    </div>\n</div>";

    var html$15 = "<div>\n    <div class=\"settings-param selector\" data-name=\"plugins\" data-static=\"true\" data-notice=\"#{settings_plugins_notice}\">\n        <div class=\"settings-param__name\">#{settings_plugins_add}</div>\n        <div class=\"settings-param__descr\">#{settings_plugins_add_descr}</div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"install\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_plugins_install}</div>\n        <div class=\"settings-param__descr\">#{settings_plugins_install_descr}</div>\n    </div>\n</div>";

    var html$14 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"cloud_use\">\n        <div class=\"settings-param__name\">\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0434\u0430\u0451\u0442 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0430\u0448\u0438 \u0437\u0430\u043A\u043B\u0430\u0434\u043A\u0438, \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432, \u043C\u0435\u0442\u043A\u0438 \u0438 \u0442\u0430\u0439\u043C-\u043A\u043E\u0434\u044B. \u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F \u043F\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044E https://github.com/yumata/lampa/wiki</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"cloud_token\" placeholder=\"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\">\n        <div class=\"settings-param__name\">Token</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0421\u0442\u0430\u0442\u0443\u0441</span></div>\n\n    <div class=\"settings-param selector settings--cloud-status\" data-static=\"true\">\n        <div class=\"settings-param__name\"></div>\n        <div class=\"settings-param__descr\"></div>\n    </div>\n</div>";

    var html$13 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"account_use\">\n        <div class=\"settings-param__name\">#{settings_cub_sync}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{settings_cub_sync_descr}</div>\n    </div>\n\n    <div class=\"settings-param-title settings--account-user hide\"><span>#{settings_cub_account}</span></div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-info hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_cub_logged_in_as}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-profile hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_cub_profile}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-sync hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_cub_sync_btn}</div>\n        <div class=\"settings-param__value\">#{settings_cub_sync_btn_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-backup hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_cub_backup}</div>\n        <div class=\"settings-param__value\">#{settings_cub_backup_descr}</div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-out hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{settings_cub_logout}</div>\n    </div>\n\n    <div class=\"settings-param-title settings--account-signin\"><span>#{settings_cub_signin}</span></div>\n\n    <div class=\"settings-param selector settings--account-signin\" data-type=\"input\" data-name=\"account_email\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">Email</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-signin\" data-type=\"input\" data-string=\"true\" data-name=\"account_password\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{settings_cub_password}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>#{settings_cub_status}</span></div>\n\n    <div class=\"settings-param selector settings--account-status\" data-static=\"true\">\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\"></div>\n    </div>\n</div>";

    var html$12 = "<div class=\"items-line\">\n    <div class=\"items-line__head\">\n        <div class=\"items-line__title\">{title}</div>\n    </div>\n    <div class=\"items-line__body\"></div>\n</div>";

    var html$11 = "<div class=\"card selector\">\n    <div class=\"card__view\">\n        <img src=\"./img/img_load.svg\" class=\"card__img\" />\n\n        <div class=\"card__icons\">\n            <div class=\"card__icons-inner\">\n                \n            </div>\n        </div>\n    </div>\n\n    <div class=\"card__title\">{title}</div>\n    <div class=\"card__age\">{release_year}</div>\n</div>";

    var html$10 = "<div class=\"card-parser selector\">\n    <div class=\"card-parser__title\">{Title}</div>\n\n    <div class=\"card-parser__footer\">\n        <div class=\"card-parser__details\">\n            <div>#{torrent_item_seeds}: <span>{Seeders}</span></div>\n            <div>#{torrent_item_grabs}: <span>{Peers}</span></div>\n        </div>\n        <div class=\"card-parser__size\">{size}</div>\n    </div>\n</div>";

    var html$$ = "<div class=\"card-watched\">\n    <div class=\"card-watched__inner\">\n        <div class=\"card-watched__title\">#{title_watched}</div>\n        <div class=\"card-watched__body\"></div>\n    </div>\n</div>";

    var html$_ = "<div class=\"full-start\">\n\n    <div class=\"full-start__body\">\n        <div class=\"full-start__right\">\n            <div class=\"full-start__poster\">\n                <img class=\"full-start__img\" />\n\n                <div class=\"info__rate\"><span>{r_themovie}</span></div>\n            </div>\n        </div>\n\n        <div class=\"full-start__left\">\n            <div class=\"full-start__tags\">\n                <div class=\"full-start__tag tag--genres\">\n                    <img src=\"./img/icons/pulse.svg\" /> <div>{genres}</div>\n                </div>\n                <div class=\"full-start__tag tag--time\">\n                    <img src=\"./img/icons/time.svg\" /> <div>{time}</div>\n                </div>\n                <div class=\"full-start__tag hide is--serial\">\n                    <img src=\"./img/icons/menu/catalog.svg\" /> <div>{seasons}</div>\n                </div>\n                <div class=\"full-start__tag hide is--serial\">\n                    <img src=\"./img/icons/menu/movie.svg\" /> <div>{episodes}</div>\n                </div>\n                <div class=\"full-start__tag tag--episode hide\">\n                    <img src=\"./img/icons/time.svg\" /> <div></div>\n                </div>\n            </div>\n\n            <div class=\"full-start__title\">{title}</div>\n            <div class=\"full-start__title-original\">{original_title}</div>\n\n            <div class=\"full-start__descr\">{descr}</div>\n        </div>\n    </div>\n\n    <div class=\"full-start__footer\">\n        <div class=\"full-start__title-mobile\">{title}</div>\n\n        <div class=\"full-start__buttons-line\">\n            <div class=\"full-start__buttons-scroll\"></div>\n\n            <div class=\"full-start__buttons\">\n                <div class=\"full-start__button view--torrent hide\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n                        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n                        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n                    </svg>\n\n                    <span>#{full_torrents}</span>\n                </div>\n\n                <div class=\"full-start__button selector view--trailer\">\n                    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                        <path fill=\"currentColor\" d=\"M482.909,67.2H29.091C13.05,67.2,0,80.25,0,96.291v319.418C0,431.75,13.05,444.8,29.091,444.8h453.818\n                            c16.041,0,29.091-13.05,29.091-29.091V96.291C512,80.25,498.95,67.2,482.909,67.2z M477.091,409.891H34.909V102.109h442.182\n                            V409.891z\"/>\n                        <rect fill=\"currentColor\" x=\"126.836\" y=\"84.655\" width=\"34.909\" height=\"342.109\"/>\n                        <rect fill=\"currentColor\" x=\"350.255\" y=\"84.655\" width=\"34.909\" height=\"342.109\"/>\n                        <rect fill=\"currentColor\" x=\"367.709\" y=\"184.145\" width=\"126.836\" height=\"34.909\"/>\n                        <rect fill=\"currentColor\" x=\"17.455\" y=\"184.145\" width=\"126.836\" height=\"34.909\"/>\n                        <rect fill=\"currentColor\" x=\"367.709\" y=\"292.364\" width=\"126.836\" height=\"34.909\"/>\n                        <rect fill=\"currentColor\" x=\"17.455\" y=\"292.364\" width=\"126.836\" height=\"34.909\"/>\n                    </svg>\n\n                    <span>#{full_trailers}</span>\n                </div>\n\n                \n\n                <div class=\"full-start__button selector open--menu\">\n                    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                        <path fill=\"currentColor\" d=\"M436.742,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.755,75.258,75.258,75.258\n                            C478.239,331.258,512,297.503,512,256C512,214.503,478.239,180.742,436.742,180.742z M436.742,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246s38.246,17.155,38.246,38.246\n                            S457.833,294.246,436.742,294.246z\"/>\n                    \n                        <path fill=\"currentColor\" d=\"M256,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.761,75.258,75.258,75.258c41.503,0,75.258-33.755,75.258-75.258\n                            C331.258,214.503,297.503,180.742,256,180.742z M256,294.246c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246\n                            s38.246,17.155,38.246,38.246S277.091,294.246,256,294.246z\"/>\n                    \n                        <path fill=\"currentColor\" d=\"M75.258,180.742C33.761,180.742,0,214.503,0,256c0,41.503,33.761,75.258,75.258,75.258\n                            c41.497,0,75.258-33.755,75.258-75.258C150.516,214.503,116.755,180.742,75.258,180.742z M75.258,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246c21.091,0,38.246,17.155,38.246,38.246\n                            S96.342,294.246,75.258,294.246z\"/>\n                    </svg>\n                </div>\n\n                \n            </div>\n\n            <div class=\"full-start__icons\">\n                <div class=\"info__icon icon--book selector\" data-type=\"book\"></div>\n                <div class=\"info__icon icon--like selector\" data-type=\"like\"></div>\n                <div class=\"info__icon icon--wath selector\" data-type=\"wath\"></div>\n            </div>\n        </div>\n\n    </div>\n</div>";

    var html$Z = "<div class=\"full-descr\">\n    <div class=\"full-descr__left\">\n        <div class=\"full-descr__text\">{text}</div>\n\n        <div class=\"full-descr__line full--genres\">\n            <div class=\"full-descr__line-name\">#{full_genre}</div>\n            <div class=\"full-descr__line-body\">{genres}</div>\n        </div>\n\n        <div class=\"full-descr__line full--companies\">\n            <div class=\"full-descr__line-name\">#{full_production}</div>\n            <div class=\"full-descr__line-body\">{companies}</div>\n        </div>\n    </div>\n\n    <div class=\"full-descr__right\">\n        <div class=\"full-descr__info\">\n            <div class=\"full-descr__info-name\">#{full_date_of_release}</div>\n            <div class=\"full-descr__info-body\">{relise}</div>\n        </div>\n\n        <div class=\"full-descr__info\">\n            <div class=\"full-descr__info-name\">#{full_budget}</div>\n            <div class=\"full-descr__info-body\">{budget}</div>\n        </div>\n\n        <div class=\"full-descr__info\">\n            <div class=\"full-descr__info-name\">#{full_countries}</div>\n            <div class=\"full-descr__info-body\">{countries}</div>\n        </div>\n    </div>\n</div>";

    var html$Y = "<div class=\"full-person selector\">\n    <div style=\"background-image: url('{img}');\" class=\"full-person__photo\"></div>\n\n    <div class=\"full-person__body\">\n        <div class=\"full-person__name\">{name}</div>\n        <div class=\"full-person__role\">{role}</div>\n    </div>\n</div>";

    var html$X = "<div class=\"full-review selector\">\n    <div class=\"full-review__text\">{text}</div>\n\n    <div class=\"full-review__footer\">#{full_like}: {like_count}</div>\n</div>";

    var html$W = "<div class=\"full-episode selector\">\n    <div class=\"full-episode__left\">\n        <div class=\"full-episode__img\">\n            <img />\n        </div>\n    </div>\n\n    <div class=\"full-episode__body\">\n        <div class=\"full-episode__name\">{name}</div>\n        <div class=\"full-episode__date\">{date}</div>\n    </div>\n</div>";

    var html$V = "<div class=\"player\">\n    \n</div>";

    var html$U = "<div class=\"player-panel\">\n\n    <div class=\"player-panel__body\">\n        <div class=\"player-panel__timeline selector\">\n            <div class=\"player-panel__peding\"></div>\n            <div class=\"player-panel__position\"><div></div></div>\n            <div class=\"player-panel__time hide\"></div>\n        </div>\n\n        <div class=\"player-panel__line\">\n            <div class=\"player-panel__timenow\"></div>\n            <div class=\"player-panel__timeend\"></div>\n        </div>\n\n        <div class=\"player-panel__line\">\n            <div class=\"player-panel__left\">\n                <div class=\"player-panel__prev button selector\">\n                    <svg width=\"23\" height=\"24\" viewBox=\"0 0 23 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M2.75 13.7698C1.41666 13 1.41667 11.0755 2.75 10.3057L20 0.34638C21.3333 -0.42342 23 0.538831 23 2.07843L23 21.997C23 23.5366 21.3333 24.4989 20 23.7291L2.75 13.7698Z\" fill=\"currentColor\"/>\n                    <rect x=\"6\" y=\"24\" width=\"6\" height=\"24\" rx=\"2\" transform=\"rotate(180 6 24)\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__next button selector\">\n                    <svg width=\"23\" height=\"24\" viewBox=\"0 0 23 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M20.25 10.2302C21.5833 11 21.5833 12.9245 20.25 13.6943L3 23.6536C1.66666 24.4234 -6.72981e-08 23.4612 0 21.9216L8.70669e-07 2.00298C9.37967e-07 0.463381 1.66667 -0.498867 3 0.270933L20.25 10.2302Z\" fill=\"currentColor\"/>\n                    <rect x=\"17\" width=\"6\" height=\"24\" rx=\"2\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n\n                <div class=\"player-panel__next-episode-name hide\"></div>\n            </div>\n            <div class=\"player-panel__center\">\n                <div class=\"player-panel__tstart button selector\">\n                    <svg width=\"35\" height=\"24\" viewBox=\"0 0 35 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M14.75 10.2302C13.4167 11 13.4167 12.9245 14.75 13.6943L32 23.6536C33.3333 24.4234 35 23.4612 35 21.9216L35 2.00298C35 0.463381 33.3333 -0.498867 32 0.270933L14.75 10.2302Z\" fill=\"currentColor\"/>\n                    <path d=\"M1.75 10.2302C0.416665 11 0.416667 12.9245 1.75 13.6943L19 23.6536C20.3333 24.4234 22 23.4612 22 21.9216L22 2.00298C22 0.463381 20.3333 -0.498867 19 0.270933L1.75 10.2302Z\" fill=\"currentColor\"/>\n                    <rect width=\"6\" height=\"24\" rx=\"2\" transform=\"matrix(-1 0 0 1 6 0)\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__rprev button selector\">\n                    <svg width=\"35\" height=\"25\" viewBox=\"0 0 35 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M14 10.7679C12.6667 11.5377 12.6667 13.4622 14 14.232L31.25 24.1913C32.5833 24.9611 34.25 23.9989 34.25 22.4593L34.25 2.5407C34.25 1.0011 32.5833 0.0388526 31.25 0.808653L14 10.7679Z\" fill=\"currentColor\"/>\n                    <path d=\"M0.999998 10.7679C-0.333335 11.5377 -0.333333 13.4622 1 14.232L18.25 24.1913C19.5833 24.9611 21.25 23.9989 21.25 22.4593L21.25 2.5407C21.25 1.0011 19.5833 0.0388526 18.25 0.808653L0.999998 10.7679Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__playpause button selector\">\n                    <div>\n                        <svg width=\"22\" height=\"25\" viewBox=\"0 0 22 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M21 10.7679C22.3333 11.5377 22.3333 13.4622 21 14.232L3.75 24.1913C2.41666 24.9611 0.75 23.9989 0.75 22.4593L0.750001 2.5407C0.750001 1.0011 2.41667 0.0388526 3.75 0.808653L21 10.7679Z\" fill=\"currentColor\"/>\n                        </svg>\n                    </div>\n                    <div>\n                        <svg width=\"19\" height=\"25\" viewBox=\"0 0 19 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect width=\"6\" height=\"25\" rx=\"2\" fill=\"currentColor\"/>\n                        <rect x=\"13\" width=\"6\" height=\"25\" rx=\"2\" fill=\"currentColor\"/>\n                        </svg>                    \n                    </div>\n                </div>\n                <div class=\"player-panel__rnext button selector\">\n                    <svg width=\"35\" height=\"25\" viewBox=\"0 0 35 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M20.25 10.7679C21.5833 11.5377 21.5833 13.4622 20.25 14.232L3 24.1913C1.66666 24.9611 -6.72981e-08 23.9989 0 22.4593L8.70669e-07 2.5407C9.37967e-07 1.0011 1.66667 0.0388526 3 0.808653L20.25 10.7679Z\" fill=\"currentColor\"/>\n                    <path d=\"M33.25 10.7679C34.5833 11.5377 34.5833 13.4622 33.25 14.232L16 24.1913C14.6667 24.9611 13 23.9989 13 22.4593L13 2.5407C13 1.0011 14.6667 0.0388526 16 0.808653L33.25 10.7679Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__tend button selector\">\n                    <svg width=\"35\" height=\"24\" viewBox=\"0 0 35 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M20.25 10.2302C21.5833 11 21.5833 12.9245 20.25 13.6943L3 23.6536C1.66666 24.4234 -6.72981e-08 23.4612 0 21.9216L8.70669e-07 2.00298C9.37967e-07 0.463381 1.66667 -0.498867 3 0.270933L20.25 10.2302Z\" fill=\"currentColor\"/>\n                    <path d=\"M33.25 10.2302C34.5833 11 34.5833 12.9245 33.25 13.6943L16 23.6536C14.6667 24.4234 13 23.4612 13 21.9216L13 2.00298C13 0.463381 14.6667 -0.498867 16 0.270933L33.25 10.2302Z\" fill=\"currentColor\"/>\n                    <rect x=\"29\" width=\"6\" height=\"24\" rx=\"2\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n            </div>\n            <div class=\"player-panel__right\">\n                <div class=\"player-panel__quality button selector\">auto</div>\n                <div class=\"player-panel__playlist button selector\">\n                    <svg width=\"25\" height=\"25\" viewBox=\"0 0 25 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"5\" width=\"5\" height=\"25\" rx=\"2\" transform=\"rotate(-90 0 5)\" fill=\"currentColor\"/>\n                    <rect y=\"15\" width=\"5\" height=\"25\" rx=\"2\" transform=\"rotate(-90 0 15)\" fill=\"currentColor\"/>\n                    <rect y=\"25\" width=\"5\" height=\"25\" rx=\"2\" transform=\"rotate(-90 0 25)\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__subs button selector hide\">\n                    <svg width=\"23\" height=\"25\" viewBox=\"0 0 23 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M22.4357 20.0861C20.1515 23.0732 16.5508 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C16.5508 0 20.1515 1.9268 22.4357 4.9139L18.8439 7.84254C17.2872 6.09824 15.0219 5 12.5 5C7.80558 5 5 7.80558 5 12.5C5 17.1944 7.80558 20 12.5 20C15.0219 20 17.2872 18.9018 18.8439 17.1575L22.4357 20.0861Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__tracks button selector hide\">\n                    <svg width=\"24\" height=\"31\" viewBox=\"0 0 24 31\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"5\" width=\"14\" height=\"23\" rx=\"7\" fill=\"currentColor\"/>\n                    <path d=\"M3.39272 18.4429C3.08504 17.6737 2.21209 17.2996 1.44291 17.6073C0.673739 17.915 0.299615 18.7879 0.607285 19.5571L3.39272 18.4429ZM23.3927 19.5571C23.7004 18.7879 23.3263 17.915 22.5571 17.6073C21.7879 17.2996 20.915 17.6737 20.6073 18.4429L23.3927 19.5571ZM0.607285 19.5571C2.85606 25.179 7.44515 27.5 12 27.5V24.5C8.55485 24.5 5.14394 22.821 3.39272 18.4429L0.607285 19.5571ZM12 27.5C16.5549 27.5 21.1439 25.179 23.3927 19.5571L20.6073 18.4429C18.8561 22.821 15.4451 24.5 12 24.5V27.5Z\" fill=\"currentColor\"/>\n                    <rect x=\"10\" y=\"25\" width=\"4\" height=\"6\" rx=\"2\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__size button selector\">\n                    <svg width=\"25\" height=\"23\" viewBox=\"0 0 25 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1\" y=\"1\" width=\"23\" height=\"21\" rx=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/>\n                    <path d=\"M19.1055 3.78684C19.7724 3.61219 20.3878 4.22757 20.2132 4.89452L19.2308 8.64611C19.0561 9.31306 18.2225 9.53136 17.7301 9.03906L14.9609 6.26984C14.4686 5.77754 14.6869 4.94386 15.3539 4.76921L19.1055 3.78684Z\" fill=\"currentColor\"/>\n                    <path d=\"M15.5441 6.53738C16.067 6.01448 16.9203 6.02007 17.4501 6.54987C17.9799 7.07966 17.9855 7.93304 17.4626 8.45594L14.9379 10.9807C14.415 11.5036 13.5616 11.498 13.0318 10.9682C12.502 10.4384 12.4964 9.58505 13.0193 9.06215L15.5441 6.53738Z\" fill=\"currentColor\"/>\n                    <path d=\"M5.89453 19.2064C5.22758 19.3811 4.6122 18.7657 4.78684 18.0988L5.76922 14.3472C5.94386 13.6802 6.77755 13.4619 7.26985 13.9542L10.0391 16.7234C10.5314 17.2157 10.3131 18.0494 9.64611 18.2241L5.89453 19.2064Z\" fill=\"currentColor\"/>\n                    <path d=\"M9.45594 16.4559C8.93304 16.9788 8.07966 16.9732 7.54986 16.4434C7.02006 15.9136 7.01447 15.0602 7.53737 14.5373L10.0621 12.0126C10.585 11.4897 11.4384 11.4953 11.9682 12.0251C12.498 12.5549 12.5036 13.4082 11.9807 13.9311L9.45594 16.4559Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__share button selector\">\n                    <svg width=\"25\" height=\"23\" viewBox=\"0 0 25 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M6 0H4C1.79086 0 0 1.79086 0 4V19C0 21.2091 1.79086 23 4 23H21C23.2091 23 25 21.2091 25 19V4C25 1.79086 23.2091 0 21 0H19V2H21C22.1046 2 23 2.89543 23 4V19C23 20.1046 22.1046 21 21 21H4C2.89543 21 2 20.1046 2 19V4C2 2.89543 2.89543 2 4 2H6V0Z\" fill=\"currentColor\"/>\n                    <path d=\"M11.5428 0.590908C11.9682 -0.196971 13.0318 -0.196969 13.4572 0.59091L15.8503 5.02273C16.2757 5.81061 15.7439 6.79545 14.893 6.79545H10.1069C9.25609 6.79545 8.7243 5.81061 9.14973 5.02273L11.5428 0.590908Z\" fill=\"currentColor\"/>\n                    <path d=\"M10.8421 6.5C10.8421 5.52095 11.5843 4.72727 12.5 4.72727C13.4157 4.72727 14.158 5.52095 14.158 6.5V11.2273C14.158 12.2063 13.4157 13 12.5 13C11.5843 13 10.8421 12.2063 10.8421 11.2273V6.5Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__fullscreen button selector\">\n                    <svg width=\"25\" height=\"23\" viewBox=\"0 0 25 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M17 23H21C23.2091 23 25 21.2091 25 19V15H23V19C23 20.1046 22.1046 21 21 21H17V23Z\" fill=\"currentColor\"/>\n                    <path d=\"M17 2H21C22.1046 2 23 2.89543 23 4V8H25V4C25 1.79086 23.2091 0 21 0H17V2Z\" fill=\"currentColor\"/>\n                    <path d=\"M8 0L8 2H4C2.89543 2 2 2.89543 2 4V8H0V4C0 1.79086 1.79086 0 4 0H8Z\" fill=\"currentColor\"/>\n                    <path d=\"M8 21V23H4C1.79086 23 0 21.2091 0 19V15H2V19C2 20.1046 2.89543 21 4 21H8Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";

    var html$T = "<div class=\"player-video\">\n    <div class=\"player-video__display\"></div>\n    <div class=\"player-video__loader\"></div>\n    <div class=\"player-video__paused hide\">\n        <svg width=\"19\" height=\"25\" viewBox=\"0 0 19 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect width=\"6\" height=\"25\" rx=\"2\" fill=\"white\"/>\n            <rect x=\"13\" width=\"6\" height=\"25\" rx=\"2\" fill=\"white\"/>\n        </svg>\n    </div>\n    <div class=\"player-video__subtitles hide\">\n        <div class=\"player-video__subtitles-text\"></div>\n    </div>\n</div>";

    var html$S = "<div class=\"player-info\">\n    <div class=\"player-info__body\">\n        <div class=\"player-info__line\">\n            <div class=\"player-info__name\"></div>\n            <div class=\"player-info__time\"><span class=\"time--clock\"></span></div>\n        </div>\n\n        <div class=\"player-info__values\">\n            <div class=\"value--size\">\n                <span>#{loading}...</span>\n            </div>\n            <div class=\"value--stat\">\n                <span></span>\n            </div>\n            <div class=\"value--speed\">\n                <span></span>\n            </div>\n        </div>\n\n        <div class=\"player-info__error hide\"></div>\n    </div>\n</div>";

    var html$R = "<div class=\"selectbox\">\n    <div class=\"selectbox__layer\"></div>\n    <div class=\"selectbox__content layer--height\">\n        <div class=\"selectbox__head\">\n            <div class=\"selectbox__title\"></div>\n        </div>\n        <div class=\"selectbox__body\"></div>\n    </div>\n</div>";

    var html$Q = "<div class=\"selectbox-item selector\">\n    <div class=\"selectbox-item__title\">{title}</div>\n    <div class=\"selectbox-item__subtitle\">{subtitle}</div>\n</div>";

    var html$P = "<div class=\"info layer--width\">\n    <div class=\"info__rate\"><span></span></div>\n    <div class=\"info__left\">\n        <div class=\"info__title\"></div>\n        <div class=\"info__title-original\"></div>\n    </div>\n    <div class=\"info__right\">\n        <div class=\"info__icon icon--book\"></div>\n        <div class=\"info__icon icon--like\"></div>\n        <div class=\"info__icon icon--wath\"></div>\n    </div>\n</div>";

    var html$O = "<div>\n    <div class=\"simple-button selector filter--search\">\n            <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n            viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n        <g>\n            <path fill=\"currentColor\" d=\"M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474\n                c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323\n                c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848\n                S326.847,409.323,225.474,409.323z\"/>\n        </g>\n        <g>\n            <path fill=\"currentColor\" d=\"M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328\n                c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z\"/>\n        </g>\n\n        </svg>\n\n        <span>#{filter_clarify}</span>\n    </div>\n    <div class=\"simple-button simple-button--filter selector filter--sort\">\n        <span>#{filter_sorted}</span><div class=\"hide\"></div>\n    </div>\n\n    <div class=\"simple-button simple-button--filter selector filter--filter\">\n        <span>#{filter_filtred}</span><div class=\"hide\"></div>\n    </div>\n</div>";

    var html$N = "<div class=\"card-more selector\">\n    <div class=\"card-more__box\">\n        <div class=\"card-more__title\">\n            #{more}\n        </div>\n    </div>\n</div>";

    var html$M = "<div class=\"search\">\n    <div class=\"search__left\">\n        <div class=\"search__title\">#{search}</div>\n        <div class=\"search__input\">#{search_input}...</div>\n        <div class=\"search__keypad\"><div class=\"simple-keyboard\"></div></div>\n        <div class=\"search__history\"></div>\n    </div>\n    <div class=\"search__results\"></div>\n</div>";

    var html$L = "<div class=\"settings-input\">\n    <div class=\"settings-input__content\">\n        <div class=\"settings-input__input\"></div>\n\n        <div class=\"simple-keyboard\"></div>\n\n        <div class=\"settings-input__links\">#{settings_input_links}</div>\n    </div>\n</div>";

    var html$K = "<div class=\"modal\">\n    <div class=\"modal__content\">\n        <div class=\"modal__head\">\n            <div class=\"modal__title\">{title}</div>\n        </div>\n        <div class=\"modal__body\">\n            \n        </div>\n    </div>\n</div>";

    var html$J = "<div class=\"company\">\n    <div class=\"company__name\">{name}</div>\n    <div class=\"company__headquarters\">#{company_headquarters}: {headquarters}</div>\n    <div class=\"company__homepage\">#{company_homepage}: {homepage}</div>\n    <div class=\"company__country\">#{company_country}: {origin_country}</div>\n</div>";

    var html$I = "<div class=\"modal-loading\">\n    \n</div>";

    var html$H = "<div class=\"modal-pending\">\n    <div class=\"modal-pending__loading\"></div>\n    <div class=\"modal-pending__text\">{text}</div>\n</div>";

    var html$G = "<div class=\"person-start\">\n\n    <div class=\"person-start__body\">\n        <div class=\"person-start__right\">\n            <div class=\"person-start__poster\">\n                <img src=\"{img}\" class=\"person-start__img\" />\n            </div>\n        </div>\n\n        <div class=\"person-start__left\">\n            <div class=\"person-start__tags\">\n                <div class=\"person-start__tag\">\n                    <img src=\"./img/icons/pulse.svg\" /> <div>{birthday}</div>\n                </div>\n            </div>\n            \n            <div class=\"person-start__name\">{name}</div>\n            <div class=\"person-start__place\">{place}</div>\n\n            <div class=\"person-start__descr\">{descr}</div>\n\n\n            \n        </div>\n    </div>\n\n    <div class=\"full-start__buttons hide\">\n        <div class=\"full-start__button selector\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M436.742,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.755,75.258,75.258,75.258\n                            C478.239,331.258,512,297.503,512,256C512,214.503,478.239,180.742,436.742,180.742z M436.742,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246s38.246,17.155,38.246,38.246\n                            S457.833,294.246,436.742,294.246z\"/>\n                    </g>\n                </g>\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M256,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.761,75.258,75.258,75.258c41.503,0,75.258-33.755,75.258-75.258\n                            C331.258,214.503,297.503,180.742,256,180.742z M256,294.246c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246\n                            s38.246,17.155,38.246,38.246S277.091,294.246,256,294.246z\"/>\n                    </g>\n                </g>\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M75.258,180.742C33.761,180.742,0,214.503,0,256c0,41.503,33.761,75.258,75.258,75.258\n                            c41.497,0,75.258-33.755,75.258-75.258C150.516,214.503,116.755,180.742,75.258,180.742z M75.258,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246c21.091,0,38.246,17.155,38.246,38.246\n                            S96.342,294.246,75.258,294.246z\"/>\n                    </g>\n                </g>\n            </svg>\n        </div>\n\n        <div class=\"full-start__icons\">\n            <div class=\"info__icon icon--like\"></div>\n        </div>\n    </div>\n</div>";

    var html$F = "<div class=\"empty\">\n    <div class=\"empty__img selector\"></div>\n    <div class=\"empty__title\">{title}</div>\n    <div class=\"empty__descr\">{descr}</div>\n</div>";

    var html$E = "<div class=\"notice selector\">\n    <div class=\"notice__head\">\n        <div class=\"notice__title\">{title}</div>\n        <div class=\"notice__time\">{time}</div>\n    </div>\n    \n    <div class=\"notice__descr\">{descr}</div>\n</div>";

    var html$D = "<div class=\"notice notice--card selector\">\n    <div class=\"notice__left\">\n        <div class=\"notice__img\">\n            <img src=\"{img}\" />\n        </div>\n    </div>\n    <div class=\"notice__body\">\n        <div class=\"notice__head\">\n            <div class=\"notice__title\">{title}</div>\n            <div class=\"notice__time\">{time}</div>\n        </div>\n        \n        <div class=\"notice__descr\">{descr}</div>\n    </div>\n</div>";

    var html$C = "<div class=\"torrent-item selector\">\n    <div class=\"torrent-item__title\">{title}</div>\n    <div class=\"torrent-item__details\">\n        <div class=\"torrent-item__date\">{date}</div>\n        <div class=\"torrent-item__tracker\">{tracker}</div>\n\n        <div class=\"torrent-item__bitrate bitrate\">#{torrent_item_bitrate}: <span>{bitrate} #{torrent_item_mb}</span></div>\n        <div class=\"torrent-item__seeds\">#{torrent_item_seeds}: <span>{seeds}</span></div>\n        <div class=\"torrent-item__grabs\">#{torrent_item_grabs}: <span>{grabs}</span></div>\n        \n        <div class=\"torrent-item__size\">{size}</div>\n    </div>\n</div>";

    var html$B = "<div class=\"torrent-file selector\">\n    <div class=\"torrent-file__title\">{title}</div>\n    <div class=\"torrent-file__size\">{size}</div>\n</div>";

    var html$A = "<div class=\"files\">\n    <div class=\"files__left\">\n        <div class=\"full-start__poster selector\">\n            <img src=\"{img}\" class=\"full-start__img\" />\n        </div>\n\n        <div class=\"files__info\">\n            <div class=\"files__title\">{title}</div>\n            <div class=\"files__title-original\">{original_title}</div>\n        </div>\n    </div>\n    <div class=\"files__body\">\n        \n    </div>\n</div>";

    var html$z = "<div class=\"about\">\n    <div>#{about_text}</div>\n\n\n    <div class=\"about__contacts\">\n        <div>\n            <small>#{about_channel}</small><br>\n            @lampa_channel\n        </div>\n\n        <div>\n            <small>#{about_group}</small><br>\n            @lampa_group\n        </div>\n\n        <div>\n            <small>#{about_version}</small><br>\n            1.4.1\n        </div>\n    </div>\n\n    <div class=\"about__contacts\">\n        <div>\n            <small>#{about_donate}</small><br>\n            www.boosty.to/lampatv\n        </div>\n    </div>\n</div>";

    var html$y = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>";

    var html$x = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>\n\n<div class=\"torrent-error noconnect\">\n    <div>\n        <div>\u041F\u0440\u0438\u0447\u0438\u043D\u044B</div>\n        <ul>\n            <li>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0430\u0434\u0440\u0435\u0441: <code>{ip}</code></li>\n            <li class=\"nocorect\">\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0430\u0434\u0440\u0435\u0441 <code>{ip}</code> \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u043C!</li>\n            <li>\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043E\u0442\u0432\u0435\u0442: <code>{echo}</code></li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E?</div>\n        <ul>\n            <li>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0430\u0434\u0440\u0435\u0441: <code>192.168.0.\u0445\u0445\u0445:8090</code></li>\n            <li>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0432\u0435\u0440\u0441\u0438\u044E Matrix</li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u041A\u0430\u043A \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C?</div>\n        <ul>\n            <li>\u041D\u0430 \u044D\u0442\u043E\u043C \u0436\u0435 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0438 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 <code>{ip}/echo</code></li>\n            <li>\u0415\u0441\u043B\u0438 \u0436\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u0442, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043B\u0438 TorrServe, \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0435\u0433\u043E.</li>\n            <li>\u0415\u0441\u043B\u0438 \u0436\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B, \u0443\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E \u0432 \u043E\u0442\u0432\u0435\u0442\u0435 \u0435\u0441\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0430 <code>MatriX</code></li>\n        </ul>\n    </div>\n</div>";

    var html$w = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>\n\n<div class=\"torrent-error noconnect\">\n    <div>\n        <div>\u041F\u0440\u0438\u0447\u0438\u043D\u044B</div>\n        <ul>\n            <li>\u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u043F\u0438\u043D\u0433 \u0432\u0435\u0440\u043D\u0443\u043B \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442</li>\n            <li>\u041E\u0442\u0432\u0435\u0442 \u043E\u0442 TorServer: <code>{echo}</code></li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C?</div>\n        <ul>\n            <li>\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0441\u0442\u043E\u0438\u0442 \u0432\u0435\u0440\u0441\u0438\u044F Matrix</li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u041A\u0430\u043A \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C?</div>\n        <ul>\n            <li>\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0438 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 <code>{ip}/echo</code></li>\n            <li>\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E \u0432 \u043E\u0442\u0432\u0435\u0442\u0435 \u0435\u0441\u0442\u044C \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u043A\u043E\u0434\u0430 <code>MatriX</code></li>\n        </ul>\n    </div>\n</div>";

    var html$v = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>\n\n<div class=\"torrent-error noconnect\">\n    <div>\n        <div>#{torent_nohash_reasons}</div>\n        <ul>\n            <li>#{torent_nohash_reason_one}</li>\n            <li>#{torent_nohash_reason_two}: {echo}</li>\n            <li>#{torent_nohash_reason_three}: <code>{url}</code></li>\n        </ul>\n    </div>\n\n    <div class=\"is--jackett\">\n        <div>#{torent_nohash_do}</div>\n        <ul>\n            <li>#{torent_nohash_do_one}</li>\n            <li>#{torent_nohash_do_two}</li>\n            <li>#{torent_nohash_do_three}</li>\n        </ul>\n    </div>\n\n    <div class=\"is--torlook\">\n        <div>#{torent_nohash_do}</div>\n        <ul>\n            <li>#{torent_nohash_do_four}</li>\n            <li>#{torent_nohash_do_five}</li>\n        </ul>\n    </div>\n</div>";

    var html$u = "<div class=\"torrent-install\">\n    <div class=\"torrent-install__left\">\n        <img src=\"https://yumata.github.io/lampa/img/ili/tv.png\" class=\"torrent-install\"/>\n    </div>\n    <div class=\"torrent-install__details\">\n        <div class=\"torrent-install__title\">#{torrent_install_need}</div>\n        <div class=\"torrent-install__descr\">#{torrent_install_text}</div>\n        \n        <div class=\"torrent-install__label\">#{torrent_install_contact}</div>\n\n        <div class=\"torrent-install__links\">\n            <div class=\"torrent-install__link\">\n                <div>LG - Samsung</div>\n                <div>@lampa_group</div>\n            </div>\n\n            <div class=\"torrent-install__link\">\n                <div>Android</div>\n                <div>@lampa_android</div>\n            </div>\n        </div>\n    </div>\n</div>";

    var html$t = "<div class=\"torrent-checklist\">\n    <div class=\"torrent-checklist__descr\">#{torrent_error_text}</div>\n\n    <div class=\"torrent-checklist__progress-steps\"></div>\n    <div class=\"torrent-checklist__progress-bar\">\n        <div style=\"width: 0\"></div>\n    </div>\n\n    <div class=\"torrent-checklist__content\">\n        <div class=\"torrent-checklist__steps\">\n            <ul class=\"torrent-checklist__list\">\n                <li>#{torrent_error_step_1}</li>\n                <li>#{torrent_error_step_2}</li>\n                <li>#{torrent_error_step_3}</li>\n                <li>#{torrent_error_step_4}</li>\n                <li>#{torrent_error_step_5}</li>\n                <li>#{torrent_error_step_6}</li>\n            </ul>\n        </div>\n\n        <div class=\"torrent-checklist__info\">\n            <div class=\"hide\">#{torrent_error_info_1}</div>\n            <div class=\"hide\">#{torrent_error_info_2}</div>\n            <div class=\"hide\">#{torrent_error_info_3}</div>\n            <div class=\"hide\">#{torrent_error_info_4}</div>\n            <div class=\"hide\">#{torrent_error_info_5}</div>\n            <div class=\"hide\">#{torrent_error_info_6}</div>\n            <div class=\"hide\">#{torrent_error_info_7}</div>\n        </div>\n    </div>\n\n    <div class=\"torrent-checklist__footer\">\n        <div class=\"simple-button selector\">#{torrent_error_start}</div><div class=\"torrent-checklist__next-step\"></div>\n    </div>\n</div>";

    var html$s = "<div class=\"torrent-serial selector\">\n    <img src=\"{img}\" class=\"torrent-serial__img\" />\n    <div class=\"torrent-serial__content\">\n        <div class=\"torrent-serial__body\">\n            <div class=\"torrent-serial__title\">{fname}</div>\n            <div class=\"torrent-serial__line\">#{torrent_serial_episode} - <b>{episode}</b> &nbsp;\u2022&nbsp; #{torrent_serial_season} - <b>{season}</b> &nbsp;\u2022&nbsp; #{torrent_serial_date} - {air_date}</div>\n        </div>\n        <div class=\"torrent-serial__detail\">\n            <div class=\"torrent-serial__size\">{size}</div>\n            <div class=\"torrent-serial__exe\">.{exe}</div>\n        </div>\n    </div>\n    <div class=\"torrent-serial__episode\">{episode}</div>\n</div>";

    var html$r = "<div class=\"search-box search\">\n    <div class=\"search-box__input search__input\"></div>\n    <div class=\"search-box__keypad search__keypad\"><div class=\"simple-keyboard\"></div></div>\n</div>";

    var html$q = "<div class=\"console\">\n    <div class=\"console__tabs\"></div>\n    <div class=\"console__body\"></div>\n</div>";

    var html$p = "\n<svg width=\"15\" height=\"14\" viewBox=\"0 0 15 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.54893 0.927035C6.84828 0.00572455 8.15169 0.00572705 8.45104 0.927038L9.40835 3.87334C9.54223 4.28537 9.92618 4.56433 10.3594 4.56433H13.4573C14.4261 4.56433 14.8288 5.80394 14.0451 6.37334L11.5388 8.19426C11.1884 8.4489 11.0417 8.90027 11.1756 9.31229L12.1329 12.2586C12.4322 13.1799 11.3778 13.946 10.594 13.3766L8.08777 11.5557C7.73728 11.3011 7.26268 11.3011 6.9122 11.5557L4.40592 13.3766C3.6222 13.946 2.56773 13.1799 2.86708 12.2586L3.82439 9.31229C3.95827 8.90027 3.81161 8.4489 3.46112 8.19426L0.954841 6.37334C0.171128 5.80394 0.573906 4.56433 1.54263 4.56433H4.64056C5.07378 4.56433 5.45774 4.28536 5.59161 3.87334L6.54893 0.927035Z\" fill=\"currentColor\"/>\n</svg>\n";

    var html$o = "<div class=\"time-line\" data-hash=\"{hash}\">\n    <div style=\"width: {percent}%\"></div>\n</div>";

    var html$n = "<span class=\"time-line-details\" data-hash=\"{hash}\">\n#{time_viewed} - <b a=\"t\">{time}</b> / <b a=\"p\">{percent}</b> #{time_from} <b a=\"d\">{duration}</b>\n</span>";

    var html$m = "<div class=\"empty empty--list\">\n    <div class=\"empty__title\">#{empty_title}</div>\n    <div class=\"empty__descr\">#{empty_text}</div>\n</div>";

    var html$l = "<div class=\"screensaver\">\n    <div class=\"screensaver__slides\">\n        <img class=\"screensaver__slides-one\" />\n        <img class=\"screensaver__slides-two\" />\n    </div>\n    <div class=\"screensaver__gradient\"></div>\n    <div class=\"screensaver__title\">\n        <div class=\"screensaver__title-name\"></div>\n        <div class=\"screensaver__title-tagline\"></div>\n    </div>\n    <div class=\"screensaver__datetime\">\n        <div class=\"screensaver__datetime-time\"><span class=\"time--clock\"></span></div>\n        <div class=\"screensaver__datetime-date\"><span class=\"time--full\"></span></div>\n    </div>\n</div>";

    var html$k = "<div class=\"plugins-catalog\">\n\n    <div class=\"plugins-catalog__block\">\n        <div class=\"plugins-catalog__title selector\">#{plugins_catalog_work}</div>\n        <div class=\"plugins-catalog__descr\">#{plugins_catalog_work_descr}</div>\n        <div class=\"plugins-catalog__list\">\n            \n        </div>\n    </div>\n\n    <div class=\"plugins-catalog__block\">\n        <div class=\"plugins-catalog__title\">#{plugins_catalog_popular}</div>\n        <div class=\"plugins-catalog__descr\">#{plugins_catalog_popular_descr}</div>\n        <div class=\"plugins-catalog__list\">\n            \n        </div>\n    </div>\n</div>";

    var html$j = "<div class=\"broadcast\">\n    <div class=\"broadcast__text\">{text}</div>\n\n    <div class=\"broadcast__scan\"><div></div></div>\n\n    <div class=\"broadcast__devices\">\n    \n    </div>\n</div>";

    var html$i = "<div class=\"lang\">\n    <div class=\"lang__body\">\n        <div class=\"lang__logo\">\n            <img src=\"./img/logo-icon.svg\" />\n        </div>\n        <div class=\"lang__title\"></div>\n        <div class=\"lang__subtitle\"></div>\n        <div class=\"lang__selector\"></div>\n    </div>\n</div>";

    var templates = {
      head: html$1i,
      wrap: html$1h,
      menu: html$1g,
      activitys: html$1f,
      activity: html$1e,
      settings: html$1c,
      settings_main: html$1b,
      settings_interface: html$1a,
      settings_parser: html$19,
      settings_server: html$18,
      settings_player: html$17,
      settings_more: html$16,
      settings_plugins: html$15,
      settings_cloud: html$14,
      settings_account: html$13,
      scroll: html$1d,
      items_line: html$12,
      card: html$11,
      card_parser: html$10,
      card_watched: html$$,
      full_start: html$_,
      full_descr: html$Z,
      full_person: html$Y,
      full_review: html$X,
      full_episode: html$W,
      player: html$V,
      player_panel: html$U,
      player_video: html$T,
      player_info: html$S,
      selectbox: html$R,
      selectbox_item: html$Q,
      info: html$P,
      more: html$N,
      search: html$M,
      settings_input: html$L,
      modal: html$K,
      company: html$J,
      modal_loading: html$I,
      modal_pending: html$H,
      person_start: html$G,
      empty: html$F,
      notice: html$E,
      notice_card: html$D,
      torrent: html$C,
      torrent_file: html$B,
      files: html$A,
      about: html$z,
      error: html$y,
      torrent_noconnect: html$x,
      torrent_file_serial: html$s,
      torrent_nocheck: html$w,
      torrent_nohash: html$v,
      torrent_install: html$u,
      torrent_error: html$t,
      filter: html$O,
      search_box: html$r,
      console: html$q,
      icon_star: html$p,
      timeline: html$o,
      timeline_details: html$n,
      list_empty: html$m,
      screensaver: html$l,
      plugins_catalog: html$k,
      broadcast: html$j,
      lang_choice: html$i
    };

    function get$d(name) {
      var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var like_static = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var tpl = templates[name];
      if (!tpl) throw 'Template [' + name + '] not found';
      tpl = Lang.translate(tpl);

      for (var n in vars) {
        tpl = tpl.replace(new RegExp('{' + n + '}', 'g'), vars[n]);
      }

      tpl = tpl.replace(/{\@([a-z_-]+)}/g, function (e, s) {
        return templates[s] || '';
      });
      return like_static ? tpl : $(tpl);
    }

    function add$b(name, html) {
      templates[name] = html;
    }

    function all$3() {
      return templates;
    }

    var Template = {
      get: get$d,
      add: add$b,
      all: all$3
    };

    var Base64 = {
      // private property
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      // public method for encoding
      encode: function encode(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);

        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }

        return output;
      },
      // public method for decoding
      decode: function decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (enc2 & 15) << 4 | enc3 >> 2;
          chr3 = (enc3 & 3) << 6 | enc4;
          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }

          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }

        output = Base64._utf8_decode(output);
        return output;
      },
      // private method for UTF-8 encoding
      _utf8_encode: function _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);

          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(c & 63 | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(c & 63 | 128);
          }
        }

        return utftext;
      },
      // private method for UTF-8 decoding
      _utf8_decode: function _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {
          c = utftext.charCodeAt(i);

          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((c & 31) << 6 | c2 & 63);
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            i += 3;
          }
        }

        return string;
      }
    };

    var html$h = $('<div class="noty"><div class="noty__body"><div class="noty__text"></div></div></div>'),
        body$5 = html$h.find('.noty__text'),
        time$3;

    function show$7(text) {
      clearTimeout(time$3);
      time$3 = setTimeout(function () {
        html$h.removeClass('noty--visible');
      }, 3000);
      body$5.html(text);
      html$h.addClass('noty--visible');
    }

    function render$d() {
      return html$h;
    }

    var Noty = {
      show: show$7,
      render: render$d
    };

    var reqCallback = {};

    function exit$1() {
      if (checkVersion(1)) navigator.app.exitApp();else $('<a href="lampa://exit"></a>')[0].click();
    }

    function playHash(SERVER) {
      var magnet = "magnet:?xt=urn:btih:" + SERVER.hash;

      if (checkVersion(10)) {
        var intentExtra = "";

        if (SERVER.movie) {
          intentExtra = {
            title: "[LAMPA] " + (SERVER.movie.title || 'No title').replace(/\s+/g, ' ').trim(),
            poster: SERVER.movie.img,
            data: {
              lampa: true,
              movie: SERVER.movie
            }
          };
        }

        else {
        intentExtra = {
          action: "play",
          data: {
            lampa: true
          }
        }
        };
      window.plugins.intentShim.startActivity(
      {
          action: window.plugins.intentShim.ACTION_VIEW,
          url: magnet,
          extras: intentExtra
      },
      function() {},
      function() {console.log('Failed to open magnet URL via Android Intent')}
      );
      //AndroidJS.openTorrentLink(magnet, JSON.stringify(intentExtra));
      } else {
        $('<a href="' + magnet + '"/>')[0].click();
      }
    }

    function openTorrent(SERVER) {
      if (checkVersion(10)) {
        var intentExtra = {
          title: "[LAMPA] " + (SERVER.movie.title || 'No title').replace(/\s+/g, ' ').trim(),
          poster: SERVER.object.poster,
          data: {
            lampa: true,
            movie: SERVER.movie
          }
        };
        window.plugins.intentShim.startActivity(
        {
            action: window.plugins.intentShim.ACTION_VIEW,
            url: SERVER.object.MagnetUri || SERVER.object.Link,
            extras: intentExtra
        },
        function() {},
        function() {console.log('Failed to open magnet URL via Android Intent')}
        );
        //AndroidJS.openTorrentLink(SERVER.object.MagnetUri || SERVER.object.Link, JSON.stringify(intentExtra));
      } else {
        $('<a href="' + (SERVER.object.MagnetUri || SERVER.object.Link) + '"/>')[0].click();
      }
    }

    function openPlayer(link, data) {
      if (checkVersion(10)) cordova.InAppBrowser.open(link, '_system');else $('<a href="' + link + '"><a/>')[0].click();
    }

    function openYoutube(link) {
      if (checkVersion(15)) window.plugins.intentShim.startActivity({
          action : window.plugins.intentShim.ACTION_VIEW,
          url : "https://www.youtube.com/watch?v=" +link
        }, function() {
        }, function() {
          console.log("Failed to open Youtube URL via Android Intent");
        });else $('<a href="' + link + '"><a/>')[0].click();
    }

    function resetDefaultPlayer() {
      //if (checkVersion(15)) AndroidJS.clearDefaultPlayer();
    }

    function httpReq(data, call) {
      var index = Math.floor(Math.random() * 5000);
      reqCallback[index] = call;
      if (checkVersion(16)) AndroidJS.httpReq(JSON.stringify(data), index);else call.error({
        responseText: "No Native request"
      });
    }

    function httpCall(index, callback) {
      var req = reqCallback[index];

      if (req[callback]) {
        var resp = AndroidJS.getResp(index);

        try {
          var json = JSON.parse(resp);
          req[callback](json);
        } catch (_unused) {
          req[callback](resp);
        } finally {
          delete reqCallback[index];
        }
      }
    }

    function voiceStart() {
      if (checkVersion(25)) AndroidJS.voiceStart();else Lampa.Noty.show("Работает только на Android TV");
    }

    function showInput(inputText) {
      //if (checkVersion(27)) AndroidJS.showInput(inputText);
    }

    function updateChannel(where) {
      //if (checkVersion(28)) AndroidJS.updateChannel(where);
    }

    function checkVersion(needVersion) {
      if (Storage.field('platform') == 'android') {
        try {
          var versionCode = 16;

          if (parseInt(versionCode, 10) >= needVersion) {
            return true;
          } else {
            Lampa.Noty.show("Обновите приложение.<br>Требуется версия: " + needVersion + "<br>Текущая версия: " + versionCode);
            return false;
          }
        } catch (e) {
          Lampa.Noty.show("Обновите приложение.<br>Требуется версия: " + needVersion);
          return false;
        }
      } else return false;
    }

    var Android = {
      exit: exit$1,
      openTorrent: openTorrent,
      openPlayer: openPlayer,
      playHash: playHash,
      openYoutube: openYoutube,
      resetDefaultPlayer: resetDefaultPlayer,
      httpReq: httpReq,
      voiceStart: voiceStart,
      httpCall: httpCall,
      showInput: showInput,
      updateChannel: updateChannel
    };

    function create$p() {
      var listener = start$4();
      var _calls = [];

      var _last;

      var last_reguest;
      var need = {
        timeout: 1000 * 60
      };

      this.timeout = function (time) {
        need.timeout = time;
      };
      /**
       * Видимый запрос
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       */


      this.get = function (url, _complite, _error, post_data) {
        clear();
        go({
          url: url,
          post_data: post_data,
          start: function start() {
            listener.send('start');
          },
          before_complite: function before_complite() {
            listener.send('before_complite');
          },
          complite: function complite(data) {
            if (_complite) _complite(data);
          },
          after_complite: function after_complite() {
            listener.send('after_complite');
          },
          before_error: function before_error() {
            listener.send('before_error');
          },
          error: function error(data) {
            if (_error) _error(data);
          },
          after_error: function after_error() {
            listener.send('after_error');
          },
          end: function end() {
            listener.send('end');
          }
        });
      };
      /**
       * Тихий запрос, отработает в любом случае
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       * @param {Object} params дополнительные параметры
       */


      this.quiet = function (url, _complite2, _error2, post_data, params) {
        var add_params = {};

        if (params) {
          add_params = params;
        }

        var data = {
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_complite2) _complite2(data);
          },
          error: function error(data) {
            if (_error2) _error2(data);
          }
        };
        Arrays.extend(data, add_params, true);
        go(data);
      };
      /**
       * Бесшумный запрос, сработает прерывание при новом запросе
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       * @param {Object} params дополнительные параметры
       */


      this.silent = function (url, complite, error, post_data, params) {
        var add_params = {};

        if (params) {
          add_params = params;
        }

        var reguest = {
          url: url,
          complite: complite,
          error: error
        };

        _calls.push(reguest);

        var data = {
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.complite) reguest.complite(data);
          },
          error: function error(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.error) reguest.error(data);
          },
          end: function end() {
            listener.send('end');
          }
        };
        Arrays.extend(data, add_params, true);
        go(data);
      };
      /**
       * Отработать только последний запрос в стеке
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       */


      this.last = function (url, complite, error, post_data) {
        var reguest = {
          url: url,
          complite: complite,
          error: error
        };
        _last = reguest;
        go({
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_last && _last.complite) _last.complite(data);
          },
          error: function error(data) {
            if (_last && _last.error) _last.error(data);
          },
          end: function end() {
            dispatchEvent({
              type: 'load:end'
            });
          }
        });
      };

      this["native"] = function (url, complite, error, post_data, params) {
        var add_params = {};

        if (params) {
          add_params = params;
        }

        var reguest = {
          url: url,
          complite: complite,
          error: error
        };

        _calls.push(reguest);

        var data = {
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.complite) reguest.complite(data);
          },
          error: function error(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.error) reguest.error(data);
          },
          end: function end() {
            listener.send('end');
          }
        };
        Arrays.extend(data, add_params, true);

        _native(data);
      };
      /**
       * Очистить все запросы
       */


      this.clear = function () {
        _calls = [];
      };
      /**
       * Повторить запрос
       * @param {Object} custom 
       */


      this.again = function (custom) {
        if (custom || last_reguest) {
          go(custom || last_reguest);
        }
      };
      /**
       * Вернуть обьект последненго запроса
       * @returns Object
       */


      this.latest = function () {
        return last_reguest;
      };
      /**
       * Декодировать ошибку в запросе
       * @param {Object} jqXHR 
       * @param {String} exception 
       * @returns String
       */


      this.errorDecode = function (jqXHR, exception) {
        return errorDecode(jqXHR, exception);
      };

      function errorDecode(jqXHR, exception) {
        var msg = '';

        if (jqXHR.status === 0 && exception !== 'timeout') {
          msg = Lang.translate('network_noconnect');
        } else if (jqXHR.status == 404) {
          msg = Lang.translate('network_404');
        } else if (jqXHR.status == 401) {
          msg = Lang.translate('network_401');
        } else if (jqXHR.status == 500) {
          msg = Lang.translate('network_500');
        } else if (exception === 'parsererror') {
          msg = Lang.translate('network_parsererror');
        } else if (exception === 'timeout') {
          msg = Lang.translate('network_timeout');
        } else if (exception === 'abort') {
          msg = Lang.translate('network_abort');
        } else if (exception === 'custom') {
          msg = jqXHR.responseText;
        } else {
          msg = Lang.translate('network_error') + ': ' + jqXHR.responseText;
        }

        return msg;
      }
      /**
       * Сделать запрос
       * @param {Object} params 
       */


      function go(params) {
        var error = function error(jqXHR, exception) {
          console.log('Request', 'error of ' + params.url + ' :', errorDecode(jqXHR, exception));
          if (params.before_error) params.before_error(jqXHR, exception);
          if (params.error) params.error(jqXHR, exception);
          if (params.after_error) params.after_error(jqXHR, exception);
          if (params.end) params.end();
        };

        if (typeof params.url !== 'string' || !params.url) return error({
          status: 404
        }, '');
        listener.send('go');
        last_reguest = params;
        if (params.start) params.start();

        var secuses = function secuses(data) {
          if (params.before_complite) params.before_complite(data);

          if (params.complite) {
            try {
              params.complite(data);
            } catch (e) {
              console.error('Request', 'complite error:', e.message + "\n\n" + e.stack);
              Noty.show('Error: ' + (e.error || e).message + '<br><br>' + (e.error && e.error.stack ? e.error.stack : e.stack || '').split("\n").join('<br>'));
            }
          }

          if (params.after_complite) params.after_complite(data);
          if (params.end) params.end();
        };

        var data = {
          dataType: params.dataType || 'json',
          url: params.url,
          timeout: need.timeout,
          crossDomain: true,
          success: function success(data) {
            //console.log('Request','result of '+params.url+' :',data)
            secuses(data);
          },
          error: error,
          beforeSend: function beforeSend(xhr) {
            var use = Storage.field('torrserver_auth');
            var srv = Storage.get(Storage.field('torrserver_use_link') == 'two' ? 'torrserver_url_two' : 'torrserver_url');
            if (use && params.url.indexOf(srv) > -1) xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(Storage.get('torrserver_login') + ':' + Storage.get('torrserver_password')));

            if (params.beforeSend) {
              xhr.setRequestHeader(params.beforeSend.name, params.beforeSend.value);
            }
          }
        };

        if (params.post_data) {
          data.type = 'POST';
          data.data = params.post_data;
        }

        if (params.type) data.type = params.type;

        if (params.headers) {
          data.headers = params.headers;
        }

        $.ajax(data);
        need.timeout = 1000 * 60;
      }

      function _native(params) {
        var platform = Storage.get('platform', '');
        if (platform == 'webos') go(params);else if (platform == 'tizen') go(params);else if (platform == 'android') {
          go(params);
        } else go(params);
      }
    }

    function secondsToTime$1(sec, _short) {
      var sec_num = parseInt(sec, 10);
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (_short) return hours + ':' + minutes;
      return hours + ':' + minutes + ':' + seconds;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function substr(txt, len) {
      txt = txt || '';
      return txt.length > len ? txt.substr(0, len) + '...' : txt;
    }

    function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function bytesToSize(bytes, speed) {
      if (bytes == 0) {
        return Lang.translate('size_zero');
      }

      var unitMultiple = 1024;
      var unitNames = [Lang.translate('size_byte'), Lang.translate('size_kb'), Lang.translate('size_mb'), Lang.translate('size_gb'), Lang.translate('size_tb'), Lang.translate('size_pp')];

      if (speed) {
        unitMultiple = 1000;
        unitNames = [Lang.translate('speed_bit'), Lang.translate('speed_kb'), Lang.translate('speed_mb'), Lang.translate('speed_gb'), Lang.translate('speed_tb'), Lang.translate('speed_pp')];
      }

      var unitChanges = Math.floor(Math.log(bytes) / Math.log(unitMultiple));
      return parseFloat((bytes / Math.pow(unitMultiple, unitChanges)).toFixed(2)) + ' ' + unitNames[unitChanges];
    }

    function sizeToBytes(str) {
      var gsize = str.match(/([0-9\\.,]+)\s+(Mb|МБ|GB|ГБ|TB|ТБ)/i);

      if (gsize) {
        var size = parseFloat(gsize[1].replace(',', '.'));
        if (/gb|гб/.test(gsize[2].toLowerCase())) size *= 1024;
        if (/tb|тб/.test(gsize[2].toLowerCase())) size *= 1048576;
        return size * 1048576;
      }

      return 0;
    }

    function calcBitrate(byteSize, minutes) {
      if (!minutes) return 0;
      var sec = minutes * 60;
      var bitSize = byteSize * 8;
      return (bitSize / Math.pow(1000, 2) / sec).toFixed(2);
    }

    function getMoths(ended) {
      var need = ended ? '_e' : '';
      var all = [];

      for (var i = 1; i <= 12; i++) {
        all.push(Lang.translate('month_' + i + need));
      }

      return all;
    }

    function time$2(html) {
      var create = function create() {
        var months = getMoths();
        var months_end = getMoths(true);
        var days = [Lang.translate('day_7'), Lang.translate('day_1'), Lang.translate('day_2'), Lang.translate('day_3'), Lang.translate('day_4'), Lang.translate('day_5'), Lang.translate('day_6')];

        this.tik = function () {
          var date = new Date(),
              time = date.getTime(),
              ofst = parseInt((localStorage.getItem('time_offset') == null ? 'n0' : localStorage.getItem('time_offset')).replace('n', ''));
          date = new Date(time + ofst * 1000 * 60 * 60);
          time = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getFullYear()];

          if (time[0] < 10) {
            time[0] = "0" + time[0];
          }

          if (time[1] < 10) {
            time[1] = "0" + time[1];
          }

          if (time[2] < 10) {
            time[2] = "0" + time[2];
          }

          var current_time = [time[0], time[1]].join(':'),
              current_week = date.getDay(),
              current_day = date.getDate();
          $('.time--clock', html).text(current_time);
          $('.time--week', html).text(days[current_week]);
          $('.time--day', html).text(current_day);
          $('.time--moth', html).text(months[date.getMonth()]);
          $('.time--full', html).text(current_day + ' ' + months_end[date.getMonth()] + ' ' + time[3]);
        };

        setInterval(this.tik.bind(this), 1000);
        this.tik();
      };

      return new create();
    }

    function parseTime(str) {
      var months = getMoths();
      var months_end = getMoths(true);
      var days = [Lang.translate('day_7'), Lang.translate('day_1'), Lang.translate('day_2'), Lang.translate('day_3'), Lang.translate('day_4'), Lang.translate('day_5'), Lang.translate('day_6')];
      var date = new Date(str),
          time = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getFullYear()];

      if (time[0] < 10) {
        time[0] = "0" + time[0];
      }

      if (time[1] < 10) {
        time[1] = "0" + time[1];
      }

      if (time[2] < 10) {
        time[2] = "0" + time[2];
      }

      var current_time = [time[0], time[1]].join(':'),
          current_week = date.getDay(),
          current_day = date.getDate();
      return {
        time: current_time,
        week: days[current_week],
        day: current_day,
        mouth: months[date.getMonth()],
        full: current_day + ' ' + months_end[date.getMonth()] + ' ' + time[3],
        "short": current_day + ' ' + months_end[date.getMonth()]
      };
    }

    function secondsToTimeHuman(sec_num) {
      var hours = Math.trunc(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      return (hours ? hours + 'ч. ' : '') + minutes + 'м.';
    }

    function strToTime(str) {
      var date = new Date(str);
      return date.getTime();
    }

    function checkHttp(url) {
      url = url.replace(/https:\/\//, '');
      url = url.replace(/http:\/\//, '');
      url = protocol() + url;
      return url;
    }

    function shortText(fullStr, strLen, separator) {
      if (fullStr.length <= strLen) return fullStr;
      separator = separator || '...';
      var sepLen = separator.length,
          charsToShow = strLen - sepLen,
          frontChars = Math.ceil(charsToShow / 2),
          backChars = Math.floor(charsToShow / 2);
      return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
    }

    function protocol() {
      return window.location.protocol == 'https:' ? 'https://' : 'http://';
    }

    function addUrlComponent(url, params) {
      return url + (/\?/.test(url) ? '&' : '?') + params;
    }

    function putScript(items, complite, error) {
      var p = 0;

      function next() {
        if (p >= items.length) return complite();
        var u = items[p];

        if (!u) {
          p++;
          return next();
        }

        console.log('Script', 'create:', u);
        var s = document.createElement('script');

        s.onload = function () {
          console.log('Script', 'include:', u);
          next();
        };

        s.onerror = function () {
          console.log('Script', 'error:', u);
          if (error) error(u);
          next();
        };

        s.setAttribute('src', u);
        document.body.appendChild(s);
        p++;
      }

      next();
    }

    function putStyle(items, complite, error) {
      var p = 0;

      function next() {
        if (p >= items.length) return complite();
        var u = items[p];
        $.get(u, function (css) {
          css = css.replace(/\.\.\//g, './');
          var style = document.createElement('style');
          style.type = 'text/css';

          if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
          } else {
            style.appendChild(document.createTextNode(css));
          }

          document.body.appendChild(style);
          next();
        }, function () {
          if (error) error(u);
          next();
        }, 'TEXT');
        p++;
      }

      next(items[0]);
    }

    function clearTitle(title) {
      return title.replace(/[^a-zа-я0-9\s]/gi, '');
    }

    function cardImgBackground(card_data) {
      if (Storage.field('background')) {
        return Storage.get('background_type', 'complex') == 'poster' && card_data.backdrop_path ? Api.img(card_data.backdrop_path, 'original') : card_data.poster_path ? Api.img(card_data.poster_path) : card_data.poster || card_data.img || '';
      }

      return '';
    }

    function stringToHslColor(str, s, l) {
      var hash = 0;

      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      var h = hash % 360;
      return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }

    function pathToNormalTitle(path) {
      var add_exe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var name = path.split('.');
      var exe = name.pop();
      name = name.join('.');
      return (name + '').replace(/_|\./g, ' ') + (add_exe ? ' <span class="exe">.' + exe + '</span>' : '');
    }

    function hash$2(input) {
      var str = (input || '') + '';
      var hash = 0;
      if (str.length == 0) return hash;

      for (var i = 0; i < str.length; i++) {
        var _char = str.charCodeAt(i);

        hash = (hash << 5) - hash + _char;
        hash = hash & hash; // Convert to 32bit integer
      }

      return Math.abs(hash) + '';
    }

    function uid(len) {
      var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var ID_LENGTH = len || 8;
      var id = '';

      for (var i = 0; i < ID_LENGTH; i++) {
        id += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
      }

      return id;
    }

    function copyTextToClipboard(text, succes, error) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        if (successful) succes();else error();
      } catch (err) {
        error();
      }

      document.body.removeChild(textArea);
    }

    function imgLoad(image, src, onload, onerror) {
      var img = $(image)[0];

      img.onload = function () {
        if (onload) onload();
      };

      img.onerror = function (e) {
        img.src = './img/img_broken.svg';
        if (onerror) onerror();
      };

      img.src = src;
    }

    function isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    var Utils = {
      secondsToTime: secondsToTime$1,
      secondsToTimeHuman: secondsToTimeHuman,
      capitalizeFirstLetter: capitalizeFirstLetter,
      substr: substr,
      numberWithSpaces: numberWithSpaces,
      time: time$2,
      bytesToSize: bytesToSize,
      calcBitrate: calcBitrate,
      parseTime: parseTime,
      checkHttp: checkHttp,
      shortText: shortText,
      protocol: protocol,
      addUrlComponent: addUrlComponent,
      sizeToBytes: sizeToBytes,
      putScript: putScript,
      putStyle: putStyle,
      clearTitle: clearTitle,
      cardImgBackground: cardImgBackground,
      strToTime: strToTime,
      stringToHslColor: stringToHslColor,
      pathToNormalTitle: pathToNormalTitle,
      hash: hash$2,
      uid: uid,
      copyTextToClipboard: copyTextToClipboard,
      imgLoad: imgLoad,
      isTouchDevice: isTouchDevice
    };

    function create$o() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var html = Template.get('scroll');
      var body = html.find('.scroll__body');
      var content = html.find('.scroll__content');
      html.toggleClass('scroll--horizontal', params.horizontal ? true : false);
      html.toggleClass('scroll--mask', params.mask ? true : false);
      html.toggleClass('scroll--over', params.over ? true : false);
      html.toggleClass('scroll--nopadding', params.nopadding ? true : false);
      body.data('scroll', 0);
      var scroll_time = 0,
          scroll_step = params.step || 150;
      html.on('mousewheel', function (e) {
        var parent = $(e.target).parents('.scroll');

        if (Storage.field('navigation_type') == 'mouse' && Date.now() - scroll_time > 100 && html.is(parent[0])) {
          scroll_time = Date.now();

          if (e.originalEvent.wheelDelta / 120 > 0) {
            if (_this.onWheel) _this.onWheel(-scroll_step);

            _this.wheel(-scroll_step);
          } else {
            if (_this.onWheel) _this.onWheel(scroll_step);

            _this.wheel(scroll_step);
          }
        }
      });
      /*
      let drag = {
          start: {
              x: 0,
              y: 0
          },
          move: {
              x: 0,
              y: 0
          },
          difference : 0,
          speed: 0,
          position: 0,
          animate: false,
          enable: false
      }
        html.on('touchstart',(e)=>{
          drag.start.x = e.touches[0].clientX
          drag.start.y = e.touches[0].clientY
            drag.position = body.data('scroll') || 0
            body.toggleClass('notransition',true)
            let parent = $(e.target).parents('.scroll')
            drag.enable = html.is(parent[0])
            clearInterval(drag.time)
          clearTimeout(drag.time_animate)
            if(drag.enable){
              drag.animate = true
                drag.time_animate = setTimeout(()=>{
                  drag.animate = false
              },200)
          }
      })
        html.on('touchmove',(e)=>{
          if(drag.enable){
              drag.move.x = e.touches[0].clientX
              drag.move.y = e.touches[0].clientY
                let dir = params.horizontal ? 'x' : 'y'
                drag.difference = drag.move[dir] - drag.start[dir]
              drag.speed      = drag.difference
                touchTo(drag.position + drag.difference)
          }
      })
        html.on('touchend',(e)=>{
          body.toggleClass('notransition',false)
            if(drag.animate) touchTo((body.data('scroll') || 0) + drag.speed)
            drag.enable = false
          drag.speed  = 0
            clearInterval(drag.time)
          clearTimeout(drag.time_animate)
      })
        function touchTo(offset){
          offset = maxOffset(offset)
            body.css('transform','translate3d('+(params.horizontal ? offset : 0)+'px, '+(params.horizontal ? 0 : offset)+'px, 0px)')
            body.data('scroll',offset)
      }
      */

      function maxOffset(offset) {
        var w = params.horizontal ? html.width() : html.height();
        var p = parseInt(content.css('padding-' + (params.horizontal ? 'left' : 'top')));
        var s = body[0][params.horizontal ? 'scrollWidth' : 'scrollHeight'];
        offset = Math.min(0, offset);
        offset = Math.max(-(Math.max(s + p * 2, w) - w), offset);
        return offset;
      }

      this.wheel = function (size) {
        html.toggleClass('scroll--wheel', true);
        var direct = params.horizontal ? 'left' : 'top';
        var scrl = body.data('scroll'),
            scrl_offset = html.offset()[direct],
            scrl_padding = parseInt(content.css('padding-' + direct));

        if (params.scroll_by_item) {
          var pos = body.data('scroll-position');
          pos = pos || 0;
          var items = $('>*', body);
          pos += size > 0 ? 1 : -1;
          pos = Math.max(0, Math.min(items.length - 1, pos));
          body.data('scroll-position', pos);
          var item = items.eq(pos),
              ofst = item.offset()[direct];
          size = ofst - scrl_offset - scrl_padding;
        }

        var max = params.horizontal ? 10000 : body.height();
        max -= params.horizontal ? html.width() : html.height();
        max += scrl_padding * 2;
        scrl -= size;
        scrl = Math.min(0, Math.max(-max, scrl));
        scrl = maxOffset(scrl);
        this.reset();

        if (Storage.field('scroll_type') == 'css') {
          body.css('transform', 'translate3d(' + (params.horizontal ? scrl : 0) + 'px, ' + (params.horizontal ? 0 : scrl) + 'px, 0px)');
        } else {
          body.css('margin-left', (params.horizontal ? scrl : 0) + 'px');
          body.css('margin-top', (params.horizontal ? 0 : scrl) + 'px');
        }

        body.data('scroll', scrl);
      };

      this.update = function (elem, tocenter) {
        if (elem.data('ismouse')) return;
        html.toggleClass('scroll--wheel', false);
        var dir = params.horizontal ? 'left' : 'top',
            siz = params.horizontal ? 'width' : 'height';
        var toh = Lampa.Utils.isTouchDevice();
        var ofs_elm = elem.offset()[dir],
            ofs_box = body.offset()[dir],
            center = ofs_box + (tocenter ? content[siz]() / 2 - elem[siz]() / 2 : 0),
            scrl = Math.min(0, center - ofs_elm);
        scrl = maxOffset(scrl);
        this.reset();

        if (toh) {
          if (params.horizontal) html.stop().animate({
            scrollLeft: -scrl
          }, 200);else html.stop().animate({
            scrollTop: -scrl
          }, 200);
        } else {
          if (Storage.field('scroll_type') == 'css') {
            body.css('transform', 'translate3d(' + (params.horizontal ? scrl : 0) + 'px, ' + (params.horizontal ? 0 : scrl) + 'px, 0px)');
          } else {
            body.css('margin-left', (params.horizontal ? scrl : 0) + 'px');
            body.css('margin-top', (params.horizontal ? 0 : scrl) + 'px');
          }
        }

        body.data('scroll', scrl);
      };

      this.append = function (object) {
        body.append(object);
      };

      this.minus = function (minus) {
        html.addClass('layer--wheight');
        html.data('mheight', minus);
      };

      this.height = function (minus) {
        html.addClass('layer--height');
        html.data('mheight', minus);
      };

      this.body = function () {
        return body;
      };

      this.render = function (object) {
        if (object) body.append(object);
        return html;
      };

      this.clear = function () {
        body.empty();
      };

      this.reset = function () {
        body.css('transform', 'translate3d(0px, 0px, 0px)');
        body.css('margin', '0px');
        body.data('scroll', 0); //body.data('scroll-position',0)
      };

      this.destroy = function () {
        html.remove();
        body = null;
        content = null;
        html = null;
      };
    }

    function init$q() {
      if (typeof webOS !== 'undefined' && webOS.platform.tv === true) {
        Storage.set('platform', 'webos');
        webOS.deviceInfo(function (e) {
          webOS.sdk_version = parseFloat(e.sdkVersion);
        });
      } else if (typeof webapis !== 'undefined' && typeof tizen !== 'undefined') {
        Storage.set('platform', 'tizen');
        tizen.tvinputdevice.registerKey("MediaPlayPause");
        tizen.tvinputdevice.registerKey("MediaPlay");
        tizen.tvinputdevice.registerKey("MediaStop");
        tizen.tvinputdevice.registerKey("MediaPause");
        tizen.tvinputdevice.registerKey("MediaRewind");
        tizen.tvinputdevice.registerKey("MediaFastForward");
      } else if (navigator.userAgent.toLowerCase().indexOf("lampa_client") > -1) {
        Storage.set('platform', 'android');
      } else if (typeof nw !== 'undefined') {
        Storage.set('platform', 'nw');
      } else if (navigator.userAgent.toLowerCase().indexOf("windows nt") > -1) {
        Storage.set('platform', 'browser');
      } else if (navigator.userAgent.toLowerCase().indexOf("maple") > -1) {
        Storage.set('platform', 'orsay');
      } else {
        Storage.set('platform', '');
      }

      Storage.set('platform', 'android');
      Storage.set('native', Storage.get('platform') ? true : false);
    }
    /**
     * Какая платформа
     * @returns String
     */


    function get$c() {
      return Storage.get('platform', '');
    }
    /**
     * Если это платформа
     * @param {String} need - какая нужна? tizen, webos, android, orsay
     * @returns Boolean
     */


    function is(need) {
      return get$c() == need ? true : false;
    }
    /**
     * Если хоть одна из платформ tizen, webos, android
     * @returns Boolean
     */


    function any$1() {
      return is('tizen') || is('webos') || is('android') || is('nw') ? true : false;
    }
    /**
     * Если это именно телек
     * @returns Boolean
     */


    function tv() {
      return is('tizen') || is('webos') || is('orsay') ? true : false;
    }

    var Platform = {
      init: init$q,
      get: get$c,
      any: any$1,
      is: is,
      tv: tv
    };

    var components$2 = {};
    var params$1 = {};
    /**
     * Добавить компонент
     * @param {{component:string, icon:string, name:string}} data 
     */

    function addComponent(data) {
      components$2[data.component] = data;
      Template.add('settings_' + data.component, '<div></div>');
    }
    /**
     * Получить компонент
     * @param {string} component 
     * @returns {{component:string, icon:string, name:string}}
     */


    function getComponent(component) {
      return components$2[component];
    }
    /**
     * Добавить параметр
     * @param {{component:string, name:string, type:string, values:string|object, default:string|boolean}} data 
     */


    function addParam(data) {
      if (!params$1[data.component]) params$1[data.component] = [];
      params$1[data.component].push(data);
      if (data.param.type == 'select' || data.param.type == 'input') Params.select(data.param.name, data.param.values, data.param["default"]);
      if (data.param.type == 'trigger') Params.trigger(data.param.name, data.param["default"]);
    }
    /**
     * Получить параметры
     * @param {string} component 
     * @returns {[{component:string, name:string, type:string, values:string|object, default:string|boolean}]}
     */


    function getParam(component) {
      return params$1[component];
    }
    /**
     * Получить все компоненты
     * @returns {{name:{component:string, icon:string, name:string}}}
     */


    function allComponents() {
      return components$2;
    }
    /**
     * Получить все параметры
     * @returns {{component:[{component:string, name:string, type:string, values:string|object, default:string|boolean}]}}
     */


    function allParams() {
      return params$1;
    }

    var SettingsApi = {
      allComponents: allComponents,
      allParams: allParams,
      addComponent: addComponent,
      addParam: addParam,
      getComponent: getComponent,
      getParam: getParam
    };

    function Component$1(name) {
      var component_params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var scrl = new create$o({
        mask: true,
        over: true
      });
      var comp = Template.get('settings_' + name);
      var last;
      /**
       * Обновить скролл
       */

      function updateScroll() {
        comp.find('.selector').unbind('hover:focus').on('hover:focus', function (e) {
          last = e.target;
          scrl.update($(e.target), true);
        });
      }
      /**
       * Билдим все события
       */


      function buildEvents() {
        if (Storage.get('native')) {
          comp.find('.is--torllok').remove();
        }

        if (!Platform.is('android')) {
          comp.find('.is--android').remove();
        }

        if (!Platform.any()) {
          comp.find('.is--player').remove();
        }

        if (!Platform.is('nw')) {
          comp.find('.is--nw').remove();
        }

        scrl.render().find('.scroll__content').addClass('layer--wheight').data('mheight', $('.settings__head'));
        comp.find('.clear-storage').on('hover:enter', function () {
          Noty.show(Lang.translate('settings_clear_cache'));
          localStorage.clear();
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        });
        Params.bind(comp.find('.selector'));
        Params.listener.follow('update_scroll', updateScroll);
        updateScroll();
      }
      /**
       * Добавляем пользовательские параметры
       */


      function addParams() {
        var params = SettingsApi.getParam(name);

        if (params) {
          params.forEach(function (data) {
            var item;

            if (data.param.type == 'select') {
              item = $("<div class=\"settings-param selector\" data-type=\"select\" data-name=\"".concat(data.param.name, "\">\n                        <div class=\"settings-param__name\">").concat(data.field.name, "</div>\n                        <div class=\"settings-param__value\"></div>\n                    </div>"));
            }

            if (data.param.type == 'trigger') {
              item = $("<div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"".concat(data.param.name, "\">\n                        <div class=\"settings-param__name\">").concat(data.field.name, "</div>\n                        <div class=\"settings-param__value\"></div>\n                    </div>"));
            }

            if (data.param.type == 'input') {
              item = $("<div class=\"settings-param selector\" data-type=\"input\" data-name=\"".concat(data.param.name, "\" placeholder=\"").concat(data.param.placeholder, "\">\n                        <div class=\"settings-param__name\">").concat(data.field.name, "</div>\n                        <div class=\"settings-param__value\"></div>\n                    </div>"));
            }

            if (data.param.type == 'title') {
              item = $("<div class=\"settings-param-title\"><span>".concat(data.field.name, "</span></div>"));
            }

            if (data.param.type == 'static') {
              item = $("<div class=\"settings-param selector\" data-static=\"true\">\n                        <div class=\"settings-param__name\">".concat(data.field.name, "</div>\n                    </div>"));
            }

            if (item) {
              if (data.field.description) item.append("<div class=\"settings-param__descr\">".concat(data.field.description, "</div>"));
              if (typeof data.onRender == 'function') data.onRender(item);
              if (typeof data.onChange == 'function') item.data('onChange', data.onChange);
              comp.append(item);
            }
          });
        }
      }
      /**
       * Стартуем
       */


      function start() {
        addParams();
        buildEvents();
        if (typeof component_params.last_index !== 'undefined' && component_params.last_index > 0) last = comp.find('.selector').eq(component_params.last_index)[0];
        Controller.add('settings_component', {
          toggle: function toggle() {
            Controller.collectionSet(comp);
            Controller.collectionFocus(last, comp);
          },
          up: function up() {
            Navigator.move('up');
          },
          down: function down() {
            Navigator.move('down');
          },
          back: function back() {
            scrl.destroy();
            comp.remove();
            Params.listener.remove('update_scroll', updateScroll);
            Controller.toggle('settings');
          }
        });
      }

      start();
      /**
       * Уничтожить
       */

      this.destroy = function () {
        scrl.destroy();
        comp.remove();
        comp = null;
        Params.listener.remove('update_scroll', updateScroll);
      };
      /**
       * Рендер
       * @returns {object}
       */


      this.render = function () {
        return scrl.render(comp);
      };
    }

    function Main() {
      var _this = this;

      var comp;
      var scrl = new create$o({
        mask: true,
        over: true
      });
      var last;
      /**
       * Создать
       */

      this.create = function () {
        comp = Template.get('settings_main');

        _this.update();
      };
      /**
       * Обновить события
       */


      this.update = function () {
        var components = SettingsApi.allComponents();

        for (var name in components) {
          var aded = components[name];

          if (!comp.find('[data-component="' + name + '"]').length) {
            var item = $("<div class=\"settings-folder selector\" data-component=\"".concat(name, "\">\n                    <div class=\"settings-folder__icon\">\n                        ").concat(aded.icon, "\n                    </div>\n                    <div class=\"settings-folder__name\">").concat(aded.name, "</div>\n                </div>"));
            comp.append(item);
          }
        }

        comp.find('.selector').unbind('hover:focus hover:enter').on('hover:focus', function (event) {
          last = event.target;
          scrl.update($(event.target), true);
        }).on('hover:enter', function (event) {
          _this.render().detach();

          _this.onCreate($(event.target).data('component'));
        });
      };
      /**
       * Сделать активным
       */


      this.active = function () {
        Controller.collectionSet(comp);
        Controller.collectionFocus(last, comp);
        scrl.height($('.settings__head'));
      };
      /**
       * Рендер
       * @returns {object}
       */


      this.render = function () {
        return scrl.render(comp);
      };
    }

    var html$g;
    var body$4;
    var listener$f = start$4();
    var last$4 = '';

    var _main;
    /**
     * Запуск
     */


    function init$p() {
      html$g = Template.get('settings');
      body$4 = html$g.find('.settings__body');
      html$g.find('.settings__layer').on('click', function () {
        window.history.back();
      });
      _main = new Main();
      _main.onCreate = create$n;

      _main.create();

      Controller.add('settings', {
        toggle: function toggle() {
          _main.update();

          listener$f.send('open', {
            name: 'main',
            body: _main.render()
          });
          body$4.empty().append(_main.render());

          _main.active();

          $('body').toggleClass('settings--open', true);
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        left: function left() {
          _main.render().detach();

          Controller.toggle('content');
        },
        gone: function gone(to) {
          if (to !== 'settings_component') $('body').toggleClass('settings--open', false);
        },
        back: function back() {
          _main.render().detach();

          Controller.toggle('head');
        }
      });
    }
    /**
     * Создать компонент
     * @param {string} name 
     * @param {{last_index:integer}} params 
     */


    function create$n(name) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var comp = new Component$1(name, params);
      body$4.empty().append(comp.render());
      listener$f.send('open', {
        name: name,
        body: comp.render(),
        params: params
      });
      last$4 = name;
      Controller.toggle('settings_component');
    }
    /**
     * Обновить открытый компонент
     */


    function update$9() {
      var selects = body$4.find('.selector');
      var lastinx = selects.index(body$4.find('.selector.focus'));
      create$n(last$4, {
        last_index: lastinx
      });
    }
    /**
     * Рендер
     * @returns {object}
     */


    function render$c() {
      return html$g;
    }

    var Settings = {
      listener: listener$f,
      init: init$p,
      render: render$c,
      update: update$9,
      create: create$n,
      main: function main() {
        return _main;
      }
    };

    var html$f;
    var scroll$2;
    var active$4;

    function init$o() {
      html$f = Template.get('selectbox');
      scroll$2 = new create$o({
        mask: true,
        over: true
      });
      html$f.find('.selectbox__body').append(scroll$2.render());
      html$f.find('.selectbox__layer').on('click', function () {
        window.history.back();
      });
      $('body').append(html$f);
    }

    function bind$3() {
      scroll$2.clear();
      html$f.find('.selectbox__title').text(active$4.title);
      active$4.items.forEach(function (element) {
        if (element.hide) return;
        element.title = Utils.capitalizeFirstLetter(element.title || '');
        var item = Template.get(element.template || 'selectbox_item', element);
        if (!element.subtitle) item.find('.selectbox-item__subtitle').remove();

        if (element.checkbox) {
          item.addClass('selectbox-item--checkbox');
          item.append('<div class="selectbox-item__checkbox"></div>');
          if (element.checked) item.addClass('selectbox-item--checked');
        }

        if (element.ghost) item.css('opacity', 0.5);

        if (!element.noenter) {
          var goclose = function goclose() {
            if (!active$4.nohide) hide$1();
            if (active$4.onSelect) active$4.onSelect(element);
          };

          item.on('hover:enter', function () {
            if (element.checkbox) {
              element.checked = !element.checked;
              item.toggleClass('selectbox-item--checked', element.checked);
              if (active$4.onCheck) active$4.onCheck(element);
            } else if (active$4.onBeforeClose) {
              if (active$4.onBeforeClose()) goclose();
            } else goclose();
          }).on('hover:focus', function (e) {
            scroll$2.update($(e.target), true);
            if (active$4.onFocus) active$4.onFocus(element, e.target);
          }).on('hover:long', function (e) {
            if (active$4.onLong) active$4.onLong(element, e.target);
          });
        }

        if (element.selected) item.addClass('selected');
        scroll$2.append(item);
      });
    }

    function show$6(object) {
      active$4 = object;
      bind$3();
      $('body').toggleClass('selectbox--open', true);
      html$f.find('.selectbox__body').addClass('layer--wheight').data('mheight', html$f.find('.selectbox__head'));
      toggle$8();
    }

    function toggle$8() {
      Controller.add('select', {
        toggle: function toggle() {
          var selected = scroll$2.render().find('.selected');
          Controller.collectionSet(html$f);
          Controller.collectionFocus(selected.length ? selected[0] : false, html$f);
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        left: close$3,
        back: close$3
      });
      Controller.toggle('select');
    }

    function hide$1() {
      $('body').toggleClass('selectbox--open', false);
    }

    function close$3() {
      hide$1();
      if (active$4.onBack) active$4.onBack();
    }

    function render$b() {
      return html$f;
    }

    var Select = {
      init: init$o,
      show: show$6,
      hide: hide$1,
      close: close$3,
      render: render$b
    };

    function AVPlay(call_video) {
      var stream_url, loaded;
      var object = $('<object class="player-video_video" type="application/avplayer"</object>');
      var video = object[0];
      var listener = start$4();
      var change_scale_later;
      object.width(window.innerWidth);
      object.height(window.innerHeight);
      /**
       * Установить урл
       */

      Object.defineProperty(video, "src", {
        set: function set(url) {
          if (url) {
            stream_url = url;
            webapis.avplay.open(url);
            webapis.avplay.setDisplayRect(0, 0, window.innerWidth, window.innerHeight);
            webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');

            try {
              webapis.avplay.setSilentSubtitle(false);
            } catch (e) {}
          }
        },
        get: function get() {}
      });
      /**
       * Позиция
       */

      Object.defineProperty(video, "currentTime", {
        set: function set(t) {
          try {
            webapis.avplay.seekTo(t * 1000);
          } catch (e) {}
        },
        get: function get() {
          var d = 0;

          try {
            d = webapis.avplay.getCurrentTime();
          } catch (e) {}

          return d ? d / 1000 : 0;
        }
      });
      /**
       * Длительность
       */

      Object.defineProperty(video, "duration", {
        set: function set() {},
        get: function get() {
          var d = 0;

          try {
            d = webapis.avplay.getDuration();
          } catch (e) {}

          return d ? d / 1000 : 0;
        }
      });
      /**
       * Пауза
       */

      Object.defineProperty(video, "paused", {
        set: function set() {},
        get: function get() {
          try {
            return webapis.avplay.getState() == 'PAUSED';
          } catch (e) {
            return false;
          }
        }
      });
      /**
       * Аудиодорожки
       */

      Object.defineProperty(video, "audioTracks", {
        set: function set() {},
        get: function get() {
          try {
            var totalTrackInfo = webapis.avplay.getTotalTrackInfo();
            var tracks = totalTrackInfo.filter(function (track) {
              return track.type === 'AUDIO';
            }).map(function (track) {
              var info = JSON.parse(track.extra_info);
              var item = {
                extra: JSON.parse(track.extra_info),
                index: parseInt(track.index),
                language: info.language
              };
              Object.defineProperty(item, "enabled", {
                set: function set(v) {
                  if (v) {
                    try {
                      webapis.avplay.setSelectTrack('AUDIO', item.index);
                    } catch (e) {
                      console.log('Player', 'no change audio:', e.message);
                    }
                  }
                },
                get: function get() {}
              });
              return item;
            }).sort(function (a, b) {
              return a.index - b.index;
            });
            return tracks;
          } catch (e) {
            return [];
          }
        }
      });
      /**
       * Субтитры
       */

      Object.defineProperty(video, "textTracks", {
        set: function set() {},
        get: function get() {
          try {
            var totalTrackInfo = webapis.avplay.getTotalTrackInfo();
            var tracks = totalTrackInfo.filter(function (track) {
              return track.type === 'TEXT';
            }).map(function (track) {
              var info = JSON.parse(track.extra_info),
                  item = {
                extra: JSON.parse(track.extra_info),
                index: parseInt(track.index),
                language: info.track_lang
              };
              Object.defineProperty(item, "mode", {
                set: function set(v) {
                  if (v == 'showing') {
                    try {
                      webapis.avplay.setSelectTrack('TEXT', item.index);
                    } catch (e) {
                      console.log('Player', 'no change text:', e.message);
                    }
                  }
                },
                get: function get() {}
              });
              return item;
            }).sort(function (a, b) {
              return a.index - b.index;
            });
            return tracks;
          } catch (e) {
            return [];
          }
        }
      });
      /**
       * Ширина видео
       */

      Object.defineProperty(video, "videoWidth", {
        set: function set() {},
        get: function get() {
          var info = videoInfo();
          return info.Width || 0;
        }
      });
      /**
       * Высота видео
       */

      Object.defineProperty(video, "videoHeight", {
        set: function set() {},
        get: function get() {
          var info = videoInfo();
          return info.Height || 0;
        }
      });
      /**
       * Получить информацию о видео
       * @returns {object}
       */

      function videoInfo() {
        try {
          var info = webapis.avplay.getCurrentStreamInfo(),
              json = {};

          for (var i = 0; i < info.length; i++) {
            var detail = info[i];

            if (detail.type == 'VIDEO') {
              json = JSON.parse(detail.extra_info);
            }
          }

          return json;
        } catch (e) {
          return {};
        }
      }
      /**
       * Меняем размер видео
       * @param {string} scale - default|cover
       */


      function changeScale(scale) {
        try {
          if (scale == 'cover') {
            webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_FULL_SCREEN');
          } else {
            webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');
          }
        } catch (e) {
          change_scale_later = scale;
        }
      }
      /**
       * Всегда говорим да, мы можем играть
       */


      video.canPlayType = function () {
        return true;
      };
      /**
       * Вешаем кастомные события
       */


      video.addEventListener = listener.follow.bind(listener);
      /**
       * Вешаем события от плеера тайзен
       */

      webapis.avplay.setListener({
        onbufferingstart: function onbufferingstart() {
          console.log('Player', 'buffering start');
          listener.send('waiting');
        },
        onbufferingprogress: function onbufferingprogress(percent) {
          listener.send('progress', {
            percent: percent
          });
        },
        onbufferingcomplete: function onbufferingcomplete() {
          console.log('Player', 'buffering complete');
          listener.send('playing');
        },
        onstreamcompleted: function onstreamcompleted() {
          console.log('Player', 'stream completed');
          webapis.avplay.stop();
          listener.send('ended');
        },
        oncurrentplaytime: function oncurrentplaytime() {
          listener.send('timeupdate');

          if (change_scale_later) {
            change_scale_later = false;
            changeScale(change_scale_later);
          }
        },
        onerror: function onerror(eventType) {
          listener.send('error', {
            error: {
              code: 'tizen',
              message: eventType
            }
          });
        },
        onevent: function onevent(eventType, eventData) {
          console.log('Player', 'event type:', eventType, 'data:', eventData);
        },
        onsubtitlechange: function onsubtitlechange(duration, text, data3, data4) {
          listener.send('subtitle', {
            text: text
          });
        },
        ondrmevent: function ondrmevent(drmEvent, drmData) {}
      });
      /**
       * Загрузить
       */

      video.load = function () {
        if (stream_url) {
          webapis.avplay.prepareAsync(function () {
            loaded = true;
            webapis.avplay.play();

            try {
              webapis.avplay.setSilentSubtitle(false);
            } catch (e) {}

            listener.send('canplay');
            listener.send('playing');
            listener.send('loadedmetadata');
          }, function (e) {
            listener.send('error', {
              error: 'code [' + e.code + '] ' + e.message
            });
          });
        }
      };
      /**
       * Играть
       */


      video.play = function () {
        if (loaded) webapis.avplay.play();
      };
      /**
       * Пауза
       */


      video.pause = function () {
        if (loaded) webapis.avplay.pause();
      };
      /**
       * Установить масштаб
       */


      video.size = function (type) {
        changeScale(type);
      };
      /**
       * Уничтожить
       */


      video.destroy = function () {
        try {
          webapis.avplay.close();
        } catch (e) {}

        video.remove();
        listener.destroy();
      };

      call_video(video);
      return object;
    }

    function create$m(object) {
      this.state = object.state;

      this.start = function () {
        this.dispath(this.state);
      };

      this.dispath = function (action_name) {
        var action = object.transitions[action_name];

        if (action) {
          action.call(this);
        } else {
          console.log('invalid action');
        }
      };
    }

    var html$e;
    var listener$e = start$4();
    var state;
    var elems$1;
    var condition = {};
    var timer$7 = {};
    var tracks = [];
    var subs = [];
    var qualitys = false;

    function init$n() {
      html$e = Template.get('player_panel');
      elems$1 = {
        peding: $('.player-panel__peding', html$e),
        position: $('.player-panel__position', html$e),
        time: $('.player-panel__time', html$e),
        timenow: $('.player-panel__timenow', html$e),
        timeend: $('.player-panel__timeend', html$e),
        title: $('.player-panel__filename', html$e),
        tracks: $('.player-panel__tracks', html$e),
        subs: $('.player-panel__subs', html$e),
        timeline: $('.player-panel__timeline', html$e),
        quality: $('.player-panel__quality', html$e),
        episode: $('.player-panel__next-episode-name', html$e)
      };
      /**
       * Отсеживаем состояние, 
       * когда надо показать панель, а когда нет
       */

      state = new create$m({
        state: 'start',
        transitions: {
          start: function start() {
            clearTimeout(timer$7.hide);
            clearTimeout(timer$7.rewind);
            this.dispath('canplay');
          },
          canplay: function canplay() {
            if (condition.canplay) this.dispath('visible');else _visible(true);
          },
          visible: function visible() {
            if (condition.visible) _visible(true);else this.dispath('rewind');
          },
          rewind: function rewind() {
            var _this = this;

            clearTimeout(timer$7.rewind);

            if (condition.rewind) {
              _visible(true);

              timer$7.rewind = setTimeout(function () {
                condition.rewind = false;

                _this.dispath('mousemove');
              }, 1000);
            } else {
              this.dispath('mousemove');
            }
          },
          mousemove: function mousemove() {
            if (condition.mousemove) {
              _visible(true);
            }

            this.dispath('hide');
          },
          hide: function hide() {
            clearTimeout(timer$7.hide);
            timer$7.hide = setTimeout(function () {
              _visible(false);
            }, 3000);
          }
        }
      });
      html$e.find('.selector').on('hover:focus', function (e) {
      });
      html$e.find('.player-panel__playpause').on('hover:enter', function (e) {
        listener$e.send('playpause', {});
      });
      html$e.find('.player-panel__next').on('hover:enter', function (e) {
        listener$e.send('next', {});
      });
      html$e.find('.player-panel__prev').on('hover:enter', function (e) {
        listener$e.send('prev', {});
      });
      html$e.find('.player-panel__rprev').on('hover:enter', function (e) {
        listener$e.send('rprev', {});
      });
      html$e.find('.player-panel__rnext').on('hover:enter', function (e) {
        listener$e.send('rnext', {});
      });
      html$e.find('.player-panel__playlist').on('hover:enter', function (e) {
        listener$e.send('playlist', {});
      });
      html$e.find('.player-panel__tstart').on('hover:enter', function (e) {
        listener$e.send('to_start', {});
      });
      html$e.find('.player-panel__tend').on('hover:enter', function (e) {
        listener$e.send('to_end', {});
      });
      html$e.find('.player-panel__fullscreen').on('hover:enter', function (e) {
        listener$e.send('fullscreen', {});
      });
      html$e.find('.player-panel__share').on('hover:enter', function () {
        listener$e.send('share', {});
      });
      elems$1.timeline.attr('data-controller', 'player_rewind');
      elems$1.timeline.on('mousemove', function (e) {
        listener$e.send('mouse_rewind', {
          method: 'move',
          time: elems$1.time,
          percent: percent(e)
        });
      }).on('mouseout', function () {
        elems$1.time.addClass('hide');
      }).on('click', function (e) {
        listener$e.send('mouse_rewind', {
          method: 'click',
          time: elems$1.time,
          percent: percent(e)
        });
      });
      html$e.find('.player-panel__line:eq(1) .selector').attr('data-controller', 'player_panel');
      /**
       * Выбор качества
       */

      elems$1.quality.text('auto').on('hover:enter', function () {
        if (qualitys) {
          var qs = [];
          var nw = elems$1.quality.text();

          if (Arrays.isArray(qualitys)) {
            qs = qualitys;
          } else {
            for (var i in qualitys) {
              qs.push({
                title: i,
                url: qualitys[i],
                selected: nw == i
              });
            }
          }

          if (!qs.length) return;
          var enabled = Controller.enabled();
          Select.show({
            title: Lang.translate('player_quality'),
            items: qs,
            onSelect: function onSelect(a) {
              elems$1.quality.text(a.title);
              a.enabled = true;
              if (!Arrays.isArray(qualitys)) listener$e.send('quality', {
                name: a.title,
                url: a.url
              });
              Controller.toggle(enabled.name);
            },
            onBack: function onBack() {
              Controller.toggle(enabled.name);
            }
          });
        }
      });
      /**
       * Выбор аудиодорожки
       */

      elems$1.tracks.on('hover:enter', function (e) {
        if (tracks.length) {
          tracks.forEach(function (element, p) {
            var name = [];
            name.push(p + 1);
            name.push(element.language || element.name || 'Неизвестно');
            if (element.label) name.push(element.label);

            if (element.extra) {
              if (element.extra.channels) name.push('Каналов: ' + element.extra.channels);
              if (element.extra.fourCC) name.push('Тип: ' + element.extra.fourCC);
            }

            element.title = name.join(' / ');
          });
          var enabled = Controller.enabled();
          Select.show({
            title: Lang.translate('player_tracks'),
            items: tracks,
            onSelect: function onSelect(a) {
              tracks.forEach(function (element) {
                element.enabled = false;
                element.selected = false;
              });
              a.enabled = true;
              a.selected = true;
              Controller.toggle(enabled.name);
            },
            onBack: function onBack() {
              Controller.toggle(enabled.name);
            }
          });
        }
      });
      /**
       * Выбор субтитров
       */

      elems$1.subs.on('hover:enter', function (e) {
        if (subs.length) {
          if (subs[0].index !== -1) {
            var any_select = subs.find(function (s) {
              return s.selected;
            });
            Arrays.insert(subs, 0, {
              title: Lang.translate('player_disabled'),
              selected: any_select ? false : true,
              index: -1
            });
          }

          subs.forEach(function (element, p) {
            if (element.index !== -1) element.title = p + ' / ' + (element.language && element.label ? element.language + ' / ' + element.label : element.language || element.label || Lang.translate('player_unknown'));
          });
          var enabled = Controller.enabled();
          Select.show({
            title: Lang.translate('player_subs'),
            items: subs,
            onSelect: function onSelect(a) {
              subs.forEach(function (element) {
                element.mode = 'disabled';
                element.selected = false;
              });
              a.mode = 'showing';
              a.selected = true;
              listener$e.send('subsview', {
                status: a.index > -1
              });
              Controller.toggle(enabled.name);
            },
            onBack: function onBack() {
              Controller.toggle(enabled.name);
            }
          });
        }
      });
      /**
       * Выбор масштаба видео
       */

      html$e.find('.player-panel__size').on('hover:enter', function (e) {
        var select = Storage.get('player_size', 'default');
        var items = [{
          title: Lang.translate('player_size_default_title'),
          subtitle: Lang.translate('player_size_default_descr'),
          value: 'default',
          selected: select == 'default'
        }, {
          title: Lang.translate('player_size_cover_title'),
          subtitle: Lang.translate('player_size_cover_descr'),
          value: 'cover',
          selected: select == 'cover'
        }];

        if (!(Platform.is('tizen') && Storage.field('player') == 'tizen')) {
          items = items.concat([{
            title: Lang.translate('player_size_fill_title'),
            subtitle: Lang.translate('player_size_fill_descr'),
            value: 'fill',
            selected: select == 'fill'
          }, {
            title: Lang.translate('player_size_115_title'),
            subtitle: Lang.translate('player_size_115_descr'),
            value: 's115',
            selected: select == 's115'
          }, {
            title: Lang.translate('player_size_130_title'),
            subtitle: Lang.translate('player_size_130_descr'),
            value: 's130',
            selected: select == 's130'
          }, {
            title: Lang.translate('player_size_v115_title'),
            subtitle: Lang.translate('player_size_v115_descr'),
            value: 'v115',
            selected: select == 'v115'
          }, {
            title: Lang.translate('player_size_v130_title'),
            subtitle: Lang.translate('player_size_v130_descr'),
            value: 'v130',
            selected: select == 'v130'
          }]);
        } else {
          if (select == 's130' || select == 'fill') {
            items[0].selected = true;
          }
        }

        Select.show({
          title: Lang.translate('player_video_size'),
          items: items,
          onSelect: function onSelect(a) {
            listener$e.send('size', {
              size: a.value
            });
            Controller.toggle('player_panel');
          },
          onBack: function onBack() {
            Controller.toggle('player_panel');
          }
        });
      });
    }
    /**
     * Добавить контроллеры
     */


    function addController() {
      Controller.add('player_rewind', {
        toggle: function toggle() {
          Controller.collectionSet(render$a());
          Controller.collectionFocus(false, render$a());
        },
        up: function up() {
          Controller.toggle('player');
        },
        down: function down() {
          toggleButtons();
        },
        right: function right() {
          listener$e.send('rnext', {});
        },
        left: function left() {
          listener$e.send('rprev', {});
        },
        gone: function gone() {
          html$e.find('.selector').removeClass('focus');
        },
        back: function back() {
          Controller.toggle('player');
          hide();
        }
      });
      Controller.add('player_panel', {
        toggle: function toggle() {
          Controller.collectionSet(render$a());
          Controller.collectionFocus($('.player-panel__playpause', html$e)[0], render$a());
        },
        up: function up() {
          toggleRewind();
        },
        right: function right() {
          Navigator.move('right');
        },
        left: function left() {
          Navigator.move('left');
        },
        down: function down() {
          listener$e.send('playlist', {});
        },
        gone: function gone() {
          html$e.find('.selector').removeClass('focus');
        },
        back: function back() {
          Controller.toggle('player');
          hide();
        }
      });
    }
    /**
     * Рассчитать проценты
     * @param {object} e 
     * @returns {number}
     */


    function percent(e) {
      var offset = elems$1.timeline.offset();
      var width = elems$1.timeline.width();
      return (e.clientX - offset.left) / width;
    }
    /**
     * Обновляем состояние панели
     * @param {string} need - что нужно обновить
     * @param {string|number} value - значение
     */


    function update$8(need, value) {
      if (need == 'position') {
        elems$1.position.css({
          width: value
        });
      }

      if (need == 'peding') {
        elems$1.peding.css({
          width: value
        });
      }

      if (need == 'timeend') {
        elems$1.timeend.text(value);
      }

      if (need == 'timenow') {
        elems$1.timenow.text(value);
      }

      if (need == 'play') {
        html$e.toggleClass('panel--paused', false);
      }

      if (need == 'pause') {
        html$e.toggleClass('panel--paused', true);
      }
    }
    /**
     * Показать или скрыть панель
     * @param {boolean} status 
     */


    function _visible(status) {
      listener$e.send('visible', {
        status: status
      });
      html$e.toggleClass('panel--visible', status);
    }
    /**
     * Можем играть, далее отслеживаем статус
     */


    function canplay() {
      condition.canplay = true;
      state.start();
    }
    /**
     * Перемотка
     */


    function rewind$1() {
      condition.rewind = true;
      state.start();
    }
    /**
     * Переключить на контроллер перемотки
     */


    function toggleRewind() {
      Controller.toggle('player_rewind');
    }
    /**
     * Переключить на контроллер кнопки
     */


    function toggleButtons() {
      Controller.toggle('player_panel');
    }
    /**
     * Контроллер
     */


    function toggle$7() {
      condition.visible = true;
      state.start();
      toggleRewind();
    }
    /**
     * Показать панель
     */


    function show$5() {
      state.start();
      html$e.find('.player-panel__fullscreen').toggleClass('hide', Platform.tv());
      addController();
    }
    /**
     * Если двигали мышку
     */


    function mousemove() {
      condition.mousemove = true;
      state.start();
    }
    /**
     * Скрыть панель
     */


    function hide() {
      condition.visible = false;

      _visible(false);
    }
    /**
     * Установить субтитры
     * @param {[{index:integer, language:string, label:string}]} su 
     */


    function setSubs(su) {
      subs = su;
      elems$1.subs.toggleClass('hide', false);
    }
    /**
     * Установить дорожки
     * @param {[{index:integer, language:string, label:string}]} tr 
     */


    function setTracks(tr) {
      tracks = tr;
      elems$1.tracks.toggleClass('hide', false);
    }
    /**
     * Установить качество
     * @param {[{title:string, url:string}]} levels 
     * @param {string} current 
     */


    function setLevels(levels, current) {
      qualitys = levels;
      elems$1.quality.text(current);
    }
    /**
     * Показать текущие качество
     * @param {[{title:string, url:string}]} qs 
     * @param {string} url 
     */


    function quality(qs, url) {
      if (qs) {
        elems$1.quality.toggleClass('hide', false);
        qualitys = qs;

        for (var i in qs) {
          if (qs[i] == url) elems$1.quality.text(i);
        }
      }
    }
    /**
     * Показать название следующего эпизода 
     * @param {{position:integer, playlist:[{title:string, url:string}]}} e 
     */


    function showNextEpisodeName(e) {
      if (e.playlist[e.position + 1]) {
        elems$1.episode.text(e.playlist[e.position + 1].title).toggleClass('hide', false);
      } else elems$1.episode.toggleClass('hide', true);
    }
    /**
     * Уничтожить
     */


    function destroy$7() {
      condition = {};
      tracks = [];
      subs = [];
      qualitys = false;
      elems$1.peding.css({
        width: 0
      });
      elems$1.position.css({
        width: 0
      });
      elems$1.time.text('00:00');
      elems$1.timenow.text('00:00');
      elems$1.timeend.text('00:00');
      elems$1.quality.text('auto');
      elems$1.subs.toggleClass('hide', true);
      elems$1.tracks.toggleClass('hide', true);
      elems$1.episode.toggleClass('hide', true);
      html$e.toggleClass('panel--paused', false);
    }
    /**
     * Получить html
     * @returns {object}
     */


    function render$a() {
      return html$e;
    }

    var PlayerPanel = {
      init: init$n,
      listener: listener$e,
      render: render$a,
      toggle: toggle$7,
      show: show$5,
      destroy: destroy$7,
      hide: hide,
      canplay: canplay,
      update: update$8,
      rewind: rewind$1,
      setTracks: setTracks,
      setSubs: setSubs,
      setLevels: setLevels,
      mousemove: mousemove,
      quality: quality,
      showNextEpisodeName: showNextEpisodeName
    };

    var widgetAPI,
        tvKey,
        pluginAPI,
        orsay_loaded,
        orsay_call = Date.now();

    function init$m() {
      $('body').append($("<div style=\"position: absolute; left: -1000px; top: -1000px;\">\n    <object id=\"pluginObjectNNavi\" border=\"0\" classid=\"clsid:SAMSUNG-INFOLINK-NNAVI\" style=\"opacity: 0.0; background-color: #000; width: 1px; height: 1px;\"></object>\n    <object id=\"pluginObjectTVMW\" border=\"0\" classid=\"clsid:SAMSUNG-INFOLINK-TVMW\" style=\"opacity: 0.0; background-color: #000; width: 1px; height: 1px;\"></object>\n    <object id=\"pluginObjectSef\" border=\"0\" classid=\"clsid:SAMSUNG-INFOLINK-SEF\" style=\"opacity:0.0;background-color:#000;width:1px;height:1px;\"></object>\n</div>"));
      Utils.putScript(['$MANAGER_WIDGET/Common/API/Widget.js', '$MANAGER_WIDGET/Common/API/TVKeyValue.js', '$MANAGER_WIDGET/Common/API/Plugin.js'], function () {
        try {
          if (typeof Common !== 'undefined' && Common.API && Common.API.TVKeyValue && Common.API.Plugin && Common.API.Widget) {
            widgetAPI = new Common.API.Widget();
            tvKey = new Common.API.TVKeyValue();
            pluginAPI = new Common.API.Plugin();
            window.onShow = orsayOnshow;
            setTimeout(function () {
              orsayOnshow();
            }, 2000);
            widgetAPI.sendReadyEvent();
          } else {
            if (orsay_call + 5 * 1000 > Date.now()) setTimeout(orsayOnLoad, 50);
          }
        } catch (e) {}
      });
    }

    function orsayOnshow() {
      if (orsay_loaded) return;
      orsay_loaded = true;

      try {
        //Включает анимацию изменения громкости на ТВ и т.д.
        pluginAPI.SetBannerState(1); //Отключает перехват кнопок, этими кнопками управляет система ТВ

        pluginAPI.unregistKey(tvKey.KEY_INFO);
        pluginAPI.unregistKey(tvKey.KEY_TOOLS);
        pluginAPI.unregistKey(tvKey.KEY_MENU);
        pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
        pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
        pluginAPI.unregistKey(tvKey.KEY_MUTE);
      } catch (e) {}
    }

    function exit() {
      widgetAPI.sendReturnEvent();
    }

    var Orsay = {
      init: init$m,
      exit: exit
    };

    var enabled$2 = false;
    var listener$d = start$4();
    var lastdown = 0;
    var timer$6;
    var longpress;

    function toggle$6(new_status) {
      enabled$2 = new_status;
      listener$d.send('toggle', {
        status: enabled$2
      });
    }

    function enable$2() {
      toggle$6(true);
    }

    function disable$1() {
      toggle$6(false);
    }

    function isEnter(keycode) {
      return keycode == 13 || keycode == 29443 || keycode == 117 || keycode == 65385;
    }

    function keyCode(e) {
      var keycode;

      if (window.event) {
        keycode = e.keyCode;
      } else if (e.which) {
        keycode = e.which;
      }

      return keycode;
    }

    function init$l() {
      window.addEventListener("keydown", function (e) {
        lastdown = keyCode(e);

        if (!timer$6) {
          timer$6 = setTimeout(function () {
            if (isEnter(lastdown)) {
              longpress = true;
              listener$d.send('longdown', {});
              Controller["long"]();
            }
          }, 800);
        }
      });
      window.addEventListener("keyup", function (e) {
        clearTimeout(timer$6);
        timer$6 = null;
        listener$d.send('keyup', {
          code: keyCode(e),
          enabled: enabled$2,
          event: e
        });

        if (!longpress) {
          if (isEnter(keyCode(e)) && !e.defaultPrevented) Controller.enter();
        } else longpress = false;
      });
      window.addEventListener("keydown", function (e) {
        var keycode = keyCode(e);
        listener$d.send('keydown', {
          code: keycode,
          enabled: enabled$2,
          event: e
        });
        if (e.defaultPrevented) return;
        if (isEnter(keycode)) return;
        if (!enabled$2) return; //отключить все
        //4 - Samsung orsay

        if (keycode == 37 || keycode == 4) {
          Controller.move('left');
        } //29460 - Samsung orsay


        if (keycode == 38 || keycode == 29460) {
          Controller.move('up');
        } //5 - Samsung orsay


        if (keycode == 39 || keycode == 5) {
          Controller.move('right');
        } //5 - Samsung orsay
        //29461 - Samsung orsay


        if (keycode == 40 || keycode == 29461) {
          Controller.move('down');
        } //33 - LG; 427 - Samsung


        if (keycode == 33 || keycode == 427) {
          Controller.move('toup');
        } //34 - LG; 428 - Samsung


        if (keycode == 34 || keycode == 428) {
          Controller.move('todown');
        } //Абсолютный Enter
        //10252 - Samsung tizen


        if (keycode == 32 || keycode == 179 || keycode == 10252) {
          Controller.trigger('playpause');
        } //Samsung media
        //71 - Samsung orsay


        if (keycode == 415 || keycode == 71) {
          Controller.trigger('play');
        } //Samsung stop


        if (keycode == 413) {
          Controller.trigger('stop');
        } //69 - Samsung orsay


        if (keycode == 412 || keycode == 69 || keycode == 177) {
          Controller.trigger('rewindBack');
        } //72 - Samsung orsay


        if (keycode == 418 || keycode == 417 || keycode == 72 || keycode == 176) {
          Controller.trigger('rewindForward');
        } //74 - Samsung orsay


        if (keycode == 19 || keycode == 74) {
          Controller.trigger('pause');
        }

        if (keycode == 457) {
          Controller.trigger('info');
        } //E-Manual


        if (keycode == 10146) {
          e.preventDefault();
        }

        if (keycode == 10133) {
          Controller.toggle('settings');
        } //Кнопка назад
        //8 - браузер
        //27
        //461 - LG
        //10009 - Samsung
        //88 - Samsung orsay


        if (keycode == 8 || keycode == 27 || keycode == 461 || keycode == 10009 || keycode == 88) {
          e.preventDefault();
          Activity$1.back();
          return false;
        } //Exit orsay


        if (keycode == 45) {
          Orsay.exit();
        }

        e.preventDefault();
      });
    }

    var Keypad = {
      listener: listener$d,
      init: init$l,
      enable: enable$2,
      disable: disable$1
    };

    var subparams;

    var listener$c = function listener(e) {
      if (e.code == 405) getWebosmediaId(setSubtitleColor);
      if (e.code == 406) getWebosmediaId(setSubtitleBackgroundColor);
      if (e.code == 403) getWebosmediaId(setSubtitleFontSize);
      if (e.code == 404) getWebosmediaId(setSubtitlePosition);
      if (e.code == 55) getWebosmediaId(setSubtitleBackgroundOpacity);
      if (e.code == 57) getWebosmediaId(setSubtitleCharacterOpacity);
    };

    Keypad.listener.follow('keydown', listener$c);

    function luna$1(params, call, fail) {
      if (call) params.onSuccess = call;

      params.onFailure = function (result) {
        console.log('WebOS', params.method + " [fail][" + result.errorCode + "] " + result.errorText);
        if (fail) fail();
      };

      webOS.service.request("luna://com.webos.media", params);
    }

    function initStorage() {
      if (!subparams) {
        subparams = Storage.get('webos_subs_params', '{}');
        Arrays.extend(subparams, {
          color: 2,
          font_size: 1,
          bg_color: 'black',
          position: -1,
          bg_opacity: 0,
          char_opacity: 255
        });
      }
    }

    function subCallParams(mediaId, method, func_params) {
      var parameters = {
        mediaId: mediaId
      };
      Arrays.extend(parameters, func_params);
      luna$1({
        parameters: parameters,
        method: method
      });
      Storage.set('webos_subs_params', subparams);
    }

    function getWebosmediaId(func) {
      var video = document.querySelector('video');

      if (video && video.mediaId) {
        initStorage();
        setTimeout(function () {
          subCallParams(video.mediaId, func.name, func());
        }, 300);
      }
    }

    function setSubtitleColor() {
      subparams.color++;
      if (subparams.color == 6) subparams.color = 0;
      return {
        color: subparams.color
      };
    }

    function setSubtitleBackgroundColor() {
      var bgcolors = ['black', 'white', 'yellow', 'red', 'green', 'blue'];
      var ixcolors = bgcolors.indexOf(subparams.bg_color);
      ixcolors++;
      if (ixcolors == -1) ixcolors = 0;
      subparams.bg_color = bgcolors[ixcolors];
      return {
        bgColor: subparams.bg_color
      };
    }

    function setSubtitleFontSize() {
      subparams.font_size++;
      if (subparams.font_size == 5) subparams.font_size = 0;
      return {
        fontSize: subparams.font_size
      };
    }

    function setSubtitlePosition() {
      subparams.position++;
      if (subparams.position == 5) subparams.position = -3;
      return {
        position: subparams.position
      };
    }

    function setSubtitleBackgroundOpacity() {
      subparams.bg_opacity += 15;
      if (subparams.bg_opacity > 255) subparams.bg_opacity = 0;
      return {
        bgOpacity: subparams.bg_opacity
      };
    }

    function setSubtitleCharacterOpacity() {
      subparams.char_opacity += 15;
      if (subparams.char_opacity > 255) subparams.char_opacity = 0;
      return {
        charOpacity: subparams.char_opacity
      };
    }

    function initialize() {
      var video = document.querySelector('video');

      if (video && video.mediaId) {
        initStorage();
        var methods = ['setSubtitleColor', 'setSubtitleBackgroundColor', 'setSubtitleFontSize', 'setSubtitlePosition', 'setSubtitleBackgroundOpacity', 'setSubtitleCharacterOpacity'];
        var parameters = {
          mediaId: video.mediaId,
          color: subparams.color,
          bgColor: subparams.bg_color,
          position: subparams.position,
          fontSize: subparams.font_size,
          bgOpacity: subparams.bg_opacity,
          charOpacity: subparams.char_opacity
        };
        Arrays.extend(parameters, subparams);
        methods.forEach(function (method) {
          luna$1({
            parameters: parameters,
            method: method
          });
        });
      }
    }

    var WebosSubs = {
      initialize: initialize
    };

    /**
     * Для запросов в луну
     * @param {object} params 
     * @param {function} call 
     * @param {function} fail 
     */

    function luna(params, call, fail) {
      if (call) params.onSuccess = call;

      params.onFailure = function (result) {
        console.log('WebOS', params.method + " [fail][" + result.errorCode + "] " + result.errorText);
        if (fail) fail();
      };

      webOS.service.request("luna://com.webos.media", params);
    }

    function create$l(_video) {
      var video = _video;
      var media_id;
      var subtitle_visible = false;
      var timer;
      var timer_repet;
      var count = 0;
      var count_message = 0;
      var data = {
        subs: [],
        tracks: []
      };
      this.subscribed = false;
      this.repeted = false;
      /**
       * Начинаем поиск видео
       */

      this.start = function () {
        timer = setInterval(this.search.bind(this), 300);
      };
      /**
       * Включить/выключить сабы
       * @param {boolean} status 
       */


      this.toggleSubtitles = function (status) {
        subtitle_visible = status;
        luna({
          method: 'setSubtitleEnable',
          parameters: {
            'mediaId': media_id,
            'enable': status
          }
        });
        if (status) WebosSubs.initialize();
      };
      /**
       * Получили сабы, выводим в панель
       * @param {object} info 
       */


      this.subtitles = function (info) {
        var _this = this;

        if (info.numSubtitleTracks) {
          var all = [];

          var add = function add(sub, index) {
            sub.index = index;
            sub.language = sub.language == '(null)' ? '' : sub.language;
            Object.defineProperty(sub, 'mode', {
              set: function set(v) {
                if (v == 'showing') {
                  _this.toggleSubtitles(sub.index == -1 ? false : true);

                  console.log('WebOS', 'change subtitles for id: ', media_id, ' index:', sub.index);

                  if (sub.index !== -1) {
                    setTimeout(function () {
                      luna({
                        method: 'selectTrack',
                        parameters: {
                          'type': 'text',
                          'mediaId': media_id,
                          'index': sub.index
                        }
                      });
                    }, 500);
                  }
                }
              },
              get: function get() {}
            });
            all.push(sub);
          };

          add({
            title: Lang.translate('player_disabled'),
            selected: true
          }, -1);

          for (var i = 0; i < info.subtitleTrackInfo.length; i++) {
            add(info.subtitleTrackInfo[i], i);
          }

          data.subs = all;
          PlayerVideo.listener.send('webos_subs', {
            subs: data.subs
          });
          PlayerPanel.setSubs(data.subs);
        }
      };
      /**
       * Получили дорожки, выводим в панель
       * @param {object} info 
       */


      this.tracks = function (info) {
        if (info.numAudioTracks) {
          var all = [];

          var add = function add(track, index) {
            track.index = index;
            track.selected = index == -1;
            track.extra = {
              channels: track.channels,
              fourCC: track.codec
            };
            Object.defineProperty(track, 'enabled', {
              set: function set(v) {
                if (v) {
                  console.log('WebOS', 'change audio for id:', media_id, ' index:', track.index);
                  luna({
                    method: 'selectTrack',
                    parameters: {
                      'type': 'audio',
                      'mediaId': media_id,
                      'index': track.index
                    }
                  });

                  if (video.audioTracks) {
                    for (var i = 0; i < video.audioTracks.length; i++) {
                      video.audioTracks[i].enabled = false;
                    }

                    if (video.audioTracks[track.index]) {
                      video.audioTracks[track.index].enabled = true;
                      console.log('WebOS', 'change audio two method:', track.index);
                    }
                  }
                }
              },
              get: function get() {}
            });
            all.push(track);
          };

          for (var i = 0; i < info.audioTrackInfo.length; i++) {
            add(info.audioTrackInfo[i], i);
          }

          data.tracks = all;
          PlayerVideo.listener.send('webos_tracks', {
            tracks: data.tracks
          });
          PlayerPanel.setTracks(data.tracks, true);
        }
      };
      /**
       * Подписываемся на видео и ждем события
       */


      this.subscribe = function () {
        var _this2 = this;

        this.subscribed = true;
        luna({
          method: 'subscribe',
          parameters: {
            'mediaId': media_id,
            'subscribe': true
          }
        }, function (result) {
          if (result.sourceInfo && !_this2.sourceInfo) {
            _this2.sourceInfo = true;
            var info = result.sourceInfo.programInfo[0];

            _this2.subtitles(info);

            _this2.tracks(info);

            _this2.unsubscribe();

            _this2.call();
          }

          if (result.bufferRange) {
            count_message++;

            if (count_message == 30) {
              _this2.unsubscribe();

              _this2.call();
            }
          }
        }, function () {
          _this2.call();
        });
      };
      /**
       * Отписка от видео
       */


      this.unsubscribe = function () {
        luna({
          method: 'unload',
          parameters: {
            'mediaId': media_id
          }
        });
      };
      /**
       * Сканируем наличия видео
       */


      this.search = function () {
        var _this3 = this;

        count++;

        if (count > 3) {
          clearInterval(timer);
          clearInterval(timer_repet);
        }

        var rootSubscribe = function rootSubscribe() {
          console.log('WebOS', 'Run root', 'version:', webOS.sdk_version);

          _this3.toggleSubtitles(false);

          if (_this3.subscribed) clearInterval(timer_repet);
          if (!_this3.subscribed) _this3.subscribe();else {
            if (data.tracks.length) {
              PlayerVideo.listener.send('webos_tracks', {
                tracks: data.tracks
              });
              PlayerPanel.setTracks(data.tracks, true);
            }

            if (data.subs.length) {
              PlayerVideo.listener.send('webos_subs', {
                subs: data.subs
              });
              PlayerPanel.setSubs(data.subs);
            }
          }
          clearInterval(timer);
        };

        console.log('WebOS', 'try get id:', video.mediaId);

        if (video.mediaId) {
          media_id = video.mediaId;
          console.log('WebOS', 'video id:', media_id);
          rootSubscribe();
        }
      };
      /**
       * Вызываем и завершаем работу
       */


      this.call = function () {
        if (this.callback) this.callback();
        this.callback = false;
      };
      /**
       * Создаем новое видео
       * @param {object} new_video 
       */


      this.repet = function (new_video) {
        video = new_video;
        console.log('WebOS', 'repeat to new video', new_video ? true : false);
        media_id = '';
        clearInterval(timer);
        count = 0;
        this.repeted = true;
        timer_repet = setInterval(this.search.bind(this), 300);
      };
      /**
       * После перемотки включаем состояние сабов
       */


      this.rewinded = function () {
        this.toggleSubtitles(subtitle_visible);
      };
      /**
       * Уничтожить
       */


      this.destroy = function () {
        clearInterval(timer);
        clearInterval(timer_repet);
        if (media_id) this.unsubscribe();
        data = null;
        this.subscribed = false;
        this.callback = false;
      };
    }

    /**
     * Поучить время
     * @param {string} val 
     * @returns {number}
     */

    function time$1(val) {
      var regex = /(\d+):(\d{2}):(\d{2})/;
      var parts = regex.exec(val);
      if (parts === null) return 0;

      for (var i = 1; i < 5; i++) {
        parts[i] = parseInt(parts[i], 10);
        if (isNaN(parts[i])) parts[i] = 0;
      } //hours + minutes + seconds + ms


      return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000;
    }
    /**
     * Парсить
     * @param {string} data 
     * @param {boolean} ms 
     * @returns 
     */


    function parse$2(data, ms) {
      if (/WEBVTT/gi.test(data)) return parseVTT(data, ms);else return parseSRT(data, ms);
    }
    /**
     * Парсить SRT
     * @param {string} data 
     * @param {boolean} ms 
     * @returns {[{id:string, startTime:number, endTime:number, text:string}]}
     */


    function parseSRT(data, ms) {
      var useMs = ms ? true : false;
      data = data.replace(/\r/g, '');
      var regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
      data = data.split(regex);
      data.shift();
      var items = [];

      for (var i = 0; i < data.length; i += 4) {
        items.push({
          id: data[i].trim(),
          startTime: useMs ? time$1(data[i + 1].trim()) : data[i + 1].trim(),
          endTime: useMs ? time$1(data[i + 2].trim()) : data[i + 2].trim(),
          text: data[i + 3].trim()
        });
      }

      return items;
    }
    /**
     * Парсить VTT
     * @param {string} data 
     * @param {boolean} ms
     * @returns {[{id:string, startTime:number, endTime:number, text:string}]}
     */


    function parseVTT(data, ms) {
      var useMs = ms ? true : false;
      data = data.replace(/WEBVTT/gi, '').trim();
      data = data.replace(/\r/g, '');
      data = data.replace(/(\d+):(\d+)\.(\d+) --> (\d+):(\d+)\.(\d+)/g, '00:$1:$2.$3 --> 00:$4:$5.$6');
      var regex = /(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/g;
      data = data.split(regex);
      data.shift();
      var items = [];

      for (var i = 0; i < data.length; i += 3) {
        items.push({
          id: data[i].trim(),
          startTime: useMs ? time$1(data[i + 0].trim()) : data[i + 0].trim(),
          endTime: useMs ? time$1(data[i + 1].trim()) : data[i + 1].trim(),
          text: data[i + 2].trim()
        });
      }

      return items;
    }
    /**
     * Класс
     */


    function CustomSubs() {
      var parsed;
      var network = new create$p();
      this.listener = start$4();
      /**
       * Загрузить
       * @param {string} url 
       */

      this.load = function (url) {
        network.silent(url, function (data) {
          if (data) {
            parsed = parse$2(data, true);
          }
        }, false, false, {
          dataType: 'text'
        });
      };
      /**
       * Показать текст
       * @param {number} time_sec 
       */


      this.update = function (time_sec) {
        var time_ms = time_sec * 1000;

        if (parsed) {
          var text = '';

          for (var i = 0; i < parsed.length; i++) {
            var sub = parsed[i];

            if (time_ms > sub.startTime && time_ms < sub.endTime) {
              text = sub.text.replace("\n", '<br>');
              break;
            }
          }

          this.listener.send('subtitle', {
            text: text.trim()
          });
        }
      };
      /**
       * Уничтожить
       */


      this.destroy = function () {
        network.clear();
        network = null;
        this.listener = null;
      };
    }

    var context;

    function smooth(a, b, s, c) {
      return a + (b - a) * (s * 0.02);
    }

    function toDb(_float) {
      var db = 20 * (Math.log(_float) / Math.log(10));
      db = Math.max(-48, Math.min(db, 0));
      return db;
    }

    function Source(video) {
      var source = context.createMediaElementSource(video);
      var analyser = context.createAnalyser();
      var volume = context.createGain();
      var destroy = false;
      var display = true;
      var draw_html = $('<div class="normalization normalization--visible"><canvas></canvas></div>');
      var draw_canvas = draw_html.find('canvas')[0];
      var draw_context = draw_canvas.getContext("2d");
      draw_canvas.width = 5;
      draw_canvas.height = 200; //размер буффера

      try {
        analyser.fftSize = 2048 * 4;
      } catch (e) {
        try {
          analyser.fftSize = 2048 * 2;
        } catch (e) {
          analyser.fftSize = 2048;
        }
      } //данные от анализа


      analyser.time_array = new Uint8Array(analyser.fftSize); //нижний порог

      analyser.min_db = 0; //уровень для бара

      analyser.draw_db = 0; //подключаем анализ

      source.connect(analyser); //подключаем регулятор звука

      analyser.connect(volume); //подключаем к выходу

      volume.connect(context.destination);
      $('body').append(draw_html);

      function update() {
        if (!destroy) requestAnimationFrame(update);
        analyser.getByteTimeDomainData(analyser.time_array);
        var total = 0,
            rms = 0,
            i = 0;

        var _float2, mdb;

        var min = -48;

        while (i < analyser.fftSize) {
          _float2 = analyser.time_array[i++] / 0x80 - 1;
          total += _float2 * _float2;
          rms = Math.max(rms, _float2);
          mdb = toDb(_float2);
          if (!isNaN(mdb)) min = Math.max(min, mdb);
        }

        rms = Math.sqrt(total / analyser.fftSize);
        analyser.min_db = smooth(analyser.min_db, min, 20);
        var db = toDb(rms);
        var low = -48 - analyser.min_db;
        volume.gain.value = Math.max(0.0, Math.min(2, db / low));
        analyser.draw_db = smooth(analyser.draw_db, volume.gain.value, 5);

        if (display) {
          draw_context.clearRect(0, 0, draw_canvas.width, draw_canvas.height);
          var down = Math.min(1, Math.max(0, 1 - analyser.draw_db));
          var up = Math.min(1, Math.max(0, analyser.draw_db - 1));
          var half = draw_canvas.height / 2;
          draw_context.fillStyle = 'rgba(251,91,91,1)';
          draw_context.fillRect(0, half, draw_canvas.width, half * down);
          draw_context.fillStyle = 'rgba(91,213,251,1)';
          draw_context.fillRect(0, half - half * up, draw_canvas.width, half * up);
        }
      }

      update();

      this.visible = function (status) {
        display = status;
        draw_html.toggleClass('normalization--visible', status);
      };

      this.destroy = function () {
        volume.disconnect();
        analyser.disconnect();
        source.disconnect();
        destroy = true;
        draw_html.remove();
      };
    }

    function Normalization() {

      if (!context) {
        var classContext = window.AudioContext || window.webkitAudioContext;
        context = new classContext();
      }

      var source;

      this.attach = function (video) {
        if (!source) source = new Source(video);
      };

      this.visible = function (status) {
        if (source) source.visible(status);
      };

      this.destroy = function () {
        source.destroy();
        source = null;
      };
    }

    var listener$b = start$4();
    var html$d;
    var display;
    var paused;
    var subtitles$1;
    var timer$5 = {};
    var params = {};
    var rewind_position = 0;
    var rewind_force = 0;
    var last_mutation = 0;
    var customsubs;

    var _video;

    var wait;
    var neeed_sacle;
    var neeed_sacle_last;
    var webos;
    var hls;
    var webos_wait = {};
    var normalization;

    function init$k() {
      html$d = Template.get('player_video');
      display = html$d.find('.player-video__display');
      paused = html$d.find('.player-video__paused');
      subtitles$1 = html$d.find('.player-video__subtitles');
      html$d.on('click', function () {
        if (Storage.field('navigation_type') == 'mouse') playpause();
      });
      $(window).on('resize', function () {
        if (_video) {
          neeed_sacle = neeed_sacle_last;
          scale();
        }
      });
      /**
       * Специально для вебось
       */

      listener$b.follow('webos_subs', function (data) {
        webos_wait.subs = convertToArray(data.subs);
      });
      listener$b.follow('webos_tracks', function (data) {
        webos_wait.tracks = convertToArray(data.tracks);
      });
    }
    /**
     * Переключаем субтитры с предыдущей серии
     */


    function webosLoadSubs() {
      var subs = webos_wait.subs;
      _video.webos_subs = subs;
      var inx = params.sub + 1;

      if (typeof params.sub !== 'undefined' && subs[inx]) {
        subs.forEach(function (e) {
          e.mode = 'disabled';
          e.selected = false;
        });
        subs[inx].mode = 'showing';
        subs[inx].selected = true;
        console.log('WebOS', 'enable subs', inx);
        subsview(true);
      } else if (Storage.field('subtitles_start')) {
        var full = subs.find(function (s) {
          return (s.label || '').indexOf('олные') >= 0;
        });
        subs[0].selected = false;

        if (full) {
          full.mode = 'showing';
          full.selected = true;
        } else {
          subs[1].mode = 'showing';
          subs[1].selected = true;
        }

        subsview(true);
      }
    }
    /**
     * Переключаем дорожки с предыдущей серии
     */


    function webosLoadTracks() {
      var tracks = webos_wait.tracks;
      _video.webos_tracks = tracks;

      if (typeof params.track !== 'undefined' && tracks[params.track]) {
        tracks.forEach(function (e) {
          return e.selected = false;
        });
        console.log('WebOS', 'enable tracks', params.track);
        tracks[params.track].enabled = true;
        tracks[params.track].selected = true;
      }
    }
    /**
     * Добовляем события к контейнеру
     */


    function bind$2() {
      // ждем загрузки
      _video.addEventListener("waiting", function () {
        loader(true);
      }); // начали играть


      _video.addEventListener("playing", function () {
        loader(false);
      }); // видео закончилось


      _video.addEventListener('ended', function () {
        listener$b.send('ended', {});
      }); // что-то пошло не так


      _video.addEventListener('error', function (e) {
        var error = _video.error || {};
        var msg = (error.message || '').toUpperCase();

        if (msg.indexOf('EMPTY SRC') == -1) {
          if (error.code == 3) {
            listener$b.send('error', {
              error: Lang.translate('player_error_one')
            });
          } else if (error.code == 4) {
            listener$b.send('error', {
              error: Lang.translate('player_error_two')
            });
          } else if (typeof error.code !== 'undefined') {
            listener$b.send('error', {
              error: 'code [' + error.code + '] details [' + msg + ']'
            });
          }
        }
      }); // прогресс буферизации


      _video.addEventListener('progress', function (e) {
        if (e.percent) {
          listener$b.send('progress', {
            down: e.percent
          });
        } else {
          var duration = _video.duration;

          if (duration > 0) {
            for (var i = 0; i < _video.buffered.length; i++) {
              if (_video.buffered.start(_video.buffered.length - 1 - i) < _video.currentTime) {
                var down = Math.max(0, Math.min(100, _video.buffered.end(_video.buffered.length - 1 - i) / duration * 100)) + "%";
                listener$b.send('progress', {
                  down: down
                });
                break;
              }
            }
          }
        }
      }); // можно ли уже проигрывать?


      _video.addEventListener('canplay', function () {
        listener$b.send('canplay', {});
      }); // сколько прошло


      _video.addEventListener('timeupdate', function () {
        listener$b.send('timeupdate', {
          duration: _video.duration,
          current: _video.currentTime
        });
        listener$b.send('videosize', {
          width: _video.videoWidth,
          height: _video.videoHeight
        });
        scale();
        mutation();
        if (customsubs) customsubs.update(_video.currentTime);
      }); // обновляем субтитры


      _video.addEventListener('subtitle', function (e) {
        //В srt существует тег {\anX}, где X - цифра от 1 до 9, Тег определяет нестандартное положение субтитра на экране.
        //Здесь удаляется тег из строки и обрабатывается положение 8 (субтитр вверху по центру).
        //{\an8} используется когда нужно, чтобы субтитр не перекрывал надписи в нижней части экрана или субтитры вшитые в видеоряд.
        subtitles$1.removeClass('on-top');
        var posTag = e.text.match(/^{\\an(\d)}/);

        if (posTag) {
          e.text = e.text.replace(/^{\\an(\d)}/, '');

          if (posTag[1] && parseInt(posTag[1]) === 8) {
            subtitles$1.addClass('on-top');
          }
        }

        e.text = e.text.trim();
        $('> div', subtitles$1).html(e.text ? e.text : '&nbsp;').css({
          display: e.text ? 'inline-block' : 'none'
        });
      }); //получены первые данные


      _video.addEventListener('loadedmetadata', function (e) {
        listener$b.send('videosize', {
          width: _video.videoWidth,
          height: _video.videoHeight
        });
        scale();
        loaded$1();
      }); // для страховки


      _video.volume = 1;
      _video.muted = false;
    }
    /**
     * Может поможет избавится от скринсейва
     */


    function mutation() {
      if (last_mutation < Date.now() - 5000) {
        var style = _video.style;
        style.top = style.top;
        style.left = style.left;
        style.width = style.width;
        style.height = style.height;
        last_mutation = Date.now();
      }
    }
    /**
     * Конвертировать object to array
     * @param {object[]} arr 
     * @returns {array}
     */


    function convertToArray(arr) {
      if (!Arrays.isArray(arr)) {
        var new_arr = [];

        for (var index = 0; index < arr.length; index++) {
          new_arr.push(arr[index]);
        }

        arr = new_arr;
      }

      return arr;
    }
    /**
     * Масштаб видео
     */


    function scale() {
      if (!neeed_sacle) return;
      var vw = _video.videoWidth,
          vh = _video.videoHeight,
          rt = 1,
          sx = 1.00,
          sy = 1.00;
      if (vw == 0 || vh == 0 || typeof vw == 'undefined') return;

      var increase = function increase(sfx, sfy) {
        rt = Math.min(window.innerWidth / vw, window.innerHeight / vh);
        sx = sfx;
        sy = sfy;
      };

      if (neeed_sacle == 'default') {
        rt = Math.min(window.innerWidth / vw, window.innerHeight / vh);
      } else if (neeed_sacle == 'fill') {
        rt = Math.min(window.innerWidth / vw, window.innerHeight / vh);
        sx = window.innerWidth / (vw * rt);
        sy = window.innerHeight / (vh * rt);
      } else if (neeed_sacle == 's115') {
        increase(1.15, 1.15);
      } else if (neeed_sacle == 's130') {
        increase(1.34, 1.34);
      } else if (neeed_sacle == 'v115') {
        increase(1.01, 1.15);
      } else if (neeed_sacle == 'v130') {
        increase(1.01, 1.34);
      } else {
        rt = Math.min(window.innerWidth / vw, window.innerHeight / vh);
        vw = vw * rt;
        vh = vh * rt;
        rt = Math.max(window.innerWidth / vw, window.innerHeight / vh);
        sx = rt;
        sy = rt;
      }

      sx = sx.toFixed(2);
      sy = sy.toFixed(2);

      if (Platform.is('orsay') || Storage.field('player_scale_method') == 'calculate') {
        var nw = vw * rt,
            nh = vh * rt;
        var sz = {
          width: Math.round(nw * sx) + 'px',
          height: Math.round(nh * sy) + 'px',
          marginLeft: Math.round(window.innerWidth / 2 - nw * sx / 2) + 'px',
          marginTop: Math.round(window.innerHeight / 2 - nh * sy / 2) + 'px'
        };
      } else {
        var sz = {
          width: Math.round(window.innerWidth) + 'px',
          height: Math.round(window.innerHeight) + 'px',
          transform: sx == 1.00 ? 'unset' : 'scaleX(' + sx + ') scaleY(' + sy + ')'
        };
      }

      $(_video).css(sz);
      neeed_sacle = false;
    }
    /**
     * Сохранить текущие состояние дорожек и сабов
     * @returns {{sub:integer, track:integer, level:integer}}
     */


    function saveParams() {
      var subs = _video.customSubs || _video.webos_subs || _video.textTracks || [];
      var tracks = [];
      if (hls && hls.audioTracks && hls.audioTracks.length) tracks = hls.audioTracks;else if (_video.audioTracks && _video.audioTracks.length) tracks = _video.audioTracks;
      if (webos && webos.sourceInfo) tracks = _video.webos_tracks || [];

      if (tracks.length) {
        for (var i = 0; i < tracks.length; i++) {
          if (tracks[i].enabled == true || tracks[i].selected == true) params.track = i;
        }
      }

      if (subs.length) {
        for (var _i = 0; _i < subs.length; _i++) {
          if (subs[_i].enabled == true || subs[_i].selected == true) {
            params.sub = subs[_i].index;
          }
        }
      }

      if (hls && hls.levels) params.level = hls.currentLevel;
      console.log('WebOS', 'saved params', params);
      return params;
    }
    /**
     * Очисить состояние
     */


    function clearParamas() {
      params = {};
    }
    /**
     * Загрузитьновое состояние из прошлого
     * @param {{sub:integer, track:integer, level:integer}} saved_params 
     */


    function setParams(saved_params) {
      params = saved_params;
    }
    /**
     * Смотрим есть ли дорожки и сабы
     */


    function loaded$1() {
      var tracks = [];
      var subs = _video.customSubs || _video.textTracks || [];
      console.log('WebOS', 'video full loaded');
      if (hls) console.log('Player', 'hls test', hls.audioTracks.length);

      if (hls && hls.audioTracks && hls.audioTracks.length) {
        tracks = hls.audioTracks;
        tracks.forEach(function (track) {
          if (hls.audioTrack == track.id) track.selected = true;
          Object.defineProperty(track, "enabled", {
            set: function set(v) {
              if (v) hls.audioTrack = track.id;
            },
            get: function get() {}
          });
        });
      } else if (_video.audioTracks && _video.audioTracks.length) tracks = _video.audioTracks;

      console.log('Player', 'tracks', _video.audioTracks);

      if (webos && webos.sourceInfo) {
        tracks = [];
        if (webos_wait.tracks) webosLoadTracks();
        if (webos_wait.subs) webosLoadSubs();
      }

      if (tracks.length) {
        tracks = convertToArray(tracks);

        if (typeof params.track !== 'undefined' && tracks[params.track]) {
          tracks.forEach(function (e) {
            e.selected = false;
          });
          tracks[params.track].enabled = true;
          tracks[params.track].selected = true;
          console.log('WebOS', 'enable track by default');
        }

        listener$b.send('tracks', {
          tracks: tracks
        });
      }

      if (subs.length) {
        subs = convertToArray(subs);

        if (typeof params.sub !== 'undefined' && subs[params.sub]) {
          subs.forEach(function (e) {
            e.mode = 'disabled';
            e.selected = false;
          });
          subs[params.sub].mode = 'showing';
          subs[params.sub].selected = true;
          subsview(true);
        } else if (Storage.field('subtitles_start')) {
          var full = subs.find(function (s) {
            return (s.label || '').indexOf('олные') >= 0;
          });

          if (full) {
            full.mode = 'showing';
            full.selected = true;
          } else {
            subs[0].mode = 'showing';
            subs[0].selected = true;
          }

          subsview(true);
        }

        listener$b.send('subs', {
          subs: subs
        });
      }

      if (hls && hls.levels) {
        var current_level = 'AUTO';
        hls.levels.forEach(function (level, i) {
          level.title = level.qu ? level.qu : level.width ? level.width + 'x' + level.height : 'AUTO';

          if (hls.currentLevel == i) {
            current_level = level.title;
            level.selected = true;
          }

          Object.defineProperty(level, "enabled", {
            set: function set(v) {
              if (v) hls.currentLevel = i;
            },
            get: function get() {}
          });
        });

        if (typeof params.level !== 'undefined' && hls.levels[params.level]) {
          hls.levels.map(function (e) {
            return e.selected = false;
          });
          hls.levels[params.level].enabled = true;
          hls.levels[params.level].selected = true;
          current_level = hls.levels[params.level].title;
        }

        listener$b.send('levels', {
          levels: hls.levels,
          current: current_level
        });
      }
    }
    /**
     * Установить собственные субтитры
     * @param {[{index:integer, label:string, url:string}]} subs 
     */


    function customSubs(subs) {
      _video.customSubs = Arrays.clone(subs);
      console.log('Player', 'custom subs', subs);
      customsubs = new CustomSubs();
      customsubs.listener.follow('subtitle', function (e) {
        $('> div', subtitles$1).html(e.text ? e.text : '&nbsp;').css({
          display: e.text ? 'inline-block' : 'none'
        });
      });
      var index = -1;

      _video.customSubs.forEach(function (sub) {
        index++;
        if (typeof sub.index == 'undefined') sub.index = index;

        if (!sub.ready) {
          sub.ready = true;
          Object.defineProperty(sub, "mode", {
            set: function set(v) {
              if (v == 'showing') {
                customsubs.load(sub.url);
              }
            },
            get: function get() {}
          });
        }
      });
    }
    /**
     * Включить или выключить субтитры
     * @param {boolean} status 
     */


    function subsview(status) {
      subtitles$1.toggleClass('hide', !status);
    }
    /**
     * Применяет к блоку субтитров пользовательские настройки
     */


    function applySubsSettings() {
      var hasStroke = Storage.field('subtitles_stroke'),
          hasBackdrop = Storage.field('subtitles_backdrop'),
          size = Storage.field('subtitles_size');
      subtitles$1.removeClass('has--stroke has--backdrop size--normal size--large size--small');
      subtitles$1.addClass('size--' + size);

      if (hasStroke) {
        subtitles$1.addClass('has--stroke');
      }

      if (hasBackdrop) {
        subtitles$1.addClass('has--backdrop');
      }
    }
    /**
     * Создать контейнер для видео
     */


    function create$k() {
      var videobox;

      if (Platform.is('tizen') && Storage.field('player') == 'tizen') {
        videobox = AVPlay(function (object) {
          _video = object;
        });
      } else {
        videobox = $('<video class="player-video__video" poster="./img/video_poster.png" crossorigin="anonymous"></video>');
        _video = videobox[0];

        if (Storage.field('player_normalization')) {
          try {
            console.log('Player', 'normalization enabled');
            normalization = new Normalization();
            normalization.attach(_video);
          } catch (e) {
            console.log('Player', 'normalization error:', e.stack);
          }
        }
      }

      applySubsSettings();
      display.append(videobox);

      if (Platform.is('webos') && !webos) {
        webos = new create$l(_video);

        webos.callback = function () {
          var src = _video.src;
          var sub = _video.customSubs;
          console.log('WebOS', 'video loaded');
          $(_video).remove();
          if (normalization) normalization.destroy();
          url$5(src);
          _video.customSubs = sub;
          webos.repet(_video);
          listener$b.send('reset_continue', {});
        };

        webos.start();
      }

      bind$2();
    }

    function normalizationVisible(status) {
      if (normalization) normalization.visible(status);
    }
    /**
     * Показать згразку или нет
     * @param {boolean} status 
     */


    function loader(status) {
      wait = status;
      html$d.toggleClass('video--load', status);
    }
    /**
     * Устанавливаем ссылку на видео
     * @param {string} src 
     */


    function url$5(src) {
      loader(true);

      if (hls) {
        hls.destroy();
        hls = false;
      }

      create$k();

      if (/.m3u8/.test(src) && typeof Hls !== 'undefined') {
        if (navigator.userAgent.toLowerCase().indexOf('maple') > -1) src += '|COMPONENT=HLS';

        if (Storage.field('player_hls_method') == 'application' && _video.canPlayType('application/vnd.apple.mpegurl')) {
          console.log('Player', 'use hls:', 'application');
          load$2(src);
        } else if (Hls.isSupported() && !(Platform.is('tizen') && Storage.field('player') == 'tizen')) {
          console.log('Player', 'use hls:', 'program');

          try {
            hls = new Hls();
            hls.attachMedia(_video);
            hls.loadSource(src);
            hls.on(Hls.Events.ERROR, function (event, data) {
              if (data.details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR) {
                if (data.reason === "no EXTM3U delimiter") {
                  load$2(src);
                }
              }
            });
            hls.on(Hls.Events.MANIFEST_LOADED, function () {
              play$2();
            });
          } catch (e) {
            console.log('Player', 'HLS play error:', e.message);
            load$2(src);
          }
        } else load$2(src);
      } else load$2(src);
    }
    /**
     * Начать загрузку
     * @param {string} src 
     */


    function load$2(src) {
      _video.src = src;

      _video.load();

      play$2();
    }
    /**
     * Играем
     */


    function play$2() {
      var playPromise;

      try {
        playPromise = _video.play();
      } catch (e) {}

      if (playPromise !== undefined) {
        playPromise.then(function () {
          console.log('Player', 'start plaining');
        })["catch"](function (e) {
          console.log('Player', 'play promise error:', e.message);
        });
      }

      paused.addClass('hide');
      listener$b.send('play', {});
    }
    /**
     * Пауза
     */


    function pause() {
      var pausePromise;

      try {
        pausePromise = _video.pause();
      } catch (e) {}

      if (pausePromise !== undefined) {
        pausePromise.then(function () {
          console.log('Player', 'pause');
        })["catch"](function (e) {
          console.log('Player', 'pause promise error:', e.message);
        });
      }

      paused.removeClass('hide');
      listener$b.send('pause', {});
    }
    /**
     * Играем или пауза
     */


    function playpause() {
      if (wait || rewind_position) return;

      if (_video.paused) {
        play$2();
        listener$b.send('play', {});
      } else {
        pause();
        listener$b.send('pause', {});
      }
    }
    /**
     * Завершаем перемотку
     * @param {boolean} immediately - завершить немедленно
     */


    function rewindEnd(immediately) {
      clearTimeout(timer$5.rewind_call);
      timer$5.rewind_call = setTimeout(function () {
        _video.currentTime = rewind_position;
        rewind_position = 0;
        rewind_force = 0;
        play$2();
        if (webos) webos.rewinded();
      }, immediately ? 0 : 500);
    }
    /**
     * Подготовка к перемотке
     * @param {number} position_time - новое время
     * @param {boolean} immediately - завершить немедленно
     */


    function rewindStart(position_time, immediately) {
      if (!_video.duration) return;
      rewind_position = Math.max(0, Math.min(position_time, _video.duration));
      pause();
      if (rewind_position == 0) _video.currentTime = 0;else if (rewind_position == _video.duration) _video.currentTime = _video.duration;
      timer$5.rewind = Date.now();
      listener$b.send('timeupdate', {
        duration: _video.duration,
        current: rewind_position
      });
      listener$b.send('rewind', {});
      rewindEnd(immediately);
    }
    /**
     * Начать перематывать
     * @param {boolean} forward - направление, true - вперед
     * @param {number} custom_step - свое значение в секундах
     */


    function rewind(forward, custom_step) {
      if (_video.duration) {
        var time = Date.now(),
            step = _video.duration / (30 * 60),
            mini = time - (timer$5.rewind || 0) > 50 ? 20 : 60;

        if (rewind_position == 0) {
          rewind_force = Math.min(mini, custom_step || 30 * step);
          rewind_position = _video.currentTime;
        }

        rewind_force *= 1.03;

        if (forward) {
          rewind_position += rewind_force;
        } else {
          rewind_position -= rewind_force;
        }

        rewindStart(rewind_position);
      }
    }
    /**
     * Размер видео, масштаб
     * @param {string} type
     */


    function size$1(type) {
      neeed_sacle = type;
      neeed_sacle_last = type;
      scale();
      if (_video.size) _video.size(type);
    }
    /**
     * Перемотка на позицию 
     * @param {number} type 
     */


    function to(seconds) {
      pause();
      if (seconds == -1) _video.currentTime = _video.duration - 3;else _video.currentTime = seconds;
      play$2();
    }
    /**
     * Уничтожить
     * @param {boolean} type - сохранить с параметрами
     */


    function destroy$6(savemeta) {
      subsview(false);
      neeed_sacle = false;
      paused.addClass('hide');
      if (webos) webos.destroy();
      webos = null;
      webos_wait = {};

      if (hls) {
        hls.destroy();
        hls = false;
      }

      if (!savemeta) {
        if (customsubs) {
          customsubs.destroy();
          customsubs = false;
        }
      }

      if (_video) {
        if (_video.destroy) _video.destroy();else {
          _video.src = "";

          _video.load();
        }
      }

      if (normalization) {
        normalization.destroy();
        normalization = false;
      }

      display.empty();
      loader(false);
    }

    function render$9() {
      return html$d;
    }

    var PlayerVideo = {
      init: init$k,
      listener: listener$b,
      url: url$5,
      render: render$9,
      destroy: destroy$6,
      playpause: playpause,
      rewind: rewind,
      play: play$2,
      pause: pause,
      size: size$1,
      subsview: subsview,
      customSubs: customSubs,
      to: to,
      video: function video() {
        return _video;
      },
      saveParams: saveParams,
      clearParamas: clearParamas,
      setParams: setParams,
      normalizationVisible: normalizationVisible
    };

    var html$c;
    var listener$a = start$4();
    var network$c = new create$p();
    var elems;
    var error$1, stat_timer;

    function init$j() {
      html$c = Template.get('player_info');
      elems = {
        name: $('.player-info__name', html$c),
        size: $('.value--size span', html$c),
        stat: $('.value--stat span', html$c),
        speed: $('.value--speed span', html$c),
        error: $('.player-info__error', html$c)
      };
      Utils.time(html$c);
    }
    /**
     * Установить значение
     * @param {string} need
     * @param {string|{width,height}} value 
     */


    function set$2(need, value) {
      if (need == 'name') elems.name.html(value);else if (need == 'size' && value.width && value.height) elems.size.text(value.width + 'x' + value.height);else if (need == 'error') {
        clearTimeout(error$1);
        elems.error.removeClass('hide').text(value);
        error$1 = setTimeout(function () {
          elems.error.addClass('hide');
        }, 5000);
      } else if (need == 'stat') stat$1(value);
    }
    /**
     * Показываем статистику по торренту
     * @param {string} url 
     */


    function stat$1(url) {
      var wait = 0;
      elems.stat.text('- / - • - seeds');
      elems.speed.text('--');

      var update = function update() {
        // если панель скрыта, то зачем каждую секунду чекать? хватит и 5 сек
        // проверено, если ставить на паузу, разадача удаляется, но если чекать постоянно, то все норм
        if (!html$c.hasClass('info--visible')) {
          wait++;
          if (wait <= 5) return;else wait = 0;
        }

        network$c.timeout(2000);
        network$c.silent(url.replace('preload', 'stat').replace('play', 'stat'), function (data) {
          elems.stat.text((data.active_peers || 0) + ' / ' + (data.total_peers || 0) + ' • ' + (data.connected_seeders || 0) + ' seeds');
          elems.speed.text(data.download_speed ? Utils.bytesToSize(data.download_speed * 8, true) + '/c' : '0.0');
          listener$a.send('stat', {
            data: data
          });
        });
      };

      stat_timer = setInterval(update, 2000);
      update();
    }
    /**
     * Показать скрыть инфо
     * @param {boolean} status 
     */


    function toggle$5(status) {
      html$c.toggleClass('info--visible', status);
    }
    /**
     * Уничтожить
     */


    function destroy$5() {
      elems.size.text(Lang.translate('loading') + '...');
      elems.stat.text('');
      elems.speed.text('');
      elems.error.addClass('hide');
      clearTimeout(error$1);
      clearInterval(stat_timer);
      network$c.clear();
    }

    function render$8() {
      return html$c;
    }

    var PlayerInfo = {
      init: init$j,
      listener: listener$a,
      render: render$8,
      set: set$2,
      toggle: toggle$5,
      destroy: destroy$5
    };

    var listener$9 = start$4();
    var current = '';
    var playlist$1 = [];
    var position$1 = 0;
    /**
     * Показать плейлист
     */

    function show$4() {
      active$3();
      var enabled = Controller.enabled();
      Select.show({
        title: Lang.translate('player_playlist'),
        items: playlist$1,
        onSelect: function onSelect(a) {
          Controller.toggle(enabled.name);
          listener$9.send('select', {
            playlist: playlist$1,
            item: a,
            position: position$1
          });
        },
        onBack: function onBack() {
          Controller.toggle(enabled.name);
        }
      });
    }
    /**
     * Установить активным
     */


    function active$3() {
      playlist$1.forEach(function (element) {
        element.selected = element.url == current;
        if (element.selected) position$1 = playlist$1.indexOf(element);
      });
    }
    /**
     * Назад
     */


    function prev() {
      active$3();

      if (position$1 > 0) {
        listener$9.send('select', {
          playlist: playlist$1,
          position: position$1 - 1,
          item: playlist$1[position$1 - 1]
        });
      }
    }
    /**
     * Далее
     */


    function next() {
      active$3();

      if (position$1 < playlist$1.length - 1) {
        listener$9.send('select', {
          playlist: playlist$1,
          position: position$1 + 1,
          item: playlist$1[position$1 + 1]
        });
      }
    }
    /**
     * Установить плейлист
     * @param {[{title:string, url:string}]} p 
     */


    function set$1(p) {
      playlist$1 = p;
      playlist$1.forEach(function (l, i) {
        if (l.url == current) position$1 = i;
      });
      listener$9.send('set', {
        playlist: playlist$1,
        position: position$1
      });
    }
    /**
     * Получить список
     * @returns {[{title:string, url:string}]}
     */


    function get$b() {
      return playlist$1;
    }
    /**
     * Установить текуший урл
     * @param {string} u 
     */


    function url$4(u) {
      current = u;
    }

    var PlayerPlaylist = {
      listener: listener$9,
      show: show$4,
      url: url$4,
      get: get$b,
      set: set$1,
      prev: prev,
      next: next
    };

    var listener$8 = start$4();
    var enabled$1 = false;
    var worked = false;
    var chrome = false;
    var img$3;
    var html$b;
    var movies = [];
    var timer$4 = {};
    var position = 0;
    var slides$1 = 'one';
    var direct = ['lt', 'rt', 'br', 'lb', 'ct'];

    function toggle$4(is_enabled) {
      enabled$1 = is_enabled;
      if (enabled$1) resetTimer();else clearTimeout(timer$4.wait);
      listener$8.send('toggle', {
        status: enabled$1
      });
    }

    function enable$1() {
      toggle$4(true);
    }

    function disable() {
      toggle$4(false);
    }

    function resetTimer() {
      if (!enabled$1) return;
      clearTimeout(timer$4.wait);
      if (!Storage.field('screensaver')) return;
      timer$4.wait = setTimeout(function () {
        if (Storage.field('screensaver_type') == 'nature') startSlideshow();else startChrome();
      }, 300 * 1000); //300 * 1000 = 5 минут
    }

    function startChrome() {
      worked = true;
      chrome = $('<div class="screensaver-chrome"><iframe src="https://cors.eu.org/https://clients3.google.com/cast/chromecast/home" class="screensaver-chrome__iframe"></iframe><div class="screensaver-chrome__overlay"></div></div>');
      chrome.find('.screensaver-chrome__overlay').on('click', function () {
        stopSlideshow();
      });
      $('body').append(chrome);
    }

    function startSlideshow() {
      if (!Storage.field('screensaver')) return;
      worked = true;
      html$b.fadeIn(300);
      Utils.time(html$b);
      nextSlide();
      timer$4.work = setInterval(function () {
        nextSlide();
      }, 30000);
      timer$4.start = setTimeout(function () {
        html$b.addClass('visible');
      }, 5000);
    }

    function nextSlide() {
      var movie = movies[position];
      var image = 'https://source.unsplash.com/1600x900/?nature&order_by=relevant&v=' + Math.random();
      img$3 = null;
      img$3 = new Image();
      img$3.src = image;

      img$3.onload = function () {
        var to = $('.screensaver__slides-' + (slides$1 == 'one' ? 'two' : 'one'), html$b);
        to[0].src = img$3.src;
        to.removeClass(direct.join(' ') + ' animate').addClass(direct[Math.floor(Math.random() * direct.length)]);
        setTimeout(function () {
          $('.screensaver__title', html$b).removeClass('visible');
          $('.screensaver__slides-' + slides$1, html$b).removeClass('visible');
          slides$1 = slides$1 == 'one' ? 'two' : 'one';
          to.addClass('visible').addClass('animate');

          if (movie) {
            setTimeout(function () {
              $('.screensaver__title-name', html$b).text(movie.title || movie.name);
              $('.screensaver__title-tagline', html$b).text(movie.original_title || movie.original_name);
              $('.screensaver__title', html$b).addClass('visible');
            }, 500);
          }
        }, 3000);
      };

      img$3.onerror = function (e) {
        console.error(e);
      };

      position++;
      if (position >= movies.length) position = 0;
    }

    function stopSlideshow() {
      setTimeout(function () {
        worked = false;
      }, 300);
      html$b.fadeOut(300, function () {
        html$b.removeClass('visible');
      });
      clearInterval(timer$4.work);
      clearTimeout(timer$4.start);
      movies = [];

      if (chrome) {
        chrome.remove();
        chrome = false;
      }
    }

    function init$i() {
      html$b = Template.get('screensaver');
      html$b.on('click', function () {
        if (isWorked()) stopSlideshow();
      });
      $('body').append(html$b);
      resetTimer();
      Keypad.listener.follow('keydown', function (e) {
        resetTimer();

        if (worked) {
          stopSlideshow();
          e.event.preventDefault();
        }
      });
      Keypad.listener.follow('keyup', function (e) {
        if (worked) e.event.preventDefault();
      });
      $(window).on('mousedown', function (e) {
        resetTimer();
      });
    }

    function isWorked() {
      return enabled$1 ? worked : enabled$1;
    }

    function render$7() {
      return html$b;
    }

    var Screensaver = {
      listener: listener$8,
      init: init$i,
      enable: enable$1,
      render: render$7,
      disable: disable,
      isWorked: isWorked,
      //for android back
      stopSlideshow: stopSlideshow //for android back

    };

    var html$a, active$2, scroll$1, last$3;

    function open$4(params) {
      active$2 = params;
      html$a = Template.get('modal', {
        title: params.title
      });
      html$a.on('click', function (e) {
        if (!$(e.target).closest($('.modal__content', html$a)).length) window.history.back();
      });
      title$1(params.title);
      html$a.toggleClass('modal--medium', params.size == 'medium' ? true : false);
      html$a.toggleClass('modal--large', params.size == 'large' ? true : false);
      html$a.toggleClass('modal--overlay', params.overlay ? true : false);
      scroll$1 = new create$o({
        over: true,
        mask: params.mask
      });
      html$a.find('.modal__body').append(scroll$1.render());
      bind$1(params.html);
      scroll$1.append(params.html);
      $('body').append(html$a);
      toggle$3();
    }

    function bind$1(where) {
      where.find('.selector').on('hover:focus', function (e) {
        last$3 = e.target;
        scroll$1.update($(e.target));
      }).on('hover:enter', function (e) {
        if (active$2.onSelect) active$2.onSelect($(e.target));
      });
    }

    function jump(tofoward) {
      var select = scroll$1.render().find('.selector.focus');
      if (tofoward) select = select.nextAll().filter('.selector');else select = select.prevAll().filter('.selector');
      select = select.slice(0, 10);
      select = select.last();

      if (select.length) {
        Controller.collectionFocus(select[0], scroll$1.render());
      }
    }

    function toggle$3() {
      Controller.add('modal', {
        invisible: true,
        toggle: function toggle() {
          Controller.collectionSet(scroll$1.render());
          Controller.collectionFocus(last$3, scroll$1.render());
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        right: function right() {
          jump(true);
        },
        left: function left() {
          jump(false);
        },
        back: function back() {
          if (active$2.onBack) active$2.onBack();
        }
      });
      Controller.toggle('modal');
    }

    function update$7(new_html) {
      last$3 = false;
      scroll$1.clear();
      scroll$1.append(new_html);
      bind$1(new_html);
      toggle$3();
    }

    function title$1(tit) {
      html$a.find('.modal__title').text(tit);
      html$a.toggleClass('modal--empty-title', tit ? false : true);
    }

    function destroy$4() {
      last$3 = false;
      scroll$1.destroy();
      html$a.remove();
    }

    function close$2() {
      destroy$4();
    }

    var Modal = {
      open: open$4,
      close: close$2,
      update: update$7,
      title: title$1,
      toggle: toggle$3
    };

    var network$b = new create$p();

    function url$3() {
      var u = ip();
      return u ? Utils.checkHttp(u) : u;
    }

    function ip() {
      return Storage.get(Storage.field('torrserver_use_link') == 'two' ? 'torrserver_url_two' : 'torrserver_url');
    }

    function my(success, fail) {
      var data = JSON.stringify({
        action: 'list'
      });
      clear$7();
      network$b.silent(url$3() + '/torrents', function (result) {
        if (result.length) success(result);else fail();
      }, fail, data);
    }

    function add$a(object, success, fail) {
      var data = JSON.stringify({
        action: 'add',
        link: object.link,
        title: '[LAMPA] ' + (object.title + '').replace('??', '?'),
        poster: object.poster,
        data: object.data ? JSON.stringify(object.data) : '',
        save_to_db: true
      });
      clear$7();
      network$b.silent(url$3() + '/torrents', success, fail, data);
    }

    function hash$1(object, success, fail) {
      var data = JSON.stringify({
        action: 'add',
        link: object.link,
        title: '[LAMPA] ' + (object.title + '').replace('??', '?'),
        poster: object.poster,
        data: object.data ? JSON.stringify(object.data) : '',
        save_to_db: Storage.get('torrserver_savedb', 'false')
      });
      clear$7();
      network$b.silent(url$3() + '/torrents', success, function (a, c) {
        fail(network$b.errorDecode(a, c));
      }, data);
    }

    function files$1(hash, success, fail) {
      var data = JSON.stringify({
        action: 'get',
        hash: hash
      });
      clear$7();
      network$b.timeout(2000);
      network$b.silent(url$3() + '/torrents', function (json) {
        if (json.file_stats) {
          success(json);
        }
      }, fail, data);
    }

    function connected(success, fail) {
      clear$7();
      network$b.timeout(5000);
      network$b.silent(url$3() + '/settings', function (json) {
        if (typeof json.CacheSize == 'undefined') {
          fail(Lang.translate('torrent_error_nomatrix'));
        } else {
          success(json);
        }
      }, function (a, c) {
        fail(network$b.errorDecode(a, c));
      }, JSON.stringify({
        action: 'get'
      }));
    }

    function stream(path, hash, id) {
      return url$3() + '/stream/' + encodeURIComponent(path.split('\\').pop().split('/').pop()) + '?link=' + hash + '&index=' + id + '&' + (Storage.field('torrserver_preload') ? 'preload' : 'play');
    }

    function drop(hash, success, fail) {
      var data = JSON.stringify({
        action: 'drop',
        hash: hash
      });
      clear$7();
      network$b.silent(url$3() + '/torrents', success, fail, data, {
        dataType: 'text'
      });
    }

    function remove$1(hash, success, fail) {
      var data = JSON.stringify({
        action: 'rem',
        hash: hash
      });
      clear$7();
      network$b.silent(url$3() + '/torrents', success, fail, data, {
        dataType: 'text'
      });
    }

    function parse$1(file_path, movie, is_file) {
      var path = file_path.toLowerCase();
      var data = {
        hash: '',
        season: 0,
        episode: 0,
        serial: movie.number_of_seasons ? true : false
      };
      var math = path.match(/s([0-9]+)\.?ep?([0-9]+)/);
      if (!math) math = path.match(/s([0-9]{2})([0-9]+)/);
      if (!math) math = path.match(/[ |\[|(]([0-9]{1,2})x([0-9]+)/);

      if (!math) {
        math = path.match(/[ |\[|(]([0-9]{1,3}) of ([0-9]+)/);
        if (math) math = [0, 1, math[1]];
      }

      if (!math) {
        math = path.match(/ep?([0-9]+)/);
        if (math) math = [0, 0, math[1]];
      }

      if (is_file) {
        data.hash = Utils.hash(file_path);
      } else if (math && movie.number_of_seasons) {
        data.season = parseInt(math[1]);
        data.episode = parseInt(math[2]);

        if (data.season === 0) {
          math = path.match(/s([0-9]+)/);
          if (math) data.season = parseInt(math[1]);
        }

        if (data.episode === 0) {
          math = path.match(/ep?([0-9]+)/);
          if (math) data.episode = parseInt(math[1]);
        }

        if (isNaN(data.season)) data.season = 0;
        if (isNaN(data.episode)) data.episode = 0;

        if (data.season && data.episode) {
          data.hash = [Utils.hash(movie.original_title), data.season, data.episode].join('_');
        } else if (data.episode) {
          data.season = 1;
          data.hash = [Utils.hash(movie.original_title), data.season, data.episode].join('_');
        } else {
          hash$1 = Utils.hash(file_path);
        }
      } else if (movie.original_title && !data.serial) {
        data.hash = Utils.hash(movie.original_title);
      } else {
        data.hash = Utils.hash(file_path);
      }

      return data;
    }

    function clear$7() {
      network$b.clear();
    }

    function error() {
      var temp = Template.get('torrent_error', {
        ip: ip()
      });
      var list = temp.find('.torrent-checklist__list > li');
      var info = temp.find('.torrent-checklist__info > div');
      var next = temp.find('.torrent-checklist__next-step');
      var prog = temp.find('.torrent-checklist__progress-bar > div');
      var comp = temp.find('.torrent-checklist__progress-steps');
      var btn = temp.find('.selector');
      var position = -2;

      function makeStep() {
        position++;
        list.slice(0, position + 1).addClass('wait');
        var total = list.length;
        comp.text(Lang.translate('torrent_error_made') + ' ' + Math.max(0, position) + ' ' + Lang.translate('torrent_error_from') + ' ' + total);

        if (position > list.length) {
          Modal.close();
          Controller.toggle('content');
        } else if (position >= 0) {
          info.addClass('hide');
          info.eq(position).removeClass('hide');
          var next_step = list.eq(position + 1);
          prog.css('width', Math.round(position / total * 100) + '%');
          list.slice(0, position).addClass('check');
          btn.text(position < total ? Lang.translate('torrent_error_next') : Lang.translate('torrent_error_complite'));
          next.text(next_step.length ? '- ' + next_step.text() : '');
        }
      }

      makeStep();
      btn.on('hover:enter', function () {
        makeStep();
      });
      Modal.title(Lang.translate('torrent_error_connect'));
      Modal.update(temp);
      Controller.add('modal', {
        invisible: true,
        toggle: function toggle() {
          Controller.collectionSet(temp);
          Controller.collectionFocus(false, temp);
        },
        back: function back() {
          Modal.close();
          Controller.toggle('content');
        }
      });
      Controller.toggle('modal');
    }

    var Torserver = {
      ip: ip,
      my: my,
      add: add$a,
      url: url$3,
      hash: hash$1,
      files: files$1,
      clear: clear$7,
      drop: drop,
      stream: stream,
      remove: remove$1,
      connected: connected,
      parse: parse$1,
      error: error
    };

    var timer$3;
    var listener$7;
    /**
     * Открыть окно
     * @param {{type:string, object:{}}} params 
     */

    function open$3(params) {
      var enabled = Controller.enabled().name;
      var text = params.type == 'card' ? Lang.translate('broadcast_open') : params.type == 'play' ? Lang.translate('broadcast_play') : '';
      var temp = Template.get('broadcast', {
        text: text
      });
      var list = temp.find('.broadcast__devices');
      if (!text) temp.find('.about').remove();

      listener$7 = function listener(e) {
        if (e.method == 'devices') {
          var devices = e.data.filter(function (d) {
            return !(d.name == 'CUB' || d.device_id == Socket.uid());
          });
          list.empty();
          devices.forEach(function (device) {
            var item = $('<div class="broadcast__device selector">' + device.name + '</div>');
            item.on('hover:enter', function () {
              close$1();
              Controller.toggle(enabled);

              if (params.type == 'card') {
                Socket.send('open', {
                  params: params.object,
                  uid: device.uid
                });
              }

              if (params.type == 'play') {
                Socket.send('other', {
                  params: {
                    submethod: 'play',
                    object: params.object
                  },
                  uid: device.uid
                });
              }
            });
            list.append(item);
          });
          Modal.toggle();
        }
      };

      Modal.open({
        title: '',
        html: temp,
        size: 'small',
        mask: true,
        onBack: function onBack() {
          close$1();
          Controller.toggle(enabled);
        }
      });
      listener$7({
        method: 'devices',
        data: Socket.devices()
      });
      Socket.listener.follow('message', listener$7);
    }
    /**
     * Закрыть окно
     */


    function close$1() {
      Socket.listener.remove('message', listener$7);
      clearInterval(timer$3);
      Modal.close();
      listener$7 = null;
    }

    var Broadcast = {
      open: open$3
    };

    var html$9;
    var listener$6 = start$4();
    var network$a = new create$p();
    var callback$2;
    var work = false;
    var launch_player;
    var timer_ask;
    var timer_save;
    var preloader = {
      wait: false
    };
    var viewing = {
      time: 0,
      difference: 0,
      current: 0
    };
    /**
     * Подписываемся на события
     */

    function init$h() {
      PlayerPanel.init();
      PlayerVideo.init();
      PlayerInfo.init();
      html$9 = Template.get('player');
      html$9.append(PlayerVideo.render());
      html$9.append(PlayerPanel.render());
      html$9.append(PlayerInfo.render());
      html$9.on('mousemove', function () {
        if (Storage.field('navigation_type') == 'mouse') PlayerPanel.mousemove();
      });
      /** Следим за обновлением времени */

      PlayerVideo.listener.follow('timeupdate', function (e) {
        PlayerPanel.update('time', Utils.secondsToTime(e.current | 0, true));
        PlayerPanel.update('timenow', Utils.secondsToTime(e.current || 0));
        PlayerPanel.update('timeend', Utils.secondsToTime(e.duration || 0));
        PlayerPanel.update('position', e.current / e.duration * 100 + '%');

        if (work && work.timeline && !work.timeline.waiting_for_user && e.duration) {
          if (Storage.field('player_timecode') !== 'again' && !work.timeline.continued) {
            var prend = e.duration - 15,
                posit = Math.round(e.duration * work.timeline.percent / 100);
            if (posit > 10) PlayerVideo.to(posit > prend ? prend : posit);
            work.timeline.continued = true;
          } else {
            work.timeline.percent = Math.round(e.current / e.duration * 100);
            work.timeline.time = e.current;
            work.timeline.duration = e.duration;
          }
        }

        viewing.difference = e.current - viewing.current;
        viewing.current = e.current;
        if (viewing.difference > 0 && viewing.difference < 3) viewing.time += viewing.difference;
      });
      /** Буферизация видео */

      PlayerVideo.listener.follow('progress', function (e) {
        PlayerPanel.update('peding', e.down);
      });
      /** Может ли плеер начать играть */

      PlayerVideo.listener.follow('canplay', function (e) {
        PlayerPanel.canplay();
      });
      /** Плей видео */

      PlayerVideo.listener.follow('play', function (e) {
        Screensaver.disable();
        PlayerPanel.update('play');
      });
      /** Пауза видео */

      PlayerVideo.listener.follow('pause', function (e) {
        Screensaver.enable();
        PlayerPanel.update('pause');
      });
      /** Перемотка видео */

      PlayerVideo.listener.follow('rewind', function (e) {
        PlayerPanel.rewind();
      });
      /** Видео было завершено */

      PlayerVideo.listener.follow('ended', function (e) {
        if (Storage.field('playlist_next')) PlayerPlaylist.next();
      });
      /** Дорожки полученые из видео */

      PlayerVideo.listener.follow('tracks', function (e) {
        PlayerPanel.setTracks(e.tracks);
      });
      /** Субтитры полученые из видео */

      PlayerVideo.listener.follow('subs', function (e) {
        PlayerPanel.setSubs(e.subs);
      });
      /** Качество видео в m3u8 */

      PlayerVideo.listener.follow('levels', function (e) {
        PlayerPanel.setLevels(e.levels, e.current);
      });
      /** Размер видео */

      PlayerVideo.listener.follow('videosize', function (e) {
        PlayerInfo.set('size', e);
      });
      /** Ошибка при попытки возпроизвести */

      PlayerVideo.listener.follow('error', function (e) {
        if (work) PlayerInfo.set('error', e.error);
      });
      /** Сбросить (продолжить) */

      PlayerVideo.listener.follow('reset_continue', function (e) {
        if (work && work.timeline) work.timeline.continued = false;
      });
      /** Перемотка мышкой */

      PlayerPanel.listener.follow('mouse_rewind', function (e) {
        var vid = PlayerVideo.video();

        if (vid && vid.duration) {
          e.time.removeClass('hide').text(Utils.secondsToTime(vid.duration * e.percent)).css('left', e.percent * 100 + '%');

          if (e.method == 'click') {
            PlayerVideo.to(vid.duration * e.percent);
          }
        }
      });
      /** Плей/Пауза */

      PlayerPanel.listener.follow('playpause', function (e) {
        PlayerVideo.playpause();
      });
      /** Нажали на плейлист */

      PlayerPanel.listener.follow('playlist', function (e) {
        PlayerPlaylist.show();
      });
      /** Изменить размер видео */

      PlayerPanel.listener.follow('size', function (e) {
        PlayerVideo.size(e.size);
        Storage.set('player_size', e.size);
      });
      /** Предыдущая серия */

      PlayerPanel.listener.follow('prev', function (e) {
        PlayerPlaylist.prev();
      });
      /** Следуюшия серия */

      PlayerPanel.listener.follow('next', function (e) {
        PlayerPlaylist.next();
      });
      /** Перемотать назад */

      PlayerPanel.listener.follow('rprev', function (e) {
        PlayerVideo.rewind(false);
      });
      /** Перемотать далее */

      PlayerPanel.listener.follow('rnext', function (e) {
        PlayerVideo.rewind(true);
      });
      /** Показать/скрыть субтитры */

      PlayerPanel.listener.follow('subsview', function (e) {
        PlayerVideo.subsview(e.status);
      });
      /** Состояние панели, скрыта или нет */

      PlayerPanel.listener.follow('visible', function (e) {
        PlayerInfo.toggle(e.status);
        PlayerVideo.normalizationVisible(e.status);
      });
      /** К началу видео */

      PlayerPanel.listener.follow('to_start', function (e) {
        PlayerVideo.to(0);
      });
      /** К концу видео */

      PlayerPanel.listener.follow('to_end', function (e) {
        PlayerVideo.to(-1);
      });
      /** На весь экран */

      PlayerPanel.listener.follow('fullscreen', function () {
        var doc = window.document;
        var elem = doc.documentElement;
        var requestFullScreen = elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullScreen || elem.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
          requestFullScreen.call(elem);
        } else {
          cancelFullScreen.call(doc);
        }
      });
      /** Переключили качемтво видео */

      PlayerPanel.listener.follow('quality', function (e) {
        PlayerVideo.destroy(true);
        PlayerVideo.url(e.url);
        if (work && work.timeline) work.timeline.continued = false;
      });
      /** Нажали на кнопку (отправить) */

      PlayerPanel.listener.follow('share', function (e) {
        Broadcast.open({
          type: 'play',
          object: {
            player: work,
            playlist: PlayerPlaylist.get()
          }
        });
      });
      /** Событие на переключение серии */

      PlayerPlaylist.listener.follow('select', function (e) {
        var params = PlayerVideo.saveParams();
        destroy$3();
        play$1(e.item);
        PlayerVideo.setParams(params);
        if (e.item.url.indexOf(Torserver.ip()) > -1) PlayerInfo.set('stat', e.item.url);
        PlayerPanel.showNextEpisodeName({
          playlist: e.playlist,
          position: e.position
        });
      });
      /** Установить название следующей серии */

      PlayerPlaylist.listener.follow('set', PlayerPanel.showNextEpisodeName);
      /** Прослушиваем на сколько загрузилось, затем запускаем видео */

      PlayerInfo.listener.follow('stat', function (e) {
        if (preloader.wait) {
          var pb = e.data.preloaded_bytes || 0,
              ps = e.data.preload_size || 0;
          var progress = Math.min(100, pb * 100 / ps);
          PlayerPanel.update('timenow', Math.round(progress) + '%');
          PlayerPanel.update('timeend', 100 + '%');
          PlayerPanel.update('peding', progress + '%');

          if (progress >= 90 || isNaN(progress)) {
            PlayerPanel.update('peding', '0%');
            preloader.wait = false;
            preloader.call();
          }
        }
      });
    }
    /**
     * Главный контроллер
     */


    function toggle$2() {
      Controller.add('player', {
        invisible: true,
        toggle: function toggle() {
          PlayerPanel.hide();
        },
        up: function up() {
          PlayerPanel.toggle();
        },
        down: function down() {
          PlayerPanel.toggle();
        },
        right: function right() {
          PlayerVideo.rewind(true);
        },
        left: function left() {
          PlayerVideo.rewind(false);
        },
        gone: function gone() {},
        enter: function enter() {
          PlayerVideo.playpause();
        },
        playpause: function playpause() {
          PlayerVideo.playpause();
        },
        play: function play() {
          PlayerVideo.play();
        },
        pause: function pause() {
          PlayerVideo.pause();
        },
        rewindForward: function rewindForward() {
          PlayerVideo.rewind(true);
        },
        rewindBack: function rewindBack() {
          PlayerVideo.rewind(false);
        },
        back: backward$1
      });
      Controller.toggle('player');
    }
    /**
     * Контроллер предзагрузки
     */


    function togglePreload() {
      Controller.add('player_preload', {
        invisible: true,
        toggle: function toggle() {},
        enter: function enter() {
          PlayerPanel.update('peding', '0%');
          preloader.wait = false;
          preloader.call();
        },
        back: backward$1
      });
      Controller.toggle('player_preload');
    }
    /**
     * Вызвать событие назад
     */


    function backward$1() {
      destroy$3();
      if (callback$2) callback$2();else Controller.toggle('content');
      callback$2 = false;
    }
    /**
     * Уничтожить плеер
     */


    function destroy$3() {
      saveTimeView();
      if (work.viewed) work.viewed(viewing.time);
      clearTimeout(timer_ask);
      clearInterval(timer_save);
      work = false;
      preloader.wait = false;
      preloader.call = null;
      viewing.time = 0;
      viewing.difference = 0;
      viewing.current = 0;
      Screensaver.enable();
      PlayerVideo.destroy();
      PlayerVideo.clearParamas();
      PlayerPanel.destroy();
      PlayerInfo.destroy();
      html$9.detach();
      listener$6.send('destroy', {});
    }
    /**
     * Запустить webos плеер
     * @param {Object} params 
     */


    function runWebOS(params) {
      webOS.service.request("luna://com.webos.applicationManager", {
        method: "launch",
        parameters: {
          "id": params.need,
          "params": {
            "payload": [{
              "fullPath": params.url,
              "artist": "",
              "subtitle": "",
              "dlnaInfo": {
                "flagVal": 4096,
                "cleartextSize": "-1",
                "contentLength": "-1",
                "opVal": 1,
                "protocolInfo": "http-get:*:video/x-matroska:DLNA.ORG_OP=01;DLNA.ORG_CI=0;DLNA.ORG_FLAGS=01700000000000000000000000000000",
                "duration": 0
              },
              "mediaType": "VIDEO",
              "thumbnail": "",
              "deviceType": "DMR",
              "album": "",
              "fileName": params.name,
              "lastPlayPosition": params.position
            }]
          }
        },
        onSuccess: function onSuccess() {
          console.log('Player', 'The app is launched');
        },
        onFailure: function onFailure(inError) {
          console.log('Player', "Failed to launch the app (" + params.need + "): ", "[" + inError.errorCode + "]: " + inError.errorText);

          if (params.need == 'com.webos.app.photovideo') {
            params.need = 'com.webos.app.smartshare';
            runWebOS(params);
          } else if (params.need == 'com.webos.app.smartshare') {
            params.need = 'com.webos.app.mediadiscovery';
            runWebOS(params);
          }
        }
      });
    }
    /**
     * Показать предзагрузку торрента
     * @param {Object} data 
     * @param {Function} call 
     */


    function preload(data, call) {
      if (data.url.indexOf(Torserver.ip()) > -1 && data.url.indexOf('&preload') > -1) {
        preloader.wait = true;
        PlayerInfo.set('name', data.title);
        $('body').append(html$9);
        PlayerPanel.show(true);
        togglePreload();
        network$a.timeout(2000);
        network$a.silent(data.url);

        preloader.call = function () {
          data.url = data.url.replace('&preload', '&play');
          call();
        };
      } else call();
    }
    /**
     * Спросить продолжать ли просмотр
     */


    function ask() {
      if (work && work.timeline && work.timeline.percent) {
        work.timeline.waiting_for_user = false;

        if (Storage.field('player_timecode') == 'ask') {
          work.timeline.waiting_for_user = true;
          Select.show({
            title: Lang.translate('title_action'),
            items: [{
              title: Lang.translate('player_start_from') + ' ' + Utils.secondsToTime(work.timeline.time) + '?',
              yes: true
            }, {
              title: Lang.translate('settings_param_no')
            }],
            onBack: function onBack() {
              work.timeline.continued = true;
              toggle$2();
              clearTimeout(timer_ask);
            },
            onSelect: function onSelect(a) {
              work.timeline.waiting_for_user = false;
              if (!a.yes) work.timeline.continued = true;
              toggle$2();
              clearTimeout(timer_ask);
            }
          });
          clearTimeout(timer_ask);
          timer_ask = setTimeout(function () {
            work.timeline.continued = true;
            Select.hide();
            toggle$2();
          }, 8000);
        }
      }
    }
    /**
     * Сохранить отметку просмотра
     */


    function saveTimeView() {
      if (work.timeline && work.timeline.handler) work.timeline.handler(work.timeline.percent, work.timeline.time, work.timeline.duration);
    }
    /**
     * Сохранять отметку просмотра каждые 2 минуты
     */


    function saveTimeLoop() {
      if (work.timeline) {
        timer_save = setInterval(saveTimeView, 1000 * 60 * 2);
      }
    }
    /**
     * Запустить плеер
     * @param {Object} data 
     */


    function play$1(data) {
      console.log('Player', 'url:', data.url);

      var lauch = function lauch() {
        preload(data, function () {
          listener$6.send('start', data);
          work = data;
          if (work.timeline) work.timeline.continued = false;
          PlayerPlaylist.url(data.url);
          PlayerPanel.quality(data.quality, data.url);
          PlayerVideo.url(data.url);
          PlayerVideo.size(Storage.get('player_size', 'default'));
          if (data.subtitles) PlayerVideo.customSubs(data.subtitles);
          PlayerInfo.set('name', data.title);
          if (!preloader.call) $('body').append(html$9);
          toggle$2();
          PlayerPanel.show(true);
          Controller.updateSelects();
          ask();
          saveTimeLoop();
          listener$6.send('ready', data);
        });
      };

      if (launch_player == 'lampa') lauch();else if (Platform.is('webos') && (Storage.field('player') == 'webos' || launch_player == 'webos')) {
        data.url = data.url.replace('&preload', '&play');
        runWebOS({
          need: 'com.webos.app.photovideo',
          url: data.url,
          name: data.path || data.title,
          position: data.timeline ? data.timeline.time || -1 : -1
        });
      } else if (Platform.is('android') && (Storage.field('player') == 'android' || launch_player == 'android')) {
        data.url = data.url.replace('&preload', '&play');

        if (data.playlist && Array.isArray(data.playlist)) {
          data.playlist.forEach(function (a) {
            a.url = a.url.replace('&preload', '&play');
          });
        }

        //Android.openPlayer(data.url, data);
     {
        window.plugins.intentShim.startActivity({
          action : window.plugins.intentShim.ACTION_VIEW,
          url : data.url,
          headers : {
          'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36', 
          'referrer' : 'https://www.aliyundrive.com/'
        },
          type : "video/*"
        }, function() {
        }, function() {
          console.log("Failed to open magnet URL via Android Intent");
        });
      };
      } else if (Platform.is('nw') && Storage.field('player') == 'other') {
        var path = Storage.field('player_nw_path');

        var file = require('fs');

        if (file.existsSync(path)) {
          var spawn = require('child_process').spawn;

          spawn(path, [data.url.replace(/\s/g, '%20')]);
        } else {
          Noty.show(Lang.translate('player_not_found') + ': ' + path);
        }
      } else lauch();
      launch_player = '';
    }
    /**
     * Статистика для торрсервера
     * @param {String} url 
     */


    function stat(url) {
      if (work || preloader.wait) PlayerInfo.set('stat', url);
    }
    /**
     * Установить плейлист
     * @param {Array} playlist 
     */


    function playlist(playlist) {
      if (work || preloader.wait) PlayerPlaylist.set(playlist);
    }
    /**
     * Установить субтитры
     * @param {Array} subs 
     */


    function subtitles(subs) {
      if (work || preloader.wait) {
        PlayerVideo.customSubs(subs);
      }
    }
    /**
     * Запустить другой плеер
     * @param {String} need - тип плеера
     */


    function runas(need) {
      launch_player = need;
    }
    /**
     * Обратный вызов
     * @param {Function} back 
     */


    function onBack(back) {
      callback$2 = back;
    }
    /**
     * Рендер плеера
     * @returns Html
     */


    function render$6() {
      return html$9;
    }
    /**
     * Возвращает статус, открыт ли плеер
     * @returns boolean
     */


    function opened$1() {
      return $('body').find('.player').length ? true : false;
    }

    var Player = {
      init: init$h,
      listener: listener$6,
      play: play$1,
      playlist: playlist,
      render: render$6,
      stat: stat,
      subtitles: subtitles,
      runas: runas,
      callback: onBack,
      opened: opened$1
    };

    function update$6(params) {
      if (params.hash == 0) return;
      var viewed = Storage.cache('file_view', 10000, {});
      var road = viewed[params.hash];

      if (typeof road == 'undefined' || typeof road == 'number') {
        road = {
          duration: 0,
          time: 0,
          percent: 0
        };
        viewed[params.hash] = road;
      }

      road.percent = params.percent;
      if (typeof params.time !== 'undefined') road.time = params.time;
      if (typeof params.duration !== 'undefined') road.duration = params.duration;
      Storage.set('file_view', viewed);
      var line = $('.time-line[data-hash="' + params.hash + '"]').toggleClass('hide', params.percent ? false : true);
      $('> div', line).css({
        width: params.percent + '%'
      });
      $('.time-line-details[data-hash="' + params.hash + '"]').each(function () {
        var f = format(road);
        $(this).find('[a="t"]').text(f.time);
        $(this).find('[a="p"]').text(f.percent);
        $(this).find('[a="d"]').text(f.duration);
        $(this).toggleClass('hide', road.duration ? false : true);
      });
      if (!params.received) Socket.send('timeline', {
        params: params
      });
    }

    function view$1(hash) {
      var viewed = Storage.cache('file_view', 10000, {}),
          curent = typeof viewed[hash] !== 'undefined' ? viewed[hash] : 0;
      var road = {
        percent: 0,
        time: 0,
        duration: 0
      };

      if (_typeof(curent) == 'object') {
        road.percent = curent.percent;
        road.time = curent.time;
        road.duration = curent.duration;
      } else {
        road.percent = curent || 0;
      }

      return {
        hash: hash,
        percent: road.percent,
        time: road.time,
        duration: road.duration,
        handler: function handler(percent, time, duration) {
          return update$6({
            hash: hash,
            percent: percent,
            time: time,
            duration: duration
          });
        }
      };
    }

    function render$5(params) {
      var line = Template.get('timeline', params);
      line.toggleClass('hide', params.percent ? false : true);
      return line;
    }

    function details(params) {
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var line = Template.get('timeline_details', format(params));
      if (str) line.prepend(str);
      line.attr('data-hash', params.hash);
      line.toggleClass('hide', params.duration ? false : true);
      return line;
    }

    function secondsToTime(sec_num) {
      var hours = Math.trunc(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      return (hours ? hours + 'ч. ' : '') + minutes + 'м.';
    }

    function format(params) {
      var road = {
        percent: params.percent + '%',
        time: secondsToTime(params.time),
        duration: secondsToTime(params.duration)
      };
      return road;
    }

    var Timeline = {
      render: render$5,
      update: update$6,
      view: view$1,
      details: details,
      format: format
    };

    var socket;
    var ping;

    var _uid = Utils.uid();

    var _devices = [];
    var listener$5 = start$4();

    function connect$1() {
      clearInterval(ping);

      try {
        socket = new WebSocket('wss://cub.watch:8020');
      } catch (e) {
        console.log('Socket', 'not work');
        return;
      }

      socket.addEventListener('open', function (event) {
        //console.log('Socket','open')
        send('start', {});
        ping = setInterval(function () {
          send('ping', {});
        }, 5000);
      });
      socket.addEventListener('close', function (event) {
        //console.log('Socket','close', event.code)
        setTimeout(connect$1, 5000);
      });
      socket.addEventListener('error', function (event) {
        console.log('Socket', 'error', event.message, event.code);
        socket.close();
      }, false);
      socket.addEventListener('message', function (event) {
        var result = JSON.parse(event.data);

        if (result.method == 'devices') {
          _devices = result.data;
        } else if (result.method == 'open') {
          Controller.toContent();
          Activity$1.push(result.data);
        } else if (result.method == 'timeline') {
          result.data.received = true; //чтоб снова не остправлять и не зациклить

          Timeline.update(result.data);
        } else if (result.method == 'bookmarks') {
          Account.update();
        } else if (result.method == 'other' && result.data.submethod == 'play') {
          Controller.toContent();
          Player.play(result.data.object.player);
          Player.playlist(result.data.object.playlist);
        }

        listener$5.send('message', result);
      });
    }

    function send(method, data) {
      var name_devise = Platform.get() ? Platform.get() : navigator.userAgent.toLowerCase().indexOf('mobile') > -1 ? 'mobile' : navigator.userAgent.toLowerCase().indexOf('x11') > -1 ? 'chrome' : 'other';
      data.device_id = _uid;
      data.name = Utils.capitalizeFirstLetter(name_devise) + ' - ' + Storage.field('device_name');
      data.method = method;
      data.version = 1;
      data.account = Storage.get('account', '{}');
      if (socket.readyState == 1) socket.send(JSON.stringify(data));
    }

    var Socket = {
      listener: listener$5,
      init: connect$1,
      send: send,
      uid: function uid() {
        return _uid;
      },
      devices: function devices() {
        return _devices;
      }
    };

    var body$3;
    var network$9 = new create$p();
    var api = Utils.protocol() + 'cub.watch/api/';
    var notice_load = {
      time: 0,
      data: []
    };
    var bookmarks = [];
    /**
     * Запуск
     */

    function init$g() {
      Settings.listener.follow('open', function (e) {
        body$3 = null;

        if (e.name == 'account') {
          body$3 = e.body;
          renderPanel$1();
          check$1();
        }
      });
      Storage.listener.follow('change', function (e) {
        if (e.name == 'account_email' || e.name == 'account_password') {
          signin();
          if (e.name == 'account_password') Storage.set('account_password', '', true);
        }
      });
      Favorite.listener.follow('add,added', function (e) {
        save$5('add', e.where, e.card);
      });
      Favorite.listener.follow('remove', function (e) {
        save$5('remove', e.where, e.card);
      });
      updateBookmarks(Storage.get('account_bookmarks', '[]'));
      update$5();
      timelines();
    }

    function timelines() {
      var account = Storage.get('account', '{}');

      if (account.token && Storage.field('account_use')) {
        network$9.silent(api + 'timeline/all', function (result) {
          var viewed = Storage.cache('file_view', 10000, {});

          for (var i in result.timelines) {
            var time = result.timelines[i];
            viewed[i] = time;
            Arrays.extend(viewed[i], {
              duration: 0,
              time: 0,
              percent: 0
            });
            delete viewed[i].hash;
          }

          Storage.set('file_view', viewed);
        }, false, false, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      }
    }

    function save$5(method, type, card) {
      var account = Storage.get('account', '{}');

      if (account.token && Storage.field('account_use')) {
        var list = Storage.get('account_bookmarks', '[]');
        var find = list.find(function (elem) {
          return elem.card_id == card.id && elem.type == type;
        });
        network$9.clear();
        network$9.silent(api + 'bookmarks/' + method, update$5, false, {
          type: type,
          data: JSON.stringify(card),
          card_id: card.id,
          id: find ? find.id : 0
        }, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });

        if (method == 'remove') {
          if (find) Arrays.remove(list, find);
        } else {
          list.push({
            id: 0,
            card_id: card.id,
            type: type,
            data: JSON.stringify(card),
            profile: account.profile.id
          });
        }

        Socket.send('bookmarks', {});
        updateBookmarks(list);
      }
    }

    function clear$6(where) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        network$9.silent(api + 'bookmarks/clear', function (result) {
          if (result.secuses) update$5();
        }, false, {
          type: 'group',
          group: where
        }, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      }
    }

    function update$5(call) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        network$9.silent(api + 'bookmarks/all?full=1', function (result) {
          if (result.secuses) {
            updateBookmarks(result.bookmarks);
            if (call && typeof call == 'function') call();
          }
        }, function () {
          if (call && typeof call == 'function') call();
        }, false, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      } else {
        updateBookmarks([]);
      }
    }

    function plugins(call) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        network$9.timeout(2000);
        network$9.silent(api + 'plugins/all', function (result) {
          if (result.secuses) {
            Storage.set('account_plugins', result.plugins);
            call(result.plugins);
          } else {
            call(Storage.get('account_plugins', '[]'));
          }
        }, function () {
          call(Storage.get('account_plugins', '[]'));
        }, false, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      } else {
        call([]);
      }
    }

    function pluginsStatus(plugin, status) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        network$9.silent(api + 'plugins/status', false, false, {
          id: plugin.id,
          status: status
        }, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      }
    }
    /**
     * Статус
     */


    function renderStatus$1(name) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (body$3) {
        body$3.find('.settings--account-status .settings-param__value').text(name);
        body$3.find('.settings--account-status .settings-param__descr').text(value);
      }
    }

    function renderPanel$1() {
      if (body$3) {
        var account = Storage.get('account', '{}');
        var signed = account.token ? true : false;
        body$3.find('.settings--account-signin').toggleClass('hide', signed);
        body$3.find('.settings--account-user').toggleClass('hide', !signed);

        if (account.token) {
          body$3.find('.settings--account-user-info .settings-param__value').text(account.email);
          body$3.find('.settings--account-user-profile .settings-param__value').text(account.profile.name);
          body$3.find('.settings--account-user-out').on('hover:enter', function () {
            Storage.set('account', {});
            Settings.update();
            update$5();
          });
          body$3.find('.settings--account-user-sync').on('hover:enter', function () {
            account = Storage.get('account', '{}');
            Select.show({
              title: Lang.translate('settings_cub_sync'),
              items: [{
                title: Lang.translate('confirm'),
                subtitle: Lang.translate('account_sync_to_profile') + ' (' + account.profile.name + ')',
                confirm: true
              }, {
                title: Lang.translate('cancel')
              }],
              onSelect: function onSelect(a) {
                if (a.confirm) {
                  var file = new File([localStorage.getItem('favorite') || '{}'], "bookmarks.json", {
                    type: "text/plain"
                  });
                  var formData = new FormData($('<form></form>')[0]);
                  formData.append("file", file, "bookmarks.json");
                  $.ajax({
                    url: api + 'bookmarks/sync',
                    type: 'POST',
                    data: formData,
                    async: true,
                    cache: false,
                    contentType: false,
                    enctype: 'multipart/form-data',
                    processData: false,
                    headers: {
                      token: account.token,
                      profile: account.profile.id
                    },
                    success: function success(j) {
                      if (j.secuses) {
                        Noty.show(Lang.translate('account_sync_secuses'));
                        update$5();
                      }
                    }
                  });
                }

                Controller.toggle('settings_component');
              },
              onBack: function onBack() {
                Controller.toggle('settings_component');
              }
            });
          });
          body$3.find('.settings--account-user-backup').on('hover:enter', backup);
          profile();
        } else check$1();
      }
    }

    function profile() {
      var account = Storage.get('account', '{}');
      body$3.find('.settings--account-user-profile .settings-param__value').text(account.profile.name);
      body$3.find('.settings--account-user-profile').on('hover:enter', function () {
        showProfiles('settings_component');
      });
    }

    function showProfiles(controller) {
      var account = Storage.get('account', '{}');
      network$9.clear();
      network$9.silent(api + 'profiles/all', function (result) {
        if (result.secuses) {
          Select.show({
            title: Lang.translate('account_profiles'),
            items: result.profiles.map(function (elem) {
              elem.title = elem.name;
              elem.selected = account.profile.id == elem.id;
              return elem;
            }),
            onSelect: function onSelect(a) {
              account.profile = a;
              Storage.set('account', account);
              if (body$3) body$3.find('.settings--account-user-profile .settings-param__value').text(a.name);
              Controller.toggle(controller);
              update$5();
            },
            onBack: function onBack() {
              Controller.toggle(controller);
            }
          });
        } else {
          Noty.show(result.text);
        }
      }, function () {
        Noty.show(Lang.translate('account_profiles_empty'));
      }, false, {
        headers: {
          token: account.token
        }
      });
    }

    function check$1() {
      var account = Storage.get('account', '{}');

      if (account.token) {
        renderStatus$1(Lang.translate('account_authorized'), Lang.translate('account_logged_in') + ' ' + account.email);
      } else {
        renderStatus$1(Lang.translate('account_login_failed'), Lang.translate('account_login_wait'));
      }
    }

    function working() {
      return Storage.get('account', '{}').token && Storage.field('account_use');
    }

    function get$a(params) {
      return bookmarks.filter(function (elem) {
        return elem.type == params.type;
      }).map(function (elem) {
        return elem.data;
      });
    }

    function all$2() {
      return bookmarks.map(function (elem) {
        return elem.data;
      });
    }

    function updateBookmarks(rows) {
      Storage.set('account_bookmarks', rows);
      bookmarks = rows.reverse().map(function (elem) {
        elem.data = JSON.parse(elem.data);
        return elem;
      });
    }
    /**
     * Проверка авторизации
     */


    function signin() {
      var email = Storage.value('account_email', '');
      var password = Storage.value('account_password', '');

      if (email && password) {
        network$9.clear();
        network$9.silent(api + 'users/signin', function (result) {
          if (result.secuses) {
            Storage.set('account', {
              email: email,
              token: result.user.token,
              id: result.user.id,
              profile: {
                name: Lang.translate('account_profile_main'),
                id: 0
              }
            });
            Settings.update();
            update$5();
          } else {
            renderStatus$1(Lang.translate('title_error'), result.text);
          }
        }, function () {
          renderStatus$1(Lang.translate('title_error'), Lang.translate('network_noconnect'));
        }, {
          email: email,
          password: password
        });
      }
    }

    function notice(call) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        if (notice_load.time + 1000 * 60 * 10 < Date.now()) {
          network$9.timeout(1000);
          network$9.silent(api + 'notice/all', function (result) {
            if (result.secuses) {
              notice_load.time = Date.now();
              notice_load.data = result.notice;
              Storage.set('account_notice', result.notice);
              call(result.notice);
            } else call([]);
          }, function () {
            call([]);
          }, false, {
            headers: {
              token: account.token
            }
          });
        } else call(notice_load.data);
      } else call([]);
    }

    function torrentViewed(data) {
      network$9.timeout(5000);
      network$9.silent(api + 'torrent/viewing', false, false, data);
    }

    function torrentPopular(data, secuses, error) {
      network$9.timeout(5000);
      network$9.silent(api + 'torrent/popular', secuses, error, data);
    }

    function backup() {
      var account = Storage.get('account', '{}');

      if (account.token) {
        Select.show({
          title: Lang.translate('settings_cub_backup'),
          items: [{
            title: Lang.translate('settings_cub_backup_export'),
            "export": true,
            selected: true
          }, {
            title: Lang.translate('settings_cub_backup_import'),
            "import": true
          }, {
            title: Lang.translate('cancel')
          }],
          onSelect: function onSelect(a) {
            if (a["export"]) {
              Select.show({
                title: Lang.translate('sure'),
                items: [{
                  title: Lang.translate('confirm'),
                  "export": true,
                  selected: true
                }, {
                  title: Lang.translate('cancel')
                }],
                onSelect: function onSelect(a) {
                  if (a["export"]) {
                    var file = new File([JSON.stringify(localStorage)], "backup.json", {
                      type: "text/plain"
                    });
                    var formData = new FormData($('<form></form>')[0]);
                    formData.append("file", file, "backup.json");
                    $.ajax({
                      url: api + 'users/backup/export',
                      type: 'POST',
                      data: formData,
                      async: true,
                      cache: false,
                      contentType: false,
                      enctype: 'multipart/form-data',
                      processData: false,
                      headers: {
                        token: account.token
                      },
                      success: function success(j) {
                        if (j.secuses) {
                          Noty.show(Lang.translate('account_export_secuses'));
                        }
                      },
                      error: function error() {
                        Noty.show(Lang.translate('account_export_fail'));
                      }
                    });
                  }

                  Controller.toggle('settings_component');
                },
                onBack: function onBack() {
                  Controller.toggle('settings_component');
                }
              });
            } else if (a["import"]) {
              network$9.silent(api + 'users/backup/import', function (data) {
                if (data.data) {
                  var keys = Arrays.getKeys(data.data);

                  for (var i in data.data) {
                    localStorage.setItem(i, data.data[i]);
                  }

                  Noty.show(Lang.translate('account_import_secuses') + ' - ' + Lang.translate('account_imported') + ' (' + keys.length + ') - ' + Lang.translate('account_reload_after'));
                  setTimeout(function () {
                    window.location.reload();
                  }, 5000);
                } else Noty.show(Lang.translate('nodata'));
              }, function () {
                Noty.show(Lang.translate('account_import_fail'));
              }, false, {
                headers: {
                  token: account.token
                }
              });
              Controller.toggle('settings_component');
            } else {
              Controller.toggle('settings_component');
            }
          },
          onBack: function onBack() {
            Controller.toggle('settings_component');
          }
        });
      }
    }

    var Account = {
      init: init$g,
      working: working,
      get: get$a,
      all: all$2,
      plugins: plugins,
      notice: notice,
      pluginsStatus: pluginsStatus,
      showProfiles: showProfiles,
      torrentViewed: torrentViewed,
      torrentPopular: torrentPopular,
      clear: clear$6,
      update: update$5,
      network: network$9,
      backup: backup
    };

    var data$5 = {};
    var listener$4 = start$4();

    function save$4() {
      Storage.set('favorite', data$5);
    }
    /**
     * Добавить
     * @param {String} where 
     * @param {Object} card 
     */


    function add$9(where, card, limit) {
      read$1();

      if (data$5[where].indexOf(card.id) < 0) {
        Arrays.insert(data$5[where], 0, card.id);
        listener$4.send('add', {
          where: where,
          card: card
        });
        if (!search$6(card.id)) data$5.card.push(card);

        if (limit) {
          var excess = data$5[where].slice(limit);

          for (var i = excess.length - 1; i >= 0; i--) {
            remove(where, {
              id: excess[i]
            });
          }
        }

        save$4();
      } else {
        Arrays.remove(data$5[where], card.id);
        Arrays.insert(data$5[where], 0, card.id);
        save$4();
        listener$4.send('added', {
          where: where,
          card: card
        });
      }
    }
    /**
     * Удалить
     * @param {String} where 
     * @param {Object} card 
     */


    function remove(where, card) {
      read$1();
      Arrays.remove(data$5[where], card.id);
      listener$4.send('remove', {
        where: where,
        card: card
      });

      for (var i = data$5.card.length - 1; i >= 0; i--) {
        var element = data$5.card[i];

        if (!check(element).any) {
          Arrays.remove(data$5.card, element);
          listener$4.send('remove', {
            where: where,
            card: element
          });
        }
      }

      save$4();
    }
    /**
     * Найти
     * @param {Int} id 
     * @returns Object
     */


    function search$6(id) {
      var found;

      for (var index = 0; index < data$5.card.length; index++) {
        var element = data$5.card[index];

        if (element.id == id) {
          found = element;
          break;
        }
      }

      return found;
    }
    /**
     * Переключить
     * @param {String} where 
     * @param {Object} card 
     */


    function toggle$1(where, card) {
      read$1();
      var find = cloud(card);
      if (find[where]) remove(where, card);else add$9(where, card);
      return find[where] ? false : true;
    }
    /**
     * Проверить
     * @param {Object} card 
     * @returns Object
     */


    function check(card) {
      var result = {
        like: data$5.like.indexOf(card.id) > -1,
        wath: data$5.wath.indexOf(card.id) > -1,
        book: data$5.book.indexOf(card.id) > -1,
        history: data$5.history.indexOf(card.id) > -1,
        any: true
      };
      if (!result.like && !result.wath && !result.book && !result.history) result.any = false;
      return result;
    }

    function cloud(card) {
      if (Account.working()) {
        var list = {
          like: Account.get({
            type: 'like'
          }),
          wath: Account.get({
            type: 'wath'
          }),
          book: Account.get({
            type: 'book'
          }),
          history: Account.get({
            type: 'history'
          })
        };
        var result = {
          like: list.like.find(function (elem) {
            return elem.id == card.id;
          }) ? true : false,
          wath: list.wath.find(function (elem) {
            return elem.id == card.id;
          }) ? true : false,
          book: list.book.find(function (elem) {
            return elem.id == card.id;
          }) ? true : false,
          history: list.history.find(function (elem) {
            return elem.id == card.id;
          }) ? true : false,
          any: true
        };
        if (!result.like && !result.wath && !result.book && !result.history) result.any = false;
        return result;
      } else return check(card);
    }
    /**
     * Получить списаок по типу
     * @param {String} params.type - тип 
     * @returns Object
     */


    function get$9(params) {
      if (Account.working()) {
        return Account.get(params);
      } else {
        read$1();
        var result = [];
        var ids = data$5[params.type];
        ids.forEach(function (id) {
          for (var i = 0; i < data$5.card.length; i++) {
            var card = data$5.card[i];
            if (card.id == id) result.push(card);
          }
        });
        return result;
      }
    }
    /**
     * Очистить
     * @param {String} where 
     * @param {Object} card 
     */


    function clear$5(where, card) {
      read$1();

      if (Account.working()) {
        Account.clear(where);
      } else {
        if (card) remove(where, card);else {
          for (var i = data$5[where].length - 1; i >= 0; i--) {
            var _card = search$6(data$5[where][i]);

            if (_card) remove(where, _card);
          }
        }
      }
    }
    /**
     * Считать последние данные
     */


    function read$1() {
      data$5 = Storage.get('favorite', '{}');
      Arrays.extend(data$5, {
        like: [],
        wath: [],
        book: [],
        card: [],
        history: []
      });
    }
    /**
     * Получить весь список что есть
     */


    function full$5() {
      Arrays.extend(data$5, {
        like: [],
        wath: [],
        book: [],
        card: [],
        history: []
      });
      return data$5;
    }

    function continues(type) {
      return Arrays.clone(get$9({
        type: 'history'
      }).filter(function (e) {
        return type == 'tv' ? e.number_of_seasons || e.first_air_date : !(e.number_of_seasons || e.first_air_date);
      }).slice(0, 19)).map(function (e) {
        e.check_new_episode = true;
        return e;
      });
    }
    /**
     * Запуск
     */


    function init$f() {
      read$1();
    }

    var Favorite = {
      listener: listener$4,
      check: cloud,
      add: add$9,
      remove: remove,
      toggle: toggle$1,
      get: get$9,
      init: init$f,
      clear: clear$5,
      continues: continues,
      full: full$5
    };

    function status$1(need) {
      this.data = {};
      this.work = 0;
      this.need = need;
      this.complited = false;

      this.check = function () {
        if (this.work >= this.need && !this.complited) {
          this.complited = true;
          this.onComplite(this.data);
        }
      };

      this.append = function (name, json) {
        this.work++;
        this.data[name] = json;
        this.check();
      };

      this.error = function () {
        this.work++;
        this.check();
      };
    }

    var data$4 = [];
    /**
     * Запуск
     */

    function init$e() {
      data$4 = Storage.cache('recomends_scan', 300, []);
      Favorite.get({
        type: 'history'
      }).forEach(function (elem) {
        if (['cub', 'tmdb'].indexOf(elem.source) >= 0) {
          var id = data$4.filter(function (a) {
            return a.id == elem.id;
          });

          if (!id.length) {
            data$4.push({
              id: elem.id,
              tv: elem.number_of_seasons
            });
          }
        }
      });
      Storage.set('recomends_scan', data$4);
      setInterval(search$5, 120 * 1000);
    }

    function search$5() {
      var ids = data$4.filter(function (e) {
        return !e.scan;
      });

      if (ids.length) {
        var elem = ids[0];
        elem.scan = 1;
        TMDB.get((elem.tv ? 'tv' : 'movie') + '/' + elem.id + '/recommendations', {}, function (json) {
          if (json.results && json.results.length) {
            var recomend = Storage.cache('recomends_list', 200, []);
            var favorite = Favorite.get({
              type: 'history'
            });
            json.results.forEach(function (e) {
              if (!recomend.filter(function (r) {
                return r.id == e.id;
              }).length && !favorite.filter(function (h) {
                return h.id == e.id;
              }).length) {
                recomend.push(e);
              }
            });
            Storage.set('recomends_list', recomend);
          }
        });
      } else {
        data$4.forEach(function (a) {
          return a.scan = 0;
        });
      }

      Storage.set('recomends_scan', data$4);
    }

    function get$8(type) {
      var all = Storage.get('recomends_list', '[]');
      return all.filter(function (e) {
        return type == 'tv' ? e.number_of_seasons || e.first_air_date : !(e.number_of_seasons || e.first_air_date);
      }).reverse();
    }

    var Recomends = {
      init: init$e,
      get: get$8
    };

    var data$3 = [];
    var token = '3i40G5TSECmLF77oAqnEgbx61ZWaOYaE';
    var network$8 = new create$p();
    var videocdn = 'http://cdn.svetacdn.in/api/short?api_token=' + token;
    var object$1 = false;
    /**
     * Запуск
     */

    function init$d() {
      data$3 = Storage.cache('quality_scan', 300, []);
      setInterval(extract$2, 30 * 1000);
    }
    /**
     * Добавить карточку для парсинга
     * @param {[{id:integer, title:string, imdb_id:string}]} elems - карточки
     */


    function add$8(elems) {
      elems.filter(function (elem) {
        return !(elem.number_of_seasons || elem.seasons);
      }).forEach(function (elem) {
        var id = data$3.filter(function (a) {
          return a.id == elem.id;
        });

        if (!id.length) {
          data$3.push({
            id: elem.id,
            title: elem.title,
            imdb_id: elem.imdb_id
          });
        }
      });
      Storage.set('quality_scan', data$3);
    }
    /**
     * Начать парсить качество
     * @param {{id:integer, title:string, imdb_id:string}} itm - карточка
     */


    function search$4(itm) {
      var url = 'http://cdn.svetacdn.in/api/';
      var type = itm.iframe_src.split('/').slice(-2)[0];
      if (type == 'movie') type = 'movies';
      url += type;
      url = Lampa.Utils.addUrlComponent(url, 'api_token=' + token);
      url = Lampa.Utils.addUrlComponent(url, itm.imdb_id ? 'imdb_id=' + encodeURIComponent(itm.imdb_id) : 'title=' + encodeURIComponent(itm.title));
      url = Lampa.Utils.addUrlComponent(url, 'field=' + encodeURIComponent('global'));
      network$8.timeout(4000);
      network$8.silent(url, function (found) {
        var results = found.data.filter(function (elem) {
          return elem.id == itm.id;
        });
        var qualitys = ['ts', 'camrip', 'webdl', 'dvdrip', 'hdrip', 'bd'];
        var index = 0;

        if (results.length && results[0].media) {
          results[0].media.map(function (m) {
            index = Math.max(index, qualitys.indexOf(m.source_quality));
            object$1.quality = qualitys[index];
          });
        }

        save$3();
      }, save$3);
    }
    /**
     * Найти фильм по imdb_id или титлу
     * @param {string} imdb_id 
     * @param {string} query 
     */


    function req(imdb_id, query) {
      var url = videocdn + '&' + (imdb_id ? 'imdb_id=' + encodeURIComponent(imdb_id) : 'title=' + encodeURIComponent(query));
      network$8.timeout(1000 * 15);
      network$8.silent(url, function (json) {
        if (json.data && json.data.length) {
          if (object$1.imdb_id) {
            var imdb = json.data.filter(function (elem) {
              return elem.imdb_id == object$1.imdb_id;
            });
            if (imdb.length) json.data = imdb;
          }

          if (json.data.length) {
            return search$4(json.data[0]);
          }
        }

        save$3();
      }, save$3);
    }
    /**
     * Получить карточку которую нужно парсить
     */


    function extract$2() {
      var ids = data$3.filter(function (e) {
        return !e.scaned && (e.scaned_time || 0) + 60 * 60 * 12 * 1000 < Date.now();
      });

      if (ids.length) {
        object$1 = ids[0];

        if (object$1.imdb_id) {
          req(object$1.imdb_id);
        } else {
          var dom = Storage.field('proxy_tmdb') ? 'apitmdb.cub.watch/3/' : 'api.themoviedb.org/3/';
          network$8.silent('http://' + dom + 'movie/' + object$1.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru', function (ttid) {
            req(ttid.imdb_id, object$1.title);
          }, save$3);
        }
      } else {
        data$3.forEach(function (a) {
          return a.scaned = 0;
        });
      }

      Storage.set('quality_scan', data$3);
    }
    /**
     * Сохранить состояние
     */


    function save$3() {
      if (object$1) {
        object$1.scaned = 1;
        object$1.scaned_time = Date.now();
        Storage.set('quality_scan', data$3);
      }
    }
    /**
     * Получить качество фильма если есть
     * @param {{id:integer}} elem - карточка
     * @returns {string}
     */


    function get$7(elem) {
      var fid = data$3.filter(function (e) {
        return e.id == elem.id;
      });
      return (fid.length ? fid[0] : {}).quality;
    }

    var VideoQuality = {
      init: init$d,
      get: get$7,
      add: add$8
    };

    var network$7 = new create$p();
    var key = '4ef0d7355d9ffb5151e987764708ce96';
    var menu_list$2 = [];

    function url$2(u) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      u = add$7(u, 'api_key=' + key);
      u = add$7(u, 'language=' + Storage.field('tmdb_lang'));
      if (params.genres) u = add$7(u, 'with_genres=' + params.genres);
      if (params.page) u = add$7(u, 'page=' + params.page);
      if (params.query) u = add$7(u, 'query=' + params.query);

      if (params.filter) {
        for (var i in params.filter) {
          u = add$7(u, i + '=' + params.filter[i]);
        }
      }

      var base = Storage.field('proxy_tmdb') ? 'apitmdb.cub.watch/3/' : 'api.themoviedb.org/3/';
      return Utils.protocol() + base + u;
    }

    function add$7(u, params) {
      return u + (/\?/.test(u) ? '&' : '?') + params;
    }

    function img$2(src, size) {
      var poster_size = Storage.field('poster_size');
      var baseimg = Utils.protocol() + (Storage.field('proxy_tmdb') ? 'imagetmdb.cub.watch' : 'image.tmdb.org') + '/t/p/' + poster_size + '/';
      var path = baseimg;
      if (src.indexOf("http") != -1) path = '';
      if (size) path = path.replace(new RegExp(poster_size, 'g'), size);
      return src ? path + src : '';
    }

    function find$1(find) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var finded;

      var filtred = function filtred(items) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];

          if (params.original_title == item.original_title || params.title == item.title || params.original_title == item.name) {
            finded = item;
            break;
          }
        }
      };

      if (find.movie && find.movie.results.length) filtred(find.movie.results);
      if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
      return finded;
    }

    function main$5() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var status = new status$1(11);  

      status.onComplite = function () {
        var fulldata = [];
        if (status.data.wath) fulldata.push(status.data.wath);
        if (status.data.trend_day) fulldata.push(status.data.trend_day);
        if (status.data.trend_week) fulldata.push(status.data.trend_week);
        if (status.data.upcoming) fulldata.push(status.data.upcoming);
        if (status.data.popular) fulldata.push(status.data.popular);
        if (status.data["popular_tv_kr"] && status.data["popular_tv_kr"].results.length) fulldata.push(status.data["popular_tv_kr"]);
      if (status.data["popular_tv_cn"] && status.data["popular_tv_cn"].results.length) fulldata.push(status.data["popular_tv_cn"]);
      if (status.data["popular_tv_en"] && status.data["popular_tv_en"].results.length) fulldata.push(status.data["popular_tv_en"]);
      if (status.data.popular_tv) fulldata.push(status.data.popular_tv);
                if (status.data.top) fulldata.push(status.data.top);
        if (status.data.top_tv) fulldata.push(status.data.top_tv);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status.append(name, json);
      };

      var date = new Date();
      var nparams4 = Arrays.clone(params);
      nparams4.filter = {
        with_original_language: "zh",
        sort_by: 'release_date.desc',
        year: date.getFullYear(),
        first_air_date_year: date.getFullYear(),
        //'vote_average.gte': 7,
        filter :"drama",
        with_genres : 18
      };
      get$6('tv/popular', nparams4, function (json) {
        json.filter = nparams4.filter;
        append('热门国产剧', 'popular_tv_cn', json);
      }, status.error.bind(status));

      var nparams5 = Arrays.clone(params);
      nparams5.filter = {
        with_original_language: "ko",
        sort_by: 'release_date.desc',
        year: date.getFullYear(),
        first_air_date_year: date.getFullYear(),
        //'vote_average.gte': 7,
        filter :"drama",
        with_genres : "18|80|10759|9648|10751"
      };
      get$6('tv/popular', nparams5, function (json) {
        json.filter = nparams5.filter;
        append('热门韩剧', 'popular_tv_kr', json);
      }, status.error.bind(status));

      var nparams6 = Arrays.clone(params);
      nparams6.filter = {
        with_original_language: "en",
        sort_by: 'release_date.desc',
        year: date.getFullYear(),
        first_air_date_year: date.getFullYear(),
        //'vote_average.gte': 7,
        filter :"drama",
        with_genres : 18
      };
      get$6('tv/popular', nparams6, function (json) {
        json.filter = nparams6.filter;
        append('热门英美剧', 'popular_tv_en', json);
      }, status.error.bind(status));

      get$6('movie/now_playing', params, function (json) {
        append(Lang.translate('title_now_watch'), 'wath', json);
        VideoQuality.add(json.results);
      }, status.error.bind(status));
      get$6('trending/moviews/day', params, function (json) {
        append(Lang.translate('title_trend_day'), 'trend_day', json);
      }, status.error.bind(status));
      get$6('trending/moviews/week', params, function (json) {
        append(Lang.translate('title_trend_week'), 'trend_week', json);
      }, status.error.bind(status));
      get$6('movie/upcoming', params, function (json) {
        append(Lang.translate('title_upcoming'), 'upcoming', json);
      }, status.error.bind(status));
      get$6('movie/popular', params, function (json) {
        append(Lang.translate('title_popular_movie'), 'popular', json);
        VideoQuality.add(json.results);
      }, status.error.bind(status));
      get$6('tv/popular', params, function (json) {
        append(Lang.translate('title_popular_tv'), 'popular_tv', json);
      }, status.error.bind(status));
      get$6('movie/top_rated', params, function (json) {
        append(Lang.translate('title_top_movie'), 'top', json);
      }, status.error.bind(status));
      get$6('tv/top_rated', params, function (json) {
        append(Lang.translate('title_top_tv'), 'top_tv', json);
      }, status.error.bind(status));
    }

    function category$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var show = ['tv', 'movie'].indexOf(params.url) > -1 && !params.genres;
      var books = show ? Favorite.continues(params.url) : [];
      var recomend = show ? Arrays.shuffle(Recomends.get(params.url)).slice(0, 19) : [];
      var status = new status$1(12);  

      status.onComplite = function () {
        var fulldata = [];
        if (books.length) fulldata.push({
          results: books,
          title: params.url == 'tv' ? Lang.translate('title_continue') : Lang.translate('title_watched')
        });
        if (recomend.length) fulldata.push({
          results: recomend,
          title: Lang.translate('title_recomend_watch')
        });
        if (status.data["continue"] && status.data["continue"].results.length) fulldata.push(status.data["continue"]);
        if (status.data["tv_air_kr"] && status.data["tv_air_kr"].results.length) fulldata.push(status.data["tv_air_kr"]);
        if (status.data["new_kr"] && status.data["new_kr"].results.length) fulldata.push(status.data["new_kr"]);
        if (status.data["tv_air_ch"] && status.data["tv_air_ch"].results.length) fulldata.push(status.data["tv_air_ch"]);
        if (status.data["new_cn"] && status.data["new_cn"].results.length) fulldata.push(status.data["new_cn"]);
        if (status.data["tv_air_en"] && status.data["tv_air_en"].results.length) fulldata.push(status.data["tv_air_en"]);
        if (status.data["new_en"] && status.data["new_en"].results.length) fulldata.push(status.data["new_en"]);
        if (status.data.wath && status.data.wath.results.length) fulldata.push(status.data.wath);
        if (status.data.popular && status.data.popular.results.length) fulldata.push(status.data.popular);
        if (status.data["new"] && status.data["new"].results.length) fulldata.push(status.data["new"]);
        if (status.data.tv_today && status.data.tv_today.results.length) fulldata.push(status.data.tv_today);
        if (status.data.tv_air && status.data.tv_air.results.length) fulldata.push(status.data.tv_air);
        if (status.data.top && status.data.top.results.length) fulldata.push(status.data.top);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status.append(name, json);
      };

      var date = new Date();
      var nparams4 = Arrays.clone(params);
      nparams4.filter = {
        with_original_language: "ko",
        sort_by: 'release_date.desc',
        year: date.getFullYear(),
        first_air_date_year: date.getFullYear(),
        'vote_average.gte': 7,
        filter :"drama"
      };
      get$6('discover/' + params.url, nparams4, function (json) {
        json.filter = nparams4.filter;
        append('今年韩剧', 'new_kr', json);
      }, status.error.bind(status));
      var nparams7 = Arrays.clone(params);
      nparams7.filter = {
        with_original_language: "zh",
        sort_by: 'release_date.desc',
        year: date.getFullYear(),
        first_air_date_year: date.getFullYear(),
        //'vote_average.gte': 7,
        filter :"drama",
        with_genres : "18|10759|10751|35|9648"
      };
      get$6('discover/' + params.url, nparams7, function (json) {
        json.filter = nparams7.filter;
        append('今年国产剧', 'new_cn', json);
      }, status.error.bind(status));
      var nparams8 = Arrays.clone(params);
      nparams8.filter = {
        with_original_language: "en",
        sort_by: 'release_date.desc',
        year: date.getFullYear(),
        first_air_date_year: date.getFullYear(),
        'vote_average.gte': 7,
        filter :"drama",
        with_genres : 18
      };
      get$6('discover/' + params.url, nparams8, function (json) {
        json.filter = nparams8.filter;
        append('今年英美剧', 'new_en', json);
      }, status.error.bind(status));
      var nparams5 = Arrays.clone(params);
      nparams5.filter = {
        with_original_language: "ko",
        filter :"drama",
        with_genres : 18
      };
      get$6(params.url + '/on_the_air', nparams5, function (json) {
        json.filter = nparams5.filter;
        append('本周韩剧', 'tv_air_kr', json);
      }, status.error.bind(status));

      var nparams1 = Arrays.clone(params);
      nparams1.filter = {
        with_original_language: "zh",
        filter :"drama",
        with_genres : 18
      };
      get$6(params.url + '/on_the_air', nparams1, function (json) {
        json.filter = nparams1.filter;
        append('本周国产剧', 'tv_air_ch', json);
      }, status.error.bind(status));
      var nparams2 = Arrays.clone(params);
      nparams2.filter = {
        with_original_language: "en",
        filter :"drama",
        with_genres : 18
      };
      get$6(params.url + '/on_the_air', nparams2, function (json) {
        json.filter = nparams2.filter;
        append('本周英美剧', 'tv_air_en', json);
      }, status.error.bind(status));

      get$6(params.url + '/now_playing', params, function (json) {
        append(Lang.translate('title_now_watch'), 'wath', json);
        if (show) VideoQuality.add(json.results);
      }, status.error.bind(status));
      get$6(params.url + '/popular', params, function (json) {
        append(Lang.translate('title_popular'), 'popular', json);
        if (show) VideoQuality.add(json.results);
      }, status.error.bind(status));
      var date = new Date();
      var nparams = Arrays.clone(params);
      nparams.filter = {
        sort_by: 'release_date.desc',
        year: date.getFullYear(),
        first_air_date_year: date.getFullYear(),
        'vote_average.gte': 7
      };
      get$6('discover/' + params.url, nparams, function (json) {
        json.filter = nparams.filter;
        append(Lang.translate('title_new'), 'new', json);
      }, status.error.bind(status));
      get$6(params.url + '/airing_today', params, function (json) {
        append(Lang.translate('title_tv_today'), 'tv_today', json);
      }, status.error.bind(status));
      get$6(params.url + '/on_the_air', params, function (json) {
        append(Lang.translate('title_this_week'), 'tv_air', json);
      }, status.error.bind(status));
      get$6(params.url + '/top_rated', params, function (json) {
        append(Lang.translate('title_in_top'), 'top', json);
      }, status.error.bind(status));
    }

    function full$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var status = new status$1(7);
      status.onComplite = oncomplite;
      get$6(params.method + '/' + params.id, params, function (json) {
        json.source = 'tmdb';

        if (params.method == 'tv') {
          get$6('tv/' + json.id + '/season/' + json.number_of_seasons, {}, function (ep) {
            status.append('episodes', ep);
          }, status.error.bind(status));
        } else status.need--;

        if (json.belongs_to_collection) {
          get$6('collection/' + json.belongs_to_collection.id, {}, function (collection) {
            collection.results = collection.parts.slice(0, 19);
            status.append('collection', collection);
          }, status.error.bind(status));
        } else status.need--;

        status.append('movie', json);
      }, function () {
        status.need -= 2;
        status.error();
      });

      if (Storage.field('light_version')) {
        status.need -= 3;
      } else {
        get$6(params.method + '/' + params.id + '/credits', params, function (json) {
          status.append('persons', json);
        }, status.error.bind(status));
        get$6(params.method + '/' + params.id + '/recommendations', params, function (json) {
          status.append('recomend', json);
        }, status.error.bind(status));
        get$6(params.method + '/' + params.id + '/similar', params, function (json) {
          status.append('simular', json);
        }, status.error.bind(status));
      }

      get$6(params.method + '/' + params.id + '/videos', params, function (json) {
        status.append('videos', json);
      }, status.error.bind(status));
    }

    function list$5() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var u = url$2(params.url, params);
      network$7.silent(u, oncomplite, onerror);
    }

    function get$6(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      var u = url$2(method, params);
      network$7.silent(u, function (json) {
        json.url = method;
        oncomplite(json);
      }, onerror);
    }

    function search$3() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var status = new status$1(2);
      status.onComplite = oncomplite;
      get$6('search/movie', params, function (json) {
        json.title = Lang.translate('menu_movies');
        status.append('movie', json);
      }, status.error.bind(status));
      get$6('search/tv', params, function (json) {
        json.title = Lang.translate('menu_tv');
        status.append('tv', json);
      }, status.error.bind(status));
    }

    function person$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;

      var sortCredits = function sortCredits(credits) {
        return credits.map(function (a) {
          a.year = parseInt(((a.release_date || a.first_air_date || '0000') + '').slice(0, 4));
          return a;
        }).sort(function (a, b) {
          return b.vote_average - a.vote_average && b.vote_count - a.vote_count;
        }); //сортируем по оценке и кол-ву голосов (чтобы отсечь мусор с 1-2 оценками)
      };

      var convert = function convert(credits, person) {
        credits.crew.forEach(function (a) {
          a.department = a.department == 'Production' ? Lang.translate('full_production') : a.department == 'Directing' ? Lang.translate('full_directing') : a.department;
        });
        var cast = sortCredits(credits.cast),
            crew = sortCredits(credits.crew),
            tv = sortCredits(cast.filter(function (media) {
          return media.media_type === 'tv';
        })),
            movie = sortCredits(cast.filter(function (media) {
          return media.media_type === 'movie';
        })),
            knownFor; //Наиболее известные работы человека
        //1. Группируем все работы по департаментам (Актер, Режиссер, Сценарист и т.д.)

        knownFor = Arrays.groupBy(crew, 'department');
        var actorGender = person.gender === 1 ? Lang.translate('title_actress') : Lang.translate('title_actor');
        if (movie.length > 0) knownFor["".concat(actorGender, " - ") + Lang.translate('menu_movies')] = movie;
        if (tv.length > 0) knownFor["".concat(actorGender, " - ") + Lang.translate('menu_tv')] = tv; //2. Для каждого департамента суммируем кол-ва голосов (вроде бы сам TMDB таким образом определяет knownFor для людей)

        knownFor = Object.entries(knownFor).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              depIdx = _ref2[0],
              dep = _ref2[1];

          //убираем дубликаты (человек может быть указан в одном департаменте несколько раз на разных должностях (job))
          var set = {},
              credits = dep.filter(function (credit) {
            return set.hasOwnProperty(credit.original_title || credit.original_name) ? false : credit.original_title ? set[credit.original_title] = true : set[credit.original_name] = true;
          });
          return {
            name: depIdx,
            credits: credits,
            vote_count: dep.reduce(function (a, b) {
              return a + b.vote_count;
            }, 0)
          }; //3. Сортируем департаменты по кол-ву голосов
        }).sort(function (a, b) {
          return b.vote_count - a.vote_count;
        });
        return {
          raw: credits,
          cast: cast,
          crew: crew,
          tv: tv,
          movie: movie,
          knownFor: knownFor
        };
      };

      var status = new status$1(2);

      status.onComplite = function () {
        var fulldata = {};
        if (status.data.person) fulldata.person = status.data.person;
        if (status.data.credits) fulldata.credits = convert(status.data.credits, status.data.person);
        oncomplite(fulldata);
      };

      get$6('person/' + params.id, params, function (json) {
        status.append('person', json);
      }, status.error.bind(status));
      get$6('person/' + params.id + '/combined_credits', params, function (json) {
        status.append('credits', json);
      }, status.error.bind(status));
    }

    function menu$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      if (menu_list$2.length) oncomplite(menu_list$2);else {
        var u = url$2('genre/movie/list', params);
        network$7.silent(u, function (j) {
          j.genres.forEach(function (g) {
            menu_list$2.push({
              title: g.name,
              id: g.id
            });
          });
          oncomplite(menu_list$2);
        });
      }
    }

    function menuCategory$2(params, oncomplite) {
      var menu = [];

      if (params.action !== 'tv') {
        menu.push({
          title: Lang.translate('title_now_watch'),
          url: params.action + '/now_playing'
        });
      }

      menu.push({
        title: Lang.translate('title_popular'),
        url: params.action + '/popular'
      });
      var date = new Date();
      var query = [];
      query.push('sort_by=release_date.desc');
      query.push('year=' + date.getFullYear());
      query.push('first_air_date_year=' + date.getFullYear());
      query.push('vote_average.gte=7');
      menu.push({
        title: Lang.translate('title_new'),
        url: 'discover/' + params.action + '?' + query.join('&')
      });

      if (params.action == 'tv') {
        menu.push({
          title: Lang.translate('title_tv_today'),
          url: params.action + '/airing_today'
        });
        menu.push({
          title: Lang.translate('title_this_week'),
          url: params.action + '/on_the_air'
        });
      }

      menu.push({
        title: Lang.translate('title_in_top'),
        url: params.action + '/top_rated'
      });
      oncomplite(menu);
    }

    function external_ids() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      get$6('tv/' + params.id + '/external_ids', oncomplite, onerror);
    }

    function company$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var u = url$2('company/' + params.id, params);
      network$7.silent(u, oncomplite, onerror);
    }

    function seasons$4(tv, from, oncomplite) {
      var status = new status$1(from.length);
      status.onComplite = oncomplite;
      from.forEach(function (season) {
        get$6('tv/' + tv.id + '/season/' + season, {}, function (json) {
          status.append('' + season, json);
        }, status.error.bind(status));
      });
    }

    function screensavers(oncomplite, onerror) {
      get$6('trending/all/week', {
        page: Math.round(Math.random() * 30)
      }, function (json) {
        oncomplite(json.results.filter(function (entry) {
          return entry.backdrop_path && !entry.adult;
        }));
      }, onerror);
    }

    function clear$4() {
      network$7.clear();
    }

    var TMDB = {
      main: main$5,
      menu: menu$4,
      img: img$2,
      full: full$4,
      list: list$5,
      category: category$4,
      search: search$3,
      clear: clear$4,
      company: company$1,
      person: person$4,
      seasons: seasons$4,
      find: find$1,
      screensavers: screensavers,
      external_ids: external_ids,
      get: get$6,
      menuCategory: menuCategory$2
    };

    var prox$1 = 'http://proxy.cub.watch/img/';
    var baseurl$2 = 'https://ctx.playfamily.ru/screenapi/v1/noauth/';
    var network$6 = new create$p();
    var menu_list$1 = [];

    function img$1(element) {
      var need = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'PORTRAIT';

      if (element.basicCovers && element.basicCovers.items.length) {
        for (var index = 0; index < element.basicCovers.items.length; index++) {
          var _img = element.basicCovers.items[index];
          if (_img.imageType == need) return prox$1 + _img.url + '?width=' + (need == 'COVER' ? 800 : 300) + '&scale=1&quality=80&mediaType=jpeg';
        }

        return prox$1 + element.basicCovers.items[0].url + '?width=500&scale=1&quality=80&mediaType=jpeg';
      }

      return '';
    }

    function tocard$1(element) {
      return {
        url: element.alias,
        id: element.id,
        title: (Storage.field('tmdb_lang') == 'ru') ? element.name : element.originalName,
        original_title: element.originalName,
        release_date: '0000',
        vote_average: element.kinopoiskRating || element.okkoRating || 0,
        poster: img$1(element),
        cover: img$1(element, 'COVER'),
        promo: element.promoText,
        description: element.description
      };
    }

    function collections$2(params, oncomplite, onerror) {
      var frm = 20 * (params.page - 1);
      var uri = baseurl$2 + 'collection/web/1?elementAlias=' + (params.url || 'collections_web') + '&elementType=COLLECTION&limit=20&offset=' + frm + '&withInnerCollections=true&includeProductsForUpsale=false&filter=%7B%22sortType%22%3A%22RANK%22%2C%22sortOrder%22%3A%22ASC%22%2C%22useSvodFilter%22%3Afalse%2C%22genres%22%3A%5B%5D%2C%22yearsRange%22%3Anull%2C%22rating%22%3Anull%7D';
      network$6["native"](uri, function (json) {
        var result = {
          results: [],
          total_pages: 0,
          page: params.page
        };

        if (json.element) {
          json.element.collectionItems.items.forEach(function (elem) {
            var element = elem.element;
            var item = {
              url: element.alias,
              id: element.id,
              title: (Storage.field('tmdb_lang') == 'ru') ? element.name : element.alias,
              poster: prox$1 + (element.basicCovers && element.basicCovers.items.length ? element.basicCovers.items[0].url + '?width=300&scale=1&quality=80&mediaType=jpeg' : 'https://www.ivi.ru/images/stubs/collection_preview_stub.jpeg')
            };
            if (params.url) item = tocard$1(element);
            result.results.push(item);
          });
          result.total_pages = Math.round(json.element.collectionItems.totalSize / 20);
        }

        oncomplite(result);
      }, onerror);
    }

    function persons$1(element) {
      var data = [];

      if (element.actors) {
        element.actors.items.forEach(function (elem) {
          var item = elem.element;
          data.push({
            url: item.alias,
            name: item.name,
            character: item.originalName
          });
        });
      }

      return data.length ? {
        cast: data
      } : false;
    }

    function genres$2(element) {
      return element.genres.items.map(function (elem) {
        elem.element.url = elem.element.alias;
        return elem.element;
      });
    }

    function countries$1(element) {
      return element.countries.items.map(function (elem) {
        return elem.element;
      });
    }

    function date(element) {
      var d = new Date(element.worldReleaseDate || element || 0);
      return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    }

    function seasonsCount$1(element) {
      var data = {
        seasons: 0,
        episodes: 0
      };

      if (element.children) {
        data.seasons = element.children.totalSize;
        element.children.items.forEach(function (elem) {
          data.episodes += elem.element.children ? elem.element.children.totalSize : 0;
        });
      }

      return data;
    }

    function seasonsDetails(element) {
      var data = {};

      if (element.children) {
        element.children.items.forEach(function (elem, sn) {
          var episodes = [];

          if (elem.element.children) {
            elem.element.children.items.forEach(function (episode, en) {
              episodes.push({
                name: episode.element.name,
                img: img$1(episode.element, 'COVER'),
                air_date: date(episode.element.releaseSaleDate || 0),
                episode_number: en + 1
              });
            });
          }

          data['' + (sn + 1)] = {
            name: elem.element.name,
            air_date: date(elem.element.worldReleaseDate || 0),
            episodes: episodes
          };
        });
        return data;
      }
    }

    function similar$1(element) {
      var data = [];
      element.similar.items.forEach(function (elem) {
        data.push(tocard$1(elem.element));
      });
      return data.length ? {
        results: data
      } : false;
    }

    function seasons$3(tv, from, oncomplite, onerror) {
      oncomplite(tv.seasons || {});
    }

    function menu$3(params, oncomplite) {
      if (!menu_list$1.length) {
        network$6.timeout(1000);
        network$6["native"](baseurl$2 + 'collection/web/1?elementAlias=action&elementType=GENRE&limit=20&offset=0&withInnerCollections=false&includeProductsForUpsale=false&filter=null', function (json) {
          if (json.uiScreenInfo && json.uiScreenInfo.webMain) {
            json.uiScreenInfo.webMain.forEach(function (element) {
              menu_list$1.push({
                title: element.name,
                id: element.alias
              });
            });
            oncomplite(menu_list$1);
          }
        });
      } else {
        oncomplite(menu_list$1);
      }
    }

    function videos$1(element) {
      var data = [];
      var qa = 0;
      element.trailers.items.forEach(function (item) {
        var media = item.media;

        if (media.width > qa && media.mimeType == 'mp4/ts') {
          qa = media.width;
          data.push({
            name: data.length + 1 + ' / ' + item.language,
            url: item.url,
            player: true
          });
        }
      });
      return data.length ? {
        results: data
      } : false;
    }

    function list$4(params, oncomplite, onerror) {
      var frm = 20 * (params.page - 1);
      network$6["native"](baseurl$2 + 'collection/web/1?elementAlias=' + (params.url || params.id) + '&elementType=' + (params.type || 'GENRE') + '&limit=20&offset=' + frm + '&withInnerCollections=false&includeProductsForUpsale=false&filter=null', function (json) {
        var items = [];

        if (json.element && json.element.collectionItems) {
          json.element.collectionItems.items.forEach(function (elem) {
            items.push(tocard$1(elem.element));
          });
          oncomplite({
            results: items,
            total_pages: Math.round(json.element.collectionItems.totalSize / 20)
          });
        } else {
          onerror();
        }
      }, onerror);
    }

    function person$3(params, oncomplite, onerror) {
      network$6["native"](baseurl$2 + 'collection/web/1?elementAlias=' + params.url + '&elementType=PERSON&limit=60&offset=0&withInnerCollections=false&includeProductsForUpsale=false&filter=null', function (json) {
        var data = {
          movie: {
            results: []
          }
        };

        if (json.element && json.element.collectionItems) {
          json.element.collectionItems.items.forEach(function (elem) {
            data.movie.results.push(tocard$1(elem.element));
          });
          data.person = {
            name: json.element.name,
            biography: '',
            img: '',
            place_of_birth: '',
            birthday: '----'
          };
          oncomplite(data);
        } else {
          onerror();
        }
      }, onerror);
    }

    function main$4(params, oncomplite, onerror) {
      network$6["native"](baseurl$2 + 'mainpage/web/1', function (json) {
        var element = json.element;
        var fulldata = [];

        if (element) {
          var blocks = json.element.collectionItems.items;

          if (blocks) {
            blocks.forEach(function (el) {
              if (el.element && el.element.alias === "web_featured") {
                var slides = {
                  title: Lang.translate('title_new'),
                  results: [],
                  wide: true,
                  nomore: true
                };
                el.element.collectionItems.items.forEach(function (elem) {
                  slides.results.push(tocard$1(elem.element));
                });
                fulldata.push(slides);
              } else if (el.element && el.element.alias && el.element.name && el.element.description) {
                var line = {
                  title: el.element.name,
                  url: el.element.alias,
                  results: [],
                  more: true
                };
                el.element.collectionItems.items.forEach(function (elem) {
                  line.results.push(tocard$1(elem.element));
                });
                fulldata.push(line);
              }
            });
          }
        }

        if (fulldata.length) oncomplite(fulldata);else onerror();
      }, onerror);
    }

    function category$3(params, oncomplite, onerror) {
      var status = new status$1(7);
      var books = Favorite.continues(params.url);

      status.onComplite = function () {
        var fulldata = [];
        if (books.length) fulldata.push({
          results: books,
          title: params.url == 'tv' ? Lang.translate('title_title_continue') : Lang.translate('title_watched')
        });
        if (status.data["new"] && status.data["new"].results.length) fulldata.push(status.data["new"]);
        if (status.data.top && status.data.top.results.length) fulldata.push(status.data.top);
        if (status.data.three && status.data.three.results.length) fulldata.push(status.data.three);
        if (status.data.four && status.data.four.results.length) fulldata.push(status.data.four);
        if (status.data.five && status.data.five.results.length) fulldata.push(status.data.five);
        if (status.data.six && status.data.six.results.length) fulldata.push(status.data.six);
        if (status.data.seven && status.data.seven.results.length) fulldata.push(status.data.seven);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, id, json) {
        json.title = title;
        json.url = id;
        status.append(name, json);
      };

      if (params.url == 'movie') {
        list$4({
          url: 'Novelty',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('title_new'), 'new', 'Novelty', json);
        }, status.error.bind(status));
        list$4({
          url: 'topfilms',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_top_new'), 'top', 'topfilms', json);
        }, status.error.bind(status));
        list$4({
          url: 'comedy-plus-horror-movies',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_comedy_horror'), 'three', 'comedy-plus-horror-movies', json);
        }, status.error.bind(status));
        list$4({
          url: 'collection_maniacs',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_collection_maniacs'), 'four', 'collection_maniacs', json);
        }, status.error.bind(status));
        list$4({
          url: 'witches',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_witches'), 'five', 'witches', json);
        }, status.error.bind(status));
        list$4({
          url: 'zombies',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_zombies'), 'six', 'zombies', json);
        }, status.error.bind(status));
        list$4({
          url: 'Russian-17490',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_ru'), 'seven', 'Russian-17490', json);
        }, status.error.bind(status));
      } else {
        list$4({
          url: 'Serials',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('title_new'), 'new', 'Serials', json);
        }, status.error.bind(status));
        list$4({
          url: 'horror-serial-all-svod',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_horror_serial'), 'top', 'horror-serial-all-svod', json);
        }, status.error.bind(status));
        list$4({
          url: 'series-about-serial-killers',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_serial_killers'), 'three', 'series-about-serial-killers', json);
        }, status.error.bind(status));
        list$4({
          url: 'black-humor-serial-all-svod',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_humor_serial'), 'four', 'black-humor-serial-all-svod', json);
        }, status.error.bind(status));
        list$4({
          url: 'legkiye-serialy-all-svod',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_legkiye_serialy'), 'five', 'legkiye-serialy-all-svod', json);
        }, status.error.bind(status));
        list$4({
          url: 'comedy-serial-all-svod',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_comedy_serial'), 'six', 'comedy-serial-all-svod', json);
        }, status.error.bind(status));
        list$4({
          url: 'russian_tvseries',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append(Lang.translate('okko_ru_tv'), 'seven', 'russian_tvseries', json);
        }, status.error.bind(status));
      }
    }

    function full$3(params, oncomplite, onerror) {
      var data = {};
      network$6["native"](baseurl$2 + 'moviecard/web/1?elementAlias=' + params.url + '&elementType=MOVIE', function (json) {
        var element = json.element;

        if (element) {
          data.persons = persons$1(element);
          data.simular = similar$1(element);
          data.videos = videos$1(element);
          data.movie = {
            id: element.id,
            url: element.alias,
            source: 'okko',
            title: element.name,
            original_title: element.originalName,
            name: element.type == 'SERIAL' ? element.name : '',
            original_name: element.type == 'SERIAL' ? element.originalName : '',
            overview: element.description,
            img: img$1(element),
            runtime: (element.duration || 0) / 1000 / 60,
            genres: genres$2(element),
            vote_average: element.imdbRating || element.kinopoiskRating || 0,
            production_companies: [],
            production_countries: countries$1(element),
            budget: element.budget && element.budget.value ? element.budget.value : 0,
            release_date: date(element),
            number_of_seasons: seasonsCount$1(element).seasons,
            number_of_episodes: seasonsCount$1(element).episodes,
            seasons: seasonsDetails(element),
            first_air_date: element.type == 'SERIAL' ? date(element) : ''
          };
        }

        oncomplite(data);
      }, onerror);
    }

    var OKKO = {
      main: main$4,
      full: full$3,
      collections: collections$2,
      seasons: seasons$3,
      list: list$4,
      person: person$3,
      menu: menu$3,
      category: category$3,
      clear: network$6.clear
    };

    var baseurl$1 = 'https://api.ivi.ru/mobileapi/';
    var network$5 = new create$p();
    var menu_list = [];
    var prox = 'http://proxy.cub.watch/img/';

    function tocard(element) {
      return {
        url: element.hru,
        id: element.id,
        title: element.title,
        original_title: element.orig_title,
        release_date: element.release_date || element.ivi_pseudo_release_date || element.ivi_release_date || (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
        vote_average: element.ivi_rating_10 || 0,
        poster: img(element),
        year: element.year,
        years: element.years
      };
    }

    function entities(url, oncomplite, onerror) {
      network$5["native"]('https://www.ivi.ru/' + url, function (str) {
        var parse = parse = str.match(/window.__INITIAL_STATE__ = (\{.*?\});<\/script>/);
        var json = {};

        try {
          json = parse && eval('(' + parse[1] + ')');
        } catch (e) {}

        if (json.entities) {
          if (!menu_list.length) {
            for (var i in json.entities.genres) {
              var item = json.entities.genres[i];
              menu_list.push({
                title: item.title + ' (' + item.catalogue_count + ')',
                id: item.id
              });
            }
          }

          oncomplite(json.entities, json);
        } else onerror();
      }, onerror, false, {
        dataType: 'text'
      });
    }

    function find(json, id) {
      var found;

      for (var i in json.content) {
        if (i == id) found = json.content[i];
      }

      return found;
    }

    function img(element) {
      var posters = element.poster_originals || element.posters;
      return posters && posters[0] ? prox + (posters[0].path || posters[0].url) + '/300x456/' : '';
    }

    function genres$1(element, json) {
      var data = [];
      element.genres.forEach(function (id) {
        var genre = json.genres[id];

        if (genre) {
          data.push({
            id: genre.id,
            name: genre.title
          });
        }
      });
      return data;
    }

    function countries(element, json) {
      var data = [];

      if (element.country && json.countries[element.country]) {
        data.push({
          name: json.countries[element.country].title
        });
      }

      return data;
    }

    function persons(json) {
      var data = [];

      if (json.persons && json.persons.info) {
        for (var i in json.persons.info) {
          var _person = json.persons.info[i],
              images = Arrays.getValues(_person.images || {});

          if (_person.profession_types[0] == 6) {
            data.push({
              name: _person.name,
              character: Lang.translate('title_actor'),
              id: _person.id,
              img: images.length ? prox + images[0].path : ''
            });
          }
        }
      }

      return data.length ? {
        cast: data
      } : false;
    }

    function similar(element, json) {
      var data = [];

      if (json.content) {
        for (var i in json.content) {
          var item = json.content[i];
          if (element !== item) data.push(tocard(item));
        }

        data.sort(function (a, b) {
          var ay = a.year || (a.years ? a.years[0] : 0);
          var by = b.year || (b.years ? b.years[0] : 0);
          return by - ay;
        });
      }

      return data.length ? {
        results: data
      } : false;
    }

    function videos(element) {
      var data = [];

      if (element.additional_data) {
        element.additional_data.forEach(function (atach) {
          if (atach.data_type == 'trailer' && atach.files) {
            atach.files.forEach(function (file) {
              if (file.content_format == 'MP4-HD1080') {
                data.push({
                  name: atach.title,
                  url: file.url,
                  player: true
                });
              }
            });
          }
        });
      }

      return data.length ? {
        results: data
      } : false;
    }

    function seasonsCount(element) {
      var data = {
        seasons: 0,
        episodes: 0
      };

      if (element.seasons) {
        data.seasons = element.seasons.length;

        for (var i in element.seasons_content_total) {
          data.episodes += element.seasons_content_total[i];
        }
      }

      return data;
    }

    function seasons$2(tv, from, oncomplite, onerror) {
      var status = new status$1(from.length);
      status.onComplite = oncomplite;
      from.forEach(function (season) {
        network$5["native"](baseurl$1 + 'videofromcompilation/v5/?id=' + tv.id + '&season=' + season + '&from=0&to=60&fake=1&mark_as_purchased=1&app_version=870&session=66674cdb8528557407669760_1650471651-0EALRgbYRksN8Hfc5UthGeg', function (json) {
          if (json.result) {
            var episodes = [];
            json.result.forEach(function (elem) {
              episodes.push({
                name: elem.title,
                img: elem.promo_images && elem.promo_images.length ? prox + elem.promo_images[0].url + '/300x240/' : '',
                air_date: elem.release_date || elem.ivi_pseudo_release_date || elem.ivi_release_date || (elem.year ? elem.year + '' : elem.years ? elem.years[0] + '' : '0000'),
                episode_number: elem.episode
              });
            });
            status.append('' + season, {
              episodes: episodes
            });
          } else status.error();
        }, status.error.bind(status));
      });
    }

    function comments(json) {
      var data = [];

      if (json.comments) {
        for (var i in json.comments) {
          var com = json.comments[i];
          com.text = com.text.replace(/\\[n|r|t]/g, '');
          data.push(com);
        }
      }

      return data.length ? data : false;
    }

    function menu$2(params, oncomplite) {
      if (!menu_list.length) {
        network$5.timeout(1000);
        entities('', function () {
          oncomplite(menu_list);
        });
      } else oncomplite(menu_list);
    }

    function full$2(params, oncomplite, onerror) {
      entities('watch/' + (params.url || params.id), function (json, all) {
        var data = {};
        var element = find(json, params.id);
        console.log(json, all);

        if (element) {
          data.persons = persons(json);
          data.simular = similar(element, json);
          data.videos = videos(element);
          data.comments = comments(json);
          data.movie = {
            id: element.id,
            url: element.hru,
            source: 'ivi',
            title: element.title,
            original_title: element.orig_title,
            name: element.seasons ? element.title : '',
            original_name: element.seasons ? element.orig_title : '',
            overview: element.description.replace(/\\[n|r|t]/g, ''),
            img: img(element),
            runtime: element.duration_minutes,
            genres: genres$1(element, json),
            vote_average: parseFloat(element.ivi_rating_10 || element.imdb_rating || element.kp_rating || '0'),
            production_companies: [],
            production_countries: countries(element, json),
            budget: element.budget || 0,
            release_date: element.release_date || element.ivi_pseudo_release_date || element.ivi_release_date || '0000',
            number_of_seasons: seasonsCount(element).seasons,
            number_of_episodes: seasonsCount(element).episodes,
            first_air_date: element.seasons ? element.release_date || element.ivi_pseudo_release_date || element.ivi_release_date || '0000' : ''
          };
        }

        oncomplite(data);
      }, onerror);
    }

    function person$2(params, oncomplite, onerror) {
      entities('person/' + (params.url || params.id), function (json, all) {
        var data = {};

        if (all.pages && all.pages.personPage) {
          var element = all.pages.personPage.person.info,
              images = Arrays.getValues(element.images || {});
          data.person = {
            name: element.name,
            biography: element.bio,
            img: images.length ? prox + images[0].path : '',
            place_of_birth: element.eng_title,
            birthday: '----'
          };
          data.movie = similar(element, json);
        }

        oncomplite(data);
      }, onerror);
    }

    function list$3(params, oncomplite, onerror) {
      var fr = 20 * (params.page - 1),
          to = fr + 19;
      var url = baseurl$1 + 'catalogue/v5/?genre=' + params.genres + '&from=' + fr + '&to=' + to + '&withpreorderable=true';
      if (!params.genres) url = baseurl$1 + 'collection/catalog/v5/?id=' + params.url + '&withpreorderable=true&fake=false&from=' + fr + '&to=' + to + '&sort=priority_in_collection&fields=id%2Civi_pseudo_release_date%2Crelease_date%2Corig_title%2Ctitle%2Cfake%2Cpreorderable%2Cavailable_in_countries%2Chru%2Cposter_originals%2Crating%2Ccontent_paid_types%2Ccompilation_hru%2Ckind%2Cadditional_data%2Crestrict%2Chd_available%2Chd_available_all%2C3d_available%2C3d_available_all%2Cuhd_available%2Cuhd_available_all%2Chdr10_available%2Chdr10_available_all%2Cdv_available%2Cdv_available_all%2Cfullhd_available%2Cfullhd_available_all%2Chdr10plus_available%2Chdr10plus_available_all%2Chas_5_1%2Cshields%2Cseasons_count%2Cseasons_content_total%2Cseasons%2Cepisodes%2Cseasons_description%2Civi_rating_10_count%2Cseasons_extra_info%2Ccount%2Cgenres%2Cyears%2Civi_rating_10%2Crating%2Ccountry%2Cduration_minutes%2Cyear&app_version=870';
      network$5["native"](url, function (json) {
        var items = [];

        if (json.result) {
          json.result.forEach(function (element) {
            items.push(tocard(element));
          });
        }

        oncomplite({
          results: items,
          total_pages: Math.round(json.count / 20)
        });
      }, onerror);
    }

    function category$2(params, oncomplite, onerror) {
      var status = new status$1(params.url == 'movie' ? 4 : 5);
      var books = Favorite.continues(params.url);

      status.onComplite = function () {
        var fulldata = [];
        if (books.length) fulldata.push({
          results: books,
          title: params.url == 'tv' ? Lang.translate('title_title_continue') : Lang.translate('title_watched')
        });
        if (status.data["new"] && status.data["new"].results.length) fulldata.push(status.data["new"]);
        if (status.data.best && status.data.best.results.length) fulldata.push(status.data.best);
        if (status.data.rus && status.data.rus.results.length) fulldata.push(status.data.rus);
        if (status.data.popular && status.data.popular.results.length) fulldata.push(status.data.popular);
        if (status.data.ivi && status.data.ivi.results.length) fulldata.push(status.data.ivi);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, id, json) {
        json.title = title;
        json.url = id;

        if (json.results.results) {
          json.results = json.results.results;
        }

        status.append(name, json);
      };

      if (params.url == 'movie') {
        collections$1({
          id: '8258'
        }, function (json) {
          append(Lang.translate('ivi_premieres'), 'new', '8258', {
            results: json
          });
        }, status.error.bind(status));
        collections$1({
          id: '942'
        }, function (json) {
          append(Lang.translate('ivi_best'), 'best', '942', {
            results: json
          });
        }, status.error.bind(status));
        collections$1({
          id: '11512'
        }, function (json) {
          append(Lang.translate('ivi_popular'), 'popular', '11512', {
            results: json
          });
        }, status.error.bind(status));
        collections$1({
          id: '8448'
        }, function (json) {
          append(Lang.translate('ivi_choice'), 'ivi', '8448', {
            results: json
          });
        }, status.error.bind(status));
      } else {
        collections$1({
          id: '1984'
        }, function (json) {
          append(Lang.translate('ivi_new'), 'new', '1984', {
            results: json
          });
        }, status.error.bind(status));
        collections$1({
          id: '1712'
        }, function (json) {
          append(Lang.translate('ivi_foreign'), 'best', '1712', {
            results: json
          });
        }, status.error.bind(status));
        collections$1({
          id: '935'
        }, function (json) {
          append(Lang.translate('ivi_ru'), 'rus', '935', {
            results: json
          });
        }, status.error.bind(status));
        collections$1({
          id: '12839'
        }, function (json) {
          append(Lang.translate('ivi_popular'), 'popular', '12839', {
            results: json
          });
        }, status.error.bind(status));
        collections$1({
          id: '1057'
        }, function (json) {
          append(Lang.translate('ivi_choice'), 'ivi', '1057', {
            results: json
          });
        }, status.error.bind(status));
      }
    }

    function main$3(params, oncomplite, onerror) {
      var status = new status$1(13);

      status.onComplite = function () {
        var fulldata = [];

        for (var i = 1; i <= 13; i++) {
          var n = i + '';
          if (status.data[n] && status.data[n].results.length) fulldata.push(status.data[n]);
        }

        console.log(fulldata, status);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, id, json) {
        json.title = title;
        json.url = id;

        if (json.results.results) {
          json.results = json.results.results;
        }

        status.append(name, json);
      };

      collections$1({
        id: '4655'
      }, function (json) {
        append(Lang.translate('ivi_recomend'), '1', '4655', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '2460'
      }, function (json) {
        append(Lang.translate('ivi_for_famaly'), '2', '2460', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '917'
      }, function (json) {
        append(Lang.translate('ivi_triller'), '3', '917', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '1327'
      }, function (json) {
        append(Lang.translate('ivi_advance'), '4', '1327', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '1246'
      }, function (json) {
        append(Lang.translate('ivi_detective'), '5', '1246', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '1335'
      }, function (json) {
        append(Lang.translate('ivi_crime_comedy'), '6', '1335', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '1411'
      }, function (json) {
        append(Lang.translate('ivi_romantic'), '7', '1411', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '73'
      }, function (json) {
        append(Lang.translate('ivi_crime_dramas'), '8', '73', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '1413'
      }, function (json) {
        append(Lang.translate('ivi_fantastic_dramas'), '9', '1413', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '62'
      }, function (json) {
        append(Lang.translate('ivi_military_dramas'), '10', '62', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '1418'
      }, function (json) {
        append(Lang.translate('ivi_mistic'), '11', '1418', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '4495'
      }, function (json) {
        append(Lang.translate('ivi_foreign_series'), '12', '4495', {
          results: json
        });
      }, status.error.bind(status));
      collections$1({
        id: '217'
      }, function (json) {
        append(Lang.translate('ivi_historical_series'), '13', '217', {
          results: json
        });
      }, status.error.bind(status));
    }

    function collections$1(params, oncomplite, onerror) {
      var fr = 20 * (params.page - 1),
          to = fr + 19;
      var uri = baseurl$1 + 'collections/v5/?app_version=870&from=' + fr + '&tags_exclude=goodmovies&to=' + to;
      if (params.id) uri = baseurl$1 + 'collection/catalog/v5/?id=' + params.id + '&withpreorderable=true&fake=false&from=' + fr + '&to=' + to + '&sort=priority_in_collection&fields=id%2Civi_pseudo_release_date%2Crelease_date%2Corig_title%2Ctitle%2Cfake%2Cpreorderable%2Cavailable_in_countries%2Chru%2Cposter_originals%2Crating%2Ccontent_paid_types%2Ccompilation_hru%2Ckind%2Cadditional_data%2Crestrict%2Chd_available%2Chd_available_all%2C3d_available%2C3d_available_all%2Cuhd_available%2Cuhd_available_all%2Chdr10_available%2Chdr10_available_all%2Cdv_available%2Cdv_available_all%2Cfullhd_available%2Cfullhd_available_all%2Chdr10plus_available%2Chdr10plus_available_all%2Chas_5_1%2Cshields%2Cseasons_count%2Cseasons_content_total%2Cseasons%2Cepisodes%2Cseasons_description%2Civi_rating_10_count%2Cseasons_extra_info%2Ccount%2Cgenres%2Cyears%2Civi_rating_10%2Crating%2Ccountry%2Cduration_minutes%2Cyear&app_version=870';
      network$5.timeout(15000);
      network$5["native"](uri, function (json) {
        var result = {
          results: [],
          total_pages: 0,
          page: params.page
        };

        if (json.result) {
          json.result.forEach(function (element) {
            var item = {
              id: element.id,
              url: element.hru,
              title: element.title,
              poster: prox + (element.images && element.images.length ? element.images[0].path : 'https://www.ivi.ru/images/stubs/collection_preview_stub.jpeg')
            };
            if (params.id) item = tocard(element);
            result.results.push(item);
          });
          result.total_pages = Math.round(json.count / 20);
        }

        oncomplite(result);
      }, onerror);
    }

    var IVI = {
      collections: collections$1,
      full: full$2,
      main: main$3,
      person: person$2,
      list: list$3,
      category: category$2,
      menu: menu$2,
      seasons: seasons$2,
      clear: network$5.clear
    };

    var baseurl = Utils.protocol() + 'tmdb.cub.watch/';
    var network$4 = new create$p();

    function url$1(u) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (params.genres) u = add$6(u, 'genre=' + params.genres);
      if (params.page) u = add$6(u, 'page=' + params.page);
      if (params.query) u = add$6(u, 'query=' + params.query);

      if (params.filter) {
        for (var i in params.filter) {
          u = add$6(u, i + '=' + params.filter[i]);
        }
      }

      return baseurl + u;
    }

    function add$6(u, params) {
      return u + (/\?/.test(u) ? '&' : '?') + params;
    }

    function get$5(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      var u = url$1(method, params);
      network$4.silent(u, function (json) {
        json.url = method;
        oncomplite(json);
      }, onerror);
    }

    function list$2() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var u = url$1(params.url, params);
      network$4.silent(u, oncomplite, onerror);
    }

    function main$2() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var status = new status$1(11);

      status.onComplite = function () {
        var fulldata = [];
        var data = status.data;

        for (var i = 1; i <= 11; i++) {
          var ipx = 's' + i;
          if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
        }

        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status.append(name, json);
      };

      get$5('?sort=now_playing', params, function (json) {
        append(Lang.translate('title_now_watch'), 's1', json);
        VideoQuality.add(json.results);
      }, status.error.bind(status));
      get$5('?sort=latest', params, function (json) {
        append(Lang.translate('title_latest'), 's2', json);
      }, status.error.bind(status));
      get$5('movie/now', params, function (json) {
        append(Lang.translate('menu_movies'), 's3', json);
      }, status.error.bind(status));
      get$5('?sort=now&genre=16', params, function (json) {
        append(Lang.translate('menu_multmovie'), 's4', json);
      }, status.error.bind(status));
      get$5('tv/now', params, function (json) {
        append(Lang.translate('menu_tv'), 's5', json);
      }, status.error.bind(status));
      get$5('?sort=now&genre=12', params, function (json) {
        append(Lang.translate('filter_genre_ad'), 's6', json);
      }, status.error.bind(status));
      get$5('?sort=now&genre=35', params, function (json) {
        append(Lang.translate('filter_genre_cm'), 's7', json);
      }, status.error.bind(status));
      get$5('?sort=now&genre=10751', params, function (json) {
        append(Lang.translate('filter_genre_fm'), 's8', json);
      }, status.error.bind(status));
      get$5('?sort=now&genre=27', params, function (json) {
        append(Lang.translate('filter_genre_ho'), 's9', json);
      }, status.error.bind(status));
      get$5('?sort=now&genre=878', params, function (json) {
        append(Lang.translate('filter_genre_fa'), 's10', json);
      }, status.error.bind(status));
      get$5('?sort=now&genre=53', params, function (json) {
        append(Lang.translate('filter_genre_tr'), 's11', json);
      }, status.error.bind(status));
    }

    function category$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var total = 6;
      if (params.url !== 'tv') total--;
      var show = ['tv', 'movie'].indexOf(params.url) > -1;
      var books = show ? Favorite.continues(params.url) : [];
      var recomend = show ? Arrays.shuffle(Recomends.get(params.url)).slice(0, 19) : [];
      var status = new status$1(total);

      status.onComplite = function () {
        var fulldata = [];
        var data = status.data;
        if (books.length) fulldata.push({
          results: books,
          title: params.url == 'tv' ? Lang.translate('title_continue') : Lang.translate('title_watched')
        });
        if (recomend.length) fulldata.push({
          results: recomend,
          title: Lang.translate('title_recomend_watch')
        });

        for (var i = 1; i <= total + 1; i++) {
          var ipx = 's' + i;
          if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
        }

        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status.append(name, json);
      };

      get$5('?cat=' + params.url + '&sort=now_playing', params, function (json) {
        append(Lang.translate('title_now_watch'), 's1', json);
        if (show) VideoQuality.add(json.results);
      }, status.error.bind(status));

      if (params.url == 'tv') {
        get$5('?cat=' + params.url + '&sort=update', params, function (json) {
          append(Lang.translate('title_new_episodes'), 's2', json);
        }, status.error.bind(status));
      }

      get$5('?cat=' + params.url + '&sort=top', params, function (json) {
        append(Lang.translate('title_popular'), 's3', json);
        if (show) VideoQuality.add(json.results);
      }, status.error.bind(status));
      get$5('?cat=' + params.url + '&sort=latest', params, function (json) {
        append(Lang.translate('title_latest'), 's4', json);
      }, status.error.bind(status));
      get$5('?cat=' + params.url + '&sort=now', params, function (json) {
        append(Lang.translate('title_new_this_year'), 's5', json);
      }, status.error.bind(status));
      get$5('?cat=' + params.url + '&sort=latest&vote=7', params, function (json) {
        append(Lang.translate('title_hight_voite'), 's6', json);
      }, status.error.bind(status));
    }

    function full$1(params, oncomplite, onerror) {
      var status = new status$1(7);
      status.onComplite = oncomplite;
      get$5('3/' + params.method + '/' + params.id + '?api_key=4ef0d7355d9ffb5151e987764708ce96&language=' + Storage.field('tmdb_lang'), params, function (json) {
        json.source = 'tmdb';

        if (params.method == 'tv') {
          TMDB.get('tv/' + json.id + '/season/' + json.number_of_seasons, {}, function (ep) {
            status.append('episodes', ep);
          }, status.error.bind(status));
        } else status.need--;

        if (json.belongs_to_collection) {
          TMDB.get('collection/' + json.belongs_to_collection.id, {}, function (collection) {
            collection.results = collection.parts.slice(0, 19);
            status.append('collection', collection);
          }, status.error.bind(status));
        } else status.need--;

        status.append('movie', json);
      }, function () {
        status.need -= 2;
        status.error();
      });

      if (Storage.field('light_version')) {
        status.need -= 3;
      } else {
        TMDB.get(params.method + '/' + params.id + '/credits', params, function (json) {
          status.append('persons', json);
        }, status.error.bind(status));
        TMDB.get(params.method + '/' + params.id + '/recommendations', params, function (json) {
          status.append('recomend', json);
        }, status.error.bind(status));
        TMDB.get(params.method + '/' + params.id + '/similar', params, function (json) {
          status.append('simular', json);
        }, status.error.bind(status));
      }

      TMDB.get(params.method + '/' + params.id + '/videos', params, function (json) {
        status.append('videos', json);
      }, status.error.bind(status));
    }

    function menuCategory$1(params, oncomplite) {
      var menu = [];
      menu.push({
        title: Lang.translate('title_now_watch'),
        url: '?cat=' + params.action + '&sort=now_playing'
      });

      if (params.action == 'tv') {
        menu.push({
          title: Lang.translate('title_new_episodes'),
          url: '?cat=' + params.action + '&sort=update'
        });
      }

      menu.push({
        title: Lang.translate('title_popular'),
        url: '?cat=' + params.action + '&sort=top'
      });
      menu.push({
        title: Lang.translate('title_latest'),
        url: '?cat=' + params.action + '&sort=latest'
      });
      menu.push({
        title: Lang.translate('title_new_this_year'),
        url: '?cat=' + params.action + '&sort=now'
      });
      menu.push({
        title: Lang.translate('title_hight_voite'),
        url: '?cat=' + params.action + '&sort=latest&vote=7'
      });
      oncomplite(menu);
    }

    function person$1(params, oncomplite, onerror) {
      TMDB.person(params, oncomplite, onerror);
    }

    function menu$1(params, oncomplite) {
      TMDB.menu(params, oncomplite);
    }

    function seasons$1(tv, from, oncomplite) {
      TMDB.seasons(tv, from, oncomplite);
    }

    function clear$3() {
      network$4.clear();
    }

    var CUB = {
      main: main$2,
      menu: menu$1,
      full: full$1,
      list: list$2,
      category: category$1,
      clear: clear$3,
      person: person$1,
      seasons: seasons$1,
      menuCategory: menuCategory$1
    };

    var url;
    var network$3 = new create$p();

    function get$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;

      function complite(data) {
        popular(params.movie, data, {}, oncomplite);
      }

      function error(e) {
        var data = {
          Results: []
        };
        popular(params.movie, data, {
          nolimit: true
        }, function () {
          if (data.Results.length) oncomplite(data);else onerror(e);
        });
      }

      if (Storage.field('parser_torrent_type') == 'jackett') {
        if (Storage.field('jackett_url')) {
          url = Utils.checkHttp(Storage.field('jackett_url'));
          jackett(params, complite, function () {
            switch (Storage.field('parser_torrent_type')) {
        case "1337x":
            x1337(params, complite, error);
            break;
        case "torlook":
            torlook(params, complite, error);
            break;
        case "rarbg":
            rarbg(params, complite, error);
            break;
        case "magnetdl":
            magnetdl(params, complite, error);
            break;
        };
          });
        } else {
          error(Lang.translate('torrent_parser_set_link') + ': Jackett');
        }
      } else {
        if (Storage.get('native')) {
          switch (Storage.field('parser_torrent_type')) {
        case "1337x":
            x1337(params, complite, error);
            break;
        case "torlook":
            torlook(params, complite, error);
            break;
        case "rarbg":
            rarbg(params, complite, error);
            break;
        case "magnetdl":
            magnetdl(params, complite, error);
            break;
        };
        } else if (Storage.field('torlook_parse_type') == 'site' && Storage.field('parser_website_url')) {
          url = Utils.checkHttp(Storage.field('parser_website_url'));
          switch (Storage.field('parser_torrent_type')) {
        case "1337x":
            x1337(params, complite, error);
            break;
        case "torlook":
            torlook(params, complite, error);
            break;
        case "rarbg":
            rarbg(params, complite, error);
            break;
        case "magnetdl":
            magnetdl(params, complite, error);
            break;
        };
        } else if (Storage.field('torlook_parse_type') == 'native') {
          switch (Storage.field('parser_torrent_type')) {
        case "1337x":
            x1337(params, complite, error);
            break;
        case "torlook":
            torlook(params, complite, error);
            break;
        case "rarbg":
            rarbg(params, complite, error);
            break;
        case "magnetdl":
            magnetdl(params, complite, error);
            break;
        };
        } else error(Lang.translate('torrent_parser_set_link') + ': TorLook');
      }
    }

    function popular(card, data, params, call) {
      Account.torrentPopular({
        card: card
      }, function (result) {
        var torrents = result.result.torrents.filter(function (t) {
          return t.viewing_request > (params.nolimit ? 0 : 3);
        });
        torrents.sort(function (a, b) {
          return b.viewing_average - a.viewing_average;
        });
        torrents.forEach(function (t) {
          delete t.viewed;
        });
        data.Results = data.Results.concat(params.nolimit ? torrents : torrents.slice(0, 3));
        call(data);
      }, function () {
        call(data);
      });
    }

    function viewed(hash) {
      var view = Storage.cache('torrents_view', 5000, []);
      return view.indexOf(hash) > -1;
    }

    function torlook() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      torlookApi(params, oncomplite, onerror);
    }

    function torlookApi() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      network$3.timeout(1000 * 30);
      var s = 'http://proxy.cub.watch/cdn/https://api.torlook.info/api.php?key=4JuCSML44FoEsmqK&s=';
      var q = (params.search + '').replace(/( )/g, "+").toLowerCase();
      var u = Storage.get('native') || Storage.field('torlook_parse_type') == 'native' ? s + encodeURIComponent(q) : url.replace('{q}', encodeURIComponent(s + encodeURIComponent(q)));
      network$3["native"](u, function (json) {
        if (json.error) onerror(Lang.translate('torrent_parser_request_error'));else {
          var data = {
            Results: []
          };

          if (json.data) {
            json.data.forEach(function (elem) {
              var item = {};
              item.Title = elem.title;
              item.Tracker = elem.tracker;
              item.Size = parseInt(elem.size);
              item.size = Utils.bytesToSize(item.Size);
              item.PublishDate = parseInt(elem.date) * 1000;
              item.Seeders = parseInt(elem.seeders);
              item.Peers = parseInt(elem.leechers);
              item.PublisTime = parseInt(elem.date) * 1000;
              item.hash = Utils.hash(elem.title);
              item.MagnetUri = elem.magnet;
              item.viewed = viewed(item.hash);
              if (elem.magnet) data.Results.push(item);
            });
          }

          oncomplite(data);
        }
      }, function (a, c) {
        onerror(network$3.errorDecode(a, c));
      });
    }

    function magnetdl() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      network$5.timeout(1000 * 60);
      var s = 'https://cors.eu.org/https://www.magnetdl.com/search/?m=1&x=0&y=0&q=';
      var u = Storage.get('native') || Storage.field('torlook_parse_type') == 'native' ? s + encodeURIComponent(params.search) : url$3.replace('{q}', encodeURIComponent(s + encodeURIComponent(params.search)));
      network$5["native"](u + '', function (str) {
        var math1 = str.replace(/\n|\r/g, '').replace(/<tr><td class="d" colspan="8"><\/td><\/tr>/g,'').replace(/<tr><td colspan="8" id="pages">.+?<\/td><\/tr>/g,'').match(new RegExp('<tbody>(.*?)<\/tbody>', 'g'));
        var math;

        if (math1){
         math = math1[0].replace(/\n|\r/g, '').match(new RegExp('<tr>(.*?)<\/tr>', 'g'));
        }else{
         math = [];
        };
        var data = {
          Results: []
        };
        $.each(math, function (i, a) {
          a = a.replace(/<a href=".+?" class="icon">.+?<\/a>/g, '').replace(/<span class="seeds">.+?<\/span>/g, '');
          var element = $(a + ''),
              item = {};
          item.Title = $('.n', element).text();
          item.Tracker = $('.t2,.t5', element).text();
          item.size = $('.s', element).prev().text();
          item.Size = Utils.sizeToBytes(item.size);
          var y = new Date();
          var whattime =$('.n', element).next().text().split(/\s+/);
          var whattype = whattime ? whattime[1].replace('s','') : '';
          switch (whattype) {
          case "day":
              y.setDate(y.getDate() - whattime[0]);
              break;
          case "month":
              y.setMonth(y.getMonth() - whattime[0]);
              break;
          case "year":
              y.setFullYear(y.getFullYear() - whattime[0]);
              break;
          };
          item.PublishDate = y;
          item.Seeders = parseInt($('.s', element).text());
          item.Peers = parseInt($('.l', element).text());
          //item.reguest = 'http://proxy.cub.watch/cdn/https://www.magnetdl.com'+$('.n a', element).attr('href');
          item.MagnetUri = $('.m a', element).attr('href');
          item.PublisTime = item.PublishDate;
          item.hash = Utils.hash(item.Title);
          item.viewed = viewed(item.hash);
          element.remove();
          if (item.Title && item.MagnetUri) data.Results.push(item);
        });
        oncomplite(data);
      }, function (a, c) {
        onerror(network$5.errorDecode(a, c));
      }, false, {
        dataType: 'text'
      });
    }

    function rarbg() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
    var onerror = arguments.length > 2 ? arguments[2] : undefined;
    var category = params.movie.first_air_date ? 'tv' : 'movies';
    
    var url = 'https://cors.eu.org/https://torrentapi.org';
    var seconds = Math.floor(Date.now() / 1000);

    if ((Storage.get('rarbg_token').token === undefined) || (seconds - Storage.field('rarbg_token').updated > 870)) {
      network.silent(url + '/pubapi_v2.php?get_token=get_token&app_id=lampa', function (json) {
          if (json.error) onerror('请求错误');else {
            var rarbg_token = { token: json.token, updated: seconds };
            console.log(rarbg_token);
            Storage.set('rarbg_token', rarbg_token);
          };
        }, function (a, c) {
          network.errorDecode(a, c);
        }, false, false, {
          dataType: 'json'
      });
    };
    function fn1() {
      return new Promise(function(resolve, reject) {    
        network$3.timeout(1000 * 30);
        var s = url + '/pubapi_v2.php?mode=search&app_id=lampa&category='+category+'&sort=seeders&min_seeders=1&ranked=0&format=json_extended&token='+Storage.get('rarbg_token').token+'&search_themoviedb=';
        var q = (params.movie.id + '').replace(/( )/g, "+").toLowerCase();
        var u =  s + encodeURIComponent(q);
        network$3["native"](u, function (json) {
          if (json.error) onerror((json.rate_limit === 1?' 超过接口刷新频次限制 ':'')+json.error);else {
            var data = {
              Results: []
            };
            if (json.torrent_results) {
              json.torrent_results.forEach(function (elem) {
                var item = {};
                item.Title = elem.title;
                item.Tracker = 'Rrarbg';
                item.Size = parseInt(elem.size);
                item.size = Utils.bytesToSize(item.Size);
                item.PublishDate = elem.pubdate.split("+")[0];
                item.Seeders = parseInt(elem.seeders);
                item.Peers = parseInt(elem.leechers);
                item.PublisTime = elem.pubdate.split("+")[0];
                item.hash = Utils.hash(elem.title);
                item.MagnetUri = elem.download;
                item.viewed = viewed(item.hash);
                if (elem.download) data.Results.push(item);
              });
            }
            oncomplite(data);
          }
        }, function (a, c) {
          onerror(network$3.errorDecode(a, c));
        }); 

      });
      }
      fn1().then(function(value){
          //do something       
      })
  }

  function x1337() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var re = /^(?:(?=[A-Za-z])\S|\s|\d+|:|-|,|\.|&|')+$/;
      if (re.test(params.search)){
      network$5.timeout(1000 * 60);
      var s = 'http://proxy.cub.watch/cdn/https://www.1377x.to/srch?search=';
      var u = Storage.get('native') || Storage.field('torlook_parse_type') == 'native' ? s + encodeURIComponent(params.search) : url$3.replace('{q}', encodeURIComponent(s + encodeURIComponent(params.search)));
      network$5["native"](u + '', function (str) {
        var math1 = str.replace(/\n|\r/g, '').match(new RegExp('<tbody>(.*?)<\/tbody>', 'g'));
        var math;
        if (math1){
         math = math1[0].replace(/\n|\r/g, '').match(new RegExp('<tr>(.*?)<\/tr>', 'g'));
        }else{
         math = [];
        };
        var data = {
          Results: []
        };
        $.each(math, function (i, a) {
          a = a.replace(/<a href=".+?" class="icon">.+?<\/a>/g, '').replace(/<span class="seeds">.+?<\/span>/g, '');
          var element = $(a + ''),
              item = {};
          item.Title = $('.coll-1', element).text();
          item.Tracker = $('.coll-5', element).text();
          item.size = $('.coll-4', element).text();
          item.Size = Utils.sizeToBytes(item.size);
          var torrtime,otime = $('.coll-date', element).text().replace(/(0?[1-9]|1[0-2])[a|p]m|\.|th|st|rd|nd/g,'').replace("'",'');
          if ($('.coll-date', element).text().indexOf("'") == -1){
            if ($('.coll-date', element).text().indexOf(":") != -1){
              torrtime = new Date(new Date().toUTCString().slice(0, -4));
            }else{
              torrtime = new Date(otime+' '+new Date().getFullYear());
            }
          }else{
            torrtime = new Date(otime);
          };
          item.PublishDate = torrtime;
          item.Seeders = parseInt($('.coll-2', element).text());
          item.Peers = parseInt($('.coll-3', element).text());
          item.reguest = 'http://proxy.cub.watch/cdn/https://www.1377x.to'+$('.coll-1 a', element).attr('href');
          item.PublisTime = item.PublishDate;
          item.hash = Utils.hash(item.Title);
          item.viewed = viewed(item.hash);
          element.remove();
          if (item.Title && item.reguest) data.Results.push(item);
        });
        oncomplite(data);
      }, function (a, c) {
        onerror(network$5.errorDecode(a, c));
      }, false, {
        dataType: 'text'
      });
      }else{
      onerror('没有找到相关结果。');
    }
  }

  function jackett() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      network$3.timeout(1000 * 15);
      var u = url + '/api/v2.0/indexers/all/results?apikey=' + Storage.field('jackett_key') + '&Query=' + encodeURIComponent(params.search);
      var genres = params.movie.genres.map(function (a) {
        return a.name;
      });

      if (!params.clarification) {
        u = Utils.addUrlComponent(u, 'title=' + encodeURIComponent(params.movie.title));
        u = Utils.addUrlComponent(u, 'title_original=' + encodeURIComponent(params.movie.original_title));
      }

      u = Utils.addUrlComponent(u, 'year=' + encodeURIComponent(((params.movie.release_date || params.movie.first_air_date || '0000') + '').slice(0, 4)));
      u = Utils.addUrlComponent(u, 'is_serial=' + (params.movie.first_air_date || params.movie.last_air_date ? '2' : params.other ? '0' : '1'));
      u = Utils.addUrlComponent(u, 'genres=' + encodeURIComponent(genres.join(',')));
      u = Utils.addUrlComponent(u, 'Category[]=' + (params.movie.number_of_seasons > 0 ? 5000 : 2000) + (params.movie.original_language == 'ja' ? ',5070' : ''));
      network$3["native"](u, function (json) {
        json.Results.forEach(function (element) {
          element.PublisTime = Utils.strToTime(element.PublishDate);
          element.hash = Utils.hash(element.Title);
          element.viewed = viewed(element.hash);
          element.size = Utils.bytesToSize(element.Size);
        });
        oncomplite(json);
      }, function (a, c) {
        onerror(network$3.errorDecode(a, c));
      });
    }

    function marnet(element, oncomplite, onerror) {
      network$3.timeout(1000 * 15);
      var s = Utils.checkHttp(Storage.field('torlook_site')) + '/';
      var u = Storage.get('native') || Storage.field('torlook_parse_type') == 'native' ? s + element.reguest : url.replace('{q}', encodeURIComponent(s + element.reguest));
    if (Storage.field('parser_torrent_type') == '1337x'){
      u=u.replace(s,'');
    };
          network$3["native"](u, function (html) {
        var math = html.match(/magnet:(.*?)['|"]/);

        if (math && math[1]) {
          element.MagnetUri = 'magnet:' + math[1];
          oncomplite();
        } else {
          onerror(Lang.translate('torrent_parser_magnet_error'));
        }
      }, function (a, c) {
        onerror(network$3.errorDecode(a, c));
      }, false, {
        dataType: 'text'
      });
    }

    function clear$2() {
      network$3.clear();
    }

    var Parser = {
      get: get$4,
      torlook: torlook,
      jackett: jackett,
    x1337: x1337,
    rarbg: rarbg,
    magnetdl:magnetdl,
      marnet: marnet,
      clear: clear$2
    };

    /**
     * Источники
     */

    var sources = {
      ivi: IVI,
      okko: OKKO,
      tmdb: TMDB,
      cub: CUB
    };
    /**
     * Чтоб не переписали их
     */

    Object.defineProperty(sources, 'ivi', {
      get: function get() {
        return IVI;
      }
    });
    Object.defineProperty(sources, 'okko', {
      get: function get() {
        return OKKO;
      }
    });
    Object.defineProperty(sources, 'tmdb', {
      get: function get() {
        return TMDB;
      }
    });
    Object.defineProperty(sources, 'cub', {
      get: function get() {
        return CUB;
      }
    });
    var network$2 = new create$p();
    /**
     * Получить источник
     * @param {{source:string}} params 
     * @returns {class}
     */

    function source(params) {
      return params.source ? sources[params.source] : sources.tmdb;
    }
    /**
     * Главная страница
     * @param {{source:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function main$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).main(params, oncomplite, onerror);
    }
    /**
     * Категория
     * @param {{url:string, source:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function category() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).category(params, oncomplite, onerror);
    }
    /**
     * Просмотр карточки
     * @param {{id:string, source:string, method:string, card:{}}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function full() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).full(params, oncomplite, onerror);
    }
    /**
     * Главный поиск
     * @param {{query:string}} params 
     * @param {function} oncomplite
     */


    function search$2() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var use_parser = Storage.field('parser_use') && Storage.field('parse_in_search');
      var status = new status$1(use_parser ? 3 : 2);
      status.onComplite = oncomplite;
      TMDB.search(params, function (json) {
        if (json.movie) status.append('movie', json.movie);
        if (json.tv) status.append('tv', json.tv);
      }, status.error.bind(status));

      if (use_parser) {
        Parser.get({
          search: decodeURIComponent(params.query),
          other: true,
          movie: {
            genres: [],
            title: decodeURIComponent(params.query),
            original_title: decodeURIComponent(params.query),
            number_of_seasons: 0
          }
        }, function (json) {
          json.title = Lang.translate('title_parser');
          json.results = json.Results.slice(0, 20);
          json.Results = null;
          json.results.forEach(function (element) {
            element.Title = Utils.shortText(element.Title, 110);
          });
          status.append('parser', json);
        }, status.error.bind(status));
      }
    }
    /**
     * Что-то старое, надо проверить
     * @param {object} params
     * @param {function} oncomplite 
     */


    function menuCategory() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      source(params).menuCategory(params, oncomplite);
    }
    /**
     * Информация об актёре
     * @param {{id:integer, source:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function person() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).person(params, oncomplite, onerror);
    }
    /**
     * Жанры
     * @param {object} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function genres() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      TMDB.genres(params, oncomplite, onerror);
    }
    /**
     * Компания
     * @param {{id:integer}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function company() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      TMDB.company(params, oncomplite, onerror);
    }
    /**
     * Полная категори
     * @param {{page:integer, url:string, source:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function list$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).list(params, oncomplite, onerror);
    }
    /**
     * Получить список категорий для каталога в меню
     * @param {{source:string}} params 
     * @param {function} oncomplite 
     */


    function menu() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      source(params).menu(params, oncomplite);
    }
    /**
     * Сезоны
     * @param {{id:integer, source:string}} tv 
     * @param {[1,2,3]} from - список сезонов 1,3,4...
     * @param {function} oncomplite 
     */


    function seasons(tv, from, oncomplite) {
      source(tv).seasons(tv, from, oncomplite);
    }
    /**
     * Коллекции 
     * @param {object} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function collections(params, oncomplite, onerror) {
      source(params).collections(params, oncomplite, onerror);
    }
    /**
     * Закладки
     * @param {{page:integer, type:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function favorite() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var data = {};
      data.results = Favorite.get(params);
      data.total_pages = Math.ceil(data.results.length / 20);
      data.page = Math.min(params.page, data.total_pages);
      var offset = data.page - 1;
      data.results = data.results.slice(20 * offset, 20 * offset + 20);
      if (data.results.length) oncomplite(data);else onerror();
    }
    /**
     * Релизы
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function relise(oncomplite, onerror) {
      var postdata = {
        category_id: "-1",
        skip: "0",
        limit: "60",
        keyword: ""
    };
      network$2.silent('https://cmn.yyds.fans/api/posts', function (json) {
        if(json.status_code === 405){
          Noty.show('未能刷新数据，请从菜单重新进入。');
          return false;
        };
        json.data.list.forEach(function (item) {
          var mytitle = item.title.replace('/',' ');
          if(mytitle.indexOf(' ' != -1)) mytitle = mytitle.split(' ')[0];
          if(item.category_id !== 3) item.name = mytitle;
          if(item.category_id == 3) item.tmdbID = item.imdb_id;
          //item.tmdbID = item.imdb_id;
          item.original_title = mytitle;
          item.title = mytitle;
          item.release_date = item.release_time;
          item.vote_average = item.imdb_score;
          item.poster_path = item.cover.replace('l_ratio_poster','s_ratio_poster');
        });
        oncomplite(json.data.list);
      }, onerror,postdata);
    }
    /**
     * Очистить
     */


    function clear$1() {
      for (var i in sources) {
        sources[i].clear();
      }

      network$2.clear();
    }

    var Api = {
      main: main$1,
      img: TMDB.img,
      full: full,
      list: list$1,
      genres: genres,
      category: category,
      search: search$2,
      clear: clear$1,
      company: company,
      person: person,
      favorite: favorite,
      seasons: seasons,
      screensavers: TMDB.screensavers,
      relise: relise,
      menu: menu,
      collections: collections,
      menuCategory: menuCategory,
      sources: sources
    };

    var data$2 = [];
    var object = false;
    /**
     * Запуск
     */

    function init$c() {
      data$2 = Storage.cache('timetable', 300, []);
      setInterval(extract$1, 1000 * 60 * 2);
      setInterval(favorites, 1000 * 60 * 10);
    }
    /**
     * Добавить карточки к парсингу
     * @param {[{id:integer,number_of_seasons:integer}]} elems - карточки
     */


    function add$5(elems) {
      elems.filter(function (elem) {
        return elem.number_of_seasons;
      }).forEach(function (elem) {
        var id = data$2.filter(function (a) {
          return a.id == elem.id;
        });

        if (!id.length) {
          data$2.push({
            id: elem.id,
            season: elem.number_of_seasons,
            episodes: []
          });
        }
      });
      Storage.set('timetable', data$2);
    }
    /**
     * Добавить из закладок
     */


    function favorites() {
      add$5(Favorite.get({
        type: 'book'
      }));
      add$5(Favorite.get({
        type: 'like'
      }));
      add$5(Favorite.get({
        type: 'wath'
      }));
    }
    /**
     * Парсим карточку
     */


    function parse() {
      if (Favorite.check(object).any) {
        TMDB.get('tv/' + object.id + '/season/' + object.season, {}, function (ep) {
          object.episodes = ep.episodes;
          save$2();
        }, save$2);
      } else {
        Arrays.remove(data$2, object); //очистить из расписания если больше нету в закладках

        save$2();
      }
    }
    /**
     * Получить карточку для парсинга
     */


    function extract$1() {
      var ids = data$2.filter(function (e) {
        return !e.scaned && (e.scaned_time || 0) + 60 * 60 * 12 * 1000 < Date.now();
      });

      if (ids.length) {
        object = ids[0];
        parse();
      } else {
        data$2.forEach(function (a) {
          return a.scaned = 0;
        });
      }

      Storage.set('timetable', data$2);
    }
    /**
     * Сохранить состояние
     */


    function save$2() {
      if (object) {
        object.scaned = 1;
        object.scaned_time = Date.now();
        Storage.set('timetable', data$2);
      }
    }
    /**
     * Получить эпизоды для карточки если есть
     * @param {{id:integer}} elem - карточка
     * @returns {array}
     */


    function get$3(elem) {
      var fid = data$2.filter(function (e) {
        return e.id == elem.id;
      });
      return (fid.length ? fid[0] : {}).episodes || [];
    }
    /**
     * Добавить карточку в парсинг самостоятельно
     * @param {{id:integer,number_of_seasons:integer}} elem - карточка
     */


    function update$4(elem) {
      if (elem.number_of_seasons && Favorite.check(elem).any) {
        var id = data$2.filter(function (a) {
          return a.id == elem.id;
        });
        TMDB.clear();

        if (!id.length) {
          var item = {
            id: elem.id,
            season: elem.number_of_seasons,
            episodes: []
          };
          data$2.push(item);
          Storage.set('timetable', data$2);
          object = item;
        } else object = id[0];

        parse();
      }
    }
    /**
     * Получить все данные
     * @returns {[{id:integer,season:integer,episodes:[]}]}
     */


    function all$1() {
      return data$2;
    }

    var TimeTable = {
      init: init$c,
      get: get$3,
      add: add$5,
      all: all$1,
      update: update$4
    };

    /**
     * Карточка
     * @param {object} data
     * @param {{isparser:boolean, card_small:boolean, card_category:boolean, card_collection:boolean, card_wide:true}} params 
     */

    function Card(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Arrays.extend(data, {
        title: data.name,
        original_title: data.original_name,
        release_date: data.first_air_date
      });
      data.release_year = ((data.release_date || '0000') + '').slice(0, 4);
      /**
       * Загрузить шаблон
       */

      this.build = function () {
        this.card = Template.get(params.isparser ? 'card_parser' : 'card', data);
        this.img = this.card.find('img')[0] || {};
        var quality = VideoQuality.get(data);

        if (data.first_air_date) {
          this.card.find('.card__view').append('<div class="card__type"></div>');
          this.card.find('.card__type').text(data.first_air_date ? 'TV' : 'MOV');
          this.card.addClass(data.first_air_date ? 'card--tv' : 'card--movie');
        }

        if (params.card_small) {
          this.card.addClass('card--small');

          if (!Storage.field('light_version')) {
            this.card.find('.card__title').remove();
            this.card.find('.card__age').remove();
          }
        }

        if (params.card_category) {
          this.card.addClass('card--category');
          this.card.find('.card__age').remove();
        }

        if (params.card_collection) {
          this.card.addClass('card--collection');
          this.card.find('.card__age').remove();
        }

        if (params.card_wide) {
          this.card.addClass('card--wide');
          data.poster = data.cover;
          if (data.promo) this.card.append('<div class="card__promo"><div class="card__promo-text">' + data.promo + '</div></div>');
          if (Storage.field('light_version')) this.card.find('.card__title').remove();
          this.card.find('.card__age').remove();
        }

        if (data.release_year == '0000') {
          this.card.find('.card__age').remove();
        }

        if (data.check_new_episode && Account.working()) {
          var notices = Storage.get('account_notice', []).filter(function (n) {
            return n.card_id == data.id;
          });

          if (notices.length) {
            var notice = notices[0];

            if (Utils.parseTime(notice.date).full == Utils.parseTime(Date.now()).full) {
              this.card.find('.card__view').append('<div class="card__new-episode"><div>' + Lang.translate('card_new_episode') + '</div></div>');
            }
          }
        }

        if (quality) {
          this.card.find('.card__view').append('<div class="card__quality"><div>' + quality + '</div></div>');
        }
      };
      /**
       * Загрузить картинку
       */


      this.image = function () {
        var _this = this;

        this.img.onload = function () {
          _this.card.addClass('card--loaded');
        };

        this.img.onerror = function () {
          _this.img.src = './img/img_broken.svg';
        };
      };
      /**
       * Доюавить иконку
       * @param {string} name 
       */


      this.addicon = function (name) {
        this.card.find('.card__icons-inner').append('<div class="card__icon icon--' + name + '"></div>');
      };
      /**
       * Какие серии просмотрено
       */


      this.watched = function () {
        if (!this.watched_checked) {
          var episodes = TimeTable.get(data);
          var viewed;
          episodes.forEach(function (ep) {
            var hash = Utils.hash([ep.season_number, ep.episode_number, data.original_title].join(''));
            var view = Timeline.view(hash);
            if (view.percent) viewed = {
              ep: ep,
              view: view
            };
          });

          if (viewed) {
            var next = episodes.slice(episodes.indexOf(viewed.ep)).filter(function (ep) {
              var date = new Date(ep.air_date).getTime();
              return date < Date.now();
            }).slice(0, 5);
            var wrap = Template.get('card_watched', {});
            next.forEach(function (ep) {
              var item = $('<div class="card-watched__item"><span>' + ep.episode_number + ' - ' + (ep.name || Lang.translate('noname')) + '</span></div>');
              if (ep == viewed.ep) item.append(Timeline.render(viewed.view));
              wrap.find('.card-watched__body').append(item);
            });
            this.watched_wrap = wrap;
            this.card.find('.card__view').prepend(wrap);
          }

          this.watched_checked = true;
        }

        if (this.watched_wrap) {
          this.watched_wrap.toggleClass('reverce--position', this.card.offset().left > window.innerWidth / 2 ? true : false);
        }
      };
      /**
       * Обновить иконки на закладки
       */


      this.favorite = function () {
        var status = Favorite.check(data);
        this.card.find('.card__icon').remove();
        if (status.book) this.addicon('book');
        if (status.like) this.addicon('like');
        if (status.wath) this.addicon('wath');
        if (status.history) this.addicon('history');
      };
      /**
       * Вызвали меню
       * @param {object} target 
       * @param {object} data 
       */


      this.onMenu = function (target, data) {
        var _this2 = this;

        var enabled = Controller.enabled().name;
        var status = Favorite.check(data);
        Select.show({
          title: Lang.translate('title_action'),
          items: [{
            title: status.book ? Lang.translate('card_book_remove') : Lang.translate('card_book_add'),
            subtitle: Lang.translate('card_book_descr'),
            where: 'book'
          }, {
            title: status.like ? Lang.translate('card_like_remove') : Lang.translate('card_like_add'),
            subtitle: Lang.translate('card_like_descr'),
            where: 'like'
          }, {
            title: status.wath ? Lang.translate('card_wath_remove') : Lang.translate('card_wath_add'),
            subtitle: Lang.translate('card_wath_descr'),
            where: 'wath'
          }, {
            title: status.history ? Lang.translate('card_history_remove') : Lang.translate('card_history_add'),
            subtitle: Lang.translate('card_history_descr'),
            where: 'history'
          }],
          onBack: function onBack() {
            Controller.toggle(enabled);
          },
          onSelect: function onSelect(a) {
            if (params.object) data.source = params.object.source;
            Favorite.toggle(a.where, data);

            _this2.favorite();

            Controller.toggle(enabled);
          }
        });
      };
      /**
       * Создать
       */


      this.create = function () {
        var _this3 = this;

        this.build();
        this.favorite();
        this.card.on('hover:focus', function (e) {
          _this3.watched();

          _this3.onFocus(e.target, data);
        }).on('hover:enter', function (e) {
          _this3.onEnter(e.target, data);
        }).on('hover:long', function (e) {
          _this3.onMenu(e.target, data);
        });
        this.image();
      };
      /**
       * Загружать картинку если видна карточка
       */


      this.visible = function () {
        if (this.visibled) return;
        if (data.poster_path) this.img.src = Api.img(data.poster_path);else if (data.poster) this.img.src = data.poster;else if (data.img) this.img.src = data.img;else this.img.src = './img/img_broken.svg';
        this.visibled = true;
      };
      /**
       * Уничтожить
       */


      this.destroy = function () {
        this.img.onerror = function () {};

        this.img.onload = function () {};

        this.img.src = '';
        this.card.remove();
        this.card = null;
        this.img = null;
      };
      /**
       * Рендер
       * @returns {object}
       */


      this.render = function () {
        return this.card;
      };
    }

    function init$b() {
      var timer;
      $(window).on('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(update$3, 100);
      });
      toggleClasses();
      Storage.listener.follow('change', function (event) {
        if (event.name == 'interface_size') update$3();
        if (event.name == 'animation' || event.name == 'mask') toggleClasses();
      });
      var body = $('body');
      var mouse_timer;
      $(window).on('mousemove', function () {
        clearTimeout(mouse_timer);
        mouse_timer = setTimeout(function () {//body.toggleClass('no--cursor',true)
        }, 3000);
        body.toggleClass('no--cursor', false);
      });
    }

    function size() {
      var sl = Storage.field('interface_size');
      var sz = {
        normal: 1,
        small: 0.9,
        bigger: 1.1
      };
      var fs = sz[sl];
      $('body').css({
        fontSize: Math.max(window.innerWidth / 84.17 * fs, 10.6) + 'px'
      }).removeClass('size--small size--normal size--bigger').addClass('size--' + sl);
    }

    function update$3() {
      size();
      var wrap = $('.wrap__left');
      if (!wrap.length) return;
      var left = wrap[0].getBoundingClientRect();
      $('.layer--width').css('width', window.innerWidth - (Storage.field('light_version') && window.innerWidth >= 767 ? left.width : 0));
      var head = $('.head')[0].getBoundingClientRect();
      $('.layer--wheight').each(function () {
        var elem = $(this),
            heig = window.innerHeight - head.height;

        if (elem.data('mheight')) {
          heig -= elem.data('mheight')[0].getBoundingClientRect().height;
        }

        elem.css('height', heig);
      });
      $('.layer--height').each(function () {
        var elem = $(this),
            heig = window.innerHeight;

        if (elem.data('mheight')) {
          heig -= elem.data('mheight')[0].getBoundingClientRect().height;
        }

        elem.css('height', heig);
      });
    }

    function toggleClasses() {
      $('body').toggleClass('no--animation', !Storage.field('animation'));
      $('body').toggleClass('no--mask', !Storage.field('mask'));
    }

    var Layer = {
      update: update$3,
      init: init$b
    };

    /* eslint-disable no-bitwise -- used for calculations */

    /* eslint-disable unicorn/prefer-query-selector -- aiming at
      backward-compatibility */

    /**
    * StackBlur - a fast almost Gaussian Blur For Canvas
    *
    * In case you find this class useful - especially in commercial projects -
    * I am not totally unhappy for a small donation to my PayPal account
    * mario@quasimondo.de
    *
    * Or support me on flattr:
    * {@link https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript}.
    *
    * @module StackBlur
    * @author Mario Klingemann
    * Contact: mario@quasimondo.com
    * Website: {@link http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html}
    * Twitter: @quasimondo
    *
    * @copyright (c) 2010 Mario Klingemann
    *
    * Permission is hereby granted, free of charge, to any person
    * obtaining a copy of this software and associated documentation
    * files (the "Software"), to deal in the Software without
    * restriction, including without limitation the rights to use,
    * copy, modify, merge, publish, distribute, sublicense, and/or sell
    * copies of the Software, and to permit persons to whom the
    * Software is furnished to do so, subject to the following
    * conditions:
    *
    * The above copyright notice and this permission notice shall be
    * included in all copies or substantial portions of the Software.
    *
    * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    * OTHER DEALINGS IN THE SOFTWARE.
    */
    var mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
    var shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    /**
     * @param {string|HTMLImageElement} img
     * @param {string|HTMLCanvasElement} canvas
     * @param {Float} radius
     * @param {boolean} blurAlphaChannel
     * @param {boolean} useOffset
     * @param {boolean} skipStyles
     * @returns {undefined}
     */

    function processImage(img, canvas, radius, blurAlphaChannel, useOffset, skipStyles) {
      if (typeof img === 'string') {
        img = document.getElementById(img);
      }

      if (!img || !('naturalWidth' in img)) {
        return;
      }

      var dimensionType = useOffset ? 'offset' : 'natural';
      var w = img[dimensionType + 'Width'];
      var h = img[dimensionType + 'Height'];

      if (typeof canvas === 'string') {
        canvas = document.getElementById(canvas);
      }

      if (!canvas || !('getContext' in canvas)) {
        return;
      }

      if (!skipStyles) {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
      }

      canvas.width = w;
      canvas.height = h;
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, w, h);
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, w, h);

      if (isNaN(radius) || radius < 1) {
        return;
      }

      if (blurAlphaChannel) {
        processCanvasRGBA(canvas, 0, 0, w, h, radius);
      } else {
        processCanvasRGB(canvas, 0, 0, w, h, radius);
      }
    }
    /**
     * @param {string|HTMLCanvasElement} canvas
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @throws {Error|TypeError}
     * @returns {ImageData} See {@link https://html.spec.whatwg.org/multipage/canvas.html#imagedata}
     */


    function getImageDataFromCanvas(canvas, topX, topY, width, height) {
      if (typeof canvas === 'string') {
        canvas = document.getElementById(canvas);
      }

      if (!canvas || _typeof(canvas) !== 'object' || !('getContext' in canvas)) ;

      var context = canvas.getContext('2d');

      try {
        return context.getImageData(topX, topY, width, height);
      } catch (e) {//throw new Error('unable to access image data: ' + e);
      }
    }
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @param {Float} radius
     * @returns {undefined}
     */


    function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
      if (isNaN(radius) || radius < 1) {
        return;
      }

      radius |= 0;
      var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);

      if (imageData) {
        imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
        canvas.getContext('2d').putImageData(imageData, topX, topY);
      }
    }
    /**
     * @param {ImageData} imageData
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @param {Float} radius
     * @returns {ImageData}
     */


    function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
      var pixels = imageData.data;
      var div = 2 * radius + 1; // const w4 = width << 2;

      var widthMinus1 = width - 1;
      var heightMinus1 = height - 1;
      var radiusPlus1 = radius + 1;
      var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
      var stackStart = new BlurStack();
      var stack = stackStart;
      var stackEnd;

      for (var i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();

        if (i === radiusPlus1) {
          stackEnd = stack;
        }
      }

      stack.next = stackStart;
      var stackIn = null,
          stackOut = null,
          yw = 0,
          yi = 0;
      var mulSum = mulTable[radius];
      var shgSum = shgTable[radius];

      for (var y = 0; y < height; y++) {
        stack = stackStart;
        var pr = pixels[yi],
            pg = pixels[yi + 1],
            pb = pixels[yi + 2],
            pa = pixels[yi + 3];

        for (var _i = 0; _i < radiusPlus1; _i++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }

        var rInSum = 0,
            gInSum = 0,
            bInSum = 0,
            aInSum = 0,
            rOutSum = radiusPlus1 * pr,
            gOutSum = radiusPlus1 * pg,
            bOutSum = radiusPlus1 * pb,
            aOutSum = radiusPlus1 * pa,
            rSum = sumFactor * pr,
            gSum = sumFactor * pg,
            bSum = sumFactor * pb,
            aSum = sumFactor * pa;

        for (var _i2 = 1; _i2 < radiusPlus1; _i2++) {
          var p = yi + ((widthMinus1 < _i2 ? widthMinus1 : _i2) << 2);
          var r = pixels[p],
              g = pixels[p + 1],
              b = pixels[p + 2],
              a = pixels[p + 3];
          var rbs = radiusPlus1 - _i2;
          rSum += (stack.r = r) * rbs;
          gSum += (stack.g = g) * rbs;
          bSum += (stack.b = b) * rbs;
          aSum += (stack.a = a) * rbs;
          rInSum += r;
          gInSum += g;
          bInSum += b;
          aInSum += a;
          stack = stack.next;
        }

        stackIn = stackStart;
        stackOut = stackEnd;

        for (var x = 0; x < width; x++) {
          var paInitial = aSum * mulSum >> shgSum;
          pixels[yi + 3] = paInitial;

          if (paInitial !== 0) {
            var _a2 = 255 / paInitial;

            pixels[yi] = (rSum * mulSum >> shgSum) * _a2;
            pixels[yi + 1] = (gSum * mulSum >> shgSum) * _a2;
            pixels[yi + 2] = (bSum * mulSum >> shgSum) * _a2;
          } else {
            pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
          }

          rSum -= rOutSum;
          gSum -= gOutSum;
          bSum -= bOutSum;
          aSum -= aOutSum;
          rOutSum -= stackIn.r;
          gOutSum -= stackIn.g;
          bOutSum -= stackIn.b;
          aOutSum -= stackIn.a;

          var _p = x + radius + 1;

          _p = yw + (_p < widthMinus1 ? _p : widthMinus1) << 2;
          rInSum += stackIn.r = pixels[_p];
          gInSum += stackIn.g = pixels[_p + 1];
          bInSum += stackIn.b = pixels[_p + 2];
          aInSum += stackIn.a = pixels[_p + 3];
          rSum += rInSum;
          gSum += gInSum;
          bSum += bInSum;
          aSum += aInSum;
          stackIn = stackIn.next;
          var _stackOut = stackOut,
              _r = _stackOut.r,
              _g = _stackOut.g,
              _b = _stackOut.b,
              _a = _stackOut.a;
          rOutSum += _r;
          gOutSum += _g;
          bOutSum += _b;
          aOutSum += _a;
          rInSum -= _r;
          gInSum -= _g;
          bInSum -= _b;
          aInSum -= _a;
          stackOut = stackOut.next;
          yi += 4;
        }

        yw += width;
      }

      for (var _x = 0; _x < width; _x++) {
        yi = _x << 2;

        var _pr = pixels[yi],
            _pg = pixels[yi + 1],
            _pb = pixels[yi + 2],
            _pa = pixels[yi + 3],
            _rOutSum = radiusPlus1 * _pr,
            _gOutSum = radiusPlus1 * _pg,
            _bOutSum = radiusPlus1 * _pb,
            _aOutSum = radiusPlus1 * _pa,
            _rSum = sumFactor * _pr,
            _gSum = sumFactor * _pg,
            _bSum = sumFactor * _pb,
            _aSum = sumFactor * _pa;

        stack = stackStart;

        for (var _i3 = 0; _i3 < radiusPlus1; _i3++) {
          stack.r = _pr;
          stack.g = _pg;
          stack.b = _pb;
          stack.a = _pa;
          stack = stack.next;
        }

        var yp = width;
        var _gInSum = 0,
            _bInSum = 0,
            _aInSum = 0,
            _rInSum = 0;

        for (var _i4 = 1; _i4 <= radius; _i4++) {
          yi = yp + _x << 2;

          var _rbs = radiusPlus1 - _i4;

          _rSum += (stack.r = _pr = pixels[yi]) * _rbs;
          _gSum += (stack.g = _pg = pixels[yi + 1]) * _rbs;
          _bSum += (stack.b = _pb = pixels[yi + 2]) * _rbs;
          _aSum += (stack.a = _pa = pixels[yi + 3]) * _rbs;
          _rInSum += _pr;
          _gInSum += _pg;
          _bInSum += _pb;
          _aInSum += _pa;
          stack = stack.next;

          if (_i4 < heightMinus1) {
            yp += width;
          }
        }

        yi = _x;
        stackIn = stackStart;
        stackOut = stackEnd;

        for (var _y = 0; _y < height; _y++) {
          var _p2 = yi << 2;

          pixels[_p2 + 3] = _pa = _aSum * mulSum >> shgSum;

          if (_pa > 0) {
            _pa = 255 / _pa;
            pixels[_p2] = (_rSum * mulSum >> shgSum) * _pa;
            pixels[_p2 + 1] = (_gSum * mulSum >> shgSum) * _pa;
            pixels[_p2 + 2] = (_bSum * mulSum >> shgSum) * _pa;
          } else {
            pixels[_p2] = pixels[_p2 + 1] = pixels[_p2 + 2] = 0;
          }

          _rSum -= _rOutSum;
          _gSum -= _gOutSum;
          _bSum -= _bOutSum;
          _aSum -= _aOutSum;
          _rOutSum -= stackIn.r;
          _gOutSum -= stackIn.g;
          _bOutSum -= stackIn.b;
          _aOutSum -= stackIn.a;
          _p2 = _x + ((_p2 = _y + radiusPlus1) < heightMinus1 ? _p2 : heightMinus1) * width << 2;
          _rSum += _rInSum += stackIn.r = pixels[_p2];
          _gSum += _gInSum += stackIn.g = pixels[_p2 + 1];
          _bSum += _bInSum += stackIn.b = pixels[_p2 + 2];
          _aSum += _aInSum += stackIn.a = pixels[_p2 + 3];
          stackIn = stackIn.next;
          _rOutSum += _pr = stackOut.r;
          _gOutSum += _pg = stackOut.g;
          _bOutSum += _pb = stackOut.b;
          _aOutSum += _pa = stackOut.a;
          _rInSum -= _pr;
          _gInSum -= _pg;
          _bInSum -= _pb;
          _aInSum -= _pa;
          stackOut = stackOut.next;
          yi += width;
        }
      }

      return imageData;
    }
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @param {Float} radius
     * @returns {undefined}
     */


    function processCanvasRGB(canvas, topX, topY, width, height, radius) {
      if (isNaN(radius) || radius < 1) {
        return;
      }

      radius |= 0;
      var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
      imageData = processImageDataRGB(imageData, topX, topY, width, height, radius);
      canvas.getContext('2d').putImageData(imageData, topX, topY);
    }
    /**
     * @param {ImageData} imageData
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @param {Float} radius
     * @returns {ImageData}
     */


    function processImageDataRGB(imageData, topX, topY, width, height, radius) {
      var pixels = imageData.data;
      var div = 2 * radius + 1; // const w4 = width << 2;

      var widthMinus1 = width - 1;
      var heightMinus1 = height - 1;
      var radiusPlus1 = radius + 1;
      var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
      var stackStart = new BlurStack();
      var stack = stackStart;
      var stackEnd;

      for (var i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();

        if (i === radiusPlus1) {
          stackEnd = stack;
        }
      }

      stack.next = stackStart;
      var stackIn = null;
      var stackOut = null;
      var mulSum = mulTable[radius];
      var shgSum = shgTable[radius];
      var p, rbs;
      var yw = 0,
          yi = 0;

      for (var y = 0; y < height; y++) {
        var pr = pixels[yi],
            pg = pixels[yi + 1],
            pb = pixels[yi + 2],
            rOutSum = radiusPlus1 * pr,
            gOutSum = radiusPlus1 * pg,
            bOutSum = radiusPlus1 * pb,
            rSum = sumFactor * pr,
            gSum = sumFactor * pg,
            bSum = sumFactor * pb;
        stack = stackStart;

        for (var _i5 = 0; _i5 < radiusPlus1; _i5++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }

        var rInSum = 0,
            gInSum = 0,
            bInSum = 0;

        for (var _i6 = 1; _i6 < radiusPlus1; _i6++) {
          p = yi + ((widthMinus1 < _i6 ? widthMinus1 : _i6) << 2);
          rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - _i6);
          gSum += (stack.g = pg = pixels[p + 1]) * rbs;
          bSum += (stack.b = pb = pixels[p + 2]) * rbs;
          rInSum += pr;
          gInSum += pg;
          bInSum += pb;
          stack = stack.next;
        }

        stackIn = stackStart;
        stackOut = stackEnd;

        for (var x = 0; x < width; x++) {
          pixels[yi] = rSum * mulSum >> shgSum;
          pixels[yi + 1] = gSum * mulSum >> shgSum;
          pixels[yi + 2] = bSum * mulSum >> shgSum;
          rSum -= rOutSum;
          gSum -= gOutSum;
          bSum -= bOutSum;
          rOutSum -= stackIn.r;
          gOutSum -= stackIn.g;
          bOutSum -= stackIn.b;
          p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
          rInSum += stackIn.r = pixels[p];
          gInSum += stackIn.g = pixels[p + 1];
          bInSum += stackIn.b = pixels[p + 2];
          rSum += rInSum;
          gSum += gInSum;
          bSum += bInSum;
          stackIn = stackIn.next;
          rOutSum += pr = stackOut.r;
          gOutSum += pg = stackOut.g;
          bOutSum += pb = stackOut.b;
          rInSum -= pr;
          gInSum -= pg;
          bInSum -= pb;
          stackOut = stackOut.next;
          yi += 4;
        }

        yw += width;
      }

      for (var _x2 = 0; _x2 < width; _x2++) {
        yi = _x2 << 2;

        var _pr2 = pixels[yi],
            _pg2 = pixels[yi + 1],
            _pb2 = pixels[yi + 2],
            _rOutSum2 = radiusPlus1 * _pr2,
            _gOutSum2 = radiusPlus1 * _pg2,
            _bOutSum2 = radiusPlus1 * _pb2,
            _rSum2 = sumFactor * _pr2,
            _gSum2 = sumFactor * _pg2,
            _bSum2 = sumFactor * _pb2;

        stack = stackStart;

        for (var _i7 = 0; _i7 < radiusPlus1; _i7++) {
          stack.r = _pr2;
          stack.g = _pg2;
          stack.b = _pb2;
          stack = stack.next;
        }

        var _rInSum2 = 0,
            _gInSum2 = 0,
            _bInSum2 = 0;

        for (var _i8 = 1, yp = width; _i8 <= radius; _i8++) {
          yi = yp + _x2 << 2;
          _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
          _gSum2 += (stack.g = _pg2 = pixels[yi + 1]) * rbs;
          _bSum2 += (stack.b = _pb2 = pixels[yi + 2]) * rbs;
          _rInSum2 += _pr2;
          _gInSum2 += _pg2;
          _bInSum2 += _pb2;
          stack = stack.next;

          if (_i8 < heightMinus1) {
            yp += width;
          }
        }

        yi = _x2;
        stackIn = stackStart;
        stackOut = stackEnd;

        for (var _y2 = 0; _y2 < height; _y2++) {
          p = yi << 2;
          pixels[p] = _rSum2 * mulSum >> shgSum;
          pixels[p + 1] = _gSum2 * mulSum >> shgSum;
          pixels[p + 2] = _bSum2 * mulSum >> shgSum;
          _rSum2 -= _rOutSum2;
          _gSum2 -= _gOutSum2;
          _bSum2 -= _bOutSum2;
          _rOutSum2 -= stackIn.r;
          _gOutSum2 -= stackIn.g;
          _bOutSum2 -= stackIn.b;
          p = _x2 + ((p = _y2 + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
          _rSum2 += _rInSum2 += stackIn.r = pixels[p];
          _gSum2 += _gInSum2 += stackIn.g = pixels[p + 1];
          _bSum2 += _bInSum2 += stackIn.b = pixels[p + 2];
          stackIn = stackIn.next;
          _rOutSum2 += _pr2 = stackOut.r;
          _gOutSum2 += _pg2 = stackOut.g;
          _bOutSum2 += _pb2 = stackOut.b;
          _rInSum2 -= _pr2;
          _gInSum2 -= _pg2;
          _bInSum2 -= _pb2;
          stackOut = stackOut.next;
          yi += width;
        }
      }

      return imageData;
    }
    /**
     *
     */


    var BlurStack =
    /**
     * Set properties.
     */
    function BlurStack() {
      _classCallCheck(this, BlurStack);

      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
      this.next = null;
    };
    var Blur = {
      /**
        * @function module:StackBlur.image
        * @see module:StackBlur~processImage
        */
      image: processImage,

      /**
        * @function module:StackBlur.canvasRGBA
        * @see module:StackBlur~processCanvasRGBA
        */
      canvasRGBA: processCanvasRGBA,

      /**
        * @function module:StackBlur.canvasRGB
        * @see module:StackBlur~processCanvasRGB
        */
      canvasRGB: processCanvasRGB,

      /**
        * @function module:StackBlur.imageDataRGBA
        * @see module:StackBlur~processImageDataRGBA
        */
      imageDataRGBA: processImageDataRGBA,

      /**
        * @function module:StackBlur.imageDataRGB
        * @see module:StackBlur~processImageDataRGB
        */
      imageDataRGB: processImageDataRGB
    };

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    canvas.width = 30;
    canvas.height = 17;

    function extract(img_data) {
      var data = img_data.data,
          colors = [];

      for (var i = 0, n = data.length; i < n; i += 4) {
        colors.push([data[i], data[i + 1], data[i + 2]]);
      }

      return colors;
    }

    function palette(palette) {
      var colors = {
        bright: [0, 0, 0],
        average: [127, 127, 127],
        dark: [255, 255, 255]
      };
      var ar = 0,
          ag = 0,
          ab = 0,
          at = palette.length;
      var bg = 0,
          dk = 765;

      for (var i = 0; i < palette.length; i++) {
        var p = palette[i],
            a = p[0] + p[1] + p[2];
        ar += p[0];
        ag += p[1];
        ab += p[2];

        if (a > bg) {
          bg = a;
          colors.bright = p;
        }

        if (a < dk) {
          dk = a;
          colors.dark = p;
        }
      }

      colors.average = [Math.round(ar / at), Math.round(ag / at), Math.round(ab / at)];
      return colors;
    }

    function rgba(c) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return 'rgba(' + c.join(',') + ',' + o + ')';
    }

    function tone(c) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
      var l = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 80;
      var hls = rgbToHsl(c[0], c[1], c[2]);
      var rgb = hslToRgb(hls[0], Math.min(s, hls[1]), l);
      return rgba(rgb, o);
    }
    /**
     * Converts an RGB color value to HSL.
     *
     * @param   {number}  r       The red color value
     * @param   {number}  g       The green color value
     * @param   {number}  b       The blue color value
     * @return  {Array}           The HSL representation
     */


    function rgbToHsl(r, g, b) {
      var rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
      rabs = r / 255;
      gabs = g / 255;
      babs = b / 255;
      v = Math.max(rabs, gabs, babs), diff = v - Math.min(rabs, gabs, babs);

      diffc = function diffc(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

      percentRoundFn = function percentRoundFn(num) {
        return Math.round(num * 100) / 100;
      };

      if (diff == 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
          h = bb - gg;
        } else if (gabs === v) {
          h = 1 / 3 + rr - bb;
        } else if (babs === v) {
          h = 2 / 3 + gg - rr;
        }

        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }

      return [Math.round(h * 360), percentRoundFn(s * 100), percentRoundFn(v * 100)];
    }
    /**
     * Converts an HSL color value to RGB.
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */


    function hslToRgb(h, s, l) {
      s /= 100;
      l /= 100;
      var C = (1 - Math.abs(2 * l - 1)) * s;
      var hue = h / 60;
      var X = C * (1 - Math.abs(hue % 2 - 1));
      var r = 0,
          g = 0,
          b = 0;

      if (hue >= 0 && hue < 1) {
        r = C;
        g = X;
      } else if (hue >= 1 && hue < 2) {
        r = X;
        g = C;
      } else if (hue >= 2 && hue < 3) {
        g = C;
        b = X;
      } else if (hue >= 3 && hue < 4) {
        g = X;
        b = C;
      } else if (hue >= 4 && hue < 5) {
        r = X;
        b = C;
      } else {
        r = C;
        b = X;
      }

      var m = l - C / 2;
      r += m;
      g += m;
      b += m;
      r *= 255.0;
      g *= 255.0;
      b *= 255.0;
      return [Math.round(r), Math.round(g), Math.round(b)];
    }

    function reset(width, height) {
      canvas.width = width;
      canvas.height = height;
    }

    function get$2(img) {
      reset(30, 17);
      var ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      var nw = img.width * ratio,
          nh = img.height * ratio;
      ctx.drawImage(img, -(nw - canvas.width) / 2, -(nh - canvas.height) / 2, nw, nh);
      return extract(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    function blur$1(img) {
      reset(200, 130);
      var ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      var nw = img.width * ratio,
          nh = img.height * ratio;
      ctx.drawImage(img, -(nw - canvas.width) / 2, -(nh - canvas.height) / 2, nw, nh);
      Blur.canvasRGB(canvas, 0, 0, canvas.width, canvas.height, 80);
      var nimg = new Image();
      nimg.src = canvas.toDataURL();
      return nimg;
    }

    var Color = {
      get: get$2,
      extract: extract,
      palette: palette,
      rgba: rgba,
      blur: blur$1,
      tone: tone,
      rgbToHsl: rgbToHsl
    };

    var html$8 = $("\n    <div class=\"background\">\n        <canvas class=\"background__one\"></canvas>\n        <canvas class=\"background__two\"></canvas>\n    </div>");
    var background = {
      one: {
        canvas: $('.background__one', html$8),
        ctx: $('.background__one', html$8)[0].getContext('2d')
      },
      two: {
        canvas: $('.background__two', html$8),
        ctx: $('.background__two', html$8)[0].getContext('2d')
      }
    };
    var view = 'one';
    var src = '';
    var loaded = {};
    var bokeh = {
      c: [],
      h: [],
      d: true
    };
    var timer$2;
    var timer_resize;
    /**
     * Запуск
     */

    function init$a() {
      Storage.listener.follow('change', function (event) {
        if (event.name == 'background' || event.name == 'background_type') resize();
      });
      var u = Platform.any() ? 'https://yumata.github.io/lampa/' : './';

      for (var i = 1; i <= 6; i++) {
        var im = new Image();
        im.src = u + 'img/bokeh-h/' + i + '.png';
        bokeh.h.push(im);
      }

      for (var _i = 1; _i <= 6; _i++) {
        var _im = new Image();

        _im.src = u + 'img/bokeh/' + _i + '.png';
        bokeh.c.push(_im);
      }

      $(window).on('resize', resize);
    }
    /**
     * Получить активный фон
     * @returns {{canvas:object, ctx: class}}
     */


    function bg() {
      html$8.find('canvas').removeClass('visible');
      view = view == 'one' ? 'two' : 'one';
      return background[view];
    }
    /**
     * Рисовать
     * @param {object} data 
     * @param {object} item - фон
     * @param {boolean} noimage
     */


    function draw(data, item, noimage) {
      if (!Storage.get('background', 'true') || noimage) {
        background.one.canvas.removeClass('visible');
        background.two.canvas.removeClass('visible');
        return;
      }

      item.canvas[0].width = window.innerWidth;
      item.canvas[0].height = window.innerHeight;
      var palette = data.palette;
      var type = Storage.field('background_type');
      blur(data, item, function () {
        if (type == 'complex' && bokeh.d) {
          var bright = Color.rgbToHsl(palette.average[0], palette.average[1], palette.average[2]);
          item.ctx.globalAlpha = bright[2] > 30 ? bright[2] / 100 * 0.6 : 0.4;
          item.ctx.globalCompositeOperation = bright[2] > 30 ? 'color-dodge' : 'screen';

          for (var i = 0; i < 10; i++) {
            var bp = Math.round(Math.random() * (bokeh.c.length - 1));
            var im = bright[2] > 30 ? bokeh.h[bp] : bokeh.c[bp];
            var xp = window.innerWidth * Math.random(),
                yp = window.innerHeight / 2 * Math.random() + window.innerHeight / 2,
                sz = Math.max(window.innerHeight / 8, window.innerHeight / 5 * Math.random()) * 0.01,
                nw = im.width * sz,
                nh = im.height * sz;

            try {
              item.ctx.drawImage(im, xp - nw / 2, yp - nw / 2, nw, nh);
            } catch (e) {}
          }
        }

        item.ctx.globalAlpha = type == 'poster' ? 0.7 : 0.6;
        item.ctx.globalCompositeOperation = 'multiply';
        var angle = 90 * Math.PI / 180,
            x2 = item.canvas[0].width * Math.cos(angle),
            y2 = item.canvas[0].height * Math.sin(angle);
        var gradient = item.ctx.createLinearGradient(0, 0, x2, y2);
        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        item.ctx.fillStyle = gradient;
        item.ctx.fillRect(0, 0, item.canvas[0].width, item.canvas[0].height);
        item.canvas.addClass('visible');
      });
    }
    /**
     * Размыть картинку
     * @param {object} data 
     * @param {object} item - фон
     * @param {function} complite 
     */


    function blur(data, item, complite) {
      var img = data.img.width > 1000 ? data.img : Color.blur(data.img);
      setTimeout(function () {
        var ratio = Math.max(item.canvas[0].width / img.width, item.canvas[0].height / img.height);
        var nw = img.width * ratio,
            nh = img.height * ratio;
        item.ctx.globalAlpha = data.img.width > 1000 ? bokeh.d ? 0.7 : 0.2 : 1;
        item.ctx.drawImage(img, -(nw - item.canvas[0].width) / 2, -(nh - item.canvas[0].height) / 2, nw, nh);
        complite();
      }, 100);
    }
    /**
     * Обновить если изменился размер окна
     */


    function resize() {
      clearTimeout(timer_resize);
      html$8.find('canvas').removeClass('visible');
      background.one.canvas.width(window.innerWidth);
      background.one.canvas.height(window.innerHeight);
      background.two.canvas.width(window.innerWidth);
      background.two.canvas.height(window.innerHeight);
      timer_resize = setTimeout(function () {
        if (loaded[src]) draw(loaded[src], background[view]);
      }, 200);
    }
    /**
     * Максимум картинок в памяти
     */


    function limit$1() {
      var a = Arrays.getKeys(loaded);

      if (a.length > 30) {
        var u = a.slice(0, 1);
        delete loaded[u];
      }
    }
    /**
     * Загрузить картинку в память
     */


    function load$1() {
      if (loaded[src]) {
        draw(loaded[src], bg());
      } else if (src) {
        limit$1();
        var cache_src = src;
        var colors;
        var img = new Image();
        img.crossOrigin = "Anonymous";

        img.onload = function () {
          try {
            colors = Color.get(img);
          } catch (e) {
            colors = [[200, 200, 200], [100, 100, 100], [10, 10, 10]];
          }

          loaded[cache_src] = {
            img: img,
            palette: Color.palette(colors)
          };
          draw(loaded[cache_src], bg());
        };

        img.onerror = function () {
          draw(false, false, true);
        };

        img.src = src;
      }
    }
    /**
     * Изменить картинку
     * @param {string} url
     */


    function change() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (url == src || Storage.field('light_version')) return;
      bokeh.d = true;
      if (url) src = url;
      clearTimeout(timer$2);
      timer$2 = setTimeout(function () {
        if (url) load$1();else draw(false, false, true);
      }, 1000);
    }
    /**
     * Изменить немедленно без ожидания
     * @param {string} url
     */


    function immediately() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (Storage.field('light_version')) return;
      if (url) src = url;
      clearTimeout(timer$2);
      bokeh.d = false;
      if (url) load$1();else draw(false, false, true);
    }
    /**
     * Рендер
     * @returns {object}
     */


    function render$4() {
      return html$8;
    }

    var Background = {
      render: render$4,
      change: change,
      update: resize,
      init: init$a,
      immediately: immediately
    };

    function create$j() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var card = Template.get('more');

      if (params.card_small) {
        card.addClass('card-more--small');
      }

      this.create = function () {
        var _this = this;

        card.on('hover:focus', function (e) {
          _this.onFocus(e.target);
        }).on('hover:enter', function (e) {
          _this.onEnter(e.target);
        });
      };

      this.render = function () {
        return card;
      };

      this.destroy = function () {
        card.remove();
        card = null;
      };
    }

    function create$i(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var content = Template.get('items_line', {
        title: data.title
      });
      var body = content.find('.items-line__body');
      var scroll = new create$o({
        horizontal: true,
        step: params.wide ? 600 : 300
      });
      var viewall = Storage.field('card_views_type') == 'view' || Storage.field('navigation_type') == 'mouse';
      var light = Storage.field('light_version') && window.innerWidth >= 767;
      var items = [];
      var active = 0;
      var more;
      var last;

      this.create = function () {
        scroll.render().find('.scroll__body').addClass('items-cards');
        content.find('.items-line__title').text(data.title);
        this.bind();
        body.append(scroll.render());
      };

      this.bind = function () {
        data.results.slice(0, viewall ? light ? 6 : data.results.length : 8).forEach(this.append.bind(this));
        if ((data.results.length >= 20 || data.more) && !params.nomore) this.more();
        this.visible();
        Layer.update();
      };

      this.append = function (element) {
        var _this = this;

        if (element.ready) return;
        element.ready = true;
        var card = new Card(element, params);
        card.create();

        card.onFocus = function (target, card_data) {
          last = target;
          active = items.indexOf(card);
          if (!viewall && !light) data.results.slice(0, active + 5).forEach(_this.append.bind(_this));

          if (more) {
            more.render().detach();
            scroll.append(more.render());
          }

          scroll.update(items[active].render(), params.align_left ? false : true);

          _this.visible();

          if (!data.noimage) Background.change(Utils.cardImgBackground(card_data));
          if (_this.onFocus) _this.onFocus(card_data);
        };

        card.onEnter = function (target, card_data) {
          if (_this.onEnter) _this.onEnter(target, card_data);
          if (_this.onPrevent) return _this.onPrevent(target, card_data);
          if (!element.source) element.source = params.object.source;
          Activity$1.push({
            url: element.url,
            component: 'full',
            id: element.id,
            method: card_data.name ? 'tv' : 'movie',
            card: element,
            source: element.source || params.object.source
          });
        };

        if (params.card_events) {
          for (var i in params.card_events) {
            card[i] = params.card_events[i];
          }
        }

        scroll.append(card.render());
        items.push(card);
      };

      this.more = function () {
        var _this2 = this;

        more = new create$j(params);
        more.create();

        var onmore = function onmore() {
          if (_this2.onEnter) _this2.onEnter();

          if (_this2.onMore) {
            _this2.onMore();
          } else {
            Activity$1.push({
              url: data.url,
              title: Lang.translate('title_category'),
              component: 'category_full',
              page: light ? 1 : 2,
              genres: params.genres,
              filter: data.filter,
              source: params.object.source
            });
          }
        };

        more.onFocus = function (target) {
          last = target;
          scroll.update(more.render(), params.align_left ? false : true);
          if (_this2.onFocusMore) _this2.onFocusMore();
        };

        more.onEnter = function () {
          onmore();
        };

        var button = $('<div class="items-line__more selector">' + Lang.translate('more') + '</div>');
        button.on('hover:enter', function () {
          onmore();
        });
        content.find('.items-line__head').append(button);
        scroll.append(more.render());
      };

      this.visible = function () {
        var vis = items;
        if (!viewall) vis = items.slice(active, active + 8);
        vis.forEach(function (item) {
          item.visible();
        });
      };

      this.toggle = function () {
        var _this3 = this;

        Controller.add('items_line', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(items.length ? last : false, scroll.render());

            _this3.visible();
          },
          right: function right() {
            Navigator.move('right');
            Controller.enable('items_line');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else if (_this3.onLeft) _this3.onLeft();else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('items_line');
      };

      this.render = function () {
        return content;
      };

      this.destroy = function () {
        Arrays.destroy(items);
        scroll.destroy();
        content.remove();
        if (more) more.destroy();
        items = null;
        more = null;
      };
    }

    function create$h() {
      var html;

      this.create = function () {
        html = Template.get('info');
      };

      this.update = function (data) {
        var nofavorite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var create = ((data.release_date || data.first_air_date || '0000') + '').slice(0, 4);
        var vote = parseFloat((data.vote_average || 0) + '').toFixed(1);
        html.find('.info__title').text(data.title);
        html.find('.info__title-original').text((create == '0000' ? '' : create + ' - ') + data.original_title);
        html.find('.info__rate span').text(vote);
        html.find('.info__rate').toggleClass('hide', !(vote > 0));
        html.find('.info__icon').removeClass('active');

        if (!nofavorite) {
          var status = Favorite.check(data);
          $('.icon--book', html).toggleClass('active', status.book);
          $('.icon--like', html).toggleClass('active', status.like);
          $('.icon--wath', html).toggleClass('active', status.wath);
        }

        html.find('.info__right').toggleClass('hide', nofavorite);
      };

      this.render = function () {
        return html;
      };

      this.empty = function () {
        this.update({
          title: Lang.translate('more'),
          original_title: Lang.translate('more_results'),
          vote_average: 0
        }, true);
      };

      this.destroy = function () {
        html.remove();
        html = null;
      };
    }

    function create$g() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Arrays.extend(params, {
        title: Lang.translate('empty_title_two'),
        descr: Lang.translate('empty_text_two')
      });
      var html = Template.get('empty', params);

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(html);
            Controller.collectionFocus(false, html);
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            Navigator.move('right');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.render = function (add) {
        if (add) html.append(add);
        return html;
      };
    }

    function component$f(object) {
      var network = new create$p();
      var scroll = new create$o({
        mask: true,
        over: true,
        scroll_by_item: true
      });
      var items = [];
      var html = $('<div></div>');
      var active = 0;
      var info;
      var lezydata;
      var viewall = Storage.field('card_views_type') == 'view' || Storage.field('navigation_type') == 'mouse';

      this.create = function () {};

      this.empty = function () {
        var empty = new create$g();
        html.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.build = function (data) {
        var _this = this;

        lezydata = data;

        if (Storage.field('light_version') && window.innerWidth >= 767) {
          scroll.minus();
          html.append(scroll.render());

          scroll.onWheel = function (step) {
            if (step > 0) _this.down();else _this.up();
          };
        } else {
          info = new create$h();
          info.create();
          scroll.minus(info.render());
          html.append(info.render());
          html.append(scroll.render());
        }

        data.slice(0, viewall ? data.length : 2).forEach(this.append.bind(this));
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.append = function (element) {
        if (element.ready) return;
        element.ready = true;
        var item = new create$i(element, {
          url: element.url,
          card_small: true,
          genres: object.genres,
          object: object,
          card_wide: element.wide,
          nomore: element.nomore
        });
        item.create();
        item.onDown = this.down.bind(this);
        item.onUp = this.up.bind(this);
        item.onBack = this.back.bind(this);

        if (info) {
          item.onFocus = info.update;
          item.onFocusMore = info.empty.bind(info);
          scroll.append(item.render());
        } else {
          item.wrap = $('<div></div>');
          scroll.append(item.wrap);
        }

        items.push(item);
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.detach = function () {
        if (!info) {
          items.forEach(function (item) {
            item.render().detach();
          });
          items.slice(active, active + 2).forEach(function (item) {
            item.wrap.append(item.render());
          });
        }
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        if (!viewall) lezydata.slice(0, active + 2).forEach(this.append.bind(this));
        this.detach();
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          this.detach();
          Controller.toggle('head');
        } else {
          this.detach();
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.start = function () {
        var _this2 = this;

        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              _this2.detach();

              items[active].toggle();
            }
          },
          back: this.back
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        if (info) info.destroy();
        html.remove();
        items = null;
        network = null;
        lezydata = null;
      };
    }

    function component$e(object) {
      var comp = new component$f(object);

      comp.create = function () {
        this.activity.loader(true);
        Api.main(object, this.build.bind(this), this.empty.bind(this));
        return this.render();
      };

      return comp;
    }

    var player;
    var html$7;
    var timer$1;

    function create$f(id) {
      html$7 = $('<div class="youtube-player"><div id="youtube-player"></div><div id="youtube-player__progress" class="youtube-player__progress"></div></div>');
      $('body').append(html$7);
      player = new YT.Player('youtube-player', {
        height: window.innerHeight,
        width: window.innerWidth,
        playerVars: {
          'controls': 0,
          'showinfo': 0,
          'autohide': 1,
          'modestbranding': 1,
          'autoplay': 1
        },
        videoId: id,
        events: {
          onReady: function onReady(event) {
            event.target.playVideo();
            update$2();
          },
          onStateChange: function onStateChange(state) {
            if (state.data == 0) {
              Controller.toggle('content');
            }
          }
        }
      });
    }

    function update$2() {
      timer$1 = setTimeout(function () {
        var progress = player.getCurrentTime() / player.getDuration() * 100;
        $('#youtube-player__progress').css('width', progress + '%');
        update$2();
      }, 400);
    }

    function play(id) {
      create$f(id);
      Controller.add('youtube', {
        invisible: true,
        toggle: function toggle() {},
        right: function right() {
          player.seekTo(player.getCurrentTime() + 10, true);
        },
        left: function left() {
          player.seekTo(player.getCurrentTime() - 10, true);
        },
        enter: function enter() {},
        gone: function gone() {
          destroy$2();
        },
        back: function back() {
          Controller.toggle('content');
        }
      });
      Controller.toggle('youtube');
    }

    function destroy$2() {
      clearTimeout(timer$1);
      player.destroy();
      html$7.remove();
      html$7 = null;
    }

    var YouTube = {
      play: play
    };

    function create$e(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var html;
      var last;
      var tbtn;

      var follow = function follow(e) {
        if (e.name == 'parser_use') {
          var status = Storage.get('parser_use');
          tbtn.toggleClass('selector', status).toggleClass('hide', !status);
        }
      };

      var buttons_scroll = new create$o({
        horizontal: true,
        nopadding: true
      });
      var poster_size = Storage.field('poster_size');
      Arrays.extend(data.movie, {
        title: data.movie.name,
        original_title: data.movie.original_name,
        runtime: 0,
        img: data.movie.poster_path ? Api.img(data.movie.poster_path, poster_size) : 'img/img_broken.svg'
      });

      this.create = function () {
        var _this = this;

        var genres = (data.movie.genres || ['---']).slice(0, 3).map(function (a) {
          return Utils.capitalizeFirstLetter(a.name);
        }).join(', ');
        html = Template.get('full_start', {
          title: data.movie.title,
          original_title: data.movie.original_title,
          descr: Utils.substr(data.movie.overview || Lang.translate('full_notext'), 420),
          time: Utils.secondsToTime(data.movie.runtime * 60, true),
          genres: Utils.substr(genres, 30),
          r_themovie: parseFloat((data.movie.vote_average || 0) + '').toFixed(1),
          seasons: data.movie.number_of_seasons,
          episodes: data.movie.number_of_episodes
        });

        if (data.movie.number_of_seasons) {
          html.find('.is--serial').removeClass('hide');
        }

        $('.full-start__buttons-scroll', html).append(buttons_scroll.render());
        buttons_scroll.append($('.full-start__buttons', html));
        if (!data.movie.runtime) $('.tag--time', html).remove();

        if (data.movie.next_episode_to_air) {
          var air = new Date(data.movie.next_episode_to_air.air_date);
          var now = Date.now();
          var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
          if (day > 0) $('.tag--episode', html).removeClass('hide').find('div').text(Lang.translate('full_next_episode') + ': ' + Utils.parseTime(data.movie.next_episode_to_air.air_date)["short"] + ' / ' + Lang.translate('full_episode_days_left') + ': ' + day);
        }

        tbtn = html.find('.view--torrent');
        tbtn.on('hover:enter', function () {
          var query = data.movie.original_title;
          if (Storage.field('parse_lang') == 'ru' || !/\w{3}/.test(query)) query = data.movie.title;
          Activity$1.push({
            url: '',
            title: Lang.translate('title_torrents'),
            component: 'torrents',
            search: query,
            search_one: data.movie.title,
            search_two: data.movie.original_title,
            movie: data.movie,
            page: 1
          });
        });
        html.find('.info__icon').on('hover:enter', function (e) {
          var type = $(e.target).data('type');
          params.object.card = data.movie;
          params.object.card.source = params.object.source;
          Favorite.toggle(type, params.object.card);

          _this.favorite();
        });

        if (data.videos && data.videos.results.length) {
          html.find('.view--trailer').on('hover:enter', function () {
            var items = [];
            data.videos.results.forEach(function (element) {
              items.push({
                title: element.name,
                subtitle: element.official ? Lang.translate('full_trailer_official') : Lang.translate('full_trailer_no_official'),
                id: element.key,
                player: element.player,
                url: element.url
              });
            });
            Select.show({
              title: Lang.translate('title_trailers'),
              items: items,
              onSelect: function onSelect(a) {
                _this.toggle();

                if (a.player) {
                  Player.play(a);
                  Player.playlist([a]);
                } else if (Platform.is('android')) {
                  openYoutube(a.id);
                } else YouTube.play(a.id);
              },
              onBack: function onBack() {
                Controller.toggle('full_start');
              }
            });
          });
        } else {
          html.find('.view--trailer').remove();
        }

        var img = html.find('.full-start__img')[0] || {};

        img.onerror = function (e) {
          img.src = './img/img_broken.svg';
        };

        img.src = data.movie.img;
        Background.immediately(Utils.cardImgBackground(data.movie));
        Storage.listener.follow('change', follow);
        follow({
          name: 'parser_use'
        });
        this.favorite();
      };

      this.groupButtons = function () {
        var buttons = html.find('.full-start__buttons > *').not('.full-start__icons,.info__rate,.open--menu,.view--torrent,.view--trailer');
        var max = 2;

        if (buttons.length > max) {
          buttons.hide();
          html.find('.open--menu').on('hover:enter', function () {
            var enabled = Controller.enabled().name;
            var menu = [];
            var ready = {};
            buttons.each(function () {
              var name = $(this).find('span').text();

              if (ready[name]) {
                ready[name]++;
                name = name + ' ' + ready[name];
              } else {
                ready[name] = 1;
              }

              menu.push({
                title: name,
                subtitle: $(this).data('subtitle'),
                btn: $(this)
              });
            });
            Select.show({
              title: Lang.translate('title_watch'),
              items: menu,
              onBack: function onBack() {
                Controller.toggle(enabled);
              },
              onSelect: function onSelect(a) {
                a.btn.trigger('hover:enter');
              }
            });
          });
        } else {
          html.find('.open--menu').hide();
        }
      };

      this.favorite = function () {
        var status = Favorite.check(params.object.card);
        $('.info__icon', html).removeClass('active');
        $('.icon--book', html).toggleClass('active', status.book);
        $('.icon--like', html).toggleClass('active', status.like);
        $('.icon--wath', html).toggleClass('active', status.wath);
      };

      this.toggleBackground = function () {
        Background.immediately(Utils.cardImgBackground(data.movie));
      };

      this.toggle = function () {
        var _this2 = this;

        Controller.add('full_start', {
          toggle: function toggle() {
            var btns = html.find('.full-start__buttons > *').not('.full-start__icons,.info__rate,.open--menu').filter(function () {
              return $(this).is(':visible');
            });
            Controller.collectionSet(_this2.render());
            Controller.collectionFocus(last || (btns.length ? btns.eq(0)[0] : $('.open--menu', html)[0]), _this2.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_start');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        last = null;
        buttons_scroll.destroy();
        html.remove();
        Storage.listener.remove('change', follow);
      };
    }

    function create$d(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var html, body, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: Lang.translate('full_detail')
        });
        var genres = data.movie.genres.map(function (a) {
          return '<div class="full-descr__tag selector" data-genre="' + a.id + '" data-url="' + a.url + '">' + a.name + '</div>';
        }).join('');
        var companies = data.movie.production_companies.map(function (a) {
          return '<div class="full-descr__tag selector" data-company="' + a.id + '">' + a.name + '</div>';
        }).join('');
        var countries = data.movie.production_countries.map(function (a) {
          return a.name;
        }).join(', ');
        body = Template.get('full_descr', {
          text: (data.movie.overview || Lang.translate('full_notext')) + '<br><br>',
          genres: genres,
          companies: companies,
          relise: data.movie.release_date || data.movie.first_air_date,
          budget: '$ ' + Utils.numberWithSpaces(data.movie.budget || 0),
          countries: countries
        });
        if (!genres) $('.full--genres', body).remove();
        if (!companies) $('.full--companies', body).remove();
        body.find('.selector').on('hover:enter', function (e) {
          var item = $(e.target);

          if (item.data('genre')) {
            var tmdb = params.object.source == 'tmdb' || params.object.source == 'cub';
            Activity$1.push({
              url: tmdb ? 'movie' : item.data('url'),
              component: tmdb ? 'category' : 'category_full',
              genres: item.data('genre'),
              source: params.object.source,
              page: 1
            });
          }

          if (item.data('company')) {
            Api.clear();
            Modal.open({
              title: Lang.translate('title_company'),
              html: Template.get('modal_loading'),
              size: 'medium',
              onBack: function onBack() {
                Modal.close();
                Controller.toggle('full_descr');
              }
            });
            Api.company({
              id: item.data('company')
            }, function (json) {
              if (Controller.enabled().name == 'modal') {
                Arrays.empty(json, {
                  homepage: '---',
                  origin_country: '---',
                  headquarters: '---'
                });
                Modal.update(Template.get('company', json));
              }
            }, function () {});
          }
        }).on('hover:focus', function (e) {
          last = e.target;
        });
        html.find('.items-line__body').append(body);
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_descr', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');else _this.onDown();
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else _this.onUp();
          },
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_descr');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        body.remove();
        html.remove();
        html = null;
        body = null;
      };
    }

    function create$c(persons, params) {
      var html, scroll, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: params.title || Lang.translate('title_actors')
        });
        scroll = new create$o({
          horizontal: true,
          scroll_by_item: true
        });
        scroll.render().find('.scroll__body').addClass('full-persons');
        html.find('.items-line__body').append(scroll.render());
        persons.forEach(function (element) {
          var person = Template.get('full_person', {
            name: element.name,
            role: element.character || element.job,
            img: element.profile_path ? Api.img(element.profile_path) : element.img || './img/actor.svg'
          });
          person.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          }).on('hover:enter', function () {
            Activity$1.push({
              url: element.url,
              title: Lang.translate('title_person'),
              component: 'actor',
              id: element.id,
              source: params.object.source
            });
          });
          scroll.append(person);
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_descr', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_descr');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        scroll.destroy();
        html.remove();
        html = null;
      };
    }

    function create$b(data) {
      var html, scroll, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: Lang.translate('title_comments')
        });
        scroll = new create$o({
          horizontal: true
        });
        scroll.render().find('.scroll__body').addClass('full-reviews');
        html.find('.items-line__body').append(scroll.render());
        data.comments.forEach(function (element) {
          var review = Template.get('full_review', element);
          review.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          });
          scroll.append(review);
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_reviews', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_reviews');
      };

      this.render = function () {
        return html;
      };
    }

    function create$a(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var html, scroll, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: Lang.translate('full_series_release')
        });
        scroll = new create$o({
          horizontal: true
        });
        scroll.render().find('.scroll__body').addClass('full-episodes');
        html.find('.items-line__body').append(scroll.render());
        var movie_title = params.title;
        data.reverse().forEach(function (element) {
          element.date = element.air_date ? Utils.parseTime(element.air_date).full : '----';
          var episode = Template.get('full_episode', element);
          var hash = Utils.hash([element.season_number, element.episode_number, movie_title].join(''));
          var view = Timeline.view(hash);
          if (view.percent) episode.append(Timeline.render(view));

          if (element.plus) {
            episode.addClass('full-episode--next');
          } else {
            var img = episode.find('img')[0];

            img.onerror = function (e) {
              img.src = './img/img_broken.svg';
            };

            if (element.still_path) img.src = Api.img(element.still_path, 'w200');else img.src = './img/img_broken.svg';
          }

          episode.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          }).on('hover:enter', function () {
            if (element.overview) {
              Modal.open({
                title: element.name,
                html: $('<div class="about"><div class="selector">' + element.overview + '</div></div>'),
                onBack: function onBack() {
                  Modal.close();
                  Controller.toggle('content');
                },
                onSelect: function onSelect() {
                  Modal.close();
                  Controller.toggle('content');
                }
              });
            }
          });
          scroll.append(episode);
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_episodes', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_episodes');
      };

      this.render = function () {
        return html;
      };
    }

    var components$1 = {
      start: create$e,
      descr: create$d,
      persons: create$c,
      recomend: create$i,
      simular: create$i,
      comments: create$b,
      episodes: create$a
    };

    function component$d(object) {
      var network = new create$p();
      var scroll = new create$o({
        mask: true,
        over: true,
        step: 400,
        scroll_by_item: false
      });
      var items = [];
      var active = 0;
      scroll.render().addClass('layer--wheight');

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.full(object, function (data) {
          _this.activity.loader(false);

          if (data.movie) {
            Lampa.Listener.send('full', {
              type: 'start',
              object: object,
              data: data
            });

            _this.build('start', data);

            if (data.episodes && data.episodes.episodes) {
              var today = new Date();
              var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
              var time = new Date(date).getTime();
              var plus = false;
              var cameout = data.episodes.episodes.filter(function (e) {
                var air = new Date(e.air_date).getTime();
                if (air <= time) return true;else if (!plus) {
                  plus = true;
                  e.plus = true;
                  return true;
                }
                return false;
              });
              if (cameout.length) _this.build('episodes', cameout, {
                title: data.movie.original_title
              });
            }

            _this.build('descr', data);

            if (data.persons && data.persons.crew && data.persons.crew.length) {
              var directors = data.persons.crew.filter(function (member) {
                return member.job === 'Director';
              });

              if (directors.length) {
                _this.build('persons', directors, {
                  title: Lang.translate('title_producer')
                });
              }
            }

            if (data.persons && data.persons.cast && data.persons.cast.length) _this.build('persons', data.persons.cast);
            if (data.comments && data.comments.length) _this.build('comments', data);

            if (data.collection && data.collection.results.length) {
              data.collection.title = Lang.translate('title_collection');
              data.collection.noimage = true;

              _this.build('recomend', data.collection);
            }

            if (data.recomend && data.recomend.results.length) {
              data.recomend.title = Lang.translate('title_recomendations');
              data.recomend.noimage = true;

              _this.build('recomend', data.recomend);
            }

            if (data.simular && data.simular.results.length) {
              data.simular.title = Lang.translate('title_similar');
              data.simular.noimage = true;

              _this.build('simular', data.simular);
            }

            TimeTable.update(data.movie);
            Lampa.Listener.send('full', {
              type: 'complite',
              object: object,
              data: data
            });
            items[0].groupButtons();

            _this.activity.toggle();
          } else {
            _this.empty();
          }
        }, this.empty.bind(this));
        return this.render();
      };

      this.empty = function () {
        var empty = new create$g();
        scroll.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.build = function (name, data, params) {
        var item = new components$1[name](data, _objectSpread2({
          object: object,
          nomore: true
        }, params));
        item.onDown = this.down;
        item.onUp = this.up;
        item.onBack = this.back;
        item.create();
        items.push(item);
        Lampa.Listener.send('full', {
          type: 'build',
          name: name,
          body: item.render()
        });
        scroll.append(item.render());
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          Controller.toggle('head');
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        if (items.length) items[0].toggleBackground();
        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              items[active].toggle();
            }
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        items = null;
        network = null;
      };
    }

    function component$c(object) {
      var network = new create$p();
      var scroll = new create$o({
        mask: true,
        over: true,
        step: 250
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var info;
      var last;
      var waitload;

      this.create = function () {};

      this.empty = function () {
        var empty = new create$g();
        scroll.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.next = function () {
        var _this = this;

        if (waitload) return;

        if (object.page < 15 && object.page < total_pages) {
          waitload = true;
          object.page++;
          Api.list(object, function (result) {
            _this.append(result);

            waitload = false;
            Controller.enable('content');
          }, function () {});
        }
      };

      this.append = function (data) {
        var _this2 = this;

        data.results.forEach(function (element) {
          var card = new Card(element, {
            card_category: true,
            object: object
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(Utils.cardImgBackground(card_data));

            if (info) {
              info.update(card_data);
              var maxrow = Math.ceil(items.length / 7) - 1;
              if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this2.next();
            }
          };

          card.onEnter = function (target, card_data) {
            Activity$1.push({
              url: card_data.url,
              component: 'full',
              id: element.id,
              method: card_data.name ? 'tv' : 'movie',
              card: element,
              source: object.source
            });
          };

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        if (data.results.length) {
          total_pages = data.total_pages;

          if (Storage.field('light_version') && window.innerWidth >= 767) {
            scroll.minus();
            html.append(scroll.render());
          } else {
            info = new create$h();
            info.create();
            scroll.minus(info.render());
            html.append(info.render());
            html.append(scroll.render());
          }

          this.append(data);
          if (!info && items.length) this.back();
          if (total_pages > data.page && !info && items.length) this.more();
          scroll.append(body);
          this.activity.loader(false);
          this.activity.toggle();
        } else {
          html.append(scroll.render());
          this.empty();
        }
      };

      this.more = function () {
        var more = $('<div class="selector" style="width: 100%; height: 5px"></div>');
        more.on('hover:focus', function (e) {
          Controller.collectionFocus(last || false, scroll.render());
          var next = Arrays.clone(object);
          delete next.activity;
          next.page++;
          Activity$1.push(next);
        });
        body.append(more);
      };

      this.back = function () {
        last = items[0].render()[0];
        var more = $('<div class="selector" style="width: 100%; height: 5px"></div>');
        more.on('hover:focus', function (e) {
          if (object.page > 1) {
            Activity$1.backward();
          } else {
            Controller.toggle('head');
          }
        });
        body.prepend(more);
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        if (info) info.destroy();
        html.remove();
        body.remove();
        network = null;
        items = null;
        html = null;
        body = null;
        info = null;
      };
    }

    function component$b(object) {
      var comp = new component$c(object);

      comp.create = function () {
        Api.list(object, this.build.bind(this), this.empty.bind(this));
      };

      return comp;
    }

    function component$a(object) {
      var comp = new component$f(object);

      comp.create = function () {
        this.activity.loader(true);
        Api.category(object, this.build.bind(this), this.empty.bind(this));
        return this.render();
      };

      return comp;
    }

    function create$9(data) {
      var html;
      var last;

      this.create = function () {
        html = Template.get('person_start', {
          name: data.name,
          birthday: data.birthday,
          descr: Utils.substr(data.biography, 1020),
          img: data.profile_path ? Api.img(data.profile_path) : data.img || 'img/img_broken.svg',
          place: data.place_of_birth
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_start', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_start');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        last = null;
        html.remove();
      };
    }

    var components = {
      start: create$9,
      line: create$i
    };

    function component$9(object) {
      var network = new create$p();
      var scroll = new create$o({
        mask: true,
        over: true
      });
      var items = [];
      var active = 0;
      scroll.render().addClass('layer--wheight');

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.person(object, function (data) {
          _this.activity.loader(false);

          if (data.person) {
            _this.build('start', data.person);

            if (data.credits && data.credits.knownFor && data.credits.knownFor.length > 0) {
              for (var i = 0; i < Math.min(data.credits.knownFor.length, 3); i++) {
                var departament = data.credits.knownFor[i];

                _this.build('line', {
                  title: departament.name,
                  noimage: true,
                  results: departament.credits
                });
              }
            } else {
              //для обратной совместимости с иви и окко
              if (data.movie && data.movie.results.length) {
                data.movie.title = Lang.translate('menu_movies');
                data.movie.noimage = true;

                _this.build('line', data.movie);
              }

              if (data.tv && data.tv.results.length) {
                data.tv.title = Lang.translate('menu_tv');
                data.tv.noimage = true;

                _this.build('line', data.tv);
              }
            }

            _this.activity.toggle();
          } else {
            _this.empty();
          }
        }, this.empty.bind(this));
        return this.render();
      };

      this.empty = function () {
        var empty = new create$g();
        scroll.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.build = function (name, data) {
        var item = new components[name](data, {
          object: object,
          nomore: true
        });
        item.onDown = this.down;
        item.onUp = this.up;
        item.onBack = this.back;
        item.create();
        items.push(item);
        scroll.append(item.render());
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          Controller.toggle('head');
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              items[active].toggle();
            }
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        items = null;
        network = null;
      };
    }

    function component$8(object) {
      var _this = this;

      var network = new create$p();
      var scroll = new create$o({
        mask: true,
        over: true,
        step: 250
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var info;
      var last;
      var waitload;
      var timer_offer;

      this.create = function () {
        this.activity.loader(true);

        if (Account.working()) {
          Account.network.timeout(5000);
          Account.update(this.display.bind(this));
        } else this.display();

        return this.render();
      };

      this.display = function () {
        Api.favorite(object, this.build.bind(this), this.empty.bind(this));
      };

      this.offer = function () {
        if (!Account.working()) {
          var shw = Storage.get('favotite_offer', 'false');

          if (!shw) {
            timer_offer = setTimeout(function () {
              var tpl = Template.get('torrent_install', {});
              Storage.set('favotite_offer', 'true');
              tpl.find('.torrent-install__title').text(Lang.translate('fav_sync_title'));
              tpl.find('.torrent-install__descr').html(Lang.translate('fav_sync_text'));
              tpl.find('.torrent-install__label').remove();
              tpl.find('.torrent-install__links').html('<div class="torrent-install__link"><div>' + Lang.translate('fav_sync_site') + '</div><div>www.cub.watch</div></div>');
              tpl.find('.torrent-install__left img').attr('src', 'https://yumata.github.io/lampa/img/ili/bookmarks.png');
              Modal.open({
                title: '',
                html: tpl,
                size: 'large',
                onBack: function onBack() {
                  Modal.close();
                  Controller.toggle('content');
                }
              });
            }, 5000);
          }
        }
      };

      this.empty = function () {
        var empty = new create$g();
        html.append(empty.render());
        _this.start = empty.start;

        _this.activity.loader(false);

        _this.activity.toggle();
      };

      this.next = function () {
        var _this2 = this;

        if (waitload) return;

        if (object.page < 15 && object.page < total_pages) {
          waitload = true;
          object.page++;
          Api.favorite(object, function (result) {
            _this2.append(result);

            waitload = false;
            Controller.enable('content');
          }, function () {});
        }
      };

      this.append = function (data) {
        var _this3 = this;

        data.results.forEach(function (element) {
          var card = new Card(element, {
            card_category: true
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(Utils.cardImgBackground(card_data));

            if (info) {
              info.update(card_data);
              var maxrow = Math.ceil(items.length / 7) - 1;
              if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
            }
          };

          card.onEnter = function (target, card_data) {
            Activity$1.push({
              url: card_data.url,
              component: 'full',
              id: element.id,
              method: card_data.name ? 'tv' : 'movie',
              card: element,
              source: card_data.source || 'tmdb'
            });
          };

          if (object.type == 'history') {
            card.onMenu = function (target, card_data) {
              var enabled = Controller.enabled().name;
              Select.show({
                title: Lang.translate('title_action'),
                items: [{
                  title: Lang.translate('fav_remove_title'),
                  subtitle: Lang.translate('fav_remove_descr'),
                  one: true
                }, {
                  title: Lang.translate('fav_clear_title'),
                  subtitle: Lang.translate('fav_clear_descr'),
                  all: true
                }, {
                  title: Lang.translate('fav_clear_label_title'),
                  subtitle: Lang.translate('fav_clear_label_descr'),
                  label: true
                }, {
                  title: Lang.translate('fav_clear_time_title'),
                  subtitle: Lang.translate('fav_clear_time_descr'),
                  timecode: true
                }],
                onBack: function onBack() {
                  Controller.toggle(enabled);
                },
                onSelect: function onSelect(a) {
                  if (a.all) {
                    Favorite.clear('history');

                    _this3.clear();

                    html.empty();

                    _this3.empty();
                  } else if (a.label) {
                    Storage.set('online_view', []);
                    Storage.set('torrents_view', []);
                    Noty.show(Lang.translate('fav_label_cleared'));
                  } else if (a.timecode) {
                    Storage.set('file_view', {});
                    Noty.show(Lang.translate('fav_time_cleared'));
                  } else {
                    Favorite.remove('history', card_data);
                    var index = items.indexOf(card);
                    if (index > 0) last = items[index - 1].render()[0];else if (items[index + 1]) last = items[index + 1].render()[0];
                    Arrays.remove(items, card);
                    card.destroy();

                    if (!items.length) {
                      _this3.clear();

                      html.empty();

                      _this3.empty();
                    }
                  }

                  Controller.toggle(enabled);
                }
              });
            };
          }

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        total_pages = data.total_pages;

        if (Storage.field('light_version')) {
          scroll.minus();
          html.append(scroll.render());
        } else {
          info = new create$h();
          info.create();
          scroll.minus(info.render());
          html.append(info.render());
          html.append(scroll.render());
        }

        this.append(data);
        if (total_pages > data.page && !info) this.more();
        scroll.append(body);
        this.activity.loader(false);
        this.activity.toggle();
        this.offer();
      };

      this.more = function () {
        var more = $('<div class="category-full__more selector"><span>' + Lang.translate('show_more') + '</span></div>');
        more.on('hover:focus', function (e) {
          Controller.collectionFocus(last || false, scroll.render());
          var next = Arrays.clone(object);
          delete next.activity;
          next.page++;
          Activity$1.push(next);
        });
        body.append(more);
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.clear = function () {
        network.clear();
        Arrays.destroy(items);
        items = [];
        if (scroll) scroll.destroy();
        if (info) info.destroy();
        scroll = null;
        info = null;
      };

      this.destroy = function () {
        this.clear();
        html.remove();
        body.remove();
        clearTimeout(timer_offer);
        network = null;
        items = null;
        html = null;
        body = null;
        info = null;
      };
    }

    function create$8() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var html = Template.get('files', params.movie);
      html.addClass('layer--width');

      if (params.movie.id) {
        html.find('.selector').on('hover:enter', function () {
          if (Activity$1.all().length > 1) {
            Activity$1.back();
          } else {
            Activity$1.push({
              url: params.movie.url,
              component: 'full',
              id: params.movie.id,
              method: params.movie.name ? 'tv' : 'movie',
              card: params.movie,
              source: params.movie.source
            });
          }
        });
      } else {
        html.find('.selector').removeClass('selector');
      }

      this.render = function () {
        return html;
      };

      this.append = function (add) {
        html.find('.files__body').append(add);
      };

      this.destroy = function () {
        html.remove();
        html = null;
      };

      this.clear = function () {
        html.find('.files__body').empty();
      };
    }

    function create$7() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var search = Template.get('search_box');
      var input = '';

      function destroy() {
        keyboard.destroy();
        search.remove();
        search = null;
      }

      function back() {
        destroy();
        params.onBack();
      }

      function enter() {
        destroy();
        params.onSearch(input);
      }

      function change(text) {
        input = text.trim();

        if (input) {
          search.find('.search-box__input').text(input);
        } else {
          search.find('.search-box__input').text(Lang.translate('search_input') + '...');
        }
      }

      if (Storage.field('keyboard_type') !== 'lampa') search.find('.search-box__input').hide();
      $('body').append(search);
      var keyboard = new create$3({
        layout: {
          'en': ['1 2 3 4 5 6 7 8 9 0 - {bksp}', 'q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m .', '{mic} {RU} {space} {search}'],
          'uk': ['1 2 3 4 5 6 7 8 9 0 - {bksp}', 'й ц у к е н г ш щ з х ї', 'ф і в а п р о л д ж є', 'я ч с м и т ь б ю .', '{mic} {RU} {space} {search}'],
          'default': ['1 2 3 4 5 6 7 8 9 0 - {bksp}', 'й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', 'я ч с м и т ь б ю .', '{mic} {EN} {space} {search}']
        }
      });
      keyboard.create();
      keyboard.listener.follow('change', function (event) {
        change(event.value);
      });
      keyboard.listener.follow('back', back);
      keyboard.listener.follow('enter', enter);
      keyboard.value(params.input);
      change(params.input);
      keyboard.toggle();
    }

    function create$6() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var line = Template.get('filter').addClass('torrent-filter');
      var empty = $('<div class="empty__footer"><div class="simple-button selector">' + Lang.translate('filter_clarify_two') + '</div></div>');
      var data = {
        sort: [],
        filter: []
      };
      var similars = [];
      var buttons_scroll = new create$o({
        horizontal: true,
        nopadding: true
      });

      function selectSearch() {
        var _this = this;

        var selected = params.search_one == params.search ? 0 : params.search_two == params.search ? 1 : -1;
        var search = [];

        if (similars.length) {
          similars.forEach(function (sim) {
            search.push({
              title: sim,
              query: sim
            });
          });
        } else {
          if (params.search_one) {
            search.push({
              title: params.search_one,
              query: params.search_one,
              selected: selected == 0
            });
          }

          if (params.search_two) {
            search.push({
              title: params.search_two,
              query: params.search_two,
              selected: selected == 1
            });
          }
        }

        search.push({
          title: Lang.translate('filter_set_name'),
          selected: selected == -1,
          query: ''
        });
        Select.show({
          title: Lang.translate('filter_clarify'),
          items: search,
          onBack: this.onBack,
          onSelect: function onSelect(a) {
            if (!a.query) {
              new create$7({
                input: params.search,
                onSearch: _this.onSearch,
                onBack: _this.onBack
              });
            } else {
              _this.onSearch(a.query);
            }
          }
        });
      }

      empty.on('hover:enter', selectSearch.bind(this));
      line.find('.filter--search').on('hover:enter', selectSearch.bind(this));
      line.find('.filter--sort').on('hover:enter', function () {
        _this2.show(Lang.translate('filter_sorted'), 'sort');
      });
      line.find('.filter--filter').on('hover:enter', function () {
        _this2.show(Lang.translate('filter_filtred'), 'filter');
      });
      buttons_scroll.append(line);

      this.show = function (title, type) {
        var _this3 = this;

        var where = data[type];
        Select.show({
          title: title,
          items: where,
          onBack: this.onBack,
          onSelect: function onSelect(a) {
            _this3.selected(where, a);

            if (a.items) {
              Select.show({
                title: a.title,
                items: a.items,
                onBack: function onBack() {
                  _this3.show(title, type);
                },
                onSelect: function onSelect(b) {
                  _this3.selected(a.items, b);

                  _this3.onSelect(type, a, b);

                  _this3.show(title, type);
                },
                onCheck: function onCheck(b) {
                  _this3.onCheck(type, a, b);
                }
              });
            } else {
              _this3.onSelect(type, a);
            }
          }
        });
      };

      this.selected = function (items, a) {
        items.forEach(function (element) {
          element.selected = false;
        });
        a.selected = true;
      };

      this.render = function () {
        return buttons_scroll.render();
      };

      this.append = function (add) {
        html.find('.files__body').append(add);
      };

      this.empty = function () {
        return empty;
      };

      this.toggle = function () {
        line.find('.filter--sort').toggleClass('selector', data.sort.length ? true : false).toggleClass('hide', data.sort.length ? false : true);
        line.find('.filter--filter').toggleClass('selector', data.filter.length ? true : false).toggleClass('hide', data.filter.length ? false : true);
      };

      this.set = function (type, items) {
        data[type] = items;
        this.toggle();
      };

      this.get = function (type) {
        return data[type];
      };

      this.similar = function (sim) {
        similars = sim;
        return empty;
      };

      this.sort = function (items, by) {
        items.sort(function (c, b) {
          if (c[by] < b[by]) return 1;
          if (c[by] > b[by]) return -1;
          return 0;
        });
      };

      this.chosen = function (type, select) {
        line.find('.filter--' + type + ' > div').text(Utils.shortText(select.join(', '), 25)).toggleClass('hide', select.length ? false : true);
      };

      this.destroy = function () {
        empty.remove();
        line.remove();
        buttons_scroll.destroy();
        empty = null;
        line = null;
        data = null;
      };
    }

    var html$6 = $("<div class=\"helper\">\n    <div class=\"helper__body\">\n        <div class=\"helper__ico\">\n            <svg height=\"173\" viewBox=\"0 0 180 173\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M126 3C126 18.464 109.435 31 89 31C68.5655 31 52 18.464 52 3C52 2.4505 52.0209 1.90466 52.0622 1.36298C21.3146 15.6761 0 46.8489 0 83C0 132.706 40.2944 173 90 173C139.706 173 180 132.706 180 83C180 46.0344 157.714 14.2739 125.845 0.421326C125.948 1.27051 126 2.13062 126 3ZM88.5 169C125.779 169 156 141.466 156 107.5C156 84.6425 142.314 64.6974 122 54.0966C116.6 51.2787 110.733 55.1047 104.529 59.1496C99.3914 62.4998 94.0231 66 88.5 66C82.9769 66 77.6086 62.4998 72.4707 59.1496C66.2673 55.1047 60.3995 51.2787 55 54.0966C34.6864 64.6974 21 84.6425 21 107.5C21 141.466 51.2208 169 88.5 169Z\" fill=\"white\"/>\n            <path d=\"M133 121.5C133 143.315 114.196 161 91 161C67.804 161 49 143.315 49 121.5C49 99.6848 67.804 116.5 91 116.5C114.196 116.5 133 99.6848 133 121.5Z\" fill=\"white\"/>\n            <path d=\"M72 81C72 89.8366 66.1797 97 59 97C51.8203 97 46 89.8366 46 81C46 72.1634 51.8203 65 59 65C66.1797 65 72 72.1634 72 81Z\" fill=\"white\"/>\n            <path d=\"M131 81C131 89.8366 125.18 97 118 97C110.82 97 105 89.8366 105 81C105 72.1634 110.82 65 118 65C125.18 65 131 72.1634 131 81Z\" fill=\"white\"/>\n            </svg>\n        </div>\n        <div class=\"helper__text\"></div>\n    </div>\n</div>");
    var body$2 = html$6.find('.helper__text'),
        time;
    var memorys = {};
    var remember = 1000 * 60 * 60 * 14;

    function show$3(name, text, elem) {
      if (!Storage.field('helper')) return;
      var help = memorys[name];

      if (!help) {
        help = {
          time: 0,
          count: 0
        };
        if (_typeof(memorys) !== 'object') memorys = {}; //хз, вылазит ошибка, что в переменную true нельзя записать значение, откуда там true хз

        memorys[name] = help;
      }

      if (help.time + remember < Date.now() && help.count < 3) {
        help.time = Date.now();
        help.count++;
        Storage.set('helper', memorys);
        clearTimeout(time);
        time = setTimeout(function () {
          html$6.removeClass('helper--visible');
        }, 10000);
        body$2.html(text);
        html$6.addClass('helper--visible');

        if (elem) {
          var blink = $('<div class="helper-blink"></div>');
          elem.append(blink);
          setTimeout(function () {
            blink.remove();
          }, 3000);
        }
      }
    }

    function init$9() {
      memorys = Storage.cache('helper', 300, {});
      Settings.listener.follow('open', function (e) {
        if (e.name == 'more') {
          e.body.find('.helper--start-again').on('hover:enter', function () {
            memorys = {};
            Storage.set('helper', memorys);
            Noty.show(Lang.translate('helper_cleared'));
          });
        }
      });
      $('body').append(html$6);
    }

    var Helper = {
      show: show$3,
      init: init$9
    };

    var SERVER = {};
    var timers = {};
    var callback$1;
    var callback_back;
    var formats = ['asf', 'wmv', 'divx', 'avi', 'mp4', 'm4v', 'mov', '3gp', '3g2', 'mkv', 'trp', 'tp', 'mts', 'mpg', 'mpeg', 'dat', 'vob', 'rm', 'rmvb', 'm2ts', 'ts'];
    var formats_individual = ['vob', 'm2ts'];

    function start$3(element, movie) {
      SERVER.object = element;
      if (movie) SERVER.movie = movie;

      if (!Storage.field('internal_torrclient')) {
        openTorrent(SERVER);
        if (movie && movie.id) Favorite.add('history', movie, 100);
        if (callback$1) callback$1();
      } else if (Torserver.url()) {
        loading();
        connect();
      } else install();
    }

    function open$2(hash, movie) {
      SERVER.hash = hash;
      if (movie) SERVER.movie = movie;

      if (!Storage.field('internal_torrclient')) {
        playHash(SERVER);
        if (callback$1) callback$1();
      } else if (Torserver.url()) {
        loading();
        files();
      } else install();
    }

    function loading() {
      Modal.open({
        title: '',
        html: Template.get('modal_loading'),
        size: 'large',
        mask: true,
        onBack: function onBack() {
          Modal.close();
          close();
        }
      });
    }

    function connect() {
      Torserver.connected(function () {
        hash();
      }, function (echo) {
        Torserver.error();
      });
    }

    function hash() {
      Torserver.hash({
        title: SERVER.object.title,
        link: SERVER.object.MagnetUri || SERVER.object.Link,
        poster: SERVER.object.poster,
        action: "play",
        data: {
          lampa: true,
          movie: SERVER.movie
        }
      }, function (json) {
        SERVER.hash = json.hash;
        files();
      }, function (echo) {
        //Torserver.error()
        var jac = Storage.field('parser_torrent_type') == 'jackett';
        var tpl = Template.get('torrent_nohash', {
          title: Lang.translate('title_error'),
          text: Lang.translate('torrent_parser_no_hash'),
          url: SERVER.object.MagnetUri || SERVER.object.Link,
          echo: echo
        });
        if (jac) tpl.find('.is--torlook').remove();else tpl.find('.is--jackett').remove();
        Modal.update(tpl);
      });
    }

    function files() {
      var repeat = 0;
      timers.files = setInterval(function () {
        repeat++;
        Torserver.files(SERVER.hash, function (json) {
          if (json.file_stats) {
            clearInterval(timers.files);
            show$2(json.file_stats);
          }
        });

        if (repeat >= 45) {
          Modal.update(Template.get('error', {
            title: Lang.translate('title_error'),
            text: Lang.translate('torrent_parser_timeout')
          }));
          Torserver.clear();
          Torserver.drop(SERVER.hash);
        }
      }, 2000);
    }

    function install() {
      Modal.open({
        title: '',
        html: Template.get('torrent_install', {}),
        size: 'large',
        onBack: function onBack() {
          Modal.close();
          Controller.toggle('content');
        }
      });
    }

    function show$2(files) {
      var plays = files.filter(function (a) {
        var exe = a.path.split('.').pop().toLowerCase();
        return formats.indexOf(exe) >= 0;
      });
      var active = Activity$1.active(),
          movie = active.movie || SERVER.movie || {};
      var seasons = [];
      plays.forEach(function (element) {
        var info = Torserver.parse(element.path, movie);

        if (info.serial && info.season && seasons.indexOf(info.season) == -1) {
          seasons.push(info.season);
        }
      });

      if (seasons.length) {
        Api.seasons(movie, seasons, function (data) {
          list(plays, {
            movie: movie,
            seasons: data,
            files: files
          });
        });
      } else {
        list(plays, {
          movie: movie,
          files: files
        });
      }
    }

    function parseSubs(path, files) {
      var name = path.split('/').pop().split('.').slice(0, -1).join('.');
      var index = -1;
      var subtitles = files.filter(function (a) {
        var _short = a.path.split('/').pop();

        var issub = ['srt', 'vtt'].indexOf(a.path.split('.').pop().toLowerCase()) >= 0;
        return _short.indexOf(name) >= 0 && issub;
      }).map(function (a) {
        index++;
        return {
          label: '',
          url: Torserver.stream(a.path, SERVER.hash, a.id),
          index: index
        };
      });
      return subtitles.length ? subtitles : false;
    }

    function list(items, params) {
      var html = $('<div class="torrent-files"></div>');
      var playlist = [];
      items.forEach(function (element) {
        var exe = element.path.split('.').pop().toLowerCase();
        var info = Torserver.parse(element.path, params.movie, formats_individual.indexOf(exe) >= 0);
        var view = Timeline.view(info.hash);
        var item;

        var viewed = function viewed(viewing) {
          Account.torrentViewed({
            object: SERVER.object,
            viewing: viewing,
            card: SERVER.movie
          });
        };

        Arrays.extend(element, {
          season: info.season,
          episode: info.episode,
          title: Utils.pathToNormalTitle(element.path),
          size: Utils.bytesToSize(element.length),
          url: Torserver.stream(element.path, SERVER.hash, element.id),
          torrent_hash: SERVER.hash,
          timeline: view,
          air_date: '--',
          img: './img/img_broken.svg',
          exe: exe,
          viewed: viewed
        });

        if (params.seasons) {
          var episodes = params.seasons[info.season];
          element.title = info.episode + ' / ' + Utils.pathToNormalTitle(element.path, false);
          element.fname = element.title;

          if (episodes) {
            var episode = episodes.episodes.filter(function (a) {
              return a.episode_number == info.episode;
            })[0];

            if (episode) {
              element.title = info.episode + ' / ' + episode.name;
              element.air_date = episode.air_date;
              element.fname = episode.name;
              if (episode.still_path) element.img = Api.img(episode.still_path);else if (episode.img) element.img = episode.img;
            }
          }

          item = Template.get('torrent_file_serial', element);
        } else {
          item = Template.get('torrent_file', element);
          if (params.movie.title) element.title = params.movie.title;
        }

        item.append(Timeline.render(view));
        element.subtitles = parseSubs(element.path, params.files);
        playlist.push(element);
        item.on('hover:enter', function () {
          if (params.movie.id) Favorite.add('history', params.movie, 100);

          if (Platform.is('android') && playlist.length > 1) {
            var trim_playlist = [];
            playlist.forEach(function (elem) {
              trim_playlist.push({
                title: elem.title,
                url: elem.url,
                timeline: elem.timeline
              });
            });
            element.playlist = trim_playlist;
          }

          Player.play(element);
          Player.callback(function () {
            Controller.toggle('modal');
          });
          Player.playlist(playlist);
          Player.stat(element.url);

          if (callback$1) {
            callback$1();
            callback$1 = false;
          }
        }).on('hover:long', function () {
          var enabled = Controller.enabled().name;
          var menu = [{
            title: Lang.translate('time_reset'),
            timeclear: true
          }];

          if (Platform.is('webos')) {
            menu.push({
              title: Lang.translate('player_lauch') + ' - WebOS',
              player: 'webos'
            });
          }

          if (Platform.is('android')) {
            menu.push({
              title: Lang.translate('player_lauch') + ' - Android',
              player: 'android'
            });
          }

          menu.push({
            title: Lang.translate('player_lauch') + ' - Lampa',
            player: 'lampa'
          });

          if (!Platform.tv()) {
            menu.push({
              title: Lang.translate('copy_link'),
              link: true
            });
          }

          Select.show({
            title: Lang.translate('title_action'),
            items: menu,
            onBack: function onBack() {
              Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              if (a.timeclear) {
                view.percent = 0;
                view.time = 0;
                view.duration = 0;
                element.timeline = view;
                Timeline.update(view);
              }

              if (a.link) {
                Utils.copyTextToClipboard(element.url.replace('&preload', '&play'), function () {
                  Noty.show(Lang.translate('copy_secuses'));
                }, function () {
                  Noty.show(Lang.translate('copy_error'));
                });
              }

              Controller.toggle(enabled);

              if (a.player) {
                Player.runas(a.player);
                item.trigger('hover:enter');
              }
            }
          });
        }).on('hover:focus', function () {
          Helper.show('torrents_view', Lang.translate('helper_torrents_view'), item);
        });
        html.append(item);
      });
      if (items.length == 0) html = Template.get('error', {
        title: Lang.translate('empty_title'),
        text: Lang.translate('torrent_parser_nofiles')
      });else Modal.title(Lang.translate('title_files'));
      Modal.update(html);
    }

    function opened(call) {
      callback$1 = call;
    }

    function back$4(call) {
      callback_back = call;
    }

    function close() {
      Torserver.drop(SERVER.hash);
      Torserver.clear();
      clearInterval(timers.files);

      if (callback_back) {
        callback_back();
      } else {
        Controller.toggle('content');
      }

      callback_back = false;
      SERVER = {};
    }

    var Torrent = {
      start: start$3,
      open: open$2,
      opened: opened,
      back: back$4
    };

    function component$7(object) {
      var network = new create$p();
      var scroll = new create$o({
        mask: true,
        over: true
      });
      var files = new create$8(object);
      var filter = new create$6(object);
      var results = [];
      var filtred = [];
      var total_pages = 1;
      var count = 0;
      var last;
      var last_filter;
      var filter_items = {
        quality: [Lang.translate('torrent_parser_any_one'), '4k', '1080p', '720p'],
        hdr: [Lang.translate('torrent_parser_no_choice'), Lang.translate('torrent_parser_yes'), Lang.translate('torrent_parser_no')],
        sub: [Lang.translate('torrent_parser_no_choice'), Lang.translate('torrent_parser_yes'), Lang.translate('torrent_parser_no')],
        voice: [],
        tracker: [Lang.translate('torrent_parser_any_two')],
        year: [Lang.translate('torrent_parser_any_two')]
      };
      var filter_translate = {
        quality: Lang.translate('torrent_parser_quality'),
        hdr: 'HDR',
        sub: Lang.translate('torrent_parser_subs'),
        voice: Lang.translate('torrent_parser_voice'),
        tracker: Lang.translate('torrent_parser_tracker'),
        year: Lang.translate('torrent_parser_year'),
        season: Lang.translate('torrent_parser_season')
      };
      var filter_multiple = ['quality', 'voice', 'tracker', 'season'];
      var sort_translate = {
        Seeders: Lang.translate('torrent_parser_sort_by_seeders'),
        Size: Lang.translate('torrent_parser_sort_by_size'),
        Title: Lang.translate('torrent_parser_sort_by_name'),
        Tracker: Lang.translate('torrent_parser_sort_by_tracker'),
        PublisTime: Lang.translate('torrent_parser_sort_by_date'),
        viewed: Lang.translate('torrent_parser_sort_by_viewed')
      };
      var i = 20,
          y = new Date().getFullYear();

      while (i--) {
        filter_items.year.push(y - (19 - i) + '');
      }

      var viewed = Storage.cache('torrents_view', 5000, []);
      var finded_seasons = [];
      var finded_seasons_full = [];
      var voices = ["Laci", "Kerob", "LE-Production", "Parovoz Production", "Paradox", "Omskbird", "LostFilm", "Причудики", "BaibaKo", "NewStudio", "AlexFilm", "FocusStudio", "Gears Media", "Jaskier", "ViruseProject", "Кубик в Кубе", "IdeaFilm", "Sunshine Studio", "Ozz.tv", "Hamster Studio", "Сербин", "To4ka", "Кравец", "Victory-Films", "SNK-TV", "GladiolusTV", "Jetvis Studio", "ApofysTeam", "ColdFilm", "Agatha Studdio", "KinoView", "Jimmy J.", "Shadow Dub Project", "Amedia", "Red Media", "Selena International", "Гоблин", "Universal Russia", "Kiitos", "Paramount Comedy", "Кураж-Бамбей", "Студия Пиратского Дубляжа", "Чадов", "Карповский", "RecentFilms", "Первый канал", "Alternative Production", "NEON Studio", "Колобок", "Дольский", "Синема УС", "Гаврилов", "Живов", "SDI Media", "Алексеев", "GreenРай Studio", "Михалев", "Есарев", "Визгунов", "Либергал", "Кузнецов", "Санаев", "ДТВ", "Дохалов", "Sunshine Studio", "Горчаков", "LevshaFilm", "CasStudio", "Володарский", "ColdFilm", "Шварко", "Карцев", "ETV+", "ВГТРК", "Gravi-TV", "1001cinema", "Zone Vision Studio", "Хихикающий доктор", "Murzilka", "turok1990", "FOX", "STEPonee", "Elrom", "Колобок", "HighHopes", "SoftBox", "GreenРай Studio", "NovaFilm", "Четыре в квадрате", "Greb&Creative", "MUZOBOZ", "ZM-Show", "RecentFilms", "Kerems13", "Hamster Studio", "New Dream Media", "Игмар", "Котов", "DeadLine Studio", "Jetvis Studio", "РенТВ", "Андрей Питерский", "Fox Life", "Рыбин", "Trdlo.studio", "Studio Victory Аsia", "Ozeon", "НТВ", "CP Digital", "AniLibria", "STEPonee", "Levelin", "FanStudio", "Cmert", "Интерфильм", "SunshineStudio", "Kulzvuk Studio", "Кашкин", "Вартан Дохалов", "Немахов", "Sedorelli", "СТС", "Яроцкий", "ICG", "ТВЦ", "Штейн", "AzOnFilm", "SorzTeam", "Гаевский", "Мудров", "Воробьев Сергей", "Студия Райдо", "DeeAFilm Studio", "zamez", "ViruseProject", "Иванов", "STEPonee", "РенТВ", "СВ-Дубль", "BadBajo", "Комедия ТВ", "Мастер Тэйп", "5-й канал СПб", "SDI Media", "Гланц", "Ох! Студия", "СВ-Кадр", "2x2", "Котова", "Позитив", "RusFilm", "Назаров", "XDUB Dorama", "Реальный перевод", "Kansai", "Sound-Group", "Николай Дроздов", "ZEE TV", "Ozz.tv", "MTV", "Сыендук", "GoldTeam", "Белов", "Dream Records", "Яковлев", "Vano", "SilverSnow", "Lord32x", "Filiza Studio", "Sony Sci-Fi", "Flux-Team", "NewStation", "XDUB Dorama", "Hamster Studio", "Dream Records", "DexterTV", "ColdFilm", "Good People", "RusFilm", "Levelin", "AniDUB", "SHIZA Project", "AniLibria.TV", "StudioBand", "AniMedia", "Kansai", "Onibaku", "JWA Project", "MC Entertainment", "Oni", "Jade", "Ancord", "ANIvoice", "Nika Lenina", "Bars MacAdams", "JAM", "Anika", "Berial", "Kobayashi", "Cuba77", "RiZZ_fisher", "OSLIKt", "Lupin", "Ryc99", "Nazel & Freya", "Trina_D", "JeFerSon", "Vulpes Vulpes", "Hamster", "KinoGolos", "Fox Crime", "Денис Шадинский", "AniFilm", "Rain Death", "LostFilm", "New Records", "Ancord", "Первый ТВЧ", "RG.Paravozik", "Profix Media", "Tycoon", "RealFake", "HDrezka", "Jimmy J.", "AlexFilm", "Discovery", "Viasat History", "AniMedia", "JAM", "HiWayGrope", "Ancord", "СВ-Дубль", "Tycoon", "SHIZA Project", "GREEN TEA", "STEPonee", "AlphaProject", "AnimeReactor", "Animegroup", "Shachiburi", "Persona99", "3df voice", "CactusTeam", "AniMaunt", "AniMedia", "AnimeReactor", "ShinkaDan", "Jaskier", "ShowJet", "RAIM", "RusFilm", "Victory-Films", "АрхиТеатр", "Project Web Mania", "ko136", "КураСгречей", "AMS", "СВ-Студия", "Храм Дорам ТВ", "TurkStar", "Медведев", "Рябов", "BukeDub", "FilmGate", "FilmsClub", "Sony Turbo", "ТВЦ", "AXN Sci-Fi", "NovaFilm", "DIVA Universal", "Курдов", "Неоклассика", "fiendover", "SomeWax", "Логинофф", "Cartoon Network", "Sony Turbo", "Loginoff", "CrezaStudio", "Воротилин", "LakeFilms", "Andy", "CP Digital", "XDUB Dorama + Колобок", "SDI Media", "KosharaSerials", "Екатеринбург Арт", "Julia Prosenuk", "АРК-ТВ Studio", "Т.О Друзей", "Anifilm", "Animedub", "AlphaProject", "Paramount Channel", "Кириллица", "AniPLague", "Видеосервис", "JoyStudio", "HighHopes", "TVShows", "AniFilm", "GostFilm", "West Video", "Формат AB", "Film Prestige", "West Video", "Екатеринбург Арт", "SovetRomantica", "РуФилмс", "AveBrasil", "Greb&Creative", "BTI Studios", "Пифагор", "Eurochannel", "NewStudio", "Кармен Видео", "Кошкин", "Кравец", "Rainbow World", "Воротилин", "Варус-Видео", "ClubFATE", "HiWay Grope", "Banyan Studio", "Mallorn Studio", "Asian Miracle Group", "Эй Би Видео", "AniStar", "Korean Craze", "LakeFilms", "Невафильм", "Hallmark", "Netflix", "Mallorn Studio", "Sony Channel", "East Dream", "Bonsai Studio", "Lucky Production", "Octopus", "TUMBLER Studio", "CrazyCatStudio", "Amber", "Train Studio", "Анастасия Гайдаржи", "Мадлен Дюваль", "Fox Life", "Sound Film", "Cowabunga Studio", "Фильмэкспорт", "VO-Production", "Sound Film", "Nickelodeon", "MixFilm", "GreenРай Studio", "Sound-Group", "Back Board Cinema", "Кирилл Сагач", "Bonsai Studio", "Stevie", "OnisFilms", "MaxMeister", "Syfy Universal", "TUMBLER Studio", "NewStation", "Neo-Sound", "Муравский", "IdeaFilm", "Рутилов", "Тимофеев", "Лагута", "Дьяконов", "Zone Vision Studio", "Onibaku", "AniMaunt", "Voice Project", "AniStar", "Пифагор", "VoicePower", "StudioFilms", "Elysium", "AniStar", "BeniAffet", "Selena International", "Paul Bunyan", "CoralMedia", "Кондор", "Игмар", "ViP Premiere", "FireDub", "AveTurk", "Sony Sci-Fi", "Янкелевич", "Киреев", "Багичев", "2x2", "Лексикон", "Нота", "Arisu", "Superbit", "AveDorama", "VideoBIZ", "Киномания", "DDV", "Alternative Production", "WestFilm", "Анастасия Гайдаржи + Андрей Юрченко", "Киномания", "Agatha Studdio", "GreenРай Studio", "VSI Moscow", "Horizon Studio", "Flarrow Films", "Amazing Dubbing", "Asian Miracle Group", "Видеопродакшн", "VGM Studio", "FocusX", "CBS Drama", "NovaFilm", "Novamedia", "East Dream", "Дасевич", "Анатолий Гусев", "Twister", "Морозов", "NewComers", "kubik&ko", "DeMon", "Анатолий Ашмарин", "Inter Video", "Пронин", "AMC", "Велес", "Volume-6 Studio", "Хоррор Мэйкер", "Ghostface", "Sephiroth", "Акира", "Деваль Видео", "RussianGuy27", "neko64", "Shaman", "Franek Monk", "Ворон", "Andre1288", "Selena International", "GalVid", "Другое кино", "Студия NLS", "Sam2007", "HaseRiLLoPaW", "Севастьянов", "D.I.M.", "Марченко", "Журавлев", "Н-Кино", "Lazer Video", "SesDizi", "Red Media", "Рудой", "Товбин", "Сергей Дидок", "Хуан Рохас", "binjak", "Карусель", "Lizard Cinema", "Варус-Видео", "Акцент", "RG.Paravozik", "Max Nabokov", "Barin101", "Васька Куролесов", "Фортуна-Фильм", "Amalgama", "AnyFilm", "Студия Райдо", "Козлов", "Zoomvision Studio", "Пифагор", "Urasiko", "VIP Serial HD", "НСТ", "Кинолюкс", "Project Web Mania", "Завгородний", "AB-Video", "Twister", "Universal Channel", "Wakanim", "SnowRecords", "С.Р.И", "Старый Бильбо", "Ozz.tv", "Mystery Film", "РенТВ", "Латышев", "Ващенко", "Лайко", "Сонотек", "Psychotronic", "DIVA Universal", "Gremlin Creative Studio", "Нева-1", "Максим Жолобов", "Good People", "Мобильное телевидение", "Lazer Video", "IVI", "DoubleRec", "Milvus", "RedDiamond Studio", "Astana TV", "Никитин", "КТК", "D2Lab", "НСТ", "DoubleRec", "Black Street Records", "Останкино", "TatamiFilm", "Видеобаза", "Crunchyroll", "Novamedia", "RedRussian1337", "КонтентикOFF", "Creative Sound", "HelloMickey Production", "Пирамида", "CLS Media", "Сонькин", "Мастер Тэйп", "Garsu Pasaulis", "DDV", "IdeaFilm", "Gold Cinema", "Че!", "Нарышкин", "Intra Communications", "OnisFilms", "XDUB Dorama", "Кипарис", "Королёв", "visanti-vasaer", "Готлиб", "Paramount Channel", "СТС", "диктор CDV", "Pazl Voice", "Прямостанов", "Zerzia", "НТВ", "MGM", "Дьяков", "Вольга", "АРК-ТВ Studio", "Дубровин", "МИР", "Netflix", "Jetix", "Кипарис", "RUSCICO", "Seoul Bay", "Филонов", "Махонько", "Строев", "Саня Белый", "Говинда Рага", "Ошурков", "Horror Maker", "Хлопушка", "Хрусталев", "Антонов Николай", "Золотухин", "АрхиАзия", "Попов", "Ultradox", "Мост-Видео", "Альтера Парс", "Огородников", "Твин", "Хабар", "AimaksaLTV", "ТНТ", "FDV", "3df voice", "The Kitchen Russia", "Ульпаней Эльром", "Видеоимпульс", "GoodTime Media", "Alezan", "True Dubbing Studio", "FDV", "Карусель", "Интер", "Contentica", "Мельница", "RealFake", "ИДДК", "Инфо-фильм", "Мьюзик-трейд", "Кирдин | Stalk", "ДиоНиК", "Стасюк", "TV1000", "Hallmark", "Тоникс Медиа", "Бессонов", "Gears Media", "Бахурани", "NewDub", "Cinema Prestige", "Набиев", "New Dream Media", "ТВ3", "Малиновский Сергей", "Superbit", "Кенс Матвей", "LE-Production", "Voiz", "Светла", "Cinema Prestige", "JAM", "LDV", "Videogram", "Индия ТВ", "RedDiamond Studio", "Герусов", "Элегия фильм", "Nastia", "Семыкина Юлия", "Электричка", "Штамп Дмитрий", "Пятница", "Oneinchnales", "Gravi-TV", "D2Lab", "Кинопремьера", "Бусов Глеб", "LE-Production", "1001cinema", "Amazing Dubbing", "Emslie", "1+1", "100 ТВ", "1001 cinema", "2+2", "2х2", "3df voice", "4u2ges", "5 канал", "A. Lazarchuk", "AAA-Sound", "AB-Video", "AdiSound", "ALEKS KV", "AlexFilm", "AlphaProject", "Alternative Production", "Amalgam", "AMC", "Amedia", "AMS", "Andy", "AniLibria", "AniMedia", "Animegroup", "Animereactor", "AnimeSpace Team", "Anistar", "AniUA", "AniWayt", "Anything-group", "AOS", "Arasi project", "ARRU Workshop", "AuraFilm", "AvePremier", "AveTurk", "AXN Sci-Fi", "Azazel", "AzOnFilm", "BadBajo", "BadCatStudio", "BBC Saint-Petersburg", "BD CEE", "Black Street Records", "Bonsai Studio", "Boльгa", "Brain Production", "BraveSound", "BTI Studios", "Bubble Dubbing Company", "Byako Records", "Cactus Team", "Cartoon Network", "CBS Drama", "CDV", "Cinema Prestige", "CinemaSET GROUP", "CinemaTone", "ColdFilm", "Contentica", "CP Digital", "CPIG", "Crunchyroll", "Cuba77", "D1", "D2lab", "datynet", "DDV", "DeadLine", "DeadSno", "DeMon", "den904", "Description", "DexterTV", "Dice", "Discovery", "DniproFilm", "DoubleRec", "DreamRecords", "DVD Classic", "East Dream", "Eladiel", "Elegia", "ELEKTRI4KA", "Elrom", "ELYSIUM", "Epic Team", "eraserhead", "erogg", "Eurochannel", "Extrabit", "F-TRAIN", "Family Fan Edition", "FDV", "FiliZa Studio", "Film Prestige", "FilmGate", "FilmsClub", "FireDub", "Flarrow Films", "Flux-Team", "FocusStudio", "FOX", "Fox Crime", "Fox Russia", "FoxLife", "Foxlight", "Franek Monk", "Gala Voices", "Garsu Pasaulis", "Gears Media", "Gemini", "General Film", "GetSmart", "Gezell Studio", "Gits", "GladiolusTV", "GoldTeam", "Good People", "Goodtime Media", "GoodVideo", "GostFilm", "Gramalant", "Gravi-TV", "GREEN TEA", "GreenРай Studio", "Gremlin Creative Studio", "Hallmark", "HamsterStudio", "HiWay Grope", "Horizon Studio", "hungry_inri", "ICG", "ICTV", "IdeaFilm", "IgVin &amp; Solncekleshka", "ImageArt", "INTERFILM", "Ivnet Cinema", "IНТЕР", "Jakob Bellmann", "JAM", "Janetta", "Jaskier", "JeFerSon", "jept", "JetiX", "Jetvis", "JimmyJ", "KANSAI", "KIHO", "kiitos", "KinoGolos", "Kinomania", "KosharaSerials", "Kолобок", "L0cDoG", "LakeFilms", "LDV", "LE-Production", "LeDoyen", "LevshaFilm", "LeXiKC", "Liga HQ", "Line", "Lisitz", "Lizard Cinema Trade", "Lord32x", "lord666", "LostFilm", "Lucky Production", "Macross", "madrid", "Mallorn Studio", "Marclail", "Max Nabokov", "MC Entertainment", "MCA", "McElroy", "Mega-Anime", "Melodic Voice Studio", "metalrus", "MGM", "MifSnaiper", "Mikail", "Milirina", "MiraiDub", "MOYGOLOS", "MrRose", "MTV", "Murzilka", "MUZOBOZ", "National Geographic", "NemFilm", "Neoclassica", "NEON Studio", "New Dream Media", "NewComers", "NewStation", "NewStudio", "Nice-Media", "Nickelodeon", "No-Future", "NovaFilm", "Novamedia", "Octopus", "Oghra-Brown", "OMSKBIRD", "Onibaku", "OnisFilms", "OpenDub", "OSLIKt", "Ozz TV", "PaDet", "Paramount Comedy", "Paramount Pictures", "Parovoz Production", "PashaUp", "Paul Bunyan", "Pazl Voice", "PCB Translate", "Persona99", "PiratVoice", "Postmodern", "Profix Media", "Project Web Mania", "Prolix", "QTV", "R5", "Radamant", "RainDeath", "RATTLEBOX", "RealFake", "Reanimedia", "Rebel Voice", "RecentFilms", "Red Media", "RedDiamond Studio", "RedDog", "RedRussian1337", "Renegade Team", "RG Paravozik", "RinGo", "RoxMarty", "Rumble", "RUSCICO", "RusFilm", "RussianGuy27", "Saint Sound", "SakuraNight", "Satkur", "Sawyer888", "Sci-Fi Russia", "SDI Media", "Selena", "seqw0", "SesDizi", "SGEV", "Shachiburi", "SHIZA", "ShowJet", "Sky Voices", "SkyeFilmTV", "SmallFilm", "SmallFilm", "SNK-TV", "SnowRecords", "SOFTBOX", "SOLDLUCK2", "Solod", "SomeWax", "Sony Channel", "Sony Turbo", "Sound Film", "SpaceDust", "ssvss", "st.Elrom", "STEPonee", "SunshineStudio", "Superbit", "Suzaku", "sweet couple", "TatamiFilm", "TB5", "TF-AniGroup", "The Kitchen Russia", "The Mike Rec.", "Timecraft", "To4kaTV", "Tori", "Total DVD", "TrainStudio", "Troy", "True Dubbing Studio", "TUMBLER Studio", "turok1990", "TV 1000", "TVShows", "Twister", "Twix", "Tycoon", "Ultradox", "Universal Russia", "VashMax2", "VendettA", "VHS", "VicTeam", "VictoryFilms", "Video-BIZ", "Videogram", "ViruseProject", "visanti-vasaer", "VIZ Media", "VO-production", "Voice Project Studio", "VoicePower", "VSI Moscow", "VulpesVulpes", "Wakanim", "Wayland team", "WestFilm", "WiaDUB", "WVoice", "XL Media", "XvidClub Studio", "zamez", "ZEE TV", "Zendos", "ZM-SHOW", "Zone Studio", "Zone Vision", "Агапов", "Акопян", "Алексеев", "Артемьев", "Багичев", "Бессонов", "Васильев", "Васильцев", "Гаврилов", "Герусов", "Готлиб", "Григорьев", "Дасевич", "Дольский", "Карповский", "Кашкин", "Киреев", "Клюквин", "Костюкевич", "Матвеев", "Михалев", "Мишин", "Мудров", "Пронин", "Савченко", "Смирнов", "Тимофеев", "Толстобров", "Чуев", "Шуваев", "Яковлев", "ААА-sound", "АБыГДе", "Акалит", "Акира", "Альянс", "Амальгама", "АМС", "АнВад", "Анубис", "Anubis", "Арк-ТВ", "АРК-ТВ Studio", "Б. Федоров", "Бибиков", "Бигыч", "Бойков", "Абдулов", "Белов", "Вихров", "Воронцов", "Горчаков", "Данилов", "Дохалов", "Котов", "Кошкин", "Назаров", "Попов", "Рукин", "Рутилов", "Варус Видео", "Васька Куролесов", "Ващенко С.", "Векшин", "Велес", "Весельчак", "Видеоимпульс", "Витя «говорун»", "Войсовер", "Вольга", "Ворон", "Воротилин", "Г. Либергал", "Г. Румянцев", "Гей Кино Гид", "ГКГ", "Глуховский", "Гризли", "Гундос", "Деньщиков", "Есарев", "Нурмухаметов", "Пучков", "Стасюк", "Шадинский", "Штамп", "sf@irat", "Держиморда", "Домашний", "ДТВ", "Дьяконов", "Е. Гаевский", "Е. Гранкин", "Е. Лурье", "Е. Рудой", "Е. Хрусталёв", "ЕА Синема", "Екатеринбург Арт", "Живаго", "Жучков", "З Ранку До Ночі", "Завгородний", "Зебуро", "Зереницын", "И. Еремеев", "И. Клушин", "И. Сафронов", "И. Степанов", "ИГМ", "Игмар", "ИДДК", "Имидж-Арт", "Инис", "Ирэн", "Ист-Вест", "К. Поздняков", "К. Филонов", "К9", "Карапетян", "Кармен Видео", "Карусель", "Квадрат Малевича", "Килька", "Кипарис", "Королев", "Котова", "Кравец", "Кубик в Кубе", "Кураж-Бамбей", "Л. Володарский", "Лазер Видео", "ЛанселаП", "Лапшин", "Лексикон", "Ленфильм", "Леша Прапорщик", "Лизард", "Люсьена", "Заугаров", "Иванов", "Иванова и П. Пашут", "Латышев", "Ошурков", "Чадов", "Яроцкий", "Максим Логинофф", "Малиновский", "Марченко", "Мастер Тэйп", "Махонько", "Машинский", "Медиа-Комплекс", "Мельница", "Мика Бондарик", "Миняев", "Мительман", "Мост Видео", "Мосфильм", "Муравский", "Мьюзик-трейд", "Н-Кино", "Н. Антонов", "Н. Дроздов", "Н. Золотухин", "Н.Севастьянов seva1988", "Набиев", "Наталья Гурзо", "НЕВА 1", "Невафильм", "НеЗупиняйПродакшн", "Неоклассика", "Несмертельное оружие", "НЛО-TV", "Новий", "Новый диск", "Новый Дубляж", "Новый Канал", "Нота", "НСТ", "НТВ", "НТН", "Оверлорд", "Огородников", "Омикрон", "Гланц", "Карцев", "Морозов", "Прямостанов", "Санаев", "Парадиз", "Пепелац", "Первый канал ОРТ", "Переводман", "Перец", "Петербургский дубляж", "Петербуржец", "Пирамида", "Пифагор", "Позитив-Мультимедиа", "Прайд Продакшн", "Премьер Видео", "Премьер Мультимедиа", "Причудики", "Р. Янкелевич", "Райдо", "Ракурс", "РенТВ", "Россия", "РТР", "Русский дубляж", "Русский Репортаж", "РуФилмс", "Рыжий пес", "С. Визгунов", "С. Дьяков", "С. Казаков", "С. Кузнецов", "С. Кузьмичёв", "С. Лебедев", "С. Макашов", "С. Рябов", "С. Щегольков", "С.Р.И.", "Сolumbia Service", "Самарский", "СВ Студия", "СВ-Дубль", "Светла", "Селена Интернешнл", "Синема Трейд", "Синема УС", "Синта Рурони", "Синхрон", "Советский", "Сокуров", "Солодухин", "Сонотек", "Сонькин", "Союз Видео", "Союзмультфильм", "СПД - Сладкая парочка", "Строев", "СТС", "Студии Суверенного Лепрозория", "Студия «Стартрек»", "KOleso", "Студия Горького", "Студия Колобок", "Студия Пиратского Дубляжа", "Студия Райдо", "Студия Трёх", "Гуртом", "Супербит", "Сыендук", "Так Треба Продакшн", "ТВ XXI век", "ТВ СПб", "ТВ-3", "ТВ6", "ТВИН", "ТВЦ", "ТВЧ 1", "ТНТ", "ТО Друзей", "Толмачев", "Точка Zрения", "Трамвай-фильм", "ТРК", "Уолт Дисней Компани", "Хихидок", "Хлопушка", "Цікава Ідея", "Четыре в квадрате", "Швецов", "Штамп", "Штейн", "Ю. Живов", "Ю. Немахов", "Ю. Сербин", "Ю. Товбин", "Я. Беллманн"];
      scroll.minus();
      scroll.body().addClass('torrent-list');

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Background.immediately(Utils.cardImgBackground(object.movie));
        Parser.get(object, function (data) {
          results = data;

          _this.build();

          _this.activity.loader(false);

          _this.activity.toggle();
        }, function (text) {
          _this.empty('Ответ: ' + text);
        });

        filter.onSearch = function (value) {
          Activity$1.replace({
            search: value,
            clarification: true
          });
        };

        filter.onBack = function () {
          _this.start();
        };

        filter.render().find('.selector').on('hover:focus', function (e) {
          last_filter = e.target;
        });
        return this.render();
      };

      this.empty = function (descr) {
        var empty = new create$g({
          descr: descr
        });
        files.append(empty.render(filter.empty()));
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.listEmpty = function () {
        scroll.append(Template.get('list_empty'));
      };

      this.buildSorted = function () {
        var need = Storage.get('torrents_sort', 'Seeders');
        var select = [{
          title: Lang.translate('torrent_parser_sort_by_seeders'),
          sort: 'Seeders'
        }, {
          title: Lang.translate('torrent_parser_sort_by_size'),
          sort: 'Size'
        }, {
          title: Lang.translate('torrent_parser_sort_by_name'),
          sort: 'Title'
        }, {
          title: Lang.translate('torrent_parser_sort_by_tracker'),
          sort: 'Tracker'
        }, {
          title: Lang.translate('torrent_parser_sort_by_date'),
          sort: 'PublisTime'
        }, {
          title: Lang.translate('torrent_parser_sort_by_viewed'),
          sort: 'viewed'
        }];
        select.forEach(function (element) {
          if (element.sort == need) element.selected = true;
        });
        filter.sort(results.Results, need);
        this.sortWithPopular();
        filter.set('sort', select);
        this.selectedSort();
      };

      this.sortWithPopular = function () {
        var popular = [];
        var other = [];
        results.Results.forEach(function (a) {
          if (a.viewing_request) popular.push(a);else other.push(a);
        });
        popular.sort(function (a, b) {
          return b.viewing_average - a.viewing_average;
        });
        results.Results = popular.concat(other);
      };

      this.buildFilterd = function () {
        var need = Storage.get('torrents_filter', '{}');
        var select = [];

        var add = function add(type, title) {
          var items = filter_items[type];
          var subitems = [];
          var multiple = filter_multiple.indexOf(type) >= 0;
          var value = need[type];
          if (multiple) value = Arrays.toArray(value);
          items.forEach(function (name, i) {
            subitems.push({
              title: name,
              selected: multiple ? i == 0 : value == i,
              checked: multiple && value.indexOf(name) >= 0,
              checkbox: multiple && i > 0,
              index: i
            });
          });
          select.push({
            title: title,
            subtitle: multiple ? value.length ? value.join(', ') : items[0] : typeof value == 'undefined' ? items[0] : items[value],
            items: subitems,
            stype: type
          });
        };

        filter_items.voice = [Lang.translate('torrent_parser_any_two'), Lang.translate('torrent_parser_voice_dubbing'), Lang.translate('torrent_parser_voice_polyphonic'), Lang.translate('torrent_parser_voice_two'), Lang.translate('torrent_parser_voice_amateur')];
        filter_items.tracker = [Lang.translate('torrent_parser_any_two')];
        filter_items.season = [Lang.translate('torrent_parser_any_two')];
        results.Results.forEach(function (element) {
          var title = element.Title.toLowerCase(),
              tracker = element.Tracker;

          for (var _i = 0; _i < voices.length; _i++) {
            var voice = voices[_i].toLowerCase();

            if (title.indexOf(voice) >= 0) {
              if (filter_items.voice.indexOf(voices[_i]) == -1) filter_items.voice.push(voices[_i]);
            }
          }

          if (filter_items.tracker.indexOf(tracker) === -1) filter_items.tracker.push(tracker);
          var season = title.match(/.?s\[(\d+)-\].?|.?s(\d+).?|.?\((\d+) сезон.?|.?season (\d+),.?/);

          if (season) {
            season = season.filter(function (c) {
              return c;
            });

            if (season.length > 1) {
              var orig = season[1];
              var number = parseInt(orig) + '';

              if (number && finded_seasons.indexOf(number) == -1) {
                finded_seasons.push(number);
                finded_seasons_full.push(orig);
              }
            }
          }
        });
        finded_seasons_full.sort(function (a, b) {
          var ac = parseInt(a);
          var bc = parseInt(b);
          if (ac > bc) return 1;else if (ac < bc) return -1;else return 0;
        });
        finded_seasons.sort(function (a, b) {
          var ac = parseInt(a);
          var bc = parseInt(b);
          if (ac > bc) return 1;else if (ac < bc) return -1;else return 0;
        });
        if (finded_seasons.length) filter_items.season = filter_items.season.concat(finded_seasons); //надо очистить от отсутствующих ключей

        need.voice = Arrays.removeNoIncludes(Arrays.toArray(need.voice), filter_items.voice);
        need.tracker = Arrays.removeNoIncludes(Arrays.toArray(need.tracker), filter_items.tracker);
        need.season = Arrays.removeNoIncludes(Arrays.toArray(need.season), filter_items.season);
        Storage.set('torrents_filter', need);
        select.push({
          title: Lang.translate('torrent_parser_reset'),
          reset: true
        });
        add('quality', Lang.translate('torrent_parser_quality'));
        add('hdr', 'HDR');
        add('sub', Lang.translate('torrent_parser_subs'));
        add('voice', Lang.translate('torrent_parser_voice'));
        add('season', Lang.translate('torrent_parser_season'));
        add('tracker', Lang.translate('torrent_parser_tracker'));
        add('year', Lang.translate('torrent_parser_year'));
        filter.set('filter', select);
        this.selectedFilter();
      };

      this.selectedFilter = function () {
        var need = Storage.get('torrents_filter', '{}'),
            select = [];

        for (var _i2 in need) {
          if (need[_i2]) {
            if (Arrays.isArray(need[_i2])) {
              if (need[_i2].length) select.push(filter_translate[_i2] + ':' + need[_i2].join(', '));
            } else {
              select.push(filter_translate[_i2] + ': ' + filter_items[_i2][need[_i2]]);
            }
          }
        }

        filter.chosen('filter', select);
      };

      this.selectedSort = function () {
        var select = Storage.get('torrents_sort', 'Seeders');
        filter.chosen('sort', [sort_translate[select]]);
      };

      this.build = function () {
        var _this2 = this;

        this.buildSorted();
        this.buildFilterd();
        this.filtred();

        filter.onSelect = function (type, a, b) {
          if (type == 'sort') {
            Storage.set('torrents_sort', a.sort);
            filter.sort(results.Results, a.sort);

            _this2.sortWithPopular();
          } else {
            if (a.reset) {
              Storage.set('torrents_filter', '{}');

              _this2.buildFilterd();
            } else {
              var filter_data = Storage.get('torrents_filter', '{}');
              filter_data[a.stype] = filter_multiple.indexOf(a.stype) >= 0 ? [] : b.index;
              a.subtitle = b.title;
              Storage.set('torrents_filter', filter_data);
            }
          }

          _this2.applyFilter();

          _this2.start();
        };

        filter.onCheck = function (type, a, b) {
          var data = Storage.get('torrents_filter', '{}'),
              need = Arrays.toArray(data[a.stype]);
          if (b.checked && need.indexOf(b.title)) need.push(b.title);else if (!b.checked) Arrays.remove(need, b.title);
          data[a.stype] = need;
          Storage.set('torrents_filter', data);
          a.subtitle = need.join(', ');

          _this2.applyFilter();
        };

        if (results.Results.length) this.showResults();else {
          this.empty(Lang.translate('torrent_parser_empty'));
        }
      };

      this.applyFilter = function () {
        this.filtred();
        this.selectedFilter();
        this.selectedSort();
        this.reset();
        this.showResults();
        last = scroll.render().find('.torrent-item:eq(0)')[0];
      };

      this.filtred = function () {
        var filter_data = Storage.get('torrents_filter', '{}');
        var filter_any = false;

        for (var _i3 in filter_data) {
          var filr = filter_data[_i3];

          if (filr) {
            if (Arrays.isArray(filr)) {
              if (filr.length) filter_any = true;
            } else filter_any = true;
          }
        }

        filtred = results.Results.filter(function (element) {
          if (filter_any) {
            var passed = false,
                nopass = false,
                title = element.Title.toLowerCase(),
                tracker = element.Tracker;
            var qua = Arrays.toArray(filter_data.quality),
                hdr = filter_data.hdr,
                sub = filter_data.sub,
                voi = Arrays.toArray(filter_data.voice),
                tra = Arrays.toArray(filter_data.tracker),
                ses = Arrays.toArray(filter_data.season),
                yer = filter_data.year;

            var test = function test(search, test_index) {
              var regex = new RegExp(search);
              return test_index ? title.indexOf(search) >= 0 : regex.test(title);
            };

            var check = function check(search, invert) {
              if (test(search)) {
                if (invert) nopass = true;else passed = true;
              } else {
                if (invert) passed = true;else nopass = true;
              }
            };

            var includes = function includes(type, arr) {
              if (!arr.length) return;
              var any = false;
              arr.forEach(function (a) {
                if (type == 'quality') {
                  if (a == '4k' && test('(4k|uhd)[ |\\]|,|$]|2160[pр]|ultrahd')) any = true;
                  if (a == '1080p' && test('fullhd|1080[pр]')) any = true;
                  if (a == '720p' && test('720[pр]')) any = true;
                }

                if (type == 'voice') {
                  var p = filter_items.voice.indexOf(a);

                  if (p == 1) {
                    if (test('дублирован|дубляж|  apple| dub| d[,| |$]|[,|\\s]дб[,|\\s|$]')) any = true;
                  } else if (p == 2) {
                    if (test('многоголос| p[,| |$]|[,|\\s](лм|пм)[,|\\s|$]')) any = true;
                  } else if (p == 3) {
                    if (test('двухголос|двуголос| l2[,| |$]|[,|\\s](лд|пд)[,|\\s|$]')) any = true;
                  } else if (p == 4) {
                    if (test('любитель|авторский| l1[,| |$]|[,|\\s](ло|ап)[,|\\s|$]')) any = true;
                  } else if (test(a.toLowerCase(), true)) any = true;
                }

                if (type == 'tracker') {
                  if (tracker.toLowerCase() == a.toLowerCase()) any = true;
                }

                if (type == 'season') {
                  var pad = function pad(n) {
                    return n < 10 && n != '01' ? '0' + n : n;
                  };

                  var _i4 = finded_seasons.indexOf(a);

                  var f = finded_seasons_full[_i4];
                  var SES1 = title.match(/\[s(\d+)-(\d+)\]/);
                  var SES2 = title.match(/season (\d+)-(\d+)/);
                  var SES3 = title.match(/season (\d+) - (\d+).?/);
                  var SES4 = title.match(/сезон: (\d+)-(\d+) \/.?/);
                  if (Array.isArray(SES1) && (f >= SES1[1] && f <= SES1[2] || pad(f) >= SES1[1] && pad(f) <= SES1[2] || f >= pad(SES1[1]) && f <= pad(SES1[2]))) any = true;
                  if (Array.isArray(SES2) && (f >= SES2[1] && f <= SES2[2] || pad(f) >= SES2[1] && pad(f) <= SES2[2] || f >= pad(SES2[1]) && f <= pad(SES2[2]))) any = true;
                  if (Array.isArray(SES3) && (f >= SES3[1] && f <= SES3[2] || pad(f) >= SES3[1] && pad(f) <= SES3[2] || f >= pad(SES3[1]) && f <= pad(SES3[2]))) any = true;
                  if (Array.isArray(SES4) && (f >= SES4[1] && f <= SES4[2] || pad(f) >= SES4[1] && pad(f) <= SES4[2] || f >= pad(SES4[1]) && f <= pad(SES4[2]))) any = true;
                  if (test('.?\\[0' + f + 'x0.?|.?\\[s' + f + '-.?|.?-' + f + '\\].?|.?\\[s0' + f + '\\].?|.?\\[s' + f + '\\].?|.?s' + f + 'e.?|.?s' + f + '-.?|.?сезон: ' + f + ' .?|.?сезон:' + f + '.?|сезон ' + f + ',.?|\\[' + f + ' сезон.?|.?\\(' + f + ' сезон.?|.?season ' + f + '.?')) any = true;
                }
              });
              if (any) passed = true;else nopass = true;
            };

            includes('quality', qua);
            includes('voice', voi);
            includes('tracker', tra);
            includes('season', ses);

            if (hdr) {
              if (hdr == 1) check('[\\[| ]hdr[10| |\\]|,|$]');else check('[\\[| ]hdr[10| |\\]|,|$]', true);
            }

            if (sub) {
              if (sub == 1) check(' sub|[,|\\s]ст[,|\\s|$]');else check(' sub|[,|\\s]ст[,|\\s|$]', true);
            }

            if (yer) {
              check(filter_items.year[yer]);
            }

            return nopass ? false : passed;
          } else return true;
        });
      };

      this.showResults = function () {
        total_pages = Math.ceil(filtred.length / 20);
        filter.render();
        scroll.append(filter.render());

        if (filtred.length) {
          this.append(filtred.slice(0, 20));
        } else {
          this.listEmpty();
        }

        files.append(scroll.render());
      };

      this.reset = function () {
        last = false;
        filter.render().detach();
        scroll.clear();
      };

      this.next = function () {
        if (object.page < 15 && object.page < total_pages) {
          object.page++;
          var offset = (object.page - 1) * 20;
          this.append(filtred.slice(offset, offset + 20));
          Controller.enable('content');
        }
      };

      this.loadMagnet = function (element, call) {
        var _this3 = this;

        Parser.marnet(element, function () {
          Modal.close();
          element.poster = object.movie.img;

          _this3.start();

          if (call) call();else Torrent.start(element, object.movie);
        }, function (text) {
          Modal.update(Template.get('error', {
            title: Lang.translate('title_error'),
            text: text
          }));
        });
        Modal.open({
          title: '',
          html: Template.get('modal_pending', {
            text: Lang.translate('torrent_get_magnet')
          }),
          onBack: function onBack() {
            Modal.close();
            network.clear();
            Controller.toggle('content');
          }
        });
      };

      this.mark = function (element, item, add) {
        if (add) {
          if (viewed.indexOf(element.hash) == -1) {
            viewed.push(element.hash);
            item.append('<div class="torrent-item__viewed">' + Template.get('icon_star', {}, true) + '</div>');
          }
        } else {
          element.viewed = true;
          Arrays.remove(viewed, element.hash);
          item.find('.torrent-item__viewed').remove();
        }

        element.viewed = add;
        Storage.set('torrents_view', viewed);
      };

      this.addToBase = function (element) {
        Torserver.add({
          poster: object.movie.img,
          title: object.movie.title + ' / ' + object.movie.original_title,
          link: element.MagnetUri || element.Link,
          data: {
            lampa: true,
            movie: object.movie
          }
        }, function () {
          Noty.show(object.movie.title + ' - ' + Lang.translate('torrent_parser_added_to_mytorrents'));
        });
      };

      this.append = function (items) {
        var _this4 = this;

        items.forEach(function (element) {
          count++;
          var date = Utils.parseTime(element.PublishDate);
          var pose = count;
          var bitrate = object.movie.runtime ? Utils.calcBitrate(element.Size, object.movie.runtime) : 0;
          Arrays.extend(element, {
            title: element.Title,
            date: date.full,
            tracker: element.Tracker,
            bitrate: bitrate,
            size: element.Size ? Utils.bytesToSize(element.Size) : element.size,
            seeds: element.Seeders,
            grabs: element.Peers
          });
          var item = Template.get('torrent', element);
          if (!bitrate) item.find('.bitrate').remove();
          if (element.viewed) item.append('<div class="torrent-item__viewed">' + Template.get('icon_star', {}, true) + '</div>');

          if (element.viewing_request) {
            item.addClass('torrent-item--popular');
            var time_min = Infinity;
            var time_max = 0;
            var time_avr = Utils.secondsToTimeHuman(element.viewing_average);
            element.viewing_times.forEach(function (m) {
              time_min = Math.min(time_min, m);
              time_max = Math.max(time_max, m);
            });
            time_min = Utils.secondsToTimeHuman(time_min);
            time_max = Utils.secondsToTimeHuman(time_max);
            var details = $("<div class=\"torrent-item__stat\">\n                    <div>\u0421\u0440\u0435\u0434\u043D\u0435\u0435: ".concat(time_avr, "</div>\n                    <div>\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435: ").concat(time_min, "</div>\n                    <div>\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435: ").concat(time_max, "</div>\n                    <div>\u0417\u0430\u043F\u0440\u043E\u0441\u043E\u0432: ").concat(element.viewing_request, "</div>\n                </div>"));
            item.append(details);
          }

          item.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
            if (pose > object.page * 20 - 4) _this4.next();
            Helper.show('torrents', Lang.translate('helper_torrents'), item);
          }).on('hover:enter', function () {
            Torrent.opened(function () {
              _this4.mark(element, item, true);
            });

            if (element.reguest && !element.MagnetUri) {
              _this4.loadMagnet(element);
            } else {
              element.poster = object.movie.img;

              _this4.start();

              Torrent.start(element, object.movie);
            }
          }).on('hover:long', function () {
            var enabled = Controller.enabled().name;
            Select.show({
              title: Lang.translate('title_action'),
              items: [{
                title: Lang.translate('torrent_parser_add_to_mytorrents'),
                tomy: true
              }, {
                title: Lang.translate('torrent_parser_label_title'),
                subtitle: Lang.translate('torrent_parser_label_descr'),
                mark: true
              }, {
                title: Lang.translate('torrent_parser_label_cancel_title'),
                subtitle: Lang.translate('torrent_parser_label_cancel_descr')
              }],
              onBack: function onBack() {
                Controller.toggle(enabled);
              },
              onSelect: function onSelect(a) {
                if (a.tomy) {
                  if (element.reguest && !element.MagnetUri) {
                    _this4.loadMagnet(element, function () {
                      _this4.addToBase(element);
                    });
                  } else _this4.addToBase(element);
                } else if (a.mark) {
                  _this4.mark(element, item, true);
                } else {
                  _this4.mark(element, item, false);
                }

                Controller.toggle(enabled);
              }
            });
          });
          scroll.append(item);
        });
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render(), files.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) {
              if (scroll.render().find('.selector').slice(3).index(last) == 0 && last_filter) {
                Controller.collectionFocus(last_filter, scroll.render());
              } else Navigator.move('up');
            } else Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            if (Navigator.canmove('right')) Navigator.move('right');else filter.render().find('.filter--filter').trigger('hover:enter');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          back: this.back
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return files.render();
      };

      this.destroy = function () {
        network.clear();
        Parser.clear();
        files.destroy();
        scroll.destroy();
        results = null;
        network = null;
      };
    }

    function component$6(object) {
      var network = new create$p();
      var scroll = new create$o({
        mask: true,
        over: true
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var last;
      var torrents = [];

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Torserver.my(this.build.bind(this), function () {
          var empty = new create$g();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.next = function () {
        if (object.page < 15 && object.page < total_pages) {
          object.page++;
          var offset = object.page - 1;
          this.append(torrents.slice(20 * offset, 20 * offset + 20));
          Controller.enable('content');
        }
      };

      this.append = function (data) {
        var _this2 = this;

        data.forEach(function (element) {
          element.title = element.title.replace('[LAMPA] ', '');
          var item_data = Arrays.decodeJson(element.data, {});
          var card = new Card(element, {
            card_category: true
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(item_data.movie ? Utils.cardImgBackground(item_data.movie) : element.poster);
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this2.next();
          };

          card.onEnter = function (target, card_data) {
            _this2.start();

            Torrent.open(card_data.hash, item_data.lampa && item_data.movie ? item_data.movie : false);
          };

          card.onMenu = function (target, card_data) {
            var enabled = Controller.enabled().name;
            Select.show({
              title: Lang.translate('title_action'),
              items: [{
                title: Lang.translate('torrent_remove_title'),
                subtitle: Lang.translate('torrent_remove_descr')
              }],
              onBack: function onBack() {
                Controller.toggle(enabled);
              },
              onSelect: function onSelect(a) {
                Torserver.remove(card_data.hash);
                Arrays.remove(items, card);
                card.destroy();
                last = false;
                Controller.toggle(enabled);
              }
            });
          };

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        torrents = data;
        total_pages = Math.ceil(torrents.length / 20);
        scroll.minus();
        this.append(torrents.slice(0, 20));
        scroll.append(body);
        html.append(scroll.render());
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        html.remove();
        body.remove();
        network = null;
        items = null;
        html = null;
        body = null;
      };
    }

    function component$5(object) {
      var network = new create$p();
      var scroll = new create$o({
        mask: true,
        over: true,
        step: 250
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var info;
      var last;
      var relises = [];

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.relise(this.build.bind(this), function () {
          var empty = new create$g();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.next = function () {
        if (object.page < 15 && object.page < total_pages) {
          object.page++;
          var offset = object.page - 1;
          this.append(relises.slice(20 * offset, 20 * offset + 20));
          Controller.enable('content');
        }
      };

      this.append = function (data) {
        var _this2 = this;

        data.forEach(function (element) {
          var card = new Card(element, {
            card_category: true,
            card_type: true
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);

            if (info) {
              info.update(card_data);
              Background.change(Utils.cardImgBackground(card_data));
              var maxrow = Math.ceil(items.length / 7) - 1;
              if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this2.next();
            }
          };

          card.onEnter = function (target, card_data) {
            if (card_data.tmdbID) {
              card_data.id = card_data.tmdbID;
              Activity$1.push({
                url: '',
                component: 'full',
                id: card_data.tmdbID,
                method: card_data.name ? 'tv' : 'movie',
                card: card_data
              });
            } else {
              Modal.open({
                title: '',
                html: Template.get('modal_loading'),
                size: 'small',
                mask: true,
                onBack: function onBack() {
                  Modal.close();
                  Api.clear();
                  Controller.toggle('content');
                }
              });
              Api.search({
                query: encodeURIComponent(card_data.original_title)
              }, function (find) {
                Modal.close();
                var finded = TMDB.find(find, card_data);

                if (finded) {
                  Activity$1.push({
                    url: '',
                    component: 'full',
                    id: finded.id,
                    method: finded.name ? 'tv' : 'movie',
                    card: finded
                  });
                } else {
                  Noty.show(Lang.translate('nofind_movie'));
                  Controller.toggle('content');
                }
              }, function () {
                Modal.close();
                Noty.show(Lang.translate('nofind_movie'));
                Controller.toggle('content');
              });
            }
          };

          card.onMenu = function () {};

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        relises = data;
        total_pages = Math.ceil(relises.length / 20);

        if (Storage.field('light_version')) {
          scroll.minus();
          html.append(scroll.render());
        } else {
          info = new create$h();
          info.create();
          info.render().find('.info__right').addClass('hide');
          scroll.minus(info.render());
          html.append(info.render());
          html.append(scroll.render());
        }

        var start = (object.page - 1) * 20;
        this.append(relises.slice(start, start + 20));
        if (total_pages > object.page && !info) this.more();
        scroll.append(body);
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.more = function () {
        var more = $('<div class="category-full__more selector"><span>' + Lang.translate('show_more') + '</span></div>');
        more.on('hover:focus', function (e) {
          Controller.collectionFocus(last || false, scroll.render());
          var next = Arrays.clone(object);
          delete next.activity;
          next.page++;
          Activity$1.push(next);
        });
        body.append(more);
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        html.remove();
        body.remove();
        if (info) info.destroy();
        network = null;
        items = null;
        html = null;
        body = null;
        info = null;
      };
    }

    function component$4(object) {
      var network = new create$p();
      var scroll = new create$o({
        mask: true,
        over: true
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var last;
      var collections = [];
      var waitload;

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.collections(object, this.build.bind(this), function () {
          var empty = new create$g();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.next = function () {
        var _this2 = this;

        if (waitload) return;

        if (object.page < 30) {
          waitload = true;
          object.page++;
          Api.collections(object, function (result) {
            _this2.append(result.results);

            if (result.results.length) waitload = false;
            Controller.enable('content');
          }, function () {});
        }
      };

      this.append = function (data) {
        var _this3 = this;

        data.forEach(function (element) {
          var card = new Card(element, {
            card_collection: true,
            object: object
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(Utils.cardImgBackground(card_data));
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
          };

          card.onEnter = function (target, card_data) {
            Activity$1.push({
              url: card_data.url,
              id: card_data.id,
              title: Lang.translate('title_collections') + ' - ' + card_data.title,
              component: 'collections_view',
              source: object.source,
              page: 1
            });
          };

          card.onMenu = function (target, card_data) {};

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        collections = data.results;
        scroll.minus();
        this.append(collections.slice(0, 20));
        scroll.append(body);
        html.append(scroll.render());
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        html.remove();
        body.remove();
        network = null;
        items = null;
        html = null;
        body = null;
      };
    }

    function component$3(object) {
      var comp = new component$c(object);

      comp.create = function () {
        Api.collections(object, this.build.bind(this), this.empty.bind(this));
      };

      return comp;
    }

    function component$2(object) {
      var html = $('<div></div>');
      var empty = new create$g();

      this.create = function () {
        html.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(empty.render());
            Controller.collectionFocus(false, empty.render());
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        html.remove();
      };
    }

    function component$1(object) {
      var _this = this;

      var scroll = new create$o({
        mask: true,
        over: true
      });
      var html = $('<div></div>');
      var body = $('<div class="timetable"></div>');
      var cards = Favorite.full().card;
      var table = TimeTable.all();
      var last;

      this.create = function () {
        if (Account.working()) cards = Account.all();

        if (table.length) {
          var date_max = 0;
          var date_now = new Date();
          var date_end = new Date();
          var date_one = 24 * 60 * 60 * 1000;
          table.forEach(function (elem) {
            elem.episodes.forEach(function (ep) {
              var air = new Date(ep.air_date);
              var tim = air.getTime();

              if (date_max < tim) {
                date_max = tim;
                date_end = air;
              }
            });
          });
          var date_dif = Math.min(30, Math.round(Math.abs((date_now - date_end) / date_one)));

          if (date_dif > 0) {
            for (var i = 0; i < date_dif; i++) {
              this.append(date_now);
              date_now.setDate(date_now.getDate() + 1);
            }

            scroll.minus();
            scroll.append(body);
            html.append(scroll.render());
          } else this.empty();
        } else this.empty();

        this.activity.loader(false);
        this.activity.toggle();
        return this.render();
      };

      this.empty = function () {
        var empty = new create$g({
          descr: Lang.translate('timetable_empty')
        });
        html.append(empty.render());
        _this.start = empty.start;

        _this.activity.loader(false);

        _this.activity.toggle();
      };

      this.append = function (date) {
        var item = $("\n            <div class=\"timetable__item selector\">\n                <div class=\"timetable__inner\">\n                    <div class=\"timetable__date\"></div>\n                    <div class=\"timetable__body\"></div>\n                </div>\n            </div>\n        ");
        var air_date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        var air_epis = [];
        var day_week = Utils.parseTime(date.getTime());
        var weeks = [Lang.translate('week_7'), Lang.translate('week_1'), Lang.translate('week_2'), Lang.translate('week_3'), Lang.translate('week_4'), Lang.translate('week_5'), Lang.translate('week_6')];
        table.forEach(function (elem) {
          elem.episodes.forEach(function (ep) {
            var card = cards.find(function (card) {
              return card.id == elem.id;
            });

            if (ep.air_date == air_date && card) {
              air_epis.push({
                episode: ep,
                card: cards.find(function (card) {
                  return card.id == elem.id;
                })
              });
            }
          });
        });

        if (air_epis.length) {
          air_epis.slice(0, 3).forEach(function (elem) {
            item.find('.timetable__body').append('<div><span style="background-color: ' + Utils.stringToHslColor(elem.card.name, 50, 50) + '"></span>' + elem.card.name + '</div>');
          });

          if (air_epis.length > 3) {
            item.find('.timetable__body').append('<div>+' + (air_epis.length - 3) + '</div>');
          }

          if (air_epis.length == 1) {
            var preview = $('<div class="timetable__preview"><img><div>' + (air_epis[0].episode.name || Lang.translate('noname')) + '</div></div>');
            Utils.imgLoad(preview.find('img'), Utils.protocol() + 'imagetmdb.cub.watch/t/p/w200/' + air_epis[0].episode.still_path, false, function () {
              preview.find('img').remove();
            });
            item.find('.timetable__body').prepend(preview);
          }

          item.addClass('timetable__item--any');
        }

        item.find('.timetable__date').text(day_week["short"] + ' - ' + weeks[date.getDay()] + '.');
        item.on('hover:focus', function () {
          last = $(this)[0];
          scroll.update($(this));
        }).on('hover:enter', function () {
          var modal = $('<div></div>');
          air_epis.forEach(function (elem) {
            var noty = Template.get('notice_card', {
              time: air_date,
              title: elem.card.name,
              descr: Lang.translate('full_season') + ' - <b>' + elem.episode.season_number + '</b><br>' + Lang.translate('full_episode') + ' - <b>' + elem.episode.episode_number + '</b>'
            });
            Utils.imgLoad(noty.find('img'), elem.card.poster ? elem.card.poster : elem.card.img ? elem.card.img : Utils.protocol() + 'imagetmdb.cub.watch/t/p/w200/' + elem.card.poster_path);
            noty.on('hover:enter', function () {
              Modal.close();
              Activity$1.push({
                url: '',
                component: 'full',
                id: elem.card.id,
                method: 'tv',
                card: elem.card,
                source: elem.card.source
              });
            });
            modal.append(noty);
          });
          Modal.open({
            title: Lang.translate('menu_tv'),
            size: 'medium',
            html: modal,
            onBack: function onBack() {
              Modal.close();
              Controller.toggle('content');
            }
          });
        });
        body.append(item);
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: this.back
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        scroll.destroy();
        html.remove();
      };
    }

    var component = {
      main: component$e,
      full: component$d,
      category: component$a,
      category_full: component$b,
      actor: component$9,
      favorite: component$8,
      torrents: component$7,
      mytorrents: component$6,
      relise: component$5,
      collections: component$4,
      collections_view: component$3,
      nocomponent: component$2,
      timetable: component$1
    };
    /**
     * Создать компонент
     * @param {{component:string}} object 
     * @returns 
     */

    function create$5(object) {
      if (component[object.component]) {
        return new component[object.component](object);
      } else {
        return new component.nocomponent(object);
      }
    }
    /**
     * Добавить
     * @param {string} name 
     * @param {class} comp 
     */


    function add$4(name, comp) {
      component[name] = comp;
    }
    /**
     * Получить компонент
     * @param {string} name 
     * @returns {class}
     */


    function get$1(name) {
      return component[name];
    }

    var Component = {
      create: create$5,
      add: add$4,
      get: get$1
    };

    var where;
    var data$1 = {};

    function init$8() {
      data$1 = Storage.get('notice', '{}');
    }

    function getNotice(call) {
      Account.notice(function (result) {
        if (result.length) {
          var items = [];
          result.forEach(function (item) {
            var data = JSON.parse(item.data);
            var desc = Lang.translate('notice_new_quality') + '<br><br>' + Lang.translate('notice_quality') + ' - <b>' + data.card.quality + '</b>';

            if (data.card.seasons) {
              var k = [];

              for (var i in data.card.seasons) {
                k.push(i);
              }

              var s = k.pop();
              desc = Lang.translate('notice_new_episode') + '<br><br>' + Lang.translate('full_season') + ' - <b>' + s + '</b><br>' + Lang.translate('full_episode') + ' - <b>' + data.card.seasons[s] + '</b>';
            }

            items.push({
              time: item.date + ' 12:00',
              title: data.card.title || data.card.original_name,
              descr: desc,
              card: data.card
            });
          });
          var all = items;
          all.sort(function (a, b) {
            var t_a = new Date(a.time).getTime(),
                t_b = new Date(b.time).getTime();
            if (t_a > t_b) return -1;else if (t_a < t_b) return 1;else return 0;
          });
          call(all);
        } else call([]);
      });
    }

    function open$1() {
      getNotice(function (notice) {
        var html = $('<div></div>');
        notice.forEach(function (element) {
          var item = Template.get(element.card ? 'notice_card' : 'notice', element);

          if (element.card) {
            var img = item.find('img')[0];
            var poster_size = Storage.field('poster_size');

            img.onload = function () {};

            img.onerror = function (e) {
              img.src = './img/img_broken.svg';
            };

            img.src = element.card.poster ? element.card.poster : element.card.img ? element.card.img : Utils.protocol() + 'imagetmdb.cub.watch/t/p/' + poster_size + '/' + element.card.poster_path;
            item.on('hover:enter', function () {
              Modal.close();
              Activity$1.push({
                url: '',
                component: 'full',
                id: element.card.id,
                method: element.card.seasons ? 'tv' : 'movie',
                card: element.card,
                source: 'tmdb'
              });
            });
          }

          html.append(item);
        });

        if (!notice.length) {
          html.append('<div class="selector about">' + Lang.translate(Account.working() ? 'notice_none_account' : 'notice_none') + '</div>');
        }

        Modal.open({
          title: Lang.translate('title_notice'),
          size: 'medium',
          html: html,
          onBack: function onBack() {
            Modal.close();
            Controller.toggle('head');
          }
        });
        data$1.time = maxtime(notice);
        Storage.set('notice', data$1);
        icon(notice);
      });
    }

    function maxtime(notice) {
      var max = 0;
      notice.forEach(function (element) {
        var time = new Date(element.time).getTime();
        max = Math.max(max, time);
      });
      return max;
    }

    function any(notice) {
      return maxtime(notice) > data$1.time;
    }

    function icon(notice) {
      where.find('.notice--icon').toggleClass('active', any(notice));
    }

    function start$2(html) {
      where = html;
      getNotice(icon);
    }

    var Notice = {
      open: open$1,
      start: start$2,
      init: init$8
    };

    var html$5;
    var last$2;
    var activi = false;

    function init$7() {
      html$5 = Template.get('head');
      Utils.time(html$5);
      Notice.start(html$5);
      html$5.find('.selector').data('controller', 'head').on('hover:focus', function (event) {
        last$2 = event.target;
      });
      html$5.find('.open--settings').on('hover:enter', function () {
        Controller.toggle('settings');
      });
      html$5.find('.open--notice').on('hover:enter', function () {
        Notice.open();
      });
      html$5.find('.open--search').on('hover:enter', function () {
        Controller.toggle('search');
      });
      html$5.find('.head__logo-icon').on('click', function () {
        Controller.toggle('menu');
      });
      Storage.listener.follow('change', function (e) {
        if (e.name == 'account') {
          html$5.find('.open--profile').toggleClass('hide', e.value.token ? false : true);
        }
      });
      if (Storage.get('account', '{}').token) html$5.find('.open--profile').removeClass('hide');
      html$5.find('.open--profile').on('hover:enter', function () {
        Account.showProfiles('head');
      });
      Controller.add('head', {
        toggle: function toggle() {
          Controller.collectionSet(html$5);
          Controller.collectionFocus(last$2, html$5);
        },
        right: function right() {
          Navigator.move('right');
        },
        left: function left() {
          if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
        },
        down: function down() {
          Controller.toggle('content');
        },
        back: function back() {
          Activity$1.backward();
        }
      });
      var timer;
      var broadcast = html$5.find('.open--broadcast').hide();
      broadcast.on('hover:enter', function () {
        Broadcast.open({
          type: 'card',
          object: Activity$1.extractObject(activi)
        });
      });
      Lampa.Listener.follow('activity', function (e) {
        if (e.type == 'start') activi = e.object;
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (activi) {
            if (activi.component !== 'full') {
              broadcast.hide();
              activi = false;
            }
          }
        }, 1000);

        if (e.type == 'start' && e.component == 'full') {
          broadcast.show();
          activi = e.object;
        }
      });
    }

    function title(title) {
      html$5.find('.head__title').text(title ? '- ' + title : '');
    }

    function render$3() {
      return html$5;
    }

    var Head = {
      render: render$3,
      title: title,
      init: init$7
    };

    var listener$3 = start$4();
    var activites = [];
    var callback = false;
    var fullout = false;
    var content;
    var slides;
    var maxsave;

    function Activity(component) {
      var slide = Template.get('activity');
      var body = slide.find('.activity__body');
      this.stoped = false;
      this.started = false;
      /**
       * Добовляет активити в список активитис
       */

      this.append = function () {
        slides.append(slide);
      };
      /**
       * Создает новую активность
       */


      this.create = function () {
        component.create(body);
        body.append(component.render());
      };
      /**
       * Показывает загрузку
       * @param {boolean} status 
       */


      this.loader = function (status) {
        slide.toggleClass('activity--load', status);

        if (!status) {
          setTimeout(function () {
            Controller.updateSelects();
          }, 10);
        }
      };
      /**
       * Создает повторно
       */


      this.restart = function () {
        this.append();
        this.stoped = false;
        component.start();
      };
      /**
       * Стартуем активную активность
       */


      this.start = function () {
        this.started = true;
        Controller.add('content', {
          invisible: true,
          toggle: function toggle() {},
          left: function left() {
            Controller.toggle('menu');
          },
          up: function up() {
            Controller.toggle('head');
          },
          back: function back() {
            Activity.backward();
          }
        });
        Controller.toggle('content');
        if (this.stoped) this.restart();else component.start();
      };
      /**
       * Пауза
       */


      this.pause = function () {
        this.started = false;
        component.pause();
      };
      /**
       * Включаем активность если она активна
       */


      this.toggle = function () {
        if (this.started) this.start();
      };
      /**
       * Стоп
       */


      this.stop = function () {
        this.started = false;
        if (this.stoped) return;
        this.stoped = true;
        component.stop();
        slide.detach();
      };
      /**
       * Рендер
       */


      this.render = function () {
        return slide;
      };
      /**
       * Получить класс компонента
       */


      this.component = function () {
        return component;
      };
      /**
       * Уничтожаем активность
       */


      this.destroy = function () {
        component.destroy();
        slide.remove();
      };

      this.append();
    }
    /**
     * Запуск
     */


    function init$6() {
      content = Template.get('activitys');
      slides = content.find('.activitys__slides');
      maxsave = Storage.get('pages_save_total', 5);
      empty();
      var wait = true;
      setTimeout(function () {
        wait = false;
      }, 1500);
      window.addEventListener('popstate', function () {
        if (fullout || wait) return;
        empty();
        listener$3.send('popstate', {
          count: activites.length
        });
        if (callback) callback();else {
          backward();
        }
      });
      Storage.listener.follow('change', function (event) {
        if (event.name == 'pages_save_total') maxsave = Storage.get('pages_save_total', 5);
      });
    }
    /**
     * Лимит активностей, уничтожать если больше maxsave
     */


    function limit() {
      var curent = active$1();
      if (curent && curent.activity) curent.activity.pause();
      var tree_stop = activites.slice(-2);
      if (tree_stop.length > 1 && tree_stop[0].activity) tree_stop[0].activity.stop();
      var tree_destroy = activites.slice(-maxsave);

      if (tree_destroy.length > maxsave - 1) {
        var first = tree_destroy[0];

        if (first.activity) {
          first.activity.destroy();
          first.activity = null;
        }
      }
    }
    /**
     * Добавить новую активность
     * @param {{component:string}} object 
     */


    function push(object) {
      limit();
      create$4(object);
      activites.push(object);
      start$1(object);
    }
    /**
     * Создать новую активность
     * @param {{component:string}} object 
     */


    function create$4(object) {
      var comp = Component.create(object);
      object.activity = new Activity(comp);
      comp.activity = object.activity;
      Lampa.Listener.send('activity', {
        component: object.component,
        type: 'init',
        object: object
      });
      object.activity.create();
      Lampa.Listener.send('activity', {
        component: object.component,
        type: 'create',
        object: object
      });
    }
    /**
     * Вызов обратно пользователем
     */


    function back$3() {
      window.history.back();
    }
    /**
     * Получить активную активность
     * @returns {object}
     */


    function active$1() {
      return activites[activites.length - 1];
    }
    /**
     * Создат пустую историю
     */


    function empty() {
      window.history.pushState(null, null, window.location.pathname);
    }
    /**
     * Получить все активности
     * @returns {[{component:string, activity:class}]}
     */


    function all() {
      return activites;
    }
    /**
     * Обработать событие назад
     */


    function backward() {
      callback = false;
      listener$3.send('backward', {
        count: activites.length
      });
      if (activites.length == 1) return;
      slides.find('>div').removeClass('activity--active');
      var curent = activites.pop();

      if (curent) {
        setTimeout(function () {
          curent.activity.destroy();
          Lampa.Listener.send('activity', {
            component: curent.component,
            type: 'destroy',
            object: curent
          });
        }, 200);
      }

      var previous_tree = activites.slice(-maxsave);

      if (previous_tree.length > maxsave - 1) {
        create$4(previous_tree[0]);
      }

      previous_tree = activites.slice(-1)[0];

      if (previous_tree) {
        if (previous_tree.activity) start$1(previous_tree);else {
          create$4(previous_tree);
          start$1(previous_tree);
        }
      }
    }
    /**
     * Сохранить активность в память
     * @param {{component:string, activity:class}} object 
     */


    function save$1(object) {
      var saved = {};

      for (var i in object) {
        if (i !== 'activity') saved[i] = object[i];
      }

      Storage.set('activity', saved);
    }
    /**
     * Получить данные активности
     * @param {{component:string, activity:class}} object 
     * @returns {{component:string}}
     */


    function extractObject(object) {
      var saved = {};

      for (var i in object) {
        if (i !== 'activity') saved[i] = object[i];
      }

      return saved;
    }
    /**
     * Активируем следующию активность 
     * @param {{component:string, activity:class}} object 
     */


    function start$1(object) {
      save$1(object);
      object.activity.start();
      slides.find('> div').removeClass('activity--active');
      object.activity.render().addClass('activity--active');
      Head.title(object.title);
      Lampa.Listener.send('activity', {
        component: object.component,
        type: 'start',
        object: object
      });
    }
    /**
     * С какой активности начать запуск лампы
     */


    function last$1() {
      var active = Storage.get('activity', 'false');
      var start_from = Storage.field("start_page");

      if (window.start_deep_link) {
        push(window.start_deep_link);
      } else if (active && start_from === "last") {
        if (active.page) active.page = 1;
        push(active);
      } else {
        var _start_from$split = start_from.split('@'),
            _start_from$split2 = _slicedToArray(_start_from$split, 2),
            action = _start_from$split2[0],
            type = _start_from$split2[1];

        if (action == 'favorite') {
          push({
            url: '',
            title: type == 'book' ? Lang.translate('title_book') : type == 'like' ? Lang.translate('title_like') : type == 'history' ? Lang.translate('title_history') : Lang.translate('title_wath'),
            component: 'favorite',
            type: type,
            page: 1
          });
        } else if (action == 'mytorrents') {
          push({
            url: '',
            title: Lang.translate('title_mytorrents'),
            component: 'mytorrents',
            page: 1
          });
        } else {
          push({
            url: '',
            title: Lang.translate('title_main') + ' - ' + Storage.field('source').toUpperCase(),
            component: 'main',
            source: Storage.field('source'),
            page: 1
          });
        }
      }
    }
    /**
     * Рендер
     * @returns {object}
     */


    function render$2() {
      return content;
    }
    /**
     * Подключить обратный вызов при изменени истории
     * @param {*} call 
     */


    function call(call) {
      callback = call;
    }
    /**
     * Выход из лампы
     */


    function out() {
      fullout = true;
      back$3();

      for (var i = 0; i < window.history.length; i++) {
        back$3();
      }

      setTimeout(function () {
        fullout = false;
        empty();
      }, 100);
    }
    /**
     * Заменить активную активность
     * @param {object} replace 
     */


    function replace() {
      var replace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var object = extractObject(active$1());

      for (var i in replace) {
        object[i] = replace[i];
      }

      active$1().activity.destroy();
      activites.pop();
      push(object);
    }

    var Activity$1 = {
      init: init$6,
      listener: listener$3,
      push: push,
      back: back$3,
      render: render$2,
      backward: backward,
      call: call,
      last: last$1,
      out: out,
      replace: replace,
      active: active$1,
      all: all,
      extractObject: extractObject
    };

    var listener$2 = start$4();
    var active;
    var active_name = '';
    var controlls = {};
    var selects;
    var select_active;
    /**
     * Добавить контроллер
     * @param {String} name 
     * @param {Object} calls 
     */

    function add$3(name, calls) {
      controlls[name] = calls;
    }
    /**
     * Запустить функцию
     * @param {String} name 
     * @param {Object} params 
     */


    function run(name, params) {
      if (active) {
        if (active[name]) {
          if (typeof active[name] == 'function') active[name](params);else if (typeof active[name] == 'string') {
            run(active[name], params);
          }
        }
      }
    }
    /**
     * Двигать
     * @param {String} direction 
     */


    function move(direction) {
      run(direction);
    }
    /**
     * Вызов enter
     */


    function enter() {
      if (active && active.enter) run('enter');else if (select_active) {
        select_active.trigger('hover:enter');
      }
    }
    /**
     * Вызов long
     */


    function _long() {
      if (active && active["long"]) run('long');else if (select_active) {
        select_active.trigger('hover:long');
      }
    }
    /**
     * Завершить
     */


    function finish() {
      run('finish');
    }
    /**
     * Нажали назад
     */


    function back$2() {
      run('back');
    }
    /**
     * Переключить контроллер
     * @param {String} name 
     */


    function toggle(name) {
      if (active && active.gone) active.gone(name);

      if (controlls[name]) {
        active = controlls[name];
        active_name = name;
        Activity$1.call(function () {
          run('back');
        });
        if (active.toggle) active.toggle(); //updateSelects()

        listener$2.send('toggle', {
          name: name
        });
      }
    }

    function bindMouseOrTouch(name) {
      selects.on(name + '.hover', function (e) {
        if ($(this).hasClass('selector')) {
          if (name == 'touchstart') $('.selector').removeClass('focus enter');
          selects.removeClass('focus enter').data('ismouse', false);
          $(this).addClass('focus').data('ismouse', true).trigger('hover:focus', [true]);
          var silent = Navigator.silent;
          Navigator.silent = true;
          Navigator.focus($(this)[0]);
          Navigator.silent = silent;
        }
      });
      if (name == 'mouseenter') selects.on('mouseleave.hover', function () {
        $(this).removeClass('focus');
      });
    }

    function bindMouseAndTouchLong() {
      selects.each(function () {
        var selector = $(this);
        var position = 0;
        var timer;

        var trigger = function trigger() {
          clearTimeout(timer);
          timer = setTimeout(function () {
            var time = selector.data('long-time') || 0;

            if (time + 100 < Date.now()) {
              var mutation = Math.abs(position - (selector.offset().top + selector.offset().left));
              if (mutation < 30) selector.trigger('hover:long', [true]);
            }

            selector.data('long-time', Date.now());
          }, 800);
          position = selector.offset().top + selector.offset().left;
        };

        selector.on('mousedown.hover touchstart.hover', trigger).on('mouseout.hover mouseup.hover touchend.hover touchmove.hover', function (e) {
          clearTimeout(timer);
        });
      });
    }

    function updateSelects(cuctom) {
      selects = cuctom || $('.selector');
      selects.unbind('.hover');

      if (Storage.field('navigation_type') == 'mouse') {
        selects.on('click.hover', function (e) {
          var time = $(this).data('click-time') || 0; //ну хз, 2 раза клик срабатывает, нашел такое решение:

          if (time + 100 < Date.now()) {
            selects.removeClass('focus enter');
            if (e.keyCode !== 13) $(this).addClass('focus').trigger('hover:enter', [true]);
          }

          $(this).data('click-time', Date.now());
        });
        bindMouseOrTouch('mouseenter');
        bindMouseAndTouchLong();
      }

      bindMouseOrTouch('touchstart');
    }

    function enable(name) {
      if (active_name == name) toggle(name);
    }

    function clearSelects() {
      select_active = false;
      if (selects) selects.removeClass('focus enter'); //if(selects) selects.unbind('.hover')
    }
    /**
     * Вызвать событие
     * @param {String} name 
     * @param {Object} params 
     */


    function trigger$1(name, params) {
      run(name, params);
    }
    /**
     * Фокус на элементе
     * @param {Object} target 
     */


    function focus(target) {
      if (selects) selects.removeClass('focus enter').data('ismouse', false);
      $(target).addClass('focus').trigger('hover:focus');
      select_active = $(target);
    }

    function collectionSet(html, append) {
      var selectors = html.find('.selector');
      var colection = selectors.toArray();

      if (append) {
        selectors = $.merge(selectors, append.find('.selector'));
        colection = colection.concat(append.find('.selector').toArray());
      }

      if (colection.length || active.invisible) {
        clearSelects();
        Navigator.setCollection(colection);
        updateSelects(selectors);
      }
    }

    function collectionFocus(target, html) {
      if (target) {
        Navigator.focus(target);
      } else {
        var colection = html.find('.selector').not('.hide').toArray();
        if (colection.length) Navigator.focus(colection[0]);
      }
    }

    function enabled() {
      return {
        name: active_name,
        controller: active
      };
    }

    function toContent() {
      var trys = 0;
      Screensaver.stopSlideshow();

      var go = function go() {
        var contrl = enabled();
        var any = parseInt([$('body').hasClass('settings--open') ? 1 : 0, $('body').hasClass('selectbox--open') ? 1 : 0, $('.modal,.youtube-player,.player,.search-box,.search').length ? 1 : 0].join(''));
        trys++;

        if (any) {
          if (contrl.controller.back) contrl.controller.back();
          if (trys < 10) go();
        }
      };

      go();
    }

    var Controller = {
      listener: listener$2,
      add: add$3,
      move: move,
      enter: enter,
      finish: finish,
      toggle: toggle,
      trigger: trigger$1,
      back: back$2,
      focus: focus,
      collectionSet: collectionSet,
      collectionFocus: collectionFocus,
      enable: enable,
      enabled: enabled,
      "long": _long,
      updateSelects: updateSelects,
      toContent: toContent
    };

    function create$3() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _keyClass = window.SimpleKeyboard["default"],
          _keyBord;

      var last;
      var recognition;
      var simple = Storage.field('keyboard_type') !== 'lampa';
      var input;
      var _default_layout = {
        'en': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{UK} q w e r t y u i o p', 'a s d f g h j k l /', '{shift} z x c v b n m , . : http://', '{space}'],
        'en-shift': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{UK} Q W E R T Y U I O P', 'A S D F G H J K L /', '{shift} Z X C V B N M , . : http://', '{space}'],
        'uk': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{RU} й ц у к е н г ш щ з х ї', 'ф і в а п р о л д ж є', '{shift} я ч с м и т ь б ю . : http://', '{space}'],
        'uk-shift': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{RU} Й Ц У К Е Н Г Ш Щ З Х Ї', 'Ф І В А П Р О Л Д Ж Є', '{shift} Я Ч С М И Т Ь Б Ю . : http://', '{space}'],
        'abc': ['1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{RU} ! @ # $ % ^ & * ( ) [ ]', '- _ = + \\ | [ ] { }', '; : \' " , . < > / ?', '{space}'],
        'default': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{EN} й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', '{shift} я ч с м и т ь б ю , . : http://', '{space}'],
        'ru-shift': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{EN} Й Ц У К Е Н Г Ш Щ З Х Ъ', 'Ф Ы В А П Р О Л Д Ж Э', '{shift} Я Ч С М И Т Ь Б Ю , . : http://', '{space}']
      };
      this.listener = start$4();

      this.create = function () {
        var _this = this;

        if (simple) {
          input = $('<input type="text" class="simple-keyboard-input selector" placeholder="' + Lang.translate('search_input') + '..." />');
          var last_value = '';
          var time_blur = 0;
          var time_focus = 0;
          var stated, ended;
          input.on('keyup change input keypress', function (e) {
            var now_value = input.val();

            if (last_value !== now_value) {
              last_value = now_value;
              stated = ended = false;

              _this.listener.send('change', {
                value: now_value
              });
            }
          });
          input.on('blur', function () {
            Keypad.enable();
            time_blur = Date.now();
          });
          input.on('focus', function () {
            Keypad.disable();
            time_focus = Date.now();
          });
          input.on('keyup', function (e) {
            if (time_focus + 1000 > Date.now()) return;
            var keys = [13, 65376, 29443, 117, 65385, 461, 27];
            var valu = input.val();
            var cart = e.target.selectionStart;

            if (keys.indexOf(e.keyCode) >= 0) {
              e.preventDefault();
              input.blur();
            }

            if (e.keyCode == 13 || e.keyCode == 65376) _this.listener.send('enter');

            if (e.keyCode == 37 && cart == 0) {
              if (stated) input.blur(), _this.listener.send('left');
              stated = true;
              ended = false;
            }

            if (e.keyCode == 39 && cart >= valu.length) {
              if (ended) input.blur(), _this.listener.send('right');
              ended = true;
              stated = false;
            }

            if (e.keyCode == 40) {
              input.blur(), _this.listener.send('down');
            }

            if (e.keyCode == 38) {
              input.blur(), _this.listener.send('up');
            }
          });
          input.on('hover:focus', function () {
            input.focus();
          });
          input.on('hover:enter', function () {
            if (time_blur + 1000 < Date.now()) input.focus();
          });
          $('.simple-keyboard').append(input);
        } else {
          _keyBord = new _keyClass({
            display: {
              '{bksp}': '&nbsp;',
              '{enter}': '&nbsp;',
              '{shift}': '&nbsp;',
              '{space}': '&nbsp;',
              '{RU}': '&nbsp;',
              '{EN}': '&nbsp;',
              '{UK}': '&nbsp;',
              '{abc}': '&nbsp;',
              '{rus}': 'русский',
              '{eng}': 'english',
              '{search}': Lang.translate('search'),
              '{mic}': "<svg viewBox=\"0 0 24 31\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect x=\"5\" width=\"14\" height=\"23\" rx=\"7\" fill=\"currentColor\"/>\n                        <path d=\"M3.39272 18.4429C3.08504 17.6737 2.21209 17.2996 1.44291 17.6073C0.673739 17.915 0.299615 18.7879 0.607285 19.5571L3.39272 18.4429ZM23.3927 19.5571C23.7004 18.7879 23.3263 17.915 22.5571 17.6073C21.7879 17.2996 20.915 17.6737 20.6073 18.4429L23.3927 19.5571ZM0.607285 19.5571C2.85606 25.179 7.44515 27.5 12 27.5V24.5C8.55485 24.5 5.14394 22.821 3.39272 18.4429L0.607285 19.5571ZM12 27.5C16.5549 27.5 21.1439 25.179 23.3927 19.5571L20.6073 18.4429C18.8561 22.821 15.4451 24.5 12 24.5V27.5Z\" fill=\"currentColor\"/>\n                        <rect x=\"10\" y=\"25\" width=\"4\" height=\"6\" rx=\"2\" fill=\"currentColor\"/>\n                        </svg>"
            },
            layout: params.layout || _default_layout,
            onChange: function onChange(value) {
              _this.listener.send('change', {
                value: value
              });
            },
            onKeyPress: function onKeyPress(button) {
              if (button === "{shift}" || button === "{abc}" || button === "{EN}" || button === "{RU}" || button === "{rus}" || button === "{eng}" || button === "{UK}" || button === "{uk}") _this._handle(button);else if (button === '{mic}') {
                if (Platform.is('android')) {
                  Android.voiceStart();
                  window.voiceResult = _this.value.bind(_this);
                } else if (recognition) {
                  try {
                    if (recognition.record) recognition.stop();else recognition.start();
                  } catch (e) {
                    recognition.stop();
                  }
                }
              } else if (button === '{enter}' || button === '{search}') {
                _this.listener.send('enter');
              }
            }
          });
          var lang = Storage.get('language', 'ru');

          _keyBord.setOptions({
            layoutName: lang == 'ru' ? 'default' : lang
          });

          this.speechRecognition();
        }
      };

      this.speechRecognition = function () {
        var _this2 = this;

        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        console.log('Speech', 'status:', SpeechRecognition ? true : false);

        if (SpeechRecognition) {
          recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.addEventListener("start", function () {
            console.log('Speech', 'start');
            $('.simple-keyboard [data-skbtn="{mic}"]').css('color', 'red');
            recognition.record = true;
            Noty.show(Lang.translate('keyboard_listen'));
          });
          recognition.addEventListener("end", function () {
            console.log('Speech', 'end');
            $('.simple-keyboard [data-skbtn="{mic}"]').css('color', 'white');
            recognition.record = false;
          });
          recognition.addEventListener("result", function (event) {
            console.log('Speech', 'result:', event.resultIndex, event.results[event.resultIndex]);
            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript;
            console.log('Speech', 'transcript:', transcript);

            if (transcript.toLowerCase().trim() === "stop recording") {
              recognition.stop();
            } else {
              if (transcript.toLowerCase().trim() === "reset input") {
                _this2.value('');
              } else {
                _this2.value(transcript);
              }
            }
          });
          recognition.addEventListener("error", function (event) {
            console.log('Speech', 'error:', event);

            if (event.error == 'not-allowed') {
              Noty.show(Lang.translate('keyboard_nomic'));
            }

            recognition.stop();
          });
        } else {
          $('.simple-keyboard [data-skbtn="{mic}"]').css('opacity', '0.3');
        }
      };

      this.value = function (value) {
        if (simple) input.val(value);else _keyBord.setInput(value);
        this.listener.send('change', {
          value: value
        });
      };

      this._layout = function () {
        var keys = $('.simple-keyboard .hg-button').addClass('selector');
        Controller.collectionSet($('.simple-keyboard'));
        Controller.collectionFocus(last || keys[0], $('.simple-keyboard'));
        $('.simple-keyboard .hg-button:not(.binded)').on('hover:enter', function (e, click) {
          Controller.collectionFocus($(this)[0]);
          if (!click) _keyBord.handleButtonClicked($(this).attr('data-skbtn'), e);
        }).on('hover:focus', function (e) {
          last = e.target;
        });
        keys.addClass('binded');
      };

      this._handle = function (button) {
        var current_layout = _keyBord.options.layoutName,
            layout = 'default';

        if (button == '{shift}') {
          if (current_layout == 'default') layout = 'ru-shift';else if (current_layout == 'ru-shift') layout = 'default';else if (current_layout == 'en') layout = 'en-shift';else if (current_layout == 'en-shift') layout = 'en';else if (current_layout == 'uk') layout = 'uk-shift';else if (current_layout == 'uk-shift') layout = 'uk';
        } else if (button == '{abc}') layout = 'abc';else if (button == '{EN}' || button == '{eng}') layout = 'en';else if (button == '{RU}' || button == '{rus}') layout = 'default';else if (button == '{UK}' || button == '{uk}') layout = 'uk';

        _keyBord.setOptions({
          layoutName: layout
        });

        last = false;
        Controller.toggle('keybord');
      };

      this.toggle = function () {
        var _this3 = this;

        Controller.add('keybord', {
          toggle: function toggle() {
            if (simple) {
              Controller.collectionSet($('.simple-keyboard'));
              Controller.collectionFocus(false, $('.simple-keyboard'));
            } else _this3._layout();
          },
          up: function up() {
            if (!Navigator.canmove('up')) {
              _this3.listener.send('up');
            } else Navigator.move('up');
          },
          down: function down() {
            if (!Navigator.canmove('down')) {
              _this3.listener.send('down');
            } else Navigator.move('down');
          },
          left: function left() {
            if (!Navigator.canmove('left')) {
              _this3.listener.send('left');
            } else Navigator.move('left');
          },
          right: function right() {
            if (!Navigator.canmove('right')) {
              _this3.listener.send('right');
            } else Navigator.move('right');
          },
          back: function back() {
            _this3.listener.send('back');
          }
        });
        Controller.toggle('keybord');
      };

      this.destroy = function () {
        try {
          if (simple) {
            input.remove();
          } else _keyBord.destroy();
        } catch (e) {}

        this.listener.destroy();
        Keypad.enable();
      };
    }

    var html$4, keyboard$1, input$1;
    /**
     * Заустить редактор
     * @param {{title:string, value:string, free:boolean, nosave:boolean}} params 
     * @param {function} call 
     */

    function edit(params, call) {
      html$4 = Template.get('settings_input');
      input$1 = html$4.find('.settings-input__input');
      if (Storage.field('keyboard_type') !== 'lampa') input$1.hide();
      $('body').append(html$4);
      keyboard$1 = new create$3();
      keyboard$1.listener.follow('change', function (event) {
        input$1.text(event.value.trim());
      });
      keyboard$1.listener.follow('enter', function (event) {
        var val = input$1.text();
        back$1();
        call(val);
      });
      html$4.toggleClass('settings-input--free', params.free ? true : false);
      $('.settings-input__links', html$4).toggleClass('hide', params.nosave ? true : false);
      if (params.title) html$4.find('.settings-input__content').prepend('<div class="settings-input__title">' + params.title + '</div>');
      keyboard$1.listener.follow('down', function (event) {
        if (params.nosave) return;
        var members = Storage.get('setting_member', []);
        var links = [];
        links.push({
          title: (members.indexOf(input$1.text()) == -1 ? Lang.translate('settings_add') : Lang.translate('settings_remove')) + ' ' + Lang.translate('settings_this_value'),
          subtitle: input$1.text(),
          add: true
        });
        members.forEach(function (link) {
          links.push({
            title: link,
            subtitle: Lang.translate('settings_user_links'),
            url: link,
            member: true
          });
        });
        links = links.concat([{
          title: '127.0.0.1:8090',
          subtitle: Lang.translate('settings_for_local'),
          url: '127.0.0.1:8090'
        }]);
        Select.show({
          title: Lang.translate('title_links'),
          items: links,
          onSelect: function onSelect(a) {
            if (a.add) {
              if (members.indexOf(a.subtitle) == -1) {
                Arrays.insert(members, 0, a.subtitle);
                Noty.show(Lang.translate('settings_added') + ' (' + a.subtitle + ')');
              } else {
                Arrays.remove(members, a.subtitle);
                Noty.show(Lang.translate('settings_removed') + ' (' + a.subtitle + ')');
              }

              Storage.set('setting_member', members);
            } else {
              keyboard$1.value(a.url);
            }

            keyboard$1.toggle();
          },
          onLong: function onLong(a, elem) {
            if (a.member) {
              Arrays.remove(members, a.url);
              Noty.show(Lang.translate('settings_removed') + ' (' + a.url + ')');
              Storage.set('setting_member', members);
              $(elem).css({
                opacity: 0.4
              });
            }
          },
          onBack: function onBack() {
            keyboard$1.toggle();
          }
        });
      });
      keyboard$1.listener.follow('back', function () {
        var val = input$1.text();
        back$1();
        call(val);
      });
      keyboard$1.create();
      keyboard$1.value(params.value);
      keyboard$1.toggle();
      Helper.show('keyboard', Lang.translate('helper_keyboard'));
    }
    /**
     * Назад
     */


    function back$1() {
      destroy$1();
      Controller.toggle('settings_component');
    }
    /**
     * Уничтожить
     */


    function destroy$1() {
      keyboard$1.destroy();
      html$4.remove();
      html$4 = null;
      keyboard$1 = null;
      input$1 = null;
    }

    var Input = {
      edit: edit
    };

    var values = {};
    var defaults = {};
    var listener$1 = start$4();
    /**
     * Запуск
     */

    function init$5() {
      if (Platform.is('tizen')) {
        select$1('player', {
          'inner': '#{settings_param_player_inner}',
          'tizen': 'Tizen'
        }, 'tizen');
      }

      if (Platform.is('orsay')) {
        select$1('player', {
          'inner': '#{settings_param_player_inner}',
          'orsay': 'Orsay'
        }, 'inner');
      } else if (Platform.is('webos')) {
        select$1('player', {
          'inner': '#{settings_param_player_inner}',
          'webos': 'WebOS'
        }, 'inner');
      } else if (Platform.is('android')) {
        select$1('player', {
          'inner': '#{settings_param_player_inner}',
          'android': 'Android'
        }, 'android');
        trigger('internal_torrclient', false);
      } else if (Platform.is('nw')) {
        select$1('player', {
          'inner': '#{settings_param_player_inner}',
          'other': '#{settings_param_player_outside}'
        }, 'inner');
      }

      Storage.set('player_size', 'default'); //делаем возврат на нормальный масштаб видео
    }
    /**
     * Переключатель
     * @param {string} name - название
     * @param {boolean} value_default - значение по дефолту
     */


    function trigger(name, value_default) {
      values[name] = {
        'true': '#{settings_param_yes}',
        'false': '#{settings_param_no}'
      };
      defaults[name] = value_default;
    }
    /**
     * Выбрать
     * @param {string} name - название
     * @param {{key:string}} select_data - значение
     * @param {string} select_default_value - значение по дефолту
     */


    function select$1(name, select_data, select_default_value) {
      values[name] = select_data;
      defaults[name] = select_default_value;
    }
    /**
     * Биндит события на элемент
     * @param {object} elems 
     */


    function bind(elems) {
      elems.on('hover:enter', function (event) {
        var elem = $(event.target);
        var type = elem.data('type');
        var name = elem.data('name');
        var onChange = elem.data('onChange');

        if (type == 'toggle') {
          var params = values[name];
          var keys = Arrays.isArray(params) ? params : Arrays.getKeys(params),
              value = Storage.get(name, defaults[name]) + '',
              position = keys.indexOf(value);
          position++;
          if (position >= keys.length) position = 0;
          position = Math.max(0, Math.min(keys.length - 1, position));
          value = keys[position];
          Storage.set(name, value);
          update$1(elem);
          if (onChange) onChange(value);
        }

        if (type == 'input') {
          Input.edit({
            elem: elem,
            name: name,
            value: elem.data('string') ? window.localStorage.getItem(name) || defaults[name] : Storage.get(name, defaults[name]) + ''
          }, function (new_value) {
            Storage.set(name, new_value);
            update$1(elem);
            if (onChange) onChange(new_value);
          });
        }

        if (type == 'button') {
          listener$1.send('button', {
            name: name
          });
        }

        if (type == 'add') {
          Input.edit({
            value: ''
          }, function (new_value) {
            if (new_value && Storage.add(name, new_value)) {
              displayAddItem(elem, new_value);
              listener$1.send('update_scroll');
            }
          });
        }

        if (type == 'select') {
          var _params = values[name];

          var _value = Storage.get(name, defaults[name]) + '';

          var items = [];

          for (var i in _params) {
            items.push({
              title: Lang.translate(_params[i]),
              value: i,
              selected: i == _value
            });
          }

          var enabled = Controller.enabled().name;
          Select.show({
            title: Lang.translate('title_choice'),
            items: items,
            onBack: function onBack() {
              Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              Storage.set(name, a.value);
              update$1(elem);
              Controller.toggle(enabled);
              if (onChange) onChange(a.value);
            }
          });
        }
      }).each(function () {
        if (!$(this).data('static')) update$1($(this));
      });

      if (elems.eq(0).data('type') == 'add') {
        displayAddList(elems.eq(0));
      }
    }
    /**
     * Добавить дополнительное полу
     * @param {object} elem 
     * @param {object} element 
     */


    function displayAddItem(elem, element) {
      var name = elem.data('name');
      var item = $('<div class="settings-param selector"><div class="settings-param__name">' + element + '</div>' + '</div>');
      item.on('hover:long', function () {
        var list = Storage.get(name, '[]');
        Arrays.remove(list, element);
        Storage.set(name, list);
        item.css({
          opacity: 0.5
        });
      });
      elem.after(item);
    }
    /**
     * Вывести дополнительные поля
     * @param {object} elem 
     */


    function displayAddList(elem) {
      var list = Storage.get(elem.data('name'), '[]');
      list.forEach(function (element) {
        displayAddItem(elem, element);
      });
      listener$1.send('update_scroll');
    }
    /**
     * Обновляет значения на элементе
     * @param {object} elem 
     */


    function update$1(elem) {
      var name = elem.data('name');
      var key = elem.data('string') ? window.localStorage.getItem(name) || defaults[name] : Storage.get(name, defaults[name] + '');
      var val = typeof values[name] == 'string' ? key : values[name][key] || values[name][defaults[name]];
      var plr = elem.attr('placeholder');
      if (!val && plr) val = plr;
      elem.find('.settings-param__value').text(Lang.translate(val));
    }
    /**
     * Получить значение параметра
     * @param {string} name 
     * @returns *
     */


    function field$1(name) {
      return Storage.get(name, defaults[name] + '');
    }
    /**
     * Добовляем селекторы
     */


    select$1('interface_size', {
      'small': '#{settings_param_interface_size_small}',
      'normal': '#{settings_param_interface_size_normal}'
    }, 'normal');
    select$1('poster_size', {
      'w200': '#{settings_param_poster_quality_low}',
      'w300': '#{settings_param_poster_quality_average}',
      'w500': '#{settings_param_poster_quality_high}'
    }, 'w200');
    select$1('parser_torrent_type', {
      'jackett': 'Jackett',
      'torlook': 'Torlook',
    '1337x': '1337x',
    'rarbg': 'Rarbg',
    'magnetdl': 'magnetDL'
    }, 'torlook');
    select$1('torlook_parse_type', {
      'native': '#{settings_param_parse_directly}',
      'site': '#{settings_param_parse_api}'
    }, 'native');
    select$1('background_type', {
      'complex': '#{settings_param_background_complex}',
      'simple': '#{settings_param_background_simple}',
      'poster': '#{settings_param_background_image}'
    }, 'simple');
    select$1('pages_save_total', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5'
    }, '5');
    select$1('player', {
      'inner': '#{settings_param_player_inner}'
    }, 'inner');
    select$1('torrserver_use_link', {
      'one': '#{settings_param_link_use_one}',
      'two': '#{settings_param_link_use_two}'
    }, 'one');
    select$1('subtitles_size', {
      'small': '#{settings_param_subtitles_size_small}',
      'normal': '#{settings_param_subtitles_size_normal}',
      'large': '#{settings_param_subtitles_size_bigger}'
    }, 'normal');
    select$1('screensaver_type', {
      'nature': '#{settings_param_screensaver_nature}',
      'chrome': 'ChromeCast'
    }, 'chrome');
    select$1('tmdb_lang', {
    'zh-CN': '#{settings_param_lang_zh}',
    'zh-HK': '繁體中文 - 香港',
    'zh-TW': '繁體中文 - 臺灣',
      'ru': '#{settings_param_lang_ru}',
      'uk': '#{settings_param_lang_uk}',
      'en': '#{settings_param_lang_en}'
    }, 'zh-CN');
    select$1('parse_lang', {
    'zh-CN': '#{settings_param_lang_zh}',
    'zh-HK': '繁體中文 - 香港',
    'zh-TW': '繁體中文 - 臺灣',
    'en': 'English',
      'df': '#{settings_param_torrent_lang_orig}',
      'ru': '#{settings_param_torrent_lang_ru}'
    }, 'df');
    select$1('player_timecode', {
      'again': '#{settings_param_player_timecode_again}',
      'continue': '#{settings_param_player_timecode_continue}',
      'ask': '#{settings_param_player_timecode_ask}'
    }, 'continue');
    select$1('player_scale_method', {
      'transform': 'Transform',
      'calculate': '#{settings_param_player_scale_method}'
    }, 'transform');
    select$1('player_hls_method', {
      'application': '#{settings_param_player_hls_app}',
      'hlsjs': '#{settings_param_player_hls_js}'
    }, 'hlsjs');
    select$1('source', {
      'tmdb': 'TMDB',
      'ivi': 'IVI',
      'okko': 'OKKO',
      'cub': 'CUB'
    }, 'tmdb');
    select$1('start_page', {
      'main': '#{title_main}',
      'favorite@book': '#{title_book}',
      'favorite@like': '#{title_like}',
      'favorite@wath': '#{title_wath}',
      'favorite@history': '#{title_history}',
      'mytorrents': '#{title_mytorrents}',
      'last': '#{title_last}'
    }, 'last');
    select$1('scroll_type', {
      'css': 'CSS',
      'js': 'Javascript'
    }, 'css');
    select$1('card_views_type', {
      'preload': '#{settings_param_card_view_load}',
      'view': '#{settings_param_card_view_all}'
    }, 'preload');
    select$1('navigation_type', {
      'controll': '#{settings_param_navigation_remote}',
      'mouse': '#{settings_param_navigation_mouse}'
    }, 'mouse');
    select$1('keyboard_type', {
      'lampa': '#{settings_param_keyboard_lampa}',
      'integrate': '#{settings_param_keyboard_system}'
    }, 'integrate');
    select$1('time_offset', {
      'n-5': '-5',
      'n-4': '-4',
      'n-3': '-3',
      'n-2': '-2',
      'n-1': '-1',
      'n0': '0',
      'n1': '1',
      'n2': '2',
      'n3': '3',
      'n4': '4',
      'n5': '5'
    }, 'n0');
    select$1('video_quality_default', {
      '480': '480p',
      '720': '720p',
      '1080': '1080p',
      '1440': '1440p',
      '2160': '2160p'
    }, '1080');
    /**
     * Добовляем триггеры
     */

    trigger('animation', true);
    trigger('background', true);
    trigger('torrserver_savedb', false);
    trigger('torrserver_preload', false);
    trigger('parser_use', false);
    trigger('cloud_use', false);
    trigger('account_use', false);
    trigger('torrserver_auth', false);
    trigger('mask', true);
    trigger('playlist_next', true);
    trigger('internal_torrclient', true);
    trigger('subtitles_stroke', true);
    trigger('subtitles_backdrop', false);
    trigger('screensaver', true);
    trigger('proxy_tmdb', true);
    trigger('proxy_other', true);
    trigger('parse_in_search', false);
    trigger('subtitles_start', false);
    trigger('helper', true);
    trigger('light_version', false);
    trigger('player_normalization', false);
    /**
     * Добовляем поля
     */

    select$1('jackett_url', '', '');
    select$1('jackett_key', '', '');
    select$1('torrserver_url', '', '');
    select$1('torrserver_url_two', '', '');
    select$1('torrserver_login', '', '');
    select$1('torrserver_password', '', '');
    select$1('parser_website_url', '', '');
    select$1('torlook_site', '', 'w41.torlook.info');
    select$1('cloud_token', '', '');
    select$1('account_email', '', '');
    select$1('account_password', '', '');
    select$1('device_name', '', 'Lampa');
    select$1('player_nw_path', '', 'C:/Program Files/VideoLAN/VLC/vlc.exe');
    var Params = {
      listener: listener$1,
      init: init$5,
      bind: bind,
      update: update$1,
      field: field$1,
      select: select$1,
      trigger: trigger
    };

    var listener = start$4();

    function get(name, empty) {
      var value = window.localStorage.getItem(name) || empty || '';
      var convert = parseInt(value);
      if (!isNaN(convert) && /^\d+$/.test(value)) return convert;

      if (value == 'true' || value == 'false') {
        return value == 'true' ? true : false;
      }

      try {
        value = JSON.parse(value);
      } catch (error) {}

      return value;
    }

    function value(name, empty) {
      return window.localStorage.getItem(name) || empty || '';
    }

    function set(name, value, nolisten) {
      try {
        if (Arrays.isObject(value) || Arrays.isArray(value)) {
          var str = JSON.stringify(value);
          window.localStorage.setItem(name, str);
        } else {
          window.localStorage.setItem(name, value);
        }
      } catch (e) {}

      if (!nolisten) listener.send('change', {
        name: name,
        value: value
      });
    }

    function add$2(name, new_value) {
      var list = get(name, '[]');

      if (list.indexOf(new_value) == -1) {
        list.push(new_value);
        set(name, list);
        listener.send('add', {
          name: name,
          value: new_value
        });
        return true;
      }
    }

    function field(name) {
      return Params.field(name);
    }

    function cache(name, max, empty) {
      var result = get(name, JSON.stringify(empty));

      if (Arrays.isObject(empty)) {
        var keys = Arrays.getKeys(result);

        if (keys.length > max) {
          var remv = keys.slice(0, keys.length - max);
          remv.forEach(function (k) {
            delete result[k];
          });
          set(name, result);
        }
      } else if (result.length > max) {
        result = result.slice(result.length - max);
        set(name, result);
      }

      return result;
    }

    var Storage = {
      listener: listener,
      get: get,
      set: set,
      field: field,
      cache: cache,
      add: add$2,
      value: value
    };

    var _lang_choice_title$la;

    var ru = (_lang_choice_title$la = {
      lang_choice_title: 'Добро пожаловать',
      lang_choice_subtitle: 'Выберите свой язык.',
      more: 'Еще',
      show_more: 'Показать ещё',
      more_results: 'Показать больше результатов',
      loading: 'Загрузка',
      nofind_movie: 'Не удалось найти фильм.',
      noname: 'Без названия',
      nochoice: 'Не выбрано',
      cancel: 'Отменить',
      confirm: 'Подтверждаю',
      sure: 'Вы уверены?',
      nodata: 'Нет данных',
      search: 'Поиск',
      search_input: 'Введите текст',
      search_empty: 'История поиска пуста.',
      search_delete: 'Влево - удалить',
      search_start_typing: 'Начните вводить текст для поиска.',
      search_searching: 'Идет поиск...',
      search_start: 'Начать поиск',
      full_genre: 'Жанр',
      full_production: 'Производство',
      full_date_of_release: 'Дата релиза',
      full_budget: 'Бюджет',
      full_countries: 'Страны',
      full_like: 'Нравится',
      full_torrents: 'Торренты',
      full_trailers: 'Трейлеры',
      full_detail: 'Подробно',
      full_notext: 'Без описания.',
      full_series_release: 'Выход серий',
      full_next_episode: 'Следующая',
      full_episode_days_left: 'Осталось дней',
      full_trailer_official: 'Официальный',
      full_trailer_no_official: 'Неофициальный',
      full_season: 'Cезон',
      full_episode: 'Эпизод',
      full_directing: 'Режиссура',
      settings_cub_sync: 'Синхронизация',
      settings_cub_sync_descr: 'Синхронизация с сервисом CUB: синхронизация ваших закладок, истории просмотров, меток и тайм-кодов. Сайт: https://cub.watch',
      settings_cub_account: 'Аккаунт',
      settings_cub_logged_in_as: 'Вошли как',
      settings_cub_profile: 'Профиль',
      settings_cub_sync_btn: 'Синхронизировать',
      settings_cub_sync_btn_descr: 'Сохранить локальные закладки в аккаунт CUB',
      settings_cub_backup: 'Бэкап',
      settings_cub_backup_descr: 'Сохранить или загрузить бэкап данных',
      settings_cub_logout: 'Выйти из аккаунта',
      settings_cub_signin: 'Авторизация',
      settings_cub_not_specified: 'Не указан',
      settings_cub_password: 'Пароль',
      settings_cub_status: 'Статус',
      settings_cub_backup_import: 'Импорт',
      settings_cub_backup_export: 'Экспорт',
      settings_input_links: 'Избранное',
      settings_interface_type: 'Облегчённая версия',
      settings_interface_size: 'Размер интерфейса',
      settings_interface_background: 'Фон',
      settings_interface_background_use: 'Показывать фон',
      settings_interface_background_type: 'Тип фона',
      settings_interface_performance: 'Быстродействие',
      settings_interface_animation: 'Анимация',
      settings_interface_animation_descr: 'Анимация карточек и контента',
      settings_interface_attenuation: 'Затухание',
      settings_interface_attenuation_descr: 'Плавное затухание карточек снизу и сверху',
      settings_interface_scroll: 'Тип скролинга',
      settings_interface_view_card: 'Тип просмотра карточек',
      settings_interface_view_card_descr: 'По мере скроллинга ленты карточки будут подгружаться постепенно или загружаться все',
      settings_interface_lang: 'Язык интерфейса',
      settings_interface_lang_reload: 'Необходимо перезагрузить приложение, нажмите "OK" для перезагрузки.',
      settings_main_account: 'Аккаунт',
      settings_main_interface: 'Интерфейс',
      settings_main_player: 'Плеер',
      settings_main_parser: 'Парсер',
      settings_main_torrserver: 'TorrServer',
      settings_main_plugins: 'Плагины',
      settings_main_rest: 'Остальное',
      settings_rest_start: 'Стартовая страница',
      settings_rest_start_descr: 'С какой страницы начинать при запуске',
      settings_rest_source: 'Источник',
      settings_rest_source_use: 'Основной источник',
      settings_rest_source_descr: 'Откуда брать информацию о фильмах',
      settings_rest_tmdb_lang: 'На каком языке отображать данные с TMDB',
      settings_rest_tmdb_prox: 'Проксировать TMDB',
      settings_rest_tmdb_posters: 'Разрешение постеров TMDB',
      settings_rest_screensaver: 'Скринсейвер',
      settings_rest_screensaver_use: 'Показывать заставку при бездействии',
      settings_rest_screensaver_type: 'Тип заставки',
      settings_rest_helper: 'Подсказки',
      settings_rest_helper_use: 'Показывать подсказки',
      settings_rest_helper_reset: 'Показать подсказки снова',
      settings_rest_pages: 'Сколько страниц хранить в памяти',
      settings_rest_pages_descr: 'Хранит страницы в том состоянии, в котором вы их покинули',
      settings_rest_time: 'Сместить время',
      settings_rest_navigation: 'Тип навигации',
      settings_rest_keyboard: 'Тип клавиатуры',
      settings_rest_device: 'Название устройства',
      settings_rest_device_placeholder: 'Например: Моя Лампа',
      settings_rest_cache: 'Очистить кэш',
      settings_rest_cache_descr: 'Будут очищены все настройки и данные',
      settings_parser_use: 'Использовать парсер',
      settings_parser_use_descr: 'Тем самым, вы соглашаетесь принять на себя всю ответственность за использование публичных ссылок для просмотра торрент и онлайн контента.',
      settings_parser_type: 'Тип парсера для торрентов',
      settings_parser_jackett_placeholder: 'Например: 192.168.х',
      settings_parser_jackett_link: 'Ссылка',
      settings_parser_jackett_link_descr: 'Укажите ссылку на скрипт Jackett',
      settings_parser_jackett_key_placeholder: 'Например: sa0sk83d..',
      settings_parser_jackett_key: 'Api ключ',
      settings_parser_jackett_key_descr: 'Находится в Jackett',
      settings_parser_torlook_type: 'Метод парсинга сайта TorLook',
      settings_parser_scraperapi_placeholder: 'Например: scraperapi.com',
      settings_parser_scraperapi_link: 'Ссылка на парсер сайтов',
      settings_parser_scraperapi_descr: 'Зарегистрируйтесь на сайте scraperapi.com, введите ссылку api.scraperapi.com?api_key=...&url={q}<br>В {q} будет поставляться сайт w41.torlook.info',
      settings_parser_search: 'Поиск',
      settings_parser_search_descr: 'На каком языке производить поиск?',
      settings_parser_in_search: 'Парсер в поиске',
      settings_parser_in_search_descr: 'Показывать результаты в поиске?',
      settings_player_type: 'Тип плеера',
      settings_player_type_descr: 'Каким плеером воспроизводить',
      settings_player_reset: 'Сбросить плеер по умолчанию',
      settings_player_reset_descr: 'Сбрасывает выбранный Android плеер в приложении',
      settings_player_path: 'Путь к плееру',
      settings_player_path_descr: 'Укажите путь к плееру .exe',
      settings_player_normalization: 'Нормализация звука',
      settings_player_normalization_descr: 'Нормализирует звук в один уровень, понижает громкие звуки и повышает тихие.',
      settings_player_next_episode: 'Следующая серия',
      settings_player_next_episode_descr: 'Автоматически переключать на следующую серию по окончании текущей',
      settings_player_timecode: 'Тайм-код',
      settings_player_timecode_descr: 'Продолжить с последнего места просмотра',
      settings_player_scale: 'Метод масштабирования',
      settings_player_scale_descr: 'Каким образом производить вычисления для масштабирования видео',
      settings_player_subs: 'Субтитры',
      settings_player_subs_use: 'Включить',
      settings_player_subs_use_descr: 'Всегда включать субтитры после запуска видео',
      settings_player_subs_size: 'Размер',
      settings_player_subs_size_descr: 'Размер субтитров на экране',
      settings_player_subs_stroke_use: 'Использовать окантовку',
      settings_player_subs_stroke_use_descr: 'Субтитры будут обведены черным цветом для улучшения читаемости',
      settings_player_subs_backdrop_use: 'Использовать подложку',
      settings_player_subs_backdrop_use_descr: 'Субтитры будут отображаться на полупрозрачной подложке для улучшения читаемости',
      settings_player_quality: 'Качество видео по умолчанию',
      settings_player_quality_descr: 'Предпочтительное качество видео для просмотра',
      settings_plugins_notice: 'Для применения плагина необходимо перезагрузить приложение',
      settings_plugins_add: 'Добавить плагин',
      settings_plugins_add_descr: 'Для удаления добавленного плагина удерживайте или нажмите дважды клавишу (OK) на нем',
      settings_plugins_install: 'Установить плагин',
      settings_plugins_install_descr: 'Установить плагин из списка доступных',
      settings_server_link: 'Использовать ссылку',
      settings_server_links: 'Ссылки',
      settings_server_placeholder: 'Например: 192.168.х',
      settings_server_link_one: 'Основная ссылка',
      settings_server_link_one_descr: 'Укажите основную ссылку на скрипт TorrServer',
      settings_server_link_two: 'Дополнительная ссылка',
      settings_server_link_two_descr: 'Укажите дополнительную ссылку на скрипт TorrServer',
      settings_server_additionally: 'Дополнительно',
      settings_server_client: 'Встроенный клиент',
      settings_server_client_descr: 'Использовать встроенный JS-клиент TorrServe, иначе запускается системный.',
      settings_server_base: 'Сохранить в базу',
      settings_server_base_descr: 'Торрент будет добавлен в базу TorrServer',
      settings_server_preload: 'Использовать буфер пред.загрузки',
      settings_server_preload_descr: 'Дожидаться заполнения буфера предварительной загрузки TorrServer перед проигрыванием',
      settings_server_auth: 'Авторизация',
      settings_server_password_use: 'Вход по паролю',
      settings_server_login: 'Логин',
      settings_server_password: 'Пароль',
      settings_server_not_specified: 'Не указан',
      torent_nohash_reasons: 'Причины',
      torent_nohash_reason_one: 'TorServer не смог скачать торрент файл',
      torent_nohash_reason_two: 'Ответ от TorServer',
      torent_nohash_reason_three: 'Ссылка',
      torent_nohash_do: 'Что делать?',
      torent_nohash_do_one: 'Проверьте правильно ли вы настроили Jackett',
      torent_nohash_do_two: 'Приватные источники могут не выдавать ссылку на файл',
      torent_nohash_do_three: 'Убедитесь что Jackett тоже может скачать файл',
      torent_nohash_do_four: 'Написать в нашу телеграм группу: @lampa_group',
      torent_nohash_do_five: 'Укажите какой фильм, какая раздача и по возможности фото этой раздачи',
      torrent_error_text: 'Не удалось подключиться к TorrServe. Давайте быстро пройдёмся по списку возможных проблем и всё проверим.',
      torrent_error_step_1: 'Запущен ли TorrServe',
      torrent_error_step_2: 'Динамический IP-адрес',
      torrent_error_step_3: 'Протокол и порт',
      torrent_error_step_4: 'Блокировка антивирусами',
      torrent_error_step_5: 'Проверьте на доступность',
      torrent_error_step_6: 'Все равно не работает',
      torrent_error_info_1: 'Убедитесь, что вы запустили TorrServe на устройстве, где он установлен.',
      torrent_error_info_2: 'Частая ошибка, изменился IP-адрес устройства с TorrServe. Убедитесь, что IP-адрес, который вы ввели - {ip}, совпадает с адресом устройства, на котором установлен TorrServe.',
      torrent_error_info_3: 'Для подключения к TorrServe, необходимо указать протокол http:// в начале и порт :8090 в конце адреса. Убедитесь, что после IP-адреса указан порт, ваш текущий адрес - {ip}',
      torrent_error_info_4: 'Частое явление, антивирус или брандмауэр может блокировать доступ по IP-адресу, попробуйте отключить антивирус и брандмауэр.',
      torrent_error_info_5: 'На любом другом устройстве в этой же сети, откройте в браузере адрес {ip} и проверьте, доступен ли веб-интерфейс TorrServe.',
      torrent_error_info_6: 'Если после всех проверок всё равно возникает ошибка подключения, попробуйте перезагрузить TorrServe и интернет-адаптер.',
      torrent_error_info_7: 'Если проблема не устранена, пишите в Telegram-группу @lampa_group с текстом (Lampa не подключается к TorrServe после всех проверок, текущий адрес {ip})',
      torrent_error_start: 'Начать проверку',
      torrent_error_nomatrix: 'Не удалось подтвердить версию Matrix',
      torrent_error_made: 'Выполнено',
      torrent_error_from: 'из',
      torrent_error_next: 'Далее',
      torrent_error_complite: 'Завершить',
      torrent_error_connect: 'Ошибка подключения',
      torrent_install_need: 'Необходим TorrServe',
      torrent_install_text: 'TorrServe – приложение, которое позволяет просматривать контент из торрент-файлов в онлайн режиме.<br><br>Более детальную информацию по установке вы найдете в Telegram-группах, указанных ниже.',
      torrent_install_contact: 'Telegram-группы',
      torrent_item_bitrate: 'Битрейт',
      torrent_item_seeds: 'Раздают',
      torrent_item_grabs: 'Качают',
      torrent_item_mb: 'Мбит/с',
      torrent_serial_episode: 'Серия',
      torrent_serial_season: 'Сезон',
      torrent_serial_date: 'Выход',
      torrent_get_magnet: 'Запрашиваю magnet ссылку',
      torrent_remove_title: 'Удалить',
      torrent_remove_descr: 'Торрент будет удален из вашего списка',
      torrent_parser_any_one: 'Любое',
      torrent_parser_any_two: 'Любой',
      torrent_parser_no_choice: 'Не выбрано',
      torrent_parser_yes: 'Да',
      torrent_parser_no: 'Нет',
      torrent_parser_quality: 'Качество',
      torrent_parser_subs: 'Субтитры',
      torrent_parser_voice: 'Перевод',
      torrent_parser_tracker: 'Трекер',
      torrent_parser_year: 'Год',
      torrent_parser_season: 'Сезон',
      torrent_parser_sort_by_seeders: 'По раздающим',
      torrent_parser_sort_by_size: 'По размеру',
      torrent_parser_sort_by_name: 'По названию',
      torrent_parser_sort_by_tracker: 'По источнику',
      torrent_parser_sort_by_date: 'По дате',
      torrent_parser_sort_by_viewed: 'По просмотренным',
      torrent_parser_voice_dubbing: 'Дубляж',
      torrent_parser_voice_polyphonic: 'Многоголосый',
      torrent_parser_voice_two: 'Двухголосый',
      torrent_parser_voice_amateur: 'Любительский',
      torrent_parser_reset: 'Сбросить фильтр',
      torrent_parser_empty: 'Не удалось получить результатов',
      torrent_parser_no_hash: 'Не удалось получить HASH',
      torrent_parser_added_to_mytorrents: 'добавлено в «Мои торренты»',
      torrent_parser_add_to_mytorrents: 'Добавить в «Мои торренты»',
      torrent_parser_label_title: 'Пометить',
      torrent_parser_label_descr: 'Пометить раздачу с флагом (просмотрено)',
      torrent_parser_label_cancel_title: 'Снять отметку',
      torrent_parser_label_cancel_descr: 'Снять отметку с раздачи (просмотрено)',
      torrent_parser_timeout: 'Время ожидания истекло',
      torrent_parser_nofiles: 'Не удалось извлечь подходящие файлы',
      torrent_parser_set_link: 'Укажите ссылку для парсинга',
      torrent_parser_request_error: 'Ошибка в запросе',
      torrent_parser_magnet_error: 'Не удалось получить magnet ссылку',
      about_text: 'Приложение полностью бесплатное и использует публичные ссылки для получения информации о видео, новинках, популярных фильмах и т.д. Вся доступная информация используется исключительно в познавательных целях, приложение не использует свои собственные серверы для распространения информации.',
      about_channel: 'Наш канал',
      about_group: 'Группа',
      about_version: 'Версия',
      about_donate: 'Донат',
      title_watched: 'Вы смотрели',
      title_settings: 'Настройки',
      title_collections: 'Подборки',
      title_collections_ivi: 'Подборки на ivi',
      title_collections_okko: 'Подборки на okko',
      title_company: 'Компания',
      title_actors: 'Актеры',
      title_actor: 'Актер',
      title_actress: 'Актриса',
      title_person: 'Персона',
      title_comments: 'Комментарии',
      title_torrents: 'Торренты',
      title_trailers: 'Трейлеры',
      title_watch: 'Смотреть',
      title_error: 'Ошибка',
      title_links: 'Ссылки',
      title_choice: 'Выбрать',
      title_main: 'Главная',
      title_book: 'Закладки',
      title_like: 'Нравится',
      title_wath: 'Позже',
      title_history: 'История просмотров',
      title_mytorrents: 'Мои торренты',
      title_last: 'Последняя',
      title_action: 'Действие',
      title_producer: 'Режиссер',
      title_collection: 'Коллекция',
      title_recomendations: 'Рекомендации',
      title_similar: 'Похожие',
      title_about: 'О приложении',
      title_timetable: 'Расписание',
      title_relises: 'Цифровые релизы',
      title_catalog: 'Каталог',
      title_category: 'Категория',
      title_parser: 'Парсер',
      title_type: 'Тип',
      title_rating: 'Рейтинг',
      title_country: 'Страна',
      title_year: 'Год',
      title_genre: 'Жанр',
      title_filter: 'Фильтр',
      title_notice: 'Уведомления',
      title_files: 'Файлы',
      title_now_watch: 'Сейчас смотрят',
      title_latest: 'Последнее добавление',
      title_continue: 'Продолжить просмотр',
      title_recomend_watch: 'Рекомендуем посмотреть',
      title_new_episodes: 'Новые серии',
      title_popular: 'Популярное',
      title_popular_movie: 'Популярные фильмы',
      title_popular_tv: 'Популярные сериалы',
      title_new_this_year: 'Новинки этого года',
      title_hight_voite: 'С высоким рейтингом',
      title_new: 'Новинки',
      title_trend_day: 'Сегодня в тренде',
      title_trend_week: 'В тренде за неделю',
      title_upcoming: 'Смотрите в кинозалах',
      title_top_movie: 'Топ фильмы',
      title_top_tv: 'Топ сериалы',
      title_tv_today: 'Сегодня в эфире',
      title_this_week: 'На этой неделе',
      title_in_top: 'В топе',
      title_out: 'Выход',
      title_out_confirm: 'Да, выйти',
      title_continue_two: 'Продолжить',
      company_headquarters: 'Штаб',
      company_homepage: 'Сайт',
      company_country: 'Страна',
      filter_clarify: 'Уточнить',
      filter_clarify_two: 'Уточнить поиск',
      filter_set_name: 'Указать название',
      filter_sorted: 'Сортировать',
      filter_filtred: 'Фильтр',
      filter_any: 'Любой',
      filter_rating_from: 'от',
      filter_rating_to: 'до',
      filter_country_uk: 'Украина',
      filter_country_en: 'США',
      filter_country_ru: 'Россия',
      filter_country_ja: 'Япония',
      filter_country_ko: 'Корея',
      filter_country_az: 'Азербайджан',
      filter_country_sq: 'Албания',
      filter_country_be: 'Беларусь',
      filter_country_bg: 'Болгария',
      filter_country_de: 'Германия',
      filter_country_ka: 'Грузия',
      filter_country_da: 'Дания',
      filter_country_et: 'Естония',
      filter_country_ga: 'Ирландия',
      filter_country_es: 'Испания',
      filter_country_it: 'Италия',
      filter_country_zh: 'Китай',
      filter_country_lv: 'Латвия',
      filter_country_ne: 'Непал',
      filter_country_no: 'Норвегия',
      filter_country_pl: 'Польша',
      filter_country_ro: 'Румыния',
      filter_country_sr: 'Сербия',
      filter_country_sk: 'Словакия',
      filter_country_sl: 'Словения',
      filter_country_tg: 'Таджикистан',
      filter_country_tr: 'Турция',
      filter_country_uz: 'Узбекистан',
      filter_country_fi: 'Финляндия',
      filter_country_fr: 'Франция',
      filter_country_hr: 'Хорватия',
      filter_country_cs: 'Чешская Республика',
      filter_country_sv: 'Швеция'
    }, _defineProperty(_lang_choice_title$la, "filter_country_et", 'Эстония'), _defineProperty(_lang_choice_title$la, "filter_genre_ac", 'Боевик'), _defineProperty(_lang_choice_title$la, "filter_genre_ad", 'Приключения'), _defineProperty(_lang_choice_title$la, "filter_genre_mv", 'Мультфильм'), _defineProperty(_lang_choice_title$la, "filter_genre_cm", 'Комедия'), _defineProperty(_lang_choice_title$la, "filter_genre_cr", 'Криминал'), _defineProperty(_lang_choice_title$la, "filter_genre_dc", 'Документальный'), _defineProperty(_lang_choice_title$la, "filter_genre_dr", 'Драма'), _defineProperty(_lang_choice_title$la, "filter_genre_fm", 'Семейный'), _defineProperty(_lang_choice_title$la, "filter_genre_fe", 'Фэнтези'), _defineProperty(_lang_choice_title$la, "filter_genre_hi", 'История'), _defineProperty(_lang_choice_title$la, "filter_genre_ho", 'Ужасы'), _defineProperty(_lang_choice_title$la, "filter_genre_mu", 'Музыка'), _defineProperty(_lang_choice_title$la, "filter_genre_de", 'Детектив'), _defineProperty(_lang_choice_title$la, "filter_genre_md", 'Мелодрама'), _defineProperty(_lang_choice_title$la, "filter_genre_fa", 'Фантастика'), _defineProperty(_lang_choice_title$la, "filter_genre_tv", 'Телевизионный фильм'), _defineProperty(_lang_choice_title$la, "filter_genre_tr", 'Триллер'), _defineProperty(_lang_choice_title$la, "filter_genre_mi", 'Военный'), _defineProperty(_lang_choice_title$la, "filter_genre_ve", 'Вестерн'), _defineProperty(_lang_choice_title$la, "filter_genre_aa", 'Боевик и Приключения'), _defineProperty(_lang_choice_title$la, "filter_genre_ch", 'Детский'), _defineProperty(_lang_choice_title$la, "filter_genre_nw", 'Новости'), _defineProperty(_lang_choice_title$la, "filter_genre_rs", 'Реалити-шоу'), _defineProperty(_lang_choice_title$la, "filter_genre_hf", 'НФ и Фэнтези'), _defineProperty(_lang_choice_title$la, "filter_genre_op", 'Мыльная опера'), _defineProperty(_lang_choice_title$la, "filter_genre_tc", 'Ток-шоу'), _defineProperty(_lang_choice_title$la, "filter_genre_mp", 'Война и Политика'), _defineProperty(_lang_choice_title$la, "ivi_premieres", 'Премьеры фильмов'), _defineProperty(_lang_choice_title$la, "ivi_best", 'Лучшие фильмы'), _defineProperty(_lang_choice_title$la, "ivi_popular", 'Популярное сейчас'), _defineProperty(_lang_choice_title$la, "ivi_choice", 'Выбор ivi'), _defineProperty(_lang_choice_title$la, "ivi_new", 'Новинки'), _defineProperty(_lang_choice_title$la, "ivi_foreign", 'Зарубежные'), _defineProperty(_lang_choice_title$la, "ivi_ru", 'Русские'), _defineProperty(_lang_choice_title$la, "ivi_popular", 'Популярное сейчас'), _defineProperty(_lang_choice_title$la, "ivi_recomend", 'Рекомендуем вам посмотреть'), _defineProperty(_lang_choice_title$la, "ivi_for_famaly", 'Мультики для всей семьи'), _defineProperty(_lang_choice_title$la, "ivi_triller", 'Триллеры-ужасы'), _defineProperty(_lang_choice_title$la, "ivi_advance", 'Приключенческие комедии'), _defineProperty(_lang_choice_title$la, "ivi_detective", 'Экранизации детективов'), _defineProperty(_lang_choice_title$la, "ivi_crime_comedy", 'Криминальные комедии'), _defineProperty(_lang_choice_title$la, "ivi_romantic", 'Романтические драмы'), _defineProperty(_lang_choice_title$la, "ivi_crime_dramas", 'Криминальные драмы'), _defineProperty(_lang_choice_title$la, "ivi_fantastic_dramas", 'Фантастические драмы'), _defineProperty(_lang_choice_title$la, "ivi_military_dramas", 'Военные драмы'), _defineProperty(_lang_choice_title$la, "ivi_mistic", 'Мистические фильмы'), _defineProperty(_lang_choice_title$la, "ivi_foreign_series", 'Зарубежные сериалы'), _defineProperty(_lang_choice_title$la, "ivi_historical_series", 'Исторические сериалы'), _defineProperty(_lang_choice_title$la, "okko_top_new", 'Топ-новинки'), _defineProperty(_lang_choice_title$la, "okko_comedy_horror", 'Комедийные фильмы ужасов'), _defineProperty(_lang_choice_title$la, "okko_collection_maniacs", 'Фильмы про маньяков'), _defineProperty(_lang_choice_title$la, "okko_witches", 'Фильмы про ведьм'), _defineProperty(_lang_choice_title$la, "okko_zombies", 'Фильмы про зомби'), _defineProperty(_lang_choice_title$la, "okko_ru", 'Русские'), _defineProperty(_lang_choice_title$la, "okko_horror_serial", 'Очень страшные'), _defineProperty(_lang_choice_title$la, "okko_serial_killers", 'Про маньяков'), _defineProperty(_lang_choice_title$la, "okko_humor_serial", 'С чёрным юмором'), _defineProperty(_lang_choice_title$la, "okko_legkiye_serialy", 'Лёгкие'), _defineProperty(_lang_choice_title$la, "okko_comedy_serial", 'Комедийные'), _defineProperty(_lang_choice_title$la, "okko_ru_tv", 'Русские'), _defineProperty(_lang_choice_title$la, "empty_title", 'Пусто'), _defineProperty(_lang_choice_title$la, "empty_text", 'По вашему фильтру ничего не нашлось, уточните фильтр.'), _defineProperty(_lang_choice_title$la, "empty_title_two", 'Здесь пусто'), _defineProperty(_lang_choice_title$la, "empty_text_two", 'На данный момент список пустой'), _defineProperty(_lang_choice_title$la, "menu_main", 'Главная'), _defineProperty(_lang_choice_title$la, "menu_movies", 'Фильмы'), _defineProperty(_lang_choice_title$la, "menu_tv", 'Сериалы'), _defineProperty(_lang_choice_title$la, "menu_catalog", 'Каталог'), _defineProperty(_lang_choice_title$la, "menu_filter", 'Фильтр'), _defineProperty(_lang_choice_title$la, "menu_collections", 'Подборки'), _defineProperty(_lang_choice_title$la, "menu_relises", 'Релизы'), _defineProperty(_lang_choice_title$la, "menu_anime", 'Аниме'), _defineProperty(_lang_choice_title$la, "menu_bookmark", 'Закладки'), _defineProperty(_lang_choice_title$la, "menu_like", 'Нравится'), _defineProperty(_lang_choice_title$la, "menu_time", 'Позже'), _defineProperty(_lang_choice_title$la, "menu_history", 'История'), _defineProperty(_lang_choice_title$la, "menu_timeline", 'Расписание'), _defineProperty(_lang_choice_title$la, "menu_torrents", 'Торренты'), _defineProperty(_lang_choice_title$la, "menu_settings", 'Настройки'), _defineProperty(_lang_choice_title$la, "menu_about", 'Информация'), _defineProperty(_lang_choice_title$la, "menu_console", 'Консоль'), _defineProperty(_lang_choice_title$la, "menu_multmovie", 'Мультфильмы'), _defineProperty(_lang_choice_title$la, "menu_multtv", 'Мультсериалы'), _defineProperty(_lang_choice_title$la, "plugins_catalog_work", 'Рабочие плагины'), _defineProperty(_lang_choice_title$la, "plugins_catalog_work_descr", 'Плагины, которые точно работают в лампе.'), _defineProperty(_lang_choice_title$la, "plugins_catalog_popular", 'Популярные плагины среди пользователей'), _defineProperty(_lang_choice_title$la, "plugins_catalog_popular_descr", 'Установка из неизвестных источников может привести к некорректной работе приложения.'), _defineProperty(_lang_choice_title$la, "plugins_online", 'Просмотр онлайн'), _defineProperty(_lang_choice_title$la, "plugins_check_fail", 'Не удалось проверить работоспособность плагина. Однако это не означает, что плагин не работает. Перезагрузите приложение для выяснения, загружается ли плагин.'), _defineProperty(_lang_choice_title$la, "plugins_need_reload", 'Для применения плагина необходимо перезагрузить приложение'), _defineProperty(_lang_choice_title$la, "plugins_install", 'Установить'), _defineProperty(_lang_choice_title$la, "plugins_install_ready", 'Этот плагин уже установлен.'), _defineProperty(_lang_choice_title$la, "plugins_installed", 'Установок'), _defineProperty(_lang_choice_title$la, "plugins_load_from", 'Загружено из CUB'), _defineProperty(_lang_choice_title$la, "plugins_ok_for_check", 'Нажмите (OK) для проверки плагина'), _defineProperty(_lang_choice_title$la, "plugins_no_loaded", 'При загрузке приложения, часть плагинов не удалось загрузить'), _defineProperty(_lang_choice_title$la, "time_viewed", 'Просмотрено'), _defineProperty(_lang_choice_title$la, "time_from", 'из'), _defineProperty(_lang_choice_title$la, "time_reset", 'Сбросить тайм-код'), _defineProperty(_lang_choice_title$la, "settings_clear_cache", 'Кеш и данные очищены'), _defineProperty(_lang_choice_title$la, "settings_user_links", 'Пользовательская ссылка'), _defineProperty(_lang_choice_title$la, "settings_for_local", 'Для локального TorrServer'), _defineProperty(_lang_choice_title$la, "settings_add", 'Добавить'), _defineProperty(_lang_choice_title$la, "settings_remove", 'Удалить'), _defineProperty(_lang_choice_title$la, "settings_this_value", 'текущее значение'), _defineProperty(_lang_choice_title$la, "settings_added", 'Добавлено'), _defineProperty(_lang_choice_title$la, "settings_removed", 'Удалено'), _defineProperty(_lang_choice_title$la, "settings_param_player_inner", 'Встроенный'), _defineProperty(_lang_choice_title$la, "settings_param_player_outside", 'Внешний'), _defineProperty(_lang_choice_title$la, "settings_param_yes", 'Да'), _defineProperty(_lang_choice_title$la, "settings_param_no", 'Нет'), _defineProperty(_lang_choice_title$la, "settings_param_interface_size_small", 'Меньше'), _defineProperty(_lang_choice_title$la, "settings_param_interface_size_normal", 'Нормальный'), _defineProperty(_lang_choice_title$la, "settings_param_poster_quality_low", 'Низкое'), _defineProperty(_lang_choice_title$la, "settings_param_poster_quality_average", 'Среднее'), _defineProperty(_lang_choice_title$la, "settings_param_poster_quality_high", 'Высокое'), _defineProperty(_lang_choice_title$la, "settings_param_parse_directly", 'Напрямую'), _defineProperty(_lang_choice_title$la, "settings_param_parse_api", 'Через API сайта'), _defineProperty(_lang_choice_title$la, "settings_param_background_complex", 'Сложный'), _defineProperty(_lang_choice_title$la, "settings_param_background_simple", 'Простой'), _defineProperty(_lang_choice_title$la, "settings_param_background_image", 'Картинка'), _defineProperty(_lang_choice_title$la, "settings_param_link_use_one", 'Основную'), _defineProperty(_lang_choice_title$la, "settings_param_link_use_two", 'Дополнительную'), _defineProperty(_lang_choice_title$la, "settings_param_subtitles_size_small", 'Маленькие'), _defineProperty(_lang_choice_title$la, "settings_param_subtitles_size_normal", 'Обычные'), _defineProperty(_lang_choice_title$la, "settings_param_subtitles_size_bigger", 'Большие'), _defineProperty(_lang_choice_title$la, "settings_param_screensaver_nature", 'Природа'), _defineProperty(_lang_choice_title$la, "settings_param_lang_ru", 'Русский'), _defineProperty(_lang_choice_title$la, "settings_param_lang_uk", 'Українська'), _defineProperty(_lang_choice_title$la, "settings_param_lang_en", 'English'), _defineProperty(_lang_choice_title$la, "settings_param_torrent_lang_orig", 'Оригинал'), _defineProperty(_lang_choice_title$la, "settings_param_torrent_lang_ru", 'Русский'), _defineProperty(_lang_choice_title$la, "settings_param_player_timecode_again", 'Начать с начала'), _defineProperty(_lang_choice_title$la, "settings_param_player_timecode_continue", 'Продолжить'), _defineProperty(_lang_choice_title$la, "settings_param_player_timecode_ask", 'Спрашивать'), _defineProperty(_lang_choice_title$la, "settings_param_player_scale_method", 'Рассчитать'), _defineProperty(_lang_choice_title$la, "settings_param_card_view_load", 'Подгружать'), _defineProperty(_lang_choice_title$la, "settings_param_card_view_all", 'Показать все'), _defineProperty(_lang_choice_title$la, "settings_param_navigation_remote", 'Пульт'), _defineProperty(_lang_choice_title$la, "settings_param_navigation_mouse", 'Пульт с мышкой'), _defineProperty(_lang_choice_title$la, "settings_param_keyboard_lampa", 'Встроенная'), _defineProperty(_lang_choice_title$la, "settings_param_keyboard_system", 'Системная'), _defineProperty(_lang_choice_title$la, "helper_keyboard", 'После ввода значения нажмите кнопку «Назад» для сохранения'), _defineProperty(_lang_choice_title$la, "helper_torrents", 'Удерживайте клавишу (ОК) для вызова контекстного меню'), _defineProperty(_lang_choice_title$la, "helper_cleared", 'Успешно, подсказки будут показаны заново.'), _defineProperty(_lang_choice_title$la, "helper_torrents_view", 'Для сброса тайм-кода и вызова меню удерживайте клавишу (ОК)'), _defineProperty(_lang_choice_title$la, "fav_sync_title", 'Синхронизация закладок'), _defineProperty(_lang_choice_title$la, "fav_sync_text", 'Хочешь чтобы твои любимые закладки были на всех твоих устройствах? <br><br>Зарегистрируйся на сайте www.cub.watch, создай профиль и авторизуйся в лампе.'), _defineProperty(_lang_choice_title$la, "fav_sync_site", 'Сайт'), _defineProperty(_lang_choice_title$la, "fav_remove_title", 'Удалить из истории'), _defineProperty(_lang_choice_title$la, "fav_remove_descr", 'Удалить выделенную карточку'), _defineProperty(_lang_choice_title$la, "fav_clear_title", 'Очистить историю'), _defineProperty(_lang_choice_title$la, "fav_clear_descr", 'Удалить все карточки из истории'), _defineProperty(_lang_choice_title$la, "fav_clear_label_title", 'Очистить метки'), _defineProperty(_lang_choice_title$la, "fav_clear_label_descr", 'Очистить метки о просмотрах'), _defineProperty(_lang_choice_title$la, "fav_clear_time_title", 'Очистить тайм-коды'), _defineProperty(_lang_choice_title$la, "fav_clear_time_descr", 'Очистить все тайм-коды'), _defineProperty(_lang_choice_title$la, "fav_label_cleared", 'Отметки очищены'), _defineProperty(_lang_choice_title$la, "fav_time_cleared", 'Тайм-коды очищены'), _defineProperty(_lang_choice_title$la, "timetable_empty", 'В этом разделе будут отображаться даты выхода новых серий'), _defineProperty(_lang_choice_title$la, "player_quality", 'Качество'), _defineProperty(_lang_choice_title$la, "player_tracks", 'Аудиодорожки'), _defineProperty(_lang_choice_title$la, "player_disabled", 'Отключено'), _defineProperty(_lang_choice_title$la, "player_unknown", 'Неизвестно'), _defineProperty(_lang_choice_title$la, "player_subs", 'Субтитры'), _defineProperty(_lang_choice_title$la, "player_size_default_title", 'По умолчанию'), _defineProperty(_lang_choice_title$la, "player_size_default_descr", 'Размер видео по умолчанию'), _defineProperty(_lang_choice_title$la, "player_size_cover_title", 'Расширить'), _defineProperty(_lang_choice_title$la, "player_size_cover_descr", 'Расширяет видео на весь экран'), _defineProperty(_lang_choice_title$la, "player_size_fill_title", 'Заполнить'), _defineProperty(_lang_choice_title$la, "player_size_fill_descr", 'Вместить видео на весь экран'), _defineProperty(_lang_choice_title$la, "player_size_115_title", 'Увеличить 115%'), _defineProperty(_lang_choice_title$la, "player_size_115_descr", 'Увеличить видео на 115%'), _defineProperty(_lang_choice_title$la, "player_size_130_title", 'Увеличить 130%'), _defineProperty(_lang_choice_title$la, "player_size_130_descr", 'Увеличить видео на 130%'), _defineProperty(_lang_choice_title$la, "player_size_v115_title", 'По вертикали 115%'), _defineProperty(_lang_choice_title$la, "player_size_v115_descr", 'Увеличить видео на 115%'), _defineProperty(_lang_choice_title$la, "player_size_v130_title", 'По вертикали 130%'), _defineProperty(_lang_choice_title$la, "player_size_v130_descr", 'Увеличить видео на 130%'), _defineProperty(_lang_choice_title$la, "player_video_size", 'Размер видео'), _defineProperty(_lang_choice_title$la, "player_playlist", 'Плейлист'), _defineProperty(_lang_choice_title$la, "player_error_one", 'Не удалось декодировать видео'), _defineProperty(_lang_choice_title$la, "player_error_two", 'Видео не найдено или повреждено'), _defineProperty(_lang_choice_title$la, "player_start_from", 'Продолжить просмотр с'), _defineProperty(_lang_choice_title$la, "player_not_found", 'Плеер не найден'), _defineProperty(_lang_choice_title$la, "player_lauch", 'Запустить плеер'), _defineProperty(_lang_choice_title$la, "broadcast_open", 'Открыть карточку на другом устройстве'), _defineProperty(_lang_choice_title$la, "broadcast_play", 'Выберите устройство на котором смотреть'), _defineProperty(_lang_choice_title$la, "card_new_episode", 'Новая серия'), _defineProperty(_lang_choice_title$la, "card_book_remove", 'Убрать из закладок'), _defineProperty(_lang_choice_title$la, "card_book_add", 'В закладки'), _defineProperty(_lang_choice_title$la, "card_book_descr", 'Смотрите в меню (Закладки)'), _defineProperty(_lang_choice_title$la, "card_like_remove", 'Убрать из понравившихся'), _defineProperty(_lang_choice_title$la, "card_like_add", 'Нравится'), _defineProperty(_lang_choice_title$la, "card_like_descr", 'Смотрите в меню (Нравится)'), _defineProperty(_lang_choice_title$la, "card_wath_remove", 'Убрать из ожидаемых'), _defineProperty(_lang_choice_title$la, "card_wath_add", 'Смотреть позже'), _defineProperty(_lang_choice_title$la, "card_wath_descr", 'Смотрите в меню (Позже)'), _defineProperty(_lang_choice_title$la, "card_history_remove", 'Убрать из истории'), _defineProperty(_lang_choice_title$la, "card_history_add", 'Добавить в историю'), _defineProperty(_lang_choice_title$la, "card_history_descr", 'Смотрите в меню (История)'), _defineProperty(_lang_choice_title$la, "keyboard_listen", 'Говорите, я слушаю...'), _defineProperty(_lang_choice_title$la, "keyboard_nomic", 'Нет доступа к микрофону'), _defineProperty(_lang_choice_title$la, "notice_new_quality", 'Доступно новое качество'), _defineProperty(_lang_choice_title$la, "notice_quality", 'Качество'), _defineProperty(_lang_choice_title$la, "notice_new_episode", 'Новая серия'), _defineProperty(_lang_choice_title$la, "notice_none", 'У вас еще нет никаких уведомлений, зарегистрируйтесь на сайте <b>www.cub.watch</b>, чтобы следить за новыми сериями и релизами.'), _defineProperty(_lang_choice_title$la, "notice_in_quality", 'В качестве'), _defineProperty(_lang_choice_title$la, "copy_link", 'Копировать ссылку на видео'), _defineProperty(_lang_choice_title$la, "copy_secuses", 'Ссылка скопирована в буфер обмена'), _defineProperty(_lang_choice_title$la, "copy_error", 'Ошибка при копирование ссылки'), _defineProperty(_lang_choice_title$la, "account_sync_to_profile", 'Все закладки будут перенесены в профиль'), _defineProperty(_lang_choice_title$la, "account_sync_secuses", 'Все закладки успешно перенесены'), _defineProperty(_lang_choice_title$la, "account_profiles", 'Профили'), _defineProperty(_lang_choice_title$la, "account_profiles_empty", 'Не удалось получить список профилей'), _defineProperty(_lang_choice_title$la, "account_authorized", 'Авторизованы'), _defineProperty(_lang_choice_title$la, "account_logged_in", 'Вы вошли под аккаунтом'), _defineProperty(_lang_choice_title$la, "account_login_failed", 'Вход не выполнен'), _defineProperty(_lang_choice_title$la, "account_login_wait", 'Ожидаем входа в аккаунт'), _defineProperty(_lang_choice_title$la, "account_profile_main", 'Общий'), _defineProperty(_lang_choice_title$la, "account_export_secuses", 'Экспорт успешно завершён'), _defineProperty(_lang_choice_title$la, "account_export_fail", 'Ошибка при экспорте'), _defineProperty(_lang_choice_title$la, "account_import_secuses", 'Импорт успешно завершён'), _defineProperty(_lang_choice_title$la, "account_import_fail", 'Ошибка при импорте'), _defineProperty(_lang_choice_title$la, "account_imported", 'импортировано'), _defineProperty(_lang_choice_title$la, "account_reload_after", 'перезагрузка через 5 сек.'), _defineProperty(_lang_choice_title$la, "network_noconnect", 'Нет подключения к сети'), _defineProperty(_lang_choice_title$la, "network_404", 'Запрошенная страница не найдена. [404]'), _defineProperty(_lang_choice_title$la, "network_401", 'Авторизация не удалась'), _defineProperty(_lang_choice_title$la, "network_500", 'Внутренняя ошибка сервера. [500]'), _defineProperty(_lang_choice_title$la, "network_parsererror", 'Запрошенный синтаксический анализ JSON завершился неудачно.'), _defineProperty(_lang_choice_title$la, "network_timeout", 'Время запроса истекло.'), _defineProperty(_lang_choice_title$la, "network_abort", 'Запрос был прерван.'), _defineProperty(_lang_choice_title$la, "network_error", 'Неизвестная ошибка'), _defineProperty(_lang_choice_title$la, "size_zero", '0 Байт'), _defineProperty(_lang_choice_title$la, "size_byte", 'Байт'), _defineProperty(_lang_choice_title$la, "size_kb", 'КБ'), _defineProperty(_lang_choice_title$la, "size_mb", 'МБ'), _defineProperty(_lang_choice_title$la, "size_gb", 'ГБ'), _defineProperty(_lang_choice_title$la, "size_tb", 'ТБ'), _defineProperty(_lang_choice_title$la, "size_pp", 'ПБ'), _defineProperty(_lang_choice_title$la, "speed_bit", 'бит'), _defineProperty(_lang_choice_title$la, "speed_kb", 'Кбит'), _defineProperty(_lang_choice_title$la, "speed_mb", 'Мбит'), _defineProperty(_lang_choice_title$la, "speed_gb", 'Гбит'), _defineProperty(_lang_choice_title$la, "speed_tb", 'Тбит'), _defineProperty(_lang_choice_title$la, "speed_pp", 'Пбит'), _defineProperty(_lang_choice_title$la, "month_1", 'Январь'), _defineProperty(_lang_choice_title$la, "month_2", 'Февраль'), _defineProperty(_lang_choice_title$la, "month_3", 'Март'), _defineProperty(_lang_choice_title$la, "month_4", 'Апрель'), _defineProperty(_lang_choice_title$la, "month_5", 'Ма'), _defineProperty(_lang_choice_title$la, "month_6", 'Июнь'), _defineProperty(_lang_choice_title$la, "month_7", 'Июль'), _defineProperty(_lang_choice_title$la, "month_8", 'Август'), _defineProperty(_lang_choice_title$la, "month_9", 'Сентябрь'), _defineProperty(_lang_choice_title$la, "month_10", 'Октябрь'), _defineProperty(_lang_choice_title$la, "month_11", 'Ноябрь'), _defineProperty(_lang_choice_title$la, "month_12", 'Декабрь'), _defineProperty(_lang_choice_title$la, "day_1", 'Понедельник'), _defineProperty(_lang_choice_title$la, "day_2", 'Вторник'), _defineProperty(_lang_choice_title$la, "day_3", 'Среда'), _defineProperty(_lang_choice_title$la, "day_4", 'Четверг'), _defineProperty(_lang_choice_title$la, "day_5", 'Пятница'), _defineProperty(_lang_choice_title$la, "day_6", 'Суббота'), _defineProperty(_lang_choice_title$la, "day_7", 'Воскресенье'), _defineProperty(_lang_choice_title$la, "month_1_e", 'Января'), _defineProperty(_lang_choice_title$la, "month_2_e", 'Февраля'), _defineProperty(_lang_choice_title$la, "month_3_e", 'Марта'), _defineProperty(_lang_choice_title$la, "month_4_e", 'Апреля'), _defineProperty(_lang_choice_title$la, "month_5_e", 'Мая'), _defineProperty(_lang_choice_title$la, "month_6_e", 'Июня'), _defineProperty(_lang_choice_title$la, "month_7_e", 'Июля'), _defineProperty(_lang_choice_title$la, "month_8_e", 'Августа'), _defineProperty(_lang_choice_title$la, "month_9_e", 'Сентября'), _defineProperty(_lang_choice_title$la, "month_10_e", 'Октября'), _defineProperty(_lang_choice_title$la, "month_11_e", 'Ноября'), _defineProperty(_lang_choice_title$la, "month_12_e", 'Декабря'), _defineProperty(_lang_choice_title$la, "week_1", 'Пн'), _defineProperty(_lang_choice_title$la, "week_2", 'Вт'), _defineProperty(_lang_choice_title$la, "week_3", 'Ср'), _defineProperty(_lang_choice_title$la, "week_4", 'Чт'), _defineProperty(_lang_choice_title$la, "week_5", 'Пт'), _defineProperty(_lang_choice_title$la, "week_6", 'Сб'), _defineProperty(_lang_choice_title$la, "week_7", 'Вс'), _defineProperty(_lang_choice_title$la, "settings_param_player_hls_app", 'Системный'), _defineProperty(_lang_choice_title$la, "settings_param_player_hls_js", 'Программный'), _defineProperty(_lang_choice_title$la, "settings_player_hls_title", 'Обработка потока .m3u8'), _defineProperty(_lang_choice_title$la, "settings_player_hls_descr", 'Не трогайте этот параметр если не знаете зачем он.'), _defineProperty(_lang_choice_title$la, "notice_none_account", 'У вас еще нет никаких уведомлений, добавьте сериалы в закладки и ожидайте уведомления о новых серий.'), _lang_choice_title$la);

    var zh = {
      lang_choice_title: '欢迎',
      lang_choice_subtitle: '选择你的语言。',
      more: '更多',
      show_more: '显示更多',
      more_results: '显示更多结果',
      loading: '加载中',
      nofind_movie: '找不到电影。',
      noname: '无标题',
      nochoice: '未选择',
      cancel: '取消',
      confirm: '我确认',
      sure: '你确定吗？',
      nodata: '无数据',
      search: '搜索',
      search_input: '输入文本',
      search_empty: '搜索历史为空。',
      search_delete: '左 - 删除',
      search_start_typing: '开始输入搜索文本。',
      search_searching: '搜索中...',
      search_start: '开始搜索',
      full_genre: '类型',
      full_production: '出品公司',
      full_date_of_release: '发布日期',
      full_budget: '预算',
      full_countries: '国家',
      full_like: '喜欢',
      full_torrents: '种子',
      full_trailers: '预告片',
      full_detail: '详细',
      full_notext: '无描述。',
      full_series_release: '系列发布',
      full_next_episode: '下一集',
      full_episode_days_left: '剩余天数',
      full_trailer_official: '官方',
      full_trailer_no_official: '非正式',
      full_season: '季',
      full_episode: '剧集',
      full_directing: '导演',
      settings_cub_sync: '同步',
      settings_cub_sync_descr: '与 CUB 服务同步：书签同步，浏览历史记录、标签和时间码。网站：https://cub.watch',
      settings_cub_account: '帐户',
      settings_cub_logged_in_as: '登录身份',
      settings_cub_profile: '个人资料',
      settings_cub_sync_btn: '同步',
      settings_cub_sync_btn_descr: '将本地书签保存到 CUB 帐户',
      settings_cub_backup: '备份',
      settings_cub_backup_descr: '保存或加载备份数据',
      settings_cub_logout: '注销',
      settings_cub_signin: '授权',
      settings_cub_not_specified: '未指定',
      settings_cub_password: '密码',
      settings_cub_status: '状态',
      settings_cub_backup_import: '导入',
      settings_cub_backup_export: '导出',
      settings_input_links: '收藏夹',
      settings_interface_type: '精简版',
      settings_interface_size: '界面大小',
      settings_interface_background: '背景',
      settings_interface_background_use: '显示背景',
      settings_interface_background_type: '背景类型',
      settings_interface_performance: '性能',
      settings_interface_animation: '动画',
      settings_interface_animation_descr: '卡片和内容的动画',
      settings_interface_attenuation: '淡入淡出',
      settings_interface_attenuation_descr: '从下方和上方平滑淡入卡片',
      settings_interface_scroll: '滚动类型',
      settings_interface_view_card: '卡片视图类型',
      settings_interface_view_card_descr: '当您滚动时，卡片将逐渐加载或全部加载',
      settings_interface_lang: '界面语言',
      settings_interface_lang_reload: '需要重启应用，点击“确定”重启。',
      settings_main_account: '帐户',
      settings_main_interface: '界面',
      settings_main_player: '播放器',
      settings_main_parser: '解析器',
      settings_main_torrserver: 'TorrServer',
      settings_main_plugins: '插件',
      settings_main_rest: '其他',
      settings_rest_start: '起始页',
      settings_rest_start_descr: '启动时要启动的页面',
      settings_rest_source: '源',
      settings_rest_source_use: '主要来源',
      settings_rest_source_descr: '从哪里获取有关电影的信息',
      settings_rest_tmdb_lang: '从 TMDB 显示数据的语言',
      settings_rest_tmdb_prox: '代理 TMDB',
      settings_rest_tmdb_posters: 'TMDB 海报的分辨率',
      settings_rest_screensaver: '屏幕保护程序',
      settings_rest_screensaver_use: '空闲时启动屏保',
      settings_rest_screensaver_type: '屏幕保护类型',
      settings_rest_helper: '提示',
      settings_rest_helper_use: '显示提示',
      settings_rest_helper_reset: '再次显示提示',
      settings_rest_pages: '要在内存中保留多少页',
      settings_rest_pages_descr: '将页面保持在您离开它们的状态',
      settings_rest_time: '移位时间',
      settings_rest_navigation: '导航类型',
      settings_rest_keyboard: '键盘类型',
      settings_rest_device: '设备名称',
      settings_rest_device_placeholder: '例如：我的Lampa',
      settings_rest_cache: '清除缓存',
      settings_rest_cache_descr: '所有设置和数据将被清除',
      settings_parser_use: '使用解析器',
      settings_parser_use_descr: '在此，您同意接受所有使用责任用于查看 种子和在线内容的公共链接。',
      settings_parser_type: '种子的解析器类型',
      settings_parser_jackett_placeholder: '例如：192.168.x',
      settings_parser_jackett_link: '链接',
      settings_parser_jackett_link_descr: '提供Jackett脚本的链接',
      settings_parser_jackett_key_placeholder: '例如：sa0sk83d..',
      settings_parser_jackett_key: 'Api key',
      settings_parser_jackett_key_descr: '位于Jackett',
      settings_parser_torlook_type: 'TorLook网站解析方法',
      settings_parser_scraperapi_placeholder: '例如：scraperapi.com',
      settings_parser_scraperapi_link: '链接到站点解析器',
      settings_parser_scraperapi_descr: '在网站 scraperapi.com 上注册，输入链接 api.scraperapi.com?api_key=...&url={q}<br>W41.torlook.info 将发送到 {q}',
      settings_parser_search: '搜索',
      settings_parser_search_descr: '用什么语言搜索？',
      settings_parser_in_search: '在搜索中显示种子结果',
      settings_parser_in_search_descr: '显示搜索结果？',
      settings_player_type: '播放器类型',
      settings_player_type_descr: '用哪个播放器',
      settings_player_reset: '重置默认播放器',
      settings_player_reset_descr: '重置应用程序中选定的Android播放器',
      settings_player_path: '播放器路径',
      settings_player_path_descr: '指定播放器.exe的路径',
      settings_player_normalization: '声音标准化',
      settings_player_normalization_descr: '将声音标准化到一级，降低响亮的声音并增强安静的',
      settings_player_next_episode: '下一集',
      settings_player_next_episode_descr: '当前一集结束后自动切换到下一个系列',
      settings_player_timecode: '时间码',
      settings_player_timecode_descr: '从上次播放的位置继续',
      settings_player_scale: '缩放方法',
      settings_player_scale_descr: '如何计算视频缩放',
      settings_player_subs: '字幕',
      settings_player_subs_use: '打开',
      settings_player_subs_use_descr: '开始视频后总是打开字幕',
      settings_player_subs_size: '大小',
      settings_player_subs_size_descr: '字幕屏幕大小',
      settings_player_subs_stroke_use: '使用边缘',
      settings_player_subs_stroke_use_descr: '字幕将用黑色勾勒以提高可读性',
      settings_player_subs_backdrop_use: '使用底衬',
      settings_player_subs_backdrop_use_descr: '字幕将显示在半透明背景上以提高可读性',
      settings_player_quality: '默认视频质量',
      settings_player_quality_descr: '首选视频质量观看',
      settings_plugins_notice: '要应用插件，你需要重新启动应用程序',
      settings_plugins_add: '添加插件',
      settings_plugins_add_descr: '要删除添加的插件，请按住或双击其上的（确定）键',
      settings_plugins_install: '安装插件',
      settings_plugins_install_descr: '从可用列表中安装插件',
      settings_server_link: '使用链接',
      settings_server_links: '链接',
      settings_server_placeholder: '例如：192.168.X',
      settings_server_link_one: '主链接',
      settings_server_link_one_descr: '指定TorrServer脚本的主链接',
      settings_server_link_two: '额外链接',
      settings_server_link_two_descr: '提供TorrServer脚本的额外链接',
      settings_server_additionally: '高级',
      settings_server_client: '内置客户端',
      settings_server_client_descr: '使用内置的TorrServe JS客户端，否则系统启动。',
      settings_server_base: '保存到数据库',
      settings_server_base_descr: 'torrent 将被添加到 TorrServer 数据库',
      settings_server_preload: '使用预取缓冲区',
      settings_server_preload_descr: '播放前等待TorrServer的预加载缓冲区填满',
      settings_server_auth: '授权',
      settings_server_password_use: '密码登录',
      settings_server_login: '登录',
      settings_server_password: '密码',
      settings_server_not_specified: '未指定',
      torent_nohash_reasons: '原因',
      torent_nohash_reason_one: 'TorServer 无法下载 torrent 文件',
      torent_nohash_reason_two: '来自 TorServer 的回复',
      torent_nohash_reason_three: '链接',
      torent_nohash_do: '怎么办？',
      torent_nohash_do_one: '检查你是否正确配置了 Jackett',
      torent_nohash_do_two: '私人来源可能没有提供文件的链接',
      torent_nohash_do_three: '确保 Jackett 可以下载该文件也是',
      torent_nohash_do_four: '写信给我们的电报群组：@lampa_group',
      torent_nohash_do_five: '指定哪部电影，哪个发行版，如果可能，请注明该发行版的照片',
      torrent_error_text: '连接到 TorrServe 失败。让我们快速浏览可能的问题列表并检查所有内容。',
      torrent_error_step_1: 'TorrServe 是否正在运行',
      torrent_error_step_2: '动态 IP',
      torrent_error_step_3: '协议和端口',
      torrent_error_step_4: '防病毒阻止',
      torrent_error_step_5: '检查可用性',
      torrent_error_step_6: '仍然无法工作',
      torrent_error_info_1: '确保您已在安装 TorrServe 的设备上启动。',
      torrent_error_info_2: '一个常见的错误，带有 TorrServe 的设备的 IP 地址已更改。确保您输入的 IP 地址 - {ip} - 与安装了 TorrServe 的设备的地址匹配。',
      torrent_error_info_3: '要连接到 TorrServe,必须指定协议 http:// 开头，端口 :8090 结尾。确保IP地址后面有一个端口，你当前的地址是{ip}',
      torrent_error_info_4: '频繁出现，杀毒或防火墙可以通过 IP 地址阻止访问，尝试禁用防病毒和防火墙。',
      torrent_error_info_5: '在同一网络上的任何其他设备上，在浏览器中打开 {ip} 地址并检查 TorrServe 网络界面是否可用。',
      torrent_error_info_6: '如果在所有检查后仍然出现连接错误，请尝试重新启动 TorrServe 和 Internet 适配器。',
      torrent_error_info_7: '如果问题仍然存在，请使用文本写入 Telegram 组@lampa_group（Lampa 在所有检查后未连接到 TorrServe ,当前地址为{ip})',
      torrent_error_start: '开始验证',
      torrent_error_nomatrix: '验证Matrix版本失败',
      torrent_error_made: '执行',
      torrent_error_from: '来自',
      torrent_error_next: '进一步',
      torrent_error_complite: '要完成',
      torrent_error_connect: '连接错误',
      torrent_install_need: '需要 TorrServe',
      torrent_install_text: 'TorrServe 是一个允许您在线查看 torrent 文件内容的应用程序。<br><br>有关安装的更多详细信息可以在下面的电报组中找到。',
      torrent_install_contact: '电报组',
      torrent_item_bitrate: '比特率',
      torrent_item_seeds: '分发',
      torrent_item_grabs: '抽水',
      torrent_item_mb: 'Mbps',
      torrent_serial_episode: '剧集',
      torrent_serial_season: '季',
      torrent_serial_date: '退出',
      torrent_get_magnet: '请求磁力链接',
      torrent_remove_title: '删除',
      torrent_remove_descr: '种子将从您的列表中删除',
      torrent_parser_any_one: '任何',
      torrent_parser_any_two: '任何',
      torrent_parser_no_choice: '未选择',
      torrent_parser_yes: '是',
      torrent_parser_no: '否',
      torrent_parser_quality: '质量',
      torrent_parser_subs: '字幕',
      torrent_parser_voice: '翻译',
      torrent_parser_tracker: '跟踪器',
      torrent_parser_year: '年份',
      torrent_parser_season: '季',
      torrent_parser_sort_by_seeders: '按种子数',
      torrent_parser_sort_by_size: '按大小',
      torrent_parser_sort_by_name: '按名称',
      torrent_parser_sort_by_tracker: '按来源',
      torrent_parser_sort_by_date: '按日期',
      torrent_parser_sort_by_viewed: '已查看',
      torrent_parser_voice_dubbing: '配音',
      torrent_parser_voice_polyphonic: '复音',
      torrent_parser_voice_two: '双声部',
      torrent_parser_voice_amateur: '业余',
      torrent_parser_reset: '重置过滤器',
      torrent_parser_empty: '获取结果失败',
      torrent_parser_no_hash: '获取HASH失败',
      torrent_parser_added_to_mytorrents: '添加到“我的种子”',
      torrent_parser_add_to_mytorrents: '添加到“我的种子”',
      torrent_parser_label_title: '标记',
      torrent_parser_label_descr: '用旗帜标记（已查看)',
      torrent_parser_label_cancel_title: '取消选中',
      torrent_parser_label_cancel_descr: '从分发中删除标记（已查看）',
      torrent_parser_timeout: '超时',
      torrent_parser_nofiles: '提取合适文件失败',
      torrent_parser_set_link: '指定解析链接',
      torrent_parser_request_error: '请求错误',
      torrent_parser_magnet_error: '获取磁力链接失败',
      about_text: '应用完全免费，使用公共链接获取有关视频、新版本、热门电影等的信息。所有可用信息仅用于教育目的，该应用程序不使用自己的服务器分发信息。',
      about_channel: '我们的频道',
      about_group: '组',
      about_version: '版本',
      about_donate: '捐赠',
      title_watched: '你看过',
      title_settings: '设置',
      title_collections: '合集',
      title_collections_ivi: 'ivi 上的收藏',
      title_collections_okko: 'okko 上的收藏',
      title_company: '公司',
      title_actors: '演员',
      title_actor: '演员',
      title_actress: '女演员',
      title_person: '个人',
      title_comments: '评论',
      title_torrents: '种子',
      title_trailers: '预告片',
      title_watch: '观看',
      title_error: '错误',
      title_links: '链接',
      title_choice: '选择',
      title_main: '首页',
      title_book: '书签',
      title_like: '喜欢',
      title_wath: '稍后',
      title_history: '浏览历史',
      title_mytorrents: '我的种子',
      title_last: '最后',
      title_action: '动作',
      title_producer: '制片人',
      title_collection: '合集',
      title_recomendations: '推荐',
      title_similar: '类似',
      title_about: '关于应用程序',
      title_timetable: '时间表',
      title_relises: '数字版本',
      title_catalog: '目录',
      title_category: '类别',
      title_parser: '解析器',
      title_type: '类型',
      title_rating: '评级',
      title_country: '国家',
      title_year: '年份',
      title_genre: '类型',
      title_filter: '过滤器',
      title_notice: '通知',
      title_files: '文件',
      title_now_watch: '正在观看',
      title_latest: '最后添加',
      title_continue: '继续浏览',
      title_recomend_watch: '我们推荐看',
      title_new_episodes: '新剧集',
      title_popular: '热门',
      title_popular_movie: '热门电影',
      title_popular_tv: '热门电视节目',
      title_new_this_year: '今年新',
      title_hight_voite: '高度评价',
      title_new: '新',
      title_trend_day: '今日趋势',
      title_trend_week: '本周趋势',
      title_upcoming: '在电影院观看',
      title_top_movie: '热门电影',
      title_top_tv: '热门系列',
      title_tv_today: '今天播出',
      title_this_week: '本周',
      title_in_top: '热门',
      title_out: '退出',
      title_out_confirm: '是的，退出',
      title_continue_two: '继续',
      company_headquarters: '总部',
      company_homepage: '网站',
      company_country: '国家',
      filter_clarify: '优化',
      filter_clarify_two: '优化搜索',
      filter_set_name: '指定标题',
      filter_sorted: '排序',
      filter_filtred: '过滤器',
      filter_any: '任何',
      filter_rating_from: '从',
      filter_rating_to: '到',
      filter_country_uk: '乌克兰',
      filter_country_en: '美国',
      filter_country_ru: '俄罗斯',
      filter_country_ja: '日本',
      filter_country_ko: '韩国',
      filter_country_az: '阿塞拜疆',
      filter_country_sq: '阿尔巴尼亚',
      filter_country_be: '白俄罗斯',
      filter_country_bg: '保加利亚',
      filter_country_de: '德国',
      filter_country_ka: '格鲁吉亚',
      filter_country_da: '丹麦',
      filter_country_et: '爱沙尼亚',
      filter_country_ga: '爱尔兰',
      filter_country_es: '西班牙',
      filter_country_it: '意大利',
      filter_country_zh: '中国',
      filter_country_lv: '拉脱维亚',
      filter_country_ne: '尼泊尔',
      filter_country_no: '挪威',
      filter_country_pl: '波兰',
      filter_country_ro: '罗马尼亚',
      filter_country_sr: '塞尔维亚',
      filter_country_sk: '斯洛伐克',
      filter_country_sl: '斯洛文尼亚',
      filter_country_tg: '塔吉克斯坦',
      filter_country_tr: '土耳其',
      filter_country_uz: '乌兹别克斯坦',
      filter_country_fi: '芬兰',
      filter_country_fr: '法国',
      filter_country_hr: '克罗地亚',
      filter_country_cs: '捷克共和国',
      filter_country_sv: '瑞典',
      filter_genre_ac: '行动',
      filter_genre_ad: '冒险',
      filter_genre_mv: '卡通',
      filter_genre_cm: '喜剧',
      filter_genre_cr: '犯罪',
      filter_genre_dc: '纪录片',
      filter_genre_dr: '戏剧',
      filter_genre_fm: '首页',
      filter_genre_fe: '奇幻',
      filter_genre_hi: '故事',
      filter_genre_ho: '恐怖',
      filter_genre_mu: '音乐',
      filter_genre_de: '侦探',
      filter_genre_md: '情节剧',
      filter_genre_fa: '小说',
      filter_genre_tv: '电视电影',
      filter_genre_tr: '惊悚片',
      filter_genre_mi: '军事',
      filter_genre_ve: '西部',
      filter_genre_aa: '动作与冒险',
      filter_genre_ch: '儿童',
      filter_genre_nw: '新闻',
      filter_genre_rs: '真人秀',
      filter_genre_hf: '科幻与奇幻',
      filter_genre_op: '肥皂剧',
      filter_genre_tc: '脱口秀',
      filter_genre_mp: '战争与政治',
      ivi_premieres: '电影首映',
      ivi_best: '最佳电影',
      ivi_popular: '现在流行',
      ivi_choice: '艾维的选择',
      ivi_new: '新',
      ivi_foreign: '外国',
      ivi_ru: '俄罗斯人',
      ivi_recomend: '我们推荐你看',
      ivi_for_famaly: '适合全家的漫画',
      ivi_triller: '恐怖惊悚片',
      ivi_advance: '冒险喜剧',
      ivi_detective: '侦探电影改编',
      ivi_crime_comedy: '犯罪喜剧',
      ivi_romantic: '浪漫剧',
      ivi_crime_dramas: '犯罪剧',
      ivi_fantastic_dramas: '奇幻剧',
      ivi_military_dramas: '军事剧',
      ivi_mistic: '悬疑片',
      ivi_foreign_series: '外国剧',
      ivi_historical_series: '历史剧',
      okko_top_new: '热门新剧',
      okko_comedy_horror: '喜剧恐怖片',
      okko_collection_maniacs: '关于疯子的电影',
      okko_witches: '关于女巫的电影',
      okko_zombies: '关于僵尸的电影',
      okko_ru: '俄罗斯人',
      okko_horror_serial: '非常可怕',
      okko_serial_killers: '关于疯子',
      okko_humor_serial: '黑色幽默',
      okko_legkiye_serialy: '简单',
      okko_comedy_serial: '喜剧',
      okko_ru_tv: '俄罗斯人',
      empty_title: '空',
      empty_text: '没有找到适合您的过滤器，请优化您的过滤器。',
      empty_title_two: '此处为空',
      empty_text_two: '列表当前为空。',
      menu_main: '首页',
      menu_movies: '电影',
      menu_tv: '剧集',
      menu_catalog: '目录',
      menu_filter: '过滤器',
      menu_collections: '合集',
      menu_relises: '发布',
      menu_anime: '动漫',
      menu_bookmark: '书签',
      menu_like: '喜欢',
      menu_time: '稍后',
      menu_history: '历史',
      menu_timeline: '时间表',
      menu_torrents: '种子',
      menu_settings: '设置',
      menu_about: '关于',
      menu_console: '日志',
      menu_multmovie: '卡通',
      menu_multtv: '动画系列',
      plugins_catalog_work: '工作插件',
      plugins_catalog_work_descr: '完全在Lampa中工作的插件。',
      plugins_catalog_popular: '用户中流行的插件',
      plugins_catalog_popular_descr: '从未知来源安装可能导致应用程序无法正常工作。',
      plugins_online: '在线查看',
      plugins_check_fail: '无法测试插件的功能。但这并不代表插件不起作用。重新加载应用程序看看插件是否在加载。',
      plugins_need_reload: '应用插件需要重新启动应用程序',
      plugins_install: '安装',
      plugins_install_ready: '这个插件已经安装了。',
      plugins_installed: '已安装',
      plugins_load_from: '从CUB中加载',
      plugins_ok_for_check: '点击(OK)测试插件',
      plugins_no_loaded: '加载应用时，有些插件无法安装已加载',
      time_viewed: '查看',
      time_from: '来自',
      time_reset: '重置时间码',
      settings_clear_cache: '缓存和数据清除',
      settings_user_links: '自定义链接',
      settings_for_local: '对于本地 TorrServer',
      settings_add: '添加',
      settings_remove: '删除',
      settings_this_value: '当前值',
      settings_added: '添加',
      settings_removed: '已删除',
      settings_param_player_inner: 'Lampa',
      settings_param_player_outside: '外部',
      settings_param_yes: '是',
      settings_param_no: '否',
      settings_param_interface_size_small: '较小',
      settings_param_interface_size_normal: '正常',
      settings_param_poster_quality_low: '低',
      settings_param_poster_quality_average: '中',
      settings_param_poster_quality_high: '高',
      settings_param_parse_directly: '直接',
      settings_param_parse_api: '通过网站 API',
      settings_param_background_complex: '复杂',
      settings_param_background_simple: '简单',
      settings_param_background_image: '图片',
      settings_param_link_use_one: '主要',
      settings_param_link_use_two: '额外',
      settings_param_subtitles_size_small: '小',
      settings_param_subtitles_size_normal: '普通',
      settings_param_subtitles_size_bigger: '大',
      settings_param_screensaver_nature: '自然',
      settings_param_lang_ru: 'Русский',
      settings_param_lang_zh: '简体中文',
      settings_param_lang_uk: 'Українська',
      settings_param_lang_en: '英语',
      settings_param_torrent_lang_orig: '原始',
      settings_param_torrent_lang_ru: '俄语',
      settings_param_player_timecode_again: '重新开始',
      settings_param_player_timecode_continue: '继续',
      settings_param_player_timecode_ask: '询问',
      settings_param_player_scale_method: '计算',
      settings_param_card_view_load: '预加载',
      settings_param_card_view_all: '显示全部',
      settings_param_navigation_remote: '遥控器',
      settings_param_navigation_mouse: '鼠标遥控',
      settings_param_keyboard_lampa: 'Lampa',
      settings_param_keyboard_system: '系统',
      helper_keyboard: '输入数值后按“返回”键保存',
      helper_torrents: '按住(OK)键调出上下文菜单',
      helper_cleared: '成功，将再次显示工具提示。',
      helper_torrents_view: '按住（OK）键重置时间码并显示菜单',
      fav_sync_title: '书签同步',
      fav_sync_text: '你想让你最喜欢的书签出现在你的所有设备上吗？<br><br>在网站 www.cub.watch 上注册，创建个人资料并登录到Lampa。',
      fav_sync_site: '网站',
      fav_remove_title: '从历史记录中删除',
      fav_remove_descr: '删除选定的卡片',
      fav_clear_title: '清除历史记录',
      fav_clear_descr: '从历史记录中删除所有卡片',
      fav_clear_label_title: '清除标签',
      fav_clear_label_descr: '清除查看标签',
      fav_clear_time_title: '清除时间码',
      fav_clear_time_descr: '清除所有时间码',
      fav_label_cleared: '清除标记',
      fav_time_cleared: '清除时间码',
      timetable_empty: '此部分将显示新剧集的发布日期。',
      player_quality: '质量',
      player_tracks: '音轨',
      player_disabled: '已禁用',
      player_unknown: '未知',
      player_subs: '字幕',
      player_size_default_title: '默认',
      player_size_default_descr: '默认视频大小',
      player_size_cover_title: '扩展',
      player_size_cover_descr: '将视频扩展到全屏',
      player_size_fill_title: '填充',
      player_size_fill_descr: '使视频适合全屏',
      player_size_115_title: '缩放 115%',
      player_size_115_descr: '将视频放大 115%',
      player_size_130_title: '缩放 130%',
      player_size_130_descr: '将视频放大 130%',
      player_size_v115_title: '垂直 115%',
      player_size_v115_descr: '放大视频 115%',
      player_size_v130_title: '垂直 130%',
      player_size_v130_descr: '将视频放大 130%',
      player_video_size: '视频大小',
      player_playlist: '播放列表',
      player_error_one: '视频解码失败',
      player_error_two: '视频未找到或损坏',
      player_start_from: '继续浏览',
      player_not_found: '找不到播放器',
      player_lauch: '启动播放器',
      broadcast_open: '在另一台设备上打开卡片',
      broadcast_play: '选择要观看的设备',
      card_new_episode: '新系列',
      card_book_remove: '从书签中删除',
      card_book_add: '到书签',
      card_book_descr: '查看菜单（书签）',
      card_like_remove: '从收藏夹中删除',
      card_like_add: '喜欢',
      card_like_descr: '查看菜单（喜欢）',
      card_wath_remove: '从预期中删除',
      card_wath_add: '稍后观看',
      card_wath_descr: '查看菜单（稍后）',
      card_history_remove: '从历史记录中删除',
      card_history_add: '添加到历史记录',
      card_history_descr: '查看在菜单（历史）中',
      keyboard_listen: '说话，我在听...',
      keyboard_nomic: '没有麦克风访问权限',
      notice_new_quality: '新质量可用',
      notice_quality: '质量',
      notice_new_episode: '新系列',
      notice_none: '您还没有任何通知，请在 <b>www.cub.watch</b> 注册关注新剧集和发布。',
      notice_in_quality: 'As',
      copy_link: '复制视频链接',
      copy_secuses: '链接复制到剪贴板',
      copy_error: '复制链接时出错',
      account_sync_to_profile: '所有书签将被移动到个人资料',
      account_sync_secuses: '所有书签已成功转移',
      account_profiles: '个人资料',
      account_profiles_empty: '无法获取个人资料列表',
      account_authorized: '已授权',
      account_logged_in: '您已登录',
      account_login_failed: '登录失败',
      account_login_wait: '等待登录',
      account_profile_main: '常规',
      account_export_secuses: '导出成功',
      account_export_fail: '导出错误',
      account_import_secuses: '导入成功',
      account_import_fail: '导入错误',
      account_imported: '导入',
      account_reload_after: '5 秒后重启',
      network_noconnect: '没有网络连接',
      network_404: '未找到请求的页面。[404]',
      network_401: '授权失败',
      network_500: '内部服务器错误。[500]',
      network_parsererror: '请求的 JSON 解析失败。',
      network_timeout: '请求超时。',
      network_abort: '请求已中止。',
      network_error: '未知错误',
      size_zero: '0 字节',
      size_byte: '字节',
      size_kb: 'KB',
      size_mb: 'MB',
      size_gb: 'GB',
      size_tb: 'TB',
      size_pp: 'PB',
      speed_bit: '位',
      speed_kb: 'Kbps',
      speed_mb: 'Mbps',
      speed_gb: 'Gbit',
      speed_tb: 'Tbit',
      speed_pp: 'Pbit',
      month_1: '一月',
      month_2: '二月',
      month_3: '三月',
      month_4: '四月',
      month_5: '五月',
      month_6: '六月',
      month_7: '七月',
      month_8: '八月',
      month_9: '九月',
      month_10: '十月',
      month_11: '十一月',
      month_12: '十二月',
      day_1: '星期一',
      day_2: '星期二',
      day_3: '星期三',
      day_4: '星期四',
      day_5: '星期五',
      day_6: '星期六',
      day_7: '星期日',
      month_1_e: '一月',
      month_2_e: '二月',
      month_3_e: '三月',
      month_4_e: '四月',
      month_5_e: '五月',
      month_6_e: '六月',
      month_7_e: '七月',
      month_8_e: '八月',
      month_9_e: '九月',
      month_10_e: '十月',
      month_11_e: '十一月',
      month_12_e: '十二月',
      week_1: '星期一',
      week_2: '星期二',
      week_3: '星期三',
      week_4: '星期四',
      week_5: '星期五',
      week_6: '星期六',
      week_7: '星期天',
      settings_param_player_hls_app: 'Systemic',
      settings_param_player_hls_js: 'Program',
      settings_player_hls_title: '处理.m3u8流媒体',
      settings_player_hls_descr: '如果您不知道为什么，请不要修改此参数。',
      notice_none_account: '您还没有任何通知，请为该系列添加书签并等待新剧集的通知。'
    };

    var en = {
      lang_choice_title: 'Welcome',
      lang_choice_subtitle: 'Choose your language.',
      more: 'More',
      show_more: 'Show more',
      more_results: 'Show more results',
      loading: 'Loading',
      nofind_movie: 'The movie could not be found.',
      noname: 'Untitled',
      nochoice: 'Not chosen',
      cancel: 'Cancel',
      confirm: 'I confirm',
      sure: 'Are you sure?',
      nodata: 'No data',
      search: 'Search',
      search_input: 'Enter text',
      search_empty: 'Search history is empty.',
      search_delete: 'Left - delete',
      search_start_typing: 'Start typing search text.',
      search_searching: 'Search in progress...',
      search_start: 'To start searching',
      full_genre: 'Genre',
      full_production: 'Production',
      full_date_of_release: 'date of release',
      full_budget: 'Budget',
      full_countries: 'Countries',
      full_like: 'Like',
      full_torrents: 'Torrents',
      full_trailers: 'Trailers',
      full_detail: 'In detail',
      full_notext: 'No description.',
      full_series_release: 'Series release',
      full_next_episode: 'Next',
      full_episode_days_left: 'Days left',
      full_trailer_official: 'Official',
      full_trailer_no_official: 'Informal',
      full_season: 'Season',
      full_episode: 'Episode',
      full_directing: 'directing',
      settings_cub_sync: 'Synchronization',
      settings_cub_sync_descr: 'Synchronization with the CUB service: Synchronization of your bookmarks, browsing history, tags and timecodes. Website: https://cub.watch',
      settings_cub_account: 'Account',
      settings_cub_logged_in_as: 'Logged in as',
      settings_cub_profile: 'Profile',
      settings_cub_sync_btn: 'Synchronize',
      settings_cub_sync_btn_descr: 'Save local bookmarks to CUB account',
      settings_cub_backup: 'Backup',
      settings_cub_backup_descr: 'Save or load backup data',
      settings_cub_logout: 'Sign out',
      settings_cub_signin: 'Authorization',
      settings_cub_not_specified: 'Not specified',
      settings_cub_password: 'Password',
      settings_cub_status: 'Status',
      settings_cub_backup_import: 'Import',
      settings_cub_backup_export: 'Export',
      settings_input_links: 'Favorites',
      settings_interface_type: 'Lite version',
      settings_interface_size: 'Interface size',
      settings_interface_background: 'Background',
      settings_interface_background_use: 'Show background',
      settings_interface_background_type: 'Background type',
      settings_interface_performance: 'Performance',
      settings_interface_animation: 'Animation',
      settings_interface_animation_descr: 'Animation of cards and content',
      settings_interface_attenuation: 'Attenuation',
      settings_interface_attenuation_descr: 'Smooth fading of cards from below and from above',
      settings_interface_scroll: 'Scroll Type',
      settings_interface_view_card: 'Card view type',
      settings_interface_view_card_descr: 'As you scroll the feed, the cards will load gradually or load all',
      settings_interface_lang: 'Interface language',
      settings_interface_lang_reload: 'You need to restart the application, click "OK" to restart.',
      settings_main_account: 'Account',
      settings_main_interface: 'Interface',
      settings_main_player: 'Player',
      settings_main_parser: 'Parser',
      settings_main_torrserver: 'TorrServer',
      settings_main_plugins: 'Plugins',
      settings_main_rest: 'Other',
      settings_rest_start: 'Start page',
      settings_rest_start_descr: 'Which page to start at startup',
      settings_rest_source: 'Source',
      settings_rest_source_use: 'Main source',
      settings_rest_source_descr: 'Where to get information about films',
      settings_rest_tmdb_lang: 'What language to display data from TMDB',
      settings_rest_tmdb_prox: 'Proxy TMDB',
      settings_rest_tmdb_posters: 'Resolution of TMDB posters',
      settings_rest_screensaver: 'Screensaver',
      settings_rest_screensaver_use: 'Show splash screen when idle',
      settings_rest_screensaver_type: 'Screen saver type',
      settings_rest_helper: 'Hints',
      settings_rest_helper_use: 'Show hints',
      settings_rest_helper_reset: 'Show hints again',
      settings_rest_pages: 'How many pages to keep in memory',
      settings_rest_pages_descr: 'Keeps pages in the state you left them in',
      settings_rest_time: 'Shift time',
      settings_rest_navigation: 'Navigation type',
      settings_rest_keyboard: 'Keyboard type',
      settings_rest_device: 'Device name',
      settings_rest_device_placeholder: 'For example: My Lamp',
      settings_rest_cache: 'Clear cache',
      settings_rest_cache_descr: 'All settings and data will be cleared',
      settings_parser_use: 'Use parser',
      settings_parser_use_descr: 'Hereby, you agree to accept all responsibility for the use of public links to view torrent and online content.',
      settings_parser_type: 'Parser type for torrents',
      settings_parser_jackett_placeholder: 'For example: 192.168.x',
      settings_parser_jackett_link: 'Link',
      settings_parser_jackett_link_descr: 'Provide a link to the Jackett script',
      settings_parser_jackett_key_placeholder: 'For example: sa0sk83d..',
      settings_parser_jackett_key: 'Api key',
      settings_parser_jackett_key_descr: 'Located in Jackett',
      settings_parser_torlook_type: 'TorLook site parsing method',
      settings_parser_scraperapi_placeholder: 'For example: scraperapi.com',
      settings_parser_scraperapi_link: 'Link to site parser',
      settings_parser_scraperapi_descr: 'Register on the site scraperapi.com, enter the link api.scraperapi.com?api_key=...&url={q}<br>W41.torlook.info will be delivered to {q}',
      settings_parser_search: 'Search',
      settings_parser_search_descr: 'What language to search in?',
      settings_parser_in_search: 'Parser in search',
      settings_parser_in_search_descr: 'Show search results?',
      settings_player_type: 'Player type',
      settings_player_type_descr: 'Which player to play',
      settings_player_reset: 'Reset default player',
      settings_player_reset_descr: 'Resets the selected Android player in the application',
      settings_player_path: 'Path to the player',
      settings_player_path_descr: 'Specify the path to the player .exe',
      settings_player_normalization: 'Sound normalization',
      settings_player_normalization_descr: 'Normalizes sound to one level, lowers loud sounds and boosts quiet ones.',
      settings_player_next_episode: 'Next episode',
      settings_player_next_episode_descr: 'Automatically switch to the next series after the end of the current one',
      settings_player_timecode: 'Timecode',
      settings_player_timecode_descr: 'Continue from last viewed location',
      settings_player_scale: 'Scaling Method',
      settings_player_scale_descr: 'How to calculate video scaling',
      settings_player_subs: 'Subtitles',
      settings_player_subs_use: 'Turn on',
      settings_player_subs_use_descr: 'Always turn on subtitles after starting a video',
      settings_player_subs_size: 'The size',
      settings_player_subs_size_descr: 'Screen size of subtitles',
      settings_player_subs_stroke_use: 'Use edging',
      settings_player_subs_stroke_use_descr: 'Subtitles will be outlined in black for better readability',
      settings_player_subs_backdrop_use: 'Use an underlay',
      settings_player_subs_backdrop_use_descr: 'Subtitles will be displayed on a translucent backing to improve readability',
      settings_player_quality: 'Default video quality',
      settings_player_quality_descr: 'Preferred video quality for viewing',
      settings_plugins_notice: 'To apply the plugin, you need to restart the application',
      settings_plugins_add: 'Add Plugin',
      settings_plugins_add_descr: 'To delete an added plugin, hold or double-click the (OK) key on it',
      settings_plugins_install: 'Install Plugin',
      settings_plugins_install_descr: 'Install a plugin from the list of available',
      settings_server_link: 'Use link',
      settings_server_links: 'Links',
      settings_server_placeholder: 'For example: 192.168.X',
      settings_server_link_one: 'Main Link',
      settings_server_link_one_descr: 'Specify the main link to the TorrServer script',
      settings_server_link_two: 'Additional link',
      settings_server_link_two_descr: 'Provide an additional link to the TorrServer script',
      settings_server_additionally: 'Additionally',
      settings_server_client: 'Embedded client',
      settings_server_client_descr: 'Use the built-in TorrServe JS client, otherwise the system one starts.',
      settings_server_base: 'Save to database',
      settings_server_base_descr: 'The torrent will be added to the TorrServer database',
      settings_server_preload: 'Use prefetch buffer',
      settings_server_preload_descr: 'Wait for TorrServer\'s preload buffer to fill before playing',
      settings_server_auth: 'Authorization',
      settings_server_password_use: 'Password login',
      settings_server_login: 'Login',
      settings_server_password: 'Password',
      settings_server_not_specified: 'Not specified',
      torent_nohash_reasons: 'The reasons',
      torent_nohash_reason_one: 'TorServer was unable to download the torrent file',
      torent_nohash_reason_two: 'Reply from TorServer',
      torent_nohash_reason_three: 'Link',
      torent_nohash_do: 'What to do?',
      torent_nohash_do_one: 'Check if you configured Jackett correctly',
      torent_nohash_do_two: 'Private sources may not provide a link to the file',
      torent_nohash_do_three: 'Make sure Jackett can download the file too',
      torent_nohash_do_four: 'Write to our telegram group: @lampa_group',
      torent_nohash_do_five: 'Specify which movie, which distribution and, if possible, a photo of this distribution',
      torrent_error_text: 'Failed to connect to TorrServe. Let\'s quickly go through the list of possible problems and check everything.',
      torrent_error_step_1: 'Is TorrServe running',
      torrent_error_step_2: 'Dynamic IP',
      torrent_error_step_3: 'Protocol and Port',
      torrent_error_step_4: 'Antivirus blocking',
      torrent_error_step_5: 'Check for availability',
      torrent_error_step_6: 'Still doesn\'t work',
      torrent_error_info_1: 'Make sure you have launched TorrServe on the device where it is installed.',
      torrent_error_info_2: 'A common mistake, the IP address of the device with TorrServe has changed. Make sure that the IP address you entered - {ip} - matches the address of the device on which TorrServe is installed.',
      torrent_error_info_3: 'To connect to TorrServe, you must specify the protocol http:// at the beginning and port :8090 at the end of the address. Make sure there is a port after the IP address, your current address is {ip}',
      torrent_error_info_4: 'Frequent occurrence, antivirus or firewall can block access by IP address, try disabling antivirus and firewall.',
      torrent_error_info_5: 'On any other device on the same network, open the {ip} address in a browser and check if the TorrServe web interface is available.',
      torrent_error_info_6: 'If, after all the checks, a connection error still occurs, try restarting TorrServe and the Internet adapter.',
      torrent_error_info_7: 'If the problem persists, write to the Telegram group @lampa_group with the text (Lampa does not connect to TorrServe after all checks, the current address is {ip})',
      torrent_error_start: 'Start verification',
      torrent_error_nomatrix: 'Failed to verify Matrix version',
      torrent_error_made: 'Performed',
      torrent_error_from: 'from',
      torrent_error_next: 'Further',
      torrent_error_complite: 'To complete',
      torrent_error_connect: 'Connection error',
      torrent_install_need: 'Requires TorrServe',
      torrent_install_text: 'TorrServe is an application that allows you to view content from torrent files online.<br><br>More detailed information on installation can be found in the Telegram groups below.',
      torrent_install_contact: 'Telegram groups',
      torrent_item_bitrate: 'Bitrate',
      torrent_item_seeds: 'Handing out',
      torrent_item_grabs: 'pumping',
      torrent_item_mb: 'Mbps',
      torrent_serial_episode: 'Series',
      torrent_serial_season: 'Season',
      torrent_serial_date: 'Exit',
      torrent_get_magnet: 'Requesting a magnet link',
      torrent_remove_title: 'Delete',
      torrent_remove_descr: 'The torrent will be removed from your list',
      torrent_parser_any_one: 'Any',
      torrent_parser_any_two: 'Any',
      torrent_parser_no_choice: 'Not chosen',
      torrent_parser_yes: 'Yes',
      torrent_parser_no: 'No',
      torrent_parser_quality: 'Quality',
      torrent_parser_subs: 'Subtitles',
      torrent_parser_voice: 'Translation',
      torrent_parser_tracker: 'tracker',
      torrent_parser_year: 'Year',
      torrent_parser_season: 'Season',
      torrent_parser_sort_by_seeders: 'By distributors',
      torrent_parser_sort_by_size: 'To size',
      torrent_parser_sort_by_name: 'by name',
      torrent_parser_sort_by_tracker: 'By source',
      torrent_parser_sort_by_date: 'By date',
      torrent_parser_sort_by_viewed: 'Viewed',
      torrent_parser_voice_dubbing: 'Dubbing',
      torrent_parser_voice_polyphonic: 'Polyphonic',
      torrent_parser_voice_two: 'Two-voiced',
      torrent_parser_voice_amateur: 'Amateur',
      torrent_parser_reset: 'Reset filter',
      torrent_parser_empty: 'Failed to get results',
      torrent_parser_no_hash: 'Failed to get HASH',
      torrent_parser_added_to_mytorrents: 'added to "My torrents"',
      torrent_parser_add_to_mytorrents: 'Add to "My torrents"',
      torrent_parser_label_title: 'Flag',
      torrent_parser_label_descr: 'Flag a hand with a flag (viewed)',
      torrent_parser_label_cancel_title: 'Uncheck',
      torrent_parser_label_cancel_descr: 'Remove the mark from the distribution (viewed)',
      torrent_parser_timeout: 'Timeout expired',
      torrent_parser_nofiles: 'Failed to extract suitable files',
      torrent_parser_set_link: 'Specify a link for parsing',
      torrent_parser_request_error: 'Request error',
      torrent_parser_magnet_error: 'Failed to get magnet link',
      about_text: 'The application is completely free and uses public links to get information about videos, new releases, popular movies, etc. All available information is used solely for educational purposes, the application does not use its own servers to distribute information.',
      about_channel: 'Our channel',
      about_group: 'Group',
      about_version: 'Version',
      about_donate: 'Donat',
      title_watched: 'You watched',
      title_settings: 'Settings',
      title_collections: 'Collections',
      title_collections_ivi: 'Collections on ivi',
      title_collections_okko: 'Collections on okko',
      title_company: 'Company',
      title_actors: 'Actors',
      title_actor: 'Actor',
      title_actress: 'Actress',
      title_person: 'A person',
      title_comments: 'Comments',
      title_torrents: 'Torrents',
      title_trailers: 'Trailers',
      title_watch: 'Watch',
      title_error: 'Error',
      title_links: 'Links',
      title_choice: 'Choose',
      title_main: 'Home',
      title_book: 'Bookmarks',
      title_like: 'Like',
      title_wath: 'Later',
      title_history: 'Browsing history',
      title_mytorrents: 'My torrents',
      title_last: 'Last',
      title_action: 'Action',
      title_producer: 'Producer',
      title_collection: 'Collection',
      title_recomendations: 'Recommendations',
      title_similar: 'Similar',
      title_about: 'About the application',
      title_timetable: 'Schedule',
      title_relises: 'Digital releases',
      title_catalog: 'Catalog',
      title_category: 'Category',
      title_parser: 'Parser',
      title_type: 'Type of',
      title_rating: 'Rating',
      title_country: 'Country',
      title_year: 'Year',
      title_genre: 'Genre',
      title_filter: 'Filter',
      title_notice: 'Notifications',
      title_files: 'Files',
      title_now_watch: 'Watching now',
      title_latest: 'Last addition',
      title_continue: 'Continue browsing',
      title_recomend_watch: 'We recommend to see',
      title_new_episodes: 'New episodes',
      title_popular: 'Popular',
      title_popular_movie: 'Popular films',
      title_popular_tv: 'Popular TV shows',
      title_new_this_year: 'New this year',
      title_hight_voite: 'Highly rated',
      title_new: 'New',
      title_trend_day: 'Today in trend',
      title_trend_week: 'Trending for the week',
      title_upcoming: 'Watch in cinemas',
      title_top_movie: 'Top movies',
      title_top_tv: 'Top series',
      title_tv_today: 'On air today',
      title_this_week: 'This week',
      title_in_top: 'Top',
      title_out: 'Exit',
      title_out_confirm: 'Yes, get out',
      title_continue_two: 'Proceed',
      company_headquarters: 'Headquarters',
      company_homepage: 'Website',
      company_country: 'Country',
      filter_clarify: 'Clarify',
      filter_clarify_two: 'Refine Search',
      filter_set_name: 'Specify title',
      filter_sorted: 'Sort',
      filter_filtred: 'Filter',
      filter_any: 'Any',
      filter_rating_from: 'from',
      filter_rating_to: 'to',
      filter_country_uk: 'Ukraine',
      filter_country_en: 'USA',
      filter_country_ru: 'Russia',
      filter_country_ja: 'Japan',
      filter_country_ko: 'Korea',
      filter_country_az: 'Azerbaijan',
      filter_country_sq: 'Albania',
      filter_country_be: 'Belarus',
      filter_country_bg: 'Bulgaria',
      filter_country_de: 'Germany',
      filter_country_ka: 'Georgia',
      filter_country_da: 'Denmark',
      filter_country_et: 'Estonia',
      filter_country_ga: 'Ireland',
      filter_country_es: 'Spain',
      filter_country_it: 'Italy',
      filter_country_zh: 'China',
      filter_country_lv: 'Latvia',
      filter_country_ne: 'Nepal',
      filter_country_no: 'Norway',
      filter_country_pl: 'Poland',
      filter_country_ro: 'Romania',
      filter_country_sr: 'Serbia',
      filter_country_sk: 'Slovakia',
      filter_country_sl: 'Slovenia',
      filter_country_tg: 'Tajikistan',
      filter_country_tr: 'Turkey',
      filter_country_uz: 'Uzbekistan',
      filter_country_fi: 'Finland',
      filter_country_fr: 'France',
      filter_country_hr: 'Croatia',
      filter_country_cs: 'Czech Republic',
      filter_country_sv: 'Sweden',
      filter_genre_ac: 'Action',
      filter_genre_ad: 'Adventures',
      filter_genre_mv: 'Cartoon',
      filter_genre_cm: 'Comedy',
      filter_genre_cr: 'Crime',
      filter_genre_dc: 'Documentary',
      filter_genre_dr: 'Drama',
      filter_genre_fm: 'Family',
      filter_genre_fe: 'Fantasy',
      filter_genre_hi: 'Story',
      filter_genre_ho: 'Horror',
      filter_genre_mu: 'Music',
      filter_genre_de: 'Detective',
      filter_genre_md: 'Melodrama',
      filter_genre_fa: 'Fiction',
      filter_genre_tv: 'TV film',
      filter_genre_tr: 'Thriller',
      filter_genre_mi: 'Military',
      filter_genre_ve: 'Western',
      filter_genre_aa: 'Action & Adventure',
      filter_genre_ch: 'Children\'s',
      filter_genre_nw: 'News',
      filter_genre_rs: 'Reality show',
      filter_genre_hf: 'Sci-Fi and Fantasy',
      filter_genre_op: 'Soap opera',
      filter_genre_tc: 'Talk show',
      filter_genre_mp: 'War and Politics',
      ivi_premieres: 'Movie premieres',
      ivi_best: 'Best Movies',
      ivi_popular: 'Popular now',
      ivi_choice: 'Ivi\'s choice',
      ivi_new: 'New',
      ivi_foreign: 'Foreign',
      ivi_ru: 'Russians',
      ivi_recomend: 'We recommend that you see',
      ivi_for_famaly: 'Cartoons for the whole family',
      ivi_triller: 'Horror thrillers',
      ivi_advance: 'Adventure comedies',
      ivi_detective: 'Film adaptations of detectives',
      ivi_crime_comedy: 'Crime comedies',
      ivi_romantic: 'Romantic dramas',
      ivi_crime_dramas: 'Crime dramas',
      ivi_fantastic_dramas: 'fantasy dramas',
      ivi_military_dramas: 'Military dramas',
      ivi_mistic: 'Mystery films',
      ivi_foreign_series: 'Foreign series',
      ivi_historical_series: 'Historical series',
      okko_top_new: 'Top New',
      okko_comedy_horror: 'Comedy Horror Films',
      okko_collection_maniacs: 'Movies about maniacs',
      okko_witches: 'Movies about witches',
      okko_zombies: 'Movies about zombies',
      okko_ru: 'Russians',
      okko_horror_serial: 'Very scary',
      okko_serial_killers: 'About maniacs',
      okko_humor_serial: 'With black humor',
      okko_legkiye_serialy: 'Lungs',
      okko_comedy_serial: 'Comedy',
      okko_ru_tv: 'Russians',
      empty_title: 'Empty',
      empty_text: 'Nothing found for your filter, please refine your filter.',
      empty_title_two: 'It\'s empty here',
      empty_text_two: 'The list is currently empty.',
      menu_main: 'Home',
      menu_movies: 'Movies',
      menu_tv: 'Series',
      menu_catalog: 'Catalog',
      menu_filter: 'Filter',
      menu_collections: 'Collections',
      menu_relises: 'Releases',
      menu_anime: 'Anime',
      menu_bookmark: 'Bookmarks',
      menu_like: 'Like',
      menu_time: 'Later',
      menu_history: 'History',
      menu_timeline: 'Schedule',
      menu_torrents: 'Torrents',
      menu_settings: 'Settings',
      menu_about: 'Information',
      menu_console: 'Console',
      menu_multmovie: 'Cartoons',
      menu_multtv: 'Animated series',
      plugins_catalog_work: 'Working plugins',
      plugins_catalog_work_descr: 'Plugins that work exactly in the lamp.',
      plugins_catalog_popular: 'Popular plugins among users',
      plugins_catalog_popular_descr: 'Installation from unknown sources may cause the application to work incorrectly.',
      plugins_online: 'View online',
      plugins_check_fail: 'Failed to test the functionality of the plugin. However, this does not mean that the plugin does not work. Reload the application to see if the plugin is loading.',
      plugins_need_reload: 'To apply the plugin, you need to restart the application',
      plugins_install: 'Install',
      plugins_install_ready: 'This plugin is already installed.',
      plugins_installed: 'Installations',
      plugins_load_from: 'Loaded from CUB',
      plugins_ok_for_check: 'Click (OK) to test the plugin',
      plugins_no_loaded: 'When loading the application, some plugins could not be loaded',
      time_viewed: 'Viewed',
      time_from: 'from',
      time_reset: 'Reset timecode',
      settings_clear_cache: 'Cache and data cleared',
      settings_user_links: 'Custom Link',
      settings_for_local: 'For local TorrServer',
      settings_add: 'Add',
      settings_remove: 'Delete',
      settings_this_value: 'present value',
      settings_added: 'Added',
      settings_removed: 'Removed',
      settings_param_player_inner: 'Lampa',
      settings_param_player_outside: 'External',
      settings_param_yes: 'Yes',
      settings_param_no: 'No',
      settings_param_interface_size_small: 'Smaller',
      settings_param_interface_size_normal: 'Normal',
      settings_param_poster_quality_low: 'Low',
      settings_param_poster_quality_average: 'Average',
      settings_param_poster_quality_high: 'High',
      settings_param_parse_directly: 'Directly',
      settings_param_parse_api: 'Through the website API',
      settings_param_background_complex: 'Complex',
      settings_param_background_simple: 'Simple',
      settings_param_background_image: 'Picture',
      settings_param_link_use_one: 'Main',
      settings_param_link_use_two: 'Additional',
      settings_param_subtitles_size_small: 'small',
      settings_param_subtitles_size_normal: 'Ordinary',
      settings_param_subtitles_size_bigger: 'Large',
      settings_param_screensaver_nature: 'Nature',
      settings_param_lang_ru: 'Русский',
      settings_param_lang_zh: '简体中文',
      settings_param_lang_uk: 'Українська',
      settings_param_lang_en: 'English',
      settings_param_torrent_lang_orig: 'Original',
      settings_param_torrent_lang_ru: 'Russian',
      settings_param_player_timecode_again: 'Start over',
      settings_param_player_timecode_continue: 'Proceed',
      settings_param_player_timecode_ask: 'To ask',
      settings_param_player_scale_method: 'Calculate',
      settings_param_card_view_load: 'Upload',
      settings_param_card_view_all: 'Show all',
      settings_param_navigation_remote: 'Remote controller',
      settings_param_navigation_mouse: 'Remote control with mouse',
      settings_param_keyboard_lampa: 'Lampa',
      settings_param_keyboard_system: 'Systemic',
      helper_keyboard: 'After entering the value, press the "Back" button to save',
      helper_torrents: 'Hold down the (OK) key to bring up the context menu',
      helper_cleared: 'Success, tooltips will be shown again.',
      helper_torrents_view: 'Hold down the (OK) key to reset the timecode and display the menu',
      fav_sync_title: 'Bookmark sync',
      fav_sync_text: 'Do you want your favorite bookmarks to be on all your devices? <br><br>Register on the site www.cub.watch, create a profile and log in to the lamp.',
      fav_sync_site: 'Website',
      fav_remove_title: 'Remove from history',
      fav_remove_descr: 'Delete selected card',
      fav_clear_title: 'Clear the history',
      fav_clear_descr: 'Delete all cards from history',
      fav_clear_label_title: 'Clear labels',
      fav_clear_label_descr: 'Clear View Tags',
      fav_clear_time_title: 'Clear Timecodes',
      fav_clear_time_descr: 'Clear all timecodes',
      fav_label_cleared: 'Marks cleared',
      fav_time_cleared: 'Timecodes cleared',
      timetable_empty: 'This section will display the release dates of new episodes.',
      player_quality: 'Quality',
      player_tracks: 'Audio tracks',
      player_disabled: 'Disabled',
      player_unknown: 'Unknown',
      player_subs: 'Subtitles',
      player_size_default_title: 'Default',
      player_size_default_descr: 'Default video size',
      player_size_cover_title: 'Expand',
      player_size_cover_descr: 'Expands video to full screen',
      player_size_fill_title: 'Fill',
      player_size_fill_descr: 'Fit video to full screen',
      player_size_115_title: 'Zoom 115%',
      player_size_115_descr: 'Enlarge video by 115%',
      player_size_130_title: 'Zoom 130%',
      player_size_130_descr: 'Enlarge video by 130%',
      player_size_v115_title: 'Vertical 115%',
      player_size_v115_descr: 'Enlarge video by 115%',
      player_size_v130_title: 'Vertical 130%',
      player_size_v130_descr: 'Enlarge video by 130%',
      player_video_size: 'Video size',
      player_playlist: 'Playlist',
      player_error_one: 'Failed to decode video',
      player_error_two: 'Video not found or corrupted',
      player_start_from: 'Continue browsing from',
      player_not_found: 'Player not found',
      player_lauch: 'Launch player',
      broadcast_open: 'Open card on another device',
      broadcast_play: 'Choose the device to watch on',
      card_new_episode: 'New series',
      card_book_remove: 'Remove from bookmarks',
      card_book_add: 'To bookmarks',
      card_book_descr: 'Look in the menu (Bookmarks)',
      card_like_remove: 'Remove from favorites',
      card_like_add: 'Like',
      card_like_descr: 'Look at the menu (Like)',
      card_wath_remove: 'Remove from expected',
      card_wath_add: 'Watch Later',
      card_wath_descr: 'See the menu (Later)',
      card_history_remove: 'Remove from history',
      card_history_add: 'Add to history',
      card_history_descr: 'Look in the menu (History)',
      keyboard_listen: 'Speak, I\'m listening...',
      keyboard_nomic: 'No microphone access',
      notice_new_quality: 'New quality available',
      notice_quality: 'Quality',
      notice_new_episode: 'New series',
      notice_none: 'You don\'t have any notifications yet, register at <b>www.cub.watch</b> to follow new episodes and releases.',
      notice_in_quality: 'As',
      copy_link: 'Copy video link',
      copy_secuses: 'Link copied to clipboard',
      copy_error: 'Error copying link',
      account_sync_to_profile: 'All bookmarks will be moved to the profile',
      account_sync_secuses: 'All bookmarks have been successfully transferred',
      account_profiles: 'Profiles',
      account_profiles_empty: 'Failed to get list of profiles',
      account_authorized: 'Authorized',
      account_logged_in: 'You are logged in',
      account_login_failed: 'Login failed',
      account_login_wait: 'Waiting for login',
      account_profile_main: 'General',
      account_export_secuses: 'Export completed successfully',
      account_export_fail: 'Export error',
      account_import_secuses: 'Import completed successfully',
      account_import_fail: 'Import error',
      account_imported: 'imported',
      account_reload_after: 'reboot after 5 sec.',
      network_noconnect: 'No network connection',
      network_404: 'The requested page was not found. [404]',
      network_401: 'Authorization failed',
      network_500: 'Internal Server Error. [500]',
      network_parsererror: 'The requested JSON parsing failed.',
      network_timeout: 'Request timed out.',
      network_abort: 'The request has been aborted.',
      network_error: 'Unknown error',
      size_zero: '0 Byte',
      size_byte: 'Byte',
      size_kb: 'KB',
      size_mb: 'MB',
      size_gb: 'GB',
      size_tb: 'TB',
      size_pp: 'PB',
      speed_bit: 'bit',
      speed_kb: 'Kbps',
      speed_mb: 'Mbps',
      speed_gb: 'Gbit',
      speed_tb: 'Tbit',
      speed_pp: 'Pbit',
      month_1: 'January',
      month_2: 'February',
      month_3: 'March',
      month_4: 'April',
      month_5: 'May',
      month_6: 'June',
      month_7: 'July',
      month_8: 'August',
      month_9: 'September',
      month_10: 'October',
      month_11: 'November',
      month_12: 'December',
      day_1: 'Monday',
      day_2: 'Tuesday',
      day_3: 'Wednesday',
      day_4: 'Thursday',
      day_5: 'Friday',
      day_6: 'Saturday',
      day_7: 'Sunday',
      month_1_e: 'January',
      month_2_e: 'February',
      month_3_e: 'March',
      month_4_e: 'April',
      month_5_e: 'May',
      month_6_e: 'June',
      month_7_e: 'July',
      month_8_e: 'August',
      month_9_e: 'September',
      month_10_e: 'October',
      month_11_e: 'November',
      month_12_e: 'December',
      week_1: 'Mon',
      week_2: 'Tue',
      week_3: 'Wed',
      week_4: 'Thu',
      week_5: 'Fri',
      week_6: 'Sat',
      week_7: 'Sun',
      settings_param_player_hls_app: 'Systemic',
      settings_param_player_hls_js: 'Program',
      settings_player_hls_title: 'Processing the .m3u8 stream',
      settings_player_hls_descr: 'Do not touch this parameter if you do not know why it is.',
      notice_none_account: 'You don\'t have any notifications yet, bookmark the series and wait for notifications of new episodes.'
    };

    var uk = {
      lang_choice_title: 'Ласкаво просимо',
      lang_choice_subtitle: 'Виберіть мову.',
      more: 'Ще',
      show_more: 'Показати ще',
      more_results: 'Показати більше результатів',
      loading: 'Завантаження',
      nofind_movie: 'Не вдалось знайти фільм.',
      noname: 'Без назви',
      nochoice: 'Не вибрано',
      cancel: 'Скасувати',
      confirm: 'Підтверджую',
      sure: 'Ви впевнені?',
      nodata: 'Немає даних',
      search: 'Пошук',
      search_input: 'Введіть текст',
      search_empty: 'Історія пошуку порожня.',
      search_delete: 'Ліворуч - видалити',
      search_start_typing: 'Почніть вводити текст для пошуку.',
      search_searching: 'Йде пошук...',
      search_start: 'Розпочати пошук',
      full_genre: 'Жанр',
      full_production: 'Виробництво',
      full_date_of_release: 'Дата релізу',
      full_budget: 'Бюджет',
      full_countries: 'Країни',
      full_like: 'Подобається',
      full_torrents: 'Торренти',
      full_trailers: 'Трейлери',
      full_detail: 'Детально',
      full_notext: 'Без опису.',
      full_series_release: 'Вихід серій',
      full_next_episode: 'Наступна',
      full_episode_days_left: 'Залишилось днів',
      full_trailer_official: 'Офіційний',
      full_trailer_no_official: 'Неофіційний',
      full_season: 'Сезон',
      full_episode: 'Епізод',
      full_directing: 'Режисура',
      settings_cub_sync: 'Синхронізація',
      settings_cub_sync_descr: 'Синхронізація із сервісом CUB: синхронізація ваших закладок, історії переглядів, міток та тайм-кодів. Сайт: https://cub.watch',
      settings_cub_account: 'Акаунт',
      settings_cub_logged_in_as: 'Увійшли як',
      settings_cub_profile: 'Профіль',
      settings_cub_sync_btn: 'Синхронізувати',
      settings_cub_sync_btn_descr: 'Зберегти локальні закладки в обліковий запис CUB',
      settings_cub_backup: 'Бекап',
      settings_cub_backup_descr: 'Зберегти або завантажити бекап даних',
      settings_cub_logout: 'Вийти з облікового запису',
      settings_cub_signin: 'Авторизація',
      settings_cub_not_specified: 'Не вказано',
      settings_cub_password: 'Пароль',
      settings_cub_status: 'Статус',
      settings_cub_backup_import: 'Імпорт',
      settings_cub_backup_export: 'Експорт',
      settings_input_links: 'Вибране',
      settings_interface_type: 'Полегшена версія',
      settings_interface_size: 'Розмір інтерфейсу',
      settings_interface_background: 'Фон',
      settings_interface_background_use: 'Показувати фон',
      settings_interface_background_type: 'Тип фону',
      settings_interface_performance: 'Швидкодія',
      settings_interface_animation: 'Анімація',
      settings_interface_animation_descr: 'Анімація карток та контенту',
      settings_interface_attenuation: 'Згасання',
      settings_interface_attenuation_descr: 'Плавне згасання карток знизу та зверху',
      settings_interface_scroll: 'Тип скролінгу',
      settings_interface_view_card: 'Тип перегляду карток',
      settings_interface_view_card_descr: 'У міру скролінгу стрічки картки підвантажуватимуться поступово або завантажуватимуться всі',
      settings_interface_lang: 'Мова інтерфейсу',
      settings_interface_lang_reload: 'Необхідно перезавантажити програму, натисніть "OK" для перезавантаження.',
      settings_main_account: 'Акаунт',
      settings_main_interface: 'Інтерфейс',
      settings_main_player: 'Плеєр',
      settings_main_parser: 'Парсер',
      settings_main_torrserver: 'TorrServer',
      settings_main_plugins: 'Плагіни',
      settings_main_rest: 'Iнше',
      settings_rest_start: 'Початкова сторінка',
      settings_rest_start_descr: 'З якої сторінки починати під час запуску',
      settings_rest_source: 'Джерело',
      settings_rest_source_use: 'Основне джерело',
      settings_rest_source_descr: 'Звідки брати інформацію про фільми',
      settings_rest_tmdb_lang: 'Якою мовою відображати дані з TMDB',
      settings_rest_tmdb_prox: 'Проксирувати TMDB',
      settings_rest_tmdb_posters: 'Раздільна здатність TMDB',
      settings_rest_screensaver: 'Скрінсейвер',
      settings_rest_screensaver_use: 'Показувати заставку за бездіяльності',
      settings_rest_screensaver_type: 'Тип заставки',
      settings_rest_helper: 'Підказки',
      settings_rest_helper_use: 'Показувати підказки',
      settings_rest_helper_reset: 'Показати підказки знову',
      settings_rest_pages: 'Скільки сторінок зберігати у пам\'яті',
      settings_rest_pages_descr: 'Зберігає сторінки в тому стані, в якому ви їх покинули',
      settings_rest_time: 'Змістити час',
      settings_rest_navigation: 'Тип навігації',
      settings_rest_keyboard: 'Тип клавіатури',
      settings_rest_device: 'Назва пристрою',
      settings_rest_device_placeholder: 'Наприклад: Моя Лампа',
      settings_rest_cache: 'Очистити кеш',
      settings_rest_cache_descr: 'Будуть очищені всі налаштування та дані',
      settings_parser_use: 'Використовувати парсер',
      settings_parser_use_descr: 'Тим самим ви погоджуєтесь взяти на себе всю відповідальність за використання публічних посилань для перегляду торрент та онлайн контенту.',
      settings_parser_type: 'Тип парсера для торентів',
      settings_parser_jackett_placeholder: 'Наприклад: 192.168.х',
      settings_parser_jackett_link: 'Посилання',
      settings_parser_jackett_link_descr: 'Вкажіть посилання на скрипт Jackett',
      settings_parser_jackett_key_placeholder: 'Наприклад: sa0sk83d.',
      settings_parser_jackett_key: 'Api ключ',
      settings_parser_jackett_key_descr: 'Знаходиться у Jackett',
      settings_parser_torlook_type: 'Метод парсингу сайту TorLook',
      settings_parser_scraperapi_placeholder: 'Наприклад: scraperapi.com',
      settings_parser_scraperapi_link: 'Посилання на парсер сайтів',
      settings_parser_scraperapi_descr: 'Зареєструйтесь на сайті scraperapi.com, введіть посилання api.scraperapi.com?api_key=...&url={q}<br>У {q} буде поставлятися сайт w41.torlook.info',
      settings_parser_search: 'Пошук',
      settings_parser_search_descr: 'Якою мовою здійснювати пошук?',
      settings_parser_in_search: 'Парсер у пошуку',
      settings_parser_in_search_descr: 'Показувати результати у пошуку?',
      settings_player_type: 'Тип плеєра',
      settings_player_type_descr: 'Яким плеєром відтворювати',
      settings_player_reset: 'Скинути програвач за замовчуванням',
      settings_player_reset_descr: 'Скидає вибраний Android плеєр у програмі',
      settings_player_path: 'Шлях до плеєра',
      settings_player_path_descr: 'Вкажіть шлях до програвача .exe.',
      settings_player_normalization: 'Нормалізація звуку',
      settings_player_normalization_descr: 'Нормалізує звук в один рівень, знижує гучні звуки та підвищує тихі.',
      settings_player_next_episode: 'Наступна серія',
      settings_player_next_episode_descr: 'Автоматично перемикати на наступну серію після закінчення поточної',
      settings_player_timecode: 'Тайм-код',
      settings_player_timecode_descr: 'Продовжити з останнього місця перегляду',
      settings_player_scale: 'Метод масштабування',
      settings_player_scale_descr: 'Як проводити обчислення для масштабування відео',
      settings_player_subs: 'Субтитри',
      settings_player_subs_use: 'Увімкнути',
      settings_player_subs_use_descr: 'Завжди включати субтитри після запуску відео',
      settings_player_subs_size: 'Розмір',
      settings_player_subs_size_descr: 'Розмір субтитрів на екрані',
      settings_player_subs_stroke_use: 'Використовувати окантовку',
      settings_player_subs_stroke_use_descr: 'Субтитри будуть обведені чорним кольором для покращення читаності',
      settings_player_subs_backdrop_use: 'Використовувати підкладку',
      settings_player_subs_backdrop_use_descr: 'Субтитри відображатимуться на напівпрозорій підкладці для покращення читаності',
      settings_player_quality: 'Якість відео за замовчуванням',
      settings_player_quality_descr: 'Переважна якість відео для перегляду',
      settings_plugins_notice: 'Для застосування плагіна необхідно перезавантажити програму',
      settings_plugins_add: 'Додати плагін',
      settings_plugins_add_descr: 'Щоб видалити доданий плагін, утримуйте або натисніть двічі клавішу (OK) на ньому.',
      settings_plugins_install: 'Встановити плагін',
      settings_plugins_install_descr: 'Встановити плагін зі списку доступних',
      settings_server_link: 'Використовувати посилання',
      settings_server_links: 'Посилання',
      settings_server_placeholder: 'Наприклад: 192.168.х',
      settings_server_link_one: 'Основне посилання',
      settings_server_link_one_descr: 'Вкажіть основне посилання на скрипт TorrServer',
      settings_server_link_two: 'Додаткове посилання',
      settings_server_link_two_descr: 'Вкажіть додаткове посилання на скрипт TorrServer',
      settings_server_additionally: 'Додатково',
      settings_server_client: 'Вбудований клієнт',
      settings_server_client_descr: 'Використовувати вбудований JS-клієнт TorrServe, інакше запускається системний.',
      settings_server_base: 'Зберегти у базу',
      settings_server_base_descr: 'Торрент буде додано до бази TorrServer',
      settings_server_preload: 'Використовувати буфер попереднього завантаження',
      settings_server_preload_descr: 'Чекати на заповнення буфера попереднього завантаження TorrServer перед програванням',
      settings_server_auth: 'Авторизація',
      settings_server_password_use: 'Вхід паролем',
      settings_server_login: 'Логін',
      settings_server_password: 'Пароль',
      settings_server_not_specified: 'Не вказано',
      torent_nohash_reasons: 'Причини',
      torent_nohash_reason_one: 'TorServer не зміг завантажити файл торрент',
      torent_nohash_reason_two: 'Відповідь від TorServer',
      torent_nohash_reason_three: 'Посилання',
      torent_nohash_do: 'Що робити?',
      torent_nohash_do_one: 'Перевірте, чи правильно ви налаштували Jackett',
      torent_nohash_do_two: 'Приватні джерела можуть не видавати посилання на файл',
      torent_nohash_do_three: 'Переконайтеся, що Jackett теж може завантажити файл',
      torent_nohash_do_four: 'Написати в нашу телеграму групу: @lampa_group',
      torent_nohash_do_five: 'Вкажіть який фільм, яка роздача та по можливості фото цієї роздачі',
      torrent_error_text: 'Не вдалося підключитися до TorrServe. Давайте швидко пройдемося по списку можливих проблем і перевіримо все.',
      torrent_error_step_1: 'Чи запущений TorrServe',
      torrent_error_step_2: 'Динамічна IP-адреса',
      torrent_error_step_3: 'Протокол та порт',
      torrent_error_step_4: 'Блокування антивірусами',
      torrent_error_step_5: 'Перевірте доступність',
      torrent_error_step_6: 'Все одно не працює',
      torrent_error_info_1: 'Переконайтеся, що TorrServe запущено на пристрої, де він встановлений.',
      torrent_error_info_2: 'Часта помилка змінилася IP-адреса пристрою з TorrServe. Переконайтеся, що IP-адреса, яку ви ввели - {ip}, збігається з адресою пристрою, на якому встановлено TorrServe.',
      torrent_error_info_3: 'Для підключення до TorrServe необхідно вказати протокол http:// на початку та порт :8090 в кінці адреси. Переконайтеся, що після IP-адреси вказано порт, ваша поточна адреса - {ip}',
      torrent_error_info_4: 'Часте явище, антивірус або брандмауер може блокувати доступ за IP-адресою, спробуйте вимкнути антивірус та брандмауер.',
      torrent_error_info_5: 'На будь-якому іншому пристрої в цій мережі, відкрийте в браузері адресу {ip} і перевірте, чи доступний веб-інтерфейс TorrServe.',
      torrent_error_info_6: 'Якщо після всіх перевірок все одно виникає помилка підключення, спробуйте перезавантажити TorrServe та інтернет-адаптер.',
      torrent_error_info_7: 'Якщо проблему не вирішено, пишіть у Telegram-групу @lampa_group з текстом (Lampa не підключається до TorrServe після всіх перевірок, поточна адреса {ip})',
      torrent_error_start: 'Розпочати перевірку',
      torrent_error_nomatrix: 'Неможливо підтвердити версію Matrix',
      torrent_error_made: 'Виконано',
      torrent_error_from: 'з',
      torrent_error_next: 'Далі',
      torrent_error_complite: 'Завершити',
      torrent_error_connect: 'Помилка підключення',
      torrent_install_need: 'Необхідний TorrServe',
      torrent_install_text: 'TorrServe – додаток, який дозволяє переглядати контент з торрент-файлів в онлайн режимі.',
      torrent_install_contact: 'Telegram-групи',
      torrent_item_bitrate: 'Бітрейт',
      torrent_item_seeds: 'Роздають',
      torrent_item_grabs: 'Качають',
      torrent_item_mb: 'Мбіт/с',
      torrent_serial_episode: 'Серія',
      torrent_serial_season: 'Сезон',
      torrent_serial_date: 'Вихід',
      torrent_get_magnet: 'Запитую magnet посилання',
      torrent_remove_title: 'вилучити',
      torrent_remove_descr: 'Торрент буде видалено зі списку',
      torrent_parser_any_one: 'Будь-яке',
      torrent_parser_any_two: 'Будь-який',
      torrent_parser_no_choice: 'Не вибрано',
      torrent_parser_yes: 'Так',
      torrent_parser_no: 'Ні',
      torrent_parser_quality: 'Якість',
      torrent_parser_subs: 'Субтитри',
      torrent_parser_voice: 'Переклад',
      torrent_parser_tracker: 'Трекер',
      torrent_parser_year: 'Рік',
      torrent_parser_season: 'Сезон',
      torrent_parser_sort_by_seeders: 'По роздаючих',
      torrent_parser_sort_by_size: 'По розміру',
      torrent_parser_sort_by_name: 'За назвою',
      torrent_parser_sort_by_tracker: 'За джерелом',
      torrent_parser_sort_by_date: 'По даті',
      torrent_parser_sort_by_viewed: 'За переглянутими',
      torrent_parser_voice_dubbing: 'Дубляж',
      torrent_parser_voice_polyphonic: 'Багатоголосий',
      torrent_parser_voice_two: 'Двоголосий',
      torrent_parser_voice_amateur: 'Аматорський',
      torrent_parser_reset: 'Скинути фільтр',
      torrent_parser_empty: 'Не вдалося отримати результатів',
      torrent_parser_no_hash: 'Неможливо отримати HASH',
      torrent_parser_added_to_mytorrents: 'додано до «Моїх торрентів»',
      torrent_parser_add_to_mytorrents: 'Додати до «Моїх торентів»',
      torrent_parser_label_title: 'Позначити',
      torrent_parser_label_descr: 'Позначити роздачу з прапором (переглянуто)',
      torrent_parser_label_cancel_title: 'Зняти позначку',
      torrent_parser_label_cancel_descr: 'Зняти відмітку з роздачі (переглянуто)',
      torrent_parser_timeout: 'Час очікування минув',
      torrent_parser_nofiles: 'Не вдалося вилучити відповідні файли',
      torrent_parser_set_link: 'Вкажіть посилання для парсингу',
      torrent_parser_request_error: 'Помилка у запиті',
      torrent_parser_magnet_error: 'Не вдалося отримати magnet посилання',
      about_text: 'Додаток повністю безкоштовний і використовує публічні посилання для отримання інформації про відео, новинки, популярні фільми і т.д. Вся доступна інформація використовується виключно з пізнавальною метою, додаток не використовує свої власні сервери для поширення інформації.',
      about_channel: 'Наш канал',
      about_group: 'Група',
      about_version: 'Версія',
      about_donate: 'Донат',
      title_watched: 'Ви дивилися',
      title_settings: 'Налаштування',
      title_collections: 'Добірки',
      title_collections_ivi: 'Добірки на ivi',
      title_collections_okko: 'Добірки на okko',
      title_company: 'Компанія',
      title_actors: 'Актори',
      title_actor: 'Актор',
      title_actress: 'Актриса',
      title_person: 'Персона',
      title_comments: 'Коментарі',
      title_torrents: 'Торренти',
      title_trailers: 'Трейлери',
      title_watch: 'Дивитись',
      title_error: 'Помилка',
      title_links: 'Посилання',
      title_choice: 'Вибрати',
      title_main: 'Головна',
      title_book: 'Закладки',
      title_like: 'Подобається',
      title_wath: 'Пізніше',
      title_history: 'Історія переглядів',
      title_mytorrents: 'Мої торенти',
      title_last: 'Остання',
      title_action: 'Дія',
      title_producer: 'Режисер',
      title_collection: 'Колекція',
      title_recomendations: 'Рекомендації',
      title_similar: 'Подібні',
      title_about: 'Про додаток',
      title_timetable: 'Розклад',
      title_relises: 'Цифрові релізи',
      title_catalog: 'Каталог',
      title_category: 'Категорія',
      title_parser: 'Парсер',
      title_type: 'Тип',
      title_rating: 'Рейтинг',
      title_country: 'Країна',
      title_year: 'Рік',
      title_genre: 'Жанр',
      title_filter: 'Фільтр',
      title_notice: 'Повідомлення',
      title_files: 'Файли',
      title_now_watch: 'Зараз дивляться',
      title_latest: 'Останнє додавання',
      title_continue: 'Продовжити перегляд',
      title_recomend_watch: 'Рекомендуємо подивитись',
      title_new_episodes: 'Нові серії',
      title_popular: 'Популярне',
      title_popular_movie: 'Популярні фільми',
      title_popular_tv: 'Популярні серіали',
      title_new_this_year: 'Новинки цього року',
      title_hight_voite: 'З високим рейтингом',
      title_new: 'Новинки',
      title_trend_day: 'Сьогодні у тренді',
      title_trend_week: 'У тренді за тиждень',
      title_upcoming: 'Дивіться у кінозалах',
      title_top_movie: 'Топ фільми',
      title_top_tv: 'Топ серіали',
      title_tv_today: 'Сьогодні в ефірі',
      title_this_week: 'На цьому тижні',
      title_in_top: 'У топі',
      title_out: 'Вихід',
      title_out_confirm: 'Так, вийти',
      title_continue_two: 'Продовжити',
      company_headquarters: 'Штаб',
      company_homepage: 'Сайт',
      company_country: 'Країна',
      filter_clarify: 'Уточнити',
      filter_clarify_two: 'Уточнити пошук',
      filter_set_name: 'Вказати назву',
      filter_sorted: 'Сортувати',
      filter_filtred: 'Фільтр',
      filter_any: 'Будь-який',
      filter_rating_from: 'від',
      filter_rating_to: 'до',
      filter_country_uk: 'Україна',
      filter_country_en: 'США',
      filter_country_ru: 'Росія',
      filter_country_ja: 'Японія',
      filter_country_ko: 'Корея',
      filter_country_az: 'Азербайджан',
      filter_country_sq: 'Албанія',
      filter_country_be: 'Білорусь',
      filter_country_bg: 'Болгарія',
      filter_country_de: 'Німеччина',
      filter_country_ka: 'Грузія',
      filter_country_da: 'Данія',
      filter_country_et: 'Естонія',
      filter_country_ga: 'Ірландія',
      filter_country_es: 'Іспанія',
      filter_country_it: 'Італія',
      filter_country_zh: 'Китай',
      filter_country_lv: 'Латвія',
      filter_country_ne: 'Непал',
      filter_country_no: 'Норвегія',
      filter_country_pl: 'Польща',
      filter_country_ro: 'Румунія',
      filter_country_sr: 'Сербія',
      filter_country_sk: 'Словаччина',
      filter_country_sl: 'Словенія',
      filter_country_tg: 'Таджикистан',
      filter_country_tr: 'Туреччина',
      filter_country_uz: 'Узбекистан',
      filter_country_fi: 'Фінляндія',
      filter_country_fr: 'Франція',
      filter_country_hr: 'Хорватія',
      filter_country_cs: 'Чеська Республіка',
      filter_country_sv: 'Швеція',
      filter_genre_ac: 'Бойовик',
      filter_genre_ad: 'Пригоди',
      filter_genre_mv: 'Мультфільм',
      filter_genre_cm: 'Комедія',
      filter_genre_cr: 'Кримінал',
      filter_genre_dc: 'Документальний',
      filter_genre_dr: 'Драма',
      filter_genre_fm: 'Сімейний',
      filter_genre_fe: 'Фентезі',
      filter_genre_hi: 'Історія',
      filter_genre_ho: 'Жахи',
      filter_genre_mu: 'Музика',
      filter_genre_de: 'Детектив',
      filter_genre_md: 'Мелодрама',
      filter_genre_fa: 'Фантастика',
      filter_genre_tv: 'Телевізійний фільм',
      filter_genre_tr: 'Трилер',
      filter_genre_mi: 'Військовий',
      filter_genre_ve: 'Вестерн',
      filter_genre_aa: 'Бойовик та Пригоди',
      filter_genre_ch: 'Дитячий',
      filter_genre_nw: 'Новини',
      filter_genre_rs: 'Реаліті шоу',
      filter_genre_hf: 'НФ та Фентезі',
      filter_genre_op: 'Мильна опера',
      filter_genre_tc: 'Ток шоу',
      filter_genre_mp: 'Війна та Політика',
      ivi_premieres: 'Прем\'єри фільмів',
      ivi_best: 'Найкращі фільми',
      ivi_popular: 'Популярне зараз',
      ivi_choice: 'Вибір ivi',
      ivi_new: 'Новинки',
      ivi_foreign: 'Закордонні',
      ivi_ru: 'Російські',
      ivi_recomend: 'Рекомендуємо вам переглянути',
      ivi_for_famaly: 'Мультики для всієї родини',
      ivi_triller: 'Трилери-жахи',
      ivi_advance: 'Пригодницькі комедії',
      ivi_detective: 'Екранізації детективів',
      ivi_crime_comedy: 'Кримінальні комедії',
      ivi_romantic: 'Романтичні драми',
      ivi_crime_dramas: 'Кримінальні драми',
      ivi_fantastic_dramas: 'Фантастичні драми',
      ivi_military_dramas: 'Військові драми',
      ivi_mistic: 'Містичні фільми',
      ivi_foreign_series: 'Зарубіжні серіали',
      ivi_historical_series: 'Історичні серіали',
      okko_top_new: 'Топ-новинки',
      okko_comedy_horror: 'Комедійні фільми жахів',
      okko_collection_maniacs: 'Фільми про маніяків',
      okko_witches: 'Фільми про відьом',
      okko_zombies: 'Фільми про зомбі',
      okko_ru: 'Російські',
      okko_horror_serial: 'Дуже страшні',
      okko_serial_killers: 'Про маніяків',
      okko_humor_serial: 'З чорним гумором',
      okko_legkiye_serialy: 'Легкі',
      okko_comedy_serial: 'Комедійні',
      okko_ru_tv: 'Російські',
      empty_title: 'Пусто',
      empty_text: 'За вашим фільтром нічого не знайшлося, уточніть фільтр.',
      empty_title_two: 'Тут порожньо',
      empty_text_two: 'На даний момент список порожній',
      menu_main: 'Головна',
      menu_movies: 'Фільми',
      menu_tv: 'Серіали',
      menu_catalog: 'Каталог',
      menu_filter: 'Фільтр',
      menu_collections: 'Добірки',
      menu_relises: 'Релізи',
      menu_anime: 'Аніме',
      menu_bookmark: 'Закладки',
      menu_like: 'Подобається',
      menu_time: 'Пізніше',
      menu_history: 'Історія',
      menu_timeline: 'Розклад',
      menu_torrents: 'Торренти',
      menu_settings: 'Налаштування',
      menu_about: 'Інформація',
      menu_console: 'Консоль',
      menu_multmovie: 'Мультфільми',
      menu_multtv: 'Мультсеріали',
      plugins_catalog_work: 'Робочі плагіни',
      plugins_catalog_work_descr: 'Плагіни, які точно працюють у лампі.',
      plugins_catalog_popular: 'Популярні плагіни серед користувачів',
      plugins_catalog_popular_descr: 'Встановлення з невідомих джерел може призвести до некоректної роботи програми.',
      plugins_online: 'Перегляд онлайн',
      plugins_check_fail: 'Не вдалося перевірити працездатність плагіна. Однак це не означає, що плагін не працює. Перезавантажте програму для з\'ясування, чи завантажується плагін.',
      plugins_need_reload: 'Для застосування плагіна необхідно перезавантажити програму',
      plugins_install: 'Встановити',
      plugins_install_ready: 'Цей плагін вже встановлено.',
      plugins_installed: 'Установок',
      plugins_load_from: 'Завантажено із CUB',
      plugins_ok_for_check: 'Натисніть (OK), щоб перевірити плагін',
      plugins_no_loaded: 'При завантаженні програми частина плагінів не вдалося завантажити',
      time_viewed: 'Переглянуто',
      time_from: 'з',
      time_reset: 'Скинути тайм-код',
      settings_clear_cache: 'Кеш та дані очищені',
      settings_user_links: 'Користувальницьке посилання',
      settings_for_local: 'Для локального TorrServer',
      settings_add: 'Додати',
      settings_remove: 'Вилучити',
      settings_this_value: 'поточне значення',
      settings_added: 'Додано',
      settings_removed: 'Вилучено',
      settings_param_player_inner: 'Вбудований',
      settings_param_player_outside: 'Зовнішній',
      settings_param_yes: 'Так',
      settings_param_no: 'Ні',
      settings_param_interface_size_small: 'Менше',
      settings_param_interface_size_normal: 'Нормальний',
      settings_param_poster_quality_low: 'Низьке',
      settings_param_poster_quality_average: 'Середнє',
      settings_param_poster_quality_high: 'Висока',
      settings_param_parse_directly: 'Безпосередньо',
      settings_param_parse_api: 'Через API сайту',
      settings_param_background_complex: 'Складний',
      settings_param_background_simple: 'Простий',
      settings_param_background_image: 'Картинка',
      settings_param_link_use_one: 'Основну',
      settings_param_link_use_two: 'Додаткову',
      settings_param_subtitles_size_small: 'Маленькі',
      settings_param_subtitles_size_normal: 'Звичайні',
      settings_param_subtitles_size_bigger: 'Великі',
      settings_param_screensaver_nature: 'Природа',
      settings_param_lang_ru: 'Русский',
      settings_param_lang_zh: '简体中文',
      settings_param_lang_uk: 'Українська',
      settings_param_lang_en: 'English',
      settings_param_torrent_lang_orig: 'Оригінал',
      settings_param_torrent_lang_ru: 'Русский',
      settings_param_player_timecode_again: 'Почати спочатку',
      settings_param_player_timecode_continue: 'Продовжити',
      settings_param_player_timecode_ask: 'Запитувати',
      settings_param_player_scale_method: 'Розрахувати',
      settings_param_card_view_load: 'Підвантажувати',
      settings_param_card_view_all: 'Показати все',
      settings_param_navigation_remote: 'Пульт',
      settings_param_navigation_mouse: 'Пульт з мишкою',
      settings_param_keyboard_lampa: 'Вбудована',
      settings_param_keyboard_system: 'Системна',
      helper_keyboard: 'Після введення значення натисніть кнопку «Назад», щоб зберегти',
      helper_torrents: 'Утримуйте клавішу (OK), щоб викликати контекстне меню',
      helper_cleared: 'Успішно підказки будуть показані заново.',
      helper_torrents_view: 'Щоб скинути тайм-код та виклик меню, утримуйте (OK).',
      fav_sync_title: 'Синхронізація закладок',
      fav_sync_text: 'Хочеш, щоб твої улюблені закладки були на всіх твоїх пристроях? <br><br>Зареєструйся на сайті www.cub.watch, створи профіль та авторизуйся в лампі.',
      fav_sync_site: 'Сайт',
      fav_remove_title: 'Видалити з історії',
      fav_remove_descr: 'Видалити виділену картку',
      fav_clear_title: 'Очистити історію',
      fav_clear_descr: 'Видалити всі картки з історії',
      fav_clear_label_title: 'Очистити мітки',
      fav_clear_label_descr: 'Очистити мітки про перегляд',
      fav_clear_time_title: 'Очистити тайм-коди',
      fav_clear_time_descr: 'Очистити всі тайм-коди',
      fav_label_cleared: 'Відмітки очищені',
      fav_time_cleared: 'Тайм-коди очищені',
      timetable_empty: 'У цьому розділі відображатимуться дати виходу нових серій',
      player_quality: 'Якість',
      player_tracks: 'Аудіодоріжки',
      player_disabled: 'Вимкнено',
      player_unknown: 'Невідомо',
      player_subs: 'Субтитри',
      player_size_default_title: 'За замовчуванням',
      player_size_default_descr: 'Розмір відео за замовчуванням',
      player_size_cover_title: 'Розширити',
      player_size_cover_descr: 'Розширює відео на весь екран',
      player_size_fill_title: 'Заповнити',
      player_size_fill_descr: 'Помістити відео на весь екран',
      player_size_115_title: 'Збільшити 115%',
      player_size_115_descr: 'Збільшити відео на 115%',
      player_size_130_title: 'Збільшити 130%',
      player_size_130_descr: 'Збільшити відео на 130%',
      player_size_v115_title: 'По вертикалі 115%',
      player_size_v115_descr: 'Збільшити відео на 115%',
      player_size_v130_title: 'По вертикалі 130%',
      player_size_v130_descr: 'Збільшити відео на 130%',
      player_video_size: 'Розмір відео',
      player_playlist: 'Плейлист',
      player_error_one: 'Не вдалося декодувати відео',
      player_error_two: 'Відео не знайдено або пошкоджено',
      player_start_from: 'Продовжити перегляд з',
      player_not_found: 'Плеєр не знайдено',
      player_lauch: 'Запустити плеєр',
      broadcast_open: 'Відкрити картку на іншому пристрої',
      broadcast_play: 'Виберіть пристрій, на якому дивитися',
      card_new_episode: 'Нова серія',
      card_book_remove: 'Прибрати із закладок',
      card_book_add: 'В закладки',
      card_book_descr: 'Дивіться у меню (Закладки)',
      card_like_remove: 'Прибрати з уподобаних',
      card_like_add: 'Подобається',
      card_like_descr: 'Дивіться у меню (Подобається)',
      card_wath_remove: 'Прибрати з очікуваних',
      card_wath_add: 'Дивитися пізніше',
      card_wath_descr: 'Дивіться в меню (Пізніше)',
      card_history_remove: 'Прибрати з історії',
      card_history_add: 'Додати в історію',
      card_history_descr: 'Дивіться у меню (Історія)',
      keyboard_listen: 'Кажіть, я слухаю...',
      keyboard_nomic: 'Немає доступу до мікрофону',
      notice_new_quality: 'Доступна нова якість',
      notice_quality: 'Якість',
      notice_new_episode: 'Нова серія',
      notice_none: 'У вас ще немає жодних повідомлень, зареєструйтесь на сайті <b>www.cub.watch</b>, щоб стежити за новими серіями та релізами.',
      notice_in_quality: 'В якості',
      copy_link: 'Копіювати посилання на відео',
      copy_secuses: 'Посилання скопійоване в буфер обміну',
      copy_error: 'Помилка під час копіювання посилання',
      account_sync_to_profile: 'Усі закладки будуть перенесені до профілю',
      account_sync_secuses: 'Усі закладки успішно перенесені',
      account_profiles: 'Профілі',
      account_profiles_empty: 'Неможливо отримати список профілів',
      account_authorized: 'Авторизовані',
      account_logged_in: 'Ви увійшли під обліковий запис',
      account_login_failed: 'Вхід не виконано',
      account_login_wait: 'Очікуємо входу до облікового запису',
      account_profile_main: 'Загальний',
      account_export_secuses: 'Експорт успішно завершено',
      account_export_fail: 'Помилка під час експорту',
      account_import_secuses: 'Імпорт успішно завершено',
      account_import_fail: 'Помилка при імпорті',
      account_imported: 'імпортовано',
      account_reload_after: 'перезавантаження через 5 с.',
      network_noconnect: 'Немає підключення до мережі',
      network_404: 'Запрошеної сторінки не знайдено. [404]',
      network_401: 'Авторизація не вдалася',
      network_500: 'Внутрішня помилка сервера. [500]',
      network_parsererror: 'Запитаний синтаксичний аналіз JSON завершився невдало.',
      network_timeout: 'Час запиту минув.',
      network_abort: 'Запит було перервано.',
      network_error: 'Невідома помилка',
      size_zero: '0 Байт',
      size_byte: 'Байт',
      size_kb: 'КБ',
      size_mb: 'МБ',
      size_gb: 'ГБ',
      size_tb: 'ТБ',
      size_pp: 'ПБ',
      speed_bit: 'біт',
      speed_kb: 'Кбіт',
      speed_mb: 'Мбіт',
      speed_gb: 'Гбіт',
      speed_tb: 'Тбіт',
      speed_pp: 'Пбіт',
      month_1: 'Січень',
      month_2: 'Лютий',
      month_3: 'Березень',
      month_4: 'Квітень',
      month_5: 'Травень',
      month_6: 'Червень',
      month_7: 'Липня',
      month_8: 'Серпень',
      month_9: 'Вересень',
      month_10: 'Жовтень',
      month_11: 'Листопад',
      month_12: 'Грудень',
      day_1: 'Понеділок',
      day_2: 'Вівторок',
      day_3: 'Середа',
      day_4: 'Четвер',
      day_5: 'П\'ятниця',
      day_6: 'Субота',
      day_7: 'Неділя',
      month_1_e: 'Січня',
      month_2_e: 'Лютого',
      month_3_e: 'Березня',
      month_4_e: 'Квітня',
      month_5_e: 'Травня',
      month_6_e: 'Червня',
      month_7_e: 'Липня',
      month_8_e: 'Серпня',
      month_9_e: 'Вересня',
      month_10_e: 'Жовтня',
      month_11_e: 'Листопада',
      month_12_e: 'Грудня',
      week_1: 'Пн',
      week_2: 'Вт',
      week_3: 'Ср',
      week_4: 'Чт',
      week_5: 'Пт',
      week_6: 'Сб',
      week_7: 'Нд',
      settings_param_player_hls_app: 'Системний',
      settings_param_player_hls_js: 'Програмний',
      settings_player_hls_title: 'Обробка потоку .m3u8',
      settings_player_hls_descr: 'Не чіпайте цей параметр, якщо не знаєте навіщо він.',
      notice_none_account: 'У вас ще немає жодних повідомлень, додайте серіали в закладки та чекайте на повідомлення про нові серії.'
    };

    var langs = {
      zh: zh,
      ru: ru,
      uk: uk,
      en: en
    };
    var lang_default = 'zh';

    function translate(name, custom_code) {
      name = name + '';
      var code = custom_code || Storage.get('language', 'ru');
      if (!langs[code]) code = lang_default;

      if (name.indexOf('#{') >= 0) {
        return name.replace(/#{([a-z_0-9-]+)}/g, function (e, s) {
          return langs[code][s] || langs[lang_default][s] || s;
        });
      } else {
        return langs[code][name] || langs[lang_default][name] || name;
      }
    }

    function add$1(data) {
      for (var name in data) {
        for (var code in data[name]) {
          if (langs[code]) {
            langs[code][name] = data[name][code];
          }
        }
      }
    }

    function codes() {
      return {
        zh: '简体中文',
        ru: 'Русский',
        uk: 'Українська',
        en: 'English'
      };
    }

    var Lang = {
      translate: translate,
      add: add$1,
      codes: codes
    };

    if (!Object.assign) {
      Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value(target, firstSource) {

          if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
          }

          var to = Object(target);

          for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];

            if (nextSource === undefined || nextSource === null) {
              continue;
            }

            var keysArray = Object.keys(Object(nextSource));

            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
              var nextKey = keysArray[nextIndex];
              var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

              if (desc !== undefined && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }

          return to;
        }
      });
    }

    if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function () {
        this.parentNode.removeChild(this);
      };
    }

    if (!Math.trunc) {
      Math.trunc = function (v) {
        v = +v;
        return v - v % 1 || (!isFinite(v) || v === 0 ? v : v < 0 ? -0 : 0);
      };
    }

    if (!Array.from) {
      Array.from = function () {
        var toStr = Object.prototype.toString;

        var isCallable = function isCallable(fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };

        var toInteger = function toInteger(value) {
          var number = Number(value);

          if (isNaN(number)) {
            return 0;
          }

          if (number === 0 || !isFinite(number)) {
            return number;
          }

          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };

        var maxSafeInteger = Math.pow(2, 53) - 1;

        var toLength = function toLength(value) {
          var len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        }; // Свойство length метода from равно 1.


        return function from(arrayLike
        /* , mapFn, thisArg */
        ) {
          // 1. Положим C равным значению this.
          var C = this; // 2. Положим items равным ToObject(arrayLike).

          var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

          if (arrayLike == null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          } // 4. Если mapfn равен undefined, положим mapping равным false.


          var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          var T;

          if (typeof mapFn !== 'undefined') {
            // 5. иначе
            // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем
            // исключение TypeError.
            if (!isCallable(mapFn)) {
              throw new TypeError('Array.from: when provided, the second argument must be a function');
            } // 5. b. Если thisArg присутствует, положим T равным thisArg;
            // иначе положим T равным undefined.


            if (arguments.length > 2) {
              T = arguments[2];
            }
          } // 10. Положим lenValue равным Get(items, "length").
          // 11. Положим len равным ToLength(lenValue).


          var len = toLength(items.length); // 13. Если IsConstructor(C) равен true, то
          // 13. a. Положим A равным результату вызова внутреннего метода
          // [[Construct]]
          // объекта C со списком аргументов, содержащим единственный элемент
          // len.
          // 14. a. Иначе, положим A равным ArrayCreate(len).

          var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Положим k равным 0.

          var k = 0; // 17. Пока k < len, будем повторять... (шаги с a по h)

          var kValue;

          while (k < len) {
            kValue = items[k];

            if (mapFn) {
              A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }

            k += 1;
          } // 18. Положим putStatus равным Put(A, "length", len, true).


          A.length = len; // 20. Вернём A.

          return A;
        };
      }();
    } // https://tc39.github.io/ecma262/#sec-array.prototype.find


    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
          // 1. Let O be ? ToObject(this value).
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

          var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError
          // exception.

          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          } // 4. If thisArg was supplied, let T be thisArg; else let T be
          // undefined.


          var thisArg = arguments[1]; // 5. Let k be 0.

          var k = 0; // 6. Repeat, while k < len

          while (k < len) {
            // a. Let Pk be ! ToString(k).
            // b. Let kValue be ? Get(O, Pk).
            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue,
            // k, O »)).
            // d. If testResult is true, return kValue.
            var kValue = o[k];

            if (predicate.call(thisArg, kValue, k, o)) {
              return kValue;
            } // e. Increase k by 1.


            k++;
          } // 7. Return undefined.


          return undefined;
        },
        configurable: true,
        writable: true
      });
    } // https://tc39.github.io/ecma262/#sec-array.prototype.includes


    if (!Array.prototype.includes) {
      Object.defineProperty(Array.prototype, 'includes', {
        value: function value(searchElement, fromIndex) {
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          } // 1. Let O be ? ToObject(this value).


          var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

          var len = o.length >>> 0; // 3. If len is 0, return false.

          if (len === 0) {
            return false;
          } // 4. Let n be ? ToInteger(fromIndex).
          // (If fromIndex is undefined, this step produces the value 0.)


          var n = fromIndex | 0; // 5. If n ≥ 0, then
          // a. Let k be n.
          // 6. Else n < 0,
          // a. Let k be len + n.
          // b. If k < 0, let k be 0.

          var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

          function sameValueZero(x, y) {
            return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
          } // 7. Repeat, while k < len


          while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k)).
            // b. If SameValueZero(searchElement, elementK) is true, return
            // true.
            if (sameValueZero(o[k], searchElement)) {
              return true;
            } // c. Increase k by 1.


            k++;
          } // 8. Return false


          return false;
        }
      });
    }

    if (!String.prototype.includes) {
      String.prototype.includes = function (search, start) {

        if (search instanceof RegExp) {
          throw TypeError('first argument must not be a RegExp');
        }

        if (start === undefined) {
          start = 0;
        }

        return this.indexOf(search, start) !== -1;
      };
    }

    if (!Object.entries) {
      Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array

        while (i--) {
          resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }

        return resArray;
      };
    }

    if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
          // ближайший аналог внутренней функции
          // IsCallable в ECMAScript 5
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function fNOP() {},
            fBound = function fBound() {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
      };
    }

    (function () {

      var _slice = Array.prototype.slice;

      try {
        // Не может использоваться с элементами DOM в IE < 9
        _slice.call(document.documentElement);
      } catch (e) {
        // В IE < 9 кидается исключение
        // Функция будет работать для истинных массивов, массивоподобных объектов,
        // NamedNodeMap (атрибуты, сущности, примечания),
        // NodeList (например, getElementsByTagName), HTMLCollection (например, childNodes)
        // и не будет падать на других объектах DOM (как это происходит на элементах DOM в IE < 9)
        Array.prototype.slice = function (begin, end) {
          // IE < 9 будет недоволен аргументом end, равным undefined
          end = typeof end !== 'undefined' ? end : this.length; // Для родных объектов Array мы используем родную функцию slice

          if (Object.prototype.toString.call(this) === '[object Array]') {
            return _slice.call(this, begin, end);
          } // Массивоподобные объекты мы обрабатываем самостоятельно


          var i,
              cloned = [],
              size,
              len = this.length; // Обрабатываем отрицательное значение begin

          var start = begin || 0;
          start = start >= 0 ? start : len + start; // Обрабатываем отрицательное значение end

          var upTo = end ? end : len;

          if (end < 0) {
            upTo = len + end;
          } // Фактически ожидаемый размер среза


          size = upTo - start;

          if (size > 0) {
            cloned = new Array(size);

            if (this.charAt) {
              for (i = 0; i < size; i++) {
                cloned[i] = this.charAt(start + i);
              }
            } else {
              for (i = 0; i < size; i++) {
                cloned[i] = this[start + i];
              }
            }
          }

          return cloned;
        };
      }
    })();

    var data = {};
    data.type = {
      title: '#{title_type}',
      items: [{
        title: '#{menu_movies}',
        selected: true,
        cat: 'movie'
      }, {
        title: '#{menu_multmovie}',
        cat: 'multmovie'
      }, {
        title: '#{menu_tv}',
        cat: 'tv'
      }, {
        title: '#{menu_multtv}',
        cat: 'multtv'
      }, {
        title: '#{menu_anime}',
        cat: 'anime'
      }]
    };
    data.rating = {
      title: '#{title_rating}',
      items: [{
        title: '#{filter_any}'
      }, {
        title: '#{filter_rating_from} 1 #{filter_rating_to} 3',
        voite: '1-3'
      }, {
        title: '#{filter_rating_from} 3 #{filter_rating_to} 6',
        voite: '3-6'
      }, {
        title: '#{filter_rating_from} 6 #{filter_rating_to} 8',
        voite: '6-8'
      }, {
        title: '#{filter_rating_from} 8 #{filter_rating_to} 9',
        voite: '8-9'
      }, {
        title: '#{filter_rating_from} 8',
        start: 8
      }, {
        title: '#{filter_rating_from} 6',
        start: 6
      }, {
        title: '#{filter_rating_from} 4',
        start: 4
      }, {
        title: '#{filter_rating_from} 2',
        start: 2
      }]
    };
    data.country = {
      title: '#{title_country}',
      items: [{
        title: '#{filter_country_uk}',
        code: 'uk'
      }, {
        title: '#{filter_country_en}',
        code: 'en'
      }, {
        title: '#{filter_country_ru}',
        code: 'ru'
      }, {
        title: '#{filter_country_ja}',
        code: 'ja'
      }, {
        title: '#{filter_country_ko}',
        code: 'ko'
      }, {
        title: '#{filter_country_az}',
        code: 'az'
      }, {
        title: '#{filter_country_sq}',
        code: 'sq'
      }, {
        title: '#{filter_country_be}',
        code: 'be'
      }, {
        title: '#{filter_country_bg}',
        code: 'bg'
      }, {
        title: '#{filter_country_de}',
        code: 'de'
      }, {
        title: '#{filter_country_ka}',
        code: 'ka'
      }, {
        title: '#{filter_country_da}',
        code: 'da'
      }, {
        title: '#{filter_country_et}',
        code: 'et'
      }, {
        title: '#{filter_country_ga}',
        code: 'ga'
      }, {
        title: '#{filter_country_es}',
        code: 'es'
      }, {
        title: '#{filter_country_it}',
        code: 'it'
      }, {
        title: '#{filter_country_zh}',
        code: 'zh'
      }, {
        title: '#{filter_country_lv}',
        code: 'lv'
      }, {
        title: '#{filter_country_ne}',
        code: 'ne'
      }, {
        title: '#{filter_country_no}',
        code: 'no'
      }, {
        title: '#{filter_country_pl}',
        code: 'pl'
      }, {
        title: '#{filter_country_ro}',
        code: 'ro'
      }, {
        title: '#{filter_country_sr}',
        code: 'sr'
      }, {
        title: '#{filter_country_sk}',
        code: 'sk'
      }, {
        title: '#{filter_country_sl}',
        code: 'sl'
      }, {
        title: '#{filter_country_tg}',
        code: 'tg'
      }, {
        title: '#{filter_country_tr}',
        code: 'tr'
      }, {
        title: '#{filter_country_uz}',
        code: 'uz'
      }, {
        title: '#{filter_country_fi}',
        code: 'fi'
      }, {
        title: '#{filter_country_fr}',
        code: 'fr'
      }, {
        title: '#{filter_country_hr}',
        code: 'hr'
      }, {
        title: '#{filter_country_cs}',
        code: 'cs'
      }, {
        title: '#{filter_country_sv}',
        code: 'sv'
      }, {
        title: '#{filter_country_et}',
        code: 'et'
      }]
    };
    data.genres_movie = {
      title: '#{title_genre}',
      items: [{
        "id": 28,
        "title": "#{filter_genre_ac}",
        checkbox: true
      }, {
        "id": 12,
        "title": "#{filter_genre_ad}",
        checkbox: true
      }, {
        "id": 16,
        "title": "#{filter_genre_mv}",
        checkbox: true
      }, {
        "id": 35,
        "title": "#{filter_genre_cm}",
        checkbox: true
      }, {
        "id": 80,
        "title": "#{filter_genre_cr}",
        checkbox: true
      }, {
        "id": 99,
        "title": "#{filter_genre_dc}",
        checkbox: true
      }, {
        "id": 18,
        "title": "#{filter_genre_dr}",
        checkbox: true
      }, {
        "id": 10751,
        "title": "#{filter_genre_fm}",
        checkbox: true
      }, {
        "id": 14,
        "title": "#{filter_genre_fe}",
        checkbox: true
      }, {
        "id": 36,
        "title": "#{filter_genre_hi}",
        checkbox: true
      }, {
        "id": 27,
        "title": "#{filter_genre_ho}",
        checkbox: true
      }, {
        "id": 10402,
        "title": "#{filter_genre_mu}",
        checkbox: true
      }, {
        "id": 9648,
        "title": "#{filter_genre_de}",
        checkbox: true
      }, {
        "id": 10749,
        "title": "#{filter_genre_md}",
        checkbox: true
      }, {
        "id": 878,
        "title": "#{filter_genre_fa}",
        checkbox: true
      }, {
        "id": 10770,
        "title": "#{filter_genre_tv}",
        checkbox: true
      }, {
        "id": 53,
        "title": "#{filter_genre_tr}",
        checkbox: true
      }, {
        "id": 10752,
        "title": "#{filter_genre_mi}",
        checkbox: true
      }, {
        "id": 37,
        "title": "#{filter_genre_ve}",
        checkbox: true
      }]
    };
    data.genres_tv = {
      title: '#{title_genre}',
      items: [{
        "id": 10759,
        "title": "#{filter_genre_aa}",
        checkbox: true
      }, {
        "id": 16,
        "title": "#{filter_genre_mv}",
        checkbox: true
      }, {
        "id": 35,
        "title": "#{filter_genre_cm}",
        checkbox: true
      }, {
        "id": 80,
        "title": "#{filter_genre_cr}",
        checkbox: true
      }, {
        "id": 99,
        "title": "#{filter_genre_dc}",
        checkbox: true
      }, {
        "id": 18,
        "title": "#{filter_genre_dr}",
        checkbox: true
      }, {
        "id": 10751,
        "title": "#{filter_genre_fm}",
        checkbox: true
      }, {
        "id": 10762,
        "title": "#{filter_genre_ch}",
        checkbox: true
      }, {
        "id": 9648,
        "title": "#{filter_genre_de}",
        checkbox: true
      }, {
        "id": 10763,
        "title": "#{filter_genre_nw}",
        checkbox: true
      }, {
        "id": 10764,
        "title": "#{filter_genre_rs}",
        checkbox: true
      }, {
        "id": 10765,
        "title": "#{filter_genre_hf}",
        checkbox: true
      }, {
        "id": 10766,
        "title": "#{filter_genre_op}",
        checkbox: true
      }, {
        "id": 10767,
        "title": "#{filter_genre_tc}",
        checkbox: true
      }, {
        "id": 10768,
        "title": "#{filter_genre_mp}",
        checkbox: true
      }, {
        "id": 37,
        "title": "#{filter_genre_ve}",
        checkbox: true
      }]
    };
    data.year = {
      title: '#{title_year}',
      items: [{
        title: '#{filter_any}',
        any: true
      }]
    };
    var i = 100,
        y = new Date().getFullYear();

    while (i -= 5) {
      var end = y - (99 - i);
      data.year.items.push({
        title: end + 5 + '-' + end
      });
    }

    data.country.items.forEach(function (i) {
      return i.checkbox = true;
    });

    function select(where, a) {
      where.forEach(function (element) {
        element.selected = false;
      });
      a.selected = true;
    }

    function selected(where) {
      var title = [];
      where.items.forEach(function (a) {
        if (a.selected || a.checked) title.push(a.title);
      });
      where.subtitle = title.length ? title.join(', ') : Lang.translate('nochoice');
    }

    function main() {
      for (var i in data) {
        selected(data[i]);
      }

      var cat = data.type.items.find(function (s) {
        return s.selected;
      }).cat;
      var type = cat.indexOf('movie') >= 0 ? 'movie' : 'tv';
      var items = [{
        title: Lang.translate('search_start'),
        search: true
      }, data.type, data.rating, data['genres_' + type], data.country, data.year];
      items.forEach(function (itm) {
        itm.title = Lang.translate(itm.title);
        if (itm.subtitle) itm.subtitle = Lang.translate(itm.subtitle);

        if (itm.items) {
          itm.items.forEach(function (inr) {
            inr.title = Lang.translate(inr.title);
          });
        }
      });
      Select.show({
        title: Lang.translate('title_filter'),
        items: items,
        onBack: function onBack() {
          Controller.toggle('content');
        },
        onSelect: function onSelect(a) {
          if (a.search) search$1();else submenu(a);
        }
      });
    }

    function search$1() {
      Controller.toggle('content');
      var query = [];
      var cat = data.type.items.find(function (s) {
        return s.selected;
      }).cat;
      var type = cat.indexOf('movie') >= 0 ? 'movie' : 'tv';
      var genres = [];
      var countrys = [];
      data.rating.items.forEach(function (a) {
        if (a.selected && (a.voite || a.start)) {
          if (a.start) {
            query.push('vote_average.gte=' + a.start);
          } else {
            query.push('vote_average.gte=' + a.voite.split('-')[0]);
            query.push('vote_average.lte=' + a.voite.split('-')[1]);
          }
        }
      });
      data.country.items.forEach(function (a) {
        if (a.checked) countrys.push(a.code);
      });
      data.year.items.forEach(function (a) {
        if (a.selected && !a.any) {
          var need = type == 'movie' ? 'release_date' : 'air_date';
          query.push(need + '.lte=' + a.title.split('-')[0] + '-01-01');
          query.push(need + '.gte=' + a.title.split('-')[1] + '-01-01');
        }
      });
      data['genres_' + type].items.forEach(function (a) {
        if (a.checked) genres.push(a.id);
      });
      if (cat == 'multmovie' || cat == 'multtv' && genres.indexOf(16) == -1) genres.push(16);

      if (genres.length) {
        query.push('with_genres=' + genres.join(','));
      }

      if (cat == 'anime' && countrys.indexOf('ja') == -1) countrys.push('ja');

      if (countrys.length) {
        query.push('with_original_language=' + countrys.join('|'));
      }

      var url = 'discover/' + type + '?' + query.join('&');
      var activity = {
        url: url,
        title: Lang.translate('title_filter'),
        component: 'category_full',
        source: 'tmdb',
        card_type: true,
        page: 1
      };
      var object = Activity$1.active();
      if (object.component == 'category_full' && object.url.indexOf('discover') == 0) Activity$1.replace(activity);else Activity$1.push(activity);
    }

    function submenu(item) {
      Select.show({
        title: item.title,
        items: item.items,
        onBack: main,
        onSelect: function onSelect(a) {
          select(item.items, a);
          main();
        }
      });
    }

    function show$1() {
      main();
    }

    var Filter = {
      show: show$1
    };

    var html$3;
    var last;
    var scroll;

    function init$4() {
      html$3 = Template.get('menu');
      scroll = new create$o({
        mask: true,
        over: true
      });
      Lampa.Listener.send('menu', {
        type: 'start',
        body: html$3
      });
      $('body').on('mouseup', function () {
        if ($('body').hasClass('menu--open')) {
          $('body').toggleClass('menu--open', false);
          Controller.toggle('content');
        }
      });
      scroll.minus();
      scroll.append(html$3);
      Lampa.Listener.send('menu', {
        type: 'end'
      });
      Controller.add('menu', {
        toggle: function toggle() {
          Controller.collectionSet(html$3);
          Controller.collectionFocus(last, html$3);
          $('body').toggleClass('menu--open', true);
        },
        right: function right() {
          Controller.toggle('content');
        },
        up: function up() {
          if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
        },
        down: function down() {
          Navigator.move('down');
        },
        gone: function gone() {
          $('body').toggleClass('menu--open', false);
        },
        back: function back() {
          Activity$1.backward();
        }
      });
    }

    function prepared(action, name) {
      if (name.indexOf(action) >= 0) {
        var comp = Lampa.Activity.active().component;
        if (name.indexOf(comp) >= 0) Activity$1.replace();else return true;
      }
    }

    function ready() {
      html$3.find('.selector').on('hover:enter', function (e) {
        var action = $(e.target).data('action');
        var type = $(e.target).data('type');
        if (action == 'catalog') catalog();

        if (action == 'movie' || action == 'tv' || action == 'anime') {
          Activity$1.push({
            url: action,
            title: (action == 'movie' ? Lang.translate('menu_movies') : action == 'anime' ? Lang.translate('menu_anime') : Lang.translate('menu_tv')) + ' - ' + Storage.field('source').toUpperCase(),
            component: 'category',
            source: action == 'anime' ? 'cub' : Storage.field('source')
          });
        }

        if (prepared(action, ['main'])) {
          Activity$1.push({
            url: '',
            title: Lang.translate('title_main') + ' - ' + Storage.field('source').toUpperCase(),
            component: 'main',
            source: Storage.field('source')
          });
        }

        if (action == 'search') Controller.toggle('search');
        if (action == 'settings') Controller.toggle('settings');

        if (action == 'about') {
          Modal.open({
            title: Lang.translate('title_about'),
            html: Template.get('about'),
            size: 'medium',
            onBack: function onBack() {
              Modal.close();
              Controller.toggle('content');
            }
          });
        }

        if (action == 'favorite') {
          Activity$1.push({
            url: '',
            title: type == 'book' ? Lang.translate('title_book') : type == 'like' ? Lang.translate('title_like') : type == 'history' ? Lang.translate('title_history') : Lang.translate('title_wath'),
            component: 'favorite',
            type: type,
            page: 1
          });
        }

        if (prepared(action, ['timetable'])) {
          Activity$1.push({
            url: '',
            title: Lang.translate('title_timetable'),
            component: 'timetable',
            page: 1
          });
        }

        if (prepared(action, ['mytorrents'])) {
          Activity$1.push({
            url: '',
            title: Lang.translate('title_mytorrents'),
            component: 'mytorrents',
            page: 1
          });
        }

        if (prepared(action, ['relise'])) {
          Activity$1.push({
            url: '',
            title: Lang.translate('title_relises'),
            component: 'relise',
            page: 1
          });
        }

        if (action == 'console') {
          Controller.toggle('console');
        }

        if (action == 'collections') {
          Select.show({
            title: Lang.translate('title_collections'),
            items: [{
              title: Lang.translate('title_collections_ivi'),
              source: 'ivi'
            }, {
              title: Lang.translate('title_collections_okko'),
              source: 'okko'
            }],
            onSelect: function onSelect(a) {
              Activity$1.push({
                url: '',
                source: a.source,
                title: a.title,
                component: 'collections',
                page: 1
              });
            },
            onBack: function onBack() {
              Controller.toggle('menu');
            }
          });
        }

        if (action == 'filter') Filter.show();
      }).on('hover:focus', function (e) {
        last = e.target;
        scroll.update($(e.target), true);
      });
    }

    function catalog() {
      Api.menu({
        source: Storage.field('source')
      }, function (menu) {
        Select.show({
          title: Lang.translate('title_catalog'),
          items: menu,
          onSelect: function onSelect(a) {
            var tmdb = Storage.field('source') == 'tmdb' || Storage.field('source') == 'cub';
            Activity$1.push({
              url: Storage.field('source') == 'tmdb' ? 'movie' : '',
              title: Lang.translate('title_catalog') + ' - ' + a.title + ' - ' + Storage.field('source').toUpperCase(),
              component: tmdb ? 'category' : 'category_full',
              genres: a.id,
              id: a.id,
              source: Storage.field('source'),
              card_type: true,
              page: 1
            });
          },
          onBack: function onBack() {
            Controller.toggle('menu');
          }
        });
      });
    }

    function render$1() {
      return scroll.render();
    }

    var Menu = {
      render: render$1,
      init: init$4,
      ready: ready
    };

    function create$2() {
      var scroll,
          timer,
          items = [],
          active = 0,
          query;
      this.listener = start$4();

      this.create = function () {
        var _this = this;

        scroll = new create$o({
          over: true
        });
        scroll.height();
        scroll.render().on('mouseover touchstart', function () {
          if (Controller.enabled().name !== 'items_line') _this.toggle();
        });
        this.empty();
      };

      this.empty = function () {
        scroll.clear();
        scroll.reset();
        scroll.append($('<div class="search-looking"><div class="search-looking__text">' + Lang.translate('search_start_typing') + '</div></div>'));
      };

      this.loading = function () {
        scroll.clear();
        scroll.reset();
        scroll.append($('<div><div class="broadcast__text">' + Lang.translate('search_searching') + '</div><div class="broadcast__scan"><div></div></div></div>'));
      };

      this.search = function (value) {
        var _this2 = this;

        clearTimeout(timer);
        query = value;
        Api.clear();

        if (value.length >= 2) {
          timer = setTimeout(function () {
            _this2.loading();

            Api.search({
              query: encodeURIComponent(value)
            }, function (data) {
              _this2.clear();

              if (data.movie && data.movie.results.length || data.tv && data.tv.results.length || data.parser && data.parser.results.length) {
                scroll.clear();
                if (data.movie && data.movie.results.length) _this2.build(data.movie, 'movie');
                if (data.tv && data.tv.results.length) _this2.build(data.tv, 'tv');
                if (data.parser && data.parser.results.length) _this2.build(data.parser, 'parser');
                var name = Controller.enabled().name;
                if (name == 'items_line' || name == 'search_results') Controller.toggle('search_results');
              }
            });
          }, 1000);
        } else {
          this.clear();
        }
      };

      this.build = function (data, type) {
        var _this3 = this;

        data.noimage = true;
        var params = {
          align_left: true,
          object: {
            source: 'tmdb'
          },
          isparser: type == 'parser'
        };

        if (type == 'parser') {
          params.card_events = {
            onMenu: function onMenu() {}
          };
        }

        var item = new create$i(data, params);
        item.onDown = this.down;
        item.onUp = this.up;
        item.onBack = this.back.bind(this);

        item.onLeft = function () {
          _this3.listener.send('left');
        };

        item.onEnter = function () {
          _this3.listener.send('enter');
        };

        item.onMore = function (e, element) {
          if (type == 'parser') {
            _this3.listener.send('enter');

            Activity$1.push({
              url: '',
              title: Lang.translate('title_torrents'),
              component: 'torrents',
              search: query,
              movie: {
                title: query,
                original_title: '',
                img: './img/img_broken.svg',
                genres: []
              },
              page: 1
            });
          } else {
            Activity$1.push({
              url: 'search/' + type,
              title: Lang.translate('search') + ' - ' + query,
              component: 'category_full',
              page: 2,
              query: encodeURIComponent(query),
              source: 'tmdb'
            });
          }
        };

        if (type == 'parser') {
          item.onEnter = false;

          item.onPrevent = function (e, element) {
            if (element.reguest && !element.MagnetUri) {
              Parser.marnet(element, function () {
                Modal.close();
                Controller.toggle('search_results');
                Torrent.start(element, {
                  title: element.Title
                });
                Torrent.back(_this3.toggle.bind(_this3));
              }, function (text) {
                Modal.update(Template.get('error', {
                  title: Lang.translate('title_error'),
                  text: text
                }));
              });
              Modal.open({
                title: '',
                html: Template.get('modal_pending', {
                  text: Lang.translate('torrent_get_magnet')
                }),
                onBack: function onBack() {
                  Modal.close();

                  _this3.toggle();
                }
              });
            } else {
              Controller.toggle('search_results');
              Torrent.start(element, {
                title: element.Title
              });
              Torrent.back(_this3.toggle.bind(_this3));
            }
          };
        }

        item.create();
        items.push(item);
        scroll.append(item.render());
      };

      this.any = function () {
        return items.length;
      };

      this.back = function () {
        this.listener.send('back');
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.clear = function () {
        this.empty();
        active = 0;
        Arrays.destroy(items);
        items = [];
      };

      this.toggle = function () {
        var _this4 = this;

        Controller.add('search_results', {
          invisible: true,
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());

            if (items.length) {
              items[active].toggle();
            }
          },
          back: function back() {
            _this4.listener.send('back');
          },
          left: function left() {
            _this4.listener.send('left');
          }
        });
        Controller.toggle('search_results');
      };

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        clearTimeout(timer);
        Api.clear();
        this.clear();
        scroll.destroy();
        this.listener.destroy();
      };
    }

    function create$1() {
      var scroll,
          last,
          keys = [];
      this.listener = start$4();

      this.create = function () {
        var _this = this;

        scroll = new create$o({
          over: true,
          mask: false,
          nopadding: true
        });
        keys = Storage.get('search_history', '[]');
        keys.forEach(function (key) {
          _this.append(key);
        });
        if (!keys.length) scroll.append('<div class="selector search-history-empty">' + Lang.translate('search_empty') + '</div>');
        scroll.render().on('mouseover touchstart', function () {
          if (_this.any() && Controller.enabled().name !== 'search_history') _this.toggle();
        });
      };

      this.append = function (value) {
        var _this2 = this;

        var key = $('<div class="search-history-key selector"><div><span>' + value + '</span><div>' + Lang.translate('search_delete') + '</div></div></div>');
        key.on('hover:enter', function () {
          _this2.listener.send('enter', {
            value: value
          });
        }).on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target));
        });
        scroll.append(key);
      };

      this.add = function (value) {
        if (keys.indexOf(value) == -1) {
          Arrays.insert(keys, 0, value);
          Storage.set('search_history', keys);
        }
      };

      this.toggle = function () {
        var _this3 = this;

        Controller.add('search_history', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else _this3.listener.send('up');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            _this3.listener.send('right');
          },
          back: function back() {
            _this3.listener.send('back');
          },
          left: function left() {
            var elem = scroll.render().find('.focus'),
                selc = scroll.render().find('.selector');

            if (elem.length) {
              Arrays.remove(keys, $('span', elem).text());
              Storage.set('search_history', keys);
              var index = selc.index(elem);
              if (index > 0) last = selc.eq(index - 1)[0];else if (selc[index + 1]) last = selc.eq(index + 1)[0];
              elem.remove();
              if (selc.length - 1 <= 0) last = false;
              Controller.toggle('search_history');
            }
          }
        });
        Controller.toggle('search_history');
      };

      this.any = function () {
        return keys.length;
      };

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        scroll.destroy();
        this.listener.destroy();
        keys = null;
        last = null;
      };
    }

    var html$2 = $('<div></div>'),
        search,
        results,
        history,
        keyboard,
        input = '';

    function create() {
      search = Template.get('search');
      if (Storage.field('keyboard_type') !== 'lampa') search.find('.search__input').hide();
      html$2.append(search);
      createHistory();
      createResults();
      createKeyboard();
    }

    function createHistory() {
      history = new create$1();
      history.create();
      history.listener.follow('right', function () {
        results.toggle();
      });
      history.listener.follow('up', function () {
        keyboard.toggle();
      });
      history.listener.follow('enter', function (event) {
        results.clear();
        keyboard.value(event.value);
        results.toggle();
      });
      history.listener.follow('back', destroy);
      search.find('.search__history').append(history.render());
    }

    function createResults() {
      results = new create$2();
      results.create();
      results.listener.follow('left', function () {
        keyboard.toggle();
      });
      results.listener.follow('enter', function () {
        if (input) history.add(input);
        destroy();
      });
      results.listener.follow('back', destroy);
      search.find('.search__results').append(results.render());
    }

    function createKeyboard() {
      keyboard = new create$3({
        layout: {
          'en': ['1 2 3 4 5 6 7 8 9 0 -', 'q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m .', '{mic} {UK} {space} {bksp}'],
          'uk': ['1 2 3 4 5 6 7 8 9 0 -', 'й ц у к е н г ш щ з х ї', 'ф і в а п р о л д ж є', 'я ч с м и т ь б ю .', '{mic} {RU} {space} {bksp}'],
          'default': ['1 2 3 4 5 6 7 8 9 0 -', 'й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', 'ё я ч с м и т ь б ю .', '{mic} {EN} {space} {bksp}']
        }
      });
      keyboard.create();
      keyboard.listener.follow('change', function (event) {
        input = event.value.trim();

        if (input) {
          search.find('.search__input').text(input);
          results.search(input);
        } else {
          search.find('.search__input').text(Lang.translate('search_input') + '...');
        }
      });
      keyboard.listener.follow('right', function () {
        if (results.any()) results.toggle();
      });
      keyboard.listener.follow('down', function () {
        if (history.any()) history.toggle();
      });
      keyboard.listener.follow('back', destroy);
      keyboard.toggle();
    }

    function render() {
      return html$2;
    }

    function destroy() {
      keyboard.destroy();
      results.destroy();
      history.destroy();
      search.remove();
      html$2.empty();
      Controller.toggle('content');
    }

    Controller.add('search', {
      invisible: true,
      toggle: function toggle() {
        create();
      },
      back: destroy
    });
    var Search = {
      render: render
    };

    function app() {
      var app = $('#app').empty();
      var wrap = Template.get('wrap');
      wrap.find('.wrap__left').append(Menu.render());
      wrap.find('.wrap__content').append(Activity$1.render());
      app.append(Background.render());
      app.append(Head.render());
      app.append(wrap);
      app.append(Settings.render());
      app.append(Search.render());
      app.append(Noty.render());
    }

    var Render = {
      app: app
    };

    var items = {};
    var times = 0;
    var html$1;
    var scroll_tabs;
    var scroll_body;
    var last_tab;

    function init$3() {
      Keypad.listener.follow('keydown', function (e) {
        if (e.code == 38 || e.code == 29460) {
          var enable = Controller.enabled();

          if (enable.name == 'head') {
            times++;

            if (times > 10) {
              Controller.toggle('console');
            }
          } else {
            times = 0;
          }
        }
      });
      Controller.add('console', {
        toggle: function toggle() {
          build();
          Controller.toggle('console-tabs');
        },
        back: back
      });
      Controller.add('console-tabs', {
        toggle: function toggle() {
          Controller.collectionSet(scroll_tabs.render());
          Controller.collectionFocus(scroll_tabs.render().find('.console__tab[data-name="' + Utils.hash(last_tab) + '"]')[0], scroll_tabs.render());
        },
        down: function down() {
          Controller.toggle('console-body');
        },
        right: function right() {
          Navigator.move('right');
        },
        left: function left() {
          Navigator.move('left');
        },
        back: back
      });
      follow();
    }

    function back() {
      times = 0;
      scroll_tabs.destroy();
      scroll_body.destroy();
      html$1.remove();
      Controller.toggle('head');
    }

    function show(name) {
      scroll_body.clear();
      scroll_body.reset();

      if (items[name]) {
        items[name].forEach(function (element) {
          var item = $(element);
          item.on('hover:focus', function (e) {
            scroll_body.update($(e.target));
          });
          scroll_body.append(item);
        });
      }

      Controller.add('console-body', {
        toggle: function toggle() {
          Controller.collectionSet(scroll_body.render());
          Controller.collectionFocus(false, scroll_body.render());
        },
        up: function up() {
          if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('console-tabs');
        },
        down: function down() {
          Navigator.move('down');
        },
        back: back
      });
      Controller.toggle('console-body');
    }

    function tab(name, lines) {
      var elem = $('<div class="console__tab selector" data-name="' + Utils.hash(name) + '">' + Utils.shortText(name, 10) + ' - <span>' + lines.length + '</span></div>');
      elem.on('hover:enter', function () {
        show(name);
        last_tab = name;
      }).on('hover:focus', function (e) {
        scroll_tabs.update($(e.target));
      });
      scroll_tabs.append(elem);
      if (!last_tab) last_tab = name;
      if (last_tab == name) show(name);
    }

    function build() {
      html$1 = Template.get('console');
      scroll_body = new create$o({
        over: true,
        mask: true
      });
      scroll_tabs = new create$o({
        horizontal: true
      });

      for (var i in items) {
        tab(i, items[i]);
      }

      html$1.find('.console__tabs').append(scroll_tabs.render());
      html$1.find('.console__body').append(scroll_body.render());
      scroll_body.minus(html$1.find('.console__tabs'));
      $('body').append(html$1);
    }

    function add(name, message) {
      if (!items[name]) items[name] = [];
      var where = items[name];
      var time = Utils.parseTime(Date.now()).time;

      try {
        Arrays.insert(where, 0, '<div class="console__line selector"><span class="console__time">' + time + '</span> - <span>' + message + '</span></div>');
      } catch (e) {
        Arrays.insert(where, 0, '<div class="console__line selector"><span class="console__time">' + time + '</span> - <span>Failed to print line</span></div>');
      }

      if (where.length > 50) where.pop();
    }

    function escapeHtml(text) {
      return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function decode(arr) {
      if (Arrays.isObject(arr) || Arrays.isArray(arr)) {
        try {
          arr = JSON.stringify(arr);
        } catch (e) {
          arr = '[noview]';
        }
      } else if (typeof arr === 'string' || typeof arr === 'number' || typeof arr === 'boolean') {
        arr = escapeHtml(arr + '');
      } else {
        var a = [];

        for (var i in arr) {
          a.push(i + ': ' + arr[i]);
        }

        arr = JSON.stringify(a);
      }

      arr = Utils.shortText(arr, 600);
      return arr;
    }

    function follow() {
      var log = console.log;

      console.log = function () {
        var msgs = [];
        var mcon = [];

        while (arguments.length) {
          var arr = [].shift.call(arguments);
          msgs.push(decode(arr));
          mcon.push(arr);
        }

        var name = msgs[0];
        msgs[0] = '<span style="color: ' + Utils.stringToHslColor(msgs[0], 50, 65) + '">' + msgs[0] + '</span>';
        add(name, msgs.join(' '));
        log.apply(console, mcon);
      };

      window.addEventListener("error", function (e) {
        add('Script', (e.error || e).message + '<br><br>' + (e.error && e.error.stack ? e.error.stack : e.stack || '').split("\n").join('<br>'));
        Noty.show('Error: ' + (e.error || e).message + '<br><br>' + (e.error && e.error.stack ? e.error.stack : e.stack || '').split("\n").join('<br>'));
      });
    }

    var Console = {
      init: init$3
    };

    var body$1;
    var code = 0;
    var network$1 = new create$p();
    var fields = ['torrents_view', 'plugins', 'favorite', 'file_view'];
    var timer;
    var readed;
    /**
     * Запуск
     */

    function init$2() {
      if (Storage.field('cloud_use')) status(1);
      Settings.listener.follow('open', function (e) {
        body$1 = null;

        if (e.name == 'cloud') {
          body$1 = e.body;
          renderStatus();
        }
      });
      Storage.listener.follow('change', function (e) {
        if (e.name == 'cloud_token') {
          login(start);
        } else if (e.name == 'cloud_use') {
          if (e.value == 'true') login(start);else status(0);
        } else if (fields.indexOf(e.name) >= 0) {
          clearTimeout(timer);
          timer = setTimeout(update, 500);
        }
      });
      login(start);
    }
    /**
     * Статус
     * @param {Int} c - код
     */


    function status(c) {
      code = c;
      renderStatus();
    }
    /**
     * Рендер статуса
     */


    function renderStatus() {
      if (body$1) {
        var item = body$1.find('.settings--cloud-status'),
            name = item.find('.settings-param__name'),
            desc = item.find('.settings-param__descr');

        if (code == 0) {
          name.text('Отключено');
          desc.text('Включите синхронизацию');
        }

        if (code == 1) {
          name.text('Не авторизованы');
          desc.text('Необходимо авторизоваться ');
        }

        if (code == 2) {
          name.text('Авторизация не удалась');
          desc.text('Проверьте введённые данные и повторите попытку');
        }

        if (code == 3) {
          name.text('Вошли');
          desc.text('Вы успешно авторизовались');
        }

        if (code == 4) {
          var time = Utils.parseTime(Storage.get('cloud_time', '2021.01.01'));
          name.text('Синхронизовано');
          desc.text(time.full + ' в ' + time.time);
        }
      }
    }
    /**
     * Проверка авторизации
     * @param {Function} good - успешно
     * @param {Function} fail - провал
     */


    function login(good, fail) {
      if (Storage.get('cloud_token') && Storage.field('cloud_use')) {
        network$1.silent('https://api.github.com/gists', function (data) {
          status(3);
          if (good) good();
          network$1.silent('https://api.github.com/gists/' + data.id, false, false, false, {
            type: 'delete',
            beforeSend: {
              name: 'Authorization',
              value: 'bearer ' + Storage.get('cloud_token')
            },
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          });
        }, function () {
          status(2);
          if (fail) fail();
        }, JSON.stringify({
          'files': {
            'lampa-login.json': {
              'content': '{"login":true}'
            }
          }
        }), {
          beforeSend: {
            name: 'Authorization',
            value: 'bearer ' + Storage.get('cloud_token')
          },
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
      } else {
        status(Storage.field('cloud_use') ? 1 : 0);
        if (fail) fail();
      }
    }
    /**
     * Считываем файл и обновляем данные с облака
     */


    function read(call) {
      var time = Storage.get('cloud_time', '2021.01.01');

      if (time !== readed.item.updated_at) {
        network$1.silent(readed.file.raw_url, function (data) {
          Storage.set('cloud_time', readed.item.updated_at);

          for (var i in data) {
            Storage.set(i, data[i], true);
          }

          status(4);
          if (call) call();
        });
      } else if (call) call();
    }
    /**
     * Обновляем состояние
     */


    function update() {
      save();
    }
    /**
     * Получаем список файлов
     */


    function start(call) {
      if (Storage.get('cloud_token') && Storage.field('cloud_use')) {
        network$1.silent('https://api.github.com/gists', function (data) {
          var file;
          var item;
          data.forEach(function (elem) {
            for (var i in elem.files) {
              if (elem.files[i].filename == 'lampa-data.json') {
                item = elem;
                file = elem.files[i];
              }
            }
          });

          if (file) {
            Storage.set('cloud_data_id', item.id);
            readed = {
              file: file,
              item: item
            };
            read(call);
          } else save(call);
        }, function () {}, false, {
          beforeSend: {
            name: 'Authorization',
            value: 'bearer ' + Storage.get('cloud_token')
          },
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
      }
    }
    /**
     * Сохраняем закладки в облако
     */


    function save(call) {
      if (Storage.get('cloud_token') && Storage.field('cloud_use')) {
        var conent = JSON.stringify({
          torrents_view: Storage.get('torrents_view', '[]'),
          plugins: Storage.get('plugins', '[]'),
          favorite: Storage.get('favorite', '{}'),
          file_view: Storage.get('file_view', '{}'),
          setting_member: Storage.get('setting_member', '[]')
        }, null, 4);
        var id = Storage.get('cloud_data_id', '');
        network$1.silent('https://api.github.com/gists' + (id ? '/' + id : ''), function (data) {
          Storage.set('cloud_time', data.updated_at);
          Storage.set('cloud_data_id', data.id);
          status(4);
          if (call) call();
        }, function () {
          Storage.set('cloud_data_id', '');
          status(5);
        }, JSON.stringify({
          'files': {
            'lampa-data.json': {
              'content': conent
            }
          }
        }), {
          beforeSend: {
            name: 'Authorization',
            value: 'bearer ' + Storage.get('cloud_token')
          },
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
      }
    }

    var Cloud = {
      init: init$2
    };

    var body;
    var network = new create$p();
    var official_list = [{
      name: Lang.translate('plugins_online'),
      url: 'http://jin.energy/online.js'
    }, {
      name: Lang.translate('plugins_online'),
      url: 'http://arkmv.ru/vod'
    }];
    /**
     * Запуск
     */

    function init$1() {
      Settings.listener.follow('open', function (e) {
        body = null;

        if (e.name == 'plugins') {
          body = e.body;
          renderPanel();
        }
      });
    }

    function showCheckResult(error) {
      Modal.open({
        title: '',
        html: $('<div class="about"><div class="selector">' + (error ? Lang.translate('plugins_check_fail') : Lang.translate('plugins_need_reload')) + '</div></div>'),
        onBack: function onBack() {
          Modal.close();
          Controller.toggle('settings_component');
        },
        onSelect: function onSelect() {
          Modal.close();
          Controller.toggle('settings_component');
        }
      });
    }
    /**
     * Рендер панели плагинов
     */


    function renderPanel() {
      if (body) {
        var list = Storage.get('plugins', '[]');
        $('.selector:eq(0)', body).on('hover:enter', function () {
          Input.edit({
            value: ''
          }, function (new_value) {
            if (new_value && Storage.add('plugins', new_value)) {
              renderPlugin(new_value, {
                is_new: true,
                checked: showCheckResult
              });
              Params.listener.send('update_scroll');
            }
          });
        });
        $('.selector:eq(1)', body).on('hover:enter', showCatalog);
        list.forEach(function (url) {
          renderPlugin(url);
        });
        Account.plugins(function (plugins) {
          plugins.forEach(function (plugin) {
            renderPlugin(plugin.url, {
              is_cub: true,
              plugin: plugin
            });
          });
          Controller.enable('settings_component');
          Params.listener.send('update_scroll');
        });
        Params.listener.send('update_scroll');
      }
    }

    function showCatalog() {
      Modal.open({
        title: '',
        html: Template.get('modal_loading'),
        size: 'large',
        mask: true,
        onBack: function onBack() {
          network.clear();
          Modal.close();
          Controller.toggle('settings_component');
        }
      });

      function complite(result) {
        var temp = Template.get('plugins_catalog');
        var first = temp.find('.plugins-catalog__list').eq(0);
        var second = temp.find('.plugins-catalog__list').eq(1);

        function draw(container, plug) {
          var item = $("<div class=\"plugins-catalog__line selector\">\n                <div class=\"plugins-catalog__url\"></div>\n                <div class=\"plugins-catalog__detail\"></div>\n                <div class=\"plugins-catalog__button\">".concat(Lang.translate('plugins_install'), "</div>\n            </div>"));
          item.on('hover:enter', function () {
            if (Storage.add('plugins', plug.url)) {
              Modal.close();
              Controller.toggle('settings_component');
              renderPlugin(plug.url, {
                is_new: true,
                checked: showCheckResult
              });
              Params.listener.send('update_scroll');
            } else {
              Noty.show(Lang.translate('plugins_install_ready'));
            }
          });
          item.find('.plugins-catalog__url').text(plug.url);
          item.find('.plugins-catalog__detail').text(plug.count ? plug.count + ' - ' + Lang.translate('plugins_installed') : plug.name);
          container.append(item);
        }

        official_list.forEach(function (plug) {
          draw(first, plug);
        });

        if (result.plugins.length) {
          result.plugins.forEach(function (plug) {
            draw(second, plug);
          });
        }

        Modal.update(temp);
      }

      network.timeout(10000);
      network.silent(Utils.protocol() + 'cub.watch/api/plugins/installs', complite, function () {
        complite({
          plugins: []
        });
      });
    }
    /**
     * Рендер плагина
     */


    function renderPlugin(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var item = $('<div class="settings-param selector"><div class="settings-param__name">' + (params.is_cub && params.plugin.name ? params.plugin.name + ' - ' : '') + url + '</div><div class="settings-param__descr">' + (params.is_cub ? Lang.translate('plugins_load_from') : Lang.translate('plugins_ok_for_check')) + '</div><div class="settings-param__status"></div></div>');

      var check = function check() {
        var status = $('.settings-param__status', item).removeClass('active error wait').addClass('wait');
        network.timeout(5000);
        network["native"](url, function () {
          status.removeClass('wait').addClass('active');
          if (params.checked) params.checked();
        }, function () {
          status.removeClass('wait').addClass('error');
          if (params.checked) params.checked(true);
        }, false, {
          dataType: 'text'
        });
      };

      var remove = function remove() {
        if (params.is_cub) {
          Account.pluginsStatus(params.plugin, params.plugin.status ? 0 : 1);
          item.css({
            opacity: params.plugin.status ? 0.5 : 1
          });
          params.plugin.status = params.plugin.status ? 0 : 1;
        } else {
          var list = Storage.get('plugins', '[]');
          Arrays.remove(list, url);
          Storage.set('plugins', list);
          item.css({
            opacity: 0.5
          });
          localStorage.removeItem('plugin_' + url);
        }
      };

      item.on('hover:long', remove);
      if (params.is_cub && !params.plugin.status) item.css({
        opacity: 0.5
      });
      var dbtimer,
          dbtime = Date.now();
      item.on('hover:enter', function () {
        if (dbtime < Date.now() - 200) {
          dbtimer = setTimeout(function () {
            check();
          }, 200);
          dbtime = Date.now() + 200;
        } else if (dbtime > Date.now()) {
          clearTimeout(dbtimer);
          remove();
        }
      });
      if (params.is_new) check();
      $('.selector:eq(1)', body).after(item);
    }

    function loadFromMemory(list, call) {
      var noload = [];
      list.forEach(function (url) {
        var str = localStorage.getItem('plugin_' + url, str);

        if (str) {
          try {
            eval(str);
          } catch (e) {
            noload.push(url);
          }
        }
      });
      call(noload);
    }
    /**
     * Загрузка всех плагинов
     */


    function load(call) {
      Account.plugins(function (plugins) {
        var list = plugins.filter(function (plugin) {
          return plugin.status;
        }).map(function (plugin) {
          return plugin.url;
        }).concat(Storage.get('plugins', '[]'));
        list.push('./plugins/modification.js'); //saveInMemory(list) //фиг знает, похоже памяти не густо, не буду сохранять

        console.log('Plugins', 'list:', list);
        var errors = [];
        Utils.putScript(list, function () {
          call();

          if (errors.length) {
            loadFromMemory(errors, function (notload) {
              if (notload.length) {
                setTimeout(function () {
                  var enabled = Controller.enabled().name;
                  Modal.open({
                    title: '',
                    html: $('<div class="about"><div class="selector">' + Lang.translate('plugins_no_loaded') + ' (' + notload.join(', ') + ')</div></div>'),
                    onBack: function onBack() {
                      Modal.close();
                      Controller.toggle(enabled);
                    },
                    onSelect: function onSelect() {
                      Modal.close();
                      Controller.toggle(enabled);
                    }
                  });
                }, 3000);
              }
            });
          }
        }, function (u) {
          if (u.indexOf('modification.js') == -1) errors.push(u);
        });
      });
    }

    var Plugins = {
      init: init$1,
      load: load
    };

    /*
    let tizen = {
        ApplicationControlData: ()=>{},
        ApplicationControl: ()=>{},
        application:{
            launchAppControl: ()=>{}
        }
    }
    */

    /**
     * Запуск
     */

    function init() {
      if (typeof tizen !== 'undefined') {
        setInterval(lauchPick, 1000 * 60 * 10);
        lauchPick();
        deepLink();
        window.addEventListener('appcontrol', deepLink);

        try {
          console.log('Tizen', 'current id', tizen.application.getCurrentApplication().appInfo.id);
        } catch (e) {}
      }
    }
    /**
     * Установить данные
     * @param {{sections:[{title:string,position:integer,tiles:[{cardToTile}]}]}} data 
     */


    function setPick(data) {
      var service_id = '0SG81L944v.service';
      var controll_data = new tizen.ApplicationControlData('caller', ['ForegroundApp', JSON.stringify(data)]);
      var controll_app = new tizen.ApplicationControl('http://tizen.org/appcontrol/operation/pick', null, 'image/*', null, [controll_data]);
      tizen.application.launchAppControl(controll_app, service_id, function () {
        console.log('Tizen', 'service', 'launch success');
      }, function (error) {
        console.log('Tizen', 'service', 'error:', JSON.stringify(error));
      });
    }
    /**
     * Карточку в данные
     * @param {{title:string, name:string, poster_path:string, release_date:string}} card - карточка
     * @param {string} subtitle 
     * @returns {{title:string, subtitle:string, image_ratio:string, image_url:string, action_data:string, is_playable:boolean}}
     */


    function cardToTile(card, subtitle) {
      var relise = ((card.release_date || card.first_air_date || '0000') + '').slice(0, 4);
      var elem = {
        title: card.title || card.name,
        subtitle: subtitle || relise,
        image_ratio: '1by1',
        image_url: card.poster ? card.poster : card.img ? card.img : 'http://imagetmdb.cub.watch/t/p/w300/' + card.poster_path,
        action_data: JSON.stringify(card),
        is_playable: false
      };
      return elem;
    }
    /**
     * Строим данные
     */


    function lauchPick() {
      var data = {
        sections: []
      };
      console.log('Tizen', 'start pick');
      var status = new status$1(3);

      status.onComplite = function (result) {
        if (result.popular) data.sections.push(result.popular);
        if (result.continues) data.sections.push(result.continues);
        if (result.notice) data.sections.push(result.notice);
        console.log('Tizen', 'set sections', data.sections.length);
        if (data.sections.length) setPick(data);
      };

      Account.notice(function (notices) {
        var new_notices = notices.filter(function (n) {
          return !n.viewed;
        }).slice(0, 3);

        if (new_notices.length) {
          var section = {
            title: Lang.translate('title_notice'),
            tiles: [],
            position: 0
          };
          new_notices.forEach(function (noty) {
            var info = JSON.parse(noty.data);
            section.tiles.push(cardToTile(info.card, info.type == 'new_episode' ? Lang.translate('notice_new_episode') : Lang.translate('notice_in_quality')));
          });
          status.append('notice', section);
        } else status.error();
      });
      TMDB.get('movie/popular', {}, function (result) {
        if (result.results.length) {
          var section = {
            title: Lang.translate('title_popular_movie'),
            position: 2,
            tiles: result.results.slice(0, 10).map(function (c) {
              return cardToTile(c);
            })
          };
          status.append('popular', section);
        } else status.error();
      }, status.error.bind(status));
      var continues = Favorite.continues('tv');

      if (continues.length) {
        var section = {
          title: Lang.translate('title_continue'),
          position: 1,
          tiles: continues.slice(0, 7).map(function (c) {
            return cardToTile(c);
          })
        };
        status.append('continues', section);
      } else status.error();
    }
    /**
     * Перехват запроса на открытие карточки
     */


    function deepLink() {
      var requestedAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();

      if (requestedAppControl) {
        var appControlData = requestedAppControl.appControl.data;

        for (var i = 0; i < appControlData.length; i++) {
          if (appControlData[i].key == 'PAYLOAD') {
            var action_data = JSON.parse(appControlData[i].value[0]).values;
            var json = JSON.parse(action_data);
            window.start_deep_link = {
              url: json.url,
              component: 'full',
              id: json.id,
              method: json.name ? 'tv' : 'movie',
              card: json,
              source: json.source || 'tmdb'
            };

            if (window.appready) {
              Activity$1.push(window.start_deep_link);
            }

            console.log('Tizen', 'open deep link', window.start_deep_link);
          }
        }
      }
    }

    var Tizen = {
      init: init
    };

    function open(callSelected, callCancel) {
      var html = Template.get('lang_choice', {});
      var scroll = new create$o({
        mask: true,
        over: true
      });
      var codes = Lang.codes();

      function selector(code) {
        var item = $('<div class="selector lang__selector-item" data-code="' + code + '">' + codes[code] + '</div>');
        item.on('hover:enter', function (e) {
          if (callSelected) callSelected(code);
          html.fadeOut(300, function () {
            scroll.destroy();
            html.remove();
            scroll = null;
            html = null;
          });
        }).on('hover:focus', function (e) {
          scroll.update($(e.target), true);
          $('.lang__selector-item', html).removeClass('last-focus');
          $(e.target).addClass('last-focus');
          html.find('.lang__title').text(Lang.translate('lang_choice_title', code));
          html.find('.lang__subtitle').text(Lang.translate('lang_choice_subtitle', code));
        });
        scroll.append(item);
      }

      for (var code in codes) {
        selector(code);
      }

      html.find('.lang__selector').append(scroll.render());
      $('body').append(html);
      Controller.add('language', {
        toggle: function toggle() {
          var focus = html.find('[data-code="' + Storage.get('language', 'ru') + '"]');
          Controller.collectionSet(scroll.render());
          Controller.collectionFocus(focus[0], scroll.render());
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        back: function back() {
          if (callCancel) {
            scroll.destroy();
            html.remove();
            scroll = null;
            html = null;
            callCancel();
          }
        }
      });
      Controller.toggle('language');
    }

    var LangChoice = {
      open: open
    };

    window.Lampa = {
      Listener: start$4(),
      Lang: Lang,
      Subscribe: start$4,
      Storage: Storage,
      Platform: Platform,
      Utils: Utils,
      Params: Params,
      Menu: Menu,
      Head: Head,
      Notice: Notice,
      Background: Background,
      Favorite: Favorite,
      Select: Select,
      Controller: Controller,
      Activity: Activity$1,
      Keypad: Keypad,
      Template: Template,
      Component: Component,
      Reguest: create$p,
      Filter: create$6,
      Files: create$8,
      Scroll: create$o,
      Empty: create$g,
      Arrays: Arrays,
      Noty: Noty,
      Player: Player,
      PlayerVideo: PlayerVideo,
      PlayerInfo: PlayerInfo,
      PlayerPanel: PlayerPanel,
      PlayerPlaylist: PlayerPlaylist,
      Timeline: Timeline,
      Modal: Modal,
      Api: Api,
      Cloud: Cloud,
      Settings: Settings,
      SettingsApi: SettingsApi,
      Android: Android,
      Card: Card,
      Info: create$h,
      Account: Account,
      Socket: Socket,
      Input: Input,
      Screensaver: Screensaver,
      Recomends: Recomends,
      VideoQuality: VideoQuality,
      TimeTable: TimeTable,
      Broadcast: Broadcast,
      Helper: Helper,
      InteractionMain: component$f,
      InteractionCategory: component$c,
      InteractionLine: create$i,
      Status: status$1,
      Plugins: Plugins,
      Tizen: Tizen,
      Layer: Layer,
      Console: Console
    };

    function prepareApp() {
      if (window.prepared_app) return;
      Console.init();
      Keypad.init();
      Layer.init();
      /** Передаем фокус в контроллер */

      Navigator.follow('focus', function (event) {
        Controller.focus(event.elem);
      });
      /** Start - для orsay одни стили, для других другие */

      if (Platform.is('orsay')) {
        Utils.putStyle(['http://lampa.mx/css/app.css'], function () {
          $('link[href="css/app.css"]').remove();
        });
      } else if (window.location.protocol == 'file:' || typeof nw !== 'undefined') {
        Utils.putStyle(['https://yumata.github.io/lampa/css/app.css' + (typeof nw !== 'undefined' ? '?v=' + Math.random() : '')], function () {
          $('link[href="css/app.css"]').remove();
        });
      }

      Layer.update();
      window.prepared_app = true;
    }

    function startApp() {
      if (window.appready) return;
      /** Стартуем */

      Lampa.Listener.send('app', {
        type: 'start'
      });
      /** Инициализируем классы */

      Settings.init();
      Select.init();
      Platform.init();
      Params.init();
      Favorite.init();
      Background.init();
      Notice.init();
      Head.init();
      Menu.init();
      Activity$1.init();

      if (Platform.is('orsay')) {
        Orsay.init();
      }

      Screensaver.init();
      Cloud.init();
      Account.init();
      Plugins.init();
      Socket.init();
      Recomends.init();
      VideoQuality.init();
      TimeTable.init();
      Helper.init();
      Tizen.init();
      Player.init();
      /** Надо зачиcтить, не хорошо светить пароль ;) */

      Storage.set('account_password', '');
      /** Следим за переключением контроллера */

      Controller.listener.follow('toggle', function () {
        Layer.update();
      });
      /** Чтоб не писали по 100 раз */

      if (!Storage.get('parser_torrent_type')) Storage.set('parser_torrent_type', 'torlook');
      if (!Storage.get('parse_lang')) Storage.set('parse_lang', 'ru');
      /** Выход из приложения */

      Activity$1.listener.follow('backward', function (event) {
        if (event.count == 1) {
          var enabled = Controller.enabled();
          Select.show({
            title: Lang.translate('title_out'),
            items: [{
              title: Lang.translate('title_out_confirm'),
              out: true
            }, {
              title: Lang.translate('cancel')
            }],
            onSelect: function onSelect(a) {
              if (a.out) {
                Activity$1.out();
                Controller.toggle(enabled.name);
                if (Platform.is('tizen')) tizen.application.getCurrentApplication().exit();
                if (Platform.is('webos')) window.close();
                if (Platform.is('android')) navigator.app.exitApp(); //пока не используем, нужно разобраться почему вызывается активити при загрузке главной

                if (Platform.is('orsay')) Orsay.exit();
              } else {
                Controller.toggle(enabled.name);
              }
            },
            onBack: function onBack() {
              Controller.toggle(enabled.name);
            }
          });
        }
      });
      /** Ренедрим лампу */

      Render.app();
      /** Обновляем слои */

      Layer.update();
      /** Активируем последнию активность */

      Activity$1.last();
      /** Гасим свет :D */

      setTimeout(function () {
        Keypad.enable();
        Screensaver.enable();
        $('.welcome').fadeOut(500);
      }, 1000);
      /** Если это тач дивайс */

      if (Utils.isTouchDevice()) $('body').addClass('touch-device');
      /** End */

      /** Start - если это андроид */

      if (Platform.is('android')) {
        Params.listener.follow('button', function (e) {
          if (e.name === 'reset_player') {
            Android.resetDefaultPlayer();
          }
        });
        Favorite.listener.follow('add,added,remove', function (e) {
          Android.updateChannel(e.where);
        });
      }
      /** End */

      /** Start - записываем популярные фильмы */


      Favorite.listener.follow('add,added', function (e) {
        if (e.where == 'history' && e.card.id) {
          $.get(Utils.protocol() + 'tmdb.cub.watch/watch?id=' + e.card.id + '&cat=' + (e.card.original_name ? 'tv' : 'movie'));
        }
      });
      /** End */

      /** Start - следим за переключением в лайт версию и обновляем интерфейс */

      Storage.listener.follow('change', function (e) {
        if (e.name == 'light_version') {
          $('body').toggleClass('light--version', Storage.field('light_version'));
          Layer.update();
        }

        if (e.name == 'keyboard_type') {
          $('body').toggleClass('system--keyboard', Storage.field('keyboard_type') == 'lampa' ? false : true);
        }
      });
      /** End */

      /** Start - проверка статуса для торрента */

      var torrent_net = new create$p();

      function check(name) {
        var item = $('[data-name="' + name + '"]').find('.settings-param__status').removeClass('active error wait').addClass('wait');
        var url = Storage.get(name);

        if (url) {
          torrent_net.timeout(10000);
          torrent_net["native"](Utils.checkHttp(Storage.get(name)), function () {
            item.removeClass('wait').addClass('active');
          }, function (a, c) {
            Noty.show(torrent_net.errorDecode(a, c) + ' - ' + url);
            item.removeClass('wait').addClass('error');
          }, false, {
            dataType: 'text'
          });
        }
      }

      Storage.listener.follow('change', function (e) {
        if (e.name == 'torrserver_url') check(e.name);
        if (e.name == 'torrserver_url_two') check(e.name);
        if (e.name == 'torrserver_use_link') check(e.value == 'one' ? 'torrserver_url' : 'torrserver_url_two');
      });
      Settings.listener.follow('open', function (e) {
        if (e.name == 'server') {
          check(Storage.field('torrserver_use_link') == 'one' ? 'torrserver_url' : 'torrserver_url_two');
        } else torrent_net.clear();

        if (e.name == 'interface') {
          $('.settings-param:eq(0)', e.body).on('hover:enter', function () {
            LangChoice.open(function (code) {
              Modal.open({
                title: '',
                html: $('<div class="about"><div class="selector">' + Lang.translate('settings_interface_lang_reload') + '</div></div>'),
                onBack: function onBack() {
                  window.location.reload();
                },
                onSelect: function onSelect() {
                  window.location.reload();
                }
              });
              Storage.set('language', code, true);
              if (code == 'zh') code = 'zh-CN';
              Storage.set('tmdb_lang', code, true);
            }, function () {
              Controller.toggle('settings_component');
            });
          }).find('.settings-param__value').text(Lang.translate('settings_param_lang_' + Storage.get('language', 'ru')));
        }
      });
      /** End */

      /** Добавляем класс платформы */

      $('body').addClass('platform--' + Platform.get());
      /** Включаем лайт версию если было включено */

      $('body').toggleClass('light--version', Storage.field('light_version')).toggleClass('system--keyboard', Storage.field('keyboard_type') == 'lampa' ? false : true);
      /** Добавляем hls плагин */

      Utils.putScript([window.location.protocol == 'file:' ? 'https://cdn.jsdelivr.net/gh/yumata/lampa@main/vender/hls/hls.js' : './vender/hls/hls.js'], function () {});
      /** Сообщаем о готовности */

      Lampa.Listener.send('app', {
        type: 'ready'
      });
      /** Меню готово */

      Menu.ready();
      /** Лампа полностью готова */

      window.appready = true;
      /** Start - активация режима GOD, жмем 🠔🠔 🠕🠕 🠖🠖 🠗🠗 */

      var mask = [37, 37, 38, 38, 39, 39, 40, 40],
          psdg = -1;
      Keypad.listener.follow('keydown', function (e) {
        if (e.code == 37 && psdg < 0) {
          psdg = 0;
        }

        if (psdg >= 0 && mask[psdg] == e.code) psdg++;else psdg = -1;

        if (psdg == 8) {
          psdg = -1;
          console.log('God', 'enabled');
          Noty.show('God enabled');
          window.god_enabled = true;
        }
      });
      var color_keys = {
        '406': 'history',
        '405': 'wath',
        '404': 'like',
        '403': 'book'
      };
      Keypad.listener.follow('keydown', function (e) {
        if (!Player.opened()) {
          if (color_keys[e.code]) {
            var type = color_keys[e.code];
            Activity$1.push({
              url: '',
              title: type == 'book' ? Lang.translate('title_book') : type == 'like' ? Lang.translate('title_like') : type == 'history' ? Lang.translate('title_history') : Lang.translate('title_wath'),
              component: 'favorite',
              type: type,
              page: 1
            });
          }
        }
      });
      /** End */
    }

    prepareApp();

    if (Storage.get('language')) {
      /** Принудительно стартовать */
      setTimeout(startApp, 1000 * 5);
      /** Загружаем плагины и стартуем лампу */

      Plugins.load(startApp);
    } else {
      LangChoice.open(function (code) {
        Storage.set('language', code, true);
        if (code == 'zh') code = 'zh-CN';
              Storage.set('tmdb_lang', code, true);
        Keypad.disable();
        setTimeout(startApp, 1000 * 5);
        Plugins.load(startApp);
      });
      Keypad.enable();
    }

})();
