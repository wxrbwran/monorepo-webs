! function(e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define &&
    define.amd ? define([], t) : "object" == typeof exports ? exports.WebRTC = t() : e.WebRTC = t()
}(window, function() {
  return function(e) {
    var t = {};

    function r(i) {
      if (t[i]) return t[i].exports;
      var n = t[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return e[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports
    }
    return r.m = e, r.c = t, r.d = function(e, t, i) {
      r.o(e, t) || Object.defineProperty(e, t, {
        configurable: !1,
        enumerable: !0,
        get: i
      })
    }, r.r = function(e) {
      Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, r.n = function(e) {
      var t = e && e.__esModule ? function() {
        return e.default
      } : function() {
        return e
      };
      return r.d(t, "a", t), t
    }, r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 455)
  }([function(e, t, r) {
      "use strict";
      var i, n = r(9),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      var o = r(73),
        s = r(68);
      r(87);
      var c, d, u = r(12),
        l = u.getGlobal(),
        p = /\s+/;
      u.deduplicate = function(e) {
        var t = [];
        return e.forEach(function(e) {
          -1 === t.indexOf(e) && t.push(e)
        }), t
      }, u.capFirstLetter = function(e) {
        return e ? (e = "" + e).slice(0, 1).toUpperCase() + e.slice(1) : ""
      }, u.guid = (c = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
      }, function() {
        return c() + c() + c() + c() + c() + c() + c() + c()
      }), u.extend = function(e, t, r) {
        for (var i in t) void 0 !== e[i] && !0 !== r || (e[i] = t[i])
      }, u.filterObj = function(e, t) {
        var r = {};
        return u.isString(t) && (t = t.split(p)), t.forEach(function(t) {
          e.hasOwnProperty(t) && (r[t] = e[t])
        }), r
      }, u.copy = function(e, t) {
        return t = t || {}, e ? (Object.keys(e).forEach(function(r) {
          u.exist(e[r]) && (t[r] = e[r])
        }), t) : t
      }, u.copyWithNull = function(e, t) {
        return t = t || {}, e ? (Object.keys(e).forEach(function(r) {
          (u.exist(e[r]) || u.isnull(e[r])) && (t[r] = e[r])
        }), t) : t
      }, u.findObjIndexInArray = function(e, t) {
        e = e || [];
        var r = t.keyPath || "id",
          i = -1;
        return e.some(function(e, n) {
          if (s(e, r) === t.value) return i = n, !0
        }), i
      }, u.findObjInArray = function(e, t) {
        var r = u.findObjIndexInArray(e, t);
        return -1 === r ? null : e[r]
      }, u.mergeObjArray = function() {
        var e = [],
          t = [].slice.call(arguments, 0, -1),
          r = arguments[arguments.length - 1];
        u.isArray(r) && (t.push(r), r = {});
        var i, n = r.keyPath = r.keyPath || "id";
        for (r.sortPath = r.sortPath || n; !e.length && t.length;) e = (e = t.shift() || []).slice(0);
        return t.forEach(function(t) {
          t && t.forEach(function(t) {
            -1 !== (i = u.findObjIndexInArray(e, {
              keyPath: n,
              value: s(t, n)
            })) ? e[i] = u.merge({}, e[i], t) : e.push(t)
          })
        }), r.notSort || (e = u.sortObjArray(e, r)), e
      }, u.cutObjArray = function(e) {
        var t = e.slice(0),
          r = arguments.length,
          i = [].slice.call(arguments, 1, r - 1),
          n = arguments[r - 1];
        u.isObject(n) || (i.push(n), n = {});
        var a, o = n.keyPath = n.keyPath || "id";
        return i.forEach(function(e) {
          u.isArray(e) || (e = [e]), e.forEach(function(e) {
            e && (n.value = s(e, o), -1 !== (a = u.findObjIndexInArray(t, n)) && t.splice(a, 1))
          })
        }), t
      }, u.sortObjArray = function(e, t) {
        var r = (t = t || {}).sortPath || "id";
        o.insensitive = !!t.insensitive;
        var i, n, a, c = !!t.desc;
        return a = u.isFunction(t.compare) ? t.compare : function(e, t) {
          return i = s(e, r), n = s(t, r), c ? o(n, i) : o(i, n)
        }, e.sort(a)
      }, u.emptyFunc = function() {}, u.isEmptyFunc = function(e) {
        return e === u.emptyFunc
      }, u.notEmptyFunc = function(e) {
        return e !== u.emptyFunc
      }, u.splice = function(e, t, r) {
        return [].splice.call(e, t, r)
      }, u.reshape2d = function(e, t) {
        if (Array.isArray(e)) {
          u.verifyParamType("type", t, "number", "util::reshape2d");
          var r = e.length;
          if (r <= t) return [e];
          for (var i = Math.ceil(r / t), n = [], a = 0; a < i; a++) n.push(e.slice(a * t, (a + 1) * t));
          return n
        }
        return e
      }, u.flatten2d = function(e) {
        if (Array.isArray(e)) {
          var t = [];
          return e.forEach(function(e) {
            t = t.concat(e)
          }), t
        }
        return e
      }, u.dropArrayDuplicates = function(e) {
        if (Array.isArray(e)) {
          for (var t = {}, r = []; e.length > 0;) {
            t[e.shift()] = !0
          }
          for (var i in t) !0 === t[i] && r.push(i);
          return r
        }
        return e
      }, u.onError = function(e) {
        throw new function(e) {
          "object" === (void 0 === e ? "undefined" : (0, a.default)(e)) ? (this.callFunc = e.callFunc || null,
            this.message = e.message || "UNKNOW ERROR") : this.message = e, this.time = new Date, this.timetag = +
            this.time
        }(e)
      }, u.verifyParamPresent = function(e, t, r, i) {
        r = r || "";
        var n = !1;
        switch (u.typeOf(t)) {
          case "undefined":
          case "null":
            n = !0;
            break;
          case "string":
            "" === t && (n = !0);
            break;
          case "StrStrMap":
          case "object":
            Object.keys(t).length || (n = !0);
            break;
          case "array":
            t.length ? t.some(function(e) {
              if (u.notexist(e)) return n = !0, !0
            }) : n = !0
        }
        n && u.onParamAbsent(r + e, i)
      }, u.onParamAbsent = function(e, t) {
        u.onParamError("缺少参数 " + e + ", 请确保参数不是 空字符串、空对象、空数组、null或undefined, 或数组的内容不是 null/undefined", t)
      }, u.verifyParamAbsent = function(e, t, r, i) {
        r = r || "", void 0 !== t && u.onParamPresent(r + e, i)
      }, u.onParamPresent = function(e, t) {
        u.onParamError("多余的参数 " + e, t)
      }, u.verifyParamType = function(e, t, r, i) {
        var n = u.typeOf(t).toLowerCase();
        u.isArray(r) || (r = [r]);
        var a = !0;
        switch (-1 === (r = r.map(function(e) {
          return e.toLowerCase()
        })).indexOf(n) && (a = !1), n) {
          case "number":
            isNaN(t) && (a = !1);
            break;
          case "string":
            "numeric or numeric string" === r.join("") && (a = !!/^[0-9]+$/.test(t))
        }
        a || u.onParamInvalidType(e, r, "", i)
      }, u.onParamInvalidType = function(e, t, r, i) {
        r = r || "", t = u.isArray(t) ? (t = t.map(function(e) {
          return '"' + e + '"'
        })).join(", ") : '"' + t + '"', u.onParamError('参数"' + r + e + '"类型错误, 合法的类型包括: [' + t + "]", i)
      }, u.verifyParamValid = function(e, t, r, i) {
        u.isArray(r) || (r = [r]), -1 === r.indexOf(t) && u.onParamInvalidValue(e, r, i)
      }, u.onParamInvalidValue = function(e, t, r) {
        u.isArray(t) || (t = [t]), t = t.map(function(e) {
          return '"' + e + '"'
        }), u.isArray(t) && (t = t.join(", ")), u.onParamError("参数 " + e + "值错误, 合法的值包括: [" + JSON.stringify(
          t) + "]", r)
      }, u.verifyParamMin = function(e, t, r, i) {
        t < r && u.onParamError("参数" + e + "的值不能小于" + r, i)
      }, u.verifyParamMax = function(e, t, r, i) {
        t > r && u.onParamError("参数" + e + "的值不能大于" + r, i)
      }, u.verifyArrayMax = function(e, t, r, i) {
        t.length > r && u.onParamError("参数" + e + "的长度不能大于" + r, i)
      }, u.verifyEmail = (d = /^\S+@\S+$/, function(e, t, r) {
        d.test(t) || u.onParamError("参数" + e + "邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符", r)
      }), u.verifyTel = function() {
        var e = /^[+\-()\d]+$/;
        return function(t, r, i) {
          e.test(r) || u.onParamError("参数" + t + "电话号码格式错误, 合法字符包括+、-、英文括号和数字", i)
        }
      }(), u.verifyBirth = function() {
        var e = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
        return function(t, r, i) {
          e.test(r) || u.onParamError("参数" + t + '生日格式错误, 合法为"yyyy-MM-dd"', i)
        }
      }(), u.onParamError = function(e, t) {
        u.onError({
          message: e,
          callFunc: t
        })
      }, u.verifyOptions = function(e, t, r, i, n) {
        if (e = e || {}, t && (u.isString(t) && (t = t.split(p)), u.isArray(t))) {
          "boolean" != typeof r && (n = r || null, r = !0, i = "");
          var a = r ? u.verifyParamPresent : u.verifyParamAbsent;
          t.forEach(function(t) {
            a.call(u, t, e[t], i, n)
          })
        }
        return e
      }, u.verifyParamAtLeastPresentOne = function(e, t, r) {
        t && (u.isString(t) && (t = t.split(p)), u.isArray(t) && (t.some(function(t) {
          return u.exist(e[t])
        }) || u.onParamError("以下参数[" + t.join(", ") + "]至少需要传入一个", r)))
      }, u.verifyParamPresentJustOne = function(e, t, r) {
        t && (u.isString(t) && (t = t.split(p)), u.isArray(t) && 1 !== t.reduce(function(t, r) {
          return u.exist(e[r]) && t++, t
        }, 0) && u.onParamError("以下参数[" + t.join(", ") + "]必须且只能传入一个", r))
      }, u.verifyBooleanWithDefault = function(e, t, r, i, n) {
        u.undef(r) && (r = !0), p.test(t) && (t = t.split(p)), u.isArray(t) ? t.forEach(function(t) {
          u.verifyBooleanWithDefault(e, t, r, i, n)
        }) : void 0 === e[t] ? e[t] = r : u.isBoolean(e[t]) || u.onParamInvalidType(t, "boolean", i, n)
      }, u.verifyFileInput = function(e, t) {
        return u.verifyParamPresent("fileInput", e, "", t), u.isString(e) && ((e = document.getElementById(e)) ||
            u.onParamError("找不到要上传的文件对应的input, 请检查fileInput id " + e, t)), e.tagName && "input" === e.tagName.toLowerCase() &&
          "file" === e.type.toLowerCase() || u.onParamError("请提供正确的 fileInput, 必须为 file 类型的 input 节点 tagname:" +
            e.tagName + ", filetype:" + e.type, t), e
      }, u.verifyFileType = function(e, t) {
        u.verifyParamValid("type", e, u.validFileTypes, t)
      }, u.verifyCallback = function(e, t, r) {
        p.test(t) && (t = t.split(p)), u.isArray(t) ? t.forEach(function(t) {
          u.verifyCallback(e, t, r)
        }) : e[t] ? u.isFunction(e[t]) || u.onParamInvalidType(t, "function", "", r) : e[t] = u.emptyFunc
      }, u.verifyFileUploadCallback = function(e, t) {
        u.verifyCallback(e, "uploadprogress uploaddone uploaderror uploadcancel", t)
      }, u.validFileTypes = ["image", "audio", "video", "file"], u.validFileExts = {
        image: ["bmp", "gif", "jpg", "jpeg", "jng", "png", "webp"],
        audio: ["mp3", "wav", "aac", "wma", "wmv", "amr", "mp2", "flac", "vorbis", "ac3"],
        video: ["mp4", "rm", "rmvb", "wmv", "avi", "mpg", "mpeg"]
      }, u.filterFiles = function(e, t) {
        var r, i, n = "file" === (t = t.toLowerCase()),
          a = [];
        return [].forEach.call(e, function(e) {
          if (n) a.push(e);
          else if (r = e.name.slice(e.name.lastIndexOf(".") + 1), (i = e.type.split("/"))[0] && i[1]) {
            (i[0].toLowerCase() === t || -1 !== u.validFileExts[t].indexOf(r)) && a.push(e)
          }
        }), a
      };
      var f, h, m = u.supportFormData = u.notundef(l.FormData);
      u.getFileName = function(e) {
        return e = u.verifyFileInput(e), m ? e.files[0].name : e.value.slice(e.value.lastIndexOf("\\") + 1)
      }, u.getFileInfo = (f = {
        ppt: 1,
        pptx: 2,
        pdf: 3
      }, function(e) {
        var t = {};
        if (!(e = u.verifyFileInput(e)).files) return t;
        var r = e.files[0];
        return m && (t.name = r.name, t.size = r.size, t.type = r.name.match(/\.(\w+)$/), t.type = t.type &&
          t.type[1].toLowerCase(), t.transcodeType = f[t.type] || 0), t
      }), u.sizeText = (h = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "BB"], function(e) {
        var t, r = 0;
        do {
          t = (e = Math.floor(100 * e) / 100) + h[r], e /= 1024, r++
        } while (e > 1);
        return t
      }), u.promises2cmds = function(e) {
        return e.map(function(e) {
          return e.cmd
        })
      }, u.objs2accounts = function(e) {
        return e.map(function(e) {
          return e.account
        })
      }, u.teams2ids = function(e) {
        return e.map(function(e) {
          return e.teamId
        })
      }, u.objs2ids = function(e) {
        return e.map(function(e) {
          return e.id
        })
      }, u.getMaxUpdateTime = function(e) {
        var t = e.map(function(e) {
          return +e.updateTime
        });
        return Math.max.apply(Math, t)
      }, u.genCheckUniqueFunc = function(e, t) {
        return e = e || "id", t = t || 1e3,
          function(t) {
            this.uniqueSet = this.uniqueSet || {}, this.uniqueSet[e] = this.uniqueSet[e] || {};
            var r = this.uniqueSet[e],
              i = t[e];
            return !r[i] && (r[i] = !0, !0)
          }
      }, u.fillPropertyWithDefault = function(e, t, r) {
        return !!u.undef(e[t]) && (e[t] = r, !0)
      }, e.exports = u
    }, function(e, t, r) {
      "use strict";
      t.__esModule = !0, t.default = function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
    }, function(e, t, r) {
      "use strict";
      var i = {
        info: {
          hash: "1c6ebddeb101c89b9473aecc37ef01e186a0d47d",
          shortHash: "1c6ebddeb",
          version: "6.2.1",
          sdkVersion: "52",
          nrtcVersion: "4.5.0",
          nrtcSdkVersion: "1",
          protocolVersion: 1
        },
        agentVersion: "2.8.0.906",
        lbsUrl: "https://lbs.netease.im/lbs/webconf.jsp",
        roomserver: "roomserver.netease.im",
        connectTimeout: 8e3,
        xhrTimeout: 8e3,
        socketTimeout: 8e3,
        reconnectionDelay: 1600,
        reconnectionDelayMax: 8e3,
        reconnectionJitter: .01,
        reconnectiontimer: null,
        heartbeatInterval: 8e3,
        cmdTimeout: 8e3,
        defaultReportUrl: "https://dr.netease.im/1.gif",
        isWeixinApp: !1,
        isNodejs: !1,
        isRN: !1,
        PUSHTOKEN: "",
        PUSHCONFIG: {},
        CLIENTTYPE: 16,
        PushPermissionAsked: !1,
        iosPushConfig: null,
        androidPushConfig: null,
        netDetectAddr: "https://roomserver-dev.netease.im/v1/sdk/detect/local"
      };
      i.weixinNetcall = i.nrtcNetcall = {
          checkSumUrl: "https://nrtc.netease.im/demo/getChecksum.action",
          getChannelInfoUrl: "https://nrtc.netease.im/nrtc/getChannelInfos.action"
        }, i.formatSocketUrl = function(e) {
          var t = e.url,
            r = e.secure ? "https" : "http";
          return -1 === t.indexOf("http") ? r + "://" + t : t
        }, i.uploadUrl = "https://nos.netease.com", i.chunkUploadUrl = null, i.commonMaxSize = 104857600, i.chunkSize =
        4194304, i.chunkMaxSize = 4194304e4, i.replaceUrl = "https://{bucket}-nosdn.netease.im/{object}", i.downloadHost =
        "nos.netease.com", i.downloadUrl = "https://{bucket}-nosdn.netease.im/{object}", i.httpsEnabled = !1, i.threshold =
        0, i.genUploadUrl = function(e) {
          return i.uploadUrl + "/" + e
        }, i.genChunkUploadUrl = function(e) {
          return i.chunkUploadUrl ? i.chunkUploadUrl + "/" + e.bucket + "/" + e.objectName : ""
        }, i.genDownloadUrl = function(e, t) {
          var r = e.bucket,
            n = (e.tag, e.expireSec),
            a = +new Date,
            o = n ? "&survivalTime=" + n : "",
            s = i.replaceUrl + "?createTime=" + a + o;
          return (s = i.genNosProtocolUrl(s)).replace("{bucket}", r).replace("{object}", t)
        }, i.genFileUrl = function(e) {
          var t = e.bucket,
            r = e.objectName;
          return i.genNosProtocolUrl(i.replaceUrl).replace("{bucket}", t).replace("{object}", r)
        }, i.genNosProtocolUrl = function(e) {
          return /^http/.test(e) ? i.httpsEnabled && (e = e.replace("http", "https")) : e = i.httpsEnabled ?
            "https://" + e : "http://" + e, e
        }, e.exports = i
    }, function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var i = o(r(164)),
        n = o(r(160)),
        a = o(r(9));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.default = function(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError(
          "Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : (0, a.default)
            (t)));
        e.prototype = (0, n.default)(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (i.default ? (0, i.default)(e, t) : e.__proto__ = t)
      }
    }, function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var i, n = r(9),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.default = function(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" !== (void 0 === t ? "undefined" : (0, a.default)(t)) && "function" != typeof t ?
          e : t
      }
    }, function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var i, n = r(121),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.default = function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var i = t[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), (0, a.default)
              (e, i.key, i)
          }
        }
        return function(t, r, i) {
          return r && e(t.prototype, r), i && e(t, i), t
        }
      }()
    }, function(e, t, r) {
      var i = r(42)("wks"),
        n = r(29),
        a = r(8).Symbol,
        o = "function" == typeof a;
      (e.exports = function(e) {
        return i[e] || (i[e] = o && a[e] || (o ? a : n)("Symbol." + e))
      }).store = i
    }, function(e, t) {
      var r = e.exports = {
        version: "2.5.5"
      };
      "number" == typeof __e && (__e = r)
    }, function(e, t) {
      var r = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self &&
        self.Math == Math ? self : Function("return this")();
      "number" == typeof __g && (__g = r)
    }, function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var i = o(r(106)),
        n = o(r(96)),
        a = "function" == typeof n.default && "symbol" == typeof i.default ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof n.default && e.constructor === n.default && e !== n.default.prototype ?
            "symbol" : typeof e
        };

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.default = "function" == typeof n.default && "symbol" === a(i.default) ? function(e) {
        return void 0 === e ? "undefined" : a(e)
      } : function(e) {
        return e && "function" == typeof n.default && e.constructor === n.default && e !== n.default.prototype ?
          "symbol" : void 0 === e ? "undefined" : a(e)
      }
    }, function(e, t, r) {
      "use strict";
      var i = Object.prototype.hasOwnProperty,
        n = "~";

      function a() {}

      function o(e, t, r) {
        this.fn = e, this.context = t, this.once = r || !1
      }

      function s() {
        this._events = new a, this._eventsCount = 0
      }
      Object.create && (a.prototype = Object.create(null), (new a).__proto__ || (n = !1)), s.prototype.eventNames =
        function() {
          var e, t, r = [];
          if (0 === this._eventsCount) return r;
          for (t in e = this._events) i.call(e, t) && r.push(n ? t.slice(1) : t);
          return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r
        }, s.prototype.listeners = function(e, t) {
          var r = n ? n + e : e,
            i = this._events[r];
          if (t) return !!i;
          if (!i) return [];
          if (i.fn) return [i.fn];
          for (var a = 0, o = i.length, s = new Array(o); a < o; a++) s[a] = i[a].fn;
          return s
        }, s.prototype.emit = function(e, t, r, i, a, o) {
          var s = n ? n + e : e;
          if (!this._events[s]) return !1;
          var c, d, u = this._events[s],
            l = arguments.length;
          if (u.fn) {
            switch (u.once && this.removeListener(e, u.fn, void 0, !0), l) {
              case 1:
                return u.fn.call(u.context), !0;
              case 2:
                u.fn.call(u.context, t);
                return !0;
              case 3:
                return u.fn.call(u.context, t, r), !0;
              case 4:
                return u.fn.call(u.context, t, r, i), !0;
              case 5:
                return u.fn.call(u.context, t, r, i, a), !0;
              case 6:
                return u.fn.call(u.context, t, r, i, a, o), !0
            }
            for (d = 1, c = new Array(l - 1); d < l; d++) c[d - 1] = arguments[d];
            u.fn.apply(u.context, c)
          } else {
            var p, f = u.length;
            for (d = 0; d < f; d++) switch (u[d].once && this.removeListener(e, u[d].fn, void 0, !0), l) {
              case 1:
                u[d].fn.call(u[d].context);
                break;
              case 2:
                u[d].fn.call(u[d].context, t);
                break;
              case 3:
                u[d].fn.call(u[d].context, t, r);
                break;
              case 4:
                u[d].fn.call(u[d].context, t, r, i);
                break;
              default:
                if (!c)
                  for (p = 1, c = new Array(l - 1); p < l; p++) c[p - 1] = arguments[p];
                u[d].fn.apply(u[d].context, c)
            }
          }
          return !0
        }, s.prototype.on = function(e, t, r) {
          var i = new o(t, r || this),
            a = n ? n + e : e;
          return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], i] : this._events[a].push(
            i) : (this._events[a] = i, this._eventsCount++), this
        }, s.prototype.once = function(e, t, r) {
          var i = new o(t, r || this, !0),
            a = n ? n + e : e;
          return this._events[a] ? this._events[a].fn ? this._events[a] = [this._events[a], i] : this._events[a].push(
            i) : (this._events[a] = i, this._eventsCount++), this
        }, s.prototype.removeListener = function(e, t, r, i) {
          var o = n ? n + e : e;
          if (!this._events[o]) return this;
          if (!t) return 0 == --this._eventsCount ? this._events = new a : delete this._events[o], this;
          var s = this._events[o];
          if (s.fn) s.fn !== t || i && !s.once || r && s.context !== r || (0 == --this._eventsCount ? this._events =
            new a : delete this._events[o]);
          else {
            for (var c = 0, d = [], u = s.length; c < u; c++)(s[c].fn !== t || i && !s[c].once || r && s[c].context !==
              r) && d.push(s[c]);
            d.length ? this._events[o] = 1 === d.length ? d[0] : d : 0 == --this._eventsCount ? this._events =
              new a : delete this._events[o]
          }
          return this
        }, s.prototype.removeAllListeners = function(e) {
          var t;
          return e ? (t = n ? n + e : e, this._events[t] && (0 == --this._eventsCount ? this._events = new a :
            delete this._events[t])) : (this._events = new a, this._eventsCount = 0), this
        }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prototype.setMaxListeners =
        function() {
          return this
        }, s.prefixed = n, s.EventEmitter = s, e.exports = s
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(231);
      Object.defineProperty(t, "EVENT_OBJ", {
        enumerable: !0,
        get: function() {
          return i.EVENT_OBJ
        }
      }), Object.defineProperty(t, "EVENT_CODE", {
        enumerable: !0,
        get: function() {
          return i.EVENT_CODE
        }
      });
      var n = r(228);
      Object.defineProperty(t, "PushConfig", {
        enumerable: !0,
        get: function() {
          return n.PushConfig
        }
      }), Object.defineProperty(t, "SessionConfig", {
        enumerable: !0,
        get: function() {
          return n.SessionConfig
        }
      }), Object.defineProperty(t, "NetcallOption", {
        enumerable: !0,
        get: function() {
          return n.NetcallOption
        }
      }), Object.defineProperty(t, "WebRTCOption", {
        enumerable: !0,
        get: function() {
          return n.WebRTCOption
        }
      }), Object.defineProperty(t, "NRTCOption", {
        enumerable: !0,
        get: function() {
          return n.NRTCOption
        }
      }), Object.defineProperty(t, "ApiParams", {
        enumerable: !0,
        get: function() {
          return n.ApiParams
        }
      }), Object.defineProperty(t, "VIDEO_QUALITY", {
        enumerable: !0,
        get: function() {
          return n.VIDEO_QUALITY
        }
      }), Object.defineProperty(t, "VIDEO_QUALITY_REV", {
        enumerable: !0,
        get: function() {
          return n.VIDEO_QUALITY_REV
        }
      }), Object.defineProperty(t, "validateVideoQuality", {
        enumerable: !0,
        get: function() {
          return n.validateVideoQuality
        }
      }), Object.defineProperty(t, "VIDEO_FRAME_RATE", {
        enumerable: !0,
        get: function() {
          return n.VIDEO_FRAME_RATE
        }
      }), Object.defineProperty(t, "VIDEO_FRAME_RATE_REV", {
        enumerable: !0,
        get: function() {
          return n.VIDEO_FRAME_RATE_REV
        }
      }), Object.defineProperty(t, "validateVideoFrameRate", {
        enumerable: !0,
        get: function() {
          return n.validateVideoFrameRate
        }
      }), Object.defineProperty(t, "CONTROL_TYPE", {
        enumerable: !0,
        get: function() {
          return n.CONTROL_TYPE
        }
      }), Object.defineProperty(t, "CONFIG_MAP", {
        enumerable: !0,
        get: function() {
          return n.CONFIG_MAP
        }
      }), Object.defineProperty(t, "DECTECT_RESULT_TYPE", {
        enumerable: !0,
        get: function() {
          return n.DECTECT_RESULT_TYPE
        }
      }), Object.defineProperty(t, "DECTECT_TYPE", {
        enumerable: !0,
        get: function() {
          return n.DECTECT_TYPE
        }
      }), Object.defineProperty(t, "DEVICE_TYPE", {
        enumerable: !0,
        get: function() {
          return n.DEVICE_TYPE
        }
      }), Object.defineProperty(t, "DEVICE_TYPE_REV", {
        enumerable: !0,
        get: function() {
          return n.DEVICE_TYPE_REV
        }
      }), Object.defineProperty(t, "NETCALL_TYPE", {
        enumerable: !0,
        get: function() {
          return n.NETCALL_TYPE
        }
      }), Object.defineProperty(t, "SCALE_TYPE", {
        enumerable: !0,
        get: function() {
          return n.SCALE_TYPE
        }
      }), Object.defineProperty(t, "SPLIT_MODE", {
        enumerable: !0,
        get: function() {
          return n.SPLIT_MODE
        }
      }), Object.defineProperty(t, "MIX_VIDEO_MODE", {
        enumerable: !0,
        get: function() {
          return n.MIX_VIDEO_MODE
        }
      }), Object.defineProperty(t, "VIDEO_ENCODE_MODE", {
        enumerable: !0,
        get: function() {
          return n.VIDEO_ENCODE_MODE
        }
      }), Object.defineProperty(t, "ROLE_FOR_MEETING", {
        enumerable: !0,
        get: function() {
          return n.ROLE_FOR_MEETING
        }
      }), Object.defineProperty(t, "SESSION_MODE", {
        enumerable: !0,
        get: function() {
          return n.SESSION_MODE
        }
      }), Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_PUSH_CONFIG
        }
      }), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_SESSION_CONFIG
        }
      }), Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_NETCALL_OPTION
        }
      }), Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_WEBRTC_OPTION
        }
      }), Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_NRTC_OPTION
        }
      }), Object.defineProperty(t, "GATE_WAY_RESPONSE_CODE", {
        enumerable: !0,
        get: function() {
          return n.GATE_WAY_RESPONSE_CODE
        }
      });
      var a = r(194);
      Object.defineProperty(t, "CLIENT_JOIN_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.CLIENT_JOIN_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_LOGIN_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.CLIENT_LOGIN_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_LOGOUT_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.CLIENT_LOGOUT_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_ERROR_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.CLIENT_ERROR_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_DETECT_NETWORK_RESULT_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.CLIENT_DETECT_NETWORK_RESULT_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_UPDATE_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.CLIENT_UPDATE_OF_WEBRTC
        }
      }), Object.defineProperty(t, "ICE_ANSWER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.ICE_ANSWER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "ICE_OFFER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.ICE_OFFER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.KEEP_ALIVE_ACK_OF_WEBRTC
        }
      }), Object.defineProperty(t, "KEEP_ALIVE_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.KEEP_ALIVE_OF_WEBRTC
        }
      }), Object.defineProperty(t, "LOGIN_ACK_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.LOGIN_ACK_OF_WEBRTC
        }
      }), Object.defineProperty(t, "LOGOUT_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.LOGOUT_OF_WEBRTC
        }
      }), Object.defineProperty(t, "SDP_ANSWER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.SDP_ANSWER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "SDP_OFFER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.SDP_OFFER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "SDP_UPDATE_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.SDP_UPDATE_OF_WEBRTC
        }
      }), Object.defineProperty(t, "WEBRTC_GATE_WAY_API", {
        enumerable: !0,
        get: function() {
          return a.WEBRTC_GATE_WAY_API
        }
      });
      var o = r(186);
      Object.defineProperty(t, "CommonErrorCode", {
        enumerable: !0,
        get: function() {
          return o.CommonErrorCode
        }
      }), Object.defineProperty(t, "RoomServerErrorCode", {
        enumerable: !0,
        get: function() {
          return o.RoomServerErrorCode
        }
      }), Object.defineProperty(t, "VideoErrorCode", {
        enumerable: !0,
        get: function() {
          return o.VideoErrorCode
        }
      }), Object.defineProperty(t, "AudioErrorCode", {
        enumerable: !0,
        get: function() {
          return o.AudioErrorCode
        }
      }), Object.defineProperty(t, "VideoRecordErrorCode", {
        enumerable: !0,
        get: function() {
          return o.VideoRecordErrorCode
        }
      }), Object.defineProperty(t, "AudioRecordErrorCode", {
        enumerable: !0,
        get: function() {
          return o.AudioRecordErrorCode
        }
      }), Object.defineProperty(t, "LiveStatusErrorCode", {
        enumerable: !0,
        get: function() {
          return o.LiveStatusErrorCode
        }
      }), Object.defineProperty(t, "GateWayErrorCode", {
        enumerable: !0,
        get: function() {
          return o.GateWayErrorCode
        }
      }), Object.defineProperty(t, "DeviceErrorCode", {
        enumerable: !0,
        get: function() {
          return o.DeviceErrorCode
        }
      });
      var s = r(185);
      Object.defineProperty(t, "AuidoMixingState", {
        enumerable: !0,
        get: function() {
          return s.AuidoMixingState
        }
      })
    }, function(e, t, r) {
      "use strict";
      (function(e) {
        Object.defineProperty(t, "__esModule", {
            value: !0
          }), t.url2origin = t.uniqueID = t.off = t.removeEventListener = t.on = t.addEventListener = t.format =
          t.regWhiteSpace = t.regBlank = t.emptyFunc = t.f = t.emptyObj = t.o = void 0;
        var i, n = r(9),
          a = (i = n) && i.__esModule ? i : {
            default: i
          };
        t.getGlobal = o, t.detectCSSFeature = function(e) {
            var t = !1,
              r = "Webkit Moz ms O".split(" "),
              i = document.createElement("div"),
              n = null;
            e = e.toLowerCase(), void 0 !== i.style[e] && (t = !0);
            if (!1 === t) {
              n = e.charAt(0).toUpperCase() + e.substr(1);
              for (var a = 0; a < r.length; a++)
                if (void 0 !== i.style[r[a] + n]) {
                  t = !0;
                  break
                }
            }
            return t
          }, t.fix = s, t.getYearStr = c, t.getMonthStr = d, t.getDayStr = u, t.getHourStr = l, t.getMinuteStr =
          p, t.getSecondStr = f, t.getMillisecondStr = h, t.dateFromDateTimeLocal = function(e) {
            return e = "" + e, new Date(e.replace(/-/g, "/").replace("T", " "))
          }, t.getClass = g, t.typeOf = _, t.isString = R, t.isNumber = function(e) {
            return "number" === _(e)
          }, t.isBoolean = function(e) {
            return "boolean" === _(e)
          }, t.isArray = y, t.isFunction = C, t.isDate = S, t.isRegExp = function(e) {
            return "regexp" === _(e)
          }, t.isError = function(e) {
            return "error" === _(e)
          }, t.isnull = b, t.notnull = E, t.undef = T, t.notundef = A, t.exist = O, t.notexist = P, t.isObject =
          k, t.isEmpty = function(e) {
            return P(e) || (R(e) || y(e)) && 0 === e.length
          }, t.containsNode = function(e, t) {
            if (e === t) return !0;
            for (; t.parentNode;) {
              if (t.parentNode === e) return !0;
              t = t.parentNode
            }
            return !1
          }, t.calcHeight = function(e) {
            var t = e.parentNode || document.body;
            (e = e.cloneNode(!0)).style.display = "block", e.style.opacity = 0, e.style.height = "auto", t.appendChild(
              e);
            var r = e.offsetHeight;
            return t.removeChild(e), r
          }, t.remove = function(e) {
            e.parentNode && e.parentNode.removeChild(e)
          }, t.dataset = function(e, t, r) {
            if (!O(r)) return e.getAttribute("data-" + t);
            e.setAttribute("data-" + t, r)
          }, t.target = function(e) {
            return e.target || e.srcElement
          }, t.createIframe = function(e) {
            var t;
            if ((e = e || {}).name) try {
              (t = document.createElement('<iframe name="' + e.name + '"></iframe>')).frameBorder = 0
            } catch (r) {
              (t = document.createElement("iframe")).name = e.name
            } else t = document.createElement("iframe");
            e.visible || (t.style.display = "none");
            C(e.onload) && D(t, "load", function r(i) {
              if (!t.src) return;
              e.multi || M(t, "load", r);
              e.onload(i)
            });
            (e.parent || document.body).appendChild(t);
            var r = e.src || "about:blank";
            return setTimeout(function() {
              t.src = r
            }, 0), t
          }, t.html2node = function(e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            var r = [],
              i = void 0,
              n = void 0;
            if (t.children)
              for (i = 0, n = t.children.length; i < n; i++) r.push(t.children[i]);
            else
              for (i = 0, n = t.childNodes.length; i < n; i++) {
                var a = t.childNodes[i];
                1 === a.nodeType && r.push(a)
              }
            return r.length > 1 ? t : r[0]
          }, t.scrollTop = function(e) {
            O(e) && (document.documentElement.scrollTop = document.body.scrollTop = e);
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
          }, t.forOwn = x, t.mixin = N, t.isJSON = V, t.parseJSON = function e(t) {
            try {
              V(t) && (t = JSON.parse(t)), k(t) && x(t, function(r, i) {
                switch (_(i)) {
                  case "string":
                  case "object":
                    t[r] = e(i)
                }
              })
            } catch (e) {
              console.log("error:", e)
            }
            return t
          }, t.simpleClone = function(e) {
            var t = [],
              r = JSON.stringify(e, function(e, r) {
                if ("object" === (void 0 === r ? "undefined" : (0, a.default)(r)) && null !== r) {
                  if (-1 !== t.indexOf(r)) return;
                  t.push(r)
                }
                return r
              });
            return JSON.parse(r)
          }, t.merge = function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length,
                r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
            return r.forEach(function(t) {
              N(e, t)
            }), e
          }, t.fillUndef = function(e, t) {
            return x(t, function(t, r) {
              T(e[t]) && (e[t] = r)
            }), e
          }, t.checkWithDefault = function(e, t, r) {
            var i = e[t] || e[t.toLowerCase()];
            P(i) && (i = r, e[t] = i);
            return i
          }, t.fetch = function(e, t) {
            return x(e, function(r, i) {
              O(t[r]) && (e[r] = t[r])
            }), e
          }, t.string2object = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",",
              r = {};
            return e.split(t).forEach(function(e) {
              var t = e.split("="),
                i = t.shift();
              i && (r[decodeURIComponent(i)] = decodeURIComponent(t.join("=")))
            }), r
          }, t.object2string = j, t.genUrlSep = function(e) {
            return e.indexOf("?") < 0 ? "?" : "&"
          }, t.object2query = function(e) {
            return j(e, "&", !0)
          }, t.isFileInput = W, t.getKeys = function(e, t) {
            var r = Object.keys(e);
            t && r.sort(function(t, r) {
              var i = W(e[t]),
                n = W(e[r]);
              return i === n ? 0 : i ? 1 : -1
            });
            return r
          };
        t.o = {}, t.emptyObj = {}, t.f = function() {}, t.emptyFunc = function() {}, t.regBlank = /\s+/gi, t.regWhiteSpace =
          /\s+/gi;

        function o() {
          return "undefined" != typeof window ? window : void 0 !== e ? e : {}
        }

        function s(e, t) {
          t = t || 2;
          for (var r = "" + e; r.length < t;) r = "0" + r;
          return r
        }

        function c(e) {
          return "" + e.getFullYear()
        }

        function d(e) {
          return s(e.getMonth() + 1)
        }

        function u(e) {
          return s(e.getDate())
        }

        function l(e) {
          return s(e.getHours())
        }

        function p(e) {
          return s(e.getMinutes())
        }

        function f(e) {
          return s(e.getSeconds())
        }

        function h(e) {
          return s(e.getMilliseconds(), 3)
        }
        var m, v;
        t.format = (m = /yyyy|MM|dd|hh|mm|ss|SSS/g, v = {
          yyyy: c,
          MM: d,
          dd: u,
          hh: l,
          mm: p,
          ss: f,
          SSS: h
        }, function(e, t) {
          return e = new Date(e), isNaN(+e) ? "invalid date" : (t = t || "yyyy-MM-dd").replace(m, function(
            t) {
            return v[t](e)
          })
        });

        function g(e) {
          return Object.prototype.toString.call(e).slice(8, -1)
        }

        function _(e) {
          return g(e).toLowerCase()
        }

        function R(e) {
          return "string" === _(e)
        }

        function y(e) {
          return "array" === _(e)
        }

        function C(e) {
          return "function" === _(e)
        }

        function S(e) {
          return "date" === _(e)
        }

        function b(e) {
          return null === e
        }

        function E(e) {
          return null !== e
        }

        function T(e) {
          return void 0 === e
        }

        function A(e) {
          return void 0 !== e
        }

        function O(e) {
          return A(e) && E(e)
        }

        function P(e) {
          return T(e) || b(e)
        }

        function k(e) {
          return O(e) && "object" === _(e)
        }
        var I = t.addEventListener = function(e, t, r) {
            e.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent && e.attachEvent("on" + t, r)
          },
          D = t.on = I,
          w = t.removeEventListener = function(e, t, r) {
            e.removeEventListener ? e.removeEventListener(t, r, !1) : e.detachEvent && e.detachEvent("on" + t,
              r)
          },
          M = t.off = w;

        function x() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
            r = arguments[2];
          for (var i in e) e.hasOwnProperty(i) && t.call(r, i, e[i])
        }

        function N(e, t) {
          x(t, function(t, r) {
            e[t] = r
          })
        }
        var L;
        t.uniqueID = (L = 0, function() {
          return "" + L++
        });

        function V(e) {
          return R(e) && 0 === e.indexOf("{") && e.lastIndexOf("}") === e.length - 1
        }

        function j(e, t, r) {
          if (!e) return "";
          var i = [];
          return x(e, function(e, t) {
            C(t) || (S(t) ? t = t.getTime() : y(t) ? t = t.join(",") : k(t) && (t = JSON.stringify(t)), r &&
              (t = encodeURIComponent(t)), i.push(encodeURIComponent(e) + "=" + t))
          }), i.join(t || ",")
        }
        t.url2origin = function() {
          var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
          return function(t) {
            return e.test(t || "") ? RegExp.$1.toLowerCase() : ""
          }
        }();

        function W(e) {
          var t = o();
          return e.tagName && "INPUT" === e.tagName.toUpperCase() || t.Blob && e instanceof t.Blob
        }
      }).call(this, r(31))
    }, function(e, t, r) {
      var i = r(16),
        n = r(64),
        a = r(44),
        o = Object.defineProperty;
      t.f = r(15) ? Object.defineProperty : function(e, t, r) {
        if (i(e), t = a(t, !0), i(r), n) try {
          return o(e, t, r)
        } catch (e) {}
        if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
        return "value" in r && (e[t] = r.value), e
      }
    }, function(e, t) {
      var r = {}.hasOwnProperty;
      e.exports = function(e, t) {
        return r.call(e, t)
      }
    }, function(e, t, r) {
      e.exports = !r(21)(function() {
        return 7 != Object.defineProperty({}, "a", {
          get: function() {
            return 7
          }
        }).a
      })
    }, function(e, t, r) {
      var i = r(19);
      e.exports = function(e) {
        if (!i(e)) throw TypeError(e + " is not an object!");
        return e
      }
    }, function(e, t, r) {
      var i = r(8),
        n = r(7),
        a = r(37),
        o = r(20),
        s = r(14),
        c = function(e, t, r) {
          var d, u, l, p = e & c.F,
            f = e & c.G,
            h = e & c.S,
            m = e & c.P,
            v = e & c.B,
            g = e & c.W,
            _ = f ? n : n[t] || (n[t] = {}),
            R = _.prototype,
            y = f ? i : h ? i[t] : (i[t] || {}).prototype;
          for (d in f && (r = t), r)(u = !p && y && void 0 !== y[d]) && s(_, d) || (l = u ? y[d] : r[d], _[d] = f &&
            "function" != typeof y[d] ? r[d] : v && u ? a(l, i) : g && y[d] == l ? function(e) {
              var t = function(t, r, i) {
                if (this instanceof e) {
                  switch (arguments.length) {
                    case 0:
                      return new e;
                    case 1:
                      return new e(t);
                    case 2:
                      return new e(t, r)
                  }
                  return new e(t, r, i)
                }
                return e.apply(this, arguments)
              };
              return t.prototype = e.prototype, t
            }(l) : m && "function" == typeof l ? a(Function.call, l) : l, m && ((_.virtual || (_.virtual = {}))[
              d] = l, e & c.R && R && !R[d] && o(R, d, l)))
        };
      c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
    }, function(e, t, r) {
      var i = r(61),
        n = r(45);
      e.exports = function(e) {
        return i(n(e))
      }
    }, function(e, t) {
      e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
      }
    }, function(e, t, r) {
      var i = r(13),
        n = r(27);
      e.exports = r(15) ? function(e, t, r) {
        return i.f(e, t, n(1, r))
      } : function(e, t, r) {
        return e[t] = r, e
      }
    }, function(e, t) {
      e.exports = function(e) {
        try {
          return !!e()
        } catch (e) {
          return !0
        }
      }
    }, function(e, t, r) {
      "use strict";
      (function(t) {
        var i, n = r(9),
          a = (i = n) && i.__esModule ? i : {
            default: i
          };
        var o = function() {
          var e = "object" === (void 0 === t ? "undefined" : (0, a.default)(t)) ? t : window,
            r = Math.pow(2, 53) - 1,
            i = /\bOpera/,
            n = Object.prototype,
            o = n.hasOwnProperty,
            s = n.toString;

          function c(e) {
            return (e = String(e)).charAt(0).toUpperCase() + e.slice(1)
          }

          function d(e) {
            return e = h(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : c(e)
          }

          function u(e, t) {
            for (var r in e) o.call(e, r) && t(e[r], r, e)
          }

          function l(e) {
            return null == e ? c(e) : s.call(e).slice(8, -1)
          }

          function p(e) {
            return String(e).replace(/([ -])(?!$)/g, "$1?")
          }

          function f(e, t) {
            var i = null;
            return function(e, t) {
              var i = -1,
                n = e ? e.length : 0;
              if ("number" == typeof n && n > -1 && n <= r)
                for (; ++i < n;) t(e[i], i, e);
              else u(e, t)
            }(e, function(r, n) {
              i = t(i, r, n, e)
            }), i
          }

          function h(e) {
            return String(e).replace(/^ +| +$/g, "")
          }
          return function t(r) {
            var n = e,
              o = r && "object" === (void 0 === r ? "undefined" : (0, a.default)(r)) && "String" != l(r);
            o && (n = r, r = null);
            var c = n.navigator || {},
              m = c.userAgent || "";
            r || (r = m);
            var v, g, _, R, y, C = o ? !!c.likeChrome : /\bChrome\b/.test(r) && !/internal|\n/i.test(s.toString()),
              S = o ? "Object" : "ScriptBridgingProxyObject",
              b = o ? "Object" : "Environment",
              E = o && n.java ? "JavaPackage" : l(n.java),
              T = o ? "Object" : "RuntimeObject",
              A = /\bJava/.test(E) && n.java,
              O = A && l(n.environment) == b,
              P = A ? "a" : "α",
              k = A ? "b" : "β",
              I = n.document || {},
              D = n.operamini || n.opera,
              w = i.test(w = o && D ? D["[[Class]]"] : l(D)) ? w : D = null,
              M = r,
              x = [],
              N = null,
              L = r == m,
              V = L && D && "function" == typeof D.version && D.version(),
              j = f([{
                label: "EdgeHTML",
                pattern: "Edge"
              }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
              }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"], function(e, t) {
                return e || RegExp("\\b" + (t.pattern || p(t)) + "\\b", "i").exec(r) && (t.label || t)
              }),
              W = function(e) {
                return f(e, function(e, t) {
                  return e || RegExp("\\b" + (t.pattern || p(t)) + "\\b", "i").exec(r) && (t.label || t)
                })
              }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany",
                "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror",
                "Lunascape", "Maxthon", {
                  label: "Microsoft Edge",
                  pattern: "Edge"
                }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                  label: "Samsung Internet",
                  pattern: "SamsungBrowser"
                }, "SeaMonkey", {
                  label: "Silk",
                  pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Sleipnir", "SlimBrowser", {
                  label: "SRWare Iron",
                  pattern: "Iron"
                }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                  label: "Opera Mini",
                  pattern: "OPiOS"
                }, "Opera", {
                  label: "Opera",
                  pattern: "OPR"
                }, "Chrome", {
                  label: "Chrome Mobile",
                  pattern: "(?:CriOS|CrMo)"
                }, {
                  label: "Firefox",
                  pattern: "(?:Firefox|Minefield)"
                }, {
                  label: "Firefox for iOS",
                  pattern: "FxiOS"
                }, {
                  label: "IE",
                  pattern: "IEMobile"
                }, {
                  label: "IE",
                  pattern: "MSIE"
                }, "Safari"
              ]),
              U = H([{
                  label: "BlackBerry",
                  pattern: "BB10"
                }, "BlackBerry", {
                  label: "Galaxy S",
                  pattern: "GT-I9000"
                }, {
                  label: "Galaxy S2",
                  pattern: "GT-I9100"
                }, {
                  label: "Galaxy S3",
                  pattern: "GT-I9300"
                }, {
                  label: "Galaxy S4",
                  pattern: "GT-I9500"
                }, {
                  label: "Galaxy S5",
                  pattern: "SM-G900"
                }, {
                  label: "Galaxy S6",
                  pattern: "SM-G920"
                }, {
                  label: "Galaxy S6 Edge",
                  pattern: "SM-G925"
                }, {
                  label: "Galaxy S7",
                  pattern: "SM-G930"
                }, {
                  label: "Galaxy S7 Edge",
                  pattern: "SM-G935"
                }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                  label: "Kindle Fire",
                  pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad",
                "Transformer", {
                  label: "Wii U",
                  pattern: "WiiU"
                }, "Wii", "Xbox One", {
                  label: "Xbox 360",
                  pattern: "Xbox"
                }, "Xoom"
              ]),
              B = function(e) {
                return f(e, function(e, t, i) {
                  return e || (t[U] || t[/^[a-z]+(?: +[a-z]+\b)*/i.exec(U)] || RegExp("\\b" + p(i) +
                    "(?:\\b|\\w*\\d)", "i").exec(r)) && i
                })
              }({
                Apple: {
                  iPad: 1,
                  iPhone: 1,
                  iPod: 1
                },
                Archos: {},
                Amazon: {
                  Kindle: 1,
                  "Kindle Fire": 1
                },
                Asus: {
                  Transformer: 1
                },
                "Barnes & Noble": {
                  Nook: 1
                },
                BlackBerry: {
                  PlayBook: 1
                },
                Google: {
                  "Google TV": 1,
                  Nexus: 1
                },
                HP: {
                  TouchPad: 1
                },
                HTC: {},
                LG: {},
                Microsoft: {
                  Xbox: 1,
                  "Xbox One": 1
                },
                Motorola: {
                  Xoom: 1
                },
                Nintendo: {
                  "Wii U": 1,
                  Wii: 1
                },
                Nokia: {
                  Lumia: 1
                },
                Samsung: {
                  "Galaxy S": 1,
                  "Galaxy S2": 1,
                  "Galaxy S3": 1,
                  "Galaxy S4": 1
                },
                Sony: {
                  PlayStation: 1,
                  "PlayStation Vita": 1
                }
              }),
              F = function(e) {
                return f(e, function(e, t) {
                  var i = t.pattern || p(t);
                  return !e && (e = RegExp("\\b" + i + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(r)) && (e =
                    function(e, t, r) {
                      var i = {
                        "10.0": "10",
                        6.4: "10 Technical Preview",
                        6.3: "8.1",
                        6.2: "8",
                        6.1: "Server 2008 R2 / 7",
                        "6.0": "Server 2008 / Vista",
                        5.2: "Server 2003 / XP 64-bit",
                        5.1: "XP",
                        5.01: "2000 SP1",
                        "5.0": "2000",
                        "4.0": "NT",
                        "4.90": "ME"
                      };
                      return t && r && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (i = i[
                        /[\d.]+$/.exec(e)]) && (e = "Windows " + i), e = String(e), t && r && (e =
                        e.replace(RegExp(t, "i"), r)), e = d(e.replace(/ ce$/i, " CE").replace(
                          /\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i,
                          " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1")
                        .replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(
                          /(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(
                          /\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/,
                          "$1").split(" on ")[0])
                    }(e, i, t.label || t)), e
                })
              }(["Windows Phone", "Android", "CentOS", {
                  label: "Chrome OS",
                  pattern: "CrOS"
                }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD",
                "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ",
                "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;",
                "Windows "
              ]);

            function H(e) {
              return f(e, function(e, t) {
                var i = t.pattern || p(t);
                return !e && (e = RegExp("\\b" + i + " *\\d+[.\\w_]*", "i").exec(r) || RegExp("\\b" + i +
                  " *\\w+-[\\w]*", "i").exec(r) || RegExp("\\b" + i +
                  "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(r)) && ((e = String(t.label &&
                    !RegExp(i, "i").test(t.label) ? t.label : e).split("/"))[1] && !/[\d.]+/.test(e[0]) &&
                  (e[0] += " " + e[1]), t = t.label || t, e = d(e[0].replace(RegExp(i, "i"), t).replace(
                    RegExp("; *(?:" + t + "[_-])?", "i"), " ").replace(RegExp("(" + t +
                    ")[-_.]?(\\w)", "i"), "$1 $2"))), e
              })
            }
            if (j && (j = [j]), B && !U && (U = H([B])), (v = /\bGoogle TV\b/.exec(U)) && (U = v[0]),
              /\bSimulator\b/i.test(r) && (U = (U ? U + " " : "") + "Simulator"), "Opera Mini" == W &&
              /\bOPiOS\b/.test(r) && x.push("running in Turbo/Uncompressed mode"), "IE" == W &&
              /\blike iPhone OS\b/.test(r) ? (B = (v = t(r.replace(/like iPhone OS/, ""))).manufacturer, U =
                v.product) : /^iP/.test(U) ? (W || (W = "Safari"), F = "iOS" + ((v = / OS ([\d_]+)/i.exec(r)) ?
                " " + v[1].replace(/_/g, ".") : "")) : "Konqueror" != W || /buntu/i.test(F) ? B && "Google" !=
              B && (/Chrome/.test(W) && !/\bMobile Safari\b/i.test(r) || /\bVita\b/.test(U)) ||
              /\bAndroid\b/.test(F) && /^Chrome/.test(W) && /\bVersion\//i.test(r) ? (W = "Android Browser",
                F = /\bAndroid\b/.test(F) ? F : "Android") : "Silk" == W ? (/\bMobi/i.test(r) || (F =
                "Android", x.unshift("desktop mode")), /Accelerated *= *true/i.test(r) && x.unshift(
                "accelerated")) : "PaleMoon" == W && (v = /\bFirefox\/([\d.]+)\b/.exec(r)) ? x.push(
                "identifying as Firefox " + v[1]) : "Firefox" == W && (v = /\b(Mobile|Tablet|TV)\b/i.exec(r)) ?
              (F || (F = "Firefox OS"), U || (U = v[1])) : !W || (v = !/\bMinefield\b/i.test(r) &&
                /\b(?:Firefox|Safari)\b/.exec(W)) ? (W && !U && /[\/,]|^[^(]+?\)/.test(r.slice(r.indexOf(v +
                "/") + 8)) && (W = null), (v = U || B || F) && (U || B ||
                /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(F)) && (W = /[a-z]+(?: Hat)?/i.exec(
                /\bAndroid\b/.test(F) ? F : v) + " Browser")) : "Electron" == W && (v = (
                /\bChrome\/([\d.]+)\b/.exec(r) || 0)[1]) && x.push("Chromium " + v) : F = "Kubuntu", V || (
                V = f([
                  "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
                  "Version", p(W), "(?:Firefox|Minefield|NetFront)"
                ], function(e, t) {
                  return e || (RegExp(t + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i")
                    .exec(r) || 0)[1] || null
                })), (v = ("iCab" == j && parseFloat(V) > 3 ? "WebKit" : /\bOpera\b/.test(W) && (/\bOPR\b/.test(
                  r) ? "Blink" : "Presto")) || /\b(?:Midori|Nook|Safari)\b/i.test(r) && !
                /^(?:Trident|EdgeHTML)$/.test(j) && "WebKit" || !j && /\bMSIE\b/i.test(r) && ("Mac OS" == F ?
                  "Tasman" : "Trident") || "WebKit" == j && /\bPlayStation\b(?! Vita\b)/i.test(W) &&
                "NetFront") && (j = [v]), "IE" == W && (v = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(r) || 0)[1]) ?
              (W += " Mobile", F = "Windows Phone " + (/\+$/.test(v) ? v : v + ".x"), x.unshift(
                "desktop mode")) : /\bWPDesktop\b/i.test(r) ? (W = "IE Mobile", F = "Windows Phone 8.x", x.unshift(
                "desktop mode"), V || (V = (/\brv:([\d.]+)/.exec(r) || 0)[1])) : "IE" != W && "Trident" ==
              j && (v = /\brv:([\d.]+)/.exec(r)) && (W && x.push("identifying as " + W + (V ? " " + V : "")),
                W = "IE", V = v[1]), L) {
              if (R = "global", y = null != (_ = n) ? (0, a.default)(_[R]) : "number",
                /^(?:boolean|number|string|undefined)$/.test(y) || "object" == y && !_[R]) l(v = n.runtime) ==
                S ? (W = "Adobe AIR", F = v.flash.system.Capabilities.os) : l(v = n.phantom) == T ? (W =
                  "PhantomJS", V = (v = v.version || null) && v.major + "." + v.minor + "." + v.patch) :
                "number" == typeof I.documentMode && (v = /\bTrident\/(\d+)/i.exec(r)) ? (V = [V, I.documentMode],
                  (v = +v[1] + 4) != V[1] && (x.push("IE " + V[1] + " mode"), j && (j[1] = ""), V[1] = v),
                  V = "IE" == W ? String(V[1].toFixed(1)) : V[0]) : "number" == typeof I.documentMode &&
                /^(?:Chrome|Firefox)\b/.test(W) && (x.push("masking as " + W + " " + V), W = "IE", V =
                  "11.0", j = ["Trident"], F = "Windows");
              else if (A && (M = (v = A.lang.System).getProperty("os.arch"), F = F || v.getProperty(
                  "os.name") + " " + v.getProperty("os.version")), O) {
                try {
                  V = n.require("ringo/engine").version.join("."), W = "RingoJS"
                } catch (e) {
                  (v = n.system) && v.global.system == n.system && (W = "Narwhal", F || (F = v[0].os ||
                    null))
                }
                W || (W = "Rhino")
              } else "object" === (0, a.default)(n.process) && !n.process.browser && (v = n.process) && (
                "object" === (0, a.default)(v.versions) && ("string" == typeof v.versions.electron ? (x.push(
                    "Node " + v.versions.node), W = "Electron", V = v.versions.electron) : "string" ==
                  typeof v.versions.nw && (x.push("Chromium " + V, "Node " + v.versions.node), W =
                    "NW.js", V = v.versions.nw)), W || (W = "Node.js", M = v.arch, F = v.platform, V = (V =
                  /[\d.]+/.exec(v.version)) ? V[0] : null));
              F = F && d(F)
            }
            if (V && (v = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(V) || /(?:alpha|beta)(?: ?\d)?/i.exec(
                r + ";" + (L && c.appMinorVersion)) || /\bMinefield\b/i.test(r) && "a") && (N = /b/i.test(v) ?
                "beta" : "alpha", V = V.replace(RegExp(v + "\\+?$"), "") + ("beta" == N ? k : P) + (
                  /\d+\+?/.exec(v) || "")), "Fennec" == W || "Firefox" == W && /\b(?:Android|Firefox OS)\b/
              .test(F)) W = "Firefox Mobile";
            else if ("Maxthon" == W && V) V = V.replace(/\.[\d.]+/, ".x");
            else if (/\bXbox\b/i.test(U)) "Xbox 360" == U && (F = null), "Xbox 360" == U && /\bIEMobile\b/.test(
              r) && x.unshift("mobile mode");
            else if (!/^(?:Chrome|IE|Opera)$/.test(W) && (!W || U || /Browser|Mobi/.test(W)) ||
              "Windows CE" != F && !/Mobi/i.test(r))
              if ("IE" == W && L) try {
                null === n.external && x.unshift("platform preview")
              } catch (e) {
                x.unshift("embedded")
              } else(/\bBlackBerry\b/.test(U) || /\bBB10\b/.test(r)) && (v = (RegExp(U.replace(/ +/g,
                  " *") + "/([.\\d]+)", "i").exec(r) || 0)[1] || V) ? (F = ((v = [v, /BB10/.test(r)])[1] ?
                  (U = null, B = "BlackBerry") : "Device Software") + " " + v[0], V = null) : this != u &&
                "Wii" != U && (L && D || /Opera/.test(W) && /\b(?:MSIE|Firefox)\b/i.test(r) || "Firefox" ==
                  W && /\bOS X (?:\d+\.){2,}/.test(F) || "IE" == W && (F && !/^Win/.test(F) && V > 5.5 ||
                    /\bWindows XP\b/.test(F) && V > 8 || 8 == V && !/\bTrident\b/.test(r))) && !i.test(v =
                  t.call(u, r.replace(i, "") + ";")) && v.name && (v = "ing as " + v.name + ((v = v.version) ?
                  " " + v : ""), i.test(W) ? (/\bIE\b/.test(v) && "Mac OS" == F && (F = null), v =
                  "identify" + v) : (v = "mask" + v, W = w ? d(w.replace(/([a-z])([A-Z])/g, "$1 $2")) :
                  "Opera", /\bIE\b/.test(v) && (F = null), L || (V = null)), j = ["Presto"], x.push(v));
              else W += " Mobile";
            (v = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(r) || 0)[1]) && (v = [parseFloat(v.replace(/\.(\d)$/,
                ".0$1")), v], "Safari" == W && "+" == v[1].slice(-1) ? (W = "WebKit Nightly", N = "alpha",
                V = v[1].slice(0, -1)) : V != v[1] && V != (v[2] = (/\bSafari\/([\d.]+\+?)/i.exec(r) || 0)[
                1]) || (V = null), v[1] = (/\bChrome\/([\d.]+)/i.exec(r) || 0)[1], 537.36 == v[0] && 537.36 ==
              v[2] && parseFloat(v[1]) >= 28 && "WebKit" == j && (j = ["Blink"]), L && (C || v[1]) ? (j &&
                (j[1] = "like Chrome"), v = v[1] || ((v = v[0]) < 530 ? 1 : v < 532 ? 2 : v < 532.05 ? 3 :
                  v < 533 ? 4 : v < 534.03 ? 5 : v < 534.07 ? 6 : v < 534.1 ? 7 : v < 534.13 ? 8 : v <
                  534.16 ? 9 : v < 534.24 ? 10 : v < 534.3 ? 11 : v < 535.01 ? 12 : v < 535.02 ? "13+" : v <
                  535.07 ? 15 : v < 535.11 ? 16 : v < 535.19 ? 17 : v < 536.05 ? 18 : v < 536.1 ? 19 : v <
                  537.01 ? 20 : v < 537.11 ? "21+" : v < 537.13 ? 23 : v < 537.18 ? 24 : v < 537.24 ? 25 :
                  v < 537.36 ? 26 : "Blink" != j ? "27" : "28")) : (j && (j[1] = "like Safari"), v = (v = v[
                  0]) < 400 ? 1 : v < 500 ? 2 : v < 526 ? 3 : v < 533 ? 4 : v < 534 ? "4+" : v < 535 ? 5 :
                v < 537 ? 6 : v < 538 ? 7 : v < 601 ? 8 : "8"), j && (j[1] += " " + (v += "number" ==
                typeof v ? ".x" : /[.+]/.test(v) ? "" : "+")), "Safari" == W && (!V || parseInt(V) > 45) &&
              (V = v)), "Opera" == W && (v = /\bzbov|zvav$/.exec(F)) ? (W += " ", x.unshift("desktop mode"),
                "zvav" == v ? (W += "Mini", V = null) : W += "Mobile", F = F.replace(RegExp(" *" + v + "$"),
                  "")) : "Safari" == W && /\bChrome\b/.exec(j && j[1]) && (x.unshift("desktop mode"), W =
                "Chrome Mobile", V = null, /\bOS X\b/.test(F) ? (B = "Apple", F = "iOS 4.3+") : F = null),
              V && 0 == V.indexOf(v = /[\d.]+$/.exec(F)) && r.indexOf("/" + v + "-") > -1 && (F = h(F.replace(
                v, ""))), j && !/\b(?:Avant|Nook)\b/.test(W) && (/Browser|Lunascape|Maxthon/.test(W) ||
                "Safari" != W && /^iOS/.test(F) && /\bSafari\b/.test(j[1]) ||
                /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
                  W) && j[1]) && (v = j[j.length - 1]) && x.push(v), x.length && (x = ["(" + x.join("; ") +
                ")"
              ]), B && U && U.indexOf(B) < 0 && x.push("on " + B), U && x.push((/^on /.test(x[x.length - 1]) ?
                "" : "on ") + U), F && (v = / ([\d.+]+)$/.exec(F), g = v && "/" == F.charAt(F.length - v[0]
                .length - 1), F = {
                architecture: 32,
                family: v && !g ? F.replace(v[0], "") : F,
                version: v ? v[1] : null,
                toString: function() {
                  var e = this.version;
                  return this.family + (e && !g ? " " + e : "") + (64 == this.architecture ? " 64-bit" :
                    "")
                }
              }), (v = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(M)) && !/\bi686\b/i.test(M) ? (F && (F.architecture =
                64, F.family = F.family.replace(RegExp(" *" + v), "")), W && (/\bWOW64\b/i.test(r) || L &&
                /\w(?:86|32)$/.test(c.cpuClass || c.platform) && !/\bWin64; x64\b/i.test(r)) && x.unshift(
                "32-bit")) : F && /^OS X/.test(F.family) && "Chrome" == W && parseFloat(V) >= 39 && (F.architecture =
                64), r || (r = null);
            var G = {};
            return G.description = r, G.layout = j && j[0], G.manufacturer = B, G.name = W, G.prerelease =
              N, G.product = U, G.ua = r, G.version = W && V, G.os = F || {
                architecture: null,
                family: null,
                version: null,
                toString: function() {
                  return "null"
                }
              }, G.parse = t, G.toString = function() {
                return this.description || ""
              }, G.version && x.unshift(V), G.name && x.unshift(W), F && W && (F != String(F).split(" ")[0] ||
                F != W.split(" ")[0] && !U) && x.push(U ? "(" + F + ")" : "on " + F), x.length && (G.description =
                x.join(" ")), G
          }()
        }();
        e.exports = o
      }).call(this, r(31))
    }, function(e, t) {
      e.exports = {}
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(265);
      Object.defineProperty(t, "element", {
        enumerable: !0,
        get: function() {
          return i.element
        }
      });
      var n = r(264);
      Object.defineProperty(t, "ajax", {
        enumerable: !0,
        get: function() {
          return n.ajax
        }
      });
      var a = r(263);
      Object.defineProperty(t, "tool", {
        enumerable: !0,
        get: function() {
          return a.tool
        }
      });
      var o = r(114);
      Object.defineProperty(t, "ApiInvokeData", {
        enumerable: !0,
        get: function() {
          return o.ApiInvokeData
        }
      }), Object.defineProperty(t, "DataRtc", {
        enumerable: !0,
        get: function() {
          return o.DataRtc
        }
      }), Object.defineProperty(t, "DataStats", {
        enumerable: !0,
        get: function() {
          return o.DataStats
        }
      });
      var s = r(107);
      Object.defineProperty(t, "RtcUtil", {
        enumerable: !0,
        get: function() {
          return s.RtcUtil
        }
      }), Object.defineProperty(t, "SdpUtil", {
        enumerable: !0,
        get: function() {
          return s.SdpUtil
        }
      }), Object.defineProperty(t, "RtcStats", {
        enumerable: !0,
        get: function() {
          return s.RtcStats
        }
      }), Object.defineProperty(t, "RtcStatsNew", {
        enumerable: !0,
        get: function() {
          return s.RtcStatsNew
        }
      }), Object.defineProperty(t, "RtcSupport", {
        enumerable: !0,
        get: function() {
          return s.RtcSupport
        }
      });
      var c = r(125);
      Object.defineProperty(t, "WebAudio", {
        enumerable: !0,
        get: function() {
          return c.WebAudio
        }
      })
    }, , , function(e, t) {
      e.exports = function(e, t) {
        return {
          enumerable: !(1 & e),
          configurable: !(2 & e),
          writable: !(4 & e),
          value: t
        }
      }
    }, function(e, t) {
      t.f = {}.propertyIsEnumerable
    }, function(e, t) {
      var r = 0,
        i = Math.random();
      e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++r + i).toString(36))
      }
    }, function(e, t, r) {
      var i = r(62),
        n = r(41);
      e.exports = Object.keys || function(e) {
        return i(e, n)
      }
    }, function(e, t) {
      var r;
      r = function() {
        return this
      }();
      try {
        r = r || Function("return this")() || (0, eval)("this")
      } catch (e) {
        "object" == typeof window && (r = window)
      }
      e.exports = r
    }, , function(e, t) {
      var r = {}.toString;
      e.exports = function(e) {
        return r.call(e).slice(8, -1)
      }
    }, function(e, t, r) {
      var i = r(13).f,
        n = r(14),
        a = r(6)("toStringTag");
      e.exports = function(e, t, r) {
        e && !n(e = r ? e : e.prototype, a) && i(e, a, {
          configurable: !0,
          value: t
        })
      }
    }, function(e, t) {
      e.exports = !0
    }, function(e, t, r) {
      "use strict";
      var i = r(49),
        n = r(135),
        a = r(134),
        o = r(133);
      i.json = n, i.upload = a, i.chunkUpload = o, e.exports = i
    }, function(e, t, r) {
      var i = r(56);
      e.exports = function(e, t, r) {
        if (i(e), void 0 === t) return e;
        switch (r) {
          case 1:
            return function(r) {
              return e.call(t, r)
            };
          case 2:
            return function(r, i) {
              return e.call(t, r, i)
            };
          case 3:
            return function(r, i, n) {
              return e.call(t, r, i, n)
            }
        }
        return function() {
          return e.apply(t, arguments)
        }
      }
    }, function(e, t) {
      t.f = Object.getOwnPropertySymbols
    }, function(e, t, r) {
      var i = r(8),
        n = r(7),
        a = r(35),
        o = r(40),
        s = r(13).f;
      e.exports = function(e) {
        var t = n.Symbol || (n.Symbol = a ? {} : i.Symbol || {});
        "_" == e.charAt(0) || e in t || s(t, e, {
          value: o.f(e)
        })
      }
    }, function(e, t, r) {
      t.f = r(6)
    }, function(e, t) {
      e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf"
        .split(",")
    }, function(e, t, r) {
      var i = r(8),
        n = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
      e.exports = function(e) {
        return n[e] || (n[e] = {})
      }
    }, function(e, t, r) {
      var i = r(42)("keys"),
        n = r(29);
      e.exports = function(e) {
        return i[e] || (i[e] = n(e))
      }
    }, function(e, t, r) {
      var i = r(19);
      e.exports = function(e, t) {
        if (!i(e)) return e;
        var r, n;
        if (t && "function" == typeof(r = e.toString) && !i(n = r.call(e))) return n;
        if ("function" == typeof(r = e.valueOf) && !i(n = r.call(e))) return n;
        if (!t && "function" == typeof(r = e.toString) && !i(n = r.call(e))) return n;
        throw TypeError("Can't convert object to primitive value")
      }
    }, function(e, t) {
      e.exports = function(e) {
        if (null == e) throw TypeError("Can't call method on  " + e);
        return e
      }
    }, function(e, t) {
      var r = Math.ceil,
        i = Math.floor;
      e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? i : r)(e)
      }
    }, , function(e, t, r) {
      var i = r(45);
      e.exports = function(e) {
        return Object(i(e))
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(12),
        n = r(139),
        a = r(137),
        o = r(136),
        s = {},
        c = i.f;

      function d(e) {
        var t = e.upload = "multipart/form-data" === (e.headers || i.o)["Content-Type"],
          r = !1;
        try {
          r = (location.protocol + "//" + location.host).toLowerCase() !== i.url2origin(e.url)
        } catch (e) {}
        return e.cors = r, t || r || e.mode ? function(e) {
          var t = e.mode,
            r = n,
            s = i.getGlobal();
          return !s.FormData && s.document && (t = "iframe"), "iframe" === t && (r = e.upload ? a : o), new r(e)
        }(e) : new n(e)
      }

      function u(e, t, r) {
        var i = s[e];
        if (i) {
          "onload" === t && i.result && (r = function(e, t) {
              t = {
                data: t
              };
              var r = e.result.headers;
              return r && (t.headers = e.req.header(r)), t
            }(i, r)),
            function(e) {
              var t = s[e];
              t && (t.req.destroy(), delete s[e])
            }(e);
          var n = {
            type: t,
            result: r
          };
          c(n), n.stopped || i[t](n.result)
        }
      }

      function l(e, t) {
        var r = i.genUrlSep(e);
        return t = t || "", i.isObject(t) && (t = i.object2query(t)), t && (e += r + t), e
      }

      function p(e, t) {
        t = t || {};
        var r = i.uniqueID(),
          n = {
            result: t.result,
            onload: t.onload || i.f,
            onerror: t.onerror || i.f
          };
        s[r] = n, t.onload = function(e, t) {
          u(e, "onload", t)
        }.bind(null, r), t.onerror = function(e, t) {
          u(e, "onerror", t)
        }.bind(null, r), t.query && (e = l(e, t.query));
        var a = t.method || "";
        return a && !/get/i.test(a) || !t.data || (e = l(e, t.data), t.data = null), t.url = e, n.req = d(t), r
      }
      p.filter = function(e) {
        i.isFunction(e) && (c = e)
      }, p.abort = function(e) {
        var t = s[e];
        t && t.req && t.req.abort()
      }, e.exports = p
    }, function(e, t, r) {
      var i = r(16),
        n = r(102),
        a = r(41),
        o = r(43)("IE_PROTO"),
        s = function() {},
        c = function() {
          var e, t = r(53)("iframe"),
            i = a.length;
          for (t.style.display = "none", r(76).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document)
            .open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; i--;) delete c.prototype[
            a[i]];
          return c()
        };
      e.exports = Object.create || function(e, t) {
        var r;
        return null !== e ? (s.prototype = i(e), r = new s, s.prototype = null, r[o] = e) : r = c(), void 0 ===
          t ? r : n(r, t)
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(104)(!0);
      r(65)(String, "String", function(e) {
        this._t = String(e), this._i = 0
      }, function() {
        var e, t = this._t,
          r = this._i;
        return r >= t.length ? {
          value: void 0,
          done: !0
        } : (e = i(t, r), this._i += e.length, {
          value: e,
          done: !1
        })
      })
    }, , function(e, t, r) {
      var i = r(19),
        n = r(8).document,
        a = i(n) && i(n.createElement);
      e.exports = function(e) {
        return a ? n.createElement(e) : {}
      }
    }, , function(e, t, r) {
      r(99);
      for (var i = r(8), n = r(20), a = r(23), o = r(6)("toStringTag"), s =
          "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList"
          .split(","), c = 0; c < s.length; c++) {
        var d = s[c],
          u = i[d],
          l = u && u.prototype;
        l && !l[o] && n(l, o, d), a[d] = a.Array
      }
    }, function(e, t) {
      e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
      }
    }, , function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var i, n = r(85),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.default = a.default || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (e[i] = r[i])
        }
        return e
      }
    }, function(e, t, r) {
      var i = r(28),
        n = r(27),
        a = r(18),
        o = r(44),
        s = r(14),
        c = r(64),
        d = Object.getOwnPropertyDescriptor;
      t.f = r(15) ? d : function(e, t) {
        if (e = a(e), t = o(t, !0), c) try {
          return d(e, t)
        } catch (e) {}
        if (s(e, t)) return n(!i.f.call(e, t), e[t])
      }
    }, function(e, t, r) {
      var i = r(62),
        n = r(41).concat("length", "prototype");
      t.f = Object.getOwnPropertyNames || function(e) {
        return i(e, n)
      }
    }, function(e, t, r) {
      var i = r(33);
      e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == i(e) ? e.split("") : Object(e)
      }
    }, function(e, t, r) {
      var i = r(14),
        n = r(18),
        a = r(101)(!1),
        o = r(43)("IE_PROTO");
      e.exports = function(e, t) {
        var r, s = n(e),
          c = 0,
          d = [];
        for (r in s) r != o && i(s, r) && d.push(r);
        for (; t.length > c;) i(s, r = t[c++]) && (~a(d, r) || d.push(r));
        return d
      }
    }, function(e, t, r) {
      e.exports = r(20)
    }, function(e, t, r) {
      e.exports = !r(15) && !r(21)(function() {
        return 7 != Object.defineProperty(r(53)("div"), "a", {
          get: function() {
            return 7
          }
        }).a
      })
    }, function(e, t, r) {
      "use strict";
      var i = r(35),
        n = r(17),
        a = r(63),
        o = r(20),
        s = r(23),
        c = r(103),
        d = r(34),
        u = r(75),
        l = r(6)("iterator"),
        p = !([].keys && "next" in [].keys()),
        f = function() {
          return this
        };
      e.exports = function(e, t, r, h, m, v, g) {
        c(r, t, h);
        var _, R, y, C = function(e) {
            if (!p && e in T) return T[e];
            switch (e) {
              case "keys":
              case "values":
                return function() {
                  return new r(this, e)
                }
            }
            return function() {
              return new r(this, e)
            }
          },
          S = t + " Iterator",
          b = "values" == m,
          E = !1,
          T = e.prototype,
          A = T[l] || T["@@iterator"] || m && T[m],
          O = A || C(m),
          P = m ? b ? C("entries") : O : void 0,
          k = "Array" == t && T.entries || A;
        if (k && (y = u(k.call(new e))) !== Object.prototype && y.next && (d(y, S, !0), i || "function" ==
            typeof y[l] || o(y, l, f)), b && A && "values" !== A.name && (E = !0, O = function() {
            return A.call(this)
          }), i && !g || !p && !E && T[l] || o(T, l, O), s[t] = O, s[S] = f, m)
          if (_ = {
              values: b ? O : C("values"),
              keys: v ? O : C("keys"),
              entries: P
            }, g)
            for (R in _) R in T || a(T, R, _[R]);
          else n(n.P + n.F * (p || E), t, _);
        return _
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(12),
        n = i.f,
        a = r(138);

      function o(e) {
        e.onload && this.once("load", e.onload), e.onerror && this.once("error", e.onerror), e.onbeforesend &&
          this.once("beforesend", e.onbeforesend), e.onaftersend && this.once("aftersend", e.onaftersend);
        var t = (e = this.options = i.fetch({
          method: "GET",
          url: "",
          sync: !1,
          data: null,
          headers: {},
          cookie: !1,
          timeout: 6e4,
          type: "text",
          form: null,
          input: null,
          putFileAtEnd: !1,
          proxyUrl: ""
        }, e)).headers;
        i.notexist(t["Content-Type"]) && (t["Content-Type"] = "application/x-www-form-urlencoded"), this.send()
      }
      var s = o.prototype = Object.create(a.prototype);
      s.send = function() {
        var e = this,
          t = e.options;
        setTimeout(function() {
          try {
            try {
              e.emit("beforesend", t)
            } catch (e) {
              console.log("error:", "ignore error ajax beforesend,", e)
            }
            e.doSend()
          } catch (t) {
            console.log("error:", "ignore error server error,", t), e.onError("serverError", "请求失败:" + t.message)
          }
        }, 0)
      }, s.doSend = n, s.afterSend = function() {
        var e = this;
        setTimeout(function() {
          e.emit("aftersend", e.options)
        }, 0)
      }, s.onLoad = function(e) {
        var t = this.options,
          r = e.status,
          i = e.result;
        if (0 === ("" + r).indexOf("2")) {
          if ("json" === t.type) try {
            i = JSON.parse(i)
          } catch (e) {
            return console.log("error:", "ignore error parse json,", e), void this.onError("parseError", i)
          }
          this.emit("load", i)
        } else this.onError("serverError", "服务器返回异常状态", {
          status: r,
          result: i
        })
      }, s.onError = function(e, t, r) {
        var n = i.isObject(r) ? r : {};
        n.code = e || "error", n.message = t || "发生错误", this.emit("error", n)
      }, s.onTimeout = function() {
        this.onError("timeout", "请求超时")
      }, s.abort = function() {
        this.onError("abort", "客户端中止")
      }, s.header = function(e) {
        var t = this;
        if (!i.isArray(e)) return t.getResponseHeader(e || "");
        var r = {};
        return e.forEach(function(e) {
          r[e] = t.header(e)
        }), r
      }, s.getResponseHeader = n, s.destroy = n, e.exports = o
    }, , function(e, t) {
      e.exports = function(e, t) {
        var r = t.split(".");
        for (; r.length;) {
          var i = r.shift(),
            n = !1;
          if ("?" == i[i.length - 1] && (i = i.slice(0, -1), n = !0), !(e = e[i]) && n) return e
        }
        return e
      }
    }, function(e, t, r) {
      var i = r(46),
        n = Math.min;
      e.exports = function(e) {
        return e > 0 ? n(i(e), 9007199254740991) : 0
      }
    }, function(e, t, r) {
      "use strict";
      var i = !0,
        n = !0,
        a = {
          disableLog: function(e) {
            return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") :
              (i = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled")
          },
          disableWarnings: function(e) {
            return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") :
              (n = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"))
          },
          log: function() {
            if ("object" == typeof window) {
              if (i) return;
              "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console,
                arguments)
            }
          },
          deprecated: function(e, t) {
            n && console.warn(e + " is deprecated, please use " + t + " instead.")
          },
          extractVersion: function(e, t, r) {
            var i = e.match(t);
            return i && i.length >= r && parseInt(i[r], 10)
          },
          detectBrowser: function(e) {
            var t = e && e.navigator,
              r = {
                browser: null,
                version: null
              };
            if (void 0 === e || !e.navigator) return r.browser = "Not a browser.", r;
            if (t.mozGetUserMedia) r.browser = "firefox", r.version = this.extractVersion(t.userAgent,
              /Firefox\/(\d+)\./, 1);
            else if (t.webkitGetUserMedia)
              if (e.webkitRTCPeerConnection) r.browser = "chrome", r.version = this.extractVersion(t.userAgent,
                /Chrom(e|ium)\/(\d+)\./, 2);
              else {
                if (!t.userAgent.match(/Version\/(\d+).(\d+)/)) return r.browser =
                  "Unsupported webkit-based browser with GUM support but no WebRTC support.", r;
                r.browser = "safari", r.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
              }
            else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) r.browser = "edge", r.version =
              this.extractVersion(t.userAgent, /Edge\/(\d+).(\d+)$/, 2);
            else {
              if (!t.mediaDevices || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return r.browser =
                "Not a supported browser.", r;
              r.browser = "safari", r.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
            }
            return r
          }
        };
      e.exports = {
        log: a.log,
        deprecated: a.deprecated,
        disableLog: a.disableLog,
        disableWarnings: a.disableWarnings,
        extractVersion: a.extractVersion,
        shimCreateObjectURL: a.shimCreateObjectURL,
        detectBrowser: a.detectBrowser.bind(a)
      }
    }, , , function(e, t) {
      e.exports = function e(t, r) {
        "use strict";
        var i, n, a = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
          o = /(^[ ]*|[ ]*$)/g,
          s =
          /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
          c = /^0x[0-9a-f]+$/i,
          d = /^0/,
          u = function(t) {
            return e.insensitive && ("" + t).toLowerCase() || "" + t
          },
          l = u(t).replace(o, "") || "",
          p = u(r).replace(o, "") || "",
          f = l.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
          h = p.replace(a, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
          m = parseInt(l.match(c), 16) || 1 !== f.length && l.match(s) && Date.parse(l),
          v = parseInt(p.match(c), 16) || m && p.match(s) && Date.parse(p) || null;
        if (v) {
          if (m < v) return -1;
          if (m > v) return 1
        }
        for (var g = 0, _ = Math.max(f.length, h.length); g < _; g++) {
          if (i = !(f[g] || "").match(d) && parseFloat(f[g]) || f[g] || 0, n = !(h[g] || "").match(d) &&
            parseFloat(h[g]) || h[g] || 0, isNaN(i) !== isNaN(n)) return isNaN(i) ? 1 : -1;
          if (typeof i != typeof n && (i += "", n += ""), i < n) return -1;
          if (i > n) return 1
        }
        return 0
      }
    }, function(e, t) {}, function(e, t, r) {
      var i = r(14),
        n = r(48),
        a = r(43)("IE_PROTO"),
        o = Object.prototype;
      e.exports = Object.getPrototypeOf || function(e) {
        return e = n(e), i(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor
          .prototype : e instanceof Object ? o : null
      }
    }, function(e, t, r) {
      var i = r(8).document;
      e.exports = i && i.documentElement
    }, function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var i, n = r(121),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.default = function(e, t, r) {
        return t in e ? (0, a.default)(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = r, e
      }
    }, function(e, t, r) {
      var i = r(33),
        n = r(6)("toStringTag"),
        a = "Arguments" == i(function() {
          return arguments
        }());
      e.exports = function(e) {
        var t, r, o;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(r = function(e, t) {
            try {
              return e[t]
            } catch (e) {}
          }(t = Object(e), n)) ? r : a ? i(t) : "Object" == (o = i(t)) && "function" == typeof t.callee ?
          "Arguments" : o
      }
    }, function(e, t, r) {
      "use strict";
      var i = {
          link: {
            id: 1,
            heartbeat: 2
          },
          sync: {
            id: 5,
            sync: 1,
            syncTeamMembers: 2
          },
          misc: {
            id: 6,
            getSimpleNosToken: 1,
            getNosToken: 2,
            notifyUploadLog: 3,
            uploadSdkLogUrl: 4,
            audioToText: 5,
            processImage: 6,
            getNosTokenTrans: 7,
            notifyTransLog: 8,
            fetchFile: 9,
            fetchFileList: 10,
            removeFile: 11,
            getClientAntispam: 17,
            fileQuickTransfer: 18,
            getNosOriginUrl: 22
          },
          avSignal: {
            id: 15,
            signalingCreate: 1,
            signalingDelay: 2,
            signalingClose: 3,
            signalingJoin: 4,
            signalingLeave: 5,
            signalingInvite: 6,
            signalingCancel: 7,
            signalingReject: 8,
            signalingAccept: 9,
            signalingControl: 10,
            signalingNotify: 11,
            signalingMutilClientSyncNotify: 12,
            signalingUnreadMessageSyncNotify: 13,
            signalingChannelsSyncNotify: 14,
            signalingGetChannelInfo: 15
          }
        },
        n = {
          heartbeat: {
            sid: i.link.id,
            cid: i.link.heartbeat
          },
          getSimpleNosToken: {
            sid: i.misc.id,
            cid: i.misc.getSimpleNosToken,
            params: [{
              type: "int",
              name: "num"
            }]
          },
          getNosToken: {
            sid: i.misc.id,
            cid: i.misc.getNosToken,
            params: [{
              type: "String",
              name: "responseBody"
            }, {
              type: "Property",
              name: "nosToken",
              entity: "nosToken"
            }]
          },
          uploadSdkLogUrl: {
            sid: i.misc.id,
            cid: i.misc.uploadSdkLogUrl,
            params: [{
              type: "string",
              name: "url"
            }]
          },
          audioToText: {
            sid: i.misc.id,
            cid: i.misc.audioToText,
            params: [{
              type: "Property",
              name: "audioToText"
            }]
          },
          processImage: {
            sid: i.misc.id,
            cid: i.misc.processImage,
            params: [{
              type: "String",
              name: "url"
            }, {
              type: "PropertyArray",
              name: "imageOps",
              entity: "imageOp"
            }]
          },
          getClientAntispam: {
            sid: i.misc.id,
            cid: i.misc.getClientAntispam,
            params: [{
              type: "Property",
              name: "clientAntispam"
            }]
          },
          fileQuickTransfer: {
            sid: i.misc.id,
            cid: i.misc.fileQuickTransfer,
            params: [{
              type: "Property",
              name: "fileQuickTransfer"
            }]
          },
          getNosOriginUrl: {
            sid: i.misc.id,
            cid: i.misc.getNosOriginUrl,
            params: [{
              type: "Property",
              name: "nosFileUrlTag"
            }]
          },
          getNosTokenTrans: {
            sid: i.misc.id,
            cid: i.misc.getNosTokenTrans,
            params: [{
              type: "Property",
              name: "transToken"
            }]
          },
          fetchFile: {
            sid: i.misc.id,
            cid: i.misc.fetchFile,
            params: [{
              type: "String",
              name: "docId"
            }]
          },
          fetchFileList: {
            sid: i.misc.id,
            cid: i.misc.fetchFileList,
            params: [{
              type: "Property",
              name: "fileListParam"
            }]
          },
          removeFile: {
            sid: i.misc.id,
            cid: i.misc.removeFile,
            params: [{
              type: "String",
              name: "docId"
            }]
          },
          signalingCreate: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingCreate,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingDelay: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingDelay,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingClose: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingClose,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingJoin: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingJoin,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingLeave: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingLeave,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingInvite: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingInvite,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingCancel: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingCancel,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingReject: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingReject,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingAccept: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingAccept,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingControl: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingControl,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingGetChannelInfo: {
            sid: i.avSignal.id,
            cid: i.avSignal.signalingGetChannelInfo,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          }
        };
      e.exports = {
        idMap: i,
        cmdConfig: n,
        packetConfig: {
          "1_2": {
            service: "link",
            cmd: "heartbeat"
          },
          "6_1": {
            service: "misc",
            cmd: "getSimpleNosToken",
            response: [{
              type: "PropertyArray",
              name: "nosTokens",
              entity: "nosToken"
            }]
          },
          "6_2": {
            service: "misc",
            cmd: "getNosToken",
            response: [{
              type: "Property",
              name: "nosToken"
            }]
          },
          "6_3": {
            service: "misc",
            cmd: "notifyUploadLog"
          },
          "6_5": {
            service: "misc",
            cmd: "audioToText",
            response: [{
              type: "String",
              name: "text"
            }]
          },
          "6_6": {
            service: "misc",
            cmd: "processImage",
            response: [{
              type: "String",
              name: "url"
            }]
          },
          "6_7": {
            service: "misc",
            cmd: "getNosTokenTrans",
            response: [{
              type: "Property",
              name: "nosToken"
            }, {
              type: "String",
              name: "docId"
            }]
          },
          "6_8": {
            service: "misc",
            cmd: "notifyTransLog",
            response: [{
              type: "Property",
              name: "transInfo"
            }]
          },
          "6_9": {
            service: "misc",
            cmd: "fetchFile",
            response: [{
              type: "Property",
              name: "info",
              entity: "transInfo"
            }]
          },
          "6_10": {
            service: "misc",
            cmd: "fetchFileList",
            response: [{
              type: "PropertyArray",
              name: "list",
              entity: "transInfo"
            }, {
              type: "Number",
              name: "totalCount"
            }]
          },
          "6_11": {
            service: "misc",
            cmd: "removeFile",
            response: [{
              type: "String",
              name: "res"
            }]
          },
          "6_17": {
            service: "misc",
            cmd: "getClientAntispam",
            response: [{
              type: "Property",
              name: "clientAntispam"
            }]
          },
          "6_18": {
            service: "misc",
            cmd: "fileQuickTransfer",
            response: [{
              type: "Property",
              name: "fileQuickTransfer"
            }]
          },
          "6_22": {
            service: "misc",
            cmd: "getNosOriginUrl",
            response: [{
              type: "Property",
              name: "nosFileUrlTag"
            }]
          },
          "15_1": {
            service: "avSignal",
            cmd: "signalingCreate",
            response: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          "15_2": {
            service: "avSignal",
            cmd: "signalingDelay",
            response: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          "15_3": {
            service: "avSignal",
            cmd: "signalingClose",
            response: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          "15_4": {
            service: "avSignal",
            cmd: "signalingJoin",
            response: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          "15_5": {
            service: "avSignal",
            cmd: "signalingLeave",
            response: []
          },
          "15_6": {
            service: "avSignal",
            cmd: "signalingInvite",
            response: []
          },
          "15_7": {
            service: "avSignal",
            cmd: "signalingCancel",
            response: []
          },
          "15_8": {
            service: "avSignal",
            cmd: "signalingReject",
            response: []
          },
          "15_9": {
            service: "avSignal",
            cmd: "signalingAccept",
            response: []
          },
          "15_10": {
            service: "avSignal",
            cmd: "signalingControl",
            response: []
          },
          "15_11": {
            service: "avSignal",
            cmd: "signalingNotify",
            response: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          "15_12": {
            service: "avSignal",
            cmd: "signalingMutilClientSyncNotify",
            response: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          "15_13": {
            service: "avSignal",
            cmd: "signalingUnreadMessageSyncNotify",
            response: [{
              type: "PropertyArray",
              name: "avSignalTag"
            }]
          },
          "15_14": {
            service: "avSignal",
            cmd: "signalingChannelsSyncNotify",
            response: [{
              type: "PropertyArray",
              name: "avSignalTag"
            }]
          },
          "15_15": {
            service: "avSignal",
            cmd: "signalingGetChannelInfo",
            response: [{
              type: "Property",
              name: "avSignalTag"
            }]
          }
        }
      }
    }, , function(e, t, r) {
      "use strict";
      var i = r(12),
        n = i.getGlobal(),
        a = {},
        o = n.name || "_parent",
        s = [],
        c = [];
      a.addMsgListener = function(e) {
        s.push(e)
      };
      var d, u, l, p, f = (d = /^([\w]+?:\/\/.*?(?=\/|$))/i, function(e) {
          return e = e || "", d.test(e) ? RegExp.$1 : "*"
        }),
        h = function() {
          var e = unescape(n.name || "").trim();
          if (e && 0 === e.indexOf("MSG|")) {
            n.name = "";
            var t = i.string2object(e.replace("MSG|", ""), "|"),
              r = (t.origin || "").toLowerCase();
            r && "*" !== r && 0 !== location.href.toLowerCase().indexOf(r) || function(e) {
              for (var t = 0, r = s.length; t < r; t++) try {
                s[t].call(null, e)
              } catch (e) {}
            }({
              data: JSON.parse(t.data || "null"),
              source: n.frames[t.self] || t.self,
              origin: f(t.ref || document.referrer)
            })
          }
        },
        m = (l = function(e, t) {
          for (var r = 0, i = e.length; r < i; r++)
            if (e[r] === t) return !0;
          return !1
        }, function() {
          if (c.length) {
            u = [];
            for (var e, t = c.length - 1; t >= 0; t--) e = c[t], l(u, e.w) || (u.push(e.w), c.splice(t, 1), e.w
              .name = e.d);
            u = null
          }
        }),
        v = a.startTimer = (p = !1, function() {
          p || (p = !0, n.postMessage || (setInterval(m, 100), setInterval(h, 20)))
        });
      a.postMessage = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (i.fillUndef(t, {
            origin: "*",
            source: o
          }), n.postMessage) {
          var r = t.data;
          n.FormData || (r = JSON.stringify(r)), e.postMessage(r, t.origin)
        } else {
          if (v(), i.isObject(t)) {
            var a = {};
            a.origin = t.origin || "", a.ref = location.href, a.self = t.source, a.data = JSON.stringify(t.data),
              t = "MSG|" + i.object2string(a, "|", !0)
          }
          c.unshift({
            w: e,
            d: escape(t)
          })
        }
      }, e.exports = a
    }, function(e, t, r) {
      "use strict";
      var i = r(30),
        n = r(38),
        a = r(28),
        o = r(48),
        s = r(61),
        c = Object.assign;
      e.exports = !c || r(21)(function() {
        var e = {},
          t = {},
          r = Symbol(),
          i = "abcdefghijklmnopqrst";
        return e[r] = 7, i.split("").forEach(function(e) {
          t[e] = e
        }), 7 != c({}, e)[r] || Object.keys(c({}, t)).join("") != i
      }) ? function(e, t) {
        for (var r = o(e), c = arguments.length, d = 1, u = n.f, l = a.f; c > d;)
          for (var p, f = s(arguments[d++]), h = u ? i(f).concat(u(f)) : i(f), m = h.length, v = 0; m > v;) l.call(
            f, p = h[v++]) && (r[p] = f[p]);
        return r
      } : c
    }, function(e, t, r) {
      var i = r(17);
      i(i.S + i.F, "Object", {
        assign: r(82)
      })
    }, function(e, t, r) {
      r(83), e.exports = r(7).Object.assign
    }, function(e, t, r) {
      e.exports = {
        default: r(84),
        __esModule: !0
      }
    }, , function(e, t, r) {
      "use strict";
      var i = r(2);
      "undefined" != typeof window && (window.console || i.isWeixinApp || (window.console = {
        log: function() {},
        info: function() {},
        warn: function() {},
        error: function() {}
      }))
    }, function(e, t, r) {
      r(39)("observable")
    }, function(e, t, r) {
      r(39)("asyncIterator")
    }, function(e, t, r) {
      var i = r(18),
        n = r(60).f,
        a = {}.toString,
        o = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) :
        [];
      e.exports.f = function(e) {
        return o && "[object Window]" == a.call(e) ? function(e) {
          try {
            return n(e)
          } catch (e) {
            return o.slice()
          }
        }(e) : n(i(e))
      }
    }, function(e, t, r) {
      var i = r(33);
      e.exports = Array.isArray || function(e) {
        return "Array" == i(e)
      }
    }, function(e, t, r) {
      var i = r(30),
        n = r(38),
        a = r(28);
      e.exports = function(e) {
        var t = i(e),
          r = n.f;
        if (r)
          for (var o, s = r(e), c = a.f, d = 0; s.length > d;) c.call(e, o = s[d++]) && t.push(o);
        return t
      }
    }, function(e, t, r) {
      var i = r(29)("meta"),
        n = r(19),
        a = r(14),
        o = r(13).f,
        s = 0,
        c = Object.isExtensible || function() {
          return !0
        },
        d = !r(21)(function() {
          return c(Object.preventExtensions({}))
        }),
        u = function(e) {
          o(e, i, {
            value: {
              i: "O" + ++s,
              w: {}
            }
          })
        },
        l = e.exports = {
          KEY: i,
          NEED: !1,
          fastKey: function(e, t) {
            if (!n(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!a(e, i)) {
              if (!c(e)) return "F";
              if (!t) return "E";
              u(e)
            }
            return e[i].i
          },
          getWeak: function(e, t) {
            if (!a(e, i)) {
              if (!c(e)) return !0;
              if (!t) return !1;
              u(e)
            }
            return e[i].w
          },
          onFreeze: function(e) {
            return d && l.NEED && c(e) && !a(e, i) && u(e), e
          }
        }
    }, function(e, t, r) {
      "use strict";
      var i = r(8),
        n = r(14),
        a = r(15),
        o = r(17),
        s = r(63),
        c = r(93).KEY,
        d = r(21),
        u = r(42),
        l = r(34),
        p = r(29),
        f = r(6),
        h = r(40),
        m = r(39),
        v = r(92),
        g = r(91),
        _ = r(16),
        R = r(19),
        y = r(18),
        C = r(44),
        S = r(27),
        b = r(50),
        E = r(90),
        T = r(59),
        A = r(13),
        O = r(30),
        P = T.f,
        k = A.f,
        I = E.f,
        D = i.Symbol,
        w = i.JSON,
        M = w && w.stringify,
        x = f("_hidden"),
        N = f("toPrimitive"),
        L = {}.propertyIsEnumerable,
        V = u("symbol-registry"),
        j = u("symbols"),
        W = u("op-symbols"),
        U = Object.prototype,
        B = "function" == typeof D,
        F = i.QObject,
        H = !F || !F.prototype || !F.prototype.findChild,
        G = a && d(function() {
          return 7 != b(k({}, "a", {
            get: function() {
              return k(this, "a", {
                value: 7
              }).a
            }
          })).a
        }) ? function(e, t, r) {
          var i = P(U, t);
          i && delete U[t], k(e, t, r), i && e !== U && k(U, t, i)
        } : k,
        Y = function(e) {
          var t = j[e] = b(D.prototype);
          return t._k = e, t
        },
        J = B && "symbol" == typeof D.iterator ? function(e) {
          return "symbol" == typeof e
        } : function(e) {
          return e instanceof D
        },
        K = function(e, t, r) {
          return e === U && K(W, t, r), _(e), t = C(t, !0), _(r), n(j, t) ? (r.enumerable ? (n(e, x) && e[x][t] &&
            (e[x][t] = !1), r = b(r, {
              enumerable: S(0, !1)
            })) : (n(e, x) || k(e, x, S(1, {})), e[x][t] = !0), G(e, t, r)) : k(e, t, r)
        },
        z = function(e, t) {
          _(e);
          for (var r, i = v(t = y(t)), n = 0, a = i.length; a > n;) K(e, r = i[n++], t[r]);
          return e
        },
        Q = function(e) {
          var t = L.call(this, e = C(e, !0));
          return !(this === U && n(j, e) && !n(W, e)) && (!(t || !n(this, e) || !n(j, e) || n(this, x) && this[x]
            [e]) || t)
        },
        q = function(e, t) {
          if (e = y(e), t = C(t, !0), e !== U || !n(j, t) || n(W, t)) {
            var r = P(e, t);
            return !r || !n(j, t) || n(e, x) && e[x][t] || (r.enumerable = !0), r
          }
        },
        $ = function(e) {
          for (var t, r = I(y(e)), i = [], a = 0; r.length > a;) n(j, t = r[a++]) || t == x || t == c || i.push(t);
          return i
        },
        X = function(e) {
          for (var t, r = e === U, i = I(r ? W : y(e)), a = [], o = 0; i.length > o;) !n(j, t = i[o++]) || r && !
            n(U, t) || a.push(j[t]);
          return a
        };
      B || (s((D = function() {
        if (this instanceof D) throw TypeError("Symbol is not a constructor!");
        var e = p(arguments.length > 0 ? arguments[0] : void 0),
          t = function(r) {
            this === U && t.call(W, r), n(this, x) && n(this[x], e) && (this[x][e] = !1), G(this, e, S(1,
              r))
          };
        return a && H && G(U, e, {
          configurable: !0,
          set: t
        }), Y(e)
      }).prototype, "toString", function() {
        return this._k
      }), T.f = q, A.f = K, r(60).f = E.f = $, r(28).f = Q, r(38).f = X, a && !r(35) && s(U,
        "propertyIsEnumerable", Q, !0), h.f = function(e) {
        return Y(f(e))
      }), o(o.G + o.W + o.F * !B, {
        Symbol: D
      });
      for (var Z =
          "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables"
          .split(","), ee = 0; Z.length > ee;) f(Z[ee++]);
      for (var te = O(f.store), re = 0; te.length > re;) m(te[re++]);
      o(o.S + o.F * !B, "Symbol", {
        for: function(e) {
          return n(V, e += "") ? V[e] : V[e] = D(e)
        },
        keyFor: function(e) {
          if (!J(e)) throw TypeError(e + " is not a symbol!");
          for (var t in V)
            if (V[t] === e) return t
        },
        useSetter: function() {
          H = !0
        },
        useSimple: function() {
          H = !1
        }
      }), o(o.S + o.F * !B, "Object", {
        create: function(e, t) {
          return void 0 === t ? b(e) : z(b(e), t)
        },
        defineProperty: K,
        defineProperties: z,
        getOwnPropertyDescriptor: q,
        getOwnPropertyNames: $,
        getOwnPropertySymbols: X
      }), w && o(o.S + o.F * (!B || d(function() {
        var e = D();
        return "[null]" != M([e]) || "{}" != M({
          a: e
        }) || "{}" != M(Object(e))
      })), "JSON", {
        stringify: function(e) {
          for (var t, r, i = [e], n = 1; arguments.length > n;) i.push(arguments[n++]);
          if (r = t = i[1], (R(t) || void 0 !== e) && !J(e)) return g(t) || (t = function(e, t) {
            if ("function" == typeof r && (t = r.call(this, e, t)), !J(t)) return t
          }), i[1] = t, M.apply(w, i)
        }
      }), D.prototype[N] || r(20)(D.prototype, N, D.prototype.valueOf), l(D, "Symbol"), l(Math, "Math", !0), l(
        i.JSON, "JSON", !0)
    }, function(e, t, r) {
      r(94), r(74), r(89), r(88), e.exports = r(7).Symbol
    }, function(e, t, r) {
      e.exports = {
        default: r(95),
        __esModule: !0
      }
    }, function(e, t) {
      e.exports = function(e, t) {
        return {
          value: t,
          done: !!e
        }
      }
    }, function(e, t) {
      e.exports = function() {}
    }, function(e, t, r) {
      "use strict";
      var i = r(98),
        n = r(97),
        a = r(23),
        o = r(18);
      e.exports = r(65)(Array, "Array", function(e, t) {
        this._t = o(e), this._i = 0, this._k = t
      }, function() {
        var e = this._t,
          t = this._k,
          r = this._i++;
        return !e || r >= e.length ? (this._t = void 0, n(1)) : n(0, "keys" == t ? r : "values" == t ? e[r] :
          [r, e[r]])
      }, "values"), a.Arguments = a.Array, i("keys"), i("values"), i("entries")
    }, function(e, t, r) {
      var i = r(46),
        n = Math.max,
        a = Math.min;
      e.exports = function(e, t) {
        return (e = i(e)) < 0 ? n(e + t, 0) : a(e, t)
      }
    }, function(e, t, r) {
      var i = r(18),
        n = r(69),
        a = r(100);
      e.exports = function(e) {
        return function(t, r, o) {
          var s, c = i(t),
            d = n(c.length),
            u = a(o, d);
          if (e && r != r) {
            for (; d > u;)
              if ((s = c[u++]) != s) return !0
          } else
            for (; d > u; u++)
              if ((e || u in c) && c[u] === r) return e || u || 0;
          return !e && -1
        }
      }
    }, function(e, t, r) {
      var i = r(13),
        n = r(16),
        a = r(30);
      e.exports = r(15) ? Object.defineProperties : function(e, t) {
        n(e);
        for (var r, o = a(t), s = o.length, c = 0; s > c;) i.f(e, r = o[c++], t[r]);
        return e
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(50),
        n = r(27),
        a = r(34),
        o = {};
      r(20)(o, r(6)("iterator"), function() {
        return this
      }), e.exports = function(e, t, r) {
        e.prototype = i(o, {
          next: n(1, r)
        }), a(e, t + " Iterator")
      }
    }, function(e, t, r) {
      var i = r(46),
        n = r(45);
      e.exports = function(e) {
        return function(t, r) {
          var a, o, s = String(n(t)),
            c = i(r),
            d = s.length;
          return c < 0 || c >= d ? e ? "" : void 0 : (a = s.charCodeAt(c)) < 55296 || a > 56319 || c + 1 ===
            d || (o = s.charCodeAt(c + 1)) < 56320 || o > 57343 ? e ? s.charAt(c) : a : e ? s.slice(c, c + 2) :
            o - 56320 + (a - 55296 << 10) + 65536
        }
      }
    }, function(e, t, r) {
      r(51), r(55), e.exports = r(40).f("iterator")
    }, function(e, t, r) {
      e.exports = {
        default: r(105),
        __esModule: !0
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(258);
      Object.defineProperty(t, "RtcUtil", {
        enumerable: !0,
        get: function() {
          return s(i).default
        }
      });
      var n = r(241);
      Object.defineProperty(t, "SdpUtil", {
        enumerable: !0,
        get: function() {
          return s(n).default
        }
      });
      var a = r(233);
      Object.defineProperty(t, "RtcStatsNew", {
        enumerable: !0,
        get: function() {
          return s(a).default
        }
      });
      var o = r(149);

      function s(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "RtcSupport", {
        enumerable: !0,
        get: function() {
          return s(o).default
        }
      })
    }, function(e, t, r) {
      var i = r(78),
        n = r(6)("iterator"),
        a = r(23);
      e.exports = r(7).getIteratorMethod = function(e) {
        if (null != e) return e[n] || e["@@iterator"] || a[i(e)]
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(225);
      Object.defineProperty(t, "VIDEO_QUALITY", {
        enumerable: !0,
        get: function() {
          return i.VIDEO_QUALITY
        }
      }), Object.defineProperty(t, "VIDEO_QUALITY_REV", {
        enumerable: !0,
        get: function() {
          return i.VIDEO_QUALITY_REV
        }
      }), Object.defineProperty(t, "validateVideoQuality", {
        enumerable: !0,
        get: function() {
          return i.validateVideoQuality
        }
      });
      var n = r(224);
      Object.defineProperty(t, "VIDEO_FRAME_RATE", {
        enumerable: !0,
        get: function() {
          return n.VIDEO_FRAME_RATE
        }
      }), Object.defineProperty(t, "VIDEO_FRAME_RATE_REV", {
        enumerable: !0,
        get: function() {
          return n.VIDEO_FRAME_RATE_REV
        }
      }), Object.defineProperty(t, "validateVideoFrameRate", {
        enumerable: !0,
        get: function() {
          return n.validateVideoFrameRate
        }
      });
      var a = r(223);
      Object.defineProperty(t, "CONTROL_TYPE", {
        enumerable: !0,
        get: function() {
          return a.CONTROL_TYPE
        }
      });
      var o = r(222);
      Object.defineProperty(t, "CONFIG_MAP", {
        enumerable: !0,
        get: function() {
          return o.CONFIG_MAP
        }
      });
      var s = r(221);
      Object.defineProperty(t, "DEVICE_TYPE", {
        enumerable: !0,
        get: function() {
          return s.DEVICE_TYPE
        }
      }), Object.defineProperty(t, "DEVICE_TYPE_REV", {
        enumerable: !0,
        get: function() {
          return s.DEVICE_TYPE_REV
        }
      });
      var c = r(220);
      Object.defineProperty(t, "NETCALL_TYPE", {
        enumerable: !0,
        get: function() {
          return c.NETCALL_TYPE
        }
      });
      var d = r(219);
      Object.defineProperty(t, "SPLIT_MODE", {
        enumerable: !0,
        get: function() {
          return d.SPLIT_MODE
        }
      });
      var u = r(218);
      Object.defineProperty(t, "MIX_VIDEO_MODE", {
        enumerable: !0,
        get: function() {
          return u.MIX_VIDEO_MODE
        }
      });
      var l = r(217);
      Object.defineProperty(t, "ROLE_FOR_MEETING", {
        enumerable: !0,
        get: function() {
          return l.ROLE_FOR_MEETING
        }
      });
      var p = r(216);
      Object.defineProperty(t, "SESSION_MODE", {
        enumerable: !0,
        get: function() {
          return p.SESSION_MODE
        }
      });
      var f = r(215);
      Object.defineProperty(t, "DECTECT_RESULT_TYPE", {
        enumerable: !0,
        get: function() {
          return f.DECTECT_RESULT_TYPE
        }
      });
      var h = r(214);
      Object.defineProperty(t, "DECTECT_TYPE", {
        enumerable: !0,
        get: function() {
          return h.DECTECT_TYPE
        }
      }), Object.defineProperty(t, "DECTECT_TYPE_REV", {
        enumerable: !0,
        get: function() {
          return h.DECTECT_TYPE_REV
        }
      });
      var m = r(213);
      Object.defineProperty(t, "VIDEO_ENCODE_MODE", {
        enumerable: !0,
        get: function() {
          return m.VIDEO_ENCODE_MODE
        }
      });
      var v = r(212);
      Object.defineProperty(t, "SCALE_TYPE", {
        enumerable: !0,
        get: function() {
          return v.SCALE_TYPE
        }
      })
    }, function(e, t, r) {
      var i = r(243),
        n = r(242);
      t.write = n, t.parse = i.parse, t.parseFmtpConfig = i.parseFmtpConfig, t.parseParams = i.parseParams, t.parsePayloads =
        i.parsePayloads, t.parseRemoteCandidates = i.parseRemoteCandidates, t.parseImageAttributes = i.parseImageAttributes,
        t.parseSimulcastStreamList = i.parseSimulcastStreamList
    }, function(e, t, r) {
      "use strict";
      var i = r(56);
      e.exports.f = function(e) {
        return new function(e) {
          var t, r;
          this.promise = new e(function(e, i) {
            if (void 0 !== t || void 0 !== r) throw TypeError("Bad Promise constructor");
            t = e, r = i
          }), this.resolve = i(t), this.reject = i(r)
        }(e)
      }
    }, function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var i, n = r(255),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.default = function(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new a.default(function(e, r) {
            return function i(n, o) {
              try {
                var s = t[n](o),
                  c = s.value
              } catch (e) {
                return void r(e)
              }
              if (!s.done) return a.default.resolve(c).then(function(e) {
                i("next", e)
              }, function(e) {
                i("throw", e)
              });
              e(c)
            }("next")
          })
        }
      }
    }, function(e, t, r) {
      e.exports = r(257)
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = s(r(262)),
        n = s(r(261)),
        a = s(r(260)),
        o = s(r(259));

      function s(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.default = {
        ApiInvokeData: function(e) {
          return new i.default(e)
        },
        LogData: function(e) {
          return new n.default(e)
        },
        FormatDataFromStats: function(e) {
          return new a.default(e)
        },
        RawDataFromStats: function(e) {
          return new o.default(e)
        }
      }, e.exports = t.default
    }, , , , , , function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var i = a(r(273)),
        n = a(r(270));

      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.default = function e(t, r, a) {
        null === t && (t = Function.prototype);
        var o = (0, n.default)(t, r);
        if (void 0 === o) {
          var s = (0, i.default)(t);
          return null === s ? void 0 : e(s, r, a)
        }
        if ("value" in o) return o.value;
        var c = o.get;
        return void 0 !== c ? c.call(a) : void 0
      }
    }, function(e, t, r) {
      e.exports = {
        default: r(166),
        __esModule: !0
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.AbstractWebRTC = void 0;
      var i = u(r(1)),
        n = u(r(5)),
        a = u(r(4)),
        o = u(r(3));
      r(334);
      var s = r(10),
        c = r(24),
        d = r(11);

      function u(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var l = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.imInfo = e.imInfo, r.targetUid = e.targetUid || r.imInfo.uid, r.adapterRef = e.adapterRef,
            r._init(), r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_resetOfferRelativeStatus",
          value: function() {
            this.sdpOffer = null, this.sdpAnswer = null, this.iceOffer = [], this.iceAnswer = [], this.offerCount =
              0
          }
        }, {
          key: "_reset",
          value: function() {
            this._resetOfferRelativeStatus(), this.isProgress = !1, this.iceCompleted = !1, this.rtcConnection =
              null, this.currStream = null, this.isNeedUpdataSdp = !1, this.imInfo = null, this.targetUid =
              null
          }
        }, {
          key: "_resetPeerTimeOut",
          value: function() {
            this._resetOfferRelativeStatus(), this.isProgress = !1, this.iceCompleted = !1, this.rtcConnection =
              null, this.isNeedUpdataSdp = !1
          }
        }, {
          key: "_init",
          value: function() {
            var e = this;
            if (this.rtcConnection) this.adapterRef.logger.log("AbstractWebRTC:_init 已存在rtcConnection");
            else {
              var t = {
                  iceServers: [{
                    urls: ["stun:turn.ideasip.com"]
                  }],
                  rtcpMuxPolicy: "require"
                },
                r = {
                  relayaddrs: null,
                  relaytoken: null,
                  uid: this.imInfo.uid,
                  cid: this.imInfo.cid
                };
              "WebRTC" === d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE] && this.imInfo.serverMap ?
                (r.relayaddrs = this.imInfo.serverMap.relayaddrs, r.relaytoken = this.imInfo.serverMap.relaytoken) :
                "NRTC" === d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE] && (r.relayaddrs = this
                  .imInfo.relayaddrs, r.relaytoken = this.imInfo.relaytoken), this.adapterRef.isPrivateDeployment &&
                this.adapterRef.privateDeploymentConf && this.adapterRef.privateDeploymentConf.turnServer ?
                (t.iceServers = [], t.iceServers.push({
                  urls: "turn:" + this.adapterRef.privateDeploymentConf.turnServer,
                  credential: "netease",
                  username: "netease"
                }), t.iceTransportPolicy = "relay") : r.relayaddrs && r.relayaddrs.length && r.relaytoken ?
                (r.relayaddrs = Array.from(new Set(r.relayaddrs)), t.iceServers = [], r.relayaddrs.forEach(
                  function(e) {
                    t.iceServers.push({
                      urls: "turn:" + e + "?transport=udp",
                      credential: r.uid + "/" + r.cid,
                      username: r.relaytoken
                    }), t.iceServers.push({
                      urls: "turn:" + e + "?transport=tcp",
                      credential: r.uid + "/" + r.cid,
                      username: r.relaytoken
                    })
                  }), t.iceTransportPolicy = "relay", this.timer = setTimeout(function() {
                  e.rtcConnection && e.emit("iceCandidateTimeOut", {
                    rtc: e,
                    state: e.rtcConnection.iceConnectionState
                  })
                }, 15e3)) : this.timer && (clearTimeout(this.timer), this.timer = null), this.adapterRef
                .logger.log("AbstractWebRTC:init create rtcConnection");
              var i = null;
              (i = /Firefox/gi.test(navigator.userAgent) ? this.rtcConnection = new RTCPeerConnection(t) :
                this.rtcConnection = new RTCPeerConnection(t, {
                  optional: [{
                    googIPv6: !1
                  }, {
                    googScreencastMinBitrate: 400
                  }, {
                    googPayloadPadding: !0
                  }, {
                    googHighStartBitrate: 100
                  }, {
                    googImprovedWifiBwe: !0
                  }, {
                    googDscp: !0
                  }, {
                    googSuspendBelowMinBitrate: !1
                  }, {
                    googCombinedAudioVideoBwe: !0
                  }, {
                    googCpuOveruseDetection: !1
                  }, {
                    googCpuOveruseEncodeUsage: !0
                  }, {
                    googCpuUnderuseThreshold: 75
                  }, {
                    googCpuOveruseThreshold: 85
                  }]
                })).uid = this.imInfo.uid, i.targetUid = this.targetUid, i.onicecandidate = this.onIceCandidate
                .bind(this), i.onnegotiationneeded = this.onNegotiationNeeded.bind(this), i.oniceconnectionstatechange =
                this.onIceStateChange.bind(this), /Firefox/gi.test(navigator.userAgent) ? i.ontrack =
                this.onAddRemoteTrack.bind(this) : i.onaddstream = this.onAddRemoteStream.bind(this), i
                .onremovestream = this.onRemoveRemoteStream.bind(this)
            }
          }
        }, {
          key: "onIceCandidate",
          value: function(e) {
            !e.candidate || this.rtcConnection.iceGatheringState && "complete" === this.rtcConnection.iceGatheringState ?
              this.adapterRef.logger.log("AbstractWebRTC:onIceCandidate 收集完成: ", e) : / tcp /gi.test(e.candidate
                .candidate) || /\.1 /gi.test(e.candidate.candidate) || / 2 UDP /gi.test(e.candidate.candidate) ||
              (this.adapterRef.logger.log(
                  "AbstractWebRTC:onIceCandidate targetUid: %s , gather candidate : %o", this.targetUid,
                  e.candidate.candidate), this.iceOffer.push(e.candidate), this.offerCount++, this.rtcConnection &&
                this.rtcConnection.signalingState && "stable" == this.rtcConnection.signalingState &&
                this.doSendIce())
          }
        }, {
          key: "onNegotiationNeeded",
          value: function(e) {
            this.emit("negotiaionNeeded", e)
          }
        }, {
          key: "onIceStateChange",
          value: function(e) {
            if (this.rtcConnection && this.adapterRef && this.adapterRef.webrtcGateWayBusiness) {
              var t = this.rtcConnection.iceConnectionState;
              this.adapterRef.logger.log("AbstractWebRTC:onIceStateChange: %s, %s", t, this.targetUid),
                "connected" !== t && "completed" !== t || (this.timer && (clearTimeout(this.timer),
                  this.timer = null), this.iceCompleted = !0, this.setProgress(!1)), "failed" === t &&
                (this.iceCompleted = !1), this.emit("iceStateChange", {
                  rtc: this,
                  state: this.rtcConnection.iceConnectionState
                })
            } else this.adapterRef.logger.warn("AbstractWebRTC:onIceStateChange 不存在的 rtcConnection")
          }
        }, {
          key: "onAddRemoteStream",
          value: function(e) {
            this.adapterRef.logger.log("AbstractWebRTC:onAddRemoteStream ", e), this.targetUid != this.imInfo
              .uid ? (this.adapterRef.logger.log(
                "AbstractWebRTC:onAddRemoteStream targetUid: %s, remote Stream: %o ", this.targetUid,
                e.stream.id), e.stream && "default" === e.stream.id ? this.adapterRef.logger.log(
                "AbstractWebRTC:onAddRemoteStream ID为default的流收到时不做任何事") : this.emit(
                "getRemoteStream", {
                  uid: this.targetUid,
                  stream: e.stream
                })) : this.adapterRef.logger.log("AbstractWebRTC:onAddRemoteStream 自己的远程流直接忽略")
          }
        }, {
          key: "onAddRemoteTrack",
          value: function(e) {
            if (this.targetUid != this.imInfo.uid) {
              var t = e.streams[0];
              t ? this.emit("getRemoteStream", {
                uid: this.targetUid,
                stream: t,
                track: e.track
              }) : this.adapterRef.logger.error("AbstractWebRTC:onAddRemoteTrack 未找到流")
            } else this.adapterRef.logger.log("AbstractWebRTC:onAddRemoteTrack 自己的远程流直接忽略")
          }
        }, {
          key: "onRemoveRemoteStream",
          value: function(e) {
            this.adapterRef.logger.log("AbstractWebRTC:onRemoveRemoteStream targetUid: %s, stream: %o ",
              this.targetUid, e.stream)
          }
        }, {
          key: "setProgress",
          value: function(e) {
            this.isProgress = e, !1 === e && "completed" === this.rtcConnection.iceConnectionState &&
              this.emit("ready")
          }
        }, {
          key: "getReceivers",
          value: function() {
            return this.rtcConnection.getReceivers()
          }
        }, {
          key: "getRemoteStreams",
          value: function() {
            return this.rtcConnection.getRemoteStreams()
          }
        }, {
          key: "getIceConnectionState",
          value: function() {
            if (this.rtcConnection) return this.rtcConnection.iceConnectionState
          }
        }, {
          key: "close",
          value: function() {
            this.adapterRef.logger.log("AbstractWebRTC:close targetUid: %s", this.targetUid);
            var e = this.rtcConnection;
            e && (e.onicecandidate = null, e.onnegotiationneeded = null, e.oniceconnectionstatechange =
              null, e.ontrack = null, e.onaddstream = null, e.onremovestream = null, e.close(), this.rtcConnection =
              null)
          }
        }, {
          key: "doSendIce",
          value: function() {
            if (this.sdpAnswer) {
              if (this.iceCompleted) return this.adapterRef.logger.log(
                "AbstractWebRTC:doSendIce ice已协商完成"), void(this.iceOffer.length = 0);
              if (0 !== this.iceOffer.length) {
                var e = this.iceOffer.shift();
                this.emit("iceCandidate", {
                  uid: this.targetUid,
                  ice: e
                }), this.doSendIce()
              } else this.adapterRef.logger.log("AbstractWebRTC:doSendIce iceOffer队列为空")
            } else this.adapterRef.logger.log("AbstractWebRTC:doSendIce 未协商完sdp，无法发送ice")
          }
        }, {
          key: "updateStream",
          value: function() {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            c.RtcUtil.updateMediaStream({
              peer: this.rtcConnection,
              currStream: this.currStream,
              streams: t
            }).then(function(t) {
              e.currStream || (e.currStream = t)
            })
          }
        }, {
          key: "getLocalSdp",
          value: function() {
            return this.rtcConnection.localDescription
          }
        }, {
          key: "getRemoteSdp",
          value: function() {
            return this.rtcConnection.remoteDescription
          }
        }, {
          key: "checkMediaStatus",
          value: function(e) {
            return c.RtcUtil.checkMediaStatus(e)
          }
        }, {
          key: "checkMeidaExistent",
          value: function(e) {
            return c.RtcUtil.checkMeidaExistent(e)
          }
        }, {
          key: "addRemoteIceCandidate",
          value: function(e) {
            var t = this;
            this.adapterRef.logger.log(
                "AbstractWebRTC:addRemoteIceCandidate targetUid:%s , ice candidate: %o ", this.targetUid,
                e), this.adapterRef.instance._isMobileSafari() || this.adapterRef.instance._isWeixinBrowser() ||
              this.rtcConnection.addIceCandidate(new RTCIceCandidate(e)).then(function() {
                t.iceAnswer.push(e), t.iceAnswer.length === t.offerCount && (t.iceAnswer = [], t.offerCount =
                  0)
              }).catch(function(e) {
                t.adapterRef.logger.error("AbstractWebRTC:addRemoteIceCandidate error:%o", e)
              })
          }
        }, {
          key: "createOffer",
          value: function() {
            var e = this;
            return this.setProgress(!0), c.RtcUtil.createOffer(this.rtcConnection).then(function(t) {
              return e.adapterRef.logger.log(
                  "********************** 创建 sdp offer **********************"), e.adapterRef.logger
                .log("AbstractWebRTC:createOffer"), e._resetOfferRelativeStatus(), t.sdp = c.SdpUtil
                .maybePreferVideoReceiveCodec(t.sdp, {
                  videoRecvCodec: "H264"
                }), e.currStream && e.adapterRef.logger.log(
                  "AbstractWebRTC:createOffer currentStream: %o", e.currStream.getTracks()), (t = c
                  .RtcUtil.formatSdp({
                    offerOrAnswer: t,
                    uid: e.imInfo.uid,
                    cid: e.imInfo.cid,
                    chromeScreenShareOpened: e.adapterRef.state.chromeScreenShareOpened,
                    stream: e.currStream,
                    highAudio: e.imInfo.sessionConfig.highAudio,
                    stero: e.imInfo.sessionConfig.stero,
                    targetUid: e.targetUid,
                    netDetect: e.imInfo.netDetect,
                    codec: e.imInfo.codec
                  })) ? Promise.resolve(t) : (e.adapterRef.imInfo && "p2p" === e.adapterRef.imInfo.sessionMode ?
                  (e.adapterRef.instance.hangup && e.adapterRef.instance.hangup(), e.adapterRef.instance
                    .emit(d.EVENT_OBJ.hangup.key, Object.assign(d.EVENT_CODE.USER_LEFT_REASON.timeout, {
                      channelId: e.imInfo.cid,
                      account: e.adapterRef.instance._getAccountByUid(e.imInfo.uid)
                    }))) : (e.adapterRef.instance.leaveChannel && e.adapterRef.instance.leaveChannel(),
                    e.adapterRef.instance.emit(d.EVENT_OBJ.leaveChannel.key, Object.assign(d.EVENT_CODE
                      .USER_LEFT_REASON.timeout, {
                        channelId: e.imInfo.cid,
                        account: e.adapterRef.instance._getAccountByUid(e.imInfo.uid)
                      }))), e.adapterRef.instance.emit(d.EVENT_OBJ.error.key, d.VideoErrorCode.VideoDecodeError),
                  Promise.reject("该机型浏览器不支持H264编码"))
            })
          }
        }, {
          key: "createAnswer",
          value: function(e) {
            var t = this;
            return this.setProgress(!0), this.rtcConnection.createAnswer().then(function(e) {
              return t.adapterRef.logger.log("AbstractWebRTC:createAnswer 原始sdp answer", e), e.sdp =
                c.SdpUtil.maybePreferVideoReceiveCodec(e.sdp, {
                  videoRecvCodec: "H264"
                }), e = c.RtcUtil.formatSdp({
                  offerOrAnswer: e,
                  uid: t.imInfo.uid,
                  cid: t.imInfo.cid,
                  chromeScreenShareOpened: t.adapterRef.state.chromeScreenShareOpened,
                  stream: t.currStream,
                  highAudio: t.imInfo.sessionConfig.highAudio,
                  stero: t.imInfo.sessionConfig.stero,
                  targetUid: t.targetUid,
                  netDetect: t.imInfo.netDetect
                })
            }).catch(function(e) {
              t.adapterRef.logger.error("AbstractWebRTC:createAnswer error: %o", e)
            })
          }
        }, {
          key: "setLocalDescription",
          value: function(e, t) {
            var r = this;
            return this.sdpOffer = e, this.adapterRef.logger.log(
              "AbstractWebRTC:setLocalDescription 设置到本地：\n", e.sdp), this.rtcConnection.setLocalDescription(
              e).then(function() {
              return r.adapterRef.logger.log("AbstractWebRTC: setLocalDescription 成功"), e.sdp = c.RtcUtil
                .setMediaBitrates({
                  sdp: e.sdp
                }), "answer" === e.type ? (r.sdpAnswer = e, r.iceCompleted && r.emit("iceCompleted"),
                  r.setProgress(!1)) : r.sdpAnswer = null, Promise.resolve(e)
            }).catch(function(e) {
              r.adapterRef.logger.error("AbstractWebRTC:setLocalDescription  , error: %o", e)
            })
          }
        }, {
          key: "setRemoteDescription",
          value: function(e, t) {
            var r = this;
            "offer" === e.type && (this.adapterRef.logger.log(
                "********************** 创建 sdp offer(remote) **********************"), this.adapterRef
              .logger.log("AbstractWebRTC:setRemoteDescription 对端 targetUid: %s, 原始SDP: %o", this.targetUid,
                e)), this.setProgress("offer" === e.type);
            var i = {
              sdp: e.sdp,
              type: e.type
            };
            if ("offer" === e.type && !this.sdpAnswer) return Promise.reject();
            i.sdp = c.SdpUtil.maybePreferVideoSendCodec(i.sdp, {
                videoRecvCodec: "H264"
              }), i.sdp = c.RtcUtil.formatSdpRemote(i.sdp, this.sdpOffer, this.adapterRef.state.chromeScreenShareOpened),
              (/Firefox/gi.test(navigator.userAgent) || this.adapterRef && this.adapterRef.isPrivateDeployment &&
                this.adapterRef.privateDeploymentConf.turnServer || this.imInfo.serverMap && this.imInfo
                .serverMap.relayaddrs && this.imInfo.serverMap.relayaddrs.length > 0 && this.imInfo.serverMap
                .relaytoken) && (i.sdp = i.sdp.replace(/\na=candidate:.+/g, "")), this.sdpAnswer =
              "answer" === e.type ? i : null;
            var n = this.rtcConnection;
            return this.adapterRef.logger.log("AbstractWebRTC:setRemoteDescription peer state: ", n.signalingState),
              n.signalingState && "have-local-offer" == n.signalingState ? n.setRemoteDescription(i).then(
                function() {
                  if (r.adapterRef.logger.log(
                      "AbstractWebRTC:setRemoteDescription #### setRemoteDescription 成功... type: ", e.type
                    ), "answer" === e.type) {
                    if (r.iceCompleted) return r.adapterRef.logger.log(
                        "AbstractWebRTC:setRemoteDescription ice已协商完成, targetUid:", n.targetUid),
                      void r.emit("iceCompleted", n.targetUid);
                    r.doSendIce()
                  }
                  return Promise.resolve()
                }).catch(function(e) {
                return r.adapterRef.logger.error(
                  "AbstractWebRTC:setRemoteDescription uid:%s, error: %o", n.uid, e), Promise.reject(
                  e)
              }) : Promise.resolve()
          }
        }, {
          key: "destroy",
          value: function() {
            this.adapterRef.logger.log("AbstractWebRTC:destroy"), this.close(), this._reset()
          }
        }]), t
      }(s.EventEmitter);
      t.AbstractWebRTC = l
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.AbstractBusiness = void 0;
      var i = o(r(1)),
        n = o(r(4)),
        a = o(r(3));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = function(e) {
        function t(e) {
          return (0, i.default)(this, t), (0, n.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(
            this))
        }
        return (0, a.default)(t, e), t
      }(r(10).EventEmitter);
      t.AbstractBusiness = s
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(157);
      Object.defineProperty(t, "WebRTCGateWay", {
        enumerable: !0,
        get: function() {
          return i.WebRTCGateWay
        }
      }), Object.defineProperty(t, "WebRTCGateWayContext", {
        enumerable: !0,
        get: function() {
          return i.WebRTCGateWayContext
        }
      }), Object.defineProperty(t, "WebRTCGateWayManager", {
        enumerable: !0,
        get: function() {
          return i.WebRTCGateWayManager
        }
      }), Object.defineProperty(t, "WebRTCGateWayProtocolHandler", {
        enumerable: !0,
        get: function() {
          return i.WebRTCGateWayProtocolHandler
        }
      });
      var n = r(349);
      Object.defineProperty(t, "MediaDeviceHelper", {
        enumerable: !0,
        get: function() {
          return n.MediaDeviceHelper
        }
      });
      var a = r(348);
      Object.defineProperty(t, "MediaRecordHelper", {
        enumerable: !0,
        get: function() {
          return a.MediaRecordHelper
        }
      });
      var o = r(347);
      Object.defineProperty(t, "AudioHelper", {
        enumerable: !0,
        get: function() {
          return o.AudioHelper
        }
      });
      var s = r(345);
      Object.defineProperty(t, "VideoHelper", {
        enumerable: !0,
        get: function() {
          return s.VideoHelper
        }
      });
      var c = r(343);
      Object.defineProperty(t, "ApiReportHelper", {
        enumerable: !0,
        get: function() {
          return c.ApiReportHelper
        }
      }), Object.defineProperty(t, "LogReportHelper", {
        enumerable: !0,
        get: function() {
          return c.LogReportHelper
        }
      }), Object.defineProperty(t, "StatsReportHelper", {
        enumerable: !0,
        get: function() {
          return c.StatsReportHelper
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebAudio = void 0;
      var i = r(107),
        n = r(11),
        a = i.RtcSupport.checkWebAudio();

      function o() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.stream,
          r = e.uid,
          i = e.isAnalyze,
          n = e.isRemote;
        this.support = a.WebAudio && a.MediaStream, this.gain = 1, this.stream = t, this.support && (this.audioIn = {},
          this.uid = r || 0, this.isAnalyze = i, this.isRemote = n || !1, this.instant = 0, this.slow = 0, this
          .clip = 0, this.resetMixConf(), this.init())
      }
      o.ac = a.WebAudio && a.MediaStream ? new window.AudioContext : {}, o.destination = o.ac.createMediaStreamDestination ?
        o.ac.createMediaStreamDestination() : {};
      var s = o.prototype;
      s.context = o.ac, s.init = function() {
        this.validateInput() && (this.isAnalyze && this.initMonitor(), this.formatStreams(), this.initWebAudio(),
          this.initAudioIn())
      }, s.validateInput = function() {
        return /(Array|MediaStream|LocalMediaStream)/.test(this.stream.constructor)
      }, s.initMonitor = function() {
        var e = this;
        (this.script = this.context.createScriptProcessor(0, 1, 1)).onaudioprocess = function(t) {
          var r, i = t.inputBuffer.getChannelData(0),
            n = 0,
            a = 0;
          for (r = 0; r < i.length; ++r) n += Math.abs(i[r]), Math.abs(i[r]) > .99 && (a += 1);
          e.instant = Math.sqrt(n / i.length), e.slow = .95 * e.slow + .05 * e.instant, e.clip = a / i.length;
          var o = t.inputBuffer;
          t.outputBuffer.copyToChannel(o.getChannelData(0), 0, 0)
        }
      }, s.initWebAudio = function() {
        var e = this.context;
        this.gainFilter = e.createGain(), this.destination = this.isRemote ? o.destination : e.createMediaStreamDestination(),
          this.gainFilter.gain.value = this.gain
      }, s.initAudioIn = function() {
        var e = this,
          t = this,
          r = this.stream,
          i = this.context,
          a = void 0;
        if (/(MediaStream|LocalMediaStream)/.test(r.constructor)) return o(r), void(this.outputStream = this.destination
          .stream);

        function o(e) {
          if (!/(MediaStream|LocalMediaStream)/.test(e.constructor)) return null;
          if (0 === e.getAudioTracks().length) return null;
          var r = i.createMediaStreamSource(e);
          return r.connect(t.gainFilter), t.mixAudioConf.state === n.AuidoMixingState.UNSTART && (t.script ? (t
              .gainFilter.connect(t.script), t.script.connect(t.destination)) : t.gainFilter.connect(t.destination)),
            r
        }
        r.constructor === Array && (r.forEach(function(t) {
            (a = o(t)) && (e.audioIn[t.id] = a)
          }), this.outputStream = this.destination.stream), console.log("WebAudio: addMs: 初始化音频 state: ", i.state),
          "running" !== i.state && i.resume().then(function() {
            console.log("WebAudio: addMs: 状态变更成功 state: ", i.state)
          }).catch(function(e) {
            console.log("WebAudio: addMs: 状态变更出错: ", e), i.resume()
          })
      }, s.formatStreams = function() {
        var e = this.stream,
          t = [];
        if (/(MediaStream|LocalMediaStream)/.test(e.constructor)) return e.getAudioTracks().map(function(e) {
          t.push(new MediaStream([e]))
        }), void(this.stream = t);
        e.constructor === Array && (e.map(function(e) {
          e.getAudioTracks().map(function(e) {
            t.push(new MediaStream([e]))
          })
        }), this.stream = t)
      }, s.addStream = function(e) {
        var t = this.context;
        if (0 !== e.getAudioTracks().length) {
          var r = t.createMediaStreamSource(e);
          this.isAnalyze && this.script && r.connect(this.script), r.connect(this.gainFilter), this.audioIn[e.id] =
            r, this.outputStream = this.destination.stream
        }
      }, s.updateStream = function(e) {
        if (this.audioIn)
          for (var t in this.audioIn) this.audioIn[t] && this.audioIn[t].disconnect(0), this.audioIn[t] = null;
        this.audioIn = {}, this.stream = e, this.initAudioIn()
      }, s.setGain = function(e) {
        this.support && (this.gainFilter.gain.value = e, this.gain = e)
      }, s.getGain = function() {
        return this.gain
      }, s.resetMixConf = function() {
        this.mixAudioConf && this.mixAudioConf.replace && (console.log("伴音停止了，恢复mic"), this.script ? (this.gainFilter
            .connect(this.script), this.script.connect(this.destination)) : this.gainFilter.connect(this.destination)),
          this.mixAudioConf = {
            state: n.AuidoMixingState.UNSTART,
            audioSource: null,
            gainFilter: null,
            replace: !1,
            cycle: 0,
            pauseTime: 0,
            startTime: 0,
            totalTime: 0,
            volume: 1,
            playStartTime: 0,
            setPlayStartTime: 0,
            auidoMixingEnd: null
          }
      }, s.startMix = function(e) {
        var t = this;
        console.log("开始混音: ", JSON.stringify(e, null, " ")), this.mixAudioConf.audioSource = this.context.createBufferSource(),
          this.mixAudioConf.gainFilter = this.context.createGain(), this.mixAudioConf.audioSource.buffer = e.buffer,
          this.mixAudioConf.replace = e.replace, this.mixAudioConf.cycle = e.cycle, this.mixAudioConf.playStartTime =
          e.playStartTime, this.mixAudioConf.auidoMixingEnd = e.auidoMixingEnd, this.mixAudioConf.audioSource.connect(
            this.mixAudioConf.gainFilter), this.mixAudioConf.gainFilter.connect(this.destination), e.replace &&
          (this.script ? this.script.disconnect(0) : this.gainFilter.disconnect(0));
        if (this.mixAudioConf.audioSource.onended = function(e) {
            t.audioEnd(e)
          }, this.mixAudioConf.totalTime = e.buffer.duration, (this.mixAudioConf.playStartTime < 0 || this.mixAudioConf
            .playStartTime >= this.mixAudioConf.totalTime) && (this.mixAudioConf.playStartTime = 0), console.log(
            "设置音量: ", this.mixAudioConf), this.mixAudioConf.gainFilter.gain.value = this.mixAudioConf.volume, e
          .loopback && e.cycle > 1) {
          this.mixAudioConf.audioSource.loop = e.loopback;
          var r = e.cycle * this.mixAudioConf.totalTime - this.mixAudioConf.playStartTime;
          console.log("循环播放: options.playStartTime: ", this.mixAudioConf.playStartTime), console.log(
              "循环播放: totalTime: ", r), console.log("audioSource: ", this.mixAudioConf.audioSource), this.mixAudioConf
            .audioSource.start(0, this.mixAudioConf.playStartTime, r - 1)
        } else e.loopback && 1 == e.cycle ? (this.mixAudioConf.audioSource.loop = !1, this.mixAudioConf.audioSource
          .start(0, this.mixAudioConf.playStartTime)) : (this.mixAudioConf.audioSource.loop = e.loopback,
          this.mixAudioConf.audioSource.start(0, this.mixAudioConf.playStartTime));
        return this.mixAudioConf.state = n.AuidoMixingState.STARTING, this.mixAudioConf.startTime = Date.now(),
          Promise.resolve()
      }, s.pauseAudioMixing = function(e) {
        console.log("暂停混音"), this.mixAudioConf.audioSource.disconnect(0), this.mixAudioConf.gainFilter.disconnect(
            0), this.mixAudioConf.audioSource.stop(), this.mixAudioConf.pauseTime = Date.now(), this.mixAudioConf
          .state = n.AuidoMixingState.PAUSED;
        var t = (this.mixAudioConf.pauseTime - this.mixAudioConf.startTime) / 1e3 + this.mixAudioConf.playStartTime;
        return console.log("已经播放的时间: ", t), t > this.mixAudioConf.totalTime && (t %= this.mixAudioConf.totalTime),
          console.log("暂停位置:", t), Promise.resolve()
      }, s.resumeAudioMixing = function(e) {
        return console.log("恢复混音"), this.mixAudioConf.pauseTime = 0, this.startMix(e)
      }, s.stopAudioMixing = function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        return console.log("停止混音, isFinished: ", e), this.mixAudioConf.audioSource.disconnect(0), this.mixAudioConf
          .gainFilter.disconnect(0), this.mixAudioConf.audioSource.stop(), this.mixAudioConf.state = n.AuidoMixingState
          .STOPED, e && this.resetMixConf(), Promise.resolve()
      }, s.audioEnd = function(e) {
        this.mixAudioConf.state === n.AuidoMixingState.STARTING && (console.log("伴音播放完成: ", this.mixAudioConf),
          this.mixAudioConf.audioSource.audioEnd = null, this.mixAudioConf.auidoMixingEnd && (this.mixAudioConf
            .auidoMixingEnd(e), this.mixAudioConf.auidoMixingEnd = null), this.resetMixConf())
      }, s.setAudioMixingVolume = function(e) {
        return this.mixAudioConf.gainFilter.gain.value = e / 255, this.mixAudioConf.volume = this.mixAudioConf.gainFilter
          .gain.value, Promise.resolve()
      }, s.setAudioMixingPlayTime = function(e) {
        return this.mixAudioConf.state === n.AuidoMixingState.STARTING && (this.mixAudioConf.setPlayStartTime =
          e.playStartTime), this.startMix(e)
      }, s.getAudioMixingPlayedTime = function() {
        var e = Date.now();
        this.mixAudioConf.state == n.AuidoMixingState.PAUSED && this.mixAudioConf.pauseTime && (console.log(
          "当前是暂停状态"), e = this.mixAudioConf.pauseTime);
        var t = (e - this.mixAudioConf.startTime) / 1e3 + this.mixAudioConf.playStartTime;
        return t > this.mixAudioConf.totalTime && (t %= this.mixAudioConf.totalTime), {
          playedTime: t
        }
      }, s.getAudioMixingTotalTime = function() {
        return {
          totalTime: this.mixAudioConf.totalTime
        }
      }, s.off = function() {
        return this.setGain(0)
      }, s.on = function() {
        this.setGain(1)
      }, s.destroy = function() {
        if (this.instant = 0, this.slow = 0, this.clip = 0, this.gainFilter && this.gainFilter.disconnect(0),
          this.script && this.script.disconnect(0), this.audioIn)
          for (var e in this.audioIn) this.audioIn[e] && this.audioIn[e].disconnect(0);
        this.audioIn = {};
        var t = this.stream;

        function r(e) {
          e && e.getTracks().forEach(function(t) {
            e.removeTrack(t)
          })
        }
        /(MediaStream|LocalMediaStream)/.test(t.constructor) && r(t), t.constructor === Array && t.forEach(
          function(e) {
            r(e)
          }), this.stream = null, this.outputStream = null
      }, s.getVolumeData = function() {
        return this.instant.toFixed(2)
      }, t.WebAudio = o
    }, , , , , function(e, t, r) {
      var i = r(6)("iterator"),
        n = !1;
      try {
        var a = [7][i]();
        a.return = function() {
          n = !0
        }, Array.from(a, function() {
          throw 2
        })
      } catch (e) {}
      e.exports = function(e, t) {
        if (!t && !n) return !1;
        var r = !1;
        try {
          var a = [7],
            o = a[i]();
          o.next = function() {
            return {
              done: r = !0
            }
          }, a[i] = function() {
            return o
          }, e(a)
        } catch (e) {}
        return r
      }
    }, function(e, t, r) {
      var i = r(23),
        n = r(6)("iterator"),
        a = Array.prototype;
      e.exports = function(e) {
        return void 0 !== e && (i.Array === e || a[n] === e)
      }
    }, function(e, t, r) {
      var i = r(16);
      e.exports = function(e, t, r, n) {
        try {
          return n ? t(i(r)[0], r[1]) : t(r)
        } catch (t) {
          var a = e.return;
          throw void 0 !== a && i(a.call(e)), t
        }
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(2),
        n = i.chunkSize,
        a = (r(0), r(49));
      e.exports = function(e, t, r) {
        var o = {
          file: e.data[t],
          fileSize: e.data[t].size,
          fileUoloadedSize: 0,
          percentage: 0
        };

        function s(t) {
          var r = o.fileUoloadedSize + t.loaded,
            i = Math.floor(1e4 * r / o.fileSize) / 100;
          if (parseInt(i) >= 100 && (i = 100, s = function() {}), o.percentage !== i) {
            o.percentage = i;
            var n = {
              docId: e.docId,
              total: o.fileSize,
              loaded: r,
              percentage: i,
              percentageText: i + "%"
            };
            e.fileInput && (n.fileInput = e.fileInput), e.uploadprogress(n)
          }
        }

        function c(t) {
          try {
            t = JSON.parse(t)
          } catch (e) {
            return void r.onError(e)
          }
          if (t.errMsg || t.errCode) r.onError(t);
          else if (t.offset < o.fileSize) delete u.onaftersend, o.fileUoloadedSize = t.offset, r.sn = function(
            e, t, r, i, o) {
            var u = t.offset,
              l = t.offset + n;
            return r.data = o.file.slice(u, l), r.query.offset = t.offset, r.query.complete = l >= o.fileSize,
              r.query.context = t.context, r.onuploading = s, r.onload = c, r.onerror = d, a(e, r)
          }(e.url, t, u, 0, o);
          else {
            var l = function(e) {
                r.onError(e)
              },
              p = i.genFileUrl(e.nosToken);
            "image" === e.type ? a(p + "?imageInfo", {
              onload: function(r) {
                try {
                  r = JSON.parse(r), e.uploaddone(null, {
                    docId: t.docId,
                    w: r.Width,
                    h: r.Height,
                    orientation: r.Orientation || "",
                    type: r.Type,
                    size: r.Size || o.fileSize
                  })
                } catch (e) {
                  l(e)
                }
              },
              onerror: l
            }) : "video" === e.type || "audio" === e.type ? a(p + "?vinfo", {
              onload: function(r) {
                try {
                  (r = JSON.parse(r)).GetVideoInfo && r.GetVideoInfo.VideoInfo && (r = r.GetVideoInfo.VideoInfo),
                    e.uploaddone(null, {
                      docId: t.docId,
                      w: r.Width,
                      h: r.Height,
                      dur: r.Duration,
                      orientation: r.Rotate,
                      audioCodec: r.AudioCodec,
                      videoCodec: r.VideoCodec,
                      container: r.Container,
                      size: r.Size || o.fileSize
                    })
                } catch (e) {
                  l(e)
                }
              },
              onerror: l
            }) : e.uploaddone(null, {
              docId: t.docId,
              size: o.fileSize
            })
          }
        }

        function d(e) {
          try {
            if (e.result) var t = JSON.parse(e.result);
            else t = e;
            r.onError(t)
          } catch (e) {
            r.onError(e)
          }
        }
        var u = {
          query: {
            offset: 0,
            complete: n >= o.fileSize,
            version: "1.0"
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-nos-token": e.nosToken.token
          },
          method: "POST",
          timeout: 0,
          onaftersend: function() {
            e.beginupload(r)
          },
          onuploading: s,
          onload: c,
          onerror: d
        };
        return u.data = o.file.slice(0, n), a(e.url, u)
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(49);
      e.exports = function(e, t) {
        return t.method = "POST", t.headers = t.headers || {}, t.headers["Content-Type"] =
          "multipart/form-data", t.timeout = 0, t.type = t.type || "json", i(e, t)
      }
    }, function(e, t, r) {
      "use strict";
      var i, n, a = r(12),
        o = r(49),
        s = (i = /json/i, n = /post/i, function(e, t) {
          var r = (t = t || {}).data = t.data || {},
            s = t.headers = t.headers || {},
            c = a.checkWithDefault(s, "Accept", "application/json"),
            d = a.checkWithDefault(s, "Content-Type", "application/json");
          return i.test(c) && (t.type = "json"), n.test(t.method) && i.test(d) && (t.data = JSON.stringify(r)),
            o(e, t)
        });
      e.exports = s
    }, function(e, t, r) {
      "use strict";
      var i = r(12),
        n = r(81),
        a = r(66),
        o = {};

      function s(e) {
        this.init(), a.call(this, e)
      }
      var c = a.prototype,
        d = s.prototype = Object.create(c);
      d.init = function() {
        var e = "NEJ-AJAX-DATA:",
          t = !1;

        function r(t) {
          var r = t.data;
          if (0 === r.indexOf(e)) {
            var i = (r = JSON.parse(r.replace(e, ""))).key,
              n = o[i];
            n && (delete o[i], r.result = decodeURIComponent(r.result || ""), n.onLoad(r))
          }
        }
        return function() {
          ! function() {
            if (!t) {
              t = !0;
              var e = i.getGlobal();
              e.postMessage ? i.on(e, "message", r) : n.addMsgListener(r)
            }
          }()
        }
      }(), d.doSend = function() {
        var e = this.options,
          t = i.url2origin(e.url),
          r = e.proxyUrl || t + "/res/nej_proxy_frame.html",
          a = o[r];
        if (i.isArray(a)) a.push(this.doSend.bind(this, e));
        else {
          if (!a) return o[r] = [this.doSend.bind(this, e)], void i.createIframe({
            src: r,
            onload: function(e) {
              var t = o[r];
              o[r] = i.target(e).contentWindow, t.forEach(function(e) {
                try {
                  e()
                } catch (e) {
                  console.log("error:", e)
                }
              })
            }
          });
          if (!this.aborted) {
            var s = this.key = i.uniqueID();
            o[s] = this;
            var c = i.fetch({
              method: "GET",
              url: "",
              data: null,
              headers: {},
              timeout: 0
            }, e);
            c.key = s, n.postMessage(a, {
              data: c
            }), this.afterSend()
          }
        }
      }, d.abort = function() {
        this.aborted = !0, delete o[this.key], c.abort.call(this)
      }, e.exports = s
    }, function(e, t, r) {
      "use strict";
      var i = r(12),
        n = r(66),
        a = r(81),
        o = "NEJ-UPLOAD-RESULT:",
        s = {};

      function c(e) {
        this.init(), n.call(this, e)
      }
      var d = n.prototype,
        u = c.prototype = Object.create(d);
      u.init = function() {
        var e = !1;

        function t(e) {
          var t = e.data;
          if (0 === t.indexOf(o)) {
            var r = (t = JSON.parse(t.replace(o, ""))).key,
              i = s[r];
            i && (delete s[r], t.result = decodeURIComponent(t.result || ""), i.onLoad(t.result))
          }
        }
        return function() {
          ! function() {
            if (!e) {
              e = !0;
              var r = i.getGlobal();
              r.postMessage ? i.on(r, "message", t) : (a.addMsgListener(t), a.startTimer())
            }
          }()
        }
      }(), u.doSend = function() {
        var e = this,
          t = e.options,
          r = e.key = "zoro-ajax-upload-iframe-" + i.uniqueID();
        s[r] = e;
        var n = e.form = i.html2node('<form style="display:none;"></form>');
        document.body.appendChild(n), n.target = r, n.method = "POST", n.enctype = "multipart/form-data", n.encoding =
          "multipart/form-data";
        var a = t.url,
          o = i.genUrlSep(a);
        n.action = a + o + "_proxy_=form";
        var c = t.data,
          d = [],
          u = [];

        function l() {
          d.forEach(function(e, t) {
            var r = u[t];
            r.parentNode && (e.name = r.name, i.isFunction(e.setAttribute) && e.setAttribute("form", r.getAttribute(
              "form")), r.parentNode.replaceChild(e, r))
          })
        }
        c && i.getKeys(c, t.putFileAtEnd).forEach(function(e) {
          var t = c[e];
          if (t.tagName && "INPUT" === t.tagName.toUpperCase()) {
            if ("file" === t.type) {
              var r = t,
                a = r.cloneNode(!0);
              r.parentNode.insertBefore(a, r);
              var o = i.dataset(r, "name");
              o && (r.name = o), n.appendChild(r), i.isFunction(r.setAttribute) && (r.setAttribute("form",
                ""), r.removeAttribute("form")), d.push(t), u.push(a)
            }
          } else {
            var s = i.html2node('<input type="hidden"/>');
            s.name = e, s.value = t, n.appendChild(s)
          }
        });
        var p = e.iframe = i.createIframe({
          name: r,
          onload: function() {
            e.aborted ? l() : (i.on(p, "load", e.checkResult.bind(e)), n.submit(), l(), e.afterSend())
          }
        })
      }, u.checkResult = function() {
        var e, t;
        try {
          if ((t = ((e = this.iframe.contentWindow.document.body).innerText || e.textContent || "").trim()).indexOf(
              o) >= 0 || e.innerHTML.indexOf(o) >= 0) return
        } catch (e) {
          return void console.log("error:", "ignore error if not same domain,", e)
        }
        this.onLoad(t)
      }, u.onLoad = function(e) {
        d.onLoad.call(this, {
          status: 200,
          result: e
        }), i.remove(this.form), i.remove(this.iframe), d.destroy.call(this)
      }, u.destroy = function() {
        i.remove(this.iframe), i.remove(this.form)
      }, u.abort = function() {
        this.aborted = !0, delete s[this.key], d.abort.call(this)
      }, e.exports = c
    }, function(e, t, r) {
      var i;
      /*!
       * EventEmitter v5.2.4 - git.io/ee
       * Unlicense - http://unlicense.org/
       * Oliver Caldwell - http://oli.me.uk/
       * @preserve
       */
      ! function(t) {
        "use strict";

        function n() {}
        var a = n.prototype,
          o = t.EventEmitter;

        function s(e, t) {
          for (var r = e.length; r--;)
            if (e[r].listener === t) return r;
          return -1
        }

        function c(e) {
          return function() {
            return this[e].apply(this, arguments)
          }
        }
        a.getListeners = function(e) {
          var t, r, i = this._getEvents();
          if (e instanceof RegExp)
            for (r in t = {}, i) i.hasOwnProperty(r) && e.test(r) && (t[r] = i[r]);
          else t = i[e] || (i[e] = []);
          return t
        }, a.flattenListeners = function(e) {
          var t, r = [];
          for (t = 0; t < e.length; t += 1) r.push(e[t].listener);
          return r
        }, a.getListenersAsObject = function(e) {
          var t, r = this.getListeners(e);
          return r instanceof Array && ((t = {})[e] = r), t || r
        }, a.addListener = function(e, t) {
          if (! function e(t) {
              return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener)
            }(t)) throw new TypeError("listener must be a function");
          var r, i = this.getListenersAsObject(e),
            n = "object" == typeof t;
          for (r in i) i.hasOwnProperty(r) && -1 === s(i[r], t) && i[r].push(n ? t : {
            listener: t,
            once: !1
          });
          return this
        }, a.on = c("addListener"), a.addOnceListener = function(e, t) {
          return this.addListener(e, {
            listener: t,
            once: !0
          })
        }, a.once = c("addOnceListener"), a.defineEvent = function(e) {
          return this.getListeners(e), this
        }, a.defineEvents = function(e) {
          for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
          return this
        }, a.removeListener = function(e, t) {
          var r, i, n = this.getListenersAsObject(e);
          for (i in n) n.hasOwnProperty(i) && -1 !== (r = s(n[i], t)) && n[i].splice(r, 1);
          return this
        }, a.off = c("removeListener"), a.addListeners = function(e, t) {
          return this.manipulateListeners(!1, e, t)
        }, a.removeListeners = function(e, t) {
          return this.manipulateListeners(!0, e, t)
        }, a.manipulateListeners = function(e, t, r) {
          var i, n, a = e ? this.removeListener : this.addListener,
            o = e ? this.removeListeners : this.addListeners;
          if ("object" != typeof t || t instanceof RegExp)
            for (i = r.length; i--;) a.call(this, t, r[i]);
          else
            for (i in t) t.hasOwnProperty(i) && (n = t[i]) && ("function" == typeof n ? a.call(this, i, n) : o.call(
              this, i, n));
          return this
        }, a.removeEvent = function(e) {
          var t, r = typeof e,
            i = this._getEvents();
          if ("string" === r) delete i[e];
          else if (e instanceof RegExp)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
          else delete this._events;
          return this
        }, a.removeAllListeners = c("removeEvent"), a.emitEvent = function(e, t) {
          var r, i, n, a, o = this.getListenersAsObject(e);
          for (a in o)
            if (o.hasOwnProperty(a))
              for (r = o[a].slice(0), n = 0; n < r.length; n++) !0 === (i = r[n]).once && this.removeListener(e,
                i.listener), i.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(
                e, i.listener);
          return this
        }, a.trigger = c("emitEvent"), a.emit = function(e) {
          var t = Array.prototype.slice.call(arguments, 1);
          return this.emitEvent(e, t)
        }, a.setOnceReturnValue = function(e) {
          return this._onceReturnValue = e, this
        }, a._getOnceReturnValue = function() {
          return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, a._getEvents = function() {
          return this._events || (this._events = {})
        }, n.noConflict = function() {
          return t.EventEmitter = o, n
        }, void 0 === (i = function() {
          return n
        }.call(t, r, t, e)) || (e.exports = i)
      }(this || {})
    }, function(e, t, r) {
      "use strict";
      var i = r(12),
        n = r(66);

      function a(e) {
        e.onuploading && this.on("uploading", e.onuploading), n.call(this, e)
      }
      var o = n.prototype,
        s = a.prototype = Object.create(o);
      s.doSend = function() {
        var e = this.options,
          t = e.headers,
          r = this.xhr = new XMLHttpRequest;
        if ("multipart/form-data" === t["Content-Type"]) {
          delete t["Content-Type"], r.upload.onprogress = this.onProgress.bind(this), r.upload.onload = this.onProgress
            .bind(this);
          var n = e.data;
          e.data = new window.FormData, n && i.getKeys(n, e.putFileAtEnd).forEach(function(t) {
            var r = n[t];
            r.tagName && "INPUT" === r.tagName.toUpperCase() ? "file" === r.type && [].forEach.call(r.files,
              function(t) {
                e.data.append(i.dataset(r, "name") || r.name || t.name || "file-" + i.uniqueID(), t)
              }) : e.data.append(t, r)
          })
        } else t["x-nos-token"] && (r.upload.onprogress = this.onProgress.bind(this), r.upload.onload = this.onProgress
          .bind(this));
        r.onreadystatechange = this.onStateChange.bind(this), 0 !== e.timeout && (this.timer = setTimeout(this.onTimeout
          .bind(this), e.timeout)), r.open(e.method, e.url, !e.sync), Object.keys(t).forEach(function(e) {
          r.setRequestHeader(e, t[e])
        }), e.cookie && "withCredentials" in r && (r.withCredentials = !0), r.send(e.data), this.afterSend()
      }, s.onProgress = function(e) {
        e.lengthComputable && e.loaded <= e.total && this.emit("uploading", e)
      }, s.onStateChange = function() {
        var e = this.xhr;
        4 === e.readyState && this.onLoad({
          status: e.status,
          result: e.responseText || ""
        })
      }, s.getResponseHeader = function(e) {
        var t = this.xhr;
        return t ? t.getResponseHeader(e) : ""
      }, s.destroy = function() {
        clearTimeout(this.timer);
        try {
          this.xhr.onreadystatechange = i.f, this.xhr.abort()
        } catch (e) {
          console.log("error:", "ignore error ajax destroy,", e)
        }
        o.destroy.call(this)
      }, e.exports = a
    }, , function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTCOption = t.NRTCOption = t.NetcallOption = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.NetcallOption = function e(t) {
        (0, a.default)(this, e);
        var r = t.kickLast,
          i = t.nim,
          n = t.container,
          o = t.remoteContainer,
          s = t.mirror,
          c = t.mirrorRemote;
        this.kickLast = r, this.nim = i, this.container = n, this.remoteContainer = o, this.mirror = s, this.mirrorRemote =
          c
      }, t.NRTCOption = function e(t) {
        (0, a.default)(this, e);
        var r = t.chromeId,
          i = t.debug;
        this.chromeId = r, this.debug = i
      }, t.WebRTCOption = function e(t) {
        (0, a.default)(this, e);
        var r = t.nim,
          i = t.container,
          n = t.remoteContainer,
          o = t.chromeId,
          s = t.debug;
        this.nim = r, this.container = i, this.remoteContainer = n, this.chromeId = o, this.debug = s
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.SessionConfig4P2P = t.SessionConfig4Meeting = t.SessionConfig4Live = t.SessionConfig = void 0;
      var i = o(r(4)),
        n = o(r(3)),
        a = o(r(1));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = t.SessionConfig = function e(t) {
        (0, a.default)(this, e);
        var r = t.maxVideoQuality,
          i = t.videoQuality,
          n = t.videoFrameRate,
          o = t.videoBitrate,
          s = t.videoEncodeMode,
          c = t.highAudio,
          d = t.recordVideo,
          u = t.recordAudio,
          l = t.isHostSpeaker,
          p = t.recordType,
          f = t.rtmpUrl,
          h = t.splitMode,
          m = t.layout,
          v = t.liveEnable;
        this.maxVideoQuality = r, this.videoQuality = i, this.videoFrameRate = n, this.videoBitrate = o, this.videoEncodeMode =
          s, this.highAudio = c, this.liveEnable = v, void 0 !== d && (this.recordVideo = d), void 0 !== u && (
            this.recordAudio = u), void 0 !== l && (this.isHostSpeaker = l), void 0 !== p && (this.recordType =
            p), void 0 !== f && (this.rtmpUrl = f), void 0 !== h && (this.splitMode = h), void 0 !== m && (this
            .layout = m)
      };
      t.SessionConfig4Live = function(e) {
        function t() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (0, a.default)(this, t), delete e.recordVideo, delete e.recordAudio, delete e.isHostSpeaker,
            delete e.recordType, (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
        }
        return (0, n.default)(t, e), t
      }(s), t.SessionConfig4Meeting = function(e) {
        function t(e) {
          return (0, a.default)(this, t), delete e.recordVideo, delete e.recordAudio, delete e.isHostSpeaker,
            delete e.recordType, delete e.rtmpUrl, delete e.splitMode, delete e.layout, (0, i.default)(this, (t
              .__proto__ || Object.getPrototypeOf(t)).call(this, e))
        }
        return (0, n.default)(t, e), t
      }(s), t.SessionConfig4P2P = function(e) {
        function t(e) {
          return (0, a.default)(this, t), delete e.rtmpUrl, delete e.splitMode, delete e.layout, (0, i.default)
            (this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
        }
        return (0, n.default)(t, e), t
      }(s)
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(227);
      Object.defineProperty(t, "PushConfig", {
        enumerable: !0,
        get: function() {
          return i.PushConfig
        }
      });
      var n = r(142);
      Object.defineProperty(t, "SessionConfig", {
        enumerable: !0,
        get: function() {
          return n.SessionConfig
        }
      });
      var a = r(226);
      Object.defineProperty(t, "DEFAULT_SESSION_CONFIG", {
        enumerable: !0,
        get: function() {
          return a.DEFAULT_SESSION_CONFIG
        }
      });
      var o = r(211);
      Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
        enumerable: !0,
        get: function() {
          return o.DEFAULT_PUSH_CONFIG
        }
      })
    }, function(e, t) {
      var r = e.exports = {
        v: [{
          name: "version",
          reg: /^(\d*)$/
        }],
        o: [{
          name: "origin",
          reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
          names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
          format: "%s %s %d %s IP%d %s"
        }],
        s: [{
          name: "name"
        }],
        i: [{
          name: "description"
        }],
        u: [{
          name: "uri"
        }],
        e: [{
          name: "email"
        }],
        p: [{
          name: "phone"
        }],
        z: [{
          name: "timezones"
        }],
        r: [{
          name: "repeats"
        }],
        t: [{
          name: "timing",
          reg: /^(\d*) (\d*)/,
          names: ["start", "stop"],
          format: "%d %d"
        }],
        c: [{
          name: "connection",
          reg: /^IN IP(\d) (\S*)/,
          names: ["version", "ip"],
          format: "IN IP%d %s"
        }],
        b: [{
          push: "bandwidth",
          reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
          names: ["type", "limit"],
          format: "%s:%s"
        }],
        m: [{
          reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
          names: ["type", "port", "protocol", "payloads"],
          format: "%s %d %s %s"
        }],
        a: [{
          push: "rtp",
          reg: /^rtpmap:(\d*) ([\w\-\.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
          names: ["payload", "codec", "rate", "encoding"],
          format: function(e) {
            return e.encoding ? "rtpmap:%d %s/%s/%s" : e.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s"
          }
        }, {
          push: "fmtp",
          reg: /^fmtp:(\d*) ([\S| ]*)/,
          names: ["payload", "config"],
          format: "fmtp:%d %s"
        }, {
          name: "control",
          reg: /^control:(.*)/,
          format: "control:%s"
        }, {
          name: "rtcp",
          reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
          names: ["port", "netType", "ipVer", "address"],
          format: function(e) {
            return null != e.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d"
          }
        }, {
          push: "rtcpFbTrrInt",
          reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
          names: ["payload", "value"],
          format: "rtcp-fb:%d trr-int %d"
        }, {
          push: "rtcpFb",
          reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
          names: ["payload", "type", "subtype"],
          format: function(e) {
            return null != e.subtype ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s"
          }
        }, {
          push: "ext",
          reg: /^extmap:(\d+)(?:\/(\w+))? (\S*)(?: (\S*))?/,
          names: ["value", "direction", "uri", "config"],
          format: function(e) {
            return "extmap:%d" + (e.direction ? "/%s" : "%v") + " %s" + (e.config ? " %s" : "")
          }
        }, {
          push: "crypto",
          reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
          names: ["id", "suite", "config", "sessionConfig"],
          format: function(e) {
            return null != e.sessionConfig ? "crypto:%d %s %s %s" : "crypto:%d %s %s"
          }
        }, {
          name: "setup",
          reg: /^setup:(\w*)/,
          format: "setup:%s"
        }, {
          name: "mid",
          reg: /^mid:([^\s]*)/,
          format: "mid:%s"
        }, {
          name: "msid",
          reg: /^msid:(.*)/,
          format: "msid:%s"
        }, {
          name: "ptime",
          reg: /^ptime:(\d*)/,
          format: "ptime:%d"
        }, {
          name: "maxptime",
          reg: /^maxptime:(\d*)/,
          format: "maxptime:%d"
        }, {
          name: "direction",
          reg: /^(sendrecv|recvonly|sendonly|inactive)/
        }, {
          name: "icelite",
          reg: /^(ice-lite)/
        }, {
          name: "iceUfrag",
          reg: /^ice-ufrag:(\S*)/,
          format: "ice-ufrag:%s"
        }, {
          name: "icePwd",
          reg: /^ice-pwd:(\S*)/,
          format: "ice-pwd:%s"
        }, {
          name: "fingerprint",
          reg: /^fingerprint:(\S*) (\S*)/,
          names: ["type", "hash"],
          format: "fingerprint:%s %s"
        }, {
          push: "candidates",
          reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
          names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr",
            "rport", "tcptype", "generation", "network-id", "network-cost"
          ],
          format: function(e) {
            var t = "candidate:%s %d %s %d %s %d typ %s";
            return t += null != e.raddr ? " raddr %s rport %d" : "%v%v", t += null != e.tcptype ?
              " tcptype %s" : "%v", null != e.generation && (t += " generation %d"), t += null != e[
                "network-id"] ? " network-id %d" : "%v", t += null != e["network-cost"] ?
              " network-cost %d" : "%v"
          }
        }, {
          name: "endOfCandidates",
          reg: /^(end-of-candidates)/
        }, {
          name: "remoteCandidates",
          reg: /^remote-candidates:(.*)/,
          format: "remote-candidates:%s"
        }, {
          name: "iceOptions",
          reg: /^ice-options:(\S*)/,
          format: "ice-options:%s"
        }, {
          push: "ssrcs",
          reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
          names: ["id", "attribute", "value"],
          format: function(e) {
            var t = "ssrc:%d";
            return null != e.attribute && (t += " %s", null != e.value && (t += ":%s")), t
          }
        }, {
          push: "ssrcGroups",
          reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
          names: ["semantics", "ssrcs"],
          format: "ssrc-group:%s %s"
        }, {
          name: "msidSemantic",
          reg: /^msid-semantic:\s?(\w*) (\S*)/,
          names: ["semantic", "token"],
          format: "msid-semantic: %s %s"
        }, {
          push: "groups",
          reg: /^group:(\w*) (.*)/,
          names: ["type", "mids"],
          format: "group:%s %s"
        }, {
          name: "rtcpMux",
          reg: /^(rtcp-mux)/
        }, {
          name: "rtcpRsize",
          reg: /^(rtcp-rsize)/
        }, {
          name: "sctpmap",
          reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
          names: ["sctpmapNumber", "app", "maxMessageSize"],
          format: function(e) {
            return null != e.maxMessageSize ? "sctpmap:%s %s %s" : "sctpmap:%s %s"
          }
        }, {
          name: "xGoogleFlag",
          reg: /^x-google-flag:([^\s]*)/,
          format: "x-google-flag:%s"
        }, {
          push: "rids",
          reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
          names: ["id", "direction", "params"],
          format: function(e) {
            return e.params ? "rid:%s %s %s" : "rid:%s %s"
          }
        }, {
          push: "imageattrs",
          reg: new RegExp(
            "^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
          ),
          names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
          format: function(e) {
            return "imageattr:%s %s %s" + (e.dir2 ? " %s %s" : "")
          }
        }, {
          name: "simulcast",
          reg: new RegExp(
            "^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"),
          names: ["dir1", "list1", "dir2", "list2"],
          format: function(e) {
            return "simulcast:%s %s" + (e.dir2 ? " %s %s" : "")
          }
        }, {
          name: "simulcast_03",
          reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
          names: ["value"],
          format: "simulcast: %s"
        }, {
          name: "framerate",
          reg: /^framerate:(\d+(?:$|\.\d+))/,
          format: "framerate:%s"
        }, {
          name: "sourceFilter",
          reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
          names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
          format: "source-filter: %s %s %s %s %s"
        }, {
          push: "invalid",
          names: ["value"]
        }]
      };
      Object.keys(r).forEach(function(e) {
        r[e].forEach(function(e) {
          e.reg || (e.reg = /(.*)/), e.format || (e.format = "%s")
        })
      })
    }, function(e, t, r) {
      var i = r(16),
        n = r(19),
        a = r(111);
      e.exports = function(e, t) {
        if (i(e), n(t) && t.constructor === e) return t;
        var r = a.f(e);
        return (0, r.resolve)(t), r.promise
      }
    }, function(e, t) {
      e.exports = function(e) {
        try {
          return {
            e: !1,
            v: e()
          }
        } catch (e) {
          return {
            e: !0,
            v: e
          }
        }
      }
    }, function(e, t, r) {
      var i, n, a, o = r(37),
        s = r(250),
        c = r(76),
        d = r(53),
        u = r(8),
        l = u.process,
        p = u.setImmediate,
        f = u.clearImmediate,
        h = u.MessageChannel,
        m = u.Dispatch,
        v = 0,
        g = {},
        _ = function() {
          var e = +this;
          if (g.hasOwnProperty(e)) {
            var t = g[e];
            delete g[e], t()
          }
        },
        R = function(e) {
          _.call(e.data)
        };
      p && f || (p = function(e) {
          for (var t = [], r = 1; arguments.length > r;) t.push(arguments[r++]);
          return g[++v] = function() {
            s("function" == typeof e ? e : Function(e), t)
          }, i(v), v
        }, f = function(e) {
          delete g[e]
        }, "process" == r(33)(l) ? i = function(e) {
          l.nextTick(o(_, e, 1))
        } : m && m.now ? i = function(e) {
          m.now(o(_, e, 1))
        } : h ? (a = (n = new h).port2, n.port1.onmessage = R, i = o(a.postMessage, a, 1)) : u.addEventListener &&
        "function" == typeof postMessage && !u.importScripts ? (i = function(e) {
          u.postMessage(e + "", "*")
        }, u.addEventListener("message", R, !1)) : i = "onreadystatechange" in d("script") ? function(e) {
          c.appendChild(d("script")).onreadystatechange = function() {
            c.removeChild(this), _.call(e)
          }
        } : function(e) {
          setTimeout(o(_, e, 1), 0)
        }), e.exports = {
        set: p,
        clear: f
      }
    }, function(e, t, r) {
      var i = r(16),
        n = r(56),
        a = r(6)("species");
      e.exports = function(e, t) {
        var r, o = i(e).constructor;
        return void 0 === o || null == (r = i(o)[a]) ? t : n(r)
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = o(r(113)),
        n = o(r(112)),
        a = o(r(244));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = r(22),
        c = navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
        navigator.msGetUserMedia || (navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
        d = window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext ||
        window.msAudioContext,
        u = window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection,
        l = window.RTCDataChannel = window.RTCDataChannel || window.DataChannel,
        p = window.MediaStream = window.MediaStream || window.webkitMediaStream;

      function f(e) {
        var t = void 0;
        return t || (t = document.createElement("video")), !!t.canPlayType({
          ogg: 'video/ogg; codecs="theora"',
          h264: 'video/mp4; codecs="avc1.42E01E"',
          webm: 'video/webm; codecs="vp8, vorbis"',
          vp9: 'video/webm; codecs="vp9"',
          hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
        } [e] || e)
      }
      var h = {
        WebRTC: !!u && !!p,
        RTCPeerConnection: !!u,
        Vp8: f("webm"),
        Vp9: f("vp9"),
        H264: f("h264"),
        GetUserMedia: !!c && !!navigator.mediaDevices,
        DataChannel: !!(u && l && u.prototype && u.prototype.createDataChannel),
        WebAudio: !(!d || !d.prototype.createMediaStreamSource),
        MediaStream: !!p
      };

      function m() {
        var e = s && s.name,
          t = s && s.version;
        return {
          prefix: e,
          version: t = (t = t && t.match(/(\d|\.)+/)[0]) && t.match(/\d+/)[0]
        }
      }
      t.default = {
        checkWebRtc: function() {
          return h
        },
        checkWebAudio: function() {
          return {
            WebAudio: h.WebAudio,
            MediaStream: h.MediaStream
          }
        },
        checkCompatibility: function() {
          var e = Object.assign(m(), {
            system: s && s.os.family + " " + s.os.version,
            browser: s && s.name,
            version: s && s.version
          });
          return new Promise(function(t, r) {
            var o = this;
            (0, n.default)(i.default.mark(function r() {
              var n, s;
              return i.default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return n = Object.assign(e, h, {
                      ScreenSharing: !1
                    }), r.next = 3, a.default.getDevices().catch(function(e) {
                      return console.warn(e), t(n)
                    });
                  case 3:
                    return s = r.sent, n.MicrophoneList = s && s.audioIn || [], n.CameraList =
                      s && s.video || [], n.Microphone = s && s.audioIn && s.audioIn.length > 0 ||
                      !1, n.Camera = s && s.video && s.video.length > 0 || !1, r.abrupt(
                        "return", t(n));
                  case 9:
                  case "end":
                    return r.stop()
                }
              }, r, o)
            }))()
          })
        },
        checkVersion: function() {
          return m()
        }
      }, e.exports = t.default
    }, function(e, t, r) {
      var i = r(17),
        n = r(7),
        a = r(21);
      e.exports = function(e, t) {
        var r = (n.Object || {})[e] || Object[e],
          o = {};
        o[e] = t(r), i(i.S + i.F * a(function() {
          r(1)
        }), "Object", o)
      }
    }, , , , , , , function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(356);
      Object.defineProperty(t, "WebRTCGateWay", {
        enumerable: !0,
        get: function() {
          return i.WebRTCGateWay
        }
      });
      var n = r(183);
      Object.defineProperty(t, "WebRTCGateWayContext", {
        enumerable: !0,
        get: function() {
          return n.WebRTCGateWayContext
        }
      });
      var a = r(353);
      Object.defineProperty(t, "WebRTCGateWayManager", {
        enumerable: !0,
        get: function() {
          return a.WebRTCGateWayManager
        }
      });
      var o = r(351);
      Object.defineProperty(t, "WebRTCGateWayProtocolHandler", {
        enumerable: !0,
        get: function() {
          return o.WebRTCGateWayProtocolHandler
        }
      })
    }, function(e, t, r) {
      var i = r(17);
      i(i.S, "Object", {
        create: r(50)
      })
    }, function(e, t, r) {
      r(158);
      var i = r(7).Object;
      e.exports = function(e, t) {
        return i.create(e, t)
      }
    }, function(e, t, r) {
      e.exports = {
        default: r(159),
        __esModule: !0
      }
    }, function(e, t, r) {
      var i = r(19),
        n = r(16),
        a = function(e, t) {
          if (n(e), !i(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
      e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, i) {
          try {
            (i = r(37)(Function.call, r(59).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
          } catch (e) {
            t = !0
          }
          return function(e, r) {
            return a(e, r), t ? e.__proto__ = r : i(e, r), e
          }
        }({}, !1) : void 0),
        check: a
      }
    }, function(e, t, r) {
      var i = r(17);
      i(i.S, "Object", {
        setPrototypeOf: r(161).set
      })
    }, function(e, t, r) {
      r(162), e.exports = r(7).Object.setPrototypeOf
    }, function(e, t, r) {
      e.exports = {
        default: r(163),
        __esModule: !0
      }
    }, function(e, t, r) {
      var i = r(17);
      i(i.S + i.F * !r(15), "Object", {
        defineProperty: r(13).f
      })
    }, function(e, t, r) {
      r(165);
      var i = r(7).Object;
      e.exports = function(e, t, r) {
        return i.defineProperty(e, t, r)
      }
    }, , , , , , , , , , , function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTC4SafariRelease = void 0;
      var i = o(r(1)),
        n = o(r(4)),
        a = o(r(3));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = function(e) {
        function t() {
          return (0, i.default)(this, t), (0, n.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(
            this, arguments))
        }
        return (0, a.default)(t, e), t
      }(r(122).AbstractWebRTC);
      t.WebRTC4SafariRelease = s
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTC4FirefoxRelease = void 0;
      var i = o(r(1)),
        n = o(r(4)),
        a = o(r(3));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = function(e) {
        function t() {
          return (0, i.default)(this, t), (0, n.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(
            this, arguments))
        }
        return (0, a.default)(t, e), t
      }(r(122).AbstractWebRTC);
      t.WebRTC4FirefoxRelease = s
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTC4ChromeRelease = void 0;
      var i = o(r(1)),
        n = o(r(4)),
        a = o(r(3));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = function(e) {
        function t() {
          return (0, i.default)(this, t), (0, n.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(
            this, arguments))
        }
        return (0, a.default)(t, e), t
      }(r(122).AbstractWebRTC);
      t.WebRTC4ChromeRelease = s
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.isMatchVersion = function(e, t) {
        var r = i[e];
        if (!(r && r.length > 0)) return !1;
        return -1 !== r.findIndex(function(e, r) {
          return e === t
        })
      }, t.maxVersion = function(e) {
        var t = i[e];
        if (!(t && t.length > 0)) return -1;
        for (var r = t[0], n = 0, a = t.length; n < a; n++) r = Math.max(r, t[n]);
        return r
      };
      var i = t.RELEASE_VERSION_MAP = {
        chrome: ["65"],
        firefox: ["59"],
        safari: ["11"]
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.removeTrackFromMediaStream = t.getScreenStream = t.getMediaStream = void 0;
      var i = r(11);
      t.getMediaStream = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
          audio: !0,
          video: !0
        };
        return /safari/gi.test(platform.name) && (e.video ? e.video = {
            deviceId: {
              exact: e.video.deviceId
            }
          } : e.audio && (e.audio = {
            deviceId: {
              exact: e.audio.deviceId
            }
          })), console.log("MediaTool: getLocalStream constraint:", JSON.stringify(e, null, " ")), navigator.mediaDevices
          .getUserMedia(e).then(function(t) {
            if (/Firefox/gi.test(platform.name) && t.getVideoTracks().length > 0) {
              var r = {
                  width: {
                    max: e.video.width
                  },
                  height: {
                    max: e.video.height
                  },
                  advanced: [{
                    width: e.video.width,
                    height: e.video.height
                  }]
                },
                i = t.getVideoTracks()[0];
              return console.log("MediaTool:constraints:", r), i.applyConstraints(r).then(function() {
                return console.log("变更视频流成功: ", t), Promise.resolve(t)
              }).catch(function(e) {
                console.error("变更视频流失败，", e);
                var t = {
                  event: e
                };
                return Promise.reject(t)
              })
            }
            return Promise.resolve(t)
          }).catch(function(e) {
            var t = {
              event: e
            };
            return Promise.reject(t)
          })
      }, t.getScreenStream = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
          audio: !0,
          video: !0
        };
        console.log("MediaTool: getLocalStream constraint:", JSON.stringify(e, null, " "));
        var t = Promise.resolve(),
          r = {
            video: !0
          };
        if (navigator.getDisplayMedia) t = navigator.getDisplayMedia(r);
        else {
          if (!navigator.mediaDevices.getDisplayMedia) return Promise.reject(i.VideoErrorCode.VideoScreenShareNotSupport);
          t = navigator.mediaDevices.getDisplayMedia(r)
        }
        return t.then(function(e) {
          var t = {
              width: 1280,
              height: 720
            },
            r = e.getVideoTracks()[0];
          return console.log("getScreenStream:constraints:", t), r.applyConstraints(t).then(function() {
            return console.log("变更演示流成功: ", e), Promise.resolve(e)
          }).catch(function(e) {
            console.warn("变更演示流失败，", e);
            var t = {
              event: e
            };
            return Promise.reject(t)
          })
        }).catch(function(e) {
          var t = {
            event: e
          };
          return Promise.reject(t)
        })
      }, t.removeTrackFromMediaStream = function(e) {
        if (e) {
          var t = e.getTracks();
          t && 0 !== t.length && t.forEach(function(t) {
            console.log("stop track", e.id), t.stop(), e.removeTrack(t)
          })
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.AbstractProtocolHandler = void 0;
      var i = a(r(1)),
        n = a(r(5));

      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var o = function() {
        function e() {
          (0, i.default)(this, e)
        }
        return (0, n.default)(e, [{
          key: "pack",
          value: function(e, t) {
            this.adapterRef.logger.error("AbstractProtocolHandler:pack 需要子类实现")
          }
        }, {
          key: "unpack",
          value: function(e) {
            this.adapterRef.logger.error("AbstractProtocolHandler:unpack 需要子类实现")
          }
        }]), e
      }();
      t.AbstractProtocolHandler = o
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTCGateWayContext = void 0;
      var i = o(r(1)),
        n = o(r(4)),
        a = o(r(3));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, n.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          r.uid = "" + r.uid, r.cid = "" + r.cid;
          var a = e.hasAudio,
            o = e.hasVideo,
            s = e.netDetect,
            c = e.session_mode,
            d = e.params,
            u = e.browser,
            l = e.bypass_rtmp,
            p = e.record;
          return r.hasAudio = a, r.hasVideo = o, r.netDetect = s, r.session_mode = c, r.params = d, r.browser =
            u, r.bypass_rtmp = l, r.record = p, r
        }
        return (0, a.default)(t, e), t
      }(r(354).AbstractGateWayContext);
      t.WebRTCGateWayContext = s
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.BaseAPI = void 0;
      var i = l(r(9)),
        n = l(r(1)),
        a = l(r(5)),
        o = l(r(4)),
        s = l(r(3)),
        c = r(357),
        d = r(24),
        u = r(11);

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = r(2),
        f = function(e) {
          function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, n.default)(this, t);
            var r = (0, o.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return r.adapterRef.instance = r, r
          }
          return (0, s.default)(t, e), (0, a.default)(t, [{
            key: "isSupportWebrtc",
            value: function() {
              var e = this._isSupportWebrtc();
              return e && e.MediaStream && e.RTCPeerConnection
            }
          }, {
            key: "getAccount",
            value: function() {
              if (!this.adapterRef) return null;
              var e = this.adapterRef.callerInfo || this.adapterRef.imInfo;
              return e && e.account || null
            }
          }, {
            key: "getUid",
            value: function() {
              if (this.adapterRef) {
                var e = this.adapterRef.callerInfo || this.adapterRef.imInfo;
                return e && e.uid || "local"
              }
            }
          }, {
            key: "getChannelInfo",
            value: function() {
              return {
                channelId: this.adapterRef.imInfo && this.adapterRef.imInfo.cid,
                uid: this.getUid(),
                account: this.getAccount()
              }
            }
          }, {
            key: "setClientRole",
            value: function(e) {
              var t = this;
              if (this.adapterRef.imInfo.sessionMode === u.SESSION_MODE.P2P) return this.adapterRef.imInfo
                .role = u.ROLE_FOR_MEETING.ROLE_PLAYER, Promise.reject(u.CommonErrorCode.StageNoPermission);
              if (e === this.adapterRef.imInfo.role) return Promise.resolve({
                role: e === u.ROLE_FOR_MEETING.ROLE_PLAYER ? "normal" : "audience"
              });
              var r = {
                  role: "normal"
                },
                i = Promise.resolve();
              return e === u.ROLE_FOR_MEETING.ROLE_AUDIENCE ? (r = {
                role: "audience"
              }, this.adapterRef.tempInfo.localAudioMuted || i.then(function() {
                return t._stopPushAudioStream()
              }), this.adapterRef.tempInfo.localVideoMuted || i.then(function() {
                t._stopPushVideoStream()
              })) : (this.adapterRef.tempInfo.localAudioDisabled || this.adapterRef.tempInfo.localAudioMuted ||
                i.then(function() {
                  return t._startPushAudioStream()
                }), this.adapterRef.tempInfo.localVideoDisabled || this.adapterRef.tempInfo.localVideoMuted ||
                i.then(function() {
                  return t._startPushVideoStream()
                })), i.then(function() {
                return t.adapterRef.imInfo.role = e === u.ROLE_FOR_MEETING.ROLE_AUDIENCE ? u.ROLE_FOR_MEETING
                  .ROLE_AUDIENCE : u.ROLE_FOR_MEETING.ROLE_PLAYER, Promise.resolve(r)
              })
            }
          }, {
            key: "setLocalVideoRenderer",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.view,
                r = this.adapterRef.tempInfo;
              r.localContainer || d.tool.verifyOptions(e, "view"), t ? r.localContainer = t : t = r.localContainer,
                this._getVideoHelperByUid("local").setVideoContainer(t)
            }
          }, {
            key: "setRemoteVideoRenderer",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.account,
                r = e.view,
                i = e.uid;
              !i && t && (i = this._getUidByAccount(t)), d.tool.verifyOptions(e, "uid view"), this._getVideoHelperByUid(
                i).setVideoContainer(r)
            }
          }, {
            key: "setLocalRenderMode",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = this.getUid(),
                r = this.adapterRef.tempInfo;
              if (!t) {
                if (!this.adapterRef.videoHelperLocal) return void(r.localViewParams = e);
                t = this.adapterRef.videoHelperLocal.uid
              }
              r.localViewParams || (r.localViewParams = {}), Object.assign(r.localViewParams, e), this._getVideoHelperByUid(
                t).setVideoViewConfig(e)
            }
          }, {
            key: "setRemoteRenderMode",
            value: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                r = t.account,
                i = t.uid;
              (!i && r && (i = this._getUidByAccount(r), t.uid = i), i) ? this._getVideoHelperByUid(i).setVideoViewConfig(
                t): Object.keys(this.adapterRef.videoHelperMap).map(function(r) {
                var i = e._getVideoHelperByUid(r);
                r !== e.adapterRef.imInfo.uid && i.setVideoViewConfig(t)
              })
            }
          }, {
            key: "setAudioProfile",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (this.adapterRef.signalInited) throw u.CommonErrorCode.ChannelAlreadyInSession;
              this._setSessionConfig({
                highAudio: !0 === e.highAudio
              })
            }
          }, {
            key: "setVideoProfile",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (this.adapterRef.signalInited) throw u.CommonErrorCode.ChannelAlreadyInSession;
              var t = {};
              e.quality && (t.videoQuality = e.quality), e.frameRate && (t.videoFrameRate = e.frameRate),
                this._setSessionConfig(t)
            }
          }, {
            key: "muteLocalVideoStream",
            value: function() {
              var e = this,
                t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).mute,
                r = void 0 !== t && t;
              return Promise.resolve().then(function() {
                return e.adapterRef.tempInfo.localVideoMuted === r ? Promise.resolve() : e.adapterRef
                  .signalInited ? (e.adapterRef.tempInfo.localVideoMuted = r, r ? e._stopPushVideoStream() :
                    e.adapterRef.tempInfo.localVideoDisabled || e.adapterRef.imInfo.role !== u.ROLE_FOR_MEETING
                    .ROLE_PLAYER ? Promise.resolve() : e._startPushVideoStream()) : Promise.resolve()
              }).then(function() {
                return Promise.resolve()
              })
            }
          }, {
            key: "muteLocalAudioStream",
            value: function() {
              var e = this,
                t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).mute,
                r = void 0 !== t && t;
              return Promise.resolve().then(function() {
                return e.adapterRef.tempInfo.localAudioMuted === r ? Promise.resolve() : (e.adapterRef
                  .tempInfo.localAudioMuted = r, e.adapterRef.signalInited ? r ? e._stopPushAudioStream() :
                  e.adapterRef.tempInfo.localVideoDisabled || e.adapterRef.imInfo.role !== u.ROLE_FOR_MEETING
                  .ROLE_PLAYER ? Promise.resolve() : e._startPushAudioStream() : Promise.resolve())
              }).then(function() {
                return Promise.resolve()
              })
            }
          }, {
            key: "muteRemoteVideoStream",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.account,
                r = e.mute,
                i = void 0 !== r && r,
                n = e.uid;
              !n && t && (n = this._getUidByAccount(t));
              var a = this._getVideoHelperByUid(n);
              return a && (i ? (this.adapterRef.logger.log("BaseAdaper: muteRemoteVideoStream 停止接收视频: " +
                n), a.hide()) : (this.adapterRef.logger.log(
                "BaseAdaper: muteRemoteVideoStream 接收视频: " + n), a.show())), this.adapterRef.tempInfo.remoteVideoMuteMap[
                "" + n] = i, Promise.resolve()
            }
          }, {
            key: "muteRemoteAudioStream",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.account,
                r = e.mute,
                i = void 0 !== r && r,
                n = e.uid;
              !n && t && (n = this._getUidByAccount(t));
              var a = this._getAudioHelperByUid(n);
              return a && (i ? a.stopAudio() : a.playAudio()), this.adapterRef.tempInfo.remoteAudioMuteMap[
                "" + n] = i, Promise.resolve()
            }
          }, {
            key: "enableLocalVideo",
            value: function(e) {
              var t = this;
              if (!d.tool.isBoolean(e)) throw u.CommonErrorCode.ParamError;
              if (e) return this.adapterRef.tempInfo.localVideoDisabled = !1, Promise.resolve();
              var r = this._getVideoHelperByUid("local");
              return Promise.resolve().then(function() {
                return r && r.getLocalVideoStream(!0) ? r.stopPushLocalVideoStream() : Promise.resolve()
              }).then(function() {
                return r && r.localScreenStream ? t.stopDevice({
                  type: u.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN
                }) : Promise.resolve()
              }).then(function() {
                return r && r.localCameraStream ? t.stopDevice({
                  type: u.DEVICE_TYPE.DEVICE_TYPE_VIDEO
                }) : Promise.resolve()
              }).then(function() {
                return r && r.hide(), t.adapterRef.tempInfo.localVideoDisabled = !0, Promise.resolve()
              })
            }
          }, {
            key: "enableLocalAudio",
            value: function(e) {
              var t = this;
              if (!d.tool.isBoolean(e)) throw u.CommonErrorCode.ParamError;
              if (e) return this.adapterRef.tempInfo.localAudioDisabled = !1, Promise.resolve();
              var r = this._getAudioHelperByUid("local");
              return Promise.resolve().then(function() {
                return r.localAudioStreamFromMIC ? t.stopDevice({
                  type: u.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN
                }) : Promise.resolve()
              }).then(function() {
                return t.adapterRef.tempInfo.localAudioDisabled = !0, Promise.resolve()
              })
            }
          }, {
            key: "getDevices",
            value: function(e) {
              var t = e;
              return "object" === (void 0 === e ? "undefined" : (0, i.default)(e)) && (t = e.type), this.adapterRef
                .deviceApi.getDevicesOfType(t)
            }
          }, {
            key: "startDevice",
            value: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (t.type === u.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN && !this.adapterRef.instance
                ._isChrome()) return this.adapterRef.logger.log("该浏览器不支持屏幕共享功能，请使用chrome内核浏览器"), Promise.reject(
                u.CommonErrorCode.ParamError);
              d.tool.verifyOptions(t, "type");
              var r = this.adapterRef.tempInfo,
                i = this._getVideoHelperByUid("local");
              return this._checkDevicePermissionEnabled(t).then(function() {
                return e.adapterRef.deviceApi.startDevice(t)
              }).then(function() {
                if (t.type === u.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
                  var n = e._getAudioHelperByUid("local");
                  return e.adapterRef.imInfo.role === u.ROLE_FOR_MEETING.ROLE_PLAYER && !e.adapterRef
                    .tempInfo.localAudioMuted && e.adapterRef.signalInited && n.isFirstOpenMic ? e._startPushAudioStream() :
                    Promise.resolve()
                }
                if (t.type === u.DEVICE_TYPE.DEVICE_TYPE_VIDEO || t.type === u.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN)
                  return i._checkHasVideoStream() && (r.localContainer && e.setLocalVideoRenderer(),
                    r.localViewParams && e.setLocalRenderMode(r.localViewParams), e.adapterRef.imInfo
                    .role === u.ROLE_FOR_MEETING.ROLE_PLAYER && !e.adapterRef.tempInfo.localVideoMuted &&
                    e.adapterRef.signalInited) ? e._startPushVideoStream() : Promise.resolve()
              })
            }
          }, {
            key: "_isMediaType",
            value: function(e) {
              return e === u.DEVICE_TYPE.DEVICE_TYPE_VIDEO || e === u.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN
            }
          }, {
            key: "stopDevice",
            value: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (t === u.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN && !this.adapterRef.instance._isChrome())
                return this.adapterRef.logger.log("该浏览器不支持屏幕共享功能，请使用chrome内核浏览器"), Promise.reject(u.CommonErrorCode
                  .ParamError);
              d.tool.verifyOptions(t, "type");
              var r = t;
              "object" === (void 0 === t ? "undefined" : (0, i.default)(t)) && (r = t.type);
              var n = !1;
              return this._checkDevicePermissionEnabled(t).then(function() {
                if (e._isMediaType(r)) {
                  var t = e._getVideoHelperByUid("local");
                  n = t.isInMCUState()
                }
                return e.adapterRef.deviceApi.stopDevice(r)
              }).then(function() {
                if (r === u.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) e._getAudioHelperByUid("local");
                else if (e._isMediaType(r)) {
                  if (!n) return e._getVideoHelperByUid("local").stopPushLocalVideoStream()
                }
                return Promise.resolve()
              })
            }
          }, {
            key: "startVideoPreview",
            value: function(e) {
              return this.adapterRef.deviceApi.startDevice(e)
            }
          }, {
            key: "stopVideoPreview",
            value: function(e) {
              return this.adapterRef.deviceApi.stopDevice(e)
            }
          }, {
            key: "openLocalAudio",
            value: function(e) {
              return this.adapterRef.deviceApi.startDevice(e)
            }
          }, {
            key: "stopLocalAudio",
            value: function(e) {
              return this.adapterRef.deviceApi.stopDevice(e)
            }
          }, {
            key: "getLocalAudioVolume",
            value: function() {
              return this.adapterRef.playApi.getAudioVolume()
            }
          }, {
            key: "getPlayVolume",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.account,
                r = e.uid;
              return r || (r = this._getUidByAccount(t)), this.adapterRef.playApi.getPlayVolume({
                uid: r
              })
            }
          }, {
            key: "setCaptureVolume",
            value: function(e) {
              if (e = +e, !Number.isInteger(e)) throw u.CommonErrorCode.ParamError;
              return this.adapterRef.captureApi.setCaptureVolume(e)
            }
          }, {
            key: "getCaptureVolume",
            value: function() {
              return this.adapterRef.captureApi.getCaptureVolume()
            }
          }, {
            key: "startMediaRecording",
            value: function(e) {
              return this.adapterRef.recordApi.startMediaRecording(e)
            }
          }, {
            key: "stopMediaRecording",
            value: function(e) {
              return this.adapterRef.recordApi.stopMediaRecording(e)
            }
          }, {
            key: "playMediaRecording",
            value: function(e) {
              return this.adapterRef.recordApi.playMediaRecording(e)
            }
          }, {
            key: "listMediaRecording",
            value: function() {
              return this.adapterRef.recordApi.listMediaRecording()
            }
          }, {
            key: "cleanMediaRecording",
            value: function(e) {
              return this.adapterRef.recordApi.cleanMediaRecording(e)
            }
          }, {
            key: "downloadMediaRecording",
            value: function(e) {
              return this.adapterRef.recordApi.downloadMediaRecording(e)
            }
          }, {
            key: "setMediaMixConfig",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              d.tool.verifyOptions(e, "enableMixVideo");
              var t = this._getVideoHelperByUid("local");
              if (this.adapterRef.logger.log("BaseAdapter: setMediaMixConfig: " + e), !0 === e.enableMixVideo) {
                if (!this.adapterRef.mixVideoConf && t.localCameraStream && t.localScreenStream) return Promise
                  .reject(u.VideoErrorCode.VideoMixStreamExceed);
                this.adapterRef.mixVideoConf = {}, this.adapterRef.mixVideoConf.videoLayout = e.videoLayout ||
                  u.MIX_VIDEO_MODE.LAYOUT_TOP_RIGHT, this.adapterRef.mixVideoConf.videoCompressSize = e.videoCompressSize ||
                  u.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_LOW, this.adapterRef.mixVideoConf.videoMixRatio = e.videoMixRatio ||
                  0, this.adapterRef.mixVideoConf.videoSecWinType = e.videoSecWinType || u.DEVICE_TYPE.DEVICE_TYPE_VIDEO,
                  t.setMixConf()
              } else !1 === e.enableMixVideo && (this.adapterRef.mixVideoConf = null)
            }
          }, {
            key: "startAudioMixing",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = this._getAudioHelperByUid("local");
              return this.adapterRef.logger.log("BaseAdapter: startAudioMixing: %s", JSON.stringify(e,
                null, " ")), this.adapterRef.mixAudioConf = e, t.startAudioMixing()
            }
          }, {
            key: "pauseAudioMixing",
            value: function() {
              var e = this._getAudioHelperByUid("local");
              return this.adapterRef.logger.log("BaseAdapter: pauseAudioMixing"), e.pauseAudioMixing()
            }
          }, {
            key: "resumeAudioMixing",
            value: function() {
              var e = this._getAudioHelperByUid("local");
              return this.adapterRef.logger.log("BaseAdapter: resumeAudioMixing"), e.resumeAudioMixing()
            }
          }, {
            key: "stopAudioMixing",
            value: function() {
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              var e = this._getAudioHelperByUid("local");
              return this.adapterRef.logger.log("BaseAdapter: stopAudioMixing"), e.stopAudioMixing()
            }
          }, {
            key: "setAudioMixingVolume",
            value: function(e) {
              var t = this._getAudioHelperByUid("local");
              return this.adapterRef.logger.log("BaseAdapter: setAudioMixingVolume"), t.setAudioMixingVolume(
                e)
            }
          }, {
            key: "setAudioMixingPlayTime",
            value: function(e) {
              var t = this._getAudioHelperByUid("local");
              return this.adapterRef.logger.log("BaseAdapter: setAudioMixingPlayTime"), t.setAudioMixingPlayTime(
                e)
            }
          }, {
            key: "getAudioMixingPlayedTime",
            value: function() {
              return this._getAudioHelperByUid("local").getAudioMixingPlayedTime()
            }
          }, {
            key: "getAudioMixingTotalTime",
            value: function() {
              var e = this._getAudioHelperByUid("local");
              return this.adapterRef.logger.log("BaseAdapter: getAudioMixingTotalTime"), e.getAudioMixingTotalTime()
            }
          }, {
            key: "updateRtmpHost",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.uid;
              d.tool.verifyOptions(e, "uid");
              var r = (p.roomserver && "https://" + p.roomserver + "/v1/sdk/command/rooms/" ||
                  "https://roomserver.netease.im/v1/sdk/command/rooms/") + this.adapterRef.imInfo.cid,
                i = this.adapterRef.imInfo.turnToken || this.adapterRef.imInfo.serverMap && this.adapterRef
                .imInfo.serverMap.token;
              return i ? (0, d.ajax)({
                type: "post",
                url: r,
                data: {
                  suid: parseInt(this.adapterRef.imInfo.uid),
                  cid: this.adapterRef.imInfo.cid,
                  uid: parseInt(t),
                  cmd: 10001
                },
                header: {
                  Token: i
                }
              }).then(function(e) {
                if (200 === e.code) return Promise.resolve();
                var t = void 0;
                switch (e.code) {
                  case 401:
                    t = u.RoomServerErrorCode.RoomServerErrAuthError;
                    break;
                  case 404:
                    t = u.RoomServerErrorCode.RoomServerErrChannelNotExist;
                    break;
                  case 405:
                    t = u.RoomServerErrorCode.RoomServerErrUidNotExist;
                    break;
                  case 406:
                    t = u.RoomServerErrorCode.RoomServerErrNoPermission;
                    break;
                  case 417:
                    t = u.RoomServerErrorCode.RoomServerErrDataError;
                    break;
                  case 500:
                    t = u.RoomServerErrorCode.RoomServerErrUnknown;
                    break;
                  case 600:
                    t = u.RoomServerErrorCode.RoomServerErrServerError;
                    break;
                  default:
                    t = u.RoomServerErrorCode.RoomServerErrInvilid
                }
                return Promise.reject(t)
              }) : Promise.reject(u.CommonErrorCode.ParamError)
            }
          }, {
            key: "detectNetworkStatus",
            value: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (this.adapterRef.detectNetState.inDetecting) return Promise.reject(u.CommonErrorCode.NetworkInDetecting);
              if (this.adapterRef.webrtcBusiness && this.adapterRef.webrtcBusiness.selfWebRtcInstance)
                return Promise.reject(u.CommonErrorCode.ChannelAlreadyInSession);
              var r = t.uid,
                i = t.cid,
                n = t.token,
                a = t.wssArr,
                o = t.codec,
                s = void 0 === o ? "h264" : o,
                c = t.detectTime,
                l = void 0 === c ? 15 : c,
                f = t.fromDevice,
                h = t.imageNode,
                m = t.videoNode;
              r || (r = this._getDetectUid()), l = Math.max(l, 5), this._isWeixinBrowser() ? (this.adapterRef
                  .logger.log("BaseAdaper: detectNetworkStatus: 当前是微信浏览器!"), s = "vp8") : this._isMobileSafari() &&
                (this.adapterRef.logger.log("BaseAdaper: detectNetworkStatus: 当前是移动端safar浏览器!"), s =
                  "h264");
              var v = Promise.resolve(),
                g = {
                  uid: r,
                  cid: i,
                  token: n,
                  wssArr: a,
                  codec: s,
                  fromDevice: f,
                  imageNode: h,
                  videoNode: m
                };
              return a || (v = v.then(function() {
                return e.adapterRef.logger.log(
                  "BaseAdaper: detectNetworkStatus: Config netDetectAddr " + p.netDetectAddr), (0,
                  d.ajax)({
                  type: "post",
                  url: p.netDetectAddr,
                  contentType: "application/json",
                  data: {
                    uid: r
                  }
                })
              }).then(function(e) {
                return Object.assign(g, {
                  cid: e.cid,
                  token: e.token,
                  wssArr: e.detectAddrs.splice(0, 1)
                }), Promise.resolve()
              })), v = v.then(function() {
                return e.adapterRef.detectNetState.inDetecting = !0, e._startDetect(g)
              }).then(function() {
                return new Promise(function(t, r) {
                  clearTimeout(e.adapterRef.detectNetState.detectTimer), e.adapterRef.detectNetState
                    .detectTimer = setTimeout(function() {
                      if (clearInterval(e.adapterRef.detectNetState.canvasTimer), e._isDetectNetwork()) {
                        var i = e.adapterRef.statsReportHelper.formatDataFromStats.disposalDataForNetDetect(
                          null);
                        t(i)
                      } else e.adapterRef.statsReportHelper && e.adapterRef.statsReportHelper.formatDataFromStats &&
                        e.adapterRef.statsReportHelper.formatDataFromStats.disposalDataForNetDetect(
                          e.adapterRef.instance._isDetectNetworkOfselfWebRtcConnected(), e.adapterRef
                          .instance._isDetectNetworkOfremoteWebRtcConnected()), r(u.CommonErrorCode
                          .ServerConnectionError);
                      e._endDetect()
                    }, 1e3 * l)
                })
              }).then(function(e) {
                return Promise.resolve(e)
              })
            }
          }, {
            key: "_startDetect",
            value: function(e) {
              var t = this;
              return Object.assign(this.adapterRef.imInfo, {
                appkey: "4c418f22935f1e2cf8488ff1c84229c0",
                cid: e.cid,
                uid: e.uid,
                token: e.token,
                codec: e.codec,
                wssArr: e.wssArr || ["webrtcgwhz.netease.im?ip=223.252.198.177:5060"],
                role: u.ROLE_FOR_MEETING.ROLE_PLAYER,
                sessionMode: u.SESSION_MODE.MEETING,
                netDetect: !0,
                turnToken: null,
                relayaddrs: null,
                relaytoken: null
              }), this._setSessionConfig({
                liveEnable: !1,
                rtmpRecord: !1
              }), this._startSession().then(function() {
                return t.adapterRef.signalInited = !0, e.fromDevice ? t._getStreamFromDevice() : e.imageNode ?
                  t._getStreamFromImageNode(e.imageNode) : e.videoNode ? t._getStreamFromVideoNode(e.videoNode) :
                  t._getStreamFromDefaultVideo()
              }).catch(function(e) {
                return t._endDetect(), Promise.reject(e)
              })
            }
          }, {
            key: "_endDetect",
            value: function() {
              var e = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid);
              if (e) {
                var t = e.getLocalVideoStream();
                if (t && t.getTracks) {
                  var r = t.getTracks();
                  r && r.length > 0 && r.forEach(function(e) {
                    e.stop(), t.removeTrack(e)
                  })
                }
              }
              this.leaveChannel(), this.adapterRef.signalInited = !1, this.adapterRef.detectNetState.stream =
                null, this.adapterRef.detectNetState.canvasTimer && (clearInterval(this.adapterRef.detectNetState
                  .canvasTimer), this.adapterRef.detectNetState.canvasTimer = null), this.adapterRef.detectNetState
                .detectTimer && (clearTimeout(this.adapterRef.detectNetState.detectTimer), this.adapterRef
                  .detectNetState.detectTimer = null), this.adapterRef.detectNetState.detectDom && this.adapterRef
                .detectNetState.detectDom.oncanplay && (this.adapterRef.detectNetState.detectDom.oncanplay =
                  null), this.adapterRef.detectNetState.detectDom = null, this.adapterRef.detectNetState.inDetecting = !
                1
            }
          }, {
            key: "_getDetectUid",
            value: function() {
              return d.tool.randomNum(Math.pow(2, 50), Math.pow(2, 52))
            }
          }, {
            key: "_getStreamFromDevice",
            value: function() {
              var e = this;
              return this.getDevices({
                type: u.DEVICE_TYPE.DEVICE_TYPE_VIDEO
              }).then(function(t) {
                var r = null;
                return t && t.length && (r = t[t.length - 1]), e.startDevice({
                  type: u.DEVICE_TYPE.DEVICE_TYPE_VIDEO,
                  device: r
                })
              }).then(function(t) {
                return e.adapterRef.imInfo.remoteUid = e._getDetectUid(), e.adapterRef.webrtcBusiness
                  .doClientJoin(e.adapterRef.imInfo.remoteUid), Promise.resolve()
              })
            }
          }, {
            key: "_getStreamFromImageNode",
            value: function(e) {
              var t = document.createElement("canvas");
              if (t.width = 640, t.height = 480, clearInterval(this.adapterRef.detectNetState.canvasTimer),
                this.adapterRef.detectNetState.canvasTimer = setInterval(function() {
                  t.getContext("2d").drawImage(e, 0, 0)
                }, 20), this.adapterRef.detectNetState.stream = t.captureStream(), this.adapterRef.detectNetState
                .stream) {
                var r = this._getVideoHelperByUid(this.adapterRef.imInfo.uid);
                return r && r.handleStreamFromMp4File(this.adapterRef.detectNetState.stream), this._judgeSendSdpOfferOrUpdate(),
                  this.adapterRef.imInfo.remoteUid = this._getDetectUid(), this.adapterRef.webrtcBusiness
                  .doClientJoin(this.adapterRef.imInfo.remoteUid), Promise.resolve()
              }
              return Promise.reject(u.CommonErrorCode.DataError)
            }
          }, {
            key: "_getStreamFromVideoNode",
            value: function(e) {
              var t = this.adapterRef.detectNetState.detectDom = e;
              if (t.oncanplay = null, t.captureStream ? this.adapterRef.detectNetState.stream = t.captureStream() :
                this.detectDom.mozCaptureStream && (this.adapterRef.detectNetState.stream = t.mozCaptureStream()),
                this.adapterRef.detectNetState.stream) {
                var r = this._getAudioHelperByUid(this.adapterRef.imInfo.uid);
                r && r.handleStreamFromMp4File(this.adapterRef.detectNetState.stream);
                var i = this._getVideoHelperByUid(this.adapterRef.imInfo.uid);
                return i && i.handleStreamFromMp4File(this.adapterRef.detectNetState.stream), this._judgeSendSdpOfferOrUpdate(),
                  this.adapterRef.imInfo.remoteUid = this._getDetectUid(), this.adapterRef.webrtcBusiness
                  .doClientJoin(this.adapterRef.imInfo.remoteUid), Promise.resolve()
              }
              return Promise.reject(u.VideoErrorCode.VideoStreamFetchError)
            }
          }, {
            key: "_getStreamFromDefaultVideo",
            value: function() {
              var e = this;
              return new Promise(function(t, r) {
                clearTimeout(e.adapterRef.detectNetState.outTimer), e.adapterRef.detectNetState.outTimer =
                  setTimeout(function() {
                    r(u.CommonErrorCode.ChannelReserveTimeOut)
                  }, 1e3), e.adapterRef.detectNetState.stream = null, e.adapterRef.detectNetState.detectDom =
                  document.createElement("video"), e.adapterRef.detectNetState.detectDom.autoplay =
                  "atuoplay", e.adapterRef.detectNetState.detectDom.loop = !0, e.adapterRef.detectNetState
                  .detectDom.volume = .1 / 255, e.adapterRef.detectNetState.detectDom.oncanplay =
                  function() {
                    clearTimeout(e.adapterRef.detectNetState.outTimer), e._getStreamFromVideoNode(e.adapterRef
                      .detectNetState.detectDom).then(function() {
                      t()
                    }).catch(function(e) {
                      r(e)
                    })
                  }, e.adapterRef.detectNetState.detectDom.crossOrigin = "anonymous", e.adapterRef.detectNetState
                  .detectDom.src =
                  "https://vodegkofxdv.vod.126.net/vodegkofxdv/77a47edc-9942-4782-88ff-90bb46317813.mp4"
              })
            }
          }]), t
        }(c.AbstractAdapter);
      t.BaseAPI = f
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.AuidoMixingState = {
        UNSTART: 0,
        STARTING: 1,
        PAUSED: 2,
        STOPED: 3
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.CommonErrorCode = {
        OK: {
          name: "OK",
          code: 200,
          desc: "success"
        },
        ChannelReserveTimeOut: {
          name: "ChannelReserveTimeOut",
          code: 101,
          desc: "请求超时"
        },
        ChannelReserveErrorParam: {
          name: "ChannelReserveErrorParam",
          code: 414,
          desc: "服务器请求参数错误"
        },
        ChannelReserveMoreThanTwoUser: {
          name: "ChannelReserveMoreThanTwoUser",
          code: 600,
          desc: "只支持两个用户, 有第三个人试图使用相同的频道名分配频道"
        },
        ChannelReserveServerFail: {
          name: "ChannelReserveServerFail",
          code: 601,
          desc: "分配频道服务器出错"
        },
        ChannelJoinTimeOut: {
          name: "ChannelJoinTimeOut",
          code: 20101,
          desc: "请求超时"
        },
        ChannelJoinMeetingModeError: {
          name: "ChannelJoinMeetingModeError",
          code: 20102,
          desc: "会议模式错误"
        },
        ChannelJoinRtmpModeError: {
          name: "ChannelJoinRtmpModeError",
          code: 20103,
          desc: "rtmp用户加入非rtmp频道"
        },
        ChannelJoinRtmpNodesError: {
          name: "ChannelJoinRtmpNodesError",
          code: 20104,
          desc: "超过频道最多rtmp人数限制"
        },
        ChannelJoinRtmpHostError: {
          name: "ChannelJoinRtmpHostError",
          code: 20105,
          desc: "已经存在一个主播"
        },
        ChannelJoinRtmpCreateError: {
          name: "ChannelJoinRtmpCreateError",
          code: 20106,
          desc: "需要旁路直播, 但频道创建者非主播"
        },
        ChannelJoinLayoutError: {
          name: "ChannelJoinLayoutError",
          code: 20208,
          desc: "主播自定义布局错误"
        },
        ChannelJoinInvalidParam: {
          name: "ChannelJoinInvalidParam",
          code: 20400,
          desc: "参数错误"
        },
        ChannelJoinDesKey: {
          name: "ChannelJoinDesKey",
          code: 20401,
          desc: "密码加密错误"
        },
        ChannelJoinInvalidRequst: {
          name: "ChannelJoinInvalidRequst",
          code: 20417,
          desc: "错误请求"
        },
        ChannelServerUnknown: {
          name: "ChannelServerUnknown",
          code: 20500,
          desc: "服务器内部错误"
        },
        ChannelStartFail: {
          name: "ChannelStartFail",
          code: 11e3,
          desc: "通道发起失败"
        },
        ChannelDisconnected: {
          name: "ChannelDisconnected",
          code: 11001,
          desc: "断开连接"
        },
        VersionSelfLow: {
          name: "VersionSelfLow",
          code: 11002,
          desc: "本人SDK版本太低不兼容"
        },
        VersionRemoteLow: {
          name: "VersionRemoteLow",
          code: 11003,
          desc: "对方SDK版本太低不兼容"
        },
        BrowserNotSupport: {
          name: "BrowserNotSupport",
          code: 11004,
          desc: "浏览器版本不支持"
        },
        ChannelClosed: {
          name: "ChannelClosed",
          code: 11005,
          desc: "通道被关闭"
        },
        ChannelKicked: {
          name: "ChannelKicked",
          code: 11006,
          desc: "账号被踢"
        },
        DataError: {
          name: "DataError",
          code: 11400,
          desc: "数据错误"
        },
        Invalid: {
          name: "Invalid",
          code: 11403,
          desc: "无效的操作"
        },
        ParamError: {
          name: "ParamError",
          code: 11405,
          desc: "参数错误"
        },
        ChannelCreatingError: {
          name: "ChannelCreatingError",
          code: 20110,
          desc: "创建房间失败"
        },
        ChannelJoinError: {
          name: "ChannelJoinError",
          code: 20111,
          desc: "加入房间失败"
        },
        ChannelJoinAlreadyIn: {
          name: "ChannelJoinAlreadyIn",
          code: 20112,
          desc: "已经在房间中"
        },
        ChannelSessionNotExists: {
          name: "ChannelSessionNotExists",
          code: 20113,
          desc: "会话/连接不存在"
        },
        ChannelAlreadyInSession: {
          name: "ChannelAlreadyInSession",
          code: 20114,
          desc: "会话已建立，请在会话建立前调用"
        },
        NIMNotInited: {
          name: "NIMNotInited",
          code: 20115,
          desc: "NIM Info 未被初始化"
        },
        ServerConnectionError: {
          name: "ServerConnectionError",
          code: 20116,
          desc: "服务器连接错误"
        },
        StageNotMatch: {
          name: "StageNotMatch",
          code: 20117,
          desc: "场景不匹配(P2P/MEETING)"
        },
        StageNoPermission: {
          name: "StageNoPermission",
          code: 20118,
          desc: "当前场景没有权限"
        },
        RoleNoPermission: {
          name: "RoleNoPermission",
          code: 20119,
          desc: "当前角色没有权限"
        },
        NetworkInDetecting: {
          name: "NetworkInDetecting",
          code: 20120,
          desc: "网络正在探测中"
        }
      }, t.RoomServerErrorCode = {
        OK: {
          name: "RoomServerErrOK",
          code: 200,
          desc: "操作成功"
        },
        RoomServerErrAuthError: {
          name: "RoomServerErrAuthError",
          code: 401,
          desc: "认证错误"
        },
        RoomServerErrChannelNotExist: {
          name: "RoomServerErrChannelNotExist",
          code: 404,
          desc: "房间不存在"
        },
        RoomServerErrUidNotExist: {
          name: "RoomServerErrUidNotExist",
          code: 405,
          desc: "房间下的uid不存在"
        },
        RoomServerErrNoPermission: {
          name: "RoomServerErrUidNotExist",
          code: 406,
          desc: "没有权限"
        },
        RoomServerErrDataError: {
          name: "RoomServerErrDataError",
          code: 417,
          desc: "请求数据不对"
        },
        RoomServerErrUnknown: {
          name: "RoomServerErrUnknown",
          code: 500,
          desc: "内部错误（TurnServer请求异常）"
        },
        RoomServerErrServerError: {
          name: "RoomServerErrServerError",
          code: 600,
          desc: "服务器内部错误"
        },
        RoomServerErrInvilid: {
          name: "RoomServerErrInvilid",
          code: 11403,
          desc: "无效的操作"
        }
      }, t.VideoRecordErrorCode = {
        VideoRecordClose: {
          name: "VideoRecordClose",
          code: 0,
          desc: "视频录制正常结束"
        },
        VideoRecordVideoSizeError: {
          name: "VideoRecordVideoSizeError",
          code: 1,
          desc: "视频录制结束，视频画面大小变化"
        },
        VideoRecordOutDiskSpace: {
          name: "VideoRecordOutDiskSpace",
          code: 2,
          desc: "视频录制结束，磁盘空间不足"
        },
        VideoRecordThreadBusy: {
          name: "VideoRecordThreadBusy",
          code: 3,
          desc: "视频录制结束，录制线程繁忙"
        },
        VideoRecordCreate: {
          name: "VideoRecordCreate",
          code: 200,
          desc: "视频录制文件创建"
        },
        VideoRecordExsit: {
          name: "VideoRecordExsit",
          code: 400,
          desc: "视频录制文件已经存在，请下载或清除"
        },
        VideoRecordCreateError: {
          name: "VideoRecordCreateError",
          code: 403,
          desc: "视频录制文件创建失败"
        },
        VideoRecordInvalid: {
          name: "VideoRecordInvalid",
          code: 404,
          desc: "通话不存在"
        },
        RecordNotExist: {
          name: "RecordNotExist",
          code: 67001,
          desc: "录制对象不存在或录制已结束"
        },
        RecordLackAccount: {
          name: "RecordLackAccount",
          code: 67002,
          desc: "需要录制的帐号缺失"
        },
        RecordNoStream: {
          name: "RecordNoStream",
          code: 67003,
          desc: "当前没有音视频数据，无法进行录制"
        },
        RecordBrowserNotSupport: {
          name: "RecordBrowserNotSupport",
          code: 67004,
          desc: "当前浏览器不支持音视频录制功能"
        },
        RecordBrowserNotSupportFormat: {
          name: "RecordBrowserNotSupportFormat",
          code: 67005,
          desc: "当前浏览器不支持对应格式的音视频录制"
        },
        RecordInRecording: {
          name: "RecordInRecording",
          code: 67006,
          desc: "音视频正在录制中，请勿重复操作"
        },
        RecordFormatError: {
          name: "RecordFormatError",
          code: 67007,
          desc: "音视频解码/格式化失败"
        },
        RecordStreamInvalid: {
          name: "RecordStreamInvalid",
          code: 67008,
          desc: "音视频流错误"
        }
      }, t.AudioRecordErrorCode = {
        AudioRecordClose: {
          name: "AudioRecordClose",
          code: 0,
          desc: "音频录制正常结束"
        },
        AudioRecordOutDiskSpace: {
          name: "AudioRecordOutDiskSpace",
          code: 2,
          desc: "音频录制结束，磁盘空间不足"
        },
        AudioRecordCreate: {
          name: "AudioRecordCreate",
          code: 200,
          desc: "音频录制文件创建成功"
        },
        AudioRecordExsit: {
          name: "AudioRecordExsit",
          code: 400,
          desc: "音频录制文件已经存在"
        },
        AudioRecordCreateError: {
          name: "AudioRecordCreateError",
          code: 403,
          desc: "音频录制文件文件创建失败"
        },
        AudioRecordInvalid: {
          name: "AudioRecordInvalid",
          code: 404,
          desc: "通话不存在"
        }
      }, t.LiveStatusErrorCode = {
        LiveStatusInitial: {
          name: "LiveStatusInitial",
          code: 500,
          desc: "初始状态"
        },
        LiveStatusLayoutError: {
          name: "LiveStatusLayoutError",
          code: 501,
          desc: "主播设置定制布局，布局参数错误"
        },
        LiveStatusStartConnecting: {
          name: "LiveStatusStartConnecting",
          code: 502,
          desc: "开始连接"
        },
        LiveStatusConnectted: {
          name: "LiveStatusConnected",
          code: 503,
          desc: "连接成功"
        },
        LiveStatusConnectFail: {
          name: "LiveStatusConnectFail",
          code: 504,
          desc: "连接失败"
        },
        LiveStatusPushing: {
          name: "LiveStatusPushing",
          code: 505,
          desc: "推流中"
        },
        LiveStatusPushFail: {
          name: "LiveStatusPushFail",
          code: 506,
          desc: "互动直播推流失败"
        },
        LiveStatusInnerError: {
          name: "LiveStatusInnerError",
          code: 507,
          desc: "内部错误"
        },
        LiveStatusPeopleLimit: {
          name: "LiveStatusPeopleLimit",
          code: 508,
          desc: "人数超出限制"
        }
      }, t.GateWayErrorCode = {
        GateWayLoginFail: {
          name: "GateWayLoginFail",
          code: 61001,
          desc: "网关登录失败"
        },
        GateWaySdpAnswerError: {
          name: "GateWaySdpAnswerError",
          code: 61002,
          desc: "网关服务器验证不通过"
        },
        GateWayConnectionTimeout: {
          name: "GateWayConnectionTimeout",
          code: 61003,
          desc: "网关连接超时"
        },
        GateWayAddressNotAvailable: {
          name: "GateWayAddressNotAvailable",
          code: 61004,
          desc: "无可用的网关地址，请确保对方打开了WebRTC兼容开关"
        },
        GateWayLoginAlready: {
          name: "GateWayLoginAlready",
          code: 61005,
          desc: "网关管理已初始化或已登录，重复操作"
        },
        GateWayServerError: {
          name: "GateWayServerError",
          code: 61006,
          desc: "网关服务器错误"
        },
        GateWayAuthError: {
          name: "GateWayAuthError",
          code: 61007,
          desc: "网关服务器鉴权失败"
        },
        GateWayRTCConnectFail: {
          name: "GateWayRTCConnectFail",
          code: 61008,
          desc: "RTC连接失败"
        },
        GateWayRTCUploadStreamFail: {
          name: "GateWayRTCUploadStreamFail",
          code: 61009,
          desc: "RTC发起上行流失败"
        }
      }, t.VideoErrorCode = {
        VideoDecodeError: {
          name: "VideoDecodeError",
          code: 62001,
          desc: "该机型浏览器不支持H264编码"
        },
        VideoStreamFetchError: {
          name: "VideoStreamFetchError",
          code: 62002,
          desc: "获取流媒体失败"
        },
        VideoStreamSwitchError: {
          name: "VideoStreamSwitchError",
          code: 62003,
          desc: "视频流切换失败"
        },
        VideoUserHasBeenLeft: {
          name: "VideoUserHasBeenLeft",
          code: 62005,
          desc: "用户已登出/离开房间"
        },
        VideoContainerNotExist: {
          name: "VideoContainerNotExist",
          code: 62006,
          desc: "未设置画布容器"
        },
        VideoDisabled: {
          name: "VideoDisabled",
          code: 62007,
          desc: "视频功能已被禁用"
        },
        VideoMixStreamExceed: {
          name: "VideoMixStreamExceed",
          code: 62101,
          desc: "新开启或关闭混频功能时，最多只能开启一路设备"
        },
        VideoScreenShareNotSupport: {
          name: "VideoScreenShareNotSupport",
          code: 62102,
          desc: '不支持原生屏幕共享功能，请确认浏览器版本或"chrome://flags/"是否开启"Experimental Web Platform features"'
        }
      }, t.AudioErrorCode = {
        AudioStreamFetchError: {
          name: "AudioStreamFetchError",
          code: 63002,
          desc: "获取音频流失败"
        },
        AudioUserHasBeenLeft: {
          name: "AudioUserHasBeenLeft",
          code: 63005,
          desc: "用户已登出/离开房间"
        },
        AudioDisabled: {
          name: "AudioDisabled",
          code: 63007,
          desc: "音频功能已被禁用"
        },
        MusicalAccompanimentError: {
          name: "AudioMixingError",
          code: 63100,
          desc: "伴音出错"
        },
        AudioFileDownloadError: {
          name: "AudioFileDownloadError",
          code: 63101,
          desc: "伴音文件加载失败"
        },
        MusicalAccompanimentUnsupport: {
          name: "AudioMixingUnsupport",
          code: 63102,
          desc: "该浏览器不支持伴音功能"
        },
        UnpauseMusicalAccompaniment: {
          name: "UnpauseMusicalAccompaniment",
          code: 63103,
          desc: "当前没有暂停伴音"
        },
        pausedMusicalAccompaniment: {
          name: "pausedMusicalAccompaniment",
          code: 63104,
          desc: "已经暂停暂停伴音"
        },
        UnstartMusicalAccompaniment: {
          name: "UnstartMusicalAccompaniment",
          code: 63105,
          desc: "当前没有伴音"
        }
      }, t.DeviceErrorCode = {
        DeviceNotSupport: {
          name: "DeviceNotSupport",
          code: 65001,
          desc: "不支持的设备类型"
        },
        DeviceNotExists: {
          name: "DeviceNotExists",
          code: 65002,
          desc: "设备不存在/无任何设备"
        },
        DeviceVideoOccupied: {
          name: "VideoDeciveOccupied",
          code: 65003,
          desc: "视频设备已被占用"
        },
        DeviceAudioOccupied: {
          name: "AudioDeciveOccupied",
          code: 65004,
          desc: "音频设备已被占用"
        },
        DeviceOpenError: {
          name: "DeviceOpenError",
          code: 65005,
          desc: "设备开启失败，未知错误"
        },
        DeviceNotOpen: {
          name: "DeviceNotOpen",
          code: 65006,
          desc: "设备未开启/未初始化"
        },
        DeviceAlreadyOpen: {
          name: "DeviceAlreadytOpen",
          code: 65007,
          desc: "设备已开启，重复操作"
        },
        DeviceNotAvailable: {
          name: "DeviceNotAvailable",
          code: 65008,
          desc: "获取可用设备列表失败"
        },
        DevicePluginNotInstalled: {
          name: "DevicePluginNotInstalled",
          code: 62008,
          desc: "未安装插件"
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.WEBRTC_GATE_WAY_API = {
        client_login: {
          key: "client_login",
          label: "登录"
        },
        login_ack: {
          key: "login_ack",
          label: "登录响应"
        },
        sdp_offer: {
          key: "sdp_offer",
          label: "发送sdp offer描述"
        },
        sdp_answer: {
          key: "sdp_answer",
          label: "sdp answer响应"
        },
        ice_offer: {
          key: "ice_offer",
          label: "发送ice offer描述"
        },
        ice_answer: {
          key: "ice_answer",
          label: "ice answer响应"
        },
        keep_alive: {
          key: "keep_alive",
          label: "信令层探活"
        },
        keep_alive_ack: {
          key: "keep_alive_ack",
          label: "信令层探活响应"
        },
        sdp_update: {
          key: "sdp_update",
          label: "sdp更新（关闭/打开设备时发送）"
        },
        client_join: {
          key: "client_join",
          label: "人员加入通知"
        },
        client_update: {
          key: "client_update",
          label: "人员更新（关闭/打开设备时发送）"
        },
        client_logout: {
          key: "client_logout",
          label: "人员离开"
        },
        logout: {
          key: "logout",
          label: "退出"
        },
        client_error: {
          key: "client_error",
          label: "客户端出现错误"
        },
        detect_network: {
          key: "net_detect_result",
          label: "网关反馈网络探测结果"
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.SDP_ANSWER_OF_WEBRTC = {
        type: "sdp_answer",
        uid: "",
        cid: "",
        params: {
          auth_res: 200,
          dst_id: "",
          content: {
            type: "answer",
            sdp: ""
          }
        }
      }, t.SDP_OFFER_OF_WEBRTC = {
        type: "sdp_offer",
        uid: "",
        cid: "",
        hasAudio: !0,
        hasVideo: !0,
        session_mode: "p2p",
        params: {
          content: {
            type: "offer",
            sdp: ""
          },
          dst_id: "",
          user_token_type: 0,
          user_type: 3,
          version: 1,
          is_multi_peerconnection: !0,
          sdk_version: "5.4.0",
          streamSetting: {
            video: {
              width: 640,
              height: 480,
              frameRate: 20
            }
          }
        },
        browser: {
          name: "",
          version: ""
        },
        bypass_rtmp: {
          is_host: !1,
          support_bypass_rtmp: !1,
          support_bypass_rtmp_record: !1,
          bypass_rtmp_url: "",
          layout: "",
          participant_mode: ""
        },
        record: {
          support_audio_record: !1,
          support_video_record: !1
        }
      }, t.SDP_UPDATE_OF_WEBRTC = {
        type: "sdp_update",
        uid: "",
        cid: "",
        hasAudio: !0,
        hasVideo: !0,
        session_mode: "p2p",
        params: {
          content: {
            type: "offer",
            sdp: ""
          },
          dst_id: "",
          user_token_type: 0,
          user_type: 3,
          version: 1,
          is_multi_peerconnection: !0,
          sdk_version: "5.4.0",
          streamSetting: {
            video: {
              width: 640,
              height: 480,
              frameRate: 20
            }
          }
        },
        browser: {
          name: "",
          version: ""
        },
        bypass_rtmp: {
          is_host: !1,
          support_bypass_rtmp: !1,
          support_bypass_rtmp_record: !1,
          bypass_rtmp_url: "",
          layout: "",
          participant_mode: ""
        },
        record: {
          support_audio_record: !1,
          support_video_record: !1
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.LOGIN_ACK_OF_WEBRTC = {
        type: "login_ack",
        uid: "",
        cid: "",
        params: {
          auth_res: 200
        }
      }, t.LOGOUT_OF_WEBRTC = {
        type: "logout",
        uid: "",
        cid: "",
        browser: {
          name: "",
          version: ""
        },
        params: {
          content: {
            timestamp: 0
          }
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.KEEP_ALIVE_OF_WEBRTC = {
        type: "keep_alive",
        uid: "",
        cid: "",
        browser: {
          name: "",
          version: ""
        },
        params: {
          content: {
            timestamp: 0
          }
        }
      }, t.KEEP_ALIVE_ACK_OF_WEBRTC = {
        type: "keep_alive_ack",
        uid: "",
        cid: "",
        params: {
          content: {
            timestamp: 0
          }
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.ICE_ANSWER_OF_WEBRTC = {
        type: "ice_answer",
        uid: "",
        cid: "",
        params: {
          dst_id: "",
          content: {
            candidate: "",
            sdpMid: "",
            sdpMLineIndex: ""
          }
        }
      }, t.ICE_OFFER_OF_WEBRTC = {
        type: "ice_offer",
        uid: "",
        cid: "",
        params: {
          dst_id: "",
          content: {
            candidate: "",
            sdpMid: "",
            sdpMLineIndex: "",
            usernameFragment: ""
          }
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.CLIENT_LOGIN_OF_WEBRTC = {
        type: "client_login",
        uid: "",
        cid: "",
        hasAudio: !0,
        hasVideo: !0,
        netDetect: !1,
        session_mode: "p2p",
        params: {
          content: {},
          dst_id: "",
          user_token_type: 0,
          token: "",
          user_type: 3,
          version: 1,
          is_multi_peerconnection: !0,
          sdk_version: "5.4.0",
          streamSetting: {
            video: {
              width: 640,
              height: 480,
              frameRate: 20
            }
          }
        },
        browser: {
          name: "",
          version: ""
        },
        bypass_rtmp: {
          is_host: !1,
          support_bypass_rtmp: !1,
          support_bypass_rtmp_record: !1,
          bypass_rtmp_url: "",
          layout: "",
          participant_mode: ""
        },
        record: {
          support_audio_record: !1,
          support_video_record: !1,
          single_record_in_meeting: !1
        }
      }, t.CLIENT_LOGOUT_OF_WEBRTC = {
        type: "client_logout",
        uid: "",
        cid: "",
        params: {
          content: {
            logout_type: "normal",
            timestamp: 0
          }
        }
      }, t.CLIENT_JOIN_OF_WEBRTC = {
        type: "client_join",
        uid: "",
        cid: "",
        params: {
          client_id: "123122",
          has_audio: !0,
          has_video: !0
        }
      }, t.CLIENT_UPDATE_OF_WEBRTC = {
        type: "client_update",
        uid: "",
        cid: "",
        params: {
          client_id: "123122",
          has_audio: !0,
          has_video: !0
        }
      }, t.CLIENT_DETECT_NETWORK_RESULT_WEBRTC = {
        type: "net_detect_result",
        uid: "",
        cid: "",
        params: {
          dst_id: "",
          loss: "",
          rtt: ""
        }
      }, t.CLIENT_ERROR_OF_WEBRTC = {
        type: "client_error",
        uid: "",
        cid: "",
        params: {
          content: {
            error_code: "",
            timestamp: 0
          }
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(192);
      Object.defineProperty(t, "CLIENT_JOIN_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_JOIN_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_LOGIN_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_LOGIN_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_LOGOUT_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_LOGOUT_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_ERROR_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_ERROR_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_DETECT_NETWORK_RESULT_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_DETECT_NETWORK_RESULT_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_UPDATE_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_UPDATE_OF_WEBRTC
        }
      });
      var n = r(191);
      Object.defineProperty(t, "ICE_ANSWER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return n.ICE_ANSWER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "ICE_OFFER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return n.ICE_OFFER_OF_WEBRTC
        }
      });
      var a = r(190);
      Object.defineProperty(t, "KEEP_ALIVE_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.KEEP_ALIVE_OF_WEBRTC
        }
      }), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return a.KEEP_ALIVE_ACK_OF_WEBRTC
        }
      });
      var o = r(189);
      Object.defineProperty(t, "LOGIN_ACK_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return o.LOGIN_ACK_OF_WEBRTC
        }
      }), Object.defineProperty(t, "LOGOUT_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return o.LOGOUT_OF_WEBRTC
        }
      });
      var s = r(188);
      Object.defineProperty(t, "SDP_ANSWER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return s.SDP_ANSWER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "SDP_OFFER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return s.SDP_OFFER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "SDP_UPDATE_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return s.SDP_UPDATE_OF_WEBRTC
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(193);
      Object.defineProperty(t, "CLIENT_JOIN_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_JOIN_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_LOGIN_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_LOGIN_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_LOGOUT_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_LOGOUT_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_ERROR_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_ERROR_OF_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_DETECT_NETWORK_RESULT_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_DETECT_NETWORK_RESULT_WEBRTC
        }
      }), Object.defineProperty(t, "CLIENT_UPDATE_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.CLIENT_UPDATE_OF_WEBRTC
        }
      }), Object.defineProperty(t, "ICE_ANSWER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.ICE_ANSWER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "ICE_OFFER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.ICE_OFFER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "KEEP_ALIVE_ACK_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.KEEP_ALIVE_ACK_OF_WEBRTC
        }
      }), Object.defineProperty(t, "KEEP_ALIVE_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.KEEP_ALIVE_OF_WEBRTC
        }
      }), Object.defineProperty(t, "LOGIN_ACK_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.LOGIN_ACK_OF_WEBRTC
        }
      }), Object.defineProperty(t, "LOGOUT_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.LOGOUT_OF_WEBRTC
        }
      }), Object.defineProperty(t, "SDP_ANSWER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.SDP_ANSWER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "SDP_OFFER_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.SDP_OFFER_OF_WEBRTC
        }
      }), Object.defineProperty(t, "SDP_UPDATE_OF_WEBRTC", {
        enumerable: !0,
        get: function() {
          return i.SDP_UPDATE_OF_WEBRTC
        }
      });
      var n = r(187);
      Object.defineProperty(t, "WEBRTC_GATE_WAY_API", {
        enumerable: !0,
        get: function() {
          return n.WEBRTC_GATE_WAY_API
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.GATE_WAY_RESPONSE_CODE = {
        OK: "OK",
        NO_CONNECTION: "NO_CONNECTION"
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(195);
      Object.defineProperty(t, "GATE_WAY_RESPONSE_CODE", {
        enumerable: !0,
        get: function() {
          return i.GATE_WAY_RESPONSE_CODE
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.SetVideoViewRemoteSizeRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.SetVideoViewRemoteSizeRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.account,
          i = t.width,
          n = t.height,
          o = t.cut;
        this.account = r, this.width = i, this.height = n, this.cut = o
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.SetVideoViewSizeRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.SetVideoViewSizeRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.width,
          i = t.height,
          n = t.cut;
        this.width = r, this.height = i, this.cut = n
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.StartRemoteStreamRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.StartRemoteStreamRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.account,
          i = t.node,
          n = t.poster;
        this.account = r, this.node = i, this.poster = n
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.StartDeviceRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.StartDeviceRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.type,
          i = t.device,
          n = t.width,
          o = t.height,
          s = t.account,
          c = t.uid;
        this.type = r, this.device = i, void 0 !== n && (this.width = n), void 0 !== o && (this.height = o),
          void 0 !== s && (this.account = s), void 0 !== c && (this.uid = c)
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.SetVideoScaleRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.SetVideoScaleRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.account,
          i = t.type;
        this.account = r, this.type = i
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.JoinChannelRequestParam4NRTC = void 0;
      var i = {
        channelName: "",
        uid: 0,
        accid: "",
        role: r(109).ROLE_FOR_MEETING.ROLE_PLAYER,
        videoDeviceId: null,
        audioDeviceId: null,
        joinChannelRecordConfig: {
          recordAudio: !1,
          recordVideo: !1,
          recordType: 0,
          isHostSpeaker: !1
        },
        joinChannelLiveConfig: {
          rtmpRecord: !1,
          liveEnable: !1,
          rtmpUrl: "",
          splitMode: 0,
          layout: ""
        }
      };
      t.JoinChannelRequestParam4NRTC = i
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.JoinChannelRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.JoinChannelRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.channelName,
          i = t.type,
          n = t.sessionConfig;
        this.channelName = r, this.type = i, this.sessionConfig = n
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.CreateChannelRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.CreateChannelRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.channelName,
          i = t.custom,
          n = t.webrtcEnable;
        this.channelName = r, this.custom = i, this.webrtcEnable = n
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.ControlRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.ControlRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.channelId,
          i = t.command;
        this.channelId = r, this.command = i
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.ResponseRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.ResponseRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.accepted,
          i = t.beCalledInfo,
          n = t.sessionConfig,
          o = t.channelId,
          s = t.command;
        this.accepted = r, this.beCalledInfo = i, this.sessionConfig = n, this.channelId = o, this.command = s
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.CallRequestParam = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.CallRequestParam = function e(t) {
        (0, a.default)(this, e);
        var r = t.type,
          i = t.webrtcEnable,
          n = t.account,
          o = t.pushConfig,
          s = t.sessionConfig;
        this.type = r, this.webrtcEnable = i, this.account = n, this.pushConfig = o, this.sessionConfig = s
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.ApiParams = void 0;
      var i = r(207),
        n = r(206),
        a = r(205),
        o = r(204),
        s = r(203),
        c = r(202),
        d = r(201),
        u = r(200),
        l = r(199),
        p = r(198),
        f = r(197),
        h = {
          CallRequestParam: i.CallRequestParam,
          ResponseRequestParam: n.ResponseRequestParam,
          ControlRequestParam: a.ControlRequestParam,
          CreateChannelRequestParam: o.CreateChannelRequestParam,
          JoinChannelRequestParam: s.JoinChannelRequestParam,
          JoinChannelRequestParam4NRTC: c.JoinChannelRequestParam4NRTC,
          SetVideoScaleRequestParam: d.SetVideoScaleRequestParam,
          StartDeviceRequestParam: u.StartDeviceRequestParam,
          StartRemoteStreamRequestParam: l.StartRemoteStreamRequestParam,
          SetVideoViewSizeRequestParam: p.SetVideoViewSizeRequestParam,
          SetVideoViewRemoteSizeRequestParam: f.SetVideoViewRemoteSizeRequestParam
        };
      t.ApiParams = h
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.DEFAULT_WEBRTC_OPTION = t.DEFAULT_NRTC_OPTION = t.DEFAULT_NETCALL_OPTION = void 0;
      var i = r(141);
      t.DEFAULT_NETCALL_OPTION = new i.NetcallOption({
        kickLast: !1,
        nim: null,
        container: null,
        remoteContainer: null,
        mirror: !1,
        mirrorRemote: !1
      }), t.DEFAULT_NRTC_OPTION = new i.NRTCOption({
        appkey: "",
        chromeId: null,
        debug: !1
      }), t.DEFAULT_WEBRTC_OPTION = new i.WebRTCOption({
        nim: null,
        container: null,
        remoteContainer: null,
        chromeId: null,
        debug: !1
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(141);
      Object.defineProperty(t, "NetcallOption", {
        enumerable: !0,
        get: function() {
          return i.NetcallOption
        }
      }), Object.defineProperty(t, "WebRTCOption", {
        enumerable: !0,
        get: function() {
          return i.WebRTCOption
        }
      }), Object.defineProperty(t, "NRTCOption", {
        enumerable: !0,
        get: function() {
          return i.NRTCOption
        }
      });
      var n = r(209);
      Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_NETCALL_OPTION
        }
      }), Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_NRTC_OPTION
        }
      }), Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_WEBRTC_OPTION
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.DEFAULT_PUSH_CONFIG = void 0;
      var i = r(143);
      t.DEFAULT_PUSH_CONFIG = new i.PushConfig({
        enable: !0,
        needBadge: !0,
        needPushNick: !0,
        pushContent: "",
        custom: "",
        pushPayload: "",
        sound: !0
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.SCALE_TYPE = {
        CHAT_VIDEO_SCALE_None: 0,
        CHAT_VIDEO_SCALE_1x1: 1,
        CHAT_VIDEO_SCALE_4x3: 2,
        CHAT_VIDEO_SCALE_16x9: 3
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.VIDEO_ENCODE_MODE = {
        CHAT_VIDEO_ENCODEMODE_NORMAL: 0,
        CHAT_VIDEO_ENCODEMODE_SMOOTH: 1,
        CHAT_VIDEO_ENCODEMODE_QUALITY: 2,
        CHAT_VIDEO_ENCODEMODE_SCREEN: 3
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.DECTECT_TYPE = {
        NETDETECT_AUDIO: 0,
        NETDETECT_VIDEO: 1
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.DECTECT_RESULT_TYPE = {
        CHAT_NET_STATUS_VERY_GOOD: 0,
        CHAT_NET_STATUS_GOOD: 1,
        CHAT_NET_STATUS_POOR: 2,
        CHAT_NET_STATUS_BAD: 3,
        CHAT_NET_STATUS_VERY_BAD: 4,
        CHAT_NET_STATUS_VERY_BAD_VIDEO_CLOSE: -1
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.SESSION_MODE = {
        P2P: "p2p",
        MEETING: "meeting"
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.ROLE_FOR_MEETING = {
        ROLE_PLAYER: 0,
        ROLE_AUDIENCE: 1
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.MIX_VIDEO_MODE = {
        LAYOUT_TOP_LEFT: 1,
        LAYOUT_TOP_RIGHT: 2,
        LAYOUT_BOTTOM_LEFT: 3,
        LAYOUT_BOTTOM_RIGHT: 4
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.SPLIT_MODE = {
        LAYOUT_SPLITBOTTOMHORFLOATING: 0,
        LAYOUT_SPLITTOPHORFLOATING: 1,
        LAYOUT_SPLITLATTICETILE: 2,
        LAYOUT_SPLITLATTICECUTTINGTILE: 3,
        LAYOUT_SPLITCUSTOM: 4,
        LAYOUT_SPLITAUDIO: 5
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.NETCALL_TYPE = {
        NETCALL_TYPE_AUDIO: 1,
        NETCALL_TYPE_VIDEO: 2
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.DEVICE_TYPE_REV = t.DEVICE_TYPE = void 0;
      var i, n, a = r(77),
        o = (i = a) && i.__esModule ? i : {
          default: i
        };
      var s = t.DEVICE_TYPE = {
        DEVICE_TYPE_AUDIO_IN: 0,
        DEVICE_TYPE_AUDIO_OUT_LOCAL: 1,
        DEVICE_TYPE_AUDIO_OUT_CHAT: 2,
        DEVICE_TYPE_VIDEO: 3,
        DEVICE_TYPE_DESKTOP_SCREEN: 4,
        DEVICE_TYPE_DESKTOP_WINDOW: 5,
        DEVICE_TYPE_DESKTOP_CHROME_SCREEN: 6
      };
      t.DEVICE_TYPE_REV = (n = {}, (0, o.default)(n, s.DEVICE_TYPE_AUDIO_IN, "audioIn"), (0, o.default)(n, s.DEVICE_TYPE_AUDIO_OUT_LOCAL,
        "audioOut"), (0, o.default)(n, s.DEVICE_TYPE_AUDIO_OUT_CHAT, "audioOut"), (0, o.default)(n, s.DEVICE_TYPE_VIDEO,
        "video"), n)
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.CONFIG_MAP = void 0;
      var i, n, a, o = r(77),
        s = (i = o) && i.__esModule ? i : {
          default: i
        };
      var c = {
        CURRENT: {
          SDK_TYPE: null
        },
        SDK_TYPE: {
          NETCALL: 1,
          WEBRTC: 2,
          WHITEBOARD: 3,
          NRTC: 4
        },
        SDK_NAME: {
          1: "Netcall",
          2: "WebRTC",
          3: "WhiteBoard",
          4: "NRTC"
        }
      };
      c.STATS_FUN = (n = {}, (0, s.default)(n, c.SDK_TYPE.NETCALL, 1), (0, s.default)(n, c.SDK_TYPE.WEBRTC, 1), (
        0, s.default)(n, c.SDK_TYPE.NRTC, 1), (0, s.default)(n, c.SDK_TYPE.WHITEBOARD, 0), n), c.STATS_RTC = (a = {},
        (0, s.default)(a, c.SDK_TYPE.WEBRTC, 1), (0, s.default)(a, c.SDK_TYPE.NRTC, 1), (0, s.default)(a, c.SDK_TYPE
          .WHITEBOARD, 0), a), t.CONFIG_MAP = c
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.CONTROL_TYPE = {
        NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_ON: 1,
        NETCALL_CONTROL_COMMAND_NOTIFY_AUDIO_OFF: 2,
        NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_ON: 3,
        NETCALL_CONTROL_COMMAND_NOTIFY_VIDEO_OFF: 4,
        NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO: 5,
        NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_AGREE: 6,
        NETCALL_CONTROL_COMMAND_SWITCH_AUDIO_TO_VIDEO_REJECT: 7,
        NETCALL_CONTROL_COMMAND_SWITCH_VIDEO_TO_AUDIO: 8,
        NETCALL_CONTROL_COMMAND_BUSY: 9,
        NETCALL_CONTROL_COMMAND_SELF_CAMERA_INVALID: 10,
        NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND: 11,
        NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED: 12,
        NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START: 13,
        NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP: 14,
        NETCALL_CONTROL_COMMAND_SELF_AUDIO_INVALID: 16
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.VIDEO_FRAME_RATE_REV = t.VIDEO_FRAME_RATE = void 0;
      var i, n, a = r(77),
        o = (i = a) && i.__esModule ? i : {
          default: i
        };
      t.validateVideoFrameRate = function(e) {
        var t = Object.keys(s),
          r = !1;
        for (var i in t) s[i] === e && (r = !0);
        return r
      };
      var s = t.VIDEO_FRAME_RATE = {
        CHAT_VIDEO_FRAME_RATE_NORMAL: 0,
        CHAT_VIDEO_FRAME_RATE_5: 1,
        CHAT_VIDEO_FRAME_RATE_10: 2,
        CHAT_VIDEO_FRAME_RATE_15: 3,
        CHAT_VIDEO_FRAME_RATE_20: 4,
        CHAT_VIDEO_FRAME_RATE_25: 5
      };
      t.VIDEO_FRAME_RATE_REV = (n = {}, (0, o.default)(n, s.CHAT_VIDEO_FRAME_RATE_NORMAL, 15), (0, o.default)(n,
        s.CHAT_VIDEO_FRAME_RATE_5, 5), (0, o.default)(n, s.CHAT_VIDEO_FRAME_RATE_10, 10), (0, o.default)(n, s
        .CHAT_VIDEO_FRAME_RATE_15, 15), (0, o.default)(n, s.CHAT_VIDEO_FRAME_RATE_20, 20), (0, o.default)(n,
        s.CHAT_VIDEO_FRAME_RATE_25, 25), n)
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.VIDEO_QUALITY_REV = t.VIDEO_QUALITY = void 0;
      var i, n, a = r(77),
        o = (i = a) && i.__esModule ? i : {
          default: i
        };
      t.validateVideoQuality = function(e) {
        var t = Object.keys(s),
          r = !1;
        for (var i in t) s[i] === e && (r = !0);
        return r
      };
      var s = t.VIDEO_QUALITY = {
        CHAT_VIDEO_QUALITY_NORMAL: 0,
        CHAT_VIDEO_QUALITY_LOW: 1,
        CHAT_VIDEO_QUALITY_MEDIUM: 2,
        CHAT_VIDEO_QUALITY_HIGH: 3,
        CHAT_VIDEO_QUALITY_480P: 4,
        CHAT_VIDEO_QUALITY_540P: 5,
        CHAT_VIDEO_QUALITY_720P: 6,
        CHAT_VIDEO_QUALITY_1080P: 7
      };
      t.VIDEO_QUALITY_REV = (n = {}, (0, o.default)(n, s.CHAT_VIDEO_QUALITY_NORMAL, "640x480"), (0, o.default)(n,
        s.CHAT_VIDEO_QUALITY_LOW, "176x144"), (0, o.default)(n, s.CHAT_VIDEO_QUALITY_MEDIUM, "352x288"), (0,
        o.default)(n, s.CHAT_VIDEO_QUALITY_HIGH, "480x360"), (0, o.default)(n, s.CHAT_VIDEO_QUALITY_480P,
        "640x480"), (0, o.default)(n, s.CHAT_VIDEO_QUALITY_540P, "960x540"), (0, o.default)(n, s.CHAT_VIDEO_QUALITY_720P,
        "1280x720"), (0, o.default)(n, s.CHAT_VIDEO_QUALITY_1080P, "1920x1080"), n)
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.DEFAULT_SESSION_CONFIG = t.DEFAULT_SESSION_CONFIG_P2P = t.DEFAULT_SESSION_CONFIG_P2P_PCAGENT = t.DEFAULT_SESSION_CONFIG_MEETING =
        t.DEFAULT_SESSION_CONFIG_MEETING_PCAGENT = t.DEFAULT_SESSION_CONFIG_LIVE = t.DEFAULT_SESSION_CONFIG_LIVE_PCAGENT =
        void 0;
      var i = r(142),
        n = r(109);
      t.DEFAULT_SESSION_CONFIG_LIVE_PCAGENT = new i.SessionConfig4Live({
        videoQuality: n.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
        videoFrameRate: n.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
        highAudio: !1,
        recordType: 0,
        isHostSpeaker: 0,
        rtmpUrl: "",
        splitMode: n.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
        layout: "",
        videoBitrate: 1e5,
        videoEncodeMode: n.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL
      }), t.DEFAULT_SESSION_CONFIG_LIVE = new i.SessionConfig4Live({
        videoQuality: n.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
        videoFrameRate: n.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
        highAudio: !1,
        rtmpUrl: "",
        splitMode: n.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
        layout: ""
      }), t.DEFAULT_SESSION_CONFIG_MEETING_PCAGENT = new i.SessionConfig4Meeting({
        videoQuality: n.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
        videoFrameRate: n.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
        highAudio: !1,
        isHostSpeaker: !1,
        recordType: 0,
        videoBitrate: 1e5,
        videoEncodeMode: n.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL
      }), t.DEFAULT_SESSION_CONFIG_MEETING = new i.SessionConfig4Meeting({
        videoQuality: n.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
        videoFrameRate: n.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
        highAudio: !1,
        liveEnable: !1
      }), t.DEFAULT_SESSION_CONFIG_P2P_PCAGENT = new i.SessionConfig4P2P({
        videoQuality: n.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
        videoFrameRate: n.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
        highAudio: !1,
        recordVideo: !1,
        recordAudio: !1,
        singleRecord: !1,
        isHostSpeaker: !1,
        recordType: 0,
        videoBitrate: 1e5,
        videoEncodeMode: n.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL
      }), t.DEFAULT_SESSION_CONFIG_P2P = new i.SessionConfig4P2P({
        videoQuality: n.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
        videoFrameRate: n.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
        highAudio: !1,
        recordVideo: !1,
        recordAudio: !1,
        singleRecord: !1,
        isHostSpeaker: !1,
        recordType: "0",
        liveEnabled: !1
      }), t.DEFAULT_SESSION_CONFIG = new i.SessionConfig({
        maxVideoQuality: n.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_HIGH,
        videoQuality: n.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
        videoFrameRate: n.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
        highAudio: !1,
        recordVideo: !1,
        recordAudio: !1,
        singleRecord: !1,
        isHostSpeaker: !1,
        recordType: "0",
        liveEnabled: !1,
        rtmpRecord: !1,
        rtmpUrl: "",
        splitMode: n.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
        layout: ""
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.PushConfig = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.PushConfig = function e(t) {
        (0, a.default)(this, e);
        var r = t.enable,
          i = t.needBadge,
          n = t.needPushNick,
          o = t.pushContent,
          s = t.custom,
          c = t.pushPayload,
          d = t.sound;
        this.enable = r, this.needBadge = i, this.needPushNick = n, this.pushContent = o, this.custom = s, this
          .pushPayload = c, this.sound = d
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(143);
      Object.defineProperty(t, "PushConfig", {
        enumerable: !0,
        get: function() {
          return i.PushConfig
        }
      }), Object.defineProperty(t, "SessionConfig", {
        enumerable: !0,
        get: function() {
          return i.SessionConfig
        }
      }), Object.defineProperty(t, "DEFAULT_PUSH_CONFIG", {
        enumerable: !0,
        get: function() {
          return i.DEFAULT_PUSH_CONFIG
        }
      }), Object.defineProperty(t, "DEFAULT_SESSION_CONFIG", {
        enumerable: !0,
        get: function() {
          return i.DEFAULT_SESSION_CONFIG
        }
      });
      var n = r(210);
      Object.defineProperty(t, "NetcallOption", {
        enumerable: !0,
        get: function() {
          return n.NetcallOption
        }
      }), Object.defineProperty(t, "WebRTCOption", {
        enumerable: !0,
        get: function() {
          return n.WebRTCOption
        }
      }), Object.defineProperty(t, "NRTCOption", {
        enumerable: !0,
        get: function() {
          return n.NRTCOption
        }
      }), Object.defineProperty(t, "DEFAULT_NETCALL_OPTION", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_NETCALL_OPTION
        }
      }), Object.defineProperty(t, "DEFAULT_WEBRTC_OPTION", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_WEBRTC_OPTION
        }
      }), Object.defineProperty(t, "DEFAULT_NRTC_OPTION", {
        enumerable: !0,
        get: function() {
          return n.DEFAULT_NRTC_OPTION
        }
      });
      var a = r(208);
      Object.defineProperty(t, "ApiParams", {
        enumerable: !0,
        get: function() {
          return a.ApiParams
        }
      });
      var o = r(109);
      Object.defineProperty(t, "VIDEO_QUALITY", {
        enumerable: !0,
        get: function() {
          return o.VIDEO_QUALITY
        }
      }), Object.defineProperty(t, "VIDEO_QUALITY_REV", {
        enumerable: !0,
        get: function() {
          return o.VIDEO_QUALITY_REV
        }
      }), Object.defineProperty(t, "validateVideoQuality", {
        enumerable: !0,
        get: function() {
          return o.validateVideoQuality
        }
      }), Object.defineProperty(t, "VIDEO_FRAME_RATE", {
        enumerable: !0,
        get: function() {
          return o.VIDEO_FRAME_RATE
        }
      }), Object.defineProperty(t, "VIDEO_FRAME_RATE_REV", {
        enumerable: !0,
        get: function() {
          return o.VIDEO_FRAME_RATE_REV
        }
      }), Object.defineProperty(t, "validateVideoFrameRate", {
        enumerable: !0,
        get: function() {
          return o.validateVideoFrameRate
        }
      }), Object.defineProperty(t, "CONTROL_TYPE", {
        enumerable: !0,
        get: function() {
          return o.CONTROL_TYPE
        }
      }), Object.defineProperty(t, "CONFIG_MAP", {
        enumerable: !0,
        get: function() {
          return o.CONFIG_MAP
        }
      }), Object.defineProperty(t, "DECTECT_RESULT_TYPE", {
        enumerable: !0,
        get: function() {
          return o.DECTECT_RESULT_TYPE
        }
      }), Object.defineProperty(t, "DECTECT_TYPE", {
        enumerable: !0,
        get: function() {
          return o.DECTECT_TYPE
        }
      }), Object.defineProperty(t, "DEVICE_TYPE", {
        enumerable: !0,
        get: function() {
          return o.DEVICE_TYPE
        }
      }), Object.defineProperty(t, "DEVICE_TYPE_REV", {
        enumerable: !0,
        get: function() {
          return o.DEVICE_TYPE_REV
        }
      }), Object.defineProperty(t, "NETCALL_TYPE", {
        enumerable: !0,
        get: function() {
          return o.NETCALL_TYPE
        }
      }), Object.defineProperty(t, "SCALE_TYPE", {
        enumerable: !0,
        get: function() {
          return o.SCALE_TYPE
        }
      }), Object.defineProperty(t, "SPLIT_MODE", {
        enumerable: !0,
        get: function() {
          return o.SPLIT_MODE
        }
      }), Object.defineProperty(t, "MIX_VIDEO_MODE", {
        enumerable: !0,
        get: function() {
          return o.MIX_VIDEO_MODE
        }
      }), Object.defineProperty(t, "NIM_SIGNALING", {
        enumerable: !0,
        get: function() {
          return o.NIM_SIGNALING
        }
      }), Object.defineProperty(t, "VIDEO_ENCODE_MODE", {
        enumerable: !0,
        get: function() {
          return o.VIDEO_ENCODE_MODE
        }
      }), Object.defineProperty(t, "ROLE_FOR_MEETING", {
        enumerable: !0,
        get: function() {
          return o.ROLE_FOR_MEETING
        }
      }), Object.defineProperty(t, "SESSION_MODE", {
        enumerable: !0,
        get: function() {
          return o.SESSION_MODE
        }
      });
      var s = r(196);
      Object.defineProperty(t, "GATE_WAY_RESPONSE_CODE", {
        enumerable: !0,
        get: function() {
          return s.GATE_WAY_RESPONSE_CODE
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.EVENT_CODE = {
        USER_LEFT_REASON: {
          quit: {
            name: "USER_LEFT_QUIT",
            code: 0,
            desc: "用户主动离开"
          },
          timeout: {
            name: "USER_LEFT_TIMEOUT",
            code: 1,
            desc: "因长时间收不到对方数据包，超时掉线"
          }
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.EVENT_OBJ = {
        error: {
          key: "error",
          label: "异常事件"
        },
        beCalling: {
          key: "beCalling",
          label: "收到呼叫通知"
        },
        callAccepted: {
          key: "callAccepted",
          label: "主叫收到被叫应答通知: 接受"
        },
        callRejected: {
          key: "callRejected",
          label: "主叫收到被叫应答通知: 拒绝"
        },
        control: {
          key: "control",
          label: "通话进行中收到对端的控制通知"
        },
        hangup: {
          key: "hangup",
          label: "收到挂断通知"
        },
        callerAckSync: {
          key: "callerAckSync",
          label: "其他端已处理的通知"
        },
        joinChannel: {
          key: "joinChannel",
          label: "收到自己加入频道的通知"
        },
        leaveChannel: {
          key: "leaveChannel",
          label: "收到自己离开频道的通知"
        },
        userJoined: {
          key: "userJoined",
          label: "收到用户加入频道的通知"
        },
        userLeft: {
          key: "userLeft",
          label: "收到用户离开频道的通知"
        },
        sessionDuration: {
          key: "sessionDuration",
          label: "通话计时"
        },
        audioVolume: {
          key: "audioVolume",
          label: "当前所有参与通话者的音量大小实时回调通知"
        },
        deviceAdd: {
          key: "deviceAdd",
          label: "新增设备的通知"
        },
        deviceRemove: {
          key: "deviceRemove",
          label: "设备移除通知"
        },
        deviceStatus: {
          key: "deviceStatus",
          label: "设备状态变化通知"
        },
        remoteTrack: {
          key: "remoteTrack",
          label: "收到用户媒体流的通知"
        },
        addTrack: {
          key: "addTrack",
          label: "添加轨道事件"
        },
        removeTrack: {
          key: "removeTrack",
          label: "删除轨道事件"
        },
        remoteSignalClosed: {
          key: "remoteSignalClosed",
          label: "远端信令已关闭"
        },
        sessionConnected: {
          key: "sessionConnected",
          label: "会话已连接"
        },
        recordStopped: {
          key: "recordStopped",
          label: "录制已结束"
        },
        gatewayClosed: {
          key: "gatewayClosed",
          label: "网关连接断开"
        },
        userStateUpdated: {
          key: "userUpdated",
          label: "远端状态更新"
        },
        auidoMixingEnd: {
          key: "auidoMixingEnd",
          label: "伴音文件播放完成"
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(230);
      Object.defineProperty(t, "EVENT_OBJ", {
        enumerable: !0,
        get: function() {
          return i.EVENT_OBJ
        }
      });
      var n = r(229);
      Object.defineProperty(t, "EVENT_CODE", {
        enumerable: !0,
        get: function() {
          return n.EVENT_CODE
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = {
          framesEncoded: 1,
          qpSum: 1,
          audioOutputLevel: 1,
          googDecodingCTN: 1,
          googDecodingNormal: 1,
          googAvailableSendBandwidth: 1,
          googTargetEncBitrate: 1,
          googActualEncBitrate: 1,
          googRetransmitBitrate: 1,
          googTransmitBitrate: 1
        },
        n = {
          googCaptureStartNtpTimeMs: 1
        };
      t.default = {
        getStats: function(e) {
          var t = this;
          if (e && !/(failed|closed)/gi.test(e.iceConnectionState)) return navigator.mozGetUserMedia ? this.getStatsFirefox(
            e) : /^((?!chrome).)*safari((?!chrome).)*$/gi.test(navigator.userAgent) ? this.getStatsSafari(
            e) : new Promise(function(r, i) {
            e.getStats(function(i) {
              var n = {};
              i.result().forEach(function(e) {
                var t = {};
                e.names().forEach(function(r) {
                  t[r] = e.stat(r)
                }), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, n[t.id] = t
              }), e.lastStats = e.lastStats || {}, n = t.format(e, n), r(n)
            })
          })
        },
        getStatsFirefox: function(e) {
          var t = this;
          return e.getStats(null).then(function(r) {
            return e.lastStats = e.lastStats || {}, r = t.format(e, r), Promise.resolve(r)
          })
        },
        getStatsSafari: function(e) {
          var t = this;
          return e.getStats().then(function(r) {
            return e.lastStats = e.lastStats || {}, r = t._formatSSRC_S(e, r), Promise.resolve(r)
          })
        },
        format: function(e, t) {
          return !e || /(failed|closed)/gi.test(e.iceConnectionState) ? {} : t = parseInt(e.uid) - parseInt(e
            .targetUid) == 0 ? this.ssrcLocal(e, t) : this.ssrcRemote(e, t)
        },
        formatSSRC: function(e, t, r, i) {
          return this[navigator.mozGetUserMedia ? "_formatSSRC_F" : "_formatSSRC_G"](e, t, r, i)
        },
        _formatSSRC_G: function(e, t, r, i) {
          var n = this,
            a = {};
          return Object.values(t).map(function(t) {
            if (("recv" !== i || /^ssrc_/gi.test(t.id)) && ("send" !== i ||
                /^(bweforvideo|Conn-audio-1-0|ssrc_)/gi.test(t.id))) {
              t = n.formatData(t);
              var r = new RegExp("ssrc_(\\d+)_" + i),
                o = t.id.match(r),
                s = t.id;
              a[s] = t, o && o[1] && ("recv" !== i || 0 !== e.uid ? (t.id = "ssrc_" + e.uid + "_" + i +
                "_" + ("recv" === i ? e.targetUid : 0) + "_" + t.mediaType, -1 == (t = n.computeData(
                  e, t)).googInterframeDelayMax && (t.googInterframeDelayMax = 0), a[t.id] = t,
                delete a[s]) : delete a[s])
            }
          }), a
        },
        _formatSSRC_F: function(e, t, r, i) {
          var n = this,
            a = {},
            o = new RegExp("^" + ("send" === i ? "outbound" : "inbound") + "_", "i");
          return Object.values(t).map(function(t) {
            if (o.test(t.id)) {
              var r = t.id;
              t.id = t.id.replace(/\d+/, e.uid + "_" + i + "_" + ("recv" === i ? e.targetUid : 0)), t = n
                .computeData(e, t), a[t.id] = t, delete a[r]
            }
          }), a
        },
        _formatSSRC_S: function(e, t) {
          var r = this,
            i = {},
            n = null;
          return t.forEach(function(t) {
            if ("inbound-rtp" === t.type || "inboundrtp" === t.type) {
              if (-1 != t.id.indexOf("Video")) {
                var a = "ssrc_" + ((t = r.computeData(e, t)).ssrc || "123456") + "_recv_0_video";
                n = a, i[a] = {}, i[a].bitsReceivedPerSecond = t.bitsReceivedPerSecond || 0, i[a].bytesReceived =
                  t.bytesReceived || 0, i[a].packetsLost = t.packetsLost || 0, i[a].packetsReceived = t.packetsReceived ||
                  0, i[a].packetsReceivedPerSecond = t.packetsReceivedPerSecond || 0, i[a].framesDecoded =
                  t.framesDecoded || 0, i[a].googFrameRateOutput = t.framesDecoded || 0
              }
            } else if ("outbound-rtp" === t.type || "outboundrtp" === t.type) {
              if (-1 != t.id.indexOf("Video")) {
                var o = "ssrc_" + ((t = r.computeData(e, t)).ssrc || "123456") + "_send_0_video";
                i[o] = {}, i[o].bitsSentPerSecond = t.bitsSentPerSecond || 0, i[o].bytesSent = t.bytesSent ||
                  0, i[o].packetsLost = t.packetsLost || 0, i[o].packetsSent = t.packetsSent || 0, i[o].packetsSentPerSecond =
                  t.packetsSentPerSecond || 0, i[o].framesEncoded = t.framesEncoded || 0, i[o].googFrameRateSent =
                  t.framesEncoded || 0
              }
            } else "track" === t.type && (i.track = t)
          }), i.track && n && (i[n].googFrameHeightReceived = i.track.frameHeight, i[n].googFrameWidthReceived =
            i.track.frameWidth), i
        },
        formatData: function(e) {
          return Object.keys(e).map(function(t) {
            i[t] && (e[t] = (e[t] / 1024).toFixed(2)), n[t] && (e[t] = (e[t] / 1024 / 1024).toFixed(2))
          }), e
        },
        computeData: function(e, t) {
          var r = {
            peer: e,
            ssrcKey: t.ssrc,
            currentItem: t
          };
          return t.bytesSent && (t.bitsSentPerSecond = this.getLastStats(Object.assign({}, r, {
            valueKey: "bytesSent"
          }))), t.packetsSent && (t.packetsSentPerSecond = this.getLastStats(Object.assign({}, r, {
            valueKey: "packetsSent"
          }))), t.bytesReceived && (t.bitsReceivedPerSecond = this.getLastStats(Object.assign({}, r, {
            valueKey: "bytesReceived"
          }))), t.packetsReceived && (t.packetsReceivedPerSecond = this.getLastStats(Object.assign({}, r, {
            valueKey: "packetsReceived"
          }))), t
        },
        ssrcLocal: function(e, t) {
          if (e && e.localDescription) {
            var r = e.localDescription;
            return this.formatSSRC(e, t, r.sdp, "send")
          }
        },
        ssrcRemote: function(e, t) {
          if (e && e.remoteDescription) {
            var r = e.remoteDescription;
            return this.formatSSRC(e, t, r.sdp, "recv")
          }
        },
        getLastStats: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.peer,
            r = e.ssrcKey,
            i = e.valueKey,
            n = e.currentItem,
            a = 0;
          return t.lastStats[r] && t.lastStats[r][i] ? n[i] > t.lastStats[r][i] && (a = n[i] - t.lastStats[r]
            [i]) : (t.lastStats[r] || (t.lastStats[r] = {}), a = n[i]), a = /bytes/gi.test(i) ? Math.round(
            8 * a / 1e3) : a, t.lastStats[r][i] = n[i], a
        }
      }, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = l(r(113)),
        n = l(r(112)),
        a = l(r(1)),
        o = l(r(5)),
        s = l(r(4)),
        c = l(r(3)),
        d = r(10),
        u = l(r(232));

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = function(e) {
        function t(e) {
          (0, a.default)(this, t);
          var r = (0, s.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r.webrtcBusiness = e.webrtcBusiness || null, r.interval = e.interval || 1e3, r
        }
        return (0, c.default)(t, e), (0, o.default)(t, [{
          key: "reset",
          value: function() {
            this.times = 0, this.timer && clearInterval(this.timer), this.timer = null, this.webrtcBusiness =
              null
          }
        }, {
          key: "start",
          value: function() {
            this.timer = setInterval(this.getStats.bind(this), this.interval)
          }
        }, {
          key: "stop",
          value: function() {
            this.reset()
          }
        }, {
          key: "getStats",
          value: function() {
            var e = (0, n.default)(i.default.mark(function e() {
              var t;
              return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (this.webrtcBusiness && this.webrtcBusiness.selfWebRtcInstance &&
                      this.webrtcBusiness.selfWebRtcInstance.rtcConnection) {
                      e.next = 2;
                      break
                    }
                    return e.abrupt("return");
                  case 2:
                    if (!this.webrtcBusiness.adapterRef.imInfo || !this.webrtcBusiness.adapterRef
                      .imInfo.netDetect || this.webrtcBusiness.adapterRef.instance._isDetectNetwork()
                    ) {
                      e.next = 4;
                      break
                    }
                    return e.abrupt("return");
                  case 4:
                    return t = {}, e.next = 7, this.getLocalStats();
                  case 7:
                    return t.self = e.sent, e.next = 10, this.getRemoteStats();
                  case 10:
                    t.other = e.sent;
                    try {
                      Object.keys(t.other).map(function(e) {
                        t.self = Object.assign(t.self, t.other[e])
                      })
                    } catch (e) {
                      console.warn(e)
                    }
                    this.times = (this.times || 0) + 1, this.emit("stats", t.self, this.times);
                  case 14:
                  case "end":
                    return e.stop()
                }
              }, e, this)
            }));
            return function() {
              return e.apply(this, arguments)
            }
          }()
        }, {
          key: "getLocalStats",
          value: function() {
            var e = (0, n.default)(i.default.mark(function e() {
              var t;
              return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if ((t = this.webrtcBusiness) && t.selfWebRtcInstance) {
                      e.next = 3;
                      break
                    }
                    return e.abrupt("return", {});
                  case 3:
                    return e.next = 5, u.default.getStats(t.selfWebRtcInstance.rtcConnection);
                  case 5:
                    return e.abrupt("return", e.sent);
                  case 6:
                  case "end":
                    return e.stop()
                }
              }, e, this)
            }));
            return function() {
              return e.apply(this, arguments)
            }
          }()
        }, {
          key: "getRemoteStats",
          value: function() {
            var e = (0, n.default)(i.default.mark(function e() {
              var t, r, a, o, s, c, d, l, p, f, h = this;
              return i.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if ((t = this.webrtcBusiness) && t.remoteWebRtcInstanceMap) {
                      e.next = 3;
                      break
                    }
                    return e.abrupt("return", {});
                  case 3:
                    r = {}, a = t.remoteWebRtcInstanceMap, o = Object.keys(a).map(function() {
                      var e = (0, n.default)(i.default.mark(function e(t) {
                        return i.default.wrap(function(e) {
                          for (;;) switch (e.prev = e.next) {
                            case 0:
                              if (!a[t] || !a[t].rtcConnection) {
                                e.next = 5;
                                break
                              }
                              return e.next = 3, u.default.getStats(a[t].rtcConnection);
                            case 3:
                              return r[t] = e.sent, e.abrupt("return", r[t]);
                            case 5:
                            case "end":
                              return e.stop()
                          }
                        }, e, h)
                      }));
                      return function(t) {
                        return e.apply(this, arguments)
                      }
                    }()), s = !0, c = !1, d = void 0, e.prev = 9, l = o[Symbol.iterator]();
                  case 11:
                    if (s = (p = l.next()).done) {
                      e.next = 18;
                      break
                    }
                    return f = p.value, e.next = 15, f;
                  case 15:
                    s = !0, e.next = 11;
                    break;
                  case 18:
                    e.next = 24;
                    break;
                  case 20:
                    e.prev = 20, e.t0 = e.catch(9), c = !0, d = e.t0;
                  case 24:
                    e.prev = 24, e.prev = 25, !s && l.return && l.return();
                  case 27:
                    if (e.prev = 27, !c) {
                      e.next = 30;
                      break
                    }
                    throw d;
                  case 30:
                    return e.finish(27);
                  case 31:
                    return e.finish(24);
                  case 32:
                    return e.abrupt("return", r);
                  case 33:
                  case "end":
                    return e.stop()
                }
              }, e, this, [
                [9, 20, 24, 32],
                [25, , 27, 31]
              ])
            }));
            return function() {
              return e.apply(this, arguments)
            }
          }()
        }]), t
      }(d.EventEmitter);
      t.default = p, e.exports = t.default
    }, function(e, t, r) {
      var i = r(16),
        n = r(108);
      e.exports = r(7).getIterator = function(e) {
        var t = n(e);
        if ("function" != typeof t) throw TypeError(e + " is not iterable!");
        return i(t.call(e))
      }
    }, function(e, t, r) {
      r(55), r(51), e.exports = r(234)
    }, function(e, t, r) {
      e.exports = {
        default: r(235),
        __esModule: !0
      }
    }, function(e, t, r) {
      var i = r(78),
        n = r(6)("iterator"),
        a = r(23);
      e.exports = r(7).isIterable = function(e) {
        var t = Object(e);
        return void 0 !== t[n] || "@@iterator" in t || a.hasOwnProperty(i(t))
      }
    }, function(e, t, r) {
      r(55), r(51), e.exports = r(237)
    }, function(e, t, r) {
      e.exports = {
        default: r(238),
        __esModule: !0
      }
    }, function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var i = a(r(239)),
        n = a(r(236));

      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.default = function() {
        return function(e, t) {
          if (Array.isArray(e)) return e;
          if ((0, i.default)(Object(e))) return function(e, t) {
            var r = [],
              i = !0,
              a = !1,
              o = void 0;
            try {
              for (var s, c = (0, n.default)(e); !(i = (s = c.next()).done) && (r.push(s.value), !t || r.length !==
                  t); i = !0);
            } catch (e) {
              a = !0, o = e
            } finally {
              try {
                !i && c.return && c.return()
              } finally {
                if (a) throw o
              }
            }
            return r
          }(e, t);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
      }()
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i, n = r(240),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.default = {
        randomSSRC: function() {
          var e = Math.floor(1e8 * Math.random()) + 1e7;
          return e > 1e8 ? 99999999 : e
        },
        _createLocalDescription: function(e, t) {
          var r = {},
            i = this._iceGatherer.getLocalParameters(),
            n = this._iceGatherer.getLocalCandidates(),
            o = this._dtlsTransport.getLocalParameters(),
            s = this._dtlsTransport.getRemoteParameters(),
            c = this._localCapabilities,
            d = this._localTrackInfos;
          "offer" === t && this._sdpGlobalFields.version++, r.version = 0, r.origin = {
            address: "127.0.0.1",
            ipVer: 4,
            netType: "IN",
            sessionId: this._sdpGlobalFields.id,
            sessionVersion: this._sdpGlobalFields.version,
            username: "jitsi-ortc-webrtc-shim"
          }, r.name = "-", r.timing = {
            start: 0,
            stop: 0
          }, r.msidSemantic = {
            semantic: "WMS",
            token: "*"
          }, r.groups = [{
            mids: Array.from(this._mids.keys()).join(" "),
            type: "BUNDLE"
          }], r.media = [], r.fingerprint = {
            hash: o.fingerprints[0].value,
            type: o.fingerprints[0].algorithm
          };
          var u = !1,
            l = !0,
            p = !1,
            f = void 0;
          try {
            for (var h, m = c.codecs[Symbol.iterator](); !(l = (h = m.next()).done); l = !0) {
              var v = h.value;
              if ("video" === v.kind && "rtx" === v.name) {
                u = !0;
                break
              }
            }
          } catch (e) {
            p = !0, f = e
          } finally {
            try {
              !l && m.return && m.return()
            } finally {
              if (p) throw f
            }
          }
          var g = !0,
            _ = !1,
            R = void 0;
          try {
            for (var y, C = this._mids[Symbol.iterator](); !(g = (y = C.next()).done); g = !0) {
              var S = y.value,
                b = (0, a.default)(S, 2),
                E = b[0],
                T = b[1];
              A.call(this, E, T)
            }
          } catch (e) {
            _ = !0, R = e
          } finally {
            try {
              !g && C.return && C.return()
            } finally {
              if (_) throw R
            }
          }
          return new RTCSessionDescription({
            type: t,
            _sdpObject: r
          });

          function A(e, a) {
            var o = {};
            switch (o.type = a, a) {
              case "audio":
              case "video":
                o.protocol = "RTP/SAVPF", o.port = 9, o.direction = "sendrecv";
                break;
              case "application":
                o.protocol = "DTLS/SCTP", o.port = 0, o.payloads = "0", o.direction = "inactive"
            }
            o.connection = {
              ip: "127.0.0.1",
              version: 4
            }, o.mid = e, o.iceUfrag = i.usernameFragment, o.icePwd = i.password, o.candidates = [];
            var l = !0,
              p = !1,
              f = void 0;
            try {
              for (var h, m = n[Symbol.iterator](); !(l = (h = m.next()).done); l = !0) {
                var v = h.value,
                  g = {
                    component: 1
                  };
                g.foundation = v.foundation, g.ip = v.ip, g.port = v.port, g.priority = v.priority, g.transport =
                  v.protocol.toLowerCase(), g.type = v.type, "tcp" === g.transport && (g.tcptype = v.tcpType),
                  o.candidates.push(g)
              }
            } catch (e) {
              p = !0, f = e
            } finally {
              try {
                !l && m.return && m.return()
              } finally {
                if (p) throw f
              }
            }
            if (o.endOfCandidates = "end-of-candidates", o.setup = "offer" === t ? "actpass" : "server" ===
              s.role ? "active" : "passive", "audio" === a || "video" === a) {
              o.rtp = [], o.rtcpFb = [], o.fmtp = [];
              var _ = [],
                R = !0,
                y = !1,
                C = void 0;
              try {
                for (var S, b = c.codecs[Symbol.iterator](); !(R = (S = b.next()).done); R = !0) {
                  var E = S.value;
                  if (!E.kind || E.kind === a) {
                    _.push(E.preferredPayloadType);
                    var T = {
                      codec: E.name,
                      payload: E.preferredPayloadType,
                      rate: E.clockRate
                    };
                    if (E.numChannels > 1 && (T.encoding = E.numChannels), o.rtp.push(T), E.parameters) {
                      var A = {
                          config: "",
                          payload: E.preferredPayloadType
                        },
                        O = !0,
                        P = !1,
                        k = void 0;
                      try {
                        for (var I, D = Object.keys(E.parameters)[Symbol.iterator](); !(O = (I = D.next()).done); O = !
                          0) {
                          var w = I.value;
                          A.config && (A.config += ";"), A.config += w + "=" + E.parameters[w]
                        }
                      } catch (e) {
                        P = !0, k = e
                      } finally {
                        try {
                          !O && D.return && D.return()
                        } finally {
                          if (P) throw k
                        }
                      }
                      A.config && o.fmtp.push(A)
                    }
                    var M = !0,
                      x = !1,
                      N = void 0;
                    try {
                      for (var L, V = (E.rtcpFeedback || [])[Symbol.iterator](); !(M = (L = V.next()).done); M = !
                        0) {
                        var j = L.value;
                        o.rtcpFb.push({
                          payload: E.preferredPayloadType,
                          subtype: j.parameter || void 0,
                          type: j.type
                        })
                      }
                    } catch (e) {
                      x = !0, N = e
                    } finally {
                      try {
                        !M && V.return && V.return()
                      } finally {
                        if (x) throw N
                      }
                    }
                  }
                }
              } catch (e) {
                y = !0, C = e
              } finally {
                try {
                  !R && b.return && b.return()
                } finally {
                  if (y) throw C
                }
              }
              0 === _.length ? (o.payloads = "9", o.port = 0, o.direction = "inactive") : o.payloads = _.join(
                " "), o.ssrcs = [], o.ssrcGroups = [];
              var W = !0,
                U = !1,
                B = void 0;
              try {
                for (var F, H = d.values()[Symbol.iterator](); !(W = (F = H.next()).done); W = !0) {
                  var G = F.value,
                    Y = G.rtpSender,
                    J = G.stream.id,
                    K = Y.track;
                  if ("ended" !== K.readyState && K.kind === a) {
                    G.ssrc || (G.ssrc = this.randomSSRC());
                    var z = u && "video" === K.kind;
                    z && !G.rtxSsrc && (G.rtxSsrc = G.ssrc + 1), o.ssrcs.push({
                      attribute: "cname",
                      id: G.ssrc,
                      value: CNAME
                    }), o.ssrcs.push({
                      attribute: "msid",
                      id: G.ssrc,
                      value: J + " " + K.id
                    }), o.ssrcs.push({
                      attribute: "mslabel",
                      id: G.ssrc,
                      value: J
                    }), o.ssrcs.push({
                      attribute: "label",
                      id: G.ssrc,
                      value: K.id
                    }), z && (o.ssrcs.push({
                      attribute: "cname",
                      id: G.rtxSsrc,
                      value: CNAME
                    }), o.ssrcs.push({
                      attribute: "msid",
                      id: G.rtxSsrc,
                      value: J + " " + K.id
                    }), o.ssrcs.push({
                      attribute: "mslabel",
                      id: G.rtxSsrc,
                      value: J
                    }), o.ssrcs.push({
                      attribute: "label",
                      id: G.rtxSsrc,
                      value: K.id
                    }), o.ssrcGroups.push({
                      semantics: "FID",
                      ssrcs: G.ssrc + " " + G.rtxSsrc
                    }))
                  }
                }
              } catch (e) {
                U = !0, B = e
              } finally {
                try {
                  !W && H.return && H.return()
                } finally {
                  if (U) throw B
                }
              }
              o.ext = [];
              var Q = !0,
                q = !1,
                $ = void 0;
              try {
                for (var X, Z = c.headerExtensions[Symbol.iterator](); !(Q = (X = Z.next()).done); Q = !0) {
                  var ee = X.value;
                  ee.kind && ee.kind !== a || o.ext.push({
                    value: ee.preferredId,
                    uri: ee.uri
                  })
                }
              } catch (e) {
                q = !0, $ = e
              } finally {
                try {
                  !Q && Z.return && Z.return()
                } finally {
                  if (q) throw $
                }
              }
              o.rtcpMux = "rtcp-mux", o.rtcpRsize = "rtcp-rsize"
            }
            r.media.push(o)
          }
        },
        mergeConstraints: function(e, t) {
          if (!e || !t) return e || t;
          var r = e;
          for (var i in t) r[i] = t[i];
          return r
        },
        iceCandidateType: function(e) {
          return e.split(" ")[7]
        },
        formatTypePreference: function(e) {
          if (/Chrome\/\d+/.test(navigator.userAgent)) switch (e) {
            case 0:
              return "TURN/TLS";
            case 1:
              return "TURN/TCP";
            case 2:
              return "TURN/UDP"
          } else if (/Firefox\/\d+/.test(navigator.userAgent)) switch (e) {
            case 0:
              return "TURN/TCP";
            case 5:
              return "TURN/UDP"
          }
          return ""
        },
        maybeSetOpusOptions: function(e, t) {
          return "true" === t.opusStereo ? e = this.setCodecParam(e, "opus/48000", "stereo", "1") : "false" ===
            t.opusStereo && (e = this.removeCodecParam(e, "opus/48000", "stereo")), "true" === t.opusFec ? e =
            this.setCodecParam(e, "opus/48000", "useinbandfec", "1") : "false" === t.opusFec && (e = this.removeCodecParam(
              e, "opus/48000", "useinbandfec")), "true" === t.opusDtx ? e = this.setCodecParam(e,
              "opus/48000", "usedtx", "1") : "false" === t.opusDtx && (e = this.removeCodecParam(e,
              "opus/48000", "usedtx")), t.opusMaxPbr && (e = this.setCodecParam(e, "opus/48000",
              "maxplaybackrate", t.opusMaxPbr)), e
        },
        maybeSetAudioSendBitRate: function(e, t) {
          return t.audioSendBitrate ? (console.log("Prefer audio send bitrate: " + t.audioSendBitrate), this.preferBitRate(
            e, t.audioSendBitrate, "audio")) : e
        },
        maybeSetAudioReceiveBitRate: function(e, t) {
          return t.audioRecvBitrate ? (console.log(
              "SDPUtil:maybeSetAudioReceiveBitRate Prefer audio receive bitrate: " + t.audioRecvBitrate),
            this.preferBitRate(e, t.audioRecvBitrate, "audio")) : e
        },
        maybeSetVideoSendBitRate: function(e, t) {
          return t.videoSendBitrate ? (console.log("SDPUtil:maybeSetVideoSendBitRate video send bitrate: " +
            t.videoSendBitrate), this.preferBitRate(e, t.videoSendBitrate, "video")) : e
        },
        maybeSetVideoReceiveBitRate: function(e, t) {
          return t.videoRecvBitrate ? (console.log(
            "SDPUtil:maybeSetVideoReceiveBitRate video receive bitrate: " + t.videoRecvBitrate), this.preferBitRate(
            e, t.videoRecvBitrate, "video")) : e
        },
        preferBitRate: function(e, t, r) {
          var i = e.split("\r\n"),
            n = this.findLine(i, "m=", r);
          if (null === n) return console.log(
            "SDPUtil:preferBitRate Failed to add bandwidth line to sdp, as no m-line found"), e;
          var a = this.findLineInRange(i, n + 1, -1, "m=");
          null === a && (a = i.length);
          var o = this.findLineInRange(i, n + 1, a, "c=");
          if (null === o) return console.log(
            "SDPUtil:preferBitRate Failed to add bandwidth line to sdp, as no c-line found"), e;
          var s = this.findLineInRange(i, o + 1, a, "b=AS");
          s && i.splice(s, 1);
          var c = "b=AS:" + t;
          return i.splice(o + 1, 0, c), e = i.join("\r\n")
        },
        maybeSetVideoSendInitialBitRate: function(e, t) {
          var r = t.videoSendInitialBitrate;
          if (!r) return e;
          var i = r,
            n = t.videoSendBitrate;
          n && (r > n && (console.log(
            "SDPUtil:maybeSetVideoSendInitialBitRate Clamping initial bitrate to max bitrate of " + n +
            " kbps."), r = n, t.videoSendInitialBitrate = r), i = n);
          var a = e.split("\r\n");
          if (null === this.findLine(a, "m=", "video")) return console.log(
            "SDPUtil:maybeSetVideoSendInitialBitRate Failed to find video m-line"), e;
          var o = t.videoRecvCodec;
          return e = this.setCodecParam(e, o, "x-google-min-bitrate", t.videoSendInitialBitrate.toString()),
            e = this.setCodecParam(e, o, "x-google-max-bitrate", i.toString())
        },
        removePayloadTypeFromMline: function(e, t) {
          e = e.split(" ");
          for (var r = 0; r < e.length; ++r) e[r] === t.toString() && e.splice(r, 1);
          return e.join(" ")
        },
        removeCodecByName: function(e, t) {
          var r = this.findLine(e, "a=rtpmap", t);
          if (null === r) return e;
          var i = this.getCodecPayloadTypeFromLine(e[r]);
          e.splice(r, 1);
          var n = this.findLine(e, "m=", "video");
          return null === n ? e : (e[n] = this.removePayloadTypeFromMline(e[n], i), e)
        },
        removeCodecByPayloadType: function(e, t) {
          var r = this.findLine(e, "a=rtpmap", t.toString());
          if (null === r) return e;
          e.splice(r, 1);
          var i = this.findLine(e, "m=", "video");
          return null === i ? e : (e[i] = this.removePayloadTypeFromMline(e[i], t), e)
        },
        maybeRemoveVideoFec: function(e, t) {
          if ("false" !== t.videoFec) return e;
          var r = e.split("\r\n"),
            i = this.findLine(r, "a=rtpmap", "red");
          if (null === i) return e;
          var n = this.getCodecPayloadTypeFromLine(r[i]);
          if (r = this.removeCodecByPayloadType(r, n), r = this.removeCodecByName(r, "ulpfec"), null === (i =
              this.findLine(r, "a=fmtp", n.toString()))) return e;
          var a = this.parseFmtpLine(r[i]).pt;
          return null === a ? e : (r.splice(i, 1), (r = this.removeCodecByPayloadType(r, a)).join("\r\n"))
        },
        maybePreferAudioSendCodec: function(e, t) {
          return this.maybePreferCodec(e, "audio", "send", t.audioSendCodec)
        },
        maybePreferAudioReceiveCodec: function(e, t) {
          return this.maybePreferCodec(e, "audio", "receive", t.audioRecvCodec)
        },
        maybePreferVideoSendCodec: function(e, t) {
          return this.maybePreferCodec(e, "video", "send", t.videoSendCodec)
        },
        maybePreferVideoReceiveCodec: function(e, t) {
          return this.maybePreferCodec(e, "video", "receive", t.videoRecvCodec)
        },
        maybePreferCodec: function(e, t, r, i) {
          var n = t + " " + r + " codec";
          if (!i) return console.log("SDPUtil:maybePreferCodec No preference on " + n + "."), e;
          console.log("SDPUtil:maybePreferCodec Prefer " + n + ": " + i);
          var a = e.split("\r\n"),
            o = this.findLine(a, "m=", t);
          if (null === o) return e;
          var s = this.getCodecPayloadType(a, i);
          return s ? a[o] = this.setDefaultCodec(a[o], s) : console.error(
            "SDPUtil:maybePreferCodec no prefered codec found for ", i), e = a.join("\r\n")
        },
        setCodecParam: function(e, t, r, i) {
          var n = e.split("\r\n"),
            a = this.findFmtpLine(n, t),
            o = {};
          if (null === a) {
            var s = this.findLine(n, "a=rtpmap", t);
            if (null === s) return e;
            var c = this.getCodecPayloadTypeFromLine(n[s]);
            o.pt = c.toString(), o.params = {}, o.params[r] = i, n.splice(s + 1, 0, this.writeFmtpLine(o))
          } else(o = this.parseFmtpLine(n[a])).params[r] = i, n[a] = this.writeFmtpLine(o);
          return e = n.join("\r\n")
        },
        removeCodecParam: function(e, t, r) {
          var i = e.split("\r\n"),
            n = this.findFmtpLine(i, t);
          if (null === n) return e;
          var a = this.parseFmtpLine(i[n]);
          delete a.params[r];
          var o = this.writeFmtpLine(a);
          return null === o ? i.splice(n, 1) : i[n] = o, e = i.join("\r\n")
        },
        parseFmtpLine: function(e) {
          var t = {},
            r = e.indexOf(" "),
            i = e.substring(r + 1).split("; "),
            n = new RegExp("a=fmtp:(\\d+)"),
            a = e.match(n);
          if (!a || 2 !== a.length) return null;
          t.pt = a[1];
          for (var o = {}, s = 0; s < i.length; ++s) {
            var c = i[s].split("=");
            2 === c.length && (o[c[0]] = c[1])
          }
          return t.params = o, t
        },
        writeFmtpLine: function(e) {
          if (!e.hasOwnProperty("pt") || !e.hasOwnProperty("params")) return null;
          var t = e.pt,
            r = e.params,
            i = [],
            n = 0;
          for (var a in r) i[n] = a + "=" + r[a], ++n;
          return 0 === n ? null : "a=fmtp:" + t.toString() + " " + i.join("; ")
        },
        findFmtpLine: function(e, t) {
          var r = this.getCodecPayloadType(e, t);
          return r ? this.findLine(e, "a=fmtp:" + r.toString()) : null
        },
        findLine: function(e, t, r) {
          return this.findLineInRange(e, 0, -1, t, r)
        },
        findLineInRange: function(e, t, r, i, n) {
          for (var a = -1 !== r ? r : e.length, o = t; o < a; ++o)
            if (0 === e[o].indexOf(i) && (!n || -1 !== e[o].toLowerCase().indexOf(n.toLowerCase()))) return o;
          return null
        },
        getCodecPayloadType: function(e, t) {
          var r = this.findLine(e, "a=rtpmap", t);
          return r ? this.getCodecPayloadTypeFromLine(e[r]) : null
        },
        getCodecPayloadTypeFromLine: function(e) {
          var t = new RegExp("a=rtpmap:(\\d+) [a-zA-Z0-9-]+\\/\\d+"),
            r = e.match(t);
          return r && 2 === r.length ? r[1] : null
        },
        setDefaultCodec: function(e, t) {
          var r = e.split(" "),
            i = r.slice(0, 3);
          i.push(t);
          for (var n = 3; n < r.length; n++) r[n] !== t && i.push(r[n]);
          return i.join(" ")
        }
      }, e.exports = t.default
    }, function(e, t, r) {
      var i = r(144),
        n = /%[sdv%]/g,
        a = function(e, t, r) {
          var i = [e + "=" + (t.format instanceof Function ? t.format(t.push ? r : r[t.name]) : t.format)];
          if (t.names)
            for (var a = 0; a < t.names.length; a += 1) {
              var o = t.names[a];
              t.name ? i.push(r[t.name][o]) : i.push(r[t.names[a]])
            } else i.push(r[t.name]);
          return function(e) {
            var t = 1,
              r = arguments,
              i = r.length;
            return e.replace(n, function(e) {
              if (t >= i) return e;
              var n = r[t];
              switch (t += 1, e) {
                case "%%":
                  return "%";
                case "%s":
                  return String(n);
                case "%d":
                  return Number(n);
                case "%v":
                  return ""
              }
            })
          }.apply(null, i)
        },
        o = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
        s = ["i", "c", "b", "a"];
      e.exports = function(e, t) {
        t = t || {}, null == e.version && (e.version = 0), null == e.name && (e.name = " "), e.media.forEach(
          function(e) {
            null == e.payloads && (e.payloads = "")
          });
        var r = t.outerOrder || o,
          n = t.innerOrder || s,
          c = [];
        return r.forEach(function(t) {
          i[t].forEach(function(r) {
            r.name in e && null != e[r.name] ? c.push(a(t, r, e)) : r.push in e && null != e[r.push] &&
              e[r.push].forEach(function(e) {
                c.push(a(t, r, e))
              })
          })
        }), e.media.forEach(function(e) {
          c.push(a("m", i.m[0], e)), n.forEach(function(t) {
            i[t].forEach(function(r) {
              r.name in e && null != e[r.name] ? c.push(a(t, r, e)) : r.push in e && null != e[r.push] &&
                e[r.push].forEach(function(e) {
                  c.push(a(t, r, e))
                })
            })
          })
        }), c.join("\r\n") + "\r\n"
      }
    }, function(e, t, r) {
      var i = function(e) {
          return String(Number(e)) === e ? Number(e) : e
        },
        n = function(e, t, r) {
          var n = e.name && e.names;
          e.push && !t[e.push] ? t[e.push] = [] : n && !t[e.name] && (t[e.name] = {});
          var a = e.push ? {} : n ? t[e.name] : t;
          ! function(e, t, r, n) {
            if (n && !r) t[n] = i(e[1]);
            else
              for (var a = 0; a < r.length; a += 1) null != e[a + 1] && (t[r[a]] = i(e[a + 1]))
          }(r.match(e.reg), a, e.names, e.name), e.push && t[e.push].push(a)
        },
        a = r(144),
        o = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
      t.parse = function(e) {
        var t = {},
          r = [],
          i = t;
        return e.split(/(\r\n|\r|\n)/).filter(o).forEach(function(e) {
          var t = e[0],
            o = e.slice(2);
          "m" === t && (r.push({
            rtp: [],
            fmtp: []
          }), i = r[r.length - 1]);
          for (var s = 0; s < (a[t] || []).length; s += 1) {
            var c = a[t][s];
            if (c.reg.test(o)) return n(c, i, o)
          }
        }), t.media = r, t
      };
      var s = function(e, t) {
        var r = t.split(/=(.+)/, 2);
        return 2 === r.length ? e[r[0]] = i(r[1]) : 1 === r.length && t.length > 1 && (e[r[0]] = void 0), e
      };
      t.parseParams = function(e) {
        return e.split(/\;\s?/).reduce(s, {})
      }, t.parseFmtpConfig = t.parseParams, t.parsePayloads = function(e) {
        return e.split(" ").map(Number)
      }, t.parseRemoteCandidates = function(e) {
        for (var t = [], r = e.split(" ").map(i), n = 0; n < r.length; n += 3) t.push({
          component: r[n],
          ip: r[n + 1],
          port: r[n + 2]
        });
        return t
      }, t.parseImageAttributes = function(e) {
        return e.split(" ").map(function(e) {
          return e.substring(1, e.length - 1).split(",").reduce(s, {})
        })
      }, t.parseSimulcastStreamList = function(e) {
        return e.split(";").map(function(e) {
          return e.split(",").map(function(e) {
            var t, r = !1;
            return "~" !== e[0] ? t = i(e) : (t = i(e.substring(1, e.length)), r = !0), {
              scid: t,
              paused: r
            }
          })
        })
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = a(r(113)),
        n = a(r(112));

      function a(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.default = {
        getDevices: function() {
          var e = this;
          return (0, n.default)(i.default.mark(function t() {
            var r;
            return i.default.wrap(function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (console.log("Device: getDevices: 开始获取设备列表"), r = null, navigator.mediaDevices &&
                    navigator.mediaDevices.enumerateDevices) {
                    e.next = 4;
                    break
                  }
                  return e.abrupt("return", Promise.reject(
                    "your browser not support this feature, see https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices"
                  ));
                case 4:
                  return e.next = 6, navigator.mediaDevices.enumerateDevices().then(function(e) {
                    0 !== e.length && (r = {
                      video: [],
                      audioIn: [],
                      audioOut: []
                    }, e.forEach(function(e) {
                      "videoinput" === e.kind ? r.video.push({
                        deviceId: e.deviceId,
                        label: e.label ? e.label : "camera " + (r.video.length + 1)
                      }) : "audioinput" === e.kind ? r.audioIn.push({
                        deviceId: e.deviceId,
                        label: e.label ? e.label : "microphone " + (r.audioIn.length +
                          1)
                      }) : "audiooutput" === e.kind && r.audioOut.push({
                        deviceId: e.deviceId,
                        label: e.label ? e.label : "speaker " + (r.audioOut.length +
                          1)
                      })
                    }))
                  });
                case 6:
                  return e.abrupt("return", r);
                case 7:
                case "end":
                  return e.stop()
              }
            }, t, e)
          }))()
        }
      }, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      var i = r(17),
        n = r(111),
        a = r(146);
      i(i.S, "Promise", {
        try: function(e) {
          var t = n.f(this),
            r = a(e);
          return (r.e ? t.reject : t.resolve)(r.v), t.promise
        }
      })
    }, function(e, t, r) {
      "use strict";
      var i = r(17),
        n = r(7),
        a = r(8),
        o = r(148),
        s = r(145);
      i(i.P + i.R, "Promise", {
        finally: function(e) {
          var t = o(this, n.Promise || a.Promise),
            r = "function" == typeof e;
          return this.then(r ? function(r) {
            return s(t, e()).then(function() {
              return r
            })
          } : e, r ? function(r) {
            return s(t, e()).then(function() {
              throw r
            })
          } : e)
        }
      })
    }, function(e, t, r) {
      "use strict";
      var i = r(8),
        n = r(7),
        a = r(13),
        o = r(15),
        s = r(6)("species");
      e.exports = function(e) {
        var t = "function" == typeof n[e] ? n[e] : i[e];
        o && t && !t[s] && a.f(t, s, {
          configurable: !0,
          get: function() {
            return this
          }
        })
      }
    }, function(e, t, r) {
      var i = r(20);
      e.exports = function(e, t, r) {
        for (var n in t) r && e[n] ? e[n] = t[n] : i(e, n, t[n]);
        return e
      }
    }, function(e, t, r) {
      var i = r(8),
        n = r(147).set,
        a = i.MutationObserver || i.WebKitMutationObserver,
        o = i.process,
        s = i.Promise,
        c = "process" == r(33)(o);
      e.exports = function() {
        var e, t, r, d = function() {
          var i, n;
          for (c && (i = o.domain) && i.exit(); e;) {
            n = e.fn, e = e.next;
            try {
              n()
            } catch (i) {
              throw e ? r() : t = void 0, i
            }
          }
          t = void 0, i && i.enter()
        };
        if (c) r = function() {
          o.nextTick(d)
        };
        else if (!a || i.navigator && i.navigator.standalone)
          if (s && s.resolve) {
            var u = s.resolve();
            r = function() {
              u.then(d)
            }
          } else r = function() {
            n.call(i, d)
          };
        else {
          var l = !0,
            p = document.createTextNode("");
          new a(d).observe(p, {
            characterData: !0
          }), r = function() {
            p.data = l = !l
          }
        }
        return function(i) {
          var n = {
            fn: i,
            next: void 0
          };
          t && (t.next = n), e || (e = n, r()), t = n
        }
      }
    }, function(e, t) {
      e.exports = function(e, t, r) {
        var i = void 0 === r;
        switch (t.length) {
          case 0:
            return i ? e() : e.call(r);
          case 1:
            return i ? e(t[0]) : e.call(r, t[0]);
          case 2:
            return i ? e(t[0], t[1]) : e.call(r, t[0], t[1]);
          case 3:
            return i ? e(t[0], t[1], t[2]) : e.call(r, t[0], t[1], t[2]);
          case 4:
            return i ? e(t[0], t[1], t[2], t[3]) : e.call(r, t[0], t[1], t[2], t[3])
        }
        return e.apply(r, t)
      }
    }, function(e, t, r) {
      var i = r(37),
        n = r(132),
        a = r(131),
        o = r(16),
        s = r(69),
        c = r(108),
        d = {},
        u = {};
      (t = e.exports = function(e, t, r, l, p) {
        var f, h, m, v, g = p ? function() {
            return e
          } : c(e),
          _ = i(r, l, t ? 2 : 1),
          R = 0;
        if ("function" != typeof g) throw TypeError(e + " is not iterable!");
        if (a(g)) {
          for (f = s(e.length); f > R; R++)
            if ((v = t ? _(o(h = e[R])[0], h[1]) : _(e[R])) === d || v === u) return v
        } else
          for (m = g.call(e); !(h = m.next()).done;)
            if ((v = n(m, _, h.value, t)) === d || v === u) return v
      }).BREAK = d, t.RETURN = u
    }, function(e, t) {
      e.exports = function(e, t, r, i) {
        if (!(e instanceof t) || void 0 !== i && i in e) throw TypeError(r + ": incorrect invocation!");
        return e
      }
    }, function(e, t, r) {
      "use strict";
      var i, n, a, o, s = r(35),
        c = r(8),
        d = r(37),
        u = r(78),
        l = r(17),
        p = r(19),
        f = r(56),
        h = r(252),
        m = r(251),
        v = r(148),
        g = r(147).set,
        _ = r(249)(),
        R = r(111),
        y = r(146),
        C = r(145),
        S = c.TypeError,
        b = c.process,
        E = c.Promise,
        T = "process" == u(b),
        A = function() {},
        O = n = R.f,
        P = !! function() {
          try {
            var e = E.resolve(1),
              t = (e.constructor = {})[r(6)("species")] = function(e) {
                e(A, A)
              };
            return (T || "function" == typeof PromiseRejectionEvent) && e.then(A) instanceof t
          } catch (e) {}
        }(),
        k = function(e) {
          var t;
          return !(!p(e) || "function" != typeof(t = e.then)) && t
        },
        I = function(e, t) {
          if (!e._n) {
            e._n = !0;
            var r = e._c;
            _(function() {
              for (var i = e._v, n = 1 == e._s, a = 0, o = function(t) {
                  var r, a, o, s = n ? t.ok : t.fail,
                    c = t.resolve,
                    d = t.reject,
                    u = t.domain;
                  try {
                    s ? (n || (2 == e._h && M(e), e._h = 1), !0 === s ? r = i : (u && u.enter(), r = s(i),
                      u && (u.exit(), o = !0)), r === t.promise ? d(S("Promise-chain cycle")) : (a = k(
                      r)) ? a.call(r, c, d) : c(r)) : d(i)
                  } catch (e) {
                    u && !o && u.exit(), d(e)
                  }
                }; r.length > a;) o(r[a++]);
              e._c = [], e._n = !1, t && !e._h && D(e)
            })
          }
        },
        D = function(e) {
          g.call(c, function() {
            var t, r, i, n = e._v,
              a = w(e);
            if (a && (t = y(function() {
                T ? b.emit("unhandledRejection", n, e) : (r = c.onunhandledrejection) ? r({
                  promise: e,
                  reason: n
                }) : (i = c.console) && i.error && i.error("Unhandled promise rejection", n)
              }), e._h = T || w(e) ? 2 : 1), e._a = void 0, a && t.e) throw t.v
          })
        },
        w = function(e) {
          return 1 !== e._h && 0 === (e._a || e._c).length
        },
        M = function(e) {
          g.call(c, function() {
            var t;
            T ? b.emit("rejectionHandled", e) : (t = c.onrejectionhandled) && t({
              promise: e,
              reason: e._v
            })
          })
        },
        x = function(e) {
          var t = this;
          t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), I(t, !0))
        },
        N = function(e) {
          var t, r = this;
          if (!r._d) {
            r._d = !0, r = r._w || r;
            try {
              if (r === e) throw S("Promise can't be resolved itself");
              (t = k(e)) ? _(function() {
                var i = {
                  _w: r,
                  _d: !1
                };
                try {
                  t.call(e, d(N, i, 1), d(x, i, 1))
                } catch (e) {
                  x.call(i, e)
                }
              }): (r._v = e, r._s = 1, I(r, !1))
            } catch (e) {
              x.call({
                _w: r,
                _d: !1
              }, e)
            }
          }
        };
      P || (E = function(e) {
        h(this, E, "Promise", "_h"), f(e), i.call(this);
        try {
          e(d(N, this, 1), d(x, this, 1))
        } catch (e) {
          x.call(this, e)
        }
      }, (i = function(e) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !
          1
      }).prototype = r(248)(E.prototype, {
        then: function(e, t) {
          var r = O(v(this, E));
          return r.ok = "function" != typeof e || e, r.fail = "function" == typeof t && t, r.domain = T ?
            b.domain : void 0, this._c.push(r), this._a && this._a.push(r), this._s && I(this, !1), r.promise
        },
        catch: function(e) {
          return this.then(void 0, e)
        }
      }), a = function() {
        var e = new i;
        this.promise = e, this.resolve = d(N, e, 1), this.reject = d(x, e, 1)
      }, R.f = O = function(e) {
        return e === E || e === o ? new a(e) : n(e)
      }), l(l.G + l.W + l.F * !P, {
        Promise: E
      }), r(34)(E, "Promise"), r(247)("Promise"), o = r(7).Promise, l(l.S + l.F * !P, "Promise", {
        reject: function(e) {
          var t = O(this);
          return (0, t.reject)(e), t.promise
        }
      }), l(l.S + l.F * (s || !P), "Promise", {
        resolve: function(e) {
          return C(s && this === o ? E : this, e)
        }
      }), l(l.S + l.F * !(P && r(130)(function(e) {
        E.all(e).catch(A)
      })), "Promise", {
        all: function(e) {
          var t = this,
            r = O(t),
            i = r.resolve,
            n = r.reject,
            a = y(function() {
              var r = [],
                a = 0,
                o = 1;
              m(e, !1, function(e) {
                var s = a++,
                  c = !1;
                r.push(void 0), o++, t.resolve(e).then(function(e) {
                  c || (c = !0, r[s] = e, --o || i(r))
                }, n)
              }), --o || i(r)
            });
          return a.e && n(a.v), r.promise
        },
        race: function(e) {
          var t = this,
            r = O(t),
            i = r.reject,
            n = y(function() {
              m(e, !1, function(e) {
                t.resolve(e).then(r.resolve, i)
              })
            });
          return n.e && i(n.v), r.promise
        }
      })
    }, function(e, t, r) {
      r(74), r(51), r(55), r(253), r(246), r(245), e.exports = r(7).Promise
    }, function(e, t, r) {
      e.exports = {
        default: r(254),
        __esModule: !0
      }
    }, function(e, t) {
      ! function(t) {
        "use strict";
        var r, i = Object.prototype,
          n = i.hasOwnProperty,
          a = "function" == typeof Symbol ? Symbol : {},
          o = a.iterator || "@@iterator",
          s = a.asyncIterator || "@@asyncIterator",
          c = a.toStringTag || "@@toStringTag",
          d = "object" == typeof e,
          u = t.regeneratorRuntime;
        if (u) d && (e.exports = u);
        else {
          (u = t.regeneratorRuntime = d ? e.exports : {}).wrap = y;
          var l = "suspendedStart",
            p = "suspendedYield",
            f = "executing",
            h = "completed",
            m = {},
            v = {};
          v[o] = function() {
            return this
          };
          var g = Object.getPrototypeOf,
            _ = g && g(g(D([])));
          _ && _ !== i && n.call(_, o) && (v = _);
          var R = E.prototype = S.prototype = Object.create(v);
          b.prototype = R.constructor = E, E.constructor = b, E[c] = b.displayName = "GeneratorFunction", u.isGeneratorFunction =
            function(e) {
              var t = "function" == typeof e && e.constructor;
              return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name))
            }, u.mark = function(e) {
              return Object.setPrototypeOf ? Object.setPrototypeOf(e, E) : (e.__proto__ = E, c in e || (e[c] =
                "GeneratorFunction")), e.prototype = Object.create(R), e
            }, u.awrap = function(e) {
              return {
                __await: e
              }
            }, T(A.prototype), A.prototype[s] = function() {
              return this
            }, u.AsyncIterator = A, u.async = function(e, t, r, i) {
              var n = new A(y(e, t, r, i));
              return u.isGeneratorFunction(t) ? n : n.next().then(function(e) {
                return e.done ? e.value : n.next()
              })
            }, T(R), R[c] = "Generator", R[o] = function() {
              return this
            }, R.toString = function() {
              return "[object Generator]"
            }, u.keys = function(e) {
              var t = [];
              for (var r in e) t.push(r);
              return t.reverse(),
                function r() {
                  for (; t.length;) {
                    var i = t.pop();
                    if (i in e) return r.value = i, r.done = !1, r
                  }
                  return r.done = !0, r
                }
            }, u.values = D, I.prototype = {
              constructor: I,
              reset: function(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = r, this.done = !1, this.delegate =
                  null, this.method = "next", this.arg = r, this.tryEntries.forEach(k), !e)
                  for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] =
                    r)
              },
              stop: function() {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
              },
              dispatchException: function(e) {
                if (this.done) throw e;
                var t = this;

                function i(i, n) {
                  return s.type = "throw", s.arg = e, t.next = i, n && (t.method = "next", t.arg = r), !!n
                }
                for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                  var o = this.tryEntries[a],
                    s = o.completion;
                  if ("root" === o.tryLoc) return i("end");
                  if (o.tryLoc <= this.prev) {
                    var c = n.call(o, "catchLoc"),
                      d = n.call(o, "finallyLoc");
                    if (c && d) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc)
                    } else if (c) {
                      if (this.prev < o.catchLoc) return i(o.catchLoc, !0)
                    } else {
                      if (!d) throw new Error("try statement without catch or finally");
                      if (this.prev < o.finallyLoc) return i(o.finallyLoc)
                    }
                  }
                }
              },
              abrupt: function(e, t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var i = this.tryEntries[r];
                  if (i.tryLoc <= this.prev && n.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                    var a = i;
                    break
                  }
                }
                a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
                var o = a ? a.completion : {};
                return o.type = e, o.arg = t, a ? (this.method = "next", this.next = a.finallyLoc, m) : this.complete(
                  o)
              },
              complete: function(e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ?
                  (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type &&
                  t && (this.next = t), m
              },
              finish: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), k(r), m
                }
              },
              catch: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r.tryLoc === e) {
                    var i = r.completion;
                    if ("throw" === i.type) {
                      var n = i.arg;
                      k(r)
                    }
                    return n
                  }
                }
                throw new Error("illegal catch attempt")
              },
              delegateYield: function(e, t, i) {
                return this.delegate = {
                  iterator: D(e),
                  resultName: t,
                  nextLoc: i
                }, "next" === this.method && (this.arg = r), m
              }
            }
        }

        function y(e, t, r, i) {
          var n = t && t.prototype instanceof S ? t : S,
            a = Object.create(n.prototype),
            o = new I(i || []);
          return a._invoke = function(e, t, r) {
            var i = l;
            return function(n, a) {
              if (i === f) throw new Error("Generator is already running");
              if (i === h) {
                if ("throw" === n) throw a;
                return w()
              }
              for (r.method = n, r.arg = a;;) {
                var o = r.delegate;
                if (o) {
                  var s = O(o, r);
                  if (s) {
                    if (s === m) continue;
                    return s
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (i === l) throw i = h, r.arg;
                  r.dispatchException(r.arg)
                } else "return" === r.method && r.abrupt("return", r.arg);
                i = f;
                var c = C(e, t, r);
                if ("normal" === c.type) {
                  if (i = r.done ? h : p, c.arg === m) continue;
                  return {
                    value: c.arg,
                    done: r.done
                  }
                }
                "throw" === c.type && (i = h, r.method = "throw", r.arg = c.arg)
              }
            }
          }(e, r, o), a
        }

        function C(e, t, r) {
          try {
            return {
              type: "normal",
              arg: e.call(t, r)
            }
          } catch (e) {
            return {
              type: "throw",
              arg: e
            }
          }
        }

        function S() {}

        function b() {}

        function E() {}

        function T(e) {
          ["next", "throw", "return"].forEach(function(t) {
            e[t] = function(e) {
              return this._invoke(t, e)
            }
          })
        }

        function A(e) {
          var t;
          this._invoke = function(r, i) {
            function a() {
              return new Promise(function(t, a) {
                ! function t(r, i, a, o) {
                  var s = C(e[r], e, i);
                  if ("throw" !== s.type) {
                    var c = s.arg,
                      d = c.value;
                    return d && "object" == typeof d && n.call(d, "__await") ? Promise.resolve(d.__await).then(
                      function(e) {
                        t("next", e, a, o)
                      },
                      function(e) {
                        t("throw", e, a, o)
                      }) : Promise.resolve(d).then(function(e) {
                      c.value = e, a(c)
                    }, o)
                  }
                  o(s.arg)
                }(r, i, t, a)
              })
            }
            return t = t ? t.then(a, a) : a()
          }
        }

        function O(e, t) {
          var i = e.iterator[t.method];
          if (i === r) {
            if (t.delegate = null, "throw" === t.method) {
              if (e.iterator.return && (t.method = "return", t.arg = r, O(e, t), "throw" === t.method)) return m;
              t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
            }
            return m
          }
          var n = C(i, e.iterator, t.arg);
          if ("throw" === n.type) return t.method = "throw", t.arg = n.arg, t.delegate = null, m;
          var a = n.arg;
          return a ? a.done ? (t[e.resultName] = a.value, t.next = e.nextLoc, "return" !== t.method && (t.method =
            "next", t.arg = r), t.delegate = null, m) : a : (t.method = "throw", t.arg = new TypeError(
            "iterator result is not an object"), t.delegate = null, m)
        }

        function P(e) {
          var t = {
            tryLoc: e[0]
          };
          1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(
            t)
        }

        function k(e) {
          var t = e.completion || {};
          t.type = "normal", delete t.arg, e.completion = t
        }

        function I(e) {
          this.tryEntries = [{
            tryLoc: "root"
          }], e.forEach(P, this), this.reset(!0)
        }

        function D(e) {
          if (e) {
            var t = e[o];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var i = -1,
                a = function t() {
                  for (; ++i < e.length;)
                    if (n.call(e, i)) return t.value = e[i], t.done = !1, t;
                  return t.value = r, t.done = !0, t
                };
              return a.next = a
            }
          }
          return {
            next: w
          }
        }

        function w() {
          return {
            value: r,
            done: !0
          }
        }
      }(function() {
        return this
      }() || Function("return this")())
    }, function(e, t, r) {
      var i = function() {
          return this
        }() || Function("return this")(),
        n = i.regeneratorRuntime && Object.getOwnPropertyNames(i).indexOf("regeneratorRuntime") >= 0,
        a = n && i.regeneratorRuntime;
      if (i.regeneratorRuntime = void 0, e.exports = r(256), n) i.regeneratorRuntime = a;
      else try {
        delete i.regeneratorRuntime
      } catch (e) {
        i.regeneratorRuntime = void 0
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i, n = r(149),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      var o = r(110),
        s = a.default.checkVersion(),
        c = {};
      t.default = {
        fnShake: function(e) {
          var t = this,
            r = e.fn,
            i = e.peer,
            n = void 0 === i ? {} : i;
          if (r) {
            if (n) return n.id || (n.id = Object.keys(c).length + 1), r = "_" + r, c[n.id] || (c[n.id] = {}),
              c[n.id] && c[n.id][r] && (console.log("RtcUtil:fnShake destroy " + r + " timer"),
                clearTimeout(c[n.id][r]), c[n.id][r] = null), console.log("RtcUtil:fnShake create " + r +
                " timer"), new Promise(function(i) {
                c[n.id][r] = setTimeout(function() {
                  c[n.id][r] = null, i(t[r](e))
                }, 200)
              });
            console.error("RtcUtil:fnShake peer is null")
          }
        },
        createOffer: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return this.fnShake({
            peer: e,
            fn: "createOffer"
          })
        },
        _createOffer: function() {
          var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).peer;
          if (e) {
            console.log("RtcUtil:_createOffer ------ do createoffer ------");
            var t = {
              offerToReceiveVideo: 1,
              offerToReceiveAudio: 1
            };
            if (e.uid - e.targetUid != 0) {
              var r = e.getLocalStreams(),
                i = r[0] && r[0].getTracks() || !1;
              i && 0 !== i.length || e.addTransceiver && "Safari" === s.prefix && (e.addTransceiver("audio"),
                e.addTransceiver("video"))
            }
            return console.log("RtcUtil:_createOffer iceConnectionState :", e.iceConnectionState), e.iceConnectionState &&
              "failed" == e.iceConnectionState ? t.iceRestart = !0 : "connected" != e.iceConnectionState &&
              "completed" != e.iceConnectionState && "closed" != e.iceConnectionState && (t.iceRestart = !0),
              e.createOffer(t)
          }
        },
        formatSdp: function() {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = t.offerOrAnswer,
            i = t.uid,
            n = t.highAudio,
            a = t.stero,
            c = t.targetUid,
            d = t.netDetect,
            u = t.codec,
            l = t.chromeScreenShareOpened,
            p = t.stream || new MediaStream,
            f = r.sdp,
            h = r.type,
            m = [],
            v = [],
            g = o.parse(f);
          console.log("RtcUtil:formatSdp " + c + " 原始sdp " + h + " \n", f);
          var _ = p.getAudioTracks()[0],
            R = p.getVideoTracks()[0];
          return g.rtcpXr = "rcvr-rtt=all:10000", g.media && g.media.map(function(t) {
            if (t.candidates && delete t.candidates, t.direction = c !== i ? "recvonly" : /recvonly/.test(
                t.direction) ? "recvonly" : "sendonly", (/audio/.test(t.type) && !_ || /video/.test(t.type) &&
                !R) && delete t.ssrcs && delete t.ssrcGroups && delete t.msid, "audio" === t.type && (v.push(
                t.mid), t, t.rtcpFb && 1 == t.rtcpFb.length && t.rtcpFb.push({
                payload: t.rtcpFb[0].payload,
                type: "nack"
              })), "video" === t.type && R) {
              if (!/h264/i.test(f)) return void console.error("RtcUtil:formatSdp 该机型浏览器不支持H264编码");
              var o = [];
              if (t.rtp && t.rtp.length && t.rtp.map(function(e) {
                  "H264" === e.codec && o.push(e.payload)
                }), t.fmtp && t.fmtp.length && t.fmtp.map(function(e) {
                  l ? -1 != o.indexOf(e.payload) && e.config && (e.config.indexOf(
                    "x-google-min-bitrate=512") > 0 && (e.config = e.config.replace(
                    ";x-google-max-bitrate=2048;x-google-min-bitrate=512;x-google-start-bitrate=1024",
                    "")), -1 === e.config.indexOf("x-google-min-bitrate=1024") && (e.config +=
                    ";x-google-min-bitrate=1024")) : -1 != o.indexOf(e.payload) && e.config && (e.config
                    .indexOf("x-google-min-bitrate=1024") > 0 && (e.config = e.config.replace(
                      ";x-google-min-bitrate=1024", "")), -1 === e.config.indexOf(
                      "x-google-min-bitrate=512") && (e.config +=
                      ";x-google-max-bitrate=2048;x-google-min-bitrate=512;x-google-start-bitrate=1024"
                    ))
                }), "Firefox" === s.prefix && t.msid) {
                var d = t.msid.split(" ");
                if (d[1] == R.id) {
                  d[1] = d[1].replace(/([\da-zA-Z]{4})/, function(e, t, r) {
                    var i = "",
                      n = t,
                      a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e",
                        "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
                        "u", "v", "w", "x", "y", "z"
                      ];
                    e && (n = Math.round(Math.random() * (r - t)) + t);
                    for (var o = 0; o < n; o++) i += a[Math.round(Math.random() * (a.length - 1))];
                    return i
                  }(!1, 4))
                } else d[1] = R.id;
                t.msid = d.join(" ")
              }
            }
            if ("audio" === t.type && (t.ptime = 60, t.maxptime = 60, t.fmtp && t.fmtp.length)) {
              var u = !1,
                p = n ? 48e3 : 16e3;
              t.fmtp.map(function(e) {
                e.config && -1 !== e.config.indexOf("minptime=") && (e.config = e.config.replace(
                    /minptime=\d+/, "minptime=60")), e.config && -1 !== e.config.indexOf(
                    "sprop-maxcapturerate=") && -1 !== e.config.indexOf("maxplaybackrate") && (u = !0,
                    e.config = e.config.replace(/sprop-maxcapturerate=\d+/, "sprop-maxcapturerate=" +
                      p), e.config = e.config.replace(/maxplaybackrate=\d+/, "maxplaybackrate=" + p)),
                  u || (e.config += ";maxplaybackrate=" + p + ";sprop-maxcapturerate=" + p), a && (e.config +=
                    ";maxaveragebitrate=131072;stereo=1;sprop-stereo=1;cbr=1")
              })
            }
            if ("offer" === r.type) {
              var h = t.mid;
              g.groups && g.groups.map(function(e) {
                var r = e.mids.split(" "); - 1 !== r.indexOf(h) && (r.splice(r.indexOf(h), 1, t.mid),
                  e.mids = r.join(" "))
              })
            }
            t.fmtp = e.limitFrame(t.fmtp)
          }), d && (g = this.deleteCodec(g, u)), r.sdp = o.write(g), r.sdp = r.sdp.replace(
            /t=([0-9 ]*)\r\n/, "t=$1\r\na=rtcp-xr:rcvr-rtt=all:10000\r\n"), m.length > 0 && m.map(function(
            e) {
            var t = new RegExp("a=ssrc:" + e + ".+\\r\\n", "gi");
            r.sdp = r.sdp.replace(t, "")
          }), r
        },
        deleteCodec: function(e, t) {
          if (t && e) {
            var r = [];
            return e.media.map(function(e) {
              if ("video" === e.type && (e.rtp && e.rtp.length && e.rtp.map(function(e) {
                  var i = e.codec.toLowerCase();
                  i !== t && "red" !== i && "ulpfec" !== i || r.push(e.payload)
                }), r.length && e.fmtp && e.fmtp.length && e.fmtp.map(function(e) {
                  var t = /apt=(\d*)/gi.exec(e.config);
                  t && t.length && r.map(function(i) {
                    i === parseInt(t[t.length - 1], 10) && r.push(e.payload)
                  })
                }), r.length)) {
                var n = [],
                  a = e.payloads.split(" ");
                a && a.length && a.map(function(e) {
                  r.map(function(t) {
                    e === t && n.push(e)
                  })
                }), n.length && (e.payloads = n.join(" ")), e.fmtp = i(e.fmtp, r), e.rtcpFb = i(e.rtcpFb,
                  r), e.rtp = i(e.rtp, r)
              }
            }), e
          }

          function i(e, t) {
            var r = [];
            if (e.map(function(e) {
                t.map(function(t) {
                  e.payload === t && r.push(e)
                })
              }), r.length) return r
          }
          console.log("RtcUtil:deleteCodec Invalid Argument")
        },
        limitFrame: function(e) {
          return e.map(function(e) {
            /42e01f/gi.test(e.config) && (e.config += ";max-fs=12288")
          }), e
        },
        setMediaBitrates: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.sdp,
            r = e.bit,
            i = void 0 === r ? {} : r,
            n = i.video,
            a = void 0 === n ? 500 : n,
            s = i.audio,
            c = void 0 === s ? 500 : s,
            d = o.parse(t);
          return d.media && d.media.map(function(e) {
            e.bandwidth = [{
              type: navigator.mozGetUserMedia ? "TIAS" : "AS",
              limit: "audio" === e.type ? c : a
            }]
          }), o.write(d)
        },
        formatSSRCChrome: function(e, t, r) {
          return e.map(function(e, i) {
            return e.id = t + "0" + r + "0" + Math.floor(i / 4), e.id -= 0, e
          })
        },
        formatSSRCFirefox: function(e, t, r) {
          return e.map(function(e, i) {
            return e.id = t + "0" + r + "0" + Math.floor(i / 4), e.id -= 0, e
          })
        },
        formatSdpRemote: function(e, t, r) {
          return /Chrome/gi.test(navigator.userAgent) ? this.formatSdpRemoteChrome(e, t, r) : this.formatSdpRemoteFirefox(
            e, t)
        },
        formatSdpRemoteChrome: function(e, t) {
          return -1 === (e = e.replace(/a=msid:.+\r\na=ssrc:\d+ cname:.+/gi, function(e) {
            var t = e.match(/a=ssrc:(\d+)/),
              r = e.match(/a=msid:(.+) (.+)/);
            return t[1] && (e = e.replace("a=msid", "a=ssrc:" + t[1] + " msid")), r[1] && t[1] && (e =
              e + "\r\na=ssrc:" + t[1] + " mslabel:" + r[1]), r[2] && t[1] && (e = e + "\r\na=ssrc:" +
              t[1] + " label:" + r[2]), e
          })).indexOf("b=AS:1024") && t && (e = e.replace(/m=video ([0-9./ A-Z]*)\n/g,
            "m=video $1\nb=AS:1024\n")), console.log("RtcUtil:formatSdpRemoteChrome formated: \n", e), e
        },
        formatSdpRemoteFirefox: function(e, t) {
          if (e = e.replace(/\r\na=msid:.+\r\na=ssrc:\d+ cname:.+/gi, function(e) {
              var t = e.match(/\r\na=ssrc:\d+ cname:.+/);
              return e = (e = e.replace(/a=ssrc:\d+ cname:.+/, "")).replace("a=msid", t[0] + "\r\na=msid")
            }), t && t.sdp) {
            var r = o.parse(e),
              i = o.parse(t.sdp);
            r.media.length, i.media.length
          }
          return console.log("RtcUtil:formatSdpRemoteFirefox: \n", e), e
        },
        parse: function(e) {
          var t = o.parse(e);
          console.log("RtcUtil:parse 原始sdp\n", e), console.log("RtcUtil:parse 处理后sdp\n", t)
        },
        updateMediaStream: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return e.fn = "updateMediaStream", this.fnShake(e)
        },
        _updateMediaStream: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          console.log("RtcUtil:_updateMediaStream", e);
          var t = e.peer,
            r = e.currStream,
            i = e.streams,
            n = void 0 === i ? [] : i,
            a = this.checkCurrStream(t),
            o = {},
            c = t,
            d = r || new MediaStream;
          n.map(function(e) {
            e.getTracks().map(function(e) {
              o[e.id] = e
            })
          });
          var u = Object.keys(a.tracks).filter(function(e) {
            return !o[e]
          });
          console.log("RtcUtil:_updateMediaStream 获取移除的列表", u);
          var l = Object.keys(o).filter(function(e) {
            return !a.tracks[e]
          });
          return console.log("RtcUtil:_updateMediaStream 获取新加的列表", l), u && u.map(function(e) {
            var r = a.tracks[e].sender,
              i = a.tracks[e].track;
            if (i && console.log("RtcUtil:_updateMediaStream remove old track ", i.id), "Firefox" === s.prefix ||
              "Chrome" === s.prefix && s.version >= 72) {
              var n = "audio" === i.kind ? t.audioSender : t.videoSender;
              n && n.replaceTrack(null)
            } else c.removeTrack(r);
            d.removeTrack(i)
          }), l && l.map(function(e) {
            var r = o[e];
            console.log("RtcUtil:_updateMediaStream add new track: ", r && r.id), d.addTrack(r),
              "Firefox" === s.prefix || "Chrome" === s.prefix && s.version >= 72 ? "audio" === r.kind ? t
              .audioSender ? t.audioSender.replaceTrack(r) : t.audioSender = c.addTrack(r, d) : "video" ===
              r.kind && (t.videoSender ? (console.info("RtcUtil:_updateMediaStream open the camera"), t.videoSender
                .replaceTrack(r)) : t.videoSender = c.addTrack(r, d)) : c.addTrack(r, d)
          }), this.checkCurrStream(t), Promise.resolve(d)
        },
        removeTrack: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.peer,
            r = e.currStream,
            i = e.tracks,
            n = void 0 === i ? [] : i;
          if (0 !== n.length) {
            var a = this.checkCurrStream(t);
            n.map(function(e) {
              a.tracks[e.id] && (console.log("RtcUtil:removeTrack ====remove track", e, e.readyState, a.tracks[
                e.id].sender), r.removeTrack(e), t.removeTrack(a.tracks[e.id].sender))
            })
          }
        },
        checkCurrStream: function(e) {
          var t = {},
            r = [],
            i = e.getSenders();
          return i && i.map(function(e) {
            var i = e.track;
            i ? (t[i.id] = {
              sender: e,
              track: i
            }, console.log("RtcUtil: checkCurrStream --\x3e track id:", i.kind + ":" + i.id)) : r.push(
              e)
          }), {
            tracks: t,
            empty: r
          }
        },
        checkMediaStatus: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.videoTrack,
            r = e.sdp,
            i = (e.uid, {
              video: !1
            });
          return i.video = new RegExp(t.id).test(r), console.log("checkMediaStatus ----\x3e result", i), i
        },
        checkMeidaExistent: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.sdp,
            r = e.type,
            i = !0,
            n = o.parse(t);
          return n.media && n.media && n.media.map(function(e) {
            e.type && e.type === r && ("sendonly" == e.direction && e.ssrcs && e.ssrcs.length ? (console.log(
              "对方发送媒体流"), i = !0) : (console.log("对方不发送媒体流"), i = !1))
          }), console.log("isExisten: ", i), i
        },
        validMediaStream: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.sdp,
            r = e.msid,
            i = e.trackid;
          if (!r || !i) return !1;
          var n = !1;
          return r && (n = new RegExp(r).test(t)), n ? (i && (n = new RegExp(i).test(t)), n) : n
        }
      }, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = o(r(1)),
        n = o(r(5)),
        a = r(24);

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = r(2),
        c = s.info.nrtcVersion,
        d = r(22),
        u = "//statistic.live.126.net/webrtc/stat",
        l = function() {
          function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, i.default)(this, e);
            var r = t.appkey;
            this.infos = {}, this.init(r), this.resetStatus()
          }
          return (0, n.default)(e, [{
            key: "resetStatus",
            value: function() {}
          }, {
            key: "init",
            value: function(e) {
              this.infos = Object.assign(this.infos, {
                interval: 30,
                ver: 2,
                platform: p.convertPlatform(d.os.family) + "-" + d.os.version,
                browser: d.name + "-" + d.version,
                sdk_ver: c || "3.6.0",
                uid: null,
                appkey: e,
                time: null,
                data: {}
              })
            }
          }, {
            key: "clear",
            value: function() {
              this.infos.data = {}
            }
          }, {
            key: "start",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this.infos.appkey = e.appKey || e.appkey || this.infos.appkey, this.infos.cid = e.cid, this
                .infos.uid = e.uid
            }
          }, {
            key: "stop",
            value: function() {
              this.clear()
            }
          }, {
            key: "update",
            value: function(e) {
              this.infos.data["stat_" + Date.now()] = e, Object.keys(this.infos.data).length === this.infos
                .interval && this.send()
            }
          }, {
            key: "send",
            value: function() {
              var e = this;
              0 !== Object.keys(this.infos.data).length && (this.infos.time = Date.now(), s.wssServer &&
                (u = u.replace("statistic.live.126.net", s.wssServer)), (0, a.ajax)({
                  type: "post",
                  url: u,
                  data: this.infos
                }).then(function(t) {
                  e.clear()
                }).catch(function(e) {
                  console.log("err", e)
                }))
            }
          }]), e
        }();
      t.default = l;
      var p = {
        convertNetwork: function(e) {
          return {
            wlan: "wifi",
            lan: "ethernet"
          } [e] || "unknown"
        },
        convertPlatform: function(e) {
          var t = void 0;
          return t = /Windows/i.test(e) ? "Win" : e, t = /OS X/i.test(t) ? "Mac" : t
        }
      };
      e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = o(r(1)),
        n = o(r(5)),
        a = r(24);

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = r(2),
        c = s.info.nrtcVersion,
        d = r(22),
        u = "https://statistic.live.126.net/statistic/realtime/sdkinfo",
        l = "https://statistic.live.126.net/statics/report/webrtc/networkProbeLog",
        p = function() {
          function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, i.default)(this, e);
            var r = t.appkey;
            this.infos = {}, this.userlist = [], this.localVolumn = 0, this.local = {}, this.remote = {}, this.audioBwe = {
              bitsSentCurrent: 0,
              bitsRecvCurrent: []
            }, this.videoBwe = {
              bitsSentCurrent: 0,
              bitsRecvCurrent: []
            }, this.netDetectDownData = {
              v_lost: [],
              rtt: [],
              real_v_res: [],
              real_v_kbps_n: [],
              v_fps: []
            }, this.publicIP = "", this.init(r), this.resetStatus()
          }
          return (0, n.default)(e, [{
            key: "init",
            value: function(e) {
              this.infos = Object.assign(this.infos, {
                ver: 2,
                device: -1,
                isp: -1,
                platform: f.convertPlatform(d.os.family) + "-" + d.os.version,
                browser: d.name + "-" + d.version,
                sdk_ver: c || "3.6.0",
                appkey: e,
                interval: 60,
                samples: 30,
                time: null,
                qos_algorithm: -1,
                fec_algorithm: -1,
                qos_scene: -1,
                qos_strategy: -1
              })
            }
          }, {
            key: "resetStatus",
            value: function() {
              this.infos = Object.assign(this.infos, {
                uid: null,
                cid: null,
                push_url: null,
                turn_ip: null,
                proxy_ip: null,
                meeting: !1,
                live: !1
              }), this.clearInfoData(), this.uidSsrcMap = {}, this.userlist = [], this.audioBwe = {
                bitsSentCurrent: 0,
                bitsRecvCurrent: []
              }, this.videoBwe = {
                bitsSentCurrent: 0,
                bitsRecvCurrent: []
              }
            }
          }, {
            key: "initInfoData",
            value: function(e) {
              var t = {
                uid: e,
                cid: this.imInfo && this.imInfo.cid || -1,
                push_url: this.sessionConfig && this.sessionConfig.rtmpUrl || -1,
                turn_ip: this.imInfo && this.imInfo.turnMap || -1,
                proxy_ip: this.imInfo && this.imInfo.turnMap || -1,
                meeting: /^meeting$/gi.test(this.imInfo.sessionMode),
                live: this.sessionConfig && this.sessionConfig.liveEnable || !1,
                p2p: !1,
                isp: -1,
                net: -1,
                connect_state: this.imInfo && this.imInfo.code || 200,
                signalling_time: (this.sessionConfig && this.sessionConfig.signalEndTime || 0) - (this.sessionConfig &&
                  this.sessionConfig.signalStartTime || 0),
                connect_time: (this.sessionConfig && this.sessionConfig.rtcEndTime || 0) - (this.sessionConfig &&
                  this.sessionConfig.rtcStartTime || 0)
              };
              this.infos = Object.assign(this.infos, t)
            }
          }, {
            key: "clearInfoData",
            value: function() {
              this.localVolumn = 0, this.infos = Object.assign(this.infos, {
                rx: {
                  audio: [],
                  video: []
                },
                tx: {
                  a_lost: [],
                  v_lost: [],
                  rtt: [],
                  rtt_mdev: [],
                  set_v_fps: [],
                  qos_v_fps: [],
                  v_fps: [],
                  set_v_quality: [],
                  real_v_res: [],
                  real_v_kbps: [],
                  real_v_kbps_n: [],
                  real_a_kbps: [],
                  real_a_kbps_n: [],
                  set_v_kbps: [],
                  qos_v_kbps: [],
                  tx_bw_kbps: [],
                  a_volume: []
                }
              })
            }
          }, {
            key: "start",
            value: function(e) {
              var t = e.imInfo,
                r = e.sessionConfig,
                i = e.videoConfig;
              t && (this.infos.appkey = this.infos.appkey, this.imInfo = t || {}, this.infos.cid = this.imInfo
                .cid, this.infos.uid = this.imInfo.uid, this.sessionConfig = r || {}, this.videoConfig =
                i || {}, this.clearSecond(), this.getTurnMap(), this.initInfoData(this.infos.uid))
            }
          }, {
            key: "stop",
            value: function() {
              this.resetStatus()
            }
          }, {
            key: "clearSecond",
            value: function() {
              this.paramSecond = {
                packetsLostAudio: "",
                packetsLostAudioList: [],
                packetsSentPerSecondAudio: [],
                packetsLostVideo: "",
                packetsLostVideoList: [],
                packetsSentPerSecondVideo: [],
                googInterframeDelayMaxList: [],
                vrdolr: "",
                vrdohr: "",
                downPacketsLostVideo: "",
                downPacketsLostVideoList: [],
                downPpacketsSentPerSecondVideo: []
              }
            }
          }, {
            key: "update",
            value: function(e, t) {
              this.imInfo.netDetect && console.log("sdk数据上报更新 data: ", e);
              var r = [],
                i = [],
                n = [],
                a = [];
              for (var o in e) - 1 !== o.indexOf("_send_") && -1 !== o.indexOf("_audio") ? r.push(e[o]) :
                -1 !== o.indexOf("_send_") && -1 !== o.indexOf("_video") ? i.push(e[o]) : -1 !== o.indexOf(
                  "_recv_") && -1 !== o.indexOf("_audio") ? n.push(e[o]) : -1 !== o.indexOf("_recv_") &&
                -1 !== o.indexOf("_video") ? a.push(e[o]) : -1 !== o.indexOf("Conn-audio-1-0") ? this.publicIP =
                e[o] && e[o].googLocalAddress.match(/([0-9\.]+)/)[1] : this.network = e[o] && e[o].network;
              if (3 === this.paramSecond.packetsLostAudioList.length && this.paramSecond.packetsLostAudioList
                .shift(), 3 === this.paramSecond.packetsLostVideoList.length && this.paramSecond.packetsLostVideoList
                .shift(), 3 === this.paramSecond.packetsSentPerSecondAudio.length && this.paramSecond.packetsSentPerSecondAudio
                .shift(), 3 === this.paramSecond.packetsSentPerSecondVideo.length && this.paramSecond.packetsSentPerSecondVideo
                .shift(), 3 === this.paramSecond.googInterframeDelayMaxList.length && this.paramSecond.googInterframeDelayMaxList
                .shift(), this.paramSecond.packetsLostAudioList.push(parseFloat(r[0] && r[0].packetsLost ||
                  0)), this.paramSecond.packetsLostVideoList.push(parseFloat(i[0] && i[0].packetsLost ||
                  0)), this.paramSecond.downPacketsLostVideoList.push(parseFloat(a[0] && a[0].packetsLost ||
                  0)), this.paramSecond.packetsSentPerSecondAudio.push(parseFloat(r[0] && r[0].packetsSent ||
                  0)), this.paramSecond.packetsSentPerSecondVideo.push(parseFloat(i[0] && i[0].packetsSent ||
                  0)), this.paramSecond.downPpacketsSentPerSecondVideo.push(parseFloat(a[0] && a[0].packetsReceived ||
                  0)), this.paramSecond.googInterframeDelayMaxList.push(parseFloat(a[0] && a[0].googInterframeDelayMax ||
                  0)), 1 !== t) {
                if (2 === t) {
                  this.paramSecond.packetsLostAudio = (this.paramSecond.packetsLostAudioList[1] - this.paramSecond
                    .packetsLostAudioList[0]) / (this.paramSecond.packetsSentPerSecondAudio[0] + this.paramSecond
                    .packetsSentPerSecondAudio[1]) / 2 * 100, this.paramSecond.packetsLostVideo = ((
                    this.paramSecond.packetsLostVideoList[1] - this.paramSecond.packetsLostVideoList[
                      0]) / (this.paramSecond.packetsSentPerSecondVideo[0] + this.paramSecond.packetsSentPerSecondVideo[
                    1]) / 2 * 100).toFixed(1), this.paramSecond.downPacketsLostVideo = (this.paramSecond
                    .downPacketsLostVideoList[1] - this.paramSecond.downPacketsLostVideoList[0]) / (
                    this.paramSecond.downPpacketsSentPerSecondVideo[0] + this.paramSecond.downPpacketsSentPerSecondVideo[
                      1]) / 2 * 100;
                  var s = 0,
                    c = 0,
                    d = 0,
                    u = 0;
                  this.paramSecond.googInterframeDelayMaxList[0] > 200 && this.paramSecond.googInterframeDelayMaxList[
                      0] < 400 && (s = this.paramSecond.googInterframeDelayMaxList[0] / 2e3), this.paramSecond
                    .googInterframeDelayMaxList[1] > 200 && this.paramSecond.googInterframeDelayMaxList[1] <
                    400 && (c = this.paramSecond.googInterframeDelayMaxList[1] / 2e3), this.paramSecond.googInterframeDelayMaxList[
                      0] > 400 && (d = this.paramSecond.googInterframeDelayMaxList[0] / 2e3), this.paramSecond
                    .googInterframeDelayMaxList[1] > 400 && (u = this.paramSecond.googInterframeDelayMaxList[
                      0] / 2e3), this.paramSecond.vrdolr = s + c, this.paramSecond.vrdohr = d + u
                } else if (t % 2 == 1) {
                  var l = this.paramSecond.packetsLostAudioList.length,
                    p = this.paramSecond.packetsSentPerSecondAudio.length,
                    f = this.paramSecond.packetsLostAudioList[l - 1],
                    h = this.paramSecond.packetsSentPerSecondAudio[p - 1];
                  this.paramSecond.packetsLostAudio = f / (f + h) * 100, l = this.paramSecond.packetsLostVideoList
                    .length, p = this.paramSecond.packetsSentPerSecondVideo.length, f = this.paramSecond.packetsLostVideoList[
                      l - 1], h = this.paramSecond.packetsSentPerSecondVideo[p - 1], this.paramSecond.packetsLostVideo =
                    (f / (f + h) * 100).toFixed(1), l = this.paramSecond.downPacketsLostVideoList.length,
                    p = this.paramSecond.downPpacketsSentPerSecondVideo.length, f = this.paramSecond.downPacketsLostVideoList[
                      l - 1], h = this.paramSecond.downPpacketsSentPerSecondVideo[p - 1], this.paramSecond
                    .downPacketsLostVideo = (f / (f + h) * 100).toFixed(1);
                  var m = 0,
                    v = 0,
                    g = 0,
                    _ = 0;
                  this.paramSecond.googInterframeDelayMaxList[1] > 200 && this.paramSecond.googInterframeDelayMaxList[
                      1] < 400 && (m = this.paramSecond.googInterframeDelayMaxList[1] / 2e3), this.paramSecond
                    .googInterframeDelayMaxList[2] > 200 && this.paramSecond.googInterframeDelayMaxList[2] <
                    400 && (v = this.paramSecond.googInterframeDelayMaxList[2] / 2e3), this.paramSecond.googInterframeDelayMaxList[
                      1] > 400 && (g = this.paramSecond.googInterframeDelayMaxList[1] / 2e3), this.paramSecond
                    .googInterframeDelayMaxList[2] > 400 && (_ = this.paramSecond.googInterframeDelayMaxList[
                      2] / 2e3), this.paramSecond.vrdolr = m + v, this.paramSecond.vrdohr = g + _
                }
                t % 2 == 0 && (this.updateTxMediaInfo(r, i), this.updateRxMediaInfo(n, a), Object.keys(
                  this.infos.rx.audio).length === this.infos.interval / 2 && this.send())
              }
            }
          }, {
            key: "updateOnce",
            value: function(e) {
              var t = e.imInfo,
                r = e.sessionConfig,
                i = e.rtcConnection;
              t && (this.imInfo = t || {}, this.sessionConfig = r || {}, this.rtcConnection = i || {},
                this.videoConfig = e.videoConfig || {}, this.getTurnMap(), this.initInfoData(), this.send()
              )
            }
          }, {
            key: "updateLocalVolumn",
            value: function(e) {
              this.localVolumn = e
            }
          }, {
            key: "updateRxMediaInfo",
            value: function(e, t) {
              var r = this;
              if (this.imInfo.netDetect) {
                var i = {
                  v_lost: this.paramSecond.downPacketsLostVideo || 0,
                  rtt: parseFloat(t[0] && t[0].googRtt || 0) || 0,
                  real_v_kbps_n: t.length && t[0].bitsReceivedPerSecond || 0,
                  v_fps: parseFloat(t[0] && t[0].googFrameRateOutput || 0) || 0,
                  real_v_res: (t[0] && t[0].googFrameWidthReceived || 0) + "x" + (t[0] && t[0].googFrameHeightReceived ||
                    0)
                };
                for (var n in i) this.netDetectDownData[n].push(i[n])
              }
              var a = {
                  u: [],
                  g: [],
                  c: [],
                  bn: [],
                  bc: []
                },
                o = {
                  u: [],
                  i: [],
                  bn: [],
                  bc: [],
                  r: [],
                  f: [],
                  vrdolr: [],
                  vrdohr: []
                };
              e.map(function(e) {
                e.id && a.u.push(parseFloat(e.id.split("_")[3])), a.g.push(-1), a.c.push(-1), a.bn.push(
                  e.bitsReceivedPerSecond || 0), a.bc.push(-1)
              }), t.map(function(e) {
                e.id && o.u.push(parseFloat(e.id.split("_")[3])), o.i.push(parseFloat(e.googInterframeDelayMax)),
                  o.bn.push(e.bitsReceivedPerSecond || 0), o.bc.push(-1), o.r.push((e.googFrameWidthReceived ||
                    0) + "x" + (e.googFrameHeightReceived || 0)), o.f.push(parseFloat(e.googFrameRateReceived)),
                  o.vrdolr.push(r.paramSecond.vrdolr || -1), o.vrdohr.push(r.paramSecond.vrdohr || -1)
              }), this.infos.rx.audio.push(a), this.infos.rx.video.push(o)
            }
          }, {
            key: "getLocalMediaStats",
            value: function(e, t) {
              return {
                a_lost: this.paramSecond.packetsLostAudio || 0,
                v_lost: parseFloat(this.paramSecond.packetsLostVideo) || 0,
                rtt: parseFloat(t[0] && t[0].googRtt || 0) || 0,
                rtt_mdev: -1,
                set_v_fps: this.videoConfig.frameRate || 0,
                qos_v_fps: parseFloat(t[0] && t[0].googFrameRateInput || 0) || 0,
                v_fps: parseFloat(t[0] && t[0].googFrameRateSent || 0) || 0,
                set_v_quality: this.sessionConfig.videoQuality,
                real_v_res: (t[0] && t[0].googFrameWidthSent || 0) + "x" + (t[0] && t[0].googFrameHeightSent ||
                  0),
                real_v_kbps: parseFloat(t[0] && t[0].googEncodeUsagePercent || 0) || 0,
                real_v_kbps_n: t[0] && t[0].bitsSentPerSecond || 0,
                real_a_kbps: -1,
                real_a_kbps_n: t[0] && t[0].bitsSentPerSecond || 0,
                set_v_kbps: -1,
                qos_v_kbps: 0,
                tx_bw_kbps: t[0] && t[0].bitsSentPerSecond || 0,
                a_volume: parseFloat(this.localVolumn) || 0
              }
            }
          }, {
            key: "updateTxMediaInfo",
            value: function(e, t) {
              var r = this.getLocalMediaStats(e, t);
              for (var i in r) this.infos.tx[i].push(r[i]);
              var n = ((navigator.connection || {}).type || "unknown").toString().toLowerCase();
              this.infos.net = f.convertNetwork(this.network || n)
            }
          }, {
            key: "getTurnMap",
            value: function() {
              if (this.imInfo) {
                var e = this.imInfo;
                e.serverMap && (e.serverMap.constructor === Object ? e.turnMap = e.serverMap || null : e.turnMap =
                  JSON.parse(e.serverMap || null), e.turnMap = e.turnMap && e.turnMap.turnaddrs, e.turnMap =
                  e.turnMap && e.turnMap[0], e.turnMap = e.turnMap.constructor === Array ? e.turnMap[0] :
                  e.turnMap, e.turnMap = e.turnMap && e.turnMap.match(/\d+\.\d+.\d+\.\d+/), e.turnMap =
                  e.turnMap[0])
              } else console.warn("尚未连接网关，不统计")
            }
          }, {
            key: "send",
            value: function() {
              var e = this;
              this.infos.uid && this.infos.cid && (this.imInfo.netDetect || (this.infos.time = Date.now(),
                this.infos.samples = this.infos.rx.audio.length, s.wssServer && (u = u.replace(
                  "statistic.live.126.net", s.wssServer)), (0, a.ajax)({
                  type: "post",
                  url: u,
                  data: this.infos
                }).then(function(t) {
                  e.clearInfoData()
                }).catch(function(t) {
                  console.log("data uploader send", t), e.clearInfoData()
                })))
            }
          }, {
            key: "disposalDataForNetDetect",
            value: function(e) {
              var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
              return this.NetDetectData = {}, this.NetDetectData.cid = this.infos.cid, this.NetDetectData
                .user_ip = this.publicIP || "127.0.0.1", this.NetDetectData.browser = d.name + "-" + d.version,
                this.NetDetectData.server_ip = this.imInfo.wssArr && this.imInfo.wssArr.length && this.imInfo
                .wssArr[0], this.NetDetectData.upload_network_status = [], this.NetDetectData.download_network_status = [],
                this.imInfo.netDetect && (console.log("整理网络探测的数据: 计算RTT: ", this.infos.tx.rtt), console.log(
                  "整理网络探测的数据: 计算上行帧率: ", this.infos.tx.v_fps), console.log("整理网络探测的数据: 计算下行帧率: ", this.netDetectDownData
                  .v_fps), console.log("整理网络探测的数据: 计算上行丢包率: ", this.infos.tx.v_lost), console.log(
                  "整理网络探测的数据: 计算下行丢包率: ", this.netDetectDownData.v_lost), console.log(
                  "整理网络探测的数据: 计算上行带宽: ", this.infos.tx.real_v_kbps_n), console.log(
                  "整理网络探测的数据: 计算下行带宽: ", this.netDetectDownData.real_v_kbps_n)), this.NetDetectData.upload_network_status
                .push({
                  up_rtt: f.getRealValue(this.infos.tx.rtt) || 0,
                  up_loss: parseInt(f.getRealValue(this.infos.tx.v_lost)) || 0,
                  up_bwe: f.calculateAverage(this.infos.tx.real_v_kbps_n, 0) || 0,
                  up_framerate: f.getRealValue(this.infos.tx.v_fps) || 0,
                  up_resolution: f.getRealValue(this.infos.tx.real_v_res) || "0x0",
                  codec: this.imInfo.codec,
                  network_status: "",
                  up_status: t ? "success" : "failed"
                }), this.NetDetectData.download_network_status.push({
                  down_rtt: this.NetDetectData.upload_network_status[this.NetDetectData.upload_network_status
                    .length - 1].up_rtt || 0,
                  down_loss: parseInt(f.getRealValue(this.netDetectDownData.v_lost)) || 0,
                  down_bwe: f.calculateAverage(this.netDetectDownData.real_v_kbps_n, 0) || 0,
                  down_framerate: f.getRealValue(this.netDetectDownData.v_fps) || 0,
                  down_resolution: f.getRealValue(this.netDetectDownData.real_v_res) || "0X0",
                  codec: this.imInfo.codec,
                  network_status: "",
                  down_status: r ? "success" : "failed"
                }), e && (console.log("Safari自己计算的统计结果: ", JSON.stringify(this.NetDetectData, null, " ")),
                  console.log("服务器反馈后的统计结果: ", JSON.stringify(e, null, " ")), this.NetDetectData.user_ip =
                  e.user_ip, e.upload_network_status && (this.NetDetectData.upload_network_status[0].up_rtt =
                    e.upload_network_status.up_rtt, this.NetDetectData.upload_network_status[0].up_loss =
                    e.upload_network_status.up_loss), e.download_network_status && (this.NetDetectData.download_network_status[
                    0].down_rtt = e.download_network_status.down_rtt), this.NetDetectData.download_network_status[
                    0].down_rtt && this.NetDetectData.upload_network_status[0].up_rtt ? this.NetDetectData
                  .download_network_status[0].down_rtt > this.NetDetectData.upload_network_status[0].up_rtt ?
                  this.NetDetectData.download_network_status[0].down_rtt = this.NetDetectData.upload_network_status[
                    0].up_rtt : this.NetDetectData.upload_network_status[0].up_rtt = this.NetDetectData.download_network_status[
                    0].down_rtt : this.NetDetectData.download_network_status[0].down_rtt ? this.NetDetectData
                  .upload_network_status[0].up_rtt = this.NetDetectData.download_network_status[0].down_rtt :
                  this.NetDetectData.upload_network_status[0].up_rtt && (this.NetDetectData.download_network_status[
                    0].down_rtt = this.NetDetectData.upload_network_status[0].up_rtt), this.NetDetectData
                  .upload_network_status[0].up_framerate = f.calculateFrameRate(this.infos.tx.v_fps) || 0,
                  this.NetDetectData.download_network_status[0].down_framerate = f.calculateFrameRate(
                    this.netDetectDownData.v_fps) || 0, console.log("safar自己统计并且结合服务器反馈后的重合结果: ", JSON.stringify(
                    this.NetDetectData, null, " "))), this.NetDetectData = f.assignResolution(this.NetDetectData),
                this.NetDetectData = this.computeNetStatus(this.NetDetectData), this.transportTime = 0,
                this.sendNetDetectData(this.NetDetectData), this.NetDetectData
            }
          }, {
            key: "computeNetStatus",
            value: function(e) {
              if (e) {
                if (e.download_network_status) {
                  e.download_network_status[0].down_loss > e.upload_network_status[0].up_loss ? (e.loss_rate =
                      e.download_network_status[0].down_loss, e.download_network_status[0].down_loss = e.download_network_status[
                        0].down_loss - e.upload_network_status[0].up_loss) : e.download_network_status[0]
                    .down_loss - e.upload_network_status[0].up_loss <= 3 && e.download_network_status[0].down_loss -
                    e.upload_network_status[0].up_loss >= -3 ? (console.log("差距少于等于3"), e.download_network_status[
                      0].down_loss = 0, e.loss_rate = e.upload_network_status[0].up_loss) : (console.log(
                      "差距大"), e.download_network_status[0].down_loss = 0, e.loss_rate = e.upload_network_status[
                      0].up_loss);
                  var t = e.loss_rate / 20 * .5 + e.download_network_status[0].down_rtt / 1200 * .25 + 50 /
                    150 * .25;
                  console.log("网络探测计算结果：", t), e.download_network_status[0].network_status = t <= .2625 ?
                    "网络状况非常好，音视频通话流畅" : t < .55 ? "网络状况好，音视频通话偶有卡顿" : t <= 1 ? "网络状况差, 音频通话流畅" :
                    "网络状况非常差，音频通话偶有卡顿", e.upload_network_status[0].up_bwe && e.upload_network_status[0].up_framerate &&
                    e.upload_network_status[0].up_rtt || (console.log("统计信息，没有获取到上行行带宽、帧率或者時延"), e.download_network_status[
                      0].network_status = "网络状况非常糟糕，无法进行音视频通话"), e.upload_network_status[0].network_status =
                    e.download_network_status[0].network_status
                }
                return e
              }
              console.log("computeNetStatus: Invalid Parameter")
            }
          }, {
            key: "sendNetDetectData",
            value: function(e) {
              var t = this;
              s.wssServer && (l = l.replace("statistic.live.126.net", s.wssServer)), (0, a.ajax)({
                type: "post",
                url: l,
                data: e
              }).then(function(e) {
                e && e.code && 200 == e.code && console.warn("网络探测结果发送成功：", e)
              }).catch(function(e) {
                console.log("网络探测结果发送失败：", e), t.transportTime < 2 ? (t.sendNetDetectData(t.NetDetectData),
                  t.transportTime++) : t.transportTime = 0
              })
            }
          }]), e
        }();
      t.default = p;
      var f = {
        convertNetwork: function(e) {
          return {
            wlan: "wifi",
            lan: "ethernet"
          } [e] || "unknown"
        },
        convertPlatform: function(e) {
          var t = void 0;
          return t = /Windows/i.test(e) ? "Win" : e, t = /OS X/i.test(t) ? "Mac" : t
        },
        calculateAverage: function(e, t) {
          if (e && 0 != e.length) return e.length < 3 && e.length > 1 ? e[e.length - 1] || e[e.length - 2] :
            1 == e.length ? e[0] : ((e = e.slice(2)).sort(function(e, t) {
              return e - t
            }), 0 == t ? Math.round(e.reduce(r) / e.length) : (e.reduce(r) / e.length).toFixed(t));

          function r(e, t) {
            return e + t
          }
        },
        getRealValue: function(e) {
          if (e && 0 != e.length) {
            for (var t = e.length; t > 0; t--)
              if (e[t]) return e[t];
            return 0
          }
        },
        calculateFrameRate: function(e) {
          if (!e || 0 == e.length) return 0;
          if (1 == e.length) return e[0];
          for (var t = null, r = null, i = e.length; i >= 0; i--) {
            if (r && r > e[i]) {
              t = e[i];
              break
            }
            e[i] && !r && (r = e[i])
          }
          return r && t ? Math.round((r - t) / 2) : 0
        },
        assignResolution: function(e) {
          return e && e.upload_network_status && 0 != e.upload_network_status.length && e.download_network_status &&
            0 != e.download_network_status.length ? "0x0" != e.upload_network_status[0].up_resolution &&
            "0X0" != e.download_network_status[0].down_resolution ? e : "0x0" != e.download_network_status[0]
            .down_resolution ? (e.upload_network_status[0].up_resolution = e.download_network_status[0].down_resolution,
              e) : "0x0" != e.upload_network_status[0].up_resolution ? (e.download_network_status[0].down_resolution =
              e.upload_network_status[0].up_resolution, e) : e : e
        }
      };
      e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = o(r(1)),
        n = o(r(5)),
        a = r(24);

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = r(2),
        c = (s.info.nrtcVersion, "https://statistic.live.126.net/statics/report/webrtc/global"),
        d = function() {
          function e() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            (0, i.default)(this, e), this.data = {}, this.init()
          }
          return (0, n.default)(e, [{
            key: "init",
            value: function() {
              this.calling = !1, this.data = Object.assign(this.data, {
                account: "",
                uid: 0,
                cid: 0,
                deviceList: [],
                sessionInfo: {},
                mediaConstraint: {},
                peerConnections: [],
                mediaPlay: {},
                ext: ""
              })
            }
          }, {
            key: "update",
            value: function(e) {
              Object.assign(this.data, e)
            }
          }, {
            key: "send",
            value: function(e) {
              var t = this;
              console.log("----- send apiData ------", e), s.wssServer && (c = c.replace(
                "statistic.live.126.net", s.wssServer)), (0, a.ajax)({
                type: "post",
                url: c,
                data: e
              }).then(function(e) {
                t.init()
              }).catch(function(e) {
                console.log("err", e), t.init()
              })
            }
          }]), e
        }();
      t.default = d, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = o(r(1)),
        n = o(r(5)),
        a = r(24);

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = r(2),
        c = s.info.nrtcVersion,
        d = "https://statistic.live.126.net/statistic/realtime/sdkFunctioninfo",
        u = function() {
          function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, i.default)(this, e);
            var r = t.appkey,
              n = t.platform;
            this.apis = {}, this.isRtc = /WebRTC/.test(n), this.init(r, n), this.resetStatus()
          }
          return (0, n.default)(e, [{
            key: "init",
            value: function(e, t) {
              this.apis = Object.assign(this.apis, {
                ver: 1,
                platform: t,
                sdk_ver: c || "v4.4.0",
                uid: null,
                appkey: e,
                time: null
              })
            }
          }, {
            key: "start",
            value: function(e) {
              this.calling = !0, this.apis = Object.assign(this.apis, e)
            }
          }, {
            key: "resetStatus",
            value: function() {
              this.calling = !1, this.apis = Object.assign(this.apis, {
                p2p: {
                  value: 0
                },
                meeting: {
                  value: 0
                },
                bypass: {
                  value: 0
                },
                call_control_type: {
                  value: 0
                },
                self_mute: {
                  value: -1
                },
                self_mic_mute: {
                  value: -1
                },
                switch_p2p_type: {
                  value: 0
                },
                set_speaker: {
                  value: -1
                },
                net_detect: {
                  value: this.isRtc ? -1 : 0
                },
                beautify: {
                  value: -1
                },
                water_mark: {
                  value: -1
                },
                audio_samples: {
                  value: -1
                },
                video_samples: {
                  value: -1
                },
                pre_view_mirror: {
                  value: -1
                },
                code_mirror: {
                  value: -1
                },
                custom_audio: {
                  value: -1
                },
                custom_video: {
                  value: -1
                },
                audio_mix: {
                  value: -1
                },
                snap_shot: {
                  value: -1
                },
                record: {
                  value: 0
                },
                audio_record: {
                  value: 0
                },
                display: {
                  value: 0
                },
                android_compatibility: {
                  value: -1
                },
                hd_audio: {
                  value: 0
                },
                video_quality: {
                  value: 0
                },
                fps: {
                  value: 0
                },
                prefered_video_encoder: {
                  value: -1
                },
                prefered_video_decoder: {
                  value: -1
                },
                video_max_encode_bitrate: {
                  value: this.isRtc ? -1 : 0
                },
                audio_scene: {
                  value: -1
                },
                video_adaptive_strategy: {
                  value: this.isRtc ? -1 : 0
                },
                ans: {
                  value: this.isRtc ? -1 : 0
                },
                agc: {
                  value: -1
                },
                dtx: {
                  value: -1
                },
                aec: {
                  value: this.isRtc ? -1 : 0
                },
                awc: {
                  value: this.isRtc ? -1 : 0
                },
                actor: {
                  value: 0
                },
                always_keep_calling: {
                  value: 0
                },
                server_record_audio: {
                  value: 0
                },
                server_record_video: {
                  value: 0
                },
                server_record_single_user: {
                  value: 0
                },
                screen_sharing_module: {
                  value: 0
                },
                video_crop: {
                  value: 0
                }
              })
            }
          }, {
            key: "update",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments[1],
                r = e.key,
                i = e.ext;
              e.constructor === String && (r = e), i = i || t, this.apis[r] && (this.apis[r].value = 1,
                void 0 !== i && (this.apis[r].ext = i), /(p2p|meeting)/.test(r) && (this.calling = !0))
            }
          }, {
            key: "send",
            value: function() {
              var e = this;
              this.calling && (this.calling = !1, this.apis.time = Date.now(), s.wssServer && (d = d.replace(
                "statistic.live.126.net", s.wssServer)), (0, a.ajax)({
                type: "post",
                url: d,
                data: this.apis
              }).then(function(t) {
                e.resetStatus()
              }).catch(function(t) {
                console.log("ApiInvokeData: send: err", t), e.resetStatus()
              }))
            }
          }]), e
        }();
      t.default = u, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i;
      t.tool = {
        merge: function() {
          var e = arguments;
          return e[0] = Object.assign.apply(Object.assign, arguments), e[0]
        },
        verifyOptions: function() {
          var e = arguments;
          if (e[0] && e[0].constructor === Object)
            for (var t = 1; t < arguments.length; t++) {
              var r = e[t];
              (r = r.split(" ")).map(function(t) {
                if (void 0 === e[0][t]) throw Error("参数缺失 " + t)
              })
            }
        },
        guid: (i = function() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }, function() {
          return i() + i() + i() + i() + i() + i() + i() + i()
        }),
        sortDevices: function(e) {
          e && e.length > 1 && e.sort(function(e, t) {
            var r = -1 !== e.name.toLowerCase().indexOf("virtual"),
              i = -1 !== e.path.toLowerCase().indexOf("virtual"),
              n = -1 !== t.name.toLowerCase().indexOf("virtual"),
              a = -1 !== t.path.toLowerCase().indexOf("virtual");
            return i ? 1 : a ? -1 : r && n ? 0 : r ? 1 : n ? -1 : 0
          })
        },
        randomNum: function(e, t) {
          var r = t - e,
            i = Math.random();
          return 0 == Math.round(i * r) ? e + 1 : Math.round(i * t) == t ? (index++, t - 1) : e + Math.round(
            i * r) - 1
        },
        isString: function(e) {
          return "[object String]" === Object.prototype.toString.call(e)
        },
        isNumber: function(e) {
          return "[object Number]" === Object.prototype.toString.call(e)
        },
        isBoolean: function(e) {
          return "[object Boolean]" === Object.prototype.toString.call(e)
        },
        isObject: function(e) {
          return "[object Object]" === Object.prototype.toString.call(e)
        },
        isArray: function(e) {
          return "[object Array]" === Object.prototype.toString.call(e)
        },
        isFunction: function(e) {
          return "[object Function]" === Object.prototype.toString.call(e)
        },
        isDate: function(e) {
          return "[object Date]" === Object.prototype.toString.call(e)
        },
        isRegExp: function(e) {
          return "[object RegExp]" === Object.prototype.toString.call(e)
        },
        isNull: function(e) {
          return null === e
        },
        isUndefined: function(e) {
          return void 0 === e
        },
        exist: function(e) {
          return !isNull(e) && !isUndefined(e)
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = function(e) {
        return Object.keys(e).map(function(t) {
          return encodeURIComponent(t) + "=" + encodeURIComponent(/Object/i.test(e[t]) ? JSON.stringify(e[t]) :
            e[t])
        }).join("&")
      };
      t.ajax = function(e) {
        if (!e || !e.url) return Promise.reject("参数不完整，无法发起请求");
        e.dataType = e.dataType || "json";
        var t = new XMLHttpRequest;
        t.open(e.type || "GET", e.url, !0), t.responseType = "" + e.dataType;
        var r = e.contentType || "application/json;charset=UTF-8";
        return t.setRequestHeader("Content-type", r), e.header && Object.keys(e.header).map(function(r) {
          t.setRequestHeader(r, e.header[r])
        }), new Promise(function(n, a) {
          t.onload = function() {
              if (t.status > 400) return Promise.reject("参数不完整，无法发起请求");
              var e = t.response;
              n(e)
            }, t.onerror = function(e) {
              a(e)
            }, r.indexOf("x-www-form-urlencoded") >= 0 ? e.data ? t.send(i(e.data)) : t.send() : e.data ? t
            .send(JSON.stringify(e.data)) : t.send()
        })
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.element = {
        html2node: function(e) {
          var t = document.createElement("div");
          t.innerHTML = e;
          var r = [],
            i = void 0,
            n = void 0;
          if (t.children)
            for (i = 0, n = t.children.length; i < n; i++) r.push(t.children[i]);
          else
            for (i = 0, n = t.childNodes.length; i < n; i++) {
              var a = t.childNodes[i];
              1 == a.nodeType && r.push(a)
            }
          return r.length > 1 ? t : r[0]
        },
        n2node: function(e) {
          return e ? /HTML.+Element/gi.test(e) ? e : e[0] && /HTML.+Element/gi.test(e[0]) ? e[0] : null :
            null
        }
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(12),
        n = r(22),
        a = i.getGlobal();

      function o(e, t) {
        for (var r in t) e[r] = t[r];
        return e
      }
      a.Object.assign || (console.log("Object.assign polyfill"), a.Object.assign = function() {
        for (var e = arguments, t = 1; t < e.length; t++) e[0] = o(e[0], e[t]);
        return e[0]
      }), a.platform = n
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = function(e) {
        var t = e.util;
        return i = t.notundef, n
      };
      var i = void 0;

      function n(e) {
        i(e.enable) && (this.enable = e.enable ? 1 : 0), i(e.needBadge) && (this.needBadge = e.needBadge ? 1 : 0),
          i(e.needPushNick) && (this.needPushNick = e.needPushNick ? 1 : 0), i(e.pushContent) && (this.pushContent =
            "" + e.pushContent), i(e.custom) && (this.custom = "" + e.custom), i(e.pushPayload) && (this.pushPayload =
            "" + e.pushPayload), i(e.sound) && (this.sound = "" + e.sound), i(e.webrtcEnable) && (this.webrtcEnable =
            e.webrtcEnable ? 1 : 0), i(e.forceKeepCalling) && (this.forceKeepCalling = e.forceKeepCalling ? 1 : 0)
      }
      e.exports = t.default
    }, function(e, t, r) {
      var i = r(18),
        n = r(59).f;
      r(150)("getOwnPropertyDescriptor", function() {
        return function(e, t) {
          return n(i(e), t)
        }
      })
    }, function(e, t, r) {
      r(268);
      var i = r(7).Object;
      e.exports = function(e, t) {
        return i.getOwnPropertyDescriptor(e, t)
      }
    }, function(e, t, r) {
      e.exports = {
        default: r(269),
        __esModule: !0
      }
    }, function(e, t, r) {
      var i = r(48),
        n = r(75);
      r(150)("getPrototypeOf", function() {
        return function(e) {
          return n(i(e))
        }
      })
    }, function(e, t, r) {
      r(271), e.exports = r(7).Object.getPrototypeOf
    }, function(e, t, r) {
      e.exports = {
        default: r(272),
        __esModule: !0
      }
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.NRTCAdapter = void 0;
      var i = l(r(1)),
        n = l(r(5)),
        a = l(r(4)),
        o = l(r(120)),
        s = l(r(3)),
        c = r(184),
        d = r(11),
        u = r(24);

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = function(e) {
        function t(e) {
          (0, i.default)(this, t), e = Object.assign(d.DEFAULT_NRTC_OPTION, e), d.CONFIG_MAP.CURRENT.SDK_TYPE =
            d.CONFIG_MAP.SDK_TYPE.NRTC;
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return r.SDK_TYPE = d.CONFIG_MAP.SDK_TYPE.NRTC, r.adapterRef.instance._isFirefox() ? window.addEventListener(
            "beforeunload",
            function() {
              // r.adapterRef.logger.log("NRTCAdapter: beforeunload event fire"), r.leaveChannel()
            }) : window.addEventListener("pagehide", function() {
            r.adapterRef.logger.log("NRTCAdapter:pagehide event fire"), r.leaveChannel()
          }), r._nrtcInit(e), r
        }
        return (0, s.default)(t, e), (0, n.default)(t, [{
          key: "_nrtcInit",
          value: function(e) {
            var t = e.appkey;
            t || this.adapterRef.logger.error("NRTCAdapter: _nrtcInit error: 请传入appkey"), this._params.appkey =
              t
          }
        }, {
          key: "joinChannel",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return this.adapterRef.detectNetState.inDetecting ? Promise.reject(CommonErrorCode.NetworkInDetecting) :
              (u.tool.verifyOptions(e, "channelName uid"), Object.assign(this._params.JoinChannelRequestParam4NRTC,
                e), this.setStartSessionTime(), this.adapterRef.meeting4NRTCApi.joinChannel(Object.assign(
                this._params.JoinChannelRequestParam4NRTC, {
                  appkey: this._params.appkey
                })))
          }
        }, {
          key: "leaveChannel",
          value: function() {
            return this.setEndSessionTime(), this.adapterRef.meeting4NRTCApi.leaveChannel()
          }
        }, {
          key: "setPlayVolume",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.volume,
              r = e.uid;
            return 0 === r.length ? this.adapterRef.playApi.setPlayVolume(+t) : this.adapterRef.playApi
              .setPlayVolume({
                uid: r,
                volume: +t
              })
          }
        }, {
          key: "destroy",
          value: function() {
            (0, o.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this)
            .call(this)
          }
        }]), t
      }(c.BaseAPI);
      t.NRTCAdapter = p
    }, function(e, t, r) {
      "use strict";
      var i = r(22),
        n = r(0);
      r(36);

      function a() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        n.merge(this, {
          options: e,
          debug: !1,
          api: "log",
          style: "color:#1cb977;",
          log: n.emptyFunc,
          info: n.emptyFunc,
          warn: n.emptyFunc,
          error: n.emptyFunc
        }), this.prefix = e.prefix || "", this.setDebug(e.debug)
      }
      var o = a.prototype,
        s = ["Chrome", "Safari", "Firefox"];
      o.setDebug = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = this;
        if (t.debug = e, e.style && (t.style = e.style), t.debug && n.exist(console)) {
          var r = console;
          t.debug = function() {
            var e = t.formatArgs(arguments); - 1 !== s.indexOf(i.name) && n.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("debug", e)
          }, t.log = function() {
            var e = t.formatArgs(arguments); - 1 !== s.indexOf(i.name) && n.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("log", e)
          }, t.info = function() {
            var e = t.formatArgs(arguments); - 1 !== s.indexOf(i.name) && n.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("info", e)
          }, t.warn = function() {
            var e = t.formatArgs(arguments); - 1 !== s.indexOf(i.name) && n.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("warn", e)
          }, t.error = function() {
            var e = t.formatArgs(arguments); - 1 !== s.indexOf(i.name) && n.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("error", e)
          }, t._log = function(e, i) {
            var a = t.options.logFunc,
              o = null;
            if (a && (a[e] && (o = a[e]), n.isFunction(o))) o.apply(a, i);
            else if (r[e]) try {
              r[e].apply ? t.chrome(e, i) : t.ie(e, i)
            } catch (e) {}
          }, t.chrome = function(e, n) {
            -1 !== s.indexOf(i.name) ? r[e].apply(r, n) : t.ie(e, n)
          }, t.ie = function(e, t) {
            t.forEach(function(t) {
              r[e](JSON.stringify(t, null, 4))
            })
          }
        }
      }, o.formatArgs = function(e) {
        e = [].slice.call(e, 0);
        var t = new Date,
          r = "[WEBRTC LOG " + (c(t.getMonth() + 1) + "-" + c(t.getDate()) + " " + c(t.getHours()) + ":" + c(t.getMinutes()) +
            ":" + c(t.getSeconds()) + ":" + c(t.getMilliseconds(), 3)) + " " + this.prefix.toUpperCase() +
          "]  ";
        return n.isString(e[0]) ? e[0] = r + e[0] : e.splice(0, 0, r), e.forEach(function(t, r) {
          (n.isArray(t) || n.isObject(t)) && (e[r] = n.simpleClone(t))
        }), e
      };
      var c = function(e, t) {
        t = t || 2;
        for (var r = "" + e; r.length < t;) r = "0" + r;
        return r
      };
      e.exports = a
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.PlayApi = void 0;
      var i = s(r(1)),
        n = s(r(5)),
        a = s(r(4)),
        o = s(r(3));

      function s(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var c = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.adapterRef = null, this.sdkRef = null
          }
        }, {
          key: "startLocalStream",
          value: function(e) {
            this.adapterRef.apiReportHelper.uploadDataApi("update", {
              key: "display"
            });
            var t = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid);
            return this.adapterRef.logger.log("startLocalStream 开启自己画面"), t.show(e || this.adapterRef.tempInfo
              .localContainer), Promise.resolve()
          }
        }, {
          key: "stopLocalStream",
          value: function() {
            this.adapterRef.imInfo && this.adapterRef.imInfo.uid && (this.adapterRef.logger.log(
              "stopLocalStream 关闭自己画面"), this.adapterRef.instance._getVideoHelperByUid(this.adapterRef
              .imInfo.uid).hide())
          }
        }, {
          key: "startRemoteStream",
          value: function(e) {
            var t = this,
              r = e.account,
              i = e.node,
              n = (e.poster, r);
            return n ? (this.adapterRef.logger.log("startRemoteStream 开启对端画面: " + n), this.adapterRef.instance
              ._getVideoHelperByUid(n).show(i || this.adapterRef.tempInfo.remoteContainer), Promise.resolve()
            ) : (Object.keys(this.adapterRef.videoHelperMap).forEach(function(e, r) {
              e != t.adapterRef.imInfo.uid && (t.adapterRef.logger.log(
                "startRemoteStream 开启对端画面: " + e), t.adapterRef.instance._getVideoHelperByUid(
                e).show(i || t.adapterRef.tempInfo.remoteContainer))
            }), Promise.resolve())
          }
        }, {
          key: "stopRemoteStream",
          value: function(e) {
            var t = this,
              r = e;
            if (r) return this.adapterRef.logger.log("startLocalStream 关闭对端画面: " + r), void(this.adapterRef
              .instance._getVideoHelperByUidWithoutCreate(r) && this.adapterRef.instance._getVideoHelperByUidWithoutCreate(
                r).hide());
            Object.keys(this.adapterRef.videoHelperMap).forEach(function(e, r) {
              e != t.adapterRef.imInfo.uid && (t.adapterRef.logger.log("startLocalStream 关闭对端画面: " +
                e), t.adapterRef.instance._getVideoHelperByUid(e).hide())
            })
          }
        }, {
          key: "setPlayVolume",
          value: function(e) {
            var t = this;
            if ("number" == typeof e) {
              Object.keys(this.adapterRef.audioHelperMap).map(function(r) {
                t.adapterRef.instance._getAudioHelperByUid(r).setPlayVolume(e)
              })
            } else {
              var r = e.uid;
              e = void 0 === e.volume ? 1 : e.volume, this.adapterRef.instance._getAudioHelperByUid(r).setPlayVolume(
                e)
            }
            return e
          }
        }, {
          key: "getPlayVolume",
          value: function(e) {
            var t = this.adapterRef.instance._getAudioHelperByUid(e);
            if (t) {
              var r = t.getPlayVolume();
              return Math.round(255 * r)
            }
            return 0
          }
        }, {
          key: "getAudioVolume",
          value: function() {
            if (!this.adapterRef || !this.adapterRef.imInfo || !this.adapterRef.imInfo.uid) return {
              volume: 0
            };
            var e = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid);
            return e ? e.getAudioVolume() : {
              volume: 0
            }
          }
        }, {
          key: "setVideoViewSize",
          value: function(e) {
            this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi("update", {
              key: "video_crop"
            });
            var t = this.adapterRef.imInfo.uid,
              r = this.adapterRef.instance._getVideoHelperByUid(t);
            !0 === r._checkHasVideoStream() && r.videoDomHelper ? r.videoDomHelper.resize(e) : this.adapterRef
              .logger.warn("Play: setVideoViewSize: 未检测到视频流，请检查媒体设备是否开启!")
          }
        }, {
          key: "setVideoViewRemoteSize",
          value: function(e) {
            var t = this;
            this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi("update", {
              key: "video_crop"
            });
            var r = e.uid;
            r ? this.adapterRef.instance._getVideoHelperByUid(r).setVideoViewConfig({
              width: e.width,
              height: e.height,
              cut: e.cut
            }) : Object.keys(this.adapterRef.videoHelperMap).map(function(r) {
              var i = t.adapterRef.instance._getVideoHelperByUid(r);
              !0 === i._checkHasVideoStream() && r != t.adapterRef.imInfo.uid ? i.videoDomHelper ?
                i.setVideoViewConfig({
                  width: e.width,
                  height: e.height,
                  cut: e.cut
                }) : t.adapterRef.logger.warn("Play: setVideoViewRemoteSize: 远程节点的承载容器尚未创建出来, " + i
                  .uid) : t.adapterRef.logger.warn(
                  "Play: setVideoViewRemoteSize: 未检测到视频流，请检查媒体设备是否开启, " + i.uid)
            });
            return Promise.resolve()
          }
        }, {
          key: "resumeLocalStream",
          value: function() {
            var e = this.adapterRef.imInfo.uid;
            this.adapterRef.instance._getVideoHelperByUid(e).resumeLocalStream()
          }
        }, {
          key: "suspendLocalStream",
          value: function() {
            var e = this.adapterRef.imInfo.uid;
            this.adapterRef.instance._getVideoHelperByUid(e).suspendLocalStream()
          }
        }, {
          key: "resumeRemoteStream",
          value: function(e) {
            var t = this;
            e ? this.adapterRef.instance._getVideoHelperByUid(e).resumeRemoteStream(e) : Object.keys(
              this.adapterRef.videoHelperMap).map(function(e) {
              e != t.adapterRef.imInfo.uid && t.adapterRef.instance._getVideoHelperByUid(e).resumeRemoteStream(
                e)
            })
          }
        }, {
          key: "suspendRemoteStream",
          value: function(e) {
            var t = this;
            e ? this.adapterRef.instance._getVideoHelperByUid(e).suspendRemoteStream() : Object.keys(
              this.adapterRef.videoHelperMap).map(function(e) {
              e != t.adapterRef.imInfo.uid && t.adapterRef.instance._getVideoHelperByUid(e).suspendRemoteStream()
            })
          }
        }]), t
      }(r(10).EventEmitter);
      t.PlayApi = c
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.CommonApi = void 0;
      var i = s(r(1)),
        n = s(r(5)),
        a = s(r(4)),
        o = s(r(3));

      function s(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var c = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.adapterRef = null, this.sdkRef = null
          }
        }, {
          key: "_doStopDevice4PlayVideo",
          value: function(e) {
            return Promise.resolve()
          }
        }, {
          key: "setAudioBlack",
          value: function(e) {
            var t = this;
            if (e)
              if (-1 == e) {
                this.adapterRef.instance._getAudioHelperByUid("local").stopAudio()
              } else {
                this.adapterRef.instance._getAudioHelperByUid(e).stopAudio()
              }
            else Object.keys(this.adapterRef.audioHelperMap).map(function(e) {
              (e = "" + e, "" + t.adapterRef.imInfo.uid !== e) && t.adapterRef.instance._getAudioHelperByUid(
                e).stopAudio()
            })
          }
        }, {
          key: "setAudioStart",
          value: function(e) {
            -1 == e ? this.adapterRef.deviceApi._doStartDevice4PlayLocalAudio() : this.adapterRef.deviceApi
              ._doStartDevice4PlayRemoteAudio(e)
          }
        }, {
          key: "setVideoBlack",
          value: function(e) {}
        }, {
          key: "setVideoShow",
          value: function(e) {}
        }, {
          key: "startRtc",
          value: function() {
            return this.adapterRef.instance._startSession()
          }
        }]), t
      }(r(10).EventEmitter);
      t.CommonApi = c
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.P2P4WebRTCApi = void 0;
      var i = d(r(1)),
        n = d(r(5)),
        a = d(r(4)),
        o = d(r(3)),
        s = r(10),
        c = r(11);

      function d(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var u = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.adapterRef = null, this.sdkRef = null
          }
        }, {
          key: "call",
          value: function(e) {
            if (this.adapterRef.calling) return Promise.reject(c.CommonErrorCode.ChannelAlreadyInSession);
            var t = e.account,
              r = e.type,
              i = e.pushConfig,
              n = e.sessionConfig;
            if (this.adapterRef.calling = !0, this.adapterRef.isCaller = !0, this.adapterRef.callee = t,
              this.adapterRef.target.account = t, this.adapterRef.instance._setSessionConfig(n), this.adapterRef
              .instance._setSessionConfig({
                signalStartTime: Date.now()
              }), this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "p2p"
              }), n.highAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "hd_audio"
              }), i.forceKeepCalling && this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "always_keep_calling"
              }), void 0 !== n.videoFrameRate && this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "fps",
                ext: 0 == +n.videoFrameRate ? 0 : +n.videoFrameRate + 1
              }), void 0 !== n.videoQuality) {
              var a = +n.videoQuality;
              a === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P ? a = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P :
                a === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P && (a = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P),
                this.adapterRef.apiReportHelper.uploadDataApi("update", {
                  key: "video_quality",
                  ext: a || 0
                })
            }
            return this.adapterRef.imBusiness.initNetcall({
              type: r,
              pushConfig: i
            })
          }
        }, {
          key: "setNetcallSession",
          value: function(e) {
            return this.adapterRef.calling ? Promise.reject(c.CommonErrorCode.ChannelAlreadyInSession) :
              (this.adapterRef.signalInited = !0, this.adapterRef.calling = !0, this.adapterRef.channelId =
                e.channelId, this.adapterRef.imInfo = e, this.adapterRef.type = e.netcallType, this.adapterRef
                .imInfo.serverAddrs = e.rtcServerMap, this.adapterRef.imInfo.rtcUrls = e.rtcServerMap,
                this.beCalledInfo = this.adapterRef.imInfo, this.adapterRef.imInfo.sessionConfig &&
                this.adapterRef.instance._setSessionConfig(this.adapterRef.imInfo.sessionConfig), this.adapterRef
                .imBusiness._parseAccountUidMap(e.accountUidMap), Promise.resolve())
          }
        }, {
          key: "response",
          value: function(e) {
            var t = e.sessionConfig,
              r = void 0 === t ? {} : t,
              i = e;
            if (this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "p2p"
              }), r.highAudio && this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "hd_audio"
              }), void 0 !== r.videoFrameRate && this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "fps",
                ext: 0 == +r.videoFrameRate ? 0 : +r.videoFrameRate + 1
              }), void 0 !== r.videoQuality) {
              var n = +r.videoQuality;
              n === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P ? n = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P :
                n === c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P && (n = c.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P),
                this.adapterRef.apiReportHelper.uploadDataApi("update", {
                  key: "video_quality",
                  ext: n || 0
                })
            }
            return i.fn = "calleeAck", this.adapterRef.imBusiness.baseResponse(i)
          }
        }, {
          key: "hangup",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e.fn = "hangup", e.recordType = "cancelNetcallBeforeAccept", this.adapterRef.imBusiness.baseHangup(
              e)
          }
        }, {
          key: "control",
          value: function(e) {
            var t = e;
            return t.fn = "netcallControl", this.adapterRef.imBusiness.baseControl(t)
          }
        }, {
          key: "switchAudioToVideo",
          value: function() {
            if (this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "switch_p2p_type"
              }), !this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) return Promise
              .reject(c.CommonErrorCode.ChannelSessionNotExists);
            var e = this.adapterRef.instance._getUidByAccount(this.adapterRef.imInfo.account);
            return this.adapterRef.instance._getVideoHelperByUid(e) && this.adapterRef.webrtcBusiness._enableDevice(
                c.DEVICE_TYPE.DEVICE_TYPE_VIDEO), this.adapterRef.type = c.NETCALL_TYPE.NETCALL_TYPE_VIDEO,
              Promise.resolve()
          }
        }, {
          key: "switchVideoToAudio",
          value: function() {
            if (this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "switch_p2p_type"
              }), !this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) return Promise
              .reject(c.CommonErrorCode.ChannelSessionNotExists);
            var e = this.adapterRef.instance._getUidByAccount(this.adapterRef.imInfo.account);
            return this.adapterRef.instance._getVideoHelperByUid(e) && this.adapterRef.webrtcBusiness._disableDevice(
                c.DEVICE_TYPE.DEVICE_TYPE_VIDEO), this.adapterRef.type = c.NETCALL_TYPE.NETCALL_TYPE_AUDIO,
              Promise.resolve()
          }
        }]), t
      }(s.EventEmitter);
      t.P2P4WebRTCApi = u
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.Meeting4WebRTCApi = void 0;
      var i = u(r(1)),
        n = u(r(5)),
        a = u(r(4)),
        o = u(r(3)),
        s = r(10),
        c = r(24),
        d = r(11);

      function u(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var l = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.adapterRef = null, this.sdkRef = null
          }
        }, {
          key: "createChannel",
          value: function(e) {
            var t = this,
              r = e;
            return c.tool.verifyOptions(r, "channelName"), r.custom = r.custom || "", r.webrtcEnable = !
              0, this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "meeting"
              }), this.adapterRef.instance._setSessionConfig({
                signalStartTime: Date.now()
              }), this.adapterRef.imBusiness.baseCreateChannel("createChannel", r).then(function(e) {
                return Promise.resolve(e)
              }).catch(function(e) {
                t.adapterRef.logger.error("Meeting: createChannel: error=%o", e), t.adapterRef.instance
                  ._setSessionConfig({
                    signalEndTime: Date.now()
                  });
                var r = Object.assign({}, d.CommonErrorCode.ChannelCreatingError, e);
                return Promise.reject(r)
              })
          }
        }, {
          key: "joinChannel",
          value: function(e) {
            var t = this,
              r = e;
            if (this.adapterRef.signalInited) return this.adapterRef.logger.error(
              "Meeting: joinChannel: 已经加入房间..."), Promise.reject(d.CommonErrorCode.ChannelJoinAlreadyIn);
            c.tool.verifyOptions(r, "channelName type");
            var i = r.sessionConfig,
              n = void 0 === i ? {} : i;
            return n.liveEnable = r.liveEnable || n.liveEnable, n.rtmpRecord = r.rtmpRecord || n.rtmpRecord,
              this.adapterRef.instance._setSessionConfig(n), this.adapterRef.instance._setSessionConfig({
                signalStartTime: Date.now()
              }), this.adapterRef.imBusiness.baseJoinChannel("joinChannel", {
                channelName: r.channelName,
                liveEnable: r.liveEnable,
                rtmpRecord: r.rtmpRecord
              }).then(function(e) {
                return t.adapterRef.logger.log("Meeting: joinChannel: success=%o", e), t.adapterRef.type =
                  e.type = r.type, e.account = t.adapterRef.nim.account, t.adapterRef.imInfo = Object
                  .assign(t.adapterRef.imInfo, e), t.adapterRef.imInfo.role = void 0 === r.role ? d.ROLE_FOR_MEETING
                  .ROLE_PLAYER : r.role, t.adapterRef.channelId = e.channelId, t.adapterRef.apiReportHelper
                  .uploadDataApi("start", {
                    uid: e.uid
                  }), t.adapterRef.instance._getVideoHelperByUid(t.adapterRef.imInfo.uid), t.adapterRef
                  .instance._getAudioHelperByUid(t.adapterRef.imInfo.uid), Promise.resolve({
                    uid: e.uid,
                    account: t.adapterRef.nim.account,
                    channelId: t.adapterRef.channelId,
                    type: e.type,
                    custom: e.custom
                  })
              }).catch(function(e) {
                t.adapterRef.logger.log("Meeting: joinChannel: error=%o", e);
                var r = Object.assign({}, d.CommonErrorCode.ChannelJoinError, e);
                return Promise.reject(r)
              })
          }
        }, {
          key: "leaveChannel",
          value: function() {
            return this.adapterRef.imInfo && this.adapterRef.imInfo.netDetect ? (this.adapterRef.apiReportHelper
                .uploadDataApi("send"), this.adapterRef.logReportHelper.uploadData("send"), this.adapterRef
                .imBusiness.hangup(), this.adapterRef.instance._resetStatus(), Promise.resolve()) :
              this.adapterRef.signalInited ? this.adapterRef.sessionMode ? this.adapterRef.sessionMode !==
              d.SESSION_MODE.MEETING ? (this.adapterRef.logger.error("Meeting: leaveChannel: 不是一个会议通话！"),
                Promise.reject(d.CommonErrorCode.ChannelJoinMeetingModeError)) : (this.adapterRef.logger
                .log("Meeting: leaveChannel"), this.adapterRef.apiReportHelper.uploadDataApi("send"),
                this.adapterRef.logReportHelper.uploadData("send"), this.adapterRef.imBusiness.hangup(),
                this.adapterRef.instance._resetStatus(), Promise.resolve()) : (this.adapterRef.logger.error(
                "Meeting: leaveChannel: sessionMode为空！"), Promise.reject(d.CommonErrorCode.ChannelSessionNotExists)) :
              (this.adapterRef.logger.error("Meeting: leaveChannel: signalInited为空！"), Promise.reject(d
                .CommonErrorCode.ChannelSessionNotExists))
          }
        }, {
          key: "changeRoleToPlayer",
          value: function() {
            if (this.adapterRef.imInfo.sessionMode !== d.SESSION_MODE.P2P) return this.adapterRef.imInfo
              .role === d.ROLE_FOR_MEETING.ROLE_PLAYER ? Promise.resolve({
                role: "player"
              }) : (this.adapterRef.imInfo.role = d.ROLE_FOR_MEETING.ROLE_PLAYER, this.adapterRef.apiReportHelper
                .uploadDataApi("update", {
                  key: "actor"
                }), this.adapterRef.webrtcBusiness._switchRole().then(function() {
                  return Promise.resolve({
                    role: "normal"
                  })
                }));
            this.adapterRef.logger.error("Meeting: changeRoleToPlayer: 点对点场景不支持此方法")
          }
        }, {
          key: "changeRoleToAudience",
          value: function() {
            if (this.adapterRef.imInfo.sessionMode !== d.SESSION_MODE.P2P) return this.adapterRef.imInfo
              .role === d.ROLE_FOR_MEETING.ROLE_AUDIENCE ? Promise.resolve({
                role: "player"
              }) : (this.adapterRef.imInfo.role = d.ROLE_FOR_MEETING.ROLE_AUDIENCE, this.adapterRef.webrtcBusiness
                ._switchRole().then(function() {
                  return Promise.resolve({
                    role: "audience"
                  })
                }));
            this.adapterRef.logger.error("Meeting: changeRoleToAudience: 点对点场景不支持此方法")
          }
        }]), t
      }(s.EventEmitter);
      t.Meeting4WebRTCApi = l
    }, function(e) {
      e.exports = {
        name: "nim",
        private: !0,
        version: "6.2.1",
        nrtcVersion: "4.5.0",
        sdkVersion: 52,
        nrtcSdkVersion: 1,
        protocolVersion: 1,
        pcAgentVersion: "2.8.0.906",
        description: "NIM Web SDK 网易云信|真正稳定的即时通讯云服务",
        main: "index.js",
        directories: {
          test: "test"
        },
        scripts: {
          clean: "node build/emptyDist.js",
          "build:tag": "node build/parseTagMap.js",
          "build:sdk": "cross-env PLATFORM=all webpack --config webpack.config.js",
          "build:sdk:stats": "webpack --profile --json > dist/webpack-stats.json",
          "build:tester": "node build/tester.js",
          "build:api": "node build/api",
          "build:guide": "node build/guide",
          "watch:tag": "watch 'npm run build:tag' ./src/protocol/map -du --interval=0.25 --filter=./build/parseTagMapFilter.js",
          "watch:sdk": "npm run build:sdk -- -w",
          "zip:api": "cross-env NODE_ENV=production npm run build:api && node build/api/zip.js",
          "zip:sdk": "cross-env NODE_ENV=production node build/sdk/zip.js",
          "copy:sdk": "npm run zip:sdk && node build/sdk/copy.js",
          "copy:api": "npm run build:api && node build/api/copy.js",
          dev: "yarn check && npm run clean && run-p watch:*",
          "dev:prod": "cross-env PLATFORM=all NODE_ENV=production npm run dev",
          "dev:nosm": "NO_SOURCE_MAP=true run-p watch:*",
          "dev:rn": "cross-env PLATFORM=rn NO_SOURCE_MAP=true npm run dev",
          "dev:weixin": "cross-env PLATFORM=weixin NO_SOURCE_MAP=true npm run dev",
          pack: "yarn check && npm run clean && npm run build:sdk && npm run build:tester && npm run deploy && npm run build:api && npm run build:guide",
          "pack:test": "cross-env PLATFORM=all NODE_ENV=test npm run pack",
          "pack:pre": "cross-env PLATFORM=all NODE_ENV=pre npm run pack",
          "pack:prod": "cross-env PLATFORM=all NODE_ENV=production npm run pack && npm run zip:sdk",
          "pack:weixin": "cross-env PLATFORM=weixin NODE_ENV=production npm run build:sdk -- -w",
          "pack:nodejs": "cross-env PLATFORM=nodejs NODE_ENV=production npm run build:sdk -- -w",
          "pack:rn": "cross-env PLATFORM=rn NODE_ENV=production npm run build:sdk -- -w",
          "pack:custom": "cross-env PLATFORM=all NODE_ENV=custom npm run pack",
          deploy: "node build/deploy.js",
          tester: "cross-env PLATFORM=all NODE_ENV=test && node build/tester.js"
        },
        author: "netease im",
        license: "ISC",
        dependencies: {
          axios: "^0.18.0",
          "babel-polyfill": "^6.26.0",
          backo2: "^1.0.2",
          "deep-access": "^0.1.1",
          "es6-promise": "^4.2.4",
          eventemitter3: "^2.0.2",
          gulp: "^3.9.1",
          "gulp-jsdoc3": "^2.0.0",
          happypack: "^5.0.1",
          "javascript-natural-sort": "^0.7.1",
          jsdoc: "^3.5.5",
          "sdp-transform": "^2.3.0",
          "webrtc-adapter": "6.0.3",
          ws: "^5.1.1",
          x2js: "^3.2.1",
          xhr: "^2.4.1"
        },
        devDependencies: {
          archiver: "^2.1.1",
          "babel-core": "^6.26.0",
          "babel-loader": "^7.1.4",
          "babel-plugin-add-module-exports": "^0.2.1",
          "babel-plugin-transform-async-to-generator": "^6.24.1",
          "babel-plugin-transform-es3-member-expression-literals": "^6.22.0",
          "babel-plugin-transform-es3-property-literals": "^6.22.0",
          "babel-plugin-transform-runtime": "^6.23.0",
          "babel-preset-env": "^1.6.1",
          "babel-preset-stage-2": "^6.24.1",
          "cross-env": "^5.1.4",
          eslint: "^4.19.1",
          "eslint-config-standard": "^11.0.0",
          "eslint-plugin-import": "^2.11.0",
          "eslint-plugin-node": "^6.0.1",
          "eslint-plugin-promise": "^3.7.0",
          "eslint-plugin-standard": "^3.1.0",
          "fs-extra": "^5.0.0",
          "imports-loader": "^0.8.0",
          "ink-docstrap": "^1.3.2",
          "npm-run-all": "^4.1.2",
          "on-build-webpack": "^0.1.0",
          "pre-build-webpack": "^0.1.0",
          prettyjson: "^1.1.3",
          "raw-loader": "^0.5.1",
          "watch-cli": "^0.2.3",
          webpack: "^4.5.0",
          "webpack-cli": "^2.0.14",
          "webpack-merge": "^4.1.2",
          "wolfy87-eventemitter": "^5.2.4",
          yaml: "^0.3.0",
          yargs: "^11.0.0"
        }
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.Meeting4NRTCApi = void 0;
      var i = l(r(1)),
        n = l(r(5)),
        a = l(r(4)),
        o = l(r(3)),
        s = r(10),
        c = r(24),
        d = r(11),
        u = function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          return t.default = e, t
        }(r(2));

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = r(314).version,
        f = function(e) {
          function t(e) {
            (0, i.default)(this, t);
            var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
          }
          return (0, o.default)(t, e), (0, n.default)(t, [{
            key: "_reset",
            value: function() {
              this.adapterRef = null, this.sdkRef = null
            }
          }, {
            key: "joinChannel",
            value: function(e) {
              var t = this,
                r = e.appkey,
                i = e.channelName,
                n = e.uid,
                a = e.scene,
                o = e.joinChannelRecordConfig,
                s = e.joinChannelLiveConfig,
                l = u.nrtcNetcall;
              return this.adapterRef.signalInited ? Promise.reject(d.CommonErrorCode.ChannelJoinAlreadyIn) :
                (0, c.ajax)({
                  url: l.checkSumUrl,
                  type: "POST",
                  contentType: "application/x-www-form-urlencoded",
                  data: {
                    uid: n,
                    appkey: r
                  }
                }).then(function(e) {
                  if (200 === e.code) return (0, c.ajax)({
                    url: l.getChannelInfoUrl,
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    data: {
                      uid: n,
                      appkey: r,
                      channelName: i,
                      secureType: "1",
                      osType: "4",
                      mode: a === d.SESSION_MODE.MEETING ? 2 : 1,
                      netType: "0",
                      version: p || "1.0.0",
                      curtime: +new Date,
                      checksum: e.checksum,
                      webrtc: 1
                    }
                  }, {
                    url: l.getChannelInfoUrl
                  });
                  var t = Object.assign({
                    serverCode: e.code,
                    event: e
                  }, d.GateWayErrorCode.GateWayAuthError);
                  return Promise.reject(t)
                }).then(function(e) {
                  if (200 !== e.code) {
                    var r = Object.assign({
                      serverCode: e.code,
                      event: e
                    }, d.GateWayErrorCode.GateWayAuthError);
                    return Promise.reject(r)
                  }
                  t.adapterRef.imInfo || (t.adapterRef.imInfo = {});
                  var i = e.ips,
                    c = void 0 === i ? {} : i,
                    u = e.config && e.config.quality_level_limit || d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P;
                  Object.assign(t.adapterRef.imInfo, {
                    cid: e.cid,
                    token: e.token,
                    turnToken: c.token,
                    wssArr: c.webrtcarray || [],
                    relayaddrs: c.relayaddrs || null,
                    relaytoken: c.relaytoken || null,
                    maxVideoQuality: u,
                    netDetect: !1
                  }, {
                    uid: n,
                    sessionMode: a
                  }), t.adapterRef.instance._setSessionConfig(Object.assign({
                    maxVideoQuality: u
                  }, s, o))
                }).then(function() {
                  var e = t.adapterRef.instance._getVideoHelperByUid(t.adapterRef.imInfo.uid),
                    r = t.adapterRef.instance._getAudioHelperByUid(t.adapterRef.imInfo.uid),
                    i = [];
                  return e.getLocalVideoStream() && i.push(t.adapterRef.deviceApi.stopDevice(d.DEVICE_TYPE
                    .DEVICE_TYPE_VIDEO)), r.getLocalAudioStream() && i.push(t.adapterRef.deviceApi.stopDevice(
                    d.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN)), Promise.all(i)
                }).then(function() {
                  t.adapterRef.signalInited = !0, t.adapterRef.instance._startSessionInit();
                  var r = t.adapterRef.tempInfo,
                    i = r.localVideoDisabled,
                    n = void 0 !== i && i,
                    a = r.localAudioDisabled,
                    o = void 0 !== a && a,
                    s = Object.assign({}, e, {
                      video: !n,
                      audio: !o
                    });
                  return t.adapterRef.instance._startDevicesByMode(s)
                }).then(function() {
                  return t.adapterRef.webrtcGateWayBusiness.doTryInit()
                }).then(function() {
                  var e = [];
                  return t.adapterRef.tempInfo.localVideoDisabled || t.adapterRef.tempInfo.localVideoMuted ||
                    e.push(t.adapterRef.instance._startPushVideoStream()), t.adapterRef.tempInfo.localAudioDisabled ||
                    t.adapterRef.tempInfo.localAudioMuted || e.push(t.adapterRef.instance._startPushAudioStream()),
                    Promise.all(e)
                }).then(function() {
                  var e = t.adapterRef.tempInfo;
                  return e.localContainer && t.adapterRef.instance.setLocalVideoRenderer(), e.localViewParams &&
                    t.adapterRef.instance.setLocalRenderMode(e.localViewParams), Promise.resolve()
                })
            }
          }, {
            key: "leaveChannel",
            value: function() {
              return this.adapterRef.signalInited ? (this.adapterRef.signalInited = !1, this.adapterRef.instance
                ._stopSession()) : (this.adapterRef.logger.error(
                "Meeting: leaveChannel: signalInited为false！"), Promise.reject(d.CommonErrorCode.ChannelSessionNotExists))
            }
          }]), t
        }(s.EventEmitter);
      t.Meeting4NRTCApi = f
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.RecordApi = void 0;
      var i = l(r(1)),
        n = l(r(5)),
        a = l(r(4)),
        o = l(r(3)),
        s = r(10),
        c = r(11),
        d = r(24),
        u = r(124);

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r.recordId = 1, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.adapterRef = null, this.sdkRef = null
          }
        }, {
          key: "_preParseOptions",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = "local",
              r = e.type || "video",
              i = !1;
            return d.tool.isString(e) ? (t = this.adapterRef.instance._getUidByAccount(e)) || (t = e) :
              d.tool.isObject(e) && (d.tool.isString(e.mediaType) ? (i = !0, t = "local") : (t = e.account ?
                  this.adapterRef.instance._getUidByAccount(e.account) : e.uid || "local") !== this.adapterRef
                .imInfo.uid && "local" !== t || (i = !0)), {
                recordName: t + "-" + this.recordId++,
                uid: t,
                mediaType: r,
                isRecordLocal: i
              }
          }
        }, {
          key: "startMediaRecording",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.reset,
              r = this._preParseOptions(e),
              i = r.uid,
              n = void 0 === i ? "local" : i,
              a = r.recordName,
              o = r.mediaType,
              s = r.isRecordLocal;
            this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi("update", {
              key: "video_record"
            });
            var d = this.adapterRef.instance._getAudioHelperByUid(n),
              l = this.adapterRef.instance._getVideoHelperByUid(n);
            if (!d || !l) return Promise.reject(c.VideoRecordErrorCode.VideoRecordInvalid);
            var p = [];
            if (s) {
              var f = d.getLocalAudioStream();
              switch (o) {
                case "screen":
                  l.getLocalScreenStream() && p.push(l.getLocalScreenStream()), f && p.push(f);
                  break;
                case "camera":
                  l.getLocalCameraStream() && p.push(l.getLocalCameraStream()), f && p.push(f);
                  break;
                case "video":
                  l.getLocalVideoStream() && p.push(l.getLocalVideoStream()), f && p.push(f);
                  break;
                case "audio":
                  var h = this.adapterRef.audioHelperMap;
                  Object.values(h).forEach(function(e) {
                    (e.remoteAudioStream || e.localAudioStream) && p.push(e.remoteAudioStream || e.localAudioStream)
                  });
                  var m = this.adapterRef.instance._getAudioHelperByUid("local");
                  m && m.localAudioStream && p.push(m.localAudioStream)
              }
            } else d.remoteAudioStream && p.push(d.remoteAudioStream), l.remoteVideoStream && p.push(l.remoteVideoStream);
            var v = this.adapterRef.mediaRecordHelper[a];
            return v || (v = this.adapterRef.mediaRecordHelper[a] = new u.MediaRecordHelper({
              sdkRef: this.sdkRef,
              adapterRef: this.adapterRef
            })).on("stop", this._onRecordStop.bind(this)), 0 === p.length ? (delete this.adapterRef.mediaRecordHelper[
              a], Promise.reject(c.VideoRecordErrorCode.RecordNoStream)) : v.checkIsRecording() ? (
              this.adapterRef.logger.log("Record: startMediaRecording: 视频正在录制中..."), Promise.resolve({
                recordId: a
              })) : v.start(p, {
              uid: n,
              type: o,
              reset: t
            }).then(function() {
              return Promise.resolve({
                recordId: a
              })
            })
          }
        }, {
          key: "stopMediaRecording",
          value: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).recordId;
            if (!e) return Promise.reject(c.CommonErrorCode.ParamError);
            var t = this.adapterRef.mediaRecordHelper[e];
            return t && t.checkIsRecording() ? t.stop() : Promise.reject(c.VideoRecordErrorCode.RecordNotExist)
          }
        }, {
          key: "stopMediaRecordingByUid",
          value: function(e) {
            var t = this;
            this.adapterRef.mediaRecordHelper && Object.values(this.adapterRef.mediaRecordHelper).forEach(
              function(r) {
                var i = r.getRecordStatus();
                e && i.uid !== "" + e || r.checkIsRecording() && (t.adapterRef.logger.log(
                  "RecordApi::stopMediaRecordingByUid: " + i.recordId), r.stop())
              })
          }
        }, {
          key: "playMediaRecording",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.recordId;
            if (!t) return Promise.reject(c.CommonErrorCode.ParamError);
            var r = this.adapterRef.mediaRecordHelper[t];
            return r && r.checkIsRecording() ? r.stop().then(function() {
              return r.play(e.div)
            }) : r.checkIsRecording() ? Promise.reject(c.VideoRecordErrorCode.RecordNotExist) : r.play(
              e.div)
          }
        }, {
          key: "listMediaRecording",
          value: function() {
            var e = {},
              t = this.adapterRef.mediaRecordHelper;
            return Object.keys(t).forEach(function(r) {
              t[r] && (e[r] = t[r].getRecordStatus(), e[r].id = r)
            }), e
          }
        }, {
          key: "downloadMediaRecording",
          value: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).recordId;
            if (!e) return Promise.reject(c.CommonErrorCode.ParamError);
            var t = this.adapterRef.mediaRecordHelper[e];
            return t ? t.download() : Promise.reject(c.VideoRecordErrorCode.RecordNotExist)
          }
        }, {
          key: "cleanMediaRecording",
          value: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).recordId;
            if (!e) return Promise.reject(c.CommonErrorCode.ParamError);
            var t = this.adapterRef.mediaRecordHelper[e];
            return t && t.checkIsRecording() ? t.clean() : Promise.resolve()
          }
        }, {
          key: "_onRecordStop",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.adapterRef.instance.emit(c.EVENT_OBJ.recordStopped.key, e)
          }
        }]), t
      }(s.EventEmitter);
      t.RecordApi = p
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.CaptureApi = void 0;
      var i = s(r(1)),
        n = s(r(5)),
        a = s(r(4)),
        o = s(r(3));

      function s(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var c = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.adapterRef = null, this.sdkRef = null
          }
        }, {
          key: "setCaptureVolume",
          value: function(e) {
            return Number.isInteger(e) ? (e < 0 ? e = 0 : e > 255 && (e = 255), this.adapterRef.instance
              ._getAudioHelperByUid("local").setGain(e / 255), e) : -1
          }
        }, {
          key: "getCaptureVolume",
          value: function(e) {
            var t = this.adapterRef.instance._getAudioHelperByUid("local").getGain();
            return Math.round(255 * t)
          }
        }]), t
      }(r(10).EventEmitter);
      t.CaptureApi = c
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.DeviceApi = void 0;
      var i = d(r(1)),
        n = d(r(5)),
        a = d(r(4)),
        o = d(r(3)),
        s = r(10),
        c = r(11);

      function d(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var u = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.adapterRef = null, this.sdkRef = null
          }
        }, {
          key: "getDevicesOfType",
          value: function(e) {
            var t = this.sdkRef.getDeviceTypeMap(e);
            return this.adapterRef && this.adapterRef.deviceBusiness && this.adapterRef.deviceBusiness.mediaDeviceHelper ?
              this.adapterRef.deviceBusiness.mediaDeviceHelper.getDevicesOfType(t) : (this.adapterRef.logger
                .error("getDevicesOfType deviceBusiness undefined: ", this.adapterRef), Promise.reject(
                  c.DeviceErrorCode.DeviceNotAvailable))
          }
        }, {
          key: "startDevice",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.type,
              r = e.device,
              i = e.account,
              n = e.uid;
            return t === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_LOCAL ? (this.adapterRef.logger.log(
                "Device: 播放本地声音"), this._doStartDevice4PlayLocalAudio()) : t === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_CHAT ?
              (this.adapterRef.logger.log("Device: 播放远端声音, options ", JSON.stringify(e, null, " ")),
                this._doStartDevice4PlayRemoteAudio(i, n)) : t === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN ?
              (this.adapterRef.state.lastDeviceStatus.audio = {
                type: t,
                device: r
              }, this.adapterRef.state.audioDeviceHasOpened = !0, this.adapterRef.logger.log(
                "Device: 开启麦克风, options ", JSON.stringify(e, null, " ")), this._doStartDeviceCommon(t,
                r)) : t === c.DEVICE_TYPE.DEVICE_TYPE_VIDEO ? (this.adapterRef.state.lastDeviceStatus.video = {
                type: t,
                device: r
              }, this.adapterRef.state.videoDeviceHasOpened = !0, this.adapterRef.logger.log(
                "Device: 开启摄像头, options ", JSON.stringify(e, null, " ")), this._doStartDeviceCommon(t,
                r)) : t === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_SCREEN || t === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_WINDOW ||
              t === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN ? (this.adapterRef.apiReportHelper &&
                this.adapterRef.apiReportHelper.uploadDataApi("update", {
                  key: "screen_sharing_module"
                }), this.adapterRef.state.chromeScreenShareOpened = !0, this.adapterRef.logger.log(
                  "Device: 开启屏幕共享, options ", JSON.stringify(e, null, " ")), this._doStartDeviceCommon(
                  t, r)) : Promise.reject(c.DeviceErrorCode.DeviceNotSupport)
          }
        }, {
          key: "_doStartDeviceCommon",
          value: function(e, t) {
            var r = this,
              i = Promise.resolve(),
              n = !t || !t.deviceId;
            return n && (i = this.getDevicesOfType(e)), new Promise(function(a, o) {
              i.then(function(i) {
                var s = null,
                  d = e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_SCREEN || e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_WINDOW ||
                  e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN;
                if (n && !d) {
                  if (!i || 0 == i.length) return void o(c.DeviceErrorCode.DeviceNotExists);
                  s = i[0]
                } else s = t;
                if (e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
                  var u = r.adapterRef.instance._getAudioHelperByUid("local");
                  return u.hasStartAudioDeviceRepeat(s).then(function() {
                    return u.startAudioDevice(s, a, o)
                  }).catch(function(e) {
                    /重复操作/.test(e) ? a() : (e = Object.assign(c.DeviceErrorCode.DeviceAudioOccupied, {
                      event: e
                    }), o(e))
                  })
                }
                if (e === c.DEVICE_TYPE.DEVICE_TYPE_VIDEO) {
                  var l = r.adapterRef.instance._getVideoHelperByUid("local");
                  return l.hasStartVideoDeviceRepeat(s).then(function() {
                    return l.startVideoDevice(s, a, o)
                  })
                }
                if (d) {
                  var p = r.adapterRef.instance._getVideoHelperByUid("local");
                  return p.hasStartScreenShareRepeat().then(function() {
                    return p.startScreenShare(s, a, o)
                  })
                }
              }).catch(function(e) {
                e = Object.assign(c.DeviceErrorCode.DeviceOpenError, {
                  event: e
                }), o(e)
              })
            })
          }
        }, {
          key: "stopDevice",
          value: function(e) {
            var t = this;
            return new Promise(function(r, i) {
              if (e === c.DEVICE_TYPE.DEVICE_TYPE_VIDEO) {
                t.adapterRef.logger.log("Device: stopDevice: 关闭摄像头");
                var n = t.adapterRef.instance._getVideoHelperByUid("local");
                return t.adapterRef.state.videoDeviceHasOpened = !1, n ? n.stopVideoDevice(r) : (t.adapterRef
                  .logger.error("Device: stopDevice: 不存在的videoHelper对象，直接返回"), Promise.reject(c.DeviceErrorCode
                    .DeviceNotOpen))
              }
              if (e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_SCREEN || e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_WINDOW ||
                e === c.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN) {
                t.adapterRef.logger.log("Device: stopDevice: 关闭屏幕共享");
                var a = t.adapterRef.instance._getVideoHelperByUid("local");
                return t.adapterRef.state.chromeScreenShareOpened = !1, a ? a.stopScreenShare(r) :
                  (t.adapterRef.logger.error("Device: stopDevice: 不存在的videoHelper对象，直接返回"), Promise
                    .reject(c.DeviceErrorCode.DeviceNotOpen))
              }
              if (e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
                t.adapterRef.logger.log("Device: stopDevice: 关闭麦克风");
                var o = t.adapterRef.instance._getAudioHelperByUid("local");
                if (t.adapterRef.state.audioDeviceHasOpened = !1, !o) return t.adapterRef.logger.error(
                  "Device: stopDevice: 不存在的audioHelper对象，直接返回"), Promise.reject(c.DeviceErrorCode
                  .DeviceNotOpen);
                o.destroyMedia(), r()
              } else e === c.DEVICE_TYPE.DEVICE_TYPE_AUDIO_OUT_LOCAL ? (t.adapterRef.logger.log(
                  "Device: stopDevice: 停止本地声音"), t._doStopDevice4PlayLocalAudio(), r()) : e === c.DEVICE_TYPE
                .DEVICE_TYPE_AUDIO_OUT_CHAT && (t.adapterRef.logger.log(
                  "Device: stopDevice: 停止远程声音"), t._doStopDevice4PlayRemoteAudio(), r())
            })
          }
        }, {
          key: "_doStopDevice4PlayLocalAudio",
          value: function() {
            return this.adapterRef.instance._getAudioHelperByUid("local").stopAudio(), Promise.resolve()
          }
        }, {
          key: "_doStopDevice4PlayRemoteAudio",
          value: function(e, t) {
            return t || e ? t ? this._doStopRemoteAudioByUid(t) : e && (t = this._getUidByAccount(e),
              this._doStopRemoteAudioByUid(t)) : this._doStopChatAudioOfAllRemoteAudio(), Promise.resolve()
          }
        }, {
          key: "_doStopChatAudioOfAllRemoteAudio",
          value: function() {
            var e = this;
            Object.keys(this.adapterRef.audioHelperMap).forEach(function(t) {
              e._doStopRemoteAudioByUid(t)
            })
          }
        }, {
          key: "_doStopRemoteAudioByUid",
          value: function(e) {
            "" + this.adapterRef.imInfo.uid != "" + e ? this.adapterRef.instance._getAudioHelperByUid(e)
              .stopAudio() : this.adapterRef.logger.warn(
                "Device: _doStopRemoteAudioByUid: 非远程流账号或UID，无法停止：UID=%s", e)
          }
        }, {
          key: "_doStartDevice4PlayLocalAudio",
          value: function() {
            return this.adapterRef.instance._getAudioHelperByUid("local").playAudio(), Promise.resolve()
          }
        }, {
          key: "_doStartDevice4PlayRemoteAudio",
          value: function(e) {
            return e ? e && this._doPlayRemoteAudioByUid(e) : this._doPlayChatAudioOfAllRemoteAudio(),
              Promise.resolve()
          }
        }, {
          key: "_doPlayChatAudioOfAllRemoteAudio",
          value: function() {
            var e = this;
            Object.keys(this.adapterRef.audioHelperMap).forEach(function(t) {
              e._doPlayRemoteAudioByUid(t)
            })
          }
        }, {
          key: "_doPlayRemoteAudioByUid",
          value: function(e) {
            if ("" + this.adapterRef.imInfo.uid != "" + e) {
              var t = this.adapterRef.instance._getAudioHelperByUid(e);
              t.setMuted(!1), t.playAudio()
            } else this.adapterRef.logger.warn(
              "Device: _doStopRemoteAudioByUid: 非远程流账号或UID，无法播放：UID=%s", e)
          }
        }]), t
      }(s.EventEmitter);
      t.DeviceApi = u
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(318);
      Object.defineProperty(t, "DeviceApi", {
        enumerable: !0,
        get: function() {
          return i.DeviceApi
        }
      });
      var n = r(317);
      Object.defineProperty(t, "CaptureApi", {
        enumerable: !0,
        get: function() {
          return n.CaptureApi
        }
      });
      var a = r(316);
      Object.defineProperty(t, "RecordApi", {
        enumerable: !0,
        get: function() {
          return a.RecordApi
        }
      });
      var o = r(315);
      Object.defineProperty(t, "Meeting4NRTCApi", {
        enumerable: !0,
        get: function() {
          return o.Meeting4NRTCApi
        }
      });
      var s = r(313);
      Object.defineProperty(t, "Meeting4WebRTCApi", {
        enumerable: !0,
        get: function() {
          return s.Meeting4WebRTCApi
        }
      });
      var c = r(312);
      Object.defineProperty(t, "P2P4WebRTCApi", {
        enumerable: !0,
        get: function() {
          return c.P2P4WebRTCApi
        }
      });
      var d = r(311);
      Object.defineProperty(t, "CommonApi", {
        enumerable: !0,
        get: function() {
          return d.CommonApi
        }
      });
      var u = r(310);
      Object.defineProperty(t, "PlayApi", {
        enumerable: !0,
        get: function() {
          return u.PlayApi
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.IMBusiness = void 0;
      var i = d(r(1)),
        n = d(r(5)),
        a = d(r(4)),
        o = d(r(3)),
        s = r(24),
        c = r(11);

      function d(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var u = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r._bindImEvent(), r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.adapterRef = null, this.sdkRef = null
          }
        }, {
          key: "_isCurrentChannelId",
          value: function(e) {
            return this.adapterRef.channelId && this.adapterRef.channelId == e
          }
        }, {
          key: "resetWhenHangup",
          value: function() {
            this.adapterRef.instance._stopSession(), this.adapterRef.nim.protocol.setCurrentNetcall()
          }
        }, {
          key: "_initSession",
          value: function() {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.adapterRef.sessionMode = c.SESSION_MODE.P2P;
            var r = this.adapterRef.isCaller ? this.adapterRef.callerInfo : t.beCalledInfo;
            this._parseAccountUidMap(r.accountUidMap), !r.account && r.uid && (r.account = this.adapterRef
                .instance._getAccountByUid(r.uid)), this.adapterRef.callAccepted = !0, this.adapterRef.instance
              ._setSessionConfig({
                signalEndTime: Date.now()
              }), this.adapterRef.apiReportHelper.uploadDataApi("start", {
                uid: r.uid
              }), this.adapterRef.target.uid = this.adapterRef.instance._getUidByAccount(this.adapterRef
                .target.account);
            var i = {
              type: r.type,
              account: this.adapterRef.target && this.adapterRef.target.account || r.account,
              channelId: r.channelId
            };
            r.netcallType && (i.netcallType = r.netcallType), this.adapterRef.imInfo.target = this.target,
              setTimeout(function() {
                e.adapterRef.instance.setStartSessionTime(), e.adapterRef.instance.emit(c.EVENT_OBJ.callAccepted
                  .key, i)
              }, 1)
          }
        }, {
          key: "_bindImEvent",
          value: function() {
            this.adapterRef.logger.log("IMBusiness:_bindImEvent");
            var e = this.adapterRef.nim;
            e ? (e.on("beCalled", this._handleBeCalledEvent.bind(this)), e.on("notifyCalleeAck", this._hanldeNotifyCalleeAckEvent
              .bind(this)), e.on("notifyHangup", this._hanldeNotifyHangupEvent.bind(this)), e.on(
              "netcallControl", this._handleNetCallControlEvent.bind(this)), e.on(
              "notifyCalleeAckSync", this._handleNotifyCalleeAckSyncEvent.bind(this)), e.on(
              "notifyJoin", this._handleNotifyJoinEvent.bind(this))) : this.adapterRef.logger.warn(
              "IMBusiness:_bindImEvent 不存在nim实例...")
          }
        }, {
          key: "_unbindImEvent",
          value: function() {
            var e = this.adapterRef.nim;
            e ? (e.removeListener("beCalled", this._handleBeCalledEvent.bind(this)), e.removeListener(
              "notifyCalleeAck", this._hanldeNotifyCalleeAckEvent.bind(this)), e.removeListener(
              "notifyHangup", this._hanldeNotifyHangupEvent.bind(this)), e.removeListener(
              "netcallControl", this._handleNetCallControlEvent.bind(this)), e.removeListener(
              "notifyCalleeAckSync", this._handleNotifyCalleeAckSyncEvent.bind(this)), e.removeListener(
              "notifyJoin", this._handleNotifyJoinEvent.bind(this))) : this.adapterRef.logger.warn(
              "IMBusiness:_bindImEvent 不存在nim实例...")
          }
        }, {
          key: "_handleBeCalledEvent",
          value: function(e) {
            this.adapterRef.logger.log("IMBusiness: _handleBeCalledEvent event=%o", e),
            console.log('this.adapterRef.calling && this.adapterRef.channelId', this.adapterRef);
            if (this.adapterRef.calling && this.adapterRef.channelId) {
              // return;
              console.log('sth wrong here');
              this.adapterRef.instance.emit(c.EVENT_OBJ.beCalling.key, e);
              return;
            }
            this.adapterRef.signalInited = !0,
            this.adapterRef.channelId = e.channelId,
            this.adapterRef.beCalledInfo =e,
            this.adapterRef.target.account
             || (this.adapterRef.target.account = e.account,
            this.adapterRef.logger.log("IMBusiness: _handleBeCalledEvent event=%o", this.adapterRef.target)),
            this.adapterRef.imInfo || (this.adapterRef.imInfo = {}),
            this.adapterRef.imInfo.uid = e.uid,
            this.adapterRef.instance.emit(c.EVENT_OBJ.beCalling.key, e)
          }
        }, {
          key: "_hanldeNotifyCalleeAckEvent",
          value: function(e) {
            var t = e.account,
              r = e.type,
              i = e.accepted,
              n = e.channelId;
            if (this._isCurrentChannelId(n)) {
              this.adapterRef.logger.log(
                "IMBusiness: _hanldeNotifyCalleeAckEvent event=%o, oldChannelId=%o", e, this.adapterRef
                .channelId);
              var a = this.adapterRef.beCalledInfo || this.adapterRef.callerInfo;
              this.adapterRef.target.account = t, this.adapterRef.instance._setSessionConfig({
                signalEndTime: Date.now()
              }), i ? (this.adapterRef.callAccepted = !0, this._initSession()) : (this._packNetcallRecord({
                type: r,
                channelId: n,
                isCaller: !0,
                target: t,
                recordType: "netcallRejected"
              }), this.resetWhenHangup(), this.adapterRef.instance.emit(c.EVENT_OBJ.callRejected.key, {
                type: a.type,
                account: t
              }))
            } else this.adapterRef.logger.warn(
              "IMBusiness: _hanldeNotifyCalleeAckEvent 非当前频道ID的通话，直接忽略...")
          }
        }, {
          key: "_hanldeNotifyHangupEvent",
          value: function(e) {
            console.log('_hanldeNotifyHangupEvent', e);
            var t = this,
              r = e.channelId,
              i = e.account,
              n = e.timetag;
            this.adapterRef.channelId ? this.adapterRef.sessionMode == c.SESSION_MODE.P2P || this.adapterRef
              .beCalledInfo ? (this.adapterRef.logger.log(
                  "IMBusiness: _hanldeNotifyHangupEvent event=%o, %o", e, this.adapterRef.target), this
                .adapterRef.target && this.adapterRef.target.account == i && (this.adapterRef.apiReportHelper
                  .uploadDataApi("send"), this.adapterRef.logReportHelper && this.adapterRef.logReportHelper
                  .uploadData("send"), setTimeout(function() {
                    t.adapterRef.logger.log("IMBusiness: _hanldeNotifyHangupEvent 主动挂断处理，1s后"), t.resetWhenHangup()
                  }, 1e3), this.adapterRef.instance.setEndSessionTime()), this.adapterRef.instance.emit(
                  c.EVENT_OBJ.hangup.key, Object.assign(c.EVENT_CODE.USER_LEFT_REASON.quit, {
                    channelId: r,
                    account: i,
                    timetag: n
                  }))) : this.adapterRef.logger.warn("IMBusiness: _hanldeNotifyHangupEvent 非点对点会话模式...") :
              this.adapterRef.logger.warn("IMBusiness: _hanldeNotifyHangupEvent 未定义的channelId ... ")
          }
        }, {
          key: "_handleNetCallControlEvent",
          value: function(e) {
            this.adapterRef.logger.log("IMBusiness: _handleNetCallControlEvent event=%o", e);
            var t = {};
            console.log('this.adapterRef.instance', this.adapterRef.instance);
            t.channelId = e.channelId,
            t.type = e.type,
            t.command = e.type,
            e.account && (t.account = e.account),
            this.adapterRef.instance.emit(c.EVENT_OBJ.control.key, t)
          }
        }, {
          key: "_handleNotifyCalleeAckSyncEvent",
          value: function(e) {
            this.adapterRef.logger.log("IMBusiness: _handleNotifyCalleeAckSyncEvent event=%o", e);
            var t = e.timetag,
              r = e.channelId,
              i = e.type,
              n = e.accepted,
              a = e.fromClientType;
            this.adapterRef.instance.emit(c.EVENT_OBJ.callerAckSync.key, {
              timetag: t,
              channelId: r,
              type: i,
              accepted: n,
              fromClientType: a
            }), this._isCurrentChannelId(r) && this.resetWhenHangup()
          }
        }, {
          key: "_handleNotifyJoinEvent",
          value: function(e) {
            this.adapterRef.logger.log("IMBusiness: _handleNotifyJoinEvent event=%o", e);
            var t = e.accountUidMap;
            this._parseAccountUidMap(t);
            var r = this.adapterRef.needQueryAccountMap;
            for (var i in t) {
              var n = t[i];
              if (n in r) {
                var a = r[n];
                a.account = i, this.adapterRef.logger.log(
                  "IMBusiness:_handleNotifyJoinEvent 需要反查映射表删除键 uid=%s, account=%s", n, i), delete r[
                  n], this.adapterRef.instance.emit("joinChannel", a), this.adapterRef.instance.emit(
                  c.EVENT_OBJ.userJoined.key, a)
              }
            }
          }
        }, {
          key: "_packNetcallRecord",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.adapterRef.logger.log("IMBusiness: _packNetcallRecord options=%o", e);
            var t = e.recordType,
              r = e.type || this.adapterRef.type,
              i = e.channelId || this.adapterRef.channelId,
              n = e.duration || 0,
              a = e.isCaller || this.adapterRef.isCaller,
              o = e.target || this.adapterRef.target.account,
              c = this.adapterRef.nim && this.adapterRef.nim.account,
              d = a ? c : o,
              u = a ? o : c,
              l = +new Date;
            this.adapterRef.nim.protocol.onMsg({
              content: {
                msg: {
                  attach: JSON.stringify({
                    data: {
                      calltype: r,
                      channel: i,
                      duration: n,
                      ids: [c, o],
                      time: l
                    },
                    id: t
                  }),
                  from: d,
                  fromClientType: a ? 16 : 0,
                  fromDeviceId: "",
                  fromNick: "",
                  idClient: s.tool.guid(),
                  idServer: s.tool.guid(),
                  scene: 0,
                  time: l,
                  to: u,
                  type: 5
                }
              }
            })
          }
        }, {
          key: "_parseAccountUidMap",
          value: function(e) {
            var t = this;
            this.adapterRef.logger.log("IMBusiness: _parseAccountUidMap 解析点对点映射表..."), Object.keys(e).forEach(
              function(r) {
                t._addAccountUidMap({
                  account: r,
                  uid: e[r]
                })
              })
          }
        }, {
          key: "_addAccountUidMap",
          value: function(e) {
            this.adapterRef.logger.log("IMBusiness: _addAccountUidMap 追加正反向映射表...");
            var t = e.account,
              r = e.uid;
            this._addUid4AccountMap(t, r), this._addAccount4UidMap(t, r)
          }
        }, {
          key: "_addUid4AccountMap",
          value: function(e, t) {
            this.adapterRef.logger.log("IMBusiness: _addUid4AccountMap uid -> account 映射表..."), this.adapterRef
              .uid4AccountMap || (this.adapterRef.logger.log(
                "IMBusiness: _addUid4AccountMap 初始化uid4AccountMap ={} "), this.adapterRef.uid4AccountMap = {}),
              this.adapterRef.uid4AccountMap[t] = e
          }
        }, {
          key: "_addAccount4UidMap",
          value: function(e, t) {
            this.adapterRef.logger.log("IMBusiness:_addAccount4UidMap uid -> account 映射表..."), this.adapterRef
              .account4UidMap || (this.adapterRef.logger.log(
                "IMBusiness: _addAccount4UidMap 初始化account4UidMap ={} "), this.adapterRef.account4UidMap = {}),
              this.adapterRef.account4UidMap[e] = t
          }
        }, {
          key: "initNetcall",
          value: function() {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.adapterRef.logger.log("IMBusiness: initNetcall options=%o", t);
            var r = this,
              i = t.type,
              n = t.pushConfig;
            // console.log('r ========= e', r===e);
            return this.adapterRef.type = i, this.adapterRef.instance._setSessionConfig({
              signalStartTime: Date.now()
            }), this.adapterRef.nim.initNetcall({
              type: i,
              accounts: [this.adapterRef.callee],
              pushConfig: n,
              webrtcEnable: !0
            }).then(function(t) {
              e.adapterRef.logger.log("IMBusiness: initNetcall response=%o", t),
              r.adapterRef.signalInited = !0,
              r.adapterRef.sessionMode = c.SESSION_MODE.P2P,
              r.adapterRef.callerInfo = Object.assign({},t),
              r.adapterRef.channelId = t.channelId,
              r.adapterRef.imInfo = Object.assign(r.adapterRef.imInfo, r.adapterRef.callerInfo),
              r.adapterRef.imInfo.sessionMode = r.adapterRef.sessionMode,
              r.adapterRef.imInfo.role = c.ROLE_FOR_MEETING.ROLE_PLAYER;
              return t;
            }).catch(function(t) {
              e.adapterRef.logger.error("IMBusiness: initNetcall error=%o", t),
              r.adapterRef.instance._setSessionConfig({
                  signalEndTime: Date.now()
              }),
              r.resetWhenHangup();
              var i = Object.assign({
                event: t
              }, c.CommonErrorCode.ChannelStartFail);
              return Promise.reject(i)
            })
          }
        }, {
          key: "baseResponse",
          value: function() {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.adapterRef.logger.log("IMBusiness: baseResponse options=%o", t);
            var r = t.fn || "calleeAck",
              i = t.beCalledInfo || this.adapterRef.beCalledInfo,
              n = i.accepted = 0 != t.accepted;
            return n ? (this.adapterRef.sessionMode = c.SESSION_MODE.P2P, this.adapterRef.type = i.type,
              this.adapterRef.channelId = i.channelId, this.adapterRef.target.account = i.account,
              this.adapterRef.calling = !0, this.adapterRef.imInfo = i, this.adapterRef.imInfo.sessionMode =
              this.adapterRef.sessionMode, this.adapterRef.imInfo.role = c.ROLE_FOR_MEETING.ROLE_PLAYER,
              this.adapterRef.instance._setSessionConfig({
                signalStartTime: Date.now()
              })) : this._packNetcallRecord({
              type: i.type,
              channelId: i.channelId,
              isCaller: !1,
              target: i.account,
              recordType: "rejectNetcall"
            }), this.adapterRef.nim[r](i).then(function() {
              e.adapterRef.logger.log("IMBusiness: baseResponse success"), n && (t.sessionConfig &&
                e.adapterRef.instance._setSessionConfig(t.sessionConfig), e.adapterRefbeCalledInfo =
                i, e._initSession({
                  beCalledInfo: i
                }))
            }, function(t) {
              throw e.adapterRef.logger.error("IMBusiness: baseResponse error=%o", t), t
            })
          }
        }, {
          key: "baseHangup",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.adapterRef.logger.log("IMBusiness: baseHandup options=%o", e), this.adapterRef.apiReportHelper
              .uploadDataApi("send"), this.adapterRef.logReportHelper && this.adapterRef.logReportHelper
              .uploadData("send");
            var t = e.channelId,
              r = e.recordType;
            if (!t && this.adapterRef.calling && this.adapterRef.channelId && (t = this.adapterRef.channelId),
              t) {
              var i = e.fn || "hangup";
              this.adapterRef.nim[i]({
                channelId: t
              })
            }
            t === this.adapterRef.channelId && (this.adapterRef.isCaller && !this.adapterRef.callAccepted &&
              this._packNetcallRecord({
                recordType: r
              }), this.resetWhenHangup())
          }
        }, {
          key: "baseControl",
          value: function() {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (this.adapterRef.logger.log("IMBusiness: baseControl options=%o", t), t.channelId = t.channelId ||
              this.adapterRef.channelId, t.command && t.channelId) {
              console.log('this.adapterRef.apiReportHelper', this.adapterRef.apiReportHelper);
              this.adapterRef.apiReportHelper.uploadDataApi("update", {
                key: "call_control_type"
              });
              var r = t.fn || "netcallControl";
              console.log('this.adapterRef.nim r t', this.adapterRef.nim[r], t);
              return t.type = t.command, this.adapterRef.nim[r](t).catch(function(t) {
                e.adapterRef.logger.error("IMBusiness: baseControl error=%o", t)
              })
            }
          }
        }, {
          key: "baseCreateChannel",
          value: function(e) {
            var t = this,
              r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return s.tool.verifyOptions(r, "channelName"), r.custom = r.custom || "", this.adapterRef.instance
              ._setSessionConfig({
                signalStartTime: Date.now()
              }), this.adapterRef.nim[e](r).then(function(e) {
                return t.adapterRef.logger.log("IMBusiness: baseCreateChannel success=%o", e),
                  Promise.resolve(e)
              }).catch(function(e) {
                t.adapterRef.logger.error("IMBusiness: baseCreateChannel error=%o", e), t.adapterRef.instance
                  ._setSessionConfig({
                    signalEndTime: Date.now()
                  });
                var r = Object.assign({
                  event: e
                }, c.CommonErrorCode.ChannelCreatingError);
                return Promise.reject(r)
              })
          }
        }, {
          key: "baseJoinChannel",
          value: function(e) {
            var t = this,
              r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return this.adapterRef.nim[e](r).then(function(e) {
              return t.adapterRef.instance._setSessionConfig({
                  signalEndTime: Date.now()
                }), t.adapterRef.signalInited = !0, t.adapterRef.sessionMode = e.sessionMode =
                "meeting", t._parseAccountUidMap(e.accountUidMap), e.uid = t.adapterRef.instance._getUidByAccount(
                  t.adapterRef.nim.account), Promise.resolve(e)
            }).catch(function(e) {
              t.adapterRef.instance._setSessionConfig({
                signalEndTime: Date.now()
              });
              var r = Object.assign({
                event: e
              }, c.CommonErrorCode.ChannelJoinError);
              return Promise.reject(r)
            })
          }
        }, {
          key: "hangup",
          value: function() {
            this.adapterRef.instance._stopSession(), this.adapterRef.instance._resetStatus()
          }
        }, {
          key: "destroy",
          value: function() {
            this.adapterRef.logger.log("IMBusiness:destroy"), this._unbindImEvent()
          }
        }]), t
      }(r(123).AbstractBusiness);
      // console.log('u=====', u);
      t.IMBusiness = u
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTCBuilder = void 0;
      var i = d(r(1)),
        n = d(r(5)),
        a = r(180),
        o = r(179),
        s = r(178),
        c = r(177);

      function d(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var u = function() {
        function e(t) {
          (0, i.default)(this, e);
          var r = t.imInfo,
            n = t.targetUid,
            a = t.platformName,
            o = t.platformVersion,
            s = t.adapterRef;
          this.webrtcInstance = null, this.adapterRef = s, this.imInfo = r, this.targetUid = n, this.platformName =
            a, this.platformVersion = o
        }
        return (0, n.default)(e, [{
          key: "getVersion4User",
          value: function() {
            return this.platformVersion.split(".")[0]
          }
        }, {
          key: "build",
          value: function() {
            var e = this.platformName.toLowerCase(),
              t = this.getVersion4User(),
              r = (0, a.isMatchVersion)(e, t),
              i = (0, a.maxVersion)(e);
            switch (this.platformName) {
              case "Chrome":
                this.webrtcInstance = this.buildChrome4DefinedVersion(r ? t : i);
                break;
              case "Firefox":
                this.webrtcInstance = this.buildFirefox4DefinedVersion(r ? t : i);
                break;
              case "Safari":
                this.webrtcInstance = this.buildSafari4DefinedVersion(r ? t : i);
                break;
              default:
                this.webrtcInstance = this.buildChrome4DefinedVersion("69")
            }
            return this.webrtcInstance
          }
        }, {
          key: "buildChrome4DefinedVersion",
          value: function(e) {
            var t = null;
            switch (e) {
              case "65":
              default:
                t = this.createChromeReleaseInstance()
            }
            return t
          }
        }, {
          key: "buildFirefox4DefinedVersion",
          value: function(e) {
            var t = null;
            switch (e) {
              case "59":
              default:
                t = this.createFirefoxReleaseInstance()
            }
            return t
          }
        }, {
          key: "buildSafari4DefinedVersion",
          value: function(e) {
            var t = null;
            switch (e) {
              case "11":
              default:
                t = this.createSafariReleaseInstance()
            }
            return t
          }
        }, {
          key: "createChromeReleaseInstance",
          value: function() {
            return new o.WebRTC4ChromeRelease({
              adapterRef: this.adapterRef,
              imInfo: this.imInfo,
              targetUid: this.targetUid
            })
          }
        }, {
          key: "createFirefoxReleaseInstance",
          value: function() {
            return new s.WebRTC4FirefoxRelease({
              adapterRef: this.adapterRef,
              imInfo: this.imInfo,
              targetUid: this.targetUid
            })
          }
        }, {
          key: "createSafariReleaseInstance",
          value: function() {
            return new c.WebRTC4SafariRelease({
              adapterRef: this.adapterRef,
              imInfo: this.imInfo,
              targetUid: this.targetUid
            })
          }
        }]), e
      }();
      t.WebRTCBuilder = u
    }, function(e, t, r) {
      "use strict";
      var i = {
        generateIdentifier: function() {
          return Math.random().toString(36).substr(2, 10)
        }
      };
      i.localCName = i.generateIdentifier(), i.splitLines = function(e) {
        return e.trim().split("\n").map(function(e) {
          return e.trim()
        })
      }, i.splitSections = function(e) {
        return e.split("\nm=").map(function(e, t) {
          return (t > 0 ? "m=" + e : e).trim() + "\r\n"
        })
      }, i.getDescription = function(e) {
        var t = i.splitSections(e);
        return t && t[0]
      }, i.getMediaSections = function(e) {
        var t = i.splitSections(e);
        return t.shift(), t
      }, i.matchPrefix = function(e, t) {
        return i.splitLines(e).filter(function(e) {
          return 0 === e.indexOf(t)
        })
      }, i.parseCandidate = function(e) {
        for (var t, r = {
            foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(
              " "))[0],
            component: parseInt(t[1], 10),
            protocol: t[2].toLowerCase(),
            priority: parseInt(t[3], 10),
            ip: t[4],
            port: parseInt(t[5], 10),
            type: t[7]
          }, i = 8; i < t.length; i += 2) switch (t[i]) {
          case "raddr":
            r.relatedAddress = t[i + 1];
            break;
          case "rport":
            r.relatedPort = parseInt(t[i + 1], 10);
            break;
          case "tcptype":
            r.tcpType = t[i + 1];
            break;
          case "ufrag":
            r.ufrag = t[i + 1], r.usernameFragment = t[i + 1];
            break;
          default:
            r[t[i]] = t[i + 1]
        }
        return r
      }, i.writeCandidate = function(e) {
        var t = [];
        t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(
          e.ip), t.push(e.port);
        var r = e.type;
        return t.push("typ"), t.push(r), "host" !== r && e.relatedAddress && e.relatedPort && (t.push("raddr"),
            t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol
          .toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push(
            "ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ")
      }, i.parseIceOptions = function(e) {
        return e.substr(14).split(" ")
      }, i.parseRtpMap = function(e) {
        var t = e.substr(9).split(" "),
          r = {
            payloadType: parseInt(t.shift(), 10)
          };
        return t = t[0].split("/"), r.name = t[0], r.clockRate = parseInt(t[1], 10), r.channels = 3 === t.length ?
          parseInt(t[2], 10) : 1, r.numChannels = r.channels, r
      }, i.writeRtpMap = function(e) {
        var t = e.payloadType;
        void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
        var r = e.channels || e.numChannels || 1;
        return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== r ? "/" + r : "") + "\r\n"
      }, i.parseExtmap = function(e) {
        var t = e.substr(9).split(" ");
        return {
          id: parseInt(t[0], 10),
          direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
          uri: t[1]
        }
      }, i.writeExtmap = function(e) {
        return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction :
          "") + " " + e.uri + "\r\n"
      }, i.parseFmtp = function(e) {
        for (var t, r = {}, i = e.substr(e.indexOf(" ") + 1).split(";"), n = 0; n < i.length; n++) r[(t = i[n].trim()
          .split("="))[0].trim()] = t[1];
        return r
      }, i.writeFmtp = function(e) {
        var t = "",
          r = e.payloadType;
        if (void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.parameters && Object.keys(e.parameters)
          .length) {
          var i = [];
          Object.keys(e.parameters).forEach(function(t) {
            e.parameters[t] ? i.push(t + "=" + e.parameters[t]) : i.push(t)
          }), t += "a=fmtp:" + r + " " + i.join(";") + "\r\n"
        }
        return t
      }, i.parseRtcpFb = function(e) {
        var t = e.substr(e.indexOf(" ") + 1).split(" ");
        return {
          type: t.shift(),
          parameter: t.join(" ")
        }
      }, i.writeRtcpFb = function(e) {
        var t = "",
          r = e.payloadType;
        return void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback
          .length && e.rtcpFeedback.forEach(function(e) {
            t += "a=rtcp-fb:" + r + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter :
              "") + "\r\n"
          }), t
      }, i.parseSsrcMedia = function(e) {
        var t = e.indexOf(" "),
          r = {
            ssrc: parseInt(e.substr(7, t - 7), 10)
          },
          i = e.indexOf(":", t);
        return i > -1 ? (r.attribute = e.substr(t + 1, i - t - 1), r.value = e.substr(i + 1)) : r.attribute = e
          .substr(t + 1), r
      }, i.parseSsrcGroup = function(e) {
        var t = e.substr(13).split(" ");
        return {
          semantics: t.shift(),
          ssrcs: t.map(function(e) {
            return parseInt(e, 10)
          })
        }
      }, i.getMid = function(e) {
        var t = i.matchPrefix(e, "a=mid:")[0];
        if (t) return t.substr(6)
      }, i.parseFingerprint = function(e) {
        var t = e.substr(14).split(" ");
        return {
          algorithm: t[0].toLowerCase(),
          value: t[1]
        }
      }, i.getDtlsParameters = function(e, t) {
        return {
          role: "auto",
          fingerprints: i.matchPrefix(e + t, "a=fingerprint:").map(i.parseFingerprint)
        }
      }, i.writeDtlsParameters = function(e, t) {
        var r = "a=setup:" + t + "\r\n";
        return e.fingerprints.forEach(function(e) {
          r += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
        }), r
      }, i.getIceParameters = function(e, t) {
        var r = i.splitLines(e);
        return {
          usernameFragment: (r = r.concat(i.splitLines(t))).filter(function(e) {
            return 0 === e.indexOf("a=ice-ufrag:")
          })[0].substr(12),
          password: r.filter(function(e) {
            return 0 === e.indexOf("a=ice-pwd:")
          })[0].substr(10)
        }
      }, i.writeIceParameters = function(e) {
        return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
      }, i.parseRtpParameters = function(e) {
        for (var t = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: [],
            rtcp: []
          }, r = i.splitLines(e)[0].split(" "), n = 3; n < r.length; n++) {
          var a = r[n],
            o = i.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
          if (o) {
            var s = i.parseRtpMap(o),
              c = i.matchPrefix(e, "a=fmtp:" + a + " ");
            switch (s.parameters = c.length ? i.parseFmtp(c[0]) : {}, s.rtcpFeedback = i.matchPrefix(e,
              "a=rtcp-fb:" + a + " ").map(i.parseRtcpFb), t.codecs.push(s), s.name.toUpperCase()) {
              case "RED":
              case "ULPFEC":
                t.fecMechanisms.push(s.name.toUpperCase())
            }
          }
        }
        return i.matchPrefix(e, "a=extmap:").forEach(function(e) {
          t.headerExtensions.push(i.parseExtmap(e))
        }), t
      }, i.writeRtpDescription = function(e, t) {
        var r = "";
        r += "m=" + e + " ", r += t.codecs.length > 0 ? "9" : "0", r += " UDP/TLS/RTP/SAVPF ", r += t.codecs.map(
          function(e) {
            return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
          }).join(" ") + "\r\n", r += "c=IN IP4 0.0.0.0\r\n", r += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(
          function(e) {
            r += i.writeRtpMap(e), r += i.writeFmtp(e), r += i.writeRtcpFb(e)
          });
        var n = 0;
        return t.codecs.forEach(function(e) {
            e.maxptime > n && (n = e.maxptime)
          }), n > 0 && (r += "a=maxptime:" + n + "\r\n"), r += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions
          .forEach(function(e) {
            r += i.writeExtmap(e)
          }), r
      }, i.parseRtpEncodingParameters = function(e) {
        var t, r = [],
          n = i.parseRtpParameters(e),
          a = -1 !== n.fecMechanisms.indexOf("RED"),
          o = -1 !== n.fecMechanisms.indexOf("ULPFEC"),
          s = i.matchPrefix(e, "a=ssrc:").map(function(e) {
            return i.parseSsrcMedia(e)
          }).filter(function(e) {
            return "cname" === e.attribute
          }),
          c = s.length > 0 && s[0].ssrc,
          d = i.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
            return e.substr(17).split(" ").map(function(e) {
              return parseInt(e, 10)
            })
          });
        d.length > 0 && d[0].length > 1 && d[0][0] === c && (t = d[0][1]), n.codecs.forEach(function(e) {
          if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
            var i = {
              ssrc: c,
              codecPayloadType: parseInt(e.parameters.apt, 10)
            };
            c && t && (i.rtx = {
              ssrc: t
            }), r.push(i), a && ((i = JSON.parse(JSON.stringify(i))).fec = {
              ssrc: t,
              mechanism: o ? "red+ulpfec" : "red"
            }, r.push(i))
          }
        }), 0 === r.length && c && r.push({
          ssrc: c
        });
        var u = i.matchPrefix(e, "b=");
        return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf(
          "b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * .95 - 16e3 : void 0, r.forEach(function(e) {
          e.maxBitrate = u
        })), r
      }, i.parseRtcpParameters = function(e) {
        var t = {},
          r = i.matchPrefix(e, "a=ssrc:").map(function(e) {
            return i.parseSsrcMedia(e)
          }).filter(function(e) {
            return "cname" === e.attribute
          })[0];
        r && (t.cname = r.value, t.ssrc = r.ssrc);
        var n = i.matchPrefix(e, "a=rtcp-rsize");
        t.reducedSize = n.length > 0, t.compound = 0 === n.length;
        var a = i.matchPrefix(e, "a=rtcp-mux");
        return t.mux = a.length > 0, t
      }, i.parseMsid = function(e) {
        var t, r = i.matchPrefix(e, "a=msid:");
        if (1 === r.length) return {
          stream: (t = r[0].substr(7).split(" "))[0],
          track: t[1]
        };
        var n = i.matchPrefix(e, "a=ssrc:").map(function(e) {
          return i.parseSsrcMedia(e)
        }).filter(function(e) {
          return "msid" === e.attribute
        });
        return n.length > 0 ? {
          stream: (t = n[0].value.split(" "))[0],
          track: t[1]
        } : void 0
      }, i.generateSessionId = function() {
        return Math.random().toString().substr(2, 21)
      }, i.writeSessionBoilerplate = function(e, t) {
        var r = void 0 !== t ? t : 2;
        return "v=0\r\no=thisisadapterortc " + (e || i.generateSessionId()) + " " + r +
          " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
      }, i.writeMediaSection = function(e, t, r, n) {
        var a = i.writeRtpDescription(e.kind, t);
        if (a += i.writeIceParameters(e.iceGatherer.getLocalParameters()), a += i.writeDtlsParameters(e.dtlsTransport
            .getLocalParameters(), "offer" === r ? "actpass" : "active"), a += "a=mid:" + e.mid + "\r\n", e.direction ?
          a += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? a += "a=sendrecv\r\n" : e.rtpSender ?
          a += "a=sendonly\r\n" : e.rtpReceiver ? a += "a=recvonly\r\n" : a += "a=inactive\r\n", e.rtpSender) {
          var o = "msid:" + n.id + " " + e.rtpSender.track.id + "\r\n";
          a += "a=" + o, a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + o, e.sendEncodingParameters[
            0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + o, a +=
            "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc +
            "\r\n")
        }
        return a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + i.localCName + "\r\n", e.rtpSender &&
          e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" +
            i.localCName + "\r\n"), a
      }, i.getDirection = function(e, t) {
        for (var r = i.splitLines(e), n = 0; n < r.length; n++) switch (r[n]) {
          case "a=sendrecv":
          case "a=sendonly":
          case "a=recvonly":
          case "a=inactive":
            return r[n].substr(2)
        }
        return t ? i.getDirection(t) : "sendrecv"
      }, i.getKind = function(e) {
        return i.splitLines(e)[0].split(" ")[0].substr(2)
      }, i.isRejected = function(e) {
        return "0" === e.split(" ", 2)[1]
      }, i.parseMLine = function(e) {
        var t = i.splitLines(e)[0].substr(2).split(" ");
        return {
          kind: t[0],
          port: parseInt(t[1], 10),
          protocol: t[2],
          fmt: t.slice(3).join(" ")
        }
      }, i.parseOLine = function(e) {
        var t = i.matchPrefix(e, "o=")[0].substr(2).split(" ");
        return {
          username: t[0],
          sessionId: t[1],
          sessionVersion: parseInt(t[2], 10),
          netType: t[3],
          addressType: t[4],
          address: t[5]
        }
      }, i.isValidSDP = function(e) {
        if ("string" != typeof e || 0 === e.length) return !1;
        for (var t = i.splitLines(e), r = 0; r < t.length; r++)
          if (t[r].length < 2 || "=" !== t[r].charAt(1)) return !1;
        return !0
      }, e.exports = i
    }, function(e, t, r) {
      "use strict";
      var i = r(322),
        n = r(70);
      e.exports = {
        shimRTCIceCandidate: function(e) {
          if (!(e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)) {
            var t = e.RTCIceCandidate;
            e.RTCIceCandidate = function(e) {
                "object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(
                  JSON.stringify(e))).candidate = e.candidate.substr(2));
                var r = new t(e),
                  n = i.parseCandidate(e.candidate),
                  a = Object.assign(r, n);
                return a.toJSON = function() {
                  return {
                    candidate: a.candidate,
                    sdpMid: a.sdpMid,
                    sdpMLineIndex: a.sdpMLineIndex,
                    usernameFragment: a.usernameFragment
                  }
                }, a
              },
              function(e, t, r) {
                if (e.RTCPeerConnection) {
                  var i = e.RTCPeerConnection.prototype,
                    n = i.addEventListener;
                  i.addEventListener = function(e, i) {
                    if (e !== t) return n.apply(this, arguments);
                    var a = function(e) {
                      i(r(e))
                    };
                    return this._eventMap = this._eventMap || {}, this._eventMap[i] = a, n.apply(this, [e,
                      a
                    ])
                  };
                  var a = i.removeEventListener;
                  i.removeEventListener = function(e, r) {
                    if (e !== t || !this._eventMap || !this._eventMap[r]) return a.apply(this, arguments);
                    var i = this._eventMap[r];
                    return delete this._eventMap[r], a.apply(this, [e, i])
                  }, Object.defineProperty(i, "on" + t, {
                    get: function() {
                      return this["_on" + t]
                    },
                    set: function(e) {
                      this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this[
                        "_on" + t]), e && this.addEventListener(t, this["_on" + t] = e)
                    }
                  })
                }
              }(e, "icecandidate", function(t) {
                return t.candidate && Object.defineProperty(t, "candidate", {
                  value: new e.RTCIceCandidate(t.candidate),
                  writable: "false"
                }), t
              })
          }
        },
        shimCreateObjectURL: function(e) {
          var t = e && e.URL;
          if ("object" == typeof e && e.HTMLMediaElement && "srcObject" in e.HTMLMediaElement.prototype && t.createObjectURL &&
            t.revokeObjectURL) {
            var r = t.createObjectURL.bind(t),
              i = t.revokeObjectURL.bind(t),
              a = new Map,
              o = 0;
            t.createObjectURL = function(e) {
              if ("getTracks" in e) {
                var t = "polyblob:" + ++o;
                return a.set(t, e), n.deprecated("URL.createObjectURL(stream)", "elem.srcObject = stream"),
                  t
              }
              return r(e)
            }, t.revokeObjectURL = function(e) {
              i(e), a.delete(e)
            };
            var s = Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype, "src");
            Object.defineProperty(e.HTMLMediaElement.prototype, "src", {
              get: function() {
                return s.get.apply(this)
              },
              set: function(e) {
                return this.srcObject = a.get(e) || null, s.set.apply(this, [e])
              }
            });
            var c = e.HTMLMediaElement.prototype.setAttribute;
            e.HTMLMediaElement.prototype.setAttribute = function() {
              return 2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject =
                a.get(arguments[1]) || null), c.apply(this, arguments)
            }
          }
        }
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(70),
        n = {
          shimLocalStreamsAPI: function(e) {
            if ("object" == typeof e && e.RTCPeerConnection) {
              if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams =
                  function() {
                    return this._localStreams || (this._localStreams = []), this._localStreams
                  }), "getStreamById" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getStreamById =
                  function(e) {
                    var t = null;
                    return this._localStreams && this._localStreams.forEach(function(r) {
                      r.id === e && (t = r)
                    }), this._remoteStreams && this._remoteStreams.forEach(function(r) {
                      r.id === e && (t = r)
                    }), t
                  }), !("addStream" in e.RTCPeerConnection.prototype)) {
                var t = e.RTCPeerConnection.prototype.addTrack;
                e.RTCPeerConnection.prototype.addStream = function(e) {
                  this._localStreams || (this._localStreams = []), -1 === this._localStreams.indexOf(e) &&
                    this._localStreams.push(e);
                  var r = this;
                  e.getTracks().forEach(function(i) {
                    t.call(r, i, e)
                  })
                }, e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                  return r && (this._localStreams ? -1 === this._localStreams.indexOf(r) && this._localStreams
                    .push(r) : this._localStreams = [r]), t.call(this, e, r)
                }
              }
              "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream =
                function(e) {
                  this._localStreams || (this._localStreams = []);
                  var t = this._localStreams.indexOf(e);
                  if (-1 !== t) {
                    this._localStreams.splice(t, 1);
                    var r = this,
                      i = e.getTracks();
                    this.getSenders().forEach(function(e) {
                      -1 !== i.indexOf(e.track) && r.removeTrack(e)
                    })
                  }
                })
            }
          },
          shimRemoteStreamsAPI: function(e) {
            "object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype ||
              (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
                return this._remoteStreams ? this._remoteStreams : []
              }), "onaddstream" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection
                .prototype, "onaddstream", {
                  get: function() {
                    return this._onaddstream
                  },
                  set: function(e) {
                    this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener(
                      "track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream =
                      e), this.addEventListener("track", this._onaddstreampoly = function(e) {
                      var t = e.streams[0];
                      if (this._remoteStreams || (this._remoteStreams = []), !(this._remoteStreams.indexOf(
                          t) >= 0)) {
                        this._remoteStreams.push(t);
                        var r = new Event("addstream");
                        r.stream = e.streams[0], this.dispatchEvent(r)
                      }
                    }.bind(this))
                  }
                }))
          },
          shimCallbacksAPI: function(e) {
            if ("object" == typeof e && e.RTCPeerConnection) {
              var t = e.RTCPeerConnection.prototype,
                r = t.createOffer,
                i = t.createAnswer,
                n = t.setLocalDescription,
                a = t.setRemoteDescription,
                o = t.addIceCandidate;
              t.createOffer = function(e, t) {
                var i = arguments.length >= 2 ? arguments[2] : arguments[0],
                  n = r.apply(this, [i]);
                return t ? (n.then(e, t), Promise.resolve()) : n
              }, t.createAnswer = function(e, t) {
                var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                  n = i.apply(this, [r]);
                return t ? (n.then(e, t), Promise.resolve()) : n
              };
              var s = function(e, t, r) {
                var i = n.apply(this, [e]);
                return r ? (i.then(t, r), Promise.resolve()) : i
              };
              t.setLocalDescription = s, s = function(e, t, r) {
                var i = a.apply(this, [e]);
                return r ? (i.then(t, r), Promise.resolve()) : i
              }, t.setRemoteDescription = s, s = function(e, t, r) {
                var i = o.apply(this, [e]);
                return r ? (i.then(t, r), Promise.resolve()) : i
              }, t.addIceCandidate = s
            }
          },
          shimGetUserMedia: function(e) {
            var t = e && e.navigator;
            t.getUserMedia || (t.webkitGetUserMedia ? t.getUserMedia = t.webkitGetUserMedia.bind(t) : t.mediaDevices &&
              t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, r, i) {
                t.mediaDevices.getUserMedia(e).then(r, i)
              }.bind(t)))
          },
          shimRTCIceServerUrls: function(e) {
            var t = e.RTCPeerConnection;
            e.RTCPeerConnection = function(e, r) {
                if (e && e.iceServers) {
                  for (var n = [], a = 0; a < e.iceServers.length; a++) {
                    var o = e.iceServers[a];
                    !o.hasOwnProperty("urls") && o.hasOwnProperty("url") ? (i.deprecated("RTCIceServer.url",
                        "RTCIceServer.urls"), (o = JSON.parse(JSON.stringify(o))).urls = o.url, delete o.url,
                      n.push(o)) : n.push(e.iceServers[a])
                  }
                  e.iceServers = n
                }
                return new t(e, r)
              }, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in e.RTCPeerConnection &&
              Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                get: function() {
                  return t.generateCertificate
                }
              })
          },
          shimTrackEventTransceiver: function(e) {
            "object" == typeof e && e.RTCPeerConnection && "receiver" in e.RTCTrackEvent.prototype && !e.RTCTransceiver &&
              Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                get: function() {
                  return {
                    receiver: this.receiver
                  }
                }
              })
          },
          shimCreateOfferLegacy: function(e) {
            var t = e.RTCPeerConnection.prototype.createOffer;
            e.RTCPeerConnection.prototype.createOffer = function(e) {
              var r = this;
              if (e) {
                var i = r.getTransceivers().find(function(e) {
                  return e.sender.track && "audio" === e.sender.track.kind
                });
                !1 === e.offerToReceiveAudio && i ? "sendrecv" === i.direction ? i.setDirection("sendonly") :
                  "recvonly" === i.direction && i.setDirection("inactive") : !0 !== e.offerToReceiveAudio ||
                  i || r.addTransceiver("audio");
                var n = r.getTransceivers().find(function(e) {
                  return e.sender.track && "video" === e.sender.track.kind
                });
                !1 === e.offerToReceiveVideo && n ? "sendrecv" === n.direction ? n.setDirection("sendonly") :
                  "recvonly" === n.direction && n.setDirection("inactive") : !0 !== e.offerToReceiveVideo ||
                  n || r.addTransceiver("video")
              }
              return t.apply(r, arguments)
            }
          }
        };
      e.exports = {
        shimCallbacksAPI: n.shimCallbacksAPI,
        shimLocalStreamsAPI: n.shimLocalStreamsAPI,
        shimRemoteStreamsAPI: n.shimRemoteStreamsAPI,
        shimGetUserMedia: n.shimGetUserMedia,
        shimRTCIceServerUrls: n.shimRTCIceServerUrls,
        shimTrackEventTransceiver: n.shimTrackEventTransceiver,
        shimCreateOfferLegacy: n.shimCreateOfferLegacy
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(70),
        n = i.log;
      e.exports = function(e) {
        var t = i.detectBrowser(e),
          r = e && e.navigator,
          a = e && e.MediaStreamTrack,
          o = function(e) {
            return {
              name: {
                InternalError: "NotReadableError",
                NotSupportedError: "TypeError",
                PermissionDeniedError: "NotAllowedError",
                SecurityError: "NotAllowedError"
              } [e.name] || e.name,
              message: {
                "The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context."
              } [e.message] || e.message,
              constraint: e.constraint,
              toString: function() {
                return this.name + (this.message && ": ") + this.message
              }
            }
          },
          s = function(e, i, a) {
            var s = function(e) {
              if ("object" != typeof e || e.require) return e;
              var t = [];
              return Object.keys(e).forEach(function(r) {
                if ("require" !== r && "advanced" !== r && "mediaSource" !== r) {
                  var i = e[r] = "object" == typeof e[r] ? e[r] : {
                    ideal: e[r]
                  };
                  if (void 0 === i.min && void 0 === i.max && void 0 === i.exact || t.push(r), void 0 !==
                    i.exact && ("number" == typeof i.exact ? i.min = i.max = i.exact : e[r] = i.exact,
                      delete i.exact), void 0 !== i.ideal) {
                    e.advanced = e.advanced || [];
                    var n = {};
                    "number" == typeof i.ideal ? n[r] = {
                        min: i.ideal,
                        max: i.ideal
                      } : n[r] = i.ideal, e.advanced.push(n), delete i.ideal, Object.keys(i).length ||
                      delete e[r]
                  }
                }
              }), t.length && (e.require = t), e
            };
            return e = JSON.parse(JSON.stringify(e)), t.version < 38 && (n("spec: " + JSON.stringify(e)), e.audio &&
              (e.audio = s(e.audio)), e.video && (e.video = s(e.video)), n("ff37: " + JSON.stringify(e))), r.mozGetUserMedia(
              e, i,
              function(e) {
                a(o(e))
              })
          };
        if (r.mediaDevices || (r.mediaDevices = {
            getUserMedia: function(e) {
              return new Promise(function(t, r) {
                s(e, t, r)
              })
            },
            addEventListener: function() {},
            removeEventListener: function() {}
          }), r.mediaDevices.enumerateDevices = r.mediaDevices.enumerateDevices || function() {
            return new Promise(function(e) {
              e([{
                kind: "audioinput",
                deviceId: "default",
                label: "",
                groupId: ""
              }, {
                kind: "videoinput",
                deviceId: "default",
                label: "",
                groupId: ""
              }])
            })
          }, t.version < 41) {
          var c = r.mediaDevices.enumerateDevices.bind(r.mediaDevices);
          r.mediaDevices.enumerateDevices = function() {
            return c().then(void 0, function(e) {
              if ("NotFoundError" === e.name) return [];
              throw e
            })
          }
        }
        if (t.version < 49) {
          var d = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
          r.mediaDevices.getUserMedia = function(e) {
            return d(e).then(function(t) {
              if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t
                .getTracks().forEach(function(e) {
                  e.stop()
                }), new DOMException("The object can not be found here.", "NotFoundError");
              return t
            }, function(e) {
              return Promise.reject(o(e))
            })
          }
        }
        if (!(t.version > 55 && "autoGainControl" in r.mediaDevices.getSupportedConstraints())) {
          var u = function(e, t, r) {
              t in e && !(r in e) && (e[r] = e[t], delete e[t])
            },
            l = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
          if (r.mediaDevices.getUserMedia = function(e) {
              return "object" == typeof e && "object" == typeof e.audio && (e = JSON.parse(JSON.stringify(e)),
                u(e.audio, "autoGainControl", "mozAutoGainControl"), u(e.audio, "noiseSuppression",
                  "mozNoiseSuppression")), l(e)
            }, a && a.prototype.getSettings) {
            var p = a.prototype.getSettings;
            a.prototype.getSettings = function() {
              var e = p.apply(this, arguments);
              return u(e, "mozAutoGainControl", "autoGainControl"), u(e, "mozNoiseSuppression",
                "noiseSuppression"), e
            }
          }
          if (a && a.prototype.applyConstraints) {
            var f = a.prototype.applyConstraints;
            a.prototype.applyConstraints = function(e) {
              return "audio" === this.kind && "object" == typeof e && (e = JSON.parse(JSON.stringify(e)), u(e,
                  "autoGainControl", "mozAutoGainControl"), u(e, "noiseSuppression", "mozNoiseSuppression")),
                f.apply(this, [e])
            }
          }
        }
        r.getUserMedia = function(e, n, a) {
          if (t.version < 44) return s(e, n, a);
          i.deprecated("navigator.getUserMedia", "(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)"), r.mediaDevices.getUserMedia(
            e).then(n, a)
        }
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(70),
        n = {
          shimOnTrack: function(e) {
            "object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype ||
              Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                get: function() {
                  return this._ontrack
                },
                set: function(e) {
                  this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener(
                      "addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e),
                    this.addEventListener("addstream", this._ontrackpoly = function(e) {
                      e.stream.getTracks().forEach(function(t) {
                        var r = new Event("track");
                        r.track = t, r.receiver = {
                          track: t
                        }, r.transceiver = {
                          receiver: r.receiver
                        }, r.streams = [e.stream], this.dispatchEvent(r)
                      }.bind(this))
                    }.bind(this))
                }
              }), "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !(
                "transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype,
                "transceiver", {
                  get: function() {
                    return {
                      receiver: this.receiver
                    }
                  }
                })
          },
          shimSourceObject: function(e) {
            "object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype ||
              Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                get: function() {
                  return this.mozSrcObject
                },
                set: function(e) {
                  this.mozSrcObject = e
                }
              }))
          },
          shimPeerConnection: function(e) {
            var t = i.detectBrowser(e);
            if ("object" == typeof e && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
              e.RTCPeerConnection || (e.RTCPeerConnection = function(r, i) {
                  if (t.version < 38 && r && r.iceServers) {
                    for (var n = [], a = 0; a < r.iceServers.length; a++) {
                      var o = r.iceServers[a];
                      if (o.hasOwnProperty("urls"))
                        for (var s = 0; s < o.urls.length; s++) {
                          var c = {
                            url: o.urls[s]
                          };
                          0 === o.urls[s].indexOf("turn") && (c.username = o.username, c.credential = o.credential),
                            n.push(c)
                        } else n.push(r.iceServers[a])
                    }
                    r.iceServers = n
                  }
                  return new e.mozRTCPeerConnection(r, i)
                }, e.RTCPeerConnection.prototype = e.mozRTCPeerConnection.prototype, e.mozRTCPeerConnection.generateCertificate &&
                Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                  get: function() {
                    return e.mozRTCPeerConnection.generateCertificate
                  }
                }), e.RTCSessionDescription = e.mozRTCSessionDescription, e.RTCIceCandidate = e.mozRTCIceCandidate
              ), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                var r = e.RTCPeerConnection.prototype[t];
                e.RTCPeerConnection.prototype[t] = function() {
                  return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)
                    (arguments[0]), r.apply(this, arguments)
                }
              });
              var r = e.RTCPeerConnection.prototype.addIceCandidate;
              e.RTCPeerConnection.prototype.addIceCandidate = function() {
                return arguments[0] ? r.apply(this, arguments) : (arguments[1] && arguments[1].apply(null),
                  Promise.resolve())
              };
              var n = {
                  inboundrtp: "inbound-rtp",
                  outboundrtp: "outbound-rtp",
                  candidatepair: "candidate-pair",
                  localcandidate: "local-candidate",
                  remotecandidate: "remote-candidate"
                },
                a = e.RTCPeerConnection.prototype.getStats;
              e.RTCPeerConnection.prototype.getStats = function(e, r, i) {
                return a.apply(this, [e || null]).then(function(e) {
                  if (t.version < 48 && (e = function(e) {
                      var t = new Map;
                      return Object.keys(e).forEach(function(r) {
                        t.set(r, e[r]), t[r] = e[r]
                      }), t
                    }(e)), t.version < 53 && !r) try {
                    e.forEach(function(e) {
                      e.type = n[e.type] || e.type
                    })
                  } catch (t) {
                    if ("TypeError" !== t.name) throw t;
                    e.forEach(function(t, r) {
                      e.set(r, Object.assign({}, t, {
                        type: n[t.type] || t.type
                      }))
                    })
                  }
                  return e
                }).then(r, i)
              }
            }
          },
          shimRemoveStream: function(e) {
            !e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype
              .removeStream = function(e) {
                var t = this;
                i.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function(r) {
                  r.track && -1 !== e.getTracks().indexOf(r.track) && t.removeTrack(r)
                })
              })
          }
        };
      e.exports = {
        shimOnTrack: n.shimOnTrack,
        shimSourceObject: n.shimSourceObject,
        shimPeerConnection: n.shimPeerConnection,
        shimRemoveStream: n.shimRemoveStream,
        shimGetUserMedia: r(325)
      }
    }, function(e, t, r) {
      "use strict";
      e.exports = function(e) {
        var t = e && e.navigator,
          r = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
        t.mediaDevices.getUserMedia = function(e) {
          return r(e).catch(function(e) {
            return Promise.reject(function(e) {
              return {
                name: {
                  PermissionDeniedError: "NotAllowedError"
                } [e.name] || e.name,
                message: e.message,
                constraint: e.constraint,
                toString: function() {
                  return this.name
                }
              }
            }(e))
          })
        }
      }
    }, function(e, t, r) {
      "use strict";
      var i = {
        generateIdentifier: function() {
          return Math.random().toString(36).substr(2, 10)
        }
      };
      i.localCName = i.generateIdentifier(), i.splitLines = function(e) {
        return e.trim().split("\n").map(function(e) {
          return e.trim()
        })
      }, i.splitSections = function(e) {
        return e.split("\nm=").map(function(e, t) {
          return (t > 0 ? "m=" + e : e).trim() + "\r\n"
        })
      }, i.getDescription = function(e) {
        var t = i.splitSections(e);
        return t && t[0]
      }, i.getMediaSections = function(e) {
        var t = i.splitSections(e);
        return t.shift(), t
      }, i.matchPrefix = function(e, t) {
        return i.splitLines(e).filter(function(e) {
          return 0 === e.indexOf(t)
        })
      }, i.parseCandidate = function(e) {
        for (var t, r = {
            foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(
              " "))[0],
            component: parseInt(t[1], 10),
            protocol: t[2].toLowerCase(),
            priority: parseInt(t[3], 10),
            ip: t[4],
            port: parseInt(t[5], 10),
            type: t[7]
          }, i = 8; i < t.length; i += 2) switch (t[i]) {
          case "raddr":
            r.relatedAddress = t[i + 1];
            break;
          case "rport":
            r.relatedPort = parseInt(t[i + 1], 10);
            break;
          case "tcptype":
            r.tcpType = t[i + 1];
            break;
          case "ufrag":
            r.ufrag = t[i + 1], r.usernameFragment = t[i + 1];
            break;
          default:
            r[t[i]] = t[i + 1]
        }
        return r
      }, i.writeCandidate = function(e) {
        var t = [];
        t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(
          e.ip), t.push(e.port);
        var r = e.type;
        return t.push("typ"), t.push(r), "host" !== r && e.relatedAddress && e.relatedPort && (t.push("raddr"),
            t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol
          .toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push(
            "ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ")
      }, i.parseIceOptions = function(e) {
        return e.substr(14).split(" ")
      }, i.parseRtpMap = function(e) {
        var t = e.substr(9).split(" "),
          r = {
            payloadType: parseInt(t.shift(), 10)
          };
        return t = t[0].split("/"), r.name = t[0], r.clockRate = parseInt(t[1], 10), r.numChannels = 3 === t.length ?
          parseInt(t[2], 10) : 1, r
      }, i.writeRtpMap = function(e) {
        var t = e.payloadType;
        return void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType), "a=rtpmap:" + t + " " + e.name +
          "/" + e.clockRate + (1 !== e.numChannels ? "/" + e.numChannels : "") + "\r\n"
      }, i.parseExtmap = function(e) {
        var t = e.substr(9).split(" ");
        return {
          id: parseInt(t[0], 10),
          direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
          uri: t[1]
        }
      }, i.writeExtmap = function(e) {
        return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction :
          "") + " " + e.uri + "\r\n"
      }, i.parseFmtp = function(e) {
        for (var t, r = {}, i = e.substr(e.indexOf(" ") + 1).split(";"), n = 0; n < i.length; n++) r[(t = i[n].trim()
          .split("="))[0].trim()] = t[1];
        return r
      }, i.writeFmtp = function(e) {
        var t = "",
          r = e.payloadType;
        if (void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.parameters && Object.keys(e.parameters)
          .length) {
          var i = [];
          Object.keys(e.parameters).forEach(function(t) {
            i.push(t + "=" + e.parameters[t])
          }), t += "a=fmtp:" + r + " " + i.join(";") + "\r\n"
        }
        return t
      }, i.parseRtcpFb = function(e) {
        var t = e.substr(e.indexOf(" ") + 1).split(" ");
        return {
          type: t.shift(),
          parameter: t.join(" ")
        }
      }, i.writeRtcpFb = function(e) {
        var t = "",
          r = e.payloadType;
        return void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback
          .length && e.rtcpFeedback.forEach(function(e) {
            t += "a=rtcp-fb:" + r + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter :
              "") + "\r\n"
          }), t
      }, i.parseSsrcMedia = function(e) {
        var t = e.indexOf(" "),
          r = {
            ssrc: parseInt(e.substr(7, t - 7), 10)
          },
          i = e.indexOf(":", t);
        return i > -1 ? (r.attribute = e.substr(t + 1, i - t - 1), r.value = e.substr(i + 1)) : r.attribute = e
          .substr(t + 1), r
      }, i.getMid = function(e) {
        var t = i.matchPrefix(e, "a=mid:")[0];
        if (t) return t.substr(6)
      }, i.parseFingerprint = function(e) {
        var t = e.substr(14).split(" ");
        return {
          algorithm: t[0].toLowerCase(),
          value: t[1]
        }
      }, i.getDtlsParameters = function(e, t) {
        return {
          role: "auto",
          fingerprints: i.matchPrefix(e + t, "a=fingerprint:").map(i.parseFingerprint)
        }
      }, i.writeDtlsParameters = function(e, t) {
        var r = "a=setup:" + t + "\r\n";
        return e.fingerprints.forEach(function(e) {
          r += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
        }), r
      }, i.getIceParameters = function(e, t) {
        var r = i.splitLines(e);
        return {
          usernameFragment: (r = r.concat(i.splitLines(t))).filter(function(e) {
            return 0 === e.indexOf("a=ice-ufrag:")
          })[0].substr(12),
          password: r.filter(function(e) {
            return 0 === e.indexOf("a=ice-pwd:")
          })[0].substr(10)
        }
      }, i.writeIceParameters = function(e) {
        return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
      }, i.parseRtpParameters = function(e) {
        for (var t = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: [],
            rtcp: []
          }, r = i.splitLines(e)[0].split(" "), n = 3; n < r.length; n++) {
          var a = r[n],
            o = i.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
          if (o) {
            var s = i.parseRtpMap(o),
              c = i.matchPrefix(e, "a=fmtp:" + a + " ");
            switch (s.parameters = c.length ? i.parseFmtp(c[0]) : {}, s.rtcpFeedback = i.matchPrefix(e,
              "a=rtcp-fb:" + a + " ").map(i.parseRtcpFb), t.codecs.push(s), s.name.toUpperCase()) {
              case "RED":
              case "ULPFEC":
                t.fecMechanisms.push(s.name.toUpperCase())
            }
          }
        }
        return i.matchPrefix(e, "a=extmap:").forEach(function(e) {
          t.headerExtensions.push(i.parseExtmap(e))
        }), t
      }, i.writeRtpDescription = function(e, t) {
        var r = "";
        r += "m=" + e + " ", r += t.codecs.length > 0 ? "9" : "0", r += " UDP/TLS/RTP/SAVPF ", r += t.codecs.map(
          function(e) {
            return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
          }).join(" ") + "\r\n", r += "c=IN IP4 0.0.0.0\r\n", r += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(
          function(e) {
            r += i.writeRtpMap(e), r += i.writeFmtp(e), r += i.writeRtcpFb(e)
          });
        var n = 0;
        return t.codecs.forEach(function(e) {
          e.maxptime > n && (n = e.maxptime)
        }), n > 0 && (r += "a=maxptime:" + n + "\r\n"), r += "a=rtcp-mux\r\n", t.headerExtensions.forEach(
          function(e) {
            r += i.writeExtmap(e)
          }), r
      }, i.parseRtpEncodingParameters = function(e) {
        var t, r = [],
          n = i.parseRtpParameters(e),
          a = -1 !== n.fecMechanisms.indexOf("RED"),
          o = -1 !== n.fecMechanisms.indexOf("ULPFEC"),
          s = i.matchPrefix(e, "a=ssrc:").map(function(e) {
            return i.parseSsrcMedia(e)
          }).filter(function(e) {
            return "cname" === e.attribute
          }),
          c = s.length > 0 && s[0].ssrc,
          d = i.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
            var t = e.split(" ");
            return t.shift(), t.map(function(e) {
              return parseInt(e, 10)
            })
          });
        d.length > 0 && d[0].length > 1 && d[0][0] === c && (t = d[0][1]), n.codecs.forEach(function(e) {
          if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
            var i = {
              ssrc: c,
              codecPayloadType: parseInt(e.parameters.apt, 10),
              rtx: {
                ssrc: t
              }
            };
            r.push(i), a && ((i = JSON.parse(JSON.stringify(i))).fec = {
              ssrc: t,
              mechanism: o ? "red+ulpfec" : "red"
            }, r.push(i))
          }
        }), 0 === r.length && c && r.push({
          ssrc: c
        });
        var u = i.matchPrefix(e, "b=");
        return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf(
          "b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * .95 - 16e3 : void 0, r.forEach(function(e) {
          e.maxBitrate = u
        })), r
      }, i.parseRtcpParameters = function(e) {
        var t = {},
          r = i.matchPrefix(e, "a=ssrc:").map(function(e) {
            return i.parseSsrcMedia(e)
          }).filter(function(e) {
            return "cname" === e.attribute
          })[0];
        r && (t.cname = r.value, t.ssrc = r.ssrc);
        var n = i.matchPrefix(e, "a=rtcp-rsize");
        t.reducedSize = n.length > 0, t.compound = 0 === n.length;
        var a = i.matchPrefix(e, "a=rtcp-mux");
        return t.mux = a.length > 0, t
      }, i.parseMsid = function(e) {
        var t, r = i.matchPrefix(e, "a=msid:");
        if (1 === r.length) return {
          stream: (t = r[0].substr(7).split(" "))[0],
          track: t[1]
        };
        var n = i.matchPrefix(e, "a=ssrc:").map(function(e) {
          return i.parseSsrcMedia(e)
        }).filter(function(e) {
          return "msid" === e.attribute
        });
        return n.length > 0 ? {
          stream: (t = n[0].value.split(" "))[0],
          track: t[1]
        } : void 0
      }, i.generateSessionId = function() {
        return Math.random().toString().substr(2, 21)
      }, i.writeSessionBoilerplate = function(e, t) {
        var r = void 0 !== t ? t : 2;
        return "v=0\r\no=thisisadapterortc " + (e || i.generateSessionId()) + " " + r +
          " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
      }, i.writeMediaSection = function(e, t, r, n) {
        var a = i.writeRtpDescription(e.kind, t);
        if (a += i.writeIceParameters(e.iceGatherer.getLocalParameters()), a += i.writeDtlsParameters(e.dtlsTransport
            .getLocalParameters(), "offer" === r ? "actpass" : "active"), a += "a=mid:" + e.mid + "\r\n", e.direction ?
          a += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? a += "a=sendrecv\r\n" : e.rtpSender ?
          a += "a=sendonly\r\n" : e.rtpReceiver ? a += "a=recvonly\r\n" : a += "a=inactive\r\n", e.rtpSender) {
          var o = "msid:" + n.id + " " + e.rtpSender.track.id + "\r\n";
          a += "a=" + o, a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + o, e.sendEncodingParameters[
            0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + o, a +=
            "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc +
            "\r\n")
        }
        return a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + i.localCName + "\r\n", e.rtpSender &&
          e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" +
            i.localCName + "\r\n"), a
      }, i.getDirection = function(e, t) {
        for (var r = i.splitLines(e), n = 0; n < r.length; n++) switch (r[n]) {
          case "a=sendrecv":
          case "a=sendonly":
          case "a=recvonly":
          case "a=inactive":
            return r[n].substr(2)
        }
        return t ? i.getDirection(t) : "sendrecv"
      }, i.getKind = function(e) {
        return i.splitLines(e)[0].split(" ")[0].substr(2)
      }, i.isRejected = function(e) {
        return "0" === e.split(" ", 2)[1]
      }, i.parseMLine = function(e) {
        var t = i.splitLines(e)[0].substr(2).split(" ");
        return {
          kind: t[0],
          port: parseInt(t[1], 10),
          protocol: t[2],
          fmt: t.slice(3).join(" ")
        }
      }, i.parseOLine = function(e) {
        var t = i.matchPrefix(e, "o=")[0].substr(2).split(" ");
        return {
          username: t[0],
          sessionId: t[1],
          sessionVersion: parseInt(t[2], 10),
          netType: t[3],
          addressType: t[4],
          address: t[5]
        }
      }, e.exports = i
    }, function(e, t, r) {
      "use strict";
      var i = r(328);

      function n(e, t, r, n, a) {
        var o = i.writeRtpDescription(e.kind, t);
        if (o += i.writeIceParameters(e.iceGatherer.getLocalParameters()), o += i.writeDtlsParameters(e.dtlsTransport
            .getLocalParameters(), "offer" === r ? "actpass" : a || "active"), o += "a=mid:" + e.mid + "\r\n", e.rtpSender &&
          e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o +=
          "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
          var s = e.rtpSender._initialTrackId || e.rtpSender.track.id;
          e.rtpSender._initialTrackId = s;
          var c = "msid:" + (n ? n.id : "-") + " " + s + "\r\n";
          o += "a=" + c, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + c, e.sendEncodingParameters[0]
            .rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + c, o += "a=ssrc-group:FID " +
              e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
        }
        return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + i.localCName + "\r\n", e.rtpSender &&
          e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" +
            i.localCName + "\r\n"), o
      }

      function a(e, t) {
        var r = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: []
          },
          i = function(e, t) {
            e = parseInt(e, 10);
            for (var r = 0; r < t.length; r++)
              if (t[r].payloadType === e || t[r].preferredPayloadType === e) return t[r]
          },
          n = function(e, t, r, n) {
            var a = i(e.parameters.apt, r),
              o = i(t.parameters.apt, n);
            return a && o && a.name.toLowerCase() === o.name.toLowerCase()
          };
        return e.codecs.forEach(function(i) {
          for (var a = 0; a < t.codecs.length; a++) {
            var o = t.codecs[a];
            if (i.name.toLowerCase() === o.name.toLowerCase() && i.clockRate === o.clockRate) {
              if ("rtx" === i.name.toLowerCase() && i.parameters && o.parameters.apt && !n(i, o, e.codecs, t.codecs))
                continue;
              (o = JSON.parse(JSON.stringify(o))).numChannels = Math.min(i.numChannels, o.numChannels), r.codecs
                .push(o), o.rtcpFeedback = o.rtcpFeedback.filter(function(e) {
                  for (var t = 0; t < i.rtcpFeedback.length; t++)
                    if (i.rtcpFeedback[t].type === e.type && i.rtcpFeedback[t].parameter === e.parameter)
                      return !0;
                  return !1
                });
              break
            }
          }
        }), e.headerExtensions.forEach(function(e) {
          for (var i = 0; i < t.headerExtensions.length; i++) {
            var n = t.headerExtensions[i];
            if (e.uri === n.uri) {
              r.headerExtensions.push(n);
              break
            }
          }
        }), r
      }

      function o(e, t, r) {
        return -1 !== {
          offer: {
            setLocalDescription: ["stable", "have-local-offer"],
            setRemoteDescription: ["stable", "have-remote-offer"]
          },
          answer: {
            setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
            setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
          }
        } [t][e].indexOf(r)
      }

      function s(e, t) {
        var r = e.getRemoteCandidates().find(function(e) {
          return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority &&
            t.protocol === e.protocol && t.type === e.type
        });
        return r || e.addRemoteCandidate(t), !r
      }

      function c(e, t) {
        var r = new Error(t);
        return r.name = e, r.code = {
          NotSupportedError: 9,
          InvalidStateError: 11,
          InvalidAccessError: 15,
          TypeError: void 0,
          OperationError: void 0
        } [e], r
      }
      e.exports = function(e, t) {
        function r(t, r) {
          r.addTrack(t), r.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {
            track: t
          }))
        }

        function d(t, r, i, n) {
          var a = new Event("track");
          a.track = r, a.receiver = i, a.transceiver = {
            receiver: i
          }, a.streams = n, e.setTimeout(function() {
            t._dispatchEvent("track", a)
          })
        }
        var u = function(r) {
          var n = this,
            a = document.createDocumentFragment();
          if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e) {
              n[e] = a[e].bind(a)
            }), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [],
            this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable",
            this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", r =
            JSON.parse(JSON.stringify(r || {})), this.usingBundle = "max-bundle" === r.bundlePolicy,
            "negotiate" === r.rtcpMuxPolicy) throw c("NotSupportedError",
            "rtcpMuxPolicy 'negotiate' is not supported");
          switch (r.rtcpMuxPolicy || (r.rtcpMuxPolicy = "require"), r.iceTransportPolicy) {
            case "all":
            case "relay":
              break;
            default:
              r.iceTransportPolicy = "all"
          }
          switch (r.bundlePolicy) {
            case "balanced":
            case "max-compat":
            case "max-bundle":
              break;
            default:
              r.bundlePolicy = "balanced"
          }
          if (r.iceServers = function(e, t) {
              var r = !1;
              return (e = JSON.parse(JSON.stringify(e))).filter(function(e) {
                if (e && (e.urls || e.url)) {
                  var i = e.urls || e.url;
                  e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                  var n = "string" == typeof i;
                  return n && (i = [i]), i = i.filter(function(e) {
                    return 0 !== e.indexOf("turn:") || -1 === e.indexOf("transport=udp") || -1 !== e.indexOf(
                      "turn:[") || r ? 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf(
                      "?transport=udp") : (r = !0, !0)
                  }), delete e.url, e.urls = n ? i[0] : i, !!i.length
                }
              })
            }(r.iceServers || [], t), this._iceGatherers = [], r.iceCandidatePoolSize)
            for (var o = r.iceCandidatePoolSize; o > 0; o--) this._iceGatherers.push(new e.RTCIceGatherer({
              iceServers: r.iceServers,
              gatherPolicy: r.iceTransportPolicy
            }));
          else r.iceCandidatePoolSize = 0;
          this._config = r, this.transceivers = [], this._sdpSessionId = i.generateSessionId(), this._sdpSessionVersion =
            0, this._dtlsRole = void 0, this._isClosed = !1
        };
        Object.defineProperty(u.prototype, "localDescription", {
            configurable: !0,
            get: function() {
              return this._localDescription
            }
          }), Object.defineProperty(u.prototype, "remoteDescription", {
            configurable: !0,
            get: function() {
              return this._remoteDescription
            }
          }), u.prototype.onicecandidate = null, u.prototype.onaddstream = null, u.prototype.ontrack = null, u.prototype
          .onremovestream = null, u.prototype.onsignalingstatechange = null, u.prototype.oniceconnectionstatechange =
          null, u.prototype.onconnectionstatechange = null, u.prototype.onicegatheringstatechange = null, u.prototype
          .onnegotiationneeded = null, u.prototype.ondatachannel = null, u.prototype._dispatchEvent = function(
            e, t) {
            this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t))
          }, u.prototype._emitGatheringStateChange = function() {
            var e = new Event("icegatheringstatechange");
            this._dispatchEvent("icegatheringstatechange", e)
          }, u.prototype.getConfiguration = function() {
            return this._config
          }, u.prototype.getLocalStreams = function() {
            return this.localStreams
          }, u.prototype.getRemoteStreams = function() {
            return this.remoteStreams
          }, u.prototype._createTransceiver = function(e, t) {
            var r = this.transceivers.length > 0,
              i = {
                track: null,
                iceGatherer: null,
                iceTransport: null,
                dtlsTransport: null,
                localCapabilities: null,
                remoteCapabilities: null,
                rtpSender: null,
                rtpReceiver: null,
                kind: e,
                mid: null,
                sendEncodingParameters: null,
                recvEncodingParameters: null,
                stream: null,
                associatedRemoteMediaStreams: [],
                wantReceive: !0
              };
            if (this.usingBundle && r) i.iceTransport = this.transceivers[0].iceTransport, i.dtlsTransport =
              this.transceivers[0].dtlsTransport;
            else {
              var n = this._createIceAndDtlsTransports();
              i.iceTransport = n.iceTransport, i.dtlsTransport = n.dtlsTransport
            }
            return t || this.transceivers.push(i), i
          }, u.prototype.addTrack = function(t, r) {
            if (this._isClosed) throw c("InvalidStateError",
              "Attempted to call addTrack on a closed peerconnection.");
            var i;
            if (this.transceivers.find(function(e) {
                return e.track === t
              })) throw c("InvalidAccessError", "Track already exists.");
            for (var n = 0; n < this.transceivers.length; n++) this.transceivers[n].track || this.transceivers[
              n].kind !== t.kind || (i = this.transceivers[n]);
            return i || (i = this._createTransceiver(t.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams
              .indexOf(r) && this.localStreams.push(r), i.track = t, i.stream = r, i.rtpSender = new e.RTCRtpSender(
                t, i.dtlsTransport), i.rtpSender
          }, u.prototype.addStream = function(e) {
            var r = this;
            if (t >= 15025) e.getTracks().forEach(function(t) {
              r.addTrack(t, e)
            });
            else {
              var i = e.clone();
              e.getTracks().forEach(function(e, t) {
                var r = i.getTracks()[t];
                e.addEventListener("enabled", function(e) {
                  r.enabled = e.enabled
                })
              }), i.getTracks().forEach(function(e) {
                r.addTrack(e, i)
              })
            }
          }, u.prototype.removeTrack = function(t) {
            if (this._isClosed) throw c("InvalidStateError",
              "Attempted to call removeTrack on a closed peerconnection.");
            if (!(t instanceof e.RTCRtpSender)) throw new TypeError(
              "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
            var r = this.transceivers.find(function(e) {
              return e.rtpSender === t
            });
            if (!r) throw c("InvalidAccessError", "Sender was not created by this connection.");
            var i = r.stream;
            r.rtpSender.stop(), r.rtpSender = null, r.track = null, r.stream = null, -1 === this.transceivers.map(
              function(e) {
                return e.stream
              }).indexOf(i) && this.localStreams.indexOf(i) > -1 && this.localStreams.splice(this.localStreams
              .indexOf(i), 1), this._maybeFireNegotiationNeeded()
          }, u.prototype.removeStream = function(e) {
            var t = this;
            e.getTracks().forEach(function(e) {
              var r = t.getSenders().find(function(t) {
                return t.track === e
              });
              r && t.removeTrack(r)
            })
          }, u.prototype.getSenders = function() {
            return this.transceivers.filter(function(e) {
              return !!e.rtpSender
            }).map(function(e) {
              return e.rtpSender
            })
          }, u.prototype.getReceivers = function() {
            return this.transceivers.filter(function(e) {
              return !!e.rtpReceiver
            }).map(function(e) {
              return e.rtpReceiver
            })
          }, u.prototype._createIceGatherer = function(t, r) {
            var i = this;
            if (r && t > 0) return this.transceivers[0].iceGatherer;
            if (this._iceGatherers.length) return this._iceGatherers.shift();
            var n = new e.RTCIceGatherer({
              iceServers: this._config.iceServers,
              gatherPolicy: this._config.iceTransportPolicy
            });
            return Object.defineProperty(n, "state", {
                value: "new",
                writable: !0
              }), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates =
              function(e) {
                var r = !e.candidate || 0 === Object.keys(e.candidate).length;
                n.state = r ? "completed" : "gathering", null !== i.transceivers[t].bufferedCandidateEvents &&
                  i.transceivers[t].bufferedCandidateEvents.push(e)
              }, n.addEventListener("localcandidate", this.transceivers[t].bufferCandidates), n
          }, u.prototype._gather = function(t, r) {
            var n = this,
              a = this.transceivers[r].iceGatherer;
            if (!a.onlocalcandidate) {
              var o = this.transceivers[r].bufferedCandidateEvents;
              this.transceivers[r].bufferedCandidateEvents = null, a.removeEventListener("localcandidate", this
                .transceivers[r].bufferCandidates), a.onlocalcandidate = function(e) {
                if (!(n.usingBundle && r > 0)) {
                  var o = new Event("icecandidate");
                  o.candidate = {
                    sdpMid: t,
                    sdpMLineIndex: r
                  };
                  var s = e.candidate,
                    c = !s || 0 === Object.keys(s).length;
                  if (c) "new" !== a.state && "gathering" !== a.state || (a.state = "completed");
                  else {
                    "new" === a.state && (a.state = "gathering"), s.component = 1, s.ufrag = a.getLocalParameters()
                      .usernameFragment;
                    var d = i.writeCandidate(s);
                    o.candidate = Object.assign(o.candidate, i.parseCandidate(d)), o.candidate.candidate = d,
                      o.candidate.toJSON = function() {
                        return {
                          candidate: o.candidate.candidate,
                          sdpMid: o.candidate.sdpMid,
                          sdpMLineIndex: o.candidate.sdpMLineIndex,
                          usernameFragment: o.candidate.usernameFragment
                        }
                      }
                  }
                  var u = i.getMediaSections(n._localDescription.sdp);
                  u[o.candidate.sdpMLineIndex] += c ? "a=end-of-candidates\r\n" : "a=" + o.candidate.candidate +
                    "\r\n", n._localDescription.sdp = i.getDescription(n._localDescription.sdp) + u.join("");
                  var l = n.transceivers.every(function(e) {
                    return e.iceGatherer && "completed" === e.iceGatherer.state
                  });
                  "gathering" !== n.iceGatheringState && (n.iceGatheringState = "gathering", n._emitGatheringStateChange()),
                    c || n._dispatchEvent("icecandidate", o), l && (n._dispatchEvent("icecandidate", new Event(
                      "icecandidate")), n.iceGatheringState = "complete", n._emitGatheringStateChange())
                }
              }, e.setTimeout(function() {
                o.forEach(function(e) {
                  a.onlocalcandidate(e)
                })
              }, 0)
            }
          }, u.prototype._createIceAndDtlsTransports = function() {
            var t = this,
              r = new e.RTCIceTransport(null);
            r.onicestatechange = function() {
              t._updateIceConnectionState(), t._updateConnectionState()
            };
            var i = new e.RTCDtlsTransport(r);
            return i.ondtlsstatechange = function() {
              t._updateConnectionState()
            }, i.onerror = function() {
              Object.defineProperty(i, "state", {
                value: "failed",
                writable: !0
              }), t._updateConnectionState()
            }, {
              iceTransport: r,
              dtlsTransport: i
            }
          }, u.prototype._disposeIceAndDtlsTransports = function(e) {
            var t = this.transceivers[e].iceGatherer;
            t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
            var r = this.transceivers[e].iceTransport;
            r && (delete r.onicestatechange, delete this.transceivers[e].iceTransport);
            var i = this.transceivers[e].dtlsTransport;
            i && (delete i.ondtlsstatechange, delete i.onerror, delete this.transceivers[e].dtlsTransport)
          }, u.prototype._transceive = function(e, r, n) {
            var o = a(e.localCapabilities, e.remoteCapabilities);
            r && e.rtpSender && (o.encodings = e.sendEncodingParameters, o.rtcp = {
                cname: i.localCName,
                compound: e.rtcpParameters.compound
              }, e.recvEncodingParameters.length && (o.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender
              .send(o)), n && e.rtpReceiver && o.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters &&
              t < 15019 && e.recvEncodingParameters.forEach(function(e) {
                delete e.rtx
              }), e.recvEncodingParameters.length ? o.encodings = e.recvEncodingParameters : o.encodings = [{}],
              o.rtcp = {
                compound: e.rtcpParameters.compound
              }, e.rtcpParameters.cname && (o.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length &&
              (o.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(o))
          }, u.prototype.setLocalDescription = function(e) {
            var t, r, n = this;
            if (-1 === ["offer", "answer"].indexOf(e.type)) return Promise.reject(c("TypeError",
              'Unsupported type "' + e.type + '"'));
            if (!o("setLocalDescription", e.type, n.signalingState) || n._isClosed) return Promise.reject(c(
              "InvalidStateError", "Can not set local " + e.type + " in state " + n.signalingState));
            if ("offer" === e.type) t = i.splitSections(e.sdp), r = t.shift(), t.forEach(function(e, t) {
              var r = i.parseRtpParameters(e);
              n.transceivers[t].localCapabilities = r
            }), n.transceivers.forEach(function(e, t) {
              n._gather(e.mid, t)
            });
            else if ("answer" === e.type) {
              t = i.splitSections(n._remoteDescription.sdp), r = t.shift();
              var s = i.matchPrefix(r, "a=ice-lite").length > 0;
              t.forEach(function(e, t) {
                var o = n.transceivers[t],
                  c = o.iceGatherer,
                  d = o.iceTransport,
                  u = o.dtlsTransport,
                  l = o.localCapabilities,
                  p = o.remoteCapabilities;
                if (!(i.isRejected(e) && 0 === i.matchPrefix(e, "a=bundle-only").length) && !o.rejected) {
                  var f = i.getIceParameters(e, r),
                    h = i.getDtlsParameters(e, r);
                  s && (h.role = "server"), n.usingBundle && 0 !== t || (n._gather(o.mid, t), "new" === d.state &&
                    d.start(c, f, s ? "controlling" : "controlled"), "new" === u.state && u.start(h));
                  var m = a(l, p);
                  n._transceive(o, m.codecs.length > 0, !1)
                }
              })
            }
            return n._localDescription = {
              type: e.type,
              sdp: e.sdp
            }, "offer" === e.type ? n._updateSignalingState("have-local-offer") : n._updateSignalingState(
              "stable"), Promise.resolve()
          }, u.prototype.setRemoteDescription = function(n) {
            var a = this;
            if (-1 === ["offer", "answer"].indexOf(n.type)) return Promise.reject(c("TypeError",
              'Unsupported type "' + n.type + '"'));
            if (!o("setRemoteDescription", n.type, a.signalingState) || a._isClosed) return Promise.reject(c(
              "InvalidStateError", "Can not set remote " + n.type + " in state " + a.signalingState));
            var u = {};
            a.remoteStreams.forEach(function(e) {
              u[e.id] = e
            });
            var l = [],
              p = i.splitSections(n.sdp),
              f = p.shift(),
              h = i.matchPrefix(f, "a=ice-lite").length > 0,
              m = i.matchPrefix(f, "a=group:BUNDLE ").length > 0;
            a.usingBundle = m;
            var v = i.matchPrefix(f, "a=ice-options:")[0];
            return a.canTrickleIceCandidates = !!v && v.substr(14).split(" ").indexOf("trickle") >= 0, p.forEach(
              function(o, c) {
                var d = i.splitLines(o),
                  p = i.getKind(o),
                  v = i.isRejected(o) && 0 === i.matchPrefix(o, "a=bundle-only").length,
                  g = d[0].substr(2).split(" ")[2],
                  _ = i.getDirection(o, f),
                  R = i.parseMsid(o),
                  y = i.getMid(o) || i.generateIdentifier();
                if (v || "application" === p && ("DTLS/SCTP" === g || "UDP/DTLS/SCTP" === g)) a.transceivers[
                  c] = {
                  mid: y,
                  kind: p,
                  protocol: g,
                  rejected: !0
                };
                else {
                  var C, S, b, E, T, A, O, P, k;
                  !v && a.transceivers[c] && a.transceivers[c].rejected && (a.transceivers[c] = a._createTransceiver(
                    p, !0));
                  var I, D, w = i.parseRtpParameters(o);
                  v || (I = i.getIceParameters(o, f), (D = i.getDtlsParameters(o, f)).role = "client"), O = i
                    .parseRtpEncodingParameters(o);
                  var M = i.parseRtcpParameters(o),
                    x = i.matchPrefix(o, "a=end-of-candidates", f).length > 0,
                    N = i.matchPrefix(o, "a=candidate:").map(function(e) {
                      return i.parseCandidate(e)
                    }).filter(function(e) {
                      return 1 === e.component
                    });
                  if (("offer" === n.type || "answer" === n.type) && !v && m && c > 0 && a.transceivers[c] &&
                    (a._disposeIceAndDtlsTransports(c), a.transceivers[c].iceGatherer = a.transceivers[0].iceGatherer,
                      a.transceivers[c].iceTransport = a.transceivers[0].iceTransport, a.transceivers[c].dtlsTransport =
                      a.transceivers[0].dtlsTransport, a.transceivers[c].rtpSender && a.transceivers[c].rtpSender
                      .setTransport(a.transceivers[0].dtlsTransport), a.transceivers[c].rtpReceiver && a.transceivers[
                        c].rtpReceiver.setTransport(a.transceivers[0].dtlsTransport)), "offer" !== n.type ||
                    v) "answer" !== n.type || v || (S = (C = a.transceivers[c]).iceGatherer, b = C.iceTransport,
                    E = C.dtlsTransport, T = C.rtpReceiver, A = C.sendEncodingParameters, P = C.localCapabilities,
                    a.transceivers[c].recvEncodingParameters = O, a.transceivers[c].remoteCapabilities = w,
                    a.transceivers[c].rtcpParameters = M, N.length && "new" === b.state && (!h && !x || m &&
                      0 !== c ? N.forEach(function(e) {
                        s(C.iceTransport, e)
                      }) : b.setRemoteCandidates(N)), m && 0 !== c || ("new" === b.state && b.start(S, I,
                      "controlling"), "new" === E.state && E.start(D)), a._transceive(C, "sendrecv" === _ ||
                      "recvonly" === _, "sendrecv" === _ || "sendonly" === _), !T || "sendrecv" !== _ &&
                    "sendonly" !== _ ? delete C.rtpReceiver : (k = T.track, R ? (u[R.stream] || (u[R.stream] =
                      new e.MediaStream), r(k, u[R.stream]), l.push([k, T, u[R.stream]])) : (u.default ||
                      (u.default = new e.MediaStream), r(k, u.default), l.push([k, T, u.default]))));
                  else {
                    (C = a.transceivers[c] || a._createTransceiver(p)).mid = y, C.iceGatherer || (C.iceGatherer =
                        a._createIceGatherer(c, m)), N.length && "new" === C.iceTransport.state && (!x || m &&
                        0 !== c ? N.forEach(function(e) {
                          s(C.iceTransport, e)
                        }) : C.iceTransport.setRemoteCandidates(N)), P = e.RTCRtpReceiver.getCapabilities(p),
                      t < 15019 && (P.codecs = P.codecs.filter(function(e) {
                        return "rtx" !== e.name
                      })), A = C.sendEncodingParameters || [{
                        ssrc: 1001 * (2 * c + 2)
                      }];
                    var L, V = !1;
                    if ("sendrecv" === _ || "sendonly" === _) {
                      if (V = !C.rtpReceiver, T = C.rtpReceiver || new e.RTCRtpReceiver(C.dtlsTransport, p),
                        V) k = T.track, R && "-" === R.stream || (R ? (u[R.stream] || (u[R.stream] = new e.MediaStream,
                          Object.defineProperty(u[R.stream], "id", {
                            get: function() {
                              return R.stream
                            }
                          })), Object.defineProperty(k, "id", {
                          get: function() {
                            return R.track
                          }
                        }), L = u[R.stream]) : (u.default || (u.default = new e.MediaStream), L = u.default)),
                        L && (r(k, L), C.associatedRemoteMediaStreams.push(L)), l.push([k, T, L])
                    } else C.rtpReceiver && C.rtpReceiver.track && (C.associatedRemoteMediaStreams.forEach(
                      function(t) {
                        var r, i, n = t.getTracks().find(function(e) {
                          return e.id === C.rtpReceiver.track.id
                        });
                        n && (r = n, (i = t).removeTrack(r), i.dispatchEvent(new e.MediaStreamTrackEvent(
                          "removetrack", {
                            track: r
                          })))
                      }), C.associatedRemoteMediaStreams = []);
                    C.localCapabilities = P, C.remoteCapabilities = w, C.rtpReceiver = T, C.rtcpParameters =
                      M, C.sendEncodingParameters = A, C.recvEncodingParameters = O, a._transceive(a.transceivers[
                        c], !1, V)
                  }
                }
              }), void 0 === a._dtlsRole && (a._dtlsRole = "offer" === n.type ? "active" : "passive"), a._remoteDescription = {
              type: n.type,
              sdp: n.sdp
            }, "offer" === n.type ? a._updateSignalingState("have-remote-offer") : a._updateSignalingState(
              "stable"), Object.keys(u).forEach(function(t) {
              var r = u[t];
              if (r.getTracks().length) {
                if (-1 === a.remoteStreams.indexOf(r)) {
                  a.remoteStreams.push(r);
                  var i = new Event("addstream");
                  i.stream = r, e.setTimeout(function() {
                    a._dispatchEvent("addstream", i)
                  })
                }
                l.forEach(function(e) {
                  var t = e[0],
                    i = e[1];
                  r.id === e[2].id && d(a, t, i, [r])
                })
              }
            }), l.forEach(function(e) {
              e[2] || d(a, e[0], e[1], [])
            }), e.setTimeout(function() {
              a && a.transceivers && a.transceivers.forEach(function(e) {
                e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates()
                  .length > 0 && (console.warn(
                    "Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"
                  ), e.iceTransport.addRemoteCandidate({}))
              })
            }, 4e3), Promise.resolve()
          }, u.prototype.close = function() {
            this.transceivers.forEach(function(e) {
              e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender &&
                e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
            }), this._isClosed = !0, this._updateSignalingState("closed")
          }, u.prototype._updateSignalingState = function(e) {
            this.signalingState = e;
            var t = new Event("signalingstatechange");
            this._dispatchEvent("signalingstatechange", t)
          }, u.prototype._maybeFireNegotiationNeeded = function() {
            var t = this;
            "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, e.setTimeout(
              function() {
                if (t.needNegotiation) {
                  t.needNegotiation = !1;
                  var e = new Event("negotiationneeded");
                  t._dispatchEvent("negotiationneeded", e)
                }
              }, 0))
          }, u.prototype._updateIceConnectionState = function() {
            var e, t = {
              new: 0,
              closed: 0,
              checking: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
            };
            if (this.transceivers.forEach(function(e) {
                t[e.iceTransport.state]++
              }), e = "new", t.failed > 0 ? e = "failed" : t.checking > 0 ? e = "checking" : t.disconnected > 0 ?
              e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 ? e = "connected" : t.completed > 0 &&
              (e = "completed"), e !== this.iceConnectionState) {
              this.iceConnectionState = e;
              var r = new Event("iceconnectionstatechange");
              this._dispatchEvent("iceconnectionstatechange", r)
            }
          }, u.prototype._updateConnectionState = function() {
            var e, t = {
              new: 0,
              closed: 0,
              connecting: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
            };
            if (this.transceivers.forEach(function(e) {
                t[e.iceTransport.state]++, t[e.dtlsTransport.state]++
              }), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed" : t.connecting > 0 ? e =
              "connecting" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 &&
              (e = "connected"), e !== this.connectionState) {
              this.connectionState = e;
              var r = new Event("connectionstatechange");
              this._dispatchEvent("connectionstatechange", r)
            }
          }, u.prototype.createOffer = function() {
            var r = this;
            if (r._isClosed) return Promise.reject(c("InvalidStateError",
              "Can not call createOffer after close"));
            var a = r.transceivers.filter(function(e) {
                return "audio" === e.kind
              }).length,
              o = r.transceivers.filter(function(e) {
                return "video" === e.kind
              }).length,
              s = arguments[0];
            if (s) {
              if (s.mandatory || s.optional) throw new TypeError(
                "Legacy mandatory/optional constraints not supported.");
              void 0 !== s.offerToReceiveAudio && (a = !0 === s.offerToReceiveAudio ? 1 : !1 === s.offerToReceiveAudio ?
                0 : s.offerToReceiveAudio), void 0 !== s.offerToReceiveVideo && (o = !0 === s.offerToReceiveVideo ?
                1 : !1 === s.offerToReceiveVideo ? 0 : s.offerToReceiveVideo)
            }
            for (r.transceivers.forEach(function(e) {
                "audio" === e.kind ? --a < 0 && (e.wantReceive = !1) : "video" === e.kind && --o < 0 && (e.wantReceive = !
                  1)
              }); a > 0 || o > 0;) a > 0 && (r._createTransceiver("audio"), a--), o > 0 && (r._createTransceiver(
              "video"), o--);
            var d = i.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++);
            r.transceivers.forEach(function(n, a) {
              var o = n.track,
                s = n.kind,
                c = n.mid || i.generateIdentifier();
              n.mid = c, n.iceGatherer || (n.iceGatherer = r._createIceGatherer(a, r.usingBundle));
              var d = e.RTCRtpSender.getCapabilities(s);
              t < 15019 && (d.codecs = d.codecs.filter(function(e) {
                return "rtx" !== e.name
              })), d.codecs.forEach(function(e) {
                "H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters[
                    "level-asymmetry-allowed"] = "1"), n.remoteCapabilities && n.remoteCapabilities.codecs &&
                  n.remoteCapabilities.codecs.forEach(function(t) {
                    e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (
                      e.preferredPayloadType = t.payloadType)
                  })
              }), d.headerExtensions.forEach(function(e) {
                (n.remoteCapabilities && n.remoteCapabilities.headerExtensions || []).forEach(function(
                  t) {
                  e.uri === t.uri && (e.id = t.id)
                })
              });
              var u = n.sendEncodingParameters || [{
                ssrc: 1001 * (2 * a + 1)
              }];
              o && t >= 15019 && "video" === s && !u[0].rtx && (u[0].rtx = {
                  ssrc: u[0].ssrc + 1
                }), n.wantReceive && (n.rtpReceiver = new e.RTCRtpReceiver(n.dtlsTransport, s)), n.localCapabilities =
                d, n.sendEncodingParameters = u
            }), "max-compat" !== r._config.bundlePolicy && (d += "a=group:BUNDLE " + r.transceivers.map(
              function(e) {
                return e.mid
              }).join(" ") + "\r\n"), d += "a=ice-options:trickle\r\n", r.transceivers.forEach(function(e, t) {
              d += n(e, e.localCapabilities, "offer", e.stream, r._dtlsRole), d += "a=rtcp-rsize\r\n", !e.iceGatherer ||
                "new" === r.iceGatheringState || 0 !== t && r.usingBundle || (e.iceGatherer.getLocalCandidates()
                  .forEach(function(e) {
                    e.component = 1, d += "a=" + i.writeCandidate(e) + "\r\n"
                  }), "completed" === e.iceGatherer.state && (d += "a=end-of-candidates\r\n"))
            });
            var u = new e.RTCSessionDescription({
              type: "offer",
              sdp: d
            });
            return Promise.resolve(u)
          }, u.prototype.createAnswer = function() {
            var r = this;
            if (r._isClosed) return Promise.reject(c("InvalidStateError",
              "Can not call createAnswer after close"));
            if ("have-remote-offer" !== r.signalingState && "have-local-pranswer" !== r.signalingState) return Promise
              .reject(c("InvalidStateError", "Can not call createAnswer in signalingState " + r.signalingState));
            var o = i.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++);
            r.usingBundle && (o += "a=group:BUNDLE " + r.transceivers.map(function(e) {
              return e.mid
            }).join(" ") + "\r\n");
            var s = i.getMediaSections(r._remoteDescription.sdp).length;
            r.transceivers.forEach(function(e, i) {
              if (!(i + 1 > s)) {
                if (e.rejected) return "application" === e.kind ? "DTLS/SCTP" === e.protocol ? o +=
                  "m=application 0 DTLS/SCTP 5000\r\n" : o += "m=application 0 " + e.protocol +
                  " webrtc-datachannel\r\n" : "audio" === e.kind ? o +=
                  "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e.kind && (o +=
                    "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void(o +=
                    "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
                var c;
                if (e.stream) "audio" === e.kind ? c = e.stream.getAudioTracks()[0] : "video" === e.kind &&
                  (c = e.stream.getVideoTracks()[0]), c && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[
                    0].rtx && (e.sendEncodingParameters[0].rtx = {
                    ssrc: e.sendEncodingParameters[0].ssrc + 1
                  });
                var d = a(e.localCapabilities, e.remoteCapabilities);
                !d.codecs.filter(function(e) {
                    return "rtx" === e.name.toLowerCase()
                  }).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, o +=
                  n(e, d, "answer", e.stream, r._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize &&
                  (o += "a=rtcp-rsize\r\n")
              }
            });
            var d = new e.RTCSessionDescription({
              type: "answer",
              sdp: o
            });
            return Promise.resolve(d)
          }, u.prototype.addIceCandidate = function(e) {
            var t, r = this;
            return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError(
              "sdpMLineIndex or sdpMid required")) : new Promise(function(n, a) {
              if (!r._remoteDescription) return a(c("InvalidStateError",
                "Can not add ICE candidate without a remote description"));
              if (e && "" !== e.candidate) {
                var o = e.sdpMLineIndex;
                if (e.sdpMid)
                  for (var d = 0; d < r.transceivers.length; d++)
                    if (r.transceivers[d].mid === e.sdpMid) {
                      o = d;
                      break
                    } var u = r.transceivers[o];
                if (!u) return a(c("OperationError", "Can not add ICE candidate"));
                if (u.rejected) return n();
                var l = Object.keys(e.candidate).length > 0 ? i.parseCandidate(e.candidate) : {};
                if ("tcp" === l.protocol && (0 === l.port || 9 === l.port)) return n();
                if (l.component && 1 !== l.component) return n();
                if ((0 === o || o > 0 && u.iceTransport !== r.transceivers[0].iceTransport) && !s(u.iceTransport,
                    l)) return a(c("OperationError", "Can not add ICE candidate"));
                var p = e.candidate.trim();
                0 === p.indexOf("a=") && (p = p.substr(2)), (t = i.getMediaSections(r._remoteDescription.sdp))[
                  o] += "a=" + (l.type ? p : "end-of-candidates") + "\r\n", r._remoteDescription.sdp = i.getDescription(
                  r._remoteDescription.sdp) + t.join("")
              } else
                for (var f = 0; f < r.transceivers.length && (r.transceivers[f].rejected || (r.transceivers[
                    f].iceTransport.addRemoteCandidate({}), (t = i.getMediaSections(r._remoteDescription
                    .sdp))[f] += "a=end-of-candidates\r\n", r._remoteDescription.sdp = i.getDescription(
                    r._remoteDescription.sdp) + t.join(""), !r.usingBundle)); f++);
              n()
            })
          }, u.prototype.getStats = function(t) {
            if (t && t instanceof e.MediaStreamTrack) {
              var r = null;
              if (this.transceivers.forEach(function(e) {
                  e.rtpSender && e.rtpSender.track === t ? r = e.rtpSender : e.rtpReceiver && e.rtpReceiver.track ===
                    t && (r = e.rtpReceiver)
                }), !r) throw c("InvalidAccessError", "Invalid selector.");
              return r.getStats()
            }
            var i = [];
            return this.transceivers.forEach(function(e) {
              ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(
                t) {
                e[t] && i.push(e[t].getStats())
              })
            }), Promise.all(i).then(function(e) {
              var t = new Map;
              return e.forEach(function(e) {
                e.forEach(function(e) {
                  t.set(e.id, e)
                })
              }), t
            })
          };
        ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(
          function(t) {
            var r = e[t];
            if (r && r.prototype && r.prototype.getStats) {
              var i = r.prototype.getStats;
              r.prototype.getStats = function() {
                return i.apply(this).then(function(e) {
                  var t = new Map;
                  return Object.keys(e).forEach(function(r) {
                    var i;
                    e[r].type = {
                      inboundrtp: "inbound-rtp",
                      outboundrtp: "outbound-rtp",
                      candidatepair: "candidate-pair",
                      localcandidate: "local-candidate",
                      remotecandidate: "remote-candidate"
                    } [(i = e[r]).type] || i.type, t.set(r, e[r])
                  }), t
                })
              }
            }
          });
        var l = ["createOffer", "createAnswer"];
        return l.forEach(function(e) {
          var t = u.prototype[e];
          u.prototype[e] = function() {
            var e = arguments;
            return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]])
              .then(function(t) {
                "function" == typeof e[0] && e[0].apply(null, [t])
              }, function(t) {
                "function" == typeof e[1] && e[1].apply(null, [t])
              }) : t.apply(this, arguments)
          }
        }), (l = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function(e) {
          var t = u.prototype[e];
          u.prototype[e] = function() {
            var e = arguments;
            return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(
              function() {
                "function" == typeof e[1] && e[1].apply(null)
              },
              function(t) {
                "function" == typeof e[2] && e[2].apply(null, [t])
              }) : t.apply(this, arguments)
          }
        }), ["getStats"].forEach(function(e) {
          var t = u.prototype[e];
          u.prototype[e] = function() {
            var e = arguments;
            return "function" == typeof e[1] ? t.apply(this, arguments).then(function() {
              "function" == typeof e[1] && e[1].apply(null)
            }) : t.apply(this, arguments)
          }
        }), u
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(70),
        n = r(329);
      e.exports = {
        shimGetUserMedia: r(327),
        shimPeerConnection: function(e) {
          var t = i.detectBrowser(e);
          if (e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function(e) {
              return e
            }), e.RTCSessionDescription || (e.RTCSessionDescription = function(e) {
              return e
            }), t.version < 15025)) {
            var r = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
            Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
              set: function(e) {
                r.set.call(this, e);
                var t = new Event("enabled");
                t.enabled = e, this.dispatchEvent(t)
              }
            })
          }!e.RTCRtpSender || "dtmf" in e.RTCRtpSender.prototype || Object.defineProperty(e.RTCRtpSender.prototype,
            "dtmf", {
              get: function() {
                return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(
                  this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf
              }
            }), e.RTCPeerConnection = n(e, t.version)
        },
        shimReplaceTrack: function(e) {
          !e.RTCRtpSender || "replaceTrack" in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack =
            e.RTCRtpSender.prototype.setTrack)
        }
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(70),
        n = i.log;
      e.exports = function(e) {
        var t = i.detectBrowser(e),
          r = e && e.navigator,
          a = function(e) {
            if ("object" != typeof e || e.mandatory || e.optional) return e;
            var t = {};
            return Object.keys(e).forEach(function(r) {
              if ("require" !== r && "advanced" !== r && "mediaSource" !== r) {
                var i = "object" == typeof e[r] ? e[r] : {
                  ideal: e[r]
                };
                void 0 !== i.exact && "number" == typeof i.exact && (i.min = i.max = i.exact);
                var n = function(e, t) {
                  return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" :
                    t
                };
                if (void 0 !== i.ideal) {
                  t.optional = t.optional || [];
                  var a = {};
                  "number" == typeof i.ideal ? (a[n("min", r)] = i.ideal, t.optional.push(a), (a = {})[n(
                    "max", r)] = i.ideal, t.optional.push(a)) : (a[n("", r)] = i.ideal, t.optional.push(a))
                }
                void 0 !== i.exact && "number" != typeof i.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[
                  n("", r)] = i.exact) : ["min", "max"].forEach(function(e) {
                  void 0 !== i[e] && (t.mandatory = t.mandatory || {}, t.mandatory[n(e, r)] = i[e])
                })
              }
            }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
          },
          o = function(e, i) {
            if (t.version >= 61) return i(e);
            if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
              var o = function(e, t, r) {
                t in e && !(r in e) && (e[r] = e[t], delete e[t])
              };
              o((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), o(e.audio,
                "noiseSuppression", "googNoiseSuppression"), e.audio = a(e.audio)
            }
            if (e && "object" == typeof e.video) {
              var s = e.video.facingMode;
              s = s && ("object" == typeof s ? s : {
                ideal: s
              });
              var c, d = t.version < 66;
              if (s && ("user" === s.exact || "environment" === s.exact || "user" === s.ideal || "environment" ===
                  s.ideal) && (!r.mediaDevices.getSupportedConstraints || !r.mediaDevices.getSupportedConstraints()
                  .facingMode || d))
                if (delete e.video.facingMode, "environment" === s.exact || "environment" === s.ideal ? c = [
                    "back", "rear"
                  ] : "user" !== s.exact && "user" !== s.ideal || (c = ["front"]), c) return r.mediaDevices.enumerateDevices()
                  .then(function(t) {
                    var r = (t = t.filter(function(e) {
                      return "videoinput" === e.kind
                    })).find(function(e) {
                      return c.some(function(t) {
                        return -1 !== e.label.toLowerCase().indexOf(t)
                      })
                    });
                    return !r && t.length && -1 !== c.indexOf("back") && (r = t[t.length - 1]), r && (e.video
                      .deviceId = s.exact ? {
                        exact: r.deviceId
                      } : {
                        ideal: r.deviceId
                      }), e.video = a(e.video), n("chrome: " + JSON.stringify(e)), i(e)
                  });
              e.video = a(e.video)
            }
            return n("chrome: " + JSON.stringify(e)), i(e)
          },
          s = function(e) {
            return {
              name: {
                PermissionDeniedError: "NotAllowedError",
                InvalidStateError: "NotReadableError",
                DevicesNotFoundError: "NotFoundError",
                ConstraintNotSatisfiedError: "OverconstrainedError",
                TrackStartError: "NotReadableError",
                MediaDeviceFailedDueToShutdown: "NotReadableError",
                MediaDeviceKillSwitchOn: "NotReadableError"
              } [e.name] || e.name,
              message: e.message,
              constraint: e.constraintName,
              toString: function() {
                return this.name + (this.message && ": ") + this.message
              }
            }
          };
        r.getUserMedia = function(e, t, i) {
          o(e, function(e) {
            r.webkitGetUserMedia(e, t, function(e) {
              i && i(s(e))
            })
          })
        };
        var c = function(e) {
          return new Promise(function(t, i) {
            r.getUserMedia(e, t, i)
          })
        };
        if (r.mediaDevices || (r.mediaDevices = {
            getUserMedia: c,
            enumerateDevices: function() {
              return new Promise(function(t) {
                var r = {
                  audio: "audioinput",
                  video: "videoinput"
                };
                return e.MediaStreamTrack.getSources(function(e) {
                  t(e.map(function(e) {
                    return {
                      label: e.label,
                      kind: r[e.kind],
                      deviceId: e.id,
                      groupId: ""
                    }
                  }))
                })
              })
            },
            getSupportedConstraints: function() {
              return {
                deviceId: !0,
                echoCancellation: !0,
                facingMode: !0,
                frameRate: !0,
                height: !0,
                width: !0
              }
            }
          }), r.mediaDevices.getUserMedia) {
          var d = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
          r.mediaDevices.getUserMedia = function(e) {
            return o(e, function(e) {
              return d(e).then(function(t) {
                if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length)
                  throw t.getTracks().forEach(function(e) {
                    e.stop()
                  }), new DOMException("", "NotFoundError");
                return t
              }, function(e) {
                return Promise.reject(s(e))
              })
            })
          }
        } else r.mediaDevices.getUserMedia = function(e) {
          return c(e)
        };
        void 0 === r.mediaDevices.addEventListener && (r.mediaDevices.addEventListener = function() {
          n("Dummy mediaDevices.addEventListener called.")
        }), void 0 === r.mediaDevices.removeEventListener && (r.mediaDevices.removeEventListener = function() {
          n("Dummy mediaDevices.removeEventListener called.")
        })
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(70),
        n = i.log,
        a = {
          shimMediaStream: function(e) {
            e.MediaStream = e.MediaStream || e.webkitMediaStream
          },
          shimOnTrack: function(e) {
            if ("object" == typeof e && e.RTCPeerConnection && !("ontrack" in e.RTCPeerConnection.prototype)) {
              Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                get: function() {
                  return this._ontrack
                },
                set: function(e) {
                  this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener(
                    "track", this._ontrack = e)
                }
              });
              var t = e.RTCPeerConnection.prototype.setRemoteDescription;
              e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                var r = this;
                return r._ontrackpoly || (r._ontrackpoly = function(t) {
                  t.stream.addEventListener("addtrack", function(i) {
                    var n;
                    n = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function(e) {
                      return e.track && e.track.id === i.track.id
                    }) : {
                      track: i.track
                    };
                    var a = new Event("track");
                    a.track = i.track, a.receiver = n, a.transceiver = {
                      receiver: n
                    }, a.streams = [t.stream], r.dispatchEvent(a)
                  }), t.stream.getTracks().forEach(function(i) {
                    var n;
                    n = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function(e) {
                      return e.track && e.track.id === i.id
                    }) : {
                      track: i
                    };
                    var a = new Event("track");
                    a.track = i, a.receiver = n, a.transceiver = {
                      receiver: n
                    }, a.streams = [t.stream], r.dispatchEvent(a)
                  })
                }, r.addEventListener("addstream", r._ontrackpoly)), t.apply(r, arguments)
              }
            }
          },
          shimGetSendersWithDtmf: function(e) {
            if ("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) &&
              "createDTMFSender" in e.RTCPeerConnection.prototype) {
              var t = function(e, t) {
                return {
                  track: t,
                  get dtmf() {
                    return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) :
                      this._dtmf = null), this._dtmf
                  },
                  _pc: e
                }
              };
              if (!e.RTCPeerConnection.prototype.getSenders) {
                e.RTCPeerConnection.prototype.getSenders = function() {
                  return this._senders = this._senders || [], this._senders.slice()
                };
                var r = e.RTCPeerConnection.prototype.addTrack;
                e.RTCPeerConnection.prototype.addTrack = function(e, i) {
                  var n = r.apply(this, arguments);
                  return n || (n = t(this, e), this._senders.push(n)), n
                };
                var i = e.RTCPeerConnection.prototype.removeTrack;
                e.RTCPeerConnection.prototype.removeTrack = function(e) {
                  i.apply(this, arguments);
                  var t = this._senders.indexOf(e); - 1 !== t && this._senders.splice(t, 1)
                }
              }
              var n = e.RTCPeerConnection.prototype.addStream;
              e.RTCPeerConnection.prototype.addStream = function(e) {
                var r = this;
                r._senders = r._senders || [], n.apply(r, [e]), e.getTracks().forEach(function(e) {
                  r._senders.push(t(r, e))
                })
              };
              var a = e.RTCPeerConnection.prototype.removeStream;
              e.RTCPeerConnection.prototype.removeStream = function(e) {
                var t = this;
                t._senders = t._senders || [], a.apply(t, [e]), e.getTracks().forEach(function(e) {
                  var r = t._senders.find(function(t) {
                    return t.track === e
                  });
                  r && t._senders.splice(t._senders.indexOf(r), 1)
                })
              }
            } else if ("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype &&
              "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender
                .prototype)) {
              var o = e.RTCPeerConnection.prototype.getSenders;
              e.RTCPeerConnection.prototype.getSenders = function() {
                var e = this,
                  t = o.apply(e, []);
                return t.forEach(function(t) {
                  t._pc = e
                }), t
              }, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                get: function() {
                  return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(
                    this.track) : this._dtmf = null), this._dtmf
                }
              })
            }
          },
          shimSourceObject: function(e) {
            var t = e && e.URL;
            "object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype ||
              Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                get: function() {
                  return this._srcObject
                },
                set: function(e) {
                  var r = this;
                  this._srcObject = e, this.src && t.revokeObjectURL(this.src), e ? (this.src = t.createObjectURL(
                    e), e.addEventListener("addtrack", function() {
                    r.src && t.revokeObjectURL(r.src), r.src = t.createObjectURL(e)
                  }), e.addEventListener("removetrack", function() {
                    r.src && t.revokeObjectURL(r.src), r.src = t.createObjectURL(e)
                  })) : this.src = ""
                }
              }))
          },
          shimAddTrackRemoveTrack: function(e) {
            var t = i.detectBrowser(e);
            if (!(e.RTCPeerConnection.prototype.addTrack && t.version >= 64)) {
              var r = e.RTCPeerConnection.prototype.getLocalStreams;
              e.RTCPeerConnection.prototype.getLocalStreams = function() {
                var e = this,
                  t = r.apply(this);
                return e._reverseStreams = e._reverseStreams || {}, t.map(function(t) {
                  return e._reverseStreams[t.id]
                })
              };
              var n = e.RTCPeerConnection.prototype.addStream;
              e.RTCPeerConnection.prototype.addStream = function(t) {
                var r = this;
                if (r._streams = r._streams || {}, r._reverseStreams = r._reverseStreams || {}, t.getTracks()
                  .forEach(function(e) {
                    if (r.getSenders().find(function(t) {
                        return t.track === e
                      })) throw new DOMException("Track already exists.", "InvalidAccessError")
                  }), !r._reverseStreams[t.id]) {
                  var i = new e.MediaStream(t.getTracks());
                  r._streams[t.id] = i, r._reverseStreams[i.id] = t, t = i
                }
                n.apply(r, [t])
              };
              var a = e.RTCPeerConnection.prototype.removeStream;
              e.RTCPeerConnection.prototype.removeStream = function(e) {
                var t = this;
                t._streams = t._streams || {}, t._reverseStreams = t._reverseStreams || {}, a.apply(t, [t._streams[
                    e.id] || e]), delete t._reverseStreams[t._streams[e.id] ? t._streams[e.id].id : e.id],
                  delete t._streams[e.id]
              }, e.RTCPeerConnection.prototype.addTrack = function(t, r) {
                var i = this;
                if ("closed" === i.signalingState) throw new DOMException(
                  "The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                var n = [].slice.call(arguments, 1);
                if (1 !== n.length || !n[0].getTracks().find(function(e) {
                    return e === t
                  })) throw new DOMException(
                  "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
                  "NotSupportedError");
                if (i.getSenders().find(function(e) {
                    return e.track === t
                  })) throw new DOMException("Track already exists.", "InvalidAccessError");
                i._streams = i._streams || {}, i._reverseStreams = i._reverseStreams || {};
                var a = i._streams[r.id];
                if (a) a.addTrack(t), Promise.resolve().then(function() {
                  i.dispatchEvent(new Event("negotiationneeded"))
                });
                else {
                  var o = new e.MediaStream([t]);
                  i._streams[r.id] = o, i._reverseStreams[o.id] = r, i.addStream(o)
                }
                return i.getSenders().find(function(e) {
                  return e.track === t
                })
              }, ["createOffer", "createAnswer"].forEach(function(t) {
                var r = e.RTCPeerConnection.prototype[t];
                e.RTCPeerConnection.prototype[t] = function() {
                  var e = this,
                    t = arguments;
                  return arguments.length && "function" == typeof arguments[0] ? r.apply(e, [function(r) {
                    var i = c(e, r);
                    t[0].apply(null, [i])
                  }, function(e) {
                    t[1] && t[1].apply(null, e)
                  }, arguments[2]]) : r.apply(e, arguments).then(function(t) {
                    return c(e, t)
                  })
                }
              });
              var o = e.RTCPeerConnection.prototype.setLocalDescription;
              e.RTCPeerConnection.prototype.setLocalDescription = function() {
                return arguments.length && arguments[0].type ? (arguments[0] = function(e, t) {
                  var r = t.sdp;
                  return Object.keys(e._reverseStreams || []).forEach(function(t) {
                    var i = e._reverseStreams[t],
                      n = e._streams[i.id];
                    r = r.replace(new RegExp(i.id, "g"), n.id)
                  }), new RTCSessionDescription({
                    type: t.type,
                    sdp: r
                  })
                }(this, arguments[0]), o.apply(this, arguments)) : o.apply(this, arguments)
              };
              var s = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
              Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
                get: function() {
                  var e = s.get.apply(this);
                  return "" === e.type ? e : c(this, e)
                }
              }), e.RTCPeerConnection.prototype.removeTrack = function(e) {
                var t, r = this;
                if ("closed" === r.signalingState) throw new DOMException(
                  "The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                if (!e._pc) throw new DOMException(
                  "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.",
                  "TypeError");
                if (!(e._pc === r)) throw new DOMException("Sender was not created by this connection.",
                  "InvalidAccessError");
                r._streams = r._streams || {}, Object.keys(r._streams).forEach(function(i) {
                  r._streams[i].getTracks().find(function(t) {
                    return e.track === t
                  }) && (t = r._streams[i])
                }), t && (1 === t.getTracks().length ? r.removeStream(r._reverseStreams[t.id]) : t.removeTrack(
                  e.track), r.dispatchEvent(new Event("negotiationneeded")))
              }
            }

            function c(e, t) {
              var r = t.sdp;
              return Object.keys(e._reverseStreams || []).forEach(function(t) {
                var i = e._reverseStreams[t],
                  n = e._streams[i.id];
                r = r.replace(new RegExp(n.id, "g"), i.id)
              }), new RTCSessionDescription({
                type: t.type,
                sdp: r
              })
            }
          },
          shimPeerConnection: function(e) {
            var t = i.detectBrowser(e);
            if (e.RTCPeerConnection) {
              var r = e.RTCPeerConnection;
              e.RTCPeerConnection = function(e, t) {
                if (e && e.iceServers) {
                  for (var n = [], a = 0; a < e.iceServers.length; a++) {
                    var o = e.iceServers[a];
                    !o.hasOwnProperty("urls") && o.hasOwnProperty("url") ? (i.deprecated("RTCIceServer.url",
                        "RTCIceServer.urls"), (o = JSON.parse(JSON.stringify(o))).urls = o.url, n.push(o)) :
                      n.push(e.iceServers[a])
                  }
                  e.iceServers = n
                }
                return new r(e, t)
              }, e.RTCPeerConnection.prototype = r.prototype, Object.defineProperty(e.RTCPeerConnection,
                "generateCertificate", {
                  get: function() {
                    return r.generateCertificate
                  }
                })
            } else e.RTCPeerConnection = function(t, r) {
                return n("PeerConnection"), t && t.iceTransportPolicy && (t.iceTransports = t.iceTransportPolicy),
                  new e.webkitRTCPeerConnection(t, r)
              }, e.RTCPeerConnection.prototype = e.webkitRTCPeerConnection.prototype, e.webkitRTCPeerConnection
              .generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                get: function() {
                  return e.webkitRTCPeerConnection.generateCertificate
                }
              });
            var a = e.RTCPeerConnection.prototype.getStats;
            e.RTCPeerConnection.prototype.getStats = function(e, t, r) {
              var i = this,
                n = arguments;
              if (arguments.length > 0 && "function" == typeof e) return a.apply(this, arguments);
              if (0 === a.length && (0 === arguments.length || "function" != typeof arguments[0])) return a.apply(
                this, []);
              var o = function(e) {
                  var t = {};
                  return e.result().forEach(function(e) {
                    var r = {
                      id: e.id,
                      timestamp: e.timestamp,
                      type: {
                        localcandidate: "local-candidate",
                        remotecandidate: "remote-candidate"
                      } [e.type] || e.type
                    };
                    e.names().forEach(function(t) {
                      r[t] = e.stat(t)
                    }), t[r.id] = r
                  }), t
                },
                s = function(e) {
                  return new Map(Object.keys(e).map(function(t) {
                    return [t, e[t]]
                  }))
                };
              if (arguments.length >= 2) {
                return a.apply(this, [function(e) {
                  n[1](s(o(e)))
                }, arguments[0]])
              }
              return new Promise(function(e, t) {
                a.apply(i, [function(t) {
                  e(s(o(t)))
                }, t])
              }).then(t, r)
            }, t.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(
              function(t) {
                var r = e.RTCPeerConnection.prototype[t];
                e.RTCPeerConnection.prototype[t] = function() {
                  var e = arguments,
                    t = this,
                    i = new Promise(function(i, n) {
                      r.apply(t, [e[0], i, n])
                    });
                  return e.length < 2 ? i : i.then(function() {
                    e[1].apply(null, [])
                  }, function(t) {
                    e.length >= 3 && e[2].apply(null, [t])
                  })
                }
              }), t.version < 52 && ["createOffer", "createAnswer"].forEach(function(t) {
              var r = e.RTCPeerConnection.prototype[t];
              e.RTCPeerConnection.prototype[t] = function() {
                var e = this;
                if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
                  var t = 1 === arguments.length ? arguments[0] : void 0;
                  return new Promise(function(i, n) {
                    r.apply(e, [i, n, t])
                  })
                }
                return r.apply(this, arguments)
              }
            }), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
              var r = e.RTCPeerConnection.prototype[t];
              e.RTCPeerConnection.prototype[t] = function() {
                return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)
                  (arguments[0]), r.apply(this, arguments)
              }
            });
            var o = e.RTCPeerConnection.prototype.addIceCandidate;
            e.RTCPeerConnection.prototype.addIceCandidate = function() {
              return arguments[0] ? o.apply(this, arguments) : (arguments[1] && arguments[1].apply(null),
                Promise.resolve())
            }
          }
        };
      e.exports = {
        shimMediaStream: a.shimMediaStream,
        shimOnTrack: a.shimOnTrack,
        shimAddTrackRemoveTrack: a.shimAddTrackRemoveTrack,
        shimGetSendersWithDtmf: a.shimGetSendersWithDtmf,
        shimSourceObject: a.shimSourceObject,
        shimPeerConnection: a.shimPeerConnection,
        shimGetUserMedia: r(331)
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(70);
      e.exports = function(e, t) {
        var n = e && e.window,
          a = {
            shimChrome: !0,
            shimFirefox: !0,
            shimEdge: !0,
            shimSafari: !0
          };
        for (var o in t) hasOwnProperty.call(t, o) && (a[o] = t[o]);
        var s = i.log,
          c = i.detectBrowser(n),
          d = {
            browserDetails: c,
            extractVersion: i.extractVersion,
            disableLog: i.disableLog,
            disableWarnings: i.disableWarnings
          },
          u = r(332) || null,
          l = r(330) || null,
          p = r(326) || null,
          f = r(324) || null,
          h = r(323) || null;
        switch (c.browser) {
          case "chrome":
            if (!u || !u.shimPeerConnection || !a.shimChrome) return s(
              "Chrome shim is not included in this adapter release."), d;
            s("adapter.js shimming chrome."), d.browserShim = u, h.shimCreateObjectURL(n), u.shimGetUserMedia(n),
              u.shimMediaStream(n), u.shimSourceObject(n), u.shimPeerConnection(n), u.shimOnTrack(n), u.shimAddTrackRemoveTrack(
                n), u.shimGetSendersWithDtmf(n), h.shimRTCIceCandidate(n);
            break;
          case "firefox":
            if (!p || !p.shimPeerConnection || !a.shimFirefox) return s(
              "Firefox shim is not included in this adapter release."), d;
            s("adapter.js shimming firefox."), d.browserShim = p, h.shimCreateObjectURL(n), p.shimGetUserMedia(
              n), p.shimSourceObject(n), p.shimPeerConnection(n), p.shimOnTrack(n), p.shimRemoveStream(n), h.shimRTCIceCandidate(
              n);
            break;
          case "edge":
            if (!l || !l.shimPeerConnection || !a.shimEdge) return s(
              "MS edge shim is not included in this adapter release."), d;
            s("adapter.js shimming edge."), d.browserShim = l, h.shimCreateObjectURL(n), l.shimGetUserMedia(n),
              l.shimPeerConnection(n), l.shimReplaceTrack(n);
            break;
          case "safari":
            if (!f || !a.shimSafari) return s("Safari shim is not included in this adapter release."), d;
            s("adapter.js shimming safari."), d.browserShim = f, h.shimCreateObjectURL(n), f.shimRTCIceServerUrls(
              n), f.shimCallbacksAPI(n), f.shimLocalStreamsAPI(n), f.shimRemoteStreamsAPI(n), f.shimTrackEventTransceiver(
              n), f.shimGetUserMedia(n), f.shimCreateOfferLegacy(n), h.shimRTCIceCandidate(n);
            break;
          default:
            s("Unsupported browser!")
        }
        return d
      }
    }, function(e, t, r) {
      "use strict";
      (function(t) {
        var i = r(333);
        e.exports = i({
          window: t.window
        })
      }).call(this, r(31))
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(122);
      Object.defineProperty(t, "AbstractWebRTC", {
        enumerable: !0,
        get: function() {
          return i.AbstractWebRTC
        }
      });
      var n = r(180);
      Object.defineProperty(t, "RELEASE_VERSION_MAP", {
        enumerable: !0,
        get: function() {
          return n.RELEASE_VERSION_MAP
        }
      }), Object.defineProperty(t, "isMatchVersion", {
        enumerable: !0,
        get: function() {
          return n.isMatchVersion
        }
      }), Object.defineProperty(t, "maxVersion", {
        enumerable: !0,
        get: function() {
          return n.maxVersion
        }
      });
      var a = r(321);
      Object.defineProperty(t, "WebRTCBuilder", {
        enumerable: !0,
        get: function() {
          return a.WebRTCBuilder
        }
      });
      var o = r(179);
      Object.defineProperty(t, "WebRTC4ChromeRelease", {
        enumerable: !0,
        get: function() {
          return o.WebRTC4ChromeRelease
        }
      });
      var s = r(178);
      Object.defineProperty(t, "WebRTC4FirefoxRelease", {
        enumerable: !0,
        get: function() {
          return s.WebRTC4FirefoxRelease
        }
      });
      var c = r(177);
      Object.defineProperty(t, "WebRTC4SafariRelease", {
        enumerable: !0,
        get: function() {
          return c.WebRTC4SafariRelease
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTCBusiness = void 0;
      var i = l(r(1)),
        n = l(r(5)),
        a = l(r(4)),
        o = l(r(3)),
        s = r(123),
        c = l(r(22)),
        d = r(335),
        u = (function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          t.default = e
        }(r(110)), r(11));

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = r(2),
        f = p.info.nrtcSdkVersion,
        h = p.info.version,
        m = function(e) {
          function t(e) {
            (0, i.default)(this, t);
            var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r
          }
          return (0, o.default)(t, e), (0, n.default)(t, [{
            key: "_reset",
            value: function() {
              this.adapterRef = null, this.sdkRef = null, this.selfWebRtcInstance = null, this.remoteWebRtcInstanceMap = {}
            }
          }, {
            key: "_createWebRTCInstance",
            value: function(e) {
              return new d.WebRTCBuilder({
                imInfo: this.adapterRef.imInfo,
                adapterRef: this.adapterRef,
                targetUid: e,
                platformName: c.default.name,
                platformVersion: c.default.version
              }).build()
            }
          }, {
            key: "createSelfWebRTCInstance",
            value: function() {
              var e = this._createWebRTCInstance(this.adapterRef.imInfo.uid);
              return this.selfWebRtcInstance = e, this._bindWebRTCEvent(e), e
            }
          }, {
            key: "_destroyRtcSelf",
            value: function() {
              var e = this.selfWebRtcInstance;
              this.adapterRef.logger.log("WebRTCBusiness: _destroyRtcSelf: local rtc " + e), e && (e.close(),
                this.selfWebRtcInstance = null)
            }
          }, {
            key: "_destroyRtcByUid",
            value: function(e) {
              var t = this.remoteWebRtcInstanceMap[e];
              this.adapterRef.logger.log("WebRTCBusiness: _destroyRtcByUid: remote rtc " + t), t && (t.close(),
                clearInterval(t.reConnectTimer), delete this.remoteWebRtcInstanceMap[e])
            }
          }, {
            key: "createRemoteWebRTCInstance",
            value: function(e) {
              var t = this._createWebRTCInstance(e);
              return this.remoteWebRtcInstanceMap[e] = t, this._bindWebRTCEvent(t), t
            }
          }, {
            key: "_bindWebRTCEvent",
            value: function(e) {
              e.on("ready", this._handleReadyEvent4WebRTC.bind(this)), e.on("iceCandidate", this._handleIceCandidateEvent4WebRTC
                .bind(this)), e.on("iceCompleted", this._handleIceCompletedEvent4WebRTC.bind(this)), e.on(
                "negotiationNeeded", this._handleNegotiationNeededEvent4WebRTC.bind(this)), e.on(
                "iceStateChange", this._handleIceStateChangeEvent4WebRTC.bind(this)), e.on(
                "iceCandidateTimeOut", this._handleIceCandidateTimeOutEvent4WebRTC.bind(this)), e.on(
                "getRemoteStream", this._handleGetRemoteStreamEvent4WebRTC.bind(this))
            }
          }, {
            key: "_unbindWebRTCEvent",
            value: function(e) {
              e.removeListener("ready", this._handleReadyEvent4WebRTC.bind(this)), e.removeListener(
                "iceCandidate", this._handleIceCandidateEvent4WebRTC.bind(this)), e.removeListener(
                "iceCompleted", this._handleIceCompletedEvent4WebRTC.bind(this)), e.removeListener(
                "negotiationNeeded", this._handleNegotiationNeededEvent4WebRTC.bind(this)), e.removeListener(
                "iceStateChange", this._handleIceStateChangeEvent4WebRTC.bind(this)), e.removeListener(
                "iceCandidateTimeOut", this._handleIceCandidateTimeOutEvent4WebRTC.bind(this)), e.removeListener(
                "getRemoteStream", this._handleGetRemoteStreamEvent4WebRTC.bind(this))
            }
          }, {
            key: "_handleReadyEvent4WebRTC",
            value: function(e) {}
          }, {
            key: "_handleIceCandidateEvent4WebRTC",
            value: function(e) {
              this.adapterRef.logger.log("WebRTCBusiness:_handleIceCandidateEvent4WebRTC event: %o", e);
              var t = e.uid,
                r = e.ice;
              /\d tcp \d/gi.test(r.candidate) ? this.adapterRef.logger.warn("tcp candidate 忽略 ") : this.adapterRef
                .instance._getWebRTCGateWayManager().doSendIceOffer({
                  params: {
                    dst_id: t,
                    content: r
                  }
                })
            }
          }, {
            key: "_handleIceCompletedEvent4WebRTC",
            value: function(e) {
              if (this.adapterRef.logger.log("WebRTCBusiness:_handleIceCompletedEvent4WebRTC event: ", e),
                e) {
                var t = e,
                  r = this.getRtcObject(t),
                  i = this.adapterRef.instance._getVideoHelperByUid(t);
                if (i && r && r.rtcConnection && r.rtcConnection.remoteDescription && r.rtcConnection.remoteDescription
                  .sdp) {
                  this.adapterRef.logger.log("确保是拉流的updata sdp 触发的");
                  var n = r.rtcConnection.remoteDescription.sdp;
                  if (i.checkRemoteTrack(t, n, r.rtcConnection) && (this.adapterRef.logger.log(
                      "视频需要检查远程轨道"), i.delayVideoShow(t, !0), i.remoteVideoStream)) {
                    var a = i.remoteVideoStream.getVideoTracks()[0];
                    this.adapterRef.instance.emit(u.EVENT_OBJ.remoteTrack.key, {
                      account: this.adapterRef.instance._getAccountByUid(t),
                      uid: t,
                      track: a
                    });
                    var o = this.adapterRef.instance._getAudioHelperByUid(t);
                    this.adapterRef.instance._isChrome72() && o && o.remoteAudioStream && this.adapterRef
                      .instance.emit(u.EVENT_OBJ.remoteTrack.key, {
                        account: this.adapterRef.instance._getAccountByUid(t),
                        uid: t,
                        track: o.remoteAudioStream.getAudioTracks()[0]
                      })
                  }
                }
                this._handleUpdateLog(t, "completed", r)
              }
            }
          }, {
            key: "_handleNegotiationNeededEvent4WebRTC",
            value: function(e) {
              this.adapterRef.logger.log("WebRTCBusiness:_handleNegotiationNeededEvent4WebRTC event: %o",
                e)
            }
          }, {
            key: "_handleIceStateChangeEvent4WebRTC",
            value: function(e) {
              if (this.adapterRef.webrtcBusiness) {
                this.adapterRef.logger.log("WebRTCBusiness: _handleIceStateChange4WebRTC event: ", e.state);
                var t = e.rtc,
                  r = e.state,
                  i = t.targetUid;
                if (this.adapterRef.imInfo.netDetect && (this.adapterRef.logger.log(
                      "WebRTCBusiness: _handleIceStateChange4WebRTC 重新赋值remoteWebRtcInstanceMap"), this.adapterRef
                    .webrtcBusiness.remoteWebRtcInstanceMap = this.remoteWebRtcInstanceMap), "connected" ===
                  r && i == this.adapterRef.imInfo.uid && this.adapterRef.instance.emit(u.EVENT_OBJ.sessionConnected
                    .key), "connected" !== r && "completed" !== r || (t && t.reConnectTimer && (this.adapterRef
                    .logger.warn("下行重连成功: ", i), clearInterval(t.reConnectTimer), t.reConnectTimer =
                    null), this._doSdpUpdata(t)), "failed" === r) {
                  if (this.adapterRef.logger.warn("ICE 连接失败: ", i), i == this.adapterRef.imInfo.uid ||
                    this.adapterRef.instance._isFirefox()) return void this._doIceFail4Self();
                  this._doIceFail4Remote(i)
                }
                "failed" !== r && "completed" !== r || !this.adapterRef.logReportHelper || this._handleUpdateLog(
                  i, r, t)
              }
            }
          }, {
            key: "_handleIceCandidateTimeOutEvent4WebRTC",
            value: function(e) {
              var t = e.rtc,
                r = e.state;
              "completed" !== r && "connected" !== r && "closed" !== r && t && (this.adapterRef.logger.log(
                  "WebRTCBusiness: _handleGetRemoteStreamEvent4WebRTC event: %o", "中继连接失败开始直连"),
                "WebRTC" === u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE] ? this.adapterRef.imInfo
                .serverMap.relayaddrs = null : "NRTC" === u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE] &&
                (this.adapterRef.imInfo.relayaddrs = null), t.close(), t._resetPeerTimeOut(), t._init(),
                t.targetUid == this.adapterRef.imInfo.uid ? this.adapterRef.instance._judgeSendSdpOfferOrUpdate() :
                this.adapterRef.webrtcBusiness._createOffer({
                  rtc: t
                }))
            }
          }, {
            key: "_handleUpdateLog",
            value: function(e, t, r) {
              if (this.adapterRef.logReportHelper) {
                var i = function(e) {
                    var t = {
                      audioId: "",
                      videoId: "",
                      ext: ""
                    };
                    return e && e.length && e.map(function(e) {
                      e.track && "audio" == e.track.kind ? t.audioId = e.track.id : e.track &&
                        "video" == e.track.kind && (t.videoId = e.track.id)
                    }), t.ext = "", t
                  },
                  n = {};
                n.uid = this.adapterRef.imInfo && this.adapterRef.imInfo.uid || "", n.remoteUid = e, n.ext =
                  "", n.iceConnection = t, n.localSdp = r.rtcConnection.localDescription.sdp, n.remoteSdp =
                  r.rtcConnection.remoteDescription.sdp, n.locallCECandidates = [], n.remoteICECandidates = [],
                  r.rtcConnection && r.rtcConnection.getSenders && (n.upStream = i(r.rtcConnection.getSenders())),
                  r.rtcConnection && r.rtcConnection.getReceivers && (n.downStream = i(r.rtcConnection.getReceivers())),
                  this.adapterRef.logReportHelper.uploadData("peerConnections", n)
              }
            }
          }, {
            key: "_handleGetRemoteStreamEvent4WebRTC",
            value: function(e) {
              this.adapterRef.logger.log("WebRTCBusiness:_handleGetRemoteStreamEvent4WebRTC event: %o", e);
              var t = e.uid,
                r = e.stream,
                i = e.track;
              t ? this.adapterRef.instance._doRemoteStream(r, t, i) : this.adapterRef.logger.error(
                "未找到远程流的UID...")
            }
          }, {
            key: "_doSdpUpdata",
            value: function(e) {
              var t = e.rtcConnection;
              this.adapterRef.logger.log("WebRTCBusiness: _doSdpUpdata");
              var r = t.getSenders();
              if (e.targetUid == this.adapterRef.imInfo.uid && r && r.length > 0)
                if (r.length > 1 && r[0].track && r[1] && r[1].track) this.adapterRef.logger.log(
                  " --\x3e media type: %s %s", r[0].track.kind, r[1].track.kind);
                else {
                  if (!this.adapterRef.instance._isPlayer()) return;
                  var i = [],
                    n = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid),
                    a = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid),
                    o = n.getLocalAudioStream(!0),
                    s = a.getLocalVideoStream(!0);
                  o && i.push(o), s && i.push(s), 2 == i.length && (this.adapterRef.logger.log(
                    "WebRTCBusiness: _doSdpUpdata 上行需要进行sdp协商!"), this.selfWebRtcInstance.updateStream(
                    i), this._createOffer({
                    rtc: e
                  }))
                }
              else e.isNeedUpdataSdp && (this.adapterRef.logger.log(
                  "WebRTCBusiness: _doSdpUpdata 下行(%s)需要进行sdp协商!", e.targetUid), e.isNeedUpdataSdp = !1,
                this._createOffer({
                  rtc: e
                }));
              if (e.targetUid != this.adapterRef.imInfo.uid && this.adapterRef.instance._isSafari()) {
                var c = this.adapterRef.instance._getAudioHelperByUid(e.targetUid);
                if (!c || !c.audioDomHelper || void 0 === c.audioDomHelper.audioDom.srcObject) return;
                c.audioDomHelper.audioDom.played.length, this.adapterRef.logger.log(
                    "WebRTCBusiness: _doSdpUpdata: rtc.targetUid: ", e.targetUid), this.adapterRef.deviceApi
                  ._doStartDevice4PlayRemoteAudio(e.targetUid)
              }
            }
          }, {
            key: "_doIceFail4Self",
            value: function() {
              this.adapterRef.logger.log("WebRTCBusiness: _doIceFail4Self 自己断开，_onSignalTimeout 开始重连!"),
                this.adapterRef.reconnectState.isReconnect = !0, this.adapterRef.instance._onSignalTimeout()
            }
          }, {
            key: "_doIceFail4Remote",
            value: function(e) {
              var t = this;
              this.adapterRef.logger.log("WebRTCBusiness:_doIceFail4Remote (%s）断开连接了，现在开始进行下行第一次重连...", e);
              var r = this.getRtcObject(e);
              r ? this.adapterRef && this.adapterRef.reconnectState && this.adapterRef.reconnectState.isStoped ||
                this.adapterRef && this.adapterRef.reconnectState && this.adapterRef.reconnectState.startReconnect ||
                (r.reConnectTimer = setInterval(function() {
                  r && !r.rtcConnection && t.adapterRef && t.adapterRef.webrtcBusiness ? r.rtcConnection
                    .iceConnectionState || "connected" == r.rtcConnection.iceConnectionState ||
                    "completed" == r.rtcConnection.iceConnectionState || "closed" == r.rtcConnection.iceConnectionState ?
                    clearInterval(r.reConnectTimer) : (t.adapterRef.logger.warn(
                      "WebRTCBusiness:_doIceFail4Remote (%s)下行第%s重连结束, state: ", e, r.count, r.rtcConnection
                      .iceConnectionState), r.count > 2 && (clearInterval(r.reConnectTimer), t.adapterRef
                      .logger.warn("(%s)连接失败，现在清除该下行重连...", e), t.adapterRef.instance.emit(u.EVENT_OBJ
                        .remoteSignalClosed.key, e), t.adapterRef.instance.doClearAfterRemoteLeave(
                        e)), r.count++, t._createOffer({
                      rtc: r
                    })) : clearInterval(r.reConnectTimer)
                }, 15e3), r.count = 0, r.count++, this._createOffer({
                  rtc: r
                })) : this.adapterRef.logger.error("WebRTCBusiness:_doIceFail4Remote 不存在的远程rtc对象")
            }
          }, {
            key: "getRtcObject",
            value: function(e) {
              var t = null;
              return t = e == this.adapterRef.imInfo.uid ? this._getSelfWebRtcInstance() : this._getRemoteWebRtcInstance(
                e), this.adapterRef.logger.log("WebRTCBusiness:getRtcObject %s, uid=%s", e == this.adapterRef
                .imInfo.uid ? "上行" : "下行", e), t
            }
          }, {
            key: "_hasAudio",
            value: function() {
              return this.adapterRef.deviceBusiness ? this.adapterRef.deviceBusiness.hasAudio(this.adapterRef
                .deviceBusiness.mediaDeviceHelper.getDeviceStatus(), this.adapterRef.state.audioDeviceHasOpened,
                this.adapterRef.imInfo.role) : (this.adapterRef.logger.log(
                "WebRTCBusiness:_hasAudio no deviceBusiness"), !1)
            }
          }, {
            key: "_hasVideo",
            value: function() {
              if (!this.adapterRef.deviceBusiness) return this.adapterRef.logger.log(
                "WebRTCBusiness:_hasVideo no deviceBusiness"), !1;
              if ("NRTC" === u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE]) {
                var e = this.adapterRef.instance._getVideoHelperByUid("local");
                return !(!e || !e.pushVideoStream)
              }
              return "WebRTC" === u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE] ? this.adapterRef.deviceBusiness
                .hasVideo(this.adapterRef.deviceBusiness.mediaDeviceHelper.getDeviceStatus(), this.adapterRef
                  .state.videoDeviceHasOpened, this.adapterRef.state.chromeScreenShareOpened, this.adapterRef
                  .imInfo.role) : void 0
            }
          }, {
            key: "_getSelfWebRtcInstance",
            value: function() {
              return this.selfWebRtcInstance
            }
          }, {
            key: "_getRemoteWebRtcInstance",
            value: function(e) {
              return this.remoteWebRtcInstanceMap[e]
            }
          }, {
            key: "_startRTCIfHasDeviceOpened",
            value: function() {
              this.adapterRef.logger.log("WebRTCBusiness:_startRTCIfHasDeviceOpened 如果有本地设备启用则初始化rtc"),
                this.adapterRef.imInfo.netDetect || this._hasAudio() || this._hasVideo() ? this._initWebRTCInstance4Self(
                  !1, !0) : this.adapterRef.logger.log(
                  "WebRTCBusiness:_startRTCIfHasDeviceOpened 重连之后，不需要推流")
            }
          }, {
            key: "_initWebRTCInstance4Self",
            value: function() {
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              if (this.adapterRef.logger.log("WebRTCBusiness:_initWebRTCInstance4Self 初始化WebRTC流程管理器 ..."),
                this.selfWebRtcInstance) return this.adapterRef.logger.log(
                "WebRTCBusiness:_initWebRTCInstance4Self 已初始流程管理器，只更新流"), void(e && (this._updateRtcStream(),
                this._startRtc(!0)));
              this.createSelfWebRTCInstance(), e && (this._updateRtcStream(), this._startRtc(!0))
            }
          }, {
            key: "_updateRtcStream",
            value: function() {
              if (this.selfWebRtcInstance) {
                this.adapterRef.logger.log("WebRTCBusiness:_updateRtcStream 更新流到RTC中");
                var e = [];
                if (this.adapterRef.instance._isPlayer()) {
                  var t = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid),
                    r = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid),
                    i = t.getLocalAudioStream(!0),
                    n = r.getLocalVideoStream(!0);
                  i || (t.setLocalAuioStreamToPushStream(), i = t.getLocalAudioStream(!0)), n || (r.setLocalVideoStreamToPushStream(),
                      n = r.getLocalVideoStream(!0)), i && !1 === this.adapterRef.tempInfo.localAudioMuted &&
                    e.push(i), n && !1 === this.adapterRef.tempInfo.localVideoMuted && e.push(n), this.adapterRef
                    .logger.log("WebRTCBusiness:_updateRtcStream tempInfo %o", this.adapterRef.tempInfo),
                    this.adapterRef.logger.log("WebRTCBusiness:_updateRtcStream localAudioStream %o", i),
                    this.adapterRef.logger.log("WebRTCBusiness:_updateRtcStream localVideoStream %o", n),
                    this.adapterRef.logger.log("WebRTCBusiness:_updateRtcStream streamList %o", e)
                }
                this.selfWebRtcInstance.updateStream(e)
              } else this.adapterRef.logger.error(
                "WebRTCBusiness:_updateRtcStream 自己的上行webrtc流程管理器实例未创建，无法更新流")
            }
          }, {
            key: "_startRtc",
            value: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              return this._createOffer({
                isUpdate: t
              }).then(function() {
                return new Promise(function(t, r) {
                  e.once("sessionConnected", function(r) {
                    e.adapterRef.logger.log("WebRTCBusiness:_startRtc ===== RTC连接成功...."), e.adapterRef
                      .state.rtcConnected = !0, e.adapterRef.instance._setSessionConfig({
                        rtcEndTime: Date.now()
                      }), t(r)
                  }), e.once("rtcConnectError", function(t) {
                    e.adapterRef.logger.error("WebRTCBusiness:_startRtc ===== RTC连接失败...");
                    var i = Object.assign({
                      event: t
                    }, u.GateWayErrorCode.GateWayRTCConnectFail);
                    r(i)
                  })
                })
              }).catch(function(t) {
                e.adapterRef.logger.error("WebRTCBusiness:_startRtc 发起上行流失败 error=%o", t);
                var r = Object.assign({
                  event: t
                }, u.GateWayErrorCode.GateWayRTCConnectFail);
                return Promise.reject(r)
              })
            }
          }, {
            key: "_createOffer",
            value: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                r = t.isUpdate,
                i = void 0 !== r && r,
                n = t.rtc,
                a = void 0 === n ? this.selfWebRtcInstance : n;
              return this.adapterRef.logger.log("WebRTCBusiness:_createOffer isUpdate=%o", i), a.createOffer()
                .then(function(t) {
                  return e.adapterRef.logger.log("WebRTCBusiness:_createOffer, 开始设置本地描述..."), a.setLocalDescription(
                    t, i)
                }).then(function(t) {
                  e.adapterRef.logger.log("WebRTCBusiness:_createOffer 本地描述设置成功, targetUid: ", a.targetUid);
                  var r = a.targetUid == e.adapterRef.imInfo.uid,
                    n = e.adapterRef.imInfo,
                    o = e.adapterRef.imInfo.videoConfig,
                    s = e.adapterRef.imInfo.sessionConfig,
                    c = {
                      params: {
                        version: +f,
                        token: n.token || n.cid + "",
                        user_type: n.token ? 3 : 2,
                        user_token_type: 0,
                        content: t,
                        dst_id: r ? n.uid : a.targetUid,
                        is_multi_peerconnection: !0,
                        sdk_version: h
                      }
                    };
                  if (r) {
                    var d = !!e.adapterRef.imInfo.netDetect || e._hasAudio(),
                      u = !!e.adapterRef.imInfo.netDetect || e._hasVideo();
                    e.adapterRef.logger.log("WebRTCBusiness:_createOffer  hasAudio: %s, hasVideo: %s ",
                      d, u), c.hasAudio = d, c.hasVideo = u, c.params.streamSetting = {
                      video: {
                        width: e.adapterRef.state.chromeScreenShareOpened ? 1280 : o.width,
                        height: e.adapterRef.state.chromeScreenShareOpened ? 720 : o.height,
                        frameRate: e.adapterRef.state.chromeScreenShareOpened ? 5 : s.liveEnable && o
                          .frameRate > 15 ? 15 : o.frameRate
                      }
                    }
                  }
                  var l = e.adapterRef.instance._getWebRTCGateWayManager();
                  l && (i ? l.doSendSdpUpdate(c) : l.doSendSdpOffer(c))
                }).catch(function(t) {
                  e.adapterRef.logger.warn(t)
                })
            }
          }, {
            key: "doClientJoin",
            value: function(e) {
              if (this.adapterRef.logger.log("WebRTCBusiness: doClientJoin: ===== 人员加入，创建下行流..."), this.adapterRef
                .webrtcBusiness._getRemoteWebRtcInstance(e)) return this.adapterRef.logger.log(
                "WebRTCBusiness: doClientJoin: 已存在远程rtc实例，即将执行_onclient_update"), this.doClientUpdate(
                e, !0);
              var t = this.adapterRef.webrtcBusiness.createRemoteWebRTCInstance(e);
              if (!this.adapterRef.imInfo.netDetect) {
                var r = this.adapterRef.instance._getAudioHelperByUid(e),
                  i = this.adapterRef.instance._getVideoHelperByUid(e);
                i.setVideoContainer(this.adapterRef.tempInfo.remoteContainer), i.isJoined = !0, i.setRTC(
                  t), r.setRTC(t)
              }
              this._createOffer({
                rtc: t
              })
            }
          }, {
            key: "doClientUpdate",
            value: function(e, t) {
              if (this.adapterRef.logger.log("WebRTCBusiness:doClientUpdate uid=%o, hasVideo=%o", e, t),
                !this.adapterRef.webrtcBusiness._getRemoteWebRtcInstance(e)) return this.adapterRef.logger
                .log("WebRTCBusiness: doClientUpdate: 不存在远程rtc实例，即将执行doClientJoin"), this.doClientJoin(
                  e);
              var r = this.getRtcObject(e);
              r ? 1 == t ? r.rtcConnection && r.rtcConnection.localDescription && r.rtcConnection.iceConnectionState &&
                "connected" !== r.rtcConnection.iceConnectionState && "completed" !== r.rtcConnection.iceConnectionState ?
                (this.adapterRef.logger.warn("create rtc later"), r.isNeedUpdataSdp = !0) : this._createOffer({
                  rtc: r
                }) : this.adapterRef.instance._getVideoHelperByUid(e).delayVideoShow(e, t) : this.adapterRef
                .logger.error("WebRTCBusiness:doClientUpdate 不存在的远程rtc对象")
            }
          }, {
            key: "switchTrackEvent",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.stream,
                r = e.uid,
                i = e.bindTrackEvent,
                n = void 0 === i || i;
              t && r ? (this.adapterRef.logger.log(
                  "WebRTCBusiness:switchTrackEvent stream=%o, uid=%o, bindTrackEvent=%o", t, r, n), n ?
                this._doBindTrackEvent(e) : this._doUnBindTrackEvent(e)) : this.adapterRef.logger.error(
                "WebRTCBusiness:switchTrackEvent 不存在的流或uid")
            }
          }, {
            key: "_doUnBindTrackEvent",
            value: function(e) {
              var t = e.stream,
                r = e.uid;
              this.adapterRef.logger.log("WebRTCBusiness:_doUnBindTrackEvent 解绑轨道事件 stream=%o, uid=%o", t,
                r), t.onaddtrack = null, t.onremovetrack = null
            }
          }, {
            key: "_doBindTrackEvent",
            value: function(e) {
              var t = e.stream,
                r = e.uid;
              this.adapterRef.logger.log("WebRTCBusiness:_doBindTrackEvent 绑定轨道事件 stream=%o, uid=%o", t,
                r), t && r ? (t.onaddtrack || this._doRegisterAddTrackEvent(t, r), t.onremovetrack ||
                this._doRegisterRemoveTrackEvent(t, r)) : this.adapterRef.logger.error(
                "WebRTCBusiness:_doBindTrackEvent 不存在的流对象或uid")
            }
          }, {
            key: "_doRegisterAddTrackEvent",
            value: function(e, t) {
              var r = this;
              this.adapterRef.logger.log(
                  "WebRTCBusiness:_doRegisterAddTrackEvent 添加轨道添加事件 stream=%o, uid=%o", e, t), e.onaddtrack =
                function(e) {
                  if (r.adapterRef.imInfo.netDetect) r.adapterRef.logger.log(
                    "audioHelper:_composeTrack 网络探测直接忽略");
                  else {
                    r.adapterRef.instance.emit(u.EVENT_OBJ.addTrack.key, e), r.adapterRef.logger.log(
                      "stream 添加轨道添加事件: ", e);
                    var i = e.track;
                    if ("audio" == i.kind) return r.adapterRef.instance._getAudioHelperByUid(t).composeTrack(
                      t, i), void r.adapterRef.logger.warn(
                      "WebRTCBusiness:_doRegisterAddTrackEvent 非video直接返回...");
                    var n = r.adapterRef.instance._getVideoHelperByUid(t);
                    n.composeTrack(t, i), n.setIsRemote(!0);
                    var a = r.getRtcObject(t);
                    if (r.adapterRef.instance.emit(u.EVENT_OBJ.remoteTrack.key, {
                        account: r.adapterRef.instance._getAccountByUid(t),
                        uid: t,
                        track: i
                      }), a.rtcConnection && a.rtcConnection.remoteDescription && a.rtcConnection.remoteDescription
                      .sdp) {
                      var o = a.rtcConnection.remoteDescription.sdp;
                      n.checkRemoteTrack(t, o)
                    }
                    n.delayVideoShow(t)
                  }
                }
            }
          }, {
            key: "_doRegisterRemoveTrackEvent",
            value: function(e, t) {
              var r = this;
              this.adapterRef.logger.log(
                  "WebRTCBusiness:_doRegisterRemoveTrackEvent 删除轨道事件 stream=%o, uid=%o", e, t), e.onremovetrack =
                function(e) {
                  var i = e.track.kind;
                  if (r.adapterRef.instance.emit(u.EVENT_OBJ.removeTrack.key, e), "audio" !== i) {
                    var n = r.adapterRef.instance._getVideoHelperByUid(t);
                    n.remoteVideoStream && n.hide()
                  } else r.adapterRef.logger.warn(
                    "WebRTCBusiness:_doRegisterRemoveTrackEvent 非video直接返回...")
                }
            }
          }, {
            key: "_switchRole",
            value: function() {
              this.adapterRef.logger.log("WebRTCBusiness:_switchRole ");
              var e = this.adapterRef.instance._getWebRTCGateWayManager();
              return e && e.state.hasLogined ? this.adapterRef.instance._updateRtc(!0) : Promise.reject(u
                .GateWayErrorCode.GateWayServerError)
            }
          }, {
            key: "_enableDevice",
            value: function(e) {
              return this.adapterRef.logger.log("WebRTCBusiness:_enableDevice 设备解禁"), this._switchDeviceTrackStatus(
                e, !0), Promise.resolve()
            }
          }, {
            key: "_disableDevice",
            value: function(e) {
              return this.adapterRef.logger.log("WebRTCBusiness:_disableDevice 设备禁用"), this._switchDeviceTrackStatus(
                e, !1), Promise.resolve()
            }
          }, {
            key: "_switchDeviceTrackStatus",
            value: function(e, t) {
              var r = [];
              if (e === u.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN) {
                var i = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid);
                i.localAudioStream && (r = i.localAudioStream.getTracks())
              } else {
                var n = this.adapterRef.instance._getVideoHelperByUid(this.adapterRef.imInfo.uid);
                n.localVideoStream && (r = n.localVideoStream.getTracks())
              }
              r.map(function(e) {
                e.enabled = t
              })
            }
          }, {
            key: "destroy",
            value: function() {
              this.adapterRef.logger.log("WebRTCBusiness:destroy: ", this), this.selfWebRtcInstance && (
                this._unbindWebRTCEvent(this.selfWebRtcInstance), this.selfWebRtcInstance.destroy(),
                this.selfWebRtcInstance = null);
              var e = this.remoteWebRtcInstanceMap;
              for (var t in e) {
                var r = e[t];
                r && (this._unbindWebRTCEvent(r), r.destroy(), r = null)
              }
            }
          }]), t
        }(s.AbstractBusiness);
      t.WebRTCBusiness = m
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.DeviceBusiness = void 0;
      var i = d(r(1)),
        n = d(r(5)),
        a = d(r(4)),
        o = d(r(3)),
        s = r(124),
        c = r(11);

      function d(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var u = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r._initMediaDeviceHelper(), r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.adapterRef = null, this.sdkRef = null, this.mediaDeviceHelper = null
          }
        }, {
          key: "_initMediaDeviceHelper",
          value: function() {
            this.mediaDeviceHelper ? this.adapterRef.logger.warn(
              "DeviceBusiness:_initMediaDeviceHelper: 已存在的MediaDeviceHelper实例，不重复创建!") : (this.adapterRef
              .logger.log("DeviceBusiness: _initMediaDeviceHelper: 初始化mediaDeviceHelper"), this.mediaDeviceHelper =
              new s.MediaDeviceHelper({
                adapterRef: this.adapterRef,
                sdkRef: this.sdkRef
              }), this._bindDeviceEvent())
          }
        }, {
          key: "_bindDeviceEvent",
          value: function() {
            this.mediaDeviceHelper.on(c.EVENT_OBJ.deviceAdd.key, this._onDeviceAdd.bind(this)), this.mediaDeviceHelper
              .on(c.EVENT_OBJ.deviceRemove.key, this._onDeviceRemove.bind(this)), this.mediaDeviceHelper
              .on(c.EVENT_OBJ.deviceStatus.key, this._onDeviceStatus.bind(this))
          }
        }, {
          key: "_unbindDeviceEvent",
          value: function() {
            this.mediaDeviceHelper.removeListener(c.EVENT_OBJ.deviceAdd.key, this._onDeviceAdd.bind(
              this)), this.mediaDeviceHelper.removeListener(c.EVENT_OBJ.deviceRemove.key, this._onDeviceRemove
              .bind(this)), this.mediaDeviceHelper.removeListener(c.EVENT_OBJ.deviceStatus.key, this._onDeviceStatus
              .bind(this))
          }
        }, {
          key: "_onDeviceAdd",
          value: function(e) {
            this.adapterRef.logger.log("DeviceBusiness: _onDeviceAdd: ", e), this.adapterRef.instance.emit(
              c.EVENT_OBJ.deviceAdd.key, e)
          }
        }, {
          key: "_onDeviceRemove",
          value: function(e) {
            this.adapterRef.logger.log("DeviceBusiness: _onDeviceRemove: ", e), this.adapterRef.instance
              .emit(c.EVENT_OBJ.deviceRemove.key, e)
          }
        }, {
          key: "_onDeviceStatus",
          value: function(e) {
            this.adapterRef.logger.log("DeviceBusiness: _onDeviceStatus: ", e), this.adapterRef.instance
              .emit(c.EVENT_OBJ.deviceStatus.key, e)
          }
        }, {
          key: "hasAudio",
          value: function(e, t, r) {
            return this.adapterRef.logger.log(
              "DeviceBusiness: hasAudio: 检测是否有音频, deviceStatus=%o, audioDeviceHasOpened=%o, role=%o",
              e, t, r), t && r === c.ROLE_FOR_MEETING.ROLE_PLAYER
          }
        }, {
          key: "hasVideo",
          value: function(e, t, r, i) {
            return this.adapterRef.logger.log(
              "DeviceBusiness: hasVideo: 检测是否有视频, videoDeviceHasOpened=%o, chromeScreenShareOpened=%o, role=%o",
              t, r, i), r || t && i === c.ROLE_FOR_MEETING.ROLE_PLAYER
          }
        }, {
          key: "destroy",
          value: function() {
            this.adapterRef.logger.log("DeviceBusiness: destroy "), this.mediaDeviceHelper && (this._unbindDeviceEvent(),
              this.mediaDeviceHelper.destroy(), this.mediaDeviceHelper = null)
          }
        }]), t
      }(r(123).AbstractBusiness);
      t.DeviceBusiness = u
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTCGateWayBusiness = void 0;
      var i = l(r(1)),
        n = l(r(5)),
        a = l(r(4)),
        o = l(r(3)),
        s = r(124),
        c = r(123),
        d = l(r(22)),
        u = r(11);

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = r(2),
        f = function(e) {
          function t(e) {
            (0, i.default)(this, t);
            var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return r._reset(), r.adapterRef = e.adapterRef, r.sdkRef = e.sdkRef, r.detectNetworkResult = null, r
          }
          return (0, o.default)(t, e), (0, n.default)(t, [{
            key: "_reset",
            value: function() {
              this.adapterRef = null, this.sdkRef = null, this.webRTCGateWayManager = null
            }
          }, {
            key: "_onWaitForWssocket",
            value: function() {
              var e = this;
              return this.adapterRef.logger.log("WebrtcGateWayBusiness： _onWaitForWssocket 等待连接"), new Promise(
                function(t, r) {
                  if (e.adapterRef.logger.log(
                      "WebrtcGateWayBusiness: _onWaitForWssocket startReconnect: ", e.adapterRef.reconnectState
                      .startReconnect), !e.adapterRef.reconnectState.startReconnect)
                    if (e.adapterRef.webrtcGateWayBusiness && e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager
                      .state.hasLogined) e.adapterRef.logger.log(
                      "WebrtcGateWayBusiness:  _onWaitForWssocket wss已经连接成功");
                    else {
                      var i = 0;
                      e.adapterRef.reconnectState.wssTime && (clearInterval(e.adapterRef.reconnectState
                          .wssTime), e.adapterRef.reconnectState.wssTime = null), e.adapterRef.reconnectState
                        .wssTime = setInterval(function() {
                          i++ > 450 && (clearInterval(e.adapterRef.reconnectState.wssTime), e.adapterRef
                              .logger.log("WebrtcGateWayBusiness: _onWaitForWssocket wss连接超时"), i = 0,
                              e.emit(u.EVENT_OBJ.gatewayClosed.key, u.GateWayErrorCode.GateWayConnectionTimeout),
                              r(u.GateWayErrorCode.GateWayConnectionTimeout)), e.adapterRef.webrtcGateWayBusiness,
                            e.adapterRef.webrtcGateWayBusiness && e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager
                            .state.hasLogined ? (e.adapterRef.logger.log(
                                "WebrtcGateWayBusiness: _onWaitForWssocket 连接成功, wssTime: ", e.adapterRef
                                .reconnectState.wssTime), clearInterval(e.adapterRef.reconnectState.wssTime),
                              e.adapterRef.reconnectState.wssTime = null, t(e.adapterRef.webrtcGateWayBusiness
                                .webRTCGateWayManager)) : e.adapterRef.reconnectState.isStoped && (e.adapterRef
                              .logger.log("WebrtcGateWayBusiness: _onWaitForWssocket 连接失败, wssTime: ",
                                e.adapterRef.reconnectState.wssTime), clearInterval(e.adapterRef.reconnectState
                                .wssTime), e.adapterRef.reconnectState.wssTime = null, e.adapterRef.reconnectState
                              .isStoped = !1, e.emit(u.EVENT_OBJ.gatewayClosed.key, u.GateWayErrorCode
                                .GateWayConnectionTimeout), r(u.GateWayErrorCode.GateWayConnectionTimeout)
                            )
                        }, 360)
                    }
                })
            }
          }, {
            key: "doTryInit",
            value: function() {
              var e = this.adapterRef.imInfo,
                t = e.serverMap,
                r = void 0 === t ? {} : t,
                i = e.wssArr;
              this.adapterRef.logger.log("WebrtcGateWayBusiness: doTryInit serverMap=%o, wssArr=%o", r, i);
              var n = null;
              if (!i)
                if (r) i = r.webrtcarray || [r.webrtc];
                else {
                  var a = (this.adapterRef.imInfo.clientConfig && JSON.parse(this.adapterRef.imInfo.clientConfig) ||
                    {}).custom || {};
                  i = a.webrtcarray || [a.webrtc], this.adapterRef.imInfo.serverMap = a
                } return this.adapterRef.logger.log("WebrtcGateWayBusiness: doTryInit: 合并后的wssArr=%o", i),
                i && 0 !== i.length ? (n = i[0], this.adapterRef.isPrivateDeployment && this.adapterRef.privateDeploymentConf &&
                  this.adapterRef.privateDeploymentConf.wssServer && (n = this.adapterRef.privateDeploymentConf
                    .wssServer + "/?" + n.split("/?")[1], p.wssServer = this.adapterRef.privateDeploymentConf
                    .wssServer), this._initWebRTCGateWayManager({
                    url: n,
                    context: this._transform2WebRTCGateWayContext(this.adapterRef.imInfo),
                    keepAliveInterval4Second: 5
                  }), this._onWaitForWssocket()) : (this.adapterRef.logger.error(
                    "WebRTCGateWayBusiness: doTryInit: ", u.GateWayErrorCode.GateWayAddressNotAvailable),
                  Promise.reject(u.GateWayErrorCode.GateWayAddressNotAvailable))
            }
          }, {
            key: "destroy",
            value: function() {
              this.adapterRef.logger.log("WebRTCGateWayBusiness: destroy");
              var e = this.webRTCGateWayManager;
              e && (this._unbindWebRTCGateWayManagerEvent(e), e.state.hasLogined ? e.doSendLogout({
                  params: {
                    content: {
                      timestamp: Date.now()
                    }
                  }
                }) : this.adapterRef.logger.warn("WebRTCGateWayBusiness: destroy, 没有login，无需logout"), e
                .destroy(), e = null)
            }
          }, {
            key: "_initWebRTCGateWayManager",
            value: function(e) {
              this.adapterRef.logger.log("WebRTCGateWayBusiness: _initWebRTCGateWayManager 初始化网关管理器 ...");
              var t = e.url,
                r = e.context,
                i = e.keepAliveInterval4Second;
              return null != this.webRTCGateWayManager ? (this.adapterRef.logger.error(
                  "WebRTCGateWayBusiness: _initWebRTCGateWayManager msg", u.GateWayErrorCode.GateWayLoginAlready
                ), Promise.reject(u.GateWayErrorCode.GateWayLoginAlready)) : null != this.webRTCGateWayManager &&
                this.webRTCGateWayManager.state.hasLogined ? (this.adapterRef.logger.error(
                  "WebRTCGateWayBusiness: _initWebRTCGateWayManager msg", u.GateWayErrorCode.GateWayLoginAlready
                ), Promise.reject(u.GateWayErrorCode.GateWayLoginAlready)) : (this.webRTCGateWayManager =
                  new s.WebRTCGateWayManager({
                    url: t,
                    context: r,
                    keepAliveInterval4Second: i,
                    adapterRef: this.adapterRef,
                    sdkRef: this.sdkRef
                  }), void this._bindWebRTCGateWayManagerEvent(this.webRTCGateWayManager))
            }
          }, {
            key: "_bindWebRTCGateWayManagerEvent",
            value: function(e) {
              this.adapterRef.logger.log(
                  "WebRTCGateWayBusiness: _bindWebRTCGateWayManagerEvent: 网关管理器事件绑定 ..."), e.on("error",
                  this._handleErrorEvent.bind(this)), e.on("close", this._handleCloseEvent.bind(this)), e
                .on("login", this._handleLoginEvent.bind(this)), e.on("sdpAnswer", this._handleSdpAnswerEvent
                  .bind(this)), e.on("iceAnswer", this._handleIceAnswerEvent.bind(this)), e.on("userJoin",
                  this._handleUserJoinEvent.bind(this)), e.on("userUpdate", this._handleUserUpdateEvent.bind(
                  this)), e.on("userLeave", this._handleUserLeaveEvent.bind(this)), e.on("clientError",
                  this._handleClentErrorEvent.bind(this)), e.on("detectNetwork", this._handleDetectNetworkEvent
                  .bind(this))
            }
          }, {
            key: "_unbindWebRTCGateWayManagerEvent",
            value: function(e) {
              this.adapterRef.logger.log(
                  "WebRTCGateWayBusiness: _unbindWebRTCGateWayManagerEvent: 网关管理器事件解除绑定 ..."), e.removeListener(
                  "error", this._handleErrorEvent.bind(this)), e.removeListener("close", this._handleCloseEvent
                  .bind(this)), e.removeListener("login", this._handleLoginEvent.bind(this)), e.removeListener(
                  "sdpAnswer", this._handleSdpAnswerEvent.bind(this)), e.removeListener("iceAnswer", this
                  ._handleIceAnswerEvent.bind(this)), e.removeListener("userJoin", this._handleUserJoinEvent
                  .bind(this)), e.removeListener("userUpdate", this._handleUserUpdateEvent.bind(this)), e
                .removeListener("userLeave", this._handleUserLeaveEvent.bind(this)), e.removeListener(
                  "clientError", this._handleClentErrorEvent.bind(this)), e.removeListener(
                  "detectNetwork", this._handleDetectNetworkEvent.bind(this))
            }
          }, {
            key: "_onSignalTimeout",
            value: function() {
              var e = this;
              if (!this.adapterRef.reconnectState.isStoped)
                if (this.adapterRef.reconnectState.startReconnect) this.adapterRef.logger.log(
                  "WebRTCGateWayBusiness: _onSignalTimeout 正在重连中 ...");
                else if (0 == this.adapterRef.reconnectState.count && this.adapterRef.logger.warn(
                  "WebRTCGateWayBusiness: _onSignalTimeout 网络断开了，现在开始重连"), this.adapterRef.reconnectState
                .isReconnect) {
                if (this.adapterRef.reconnectState.count > 6 && this.adapterRef.webrtcGateWayBusiness &&
                  0 == this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager.state.hasLogined) return this
                  .adapterRef.reconnectState.isStoped = !0, this.adapterRef.logger.log(
                    "WebRTCGateWayBusiness: _onSignalTimeout 重连次数(%s)超限，不再重连", this.adapterRef.reconnectState
                    .count), void(this.adapterRef.imInfo && "p2p" === this.adapterRef.imInfo.sessionMode ?
                    (this.adapterRef.instance.emit("hangup", {
                      channelId: this.adapterRef.imInfo && this.adapterRef.imInfo.cid,
                      account: this.adapterRef.instance.getAccount(),
                      desc: "Network error",
                      type: -1
                    }), this.adapterRef.instance.hangup && this.adapterRef.instance.hangup()) : (this.adapterRef
                      .instance.emit("leaveChannel", {
                        channelId: this.adapterRef.imInfo && this.adapterRef.imInfo.cid,
                        account: this.adapterRef.instance.getAccount(),
                        desc: "Network error",
                        type: -1
                      }), this.adapterRef.instance.leaveChannel()));
                this.adapterRef.instance._stopAllDataUpload(), this.adapterRef.reconnectState.count++,
                  this.adapterRef.logger.log("WebRTCGateWayBusiness: _onSignalTimeout 第 %s 次重连中", this.adapterRef
                    .reconnectState.count), this.adapterRef.instance._resetParamNeededByReConnect(), this
                  .adapterRef.reconnectState.startReconnect = !0, this.adapterRef.instance._startSession(),
                  this.adapterRef.reconnectState.connectTimer && (clearTimeout(this.adapterRef.reconnectState
                    .connectTimer), this.adapterRef.reconnectState.connectTimer = null), this.adapterRef.reconnectState
                  .connectTimer = setTimeout(function() {
                    e.adapterRef.logger.log(
                      "WebRTCGateWayBusiness: _onSignalTimeout webrtcGateWayBusiness: ", e.adapterRef
                      .webrtcGateWayBusiness), e.adapterRef.reconnectState.startReconnect = !1;
                    (e.adapterRef.webrtcBusiness && e.adapterRef.webrtcBusiness.selfWebRtcInstance && e
                      .adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection ? "completed" != e.adapterRef
                      .webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState &&
                      "connected" != e.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState :
                      e.adapterRef.webrtcGateWayBusiness && 0 == e.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager
                      .state.hasLogined) ? (e.adapterRef.logger.log(
                      "WebRTCGateWayBusiness: _onSignalTimeout 第 %s 次重连不成功", e.adapterRef.reconnectState
                      .count), e.adapterRef.reconnectState.isReconnect = !0, e._onSignalTimeout()) : (e
                      .adapterRef.reconnectState.isReconnect = !1, e.adapterRef.reconnectState.count =
                      0)
                  }, 2e3 * this.adapterRef.reconnectState.count)
              }
            }
          }, {
            key: "_handleErrorEvent",
            value: function(e) {
              this.adapterRef.logger.log("WebRTCGateWayBusiness: _handleErrorEvent 网关发生错误，event=%o", e)
            }
          }, {
            key: "_handleCloseEvent",
            value: function(e) {
              this.adapterRef.logger.log("WebRTCGateWayBusiness: _handleCloseEvent 网关关闭，event=%o", e),
                this.adapterRef && this.adapterRef.webrtcGateWayBusiness && (this.adapterRef.reconnectState
                  .isReconnect = !0, this._onSignalTimeout())
            }
          }, {
            key: "_handleLoginEvent",
            value: function(e) {
              if (!e.success) return this.adapterRef.logger.warn(
                "WebRTCGateWayBusiness: _handleLoginEvent: 登录失败，断开连接"), void this.emit(u.EVENT_OBJ.gatewayClosed
                .key, u.GateWayErrorCode.GateWayLoginFail);
              this.adapterRef.logger.log("WebRTCGateWayBusiness: _handleLoginEvent 网关登录结果, event:", e),
                this.adapterRef.logger.log("WebRTCGateWayBusiness: _handleLoginEvent: startReconnect: ",
                  this.adapterRef.reconnectState.startReconnect), 1 == this.adapterRef.reconnectState.startReconnect &&
                this.adapterRef.webrtcBusiness && (this.adapterRef.logger.log(
                    "WebRTCGateWayBusiness: _handleLoginEvent: 重连之后，重新推流"), this.adapterRef.reconnectState
                  .startReconnect = !1, this.adapterRef.reconnectState.isReconnect = !1, this.adapterRef.reconnectState
                  .count = 0, this.adapterRef.reconnectState.connectTimer && (clearTimeout(this.adapterRef
                    .reconnectState.connectTimer), this.adapterRef.reconnectState.connectTimer = null),
                  /Firefox/gi.test(navigator.userAgent) ? this._handleReconnect(!0) : this.adapterRef.webrtcBusiness
                  ._startRTCIfHasDeviceOpened())
            }
          }, {
            key: "_handleSdpAnswerEvent",
            value: function(e) {
              this.adapterRef.logger.log("WebRTCGateWayBusiness: _handleSdpAnswerEvent 收到SDP ANSWER (网关）");
              var t = e.success,
                r = e.code,
                i = e.dst_id,
                n = e.type,
                a = e.sdp;
              if (!t) return this.adapterRef.logger.error(
                "WebRTCGateWayBusiness: _handleSdpAnswerEvent: SDP ANSWER 非200，断开"), void this.emit(u
                .EVENT_OBJ.gatewayClosed.key, Object.assign(u.GateWayErrorCode.GateWaySdpAnswerError, {
                  serverCode: r
                }));
              var o = this.adapterRef.webrtcBusiness.getRtcObject(i);
              this.adapterRef.logger.log(
                  "WebRTCGateWayBusiness: _handleSdpAnswerEvent: 当前收到SDP answer 的uid=%s", i), o && o.rtcConnection
                .signalingState && "have-local-offer" == o.rtcConnection.signalingState && o.setRemoteDescription({
                  type: n,
                  sdp: a
                }, "answer")
            }
          }, {
            key: "_handleIceAnswerEvent",
            value: function(e) {
              this.adapterRef.logger.log(
                "WebRTCGateWayBusiness: _handleIceAnswerEvent 收到ICE ANSWER (网关） event=%o", e);
              var t = e.dst_id,
                r = {
                  candidate: e.candidate,
                  sdpMid: e.sdpMid,
                  sdpMLineIndex: e.sdpMLineIndex
                },
                i = this.adapterRef.webrtcBusiness.getRtcObject(t);
              i ? i.addRemoteIceCandidate(r) : this.adapterRef.logger.error(
                "WebRTCGateWayBusiness: _handleIceAnswerEvent 不存在rtc对象")
            }
          }, {
            key: "_handleUserJoinEvent",
            value: function(e) {
              this.adapterRef.logger.log("WebRTCGateWayBusiness:_handleUserJoinEvent 信令网关有人加入通知 event=%o",
                e);
              var t = e.client_id,
                r = {
                  uid: t,
                  account: this.adapterRef.instance._getAccountByUid(t),
                  channelId: this.adapterRef.imInfo.cid
                };
              "NRTC" === u.CONFIG_MAP.SDK_NAME[u.CONFIG_MAP.CURRENT.SDK_TYPE] && "p2p" === this.adapterRef
                .imInfo.sessionMode && this.adapterRef.instance.setStartSessionTime(), this.emit(u.EVENT_OBJ
                  .userJoined.key, r), this.adapterRef.state.isFirstOpenCamera = !0
            }
          }, {
            key: "_handleUserUpdateEvent",
            value: function(e) {
              this.adapterRef.logger.log(
                "WebRTCGateWayBusiness:_handleUserUpdateEvent 信令网关有人更新通知 event=%o", e);
              var t = e.client_id,
                r = e.has_audio,
                i = e.has_video;
              this.emit(u.EVENT_OBJ.userStateUpdated.key, {
                  uid: t,
                  audio: r,
                  video: i
                }), 1 == this.adapterRef.instance._getVideoHelperByUid(t).isJoined ? this.adapterRef.webrtcBusiness
                .doClientUpdate(t, i) : (r || i) && (/Firefox/gi.test(navigator.userAgent) && this.adapterRef
                  .reconnectState ? this._handleReconnect(!1, t) : this.adapterRef.webrtcBusiness.doClientJoin(
                    t))
            }
          }, {
            key: "_handleUserLeaveEvent",
            value: function(e) {
              if (this.adapterRef && this.adapterRef.imInfo) {
                this.adapterRef.logger.log("WebRTCGateWayBusiness:_handleUserLeaveEvent %s 离开了...", e.uid);
                var t = e.uid,
                  r = e.logout_type,
                  i = {
                    uid: e.uid,
                    account: this.adapterRef.instance._getAccountByUid(e.uid),
                    channelId: this.adapterRef.imInfo.cid
                  };
                "normal" === r ? Object.assign(i, u.EVENT_CODE.USER_LEFT_REASON.quit) : Object.assign(i,
                    u.EVENT_CODE.USER_LEFT_REASON.timeout), "p2p" === this.adapterRef.imInfo.sessionMode ?
                  this.emit(u.EVENT_OBJ.hangup.key, i) : this.emit(u.EVENT_OBJ.userLeft.key, i), this.adapterRef
                  .instance.doClearAfterRemoteLeave(t)
              }
            }
          }, {
            key: "_handleClentErrorEvent",
            value: function(e) {
              this.adapterRef.logger.log("WebRTCGateWayBusiness:_handleClientErrorEvent 网关反馈错误: ", e);
              var t = e.error_code;
              509 !== t && 510 !== t && 102 !== t && 103 !== t && 104 !== t && 105 !== t && 106 !== t ||
                (this.emit(u.EVENT_OBJ.error.key, Object.assign(u.GateWayErrorCode.GateWayServerError, {
                  serverCode: t
                })), this.adapterRef.imInfo && "p2p" === this.adapterRef.imInfo.sessionMode ? this.emit(
                  u.EVENT_OBJ.hangup.key, u.EVENT_CODE.USER_LEFT_REASON.timeout) : this.emit(u.EVENT_OBJ
                  .leaveChannel.key, u.EVENT_CODE.USER_LEFT_REASON.timeout))
            }
          }, {
            key: "_handleDetectNetworkEvent",
            value: function(e) {
              if (e) {
                this.adapterRef.logger.log("WebRTCGateWayBusiness: _handleClientErrorEvent 网关反馈网络探测结果: ",
                  JSON.stringify(e, null, " "));
                var t = e.uid,
                  r = e.content;
                this.detectNetworkResult || (this.detectNetworkResult = {}), this.detectNetworkResult.user_ip =
                  r.params.ip, t == r.params.dst_id ? (this.detectNetworkResult.upload_network_status ||
                    (this.detectNetworkResult.upload_network_status = {}), this.detectNetworkResult.upload_network_status
                    .up_rtt = parseInt(r.params.rtt), this.detectNetworkResult.upload_network_status.up_loss =
                    parseInt(r.params.loss)) : (this.detectNetworkResult.download_network_status || (this
                      .detectNetworkResult.download_network_status = {}), this.detectNetworkResult.download_network_status
                    .down_rtt = parseInt(r.params.rtt), this.detectNetworkResult.download_network_status.down_loss =
                    parseInt(r.params.loss))
              }
            }
          }, {
            key: "_handleReconnect",
            value: function(e) {
              var t = this,
                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
              this.adapterRef.logger.log("WebRTCGateWayBusiness: _handleReconnect isPush: ", e), this.adapterRef
                .logger.log("WebRTCGateWayBusiness: _handleReconnect clientId: ", r);
              try {
                if (e) this.adapterRef.webrtcBusiness._startRTCIfHasDeviceOpened();
                else {
                  if (!r) return void this.adapterRef.logger.log(
                    "WebRTCGateWayBusiness: _handleReconnect: invalid argument");
                  this.adapterRef.webrtcBusiness.doClientJoin(r)
                }
              } catch (i) {
                e ? this.adapterRef.logger.log("WebRTCGateWayBusiness: _handleReconnect 重连之后，重新推流 err: ",
                  i) : this.adapterRef.logger.log(
                  "WebRTCGateWayBusiness: _handleReconnect 重连之后，重新拉流 err: ", i), setTimeout(function() {
                  t._handleReconnect(e, r)
                }, 1e3)
              }
            }
          }, {
            key: "_transform2WebRTCGateWayContext",
            value: function(e) {
              var t = Object.assign({}, e),
                r = new s.WebRTCGateWayContext({
                  uid: t.uid,
                  cid: t.cid,
                  hasAudio: !1,
                  hasVideo: !1,
                  netDetect: t.netDetect,
                  session_mode: t.sessionMode,
                  params: {
                    content: "",
                    dst_id: t.uid,
                    user_token_type: 0,
                    token: t.token,
                    user_type: this.adapterRef.instance.SDK_TYPE === u.CONFIG_MAP.SDK_TYPE.NRTC ? 3 : 2,
                    version: 1,
                    is_multi_peerconnection: !0,
                    sdk_version: p.info.version,
                    streamSetting: {
                      video: t.videoConfig
                    }
                  },
                  browser: {
                    name: d.default.name,
                    version: d.default.version
                  },
                  bypass_rtmp: {
                    is_host: !!t.sessionConfig.rtmpUrl,
                    support_bypass_rtmp: t.sessionConfig.liveEnable || !1,
                    support_bypass_rtmp_record: t.sessionConfig.rtmpRecord || !1,
                    bypass_rtmp_url: t.sessionConfig.rtmpUrl || "",
                    layout: t.sessionConfig.layout || "",
                    participant_mode: "M-" + t.sessionConfig.splitMode
                  },
                  record: {
                    support_audio_record: t.sessionConfig.recordAudio || !1,
                    support_video_record: t.sessionConfig.recordVideo || !1,
                    single_record_in_meeting: t.sessionConfig.singleRecord || !1,
                    is_host_speaker: t.sessionConfig.isHostSpeaker || !1,
                    record_type: t.sessionConfig.recordType || "0"
                  }
                });
              return this.adapterRef.logger.log("webrtcGateWayContext: ", r), r
            }
          }]), t
        }(c.AbstractBusiness);
      t.WebRTCGateWayBusiness = f
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(338);
      Object.defineProperty(t, "WebRTCGateWayBusiness", {
        enumerable: !0,
        get: function() {
          return i.WebRTCGateWayBusiness
        }
      });
      var n = r(337);
      Object.defineProperty(t, "DeviceBusiness", {
        enumerable: !0,
        get: function() {
          return n.DeviceBusiness
        }
      });
      var a = r(336);
      Object.defineProperty(t, "WebRTCBusiness", {
        enumerable: !0,
        get: function() {
          return a.WebRTCBusiness
        }
      });
      var o = r(320);
      Object.defineProperty(t, "IMBusiness", {
        enumerable: !0,
        get: function() {
          return o.IMBusiness
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = l(r(1)),
        n = l(r(5)),
        a = l(r(4)),
        o = l(r(3)),
        s = r(10),
        c = r(11),
        d = r(107),
        u = r(114);

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r._reset(), r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.appKey = r.adapterRef.instance
            ._params.appkey || r.adapterRef.nim && r.adapterRef.nim.options && r.adapterRef.nim.options.appKey ||
            r.adapterRef.imInfo.appkey, r.statsNew = new d.RtcStatsNew({
              webrtcBusiness: r.adapterRef.webrtcBusiness,
              interval: 1e3
            }), r.statsNew.on("stats", function(e, t) {
              t % 2 == 0 && r._uploadRawDataStats(e), r._uploadFormatDataStats(!1, e, t)
            }), r.formatDataFromStats = new u.FormatDataFromStats({
              appkey: r.appKey
            }), r.rawDataFromStats = new u.RawDataFromStats({
              appkey: r.appKey
            }), r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.statsNew = null, this.formatDataFromStats = null, this.rawDataFromStats = null
          }
        }, {
          key: "stopStats",
          value: function() {
            this.statsNew && this.statsNew.stop(), this.formatDataFromStats && this.formatDataFromStats
              .stop(), this.rawDataFromStats && this.rawDataFromStats.stop()
          }
        }, {
          key: "startStats",
          value: function() {
            this.statsNew.start(), this._uploadRawDataStatsStart(), this._uploadFormatDataStatsStart()
          }
        }, {
          key: "_uploadRawDataStatsStart",
          value: function() {
            c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.rawDataFromStats && this.rawDataFromStats
              .start({
                info: this.adapterRef.imInfo,
                cid: this.adapterRef.imInfo.cid,
                uid: this.adapterRef.imInfo.uid
              })
          }
        }, {
          key: "_uploadRawDataStats",
          value: function(e) {
            c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.rawDataFromStats && this.rawDataFromStats
              .update(e)
          }
        }, {
          key: "_uploadFormatDataStatsStart",
          value: function() {
            this.appKey ? c.CONFIG_MAP.STATS_FUN[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.formatDataFromStats &&
              this.formatDataFromStats.start({
                controller: this,
                imInfo: this.adapterRef.imInfo,
                sessionConfig: this.adapterRef.imInfo.sessionConfig,
                videoConfig: this.adapterRef.imInfo.videoConfig
              }) : this.adapterRef.logger.warn(
                "DataReportHelper: _uploadFormatDataStatsStart: 不存在appkey， 本次format debug数据未能上报")
          }
        }, {
          key: "_uploadFormatDataStats",
          value: function(e, t, r) {
            if (c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE])
              if (this.appKey) {
                if (this.formatDataFromStats)
                  if ("volume" !== e) {
                    if (this.adapterRef && this.adapterRef.imInfo) {
                      var i = this.adapterRef.instance._getAudioHelperByUid(this.adapterRef.imInfo.uid);
                      i && i.webAudio && this.formatDataFromStats.updateLocalVolumn(i.webAudio.getVolumeData())
                    }
                    this.formatDataFromStats.update(t, r)
                  } else this.formatDataFromStats.updateLocalVolumn(t)
              } else this.adapterRef.logger.warn(
                "DataReportHelper: _uploadFormatDataStats: 不存在appkey， 本次format debug数据未能上报")
          }
        }, {
          key: "uploadFormatDataStatsOnce",
          value: function(e) {
            c.CONFIG_MAP.STATS_RTC[c.CONFIG_MAP.CURRENT.SDK_TYPE] && this.formatDataFromStats && this.formatDataFromStats
              .updateOnce({
                imInfo: e,
                sessionConfig: this.adapterRef.imInfo.sessionConfig
              })
          }
        }]), t
      }(s.EventEmitter);
      t.default = p, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = u(r(1)),
        n = u(r(5)),
        a = u(r(4)),
        o = u(r(3)),
        s = r(10),
        c = r(114),
        d = r(11);

      function u(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var l = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r.info = {}, r.logData = new c.LogData, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "uploadData",
          value: function(e, t) {
            if (d.CONFIG_MAP.STATS_FUN[d.CONFIG_MAP.CURRENT.SDK_TYPE])
              if ("sessionInfo" == e && t && this.info) 2 == d.CONFIG_MAP.CURRENT.SDK_TYPE ? this.info.sessionInfo = {
                  role: t.role,
                  uid: t.uid,
                  cid: t.cid,
                  sessionMode: t.sessionMode,
                  appkey: "",
                  token: t.serverMap && t.serverMap.token,
                  turnToken: "",
                  wssArr: t.serverMap && t.serverMap.webrtcarray,
                  relayaddrs: null,
                  relaytoken: null,
                  liveEnable: t.sessionConfig && t.sessionConfig.liveEnable,
                  rtmpRecord: t.sessionConfig && t.sessionConfig.rtmpRecord,
                  sessionConfig: {
                    maxVideoQuality: t.sessionConfig.maxVideoQuality,
                    videoQuality: t.sessionConfig.videoQuality,
                    videoFrameRate: t.sessionConfig.videoFrameRate,
                    highAudio: t.sessionConfig.highAudio,
                    liveEnable: t.sessionConfig.liveEnable,
                    recordVideo: t.sessionConfig.recordVideo,
                    recordAudio: t.sessionConfig.recordAudio,
                    singleRecord: t.sessionConfig.singleRecord,
                    rtmpUrl: t.sessionConfig.rtmpUrl,
                    layout: t.sessionConfig.layout,
                    splitMode: t.sessionConfig.splitMode,
                    isHostSpeaker: t.sessionConfig.isHostSpeaker,
                    recordType: t.sessionConfig.recordType,
                    roomServerUrl: t.sessionConfig.roomServerUrl,
                    rtmpRecord: t.sessionConfig.rtmpRecord
                  },
                  videoConfig: t.videoConfig
                } : this.info.sessionInfo = t, this.info.account = t.accountUidMap ? Object.keys(t.accountUidMap)[
                  0] : "", this.info.uid = t.uid || t.accountUidMap[this.info.account], this.info.cid =
                t.cid || t.channelId;
              else if ("deviceList" == e) this.info.deviceList || (this.info.deviceList = {}), this.info
              .deviceList[Object.keys(t)[0]] = Object.values(t)[0];
            else if ("mediaConstraint" == e) this.info.mediaConstraint || (this.info.mediaConstraint = {},
                this.info.mediaConstraint.audio = [], this.info.mediaConstraint.video = []), t.audio &&
              this.info.mediaConstraint.audio.push(t.audio), t.video && this.info.mediaConstraint.video
              .push(t.video);
            else if ("mediaPlay" == e) this.info.mediaPlay || (this.info.mediaPlay = {}, this.info.mediaPlay
              .audio = [], this.info.mediaPlay.video = []), t.audio && this.info.mediaPlay.audio.push(
              t.audio), t.video && this.info.mediaPlay.video.push(t.video);
            else if ("peerConnections" == e) this.info.peerConnections || (this.info.peerConnections = []),
              t.localSdp = "", t.remoteSdp = "", this.info.peerConnections.push(t);
            else if ("send" == e && this.info) return this.logData.send(this.info), void(this.info =
              null)
          }
        }, {
          key: "trimSdp",
          value: function(e) {
            if (e) {
              var t = "",
                r = e.match(/a=rtpmap:(\d+) opus/g)[0].match(/a=rtpmap:(\d+)/)[1],
                i = e.match(/a=rtpmap:(\d+) H264/g)[0].match(/a=rtpmap:(\d+)/)[1],
                n = e.match(/a=msid-semantic:([0-9- \/A-Za-z:]*)/g),
                a = e.match(/a=candidate:([0-9- \/A-Za-z:]*)/g),
                o = e.match(/a=extmap:([0-9- \.\/A-Za-z:]*)/g),
                s = e.match(/a=rtpmap:([0-9- \.\/A-Za-z:]*)/g),
                c = e.match(/a=rtcp-fb:([0-9- \.\/A-Za-z:]*)/g),
                d = e.match(/a=fmtp:([0-9- =;\.\/A-Za-z:]*)/g),
                u = e.match(/a=ssrc:(\d)+/g);
              return t += this.handleList(n) + this.handleList(a) + this.handleList(o) + this.handleList(
                s, r, i) + this.handleList(c, r, i) + this.handleList(d, r, i) + this.handleList(u)
            }
          }
        }, {
          key: "handleList",
          value: function(e, t, r) {
            if (!e || 0 == e.length) return "";
            if (e && e.length && !t) return e.join("\n");
            for (var i = 0; i < e.length; i++) - 1 == e[i].indexOf(t) && -1 == e[i].indexOf(r) && (e.splice(
              i, 1), i--);
            return e.length ? e.join("\n") : ""
          }
        }]), t
      }(s.EventEmitter);
      t.default = l, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = u(r(1)),
        n = u(r(5)),
        a = u(r(4)),
        o = u(r(3)),
        s = r(10),
        c = r(114),
        d = r(11);

      function u(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var l = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.adapterRef.instance._params.appkey ? r.appkey =
            r.adapterRef.instance._params.appkey : r.appkey = r.adapterRef.nim && r.adapterRef.nim.options && r
            .adapterRef.nim.options.appKey || r.adapterRef.imInfo.appkey, r.dataApi = new c.ApiInvokeData({
              appkey: r.appkey,
              platform: e.platform
            }), r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "uploadDataApi",
          value: function(e, t) {
            d.CONFIG_MAP.STATS_FUN[d.CONFIG_MAP.CURRENT.SDK_TYPE] && this.appkey && ("start" === e && (
              t.appkey = this.appkey), this.dataApi[e] && this.dataApi[e](t))
          }
        }]), t
      }(s.EventEmitter);
      t.default = l, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(342);
      Object.defineProperty(t, "ApiReportHelper", {
        enumerable: !0,
        get: function() {
          return o(i).default
        }
      });
      var n = r(341);
      Object.defineProperty(t, "LogReportHelper", {
        enumerable: !0,
        get: function() {
          return o(n).default
        }
      });
      var a = r(340);

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "StatsReportHelper", {
        enumerable: !0,
        get: function() {
          return o(a).default
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = s(r(1)),
        n = s(r(5)),
        a = s(r(4)),
        o = s(r(3));

      function s(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var c = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return r._reset(), r.uid = e.uid || 0, r.adapterRef = e.adapterRef, r._initNode(), r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.videoContainerDom = null, this.videoDom = null, this.uid = null, this.containerSize = {
              width: 0,
              height: 0
            }
          }
        }, {
          key: "_initNode",
          value: function() {
            var e = this._initVideoContainer();
            this.videoContainerDom = e;
            var t = this._initVideo();
            this.videoDom = t, e.appendChild(t)
          }
        }, {
          key: "_initVideoContainer",
          value: function() {
            var e = document.createElement("div");
            return e.style.overflow = "hidden", e.style.position = "relative", e.style.width = this.containerSize
              .width + "px", e.style.height = this.containerSize.height + "px", e.style.display =
              "inline-block", e
          }
        }, {
          key: "_initVideo",
          value: function() {
            var e = document.createElement("video");
            return e.style.position = "absolute", e.style.left = "50%", e.style.top = "50%", e.style.transform =
              "translate(-50%,-50%)", e.setAttribute("x-webkit-airplay", "x-webkit-airplay"), e.setAttribute(
                "playsinline", "playsinline"), e.setAttribute("webkit-playsinline",
                "webkit-playsinline"), e.preload = "auto", e.dataset.uid = this.uid, e.autoplay =
              "autoplay", e.muted = !0, e
          }
        }, {
          key: "resize",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
              width: 100,
              height: 100,
              cut: !0
            };
            if (e.cut && this.adapterRef.apiReportHelper && this.adapterRef.apiReportHelper.uploadDataApi(
                "update", {
                  key: "video_crop"
                }), this.containerSize = e, this.videoContainerDom.style.width = e.width + "px", this.videoContainerDom
              .style.height = e.height + "px", !e.cut) return this.videoDom.style.height = "100%", void(
              this.videoDom.style.width = "100%");
            this.videoDom.videoWidth / this.videoDom.videoHeight > e.width / e.height ? (this.videoDom.style
              .width = "auto", this.videoDom.style.height = "100%") : (this.videoDom.style.width =
              "100%", this.videoDom.style.height = "auto")
          }
        }, {
          key: "destory",
          value: function() {
            this.videoContainerDom && this.videoDom && this.videoContainerDom.removeChild(this.videoDom),
              this.videoDom && !this.videoDom.paused && this.videoDom.pause(), this._reset()
          }
        }]), t
      }(r(10).EventEmitter);
      t.default = c, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.VideoHelper = void 0;
      var i = h(r(1)),
        n = h(r(5)),
        a = h(r(4)),
        o = h(r(3)),
        s = r(10),
        c = r(24),
        d = f(r(110)),
        u = f(r(181)),
        l = h(r(344)),
        p = r(11);

      function f(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t.default = e, t
      }

      function h(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var m = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return r._reset(), r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.uid = e.uid, r.poster = e.poster ||
            "", r.videoContainer = e.videoContainer || document.body, r.videoDomHelper = null, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "setUid",
          value: function(e) {
            this.uid = e
          }
        }, {
          key: "_reset",
          value: function() {
            this.sdkRef = null, this.adapterRef = null, this._resetStateParam(), this._resetMixParam(),
              this.mcuConfig = {
                videoSecWinType: p.DEVICE_TYPE.DEVICE_TYPE_VIDEO,
                coordinatesX: 0,
                coordinatesY: 0
              }
          }
        }, {
          key: "_resetStateParam",
          value: function() {
            this.isPlaying = !1, this.system = c.RtcSupport.checkVersion(), this.uid = null, this.poster =
              "", this.rtc = null, this.constraint = {}, this.videoContainer = null, this.videoDomHelper &&
              this.videoDomHelper.destory(), this.videoDomHelper = null, this.webAudio = null, this.localVideoStream =
              null, this.remoteVideoStream = null, this.pushVideoStream = null, this.videoViewConfig = {}
          }
        }, {
          key: "_resetMixParam",
          value: function() {
            this.mcuDom && (clearInterval(this.mcuDom.canvasTimer), this.mcuDom.smallDom && (this.mcuDom
                .smallDom.onresize = function() {}, this.mcuDom.smallDom.src = ""), this.mcuDom.largeDom &&
              (this.mcuDom.largeDom.onresize = function() {}, this.mcuDom.largeDom.src = "")), this.mcuDom = {
              largeDom: null,
              smallDom: null,
              canvas: null,
              canvasTimer: null
            }
          }
        }, {
          key: "startPushLocalVideoStream",
          value: function() {
            var e = this;
            return Promise.resolve().then(function() {
              return e.localVideoStream ? (e.pushVideoStream = e.localVideoStream, e.adapterRef.instance
                ._judgeSendSdpOfferOrUpdate()) : Promise.reject(p.VideoErrorCode.VideoStreamFetchError)
            })
          }
        }, {
          key: "stopPushLocalVideoStream",
          value: function() {
            var e = this;
            return Promise.resolve().then(function() {
              return e.pushVideoStream = null, e.adapterRef.instance._updateRtc(!0)
            })
          }
        }, {
          key: "setIsRemote",
          value: function(e) {
            return this.isRemote = e, this
          }
        }, {
          key: "setRemoteVideoStream",
          value: function(e) {
            this.remoteVideoStream = e, this.adapterRef.logger.log(
              "更新远端stream: %s, 并且清除之前的video dom, uid: %s", e.id, this.uid), this.hide()
          }
        }, {
          key: "setRTC",
          value: function(e) {
            this.rtc = e
          }
        }, {
          key: "setVideoContainer",
          value: function(e) {
            e ? (this.videoDomHelper || this._createVideoDomHelper(), this.videoContainer = e, this._mountVideoToDom(),
              this.play()) : this.adapterRef.logger.log("VideoHelper: setVideoContainer: 不存在dom")
          }
        }, {
          key: "setVideoViewConfig",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object.assign(this.videoViewConfig, e), this.videoDomHelper && this.videoDomHelper.resize({
              width: this.videoViewConfig.width || 0,
              height: this.videoViewConfig.height || 0,
              cut: this.videoViewConfig.cut || !1
            })
          }
        }, {
          key: "updateStream",
          value: function(e) {
            var t = null;
            this.isRemote ? (t = this.remoteVideoStream, this.remoteVideoStream = e) : (t = this.localVideoStream,
              this.localVideoStream = e), u.removeTrackFromMediaStream(t)
          }
        }, {
          key: "composeTrack",
          value: function(e, t) {
            if (e && e !== this.adapterRef.imInfo.uid)
              if (this.remoteVideoStream && this.remoteVideoStream.getVideoTracks && this.remoteVideoStream
                .getVideoTracks() > 0 && this.remoteVideoStream.getVideoTracks()[0].id == t.id) this.adapterRef
                .logger.log("VideoHelper:_composeTrack 已经添加过该轨道");
              else if (this.adapterRef.imInfo.netDetect) this.adapterRef.logger.log(
              "VideoHelper:_composeTrack 网络探测直接忽略");
            else {
              this.adapterRef.logger.log("VideoHelper:_composeTrack");
              var r = new MediaStream;
              r.addTrack(t), this.setRemoteVideoStream(r), this.adapterRef.logger.log(
                  "VideoHelper:_composeTrack: " + e + ", " + t.id + ", " + t.readyState), this.adapterRef
                .logger.log("VideoHelper: composeTrack: remoteVideoStream: , " + this.remoteVideoStream
                  .id), this.delayVideoShow(e)
            } else this.adapterRef.logger.log("VideoHelper:_composeTrack 自己的轨道直接忽略")
          }
        }, {
          key: "delayVideoShow",
          value: function(e) {
            var t = this,
              r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            this.adapterRef.logger.log("VideoHelper:delayVideoShow uid=%o, has_video=%o", e, r),
              setTimeout(function() {
                t._doDelayVideoShow(e, r)
              }, 100)
          }
        }, {
          key: "_doDelayVideoShow",
          value: function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            if (e && e !== this.adapterRef.imInfo.uid)
              if (this.remoteVideoStream) {
                if (this.adapterRef.logger.log("VideoHelper:_doDelayVideoShow uid=%s, has_video=%s", e,
                    t), !this.adapterRef.instance._isFirefox()) {
                  var r = {};
                  t && (r = this.checkRemoteTrack(e, this.rtc.sdpAnswer.sdp)), t = r.video
                }!0 === t ? (this.adapterRef.logger.log("VideoHelper:_doDelayVideoShow: show..."), this
                  .show()) : (this.adapterRef.logger.log("VideoHelper:_doDelayVideoShow: hide..."),
                  this.hide())
              } else this.adapterRef.logger.log("VideoHelper:_doDelayVideoShow 不存在的远程视频流， 不显示");
            else this.adapterRef.logger.log("VideoHelper:_doDelayVideoShow 自己直接返回,不显示")
          }
        }, {
          key: "checkRemoteTrack",
          value: function(e, t, r) {
            if (!this.remoteVideoStream) return this.adapterRef.logger.log(
              "VideoHelper:checkRemoteTrack: 不存在远端的对象..."), {};
            if (!this.remoteVideoStream || !this.rtc) return this.adapterRef.logger.log(
              "VideoHelper:checkRemoteTrack: 远程视频流均不存在，或者流程管理器不存在"), {};
            var i = this.remoteVideoStream.getVideoTracks()[0];
            if (i && "ended" == i.readyState && r && r.getReceivers && r.getReceivers().length > 1) {
              i = r.getReceivers()[1].track;
              var n = new MediaStream;
              n.addTrack(i), this.setRemoteVideoStream(n), this.adapterRef.logger.log(
                "VideoHelper:checkRemoteTrack new videoTrack ----\x3e %o", i)
            } else this.adapterRef.logger.log("VideoHelper:checkRemoteTrack videoTrack ----\x3e %o", i);
            var a = this.rtc.checkMediaStatus({
              videoTrack: i,
              sdp: t,
              uid: e
            });
            return (this.adapterRef.instance._isSafari() || this.adapterRef.instance._isChrome72()) &&
              (a.video = !0), a.video = this.rtc.checkMeidaExistent({
                sdp: t,
                type: "video"
              }), this.adapterRef.logger.log("result: ", a.video), a.video || (this.adapterRef.logger.warn(
                "远程视频不存在了，则隐藏节点"), this.hide()), a
          }
        }, {
          key: "handleStreamFromMp4File",
          value: function(e) {
            if (e && e.getVideoTracks().length) {
              var t = new MediaStream,
                r = e.getVideoTracks()[0];
              this.adapterRef.logger.log("VideoHelper: handleStreamFromMp4File: 处理制造的stream track: ", r),
                t.addTrack(e.getVideoTracks()[0]), this.pushVideoStream = this.localVideoStream = t,
                this.adapterRef.logger.log(
                  "VideoHelper: handleStreamFromMp4File: new localVideoStream ", this.localVideoStream)
            } else this.adapterRef.logger.warn(
              "VideoHelper: handleStreamFromMp4File: Invalid Parameter")
          }
        }, {
          key: "getCameraStream",
          value: function(e) {
            var t = this;
            return this.clearMCUState(), new Promise(function(r, i) {
              t._getCameraStream(e, r, i)
            })
          }
        }, {
          key: "getScreenStreamPlugin",
          value: function(e, t, r) {
            return this.clearMCUState(), this._getScreenStreamPlugin(e, t, r)
          }
        }, {
          key: "getScreenStreamNative",
          value: function(e, t, r) {
            return this.clearMCUState(), this._getScreenStreamNative(e, t, r)
          }
        }, {
          key: "enableDevice",
          value: function(e) {
            this.adapterRef.logger.log("VideoHelper: enableDevice: 恢复设备");
            var t = [];
            return this.localVideoStream && (t = this.localVideoStream.getTracks()), t.map(function(e) {
              e.enabled = !0
            }), Promise.resolve()
          }
        }, {
          key: "removeTrackFromMediaStream",
          value: function(e) {
            u.removeTrackFromMediaStream(e)
          }
        }, {
          key: "destroy",
          value: function(e) {
            this.adapterRef.logger.log("VideoHelper:destroy 移除本地远程流"), this.hide(), e && u.removeTrackFromMediaStream(
              e), e || (this.localScreenStream && (this.adapterRef.logger.log(
                "VideoHelper:destroy 移除本地screen流:", this.localScreenStream), u.removeTrackFromMediaStream(
                this.localScreenStream), this.localScreenStream = null), this.localCameraStream && (
                this.adapterRef.logger.log("VideoHelper:destroy 移除本地camera流:", this.localCameraStream),
                u.removeTrackFromMediaStream(this.localCameraStream), this.localCameraStream = null),
              this._resetStateParam())
          }
        }, {
          key: "_getCameraStream",
          value: function(e, t, r) {
            var i = this,
              n = {};
            n.deviceId = e && e.deviceId;
            var a = this.adapterRef.imInfo.clientConfig && JSON.parse(this.adapterRef.imInfo.clientConfig) ||
              {},
              o = this.sdkRef.getVideoSessionConfig({
                maxQuality: a.quality_level_limit || this.adapterRef.imInfo.sessionConfig.maxVideoQuality,
                quality: this.adapterRef.imInfo.sessionConfig.videoQuality,
                frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
              });
            return n = Object.assign(n, o), this.constraint.video = n, this.adapterRef.imInfo.netDetect &&
              (this.constraint = {
                audio: !1,
                video: {
                  width: 1280,
                  height: 720,
                  frameRate: 30,
                  deviceId: {
                    exact: e.deviceId
                  }
                }
              }), u.getMediaStream(this.constraint).then(function(e) {
                return i.adapterRef.logger.log("VideoHelper:_getCameraStream: 获取到视频流", e.id), i.localCameraStream &&
                  i.destroy(i.localCameraStream), i.localScreenStream && !i.adapterRef.mixVideoConf &&
                  (i.destroy(i.localScreenStream), i.localScreenStream = null), i.localCameraStream =
                  e, i.adapterRef.mixVideoConf && i.adapterRef.mixVideoConf.videoCompressSize && i.localScreenStream ?
                  i.startMCU() : (i.localVideoStream = e, Promise.resolve())
              }).then(function() {
                if (i.adapterRef.logReportHelper) {
                  var r = {};
                  Object.assign(r, i.constraint), r.streamId = i.localVideoStream.id, i.adapterRef.logReportHelper
                    .uploadData("mediaConstraint", {
                      video: r
                    }), i.adapterRef.deviceBusiness && i.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache &&
                    i.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache.video ? i.adapterRef.logReportHelper
                    .uploadData("deviceList", {
                      video: i.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache.video
                    }) : i.adapterRef.deviceApi.getDevicesOfType().then(function(e) {
                      i.adapterRef.logReportHelper.uploadData("deviceList", {
                        video: e.video
                      })
                    })
                }
                t({
                  device: e,
                  stream: i.localVideoStream
                })
              }).catch(function(e) {
                i.adapterRef.logger.log("VideoHelper:_getCameraStream: 获取视频流失败: ", e), e || (e = p.VideoErrorCode
                  .VideoStreamFetchError), r(e)
              })
          }
        }, {
          key: "_getScreenStreamPlugin",
          value: function(e, t, r) {
            var i = this,
              n = this.adapterRef.chromeId;
            if (!n) return this.adapterRef.logger.warn(
              "VideoHelper: _getScreenStreamPlugin: chrome屏幕共享id未设置"), t("chrome屏幕共享id未设置");
            var a = {
              sources: ["window", "screen", "tab"]
            };
            return new Promise(function() {
              chrome.runtime.sendMessage(n, a, {}, function(e) {
                if (i.adapterRef.logger.log("VideoHelper: _getScreenStreamPlugin: chrome 屏幕共享",
                    e), e && "success" === e.type) {
                  var n = {
                    video: {
                      mandatory: {
                        maxWidth: 1280,
                        maxHeight: 720,
                        maxFrameRate: 5,
                        minFrameRate: 1,
                        chromeMediaSource: "desktop",
                        chromeMediaSourceId: e.streamId
                      }
                    }
                  };
                  return i.adapterRef.logger.log("VideoHelper:_getScreenStreamPlugin"), u.getMediaStream(
                    n).then(function(e) {
                    return i.adapterRef.logger.log(
                        "VideoHelper:_getScreenStreamPlugin: 获取到演示流:", e.id), i.localScreenStream &&
                      i.destroy(i.localScreenStream), i.localCameraStream && !i.adapterRef.mixVideoConf &&
                      (i.destroy(i.localCameraStream), i.localCameraStream = null), i.localScreenStream =
                      e, i.adapterRef.mixVideoConf && i.adapterRef.mixVideoConf.videoCompressSize &&
                      i.localCameraStream ? i.startMCU() : (i.localVideoStream = e, Promise
                        .resolve())
                  }).then(function() {
                    t({
                      stream: i.localVideoStream
                    })
                  }).catch(function(e) {
                    var t = Object.assign({
                      event: e
                    }, p.VideoErrorCode.VideoStreamFetchError);
                    return Promise.reject(t)
                  })
                }
                e ? (i.adapterRef.logger.error("VideoHelper:_getScreenStreamPlugin: 获取流失败"), r(
                  p.VideoErrorCode.VideoStreamFetchError)) : (i.adapterRef.logger.error(
                  "VideoHelper:_getScreenStreamPlugin: 未安装插件"), r(p.DeviceErrorCode.DevicePluginNotInstalled))
              })
            })
          }
        }, {
          key: "_getScreenStreamNative",
          value: function(e, t, r) {
            var i = this;
            return u.getScreenStream({
              video: !0
            }).then(function(e) {
              return i.adapterRef.logger.log("VideoHelper:_getScreenStreamNative: 获取到演示流:", e.id),
                i.localScreenStream && i.destroy(i.localScreenStream), i.localCameraStream && !i.adapterRef
                .mixVideoConf && (i.destroy(i.localCameraStream), i.localCameraStream = null), i.localScreenStream =
                e, i.adapterRef.mixVideoConf && i.adapterRef.mixVideoConf.videoCompressSize && i.localCameraStream ?
                i.startMCU() : (i.localVideoStream = e, Promise.resolve())
            }).then(function() {
              t({
                stream: i.localVideoStream
              })
            }).catch(function(e) {
              e || (e = p.VideoErrorCode.VideoStreamFetchError), r(e)
            })
          }
        }, {
          key: "setMixCoordinates",
          value: function() {
            if (this.adapterRef.logger.log(
                "VideoHelper:setMixCoordinates: mcuDom.smallDom.videoWidth: ", this.mcuDom.smallDom.videoWidth
              ), this.mcuConfig.coordinatesX = 0, this.mcuConfig.coordinatesY = 0, this.adapterRef &&
              this.adapterRef.mixVideoConf && this.adapterRef.mixVideoConf.videoLayout) switch (this.adapterRef
              .mixVideoConf.videoLayout) {
              case p.MIX_VIDEO_MODE.LAYOUT_TOP_LEFT:
                break;
              case p.MIX_VIDEO_MODE.LAYOUT_BOTTOM_LEFT:
                this.mcuConfig.coordinatesY = this.mcuDom.canvas.height - this.mcuDom.smallDom.videoHeight,
                  this.adapterRef.logger.log("VideoHelper:setMixCoordinates: 左下角 coordinatesY: ",
                    this.coordinatesY);
                break;
              case p.MIX_VIDEO_MODE.LAYOUT_BOTTOM_RIGHT:
                this.mcuConfig.coordinatesX = this.mcuDom.canvas.width - this.mcuDom.smallDom.videoWidth,
                  this.mcuConfig.coordinatesY = this.mcuDom.canvas.height - this.mcuDom.smallDom.videoHeight,
                  this.adapterRef.logger.log("VideoHelper:setMixCoordinates: 右下角 coordinatesX: ",
                    this.mcuConfig.coordinatesX), this.adapterRef.logger.log(
                    "VideoHelper:setMixCoordinates: 右下角 coordinatesY: ", this.mcuConfig.coordinatesY);
                break;
              case p.MIX_VIDEO_MODE.LAYOUT_TOP_RIGHT:
              default:
                this.mcuConfig.coordinatesX = this.mcuDom.canvas.width - this.mcuDom.smallDom.videoWidth,
                  this.adapterRef.logger.log("右上角 coordinatesY: ", this.coordinatesY)
            } else this.mcuConfig.coordinatesX = this.mcuDom.canvas.width - this.mcuDom.smallDom.videoWidth;
            this.adapterRef.logger.log("VideoHelper:setMixCoordinates: coordinatesX: ", this.mcuConfig.coordinatesX),
              this.adapterRef.logger.log("VideoHelper:setMixCoordinates: coordinatesY: ", this.mcuConfig
                .coordinatesY)
          }
        }, {
          key: "setMixConf",
          value: function() {
            var e = this;
            if (!(this.mcuDom.canvasTimer && this.mcuDom.smallDom && this.mcuDom.largeDom && this.localCameraStream &&
                this.localScreenStream)) return this.adapterRef.logger.log(
              "VideoHelper:setMixConf: 当前没有在进行视频和演示的混流，先记录配置信息，后续使用"), Promise.resolve();
            if (this.mcuConfig.videoSecWinType && this.mcuConfig.videoSecWinType !== this.adapterRef.mixVideoConf
              .videoSecWinType) return this._setupMCUStream().then(function(t) {
              var r = t.largeStream,
                i = t.smallStream;
              e.mcuConfig.videoSecWinType = e.adapterRef.mixVideoConf.videoSecWinType;
              var n = null,
                a = null,
                o = e.sdkRef.getVideoSessionConfig({
                  quality: e.adapterRef.imInfo.videoQuality,
                  frameRate: e.adapterRef.imInfo.sessionConfig.videoFrameRate
                });
              return e.mcuConfig.videoSecWinType === p.DEVICE_TYPE.DEVICE_TYPE_VIDEO ? (n = {
                width: 1280,
                height: 720
              }, a = {
                width: 1280 * e.adapterRef.mixVideoConf.videoMixRatio,
                height: 1280 * e.adapterRef.mixVideoConf.videoMixRatio * o.height / o.width
              }) : (n = o, a = {
                width: o.width * e.adapterRef.mixVideoConf.videoMixRatio,
                height: o.width * e.adapterRef.mixVideoConf.videoMixRatio * 720 / 1080
              }), e.mcuDom.canvas.width = n.width, e.mcuDom.canvas.height = n.height, Promise.all(
                [e._applyStreamConstrait(r, n), e._applyStreamConstrait(i, a)])
            }).then(function() {
              e.mcuDom.smallDom && (e.mcuDom.smallDom.onresize = function() {
                e.setMixCoordinates()
              })
            });
            var t = this._getMCUStreamConstrait();
            return t.width === this.mcuDom.smallDom.videoWidth ? this.setMixCoordinates() : (this._applyStreamConstrait(
              this.mcuDom.smallDom.srcObject, t), this.mcuDom.smallDom && (this.mcuDom.smallDom.onresize =
              function() {
                e.setMixCoordinates()
              })), Promise.resolve()
          }
        }, {
          key: "startMCU",
          value: function() {
            var e = this;
            return this.localCameraStream && this.localScreenStream ? this._setupMCUStream().then(
              function(t) {
                var r = t.smallStream,
                  i = (t.largeStream, e._getMCUStreamConstrait());
                return Promise.all([e._applyStreamConstrait(r, i)])
              }).then(function() {
              e.adapterRef.logger.log("VideoHelper: startMCU: ready: start mix ...");
              var t = e.mcuConfig;
              return e.mcuDom.canvas = document.createElement("canvas"), e.mcuDom.canvas.width = e.mcuDom
                .largeDom.videoWidth, e.mcuDom.canvas.height = e.mcuDom.largeDom.videoHeight, e.setMixCoordinates(),
                clearInterval(e.mcuDom.canvasTimer), e.mcuDom.canvasTimer = setInterval(function() {
                  e.mcuDom.canvas.getContext("2d").drawImage(e.mcuDom.largeDom, 0, 0, e.mcuDom.canvas
                    .width, e.mcuDom.canvas.height), e.mcuDom.canvas.getContext("2d").drawImage(
                    e.mcuDom.smallDom, t.coordinatesX, t.coordinatesY)
                }, 25), e.pushVideoStream = e.localVideoStream = e.mcuDom.canvas.captureStream(), e
                .videoDomHelper || e._createVideoDomHelper(), e.videoDomHelper.videoDom.srcObject =
                e.localVideoStream, e.videoDomHelper.videoDom.play(), e.mcuDom.smallDom.onresize =
                function() {
                  e.setMixCoordinates()
                }, Promise.resolve()
            }) : (this.adapterRef.logger.warn("VideoHelper:startMCU: stream is null"), Promise.reject(
              p.VideoErrorCode.VideoStreamFetchError))
          }
        }, {
          key: "_getMCUStreamConstrait",
          value: function() {
            var e = null;
            if (this.adapterRef.mixVideoConf.videoMixRatio) {
              var t = Math.min(this.adapterRef.mixVideoConf.videoMixRatio, .7),
                r = this.mcuDom.largeDom.videoWidth * t;
              e = {
                width: r,
                height: r * this.mcuDom.smallDom.videoHeight / this.mcuDom.smallDom.videoWidth
              }
            } else {
              var i = this.sdkRef.getVideoSessionConfig({
                quality: this.adapterRef.mixVideoConf.videoCompressSize,
                frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
              });
              e = {
                width: i.width,
                height: i.height
              }
            }
            return e
          }
        }, {
          key: "_setupMCUStream",
          value: function() {
            var e = null,
              t = null;
            return this.adapterRef.mixVideoConf.videoSecWinType === p.DEVICE_TYPE.DEVICE_TYPE_VIDEO ? (
                e = this.localScreenStream, t = this.localCameraStream) : (e = this.localCameraStream,
                t = this.localScreenStream), this.mcuConfig.videoSecWinType = this.adapterRef.mixVideoConf
              .videoSecWinType, e && t ? Promise.all([this._loadStreamForMCU("smallDom", t), this._loadStreamForMCU(
                "largeDom", e)]).then(function() {
                return Promise.resolve({
                  smallStream: t,
                  largeStream: e
                })
              }) : Promise.resolve()
          }
        }, {
          key: "_applyStreamConstrait",
          value: function(e, t) {
            return Promise.resolve().then(function() {
              var r = e.getVideoTracks();
              return r.length > 0 ? r[0].applyConstraints(t) : Promise.resolve()
            })
          }
        }, {
          key: "_loadStreamForMCU",
          value: function(e, t) {
            var r = this.mcuDom[e];
            return r || (this.mcuDom[e] = r = document.createElement("video")), new Promise(function(e,
              i) {
              r.oncanplay = function() {
                e()
              }, r.autoplay = "autoplay", r.srcObject = t
            })
          }
        }, {
          key: "isInMCUState",
          value: function() {
            return !(!this.localCameraStream || !this.localScreenStream) && (this.localCameraStream !==
              this.localVideoStream && this.localScreenStream !== this.localVideoStream)
          }
        }, {
          key: "clearMCUState",
          value: function() {
            if (!this.adapterRef.mixVideoConf && (this._resetMixParam(), this.isInMCUState())) {
              var e = function() {};
              this.stopScreenShare(e), this.stopVideoDevice(e), this.hide()
            }
          }
        }, {
          key: "clearOneStreamFormMixture",
          value: function(e) {
            var t = this;
            if (this._resetMixParam(), e) this.adapterRef.logger.log(
              "VideoHelper: clearOneStreamFormMixture: 清除 camera stream: ", this.localCameraStream.id
            ), this._applyStreamConstrait(this.localScreenStream, {
              width: 1080,
              height: 720
            }).finally(function(e) {
              t.pushVideoStream = t.localVideoStream = t.localScreenStream, t.adapterRef.instance._updateRtc(
                !0), t.videoDomHelper && t.videoDomHelper.videoDom && (t.videoDomHelper.videoDom.srcObject =
                t.localScreenStream, t.videoDomHelper.videoDom.play())
            }), u.removeTrackFromMediaStream(this.localCameraStream), this.localCameraStream = null;
            else {
              this.adapterRef.logger.log("VideoHelper: clearOneStreamFormMixture: 清除 screen stream: ",
                this.localScreenStream.id);
              var r = this.sdkRef.getVideoSessionConfig({
                quality: this.adapterRef.imInfo.videoQuality,
                frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
              });
              this._applyStreamConstrait(this.localCameraStream, r).finally(function(e) {
                t.pushVideoStream = t.localVideoStream = t.localCameraStream, t.adapterRef.instance
                  ._updateRtc(!0), t.videoDomHelper && t.videoDomHelper.videoDom && (t.videoDomHelper
                    .videoDom.srcObject = t.localCameraStream, t.videoDomHelper.videoDom.play())
              }), u.removeTrackFromMediaStream(this.localScreenStream), this.localScreenStream = null
            }
          }
        }, {
          key: "stopStream",
          value: function(e, t) {
            return 0 === this.adapterRef.state.startSessionTime && (u.removeTrackFromMediaStream(this.localCameraStream),
              u.removeTrackFromMediaStream(this.localScreenStream)), this.isInMCUState() ? (this.clearOneStreamFormMixture(
              e), t()) : this.localVideoStream ? (e ? (this.localVideoStream === this.localCameraStream &&
              (this.destroy(this.localVideoStream), this.localVideoStream = null), this.localCameraStream =
              null) : (this.localVideoStream === this.localScreenStream && (this.destroy(this.localVideoStream),
              this.localVideoStream = null), this.localScreenStream = null), t()) : t(
              "VideoHelper: stopStream: 视频采集未开启")
          }
        }, {
          key: "startVideoDevice",
          value: function(e, t, r) {
            return this.adapterRef.logger.log("VideoHelper: startVideoDevice: 开始启动摄像头"), this.getCameraStream(
              e).then(function(e) {
              t(e)
            }).catch(function(e) {
              r(e)
            })
          }
        }, {
          key: "stopVideoDevice",
          value: function(e) {
            this.adapterRef.logger.log("VideoHelper: stopVideoDevice: 开始关闭摄像头"), this.stopStream(!0, e)
          }
        }, {
          key: "startScreenShare",
          value: function(e, t, r) {
            return this.adapterRef.logger.log("VideoHelper: startScreenShare: 开始屏幕共享"), this.adapterRef
              .chromeId ? this.getScreenStreamPlugin(e, t, r) : this.getScreenStreamNative(e, t, r)
          }
        }, {
          key: "stopScreenShare",
          value: function(e) {
            this.adapterRef.logger.log("VideoHelper: stopScreenShare: 开始关闭屏幕共享"), this.stopStream(!1, e)
          }
        }, {
          key: "disableDevice",
          value: function() {
            this.adapterRef.logger.log("VideoHelper: stopScreenShare: 设备禁用 ", this.uid);
            var e = [];
            return this.localVideoStream && (e = this.localVideoStream.getTracks()), e.map(function(e) {
              e.enabled = !1
            }), Promise.resolve()
          }
        }, {
          key: "hide",
          value: function() {
            if (this.isPlaying = !1, this.videoDomHelper) {
              var e = this.videoDomHelper.videoContainerDom;
              e ? (this.mcuDom.canvasTimer && 0 !== this.adapterRef.state.startSessionTime && this.adapterRef
                  .logger.log("VideoHelper:hide 当前正在混频中"), this.adapterRef.logger.warn(
                    "VideoHelper:hide 隐藏video并清理DOM节点 ", this.uid), e.parentNode && this.videoContainer
                  .removeChild(e), this.videoDomHelper.destory(), this.videoDomHelper = null) : this.adapterRef
                .logger.log("VideoHelper:hide videoContainerDom不存在")
            } else this.adapterRef.logger.log("VideoHelper:hide videoDomHelper不存在")
          }
        }, {
          key: "_createVideoDomHelper",
          value: function() {
            this.videoDomHelper = new l.default({
              adapterRef: this.adapterRef,
              uid: this.uid
            })
          }
        }, {
          key: "show",
          value: function(e) {
            this.adapterRef.logger.log("show 播放视频"), !1 !== this._checkHasVideoStream() ? this.videoContainer ||
              e ? (e ? this.setVideoContainer(e) : this.videoDomHelper && !this.videoDomHelper.videoContainerDom ||
                this.setVideoContainer(this.videoContainer), this._mountVideoToDom(), this.setVideoViewConfig(),
                this.play()) : this.adapterRef.logger.log("show: ", p.VideoErrorCode.VideoContainerNotExist) :
              this.adapterRef.logger.log("show: ", p.VideoErrorCode.VideoStreamFetchError)
          }
        }, {
          key: "_mountVideoToDom",
          value: function() {
            var e = this.videoDomHelper.videoContainerDom,
              t = this.videoContainer;
            e && t ? t != e.parentNode ? (this.adapterRef.logger.log(
                "VideoHelper: _mountVideoToDom: videoContainerDom: ", e), this.adapterRef.logger.log(
                "VideoHelper: _mountVideoToDom: container: ", t), t.appendChild(e)) : this.adapterRef.logger
              .log("VideoHelper: _mountVideoToDom: 节点已挂载，请勿重复挂载") : this.adapterRef.logger.error(
                "VideoHelper: _mountVideoToDom: 未设置渲染根节点或子节点为空")
          }
        }, {
          key: "play",
          value: function() {
            var e = this;
            if (1 != this.isPlaying) {
              var t = this.videoDomHelper.videoDom;
              if (!1 !== t.paused) {
                if (this.adapterRef.logger.log("VideoHelper: play: 播放视频"), this.poster && (t.poster =
                    this.poster), this.adapterRef.logger.log("VideoHelper: play: isRemote: ", this.isRemote),
                  t.srcObject || (this.adapterRef.logger.log("VideoHelper: play: 设置播放对象"), t.srcObject =
                    this.isRemote ? this.remoteVideoStream : this.localVideoStream), t.srcObject) {
                  this.adapterRef.logger.log("VideoHelper: play video: ", t.srcObject.id), 4 !== t.readyState &&
                    t.load();
                  var r = t.play();
                  void 0 !== r && r.catch(function(t) {
                    e.adapterRef.logger.log("视频 play: ", t)
                  }).then(function() {
                    if (e.isPlaying = !0, e.adapterRef.logger.log(
                        "VideoHelper: play: video playing-。-\n videoDom:", t), e.adapterRef.logger.log(
                        "VideoHelper: play: div:", t.parentNode), e.adapterRef.logger.log(
                        "VideoHelper: play: streamId:", t.srcObject && t.srcObject.id), e.adapterRef
                      .logger.log("VideoHelper: play: isPlaying: ", t.played.length), t.parentNode &&
                      0 == t.played.length && setTimeout(function() {
                        t && 0 == t.played.length && (e.adapterRef.logger.log(
                          "VideoHelper: play: 再次播放"), t.play())
                      }, 500), e.adapterRef.logReportHelper && t && t.parentNode) {
                      var r = {};
                      r.uid = e.adapterRef.imInfo && e.adapterRef.imInfo.uid || "", r.remoteUid = e
                        .uid || "", r.streamId = t.srcObject.id || "", r.playEvent = t.parentNode.innerHTML ||
                        "", r.videoSize = t.videoWidth + "x" + t.videoHeight || "", r.windowsSize =
                        t.parentNode.clientWidth + "x" + t.parentNode.clientHeight || "", e.adapterRef
                        .logReportHelper.uploadData("mediaPlay", {
                          video: r
                        })
                    }
                  })
                }
              } else this.adapterRef.logger.log("VideoHelper: play: 已经播放，请勿重复播放")
            } else this.adapterRef.logger.log("VideoHelper: play: 正在播放，请勿重复播放")
          }
        }, {
          key: "getLocalVideoStream",
          value: function() {
            return arguments.length > 0 && void 0 !== arguments[0] && arguments[0] ? this.pushVideoStream :
              this.localVideoStream
          }
        }, {
          key: "setLocalVideoStreamToPushStream",
          value: function() {
            this.pushVideoStream = this.localVideoStream
          }
        }, {
          key: "getLocalCameraStream",
          value: function() {
            return this.localCameraStream
          }
        }, {
          key: "getLocalScreenStream",
          value: function() {
            return this.localScreenStream
          }
        }, {
          key: "resumeLocalStream",
          value: function() {
            this.videoDomHelper && this.videoDomHelper.videoDom.play()
          }
        }, {
          key: "suspendLocalStream",
          value: function() {
            this.videoDomHelper && this.videoDomHelper.videoDom.pause()
          }
        }, {
          key: "resumeRemoteStream",
          value: function() {
            this.videoDomHelper && this.videoDomHelper.videoDom.play()
          }
        }, {
          key: "suspendRemoteStream",
          value: function() {
            this.videoDomHelper && this.videoDomHelper.videoDom.pause()
          }
        }, {
          key: "hasStartVideoDeviceRepeat",
          value: function(e) {
            return this.localCameraStream && this.constraint.video && this.constraint.video.deviceId ===
              e.deviceId ? (this.enableDevice(), Promise.reject(p.DeviceErrorCode.DeviceAlreadyOpen)) :
              Promise.resolve()
          }
        }, {
          key: "hasStartScreenShareRepeat",
          value: function() {
            return this.localScreenStream && this.adapterRef.mixVideoConf ? Promise.reject(p.DeviceErrorCode
              .DeviceAlreadyOpen) : Promise.resolve()
          }
        }, {
          key: "checkMediaTrackBySDP",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.video,
              r = e.sdp,
              i = e.uid,
              n = {
                video: !1
              },
              a = d.parse(r),
              o = t && t.getVideoTracks()[0];
            return this.adapterRef.logger.log("VideoHelper: " + i +
                " checkMediaTrackBySDP ----\x3e track status", a), o && this.adapterRef.logger.log(
                "VideoHelper: checkMediaTrackBySDP videoTrack ----\x3e ", o), n.video = o && "ended" !==
              o.readyState && new RegExp(o.id).test(r), n
          }
        }, {
          key: "_checkHasVideoStream",
          value: function() {
            return Boolean(this.localVideoStream) || Boolean(this.remoteVideoStream)
          }
        }]), t
      }(s.EventEmitter);
      t.VideoHelper = m
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = s(r(1)),
        n = s(r(5)),
        a = s(r(4)),
        o = s(r(3));

      function s(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var c = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return r._reset(), r._initNode(), r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "_reset",
          value: function() {
            this.audioDom = null
          }
        }, {
          key: "_initNode",
          value: function() {
            this.audioDom = document.createElement("audio")
          }
        }, {
          key: "destroy",
          value: function() {
            this._reset()
          }
        }]), t
      }(r(10).EventEmitter);
      t.default = c, e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.AudioHelper = void 0;
      var i = m(r(1)),
        n = m(r(5)),
        a = m(r(4)),
        o = m(r(3)),
        s = r(10),
        c = r(125),
        d = h(r(181)),
        u = m(r(346)),
        l = h(r(110)),
        p = r(11),
        f = r(24);

      function h(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t.default = e, t
      }

      function m(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var v = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return r._reset(), r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.uid = e.uid, r.isRemote = e.isRemote,
            r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "setUid",
          value: function(e) {
            this.uid = e
          }
        }, {
          key: "_reset",
          value: function() {
            this.sdkRef = null, this.adapterRef = null, this._resetStateParam()
          }
        }, {
          key: "_resetStateParam",
          value: function() {
            this.constraint = {}, this.system = null, this.uid = null, this.isRemote = !1, this.rtc =
              null, this.audioDomHelper = new u.default, this.localAudioStream = null, this.remoteAudioStream =
              null, this.localAudioStreamFromMIC = null, this.pushAudioStream = null, this.mixAudioConf = {
                audioMixingStream: null,
                audioBuffer: {}
              }, this.webAudio && this.webAudio.context && this.webAudio.destroy && this.webAudio.destroy(),
              this.webAudio = null, this.muted = !1, this.volume = 100, this.gainVolume = .5, this.gainOff = !
              1, this.isFirstOpenMic = !1
          }
        }, {
          key: "_getMediaStream",
          value: function() {
            var e = this;
            !1 === this.isRemote && d.getMediaStream({
              video: !1,
              audio: !0
            }).then(function(t) {
              e.localAudioStream = t
            })
          }
        }, {
          key: "playAudio",
          value: function() {
            (this.localAudioStream || this.remoteAudioStream) && (!1 === this.isRemote ? this.audioDomHelper
              .audioDom.srcObject = this.localAudioStream : !0 === this.isRemote && (this.audioDomHelper
                .audioDom.srcObject = this.remoteAudioStream), this.muted && this.setMuted(!1), this.play()
            )
          }
        }, {
          key: "stopAudio",
          value: function() {
            this.setMuted(!0)
          }
        }, {
          key: "setIsRemote",
          value: function(e) {
            return this.isRemote = e, this
          }
        }, {
          key: "setRemoteAudioStream",
          value: function(e) {
            this.remoteAudioStream = e
          }
        }, {
          key: "setRTC",
          value: function(e) {
            this.rtc = e
          }
        }, {
          key: "setMuted",
          value: function(e) {
            this.muted = !!e, this.audioDomHelper.audioDom && (this.audioDomHelper.audioDom.muted = !!e,
              this.setPlayVolume())
          }
        }, {
          key: "play",
          value: function() {
            var e = this,
              t = this.audioDomHelper.audioDom;
            4 !== t.readyState && t.load(), 0 !== t.played.length && t.pause(), this.adapterRef.logger.log(
              "播放声音, uid: ", this.uid, " ,stream: ", t.srcObject && t.srcObject.id);
            var r = t.play();
            void 0 !== r && r.then(function() {
              if (e.adapterRef.logger.log("AudioHelper: play: muted-" + t.muted + " " + t.parentNode +
                  " " + (t.srcObject && t.srcObject.id)), e.adapterRef.logReportHelper) {
                var r = {};
                r.uid = e.adapterRef.imInfo && e.adapterRef.imInfo.uid || "", r.remoteUid = e.uid,
                  r.streamId = t.srcObject.id, r.playEvent = t.innerHTML, e.adapterRef.logReportHelper
                  .uploadData("mediaPlay", {
                    audio: r
                  })
              }
            }).catch(function(t) {
              e.adapterRef.logger.warn("AudioHelper: play: 播放声音error: ", t)
            })
          }
        }, {
          key: "setPlayVolume",
          value: function(e) {
            var t = void 0;
            t = e || 0 == e ? e < 0 ? 0 : e > 255 ? 255 : e : this.volume, this.volume = t, this.getMuted() ||
              this.audioDomHelper.audioDom && (this.audioDomHelper.audioDom.volume = t / 255)
          }
        }, {
          key: "getPlayVolume",
          value: function() {
            if (this.getMuted()) return 0;
            if (!this.audioDomHelper.audioDom) return 0;
            var e = this.audioDomHelper.audioDom.volume;
            return Math.round(e)
          }
        }, {
          key: "setGain",
          value: function(e) {
            var t = 0 === e || 0 !== e && e ? e : 1;
            this.gainVolume = t, this.localAudioStream && !this.isRemote ? this.gainOff ? this.adapterRef
              .logger.log("AudioHelper: setGain: 本地音频被禁止采集") : this.webAudio && (this.webAudio.setGain(
                t), this.adapterRef.logger.log("AudioHelper: setGain: webAudio: 设置音量", t)) : this.adapterRef
              .logger.log("AudioHelper: setGain: 缺失本地音频")
          }
        }, {
          key: "getGain",
          value: function() {
            return this.webAudio && this.webAudio.getGain(), this.gainVolume || 1
          }
        }, {
          key: "setGainOff",
          value: function() {
            this.localAudioStream && !this.isRemote ? (this.webAudio && this.webAudio.setGain(0), this.gainOff = !
              0) : this.adapterRef.logger.log("AudioHelper: setGainOff: 缺失本地音频")
          }
        }, {
          key: "setGainOn",
          value: function() {
            this.localAudioStream && !this.isRemote ? (this.webAudio && this.webAudio.setGain(this.gainVolume),
              this.gainOff = !1) : this.adapterRef.logger.log("AudioHelper: setGainOn: 缺失本地音频")
          }
        }, {
          key: "getMuted",
          value: function() {
            return !!this.muted
          }
        }, {
          key: "composeTrack",
          value: function(e, t) {
            if (e && e !== this.adapterRef.imInfo.uid)
              if (this.adapterRef.imInfo.netDetect) this.adapterRef.logger.log(
                "AudioHelper:_composeTrack 网络探测直接忽略");
              else {
                var r = new MediaStream;
                r.addTrack(t), this.remoteAudioStream && !this.adapterRef.instance._isSafari() ? this.updateStream(
                    r) : this.setRemoteAudioStream(r), this.adapterRef.logger.log(
                    "audioHelper:_composeTrack: " + e + ", " + t.id + ", " + t.readyState), this.adapterRef
                  .logger.log("AudioHelper: _composeTrack: 重组轨道，stream id:", r.id), this.playAudio()
              }
            else this.adapterRef.logger.warn("AudioHelper:_composeTrack 自己的轨道直接忽略")
          }
        }, {
          key: "startAudioDevice",
          value: function(e, t, r) {
            return this.adapterRef.logger.log("AudioHelper: startAudioDevice: 开始启动麦克风"), this.getAudioStream(
              e).then(function(e) {
              t(e)
            }).catch(function(e) {
              r(e)
            })
          }
        }, {
          key: "stopAudioDevice",
          value: function() {
            this.localAudioStreamFromMIC && d.removeTrackFromMediaStream(this.localAudioStreamFromMIC)
          }
        }, {
          key: "getAudioStream",
          value: function(e, t, r) {
            var i = this;
            return new Promise(function(t, r) {
              i._getAudioStream(e, t, r)
            })
          }
        }, {
          key: "_getAudioStream",
          value: function(e, t, r) {
            var i = this,
              n = e && e.deviceId;
            return this.constraint.audio = !n || {
                deviceId: n
              }, this.adapterRef.logger.log("AudioHelper::_getAudioStream:"), d.getMediaStream(this.constraint)
              .then(function(n) {
                i.stopAudioDevice(), i.adapterRef.logger.log("AudioHelper: _getAudioStream: 获取到音频流:",
                  n.id), i.adapterRef.webrtcGateWayBusiness || (d.removeTrackFromMediaStream(n), r(
                  p.AudioErrorCode.AudioUserHasBeenLeft)), i.adapterRef.logReportHelper && (i.adapterRef
                  .logReportHelper.uploadData("AudioHelper: _getAudioStream: mediaConstraint", {
                    audio: {
                      deviceId: i.constraint.audio.deviceId || "",
                      streamId: n.id || ""
                    }
                  }), i.adapterRef.deviceBusiness && i.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache &&
                  i.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache.audioIn ? i.adapterRef
                  .logReportHelper.uploadData("deviceList", {
                    audio: i.adapterRef.deviceBusiness.mediaDeviceHelper.devicesCache.audioIn
                  }) : i.adapterRef.deviceApi.getDevicesOfType().then(function(e) {
                    i.adapterRef.logReportHelper.uploadData("deviceList", {
                      audio: e.audioIn
                    })
                  })), i._initAudioStream(i.constraint, n), t({
                  device: e,
                  stream: n
                })
              }).catch(function(e) {
                var t = Object.assign({
                  event: e
                }, p.DeviceErrorCode.DeviceOpenError);
                r(t)
              })
          }
        }, {
          key: "handleStreamFromMp4File",
          value: function(e) {
            if (!e || !e.getAudioTracks().length) return p.AudioErrorCode.AudioStreamFetchError;
            var t = new MediaStream;
            t.addTrack(e.getAudioTracks()[0]), this.webAudio = new c.WebAudio({
              stream: t,
              uid: this.uid,
              isAnalyze: !0,
              isRemote: !1
            }), this.pushAudioStream = this.localAudioStream = this.webAudio.outputStream
          }
        }, {
          key: "_initAudioStream",
          value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new MediaStream;
            this.localAudioStreamFromMIC = t, this.localAudioStream || this.webAudio ? (this.updateStream(
              t), this.isFirstOpenMic = !1) : (this.adapterRef.logger.log("初次开启mic，实例化音频对象"), this.localAudioStream =
              t, this.isFirstOpenMic = !0, this.adapterRef.instance._isSafari() || (this.webAudio =
                new c.WebAudio({
                  adapterRef: this.adapterRef,
                  stream: t,
                  uid: this.uid,
                  isAnalyze: !0,
                  isRemote: this.isRemote
                }), 1 == this.isRemote ? this.remoteAudioStream = this.webAudio.outputStream : (this.localAudioStream =
                  this.webAudio.outputStream, this.adapterRef.logger.log(
                    "AudioHelper: _initAudioStream: 本地音频: ", this.localAudioStream))))
          }
        }, {
          key: "disableDevice",
          value: function() {
            this.adapterRef.logger.log("AudioHelper: disableDevice: 暂停设备 Audio");
            var e = [];
            return this.localAudioStream && (e = this.localAudioStream.getTracks()), e.map(function(e) {
              e.enabled = !1
            }), Promise.resolve()
          }
        }, {
          key: "enableDevice",
          value: function() {
            this.adapterRef.logger.log("AudioHelper: enableDevice: 恢复设备 Audio");
            var e = [];
            return this.localAudioStream && (e = this.localAudioStream.getTracks()), e.map(function(e) {
              e.enabled = !0
            }), Promise.resolve()
          }
        }, {
          key: "updateStream",
          value: function(e) {
            this.audioDomHelper.audioDom && e && (this.adapterRef.logger.log(
              "AudioHelper: updateStream ", e.id), 1 == this.isRemote ? (this.remoteAudioStream = e,
              this.adapterRef.logger.log("AudioHelper: updaStream, remoteAudioStream:", this.remoteAudioStream)
            ) : this.webAudio ? (this.webAudio.updateStream(e), this.localAudioStream = this.webAudio
              .outputStream, this.adapterRef.logger.log(
                "AudioHelper: updaStream, localAudioStream:", this.localAudioStream && this.localAudioStream
                .id)) : (this.localAudioStream = e, this.adapterRef.logger.log(
              "AudioHelper: updaStream, localAudioStream:", this.localAudioStream && this.localAudioStream
              .id)))
          }
        }, {
          key: "getAudioVolume",
          value: function() {
            return this.adapterRef.detectNetState.inDetecting ? p.CommonErrorCode.NetworkInDetecting :
              this.adapterRef.instance._isPlayer() ? this.localAudioStreamFromMIC ? {
                volume: this.webAudio && this.webAudio.getVolumeData() || 0
              } : p.AudioErrorCode.AudioDisabled : p.CommonErrorCode.RoleNoPermission
          }
        }, {
          key: "removeTrackFromMediaStream",
          value: function(e) {
            d.removeTrackFromMediaStream(e)
          }
        }, {
          key: "destroyMedia",
          value: function() {
            this.adapterRef.logger.log("AudioHelper: destroyMedia: 销毁音频流 " + this.uid +
                ", localAudioStream:\n", this.localAudioStreamFromMIC), this.adapterRef.instance._isSafari() ?
              this.disableDevice() : (d.removeTrackFromMediaStream(this.localAudioStreamFromMIC), this.localAudioStreamFromMIC =
                null)
          }
        }, {
          key: "getLocalAudioStream",
          value: function() {
            return arguments.length > 0 && void 0 !== arguments[0] && arguments[0] ? this.pushAudioStream :
              this.localAudioStream
          }
        }, {
          key: "setLocalAuioStreamToPushStream",
          value: function() {
            this.pushAudioStream = this.localAudioStream
          }
        }, {
          key: "startPushLocalAudioStream",
          value: function() {
            var e = this;
            return Promise.resolve().then(function() {
              return e.localAudioStream ? (e.pushAudioStream = e.localAudioStream, e.adapterRef.instance
                ._judgeSendSdpOfferOrUpdate()) : Promise.reject(p.AudioErrorCode.AudioStreamFetchError)
            })
          }
        }, {
          key: "stopPushLocalAudioStream",
          value: function() {
            var e = this;
            return Promise.resolve().then(function() {
              return e.localAudioStream && e.pushAudioStream ? (e.pushAudioStream = null, e.adapterRef
                .instance._updateRtc(!0)) : Promise.reject(p.AudioErrorCode.AudioStreamFetchError)
            })
          }
        }, {
          key: "hasStartAudioDeviceRepeat",
          value: function(e) {
            return this.localAudioStreamFromMIC && this.constraint.audio.deviceId == e.deviceId ? (this
              .enableDevice(), Promise.reject(p.DeviceErrorCode.DeviceAlreadyOpen)) : (this.localAudioStreamFromMIC &&
              this.stopAudioDevice(), Promise.resolve())
          }
        }, {
          key: "checkMediaTrackBySDP",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.audio,
              r = e.sdp,
              i = e.uid,
              n = {
                audio: !1
              },
              a = l.parse(r),
              o = t && t.getAudioTracks()[0];
            return this.adapterRef.logger.log("AudioHelper: " + i +
                " checkMediaTrackBySDP ----\x3e track status", a), o && this.adapterRef.logger.log(
                "AudioHelper:checkMediaTrackBySDP audioTrack ----\x3e ", o), n.audio = o && "ended" !==
              o.readyState && new RegExp(o.id).test(r), n
          }
        }, {
          key: "startAudioMixing",
          value: function() {
            return this.adapterRef.instance._isChrome() ? this.adapterRef && this.adapterRef.mixAudioConf &&
              this.adapterRef.mixAudioConf.audioFilePath ? this.localAudioStreamFromMIC ? this.pushAudioStream ?
              this.webAudio && this.webAudio.context ? (this.webAudio.mixAudioConf && this.webAudio.mixAudioConf
                .audioSource && this.webAudio.mixAudioConf.state === p.AuidoMixingState.STARTING && (
                  this.adapterRef.logger.log("startAudioMixing: 当前已经开启伴音"), this.stopAudioMixing()),
                this.mixAudioConf.audioBuffer.length && this.mixAudioConf.audioBuffer[this.adapterRef.mixAudioConf
                  .audioFilePath] ? (this.adapterRef.logger.log("开始伴音, 已经加载过云端音乐"), this.startMix()) :
                (this.adapterRef.logger.log("开始伴音, 先加载云端音乐"), this.loadRemoteAudioFile())) : (this.adapterRef
                .logger.log("startAudioMixing: 没有webAudio，不支持伴音功能"), Promise.reject(p.AudioErrorCode.MusicalAccompanimentUnsupport)
              ) : (this.adapterRef.logger.log("startAudioMixing: 当前没有推音频流，音频功能已被禁用"), Promise.reject(p.AudioErrorCode
                .AudioDisabled)) : (this.adapterRef.logger.log("startAudioMixing: 当前没有开启mic"), Promise.reject(
                p.AudioErrorCode.AudioStreamFetchError)) : (this.adapterRef.logger.log("没有找到云端文件路径"),
                Promise.reject(p.AudioErrorCode.AudioFileDownloadError)) : (this.adapterRef.logger.log(
                "startAudioMixing: 请使用chrome内核浏览器"), Promise.reject(p.AudioErrorCode.MusicalAccompanimentUnsupport))
          }
        }, {
          key: "loadRemoteAudioFile",
          value: function() {
            var e = this;
            return (0, f.ajax)({
              url: this.adapterRef.mixAudioConf.audioFilePath,
              type: "GET",
              dataType: "arraybuffer"
            }).then(function(t) {
              return e.adapterRef.logger.log("loadRemoteAudioFile 加载云端音乐成功"), new Promise(function(
                r, i) {
                e.webAudio.context.decodeAudioData(t, function(t) {
                  e.adapterRef.logger.log("loadRemoteAudioFile 云端音乐解码成功"), e.mixAudioConf.audioBuffer[
                    e.adapterRef.mixAudioConf.audioFilePath] = t, e.startMix().then(
                    function(e) {
                      r()
                    })
                }, function(e) {
                  this.adapterRef.logger.log("loadRemoteAudioFile 云端音乐解码失败：", e), i(p.AudioErrorCode
                    .MusicalAccompanimentError)
                })
              })
            }).catch(function(t) {
              return e.adapterRef.logger.log("loadRemoteAudioFile 加载云端音乐失败: ", t), Promise.reject(p
                .AudioErrorCode.AudioFileDownloadError)
            })
          }
        }, {
          key: "startMix",
          value: function() {
            var e = this.adapterRef.mixAudioConf,
              t = e.audioFilePath,
              r = void 0 === t ? "" : t,
              i = e.loopback,
              n = void 0 !== i && i,
              a = e.replace,
              o = void 0 !== a && a,
              s = e.cycle,
              c = void 0 === s ? 0 : s,
              d = e.playStartTime,
              u = void 0 === d ? 0 : d,
              l = e.auidoMixingEnd,
              p = void 0 === l ? null : l;
            return this.webAudio.startMix({
              buffer: this.mixAudioConf.audioBuffer[r],
              loopback: n,
              replace: o,
              cycle: c,
              playStartTime: u,
              auidoMixingEnd: p
            })
          }
        }, {
          key: "pauseAudioMixing",
          value: function() {
            return this.adapterRef.instance._isChrome() ? this.webAudio && this.webAudio.context ? this
              .webAudio.mixAudioConf && this.webAudio.mixAudioConf.audioSource && this.webAudio.mixAudioConf
              .state !== p.AuidoMixingState.PAUSED ? this.webAudio.mixAudioConf && this.webAudio.mixAudioConf
              .audioSource && this.webAudio.mixAudioConf.state === p.AuidoMixingState.STARTING ? this.webAudio
              .pauseAudioMixing() : (this.adapterRef.logger.log("pauseAudioMixing: 当前没有开启伴音"), Promise.reject(
                p.AudioErrorCode.UnstartMusicalAccompaniment)) : (this.adapterRef.logger.log(
                "pauseAudioMixing: 已经暂停"), Promise.reject(p.AudioErrorCode.pausedMusicalAccompaniment)) :
              (this.adapterRef.logger.log("pauseAudioMixing: 没有webAudio，不支持伴音功能"), Promise.reject(p.AudioErrorCode
                .MusicalAccompanimentUnsupport)) : (this.adapterRef.logger.log(
                "pauseAudioMixing: 请使用chrome内核浏览器"), Promise.reject(p.AudioErrorCode.MusicalAccompanimentUnsupport))
          }
        }, {
          key: "resumeAudioMixing",
          value: function() {
            if (!this.adapterRef.instance._isChrome()) return this.adapterRef.logger.log(
              "resumeAudioMixing: 请使用chrome内核浏览器"), Promise.reject(p.AudioErrorCode.MusicalAccompanimentUnsupport);
            if (!this.webAudio || !this.webAudio.context) return this.adapterRef.logger.log(
              "resumeAudioMixing: 没有webAudio，不支持伴音功能"), Promise.reject(p.AudioErrorCode.MusicalAccompanimentUnsupport);
            if (!this.webAudio.mixAudioConf || !this.webAudio.mixAudioConf.audioSource) return this.adapterRef
              .logger.log("resumeAudioMixing: 当前没有开启伴音"), Promise.reject(p.AudioErrorCode.UnstartMusicalAccompaniment);
            if (this.webAudio.mixAudioConf.state !== p.AuidoMixingState.PAUSED) return this.adapterRef.logger
              .log("resumeAudioMixing: 当前没有暂停伴音"), Promise.reject(p.AudioErrorCode.UnpauseMusicalAccompaniment);
            var e = this.adapterRef.mixAudioConf,
              t = e.audioFilePath,
              r = void 0 === t ? "" : t,
              i = e.loopback,
              n = void 0 !== i && i,
              a = e.replace,
              o = void 0 !== a && a,
              s = e.cycle,
              c = void 0 === s ? 0 : s,
              d = e.playStartTime,
              u = void 0 === d ? 0 : d,
              l = e.auidoMixingEnd,
              f = void 0 === l ? null : l,
              h = (this.webAudio.mixAudioConf.pauseTime - this.webAudio.mixAudioConf.startTime) / 1e3 +
              this.webAudio.mixAudioConf.playStartTime;
            return h > this.webAudio.mixAudioConf.totalTime && (console.log("播发过的圈数 playedCycle: ",
                parseInt(h / this.webAudio.mixAudioConf.totalTime)), c -= parseInt(h / this.webAudio.mixAudioConf
                .totalTime), this.adapterRef.mixAudioConf.cycle = c), this.webAudio.mixAudioConf.setPlayStartTime ?
              (console.log("暂停期间，用户设置混音播发时间: ", this.webAudio.mixAudioConf.setPlayStartTime), u = this.webAudio
                .mixAudioConf.setPlayStartTime, this.webAudio.mixAudioConf.setPlayStartTime = 0) : (
                console.log("恢复混音:", this.webAudio.mixAudioConf), console.log("暂停的时间戳: ", this.webAudio
                  .mixAudioConf.pauseTime), console.log("开始的时间戳: ", this.webAudio.mixAudioConf.startTime),
                console.log("已经播放的时间: ", h), h > this.webAudio.mixAudioConf.totalTime && (h %= this.webAudio
                  .mixAudioConf.totalTime), u = h), console.log("回复重置的时间点：", u), this.webAudio.resumeAudioMixing({
                buffer: this.mixAudioConf.audioBuffer[r],
                loopback: n,
                replace: o,
                cycle: c,
                playStartTime: u,
                auidoMixingEnd: f
              })
          }
        }, {
          key: "stopAudioMixing",
          value: function() {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            if (!this.isRemote) return this.adapterRef.instance._isChrome() ? this.webAudio && this.webAudio
              .context ? this.webAudio.mixAudioConf && this.webAudio.mixAudioConf.audioSource ? this.webAudio
              .stopAudioMixing(e) : (this.adapterRef.logger.log("stopAudioMixing: 当前没有开启伴音"), Promise
                .reject(p.AudioErrorCode.UnstartMusicalAccompaniment)) : (this.adapterRef.logger.log(
                "stopAudioMixing: 没有webAudio，不支持伴音功能"), Promise.reject(p.AudioErrorCode.MusicalAccompanimentUnsupport)) :
              (this.adapterRef.logger.log("stopAudioMixing: 请使用chrome内核浏览器"), Promise.reject(p.AudioErrorCode
                .MusicalAccompanimentUnsupport))
          }
        }, {
          key: "setAudioMixingVolume",
          value: function(e) {
            return this.adapterRef.instance._isChrome() ? this.webAudio && this.webAudio.context ? this
              .webAudio.mixAudioConf && this.webAudio.mixAudioConf.audioSource ? Number.isInteger(e) ?
              e < 0 ? (this.adapterRef.logger.log("setAudioMixingVolume: volume小于0"), Promise.reject(p.CommonErrorCode
                .ParamError)) : e > 255 ? (this.adapterRef.logger.log(
                "setAudioMixingVolume: volume大于255"), Promise.reject(p.CommonErrorCode.ParamError)) :
              this.webAudio.setAudioMixingVolume(e) : (this.adapterRef.logger.log(
                "setAudioMixingVolume: volume不是整数"), Promise.reject(p.CommonErrorCode.ParamError)) : (
                this.adapterRef.logger.log("setAudioMixingVolume: 当前没有开启伴音"), Promise.reject(p.AudioErrorCode
                  .UnstartMusicalAccompaniment)) : (this.adapterRef.logger.log(
                "setAudioMixingVolume: 没有webAudio，不支持伴音功能"), Promise.reject(p.AudioErrorCode.MusicalAccompanimentUnsupport)) :
              (this.adapterRef.logger.log("setAudioMixingVolume: 请使用chrome内核浏览器"), Promise.reject(p.AudioErrorCode
                .MusicalAccompanimentUnsupport))
          }
        }, {
          key: "setAudioMixingPlayTime",
          value: function(e) {
            var t = this;
            return this.adapterRef.instance._isChrome() ? this.webAudio && this.webAudio.context ? this
              .webAudio.mixAudioConf && this.webAudio.mixAudioConf.audioSource ? e < 0 ? (this.adapterRef
                .logger.log("setAudioMixingPlayTime: playStartTime小于0"), Promise.reject(p.CommonErrorCode
                  .ParamError)) : e >= this.webAudio.mixAudioConf.totalTime ? (this.adapterRef.logger.log(
                "setAudioMixingPlayTime: playStartTime大于音频文件总时长了"), Promise.reject(p.CommonErrorCode.ParamError)) :
              this.webAudio.mixAudioConf.state === p.AuidoMixingState.PAUSED ? (this.webAudio.mixAudioConf
                .setPlayStartTime = e, this.adapterRef.logger.log(
                  "setAudioMixingPlayTime: 当前正在暂停，记录设置的播发位置，在恢复伴音时，跳转到此次设置的播放位置"), Promise.resolve()) :
              new Promise(function(r, i) {
                t.stopAudioMixing(!1).then(function(n) {
                  t.adapterRef.mixAudioConf.playStartTime = e;
                  var a = t.adapterRef.mixAudioConf,
                    o = a.audioFilePath,
                    s = void 0 === o ? "" : o,
                    c = a.loopback,
                    d = void 0 !== c && c,
                    u = a.replace,
                    l = void 0 !== u && u,
                    p = a.cycle,
                    f = void 0 === p ? 0 : p,
                    h = a.playStartTime,
                    m = void 0 === h ? 0 : h,
                    v = a.auidoMixingEnd,
                    g = void 0 === v ? null : v;
                  console.log("设置混音的播放位置:", t.webAudio.mixAudioConf);
                  var _ = Date.now(),
                    R = (_ - t.webAudio.mixAudioConf.startTime) / 1e3 + t.webAudio.mixAudioConf.playStartTime;
                  console.log("当前的时间戳: ", _), console.log("开始的时间戳: ", t.webAudio.mixAudioConf.startTime),
                    console.log("已经播放的时间: ", R), R > t.webAudio.mixAudioConf.totalTime && (
                      console.log("播发过的圈数 playedCycle: ", parseInt(R / t.webAudio.mixAudioConf.totalTime)),
                      f -= parseInt(R / t.webAudio.mixAudioConf.totalTime), t.adapterRef.mixAudioConf
                      .cycle = f), t.adapterRef.logger.log("setAudioMixingPlayTime, playTime: ",
                      e), t.adapterRef.logger.log("setAudioMixingPlayTime, cycle: ", f), t.webAudio
                    .setAudioMixingPlayTime({
                      buffer: t.mixAudioConf.audioBuffer[s],
                      loopback: d,
                      replace: l,
                      cycle: f,
                      playStartTime: m,
                      auidoMixingEnd: g
                    }).then(function(e) {
                      r()
                    }).catch(function(e) {
                      i(e)
                    })
                }).catch(function(e) {
                  return Promise.reject(e)
                })
              }) : (this.adapterRef.logger.log("setAudioMixingPlayTime: 当前没有开启伴音"), Promise.reject(p.AudioErrorCode
                .UnstartMusicalAccompaniment)) : (this.adapterRef.logger.log(
                "setAudioMixingPlayTime: 没有webAudio，不支持伴音功能"), Promise.reject(p.AudioErrorCode.MusicalAccompanimentUnsupport)) :
              (this.adapterRef.logger.log("setAudioMixingPlayTime: 请使用chrome内核浏览器"), Promise.reject(p.AudioErrorCode
                .MusicalAccompanimentUnsupport))
          }
        }, {
          key: "getAudioMixingPlayedTime",
          value: function() {
            return this.adapterRef.instance._isChrome() ? this.webAudio && this.webAudio.context ? this
              .webAudio.mixAudioConf && this.webAudio.mixAudioConf.audioSource ? this.webAudio.getAudioMixingPlayedTime() :
              (this.adapterRef.logger.log("getAudioMixingPlayedTime: 当前没有开启伴音"), p.AudioErrorCode.UnstartMusicalAccompaniment) :
              (this.adapterRef.logger.log("getAudioMixingPlayedTime: 没有webAudio，不支持伴音功能"), p.AudioErrorCode
                .MusicalAccompanimentUnsupport) : (this.adapterRef.logger.log(
                "getAudioMixingPlayedTime: 请使用chrome内核浏览器"), Promise.reject(p.AudioErrorCode.MusicalAccompanimentUnsupport))
          }
        }, {
          key: "getAudioMixingTotalTime",
          value: function() {
            return this.adapterRef.instance._isChrome() ? this.webAudio && this.webAudio.context ? this
              .webAudio.mixAudioConf && this.webAudio.mixAudioConf.audioSource ? this.webAudio.getAudioMixingTotalTime() :
              (this.adapterRef.logger.log("getAudioMixingTotalTime: 当前没有开启伴音"), p.AudioErrorCode.UnstartMusicalAccompaniment) :
              (this.adapterRef.logger.log("startAudioMixing: 没有webAudio，不支持伴音功能"), p.AudioErrorCode.MusicalAccompanimentUnsupport) :
              (this.adapterRef.logger.log("getAudioMixingTotalTime: 请使用chrome内核浏览器"), Promise.reject(p.AudioErrorCode
                .MusicalAccompanimentUnsupport))
          }
        }, {
          key: "destroy",
          value: function() {
            this.adapterRef.logger.log("AudioHelper:destroy "), this.audioDomHelper && (this.audioDomHelper
              .destroy(), this.audioDomHelper = null), this.stopAudioMixing(), this._resetStateParam()
          }
        }]), t
      }(s.EventEmitter);
      t.AudioHelper = v
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.MediaRecordHelper = void 0;
      var i = u(r(1)),
        n = u(r(5)),
        a = u(r(4)),
        o = u(r(3)),
        s = r(10),
        c = r(125),
        d = r(11);

      function u(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var l = function(e) {
        function t() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return r._status = {}, r._reset(), r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "start",
          value: function() {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
              r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                uid: 0,
                account: "",
                type: "video",
                reset: !1
              };
            if (!r.uid && !r.account) return Promise.reject(d.VideoRecordErrorCode.RecordLackAccount);
            if (!t) return Promise.reject(d.VideoRecordErrorCode.RecordNoStream);
            if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) return Promise.reject(d.VideoRecordErrorCode
              .RecordBrowserNotSupport);
            if (this._status.isRecording) return Promise.reject(d.VideoRecordErrorCode.RecordInRecording);
            if (this._status.recordUrl) {
              if (!r.reset) return this.adapterRef.logger.log(
                "MediaRecordHelper: start : 请先下载或重置上一段录制文件"), Promise.reject(d.VideoRecordErrorCode
                .VideoRecordExsit);
              this.adapterRef.logger.warn("MediaRecordHelper: start: 存在未下载视频，强制清除..."), this.clean()
            }
            this._status.stream = t, this._status.option = r, this._status.fileName = (this._status.option
              .account || this._status.option.uid) + "--" + this._getTimeStamp() + "--" + (this._status
              .option.type || "video"), this._status.startTime = this._getTimeStamp();
            var i = ["video/mp4;codecs=opus", "video/webm", "video/webm;codecs=h264",
              "video/x-matroska;codecs=opus", "video/invalid"
            ];
            return "audio" === r.type && (i = ["audio/wav", "audio/ogg", "audio/pcm", "audio/webm"]), (
              this._status.mimeType = this._validation(i)[0]) ? this._format().then(function() {
              return e._start()
            }).catch(function(e) {
              var t = Object.assign({
                event: e
              }, d.VideoRecordErrorCode.RecordFormatError);
              return Promise.reject(t)
            }) : Promise.reject(d.VideoRecordErrorCode.RecordBrowserNotSupportFormat)
          }
        }, {
          key: "stop",
          value: function(e) {
            var t = this;
            return this._status.isRecording && this._recorder ? "started" !== this._status.state ? (
              this.adapterRef.logger.warn("MediaRecordHelper: record stopping when " + this._recorder
                .state), Promise.resolve()) : (this._status.state = "stopped", this._status.recordStatus =
              "stopping", new Promise(function(r, i) {
                t._status.fileName = e || t._status.fileName, t._recorder.onstop = function() {
                  t._onStop(r)
                }, t._recorder.stop()
              })) : Promise.reject(d.VideoRecordErrorCode.RecordNotExist)
          }
        }, {
          key: "play",
          value: function(e) {
            return "stopped" !== this._status.state ? (this.adapterRef.logger.warn(
                "MediaRecordHelper: record stopping when " + this._recorder.state), Promise.resolve()) :
              this._play(e)
          }
        }, {
          key: "download",
          value: function(e) {
            var t = this;
            return Promise.resolve().then(function() {
              return t._status.isRecording ? (t.adapterRef.logger.warn(
                "MediaRecordHelper: download: 正在录制中，立即停止..."), t.stop()) : Promise.resolve()
            }).then(function() {
              if (t._status.recordUrl) {
                var r = document.createElement("a");
                document.body.appendChild(r), r.style = "display: none", r.href = t._status.recordUrl,
                  r.download = (e || t._status.fileName || t._getTimeStamp()) + ".webm", r.click(),
                  window.URL.revokeObjectURL(t._status.recordUrl), t._status.recordUrl = null, t._status
                  .recordStatus = "downloaded"
              } else t.adapterRef.logger.warn(
                "MediaRecordHelper: download: cannot download media without url ...");
              return Promise.resolve(t._status)
            })
          }
        }, {
          key: "clean",
          value: function() {
            var e = this;
            return Promise.resolve().then(function() {
              return e._status.isRecording && e._recorder ? e.stop() : Promise.resolve()
            }).then(function() {
              return e._status.recordUrl && (window.URL.revokeObjectURL(e._status.recordUrl), e._status
                .recordUrl = null), e._destroy(), e._status.recordStatus = "init", Promise.resolve()
            })
          }
        }, {
          key: "leave",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
              uid: 0
            };
            if (!this._status.isRecording || !this._recorder) return Promise.resolve();
            var t = e.uid;
            return t && this._status.option ? t === +this._status.option.uid ? this.stop() : void 0 :
              Promise.resolve()
          }
        }, {
          key: "pause",
          value: function() {
            this._recorder && this._recorder.pause()
          }
        }, {
          key: "resume",
          value: function() {
            this._recorder && this._recorder.resume()
          }
        }, {
          key: "_reset",
          value: function() {
            this._recorder = null, Object.assign(this._status, {
              recordedChunks: [],
              isRecording: !1,
              stream: null,
              option: null,
              contentTypes: [],
              mimeType: "",
              audioController: null,
              opStream: null,
              state: "init",
              timer: null,
              fileName: null,
              recordId: 0,
              recordStatus: "init",
              recordUrl: null,
              startTime: null,
              endTime: null
            })
          }
        }, {
          key: "_getTimeStamp",
          value: function() {
            return parseInt(Date.now() / 1e3)
          }
        }, {
          key: "_validation",
          value: function(e) {
            return e.filter(function(e) {
              return MediaRecorder.isTypeSupported(e)
            })
          }
        }, {
          key: "_format",
          value: function() {
            var e = this,
              t = this._status.stream,
              r = this._status.option;
            return new Promise(function(i, n) {
              var a = new MediaStream;
              return e._matchLocalStreamConstructor(t.constructor) && (t = [t]), Array.isArray(t) ?
                "audio" === r.type ? (e._status.audioController = new c.WebAudio({
                  stream: t,
                  uid: r.uid
                }), e._status.opStream = e._status.audioController.outputStream, i()) : (t.forEach(
                  function(t) {
                    t && e._matchLocalStreamConstructor(t.constructor) && t.getTracks().forEach(
                      function(e) {
                        a.addTrack(e)
                      })
                  }), 0 === a.getTracks().length ? n(d.VideoRecordErrorCode.RecordNoStream) : (e._status
                  .opStream = a, void i())) : n(d.CommonErrorCode.ParamError)
            })
          }
        }, {
          key: "_matchLocalStreamConstructor",
          value: function(e) {
            return /(LocalMediaStream|MediaStream)/.test(e)
          }
        }, {
          key: "_start",
          value: function() {
            var e = this,
              t = {
                audioBitsPerSecond: 128e3,
                videoBitsPerSecond: 25e5,
                mimeType: this._status.mimeType
              },
              r = this._recorder = new MediaRecorder(this._status.opStream, t);
            return r.ondataavailable = this._onDataAvailable.bind(this), r.onstop = function() {
                e.adapterRef.logger.log("MediaRecordHelper: _start: record stop automatically ..."), e._onStop()
              }, this._status.isRecording = !0, this._status.state = "started", this._status.recordId +=
              1, this._status.recordStatus = "starting", this._recorder.start(), this._clearTimer(),
              this._startTimer(), Promise.resolve(this._status.option)
          }
        }, {
          key: "_startTimer",
          value: function() {
            var e = this;
            this._status.timer || (this._status.timer = setInterval(function() {
              e.adapterRef.logger.log("MediaRecordHelper: startTimer: " + (new Date).toLocaleString() +
                " --\x3e MediaRecorder status: " + e._recorder.state)
            }, 5e3))
          }
        }, {
          key: "_onStop",
          value: function(e) {
            this.adapterRef.logger.log("MediaRecordHelper: _onStop: record stoped !!!"), this._clearTimer(),
              this._status.recordStatus = "stopped", this._status.endTime = this._getTimeStamp();
            var t = new Blob(this._status.recordedChunks, {
              type: this._status.mimeType
            });
            this._status.recordUrl = URL.createObjectURL(t), this.emit("stop", this.getRecordStatus()),
              this._destroy(), e && e()
          }
        }, {
          key: "_play",
          value: function(e) {
            var t = null;
            return -1 != this._status.mimeType.indexOf("audio") ? t = document.createElement("audio") :
              -1 != this._status.mimeType.indexOf("audio") && (t = document.createElement("video"),
                videoDom.autoplay = "autoplay"), e.appendChild(t), t.src = null, t.srcObject = null, t.src =
              this._status.recordUrl, t.controls = !1, t.play(), Promise.resolve(this._status.option)
          }
        }, {
          key: "_destroy",
          value: function() {
            this._status.audioController && this._status.audioController.destroy(), this._clearTimer(),
              this._recorder = null, Object.assign(this._status, {
                stream: null,
                recordedChunks: [],
                isRecording: !1,
                audioController: null,
                status: "init"
              })
          }
        }, {
          key: "_clearTimer",
          value: function() {
            clearInterval(this._status.timer), this._status.timer = null
          }
        }, {
          key: "_onDataAvailable",
          value: function(e) {
            if (this._status.recordStatus = "recording", this.adapterRef.logger.log(
                "MediaRecordHelper: ondataavailable: data received"), !(e.data.size > 0)) return this.stop(),
              Promise.reject(d.VideoErrorCode.RecordStreamInvalid);
            this._status.recordedChunks.push(e.data)
          }
        }, {
          key: "checkIsRecording",
          value: function() {
            return this._status.isRecording
          }
        }, {
          key: "getRecordStatus",
          value: function() {
            return Object.assign({
              id: this._status.recordId,
              type: this._status.mimeType,
              name: this._status.fileName,
              status: this._status.recordStatus,
              isRecording: this._status.isRecording,
              startTime: this._status.startTime,
              endTime: this._status.endTime
            }, this._status.option)
          }
        }]), t
      }(s.EventEmitter);
      t.MediaRecordHelper = l
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.MediaDeviceHelper = void 0;
      var i = u(r(1)),
        n = u(r(5)),
        a = u(r(4)),
        o = u(r(3)),
        s = r(10),
        c = r(12),
        d = r(11);

      function u(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var l = (0, c.getGlobal)(),
        p = function(e) {
          function t(e) {
            (0, i.default)(this, t);
            var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.devicesCache = {}, r.deviceChangeCheckTimer =
              null, r._init(), r
          }
          return (0, o.default)(t, e), (0, n.default)(t, [{
            key: "_init",
            value: function() {
              var e = this;
              this.adapterRef.logger.log("MediaDeviceHelper:_init"), this._getDevices(function(t) {
                e.devicesCache = e._transformDeviceData(t), e._registerDeviceChangeEvent()
              }, function(e) {
                this.adapterRef.logger.error("MediaDeviceHelper:_init 获取可用设备列表失败：", e)
              })
            }
          }, {
            key: "_registerDeviceChangeEvent",
            value: function() {
              this.adapterRef.logger.log("MediaDeviceHelper:_registerDeviceChangeEvent"), navigator.mediaDevices
                .ondevicechange = this._onDeviceChangeHandler.bind(this)
            }
          }, {
            key: "_onDeviceChangeHandler",
            value: function(e) {
              var t = this;
              this.adapterRef.logger.log("MediaDeviceHelper:_onDeviceChangeHandler"), this.deviceChangeCheckTimer &&
                (l.clearTimeout(this.deviceChangeCheckTimer), this.deviceChangeCheckTimer = null);
              var r = Object.assign({}, this.devicesCache);
              this.deviceChangeCheckTimer = l.setTimeout(function() {
                t._getDevices(function(e) {
                  t.devicesCache = t._transformDeviceData(e), t.emit("deviceStatus", t.devicesCache),
                    t._filterDeviceChange(t.devicesCache, r)
                }, function(e) {
                  this.adapterRef.logger.error(
                    "MediaDeviceHelper:_onDeviceChangeHandler 获取可用设备列表失败：", e)
                })
              }, 500)
            }
          }, {
            key: "_filterDeviceChange",
            value: function(e, t) {
              var r = function(e) {
                  var t = {};
                  return Object.keys(e).forEach(function(r) {
                    e[r].forEach(function(e) {
                      t[r + e.deviceId] = Object.assign({}, e, {
                        type: r
                      })
                    })
                  }), t
                },
                i = r(e),
                n = r(t),
                a = Object.keys(i),
                o = Object.keys(n);
              if (a.length > o.length) {
                var s = [];
                a.forEach(function(e) {
                  -1 === o.indexOf(e) && s.push(i[e])
                }), s.length && this.emit("deviceAdd", s)
              } else {
                var c = [];
                o.forEach(function(e) {
                  -1 === a.indexOf(e) && c.push(n[e])
                }), c.length && this.emit("deviceRemove", c)
              }
            }
          }, {
            key: "_getDevices",
            value: function(e, t) {
              if (this.adapterRef.logger.log("MediaDeviceHelper:_getDevices 开始获取设备列表"), !navigator.mediaDevices ||
                !navigator.mediaDevices.enumerateDevices) {
                return this.adapterRef.logger.error("enumerateDevices 接口不支持"), void t(
                  "enumerateDevices 接口不支持")
              }
              navigator.mediaDevices.enumerateDevices().then(e).catch(t)
            }
          }, {
            key: "_transformDeviceData",
            value: function(e) {
              this.adapterRef.logger.log("MediaDeviceHelper:_transformDeviceData 转换设备列表");
              var t = {
                video: [],
                audioIn: [],
                audioOut: []
              };
              return 0 === e.length ? t : (e.forEach(function(e) {
                var r = void 0;
                switch (e.kind) {
                  case "videoinput":
                    r = {
                      deviceId: e.deviceId,
                      label: e.label ? e.label : "camera " + (t.video.length + 1)
                    }, t.video.push(r);
                    break;
                  case "audioinput":
                    r = {
                      deviceId: e.deviceId,
                      label: e.label ? e.label : "microphone " + (t.audioIn.length + 1)
                    }, t.audioIn.push(r);
                    break;
                  case "audiooutput":
                    r = {
                      deviceId: e.deviceId,
                      label: e.label ? e.label : "speaker " + (t.audioOut.length + 1)
                    }, t.audioOut.push(r)
                }
              }), t)
            }
          }, {
            key: "getDevicesOfType",
            value: function(e) {
              var t = this;
              return new Promise(function(r, i) {
                t._getDevices(function(i) {
                  var n = t._transformDeviceData(i);
                  void 0 === e && r(n), r(n[e])
                }, function(e) {
                  var t = Object.assign({
                    event: e
                  }, d.DeviceErrorCode.DeviceNotAvailable);
                  this.adapterRef.logger.error("MediaDeviceHelper:getDevicesOfType 获取可用设备列表失败：",
                    t), i(t)
                })
              })
            }
          }, {
            key: "getDeviceStatus",
            value: function() {
              var e = {
                hasAudioDevice: !1,
                hasVideoDevice: !1
              };
              return this.devicesCache && (this.devicesCache.audioIn && this.devicesCache.audioIn.length >
                0 && (e.hasAudioDevice = !0), this.devicesCache.video && this.devicesCache.video.length >
                0 && (e.hasVideoDevice = !0)), e
            }
          }, {
            key: "destroy",
            value: function() {
              this.adapterRef.logger.log("MediaDeviceHelper:destory"), this.devicesCache && (this.devicesCache = {}),
                this.deviceChangeCheckTimer && (l.clearTimeout(this.deviceChangeCheckTimer), this.deviceChangeCheckTimer =
                  null)
            }
          }]), t
        }(s.EventEmitter);
      t.MediaDeviceHelper = p
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTCGateWayProtocolHandler = void 0;
      var i = d(r(1)),
        n = d(r(5)),
        a = d(r(4)),
        o = d(r(3)),
        s = r(182),
        c = r(11);

      function d(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var u = function(e) {
        function t() {
          return (0, i.default)(this, t), (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(
            this, arguments))
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "pack",
          value: function(e, t) {
            switch (e) {
              case c.WEBRTC_GATE_WAY_API.client_login.key:
                return this.generateClientLoginPackData(t);
              case c.WEBRTC_GATE_WAY_API.sdp_offer.key:
                return this.generateSdpOfferPackData(t);
              case c.WEBRTC_GATE_WAY_API.ice_offer.key:
                return this.generateIceOfferPackData(t);
              case c.WEBRTC_GATE_WAY_API.keep_alive.key:
                return this.generateKeepAlivePackData(t);
              case c.WEBRTC_GATE_WAY_API.sdp_update.key:
                return this.genearateSdkUpdatePackData(t);
              case c.WEBRTC_GATE_WAY_API.logout.key:
                return this.generateLogoutPackData(t);
              default:
                return null
            }
          }
        }, {
          key: "unpack",
          value: function(e) {
            try {
              e = JSON.parse(e)
            } catch (e) {
              return console.warn(e), null
            }
            switch (e.type) {
              case c.WEBRTC_GATE_WAY_API.login_ack.key:
                return this.parseLoginAckPackData(e);
              case c.WEBRTC_GATE_WAY_API.sdp_answer.key:
                return this.parseSdpAnswerPackData(e);
              case c.WEBRTC_GATE_WAY_API.ice_answer.key:
                return this.parseIceAnswerPackData(e);
              case c.WEBRTC_GATE_WAY_API.keep_alive_ack.key:
                return this.parseKeepAliveAckPackData(e);
              case c.WEBRTC_GATE_WAY_API.client_join.key:
                return this.parseClientJoinPackData(e);
              case c.WEBRTC_GATE_WAY_API.client_update.key:
                return this.parseClientUpdatePackData(e);
              case c.WEBRTC_GATE_WAY_API.client_logout.key:
                return this.parseClientLogoutPackData(e);
              case c.WEBRTC_GATE_WAY_API.client_error.key:
                return this.parseClientErrorPackData(e);
              case c.WEBRTC_GATE_WAY_API.detect_network.key:
                return this.parseDetectNetworkResultPackData(e);
              default:
                return null
            }
          }
        }, {
          key: "generateClientLoginPackData",
          value: function(e) {
            return Object.assign(c.CLIENT_LOGIN_OF_WEBRTC, e)
          }
        }, {
          key: "generateSdpOfferPackData",
          value: function(e) {
            return Object.assign(c.SDP_OFFER_OF_WEBRTC, e)
          }
        }, {
          key: "generateIceOfferPackData",
          value: function(e) {
            return Object.assign(c.ICE_OFFER_OF_WEBRTC, e)
          }
        }, {
          key: "generateKeepAlivePackData",
          value: function(e) {
            return Object.assign(c.KEEP_ALIVE_OF_WEBRTC, e)
          }
        }, {
          key: "genearateSdkUpdatePackData",
          value: function(e) {
            return Object.assign(c.SDP_UPDATE_OF_WEBRTC, e)
          }
        }, {
          key: "generateLogoutPackData",
          value: function(e) {
            return Object.assign(c.LOGOUT_OF_WEBRTC, e)
          }
        }, {
          key: "parseLoginAckPackData",
          value: function(e) {
            return Object.assign(c.LOGIN_ACK_OF_WEBRTC, e)
          }
        }, {
          key: "parseClientJoinPackData",
          value: function(e) {
            return Object.assign(c.CLIENT_JOIN_OF_WEBRTC, e)
          }
        }, {
          key: "parseClientUpdatePackData",
          value: function(e) {
            return Object.assign(c.CLIENT_UPDATE_OF_WEBRTC, e)
          }
        }, {
          key: "parseKeepAliveAckPackData",
          value: function(e) {
            return Object.assign(c.KEEP_ALIVE_ACK_OF_WEBRTC, e)
          }
        }, {
          key: "parseSdpAnswerPackData",
          value: function(e) {
            return Object.assign(c.SDP_ANSWER_OF_WEBRTC, e)
          }
        }, {
          key: "parseIceAnswerPackData",
          value: function(e) {
            return Object.assign(c.ICE_ANSWER_OF_WEBRTC, e)
          }
        }, {
          key: "parseClientLogoutPackData",
          value: function(e) {
            return Object.assign(c.CLIENT_LOGOUT_OF_WEBRTC, e)
          }
        }, {
          key: "parseClientErrorPackData",
          value: function(e) {
            return Object.assign(c.CLIENT_ERROR_OF_WEBRTC, e)
          }
        }, {
          key: "parseDetectNetworkResultPackData",
          value: function(e) {
            return Object.assign(c.CLIENT_DETECT_NETWORK_RESULT_WEBRTC, e)
          }
        }]), t
      }(s.AbstractProtocolHandler);
      t.WebRTCGateWayProtocolHandler = u
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(182);
      Object.defineProperty(t, "AbstractProtocolHandler", {
        enumerable: !0,
        get: function() {
          return i.AbstractProtocolHandler
        }
      });
      var n = r(350);
      Object.defineProperty(t, "WebRTCGateWayProtocolHandler", {
        enumerable: !0,
        get: function() {
          return n.WebRTCGateWayProtocolHandler
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.AbstractGateWayManager = void 0;
      var i = u(r(1)),
        n = u(r(5)),
        a = u(r(4)),
        o = u(r(3)),
        s = r(10),
        c = r(12),
        d = r(157);

      function u(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var l = (0, c.getGlobal)(),
        p = function(e) {
          function t(e) {
            (0, i.default)(this, t);
            var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
              n = e.url,
              o = e.context,
              s = e.keepAliveInterval4Second;
            return r.reset(), r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.gateway = new d.WebRTCGateWay({
              url: n,
              protocolHandler: new d.WebRTCGateWayProtocolHandler,
              adapterRef: r.adapterRef,
              sdkRef: r.sdkRef
            }), r.context = o, r.keepAliveInterval4Second = s || 5, r
          }
          return (0, o.default)(t, e), (0, n.default)(t, [{
            key: "reset",
            value: function() {
              this.gateway = null, this.context = null, this.state = {
                  hasLogined: !1
                }, this.cmd = {
                  lastCmd: null
                }, this.keepAliveInterval4Second = 5, this.keepAliveTimer = null, this.keepAliveTimer &&
                (l.clearTimeout(this.keepAliveTimer), this.keepAliveTimer = null)
            }
          }, {
            key: "setState",
            value: function(e) {
              var t = e.hasLogined,
                r = e.waiting4Message;
              void 0 !== t && (this.state.hasLogined = t), void 0 !== r && (this.state.waiting4Message =
                r)
            }
          }, {
            key: "startKeepAliveTimer",
            value: function() {
              this.adapterRef.logger.log("AbstractGateWayManager:startKeepAliveTimer "), this.keepAliveTimer &&
                this.stopKeepAliveTimer(), this.doSendKeepAliveTask()
            }
          }, {
            key: "stopKeepAliveTimer",
            value: function() {
              this.adapterRef.logger.log("AbstractGateWayManager:stopKeepAliveTimer "), this.keepAliveTimer &&
                (l.clearTimeout(this.keepAliveTimer), this.keepAliveTimer = null)
            }
          }, {
            key: "doSendKeepAliveTask",
            value: function() {
              this.adapterRef.logger.error("AbstractGateWayManager: 心跳包发送逻辑未在子类实现")
            }
          }, {
            key: "destroy",
            value: function() {
              this.adapterRef.logger.log("AbstractGateWayManager:destroy"), this.gateway && (this.gateway
                .destroy(), this.reset())
            }
          }]), t
        }(s.EventEmitter);
      t.AbstractGateWayManager = p
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTCGateWayManager = void 0;
      var i = l(r(1)),
        n = l(r(5)),
        a = l(r(4)),
        o = l(r(120)),
        s = l(r(3)),
        c = r(352),
        d = r(11),
        u = r(183);

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = (0, r(12).getGlobal)(),
        f = function(e) {
          function t(e) {
            (0, i.default)(this, t);
            var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r._bindGateWayEvent(), r
          }
          return (0, s.default)(t, e), (0, n.default)(t, [{
            key: "_bindGateWayEvent",
            value: function() {
              this.gateway.on("open", this.doSendClientLogin.bind(this)), this.gateway.on("message", this
                  ._handleMessage.bind(this)), this.gateway.on("close", this._handleClose.bind(this)),
                this.gateway.on("error", this._handleError.bind(this))
            }
          }, {
            key: "_unbindGateWayEvent",
            value: function() {
              this.gateway.removeListener("open", this.doSendClientLogin.bind(this)), this.gateway.removeListener(
                "message", this._handleMessage.bind(this)), this.gateway.removeListener("close", this._handleClose
                .bind(this)), this.gateway.removeListener("error", this._handleError.bind(this))
            }
          }, {
            key: "_handleMessage",
            value: function(e) {
              var t = 0,
                r = null,
                i = null;
              switch (e.type) {
                case d.WEBRTC_GATE_WAY_API.login_ack.key:
                  if (200 != (t = e.params.auth_res)) return this.setState({
                    hasLogined: !1
                  }), void this.emit("login", {
                    success: !1
                  });
                  this.adapterRef.logger.warn("WebRTCGateWayManager: _handleMessage: 登录成功，设置状态"), this.setState({
                    hasLogined: !0
                  }), this.startKeepAliveTimer(), this.emit("login", {
                    success: !0
                  });
                  break;
                case d.WEBRTC_GATE_WAY_API.sdp_answer.key:
                  if (200 != (t = e.params.auth_res)) return void this.emit("sdpAnswer", {
                    success: !1
                  });
                  r = e.params.content, this.emit("sdpAnswer", {
                    success: !0,
                    code: t,
                    dst_id: e.params.dst_id,
                    type: r.type,
                    sdp: r.sdp
                  });
                  break;
                case d.WEBRTC_GATE_WAY_API.ice_answer.key:
                  r = e.params.content, this.emit("iceAnswer", {
                    dst_id: e.params.dst_id,
                    candidate: r.candidate,
                    sdpMid: r.sdpMid,
                    sdpMLineIndex: r.sdpMLineIndex
                  });
                  break;
                case d.WEBRTC_GATE_WAY_API.keep_alive_ack.key:
                  this.doSendKeepAliveTask();
                  break;
                case d.WEBRTC_GATE_WAY_API.client_join.key:
                  i = e.params, this.emit("userJoin", {
                    client_id: i.client_id,
                    has_audio: i.has_audio,
                    has_video: i.has_video
                  });
                  break;
                case d.WEBRTC_GATE_WAY_API.client_update.key:
                  i = e.params, this.emit("userUpdate", {
                    client_id: i.client_id,
                    has_audio: i.has_audio,
                    has_video: i.has_video
                  });
                  break;
                case d.WEBRTC_GATE_WAY_API.client_logout.key:
                  r = e.params.content, this.emit("userLeave", {
                    uid: e.uid,
                    logout_type: r.logout_type,
                    timestamp: r.timestamp
                  });
                  break;
                case d.WEBRTC_GATE_WAY_API.client_error.key:
                  r = e.params.content, this.emit("clientError", {
                    uid: e.uid,
                    error_code: r.error_code,
                    timestamp: r.timestamp
                  });
                  break;
                case d.WEBRTC_GATE_WAY_API.detect_network.key:
                  r = e, console.warn("网关反馈网络探测结果, content: ", r), this.emit("detectNetwork", {
                    uid: e.uid,
                    content: r
                  })
              }
            }
          }, {
            key: "_handleClose",
            value: function(e) {
              this.emit("close", e)
            }
          }, {
            key: "_handleError",
            value: function(e) {
              this.emit("error", e)
            }
          }, {
            key: "doSendKeepAliveTask",
            value: function() {
              var e = this;
              this.context && this.context.browser && this.context.browser.name && this.context.browser.version ?
                this.keepAliveTimer = p.setTimeout(function() {
                  e.state && e.state.hasLogined && e.doSendKeepAlive({
                    browser: {
                      name: e.context.browser.name,
                      version: e.context.browser.version
                    },
                    params: {
                      content: {
                        timestamp: "" + Date.now()
                      }
                    }
                  })
                }, 1e3 * this.keepAliveInterval4Second) : this.adapterRef.logger.error(
                  "WebRTCGateWayManager:doSendKeepAliveTask 上下文字段不存在")
            }
          }, {
            key: "doSendClientLogin",
            value: function() {
              if (!this.state || !this.state.hasLogined) {
                this.cmd.lastCmd = d.WEBRTC_GATE_WAY_API.client_login.key;
                var e = {
                    uid: this.context.uid,
                    cid: this.context.cid,
                    hasAudio: this.context.hasAudio,
                    hasVideo: this.context.hasVideo,
                    netDetect: this.context.netDetect,
                    session_mode: this.context.session_mode,
                    params: this.context.params,
                    browser: this.context.browser,
                    bypass_rtmp: this.context.bypass_rtmp,
                    record: this.context.record
                  },
                  t = new u.WebRTCGateWayContext(e),
                  r = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.client_login.key, t),
                  i = this.gateway.send(r);
                if (i.code !== d.GATE_WAY_RESPONSE_CODE.OK) return this.adapterRef.logger.error(
                  "WebRTCGateWayManager:doSendClientLogin:send fail, code=%s", i.code), void this.setState({
                  hasLogined: !1
                });
                this.adapterRef.logger.log("WebRTCGateWayManager:doSendClientLogin:send success")
              }
            }
          }, {
            key: "doSendSdpOffer",
            value: function(e) {
              this.cmd.lastCmd = d.WEBRTC_GATE_WAY_API.sdp_offer.key;
              var t = e.hasAudio,
                r = e.hasVideo,
                i = e.session_mode,
                n = e.params,
                a = e.browser,
                o = e.bypass_rtmp,
                s = e.record,
                c = {
                  uid: this.context.uid,
                  cid: this.context.cid,
                  hasAudio: t || this.context.hasAudio,
                  hasVideo: r || this.context.hasVideo,
                  session_mode: i || this.context.session_mode,
                  params: n,
                  browser: a || this.context.browser,
                  bypass_rtmp: o || this.context.bypass_rtmp,
                  record: s || this.context.record
                },
                l = new u.WebRTCGateWayContext(c),
                p = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.sdp_offer.key, l);
              this.adapterRef.logger.log("WebRTCGateWayManager:doSendSdpOffer -> ", p);
              var f = this.gateway.send(p);
              f.code === d.GATE_WAY_RESPONSE_CODE.OK ? this.adapterRef.logger.log(
                "WebRTCGateWayManager:doSendSdpOffer:send success") : this.adapterRef.logger.error(
                "WebRTCGateWayManager:doSendSdpOffer:send fail, code=%s", f.code)
            }
          }, {
            key: "doSendIceOffer",
            value: function(e) {
              this.cmd.lastCmd = d.WEBRTC_GATE_WAY_API.ice_offer.key;
              var t = e.params,
                r = {
                  uid: this.context.uid,
                  cid: this.context.cid,
                  params: t
                },
                i = new u.WebRTCGateWayContext(r),
                n = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.ice_offer.key, i),
                a = this.gateway.send(n);
              a.code === d.GATE_WAY_RESPONSE_CODE.OK ? this.adapterRef.logger.log(
                "WebRTCGateWayManager:doSendIceOffer:send success") : this.adapterRef.logger.error(
                "WebRTCGateWayManager:doSendIceOffer:send fail, code=%s", a.code)
            }
          }, {
            key: "doSendSdpUpdate",
            value: function(e) {
              this.cmd.lastCmd = d.WEBRTC_GATE_WAY_API.sdp_update.key;
              var t = e.hasAudio,
                r = e.hasVideo,
                i = e.session_mode,
                n = e.params,
                a = e.browser,
                o = e.bypass_rtmp,
                s = e.record,
                c = {
                  uid: this.context.uid,
                  cid: this.context.cid,
                  hasAudio: t || this.context.hasAudio,
                  hasVideo: r || this.context.hasVideo,
                  session_mode: i || this.context.session_mode,
                  params: n,
                  browser: a || this.context.browser,
                  bypass_rtmp: o || this.context.bypass_rtmp,
                  record: s || this.context.record
                },
                l = new u.WebRTCGateWayContext(c),
                p = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.sdp_update.key, l),
                f = this.gateway.send(p);
              f.code === d.GATE_WAY_RESPONSE_CODE.OK ? this.adapterRef.logger.log(
                "WebRTCGateWayManager:doSendSdpUpdate:send success") : this.adapterRef.logger.error(
                "WebRTCGateWayManager:doSendSdpUpdate:send fail, code=%s", f.code)
            }
          }, {
            key: "doSendKeepAlive",
            value: function(e) {
              var t = e.browser,
                r = e.params,
                i = {
                  uid: this.context.uid,
                  cid: this.context.cid,
                  browser: t || this.context.browser,
                  params: r
                },
                n = new u.WebRTCGateWayContext(i),
                a = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.keep_alive.key, n),
                o = this.gateway.send(a);
              o.code !== d.GATE_WAY_RESPONSE_CODE.OK && this.adapterRef.logger.warn(
                "WebRTCGateWayManager:doSendKeepAlive:send fail, code=%s", o.code)
            }
          }, {
            key: "doSendLogout",
            value: function(e) {
              var t = e.browser,
                r = e.params,
                i = {
                  uid: this.context.uid,
                  cid: this.context.cid,
                  browser: t || this.context.browser,
                  params: r
                },
                n = new u.WebRTCGateWayContext(i),
                a = this.gateway.protocolHandler.pack(d.WEBRTC_GATE_WAY_API.logout.key, n),
                o = this.gateway.send(a);
              o.code === d.GATE_WAY_RESPONSE_CODE.OK ? (this.adapterRef.logger.log(
                "WebRTCGateWayManager:doSendLogout:send success", a), this.setState({
                hasLogined: !1
              }), this.stopKeepAliveTimer()) : this.adapterRef.logger.error(
                "WebRTCGateWayManager:doSendLogout:send fail, code=%s", o.code)
            }
          }, {
            key: "destroy",
            value: function() {
              this.adapterRef.logger.log("WebRTCGateWayManager:destroy"), this._unbindGateWayEvent(), (0,
                  o.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this)
                .call(this)
            }
          }]), t
        }(c.AbstractGateWayManager);
      t.WebRTCGateWayManager = f
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.AbstractGateWayContext = void 0;
      var i, n = r(1),
        a = (i = n) && i.__esModule ? i : {
          default: i
        };
      t.AbstractGateWayContext = function e(t) {
        (0, a.default)(this, e);
        var r = t.uid,
          i = t.cid;
        this.uid = r, this.cid = i
      }
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.AbstractGateWay = void 0;
      var i = u(r(1)),
        n = u(r(5)),
        a = u(r(4)),
        o = u(r(3)),
        s = r(10),
        c = r(11),
        d = r(157);

      function u(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var l = function(e) {
        function t(e) {
          (0, i.default)(this, t);
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          r.reset();
          var n = e.url,
            o = e.protocolHandler;
          return r.sdkRef = e.sdkRef, r.adapterRef = e.adapterRef, r.protocolHandler = o, r.initSocket(n), r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "reset",
          value: function() {
            this.protocolHandler = null, this.url = "", this.ws = null, this.inited = !1
          }
        }, {
          key: "initSocket",
          value: function(e) {
            /^wss:\/\//.test(e) || (e = "wss://" + e), this.url = e, this.ws = new WebSocket(e);
            var t = this.ws;
            t.onopen = this.onOpen.bind(this), t.onmessage = this.onMessage.bind(this), t.onclose =
              this.onClose.bind(this), t.onerror = this.onError.bind(this)
          }
        }, {
          key: "onOpen",
          value: function(e) {
            this.adapterRef.logger.log("AbstractGateWay:onOpen"), this.inited = !0, this.emit("open", e)
          }
        }, {
          key: "onMessage",
          value: function(e) {
            var t = this.protocolHandler.unpack(e.data);
            null != t ? (this.protocolHandler.constructor === d.WebRTCGateWayProtocolHandler && t.type !==
                c.WEBRTC_GATE_WAY_API.keep_alive_ack.key && this.adapterRef.logger.log(
                  "AbstractGateWay:onMessage <- ", e.data), this.emit("message", t)) : this.adapterRef.logger
              .error("AbstractGateWay:解包数据为空")
          }
        }, {
          key: "onClose",
          value: function(e) {
            this.adapterRef.logger.log("AbstractGateWay:onClose <- ", e), this.emit("close", e)
          }
        }, {
          key: "onError",
          value: function(e) {
            this.adapterRef.logger.log("AbstractGateWay:onError <- ", e), this.emit("error", e)
          }
        }, {
          key: "send",
          value: function(e) {
            return this.protocolHandler.constructor === d.WebRTCGateWayProtocolHandler && e.type !== c.WEBRTC_GATE_WAY_API
              .keep_alive.key && this.adapterRef.logger.log("AbstractGateWay:send -> ", JSON.stringify(
                e, null, "")), this.ws && this.ws.readyState === WebSocket.OPEN ? (this.ws.send(JSON.stringify(
                e)), {
                code: c.GATE_WAY_RESPONSE_CODE.OK
              }) : (this.adapterRef.logger.log("AbstractGateWay:send: 当前不能发送，等待ws连接成功之后发送"), {
                code: c.GATE_WAY_RESPONSE_CODE.NO_CONNECTION
              })
          }
        }, {
          key: "close",
          value: function() {
            this.adapterRef.logger.log("AbstractGateWay:close"), this.ws && this.ws.close()
          }
        }, {
          key: "destroy",
          value: function() {
            this.adapterRef.logger.log("AbstractGateWay:destroy"), this.close(), this.protocolHandler =
              null, this.url = null, this.ws.onopen = null, this.ws.onmessage = null, this.ws.onclose =
              null, this.ws.onerror = null, this.ws = null
          }
        }]), t
      }(s.EventEmitter);
      t.AbstractGateWay = l
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTCGateWay = void 0;
      var i = o(r(1)),
        n = o(r(4)),
        a = o(r(3));

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var s = function(e) {
        function t() {
          return (0, i.default)(this, t), (0, n.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(
            this, arguments))
        }
        return (0, a.default)(t, e), t
      }(r(355).AbstractGateWay);
      t.WebRTCGateWay = s
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.AbstractAdapter = void 0;
      var i = h(r(1)),
        n = h(r(4)),
        a = h(r(5)),
        o = h(r(3)),
        s = r(10),
        c = r(124),
        d = r(11),
        u = r(107),
        l = r(339),
        p = r(319),
        f = r(24);

      function h(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var m = r(309),
        v = function(e) {
          function t(e) {
            (0, i.default)(this, t);
            var r = (0, n.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return r._state = {
                system: u.RtcSupport.checkVersion()
              }, r._params = {
                appkey: ""
              }, r._reset(), Object.assign(r.adapterRef.tempInfo, {
                localContainer: e.container || null,
                remoteContainer: e.remoteContainer || null
              }), r.adapterRef.logger = new m({
                debug: e.debug,
                prefix: "WEBRTC"
              }), r.adapterRef.chromeId = e.chromeId, r.adapterRef.isPrivateDeployment = !1, r.adapterRef.privateDeploymentConf =
              null, r.adapterRef.debug = e.debug, r.adapterRef.mixAudioConf = null, r.adapterRef.mixVideoConf =
              null, r.adapterRef.nim = e.nim, r.apiList = e.apiList, r.sdkRef = e.ref, r.channelId = null, r._init(),
              r
          }
          return (0, o.default)(t, e), (0, a.default)(t, null, [{
            key: "getVideoSessionConfig",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.quality,
                r = void 0 === t ? d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL : t,
                i = e.frameRate,
                n = void 0 === i ? d.VIDEO_QUALITY.CHAT_VIDEO_FRAME_RATE_NORMAL : i,
                a = {},
                o = this.videoMap.frame[r];
              return a.frameRate = this.videoMap.frameRate[n], a.width = +o.split("x")[0], a.height = +o.split(
                "x")[1], a
            }
          }, {
            key: "getDeviceTypeMap",
            value: function(e) {
              return this.deviceTypeMap[e]
            }
          }]), (0, a.default)(t, [{
            key: "_reset",
            value: function() {
              this.apiList = [], this.sdkRef = null, this.adapterRef = {}, this._resetTempInfo(), this._resetSDK(),
                this._resetBusiness(), this._resetHelper(), this._resetApi(), this._resetState(), this._resetParams()
            }
          }, {
            key: "_resetSDK",
            value: function() {
              this.adapterRef.chromeId = null, this.adapterRef.debug = !1, this.adapterRef.nim = null
            }
          }, {
            key: "_resetTempInfo",
            value: function() {
              this.adapterRef.tempInfo || (this.adapterRef.tempInfo = {}), Object.assign(this.adapterRef.tempInfo, {
                localContainer: null,
                remoteContainer: null,
                localViewParams: null,
                localVideoDisabled: !1,
                localAudioDisabled: !1,
                localVideoMuted: !1,
                localAudioMuted: !1,
                remoteVideoMuteMap: {},
                remoteAudioMuteMap: {},
                joinChannelLiveConfig: {}
              })
            }
          }, {
            key: "_resetBusiness",
            value: function() {
              this.adapterRef.webrtcGateWayBusiness = null, this.adapterRef.deviceBusiness = null, this.adapterRef
                .webrtcBusiness = null
            }
          }, {
            key: "_resetHelper",
            value: function() {
              this.adapterRef.mediaRecordHelper = {}
            }
          }, {
            key: "_resetApi",
            value: function() {
              this.adapterRef.deviceApi = null, this.adapterRef.playApi = null, this.adapterRef.recordApi =
                null, this.adapterRef.commonApi = null, this.adapterRef.meeting4NRTCApi = null, this.adapterRef
                .meeting4WebRTCApi = null, this.adapterRef.captureApi = null, this.adapterRef.p2p4WebRTCApi =
                null
            }
          }, {
            key: "_resetState",
            value: function() {
              var e = this;
              this.adapterRef.imInfo = {
                  role: d.ROLE_FOR_MEETING.ROLE_PLAYER
                }, this.adapterRef.audioHelperMap = {}, this.adapterRef.audioHelperLocal = null, this.adapterRef
                .videoHelperMap = {}, this.adapterRef.videoHelperLocal = null, this.adapterRef.signalInited = !
                1, this.adapterRef.needQueryAccountMap = {}, this.adapterRef.account4UidMap = {}, this.adapterRef
                .uid4AccountMap = {}, this.adapterRef.isCaller = !1, this.adapterRef.calling = !1, this.adapterRef
                .callee = null, this.adapterRef.channelId = null, this.adapterRef.type = null, this.adapterRef
                .beCalledInfo = null, this.adapterRef.callerInfo = null, this.adapterRef.target = {
                  account: null,
                  uid: null
                }, this.adapterRef.callAccepted = !1, this.adapterRef.sessionMode = null, this.adapterRef
                .state = {
                  lastDeviceStatus: {
                    audio: {
                      type: null,
                      device: null
                    },
                    video: {
                      type: null,
                      device: null
                    }
                  },
                  audioDeviceHasOpened: !1,
                  videoDeviceHasOpened: !1,
                  chromeScreenShareOpened: !1,
                  isFirstOpenMediaDevice: !0,
                  rtcConnected: !1,
                  startSessionTime: null,
                  endSessionTime: null
                }, this.adapterRef.detectNetState = {
                  inDetecting: !1,
                  stream: null,
                  detectTimer: null,
                  detectDom: null,
                  canvasTimer: null,
                  canvasContainer: null,
                  outTimer: null
                }, this.adapterRef.reconnectState ? (this.adapterRef.reconnectState.count = 0, this.adapterRef
                  .reconnectState.isReconnect = !1, setTimeout(function() {
                    e.adapterRef.reconnectState && e.adapterRef.reconnectState.wssTime && clearInterval(
                      e.adapterRef.reconnectState.wssTime), e.adapterRef.reconnectState.isStoped = !1
                  }, 300)) : this.adapterRef.reconnectState = {
                  count: 0,
                  isReconnect: !1,
                  startReconnect: !1,
                  isStoped: !1,
                  wssTime: null
                }, this._setSessionConfig()
            }
          }, {
            key: "_resetParams",
            value: function() {
              Object.assign(this._params, d.ApiParams)
            }
          }, {
            key: "_resetParamNeededByReConnect",
            value: function() {
              this.adapterRef.webrtcBusiness._destroyRtcSelf(), this._doDestroyRemoteResourceByUid(),
                this.apiList = [], this.adapterRef.debug = !1, this.adapterRef.webrtcGateWayBusiness =
                null, this.adapterRef.deviceBusiness = null, this.adapterRef.webrtcBusiness = null, this.adapterRef
                .playApi = null, this.adapterRef.recordApi = null, this.adapterRef.commonApi = null, this
                .adapterRef.meeting4NRTCApi = null, this.adapterRef.meeting4WebRTCApi = null, this.adapterRef
                .captureApi = null, this.adapterRef.p2p4WebRTCApi = null, this.adapterRef.reconnectState.isReconnect = !
                1, this.adapterRef.statsReportHelper = null, this.adapterRef.logReportHelper = null
            }
          }, {
            key: "_init",
            value: function() {
              this._initBindEvents(), this._initBusiness(), this._initHelper(), this._initApi()
            }
          }, {
            key: "_initBindEvents",
            value: function() {
              var e = this;
              this.on(d.EVENT_OBJ.leaveChannel.key, function(t) {
                e.adapterRef.logger.log("AbstractAdapter: _initBindEvents: leaveChannel事件");
                var r = t.account,
                  i = t.uid;
                i || (i = e._getUidByAccount(r));
                var n = e.adapterRef.mediaRecordHelper[i];
                n && n.checkIsRecording() && (e.adapterRef.logger.log(
                  "AbstractAdapter: _initBindEvents: 对端" + r + "/" + i + "离开：正在录制远端视频，即将停止"), n.stop())
              }), window.addEventListener("beforeunload", function(t) {
                // e.adapterRef.logger.log("AbstractAdapter: _initBindEvents: beforeunload事件");
                // var r = e.adapterRef.mediaRecordHelper;
                // Object.values(r).forEach(function(e) {
                //   e && e.checkIsRecording() && e.download()
                // });
                // return (t || window.event).returnValue = "", ""
              })
            }
          }, {
            key: "_initBusiness",
            value: function() {
              this._initWebRTCGateWayBusiness(), this._initDeviceBusiness(), this._initWebRTCBusiness()
            }
          }, {
            key: "_initHelper",
            value: function() {}
          }, {
            key: "_initApi",
            value: function() {
              this._initDeviceApi(), this._initPlayApi(), this._initRecordApi(), this._initCommonApi(),
                this._initMeeting4NRTCApi(), this._initCaptureApi(), this._initMeeting4WebRTCApi(), this._initP2P4WebRTCApi()
            }
          }, {
            key: "_initWebRTCGateWayBusiness",
            value: function() {
              var e = this;
              if (this.adapterRef.webrtcGateWayBusiness) this.adapterRef.logger.log(
                "AbstractAdapter: _initWebRTCGateWayBusiness: 已存在webrtcGateWayBusiness，不重复创建!");
              else {
                this.adapterRef.logger.log(
                  "AbstractAdapter:_initWebRTCGateWayBusiness: 初始化webrtcGateWayBusiness");
                var t = this.adapterRef.webrtcGateWayBusiness = new l.WebRTCGateWayBusiness({
                  adapterRef: this.adapterRef,
                  sdkRef: this.sdkRef
                });
                t.on(d.EVENT_OBJ.userJoined.key, function(t) {
                  e.emit(d.EVENT_OBJ.userJoined.key, Object.assign(d.EVENT_OBJ.userJoined, t)), e.emit(
                    "joinChannel", t)
                }), t.on(d.EVENT_OBJ.userLeft.key, function(t) {
                  e.adapterRef.recordApi.stopMediaRecordingByUid(t.uid), e.emit(d.EVENT_OBJ.userLeft.key,
                    Object.assign(d.EVENT_OBJ.userLeft, t)), e.emit("leaveChannel", t)
                }), t.on(d.EVENT_OBJ.userStateUpdated.key, function(t) {
                  e.emit(d.EVENT_OBJ.userStateUpdated.key, Object.assign(d.EVENT_OBJ.userStateUpdated,
                    t)), e.emit("remoteStreamUpdate", t)
                }), t.on(d.EVENT_OBJ.hangup.key, function(t) {
                  e.emit(d.EVENT_OBJ.hangup.key, Object.assign(d.EVENT_OBJ.hangup, t, e.getChannelInfo())),
                    e.hangup ? e.hangup() : e.leaveChannel && e.leaveChannel()
                }), t.on(d.EVENT_OBJ.leaveChannel.key, function(t) {
                  e.emit(d.EVENT_OBJ.leaveChannel.key, Object.assign(d.EVENT_OBJ.leaveChannel, t, e.getChannelInfo())),
                    e.leaveChannel()
                }), t.on(d.EVENT_OBJ.gatewayClosed.key, function(t) {
                  e.emit(d.EVENT_OBJ.gatewayClosed.key, Object.assign(d.EVENT_OBJ.gatewayClosed, t))
                }), t.on(d.EVENT_OBJ.error.key, function(t) {
                  e.emit(d.EVENT_OBJ.error.key, Object.assign(d.EVENT_OBJ.error, t))
                })
              }
            }
          }, {
            key: "_initDeviceBusiness",
            value: function() {
              this._isWeixinBrowser() || (this.adapterRef.deviceBusiness ? this.adapterRef.logger.log(
                "AbstractAdapter: _initDeviceBusiness: deviceBusiness已存在，不重复创建！") : (this.adapterRef.logger
                .log("AbstractAdapter: _initDeviceBusiness: 初始化deviceBusiness"), this.adapterRef.deviceBusiness =
                new l.DeviceBusiness({
                  adapterRef: this.adapterRef,
                  sdkRef: this.sdkRef
                })))
            }
          }, {
            key: "_startDevicesByMode",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = e.video,
                r = void 0 === t || t,
                i = e.audio,
                n = void 0 === i || i,
                a = e.videoDeviceId,
                o = e.audioDeviceId,
                s = [],
                c = this.adapterRef.deviceApi;
              return r && s.push(c.startDevice({
                type: d.DEVICE_TYPE.DEVICE_TYPE_VIDEO,
                device: {
                  deviceId: a
                }
              })), n && s.push(c.startDevice({
                type: d.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN,
                device: {
                  deviceId: o
                }
              })), Promise.all(s)
            }
          }, {
            key: "_checkDevicePermissionEnabled",
            value: function(e) {
              return !this.adapterRef.tempInfo.localVideoDisabled || e.type !== d.DEVICE_TYPE.DEVICE_TYPE_VIDEO &&
                e.type !== d.DEVICE_TYPE.DEVICE_TYPE_DESKTOP_CHROME_SCREEN ? e.type === d.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN &&
                this.adapterRef.tempInfo.localAudioDisabled ? Promise.reject(d.AudioErrorCode.AudioDisabled) :
                Promise.resolve() : Promise.reject(d.VideoErrorCode.VideoDisabled)
            }
          }, {
            key: "_initWebRTCBusiness",
            value: function() {
              this.adapterRef.webrtcBusiness ? this.adapterRef.logger.log(
                "AbstractAdapter: _initWebRTCBusiness: 已存在的webrtcBusiness对象，不需要重复创建...") : (this.adapterRef
                .logger.log("AbstractAdapter: _initWebRTCBusiness: 创建webrtcBusiness对象"), this.adapterRef
                .webrtcBusiness = new l.WebRTCBusiness({
                  adapterRef: this.adapterRef,
                  sdkRef: this.sdkRef
                }))
            }
          }, {
            key: "_initIMBusiness",
            value: function() {
              this.adapterRef.imBusiness ? this.adapterRef.logger.log(
                "AbstractAdapter: _initIMBusiness: 已存在的imBusiness, 不重复创建!") : (this.adapterRef.logger.log(
                  "AbstractAdapter: _initIMBusiness: 初始化imBusiness"), this.adapterRef.imBusiness = new l
                .IMBusiness({
                  adapterRef: this.adapterRef,
                  sdkRef: this.sdkRef
                }))
            }
          }, {
            key: "_getWebRTCGateWayManager",
            value: function() {
              return this.adapterRef.webrtcGateWayBusiness.webRTCGateWayManager
            }
          }, {
            key: "_getAudioHelperByUid",
            value: function(e) {
              e = "" + e;
              var t = "" + this.adapterRef.imInfo.uid,
                r = "local" === e || e === t,
                i = null;
              return (i = r ? this.adapterRef.audioHelperLocal : this.adapterRef.audioHelperMap[e]) || (i =
                  new c.AudioHelper({
                    uid: e,
                    isRemote: !r,
                    sdkRef: this.sdkRef,
                    adapterRef: this.adapterRef
                  }), r ? this.adapterRef.audioHelperLocal = i : this.adapterRef.audioHelperMap[e] = i),
                r && "local" !== e && this.adapterRef.audioHelperLocal.setUid(e), i
            }
          }, {
            key: "_getVideoHelperByUid",
            value: function(e) {
              e = "" + e;
              var t = "" + this.adapterRef.imInfo.uid,
                r = "local" === e || e === t,
                i = null;
              return (i = r ? this.adapterRef.videoHelperLocal : this.adapterRef.videoHelperMap[e]) || (i =
                  new c.VideoHelper({
                    uid: e,
                    sdkRef: this.sdkRef,
                    adapterRef: this.adapterRef
                  }), r ? this.adapterRef.videoHelperLocal = i : this.adapterRef.videoHelperMap[e] = i),
                r && "local" !== e && this.adapterRef.videoHelperLocal.setUid(e), i
            }
          }, {
            key: "_getVideoHelperByUidWithoutCreate",
            value: function(e) {
              e = "" + e;
              var t = "" + this.adapterRef.imInfo.uid,
                r = "local" === e || e === t,
                i = null;
              return i = r ? this.adapterRef.videoHelperLocal : this.adapterRef.videoHelperMap[e], r &&
                "local" !== e && this.adapterRef.videoHelperLocal.setUid(e), i
            }
          }, {
            key: "_startPushVideoStream",
            value: function() {
              var e = this._getVideoHelperByUid("local");
              return e && e.getLocalVideoStream(!1) ? e.startPushLocalVideoStream() : Promise.resolve()
            }
          }, {
            key: "_stopPushVideoStream",
            value: function() {
              var e = this._getVideoHelperByUid("local");
              return e && e.getLocalVideoStream(!0) && e.stopPushLocalVideoStream(), Promise.resolve()
            }
          }, {
            key: "_startPushAudioStream",
            value: function() {
              var e = this._getAudioHelperByUid("local");
              return e && e.getLocalAudioStream(!1) ? e.startPushLocalAudioStream() : Promise.resolve()
            }
          }, {
            key: "_stopPushAudioStream",
            value: function() {
              var e = this._getAudioHelperByUid("local");
              return e && e.getLocalAudioStream(!0) && e.stopPushLocalAudioStream(), Promise.resolve()
            }
          }, {
            key: "_updateRtc",
            value: function() {
              var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              return this.adapterRef.instance._isPlayer() || this.adapterRef.webrtcBusiness.selfWebRtcInstance ?
                (this.adapterRef.logger.log("AbstractAdapter: _updateRtc: isUpdate=%s ", e), this.selfWebRtcInstance ||
                  this.adapterRef.webrtcBusiness._initWebRTCInstance4Self(!0), this.adapterRef.webrtcBusiness
                  .selfWebRtcInstance && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection &&
                  this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.localDescription &&
                  this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.getSenders().length > 0 &&
                  this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState &&
                  "connected" !== this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState &&
                  "completed" !== this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState ?
                  (this.adapterRef.logger.warn("AbstractAdapter: _updateRtc: update rtc later"), Promise.resolve()) :
                  (this.adapterRef.webrtcBusiness._updateRtcStream(), this.adapterRef.webrtcBusiness._createOffer({
                    isUpdate: e
                  }))) : (this.adapterRef.logger.warn(
                  "AbstractAdapter: _updateRtc: 非互动者并且自己的RTC实例不存在，直接返回..."), Promise.resolve())
            }
          }, {
            key: "_initDeviceApi",
            value: function() {
              this.adapterRef.deviceApi ? this.adapterRef.logger.log(
                "AbstractAdapter: _initDeviceApi: deviceApi已初始化，不重复创建!") : (this.adapterRef.logger.log(
                "AbstractAdapter: _initDeviceApi: 初始化deviceApi"), this.adapterRef.deviceApi = new p.DeviceApi({
                adapterRef: this.adapterRef,
                sdkRef: this.sdkRef
              }))
            }
          }, {
            key: "_initPlayApi",
            value: function() {
              this.adapterRef.playApi ? this.adapterRef.logger.log(
                "AbstractAdapter: _initPlayApi: playApi已初始化，不用重复创建!") : (this.adapterRef.logger.log(
                "AbstractAdapter: _initPlayApi: 初始化playAPI"), this.adapterRef.playApi = new p.PlayApi({
                adapterRef: this.adapterRef,
                sdkRef: this.sdkRef
              }))
            }
          }, {
            key: "_initRecordApi",
            value: function() {
              this.adapterRef.recordApi ? this.adapterRef.logger.log(
                "AbstractAdapter: _initRecordApi: recordApi已初始化，不用重复创建！") : (this.adapterRef.logger.log(
                "AbstractAdapter: _initRecordApi: 初始化recordApi"), this.adapterRef.recordApi = new p.RecordApi({
                adapterRef: this.adapterRef,
                sdkRef: this.sdkRef
              }))
            }
          }, {
            key: "_initCommonApi",
            value: function() {
              this.adapterRef.commonApi ? this.adapterRef.logger.log(
                "AbstractAdapter: _initCommonApi: commonApi已初始化，不用重复创建！") : (this.adapterRef.logger.log(
                "AbstractAdapter: _initCommonApi: 初始化commonApi"), this.adapterRef.commonApi = new p.CommonApi({
                adapterRef: this.adapterRef,
                sdkRef: this.sdkRef
              }))
            }
          }, {
            key: "_initMeeting4NRTCApi",
            value: function() {
              this.adapterRef.meeting4NRTCApi ? this.adapterRef.logger.log(
                "AbstractAdapter: _initMeeting4NRTCApi: meeting4NRTCApi已初始化，不用重复创建！") : (this.adapterRef
                .logger.log("AbstractAdapter: _initMeeting4NRTCApi: 初始化meeting4NRTCApi"), this.adapterRef
                .meeting4NRTCApi = new p.Meeting4NRTCApi({
                  adapterRef: this.adapterRef,
                  sdkRef: this.sdkRef
                }))
            }
          }, {
            key: "_initCaptureApi",
            value: function() {
              this.adapterRef.captureApi ? this.adapterRef.logger.log(
                "AbstractAdapter: _initCaptureApi: captureApi已初始化，不用重复创建!") : (this.adapterRef.logger.log(
                  "AbstractAdapter: _initCaptureApi: 初始化captureApi"), this.adapterRef.captureApi = new p
                .CaptureApi({
                  adapterRef: this.adapterRef,
                  sdkRef: this.sdkRef
                }))
            }
          }, {
            key: "_initMeeting4WebRTCApi",
            value: function() {
              this.adapterRef.meeting4WebRTCApi ? this.adapterRef.logger.log(
                "AbstractAdapter: _initMeeting4WebRTCApi: meeting4WebRTCApi已初始化，不用重复创建！") : (this.adapterRef
                .logger.log("AbstractAdapter: _initMeeting4WebRTCApi: 初始化meeting4WebRTCApi"), this.adapterRef
                .meeting4WebRTCApi = new p.Meeting4WebRTCApi({
                  adapterRef: this.adapterRef,
                  sdkRef: this.sdkRef
                }))
            }
          }, {
            key: "_initP2P4WebRTCApi",
            value: function() {
              this.adapterRef.p2p4WebRTCApi ? this.adapterRef.logger.log(
                "AbstractAdapter: _initP2P4WebRTCApi: p2p4WebRTCApi已初始化，不用重复创建！") : (this.adapterRef.logger
                .log("AbstractAdapter: _initP2P4WebRTCApi: 初始化p2p4WebRTCApi"), this.adapterRef.p2p4WebRTCApi =
                new p.P2P4WebRTCApi({
                  adapterRef: this.adapterRef,
                  sdkRef: this.sdkRef
                }))
            }
          }, {
            key: "_initApiReportHelper",
            value: function() {
              this.adapterRef.logger.log("AbstractAdapter: _initApiReportHelper"), this.adapterRef.apiReportHelper ||
                (this.adapterRef.apiReportHelper = new c.ApiReportHelper({
                  sdkRef: this.sdkRef,
                  adapterRef: this.adapterRef,
                  platform: d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE]
                }))
              console.log('this.adapterRef.apiReportHelper', this.adapterRef.apiReportHelper);
            }
          }, {
            key: "_initLogReportHelper",
            value: function() {
              this.adapterRef.logger.log("AbstractAdapter: _initLogReportHelper"), this.adapterRef.logReportHelper ||
                (this.adapterRef.logReportHelper = new c.LogReportHelper)
            }
          }, {
            key: "_initStatsReportHelper",
            value: function() {
              this.adapterRef.logger.log("AbstractAdapter: _initStatsReportHelper"), this.adapterRef.statsReportHelper ||
                (this.adapterRef.statsReportHelper = new c.StatsReportHelper({
                  sdkRef: this.sdkRef,
                  adapterRef: this.adapterRef
                }))
            }
          }, {
            key: "doClearAfterRemoteLeave",
            value: function(e) {
              this._doDestroyRemoteResourceByUid(e)
            }
          }, {
            key: "_doDestroyRemoteResourceByUid",
            value: function(e) {
              var t = this;
              if (this.adapterRef.logger.log("AbstractAdapter: _doDestroyRemoteResourceByUid: uid=%o", e),
                e) return this._doDestroyRemoteRtcByUid(e), this._doDestroyRemoteMediaStreamByUid(e),
                void this._doDestroyMediaHelperByUid(e);
              var r = [],
                i = Object.keys(this.adapterRef.videoHelperMap),
                n = Object.keys(this.adapterRef.audioHelperMap);
              0 != i.length ? r = i : 0 != n.length && (r = n), r.map(function(e) {
                t._doDestroyRemoteRtcByUid(e), t._doDestroyRemoteMediaStreamByUid(e), t._doDestroyMediaHelperByUid(
                  e)
              })
            }
          }, {
            key: "_doDestroyRemoteRtcByUid",
            value: function(e) {
              e ? this.adapterRef.webrtcBusiness ? (this.adapterRef.logger.log(
                    "AbstractAdapter: _doDestroyRemoteRtcByUid: uid=%o", e), this.adapterRef.webrtcBusiness
                  ._destroyRtcByUid(e)) : this.adapterRef.logger.warn(
                  "AbstractAdapter: _doDestroyRemoteRtcByUid: 不存在的webrtcBusiness对象!") : this.adapterRef.logger
                .warn("AbstractAdapter: _doDestroyRemoteRtcByUid: 未传入UID！")
            }
          }, {
            key: "_doDestroyRemoteMediaStreamByUid",
            value: function(e) {
              if (e) {
                this.adapterRef.logger.log("AbstractAdapter:_doDestroyRemoteMediaStreamByUid uid=%o", e);
                var t = this._getAudioHelperByUid(e);
                t && t.remoteAudioStream && (t.removeTrackFromMediaStream(t.remoteAudioStream), this.adapterRef
                  .webrtcBusiness.switchTrackEvent({
                    stream: t.remoteAudioStream,
                    uid: e,
                    bindTrackEvent: !1
                  }), t.remoteAudioStream = null);
                var r = this._getVideoHelperByUid(e);
                r && r.remoteVideoStream && (r.removeTrackFromMediaStream(r.remoteVideoStream), this.adapterRef
                  .webrtcBusiness.switchTrackEvent({
                    stream: r.remoteVideoStream,
                    uid: e,
                    bindTrackEvent: !1
                  }), r.remoteVideoStream = null)
              } else this.adapterRef.logger.error(
                "AbstractAdapter: _doDestroyRemoteMediaStreamByUid: 未传入UID！")
            }
          }, {
            key: "_isSupportWebrtc",
            value: function() {
              return u.RtcSupport.checkWebRtc()
            }
          }, {
            key: "_extractVersion",
            value: function(e, t, r) {
              var i = e.match(t);
              return i && i.length >= r && parseInt(i[r], 10)
            }
          }, {
            key: "_isFirefox",
            value: function() {
              return /Firefox/gi.test(navigator.userAgent)
            }
          }, {
            key: "_isChrome",
            value: function() {
              return /Chrome/gi.test(navigator.userAgent)
            }
          }, {
            key: "_isChrome72",
            value: function() {
              var e = this._extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
              return !!(e && e >= 72)
            }
          }, {
            key: "_isSafari",
            value: function() {
              return /^((?!chrome).)*safari((?!chrome).)*$/gi.test(navigator.userAgent)
            }
          }, {
            key: "_isMobileSafari",
            value: function() {
              return this._isSafari() && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
            }
          }, {
            key: "_isWeixinBrowser",
            value: function() {
              return /micromessenger/.test(navigator.userAgent.toLowerCase())
            }
          }, {
            key: "_isFirefoxMoreThan59",
            value: function() {
              return this._isFirefox() && this._status.system.version >= 59
            }
          }, {
            key: "_isFirefoxLessThan59",
            value: function() {
              return this._isFirefox() && this._status.system.version < 59
            }
          }, {
            key: "_doRemoteStream",
            value: function(e, t, r) {
              this._isFirefox() ? this._doRemoteStream4Firefox(e, t, r) : this._doRemoteStream4Other(e, t,
                r)
            }
          }, {
            key: "_doRemoteStream4Firefox",
            value: function(e, t, r) {
              if (e)
                if (this.adapterRef.imInfo.netDetect) this.adapterRef.logger.log(
                  "AbstractAdapter: _doRemoteStream4Firefox: 网络探测,%s", this.adapterRef.imInfo.netDetect
                );
                else {
                  var i = this._getAudioHelperByUid(t),
                    n = this._getVideoHelperByUid(t);
                  if (this.adapterRef.webrtcBusiness.getRtcObject(t))
                    if (r) {
                      this.adapterRef.logger.log(
                        "AbstractAdapter:_doRemoteStream4Firefox: remote stream uid: %s, track num: %d " +
                        t + " " + e.getTracks().length);
                      var a = e.getAudioTracks()[0],
                        o = e.getVideoTracks()[0];
                      a && i.setIsRemote(!0).composeTrack(t, a), o && n.setIsRemote(!0).composeTrack(t, o),
                        this.emit(d.EVENT_OBJ.remoteTrack.key, {
                          uid: t,
                          account: this._getAccountByUid(t),
                          track: r
                        })
                    } else this.adapterRef.logger.warn(
                      "AbstractAdapter: _doRemoteStream4Firefox: 不存在的轨道...");
                  else this.adapterRef.logger.error(
                    "AbstractAdapter: _doRemoteStream4Firefox: 不存在的远程rtc对象 , track")
                }
              else this.adapterRef.logger.error("AbstractAdapter: _doRemoteStream4Firefox: 远程流不存在!")
            }
          }, {
            key: "_doRemoteStream4Other",
            value: function(e, t, r) {
              var i = this;
              if (e)
                if (this.adapterRef.imInfo.netDetect) this.adapterRef.logger.log(
                  "AbstractAdapter: _doRemoteStream4Other 网络探测...");
                else {
                  this.adapterRef.logger.log(
                    "AbstractAdapter:_doRemoteStream4Other remote stream uid: %s, track num: %d", t, e.getTracks()
                    .length), e.getTracks().forEach(function(e) {
                    i.adapterRef.logger.log(
                      "AbstractAdapter: _doRemoteStream4Other: track kind=%s, id=%s", e.kind, e.id)
                  });
                  var n = e.getAudioTracks()[0],
                    a = e.getVideoTracks()[0];
                  n && this._getAudioHelperByUid(t).setIsRemote(!0).composeTrack(t, n), a && this._getVideoHelperByUid(
                    t).setIsRemote(!0).composeTrack(t, a), this.adapterRef.webrtcBusiness.switchTrackEvent({
                    stream: e,
                    uid: t
                  }), n && this.emit(d.EVENT_OBJ.remoteTrack.key, {
                    uid: t,
                    account: this._getAccountByUid(t),
                    track: n
                  }), a && this.emit(d.EVENT_OBJ.remoteTrack.key, {
                    uid: t,
                    account: this._getAccountByUid(t),
                    track: a
                  })
                }
              else this.adapterRef.logger.error("AbstractAdapter: _doRemoteStream4Other 远程流不存在...")
            }
          }, {
            key: "_setSessionConfig",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this.adapterRef.imInfo || (this.adapterRef.imInfo = {}), this.adapterRef.imInfo.sessionConfig ||
                (this.adapterRef.imInfo.sessionConfig = d.DEFAULT_SESSION_CONFIG), this.adapterRef.imInfo
                .sessionConfig = Object.assign(this.adapterRef.imInfo.sessionConfig, e)
            }
          }, {
            key: "_startSessionInit",
            value: function() {
              this.adapterRef.logger.log("AbstractAdapter: _startSessionInit: 待校验的imInfo: %o", this.adapterRef
                  .imInfo), this.adapterRef.imInfo.cid = this.adapterRef.imInfo.cid || this.adapterRef.imInfo
                .channelId, this.channelId = this.adapterRef.imInfo.cid, this.adapterRef.imInfo.sessionMode =
                this.adapterRef.imInfo.sessionMode || d.SESSION_MODE.P2P, this.adapterRef.imInfo.serverMap &&
                this.adapterRef.imInfo.serverMap.constructor === String && (this.adapterRef.imInfo.serverMap =
                  JSON.parse(this.adapterRef.imInfo.serverMap)), this.SDK_TYPE === d.CONFIG_MAP.SDK_TYPE.NRTC ||
                this.adapterRef.imInfo.netDetect ? (this.adapterRef.logger.log(
                  "AbstractAdapter: _startSessionInit: NRTCAdapter实例 额外校验字段..."), f.tool.verifyOptions(
                  this.adapterRef.imInfo, "cid uid token sessionMode wssArr")) : this.adapterRef.imInfo.token =
                this.adapterRef.imInfo.cid, this.adapterRef.imInfo.sessionConfig.videoQuality === d.VIDEO_QUALITY
                .CHAT_VIDEO_QUALITY_NORMAL && this._setSessionConfig({
                  videoQuality: d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_480P
                });
              var e = (this.adapterRef.imInfo.clientConfig && JSON.parse(this.adapterRef.imInfo.clientConfig) ||
                {}).quality_level_limit || this.adapterRef.imInfo.sessionConfig.maxVideoQuality;
              this.adapterRef.logger.log("maxQuality:", e, ", quality:", this.adapterRef.imInfo.sessionConfig
                .videoQuality), this.adapterRef.imInfo.sessionConfig.videoQuality > e && this._setSessionConfig({
                videoQuality: e
              }), this.adapterRef.logger.log("quality:", this.adapterRef.imInfo.sessionConfig.videoQuality);
              var t = this.sdkRef.getVideoSessionConfig({
                quality: this.adapterRef.imInfo.sessionConfig.videoQuality,
                frameRate: this.adapterRef.imInfo.sessionConfig.videoFrameRate
              });
              if (this.adapterRef.imInfo = Object.assign(this.adapterRef.imInfo, {
                  videoConfig: t
                }), this.adapterRef.logger.log("AbstractAdapter: _startSessionInit: 启动会话后的imInfo: ", JSON
                  .stringify(this.adapterRef.imInfo, null, " ")), this._init(), this._initStatsReportHelper(),
                this._initApiReportHelper(), this._initLogReportHelper(), this.adapterRef.statsReportHelper
                .startStats(), this.adapterRef.logReportHelper.uploadData("sessionInfo", this.adapterRef.imInfo),
                this.adapterRef.apiReportHelper.uploadDataApi("start", {
                  uid: this.adapterRef.imInfo.uid
                }), this.adapterRef.apiReportHelper.uploadDataApi("update", {
                  key: "meeting"
                }), this.adapterRef.apiReportHelper.uploadDataApi("update", {
                  key: this.adapterRef.imInfo.sessionMode
                }), this.adapterRef.imInfo.sessionConfig.recordAudio && this.adapterRef.apiReportHelper.uploadDataApi(
                  "update", {
                    key: "server_record_audio"
                  }), this.adapterRef.imInfo.sessionConfig.recordVideo && this.adapterRef.apiReportHelper
                .uploadDataApi("update", {
                  key: "server_record_video"
                }), this.adapterRef.imInfo.sessionConfig.singleRecord && this.adapterRef.apiReportHelper.uploadDataApi(
                  "update", {
                    key: "server_record_single_user"
                  }), this.adapterRef.imInfo.sessionConfig.highAudio && this.adapterRef.apiReportHelper.uploadDataApi(
                  "update", {
                    key: "hd_audio"
                  }), void 0 !== this.adapterRef.imInfo.sessionConfig.videoFrameRate && this.adapterRef.apiReportHelper
                .uploadDataApi("update", {
                  key: "fps",
                  ext: 0 == +this.adapterRef.imInfo.sessionConfig.videoFrameRate ? 0 : +this.adapterRef
                    .imInfo.sessionConfig.videoFrameRate + 1
                }), this.adapterRef.imInfo.sessionConfig.liveEnable && this.adapterRef.apiReportHelper.uploadDataApi(
                  "update", {
                    key: "bypass",
                    ext: void 0 !== this.adapterRef.imInfo.sessionConfig.splitMode ? +this.adapterRef.imInfo
                      .sessionConfig.splitMode + 1 : 0
                  }), void 0 !== this.adapterRef.imInfo.sessionConfig.videoQuality) {
                var r = +this.adapterRef.imInfo.sessionConfig.videoQuality;
                r === d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P ? r = d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P :
                  r === d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P && (r = d.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_540P),
                  this.adapterRef.apiReportHelper.uploadDataApi("update", {
                    key: "video_quality",
                    ext: r || 0
                  })
              }
            }
          }, {
            key: "_startSession",
            value: function() {
              return this._startSessionInit(), this.adapterRef.webrtcGateWayBusiness.doTryInit()
            }
          }, {
            key: "_stopSession",
            value: function() {
              var e = this;
              return this._stopAllDataUpload(), this._stopIfInRecording().then(function() {
                return e._resetStatus(), Promise.resolve()
              })
            }
          }, {
            key: "_stopAllDataUpload",
            value: function() {
              this.adapterRef.statsReportHelper ? this.adapterRef.statsReportHelper.stopStats() : this.adapterRef
                .logger.log("AbstractAdapter: _stopSession: 已停止stats统计，请勿重复！"), this.adapterRef.apiReportHelper ?
                this.adapterRef.apiReportHelper.uploadDataApi("send") : this.adapterRef.logger.log(
                  "AbstractAdapter: _stopSession: 已停止api统计，请勿重复！"), this.adapterRef.logReportHelper ?
                this.adapterRef.logReportHelper.uploadData("send") : this.adapterRef.logger.log(
                  "AbstractAdapter: _stopSession: 已停止log统计，请勿重复！")
            }
          }, {
            key: "_doDestroyLocalMediaStream",
            value: function() {
              this._doDestroyLocalMediaStream4Audio(), this._doDestroyLocalMediaStream4Video()
            }
          }, {
            key: "_doDestroyLocalMediaStream4Audio",
            value: function() {
              var e = this._getAudioHelperByUid("local");
              e && e.localAudioStream && (e.localAudioStream = null, e.destroyMedia()), e && e.mixAudioConf &&
                Object.keys(e.mixAudioConf.audioBuffer).length && e.stopAudioMixing()
            }
          }, {
            key: "_doDestroyLocalMediaStream4Video",
            value: function() {
              var e = this._getVideoHelperByUid("local");
              e && e.localVideoStream && (e.localVideoStream = null)
            }
          }, {
            key: "_stopIfInRecording",
            value: function() {
              var e = [],
                t = this.adapterRef.mediaRecordHelper;
              return Object.values(t).forEach(function(t) {
                t && t.checkIsRecording() && (e.push(t.stop()), e.push(t.clean()))
              }), Promise.all(e)
            }
          }, {
            key: "_isDetectNetworkOfselfWebRtcConnected",
            value: function() {
              if (this.adapterRef && this.adapterRef.webrtcBusiness && this.adapterRef.webrtcBusiness.selfWebRtcInstance &&
                this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection && this.adapterRef.webrtcBusiness
                .selfWebRtcInstance.rtcConnection) return this.adapterRef && this.adapterRef.webrtcBusiness &&
                this.adapterRef.webrtcBusiness.selfWebRtcInstance && this.adapterRef.webrtcBusiness.selfWebRtcInstance
                .rtcConnection && this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState &&
                ("completed" == this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState ||
                  "connected" == this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection.iceConnectionState
                )
            }
          }, {
            key: "_isDetectNetworkOfremoteWebRtcConnected",
            value: function() {
              if (this.adapterRef && this.adapterRef.webrtcBusiness && this.adapterRef.webrtcBusiness.remoteWebRtcInstanceMap) {
                var e = this.adapterRef.webrtcBusiness._getRemoteWebRtcInstance(this.adapterRef.imInfo.remoteUid);
                if (e && e.rtcConnection) return e.rtcConnection && ("completed" == e.rtcConnection.iceConnectionState ||
                  "connected" == e.rtcConnection.iceConnectionState)
              }
              return !1
            }
          }, {
            key: "_isDetectNetwork",
            value: function() {
              return this._isDetectNetworkOfselfWebRtcConnected() && this._isDetectNetworkOfremoteWebRtcConnected()
            }
          }, {
            key: "_resetStatus",
            value: function() {
              this.adapterRef.logger.log("AbstractAdapter:_resetStatus"), this.adapterRef.imInfo && this.adapterRef
                .imInfo.uid && (this._getVideoHelperByUid("local").destroy(), this.adapterRef.deviceApi.stopDevice(
                  d.DEVICE_TYPE.DEVICE_TYPE_AUDIO_IN), this.adapterRef.deviceApi.stopDevice(d.DEVICE_TYPE
                  .DEVICE_TYPE_VIDEO), this._doDestroyLocalMediaStream()), this._doDestroyRemoteResourceByUid(),
                this._doDestroyBusinessObjects(), this._doDestroyApiObjects(), this._doDestroyHelperObjects(),
                this._resetState()
            }
          }, {
            key: "_doDestroyBusinessObjects",
            value: function() {
              this.adapterRef.logger.log("AbstractAdapter: _doDestroyBusinessObjects: 销毁Business类子对象 "),
                this.adapterRef.webrtcGateWayBusiness && (this.adapterRef.webrtcGateWayBusiness.destroy(),
                  this.adapterRef.webrtcGateWayBusiness = null), this.adapterRef.deviceBusiness && (this.adapterRef
                  .deviceBusiness.destroy(), this.adapterRef.deviceBusiness = null), this.adapterRef.webrtcBusiness &&
                (this.adapterRef.webrtcBusiness.destroy(), this.adapterRef.webrtcBusiness = null)
            }
          }, {
            key: "_doDestroyApiObjects",
            value: function() {
              this.adapterRef.logger.log("AbstractAdapter: _doDestroyApiObjects: 销毁Api类子对象 ")
            }
          }, {
            key: "_doDestroyHelperObjects",
            value: function() {
              this.adapterRef.logger.log("AsbtractAdapter: _doDestroyHelperObjects: 销毁helper类子对象"), this.adapterRef
                .statsReportHelper && (this.adapterRef.statsReportHelper = null), this.adapterRef.logReportHelper &&
                (this.adapterRef.logReportHelper = null)
            }
          }, {
            key: "_doDestroyMediaHelperByUid",
            value: function(e) {
              this.adapterRef.logger.log("AbstractAdapter: _doDestroyMediaHelperByUid: uid=%o", e), this._doDestroyAudioHelperByUid(
                e), this._doDestroyVideoHelperByUid(e)
            }
          }, {
            key: "_doDestroyAudioHelperByUid",
            value: function(e) {
              if (this.adapterRef.logger.log("AbstractAdapter: _doDestroyAudioHelperByUid: uid=%o", e),
                "local" === e || e === this.adapterRef.imInfo.uid) {
                var t = this._getAudioHelperByUid("local");
                return t.destroy(), void(t = null)
              }
              var r = this.adapterRef.audioHelperMap[e];
              r && (r.destroy(), r = null), delete this.adapterRef.audioHelperMap[e]
            }
          }, {
            key: "_doDestroyVideoHelperByUid",
            value: function(e) {
              if (this.adapterRef.logger.log("AbstractAdapter: _doDestroyVideoHelperByUid: uid=%o", e),
                console.warn("AbstractAdapter: _doDestroyVideoHelperByUid: imInfo的uid", this.adapterRef.imInfo
                  .uid), "local" === e || e === this.adapterRef.imInfo.uid) {
                var t = this._getVideoHelperByUid("local");
                return t.destroy(), void(t = null)
              }
              var r = this.adapterRef.videoHelperMap[e];
              r && (r.destroy(), r = null), console.warn(
                  "AbstractAdapter: _doDestroyVideoHelperByUid: 清除前%o", this.adapterRef.videoHelperMap),
                delete this.adapterRef.videoHelperMap[e], console.warn(
                  "AbstractAdapter: _doDestroyVideoHelperByUid: 清除后%o", this.adapterRef.videoHelperMap)
            }
          }, {
            key: "_isPlayer",
            value: function() {
              return this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.MEETING && this.adapterRef.imInfo
                .role === d.ROLE_FOR_MEETING.ROLE_PLAYER || this.adapterRef.imInfo.sessionMode === d.SESSION_MODE
                .P2P
            }
          }, {
            key: "_getUidByAccount",
            value: function(e) {
              var t = this.adapterRef.account4UidMap[e];
              return this.adapterRef.logger.log("AbstractAdapter: _getUidByAccount: " + e + " => " + t),
                t
            }
          }, {
            key: "_getAccountByUid",
            value: function(e) {
              var t = this.adapterRef.uid4AccountMap[e];
              return this.adapterRef.logger.log("AbstractAdapter: _getAccountByUid: " + e + " => " + t),
                t
            }
          }, {
            key: "_convertToUidIfAccout",
            value: function(e) {
              var t = e;
              return d.CONFIG_MAP.SDK_NAME[d.CONFIG_MAP.CURRENT.SDK_TYPE] === d.CONFIG_MAP.SDK_TYPE.WEBRTC &&
                (t = this.adapterRef.instance._getUidByAccount(e)), t
            }
          }, {
            key: "_validateVideoQuality",
            value: function(e) {
              return (0, d.validateVideoQuality)(e)
            }
          }, {
            key: "_validateVideoFrameRate",
            value: function(e) {
              return (0, d.validateVideoFrameRate)(e)
            }
          }, {
            key: "_onSignalTimeout",
            value: function(e) {
              this.adapterRef.webrtcGateWayBusiness && this.adapterRef.webrtcGateWayBusiness._onSignalTimeout ?
                (this.adapterRef.logger.warn("AbstractAdapter: _onSignalTimeout: 即将执行_onSignalTimeout"),
                  this.adapterRef.webrtcGateWayBusiness._onSignalTimeout()) : this.adapterRef.logger.log(
                  "AbstractAdapter: _onSignalTimeout: _onSignalTimeout undefined！")
            }
          }, {
            key: "_judgeSendSdpOfferOrUpdate",
            value: function() {
              this.adapterRef.logger.log("AbstractAdapter: _judgeSendSdpOfferOrUpdate: " + this.adapterRef
                .state.isFirstOpenMediaDevice), 1 == this.adapterRef.state.isFirstOpenMediaDevice ? (
                this.adapterRef.instance._updateRtc(!1), this.adapterRef.state.isFirstOpenMediaDevice = !
                1) : this.adapterRef.instance._updateRtc(!0)
            }
          }, {
            key: "checkExist",
            value: function(e) {
              return !!this[e]
            }
          }, {
            key: "setStartSessionTime",
            value: function() {
              this.adapterRef.state.startSessionTime = Date.now()
            }
          }, {
            key: "setEndSessionTime",
            value: function() {
              if (this.adapterRef.state.startSessionTime) {
                this.adapterRef.state.endSessionTime = Date.now();
                var e = this.adapterRef.state.endSessionTime - this.adapterRef.state.startSessionTime;
                this.emit(d.EVENT_OBJ.sessionDuration.key, e), this.adapterRef.state.startSessionTime = 0,
                  this.adapterRef.state.endSessionTime = 0
              } else this.adapterRef.logger.log("AbstractAdapter: setEndSessionTime: startSessionTime为空")
            }
          }, {
            key: "_startCamera",
            value: function(e) {
              return this.adapterRef.deviceApi.startDevice(e)
            }
          }, {
            key: "_stopCamera",
            value: function() {
              return this.adapterRef.deviceApi.stopDevice()
            }
          }, {
            key: "_startMic",
            value: function(e) {
              return this.adapterRef.deviceApi.startDevice(e)
            }
          }, {
            key: "_stopMic",
            value: function() {
              return this.adapterRef.deviceApi.stopDevice()
            }
          }, {
            key: "_startVoice",
            value: function() {
              this.adapterRef.commonApi.setAudioStart(-1)
            }
          }, {
            key: "_stopVoice",
            value: function() {
              this.adapterRef.commonApi.setAudioBlack(-1)
            }
          }, {
            key: "destroy",
            value: function() {
              this.adapterRef.logger.log("AbstractAdapter: destroy！"), this._doDestroyBusinessObjects(),
                this._doDestroyApiObjects(), this._doDestroyHelperObjects(), this._reset()
            }
          }]), t
        }(s.EventEmitter);
      t.AbstractAdapter = v
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.WebRTC = void 0;
      var i = l(r(1)),
        n = l(r(5)),
        a = l(r(4)),
        o = l(r(3)),
        s = l(r(120)),
        c = r(184),
        d = r(11),
        u = l(r(22));

      function l(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var p = function(e) {
        function t(e) {
          (0, i.default)(this, t), e = Object.assign(d.DEFAULT_WEBRTC_OPTION, e), d.CONFIG_MAP.CURRENT.SDK_TYPE =
            d.CONFIG_MAP.SDK_TYPE.WEBRTC;
          var r = (0, a.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return r.SDK_TYPE = d.CONFIG_MAP.SDK_TYPE.WEBRTC, r.adapterRef.nim = e.nim, r._initApiReportHelper(),
            (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_initIMBusiness", r).call(
              r), /safari/gi.test(u.default.name) ? window.addEventListener("pagehide", r.beforeunload.bind(r)) :
            window.addEventListener("beforeunload", r.beforeunload.bind(r)), r
        }
        return (0, o.default)(t, e), (0, n.default)(t, [{
          key: "beforeunload",
          value: function() {
            this.adapterRef.logger.log("WebRTC:beforeunload: event fire", this.adapterRef.imInfo), this
              .adapterRef.imInfo && (this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.P2P ? (this.adapterRef
                  .logger.log("WebRTC:beforeunload: 即将执行SDK内部的hangup逻辑"), this.emit(d.EVENT_OBJ.hangup.key,
                    Object.assign(d.EVENT_CODE.USER_LEFT_REASON.quit, {
                      channelId: this.adapterRef.imInfo.cid,
                      account: this._getAccountByUid(this.adapterRef.imInfo.uid)
                    })), this.hangup()) : this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.MEETING ?
                (this.emit(d.EVENT_OBJ.leaveChannel.key, Object.assign(d.EVENT_CODE.USER_LEFT_REASON.quit, {
                  channelId: this.adapterRef.imInfo.cid,
                  account: this._getAccountByUid(this.adapterRef.imInfo.uid)
                })), this.leaveChannel()) : this.adapterRef.beCalledInfo && (this.adapterRef.logger.log(
                  "WebRTC:beforeunload: 拒绝来电, beCalledInfo", this.adapterRef.beCalledInfo), this.control({
                  channelId: this.adapterRef.beCalledInfo.channelId,
                  command: d.CONTROL_TYPE.NETCALL_CONTROL_COMMAND_BUSY
                }), this.response({
                  accepted: !1,
                  beCalledInfo: this.adapterRef.beCalledInfo
                })))
          }
        }, {
          key: "startRecordMp4",
          value: function(e) {
            var t = this._getUidByAccount(e);
            return this.startMediaRecording({
              uid: t,
              type: "video"
            })
          }
        }, {
          key: "stopRecordMp4",
          value: function() {
            var e = this;
            return Promise.resolve().then(function() {
              e.adapterRef.recordApi.stopMediaRecordingByUid()
            })
          }
        }, {
          key: "startRecordAac",
          value: function() {
            return this.adapterRef.recordApi.startAudioRecording()
          }
        }, {
          key: "stopRecordAac",
          value: function() {
            return this.adapterRef.recordApi.stopAudioRecording()
          }
        }, {
          key: "isCurrentChannelId",
          value: function(e) {
            return this.adapterRef.imBusiness._isCurrentChannelId(e.channelId)
          }
        }, {
          key: "notCurrentChannelId",
          value: function(e) {
            return !this.adapterRef.imBusiness._isCurrentChannelId(e.channelId)
          }
        }, {
          key: "resetWhenHangup",
          value: function() {
            (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_stopSession",
              this).call(this), (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype),
              "_resetStatus", this).call(this)
          }
        }, {
          key: "setIsPrivateDeployment",
          value: function(e) {
            this.adapterRef && (this.adapterRef.isPrivateDeployment = e)
          }
        }, {
          key: "setPrivateDeploymentConf",
          value: function(e) {
            e && e.turnServer || this.adapterRef.logger.log("WebRTC:setPrivateDeploymentConf: 无效的参数"),
              this.adapterRef && (this.adapterRef.privateDeploymentConf = e)
          }
        }, {
          key: "setPlayVolume",
          value: function(e, t) {
            if (t && 0 !== t.length) {
              var r = this._getUidByAccount(t);
              return this.adapterRef.playApi.setPlayVolume({
                uid: r,
                volume: +e
              })
            }
            return this.adapterRef.playApi.setPlayVolume(+e)
          }
        }, {
          key: "setAudioBlack",
          value: function(e) {
            var t = -1 === e ? -1 : this.adapterRef.account4UidMap[e];
            this.adapterRef.commonApi.setAudioBlack(t)
          }
        }, {
          key: "setAudioStart",
          value: function(e) {
            var t = -1 === e ? -1 : this.adapterRef.account4UidMap[e];
            this.adapterRef.commonApi.setAudioStart(t)
          }
        }, {
          key: "setVideoBlack",
          value: function(e) {
            var t = this.adapterRef.account4UidMap[e];
            this.adapterRef.commonApi.setVideoBlack(t)
          }
        }, {
          key: "setVideoShow",
          value: function(e) {
            var t = this.adapterRef.account4UidMap[e];
            this.adapterRef.commonApi.setVideoShow(t)
          }
        }, {
          key: "getDevicesOfType",
          value: function(e) {
            return this.adapterRef.deviceApi.getDevicesOfType(e)
          }
        }, {
          key: "startRtc",
          value: function() {
            return this.adapterRef.detectNetState.inDetecting ? Promise.reject(d.CommonErrorCode.NetworkInDetecting) :
              (this._getVideoHelperByUid(this.adapterRef.imInfo.uid), this._getAudioHelperByUid(this.adapterRef
                .imInfo.uid), this.adapterRef.commonApi.startRtc())
          }
        }, {
          key: "initSignal",
          value: function() {
            return Promise.resolve()
          }
        }, {
          key: "setNetcallSession",
          value: function(e) {
            return this.adapterRef.p2p4WebRTCApi.setNetcallSession(e)
          }
        }, {
          key: "call",
          value: function(e) {
            return this.adapterRef.p2p4WebRTCApi.call(e)
          }
        }, {
          key: "response",
          value: function(e) {
            return this.setStartSessionTime(), this.adapterRef.p2p4WebRTCApi.response(e)
          }
        }, {
          key: "hangup",
          value: function() {
            this.setEndSessionTime(), this.adapterRef.p2p4WebRTCApi.hangup()
          }
        }, {
          key: "control",
          value: function(e) {
            this.adapterRef.p2p4WebRTCApi.control(e)
          }
        }, {
          key: "switchAudioToVideo",
          value: function() {
            this.adapterRef.p2p4WebRTCApi.switchAudioToVideo()
          }
        }, {
          key: "switchVideoToAudio",
          value: function() {
            this.adapterRef.p2p4WebRTCApi.switchVideoToAudio()
          }
        }, {
          key: "createChannel",
          value: function(e) {
            return this.adapterRef.meeting4WebRTCApi.createChannel(e)
          }
        }, {
          key: "joinChannel",
          value: function(e) {
            return this.adapterRef.detectNetState.inDetecting ? Promise.reject(d.CommonErrorCode.NetworkInDetecting) :
              (this.setStartSessionTime(), this.adapterRef.meeting4WebRTCApi.joinChannel(e))
          }
        }, {
          key: "leaveChannel",
          value: function() {
            return this.setEndSessionTime(), this.adapterRef.meeting4WebRTCApi.leaveChannel()
          }
        }, {
          key: "changeRoleToPlayer",
          value: function() {
            return this._setClientRole(d.ROLE_FOR_MEETING.ROLE_PLAYER)
          }
        }, {
          key: "changeRoleToAudience",
          value: function() {
            return this._setClientRole(d.ROLE_FOR_MEETING.ROLE_AUDIENCE)
          }
        }, {
          key: "_setClientRole",
          value: function(e) {
            if (this.adapterRef.imInfo.sessionMode === d.SESSION_MODE.P2P) return Promise.reject(d.CommonErrorCode
              .StageNotMatch);
            e = +e, void 0 === this.adapterRef.imInfo.role && (this.adapterRef.imInfo.role = d.ROLE_FOR_MEETING
              .ROLE_PLAYER);
            var t = {
              role: e === d.ROLE_FOR_MEETING.ROLE_PLAYER ? "normal" : "audience"
            };
            return e === this.adapterRef.imInfo.role ? Promise.resolve(t) : (this.adapterRef.imInfo.role =
              e, this.adapterRef.webrtcBusiness._switchRole().then(function() {
                return Promise.resolve(t)
              }))
          }
        }, {
          key: "startLocalStream",
          value: function(e) {
            return this.adapterRef.playApi.startLocalStream(e)
          }
        }, {
          key: "stopLocalStream",
          value: function() {
            this.adapterRef.playApi.stopLocalStream()
          }
        }, {
          key: "startRemoteStream",
          value: function(e) {
            var t = e.account;
            return t && (e.account = this._getUidByAccount(t)), this.adapterRef.playApi.startRemoteStream(
              e)
          }
        }, {
          key: "stopRemoteStream",
          value: function(e) {
            if (this.adapterRef.imInfo) {
              var t = "";
              e && (t = this._getUidByAccount(e)), this.adapterRef.playApi.stopRemoteStream(t)
            }
          }
        }, {
          key: "setVideoViewSize",
          value: function(e) {
            return this.adapterRef.playApi.setVideoViewSize(e)
          }
        }, {
          key: "setVideoViewRemoteSize",
          value: function(e) {
            var t = e.account;
            return t && (e.uid = this._getUidByAccount(t)), this.adapterRef.playApi.setVideoViewRemoteSize(
              e)
          }
        }, {
          key: "resumeLocalStream",
          value: function() {
            this.adapterRef.playApi.resumeLocalStream()
          }
        }, {
          key: "suspendLocalStream",
          value: function() {
            this.adapterRef.playApi.suspendLocalStream()
          }
        }, {
          key: "resumeRemoteStream",
          value: function(e) {
            var t = "";
            e && (t = this._getUidByAccount(e)), this.adapterRef.playApi.resumeRemoteStream(t)
          }
        }, {
          key: "suspendRemoteStream",
          value: function(e) {
            var t = "";
            e && (t = this._getUidByAccount(e)), this.adapterRef.playApi.suspendRemoteStream(t)
          }
        }, {
          key: "setMixConf",
          value: function(e) {
            this.setMediaMixConfig(e)
          }
        }, {
          key: "updateRtmpHost",
          value: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).account,
              r = null;
            return e ? (r = this._getUidByAccount(e), (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(
              t.prototype), "updateRtmpHost", this).call(this, {
              uid: r
            })) : Promise.reject("updateRtmpHost: 请输入参数account")
          }
        }, {
          key: "stopTrack",
          value: function(e) {
            var t = this;
            if (e) {
              var r = e.getTracks();
              r && 0 !== r.length && r.forEach(function(r) {
                t.adapterRef.logger.log("WebRTC:stopTrack: stop track", e.id), r.stop(), e.removeTrack(
                  r)
              })
            }
          }
        }, {
          key: "destroy",
          value: function() {
            (0, s.default)(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this)
            .call(this)
          }
        }]), t
      }(c.BaseAPI);
      t.WebRTC = p
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = r(358);
      Object.defineProperty(t, "WebRTC", {
        enumerable: !0,
        get: function() {
          return i.WebRTC
        }
      });
      var n = r(308);
      Object.defineProperty(t, "NRTCAdapter", {
        enumerable: !0,
        get: function() {
          return n.NRTCAdapter
        }
      })
    }, function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i, n = r(58),
        a = (i = n) && i.__esModule ? i : {
          default: i
        },
        o = r(11);
      var s = r(2);
      window.WEBRTCLOG = window.WEBRTCLOG ? window.WEBRTCLOG : console, t.default = (0, a.default)({
          version: s.info.version,
          versionRtc: s.info.nrtcVersion
        }, o.NETCALL_TYPE, o.SPLIT_MODE, o.MIX_VIDEO_MODE, o.ROLE_FOR_MEETING, o.HANGUP_TYPE, o.CONTROL_TYPE, o
        .VIDEO_QUALITY, o.VIDEO_FRAME_RATE, o.DEVICE_TYPE, {
          videoMap: {
            frame: o.VIDEO_QUALITY_REV,
            frameRate: o.VIDEO_FRAME_RATE_REV
          },
          deviceTypeMap: o.DEVICE_TYPE_REV
        }), e.exports = t.default
    }, function(e, t, r) {
      "use strict";
      e.exports = {
        pushConfig: {
          1: "enable",
          2: "needBadge",
          3: "needPushNick",
          4: "pushContent",
          5: "custom",
          6: "pushPayload",
          7: "sound",
          9: "forceKeepCalling",
          10: "webrtcEnable"
        },
        liveOption: {
          1: "liveEnable",
          2: "webrtcEnable"
        }
      }
    }, function(e, t, r) {
      "use strict";
      e.exports = {
        pushConfig: {
          enable: 1,
          needBadge: 2,
          needPushNick: 3,
          pushContent: 4,
          custom: 5,
          pushPayload: 6,
          sound: 7,
          forceKeepCalling: 9,
          webrtcEnable: 10
        },
        liveOption: {
          liveEnable: 1,
          webrtcEnable: 2
        }
      }
    }, function(e, t, r) {
      "use strict";
      var i = r(0),
        n = r(79),
        a = i.merge({}, n.idMap, {
          netcall: {
            id: 9,
            initNetcall: 1,
            keepCalling: 3,
            calleeAck: 4,
            notifyCalleeAck: 5,
            hangup: 6,
            notifyHangup: 7,
            netcallControl: 8,
            notifyNetcallControl: 9,
            verifyChannelId: 10,
            createChannel: 13,
            joinChannel: 14,
            queryAccountUidMap: 16
          }
        }),
        o = {
          initNetcall: {
            sid: a.netcall.id,
            cid: a.netcall.initNetcall,
            params: [{
              type: "byte",
              name: "type"
            }, {
              type: "StrArray",
              name: "accounts"
            }, {
              type: "String",
              name: "pushContent"
            }, {
              type: "String",
              name: "custom"
            }, {
              type: "Property",
              name: "pushConfig"
            }]
          },
          keepCalling: {
            sid: a.netcall.id,
            cid: a.netcall.keepCalling,
            params: [{
              type: "byte",
              name: "type"
            }, {
              type: "StrArray",
              name: "accounts"
            }, {
              type: "long",
              name: "channelId"
            }]
          },
          calleeAck: {
            sid: a.netcall.id,
            cid: a.netcall.calleeAck,
            params: [{
              type: "string",
              name: "account"
            }, {
              type: "long",
              name: "channelId"
            }, {
              type: "byte",
              name: "type"
            }, {
              type: "bool",
              name: "accepted"
            }]
          },
          hangup: {
            sid: a.netcall.id,
            cid: a.netcall.hangup,
            params: [{
              type: "long",
              name: "channelId"
            }]
          },
          netcallControl: {
            sid: a.netcall.id,
            cid: a.netcall.netcallControl,
            params: [{
              type: "long",
              name: "channelId"
            }, {
              type: "byte",
              name: "type"
            }]
          },
          verifyChannelId: {
            sid: a.netcall.id,
            cid: a.netcall.verifyChannelId,
            params: [{
              type: "long",
              name: "channelId"
            }, {
              type: "String",
              name: "account"
            }]
          },
          createChannel: {
            sid: a.netcall.id,
            cid: a.netcall.createChannel,
            params: [{
              type: "String",
              name: "channelName"
            }, {
              type: "String",
              name: "custom"
            }, {
              type: "String",
              name: "webrtcEnable"
            }]
          },
          joinChannel: {
            sid: a.netcall.id,
            cid: a.netcall.joinChannel,
            params: [{
              type: "String",
              name: "channelName"
            }, {
              type: "Property",
              name: "liveOption"
            }]
          },
          queryAccountUidMap: {
            sid: a.netcall.id,
            cid: a.netcall.queryAccountUidMap,
            params: [{
              type: "String",
              name: "channelName"
            }, {
              type: "LongArray",
              name: "uids"
            }]
          }
        };
      e.exports = {
        idMap: a,
        cmdConfig: o,
        packetConfig: {
          "9_1": {
            service: "netcall",
            cmd: "initNetcall",
            response: [{
              type: "Number",
              name: "timetag"
            }, {
              type: "Number",
              name: "uid"
            }, {
              type: "Number",
              name: "channelId"
            }, {
              type: "StrArray",
              name: "turnServerList"
            }, {
              type: "StrArray",
              name: "sturnServerList"
            }, {
              type: "StrArray",
              name: "proxyServerList"
            }, {
              type: "StrArray",
              name: "keepCallingAccounts"
            }, {
              type: "StrLongMap",
              name: "accountUidMap"
            }, {
              type: "String",
              name: "clientConfig"
            }, {
              type: "String",
              name: "serverMap"
            }]
          },
          "9_2": {
            service: "netcall",
            cmd: "beCalled",
            response: [{
              type: "Number",
              name: "timetag"
            }, {
              type: "Number",
              name: "type"
            }, {
              type: "Number",
              name: "channelId"
            }, {
              type: "String",
              name: "account"
            }, {
              type: "Number",
              name: "uid"
            }, {
              type: "StrArray",
              name: "turnServerList"
            }, {
              type: "StrArray",
              name: "sturnServerList"
            }, {
              type: "StrArray",
              name: "proxyServerList"
            }, {
              type: "StrLongMap",
              name: "accountUidMap"
            }, {
              type: "String",
              name: "clientConfig"
            }, {
              type: "String",
              name: "custom"
            }, {
              type: "Property",
              name: "pushConfig"
            }, {
              type: "String",
              name: "serverMap"
            }]
          },
          "9_3": {
            service: "netcall",
            cmd: "keepCalling",
            response: [{
              type: "StrArr",
              name: "accounts"
            }]
          },
          "9_4": {
            service: "netcall",
            cmd: "calleeAck",
            response: []
          },
          "9_5": {
            service: "netcall",
            cmd: "notifyCalleeAck",
            response: [{
              type: "String",
              name: "account"
            }, {
              type: "long",
              name: "channelId"
            }, {
              type: "byte",
              name: "type"
            }, {
              type: "bool",
              name: "accepted"
            }]
          },
          "9_6": {
            service: "netcall",
            cmd: "hangup",
            response: []
          },
          "9_7": {
            service: "netcall",
            cmd: "notifyHangup",
            response: [{
              type: "long",
              name: "channelId"
            }, {
              type: "String",
              name: "account"
            }, {
              type: "long",
              name: "timetag"
            }]
          },
          "9_8": {
            service: "netcall",
            cmd: "netcallControl",
            response: []
          },
          "9_9": {
            service: "netcall",
            cmd: "notifyNetcallControl",
            response: [{
              type: "String",
              name: "account"
            }, {
              type: "byte",
              name: "type"
            }, {
              type: "long",
              name: "channelId"
            }]
          },
          "9_10": {
            service: "netcall",
            cmd: "verifyChannelId",
            response: []
          },
          "9_11": {
            service: "netcall",
            cmd: "notifyNetcallRecord",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "9_12": {
            service: "netcall",
            cmd: "notifyCalleeAckSync",
            response: [{
              type: "String",
              name: "timetag"
            }, {
              type: "long",
              name: "channelId"
            }, {
              type: "byte",
              name: "type"
            }, {
              type: "bool",
              name: "accepted"
            }, {
              type: "byte",
              name: "fromClientType"
            }]
          },
          "9_13": {
            service: "netcall",
            cmd: "createChannel",
            response: [{
              type: "long",
              name: "timetag"
            }]
          },
          "9_14": {
            service: "netcall",
            cmd: "joinChannel",
            response: [{
              type: "long",
              name: "timetag"
            }, {
              type: "long",
              name: "channelId"
            }, {
              type: "StrLongMap",
              name: "accountUidMap"
            }, {
              type: "String",
              name: "serverMap"
            }, {
              type: "String",
              name: "clientConfig"
            }, {
              type: "String",
              name: "custom"
            }]
          },
          "9_15": {
            service: "netcall",
            cmd: "notifyJoin",
            response: [{
              type: "Long",
              name: "channelId"
            }, {
              type: "StrLongMap",
              name: "accountUidMap"
            }]
          },
          "9_16": {
            service: "netcall",
            cmd: "queryAccountUidMap",
            response: []
          }
        }
      }
    }, function(e, t, r) {
      "use strict";
      var i = {
        install: function(e) {
          var t = e.Protocol.fn;
          // console.log('install ====>>>', e, t);
          t.processNetcall = function(e) {
            console.log('t.processNetcall ====>>>', this);
            switch (e.cmd) {
              case "initNetcall":
                this.onInitNetcall(e);
                break;
              case "beCalled":
                this.onBeCalled(e);
                break;
              case "keepCalling":
                this.onKeepCalling(e);
                break;
              case "calleeAck":
                break;
              case "notifyCalleeAck":
                this.onNotifyCalleeAck(e);
                break;
              case "hangup":
                break;
              case "notifyHangup":
                this.onNotifyHangup(e);
                break;
              case "notifyNetcallControl":
                this.onNetcallControl(e);
                break;
              case "notifyCalleeAckSync":
                this.onNotifyCalleeAckSync(e);
                break;
              case "notifyNetcallRecord":
                this.onMsg(e);
                break;
              case "createChannel":
                break;
              case "joinChannel":
                this.joinChannel(e);
                break;
              case "notifyJoin":
                this.notifyJoin(e)
            }
          }, t.onInitNetcall = function(e) {
            console.log('t.onInitNetcall ====>>>', this);
            if (!e.error) {
              var t = e.obj.type;
              e.obj = e.content, e.obj.type = t, e.obj.accounts = e.obj.keepCallingAccounts, this.setCurrentNetcall(
                e.obj.channelId), this.keepCalling(e)
            }
          }, t.setCurrentNetcall = function(e) {
            this.currentNetcallChannelId = e
          }, t.onKeepCalling = function(e) {
            e.error || e.content.accounts.length && this.keepCalling(e)
          }, t.keepCalling = function(e) {
            var t = this,
              r = e.obj,
              i = r.type,
              n = r.accounts,
              a = r.channelId;
            n && n.length && setTimeout(function() {
              t.currentNetcallChannelId && t.currentNetcallChannelId === a && t.api.keepCalling({
                type: i,
                accounts: n,
                channelId: a
              }).catch(function() {})
            }, 3e3)
          }, t.onBeCalled = function(e) {
            console.log('t.onBeCalled ====>>>', this);
            e.error || this.emitAPI({
              type: "beCalled",
              obj: e.content
            })
          }, t.onNotifyCalleeAck = function(e) {
            e.error || this.emitAPI({
              type: "notifyCalleeAck",
              obj: e.content
            })
          }, t.onNotifyHangup = function(e) {
            e.error || this.emitAPI({
              type: "notifyHangup",
              obj: e.content
            })
          }, t.onNetcallControl = function(e) {
            console.log('t.onNetcallControl ====>>>', this);
            e.error || this.emitAPI({
              type: "netcallControl",
              obj: e.content
            })
          }, t.onNotifyCalleeAckSync = function(e) {
            e.error || this.emitAPI({
              type: "notifyCalleeAckSync",
              obj: e.content
            })
          }, t.notifyJoin = function(e) {
            e.error || this.emitAPI({
              type: "notifyJoin",
              obj: e.content
            })
          }, t.joinChannel = function(e) {
            e.obj = e.content
          }
        }
      };
      e.exports = i
    }, function(e, t, r) {
      "use strict";
      var i = r(267),
        n = {
          install: function(e) {
            var t = e.fn,
              r = e.util,
              n = i({
                util: r
              });
            t.initNetcall = function(e) {
              return r.verifyOptions(e, "type accounts", "netcall::initNetcall"), e.pushContent = "", e.custom =
                "", e.pushConfig || (e.pushConfig = {}), e.pushConfig.webrtcEnable = e.webrtcEnable, e.pushConfig =
                new n(e.pushConfig), this.cbAndSendCmd("initNetcall", e)
            }, t.keepCalling = function(e) {
              return r.verifyOptions(e, "type accounts channelId", "netcall::keepCalling"), this.cbAndSendCmd(
                "keepCalling", e)
            }, t.calleeAck = function(e) {
              return r.verifyOptions(e, "account channelId type accepted", "netcall::calleeAck"), this.cbAndSendCmd(
                "calleeAck", e)
            }, t.hangup = function(e) {
              return r.verifyOptions(e, "channelId", "netcall::hangup"), this.cbAndSendCmd("hangup", e)
            }, t.netcallControl = function(e) {
              return r.verifyOptions(e, "channelId type", "netcall::netcallControl"), this.cbAndSendCmd(
                "netcallControl", e)
            }, t.createChannel = function(e) {
              return this.cbAndSendCmd("createChannel", e)
            }, t.joinChannel = function(e) {
              return r.verifyOptions(e, "channelName", "netcall::joinChannel"), r.verifyBooleanWithDefault(e,
                "liveEnable", !1, "", "netcall::joinChannel"), r.verifyBooleanWithDefault(e, "webrtcEnable",
                !1, "", "netcall::joinChannel"), this.cbAndSendCmd("joinChannel", {
                channelName: e.channelName,
                liveOption: {
                  liveEnable: e.liveEnable ? 1 : 0,
                  webrtcEnable: e.webrtcEnable ? 1 : 0
                }
              })
            }, t.queryAccountUidMap = function(e, t) {
              return this.cbAndSendCmd("queryAccountUidMap", {
                channelName: e,
                uids: t
              })
            }
          }
        };
      e.exports = n
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = s(r(58));
      r(266);
      var n = s(r(360)),
        a = r(359),
        o = r(24);

      function s(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      var c = r(365),
        d = r(364),
        u = r(363),
        l = r(362),
        p = r(361);
      t.default = Object.assign(a.WebRTC, n.default, (0, i.default)({}, o.RtcSupport, {
        install: function(e, t) {
          c.install(e, t), d.install(e, t), e.parser.mixin({
            configMap: u,
            serializeMap: l,
            unserializeMap: p
          })
        },
        getInstance: function(e) {
          var t = e.container,
            r = e.remoteContainer,
            i = e.chromeId,
            n = e.debug,
            o = e.nim;
          return new a.WebRTC({
            container: t,
            remoteContainer: r,
            debug: n,
            nim: o,
            chromeId: i,
            apiList: [],
            ref: this
          })
        },
        destroy: function(e) {
          e && (e.destroy(), e = null)
        }
      })), e.exports = t.default
    }
  ])
});
