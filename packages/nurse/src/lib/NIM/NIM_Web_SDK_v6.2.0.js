! function(e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define &&
    define.amd ? define([], t) : "object" == typeof exports ? exports.SDK = t() : e.SDK = t()
}(window, function() {
  return function(e) {
    var t = {};

    function n(r) {
      if (t[r]) return t[r].exports;
      var s = t[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(s.exports, s, s.exports, n), s.l = !0, s.exports
    }
    return n.m = e, n.c = t, n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {
        configurable: !1,
        enumerable: !0,
        get: r
      })
    }, n.r = function(e) {
      Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, n.n = function(e) {
      var t = e && e.__esModule ? function() {
        return e.default
      } : function() {
        return e
      };
      return n.d(t, "a", t), t
    }, n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 481)
  }([function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(73),
        a = n(68);
      n(87);
      var c, u, l = n(12),
        m = l.getGlobal(),
        d = /\s+/;
      l.deduplicate = function(e) {
        var t = [];
        return e.forEach(function(e) {
          -1 === t.indexOf(e) && t.push(e)
        }), t
      }, l.capFirstLetter = function(e) {
        return e ? (e = "" + e).slice(0, 1).toUpperCase() + e.slice(1) : ""
      }, l.guid = (c = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
      }, function() {
        return c() + c() + c() + c() + c() + c() + c() + c()
      }), l.extend = function(e, t, n) {
        for (var r in t) void 0 !== e[r] && !0 !== n || (e[r] = t[r])
      }, l.filterObj = function(e, t) {
        var n = {};
        return l.isString(t) && (t = t.split(d)), t.forEach(function(t) {
          e.hasOwnProperty(t) && (n[t] = e[t])
        }), n
      }, l.copy = function(e, t) {
        return t = t || {}, e ? (Object.keys(e).forEach(function(n) {
          l.exist(e[n]) && (t[n] = e[n])
        }), t) : t
      }, l.copyWithNull = function(e, t) {
        return t = t || {}, e ? (Object.keys(e).forEach(function(n) {
          (l.exist(e[n]) || l.isnull(e[n])) && (t[n] = e[n])
        }), t) : t
      }, l.findObjIndexInArray = function(e, t) {
        e = e || [];
        var n = t.keyPath || "id",
          r = -1;
        return e.some(function(e, s) {
          if (a(e, n) === t.value) return r = s, !0
        }), r
      }, l.findObjInArray = function(e, t) {
        var n = l.findObjIndexInArray(e, t);
        return -1 === n ? null : e[n]
      }, l.mergeObjArray = function() {
        var e = [],
          t = [].slice.call(arguments, 0, -1),
          n = arguments[arguments.length - 1];
        l.isArray(n) && (t.push(n), n = {});
        var r, s = n.keyPath = n.keyPath || "id";
        for (n.sortPath = n.sortPath || s; !e.length && t.length;) e = (e = t.shift() || []).slice(0);
        return t.forEach(function(t) {
          t && t.forEach(function(t) {
            -1 !== (r = l.findObjIndexInArray(e, {
              keyPath: s,
              value: a(t, s)
            })) ? e[r] = l.merge({}, e[r], t) : e.push(t)
          })
        }), n.notSort || (e = l.sortObjArray(e, n)), e
      }, l.cutObjArray = function(e) {
        var t = e.slice(0),
          n = arguments.length,
          r = [].slice.call(arguments, 1, n - 1),
          s = arguments[n - 1];
        l.isObject(s) || (r.push(s), s = {});
        var i, o = s.keyPath = s.keyPath || "id";
        return r.forEach(function(e) {
          l.isArray(e) || (e = [e]), e.forEach(function(e) {
            e && (s.value = a(e, o), -1 !== (i = l.findObjIndexInArray(t, s)) && t.splice(i, 1))
          })
        }), t
      }, l.sortObjArray = function(e, t) {
        var n = (t = t || {}).sortPath || "id";
        o.insensitive = !!t.insensitive;
        var r, s, i, c = !!t.desc;
        return i = l.isFunction(t.compare) ? t.compare : function(e, t) {
          return r = a(e, n), s = a(t, n), c ? o(s, r) : o(r, s)
        }, e.sort(i)
      }, l.emptyFunc = function() {}, l.isEmptyFunc = function(e) {
        return e === l.emptyFunc
      }, l.notEmptyFunc = function(e) {
        return e !== l.emptyFunc
      }, l.splice = function(e, t, n) {
        return [].splice.call(e, t, n)
      }, l.reshape2d = function(e, t) {
        if (Array.isArray(e)) {
          l.verifyParamType("type", t, "number", "util::reshape2d");
          var n = e.length;
          if (n <= t) return [e];
          for (var r = Math.ceil(n / t), s = [], i = 0; i < r; i++) s.push(e.slice(i * t, (i + 1) * t));
          return s
        }
        return e
      }, l.flatten2d = function(e) {
        if (Array.isArray(e)) {
          var t = [];
          return e.forEach(function(e) {
            t = t.concat(e)
          }), t
        }
        return e
      }, l.dropArrayDuplicates = function(e) {
        if (Array.isArray(e)) {
          for (var t = {}, n = []; e.length > 0;) {
            t[e.shift()] = !0
          }
          for (var r in t) !0 === t[r] && n.push(r);
          return n
        }
        return e
      }, l.onError = function(e) {
        throw new function(e) {
          "object" === (void 0 === e ? "undefined" : (0, i.default)(e)) ? (this.callFunc = e.callFunc || null,
            this.message = e.message || "UNKNOW ERROR") : this.message = e, this.time = new Date, this.timetag = +
            this.time
        }(e)
      }, l.verifyParamPresent = function(e, t, n, r) {
        n = n || "";
        var s = !1;
        switch (l.typeOf(t)) {
          case "undefined":
          case "null":
            s = !0;
            break;
          case "string":
            "" === t && (s = !0);
            break;
          case "StrStrMap":
          case "object":
            Object.keys(t).length || (s = !0);
            break;
          case "array":
            t.length ? t.some(function(e) {
              if (l.notexist(e)) return s = !0, !0
            }) : s = !0
        }
        s && l.onParamAbsent(n + e, r)
      }, l.onParamAbsent = function(e, t) {
        l.onParamError("缺少参数 " + e + ", 请确保参数不是 空字符串、空对象、空数组、null或undefined, 或数组的内容不是 null/undefined", t)
      }, l.verifyParamAbsent = function(e, t, n, r) {
        n = n || "", void 0 !== t && l.onParamPresent(n + e, r)
      }, l.onParamPresent = function(e, t) {
        l.onParamError("多余的参数 " + e, t)
      }, l.verifyParamType = function(e, t, n, r) {
        var s = l.typeOf(t).toLowerCase();
        l.isArray(n) || (n = [n]);
        var i = !0;
        switch (-1 === (n = n.map(function(e) {
          return e.toLowerCase()
        })).indexOf(s) && (i = !1), s) {
          case "number":
            isNaN(t) && (i = !1);
            break;
          case "string":
            "numeric or numeric string" === n.join("") && (i = !!/^[0-9]+$/.test(t))
        }
        i || l.onParamInvalidType(e, n, "", r)
      }, l.onParamInvalidType = function(e, t, n, r) {
        n = n || "", t = l.isArray(t) ? (t = t.map(function(e) {
          return '"' + e + '"'
        })).join(", ") : '"' + t + '"', l.onParamError('参数"' + n + e + '"类型错误, 合法的类型包括: [' + t + "]", r)
      }, l.verifyParamValid = function(e, t, n, r) {
        l.isArray(n) || (n = [n]), -1 === n.indexOf(t) && l.onParamInvalidValue(e, n, r)
      }, l.onParamInvalidValue = function(e, t, n) {
        l.isArray(t) || (t = [t]), t = t.map(function(e) {
          return '"' + e + '"'
        }), l.isArray(t) && (t = t.join(", ")), l.onParamError("参数 " + e + "值错误, 合法的值包括: [" + JSON.stringify(
          t) + "]", n)
      }, l.verifyParamMin = function(e, t, n, r) {
        t < n && l.onParamError("参数" + e + "的值不能小于" + n, r)
      }, l.verifyParamMax = function(e, t, n, r) {
        t > n && l.onParamError("参数" + e + "的值不能大于" + n, r)
      }, l.verifyArrayMax = function(e, t, n, r) {
        t.length > n && l.onParamError("参数" + e + "的长度不能大于" + n, r)
      }, l.verifyEmail = (u = /^\S+@\S+$/, function(e, t, n) {
        u.test(t) || l.onParamError("参数" + e + "邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符", n)
      }), l.verifyTel = function() {
        var e = /^[+\-()\d]+$/;
        return function(t, n, r) {
          e.test(n) || l.onParamError("参数" + t + "电话号码格式错误, 合法字符包括+、-、英文括号和数字", r)
        }
      }(), l.verifyBirth = function() {
        var e = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
        return function(t, n, r) {
          e.test(n) || l.onParamError("参数" + t + '生日格式错误, 合法为"yyyy-MM-dd"', r)
        }
      }(), l.onParamError = function(e, t) {
        l.onError({
          message: e,
          callFunc: t
        })
      }, l.verifyOptions = function(e, t, n, r, s) {
        if (e = e || {}, t && (l.isString(t) && (t = t.split(d)), l.isArray(t))) {
          "boolean" != typeof n && (s = n || null, n = !0, r = "");
          var i = n ? l.verifyParamPresent : l.verifyParamAbsent;
          t.forEach(function(t) {
            i.call(l, t, e[t], r, s)
          })
        }
        return e
      }, l.verifyParamAtLeastPresentOne = function(e, t, n) {
        t && (l.isString(t) && (t = t.split(d)), l.isArray(t) && (t.some(function(t) {
          return l.exist(e[t])
        }) || l.onParamError("以下参数[" + t.join(", ") + "]至少需要传入一个", n)))
      }, l.verifyParamPresentJustOne = function(e, t, n) {
        t && (l.isString(t) && (t = t.split(d)), l.isArray(t) && 1 !== t.reduce(function(t, n) {
          return l.exist(e[n]) && t++, t
        }, 0) && l.onParamError("以下参数[" + t.join(", ") + "]必须且只能传入一个", n))
      }, l.verifyBooleanWithDefault = function(e, t, n, r, s) {
        l.undef(n) && (n = !0), d.test(t) && (t = t.split(d)), l.isArray(t) ? t.forEach(function(t) {
          l.verifyBooleanWithDefault(e, t, n, r, s)
        }) : void 0 === e[t] ? e[t] = n : l.isBoolean(e[t]) || l.onParamInvalidType(t, "boolean", r, s)
      }, l.verifyFileInput = function(e, t) {
        return l.verifyParamPresent("fileInput", e, "", t), l.isString(e) && ((e = document.getElementById(e)) ||
            l.onParamError("找不到要上传的文件对应的input, 请检查fileInput id " + e, t)), e.tagName && "input" === e.tagName.toLowerCase() &&
          "file" === e.type.toLowerCase() || l.onParamError("请提供正确的 fileInput, 必须为 file 类型的 input 节点 tagname:" +
            e.tagName + ", filetype:" + e.type, t), e
      }, l.verifyFileType = function(e, t) {
        l.verifyParamValid("type", e, l.validFileTypes, t)
      }, l.verifyCallback = function(e, t, n) {
        d.test(t) && (t = t.split(d)), l.isArray(t) ? t.forEach(function(t) {
          l.verifyCallback(e, t, n)
        }) : e[t] ? l.isFunction(e[t]) || l.onParamInvalidType(t, "function", "", n) : e[t] = l.emptyFunc
      }, l.verifyFileUploadCallback = function(e, t) {
        l.verifyCallback(e, "uploadprogress uploaddone uploaderror uploadcancel", t)
      }, l.validFileTypes = ["image", "audio", "video", "file"], l.validFileExts = {
        image: ["bmp", "gif", "jpg", "jpeg", "jng", "png", "webp"],
        audio: ["mp3", "wav", "aac", "wma", "wmv", "amr", "mp2", "flac", "vorbis", "ac3"],
        video: ["mp4", "rm", "rmvb", "wmv", "avi", "mpg", "mpeg"]
      }, l.filterFiles = function(e, t) {
        var n, r, s = "file" === (t = t.toLowerCase()),
          i = [];
        return [].forEach.call(e, function(e) {
          if (s) i.push(e);
          else if (n = e.name.slice(e.name.lastIndexOf(".") + 1), (r = e.type.split("/"))[0] && r[1]) {
            (r[0].toLowerCase() === t || -1 !== l.validFileExts[t].indexOf(n)) && i.push(e)
          }
        }), i
      };
      var p, f, g = l.supportFormData = l.notundef(m.FormData);
      l.getFileName = function(e) {
        return e = l.verifyFileInput(e), g ? e.files[0].name : e.value.slice(e.value.lastIndexOf("\\") + 1)
      }, l.getFileInfo = (p = {
        ppt: 1,
        pptx: 2,
        pdf: 3
      }, function(e) {
        var t = {};
        if (!(e = l.verifyFileInput(e)).files) return t;
        var n = e.files[0];
        return g && (t.name = n.name, t.size = n.size, t.type = n.name.match(/\.(\w+)$/), t.type = t.type &&
          t.type[1].toLowerCase(), t.transcodeType = p[t.type] || 0), t
      }), l.sizeText = (f = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "BB"], function(e) {
        var t, n = 0;
        do {
          t = (e = Math.floor(100 * e) / 100) + f[n], e /= 1024, n++
        } while (e > 1);
        return t
      }), l.promises2cmds = function(e) {
        return e.map(function(e) {
          return e.cmd
        })
      }, l.objs2accounts = function(e) {
        return e.map(function(e) {
          return e.account
        })
      }, l.teams2ids = function(e) {
        return e.map(function(e) {
          return e.teamId
        })
      }, l.objs2ids = function(e) {
        return e.map(function(e) {
          return e.id
        })
      }, l.getMaxUpdateTime = function(e) {
        var t = e.map(function(e) {
          return +e.updateTime
        });
        return Math.max.apply(Math, t)
      }, l.genCheckUniqueFunc = function(e, t) {
        return e = e || "id", t = t || 1e3,
          function(t) {
            this.uniqueSet = this.uniqueSet || {}, this.uniqueSet[e] = this.uniqueSet[e] || {};
            var n = this.uniqueSet[e],
              r = t[e];
            return !n[r] && (n[r] = !0, !0)
          }
      }, l.fillPropertyWithDefault = function(e, t, n) {
        return !!l.undef(e[t]) && (e[t] = n, !0)
      }, e.exports = l
    }, , function(e, t, n) {
      "use strict";
      var r = {
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
      r.weixinNetcall = r.nrtcNetcall = {
          checkSumUrl: "https://nrtc.netease.im/demo/getChecksum.action",
          getChannelInfoUrl: "https://nrtc.netease.im/nrtc/getChannelInfos.action"
        }, r.formatSocketUrl = function(e) {
          var t = e.url,
            n = e.secure ? "https" : "http";
          return -1 === t.indexOf("http") ? n + "://" + t : t
        }, r.uploadUrl = "https://nos.netease.com", r.chunkUploadUrl = null, r.commonMaxSize = 104857600, r.chunkSize =
        4194304, r.chunkMaxSize = 4194304e4, r.replaceUrl = "https://{bucket}-nosdn.netease.im/{object}", r.downloadHost =
        "nos.netease.com", r.downloadUrl = "https://{bucket}-nosdn.netease.im/{object}", r.httpsEnabled = !1, r.threshold =
        0, r.genUploadUrl = function(e) {
          return r.uploadUrl + "/" + e
        }, r.genChunkUploadUrl = function(e) {
          return r.chunkUploadUrl ? r.chunkUploadUrl + "/" + e.bucket + "/" + e.objectName : ""
        }, r.genDownloadUrl = function(e, t) {
          var n = e.bucket,
            s = (e.tag, e.expireSec),
            i = +new Date,
            o = s ? "&survivalTime=" + s : "",
            a = r.replaceUrl + "?createTime=" + i + o;
          return (a = r.genNosProtocolUrl(a)).replace("{bucket}", n).replace("{object}", t)
        }, r.genFileUrl = function(e) {
          var t = e.bucket,
            n = e.objectName;
          return r.genNosProtocolUrl(r.replaceUrl).replace("{bucket}", t).replace("{object}", n)
        }, r.genNosProtocolUrl = function(e) {
          return /^http/.test(e) ? r.httpsEnabled && (e = e.replace("http", "https")) : e = r.httpsEnabled ?
            "https://" + e : "http://" + e, e
        }, e.exports = r
    }, , , , function(e, t, n) {
      var r = n(42)("wks"),
        s = n(29),
        i = n(8).Symbol,
        o = "function" == typeof i;
      (e.exports = function(e) {
        return r[e] || (r[e] = o && i[e] || (o ? i : s)("Symbol." + e))
      }).store = r
    }, function(e, t) {
      var n = e.exports = {
        version: "2.5.5"
      };
      "number" == typeof __e && (__e = n)
    }, function(e, t) {
      var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self &&
        self.Math == Math ? self : Function("return this")();
      "number" == typeof __g && (__g = n)
    }, function(e, t, n) {
      "use strict";
      t.__esModule = !0;
      var r = o(n(106)),
        s = o(n(96)),
        i = "function" == typeof s.default && "symbol" == typeof r.default ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof s.default && e.constructor === s.default && e !== s.default.prototype ?
            "symbol" : typeof e
        };

      function o(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.default = "function" == typeof s.default && "symbol" === i(r.default) ? function(e) {
        return void 0 === e ? "undefined" : i(e)
      } : function(e) {
        return e && "function" == typeof s.default && e.constructor === s.default && e !== s.default.prototype ?
          "symbol" : void 0 === e ? "undefined" : i(e)
      }
    }, function(e, t, n) {
      "use strict";
      var r = Object.prototype.hasOwnProperty,
        s = "~";

      function i() {}

      function o(e, t, n) {
        this.fn = e, this.context = t, this.once = n || !1
      }

      function a() {
        this._events = new i, this._eventsCount = 0
      }
      Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (s = !1)), a.prototype.eventNames =
        function() {
          var e, t, n = [];
          if (0 === this._eventsCount) return n;
          for (t in e = this._events) r.call(e, t) && n.push(s ? t.slice(1) : t);
          return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
        }, a.prototype.listeners = function(e, t) {
          var n = s ? s + e : e,
            r = this._events[n];
          if (t) return !!r;
          if (!r) return [];
          if (r.fn) return [r.fn];
          for (var i = 0, o = r.length, a = new Array(o); i < o; i++) a[i] = r[i].fn;
          return a
        }, a.prototype.emit = function(e, t, n, r, i, o) {
          var a = s ? s + e : e;
          if (!this._events[a]) return !1;
          var c, u, l = this._events[a],
            m = arguments.length;
          if (l.fn) {
            switch (l.once && this.removeListener(e, l.fn, void 0, !0), m) {
              case 1:
                return l.fn.call(l.context), !0;
              case 2:
                return l.fn.call(l.context, t), !0;
              case 3:
                return l.fn.call(l.context, t, n), !0;
              case 4:
                return l.fn.call(l.context, t, n, r), !0;
              case 5:
                return l.fn.call(l.context, t, n, r, i), !0;
              case 6:
                return l.fn.call(l.context, t, n, r, i, o), !0
            }
            for (u = 1, c = new Array(m - 1); u < m; u++) c[u - 1] = arguments[u];
            l.fn.apply(l.context, c)
          } else {
            var d, p = l.length;
            for (u = 0; u < p; u++) switch (l[u].once && this.removeListener(e, l[u].fn, void 0, !0), m) {
              case 1:
                l[u].fn.call(l[u].context);
                break;
              case 2:
                l[u].fn.call(l[u].context, t);
                break;
              case 3:
                l[u].fn.call(l[u].context, t, n);
                break;
              case 4:
                l[u].fn.call(l[u].context, t, n, r);
                break;
              default:
                if (!c)
                  for (d = 1, c = new Array(m - 1); d < m; d++) c[d - 1] = arguments[d];
                l[u].fn.apply(l[u].context, c)
            }
          }
          return !0
        }, a.prototype.on = function(e, t, n) {
          var r = new o(t, n || this),
            i = s ? s + e : e;
          return this._events[i] ? this._events[i].fn ? this._events[i] = [this._events[i], r] : this._events[i].push(
            r) : (this._events[i] = r, this._eventsCount++), this
        }, a.prototype.once = function(e, t, n) {
          var r = new o(t, n || this, !0),
            i = s ? s + e : e;
          return this._events[i] ? this._events[i].fn ? this._events[i] = [this._events[i], r] : this._events[i].push(
            r) : (this._events[i] = r, this._eventsCount++), this
        }, a.prototype.removeListener = function(e, t, n, r) {
          var o = s ? s + e : e;
          if (!this._events[o]) return this;
          if (!t) return 0 == --this._eventsCount ? this._events = new i : delete this._events[o], this;
          var a = this._events[o];
          if (a.fn) a.fn !== t || r && !a.once || n && a.context !== n || (0 == --this._eventsCount ? this._events =
            new i : delete this._events[o]);
          else {
            for (var c = 0, u = [], l = a.length; c < l; c++)(a[c].fn !== t || r && !a[c].once || n && a[c].context !==
              n) && u.push(a[c]);
            u.length ? this._events[o] = 1 === u.length ? u[0] : u : 0 == --this._eventsCount ? this._events =
              new i : delete this._events[o]
          }
          return this
        }, a.prototype.removeAllListeners = function(e) {
          var t;
          return e ? (t = s ? s + e : e, this._events[t] && (0 == --this._eventsCount ? this._events = new i :
            delete this._events[t])) : (this._events = new i, this._eventsCount = 0), this
        }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prototype.setMaxListeners =
        function() {
          return this
        }, a.prefixed = s, a.EventEmitter = a, e.exports = a
    }, , function(e, t, n) {
      "use strict";
      (function(e) {
        Object.defineProperty(t, "__esModule", {
            value: !0
          }), t.url2origin = t.uniqueID = t.off = t.removeEventListener = t.on = t.addEventListener = t.format =
          t.regWhiteSpace = t.regBlank = t.emptyFunc = t.f = t.emptyObj = t.o = void 0;
        var r, s = n(9),
          i = (r = s) && r.__esModule ? r : {
            default: r
          };
        t.getGlobal = o, t.detectCSSFeature = function(e) {
            var t = !1,
              n = "Webkit Moz ms O".split(" "),
              r = document.createElement("div"),
              s = null;
            e = e.toLowerCase(), void 0 !== r.style[e] && (t = !0);
            if (!1 === t) {
              s = e.charAt(0).toUpperCase() + e.substr(1);
              for (var i = 0; i < n.length; i++)
                if (void 0 !== r.style[n[i] + s]) {
                  t = !0;
                  break
                }
            }
            return t
          }, t.fix = a, t.getYearStr = c, t.getMonthStr = u, t.getDayStr = l, t.getHourStr = m, t.getMinuteStr =
          d, t.getSecondStr = p, t.getMillisecondStr = f, t.dateFromDateTimeLocal = function(e) {
            return e = "" + e, new Date(e.replace(/-/g, "/").replace("T", " "))
          }, t.getClass = y, t.typeOf = v, t.isString = b, t.isNumber = function(e) {
            return "number" === v(e)
          }, t.isBoolean = function(e) {
            return "boolean" === v(e)
          }, t.isArray = M, t.isFunction = T, t.isDate = S, t.isRegExp = function(e) {
            return "regexp" === v(e)
          }, t.isError = function(e) {
            return "error" === v(e)
          }, t.isnull = k, t.notnull = C, t.undef = P, t.notundef = I, t.exist = O, t.notexist = x, t.isObject =
          w, t.isEmpty = function(e) {
            return x(e) || (b(e) || M(e)) && 0 === e.length
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
            var n = e.offsetHeight;
            return t.removeChild(e), n
          }, t.remove = function(e) {
            e.parentNode && e.parentNode.removeChild(e)
          }, t.dataset = function(e, t, n) {
            if (!O(n)) return e.getAttribute("data-" + t);
            e.setAttribute("data-" + t, n)
          }, t.target = function(e) {
            return e.target || e.srcElement
          }, t.createIframe = function(e) {
            var t;
            if ((e = e || {}).name) try {
              (t = document.createElement('<iframe name="' + e.name + '"></iframe>')).frameBorder = 0
            } catch (n) {
              (t = document.createElement("iframe")).name = e.name
            } else t = document.createElement("iframe");
            e.visible || (t.style.display = "none");
            T(e.onload) && _(t, "load", function n(r) {
              if (!t.src) return;
              e.multi || R(t, "load", n);
              e.onload(r)
            });
            (e.parent || document.body).appendChild(t);
            var n = e.src || "about:blank";
            return setTimeout(function() {
              t.src = n
            }, 0), t
          }, t.html2node = function(e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            var n = [],
              r = void 0,
              s = void 0;
            if (t.children)
              for (r = 0, s = t.children.length; r < s; r++) n.push(t.children[r]);
            else
              for (r = 0, s = t.childNodes.length; r < s; r++) {
                var i = t.childNodes[r];
                1 === i.nodeType && n.push(i)
              }
            return n.length > 1 ? t : n[0]
          }, t.scrollTop = function(e) {
            O(e) && (document.documentElement.scrollTop = document.body.scrollTop = e);
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
          }, t.forOwn = U, t.mixin = j, t.isJSON = F, t.parseJSON = function e(t) {
            try {
              F(t) && (t = JSON.parse(t)), w(t) && U(t, function(n, r) {
                switch (v(r)) {
                  case "string":
                  case "object":
                    t[n] = e(r)
                }
              })
            } catch (e) {
              console.log("error:", e)
            }
            return t
          }, t.simpleClone = function(e) {
            var t = [],
              n = JSON.stringify(e, function(e, n) {
                if ("object" === (void 0 === n ? "undefined" : (0, i.default)(n)) && null !== n) {
                  if (-1 !== t.indexOf(n)) return;
                  t.push(n)
                }
                return n
              });
            return JSON.parse(n)
          }, t.merge = function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length,
                n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            return n.forEach(function(t) {
              j(e, t)
            }), e
          }, t.fillUndef = function(e, t) {
            return U(t, function(t, n) {
              P(e[t]) && (e[t] = n)
            }), e
          }, t.checkWithDefault = function(e, t, n) {
            var r = e[t] || e[t.toLowerCase()];
            x(r) && (r = n, e[t] = r);
            return r
          }, t.fetch = function(e, t) {
            return U(e, function(n, r) {
              O(t[n]) && (e[n] = t[n])
            }), e
          }, t.string2object = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",",
              n = {};
            return e.split(t).forEach(function(e) {
              var t = e.split("="),
                r = t.shift();
              r && (n[decodeURIComponent(r)] = decodeURIComponent(t.join("=")))
            }), n
          }, t.object2string = D, t.genUrlSep = function(e) {
            return e.indexOf("?") < 0 ? "?" : "&"
          }, t.object2query = function(e) {
            return D(e, "&", !0)
          }, t.isFileInput = L, t.getKeys = function(e, t) {
            var n = Object.keys(e);
            t && n.sort(function(t, n) {
              var r = L(e[t]),
                s = L(e[n]);
              return r === s ? 0 : r ? 1 : -1
            });
            return n
          };
        t.o = {}, t.emptyObj = {}, t.f = function() {}, t.emptyFunc = function() {}, t.regBlank = /\s+/gi, t.regWhiteSpace =
          /\s+/gi;

        function o() {
          return "undefined" != typeof window ? window : void 0 !== e ? e : {}
        }

        function a(e, t) {
          t = t || 2;
          for (var n = "" + e; n.length < t;) n = "0" + n;
          return n
        }

        function c(e) {
          return "" + e.getFullYear()
        }

        function u(e) {
          return a(e.getMonth() + 1)
        }

        function l(e) {
          return a(e.getDate())
        }

        function m(e) {
          return a(e.getHours())
        }

        function d(e) {
          return a(e.getMinutes())
        }

        function p(e) {
          return a(e.getSeconds())
        }

        function f(e) {
          return a(e.getMilliseconds(), 3)
        }
        var g, h;
        t.format = (g = /yyyy|MM|dd|hh|mm|ss|SSS/g, h = {
          yyyy: c,
          MM: u,
          dd: l,
          hh: m,
          mm: d,
          ss: p,
          SSS: f
        }, function(e, t) {
          return e = new Date(e), isNaN(+e) ? "invalid date" : (t = t || "yyyy-MM-dd").replace(g, function(
            t) {
            return h[t](e)
          })
        });

        function y(e) {
          return Object.prototype.toString.call(e).slice(8, -1)
        }

        function v(e) {
          return y(e).toLowerCase()
        }

        function b(e) {
          return "string" === v(e)
        }

        function M(e) {
          return "array" === v(e)
        }

        function T(e) {
          return "function" === v(e)
        }

        function S(e) {
          return "date" === v(e)
        }

        function k(e) {
          return null === e
        }

        function C(e) {
          return null !== e
        }

        function P(e) {
          return void 0 === e
        }

        function I(e) {
          return void 0 !== e
        }

        function O(e) {
          return I(e) && C(e)
        }

        function x(e) {
          return P(e) || k(e)
        }

        function w(e) {
          return O(e) && "object" === v(e)
        }
        var A = t.addEventListener = function(e, t, n) {
            e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
          },
          _ = t.on = A,
          E = t.removeEventListener = function(e, t, n) {
            e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t,
              n)
          },
          R = t.off = E;

        function U() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {},
            n = arguments[2];
          for (var r in e) e.hasOwnProperty(r) && t.call(n, r, e[r])
        }

        function j(e, t) {
          U(t, function(t, n) {
            e[t] = n
          })
        }
        var N;
        t.uniqueID = (N = 0, function() {
          return "" + N++
        });

        function F(e) {
          return b(e) && 0 === e.indexOf("{") && e.lastIndexOf("}") === e.length - 1
        }

        function D(e, t, n) {
          if (!e) return "";
          var r = [];
          return U(e, function(e, t) {
            T(t) || (S(t) ? t = t.getTime() : M(t) ? t = t.join(",") : w(t) && (t = JSON.stringify(t)), n &&
              (t = encodeURIComponent(t)), r.push(encodeURIComponent(e) + "=" + t))
          }), r.join(t || ",")
        }
        t.url2origin = function() {
          var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
          return function(t) {
            return e.test(t || "") ? RegExp.$1.toLowerCase() : ""
          }
        }();

        function L(e) {
          var t = o();
          return e.tagName && "INPUT" === e.tagName.toUpperCase() || t.Blob && e instanceof t.Blob
        }
      }).call(this, n(31))
    }, function(e, t, n) {
      var r = n(16),
        s = n(64),
        i = n(44),
        o = Object.defineProperty;
      t.f = n(15) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = i(t, !0), r(n), s) try {
          return o(e, t, n)
        } catch (e) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
      }
    }, function(e, t) {
      var n = {}.hasOwnProperty;
      e.exports = function(e, t) {
        return n.call(e, t)
      }
    }, function(e, t, n) {
      e.exports = !n(21)(function() {
        return 7 != Object.defineProperty({}, "a", {
          get: function() {
            return 7
          }
        }).a
      })
    }, function(e, t, n) {
      var r = n(19);
      e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
      }
    }, function(e, t, n) {
      var r = n(8),
        s = n(7),
        i = n(37),
        o = n(20),
        a = n(14),
        c = function(e, t, n) {
          var u, l, m, d = e & c.F,
            p = e & c.G,
            f = e & c.S,
            g = e & c.P,
            h = e & c.B,
            y = e & c.W,
            v = p ? s : s[t] || (s[t] = {}),
            b = v.prototype,
            M = p ? r : f ? r[t] : (r[t] || {}).prototype;
          for (u in p && (n = t), n)(l = !d && M && void 0 !== M[u]) && a(v, u) || (m = l ? M[u] : n[u], v[u] = p &&
            "function" != typeof M[u] ? n[u] : h && l ? i(m, r) : y && M[u] == m ? function(e) {
              var t = function(t, n, r) {
                if (this instanceof e) {
                  switch (arguments.length) {
                    case 0:
                      return new e;
                    case 1:
                      return new e(t);
                    case 2:
                      return new e(t, n)
                  }
                  return new e(t, n, r)
                }
                return e.apply(this, arguments)
              };
              return t.prototype = e.prototype, t
            }(m) : g && "function" == typeof m ? i(Function.call, m) : m, g && ((v.virtual || (v.virtual = {}))[
              u] = m, e & c.R && b && !b[u] && o(b, u, m)))
        };
      c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
    }, function(e, t, n) {
      var r = n(61),
        s = n(45);
      e.exports = function(e) {
        return r(s(e))
      }
    }, function(e, t) {
      e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
      }
    }, function(e, t, n) {
      var r = n(13),
        s = n(27);
      e.exports = n(15) ? function(e, t, n) {
        return r.f(e, t, s(1, n))
      } : function(e, t, n) {
        return e[t] = n, e
      }
    }, function(e, t) {
      e.exports = function(e) {
        try {
          return !!e()
        } catch (e) {
          return !0
        }
      }
    }, function(e, t, n) {
      "use strict";
      (function(t) {
        var r, s = n(9),
          i = (r = s) && r.__esModule ? r : {
            default: r
          };
        var o = function() {
          var e = "object" === (void 0 === t ? "undefined" : (0, i.default)(t)) ? t : window,
            n = Math.pow(2, 53) - 1,
            r = /\bOpera/,
            s = Object.prototype,
            o = s.hasOwnProperty,
            a = s.toString;

          function c(e) {
            return (e = String(e)).charAt(0).toUpperCase() + e.slice(1)
          }

          function u(e) {
            return e = f(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : c(e)
          }

          function l(e, t) {
            for (var n in e) o.call(e, n) && t(e[n], n, e)
          }

          function m(e) {
            return null == e ? c(e) : a.call(e).slice(8, -1)
          }

          function d(e) {
            return String(e).replace(/([ -])(?!$)/g, "$1?")
          }

          function p(e, t) {
            var r = null;
            return function(e, t) {
              var r = -1,
                s = e ? e.length : 0;
              if ("number" == typeof s && s > -1 && s <= n)
                for (; ++r < s;) t(e[r], r, e);
              else l(e, t)
            }(e, function(n, s) {
              r = t(r, n, s, e)
            }), r
          }

          function f(e) {
            return String(e).replace(/^ +| +$/g, "")
          }
          return function t(n) {
            var s = e,
              o = n && "object" === (void 0 === n ? "undefined" : (0, i.default)(n)) && "String" != m(n);
            o && (s = n, n = null);
            var c = s.navigator || {},
              g = c.userAgent || "";
            n || (n = g);
            var h, y, v, b, M, T = o ? !!c.likeChrome : /\bChrome\b/.test(n) && !/internal|\n/i.test(a.toString()),
              S = o ? "Object" : "ScriptBridgingProxyObject",
              k = o ? "Object" : "Environment",
              C = o && s.java ? "JavaPackage" : m(s.java),
              P = o ? "Object" : "RuntimeObject",
              I = /\bJava/.test(C) && s.java,
              O = I && m(s.environment) == k,
              x = I ? "a" : "α",
              w = I ? "b" : "β",
              A = s.document || {},
              _ = s.operamini || s.opera,
              E = r.test(E = o && _ ? _["[[Class]]"] : m(_)) ? E : _ = null,
              R = n,
              U = [],
              j = null,
              N = n == g,
              F = N && _ && "function" == typeof _.version && _.version(),
              D = p([{
                label: "EdgeHTML",
                pattern: "Edge"
              }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
              }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"], function(e, t) {
                return e || RegExp("\\b" + (t.pattern || d(t)) + "\\b", "i").exec(n) && (t.label || t)
              }),
              L = function(e) {
                return p(e, function(e, t) {
                  return e || RegExp("\\b" + (t.pattern || d(t)) + "\\b", "i").exec(n) && (t.label || t)
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
              B = W([{
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
              q = function(e) {
                return p(e, function(e, t, r) {
                  return e || (t[B] || t[/^[a-z]+(?: +[a-z]+\b)*/i.exec(B)] || RegExp("\\b" + d(r) +
                    "(?:\\b|\\w*\\d)", "i").exec(n)) && r
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
              H = function(e) {
                return p(e, function(e, t) {
                  var r = t.pattern || d(t);
                  return !e && (e = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(n)) && (e =
                    function(e, t, n) {
                      var r = {
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
                      return t && n && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (r = r[
                        /[\d.]+$/.exec(e)]) && (e = "Windows " + r), e = String(e), t && n && (e =
                        e.replace(RegExp(t, "i"), n)), e = u(e.replace(/ ce$/i, " CE").replace(
                          /\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i,
                          " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1")
                        .replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(
                          /(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(
                          /\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/,
                          "$1").split(" on ")[0])
                    }(e, r, t.label || t)), e
                })
              }(["Windows Phone", "Android", "CentOS", {
                  label: "Chrome OS",
                  pattern: "CrOS"
                }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD",
                "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ",
                "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;",
                "Windows "
              ]);

            function W(e) {
              return p(e, function(e, t) {
                var r = t.pattern || d(t);
                return !e && (e = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(n) || RegExp("\\b" + r +
                  " *\\w+-[\\w]*", "i").exec(n) || RegExp("\\b" + r +
                  "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(n)) && ((e = String(t.label &&
                    !RegExp(r, "i").test(t.label) ? t.label : e).split("/"))[1] && !/[\d.]+/.test(e[0]) &&
                  (e[0] += " " + e[1]), t = t.label || t, e = u(e[0].replace(RegExp(r, "i"), t).replace(
                    RegExp("; *(?:" + t + "[_-])?", "i"), " ").replace(RegExp("(" + t +
                    ")[-_.]?(\\w)", "i"), "$1 $2"))), e
              })
            }
            if (D && (D = [D]), q && !B && (B = W([q])), (h = /\bGoogle TV\b/.exec(B)) && (B = h[0]),
              /\bSimulator\b/i.test(n) && (B = (B ? B + " " : "") + "Simulator"), "Opera Mini" == L &&
              /\bOPiOS\b/.test(n) && U.push("running in Turbo/Uncompressed mode"), "IE" == L &&
              /\blike iPhone OS\b/.test(n) ? (q = (h = t(n.replace(/like iPhone OS/, ""))).manufacturer, B =
                h.product) : /^iP/.test(B) ? (L || (L = "Safari"), H = "iOS" + ((h = / OS ([\d_]+)/i.exec(n)) ?
                " " + h[1].replace(/_/g, ".") : "")) : "Konqueror" != L || /buntu/i.test(H) ? q && "Google" !=
              q && (/Chrome/.test(L) && !/\bMobile Safari\b/i.test(n) || /\bVita\b/.test(B)) ||
              /\bAndroid\b/.test(H) && /^Chrome/.test(L) && /\bVersion\//i.test(n) ? (L = "Android Browser",
                H = /\bAndroid\b/.test(H) ? H : "Android") : "Silk" == L ? (/\bMobi/i.test(n) || (H =
                "Android", U.unshift("desktop mode")), /Accelerated *= *true/i.test(n) && U.unshift(
                "accelerated")) : "PaleMoon" == L && (h = /\bFirefox\/([\d.]+)\b/.exec(n)) ? U.push(
                "identifying as Firefox " + h[1]) : "Firefox" == L && (h = /\b(Mobile|Tablet|TV)\b/i.exec(n)) ?
              (H || (H = "Firefox OS"), B || (B = h[1])) : !L || (h = !/\bMinefield\b/i.test(n) &&
                /\b(?:Firefox|Safari)\b/.exec(L)) ? (L && !B && /[\/,]|^[^(]+?\)/.test(n.slice(n.indexOf(h +
                "/") + 8)) && (L = null), (h = B || q || H) && (B || q ||
                /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(H)) && (L = /[a-z]+(?: Hat)?/i.exec(
                /\bAndroid\b/.test(H) ? H : h) + " Browser")) : "Electron" == L && (h = (
                /\bChrome\/([\d.]+)\b/.exec(n) || 0)[1]) && U.push("Chromium " + h) : H = "Kubuntu", F || (
                F = p([
                  "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
                  "Version", d(L), "(?:Firefox|Minefield|NetFront)"
                ], function(e, t) {
                  return e || (RegExp(t + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i")
                    .exec(n) || 0)[1] || null
                })), (h = ("iCab" == D && parseFloat(F) > 3 ? "WebKit" : /\bOpera\b/.test(L) && (/\bOPR\b/.test(
                  n) ? "Blink" : "Presto")) || /\b(?:Midori|Nook|Safari)\b/i.test(n) && !
                /^(?:Trident|EdgeHTML)$/.test(D) && "WebKit" || !D && /\bMSIE\b/i.test(n) && ("Mac OS" == H ?
                  "Tasman" : "Trident") || "WebKit" == D && /\bPlayStation\b(?! Vita\b)/i.test(L) &&
                "NetFront") && (D = [h]), "IE" == L && (h = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(n) || 0)[1]) ?
              (L += " Mobile", H = "Windows Phone " + (/\+$/.test(h) ? h : h + ".x"), U.unshift(
                "desktop mode")) : /\bWPDesktop\b/i.test(n) ? (L = "IE Mobile", H = "Windows Phone 8.x", U.unshift(
                "desktop mode"), F || (F = (/\brv:([\d.]+)/.exec(n) || 0)[1])) : "IE" != L && "Trident" ==
              D && (h = /\brv:([\d.]+)/.exec(n)) && (L && U.push("identifying as " + L + (F ? " " + F : "")),
                L = "IE", F = h[1]), N) {
              if (b = "global", M = null != (v = s) ? (0, i.default)(v[b]) : "number",
                /^(?:boolean|number|string|undefined)$/.test(M) || "object" == M && !v[b]) m(h = s.runtime) ==
                S ? (L = "Adobe AIR", H = h.flash.system.Capabilities.os) : m(h = s.phantom) == P ? (L =
                  "PhantomJS", F = (h = h.version || null) && h.major + "." + h.minor + "." + h.patch) :
                "number" == typeof A.documentMode && (h = /\bTrident\/(\d+)/i.exec(n)) ? (F = [F, A.documentMode],
                  (h = +h[1] + 4) != F[1] && (U.push("IE " + F[1] + " mode"), D && (D[1] = ""), F[1] = h),
                  F = "IE" == L ? String(F[1].toFixed(1)) : F[0]) : "number" == typeof A.documentMode &&
                /^(?:Chrome|Firefox)\b/.test(L) && (U.push("masking as " + L + " " + F), L = "IE", F =
                  "11.0", D = ["Trident"], H = "Windows");
              else if (I && (R = (h = I.lang.System).getProperty("os.arch"), H = H || h.getProperty(
                  "os.name") + " " + h.getProperty("os.version")), O) {
                try {
                  F = s.require("ringo/engine").version.join("."), L = "RingoJS"
                } catch (e) {
                  (h = s.system) && h.global.system == s.system && (L = "Narwhal", H || (H = h[0].os ||
                    null))
                }
                L || (L = "Rhino")
              } else "object" === (0, i.default)(s.process) && !s.process.browser && (h = s.process) && (
                "object" === (0, i.default)(h.versions) && ("string" == typeof h.versions.electron ? (U.push(
                    "Node " + h.versions.node), L = "Electron", F = h.versions.electron) : "string" ==
                  typeof h.versions.nw && (U.push("Chromium " + F, "Node " + h.versions.node), L =
                    "NW.js", F = h.versions.nw)), L || (L = "Node.js", R = h.arch, H = h.platform, F = (F =
                  /[\d.]+/.exec(h.version)) ? F[0] : null));
              H = H && u(H)
            }
            if (F && (h = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(F) || /(?:alpha|beta)(?: ?\d)?/i.exec(
                n + ";" + (N && c.appMinorVersion)) || /\bMinefield\b/i.test(n) && "a") && (j = /b/i.test(h) ?
                "beta" : "alpha", F = F.replace(RegExp(h + "\\+?$"), "") + ("beta" == j ? w : x) + (
                  /\d+\+?/.exec(h) || "")), "Fennec" == L || "Firefox" == L && /\b(?:Android|Firefox OS)\b/
              .test(H)) L = "Firefox Mobile";
            else if ("Maxthon" == L && F) F = F.replace(/\.[\d.]+/, ".x");
            else if (/\bXbox\b/i.test(B)) "Xbox 360" == B && (H = null), "Xbox 360" == B && /\bIEMobile\b/.test(
              n) && U.unshift("mobile mode");
            else if (!/^(?:Chrome|IE|Opera)$/.test(L) && (!L || B || /Browser|Mobi/.test(L)) ||
              "Windows CE" != H && !/Mobi/i.test(n))
              if ("IE" == L && N) try {
                null === s.external && U.unshift("platform preview")
              } catch (e) {
                U.unshift("embedded")
              } else(/\bBlackBerry\b/.test(B) || /\bBB10\b/.test(n)) && (h = (RegExp(B.replace(/ +/g,
                  " *") + "/([.\\d]+)", "i").exec(n) || 0)[1] || F) ? (H = ((h = [h, /BB10/.test(n)])[1] ?
                  (B = null, q = "BlackBerry") : "Device Software") + " " + h[0], F = null) : this != l &&
                "Wii" != B && (N && _ || /Opera/.test(L) && /\b(?:MSIE|Firefox)\b/i.test(n) || "Firefox" ==
                  L && /\bOS X (?:\d+\.){2,}/.test(H) || "IE" == L && (H && !/^Win/.test(H) && F > 5.5 ||
                    /\bWindows XP\b/.test(H) && F > 8 || 8 == F && !/\bTrident\b/.test(n))) && !r.test(h =
                  t.call(l, n.replace(r, "") + ";")) && h.name && (h = "ing as " + h.name + ((h = h.version) ?
                  " " + h : ""), r.test(L) ? (/\bIE\b/.test(h) && "Mac OS" == H && (H = null), h =
                  "identify" + h) : (h = "mask" + h, L = E ? u(E.replace(/([a-z])([A-Z])/g, "$1 $2")) :
                  "Opera", /\bIE\b/.test(h) && (H = null), N || (F = null)), D = ["Presto"], U.push(h));
              else L += " Mobile";
            (h = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(n) || 0)[1]) && (h = [parseFloat(h.replace(/\.(\d)$/,
                ".0$1")), h], "Safari" == L && "+" == h[1].slice(-1) ? (L = "WebKit Nightly", j = "alpha",
                F = h[1].slice(0, -1)) : F != h[1] && F != (h[2] = (/\bSafari\/([\d.]+\+?)/i.exec(n) || 0)[
                1]) || (F = null), h[1] = (/\bChrome\/([\d.]+)/i.exec(n) || 0)[1], 537.36 == h[0] && 537.36 ==
              h[2] && parseFloat(h[1]) >= 28 && "WebKit" == D && (D = ["Blink"]), N && (T || h[1]) ? (D &&
                (D[1] = "like Chrome"), h = h[1] || ((h = h[0]) < 530 ? 1 : h < 532 ? 2 : h < 532.05 ? 3 :
                  h < 533 ? 4 : h < 534.03 ? 5 : h < 534.07 ? 6 : h < 534.1 ? 7 : h < 534.13 ? 8 : h <
                  534.16 ? 9 : h < 534.24 ? 10 : h < 534.3 ? 11 : h < 535.01 ? 12 : h < 535.02 ? "13+" : h <
                  535.07 ? 15 : h < 535.11 ? 16 : h < 535.19 ? 17 : h < 536.05 ? 18 : h < 536.1 ? 19 : h <
                  537.01 ? 20 : h < 537.11 ? "21+" : h < 537.13 ? 23 : h < 537.18 ? 24 : h < 537.24 ? 25 :
                  h < 537.36 ? 26 : "Blink" != D ? "27" : "28")) : (D && (D[1] = "like Safari"), h = (h = h[
                  0]) < 400 ? 1 : h < 500 ? 2 : h < 526 ? 3 : h < 533 ? 4 : h < 534 ? "4+" : h < 535 ? 5 :
                h < 537 ? 6 : h < 538 ? 7 : h < 601 ? 8 : "8"), D && (D[1] += " " + (h += "number" ==
                typeof h ? ".x" : /[.+]/.test(h) ? "" : "+")), "Safari" == L && (!F || parseInt(F) > 45) &&
              (F = h)), "Opera" == L && (h = /\bzbov|zvav$/.exec(H)) ? (L += " ", U.unshift("desktop mode"),
                "zvav" == h ? (L += "Mini", F = null) : L += "Mobile", H = H.replace(RegExp(" *" + h + "$"),
                  "")) : "Safari" == L && /\bChrome\b/.exec(D && D[1]) && (U.unshift("desktop mode"), L =
                "Chrome Mobile", F = null, /\bOS X\b/.test(H) ? (q = "Apple", H = "iOS 4.3+") : H = null),
              F && 0 == F.indexOf(h = /[\d.]+$/.exec(H)) && n.indexOf("/" + h + "-") > -1 && (H = f(H.replace(
                h, ""))), D && !/\b(?:Avant|Nook)\b/.test(L) && (/Browser|Lunascape|Maxthon/.test(L) ||
                "Safari" != L && /^iOS/.test(H) && /\bSafari\b/.test(D[1]) ||
                /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
                  L) && D[1]) && (h = D[D.length - 1]) && U.push(h), U.length && (U = ["(" + U.join("; ") +
                ")"
              ]), q && B && B.indexOf(q) < 0 && U.push("on " + q), B && U.push((/^on /.test(U[U.length - 1]) ?
                "" : "on ") + B), H && (h = / ([\d.+]+)$/.exec(H), y = h && "/" == H.charAt(H.length - h[0]
                .length - 1), H = {
                architecture: 32,
                family: h && !y ? H.replace(h[0], "") : H,
                version: h ? h[1] : null,
                toString: function() {
                  var e = this.version;
                  return this.family + (e && !y ? " " + e : "") + (64 == this.architecture ? " 64-bit" :
                    "")
                }
              }), (h = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(R)) && !/\bi686\b/i.test(R) ? (H && (H.architecture =
                64, H.family = H.family.replace(RegExp(" *" + h), "")), L && (/\bWOW64\b/i.test(n) || N &&
                /\w(?:86|32)$/.test(c.cpuClass || c.platform) && !/\bWin64; x64\b/i.test(n)) && U.unshift(
                "32-bit")) : H && /^OS X/.test(H.family) && "Chrome" == L && parseFloat(F) >= 39 && (H.architecture =
                64), n || (n = null);
            var J = {};
            return J.description = n, J.layout = D && D[0], J.manufacturer = q, J.name = L, J.prerelease =
              j, J.product = B, J.ua = n, J.version = L && F, J.os = H || {
                architecture: null,
                family: null,
                version: null,
                toString: function() {
                  return "null"
                }
              }, J.parse = t, J.toString = function() {
                return this.description || ""
              }, J.version && U.unshift(F), J.name && U.unshift(L), H && L && (H != String(H).split(" ")[0] ||
                H != L.split(" ")[0] && !B) && U.push(B ? "(" + H + ")" : "on " + H), U.length && (J.description =
                U.join(" ")), J
          }()
        }();
        e.exports = o
      }).call(this, n(31))
    }, function(e, t) {
      e.exports = {}
    }, , function(e, t, n) {
      "use strict";
      var r = n(52),
        s = n(57),
        i = (n(26), n(2)),
        o = n(0),
        a = o.undef,
        c = n(170),
        u = n(80),
        l = n(117);

      function m(e) {
        o.verifyOptions(e, "appKey account token", "protocol::IMProtocol"), o.verifyCallback(e, ["onconnect",
          "onerror", "onwillreconnect", "ondisconnect", "onloginportschange", "onmyinfo", "onblacklist",
          "onmutelist", "onfriends", "onusers", "onrobots", "onteams", "onsessions", "onroamingmsgs",
          "onofflinemsgs", "onofflinefiltermsgs", "onroamingsysmsgs", "onofflinesysmsgs",
          "onofflinefiltersysmsgs", "onofflinecustomsysmsgs", "onofflinefiltercustomsysmsgs",
          "onbroadcastmsg", "onbroadcastmsgs", "onsysmsgunread", "onsyncdone", "onteammembers",
          "onsyncteammembersdone", "onmsg", "onsysmsg", "oncustomsysmsg", "onupdatemyinfo", "onupdateuser",
          "onupdateteammember", "onCreateTeam", "onUpdateTeam", "onAddTeamMembers", "onRemoveTeamMembers",
          "onUpdateTeamManagers", "onDismissTeam", "onTransferTeam", "onUpdateTeamMembersMute",
          "onTeamMsgReceipt", "onupdatesession", "onupdatesysmsgunread", "onupdatesysmsg", "onsynccreateteam",
          "onsyncmarkinblacklist", "onsyncmarkinmutelist", "onsyncfriendaction", "shouldIgnoreNotification",
          "shouldCountNotifyUnread", "onPushNotificationMultiportConfig",
          "onPushNotificationMultiportConfigUpdate", "onpushevents"
        ], "protocol::IMProtocol"), this.db = e.api.db = new r({
          logger: e.logger
        }), s.call(this, e)
      }
      var d = s.fn,
        p = m.fn = m.prototype = Object.create(d);
      p.init = function() {
          d.init.call(this), u.IM.setProtocol(this), this.parser = u.IM, this.sendCmd.bind(this), this.socketUrls = [],
            this.syncing = !0, this.hasSynced = !1, this.hasSyncedTeamMembers = !1, this.syncPromiseArray = [],
            this.syncResult = {}, this.syncTeamMembersPromiseArray = [], this.syncTeamMembersResult = {}, this.timetags = {},
            this.sysMsgUnread = l.completeUnread({}), this.resetUnsettledMsgs(), this.resetUnsettledSysMsgs(),
            this.msgPromise = Promise.resolve(), this.sysMsgPromise = Promise.resolve(), this.sessionSet = {},
            this.msgReceiptTasks = {}, this.userSet = {}, this.pushNotificationMultiportConfig = c.getDefaultConfig()
        }, p.reset = function() {
          d.reset.call(this);
          var e = this.options;
          this.db.reset(e.db), a(e.lbsUrl) && (e.lbsUrl = i.lbsUrl), this.resetAutoMarkRead()
        }, p.resetAutoMarkRead = function() {
          var e = this.options;
          o.verifyBooleanWithDefault(e, "autoMarkRead", !0, "", "protocol::resetAutoMarkRead")
        }, p.resetUnsettledMsgs = function() {
          this.unhandledMsgs = [], this.unupdatedMsgs = []
        }, p.resetUnsettledSysMsgs = function() {
          this.unhandledSysMsgs = [], this.unupdatedSysMsgs = []
        }, p.packetFromSync = function(e) {
          return !e.obj || !!e.obj.sync
        }, e.exports = m, n(435), n(434), n(433), n(427), n(425), n(424), n(423), n(422), n(421), n(420), n(419),
        n(418), n(417), n(416), n(415), n(414), n(413)
    }, function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };

      function o(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        this.message = e || n.message || "", "object" === (void 0 === t ? "undefined" : (0, i.default)(t)) ? (
            this.event = t, this.code = "Other_Error") : void 0 !== t && (this.code = t), this.timetag = +new Date,
          void 0 !== n && (this.event = n), this.event && (this.callFunc = this.event.callFunc || null, delete this
            .event.callFunc)
      }
      o.prototype = Object.create(Error.prototype), o.prototype.name = "NIMError";
      var a = {
        201: "客户端版本不对, 需升级sdk",
        302: "用户名或密码错误, 请检查appKey和token是否有效, account和token是否匹配",
        403: "非法操作或没有权限",
        404: "对象(用户/群/聊天室)不存在",
        405: "参数长度过长",
        408: "���户端请求超时",
        414: "参数错误",
        415: "服务不可用/没有聊天室服务器可分配",
        416: "频率控制",
        417: "重复操作",
        422: "帐号被禁用",
        500: "服务器内部错误",
        501: "数据库操作失败",
        503: "服务器繁忙",
        508: "删除有效期过了",
        509: "已失效",
        7101: "被拉黑",
        801: "群人数达到上限",
        802: "没有权限",
        803: "群不存在或未发生变化",
        804: "用户不在群里面",
        805: "群类型不匹配",
        806: "创建群数量达到限制",
        807: "群成员状态不对",
        809: "已经在群里",
        811: "强推列表中帐号数量超限",
        812: "群被禁言",
        813: "因群数量限制，部分拉人成功",
        814: "禁止使用群组消息已读服务",
        815: "群管理员人数上限",
        997: "协议已失效",
        998: "解包错误",
        999: "打包错误",
        9102: "通道失效",
        9103: "已经在其他端接听/拒绝过这通电话",
        11001: "对方离线, 通话不可送达",
        13002: "聊天室状态异常",
        13003: "在黑名单中",
        13004: "在禁言名单中",
        13006: "聊天室处于整体禁言状态,只有管理员能发言",
        Connect_Failed: "无法建立连接, 请确保能 ping/telnet 到云信服务器; 如果是IE8/9, 请确保项目部署在 HTTPS 环境下",
        Error_Internet_Disconnected: "网断了",
        Error_Connection_is_not_Established: "连接未建立",
        Error_Connection_Socket_State_not_Match: "socket状态不对",
        Error_Timeout: "超时",
        Param_Error: "参数错误",
        No_File_Selected: "请选择文件",
        Wrong_File_Type: "文件类型错误",
        File_Too_Large: "文件过大",
        Cross_Origin_Iframe: "不能获取跨域Iframe的内容",
        Not_Support: "不支持",
        NO_DB: "无数据库",
        DB: "数据库错误",
        Still_In_Team: "还在群里",
        Session_Exist: "会话已存在",
        Session_Not_Exist: "会话不存在",
        Error_Unknown: "未知错误",
        Operation_Canceled: "操作取消"
      };
      [200, 406, 808, 810].forEach(function(e) {
        a[e] = null
      }), o.genError = function(e) {
        var t = a[e];
        return void 0 === t && (t = "操作失败"), null === t ? null : new o(t, e)
      }, o.multiInstance = function(e) {
        return new o("不允许初始化多个实例", "Not_Allow_Multi_Instance", e)
      }, o.newNetworkError = function(e) {
        var t = "Error_Internet_Disconnected";
        return new o(a[t], t, e)
      }, o.newConnectError = function(e) {
        var t = "Connect_Failed";
        return new o(a[t] || null, t, e)
      }, o.newConnectionError = function(e) {
        var t = "Error_Connection_is_not_Established";
        return new o(a[t], t, e)
      }, o.newSocketStateError = function(e) {
        var t = "Error_Connection_Socket_State_not_Match";
        return new o(a[t], t, e)
      }, o.newTimeoutError = function(e) {
        var t = "Error_Timeout";
        return new o(a[t], t, e)
      }, o.newFrequencyControlError = function(e) {
        var t = new o(a[416], 416, e);
        return t.from = "local", t
      }, o.newParamError = function(e, t) {
        return new o(e || a.Param_Error, "Param_Error", t)
      }, o.newNoFileError = function(e, t) {
        var n = "No_File_Selected";
        return new o(e || a[n], n, t)
      }, o.newWrongFileTypeError = function(e, t) {
        var n = "Wrong_File_Type";
        return new o(e || a[n], n, t)
      }, o.newFileTooLargeError = function(e, t) {
        var n = "File_Too_Large";
        return new o(e || a[n], n, t)
      }, o.newCORSIframeError = function(e) {
        var t = "Cross_Origin_Iframe";
        return new o(a[t], t, e)
      }, o.newSupportError = function(e, t, n) {
        return new o("不支持" + e, "Not_Support_" + t, n)
      }, o.newSupportDBError = function(e) {
        return o.newSupportError("数据库", "DB", e)
      }, o.noDBError = function(e) {
        return new o(a.NO_DB, "NO_DB", e)
      }, o.newDBError = function(e) {
        return new o(a.DB, "DB", e)
      }, o.newUnknownError = function(e) {
        var t = "Error_Unknown";
        return new o(a[t], t, e)
      }, o.stillInTeamError = function(e) {
        var t = "Still_In_Team";
        return new o(a[t], t, e)
      }, o.sessionExist = function(e) {
        var t = "Session_Exist";
        return new o(a[t], t, e)
      }, o.sessionNotExist = function(e) {
        var t = "Session_Not_Exist";
        return new o(a[t], t, e)
      }, o.cancel = function(e) {
        var t = "Operation_Canceled";
        return new o(a[t], t, e)
      }, o.customError = function(e, t) {
        e = e || "Other_Error";
        var n = "";
        return (t = t || {}).message || (n = a[e] || e), "object" !== (void 0 === e ? "undefined" : (0, i.default)
          (e)) ? new o(n, e, t) : new o(n, "Other_Error", void 0 === t ? e : t)
      }, e.exports = o
    }, function(e, t) {
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
      var n = 0,
        r = Math.random();
      e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
      }
    }, function(e, t, n) {
      var r = n(62),
        s = n(41);
      e.exports = Object.keys || function(e) {
        return r(e, s)
      }
    }, function(e, t) {
      var n;
      n = function() {
        return this
      }();
      try {
        n = n || Function("return this")() || (0, eval)("this")
      } catch (e) {
        "object" == typeof window && (n = window)
      }
      e.exports = n
    }, function(e, t, n) {
      "use strict";
      var r = n(47),
        s = n(25),
        i = n(2),
        o = n(412),
        a = n(80).IM;

      function c(e) {
        return this.subType = "im", this.nosScene = e.nosScene || "im", this.nosSurvivalTime = e.nosSurvivalTime,
          e.Protocol = s, e.Message = o, e.constructor = c, this.init(e)
      }
      c.Protocol = s, c.parser = a, c.use = r.use, c.getInstance = r.getInstance, c.rmAllInstances = r.rmAllInstances,
        c.genInstanceName = function(e) {
          return "NIM-account-" + e.account
        };
      var u = c.fn = c.prototype = Object.create(r.prototype);
      c.info = u.info = i.info, e.exports = c, n(402), n(401), n(400), n(399), n(398), n(397), n(396), n(395), n(
        394), n(393), n(392), n(391), n(390), n(389), n(388), n(387), n(386)
    }, function(e, t) {
      var n = {}.toString;
      e.exports = function(e) {
        return n.call(e).slice(8, -1)
      }
    }, function(e, t, n) {
      var r = n(13).f,
        s = n(14),
        i = n(6)("toStringTag");
      e.exports = function(e, t, n) {
        e && !s(e = n ? e : e.prototype, i) && r(e, i, {
          configurable: !0,
          value: t
        })
      }
    }, function(e, t) {
      e.exports = !0
    }, function(e, t, n) {
      "use strict";
      var r = n(49),
        s = n(135),
        i = n(134),
        o = n(133);
      r.json = s, r.upload = i, r.chunkUpload = o, e.exports = r
    }, function(e, t, n) {
      var r = n(56);
      e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
          case 1:
            return function(n) {
              return e.call(t, n)
            };
          case 2:
            return function(n, r) {
              return e.call(t, n, r)
            };
          case 3:
            return function(n, r, s) {
              return e.call(t, n, r, s)
            }
        }
        return function() {
          return e.apply(t, arguments)
        }
      }
    }, function(e, t) {
      t.f = Object.getOwnPropertySymbols
    }, function(e, t, n) {
      var r = n(8),
        s = n(7),
        i = n(35),
        o = n(40),
        a = n(13).f;
      e.exports = function(e) {
        var t = s.Symbol || (s.Symbol = i ? {} : r.Symbol || {});
        "_" == e.charAt(0) || e in t || a(t, e, {
          value: o.f(e)
        })
      }
    }, function(e, t, n) {
      t.f = n(6)
    }, function(e, t) {
      e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf"
        .split(",")
    }, function(e, t, n) {
      var r = n(8),
        s = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});
      e.exports = function(e) {
        return s[e] || (s[e] = {})
      }
    }, function(e, t, n) {
      var r = n(42)("keys"),
        s = n(29);
      e.exports = function(e) {
        return r[e] || (r[e] = s(e))
      }
    }, function(e, t, n) {
      var r = n(19);
      e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, s;
        if (t && "function" == typeof(n = e.toString) && !r(s = n.call(e))) return s;
        if ("function" == typeof(n = e.valueOf) && !r(s = n.call(e))) return s;
        if (!t && "function" == typeof(n = e.toString) && !r(s = n.call(e))) return s;
        throw TypeError("Can't convert object to primitive value")
      }
    }, function(e, t) {
      e.exports = function(e) {
        if (null == e) throw TypeError("Can't call method on  " + e);
        return e
      }
    }, function(e, t) {
      var n = Math.ceil,
        r = Math.floor;
      e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
      }
    }, function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(10),
        a = n(0),
        c = a.notundef,
        u = n(304),
        l = n(2);

      function m() {}
      var d = {};
      m.getInstance = function(e) {
        e = f(e), a.verifyOptions(e, "account", "api::Base.getInstance");
        var t = this.genInstanceName(e),
          n = d[t];
        return n ? m.updateInstance(n, e) : n = d[t] = new this(e), n
      }, m.updateInstance = function(e, t) {
        e.setOptions(t), e.connect()
      };
      var p = m.fn = m.prototype = Object.create(new o),
        f = function(e) {
          return e.nosSurvivalTime ? (a.verifyParamType("nosSurvivalTime", e.nosSurvivalTime, "number",
            "api::Base.getInstance"), a.verifyParamMin("nosSurvivalTime", e.nosSurvivalTime, 86400,
            "api::Base.getInstance")) : e.nosSurvivalTime = 1 / 0, e
        };
      p.updatePrivateConf = function(e) {
        if (e && "object" === (0, i.default)(e.privateConf)) {
          var t = e.privateConf;
          "string" == typeof t.lbs_web && (e.lbsUrl = t.lbs_web), "boolean" == typeof t.link_ssl_web && (e.secure =
              t.link_ssl_web), "boolean" == typeof t.https_enabled && (e.httpsEnabled = t.https_enabled), e.uploadUrl =
            t.nos_uploader_web ? t.nos_uploader_web : null, e.chunkUploadUrl = t.nos_uploader_web ? t.nos_uploader_web :
            null, e.replaceUrl = t.nos_downloader ? t.nos_downloader : null, e.downloadUrl = t.nos_accelerate ?
            t.nos_accelerate : null, e.downloadHost = t.nos_accelerate_host ? t.nos_accelerate_host : null, e.ntServerAddress =
            t.nt_server
        }
        return null === e.ntServerAddress || "" === e.ntServerAddress ? l.ntServerAddress = null : l.ntServerAddress =
          e.ntServerAddress || l.defaultReportUrl, l.uploadUrl = e.uploadUrl || l.uploadUrl, l.downloadUrl = e.downloadUrl ||
          l.downloadUrl, l.downloadHost = e.downloadHost || l.downloadHost, l.replaceUrl = e.replaceUrl || l.replaceUrl,
          l.httpsEnabled = e.httpsEnabled || l.httpsEnabled, e
      }, p.init = function(e) {
        a.verifyOptions(e, "account", "api::Base.init"), e = this.updatePrivateConf(e);
        var t = this.account = e.account = e.account + "",
          n = e.constructor.genInstanceName(e),
          r = d[n];
        if (e._disableSingleton && (r = null), r) return m.updateInstance(r, e), r;
        this.name = n, d[n] = this, this.logger = e.logger = new u({
          debug: e.debug,
          logFunc: e.logFunc,
          prefix: this.subType
        }), e.api = this;
        var s = this.protocol = new e.Protocol(e);
        return s.name = "Protocol-" + n, s.account = t, s.api = this, s.message = this.message = new e.Message({
          account: t
        }), this.options = a.copy(e), this.reset(), this
      }, p.destroy = function(e) {
        e = e || {};
        var t = this.name;
        this.protocol && this.protocol.resetPush && this.protocol.resetPush();
        var n = this;
        this.disconnect({
          done: function(r) {
            n.logger.warn("ApiBase::destroy: instance destroyed ..."), Object.getOwnPropertyNames(n).forEach(
              function(e) {
                delete n[e]
              }), d && (delete d[t], d[t] = null), e.done instanceof Function && e.done(r)
          }
        })
      }, p.reset = function() {
        var e = this.updatePrivateConf(this.options);
        a.verifyBooleanWithDefault(e, "exifOrientation", !0, "", "api::Base.reset")
      }, p.setOptions = function(e) {
        this.reset(), this.protocol.setOptions(e)
      }, p.processCallback = function(e, t) {
        g(e, t)
      }, p.processCallbackPromise = function(e, t) {
        return new Promise(function(n, r) {
          g(e, t, !0, n, r)
        })
      };
      var g = function(e, t, n, r, s) {
        var i = "api::processCallback";
        n && (i = "api::processCallbackPromise"), a.verifyCallback(e, "done", i), e.callback = function(o, u, l) {
          var m = e.callback.options;
          if (u = u || m, t && (u = m), a.isFunction(e.cbaop)) {
            var d = e.cbaop(o, u);
            c(d) && (u = d)
          }
          var p = e.done;
          a.isObject(u) && (delete u.done, delete u.cb, delete u.callback), n ? o ? s({
            message: "生成接口回调错误",
            callFunc: i,
            event: o
          }) : r(u) : p(o, u, l)
        }, e.callback.options = a.copy(e)
      };
      p.processPs = function(e) {
        a.notexist(e.ps) && (e.ps = "")
      }, p.processCustom = function(e) {
        a.notexist(e.custom) && (e.custom = "")
      }, p.sendCmd = function() {
        this.protocol.sendCmd.apply(this.protocol, arguments)
      }, p.sendCmdWithResp = function(e, t, n) {
        this.sendCmd(e, t, function(e, t, r) {
          a.isFunction(n) && (e ? n(e, t) : n(null, r))
        })
      }, p.cbAndSendCmd = function(e, t) {
        var n = this.processCallbackPromise(t);
        return this.sendCmd(e, t), n
      }, p.sendCmdUsePromise = function(e, t) {
        var n = this;
        return new Promise(function(r, s) {
          n.sendCmd(e, t, function(e, t, n) {
            if (e) s(e);
            else {
              var i = a.merge({}, t, n);
              r(i)
            }
          })
        })
      }, m.use = function(e, t) {
        e && e.install && a.isFunction(e.install) && e.install(this, t)
      }, m.rmAllInstances = function() {
        for (var e in d) d[e].destroy();
        d = {}
      }, p.logout = function(e) {
        this.protocol.shouldReconnect = !1, this.protocol.doLogout = !0, this.processCallback(e), this.sendCmd(
          "logout", e, e.callback)
      }, e.exports = m, n(303), n(302), n(299), n(298), n(297), n(296), n(295)
    }, function(e, t, n) {
      var r = n(45);
      e.exports = function(e) {
        return Object(r(e))
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(12),
        s = n(139),
        i = n(137),
        o = n(136),
        a = {},
        c = r.f;

      function u(e) {
        var t = e.upload = "multipart/form-data" === (e.headers || r.o)["Content-Type"],
          n = !1;
        try {
          n = (location.protocol + "//" + location.host).toLowerCase() !== r.url2origin(e.url)
        } catch (e) {}
        return e.cors = n, t || n || e.mode ? function(e) {
          var t = e.mode,
            n = s,
            a = r.getGlobal();
          return !a.FormData && a.document && (t = "iframe"), "iframe" === t && (n = e.upload ? i : o), new n(e)
        }(e) : new s(e)
      }

      function l(e, t, n) {
        var r = a[e];
        if (r) {
          "onload" === t && r.result && (n = function(e, t) {
              t = {
                data: t
              };
              var n = e.result.headers;
              return n && (t.headers = e.req.header(n)), t
            }(r, n)),
            function(e) {
              var t = a[e];
              t && (t.req.destroy(), delete a[e])
            }(e);
          var s = {
            type: t,
            result: n
          };
          c(s), s.stopped || r[t](s.result)
        }
      }

      function m(e, t) {
        var n = r.genUrlSep(e);
        return t = t || "", r.isObject(t) && (t = r.object2query(t)), t && (e += n + t), e
      }

      function d(e, t) {
        t = t || {};
        var n = r.uniqueID(),
          s = {
            result: t.result,
            onload: t.onload || r.f,
            onerror: t.onerror || r.f
          };
        a[n] = s, t.onload = function(e, t) {
          l(e, "onload", t)
        }.bind(null, n), t.onerror = function(e, t) {
          l(e, "onerror", t)
        }.bind(null, n), t.query && (e = m(e, t.query));
        var i = t.method || "";
        return i && !/get/i.test(i) || !t.data || (e = m(e, t.data), t.data = null), t.url = e, s.req = u(t), n
      }
      d.filter = function(e) {
        r.isFunction(e) && (c = e)
      }, d.abort = function(e) {
        var t = a[e];
        t && t.req && t.req.abort()
      }, e.exports = d
    }, function(e, t, n) {
      var r = n(16),
        s = n(102),
        i = n(41),
        o = n(43)("IE_PROTO"),
        a = function() {},
        c = function() {
          var e, t = n(53)("iframe"),
            r = i.length;
          for (t.style.display = "none", n(76).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document)
            .open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; r--;) delete c.prototype[
            i[r]];
          return c()
        };
      e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (a.prototype = r(e), n = new a, a.prototype = null, n[o] = e) : n = c(), void 0 ===
          t ? n : s(n, t)
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(104)(!0);
      n(65)(String, "String", function(e) {
        this._t = String(e), this._i = 0
      }, function() {
        var e, t = this._t,
          n = this._i;
        return n >= t.length ? {
          value: void 0,
          done: !0
        } : (e = r(t, n), this._i += e.length, {
          value: e,
          done: !1
        })
      })
    }, function(e, t, n) {
      "use strict";
      var r = n(448);
      r.fn = r.prototype, e.exports = r, n(445), n(444), n(443), n(442), n(441), n(440), n(439), n(438), n(437),
        n(436)
    }, function(e, t, n) {
      var r = n(19),
        s = n(8).document,
        i = r(s) && r(s.createElement);
      e.exports = function(e) {
        return i ? s.createElement(e) : {}
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(0),
        s = {
          init: function() {
            s.deviceId = r.guid()
          }
        };
      s.init(), s.clientTypeMap = {
        1: "Android",
        2: "iOS",
        4: "PC",
        8: "WindowsPhone",
        16: "Web",
        32: "Server",
        64: "Mac"
      }, s.db = {
        open: function() {}
      }, e.exports = s
    }, function(e, t, n) {
      n(99);
      for (var r = n(8), s = n(20), i = n(23), o = n(6)("toStringTag"), a =
          "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList"
          .split(","), c = 0; c < a.length; c++) {
        var u = a[c],
          l = r[u],
          m = l && l.prototype;
        m && !m[o] && s(m, o, u), i[u] = i.Array
      }
    }, function(e, t) {
      e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(0),
        s = n(2),
        i = n(26);

      function o(e) {
        r.undef(e.secure) && (e.secure = !0), this.options = r.copy(e), this.keepNosSafeUrl = this.options.keepNosSafeUrl ||
          !1, this.init(), this.connect(), this.initConnecting = !0
      }
      var a = o.fn = o.prototype;
      a.init = function() {
        this.logger = this.options.logger, this.getNosOriginUrlReqNum = 0, this.checkNosReqNum = 0, this.cmdTaskArray = [],
          this.timerMap = {}, this.cmdCallbackMap = {}, this.cmdContentMap = {}, this.initConnect(), this.reset()
      }, a.reset = function() {
        this.resetConnect()
      }, a.setOptions = function(e) {
        var t = this.options,
          n = Object.keys(t),
          s = n.indexOf("account"); - 1 !== s && n.splice(s, 1), e = r.filterObj(e, n), this.options = r.merge(
          t, e), this.reset()
      }, a.sendCmd = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = arguments[2];
        this.heartbeat(), "heartbeat" !== e && this.logger.warn("protocol::sendCmd: " + e, t);
        var r, s = e,
          i = (e = this.parser.createCmd(e, t)).SER;
        t = t || {}, this.cmdContentMap[i] = t, t.single && (delete t.single, 1 === (r = Object.keys(t)).length &&
          (this.cmdContentMap[i] = t[r[0]])), t.NOTSTORE && ((r = t.NOTSTORE.split(" ")).forEach(function(e) {
          delete t[e]
        }), delete t.NOTSTORE), (n = n || t.callback) && (this.cmdCallbackMap[i] = n), this.cmdTaskArray.push({
          cmdName: s,
          cmd: JSON.stringify(e)
        }), this.startCmdTaskTimer()
      }, a.startCmdTaskTimer = function() {
        var e = this;
        e.cmdTaskTimer || (e.cmdTaskTimer = setTimeout(function() {
          var t = e.cmdTaskArray.shift();
          e.cmdTaskTimer = null, t && e.executeCmdTask(t), e.cmdTaskArray.length && e.startCmdTaskTimer()
        }, 0))
      }, a.executeCmdTask = function(e) {
        var t = e.cmdName,
          n = e.cmd,
          r = (n = JSON.parse(n)).SER;
        this.isFrequencyControlled(t) ? (this.logger.warn("protocol::executeCmdTask: " + t +
          " hit freq control"), this.markCallbackInvalid(r, i.newFrequencyControlError({
          callFunc: "protocol::executeCmdTask",
          message: t + " hit freq control"
        }))) : this.isConnected() ? ("heartbeat" !== t && this.logger.log("protocol::sendCmd: " + t + " " +
          JSON.stringify(n)), this.doSendCmd(n)) : (this.logger.warn("protocol::executeCmdTask: " + t +
          " not connected"), this.markCallbackInvalid(r, i.newSocketStateError({
          callFunc: "protocol::executeCmdTask",
          message: t + " not connected"
        })))
      }, a.isFrequencyControlled = function(e) {
        var t = this.frequencyControlMap && this.frequencyControlMap[e];
        if (t) {
          if (Date.now() < t.from + t.duration) return !0;
          delete this.frequencyControlMap[e]
        }
      }, a.doSendCmd = function(e) {
        var t = this,
          n = e.SER;

        function r() {
          t.markCallbackInvalid(n, i.newSocketStateError({
            callFunc: "protocol::doSendCmd",
            message: "ser " + n + " socketSendJson Error"
          })), t.onDisconnect(!0, "protocol::doSendCmd:socketSendJson")
        }
        t.timerMap[n] = setTimeout(function() {
          t.markCallbackInvalid(n, i.newTimeoutError({
            callFunc: "protocol::doSendCmd",
            message: "ser " + n + " Timeout Error"
          }))
        }, s.cmdTimeout);
        try {
          t.socket && t.socket.send ? t.socket.send(JSON.stringify(e)) : r()
        } catch (e) {
          r()
        }
      }, a.getObjWithSer = function(e) {
        var t = this.cmdContentMap[e];
        return delete this.cmdContentMap[e], t && r.copy(t)
      }, a.getCallbackWithSer = function(e) {
        var t = this.cmdCallbackMap[e];
        return t && !t.isImSyncDataCb && delete this.cmdCallbackMap[e], t
      }, a.getTimerWithSer = function(e) {
        var t = this.timerMap[e];
        return delete this.timerMap[e], t
      }, a.clearTimerWithSer = function(e) {
        var t = this.getTimerWithSer(e);
        t && clearTimeout(t)
      }, a.markCallbackInvalid = function(e, t) {
        this.getObjWithSer(e), this.clearTimerWithSer(e);
        var n = this.getCallbackWithSer(e);
        if (n) {
          var r = n.options;
          setTimeout(function() {
            n(t || i.newUnknownError({
              ser: e
            }), r)
          }, 0)
        }
      }, a.markAllCallbackInvalid = function(e) {
        var t = this;
        Object.keys(this.cmdCallbackMap).forEach(function(n) {
          t.markCallbackInvalid(n, e)
        })
      }, a.getPacketObj = function(e) {
        var t = null;
        if (e && e.raw) {
          var n = e.raw.ser;
          r.notundef(n) && (t = this.getObjWithSer(n))
        }
        return t
      }, a.callPacketAckCallback = function(e) {
        var t = this;
        if (e && e.raw) {
          var n = e.raw.ser;
          if (r.notundef(n)) {
            t.clearTimerWithSer(n);
            var s = t.getCallbackWithSer(n);
            s && (s.originUrl && e.obj && e.obj.file && (e.obj.file._url_safe = e.obj.file.url, e.obj.file.url =
              s.originUrl, "audio" === e.obj.type && (e.obj.file.mp3Url = s.originUrl + (~s.originUrl.indexOf(
                "?") ? "&" : "?") + "audioTrans&type=mp3")), e.promise ? e.promise.then(function() {
              s(e.error, e.obj)
            }, function(r) {
              r.callFunc = "protocol::callPacketAckCallback", r.message = "Resp Promoise Error: cmd: " +
                e.cmd + ", ser: " + n;
              var o = i.customError("CALLBACK_ACK_ERR", r);
              t.logger.error("protocol::callPacketAckCallback: promise error " + JSON.stringify(r)), s(o,
                e.obj, e.content)
            }) : s(e.error, e.obj, e.content))
          }
        }
      }, a.onMessage = function(e) {
        var t = this;
        t.heartbeat(), t.parser.parseResponse(e).then(function(e) {
          e.notFound && t.logger.warn("protocol::onMessage: packet not found " + JSON.stringify(e)), e.error ?
            (e.error.message = e.cmd + " error: " + e.error.message, t.logger.error(
              "protocol::onMessage: packet error " + JSON.stringify(e.error))) : e.content || "heartbeat" ===
            e.cmd || t.logger.warn("protocol::onMessage: packet.content undefined " + JSON.stringify(e)), e
            .frequencyControlDuration && (t.logger.error("protocol::onMessage: server freq control " + JSON
              .stringify(e.cmd)), t.frequencyControlMap = t.frequencyControlMap || {}, t.frequencyControlMap[
              e.cmd] = {
              from: +new Date,
              duration: e.frequencyControlDuration
            }), e.obj = t.getPacketObj(e), "heartbeat" !== e.cmd && "getClientAntispam" !== e.cmd && t.logger
            .log("protocol::recvCmd: " + e.cmd + " " + e.rawStr);
          var n = "process" + r.capFirstLetter(e.service);
          if (t[n])
            if ("heartbeat" !== e.cmd && t.logger.warn("protocol::recvCmd: " + e.cmd + " " + n, e.content),
              "syncDone" === e.cmd) {
              if (t.cmdCallbackMap[e.raw.ser] && t.cmdCallbackMap[e.raw.ser].isImSyncDataCb) {
                t.cmdCallbackMap[e.raw.ser].isImSyncDataCb = !1;
                var s = function(e, t) {
                  this.checkNosReqNum++, this.getNosOriginUrlReqNum <= 0 || this.checkNosReqNum >= 10 ?
                    this[e](t) : setTimeout(s, 300)
                }.bind(t, n, e);
                s.call(t, n, e)
              }
            } else t[n](e);
          else t.logger.warn("protocol::onMessage: " + n + " not found");
          t.callPacketAckCallback(e)
        })
      }, a.onMiscError = function(e, t, n) {
        t && this.notifyError(e, t, n)
      }, a.onCustomError = function(e, t) {
        var n = i.customError(e, t),
          r = t.message || "未知错误";
        this.onMiscError(r, n)
      }, a.notifyError = function(e, t, n) {
        this.isConnected() && (this.logger.error((e || "") + " " + this.name, t, n), this.options.onerror(t, n))
      }, a.emitAPI = function(e) {
        var t = e.type,
          n = e.obj;
        this.api.emit(t, n)
      }, e.exports = o, n(294), n(292), n(291), n(290), n(289)
    }, function(e, t, n) {
      "use strict";
      t.__esModule = !0;
      var r, s = n(85),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      t.default = i.default || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
      }
    }, function(e, t, n) {
      var r = n(28),
        s = n(27),
        i = n(18),
        o = n(44),
        a = n(14),
        c = n(64),
        u = Object.getOwnPropertyDescriptor;
      t.f = n(15) ? u : function(e, t) {
        if (e = i(e), t = o(t, !0), c) try {
          return u(e, t)
        } catch (e) {}
        if (a(e, t)) return s(!r.f.call(e, t), e[t])
      }
    }, function(e, t, n) {
      var r = n(62),
        s = n(41).concat("length", "prototype");
      t.f = Object.getOwnPropertyNames || function(e) {
        return r(e, s)
      }
    }, function(e, t, n) {
      var r = n(33);
      e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
      }
    }, function(e, t, n) {
      var r = n(14),
        s = n(18),
        i = n(101)(!1),
        o = n(43)("IE_PROTO");
      e.exports = function(e, t) {
        var n, a = s(e),
          c = 0,
          u = [];
        for (n in a) n != o && r(a, n) && u.push(n);
        for (; t.length > c;) r(a, n = t[c++]) && (~i(u, n) || u.push(n));
        return u
      }
    }, function(e, t, n) {
      e.exports = n(20)
    }, function(e, t, n) {
      e.exports = !n(15) && !n(21)(function() {
        return 7 != Object.defineProperty(n(53)("div"), "a", {
          get: function() {
            return 7
          }
        }).a
      })
    }, function(e, t, n) {
      "use strict";
      var r = n(35),
        s = n(17),
        i = n(63),
        o = n(20),
        a = n(23),
        c = n(103),
        u = n(34),
        l = n(75),
        m = n(6)("iterator"),
        d = !([].keys && "next" in [].keys()),
        p = function() {
          return this
        };
      e.exports = function(e, t, n, f, g, h, y) {
        c(n, t, f);
        var v, b, M, T = function(e) {
            if (!d && e in P) return P[e];
            switch (e) {
              case "keys":
              case "values":
                return function() {
                  return new n(this, e)
                }
            }
            return function() {
              return new n(this, e)
            }
          },
          S = t + " Iterator",
          k = "values" == g,
          C = !1,
          P = e.prototype,
          I = P[m] || P["@@iterator"] || g && P[g],
          O = I || T(g),
          x = g ? k ? T("entries") : O : void 0,
          w = "Array" == t && P.entries || I;
        if (w && (M = l(w.call(new e))) !== Object.prototype && M.next && (u(M, S, !0), r || "function" ==
            typeof M[m] || o(M, m, p)), k && I && "values" !== I.name && (C = !0, O = function() {
            return I.call(this)
          }), r && !y || !d && !C && P[m] || o(P, m, O), a[t] = O, a[S] = p, g)
          if (v = {
              values: k ? O : T("values"),
              keys: h ? O : T("keys"),
              entries: x
            }, y)
            for (b in v) b in P || i(P, b, v[b]);
          else s(s.P + s.F * (d || C), t, v);
        return v
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(12),
        s = r.f,
        i = n(138);

      function o(e) {
        e.onload && this.once("load", e.onload), e.onerror && this.once("error", e.onerror), e.onbeforesend &&
          this.once("beforesend", e.onbeforesend), e.onaftersend && this.once("aftersend", e.onaftersend);
        var t = (e = this.options = r.fetch({
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
        r.notexist(t["Content-Type"]) && (t["Content-Type"] = "application/x-www-form-urlencoded"), this.send()
      }
      var a = o.prototype = Object.create(i.prototype);
      a.send = function() {
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
      }, a.doSend = s, a.afterSend = function() {
        var e = this;
        setTimeout(function() {
          e.emit("aftersend", e.options)
        }, 0)
      }, a.onLoad = function(e) {
        var t = this.options,
          n = e.status,
          r = e.result;
        if (0 === ("" + n).indexOf("2")) {
          if ("json" === t.type) try {
            r = JSON.parse(r)
          } catch (e) {
            return console.log("error:", "ignore error parse json,", e), void this.onError("parseError", r)
          }
          this.emit("load", r)
        } else this.onError("serverError", "服务器返回异常状态", {
          status: n,
          result: r
        })
      }, a.onError = function(e, t, n) {
        var s = r.isObject(n) ? n : {};
        s.code = e || "error", s.message = t || "发生错误", this.emit("error", s)
      }, a.onTimeout = function() {
        this.onError("timeout", "请求超时")
      }, a.abort = function() {
        this.onError("abort", "客户端中止")
      }, a.header = function(e) {
        var t = this;
        if (!r.isArray(e)) return t.getResponseHeader(e || "");
        var n = {};
        return e.forEach(function(e) {
          n[e] = t.header(e)
        }), n
      }, a.getResponseHeader = s, a.destroy = s, e.exports = o
    }, function(e, t, n) {
      "use strict";
      var r = n(2),
        s = {
          genUrlSep: function(e) {
            return -1 === (e = "" + e).indexOf("?") ? "?imageView&" : "&"
          },
          urlQuery2Object: function(e) {
            if ("[object String]" !== Object.prototype.toString.call(e) || "" === e) return {};
            var t = e.indexOf("?");
            if (-1 !== t) {
              var n = e.slice(t + 1).split("&"),
                r = {};
              return n.forEach(function(e) {
                if (~e.indexOf("=")) {
                  var t = e.split("=");
                  r[t[0]] = decodeURIComponent(t[1])
                } else r[e] = ""
              }), r
            }
          },
          url2object: function(e) {
            "[object String]" !== Object.prototype.toString.call(e) && (e = "");
            var t = (e = e || "").indexOf("https") >= 0 ? "https://" : "http://",
              n = e.replace(t, "");
            n.indexOf("?") >= 0 && (n = n.substring(0, n.indexOf("?")));
            var r = n.split("/");
            n = r[0];
            var s = "";
            if (r.length > 0 && (s = r.slice(1).join("/")), -1 === e.indexOf("?")) return {
              protocol: t,
              hostname: n,
              path: s,
              query: {}
            };
            var i = e.substr(e.indexOf("?") + 1).split("&"),
              o = {};
            return i.forEach(function(e) {
              if (e.indexOf("=") > 0) {
                var t = e.split("=");
                o[t[0]] = decodeURIComponent(t[1])
              } else o[e] = ""
            }), {
              protocol: t,
              hostname: n,
              path: s,
              query: o
            }
          },
          object2url: function(e) {
            var t = e.protocol,
              n = e.hostname,
              r = e.path,
              s = e.query;
            t = t || "http://", n = n || "", r && (n = n + "/" + r), s = s || {};
            var i = [];
            for (var o in s) "imageView" !== o && i.push(o + "=" + encodeURIComponent(s[o]));
            return i.length > 0 ? "" + t + n + "?imageView&" + i.join("&") : "" + t + n
          },
          genPrivateUrl: function(e) {
            var t = s.url2object(e),
              n = t.hostname,
              i = t.path,
              o = r.downloadHost,
              a = r.downloadUrl;
            if (n === o) {
              var c = i.indexOf("/");
              if (-1 !== c) {
                var u = i.substring(0, c),
                  l = i.substring(c + 1);
                return a.replace("{bucket}", u).replace("{object}", l)
              }
            } else if (n && "[object String]" == Object.prototype.toString.call(n) && ~n.indexOf(o)) {
              var m = t.path,
                d = m.indexOf(".");
              if (-1 !== d) {
                var p = m.substring(0, d),
                  f = m;
                return a.replace("{bucket}", p).replace("{object}", f)
              }
            }
            return e
          }
        };
      e.exports = s
    }, function(e, t) {
      e.exports = function(e, t) {
        var n = t.split(".");
        for (; n.length;) {
          var r = n.shift(),
            s = !1;
          if ("?" == r[r.length - 1] && (r = r.slice(0, -1), s = !0), !(e = e[r]) && s) return e
        }
        return e
      }
    }, function(e, t, n) {
      var r = n(46),
        s = Math.min;
      e.exports = function(e) {
        return e > 0 ? s(r(e), 9007199254740991) : 0
      }
    }, , function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        },
        o = n(67);
      var a = n(0),
        c = a.notundef,
        u = a.exist,
        l = n(118),
        m = n(176),
        d = m.typeMap;

      function p(e) {
        e.resend ? (a.verifyOptions(e, "idClient", "msg::Message"), this.idClient = e.idClient) : this.idClient =
          a.guid(), this.type = d[e.type], this.resend = e.resend ? 1 : 0, c(e.custom) && ("object" === (0, i.default)
            (e.custom) ? (this.logger.info("model::Message: custom should be JsonString, auto transfer"), this.custom =
              JSON.stringify(e.custom)) : this.custom = "" + e.custom), c(e.text) && (this.body = "" + e.text), c(
            e.body) && (this.body = "" + e.body), c(e.yidunEnable) && (this.yidunEnable = e.yidunEnable ? 1 : 0),
          c(e.antiSpamUsingYidun) && (this.antiSpamUsingYidun = e.antiSpamUsingYidun ? 1 : 0), c(e.antiSpamContent) &&
          ("object" === (0, i.default)(e.antiSpamContent) ? (this.logger.info(
              "model::Message: antiSpamContent should be JsonString, auto transfer"), this.antiSpamContent =
            JSON.stringify(e.antiSpamContent)) : this.antiSpamContent = "" + e.antiSpamContent), c(e.antiSpamBusinessId) &&
          ("object" === (0, i.default)(e.antiSpamBusinessId) ? (this.logger.info(
              "model::Message: antiSpamBusinessId should be JsonString, auto transfer"), this.antiSpamBusinessId =
            JSON.stringify(e.antiSpamBusinessId)) : this.antiSpamBusinessId = "" + e.antiSpamBusinessId), c(e.skipHistory) &&
          (this.skipHistory = e.skipHistory ? 1 : 0), c(e.highPriority) && (this.highPriority = e.highPriority ?
            1 : 0), c(e.clientAntiSpam) && (this.clientAntiSpam = e.clientAntiSpam ? 1 : 0)
      }
      p.validTypes = m.validTypes, a.merge(p.prototype, m.prototype), p.getType = m.getType, p.reverse = function(
        e) {
        var t = a.filterObj(e,
          "chatroomId idClient from fromNick fromAvatar _fromAvatar_safe fromCustom userUpdateTime custom status"
        );
        return c(t.fromAvatar) && (t.fromAvatar = (0, o.genPrivateUrl)(t.fromAvatar)), t = a.merge(t, {
            fromClientType: l.reverseType(e.fromClientType),
            time: +e.time,
            type: p.getType(e),
            text: u(e.body) ? e.body : "",
            resend: 1 == +e.resend
          }), c(t.userUpdateTime) && (t.userUpdateTime = +t.userUpdateTime), t.status = t.status || "success",
          t
      }, p.setExtra = function(e, t) {
        m.setFlow(e, t)
      }, e.exports = p
    }, function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(0),
        a = o.undef,
        c = o.notundef,
        u = o.exist,
        l = n(118),
        m = n(176),
        d = "#%@all@%#",
        p = {
          p2p: 0,
          team: 1
        },
        f = {
          0: "p2p",
          1: "team"
        },
        g = Object.keys(p),
        h = m.typeMap,
        y = m.validTypes;

      function v(e) {
        o.verifyOptions(e, "scene to type", "msg::Message"), o.verifyParamValid("scene", e.scene, g,
          "msg::Message");
        this.scene = p[e.scene], this.to = "" + e.to, this.type = h[e.type], this.resend = e.resend ? 1 : 0, e.resend ?
          (o.verifyOptions(e, "idClient", "msg::Message"), this.idClient = e.idClient) : this.idClient = o.guid(),
          c(e.text) && (this.body = "" + e.text), c(e.custom) && ("object" === (0, i.default)(e.custom) ? (this.logger
            .warn("model::Message: custom should be JsonString, auto transfer"), this.custom = JSON.stringify(e
              .custom)) : this.custom = "" + e.custom), c(e.body) && (this.body = "" + e.body), c(e.pushContent) &&
          (this.pushContent = "" + e.pushContent), c(e.pushPayload) && (this.pushPayload = "" + e.pushPayload);
        var t = e.apns;
        if (c(t) && "team" === e.scene) {
          var n = t.accounts;
          c(n) && o.verifyParamType("apns.accounts", n, "array", "msg::Message"), this.apnsAccounts = n ? JSON.stringify(
            n) : d, this.apnsContent = t.content || e.pushContent || "", o.verifyBooleanWithDefault(t,
            "forcePush", !0, "options.apns", "msg::Message"), this.apnsForcePush = t.forcePush ? 1 : 0
        }
        c(e.isHistoryable) && (this.isHistoryable = e.isHistoryable ? 1 : 0), c(e.isRoamingable) && (this.isRoamingable =
            e.isRoamingable ? 1 : 0), c(e.isSyncable) && (this.isSyncable = e.isSyncable ? 1 : 0), c(e.cc) && (
            this.cc = e.cc ? 1 : 0), c(e.isPushable) && (this.isPushable = e.isPushable ? 1 : 0), c(e.isOfflinable) &&
          (this.isOfflinable = e.isOfflinable ? 1 : 0), c(e.isUnreadable) && (this.isUnreadable = e.isUnreadable ?
            1 : 0), c(e.needPushNick) && (this.needPushNick = e.needPushNick ? 1 : 0), c(e.needMsgReceipt) && (
            this.needMsgReceipt = e.needMsgReceipt ? 1 : 0), c(e.yidunEnable) && (this.yidunEnable = e.yidunEnable ?
            1 : 0), c(e.antiSpamUsingYidun) && (this.antiSpamUsingYidun = e.antiSpamUsingYidun ? 1 : 0), c(e.clientAntiSpam) &&
          (this.clientAntiSpam = e.clientAntiSpam ? 1 : 0), c(e.antiSpamContent) && ("object" === (0, i.default)(
            e.antiSpamContent) ? (this.logger.warn(
              "model::Message: antiSpamContent should be JsonString, auto transfer"), this.antiSpamContent =
            JSON.stringify(e.antiSpamContent)) : this.antiSpamContent = "" + e.antiSpamContent), c(e.antiSpamBusinessId) &&
          ("object" === (0, i.default)(e.antiSpamBusinessId) ? (this.logger.warn(
              "model::Message: antiSpamBusinessId should be JsonString, auto transfer"), this.antiSpamBusinessId =
            JSON.stringify(e.antiSpamBusinessId)) : this.antiSpamBusinessId = "" + e.antiSpamBusinessId)
      }
      o.merge(v.prototype, m.prototype), v.prototype.getScene = function() {
        return f[this.scene]
      }, v.getType = m.getType, v.reverse = function(e) {
        var t = {
          scene: f[e.scene] || e.scene,
          from: e.from,
          fromNick: e.fromNick,
          fromClientType: l.reverseType(e.fromClientType),
          fromDeviceId: e.fromDeviceId,
          to: "" + e.to,
          time: +e.time,
          type: v.getType(e),
          text: u(e.body) ? e.body : "",
          isHistoryable: a(e.isHistoryable) || 1 == +e.isHistoryable,
          isRoamingable: a(e.isRoamingable) || 1 == +e.isRoamingable,
          isSyncable: a(e.isSyncable) || 1 == +e.isSyncable,
          cc: a(e.cc) || 1 == +e.cc,
          isPushable: a(e.isPushable) || 1 == +e.isPushable,
          isOfflinable: a(e.isOfflinable) || 1 == +e.isOfflinable,
          isUnreadable: a(e.isUnreadable) || 1 == +e.isUnreadable,
          isReplyMsg: a(e.isReplyMsg) || 1 == +e.isReplyMsg,
          needPushNick: a(e.needPushNick) || 1 == +e.needPushNick,
          needMsgReceipt: 1 == +e.needMsgReceipt,
          isLocal: !1
        };
        if (e.isInBlackList && (t.isInBlackList = 1 == +e.isInBlackList), c(e.isMuted) && (t.isMuted = 1 == +e.isMuted),
          c(e.resend) && (t.resend = 1 == +e.resend), c(e.idClient) && (t.idClient = e.idClient), c(e.idServer) &&
          (t.idServer = "" + e.idServer), c(e.userUpdateTime) && (t.userUpdateTime = +e.userUpdateTime), c(e.custom) &&
          (t.custom = e.custom), c(e.pushContent) && (t.pushContent = e.pushContent), c(e.pushPayload) && (t.pushPayload =
            e.pushPayload), c(e.tempTeamMemberCount) && (t.tempTeamMemberCount = +e.tempTeamMemberCount), c(e.apnsAccounts)
        ) {
          if (t.apns = {}, e.apnsAccounts !== d) {
            var n = e.apnsAccounts;
            try {
              t.apns.accounts = JSON.parse(n)
            } catch (e) {
              t.apns.accounts = []
            }
          }
          t.apns.content = e.apnsContent || "", t.apns.forcePush = 1 == +e.apnsForcePush
        }
        return t.status = e.status || "success", c(e.filter) && (t.filter = e.filter), t
      }, v.setExtra = function(e, t) {
        e.target = v.getMsgTarget(e, t), e.sessionId = e.scene + "-" + e.target, m.setFlow(e, t)
      }, v.getMsgTarget = function(e, t) {
        return "p2p" === e.scene ? e.to === t ? e.from : e.to : "team" === e.scene ? e.to : void 0
      }, v.deduplication = function(e) {
        var t, n = {},
          r = [];
        return e.forEach(function(e) {
          t = e.idClient, n[t] || (n[t] = !0, r.push(e))
        }), r
      }, v.sortMsgs = function(e) {
        return e = e.slice(0), o.sortObjArray(e, {
          sortPath: "time"
        }), e
      }, v.getLastMsg = function(e) {
        return (e = v.sortMsgs(e))[e.length - 1]
      }, v.getLastNotIgnoredMsg = function(e) {
        for (var t = null, n = (e = v.sortMsgs(e)).length - 1; n >= 0; n--)
          if (!(t = e[n]).ignore) return t;
        return null
      }, v.getMaxTimetag = function(e) {
        return v.getLastMsg(e).time
      }, v.validScenes = g, v.validTypes = y, e.exports = v
    }, function(e, t) {
      e.exports = function e(t, n) {
        "use strict";
        var r, s, i = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
          o = /(^[ ]*|[ ]*$)/g,
          a =
          /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
          c = /^0x[0-9a-f]+$/i,
          u = /^0/,
          l = function(t) {
            return e.insensitive && ("" + t).toLowerCase() || "" + t
          },
          m = l(t).replace(o, "") || "",
          d = l(n).replace(o, "") || "",
          p = m.replace(i, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
          f = d.replace(i, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
          g = parseInt(m.match(c), 16) || 1 !== p.length && m.match(a) && Date.parse(m),
          h = parseInt(d.match(c), 16) || g && d.match(a) && Date.parse(d) || null;
        if (h) {
          if (g < h) return -1;
          if (g > h) return 1
        }
        for (var y = 0, v = Math.max(p.length, f.length); y < v; y++) {
          if (r = !(p[y] || "").match(u) && parseFloat(p[y]) || p[y] || 0, s = !(f[y] || "").match(u) &&
            parseFloat(f[y]) || f[y] || 0, isNaN(r) !== isNaN(s)) return isNaN(r) ? 1 : -1;
          if (typeof r != typeof s && (r += "", s += ""), r < s) return -1;
          if (r > s) return 1
        }
        return 0
      }
    }, function(e, t) {}, function(e, t, n) {
      var r = n(14),
        s = n(48),
        i = n(43)("IE_PROTO"),
        o = Object.prototype;
      e.exports = Object.getPrototypeOf || function(e) {
        return e = s(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor
          .prototype : e instanceof Object ? o : null
      }
    }, function(e, t, n) {
      var r = n(8).document;
      e.exports = r && r.documentElement
    }, , function(e, t, n) {
      var r = n(33),
        s = n(6)("toStringTag"),
        i = "Arguments" == r(function() {
          return arguments
        }());
      e.exports = function(e) {
        var t, n, o;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
            try {
              return e[t]
            } catch (e) {}
          }(t = Object(e), s)) ? n : i ? r(t) : "Object" == (o = r(t)) && "function" == typeof t.callee ?
          "Arguments" : o
      }
    }, function(e, t, n) {
      "use strict";
      var r = {
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
        s = {
          heartbeat: {
            sid: r.link.id,
            cid: r.link.heartbeat
          },
          getSimpleNosToken: {
            sid: r.misc.id,
            cid: r.misc.getSimpleNosToken,
            params: [{
              type: "int",
              name: "num"
            }]
          },
          getNosToken: {
            sid: r.misc.id,
            cid: r.misc.getNosToken,
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
            sid: r.misc.id,
            cid: r.misc.uploadSdkLogUrl,
            params: [{
              type: "string",
              name: "url"
            }]
          },
          audioToText: {
            sid: r.misc.id,
            cid: r.misc.audioToText,
            params: [{
              type: "Property",
              name: "audioToText"
            }]
          },
          processImage: {
            sid: r.misc.id,
            cid: r.misc.processImage,
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
            sid: r.misc.id,
            cid: r.misc.getClientAntispam,
            params: [{
              type: "Property",
              name: "clientAntispam"
            }]
          },
          fileQuickTransfer: {
            sid: r.misc.id,
            cid: r.misc.fileQuickTransfer,
            params: [{
              type: "Property",
              name: "fileQuickTransfer"
            }]
          },
          getNosOriginUrl: {
            sid: r.misc.id,
            cid: r.misc.getNosOriginUrl,
            params: [{
              type: "Property",
              name: "nosFileUrlTag"
            }]
          },
          getNosTokenTrans: {
            sid: r.misc.id,
            cid: r.misc.getNosTokenTrans,
            params: [{
              type: "Property",
              name: "transToken"
            }]
          },
          fetchFile: {
            sid: r.misc.id,
            cid: r.misc.fetchFile,
            params: [{
              type: "String",
              name: "docId"
            }]
          },
          fetchFileList: {
            sid: r.misc.id,
            cid: r.misc.fetchFileList,
            params: [{
              type: "Property",
              name: "fileListParam"
            }]
          },
          removeFile: {
            sid: r.misc.id,
            cid: r.misc.removeFile,
            params: [{
              type: "String",
              name: "docId"
            }]
          },
          signalingCreate: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingCreate,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingDelay: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingDelay,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingClose: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingClose,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingJoin: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingJoin,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingLeave: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingLeave,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingInvite: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingInvite,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingCancel: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingCancel,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingReject: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingReject,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingAccept: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingAccept,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingControl: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingControl,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          },
          signalingGetChannelInfo: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingGetChannelInfo,
            params: [{
              type: "Property",
              name: "avSignalTag"
            }]
          }
        };
      e.exports = {
        idMap: r,
        cmdConfig: s,
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
    }, function(e, t, n) {
      "use strict";
      var r, s = n(67),
        i = n(0),
        o = n(26),
        a = n(169),
        c = n(288),
        u = n(287),
        l = n(286),
        m = n(285),
        d = n(284);

      function p(e) {
        this.mixin(e)
      }
      p.prototype = Object.create(function() {}.prototype, {
        protocol: {
          value: null,
          writable: !0,
          enumerable: !0,
          configurable: !0
        }
      }), p.prototype.setProtocol = function(e) {
        this.protocol = e
      }, p.prototype.mixin = function(e) {
        var t = this;
        this.configMap = this.configMap || {}, ["idMap", "cmdConfig", "packetConfig"].forEach(function(n) {
          t.configMap[n] = i.merge({}, t.configMap[n], e.configMap && e.configMap[n])
        }), ["serializeMap", "unserializeMap"].forEach(function(n) {
          t[n] = i.merge({}, t[n], e[n])
        })
      }, p.prototype.createCmd = (r = 1, function(e, t) {
        var n = this,
          s = this.configMap.cmdConfig[e],
          o = "heartbeat" === e ? 0 : r++;
        return o > 32767 && (o = 1, r = 2), e = {
          SID: s.sid,
          CID: s.cid,
          SER: o
        }, s.params && (e.Q = [], s.params.forEach(function(r) {
          var s = r.type,
            o = r.name,
            a = r.entity,
            c = t[o];
          if (!i.undef(c)) {
            switch (s) {
              case "PropertyArray":
                s = "ArrayMable", c = c.map(function(e) {
                  return {
                    t: "Property",
                    v: n.serialize(e, a)
                  }
                });
                break;
              case "Property":
                c = n.serialize(c, o);
                break;
              case "bool":
                c = c ? "true" : "false"
            }
            e.Q.push({
              t: s,
              v: c
            })
          }
        })), e
      }), p.prototype.parseResponse = function(e) {
        var t = this;
        return new Promise(function(n, r) {
          var s = JSON.parse(e),
            a = {
              raw: s,
              rawStr: e,
              error: o.genError(s.code)
            },
            c = t.configMap.packetConfig[s.sid + "_" + s.cid];
          if (!c) return a.notFound = {
            sid: s.sid,
            cid: s.cid
          }, void n(a);
          var u = s.r,
            l = "notify" === c.service && !c.cmd;
          if (a.isNotify = l, l) {
            var m = s.r[1].headerPacket;
            if (c = t.configMap.packetConfig[m.sid + "_" + m.cid], u = s.r[1].body, !c) return a.notFound = {
              sid: m.sid,
              cid: m.cid
            }, void n(a)
          }
          if (a.service = c.service, a.cmd = c.cmd, a.error) {
            var d = s.sid + "_" + s.cid;
            if (l && (d = m.sid + "_" + m.cid), a.error.cmd = a.cmd, a.error.callFunc =
              "protocol::parseResponse: " + d, 416 === a.error.code) {
              var p = u[0];
              p && (a.frequencyControlDuration = 1e3 * p)
            }
          }
          var f = !1;
          a.error && c.trivialErrorCodes && (f = -1 !== c.trivialErrorCodes.indexOf(a.error.code));
          var g = [];
          if ((!a.error || f) && c.response) {
            a.content = {};
            var h = function(e, t, n, r) {
              if (e && "msg" === r || "sysMsg" === r) {
                var s = n.content[r];
                i.isObject(s) && !s.idServer && (s.idServer = "" + t.r[0], s.type && "8" === s.type && s.deletedIdClient &&
                  (s.idServer = s.deletedIdClient))
              }
            };
            c.response.forEach(function(e, n) {
              var r = u[n];
              if (!i.undef(r)) {
                var o = e.type,
                  c = e.name,
                  m = e.entity || c;
                switch (o) {
                  case "Property":
                    g.push(t.unserialize(r, m).then(function(e, t, n, r, s) {
                      n.content[r] = s, h(e, t, n, r)
                    }.bind(this, l, s, a, c)));
                    break;
                  case "PropertyArray":
                    a.content[c] = [], r.forEach(function(e) {
                      g.push(t.unserialize(e, m).then(function(e, t, n) {
                        e.content[t].push(n)
                      }.bind(this, a, c)))
                    });
                    break;
                  case "KVArray":
                    a.content[c] = r, h(l, s, a, c);
                    break;
                  case "long":
                  case "Long":
                  case "byte":
                  case "Byte":
                  case "Number":
                    a.content[c] = +r;
                    break;
                  default:
                    a.content[c] = r, h(l, s, a, c)
                }
              }
            })
          }
          Promise.all(g).then(function() {
            n(a)
          })
        })
      }, p.prototype.serialize = function(e, t) {
        var n = this.serializeMap[t],
          r = {};
        for (var s in n) e.hasOwnProperty(s) && (r[n[s]] = e[s]);
        return r
      }, p.prototype.matchNosSafeUrl = function(e) {
        if (!i.isString(e) || !~e.indexOf("_im_url=1")) return !1;
        var t = (0, s.urlQuery2Object)(e);
        return !(!t || !t._im_url || 1 != t._im_url)
      }, p.prototype.getOneNosOriginUrl = function(e, t, n) {
        var r = this;
        return new Promise(function(s, i) {
          r.protocol.getNosOriginUrlReqNum++, r.protocol.sendCmd("getNosOriginUrl", {
            nosFileUrlTag: {
              safeUrl: e
            }
          }, function(e, r, i) {
            e ? console.warn("error: get nos originUrl failed", e) : (t["_" + n + "_safe"] = t[n], t[n] =
              i.nosFileUrlTag && i.nosFileUrlTag.originUrl), s()
          })
        })
      }, p.prototype.checkObjSafeUrl = function(e, t, n) {
        var r = this;
        for (var s in e)
          if (e.hasOwnProperty(s)) {
            var o = e[s];
            if (i.isString(o)) {
              if (this.matchNosSafeUrl(o)) {
                var a = this.getOneNosOriginUrl(o, e, s);
                t.push(a), n.push(a)
              }
            } else i.isObject(o) ? this.checkObjSafeUrl(o, t, n) : i.isArray(o) && o.forEach(function(e) {
              i.isObject(e) && r.checkObjSafeUrl(e, t, n)
            })
          }
      };
      var f = ["url", "avatar", "fromAvatar", "chatroomAvatar"];
      p.prototype.unserialize = function(e, t) {
        var n = this;
        return new Promise(function(r, s) {
          var i = n.unserializeMap[t],
            o = {},
            a = [];
          if (e)
            for (var c in i) {
              var u = [];
              if (e.hasOwnProperty(c) && (o[i[c]] = e[c], !n.protocol.keepNosSafeUrl))
                if ("attach" === i[c] && e[c] && e[c].indexOf && ~e[c].indexOf("_im_url=1")) try {
                  var l = JSON.parse(e[c]);
                  n.checkObjSafeUrl(l, u, a), Promise.all(u).then(function(e, t) {
                    e.attach = JSON.stringify(t)
                  }.bind(n, o, l))
                } catch (e) {
                  console.warn(e)
                } else ~f.indexOf(i[c]) && e[c] && n.matchNosSafeUrl(e[c]) && a.push(n.getOneNosOriginUrl(
                  e[c], o, i[c]))
            }
          Promise.all(a).then(function(e) {
            r(o)
          })
        })
      }, p.prototype.syncUnserialize = function(e, t) {
        var n = this.unserializeMap[t],
          r = {};
        if (e)
          for (var s in n) e.hasOwnProperty(s) && (r[n[s]] = e[s]);
        return r
      };
      var g = new p({
          configMap: a,
          serializeMap: c,
          unserializeMap: u
        }),
        h = new p({
          configMap: l,
          serializeMap: m,
          unserializeMap: d
        });
      e.exports = {
        IM: g,
        Chatroom: h
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(12),
        s = r.getGlobal(),
        i = {},
        o = s.name || "_parent",
        a = [],
        c = [];
      i.addMsgListener = function(e) {
        a.push(e)
      };
      var u, l, m, d, p = (u = /^([\w]+?:\/\/.*?(?=\/|$))/i, function(e) {
          return e = e || "", u.test(e) ? RegExp.$1 : "*"
        }),
        f = function() {
          var e = unescape(s.name || "").trim();
          if (e && 0 === e.indexOf("MSG|")) {
            s.name = "";
            var t = r.string2object(e.replace("MSG|", ""), "|"),
              n = (t.origin || "").toLowerCase();
            n && "*" !== n && 0 !== location.href.toLowerCase().indexOf(n) || function(e) {
              for (var t = 0, n = a.length; t < n; t++) try {
                a[t].call(null, e)
              } catch (e) {}
            }({
              data: JSON.parse(t.data || "null"),
              source: s.frames[t.self] || t.self,
              origin: p(t.ref || document.referrer)
            })
          }
        },
        g = (m = function(e, t) {
          for (var n = 0, r = e.length; n < r; n++)
            if (e[n] === t) return !0;
          return !1
        }, function() {
          if (c.length) {
            l = [];
            for (var e, t = c.length - 1; t >= 0; t--) e = c[t], m(l, e.w) || (l.push(e.w), c.splice(t, 1), e.w
              .name = e.d);
            l = null
          }
        }),
        h = i.startTimer = (d = !1, function() {
          d || (d = !0, s.postMessage || (setInterval(g, 100), setInterval(f, 20)))
        });
      i.postMessage = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (r.fillUndef(t, {
            origin: "*",
            source: o
          }), s.postMessage) {
          var n = t.data;
          s.FormData || (n = JSON.stringify(n)), e.postMessage(n, t.origin)
        } else {
          if (h(), r.isObject(t)) {
            var i = {};
            i.origin = t.origin || "", i.ref = location.href, i.self = t.source, i.data = JSON.stringify(t.data),
              t = "MSG|" + r.object2string(i, "|", !0)
          }
          c.unshift({
            w: e,
            d: escape(t)
          })
        }
      }, e.exports = i
    }, function(e, t, n) {
      "use strict";
      var r = n(30),
        s = n(38),
        i = n(28),
        o = n(48),
        a = n(61),
        c = Object.assign;
      e.exports = !c || n(21)(function() {
        var e = {},
          t = {},
          n = Symbol(),
          r = "abcdefghijklmnopqrst";
        return e[n] = 7, r.split("").forEach(function(e) {
          t[e] = e
        }), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r
      }) ? function(e, t) {
        for (var n = o(e), c = arguments.length, u = 1, l = s.f, m = i.f; c > u;)
          for (var d, p = a(arguments[u++]), f = l ? r(p).concat(l(p)) : r(p), g = f.length, h = 0; g > h;) m.call(
            p, d = f[h++]) && (n[d] = p[d]);
        return n
      } : c
    }, function(e, t, n) {
      var r = n(17);
      r(r.S + r.F, "Object", {
        assign: n(82)
      })
    }, function(e, t, n) {
      n(83), e.exports = n(7).Object.assign
    }, function(e, t, n) {
      e.exports = {
        default: n(84),
        __esModule: !0
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(0),
        s = r.notundef,
        i = r.fillPropertyWithDefault,
        o = {
          0: "normal",
          1: "owner",
          2: "manager"
        };

      function a(e) {
        r.verifyOptions(e, "teamId", "team::TeamMember"), r.verifyParamAtLeastPresentOne(e,
            "nickInTeam muteTeam muteNotiType custom", "team::TeamMember"), this.teamId = e.teamId, s(e.account) &&
          (this.account = e.account), s(e.nickInTeam) && (this.nickInTeam = e.nickInTeam), s(e.muteNotiType) ?
          this.bits = e.muteNotiType : s(e.muteTeam) && (this.bits = 0, e.muteTeam && (this.bits += 1)), s(e.mute) &&
          (this.mute = e.mute ? 1 : 0), s(e.custom) && (this.custom = "" + e.custom)
      }
      a.reverse = function(e) {
        var t = r.copy(e);
        if (s(t.teamId) && (t.teamId = "" + t.teamId), s(t.type) && (t.type = o[t.type]), s(t.active) && (t.active =
            1 == +t.active), s(t.valid) && (t.valid = 1 == +t.valid), s(t.mute) && (t.mute = 1 == +t.mute), s(t
            .joinTime) && (t.joinTime = +t.joinTime), s(t.updateTime) && (t.updateTime = +t.updateTime), s(t.bits)) {
          var n = t.bits;
          delete t.bits, t.muteTeam = !!(1 & n), t.muteNotiType = n
        }
        return s(t.teamId) && s(t.account) && (t.id = a.genId(t.teamId, t.account)), t
      }, a.reverseMembers = function(e) {
        return e.map(function(e) {
          return a.reverse(e)
        })
      }, a.fillProperties = function(e) {
        var t = i(e, "mute", !1),
          n = i(e, "custom", "");
        return t || n
      }, a.genId = function(e, t) {
        return e + "-" + t
      }, a.accounts2ids = function(e, t) {
        return t.map(function(t) {
          return a.genId(e, t)
        })
      }, a.assembleMembers = function(e, t) {
        return r.isArray(t) || (t = [t]), t.map(function(t) {
          return a.assembleMember(e, t)
        })
      }, a.assembleMember = function(e, t) {
        return {
          id: a.genId(e.teamId, t),
          account: t,
          teamId: e.teamId,
          type: "normal",
          nickInTeam: "",
          muteTeam: !1,
          mute: !1,
          joinTime: e.memberUpdateTime,
          updateTime: e.memberUpdateTime,
          active: !0,
          valid: !0
        }
      }, a.assembleOwner = function(e) {
        var t = a.assembleMember(e, e.owner);
        return t.type = "owner", t
      }, e.exports = a
    }, function(e, t, n) {
      "use strict";
      var r = n(2);
      "undefined" != typeof window && (window.console || r.isWeixinApp || (window.console = {
        log: function() {},
        info: function() {},
        warn: function() {},
        error: function() {}
      }))
    }, function(e, t, n) {
      n(39)("observable")
    }, function(e, t, n) {
      n(39)("asyncIterator")
    }, function(e, t, n) {
      var r = n(18),
        s = n(60).f,
        i = {}.toString,
        o = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) :
        [];
      e.exports.f = function(e) {
        return o && "[object Window]" == i.call(e) ? function(e) {
          try {
            return s(e)
          } catch (e) {
            return o.slice()
          }
        }(e) : s(r(e))
      }
    }, function(e, t, n) {
      var r = n(33);
      e.exports = Array.isArray || function(e) {
        return "Array" == r(e)
      }
    }, function(e, t, n) {
      var r = n(30),
        s = n(38),
        i = n(28);
      e.exports = function(e) {
        var t = r(e),
          n = s.f;
        if (n)
          for (var o, a = n(e), c = i.f, u = 0; a.length > u;) c.call(e, o = a[u++]) && t.push(o);
        return t
      }
    }, function(e, t, n) {
      var r = n(29)("meta"),
        s = n(19),
        i = n(14),
        o = n(13).f,
        a = 0,
        c = Object.isExtensible || function() {
          return !0
        },
        u = !n(21)(function() {
          return c(Object.preventExtensions({}))
        }),
        l = function(e) {
          o(e, r, {
            value: {
              i: "O" + ++a,
              w: {}
            }
          })
        },
        m = e.exports = {
          KEY: r,
          NEED: !1,
          fastKey: function(e, t) {
            if (!s(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!i(e, r)) {
              if (!c(e)) return "F";
              if (!t) return "E";
              l(e)
            }
            return e[r].i
          },
          getWeak: function(e, t) {
            if (!i(e, r)) {
              if (!c(e)) return !0;
              if (!t) return !1;
              l(e)
            }
            return e[r].w
          },
          onFreeze: function(e) {
            return u && m.NEED && c(e) && !i(e, r) && l(e), e
          }
        }
    }, function(e, t, n) {
      "use strict";
      var r = n(8),
        s = n(14),
        i = n(15),
        o = n(17),
        a = n(63),
        c = n(93).KEY,
        u = n(21),
        l = n(42),
        m = n(34),
        d = n(29),
        p = n(6),
        f = n(40),
        g = n(39),
        h = n(92),
        y = n(91),
        v = n(16),
        b = n(19),
        M = n(18),
        T = n(44),
        S = n(27),
        k = n(50),
        C = n(90),
        P = n(59),
        I = n(13),
        O = n(30),
        x = P.f,
        w = I.f,
        A = C.f,
        _ = r.Symbol,
        E = r.JSON,
        R = E && E.stringify,
        U = p("_hidden"),
        j = p("toPrimitive"),
        N = {}.propertyIsEnumerable,
        F = l("symbol-registry"),
        D = l("symbols"),
        L = l("op-symbols"),
        B = Object.prototype,
        q = "function" == typeof _,
        H = r.QObject,
        W = !H || !H.prototype || !H.prototype.findChild,
        J = i && u(function() {
          return 7 != k(w({}, "a", {
            get: function() {
              return w(this, "a", {
                value: 7
              }).a
            }
          })).a
        }) ? function(e, t, n) {
          var r = x(B, t);
          r && delete B[t], w(e, t, n), r && e !== B && w(B, t, r)
        } : w,
        z = function(e) {
          var t = D[e] = k(_.prototype);
          return t._k = e, t
        },
        V = q && "symbol" == typeof _.iterator ? function(e) {
          return "symbol" == typeof e
        } : function(e) {
          return e instanceof _
        },
        X = function(e, t, n) {
          return e === B && X(L, t, n), v(e), t = T(t, !0), v(n), s(D, t) ? (n.enumerable ? (s(e, U) && e[U][t] &&
            (e[U][t] = !1), n = k(n, {
              enumerable: S(0, !1)
            })) : (s(e, U) || w(e, U, S(1, {})), e[U][t] = !0), J(e, t, n)) : w(e, t, n)
        },
        $ = function(e, t) {
          v(e);
          for (var n, r = h(t = M(t)), s = 0, i = r.length; i > s;) X(e, n = r[s++], t[n]);
          return e
        },
        G = function(e) {
          var t = N.call(this, e = T(e, !0));
          return !(this === B && s(D, e) && !s(L, e)) && (!(t || !s(this, e) || !s(D, e) || s(this, U) && this[U]
            [e]) || t)
        },
        K = function(e, t) {
          if (e = M(e), t = T(t, !0), e !== B || !s(D, t) || s(L, t)) {
            var n = x(e, t);
            return !n || !s(D, t) || s(e, U) && e[U][t] || (n.enumerable = !0), n
          }
        },
        Q = function(e) {
          for (var t, n = A(M(e)), r = [], i = 0; n.length > i;) s(D, t = n[i++]) || t == U || t == c || r.push(t);
          return r
        },
        Y = function(e) {
          for (var t, n = e === B, r = A(n ? L : M(e)), i = [], o = 0; r.length > o;) !s(D, t = r[o++]) || n && !
            s(B, t) || i.push(D[t]);
          return i
        };
      q || (a((_ = function() {
        if (this instanceof _) throw TypeError("Symbol is not a constructor!");
        var e = d(arguments.length > 0 ? arguments[0] : void 0),
          t = function(n) {
            this === B && t.call(L, n), s(this, U) && s(this[U], e) && (this[U][e] = !1), J(this, e, S(1,
              n))
          };
        return i && W && J(B, e, {
          configurable: !0,
          set: t
        }), z(e)
      }).prototype, "toString", function() {
        return this._k
      }), P.f = K, I.f = X, n(60).f = C.f = Q, n(28).f = G, n(38).f = Y, i && !n(35) && a(B,
        "propertyIsEnumerable", G, !0), f.f = function(e) {
        return z(p(e))
      }), o(o.G + o.W + o.F * !q, {
        Symbol: _
      });
      for (var Z =
          "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables"
          .split(","), ee = 0; Z.length > ee;) p(Z[ee++]);
      for (var te = O(p.store), ne = 0; te.length > ne;) g(te[ne++]);
      o(o.S + o.F * !q, "Symbol", {
        for: function(e) {
          return s(F, e += "") ? F[e] : F[e] = _(e)
        },
        keyFor: function(e) {
          if (!V(e)) throw TypeError(e + " is not a symbol!");
          for (var t in F)
            if (F[t] === e) return t
        },
        useSetter: function() {
          W = !0
        },
        useSimple: function() {
          W = !1
        }
      }), o(o.S + o.F * !q, "Object", {
        create: function(e, t) {
          return void 0 === t ? k(e) : $(k(e), t)
        },
        defineProperty: X,
        defineProperties: $,
        getOwnPropertyDescriptor: K,
        getOwnPropertyNames: Q,
        getOwnPropertySymbols: Y
      }), E && o(o.S + o.F * (!q || u(function() {
        var e = _();
        return "[null]" != R([e]) || "{}" != R({
          a: e
        }) || "{}" != R(Object(e))
      })), "JSON", {
        stringify: function(e) {
          for (var t, n, r = [e], s = 1; arguments.length > s;) r.push(arguments[s++]);
          if (n = t = r[1], (b(t) || void 0 !== e) && !V(e)) return y(t) || (t = function(e, t) {
            if ("function" == typeof n && (t = n.call(this, e, t)), !V(t)) return t
          }), r[1] = t, R.apply(E, r)
        }
      }), _.prototype[j] || n(20)(_.prototype, j, _.prototype.valueOf), m(_, "Symbol"), m(Math, "Math", !0), m(
        r.JSON, "JSON", !0)
    }, function(e, t, n) {
      n(94), n(74), n(89), n(88), e.exports = n(7).Symbol
    }, function(e, t, n) {
      e.exports = {
        default: n(95),
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
    }, function(e, t, n) {
      "use strict";
      var r = n(98),
        s = n(97),
        i = n(23),
        o = n(18);
      e.exports = n(65)(Array, "Array", function(e, t) {
        this._t = o(e), this._i = 0, this._k = t
      }, function() {
        var e = this._t,
          t = this._k,
          n = this._i++;
        return !e || n >= e.length ? (this._t = void 0, s(1)) : s(0, "keys" == t ? n : "values" == t ? e[n] :
          [n, e[n]])
      }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries")
    }, function(e, t, n) {
      var r = n(46),
        s = Math.max,
        i = Math.min;
      e.exports = function(e, t) {
        return (e = r(e)) < 0 ? s(e + t, 0) : i(e, t)
      }
    }, function(e, t, n) {
      var r = n(18),
        s = n(69),
        i = n(100);
      e.exports = function(e) {
        return function(t, n, o) {
          var a, c = r(t),
            u = s(c.length),
            l = i(o, u);
          if (e && n != n) {
            for (; u > l;)
              if ((a = c[l++]) != a) return !0
          } else
            for (; u > l; l++)
              if ((e || l in c) && c[l] === n) return e || l || 0;
          return !e && -1
        }
      }
    }, function(e, t, n) {
      var r = n(13),
        s = n(16),
        i = n(30);
      e.exports = n(15) ? Object.defineProperties : function(e, t) {
        s(e);
        for (var n, o = i(t), a = o.length, c = 0; a > c;) r.f(e, n = o[c++], t[n]);
        return e
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(50),
        s = n(27),
        i = n(34),
        o = {};
      n(20)(o, n(6)("iterator"), function() {
        return this
      }), e.exports = function(e, t, n) {
        e.prototype = r(o, {
          next: s(1, n)
        }), i(e, t + " Iterator")
      }
    }, function(e, t, n) {
      var r = n(46),
        s = n(45);
      e.exports = function(e) {
        return function(t, n) {
          var i, o, a = String(s(t)),
            c = r(n),
            u = a.length;
          return c < 0 || c >= u ? e ? "" : void 0 : (i = a.charCodeAt(c)) < 55296 || i > 56319 || c + 1 ===
            u || (o = a.charCodeAt(c + 1)) < 56320 || o > 57343 ? e ? a.charAt(c) : i : e ? a.slice(c, c + 2) :
            o - 56320 + (i - 55296 << 10) + 65536
        }
      }
    }, function(e, t, n) {
      n(51), n(55), e.exports = n(40).f("iterator")
    }, function(e, t, n) {
      e.exports = {
        default: n(105),
        __esModule: !0
      }
    }, , function(e, t, n) {
      var r = n(78),
        s = n(6)("iterator"),
        i = n(23);
      e.exports = n(7).getIteratorMethod = function(e) {
        if (null != e) return e[s] || e["@@iterator"] || i[r(e)]
      }
    }, , , , , , , function(e, t, n) {
      "use strict";
      var r = n(57),
        s = n(0),
        i = s.undef,
        o = s.notundef,
        a = n(2),
        c = n(80),
        u = n(274),
        l = n(167);

      function m(e) {
        s.verifyOptions(e, "appKey account chatroomId chatroomAddresses", "protocol::ChatroomProtocol"), e.isAnonymous ||
          s.verifyOptions(e, "token", "protocol::ChatroomProtocol"), s.verifyParamType("chatroomAddresses", e.chatroomAddresses,
            "array", "protocol::ChatroomProtocol"), s.verifyCallback(e,
            "onconnect onerror onwillreconnect ondisconnect onmsg onmsgs onrobots", "protocol::ChatroomProtocol"),
          r.call(this, e)
      }
      var d = r.fn,
        p = m.fn = m.prototype = Object.create(d);
      p.init = function() {
        d.init.call(this), c.Chatroom.setProtocol(this), this.parser = c.Chatroom, this.sendCmd.bind(this),
          this.syncResult = {}, this.timetags = {}, this.msgBuffer = []
      }, p.reset = function() {
        var e = this;
        d.reset.call(e);
        var t = e.options;
        i(t.msgBufferInterval) && (t.msgBufferInterval = 300), s.verifyParamType("msgBufferInterval", t.msgBufferInterval,
            "number", "protocol::ChatroomProtocol.reset"), i(t.msgBufferSize) && (t.msgBufferSize = 500), s.verifyParamType(
            "msgBufferSize", t.msgBufferSize, "number", "protocol::ChatroomProtocol.reset"), o(t.chatroomAddresses) &&
          (e.socketUrls = t.chatroomAddresses.map(function(t) {
            return a.formatSocketUrl({
              url: t,
              secure: e.options.secure
            })
          }), e.socketUrlsBackup = e.socketUrls.slice(0))
      }, p.processChatroom = function(e) {
        switch (e.cmd) {
          case "login":
            e.error || (e.obj = {
              chatroom: u.reverse(e.content.chatroom),
              member: l.reverse(e.content.chatroomMember)
            });
            break;
          case "kicked":
            this.onKicked(e);
            break;
          case "logout":
            break;
          case "sendMsg":
            this.onSendMsg(e);
            break;
          case "msg":
            this.onMsg(e);
            break;
          case "getChatroomMembers":
            this.onChatroomMembers(e);
            break;
          case "getHistoryMsgs":
            this.onHistoryMsgs(e);
            break;
          case "markChatroomMember":
            this.onMarkChatroomMember(e);
            break;
          case "closeChatroom":
            break;
          case "getChatroom":
            this.onChatroom(e);
            break;
          case "updateChatroom":
            break;
          case "updateMyChatroomMemberInfo":
            delete e.obj.chatroomMember;
            break;
          case "getChatroomMembersInfo":
            this.onChatroomMembersInfo(e);
            break;
          case "kickChatroomMember":
          case "updateChatroomMemberTempMute":
            break;
          case "queueList":
            e.error || (e.obj = e.content);
            break;
          case "syncRobot":
            this.onSyncRobot(e)
        }
      }, p.onChatroom = function(e) {
        e.error || (e.obj.chatroom = u.reverse(e.content.chatroom))
      }, e.exports = m, n(382), n(381), n(380), n(379)
    }, function(e, t, n) {
      "use strict";
      var r = n(0);

      function s() {}
      s.parse = function(e) {
        var t = e.split("|");
        return {
          scene: t[0],
          to: t[1]
        }
      }, s.genSessionByMsg = function(e) {
        return {
          id: e.sessionId,
          scene: e.scene,
          to: e.target,
          updateTime: e.time,
          lastMsg: e
        }
      }, s.appendLastMsg = function(e) {
        var t = e.lastMsg;
        e["last" + r.capFirstLetter(t.type) + "Msg"] = t, e["last" + r.capFirstLetter(t.flow) + "Msg"] = t
      }, s.genSessionByMsgs = function(e, t) {
        var n = e.getLastNotIgnoredMsg(t);
        return n ? s.genSessionByMsg(n) : null
      }, s.trim = function(e) {
        delete e.msgReceiptSendTime, delete e.msgReceiptServerTime, delete e.ack, delete e.unreadMsgs
      }, s.isComplete = function(e) {
        return e.id && e.scene && e.to
      }, e.exports = s
    }, function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(0),
        a = o.undef,
        c = o.notundef,
        u = n(80).IM,
        l = n(119),
        m = n(86),
        d = {
          customP2p: 100,
          customTeam: 101,
          deleteMsgP2p: 7,
          deleteMsgTeam: 8
        },
        p = {
          0: "applyTeam",
          1: "rejectTeamApply",
          2: "teamInvite",
          3: "rejectTeamInvite",
          5: "friendRequest",
          6: "deleteFriend",
          7: "deleteMsgP2p",
          8: "deleteMsgTeam",
          100: "customP2p",
          101: "customTeam",
          102: "customP2p"
        },
        f = {
          1: "addFriend",
          2: "applyFriend",
          3: "passFriendApply",
          4: "rejectFriendApply"
        },
        g = ["team", "friend", "msg"],
        h = {
          applyTeam: "team",
          rejectTeamApply: "team",
          teamInvite: "team",
          rejectTeamInvite: "team",
          addFriend: "friend",
          applyFriend: "friend",
          passFriendApply: "friend",
          rejectFriendApply: "friend",
          deleteFriend: "friend",
          deleteMsg: "msg"
        };

      function y(e) {
        o.verifyOptions(e, "type to", "sysmsg::SystemMessage"), o.verifyParamValid("type", e.type, y.validTypes,
            "sysmsg::SystemMessage"), -1 !== e.type.indexOf("custom") && (o.verifyOptions(e, "content",
              "sysmsg::SystemMessage"), this.attach = e.content, c(e.apnsText) && (this.apnsText = "" + e.apnsText),
            c(e.pushPayload) && ("object" === (0, i.default)(e.pushPayload) ? (this.logger.warn(
              "model::Message: pushPayload should be JsonString, auto transfer"), this.pushPayload = JSON.stringify(
              e.pushPayload)) : this.pushPayload = "" + e.pushPayload), c(e.sendToOnlineUsersOnly) && (this.sendToOnlineUsersOnly =
              e.sendToOnlineUsersOnly ? 0 : 1), c(e.cc) && (this.cc = e.cc ? 1 : 0), c(e.isPushable) && (this.isPushable =
              e.isPushable ? 1 : 0), c(e.isUnreadable) && (this.isUnreadable = e.isUnreadable ? 1 : 0), c(e.needPushNick) &&
            (this.needPushNick = e.needPushNick ? 1 : 0)), this.time = e.time || +new Date, this.type = d[e.type],
          this.to = e.to, c(e.from) && (this.from = e.from), c(e.ps) && (this.ps = e.ps), c(e.deletedIdClient) &&
          (this.deletedIdClient = e.deletedIdClient), c(e.deletedIdServer) && (this.deletedIdServer = e.deletedIdServer),
          c(e.opeAccount) && (this.opeAccount = e.opeAccount), c(e.yidunEnable) && (this.yidunEnable = e.yidunEnable ?
            1 : 0), c(e.antiSpamContent) && ("object" === (0, i.default)(e.antiSpamContent) ? (this.logger.warn(
              "model::Message: antiSpamContent should be JsonString, auto transfer"), this.antiSpamContent =
            JSON.stringify(e.antiSpamContent)) : this.antiSpamContent = "" + e.antiSpamContent), c(e.antiSpamBusinessId) &&
          ("object" === (0, i.default)(e.antiSpamBusinessId) ? (this.logger.warn(
              "model::Message: antiSpamBusinessId should be JsonString, auto transfer"), this.antiSpamBusinessId =
            JSON.stringify(e.antiSpamBusinessId)) : this.antiSpamBusinessId = "" + e.antiSpamBusinessId), this.idClient =
          e.idClient || o.guid()
      }
      y.validTypes = Object.keys(d).concat(Object.keys(h)), y.validCategories = ["team", "friend"], y.isCustom =
        function(e) {
          return "custom" === e.type
        }, y.reverse = function(e) {
          var t = {
            time: +e.time,
            to: e.to,
            type: p[e.type]
          };
          if (c(e.from) && (t.from = e.from), c(e.idServer) && (t.idServer = "" + e.idServer), c(e.deletedIdClient) &&
            (t.deletedIdClient = e.deletedIdClient), c(e.deletedIdServer) && (t.deletedIdServer = "" + e.deletedIdServer),
            c(e.deletedMsgTime) && (t.deletedMsgTime = +e.deletedMsgTime), c(e.deletedMsgFromNick) && (t.deletedMsgFromNick =
              "" + e.deletedMsgFromNick), c(e.opeAccount) && (t.opeAccount = e.opeAccount), c(e.ps) && (t.ps = e.ps),
            e.attach = e.attach ? "" + e.attach : "", "customP2p" === t.type || "customTeam" === t.type) t.content =
            e.attach, c(e.apnsText) && (t.apnsText = e.apnsText), c(e.pushPayload) && (t.pushPayload = e.pushPayload),
            o.merge(t, {
              sendToOnlineUsersOnly: a(e.sendToOnlineUsersOnly) || 0 == +e.sendToOnlineUsersOnly,
              cc: a(e.cc) || 1 == +e.cc,
              isPushable: a(e.isPushable) || 1 == +e.isPushable,
              isUnreadable: a(e.isUnreadable) || 1 == +e.isUnreadable,
              needPushNick: c(e.needPushNick) && 1 == +e.needPushNick
            }), t.scene = t.type.slice(6).toLowerCase(), t.type = "custom";
          else if ("deleteMsgP2p" === t.type || "deleteMsgTeam" === t.type) t.scene = t.type.slice(9).toLowerCase(),
            t.type = "deleteMsg";
          else {
            if (e.attach) {
              t.attach = {};
              var n = JSON.parse(e.attach);
              c(n.vt) ? (t.type = f[n.vt], delete t.attach) : (c(n.tinfo) && (t.attach.team = l.reverse(u.syncUnserialize(
                n.tinfo, "team"))), c(n.tlist) && (t.attach.member = m.reverse(u.syncUnserialize(n.tlist,
                "teamMember"))), c(n.attach) && (t.attach.custom = n.attach))
            }
            t.category = h[t.type], t.read = !1, t.state = "init"
          }
          return c(e.cc) && (t.cc = 1 == +e.cc), t.status = e.status || "success", c(e.filter) && (t.filter = e.filter),
            t
        }, y.reverseSysMsgs = function(e, t) {
          var n = (t = t || {}).mapper,
            r = o.isFunction(n);
          return e.map(function(e) {
            return e = y.reverse(e), r && (e = n(e)), e
          })
        }, y.completeUnread = function(e) {
          var t;
          return e = e || {}, g.forEach(function(t) {
            delete e[t]
          }), Object.keys(h).forEach(function(n) {
            e[n] = e[n] || 0, e[n] < 0 && (e[n] = 0), e[t = h[n]] = e[t] || 0, e[t] = e[t] + e[n]
          }), e.total = 0, g.forEach(function(t) {
            e.total += e[t]
          }), e
        }, e.exports = y
    }, function(e, t, n) {
      "use strict";
      var r, s = n(54);
      var i = ((r = s) && r.__esModule ? r : {
        default: r
      }).default.clientTypeMap;

      function o() {}
      o.reverse = function(e) {
        var t = e;
        return t.type = i[t.type], t
      }, o.reverseType = function(e) {
        return i[e] || e
      }, e.exports = o
    }, function(e, t, n) {
      "use strict";
      var r = n(0),
        s = r.notundef,
        i = r.fillPropertyWithDefault,
        o = Object.keys,
        a = {},
        c = {},
        u = [],
        l = {},
        m = {
          normal: 0,
          advanced: 1
        },
        d = {
          0: "normal",
          1: "advanced"
        },
        p = o(m),
        f = a.joinMode = {
          noVerify: 0,
          needVerify: 1,
          rejectAll: 2
        };
      c.joinMode = {
        0: "noVerify",
        1: "needVerify",
        2: "rejectAll"
      }, u.push("join"), l.joinMode = o(f);
      var g = a.beInviteMode = {
        needVerify: 0,
        noVerify: 1
      };
      c.beInviteMode = {
        0: "needVerify",
        1: "noVerify"
      }, u.push("beInvite"), l.beInviteMode = o(g);
      var h = a.inviteMode = {
        manager: 0,
        all: 1
      };
      c.inviteMode = {
        0: "manager",
        1: "all"
      }, u.push("invite"), l.inviteMode = o(h);
      var y = a.updateTeamMode = {
        manager: 0,
        all: 1
      };
      c.updateTeamMode = {
        0: "manager",
        1: "all"
      }, u.push("updateTeam"), l.updateTeamMode = o(y);
      var v = a.updateCustomMode = {
        manager: 0,
        all: 1
      };

      function b(e) {
        switch (r.verifyOptions(e, "action", "team::Team"), e.action) {
          case "create":
            r.verifyOptions(e, "teamId", !1, "team::Team"), r.verifyOptions(e, "type name", "team::Team"), r.verifyParamValid(
              "type", e.type, p, "team::Team"), s(e.level) && (r.verifyParamType("level", e.level, "number",
              "team::Team"), this.level = e.level);
            break;
          case "update":
            r.verifyOptions(e, "teamId", "team::Team"), r.verifyOptions(e, "type", !1, "team::Team")
        }
        s(e.teamId) && (this.teamId = e.teamId), s(e.type) && (this.type = m[e.type]), s(e.avatar) && (this.avatar =
            "" + e.avatar), s(e.name) && (this.name = "" + e.name), s(e.intro) && (this.intro = "" + e.intro), s(
            e.announcement) && (this.announcement = "" + e.announcement), u.forEach(this.setMode.bind(this, e)),
          s(e.custom) && (this.custom = "" + e.custom)
      }
      c.updateCustomMode = {
        0: "manager",
        1: "all"
      }, u.push("updateCustom"), l.updateCustomMode = o(v), b.prototype.setMode = function(e, t) {
        s(e[t += "Mode"]) && (r.verifyParamValid(t, e[t], l[t], "team::Team"), this[t] = a[t][e[t]])
      }, b.reverse = function(e, t) {
        var n = r.copy(e);
        if (s(n.teamId) && (n.teamId = "" + n.teamId), s(n.type) && (n.type = d[n.type]), s(n.level) && (n.level = +
            n.level), s(n.valid) && (n.valid = 1 == +n.valid), s(n.memberNum) && (n.memberNum = +n.memberNum),
          s(n.memberUpdateTime) && (n.memberUpdateTime = +n.memberUpdateTime), s(n.createTime) && (n.createTime = +
            n.createTime), s(n.updateTime) && (n.updateTime = +n.updateTime), s(n.validToCurrentUser) && (n.validToCurrentUser =
            "1" === n.validToCurrentUser), s(n.mute) && (n.mute = "1" === n.mute), s(n.muteType)) switch (n.muteType) {
          case "0":
            n.mute = !1, n.muteType = "none";
            break;
          case "1":
            n.mute = !0, n.muteType = "normal";
            break;
          case "2":
            n.mute = !0, n.muteType = "all"
        } else s(n.mute) && (1 === n.mute ? (n.mute = !0, n.muteType = "normal") : (n.mute = !1, n.muteType =
          "none"));
        return u.forEach(function(e, t) {
          s(e[t += "Mode"]) && (e[t] = c[t][e[t]])
        }.bind(null, n)), delete n.bits, t || b.fillProperties(n), n
      }, b.fillProperties = function(e) {
        var t = i(e, "beInviteMode", "needVerify"),
          n = i(e, "inviteMode", "manager"),
          r = i(e, "updateTeamMode", "manager"),
          s = i(e, "updateCustomMode", "manager"),
          o = i(e, "avatar", "");
        return t || n || r || s || o
      }, e.exports = b
    }, , , , , , , function(e, t, n) {
      "use strict";
      var r = n(67),
        s = n(71),
        i = n(0),
        o = n(2);

      function a(e) {
        switch (i.notundef(e.type) ? i.verifyFileType(e.type, "msg::FileMessage") : e.type = "file", i.verifyOptions(
          e, "file", "msg::FileMessage"), i.verifyOptions(e.file, "url ext size", !0, "file.",
          "msg::FileMessage"), e.type) {
          case "image":
            c.verifyFile(e.file, "msg::FileMessage");
            break;
          case "audio":
            u.verifyFile(e.file, "msg::FileMessage");
            break;
          case "video":
            l.verifyFile(e.file, "msg::FileMessage")
        }
        s.call(this, e), this.attach = JSON.stringify(e.file)
      }
      a.prototype = Object.create(s.prototype), a.reverse = function(e) {
        var t = s.reverse(e);
        return e.attach = e.attach ? "" + e.attach : "", t.file = e.attach ? JSON.parse(e.attach) : {}, t.file.url =
          (0, r.genPrivateUrl)(t.file.url), "audio" !== t.type || t.file.mp3Url || (t.file.mp3Url = t.file.url +
            (~t.file.url.indexOf("?") ? "&" : "?") + "audioTrans&type=mp3"), o.httpsEnabled && (t.file.url = t.file
            .url.replace("http", "https")), t
      }, e.exports = a;
      var c = n(376),
        u = n(375),
        l = n(374)
    }, function(e, t, n) {
      "use strict";
      var r = n(47),
        s = n(115),
        i = n(2),
        o = n(274),
        a = n(378),
        c = n(0),
        u = c.verifyOptions,
        l = c.verifyParamType,
        m = n(80).Chatroom;

      function d(e) {
        return this.subType = "chatroom", this.nosScene = e.nosScene || "chatroom", this.nosSurvivalTime = e.nosSurvivalTime,
          e.Protocol = s, e.Message = a, e.constructor = d, e.isAnonymous && (e.account = e.account || "nimanon_" +
            c.guid(), e.isAnonymous = 1, c.verifyOptions(e, "chatroomNick", "api::Chatroom"), e.chatroomAvatar =
            e.chatroomAvatar || " "), this.init(e)
      }
      d.Protocol = s, d.parser = m, d.use = r.use, d.getInstance = function(e) {
        return e.isAnonymous && (e.account = e.account || "nimanon_" + c.guid(), e.isAnonymous = 1, c.verifyOptions(
            e, "chatroomNick", "api::Chatroom.getInstance"), e.chatroomAvatar = e.chatroomAvatar || " "), r.getInstance
          .call(this, e)
      }, d.genInstanceName = function(e) {
        return c.verifyOptions(e, "chatroomId", "api::Chatroom.genInstanceName"), "Chatroom-account-" + e.account +
          "-chatroomId-" + e.chatroomId
      };
      var p = d.fn = d.prototype = Object.create(r.prototype);
      d.info = p.info = i.info, p.getChatroom = function(e) {
        this.processCallback(e), this.sendCmd("getChatroom", e)
      }, p.updateChatroom = function(e) {
        u(e, "chatroom needNotify", "api::updateChatroom"), l("needNotify", e.needNotify, "boolean"), this.processCustom(
          e), this.processCallback(e), e.chatroom = new o(e.chatroom), this.sendCmd("updateChatroom", e)
      }, p.closeChatroom = function(e) {
        this.processCustom(e), this.processCallback(e), this.sendCmd("closeChatroom", e)
      }, e.exports = d, n(368), n(367), n(366)
    }, function(e, t, n) {
      "use strict";
      var r = n(67),
        s = n(72),
        i = n(0),
        o = n(2);

      function a(e) {
        switch (i.notundef(e.type) ? i.verifyFileType(e.type, "msg::FileMessage") : e.type = "file", i.verifyOptions(
          e, "file", "msg::FileMessage"), i.verifyOptions(e.file, "url ext size", !0, "file.",
          "msg::FileMessage"), e.type) {
          case "image":
            c.verifyFile(e.file, "msg::FileMessage");
            break;
          case "audio":
            u.verifyFile(e.file, "msg::FileMessage");
            break;
          case "video":
            l.verifyFile(e.file, "msg::FileMessage")
        }
        s.call(this, e), this.attach = JSON.stringify(e.file)
      }
      a.prototype = Object.create(s.prototype), a.reverse = function(e) {
        var t = s.reverse(e);
        return e.attach = e.attach ? "" + e.attach : "", t.file = e.attach ? JSON.parse(e.attach) : {}, t.file.url =
          (0, r.genPrivateUrl)(t.file.url), "audio" !== t.type || t.file.mp3Url || (t.file.mp3Url = t.file.url +
            (~t.file.url.indexOf("?") ? "&" : "?") + "audioTrans&type=mp3"), o.httpsEnabled && (t.file.url = t.file
            .url.replace("http", "https")), t
      }, e.exports = a;
      var c = n(410),
        u = n(409),
        l = n(408)
    }, function(e, t, n) {
      "use strict";
      var r = n(67),
        s = n(0),
        i = {
          unknown: 0,
          male: 1,
          female: 2
        },
        o = {
          0: "unknown",
          1: "male",
          2: "female"
        };

      function a(e) {
        s.merge(this, e), s.notundef(this.gender) && (s.verifyParamValid("gender", this.gender, a.validGenders,
          "user::User"), this.gender = i[this.gender]), s.notundef(this.email) && "" !== this.email && s.verifyEmail(
          "email", this.email, "user::User"), s.notundef(this.birth) && "" !== this.birth && s.verifyBirth(
          "birth", this.birth, "user::User"), s.notundef(this.tel) && "" !== this.tel && s.verifyTel("tel",
          this.tel, "user::User")
      }
      a.reverse = function(e) {
        var t = s.filterObj(e,
          "account nick avatar _avatar_safe sign gender email birth tel custom createTime updateTime");
        return s.notundef(t.avatar) && (t.avatar = (0, r.genPrivateUrl)(t.avatar)), s.notundef(t.gender) && (t.gender =
            o[t.gender]), s.notundef(t.createTime) && (t.createTime = +t.createTime), s.notundef(t.updateTime) &&
          (t.updateTime = +t.updateTime), t
      }, a.reverseUsers = function(e) {
        return e.map(function(e) {
          return a.reverse(e)
        })
      }, a.validGenders = Object.keys(i), e.exports = a
    }, function(e, t, n) {
      var r = n(6)("iterator"),
        s = !1;
      try {
        var i = [7][r]();
        i.return = function() {
          s = !0
        }, Array.from(i, function() {
          throw 2
        })
      } catch (e) {}
      e.exports = function(e, t) {
        if (!t && !s) return !1;
        var n = !1;
        try {
          var i = [7],
            o = i[r]();
          o.next = function() {
            return {
              done: n = !0
            }
          }, i[r] = function() {
            return o
          }, e(i)
        } catch (e) {}
        return n
      }
    }, function(e, t, n) {
      var r = n(23),
        s = n(6)("iterator"),
        i = Array.prototype;
      e.exports = function(e) {
        return void 0 !== e && (r.Array === e || i[s] === e)
      }
    }, function(e, t, n) {
      var r = n(16);
      e.exports = function(e, t, n, s) {
        try {
          return s ? t(r(n)[0], n[1]) : t(n)
        } catch (t) {
          var i = e.return;
          throw void 0 !== i && r(i.call(e)), t
        }
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(2),
        s = r.chunkSize,
        i = (n(0), n(49));
      e.exports = function(e, t, n) {
        var o = {
          file: e.data[t],
          fileSize: e.data[t].size,
          fileUoloadedSize: 0,
          percentage: 0
        };

        function a(t) {
          var n = o.fileUoloadedSize + t.loaded,
            r = Math.floor(1e4 * n / o.fileSize) / 100;
          if (parseInt(r) >= 100 && (r = 100, a = function() {}), o.percentage !== r) {
            o.percentage = r;
            var s = {
              docId: e.docId,
              total: o.fileSize,
              loaded: n,
              percentage: r,
              percentageText: r + "%"
            };
            e.fileInput && (s.fileInput = e.fileInput), e.uploadprogress(s)
          }
        }

        function c(t) {
          try {
            t = JSON.parse(t)
          } catch (e) {
            return void n.onError(e)
          }
          if (t.errMsg || t.errCode) n.onError(t);
          else if (t.offset < o.fileSize) delete l.onaftersend, o.fileUoloadedSize = t.offset, n.sn = function(
            e, t, n, r, o) {
            var l = t.offset,
              m = t.offset + s;
            return n.data = o.file.slice(l, m), n.query.offset = t.offset, n.query.complete = m >= o.fileSize,
              n.query.context = t.context, n.onuploading = a, n.onload = c, n.onerror = u, i(e, n)
          }(e.url, t, l, 0, o);
          else {
            var m = function(e) {
                n.onError(e)
              },
              d = r.genFileUrl(e.nosToken);
            "image" === e.type ? i(d + "?imageInfo", {
              onload: function(n) {
                try {
                  n = JSON.parse(n), e.uploaddone(null, {
                    docId: t.docId,
                    w: n.Width,
                    h: n.Height,
                    orientation: n.Orientation || "",
                    type: n.Type,
                    size: n.Size || o.fileSize
                  })
                } catch (e) {
                  m(e)
                }
              },
              onerror: m
            }) : "video" === e.type || "audio" === e.type ? i(d + "?vinfo", {
              onload: function(n) {
                try {
                  (n = JSON.parse(n)).GetVideoInfo && n.GetVideoInfo.VideoInfo && (n = n.GetVideoInfo.VideoInfo),
                    e.uploaddone(null, {
                      docId: t.docId,
                      w: n.Width,
                      h: n.Height,
                      dur: n.Duration,
                      orientation: n.Rotate,
                      audioCodec: n.AudioCodec,
                      videoCodec: n.VideoCodec,
                      container: n.Container,
                      size: n.Size || o.fileSize
                    })
                } catch (e) {
                  m(e)
                }
              },
              onerror: m
            }) : e.uploaddone(null, {
              docId: t.docId,
              size: o.fileSize
            })
          }
        }

        function u(e) {
          try {
            if (e.result) var t = JSON.parse(e.result);
            else t = e;
            n.onError(t)
          } catch (e) {
            n.onError(e)
          }
        }
        var l = {
          query: {
            offset: 0,
            complete: s >= o.fileSize,
            version: "1.0"
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-nos-token": e.nosToken.token
          },
          method: "POST",
          timeout: 0,
          onaftersend: function() {
            e.beginupload(n)
          },
          onuploading: a,
          onload: c,
          onerror: u
        };
        return l.data = o.file.slice(0, s), i(e.url, l)
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(49);
      e.exports = function(e, t) {
        return t.method = "POST", t.headers = t.headers || {}, t.headers["Content-Type"] =
          "multipart/form-data", t.timeout = 0, t.type = t.type || "json", r(e, t)
      }
    }, function(e, t, n) {
      "use strict";
      var r, s, i = n(12),
        o = n(49),
        a = (r = /json/i, s = /post/i, function(e, t) {
          var n = (t = t || {}).data = t.data || {},
            a = t.headers = t.headers || {},
            c = i.checkWithDefault(a, "Accept", "application/json"),
            u = i.checkWithDefault(a, "Content-Type", "application/json");
          return r.test(c) && (t.type = "json"), s.test(t.method) && r.test(u) && (t.data = JSON.stringify(n)),
            o(e, t)
        });
      e.exports = a
    }, function(e, t, n) {
      "use strict";
      var r = n(12),
        s = n(81),
        i = n(66),
        o = {};

      function a(e) {
        this.init(), i.call(this, e)
      }
      var c = i.prototype,
        u = a.prototype = Object.create(c);
      u.init = function() {
        var e = "NEJ-AJAX-DATA:",
          t = !1;

        function n(t) {
          var n = t.data;
          if (0 === n.indexOf(e)) {
            var r = (n = JSON.parse(n.replace(e, ""))).key,
              s = o[r];
            s && (delete o[r], n.result = decodeURIComponent(n.result || ""), s.onLoad(n))
          }
        }
        return function() {
          ! function() {
            if (!t) {
              t = !0;
              var e = r.getGlobal();
              e.postMessage ? r.on(e, "message", n) : s.addMsgListener(n)
            }
          }()
        }
      }(), u.doSend = function() {
        var e = this.options,
          t = r.url2origin(e.url),
          n = e.proxyUrl || t + "/res/nej_proxy_frame.html",
          i = o[n];
        if (r.isArray(i)) i.push(this.doSend.bind(this, e));
        else {
          if (!i) return o[n] = [this.doSend.bind(this, e)], void r.createIframe({
            src: n,
            onload: function(e) {
              var t = o[n];
              o[n] = r.target(e).contentWindow, t.forEach(function(e) {
                try {
                  e()
                } catch (e) {
                  console.log("error:", e)
                }
              })
            }
          });
          if (!this.aborted) {
            var a = this.key = r.uniqueID();
            o[a] = this;
            var c = r.fetch({
              method: "GET",
              url: "",
              data: null,
              headers: {},
              timeout: 0
            }, e);
            c.key = a, s.postMessage(i, {
              data: c
            }), this.afterSend()
          }
        }
      }, u.abort = function() {
        this.aborted = !0, delete o[this.key], c.abort.call(this)
      }, e.exports = a
    }, function(e, t, n) {
      "use strict";
      var r = n(12),
        s = n(66),
        i = n(81),
        o = "NEJ-UPLOAD-RESULT:",
        a = {};

      function c(e) {
        this.init(), s.call(this, e)
      }
      var u = s.prototype,
        l = c.prototype = Object.create(u);
      l.init = function() {
        var e = !1;

        function t(e) {
          var t = e.data;
          if (0 === t.indexOf(o)) {
            var n = (t = JSON.parse(t.replace(o, ""))).key,
              r = a[n];
            r && (delete a[n], t.result = decodeURIComponent(t.result || ""), r.onLoad(t.result))
          }
        }
        return function() {
          ! function() {
            if (!e) {
              e = !0;
              var n = r.getGlobal();
              n.postMessage ? r.on(n, "message", t) : (i.addMsgListener(t), i.startTimer())
            }
          }()
        }
      }(), l.doSend = function() {
        var e = this,
          t = e.options,
          n = e.key = "zoro-ajax-upload-iframe-" + r.uniqueID();
        a[n] = e;
        var s = e.form = r.html2node('<form style="display:none;"></form>');
        document.body.appendChild(s), s.target = n, s.method = "POST", s.enctype = "multipart/form-data", s.encoding =
          "multipart/form-data";
        var i = t.url,
          o = r.genUrlSep(i);
        s.action = i + o + "_proxy_=form";
        var c = t.data,
          u = [],
          l = [];

        function m() {
          u.forEach(function(e, t) {
            var n = l[t];
            n.parentNode && (e.name = n.name, r.isFunction(e.setAttribute) && e.setAttribute("form", n.getAttribute(
              "form")), n.parentNode.replaceChild(e, n))
          })
        }
        c && r.getKeys(c, t.putFileAtEnd).forEach(function(e) {
          var t = c[e];
          if (t.tagName && "INPUT" === t.tagName.toUpperCase()) {
            if ("file" === t.type) {
              var n = t,
                i = n.cloneNode(!0);
              n.parentNode.insertBefore(i, n);
              var o = r.dataset(n, "name");
              o && (n.name = o), s.appendChild(n), r.isFunction(n.setAttribute) && (n.setAttribute("form",
                ""), n.removeAttribute("form")), u.push(t), l.push(i)
            }
          } else {
            var a = r.html2node('<input type="hidden"/>');
            a.name = e, a.value = t, s.appendChild(a)
          }
        });
        var d = e.iframe = r.createIframe({
          name: n,
          onload: function() {
            e.aborted ? m() : (r.on(d, "load", e.checkResult.bind(e)), s.submit(), m(), e.afterSend())
          }
        })
      }, l.checkResult = function() {
        var e, t;
        try {
          if ((t = ((e = this.iframe.contentWindow.document.body).innerText || e.textContent || "").trim()).indexOf(
              o) >= 0 || e.innerHTML.indexOf(o) >= 0) return
        } catch (e) {
          return void console.log("error:", "ignore error if not same domain,", e)
        }
        this.onLoad(t)
      }, l.onLoad = function(e) {
        u.onLoad.call(this, {
          status: 200,
          result: e
        }), r.remove(this.form), r.remove(this.iframe), u.destroy.call(this)
      }, l.destroy = function() {
        r.remove(this.iframe), r.remove(this.form)
      }, l.abort = function() {
        this.aborted = !0, delete a[this.key], u.abort.call(this)
      }, e.exports = c
    }, function(e, t, n) {
      var r;
      /*!
       * EventEmitter v5.2.4 - git.io/ee
       * Unlicense - http://unlicense.org/
       * Oliver Caldwell - http://oli.me.uk/
       * @preserve
       */
      ! function(t) {
        "use strict";

        function s() {}
        var i = s.prototype,
          o = t.EventEmitter;

        function a(e, t) {
          for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
          return -1
        }

        function c(e) {
          return function() {
            return this[e].apply(this, arguments)
          }
        }
        i.getListeners = function(e) {
          var t, n, r = this._getEvents();
          if (e instanceof RegExp)
            for (n in t = {}, r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n]);
          else t = r[e] || (r[e] = []);
          return t
        }, i.flattenListeners = function(e) {
          var t, n = [];
          for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
          return n
        }, i.getListenersAsObject = function(e) {
          var t, n = this.getListeners(e);
          return n instanceof Array && ((t = {})[e] = n), t || n
        }, i.addListener = function(e, t) {
          if (! function e(t) {
              return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener)
            }(t)) throw new TypeError("listener must be a function");
          var n, r = this.getListenersAsObject(e),
            s = "object" == typeof t;
          for (n in r) r.hasOwnProperty(n) && -1 === a(r[n], t) && r[n].push(s ? t : {
            listener: t,
            once: !1
          });
          return this
        }, i.on = c("addListener"), i.addOnceListener = function(e, t) {
          return this.addListener(e, {
            listener: t,
            once: !0
          })
        }, i.once = c("addOnceListener"), i.defineEvent = function(e) {
          return this.getListeners(e), this
        }, i.defineEvents = function(e) {
          for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
          return this
        }, i.removeListener = function(e, t) {
          var n, r, s = this.getListenersAsObject(e);
          for (r in s) s.hasOwnProperty(r) && -1 !== (n = a(s[r], t)) && s[r].splice(n, 1);
          return this
        }, i.off = c("removeListener"), i.addListeners = function(e, t) {
          return this.manipulateListeners(!1, e, t)
        }, i.removeListeners = function(e, t) {
          return this.manipulateListeners(!0, e, t)
        }, i.manipulateListeners = function(e, t, n) {
          var r, s, i = e ? this.removeListener : this.addListener,
            o = e ? this.removeListeners : this.addListeners;
          if ("object" != typeof t || t instanceof RegExp)
            for (r = n.length; r--;) i.call(this, t, n[r]);
          else
            for (r in t) t.hasOwnProperty(r) && (s = t[r]) && ("function" == typeof s ? i.call(this, r, s) : o.call(
              this, r, s));
          return this
        }, i.removeEvent = function(e) {
          var t, n = typeof e,
            r = this._getEvents();
          if ("string" === n) delete r[e];
          else if (e instanceof RegExp)
            for (t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t];
          else delete this._events;
          return this
        }, i.removeAllListeners = c("removeEvent"), i.emitEvent = function(e, t) {
          var n, r, s, i, o = this.getListenersAsObject(e);
          for (i in o)
            if (o.hasOwnProperty(i))
              for (n = o[i].slice(0), s = 0; s < n.length; s++) !0 === (r = n[s]).once && this.removeListener(e,
                r.listener), r.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(
                e, r.listener);
          return this
        }, i.trigger = c("emitEvent"), i.emit = function(e) {
          var t = Array.prototype.slice.call(arguments, 1);
          return this.emitEvent(e, t)
        }, i.setOnceReturnValue = function(e) {
          return this._onceReturnValue = e, this
        }, i._getOnceReturnValue = function() {
          return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, i._getEvents = function() {
          return this._events || (this._events = {})
        }, s.noConflict = function() {
          return t.EventEmitter = o, s
        }, void 0 === (r = function() {
          return s
        }.call(t, n, t, e)) || (e.exports = r)
      }(this || {})
    }, function(e, t, n) {
      "use strict";
      var r = n(12),
        s = n(66);

      function i(e) {
        e.onuploading && this.on("uploading", e.onuploading), s.call(this, e)
      }
      var o = s.prototype,
        a = i.prototype = Object.create(o);
      a.doSend = function() {
        var e = this.options,
          t = e.headers,
          n = this.xhr = new XMLHttpRequest;
        if ("multipart/form-data" === t["Content-Type"]) {
          delete t["Content-Type"], n.upload.onprogress = this.onProgress.bind(this), n.upload.onload = this.onProgress
            .bind(this);
          var s = e.data;
          e.data = new window.FormData, s && r.getKeys(s, e.putFileAtEnd).forEach(function(t) {
            var n = s[t];
            n.tagName && "INPUT" === n.tagName.toUpperCase() ? "file" === n.type && [].forEach.call(n.files,
              function(t) {
                e.data.append(r.dataset(n, "name") || n.name || t.name || "file-" + r.uniqueID(), t)
              }) : e.data.append(t, n)
          })
        } else t["x-nos-token"] && (n.upload.onprogress = this.onProgress.bind(this), n.upload.onload = this.onProgress
          .bind(this));
        n.onreadystatechange = this.onStateChange.bind(this), 0 !== e.timeout && (this.timer = setTimeout(this.onTimeout
          .bind(this), e.timeout)), n.open(e.method, e.url, !e.sync), Object.keys(t).forEach(function(e) {
          n.setRequestHeader(e, t[e])
        }), e.cookie && "withCredentials" in n && (n.withCredentials = !0), n.send(e.data), this.afterSend()
      }, a.onProgress = function(e) {
        e.lengthComputable && e.loaded <= e.total && this.emit("uploading", e)
      }, a.onStateChange = function() {
        var e = this.xhr;
        4 === e.readyState && this.onLoad({
          status: e.status,
          result: e.responseText || ""
        })
      }, a.getResponseHeader = function(e) {
        var t = this.xhr;
        return t ? t.getResponseHeader(e) : ""
      }, a.destroy = function() {
        clearTimeout(this.timer);
        try {
          this.xhr.onreadystatechange = r.f, this.xhr.abort()
        } catch (e) {
          console.log("error:", "ignore error ajax destroy,", e)
        }
        o.destroy.call(this)
      }, e.exports = i
    }, function(e, t, n) {
      "use strict";
      n(174).polyfill(), n(2).isBrowser = !0
    }, , , , , , , , , , , function(e, t) {
      e.exports = function(e) {
        var t = n.call(e);
        return "[object Function]" === t || "function" == typeof e && "[object RegExp]" !== t || "undefined" !=
          typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e ===
            window.prompt)
      };
      var n = Object.prototype.toString
    }, function(module, exports, __webpack_require__) {
      (function(global, module) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; /*! Socket.IO.js build:0.9.11, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
        function getGlobal() {
          return "undefined" != typeof window ? window : "undefined" != typeof self ? self : void 0 !== global ?
            global : {}
        }
        var root = getGlobal(),
          io = module.exports;
        void 0 === root.location && (root.location = null), root.io ? module && (module.exports = io = root.io) :
          root.io = io,
          function() {
            ! function(e, t) {
              var n = e;
              n.version = "0.9.11", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect =
                function(e, r) {
                  var s, i, o = n.util.parseUri(e);
                  t && t.location && (o.protocol = o.protocol || t.location.protocol.slice(0, -1), o.host = o.host ||
                    (t.document ? t.document.domain : t.location.hostname), o.port = o.port || t.location.port
                  ), s = n.util.uniqueUri(o);
                  var a = {
                    host: o.host,
                    secure: "https" === o.protocol,
                    port: o.port || ("https" === o.protocol ? 443 : 80),
                    query: o.query || ""
                  };
                  return n.util.merge(a, r), !a["force new connection"] && n.sockets[s] || (i = new n.Socket(a)),
                    !a["force new connection"] && i && (n.sockets[s] = i), (i = i || n.sockets[s]).of(o.path.length >
                      1 ? o.path : "")
                }
            }(module.exports, root),
            function(e, t) {
              var n = e.util = {},
                r =
                /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                s = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port",
                  "relative", "path", "directory", "file", "query", "anchor"
                ];
              n.parseUri = function(e) {
                for (var t = r.exec(e || ""), n = {}, i = 14; i--;) n[s[i]] = t[i] || "";
                return n
              }, n.uniqueUri = function(e) {
                var n = e.protocol,
                  r = e.host,
                  s = e.port;
                return "document" in t ? (r = r || document.domain, s = s || ("https" == n && "https:" !==
                  document.location.protocol ? 443 : document.location.port)) : (r = r || "localhost", s ||
                  "https" != n || (s = 443)), (n || "http") + "://" + r + ":" + (s || 80)
              }, n.query = function(e, t) {
                var r = n.chunkQuery(e || ""),
                  s = [];
                for (var i in n.merge(r, n.chunkQuery(t || "")), r) r.hasOwnProperty(i) && s.push(i + "=" + r[
                  i]);
                return s.length ? "?" + s.join("&") : ""
              }, n.chunkQuery = function(e) {
                for (var t, n = {}, r = e.split("&"), s = 0, i = r.length; s < i; ++s)(t = r[s].split("="))[0] &&
                  (n[t[0]] = t[1]);
                return n
              };
              var i = !1;
              n.load = function(e) {
                  if (document && "complete" === document.readyState || i) return e();
                  n.on(t, "load", e, !1)
                }, n.on = function(e, t, n, r) {
                  e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, r)
                }, n.request = function(e) {
                  if (e && "undefined" != typeof XDomainRequest && !n.ua.hasCORS) return new XDomainRequest;
                  if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS)) return new XMLHttpRequest;
                  if (!e) try {
                    return new(root[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                  } catch (e) {}
                  return null
                }, void 0 !== root && n.load(function() {
                  i = !0
                }), n.defer = function(e) {
                  if (!n.ua.webkit || "undefined" != typeof importScripts) return e();
                  n.load(function() {
                    setTimeout(e, 100)
                  })
                }, n.merge = function(e, t, r, s) {
                  var i, o = s || [],
                    a = void 0 === r ? 2 : r;
                  for (i in t) t.hasOwnProperty(i) && n.indexOf(o, i) < 0 && ("object" == typeof e[i] && a ? n.merge(
                    e[i], t[i], a - 1, o) : (e[i] = t[i], o.push(t[i])));
                  return e
                }, n.mixin = function(e, t) {
                  n.merge(e.prototype, t.prototype)
                }, n.inherit = function(e, t) {
                  function n() {}
                  n.prototype = t.prototype, e.prototype = new n
                }, n.isArray = Array.isArray || function(e) {
                  return "[object Array]" === Object.prototype.toString.call(e)
                }, n.intersect = function(e, t) {
                  for (var r = [], s = e.length > t.length ? e : t, i = e.length > t.length ? t : e, o = 0, a =
                      i.length; o < a; o++) ~n.indexOf(s, i[o]) && r.push(i[o]);
                  return r
                }, n.indexOf = function(e, t, n) {
                  var r = e.length;
                  for (n = n < 0 ? n + r < 0 ? 0 : n + r : n || 0; n < r && e[n] !== t; n++);
                  return r <= n ? -1 : n
                }, n.toArray = function(e) {
                  for (var t = [], n = 0, r = e.length; n < r; n++) t.push(e[n]);
                  return t
                }, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
                  try {
                    var e = new XMLHttpRequest
                  } catch (e) {
                    return !1
                  }
                  return null != e.withCredentials
                }(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua
                .iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
            }(void 0 !== io ? io : module.exports, root),
            function(e, t) {
              function n() {}
              e.EventEmitter = n, n.prototype.on = function(e, n) {
                return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ?
                  this.$events[e].push(n) : this.$events[e] = [this.$events[e], n] : this.$events[e] = n,
                  this
              }, n.prototype.addListener = n.prototype.on, n.prototype.once = function(e, t) {
                var n = this;

                function r() {
                  n.removeListener(e, r), t.apply(this, arguments)
                }
                return r.listener = t, this.on(e, r), this
              }, n.prototype.removeListener = function(e, n) {
                if (this.$events && this.$events[e]) {
                  var r = this.$events[e];
                  if (t.util.isArray(r)) {
                    for (var s = -1, i = 0, o = r.length; i < o; i++)
                      if (r[i] === n || r[i].listener && r[i].listener === n) {
                        s = i;
                        break
                      } if (s < 0) return this;
                    r.splice(s, 1), r.length || delete this.$events[e]
                  } else(r === n || r.listener && r.listener === n) && delete this.$events[e]
                }
                return this
              }, n.prototype.removeAllListeners = function(e) {
                return void 0 === e ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[
                  e] = null), this)
              }, n.prototype.listeners = function(e) {
                return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util
                  .isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]), this.$events[e]
              }, n.prototype.emit = function(e) {
                if (!this.$events) return !1;
                var n = this.$events[e];
                if (!n) return !1;
                var r = Array.prototype.slice.call(arguments, 1);
                if ("function" == typeof n) n.apply(this, r);
                else {
                  if (!t.util.isArray(n)) return !1;
                  for (var s = n.slice(), i = 0, o = s.length; i < o; i++) s[i].apply(this, r)
                }
                return !0
              }
            }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports),
            function(exports, nativeJSON) {
              "use strict";
              if (nativeJSON && nativeJSON.parse) return exports.JSON = {
                parse: nativeJSON.parse,
                stringify: nativeJSON.stringify
              };
              var JSON = exports.JSON = {};

              function f(e) {
                return e < 10 ? "0" + e : e
              }

              function date(e, t) {
                return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) +
                  "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" :
                  null
              }
              var cx =
                /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable =
                /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                  "\b": "\\b",
                  "\t": "\\t",
                  "\n": "\\n",
                  "\f": "\\f",
                  "\r": "\\r",
                  '"': '\\"',
                  "\\": "\\\\"
                },
                rep;

              function quote(e) {
                return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                  var t = meta[e];
                  return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-
                    4)
                }) + '"' : '"' + e + '"'
              }

              function str(e, t) {
                var n, r, s, i, o, a = gap,
                  c = t[e];
                switch (c instanceof Date && (c = date(e)), "function" == typeof rep && (c = rep.call(t, e, c)),
                  typeof c) {
                  case "string":
                    return quote(c);
                  case "number":
                    return isFinite(c) ? String(c) : "null";
                  case "boolean":
                  case "null":
                    return String(c);
                  case "object":
                    if (!c) return "null";
                    if (gap += indent, o = [], "[object Array]" === Object.prototype.toString.apply(c)) {
                      for (i = c.length, n = 0; n < i; n += 1) o[n] = str(n, c) || "null";
                      return s = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + a +
                        "]" : "[" + o.join(",") + "]", gap = a, s
                    }
                    if (rep && "object" == typeof rep)
                      for (i = rep.length, n = 0; n < i; n += 1) "string" == typeof rep[n] && (s = str(r = rep[
                        n], c)) && o.push(quote(r) + (gap ? ": " : ":") + s);
                    else
                      for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (s = str(r, c)) && o.push(
                        quote(r) + (gap ? ": " : ":") + s);
                    return s = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + a + "}" :
                      "{" + o.join(",") + "}", gap = a, s
                }
              }
              JSON.stringify = function(e, t, n) {
                var r;
                if (gap = "", indent = "", "number" == typeof n)
                  for (r = 0; r < n; r += 1) indent += " ";
                else "string" == typeof n && (indent = n);
                if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))
                  throw new Error("socket.io:: replacer cannot JSON.stringify");
                return str("", {
                  "": e
                })
              }, JSON.parse = function(text, reviver) {
                var j;

                function walk(e, t) {
                  var n, r, s = e[t];
                  if (s && "object" == typeof s)
                    for (n in s) Object.prototype.hasOwnProperty.call(s, n) && (void 0 !== (r = walk(s, n)) ?
                      s[n] = r : delete s[n]);
                  return reviver.call(e, t, s)
                }
                if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(
                    e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                  })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(
                    /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(
                    /(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ?
                  walk({
                    "": j
                  }, "") : j;
                throw new SyntaxError("socket.io:: reviver cannot JSON.parse")
              }
            }(void 0 !== io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0),
            function(e, t) {
              var n = e.parser = {},
                r = n.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack",
                  "error", "noop"
                ],
                s = n.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
                i = n.advice = ["reconnect"],
                o = t.JSON,
                a = t.util.indexOf;
              n.encodePacket = function(e) {
                var t = a(r, e.type),
                  n = e.id || "",
                  c = e.endpoint || "",
                  u = e.ack,
                  l = null;
                switch (e.type) {
                  case "error":
                    var m = e.reason ? a(s, e.reason) : "",
                      d = e.advice ? a(i, e.advice) : "";
                    "" === m && "" === d || (l = m + ("" !== d ? "+" + d : ""));
                    break;
                  case "message":
                    "" !== e.data && (l = e.data);
                    break;
                  case "event":
                    var p = {
                      name: e.name
                    };
                    e.args && e.args.length && (p.args = e.args), l = o.stringify(p);
                    break;
                  case "json":
                    l = o.stringify(e.data);
                    break;
                  case "connect":
                    e.qs && (l = e.qs);
                    break;
                  case "ack":
                    l = e.ackId + (e.args && e.args.length ? "+" + o.stringify(e.args) : "")
                }
                var f = [t, n + ("data" == u ? "+" : ""), c];
                return null != l && f.push(l), f.join(":")
              }, n.encodePayload = function(e) {
                var t = "";
                if (1 == e.length) return e[0];
                for (var n = 0, r = e.length; n < r; n++) {
                  t += "�" + e[n].length + "�" + e[n]
                }
                return t
              };
              var c = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
              n.decodePacket = function(e) {
                if (!(a = e.match(c))) return {};
                var t = a[2] || "",
                  n = (e = a[5] || "", {
                    type: r[a[1]],
                    endpoint: a[4] || ""
                  });
                switch (t && (n.id = t, a[3] ? n.ack = "data" : n.ack = !0), n.type) {
                  case "error":
                    var a = e.split("+");
                    n.reason = s[a[0]] || "", n.advice = i[a[1]] || "";
                    break;
                  case "message":
                    n.data = e || "";
                    break;
                  case "event":
                    try {
                      var u = o.parse(e);
                      n.name = u.name, n.args = u.args
                    } catch (e) {}
                    n.args = n.args || [];
                    break;
                  case "json":
                    try {
                      n.data = o.parse(e)
                    } catch (e) {}
                    break;
                  case "connect":
                    n.qs = e || "";
                    break;
                  case "ack":
                    if ((a = e.match(/^([0-9]+)(\+)?(.*)/)) && (n.ackId = a[1], n.args = [], a[3])) try {
                      n.args = a[3] ? o.parse(a[3]) : []
                    } catch (e) {}
                }
                return n
              }, n.decodePayload = function(e) {
                var t = function(e, t) {
                  for (var n = 0, r = e; r < t.length; r++) {
                    if ("�" == t.charAt(r)) return n;
                    n++
                  }
                  return n
                };
                if ("�" == e.charAt(0)) {
                  for (var r = [], s = 1, i = ""; s < e.length; s++)
                    if ("�" == e.charAt(s)) {
                      var o = e.substr(s + 1).substr(0, i);
                      if ("�" != e.charAt(s + 1 + Number(i)) && s + 1 + Number(i) != e.length) {
                        var a = Number(i);
                        l = t(s + a + 1, e), o = e.substr(s + 1).substr(0, a + l), s += l
                      }
                      r.push(n.decodePacket(o)), s += Number(i) + 1, i = ""
                    } else i += e.charAt(s);
                  return r
                }
                return [n.decodePacket(e)]
              }
            }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports),
            function(e, t) {
              function n(e, t) {
                this.socket = e, this.sessid = t
              }
              e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.heartbeats = function() {
                  return !0
                }, n.prototype.onData = function(e) {
                  if (this !== this.socket.transport) return this;
                  if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket
                      .reconnecting) && this.setCloseTimeout(), "" !== e) {
                    var n = t.parser.decodePayload(e);
                    if (n && n.length)
                      for (var r = 0, s = n.length; r < s; r++) this.onPacket(n[r])
                  }
                  return this
                }, n.prototype.onPacket = function(e) {
                  return this.socket.setHeartbeatTimeout(), "heartbeat" == e.type ? this.onHeartbeat() : (
                    "connect" == e.type && "" == e.endpoint && this.onConnect(), "error" == e.type &&
                    "reconnect" == e.advice && (this.isOpen = !1), this.socket.onPacket(e), this)
                }, n.prototype.setCloseTimeout = function() {
                  if (!this.closeTimeout) {
                    var e = this;
                    this.closeTimeout = setTimeout(function() {
                      e.onDisconnect()
                    }, this.socket.closeTimeout)
                  }
                }, n.prototype.onDisconnect = function() {
                  return this.isOpen && this.close(), this.clearTimeouts(), this.socket ? (this.socket.transport ===
                    this ? this.socket.onDisconnect() : this.socket.setBuffer(!1), this) : this
                }, n.prototype.onConnect = function() {
                  return this.socket.onConnect(), this
                }, n.prototype.clearCloseTimeout = function() {
                  this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
                }, n.prototype.clearTimeouts = function() {
                  this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
                }, n.prototype.packet = function(e) {
                  this.send(t.parser.encodePacket(e))
                }, n.prototype.onHeartbeat = function(e) {
                  this.packet({
                    type: "heartbeat"
                  })
                }, n.prototype.onOpen = function() {
                  this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen()
                }, n.prototype.onClose = function() {
                  this.isOpen = !1, this.socket.transport === this ? this.socket.onClose() : this.socket.setBuffer(
                    !1), this.onDisconnect(), this.onDisconnectDone instanceof Function && this.onDisconnectDone(
                    null), this.onConnectionOver instanceof Function && this.onConnectionOver(null)
                }, n.prototype.onDisconnectDone = function() {}, n.prototype.onConnectionOver = function() {},
                n.prototype.prepareUrl = function() {
                  var e = this.socket.options;
                  return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol +
                    "/" + this.name + "/" + this.sessid
                }, n.prototype.ready = function(e, t) {
                  t.call(this)
                }
            }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports),
            function(e, t, n) {
              function r(e) {
                if (this.options = {
                    port: 80,
                    secure: !1,
                    document: "document" in n && document,
                    resource: "socket.io",
                    transports: e.transports || t.transports,
                    "connect timeout": 1e4,
                    "try multiple transports": !0,
                    reconnect: !0,
                    "reconnection delay": 500,
                    "reconnection limit": 1 / 0,
                    "reopen delay": 3e3,
                    "max reconnection attempts": 10,
                    "sync disconnect on unload": !1,
                    "auto connect": !0,
                    "flash policy port": 10843,
                    manualFlush: !1
                  }, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1,
                  this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options[
                    "sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
                  var r = this;
                  t.util.on(n, "beforeunload", function() {
                    r.disconnectSync()
                  }, !1)
                }
                this.options["auto connect"] && this.connect()
              }

              function s() {}
              e.Socket = r, t.util.mixin(r, t.EventEmitter), r.prototype.of = function(e) {
                return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), "" !== e &&
                  this.namespaces[e].packet({
                    type: "connect"
                  })), this.namespaces[e]
              }, r.prototype.publish = function() {
                var e;
                for (var t in this.emit.apply(this, arguments), this.namespaces) this.namespaces.hasOwnProperty(
                  t) && (e = this.of(t)).$emit.apply(e, arguments)
              }, r.prototype.handshake = function(e) {
                var n = this,
                  r = this.options;

                function i(t) {
                  t instanceof Error ? (n.connecting = !1, n.onError(t.message)) : (console.log(
                    "SocketIO handshake success " + t), e.apply(null, t.split(":")))
                }
                var o = ["http" + (r.secure ? "s" : "") + ":/", r.host + ":" + r.port, r.resource, t.protocol,
                  t.util.query(this.options.query, "t=" + +new Date)
                ].join("/");
                if (this.isXDomain() && !t.util.ua.hasCORS && document && document.getElementsByTagName) {
                  var a = document.getElementsByTagName("script")[0],
                    c = document.createElement("script");
                  c.src = o + "&jsonp=" + t.j.length, c.onreadystatechange = function() {
                    "loaded" == this.readyState && c.parentNode && (c.parentNode.removeChild(c), n.connecting = !
                      1, !n.reconnecting && n.onError("Server down or port not open"), n.publish(
                        "handshake_failed"))
                  }, a.parentNode.insertBefore(c, a), t.j.push(function(e) {
                    i(e), c.parentNode.removeChild(c)
                  })
                } else {
                  var u = t.util.request();
                  u.open("GET", o, !0), u.timeout = 1e4, this.isXDomain() && (u.withCredentials = !0), u.onreadystatechange =
                    function() {
                      4 == u.readyState && (u.onreadystatechange = s, 200 == u.status ? i(u.responseText) :
                        403 == u.status ? (n.connecting = !1, n.onError(u.responseText), n.publish(
                          "handshake_failed")) : (n.connecting = !1, !n.reconnecting && n.onError(u.responseText),
                          n.publish("handshake_failed")))
                    }, u.ontimeout = function(e) {
                      n.connecting = !1, !n.reconnecting && n.onError(u.responseText), n.publish(
                        "handshake_failed")
                    }, u.send(null)
                }
              }, r.prototype.connect = function(e) {
                if (this.connecting) return this;
                var n = this;
                return n.connecting = !0, this.handshake(function(r, s, i, o) {
                  n.sessionid = r, n.closeTimeout = 1e3 * i, n.heartbeatTimeout = 1e3 * s, n.transports ||
                    (n.transports = n.origTransports = o ? t.util.intersect(o.split(","), n.options.transports) :
                      n.options.transports), console.log("SocketIO transports: " + n.transports + " opt:" +
                      n.options.transports), n.setHeartbeatTimeout(), n.once("connect", function() {
                      clearTimeout(n.connectTimeoutTimer), n.connectTimeoutTimer = null, e &&
                        "function" == typeof e && e()
                    }), n.doConnect()
                }), this
              }, r.prototype.doConnect = function() {
                var e = this;
                if (e.transport && e.transport.clearTimeouts(), e.transport = e.getTransport(e.transports), !
                  e.transport) return e.publish("connect_failed");
                e.transport.ready(e, function() {
                  e.connecting = !0, e.publish("connecting", e.transport.name), e.transport.open(), e.options[
                    "connect timeout"] && (e.connectTimeoutTimer && clearTimeout(e.connectTimeoutTimer),
                    e.connectTimeoutTimer = setTimeout(e.tryNextTransport.bind(e), e.options[
                      "connect timeout"]))
                })
              }, r.prototype.getTransport = function(e) {
                for (var n, r = e || this.transports, s = 0; n = r[s]; s++) {
                  if (console.log("SocketIO check " + n + " " + t.Transport[n].check(this) + " , cors " + t.Transport[
                      n].xdomainCheck(this)), t.Transport[n] && t.Transport[n].check(this) && (!this.isXDomain() ||
                      t.Transport[n].xdomainCheck(this))) return new t.Transport[n](this, this.sessionid)
                }
                return null
              }, r.prototype.tryNextTransport = function() {
                console.log("SocketIO try next transport");
                if (!this.connected && (this.connecting = !1, this.options["try multiple transports"])) {
                  for (var e = this.transports; e.length > 0 && e.splice(0, 1)[0] != this.transport.name;);
                  e.length ? this.doConnect() : this.publish("connect_failed")
                }
              }, r.prototype.setHeartbeatTimeout = function() {
                if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
                  var e = this;
                  this.heartbeatTimeoutTimer = setTimeout(function() {
                    e.transport && e.transport.onClose()
                  }, this.heartbeatTimeout)
                }
              }, r.prototype.packet = function(e) {
                return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e),
                  this
              }, r.prototype.setBuffer = function(e) {
                this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush ||
                  this.flushBuffer())
              }, r.prototype.flushBuffer = function() {
                this.transport.payload(this.buffer), this.buffer = []
              }, r.prototype.disconnect = function() {
                return (this.connected || this.connecting) && (this.open && this.of("").packet({
                  type: "disconnect"
                }), this.onDisconnect("booted")), this
              }, r.prototype.disconnectSync = function() {
                var e = t.util.request(),
                  n = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options
                    .port, this.options.resource, t.protocol, "", this.sessionid
                  ].join("/") + "/?disconnect=1";
                e.open("GET", n, !1), e.send(null), this.onDisconnect("booted")
              }, r.prototype.isXDomain = function() {
                var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
                return this.options.host !== n.location.hostname || this.options.port != e
              }, r.prototype.onConnect = function() {
                this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(
                  !1), this.emit("connect"))
              }, r.prototype.onOpen = function() {
                this.open = !0
              }, r.prototype.onClose = function() {
                this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
              }, r.prototype.onPacket = function(e) {
                this.of(e.endpoint).onPacket(e)
              }, r.prototype.onError = function(e) {
                e && e.advice && "reconnect" === e.advice && (this.connected || this.connecting) && (this.disconnect(),
                  this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason :
                  e)
              }, r.prototype.onDisconnect = function(e) {
                var t = this.connected,
                  n = this.connecting;
                this.connected = !1, this.connecting = !1, this.open = !1, (t || n) && (this.transport.close(),
                  this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e &&
                    this.options.reconnect && !this.reconnecting && this.reconnect()), n && (this.connectTimeoutTimer &&
                    clearTimeout(this.connectTimeoutTimer), this.tryNextTransport()))
              }, r.prototype.reconnect = function() {
                this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options[
                  "reconnection delay"];
                var e = this,
                  t = this.options["max reconnection attempts"],
                  n = this.options["try multiple transports"],
                  r = this.options["reconnection limit"];

                function s() {
                  if (e.connected) {
                    for (var t in e.namespaces) e.namespaces.hasOwnProperty(t) && "" !== t && e.namespaces[t]
                      .packet({
                        type: "connect"
                      });
                    e.publish("reconnect", e.transport.name, e.reconnectionAttempts)
                  }
                  clearTimeout(e.reconnectionTimer), e.removeListener("connect_failed", i), e.removeListener(
                      "connect", i), e.reconnecting = !1, delete e.reconnectionAttempts, delete e.reconnectionDelay,
                    delete e.reconnectionTimer, delete e.redoTransports, e.options["try multiple transports"] =
                    n
                }

                function i() {
                  if (e.reconnecting) return e.connected ? s() : e.connecting && e.reconnecting ? e.reconnectionTimer =
                    setTimeout(i, 1e3) : void(e.reconnectionAttempts++ >= t ? e.redoTransports ? (e.publish(
                      "reconnect_failed"), s()) : (e.on("connect_failed", i), e.options[
                        "try multiple transports"] = !0, e.transports = e.origTransports, e.transport = e
                      .getTransport(), e.redoTransports = !0, e.connect()) : (e.reconnectionDelay < r &&
                      (e.reconnectionDelay *= 2), e.connect(), e.publish("reconnecting", e.reconnectionDelay,
                        e.reconnectionAttempts), e.reconnectionTimer = setTimeout(i, e.reconnectionDelay)
                    ))
                }
                this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(i, this.reconnectionDelay),
                  this.on("connect", i)
              }
            }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports, root),
            function(e, t) {
              function n(e, t) {
                this.socket = e, this.name = t || "", this.flags = {}, this.json = new r(this, "json"), this.ackPackets =
                  0, this.acks = {}
              }

              function r(e, t) {
                this.namespace = e, this.name = t
              }
              e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype
                .emit, n.prototype.of = function() {
                  return this.socket.of.apply(this.socket, arguments)
                }, n.prototype.packet = function(e) {
                  return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this
                }, n.prototype.send = function(e, t) {
                  var n = {
                    type: this.flags.json ? "json" : "message",
                    data: e
                  };
                  return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t),
                    this.packet(n)
                }, n.prototype.emit = function(e) {
                  var t = Array.prototype.slice.call(arguments, 1),
                    n = t[t.length - 1],
                    r = {
                      type: "event",
                      name: e
                    };
                  return "function" == typeof n && (r.id = ++this.ackPackets, r.ack = "data", this.acks[r.id] =
                    n, t = t.slice(0, t.length - 1)), r.args = t, this.packet(r)
                }, n.prototype.disconnect = function() {
                  return "" === this.name ? this.socket.disconnect() : (this.packet({
                    type: "disconnect"
                  }), this.$emit("disconnect")), this
                }, n.prototype.onPacket = function(e) {
                  var n = this;

                  function r() {
                    n.packet({
                      type: "ack",
                      args: t.util.toArray(arguments),
                      ackId: e.id
                    })
                  }
                  switch (e.type) {
                    case "connect":
                      this.$emit("connect");
                      break;
                    case "disconnect":
                      "" === this.name ? this.socket.onDisconnect(e.reason || "booted") : this.$emit(
                        "disconnect", e.reason);
                      break;
                    case "message":
                    case "json":
                      var s = ["message", e.data];
                      "data" == e.ack ? s.push(r) : e.ack && this.packet({
                        type: "ack",
                        ackId: e.id
                      }), this.$emit.apply(this, s);
                      break;
                    case "event":
                      s = [e.name].concat(e.args);
                      "data" == e.ack && s.push(r), this.$emit.apply(this, s);
                      break;
                    case "ack":
                      this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
                      break;
                    case "error":
                      console.error("SocketIO on packet error: ", e), e.advice ? this.socket.onError(e) :
                        "unauthorized" === e.reason ? this.$emit("connect_failed", e.reason) : this.$emit(
                          "error", e.reason)
                  }
                }, r.prototype.send = function() {
                  this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
                }, r.prototype.emit = function() {
                  this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
                }
            }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports),
            function(e, t, n) {
              function r(e) {
                t.Transport.apply(this, arguments)
              }
              e.websocket = r, t.util.inherit(r, t.Transport), r.prototype.name = "websocket", r.prototype.open =
                function() {
                  var e, r = t.util.query(this.socket.options.query),
                    s = this;
                  return e || (e = n.MozWebSocket || n.WebSocket), this.websocket = new e(this.prepareUrl() + r),
                    this.websocket.onopen = function() {
                      s.onOpen(), s.socket.setBuffer(!1)
                    }, this.websocket.onmessage = function(e) {
                      s.onData(e.data)
                    }, this.websocket.onclose = function() {
                      s.socket.setBuffer(!0), s.onClose()
                    }, this.websocket.onerror = function(e) {
                      s.onError(e)
                    }, this
                }, t.util.ua.iDevice ? r.prototype.send = function(e) {
                  var t = this;
                  return setTimeout(function() {
                    t.websocket.send(e)
                  }, 0), this
                } : r.prototype.send = function(e) {
                  return this.websocket.send(e), this
                }, r.prototype.payload = function(e) {
                  for (var t = 0, n = e.length; t < n; t++) this.packet(e[t]);
                  return this
                }, r.prototype.close = function() {
                  return this.websocket.close(), this
                }, r.prototype.onError = function(e) {
                  this.socket.onError(e)
                }, r.prototype.scheme = function() {
                  return this.socket.options.secure ? "wss" : "ws"
                }, r.check = function() {
                  return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n
                }, r.xdomainCheck = function() {
                  return !0
                }, t.transports.push("websocket")
            }(void 0 !== io ? io.Transport : module.exports, void 0 !== io ? io : module.parent.exports, root),
            function(e, t, n) {
              function r(e) {
                e && (t.Transport.apply(this, arguments), this.sendBuffer = [])
              }

              function s() {}
              e.XHR = r, t.util.inherit(r, t.Transport), r.prototype.open = function() {
                return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
              }, r.prototype.payload = function(e) {
                for (var n = [], r = 0, s = e.length; r < s; r++) n.push(t.parser.encodePacket(e[r]));
                this.send(t.parser.encodePayload(n))
              }, r.prototype.send = function(e) {
                return this.post(e), this
              }, r.prototype.post = function(e) {
                var t = this;
                this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ?
                  this.sendXHR.onload = this.sendXHR.onerror = function() {
                    this.onload = s, t.socket.setBuffer(!1)
                  } : this.sendXHR.onreadystatechange = function() {
                    4 == this.readyState && (this.onreadystatechange = s, t.posting = !1, 200 == this.status ?
                      t.socket.setBuffer(!1) : t.onClose())
                  }, this.sendXHR.send(e)
              }, r.prototype.close = function() {
                return this.onClose(), this
              }, r.prototype.request = function(e) {
                var n = t.util.request(this.socket.isXDomain()),
                  r = t.util.query(this.socket.options.query, "t=" + +new Date);
                if (n.open(e || "GET", this.prepareUrl() + r, !0), "POST" == e) try {
                  n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType =
                    "text/plain"
                } catch (e) {}
                return n
              }, r.prototype.scheme = function() {
                return this.socket.options.secure ? "https" : "http"
              }, r.check = function(e, r) {
                try {
                  var s = t.util.request(r),
                    i = n.XDomainRequest && s instanceof XDomainRequest,
                    o = e && e.options && e.options.secure ? "https:" : "http:",
                    a = n.location && o != n.location.protocol;
                  if (s && (!i || !a)) return !0
                } catch (e) {}
                return !1
              }, r.xdomainCheck = function(e) {
                return r.check(e, !0)
              }
            }(void 0 !== io ? io.Transport : module.exports, void 0 !== io ? io : module.parent.exports, root),
            function(e, t, n) {
              function r() {
                t.Transport.XHR.apply(this, arguments)
              }

              function s() {}
              e["xhr-polling"] = r, t.util.inherit(r, t.Transport.XHR), t.util.merge(r, t.Transport.XHR), r.prototype
                .name = "xhr-polling", r.prototype.heartbeats = function() {
                  return !1
                }, r.prototype.open = function() {
                  return t.Transport.XHR.prototype.open.call(this), !1
                }, r.prototype.get = function() {
                  if (this.isOpen) {
                    var e = this;
                    this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr
                      .onload = function() {
                        this.onload = s, this.onerror = s, e.retryCounter = 1, e.onData(this.responseText), e
                          .get()
                      }, this.xhr.onerror = function() {
                        e.retryCounter++, !e.retryCounter || e.retryCounter > 3 ? e.onClose() : e.get()
                      }) : this.xhr.onreadystatechange = function() {
                      4 == this.readyState && (this.onreadystatechange = s, 200 == this.status ? (e.onData(
                        this.responseText), e.get()) : e.onClose())
                    }, this.xhr.send(null)
                  }
                }, r.prototype.onClose = function() {
                  if (t.Transport.XHR.prototype.onClose.call(this), this.xhr) {
                    this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = s;
                    try {
                      this.xhr.abort()
                    } catch (e) {}
                    this.xhr = null
                  }
                }, r.prototype.ready = function(e, n) {
                  var r = this;
                  t.util.defer(function() {
                    n.call(r)
                  })
                }, t.transports.push("xhr-polling")
            }(void 0 !== io ? io.Transport : module.exports, void 0 !== io ? io : module.parent.exports, root),
            __WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
              return io
            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (
              module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
          }()
      }).call(this, __webpack_require__(31), __webpack_require__(293)(module))
    }, function(e, t, n) {
      "use strict";
      var r = {
          1: "ROOM_CLOSE",
          2: "ROOM_JOIN",
          3: "INVITE",
          4: "CANCEL_INVITE",
          5: "REJECT",
          6: "ACCEPT",
          7: "LEAVE",
          8: "CONTROL"
        },
        s = {
          1: "accid",
          2: "uid",
          3: "createTime",
          4: "expireTime",
          5: "web_uid"
        },
        i = {
          10404: "ROOM_NOT_EXISTS",
          10405: "ROOM_HAS_EXISTS",
          10406: "ROOM_MEMBER_NOT_EXISTS",
          10407: "ROOM_MEMBER_HAS_EXISTS",
          10408: "INVITE_NOT_EXISTS",
          10409: "INVITE_HAS_REJECT",
          10410: "INVITE_HAS_ACCEPT",
          10201: "PEER_NIM_OFFLINE",
          10202: "PEER_PUSH_OFFLINE",
          10419: "ROOM_MEMBER_EXCEED",
          10420: "ROOM_MEMBER_HAS_EXISTS_OTHER_CLIENT",
          10417: "UID_CONFLICT"
        };
      e.exports = {
        parseAvSignalType: function(e) {
          return r[e] || e
        },
        parseAvSignalMember: function(e) {
          var t = {};
          return Object.keys(e).forEach(function(n) {
            t[s[n]] = e[n]
          }), t
        },
        parseAvSignalError: function(e) {
          return e.message = i[e.code] || e.message || e, e
        }
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(0),
        s = {
          stripmeta: 0,
          blur: 2,
          quality: 3,
          crop: 4,
          rotate: 5,
          thumbnail: 7,
          interlace: 9
        },
        i = {
          0: "stripmeta",
          1: "type",
          2: "blur",
          3: "quality",
          4: "crop",
          5: "rotate",
          6: "pixel",
          7: "thumbnail",
          8: "watermark",
          9: "interlace",
          10: "tmp"
        };

      function o(e) {
        r.verifyOptions(e, "type", "image::ImageOp"), r.verifyParamValid("type", e.type, o.validTypes,
          "image::ImageOp"), r.merge(this, e), this.type = s[e.type]
      }
      o.validTypes = Object.keys(s), o.reverse = function(e) {
        var t = r.copy(e);
        return t.type = i[t.type], t
      }, o.reverseImageOps = function(e) {
        return e.map(function(e) {
          return o.reverse(e)
        })
      }, e.exports = o
    }, function(e, t, n) {
      "use strict";
      var r = n(0),
        s = {
          fromDataURL: function(e) {
            var t = r.getGlobal(),
              n = void 0;
            n = e.split(",")[0].indexOf("base64") >= 0 ? t.atob(e.split(",")[1]) : t.decodeURIComponent(e.split(
              ",")[1]);
            for (var s = e.split(",")[0].split(":")[1].split(";")[0], i = new Uint8Array(n.length), o = 0; o <
              n.length; o++) i[o] = n.charCodeAt(o);
            return new t.Blob([i], {
              type: s
            })
          }
        };
      e.exports = s
    }, function(e, t, n) {
      "use strict";
      var r = n(0),
        s = {
          file: {
            md5: "$(Etag)",
            size: "$(ObjectSize)"
          },
          image: {
            md5: "$(Etag)",
            size: "$(ObjectSize)",
            w: "$(ImageInfo.Width)",
            h: "$(ImageInfo.Height)",
            orientation: "$(ImageInfo.Orientation)"
          },
          audio: {
            md5: "$(Etag)",
            size: "$(ObjectSize)",
            dur: "$(AVinfo.Audio.Duration)"
          },
          video: {
            md5: "$(Etag)",
            size: "$(ObjectSize)",
            dur: "$(AVinfo.Video.Duration)",
            w: "$(AVinfo.Video.Width)",
            h: "$(AVinfo.Video.Height)"
          }
        },
        i = {
          genResponseBody: function(e) {
            return s[e = e || "file"]
          },
          parseResponse: function(e, t) {
            r.notundef(e.size) && (e.size = +e.size), r.notundef(e.w) && (e.w = +e.w), r.notundef(e.h) && (e.h = +
              e.h), r.notundef(e.dur) && (e.dur = +e.dur);
            var n = e.orientation;
            if (r.notundef(n) && (delete e.orientation, t && ("right, top" === n || "left, bottom" === n))) {
              var s = e.w;
              e.w = e.h, e.h = s
            }
            return e
          }
        };
      e.exports = i
    }, , , , , , , , , , , function(e, t, n) {
      "use strict";
      var r = n(67),
        s = n(0),
        i = s.notundef,
        o = {
          "-2": "unset",
          "-1": "restricted",
          0: "common",
          1: "owner",
          2: "manager",
          3: "guest",
          4: "anonymous"
        };

      function a(e) {
        i(e.nick) && (this.nick = "" + e.nick), i(e.avatar) && (this.avatar = "" + e.avatar), i(e.custom) && (
          this.custom = "" + e.custom)
      }
      a.reverse = function(e) {
        var t = s.copy(e);
        return i(t.chatroomId) && (t.chatroomId = "" + t.chatroomId), i(t.avatar) && (t.avatar = (0, r.genPrivateUrl)
            (t.avatar)), i(t.type) && (t.type = o[t.type]), i(t.level) && (t.level = +t.level), i(t.online) &&
          (t.online = 1 == +t.online), i(t.enterTime) && (t.enterTime = +t.enterTime), i(t.guest) && (t.guest =
            1 == +t.guest), i(t.blacked) && (t.blacked = 1 == +t.blacked), i(t.gaged) && (t.gaged = 1 == +t.gaged),
          i(t.valid) && (t.valid = 1 == +t.valid), i(t.updateTime) && (t.updateTime = +t.updateTime), i(t.tempMuted) ?
          t.tempMuted = 1 == +t.tempMuted : t.tempMuted = !1, i(t.tempMuteDuration) ? t.tempMuteDuration = +t.tempMuteDuration :
          t.tempMuteDuration = 0, t.online || delete t.enterTime, t.guest && (t.type = "guest", delete t.valid),
          "common" !== t.type && delete t.level, delete t.guest, t
      }, a.reverseMembers = function(e) {
        return e.map(function(e) {
          return a.reverse(e)
        })
      }, a.validTypes = Object.keys(o), a.typeReverseMap = o, e.exports = a
    }, function(e, t, n) {
      "use strict";
      var r = n(22),
        s = n(282),
        i = n(152),
        o = n(73),
        a = n(68),
        c = n(0),
        u = n(172),
        l = n(155),
        m = n(36),
        d = n(276),
        p = n(275);
      e.exports = function(e) {
        c.merge(e, {
          platform: r,
          xhr: s,
          io: i,
          naturalSort: o,
          deepAccess: a,
          util: c,
          support: u,
          blob: l,
          ajax: m,
          LoggerPlugin: d,
          usePlugin: p
        })
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(0),
        s = n(79),
        i = r.merge({}, s.idMap, {
          auth: {
            id: 2,
            login: 3,
            kicked: 5,
            logout: 6,
            multiPortLogin: 7,
            kick: 8
          },
          user: {
            id: 3,
            updatePushToken: 1,
            appBackground: 2,
            markInBlacklist: 3,
            getBlacklist: 4,
            markInMutelist: 5,
            getMutelist: 6,
            getRelations: 8,
            getUsers: 7,
            updateMyInfo: 10,
            updateDonnop: 15,
            syncMyInfo: 109,
            syncUpdateMyInfo: 110
          },
          notify: {
            id: 4,
            markRead: 3,
            syncOfflineMsgs: 4,
            batchMarkRead: 5,
            syncOfflineSysMsgs: 6,
            syncRoamingMsgs: 9,
            syncMsgReceipts: 12,
            syncRobots: 15,
            syncBroadcastMsgs: 16
          },
          sync: {
            id: 5,
            sync: 1,
            syncTeamMembers: 2
          },
          msg: {
            id: 7,
            sendMsg: 1,
            msg: 2,
            sysMsg: 3,
            getHistoryMsgs: 6,
            sendCustomSysMsg: 7,
            searchHistoryMsgs: 8,
            deleteSessions: 9,
            getSessions: 10,
            syncSendMsg: 101,
            sendMsgReceipt: 11,
            msgReceipt: 12,
            deleteMsg: 13,
            msgDeleted: 14,
            markSessionAck: 16,
            broadcastMsg: 17
          },
          team: {
            id: 8,
            createTeam: 1,
            sendTeamMsg: 2,
            teamMsg: 3,
            teamMsgs: 4,
            addTeamMembers: 5,
            removeTeamMembers: 6,
            updateTeam: 7,
            leaveTeam: 8,
            getTeam: 9,
            getTeams: 10,
            getTeamMembers: 11,
            dismissTeam: 12,
            applyTeam: 13,
            passTeamApply: 14,
            rejectTeamApply: 15,
            addTeamManagers: 16,
            removeTeamManagers: 17,
            transferTeam: 18,
            updateInfoInTeam: 19,
            updateNickInTeam: 20,
            acceptTeamInvite: 21,
            rejectTeamInvite: 22,
            getTeamHistoryMsgs: 23,
            searchTeamHistoryMsgs: 24,
            updateMuteStateInTeam: 25,
            getMyTeamMembers: 26,
            getMutedTeamMembers: 27,
            sendTeamMsgReceipt: 28,
            getTeamMsgReads: 29,
            getTeamMsgReadAccounts: 30,
            notifyTeamMsgReads: 31,
            muteTeamAll: 32,
            syncMyTeamMembers: 126,
            syncTeams: 109,
            syncTeamMembers: 111,
            syncCreateTeam: 101,
            syncSendTeamMsg: 102,
            syncUpdateTeamMember: 119
          },
          friend: {
            id: 12,
            friendRequest: 1,
            syncFriendRequest: 101,
            deleteFriend: 2,
            syncDeleteFriend: 102,
            updateFriend: 3,
            syncUpdateFriend: 103,
            getFriends: 4
          },
          chatroom: {
            id: 13,
            getChatroomAddress: 1
          },
          filter: {
            id: 101,
            sendFilterMsg: 1,
            filterMsg: 2,
            filterSysMsg: 3,
            sendFilterCustomSysMsg: 7
          },
          eventService: {
            id: 14,
            publishEvent: 1,
            pushEvent: 2,
            subscribeEvent: 3,
            unSubscribeEventsByAccounts: 4,
            unSubscribeEventsByType: 5,
            querySubscribeEventsByAccounts: 6,
            querySubscribeEventsByType: 7,
            pushEvents: 9
          }
        }),
        o = r.merge({}, s.cmdConfig, {
          login: {
            sid: i.auth.id,
            cid: i.auth.login,
            params: [{
              type: "Property",
              name: "login"
            }]
          },
          logout: {
            sid: i.auth.id,
            cid: i.auth.logout
          },
          kick: {
            sid: i.auth.id,
            cid: i.auth.kick,
            params: [{
              type: "StrArray",
              name: "deviceIds"
            }]
          },
          updatePushToken: {
            sid: i.user.id,
            cid: i.user.updatePushToken,
            params: [{
              type: "String",
              name: "tokenName"
            }, {
              type: "String",
              name: "token"
            }, {
              type: "int",
              name: "pushkit"
            }]
          },
          appBackground: {
            sid: i.user.id,
            cid: i.user.appBackground,
            params: [{
              type: "bool",
              name: "isBackground"
            }, {
              type: "Int",
              name: "badge"
            }]
          },
          markInBlacklist: {
            sid: i.user.id,
            cid: i.user.markInBlacklist,
            params: [{
              type: "String",
              name: "account"
            }, {
              type: "bool",
              name: "isAdd"
            }]
          },
          getBlacklist: {
            sid: i.user.id,
            cid: i.user.getBlacklist,
            params: [{
              type: "long",
              name: "time"
            }]
          },
          markInMutelist: {
            sid: i.user.id,
            cid: i.user.markInMutelist,
            params: [{
              type: "String",
              name: "account"
            }, {
              type: "bool",
              name: "isAdd"
            }]
          },
          getMutelist: {
            sid: i.user.id,
            cid: i.user.getMutelist,
            params: [{
              type: "long",
              name: "time"
            }]
          },
          getRelations: {
            sid: i.user.id,
            cid: i.user.getRelations,
            params: [{
              type: "long",
              name: "timetag"
            }]
          },
          getUsers: {
            sid: i.user.id,
            cid: i.user.getUsers,
            params: [{
              type: "StrArray",
              name: "accounts"
            }]
          },
          updateMyInfo: {
            sid: i.user.id,
            cid: i.user.updateMyInfo,
            params: [{
              type: "Property",
              name: "user"
            }]
          },
          updateDonnop: {
            sid: i.user.id,
            cid: i.user.updateDonnop,
            params: [{
              type: "Property",
              name: "donnop"
            }]
          },
          markRead: {
            sid: i.notify.id,
            cid: i.notify.markRead,
            params: [{
              type: "long",
              name: "id"
            }, {
              type: "ph",
              name: "ph"
            }]
          },
          batchMarkRead: {
            sid: i.notify.id,
            cid: i.notify.batchMarkRead,
            params: [{
              type: "byte",
              name: "sid"
            }, {
              type: "byte",
              name: "cid"
            }, {
              type: "LongArray",
              name: "ids"
            }]
          },
          sync: {
            sid: i.sync.id,
            cid: i.sync.sync,
            params: [{
              type: "Property",
              name: "sync"
            }]
          },
          syncTeamMembers: {
            sid: i.sync.id,
            cid: i.sync.syncTeamMembers,
            params: [{
              type: "LongLongMap",
              name: "sync"
            }]
          },
          sendMsg: {
            sid: i.msg.id,
            cid: i.msg.sendMsg,
            params: [{
              type: "Property",
              name: "msg"
            }]
          },
          getHistoryMsgs: {
            sid: i.msg.id,
            cid: i.msg.getHistoryMsgs,
            params: [{
              type: "String",
              name: "to"
            }, {
              type: "long",
              name: "beginTime"
            }, {
              type: "long",
              name: "endTime"
            }, {
              type: "long",
              name: "lastMsgId"
            }, {
              type: "int",
              name: "limit"
            }, {
              type: "bool",
              name: "reverse"
            }, {
              type: "LongArray",
              name: "msgTypes"
            }]
          },
          sendCustomSysMsg: {
            sid: i.msg.id,
            cid: i.msg.sendCustomSysMsg,
            params: [{
              type: "Property",
              name: "sysMsg"
            }]
          },
          searchHistoryMsgs: {
            sid: i.msg.id,
            cid: i.msg.searchHistoryMsgs,
            params: [{
              type: "String",
              name: "to"
            }, {
              type: "long",
              name: "beginTime"
            }, {
              type: "long",
              name: "endTime"
            }, {
              type: "String",
              name: "keyword"
            }, {
              type: "int",
              name: "limit"
            }, {
              type: "bool",
              name: "reverse"
            }]
          },
          getSessions: {
            sid: i.msg.id,
            cid: i.msg.getSessions,
            params: [{
              type: "long",
              name: "time"
            }]
          },
          deleteSessions: {
            sid: i.msg.id,
            cid: i.msg.deleteSessions,
            params: [{
              type: "StrArray",
              name: "sessions"
            }]
          },
          sendMsgReceipt: {
            sid: i.msg.id,
            cid: i.msg.sendMsgReceipt,
            params: [{
              type: "Property",
              name: "msgReceipt"
            }]
          },
          deleteMsg: {
            sid: i.msg.id,
            cid: i.msg.deleteMsg,
            params: [{
              type: "Property",
              name: "sysMsg"
            }]
          },
          markSessionAck: {
            sid: i.msg.id,
            cid: i.msg.markSessionAck,
            params: [{
              type: "byte",
              name: "scene"
            }, {
              type: "String",
              name: "to"
            }, {
              type: "long",
              name: "timetag"
            }]
          },
          createTeam: {
            sid: i.team.id,
            cid: i.team.createTeam,
            params: [{
              type: "Property",
              name: "team"
            }, {
              type: "StrArray",
              name: "accounts"
            }, {
              type: "String",
              name: "ps"
            }]
          },
          sendTeamMsg: {
            sid: i.team.id,
            cid: i.team.sendTeamMsg,
            params: [{
              type: "Property",
              name: "msg"
            }]
          },
          addTeamMembers: {
            sid: i.team.id,
            cid: i.team.addTeamMembers,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "StrArray",
              name: "accounts"
            }, {
              type: "String",
              name: "ps"
            }, {
              type: "String",
              name: "attach"
            }]
          },
          removeTeamMembers: {
            sid: i.team.id,
            cid: i.team.removeTeamMembers,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "StrArray",
              name: "accounts"
            }]
          },
          updateTeam: {
            sid: i.team.id,
            cid: i.team.updateTeam,
            params: [{
              type: "Property",
              name: "team"
            }]
          },
          leaveTeam: {
            sid: i.team.id,
            cid: i.team.leaveTeam,
            params: [{
              type: "long",
              name: "teamId"
            }]
          },
          getTeam: {
            sid: i.team.id,
            cid: i.team.getTeam,
            params: [{
              type: "long",
              name: "teamId"
            }]
          },
          getTeams: {
            sid: i.team.id,
            cid: i.team.getTeams,
            params: [{
              type: "long",
              name: "timetag"
            }]
          },
          getTeamMembers: {
            sid: i.team.id,
            cid: i.team.getTeamMembers,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "long",
              name: "timetag"
            }]
          },
          dismissTeam: {
            sid: i.team.id,
            cid: i.team.dismissTeam,
            params: [{
              type: "long",
              name: "teamId"
            }]
          },
          applyTeam: {
            sid: i.team.id,
            cid: i.team.applyTeam,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "String",
              name: "ps"
            }]
          },
          passTeamApply: {
            sid: i.team.id,
            cid: i.team.passTeamApply,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "String",
              name: "from"
            }]
          },
          rejectTeamApply: {
            sid: i.team.id,
            cid: i.team.rejectTeamApply,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "String",
              name: "from"
            }, {
              type: "String",
              name: "ps"
            }]
          },
          addTeamManagers: {
            sid: i.team.id,
            cid: i.team.addTeamManagers,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "StrArray",
              name: "accounts"
            }]
          },
          removeTeamManagers: {
            sid: i.team.id,
            cid: i.team.removeTeamManagers,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "StrArray",
              name: "accounts"
            }]
          },
          transferTeam: {
            sid: i.team.id,
            cid: i.team.transferTeam,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "String",
              name: "account"
            }, {
              type: "bool",
              name: "leave"
            }]
          },
          updateInfoInTeam: {
            sid: i.team.id,
            cid: i.team.updateInfoInTeam,
            params: [{
              type: "Property",
              name: "teamMember"
            }]
          },
          updateNickInTeam: {
            sid: i.team.id,
            cid: i.team.updateNickInTeam,
            params: [{
              type: "Property",
              name: "teamMember"
            }]
          },
          acceptTeamInvite: {
            sid: i.team.id,
            cid: i.team.acceptTeamInvite,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "String",
              name: "from"
            }]
          },
          rejectTeamInvite: {
            sid: i.team.id,
            cid: i.team.rejectTeamInvite,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "String",
              name: "from"
            }, {
              type: "String",
              name: "ps"
            }]
          },
          getTeamHistoryMsgs: {
            sid: i.team.id,
            cid: i.team.getTeamHistoryMsgs,
            params: [{
              type: "long",
              name: "to"
            }, {
              type: "long",
              name: "beginTime"
            }, {
              type: "long",
              name: "endTime"
            }, {
              type: "long",
              name: "lastMsgId"
            }, {
              type: "int",
              name: "limit"
            }, {
              type: "bool",
              name: "reverse"
            }, {
              type: "LongArray",
              name: "msgTypes"
            }]
          },
          searchTeamHistoryMsgs: {
            sid: i.team.id,
            cid: i.team.searchTeamHistoryMsgs,
            params: [{
              type: "long",
              name: "to"
            }, {
              type: "long",
              name: "beginTime"
            }, {
              type: "long",
              name: "endTime"
            }, {
              type: "String",
              name: "keyword"
            }, {
              type: "int",
              name: "limit"
            }, {
              type: "bool",
              name: "reverse"
            }]
          },
          updateMuteStateInTeam: {
            sid: i.team.id,
            cid: i.team.updateMuteStateInTeam,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "String",
              name: "account"
            }, {
              type: "int",
              name: "mute"
            }]
          },
          getMyTeamMembers: {
            sid: i.team.id,
            cid: i.team.getMyTeamMembers,
            params: [{
              type: "LongArray",
              name: "teamIds"
            }]
          },
          getMutedTeamMembers: {
            sid: i.team.id,
            cid: i.team.getMutedTeamMembers,
            params: [{
              type: "long",
              name: "teamId"
            }]
          },
          sendTeamMsgReceipt: {
            sid: i.team.id,
            cid: i.team.sendTeamMsgReceipt,
            params: [{
              type: "PropertyArray",
              name: "teamMsgReceipts",
              entity: "teamMsgReceipt"
            }]
          },
          getTeamMsgReads: {
            sid: i.team.id,
            cid: i.team.getTeamMsgReads,
            params: [{
              type: "PropertyArray",
              name: "teamMsgReceipts",
              entity: "teamMsgReceipt"
            }]
          },
          getTeamMsgReadAccounts: {
            sid: i.team.id,
            cid: i.team.getTeamMsgReadAccounts,
            params: [{
              type: "Property",
              name: "teamMsgReceipt"
            }]
          },
          muteTeamAll: {
            sid: i.team.id,
            cid: i.team.muteTeamAll,
            params: [{
              type: "long",
              name: "teamId"
            }, {
              type: "int",
              name: "muteType"
            }]
          },
          friendRequest: {
            sid: i.friend.id,
            cid: i.friend.friendRequest,
            params: [{
              type: "String",
              name: "account"
            }, {
              type: "byte",
              name: "type"
            }, {
              type: "String",
              name: "ps"
            }]
          },
          deleteFriend: {
            sid: i.friend.id,
            cid: i.friend.deleteFriend,
            params: [{
              type: "String",
              name: "account"
            }]
          },
          updateFriend: {
            sid: i.friend.id,
            cid: i.friend.updateFriend,
            params: [{
              type: "Property",
              name: "friend"
            }]
          },
          getFriends: {
            sid: i.friend.id,
            cid: i.friend.getFriends,
            params: [{
              type: "long",
              name: "timetag"
            }]
          },
          getChatroomAddress: {
            sid: i.chatroom.id,
            cid: i.chatroom.getChatroomAddress,
            params: [{
              type: "long",
              name: "chatroomId"
            }, {
              type: "bool",
              name: "isWeixinApp"
            }]
          },
          sendFilterMsg: {
            sid: i.filter.id,
            cid: i.filter.sendFilterMsg,
            params: [{
              type: "Property",
              name: "msg"
            }]
          },
          sendFilterCustomSysMsg: {
            sid: i.filter.id,
            cid: i.filter.sendFilterCustomSysMsg,
            params: [{
              type: "Property",
              name: "sysMsg"
            }]
          },
          publishEvent: {
            sid: i.eventService.id,
            cid: i.eventService.publishEvent,
            params: [{
              type: "Property",
              name: "msgEvent"
            }]
          },
          pushEvent: {
            sid: i.eventService.id,
            cid: i.eventService.pushEvent
          },
          subscribeEvent: {
            sid: i.eventService.id,
            cid: i.eventService.subscribeEvent,
            params: [{
              type: "Property",
              name: "msgEventSubscribe"
            }, {
              type: "StrArray",
              name: "accounts"
            }]
          },
          unSubscribeEventsByAccounts: {
            sid: i.eventService.id,
            cid: i.eventService.unSubscribeEventsByAccounts,
            params: [{
              type: "Property",
              name: "msgEventSubscribe"
            }, {
              type: "StrArray",
              name: "accounts"
            }]
          },
          unSubscribeEventsByType: {
            sid: i.eventService.id,
            cid: i.eventService.unSubscribeEventsByType,
            params: [{
              type: "Property",
              name: "msgEventSubscribe"
            }]
          },
          querySubscribeEventsByAccounts: {
            sid: i.eventService.id,
            cid: i.eventService.querySubscribeEventsByAccounts,
            params: [{
              type: "Property",
              name: "msgEventSubscribe"
            }, {
              type: "StrArray",
              name: "accounts"
            }]
          },
          querySubscribeEventsByType: {
            sid: i.eventService.id,
            cid: i.eventService.querySubscribeEventsByType,
            params: [{
              type: "Property",
              name: "msgEventSubscribe"
            }]
          },
          pushEvents: {
            sid: i.eventService.id,
            cid: i.eventService.pushEvents
          }
        }),
        a = r.merge({}, s.packetConfig, {
          "2_3": {
            service: "auth",
            cmd: "login",
            response: [{
              type: "Property",
              name: "loginRes"
            }, {
              type: "PropertyArray",
              name: "loginPorts",
              entity: "loginPort"
            }, {
              type: "Property",
              name: "aosPushInfo"
            }]
          },
          "2_5": {
            service: "auth",
            cmd: "kicked",
            response: [{
              type: "Number",
              name: "from"
            }, {
              type: "Number",
              name: "reason"
            }]
          },
          "2_6": {
            service: "auth",
            cmd: "logout"
          },
          "2_7": {
            service: "auth",
            cmd: "multiPortLogin",
            response: [{
              type: "Number",
              name: "state"
            }, {
              type: "PropertyArray",
              name: "loginPorts",
              entity: "loginPort"
            }]
          },
          "2_8": {
            service: "auth",
            cmd: "kick",
            response: [{
              type: "StrArray",
              name: "deviceIds"
            }]
          },
          "3_1": {
            service: "user",
            cmd: "updatePushToken"
          },
          "3_2": {
            service: "user",
            cmd: "appBackground"
          },
          "3_3": {
            service: "user",
            cmd: "markInBlacklist"
          },
          "3_103": {
            service: "user",
            cmd: "syncMarkInBlacklist",
            response: [{
              type: "String",
              name: "account"
            }, {
              type: "Boolean",
              name: "isAdd"
            }]
          },
          "3_4": {
            service: "user",
            cmd: "getBlacklist",
            response: [{
              type: "StrArray",
              name: "blacklist"
            }]
          },
          "3_5": {
            service: "user",
            cmd: "markInMutelist"
          },
          "3_105": {
            service: "user",
            cmd: "syncMarkInMutelist",
            response: [{
              type: "String",
              name: "account"
            }, {
              type: "Boolean",
              name: "isAdd"
            }]
          },
          "3_6": {
            service: "user",
            cmd: "getMutelist",
            response: [{
              type: "StrArray",
              name: "mutelist"
            }]
          },
          "3_8": {
            service: "user",
            cmd: "getRelations",
            response: [{
              type: "PropertyArray",
              name: "specialRelations",
              entity: "specialRelation"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "3_7": {
            service: "user",
            cmd: "getUsers",
            response: [{
              type: "PropertyArray",
              name: "users",
              entity: "user"
            }]
          },
          "3_10": {
            service: "user",
            cmd: "updateMyInfo",
            response: [{
              type: "Number",
              name: "timetag"
            }]
          },
          "3_15": {
            service: "user",
            cmd: "updateDonnop",
            response: [{
              type: "Number",
              name: "timetag"
            }]
          },
          "3_115": {
            service: "user",
            cmd: "syncUpdateDonnop",
            response: [{
              type: "Property",
              name: "donnop"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "3_109": {
            service: "user",
            cmd: "syncMyInfo",
            response: [{
              type: "Property",
              name: "user"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "3_110": {
            service: "user",
            cmd: "syncUpdateMyInfo",
            response: [{
              type: "Property",
              name: "user"
            }]
          },
          "4_1": {
            service: "notify"
          },
          "4_2": {
            service: "notify"
          },
          "4_3": {
            service: "notify",
            cmd: "markRead"
          },
          "4_4": {
            service: "notify",
            cmd: "syncOfflineMsgs",
            response: [{
              type: "PropertyArray",
              name: "msgs",
              entity: "msg"
            }]
          },
          "4_5": {
            service: "notify",
            cmd: "batchMarkRead"
          },
          "4_6": {
            service: "notify",
            cmd: "syncOfflineSysMsgs",
            response: [{
              type: "PropertyArray",
              name: "sysMsgs",
              entity: "sysMsg"
            }]
          },
          "4_9": {
            service: "notify",
            cmd: "syncRoamingMsgs",
            response: [{
              type: "PropertyArray",
              name: "msgs",
              entity: "msg"
            }]
          },
          "4_12": {
            service: "notify",
            cmd: "syncMsgReceipts",
            response: [{
              type: "PropertyArray",
              name: "msgReceipts",
              entity: "msgReceipt"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "4_13": {
            service: "notify",
            cmd: "syncDonnop",
            response: [{
              type: "Property",
              name: "donnop"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "4_14": {
            service: "notify",
            cmd: "syncSessionAck",
            response: [{
              type: "StrLongMap",
              name: "p2p"
            }, {
              type: "LongLongMap",
              name: "team"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "4_15": {
            service: "notify",
            cmd: "syncRobots",
            response: [{
              type: "PropertyArray",
              name: "robots",
              entity: "robot"
            }]
          },
          "4_16": {
            service: "notify",
            cmd: "syncBroadcastMsgs",
            response: [{
              type: "PropertyArray",
              name: "broadcastMsgs",
              entity: "broadcastMsg"
            }]
          },
          "4_100": {
            service: "notify",
            cmd: "syncOfflineFilterMsgs",
            response: [{
              type: "PropertyArray",
              name: "msgs",
              entity: "msg"
            }]
          },
          "4_101": {
            service: "notify",
            cmd: "syncOfflineFilterSysMsgs",
            response: [{
              type: "PropertyArray",
              name: "sysMsgs",
              entity: "sysMsg"
            }]
          },
          "5_1": {
            service: "sync",
            cmd: "syncDone",
            response: [{
              type: "Number",
              name: "timetag"
            }]
          },
          "5_2": {
            service: "sync",
            cmd: "syncTeamMembersDone",
            response: [{
              type: "Number",
              name: "timetag"
            }]
          },
          "7_1": {
            service: "msg",
            cmd: "sendMsg",
            response: [{
              type: "Property",
              name: "msg"
            }],
            trivialErrorCodes: [7101]
          },
          "7_2": {
            service: "msg",
            cmd: "msg",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "7_3": {
            service: "msg",
            cmd: "sysMsg",
            response: [{
              type: "Property",
              name: "sysMsg"
            }]
          },
          "7_6": {
            service: "msg",
            cmd: "getHistoryMsgs",
            response: [{
              type: "PropertyArray",
              name: "msgs",
              entity: "msg"
            }]
          },
          "7_7": {
            service: "msg",
            cmd: "sendCustomSysMsg",
            trivialErrorCodes: [7101]
          },
          "7_8": {
            service: "msg",
            cmd: "searchHistoryMsgs",
            response: [{
              type: "PropertyArray",
              name: "msgs",
              entity: "msg"
            }]
          },
          "7_9": {
            service: "msg",
            cmd: "deleteSessions"
          },
          "7_10": {
            service: "msg",
            cmd: "getSessions",
            response: [{
              type: "StrArray",
              name: "sessions"
            }]
          },
          "7_101": {
            service: "msg",
            cmd: "syncSendMsg",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "7_11": {
            service: "msg",
            cmd: "sendMsgReceipt",
            response: [{
              type: "Property",
              name: "msgReceipt"
            }]
          },
          "7_12": {
            service: "msg",
            cmd: "msgReceipt",
            response: [{
              type: "Property",
              name: "msgReceipt"
            }]
          },
          "7_13": {
            service: "msg",
            cmd: "onDeleteMsg"
          },
          "7_14": {
            service: "msg",
            cmd: "onMsgDeleted",
            response: [{
              type: "Property",
              name: "sysMsg"
            }]
          },
          "7_15": {
            service: "msg",
            cmd: "onDeleteMsgOfflineRoaming",
            response: [{
              type: "PropertyArray",
              name: "sysMsgs",
              entity: "sysMsg"
            }, {
              type: "Number",
              name: "timetag"
            }, {
              type: "Number",
              name: "type"
            }]
          },
          "7_16": {
            service: "msg",
            cmd: "onMarkSessionAck"
          },
          "7_17": {
            service: "msg",
            cmd: "broadcastMsg",
            response: [{
              type: "Property",
              name: "broadcastMsg"
            }]
          },
          "7_116": {
            service: "msg",
            cmd: "syncMarkSessionAck",
            response: [{
              type: "Number",
              name: "scene"
            }, {
              type: "String",
              name: "to"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "8_1": {
            service: "team",
            cmd: "createTeam",
            response: [{
              type: "Property",
              name: "team"
            }, {
              type: "StrArray",
              name: "abortedAccidList"
            }]
          },
          "8_2": {
            service: "team",
            cmd: "sendTeamMsg",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "8_3": {
            service: "team",
            cmd: "teamMsg",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "8_4": {
            service: "team",
            cmd: "teamMsgs",
            response: [{
              type: "PropertyArray",
              name: "msgs",
              entity: "msg"
            }]
          },
          "8_5": {
            service: "team",
            cmd: "addTeamMembers",
            response: [{
              type: "long",
              name: "time"
            }, {
              type: "StrArray",
              name: "abortedAccidList"
            }]
          },
          "8_6": {
            service: "team",
            cmd: "removeTeamMembers"
          },
          "8_7": {
            service: "team",
            cmd: "updateTeam",
            response: [{
              type: "Number",
              name: "id"
            }, {
              type: "Number",
              name: "time"
            }]
          },
          "8_8": {
            service: "team",
            cmd: "leaveTeam"
          },
          "8_9": {
            service: "team",
            cmd: "getTeam",
            response: [{
              type: "Property",
              name: "team"
            }]
          },
          "8_10": {
            service: "team",
            cmd: "getTeams",
            response: [{
              type: "PropertyArray",
              name: "teams",
              entity: "team"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "8_11": {
            service: "team",
            cmd: "getTeamMembers",
            response: [{
              type: "Number",
              name: "teamId"
            }, {
              type: "PropertyArray",
              name: "members",
              entity: "teamMember"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "8_12": {
            service: "team",
            cmd: "dismissTeam"
          },
          "8_13": {
            service: "team",
            cmd: "applyTeam",
            response: [{
              type: "Property",
              name: "team"
            }]
          },
          "8_14": {
            service: "team",
            cmd: "passTeamApply"
          },
          "8_15": {
            service: "team",
            cmd: "rejectTeamApply"
          },
          "8_16": {
            service: "team",
            cmd: "addTeamManagers"
          },
          "8_17": {
            service: "team",
            cmd: "removeTeamManagers"
          },
          "8_18": {
            service: "team",
            cmd: "transferTeam"
          },
          "8_19": {
            service: "team",
            cmd: "updateInfoInTeam"
          },
          "8_20": {
            service: "team",
            cmd: "updateNickInTeam"
          },
          "8_21": {
            service: "team",
            cmd: "acceptTeamInvite",
            response: [{
              type: "Property",
              name: "team"
            }]
          },
          "8_22": {
            service: "team",
            cmd: "rejectTeamInvite"
          },
          "8_23": {
            service: "team",
            cmd: "getTeamHistoryMsgs",
            response: [{
              type: "PropertyArray",
              name: "msgs",
              entity: "msg"
            }]
          },
          "8_24": {
            service: "team",
            cmd: "searchTeamHistoryMsgs",
            response: [{
              type: "PropertyArray",
              name: "msgs",
              entity: "msg"
            }]
          },
          "8_25": {
            service: "team",
            cmd: "updateMuteStateInTeam"
          },
          "8_26": {
            service: "team",
            cmd: "getMyTeamMembers",
            response: [{
              type: "PropertyArray",
              name: "teamMembers",
              entity: "teamMember"
            }]
          },
          "8_27": {
            service: "team",
            cmd: "getMutedTeamMembers",
            response: [{
              type: "Number",
              name: "teamId"
            }, {
              type: "PropertyArray",
              name: "teamMembers",
              entity: "teamMember"
            }]
          },
          "8_28": {
            service: "team",
            cmd: "sendTeamMsgReceipt",
            response: [{
              type: "PropertyArray",
              name: "teamMsgReceipts",
              entity: "teamMsgReceipt"
            }]
          },
          "8_29": {
            service: "team",
            cmd: "getTeamMsgReads",
            response: [{
              type: "PropertyArray",
              name: "teamMsgReceipts",
              entity: "teamMsgReceipt"
            }]
          },
          "8_30": {
            service: "team",
            cmd: "getTeamMsgReadAccounts",
            response: [{
              type: "String",
              name: "idClient"
            }, {
              type: "StrArray",
              name: "readAccounts"
            }, {
              type: "StrArray",
              name: "unreadAccounts"
            }]
          },
          "8_31": {
            service: "team",
            cmd: "notifyTeamMsgReads",
            response: [{
              type: "PropertyArray",
              name: "teamMsgReceipts",
              entity: "teamMsgReceipt"
            }]
          },
          "8_32": {
            service: "team",
            cmd: "muteTeamAll",
            response: []
          },
          "8_126": {
            service: "team",
            cmd: "syncMyTeamMembers",
            response: [{
              type: "PropertyArray",
              name: "teamMembers",
              entity: "teamMember"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "8_109": {
            service: "team",
            cmd: "syncTeams",
            response: [{
              type: "Number",
              name: "timetag"
            }, {
              type: "PropertyArray",
              name: "teams",
              entity: "team"
            }]
          },
          "8_111": {
            service: "team",
            cmd: "syncTeamMembers",
            response: [{
              type: "Number",
              name: "teamId"
            }, {
              type: "PropertyArray",
              name: "members",
              entity: "teamMember"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "8_101": {
            service: "team",
            cmd: "syncCreateTeam",
            response: [{
              type: "Property",
              name: "team"
            }]
          },
          "8_102": {
            service: "team",
            cmd: "syncSendTeamMsg",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "8_119": {
            service: "team",
            cmd: "syncUpdateTeamMember",
            response: [{
              type: "Property",
              name: "teamMember"
            }]
          },
          "12_1": {
            service: "friend",
            cmd: "friendRequest"
          },
          "12_101": {
            service: "friend",
            cmd: "syncFriendRequest",
            response: [{
              type: "String",
              name: "account"
            }, {
              type: "Number",
              name: "type"
            }, {
              type: "String",
              name: "ps"
            }]
          },
          "12_2": {
            service: "friend",
            cmd: "deleteFriend"
          },
          "12_102": {
            service: "friend",
            cmd: "syncDeleteFriend",
            response: [{
              type: "String",
              name: "account"
            }]
          },
          "12_3": {
            service: "friend",
            cmd: "updateFriend"
          },
          "12_103": {
            service: "friend",
            cmd: "syncUpdateFriend",
            response: [{
              type: "Property",
              name: "friend"
            }]
          },
          "12_4": {
            service: "friend",
            cmd: "getFriends",
            response: [{
              type: "PropertyArray",
              name: "friends",
              entity: "friend"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "12_5": {
            service: "friend",
            cmd: "syncFriends",
            response: [{
              type: "PropertyArray",
              name: "friends",
              entity: "friend"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "12_6": {
            service: "friend",
            cmd: "syncFriendUsers",
            response: [{
              type: "PropertyArray",
              name: "users",
              entity: "user"
            }, {
              type: "Number",
              name: "timetag"
            }]
          },
          "13_1": {
            service: "chatroom",
            cmd: "getChatroomAddress",
            response: [{
              type: "StrArray",
              name: "address"
            }]
          },
          "14_1": {
            service: "eventService",
            cmd: "publishEvent",
            response: [{
              type: "Property",
              name: "msgEvent"
            }]
          },
          "14_2": {
            service: "eventService",
            cmd: "pushEvent",
            response: [{
              type: "Property",
              name: "msgEvent"
            }]
          },
          "14_3": {
            service: "eventService",
            cmd: "subscribeEvent",
            response: [{
              type: "StrArray",
              name: "accounts"
            }]
          },
          "14_4": {
            service: "eventService",
            cmd: "unSubscribeEventsByAccounts",
            response: [{
              type: "StrArray",
              name: "accounts"
            }]
          },
          "14_5": {
            service: "eventService",
            cmd: "unSubscribeEventsByType"
          },
          "14_6": {
            service: "eventService",
            cmd: "querySubscribeEventsByAccounts",
            response: [{
              type: "PropertyArray",
              name: "msgEventSubscribes",
              entity: "msgEventSubscribe"
            }]
          },
          "14_7": {
            service: "eventService",
            cmd: "querySubscribeEventsByType",
            response: [{
              type: "PropertyArray",
              name: "msgEventSubscribes",
              entity: "msgEventSubscribe"
            }]
          },
          "14_9": {
            service: "eventService",
            cmd: "pushEvents",
            response: [{
              type: "PropertyArray",
              name: "msgEvents",
              entity: "msgEvent"
            }]
          },
          "101_1": {
            service: "filter",
            cmd: "sendFilterMsg",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "101_2": {
            service: "filter",
            cmd: "filterMsg",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "101_3": {
            service: "filter",
            cmd: "filterSysMsg",
            response: [{
              type: "Property",
              name: "sysMsg"
            }]
          },
          "101_7": {
            service: "filter",
            cmd: "sendFilterCustomSysMsg"
          }
        });
      e.exports = {
        idMap: i,
        cmdConfig: o,
        packetConfig: a
      }
    }, function(e, t, n) {
      "use strict";
      var r = n(0).notundef;

      function s(e) {
        r(e.shouldPushNotificationWhenPCOnline) && (this.open = e.shouldPushNotificationWhenPCOnline ? 2 : 1)
      }
      s.getDefaultConfig = function() {
        return {
          shouldPushNotificationWhenPCOnline: !0
        }
      }, s.reverse = function(e) {
        return {
          shouldPushNotificationWhenPCOnline: 1 != +e.open
        }
      }, e.exports = s
    }, function(e, t) {
      function n(e) {
        e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter =
          e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
      }
      e.exports = n, n.prototype.duration = function() {
        var e = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var t = Math.random(),
            n = Math.floor(t * this.jitter * e);
          e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
        }
        return 0 | Math.min(e, this.max)
      }, n.prototype.reset = function() {
        this.attempts = 0
      }, n.prototype.setMin = function(e) {
        this.ms = e
      }, n.prototype.setMax = function(e) {
        this.max = e
      }, n.prototype.setJitter = function(e) {
        this.jitter = e
      }
    }, function(e, t, n) {
      "use strict";
      var r = {
        set: function(e, t, n) {
          r[e] = t, n && (n.support = t)
        }
      };
      e.exports = r
    }, function(e, t) {
      var n, r, s = e.exports = {};

      function i() {
        throw new Error("setTimeout has not been defined")
      }

      function o() {
        throw new Error("clearTimeout has not been defined")
      }

      function a(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
        try {
          return n(e, 0)
        } catch (t) {
          try {
            return n.call(null, e, 0)
          } catch (t) {
            return n.call(this, e, 0)
          }
        }
      }! function() {
        try {
          n = "function" == typeof setTimeout ? setTimeout : i
        } catch (e) {
          n = i
        }
        try {
          r = "function" == typeof clearTimeout ? clearTimeout : o
        } catch (e) {
          r = o
        }
      }();
      var c, u = [],
        l = !1,
        m = -1;

      function d() {
        l && c && (l = !1, c.length ? u = c.concat(u) : m = -1, u.length && p())
      }

      function p() {
        if (!l) {
          var e = a(d);
          l = !0;
          for (var t = u.length; t;) {
            for (c = u, u = []; ++m < t;) c && c[m].run();
            m = -1, t = u.length
          }
          c = null, l = !1,
            function(e) {
              if (r === clearTimeout) return clearTimeout(e);
              if ((r === o || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
              try {
                r(e)
              } catch (t) {
                try {
                  return r.call(null, e)
                } catch (t) {
                  return r.call(this, e)
                }
              }
            }(e)
        }
      }

      function f(e, t) {
        this.fun = e, this.array = t
      }

      function g() {}
      s.nextTick = function(e) {
          var t = new Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
          u.push(new f(e, t)), 1 !== u.length || l || a(p)
        }, f.prototype.run = function() {
          this.fun.apply(null, this.array)
        }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on =
        g, s.addListener = g, s.once = g, s.off = g, s.removeListener = g, s.removeAllListeners = g, s.emit = g,
        s.prependListener = g, s.prependOnceListener = g, s.listeners = function(e) {
          return []
        }, s.binding = function(e) {
          throw new Error("process.binding is not supported")
        }, s.cwd = function() {
          return "/"
        }, s.chdir = function(e) {
          throw new Error("process.chdir is not supported")
        }, s.umask = function() {
          return 0
        }
    }, function(e, t, n) {
      (function(t, n) {
        /*!
         * @overview es6-promise - a tiny implementation of Promises/A+.
         * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
         * @license   Licensed under MIT license
         *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
         * @version   v4.2.4+314e4831
         */
        var r;
        r = function() {
          "use strict";

          function e(e) {
            return "function" == typeof e
          }
          var r = Array.isArray ? Array.isArray : function(e) {
              return "[object Array]" === Object.prototype.toString.call(e)
            },
            s = 0,
            i = void 0,
            o = void 0,
            a = function(e, t) {
              f[s] = e, f[s + 1] = t, 2 === (s += 2) && (o ? o(g) : M())
            };
          var c = "undefined" != typeof window ? window : void 0,
            u = c || {},
            l = u.MutationObserver || u.WebKitMutationObserver,
            m = "undefined" == typeof self && void 0 !== t && "[object process]" === {}.toString.call(t),
            d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" !=
            typeof MessageChannel;

          function p() {
            var e = setTimeout;
            return function() {
              return e(g, 1)
            }
          }
          var f = new Array(1e3);

          function g() {
            for (var e = 0; e < s; e += 2) {
              (0, f[e])(f[e + 1]), f[e] = void 0, f[e + 1] = void 0
            }
            s = 0
          }
          var h, y, v, b, M = void 0;

          function T(e, t) {
            var n = this,
              r = new this.constructor(C);
            void 0 === r[k] && L(r);
            var s = n._state;
            if (s) {
              var i = arguments[s - 1];
              a(function() {
                return F(s, r, i, n._result)
              })
            } else j(n, r, e, t);
            return r
          }

          function S(e) {
            if (e && "object" == typeof e && e.constructor === this) return e;
            var t = new this(C);
            return _(t, e), t
          }
          m ? M = function() {
            return t.nextTick(g)
          } : l ? (y = 0, v = new l(g), b = document.createTextNode(""), v.observe(b, {
            characterData: !0
          }), M = function() {
            b.data = y = ++y % 2
          }) : d ? ((h = new MessageChannel).port1.onmessage = g, M = function() {
            return h.port2.postMessage(0)
          }) : M = void 0 === c ? function() {
            try {
              var e = Function("return this")().require("vertx");
              return void 0 !== (i = e.runOnLoop || e.runOnContext) ? function() {
                i(g)
              } : p()
            } catch (e) {
              return p()
            }
          }() : p();
          var k = Math.random().toString(36).substring(2);

          function C() {}
          var P = void 0,
            I = 1,
            O = 2,
            x = {
              error: null
            };

          function w(e) {
            try {
              return e.then
            } catch (e) {
              return x.error = e, x
            }
          }

          function A(t, n, r) {
            n.constructor === t.constructor && r === T && n.constructor.resolve === S ? function(e, t) {
              t._state === I ? R(e, t._result) : t._state === O ? U(e, t._result) : j(t, void 0, function(t) {
                return _(e, t)
              }, function(t) {
                return U(e, t)
              })
            }(t, n) : r === x ? (U(t, x.error), x.error = null) : void 0 === r ? R(t, n) : e(r) ? function(
              e, t, n) {
              a(function(e) {
                var r = !1,
                  s = function(e, t, n, r) {
                    try {
                      e.call(t, n, r)
                    } catch (e) {
                      return e
                    }
                  }(n, t, function(n) {
                    r || (r = !0, t !== n ? _(e, n) : R(e, n))
                  }, function(t) {
                    r || (r = !0, U(e, t))
                  }, e._label);
                !r && s && (r = !0, U(e, s))
              }, e)
            }(t, n, r) : R(t, n)
          }

          function _(e, t) {
            var n, r;
            e === t ? U(e, new TypeError("You cannot resolve a promise with itself")) : (r = typeof(n = t),
              null === n || "object" !== r && "function" !== r ? R(e, t) : A(e, t, w(t)))
          }

          function E(e) {
            e._onerror && e._onerror(e._result), N(e)
          }

          function R(e, t) {
            e._state === P && (e._result = t, e._state = I, 0 !== e._subscribers.length && a(N, e))
          }

          function U(e, t) {
            e._state === P && (e._state = O, e._result = t, a(E, e))
          }

          function j(e, t, n, r) {
            var s = e._subscribers,
              i = s.length;
            e._onerror = null, s[i] = t, s[i + I] = n, s[i + O] = r, 0 === i && e._state && a(N, e)
          }

          function N(e) {
            var t = e._subscribers,
              n = e._state;
            if (0 !== t.length) {
              for (var r = void 0, s = void 0, i = e._result, o = 0; o < t.length; o += 3) r = t[o], s = t[o +
                n], r ? F(n, r, s, i) : s(i);
              e._subscribers.length = 0
            }
          }

          function F(t, n, r, s) {
            var i = e(r),
              o = void 0,
              a = void 0,
              c = void 0,
              u = void 0;
            if (i) {
              if ((o = function(e, t) {
                  try {
                    return e(t)
                  } catch (e) {
                    return x.error = e, x
                  }
                }(r, s)) === x ? (u = !0, a = o.error, o.error = null) : c = !0, n === o) return void U(n,
                new TypeError("A promises callback cannot return that same promise."))
            } else o = s, c = !0;
            n._state !== P || (i && c ? _(n, o) : u ? U(n, a) : t === I ? R(n, o) : t === O && U(n, o))
          }
          var D = 0;

          function L(e) {
            e[k] = D++, e._state = void 0, e._result = void 0, e._subscribers = []
          }
          var B = function() {
            function e(e, t) {
              this._instanceConstructor = e, this.promise = new e(C), this.promise[k] || L(this.promise), r(
                t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length),
                0 === this.length ? R(this.promise, this._result) : (this.length = this.length || 0, this
                  ._enumerate(t), 0 === this._remaining && R(this.promise, this._result))) : U(this.promise,
                new Error("Array Methods must be provided an Array"))
            }
            return e.prototype._enumerate = function(e) {
              for (var t = 0; this._state === P && t < e.length; t++) this._eachEntry(e[t], t)
            }, e.prototype._eachEntry = function(e, t) {
              var n = this._instanceConstructor,
                r = n.resolve;
              if (r === S) {
                var s = w(e);
                if (s === T && e._state !== P) this._settledAt(e._state, t, e._result);
                else if ("function" != typeof s) this._remaining--, this._result[t] = e;
                else if (n === q) {
                  var i = new n(C);
                  A(i, e, s), this._willSettleAt(i, t)
                } else this._willSettleAt(new n(function(t) {
                  return t(e)
                }), t)
              } else this._willSettleAt(r(e), t)
            }, e.prototype._settledAt = function(e, t, n) {
              var r = this.promise;
              r._state === P && (this._remaining--, e === O ? U(r, n) : this._result[t] = n), 0 === this._remaining &&
                R(r, this._result)
            }, e.prototype._willSettleAt = function(e, t) {
              var n = this;
              j(e, void 0, function(e) {
                return n._settledAt(I, t, e)
              }, function(e) {
                return n._settledAt(O, t, e)
              })
            }, e
          }();
          var q = function() {
            function e(t) {
              this[k] = D++, this._result = this._state = void 0, this._subscribers = [], C !== t && (
                "function" != typeof t && function() {
                  throw new TypeError(
                    "You must pass a resolver function as the first argument to the promise constructor"
                  )
                }(), this instanceof e ? function(e, t) {
                  try {
                    t(function(t) {
                      _(e, t)
                    }, function(t) {
                      U(e, t)
                    })
                  } catch (t) {
                    U(e, t)
                  }
                }(this, t) : function() {
                  throw new TypeError(
                    "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                  )
                }())
            }
            return e.prototype.catch = function(e) {
              return this.then(null, e)
            }, e.prototype.finally = function(e) {
              var t = this.constructor;
              return this.then(function(n) {
                return t.resolve(e()).then(function() {
                  return n
                })
              }, function(n) {
                return t.resolve(e()).then(function() {
                  throw n
                })
              })
            }, e
          }();
          return q.prototype.then = T, q.all = function(e) {
            return new B(this, e).promise
          }, q.race = function(e) {
            var t = this;
            return r(e) ? new t(function(n, r) {
              for (var s = e.length, i = 0; i < s; i++) t.resolve(e[i]).then(n, r)
            }) : new t(function(e, t) {
              return t(new TypeError("You must pass an array to race."))
            })
          }, q.resolve = S, q.reject = function(e) {
            var t = new this(C);
            return U(t, e), t
          }, q._setScheduler = function(e) {
            o = e
          }, q._setAsap = function(e) {
            a = e
          }, q._asap = a, q.polyfill = function() {
            var e = void 0;
            if (void 0 !== n) e = n;
            else if ("undefined" != typeof self) e = self;
            else try {
              e = Function("return this")()
            } catch (e) {
              throw new Error("polyfill failed because global object is unavailable in this environment")
            }
            var t = e.Promise;
            if (t) {
              var r = null;
              try {
                r = Object.prototype.toString.call(t.resolve())
              } catch (e) {}
              if ("[object Promise]" === r && !t.cast) return
            }
            e.Promise = q
          }, q.Promise = q, q
        }, e.exports = r()
      }).call(this, n(173), n(31))
    }, , function(e, t, n) {
      "use strict";
      var r = n(54);

      function s() {}
      s.typeMap = {
        text: 0,
        image: 1,
        audio: 2,
        video: 3,
        geo: 4,
        notification: 5,
        file: 6,
        tip: 10,
        robot: 11,
        custom: 100
      };
      var i = s.typeReverseMap = {
        0: "text",
        1: "image",
        2: "audio",
        3: "video",
        4: "geo",
        5: "notification",
        6: "file",
        10: "tip",
        11: "robot",
        100: "custom"
      };
      s.validTypes = Object.keys(s.typeMap), s.setFlow = function(e, t) {
        var n = t === e.from;
        n && t === e.to && (n = r.deviceId === e.fromDeviceId), e.flow = n ? "out" : "in", "robot" === e.type &&
          e.content && e.content.msgOut && (e.flow = "in")
      }, s.getType = function(e) {
        var t = e.type;
        return i[t] || t
      }, e.exports = s
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = r.notundef,
        i = r.undef;

      function o(e) {
        s(e.name) && (this.name = "" + e.name), s(e.announcement) && (this.announcement = "" + e.announcement), s(
            e.broadcastUrl) && (this.broadcastUrl = "" + e.broadcastUrl), s(e.custom) && (this.custom = "" + e.custom),
          s(e.queuelevel) && (this.queuelevel = parseInt(e.queuelevel))
      }
      o.reverse = function(e) {
        var t = r.copy(e);
        return i(t.announcement) && (t.announcement = ""), i(t.broadcastUrl) && (t.broadcastUrl = ""), i(t.custom) &&
          (t.custom = ""), s(t.createTime) && (t.createTime = +t.createTime), s(t.updateTime) && (t.updateTime = +
            t.updateTime), s(t.onlineMemberNum) && (t.onlineMemberNum = +t.onlineMemberNum), s(t.mute) && (t.mute =
            "1" === t.mute), t
      }, e.exports = o
    },
    function(e, t, n) {
      "use strict";
      var r = n(54);
      e.exports = function(e) {
        e.db && (r.db = e.db)
      }
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };

      function o(e) {
        var t = this,
          n = e.url || null;
        t.level = {
          debug: 0,
          log: 1,
          info: 2,
          warn: 3,
          error: 4
        } [e.level] || 0, t.logCache = [], t.logNum = 1, t.timeInterval = 5e3, window.onerror = function(e, n,
          r, s, i) {
          t.error(i)
        }, setInterval(function() {
          t.logCache.length > 0 && n && t.postLogs(n, t.logCache)
        }, t.timeInterval)
      }
      o.prototype.debug = function() {
        this.level > 0 || (console.debug.apply(this, arguments), this.cacheLogs.apply(this, ["[degbug]"].concat(
          arguments)))
      }, o.prototype.log = function() {
        this.level > 1 || (console.log.apply(this, arguments), this.cacheLogs.apply(this, ["[log]"].concat(
          arguments)))
      }, o.prototype.info = function() {
        this.level > 2 || (console.info.apply(this, arguments), this.cacheLogs.apply(this, ["[info]"].concat(
          arguments)))
      }, o.prototype.warn = function() {
        this.level > 3 || (console.warn.apply(this, arguments), this.cacheLogs.apply(this, ["[warn]"].concat(
          arguments)))
      }, o.prototype.error = function() {
        this.level > 4 || (console.error.apply(this, arguments), this.cacheLogs.apply(this, ["[error]"].concat(
          arguments)))
      }, o.prototype.cacheLogs = function(e, t) {
        for (var n = [], r = 0; r < t.length; r++) {
          var s = t[r];
          "object" === (void 0 === s ? "undefined" : (0, i.default)(s)) ? n.push(JSON.stringify(s)): n.push(s)
        }
        var o = this.logNum++ + " " + e + " " + n.join("; ");
        this.logCache.push(o.replace("%c", ""))
      }, o.prototype.postLogs = function(e, t) {
        var n = this,
          r = new XMLHttpRequest;
        r.onreadystatechange = function() {
            4 === r.readyState && (200 === r.status ? (console.info("LoggerPlugin::日志上报完成"), n.logCache = [], n
              .timeInterval = 5e3) : n.timeInterval += 5e3)
          }, r.open("POST", e), r.setRequestHeader("Content-Type", "plain/text;charset=utf-8"), r.timeout = 360,
          r.send(t.join("\n"))
      }, e.exports = o
    },
    function(e, t) {
      e.exports = function() {
        for (var e = {}, t = 0; t < arguments.length; t++) {
          var r = arguments[t];
          for (var s in r) n.call(r, s) && (e[s] = r[s])
        }
        return e
      };
      var n = Object.prototype.hasOwnProperty
    },
    function(e, t, n) {
      var r = n(151);
      e.exports = function(e, t, n) {
        if (!r(t)) throw new TypeError("iterator must be a function");
        arguments.length < 3 && (n = this);
        "[object Array]" === s.call(e) ? function(e, t, n) {
          for (var r = 0, s = e.length; r < s; r++) i.call(e, r) && t.call(n, e[r], r, e)
        }(e, t, n) : "string" == typeof e ? function(e, t, n) {
          for (var r = 0, s = e.length; r < s; r++) t.call(n, e.charAt(r), r, e)
        }(e, t, n) : function(e, t, n) {
          for (var r in e) i.call(e, r) && t.call(n, e[r], r, e)
        }(e, t, n)
      };
      var s = Object.prototype.toString,
        i = Object.prototype.hasOwnProperty
    },
    function(e, t) {
      (t = e.exports = function(e) {
        return e.replace(/^\s*|\s*$/g, "")
      }).left = function(e) {
        return e.replace(/^\s*/, "")
      }, t.right = function(e) {
        return e.replace(/\s*$/, "")
      }
    },
    function(e, t, n) {
      var r = n(279),
        s = n(278);
      e.exports = function(e) {
        if (!e) return {};
        var t = {};
        return s(r(e).split("\n"), function(e) {
          var n, s = e.indexOf(":"),
            i = r(e.slice(0, s)).toLowerCase(),
            o = r(e.slice(s + 1));
          void 0 === t[i] ? t[i] = o : (n = t[i], "[object Array]" === Object.prototype.toString.call(n) ?
            t[i].push(o) : t[i] = [t[i], o])
        }), t
      }
    },
    function(e, t, n) {
      (function(t) {
        var n;
        n = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {},
          e.exports = n
      }).call(this, n(31))
    },
    function(e, t, n) {
      "use strict";
      var r = n(281),
        s = n(151),
        i = n(280),
        o = n(277);

      function a(e, t, n) {
        var r = e;
        return s(t) ? (n = t, "string" == typeof e && (r = {
          uri: e
        })) : r = o(t, {
          uri: e
        }), r.callback = n, r
      }

      function c(e, t, n) {
        return u(t = a(e, t, n))
      }

      function u(e) {
        if (void 0 === e.callback) throw new Error("callback argument missing");
        var t = !1,
          n = function(n, r, s) {
            t || (t = !0, e.callback(n, r, s))
          };

        function r(e) {
          return clearTimeout(l), e instanceof Error || (e = new Error("" + (e || "Unknown XMLHttpRequest Error"))),
            e.statusCode = 0, n(e, y)
        }

        function s() {
          if (!a) {
            var t;
            clearTimeout(l), t = e.useXDR && void 0 === u.status ? 200 : 1223 === u.status ? 204 : u.status;
            var r = y,
              s = null;
            return 0 !== t ? (r = {
              body: function() {
                var e = void 0;
                if (e = u.response ? u.response : u.responseText || function(e) {
                    try {
                      if ("document" === e.responseType) return e.responseXML;
                      var t = e.responseXML && "parsererror" === e.responseXML.documentElement.nodeName;
                      if ("" === e.responseType && !t) return e.responseXML
                    } catch (e) {}
                    return null
                  }(u), h) try {
                  e = JSON.parse(e)
                } catch (e) {}
                return e
              }(),
              statusCode: t,
              method: d,
              headers: {},
              url: m,
              rawRequest: u
            }, u.getAllResponseHeaders && (r.headers = i(u.getAllResponseHeaders()))) : s = new Error(
              "Internal XMLHttpRequest Error"), n(s, r, r.body)
          }
        }
        var o, a, u = e.xhr || null;
        u || (u = e.cors || e.useXDR ? new c.XDomainRequest : new c.XMLHttpRequest);
        var l, m = u.url = e.uri || e.url,
          d = u.method = e.method || "GET",
          p = e.body || e.data,
          f = u.headers = e.headers || {},
          g = !!e.sync,
          h = !1,
          y = {
            body: void 0,
            headers: {},
            statusCode: 0,
            method: d,
            url: m,
            rawRequest: u
          };
        if ("json" in e && !1 !== e.json && (h = !0, f.accept || f.Accept || (f.Accept = "application/json"),
            "GET" !== d && "HEAD" !== d && (f["content-type"] || f["Content-Type"] || (f["Content-Type"] =
              "application/json"), p = JSON.stringify(!0 === e.json ? p : e.json))), u.onreadystatechange =
          function() {
            4 === u.readyState && setTimeout(s, 0)
          }, u.onload = s, u.onerror = r, u.onprogress = function() {}, u.onabort = function() {
            a = !0
          }, u.ontimeout = r, u.open(d, m, !g, e.username, e.password), g || (u.withCredentials = !!e.withCredentials),
          !g && e.timeout > 0 && (l = setTimeout(function() {
            if (!a) {
              a = !0, u.abort("timeout");
              var e = new Error("XMLHttpRequest timeout");
              e.code = "ETIMEDOUT", r(e)
            }
          }, e.timeout)), u.setRequestHeader)
          for (o in f) f.hasOwnProperty(o) && u.setRequestHeader(o, f[o]);
        else if (e.headers && ! function(e) {
            for (var t in e)
              if (e.hasOwnProperty(t)) return !1;
            return !0
          }(e.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
        return "responseType" in e && (u.responseType = e.responseType), "beforeSend" in e && "function" ==
          typeof e.beforeSend && e.beforeSend(u), u.send(p || null), u
      }
      e.exports = c, c.XMLHttpRequest = r.XMLHttpRequest || function() {}, c.XDomainRequest = "withCredentials" in
        new c.XMLHttpRequest ? c.XMLHttpRequest : r.XDomainRequest,
        function(e, t) {
          for (var n = 0; n < e.length; n++) t(e[n])
        }(["get", "put", "post", "patch", "head", "delete"], function(e) {
          c["delete" === e ? "del" : e] = function(t, n, r) {
            return (n = a(t, n, r)).method = e.toUpperCase(), u(n)
          }
        })
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = r.notundef,
        i = {
          addFriend: 1,
          applyFriend: 2,
          passFriendApply: 3,
          rejectFriendApply: 4
        },
        o = {
          1: "addFriend",
          2: "applyFriend",
          3: "passFriendApply",
          4: "rejectFriendApply"
        };

      function a(e) {
        r.verifyOptions(e, "account", "friend::Friend"), r.verifyParamAtLeastPresentOne(e, "alias custom",
          "friend::Friend"), this.account = e.account, s(e.alias) && (this.alias = e.alias), s(e.custom) && (
          this.custom = e.custom)
      }
      a.reverse = function(e) {
        var t = r.filterObj(e, "account alias custom createTime updateTime serverex");
        return s(e.flag) && (t.valid = "1" === e.flag), s(t.createTime) && (t.createTime = +t.createTime), s(t.updateTime) &&
          (t.updateTime = +t.updateTime), t
      }, a.validTypes = function() {
        return Object.keys(i)
      }, a.getByteFromType = function(e) {
        return i[e]
      }, a.getTypeFromByte = function(e) {
        return o[e]
      }, a.assembleFriend = function(e) {
        var t = +new Date;
        return {
          account: e,
          alias: "",
          createTime: t,
          custom: "",
          updateTime: t,
          valid: !0
        }
      }, e.exports = a
    },
    function(e, t, n) {
      "use strict";
      e.exports = {
        imLogin: {
          3: "clientType",
          4: "os",
          6: "sdkVersion",
          8: "appLogin",
          9: "protocolVersion",
          10: "pushTokenName",
          11: "pushToken",
          13: "deviceId",
          18: "appKey",
          19: "account",
          24: "browser",
          26: "session",
          32: "deviceInfo",
          38: "customTag",
          112: "isReactNative",
          1000: "token"
        },
        nosToken: {
          1: "objectName",
          2: "token",
          3: "bucket",
          4: "expireTime",
          7: "expireSec",
          8: "tag",
          9: "shortUrl"
        },
        audioToText: {
          2: "url"
        },
        imageOp: {
          0: "type",
          1: "stripmeta",
          2: "typeType",
          3: "blurRadius",
          4: "blurSigma",
          5: "qualityQuality",
          6: "cropX",
          7: "cropY",
          8: "cropWidth",
          9: "cropHeight",
          10: "rotateAngle",
          11: "pixelPixel",
          12: "thumbnailMode",
          13: "thumbnailWidth",
          14: "thumbnailHeight",
          15: "thumbnailAxisX",
          16: "thumbnailAxisY",
          17: "thumbnailCenterX",
          18: "thumbnailCenterY",
          19: "thumbnailEnlarge",
          20: "thumbnailToStatic",
          21: "watermarkType",
          22: "watermarkGravity",
          23: "watermarkDissolve",
          24: "watermarkDx",
          25: "watermarkDy",
          26: "watermarkImage",
          27: "watermarkText",
          28: "watermarkFont",
          29: "watermarkFontSize",
          30: "watermarkFontColor",
          31: "interlace"
        },
        robot: {
          4: "account",
          5: "nick",
          6: "avatar",
          7: "intro",
          8: "config",
          9: "valid",
          10: "createTime",
          11: "updateTime",
          12: "custid",
          13: "botid",
          14: "bindTime",
          _6_safe: "_avatar_safe"
        },
        clientAntispam: {
          1: "version",
          2: "md5",
          3: "nosurl",
          4: "thesaurus"
        },
        fileQuickTransfer: {
          1: "md5",
          2: "url",
          3: "size",
          4: "threshold",
          _2_safe: "_url_safe"
        },
        transToken: {
          1: "name",
          2: "type",
          3: "transType",
          4: "size",
          5: "extra",
          6: "body"
        },
        transInfo: {
          1: "docId",
          2: "name",
          3: "prefix",
          4: "size",
          5: "type",
          6: "state",
          7: "transType",
          8: "transSize",
          9: "pageCount",
          10: "picInfo",
          11: "extra",
          12: "flag"
        },
        nosFileUrlTag: {
          0: "safeUrl",
          1: "originUrl"
        },
        fileListParam: {
          1: "fromDocId",
          2: "limit"
        },
        avSignalTag: {
          1: "type",
          2: "channelName",
          3: "channelId",
          4: "channelCreateTime",
          5: "channelExpireTime",
          6: "creator",
          7: "ext",
          8: "channelInValid",
          10: "from",
          11: "to",
          12: "requestId",
          13: "needPush",
          14: "pushTitle",
          15: "pushContent",
          16: "pushPayload",
          17: "needBadge",
          18: "members",
          19: "attach",
          20: "attachExt",
          21: "offlineEnabled",
          22: "msgid",
          23: "uid",
          24: "time"
        },
        login: {
          1: "appKey",
          2: "account",
          3: "deviceId",
          5: "chatroomId",
          8: "appLogin",
          20: "chatroomNick",
          21: "chatroomAvatar",
          22: "chatroomCustom",
          23: "chatroomEnterCustom",
          26: "session",
          38: "isAnonymous",
          _21_safe: "_chatroomAvatar_safe"
        },
        chatroom: {
          1: "id",
          3: "name",
          4: "announcement",
          5: "broadcastUrl",
          12: "custom",
          14: "createTime",
          15: "updateTime",
          16: "queuelevel",
          100: "creator",
          101: "onlineMemberNum",
          102: "mute"
        },
        msg: {
          1: "idClient",
          2: "type",
          3: "attach",
          4: "custom",
          5: "resend",
          6: "userUpdateTime",
          7: "fromNick",
          8: "fromAvatar",
          9: "fromCustom",
          10: "yidunEnable",
          11: "antiSpamContent",
          12: "skipHistory",
          13: "body",
          14: "antiSpamBusinessId",
          15: "clientAntiSpam",
          16: "antiSpamUsingYidun",
          20: "time",
          21: "from",
          22: "chatroomId",
          23: "fromClientType",
          25: "highPriority",
          _8_safe: "_fromAvatar_safe"
        },
        chatroomMember: {
          1: "chatroomId",
          2: "account",
          3: "type",
          4: "level",
          5: "nick",
          6: "avatar",
          7: "custom",
          8: "online",
          9: "guest",
          10: "enterTime",
          12: "blacked",
          13: "gaged",
          14: "valid",
          15: "updateTime",
          16: "tempMuted",
          17: "tempMuteDuration",
          _6_safe: "_avatar_safe"
        }
      }
    },
    function(e, t, n) {
      "use strict";
      e.exports = {
        imLogin: {
          clientType: 3,
          os: 4,
          sdkVersion: 6,
          appLogin: 8,
          protocolVersion: 9,
          pushTokenName: 10,
          pushToken: 11,
          deviceId: 13,
          appKey: 18,
          account: 19,
          browser: 24,
          session: 26,
          deviceInfo: 32,
          isReactNative: 112,
          token: 1e3,
          customTag: 38
        },
        nosToken: {
          objectName: 1,
          token: 2,
          bucket: 3,
          expireTime: 4,
          expireSec: 7,
          tag: 8,
          shortUrl: 9
        },
        audioToText: {
          url: 2
        },
        imageOp: {
          type: 0,
          stripmeta: 1,
          typeType: 2,
          blurRadius: 3,
          blurSigma: 4,
          qualityQuality: 5,
          cropX: 6,
          cropY: 7,
          cropWidth: 8,
          cropHeight: 9,
          rotateAngle: 10,
          pixelPixel: 11,
          thumbnailMode: 12,
          thumbnailWidth: 13,
          thumbnailHeight: 14,
          thumbnailAxisX: 15,
          thumbnailAxisY: 16,
          thumbnailCenterX: 17,
          thumbnailCenterY: 18,
          thumbnailEnlarge: 19,
          thumbnailToStatic: 20,
          watermarkType: 21,
          watermarkGravity: 22,
          watermarkDissolve: 23,
          watermarkDx: 24,
          watermarkDy: 25,
          watermarkImage: 26,
          watermarkText: 27,
          watermarkFont: 28,
          watermarkFontSize: 29,
          watermarkFontColor: 30,
          interlace: 31
        },
        robot: {
          account: 4,
          nick: 5,
          avatar: 6,
          intro: 7,
          config: 8,
          valid: 9,
          createTime: 10,
          updateTime: 11,
          custid: 12,
          botid: 13,
          bindTime: 14
        },
        clientAntispam: {
          version: 1,
          md5: 2,
          nosurl: 3,
          thesaurus: 4
        },
        fileQuickTransfer: {
          md5: 1,
          url: 2,
          size: 3,
          threshold: 4
        },
        transToken: {
          name: 1,
          type: 2,
          transType: 3,
          size: 4,
          extra: 5,
          body: 6
        },
        transInfo: {
          docId: 1,
          name: 2,
          prefix: 3,
          size: 4,
          type: 5,
          state: 6,
          transType: 7,
          transSize: 8,
          pageCount: 9,
          picInfo: 10,
          extra: 11,
          flag: 12
        },
        nosFileUrlTag: {
          safeUrl: 0,
          originUrl: 1
        },
        fileListParam: {
          fromDocId: 1,
          limit: 2
        },
        avSignalTag: {
          type: 1,
          channelName: 2,
          channelId: 3,
          channelCreateTime: 4,
          channelExpireTime: 5,
          creator: 6,
          ext: 7,
          channelInValid: 8,
          from: 10,
          to: 11,
          requestId: 12,
          needPush: 13,
          pushTitle: 14,
          pushContent: 15,
          pushPayload: 16,
          needBadge: 17,
          members: 18,
          attach: 19,
          attachExt: 20,
          offlineEnabled: 21,
          msgid: 22,
          uid: 23,
          time: 24
        },
        login: {
          appKey: 1,
          account: 2,
          deviceId: 3,
          chatroomId: 5,
          appLogin: 8,
          chatroomNick: 20,
          chatroomAvatar: 21,
          chatroomCustom: 22,
          chatroomEnterCustom: 23,
          session: 26,
          isAnonymous: 38
        },
        chatroom: {
          id: 1,
          name: 3,
          announcement: 4,
          broadcastUrl: 5,
          custom: 12,
          createTime: 14,
          updateTime: 15,
          queuelevel: 16,
          creator: 100,
          onlineMemberNum: 101,
          mute: 102
        },
        msg: {
          idClient: 1,
          type: 2,
          attach: 3,
          custom: 4,
          resend: 5,
          userUpdateTime: 6,
          fromNick: 7,
          fromAvatar: 8,
          fromCustom: 9,
          yidunEnable: 10,
          antiSpamContent: 11,
          skipHistory: 12,
          body: 13,
          antiSpamBusinessId: 14,
          clientAntiSpam: 15,
          antiSpamUsingYidun: 16,
          time: 20,
          from: 21,
          chatroomId: 22,
          fromClientType: 23,
          highPriority: 25
        },
        chatroomMember: {
          chatroomId: 1,
          account: 2,
          type: 3,
          level: 4,
          nick: 5,
          avatar: 6,
          custom: 7,
          online: 8,
          guest: 9,
          enterTime: 10,
          blacked: 12,
          gaged: 13,
          valid: 14,
          updateTime: 15,
          tempMuted: 16,
          tempMuteDuration: 17
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = n(79),
        i = r.merge({}, s.idMap, {
          chatroom: {
            id: 13,
            login: 2,
            kicked: 3,
            logout: 4,
            sendMsg: 6,
            msg: 7,
            getChatroomMembers: 8,
            getHistoryMsgs: 9,
            markChatroomMember: 11,
            closeChatroom: 12,
            getChatroom: 13,
            updateChatroom: 14,
            updateMyChatroomMemberInfo: 15,
            getChatroomMembersInfo: 16,
            kickChatroomMember: 17,
            updateChatroomMemberTempMute: 19,
            queueOffer: 20,
            queuePoll: 21,
            queueList: 22,
            peak: 23,
            queueDrop: 24,
            queueInit: 25,
            queueChange: 26
          },
          user: {
            id: 3,
            syncRobot: 16
          }
        }),
        o = r.merge({}, s.cmdConfig, {
          login: {
            sid: i.chatroom.id,
            cid: i.chatroom.login,
            params: [{
              type: "byte",
              name: "type"
            }, {
              type: "Property",
              name: "login"
            }, {
              type: "Property",
              name: "imLogin"
            }]
          },
          logout: {
            sid: i.chatroom.id,
            cid: i.chatroom.logout
          },
          sendMsg: {
            sid: i.chatroom.id,
            cid: i.chatroom.sendMsg,
            params: [{
              type: "Property",
              name: "msg"
            }]
          },
          getChatroomMembers: {
            sid: i.chatroom.id,
            cid: i.chatroom.getChatroomMembers,
            params: [{
              type: "byte",
              name: "type"
            }, {
              type: "long",
              name: "time"
            }, {
              type: "int",
              name: "limit"
            }]
          },
          getHistoryMsgs: {
            sid: i.chatroom.id,
            cid: i.chatroom.getHistoryMsgs,
            params: [{
              type: "long",
              name: "timetag"
            }, {
              type: "int",
              name: "limit"
            }, {
              type: "bool",
              name: "reverse"
            }, {
              type: "LongArray",
              name: "msgTypes"
            }]
          },
          markChatroomMember: {
            sid: i.chatroom.id,
            cid: i.chatroom.markChatroomMember,
            params: [{
              type: "string",
              name: "account"
            }, {
              type: "int",
              name: "type"
            }, {
              type: "bool",
              name: "isAdd"
            }, {
              type: "int",
              name: "level"
            }, {
              type: "string",
              name: "custom"
            }]
          },
          closeChatroom: {
            sid: i.chatroom.id,
            cid: i.chatroom.closeChatroom,
            params: [{
              type: "string",
              name: "custom"
            }]
          },
          getChatroom: {
            sid: i.chatroom.id,
            cid: i.chatroom.getChatroom
          },
          updateChatroom: {
            sid: i.chatroom.id,
            cid: i.chatroom.updateChatroom,
            params: [{
              type: "Property",
              name: "chatroom"
            }, {
              type: "bool",
              name: "needNotify"
            }, {
              type: "String",
              name: "custom"
            }]
          },
          updateMyChatroomMemberInfo: {
            sid: i.chatroom.id,
            cid: i.chatroom.updateMyChatroomMemberInfo,
            params: [{
              type: "Property",
              name: "chatroomMember"
            }, {
              type: "bool",
              name: "needNotify"
            }, {
              type: "String",
              name: "custom"
            }, {
              type: "bool",
              name: "needSave"
            }]
          },
          getChatroomMembersInfo: {
            sid: i.chatroom.id,
            cid: i.chatroom.getChatroomMembersInfo,
            params: [{
              type: "StrArray",
              name: "accounts"
            }]
          },
          kickChatroomMember: {
            sid: i.chatroom.id,
            cid: i.chatroom.kickChatroomMember,
            params: [{
              type: "string",
              name: "account"
            }, {
              type: "string",
              name: "custom"
            }]
          },
          updateChatroomMemberTempMute: {
            sid: i.chatroom.id,
            cid: i.chatroom.updateChatroomMemberTempMute,
            params: [{
              type: "String",
              name: "account"
            }, {
              type: "long",
              name: "duration"
            }, {
              type: "bool",
              name: "needNotify"
            }, {
              type: "String",
              name: "custom"
            }]
          },
          queueOffer: {
            sid: i.chatroom.id,
            cid: i.chatroom.queueOffer,
            params: [{
              type: "string",
              name: "elementKey"
            }, {
              type: "string",
              name: "elementValue"
            }, {
              type: "bool",
              name: "transient"
            }]
          },
          queuePoll: {
            sid: i.chatroom.id,
            cid: i.chatroom.queuePoll,
            params: [{
              type: "string",
              name: "elementKey"
            }]
          },
          queueList: {
            sid: i.chatroom.id,
            cid: i.chatroom.queueList
          },
          peak: {
            sid: i.chatroom.id,
            cid: i.chatroom.peak
          },
          queueDrop: {
            sid: i.chatroom.id,
            cid: i.chatroom.queueDrop
          },
          queueInit: {
            sid: i.chatroom.id,
            cid: i.chatroom.queueInit,
            params: [{
              type: "int",
              name: "limit"
            }]
          },
          queueChange: {
            sid: i.chatroom.id,
            cid: i.chatroom.queueChange,
            params: [{
              type: "StrStrMap",
              name: "elementMap"
            }, {
              type: "bool",
              name: "needNotify"
            }, {
              type: "string",
              name: "notifyExt"
            }]
          },
          syncRobot: {
            sid: i.user.id,
            cid: i.user.syncRobot,
            params: [{
              type: "long",
              name: "timetag"
            }]
          }
        }),
        a = r.merge({}, s.packetConfig, {
          "4_10": {
            service: "notify"
          },
          "4_11": {
            service: "notify"
          },
          "3_16": {
            service: "chatroom",
            cmd: "syncRobot",
            response: [{
              type: "PropertyArray",
              name: "robots",
              entity: "robot"
            }]
          },
          "13_2": {
            service: "chatroom",
            cmd: "login",
            response: [{
              type: "Property",
              name: "chatroom"
            }, {
              type: "Property",
              name: "chatroomMember"
            }]
          },
          "13_3": {
            service: "chatroom",
            cmd: "kicked",
            response: [{
              type: "Number",
              name: "reason"
            }, {
              type: "String",
              name: "custom"
            }]
          },
          "13_4": {
            service: "chatroom",
            cmd: "logout"
          },
          "13_6": {
            service: "chatroom",
            cmd: "sendMsg",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "13_7": {
            service: "chatroom",
            cmd: "msg",
            response: [{
              type: "Property",
              name: "msg"
            }]
          },
          "13_8": {
            service: "chatroom",
            cmd: "getChatroomMembers",
            response: [{
              type: "PropertyArray",
              name: "members",
              entity: "chatroomMember"
            }]
          },
          "13_9": {
            service: "chatroom",
            cmd: "getHistoryMsgs",
            response: [{
              type: "PropertyArray",
              name: "msgs",
              entity: "msg"
            }]
          },
          "13_11": {
            service: "chatroom",
            cmd: "markChatroomMember",
            response: [{
              type: "Property",
              name: "chatroomMember"
            }]
          },
          "13_12": {
            service: "chatroom",
            cmd: "closeChatroom"
          },
          "13_13": {
            service: "chatroom",
            cmd: "getChatroom",
            response: [{
              type: "Property",
              name: "chatroom"
            }]
          },
          "13_14": {
            service: "chatroom",
            cmd: "updateChatroom"
          },
          "13_15": {
            service: "chatroom",
            cmd: "updateMyChatroomMemberInfo"
          },
          "13_16": {
            service: "chatroom",
            cmd: "getChatroomMembersInfo",
            response: [{
              type: "PropertyArray",
              name: "members",
              entity: "chatroomMember"
            }]
          },
          "13_17": {
            service: "chatroom",
            cmd: "kickChatroomMember"
          },
          "13_19": {
            service: "chatroom",
            cmd: "updateChatroomMemberTempMute"
          },
          "13_20": {
            service: "chatroom",
            cmd: "queueOffer"
          },
          "13_21": {
            service: "chatroom",
            cmd: "queuePoll",
            response: [{
              type: "String",
              name: "elementKey"
            }, {
              type: "String",
              name: "elementValue"
            }]
          },
          "13_22": {
            service: "chatroom",
            cmd: "queueList",
            response: [{
              type: "KVArray",
              name: "queueList"
            }]
          },
          "13_23": {
            service: "chatroom",
            cmd: "peak",
            response: [{
              type: "String",
              name: "elementKey"
            }, {
              type: "String",
              name: "elementValue"
            }]
          },
          "13_24": {
            service: "chatroom",
            cmd: "queueDrop"
          },
          "13_25": {
            service: "chatroom",
            cmd: "queueInit"
          },
          "13_26": {
            service: "chatroom",
            cmd: "queueChange",
            response: [{
              type: "StrArray",
              name: "elementKeyArray"
            }]
          }
        });
      e.exports = {
        idMap: i,
        cmdConfig: o,
        packetConfig: a
      }
    },
    function(e, t, n) {
      "use strict";
      e.exports = {
        nosToken: {
          1: "objectName",
          2: "token",
          3: "bucket",
          4: "expireTime",
          7: "expireSec",
          8: "tag",
          9: "shortUrl"
        },
        audioToText: {
          2: "url"
        },
        imageOp: {
          0: "type",
          1: "stripmeta",
          2: "typeType",
          3: "blurRadius",
          4: "blurSigma",
          5: "qualityQuality",
          6: "cropX",
          7: "cropY",
          8: "cropWidth",
          9: "cropHeight",
          10: "rotateAngle",
          11: "pixelPixel",
          12: "thumbnailMode",
          13: "thumbnailWidth",
          14: "thumbnailHeight",
          15: "thumbnailAxisX",
          16: "thumbnailAxisY",
          17: "thumbnailCenterX",
          18: "thumbnailCenterY",
          19: "thumbnailEnlarge",
          20: "thumbnailToStatic",
          21: "watermarkType",
          22: "watermarkGravity",
          23: "watermarkDissolve",
          24: "watermarkDx",
          25: "watermarkDy",
          26: "watermarkImage",
          27: "watermarkText",
          28: "watermarkFont",
          29: "watermarkFontSize",
          30: "watermarkFontColor",
          31: "interlace"
        },
        robot: {
          4: "account",
          5: "nick",
          6: "avatar",
          7: "intro",
          8: "config",
          9: "valid",
          10: "createTime",
          11: "updateTime",
          12: "custid",
          13: "botid",
          14: "bindTime",
          _6_safe: "_avatar_safe"
        },
        clientAntispam: {
          1: "version",
          2: "md5",
          3: "nosurl",
          4: "thesaurus"
        },
        fileQuickTransfer: {
          1: "md5",
          2: "url",
          3: "size",
          4: "threshold",
          _2_safe: "_url_safe"
        },
        transToken: {
          1: "name",
          2: "type",
          3: "transType",
          4: "size",
          5: "extra",
          6: "body"
        },
        transInfo: {
          1: "docId",
          2: "name",
          3: "prefix",
          4: "size",
          5: "type",
          6: "state",
          7: "transType",
          8: "transSize",
          9: "pageCount",
          10: "picInfo",
          11: "extra",
          12: "flag"
        },
        nosFileUrlTag: {
          0: "safeUrl",
          1: "originUrl"
        },
        fileListParam: {
          1: "fromDocId",
          2: "limit"
        },
        avSignalTag: {
          1: "type",
          2: "channelName",
          3: "channelId",
          4: "channelCreateTime",
          5: "channelExpireTime",
          6: "creator",
          7: "ext",
          8: "channelInValid",
          10: "from",
          11: "to",
          12: "requestId",
          13: "needPush",
          14: "pushTitle",
          15: "pushContent",
          16: "pushPayload",
          17: "needBadge",
          18: "members",
          19: "attach",
          20: "attachExt",
          21: "offlineEnabled",
          22: "msgid",
          23: "uid",
          24: "time"
        },
        login: {
          3: "clientType",
          4: "os",
          6: "sdkVersion",
          8: "appLogin",
          9: "protocolVersion",
          10: "pushTokenName",
          11: "pushToken",
          13: "deviceId",
          18: "appKey",
          19: "account",
          24: "browser",
          26: "session",
          32: "deviceInfo",
          38: "customTag",
          112: "isReactNative",
          1000: "token"
        },
        loginRes: {
          17: "lastLoginDeviceId",
          38: "customTag",
          102: "connectionId",
          103: "ip",
          104: "port",
          106: "country",
          111: "hasXMPush"
        },
        loginPort: {
          3: "type",
          4: "os",
          5: "mac",
          13: "deviceId",
          19: "account",
          32: "deviceInfo",
          38: "customTag",
          102: "connectionId",
          103: "ip",
          109: "time"
        },
        aosPushInfo: {
          110: "pushType",
          111: "hasTokenPreviously"
        },
        sync: {
          1: "myInfo",
          2: "offlineMsgs",
          3: "teams",
          6: "netcallMsgs",
          7: "roamingMsgs",
          9: "relations",
          11: "friends",
          12: "sessions",
          13: "friendUsers",
          14: "msgReceipts",
          15: "myTeamMembers",
          16: "donnop",
          17: "deleteMsg",
          18: "sessionAck",
          19: "robots",
          20: "broadcastMsgs",
          21: "avSignal",
          100: "filterMsgs"
        },
        donnop: {
          1: "open"
        },
        team: {
          1: "teamId",
          3: "name",
          4: "type",
          5: "owner",
          6: "level",
          7: "selfCustom",
          8: "valid",
          9: "memberNum",
          10: "memberUpdateTime",
          11: "createTime",
          12: "updateTime",
          13: "validToCurrentUser",
          14: "intro",
          15: "announcement",
          16: "joinMode",
          17: "bits",
          18: "custom",
          19: "serverCustom",
          20: "avatar",
          21: "beInviteMode",
          22: "inviteMode",
          23: "updateTeamMode",
          24: "updateCustomMode",
          100: "mute",
          101: "muteType",
          _20_safe: "_avatar_safe"
        },
        teamMember: {
          1: "teamId",
          3: "account",
          4: "type",
          5: "nickInTeam",
          7: "bits",
          8: "active",
          9: "valid",
          10: "joinTime",
          11: "updateTime",
          12: "custom",
          13: "mute"
        },
        msg: {
          0: "scene",
          1: "to",
          2: "from",
          4: "fromClientType",
          5: "fromDeviceId",
          6: "fromNick",
          7: "time",
          8: "type",
          9: "body",
          10: "attach",
          11: "idClient",
          12: "idServer",
          13: "resend",
          14: "userUpdateTime",
          15: "custom",
          16: "pushPayload",
          17: "pushContent",
          18: "apnsAccounts",
          19: "apnsContent",
          20: "apnsForcePush",
          21: "yidunEnable",
          22: "antiSpamContent",
          23: "antiSpamBusinessId",
          24: "clientAntiSpam",
          25: "antiSpamUsingYidun",
          26: "needMsgReceipt",
          100: "isHistoryable",
          101: "isRoamingable",
          102: "isSyncable",
          104: "isMuted",
          105: "cc",
          106: "isInBlackList",
          107: "isPushable",
          108: "isOfflinable",
          109: "isUnreadable",
          110: "needPushNick",
          111: "isReplyMsg",
          112: "tempTeamMemberCount"
        },
        msgReceipt: {
          1: "to",
          2: "from",
          7: "time",
          11: "idClient"
        },
        teamMsgReceipt: {
          0: "teamId",
          1: "idServer",
          100: "read",
          101: "unread",
          102: "idClient",
          103: "account"
        },
        sysMsg: {
          0: "time",
          1: "type",
          2: "to",
          3: "from",
          4: "ps",
          5: "attach",
          6: "idServer",
          7: "sendToOnlineUsersOnly",
          8: "apnsText",
          9: "pushPayload",
          10: "deletedIdClient",
          11: "deletedIdServer",
          12: "yidunEnable",
          13: "antiSpamContent",
          14: "deletedMsgTime",
          15: "deletedMsgFromNick",
          16: "opeAccount",
          105: "cc",
          107: "isPushable",
          109: "isUnreadable",
          110: "needPushNick"
        },
        broadcastMsg: {
          1: "broadcastId",
          2: "fromAccid",
          3: "fromUid",
          4: "timestamp",
          5: "body"
        },
        friend: {
          4: "account",
          5: "flag",
          6: "beflag",
          7: "source",
          8: "alias",
          9: "bits",
          10: "custom",
          11: "createTime",
          12: "updateTime",
          13: "serverex"
        },
        user: {
          1: "account",
          3: "nick",
          4: "avatar",
          5: "sign",
          6: "gender",
          7: "email",
          8: "birth",
          9: "tel",
          10: "custom",
          12: "createTime",
          13: "updateTime",
          _4_safe: "_avatar_safe"
        },
        specialRelation: {
          0: "account",
          1: "isMuted",
          2: "isBlacked",
          3: "createTime",
          4: "updateTime"
        },
        msgType: {
          0: "text",
          1: "picture",
          2: "audio",
          3: "video",
          4: "location",
          5: "notification",
          6: "file",
          7: "netcall_audio",
          8: "netcall_vedio",
          9: "datatunnel_new",
          10: "tips",
          11: "robot",
          100: "custom"
        },
        msgEvent: {
          1: "type",
          2: "value",
          3: "idClient",
          4: "custom",
          5: "validTime",
          6: "broadcastType",
          7: "sync",
          8: "validTimeType",
          9: "durable",
          10: "time",
          11: "idServer",
          12: "clientType",
          13: "serverConfig",
          14: "serverCustom",
          101: "appid",
          103: "account",
          104: "enableMultiClient",
          106: "consid"
        },
        msgEventSubscribe: {
          1: "type",
          2: "subscribeTime",
          3: "sync",
          102: "to",
          104: "from",
          105: "time"
        }
      }
    },
    function(e, t, n) {
      "use strict";
      e.exports = {
        nosToken: {
          objectName: 1,
          token: 2,
          bucket: 3,
          expireTime: 4,
          expireSec: 7,
          tag: 8,
          shortUrl: 9
        },
        audioToText: {
          url: 2
        },
        imageOp: {
          type: 0,
          stripmeta: 1,
          typeType: 2,
          blurRadius: 3,
          blurSigma: 4,
          qualityQuality: 5,
          cropX: 6,
          cropY: 7,
          cropWidth: 8,
          cropHeight: 9,
          rotateAngle: 10,
          pixelPixel: 11,
          thumbnailMode: 12,
          thumbnailWidth: 13,
          thumbnailHeight: 14,
          thumbnailAxisX: 15,
          thumbnailAxisY: 16,
          thumbnailCenterX: 17,
          thumbnailCenterY: 18,
          thumbnailEnlarge: 19,
          thumbnailToStatic: 20,
          watermarkType: 21,
          watermarkGravity: 22,
          watermarkDissolve: 23,
          watermarkDx: 24,
          watermarkDy: 25,
          watermarkImage: 26,
          watermarkText: 27,
          watermarkFont: 28,
          watermarkFontSize: 29,
          watermarkFontColor: 30,
          interlace: 31
        },
        robot: {
          account: 4,
          nick: 5,
          avatar: 6,
          intro: 7,
          config: 8,
          valid: 9,
          createTime: 10,
          updateTime: 11,
          custid: 12,
          botid: 13,
          bindTime: 14
        },
        clientAntispam: {
          version: 1,
          md5: 2,
          nosurl: 3,
          thesaurus: 4
        },
        fileQuickTransfer: {
          md5: 1,
          url: 2,
          size: 3,
          threshold: 4
        },
        transToken: {
          name: 1,
          type: 2,
          transType: 3,
          size: 4,
          extra: 5,
          body: 6
        },
        transInfo: {
          docId: 1,
          name: 2,
          prefix: 3,
          size: 4,
          type: 5,
          state: 6,
          transType: 7,
          transSize: 8,
          pageCount: 9,
          picInfo: 10,
          extra: 11,
          flag: 12
        },
        nosFileUrlTag: {
          safeUrl: 0,
          originUrl: 1
        },
        fileListParam: {
          fromDocId: 1,
          limit: 2
        },
        avSignalTag: {
          type: 1,
          channelName: 2,
          channelId: 3,
          channelCreateTime: 4,
          channelExpireTime: 5,
          creator: 6,
          ext: 7,
          channelInValid: 8,
          from: 10,
          to: 11,
          requestId: 12,
          needPush: 13,
          pushTitle: 14,
          pushContent: 15,
          pushPayload: 16,
          needBadge: 17,
          members: 18,
          attach: 19,
          attachExt: 20,
          offlineEnabled: 21,
          msgid: 22,
          uid: 23,
          time: 24
        },
        login: {
          clientType: 3,
          os: 4,
          sdkVersion: 6,
          appLogin: 8,
          protocolVersion: 9,
          pushTokenName: 10,
          pushToken: 11,
          deviceId: 13,
          appKey: 18,
          account: 19,
          browser: 24,
          session: 26,
          deviceInfo: 32,
          isReactNative: 112,
          token: 1e3,
          customTag: 38
        },
        loginRes: {
          lastLoginDeviceId: 17,
          customTag: 38,
          connectionId: 102,
          ip: 103,
          port: 104,
          country: 106,
          hasXMPush: 111
        },
        loginPort: {
          type: 3,
          os: 4,
          mac: 5,
          deviceId: 13,
          account: 19,
          deviceInfo: 32,
          connectionId: 102,
          ip: 103,
          time: 109,
          customTag: 38
        },
        aosPushInfo: {
          pushType: 110,
          hasTokenPreviously: 111
        },
        sync: {
          myInfo: 1,
          offlineMsgs: 2,
          teams: 3,
          netcallMsgs: 6,
          roamingMsgs: 7,
          relations: 9,
          friends: 11,
          sessions: 12,
          friendUsers: 13,
          msgReceipts: 14,
          myTeamMembers: 15,
          donnop: 16,
          deleteMsg: 17,
          sessionAck: 18,
          robots: 19,
          broadcastMsgs: 20,
          avSignal: 21,
          filterMsgs: 100
        },
        donnop: {
          open: 1
        },
        team: {
          teamId: 1,
          name: 3,
          type: 4,
          owner: 5,
          level: 6,
          selfCustom: 7,
          valid: 8,
          memberNum: 9,
          memberUpdateTime: 10,
          createTime: 11,
          updateTime: 12,
          validToCurrentUser: 13,
          intro: 14,
          announcement: 15,
          joinMode: 16,
          bits: 17,
          custom: 18,
          serverCustom: 19,
          avatar: 20,
          beInviteMode: 21,
          inviteMode: 22,
          updateTeamMode: 23,
          updateCustomMode: 24,
          mute: 100,
          muteType: 101
        },
        teamMember: {
          teamId: 1,
          account: 3,
          type: 4,
          nickInTeam: 5,
          bits: 7,
          active: 8,
          valid: 9,
          joinTime: 10,
          updateTime: 11,
          custom: 12,
          mute: 13
        },
        msg: {
          scene: 0,
          to: 1,
          from: 2,
          fromClientType: 4,
          fromDeviceId: 5,
          fromNick: 6,
          time: 7,
          type: 8,
          body: 9,
          attach: 10,
          idClient: 11,
          idServer: 12,
          resend: 13,
          userUpdateTime: 14,
          custom: 15,
          pushPayload: 16,
          pushContent: 17,
          apnsAccounts: 18,
          apnsContent: 19,
          apnsForcePush: 20,
          yidunEnable: 21,
          antiSpamContent: 22,
          antiSpamBusinessId: 23,
          clientAntiSpam: 24,
          antiSpamUsingYidun: 25,
          needMsgReceipt: 26,
          isHistoryable: 100,
          isRoamingable: 101,
          isSyncable: 102,
          isMuted: 104,
          cc: 105,
          isInBlackList: 106,
          isPushable: 107,
          isOfflinable: 108,
          isUnreadable: 109,
          needPushNick: 110,
          isReplyMsg: 111,
          tempTeamMemberCount: 112
        },
        msgReceipt: {
          to: 1,
          from: 2,
          time: 7,
          idClient: 11
        },
        teamMsgReceipt: {
          teamId: 0,
          idServer: 1,
          read: 100,
          unread: 101,
          idClient: 102,
          account: 103
        },
        sysMsg: {
          time: 0,
          type: 1,
          to: 2,
          from: 3,
          ps: 4,
          attach: 5,
          idServer: 6,
          sendToOnlineUsersOnly: 7,
          apnsText: 8,
          pushPayload: 9,
          deletedIdClient: 10,
          deletedIdServer: 11,
          yidunEnable: 12,
          antiSpamContent: 13,
          deletedMsgTime: 14,
          deletedMsgFromNick: 15,
          opeAccount: 16,
          cc: 105,
          isPushable: 107,
          isUnreadable: 109,
          needPushNick: 110
        },
        broadcastMsg: {
          broadcastId: 1,
          fromAccid: 2,
          fromUid: 3,
          timestamp: 4,
          body: 5
        },
        friend: {
          account: 4,
          flag: 5,
          beflag: 6,
          source: 7,
          alias: 8,
          bits: 9,
          custom: 10,
          createTime: 11,
          updateTime: 12,
          serverex: 13
        },
        user: {
          account: 1,
          nick: 3,
          avatar: 4,
          sign: 5,
          gender: 6,
          email: 7,
          birth: 8,
          tel: 9,
          custom: 10,
          createTime: 12,
          updateTime: 13
        },
        specialRelation: {
          account: 0,
          isMuted: 1,
          isBlacked: 2,
          createTime: 3,
          updateTime: 4
        },
        msgType: {
          text: 0,
          picture: 1,
          audio: 2,
          video: 3,
          location: 4,
          notification: 5,
          file: 6,
          netcall_audio: 7,
          netcall_vedio: 8,
          datatunnel_new: 9,
          tips: 10,
          robot: 11,
          custom: 100
        },
        msgEvent: {
          type: 1,
          value: 2,
          idClient: 3,
          custom: 4,
          validTime: 5,
          broadcastType: 6,
          sync: 7,
          validTimeType: 8,
          durable: 9,
          time: 10,
          idServer: 11,
          clientType: 12,
          serverConfig: 13,
          serverCustom: 14,
          appid: 101,
          account: 103,
          enableMultiClient: 104,
          consid: 106
        },
        msgEventSubscribe: {
          type: 1,
          subscribeTime: 2,
          sync: 3,
          to: 102,
          from: 104,
          time: 105
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(57).fn,
        s = n(0),
        i = n(153);
      r.processAvSignal = function(e) {
        switch (console.log(e, "avSignal..."), e.cmd) {
          case "signalingCreate":
          case "signalingDelay":
          case "signalingClose":
          case "signalingJoin":
          case "signalingLeave":
          case "signalingInvite":
          case "signalingCancel":
          case "signalingReject":
          case "signalingAccept":
          case "signalingControl":
          case "signalingSyncMsgRead":
          case "signalingGetChannelInfo":
            break;
          case "signalingNotify":
            this.onSignalingNotify(e);
            break;
          case "signalingMutilClientSyncNotify":
            this.onSignalingMutilClientSyncNotify(e);
            break;
          case "signalingUnreadMessageSyncNotify":
            this.onSignalingUnreadMessageSyncNotify(e);
            break;
          case "signalingChannelsSyncNotify":
            this.onSignalingMembersSyncNotify(e);
            break;
          default:
            this.logger.log("avSignal::unhandled cmd:", e.cmd)
        }
      };
      var o = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (e.needPush && (e.needPush = "1" === e.needPush), e.needBadge && (e.needBadge = "1" === e.needBadge),
          e.channelInValid && (e.channelInValid = "1" === e.channelInValid), e.attach) {
          var t = JSON.parse(e.attach);
          e.eventType = i.parseAvSignalType(t.type)
        }
        if (e.members) {
          var n = JSON.parse(e.members);
          e.members = n.map(function(e) {
            return i.parseAvSignalMember(e)
          })
        }
        return e
      };
      r.onSignalingNotify = function(e) {
        if (e.error) {
          var t = e.error;
          this.logger.error("protocal::avSignal:onSignalingNotify error", t), this.emitAPI({
            type: "error",
            error: t
          }), this.options.onerror(t)
        } else {
          e.raw && e.raw.r && e.raw.r.length && e.content && e.content.avSignalTag && (e.content.avSignalTag.msgid =
            e.raw.r[0]);
          var n = e.content;
          n = Array.isArray(n) ? n.map(function(e) {
            return o(e)
          }) : o(n), this.emitAPI({
            type: "signalingNotify",
            obj: n
          }), s.isFunction(this.options.onSignalingNotify) && this.options.onSignalingNotify(n)
        }
      }, r.onSignalingMutilClientSyncNotify = function(e) {
        if (e.error) {
          var t = e.error;
          this.logger.error("protocal::avSignal:onSignalingMutilClientSyncNotify error", t), this.emitAPI({
            type: "error",
            error: t
          }), this.options.onerror(t)
        } else this.emitAPI({
          type: "signalingMutilClientSyncNotify",
          obj: e.content
        }), s.isFunction(this.options.onSignalingMutilClientSyncNotify) && this.options.onSignalingMutilClientSyncNotify(
          e.content)
      }, r.onSignalingUnreadMessageSyncNotify = function(e) {
        if (e.error) {
          var t = e.error;
          this.logger.error("protocal::avSignal:onSignalingUnreadMessageSyncNotify error", t), this.emitAPI({
            type: "error",
            error: t
          }), this.options.onerror(t)
        } else {
          var n = e.content.avSignalTag;
          Array.isArray(n) && (n = n.map(function(e) {
            return o(e)
          })), this.emitAPI({
            type: "signalingUnreadMessageSyncNotify",
            obj: n
          }), s.isFunction(this.options.onSignalingUnreadMessageSyncNotify) && this.options.onSignalingUnreadMessageSyncNotify(
            n)
        }
      }, r.onSignalingMembersSyncNotify = function(e) {
        if (e.error) {
          var t = e.error;
          this.logger.error("protocal::avSignal:onSignalingMembersSyncNotify error", t), this.emitAPI({
            type: "error",
            error: t
          }), this.options.onerror(t)
        } else {
          var n = e.content.avSignalTag;
          Array.isArray(n) || (n = [n]), n = n.map(function(e) {
            return o(e)
          }), this.emitAPI({
            type: "signalingChannelsSyncNotify",
            obj: n
          }), s.isFunction(this.options.onSignalingMembersSyncNotify) && this.options.onSignalingMembersSyncNotify(
            n)
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(57).fn,
        s = n(154);
      r.processMisc = function(e) {
        switch (e.cmd) {
          case "getSimpleNosToken":
            e.error || (e.obj = e.content.nosTokens[0]);
            break;
          case "getNosToken":
            e.error || (e.obj = e.content.nosToken);
            break;
          case "notifyUploadLog":
            e.error || this.emitAPI({
              type: "notifyUploadLog"
            });
            break;
          case "audioToText":
            e.error || (e.obj.text = e.content.text);
            break;
          case "processImage":
            e.obj.imageOps = s.reverseImageOps(e.obj.imageOps), e.error || (e.obj = {
              url: e.content.url
            });
            break;
          case "getNosTokenTrans":
            e.error || (e.obj = {
              nosToken: e.content.nosToken,
              docId: e.content.docId
            });
            break;
          case "getNosOriginUrl":
            this.getNosOriginUrlReqNum--, e.error || (e.obj = e.content.nosFileUrlTag.originUrl);
            break;
          case "notifyTransLog":
            e.error || this.emitAPI({
              type: "notifyTransLog",
              obj: e.content.transInfo
            });
            break;
          case "fetchFile":
          case "fetchFileList":
          case "removeFile":
            e.error || (e.obj = e.content)
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(57).fn,
        s = n(2);
      r.processLink = function(e) {
        e.cmd
      }, r.startHeartbeat = function() {
        var e = this;
        e.stopHeartbeat(), e.heartbeatTimer = setTimeout(function() {
          e.sendCmd("heartbeat", null, e.onHeartbeat.bind(e))
        }, s.heartbeatInterval)
      }, r.stopHeartbeat = function() {
        this.heartbeatTimer && (clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null)
      }, r.onHeartbeat = function(e, t) {
        e ? (e.callFunc = "link::onHeartbeat", this.api.reportLogs({
          event: "ping_timeout"
        }), this.onCustomError("heartbeat error", "HEARTBEAT_ERROR", e)) : this.startHeartbeat()
      }, r.heartbeat = function() {}
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(58),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o, a = n(57).fn,
        c = n(26),
        u = n(22),
        l = n(118),
        m = n(54),
        d = n(2),
        p = n(0),
        f = p.notundef;
      a.login = function() {
        var e = this;
        Promise.resolve().then(function() {
          return e.assembleLogin()
        }).then(function(t) {
          e.sendCmd("login", (0, i.default)({}, t), e.onLogin.bind(e))
        }), e.autoconnect = !1
      }, a.genSessionKey = (o = {}, function() {
        var e = this.name;
        return o[e] = o[e] || p.guid()
      }), a.assembleIMLogin = function() {
        var e = this.options,
          t = e.account,
          n = this.autoconnect ? 0 : 1;
        return this.sdkSession = this.genSessionKey(), {
          appLogin: n,
          appKey: e.appKey,
          account: t,
          token: e.token,
          sdkVersion: d.info.sdkVersion,
          protocolVersion: d.info.protocolVersion,
          os: u.os.toString(),
          browser: u.name + " " + u.version,
          clientType: d.CLIENTTYPE || 16,
          session: this.sdkSession,
          deviceId: m.deviceId,
          isReactNative: d.isRN ? 1 : 0,
          customTag: e.customTag || ""
        }
      }, a.onLogin = function(e, t) {
        this.loginResult = t, e ? this.onAuthError(e, "link::onLogin") : (this.startHeartbeat(), this.afterLogin(
          t))
      }, a.afterLogin = p.emptyFunc, a.notifyLogin = function() {
        var e = this.loginResult;
        this.logger.info("link::notifyLogin: on connect", e), this.options.onconnect(e)
      }, a.logout = function() {
        var e = "done disconnect";
        if (this.doLogout) return this.doLogout = !1, e = "done logout", void this.onAuthError(new c(e,
          "logout"), "link::logout");
        if (this.isConnected()) {
          var t = new c(e, "logout");
          this.onAuthError(t, "link::logout")
        }
      }, a.onKicked = function(e) {
        var t = e.content,
          n = t.from,
          r = t.reason,
          s = t.custom,
          i = {
            reason: this.kickedReasons[r] || "unknown",
            message: this.kickedMessages[r] || "未知原因"
          };
        if (f(n) && (i.from = l.reverseType(n)), f(s) && (i.custom = s), this.shouldNotifyKicked(i)) {
          var o = new c("被踢了", "kicked");
          p.merge(o, i), this.onAuthError(o, "link::onKicked")
        } else this.logger.warn("link::onKicked: silentlyKick"), this.shouldReconnect = !0, this.hasNotifyDisconnected = !
          0, this.disconnectSocket()
      }, a.shouldNotifyKicked = function(e) {
        return "silentlyKick" !== e.reason
      }, a.onAuthError = function(e, t) {
        this.shouldReconnect = !1, (e = e || c.newConnectionError({
          callFunc: t
        })).callFunc = e.callFunc || t || null, this.markAllCallbackInvalid(e), this.notifyDisconnect(e)
      }
    },
    function(e, t) {
      e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []),
          Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
              return e.l
            }
          }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
              return e.i
            }
          }), e.webpackPolyfill = 1), e
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(57).fn,
        s = n(26),
        i = n(171),
        o = n(152),
        a = n(2),
        c = n(0);
      r.initConnect = function() {
        this.socket = null, this.retryCount = 0, this.connecting = !1, this.initConnecting = !1, this.shouldReconnect = !
          0, this.hasNotifyDisconnected = !1, this.doLogout = !1
      }, r.resetConnect = function() {
        var e = this.options;
        c.notundef(e.needReconnect) ? (c.verifyParamType("needReconnect", e.needReconnect, "boolean",
            "link::resetConnect"), this.needReconnect = e.needReconnect) : this.needReconnect = !0, this.logger
          .log("link::resetConnect: needReconnect " + this.needReconnect), c.notundef(e.reconnectionAttempts) &&
          c.verifyParamType("reconnectionAttempts", e.reconnectionAttempts, "number", "link::resetConnect"),
          this.reconnectionAttempts = "number" == typeof e.reconnectionAttempts ? e.reconnectionAttempts : 1 /
          0, this.backoff = new i({
            min: a.reconnectionDelay,
            max: a.reconnectionDelayMax,
            jitter: a.reconnectionJitter
          })
      }, r.connect = function(e) {
        if (e) {
          if (this.initConnecting) return void this.logger.warn("link::connect: already init connecting");
          clearTimeout(this.reconnectTimer)
        }
        if (this.isConnected()) this.logger.warn("link::connect: already connected");
        else if (this.connecting) this.logger.warn("link::connect: already connecting");
        else if (this.connecting = !0, this.hasNotifyDisconnected = !1, this.socket && this.socket && this.socket
          .socket) this.logger.info("link::connect: try connecting..."), this.socket.socket.connect();
        else if (this.options.socketUrl && "string" == typeof this.options.socketUrl) this.connectToUrl(this.options
          .socketUrl);
        else {
          var t = this.getNextSocketUrl();
          t ? this.connectToUrl(t) : this.refreshSocketUrl()
        }
      }, r.getNextSocketUrl = function() {
        return this.socketUrls.shift()
      }, r.isConnected = function() {
        return !!this.socket && !!this.socket.socket && this.socket.socket.connected
      }, r.connectToUrl = function(e) {
        var t = this;
        if (e = e || "", t.logger.log("link::connectToUrl: " + e), "undefined" == typeof window) {
          var n = c.getGlobal(),
            r = e.split(":");
          n && !n.location && r.length > 1 && (n.location = {
            protocol: r[0],
            hostname: r[1].slice(2),
            port: r[2]
          }), this.options.transports = ["websocket"]
        }
        var s = this.options.transports || ["websocket", "xhr-polling"];
        t.socket = o.connect(e, {
            transports: s,
            reconnect: !1,
            "force new connection": !0,
            "connect timeout": a.connectTimeout
          }), t.logger.info("link::connectToUrl: socket url: " + e + ", transports: " + JSON.stringify(s)), t.socket
          .on("connect", t.onConnect.bind(t)), t.socket.on("handshake_failed", t.onHandshakeFailed.bind(t)), t.socket
          .on("connect_failed", t.onConnectFailed.bind(t)), t.socket.on("error", t.onError.bind(t)), t.socket.on(
            "message", t.onMessage.bind(t)), t.socket.on("disconnect", function(n) {
            t.logger.warn("link::connectToUrl: socket url: " + e + ", disconnected"), t.doLogout ? t.logout() :
              t.onDisconnect(!0, "link::socketDisconnect")
          })
      }, r.disconnect = function(e) {
        var t = this;

        function n(n) {
          t.logger.info("link::disconnect: socket finally closed, ", n), clearTimeout(t.disconnectCallbackTimer),
            e(n)
        }
        e instanceof Function || (e = function() {}), clearTimeout(t.connectTimer), t.disconnectCallbackTimer =
          setTimeout(function() {
            e.call(t, "mark disconnected due to timeout")
          }, 1e4), t.socket && t.socket.socket && t.socket.socket.transport ? t.socket.socket.transport.onDisconnectDone =
          function(e) {
            n(e)
          } : n(null), t.isConnected() ? (t.logger.log("link::disconnect: start disconnecting"), t.logout()) :
          t.connecting ? (t.logger.log("link::disconnect: abort connecting"), t.disconnectSocket()) : (t.logger
            .log("link::disconnect: start otherwise"), t.connecting = !1, t.shouldReconnect = !1, t.needReconnect = !
            1, t.options.ondisconnect({
              callFunc: "link::disconnect",
              message: "manually disconnect status"
            }))
      }, r.onConnect = function() {
        this.backoff && this.backoff.reset(), this.reconnectStatus = this.retryCount > 0 ? 1 : 0, this.retryCount =
          0, this.connecting = !1, this.initConnecting = !1, this.shouldReconnect = !0, this.hasNotifyDisconnected = !
          1, this.logger.log("link::onConnect: socket onconnected, start login"), this.login(), this.api.reportLogs({
            event: "ws_connected"
          })
      }, r.onHandshakeFailed = function() {
        this.api.reportLogs({
          event: "ws_handshake_failed"
        }), this.onDisconnect(!1, "link::onHandshakeFailed")
      }, r.onConnectFailed = function() {
        this.api.reportLogs({
          event: "ws_connect_failed"
        }), this.onDisconnect(!1, "link::onConnectFailed")
      }, r.onError = function() {
        var e = arguments[0];
        if (e) {
          if (this.api.reportLogs({
              event: "connect_timeout"
            }), void 0 !== e.x5ImgDecodeStatus) return;
          if ("[object Object]" === Object.prototype.toString.call(e) && Object.keys(e).length <= 0) return;
          this.onMiscError("连接错误", new s(e, "LINK_ERROR", {
            callFunc: "link::onError"
          }))
        }
        this.connecting = !1
      }, r.onDisconnect = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        this.connected = e, this.connecting = !1, this.markAllCallbackInvalid(s.newNetworkError({
          callFunc: t
        })), this.stopHeartbeat(), this.reconnect()
      }, r.willReconnect = function() {
        return this.shouldReconnect && this.needReconnect && this.retryCount < this.reconnectionAttempts
      }, r.reconnect = function() {
        var e = this;
        if (e.willReconnect())
          if (e.socket && e.socket.socket && e.socket.socket.transport && e.socket.socket.transport.websocket) {
            e.logger.info("link::reconnect: on socket closed"), e.socket.socket.transport.onConnectionOver =
              function() {
                e.logger.log("link::reconnect: on connectionOver"), clearTimeout(e.reconnectTimer), e.doReconnect()
              };
            try {
              e.socket.socket.transport.websocket.close()
            } catch (t) {
              e.logger.warn("link::reconnect: force disconnect error:", t)
            }
          } else clearTimeout(e.reconnectTimer), e.reconnectTimer = setTimeout(function() {
            e.logger.info("link::reconnect: on socket timeout"), e.doReconnect()
          }, 3e4);
        else e.notifyDisconnect()
      }, r.doReconnect = function() {
        var e = this;
        e.socket = null, e.connected && (e.autoconnect = !0), e.retryCount++, e.appLogin = 1;
        var t = e.backoff.duration();
        e.logger.info("link::reconnect: will retry after " + t + "ms, retryCount " + e.retryCount), e.options.onwillreconnect({
          retryCount: e.retryCount,
          duration: t
        }), clearTimeout(e.connectTimer), e.connectTimer = setTimeout(function() {
          e.connect()
        }, t)
      }, r.notifyConnectError = function(e) {
        var t = s.newConnectError({
          message: e,
          callFunc: "link::notifyConnectError"
        });
        this.logger.error("link::notifyConnectError:", t), this.options.onerror(t)
      }, r.notifyDisconnect = function(e) {
        var t = this;
        t.hasNotifyDisconnected || (t.hasNotifyDisconnected = !0, t.disconnectSocket(), (e = e || new s).retryCount =
          t.retryCount, e.willReconnect = t.willReconnect(), t.backoff && t.backoff.reset(), t.retryCount = 0,
          t.socket && t.socket.socket && t.socket.socket.transport && t.socket.socket.transport.websocket ? (
            t.logger.info("link::notifyDisconnect: ondisconnected", e), t.socket.socket.transport.onConnectionOver =
            function() {
              t.socket = null, t.options.ondisconnect(e)
            }) : (t.logger.info("link::notifyDisconnect: ondisconnected/no transport ws", e), t.options.ondisconnect(
            e)), t.onWbNotifyHangup instanceof Function && t.onWbNotifyHangup({
            content: {
              account: t.account,
              channelId: null,
              timetag: +Date()
            }
          }))
      }, r.disconnectSocket = function() {
        if (this.isConnected() || this.connecting) try {
          this.connecting = !1, this.shouldReconnect = !1, this.needReconnect = !1, this.socket.disconnect()
        } catch (e) {
          this.logger.info("link::disconnectSocket: disconnect failed, error ", e)
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(47).fn,
        a = n(0),
        c = n(79),
        u = n(153);
      o.signalingCreate = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.type,
          n = e.channelName,
          r = e.ext;
        return a.verifyOptions(e, "type", "api::signalling"), this.sendCmdUsePromise("signalingCreate", {
          avSignalTag: {
            type: t,
            channelName: n,
            ext: r
          }
        }).then(function(e) {
          var t = e.avSignalTag;
          return Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingDelay = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingDelay", {
          avSignalTag: e
        }).then(function(e) {
          var t = e.avSignalTag;
          return Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingClose = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.offlineEnabled;
        return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingClose", {
          avSignalTag: a.merge(e, {
            isSave: !0 === t ? 1 : 0
          })
        }).then(function(e) {
          var t = e.avSignalTag;
          return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingJoin = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.offlineEnabled;
        return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingJoin", {
          avSignalTag: a.merge(e, {
            isSave: !0 === t ? 1 : 0
          })
        }).then(function(e) {
          var t = e.avSignalTag,
            n = t.members;
          return "string" == typeof t.members && (n = JSON.parse(t.members).map(function(e) {
            return u.parseAvSignalMember(e)
          })), t.members = n, Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingLeave = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.offlineEnabled;
        return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingLeave", {
          avSignalTag: a.merge(e, {
            isSave: !0 === t ? 1 : 0
          })
        }).then(function(e) {
          var t = e.avSignalTag;
          return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingGetChannelInfo = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.channelName;
        return a.verifyOptions(e, "channelName", "api::signalling"), this.sendCmdUsePromise(
          "signalingGetChannelInfo", {
            avSignalTag: {
              channelName: t
            }
          }).then(function(e) {
          var t = e.avSignalTag;
          return Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingInvite = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.account,
          n = e.offlineEnabled,
          r = e.pushInfo,
          s = void 0 === r ? {} : r;
        a.verifyOptions(e, "channelId requestId account", "api::signalling"), "object" === (0, i.default)(s.pushPayload) &&
          (s.pushPayload = JSON.stringify(s.pushPayload));
        var o = a.merge(e, s, {
          to: t,
          isSave: !0 === n ? 1 : 0,
          needPush: !0 === s.needPush ? 1 : 0,
          needBadge: !1 === s.needBadge ? 0 : 1
        });
        return this.sendCmdUsePromise("signalingInvite", {
          avSignalTag: o
        }).then(function(e) {
          var t = e.avSignalTag;
          return t.offlineEnabled = 1 === t.isSave, t.needBadge = 1 === t.needBadge, t.needPush = 1 === t.needPush,
            delete t.isSave, Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingCancel = function(e) {
        var t = e.account,
          n = e.offlineEnabled;
        return a.verifyOptions(e, "channelId requestId account", "api::signalling"), this.sendCmdUsePromise(
          "signalingCancel", {
            avSignalTag: a.merge(e, {
              to: t,
              isSave: !0 === n ? 1 : 0
            })
          }).then(function(e) {
          var t = e.avSignalTag;
          return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingCreateAndJoin = function(e) {
        var t = this,
          n = e.channelName,
          r = e.uid,
          s = void 0 === r ? 0 : r,
          i = e.offlineEnabled,
          o = void 0 === i || i,
          c = e.attachExt,
          u = void 0 === c ? "" : c;
        return this.signalingCreate(e).catch(function(e) {
          return 10405 === e.code ? (t.logger.warn("api::avSignal:signalingCall room already exists:", e),
            t.signalingGetChannelInfo({
              channelName: n
            })) : Promise.reject(e)
        }).then(function(e) {
          var n = {
            channelId: e.channelId,
            offlineEnabled: o,
            attachExt: u
          };
          return s && a.merge(n, {
            uid: s
          }), t.signalingJoin(n)
        })
      }, o.signalingCall = function(e) {
        var t = this,
          n = e.account,
          r = e.offlineEnabled,
          s = e.requestId;
        a.verifyOptions(e, "type requestId account", "api::signalling");
        var i = "";
        return this.signalingCreateAndJoin(e).then(function(o) {
          t.logger.log("api::avSignal:signalingCall join:", o);
          var a = {
            channelId: i = o.channelId || i,
            account: n,
            requestId: s,
            offlineEnabled: r,
            attachExt: e.attachExt || "",
            pushInfo: e.pushInfo || {}
          };
          return t.signalingInvite(a)
        })
      }, o.signalingReject = function(e) {
        var t = e.account,
          n = e.offlineEnabled;
        return a.verifyOptions(e, "channelId requestId account", "api::signalling"), this.sendCmdUsePromise(
          "signalingReject", {
            avSignalTag: a.merge(e, {
              to: t,
              isSave: !0 === n ? 1 : 0
            })
          }).then(function(e) {
          var t = e.avSignalTag;
          return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingAccept = function(e) {
        var t = e.account,
          n = e.offlineEnabled;
        return a.verifyOptions(e, "channelId requestId account", "api::signalling"), this.sendCmdUsePromise(
          "signalingAccept", {
            avSignalTag: a.merge(e, {
              to: t,
              isSave: !0 === n ? 1 : 0
            })
          }).then(function(e) {
          var t = e.avSignalTag;
          return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingControl = function(e) {
        var t = e.account;
        return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingControl", {
          avSignalTag: a.merge(e, t ? {
            to: t
          } : {})
        }).then(function(e) {
          var t = e.avSignalTag;
          return Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingSync = function() {
        return this.sendCmdUsePromise("sync", {
          sync: {
            avSignal: 0
          }
        }).then(function(e) {
          var t = e.avSignalTag;
          return Promise.resolve(t)
        }).catch(function(e) {
          return Promise.reject(u.parseAvSignalError(e))
        })
      }, o.signalingMarkMsgRead = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        a.verifyOptions(e, "msgid", "api::signalling");
        var t = c.idMap.avSignal;
        return this.sendCmdUsePromise("batchMarkRead", {
          sid: t.id,
          cid: t.signalingNotify,
          ids: e.msgid
        })
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(47).fn,
        s = n(0),
        i = n(36),
        o = n(2),
        a = n(22);
      (a = a || {}).name = a.name || "", a.version = a.version || "", r.reportLogs = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = this,
          n = t.options,
          r = o.ntServerAddress;
        if (r) {
          var c = o.info;
          e = s.merge(e, {
            appkey: n.appKey,
            uid: n.account,
            os: "web",
            session: t.protocol.sdkSession || "",
            ver: c.sdkVersion,
            type: t.subType,
            platform: "" + a.name.toLowerCase() + a.version.replace(/(\.\d+)+$/, "")
          });
          var u = r + s.genUrlSep(r),
            l = [];
          for (var m in e) l.push(m + "=" + e[m]);
          u += l.join("&"), i(u, {
            proxyUrl: s.url2origin(u) + "/lbs/res/cors/nej_proxy_frame.html",
            timeout: o.xhrTimeout,
            onload: function() {},
            onerror: function(e) {
              t.logger.info("report::ajax report error", e)
            }
          })
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(0),
        a = n(47).fn;

      function c(e, t, n, r) {
        var s = !1,
          i = "";
        if (1 === n ? e.indexOf(t) >= 0 && (s = !0, i = t) : 2 === n && (i = new RegExp(t, "g")).test(e) && (s = !
            0), s && "" !== i) switch (r) {
          case 1:
            return e.replace(i, "**");
          case 2:
            return {
              code: 2
            };
          case 3:
            return {
              code: 3
            }
        }
        return e
      }

      function u(e, t) {
        for (var n = t.match, r = t.operate, s = e, o = 0; o < t.keys.length; o++) {
          var a = t.keys[o],
            u = a.match || n,
            l = a.operate || r;
          try {
            if ("object" === (void 0 === (s = c(s, a.key, u, l)) ? "undefined" : (0, i.default)(s))) return s
          } catch (e) {
            this.logger.warn("misc::filterContent: js cannot parse this regexp ", e)
          }
        }
        return s
      }
      a.uploadSdkLogUrl = function(e) {
        return o.verifyOptions(e, "url", "misc::uploadSdkLogUrl"), this.cbAndSendCmd("uploadSdkLogUrl", e)
      }, a.getClientAntispamLexicon = function(e) {
        var t = this,
          n = (e = e || {}).done;
        n instanceof Function || (n = function() {}), e = {
          clientAntispam: {
            version: 0
          }
        };
        var r = this;
        return this.protocol.sendCmd("getClientAntispam", e, function(e, s, i) {
          e ? (r.protocol.logger.error("misc::getClientAntispamLexicon:", e), n.call(t, e, {})) : (n.call(t,
            null, i), r.antispamLexicon = i.clientAntispam || {})
        })
      }, a.filterClientAntispam = function(e) {
        var t = e.content,
          n = e.antispamLexicon;
        if (!t) return {
          code: 404,
          errmsg: "待反垃圾文本content不存在"
        };
        n = n || this.antispamLexicon || {};
        var r = this.antispamLexicon && this.antispamLexicon.thesaurus;
        if (!r) return {
          code: 404,
          errmsg: "没有反垃圾词库或者词库格式不合法"
        };
        try {
          r = JSON.parse(r).thesaurus
        } catch (e) {
          return this.protocol.logger.error("misc::filterClientAntispam: parse thesaurus error"), {
            code: 500,
            errmsg: "反垃圾词库格式不合法"
          }
        }
        for (var s = t, o = 0; o < r.length; o++)
          if ("object" === (void 0 === (s = u.call(this, s, r[o])) ? "undefined" : (0, i.default)(s))) {
            if (2 === s.code) return {
              code: 200,
              type: 2,
              errmsg: "建议拒绝发送",
              content: t,
              result: ""
            };
            if (3 === s.code) return {
              code: 200,
              type: 3,
              errmsg: "建议服务器处理反垃圾，发消息带上字段clientAntiSpam",
              content: t,
              result: t
            }
          } return s === t ? {
          code: 200,
          type: 0,
          errmsg: "",
          content: t,
          result: s
        } : {
          code: 200,
          type: 1,
          errmsg: "已对特殊字符做了过滤",
          content: t,
          result: s
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        },
        o = n(67);
      var a, c = n(0),
        u = n(47).fn;
      u.viewImageSync = function(e) {
        var t = this.options;
        c.verifyOptions(e, "url", "nos::viewImageSync");
        var n = e.url,
          r = (0, o.url2object)(n),
          s = r.protocol,
          a = r.hostname,
          u = r.path,
          l = r.query;
        if ("boolean" == typeof e.strip && (l.stripmeta = e.strip ? 1 : 0), "number" == typeof e.quality && (c.verifyParamMin(
            "quality", e.quality, 0, "nos::viewImageSync"), c.verifyParamMax("quality", e.quality, 100,
            "nos::viewImageSync"), l.quality = Math.round(e.quality)), "boolean" == typeof e.interlace && (l.interlace =
            e.interlace ? 1 : 0), "number" == typeof e.rotate && (l.rotate = Math.round(e.rotate)), "object" ===
          (0, i.default)(e.thumbnail)) {
          var m = e.thumbnail.mode || "crop",
            d = e.thumbnail.width,
            p = e.thumbnail.height;
          if (d >= 0 && p >= 0 && d < 4096 && p < 4096 && (d > 0 || p > 0)) {
            switch (m) {
              case "crop":
                m = "y";
                break;
              case "contain":
                m = "x";
                break;
              case "cover":
                m = "z";
                break;
              default:
                m = "x"
            }
            l.thumbnail = "" + d + m + p
          }
        }
        if (t.downloadUrl) {
          var f = (0, o.url2object)(e.url),
            g = t.downloadUrl,
            h = f.path,
            y = h.indexOf("/");
          if (-1 !== y) {
            var v = h.substring(0, y),
              b = h.substring(y + 1);
            g = g.replace("{bucket}", v).replace("{object}", b)
          }
          var M = (0, o.url2object)(g);
          return (0, o.object2url)({
            protocol: M.protocol,
            hostname: M.hostname,
            path: M.path,
            query: c.merge(M.query, l)
          })
        }
        return (0, o.object2url)({
          protocol: s,
          hostname: a,
          path: u,
          query: l
        })
      }, u.viewImageStripMeta = function(e) {
        c.verifyOptions(e, "url strip", "nos::viewImageStripMeta"), c.verifyParamType("strip", e.strip,
          "boolean", "nos::viewImageStripMeta");
        var t = "stripmeta=" + (e.strip ? 1 : 0),
          n = (0, o.genUrlSep)(e.url);
        return e.url + n + t
      }, u.viewImageQuality = function(e) {
        c.verifyOptions(e, "url quality", "nos::viewImageQuality"), c.verifyParamType("quality", e.quality,
          "number", "nos::viewImageQuality"), c.verifyParamMin("quality", e.quality, 0,
          "nos::viewImageQuality"), c.verifyParamMax("quality", e.quality, 100, "nos::viewImageQuality");
        var t = "quality=" + Math.round(e.quality),
          n = (0, o.genUrlSep)(e.url);
        return e.url + n + t
      }, u.viewImageInterlace = function(e) {
        c.verifyOptions(e, "url", "nos::viewImageInterlace");
        var t = (0, o.genUrlSep)(e.url);
        return e.url + t + "interlace=1"
      }, u.viewImageRotate = function(e) {
        for (c.verifyOptions(e, "url angle", "nos::viewImageRotate"), c.verifyParamType("angle", e.angle,
            "number", "nos::viewImageRotate"); e.angle < 0;) e.angle = e.angle + 360;
        e.angle = e.angle % 360;
        var t = "rotate=" + Math.round(e.angle),
          n = (0, o.genUrlSep)(e.url);
        return e.url + n + t
      }, u.viewImageBlur = function(e) {
        c.verifyOptions(e, "url radius sigma", "nos::viewImageBlur"), c.verifyParamType("radius", e.radius,
          "number", "nos::viewImageBlur"), c.verifyParamMin("radius", e.radius, 1, "nos::viewImageBlur"), c.verifyParamMax(
          "radius", e.radius, 50, "nos::viewImageBlur"), c.verifyParamType("sigma", e.sigma, "number",
          "nos::viewImageBlur"), c.verifyParamMin("sigma", e.sigma, 0, "nos::viewImageBlur");
        var t = "blur=" + Math.round(e.radius) + "x" + Math.round(e.sigma),
          n = (0, o.genUrlSep)(e.url);
        return e.url + n + t
      }, u.viewImageCrop = function(e) {
        c.verifyOptions(e, "url x y width height", "nos::viewImageCrop"), c.verifyParamType("x", e.x, "number",
          "nos::viewImageCrop"), c.verifyParamMin("x", e.x, 0, "nos::viewImageCrop"), c.verifyParamType("y",
          e.y, "number", "nos::viewImageCrop"), c.verifyParamMin("y", e.y, 0, "nos::viewImageCrop"), c.verifyParamType(
          "width", e.width, "number", "nos::viewImageCrop"), c.verifyParamMin("width", e.width, 0,
          "nos::viewImageCrop"), c.verifyParamType("height", e.height, "number", "nos::viewImageCrop"), c.verifyParamMin(
          "height", e.height, 0, "nos::viewImageCrop");
        var t = "crop=" + Math.round(e.x) + "_" + Math.round(e.y) + "_" + Math.round(e.width) + "_" + Math.round(
            e.height),
          n = (0, o.genUrlSep)(e.url);
        return e.url + n + t
      }, u.viewImageThumbnail = (a = {
        cover: "z",
        contain: "x",
        crop: "y"
      }, function(e) {
        c.verifyOptions(e, "url mode", "nos::viewImageThumbnail"), c.verifyParamValid("mode", e.mode, Object.keys(
            a), "nos::viewImageThumbnail"), "contain" === e.mode ? c.verifyParamAtLeastPresentOne(e,
            "width height", "nos::viewImageThumbnail") : c.verifyOptions(e, "width height",
            "nos::viewImageThumbnail"), c.undef(e.width) && (e.width = 0), c.undef(e.height) && (e.height = 0),
          c.verifyParamType("width", e.width, "number", "nos::viewImageThumbnail"), c.verifyParamMin("width",
            e.width, 0, "nos::viewImageThumbnail"), c.verifyParamType("height", e.height, "number",
            "nos::viewImageThumbnail"), c.verifyParamMin("height", e.height, 0, "nos::viewImageThumbnail");
        var t = Math.round(e.width),
          n = Math.round(e.height),
          r = "thumbnail=" + t + a[e.mode] + n;
        "crop" === e.mode && c.notundef(e.axis) && (c.undef(e.axis.x) && (e.axis.x = 5), c.undef(e.axis.y) &&
          (e.axis.y = 5), c.verifyParamMin("axis.x", e.axis.x, 0, "nos::viewImageThumbnail"), c.verifyParamMax(
            "axis.x", e.axis.x, 10, "nos::viewImageThumbnail"), c.verifyParamMin("axis.y", e.axis.y, 0,
            "nos::viewImageThumbnail"), c.verifyParamMax("axis.y", e.axis.y, 10, "nos::viewImageThumbnail"),
          r = r + "&axis=" + Math.round(e.axis.x) + "_" + Math.round(e.axis.y)), c.notundef(e.enlarge) && (
          c.verifyParamType("enlarge", e.enlarge, "boolean", "nos::viewImageThumbnail"), e.enlarge && (r +=
            "&enlarge=1"));
        var s = (0, o.genUrlSep)(e.url);
        return e.url + s + r
      })
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(0),
        i = n(47).fn,
        o = n(154),
        a = n(156),
        c = n(26);
      i.transDoc = function(e) {
        s.verifyOptions(e, "fileInput done", "nos::transDoc");
        try {
          var t = e.fileInput.files[0],
            n = e.fileInputName = t.name,
            r = {
              ppt: 1,
              pptx: 2,
              pdf: 3
            },
            i = n.substring(n.lastIndexOf(".") + 1);
          if (["ppt", "pdf", "pptx"].indexOf(i) < 0) return void e.done(c.newNoFileError(
            "请上传正确格式的文件【ppt, pptx, pdf】", {
              callFunc: "nos: transDoc",
              fileInput: e.fileInput
            }), e)
        } catch (t) {
          return void e.done(c.newNoFileError("请上传正确的文件节点", {
            callFunc: "msg::previewFile",
            fileInput: e.fileInput
          }), e)
        }
        var o = JSON.stringify(a.genResponseBody("file") || {}).replace(/"/gi, '\\"'),
          u = {
            transToken: {
              name: n,
              type: r[i],
              transType: "png" === e.transcode ? 11 : 10,
              size: t.size,
              body: o
            }
          };
        this.getNosTokenTrans({
          responseBody: u,
          nosToken: {
            nosScene: e.nosScene || this.nosScene,
            nosSurvivalTime: e.nosSurvivalTime
          },
          callback: function(t, n) {
            t ? e.done(t) : (e.nosToken = n.nosToken, e.docId = n.docId, this._doPreviewFile(e))
          }.bind(this)
        })
      }, i.getSimpleNosToken = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return e.num = 1, s.verifyOptions(e), this.cbAndSendCmd("getSimpleNosToken", e)
      }, i.getNosToken = function(e) {
        var t = e.callback,
          n = e.nosToken,
          r = e.responseBody,
          s = {
            tag: n.nosScene
          };
        n.nosSurvivalTime && n.nosSurvivalTime !== 1 / 0 && (s.expireSec = n.nosSurvivalTime), this.sendCmd(
          "getNosToken", {
            responseBody: r,
            nosToken: s
          }, t)
      }, i.getNosTokenTrans = function(e) {
        this.sendCmd("getNosTokenTrans", e.responseBody, e.callback)
      }, i.packFileDownloadName = function(e) {
        s.verifyOptions(e, "url name", !0, "", "nos::packFileDownloadName");
        var t = e.url;
        return t + s.genUrlSep(t) + "download=" + encodeURIComponent(e.name)
      }, i.audioToMp3 = function(e) {
        s.verifyOptions(e, "url", "nos::audioToMp3");
        var t = e.url;
        return t + s.genUrlSep(t) + "audioTrans&type=mp3"
      }, i.removeFile = function(e) {
        this.sendCmd("removeFile", e, e.callback)
      }, i.fetchFile = function(e) {
        this.sendCmd("fetchFile", e, e.callback)
      }, i.fetchFileList = function(e) {
        this.sendCmd("fetchFileList", e, e.callback)
      }, i.stripImageMeta = function(e) {
        return this.beforeProcessImage(e, "stripmeta")
      }, i.qualityImage = function(e) {
        return this.beforeProcessImage(e, "quality")
      }, i.interlaceImage = function(e) {
        return this.beforeProcessImage(e, "interlace")
      }, i.rotateImage = function(e) {
        return this.beforeProcessImage(e, "rotate")
      }, i.blurImage = function(e) {
        return this.beforeProcessImage(e, "blur")
      }, i.cropImage = function(e) {
        return this.beforeProcessImage(e, "crop")
      }, i.thumbnailImage = function(e) {
        return this.beforeProcessImage(e, "thumbnail")
      }, i.beforeProcessImage = function(e, t) {
        var n = s.copy(e);
        return n.type = t, e.ops = [n], this.processImage(e)
      }, i.processImage = function(e) {
        var t = this;
        s.verifyOptions(e, "url ops", !0, "", "nos::processImage"), s.verifyParamType("ops", e.ops, "array",
          "nos::processImage");
        var n = e.ops.map(function(e) {
          return s.verifyOptions(e, "type", !0, "", "nos::processImage"), s.verifyParamValid("type", e.type,
            o.validTypes, "nos::processImage"), t["gen" + e.type.slice(0, 1).toUpperCase() + e.type.slice(
            1) + "Op"](e)
        });
        t.processCallback(e), t.sendCmd("processImage", {
          url: e.url,
          imageOps: n
        }, e.callback)
      }, i.genStripmetaOp = function(e) {
        return new o({
          type: e.type,
          stripmeta: e.strip ? 1 : 0
        })
      }, i.genQualityOp = function(e) {
        s.verifyOptions(e, "quality", !0, "", "nos::genQualityOp"), s.verifyParamType("quality", e.quality,
          "number", "nos::genQualityOp"), s.verifyParamMin("quality", e.quality, 0, "nos::genQualityOp"), s.verifyParamMax(
          "quality", e.quality, 100, "nos::genQualityOp");
        var t = Math.round(e.quality);
        return new o({
          type: e.type,
          qualityQuality: t
        })
      }, i.genInterlaceOp = function(e) {
        return new o({
          type: e.type
        })
      }, i.genRotateOp = function(e) {
        for (s.verifyOptions(e, "angle", !0, "", "nos::genRotateOp"), s.verifyParamType("angle", e.angle,
            "number", "nos::genRotateOp"); e.angle < 0;) e.angle = e.angle + 360;
        e.angle = e.angle % 360;
        var t = Math.round(e.angle);
        return new o({
          type: e.type,
          rotateAngle: t
        })
      }, i.genBlurOp = function(e) {
        s.verifyOptions(e, "radius sigma", "nos::genBlurOp"), s.verifyParamType("radius", e.radius, "number",
          "nos::genBlurOp"), s.verifyParamMin("radius", e.radius, 1, "nos::genBlurOp"), s.verifyParamMax(
          "radius", e.radius, 50, "nos::genBlurOp"), s.verifyParamType("sigma", e.sigma, "number",
          "nos::genBlurOp"), s.verifyParamMin("sigma", e.sigma, 0, "nos::genBlurOp");
        var t = Math.round(e.radius),
          n = Math.round(e.sigma);
        return new o({
          type: e.type,
          blurRadius: t,
          blurSigma: n
        })
      }, i.genCropOp = function(e) {
        s.verifyOptions(e, "x y width height", "nos::genCropOp"), s.verifyParamType("x", e.x, "number",
          "nos::genCropOp"), s.verifyParamMin("x", e.x, 0, "nos::genCropOp"), s.verifyParamType("y", e.y,
          "number", "nos::genCropOp"), s.verifyParamMin("y", e.y, 0, "nos::genCropOp"), s.verifyParamType(
          "width", e.width, "number", "nos::genCropOp"), s.verifyParamMin("width", e.width, 0,
          "nos::genCropOp"), s.verifyParamType("height", e.height, "number", "nos::genCropOp"), s.verifyParamMin(
          "height", e.height, 0, "nos::genCropOp");
        var t = Math.round(e.x),
          n = Math.round(e.y),
          r = Math.round(e.width),
          i = Math.round(e.height);
        return new o({
          type: e.type,
          cropX: t,
          cropY: n,
          cropWidth: r,
          cropHeight: i
        })
      }, i.genThumbnailOp = (r = {
        cover: "z",
        contain: "x",
        crop: "y"
      }, function(e) {
        s.verifyOptions(e, "mode", "nos::genThumbnailOp"), s.verifyParamValid("mode", e.mode, Object.keys(r),
            "nos::genThumbnailOp"), "contain" === e.mode ? s.verifyParamAtLeastPresentOne(e, "width height",
            "nos::genThumbnailOp") : s.verifyOptions(e, "width height", "nos::genThumbnailOp"), s.undef(e.width) &&
          (e.width = 0), s.undef(e.height) && (e.height = 0), s.verifyParamType("width", e.width, "number",
            "nos::genThumbnailOp"), s.verifyParamMin("width", e.width, 0, "nos::genThumbnailOp"), s.verifyParamType(
            "height", e.height, "number", "nos::genThumbnailOp"), s.verifyParamMin("height", e.height, 0,
            "nos::genThumbnailOp");
        var t = Math.round(e.width),
          n = Math.round(e.height),
          i = new o({
            type: e.type,
            thumbnailMode: r[e.mode],
            thumbnailWidth: t,
            thumbnailHeight: n
          });
        if ("crop" === e.mode && s.notundef(e.axis)) {
          s.undef(e.axis.x) && (e.axis.x = 5), s.undef(e.axis.y) && (e.axis.y = 5), s.verifyParamMin("axis.x",
            e.axis.x, 0, "nos::genThumbnailOp"), s.verifyParamMax("axis.x", e.axis.x, 10,
            "nos::genThumbnailOp"), s.verifyParamMin("axis.y", e.axis.y, 0, "nos::genThumbnailOp"), s.verifyParamMax(
            "axis.y", e.axis.y, 10, "nos::genThumbnailOp");
          var a = Math.round(e.axis.x),
            c = Math.round(e.axis.y);
          i.thumbnailAxisX = a, i.thumbnailAxisY = c
        }
        return s.notundef(e.enlarge) && (s.verifyParamType("enlarge", e.enlarge, "boolean",
          "nos::genThumbnailOp"), e.enlarge && (i.thumbnailEnlarge = 1)), i
      }), i.getNosOriginUrl = function(e) {
        s.verifyOptions(e, "safeShortUrl", !0, "", "nos::getNosOriginUrl"), s.verifyParamType("safeShortUrl", e
            .safeShortUrl, "string", "nos::getNosOriginUrl"), /^http(s)?:/.test(e.safeShortUrl) && ~e.safeShortUrl
          .indexOf("im_url=1") ? (this.processCallback(e), this.sendCmd("getNosOriginUrl", {
            nosFileUrlTag: {
              safeUrl: e.safeShortUrl
            }
          }, e.callback)) : e.done(new c("参数 “safeShortUrl” 内容非文件安全短链", {
            callFunc: "nos: getNosOriginUrl"
          }), e)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(2),
        s = n(0),
        i = n(26),
        o = n(36).upload,
        a = n(36).chunkUpload,
        c = n(36).abort,
        u = s.supportFormData;

      function l(e) {
        var t = this;
        t.options = s.copy(e), s.verifyOptions(e, "url fileName"), s.verifyParamPresentJustOne(e,
            "blob fileInput"), s.verifyCallback(e, "beginupload uploadprogress uploaddone"), e.fileInput && (e.fileInput =
            s.verifyFileInput(e.fileInput)), e.type && s.verifyFileType(e.type), e.timeout ? s.verifyParamType(
            "timeout", e.timeout, "number") : e.timeout = 6e5, s.verifyFileUploadCallback(e), e.data = {}, e.params &&
          s.merge(e.data, e.params);
        var n = e.fileName,
          c = e.fileInput;
        if (u)
          if (c) {
            var l = e.type ? s.filterFiles(c.files, e.type) : [].slice.call(c.files, 0);
            if (!l || !l.length) return void e.uploaddone(i.newWrongFileTypeError("未读取到" + e.type +
              "类型的文件, 请确保文件选择节点的文件不为空, 并且请确保选择了" + e.type + "类型的文件"));
            e.data[n] = l[0];
            var m = c.files[0].size;
            if (e.fileInputMaxSize && m > e.fileInputMaxSize) return void e.uploaddone(i.newFileTooLargeError(
              "上传文件大小超过" + e.fileInputMaxSize + "限制"));
            if (!e.fileInputCommonUpload) return m > r.chunkMaxSize ? void e.uploaddone(i.newFileTooLargeError(
              "直传文件大小超过" + r.chunkMaxSize + "限制")) : void(t.sn = a(e, n, t));
            if (m > r.commonMaxSize) return void e.uploaddone(i.newFileTooLargeError("普通上传文件大小超过" + r.commonMaxSize +
              "限制"))
          } else e.blob && (e.data[n] = e.blob);
        else s.dataset(c, "name", n), e.data.input = c;
        var d = {
          data: e.data,
          onaftersend: function() {
            e.beginupload(t)
          },
          onuploading: function(t) {
            var n = Math.floor(1e4 * t.loaded / t.total) / 100,
              r = {
                docId: e.docId,
                total: t.total,
                loaded: t.loaded,
                percentage: n,
                percentageText: n + "%"
              };
            e.fileInput && (r.fileInput = e.fileInput), e.blob && (r.blob = e.blob), e.uploadprogress(r)
          },
          onload: function(n) {
            n.docId = e.docId, n.Error ? t.onError(n) : e.uploaddone(null, n)
          },
          onerror: function(n) {
            try {
              if (n.result) var r = JSON.parse(n.result);
              else r = n;
              t.onError(r)
            } catch (r) {
              console.log("error: ignore error if could not parse obj.result", r), e.uploaddone(new i(n.message,
                n.code), t.options)
            }
          }
        };
        u || (d.mode = "iframe"), d.putFileAtEnd = !0, t.sn = o(e.url, d)
      }
      l.prototype.onError = function(e) {
        var t, n, r, s = this.options;
        n = (t = (e = e || {}).Error || e || {}).Code || t.code || "unknown", r = t.Message || t.message ||
          "未知错误", s.uploaddone(new i(n + "(" + r + ")", n))
      }, l.prototype.abort = function() {
        c(this.sn)
      }, e.exports = l
    },
    function(e, t, n) {
      var r, s, i;
      ! function(n, o) {
        "use strict";
        s = [], void 0 === (i = "function" == typeof(r = function(e) {
          return function(t) {
            t = t || {},
              function() {
                t.arrayAccessForm = t.arrayAccessForm || "none", t.emptyNodeForm = t.emptyNodeForm ||
                  "text", t.jsAttributeFilter = t.jsAttributeFilter, t.jsAttributeConverter = t.jsAttributeConverter,
                  t.attributeConverters = t.attributeConverters || [], t.datetimeAccessFormPaths = t.datetimeAccessFormPaths ||
                  [], t.arrayAccessFormPaths = t.arrayAccessFormPaths || [], void 0 === t.enableToStringFunc &&
                  (t.enableToStringFunc = !0);
                void 0 === t.skipEmptyTextNodesForObj && (t.skipEmptyTextNodesForObj = !0);
                void 0 === t.stripWhitespaces && (t.stripWhitespaces = !0);
                void 0 === t.useDoubleQuotes && (t.useDoubleQuotes = !0);
                void 0 === t.ignoreRoot && (t.ignoreRoot = !1);
                void 0 === t.escapeMode && (t.escapeMode = !0);
                void 0 === t.attributePrefix && (t.attributePrefix = "_");
                void 0 === t.selfClosingElements && (t.selfClosingElements = !0);
                void 0 === t.keepCData && (t.keepCData = !1);
                void 0 === t.jsDateUTC && (t.jsDateUTC = !1)
              }(),
              function() {
                function e(e) {
                  var t = String(e);
                  return 1 === t.length && (t = "0" + t), t
                }
                "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
                  return this.replace(/^\s+|^\n+|(\s|\n)+$/g, "")
                });
                "function" != typeof Date.prototype.toISOString && (Date.prototype.toISOString = function() {
                  return this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) +
                    "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) +
                    "." + String((this.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z"
                })
              }();
            var n = {
              ELEMENT_NODE: 1,
              TEXT_NODE: 3,
              CDATA_SECTION_NODE: 4,
              COMMENT_NODE: 8,
              DOCUMENT_NODE: 9
            };

            function r(e) {
              var t = e.localName;
              return null == t && (t = e.baseName), null != t && "" !== t || (t = e.nodeName), t
            }

            function s(e) {
              return "string" == typeof e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g,
                "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;") : e
            }

            function i(e, n, r) {
              switch (t.arrayAccessForm) {
                case "property":
                  e[n] instanceof Array ? e[n + "_asArray"] = e[n] : e[n + "_asArray"] = [e[n]]
              }
              if (!(e[n] instanceof Array) && t.arrayAccessFormPaths.length > 0) {
                for (var s = !1, i = 0; i < t.arrayAccessFormPaths.length; i++) {
                  var o = t.arrayAccessFormPaths[i];
                  if ("string" == typeof o) {
                    if (o === r) {
                      s = !0;
                      break
                    }
                  } else if (o instanceof RegExp) {
                    if (o.test(r)) {
                      s = !0;
                      break
                    }
                  } else if ("function" == typeof o && o(n, r)) {
                    s = !0;
                    break
                  }
                }
                s && (e[n] = [e[n]])
              }
            }

            function o(e) {
              var t = e.split(/[-T:+Z]/g),
                n = new Date(t[0], t[1] - 1, t[2]),
                r = t[5].split(".");
              if (n.setHours(t[3], t[4], r[0]), r.length > 1 && n.setMilliseconds(r[1]), t[6] && t[7]) {
                var s = 60 * t[6] + Number(t[7]),
                  i = /\d\d-\d\d:\d\d$/.test(e) ? "-" : "+";
                s = 0 + ("-" === i ? -1 * s : s), n.setMinutes(n.getMinutes() - s - n.getTimezoneOffset())
              } else -1 !== e.indexOf("Z", e.length - 1) && (n = new Date(Date.UTC(n.getFullYear(), n.getMonth(),
                n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds())));
              return n
            }

            function a(e, s) {
              for (var a = {
                  __cnt: 0
                }, u = e.childNodes, l = 0; l < u.length; l++) {
                var m = u.item(l),
                  d = r(m);
                m.nodeType !== n.COMMENT_NODE && (a.__cnt++, null == a[d] ? (a[d] = c(m, s + "." + d), i(
                  a, d, s + "." + d)) : (a[d] instanceof Array || (a[d] = [a[d]], i(a, d, s + "." + d)),
                  a[d][a[d].length] = c(m, s + "." + d)))
              }
              for (var p = 0; p < e.attributes.length; p++) {
                var f = e.attributes.item(p);
                a.__cnt++;
                for (var g = f.value, h = 0; h < t.attributeConverters.length; h++) {
                  var y = t.attributeConverters[h];
                  y.test.call(null, f.name, f.value) && (g = y.convert.call(null, f.name, f.value))
                }
                a[t.attributePrefix + f.name] = g
              }
              var v = e.prefix;
              return v && (a.__cnt++, a.__prefix = v), a["#text"] && (a.__text = a["#text"], a.__text instanceof Array &&
                  (a.__text = a.__text.join("\n")), t.escapeMode && (a.__text = a.__text.replace(/&lt;/g,
                    "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(
                    /&amp;/g, "&")), t.stripWhitespaces && (a.__text = a.__text.trim()), delete a["#text"],
                  "property" === t.arrayAccessForm && delete a["#text_asArray"], a.__text = function(e, n,
                    r) {
                    if (t.datetimeAccessFormPaths.length > 0)
                      for (var s = r.split(".#")[0], i = 0; i < t.datetimeAccessFormPaths.length; i++) {
                        var a = t.datetimeAccessFormPaths[i];
                        if ("string" == typeof a) {
                          if (a === s) return o(e)
                        } else if (a instanceof RegExp) {
                          if (a.test(s)) return o(e)
                        } else if ("function" == typeof a && a(s)) return o(e)
                      }
                    return e
                  }(a.__text, 0, s + ".#text")), a.hasOwnProperty("#cdata-section") && (a.__cdata = a[
                    "#cdata-section"], delete a["#cdata-section"], "property" === t.arrayAccessForm &&
                  delete a["#cdata-section_asArray"]), 1 === a.__cnt && a.__text ? a = a.__text : 0 ===
                a.__cnt && "text" === t.emptyNodeForm ? a = "" : a.__cnt > 1 && void 0 !== a.__text && t.skipEmptyTextNodesForObj &&
                (t.stripWhitespaces && "" === a.__text || "" === a.__text.trim()) && delete a.__text,
                delete a.__cnt, t.keepCData || a.hasOwnProperty("__text") || !a.hasOwnProperty("__cdata") ?
                (t.enableToStringFunc && (a.__text || a.__cdata) && (a.toString = function() {
                  return (this.__text ? this.__text : "") + (this.__cdata ? this.__cdata : "")
                }), a) : a.__cdata ? a.__cdata : ""
            }

            function c(e, s) {
              return e.nodeType === n.DOCUMENT_NODE ? function(e) {
                  for (var s = {}, i = e.childNodes, o = 0; o < i.length; o++) {
                    var a = i.item(o);
                    if (a.nodeType === n.ELEMENT_NODE) {
                      var u = r(a);
                      t.ignoreRoot ? s = c(a, u) : s[u] = c(a, u)
                    }
                  }
                  return s
                }(e) : e.nodeType === n.ELEMENT_NODE ? a(e, s) : e.nodeType === n.TEXT_NODE || e.nodeType ===
                n.CDATA_SECTION_NODE ? e.nodeValue : null
            }

            function u(e, n, r, i) {
              var o = "<" + (e && e.__prefix ? e.__prefix + ":" : "") + n;
              if (r)
                for (var a = 0; a < r.length; a++) {
                  var c = r[a],
                    u = e[c];
                  t.escapeMode && (u = s(u)), o += " " + c.substr(t.attributePrefix.length) + "=", t.useDoubleQuotes ?
                    o += '"' + u + '"' : o += "'" + u + "'"
                }
              return o += i ? " />" : ">"
            }

            function l(e, t) {
              return "</" + (e && e.__prefix ? e.__prefix + ":" : "") + t + ">"
            }

            function m(e, n) {
              return "property" === t.arrayAccessForm && (r = n.toString(), s = "_asArray", -1 !== r.indexOf(
                  s, r.length - s.length)) || 0 === n.toString().indexOf(t.attributePrefix) || 0 === n.toString()
                .indexOf("__") || e[n] instanceof Function;
              var r, s
            }

            function d(e) {
              var t = 0;
              if (e instanceof Object)
                for (var n in e) m(e, n) || t++;
              return t
            }

            function p(e) {
              var n = [];
              if (e instanceof Object)
                for (var r in e) - 1 === r.toString().indexOf("__") && 0 === r.toString().indexOf(t.attributePrefix) &&
                  n.push(r);
              return n
            }

            function f(e) {
              var n = "";
              return e instanceof Object ? n += function(e) {
                var n = "";
                e.__cdata && (n += "<![CDATA[" + e.__cdata + "]]>");
                e.__text && (t.escapeMode ? n += s(e.__text) : n += e.__text);
                return n
              }(e) : null !== e && (t.escapeMode ? n += s(e) : n += e), n
            }

            function g(e, n, r) {
              var s = "";
              if (t.jsAttributeFilter && t.jsAttributeFilter.call(null, n, e)) return s;
              if (t.jsAttributeConverter && (e = t.jsAttributeConverter.call(null, n, e)), null != e &&
                "" !== e || !t.selfClosingElements)
                if ("object" == typeof e)
                  if ("[object Array]" === Object.prototype.toString.call(e)) s += function(e, t, n) {
                    var r = "";
                    if (0 === e.length) r += u(e, t, n, !0);
                    else
                      for (var s = 0; s < e.length; s++) r += g(e[s], t, p(e[s]));
                    return r
                  }(e, n, r);
                  else if (e instanceof Date) s += u(e, n, r, !1), s += t.jsDateUTC ? e.toUTCString() : e
                .toISOString(), s += l(e, n);
              else {
                var i = d(e);
                i > 0 || e.__text || e.__cdata ? (s += u(e, n, r, !1), s += h(e), s += l(e, n)) : t.selfClosingElements ?
                  s += u(e, n, r, !0) : (s += u(e, n, r, !1), s += l(e, n))
              } else s += u(e, n, r, !1), s += f(e), s += l(e, n);
              else s += u(e, n, r, !0);
              return s
            }

            function h(e) {
              var t = "",
                n = d(e);
              if (n > 0)
                for (var r in e)
                  if (!m(e, r)) {
                    var s = e[r],
                      i = p(s);
                    t += g(s, r, i)
                  } return t += f(e)
            }

            function y(t) {
              if (void 0 === t) return null;
              if ("string" != typeof t) return null;
              var n = null,
                r = null;
              if (e) n = new e, r = n.parseFromString(t, "text/xml");
              else if (window && window.DOMParser) {
                n = new window.DOMParser;
                var s = null,
                  i = window.ActiveXObject || "ActiveXObject" in window;
                if (!i) try {
                  s = n.parseFromString("INVALID", "text/xml").childNodes[0].namespaceURI
                } catch (e) {
                  s = null
                }
                try {
                  r = n.parseFromString(t, "text/xml"), null !== s && r.getElementsByTagNameNS(s,
                    "parsererror").length > 0 && (r = null)
                } catch (e) {
                  r = null
                }
              } else 0 === t.indexOf("<?") && (t = t.substr(t.indexOf("?>") + 2)), (r = new ActiveXObject(
                "Microsoft.XMLDOM")).async = "false", r.loadXML(t);
              return r
            }
            this.asArray = function(e) {
              return null == e ? [] : e instanceof Array ? e : [e]
            }, this.toXmlDateTime = function(e) {
              return e instanceof Date ? e.toISOString() : "number" == typeof e ? new Date(e).toISOString() :
                null
            }, this.asDateTime = function(e) {
              return "string" == typeof e ? o(e) : e
            }, this.xml2dom = function(e) {
              return y(e)
            }, this.dom2js = function(e) {
              return c(e, null)
            }, this.js2dom = function(e) {
              var t = this.js2xml(e);
              return y(t)
            }, this.xml2js = function(e) {
              var t = y(e);
              return null != t ? this.dom2js(t) : null
            }, this.js2xml = function(e) {
              return h(e)
            }, this.getVersion = function() {
              return "3.1.1"
            }
          }
        }) ? r.apply(t, s) : r) || (e.exports = i)
      }()
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(47).fn,
        a = n(0),
        c = n(301),
        u = n(26),
        l = n(2),
        m = n(156),
        d = n(300),
        p = n(155);
      o.sendText = function(e) {
        return this.processCallback(e), e.msg = new this.message.TextMessage(e), this.sendMsg(e)
      }, o.previewFile = function(e) {
        if (a.verifyOptions(e, "done", "msg::previewFile"), e.type || (e.type = "file"), a.verifyParamPresentJustOne(
            e, "dataURL blob fileInput filePath wxFilePath fileObject", "msg::previewFile"), a.exist(e.fileInputMaxSize) &&
          a.verifyParamType("fileInputMaxSize", e.fileInputMaxSize, "number", "api::previewFile"), a.exist(e.fileInputCommonUpload) &&
          a.verifyParamType("fileInputCommonUpload", e.fileInputCommonUpload, "boolean", "api::previewFile"), e
          .nosSurvivalTime ? (a.verifyParamType("nosSurvivalTime", e.nosSurvivalTime, "number",
            "api::Base.getInstance"), a.verifyParamMin("nosSurvivalTime", e.nosSurvivalTime, 86400,
            "api::Base.getInstance")) : e.nosSurvivalTime = this.nosSurvivalTime, e.filePath = e.filePath || e.wxFilePath,
          delete e.wxFilePath, e.dataURL) e.blob = p.fromDataURL(e.dataURL);
        else if (e.blob);
        else if (e.fileInput) {
          if (e.fileInput = a.verifyFileInput(e.fileInput, "msg::previewFile"), e.fileInput.files) {
            if (!e.fileInput.files.length) return void e.done(u.newNoFileError("请选择" + e.type + "文件", {
              callFunc: "msg::previewFile",
              fileInput: e.fileInput
            }), e);
            e.fileSize = e.fileInput.files[0].size
          }
          e.fileInputName = a.getFileName(e.fileInput)
        }
        this.processCallback(e);
        var t = JSON.stringify(m.genResponseBody(e.type) || {}).replace(/"/gi, '\\"'),
          n = null,
          r = e.transcode ? "getNosTokenTrans" : "getNosToken";
        if (e.transcode) {
          a.verifyOptions(e, "fileInput", "msg::previewFile");
          var s = a.getFileInfo(e.fileInput);
          n = {
            transToken: {
              name: s.name,
              type: s.transcodeType,
              transType: "png" === e.transcode ? 11 : 10,
              size: s.size,
              body: t
            }
          }
        } else n = t;
        this[r]({
          responseBody: n,
          nosToken: {
            nosScene: e.nosScene || this.nosScene,
            nosSurvivalTime: e.nosSurvivalTime
          },
          callback: function(t, n) {
            t ? e.done(t) : (e.transcode ? (e.nosToken = n.nosToken, e.docId = n.docId) : e.nosToken = n,
              this._doPreviewFile(e))
          }.bind(this)
        })
      }, o._doPreviewFile = function(e) {
        var t, n = this,
          r = e.uploaddone,
          s = l.genUploadUrl(e.nosToken.bucket),
          o = l.genChunkUploadUrl(e.nosToken);
        e.fileInputCommonUpload || e.dataURL || e.blob || !o || l.isWeixinApp || l.isNodejs || l.isRN ? (e.fileInputCommonUpload = !
          0, t = s) : t = o;
        var c = this.assembleUploadParams(e.nosToken);

        function p(t, s, i) {
          if (e.uploaddone = r, t) e.done(t, e.callback.options);
          else {
            if (s = m.parseResponse(s, n.options.exifOrientation), i || (s.url = l.genDownloadUrl(e.nosToken, c
                .Object), e.nosToken.shortUrl && (s._url_safe = e.nosToken.shortUrl)), a.exist(e.fileInputName))
              s.name = e.fileInputName;
            else if (e.blob) {
              var o = e.blob.name;
              if (s.name = o || "blob-" + s.md5, !o) {
                var u = e.blob.type;
                s.ext = u.slice(u.lastIndexOf("/") + 1)
              }
            } else e.filePath ? s.name = e.filePath : e.fileObject && (s.name = e.fileObject.fileName);
            if (!s.ext) {
              var d = s.name.lastIndexOf(".");
              s.ext = -1 === d ? "unknown" : s.name.slice(d + 1)
            }
            s.size = s.size || 0, e.done(null, a.copy(s))
          }
        }
        if (l.isWeixinApp) a.verifyOptions(e, "filePath", "msg::_doPreviewFile"), n.fileQuickTransfer(e, p,
          function() {
            wx.uploadFile({
              url: t,
              filePath: e.filePath,
              name: "file",
              formData: c,
              fail: function(e) {
                console.log("error:", "api::msg:upload file failed", e)
              },
              success: function(e) {
                if (200 === e.statusCode) try {
                  p(null, JSON.parse(e.data))
                } catch (t) {
                  console.log("error:", "parse wx upload file res error", t), p({
                    code: "PARSE_WX_UPLOAD_FILE_RES_ERROR",
                    str: e.data,
                    msg: e.errMsg
                  })
                } else p({
                  code: e.statusCode,
                  msg: e.errMsg
                })
              }
            })
          });
        else if (l.isNodejs) {
          var f = {
            url: t,
            name: "file",
            formData: c,
            success: function(e) {
              if (200 === e.statusCode) try {
                p(null, JSON.parse(e.data))
              } catch (t) {
                console.log("error:", "parse nodejs upload file res error", t), p({
                  code: "PARSE_NODEJS_UPLOAD_FILE_RES_ERROR",
                  str: e.data,
                  msg: e.errMsg
                })
              } else p({
                code: e.statusCode,
                msg: e.errMsg
              })
            },
            fail: function(e) {
              console.log("error:", "api::msg:upload file failed", e)
            }
          };
          if (e.filePath) f.filePath = e.filePath;
          else {
            if ("object" !== (0, i.default)(e.fileObject)) throw new u(
              "Nodejs上传fileObject参数类型应如 {fileName:..,fileData:..} ");
            f.fileData = e.fileObject.fileData
          }
          n.fileQuickTransfer(e, p, function() {
            d.uploadFile(f)
          })
        } else if (l.isRN) {
          var g = {
            url: t,
            name: "file",
            formData: c,
            filePath: e.filePath,
            success: function(e) {
              if (e.ok && 200 === e.status) try {
                e.md5 = e.headers.map && e.headers.map.etag && e.headers.map.etag[0] || "UNKNOWN", p(null,
                  e)
              } catch (t) {
                console.log("error:", "parse React Native upload file res error", t), p({
                  code: "PARSE_React_Native_UPLOAD_FILE_RES_ERROR",
                  res: e
                })
              } else p({
                code: e.status,
                msg: e.statusText
              })
            },
            fail: function(e) {
              console.log("error:", "api::msg:upload file failed", e)
            }
          };
          n.fileQuickTransfer(e, p, function() {
            d.uploadFile(g)
          })
        } else e.uploaddone = p, e.url = t, e.params = c, e.fileName = "file", n.fileQuickTransfer(e, p,
          function() {
            return new d(e)
          })
      }, o.fileQuickTransfer = function(e, t, n) {
        var r = this;
        e = e || {}, t instanceof Function || (t = function() {}), n instanceof Function || (n = function() {});
        var s = e.fastPass;
        if (s) try {
          s = JSON.parse(s), e.fastPass = s
        } catch (e) {
          r.protocol.logger.error("快传参数解析失败")
        }
        var i = e.fileInputName || e.name || e.blob && e.blob.name || "",
          o = e.fileSize || e.size || e.blob && e.blob.size || 0,
          a = s ? ((s.md5 || e.digest || "") + "").trim() : "",
          c = e.type || e.blob && e.blob.type;
        if (a && o >= l.threshold) {
          var u = !0,
            m = {
              name: i,
              md5: a,
              ext: i.slice(i.lastIndexOf(".") + 1),
              type: c
            };
          switch (c) {
            case "image":
              s && s.w && s.h ? (m.w = s.w, m.h = s.h) : (u = !1, r.protocol.logger.error(
                "快传 image 文件缺少参数 w 或 h"));
              break;
            case "video":
              s && s.w && s.h && s.dur ? (m.w = s.w, m.h = s.h, m.dur = s.dur) : (u = !1, r.protocol.logger.error(
                "快传 video 文件缺少参数 w 或 h 或 dur"));
              break;
            case "audio":
              s && s.dur ? m.dur = s.dur : (u = !1, r.protocol.logger.error("快传 audio 文件缺少参数 dur"))
          }
          if (!u) return void n();
          var d = {
            fileQuickTransfer: {
              md5: a
            }
          };
          return o && (d.fileQuickTransfer.size = o), this.protocol.sendCmd("fileQuickTransfer", d, function(e,
            s, i) {
            !e && i && i.fileQuickTransfer && i.fileQuickTransfer.url || (r.protocol.logger.error(
                "misc::fileQuickTransfer: not found", e, s, i), n()), i && i.fileQuickTransfer && i.fileQuickTransfer
              .threshold && (l.threshold = i.fileQuickTransfer.threshold || 0), i && i.fileQuickTransfer &&
              i.fileQuickTransfer.url && (m.size = o || i.fileQuickTransfer.size, m.url = i.fileQuickTransfer
                .url, i.fileQuickTransfer._url_safe && (m._url_safe = i.fileQuickTransfer._url_safe), t(e,
                  m, !0))
          })
        }
        n()
      }, o.sendFile = function(e) {
        if (e.type || (e.type = "file"), a.verifyParamPresentJustOne(e,
            "dataURL blob fileInput file filePath wxFilePath fileObject", "msg::sendFile"), a.exist(e.fileInputMaxSize) &&
          a.verifyParamType("fileInputMaxSize", e.fileInputMaxSize, "number", "api::previewFile"), a.exist(e.fileInputCommonUpload) &&
          a.verifyParamType("fileInputCommonUpload", e.fileInputCommonUpload, "boolean", "api::previewFile"),
          this.processCallback(e), e.filePath = e.filePath || e.wxFilePath, delete e.wxFilePath, e.dataURL) this
          ._previewAndSendFile(e);
        else if (e.blob) this._previewAndSendFile(e);
        else if (e.fileInput) {
          if (e.fileInput = a.verifyFileInput(e.fileInput, "msg::sendFile"), e.fileInput.files && !e.fileInput.files
            .length) return void e.done(u.newNoFileError("请选择" + e.type + "文件", {
            callFunc: "msg::sendFile",
            fileInput: e.fileInput
          }), e.callback.options);
          this._previewAndSendFile(e)
        } else if (e.filePath || e.fileObject) this._previewAndSendFile(e);
        else if (e.file) {
          var t, n = e.file._url_safe;
          return n && (t = e.file.url, e.file.url = n, delete e.file._url_safe), e.msg = new this.message.FileMessage(
            e), this.sendMsg(e, t)
        }
      }, o._previewAndSendFile = function(e) {
        var t = this;
        a.verifyCallback(e, "uploaddone beforesend", "msg::_previewAndSendFile");
        var n = e.done;
        e.done = function(r, s) {
          if (e.done = n, r) e.uploaddone(r, e.callback.options);
          else {
            if (/chatroom/.test(e.scene)) return;
            var i;
            e.uploaddone(null, a.copy(s));
            var o = s._url_safe;
            o && (i = s.url, s.url = o, delete s._url_safe), e.file = s, e.msg = new t.message.FileMessage(e),
              e.beforesend(t.sendMsg(e, i))
          }
        }, t.previewFile(e)
      }, o.assembleUploadParams = function(e) {
        return e ? {
          Object: decodeURIComponent(e.objectName),
          "x-nos-token": e.token,
          "x-nos-entity-type": "json"
        } : null
      }, o.deleteFile = function(e) {
        a.verifyParamPresentJustOne(e, "docId", "msg::deleteFile"), this.removeFile({
          docId: e.docId,
          callback: function(t, n) {
            t ? e.error && e.error(t, n) : e.success && e.success(n)
          }
        })
      }, o.getFile = function(e) {
        a.verifyParamPresentJustOne(e, "docId", "msg::getFile"), this.fetchFile({
          docId: e.docId,
          callback: function(t, n) {
            t ? e.error && e.error(t, n) : e.success && e.success(n.info)
          }
        })
      }, o.getFileList = function(e) {
        var t = e.fromDocId,
          n = void 0 === t ? "" : t,
          r = e.limit,
          s = void 0 === r ? 10 : r,
          i = {
            limit: s
          };
        n && (i.fromDocId = n), this.fetchFileList({
          fileListParam: i,
          callback: function(t, n) {
            t ? (s > 30 && (t.message = t.message + "::文档条数超过限制:30"), e.error && e.error(t, n)) : e.success &&
              e.success(n)
          }
        })
      }, o.sendGeo = function(e) {
        return this.processCallback(e), e.msg = new this.message.GeoMessage(e), this.sendMsg(e)
      }, o.sendTipMsg = function(e) {
        return this.processCallback(e), e.msg = new this.message.TipMessage(e), this.sendMsg(e)
      }, o.sendCustomMsg = function(e) {
        return this.processCallback(e), e.msg = new this.message.CustomMessage(e), this.sendMsg(e)
      }, o.sendRobotMsg = function(e) {
        return this.processCallback(e), e.msg = new this.message.RobotMessage(e), this.sendMsg(e)
      }, o.sendMsg = function(e, t) {
        var n = this.protocol,
          r = e.msg,
          s = {},
          i = !!e.isLocal;
        if (i && (e.time && (r.time = e.time), e.idClient && (r.idClient = e.idClient)), e.resend && ("out" !==
            e.flow || "fail" !== e.status)) return a.onError("只能重发发送失败的消息");
        e.callback.options.idClient = r.idClient, this.beforeSendMsg(e, s);
        var o = e.rtnMsg = this.formatReturnMsg(r);
        return t && !this.options.keepNosSafeUrl && o.file && (o.file._url_safe = o.file.url, o.file.url = t,
            "audio" === o.type && (o.file.mp3Url = t + (~t.indexOf("?") ? "&" : "?") + "audioTrans&type=mp3")),
          o.hasOwnProperty("chatroomId") && !o.chatroomId ? a.onError("聊天室未连接") : (i && (o.status = "success",
            o.isLocal = !0), n.storeSendMsg && (s.promise = n.storeSendMsg(o)), e.cbaop = function(e) {
            if (e && "server" !== e.from) return o.status = "fail", n.updateSendMsgError && n.updateSendMsgError(
              o), o
          }, i || (t && !this.options.keepNosSafeUrl && e.callback && (e.callback.originUrl = t), s.msg = r,
            this.sendCmd(e.cmd, s, e.callback)), this.afterSendMsg(e), i && setTimeout(function() {
            o = a.simpleClone(o), e.done(null, o)
          }, 0), a.copy(o))
      }, o.beforeSendMsg = function() {}, o.afterSendMsg = function() {}, o.formatReturnMsg = function(e) {
        return e = a.copy(e), this.protocol.completeMsg(e), e.status = "sending", e = this.message.reverse(e)
      }, o.resendMsg = function(e) {
        return a.verifyOptions(e, "msg", "msg::resendMsg"), this.trimMsgFlag(e), e.resend = !0, this._sendMsgByType(
          e)
      }, o.forwardMsg = function(e) {
        return a.verifyOptions(e, "msg", "msg::forwardMsg"), this.trimMsgFlag(e), this.beforeForwardMsg(e), e.forward = !
          0, e.msg.idClient = a.guid(), this._sendMsgByType(e)
      }, o.trimMsgFlag = function(e) {
        e && e.msg && (e.msg = a.copy(e.msg), delete e.msg.resend, delete e.msg.forward)
      }, o.beforeForwardMsg = function() {}, o._sendMsgByType = function(e) {
        switch (a.verifyOptions(e, "msg", "msg::_sendMsgByType"), a.verifyParamValid("msg.type", e.msg.type,
          this.message.validTypes, "msg::_sendMsgByType"), a.merge(e, e.msg), e.type) {
          case "text":
            return this.sendText(e);
          case "image":
          case "audio":
          case "video":
          case "file":
            return this.sendFile(e);
          case "geo":
            return this.sendGeo(e);
          case "custom":
            return this.sendCustomMsg(e);
          case "tip":
            return this.sendTipMsg(e);
          default:
            throw new u("不能发送类型为 " + e.type + " 的消息")
        }
      }, o.parseRobotTemplate = function(e) {
        if (/<template[^>\/]+\/>/.test(e)) return {
          raw: e,
          json: [{
            type: "text",
            name: "",
            text: ""
          }]
        };
        if (!/<template[^>\/]+>/.test(e)) return {
          raw: e,
          json: [{
            type: "text",
            name: "",
            text: e
          }]
        };
        var t = new c({
          escapeMode: !1
        });
        e = e.replace(/<template [^>]+>/, "<template>");
        var n = t.xml2js(e);
        n = n.template.LinearLayout, Array.isArray(n) || (n = [n]);
        var r = [];
        return n = n.forEach(function(e) {
          e.image && (r = r.concat(i(e))), e.text && (r = r.concat(s(e))), e.link && (r = r.concat(function(
            e) {
            if (e.link) {
              var t = e.link;
              Array.isArray(t) || (t = [t]), t = t.map(function(e) {
                return e.image && (e.image = i(e)), e.text && (e.text = s(e)), "url" === e._type ?
                  (e.type = "url", e.style = e._style || "", e.target = e._target, delete e._target,
                    delete e._style) : "block" === e._type && (e.type = "block", e.style = e._style ||
                    "", e.params = e._params || "", e.target = e._target, delete e._params,
                    delete e._target, delete e._style), delete e._type, e
              }), e.link = t
            }
            return e.link
          }(e)))
        }), {
          raw: e,
          json: r
        };

        function s(e) {
          return Array.isArray(e.text) || (e.text = [e.text]), e.text = e.text.map(function(e) {
            return {
              type: "text",
              name: e._name,
              text: e.__text
            }
          }), e.text
        }

        function i(e) {
          return Array.isArray(e.image) || (e.image = [e.image]), e.image = e.image.map(function(e) {
            return {
              type: "image",
              name: e._name,
              url: e._url
            }
          }), e.image
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(47).fn;
      r.isConnected = function() {
        return !!this.protocol && this.protocol.isConnected()
      }, r.connect = function() {
        this.protocol.appLogin = 0, this.protocol.connect(!0)
      }, r.disconnect = function(e) {
        e = e || {}, this.protocol.disconnect(e.done)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(22),
        s = n(0);
      n(36);

      function i() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        s.merge(this, {
          options: e,
          debug: !1,
          api: "log",
          style: "color:blue;",
          log: s.emptyFunc,
          info: s.emptyFunc,
          warn: s.emptyFunc,
          error: s.emptyFunc
        }), this.prefix = e.prefix || "", this.setDebug(e.debug)
      }
      var o = i.prototype,
        a = ["Chrome", "Safari", "Firefox"];
      o.setDebug = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = this;
        if (t.debug = e, e.style && (t.style = e.style), t.debug && s.exist(console)) {
          var n = console;
          t.debug = function() {
            var e = t.formatArgs(arguments); - 1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("debug", e)
          }, t.log = function() {
            var e = t.formatArgs(arguments); - 1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("log", e)
          }, t.info = function() {
            var e = t.formatArgs(arguments); - 1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("info", e)
          }, t.warn = function() {
            var e = t.formatArgs(arguments); - 1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("warn", e)
          }, t.error = function() {
            var e = t.formatArgs(arguments); - 1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" +
              e[0], e.splice(1, 0, t.style)), t._log("error", e)
          }, t._log = function(e, r) {
            var i = t.options.logFunc,
              o = null;
            if (i && (i[e] && (o = i[e]), s.isFunction(o))) o.apply(i, r);
            else if (n[e]) try {
              n[e].apply ? t.chrome(e, r) : t.ie(e, r)
            } catch (e) {}
          }, t.chrome = function(e, s) {
            -1 !== a.indexOf(r.name) ? n[e].apply(n, s) : t.ie(e, s)
          }, t.ie = function(e, t) {
            t.forEach(function(t) {
              n[e](JSON.stringify(t, null, 4))
            })
          }
        }
      }, o.formatArgs = function(e) {
        e = [].slice.call(e, 0);
        var t = new Date,
          n = "[NIM LOG " + (c(t.getMonth() + 1) + "-" + c(t.getDate()) + " " + c(t.getHours()) + ":" + c(t.getMinutes()) +
            ":" + c(t.getSeconds()) + ":" + c(t.getMilliseconds(), 3)) + " " + this.prefix.toUpperCase() +
          "]  ";
        return s.isString(e[0]) ? e[0] = n + e[0] : e.splice(0, 0, n), e.forEach(function(t, n) {
          (s.isArray(t) || s.isObject(t)) && (e[n] = s.simpleClone(t))
        }), e
      };
      var c = function(e, t) {
        t = t || 2;
        for (var n = "" + e; n.length < t;) n = "0" + n;
        return n
      };
      e.exports = i
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    function(e, t, n) {
      "use strict";
      var r = n(127).fn,
        s = n(0);
      r.queueOffer = function(e) {
        s.verifyOptions(e, "elementKey elementValue", "msg::queueOffer"), e.transient ? e.transient = !0 : e.transient = !
          1, this.processCallback(e), this.sendCmd("queueOffer", e, e.callback)
      }, r.queuePoll = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e.elementKey = e.elementKey || "", this.processCallback(e), this.sendCmd("queuePoll", e, e.callback)
      }, r.queueList = function(e) {
        this.processCallback(e), this.sendCmd("queueList", e, e.callback)
      }, r.peak = function(e) {
        this.processCallback(e), this.sendCmd("peak", e, e.callback)
      }, r.queueDrop = function(e) {
        this.processCallback(e), this.sendCmd("queueDrop", e, e.callback)
      }, r.queueChange = function(e) {
        s.verifyOptions(e, "elementMap", "msg::queueOffer"), e.needNotify ? (e.needNotify = !0, s.verifyOptions(
          e, "notifyExt", "msg::queueOffer")) : e.needNotify = !1, this.processCallback(e), this.sendCmd(
          "queueChange", e, e.callback)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = r.undef,
        i = r.verifyOptions,
        o = r.verifyParamType,
        a = n(167),
        c = n(127).fn;
      c.updateMyChatroomMemberInfo = function(e) {
        i(e, "member needNotify", "member::updateMyChatroomMemberInfo"), o("needNotify", e.needNotify,
            "boolean", "member::updateMyChatroomMemberInfo"), e.needSave = e.needSave || !1, o("needSave", e.needSave,
            "boolean", "member::updateMyChatroomMemberInfo"), this.processCustom(e), this.processCallback(e), e
          .chatroomMember = new a(e.member), this.sendCmd("updateMyChatroomMemberInfo", e)
      }, c.getChatroomMembers = function(e) {
        i(e, "guest", "member::getChatroomMembers"), o("guest", e.guest, "boolean",
            "member::getChatroomMembers"), s(e.time) ? e.time = 0 : o("time", e.time, "number",
            "member::getChatroomMembers"), s(e.limit) ? e.limit = 100 : o("limit", e.limit, "number",
            "member::getChatroomMembers"), this.processCallback(e), e.type = e.guest ? 1 : 0, !e.guest && e.onlyOnline &&
          (e.type = 2), this.sendCmd("getChatroomMembers", e)
      }, c.getChatroomMembersInfo = function(e) {
        i(e, "accounts", "member::getChatroomMembersInfo"), o("accounts", e.accounts, "array",
          "member::getChatroomMembersInfo"), this.processCallback(e), this.sendCmd("getChatroomMembersInfo",
          e)
      }, c.markChatroomIdentity = function(e) {
        i(e, "identity", "member::markChatroomIdentity"), e.type = {
          manager: 1,
          common: 2,
          black: -1,
          mute: -2
        } [e.identity], delete e.identity, isNaN(e.type) ? i(e, "identity",
          'member::markChatroomIdentity. The valid value of the identity is "manager" or "common" or "black" or "mute".'
        ) : this.markChatroomMember(e)
      }, c.markChatroomManager = function(e) {
        e.type = 1, this.markChatroomMember(e)
      }, c.markChatroomCommonMember = function(e) {
        e.type = 2, this.markChatroomMember(e)
      }, c.markChatroomBlacklist = function(e) {
        e.type = -1, this.markChatroomMember(e)
      }, c.markChatroomGaglist = function(e) {
        e.type = -2, this.markChatroomMember(e)
      }, c.markChatroomMember = function(e) {
        i(e, "account type isAdd", "member::markChatroomMember"), o("isAdd", e.isAdd, "boolean",
          "member::markChatroomMember"), s(e.level) ? e.level = 0 : o("level", e.level, "number",
          "member::markChatroomMember");
        this.processCustom(e), this.processCallback(e), this.sendCmd("markChatroomMember", e)
      }, c.kickChatroomMember = function(e) {
        i(e, "account", "member::kickChatroomMember"), this.processCustom(e), this.processCallback(e), this.sendCmd(
          "kickChatroomMember", e)
      }, c.updateChatroomMemberTempMute = function(e) {
        i(e, "account duration needNotify", "member::updateChatroomMemberTempMute"), o("duration", e.duration,
          "number", "member::updateChatroomMemberTempMute"), o("needNotify", e.needNotify, "boolean",
          "member::updateChatroomMemberTempMute"), this.processCustom(e), this.processCallback(e), this.sendCmd(
          "updateChatroomMemberTempMute", e)
      }, c.getRobotList = function(e) {
        s(e.timetag) && (e.timetag = 0), this.processCallback(e), this.sendCmd("syncRobot", e)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = r.undef,
        i = n(127).fn;
      i.beforeSendMsg = function(e) {
        e.cmd = "sendMsg"
      };
      var o = {
        text: 0,
        image: 1,
        audio: 2,
        video: 3,
        geo: 4,
        notification: 5,
        file: 6,
        tip: 10,
        robot: 11,
        custom: 100
      };
      i.getHistoryMsgs = function(e) {
        r.verifyOptions(e), s(e.timetag) ? e.timetag = 0 : r.verifyParamType("timetag", e.timetag, "number",
          "msg::getHistoryMsgs"), s(e.limit) ? e.limit = 100 : r.verifyParamType("limit", e.limit, "number",
          "msg::getHistoryMsgs"), s(e.reverse) ? e.reverse = !1 : r.verifyParamType("reverse", e.reverse,
          "boolean", "msg::getHistoryMsgs"), s(e.msgTypes) ? e.msgTypes = [] : Array.isArray(e.msgTypes) ? (e
          .msgTypes = e.msgTypes.map(function(e) {
            return o[e]
          }), e.msgTypes = e.msgTypes.filter(function(e) {
            return "number" == typeof e
          })) : "number" == typeof o[e.msgTypes] ? e.msgTypes = [o[e.msgTypes]] : e.msgTypes = [];
        this.processCallback(e), this.sendCmd("getHistoryMsgs", e, function(t, n, r) {
          Array.isArray(r) && (r = r.map(function(e) {
            return o[e.type] && (e.type = o[e.type]), e
          })), e.callback(t, n, r)
        })
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(71),
        s = n(0),
        i = {
          welcome: "00",
          text: "01",
          link: "03"
        },
        o = {
          "01": "text",
          "02": "image",
          "03": "answer",
          11: "template"
        };

      function a(e) {
        s.verifyOptions(e, "content", "msg::RobotMessage");
        var t = e.content;
        switch (t.type) {
          case "welcome":
            s.undef(e.body) && (this.body = "欢迎消息");
            break;
          case "text":
            s.verifyOptions(t, "content", "msg::RobotMessage"), s.undef(e.body) && (this.body = t.content);
            break;
          case "link":
            s.verifyOptions(t, "target", "msg::RobotMessage")
        }
        t.type && (t.type = i[t.type]), t = {
          param: t,
          robotAccid: e.robotAccid
        }, this.attach = JSON.stringify(t), e.type = "robot", r.call(this, e)
      }
      a.prototype = Object.create(r.prototype), a.reverse = function(e) {
        var t = r.reverse(e);
        if ("robot" === t.type) {
          var n = JSON.parse(e.attach);
          if (n.param && (n.param.type = o[n.param.type] || "unknown"), n.robotMsg) {
            var i = (n = s.merge(n, n.robotMsg)).message;
            "bot" === n.flag ? n.message = i.map(function(e) {
              return e.type = o[e.type] || "unknown", e
            }) : n.flag, delete n.robotMsg
          }
          t.content = n
        }
        return t
      }, e.exports = a
    },
    function(e, t, n) {
      "use strict";
      var r = n(71),
        s = n(0);

      function i(e) {
        s.verifyOptions(e, "tip", "msg::TipMessage"), e.type = "tip", r.call(this, e), this.attach = e.tip
      }
      i.prototype = Object.create(r.prototype), i.reverse = function(e) {
        var t = r.reverse(e);
        return t.tip = e.attach, t
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(71),
        s = n(0);

      function i(e) {
        s.verifyOptions(e, "content", "msg::CustomMessage"), e.type = "custom", r.call(this, e), "string" !=
          typeof e.content && (e.content = JSON.stringify(e.content)), this.attach = e.content
      }
      i.prototype = Object.create(r.prototype), i.reverse = function(e) {
        var t = r.reverse(e);
        return t.content = e.attach, t
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(0).notundef,
        s = n(71),
        i = {
          301: "memberEnter",
          302: "memberExit",
          303: "blackMember",
          304: "unblackMember",
          305: "gagMember",
          306: "ungagMember",
          307: "addManager",
          308: "removeManager",
          309: "addCommon",
          310: "removeCommon",
          311: "closeChatroom",
          312: "updateChatroom",
          313: "kickMember",
          314: "addTempMute",
          315: "removeTempMute",
          316: "updateMemberInfo",
          317: "updateQueue",
          318: "muteRoom",
          319: "unmuteRoom",
          320: "batchUpdateQueue"
        };

      function o() {}
      o.prototype = Object.create(s.prototype), o.reverse = function(e) {
        var t = s.reverse(e);
        if (e.attach = e.attach ? "" + e.attach : "", e.attach) {
          var n = JSON.parse(e.attach);
          if (t.attach = {
              type: i[n.id]
            }, r(n.data)) {
            var o = n.data;
            if (r(o.operator) && (t.attach.from = o.operator), r(o.opeNick) && (t.attach.fromNick = o.opeNick),
              r(o.target) && (t.attach.to = o.target), r(o.tarNick) && (t.attach.toNick = o.tarNick), r(o.muteDuration) &&
              (t.attach.duration = parseInt(o.muteDuration, 10)), "memberEnter" === t.attach.type && (r(o.muted) ?
                t.attach.gaged = 1 == +o.muted : t.attach.gaged = !1, r(o.tempMuted) ? t.attach.tempMuted = 1 ==
                +o.tempMuted : t.attach.tempMuted = !1, r(o.muteTtl) ? t.attach.tempMuteDuration = +o.muteTtl :
                t.attach.tempMuteDuration = 0), r(o.ext) && (t.attach.custom = o.ext), r(o.queueChange)) {
              var a = JSON.parse(o.queueChange);
              switch (a._e) {
                case "OFFER":
                  t.attach.queueChange = {
                    type: "OFFER",
                    elementKey: a.key,
                    elementValue: a.content
                  };
                  break;
                case "POLL":
                  t.attach.queueChange = {
                    type: "POLL",
                    elementKey: a.key,
                    elementValue: a.content
                  };
                  break;
                case "DROP":
                  t.attach.queueChange = {
                    type: "DROP"
                  };
                  break;
                case "PARTCLEAR":
                case "BATCH_UPDATE":
                  t.attach.queueChange = {
                    type: a._e,
                    elementKv: a.kvObject
                  }
              }
            }
          }
        } else t.attach = {};
        return t
      }, e.exports = o
    },
    function(e, t, n) {
      "use strict";
      var r = n(71),
        s = n(0);

      function i(e) {
        e.type = "geo", s.verifyOptions(e, "geo", "msg::GeoMessage"), s.verifyOptions(e.geo, "lng lat title", !0,
          "geo.", "msg::GeoMessage"), s.verifyParamType("geo.lng", e.geo.lng, "number", "msg::GeoMessage"), s.verifyParamType(
          "geo.lat", e.geo.lat, "number", "msg::GeoMessage"), s.verifyParamType("geo.title", e.geo.title,
          "string", "msg::GeoMessage"), r.call(this, e), this.attach = JSON.stringify(e.geo)
      }
      i.prototype = Object.create(r.prototype), i.reverse = function(e) {
        var t = r.reverse(e);
        return e.attach = e.attach ? "" + e.attach : "", t.geo = e.attach ? JSON.parse(e.attach) : {}, t
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(126),
        s = n(0);

      function i() {}
      i.prototype = Object.create(r.prototype), i.verifyFile = function(e, t) {
        s.verifyOptions(e, "dur w h", !0, "file.", t)
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(126),
        s = n(0);

      function i() {}
      i.prototype = Object.create(r.prototype), i.verifyFile = function(e, t) {
        s.verifyOptions(e, "dur", !0, "file.", t)
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = n(126);

      function i() {}
      i.prototype = Object.create(s.prototype), i.verifyFile = function(e, t) {
        r.verifyOptions(e, "w h", !0, "file.", t)
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(71),
        s = n(0);

      function i(e) {
        s.verifyOptions(e, "text", "msg::TextMessage"), e.type = "text", r.call(this, e), this.attach = e.text,
          this.body = ""
      }
      i.prototype = Object.create(r.prototype), i.reverse = function(e) {
        var t = r.reverse(e);
        return t.text = e.attach, t
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = function(e) {
          this.account = e.account
        },
        i = s.prototype,
        o = i.Message = n(71),
        a = i.TextMessage = n(377),
        c = i.FileMessage = n(126),
        u = i.GeoMessage = n(373),
        l = i.NotificationMessage = n(372),
        m = i.CustomMessage = n(371),
        d = i.TipMessage = n(370),
        p = i.RobotMessage = n(369);
      i.validTypes = o.validTypes, i.reverse = function(e) {
        var t;
        switch (o.getType(e)) {
          case "text":
            t = a.reverse(e);
            break;
          case "image":
          case "audio":
          case "video":
          case "file":
            t = c.reverse(e);
            break;
          case "geo":
            t = u.reverse(e);
            break;
          case "notification":
            t = l.reverse(e);
            break;
          case "custom":
            t = m.reverse(e);
            break;
          case "tip":
            t = d.reverse(e);
            break;
          case "robot":
            t = p.reverse(e);
            break;
          default:
            t = o.reverse(e)
        }
        return o.setExtra(t, this.account), t
      }, i.reverseMsgs = function(e, t) {
        var n, s, i = this;
        return e.map(function(e) {
          return e = i.reverse(e), t && ((n = t.modifyObj) && (e = r.merge(e, n)), s = t.mapper, r.isFunction(
            s) && (e = s(e))), e
        })
      }, e.exports = s
    },
    function(e, t, n) {
      "use strict";
      var r = n(115).fn,
        s = n(167);
      r.onChatroomMembersInfo = r.onChatroomMembers = function(e) {
        e.error || (e.obj.members = s.reverseMembers(e.content.members))
      }, r.onMarkChatroomMember = function(e) {
        e.error || (e.obj.member = s.reverse(e.content.chatroomMember))
      }, r.onSyncRobot = function(e) {
        !e.error && this.options.onrobots ? this.options.onrobots(null, e.content) : this.ontions.onrobots(e.error, {})
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(115).fn,
        s = n(0);
      r.completeMsg = function(e) {
        e.chatroomId = this.chatroom && this.chatroom.id, e.from = this.options.account, e.fromClientType =
          "Web", e.time || (e.time = +new Date)
      }, r.onMsg = function(e) {
        var t = this.message.reverse(e.content.msg);
        this.checkMsgUnique(t) && (this.msgBuffer.push(t), this.msgFlushTimer || this.startMsgFlushTimer())
      }, r.startMsgFlushTimer = function() {
        var e = this,
          t = e.options;
        e.msgFlushTimer = setTimeout(function() {
          var n = e.msgBuffer.splice(0, t.msgBufferSize);
          e.options.onmsgs(n), e.msgBuffer.length ? e.startMsgFlushTimer() : delete e.msgFlushTimer
        }, t.msgBufferInterval)
      }, r.checkMsgUnique = s.genCheckUniqueFunc("idClient"), r.onSendMsg = function(e) {
        var t = e.obj.msg;
        e.error ? t.status = "fail" : (t = e.content.msg).status = "success", t = this.message.reverse(t), e.obj =
          t
      }, r.onHistoryMsgs = function(e) {
        e.error || (e.obj || (e.obj = {}), e.obj.msgs = this.message.reverseMsgs(e.content.msgs))
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(115).fn,
        s = n(54),
        i = n(0);
      r.assembleLogin = function() {
          var e = this.options;
          this.sdkSession = this.genSessionKey();
          var t = {
            appKey: e.appKey,
            account: e.account,
            deviceId: s.deviceId,
            chatroomId: e.chatroomId,
            session: this.sdkSession,
            appLogin: this.appLogin || 0
          };
          return {
            type: 1,
            login: t = i.merge(t, i.filterObj(e,
              "chatroomNick chatroomAvatar chatroomCustom chatroomEnterCustom isAnonymous")),
            imLogin: this.assembleIMLogin()
          }
        }, r.afterLogin = function(e) {
          var t = e.chatroom;
          this.chatroom = t, this.notifyLogin()
        }, r.kickedReasons = ["", "chatroomClosed", "managerKick", "samePlatformKick", "silentlyKick", "blacked"],
        r.kickedMessages = ["", "聊天室关闭了", "被房主或者管理员踢出", "不允许同一个帐号在多个地方同时登录", "悄悄被踢", "被拉黑了"]
    },
    function(e, t, n) {
      "use strict";
      var r = n(115).fn,
        s = n(2),
        i = n(36);
      r.refreshSocketUrl = function() {
        this.socketUrlsBackup = this.socketUrlsBackup || [], this.socketUrls = this.socketUrlsBackup.slice(0),
          this.logger.info("link::refreshSocketUrl"), this.connectToUrl(this.getNextSocketUrl()), this.getNosChunkUploadUrl()
      }, r.getNosChunkUploadUrl = function() {
        if (!s.isWeixinApp && null == s.chunkUploadUrl) {
          var e = this,
            t = s.lbsUrl;
          e.logger.info("link::getNosChunkUploadUrl: ajax webconf " + t), i(t, {
            onload: function(e) {
              e = JSON.parse(e), s.chunkUploadUrl = e["nos-chunk"] || ""
            },
            onerror: function(t) {
              e.logger.error("link::getNosChunkUploadUrl: ajax get webconf error", t)
            }
          })
        }
      }
    },
    function(e, t, n) {
      "use strict";
      n(140);
      var r = n(127);
      n(168)(r), e.exports = r
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = r.notundef;

      function i(e) {
        r.verifyOptions(e, "type", "event::MsgEventSubscribe"), r.verifyParamType("type", e.type, "number",
            "event::MsgEventSubscribe"), r.findObjIndexInArray([1, 2, 3], e.type) < 0 && r.verifyParamMin("type",
            e.type, 1e5, "event::MsgEventSubscribe"), this.type = e.type, s(e.subscribeTime) ? (r.verifyParamType(
            "subscribeTime", e.subscribeTime, "number", "event::MsgEventSubscribe"), r.verifyParamMin(
            "subscribeTime", e.subscribeTime, 60, "event::MsgEventSubscribe"), r.verifyParamMax("subscribeTime",
            e.subscribeTime, 2592e3, "event::MsgEventSubscribe"), this.subscribeTime = e.subscribeTime) : this.subscribeTime =
          2592e3, s(e.sync) ? (r.verifyParamType("sync", e.sync, "boolean", "event::MsgEventSubscribe"), this.sync =
            e.sync) : this.sync = !0
      }
      i.prototype.assembleEvent = function(e) {
        return {
          type: this.type,
          subscribeTime: this.subscribeTime,
          sync: !0 === this.sync ? 1 : 0
        }
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = r.notundef,
        i = n(26);

      function o(e) {
        if (r.verifyOptions(e, "type value", "event::MsgEvent"), r.verifyParamType("type", e.type, "number",
            "event::MsgEvent"), r.verifyParamType("value", e.value, "number", "event::MsgEvent"), this.type = e.type,
          this.value = e.value, this.idClient = r.guid(), s(e.custom) && (this.custom = "" + e.custom), this.validTime =
          e.validTime || 604800, r.verifyParamType("validTime", this.validTime, "number", "event::MsgEvent"), r.verifyParamMin(
            "validTime", this.validTime, 60, "event::MsgEvent"), r.verifyParamMax("validTime", this.validTime,
            604800, "event::MsgEvent"), s(e.broadcastType)) {
          if (r.verifyParamType("broadcastType", e.broadcastType, "number", "event::MsgEvent"), [1, 2].indexOf(e.broadcastType) <
            0) throw new i('参数错误"broadcastType":只能为1或2');
          this.broadcastType = e.broadcastType
        } else this.broadcastType = 2;
        s(e.sync) ? (r.verifyParamType("sync", e.sync, "boolean", "event::MsgEvent"), this.sync = e.sync) : this.sync = !
          1
      }
      o.prototype.assembleEvent = function() {
        return {
          type: this.type,
          value: this.value,
          idClient: this.idClient,
          custom: this.custom || "",
          validTime: this.validTime,
          broadcastType: this.broadcastType,
          sync: !0 === this.sync ? 1 : 0
        }
      }, e.exports = o
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(9),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(32).fn,
        a = n(0),
        c = n(385),
        u = n(384);

      function l(e) {
        return "object" === (void 0 === e ? "undefined" : (0, i.default)(e)) && (e.msgEventSubscribes ? e = e.msgEventSubscribes :
          e.msgEventSubscribe ? e = e.msgEventSubscribe : e.accounts ? e = e.accounts : e.msgEvent && (e = e.msgEvent)
          .time && (e.time = +e.time), 1 === e.sync ? e.sync = !0 : 0 === e.sync && (e.sync = !1)), e
      }
      o.batchSendEventsCmds = function(e, t, n) {
        var r = this,
          s = a.dropArrayDuplicates(t.accounts);
        s = a.reshape2d(s, 100);
        var i = [];
        s.forEach(function(n) {
          i.push(new Promise(function(s, i) {
            var o = a.simpleClone(t);
            o.accounts = n, r.sendCmdWithResp(e, o, function(e, t) {
              e ? i(e) : s(l(t))
            })
          }))
        }), Promise.all(i).then(function(e) {
          var t = null;
          if (e.length > 0)
            if (e[0].msgEventSubscribe) {
              var r = e[0].msgEventSubscribe;
              r = l(r);
              var s = [];
              e.forEach(function(e) {
                s = s.concat(e.accounts)
              }), t = {
                accounts: s,
                msgEventSubscribe: r
              }
            } else t = [], e.forEach(function(e) {
              t = t.concat(e)
            });
          n(null, t)
        }, function(e) {
          n(e, null)
        })
      }, o.publishEvent = function(e) {
        var t = new c(e);
        t = t.assembleEvent(), this.processCallback(e), this.sendCmdWithResp("publishEvent", {
          msgEvent: t
        }, function(t, n) {
          t || (n = l(n)), e.callback(t, n)
        })
      }, o.subscribeEvent = function(e) {
        a.verifyOptions(e, "accounts", "event::subscribeEvent");
        var t = new u(e);
        a.verifyParamType("accounts", e.accounts, "array", "event::subscribeEvent"), this.processCallback(e), t =
          t.assembleEvent(), this.batchSendEventsCmds("subscribeEvent", {
            msgEventSubscribe: t,
            accounts: e.accounts
          }, function(t, n) {
            !t && n && (n = {
              failedAccounts: n
            }), e.callback(t, n)
          })
      }, o.unSubscribeEventsByAccounts = function(e) {
        a.verifyOptions(e, "accounts", "event::unSubscribeEventsByAccounts"), a.verifyParamType("accounts", e.accounts,
          "array", "event::unSubscribeEventsByAccounts");
        var t = new u(e);
        t = t.assembleEvent(), this.processCallback(e), this.batchSendEventsCmds("unSubscribeEventsByAccounts", {
          msgEventSubscribe: t,
          accounts: e.accounts
        }, function(t, n) {
          !t && n && (n = {
            failedAccounts: n
          }), e.callback(t, n)
        })
      }, o.unSubscribeEventsByType = function(e) {
        var t = new u(e);
        t = t.assembleEvent(), this.processCallback(e), this.sendCmdWithResp("unSubscribeEventsByType", {
          msgEventSubscribe: t
        }, function(t, n) {
          e.callback(t)
        })
      }, o.querySubscribeEventsByAccounts = function(e) {
        a.verifyOptions(e, "accounts", "event::querySubscribeEventsByAccounts"), a.verifyParamType("accounts",
          e.accounts, "array", "event::querySubscribeEventsByAccounts");
        var t = new u(e);
        t = t.assembleEvent(), this.processCallback(e), this.batchSendEventsCmds(
          "querySubscribeEventsByAccounts", {
            msgEventSubscribe: t,
            accounts: e.accounts
          },
          function(t, n) {
            !t && n && (n = {
              msgEventSubscribes: n
            }), e.callback(t, n)
          })
      }, o.querySubscribeEventsByType = function(e) {
        var t = new u(e);
        t = t.assembleEvent(), this.processCallback(e), this.sendCmdWithResp("querySubscribeEventsByType", {
          msgEventSubscribe: t
        }, function(t, n) {
          t || (n = {
            msgEventSubscribes: l(n)
          }), e.callback(t, n)
        })
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(170),
        i = n(0),
        o = i.undef;
      r.getPushNotificationMultiportConfig = function() {
        return this.protocol.getPushNotificationMultiportConfig()
      }, r.updatePushNotificationMultiportConfig = function(e) {
        i.verifyOptions(e), o(e.shouldPushNotificationWhenPCOnline) && (e.shouldPushNotificationWhenPCOnline = !
          0), e.donnop = new s(e), this.processCallback(e), this.sendCmd("updateDonnop", e)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn;
      r.clearDB = function(e) {
        var t = this.db;
        this.processCallback(e);
        var n = e.done;
        t.enable ? t.clear().then(n, n) : n()
      }, r.removeDB = function(e) {
        var t = this.db;
        this.processCallback(e);
        var n = e.done;
        t.enable ? t.destroy().then(n, n) : n()
      }, r.closeDB = function(e) {
        var t = this.db;
        this.processCallback(e);
        var n = e.done;
        t.enable ? t.close().then(n, n) : n()
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0);
      r.audioToText = function(e) {
        s.verifyOptions(e, "url", "audio::audioToText"), e.audioToText = s.filterObj(e, "url");
        this.processCallback(e), this.sendCmd("audioToText", e)
      }
    },
    function(e, t, n) {
      "use strict"
    },
    function(e, t, n) {
      "use strict"
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0),
        i = n(2);
      r.getChatroomAddress = function(e) {
        s.verifyOptions(e, "chatroomId", "chatroom::getChatroomAddress");
        e.isWeixinApp = i.isWeixinApp, this.processCallback(e), this.sendCmd("getChatroomAddress", e)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0),
        i = s.undef,
        o = s.notundef,
        a = n(117);
      r.markSysMsgRead = function(e) {
        var t, n = this.db,
          r = Promise.resolve(),
          i = this.protocol;
        s.verifyOptions(e, "sysMsgs", "sysmsg::markSysMsgRead");
        var o = e.sysMsgs;

        function a() {
          e.done(t, e)
        }
        s.isArray(o) || (o = [o]), n.enable ? r = n.markSysMsgRead(o).then(function(e) {
          o = e, i.onUpdateSysMsg(e)
        }) : (o = o.filter(function(e) {
          return !e.read
        })).length && (i.options.autoMarkRead || i.markSysMsgRead(o, !0), o.forEach(function(e) {
          e.read = !0
        }), i.onUpdateSysMsg(o)), r.then(function() {
          return i.reduceSysMsgUnread(o)
        }).then(a, function(e) {
          t = e, a()
        })
      }, r.sendCustomSysMsg = function(e) {
        s.verifyOptions(e, "scene to content", "sysmsg::sendCustomSysMsg"), s.verifyParamValid("scene", e.scene,
            this.message.validScenes, "sysmsg::sendCustomSysMsg"), this.processCallback(e), "p2p" === e.scene ?
          e.type = "customP2p" : e.type = "customTeam", e.sysMsg = new a(e);
        var t = "sendCustomSysMsg";
        return e.filter && (t = "sendFilterCustomSysMsg"), this.sendCmd(t, {
          sysMsg: e.sysMsg,
          single: !0
        }, e.callback), this.formatReturnSysMsg(e.sysMsg)
      }, r.formatReturnSysMsg = function(e) {
        return e = s.copy(e), this.protocol.completeSysMsg(e), e.status = "sending", e = a.reverse(e)
      }, r.getLocalSysMsgs = function(e) {
        var t, n = this.db,
          r = [];

        function c() {
          e.sysMsgs = r, e.done(t, e)
        }
        s.verifyOptions(e), e.category && s.verifyParamValid("category", e.category, a.validCategories,
          "sysmsg::getLocalSysMsgs"), e.type && s.verifyParamValid("type", e.type, a.validTypes,
          "sysmsg::getLocalSysMsgs"), i(e.limit) && (e.limit = 100), s.verifyParamType("limit", e.limit,
          "number", "sysmsg::getLocalSysMsgs"), s.verifyParamMax("limit", e.limit, 100,
          "sysmsg::getLocalSysMsgs"), o(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean",
          "sysmsg::getLocalSysMsgs") : e.reverse = !1, this.processCallback(e), n.enable ? n.getSysMsgs(e).then(
          function(e) {
            r = e, c()
          },
          function(e) {
            t = e, c()
          }) : c()
      }, r.updateLocalSysMsg = function(e) {
        var t, n = this.db,
          r = null;
        if (s.verifyOptions(e, "idServer", "sysmsg::updateLocalSysMsg"), this.processCallback(e), n.enable) {
          var i = s.filterObj(e, "idServer state localCustom");
          n.updateSysMsg(i).then(function(e) {
            r = e, o()
          }, function(e) {
            t = e, o()
          })
        } else o();

        function o() {
          e.sysMsg = r, e.done(t, e)
        }
      }, r.deleteLocalSysMsg = function(e) {
        var t, n = this.db;

        function r() {
          e.done(t, e)
        }
        s.verifyOptions(e, "idServer", "sysmsg::deleteLocalSysMsg"), this.processCallback(e), n.enable ? n.deleteSysMsg(
          e.idServer).then(function() {
          r()
        }, function(e) {
          t = e, r()
        }) : r()
      }, r.deleteAllLocalSysMsgs = function(e) {
        var t, n = this,
          r = n.db;

        function s() {
          n.protocol.onUpdateSysMsgUnread({}), e.done(t, e)
        }
        n.processCallback(e), r.enable && r.deleteAllSysMsgs().then(function() {
          s()
        }, function(e) {
          t = e, s()
        })
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0),
        i = s.undef,
        o = s.notundef,
        a = n(54),
        c = n(116),
        u = n(117),
        l = n(26);
      r.beforeSendMsg = function(e) {
        var t, n = this.protocol,
          r = e.msg;
        switch (r.to === this.account && (r.fromDeviceId = a.deviceId), r.userUpdateTime = n.myInfo && n.myInfo
          .updateTime, r.getScene()) {
          case "p2p":
            t = "sendMsg";
            break;
          case "team":
            t = "sendTeamMsg"
        }
        e.filter && (t = "sendFilterMsg", r.filter = !0), e.cmd = t
      }, r.afterSendMsg = function(e) {
        var t = e.rtnMsg,
          n = c.genSessionByMsg(t);
        this.protocol.onUpdateSession(n)
      }, r.beforeForwardMsg = function(e) {
        s.verifyOptions(e, "msg scene to", "msg::beforeForwardMsg"), e.msg.scene = e.scene, e.msg.to = e.to
      }, r.markMsgRead = function(e) {
        var t = this.protocol;
        !e || this.db.enable || t.options.autoMarkRead ? this.logger.warn(
          "api::markMsgRead: 不需要标记消息为已收到 (没有消息, 或者启用了数据库, 或者启用了自动标记已收到)") : t.markMsgRead(e, !0)
      }, r.sendMsgReceipt = function(e) {
        if (s.verifyOptions(e), this.processCallback(e), e.msg) {
          s.verifyOptions(e, "msg", "msg::sendMsgReceipt");
          var t = e.msg;
          s.verifyOptions(t, "target idClient time", !0, "msg.", "msg::sendMsgReceipt"), this.protocol.shouldSendMsgReceipt(
            t) ? this.sendCmd("sendMsgReceipt", {
            msgReceipt: {
              to: t.target,
              idClient: t.idClient,
              time: t.time
            }
          }, e.callback) : e.done()
        } else e.done()
      }, r.isMsgRemoteRead = function(e) {
        return this.protocol.isMsgRemoteRead(e)
      }, r.deleteMsg = function(e) {
        s.verifyOptions(e, "msg", "msg::deleteMsg");
        var t = e.msg;
        if ("team" !== t.scene && "out" !== t.flow || "success" !== t.status || t.from === t.to || t.isLocal)
          return e.done(l.newParamError("只能删除自己发送给别人的, 并且发送成功的非本地消息", {
            callFunc: "msg::deleteMsg"
          }), e);
        s.verifyOptions(t, ["scene", "to", "from", "time", "idClient", "idServer"], !0, "msg.",
          "msg::deleteMsg"), s.verifyParamValid("msg.scene", t.scene, this.message.validScenes,
          "msg::deleteMsg");
        var n = s.simpleClone(t);
        this.processPs(n), this.processCallback(e), o(e.opeAccount) ? n.opeAccount = e.opeAccount : i(n.opeAccount) &&
          (n.opeAccount = n.from), "p2p" === n.scene ? n.type = "deleteMsgP2p" : n.type = "deleteMsgTeam", n.deletedIdClient =
          n.idClient, n.deletedIdServer = n.idServer, n = new u(n), this.sendCmd("deleteMsg", {
            sysMsg: n,
            msg: t
          }, e.callback)
      };
      var m = {
        text: 0,
        image: 1,
        audio: 2,
        video: 3,
        geo: 4,
        notification: 5,
        file: 6,
        tip: 10,
        robot: 11,
        custom: 100
      };
      r.getHistoryMsgs = function(e) {
        var t;
        switch (s.verifyOptions(e, "scene to", "msg::getHistoryMsgs"), s.verifyParamValid("scene", e.scene,
            this.message.validScenes, "msg::getHistoryMsgs"), void 0 === e.beginTime && (e.beginTime = 0), s.verifyParamType(
            "beginTime", e.beginTime, "number", "msg::getHistoryMsgs"), void 0 === e.endTime && (e.endTime = 0),
          s.verifyParamType("endTime", e.endTime, "number", "msg::getHistoryMsgs"), void 0 !== e.lastMsgId &&
          null !== e.lastMsgId || (e.lastMsgId = "0"), void 0 === e.limit && (e.limit = 100), s.verifyParamType(
            "limit", e.limit, "number", "msg::getHistoryMsgs"), s.verifyParamMax("limit", e.limit, 100,
            "msg::getHistoryMsgs"), o(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean",
            "msg::getHistoryMsgs") : e.reverse = !1, o(e.asc) ? s.verifyParamType("asc", e.asc, "boolean",
            "msg::getHistoryMsgs") : e.asc = !1, i(e.msgTypes) ? e.msgTypes = [] : Array.isArray(e.msgTypes) ?
          (e.msgTypes = e.msgTypes.map(function(e) {
            return m[e]
          }), e.msgTypes = e.msgTypes.filter(function(e) {
            return "number" == typeof e
          })) : "number" == typeof m[e.msgTypes] ? e.msgTypes = [m[e.msgTypes]] : e.msgTypes = [], this.processCallback(
            e), e.asc && (e.cbaop = function(e, t) {
            e || (t.msgs = t.msgs.reverse())
          }), e.scene) {
          case "p2p":
            t = "getHistoryMsgs";
            break;
          case "team":
            t = "getTeamHistoryMsgs"
        }
        var n = {
          scene: e.scene,
          to: e.to,
          beginTime: e.beginTime,
          endTime: e.endTime,
          lastMsgId: e.lastMsgId,
          limit: e.limit,
          reverse: e.reverse,
          msgTypes: e.msgTypes
        };
        this.sendCmd(t, n, e.callback)
      }, r.searchHistoryMsgs = function(e) {
        var t;
        switch (s.verifyOptions(e, "scene to keyword", "msg::searchHistoryMsgs"), s.verifyParamValid("scene", e
            .scene, this.message.validScenes, "msg::searchHistoryMsgs"), void 0 === e.beginTime && (e.beginTime =
            0), s.verifyParamType("beginTime", e.beginTime, "number", "msg::searchHistoryMsgs"), void 0 === e.endTime &&
          (e.endTime = 0), s.verifyParamType("endTime", e.endTime, "number", "msg::searchHistoryMsgs"), void 0 ===
          e.limit && (e.limit = 100), s.verifyParamType("limit", e.limit, "number", "msg::searchHistoryMsgs"),
          s.verifyParamMax("limit", e.limit, 100, "msg::searchHistoryMsgs"), o(e.reverse) ? s.verifyParamType(
            "reverse", e.reverse, "boolean", "msg::searchHistoryMsgs") : e.reverse = !1, o(e.asc) ? s.verifyParamType(
            "asc", e.asc, "boolean", "msg::searchHistoryMsgs") : e.asc = !1, this.processCallback(e), e.asc &&
          (e.cbaop = function(e, t) {
            e || (t.msgs = t.msgs.reverse())
          }), e.scene) {
          case "p2p":
            t = "searchHistoryMsgs";
            break;
          case "team":
            t = "searchTeamHistoryMsgs"
        }
        var n = s.filterObj(e, "scene to beginTime endTime keyword limit reverse");
        this.sendCmd(t, n, e.callback)
      }, r.getLocalMsgs = function(e) {
        var t = this.db,
          n = null,
          r = [];
        s.verifyOptions(e);
        var a = !1;
        o(e.start) && (a = !0, s.verifyParamType("start", e.start, "number", "msg::getLocalMsgs"));
        var c = !1;

        function u() {
          var t = s.simpleClone(e);
          t.msgs = r, delete t.callback, delete t.done, e.done(n, t)
        }
        o(e.end) && (c = !0, s.verifyParamType("end", e.end, "number", "msg::getLocalMsgs")), a && c && e.end <=
          e.start && s.onParamError("参数 end 必须晚于 start"), i(e.limit) && (e.limit = 100), s.verifyParamType(
            "limit", e.limit, "number", "msg::getLocalMsgs"), s.verifyParamMin("limit", e.limit, 1,
            "msg::getLocalMsgs"), this.processCallback(e), t.enable ? t.getMsgs(e).then(function(e) {
            r = e, u()
          }, function(e) {
            (e = e || {}).message = e.message || "msg::getLocalMsgs:db error", u()
          }) : u()
      }, r.getLocalMsgByIdClient = function(e) {
        var t, n = this.db,
          r = null;

        function i() {
          e.msg = r, e.done(t, e)
        }
        s.verifyOptions(e, "idClient", "msg::getLocalMsgByIdClient"), this.processCallback(e), n.enable ? n.getMsgByIdClient(
          e.idClient).then(function(e) {
          e && (r = e), i()
        }, function(e) {
          t = e, i()
        }) : i()
      }, r.getLocalMsgsByIdClients = function(e) {
        var t, n = this.db,
          r = [];

        function i() {
          e.msgs = r, e.done(t, e)
        }
        s.verifyOptions(e, "idClients", "msg::getLocalMsgByIdClient"), s.verifyParamType("idClients", e.idClients,
            "array", "msg::getLocalMsgByIdClient"), this.processCallback(e), n.enable ? n.getMsgsByIdClients(e.idClients)
          .then(function(e) {
            r = e.filter(function(e) {
              return !!e
            }), i()
          }, function(e) {
            t = e, i()
          }) : i()
      }, r.updateLocalMsg = function(e) {
        var t, n = this.db,
          r = null;
        if (s.verifyOptions(e, "idClient", "msg::updateLocalMsg"), this.processCallback(e), n.enable) {
          var i = s.filterObj(e, "idClient localCustom");
          n.updateMsg(i).then(function(e) {
            r = e, o()
          }, function(e) {
            t = e, o()
          })
        } else o();

        function o() {
          e.msg = r, e.done(t, e)
        }
      }, r.deleteLocalMsg = function(e) {
        var t;
        s.verifyOptions(e, "msg", "msg::deleteLocalMsg");
        var n = e.msg;

        function r() {
          e.done(t, e)
        }
        s.verifyOptions(n, "idClient sessionId", !0, "msg.", "msg::deleteLocalMsg"), this.processCallback(e),
          this.protocol.deleteLocalMsg(n).then(r, function(e) {
            t = e, r()
          })
      }, r.deleteLocalMsgsBySession = function(e) {
        var t, n = this.db;

        function r() {
          e.done(t, e)
        }
        s.verifyOptions(e, "scene to", "msg::deleteLocalMsgsBySession"), s.verifyParamValid("scene", e.scene,
            this.message.validScenes, "msg::deleteLocalMsgsBySession"), e.sessionId = e.scene + "-" + e.to,
          this.processCallback(e), n.enable ? n.deleteMsgsBySessionId(e.sessionId).then(function() {
            r()
          }, function(e) {
            t = e, r()
          }) : r()
      }, r.deleteAllLocalMsgs = function(e) {
        var t, n = this.db;

        function r() {
          e.done(t, e)
        }
        this.processCallback(e), n.enable && n.deleteAllMsgs().then(function() {
          r()
        }, function(e) {
          t = e, r()
        })
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0),
        i = s.undef,
        o = s.notundef;
      r.setCurrSession = function(e) {
        this.resetSessionUnread(e), this.protocol.setCurrSession(e)
      }, r.resetAllSessionUnread = function() {
        for (var e in this.protocol.sessionSet) this.protocol.sessionSet[e].unread > 0 && this.resetSessionUnread(
          e)
      }, r.resetSessionUnread = function(e) {
        if (this.protocol.resetSessionUnread(e), this.options.syncSessionUnread) {
          var t = this.protocol.findSession(e);
          if (t)
            if (t.lastMsg)
              if (t.scene && t.to) {
                var n = t.lastMsg.time;
                if (t && t.ack && t.ack >= n) this.logger.warn(
                  "api::resetSessionUnread: session ack not needs " + e);
                else {
                  var r = {
                    scene: "p2p" === t.scene ? 0 : 1,
                    to: t.to,
                    timetag: n
                  };
                  this.sendCmd("markSessionAck", r)
                }
              } else this.logger.warn("api::resetSessionUnread: session.scene|to undefined " + e);
          else this.logger.warn("api::resetSessionUnread: session.lastMsg undefined " + e);
          else this.logger.warn("api::resetSessionUnread: session undefined " + e)
        }
      }, r.resetCurrSession = function() {
        this.protocol.setCurrSession("")
      }, r.insertLocalSession = function(e) {
        var t, n;

        function r() {
          e.session = n, e.done(t, e)
        }
        s.verifyOptions(e, "scene to", "scene::insertLocalSession"), s.verifyParamValid("scene", e.scene, this.message
          .validScenes, "scene::insertLocalSession"), this.processCallback(e), this.protocol.insertLocalSession(
          e).then(function(e) {
          n = e, r()
        }, function(e) {
          t = e, r()
        })
      }, r.getLocalSessions = function(e) {
        var t, n = this,
          r = n.db,
          a = [];

        function c() {
          e.sessions = a, e.done(t, e)
        }
        s.verifyOptions(e), i(e.limit) && (e.limit = 100), s.verifyParamType("limit", e.limit, "number",
            "scene::getLocalSessions"), s.verifyParamMax("limit", e.limit, 100, "scene::getLocalSessions"), o(e
            .reverse) ? s.verifyParamType("reverse", e.reverse, "boolean", "scene::getLocalSessions") : e.reverse = !
          1, n.processCallback(e), r.enable ? r.getSessions(e).then(function(e) {
            a = e, n.protocol.mergeSessions(a), c()
          }, function(e) {
            t = e, c()
          }) : c()
      }, r.getLocalSession = function(e) {
        var t, n = this.db,
          r = null;
        if (s.verifyOptions(e, "sessionId", "scene::getLocalSession"), s.verifyParamType("sessionId", e.sessionId,
            "string", "scene::getLocalSession"), n.enable) return this.processCallback(e), void n.getSession(e.sessionId)
          .then(function(e) {
            e && (r = e), i()
          }, function(e) {
            t = e, i()
          });

        function i() {
          e.done(t, r)
        }
        this.protocol.sessionSet && this.protocol.sessionSet[e.sessionId] && (r = this.protocol.sessionSet[e.sessionId]),
          i()
      }, r.updateLocalSession = function(e) {
        var t, n = this,
          r = n.db;
        s.verifyOptions(e, "id", "scene::updateLocalSession"), n.processCallback(e);
        var i = s.filterObj(e, "id localCustom");

        function o() {
          n.protocol.onUpdateSession(i), e.session = i, e.done(t, e)
        }
        r.enable ? r.updateSession(i).then(function(e) {
          i = e, o()
        }, function(e) {
          t = e, o()
        }) : o()
      }, r.deleteLocalSession = function(e) {
        var t, n = this,
          r = n.db;

        function i() {
          e.done(t, e)
        }
        s.verifyOptions(e, "id", "session::deleteLocalSession"), n.processCallback(e), r.enable ? r.deleteSession(
          e.id).then(function() {
          n.protocol.deleteLocalSession(e.id), i()
        }, function(e) {
          t = e, i()
        }) : i()
      }, r.deleteSession = function(e) {
        s.verifyOptions(e, "scene to", "session::deleteSession"), this.processCallback(e), e.sessions = [{
          scene: e.scene,
          to: e.to
        }], this.deleteSessions(e)
      }, r.deleteSessions = function(e) {
        s.verifyOptions(e, "sessions", "session::deleteSessions"), s.verifyParamType("sessions", e.sessions,
          "array", "session::deleteSessions"), e.sessions.forEach(function(e, t) {
          s.verifyOptions(e, "scene to", !0, "sessions[" + t + "].", "session::deleteSessions")
        }), this.processCallback(e), this.sendCmd("deleteSessions", {
          sessions: e.sessions.map(function(e) {
            return e.scene + "|" + e.to
          })
        }, e.callback)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0),
        i = s.undef,
        o = n(119),
        a = n(86);
      r.createTeam = function(e) {
        s.verifyOptions(e, "type name", "team::createTeam"), i(e.accounts) ? e.accounts = [] : s.verifyParamType(
          "accounts", e.accounts, "array", "team::createTeam"), e.action = "create", this.processPs(e), this.processCallback(
          e), e.team = new o(e);
        var t = {
          team: e.team,
          accounts: e.accounts.slice(0),
          ps: e.ps
        };
        this.sendCmd("createTeam", t, e.callback)
      }, r.updateTeam = function(e) {
        s.verifyOptions(e, "teamId", "team::updateTeam"), e.action = "update", this.processCallback(e), e.team =
          new o(e), this.sendCmd("updateTeam", {
            team: e.team,
            single: !0
          }, e.callback)
      }, r.addTeamMembers = function(e) {
        s.verifyOptions(e, "teamId accounts", "team::addTeamMembers"), s.verifyParamType("accounts", e.accounts,
          "array", "team::addTeamMembers"), this.processPs(e), s.notexist(e.custom) && (e.custom = ""), this.processCallback(
          e);
        var t = {
          teamId: e.teamId,
          accounts: e.accounts.slice(0),
          ps: e.ps,
          attach: e.custom
        };
        this.sendCmd("addTeamMembers", t, e.callback)
      }, r.removeTeamMembers = function(e) {
        s.verifyOptions(e, "teamId accounts", "team::removeTeamMembers"), s.verifyParamType("accounts", e.accounts,
          "array", "team::removeTeamMembers"), this.processCallback(e);
        var t = {
          teamId: e.teamId,
          accounts: e.accounts.slice(0)
        };
        this.sendCmd("removeTeamMembers", t, e.callback)
      }, r.acceptTeamInvite = function(e) {
        s.verifyOptions(e, "idServer teamId from", "team::acceptTeamInvite"), this.processCallback(e);
        var t = {
          idServer: e.idServer,
          teamId: e.teamId,
          from: e.from
        };
        this.sendCmd("acceptTeamInvite", t, e.callback)
      }, r.rejectTeamInvite = function(e) {
        s.verifyOptions(e, "idServer teamId from", "team::rejectTeamInvite"), this.processPs(e), this.processCallback(
          e);
        var t = {
          idServer: e.idServer,
          teamId: e.teamId,
          from: e.from,
          ps: e.ps
        };
        this.sendCmd("rejectTeamInvite", t, e.callback)
      }, r.applyTeam = function(e) {
        s.verifyOptions(e, "teamId", "team::applyTeam"), this.processPs(e), this.processCallback(e);
        var t = {
          teamId: e.teamId,
          ps: e.ps
        };
        this.sendCmd("applyTeam", t, e.callback)
      }, r.passTeamApply = function(e) {
        s.verifyOptions(e, "idServer teamId from", "team::passTeamApply"), this.processCallback(e);
        var t = {
          idServer: e.idServer,
          teamId: e.teamId,
          from: e.from
        };
        this.sendCmd("passTeamApply", t, e.callback)
      }, r.rejectTeamApply = function(e) {
        s.verifyOptions(e, "idServer teamId from", "team::rejectTeamApply"), this.processPs(e), this.processCallback(
          e);
        var t = {
          idServer: e.idServer,
          teamId: e.teamId,
          from: e.from,
          ps: e.ps
        };
        this.sendCmd("rejectTeamApply", t, e.callback)
      }, r.addTeamManagers = function(e) {
        s.verifyOptions(e, "teamId accounts", "team::addTeamManagers"), s.verifyParamType("accounts", e.accounts,
          "array", "team::addTeamManagers"), this.processCallback(e);
        var t = {
          teamId: e.teamId,
          accounts: e.accounts.slice(0)
        };
        this.sendCmd("addTeamManagers", t, e.callback)
      }, r.removeTeamManagers = function(e) {
        s.verifyOptions(e, "teamId accounts", "team::removeTeamManagers"), s.verifyParamType("accounts", e.accounts,
          "array", "team::removeTeamManagers"), this.processCallback(e);
        var t = {
          teamId: e.teamId,
          accounts: e.accounts.slice(0)
        };
        this.sendCmd("removeTeamManagers", t, e.callback)
      }, r.updateInfoInTeam = function(e) {
        s.verifyOptions(e, "teamId", "team::updateInfoInTeam"), this.processCallback(e), this.sendCmd(
          "updateInfoInTeam", {
            teamMember: new a(e),
            single: !0
          }, e.callback)
      }, r.updateNickInTeam = function(e) {
        s.verifyOptions(e, "teamId account", "team::updateNickInTeam"), this.processCallback(e), this.sendCmd(
          "updateNickInTeam", {
            teamMember: new a(e),
            single: !0
          }, e.callback)
      }, r.updateMuteStateInTeam = function(e) {
        s.verifyOptions(e, "teamId account mute", "team::updateMuteStateInTeam"), this.processCallback(e), e.mute =
          e.mute ? 1 : 0, this.sendCmd("updateMuteStateInTeam", e)
      }, r.getMutedTeamMembers = function(e) {
        s.verifyOptions(e, "teamId", "team::getMutedTeamMembers"), this.processCallback(e), this.sendCmd(
          "getMutedTeamMembers", e)
      }, r.leaveTeam = function(e) {
        s.verifyOptions(e, "teamId", "team::leaveTeam"), this.processCallback(e);
        var t = {
          teamId: e.teamId
        };
        this.sendCmd("leaveTeam", t, e.callback)
      }, r.transferTeam = function(e) {
        s.verifyOptions(e, "teamId account leave", "team::transferTeam"), s.verifyParamType("leave", e.leave,
          "boolean", "team::transferTeam"), this.processCallback(e);
        var t = {
          teamId: e.teamId,
          account: e.account,
          leave: e.leave
        };
        this.sendCmd("transferTeam", t, e.callback)
      }, r.dismissTeam = function(e) {
        s.verifyOptions(e, "teamId", "team::dismissTeam"), this.processCallback(e);
        var t = {
          teamId: e.teamId
        };
        this.sendCmd("dismissTeam", t, e.callback)
      }, r.getTeam = function(e) {
        var t, n = this,
          r = n.db;

        function i() {
          n.sendCmd("getTeam", {
            teamId: e.teamId
          }, e.callback)
        }
        s.verifyOptions(e, "teamId", "team::getTeam"), n.processCallback(e), e.cbaop = function(e, r) {
          e || n.logger.log("api::getTeam: cbaop " + t, r)
        }, t = e.teamId, r.enable && !e.sync ? r.getTeam(t).then(function(r) {
          r ? (n.logger.log("api::getTeam: db.getTeam " + t, r), e.done(null, r)) : i()
        }, i) : i()
      }, r.getTeams = function(e) {
        var t = this,
          n = t.db,
          r = 0;

        function i() {
          t.sendCmd("getTeams", {
            timetag: r,
            NOTSTORE: "timetag"
          }, e.callback)
        }
        s.verifyOptions(e), t.processCallback(e), n.enable ? n.getTeamsTimetag().then(function(e) {
          r = e, i()
        }, i) : i()
      }, r.getTeamMembers = function(e) {
        var t = this,
          n = 0;
        s.verifyOptions(e, "teamId", "team::getTeamMembers"), t.processCallback(e), t.sendCmd("getTeamMembers", {
          teamId: e.teamId,
          timetag: n,
          NOTSTORE: "timetag"
        }, e.callback)
      }, r.getTeamMemberByTeamIdAndAccount = function(e) {
        var t = this,
          n = 0;
        s.verifyParamType("teamId", e.teamId, "numeric or numeric string",
          "team::getTeamMemberByTeamIdAndAccount"), s.verifyOptions(e, "account",
          "team::getTeamMemberByTeamIdAndAccount"), t.processCallback(e), t.sendCmd("getTeamMembers", {
          teamId: e.teamId,
          timetag: n,
          NOTSTORE: "timetag"
        }, function(t, n, r) {
          var s = {};
          if (n && n.members && n.members.length)
            for (var i = 0; i < n.members.length; i++)
              if (n.members[i].account === e.account) {
                s[e.account] = n.members[i];
                break
              } e.callback(t, s, r)
        })
      }, r.notifyForNewTeamMsg = function(e) {
        s.verifyOptions(e, "teamIds", "team::notifyForNewTeamMsg"), this.protocol.notifyForNewTeamMsg(e.teamIds)
          .then(function(t) {
            e.done(null, t)
          }, function(t) {
            e.done(t)
          })
      }, r.getMyTeamMembers = function(e) {
        s.verifyOptions(e, "teamIds", "team::getMyTeamMembers");
        var t = this.processCallbackPromise(e);
        return this.sendCmd("getMyTeamMembers", e), t
      }, r.getLocalTeams = function(e) {
        var t, n = this.db,
          r = [];

        function i() {
          e.teams = r, e.done(t, e)
        }
        s.verifyOptions(e, "teamIds", "team::getLocalTeams"), s.verifyParamType("teamIds", e.teamIds, "array",
          "team::getLocalTeams"), this.processCallback(e), n.enable ? n.getTeamsByTeamIds(e.teamIds).then(
          function(e) {
            r = e.filter(function(e) {
              return !!e
            }), i()
          },
          function(e) {
            t = e, i()
          }) : i()
      }, r.getLocalTeamMembers = function(e) {
        var t, n = this.db,
          r = [];

        function i() {
          e.members = r, e.done(t, e)
        }
        s.verifyOptions(e, "teamId accounts", "team::getLocalTeamMembers"), s.verifyParamType("accounts", e.accounts,
          "array", "team::getLocalTeamMembers"), this.processCallback(e), n.enable ? n.getInvalidTeamMembers(
          e.teamId, e.accounts).then(function(e) {
          r = e.filter(function(e) {
            return !!e
          }), i()
        }, function(e) {
          t = e, i()
        }) : i()
      }, r.deleteLocalTeam = function(e) {
        var t, n = this.db;

        function r() {
          e.done(t, e)
        }
        s.verifyOptions(e, "teamId", "team::deleteLocalTeam"), this.processCallback(e), n.enable ? n.deleteTeam(
          e.teamId).then(function() {
          r()
        }, function(e) {
          t = e, r()
        }) : r()
      }, r.muteTeamAll = function(e) {
        switch (s.verifyOptions(e, "teamId type", "team::muteTeamAll"), e.type) {
          case "none":
            e.muteType = 0;
            break;
          case "normal":
            e.muteType = 1;
            break;
          case "all":
            e.muteType = 2;
            break;
          default:
            e.muteType = 1
        }
        this.processCallback(e), this.sendCmd("muteTeamAll", e)
      }, r.sendTeamMsgReceipt = function(e) {
        s.verifyOptions(e, "teamMsgReceipts", "team::sendTeamMsgReceipt"), this.processCallback(e), this.sendCmd(
          "sendTeamMsgReceipt", e)
      }, r.getTeamMsgReads = function(e) {
        s.verifyOptions(e, "teamMsgReceipts", "team::getTeamMsgReads"), this.processCallback(e), this.sendCmd(
          "getTeamMsgReads", e)
      }, r.getTeamMsgReadAccounts = function(e) {
        s.verifyOptions(e, "teamMsgReceipt", "team::getTeamMsgReadAccounts"), this.processCallback(e), this.sendCmd(
          "getTeamMsgReadAccounts", e)
      }
    },
    function(e, t, n) {
      "use strict";
      n(32).fn.getRobots = function(e) {
        (e = e || {}).type = "getRobots", this.processCallback(e), this.sendCmd("sync", {
          sync: {
            robots: 0
          }
        }, e.callback)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0),
        i = s.notundef,
        o = n(283);
      r.friendRequest = function(e) {
        s.verifyOptions(e, "type account", "friend::friendRequest"), s.verifyParamValid("type", e.type, o.validTypes(),
          "friend::friendRequest"), this.processPs(e), this.processCallback(e);
        var t = {
          account: e.account,
          type: o.getByteFromType(e.type),
          ps: e.ps
        };
        i(e.idServer) && (t.idServer = e.idServer), this.sendCmd("friendRequest", t, e.callback)
      }, r.addFriend = function(e) {
        e.type = "addFriend", this.friendRequest(e)
      }, r.applyFriend = function(e) {
        e.type = "applyFriend", this.friendRequest(e)
      }, r.passFriendApply = function(e) {
        s.verifyOptions(e, "idServer", "friend::passFriendApply"), e.type = "passFriendApply", this.friendRequest(
          e)
      }, r.rejectFriendApply = function(e) {
        s.verifyOptions(e, "idServer", "friend::rejectFriendApply"), e.type = "rejectFriendApply", this.friendRequest(
          e)
      }, r.deleteFriend = function(e) {
        s.verifyOptions(e, "account", "friend::deleteFriend"), this.processCallback(e), this.sendCmd(
          "deleteFriend", {
            account: e.account
          }, e.callback)
      }, r.updateFriend = function(e) {
        this.processCallback(e);
        var t = new o(e);
        this.sendCmd("updateFriend", {
          friend: t,
          single: !0
        }, e.callback)
      }, r.getFriends = function(e) {
        var t = this,
          n = t.db,
          r = 0;

        function i() {
          t.sendCmd("getFriends", {
            timetag: r,
            NOTSTORE: "timetag"
          }, e.callback)
        }
        s.verifyOptions(e), t.processCallback(e), n.enable ? n.getFriendsTimetag().then(function(e) {
          r = e, i()
        }, i) : i()
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0),
        i = s.objs2accounts,
        o = n(129);
      r.updateMyInfo = function(e) {
        s.verifyOptions(e), this.processCallback(e), e.user = new o(e), delete e.user.account, this.sendCmd(
          "updateMyInfo", {
            user: e.user,
            single: !0
          }, e.callback)
      }, r.getMyInfo = function(e) {
        return (e = e || {}).account = this.account, this.getUser(e)
      }, r.getUser = function(e) {
        var t, n = this,
          r = n.db;

        function i() {
          n.sendCmd("getUsers", {
            accounts: [t],
            single: !0
          }, e.callback)
        }
        s.verifyOptions(e, "account", "user::getUser"), n.processCallback(e), e.cbaop = function(e, r) {
          if (!e) return r = r[0] || null, n.logger.log("api::getUser: cbaop " + t, r), r
        }, t = e.account, e.sync ? i() : r.enable ? r.getUser(t).then(function(r) {
          r ? (n.logger.log("api::getUser: db.getUser " + t, r), e.done(null, r)) : i()
        }, i) : i()
      }, r.getUsers = function(e) {
        var t, n = this,
          r = n.db,
          o = [];

        function a() {
          n.sendCmd("getUsers", {
            accounts: t,
            single: !0
          }, e.callback)
        }
        s.verifyOptions(e, "accounts", "user::getUsers"), s.verifyParamType("accounts", e.accounts, "array",
            "user::getUsers"), n.processCallback(e), e.cbaop = function(e, r) {
            if (!e) return r = r.concat(o), n.logger.log("api::getUsers: cbaop " + t, r), r
          }, t = s.deduplicate(e.accounts), s.verifyArrayMax("accounts", e.accounts, 150, "user::getUsers"), e.sync ?
          a() : r.enable ? r.getUsers(t).then(function(r) {
            if (r && r.length === t.length) n.logger.log("api::getUsers: db.getUsers", r), e.done(null, r);
            else {
              o = r;
              var s = i(r),
                c = [];
              t.forEach(function(e) {
                -1 === s.indexOf(e) && c.push(e)
              }), t = c, a()
            }
          }, a) : a()
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0);
      r.markInBlacklist = function(e) {
        s.verifyOptions(e, "account isAdd", "relation::markInBlacklist"), s.verifyParamType("isAdd", e.isAdd,
          "boolean", "relation::markInBlacklist"), this.processCallback(e), this.sendCmd("markInBlacklist", {
          account: e.account,
          isAdd: e.isAdd
        }, e.callback)
      }, r.addToBlacklist = function(e) {
        return e.isAdd = !0, this.markInBlacklist(e)
      }, r.removeFromBlacklist = function(e) {
        return e.isAdd = !1, this.markInBlacklist(e)
      }, r.markInMutelist = function(e) {
        s.verifyOptions(e, "account", "relation::markInMutelist"), s.verifyParamType("isAdd", e.isAdd,
          "boolean", "relation::markInMutelist"), this.processCallback(e), this.sendCmd("markInMutelist", {
          account: e.account,
          isAdd: e.isAdd
        }, e.callback)
      }, r.addToMutelist = function(e) {
        return e.isAdd = !0, this.markInMutelist(e)
      }, r.removeFromMutelist = function(e) {
        return e.isAdd = !1, this.markInMutelist(e)
      }, r.getRelations = function(e) {
        var t = this,
          n = t.db,
          r = 0;

        function i() {
          t.sendCmd("getRelations", {
            timetag: r,
            NOTSTORE: "timetag"
          }, e.callback)
        }
        e = s.verifyOptions(e), t.processCallback(e), n.enable ? n.getRelationsTimetag().then(function(e) {
          r = e, i()
        }, i) : i()
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0);
      r.kick = function(e) {
        s.verifyOptions(e, "deviceIds", "link::kick"), this.processCallback(e), this.sendCmd("kick", {
          deviceIds: e.deviceIds.slice(0)
        }, e.callback)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(32).fn,
        s = n(0),
        i = s.isArray,
        o = n(86);
      r.mergeObjArray = function(e, t, n) {
          return e || (e = []), t ? (i(t) || (t = [t]), t.length ? (n = n || {}, s.mergeObjArray(e, t, n)) : e) :
            e
        }, r.cutObjArray = function(e, t, n) {
          return e && t ? (i(t) || (t = [t]), t.length ? (n = n || {}, s.cutObjArray(e, t, n)) : e) : e
        }, r.mergeLoginPorts = function(e, t) {
          return this.mergeObjArray(e, t, {
            keyPath: "deviceId"
          })
        }, r.cutLoginPorts = function(e, t) {
          return this.cutObjArray(e, t, {
            keyPath: "deviceId",
            sortPath: "type"
          })
        }, r.mergeRelations = function(e, t) {
          return this.mergeObjArray(e, t, {
            keyPath: "account"
          })
        }, r.cutRelations = function(e, t) {
          return this.cutObjArray(e, t, {
            keyPath: "account"
          })
        }, r.findRelation = function(e, t) {
          return s.findObjInArray(e, {
            keyPath: "account",
            value: t
          })
        }, r.mergeFriends = function(e, t) {
          return this.mergeObjArray(e, t, {
            keyPath: "account"
          })
        }, r.cutFriends = function(e, t) {
          return this.cutObjArray(e, t, {
            keyPath: "account"
          })
        }, r.cutFriendsByAccounts = function(e, t) {
          i(t) || (t = [t]);
          var n = t.map(function(e) {
            return {
              account: e
            }
          });
          return this.cutFriends(e, n)
        }, r.findFriend = function(e, t) {
          return s.findObjInArray(e, {
            keyPath: "account",
            value: t
          })
        }, r.mergeUsers = function(e, t) {
          return this.mergeObjArray(e, t, {
            keyPath: "account"
          })
        }, r.findUser = function(e, t) {
          return s.findObjInArray(e, {
            keyPath: "account",
            value: t
          })
        }, r.mergeTeams = function(e, t) {
          return this.mergeObjArray(e, t, {
            keyPath: "teamId"
          })
        }, r.cutTeams = function(e, t) {
          return this.cutObjArray(e, t, {
            keyPath: "teamId"
          })
        }, r.findTeam = function(e, t) {
          return s.findObjInArray(e, {
            keyPath: "teamId",
            value: t
          })
        }, r.assembleTeamOwner = o.assembleOwner, r.assembleTeamMembers = o.assembleMembers, r.genTeamMemberId =
        o.genId, r.mergeTeamMembers = function(e, t) {
          return this.mergeObjArray(e, t)
        }, r.cutTeamMembers = function(e, t) {
          return this.cutObjArray(e, t)
        }, r.cutTeamMembersByAccounts = function(e, t, n) {
          i(n) || (n = [n]);
          var r = o.assembleMembers({
            teamId: t
          }, n);
          return this.cutTeamMembers(e, r)
        }, r.findTeamMember = function(e, t) {
          return s.findObjInArray(e, {
            keyPath: "id",
            value: t
          })
        }, r.mergeSessions = function(e, t) {
          return this.mergeObjArray(e, t, {
            sortPath: "updateTime",
            desc: !0
          })
        }, r.cutSessions = function(e, t) {
          return this.cutObjArray(e, t)
        }, r.cutSessionsByIds = function(e, t) {
          i(t) || (t = [t]);
          var n = t.map(function(e) {
            return {
              id: e
            }
          });
          return this.cutSessions(e, n)
        }, r.findSession = function(e, t) {
          return s.findObjInArray(e, {
            keyPath: "id",
            value: t
          })
        }, r.mergeMsgs = function(e, t) {
          return this.mergeObjArray(e, t, {
            keyPath: "idClient",
            sortPath: "time"
          })
        }, r.cutMsgs = function(e, t) {
          return this.cutObjArray(e, t, {
            keyPath: "idClient"
          })
        }, r.cutMsgsByIdClients = function(e, t) {
          i(t) || (t = [t]);
          var n = t.map(function(e) {
            return {
              idClient: e
            }
          });
          return this.cutMsgs(e, n)
        }, r.findMsg = function(e, t) {
          return s.findObjInArray(e, {
            keyPath: "idClient",
            value: t
          })
        }, r.mergeSysMsgs = function(e, t) {
          return this.mergeObjArray(e, t, {
            keyPath: "idServer",
            desc: !0
          })
        }, r.cutSysMsgs = function(e, t) {
          return this.cutObjArray(e, t, {
            keyPath: "idServer"
          })
        }, r.cutSysMsgsByIdServers = function(e, t) {
          i(t) || (t = [t]);
          var n = t.map(function(e) {
            return {
              idServer: e
            }
          });
          return this.cutSysMsgs(e, n)
        }, r.findSysMsg = function(e, t) {
          return s.findObjInArray(e, {
            keyPath: "idServer",
            value: t
          })
        }
    },
    function(e, t, n) {
      "use strict";
      var r = n(72),
        s = n(0),
        i = {
          welcome: "00",
          text: "01",
          link: "03"
        },
        o = {
          "01": "text",
          "02": "image",
          "03": "answer",
          11: "template"
        };

      function a(e) {
        s.verifyOptions(e, "content", "msg::RobotMessage"), s.undef(e.robotAccid) && (e.robotAccid = e.to);
        var t = e.content;
        switch (t.type) {
          case "welcome":
            s.undef(e.body) && (this.body = "欢迎消息");
            break;
          case "text":
            s.verifyOptions(t, "content", "msg::RobotMessage"), s.undef(e.body) && (this.body = t.content);
            break;
          case "link":
            s.verifyOptions(t, "target", "msg::RobotMessage")
        }
        t.type && (t.type = i[t.type]), t = {
          param: t,
          robotAccid: e.robotAccid
        }, this.attach = JSON.stringify(t), e.type = "robot", r.call(this, e)
      }
      a.prototype = Object.create(r.prototype), a.reverse = function(e) {
        var t = r.reverse(e);
        if ("robot" === t.type) {
          var n = JSON.parse(e.attach);
          if (n.param && (n.param.type = o[n.param.type] || "unknown"), n.robotMsg) {
            var i = (n = s.merge(n, n.robotMsg)).message;
            "bot" === n.flag ? n.message = i.map(function(e) {
              return e.type = o[e.type] || "unknown", e
            }) : n.flag, delete n.robotMsg
          }
          t.content = n
        }
        return t
      }, e.exports = a
    },
    function(e, t, n) {
      "use strict";
      var r = n(72),
        s = n(0);

      function i(e) {
        s.verifyOptions(e, "tip", "msg::TipMessage"), e.type = "tip", r.call(this, e), this.body = e.tip
      }
      i.prototype = Object.create(r.prototype), i.reverse = function(e) {
        var t = r.reverse(e);
        return t.text = "", t.tip = e.body, e.attach && (t.attach = e.attach), t
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(72),
        s = n(0);

      function i(e) {
        s.verifyOptions(e, "content", "msg::CustomMessage"), e.type = "custom", r.call(this, e), this.attach = e.content
      }
      i.prototype = Object.create(r.prototype), i.reverse = function(e) {
        var t = r.reverse(e);
        return t.content = e.attach, t
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(0).notundef,
        s = n(72),
        i = n(80).IM,
        o = n(119),
        a = n(129),
        c = {
          0: "addTeamMembers",
          1: "removeTeamMembers",
          2: "leaveTeam",
          3: "updateTeam",
          4: "dismissTeam",
          5: "passTeamApply",
          6: "transferTeam",
          7: "addTeamManagers",
          8: "removeTeamManagers",
          9: "acceptTeamInvite",
          10: "updateTeamMute",
          101: "netcallMiss",
          102: "netcallBill"
        };

      function u() {}
      u.prototype = Object.create(s.prototype), u.reverse = function(e) {
        var t = s.reverse(e);
        if (e.attach = e.attach ? "" + e.attach : "", e.attach) {
          var n = JSON.parse(e.attach);
          if (t.attach = {
              type: c[n.id] || n.id
            }, r(n.data)) {
            var u = n.data;
            r(u.tinfo) && (t.attach.team = o.reverse(i.syncUnserialize(u.tinfo, "team"), !0)), r(u.ids) && (t.attach
                .accounts = u.ids), r(u.id) && (t.attach.account = u.id), r(u.uinfos) && (t.attach.users = u.uinfos
                .map(function(e) {
                  return a.reverse(i.syncUnserialize(e, "user"))
                })), r(u.mute) && (t.attach.mute = 1 == +u.mute), r(u.attach) && (t.attach.custom = u.attach),
              r(u.channel) && (t.attach.channelId = u.channel), r(u.calltype) && (t.attach.netcallType = u.calltype),
              r(u.duration) && (t.attach.duration = u.duration), r(u.time) && (t.attach.time = u.time), r(u.from) &&
              (t.attach.from = u.from), r(u.ext) && (t.attach.ext = u.ext), t.attach.accounts && t.attach.accounts
              .length <= 2 && t.from === t.to && t.attach.accounts.some(function(e) {
                if (e !== t.to) return t.to = e, !0
              })
          }
        } else t.attach = {};
        return t
      }, e.exports = u
    },
    function(e, t, n) {
      "use strict";
      var r = n(72),
        s = n(0);

      function i(e) {
        e.type = "geo", s.verifyOptions(e, "geo", "msg::GeoMessage"), s.verifyOptions(e.geo, "lng lat title", !0,
          "geo.", "msg::GeoMessage"), s.verifyParamType("geo.lng", e.geo.lng, "number", "msg::GeoMessage"), s.verifyParamType(
          "geo.lat", e.geo.lat, "number", "msg::GeoMessage"), s.verifyParamType("geo.title", e.geo.title,
          "string", "msg::GeoMessage"), r.call(this, e), this.attach = JSON.stringify(e.geo)
      }
      i.prototype = Object.create(r.prototype), i.reverse = function(e) {
        var t = r.reverse(e);
        return e.attach = e.attach ? "" + e.attach : "", t.geo = e.attach ? JSON.parse(e.attach) : {}, t
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(128),
        s = n(0);

      function i() {}
      i.prototype = Object.create(r.prototype), i.verifyFile = function(e, t) {
        s.verifyOptions(e, "dur w h", !0, "file.", t)
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(128),
        s = n(0);

      function i() {}
      i.prototype = Object.create(r.prototype), i.verifyFile = function(e, t) {
        s.verifyOptions(e, "dur", !0, "file.", t)
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = n(128);

      function i() {}
      i.prototype = Object.create(s.prototype), i.verifyFile = function(e, t) {
        r.verifyOptions(e, "w h", !0, "file.", t)
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(72),
        s = n(0);

      function i(e) {
        s.verifyOptions(e, "text", "msg::TextMessage"), e.type = "text", r.call(this, e)
      }
      i.prototype = Object.create(r.prototype), i.reverse = function(e) {
        return r.reverse(e)
      }, e.exports = i
    },
    function(e, t, n) {
      "use strict";
      var r = n(0),
        s = function(e) {
          this.account = e.account
        },
        i = s.prototype,
        o = i.Message = n(72),
        a = i.TextMessage = n(411),
        c = i.FileMessage = n(128),
        u = i.GeoMessage = n(407),
        l = i.NotificationMessage = n(406),
        m = i.CustomMessage = n(405),
        d = i.TipMessage = n(404),
        p = i.RobotMessage = n(403);
      i.validScenes = o.validScenes, i.validTypes = o.validTypes, i.reverse = function(e) {
        var t;
        switch (o.getType(e)) {
          case "text":
            t = a.reverse(e);
            break;
          case "image":
          case "audio":
          case "video":
          case "file":
            t = c.reverse(e);
            break;
          case "geo":
            t = u.reverse(e);
            break;
          case "notification":
            t = l.reverse(e);
            break;
          case "custom":
            t = m.reverse(e);
            break;
          case "tip":
            t = d.reverse(e);
            break;
          case "robot":
            t = p.reverse(e);
            break;
          default:
            t = o.reverse(e)
        }
        return o.setExtra(t, this.account), t
      }, i.reverseMsgs = function(e, t) {
        var n, s, i = this;
        return e.map(function(e) {
          return e = i.reverse(e), t && ((n = t.modifyObj) && (e = r.merge(e, n)), s = t.mapper, r.isFunction(
            s) && (e = s(e))), e
        })
      }, e.exports = s
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(54),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(25).fn,
        a = n(0),
        c = i.default.clientTypeMap;

      function u(e) {
        e = e || {};
        var t = a.copy(e);
        return t.clientType && (t.clientType = c[t.clientType] || ""), t.serverCustom && (t.custom = JSON.parse(t
          .serverCustom), "string" == typeof t.custom[0] && (t.custom = t.custom[0]), delete t.serverCustom), t
      }
      o.processEventService = function(e) {
        var t = e.content,
          n = e.error,
          r = this.options || {};
        switch (n && (n.callFunc = "events::processEventService", this.onCustomError("事件服务解包失败",
          "EVENT_SERVICE_ERROR", n)), e.cmd) {
          case "pushEvent":
            if (a.isFunction(r.onpushevents)) {
              var s = {
                msgEvents: [u(t.msgEvent)]
              };
              r.onpushevents(s)
            }
            break;
          case "pushEvents":
            if (a.isFunction(r.onpushevents)) {
              var i = t.msgEvents;
              i = {
                msgEvents: i.map(function(e) {
                  return u(e)
                })
              }, r.onpushevents(i)
            }
        }
      }
    },
    function(e, t, n) {
      "use strict";
      n(25).fn.processFilter = function(e) {
        switch (e.cmd) {
          case "sendFilterMsg":
            this.onSendMsg(e, !0);
            break;
          case "filterMsg":
            this.onMsg(e, !0);
            break;
          case "filterSysMsg":
            this.onSysMsg(e, !0);
            break;
          case "sendFilterCustomSysMsg":
            this.onSendSysMsg(e, !0)
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn;
      r.processChatroom = function(e) {
        switch (e.cmd) {
          case "getChatroomAddress":
            this.onChatroomAddress(e)
        }
      }, r.onChatroomAddress = function(e) {
        e.error || (e.obj.address = e.content.address)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn;
      r.syncSessionAck = function(e) {
        var t = this,
          n = t.db,
          r = Promise.resolve();
        [
          [e.content.p2p, "p2p"],
          [e.content.team.m_map, "team"]
        ].forEach(function(e) {
          var s = e[0],
            i = e[1];
          Object.keys(s).forEach(function(e) {
            var o = i + "-" + e,
              a = {
                id: o,
                ack: s[e]
              };
            n.enable && (r = r.then(function() {
              return n.putSession(a)
            }).then(function() {
              t.markUnreadBySessionAck({
                sessionId: o,
                ack: s[e]
              })
            })), t.mergeSession(a)
          })
        }), t.logger.warn("session::syncSessionAck: parse offline session ack", t.sessionSet);
        var s = e.content.timetag;
        n.enable && (r = r.then(function() {
          return t.db.updateSessionAck(s)
        }).catch(function(e) {
          return t.logger.error("sessionAck::syncSessionAck: ", e), Promise.reject(e)
        })), r.cmd = "sessionAck", t.syncPromiseArray.push(r)
      }, r.onMarkSessionAck = function(e) {
        e.error || this.storeSessionAck(e.obj)
      }, r.syncMarkSessionAck = function(e) {
        this.storeSessionAck(e.content)
      }, r.storeSessionAck = function(e) {
        if (this.options.syncSessionUnread) {
          var t = this.db,
            n = (0 === e.scene ? "p2p" : "team") + "-" + e.to,
            r = e.timetag;
          if (r <= ((this.findSession(n) || {}).ack || 0)) this.logger.warn(
            "session::storeSessionAck: ack <= ackInMemory", r);
          else {
            var s = {
              id: n,
              ack: r
            };
            this.mergeSession(s), t.enable && t.updateSession(s), this.logger.info("session::storeSessionAck:",
              s), this.markUnreadBySessionAck({
              sessionId: n,
              ack: s.ack
            })
          }
        }
      }, r.markUnreadBySessionAck = function(e) {
        var t = e.sessionId,
          n = e.ack,
          r = this,
          s = r.db;
        if (s.enable) r.pushMsgTask(function() {
          return s.getMsgCountAfterAck({
            shouldCountNotifyUnread: r.options.shouldCountNotifyUnread,
            sessionId: t,
            ack: n
          }).then(function(e) {
            var n = {
              id: t,
              unread: e
            };
            return r.logger.log("session::markUnreadBySessionAck: db.getMsgCountAfterAck done"), r.syncing &&
              r.cacheSyncedSession(n), r.onUpdateSession(n), s.updateSession(n)
          })
        });
        else {
          var i = r.findSession(t);
          if (i) {
            var o = i.unreadMsgs;
            if (o && o.length) {
              for (var a = 0, c = [], u = o.length - 1; u >= 0; u--) {
                var l = o[u];
                if (!(l.time > n)) break;
                a++, c.push(l)
              }
              i.unreadMsgs = c, i.unread = a, r.logger.info("session::markUnreadBySessionAck: unread " + a), r.onUpdateSession(
                i)
            }
          }
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(0),
        i = n(116),
        o = n(26);
      r.mergeSession = function(e) {
        e = s.copyWithNull(e);
        var t = this.sessionSet,
          n = e.id,
          r = t[n];
        if (r && r.lastMsg && e && e.lastMsg && e.lastMsg.isLocal) {
          var i = r.lastMsg.time || 0;
          if ((e.lastMsg.time || 0) < i) return r
        }
        return t[n] = s.merge(r, e), e = t[n], s.undef(e.unread) && (e.unread = 0), e
      }, r.mergeSessions = function(e) {
        var t = this;
        e.forEach(function(e) {
          t.mergeSession(e)
        })
      }, r.deleteLocalSession = function(e) {
        var t = this;
        s.isArray(e) || (e = [e]), e.forEach(function(e) {
          delete t.sessionSet[e]
        })
      }, r.onDeleteSessions = function(e) {
        e.obj = e.obj.sessions.map(function(e) {
          return i.parse(e)
        })
      }, r.onUpdateSession = function(e) {
        var t = this;
        return new Promise(function(n) {
          e ? (e = t.mergeSession(e), e = s.simpleClone(e), i.trim(e), i.isComplete(e) && (t.logger.info(
              "session::onUpdateSession:", e.id, s.simpleClone(e)), t.options.onupdatesession(e), n(e))) :
            n(e)
        })
      }, r.setCurrSession = function(e) {
        e = "" + e, this.currSessionId = e, this.logger.info("session::setCurrSession:", e)
      }, r.findSession = function(e) {
        return this.sessionSet[e]
      }, r.resetSessionUnread = function(e) {
        e = "" + e;
        var t, n = this,
          r = n.db;
        if (n.findSession(e)) {
          if (r.enable && r.resetSessionUnread(e), !n.options.autoMarkRead && n.sessionUnreadMsgs && n.sessionUnreadMsgs[
              e]) {
            var s = n.sessionUnreadMsgs[e];
            n.markMsgRead(s, !0), n.sessionUnreadMsgs[e] = []
          }
          t = {
            id: e,
            unread: 0
          }, n.onUpdateSession(t)
        } else n.logger.warn("session::resetSessionUnread: no session " + e)
      }, r.insertLocalSession = function(e) {
        var t = this,
          n = t.db,
          r = t.sessionSet;
        return new Promise(function(a, c) {
          var u = e.scene,
            l = e.to,
            m = u + "-" + l,
            d = t.findSession(m);
          if (d) c(o.sessionExist({
            callFunc: "session::insertLocalSession",
            session: d
          }));
          else {
            var p;
            if (s.isNumber(e.updateTime)) p = e.updateTime;
            else {
              var f, g = [];
              for (var h in r) r.hasOwnProperty(h) && (f = r[h], s.isNumber(f.updateTime) && g.push(f.updateTime));
              p = Math.max.apply(Math, g) + 1, p = Math.max(p, +new Date)
            }
            var y = Promise.resolve();
            n.enable && (y = n.getMsgs({
              sessionId: m,
              limit: 1
            })), y.then(function(e) {
              if (s.isArray(e) && 1 === e.length) {
                var r = e[0];
                (d = i.genSessionByMsg(r)).updateTime = p
              } else d = {
                id: m,
                scene: u,
                to: l,
                updateTime: p,
                lastMsg: null
              };
              n.enable ? n.putSession(d).then(a, c) : a(d), t.onUpdateSession(d)
            })
          }
        })
      }, r.updateLocalSession = function(e, t) {
        var n = this;
        return new Promise(function(r, i) {
          var a = n.db;
          if (n.findSession(e.id)) {
            var c = Promise.resolve(),
              u = s.filterObj(e, "id lastMsg localCustom");
            a.enable && (c = a.updateSession(u)), c.then(function(e) {
              return n.onUpdateSession(e, t)
            }).then(r, function(e) {
              i({
                callFunc: "session::updateLocalSession",
                event: e
              })
            })
          } else i(o.sessionNotExist({
            sessionId: e.id,
            callFunc: "session::updateLocalSession"
          }))
        })
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(0),
        i = n(117);
      r.splitSysMsgs = function(e, t) {
        for (var n, r = e.length - 1; r >= 0; r--) n = e[r], i.isCustom(n) && (e.splice(r, 1), t.push(n))
      }, r.onOfflineSysMsgs = function(e, t) {
        var n = this,
          r = e.content.sysMsgs.map(function(e) {
            return e = i.reverse(e), t && (e.filter = !0), e
          });
        r = r.reverse(), n.markSysMsgRead(r);
        var s = [];
        n.splitSysMsgs(r, s);
        var o = t ? "offlineFilterSysMsgs" : "offlineSysMsgs",
          a = t ? "offlineFilterCustomSysMsgs" : "offlineCustomSysMsgs";
        if (r.length) {
          var c = n.putSysMsg(r, "offlineSysMsgs").then(function(e) {
            (r = e).length && (n.logger.info("sysmsg::onOfflineSysMsgs: ", o, r.length, r), n.syncResult[o] =
              n.syncResult[o] || [], n.syncResult[o] = n.syncResult[o].concat(r))
          }).catch(function(e) {
            return n.logger.error("sysMsg::onOfflineSysMsgs: ", e), Promise.reject(e)
          });
          c.cmd = "sysMsgs", n.syncPromiseArray.push(c)
        }
        s.length && (n.logger.info("sysmsg::onOfflineSysMsgs: ", a, s), n.syncResult[a] = n.syncResult[a] || [],
          n.syncResult[a] = n.syncResult[a].concat(s))
      }, r.onSendSysMsg = function(e, t) {
        var n = e.obj;
        this.completeSysMsg(n), e.error ? n.status = "fail" : n.status = "success", n = i.reverse(n), t && (e.obj
          .filter = !0), e.obj = n
      }, r.completeSysMsg = function(e) {
        return e.from = this.account, e
      }, r.onSysMsg = function(e, t) {
        var n = i.reverse(e.content.sysMsg);
        this.markSysMsgRead(n), t && (n.filter = !0), i.isCustom(n) ? (this.logger.info(
            "sysmsg::onSysMsg: on customSysMsg", n), this.options.oncustomsysmsg(n)) : this.syncing ? this.unhandledSysMsgs
          .push(n) : this.handleSysMsg(n)
      }, r.handleSysMsg = function(e) {
        var t = this,
          n = e.type,
          r = e.from;
        t.sysMsgPromise = t.sysMsgPromise.then(function() {
          return t.putSysMsg(e, "onSysMsg")
        }).then(function(t) {
          e = t[0]
        }).then(function() {
          if (e) {
            var s, i = Promise.resolve();
            switch (n) {
              case "addFriend":
                s = {
                  type: "addFriend",
                  account: r
                }, i = t.onFriendRequest(s);
                break;
              case "passFriendApply":
                s = {
                  type: "passFriendApply",
                  account: r
                }, i = t.onFriendRequest(s);
                break;
              case "deleteFriend":
                i = t.onDeleteFriend({
                  account: r
                })
            }
            return s && s.friend && (e.friend = s.friend), i
          }
        }).then(function() {
          e && (t.logger.info("sysmsg::handleSysMsg: ", n, e), setTimeout(function() {
            t.options.onsysmsg(e)
          }, 0))
        })
      }, r.putSysMsg = function(e, t) {
        if (s.isArray(e) || (e = [e]), e[0].filter) return Promise.resolve(e);
        var n = this,
          r = n.db,
          i = r.enable,
          o = Promise.resolve(),
          a = [];
        return (o = (o = o.then(function() {
          return i ? r.putSysMsg(e) : e
        }).then(function(t) {
          var r = [];
          e.forEach(function(e) {
            n.checkSysMsgUnique(e) && r.push(e)
          }), e = r, a = i ? t : e
        })).then(function() {
          return n.getSysMsgUnread().then(function(r) {
            return a.length || ((a = e).backward = !0), n.updateSysMsgUnread(a, r, 1).then(function(e) {
              "offlineSysMsgs" === t && (n.syncResult.sysMsgUnread = e), "onSysMsg" === t && n.onUpdateSysMsgUnread(
                e)
            })
          })
        })).then(function() {
          return e
        })
      }, r.checkSysMsgUnique = s.genCheckUniqueFunc("idServer"), r.getSysMsgUnread = function() {
        var e = this,
          t = e.db;
        return new Promise(function(n) {
          t.enable ? t.getSysMsgUnread().then(function(e) {
            n(e)
          }, function() {
            n(e.sysMsgUnread)
          }) : n(e.sysMsgUnread)
        })
      }, r.updateSysMsgUnread = function(e, t, n) {
        if (s.isArray(e) || (e = [e]), !e.length) return Promise.resolve(t);
        t = t || {};
        var r, o = this.db;
        return e.forEach(function(e) {
            (n > 0 && !e.read || n < 0 && e.read) && (r = e.type, t[r] = (t[r] || 0) + n)
          }), t = i.completeUnread(t), this.sysMsgUnread = t, o.enable && !e.backward ? o.updateSysMsgUnread(t) :
          Promise.resolve(t)
      }, r.reduceSysMsgUnread = function(e) {
        var t = this;
        return t.getSysMsgUnread().then(function(n) {
          return t.updateSysMsgUnread(e, n, -1)
        }).then(function(e) {
          t.onUpdateSysMsgUnread(e)
        })
      }, r.onUpdateSysMsgUnread = function(e) {
        var t = this;
        setTimeout(function() {
          t.logger.info("sysmsg::onUpdateSysMsgUnread:", e), t.options.onupdatesysmsgunread(e)
        }, 0)
      }, r.updateSysMsg = function(e) {
        var t = this,
          n = t.db;
        (n.enable ? n.updateSysMsg(e) : Promise.resolve(e)).then(function(e) {
          t.onUpdateSysMsg(e)
        })
      }, r.onUpdateSysMsg = function(e) {
        var t = this;
        setTimeout(function() {
          s.isArray(e) || (e = [e]), e.forEach(function(e) {
            t.logger.info("sysmsg::onUpdateSysMsg:", e), t.options.onupdatesysmsg(e)
          })
        }, 0)
      }, r.processUnsettledSysMsgs = function() {
        var e = this;
        e.unhandledSysMsgs.forEach(function(t) {
          e.handleSysMsg(t)
        }), e.resetUnsettledSysMsgs()
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(117),
        i = n(116),
        o = n(0);
      r.onDeleteMsg = function(e) {
        var t = this.db;
        delete e.obj.sysMsg, e.error || (e.promise = this.deleteLocalMsg(e.obj.msg).then(function() {
          var n = e.obj.msg;
          t.enable && t.getTimetag("deleteMsg").then(function(e) {
            e = e || 0, n.time >= e && t.updateDeleteMsgTimetag((new Date).getTime())
          })
        }))
      }, r.onMsgDeleted = function(e) {
        if (!e.error) {
          var t = this,
            n = t.db,
            r = s.reverse(e.content.sysMsg);
          r = t.processDeleteMsgSysMsg(r), t.markSysMsgRead(r), t.deleteLocalMsg(r.msg).then(function() {
            n.enable && n.updateDeleteMsgTimetag(r.time + 1), t.handleSysMsg(r)
          })
        }
      }, r.processDeleteMsgSysMsg = function(e) {
        return e.msg = {}, ["scene", "from", "to"].forEach(function(t) {
            e.msg[t] = e[t]
          }), e.msg.idClient = e.deletedIdClient, e.msg.idServer = e.deletedIdServer, e.msg.time = e.deletedMsgTime,
          e.msg.fromNick = e.deletedMsgFromNick, e.opeAccount = e.opeAccount || e.from, e.msg.opeAccount = e.opeAccount,
          this.message.Message.setExtra(e.msg, this.account), e
      }, r.onDeleteMsgOfflineRoaming = function(e) {
        if (!e.error) {
          var t = this,
            n = 1 == +e.content.type ? "offline" : "roaming",
            r = s.reverseSysMsgs(e.content.sysMsgs, {
              mapper: function(e) {
                return t.processDeleteMsgSysMsg(e)
              }
            });
          t.logger.info("msg::onDeleteMsgOfflineRoaming: on delete " + n, r), "offline" === n && t.markSysMsgRead(
            r);
          var i = e.content.timetag;
          t.timetags.deleteMsg = i, t.syncResult.deleteMsgTimetag = i;
          var o = t.putSysMsg(r, "offlineSysMsgs").catch(function(e) {
            return t.logger.error("msgDelete::onDeleteMsgOfflineRoaming: ", e), Promise.reject(e)
          });
          o.cmd = "deleteMsgSysMsgs " + n, t.syncPromiseArray.push(o), t.syncResult.deleteMsgSysMsgs = t.syncResult
            .deleteMsgSysMsgs || [], t.syncResult.deleteMsgSysMsgs.push({
              type: n,
              sysMsgs: r
            })
        }
      }, r.deleteMsgOfflineRoaming = function(e, t) {
        if (!e) return Promise.resolve();
        var n = this;
        n.logger.info("msg::deleteMsgOfflineRoaming: ", e, t);
        var r = n.db,
          s = [];
        return e.forEach(function(e) {
          e.sysMsgs.forEach(function(e) {
            var a = n.deleteLocalMsg(e.msg, {
              cbUpdateSession: function(e) {
                e = n.mergeSession(e), e = o.simpleClone(e), i.trim(e);
                var s = o.findObjIndexInArray(t, {
                  value: e.id
                });
                if (-1 !== s && (t[s] = o.merge({}, t[s], e)), r.enable) return r.updateSession(e)
              }
            });
            s.push(a)
          })
        }), Promise.all(s).then(function() {
          if (r.enable) return r.updateDeleteMsgTimetag(n.syncResult.deleteMsgTimetag)
        })
      }, r.deleteLocalMsg = function(e, t) {
        var n = this.db,
          r = (t = t || {}).cbUpdateSession || this.updateLocalSession.bind(this);
        if (n.enable && e) {
          var s = !1,
            i = null,
            o = e.sessionId;
          return n.getMsgs({
            sessionId: o,
            limit: 1
          }).then(function(t) {
            t && t[0] && t[0].idClient === e.idClient && (s = !0)
          }).then(function() {
            return n.deleteMsg(e.idClient)
          }).then(function() {
            if (s) return n.getMsgs({
              sessionId: o,
              limit: 1
            })
          }).then(function(e) {
            if (s) return e && e[0] && (i = e[0]), r({
              id: o,
              lastMsg: i
            })
          })
        }
        return Promise.resolve()
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(0);
      r.onOfflineMsgReceipts = function(e) {
        var t, n = this,
          r = n.db,
          s = e.content.msgReceipts,
          i = n.syncResult.msgReceipts = [],
          o = [],
          a = "msgReceipts",
          c = n.syncResult.sessions || {};
        s.forEach(function(e) {
          e.time = +e.time;
          var s = e.sessionId = "p2p-" + e.from;
          a += "-" + s, t = Promise.resolve();
          var u = c[s];
          r.enable ? t = r.getSession(s).then(function(t) {
            if ((t = t || u) && n.shouldUpdateSessionFromMsgReceipt(t, e)) {
              var i = n.genSessionFromMsgReceipt(t, e),
                o = n.syncResult.sessions;
              return o && o[s] && (o = o[s]).lastMsg && i.lastMsg && o.lastMsg.time > i.lastMsg.time &&
                (i.lastMsg = o.lastMsg), r.putSession(i).then(function(e) {
                  e && n.cacheSyncedSession(e)
                })
            }
          }).catch(function(e) {
            return n.logger.error("msgReceipt::onOfflineMsgReceipt: ", e), Promise.reject(e)
          }) : u && i.push(e), o.push(t)
        }), (t = Promise.all(o).then(function() {
          if (r.enable) return r.updateMsgReceiptsTimetag(e.content.timetag)
        })).cmd = a, n.syncPromiseArray.push(t)
      }, r.mergeSessionAndMsgReceipts = function(e, t) {
        var n = this,
          r = {};
        return t = t || [], (e = e || []).forEach(function(e) {
          r[e.id] = e
        }), t.forEach(function(t) {
          var s = r[t.sessionId];
          if (n.shouldUpdateSessionFromMsgReceipt(s, t)) {
            var i = n.genSessionFromMsgReceipt(s, t);
            e = n.api.mergeSessions(e, i)
          }
        }), e
      }, r.shouldUpdateSessionFromMsgReceipt = function(e, t) {
        return !e || !e.msgReceiptServerTime || t.time > e.msgReceiptServerTime
      }, r.genSessionFromMsgReceipt = function(e, t) {
        var n = t.time,
          r = {
            id: t.sessionId,
            msgReceiptTime: n,
            msgReceiptServerTime: n
          };
        return e && e.id === t.sessionId && (r = s.merge({}, e, r)), e && e.updateTime || (r.updateTime = n), r
      }, r.onMsgReceipt = function(e) {
        var t = this,
          n = t.db,
          r = e.content.msgReceipt;
        r.time = +r.time;
        var s = r.idClient,
          i = Promise.resolve();
        n.enable && s && (i = n.getMsgByIdClient(s)), i.then(function(e) {
          var n;
          if (e) {
            if (!e.idServer) return void(t.msgReceiptTasks[s] = r);
            n = e.time
          } else n = r.time;
          r.msgReceiptTime = n, t.updateSessionMsgReceiptTime(r)
        })
      }, r.resolveMsgReceiptTask = function(e) {
        var t = this.msgReceiptTasks[e.idClient];
        t && (t.msgReceiptTime = e.time, this.updateSessionMsgReceiptTime(t))
      }, r.updateSessionMsgReceiptTime = function(e) {
        var t = this.db,
          n = {
            id: "p2p-" + e.from,
            msgReceiptTime: e.msgReceiptTime,
            msgReceiptServerTime: e.time
          };
        t.enable && t.putSession(n), this.onUpdateSession(n)
      }, r.onSendMsgReceipt = function(e) {
        if (!e.error) {
          var t = e.obj.msgReceipt,
            n = +t.time,
            r = +e.content.msgReceipt.time;
          this.sessionSet["p2p-" + t.to].msgReceiptSendTime = Math.min(n, r)
        }
      }, r.shouldSendMsgReceipt = function(e) {
        if (e && "p2p" === e.scene && "success" === e.status) {
          var t = this.sessionSet[e.sessionId];
          if (t) {
            var n = t.msgReceiptSendTime;
            return !n || n < e.time
          }
        }
        return !1
      }, r.isMsgRemoteRead = function(e) {
        if (e && "p2p" === e.scene && "out" === e.flow && "success" === e.status) {
          var t = this.sessionSet[e.sessionId];
          if (t && t.msgReceiptTime) return e.time <= t.msgReceiptTime
        }
        return !1
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(0),
        i = s.undef,
        o = n(54),
        a = n(86),
        c = n(116),
        u = n(169);
      r.processMsg = function(e) {
        switch (e.cmd) {
          case "sendMsg":
            this.onSendMsg(e);
            break;
          case "msg":
            this.onMsg(e);
            break;
          case "sysMsg":
            this.onSysMsg(e);
            break;
          case "broadcastMsg":
            this.onBroadcastMsg(e);
            break;
          case "sendCustomSysMsg":
            this.onSendSysMsg(e);
            break;
          case "getHistoryMsgs":
          case "searchHistoryMsgs":
            this.onHistoryMsgs(e);
            break;
          case "syncSendMsg":
            this.onMsg(e);
            break;
          case "deleteSessions":
            this.onDeleteSessions(e);
            break;
          case "sendMsgReceipt":
            this.onSendMsgReceipt(e);
            break;
          case "msgReceipt":
            this.onMsgReceipt(e);
            break;
          case "onDeleteMsg":
            this.onDeleteMsg(e);
            break;
          case "onMsgDeleted":
            this.onMsgDeleted(e);
            break;
          case "onDeleteMsgOfflineRoaming":
            this.onDeleteMsgOfflineRoaming(e);
            break;
          case "onMarkSessionAck":
            this.onMarkSessionAck(e);
            break;
          case "syncMarkSessionAck":
            this.syncMarkSessionAck(e)
        }
      }, r.checkIgnore = function(e) {
        var t = this;
        e.forEach(function(e) {
          "notification" === e.type && !e.ignore && t.options.shouldIgnoreNotification(e) && (e.ignore = !0)
        })
      }, r.filterIgnore = function(e) {
        return e.filter(function(e) {
          return !e.ignore
        })
      }, r.genSessionByMsgs = function(e) {
        return this.checkIgnore(e), c.genSessionByMsgs(this.message.Message, e)
      }, r.onRoamingMsgs = function(e) {
        var t = this,
          n = t.message,
          r = n.Message,
          s = r.getMaxTimetag,
          i = n.reverseMsgs(e.content.msgs),
          o = s(i);
        i = r.sortMsgs(i);
        var a = (i = r.deduplication(i))[0],
          c = a.sessionId,
          u = t.genSessionByMsgs(i);
        t.cacheSyncedSession(u);
        var l = t.putMsg(i, "roamingMsgs").then(function(e) {
          i = e, (i = t.filterIgnore(i)).length && (t.logger.info("msg::onRoamingMsgs: putRoamingMsgs", c,
              i.length, i), t.syncResult.roamingMsgs = t.syncResult.roamingMsgs || [], t.syncResult.roamingMsgs
            .push({
              sessionId: c,
              scene: a.scene,
              to: a.target,
              msgs: i,
              timetag: o
            }))
        }).catch(function(e) {
          return t.logger.error("msg::onRoamingMsgs: ", e), Promise.reject(e)
        });
        l.cmd = "roamingMsgs-" + c, t.syncPromiseArray.push(l)
      }, r.onOfflineMsgs = function(e, t) {
        var n = this,
          r = n.message,
          s = r.Message,
          i = null;
        t && (i = {
          filter: !0
        });
        var o, a, c = r.reverseMsgs(e.content.msgs, {
            modifyObj: i
          }),
          u = [],
          l = "",
          m = t ? "offlineFilterMsgs" : "offlineMsgs";

        function d(e) {
          if (u.length) {
            var t = s.getMaxTimetag(u),
              r = u[0].scene,
              i = u[0].target;
            n.markMsgRead(u), u = s.sortMsgs(u), u = s.deduplication(u);
            var o = n.genSessionByMsgs(u);
            n.cacheSyncedSession(o), (a = n.putMsg(u, "offlineMsgs").then(function(s) {
              u = s, (u = n.filterIgnore(u)).length && (n.logger.info(
                "msg::onOfflineMsgs： toreLastSession", m, e, u.length, u), n.syncResult[m] = n.syncResult[
                m] || [], n.syncResult[m].push({
                sessionId: e,
                scene: r,
                to: i,
                msgs: u,
                timetag: t
              }))
            }).catch(function(e) {
              return n.logger.error("msg::onOfflineMsgs: ", e), Promise.reject(e)
            })).cmd = "offlineMsgs-" + e, n.syncPromiseArray.push(a)
          }
        }
        c.forEach(function(e) {
          (o = e.sessionId) !== l ? (d(l), (u = []).push(e), l = o) : u.push(e)
        }), d(l)
      }, r.markUnreadByMsgsPromise = function(e) {
        var t = this,
          n = t.db;
        n.enable && n.getSession(e).then(function(n) {
          n.ack && t.markUnreadBySessionAck({
            sessionId: e,
            ack: n.ack
          })
        })
      }, r.completeMsg = function(e) {
        return e.from = this.account, e.fromNick = this.myInfo && this.myInfo.nick, e.fromClientType = "Web", e
          .fromDeviceId = o.deviceId, e.time || (e.time = +new Date), e
      }, r.onMsgs = function(e) {
        var t = this;
        t.message.reverseMsgs(e.content.msgs, {
          mapper: function(e) {
            t.handleMsg(e)
          }
        })
      }, r.onMsg = function(e, t) {
        var n = this.message.reverse(e.content.msg);
        t && (n.filter = !0), this.syncing ? (this.logger.log("msg::onMsg:is in syncing ..."), this.unhandledMsgs
          .push({
            type: "onMsg",
            msg: n
          })) : this.handleMsg(n)
      }, r.onBroadcastMsgs = function(e) {
        var t = e.content.broadcastMsgs;
        t = t.sort(function(e, t) {
          return e.broadcastId - t.broadcastId
        }), this.putBroadcastMsgs(t)
      }, r.onBroadcastMsg = function(e) {
        var t = e.content.broadcastMsg;
        t.time = t.timestamp, this.syncing ? this.unhandledMsgs.push({
          type: "onBroadcastMsg",
          msg: t
        }) : t && this.putBroadcastMsg(t)
      }, r.pushMsgTask = function(e) {
        this.msgPromise = this.msgPromise.then(function() {
          return e()
        })
      }, r.handleMsg = function(e) {
        var t = this,
          n = e.time;
        t.markMsgRead(e), t.msgPromise = t.msgPromise.then(function() {
          return t.putMsg(e, "onMsg")
        }).then(function(r) {
          return t.logger.log("msg::handleMsg:putMsg: ", e), e = r[0], t.updateRoamingMsgTimetag(n)
        }).then(function() {
          if (t.logger.log("msg::handleMsg:updateRoamingMsgTimetag: ", n, e), e) return t.checkUserUpdate(e)
        }).then(function() {
          if (e) {
            var n = e.type;
            switch (t.logger.log("msg::handleMsg:checkUserUpdate: " + e.scene + " " + n + " msg" + (
              "notification" === n ? " " + e.attach.type : ""), e), n) {
              case "notification":
                return t.onTeamNotificationMsg(e)
            }
          }
        }).then(function() {
          e && !e.ignore && (t.logger.info("msg::handleMsg:onmsg: ", e), setTimeout(function() {
            t.options.onmsg(s.copy(e))
          }, 0))
        }).then(void 0, function(e) {
          e.callFunc = "msg::handleMsg", t.onCustomError("消息处理错误", e)
        })
      }, r.putMsg = function(e, t) {
        if (s.isArray(e) || (e = [e]), e[0].filter) return Promise.resolve(e);
        var n = this,
          r = n.db,
          o = r.enable,
          a = Promise.resolve(),
          c = n.message.Message.getLastMsg(e),
          u = c.flow,
          l = c.sessionId !== n.currSessionId,
          m = n.genSessionByMsgs(e);
        f(m);
        var d = !1,
          p = [];

        function f(e) {
          "roamingMsgs" !== t && "offlineMsgs" !== t || n.cacheSyncedSession(e)
        }
        return n.checkIgnore(e), n.logger.log("start"), a = (a = (a = a.then(function() {
          return o || n.options.autoMarkRead || "roamingMsgs" === t || !m || (n.sessionUnreadMsgs = n.sessionUnreadMsgs ||
            {}, n.sessionUnreadMsgs[m.id] = n.sessionUnreadMsgs[m.id] || [], n.sessionUnreadMsgs[m.id] =
            n.sessionUnreadMsgs[m.id].concat(e.filter(function(e) {
              return n.options.shouldCountNotifyUnread(e)
            }))), o && "roamingMsgs" !== t && "offlineMsgs" !== t ? (n.logger.log(
            "msg::putMsg:db.putMsg: ", m), r.putMsg(e)) : e
        }).then(function(t) {
          var r = [];
          return e.forEach(function(e) {
            n.checkMsgUnique(e) && r.push(e)
          }), e = r, p = o ? t : e, Promise.resolve(e)
        })).then(function(e) {
          return e.length && (f(m = n.genSessionByMsgs(e)), o && m) ? new Promise(function(t, s) {
            r.getSessions({
              sessionId: m.id
            }).then(function(s) {
              if (s && s.lastMsg) {
                var i = s.lastMsg;
                m.lastMsg && m.lastMsg.time < i.time && (m.lastMsg = i)
              }
              n.logger.log("msg::putMsg:db.getSessions: ", m), p.length ? m ? r.putSession(m).then(
                function(e) {
                  t(e)
                }) : t(s) : (d = !0, p = e, t(s))
            })
          }) : Promise.resolve(m)
        })).then(function(e) {
          if (m && p.length) {
            var s = "roamingMsgs" === t,
              a = n.options.syncSessionUnread,
              c = m.id,
              g = n.findSession(c) || {},
              h = g.ack || 0;
            if ("offlineMsgs" === t || s && a || "onMsg" === t && "in" === u && l) {
              o && e ? (m = e, h = h || m.ack || 0) : (e = g) && (m.unread = e.unread || 0), f(m), m.unread =
                m.unread || 0;
              var y = 0;
              if (p.forEach(function(e) {
                  var t = n.options.shouldCountNotifyUnread(e),
                    r = ("notification" !== e.type || "notification" === e.type && t) && (i(e.isUnreadable) ||
                      e.isUnreadable);
                  if (r && a && (r = e.time > h && "out" !== e.flow), r && (y++, a && !o)) {
                    var s = g.unreadMsgs || [];
                    s.push(e), m.unreadMsgs = s
                  }
                }), console.log(m), m.unread += y, n.logger.log("msg::putMsg:updateSession: ", m), f(m), o &&
                !d) return r.updateSession({
                id: m.id,
                unread: m.unread
              })
            }
          }
        }), "onMsg" === t ? a = a.then(function() {
          e.length && m && (n.onUpdateSession(m), n.options.syncSessionUnread && !l && n.api.resetSessionUnread(
            n.currSessionId))
        }) : "sendMsg" === t && !l && m && m.lastMsg && m.lastMsg.isLocal && (n.onUpdateSession(m), n.api.resetSessionUnread(
          n.currSessionId)), a.then(function() {
          return Promise.resolve(e)
        })
      }, r.putBroadcastMsgs = function(e) {
        var t = this,
          n = t.db,
          r = e.length;
        if (r > 0) {
          if (t.doMarkBroadcastMsgsRead(e), n.enable) {
            var i = e[r - 1].broadcastId;
            return n.updateBroadcastMsgTimetag(i), n.putBroadcastMsg(e).then(function() {
              return setTimeout(function() {
                t.doMarkMsgsRead(), t.options.onbroadcastmsgs(s.copy(e))
              }, 0), Promise.resolve(e)
            })
          }
          setTimeout(function() {
            t.options.onbroadcastmsgs(s.copy(e))
          }, 0)
        }
        return e
      }, r.putBroadcastMsg = function(e) {
        var t = this,
          n = t.db;
        return t.doMarkBroadcastMsgsRead([e]), n.enable ? (e.broadcastId && n.updateBroadcastMsgTimetag(e.broadcastId),
          n.putBroadcastMsg(e).then(function() {
            return setTimeout(function() {
              t.options.onbroadcastmsg(s.copy(e))
            }, 0), Promise.resolve(e)
          })) : (setTimeout(function() {
          t.options.onbroadcastmsg(s.copy(e))
        }, 0), e)
      }, r.doMarkBroadcastMsgsRead = function(e) {
        e = e.map(function(e) {
          return e.broadcastId
        }), this.sendCmd("batchMarkRead", {
          sid: 7,
          cid: 17,
          ids: e
        })
      }, r.cacheSyncedSession = function(e) {
        if (e && this.syncResult) {
          e = s.merge({}, e), this.syncResult.sessions = this.syncResult.sessions || {};
          var t = e.id;
          this.syncResult.sessions[t] = s.merge(this.syncResult.sessions[t], e), i(this.syncResult.sessions[t].unread) &&
            (this.syncResult.sessions[t].unread = 0), this.mergeSession(this.syncResult.sessions[t])
        }
      }, r.checkMsgUnique = s.genCheckUniqueFunc("idClient"), r.storeSendMsg = function(e) {
        if (!this.syncing) {
          var t = this.putMsg(e, "sendMsg");
          return this.msgPromise = this.msgPromise.then(function() {
            return t
          }), t
        }
        this.unhandledMsgs.push({
          type: "sendMsg",
          msg: e
        })
      }, r.updateSendMsgError = function(e) {
        if (!this.syncing) {
          var t = this.updateMsg(e);
          return this.msgPromise = this.msgPromise.then(function() {
            return t
          }), t
        }
        this.unupdatedMsgs.push(e)
      }, r.onSendMsg = function(e, t) {
        var n = this,
          r = e.obj && e.obj.msg || e.content.msg;
        if (e.obj) i();
        else {
          var s = n.db;
          s && s.enable && s.getMsgByIdClient(r.idClient).then(function(e) {
            e && (r = e, i())
          }, function(e) {
            i()
          })
        }

        function i() {
          n.completeMsg(r);
          var s = e.error && 7101 === e.error.code;
          e.error && !s || (r.idServer = e.content.msg.idServer, r.time = +e.content.msg.time), e.error ? r.status =
            "fail" : r.status = "success", r = n.message.reverse(r), t && (r.filter = !0), e.obj = r, n.syncing ?
            n.unupdatedMsgs.push(r) : n.msgPromise = Promise.all([n.msgPromise, e.obj.promise]).then(function(e) {
              return e.length || (r.resend = !0), n.updateMsg(r).then(function() {
                return n.options.syncSessionUnread && n.currSessionId === r.sessionId && n.api.resetSessionUnread(
                  n.currSessionId), n.resolveMsgReceiptTask(r), r
              })
            })
        }
      }, r.updateLocalMsg = function(e) {
        var t = this.updateMsg(e);
        return this.msgPromise = this.msgPromise.then(function() {
          return t
        }), t
      }, r.updateMsg = function(e) {
        if (e.filter) return Promise.resolve(e);
        var t = this,
          n = t.db,
          r = "success" === e.status,
          s = c.genSessionByMsg(e),
          i = !!e.isLocal;
        return n.enable ? n.updateMsg(e).then(function(e) {
          var o = n.updateSession(s),
            a = Promise.resolve();
          return r && e && !i && (a = n.updateRoamingMsgTimetag(e.time)), t.onUpdateSession(s), Promise.all(
            [o, a])
        }) : (r && !i && (t.timetags.roamingMsgs = e.time), t.onUpdateSession(s), Promise.resolve(e))
      }, r.updateRoamingMsgTimetag = function(e) {
        var t = this.db;
        return t.enable ? t.updateRoamingMsgTimetag(e) : (this.timetags.roamingMsgs = e, Promise.resolve(e))
      }, r.checkUserUpdate = function(e) {
        var t = this,
          n = e.from;
        return n === t.account ? Promise.resolve() : new Promise(function(r) {
          var i = t.userSet[n];
          if (i) {
            var o = +i.updateTime,
              a = +e.userUpdateTime;
            !isNaN(o) && !isNaN(a) && s.isNumber(o) && s.isNumber(a) && o < a ? c() : r()
          } else c();

          function c() {
            t.api.getUser({
              account: n,
              sync: !0,
              done: function(e, n) {
                e || setTimeout(function() {
                  t.logger.log("user::checkUserUpdate: onupdateuser", n.account, n), t.options.onupdateuser(
                    n)
                }, 0), r()
              }
            })
          }
        })
      }, r.processUnsettledMsgs = function() {
        var e = this;
        e.unhandledMsgs.forEach(function(t) {
          var n = t.msg;
          switch (t.type) {
            case "onMsg":
              e.handleMsg(n);
              break;
            case "sendMsg":
              e.msgPromise = e.msgPromise.then(function() {
                return e.putMsg(n)
              });
              break;
            case "onBroadcastMsg":
              e.msgPromise = e.msgPromise.then(function() {
                return e.putBroadcastMsg(n)
              })
          }
        }), e.unupdatedMsgs.forEach(function(t) {
          e.msgPromise = e.msgPromise.then(function() {
            return e.updateMsg(t)
          })
        }), e.resetUnsettledMsgs()
      }, r.onTeamNotificationMsg = function(e) {
        this.db;
        var t = e.attach,
          n = t.type,
          r = e.from,
          s = e.to,
          i = e.time,
          o = t.team,
          a = t.account,
          c = t.accounts;
        switch (n) {
          case "updateTeam":
            return o.updateTime = i, this.onUpdateTeam(o);
          case "addTeamMembers":
            return this.onAddTeamMembers(e, o, c);
          case "removeTeamMembers":
            return this.onRemoveTeamMembers(o, s, c);
          case "acceptTeamInvite":
            return this.onAddTeamMembers(e, o, [r]);
          case "passTeamApply":
            return this.onAddTeamMembers(e, o, [a]);
          case "addTeamManagers":
            return this.updateTeamManagers(e, s, c, !0, i);
          case "removeTeamManagers":
            return this.updateTeamManagers(e, s, c, !1, i);
          case "leaveTeam":
            return this.onRemoveTeamMembers(o, s, [r]);
          case "dismissTeam":
            return this.onDismissTeam(s, i);
          case "transferTeam":
            return this.transferTeam(e, o, r, a);
          case "updateTeamMute":
            return this.onUpdateTeamMembersMute(e, o, [a], t.mute)
        }
      }, r.onAddTeamMembers = function(e, t, n) {
        var r = this,
          i = r.db,
          o = t.teamId,
          c = a.assembleMembers(t, n);
        e.attach.members = c;
        var u = {
          team: t,
          accounts: n,
          members: c
        };
        if (r.logger.info("team::onAddTeamMembers: ", u), r.options.onAddTeamMembers(s.simpleClone(u)), i.enable) {
          var l, m = i.putTeam(t);
          return -1 === n.indexOf(r.account) ? l = i.putTeamMembers(c) : (r.logger.warn(
            "team::onAddTeamMembers: user join team", o), m = new Promise(function(e) {
            r.api.getTeamMembers({
              teamId: o,
              sync: !0,
              done: function() {
                e()
              }
            })
          })), Promise.all([l, m])
        }
      }, r.onRemoveTeamMembers = function(e, t, n) {
        var r = this.db,
          i = {
            team: e,
            accounts: n
          };
        if (this.logger.info("team::onRemoveTeamMembers:", i), this.options.onRemoveTeamMembers(s.simpleClone(i)),
          r.enable) {
          if (-1 === n.indexOf(this.account)) {
            var o = r.removeTeamMembersByAccounts(t, n),
              a = Promise.resolve();
            return e && (a = r.putTeam(e)), Promise.all([o, a])
          }
          return r.leaveTeam(t)
        }
      }, r.updateTeamManagers = function(e, t, n, r, i) {
        var o = this.db,
          c = e.attach.members = n.map(function(e) {
            return {
              id: a.genId(t, e),
              type: r ? "manager" : "normal",
              updateTime: i
            }
          }),
          u = {
            teamId: "" + t,
            memberUpdateTime: i
          };
        e.attach.team = u;
        var l = {
          team: u,
          accounts: n,
          isManager: r,
          members: c
        };
        if (this.logger.info("team::updateTeamManagers:", l), this.options.onUpdateTeamManagers(s.simpleClone(l)),
          o.enable) {
          var m = o.updateTeam(u),
            d = o.updateTeamManagers(t, n, r, i);
          return Promise.all([m, d])
        }
      }, r.onDismissTeam = function(e, t) {
        var n = this.db,
          r = {
            teamId: e
          };
        if (this.logger.info("team::onDismissTeam:", r), this.options.onDismissTeam(r), n.enable) return n.dismissTeam(
          e, t)
      }, r.transferTeam = function(e, t, n, r) {
        var i = this.db,
          o = t.teamId,
          c = t.memberUpdateTime,
          u = {
            id: a.genId(o, n),
            type: "normal",
            updateTime: c
          },
          l = {
            id: a.genId(o, r),
            type: "owner",
            updateTime: c
          };
        e.attach.members = [u, l];
        var m = {
          team: t,
          from: u,
          to: l
        };
        if (this.logger.info("team::transferTeam:", m), this.options.onTransferTeam(s.simpleClone(m)), i.enable)
          return i.transferTeam(t, n, r)
      }, r.onUpdateTeamMembersMute = function(e, t, n, r) {
        var i = this.db,
          o = n.map(function(e) {
            return {
              id: a.genId(t.teamId, e),
              account: e,
              teamId: t.teamId,
              mute: r,
              updateTime: t.memberUpdateTime
            }
          });
        e.attach.members = o;
        var c = {
          team: t,
          accounts: n,
          members: o,
          mute: r
        };
        if (this.logger.info("team::onUpdateTeamMembersMute:", c), this.options.onUpdateTeamMembersMute(s.simpleClone(
            c)), i.enable) {
          var u = i.updateTeamMembers(o),
            l = i.putTeam(t);
          return Promise.all([u, l])
        }
      }, r.onHistoryMsgs = function(e) {
        e.error || (e.obj.msgs = this.message.reverseMsgs(e.content.msgs))
      }, r.isFilterMsgs = function(e) {
        return !!e[0].filter
      }, r.splitMsgs = function(e, t, n, r) {
        e.forEach(function(e) {
          if (e.filter) r.push(e);
          else switch (e.scene) {
            case "p2p":
              t.push(e);
              break;
            case "team":
              n.push(e)
          }
        })
      }, r.markMsgRead = function(e, t) {
        s.isArray(e) || (e = [e]);
        if (this.db.enable || this.options.autoMarkRead || t) {
          var n = [],
            r = [],
            i = [];
          this.splitMsgs(e, n, r, i), this.markP2pMsgsRead(n), this.markTeamMsgsRead(r), this.markFilterMsgsRead(
            i)
        }
      }, r.markP2pMsgsRead = function(e) {
        if (e.length) {
          var t = u.idMap.msg.id,
            n = u.idMap.msg.msg;
          this.doMarkMsgsRead(t, n, e)
        }
      }, r.markTeamMsgsRead = function(e) {
        if (e.length) {
          var t = u.idMap.team.id,
            n = u.idMap.team.teamMsg;
          this.doMarkMsgsRead(t, n, e)
        }
      }, r.markFilterMsgsRead = function(e) {
        if (e.length) {
          var t = u.idMap.filter.id,
            n = u.idMap.filter.filterMsg;
          this.doMarkMsgsRead(t, n, e)
        }
      }, r.markSysMsgRead = function(e, t) {
        s.isArray(e) || (e = [e]);
        var n, r;
        (this.db.enable || this.options.autoMarkRead || t) && (this.isFilterMsgs(e) ? (n = u.idMap.filter.id, r =
          u.idMap.filter.filterSysMsg) : (n = u.idMap.msg.id, r = u.idMap.msg.sysMsg), this.doMarkMsgsRead(n,
          r, e))
      }, r.doMarkMsgsRead = function(e, t, n) {
        n && n.length && (!n[0].attach || "netcallBill" !== n[0].attach.type && "netcallMiss" !== n[0].attach.type ||
          (e = 9, t = 11), this.sendCmd("batchMarkRead", {
            sid: e,
            cid: t,
            ids: n.map(function(e) {
              return e.idServer
            })
          }))
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(0),
        i = n(170);
      r.processNotify = function(e) {
        switch (e.cmd) {
          case "syncOfflineMsgs":
            this.onOfflineMsgs(e);
            break;
          case "batchMarkRead":
            break;
          case "syncOfflineSysMsgs":
            this.onOfflineSysMsgs(e);
            break;
          case "syncRoamingMsgs":
            this.onRoamingMsgs(e);
            break;
          case "syncOfflineFilterMsgs":
            this.onOfflineMsgs(e, !0);
            break;
          case "syncOfflineFilterSysMsgs":
            this.onOfflineSysMsgs(e, !0);
            break;
          case "syncMsgReceipts":
            this.onOfflineMsgReceipts(e);
            break;
          case "syncDonnop":
            this.onDonnop(e, !0);
            break;
          case "syncSessionAck":
            this.syncSessionAck(e);
            break;
          case "syncRobots":
            this.onRobots(e);
            break;
          case "syncBroadcastMsgs":
            this.onBroadcastMsgs(e)
        }
      }, r.onDonnop = function(e, t) {
        if (!e.error) {
          var n = this,
            r = n.db,
            s = i.reverse(e.content.donnop);
          n.mergeDonnop(s);
          var o = n.dbDonnop();
          if (t) {
            var a = e.content.timetag;
            n.timetags.donnop = a, r.enable && (o = o.then(function() {
              return n.db.updateDonnopTimetag(a)
            }).catch(function(e) {
              return n.logger.error("notify::onDonnop: ", e), Promise.reject(e)
            })), o.cmd = "donnop", n.syncPromiseArray.push(o)
          } else n.onPushNotificationMultiportConfigUpdate()
        }
      }, r.onUpdateDonnop = function(e) {
        if (!e.error) {
          var t = e.obj;
          t && (this.mergeDonnop(s.filterObj(t, ["shouldPushNotificationWhenPCOnline"])), this.dbDonnop(), this
            .onPushNotificationMultiportConfigUpdate())
        }
      }, r.getPushNotificationMultiportConfig = function() {
        return s.merge({}, this.pushNotificationMultiportConfig)
      }, r.mergeDonnop = function(e) {
        this.pushNotificationMultiportConfig = s.merge({}, this.pushNotificationMultiportConfig, e)
      }, r.dbDonnop = function() {
        return this.db.enable ? this.db.setDonnop(this.pushNotificationMultiportConfig) : Promise.resolve()
      }, r.onPushNotificationMultiportConfigUpdate = function() {
        var e = this;
        setTimeout(function() {
          var t = e.getPushNotificationMultiportConfig();
          e.logger.info("link::onPushNotificationMultiportConfigUpdate:", t), e.options.onPushNotificationMultiportConfigUpdate(
            t)
        })
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(0),
        i = s.objs2accounts,
        o = s.teams2ids,
        a = n(119),
        c = n(86);
      r.processTeam = function(e) {
        var t = e.error,
          n = void 0,
          r = void 0,
          s = void 0;
        switch (e.cmd) {
          case "createTeam":
            if (n = e.obj.team, t || (n = e.content.team), n = a.reverse(n), e.obj.team = n, s = c.assembleOwner(
                n), e.obj.owner = s, !t) {
              var i = {
                team: n,
                owner: s
              };
              this.logger.info("team::processTeam: create team", i), this.onCreateTeam(n, s)
            }
            break;
          case "syncCreateTeam":
            n = a.reverse(e.content.team), s = c.assembleOwner(n), this.logger.info(
              "team::processTeam: sync createTeam", n, s), this.options.onsynccreateteam(n, s), this.onCreateTeam(
              n, s);
            break;
          case "sendTeamMsg":
            this.onSendMsg(e);
            break;
          case "teamMsg":
            this.onMsg(e);
            break;
          case "teamMsgs":
            this.onMsgs(e);
            break;
          case "addTeamMembers":
          case "removeTeamMembers":
          case "leaveTeam":
          case "dismissTeam":
          case "addTeamManagers":
          case "removeTeamManagers":
          case "transferTeam":
            break;
          case "updateInfoInTeam":
            t || ((r = e.obj).account = this.account, r.id = c.genId(r.teamId, r.account), r = c.reverse(r), e.obj =
              r, this.mergeMyTeamMembers(r), this.onUpdateTeamMember(r));
            break;
          case "updateNickInTeam":
            e.obj = c.reverse(e.obj);
            break;
          case "updateTeam":
            e.obj = a.reverse(e.obj, !0);
            break;
          case "applyTeam":
            e.error || (e.obj = a.reverse(e.content.team));
            break;
          case "passTeamApply":
            this.updateTeamSysMsgState(e, "passed");
            break;
          case "rejectTeamApply":
            this.updateTeamSysMsgState(e, "rejected");
            break;
          case "acceptTeamInvite":
            this.updateTeamSysMsgState(e, "passed"), e.error || (e.obj = a.reverse(e.content.team));
            break;
          case "rejectTeamInvite":
            this.updateTeamSysMsgState(e, "rejected");
            break;
          case "getTeam":
            e.error || (e.obj = a.reverse(e.content.team));
            break;
          case "getTeams":
            this.onTeams(e);
            break;
          case "getTeamMembers":
            this.onTeamMembers(e);
            break;
          case "syncTeams":
            this.onTeams(e);
            break;
          case "syncTeamMembers":
            this.onTeamMembers(e);
            break;
          case "getTeamHistoryMsgs":
          case "searchTeamHistoryMsgs":
            this.onHistoryMsgs(e);
            break;
          case "syncSendTeamMsg":
            this.onMsg(e);
            break;
          case "notifyTeamMsgReads":
            this.onTeamMsgReceipt(e);
            break;
          case "syncUpdateTeamMember":
            r = c.reverse(e.content.teamMember), this.onUpdateTeamMember(r), r.account === this.account && this
              .mergeMyTeamMembers(r);
            break;
          case "updateMuteStateInTeam":
            break;
          case "getMyTeamMembers":
            e.error || (e.obj = c.reverseMembers(e.content.teamMembers));
            break;
          case "getMutedTeamMembers":
            e.error || (e.obj = {
              teamId: e.obj.teamId,
              members: c.reverseMembers(e.content.teamMembers)
            });
            break;
          case "syncMyTeamMembers":
            this.onSyncMyTeamMembers(e)
        }
      }, r.onCreateTeam = function(e, t) {
        var n = this.db;
        n.enable && (n.putTeam(e), n.putTeamMembers(t)), this.options.onCreateTeam(e, t)
      }, r.onTeams = function(e) {
        e.content = e.content || {};
        var t, n = this,
          r = n.db,
          s = n.packetFromSync(e),
          i = e.content.teams || [],
          c = !0,
          u = [],
          l = [];
        if (e.error) switch (e.error.code) {
          case 803:
            e.error = null, c = !1
        }
        var m = new Promise(function(m, p) {
          var f, g;
          e.error ? s && p(e.error) : (! function() {
            c && i.forEach(function(e) {
              (e = a.reverse(e)).validToCurrentUser ? u.push(e) : l.push(e)
            });
            n.logger.info("team::onTeams: parseData", o(u), u, "invalid", o(l), l), i.length ? (c = !0,
              t = e.content.timetag) : c = !1
          }(), r.enable ? (f = m, g = p, e.promise = new Promise(function(e, i) {
            function o() {
              s ? (d(), e(), f()) : r.getTeams().then(function(t) {
                u = t, d(), e(), f()
              }).then(void 0, function(e) {
                e.message = "db.getTeams error", e.callFunc = "team::afterMergeData", i(e), g(e)
              })
            }
            c ? r.mergeTeams(u, l, t).then(function() {
              o()
            }).then(void 0, function(e) {
              var t = {
                callFunc: "team::onTeams:mergeData",
                message: "db.mergeTeams error",
                event: e
              };
              i(t), g(t)
            }) : (n.logger.warn("team::onTeams:mergeData: no teams need merge"), o())
          }).then(void 0, function(e) {
            throw e.message = "merge teams data error", e.callFunc = "team::mergeData", g(e), e
          })) : (d(), m()))
        }).catch(function(e) {
          return n.logger.error("team::onTeams: ", e), Promise.reject(e)
        });

        function d() {
          n.timetags.teams = t, u.invalid = l, s ? (n.syncResult.teams = u, n.syncResult.invalidTeams = l) : (n
            .logger.info("team::onTeams: not in syncing, get teams", o(u), u), e.obj = u)
        }
        s && (m.cmd = "teams", n.syncPromiseArray.push(m))
      }, r.onTeamMembers = function(e) {
        e.content = e.content || {};
        var t, n, r = this,
          s = (r.db, r.packetFromSync(e)),
          o = e.content.members || [],
          a = !0,
          u = [],
          l = [];
        if (e.obj && (n = e.obj.teamId), n || (n = e.content.teamId), n = "" + n, e.error) switch (e.error.code) {
          case 406:
            e.error = null, a = !1
        }
        var m = new Promise(function(m, d) {
          e.error ? s && (r.logger.error("team::onTeamMember: team error:", n, e.error), d({
            callFunc: "team::onTeamMembers",
            event: e.error,
            message: "teamId-" + n + " 获取群成员错误"
          })) : (! function() {
            a && o.forEach(function(e) {
              (e = c.reverse(e)).valid ? u.push(e) : l.push(e)
            });
            r.logger.warn("team::onTeamMembers: parseData", n, i(u), u, "invalid", i(l), l), o.length ?
              (a = !0, t = e.content.timetag) : a = !1
          }(), u.invalid = l, s ? (r.syncTeamMembersResult[n] = u, r.syncTeamMembersResult[n +
            "-invalid"] = l, r.timetags["team-" + n] = t) : (r.logger.info(
            "team::onTeamMembers: not syncing, get members", n, i(u), u), e.obj = {
            teamId: n,
            members: u
          }), m())
        });
        s && (m.cmd = n, r.syncTeamMembersPromiseArray.push(m))
      }, r.onUpdateTeamMember = function(e) {
        e.updateTime || (e.updateTime = +new Date), this.logger.info("team::onUpdateTeamMember: ", e), this.options
          .onupdateteammember(s.simpleClone(e));
        var t = {
          teamId: e.teamId,
          memberUpdateTime: e.updateTime
        };
        this.onUpdateTeam(t);
        var n = this.db;
        n.enable && n.updateTeamMember(e)
      }, r.onUpdateTeam = function(e) {
        this.logger.info("team::onUpdateTeam:", e), this.options.onUpdateTeam(s.simpleClone(e));
        var t = this.db;
        t.enable && t.updateTeam(e)
      }, r.onSyncMyTeamMembers = function(e) {
        var t = this,
          n = t.db,
          r = c.reverseMembers(e.content.teamMembers);
        if (t.logger.info("team::onSyncMyTeamMembers:", r), n.enable) {
          var s = n.putTeamMembers(r).then(function() {
            return n.updateMyTeamMembersTimetag(e.content.timetag)
          }).catch(function(e) {
            return t.logger.error("team::syncMyTeamMember: ", e), Promise.reject(e)
          });
          s.cmd = "myTeamMembers", t.syncTeamMembersPromiseArray.push(s)
        }
        t.mergeMyTeamMembers(r)
      }, r.mergeMyTeamMembers = function(e) {
        s.isArray(e) || (e = [e]);
        var t = this.myTeamMembersMap = this.myTeamMembersMap || {};
        e.forEach(function(e) {
          var n = e.teamId;
          t[n] = s.merge(t[n], e)
        }), this.logger.info("team::mergeMyTeamMembers:", t)
      }, r.notifyForNewTeamMsg = function(e) {
        s.isArray(e) || (e = [e]);
        var t = this,
          n = this.myTeamMembersMap || {},
          r = {},
          i = [];
        e.forEach(function(e) {
          s.exist(n[e]) ? r[e] = n[e].muteNotiType : i.push(e)
        });
        var o = Promise.resolve(r);
        return i.length && (o = t.api.getMyTeamMembers({
          teamIds: i,
          promise: !0
        }).then(function(e) {
          return t.mergeMyTeamMembers(e), e.forEach(function(e) {
            r[e.teamId] = e.muteNotiType
          }), r
        })), o
      }, r.updateTeamSysMsgState = function(e, t) {
        var n, r = e.error;
        r && (t = "error", r = s.filterObj(r, "code message")), n = {
          idServer: e.obj.idServer,
          state: t
        }, r && (n.error = r), this.updateSysMsg(n)
      }, r.onTeamMsgReceipt = function(e) {
        var t = e.content,
          n = e.error;
        n && this.logger.error("team::onTeamMsgReceipt:", n), t && t.teamMsgReceipts && this.options.onTeamMsgReceipt(
          t)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(0);
      r.onRobots = function(e) {
        var t = e.content;
        if (s.isFunction(this.options.onrobots) && Array.isArray(t.robots)) {
          var n = t.robots.filter(function(e) {
            return !!e.botid
          });
          n.length > 0 && this.options.onrobots(n || [])
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(0),
        i = s.objs2accounts,
        o = n(283),
        a = n(129);
      r.processFriend = function(e) {
        var t = e.obj,
          n = e.content,
          r = e.error;
        switch (e.cmd) {
          case "friendRequest":
            this.updateFriendSysMsg(e), r || this.onFriendRequest(t);
            break;
          case "syncFriendRequest":
            this.onFriendRequest(n, !0);
            break;
          case "deleteFriend":
            r || this.onDeleteFriend(t);
            break;
          case "syncDeleteFriend":
            this.onDeleteFriend(n, !0);
            break;
          case "updateFriend":
            r || this.onUpdateFriend(t);
            break;
          case "syncUpdateFriend":
            this.onUpdateFriend(n.friend, !0);
            break;
          case "getFriends":
          case "syncFriends":
            this.onFriends(e);
            break;
          case "syncFriendUsers":
            this.onFriendUsers(e)
        }
      }, r.onFriends = function(e) {
        var t, n = this,
          r = n.db,
          s = e.error,
          a = n.packetFromSync(e),
          c = e.content.friends,
          u = !0,
          l = [],
          m = [],
          d = new Promise(function(d, f) {
            var g, h;
            s ? a && f(s) : (! function() {
              u && c.forEach(function(e) {
                (e = o.reverse(e)).valid ? l.push(e) : m.push(e)
              });
              n.logger.info("friend::onFriends: parse friends", i(l), l, "delete", i(m), m), c.length ? (
                u = !0, t = e.content.timetag) : u = !1
            }(), r.enable ? (g = d, h = f, e.promise = new Promise(function(e, s) {
              function i() {
                a ? (p(), e(), g()) : r.getFriends().then(function(t) {
                  l = t, p(), e(), g()
                }).then(void 0, function(e) {
                  e._msg = "get friends error", s(e), h(e)
                })
              }
              u ? r.mergeFriends(l, m, t).then(function() {
                i()
              }).then(void 0, function(e) {
                e._msg = "merge friends error", s(e), h(e)
              }) : (n.logger.info("friend::onFriends: no merge friends"), i())
            }).then(void 0, function(e) {
              throw e._msg = "merge friends data error", h(e), e
            })) : (p(), d()))
          }).catch(function(e) {
            return n.logger.error("friend::onFriends: ", e), Promise.reject(e)
          });

        function p() {
          n.timetags.friends = t, l.invalid = m, a ? (n.syncResult.friends = l, n.syncResult.invalidFriends = m) :
            (n.logger.info("friend::onFriends: get friends bingo", i(l), l), e.obj = l)
        }
        a && (d.cmd = "friends", n.syncPromiseArray.push(d))
      }, r.onFriendRequest = function(e, t) {
        var n = Promise.resolve(),
          r = this.db,
          s = e.type;
        if ("addFriend" === (s = e.type = o.getTypeFromByte(s) || s) || "passFriendApply" === s) {
          var i = e.friend = o.assembleFriend(e.account);
          r.enable && (n = r.putFriend(i))
        }
        return t && this.onSyncFriendAction(e), n
      }, r.onSyncFriendAction = function(e) {
        this.logger.info("friend::onSyncFriendActionon:", e), this.options.onsyncfriendaction(e)
      }, r.onDeleteFriend = function(e, t) {
        var n = Promise.resolve(),
          r = this.db;
        return r.enable && (n = r.deleteFriend(e.account)), t && (e.type = "deleteFriend", this.onSyncFriendAction(
          e)), n
      }, r.onUpdateFriend = function(e, t) {
        var n = this.db,
          r = o.reverse(e);
        n.enable && n.updateFriend(r), t && this.onSyncFriendAction({
          type: "updateFriend",
          friend: r
        })
      }, r.onFriendUsers = function(e) {
        var t = this.db,
          n = e.content,
          r = n.users.map(function(e) {
            return a.reverse(e)
          });
        this.logger.warn("friend::onFriendUsers: parse users", i(r), r);
        var s = n.timetag,
          o = Promise.resolve();
        t.enable && (o = t.mergeFriendUsers(r, s)), this.timetags.friendUsers = s, o.cmd = "friendUsers", this.syncPromiseArray
          .push(o), this.syncResult.users = r
      }, r.updateFriendSysMsg = function(e) {
        var t, n, r = e.obj,
          i = e.error;
        if (e.obj.idServer) {
          if (i) t = "error", i = s.filterObj(i, "code message");
          else {
            var a = r.type;
            switch (a = o.getTypeFromByte(a) || a) {
              case "passFriendApply":
                t = "passed";
                break;
              case "rejectFriendApply":
                t = "rejected"
            }
          }
          n = {
            idServer: r.idServer,
            state: t
          }, i && (n.error = i), this.updateSysMsg(n)
        }
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(0);

      function s() {}
      s.parse = function(e) {
        var t = r.copy(e);
        return t.isBlacked = "1" === t.isBlacked, t.isMuted = "1" === t.isMuted, t.createTime = +t.createTime,
          t.updateTime = +t.updateTime, t
      }, e.exports = s
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(0),
        i = s.objs2accounts,
        o = n(426),
        a = n(129);
      r.processUser = function(e) {
        var t, n = this,
          r = n.db,
          s = e.obj,
          i = e.error,
          o = e.content;
        switch (e.cmd) {
          case "markInBlacklist":
            i || n.markInBlacklist(s);
            break;
          case "syncMarkInBlacklist":
            n.markInBlacklist(o, !0);
            break;
          case "markInMutelist":
            i || n.markInMutelist(s);
            break;
          case "syncMarkInMutelist":
            n.markInMutelist(o, !0);
            break;
          case "getRelations":
            i || n.onRelations(e);
            break;
          case "syncMyInfo":
            n.onMyInfo(e, !0);
            break;
          case "updateMyInfo":
            i || (s.updateTime = o.timetag, n.onUpdateMyInfo(e, s));
            break;
          case "syncUpdateMyInfo":
            n.onUpdateMyInfo(e, o.user, !0);
            break;
          case "getUsers":
            i || (t = o.users.map(function(e) {
              return e = a.reverse(e), n.mergeUser(e), e
            }), e.obj = t, r.enable && r.putUsers(t));
            break;
          case "updateDonnop":
            n.onUpdateDonnop(e);
            break;
          case "syncUpdateDonnop":
            n.onDonnop(e, !1)
        }
      }, r.onMyInfo = function(e) {
        var t = this,
          n = t.db,
          r = e.error,
          s = e.content,
          i = !0,
          o = void 0,
          c = new Promise(function(e, c) {
            var l, m;
            r ? i && (r && (r.callFunc = "user::onMyInfo"), e(r), t.syncData()) : (o = a.reverse(s.user), t.logger
              .info("user::onMyInfo: parseData", o), n.enable ? (l = e, m = c, n.mergeMyInfo(o, i).then(
                function() {
                  u(), l()
                }).then(void 0, function(e) {
                e.message = "db.mergeMyInfo error", e.callFunc = "user::onMyInfo", m(e)
              })) : (u(), e()))
          }).catch(function(e) {
            return t.logger.error("user::onMyInfo: ", e), Promise.reject(e)
          });

        function u() {
          t.timetags.myInfo = o.updateTime, i && (t.syncResult.myInfo = o)
        }
        i && (c.cmd = "myInfo", t.syncPromiseArray.push(c))
      }, r.onUpdateMyInfo = function(e, t, n) {
        var r = this.db,
          i = a.reverse(t),
          o = s.merge(this.myInfo, i);
        this.myInfo = o, n ? (this.logger.info("user::onUpdateMyInfo:", o), this.options.onupdatemyinfo(o)) : e
          .obj = o, r.enable && (i.account = this.account, r.updateUser(i))
      }, r.onRelations = function(e) {
        var t = this,
          n = t.db,
          r = e.error,
          s = t.packetFromSync(e),
          a = e.content.specialRelations,
          c = !0,
          u = void 0,
          l = [],
          m = [],
          d = [],
          p = [],
          f = new Promise(function(f, h) {
            var y, v;
            r ? s && (f(r), t.syncData()) : (a.forEach(function(e) {
                var t = {
                  account: (e = o.parse(e)).account,
                  createTime: e.createTime,
                  updateTime: e.updateTime
                };
                e.isBlacked ? l.push(t) : m.push(t), e.isMuted ? d.push(t) : p.push(t)
              }), t.logger.info("user::onRelations: parse blacklist", i(l), l, "delete", i(m), m), t.logger
              .info("user::onRelations: parse mutelist", i(d), d, "delete", i(p), p), a.length ? (c = !0, u =
                e.content.timetag) : c = !1, n.enable ? (y = f, v = h, e.promise = new Promise(function(e,
                r) {
                function i() {
                  s ? (g(), e(), y()) : n.getRelations().then(function(t) {
                    l = t[0], d = t[1], g(), e(), y()
                  }).then(void 0, function(e) {
                    e.message = "db.getRelations error", e.callFunc = "user::onRelations", r(e), v(
                      e)
                  })
                }
                c ? n.mergeRelations(l, m, d, p, u).then(function() {
                  i()
                }).then(void 0, function(e) {
                  e.message = "db.mergeRelations error", e.callFunc = "user::onRelations", r(e), v(
                    e)
                }) : (t.logger.warn("user::onRelations: no relations need merge"), i())
              }).then(void 0, function(e) {
                throw e.message = "merge relations data error", e.callFunc = "user::onRelations", v(e),
                  e
              })) : (g(), f()))
          }).catch(function(e) {
            return t.logger.error("user::onRelations: ", e), Promise.reject(e)
          });

        function g() {
          t.timetags.relations = u, l.invalid = m, d.invalid = p, s ? (t.syncResult.blacklist = l, t.syncResult
            .mutelist = d, t.syncResult.invalidBlacklist = m, t.syncResult.invalidMutelist = p) : (t.logger.info(
            "user::onRelations: get relations", l, d), e.obj.blacklist = l, e.obj.mutelist = d)
        }
        s && (f.cmd = "relations", t.syncPromiseArray.push(f))
      }, r.markInBlacklist = function(e, t) {
        var n = this.db;
        e.record = {
          account: e.account,
          updateTime: +new Date
        }, n.enable && n.markInBlacklist(e), t && (this.logger.info("user::markInBlacklist:", e), this.options
          .onsyncmarkinblacklist(e))
      }, r.markInMutelist = function(e, t) {
        var n = this.db;
        e.record = {
          account: e.account,
          updateTime: +new Date
        }, n.enable && n.markInMutelist(e), t && (this.logger.info("user::markInMutelist:", e), this.options.onsyncmarkinmutelist(
          e))
      }, r.mergeUser = function(e) {
        this.userSet[e.account] = e
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(13),
        s = n(27);
      e.exports = function(e, t, n) {
        t in e ? r.f(e, t, s(0, n)) : e[t] = n
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(37),
        s = n(17),
        i = n(48),
        o = n(132),
        a = n(131),
        c = n(69),
        u = n(428),
        l = n(108);
      s(s.S + s.F * !n(130)(function(e) {
        Array.from(e)
      }), "Array", {
        from: function(e) {
          var t, n, s, m, d = i(e),
            p = "function" == typeof this ? this : Array,
            f = arguments.length,
            g = f > 1 ? arguments[1] : void 0,
            h = void 0 !== g,
            y = 0,
            v = l(d);
          if (h && (g = r(g, f > 2 ? arguments[2] : void 0, 2)), null == v || p == Array && a(v))
            for (n = new p(t = c(d.length)); t > y; y++) u(n, y, h ? g(d[y], y) : d[y]);
          else
            for (m = v.call(d), n = new p; !(s = m.next()).done; y++) u(n, y, h ? o(m, g, [s.value, y], !0) :
              s.value);
          return n.length = y, n
        }
      })
    },
    function(e, t, n) {
      n(51), n(429), e.exports = n(7).Array.from
    },
    function(e, t, n) {
      e.exports = {
        default: n(430),
        __esModule: !0
      }
    },
    function(e, t, n) {
      "use strict";
      t.__esModule = !0;
      var r, s = n(431),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      t.default = function(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n
        }
        return (0, i.default)(e)
      }
    },
    function(e, t, n) {
      "use strict";
      var r, s = n(432),
        i = (r = s) && r.__esModule ? r : {
          default: r
        };
      var o = n(25).fn,
        a = n(0),
        c = n(26),
        u = a.undef,
        l = a.objs2ids,
        m = a.objs2accounts,
        d = a.teams2ids,
        p = n(116),
        f = a.getGlobal();
      o.beforeSync = function() {
        var e = this.db;
        return e.enable ? e.clearSendingMsgs() : Promise.resolve()
      }, o.syncData = function() {
        var e = this,
          t = e.db,
          n = e.options,
          r = t.enable;

        function s(t) {
          e.syncPromiseArray = [], e.syncResult = {}, e.syncTeamMembersPromiseArray = [], e.syncTeamMembersResult = {},
            e.checkNosReqNum = 0, e.getNosOriginUrlReqNum = 0, a.verifyBooleanWithDefault(n,
              "syncRelations syncFriends syncFriendUsers syncTeams syncRoamingMsgs syncMsgReceipts syncExtraTeamInfo",
              !0, "", "sync::syncData"), a.verifyBooleanWithDefault(n, "syncFilter syncTeamMembers", !1, "",
              "sync::syncData");
          var r = {};
          t = t || {}, f._nimForceSyncIM && (e.logger.warn("sync::syncData: nimForceSyncIM"), delete t.teams, f
              ._nimForceSyncIM = !1), r.myInfo = t.myInfo || 0, r.offlineMsgs = 0, n.syncRelations && (r.relations =
              t.relations || 0), n.syncFriends && (r.friends = t.friends || 0), n.syncFriendUsers && (r.friendUsers =
              t.friendUsers || 0), n.syncRobots && (r.robots = t.robots || 0), n.syncTeams && (r.teams = t.teams ||
              0), n.syncRoamingMsgs && (r.roamingMsgs = t.roamingMsgs || 0), n.syncMsgReceipts && (r.msgReceipts =
              t.msgReceipts || 0), n.syncExtraTeamInfo && (r.myTeamMembers = t.myTeamMembers || 0), n.syncSessionUnread &&
            (r.sessionAck = t.sessionAck || 0), n.syncBroadcastMsgs && (r.broadcastMsgs = t.broadcastMsg || 0),
            r.donnop = t.donnop || 0, r.deleteMsg = t.deleteMsg || 0, n.syncFilter && (r.filterMsgs = 0);
          var s = e.onSyncData.bind(e);
          s.isImSyncDataCb = !0, e.sendCmd("sync", {
            sync: r
          }, s)
        }
        e.syncing = !0, r ? e.beforeSync().then(function() {
          return e.db.getTimetags()
        }).then(function(e) {
          s(e)
        }, function() {
          s()
        }) : s(e.timetags)
      }, o.onSyncData = function(e, t) {
        e && this.syncRetryTimes > 3 && (this.syncRetryTimes = 0, e.callFunc = "sync::onSyncData", this.onCustomError(
          "SYNC_DATA_ERROR", e))
      }, o.processSync = function(e) {
        switch (this.syncRetryTimes = this.syncRetryTimes || 0, this.syncRetryTimes++, e.cmd) {
          case "syncDone":
            e.error ? this.syncRetryTimes > 3 || this.syncData() : (this.timetags.sync = e.content.timetag,
              this.onSyncDone());
            break;
          case "syncTeamMembersDone":
            this.onSyncTeamMembersDone()
        }
      }, o.onSyncDone = function(e) {
        var t, n, r, s, o, f, g, h, y, v, b, M, T, S, k, C, P, I, O, x, w, A, _ = this,
          E = _.db,
          R = E.enable,
          U = _.options,
          j = _.syncPromiseArray,
          N = _.syncResult;
        if (j && j.length) {
          var F = j.filter(function(e) {
            return "sessionAck" === e.cmd
          });
          0 === F.length && F.push(Promise.resolve());
          var D = j.filter(function(e) {
            return "sessionAck" !== e.cmd
          });
          0 === D.length && D.push(Promise.resolve()), Promise.all(D).then(function() {
            return Promise.all(F)
          }, function(e) {
            e.callFunc = "sync::onSyncDone", e.message = "afterSync syncNormalPromise 出错", _.onCustomError(
              "SYNC_NORMAL_ERROR", e)
          }).then(L, function(e) {
            e.callFunc = "sync::onSyncDone", e.message = "afterSync syncSessionAckPromise 出错", _.onCustomError(
              "SYNC_SESSION_ACK_ERROR", e)
          }).catch(function(e) {
            _.syncData()
          })
        } else L();

        function L() {
          if (j) {
            if (_.logger.info("sync::onSyncDone: after sync", a.promises2cmds(j)), j = [], n = N.blacklist || [],
              r = N.invalidBlacklist || [], s = N.mutelist || [], o = N.invalidMutelist || [], f = N.friends, g =
              N.invalidFriends || [], h = N.myInfo, y = N.users, v = N.teams, b = N.invalidTeams || [], M = N.sessions,
              T = N.msgReceipts, S = N.roamingMsgs, k = N.offlineMsgs, C = N.offlineFilterMsgs, I = N.offlineSysMsgs,
              O = N.offlineCustomSysMsgs, x = N.offlineFilterSysMsgs, w = N.offlineFilterCustomSysMsgs, N.broadcastMsgs,
              A = N.sysMsgUnread, M) {
              var e = [];
              Object.keys(M).forEach(function(t) {
                e.push(M[t])
              }), M = e.sort(function(e, t) {
                return t.updateTime - e.updateTime
              })
            }
            var c = Promise.resolve();
            R && (c = function() {
              var e, t = [],
                n = [];
              S && S.forEach(function(e) {
                n = [].concat((0, i.default)(n), (0, i.default)(e.msgs))
              });
              k && k.forEach(function(e) {
                n = [].concat((0, i.default)(n), (0, i.default)(e.msgs))
              });
              return e = E.putMsg(n), t.push(e), Promise.all(t).then(function() {
                return n
              })
            }().then(function(e) {
              var t = {};
              e.forEach(function(e) {
                var n = e.sessionId;
                t[n] || (t[n] = !0, _.markUnreadByMsgsPromise(n))
              })
            })), c.then(function() {
              R && !_.hasSynced && (_.hasSynced = !0, function() {
                U.syncRelations && (t = E.getRelations().then(function(e) {
                  n = e[0], s = e[1], n.invalid = r, s.invalid = o
                }, function(e) {
                  return e._msg = "on relations error", e
                }).catch(function(e) {
                  return _.logger.error("sync::syncRelation: ", e), Promise.reject(e)
                }), j.push(t));
                U.syncFriends && (t = E.getFriends().then(function(e) {
                  (f = e).invalid = g
                }, function(e) {
                  return e._msg = "on friends error", e
                }).catch(function(e) {
                  return _.logger.error("sync::syncFriends: ", e), Promise.reject(e)
                }), j.push(t));
                u(h) && (t = E.getUser(_.account).then(function(e) {
                  h = e
                }, function(e) {
                  return e._msg = "on myInfo error", e
                }).catch(function(e) {
                  return _.logger.error("sync::syncMyInfo: ", e), Promise.reject(e)
                }), j.push(t));
                U.syncFriendUsers && (t = E.getFriends().then(function(e) {
                  return e.map(function(e) {
                    return e.account
                  })
                }).then(function(e) {
                  return E.getUsers(e)
                }).then(function(e) {
                  y = e
                }, function(e) {
                  return e._msg = "on users error", e
                }).catch(function(e) {
                  return _.logger.error("sync::syncFriendUser: ", e), Promise.reject(e)
                }), j.push(t));
                U.syncTeams && (t = E.getTeams().then(function(e) {
                  (v = e).invalid = b
                }, function(e) {
                  return e._msg = "on teams error", e
                }).catch(function(e) {
                  return _.logger.error("sync::syncTeams: ", e), Promise.reject(e)
                }), j.push(t));
                t = E.getTeamMembersByAccount(_.account).then(function(e) {
                  _.mergeMyTeamMembers(e)
                }).catch(function(e) {
                  return _.logger.error("sync::getTeamMembersByAccount: ", e), Promise.reject(e)
                }), j.push(t), t = E.getDonnop().then(function(e) {
                  _.mergeDonnop(e)
                }).catch(function(e) {
                  return _.logger.error("sync::donnop: ", e), Promise.reject(e)
                }), j.push(t), t = E.getSessions().then(function(e) {
                  M = e
                }, function(e) {
                  return e._msg = "on sessions error", e
                }).catch(function(e) {
                  return _.logger.error("sync::getSession: ", e), Promise.reject(e)
                }), j.push(t), t = E.getSysMsgUnread().then(function(e) {
                  A = e
                }, function(e) {
                  return e._msg = "on sysMsgUnread error", e
                }).catch(function(e) {
                  return _.logger.error("sync::getSysMsgUnread: ", e), Promise.reject(e)
                }), j.push(t)
              }());
              var e = j.filter(function(e) {
                return "sessionAck" === e.cmd
              });
              0 === e.length && e.push(Promise.resolve());
              var i = j.filter(function(e) {
                return "sessionAck" !== e.cmd
              });
              0 === i.length && i.push(Promise.resolve()), Promise.all(i).then(function() {
                return Promise.all(e)
              }).then(B).then(q, function(e) {
                e.callFunc = "sync::onSyncDone", e.message = "taskAfterSync syncSessionAckPromise 出错",
                  _.onCustomError("SYNC_SESSION_ACK_ERROR", e)
              })
            })
          } else _.logger.warn("sync::onSyncDone: after sync --no promiseArray")
        }

        function B() {
          _.logger.info("sync::onSyncDone: taskAfterSync"),
            function() {
              if (N.deleteMsgSysMsgs) {
                var e = {};
                S && S.forEach(function(t) {
                  e[t.sessionId] = t
                });
                var t = {};
                k && k.forEach(function(e) {
                  t[e.sessionId] = e
                });
                var n = _.api;
                N.deleteMsgSysMsgs.forEach(function(r) {
                  r.sysMsgs.forEach(function(r) {
                    var s = r.msg,
                      i = s.sessionId;
                    [e, t].forEach(function(e) {
                      e[i] && (e[i].msgs = n.cutMsgs(e[i].msgs, s))
                    })
                  })
                }), E.enable || [S, k].forEach(function(e) {
                  e && e.forEach(function(e) {
                    if (e.msgs.length) {
                      var t = _.genSessionByMsgs(e.msgs);
                      _.cacheSyncedSession(t), M = n.mergeSessions(M, t)
                    } else M = n.cutSessions(M, {
                      id: e.sessionId
                    })
                  })
                })
              }
            }();
          var e = [];
          return e.push(_.deleteMsgOfflineRoaming(N.deleteMsgSysMsgs, M)), Promise.all(e)
        }

        function q() {
          setTimeout(H, 0)
        }

        function H() {
          var e, t, r = [];
          n && (_.logger.info("sync::notifyDataAsync: on blacklist", m(n), n), U.onblacklist(n)), s && (_.logger
            .info("sync::notifyDataAsync: on mutelist", m(s), s), U.onmutelist(s)), f && (_.logger.info(
            "sync::notifyDataAsync: on friends", m(f), f), U.onfriends(f)), h && (_.logger.info(
            "sync::notifyDataAsync: on myInfo", h), _.myInfo = h, U.onmyinfo(a.copy(h))), y && (y.forEach(
            function(e) {
              _.mergeUser(e)
            }), _.logger.info("sync::notifyDataAsync: on users", m(y), y), U.onusers(y)), v && (_.logger.info(
            "sync::notifyDataAsync: on teams", d(v), v), U.onteams(v)), T && (!_.hasSynced && M && M.length ||
            _.hasSynced) && (M = _.mergeSessionAndMsgReceipts(M, T)), M && M.length && (M.forEach(function(e) {
            _.syncResult.sessions && _.syncResult.sessions[e.id] && "number" == typeof _.syncResult.sessions[
              e.id].unread && (e.unread = _.syncResult.sessions[e.id].unread), _.mergeSession(e), p.trim(
              e)
          }), _.logger.info("sync::notifyDataAsync: on sessions", l(M), M), U.onsessions(M)), S && S.forEach(
            function(e) {
              r.push(e.timetag), (t = e.msgs).length && (_.logger.info(
                "sync::notifyDataAsync: on roaming msgs", e.sessionId, t.length, t), U.onroamingmsgs(e))
            }), k && k.forEach(function(e) {
            r.push(e.timetag), (t = e.msgs).length && (_.logger.info(
              "sync::notifyDataAsync: on offline msgs", e.sessionId, t.length, t), U.onofflinemsgs(e))
          }), C && C.forEach(function(e) {
            r.push(e.timetag), (t = e.msgs).length && (_.logger.info(
              "sync::notifyDataAsync: on offline filter msgs", e.sessionId, t.length, t), U.onofflinefiltermsgs(
              t))
          });
          var i = [],
            o = [];
          N.deleteMsgSysMsgs && N.deleteMsgSysMsgs.forEach(function(e) {
              "roaming" === e.type ? i = i.concat(e.sysMsgs) : o = o.concat(e.sysMsgs)
            }), i.length && (P = (P = P || []).concat(i)), o.length && (I = (I = I || []).concat(o)), P && (_.logger
              .info("sync::notifyDataAsync: on roaming sys msgs", P.length, P), U.onroamingsysmsgs(P)), I && (_
              .logger.info("sync::notifyDataAsync: on offline sys msgs", I.length, I), U.onofflinesysmsgs(I)),
            x && (_.logger.info("sync::notifyDataAsync: on offline filter sys msgs", x.length, x), U.onofflinefiltersysmsgs(
              x)), O && (_.logger.info("sync::notifyDataAsync: on offline custom sys msgs", O.length, O), U.onofflinecustomsysmsgs(
              O)), w && (_.logger.info("sync::notifyDataAsync: on offline filter custom sys msgs", w.length, w),
              U.onofflinefiltercustomsysmsgs(w)), A && (A = a.merge({}, _.sysMsgUnread, A), _.sysMsgUnread = a.merge({},
              A), _.logger.info("sync::notifyDataAsync: on sysMsgUnread", A), U.onsysmsgunread(A));
          var c = _.getPushNotificationMultiportConfig();
          _.logger.info("sync::notifyDataAsync: on pushNotificationMultiportConfig", c), U.onPushNotificationMultiportConfig(
              c), r.length ? (e = Math.max.apply(Math, r), _.updateRoamingMsgTimetag(e).then(W, W)) : W(), _.syncPromiseArray =
            null, _.syncResult = null
        }

        function W() {
          if (_.processUnsettledMsgs(), _.processUnsettledSysMsgs(), _.syncing = !1, U.onsyncdone(), U.syncTeamMembers &&
            v && v.length) throw new c("sync team members api deprecated!")
        }
      }, o.syncTeamMembers = function(e) {
        var t, n, r = this;
        t = r.timetags, n = {}, t = t || {}, e.forEach(function(e) {
          n[e.teamId] = 0
        }, r), r.sendCmd("syncTeamMembers", {
          sync: n
        }, r.onSyncTeamMembers.bind(r))
      }, o.onSyncTeamMembers = function(e, t) {
        e.callFunc = "sync::onSyncTeamMembers", e.message = "同步群成员错误", this.onCustomError(
          "SYNC_TEAM_MEMBERS_ERROR", e)
      }, o.onSyncTeamMembersDone = function() {
        var e, t = this,
          n = t.db,
          r = t.options,
          s = t.syncTeamMembersResult,
          i = t.syncTeamMembersPromiseArray;

        function o() {
          t.logger.log("sync::onSyncTeamMembersDone: afterSync", a.promises2cmds(i)), i = [], n.enable && !t.hasSyncedTeamMembers ?
            (t.hasSyncedTeamMembers = !0, function() {
              if (!r.syncTeams || !r.syncTeamMembers) return l();
              n.getTeams().then(function(n) {
                n.forEach(function(n) {
                  var r = n.teamId;
                  e = new Promise(function(e, n) {
                    t.api.getTeamMembers({
                      teamId: r,
                      done: function(t, i) {
                        t && n({
                          callFunc: "sync::getTeamMembers: teamId-" + r,
                          message: "sync team members error"
                        }), s[r] = i.members || [], e()
                      }
                    })
                  }), i.push(e)
                }), i.length ? Promise.all(i).then(c, function(e) {
                  e.callFunc = "sync::onSyncTeamMembersDone", e.message =
                    "pullFullData promiseArray notifyData 错误", t.onCustomError(
                      "SYNC_TEAM_MEMBERS_ERROR", e)
                }) : c()
              }, function(e) {
                e.callFunc = "sync::onSyncTeamMembersDone", e.message = "pullFullData getTeams 错误", t.onCustomError(
                  "SYNC_TEAM_MEMBERS_ERROR", e)
              })
            }()) : c()
        }

        function c() {
          setTimeout(u, 0)
        }

        function u() {
          var e, n;
          Object.keys(s).forEach(function(i) {
            -1 === i.indexOf("invalid") && (e = s[i], n = s[i + "-invalid"] || [], e.invalid = n, function(
              e, n) {
              t.logger.info("sync::onSyncTeamMembersDone: onTeamMembers", e, m(n), n), r.onteammembers({
                teamId: e,
                members: n
              })
            }(i, e))
          }), l()
        }

        function l() {
          t.logger.info("sync::onSyncTeamMembersDone: bingo"), r.onsyncteammembersdone(), t.syncTeamMembersResult =
            null, t.syncTeamMembersPromiseArray = null
        }
        i.length ? Promise.all(i).then(o, function(e) {
          e.callFunc = "sync::onSyncTeamMembersDone", e.message = "同步群成员 syncTeamMembersPromiseArray 错误", t
            .onCustomError("SYNC_TEAM_MEMBERS_ERROR", e)
        }).catch(function(e) {
          t.logger.log("sync::onSyncTeamMembersDone: syncTeamMembersPromiseArray promise ", e), o()
        }) : o()
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(118);
      r.assembleLogin = function() {
        var e = this.assembleIMLogin();
        return this.addPushInfo instanceof Function ? this.addPushInfo(e) : Promise.resolve({
          login: e
        })
      }, r.afterLogin = function() {
        var e = this;
        this.initPush instanceof Function && this.initPush();
        var t = this.db;
        if (t.enable) {
          var n = this.account;
          this.options.appendAppKeyForDBName && (n += "-" + this.options.appKey), this.db.init(n).then(function() {
            e.notifyLogin(), e.syncData()
          }, function(n) {
            e.logger.warn("link::afterLogin: no db", n), t.reset(!1), e.notifyLogin(), e.syncData()
          })
        } else this.logger.info("link::afterLogin: no db"), this.notifyLogin(), this.syncData()
      }, r.processAuth = function(e) {
        switch (e.cmd) {
          case "login":
            e.error || (e.content = e.content || {}, this.loginAndroidPush && this.loginAndroidPush(e.content.aosPushInfo ||
              {}), e.obj = e.content.loginRes, this.connectionId = e.content.loginRes.connectionId, this.onLoginPortsChange(
              e, 2));
            break;
          case "kicked":
            return void this.onKicked(e);
          case "multiPortLogin":
            this.onLoginPortsChange(e, e.content.state);
            break;
          case "kick":
            e.error || (e.obj.deviceIds = e.content.deviceIds)
        }
      }, r.onLoginPortsChange = function(e, t) {
        var n = this,
          r = e.content.loginPorts;
        if (r && r.length) {
          var i = !0;
          switch (t) {
            case 2:
              i = !0;
              break;
            case 3:
              i = !1
          }
          r.forEach(function(e) {
            e.type = s.reverseType(e.type), e.time = +e.time, e.online = i
          }), (r = r.filter(function(e) {
            return e.connectionId !== n.connectionId
          })).length && (n.logger.info("link::onLoginPortsChange:", r), n.options.onloginportschange(r))
        }
      }, r.kickedReasons = ["", "samePlatformKick", "serverKick", "otherPlatformKick", "silentlyKick"], r.kickedMessages = [
        "", "不允许同一个帐号在多个地方同时登录", "被服务器踢了", "被其它端踢了", "悄悄被踢"
      ]
    },
    function(e, t, n) {
      "use strict";
      var r = n(25).fn,
        s = n(2),
        i = n(0),
        o = n(36);
      r.refreshSocketUrl = function() {
        var e = this,
          t = e.options,
          n = s.info,
          r = t.lbsUrl;

        function a(t) {
          e.socketUrls = [], (t = s.isWeixinApp ? t.data : JSON.parse(t)).common.link.forEach(function(t) {
            e.socketUrls.push(s.formatSocketUrl({
              url: t,
              secure: e.options.secure
            }))
          }), t.common["link.default"].forEach(function(t) {
            t = s.formatSocketUrl({
              url: t,
              secure: e.options.secure
            }), -1 === e.socketUrls.indexOf(t) && e.socketUrls.push(t)
          });
          try {
            s.uploadUrl = t.nosup[0]
          } catch (e) {}
          s.chunkUploadUrl = t["nos-chunk"] || "", e.logger.info(
            "link::refreshSocketUrl: ajax load, got socket urls ", e.socketUrls), e.connectToUrl(e.getNextSocketUrl())
        }

        function c(t) {
          e.logger.error("link::refreshSocketUrl: ajax lbs error", t), e.api.reportLogs({
            event: "nimlb",
            code: 3001
          }), e.onDisconnect(!1, "link::refreshSocketUrl")
        }
        r = r + i.genUrlSep(r) + "k=" + t.appKey + "&id=" + t.account + "&sv=" + n.sdkVersion + "&pv=" + n.protocolVersion,
          e.logger.info("link::refreshSocketUrl: ajax " + r), s.isWeixinApp ? (r = r.replace(/:\d+/, ""), wx.request({
            url: r,
            success: a,
            fail: c
          })) : o(r, {
            proxyUrl: i.url2origin(r) + "/lbs/res/cors/nej_proxy_frame.html",
            timeout: s.xhrTimeout,
            onload: a,
            onerror: c
          })
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn,
        s = n(0),
        i = s.notundef;
      r.putSession = function(e) {
        return void 0 === (e = s.merge({}, e)).updateTime && e.lastMsg && e.lastMsg.time && (e.updateTime = e.lastMsg
          .time), delete e.unread, this.modifyOrPut({
          table: "session",
          obj: e,
          key: "id",
          modifyObjWhenPut: {
            unread: 0
          }
        })
      }, r.getSessions = function(e) {
        var t, n = !(e = e || {}).reverse,
          r = e.limit || 100,
          s = e.lastSessionId,
          o = e.sessionId,
          a = !1;
        if (i(s)) t = function(e) {
          return !!a || (e.id === s && (a = !0), !1)
        };
        else if (i(o)) return this.get("session", o);
        return this.getAll("session", {
          index: "updateTime",
          desc: n,
          limit: r,
          filter: t
        })
      }, r.getSession = function(e) {
        return this.get("session", e)
      }, r.updateSession = function(e) {
        var t = this,
          n = e.id,
          r = s.filterObj(e, "ack unread lastMsg localCustom msgReceiptTime msgReceiptServerTime");
        return Object.keys(e).forEach(function(t) {
          0 === t.indexOf("last") && (r[t] = e[t])
        }), this.getOne("session", null, n, {
          modifyObj: r
        }).then(function(e) {
          return e ? t.logger.log("db::updateSession: " + n, r) : t.logger.warn(
            "db::updateSession: no record " + n), e
        })
      }, r.resetSessionUnread = function(e) {
        return this.updateSession({
          id: e,
          unread: 0
        })
      }, r.deleteSession = function(e) {
        return this.remove("session", e)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn,
        s = n(0);
      s.notundef;
      r.putBroadcastMsg = function(e) {
        var t = this;
        return new Promise(function(n) {
          s.isArray(e) || (e = [e]);
          var r = [],
            i = e.length;

          function o() {
            0 === --i && n(r)
          }
          e.forEach(function(e) {
            e = s.copy(e), t.put("broadcastMsg", e).then(function(e) {
              r.push(e[0]), o()
            }, o)
          })
        })
      }, r.getBroadcastMsgs = function(e) {
        return e = e || {}, this.getAll("broadcastMsg", e)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn,
        s = n(0),
        i = s.notundef;
      r.putSysMsg = function(e) {
        var t = this;
        return new Promise(function(n) {
          if (s.isArray(e) || (e = [e]), !e[0].filter) {
            var r = [],
              i = e.length;
            e.forEach(function(e) {
              e = s.copy(e), t.put("sysMsg", e).then(function(e) {
                r.push(e[0]), o()
              }, o)
            })
          }

          function o() {
            0 === --i && n(r)
          }
        })
      }, r.getSysMsgs = function(e) {
        var t = !(e = e || {}).reverse,
          n = e.limit || 100,
          r = null,
          s = null;
        e.category && (r = "category", s = e.category), e.type && (r = "type", s = e.type);
        var o, a = e.lastIdServer,
          c = !1,
          u = e.read;
        return (i(a) || i(u)) && (o = function(e) {
          return i(a) ? (a = "" + a, c ? t() : (e.idServer === a && (c = !0), !1)) : t();

          function t() {
            return !i(u) || e.read === u
          }
        }), e = {
          filter: o,
          desc: t,
          limit: n
        }, r ? this.getOnly("sysMsg", r, s, e) : this.getAll("sysMsg", e)
      }, r.getSysMsgByIdServer = function(e) {
        return this.getOne("sysMsg", "idServer", e)
      }, r.updateSysMsg = function(e) {
        var t = this;
        if (!e.filter) {
          var n = "" + e.idServer,
            r = s.filterObj(e, "read state error localCustom");
          return this.getOne("sysMsg", "idServer", n, {
            modifyObj: r
          }).then(function(e) {
            return e ? t.logger.log("db::updateSysMsg: " + n, r) : t.logger.warn("db::updateSession: " + n),
              e
          })
        }
      }, r.markSysMsgRead = function(e) {
        var t = this;
        return new Promise(function(n, r) {
          s.isArray(e) || (e = [e]);
          var i, o, a = [],
            c = [];
          e.forEach(function(e) {
            i = t.getSysMsgByIdServer(e.idServer).then(function(e) {
              e && !e.read && (o = t.updateSysMsg({
                idServer: e.idServer,
                read: !0
              }), c.push(o))
            }, r), a.push(i)
          }), Promise.all(a).then(function() {
            Promise.all(c).then(function(e) {
              n(e)
            }, r)
          }, r)
        })
      }, r.deleteSysMsg = function(e) {
        var t, n = this,
          r = [];
        return s.isArray(e) || (e = [e]), e.forEach(function(e) {
          e = "" + e, t = n.getOne("sysMsg", "idServer", e, {
            remove: !0
          }), r.push(t)
        }), 1 === r.length ? r[0] : Promise.all(r)
      }, r.deleteAllSysMsgs = function() {
        var e = this.clearTable("sysMsg"),
          t = this.clearTable("sysMsgUnread");
        return Promise.all([e, t])
      }, r.getSysMsgUnread = function() {
        return this.getAll("sysMsgUnread").then(function(e) {
          var t = {};
          return e.forEach(function(e) {
            t[e.type] = e.num
          }), t
        })
      }, r.updateSysMsgUnread = function(e) {
        var t = this;
        e = s.copy(e);
        var n = [];
        return Object.keys(e).forEach(function(t) {
          n.push({
            type: t,
            num: e[t]
          })
        }), this.put("sysMsgUnread", n).then(function() {
          return t.logger.log("db::updateSysMsgUnread: ", e), e
        })
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn,
        s = n(0),
        i = n(2);
      r.putMsg = function(e) {
        return s.isArray(e) || (e = [e]), !e.length || e[0].filter ? Promise.resolve() : (e = e.filter(function(
          e) {
          return !e.ignore
        }), this.put("msg1", e))
      }, r.updateMsg = function(e) {
        var t = this;
        if (!e.filter) {
          var n = e.idClient,
            r = s.filterObj(e, "resend status idServer time localCustom");
          return t.getOne("msg1", null, n, {
            modifyObj: r
          }).then(function(e) {
            return e ? t.logger.log("db::updateMsg: " + n, r) : t.logger.warn("db::updateMsg: no record " +
              n), e
          })
        }
      }, r.getMsgs = function(e) {
        return i.isBrowser ? this.getMsgsIndexedDB(e) : i.isRN ? this.getMsgsRN(e) : Promise.resolve()
      }, r.getMsgsRN = function(e) {
        var t = {};
        return "number" == typeof e.start && (t.lowerBound = ["time", e.start]), "number" == typeof e.end && e.end !==
          1 / 0 && (t.upperBound = ["time", e.end]), t.desc = !1, t.sortIndex = "time", "boolean" == typeof e.desc &&
          (t.desc = e.desc), "number" == typeof e.limit && (t.limit = e.limit), t.searchIndex = [], e.sessionId &&
          t.searchIndex.push(["sessionId", e.sessionId]), "string" == typeof e.type && t.searchIndex.push([
            "type", e.type
          ]), this.getAll("msg1", t)
      }, r.getMsgsIndexedDB = function(e) {
        this.checkDB();
        var t = "time",
          n = !1,
          r = !1,
          i = (e = e || {}).sessionId || [],
          o = e.sessionIds || [];
        s.isString(i) ? i = [i] : Array.isArray(i) || (i = []), s.isString(o) ? o = [o] : Array.isArray(o) || (
          o = []);
        var a = i.concat(o);
        1 === a.length ? (n = !0, t = "sessionTime", i = a[0]) : a.length > 1 && (n = !0, r = !0, o = a);
        var c = e.start || 0,
          u = e.end || 1 / 0,
          l = c,
          m = u;
        n && !r && (l = [i, c], m = [i, u]);
        var d = !1 !== e.desc,
          p = e.limit || 100,
          f = !1,
          g = !1,
          h = e.type || [],
          y = e.types || [];
        s.isString(h) ? h = [h] : Array.isArray(h) || (h = []), s.isString(y) ? y = [y] : Array.isArray(y) || (
          y = []);
        var v = h.concat(y);
        1 === v.length ? (f = !0, h = v[0]) : v.length > 1 && (f = !0, g = !0, y = v);
        var b = e.keyword || "",
          M = e.filterFunc,
          T = void 0;
        return (r || f || b || s.isFunction(M)) && (T = function(e) {
          if (r && -1 === o.indexOf(e.sessionId)) return !1;
          if (f)
            if (g) {
              if (-1 === y.indexOf(e.type)) return !1
            } else if (h !== e.type) return !1;
          if (b && -1 === (e.text || e.tip || "").indexOf(b)) return !1;
          return !M || M(e)
        }), this.server.query("msg1", t).bound(l, m, !0, !0).desc(d).limit(p).filter(T).execute()
      }, r.getMsgCountAfterAck = function(e) {
        return i.isBrowser ? this.getMsgCountAfterAckIndexedDB(e) : i.isRN ? this.getMsgCountAfterAckRN(e) :
          Promise.resolve()
      }, r.getMsgCountAfterAckRN = function(e) {
        var t = e = e || {},
          n = t.sessionId,
          r = t.ack;
        return this.checkDB(), this.getAll("msg1", {
          searchIndex: ["sessionId", n],
          lowerBound: ["time", r]
        }).then(function(t) {
          var n = t.filter(function(t) {
            return "out" !== t.flow && ("notification" !== t.type || !!e.shouldCountNotifyUnread(t))
          });
          return Promise.resolve(n.length)
        })
      }, r.getMsgCountAfterAckIndexedDB = function(e) {
        var t = (e = e || {}).sessionId;
        return this.checkDB(), this.server.query("msg1", "sessionTime").bound([t, e.ack], [t, 1 / 0], !0, !0).execute()
          .then(function(t) {
            var n = t.filter(function(t) {
              return "out" !== t.flow && ("notification" !== t.type || !!e.shouldCountNotifyUnread(t))
            });
            return Promise.resolve(n.length)
          })
      }, r.amendMsg = function(e) {
        return e ? (s.notexist(e.text) && (e.text = ""), e) : null
      }, r.getMsgByIdClient = function(e) {
        var t = this;
        return t.getOne("msg1", null, e).then(function(e) {
          return t.amendMsg(e)
        })
      }, r.getMsgsByIdClients = function(e) {
        var t, n = this,
          r = [];
        return e.forEach(function(e) {
          t = n.getMsgByIdClient(e), r.push(t)
        }), Promise.all(r)
      }, r.clearSendingMsgs = function() {
        var e = this;
        return e.getOnly("msg1", "status", "sending", {
          modifyObj: {
            status: "fail"
          }
        }).then(function(t) {
          e.logger.log("db::clearSendingMsgs: msgs send failed", t)
        })
      }, r.deleteMsg = function(e) {
        var t, n = this,
          r = [];
        return s.isArray(e) || (e = [e]), e.forEach(function(e) {
          t = n.getOne("msg1", null, e, {
            remove: !0
          }).then(function(e) {
            return n.logger.log("db::deleteMsg:", e), e
          }), r.push(t)
        }), 1 === r.length ? r[0] : Promise.all(r)
      }, r.deleteMsgsBySessionId = function(e) {
        return this.getOnly("msg1", "sessionId", e, {
          remove: !0
        })
      }, r.deleteAllMsgs = function() {
        var e = this.clearTable("msg1"),
          t = this.clearTable("session");
        return Promise.all([e, t])
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn,
        s = n(0);
      r.mergeMyInfo = function(e, t) {
        var n = this;
        return n.put("user", e).then(function() {
          return t ? n.updateMyInfoTimetag(e.updateTime) : e
        })
      }, r.mergeFriendUsers = function(e, t) {
        var n = this;
        return n.putUsers(e).then(function() {
          n.updateFriendUserTimetag(t)
        })
      }, r.putUsers = function(e) {
        return this.put("user", e)
      }, r.putUser = function(e) {
        return this.put("user", e)
      }, r.updateUser = function(e) {
        var t = this,
          n = (e = s.copy(e)).account;
        return this.getOne("user", null, n, {
          modifyObj: e
        }).then(function(r) {
          return r ? t.logger.log("db::updateUser: " + n, e) : t.logger.warn("db::updateUser: no record " +
            n), r
        })
      }, r.putUsersIfIsFriend = function(e) {
        var t, n = this,
          r = [],
          s = [];
        return e.forEach(function(e) {
          t = n.getFriend(e.account).then(function(r) {
            return r && (t = n.putUser(e), s.push(t)), r
          }), r.push(t)
        }), Promise.all(r).then(function() {
          return Promise.all(s).then(function(e) {
            return e
          })
        })
      }, r.deleteUser = function(e) {
        return this.remove("user", e)
      }, r.getUser = function(e) {
        return this.getOne("user", null, e)
      }, r.getUsers = function(e) {
        return this.getAll("user", {
          filter: function(t) {
            return -1 !== e.indexOf(t.account)
          }
        })
      }, r.getAllUsers = function() {
        return this.getAll("user")
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn,
        s = n(0),
        i = n(26),
        o = n(119),
        a = n(86);

      function c(e) {
        return e.valid && e.validToCurrentUser
      }

      function u(e) {
        return e && e.valid
      }

      function l(e) {
        return e && s.fillUndef(e, {
          mute: !1,
          custom: ""
        }), e
      }
      r.mergeTeams = function(e, t, n) {
        var r = this,
          s = r.put("team", e),
          i = r.leaveTeams(t, n);
        return Promise.all([s, i]).then(function() {
          return r.logger.log("db::mergeTeams:"), r.updateTeamTimetag(n), [e, t, n]
        })
      }, r.putTeam = function(e) {
        if (e) return s.isArray(e) || (e = [e]), e.forEach(function(e) {
          e.validToCurrentUser = !0
        }), this.put("team", e)
      }, r.updateTeam = function(e) {
        var t = this,
          n = (e = s.copy(e)).teamId;
        return t.getOne("team", null, n, {
          modifyObj: e
        }).then(function(r) {
          return r ? (t.logger.log("db::updateTeam: " + n, e), r) : (t.logger.warn(
            "db::updateTeam: no record " + n), t.putTeam(e))
        })
      }, r.transferTeam = function(e, t, n) {
        var r = this,
          s = e.teamId,
          i = e.memberUpdateTime,
          o = {
            teamId: s,
            account: t,
            type: "normal",
            updateTime: i
          },
          a = {
            teamId: s,
            account: n,
            type: "owner",
            updateTime: i
          };
        return r.updateTeamMembers([o, a]).then(function() {
          return r.putTeam(e).then(function() {
            return r.logger.log("db::transferTeam: " + e.teamId + " " + t + " -> " + n), [e, t, n]
          })
        })
      }, r.leaveTeam = function(e) {
        var t = this;
        return t.updateTeam({
          teamId: e,
          validToCurrentUser: !1
        }).then(function() {
          return t.removeAllTeamMembers(e)
        })
      }, r.dismissTeam = function(e, t) {
        var n = this,
          r = {
            teamId: e,
            valid: !1,
            validToCurrentUser: !1,
            updateTime: t
          };
        return n.updateTeam(r).then(function() {
          return n.removeAllTeamMembers(e)
        })
      }, r.leaveTeams = function(e, t) {
        var n, r = this,
          s = [];
        return e.forEach(function(e) {
          n = r.leaveTeam(e.teamId, t), s.push(n)
        }), Promise.all(s)
      }, r.getTeamsByTeamIds = function(e) {
        var t, n = this,
          r = [];
        return e.forEach(function(e) {
          t = n.getTeam(e), r.push(t)
        }), Promise.all(r)
      }, r.getTeam = function(e) {
        e = "" + e;
        var t = this;
        return t.getOne("team", null, e).then(function(e) {
          return e ? (t.updateTeamProperties([e]), e) : null
        })
      }, r.getTeams = function() {
        var e = this;
        return e.getAll("team", {
          filter: c
        }).then(function(t) {
          return e.updateTeamProperties(t), t
        })
      }, r.updateTeamProperties = function(e) {
        e.forEach(function(e) {
          e && o.fillProperties(e)
        })
      }, r.mergeTeamMembers = function(e, t, n, r) {
        var s = this,
          i = s.putTeamMembers(t),
          o = s.updateTeamMembers(n);
        return Promise.all([i, o]).then(function() {
          return s.logger.log("db::mergeTeamMembers: " + e), s.updateTeamMemberTimetag(e, r)
        })
      }, r.putTeamMembers = function(e) {
        return this.put("teamMember", e)
      }, r.getTeamMembersByAccount = function(e) {
        return this.getOnly("teamMember", "account", e, {
          filter: u,
          mapper: l
        }).then()
      }, r.getTeamMembers = function(e) {
        var t = this;
        e = "" + e;
        return t.getOnly("teamMember", "teamId", e, {
          filter: function(e) {
            return e.valid
          },
          mapper: l
        }).then(function(e) {
          return t.updateTeamMemberProperties(e).then(function() {
            return e
          })
        })
      }, r.updateTeamMemberProperties = function(e) {
        var t, n = this,
          r = [];
        return e.forEach(function(e) {
          a.fillProperties(e) && (t = n.updateTeamMember(e), r.push(t))
        }), Promise.all(r)
      }, r.getInvalidTeamMembers = function(e, t) {
        var n = this;
        e = "" + e;
        var r, s = [];
        return t.forEach(function(t) {
          r = n.getOne("teamMember", null, a.genId(e, t)).then(function(e) {
            return l(e)
          }), s.push(r)
        }), Promise.all(s)
      }, r.updateTeamMember = function(e) {
        var t = this,
          n = e.teamId,
          r = e.account,
          i = a.genId(n, r),
          o = s.filterObj(e, "nickInTeam muteTeam mute custom updateTime type valid");
        return this.getOne("teamMember", null, i, {
          modifyObj: o,
          mapper: l
        }).then(function(e) {
          return e ? t.logger.log("db::updateTeamMember: " + n + " " + r, o) : t.logger.warn(
            "db::updateTeam: no record " + n + " " + r), e
        })
      }, r.updateTeamMembers = function(e) {
        var t = this;
        if (!e.length) return Promise.resolve();
        var n, r = [];
        return e.forEach(function(e) {
          n = t.updateTeamMember(e), r.push(n)
        }), Promise.all(r)
      }, r.updateTeamManagers = function(e, t, n, r) {
        var s = t.map(function(t) {
          return {
            teamId: e,
            account: t,
            type: n ? "manager" : "normal",
            updateTime: r
          }
        });
        return this.updateTeamMembers(s)
      }, r.removeTeamMembersByAccounts = function(e, t) {
        var n = t.map(function(t) {
          return {
            teamId: e,
            account: t,
            valid: !1
          }
        });
        return this.updateTeamMembers(n)
      }, r.removeAllTeamMembers = function(e) {
        var t = this;
        return t.getOnly("teamMember", "teamId", e, {
          modifyObj: {
            valid: !1
          }
        }).then(function() {
          return t.logger.warn("db::removeAllTeamMembers: " + e), t.deleteTeamMemberTimetag(e)
        })
      }, r.deleteTeamMembers = function(e) {
        var t = this;
        return t.getOnly("teamMember", "teamId", e, {
          remove: !0
        }).then(function() {
          t.logger.warn("db::deleteTeamMembers: " + e), t.deleteTeamMemberTimetag(e)
        })
      }, r.deleteTeam = function(e) {
        var t, n = this,
          r = [];
        return s.isArray(e) || (e = [e]), e.forEach(function(e) {
          e = "" + e, t = n.get("team", e).then(function(t) {
            if (t && c(t)) throw i.stillInTeamError({
              callFunc: "team::deleteTeam",
              team: t
            });
            var r = n.remove("team", e),
              s = n.deleteTeamMembers(e);
            return Promise.all([r, s])
          }), r.push(t)
        }), 1 === r.length ? r[0] : Promise.all(r)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn,
        s = n(0);
      r.mergeFriends = function(e, t, n) {
        var r = this;
        return r.updateAndDelete("friend", e, t).then(function() {
          return r.logger.log("db::mergeFriends: updateAndDelete done", e), n && r.updateFriendTimetag(n),
            [e, t, n]
        })
      }, r.putFriend = function(e) {
        return this.put("friend", e)
      }, r.updateFriend = function(e) {
        var t = this,
          n = (e = s.copy(e)).account;
        return this.getOne("friend", null, n, {
          modifyObj: e
        }).then(function(r) {
          return r ? t.logger.log("db::updateFriend: " + n, e) : t.logger.warn(
            "db::updateFriend: no record " + n), r
        })
      }, r.deleteFriend = function(e) {
        var t = this.remove("friend", e),
          n = this.deleteUser(e);
        return Promise.all([t, n])
      }, r.getFriends = function() {
        return this.getAll("friend", {
          filter: function(e) {
            return e.valid
          }
        })
      }, r.getFriend = function(e) {
        return this.getOne("friend", null, e)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn,
        s = n(0);
      r.mergeRelations = function(e, t, n, r, s) {
        var i = this,
          o = i.updateAndDelete("blacklist", e, t),
          a = i.updateAndDelete("mutelist", n, r);
        return Promise.all([o, a]).then(function() {
          return i.logger.log("db::mergeRelations: timetag " + s), i.updateRelationTimetag(s), [e, t, n, r,
            s
          ]
        })
      }, r.getRelations = function() {
        var e = this.getAll("blacklist"),
          t = this.getAll("mutelist");
        return Promise.all([e, t])
      }, r.markInBlacklist = function(e) {
        if ((e = s.copy(e)).isAdd) {
          var t = e.record;
          return this.put("blacklist", t)
        }
        var n = e.account;
        return this.remove("blacklist", n)
      }, r.markInMutelist = function(e) {
        if ((e = s.copy(e)).isAdd) {
          var t = e.record;
          return this.put("mutelist", t)
        }
        var n = e.account;
        return this.remove("mutelist", n)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn;
      r.getTimetags = function(e) {
        var t = {};
        return this.getAll("timetag", {
          filter: e,
          mapper: function(e) {
            return -1 !== e.name.indexOf("team-") ? t[e.name] = 0 : t[e.name] = e.value, e
          }
        }).then(function() {
          return t
        })
      }, r.getTeamMemberTimetags = function() {
        return this.getTimetags(function(e) {
          return -1 !== e.name.indexOf("team-")
        })
      }, r.getTimetag = function(e) {
        return this.getOne("timetag", null, e).then(function(e) {
          return (e = e || {
            value: 0
          }).value
        })
      }, r.getTeamMemberTimetag = function(e) {
        return 0
      }, r.updateTimetag = function(e, t) {
        var n = {
          name: e,
          value: t
        };
        return this.put("timetag", n)
      }, r.updateMyInfoTimetag = function(e) {
        return this.updateTimetag("myInfo", e)
      }, r.updateRelationTimetag = function(e) {
        return this.updateTimetag("relations", e)
      }, r.getRelationsTimetag = function() {
        return this.getTimetag("relations")
      }, r.updateFriendTimetag = function(e) {
        return this.updateTimetag("friends", e)
      }, r.getFriendsTimetag = function() {
        return this.getTimetag("friends")
      }, r.updateFriendUserTimetag = function(e) {
        return this.updateTimetag("friendUsers", e)
      }, r.updateTeamTimetag = function(e) {
        return this.updateTimetag("teams", e)
      }, r.getTeamsTimetag = function() {
        return this.getTimetag("teams")
      }, r.updateTeamMemberTimetag = function(e, t) {
        return this.updateTimetag("team-" + e, t)
      }, r.getTeamMembersTimetag = function(e) {
        return this.getTimetag("team-" + e)
      }, r.updateMyTeamMembersTimetag = function(e) {
        return this.updateTimetag("myTeamMembers", e)
      }, r.getBroadcastMsgTimetag = function(e) {
        return this.getTimetag("broadcastMsg")
      }, r.updateBroadcastMsgTimetag = function(e) {
        return this.updateTimetag("broadcastMsg", parseInt(e))
      }, r.updateRoamingMsgTimetag = function(e) {
        return this.updateTimetag("roamingMsgs", e)
      }, r.updateMsgReceiptsTimetag = function(e) {
        return this.updateTimetag("msgReceipts", e)
      }, r.updateDonnopTimetag = function(e) {
        return this.updateTimetag("donnop", e)
      }, r.updateDeleteMsgTimetag = function(e) {
        return this.updateTimetag("deleteMsg", e)
      }, r.updateSessionAck = function(e) {
        return this.updateTimetag("sessionAck", e)
      }, r.deleteTimetag = function(e) {
        return this.remove("timetag", e)
      }, r.deleteTeamMemberTimetag = function(e) {
        return this.deleteTimetag("team-" + e)
      }
    },
    function(e, t, n) {
      "use strict";
      var r = n(52).fn;
      r.setKey = function(e, t) {
        return this.put("kv", {
          key: e,
          value: t
        })
      }, r.getKey = function(e) {
        return this.get("kv", e).then(function(e) {
          return e && e.value
        })
      }, r.setDonnop = function(e) {
        return this.setKey("donnop", e)
      }, r.getDonnop = function() {
        return this.getKey("donnop")
      }
    },
    function(e, t, n) {
      "use strict";
      var r = {
          version: 8
        },
        s = {
          kv: {
            key: {
              keyPath: "key"
            }
          },
          timetag: {
            key: {
              keyPath: "name"
            }
          },
          blacklist: {
            key: {
              keyPath: "account"
            }
          },
          mutelist: {
            key: {
              keyPath: "account"
            }
          },
          friend: {
            key: {
              keyPath: "account"
            }
          },
          user: {
            key: {
              keyPath: "account"
            }
          },
          team: {
            key: {
              keyPath: "teamId"
            }
          },
          teamMember: {
            key: {
              keyPath: "id"
            },
            indexes: {
              teamId: {
                unique: !1
              },
              account: {
                unique: !1
              }
            }
          },
          msg: {
            key: {
              autoIncrement: !0
            },
            indexes: {
              idClient: {
                unique: !0
              },
              sessionId: {
                unique: !1
              },
              time: {
                unique: !1
              },
              type: {
                unique: !1
              },
              sessionType: {
                unique: !1
              },
              status: {
                unique: !1
              },
              sessionTime: {
                key: ["sessionId", "time"],
                unique: !1
              }
            }
          },
          msg1: {
            key: {
              keyPath: "idClient"
            },
            indexes: {
              sessionId: {
                unique: !1
              },
              time: {
                unique: !1
              },
              status: {
                unique: !1
              },
              sessionTime: {
                key: ["sessionId", "time"],
                unique: !1
              }
            }
          },
          broadcastMsg: {
            key: {
              keyPath: "broadcastId"
            },
            indexes: {
              time: {
                unique: !1
              }
            }
          },
          sysMsg: {
            key: {
              autoIncrement: !0
            },
            indexes: {
              idServer: {
                unique: !0
              },
              category: {
                unique: !1
              },
              type: {
                unique: !1
              }
            }
          },
          sysMsgUnread: {
            key: {
              keyPath: "type"
            }
          },
          session: {
            key: {
              keyPath: "id"
            },
            indexes: {
              updateTime: {
                unique: !1
              }
            }
          }
        };
      r.keyPath = function(e) {
        return s[e].key.keyPath
      }, r.schema = function() {
        return window._nimForceSyncIM = !0, s
      }, e.exports = r
    },
    function(e, t, n) {
      "use strict";
      (function(r) {
        var s, i, o = n(9),
          a = (i = o) && i.__esModule ? i : {
            default: i
          };
        ! function(i, o) {
          var c, u = (i = void 0 !== i ? i : "undefined" != typeof self ? self : void 0 !== r ? r : {}).IDBKeyRange ||
            i.webkitIDBKeyRange,
            l = "readonly",
            m = "readwrite",
            d = Object.prototype.hasOwnProperty,
            p = function() {
              if (!c && !(c = i.indexedDB || i.webkitIndexedDB || i.mozIndexedDB || i.oIndexedDB || i.msIndexedDB ||
                  (null === i.indexedDB && i.shimIndexedDB ? i.shimIndexedDB : void 0))) throw "IndexedDB required";
              return c
            },
            f = function(e) {
              return e
            },
            g = function(e) {
              return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
            },
            h = function(e) {
              return "function" == typeof e
            },
            y = function(e) {
              return void 0 === e
            },
            v = function(e, t) {
              var n = this,
                r = !1;
              this.name = t, this.getIndexedDB = function() {
                return e
              }, this.add = function(t) {
                if (r) throw "Database has been closed";
                for (var s = [], i = 0, o = 0; o < arguments.length - 1; o++)
                  if (Array.isArray(arguments[o + 1]))
                    for (var a = 0; a < arguments[o + 1].length; a++) s[i] = arguments[o + 1][a], i++;
                  else s[i] = arguments[o + 1], i++;
                var c = e.transaction(t, m),
                  u = c.objectStore(t);
                return new Promise(function(e, t) {
                  s.forEach(function(e) {
                    var t;
                    if (e.item && e.key) {
                      var n = e.key;
                      e = e.item, t = u.add(e, n)
                    } else t = u.add(e);
                    t.onsuccess = function(t) {
                      var n = t.target,
                        r = n.source.keyPath;
                      null === r && (r = "__id__"), Object.defineProperty(e, r, {
                        value: n.result,
                        enumerable: !0
                      })
                    }
                  }), c.oncomplete = function() {
                    e(s, n)
                  }, c.onerror = function(e) {
                    e.preventDefault(), t(e)
                  }, c.onabort = function(e) {
                    t(e)
                  }
                })
              }, this.updateAndDelete = function(t, n, s) {
                if (r) throw "Database has been closed";
                var i = e.transaction(t, m),
                  o = i.objectStore(t),
                  a = o.keyPath;
                return new Promise(function(e, t) {
                  n.forEach(function(e) {
                    if (e.item && e.key) {
                      var t = e.key;
                      e = e.item, o.put(e, t)
                    } else o.put(e)
                  }), s.forEach(function(e) {
                    o.delete(e[a])
                  }), i.oncomplete = function() {
                    e([n, s])
                  }, i.onerror = function(e) {
                    t(e)
                  }
                })
              }, this.update = function(t) {
                if (r) throw "Database has been closed";
                for (var s, i = [], o = 1; o < arguments.length; o++) s = arguments[o], Array.isArray(s) ? i =
                  i.concat(s) : i.push(s);
                var a = e.transaction(t, m),
                  c = a.objectStore(t);
                c.keyPath;
                return new Promise(function(e, t) {
                  i.forEach(function(e) {
                    var t;
                    if (e.item && e.key) {
                      var n = e.key;
                      e = e.item, t = c.put(e, n)
                    } else t = c.put(e);
                    t.onsuccess = function(e) {}, t.onerror = function(e) {}
                  }), a.oncomplete = function() {
                    e(i, n)
                  }, a.onerror = function(e) {
                    t(e)
                  }, a.onabort = function(e) {
                    t(e)
                  }
                })
              }, this.remove = function(t, n) {
                if (r) throw "Database has been closed";
                var s = e.transaction(t, m),
                  i = s.objectStore(t);
                return new Promise(function(e, t) {
                  Array.isArray(n) || (n = [n]), n.forEach(function(e) {
                    i.delete(e)
                  }), s.oncomplete = function() {
                    e(n)
                  }, s.onerror = function(e) {
                    t(e)
                  }, s.onabort = function(e) {
                    t(e)
                  }
                })
              }, this.clear = function(t) {
                if (r) throw "Database has been closed";
                var n = e.transaction(t, m);
                n.objectStore(t).clear();
                return new Promise(function(e, t) {
                  n.oncomplete = function() {
                    e()
                  }, n.onerror = function(e) {
                    t(e)
                  }
                })
              }, this.close = function() {
                r || (e.close(), r = !0, delete T[t])
              }, this.get = function(t, n) {
                if (r) throw "Database has been closed";
                var s = e.transaction(t),
                  i = s.objectStore(t).get(n);
                return new Promise(function(e, t) {
                  i.onsuccess = function(t) {
                    e(t.target.result)
                  }, s.onerror = function(e) {
                    t(e)
                  }
                })
              }, this.query = function(t, n) {
                if (r) throw "Database has been closed";
                return new b(t, e, n)
              }, this.count = function(t, n) {
                if (r) throw "Database has been closed";
                e.transaction(t).objectStore(t)
              };
              for (var s = 0, i = e.objectStoreNames.length; s < i; s++) ! function(e) {
                for (var t in n[e] = {}, n) d.call(n, t) && "close" !== t && (n[e][t] = function(t) {
                  return function() {
                    var r = [e].concat([].slice.call(arguments, 0));
                    return n[t].apply(n, r)
                  }
                }(t))
              }(e.objectStoreNames[s])
            },
            b = function(e, t, n) {
              var r = this,
                s = !1,
                i = !1,
                o = function(r, o, c, d, p, f, g) {
                  return new Promise(function(y, v) {
                    var b = s || i ? m : l,
                      M = t.transaction(e, b),
                      T = M.objectStore(e),
                      S = n ? T.index(n) : T,
                      k = r ? u[r].apply(null, o) : null,
                      C = [],
                      P = [k],
                      I = 0;
                    p = p || null, f = f || [], "count" !== c && P.push(d || "next");
                    var O = !!s && Object.keys(s);
                    S[c].apply(S, P).onsuccess = function(e) {
                      var t = e.target.result;
                      if ((void 0 === t ? "undefined" : (0, a.default)(t)) === (0, a.default)(0)) C = t;
                      else if (t)
                        if (null !== p && p[0] > I) I = p[0], t.advance(p[0]);
                        else if (null !== p && I >= p[0] + p[1]);
                      else {
                        var n = !0,
                          r = "value" in t ? t.value : t.key;
                        f.forEach(function(e) {
                          e && e.length && (2 === e.length ? n = n && r[e[0]] === e[1] : h(e[0]) && (
                            n = n && e[0].apply(void 0, [r])))
                        }), n && (I++, C.push(g(r)), i ? t.delete() : s && (r = function(e) {
                          for (var t = 0; t < O.length; t++) {
                            var n = O[t],
                              r = s[n];
                            r instanceof Function && (r = r(e)), e[n] = r
                          }
                          return e
                        }(r), t.update(r))), t.continue()
                      }
                    }, M.oncomplete = function() {
                      y(C)
                    }, M.onerror = function(e) {
                      v(e)
                    }, M.onabort = function(e) {
                      v(e)
                    }
                  })
                },
                c = function(e, t) {
                  var n = "next",
                    r = "openCursor",
                    a = [],
                    c = null,
                    u = f,
                    l = !1,
                    m = function() {
                      return o(e, t, r, l ? n + "unique" : n, c, a, u)
                    },
                    d = function() {
                      return n = null, r = "count", {
                        execute: m
                      }
                    },
                    p = function e() {
                      var t;
                      return t = arguments[0], 1 == (c = "array" === g(t) ? arguments[0] : Array.prototype.slice
                          .call(arguments, 0, 2)).length && c.unshift(0),
                        function(e) {
                          return "number" === g(e)
                        }(c[1]) || (c = null), {
                          execute: m,
                          count: d,
                          keys: v,
                          filter: b,
                          asc: M,
                          desc: T,
                          distinct: S,
                          modify: k,
                          limit: e,
                          map: C,
                          remove: P
                        }
                    },
                    v = function e(t) {
                      return (t = !!y(t) || !!t) && (r = "openKeyCursor"), {
                        execute: m,
                        keys: e,
                        filter: b,
                        asc: M,
                        desc: T,
                        distinct: S,
                        modify: k,
                        limit: p,
                        map: C,
                        remove: P
                      }
                    },
                    b = function e() {
                      return a.push(Array.prototype.slice.call(arguments, 0, 2)), {
                        execute: m,
                        count: d,
                        keys: v,
                        filter: e,
                        asc: M,
                        desc: T,
                        distinct: S,
                        modify: k,
                        limit: p,
                        map: C,
                        remove: P
                      }
                    },
                    M = function e(t) {
                      return t = !!y(t) || !!t, n = t ? "next" : "prev", {
                        execute: m,
                        count: d,
                        keys: v,
                        filter: b,
                        asc: e,
                        desc: T,
                        distinct: S,
                        modify: k,
                        limit: p,
                        map: C,
                        remove: P
                      }
                    },
                    T = function e(t) {
                      return t = !!y(t) || !!t, n = t ? "prev" : "next", {
                        execute: m,
                        count: d,
                        keys: v,
                        filter: b,
                        asc: M,
                        desc: e,
                        distinct: S,
                        modify: k,
                        limit: p,
                        map: C,
                        remove: P
                      }
                    },
                    S = function e(t) {
                      return t = !!y(t) || !!t, l = t, {
                        execute: m,
                        count: d,
                        keys: v,
                        filter: b,
                        asc: M,
                        desc: T,
                        distinct: e,
                        modify: k,
                        limit: p,
                        map: C,
                        remove: P
                      }
                    },
                    k = function e(t) {
                      return s = t, {
                        execute: m,
                        count: d,
                        keys: v,
                        filter: b,
                        asc: M,
                        desc: T,
                        distinct: S,
                        modify: e,
                        limit: p,
                        map: C,
                        remove: P
                      }
                    },
                    C = function e(t) {
                      return h(t) && (u = t), {
                        execute: m,
                        count: d,
                        keys: v,
                        filter: b,
                        asc: M,
                        desc: T,
                        distinct: S,
                        modify: k,
                        limit: p,
                        map: e,
                        remove: P
                      }
                    },
                    P = function e(t) {
                      return t = !!y(t) || !!t, i = t, {
                        execute: m,
                        count: d,
                        keys: v,
                        filter: b,
                        asc: M,
                        desc: T,
                        distinct: S,
                        modify: k,
                        limit: p,
                        map: C,
                        remove: e
                      }
                    };
                  return {
                    execute: m,
                    count: d,
                    keys: v,
                    filter: b,
                    asc: M,
                    desc: T,
                    distinct: S,
                    modify: k,
                    limit: p,
                    map: C,
                    remove: P
                  }
                };
              "only bound upperBound lowerBound".split(" ").forEach(function(e) {
                r[e] = function() {
                  return new c(e, arguments)
                }
              }), this.filter = function() {
                var e = new c(null, null);
                return e.filter.apply(e, arguments)
              }, this.all = function() {
                return this.filter()
              }
            },
            M = function(e, t, n, r) {
              var s = e.target.result,
                i = new v(s, t);
              return T[t] = s, Promise.resolve(i)
            },
            T = {},
            S = {
              version: "0.10.2",
              open: function(e) {
                var t;
                return new Promise(function(n, r) {
                  if (T[e.server]) M({
                    target: {
                      result: T[e.server]
                    }
                  }, e.server, e.version, e.schema).then(n, r);
                  else {
                    try {
                      t = p().open(e.server, e.version)
                    } catch (e) {
                      r(e)
                    }
                    t.onsuccess = function(t) {
                      M(t, e.server, e.version, e.schema).then(n, r)
                    }, t.onupgradeneeded = function(t) {
                      ! function(e, t, n) {
                        for (var r in "function" == typeof t && (t = t()), t) {
                          var s, i = t[r];
                          for (var o in s = !d.call(t, r) || n.objectStoreNames.contains(r) ? e.currentTarget
                              .transaction.objectStore(r) : n.createObjectStore(r, i.key), i.indexes) {
                            var a = i.indexes[o];
                            try {
                              s.index(o)
                            } catch (e) {
                              s.createIndex(o, a.key || o, Object.keys(a).length ? a : {
                                unique: !1
                              })
                            }
                          }
                        }
                      }(t, e.schema, t.target.result)
                    }, t.onerror = function(e) {
                      r(e)
                    }
                  }
                })
              },
              remove: function(e) {
                return new Promise(function(t, n) {
                  if (!e) return t();
                  var r, s;
                  (void 0 === e ? "undefined" : (0, a.default)(e)) === v && (e = e.name), "string" ==
                    typeof e && (r = T[e]), r && "function" == typeof r.close && r.close();
                  try {
                    s = p().deleteDatabase(e)
                  } catch (e) {
                    n(e)
                  }
                  s.onsuccess = function(n) {
                    delete T[e], t(e)
                  }, s.onerror = function(e) {
                    n(e)
                  }, s.onblocked = function(e) {
                    n(e)
                  }
                })
              }
            };
          void 0 !== e && void 0 !== e.exports ? e.exports = S : void 0 === (s = function() {
            return S
          }.call(t, n, t, e)) || (e.exports = s)
        }(window)
      }).call(this, n(31))
    },
    function(e, t, n) {
      "use strict";
      var r = n(22),
        s = n(68),
        i = n(447),
        o = n(446),
        a = n(0),
        c = n(172),
        u = n(26),
        l = u.newSupportDBError,
        m = u.noDBError,
        d = !1;

      function p(e) {
        d = e, c.set("db", e, i)
      }
      if (p(!!a.getGlobal().indexedDB), "IE" === r.name && p(!1), "Microsoft Edge" === r.name && p(!1), "Safari" ===
        r.name) {
        try {
          parseInt(r.version.split(".")[0], 10) < 10 && p(!1)
        } catch (e) {}
        p(!1)
      }

      function f(e) {
        this.concurrency = 0, this.pendingTasks = [], this.queue = Promise.resolve(), this.logger = e.logger
      }
      var g = f.prototype;
      g.reset = a.emptyFunc, d && (g.reset = function(e) {
        this.enable = !1 !== e
      }), g.addTask = function(e) {
        var t = this;
        return new Promise(function(n, r) {
          function s(e) {
            t.concurrency--;
            var n = t.pendingTasks.shift();
            n && t.addTask(n), e()
          }
          if (t.concurrency < 100) return t.concurrency++, e().then(function(t) {
            s(function() {
              n(t), e.resolve && e.resolve(t)
            })
          }, function(t) {
            s(function() {
              var n = {
                event: (t = t || {}).event || t,
                callFunc: t.callFunc || "db::addTask"
              };
              r(n), e.reject && e.reject(n)
            })
          });
          e.resolve || (e.resolve = n, e.reject = r), t.pendingTasks.push(e)
        })
      }, g.init = function(e) {
        var t = this;
        return t.addTask(function() {
          return t.enable ? t.server ? Promise.resolve() : (t.name = "nim-" + e, i.open({
            server: t.name,
            version: o.version,
            schema: o.schema
          }).then(function(e) {
            t.logger.log("db::init: " + t.name), t.server = e
          }, function(e) {
            throw p(!1), t.server = null, t.name = null, e
          })) : Promise.reject(l({
            callFunc: "db::init"
          }))
        })
      }, g.destroy = function() {
        var e = this;
        return e.addTask(function() {
          return e.enable ? e.server ? i.remove(e.name).then(function() {
            e.logger.log("db::destroy: " + e.name), e.server = null, e.name = null
          }) : Promise.resolve() : Promise.reject(l({
            callFunc: "db::destroy"
          }))
        })
      }, g.clear = function() {
        var e = this;
        return e.addTask(function() {
          return e.enable ? e.server ? e.server.clear("timetag").then(function() {
            var t = [].slice.call(e.server.getIndexedDB().objectStoreNames),
              n = [];
            if (t.forEach(function(t) {
                n.push(e.server.clear(t))
              }), n.length) return Promise.all(n).then(function() {
              e.logger.log("db::clear: " + e.name)
            }).catch(function(t) {
              return e.logger.error("db::clear: ", t), Promise.reject(t)
            })
          }) : Promise.resolve() : Promise.reject(l({
            callFunc: "db::clear"
          }))
        })
      }, g.close = function() {
        this.server && (this.server.close(), this.server = null, this.name = null)
      }, g.remove = function(e, t) {
        var n = this;
        return n.addTask(function() {
          return n.checkDB(), a.isArray(t) || (t = [t]), n.server.remove(e, t).then(function() {
            n.logger.log("db::delete: " + e + " " + (1 === t.length ? t[0] : t))
          })
        })
      }, g.put = function(e, t) {
        var n = this;
        return n.addTask(function() {
          return n.checkDB(), a.isArray(t) || (t = [t]), n.server.update(e, t).then(function(t) {
            var r = ["put", e],
              i = o.keyPath(e),
              a = [];
            return i && (t.forEach(function(e) {
              a.push(s(e, i))
            }), r.push(1 === a.length ? a[0] : a)), r.push(1 === t.length ? t[0] : t), r.unshift(
              "db::put:"), n.logger.log.apply(n.logger.log, r), t
          })
        })
      }, g.get = function(e, t) {
        var n = this;
        return n.addTask(function() {
          return n.checkDB(), n.server.get(e, t)
        })
      }, g.modifyOrPut = function(e) {
        var t = this,
          n = e.table,
          r = a.copy(e.obj),
          s = e.key,
          i = e.modifyObjWhenPut,
          o = a.copy(r);
        return delete o[s], t.getOne(n, null, r[s], {
          modifyObj: o
        }).then(function(e) {
          return e ? (t.logger.log("db::modifyOrPut: update table " + n, r), e) : (r = a.merge(r, i), t.put(
            n, r).then(function(e) {
            return e[0]
          }))
        })
      }, g.updateAndDelete = function(e, t, n) {
        var r = this;
        return r.addTask(function() {
          return r.checkDB(), r.server.updateAndDelete(e, t, n)
        })
      }, g.getAll = function(e, t) {
        var n = this;
        return n.addTask(function() {
          return n.checkDB(), (t = t || {}).keys = !0 === t.keys, t.desc = !0 === t.desc, t.distinct = !0 ===
            t.distinct, n.server.query(e, t.index).filter(t.filter).keys(t.keys).desc(t.desc).limit(t.limit)
            .distinct(t.distinct).map(t.mapper).modify(t.modifyObj).execute()
        })
      }, g.getOnly = function(e, t, n, r) {
        var s = this;
        return s.addTask(function() {
          return s.checkDB(), (r = r || {}).keys = !0 === r.keys, r.desc = !0 === r.desc, r.distinct = !0 ===
            r.distinct, r.remove = !0 === r.remove, s.server.query(e, t).only(n).filter(r.filter).keys(r.keys)
            .desc(r.desc).limit(r.limit).distinct(r.distinct).map(r.mapper).modify(r.modifyObj).remove(r.remove)
            .execute()
        })
      }, g.getOne = function() {
        return this.getOnly.apply(this, arguments).then(function(e) {
          return e[0]
        })
      }, g.clearTable = function(e) {
        var t = this;
        return t.addTask(function() {
          return t.checkDB(), t.server.clear(e)
        })
      }, g.checkDB = function() {
        if (!this.enable) throw l({
          callFunc: "db::checkDB"
        });
        if (!this.server) throw m({
          callFunc: "db::checkDB"
        })
      }, e.exports = f
    },
    function(e, t, n) {
      "use strict";
      n(140);
      var r = n(32);
      n(168)(r), e.exports = r
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    function(e, t, n) {
      "use strict";
      n(140);
      var r = {
        NIM: n(449),
        Chatroom: n(383)
      };
      n(168)(r), e.exports = r
    }
  ])
});
