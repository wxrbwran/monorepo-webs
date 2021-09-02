!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.Netcall = t())
    : (e.Netcall = t());
})(window, function () {
  return (function (e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var i = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: r });
      }),
      (n.r = function (e) {
        Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 704))
    );
  })([
    function (e, t, n) {
      'use strict';
      var r,
        i = n(9),
        o = (r = i) && r.__esModule ? r : { default: r };
      var a = n(92),
        s = n(86);
      n(122);
      var c,
        u,
        d = n(17),
        l = d.getGlobal(),
        f = /\s+/;
      (d.deduplicate = function (e) {
        var t = [];
        return (
          e.forEach(function (e) {
            -1 === t.indexOf(e) && t.push(e);
          }),
          t
        );
      }),
        (d.capFirstLetter = function (e) {
          return e ? (e = '' + e).slice(0, 1).toUpperCase() + e.slice(1) : '';
        }),
        (d.guid =
          ((c = function () {
            return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
          }),
          function () {
            return c() + c() + c() + c() + c() + c() + c() + c();
          })),
        (d.extend = function (e, t, n) {
          for (var r in t) (void 0 !== e[r] && !0 !== n) || (e[r] = t[r]);
        }),
        (d.filterObj = function (e, t) {
          var n = {};
          return (
            d.isString(t) && (t = t.split(f)),
            t.forEach(function (t) {
              e.hasOwnProperty(t) && (n[t] = e[t]);
            }),
            n
          );
        }),
        (d.copy = function (e, t) {
          return (
            (t = t || {}),
            e
              ? (Object.keys(e).forEach(function (n) {
                  d.exist(e[n]) && (t[n] = e[n]);
                }),
                t)
              : t
          );
        }),
        (d.copyWithNull = function (e, t) {
          return (
            (t = t || {}),
            e
              ? (Object.keys(e).forEach(function (n) {
                  (d.exist(e[n]) || d.isnull(e[n])) && (t[n] = e[n]);
                }),
                t)
              : t
          );
        }),
        (d.findObjIndexInArray = function (e, t) {
          e = e || [];
          var n = t.keyPath || 'id',
            r = -1;
          return (
            e.some(function (e, i) {
              if (s(e, n) === t.value) return (r = i), !0;
            }),
            r
          );
        }),
        (d.findObjInArray = function (e, t) {
          var n = d.findObjIndexInArray(e, t);
          return -1 === n ? null : e[n];
        }),
        (d.mergeObjArray = function () {
          var e = [],
            t = [].slice.call(arguments, 0, -1),
            n = arguments[arguments.length - 1];
          d.isArray(n) && (t.push(n), (n = {}));
          var r,
            i = (n.keyPath = n.keyPath || 'id');
          for (n.sortPath = n.sortPath || i; !e.length && t.length; )
            e = (e = t.shift() || []).slice(0);
          return (
            t.forEach(function (t) {
              t &&
                t.forEach(function (t) {
                  -1 !== (r = d.findObjIndexInArray(e, { keyPath: i, value: s(t, i) }))
                    ? (e[r] = d.merge({}, e[r], t))
                    : e.push(t);
                });
            }),
            n.notSort || (e = d.sortObjArray(e, n)),
            e
          );
        }),
        (d.cutObjArray = function (e) {
          var t = e.slice(0),
            n = arguments.length,
            r = [].slice.call(arguments, 1, n - 1),
            i = arguments[n - 1];
          d.isObject(i) || (r.push(i), (i = {}));
          var o,
            a = (i.keyPath = i.keyPath || 'id');
          return (
            r.forEach(function (e) {
              d.isArray(e) || (e = [e]),
                e.forEach(function (e) {
                  e &&
                    ((i.value = s(e, a)),
                    -1 !== (o = d.findObjIndexInArray(t, i)) && t.splice(o, 1));
                });
            }),
            t
          );
        }),
        (d.sortObjArray = function (e, t) {
          var n = (t = t || {}).sortPath || 'id';
          a.insensitive = !!t.insensitive;
          var r,
            i,
            o,
            c = !!t.desc;
          return (
            (o = d.isFunction(t.compare)
              ? t.compare
              : function (e, t) {
                  return (r = s(e, n)), (i = s(t, n)), c ? a(i, r) : a(r, i);
                }),
            e.sort(o)
          );
        }),
        (d.emptyFunc = function () {}),
        (d.isEmptyFunc = function (e) {
          return e === d.emptyFunc;
        }),
        (d.notEmptyFunc = function (e) {
          return e !== d.emptyFunc;
        }),
        (d.splice = function (e, t, n) {
          return [].splice.call(e, t, n);
        }),
        (d.reshape2d = function (e, t) {
          if (Array.isArray(e)) {
            d.verifyParamType('type', t, 'number', 'util::reshape2d');
            var n = e.length;
            if (n <= t) return [e];
            for (var r = Math.ceil(n / t), i = [], o = 0; o < r; o++)
              i.push(e.slice(o * t, (o + 1) * t));
            return i;
          }
          return e;
        }),
        (d.flatten2d = function (e) {
          if (Array.isArray(e)) {
            var t = [];
            return (
              e.forEach(function (e) {
                t = t.concat(e);
              }),
              t
            );
          }
          return e;
        }),
        (d.dropArrayDuplicates = function (e) {
          if (Array.isArray(e)) {
            for (var t = {}, n = []; e.length > 0; ) {
              t[e.shift()] = !0;
            }
            for (var r in t) !0 === t[r] && n.push(r);
            return n;
          }
          return e;
        }),
        (d.onError = function (e) {
          throw new (function (e) {
            'object' === (void 0 === e ? 'undefined' : (0, o.default)(e))
              ? ((this.callFunc = e.callFunc || null), (this.message = e.message || 'UNKNOW ERROR'))
              : (this.message = e),
              (this.time = new Date()),
              (this.timetag = +this.time);
          })(e);
        }),
        (d.verifyParamPresent = function (e, t, n, r) {
          n = n || '';
          var i = !1;
          switch (d.typeOf(t)) {
            case 'undefined':
            case 'null':
              i = !0;
              break;
            case 'string':
              '' === t && (i = !0);
              break;
            case 'StrStrMap':
            case 'object':
              Object.keys(t).length || (i = !0);
              break;
            case 'array':
              t.length
                ? t.some(function (e) {
                    if (d.notexist(e)) return (i = !0), !0;
                  })
                : (i = !0);
          }
          i && d.onParamAbsent(n + e, r);
        }),
        (d.onParamAbsent = function (e, t) {
          d.onParamError(
            '缺少参数 ' +
              e +
              ', 请确保参数不是 空字符串、空对象、空数组、null或undefined, 或数组的内容不是 null/undefined',
            t,
          );
        }),
        (d.verifyParamAbsent = function (e, t, n, r) {
          (n = n || ''), void 0 !== t && d.onParamPresent(n + e, r);
        }),
        (d.onParamPresent = function (e, t) {
          d.onParamError('多余的参数 ' + e, t);
        }),
        (d.verifyParamType = function (e, t, n, r) {
          var i = d.typeOf(t).toLowerCase();
          d.isArray(n) || (n = [n]);
          var o = !0;
          switch (
            (-1 ===
              (n = n.map(function (e) {
                return e.toLowerCase();
              })).indexOf(i) && (o = !1),
            i)
          ) {
            case 'number':
              isNaN(t) && (o = !1);
              break;
            case 'string':
              'numeric or numeric string' === n.join('') && (o = !!/^[0-9]+$/.test(t));
          }
          o || d.onParamInvalidType(e, n, '', r);
        }),
        (d.onParamInvalidType = function (e, t, n, r) {
          (n = n || ''),
            (t = d.isArray(t)
              ? (t = t.map(function (e) {
                  return '"' + e + '"';
                })).join(', ')
              : '"' + t + '"'),
            d.onParamError('参数"' + n + e + '"类型错误, 合法的类型包括: [' + t + ']', r);
        }),
        (d.verifyParamValid = function (e, t, n, r) {
          d.isArray(n) || (n = [n]), -1 === n.indexOf(t) && d.onParamInvalidValue(e, n, r);
        }),
        (d.onParamInvalidValue = function (e, t, n) {
          d.isArray(t) || (t = [t]),
            (t = t.map(function (e) {
              return '"' + e + '"';
            })),
            d.isArray(t) && (t = t.join(', ')),
            d.onParamError('参数 ' + e + '值错误, 合法的值包括: [' + JSON.stringify(t) + ']', n);
        }),
        (d.verifyParamMin = function (e, t, n, r) {
          t < n && d.onParamError('参数' + e + '的值不能小于' + n, r);
        }),
        (d.verifyParamMax = function (e, t, n, r) {
          t > n && d.onParamError('参数' + e + '的值不能大于' + n, r);
        }),
        (d.verifyArrayMax = function (e, t, n, r) {
          t.length > n && d.onParamError('参数' + e + '的长度不能大于' + n, r);
        }),
        (d.verifyEmail =
          ((u = /^\S+@\S+$/),
          function (e, t, n) {
            u.test(t) ||
              d.onParamError(
                '参数' + e + '邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符',
                n,
              );
          })),
        (d.verifyTel = (function () {
          var e = /^[+\-()\d]+$/;
          return function (t, n, r) {
            e.test(n) ||
              d.onParamError('参数' + t + '电话号码格式错误, 合法字符包括+、-、英文括号和数字', r);
          };
        })()),
        (d.verifyBirth = (function () {
          var e = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
          return function (t, n, r) {
            e.test(n) || d.onParamError('参数' + t + '生日格式错误, 合法为"yyyy-MM-dd"', r);
          };
        })()),
        (d.onParamError = function (e, t) {
          d.onError({ message: e, callFunc: t });
        }),
        (d.verifyOptions = function (e, t, n, r, i) {
          if (((e = e || {}), t && (d.isString(t) && (t = t.split(f)), d.isArray(t)))) {
            'boolean' != typeof n && ((i = n || null), (n = !0), (r = ''));
            var o = n ? d.verifyParamPresent : d.verifyParamAbsent;
            t.forEach(function (t) {
              o.call(d, t, e[t], r, i);
            });
          }
          return e;
        }),
        (d.verifyParamAtLeastPresentOne = function (e, t, n) {
          t &&
            (d.isString(t) && (t = t.split(f)),
            d.isArray(t) &&
              (t.some(function (t) {
                return d.exist(e[t]);
              }) ||
                d.onParamError('以下参数[' + t.join(', ') + ']至少需要传入一个', n)));
        }),
        (d.verifyParamPresentJustOne = function (e, t, n) {
          t &&
            (d.isString(t) && (t = t.split(f)),
            d.isArray(t) &&
              1 !==
                t.reduce(function (t, n) {
                  return d.exist(e[n]) && t++, t;
                }, 0) &&
              d.onParamError('以下参数[' + t.join(', ') + ']必须且只能传入一个', n));
        }),
        (d.verifyBooleanWithDefault = function (e, t, n, r, i) {
          d.undef(n) && (n = !0),
            f.test(t) && (t = t.split(f)),
            d.isArray(t)
              ? t.forEach(function (t) {
                  d.verifyBooleanWithDefault(e, t, n, r, i);
                })
              : void 0 === e[t]
              ? (e[t] = n)
              : d.isBoolean(e[t]) || d.onParamInvalidType(t, 'boolean', r, i);
        }),
        (d.verifyFileInput = function (e, t) {
          return (
            d.verifyParamPresent('fileInput', e, '', t),
            d.isString(e) &&
              ((e = 'undefined' == typeof document ? void 0 : document.getElementById(e)) ||
                d.onParamError('找不到要上传的文件对应的input, 请检查fileInput id ' + e, t)),
            (e.tagName && 'input' === e.tagName.toLowerCase() && 'file' === e.type.toLowerCase()) ||
              d.onParamError(
                '请提供正确的 fileInput, 必须为 file 类型的 input 节点 tagname:' +
                  e.tagName +
                  ', filetype:' +
                  e.type,
                t,
              ),
            e
          );
        }),
        (d.verifyFileType = function (e, t) {
          d.verifyParamValid('type', e, d.validFileTypes, t);
        }),
        (d.verifyCallback = function (e, t, n) {
          f.test(t) && (t = t.split(f)),
            d.isArray(t)
              ? t.forEach(function (t) {
                  d.verifyCallback(e, t, n);
                })
              : e[t]
              ? d.isFunction(e[t]) || d.onParamInvalidType(t, 'function', '', n)
              : (e[t] = d.emptyFunc);
        }),
        (d.verifyFileUploadCallback = function (e, t) {
          d.verifyCallback(e, 'uploadprogress uploaddone uploaderror uploadcancel', t);
        }),
        (d.validFileTypes = ['image', 'audio', 'video', 'file']),
        (d.validFileExts = {
          image: ['bmp', 'gif', 'jpg', 'jpeg', 'jng', 'png', 'webp'],
          audio: ['mp3', 'wav', 'aac', 'wma', 'wmv', 'amr', 'mp2', 'flac', 'vorbis', 'ac3'],
          video: ['mp4', 'rm', 'rmvb', 'wmv', 'avi', 'mpg', 'mpeg', 'mov'],
        }),
        (d.filterFiles = function (e, t) {
          var n,
            r,
            i = 'file' === (t = t.toLowerCase()),
            o = [];
          return (
            [].forEach.call(e, function (e) {
              if (i) o.push(e);
              else if (
                ((n = e.name.slice(e.name.lastIndexOf('.') + 1)),
                (r = e.type.split('/'))[0] && r[1])
              ) {
                (r[0].toLowerCase() === t || -1 !== d.validFileExts[t].indexOf(n)) && o.push(e);
              }
            }),
            o
          );
        });
      var p,
        h,
        m = (d.supportFormData = d.notundef(l.FormData));
      (d.getFileName = function (e) {
        return (
          (e = d.verifyFileInput(e)),
          m ? e.files[0].name : e.value.slice(e.value.lastIndexOf('\\') + 1)
        );
      }),
        (d.getFileInfo =
          ((p = { ppt: 1, pptx: 2, pdf: 3 }),
          function (e) {
            var t = {};
            if (!(e = d.verifyFileInput(e)).files) return t;
            var n = e.files[0];
            return (
              m &&
                ((t.name = n.name),
                (t.size = n.size),
                (t.type = n.name.match(/\.(\w+)$/)),
                (t.type = t.type && t.type[1].toLowerCase()),
                (t.transcodeType = p[t.type] || 0)),
              t
            );
          })),
        (d.sizeText =
          ((h = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'BB']),
          function (e) {
            var t,
              n = 0;
            do {
              (t = (e = Math.floor(100 * e) / 100) + h[n]), (e /= 1024), n++;
            } while (e > 1);
            return t;
          })),
        (d.promises2cmds = function (e) {
          return e.map(function (e) {
            return e.cmd;
          });
        }),
        (d.objs2accounts = function (e) {
          return e.map(function (e) {
            return e.account;
          });
        }),
        (d.teams2ids = function (e) {
          return e.map(function (e) {
            return e.teamId;
          });
        }),
        (d.objs2ids = function (e) {
          return e.map(function (e) {
            return e.id;
          });
        }),
        (d.getMaxUpdateTime = function (e) {
          var t = e.map(function (e) {
            return +e.updateTime;
          });
          return Math.max.apply(Math, t);
        }),
        (d.genCheckUniqueFunc = function (e, t) {
          return (
            (e = e || 'id'),
            (t = t || 1e3),
            function (t) {
              (this.uniqueSet = this.uniqueSet || {}),
                (this.uniqueSet[e] = this.uniqueSet[e] || {});
              var n = this.uniqueSet[e],
                r = t[e];
              return !n[r] && ((n[r] = !0), !0);
            }
          );
        }),
        (d.fillPropertyWithDefault = function (e, t, n) {
          return !!d.undef(e[t]) && ((e[t] = n), !0);
        }),
        (e.exports = d);
    },
    function (e, t, n) {
      'use strict';
      (t.__esModule = !0),
        (t.default = function (e, t) {
          if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
        });
    },
    function (e, t, n) {
      'use strict';
      t.__esModule = !0;
      var r,
        i = n(156),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.default = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              (0, o.default)(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })();
    },
    function (e, t, n) {
      'use strict';
      t.__esModule = !0;
      var r = a(n(229)),
        i = a(n(225)),
        o = a(n(9));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = function (e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              (void 0 === t ? 'undefined' : (0, o.default)(t)),
          );
        (e.prototype = (0, i.default)(t && t.prototype, {
          constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
        })),
          t && (r.default ? (0, r.default)(e, t) : (e.__proto__ = t));
      };
    },
    function (e, t, n) {
      'use strict';
      t.__esModule = !0;
      var r,
        i = n(9),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.default = function (e, t) {
        if (!e)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t ||
          ('object' !== (void 0 === t ? 'undefined' : (0, o.default)(t)) && 'function' != typeof t)
          ? e
          : t;
      };
    },
    function (e, t, n) {
      'use strict';
      var r,
        i = n(9),
        o = (r = i) && r.__esModule ? r : { default: r };
      n(0);
      var a =
          'object' ===
            ('undefined' == typeof localStorage ? 'undefined' : (0, o.default)(localStorage)) &&
          'function' == typeof localStorage.setItem &&
          'function' == typeof localStorage.getItem,
        s = {
          nodeEnv: 'production',
          msgStatEnv: 'online',
          info: {
            hash: '22910da3c3384f2589f2b5f182e36c7c4febc98d',
            shortHash: '22910da3c',
            version: '8.1.0',
            sdkVersion: '150',
            nrtcVersion: '5.1.0',
            nrtcSdkVersion: '1',
            protocolVersion: 1,
          },
          agentVersion: '3.0.1',
          lbsUrl: 'https://lbs.netease.im/lbs/webconf.jsp',
          roomserver: 'roomserver.netease.im',
          connectTimeout: 8e3,
          xhrTimeout: 8e3,
          socketTimeout: 8e3,
          reconnectionDelay: 1600,
          reconnectionDelayMax: 8e3,
          reconnectionJitter: 0.01,
          reconnectiontimer: null,
          heartbeatInterval: 6e4,
          cmdTimeout: 8e3,
          defaultReportUrl: 'https://dr.netease.im/1.gif',
          isWeixinApp: !1,
          isNodejs: !1,
          isRN: !1,
          ipVersion: 0,
          PUSHTOKEN: '',
          PUSHCONFIG: {},
          CLIENTTYPE: 16,
          PushPermissionAsked: !1,
          iosPushConfig: null,
          androidPushConfig: null,
          netDetectAddr: 'https://roomserver-dev.netease.im/v1/sdk/detect/local',
          optionDefaultLinkUrl: '',
          defaultLinkUrl: 'weblink.netease.im',
          ipv6DefaultLinkUrl: 'weblink.netease.im',
          optionIpv6DefaultLinkUrl: '',
          wxDefaultLinkUrl: 'wlnimsc0.netease.im',
          serverNosConfig: a
            ? {
                cdnDomain: localStorage.getItem('nim_cdn_domain') || '',
                objectPrefix: localStorage.getItem('nim_object_prefix') || '',
              }
            : {},
          hasLocalStorage: a,
          getDefaultLinkUrl: function (e) {
            var t, n;
            1 === s.ipVersion
              ? ((t = s.optionIpv6DefaultLinkUrl), (n = s.ipv6DefaultLinkUrl))
              : ((t = s.optionDefaultLinkUrl), (n = s.defaultLinkUrl));
            var r = t || (s.isWeixinApp ? s.wxDefaultLinkUrl : n);
            if (!r) return !1;
            var i = e ? 'https' : 'http',
              o = e ? '443' : '80',
              a = r;
            return (
              -1 === r.indexOf('http') && (a = i + '://' + a),
              -1 === r.indexOf(':') && (a = a + ':' + o),
              a
            );
          },
        };
      (s.weixinNetcall = s.nrtcNetcall = {
        checkSumUrl: 'https://nrtc.netease.im/demo/getChecksum.action',
        getChannelInfoUrl: 'https://nrtc.netease.im/nrtc/getChannelInfos.action',
      }),
        (s.ipProbeAddr = {
          ipv4: 'https://detect4.netease.im/test/',
          ipv6: 'https://detect6.netease.im/test/',
        }),
        (s.nrtcWebRTC2 = { checkSumUrl: '', getChannelInfoUrl: '' }),
        (s.formatSocketUrl = function (e) {
          var t = e.url,
            n = e.secure ? 'https' : 'http';
          return -1 === t.indexOf('http') ? n + '://' + t : t;
        }),
        (s.uploadUrl = 'https://nos.netease.com'),
        (s.chunkUploadUrl = 'https://wanproxy-web.127.net'),
        (s.commonMaxSize = 104857600),
        (s.chunkSize = 4194304),
        (s.chunkMaxSize = 4194304e4),
        (s.replaceUrl = 'https://{bucket}-nosdn.netease.im/{object}'),
        (s.downloadHost = 'nos.netease.com'),
        (s.downloadHostList = ['nos.netease.com']),
        (s.nosCdnEnable = !0),
        (s.downloadUrl = 'https://{bucket}-nosdn.netease.im/{object}'),
        (s.httpsEnabled = !1),
        (s.threshold = 0),
        (s.lbsUrls = [
          'http://wanproxy.127.net/lbs',
          'http://wanproxy-bj.127.net/lbs',
          'http://wanproxy-hz.127.net/lbs',
          'http://wanproxy-oversea.127.net/lbs',
        ]),
        (s.genUploadUrl = function (e) {
          return s.uploadUrl + '/' + e;
        }),
        (s.genChunkUploadUrl = function (e) {
          return s.chunkUploadUrl ? s.chunkUploadUrl + '/' + e.bucket + '/' + e.objectName : '';
        }),
        (s.genDownloadUrl = function (e, t, n) {
          var r = e.bucket,
            i = (e.tag, e.expireSec),
            o = +new Date(),
            a = i ? '&survivalTime=' + i : '';
          if (n) return 'https://' + n + '/' + t + '?createTime=' + o + a;
          var c = s.replaceUrl + '?createTime=' + o + a;
          return (c = s.genNosProtocolUrl(c)).replace('{bucket}', r).replace('{object}', t);
        }),
        (s.genFileUrl = function (e) {
          var t = e.bucket,
            n = e.objectName;
          return s.genNosProtocolUrl(s.replaceUrl).replace('{bucket}', t).replace('{object}', n);
        }),
        (s.genNosProtocolUrl = function (e) {
          return (
            /^http/.test(e)
              ? s.httpsEnabled && 0 !== e.indexOf('https://') && (e = e.replace('http', 'https'))
              : (e = s.httpsEnabled ? 'https://' + e : 'http://' + e),
            e
          );
        }),
        (e.exports = s);
    },
    function (e, t) {
      var n = (e.exports = { version: '2.5.5' });
      'number' == typeof __e && (__e = n);
    },
    function (e, t, n) {
      var r = n(57)('wks'),
        i = n(40),
        o = n(8).Symbol,
        a = 'function' == typeof o;
      (e.exports = function (e) {
        return r[e] || (r[e] = (a && o[e]) || (a ? o : i)('Symbol.' + e));
      }).store = r;
    },
    function (e, t) {
      var n = (e.exports =
        'undefined' != typeof window && window.Math == Math
          ? window
          : 'undefined' != typeof self && self.Math == Math
          ? self
          : Function('return this')());
      'number' == typeof __g && (__g = n);
    },
    function (e, t, n) {
      'use strict';
      t.__esModule = !0;
      var r = a(n(141)),
        i = a(n(131)),
        o =
          'function' == typeof i.default && 'symbol' == typeof r.default
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  'function' == typeof i.default &&
                  e.constructor === i.default &&
                  e !== i.default.prototype
                  ? 'symbol'
                  : typeof e;
              };
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default =
        'function' == typeof i.default && 'symbol' === o(r.default)
          ? function (e) {
              return void 0 === e ? 'undefined' : o(e);
            }
          : function (e) {
              return e &&
                'function' == typeof i.default &&
                e.constructor === i.default &&
                e !== i.default.prototype
                ? 'symbol'
                : void 0 === e
                ? 'undefined'
                : o(e);
            };
    },
    ,
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(318);
      Object.defineProperty(t, 'EVENT_OBJ', {
        enumerable: !0,
        get: function () {
          return r.EVENT_OBJ;
        },
      }),
        Object.defineProperty(t, 'EVENT_CODE', {
          enumerable: !0,
          get: function () {
            return r.EVENT_CODE;
          },
        });
      var i = n(315);
      Object.defineProperty(t, 'PushConfig', {
        enumerable: !0,
        get: function () {
          return i.PushConfig;
        },
      }),
        Object.defineProperty(t, 'SessionConfig', {
          enumerable: !0,
          get: function () {
            return i.SessionConfig;
          },
        }),
        Object.defineProperty(t, 'NetcallOption', {
          enumerable: !0,
          get: function () {
            return i.NetcallOption;
          },
        }),
        Object.defineProperty(t, 'WebRTCOption', {
          enumerable: !0,
          get: function () {
            return i.WebRTCOption;
          },
        }),
        Object.defineProperty(t, 'NRTCOption', {
          enumerable: !0,
          get: function () {
            return i.NRTCOption;
          },
        }),
        Object.defineProperty(t, 'ApiParams', {
          enumerable: !0,
          get: function () {
            return i.ApiParams;
          },
        }),
        Object.defineProperty(t, 'VIDEO_QUALITY', {
          enumerable: !0,
          get: function () {
            return i.VIDEO_QUALITY;
          },
        }),
        Object.defineProperty(t, 'VIDEO_QUALITY_REV', {
          enumerable: !0,
          get: function () {
            return i.VIDEO_QUALITY_REV;
          },
        }),
        Object.defineProperty(t, 'validateVideoQuality', {
          enumerable: !0,
          get: function () {
            return i.validateVideoQuality;
          },
        }),
        Object.defineProperty(t, 'VIDEO_FRAME_RATE', {
          enumerable: !0,
          get: function () {
            return i.VIDEO_FRAME_RATE;
          },
        }),
        Object.defineProperty(t, 'VIDEO_FRAME_RATE_REV', {
          enumerable: !0,
          get: function () {
            return i.VIDEO_FRAME_RATE_REV;
          },
        }),
        Object.defineProperty(t, 'validateVideoFrameRate', {
          enumerable: !0,
          get: function () {
            return i.validateVideoFrameRate;
          },
        }),
        Object.defineProperty(t, 'ENCRYPTION_ALGORITHM_MODE', {
          enumerable: !0,
          get: function () {
            return i.ENCRYPTION_ALGORITHM_MODE;
          },
        }),
        Object.defineProperty(t, 'CONTROL_TYPE', {
          enumerable: !0,
          get: function () {
            return i.CONTROL_TYPE;
          },
        }),
        Object.defineProperty(t, 'CONFIG_MAP', {
          enumerable: !0,
          get: function () {
            return i.CONFIG_MAP;
          },
        }),
        Object.defineProperty(t, 'DECTECT_RESULT_TYPE', {
          enumerable: !0,
          get: function () {
            return i.DECTECT_RESULT_TYPE;
          },
        }),
        Object.defineProperty(t, 'DECTECT_TYPE', {
          enumerable: !0,
          get: function () {
            return i.DECTECT_TYPE;
          },
        }),
        Object.defineProperty(t, 'DEVICE_TYPE', {
          enumerable: !0,
          get: function () {
            return i.DEVICE_TYPE;
          },
        }),
        Object.defineProperty(t, 'DEVICE_TYPE_REV', {
          enumerable: !0,
          get: function () {
            return i.DEVICE_TYPE_REV;
          },
        }),
        Object.defineProperty(t, 'NETCALL_TYPE', {
          enumerable: !0,
          get: function () {
            return i.NETCALL_TYPE;
          },
        }),
        Object.defineProperty(t, 'SCALE_TYPE', {
          enumerable: !0,
          get: function () {
            return i.SCALE_TYPE;
          },
        }),
        Object.defineProperty(t, 'SPLIT_MODE', {
          enumerable: !0,
          get: function () {
            return i.SPLIT_MODE;
          },
        }),
        Object.defineProperty(t, 'MIX_VIDEO_MODE', {
          enumerable: !0,
          get: function () {
            return i.MIX_VIDEO_MODE;
          },
        }),
        Object.defineProperty(t, 'VIDEO_ENCODE_MODE', {
          enumerable: !0,
          get: function () {
            return i.VIDEO_ENCODE_MODE;
          },
        }),
        Object.defineProperty(t, 'ROLE_FOR_MEETING', {
          enumerable: !0,
          get: function () {
            return i.ROLE_FOR_MEETING;
          },
        }),
        Object.defineProperty(t, 'SESSION_MODE', {
          enumerable: !0,
          get: function () {
            return i.SESSION_MODE;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_PUSH_CONFIG', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_PUSH_CONFIG;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_SESSION_CONFIG', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_SESSION_CONFIG;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_NETCALL_OPTION', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_NETCALL_OPTION;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_WEBRTC_OPTION', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_WEBRTC_OPTION;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_NRTC_OPTION', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_NRTC_OPTION;
          },
        }),
        Object.defineProperty(t, 'GATE_WAY_RESPONSE_CODE', {
          enumerable: !0,
          get: function () {
            return i.GATE_WAY_RESPONSE_CODE;
          },
        });
      var o = n(280);
      Object.defineProperty(t, 'CLIENT_JOIN_OF_WEBRTC', {
        enumerable: !0,
        get: function () {
          return o.CLIENT_JOIN_OF_WEBRTC;
        },
      }),
        Object.defineProperty(t, 'CLIENT_LOGIN_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.CLIENT_LOGIN_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_LOGOUT_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.CLIENT_LOGOUT_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_ERROR_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.CLIENT_ERROR_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_DETECT_NETWORK_RESULT_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.CLIENT_DETECT_NETWORK_RESULT_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_UPDATE_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.CLIENT_UPDATE_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'ICE_ANSWER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.ICE_ANSWER_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'ICE_OFFER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.ICE_OFFER_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'KEEP_ALIVE_ACK_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.KEEP_ALIVE_ACK_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'KEEP_ALIVE_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.KEEP_ALIVE_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'LOGIN_ACK_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.LOGIN_ACK_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'LOGOUT_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.LOGOUT_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'SDP_ANSWER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.SDP_ANSWER_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'SDP_OFFER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.SDP_OFFER_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'SDP_UPDATE_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.SDP_UPDATE_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'WEBRTC_GATE_WAY_API', {
          enumerable: !0,
          get: function () {
            return o.WEBRTC_GATE_WAY_API;
          },
        }),
        Object.defineProperty(t, 'WEBRTC2_GATE_WAY_API', {
          enumerable: !0,
          get: function () {
            return o.WEBRTC2_GATE_WAY_API;
          },
        }),
        Object.defineProperty(t, 'CLIENT_LOGIN_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.CLIENT_LOGIN_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'LOGIN_ACK_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.LOGIN_ACK_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'KEEP_ALIVE_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.KEEP_ALIVE_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'KEEP_ALIVE_ACK_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.KEEP_ALIVE_ACK_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'LOGOUT_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.LOGOUT_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_UPDATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_UPDATE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'MEDIA_UPDATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.MEDIA_UPDATE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'SUB_SOURCE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.SUB_SOURCE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'SSRC_UPDATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.SSRC_UPDATE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'MUTE_UPDATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.MUTE_UPDATE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_PUB_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_PUB_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'PUB_ACK_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.PUB_ACK_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_SUB_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_SUB_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'SUB_ACK_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.SUB_ACK_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_ASL_SUB_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_ASL_SUB_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_ASL_SUB_ACK_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_ASL_SUB_ACK_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'CHANNEL_STATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.CHANNEL_STATE_WEBRTC2;
          },
        });
      var a = n(271);
      Object.defineProperty(t, 'CommonErrorCode', {
        enumerable: !0,
        get: function () {
          return a.CommonErrorCode;
        },
      }),
        Object.defineProperty(t, 'RoomServerErrorCode', {
          enumerable: !0,
          get: function () {
            return a.RoomServerErrorCode;
          },
        }),
        Object.defineProperty(t, 'VideoErrorCode', {
          enumerable: !0,
          get: function () {
            return a.VideoErrorCode;
          },
        }),
        Object.defineProperty(t, 'AudioErrorCode', {
          enumerable: !0,
          get: function () {
            return a.AudioErrorCode;
          },
        }),
        Object.defineProperty(t, 'VideoRecordErrorCode', {
          enumerable: !0,
          get: function () {
            return a.VideoRecordErrorCode;
          },
        }),
        Object.defineProperty(t, 'AudioRecordErrorCode', {
          enumerable: !0,
          get: function () {
            return a.AudioRecordErrorCode;
          },
        }),
        Object.defineProperty(t, 'LiveStatusErrorCode', {
          enumerable: !0,
          get: function () {
            return a.LiveStatusErrorCode;
          },
        }),
        Object.defineProperty(t, 'GateWayErrorCode', {
          enumerable: !0,
          get: function () {
            return a.GateWayErrorCode;
          },
        }),
        Object.defineProperty(t, 'DeviceErrorCode', {
          enumerable: !0,
          get: function () {
            return a.DeviceErrorCode;
          },
        }),
        Object.defineProperty(t, 'Webrtc2ErrorCode', {
          enumerable: !0,
          get: function () {
            return a.Webrtc2ErrorCode;
          },
        });
      var s = n(269);
      Object.defineProperty(t, 'AuidoMixingState', {
        enumerable: !0,
        get: function () {
          return s.AuidoMixingState;
        },
      });
    },
    function (e, t, n) {
      'use strict';
      var r = Object.prototype.hasOwnProperty,
        i = '~';
      function o() {}
      function a(e, t, n) {
        (this.fn = e), (this.context = t), (this.once = n || !1);
      }
      function s() {
        (this._events = new o()), (this._eventsCount = 0);
      }
      Object.create && ((o.prototype = Object.create(null)), new o().__proto__ || (i = !1)),
        (s.prototype.eventNames = function () {
          var e,
            t,
            n = [];
          if (0 === this._eventsCount) return n;
          for (t in (e = this._events)) r.call(e, t) && n.push(i ? t.slice(1) : t);
          return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n;
        }),
        (s.prototype.listeners = function (e, t) {
          var n = i ? i + e : e,
            r = this._events[n];
          if (t) return !!r;
          if (!r) return [];
          if (r.fn) return [r.fn];
          for (var o = 0, a = r.length, s = new Array(a); o < a; o++) s[o] = r[o].fn;
          return s;
        }),
        (s.prototype.emit = function (e, t, n, r, o, a) {
          var s = i ? i + e : e;
          if (!this._events[s]) return !1;
          var c,
            u,
            d = this._events[s],
            l = arguments.length;
          if (d.fn) {
            switch ((d.once && this.removeListener(e, d.fn, void 0, !0), l)) {
              case 1:
                return d.fn.call(d.context), !0;
              case 2:
                return d.fn.call(d.context, t), !0;
              case 3:
                return d.fn.call(d.context, t, n), !0;
              case 4:
                return d.fn.call(d.context, t, n, r), !0;
              case 5:
                return d.fn.call(d.context, t, n, r, o), !0;
              case 6:
                return d.fn.call(d.context, t, n, r, o, a), !0;
            }
            for (u = 1, c = new Array(l - 1); u < l; u++) c[u - 1] = arguments[u];
            d.fn.apply(d.context, c);
          } else {
            var f,
              p = d.length;
            for (u = 0; u < p; u++)
              switch ((d[u].once && this.removeListener(e, d[u].fn, void 0, !0), l)) {
                case 1:
                  d[u].fn.call(d[u].context);
                  break;
                case 2:
                  d[u].fn.call(d[u].context, t);
                  break;
                case 3:
                  d[u].fn.call(d[u].context, t, n);
                  break;
                case 4:
                  d[u].fn.call(d[u].context, t, n, r);
                  break;
                default:
                  if (!c) for (f = 1, c = new Array(l - 1); f < l; f++) c[f - 1] = arguments[f];
                  d[u].fn.apply(d[u].context, c);
              }
          }
          return !0;
        }),
        (s.prototype.on = function (e, t, n) {
          var r = new a(t, n || this),
            o = i ? i + e : e;
          return (
            this._events[o]
              ? this._events[o].fn
                ? (this._events[o] = [this._events[o], r])
                : this._events[o].push(r)
              : ((this._events[o] = r), this._eventsCount++),
            this
          );
        }),
        (s.prototype.once = function (e, t, n) {
          var r = new a(t, n || this, !0),
            o = i ? i + e : e;
          return (
            this._events[o]
              ? this._events[o].fn
                ? (this._events[o] = [this._events[o], r])
                : this._events[o].push(r)
              : ((this._events[o] = r), this._eventsCount++),
            this
          );
        }),
        (s.prototype.removeListener = function (e, t, n, r) {
          var a = i ? i + e : e;
          if (!this._events[a]) return this;
          if (!t)
            return (
              0 == --this._eventsCount ? (this._events = new o()) : delete this._events[a], this
            );
          var s = this._events[a];
          if (s.fn)
            s.fn !== t ||
              (r && !s.once) ||
              (n && s.context !== n) ||
              (0 == --this._eventsCount ? (this._events = new o()) : delete this._events[a]);
          else {
            for (var c = 0, u = [], d = s.length; c < d; c++)
              (s[c].fn !== t || (r && !s[c].once) || (n && s[c].context !== n)) && u.push(s[c]);
            u.length
              ? (this._events[a] = 1 === u.length ? u[0] : u)
              : 0 == --this._eventsCount
              ? (this._events = new o())
              : delete this._events[a];
          }
          return this;
        }),
        (s.prototype.removeAllListeners = function (e) {
          var t;
          return (
            e
              ? ((t = i ? i + e : e),
                this._events[t] &&
                  (0 == --this._eventsCount ? (this._events = new o()) : delete this._events[t]))
              : ((this._events = new o()), (this._eventsCount = 0)),
            this
          );
        }),
        (s.prototype.off = s.prototype.removeListener),
        (s.prototype.addListener = s.prototype.on),
        (s.prototype.setMaxListeners = function () {
          return this;
        }),
        (s.prefixed = i),
        (s.EventEmitter = s),
        (e.exports = s);
    },
    ,
    function (e, t, n) {
      var r = n(23);
      e.exports = function (e) {
        if (!r(e)) throw TypeError(e + ' is not an object!');
        return e;
      };
    },
    function (e, t, n) {
      var r = n(14),
        i = n(77),
        o = n(59),
        a = Object.defineProperty;
      t.f = n(18)
        ? Object.defineProperty
        : function (e, t, n) {
            if ((r(e), (t = o(t, !0)), r(n), i))
              try {
                return a(e, t, n);
              } catch (e) {}
            if ('get' in n || 'set' in n) throw TypeError('Accessors not supported!');
            return 'value' in n && (e[t] = n.value), e;
          };
    },
    function (e, t, n) {
      var r = n(8),
        i = n(6),
        o = n(36),
        a = n(25),
        s = n(22),
        c = function (e, t, n) {
          var u,
            d,
            l,
            f = e & c.F,
            p = e & c.G,
            h = e & c.S,
            m = e & c.P,
            _ = e & c.B,
            v = e & c.W,
            g = p ? i : i[t] || (i[t] = {}),
            y = g.prototype,
            E = p ? r : h ? r[t] : (r[t] || {}).prototype;
          for (u in (p && (n = t), n))
            ((d = !f && E && void 0 !== E[u]) && s(g, u)) ||
              ((l = d ? E[u] : n[u]),
              (g[u] =
                p && 'function' != typeof E[u]
                  ? n[u]
                  : _ && d
                  ? o(l, r)
                  : v && E[u] == l
                  ? (function (e) {
                      var t = function (t, n, r) {
                        if (this instanceof e) {
                          switch (arguments.length) {
                            case 0:
                              return new e();
                            case 1:
                              return new e(t);
                            case 2:
                              return new e(t, n);
                          }
                          return new e(t, n, r);
                        }
                        return e.apply(this, arguments);
                      };
                      return (t.prototype = e.prototype), t;
                    })(l)
                  : m && 'function' == typeof l
                  ? o(Function.call, l)
                  : l),
              m && (((g.virtual || (g.virtual = {}))[u] = l), e & c.R && y && !y[u] && a(y, u, l)));
        };
      (c.F = 1),
        (c.G = 2),
        (c.S = 4),
        (c.P = 8),
        (c.B = 16),
        (c.W = 32),
        (c.U = 64),
        (c.R = 128),
        (e.exports = c);
    },
    function (e, t, n) {
      'use strict';
      (function (e) {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.url2origin = t.uniqueID = t.off = t.removeEventListener = t.on = t.addEventListener = t.format = t.regWhiteSpace = t.regBlank = t.emptyFunc = t.f = t.emptyObj = t.o = void 0);
        var r,
          i = n(9),
          o = (r = i) && r.__esModule ? r : { default: r };
        (t.getGlobal = a),
          (t.detectCSSFeature = function (e) {
            var t = !1,
              n = 'Webkit Moz ms O'.split(' ');
            if ('undefined' == typeof document)
              return void console.log('error:fn:detectCSSFeature document is undefined');
            var r = document.createElement('div'),
              i = null;
            (e = e.toLowerCase()), void 0 !== r.style[e] && (t = !0);
            if (!1 === t) {
              i = e.charAt(0).toUpperCase() + e.substr(1);
              for (var o = 0; o < n.length; o++)
                if (void 0 !== r.style[n[o] + i]) {
                  t = !0;
                  break;
                }
            }
            return t;
          }),
          (t.fix = s),
          (t.getYearStr = c),
          (t.getMonthStr = u),
          (t.getDayStr = d),
          (t.getHourStr = l),
          (t.getMinuteStr = f),
          (t.getSecondStr = p),
          (t.getMillisecondStr = h),
          (t.dateFromDateTimeLocal = function (e) {
            return (e = '' + e), new Date(e.replace(/-/g, '/').replace('T', ' '));
          }),
          (t.getClass = v),
          (t.typeOf = g),
          (t.isString = y),
          (t.isNumber = E),
          (t.isInt = function (e) {
            return E(e) && e % 1 == 0;
          }),
          (t.isBoolean = function (e) {
            return 'boolean' === g(e);
          }),
          (t.isArray = T),
          (t.isFunction = b),
          (t.isDate = C),
          (t.isRegExp = function (e) {
            return 'regexp' === g(e);
          }),
          (t.isError = function (e) {
            return 'error' === g(e);
          }),
          (t.isnull = O),
          (t.notnull = S),
          (t.undef = A),
          (t.notundef = R),
          (t.exist = I),
          (t.notexist = P),
          (t.isObject = w),
          (t.isEmpty = function (e) {
            return P(e) || ((y(e) || T(e)) && 0 === e.length);
          }),
          (t.containsNode = function (e, t) {
            if (e === t) return !0;
            for (; t.parentNode; ) {
              if (t.parentNode === e) return !0;
              t = t.parentNode;
            }
            return !1;
          }),
          (t.calcHeight = function (e) {
            var t = e.parentNode || ('undefined' == typeof document ? null : document.body);
            if (!t) return 0;
            ((e = e.cloneNode(!0)).style.display = 'block'),
              (e.style.opacity = 0),
              (e.style.height = 'auto'),
              t.appendChild(e);
            var n = e.offsetHeight;
            return t.removeChild(e), n;
          }),
          (t.remove = function (e) {
            e.parentNode && e.parentNode.removeChild(e);
          }),
          (t.dataset = function (e, t, n) {
            if (!I(n)) return e.getAttribute('data-' + t);
            e.setAttribute('data-' + t, n);
          }),
          (t.target = function (e) {
            return e.target || e.srcElement;
          }),
          (t.createIframe = function (e) {
            if ('undefined' == typeof document) return;
            var t;
            if ((e = e || {}).name)
              try {
                (t = document.createElement(
                  '<iframe name="' + e.name + '"></iframe>',
                )).frameBorder = 0;
              } catch (n) {
                (t = document.createElement('iframe')).name = e.name;
              }
            else t = document.createElement('iframe');
            e.visible || (t.style.display = 'none');
            b(e.onload) &&
              D(t, 'load', function n(r) {
                if (!t.src) return;
                e.multi || L(t, 'load', n);
                e.onload(r);
              });
            (e.parent || document.body).appendChild(t);
            var n = e.src || 'about:blank';
            return (
              setTimeout(function () {
                t.src = n;
              }, 0),
              t
            );
          }),
          (t.html2node = function (e) {
            if ('undefined' == typeof document) return;
            var t = document.createElement('div');
            t.innerHTML = e;
            var n = [],
              r = void 0,
              i = void 0;
            if (t.children) for (r = 0, i = t.children.length; r < i; r++) n.push(t.children[r]);
            else
              for (r = 0, i = t.childNodes.length; r < i; r++) {
                var o = t.childNodes[r];
                1 === o.nodeType && n.push(o);
              }
            return n.length > 1 ? t : n[0];
          }),
          (t.scrollTop = function (e) {
            'undefined' != typeof document &&
              I(e) &&
              (document.documentElement.scrollTop = document.body.scrollTop = e);
            return (
              window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0
            );
          }),
          (t.forOwn = M),
          (t.mixin = x),
          (t.isJSON = F),
          (t.parseJSON = function e(t) {
            try {
              F(t) && (t = JSON.parse(t)),
                w(t) &&
                  M(t, function (n, r) {
                    switch (g(r)) {
                      case 'string':
                      case 'object':
                        t[n] = e(r);
                    }
                  });
            } catch (e) {
              console.log('error:', e);
            }
            return t;
          }),
          (t.simpleClone = function (e) {
            var t = [],
              n = JSON.stringify(e, function (e, n) {
                if ('object' === (void 0 === n ? 'undefined' : (0, o.default)(n)) && null !== n) {
                  if (-1 !== t.indexOf(n)) return;
                  t.push(n);
                }
                return n;
              });
            return JSON.parse(n);
          }),
          (t.merge = function () {
            for (
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments.length,
                n = Array(t > 1 ? t - 1 : 0),
                r = 1;
              r < t;
              r++
            )
              n[r - 1] = arguments[r];
            return (
              n.forEach(function (t) {
                x(e, t);
              }),
              e
            );
          }),
          (t.fillUndef = function (e, t) {
            return (
              M(t, function (t, n) {
                A(e[t]) && (e[t] = n);
              }),
              e
            );
          }),
          (t.checkWithDefault = function (e, t, n) {
            var r = e[t] || e[t.toLowerCase()];
            P(r) && ((r = n), (e[t] = r));
            return r;
          }),
          (t.fetch = function (e, t) {
            return (
              M(e, function (n, r) {
                I(t[n]) && (e[n] = t[n]);
              }),
              e
            );
          }),
          (t.string2object = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ',',
              n = {};
            return (
              e.split(t).forEach(function (e) {
                var t = e.split('='),
                  r = t.shift();
                r && (n[decodeURIComponent(r)] = decodeURIComponent(t.join('=')));
              }),
              n
            );
          }),
          (t.object2string = j),
          (t.genUrlSep = function (e) {
            return e.indexOf('?') < 0 ? '?' : '&';
          }),
          (t.object2query = function (e) {
            return j(e, '&', !0);
          }),
          (t.isFileInput = V),
          (t.getKeys = function (e, t) {
            var n = Object.keys(e);
            t &&
              n.sort(function (t, n) {
                var r = V(e[t]),
                  i = V(e[n]);
                return r === i ? 0 : r ? 1 : -1;
              });
            return n;
          });
        (t.o = {}),
          (t.emptyObj = {}),
          (t.f = function () {}),
          (t.emptyFunc = function () {}),
          (t.regBlank = /\s+/gi),
          (t.regWhiteSpace = /\s+/gi);
        function a() {
          return 'undefined' != typeof window
            ? window
            : void 0 !== e
            ? e
            : 'undefined' != typeof self
            ? self
            : {};
        }
        function s(e, t) {
          t = t || 2;
          for (var n = '' + e; n.length < t; ) n = '0' + n;
          return n;
        }
        function c(e) {
          return '' + e.getFullYear();
        }
        function u(e) {
          return s(e.getMonth() + 1);
        }
        function d(e) {
          return s(e.getDate());
        }
        function l(e) {
          return s(e.getHours());
        }
        function f(e) {
          return s(e.getMinutes());
        }
        function p(e) {
          return s(e.getSeconds());
        }
        function h(e) {
          return s(e.getMilliseconds(), 3);
        }
        var m, _;
        t.format =
          ((m = /yyyy|MM|dd|hh|mm|ss|SSS/g),
          (_ = { yyyy: c, MM: u, dd: d, hh: l, mm: f, ss: p, SSS: h }),
          function (e, t) {
            return (
              (e = new Date(e)),
              isNaN(+e)
                ? 'invalid date'
                : (t = t || 'yyyy-MM-dd').replace(m, function (t) {
                    return _[t](e);
                  })
            );
          });
        function v(e) {
          return Object.prototype.toString.call(e).slice(8, -1);
        }
        function g(e) {
          return v(e).toLowerCase();
        }
        function y(e) {
          return 'string' === g(e);
        }
        function E(e) {
          return 'number' === g(e);
        }
        function T(e) {
          return 'array' === g(e);
        }
        function b(e) {
          return 'function' === g(e);
        }
        function C(e) {
          return 'date' === g(e);
        }
        function O(e) {
          return null === e;
        }
        function S(e) {
          return null !== e;
        }
        function A(e) {
          return void 0 === e;
        }
        function R(e) {
          return void 0 !== e;
        }
        function I(e) {
          return R(e) && S(e);
        }
        function P(e) {
          return A(e) || O(e);
        }
        function w(e) {
          return I(e) && 'object' === g(e);
        }
        var N = (t.addEventListener = function (e, t, n) {
            e.addEventListener
              ? e.addEventListener(t, n, !1)
              : e.attachEvent && e.attachEvent('on' + t, n);
          }),
          D = (t.on = N),
          k = (t.removeEventListener = function (e, t, n) {
            e.removeEventListener
              ? e.removeEventListener(t, n, !1)
              : e.detachEvent && e.detachEvent('on' + t, n);
          }),
          L = (t.off = k);
        function M() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {},
            n = arguments[2];
          for (var r in e) e.hasOwnProperty(r) && t.call(n, r, e[r]);
        }
        function x(e, t) {
          M(t, function (t, n) {
            e[t] = n;
          });
        }
        var U;
        t.uniqueID =
          ((U = 0),
          function () {
            return '' + U++;
          });
        function F(e) {
          return y(e) && 0 === e.indexOf('{') && e.lastIndexOf('}') === e.length - 1;
        }
        function j(e, t, n) {
          if (!e) return '';
          var r = [];
          return (
            M(e, function (e, t) {
              b(t) ||
                (C(t)
                  ? (t = t.getTime())
                  : T(t)
                  ? (t = t.join(','))
                  : w(t) && (t = JSON.stringify(t)),
                n && (t = encodeURIComponent(t)),
                r.push(encodeURIComponent(e) + '=' + t));
            }),
            r.join(t || ',')
          );
        }
        t.url2origin = (function () {
          var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
          return function (t) {
            return e.test(t || '') ? RegExp.$1.toLowerCase() : '';
          };
        })();
        function V(e) {
          var t = a();
          return (
            (e.tagName && 'INPUT' === e.tagName.toUpperCase()) || (t.Blob && e instanceof t.Blob)
          );
        }
      }.call(this, n(24)));
    },
    function (e, t, n) {
      e.exports = !n(29)(function () {
        return (
          7 !=
          Object.defineProperty({}, 'a', {
            get: function () {
              return 7;
            },
          }).a
        );
      });
    },
    function (e, t, n) {
      'use strict';
      (function (t) {
        var r,
          i = n(9),
          o = (r = i) && r.__esModule ? r : { default: r };
        var a = (function () {
          var e = 'object' === (void 0 === t ? 'undefined' : (0, o.default)(t)) ? t : window,
            n = Math.pow(2, 53) - 1,
            r = /\bOpera/,
            i = Object.prototype,
            a = i.hasOwnProperty,
            s = i.toString;
          function c(e) {
            return (e = String(e)).charAt(0).toUpperCase() + e.slice(1);
          }
          function u(e) {
            return (e = h(e)), /^(?:webOS|i(?:OS|P))/.test(e) ? e : c(e);
          }
          function d(e, t) {
            for (var n in e) a.call(e, n) && t(e[n], n, e);
          }
          function l(e) {
            return null == e ? c(e) : s.call(e).slice(8, -1);
          }
          function f(e) {
            return String(e).replace(/([ -])(?!$)/g, '$1?');
          }
          function p(e, t) {
            var r = null;
            return (
              (function (e, t) {
                var r = -1,
                  i = e ? e.length : 0;
                if ('number' == typeof i && i > -1 && i <= n) for (; ++r < i; ) t(e[r], r, e);
                else d(e, t);
              })(e, function (n, i) {
                r = t(r, n, i, e);
              }),
              r
            );
          }
          function h(e) {
            return String(e).replace(/^ +| +$/g, '');
          }
          return (function t(n) {
            var i = e,
              a =
                n &&
                'object' === (void 0 === n ? 'undefined' : (0, o.default)(n)) &&
                'String' != l(n);
            a && ((i = n), (n = null));
            var c = i.navigator || {},
              m = c.userAgent || '';
            n || (n = m);
            var _,
              v,
              g,
              y,
              E,
              T = a ? !!c.likeChrome : /\bChrome\b/.test(n) && !/internal|\n/i.test(s.toString()),
              b = a ? 'Object' : 'ScriptBridgingProxyObject',
              C = a ? 'Object' : 'Environment',
              O = a && i.java ? 'JavaPackage' : l(i.java),
              S = a ? 'Object' : 'RuntimeObject',
              A = /\bJava/.test(O) && i.java,
              R = A && l(i.environment) == C,
              I = A ? 'a' : 'α',
              P = A ? 'b' : 'β',
              w = i.document || {},
              N = i.operamini || i.opera,
              D = r.test((D = a && N ? N['[[Class]]'] : l(N))) ? D : (N = null),
              k = n,
              L = [],
              M = null,
              x = n == m,
              U = x && N && 'function' == typeof N.version && N.version(),
              F = p(
                [
                  { label: 'EdgeHTML', pattern: 'Edge' },
                  'Trident',
                  { label: 'WebKit', pattern: 'AppleWebKit' },
                  'iCab',
                  'Presto',
                  'NetFront',
                  'Tasman',
                  'KHTML',
                  'Gecko',
                ],
                function (e, t) {
                  return (
                    e ||
                    (RegExp('\\b' + (t.pattern || f(t)) + '\\b', 'i').exec(n) && (t.label || t))
                  );
                },
              ),
              j = (function (e) {
                return p(e, function (e, t) {
                  return (
                    e ||
                    (RegExp('\\b' + (t.pattern || f(t)) + '\\b', 'i').exec(n) && (t.label || t))
                  );
                });
              })([
                'Adobe AIR',
                'Arora',
                'Avant Browser',
                'Breach',
                'Camino',
                'Electron',
                'Epiphany',
                'Fennec',
                'Flock',
                'Galeon',
                'GreenBrowser',
                'iCab',
                'Iceweasel',
                'K-Meleon',
                'Konqueror',
                'Lunascape',
                'Maxthon',
                { label: 'Microsoft Edge', pattern: 'Edge' },
                'Midori',
                'Nook Browser',
                'PaleMoon',
                'PhantomJS',
                'Raven',
                'Rekonq',
                'RockMelt',
                { label: 'Samsung Internet', pattern: 'SamsungBrowser' },
                'SeaMonkey',
                { label: 'Silk', pattern: '(?:Cloud9|Silk-Accelerated)' },
                'Sleipnir',
                'SlimBrowser',
                { label: 'SRWare Iron', pattern: 'Iron' },
                'Sunrise',
                'Swiftfox',
                'Waterfox',
                'WebPositive',
                'Opera Mini',
                { label: 'Opera Mini', pattern: 'OPiOS' },
                'Opera',
                { label: 'Opera', pattern: 'OPR' },
                'Chrome',
                { label: 'Chrome', pattern: '(?:HeadlessChrome)' },
                { label: 'Chrome Mobile', pattern: '(?:CriOS|CrMo)' },
                { label: 'Firefox', pattern: '(?:Firefox|Minefield)' },
                { label: 'Firefox for iOS', pattern: 'FxiOS' },
                { label: 'IE', pattern: 'IEMobile' },
                { label: 'IE', pattern: 'MSIE' },
                'Safari',
              ]),
              V = G([
                { label: 'BlackBerry', pattern: 'BB10' },
                'BlackBerry',
                { label: 'Galaxy S', pattern: 'GT-I9000' },
                { label: 'Galaxy S2', pattern: 'GT-I9100' },
                { label: 'Galaxy S3', pattern: 'GT-I9300' },
                { label: 'Galaxy S4', pattern: 'GT-I9500' },
                { label: 'Galaxy S5', pattern: 'SM-G900' },
                { label: 'Galaxy S6', pattern: 'SM-G920' },
                { label: 'Galaxy S6 Edge', pattern: 'SM-G925' },
                { label: 'Galaxy S7', pattern: 'SM-G930' },
                { label: 'Galaxy S7 Edge', pattern: 'SM-G935' },
                'Google TV',
                'Lumia',
                'iPad',
                'iPod',
                'iPhone',
                'Kindle',
                { label: 'Kindle Fire', pattern: '(?:Cloud9|Silk-Accelerated)' },
                'Nexus',
                'Nook',
                'PlayBook',
                'PlayStation Vita',
                'PlayStation',
                'TouchPad',
                'Transformer',
                { label: 'Wii U', pattern: 'WiiU' },
                'Wii',
                'Xbox One',
                { label: 'Xbox 360', pattern: 'Xbox' },
                'Xoom',
              ]),
              B = (function (e) {
                return p(e, function (e, t, r) {
                  return (
                    e ||
                    ((t[V] ||
                      t[/^[a-z]+(?: +[a-z]+\b)*/i.exec(V)] ||
                      RegExp('\\b' + f(r) + '(?:\\b|\\w*\\d)', 'i').exec(n)) &&
                      r)
                  );
                });
              })({
                Apple: { iPad: 1, iPhone: 1, iPod: 1 },
                Archos: {},
                Amazon: { Kindle: 1, 'Kindle Fire': 1 },
                Asus: { Transformer: 1 },
                'Barnes & Noble': { Nook: 1 },
                BlackBerry: { PlayBook: 1 },
                Google: { 'Google TV': 1, Nexus: 1 },
                HP: { TouchPad: 1 },
                HTC: {},
                LG: {},
                Microsoft: { Xbox: 1, 'Xbox One': 1 },
                Motorola: { Xoom: 1 },
                Nintendo: { 'Wii U': 1, Wii: 1 },
                Nokia: { Lumia: 1 },
                Samsung: { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
                Sony: { PlayStation: 1, 'PlayStation Vita': 1 },
              }),
              W = (function (e) {
                return p(e, function (e, t) {
                  var r = t.pattern || f(t);
                  return (
                    !e &&
                      (e = RegExp('\\b' + r + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(n)) &&
                      (e = (function (e, t, n) {
                        var r = {
                          '10.0': '10',
                          6.4: '10 Technical Preview',
                          6.3: '8.1',
                          6.2: '8',
                          6.1: 'Server 2008 R2 / 7',
                          '6.0': 'Server 2008 / Vista',
                          5.2: 'Server 2003 / XP 64-bit',
                          5.1: 'XP',
                          5.01: '2000 SP1',
                          '5.0': '2000',
                          '4.0': 'NT',
                          '4.90': 'ME',
                        };
                        return (
                          t &&
                            n &&
                            /^Win/i.test(e) &&
                            !/^Windows Phone /i.test(e) &&
                            (r = r[/[\d.]+$/.exec(e)]) &&
                            (e = 'Windows ' + r),
                          (e = String(e)),
                          t && n && (e = e.replace(RegExp(t, 'i'), n)),
                          (e = u(
                            e
                              .replace(/ ce$/i, ' CE')
                              .replace(/\bhpw/i, 'web')
                              .replace(/\bMacintosh\b/, 'Mac OS')
                              .replace(/_PowerPC\b/i, ' OS')
                              .replace(/\b(OS X) [^ \d]+/i, '$1')
                              .replace(/\bMac (OS X)\b/, '$1')
                              .replace(/\/(\d)/, ' $1')
                              .replace(/_/g, '.')
                              .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
                              .replace(/\bx86\.64\b/gi, 'x86_64')
                              .replace(/\b(Windows Phone) OS\b/, '$1')
                              .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
                              .split(' on ')[0],
                          ))
                        );
                      })(e, r, t.label || t)),
                    e
                  );
                });
              })([
                'Windows Phone',
                'Android',
                'CentOS',
                { label: 'Chrome OS', pattern: 'CrOS' },
                'Debian',
                'Fedora',
                'FreeBSD',
                'Gentoo',
                'Haiku',
                'Kubuntu',
                'Linux Mint',
                'OpenBSD',
                'Red Hat',
                'SuSE',
                'Ubuntu',
                'Xubuntu',
                'Cygwin',
                'Symbian OS',
                'hpwOS',
                'webOS ',
                'webOS',
                'Tablet OS',
                'Tizen',
                'Linux',
                'Mac OS X',
                'Macintosh',
                'Mac',
                'Windows 98;',
                'Windows ',
              ]);
            function G(e) {
              return p(e, function (e, t) {
                var r = t.pattern || f(t);
                return (
                  !e &&
                    (e =
                      RegExp('\\b' + r + ' *\\d+[.\\w_]*', 'i').exec(n) ||
                      RegExp('\\b' + r + ' *\\w+-[\\w]*', 'i').exec(n) ||
                      RegExp('\\b' + r + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(
                        n,
                      )) &&
                    ((e = String(t.label && !RegExp(r, 'i').test(t.label) ? t.label : e).split(
                      '/',
                    ))[1] &&
                      !/[\d.]+/.test(e[0]) &&
                      (e[0] += ' ' + e[1]),
                    (t = t.label || t),
                    (e = u(
                      e[0]
                        .replace(RegExp(r, 'i'), t)
                        .replace(RegExp('; *(?:' + t + '[_-])?', 'i'), ' ')
                        .replace(RegExp('(' + t + ')[-_.]?(\\w)', 'i'), '$1 $2'),
                    ))),
                  e
                );
              });
            }
            if (
              (F && (F = [F]),
              B && !V && (V = G([B])),
              (_ = /\bGoogle TV\b/.exec(V)) && (V = _[0]),
              /\bSimulator\b/i.test(n) && (V = (V ? V + ' ' : '') + 'Simulator'),
              'Opera Mini' == j &&
                /\bOPiOS\b/.test(n) &&
                L.push('running in Turbo/Uncompressed mode'),
              'IE' == j && /\blike iPhone OS\b/.test(n)
                ? ((B = (_ = t(n.replace(/like iPhone OS/, ''))).manufacturer), (V = _.product))
                : /^iP/.test(V)
                ? (j || (j = 'Safari'),
                  (W =
                    'iOS' + ((_ = / OS ([\d_]+)/i.exec(n)) ? ' ' + _[1].replace(/_/g, '.') : '')))
                : 'Konqueror' != j || /buntu/i.test(W)
                ? (B &&
                    'Google' != B &&
                    ((/Chrome/.test(j) && !/\bMobile Safari\b/i.test(n)) || /\bVita\b/.test(V))) ||
                  (/\bAndroid\b/.test(W) && /^Chrome/.test(j) && /\bVersion\//i.test(n))
                  ? ((j = 'Android Browser'), (W = /\bAndroid\b/.test(W) ? W : 'Android'))
                  : 'Silk' == j
                  ? (/\bMobi/i.test(n) || ((W = 'Android'), L.unshift('desktop mode')),
                    /Accelerated *= *true/i.test(n) && L.unshift('accelerated'))
                  : 'PaleMoon' == j && (_ = /\bFirefox\/([\d.]+)\b/.exec(n))
                  ? L.push('identifying as Firefox ' + _[1])
                  : 'Firefox' == j && (_ = /\b(Mobile|Tablet|TV)\b/i.exec(n))
                  ? (W || (W = 'Firefox OS'), V || (V = _[1]))
                  : !j || (_ = !/\bMinefield\b/i.test(n) && /\b(?:Firefox|Safari)\b/.exec(j))
                  ? (j &&
                      !V &&
                      /[\/,]|^[^(]+?\)/.test(n.slice(n.indexOf(_ + '/') + 8)) &&
                      (j = null),
                    (_ = V || B || W) &&
                      (V || B || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(W)) &&
                      (j = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(W) ? W : _) + ' Browser'))
                  : 'Electron' == j &&
                    (_ = (/\bChrome\/([\d.]+)\b/.exec(n) || 0)[1]) &&
                    L.push('Chromium ' + _)
                : (W = 'Kubuntu'),
              U ||
                (U = p(
                  [
                    '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
                    'Version',
                    'HeadlessChrome',
                    f(j),
                    '(?:Firefox|Minefield|NetFront)',
                  ],
                  function (e, t) {
                    return (
                      e ||
                      (RegExp(
                        t + '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)',
                        'i',
                      ).exec(n) || 0)[1] ||
                      null
                    );
                  },
                )),
              (_ =
                ('iCab' == F && parseFloat(U) > 3
                  ? 'WebKit'
                  : /\bOpera\b/.test(j) && (/\bOPR\b/.test(n) ? 'Blink' : 'Presto')) ||
                (/\b(?:Midori|Nook|Safari)\b/i.test(n) &&
                  !/^(?:Trident|EdgeHTML)$/.test(F) &&
                  'WebKit') ||
                (!F && /\bMSIE\b/i.test(n) && ('Mac OS' == W ? 'Tasman' : 'Trident')) ||
                ('WebKit' == F && /\bPlayStation\b(?! Vita\b)/i.test(j) && 'NetFront')) &&
                (F = [_]),
              'IE' == j && (_ = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(n) || 0)[1])
                ? ((j += ' Mobile'),
                  (W = 'Windows Phone ' + (/\+$/.test(_) ? _ : _ + '.x')),
                  L.unshift('desktop mode'))
                : /\bWPDesktop\b/i.test(n)
                ? ((j = 'IE Mobile'),
                  (W = 'Windows Phone 8.x'),
                  L.unshift('desktop mode'),
                  U || (U = (/\brv:([\d.]+)/.exec(n) || 0)[1]))
                : 'IE' != j &&
                  'Trident' == F &&
                  (_ = /\brv:([\d.]+)/.exec(n)) &&
                  (j && L.push('identifying as ' + j + (U ? ' ' + U : '')), (j = 'IE'), (U = _[1])),
              x)
            ) {
              if (
                ((y = 'global'),
                (E = null != (g = i) ? (0, o.default)(g[y]) : 'number'),
                /^(?:boolean|number|string|undefined)$/.test(E) || ('object' == E && !g[y]))
              )
                l((_ = i.runtime)) == b
                  ? ((j = 'Adobe AIR'), (W = _.flash.system.Capabilities.os))
                  : l((_ = i.phantom)) == S
                  ? ((j = 'PhantomJS'),
                    (U = (_ = _.version || null) && _.major + '.' + _.minor + '.' + _.patch))
                  : 'number' == typeof w.documentMode && (_ = /\bTrident\/(\d+)/i.exec(n))
                  ? ((U = [U, w.documentMode]),
                    (_ = +_[1] + 4) != U[1] &&
                      (L.push('IE ' + U[1] + ' mode'), F && (F[1] = ''), (U[1] = _)),
                    (U = 'IE' == j ? String(U[1].toFixed(1)) : U[0]))
                  : 'number' == typeof w.documentMode &&
                    /^(?:Chrome|Firefox)\b/.test(j) &&
                    (L.push('masking as ' + j + ' ' + U),
                    (j = 'IE'),
                    (U = '11.0'),
                    (F = ['Trident']),
                    (W = 'Windows'));
              else if (
                (A &&
                  ((k = (_ = A.lang.System).getProperty('os.arch')),
                  (W = W || _.getProperty('os.name') + ' ' + _.getProperty('os.version'))),
                R)
              ) {
                try {
                  (U = i.require('ringo/engine').version.join('.')), (j = 'RingoJS');
                } catch (e) {
                  (_ = i.system) &&
                    _.global.system == i.system &&
                    ((j = 'Narwhal'), W || (W = _[0].os || null));
                }
                j || (j = 'Rhino');
              } else
                'object' === (0, o.default)(i.process) &&
                  !i.process.browser &&
                  (_ = i.process) &&
                  ('object' === (0, o.default)(_.versions) &&
                    ('string' == typeof _.versions.electron
                      ? (L.push('Node ' + _.versions.node),
                        (j = 'Electron'),
                        (U = _.versions.electron))
                      : 'string' == typeof _.versions.nw &&
                        (L.push('Chromium ' + U, 'Node ' + _.versions.node),
                        (j = 'NW.js'),
                        (U = _.versions.nw))),
                  j ||
                    ((j = 'Node.js'),
                    (k = _.arch),
                    (W = _.platform),
                    (U = (U = /[\d.]+/.exec(_.version)) ? U[0] : null)));
              W = W && u(W);
            }
            if (
              (U &&
                (_ =
                  /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(U) ||
                  /(?:alpha|beta)(?: ?\d)?/i.exec(n + ';' + (x && c.appMinorVersion)) ||
                  (/\bMinefield\b/i.test(n) && 'a')) &&
                ((M = /b/i.test(_) ? 'beta' : 'alpha'),
                (U =
                  U.replace(RegExp(_ + '\\+?$'), '') +
                  ('beta' == M ? P : I) +
                  (/\d+\+?/.exec(_) || ''))),
              'Fennec' == j || ('Firefox' == j && /\b(?:Android|Firefox OS)\b/.test(W)))
            )
              j = 'Firefox Mobile';
            else if ('Maxthon' == j && U) U = U.replace(/\.[\d.]+/, '.x');
            else if (/\bXbox\b/i.test(V))
              'Xbox 360' == V && (W = null),
                'Xbox 360' == V && /\bIEMobile\b/.test(n) && L.unshift('mobile mode');
            else if (
              (!/^(?:Chrome|IE|Opera)$/.test(j) && (!j || V || /Browser|Mobi/.test(j))) ||
              ('Windows CE' != W && !/Mobi/i.test(n))
            )
              if ('IE' == j && x)
                try {
                  null === i.external && L.unshift('platform preview');
                } catch (e) {
                  L.unshift('embedded');
                }
              else
                (/\bBlackBerry\b/.test(V) || /\bBB10\b/.test(n)) &&
                (_ = (RegExp(V.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(n) || 0)[1] || U)
                  ? ((W =
                      ((_ = [_, /BB10/.test(n)])[1]
                        ? ((V = null), (B = 'BlackBerry'))
                        : 'Device Software') +
                      ' ' +
                      _[0]),
                    (U = null))
                  : this != d &&
                    'Wii' != V &&
                    ((x && N) ||
                      (/Opera/.test(j) && /\b(?:MSIE|Firefox)\b/i.test(n)) ||
                      ('Firefox' == j && /\bOS X (?:\d+\.){2,}/.test(W)) ||
                      ('IE' == j &&
                        ((W && !/^Win/.test(W) && U > 5.5) ||
                          (/\bWindows XP\b/.test(W) && U > 8) ||
                          (8 == U && !/\bTrident\b/.test(n))))) &&
                    !r.test((_ = t.call(d, n.replace(r, '') + ';'))) &&
                    _.name &&
                    ((_ = 'ing as ' + _.name + ((_ = _.version) ? ' ' + _ : '')),
                    r.test(j)
                      ? (/\bIE\b/.test(_) && 'Mac OS' == W && (W = null), (_ = 'identify' + _))
                      : ((_ = 'mask' + _),
                        (j = D ? u(D.replace(/([a-z])([A-Z])/g, '$1 $2')) : 'Opera'),
                        /\bIE\b/.test(_) && (W = null),
                        x || (U = null)),
                    (F = ['Presto']),
                    L.push(_));
            else j += ' Mobile';
            (_ = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(n) || 0)[1]) &&
              ((_ = [parseFloat(_.replace(/\.(\d)$/, '.0$1')), _]),
              'Safari' == j && '+' == _[1].slice(-1)
                ? ((j = 'WebKit Nightly'), (M = 'alpha'), (U = _[1].slice(0, -1)))
                : (U != _[1] && U != (_[2] = (/\bSafari\/([\d.]+\+?)/i.exec(n) || 0)[1])) ||
                  (U = null),
              (_[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(n) || 0)[1]),
              537.36 == _[0] &&
                537.36 == _[2] &&
                parseFloat(_[1]) >= 28 &&
                'WebKit' == F &&
                (F = ['Blink']),
              x && (T || _[1])
                ? (F && (F[1] = 'like Chrome'),
                  (_ =
                    _[1] ||
                    ((_ = _[0]) < 530
                      ? 1
                      : _ < 532
                      ? 2
                      : _ < 532.05
                      ? 3
                      : _ < 533
                      ? 4
                      : _ < 534.03
                      ? 5
                      : _ < 534.07
                      ? 6
                      : _ < 534.1
                      ? 7
                      : _ < 534.13
                      ? 8
                      : _ < 534.16
                      ? 9
                      : _ < 534.24
                      ? 10
                      : _ < 534.3
                      ? 11
                      : _ < 535.01
                      ? 12
                      : _ < 535.02
                      ? '13+'
                      : _ < 535.07
                      ? 15
                      : _ < 535.11
                      ? 16
                      : _ < 535.19
                      ? 17
                      : _ < 536.05
                      ? 18
                      : _ < 536.1
                      ? 19
                      : _ < 537.01
                      ? 20
                      : _ < 537.11
                      ? '21+'
                      : _ < 537.13
                      ? 23
                      : _ < 537.18
                      ? 24
                      : _ < 537.24
                      ? 25
                      : _ < 537.36
                      ? 26
                      : 'Blink' != F
                      ? '27'
                      : '28')))
                : (F && (F[1] = 'like Safari'),
                  (_ =
                    (_ = _[0]) < 400
                      ? 1
                      : _ < 500
                      ? 2
                      : _ < 526
                      ? 3
                      : _ < 533
                      ? 4
                      : _ < 534
                      ? '4+'
                      : _ < 535
                      ? 5
                      : _ < 537
                      ? 6
                      : _ < 538
                      ? 7
                      : _ < 601
                      ? 8
                      : '8')),
              F && (F[1] += ' ' + (_ += 'number' == typeof _ ? '.x' : /[.+]/.test(_) ? '' : '+')),
              'Safari' == j && (!U || parseInt(U) > 45) && (U = _)),
              'Opera' == j && (_ = /\bzbov|zvav$/.exec(W))
                ? ((j += ' '),
                  L.unshift('desktop mode'),
                  'zvav' == _ ? ((j += 'Mini'), (U = null)) : (j += 'Mobile'),
                  (W = W.replace(RegExp(' *' + _ + '$'), '')))
                : 'Safari' == j &&
                  /\bChrome\b/.exec(F && F[1]) &&
                  (L.unshift('desktop mode'),
                  (j = 'Chrome Mobile'),
                  (U = null),
                  /\bOS X\b/.test(W) ? ((B = 'Apple'), (W = 'iOS 4.3+')) : (W = null)),
              U &&
                0 == U.indexOf((_ = /[\d.]+$/.exec(W))) &&
                n.indexOf('/' + _ + '-') > -1 &&
                (W = h(W.replace(_, ''))),
              F &&
                !/\b(?:Avant|Nook)\b/.test(j) &&
                (/Browser|Lunascape|Maxthon/.test(j) ||
                  ('Safari' != j && /^iOS/.test(W) && /\bSafari\b/.test(F[1])) ||
                  (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
                    j,
                  ) &&
                    F[1])) &&
                (_ = F[F.length - 1]) &&
                L.push(_),
              L.length && (L = ['(' + L.join('; ') + ')']),
              B && V && V.indexOf(B) < 0 && L.push('on ' + B),
              V && L.push((/^on /.test(L[L.length - 1]) ? '' : 'on ') + V),
              W &&
                ((_ = / ([\d.+]+)$/.exec(W)),
                (v = _ && '/' == W.charAt(W.length - _[0].length - 1)),
                (W = {
                  architecture: 32,
                  family: _ && !v ? W.replace(_[0], '') : W,
                  version: _ ? _[1] : null,
                  toString: function () {
                    var e = this.version;
                    return (
                      this.family +
                      (e && !v ? ' ' + e : '') +
                      (64 == this.architecture ? ' 64-bit' : '')
                    );
                  },
                })),
              (_ = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(k)) && !/\bi686\b/i.test(k)
                ? (W &&
                    ((W.architecture = 64), (W.family = W.family.replace(RegExp(' *' + _), ''))),
                  j &&
                    (/\bWOW64\b/i.test(n) ||
                      (x &&
                        /\w(?:86|32)$/.test(c.cpuClass || c.platform) &&
                        !/\bWin64; x64\b/i.test(n))) &&
                    L.unshift('32-bit'))
                : W &&
                  /^OS X/.test(W.family) &&
                  'Chrome' == j &&
                  parseFloat(U) >= 39 &&
                  (W.architecture = 64),
              n || (n = null);
            var H = {};
            return (
              (H.description = n),
              (H.layout = F && F[0]),
              (H.manufacturer = B),
              (H.name = j),
              (H.prerelease = M),
              (H.product = V),
              (H.ua = n),
              (H.version = j && U),
              (H.os = W || {
                architecture: null,
                family: null,
                version: null,
                toString: function () {
                  return 'null';
                },
              }),
              (H.parse = t),
              (H.toString = function () {
                return this.description || '';
              }),
              H.version && L.unshift(U),
              H.name && L.unshift(j),
              W &&
                j &&
                (W != String(W).split(' ')[0] || (W != j.split(' ')[0] && !V)) &&
                L.push(V ? '(' + W + ')' : 'on ' + W),
              L.length && (H.description = L.join(' ')),
              H
            );
          })();
        })();
        e.exports = a;
      }.call(this, n(24)));
    },
    ,
    ,
    function (e, t) {
      var n = {}.hasOwnProperty;
      e.exports = function (e, t) {
        return n.call(e, t);
      };
    },
    function (e, t) {
      e.exports = function (e) {
        return 'object' == typeof e ? null !== e : 'function' == typeof e;
      };
    },
    function (e, t) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || Function('return this')() || (0, eval)('this');
      } catch (e) {
        'object' == typeof window && (n = window);
      }
      e.exports = n;
    },
    function (e, t, n) {
      var r = n(15),
        i = n(34);
      e.exports = n(18)
        ? function (e, t, n) {
            return r.f(e, t, i(1, n));
          }
        : function (e, t, n) {
            return (e[t] = n), e;
          };
    },
    function (e, t, n) {
      var r = n(74),
        i = n(60);
      e.exports = function (e) {
        return r(i(e));
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(335);
      Object.defineProperty(t, 'element', {
        enumerable: !0,
        get: function () {
          return r.element;
        },
      });
      var i = n(334);
      Object.defineProperty(t, 'ajax', {
        enumerable: !0,
        get: function () {
          return i.ajax;
        },
      });
      var o = n(333);
      Object.defineProperty(t, 'tool', {
        enumerable: !0,
        get: function () {
          return o.tool;
        },
      });
      var a = n(143);
      Object.defineProperty(t, 'ApiInvokeData', {
        enumerable: !0,
        get: function () {
          return a.ApiInvokeData;
        },
      }),
        Object.defineProperty(t, 'DataRtc', {
          enumerable: !0,
          get: function () {
            return a.DataRtc;
          },
        }),
        Object.defineProperty(t, 'DataStats', {
          enumerable: !0,
          get: function () {
            return a.DataStats;
          },
        });
      var s = n(28);
      Object.defineProperty(t, 'RtcUtil', {
        enumerable: !0,
        get: function () {
          return s.RtcUtil;
        },
      }),
        Object.defineProperty(t, 'SdpUtil', {
          enumerable: !0,
          get: function () {
            return s.SdpUtil;
          },
        }),
        Object.defineProperty(t, 'RtcStats', {
          enumerable: !0,
          get: function () {
            return s.RtcStats;
          },
        }),
        Object.defineProperty(t, 'RtcStatsNew', {
          enumerable: !0,
          get: function () {
            return s.RtcStatsNew;
          },
        }),
        Object.defineProperty(t, 'RtcSupport', {
          enumerable: !0,
          get: function () {
            return s.RtcSupport;
          },
        }),
        Object.defineProperty(t, 'RtcSystem', {
          enumerable: !0,
          get: function () {
            return s.RtcSystem;
          },
        }),
        Object.defineProperty(t, 'WebrtcUtil', {
          enumerable: !0,
          get: function () {
            return s.WebrtcUtil;
          },
        });
      var c = n(159);
      Object.defineProperty(t, 'WebAudio', {
        enumerable: !0,
        get: function () {
          return c.WebAudio;
        },
      });
      var u = n(268);
      Object.defineProperty(t, 'deviceId', {
        enumerable: !0,
        get: function () {
          return ((e = u), e && e.__esModule ? e : { default: e }).default;
          var e;
        },
      });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(326);
      Object.defineProperty(t, 'RtcUtil', {
        enumerable: !0,
        get: function () {
          return u(r).default;
        },
      });
      var i = n(322);
      Object.defineProperty(t, 'SdpUtil', {
        enumerable: !0,
        get: function () {
          return u(i).default;
        },
      });
      var o = n(321);
      Object.defineProperty(t, 'RtcStatsNew', {
        enumerable: !0,
        get: function () {
          return u(o).default;
        },
      });
      var a = n(208);
      Object.defineProperty(t, 'RtcSupport', {
        enumerable: !0,
        get: function () {
          return u(a).default;
        },
      });
      var s = n(100);
      Object.defineProperty(t, 'RtcSystem', {
        enumerable: !0,
        get: function () {
          return u(s).default;
        },
      });
      var c = n(319);
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, 'WebrtcUtil', {
        enumerable: !0,
        get: function () {
          return u(c).default;
        },
      });
    },
    function (e, t) {
      e.exports = function (e) {
        try {
          return !!e();
        } catch (e) {
          return !0;
        }
      };
    },
    ,
    function (e, t) {
      e.exports = {};
    },
    ,
    ,
    function (e, t) {
      e.exports = function (e, t) {
        return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
      };
    },
    ,
    function (e, t, n) {
      var r = n(50);
      e.exports = function (e, t, n) {
        if ((r(e), void 0 === t)) return e;
        switch (n) {
          case 1:
            return function (n) {
              return e.call(t, n);
            };
          case 2:
            return function (n, r) {
              return e.call(t, n, r);
            };
          case 3:
            return function (n, r, i) {
              return e.call(t, n, r, i);
            };
        }
        return function () {
          return e.apply(t, arguments);
        };
      };
    },
    ,
    function (e, t) {
      var n = {}.toString;
      e.exports = function (e) {
        return n.call(e).slice(8, -1);
      };
    },
    function (e, t) {
      t.f = {}.propertyIsEnumerable;
    },
    function (e, t) {
      var n = 0,
        r = Math.random();
      e.exports = function (e) {
        return 'Symbol('.concat(void 0 === e ? '' : e, ')_', (++n + r).toString(36));
      };
    },
    function (e, t, n) {
      var r = n(75),
        i = n(56);
      e.exports =
        Object.keys ||
        function (e) {
          return r(e, i);
        };
    },
    function (e, t, n) {
      'use strict';
      var r = n(139)(!0);
      n(78)(
        String,
        'String',
        function (e) {
          (this._t = String(e)), (this._i = 0);
        },
        function () {
          var e,
            t = this._t,
            n = this._i;
          return n >= t.length
            ? { value: void 0, done: !0 }
            : ((e = r(t, n)), (this._i += e.length), { value: e, done: !1 });
        },
      );
    },
    function (e, t, n) {
      var r = n(15).f,
        i = n(22),
        o = n(7)('toStringTag');
      e.exports = function (e, t, n) {
        e && !i((e = n ? e : e.prototype), o) && r(e, o, { configurable: !0, value: t });
      };
    },
    function (e, t) {
      e.exports = !0;
    },
    ,
    ,
    ,
    function (e, t, n) {
      n(134);
      for (
        var r = n(8),
          i = n(25),
          o = n(31),
          a = n(7)('toStringTag'),
          s = 'CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList'.split(
            ',',
          ),
          c = 0;
        c < s.length;
        c++
      ) {
        var u = s[c],
          d = r[u],
          l = d && d.prototype;
        l && !l[a] && i(l, a, u), (o[u] = o.Array);
      }
    },
    function (e, t, n) {
      var r = n(60);
      e.exports = function (e) {
        return Object(r(e));
      };
    },
    function (e, t) {
      e.exports = function (e) {
        if ('function' != typeof e) throw TypeError(e + ' is not a function!');
        return e;
      };
    },
    ,
    ,
    function (e, t) {
      t.f = Object.getOwnPropertySymbols;
    },
    function (e, t, n) {
      var r = n(8),
        i = n(6),
        o = n(44),
        a = n(55),
        s = n(15).f;
      e.exports = function (e) {
        var t = i.Symbol || (i.Symbol = o ? {} : r.Symbol || {});
        '_' == e.charAt(0) || e in t || s(t, e, { value: a.f(e) });
      };
    },
    function (e, t, n) {
      t.f = n(7);
    },
    function (e, t) {
      e.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
        ',',
      );
    },
    function (e, t, n) {
      var r = n(8),
        i = r['__core-js_shared__'] || (r['__core-js_shared__'] = {});
      e.exports = function (e) {
        return i[e] || (i[e] = {});
      };
    },
    function (e, t, n) {
      var r = n(57)('keys'),
        i = n(40);
      e.exports = function (e) {
        return r[e] || (r[e] = i(e));
      };
    },
    function (e, t, n) {
      var r = n(23);
      e.exports = function (e, t) {
        if (!r(e)) return e;
        var n, i;
        if (t && 'function' == typeof (n = e.toString) && !r((i = n.call(e)))) return i;
        if ('function' == typeof (n = e.valueOf) && !r((i = n.call(e)))) return i;
        if (!t && 'function' == typeof (n = e.toString) && !r((i = n.call(e)))) return i;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function (e, t) {
      e.exports = function (e) {
        if (null == e) throw TypeError("Can't call method on  " + e);
        return e;
      };
    },
    function (e, t) {
      var n = Math.ceil,
        r = Math.floor;
      e.exports = function (e) {
        return isNaN((e = +e)) ? 0 : (e > 0 ? r : n)(e);
      };
    },
    ,
    ,
    function (e, t, n) {
      var r = n(23),
        i = n(8).document,
        o = r(i) && r(i.createElement);
      e.exports = function (e) {
        return o ? i.createElement(e) : {};
      };
    },
    function (e, t, n) {
      'use strict';
      t.__esModule = !0;
      var r,
        i = n(120),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.default =
        o.default ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        };
    },
    ,
    function (e, t, n) {
      var r = n(14),
        i = n(137),
        o = n(56),
        a = n(58)('IE_PROTO'),
        s = function () {},
        c = function () {
          var e,
            t = n(64)('iframe'),
            r = o.length;
          for (
            t.style.display = 'none',
              n(88).appendChild(t),
              t.src = 'javascript:',
              (e = t.contentWindow.document).open(),
              e.write('<script>document.F=Object</script>'),
              e.close(),
              c = e.F;
            r--;

          )
            delete c.prototype[o[r]];
          return c();
        };
      e.exports =
        Object.create ||
        function (e, t) {
          var n;
          return (
            null !== e
              ? ((s.prototype = r(e)), (n = new s()), (s.prototype = null), (n[a] = e))
              : (n = c()),
            void 0 === t ? n : i(n, t)
          );
        };
    },
    function (e, t, n) {
      var r = n(61),
        i = Math.min;
      e.exports = function (e) {
        return e > 0 ? i(r(e), 9007199254740991) : 0;
      };
    },
    ,
    ,
    ,
    function (e, t, n) {
      var r = n(39),
        i = n(34),
        o = n(26),
        a = n(59),
        s = n(22),
        c = n(77),
        u = Object.getOwnPropertyDescriptor;
      t.f = n(18)
        ? u
        : function (e, t) {
            if (((e = o(e)), (t = a(t, !0)), c))
              try {
                return u(e, t);
              } catch (e) {}
            if (s(e, t)) return i(!r.f.call(e, t), e[t]);
          };
    },
    function (e, t, n) {
      var r = n(75),
        i = n(56).concat('length', 'prototype');
      t.f =
        Object.getOwnPropertyNames ||
        function (e) {
          return r(e, i);
        };
    },
    function (e, t, n) {
      var r = n(38);
      e.exports = Object('z').propertyIsEnumerable(0)
        ? Object
        : function (e) {
            return 'String' == r(e) ? e.split('') : Object(e);
          };
    },
    function (e, t, n) {
      var r = n(22),
        i = n(26),
        o = n(136)(!1),
        a = n(58)('IE_PROTO');
      e.exports = function (e, t) {
        var n,
          s = i(e),
          c = 0,
          u = [];
        for (n in s) n != a && r(s, n) && u.push(n);
        for (; t.length > c; ) r(s, (n = t[c++])) && (~o(u, n) || u.push(n));
        return u;
      };
    },
    function (e, t, n) {
      e.exports = n(25);
    },
    function (e, t, n) {
      e.exports =
        !n(18) &&
        !n(29)(function () {
          return (
            7 !=
            Object.defineProperty(n(64)('div'), 'a', {
              get: function () {
                return 7;
              },
            }).a
          );
        });
    },
    function (e, t, n) {
      'use strict';
      var r = n(44),
        i = n(16),
        o = n(76),
        a = n(25),
        s = n(31),
        c = n(138),
        u = n(43),
        d = n(93),
        l = n(7)('iterator'),
        f = !([].keys && 'next' in [].keys()),
        p = function () {
          return this;
        };
      e.exports = function (e, t, n, h, m, _, v) {
        c(n, t, h);
        var g,
          y,
          E,
          T = function (e) {
            if (!f && e in S) return S[e];
            switch (e) {
              case 'keys':
              case 'values':
                return function () {
                  return new n(this, e);
                };
            }
            return function () {
              return new n(this, e);
            };
          },
          b = t + ' Iterator',
          C = 'values' == m,
          O = !1,
          S = e.prototype,
          A = S[l] || S['@@iterator'] || (m && S[m]),
          R = A || T(m),
          I = m ? (C ? T('entries') : R) : void 0,
          P = ('Array' == t && S.entries) || A;
        if (
          (P &&
            (E = d(P.call(new e()))) !== Object.prototype &&
            E.next &&
            (u(E, b, !0), r || 'function' == typeof E[l] || a(E, l, p)),
          C &&
            A &&
            'values' !== A.name &&
            ((O = !0),
            (R = function () {
              return A.call(this);
            })),
          (r && !v) || (!f && !O && S[l]) || a(S, l, R),
          (s[t] = R),
          (s[b] = p),
          m)
        )
          if (((g = { values: C ? R : T('values'), keys: _ ? R : T('keys'), entries: I }), v))
            for (y in g) y in S || o(S, y, g[y]);
          else i(i.P + i.F * (f || O), t, g);
        return g;
      };
    },
    function (e, t, n) {
      'use strict';
      var r = n(50);
      e.exports.f = function (e) {
        return new (function (e) {
          var t, n;
          (this.promise = new e(function (e, r) {
            if (void 0 !== t || void 0 !== n) throw TypeError('Bad Promise constructor');
            (t = e), (n = r);
          })),
            (this.resolve = r(t)),
            (this.reject = r(n));
        })(e);
      };
    },
    ,
    function (e, t, n) {
      var r = n(38),
        i = n(7)('toStringTag'),
        o =
          'Arguments' ==
          r(
            (function () {
              return arguments;
            })(),
          );
      e.exports = function (e) {
        var t, n, a;
        return void 0 === e
          ? 'Undefined'
          : null === e
          ? 'Null'
          : 'string' ==
            typeof (n = (function (e, t) {
              try {
                return e[t];
              } catch (e) {}
            })((t = Object(e)), i))
          ? n
          : o
          ? r(t)
          : 'Object' == (a = r(t)) && 'function' == typeof t.callee
          ? 'Arguments'
          : a;
      };
    },
    function (e, t, n) {
      var r = n(81),
        i = n(7)('iterator'),
        o = n(31);
      e.exports = n(6).getIteratorMethod = function (e) {
        if (null != e) return e[i] || e['@@iterator'] || o[r(e)];
      };
    },
    ,
    ,
    ,
    function (e, t) {
      e.exports = function (e, t) {
        var n = t.split('.');
        for (; n.length; ) {
          var r = n.shift(),
            i = !1;
          if (('?' == r[r.length - 1] && ((r = r.slice(0, -1)), (i = !0)), !(e = e[r]) && i))
            return e;
        }
        return e;
      };
    },
    function (e, t) {},
    function (e, t, n) {
      var r = n(8).document;
      e.exports = r && r.documentElement;
    },
    ,
    ,
    ,
    function (e, t) {
      e.exports = function e(t, n) {
        'use strict';
        var r,
          i,
          o = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
          a = /(^[ ]*|[ ]*$)/g,
          s = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
          c = /^0x[0-9a-f]+$/i,
          u = /^0/,
          d = function (t) {
            return (e.insensitive && ('' + t).toLowerCase()) || '' + t;
          },
          l = d(t).replace(a, '') || '',
          f = d(n).replace(a, '') || '',
          p = l.replace(o, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
          h = f.replace(o, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
          m = parseInt(l.match(c), 16) || (1 !== p.length && l.match(s) && Date.parse(l)),
          _ = parseInt(f.match(c), 16) || (m && f.match(s) && Date.parse(f)) || null;
        if (_) {
          if (m < _) return -1;
          if (m > _) return 1;
        }
        for (var v = 0, g = Math.max(p.length, h.length); v < g; v++) {
          if (
            ((r = (!(p[v] || '').match(u) && parseFloat(p[v])) || p[v] || 0),
            (i = (!(h[v] || '').match(u) && parseFloat(h[v])) || h[v] || 0),
            isNaN(r) !== isNaN(i))
          )
            return isNaN(r) ? 1 : -1;
          if ((typeof r != typeof i && ((r += ''), (i += '')), r < i)) return -1;
          if (r > i) return 1;
        }
        return 0;
      };
    },
    function (e, t, n) {
      var r = n(22),
        i = n(49),
        o = n(58)('IE_PROTO'),
        a = Object.prototype;
      e.exports =
        Object.getPrototypeOf ||
        function (e) {
          return (
            (e = i(e)),
            r(e, o)
              ? e[o]
              : 'function' == typeof e.constructor && e instanceof e.constructor
              ? e.constructor.prototype
              : e instanceof Object
              ? a
              : null
          );
        };
    },
    function (e, t, n) {
      'use strict';
      t.__esModule = !0;
      var r,
        i = n(156),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.default = function (e, t, n) {
        return (
          t in e
            ? (0, o.default)(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
            : (e[t] = n),
          e
        );
      };
    },
    ,
    ,
    function (e, t, n) {
      'use strict';
      t.__esModule = !0;
      var r,
        i = n(179),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.default = function (e) {
        return function () {
          var t = e.apply(this, arguments);
          return new o.default(function (e, n) {
            return (function r(i, a) {
              try {
                var s = t[i](a),
                  c = s.value;
              } catch (e) {
                return void n(e);
              }
              if (!s.done)
                return o.default.resolve(c).then(
                  function (e) {
                    r('next', e);
                  },
                  function (e) {
                    r('throw', e);
                  },
                );
              e(c);
            })('next');
          });
        };
      };
    },
    function (e, t, n) {
      e.exports = n(181);
    },
    function (e, t, n) {
      'use strict';
      var r = {
          link: { id: 1, heartbeat: 2, negotiateTransport: 5, initTransport: 6 },
          sync: { id: 5, sync: 1, syncTeamMembers: 2 },
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
            getNosOriginUrl: 22,
            getServerTime: 23,
            getNosAccessToken: 24,
            deleteNosAccessToken: 25,
            getNosCdnHost: 26,
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
            signalingGetChannelInfo: 15,
          },
        },
        i = {
          heartbeat: { sid: r.link.id, cid: r.link.heartbeat },
          negotiateTransport: {
            sid: r.link.id,
            cid: r.link.negotiateTransport,
            params: [
              { type: 'int', name: 'sdkVersion' },
              { type: 'Property', name: 'negotiateTransportTag' },
            ],
          },
          initTransport: {
            sid: r.link.id,
            cid: r.link.initTransport,
            params: [{ type: 'Property', name: 'initTransportTag' }],
          },
          getSimpleNosToken: {
            sid: r.misc.id,
            cid: r.misc.getSimpleNosToken,
            params: [{ type: 'int', name: 'num' }],
          },
          getNosToken: {
            sid: r.misc.id,
            cid: r.misc.getNosToken,
            params: [
              { type: 'String', name: 'responseBody' },
              { type: 'Property', name: 'nosToken', entity: 'nosToken' },
            ],
          },
          uploadSdkLogUrl: {
            sid: r.misc.id,
            cid: r.misc.uploadSdkLogUrl,
            params: [{ type: 'string', name: 'url' }],
          },
          audioToText: {
            sid: r.misc.id,
            cid: r.misc.audioToText,
            params: [{ type: 'Property', name: 'audioToText' }],
          },
          processImage: {
            sid: r.misc.id,
            cid: r.misc.processImage,
            params: [
              { type: 'String', name: 'url' },
              { type: 'PropertyArray', name: 'imageOps', entity: 'imageOp' },
            ],
          },
          getClientAntispam: {
            sid: r.misc.id,
            cid: r.misc.getClientAntispam,
            params: [{ type: 'Property', name: 'clientAntispam' }],
          },
          fileQuickTransfer: {
            sid: r.misc.id,
            cid: r.misc.fileQuickTransfer,
            params: [{ type: 'Property', name: 'fileQuickTransfer' }],
          },
          getNosOriginUrl: {
            sid: r.misc.id,
            cid: r.misc.getNosOriginUrl,
            params: [{ type: 'Property', name: 'nosFileUrlTag' }],
          },
          getServerTime: { sid: r.misc.id, cid: r.misc.getServerTime, params: [] },
          getNosAccessToken: {
            sid: r.misc.id,
            cid: r.misc.getNosAccessToken,
            params: [{ type: 'Property', name: 'nosAccessTokenTag' }],
          },
          deleteNosAccessToken: {
            sid: r.misc.id,
            cid: r.misc.deleteNosAccessToken,
            params: [{ type: 'Property', name: 'nosAccessTokenTag' }],
          },
          getNosTokenTrans: {
            sid: r.misc.id,
            cid: r.misc.getNosTokenTrans,
            params: [{ type: 'Property', name: 'transToken' }],
          },
          fetchFile: {
            sid: r.misc.id,
            cid: r.misc.fetchFile,
            params: [{ type: 'String', name: 'docId' }],
          },
          fetchFileList: {
            sid: r.misc.id,
            cid: r.misc.fetchFileList,
            params: [{ type: 'Property', name: 'fileListParam' }],
          },
          removeFile: {
            sid: r.misc.id,
            cid: r.misc.removeFile,
            params: [{ type: 'String', name: 'docId' }],
          },
          getNosCdnHost: { sid: r.misc.id, cid: r.misc.getNosCdnHost, params: [] },
          signalingCreate: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingCreate,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingDelay: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingDelay,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingClose: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingClose,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingJoin: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingJoin,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingLeave: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingLeave,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingInvite: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingInvite,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingCancel: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingCancel,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingReject: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingReject,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingAccept: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingAccept,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingControl: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingControl,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
          signalingGetChannelInfo: {
            sid: r.avSignal.id,
            cid: r.avSignal.signalingGetChannelInfo,
            params: [{ type: 'Property', name: 'avSignalTag' }],
          },
        };
      e.exports = {
        idMap: r,
        cmdConfig: i,
        packetConfig: {
          '1_2': { service: 'link', cmd: 'heartbeat' },
          '1_5': {
            service: 'link',
            cmd: 'negotiateTransport',
            response: [{ type: 'Property', name: 'negotiateTransportTag' }],
          },
          '1_6': {
            service: 'link',
            cmd: 'initTransport',
            response: [{ type: 'Property', name: 'initTransportTag' }],
          },
          '6_1': {
            service: 'misc',
            cmd: 'getSimpleNosToken',
            response: [{ type: 'PropertyArray', name: 'nosTokens', entity: 'nosToken' }],
          },
          '6_2': {
            service: 'misc',
            cmd: 'getNosToken',
            response: [{ type: 'Property', name: 'nosToken' }],
          },
          '6_3': { service: 'misc', cmd: 'notifyUploadLog' },
          '6_4': { service: 'misc', cmd: 'uploadSdkLogUrl' },
          '6_5': {
            service: 'misc',
            cmd: 'audioToText',
            response: [{ type: 'String', name: 'text' }],
          },
          '6_6': {
            service: 'misc',
            cmd: 'processImage',
            response: [{ type: 'String', name: 'url' }],
          },
          '6_7': {
            service: 'misc',
            cmd: 'getNosTokenTrans',
            response: [
              { type: 'Property', name: 'nosToken' },
              { type: 'String', name: 'docId' },
            ],
          },
          '6_8': {
            service: 'misc',
            cmd: 'notifyTransLog',
            response: [{ type: 'Property', name: 'transInfo' }],
          },
          '6_9': {
            service: 'misc',
            cmd: 'fetchFile',
            response: [{ type: 'Property', name: 'info', entity: 'transInfo' }],
          },
          '6_10': {
            service: 'misc',
            cmd: 'fetchFileList',
            response: [
              { type: 'PropertyArray', name: 'list', entity: 'transInfo' },
              { type: 'Number', name: 'totalCount' },
            ],
          },
          '6_11': {
            service: 'misc',
            cmd: 'removeFile',
            response: [{ type: 'String', name: 'res' }],
          },
          '6_17': {
            service: 'misc',
            cmd: 'getClientAntispam',
            response: [{ type: 'Property', name: 'clientAntispam' }],
          },
          '6_18': {
            service: 'misc',
            cmd: 'fileQuickTransfer',
            response: [{ type: 'Property', name: 'fileQuickTransfer' }],
          },
          '6_22': {
            service: 'misc',
            cmd: 'getNosOriginUrl',
            response: [{ type: 'Property', name: 'nosFileUrlTag' }],
          },
          '6_23': {
            service: 'misc',
            cmd: 'getServerTime',
            response: [{ type: 'Number', name: 'time' }],
          },
          '6_24': {
            service: 'misc',
            cmd: 'getNosAccessToken',
            response: [{ type: 'Property', name: 'nosAccessTokenTag' }],
          },
          '6_25': { service: 'misc', cmd: 'deleteNosAccessToken' },
          '6_26': {
            service: 'misc',
            cmd: 'getNosCdnHost',
            response: [{ type: 'Property', name: 'nosConfigTag' }],
          },
          '15_1': {
            service: 'avSignal',
            cmd: 'signalingCreate',
            response: [{ type: 'Property', name: 'avSignalTag' }],
          },
          '15_2': {
            service: 'avSignal',
            cmd: 'signalingDelay',
            response: [{ type: 'Property', name: 'avSignalTag' }],
          },
          '15_3': {
            service: 'avSignal',
            cmd: 'signalingClose',
            response: [{ type: 'Property', name: 'avSignalTag' }],
          },
          '15_4': {
            service: 'avSignal',
            cmd: 'signalingJoin',
            response: [{ type: 'Property', name: 'avSignalTag' }],
          },
          '15_5': { service: 'avSignal', cmd: 'signalingLeave', response: [] },
          '15_6': { service: 'avSignal', cmd: 'signalingInvite', response: [] },
          '15_7': { service: 'avSignal', cmd: 'signalingCancel', response: [] },
          '15_8': { service: 'avSignal', cmd: 'signalingReject', response: [] },
          '15_9': { service: 'avSignal', cmd: 'signalingAccept', response: [] },
          '15_10': { service: 'avSignal', cmd: 'signalingControl', response: [] },
          '15_11': {
            service: 'avSignal',
            cmd: 'signalingNotify',
            response: [{ type: 'Property', name: 'avSignalTag' }],
          },
          '15_12': {
            service: 'avSignal',
            cmd: 'signalingMutilClientSyncNotify',
            response: [{ type: 'Property', name: 'avSignalTag' }],
          },
          '15_13': {
            service: 'avSignal',
            cmd: 'signalingUnreadMessageSyncNotify',
            response: [{ type: 'PropertyArray', name: 'avSignalTag' }],
          },
          '15_14': {
            service: 'avSignal',
            cmd: 'signalingChannelsSyncNotify',
            response: [{ type: 'PropertyArray', name: 'avSignalTag' }],
          },
          '15_15': {
            service: 'avSignal',
            cmd: 'signalingGetChannelInfo',
            response: [{ type: 'Property', name: 'avSignalTag' }],
          },
        },
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i = n(9),
        o = (r = i) && r.__esModule ? r : { default: r };
      var a = {},
        s = (window.document.documentElement, window.navigator.userAgent.toLowerCase()),
        c = [
          'googletv',
          'viera',
          'smarttv',
          'internet.tv',
          'netcast',
          'nettv',
          'appletv',
          'boxee',
          'kylo',
          'roku',
          'dlnadoc',
          'pov_tv',
          'hbbtv',
          'ce-html',
        ];
      function u(e, t) {
        return -1 !== e.indexOf(t);
      }
      function d(e) {
        return u(s, e);
      }
      function l(e) {
        for (var t = 0; t < e.length; t++) if (a[e[t]]()) return e[t];
        return 'unknown';
      }
      function f(e, t, n) {
        var r = e.match(t);
        return r && r.length >= n && parseInt(r[n], 10);
      }
      (a.macos = function () {
        return d('mac');
      }),
        (a.ios = function () {
          return a.iphone() || a.ipod() || a.ipad();
        }),
        (a.iphone = function () {
          return !a.windows() && d('iphone');
        }),
        (a.ipod = function () {
          return d('ipod');
        }),
        (a.ipad = function () {
          return d('ipad');
        }),
        (a.android = function () {
          return !a.windows() && d('android');
        }),
        (a.androidPhone = function () {
          return a.android() && d('mobile');
        }),
        (a.androidTablet = function () {
          return a.android() && !d('mobile');
        }),
        (a.blackberry = function () {
          return d('blackberry') || d('bb10') || d('rim');
        }),
        (a.blackberryPhone = function () {
          return a.blackberry() && !d('tablet');
        }),
        (a.blackberryTablet = function () {
          return a.blackberry() && d('tablet');
        }),
        (a.windows = function () {
          return d('windows');
        }),
        (a.windowsPhone = function () {
          return a.windows() && d('phone');
        }),
        (a.windowsTablet = function () {
          return a.windows() && d('touch') && !a.windowsPhone();
        }),
        (a.fxos = function () {
          return (d('(mobile') || d('(tablet')) && d(' rv:');
        }),
        (a.fxosPhone = function () {
          return a.fxos() && d('mobile');
        }),
        (a.fxosTablet = function () {
          return a.fxos() && d('tablet');
        }),
        (a.meego = function () {
          return d('meego');
        }),
        (a.cordova = function () {
          return window.cordova && 'file:' === location.protocol;
        }),
        (a.nodeWebkit = function () {
          return 'object' === (0, o.default)(window.process);
        }),
        (a.mobile = function () {
          return (
            a.androidPhone() ||
            a.iphone() ||
            a.ipod() ||
            a.windowsPhone() ||
            a.blackberryPhone() ||
            a.fxosPhone() ||
            a.meego()
          );
        }),
        (a.tablet = function () {
          return (
            a.ipad() ||
            a.androidTablet() ||
            a.blackberryTablet() ||
            a.windowsTablet() ||
            a.fxosTablet()
          );
        }),
        (a.h5 = function () {
          return a.tablet() || a.mobile();
        }),
        (a.desktop = function () {
          return !a.tablet() && !a.mobile();
        }),
        (a.television = function () {
          for (var e = 0; e < c.length; ) {
            if (d(c[e])) return !0;
            e++;
          }
          return !1;
        }),
        (a.portrait = function () {
          return screen.orientation &&
            Object.prototype.hasOwnProperty.call(window, 'onorientationchange')
            ? u(screen.orientation.type, 'portrait')
            : window.innerHeight / window.innerWidth > 1;
        }),
        (a.landscape = function () {
          return screen.orientation &&
            Object.prototype.hasOwnProperty.call(window, 'onorientationchange')
            ? u(screen.orientation.type, 'landscape')
            : window.innerHeight / window.innerWidth < 1;
        }),
        (a.type = l(['mobile', 'tablet', 'desktop'])),
        (a.os = l([
          'ios',
          'iphone',
          'ipad',
          'ipod',
          'android',
          'blackberry',
          'macos',
          'windows',
          'fxos',
          'meego',
          'television',
        ])),
        (a.browser = (function () {
          var e = window && window.navigator,
            t = { ua: null, version: null, UIVersion: null };
          if ('undefined' == typeof window || !window.navigator)
            return (t.ua = 'Not a browser.'), t;
          if (e.mediaDevices && e.userAgent.match(/Edge\/(\d+).(\d+)$/))
            (t.ua = 'edge'),
              (t.version = f(e.userAgent, /Edge\/(\d+).(\d+)$/, 2)),
              (t.UIVersion = e.userAgent.match(/Edge\/([\d.]+)/)[1]);
          else if (e.mozGetUserMedia)
            (t.ua = 'firefox'),
              (t.version = f(e.userAgent, /Firefox\/(\d+)\./, 1)),
              (t.UIVersion = e.userAgent.match(/Firefox\/([\d.]+)/)[1]);
          else if (e.webkitGetUserMedia && window.webkitRTCPeerConnection)
            if (/micromessenger/.test(s))
              (t.ua = 'weixin'),
                (t.version = f(e.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)),
                (t.UIVersion =
                  e.userAgent.match(/Chrom(e|ium)\/([\d.]+)/) &&
                  e.userAgent.match(/Chrom(e|ium)\/([\d.]+)/).length > 1 &&
                  e.userAgent.match(/Chrom(e|ium)\/([\d.]+)/)[2]);
            else if (e.userAgent.match(/(OPR|Opera).([\d.]+)/))
              (t.ua = 'opera'),
                (t.version = f(e.userAgent, /O(PR|pera)\/(\d+)\./, 2)),
                (t.UIVersion = e.userAgent.match(/O(PR|pera)\/([\d.]+)/)[2]);
            else {
              if (!/Chrome/gi.test(e.userAgent)) return (t.ua = 'unknown'), t;
              (t.ua = 'chrome'),
                (t.version = f(e.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)),
                (t.UIVersion =
                  e.userAgent.match(/Chrom(e|ium)\/([\d.]+)/) &&
                  e.userAgent.match(/Chrom(e|ium)\/([\d.]+)/).length > 1 &&
                  e.userAgent.match(/Chrom(e|ium)\/([\d.]+)/)[2]);
            }
          else {
            if (
              !(
                (!e.webkitGetUserMedia && e.userAgent.match(/AppleWebKit\/([0-9]+)\./)) ||
                (e.webkitGetUserMedia && !e.webkitRTCPeerConnection)
              )
            )
              return (t.ua = 'unknown'), t;
            if (/micromessenger/.test(s))
              (t.ua = 'weixin'),
                (t.version = f(s, /micromessenger\/(\d+)\./, 2)),
                (t.UIVersion = 7);
            else {
              if (!e.userAgent.match(/Version\/(\d+).(\d+)/)) return (t.ua = 'unknown'), t;
              (t.ua = 'safari'),
                (t.version = e.userAgent.match(/Version\/([\d]+)/)[1]),
                (t.UIVersion = e.userAgent.match(/Version\/([\d.]+)/)[1]);
            }
          }
          return t;
        })()),
        (a.browser.greaterThanOrEqualToSafari_12_1_1 = function () {
          if ('safari' !== a.browser.ua || !a.browser.UIVersion) return !1;
          var e = a.browser.UIVersion.split('.');
          return 1 === e.length
            ? !(e[0] < 12)
            : 2 === e.length
            ? e[0] > 12 || (!(e[0] < 12) && !(e[1] < 1))
            : e[0] > 12 || e[0] < 12 || (!(e[1] < 1) && !(e[2] < 1));
        }),
        (a.browser.lessThanSafari_12_1_1 = function () {
          return (
            !('safari' !== a.browser.ua || !a.browser.UIVersion) &&
            !a.browser.greaterThanOrEqualToSafari_12_1_1()
          );
        }),
        (a.browser.safari_12_1 = function () {
          if ('safari' !== a.browser.ua || !a.browser.UIVersion) return !1;
          var e = a.browser.UIVersion.split('.');
          return 2 == e.length && 12 == e[0] && 1 == e[1];
        }),
        (a.browser.safari_12_0_1 = function () {
          if ('safari' !== a.browser.ua || !a.browser.UIVersion) return !1;
          var e = a.browser.UIVersion.split('.');
          return !(e.length < 3) && 12 === e[0] && 0 === e[1] && 1 === e[2];
        }),
        (a.orientation = l(['portrait', 'landscape'])),
        (t.default = a),
        (e.exports = t.default);
    },
    function (e, t, n) {
      var r = n(14),
        i = n(23),
        o = n(79);
      e.exports = function (e, t) {
        if ((r(e), i(t) && t.constructor === e)) return t;
        var n = o.f(e);
        return (0, n.resolve)(t), n.promise;
      };
    },
    function (e, t) {
      e.exports = function (e) {
        try {
          return { e: !1, v: e() };
        } catch (e) {
          return { e: !0, v: e };
        }
      };
    },
    function (e, t, n) {
      var r,
        i,
        o,
        a = n(36),
        s = n(174),
        c = n(88),
        u = n(64),
        d = n(8),
        l = d.process,
        f = d.setImmediate,
        p = d.clearImmediate,
        h = d.MessageChannel,
        m = d.Dispatch,
        _ = 0,
        v = {},
        g = function () {
          var e = +this;
          if (v.hasOwnProperty(e)) {
            var t = v[e];
            delete v[e], t();
          }
        },
        y = function (e) {
          g.call(e.data);
        };
      (f && p) ||
        ((f = function (e) {
          for (var t = [], n = 1; arguments.length > n; ) t.push(arguments[n++]);
          return (
            (v[++_] = function () {
              s('function' == typeof e ? e : Function(e), t);
            }),
            r(_),
            _
          );
        }),
        (p = function (e) {
          delete v[e];
        }),
        'process' == n(38)(l)
          ? (r = function (e) {
              l.nextTick(a(g, e, 1));
            })
          : m && m.now
          ? (r = function (e) {
              m.now(a(g, e, 1));
            })
          : h
          ? ((o = (i = new h()).port2), (i.port1.onmessage = y), (r = a(o.postMessage, o, 1)))
          : d.addEventListener && 'function' == typeof postMessage && !d.importScripts
          ? ((r = function (e) {
              d.postMessage(e + '', '*');
            }),
            d.addEventListener('message', y, !1))
          : (r =
              'onreadystatechange' in u('script')
                ? function (e) {
                    c.appendChild(u('script')).onreadystatechange = function () {
                      c.removeChild(this), g.call(e);
                    };
                  }
                : function (e) {
                    setTimeout(a(g, e, 1), 0);
                  })),
        (e.exports = { set: f, clear: p });
    },
    function (e, t, n) {
      var r = n(14),
        i = n(50),
        o = n(7)('species');
      e.exports = function (e, t) {
        var n,
          a = r(e).constructor;
        return void 0 === a || null == (n = r(a)[o]) ? t : i(n);
      };
    },
    function (e, t, n) {
      var r = n(7)('iterator'),
        i = !1;
      try {
        var o = [7][r]();
        (o.return = function () {
          i = !0;
        }),
          Array.from(o, function () {
            throw 2;
          });
      } catch (e) {}
      e.exports = function (e, t) {
        if (!t && !i) return !1;
        var n = !1;
        try {
          var o = [7],
            a = o[r]();
          (a.next = function () {
            return { done: (n = !0) };
          }),
            (o[r] = function () {
              return a;
            }),
            e(o);
        } catch (e) {}
        return n;
      };
    },
    function (e, t, n) {
      var r = n(31),
        i = n(7)('iterator'),
        o = Array.prototype;
      e.exports = function (e) {
        return void 0 !== e && (r.Array === e || o[i] === e);
      };
    },
    function (e, t, n) {
      var r = n(14);
      e.exports = function (e, t, n, i) {
        try {
          return i ? t(r(n)[0], n[1]) : t(n);
        } catch (t) {
          var o = e.return;
          throw (void 0 !== o && r(o.call(e)), t);
        }
      };
    },
    ,
    ,
    ,
    function (e, t, n) {
      var r = n(324),
        i = n(323);
      (t.write = i),
        (t.parse = r.parse),
        (t.parseFmtpConfig = r.parseFmtpConfig),
        (t.parseParams = r.parseParams),
        (t.parsePayloads = r.parsePayloads),
        (t.parseRemoteCandidates = r.parseRemoteCandidates),
        (t.parseImageAttributes = r.parseImageAttributes),
        (t.parseSimulcastStreamList = r.parseSimulcastStreamList);
    },
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      'use strict';
      var r = n(41),
        i = n(53),
        o = n(39),
        a = n(49),
        s = n(74),
        c = Object.assign;
      e.exports =
        !c ||
        n(29)(function () {
          var e = {},
            t = {},
            n = Symbol(),
            r = 'abcdefghijklmnopqrst';
          return (
            (e[n] = 7),
            r.split('').forEach(function (e) {
              t[e] = e;
            }),
            7 != c({}, e)[n] || Object.keys(c({}, t)).join('') != r
          );
        })
          ? function (e, t) {
              for (var n = a(e), c = arguments.length, u = 1, d = i.f, l = o.f; c > u; )
                for (
                  var f,
                    p = s(arguments[u++]),
                    h = d ? r(p).concat(d(p)) : r(p),
                    m = h.length,
                    _ = 0;
                  m > _;

                )
                  l.call(p, (f = h[_++])) && (n[f] = p[f]);
              return n;
            }
          : c;
    },
    function (e, t, n) {
      var r = n(16);
      r(r.S + r.F, 'Object', { assign: n(117) });
    },
    function (e, t, n) {
      n(118), (e.exports = n(6).Object.assign);
    },
    function (e, t, n) {
      e.exports = { default: n(119), __esModule: !0 };
    },
    ,
    function (e, t, n) {
      'use strict';
      var r = n(5);
      'undefined' != typeof window &&
        (window.console ||
          r.isWeixinApp ||
          (window.console = {
            log: function () {},
            info: function () {},
            warn: function () {},
            error: function () {},
          }));
    },
    function (e, t, n) {
      n(54)('observable');
    },
    function (e, t, n) {
      n(54)('asyncIterator');
    },
    function (e, t, n) {
      var r = n(26),
        i = n(73).f,
        o = {}.toString,
        a =
          'object' == typeof window && window && Object.getOwnPropertyNames
            ? Object.getOwnPropertyNames(window)
            : [];
      e.exports.f = function (e) {
        return a && '[object Window]' == o.call(e)
          ? (function (e) {
              try {
                return i(e);
              } catch (e) {
                return a.slice();
              }
            })(e)
          : i(r(e));
      };
    },
    function (e, t, n) {
      var r = n(38);
      e.exports =
        Array.isArray ||
        function (e) {
          return 'Array' == r(e);
        };
    },
    function (e, t, n) {
      var r = n(41),
        i = n(53),
        o = n(39);
      e.exports = function (e) {
        var t = r(e),
          n = i.f;
        if (n)
          for (var a, s = n(e), c = o.f, u = 0; s.length > u; )
            c.call(e, (a = s[u++])) && t.push(a);
        return t;
      };
    },
    function (e, t, n) {
      var r = n(40)('meta'),
        i = n(23),
        o = n(22),
        a = n(15).f,
        s = 0,
        c =
          Object.isExtensible ||
          function () {
            return !0;
          },
        u = !n(29)(function () {
          return c(Object.preventExtensions({}));
        }),
        d = function (e) {
          a(e, r, { value: { i: 'O' + ++s, w: {} } });
        },
        l = (e.exports = {
          KEY: r,
          NEED: !1,
          fastKey: function (e, t) {
            if (!i(e)) return 'symbol' == typeof e ? e : ('string' == typeof e ? 'S' : 'P') + e;
            if (!o(e, r)) {
              if (!c(e)) return 'F';
              if (!t) return 'E';
              d(e);
            }
            return e[r].i;
          },
          getWeak: function (e, t) {
            if (!o(e, r)) {
              if (!c(e)) return !0;
              if (!t) return !1;
              d(e);
            }
            return e[r].w;
          },
          onFreeze: function (e) {
            return u && l.NEED && c(e) && !o(e, r) && d(e), e;
          },
        });
    },
    function (e, t, n) {
      'use strict';
      var r = n(8),
        i = n(22),
        o = n(18),
        a = n(16),
        s = n(76),
        c = n(128).KEY,
        u = n(29),
        d = n(57),
        l = n(43),
        f = n(40),
        p = n(7),
        h = n(55),
        m = n(54),
        _ = n(127),
        v = n(126),
        g = n(14),
        y = n(23),
        E = n(26),
        T = n(59),
        b = n(34),
        C = n(67),
        O = n(125),
        S = n(72),
        A = n(15),
        R = n(41),
        I = S.f,
        P = A.f,
        w = O.f,
        N = r.Symbol,
        D = r.JSON,
        k = D && D.stringify,
        L = p('_hidden'),
        M = p('toPrimitive'),
        x = {}.propertyIsEnumerable,
        U = d('symbol-registry'),
        F = d('symbols'),
        j = d('op-symbols'),
        V = Object.prototype,
        B = 'function' == typeof N,
        W = r.QObject,
        G = !W || !W.prototype || !W.prototype.findChild,
        H =
          o &&
          u(function () {
            return (
              7 !=
              C(
                P({}, 'a', {
                  get: function () {
                    return P(this, 'a', { value: 7 }).a;
                  },
                }),
              ).a
            );
          })
            ? function (e, t, n) {
                var r = I(V, t);
                r && delete V[t], P(e, t, n), r && e !== V && P(V, t, r);
              }
            : P,
        Y = function (e) {
          var t = (F[e] = C(N.prototype));
          return (t._k = e), t;
        },
        K =
          B && 'symbol' == typeof N.iterator
            ? function (e) {
                return 'symbol' == typeof e;
              }
            : function (e) {
                return e instanceof N;
              },
        Q = function (e, t, n) {
          return (
            e === V && Q(j, t, n),
            g(e),
            (t = T(t, !0)),
            g(n),
            i(F, t)
              ? (n.enumerable
                  ? (i(e, L) && e[L][t] && (e[L][t] = !1), (n = C(n, { enumerable: b(0, !1) })))
                  : (i(e, L) || P(e, L, b(1, {})), (e[L][t] = !0)),
                H(e, t, n))
              : P(e, t, n)
          );
        },
        q = function (e, t) {
          g(e);
          for (var n, r = _((t = E(t))), i = 0, o = r.length; o > i; ) Q(e, (n = r[i++]), t[n]);
          return e;
        },
        J = function (e) {
          var t = x.call(this, (e = T(e, !0)));
          return (
            !(this === V && i(F, e) && !i(j, e)) &&
            (!(t || !i(this, e) || !i(F, e) || (i(this, L) && this[L][e])) || t)
          );
        },
        z = function (e, t) {
          if (((e = E(e)), (t = T(t, !0)), e !== V || !i(F, t) || i(j, t))) {
            var n = I(e, t);
            return !n || !i(F, t) || (i(e, L) && e[L][t]) || (n.enumerable = !0), n;
          }
        },
        X = function (e) {
          for (var t, n = w(E(e)), r = [], o = 0; n.length > o; )
            i(F, (t = n[o++])) || t == L || t == c || r.push(t);
          return r;
        },
        $ = function (e) {
          for (var t, n = e === V, r = w(n ? j : E(e)), o = [], a = 0; r.length > a; )
            !i(F, (t = r[a++])) || (n && !i(V, t)) || o.push(F[t]);
          return o;
        };
      B ||
        (s(
          (N = function () {
            if (this instanceof N) throw TypeError('Symbol is not a constructor!');
            var e = f(arguments.length > 0 ? arguments[0] : void 0),
              t = function (n) {
                this === V && t.call(j, n),
                  i(this, L) && i(this[L], e) && (this[L][e] = !1),
                  H(this, e, b(1, n));
              };
            return o && G && H(V, e, { configurable: !0, set: t }), Y(e);
          }).prototype,
          'toString',
          function () {
            return this._k;
          },
        ),
        (S.f = z),
        (A.f = Q),
        (n(73).f = O.f = X),
        (n(39).f = J),
        (n(53).f = $),
        o && !n(44) && s(V, 'propertyIsEnumerable', J, !0),
        (h.f = function (e) {
          return Y(p(e));
        })),
        a(a.G + a.W + a.F * !B, { Symbol: N });
      for (
        var Z = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(
            ',',
          ),
          ee = 0;
        Z.length > ee;

      )
        p(Z[ee++]);
      for (var te = R(p.store), ne = 0; te.length > ne; ) m(te[ne++]);
      a(a.S + a.F * !B, 'Symbol', {
        for: function (e) {
          return i(U, (e += '')) ? U[e] : (U[e] = N(e));
        },
        keyFor: function (e) {
          if (!K(e)) throw TypeError(e + ' is not a symbol!');
          for (var t in U) if (U[t] === e) return t;
        },
        useSetter: function () {
          G = !0;
        },
        useSimple: function () {
          G = !1;
        },
      }),
        a(a.S + a.F * !B, 'Object', {
          create: function (e, t) {
            return void 0 === t ? C(e) : q(C(e), t);
          },
          defineProperty: Q,
          defineProperties: q,
          getOwnPropertyDescriptor: z,
          getOwnPropertyNames: X,
          getOwnPropertySymbols: $,
        }),
        D &&
          a(
            a.S +
              a.F *
                (!B ||
                  u(function () {
                    var e = N();
                    return '[null]' != k([e]) || '{}' != k({ a: e }) || '{}' != k(Object(e));
                  })),
            'JSON',
            {
              stringify: function (e) {
                for (var t, n, r = [e], i = 1; arguments.length > i; ) r.push(arguments[i++]);
                if (((n = t = r[1]), (y(t) || void 0 !== e) && !K(e)))
                  return (
                    v(t) ||
                      (t = function (e, t) {
                        if (('function' == typeof n && (t = n.call(this, e, t)), !K(t))) return t;
                      }),
                    (r[1] = t),
                    k.apply(D, r)
                  );
              },
            },
          ),
        N.prototype[M] || n(25)(N.prototype, M, N.prototype.valueOf),
        l(N, 'Symbol'),
        l(Math, 'Math', !0),
        l(r.JSON, 'JSON', !0);
    },
    function (e, t, n) {
      n(129), n(87), n(124), n(123), (e.exports = n(6).Symbol);
    },
    function (e, t, n) {
      e.exports = { default: n(130), __esModule: !0 };
    },
    function (e, t) {
      e.exports = function (e, t) {
        return { value: t, done: !!e };
      };
    },
    function (e, t) {
      e.exports = function () {};
    },
    function (e, t, n) {
      'use strict';
      var r = n(133),
        i = n(132),
        o = n(31),
        a = n(26);
      (e.exports = n(78)(
        Array,
        'Array',
        function (e, t) {
          (this._t = a(e)), (this._i = 0), (this._k = t);
        },
        function () {
          var e = this._t,
            t = this._k,
            n = this._i++;
          return !e || n >= e.length
            ? ((this._t = void 0), i(1))
            : i(0, 'keys' == t ? n : 'values' == t ? e[n] : [n, e[n]]);
        },
        'values',
      )),
        (o.Arguments = o.Array),
        r('keys'),
        r('values'),
        r('entries');
    },
    function (e, t, n) {
      var r = n(61),
        i = Math.max,
        o = Math.min;
      e.exports = function (e, t) {
        return (e = r(e)) < 0 ? i(e + t, 0) : o(e, t);
      };
    },
    function (e, t, n) {
      var r = n(26),
        i = n(68),
        o = n(135);
      e.exports = function (e) {
        return function (t, n, a) {
          var s,
            c = r(t),
            u = i(c.length),
            d = o(a, u);
          if (e && n != n) {
            for (; u > d; ) if ((s = c[d++]) != s) return !0;
          } else for (; u > d; d++) if ((e || d in c) && c[d] === n) return e || d || 0;
          return !e && -1;
        };
      };
    },
    function (e, t, n) {
      var r = n(15),
        i = n(14),
        o = n(41);
      e.exports = n(18)
        ? Object.defineProperties
        : function (e, t) {
            i(e);
            for (var n, a = o(t), s = a.length, c = 0; s > c; ) r.f(e, (n = a[c++]), t[n]);
            return e;
          };
    },
    function (e, t, n) {
      'use strict';
      var r = n(67),
        i = n(34),
        o = n(43),
        a = {};
      n(25)(a, n(7)('iterator'), function () {
        return this;
      }),
        (e.exports = function (e, t, n) {
          (e.prototype = r(a, { next: i(1, n) })), o(e, t + ' Iterator');
        });
    },
    function (e, t, n) {
      var r = n(61),
        i = n(60);
      e.exports = function (e) {
        return function (t, n) {
          var o,
            a,
            s = String(i(t)),
            c = r(n),
            u = s.length;
          return c < 0 || c >= u
            ? e
              ? ''
              : void 0
            : (o = s.charCodeAt(c)) < 55296 ||
              o > 56319 ||
              c + 1 === u ||
              (a = s.charCodeAt(c + 1)) < 56320 ||
              a > 57343
            ? e
              ? s.charAt(c)
              : o
            : e
            ? s.slice(c, c + 2)
            : a - 56320 + ((o - 55296) << 10) + 65536;
        };
      };
    },
    function (e, t, n) {
      n(42), n(48), (e.exports = n(55).f('iterator'));
    },
    function (e, t, n) {
      e.exports = { default: n(140), __esModule: !0 };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(312);
      Object.defineProperty(t, 'VIDEO_QUALITY', {
        enumerable: !0,
        get: function () {
          return r.VIDEO_QUALITY;
        },
      }),
        Object.defineProperty(t, 'VIDEO_QUALITY_REV', {
          enumerable: !0,
          get: function () {
            return r.VIDEO_QUALITY_REV;
          },
        }),
        Object.defineProperty(t, 'validateVideoQuality', {
          enumerable: !0,
          get: function () {
            return r.validateVideoQuality;
          },
        });
      var i = n(311);
      Object.defineProperty(t, 'VIDEO_FRAME_RATE', {
        enumerable: !0,
        get: function () {
          return i.VIDEO_FRAME_RATE;
        },
      }),
        Object.defineProperty(t, 'VIDEO_FRAME_RATE_REV', {
          enumerable: !0,
          get: function () {
            return i.VIDEO_FRAME_RATE_REV;
          },
        }),
        Object.defineProperty(t, 'validateVideoFrameRate', {
          enumerable: !0,
          get: function () {
            return i.validateVideoFrameRate;
          },
        });
      var o = n(310);
      Object.defineProperty(t, 'ENCRYPTION_ALGORITHM_MODE', {
        enumerable: !0,
        get: function () {
          return o.ENCRYPTION_ALGORITHM_MODE;
        },
      });
      var a = n(309);
      Object.defineProperty(t, 'CONTROL_TYPE', {
        enumerable: !0,
        get: function () {
          return a.CONTROL_TYPE;
        },
      });
      var s = n(308);
      Object.defineProperty(t, 'CONFIG_MAP', {
        enumerable: !0,
        get: function () {
          return s.CONFIG_MAP;
        },
      });
      var c = n(307);
      Object.defineProperty(t, 'DEVICE_TYPE', {
        enumerable: !0,
        get: function () {
          return c.DEVICE_TYPE;
        },
      }),
        Object.defineProperty(t, 'DEVICE_TYPE_REV', {
          enumerable: !0,
          get: function () {
            return c.DEVICE_TYPE_REV;
          },
        });
      var u = n(306);
      Object.defineProperty(t, 'NETCALL_TYPE', {
        enumerable: !0,
        get: function () {
          return u.NETCALL_TYPE;
        },
      });
      var d = n(305);
      Object.defineProperty(t, 'SPLIT_MODE', {
        enumerable: !0,
        get: function () {
          return d.SPLIT_MODE;
        },
      });
      var l = n(304);
      Object.defineProperty(t, 'MIX_VIDEO_MODE', {
        enumerable: !0,
        get: function () {
          return l.MIX_VIDEO_MODE;
        },
      });
      var f = n(303);
      Object.defineProperty(t, 'ROLE_FOR_MEETING', {
        enumerable: !0,
        get: function () {
          return f.ROLE_FOR_MEETING;
        },
      });
      var p = n(302);
      Object.defineProperty(t, 'SESSION_MODE', {
        enumerable: !0,
        get: function () {
          return p.SESSION_MODE;
        },
      });
      var h = n(301);
      Object.defineProperty(t, 'DECTECT_RESULT_TYPE', {
        enumerable: !0,
        get: function () {
          return h.DECTECT_RESULT_TYPE;
        },
      });
      var m = n(300);
      Object.defineProperty(t, 'DECTECT_TYPE', {
        enumerable: !0,
        get: function () {
          return m.DECTECT_TYPE;
        },
      }),
        Object.defineProperty(t, 'DECTECT_TYPE_REV', {
          enumerable: !0,
          get: function () {
            return m.DECTECT_TYPE_REV;
          },
        });
      var _ = n(299);
      Object.defineProperty(t, 'VIDEO_ENCODE_MODE', {
        enumerable: !0,
        get: function () {
          return _.VIDEO_ENCODE_MODE;
        },
      });
      var v = n(298);
      Object.defineProperty(t, 'SCALE_TYPE', {
        enumerable: !0,
        get: function () {
          return v.SCALE_TYPE;
        },
      });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = s(n(332)),
        i = s(n(331)),
        o = s(n(330)),
        a = s(n(327));
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      (t.default = {
        ApiInvokeData: function (e) {
          return new r.default(e);
        },
        LogData: function (e) {
          return new i.default(e);
        },
        FormatDataFromStats: function (e) {
          return new o.default(e);
        },
        RawDataFromStats: function (e) {
          return new a.default(e);
        },
      }),
        (e.exports = t.default);
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      'use strict';
      t.__esModule = !0;
      var r = o(n(188)),
        i = o(n(185));
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = (function () {
        return function (e, t) {
          if (Array.isArray(e)) return e;
          if ((0, r.default)(Object(e)))
            return (function (e, t) {
              var n = [],
                r = !0,
                o = !1,
                a = void 0;
              try {
                for (
                  var s, c = (0, i.default)(e);
                  !(r = (s = c.next()).done) && (n.push(s.value), !t || n.length !== t);
                  r = !0
                );
              } catch (e) {
                (o = !0), (a = e);
              } finally {
                try {
                  !r && c.return && c.return();
                } finally {
                  if (o) throw a;
                }
              }
              return n;
            })(e, t);
          throw new TypeError('Invalid attempt to destructure non-iterable instance');
        };
      })();
    },
    ,
    ,
    ,
    function (e, t, n) {
      var r, i, o, a, s;
      (r = n(329)),
        (i = n(209).utf8),
        (o = n(328)),
        (a = n(209).bin),
        ((s = function (e, t) {
          e.constructor == String
            ? (e = t && 'binary' === t.encoding ? a.stringToBytes(e) : i.stringToBytes(e))
            : o(e)
            ? (e = Array.prototype.slice.call(e, 0))
            : Array.isArray(e) || (e = e.toString());
          for (
            var n = r.bytesToWords(e),
              c = 8 * e.length,
              u = 1732584193,
              d = -271733879,
              l = -1732584194,
              f = 271733878,
              p = 0;
            p < n.length;
            p++
          )
            n[p] =
              (16711935 & ((n[p] << 8) | (n[p] >>> 24))) |
              (4278255360 & ((n[p] << 24) | (n[p] >>> 8)));
          (n[c >>> 5] |= 128 << c % 32), (n[14 + (((c + 64) >>> 9) << 4)] = c);
          var h = s._ff,
            m = s._gg,
            _ = s._hh,
            v = s._ii;
          for (p = 0; p < n.length; p += 16) {
            var g = u,
              y = d,
              E = l,
              T = f;
            (d = v(
              (d = v(
                (d = v(
                  (d = v(
                    (d = _(
                      (d = _(
                        (d = _(
                          (d = _(
                            (d = m(
                              (d = m(
                                (d = m(
                                  (d = m(
                                    (d = h(
                                      (d = h(
                                        (d = h(
                                          (d = h(
                                            d,
                                            (l = h(
                                              l,
                                              (f = h(
                                                f,
                                                (u = h(u, d, l, f, n[p + 0], 7, -680876936)),
                                                d,
                                                l,
                                                n[p + 1],
                                                12,
                                                -389564586,
                                              )),
                                              u,
                                              d,
                                              n[p + 2],
                                              17,
                                              606105819,
                                            )),
                                            f,
                                            u,
                                            n[p + 3],
                                            22,
                                            -1044525330,
                                          )),
                                          (l = h(
                                            l,
                                            (f = h(
                                              f,
                                              (u = h(u, d, l, f, n[p + 4], 7, -176418897)),
                                              d,
                                              l,
                                              n[p + 5],
                                              12,
                                              1200080426,
                                            )),
                                            u,
                                            d,
                                            n[p + 6],
                                            17,
                                            -1473231341,
                                          )),
                                          f,
                                          u,
                                          n[p + 7],
                                          22,
                                          -45705983,
                                        )),
                                        (l = h(
                                          l,
                                          (f = h(
                                            f,
                                            (u = h(u, d, l, f, n[p + 8], 7, 1770035416)),
                                            d,
                                            l,
                                            n[p + 9],
                                            12,
                                            -1958414417,
                                          )),
                                          u,
                                          d,
                                          n[p + 10],
                                          17,
                                          -42063,
                                        )),
                                        f,
                                        u,
                                        n[p + 11],
                                        22,
                                        -1990404162,
                                      )),
                                      (l = h(
                                        l,
                                        (f = h(
                                          f,
                                          (u = h(u, d, l, f, n[p + 12], 7, 1804603682)),
                                          d,
                                          l,
                                          n[p + 13],
                                          12,
                                          -40341101,
                                        )),
                                        u,
                                        d,
                                        n[p + 14],
                                        17,
                                        -1502002290,
                                      )),
                                      f,
                                      u,
                                      n[p + 15],
                                      22,
                                      1236535329,
                                    )),
                                    (l = m(
                                      l,
                                      (f = m(
                                        f,
                                        (u = m(u, d, l, f, n[p + 1], 5, -165796510)),
                                        d,
                                        l,
                                        n[p + 6],
                                        9,
                                        -1069501632,
                                      )),
                                      u,
                                      d,
                                      n[p + 11],
                                      14,
                                      643717713,
                                    )),
                                    f,
                                    u,
                                    n[p + 0],
                                    20,
                                    -373897302,
                                  )),
                                  (l = m(
                                    l,
                                    (f = m(
                                      f,
                                      (u = m(u, d, l, f, n[p + 5], 5, -701558691)),
                                      d,
                                      l,
                                      n[p + 10],
                                      9,
                                      38016083,
                                    )),
                                    u,
                                    d,
                                    n[p + 15],
                                    14,
                                    -660478335,
                                  )),
                                  f,
                                  u,
                                  n[p + 4],
                                  20,
                                  -405537848,
                                )),
                                (l = m(
                                  l,
                                  (f = m(
                                    f,
                                    (u = m(u, d, l, f, n[p + 9], 5, 568446438)),
                                    d,
                                    l,
                                    n[p + 14],
                                    9,
                                    -1019803690,
                                  )),
                                  u,
                                  d,
                                  n[p + 3],
                                  14,
                                  -187363961,
                                )),
                                f,
                                u,
                                n[p + 8],
                                20,
                                1163531501,
                              )),
                              (l = m(
                                l,
                                (f = m(
                                  f,
                                  (u = m(u, d, l, f, n[p + 13], 5, -1444681467)),
                                  d,
                                  l,
                                  n[p + 2],
                                  9,
                                  -51403784,
                                )),
                                u,
                                d,
                                n[p + 7],
                                14,
                                1735328473,
                              )),
                              f,
                              u,
                              n[p + 12],
                              20,
                              -1926607734,
                            )),
                            (l = _(
                              l,
                              (f = _(
                                f,
                                (u = _(u, d, l, f, n[p + 5], 4, -378558)),
                                d,
                                l,
                                n[p + 8],
                                11,
                                -2022574463,
                              )),
                              u,
                              d,
                              n[p + 11],
                              16,
                              1839030562,
                            )),
                            f,
                            u,
                            n[p + 14],
                            23,
                            -35309556,
                          )),
                          (l = _(
                            l,
                            (f = _(
                              f,
                              (u = _(u, d, l, f, n[p + 1], 4, -1530992060)),
                              d,
                              l,
                              n[p + 4],
                              11,
                              1272893353,
                            )),
                            u,
                            d,
                            n[p + 7],
                            16,
                            -155497632,
                          )),
                          f,
                          u,
                          n[p + 10],
                          23,
                          -1094730640,
                        )),
                        (l = _(
                          l,
                          (f = _(
                            f,
                            (u = _(u, d, l, f, n[p + 13], 4, 681279174)),
                            d,
                            l,
                            n[p + 0],
                            11,
                            -358537222,
                          )),
                          u,
                          d,
                          n[p + 3],
                          16,
                          -722521979,
                        )),
                        f,
                        u,
                        n[p + 6],
                        23,
                        76029189,
                      )),
                      (l = _(
                        l,
                        (f = _(
                          f,
                          (u = _(u, d, l, f, n[p + 9], 4, -640364487)),
                          d,
                          l,
                          n[p + 12],
                          11,
                          -421815835,
                        )),
                        u,
                        d,
                        n[p + 15],
                        16,
                        530742520,
                      )),
                      f,
                      u,
                      n[p + 2],
                      23,
                      -995338651,
                    )),
                    (l = v(
                      l,
                      (f = v(
                        f,
                        (u = v(u, d, l, f, n[p + 0], 6, -198630844)),
                        d,
                        l,
                        n[p + 7],
                        10,
                        1126891415,
                      )),
                      u,
                      d,
                      n[p + 14],
                      15,
                      -1416354905,
                    )),
                    f,
                    u,
                    n[p + 5],
                    21,
                    -57434055,
                  )),
                  (l = v(
                    l,
                    (f = v(
                      f,
                      (u = v(u, d, l, f, n[p + 12], 6, 1700485571)),
                      d,
                      l,
                      n[p + 3],
                      10,
                      -1894986606,
                    )),
                    u,
                    d,
                    n[p + 10],
                    15,
                    -1051523,
                  )),
                  f,
                  u,
                  n[p + 1],
                  21,
                  -2054922799,
                )),
                (l = v(
                  l,
                  (f = v(
                    f,
                    (u = v(u, d, l, f, n[p + 8], 6, 1873313359)),
                    d,
                    l,
                    n[p + 15],
                    10,
                    -30611744,
                  )),
                  u,
                  d,
                  n[p + 6],
                  15,
                  -1560198380,
                )),
                f,
                u,
                n[p + 13],
                21,
                1309151649,
              )),
              (l = v(
                l,
                (f = v(
                  f,
                  (u = v(u, d, l, f, n[p + 4], 6, -145523070)),
                  d,
                  l,
                  n[p + 11],
                  10,
                  -1120210379,
                )),
                u,
                d,
                n[p + 2],
                15,
                718787259,
              )),
              f,
              u,
              n[p + 9],
              21,
              -343485551,
            )),
              (u = (u + g) >>> 0),
              (d = (d + y) >>> 0),
              (l = (l + E) >>> 0),
              (f = (f + T) >>> 0);
          }
          return r.endian([u, d, l, f]);
        })._ff = function (e, t, n, r, i, o, a) {
          var s = e + ((t & n) | (~t & r)) + (i >>> 0) + a;
          return ((s << o) | (s >>> (32 - o))) + t;
        }),
        (s._gg = function (e, t, n, r, i, o, a) {
          var s = e + ((t & r) | (n & ~r)) + (i >>> 0) + a;
          return ((s << o) | (s >>> (32 - o))) + t;
        }),
        (s._hh = function (e, t, n, r, i, o, a) {
          var s = e + (t ^ n ^ r) + (i >>> 0) + a;
          return ((s << o) | (s >>> (32 - o))) + t;
        }),
        (s._ii = function (e, t, n, r, i, o, a) {
          var s = e + (n ^ (t | ~r)) + (i >>> 0) + a;
          return ((s << o) | (s >>> (32 - o))) + t;
        }),
        (s._blocksize = 16),
        (s._digestsize = 16),
        (e.exports = function (e, t) {
          if (null == e) throw new Error('Illegal argument ' + e);
          var n = r.wordsToBytes(s(e, t));
          return t && t.asBytes ? n : t && t.asString ? a.bytesToString(n) : r.bytesToHex(n);
        });
    },
    function (e, t, n) {
      e.exports = { default: n(231), __esModule: !0 };
    },
    ,
    ,
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.WebAudio = void 0);
      var r = n(28),
        i = n(11),
        o = r.RtcSupport.checkWebAudio();
      function a() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.logger,
          n = void 0 === t ? console : t,
          r = e.stream,
          i = e.uid,
          a = e.isAnalyze,
          s = e.isRemote;
        (this.support = o.WebAudio && o.MediaStream),
          (this.gain = 1),
          (this.stream = r),
          (this.logger = n),
          this.support &&
            ((this.audioIn = {}),
            (this.uid = i || 0),
            (this.isAnalyze = a),
            (this.isRemote = s || !1),
            (this.instant = 0),
            (this.slow = 0),
            (this.clip = 0),
            this.resetMixConf(),
            this.init());
      }
      (a.ac = o.WebAudio && o.MediaStream ? new window.AudioContext() : {}),
        (a.destination = a.ac.createMediaStreamDestination
          ? a.ac.createMediaStreamDestination()
          : {});
      var s = a.prototype;
      (s.context = a.ac),
        (s.init = function () {
          this.validateInput() &&
            (this.isAnalyze && this.initMonitor(),
            this.formatStreams(),
            this.initWebAudio(),
            this.initAudioIn());
        }),
        (s.validateInput = function () {
          return /(Array|MediaStream|LocalMediaStream)/.test(this.stream.constructor);
        }),
        (s.initMonitor = function () {
          var e = this;
          (this.script = this.context.createScriptProcessor(0, 1, 1)).onaudioprocess = function (
            t,
          ) {
            var n,
              r = t.inputBuffer.getChannelData(0),
              i = 0,
              o = 0;
            for (n = 0; n < r.length; ++n) (i += Math.abs(r[n])), Math.abs(r[n]) > 0.99 && (o += 1);
            (e.instant = Math.sqrt(i / r.length)),
              (e.slow = 0.95 * e.slow + 0.05 * e.instant),
              (e.clip = o / r.length);
            var a = t.inputBuffer;
            t.outputBuffer.copyToChannel(a.getChannelData(0), 0, 0);
          };
        }),
        (s.initWebAudio = function () {
          var e = this.context;
          (this.gainFilter = e.createGain()),
            (this.destination = this.isRemote ? a.destination : e.createMediaStreamDestination()),
            (this.gainFilter.gain.value = this.gain);
        }),
        (s.initAudioIn = function () {
          var e = this,
            t = this,
            n = this.stream,
            r = this.context,
            o = void 0;
          if (/(MediaStream|LocalMediaStream)/.test(n.constructor))
            return a(n), void (this.outputStream = this.destination.stream);
          function a(e) {
            if (!/(MediaStream|LocalMediaStream)/.test(e.constructor)) return null;
            if (0 === e.getAudioTracks().length) return null;
            var n = r.createMediaStreamSource(e);
            return (
              n.connect(t.gainFilter),
              t.mixAudioConf.state === i.AuidoMixingState.UNSTART &&
                (t.script
                  ? (t.gainFilter.connect(t.script), t.script.connect(t.destination))
                  : t.gainFilter.connect(t.destination)),
              n
            );
          }
          n.constructor === Array &&
            (n.forEach(function (t) {
              (o = a(t)) && (e.audioIn[t.id] = o);
            }),
            (this.outputStream = this.destination.stream)),
            this.logger.log('WebAudio: addMs: 初始化音频 state: ', r.state),
            'running' !== r.state &&
              r
                .resume()
                .then(function () {
                  e.logger.log('WebAudio: addMs: 状态变更成功 state: ', r.state);
                })
                .catch(function (t) {
                  e.logger.log('WebAudio: addMs: 状态变更出错: ', t), r.resume();
                });
        }),
        (s.formatStreams = function () {
          var e = this.stream,
            t = [];
          if (/(MediaStream|LocalMediaStream)/.test(e.constructor))
            return (
              e.getAudioTracks().map(function (e) {
                t.push(new MediaStream([e]));
              }),
              void (this.stream = t)
            );
          e.constructor === Array &&
            (e.map(function (e) {
              e.getAudioTracks().map(function (e) {
                t.push(new MediaStream([e]));
              });
            }),
            (this.stream = t));
        }),
        (s.addStream = function (e) {
          var t = this.context;
          if (0 !== e.getAudioTracks().length) {
            var n = t.createMediaStreamSource(e);
            this.isAnalyze && this.script && n.connect(this.script),
              n.connect(this.gainFilter),
              (this.audioIn[e.id] = n),
              (this.outputStream = this.destination.stream);
          }
        }),
        (s.updateStream = function (e) {
          if (this.audioIn)
            for (var t in this.audioIn)
              this.audioIn[t] && this.audioIn[t].disconnect(0), (this.audioIn[t] = null);
          (this.audioIn = {}), (this.stream = e), this.initAudioIn();
        }),
        (s.setGain = function (e) {
          this.support && ((this.gainFilter.gain.value = e), (this.gain = e));
        }),
        (s.getGain = function () {
          return this.gain;
        }),
        (s.resetMixConf = function () {
          this.mixAudioConf &&
            this.mixAudioConf.replace &&
            (this.logger.log('伴音停止了，恢复mic'),
            this.script
              ? (this.gainFilter.connect(this.script), this.script.connect(this.destination))
              : this.gainFilter.connect(this.destination)),
            (this.mixAudioConf = {
              state: i.AuidoMixingState.UNSTART,
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
              auidoMixingEnd: null,
            });
        }),
        (s.startMix = function (e) {
          var t = this;
          this.logger.log('开始混音: %s', JSON.stringify(e, null, ' ')),
            (this.mixAudioConf.audioSource = this.context.createBufferSource()),
            (this.mixAudioConf.gainFilter = this.context.createGain()),
            (this.mixAudioConf.audioSource.buffer = e.buffer),
            (this.mixAudioConf.replace = e.replace),
            (this.mixAudioConf.cycle = e.cycle),
            (this.mixAudioConf.playStartTime = e.playStartTime),
            (this.mixAudioConf.auidoMixingEnd = e.auidoMixingEnd),
            this.mixAudioConf.audioSource.connect(this.mixAudioConf.gainFilter),
            this.mixAudioConf.gainFilter.connect(this.destination),
            e.replace &&
              (this.script ? this.script.disconnect(0) : this.gainFilter.disconnect(0),
              (this.instant = 0));
          if (
            ((this.mixAudioConf.audioSource.onended = function (e) {
              t.audioEnd(e);
            }),
            (this.mixAudioConf.totalTime = e.buffer.duration),
            (this.mixAudioConf.playStartTime < 0 ||
              this.mixAudioConf.playStartTime >= this.mixAudioConf.totalTime) &&
              (this.mixAudioConf.playStartTime = 0),
            this.logger.log('设置音量: %s', this.mixAudioConf.volume),
            (this.mixAudioConf.gainFilter.gain.value = this.mixAudioConf.volume),
            e.loopback && e.cycle > 1)
          ) {
            this.mixAudioConf.audioSource.loop = e.loopback;
            var n = e.cycle * this.mixAudioConf.totalTime - this.mixAudioConf.playStartTime;
            this.logger.log('循环播放: options.playStartTime: ', this.mixAudioConf.playStartTime),
              this.logger.log('循环播放: totalTime: ', n),
              this.mixAudioConf.audioSource.start(0, this.mixAudioConf.playStartTime, n - 1);
          } else
            e.loopback && 1 == e.cycle
              ? ((this.mixAudioConf.audioSource.loop = !1),
                this.mixAudioConf.audioSource.start(0, this.mixAudioConf.playStartTime))
              : (this.logger.log('无限循环播放 loop: ', e.loopback),
                (this.mixAudioConf.audioSource.loop = e.loopback),
                this.mixAudioConf.audioSource.start(0, this.mixAudioConf.playStartTime));
          return (
            (this.mixAudioConf.state = i.AuidoMixingState.PLAYED),
            (this.mixAudioConf.startTime = Date.now()),
            Promise.resolve()
          );
        }),
        (s.pauseAudioMixing = function (e) {
          this.logger.log('暂停混音'),
            (this.mixAudioConf.audioSource.onended = null),
            this.mixAudioConf.audioSource.disconnect(0),
            this.mixAudioConf.gainFilter.disconnect(0),
            this.mixAudioConf.audioSource.stop(),
            (this.mixAudioConf.pauseTime = Date.now()),
            (this.mixAudioConf.state = i.AuidoMixingState.PAUSED);
          var t =
            (this.mixAudioConf.pauseTime - this.mixAudioConf.startTime) / 1e3 +
            this.mixAudioConf.playStartTime;
          return (
            this.logger.log('已经播放的时间: ', t),
            t > this.mixAudioConf.totalTime && (t %= this.mixAudioConf.totalTime),
            this.logger.log('暂停位置:', t),
            Promise.resolve()
          );
        }),
        (s.resumeAudioMixing = function (e) {
          return this.logger.log('恢复混音'), (this.mixAudioConf.pauseTime = 0), this.startMix(e);
        }),
        (s.stopAudioMixing = function () {
          var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
          return (
            this.logger.log('停止混音, isFinished: ', e),
            (this.mixAudioConf.audioSource.onended = null),
            this.mixAudioConf.audioSource.disconnect(0),
            this.mixAudioConf.gainFilter.disconnect(0),
            this.mixAudioConf.audioSource.stop(),
            (this.mixAudioConf.state = i.AuidoMixingState.STOPED),
            e && this.resetMixConf(),
            Promise.resolve()
          );
        }),
        (s.audioEnd = function (e) {
          if (this.mixAudioConf.state === i.AuidoMixingState.PLAYED) {
            if (
              !(
                this.mixAudioConf.audioSource &&
                this.mixAudioConf.audioSource.loop &&
                this.mixAudioConf.cycle <= 0
              )
            )
              return (
                this.logger.log('伴音播放完成: ', this.mixAudioConf),
                (this.mixAudioConf.audioSource.onended = null),
                this.mixAudioConf.auidoMixingEnd &&
                  (this.mixAudioConf.auidoMixingEnd(e), (this.mixAudioConf.auidoMixingEnd = null)),
                this.resetMixConf(),
                Promise.resolve()
              );
            this.logger.log('无限循环时，伴音播放完成event: ', e);
          }
        }),
        (s.setAudioMixingVolume = function (e) {
          return (
            (this.mixAudioConf.gainFilter.gain.value = e / 255),
            (this.mixAudioConf.volume = this.mixAudioConf.gainFilter.gain.value),
            Promise.resolve()
          );
        }),
        (s.setAudioMixingPlayTime = function (e) {
          return (
            this.mixAudioConf.state === i.AuidoMixingState.PLAYED &&
              (this.mixAudioConf.setPlayStartTime = e.playStartTime),
            this.startMix(e)
          );
        }),
        (s.getAudioMixingPlayedTime = function () {
          var e = Date.now();
          this.mixAudioConf.state == i.AuidoMixingState.PAUSED &&
            this.mixAudioConf.pauseTime &&
            (this.logger.log('当前是暂停状态'), (e = this.mixAudioConf.pauseTime));
          var t = (e - this.mixAudioConf.startTime) / 1e3 + this.mixAudioConf.playStartTime;
          return (
            t > this.mixAudioConf.totalTime && (t %= this.mixAudioConf.totalTime), { playedTime: t }
          );
        }),
        (s.getAudioMixingTotalTime = function () {
          return { totalTime: this.mixAudioConf.totalTime };
        }),
        (s.off = function () {
          return this.setGain(0);
        }),
        (s.on = function () {
          this.setGain(1);
        }),
        (s.destroy = function () {
          if (
            ((this.instant = 0),
            (this.slow = 0),
            (this.clip = 0),
            this.gainFilter && this.gainFilter.disconnect(0),
            this.script && this.script.disconnect(0),
            this.audioIn)
          )
            for (var e in this.audioIn) this.audioIn[e] && this.audioIn[e].disconnect(0);
          this.audioIn = {};
          var t = this.stream;
          function n(e) {
            e &&
              e.getTracks().forEach(function (t) {
                e.removeTrack(t);
              });
          }
          /(MediaStream|LocalMediaStream)/.test(t.constructor) && n(t),
            t.constructor === Array &&
              t.forEach(function (e) {
                n(e);
              }),
            (this.stream = null),
            (this.outputStream = null);
        }),
        (s.getVolumeData = function () {
          return this.instant.toFixed(2);
        }),
        (t.WebAudio = a);
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      'use strict';
      var r = n(16),
        i = n(79),
        o = n(102);
      r(r.S, 'Promise', {
        try: function (e) {
          var t = i.f(this),
            n = o(e);
          return (n.e ? t.reject : t.resolve)(n.v), t.promise;
        },
      });
    },
    function (e, t, n) {
      'use strict';
      var r = n(16),
        i = n(6),
        o = n(8),
        a = n(104),
        s = n(101);
      r(r.P + r.R, 'Promise', {
        finally: function (e) {
          var t = a(this, i.Promise || o.Promise),
            n = 'function' == typeof e;
          return this.then(
            n
              ? function (n) {
                  return s(t, e()).then(function () {
                    return n;
                  });
                }
              : e,
            n
              ? function (n) {
                  return s(t, e()).then(function () {
                    throw n;
                  });
                }
              : e,
          );
        },
      });
    },
    function (e, t, n) {
      'use strict';
      var r = n(8),
        i = n(6),
        o = n(15),
        a = n(18),
        s = n(7)('species');
      e.exports = function (e) {
        var t = 'function' == typeof i[e] ? i[e] : r[e];
        a &&
          t &&
          !t[s] &&
          o.f(t, s, {
            configurable: !0,
            get: function () {
              return this;
            },
          });
      };
    },
    function (e, t, n) {
      var r = n(25);
      e.exports = function (e, t, n) {
        for (var i in t) n && e[i] ? (e[i] = t[i]) : r(e, i, t[i]);
        return e;
      };
    },
    function (e, t, n) {
      var r = n(8),
        i = n(103).set,
        o = r.MutationObserver || r.WebKitMutationObserver,
        a = r.process,
        s = r.Promise,
        c = 'process' == n(38)(a);
      e.exports = function () {
        var e,
          t,
          n,
          u = function () {
            var r, i;
            for (c && (r = a.domain) && r.exit(); e; ) {
              (i = e.fn), (e = e.next);
              try {
                i();
              } catch (r) {
                throw (e ? n() : (t = void 0), r);
              }
            }
            (t = void 0), r && r.enter();
          };
        if (c)
          n = function () {
            a.nextTick(u);
          };
        else if (!o || (r.navigator && r.navigator.standalone))
          if (s && s.resolve) {
            var d = s.resolve();
            n = function () {
              d.then(u);
            };
          } else
            n = function () {
              i.call(r, u);
            };
        else {
          var l = !0,
            f = document.createTextNode('');
          new o(u).observe(f, { characterData: !0 }),
            (n = function () {
              f.data = l = !l;
            });
        }
        return function (r) {
          var i = { fn: r, next: void 0 };
          t && (t.next = i), e || ((e = i), n()), (t = i);
        };
      };
    },
    function (e, t) {
      e.exports = function (e, t, n) {
        var r = void 0 === n;
        switch (t.length) {
          case 0:
            return r ? e() : e.call(n);
          case 1:
            return r ? e(t[0]) : e.call(n, t[0]);
          case 2:
            return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
          case 3:
            return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
          case 4:
            return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);
        }
        return e.apply(n, t);
      };
    },
    function (e, t, n) {
      var r = n(36),
        i = n(107),
        o = n(106),
        a = n(14),
        s = n(68),
        c = n(82),
        u = {},
        d = {};
      ((t = e.exports = function (e, t, n, l, f) {
        var p,
          h,
          m,
          _,
          v = f
            ? function () {
                return e;
              }
            : c(e),
          g = r(n, l, t ? 2 : 1),
          y = 0;
        if ('function' != typeof v) throw TypeError(e + ' is not iterable!');
        if (o(v)) {
          for (p = s(e.length); p > y; y++)
            if ((_ = t ? g(a((h = e[y]))[0], h[1]) : g(e[y])) === u || _ === d) return _;
        } else
          for (m = v.call(e); !(h = m.next()).done; )
            if ((_ = i(m, g, h.value, t)) === u || _ === d) return _;
      }).BREAK = u),
        (t.RETURN = d);
    },
    function (e, t) {
      e.exports = function (e, t, n, r) {
        if (!(e instanceof t) || (void 0 !== r && r in e))
          throw TypeError(n + ': incorrect invocation!');
        return e;
      };
    },
    function (e, t, n) {
      'use strict';
      var r,
        i,
        o,
        a,
        s = n(44),
        c = n(8),
        u = n(36),
        d = n(81),
        l = n(16),
        f = n(23),
        p = n(50),
        h = n(176),
        m = n(175),
        _ = n(104),
        v = n(103).set,
        g = n(173)(),
        y = n(79),
        E = n(102),
        T = n(101),
        b = c.TypeError,
        C = c.process,
        O = c.Promise,
        S = 'process' == d(C),
        A = function () {},
        R = (i = y.f),
        I = !!(function () {
          try {
            var e = O.resolve(1),
              t = ((e.constructor = {})[n(7)('species')] = function (e) {
                e(A, A);
              });
            return (S || 'function' == typeof PromiseRejectionEvent) && e.then(A) instanceof t;
          } catch (e) {}
        })(),
        P = function (e) {
          var t;
          return !(!f(e) || 'function' != typeof (t = e.then)) && t;
        },
        w = function (e, t) {
          if (!e._n) {
            e._n = !0;
            var n = e._c;
            g(function () {
              for (
                var r = e._v,
                  i = 1 == e._s,
                  o = 0,
                  a = function (t) {
                    var n,
                      o,
                      a,
                      s = i ? t.ok : t.fail,
                      c = t.resolve,
                      u = t.reject,
                      d = t.domain;
                    try {
                      s
                        ? (i || (2 == e._h && k(e), (e._h = 1)),
                          !0 === s
                            ? (n = r)
                            : (d && d.enter(), (n = s(r)), d && (d.exit(), (a = !0))),
                          n === t.promise
                            ? u(b('Promise-chain cycle'))
                            : (o = P(n))
                            ? o.call(n, c, u)
                            : c(n))
                        : u(r);
                    } catch (e) {
                      d && !a && d.exit(), u(e);
                    }
                  };
                n.length > o;

              )
                a(n[o++]);
              (e._c = []), (e._n = !1), t && !e._h && N(e);
            });
          }
        },
        N = function (e) {
          v.call(c, function () {
            var t,
              n,
              r,
              i = e._v,
              o = D(e);
            if (
              (o &&
                ((t = E(function () {
                  S
                    ? C.emit('unhandledRejection', i, e)
                    : (n = c.onunhandledrejection)
                    ? n({ promise: e, reason: i })
                    : (r = c.console) && r.error && r.error('Unhandled promise rejection', i);
                })),
                (e._h = S || D(e) ? 2 : 1)),
              (e._a = void 0),
              o && t.e)
            )
              throw t.v;
          });
        },
        D = function (e) {
          return 1 !== e._h && 0 === (e._a || e._c).length;
        },
        k = function (e) {
          v.call(c, function () {
            var t;
            S
              ? C.emit('rejectionHandled', e)
              : (t = c.onrejectionhandled) && t({ promise: e, reason: e._v });
          });
        },
        L = function (e) {
          var t = this;
          t._d ||
            ((t._d = !0),
            ((t = t._w || t)._v = e),
            (t._s = 2),
            t._a || (t._a = t._c.slice()),
            w(t, !0));
        },
        M = function (e) {
          var t,
            n = this;
          if (!n._d) {
            (n._d = !0), (n = n._w || n);
            try {
              if (n === e) throw b("Promise can't be resolved itself");
              (t = P(e))
                ? g(function () {
                    var r = { _w: n, _d: !1 };
                    try {
                      t.call(e, u(M, r, 1), u(L, r, 1));
                    } catch (e) {
                      L.call(r, e);
                    }
                  })
                : ((n._v = e), (n._s = 1), w(n, !1));
            } catch (e) {
              L.call({ _w: n, _d: !1 }, e);
            }
          }
        };
      I ||
        ((O = function (e) {
          h(this, O, 'Promise', '_h'), p(e), r.call(this);
          try {
            e(u(M, this, 1), u(L, this, 1));
          } catch (e) {
            L.call(this, e);
          }
        }),
        ((r = function (e) {
          (this._c = []),
            (this._a = void 0),
            (this._s = 0),
            (this._d = !1),
            (this._v = void 0),
            (this._h = 0),
            (this._n = !1);
        }).prototype = n(172)(O.prototype, {
          then: function (e, t) {
            var n = R(_(this, O));
            return (
              (n.ok = 'function' != typeof e || e),
              (n.fail = 'function' == typeof t && t),
              (n.domain = S ? C.domain : void 0),
              this._c.push(n),
              this._a && this._a.push(n),
              this._s && w(this, !1),
              n.promise
            );
          },
          catch: function (e) {
            return this.then(void 0, e);
          },
        })),
        (o = function () {
          var e = new r();
          (this.promise = e), (this.resolve = u(M, e, 1)), (this.reject = u(L, e, 1));
        }),
        (y.f = R = function (e) {
          return e === O || e === a ? new o(e) : i(e);
        })),
        l(l.G + l.W + l.F * !I, { Promise: O }),
        n(43)(O, 'Promise'),
        n(171)('Promise'),
        (a = n(6).Promise),
        l(l.S + l.F * !I, 'Promise', {
          reject: function (e) {
            var t = R(this);
            return (0, t.reject)(e), t.promise;
          },
        }),
        l(l.S + l.F * (s || !I), 'Promise', {
          resolve: function (e) {
            return T(s && this === a ? O : this, e);
          },
        }),
        l(
          l.S +
            l.F *
              !(
                I &&
                n(105)(function (e) {
                  O.all(e).catch(A);
                })
              ),
          'Promise',
          {
            all: function (e) {
              var t = this,
                n = R(t),
                r = n.resolve,
                i = n.reject,
                o = E(function () {
                  var n = [],
                    o = 0,
                    a = 1;
                  m(e, !1, function (e) {
                    var s = o++,
                      c = !1;
                    n.push(void 0),
                      a++,
                      t.resolve(e).then(function (e) {
                        c || ((c = !0), (n[s] = e), --a || r(n));
                      }, i);
                  }),
                    --a || r(n);
                });
              return o.e && i(o.v), n.promise;
            },
            race: function (e) {
              var t = this,
                n = R(t),
                r = n.reject,
                i = E(function () {
                  m(e, !1, function (e) {
                    t.resolve(e).then(n.resolve, r);
                  });
                });
              return i.e && r(i.v), n.promise;
            },
          },
        );
    },
    function (e, t, n) {
      n(87), n(42), n(48), n(177), n(170), n(169), (e.exports = n(6).Promise);
    },
    function (e, t, n) {
      e.exports = { default: n(178), __esModule: !0 };
    },
    function (e, t) {
      !(function (t) {
        'use strict';
        var n,
          r = Object.prototype,
          i = r.hasOwnProperty,
          o = 'function' == typeof Symbol ? Symbol : {},
          a = o.iterator || '@@iterator',
          s = o.asyncIterator || '@@asyncIterator',
          c = o.toStringTag || '@@toStringTag',
          u = 'object' == typeof e,
          d = t.regeneratorRuntime;
        if (d) u && (e.exports = d);
        else {
          (d = t.regeneratorRuntime = u ? e.exports : {}).wrap = E;
          var l = 'suspendedStart',
            f = 'suspendedYield',
            p = 'executing',
            h = 'completed',
            m = {},
            _ = {};
          _[a] = function () {
            return this;
          };
          var v = Object.getPrototypeOf,
            g = v && v(v(N([])));
          g && g !== r && i.call(g, a) && (_ = g);
          var y = (O.prototype = b.prototype = Object.create(_));
          (C.prototype = y.constructor = O),
            (O.constructor = C),
            (O[c] = C.displayName = 'GeneratorFunction'),
            (d.isGeneratorFunction = function (e) {
              var t = 'function' == typeof e && e.constructor;
              return !!t && (t === C || 'GeneratorFunction' === (t.displayName || t.name));
            }),
            (d.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, O)
                  : ((e.__proto__ = O), c in e || (e[c] = 'GeneratorFunction')),
                (e.prototype = Object.create(y)),
                e
              );
            }),
            (d.awrap = function (e) {
              return { __await: e };
            }),
            S(A.prototype),
            (A.prototype[s] = function () {
              return this;
            }),
            (d.AsyncIterator = A),
            (d.async = function (e, t, n, r) {
              var i = new A(E(e, t, n, r));
              return d.isGeneratorFunction(t)
                ? i
                : i.next().then(function (e) {
                    return e.done ? e.value : i.next();
                  });
            }),
            S(y),
            (y[c] = 'Generator'),
            (y[a] = function () {
              return this;
            }),
            (y.toString = function () {
              return '[object Generator]';
            }),
            (d.keys = function (e) {
              var t = [];
              for (var n in e) t.push(n);
              return (
                t.reverse(),
                function n() {
                  for (; t.length; ) {
                    var r = t.pop();
                    if (r in e) return (n.value = r), (n.done = !1), n;
                  }
                  return (n.done = !0), n;
                }
              );
            }),
            (d.values = N),
            (w.prototype = {
              constructor: w,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = n),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = 'next'),
                  (this.arg = n),
                  this.tryEntries.forEach(P),
                  !e)
                )
                  for (var t in this)
                    't' === t.charAt(0) && i.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = n);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ('throw' === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var t = this;
                function r(r, i) {
                  return (
                    (s.type = 'throw'),
                    (s.arg = e),
                    (t.next = r),
                    i && ((t.method = 'next'), (t.arg = n)),
                    !!i
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var a = this.tryEntries[o],
                    s = a.completion;
                  if ('root' === a.tryLoc) return r('end');
                  if (a.tryLoc <= this.prev) {
                    var c = i.call(a, 'catchLoc'),
                      u = i.call(a, 'finallyLoc');
                    if (c && u) {
                      if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                    } else if (c) {
                      if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                    } else {
                      if (!u) throw new Error('try statement without catch or finally');
                      if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var r = this.tryEntries[n];
                  if (
                    r.tryLoc <= this.prev &&
                    i.call(r, 'finallyLoc') &&
                    this.prev < r.finallyLoc
                  ) {
                    var o = r;
                    break;
                  }
                }
                o &&
                  ('break' === e || 'continue' === e) &&
                  o.tryLoc <= t &&
                  t <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = e),
                  (a.arg = t),
                  o ? ((this.method = 'next'), (this.next = o.finallyLoc), m) : this.complete(a)
                );
              },
              complete: function (e, t) {
                if ('throw' === e.type) throw e.arg;
                return (
                  'break' === e.type || 'continue' === e.type
                    ? (this.next = e.arg)
                    : 'return' === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = 'return'),
                      (this.next = 'end'))
                    : 'normal' === e.type && t && (this.next = t),
                  m
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), P(n), m;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var n = this.tryEntries[t];
                  if (n.tryLoc === e) {
                    var r = n.completion;
                    if ('throw' === r.type) {
                      var i = r.arg;
                      P(n);
                    }
                    return i;
                  }
                }
                throw new Error('illegal catch attempt');
              },
              delegateYield: function (e, t, r) {
                return (
                  (this.delegate = { iterator: N(e), resultName: t, nextLoc: r }),
                  'next' === this.method && (this.arg = n),
                  m
                );
              },
            });
        }
        function E(e, t, n, r) {
          var i = t && t.prototype instanceof b ? t : b,
            o = Object.create(i.prototype),
            a = new w(r || []);
          return (
            (o._invoke = (function (e, t, n) {
              var r = l;
              return function (i, o) {
                if (r === p) throw new Error('Generator is already running');
                if (r === h) {
                  if ('throw' === i) throw o;
                  return D();
                }
                for (n.method = i, n.arg = o; ; ) {
                  var a = n.delegate;
                  if (a) {
                    var s = R(a, n);
                    if (s) {
                      if (s === m) continue;
                      return s;
                    }
                  }
                  if ('next' === n.method) n.sent = n._sent = n.arg;
                  else if ('throw' === n.method) {
                    if (r === l) throw ((r = h), n.arg);
                    n.dispatchException(n.arg);
                  } else 'return' === n.method && n.abrupt('return', n.arg);
                  r = p;
                  var c = T(e, t, n);
                  if ('normal' === c.type) {
                    if (((r = n.done ? h : f), c.arg === m)) continue;
                    return { value: c.arg, done: n.done };
                  }
                  'throw' === c.type && ((r = h), (n.method = 'throw'), (n.arg = c.arg));
                }
              };
            })(e, n, a)),
            o
          );
        }
        function T(e, t, n) {
          try {
            return { type: 'normal', arg: e.call(t, n) };
          } catch (e) {
            return { type: 'throw', arg: e };
          }
        }
        function b() {}
        function C() {}
        function O() {}
        function S(e) {
          ['next', 'throw', 'return'].forEach(function (t) {
            e[t] = function (e) {
              return this._invoke(t, e);
            };
          });
        }
        function A(e) {
          var t;
          this._invoke = function (n, r) {
            function o() {
              return new Promise(function (t, o) {
                !(function t(n, r, o, a) {
                  var s = T(e[n], e, r);
                  if ('throw' !== s.type) {
                    var c = s.arg,
                      u = c.value;
                    return u && 'object' == typeof u && i.call(u, '__await')
                      ? Promise.resolve(u.__await).then(
                          function (e) {
                            t('next', e, o, a);
                          },
                          function (e) {
                            t('throw', e, o, a);
                          },
                        )
                      : Promise.resolve(u).then(function (e) {
                          (c.value = e), o(c);
                        }, a);
                  }
                  a(s.arg);
                })(n, r, t, o);
              });
            }
            return (t = t ? t.then(o, o) : o());
          };
        }
        function R(e, t) {
          var r = e.iterator[t.method];
          if (r === n) {
            if (((t.delegate = null), 'throw' === t.method)) {
              if (
                e.iterator.return &&
                ((t.method = 'return'), (t.arg = n), R(e, t), 'throw' === t.method)
              )
                return m;
              (t.method = 'throw'),
                (t.arg = new TypeError("The iterator does not provide a 'throw' method"));
            }
            return m;
          }
          var i = T(r, e.iterator, t.arg);
          if ('throw' === i.type)
            return (t.method = 'throw'), (t.arg = i.arg), (t.delegate = null), m;
          var o = i.arg;
          return o
            ? o.done
              ? ((t[e.resultName] = o.value),
                (t.next = e.nextLoc),
                'return' !== t.method && ((t.method = 'next'), (t.arg = n)),
                (t.delegate = null),
                m)
              : o
            : ((t.method = 'throw'),
              (t.arg = new TypeError('iterator result is not an object')),
              (t.delegate = null),
              m);
        }
        function I(e) {
          var t = { tryLoc: e[0] };
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t);
        }
        function P(e) {
          var t = e.completion || {};
          (t.type = 'normal'), delete t.arg, (e.completion = t);
        }
        function w(e) {
          (this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(I, this), this.reset(!0);
        }
        function N(e) {
          if (e) {
            var t = e[a];
            if (t) return t.call(e);
            if ('function' == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var r = -1,
                o = function t() {
                  for (; ++r < e.length; )
                    if (i.call(e, r)) return (t.value = e[r]), (t.done = !1), t;
                  return (t.value = n), (t.done = !0), t;
                };
              return (o.next = o);
            }
          }
          return { next: D };
        }
        function D() {
          return { value: n, done: !0 };
        }
      })(
        (function () {
          return this;
        })() || Function('return this')(),
      );
    },
    function (e, t, n) {
      var r =
          (function () {
            return this;
          })() || Function('return this')(),
        i =
          r.regeneratorRuntime && Object.getOwnPropertyNames(r).indexOf('regeneratorRuntime') >= 0,
        o = i && r.regeneratorRuntime;
      if (((r.regeneratorRuntime = void 0), (e.exports = n(180)), i)) r.regeneratorRuntime = o;
      else
        try {
          delete r.regeneratorRuntime;
        } catch (e) {
          r.regeneratorRuntime = void 0;
        }
    },
    ,
    function (e, t, n) {
      var r = n(14),
        i = n(82);
      e.exports = n(6).getIterator = function (e) {
        var t = i(e);
        if ('function' != typeof t) throw TypeError(e + ' is not iterable!');
        return r(t.call(e));
      };
    },
    function (e, t, n) {
      n(48), n(42), (e.exports = n(183));
    },
    function (e, t, n) {
      e.exports = { default: n(184), __esModule: !0 };
    },
    function (e, t, n) {
      var r = n(81),
        i = n(7)('iterator'),
        o = n(31);
      e.exports = n(6).isIterable = function (e) {
        var t = Object(e);
        return void 0 !== t[i] || '@@iterator' in t || o.hasOwnProperty(r(t));
      };
    },
    function (e, t, n) {
      n(48), n(42), (e.exports = n(186));
    },
    function (e, t, n) {
      e.exports = { default: n(187), __esModule: !0 };
    },
    ,
    function (e, t, n) {
      'use strict';
      var r = n(15),
        i = n(34);
      e.exports = function (e, t, n) {
        t in e ? r.f(e, t, i(0, n)) : (e[t] = n);
      };
    },
    function (e, t, n) {
      'use strict';
      var r = n(36),
        i = n(16),
        o = n(49),
        a = n(107),
        s = n(106),
        c = n(68),
        u = n(190),
        d = n(82);
      i(
        i.S +
          i.F *
            !n(105)(function (e) {
              Array.from(e);
            }),
        'Array',
        {
          from: function (e) {
            var t,
              n,
              i,
              l,
              f = o(e),
              p = 'function' == typeof this ? this : Array,
              h = arguments.length,
              m = h > 1 ? arguments[1] : void 0,
              _ = void 0 !== m,
              v = 0,
              g = d(f);
            if (
              (_ && (m = r(m, h > 2 ? arguments[2] : void 0, 2)), null == g || (p == Array && s(g)))
            )
              for (n = new p((t = c(f.length))); t > v; v++) u(n, v, _ ? m(f[v], v) : f[v]);
            else
              for (l = g.call(f), n = new p(); !(i = l.next()).done; v++)
                u(n, v, _ ? a(l, m, [i.value, v], !0) : i.value);
            return (n.length = v), n;
          },
        },
      );
    },
    function (e, t, n) {
      n(42), n(191), (e.exports = n(6).Array.from);
    },
    function (e, t, n) {
      e.exports = { default: n(192), __esModule: !0 };
    },
    function (e, t, n) {
      'use strict';
      t.__esModule = !0;
      var r,
        i = n(193),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.default = function (e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n;
        }
        return (0, o.default)(e);
      };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.WebRTCOption = t.NRTCOption = t.NetcallOption = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      (t.NetcallOption = function e(t) {
        (0, o.default)(this, e);
        var n = t.kickLast,
          r = t.nim,
          i = t.container,
          a = t.remoteContainer,
          s = t.mirror,
          c = t.mirrorRemote;
        (this.kickLast = n),
          (this.nim = r),
          (this.container = i),
          (this.remoteContainer = a),
          (this.mirror = s),
          (this.mirrorRemote = c);
      }),
        (t.NRTCOption = function e(t) {
          (0, o.default)(this, e);
          var n = t.chromeId,
            r = t.debug;
          (this.chromeId = n), (this.debug = r);
        }),
        (t.WebRTCOption = function e(t) {
          (0, o.default)(this, e);
          var n = t.nim,
            r = t.container,
            i = t.remoteContainer,
            a = t.chromeId,
            s = t.debug;
          (this.nim = n),
            (this.container = r),
            (this.remoteContainer = i),
            (this.chromeId = a),
            (this.debug = s);
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.SessionConfig4P2P = t.SessionConfig4Meeting = t.SessionConfig4Live = t.SessionConfig = void 0);
      var r = a(n(4)),
        i = a(n(3)),
        o = a(n(1));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var s = (t.SessionConfig = function e(t) {
        (0, o.default)(this, e);
        var n = t.maxVideoQuality,
          r = t.videoQuality,
          i = t.videoFrameRate,
          a = t.videoBitrate,
          s = t.videoEncodeMode,
          c = t.highAudio,
          u = t.recordVideo,
          d = t.recordAudio,
          l = t.isHostSpeaker,
          f = t.recordType,
          p = t.rtmpUrl,
          h = t.splitMode,
          m = t.layout,
          _ = t.liveEnable;
        (this.maxVideoQuality = n),
          (this.videoQuality = r),
          (this.videoFrameRate = i),
          (this.videoBitrate = a),
          (this.videoEncodeMode = s),
          (this.highAudio = c),
          (this.liveEnable = _),
          void 0 !== u && (this.recordVideo = u),
          void 0 !== d && (this.recordAudio = d),
          void 0 !== l && (this.isHostSpeaker = l),
          void 0 !== f && (this.recordType = f),
          void 0 !== p && (this.rtmpUrl = p),
          void 0 !== h && (this.splitMode = h),
          void 0 !== m && (this.layout = m);
      });
      (t.SessionConfig4Live = (function (e) {
        function t() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (
            (0, o.default)(this, t),
            delete e.recordVideo,
            delete e.recordAudio,
            delete e.isHostSpeaker,
            delete e.recordType,
            (0, r.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
          );
        }
        return (0, i.default)(t, e), t;
      })(s)),
        (t.SessionConfig4Meeting = (function (e) {
          function t(e) {
            return (
              (0, o.default)(this, t),
              delete e.recordVideo,
              delete e.recordAudio,
              delete e.isHostSpeaker,
              delete e.recordType,
              delete e.rtmpUrl,
              delete e.splitMode,
              delete e.layout,
              (0, r.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
            );
          }
          return (0, i.default)(t, e), t;
        })(s)),
        (t.SessionConfig4P2P = (function (e) {
          function t(e) {
            return (
              (0, o.default)(this, t),
              delete e.rtmpUrl,
              delete e.splitMode,
              delete e.layout,
              (0, r.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
            );
          }
          return (0, i.default)(t, e), t;
        })(s));
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(314);
      Object.defineProperty(t, 'PushConfig', {
        enumerable: !0,
        get: function () {
          return r.PushConfig;
        },
      });
      var i = n(205);
      Object.defineProperty(t, 'SessionConfig', {
        enumerable: !0,
        get: function () {
          return i.SessionConfig;
        },
      });
      var o = n(313);
      Object.defineProperty(t, 'DEFAULT_SESSION_CONFIG', {
        enumerable: !0,
        get: function () {
          return o.DEFAULT_SESSION_CONFIG;
        },
      });
      var a = n(297);
      Object.defineProperty(t, 'DEFAULT_PUSH_CONFIG', {
        enumerable: !0,
        get: function () {
          return a.DEFAULT_PUSH_CONFIG;
        },
      });
    },
    function (e, t) {
      var n = (e.exports = {
        v: [{ name: 'version', reg: /^(\d*)$/ }],
        o: [
          {
            name: 'origin',
            reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
            names: ['username', 'sessionId', 'sessionVersion', 'netType', 'ipVer', 'address'],
            format: '%s %s %d %s IP%d %s',
          },
        ],
        s: [{ name: 'name' }],
        i: [{ name: 'description' }],
        u: [{ name: 'uri' }],
        e: [{ name: 'email' }],
        p: [{ name: 'phone' }],
        z: [{ name: 'timezones' }],
        r: [{ name: 'repeats' }],
        t: [{ name: 'timing', reg: /^(\d*) (\d*)/, names: ['start', 'stop'], format: '%d %d' }],
        c: [
          {
            name: 'connection',
            reg: /^IN IP(\d) (\S*)/,
            names: ['version', 'ip'],
            format: 'IN IP%d %s',
          },
        ],
        b: [
          {
            push: 'bandwidth',
            reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
            names: ['type', 'limit'],
            format: '%s:%s',
          },
        ],
        m: [
          {
            reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
            names: ['type', 'port', 'protocol', 'payloads'],
            format: '%s %d %s %s',
          },
        ],
        a: [
          {
            push: 'rtp',
            reg: /^rtpmap:(\d*) ([\w\-\.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
            names: ['payload', 'codec', 'rate', 'encoding'],
            format: function (e) {
              return e.encoding
                ? 'rtpmap:%d %s/%s/%s'
                : e.rate
                ? 'rtpmap:%d %s/%s'
                : 'rtpmap:%d %s';
            },
          },
          {
            push: 'fmtp',
            reg: /^fmtp:(\d*) ([\S| ]*)/,
            names: ['payload', 'config'],
            format: 'fmtp:%d %s',
          },
          { name: 'control', reg: /^control:(.*)/, format: 'control:%s' },
          {
            name: 'rtcp',
            reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
            names: ['port', 'netType', 'ipVer', 'address'],
            format: function (e) {
              return null != e.address ? 'rtcp:%d %s IP%d %s' : 'rtcp:%d';
            },
          },
          {
            push: 'rtcpFbTrrInt',
            reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
            names: ['payload', 'value'],
            format: 'rtcp-fb:%d trr-int %d',
          },
          {
            push: 'rtcpFb',
            reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
            names: ['payload', 'type', 'subtype'],
            format: function (e) {
              return null != e.subtype ? 'rtcp-fb:%s %s %s' : 'rtcp-fb:%s %s';
            },
          },
          {
            push: 'ext',
            reg: /^extmap:(\d+)(?:\/(\w+))? (\S*)(?: (\S*))?/,
            names: ['value', 'direction', 'uri', 'config'],
            format: function (e) {
              return 'extmap:%d' + (e.direction ? '/%s' : '%v') + ' %s' + (e.config ? ' %s' : '');
            },
          },
          {
            push: 'crypto',
            reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
            names: ['id', 'suite', 'config', 'sessionConfig'],
            format: function (e) {
              return null != e.sessionConfig ? 'crypto:%d %s %s %s' : 'crypto:%d %s %s';
            },
          },
          { name: 'setup', reg: /^setup:(\w*)/, format: 'setup:%s' },
          { name: 'mid', reg: /^mid:([^\s]*)/, format: 'mid:%s' },
          { name: 'msid', reg: /^msid:(.*)/, format: 'msid:%s' },
          { name: 'ptime', reg: /^ptime:(\d*)/, format: 'ptime:%d' },
          { name: 'maxptime', reg: /^maxptime:(\d*)/, format: 'maxptime:%d' },
          { name: 'direction', reg: /^(sendrecv|recvonly|sendonly|inactive)/ },
          { name: 'icelite', reg: /^(ice-lite)/ },
          { name: 'iceUfrag', reg: /^ice-ufrag:(\S*)/, format: 'ice-ufrag:%s' },
          { name: 'icePwd', reg: /^ice-pwd:(\S*)/, format: 'ice-pwd:%s' },
          {
            name: 'fingerprint',
            reg: /^fingerprint:(\S*) (\S*)/,
            names: ['type', 'hash'],
            format: 'fingerprint:%s %s',
          },
          {
            push: 'candidates',
            reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
            names: [
              'foundation',
              'component',
              'transport',
              'priority',
              'ip',
              'port',
              'type',
              'raddr',
              'rport',
              'tcptype',
              'generation',
              'network-id',
              'network-cost',
            ],
            format: function (e) {
              var t = 'candidate:%s %d %s %d %s %d typ %s';
              return (
                (t += null != e.raddr ? ' raddr %s rport %d' : '%v%v'),
                (t += null != e.tcptype ? ' tcptype %s' : '%v'),
                null != e.generation && (t += ' generation %d'),
                (t += null != e['network-id'] ? ' network-id %d' : '%v'),
                (t += null != e['network-cost'] ? ' network-cost %d' : '%v')
              );
            },
          },
          { name: 'endOfCandidates', reg: /^(end-of-candidates)/ },
          {
            name: 'remoteCandidates',
            reg: /^remote-candidates:(.*)/,
            format: 'remote-candidates:%s',
          },
          { name: 'iceOptions', reg: /^ice-options:(\S*)/, format: 'ice-options:%s' },
          {
            push: 'ssrcs',
            reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
            names: ['id', 'attribute', 'value'],
            format: function (e) {
              var t = 'ssrc:%d';
              return null != e.attribute && ((t += ' %s'), null != e.value && (t += ':%s')), t;
            },
          },
          {
            push: 'ssrcGroups',
            reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
            names: ['semantics', 'ssrcs'],
            format: 'ssrc-group:%s %s',
          },
          {
            name: 'msidSemantic',
            reg: /^msid-semantic:\s?(\w*) (\S*)/,
            names: ['semantic', 'token'],
            format: 'msid-semantic: %s %s',
          },
          {
            push: 'groups',
            reg: /^group:(\w*) (.*)/,
            names: ['type', 'mids'],
            format: 'group:%s %s',
          },
          { name: 'rtcpMux', reg: /^(rtcp-mux)/ },
          { name: 'rtcpRsize', reg: /^(rtcp-rsize)/ },
          {
            name: 'sctpmap',
            reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
            names: ['sctpmapNumber', 'app', 'maxMessageSize'],
            format: function (e) {
              return null != e.maxMessageSize ? 'sctpmap:%s %s %s' : 'sctpmap:%s %s';
            },
          },
          { name: 'xGoogleFlag', reg: /^x-google-flag:([^\s]*)/, format: 'x-google-flag:%s' },
          {
            push: 'rids',
            reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
            names: ['id', 'direction', 'params'],
            format: function (e) {
              return e.params ? 'rid:%s %s %s' : 'rid:%s %s';
            },
          },
          {
            push: 'imageattrs',
            reg: new RegExp(
              '^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?',
            ),
            names: ['pt', 'dir1', 'attrs1', 'dir2', 'attrs2'],
            format: function (e) {
              return 'imageattr:%s %s %s' + (e.dir2 ? ' %s %s' : '');
            },
          },
          {
            name: 'simulcast',
            reg: new RegExp(
              '^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$',
            ),
            names: ['dir1', 'list1', 'dir2', 'list2'],
            format: function (e) {
              return 'simulcast:%s %s' + (e.dir2 ? ' %s %s' : '');
            },
          },
          {
            name: 'simulcast_03',
            reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
            names: ['value'],
            format: 'simulcast: %s',
          },
          { name: 'framerate', reg: /^framerate:(\d+(?:$|\.\d+))/, format: 'framerate:%s' },
          {
            name: 'sourceFilter',
            reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
            names: ['filterMode', 'netType', 'addressTypes', 'destAddress', 'srcList'],
            format: 'source-filter: %s %s %s %s %s',
          },
          { push: 'invalid', names: ['value'] },
        ],
      });
      Object.keys(n).forEach(function (e) {
        n[e].forEach(function (e) {
          e.reg || (e.reg = /(.*)/), e.format || (e.format = '%s');
        });
      });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = s(n(98)),
        i = s(n(97)),
        o = s(n(325)),
        a = s(n(100));
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var c = n(19),
        u = null;
      (a.default.ios() && 'weixin' === a.default.browser.ua) ||
        (u = navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia ||
          (navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
      var d = (window.AudioContext =
          window.AudioContext ||
          window.webkitAudioContext ||
          window.mozAudioContext ||
          window.msAudioContext),
        l = (window.RTCPeerConnection =
          window.RTCPeerConnection ||
          window.webkitRTCPeerConnection ||
          window.mozRTCPeerConnection),
        f = (window.RTCDataChannel = window.RTCDataChannel || window.DataChannel),
        p = (window.MediaStream = window.MediaStream || window.webkitMediaStream);
      function h(e) {
        var t = void 0;
        return (
          t || (t = document.createElement('video')),
          !!t.canPlayType(
            {
              ogg: 'video/ogg; codecs="theora"',
              h264: 'video/mp4; codecs="avc1.42E01E"',
              webm: 'video/webm; codecs="vp8, vorbis"',
              vp9: 'video/webm; codecs="vp9"',
              hls: 'application/x-mpegURL; codecs="avc1.42E01E"',
            }[e] || e,
          )
        );
      }
      var m = {
        WebRTC: !!l && !!p,
        RTCPeerConnection: !!l,
        Vp8: h('webm'),
        Vp9: h('vp9'),
        H264: h('h264'),
        GetUserMedia: !!u && !!navigator.mediaDevices,
        DataChannel: !!(l && f && l.prototype && l.prototype.createDataChannel),
        WebAudio: !(!d || !d.prototype.createMediaStreamSource),
        MediaStream: !!p,
      };
      function _() {
        var e = c && c.name,
          t = c && c.version;
        return { prefix: e, version: (t = t && t.match(/\d+/)[0]) };
      }
      (t.default = {
        checkWebRtc: function () {
          return m;
        },
        checkWebAudio: function () {
          return { WebAudio: m.WebAudio, MediaStream: m.MediaStream };
        },
        checkCompatibility: function () {
          var e = Object.assign(_(), {
            system: c && c.os.family + ' ' + c.os.version,
            browser: c && c.name,
            version: c && c.version,
          });
          return new Promise(function (t, n) {
            var a = this;
            (0, i.default)(
              r.default.mark(function n() {
                var i, s;
                return r.default.wrap(
                  function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          return (
                            (i = Object.assign(e, m, { ScreenSharing: !1 })),
                            (n.next = 3),
                            o.default.getDevices().catch(function (e) {
                              return console.warn(e), t(i);
                            })
                          );
                        case 3:
                          return (
                            (s = n.sent),
                            (i.MicrophoneList = (s && s.audioIn) || []),
                            (i.CameraList = (s && s.video) || []),
                            (i.Microphone = (s && s.audioIn && s.audioIn.length > 0) || !1),
                            (i.Camera = (s && s.video && s.video.length > 0) || !1),
                            n.abrupt('return', t(i))
                          );
                        case 9:
                        case 'end':
                          return n.stop();
                      }
                  },
                  n,
                  a,
                );
              }),
            )();
          });
        },
        checkVersion: function () {
          return _();
        },
      }),
        (e.exports = t.default);
    },
    function (e, t) {
      var n = {
        utf8: {
          stringToBytes: function (e) {
            return n.bin.stringToBytes(unescape(encodeURIComponent(e)));
          },
          bytesToString: function (e) {
            return decodeURIComponent(escape(n.bin.bytesToString(e)));
          },
        },
        bin: {
          stringToBytes: function (e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
            return t;
          },
          bytesToString: function (e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(String.fromCharCode(e[n]));
            return t.join('');
          },
        },
      };
      e.exports = n;
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      var r = n(16);
      r(r.S, 'Object', { create: n(67) });
    },
    function (e, t, n) {
      n(223);
      var r = n(6).Object;
      e.exports = function (e, t) {
        return r.create(e, t);
      };
    },
    function (e, t, n) {
      e.exports = { default: n(224), __esModule: !0 };
    },
    function (e, t, n) {
      var r = n(23),
        i = n(14),
        o = function (e, t) {
          if ((i(e), !r(t) && null !== t)) throw TypeError(t + ": can't set as prototype!");
        };
      e.exports = {
        set:
          Object.setPrototypeOf ||
          ('__proto__' in {}
            ? (function (e, t, r) {
                try {
                  (r = n(36)(Function.call, n(72).f(Object.prototype, '__proto__').set, 2))(e, []),
                    (t = !(e instanceof Array));
                } catch (e) {
                  t = !0;
                }
                return function (e, n) {
                  return o(e, n), t ? (e.__proto__ = n) : r(e, n), e;
                };
              })({}, !1)
            : void 0),
        check: o,
      };
    },
    function (e, t, n) {
      var r = n(16);
      r(r.S, 'Object', { setPrototypeOf: n(226).set });
    },
    function (e, t, n) {
      n(227), (e.exports = n(6).Object.setPrototypeOf);
    },
    function (e, t, n) {
      e.exports = { default: n(228), __esModule: !0 };
    },
    function (e, t, n) {
      var r = n(16);
      r(r.S + r.F * !n(18), 'Object', { defineProperty: n(15).f });
    },
    function (e, t, n) {
      n(230);
      var r = n(6).Object;
      e.exports = function (e, t, n) {
        return r.defineProperty(e, t, n);
      };
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t) {
      function n(e) {
        (e = e || {}),
          (this.ms = e.min || 100),
          (this.max = e.max || 1e4),
          (this.factor = e.factor || 2),
          (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
          (this.attempts = 0);
      }
      (e.exports = n),
        (n.prototype.duration = function () {
          var e = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var t = Math.random(),
              n = Math.floor(t * this.jitter * e);
            e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n;
          }
          return 0 | Math.min(e, this.max);
        }),
        (n.prototype.reset = function () {
          this.attempts = 0;
        }),
        (n.prototype.setMin = function (e) {
          this.ms = e;
        }),
        (n.prototype.setMax = function (e) {
          this.max = e;
        }),
        (n.prototype.setJitter = function (e) {
          this.jitter = e;
        });
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i = n(155),
        o = (r = i) && r.__esModule ? r : { default: r };
      (t.default = function () {
        var e,
          t,
          n,
          r =
            ((e = 'BrowserLeaks,com <canvas> 1.0'),
            (t = document.createElement('canvas')),
            ((n = t.getContext('2d')).textBaseline = 'top'),
            (n.font = "14px 'Arial'"),
            (n.textBaseline = 'alphabetic'),
            (n.fillStyle = '#f60'),
            n.fillRect(125, 1, 62, 20),
            (n.fillStyle = '#069'),
            n.fillText(e, 2, 15),
            (n.fillStyle = 'rgba(102, 204, 0, 0.7)'),
            n.fillText(e, 4, 17),
            t.toDataURL());
        return (0, o.default)(r);
      }),
        (e.exports = t.default);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.AuidoMixingState = { UNSTART: 0, STARTING: 1, PLAYED: 2, PAUSED: 3, STOPED: 4 };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.Webrtc2ErrorCode = {
        OK: { name: 'OK', code: 200, desc: 'success' },
        clientNotYetUninitialized: {
          name: 'client not yet uninitialized',
          code: 1e3,
          desc: '请先调用createClient创建Client',
        },
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(270);
      Object.defineProperty(t, 'Webrtc2ErrorCode', {
        enumerable: !0,
        get: function () {
          return r.Webrtc2ErrorCode;
        },
      });
      (t.CommonErrorCode = {
        OK: { name: 'OK', code: 200, desc: 'success' },
        ChannelReserveTimeOut: { name: 'ChannelReserveTimeOut', code: 101, desc: '请求超时' },
        ChannelReserveErrorParam: {
          name: 'ChannelReserveErrorParam',
          code: 414,
          desc: '服务器请求参数错误',
        },
        ChannelReserveMoreThanTwoUser: {
          name: 'ChannelReserveMoreThanTwoUser',
          code: 600,
          desc: '只支持两个用户, 有第三个人试图使用相同的频道名分配频道',
        },
        ChannelReserveServerFail: {
          name: 'ChannelReserveServerFail',
          code: 601,
          desc: '分配频道服务器出错',
        },
        ChannelJoinTimeOut: { name: 'ChannelJoinTimeOut', code: 20101, desc: '请求超时' },
        ChannelJoinMeetingModeError: {
          name: 'ChannelJoinMeetingModeError',
          code: 20102,
          desc: '会议模式错误',
        },
        ChannelJoinRtmpModeError: {
          name: 'ChannelJoinRtmpModeError',
          code: 20103,
          desc: 'rtmp用户加入非rtmp频道',
        },
        ChannelJoinRtmpNodesError: {
          name: 'ChannelJoinRtmpNodesError',
          code: 20104,
          desc: '超过频道最多rtmp人数限制',
        },
        ChannelJoinRtmpHostError: {
          name: 'ChannelJoinRtmpHostError',
          code: 20105,
          desc: '已经存在一个主播',
        },
        ChannelJoinRtmpCreateError: {
          name: 'ChannelJoinRtmpCreateError',
          code: 20106,
          desc: '需要旁路直播, 但频道创建者非主播',
        },
        ChannelJoinLayoutError: {
          name: 'ChannelJoinLayoutError',
          code: 20208,
          desc: '主播自定义布局错误',
        },
        ChannelJoinInvalidParam: { name: 'ChannelJoinInvalidParam', code: 20400, desc: '参数错误' },
        ChannelJoinDesKey: { name: 'ChannelJoinDesKey', code: 20401, desc: '密码加密错误' },
        ChannelJoinInvalidRequst: {
          name: 'ChannelJoinInvalidRequst',
          code: 20417,
          desc: '错误请求',
        },
        ChannelServerUnknown: { name: 'ChannelServerUnknown', code: 20500, desc: '服务器内部错误' },
        ChannelStartFail: { name: 'ChannelStartFail', code: 11e3, desc: '通道发起失败' },
        ChannelDisconnected: { name: 'ChannelDisconnected', code: 11001, desc: '断开连接' },
        VersionSelfLow: { name: 'VersionSelfLow', code: 11002, desc: '本人SDK版本太低不兼容' },
        VersionRemoteLow: { name: 'VersionRemoteLow', code: 11003, desc: '对方SDK版本太低不兼容' },
        BrowserNotSupport: { name: 'BrowserNotSupport', code: 11004, desc: '浏览器版本不支持' },
        ChannelClosed: { name: 'ChannelClosed', code: 11005, desc: '通道被关闭' },
        ChannelKicked: { name: 'ChannelKicked', code: 11006, desc: '账号被踢' },
        DataError: { name: 'DataError', code: 11400, desc: '数据错误' },
        Invalid: { name: 'Invalid', code: 11403, desc: '无效的操作' },
        ParamError: { name: 'ParamError', code: 11405, desc: '参数错误' },
        ChannelCreatingError: { name: 'ChannelCreatingError', code: 20110, desc: '创建房间失败' },
        ChannelJoinError: { name: 'ChannelJoinError', code: 20111, desc: '加入房间失败' },
        ChannelJoinAlreadyIn: { name: 'ChannelJoinAlreadyIn', code: 20112, desc: '已经在房间中' },
        ChannelSessionNotExists: {
          name: 'ChannelSessionNotExists',
          code: 20113,
          desc: '会话/连接不存在',
        },
        ChannelAlreadyInSession: {
          name: 'ChannelAlreadyInSession',
          code: 20114,
          desc: '会话已建立，请在会话建立前调用',
        },
        NIMNotInited: { name: 'NIMNotInited', code: 20115, desc: 'NIM Info 未被初始化' },
        ServerConnectionError: {
          name: 'ServerConnectionError',
          code: 20116,
          desc: '服务器连接错误',
        },
        StageNotMatch: { name: 'StageNotMatch', code: 20117, desc: '场景不匹配(P2P/MEETING)' },
        StageNoPermission: { name: 'StageNoPermission', code: 20118, desc: '当前场景没有权限' },
        RoleNoPermission: { name: 'RoleNoPermission', code: 20119, desc: '当前角色没有权限' },
        NetworkInDetecting: { name: 'NetworkInDetecting', code: 20120, desc: '网络正在探测中' },
        FunctionNotEnabled: { name: 'FunctionNotEnabled', code: 20500, desc: '该功能没有启用' },
      }),
        (t.RoomServerErrorCode = {
          OK: { name: 'RoomServerErrOK', code: 200, desc: '操作成功' },
          RoomServerErrAuthError: { name: 'RoomServerErrAuthError', code: 401, desc: '认证错误' },
          RoomServerErrChannelNotExist: {
            name: 'RoomServerErrChannelNotExist',
            code: 404,
            desc: '房间不存在',
          },
          RoomServerErrUidNotExist: {
            name: 'RoomServerErrUidNotExist',
            code: 405,
            desc: '房间下的uid不存在',
          },
          RoomServerErrNoPermission: {
            name: 'RoomServerErrUidNotExist',
            code: 406,
            desc: '没有权限',
          },
          RoomServerErrDataError: {
            name: 'RoomServerErrDataError',
            code: 417,
            desc: '请求数据不对',
          },
          RoomServerErrUnknown: {
            name: 'RoomServerErrUnknown',
            code: 500,
            desc: '内部错误（TurnServer请求异常）',
          },
          RoomServerErrServerError: {
            name: 'RoomServerErrServerError',
            code: 600,
            desc: '服务器内部错误',
          },
          RoomServerErrInvilid: { name: 'RoomServerErrInvilid', code: 11403, desc: '无效的操作' },
        }),
        (t.VideoRecordErrorCode = {
          VideoRecordClose: { name: 'VideoRecordClose', code: 0, desc: '视频录制正常结束' },
          VideoRecordVideoSizeError: {
            name: 'VideoRecordVideoSizeError',
            code: 1,
            desc: '视频录制结束，视频画面大小变化',
          },
          VideoRecordOutDiskSpace: {
            name: 'VideoRecordOutDiskSpace',
            code: 2,
            desc: '视频录制结束，磁盘空间不足',
          },
          VideoRecordThreadBusy: {
            name: 'VideoRecordThreadBusy',
            code: 3,
            desc: '视频录制结束，录制线程繁忙',
          },
          VideoRecordCreate: { name: 'VideoRecordCreate', code: 200, desc: '视频录制文件创建' },
          VideoRecordExsit: {
            name: 'VideoRecordExsit',
            code: 400,
            desc: '视频录制文件已经存在，请下载或清除',
          },
          VideoRecordCreateError: {
            name: 'VideoRecordCreateError',
            code: 403,
            desc: '视频录制文件创建失败',
          },
          VideoRecordInvalid: { name: 'VideoRecordInvalid', code: 404, desc: '通话不存在' },
          RecordNotExist: {
            name: 'RecordNotExist',
            code: 67001,
            desc: '录制对象不存在或录制已结束',
          },
          RecordLackAccount: { name: 'RecordLackAccount', code: 67002, desc: '需要录制的帐号缺失' },
          RecordNoStream: {
            name: 'RecordNoStream',
            code: 67003,
            desc: '当前没有音视频数据，无法进行录制',
          },
          RecordBrowserNotSupport: {
            name: 'RecordBrowserNotSupport',
            code: 67004,
            desc: '当前浏览器不支持音视频录制功能',
          },
          RecordBrowserNotSupportFormat: {
            name: 'RecordBrowserNotSupportFormat',
            code: 67005,
            desc: '当前浏览器不支持对应格式的音视频录制',
          },
          RecordInRecording: {
            name: 'RecordInRecording',
            code: 67006,
            desc: '音视频正在录制中，请勿重复操作',
          },
          RecordFormatError: {
            name: 'RecordFormatError',
            code: 67007,
            desc: '音视频解码/格式化失败',
          },
          RecordStreamInvalid: { name: 'RecordStreamInvalid', code: 67008, desc: '音视频流错误' },
        }),
        (t.AudioRecordErrorCode = {
          AudioRecordClose: { name: 'AudioRecordClose', code: 0, desc: '音频录制正常结束' },
          AudioRecordOutDiskSpace: {
            name: 'AudioRecordOutDiskSpace',
            code: 2,
            desc: '音频录制结束，磁盘空间不足',
          },
          AudioRecordCreate: { name: 'AudioRecordCreate', code: 200, desc: '音频录制文件创建成功' },
          AudioRecordExsit: { name: 'AudioRecordExsit', code: 400, desc: '音频录制文件已经存在' },
          AudioRecordCreateError: {
            name: 'AudioRecordCreateError',
            code: 403,
            desc: '音频录制文件文件创建失败',
          },
          AudioRecordInvalid: { name: 'AudioRecordInvalid', code: 404, desc: '通话不存在' },
        }),
        (t.LiveStatusErrorCode = {
          LiveStatusInitial: { name: 'LiveStatusInitial', code: 500, desc: '初始状态' },
          LiveStatusLayoutError: {
            name: 'LiveStatusLayoutError',
            code: 501,
            desc: '主播设置定制布局，布局参数错误',
          },
          LiveStatusStartConnecting: {
            name: 'LiveStatusStartConnecting',
            code: 502,
            desc: '开始连接',
          },
          LiveStatusConnectted: { name: 'LiveStatusConnected', code: 503, desc: '连接成功' },
          LiveStatusConnectFail: { name: 'LiveStatusConnectFail', code: 504, desc: '连接失败' },
          LiveStatusPushing: { name: 'LiveStatusPushing', code: 505, desc: '推流中' },
          LiveStatusPushFail: { name: 'LiveStatusPushFail', code: 506, desc: '互动直播推流失败' },
          LiveStatusInnerError: { name: 'LiveStatusInnerError', code: 507, desc: '内部错误' },
          LiveStatusPeopleLimit: { name: 'LiveStatusPeopleLimit', code: 508, desc: '人数超出限制' },
        }),
        (t.GateWayErrorCode = {
          GateWayLoginFail: { name: 'GateWayLoginFail', code: 61001, desc: '网关登录失败' },
          GateWaySdpAnswerError: {
            name: 'GateWaySdpAnswerError',
            code: 61002,
            desc: '网关服务器验证不通过',
          },
          GateWayConnectionTimeout: {
            name: 'GateWayConnectionTimeout',
            code: 61003,
            desc: '网关连接超时',
          },
          GateWayAddressNotAvailable: {
            name: 'GateWayAddressNotAvailable',
            code: 61004,
            desc: '无可用的网关地址，请确保对方打开了WebRTC兼容开关',
          },
          GateWayLoginAlready: {
            name: 'GateWayLoginAlready',
            code: 61005,
            desc: '网关管理已初始化或已登录，重复操作',
          },
          GateWayServerError: { name: 'GateWayServerError', code: 61006, desc: '网关服务器错误' },
          GateWayAuthError: { name: 'GateWayAuthError', code: 61007, desc: '网关服务器鉴权失败' },
          GateWayRTCConnectFail: {
            name: 'GateWayRTCConnectFail',
            code: 61008,
            desc: 'RTC连接失败',
          },
          GateWayRTCUploadStreamFail: {
            name: 'GateWayRTCUploadStreamFail',
            code: 61009,
            desc: 'RTC发起上行流失败',
          },
        }),
        (t.VideoErrorCode = {
          VideoDecodeError: {
            name: 'VideoDecodeError',
            code: 62001,
            desc: '该机型浏览器不支持H264编码',
          },
          VideoStreamFetchError: {
            name: 'VideoStreamFetchError',
            code: 62002,
            desc: '获取流媒体失败',
          },
          VideoStreamSwitchError: {
            name: 'VideoStreamSwitchError',
            code: 62003,
            desc: '视频流切换失败',
          },
          VideoUserHasBeenLeft: {
            name: 'VideoUserHasBeenLeft',
            code: 62005,
            desc: '用户已登出/离开房间',
          },
          VideoContainerNotExist: {
            name: 'VideoContainerNotExist',
            code: 62006,
            desc: '未设置画布容器',
          },
          VideoDisabled: { name: 'VideoDisabled', code: 62007, desc: '视频功能已被禁用' },
          VideoEnded: { name: 'VideoEnded', code: 62008, desc: '媒体流已经停止工作了' },
          VideoMixStreamExceed: {
            name: 'VideoMixStreamExceed',
            code: 62101,
            desc: '新开启或关闭混频功能时，最多只能开启一路设备',
          },
          VideoScreenShareNotSupport: {
            name: 'VideoScreenShareNotSupport',
            code: 62102,
            desc:
              '不支持原生屏幕共享功能，请确认浏览器版本或"chrome://flags/"是否开启"Experimental Web Platform features"',
          },
        }),
        (t.AudioErrorCode = {
          AudioStreamFetchError: {
            name: 'AudioStreamFetchError',
            code: 63002,
            desc: '获取音频流失败',
          },
          AudioUserHasBeenLeft: {
            name: 'AudioUserHasBeenLeft',
            code: 63005,
            desc: '用户已登出/离开房间',
          },
          AudioDisabled: { name: 'AudioDisabled', code: 63007, desc: '音频功能已被禁用' },
          MusicalAccompanimentError: { name: 'AudioMixingError', code: 63100, desc: '伴音出错' },
          AudioFileDownloadError: {
            name: 'AudioFileDownloadError',
            code: 63101,
            desc: '伴音文件加载失败',
          },
          MusicalAccompanimentUnsupport: {
            name: 'AudioMixingUnsupport',
            code: 63102,
            desc: '该浏览器不支持伴音功能',
          },
          UnpauseMusicalAccompaniment: {
            name: 'UnpauseMusicalAccompaniment',
            code: 63103,
            desc: '当前没有暂停伴音',
          },
          pausedMusicalAccompaniment: {
            name: 'pausedMusicalAccompaniment',
            code: 63104,
            desc: '已经暂停暂停伴音',
          },
          UnstartMusicalAccompaniment: {
            name: 'UnstartMusicalAccompaniment',
            code: 63105,
            desc: '当前没有伴音',
          },
        }),
        (t.DeviceErrorCode = {
          DeviceNotSupport: { name: 'DeviceNotSupport', code: 65001, desc: '不支持的设备类型' },
          DeviceNotExists: { name: 'DeviceNotExists', code: 65002, desc: '设备不存在/无任何设备' },
          DeviceVideoOccupied: {
            name: 'VideoDeciveOccupied',
            code: 65003,
            desc: '视频设备已被占用',
          },
          DeviceAudioOccupied: {
            name: 'AudioDeciveOccupied',
            code: 65004,
            desc: '音频设备已被占用',
          },
          DeviceOpenError: { name: 'DeviceOpenError', code: 65005, desc: '设备开启失败，未知错误' },
          DeviceNotOpen: { name: 'DeviceNotOpen', code: 65006, desc: '设备未开启/未初始化' },
          DeviceAlreadyOpen: {
            name: 'DeviceAlreadytOpen',
            code: 65007,
            desc: '设备已开启，重复操作',
          },
          DeviceNotAvailable: {
            name: 'DeviceNotAvailable',
            code: 65008,
            desc: '获取可用设备列表失败',
          },
          DevicePluginNotInstalled: {
            name: 'DevicePluginNotInstalled',
            code: 62008,
            desc: '未安装插件',
          },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      (t.WEBRTC2_GATE_WAY_API = {
        login_req: { key: 'login_req', label: '登录' },
        login_ack: { key: 'login_ack', label: '登录响应' },
        keep_alive: { key: 'keep_alive', label: '信令层探活' },
        keep_alive_ack: { key: 'keep_alive_ack', label: '信令层探活响应' },
        logout: { key: 'logout', label: '退出' },
        user_update: { key: 'user_update', label: '更新会者基本信息' },
        media_update: { key: 'media_update', label: '更新会者媒体信息' },
        sub_source: { key: 'sub_source', label: '订阅指定质量视频' },
        ssrc_update: { key: 'ssrc_update', label: '接收者分辨率切换' },
        mute_update: { key: 'mute_update', label: '更新用户指定设备下的状态' },
        user_pub: { key: 'user_pub', label: '用户发布信息' },
        pub_ack: { key: 'pub_ack', label: '用户发布信息响应' },
        user_sub: { key: 'user_sub', label: '用户订阅信息' },
        sub_ack: { key: 'sub_ack', label: '用户订阅信息响应' },
        user_asl_sub: { key: 'user_asl_sub', label: 'ASL subscribe的消息' },
        user_asl_sub_ack: { key: 'user_asl_sub_ack', label: 'ASL subscribe的消息响应' },
        channel_state: { key: 'channel_state', label: '频道状态信息' },
      }),
        (t.CLIENT_LOGIN_OF_WEBRTC2 = {
          cmd_type: 'login_req',
          externalid: '',
          cid: '',
          subtype: '',
          role: '',
          username: '',
          token: '',
          version: '',
          roomname: '',
          sessionmode: '',
          engineversion: '',
          usertype: '16',
          aslmode: '',
          rtmp: {
            host: '0',
            support: '0',
            needrecord: '0',
            rtmpurl: '',
            Participantmode: '',
            layout: '',
          },
          record: {
            startcaller: '0',
            host: '0',
            support_video: '0',
            support_auido: '0',
            recordtype: '',
            layout: '',
          },
          browser: { name: '', version: '' },
        }),
        (t.LOGIN_ACK_OF_WEBRTC2 = {
          cmd_type: 'login_ack',
          externalid: '',
          cid: '',
          result: '',
          record: '',
          userid: '',
          aslmode: '',
          serverfp: '',
        }),
        (t.KEEP_ALIVE_OF_WEBRTC2 = { cmd_type: 'keep_alive', userid: '', cid: '' }),
        (t.KEEP_ALIVE_ACK_OF_WEBRTC2 = {
          cmd_type: 'keep_alive_ack',
          userid: '',
          cid: '',
          livecode: '',
        }),
        (t.LOGOUT_OF_WEBRTC2 = { cmd_type: 'logout', userid: '', cid: '', reason: '' }),
        (t.USER_UPDATE_WEBRTC2 = { cmd_type: 'user_update', cid: '', updatetype: '', users: [] }),
        (t.MEDIA_UPDATE_WEBRTC2 = { cmd_type: 'media_update', cid: '', users: [] }),
        (t.SUB_SOURCE_WEBRTC2 = {
          cmd_type: 'sub_source',
          cid: '',
          userid: '',
          mediatype: 'video',
          deviceid: '',
          quality: '',
          maxbitrate: '',
        }),
        (t.SSRC_UPDATE_WEBRTC2 = {
          cmd_type: 'ssrc_update',
          cid: '',
          userid: '',
          sid: '',
          mediatype: 'video',
          deviceid: '',
          cname: '',
          mlabel: '',
          mslabel: '',
          ssrc: '',
          nack_ssrc: '',
        }),
        (t.MUTE_UPDATE_WEBRTC2 = {
          cmd_type: 'mute_update',
          cid: '',
          userid: '',
          sid: '',
          mediatype: 'video',
          deviceid: '',
          status: '',
        }),
        (t.USER_PUB_WEBRTC2 = {
          cmd_type: 'user_pub',
          cid: '',
          userid: '',
          negotype: '',
          sdp: '',
          devices: [],
        }),
        (t.PUB_ACK_WEBRTC2 = { cmd_type: 'pub_ack', cid: '', sid: '', sdp: '' }),
        (t.USER_SUB_WEBRTC2 = {
          cmd_type: 'user_sub',
          cid: '',
          userid: '',
          sid: '',
          negotype: '',
          sdp: '',
          devices: [],
        }),
        (t.SUB_ACK_WEBRTC2 = {
          cmd_type: 'sub_ack',
          cid: '',
          userid: '',
          sid: '',
          deviceid: '',
          sdp: '',
        }),
        (t.USER_ASL_SUB_WEBRTC2 = { cmd_type: 'user_asl_sub', cid: '', userid: '', subtype: '' }),
        (t.USER_ASL_SUB_ACK_WEBRTC2 = {
          cmd_type: 'user_asl_sub_ack',
          cid: '',
          userid: '',
          result: '',
        }),
        (t.CHANNEL_STATE_WEBRTC2 = { cmd_type: 'channel_state', cid: '', userid: '', reason: '' });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.WEBRTC_GATE_WAY_API = {
        client_login: { key: 'client_login', label: '登录' },
        login_ack: { key: 'login_ack', label: '登录响应' },
        sdp_offer: { key: 'sdp_offer', label: '发送sdp offer描述' },
        sdp_answer: { key: 'sdp_answer', label: 'sdp answer响应' },
        ice_offer: { key: 'ice_offer', label: '发送ice offer描述' },
        ice_answer: { key: 'ice_answer', label: 'ice answer响应' },
        keep_alive: { key: 'keep_alive', label: '信令层探活' },
        keep_alive_ack: { key: 'keep_alive_ack', label: '信令层探活响应' },
        sdp_update: { key: 'sdp_update', label: 'sdp更新（关闭/打开设备时发送）' },
        client_join: { key: 'client_join', label: '人员加入通知' },
        client_update: { key: 'client_update', label: '人员更新（关闭/打开设备时发送）' },
        client_logout: { key: 'client_logout', label: '人员离开' },
        logout: { key: 'logout', label: '退出' },
        client_error: { key: 'client_error', label: '客户端出现错误' },
        detect_network: { key: 'net_detect_result', label: '网关反馈网络探测结果' },
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.SDP_UPDATE_OF_WEBRTC = t.SDP_OFFER_OF_WEBRTC = t.SDP_ANSWER_OF_WEBRTC = void 0);
      var r = n(28);
      (t.SDP_ANSWER_OF_WEBRTC = {
        type: 'sdp_answer',
        uid: '',
        cid: '',
        h5_flag: r.RtcSystem.h5() || !1,
        params: { auth_res: 200, dst_id: '', content: { type: 'answer', sdp: '' } },
      }),
        (t.SDP_OFFER_OF_WEBRTC = {
          type: 'sdp_offer',
          uid: '',
          cid: '',
          hasAudio: !0,
          hasVideo: !0,
          session_mode: 'p2p',
          h5_flag: r.RtcSystem.h5() || !1,
          params: {
            content: { type: 'offer', sdp: '' },
            dst_id: '',
            user_token_type: 0,
            user_type: 3,
            version: 1,
            is_multi_peerconnection: !0,
            sdk_version: '5.4.0',
            streamSetting: { video: { width: 640, height: 480, frameRate: 20 } },
          },
          browser: { name: '', version: '' },
          bypass_rtmp: {
            is_host: !1,
            support_bypass_rtmp: !1,
            support_bypass_rtmp_record: !1,
            bypass_rtmp_url: '',
            layout: '',
            participant_mode: '',
          },
          record: { support_audio_record: !1, support_video_record: !1 },
        }),
        (t.SDP_UPDATE_OF_WEBRTC = {
          type: 'sdp_update',
          uid: '',
          cid: '',
          hasAudio: !0,
          hasVideo: !0,
          session_mode: 'p2p',
          h5_flag: r.RtcSystem.h5() || !1,
          params: {
            content: { type: 'offer', sdp: '' },
            dst_id: '',
            user_token_type: 0,
            user_type: 3,
            version: 1,
            is_multi_peerconnection: !0,
            sdk_version: '5.4.0',
            streamSetting: { video: { width: 640, height: 480, frameRate: 20 } },
          },
          browser: { name: '', version: '' },
          bypass_rtmp: {
            is_host: !1,
            support_bypass_rtmp: !1,
            support_bypass_rtmp_record: !1,
            bypass_rtmp_url: '',
            layout: '',
            participant_mode: '',
          },
          record: { support_audio_record: !1, support_video_record: !1 },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.LOGOUT_OF_WEBRTC = t.LOGIN_ACK_OF_WEBRTC = void 0);
      var r = n(28);
      (t.LOGIN_ACK_OF_WEBRTC = {
        type: 'login_ack',
        uid: '',
        cid: '',
        h5_flag: r.RtcSystem.h5() || !1,
        params: { auth_res: 200 },
      }),
        (t.LOGOUT_OF_WEBRTC = {
          type: 'logout',
          uid: '',
          cid: '',
          h5_flag: r.RtcSystem.h5() || !1,
          browser: { name: '', version: '' },
          params: { content: { timestamp: 0 } },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.KEEP_ALIVE_ACK_OF_WEBRTC = t.KEEP_ALIVE_OF_WEBRTC = void 0);
      var r = n(28);
      (t.KEEP_ALIVE_OF_WEBRTC = {
        type: 'keep_alive',
        uid: '',
        cid: '',
        h5_flag: r.RtcSystem.h5() || !1,
        browser: { name: '', version: '' },
        params: { content: { timestamp: 0 } },
      }),
        (t.KEEP_ALIVE_ACK_OF_WEBRTC = {
          type: 'keep_alive_ack',
          uid: '',
          cid: '',
          params: { content: { timestamp: 0 } },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.ICE_OFFER_OF_WEBRTC = t.ICE_ANSWER_OF_WEBRTC = void 0);
      var r = n(28);
      (t.ICE_ANSWER_OF_WEBRTC = {
        type: 'ice_answer',
        uid: '',
        cid: '',
        h5_flag: r.RtcSystem.h5() || !1,
        params: { dst_id: '', content: { candidate: '', sdpMid: '', sdpMLineIndex: '' } },
      }),
        (t.ICE_OFFER_OF_WEBRTC = {
          type: 'ice_offer',
          uid: '',
          cid: '',
          h5_flag: r.RtcSystem.h5() || !1,
          params: {
            dst_id: '',
            content: { candidate: '', sdpMid: '', sdpMLineIndex: '', usernameFragment: '' },
          },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.CLIENT_ERROR_OF_WEBRTC = t.CLIENT_DETECT_NETWORK_RESULT_WEBRTC = t.CLIENT_UPDATE_OF_WEBRTC = t.CLIENT_JOIN_OF_WEBRTC = t.CLIENT_LOGOUT_OF_WEBRTC = t.CLIENT_LOGIN_OF_WEBRTC = void 0);
      var r = n(28);
      (t.CLIENT_LOGIN_OF_WEBRTC = {
        type: 'client_login',
        uid: '',
        cid: '',
        hasAudio: !0,
        hasVideo: !0,
        netDetect: !1,
        session_mode: 'p2p',
        h5_flag: r.RtcSystem.h5() || !1,
        params: {
          content: {},
          dst_id: '',
          user_token_type: 0,
          token: '',
          user_type: 3,
          version: 1,
          is_multi_peerconnection: !0,
          sdk_version: '5.4.0',
          streamSetting: { video: { width: 640, height: 480, frameRate: 20 } },
        },
        browser: { name: '', version: '' },
        bypass_rtmp: {
          is_host: !1,
          support_bypass_rtmp: !1,
          support_bypass_rtmp_record: !1,
          bypass_rtmp_url: '',
          layout: '',
          participant_mode: '',
        },
        record: {
          support_audio_record: !1,
          support_video_record: !1,
          single_record_in_meeting: !1,
        },
      }),
        (t.CLIENT_LOGOUT_OF_WEBRTC = {
          type: 'client_logout',
          uid: '',
          cid: '',
          params: { content: { logout_type: 'normal', timestamp: 0 } },
        }),
        (t.CLIENT_JOIN_OF_WEBRTC = {
          type: 'client_join',
          uid: '',
          cid: '',
          params: { client_id: '123122', has_audio: !0, has_video: !0 },
        }),
        (t.CLIENT_UPDATE_OF_WEBRTC = {
          type: 'client_update',
          uid: '',
          cid: '',
          params: { client_id: '123122', has_audio: !0, has_video: !0 },
        }),
        (t.CLIENT_DETECT_NETWORK_RESULT_WEBRTC = {
          type: 'net_detect_result',
          uid: '',
          cid: '',
          params: { dst_id: '', loss: '', rtt: '' },
        }),
        (t.CLIENT_ERROR_OF_WEBRTC = {
          type: 'client_error',
          uid: '',
          cid: '',
          params: { content: { error_code: '', timestamp: 0 } },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(278);
      Object.defineProperty(t, 'CLIENT_JOIN_OF_WEBRTC', {
        enumerable: !0,
        get: function () {
          return r.CLIENT_JOIN_OF_WEBRTC;
        },
      }),
        Object.defineProperty(t, 'CLIENT_LOGIN_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_LOGIN_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_LOGOUT_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_LOGOUT_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_ERROR_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_ERROR_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_DETECT_NETWORK_RESULT_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_DETECT_NETWORK_RESULT_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_UPDATE_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_UPDATE_OF_WEBRTC;
          },
        });
      var i = n(277);
      Object.defineProperty(t, 'ICE_ANSWER_OF_WEBRTC', {
        enumerable: !0,
        get: function () {
          return i.ICE_ANSWER_OF_WEBRTC;
        },
      }),
        Object.defineProperty(t, 'ICE_OFFER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return i.ICE_OFFER_OF_WEBRTC;
          },
        });
      var o = n(276);
      Object.defineProperty(t, 'KEEP_ALIVE_OF_WEBRTC', {
        enumerable: !0,
        get: function () {
          return o.KEEP_ALIVE_OF_WEBRTC;
        },
      }),
        Object.defineProperty(t, 'KEEP_ALIVE_ACK_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return o.KEEP_ALIVE_ACK_OF_WEBRTC;
          },
        });
      var a = n(275);
      Object.defineProperty(t, 'LOGIN_ACK_OF_WEBRTC', {
        enumerable: !0,
        get: function () {
          return a.LOGIN_ACK_OF_WEBRTC;
        },
      }),
        Object.defineProperty(t, 'LOGOUT_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return a.LOGOUT_OF_WEBRTC;
          },
        });
      var s = n(274);
      Object.defineProperty(t, 'SDP_ANSWER_OF_WEBRTC', {
        enumerable: !0,
        get: function () {
          return s.SDP_ANSWER_OF_WEBRTC;
        },
      }),
        Object.defineProperty(t, 'SDP_OFFER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return s.SDP_OFFER_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'SDP_UPDATE_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return s.SDP_UPDATE_OF_WEBRTC;
          },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(279);
      Object.defineProperty(t, 'CLIENT_JOIN_OF_WEBRTC', {
        enumerable: !0,
        get: function () {
          return r.CLIENT_JOIN_OF_WEBRTC;
        },
      }),
        Object.defineProperty(t, 'CLIENT_LOGIN_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_LOGIN_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_LOGOUT_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_LOGOUT_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_ERROR_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_ERROR_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_DETECT_NETWORK_RESULT_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_DETECT_NETWORK_RESULT_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'CLIENT_UPDATE_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.CLIENT_UPDATE_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'ICE_ANSWER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.ICE_ANSWER_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'ICE_OFFER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.ICE_OFFER_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'KEEP_ALIVE_ACK_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.KEEP_ALIVE_ACK_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'KEEP_ALIVE_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.KEEP_ALIVE_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'LOGIN_ACK_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.LOGIN_ACK_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'LOGOUT_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.LOGOUT_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'SDP_ANSWER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.SDP_ANSWER_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'SDP_OFFER_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.SDP_OFFER_OF_WEBRTC;
          },
        }),
        Object.defineProperty(t, 'SDP_UPDATE_OF_WEBRTC', {
          enumerable: !0,
          get: function () {
            return r.SDP_UPDATE_OF_WEBRTC;
          },
        });
      var i = n(273);
      Object.defineProperty(t, 'WEBRTC_GATE_WAY_API', {
        enumerable: !0,
        get: function () {
          return i.WEBRTC_GATE_WAY_API;
        },
      });
      var o = n(272);
      Object.defineProperty(t, 'WEBRTC2_GATE_WAY_API', {
        enumerable: !0,
        get: function () {
          return o.WEBRTC2_GATE_WAY_API;
        },
      }),
        Object.defineProperty(t, 'CLIENT_LOGIN_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.CLIENT_LOGIN_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'LOGIN_ACK_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.LOGIN_ACK_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'KEEP_ALIVE_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.KEEP_ALIVE_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'KEEP_ALIVE_ACK_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.KEEP_ALIVE_ACK_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'LOGOUT_OF_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.LOGOUT_OF_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_UPDATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_UPDATE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'MEDIA_UPDATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.MEDIA_UPDATE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'SUB_SOURCE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.SUB_SOURCE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'SSRC_UPDATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.SSRC_UPDATE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'MUTE_UPDATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.MUTE_UPDATE_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_PUB_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_PUB_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'PUB_ACK_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.PUB_ACK_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_SUB_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_SUB_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'SUB_ACK_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.SUB_ACK_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_ASL_SUB_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_ASL_SUB_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'USER_ASL_SUB_ACK_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.USER_ASL_SUB_ACK_WEBRTC2;
          },
        }),
        Object.defineProperty(t, 'CHANNEL_STATE_WEBRTC2', {
          enumerable: !0,
          get: function () {
            return o.CHANNEL_STATE_WEBRTC2;
          },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.GATE_WAY_RESPONSE_CODE = { OK: 'OK', NO_CONNECTION: 'NO_CONNECTION' };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(281);
      Object.defineProperty(t, 'GATE_WAY_RESPONSE_CODE', {
        enumerable: !0,
        get: function () {
          return r.GATE_WAY_RESPONSE_CODE;
        },
      });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.SetVideoViewRemoteSizeRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.SetVideoViewRemoteSizeRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.account,
          r = t.width,
          i = t.height,
          a = t.cut;
        (this.account = n), (this.width = r), (this.height = i), (this.cut = a);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.SetVideoViewSizeRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.SetVideoViewSizeRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.width,
          r = t.height,
          i = t.cut;
        (this.width = n), (this.height = r), (this.cut = i);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.StartRemoteStreamRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.StartRemoteStreamRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.account,
          r = t.node,
          i = t.poster;
        (this.account = n), (this.node = r), (this.poster = i);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.StartDeviceRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.StartDeviceRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.type,
          r = t.device,
          i = t.width,
          a = t.height,
          s = t.account,
          c = t.uid;
        (this.type = n),
          (this.device = r),
          void 0 !== i && (this.width = i),
          void 0 !== a && (this.height = a),
          void 0 !== s && (this.account = s),
          void 0 !== c && (this.uid = c);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.SetVideoScaleRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.SetVideoScaleRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.account,
          r = t.type;
        (this.account = n), (this.type = r);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.JoinChannelRequestParam4NRTC = void 0);
      var r = {
        channelName: '',
        uid: 0,
        accid: '',
        role: n(142).ROLE_FOR_MEETING.ROLE_PLAYER,
        videoDeviceId: null,
        audioDeviceId: null,
        joinChannelRecordConfig: {
          recordAudio: !1,
          recordVideo: !1,
          recordType: 0,
          isHostSpeaker: !1,
        },
        joinChannelLiveConfig: {
          rtmpRecord: !1,
          liveEnable: !1,
          rtmpUrl: '',
          splitMode: 0,
          layout: '',
        },
      };
      t.JoinChannelRequestParam4NRTC = r;
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.JoinChannelRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.JoinChannelRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.channelName,
          r = t.type,
          i = t.sessionConfig;
        (this.channelName = n), (this.type = r), (this.sessionConfig = i);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.CreateChannelRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.CreateChannelRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.channelName,
          r = t.custom,
          i = t.webrtcEnable;
        (this.channelName = n), (this.custom = r), (this.webrtcEnable = i);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.ControlRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.ControlRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.channelId,
          r = t.command;
        (this.channelId = n), (this.command = r);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.ResponseRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.ResponseRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.accepted,
          r = t.beCalledInfo,
          i = t.sessionConfig,
          a = t.channelId,
          s = t.command;
        (this.accepted = n),
          (this.beCalledInfo = r),
          (this.sessionConfig = i),
          (this.channelId = a),
          (this.command = s);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.CallRequestParam = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.CallRequestParam = function e(t) {
        (0, o.default)(this, e);
        var n = t.type,
          r = t.webrtcEnable,
          i = t.account,
          a = t.pushConfig,
          s = t.sessionConfig;
        (this.type = n),
          (this.webrtcEnable = r),
          (this.account = i),
          (this.pushConfig = a),
          (this.sessionConfig = s);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.ApiParams = void 0);
      var r = n(293),
        i = n(292),
        o = n(291),
        a = n(290),
        s = n(289),
        c = n(288),
        u = n(287),
        d = n(286),
        l = n(285),
        f = n(284),
        p = n(283),
        h = {
          CallRequestParam: r.CallRequestParam,
          ResponseRequestParam: i.ResponseRequestParam,
          ControlRequestParam: o.ControlRequestParam,
          CreateChannelRequestParam: a.CreateChannelRequestParam,
          JoinChannelRequestParam: s.JoinChannelRequestParam,
          JoinChannelRequestParam4NRTC: c.JoinChannelRequestParam4NRTC,
          SetVideoScaleRequestParam: u.SetVideoScaleRequestParam,
          StartDeviceRequestParam: d.StartDeviceRequestParam,
          StartRemoteStreamRequestParam: l.StartRemoteStreamRequestParam,
          SetVideoViewSizeRequestParam: f.SetVideoViewSizeRequestParam,
          SetVideoViewRemoteSizeRequestParam: p.SetVideoViewRemoteSizeRequestParam,
        };
      t.ApiParams = h;
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.DEFAULT_WEBRTC_OPTION = t.DEFAULT_NRTC_OPTION = t.DEFAULT_NETCALL_OPTION = void 0);
      var r = n(204);
      (t.DEFAULT_NETCALL_OPTION = new r.NetcallOption({
        kickLast: !1,
        nim: null,
        container: null,
        remoteContainer: null,
        mirror: !1,
        mirrorRemote: !1,
      })),
        (t.DEFAULT_NRTC_OPTION = new r.NRTCOption({ appkey: '', chromeId: null, debug: !1 })),
        (t.DEFAULT_WEBRTC_OPTION = new r.WebRTCOption({
          nim: null,
          container: null,
          remoteContainer: null,
          chromeId: null,
          debug: !1,
        }));
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(204);
      Object.defineProperty(t, 'NetcallOption', {
        enumerable: !0,
        get: function () {
          return r.NetcallOption;
        },
      }),
        Object.defineProperty(t, 'WebRTCOption', {
          enumerable: !0,
          get: function () {
            return r.WebRTCOption;
          },
        }),
        Object.defineProperty(t, 'NRTCOption', {
          enumerable: !0,
          get: function () {
            return r.NRTCOption;
          },
        });
      var i = n(295);
      Object.defineProperty(t, 'DEFAULT_NETCALL_OPTION', {
        enumerable: !0,
        get: function () {
          return i.DEFAULT_NETCALL_OPTION;
        },
      }),
        Object.defineProperty(t, 'DEFAULT_NRTC_OPTION', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_NRTC_OPTION;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_WEBRTC_OPTION', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_WEBRTC_OPTION;
          },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.DEFAULT_PUSH_CONFIG = void 0);
      var r = n(206);
      t.DEFAULT_PUSH_CONFIG = new r.PushConfig({
        enable: !0,
        needBadge: !0,
        needPushNick: !0,
        pushContent: '',
        custom: '',
        pushPayload: '',
        sound: !0,
      });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.SCALE_TYPE = {
        CHAT_VIDEO_SCALE_None: 0,
        CHAT_VIDEO_SCALE_1x1: 1,
        CHAT_VIDEO_SCALE_4x3: 2,
        CHAT_VIDEO_SCALE_16x9: 3,
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.VIDEO_ENCODE_MODE = {
        CHAT_VIDEO_ENCODEMODE_NORMAL: 0,
        CHAT_VIDEO_ENCODEMODE_SMOOTH: 1,
        CHAT_VIDEO_ENCODEMODE_QUALITY: 2,
        CHAT_VIDEO_ENCODEMODE_SCREEN: 3,
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.DECTECT_TYPE = { NETDETECT_AUDIO: 0, NETDETECT_VIDEO: 1 };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.DECTECT_RESULT_TYPE = {
        CHAT_NET_STATUS_VERY_GOOD: 0,
        CHAT_NET_STATUS_GOOD: 1,
        CHAT_NET_STATUS_POOR: 2,
        CHAT_NET_STATUS_BAD: 3,
        CHAT_NET_STATUS_VERY_BAD: 4,
        CHAT_NET_STATUS_VERY_BAD_VIDEO_CLOSE: -1,
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.SESSION_MODE = { P2P: 'p2p', MEETING: 'meeting' };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.ROLE_FOR_MEETING = { ROLE_PLAYER: 0, ROLE_AUDIENCE: 1 };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.MIX_VIDEO_MODE = {
        LAYOUT_TOP_LEFT: 1,
        LAYOUT_TOP_RIGHT: 2,
        LAYOUT_BOTTOM_LEFT: 3,
        LAYOUT_BOTTOM_RIGHT: 4,
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.SPLIT_MODE = {
        LAYOUT_SPLITBOTTOMHORFLOATING: 0,
        LAYOUT_SPLITTOPHORFLOATING: 1,
        LAYOUT_SPLITLATTICETILE: 2,
        LAYOUT_SPLITLATTICECUTTINGTILE: 3,
        LAYOUT_SPLITCUSTOM: 4,
        LAYOUT_SPLITAUDIO: 5,
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.NETCALL_TYPE = { NETCALL_TYPE_AUDIO: 1, NETCALL_TYPE_VIDEO: 2 };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.DEVICE_TYPE_REV = t.DEVICE_TYPE = void 0);
      var r,
        i,
        o = n(94),
        a = (r = o) && r.__esModule ? r : { default: r };
      var s = (t.DEVICE_TYPE = {
        DEVICE_TYPE_AUDIO_IN: 0,
        DEVICE_TYPE_AUDIO_OUT_LOCAL: 1,
        DEVICE_TYPE_AUDIO_OUT_CHAT: 2,
        DEVICE_TYPE_VIDEO: 3,
        DEVICE_TYPE_DESKTOP_SCREEN: 4,
        DEVICE_TYPE_DESKTOP_WINDOW: 5,
        DEVICE_TYPE_DESKTOP_CHROME_SCREEN: 6,
        DEVICE_TYPE_CUSTOM_AUDIO: 7,
        DEVICE_TYPE_CUSTOM_VIDEO: 8,
      });
      t.DEVICE_TYPE_REV =
        ((i = {}),
        (0, a.default)(i, s.DEVICE_TYPE_AUDIO_IN, 'audioIn'),
        (0, a.default)(i, s.DEVICE_TYPE_AUDIO_OUT_LOCAL, 'audioOut'),
        (0, a.default)(i, s.DEVICE_TYPE_AUDIO_OUT_CHAT, 'audioOut'),
        (0, a.default)(i, s.DEVICE_TYPE_VIDEO, 'video'),
        i);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.CONFIG_MAP = void 0);
      var r,
        i,
        o,
        a = n(94),
        s = (r = a) && r.__esModule ? r : { default: r };
      var c = {
        CURRENT: { SDK_TYPE: null },
        SDK_TYPE: { NETCALL: 1, WEBRTC: 2, WHITEBOARD: 3, NRTC: 4, WEBRTC2: 5 },
        SDK_NAME: { 1: 'Netcall', 2: 'WebRTC', 3: 'WhiteBoard', 4: 'NRTC', 5: 'WEBRTC2' },
      };
      (c.STATS_FUN =
        ((i = {}),
        (0, s.default)(i, c.SDK_TYPE.NETCALL, 1),
        (0, s.default)(i, c.SDK_TYPE.WEBRTC, 1),
        (0, s.default)(i, c.SDK_TYPE.WEBRTC2, 1),
        (0, s.default)(i, c.SDK_TYPE.NRTC, 1),
        (0, s.default)(i, c.SDK_TYPE.WHITEBOARD, 0),
        i)),
        (c.STATS_RTC =
          ((o = {}),
          (0, s.default)(o, c.SDK_TYPE.WEBRTC, 1),
          (0, s.default)(o, c.SDK_TYPE.WEBRTC2, 1),
          (0, s.default)(o, c.SDK_TYPE.NRTC, 1),
          (0, s.default)(o, c.SDK_TYPE.WHITEBOARD, 0),
          o)),
        (t.CONFIG_MAP = c);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
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
        NETCALL_CONTROL_COMMAND_SELF_AUDIO_INVALID: 16,
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.ENCRYPTION_ALGORITHM_MODE = {
        ENCRYPTION_ALGORITHM_NONE: 0,
        ENCRYPTION_ALGORITHM_RSA: 1,
        ENCRYPTION_ALGORITHM_AES_128_ECB: 2,
        ENCRYPTION_ALGORITHM_AES_256_CBC: 3,
        ENCRYPTION_ALGORITHM_AES_256_CTR: 4,
        ENCRYPTION_ALGORITHM_AES_128_XTS: 5,
        ENCRYPTION_ALGORITHM_AES_256_XTS: 6,
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.VIDEO_FRAME_RATE_REV = t.VIDEO_FRAME_RATE = void 0);
      var r,
        i,
        o = n(94),
        a = (r = o) && r.__esModule ? r : { default: r };
      t.validateVideoFrameRate = function (e) {
        var t = Object.keys(s),
          n = !1;
        for (var r in t) s[r] === e && (n = !0);
        return n;
      };
      var s = (t.VIDEO_FRAME_RATE = {
        CHAT_VIDEO_FRAME_RATE_NORMAL: 0,
        CHAT_VIDEO_FRAME_RATE_5: 1,
        CHAT_VIDEO_FRAME_RATE_10: 2,
        CHAT_VIDEO_FRAME_RATE_15: 3,
        CHAT_VIDEO_FRAME_RATE_20: 4,
        CHAT_VIDEO_FRAME_RATE_25: 5,
      });
      t.VIDEO_FRAME_RATE_REV =
        ((i = {}),
        (0, a.default)(i, s.CHAT_VIDEO_FRAME_RATE_NORMAL, 15),
        (0, a.default)(i, s.CHAT_VIDEO_FRAME_RATE_5, 5),
        (0, a.default)(i, s.CHAT_VIDEO_FRAME_RATE_10, 10),
        (0, a.default)(i, s.CHAT_VIDEO_FRAME_RATE_15, 15),
        (0, a.default)(i, s.CHAT_VIDEO_FRAME_RATE_20, 20),
        (0, a.default)(i, s.CHAT_VIDEO_FRAME_RATE_25, 25),
        i);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.VIDEO_QUALITY_REV = t.VIDEO_QUALITY = void 0);
      var r,
        i,
        o = n(94),
        a = (r = o) && r.__esModule ? r : { default: r };
      t.validateVideoQuality = function (e) {
        var t = Object.keys(s),
          n = !1;
        for (var r in t) s[r] === e && (n = !0);
        return n;
      };
      var s = (t.VIDEO_QUALITY = {
        CHAT_VIDEO_QUALITY_NORMAL: 0,
        CHAT_VIDEO_QUALITY_LOW: 1,
        CHAT_VIDEO_QUALITY_MEDIUM: 2,
        CHAT_VIDEO_QUALITY_HIGH: 3,
        CHAT_VIDEO_QUALITY_480P: 4,
        CHAT_VIDEO_QUALITY_540P: 5,
        CHAT_VIDEO_QUALITY_720P: 6,
        CHAT_VIDEO_QUALITY_1080P: 7,
        VIDEO_QUALITY_180p: 2,
        VIDEO_QUALITY_360p: 4,
        VIDEO_QUALITY_720p: 8,
        VIDEO_QUALITY_1080p: 16,
      });
      t.VIDEO_QUALITY_REV =
        ((i = {}),
        (0, a.default)(i, s.CHAT_VIDEO_QUALITY_NORMAL, '640x480'),
        (0, a.default)(i, s.CHAT_VIDEO_QUALITY_LOW, '176x144'),
        (0, a.default)(i, s.CHAT_VIDEO_QUALITY_MEDIUM, '352x288'),
        (0, a.default)(i, s.CHAT_VIDEO_QUALITY_HIGH, '480x360'),
        (0, a.default)(i, s.CHAT_VIDEO_QUALITY_480P, '640x480'),
        (0, a.default)(i, s.CHAT_VIDEO_QUALITY_540P, '960x540'),
        (0, a.default)(i, s.CHAT_VIDEO_QUALITY_720P, '1280x720'),
        (0, a.default)(i, s.CHAT_VIDEO_QUALITY_1080P, '1920x1080'),
        i);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.DEFAULT_SESSION_CONFIG = t.DEFAULT_SESSION_CONFIG_P2P = t.DEFAULT_SESSION_CONFIG_P2P_PCAGENT = t.DEFAULT_SESSION_CONFIG_MEETING = t.DEFAULT_SESSION_CONFIG_MEETING_PCAGENT = t.DEFAULT_SESSION_CONFIG_LIVE = t.DEFAULT_SESSION_CONFIG_LIVE_PCAGENT = void 0);
      var r = n(205),
        i = n(142);
      (t.DEFAULT_SESSION_CONFIG_LIVE_PCAGENT = new r.SessionConfig4Live({
        videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
        videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
        highAudio: !1,
        recordType: 0,
        isHostSpeaker: 0,
        rtmpUrl: '',
        splitMode: i.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
        layout: '',
        videoBitrate: 1e5,
        videoEncodeMode: i.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL,
      })),
        (t.DEFAULT_SESSION_CONFIG_LIVE = new r.SessionConfig4Live({
          videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
          videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
          highAudio: !1,
          rtmpUrl: '',
          splitMode: i.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
          layout: '',
        })),
        (t.DEFAULT_SESSION_CONFIG_MEETING_PCAGENT = new r.SessionConfig4Meeting({
          videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
          videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
          highAudio: !1,
          isHostSpeaker: !1,
          recordType: 0,
          videoBitrate: 1e5,
          videoEncodeMode: i.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL,
        })),
        (t.DEFAULT_SESSION_CONFIG_MEETING = new r.SessionConfig4Meeting({
          videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
          videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
          highAudio: !1,
          liveEnable: !1,
        })),
        (t.DEFAULT_SESSION_CONFIG_P2P_PCAGENT = new r.SessionConfig4P2P({
          videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
          videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
          highAudio: !1,
          recordVideo: !1,
          recordAudio: !1,
          singleRecord: !1,
          isHostSpeaker: !1,
          recordType: 0,
          videoBitrate: 1e5,
          videoEncodeMode: i.VIDEO_ENCODE_MODE.CHAT_VIDEO_ENCODEMODE_NORMAL,
        })),
        (t.DEFAULT_SESSION_CONFIG_P2P = new r.SessionConfig4P2P({
          videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
          videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
          highAudio: !1,
          recordVideo: !1,
          recordAudio: !1,
          singleRecord: !1,
          isHostSpeaker: !1,
          recordType: '0',
          liveEnabled: !1,
        })),
        (t.DEFAULT_SESSION_CONFIG = new r.SessionConfig({
          maxVideoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_720P,
          videoQuality: i.VIDEO_QUALITY.CHAT_VIDEO_QUALITY_NORMAL,
          videoFrameRate: i.VIDEO_FRAME_RATE.CHAT_VIDEO_FRAME_RATE_NORMAL,
          highAudio: !1,
          recordVideo: !1,
          recordAudio: !1,
          singleRecord: !1,
          isHostSpeaker: !1,
          recordType: '0',
          liveEnabled: !1,
          rtmpRecord: !1,
          rtmpUrl: '',
          splitMode: i.SPLIT_MODE.LAYOUT_SPLITBOTTOMHORFLOATING,
          layout: '',
        }));
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.PushConfig = void 0);
      var r,
        i = n(1),
        o = (r = i) && r.__esModule ? r : { default: r };
      t.PushConfig = function e(t) {
        (0, o.default)(this, e);
        var n = t.enable,
          r = t.needBadge,
          i = t.needPushNick,
          a = t.pushContent,
          s = t.custom,
          c = t.pushPayload,
          u = t.sound;
        (this.enable = n),
          (this.needBadge = r),
          (this.needPushNick = i),
          (this.pushContent = a),
          (this.custom = s),
          (this.pushPayload = c),
          (this.sound = u);
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(206);
      Object.defineProperty(t, 'PushConfig', {
        enumerable: !0,
        get: function () {
          return r.PushConfig;
        },
      }),
        Object.defineProperty(t, 'SessionConfig', {
          enumerable: !0,
          get: function () {
            return r.SessionConfig;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_PUSH_CONFIG', {
          enumerable: !0,
          get: function () {
            return r.DEFAULT_PUSH_CONFIG;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_SESSION_CONFIG', {
          enumerable: !0,
          get: function () {
            return r.DEFAULT_SESSION_CONFIG;
          },
        });
      var i = n(296);
      Object.defineProperty(t, 'NetcallOption', {
        enumerable: !0,
        get: function () {
          return i.NetcallOption;
        },
      }),
        Object.defineProperty(t, 'WebRTCOption', {
          enumerable: !0,
          get: function () {
            return i.WebRTCOption;
          },
        }),
        Object.defineProperty(t, 'NRTCOption', {
          enumerable: !0,
          get: function () {
            return i.NRTCOption;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_NETCALL_OPTION', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_NETCALL_OPTION;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_WEBRTC_OPTION', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_WEBRTC_OPTION;
          },
        }),
        Object.defineProperty(t, 'DEFAULT_NRTC_OPTION', {
          enumerable: !0,
          get: function () {
            return i.DEFAULT_NRTC_OPTION;
          },
        });
      var o = n(294);
      Object.defineProperty(t, 'ApiParams', {
        enumerable: !0,
        get: function () {
          return o.ApiParams;
        },
      });
      var a = n(142);
      Object.defineProperty(t, 'VIDEO_QUALITY', {
        enumerable: !0,
        get: function () {
          return a.VIDEO_QUALITY;
        },
      }),
        Object.defineProperty(t, 'VIDEO_QUALITY_REV', {
          enumerable: !0,
          get: function () {
            return a.VIDEO_QUALITY_REV;
          },
        }),
        Object.defineProperty(t, 'validateVideoQuality', {
          enumerable: !0,
          get: function () {
            return a.validateVideoQuality;
          },
        }),
        Object.defineProperty(t, 'VIDEO_FRAME_RATE', {
          enumerable: !0,
          get: function () {
            return a.VIDEO_FRAME_RATE;
          },
        }),
        Object.defineProperty(t, 'VIDEO_FRAME_RATE_REV', {
          enumerable: !0,
          get: function () {
            return a.VIDEO_FRAME_RATE_REV;
          },
        }),
        Object.defineProperty(t, 'validateVideoFrameRate', {
          enumerable: !0,
          get: function () {
            return a.validateVideoFrameRate;
          },
        }),
        Object.defineProperty(t, 'ENCRYPTION_ALGORITHM_MODE', {
          enumerable: !0,
          get: function () {
            return a.ENCRYPTION_ALGORITHM_MODE;
          },
        }),
        Object.defineProperty(t, 'CONTROL_TYPE', {
          enumerable: !0,
          get: function () {
            return a.CONTROL_TYPE;
          },
        }),
        Object.defineProperty(t, 'CONFIG_MAP', {
          enumerable: !0,
          get: function () {
            return a.CONFIG_MAP;
          },
        }),
        Object.defineProperty(t, 'DECTECT_RESULT_TYPE', {
          enumerable: !0,
          get: function () {
            return a.DECTECT_RESULT_TYPE;
          },
        }),
        Object.defineProperty(t, 'DECTECT_TYPE', {
          enumerable: !0,
          get: function () {
            return a.DECTECT_TYPE;
          },
        }),
        Object.defineProperty(t, 'DEVICE_TYPE', {
          enumerable: !0,
          get: function () {
            return a.DEVICE_TYPE;
          },
        }),
        Object.defineProperty(t, 'DEVICE_TYPE_REV', {
          enumerable: !0,
          get: function () {
            return a.DEVICE_TYPE_REV;
          },
        }),
        Object.defineProperty(t, 'NETCALL_TYPE', {
          enumerable: !0,
          get: function () {
            return a.NETCALL_TYPE;
          },
        }),
        Object.defineProperty(t, 'SCALE_TYPE', {
          enumerable: !0,
          get: function () {
            return a.SCALE_TYPE;
          },
        }),
        Object.defineProperty(t, 'SPLIT_MODE', {
          enumerable: !0,
          get: function () {
            return a.SPLIT_MODE;
          },
        }),
        Object.defineProperty(t, 'MIX_VIDEO_MODE', {
          enumerable: !0,
          get: function () {
            return a.MIX_VIDEO_MODE;
          },
        }),
        Object.defineProperty(t, 'NIM_SIGNALING', {
          enumerable: !0,
          get: function () {
            return a.NIM_SIGNALING;
          },
        }),
        Object.defineProperty(t, 'VIDEO_ENCODE_MODE', {
          enumerable: !0,
          get: function () {
            return a.VIDEO_ENCODE_MODE;
          },
        }),
        Object.defineProperty(t, 'ROLE_FOR_MEETING', {
          enumerable: !0,
          get: function () {
            return a.ROLE_FOR_MEETING;
          },
        }),
        Object.defineProperty(t, 'SESSION_MODE', {
          enumerable: !0,
          get: function () {
            return a.SESSION_MODE;
          },
        });
      var s = n(282);
      Object.defineProperty(t, 'GATE_WAY_RESPONSE_CODE', {
        enumerable: !0,
        get: function () {
          return s.GATE_WAY_RESPONSE_CODE;
        },
      });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.EVENT_CODE = {
        USER_LEFT_REASON: {
          quit: { name: 'USER_LEFT_QUIT', code: 0, desc: '用户主动离开' },
          timeout: {
            name: 'USER_LEFT_TIMEOUT',
            code: 1,
            desc: '因长时间收不到对方数据包，超时掉线',
          },
        },
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.EVENT_OBJ = {
        error: { key: 'error', label: '异常事件' },
        beCalling: { key: 'beCalling', label: '收到呼叫通知' },
        callAccepted: { key: 'callAccepted', label: '主叫收到被叫应答通知: 接受' },
        callRejected: { key: 'callRejected', label: '主叫收到被叫应答通知: 拒绝' },
        control: { key: 'control', label: '通话进行中收到对端的控制通知' },
        hangup: { key: 'hangup', label: '收到挂断通知' },
        callerAckSync: { key: 'callerAckSync', label: '其他端已处理的通知' },
        joinChannel: { key: 'joinChannel', label: '收到自己加入频道的通知' },
        leaveChannel: { key: 'leaveChannel', label: '收到自己离开频道的通知' },
        userJoined: { key: 'userJoined', label: '收到用户加入频道的通知' },
        userLeft: { key: 'userLeft', label: '收到用户离开频道的通知' },
        sessionDuration: { key: 'sessionDuration', label: '通话计时' },
        audioVolume: { key: 'audioVolume', label: '当前所有参与通话者的音量大小实时回调通知' },
        deviceAdd: { key: 'deviceAdd', label: '新增设备的通知' },
        deviceRemove: { key: 'deviceRemove', label: '设备移除通知' },
        deviceStatus: { key: 'deviceStatus', label: '设备状态变化通知' },
        streamEnded: { key: 'streamEnded', label: '媒体流停止通知' },
        remoteTrack: { key: 'remoteTrack', label: '收到用户媒体流的通知' },
        addTrack: { key: 'addTrack', label: '添加轨道事件' },
        removeTrack: { key: 'removeTrack', label: '删除轨道事件' },
        remoteSignalClosed: { key: 'remoteSignalClosed', label: '远端信令已关闭' },
        sessionConnected: { key: 'sessionConnected', label: '会话已连接' },
        recordStopped: { key: 'recordStopped', label: '录制已结束' },
        gatewayClosed: { key: 'gatewayClosed', label: '网关连接断开' },
        userStateUpdated: { key: 'userUpdated', label: '远端状态更新' },
        auidoMixingEnd: { key: 'auidoMixingEnd', label: '伴音文件播放完成' },
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n(317);
      Object.defineProperty(t, 'EVENT_OBJ', {
        enumerable: !0,
        get: function () {
          return r.EVENT_OBJ;
        },
      });
      var i = n(316);
      Object.defineProperty(t, 'EVENT_CODE', {
        enumerable: !0,
        get: function () {
          return i.EVENT_CODE;
        },
      });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i = n(100),
        o = (r = i) && r.__esModule ? r : { default: r };
      (t.default = {
        logger: console,
        peer: null,
        isSupportGetRecvivers: !1,
        isSupportVp8Only: function () {
          var e = this;
          return new Promise(function (t, n) {
            e.getSdp()
              .then(function (n) {
                return (
                  'firefox' !== o.default.browser.ua &&
                    e.peer.getReceivers &&
                    ('chrome' === o.default.browser.ua
                      ? o.default.browser.version >= 72 && (e.isSupportGetRecvivers = !0)
                      : (e.isSupportGetRecvivers = !0)),
                  e.peer.close(),
                  (e.peer = null),
                  'weixin' === o.default.browser.ua || navigator.userAgent.indexOf('HUAWEI M2') > 0
                    ? t({ vp8: !0, h264: !1 })
                    : /vp8/.test(n.sdp.toLowerCase())
                    ? /h264/.test(n.sdp.toLowerCase())
                      ? t({ vp8: !0, h264: !0 })
                      : t({ vp8: !0, h264: !1 })
                    : /h264/.test(n.sdp.toLowerCase())
                    ? t({ vp8: !1, h264: !0 })
                    : t({ vp8: !1, h264: !1 })
                );
              })
              .catch(function (n) {
                return (
                  console.error('webrtcUtil 发送错误 err: ', n),
                  e.peer.close(),
                  (e.peer = null),
                  t({})
                );
              });
          });
        },
        getSdp: function () {
          if (((this.peer = new RTCPeerConnection()), 'safari' === o.default.browser.ua))
            return (
              this.peer.addTransceiver('video', { direction: 'recvonly' }), this.peer.createOffer()
            );
          return this.peer.createOffer({ offerToReceiveVideo: 1 });
        },
      }),
        (e.exports = t.default);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i = n(194),
        o = (r = i) && r.__esModule ? r : { default: r };
      var a = /^ssrc_/i,
        s = /^(bweforvideo|Conn-audio-1-0|Conn-0-1-0|ssrc_)/i,
        c = /ssrc_(\d+)_send/i,
        u = /ssrc_(\d+)_recv/i,
        d = /^outbound_/i,
        l = /^inbound_/i,
        f = /^remote/i,
        p = {
          googAvailableSendBandwidth: 1,
          googTargetEncBitrate: 1,
          googActualEncBitrate: 1,
          googRetransmitBitrate: 1,
          googTransmitBitrate: 1,
        },
        h = { googCaptureStartNtpTimeMs: 1 };
      (t.default = {
        getStats: function (e) {
          var t = this;
          if (e && !/(failed|closed)/gi.test(e.iceConnectionState))
            return navigator.mozGetUserMedia
              ? this.getStatsFirefox(e)
              : /^((?!chrome).)*safari((?!chrome).)*$/gi.test(navigator.userAgent)
              ? this.getStatsSafari(e)
              : new Promise(function (n, r) {
                  e.getStats(function (r) {
                    var i = {};
                    r.result().forEach(function (e) {
                      var t = {};
                      e.names().forEach(function (n) {
                        t[n] = e.stat(n);
                      }),
                        (t.id = e.id),
                        (t.type = e.type),
                        (t.timestamp = e.timestamp),
                        (i[t.id] = t);
                    }),
                      (e.lastStats = e.lastStats || {}),
                      (i = t.format(e, i)),
                      n(i);
                  });
                });
        },
        getStatsFirefox: function (e) {
          var t = this;
          return e.getStats(null).then(function (n) {
            return (e.lastStats = e.lastStats || {}), (n = t.format(e, n)), Promise.resolve(n);
          });
        },
        getStatsSafari: function (e) {
          var t = this;
          return e.getStats().then(function (n) {
            return (
              (e.lastStats = e.lastStats || {}), (n = t._formatSSRC_S(e, n)), Promise.resolve(n)
            );
          });
        },
        format: function (e, t) {
          return !e || /(failed|closed)/gi.test(e.iceConnectionState)
            ? {}
            : (t =
                parseInt(e.uid) - parseInt(e.targetUid) == 0
                  ? this.ssrcLocal(e, t)
                  : this.ssrcRemote(e, t));
        },
        formatSSRC: function (e, t, n, r) {
          return this[navigator.mozGetUserMedia ? '_formatSSRC_F' : '_formatSSRC_G'](e, t, n, r);
        },
        _formatSSRC_G: function (e, t, n, r) {
          var i = this,
            o = {};
          return (
            Object.values(t).forEach(function (t) {
              if (('recv' !== r || a.test(t.id)) && ('send' !== r || s.test(t.id))) {
                t = i.formatData(t);
                var n = ('send' === r ? c : u).exec(t.id),
                  d = t.id;
                (o[d] = t),
                  n &&
                    n[1] &&
                    ('recv' !== r || 0 !== e.uid
                      ? ((t.id =
                          'ssrc_' +
                          e.uid +
                          '_' +
                          r +
                          '_' +
                          ('recv' === r ? e.targetUid : 0) +
                          '_' +
                          t.mediaType),
                        -1 == (t = i.computeData(e, t)).googInterframeDelayMax &&
                          (t.googInterframeDelayMax = 0),
                        (o[t.id] = t),
                        delete o[d])
                      : delete o[d]);
              }
            }),
            o
          );
        },
        _formatSSRC_F: function (e, t, n, r) {
          var i = this,
            a = {},
            s = 'send' === r ? d : l;
          return (
            (t.values ? [].concat((0, o.default)(t.values())) : Object.values(t)).map(function (t) {
              if (s.test(t.id)) {
                var n = f.test(t.type),
                  o =
                    'ssrc_' +
                    e.uid +
                    '_' +
                    (n ? 'recv' : 'send') +
                    '_' +
                    ('recv' === r ? e.targetUid : 0) +
                    '_' +
                    t.mediaType;
                (t = i.computeData(e, t)), (a[o] = t);
              }
            }),
            a
          );
        },
        _formatSSRC_S: function (e, t) {
          var n = this,
            r = {},
            i = null;
          return (
            t.forEach(function (t) {
              if ('inbound-rtp' === t.type || 'inboundrtp' === t.type) {
                if (-1 != t.id.indexOf('Video')) {
                  t = n.computeData(e, t);
                  var o = 'ssrc_' + (e.uid || '123456') + '_recv_' + (0 | e.targetUid) + '_video';
                  (i = o),
                    (r[o] = {}),
                    (r[o].bitsReceivedPerSecond = t.bitsReceivedPerSecond || 0),
                    (r[o].bytesReceived = t.bytesReceived || 0),
                    (r[o].packetsLost = t.packetsLost || 0),
                    (r[o].packetsReceived = t.packetsReceived || 0),
                    (r[o].packetsReceivedPerSecond = t.packetsReceivedPerSecond || 0),
                    (r[o].framesDecoded = t.framesDecoded || 0),
                    (r[o].googFrameRateOutput = t.framesDecoded || 0);
                }
              } else if ('outbound-rtp' === t.type || 'outboundrtp' === t.type) {
                if (-1 != t.id.indexOf('Video')) {
                  t = n.computeData(e, t);
                  var a = 'ssrc_' + (e.uid || '123456') + '_send_0_video';
                  (r[a] = {}),
                    (r[a].bitsSentPerSecond = t.bitsSentPerSecond || 0),
                    (r[a].bytesSent = t.bytesSent || 0),
                    (r[a].packetsLost = t.packetsLost || 0),
                    (r[a].packetsSent = t.packetsSent || 0),
                    (r[a].packetsSentPerSecond = t.packetsSentPerSecond || 0),
                    (r[a].framesEncoded = t.framesEncoded || 0),
                    (r[a].googFrameRateSent = t.framesEncoded || 0);
                }
              } else 'track' === t.type && (r.track = t);
            }),
            r.track &&
              i &&
              ((r[i].googFrameHeightReceived = r.track.frameHeight),
              (r[i].googFrameWidthReceived = r.track.frameWidth)),
            r
          );
        },
        formatData: function (e) {
          return (
            Object.keys(e).map(function (t) {
              p[t] && (e[t] = (e[t] / 1024).toFixed(2)),
                h[t] && (e[t] = (e[t] / 1024 / 1024).toFixed(2));
            }),
            e
          );
        },
        computeData: function (e, t) {
          var n = { peer: e, ssrcKey: t.ssrc, currentItem: t };
          return (
            t.bytesSent &&
              (t.bitsSentPerSecond = this.getLastStats(
                Object.assign({}, n, { valueKey: 'bytesSent' }),
              )),
            t.packetsSent &&
              (t.packetsSentPerSecond = this.getLastStats(
                Object.assign({}, n, { valueKey: 'packetsSent' }),
              )),
            t.bytesReceived &&
              (t.bitsReceivedPerSecond = this.getLastStats(
                Object.assign({}, n, { valueKey: 'bytesReceived' }),
              )),
            t.packetsReceived &&
              (t.packetsReceivedPerSecond = this.getLastStats(
                Object.assign({}, n, { valueKey: 'packetsReceived' }),
              )),
            t
          );
        },
        ssrcLocal: function (e, t) {
          if (e && e.localDescription) {
            var n = e.localDescription;
            return this.formatSSRC(e, t, n.sdp, 'send');
          }
        },
        ssrcRemote: function (e, t) {
          if (e && e.remoteDescription) {
            var n = e.remoteDescription;
            return this.formatSSRC(e, t, n.sdp, 'recv');
          }
        },
        getLastStats: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.peer,
            n = e.ssrcKey,
            r = e.valueKey,
            i = e.currentItem,
            o = 0;
          if (t.lastStats[n] && t.lastStats[n][r]) {
            if (!(i[r] - t.lastStats[n][r] > 0)) return o;
            o = i[r] - t.lastStats[n][r];
          } else t.lastStats[n] || (t.lastStats[n] = {}), (o = i[r]);
          return (
            (o = /bytes/gi.test(r) ? Math.round((8 * o) / 200) : o), (t.lastStats[n][r] = i[r]), o
          );
        },
      }),
        (e.exports = t.default);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = l(n(98)),
        i = l(n(97)),
        o = l(n(1)),
        a = l(n(2)),
        s = l(n(4)),
        c = l(n(3)),
        u = n(12),
        d = l(n(320));
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var f = (function (e) {
        function t(e) {
          (0, o.default)(this, t);
          var n = (0, s.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (n.webrtcBusiness = e.webrtcBusiness || null), (n.interval = e.interval || 1e3), n;
        }
        return (
          (0, c.default)(t, e),
          (0, a.default)(t, [
            {
              key: 'reset',
              value: function () {
                (this.times = 0),
                  this.timer && clearInterval(this.timer),
                  (this.timer = null),
                  (this.webrtcBusiness = null);
              },
            },
            {
              key: 'start',
              value: function () {
                this.timer || (this.timer = setInterval(this.getStats.bind(this), this.interval));
              },
            },
            {
              key: 'stop',
              value: function () {
                this.reset();
              },
            },
            {
              key: 'getStats',
              value: (function () {
                var e = (0, i.default)(
                  r.default.mark(function e() {
                    var t, n, i;
                    return r.default.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((t =
                                  this.webrtcBusiness &&
                                  this.webrtcBusiness.selfWebRtcInstance &&
                                  this.webrtcBusiness.selfWebRtcInstance.rtcConnection),
                                (n =
                                  this.webrtcBusiness &&
                                  this.webrtcBusiness.remoteWebRtcInstanceMap &&
                                  Object.keys(this.webrtcBusiness.remoteWebRtcInstanceMap).length >
                                    0 &&
                                  Object.values(this.webrtcBusiness.remoteWebRtcInstanceMap)[0]
                                    .rtcConnection),
                                t || n)
                              ) {
                                e.next = 4;
                                break;
                              }
                              return e.abrupt('return');
                            case 4:
                              if (
                                !this.webrtcBusiness.adapterRef.imInfo ||
                                !this.webrtcBusiness.adapterRef.imInfo.netDetect ||
                                this.webrtcBusiness.adapterRef.instance._isDetectNetwork()
                              ) {
                                e.next = 6;
                                break;
                              }
                              return e.abrupt('return');
                            case 6:
                              return (i = {}), (e.next = 9), this.getLocalStats();
                            case 9:
                              return (i.self = e.sent), (e.next = 12), this.getRemoteStats();
                            case 12:
                              i.other = e.sent;
                              try {
                                Object.keys(i.other).map(function (e) {
                                  i.self = Object.assign({}, i.self, i.other[e]);
                                });
                              } catch (e) {
                                console.warn(e);
                              }
                              (this.times = (this.times || 0) + 1),
                                this.emit('stats', i.self, this.times);
                            case 16:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'getLocalStats',
              value: (function () {
                var e = (0, i.default)(
                  r.default.mark(function e() {
                    var t;
                    return r.default.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if ((t = this.webrtcBusiness) && t.selfWebRtcInstance) {
                                e.next = 3;
                                break;
                              }
                              return e.abrupt('return', {});
                            case 3:
                              return (
                                (e.next = 5), d.default.getStats(t.selfWebRtcInstance.rtcConnection)
                              );
                            case 5:
                              return e.abrupt('return', e.sent);
                            case 6:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                    );
                  }),
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: 'getRemoteStats',
              value: (function () {
                var e = (0, i.default)(
                  r.default.mark(function e() {
                    var t,
                      n,
                      o,
                      a,
                      s,
                      c,
                      u,
                      l,
                      f,
                      p,
                      h = this;
                    return r.default.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if ((t = this.webrtcBusiness) && t.remoteWebRtcInstanceMap) {
                                e.next = 3;
                                break;
                              }
                              return e.abrupt('return', {});
                            case 3:
                              (n = {}),
                                (o = t.remoteWebRtcInstanceMap),
                                (a = Object.keys(o).map(
                                  (function () {
                                    var e = (0, i.default)(
                                      r.default.mark(function e(t) {
                                        return r.default.wrap(
                                          function (e) {
                                            for (;;)
                                              switch ((e.prev = e.next)) {
                                                case 0:
                                                  if (!o[t] || !o[t].rtcConnection) {
                                                    e.next = 5;
                                                    break;
                                                  }
                                                  return (
                                                    (e.next = 3),
                                                    d.default.getStats(o[t].rtcConnection)
                                                  );
                                                case 3:
                                                  return (n[t] = e.sent), e.abrupt('return', n[t]);
                                                case 5:
                                                case 'end':
                                                  return e.stop();
                                              }
                                          },
                                          e,
                                          h,
                                        );
                                      }),
                                    );
                                    return function (t) {
                                      return e.apply(this, arguments);
                                    };
                                  })(),
                                )),
                                (s = !0),
                                (c = !1),
                                (u = void 0),
                                (e.prev = 9),
                                (l = a[Symbol.iterator]());
                            case 11:
                              if ((s = (f = l.next()).done)) {
                                e.next = 18;
                                break;
                              }
                              return (p = f.value), (e.next = 15), p;
                            case 15:
                              (s = !0), (e.next = 11);
                              break;
                            case 18:
                              e.next = 24;
                              break;
                            case 20:
                              (e.prev = 20), (e.t0 = e.catch(9)), (c = !0), (u = e.t0);
                            case 24:
                              (e.prev = 24), (e.prev = 25), !s && l.return && l.return();
                            case 27:
                              if (((e.prev = 27), !c)) {
                                e.next = 30;
                                break;
                              }
                              throw u;
                            case 30:
                              return e.finish(27);
                            case 31:
                              return e.finish(24);
                            case 32:
                              return e.abrupt('return', n);
                            case 33:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      this,
                      [
                        [9, 20, 24, 32],
                        [25, , 27, 31],
                      ],
                    );
                  }),
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
          ]),
          t
        );
      })(u.EventEmitter);
      (t.default = f), (e.exports = t.default);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i = n(151),
        o = (r = i) && r.__esModule ? r : { default: r };
      (t.default = {
        logger: console,
        randomSSRC: function () {
          var e = Math.floor(1e8 * Math.random()) + 1e7;
          return e > 1e8 ? 99999999 : e;
        },
        _createLocalDescription: function (e, t) {
          var n = {},
            r = this._iceGatherer.getLocalParameters(),
            i = this._iceGatherer.getLocalCandidates(),
            a = this._dtlsTransport.getLocalParameters(),
            s = this._dtlsTransport.getRemoteParameters(),
            c = this._localCapabilities,
            u = this._localTrackInfos;
          'offer' === t && this._sdpGlobalFields.version++,
            (n.version = 0),
            (n.origin = {
              address: '127.0.0.1',
              ipVer: 4,
              netType: 'IN',
              sessionId: this._sdpGlobalFields.id,
              sessionVersion: this._sdpGlobalFields.version,
              username: 'jitsi-ortc-webrtc-shim',
            }),
            (n.name = '-'),
            (n.timing = { start: 0, stop: 0 }),
            (n.msidSemantic = { semantic: 'WMS', token: '*' }),
            (n.groups = [{ mids: Array.from(this._mids.keys()).join(' '), type: 'BUNDLE' }]),
            (n.media = []),
            (n.fingerprint = { hash: a.fingerprints[0].value, type: a.fingerprints[0].algorithm });
          var d = !1,
            l = !0,
            f = !1,
            p = void 0;
          try {
            for (var h, m = c.codecs[Symbol.iterator](); !(l = (h = m.next()).done); l = !0) {
              var _ = h.value;
              if ('video' === _.kind && 'rtx' === _.name) {
                d = !0;
                break;
              }
            }
          } catch (e) {
            (f = !0), (p = e);
          } finally {
            try {
              !l && m.return && m.return();
            } finally {
              if (f) throw p;
            }
          }
          var v = !0,
            g = !1,
            y = void 0;
          try {
            for (var E, T = this._mids[Symbol.iterator](); !(v = (E = T.next()).done); v = !0) {
              var b = E.value,
                C = (0, o.default)(b, 2),
                O = C[0],
                S = C[1];
              A.call(this, O, S);
            }
          } catch (e) {
            (g = !0), (y = e);
          } finally {
            try {
              !v && T.return && T.return();
            } finally {
              if (g) throw y;
            }
          }
          return new RTCSessionDescription({ type: t, _sdpObject: n });
          function A(e, o) {
            var a = {};
            switch (((a.type = o), o)) {
              case 'audio':
              case 'video':
                (a.protocol = 'RTP/SAVPF'), (a.port = 9), (a.direction = 'sendrecv');
                break;
              case 'application':
                (a.protocol = 'DTLS/SCTP'),
                  (a.port = 0),
                  (a.payloads = '0'),
                  (a.direction = 'inactive');
            }
            (a.connection = { ip: '127.0.0.1', version: 4 }),
              (a.mid = e),
              (a.iceUfrag = r.usernameFragment),
              (a.icePwd = r.password),
              (a.candidates = []);
            var l = !0,
              f = !1,
              p = void 0;
            try {
              for (var h, m = i[Symbol.iterator](); !(l = (h = m.next()).done); l = !0) {
                var _ = h.value,
                  v = { component: 1 };
                (v.foundation = _.foundation),
                  (v.ip = _.ip),
                  (v.port = _.port),
                  (v.priority = _.priority),
                  (v.transport = _.protocol.toLowerCase()),
                  (v.type = _.type),
                  'tcp' === v.transport && (v.tcptype = _.tcpType),
                  a.candidates.push(v);
              }
            } catch (e) {
              (f = !0), (p = e);
            } finally {
              try {
                !l && m.return && m.return();
              } finally {
                if (f) throw p;
              }
            }
            if (
              ((a.endOfCandidates = 'end-of-candidates'),
              (a.setup = 'offer' === t ? 'actpass' : 'server' === s.role ? 'active' : 'passive'),
              'audio' === o || 'video' === o)
            ) {
              (a.rtp = []), (a.rtcpFb = []), (a.fmtp = []);
              var g = [],
                y = !0,
                E = !1,
                T = void 0;
              try {
                for (var b, C = c.codecs[Symbol.iterator](); !(y = (b = C.next()).done); y = !0) {
                  var O = b.value;
                  if (!O.kind || O.kind === o) {
                    g.push(O.preferredPayloadType);
                    var S = { codec: O.name, payload: O.preferredPayloadType, rate: O.clockRate };
                    if (
                      (O.numChannels > 1 && (S.encoding = O.numChannels),
                      a.rtp.push(S),
                      O.parameters)
                    ) {
                      var A = { config: '', payload: O.preferredPayloadType },
                        R = !0,
                        I = !1,
                        P = void 0;
                      try {
                        for (
                          var w, N = Object.keys(O.parameters)[Symbol.iterator]();
                          !(R = (w = N.next()).done);
                          R = !0
                        ) {
                          var D = w.value;
                          A.config && (A.config += ';'), (A.config += D + '=' + O.parameters[D]);
                        }
                      } catch (e) {
                        (I = !0), (P = e);
                      } finally {
                        try {
                          !R && N.return && N.return();
                        } finally {
                          if (I) throw P;
                        }
                      }
                      A.config && a.fmtp.push(A);
                    }
                    var k = !0,
                      L = !1,
                      M = void 0;
                    try {
                      for (
                        var x, U = (O.rtcpFeedback || [])[Symbol.iterator]();
                        !(k = (x = U.next()).done);
                        k = !0
                      ) {
                        var F = x.value;
                        a.rtcpFb.push({
                          payload: O.preferredPayloadType,
                          subtype: F.parameter || void 0,
                          type: F.type,
                        });
                      }
                    } catch (e) {
                      (L = !0), (M = e);
                    } finally {
                      try {
                        !k && U.return && U.return();
                      } finally {
                        if (L) throw M;
                      }
                    }
                  }
                }
              } catch (e) {
                (E = !0), (T = e);
              } finally {
                try {
                  !y && C.return && C.return();
                } finally {
                  if (E) throw T;
                }
              }
              0 === g.length
                ? ((a.payloads = '9'), (a.port = 0), (a.direction = 'inactive'))
                : (a.payloads = g.join(' ')),
                (a.ssrcs = []),
                (a.ssrcGroups = []);
              var j = !0,
                V = !1,
                B = void 0;
              try {
                for (var W, G = u.values()[Symbol.iterator](); !(j = (W = G.next()).done); j = !0) {
                  var H = W.value,
                    Y = H.rtpSender,
                    K = H.stream.id,
                    Q = Y.track;
                  if ('ended' !== Q.readyState && Q.kind === o) {
                    H.ssrc || (H.ssrc = this.randomSSRC());
                    var q = d && 'video' === Q.kind;
                    q && !H.rtxSsrc && (H.rtxSsrc = H.ssrc + 1),
                      a.ssrcs.push({ attribute: 'cname', id: H.ssrc, value: CNAME }),
                      a.ssrcs.push({ attribute: 'msid', id: H.ssrc, value: K + ' ' + Q.id }),
                      a.ssrcs.push({ attribute: 'mslabel', id: H.ssrc, value: K }),
                      a.ssrcs.push({ attribute: 'label', id: H.ssrc, value: Q.id }),
                      q &&
                        (a.ssrcs.push({ attribute: 'cname', id: H.rtxSsrc, value: CNAME }),
                        a.ssrcs.push({ attribute: 'msid', id: H.rtxSsrc, value: K + ' ' + Q.id }),
                        a.ssrcs.push({ attribute: 'mslabel', id: H.rtxSsrc, value: K }),
                        a.ssrcs.push({ attribute: 'label', id: H.rtxSsrc, value: Q.id }),
                        a.ssrcGroups.push({ semantics: 'FID', ssrcs: H.ssrc + ' ' + H.rtxSsrc }));
                  }
                }
              } catch (e) {
                (V = !0), (B = e);
              } finally {
                try {
                  !j && G.return && G.return();
                } finally {
                  if (V) throw B;
                }
              }
              a.ext = [];
              var J = !0,
                z = !1,
                X = void 0;
              try {
                for (
                  var $, Z = c.headerExtensions[Symbol.iterator]();
                  !(J = ($ = Z.next()).done);
                  J = !0
                ) {
                  var ee = $.value;
                  (ee.kind && ee.kind !== o) || a.ext.push({ value: ee.preferredId, uri: ee.uri });
                }
              } catch (e) {
                (z = !0), (X = e);
              } finally {
                try {
                  !J && Z.return && Z.return();
                } finally {
                  if (z) throw X;
                }
              }
              (a.rtcpMux = 'rtcp-mux'), (a.rtcpRsize = 'rtcp-rsize');
            }
            n.media.push(a);
          }
        },
        mergeConstraints: function (e, t) {
          if (!e || !t) return e || t;
          var n = e;
          for (var r in t) n[r] = t[r];
          return n;
        },
        iceCandidateType: function (e) {
          return e.split(' ')[7];
        },
        formatTypePreference: function (e) {
          if (/Chrome\/\d+/.test(navigator.userAgent))
            switch (e) {
              case 0:
                return 'TURN/TLS';
              case 1:
                return 'TURN/TCP';
              case 2:
                return 'TURN/UDP';
            }
          else if (/Firefox\/\d+/.test(navigator.userAgent))
            switch (e) {
              case 0:
                return 'TURN/TCP';
              case 5:
                return 'TURN/UDP';
            }
          return '';
        },
        maybeSetOpusOptions: function (e, t) {
          return (
            'true' === t.opusStereo
              ? (e = this.setCodecParam(e, 'opus/48000', 'stereo', '1'))
              : 'false' === t.opusStereo && (e = this.removeCodecParam(e, 'opus/48000', 'stereo')),
            'true' === t.opusFec
              ? (e = this.setCodecParam(e, 'opus/48000', 'useinbandfec', '1'))
              : 'false' === t.opusFec &&
                (e = this.removeCodecParam(e, 'opus/48000', 'useinbandfec')),
            'true' === t.opusDtx
              ? (e = this.setCodecParam(e, 'opus/48000', 'usedtx', '1'))
              : 'false' === t.opusDtx && (e = this.removeCodecParam(e, 'opus/48000', 'usedtx')),
            t.opusMaxPbr &&
              (e = this.setCodecParam(e, 'opus/48000', 'maxplaybackrate', t.opusMaxPbr)),
            e
          );
        },
        maybeSetAudioSendBitRate: function (e, t) {
          return t.audioSendBitrate
            ? (this.logger.log('Prefer audio send bitrate: ' + t.audioSendBitrate),
              this.preferBitRate(e, t.audioSendBitrate, 'audio'))
            : e;
        },
        maybeSetAudioReceiveBitRate: function (e, t) {
          return t.audioRecvBitrate
            ? (this.logger.log(
                'SDPUtil:maybeSetAudioReceiveBitRate Prefer audio receive bitrate: ' +
                  t.audioRecvBitrate,
              ),
              this.preferBitRate(e, t.audioRecvBitrate, 'audio'))
            : e;
        },
        maybeSetVideoSendBitRate: function (e, t) {
          return t.videoSendBitrate
            ? (this.logger.log(
                'SDPUtil:maybeSetVideoSendBitRate video send bitrate: ' + t.videoSendBitrate,
              ),
              this.preferBitRate(e, t.videoSendBitrate, 'video'))
            : e;
        },
        maybeSetVideoReceiveBitRate: function (e, t) {
          return t.videoRecvBitrate
            ? (this.logger.log(
                'SDPUtil:maybeSetVideoReceiveBitRate video receive bitrate: ' + t.videoRecvBitrate,
              ),
              this.preferBitRate(e, t.videoRecvBitrate, 'video'))
            : e;
        },
        preferBitRate: function (e, t, n) {
          var r = e.split('\r\n'),
            i = this.findLine(r, 'm=', n);
          if (null === i)
            return (
              this.logger.log(
                'SDPUtil:preferBitRate Failed to add bandwidth line to sdp, as no m-line found',
              ),
              e
            );
          var o = this.findLineInRange(r, i + 1, -1, 'm=');
          null === o && (o = r.length);
          var a = this.findLineInRange(r, i + 1, o, 'c=');
          if (null === a)
            return (
              this.logger.log(
                'SDPUtil:preferBitRate Failed to add bandwidth line to sdp, as no c-line found',
              ),
              e
            );
          var s = this.findLineInRange(r, a + 1, o, 'b=AS');
          s && r.splice(s, 1);
          var c = 'b=AS:' + t;
          return r.splice(a + 1, 0, c), (e = r.join('\r\n'));
        },
        maybeSetVideoSendInitialBitRate: function (e, t) {
          var n = t.videoSendInitialBitrate;
          if (!n) return e;
          var r = n,
            i = t.videoSendBitrate;
          i &&
            (n > i &&
              (this.logger.log(
                'SDPUtil:maybeSetVideoSendInitialBitRate Clamping initial bitrate to max bitrate of ' +
                  i +
                  ' kbps.',
              ),
              (n = i),
              (t.videoSendInitialBitrate = n)),
            (r = i));
          var o = e.split('\r\n');
          if (null === this.findLine(o, 'm=', 'video'))
            return (
              this.logger.log(
                'SDPUtil:maybeSetVideoSendInitialBitRate Failed to find video m-line',
              ),
              e
            );
          var a = t.videoRecvCodec;
          return (
            (e = this.setCodecParam(
              e,
              a,
              'x-google-min-bitrate',
              t.videoSendInitialBitrate.toString(),
            )),
            (e = this.setCodecParam(e, a, 'x-google-max-bitrate', r.toString()))
          );
        },
        removePayloadTypeFromMline: function (e, t) {
          e = e.split(' ');
          for (var n = 0; n < e.length; ++n) e[n] === t.toString() && e.splice(n, 1);
          return e.join(' ');
        },
        removeCodecByName: function (e, t) {
          var n = this.findLine(e, 'a=rtpmap', t);
          if (null === n) return e;
          var r = this.getCodecPayloadTypeFromLine(e[n]);
          e.splice(n, 1);
          var i = this.findLine(e, 'm=', 'video');
          return null === i ? e : ((e[i] = this.removePayloadTypeFromMline(e[i], r)), e);
        },
        removeCodecByPayloadType: function (e, t) {
          var n = this.findLine(e, 'a=rtpmap', t.toString());
          if (null === n) return e;
          e.splice(n, 1);
          var r = this.findLine(e, 'm=', 'video');
          return null === r ? e : ((e[r] = this.removePayloadTypeFromMline(e[r], t)), e);
        },
        maybeRemoveVideoFec: function (e, t) {
          if ('false' !== t.videoFec) return e;
          var n = e.split('\r\n'),
            r = this.findLine(n, 'a=rtpmap', 'red');
          if (null === r) return e;
          var i = this.getCodecPayloadTypeFromLine(n[r]);
          if (
            ((n = this.removeCodecByPayloadType(n, i)),
            (n = this.removeCodecByName(n, 'ulpfec')),
            null === (r = this.findLine(n, 'a=fmtp', i.toString())))
          )
            return e;
          var o = this.parseFmtpLine(n[r]).pt;
          return null === o
            ? e
            : (n.splice(r, 1), (n = this.removeCodecByPayloadType(n, o)).join('\r\n'));
        },
        maybePreferAudioSendCodec: function (e, t) {
          return this.maybePreferCodec(e, 'audio', 'send', t.audioSendCodec);
        },
        maybePreferAudioReceiveCodec: function (e, t) {
          return this.maybePreferCodec(e, 'audio', 'receive', t.audioRecvCodec);
        },
        maybePreferVideoSendCodec: function (e, t) {
          return this.maybePreferCodec(e, 'video', 'send', t.videoSendCodec);
        },
        maybePreferVideoReceiveCodec: function (e, t) {
          return this.maybePreferCodec(e, 'video', 'receive', t.videoRecvCodec);
        },
        maybePreferCodec: function (e, t, n, r) {
          var i = t + ' ' + n + ' codec';
          if (!r) return this.logger.log('SDPUtil:maybePreferCodec No preference on ' + i + '.'), e;
          this.logger.log('SDPUtil:maybePreferCodec Prefer ' + i + ': ' + r);
          var o = e.split('\r\n'),
            a = this.findLine(o, 'm=', t);
          if (null === a) return e;
          var s = this.getCodecPayloadType(o, r);
          return (
            s
              ? (o[a] = this.setDefaultCodec(o[a], s))
              : this.logger.log('SDPUtil:maybePreferCodec no prefered codec found for ', r),
            (e = o.join('\r\n'))
          );
        },
        setCodecParam: function (e, t, n, r) {
          var i = e.split('\r\n'),
            o = this.findFmtpLine(i, t),
            a = {};
          if (null === o) {
            var s = this.findLine(i, 'a=rtpmap', t);
            if (null === s) return e;
            var c = this.getCodecPayloadTypeFromLine(i[s]);
            (a.pt = c.toString()),
              (a.params = {}),
              (a.params[n] = r),
              i.splice(s + 1, 0, this.writeFmtpLine(a));
          } else ((a = this.parseFmtpLine(i[o])).params[n] = r), (i[o] = this.writeFmtpLine(a));
          return (e = i.join('\r\n'));
        },
        removeCodecParam: function (e, t, n) {
          var r = e.split('\r\n'),
            i = this.findFmtpLine(r, t);
          if (null === i) return e;
          var o = this.parseFmtpLine(r[i]);
          delete o.params[n];
          var a = this.writeFmtpLine(o);
          return null === a ? r.splice(i, 1) : (r[i] = a), (e = r.join('\r\n'));
        },
        parseFmtpLine: function (e) {
          var t = {},
            n = e.indexOf(' '),
            r = e.substring(n + 1).split('; '),
            i = new RegExp('a=fmtp:(\\d+)'),
            o = e.match(i);
          if (!o || 2 !== o.length) return null;
          t.pt = o[1];
          for (var a = {}, s = 0; s < r.length; ++s) {
            var c = r[s].split('=');
            2 === c.length && (a[c[0]] = c[1]);
          }
          return (t.params = a), t;
        },
        writeFmtpLine: function (e) {
          if (!e.hasOwnProperty('pt') || !e.hasOwnProperty('params')) return null;
          var t = e.pt,
            n = e.params,
            r = [],
            i = 0;
          for (var o in n) (r[i] = o + '=' + n[o]), ++i;
          return 0 === i ? null : 'a=fmtp:' + t.toString() + ' ' + r.join('; ');
        },
        findFmtpLine: function (e, t) {
          var n = this.getCodecPayloadType(e, t);
          return n ? this.findLine(e, 'a=fmtp:' + n.toString()) : null;
        },
        findLine: function (e, t, n) {
          return this.findLineInRange(e, 0, -1, t, n);
        },
        findLineInRange: function (e, t, n, r, i) {
          for (var o = -1 !== n ? n : e.length, a = t; a < o; ++a)
            if (0 === e[a].indexOf(r) && (!i || -1 !== e[a].toLowerCase().indexOf(i.toLowerCase())))
              return a;
          return null;
        },
        getCodecPayloadType: function (e, t) {
          var n = this.findLine(e, 'a=rtpmap', t);
          return n ? this.getCodecPayloadTypeFromLine(e[n]) : null;
        },
        getCodecPayloadTypeFromLine: function (e) {
          var t = new RegExp('a=rtpmap:(\\d+) [a-zA-Z0-9-]+\\/\\d+'),
            n = e.match(t);
          return n && 2 === n.length ? n[1] : null;
        },
        setDefaultCodec: function (e, t) {
          var n = e.split(' '),
            r = n.slice(0, 3);
          r.push(t);
          for (var i = 3; i < n.length; i++) n[i] !== t && r.push(n[i]);
          return r.join(' ');
        },
      }),
        (e.exports = t.default);
    },
    function (e, t, n) {
      var r = n(207),
        i = /%[sdv%]/g,
        o = function (e, t, n) {
          var r = [
            e + '=' + (t.format instanceof Function ? t.format(t.push ? n : n[t.name]) : t.format),
          ];
          if (t.names)
            for (var o = 0; o < t.names.length; o += 1) {
              var a = t.names[o];
              t.name ? r.push(n[t.name][a]) : r.push(n[t.names[o]]);
            }
          else r.push(n[t.name]);
          return function (e) {
            var t = 1,
              n = arguments,
              r = n.length;
            return e.replace(i, function (e) {
              if (t >= r) return e;
              var i = n[t];
              switch (((t += 1), e)) {
                case '%%':
                  return '%';
                case '%s':
                  return String(i);
                case '%d':
                  return Number(i);
                case '%v':
                  return '';
              }
            });
          }.apply(null, r);
        },
        a = ['v', 'o', 's', 'i', 'u', 'e', 'p', 'c', 'b', 't', 'r', 'z', 'a'],
        s = ['i', 'c', 'b', 'a'];
      e.exports = function (e, t) {
        (t = t || {}),
          null == e.version && (e.version = 0),
          null == e.name && (e.name = ' '),
          e.media.forEach(function (e) {
            null == e.payloads && (e.payloads = '');
          });
        var n = t.outerOrder || a,
          i = t.innerOrder || s,
          c = [];
        return (
          n.forEach(function (t) {
            r[t].forEach(function (n) {
              n.name in e && null != e[n.name]
                ? c.push(o(t, n, e))
                : n.push in e &&
                  null != e[n.push] &&
                  e[n.push].forEach(function (e) {
                    c.push(o(t, n, e));
                  });
            });
          }),
          e.media.forEach(function (e) {
            c.push(o('m', r.m[0], e)),
              i.forEach(function (t) {
                r[t].forEach(function (n) {
                  n.name in e && null != e[n.name]
                    ? c.push(o(t, n, e))
                    : n.push in e &&
                      null != e[n.push] &&
                      e[n.push].forEach(function (e) {
                        c.push(o(t, n, e));
                      });
                });
              });
          }),
          c.join('\r\n') + '\r\n'
        );
      };
    },
    function (e, t, n) {
      var r = function (e) {
          return String(Number(e)) === e ? Number(e) : e;
        },
        i = function (e, t, n) {
          var i = e.name && e.names;
          e.push && !t[e.push] ? (t[e.push] = []) : i && !t[e.name] && (t[e.name] = {});
          var o = e.push ? {} : i ? t[e.name] : t;
          !(function (e, t, n, i) {
            if (i && !n) t[i] = r(e[1]);
            else for (var o = 0; o < n.length; o += 1) null != e[o + 1] && (t[n[o]] = r(e[o + 1]));
          })(n.match(e.reg), o, e.names, e.name),
            e.push && t[e.push].push(o);
        },
        o = n(207),
        a = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
      t.parse = function (e) {
        var t = {},
          n = [],
          r = t;
        return (
          e
            .split(/(\r\n|\r|\n)/)
            .filter(a)
            .forEach(function (e) {
              var t = e[0],
                a = e.slice(2);
              'm' === t && (n.push({ rtp: [], fmtp: [] }), (r = n[n.length - 1]));
              for (var s = 0; s < (o[t] || []).length; s += 1) {
                var c = o[t][s];
                if (c.reg.test(a)) return i(c, r, a);
              }
            }),
          (t.media = n),
          t
        );
      };
      var s = function (e, t) {
        var n = t.split(/=(.+)/, 2);
        return (
          2 === n.length
            ? (e[n[0]] = r(n[1]))
            : 1 === n.length && t.length > 1 && (e[n[0]] = void 0),
          e
        );
      };
      (t.parseParams = function (e) {
        return e.split(/\;\s?/).reduce(s, {});
      }),
        (t.parseFmtpConfig = t.parseParams),
        (t.parsePayloads = function (e) {
          return e.split(' ').map(Number);
        }),
        (t.parseRemoteCandidates = function (e) {
          for (var t = [], n = e.split(' ').map(r), i = 0; i < n.length; i += 3)
            t.push({ component: n[i], ip: n[i + 1], port: n[i + 2] });
          return t;
        }),
        (t.parseImageAttributes = function (e) {
          return e.split(' ').map(function (e) {
            return e
              .substring(1, e.length - 1)
              .split(',')
              .reduce(s, {});
          });
        }),
        (t.parseSimulcastStreamList = function (e) {
          return e.split(';').map(function (e) {
            return e.split(',').map(function (e) {
              var t,
                n = !1;
              return (
                '~' !== e[0] ? (t = r(e)) : ((t = r(e.substring(1, e.length))), (n = !0)),
                { scid: t, paused: n }
              );
            });
          });
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = o(n(98)),
        i = o(n(97));
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      (t.default = {
        getDevices: function () {
          var e = this;
          return (0, i.default)(
            r.default.mark(function t() {
              var n;
              return r.default.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          ((n = null),
                          navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
                        ) {
                          e.next = 3;
                          break;
                        }
                        return e.abrupt(
                          'return',
                          Promise.reject(
                            'your browser not support this feature, see https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices',
                          ),
                        );
                      case 3:
                        return (
                          (e.next = 5),
                          navigator.mediaDevices.enumerateDevices().then(function (e) {
                            0 !== e.length &&
                              ((n = { video: [], audioIn: [], audioOut: [] }),
                              e.forEach(function (e) {
                                'videoinput' === e.kind
                                  ? n.video.push({
                                      deviceId: e.deviceId,
                                      label: e.label ? e.label : 'camera ' + (n.video.length + 1),
                                    })
                                  : 'audioinput' === e.kind
                                  ? n.audioIn.push({
                                      deviceId: e.deviceId,
                                      label: e.label
                                        ? e.label
                                        : 'microphone ' + (n.audioIn.length + 1),
                                    })
                                  : 'audiooutput' === e.kind &&
                                    n.audioOut.push({
                                      deviceId: e.deviceId,
                                      label: e.label
                                        ? e.label
                                        : 'speaker ' + (n.audioOut.length + 1),
                                    });
                              }));
                          })
                        );
                      case 5:
                        return e.abrupt('return', n);
                      case 6:
                      case 'end':
                        return e.stop();
                    }
                },
                t,
                e,
              );
            }),
          )();
        },
      }),
        (e.exports = t.default);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = o(n(208)),
        i = o(n(100));
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var a = n(111),
        s = r.default.checkVersion(),
        c = {};
      (t.default = {
        logger: console,
        fnShake: function (e) {
          var t = this,
            n = e.fn,
            r = e.peer,
            i = void 0 === r ? {} : r;
          if (n) {
            if (i)
              return (
                i.id || (i.id = Object.keys(c).length + 1),
                (n = '_' + n),
                c[i.id] || (c[i.id] = {}),
                c[i.id] &&
                  c[i.id][n] &&
                  (this.logger.log('RtcUtil:fnShake destroy ' + n + ' timer'),
                  clearTimeout(c[i.id][n]),
                  (c[i.id][n] = null)),
                this.logger.log('RtcUtil:fnShake create ' + n + ' timer'),
                new Promise(function (r) {
                  c[i.id][n] = setTimeout(function () {
                    (c[i.id][n] = null), r(t[n](e));
                  }, 200);
                })
              );
            this.logger.error('RtcUtil:fnShake peer is null');
          }
        },
        createOffer: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return this.fnShake({ peer: e, fn: 'createOffer' });
        },
        _createOffer: function () {
          var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).peer;
          if (e) {
            this.logger.log('RtcUtil:_createOffer ------ do createoffer ------');
            var t = { offerToReceiveVideo: 1, offerToReceiveAudio: 1 };
            if (e.uid - e.targetUid != 0) {
              var n = e.getLocalStreams && e.getLocalStreams(),
                r = (n && n[0] && n[0].getTracks()) || !1;
              if ('Safari' === s.prefix && (!r || 0 === r.length))
                return (
                  'connected' == e.iceConnectionState ||
                    'completed' == e.iceConnectionState ||
                    (e.addTransceiver('audio', { direction: 'recvonly' }),
                    e.addTransceiver('video', { direction: 'recvonly' })),
                  e.createOffer()
                );
            }
            return (
              this.logger.log('RtcUtil:_createOffer iceConnectionState :', e.iceConnectionState),
              e.iceConnectionState && 'failed' == e.iceConnectionState
                ? (t.iceRestart = !0)
                : 'connected' != e.iceConnectionState &&
                  'completed' != e.iceConnectionState &&
                  'closed' != e.iceConnectionState &&
                  (t.iceRestart = !0),
              e.createOffer(t)
            );
          }
        },
        formatOfferSdpForSafari: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.sdp,
            n = (e.direction, a.parse(t));
          return (
            n.media &&
              n.media.map(function (e) {
                'video' === e.type && ((e.direction = 'recvonly'), (e.ssrcs.length = 0));
              }),
            (t = a.write(n))
          );
        },
        formatSdp: function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = t.offerOrAnswer,
            r = t.uid,
            o = t.highAudio,
            c = t.stero,
            u = t.targetUid,
            d = t.netDetect,
            l = t.codec,
            f = t.chromeScreenShareOpened,
            p = t.vp8Only,
            h = t.stream || new MediaStream(),
            m = n.sdp,
            _ = (n.type, []),
            v = [],
            g = a.parse(m);
          this.logger.log('RtcUtil:formatSdp uid ' + u + '\n');
          var y = h.getAudioTracks()[0],
            E = h.getVideoTracks()[0];
          return (
            (g.rtcpXr = 'rcvr-rtt=all:10000'),
            g.media &&
              g.media.map(function (t) {
                if (
                  (t.candidates && delete t.candidates,
                  u !== r
                    ? (t.direction = 'recvonly')
                    : ((t.direction = /recvonly/.test(t.direction) ? 'recvonly' : 'sendonly'),
                      'firefox' == i.default.browser.ua &&
                        i.default.browser.version >= 72 &&
                        ((('audio' !== t.type || y) && ('video' !== t.type || E)) ||
                          (t.direction = 'recvonly'))),
                  ((/audio/.test(t.type) && !y) || (/video/.test(t.type) && !E)) &&
                    delete t.ssrcs &&
                    delete t.ssrcGroups &&
                    delete t.msid,
                  'audio' === t.type &&
                    (v.push(t.mid),
                    t,
                    t.rtcpFb &&
                      1 == t.rtcpFb.length &&
                      t.rtcpFb.push({ payload: t.rtcpFb[0].payload, type: 'nack' })),
                  'video' === t.type && E)
                ) {
                  /h264/i.test(m) ||
                    'Chrome Mobile' === s.prefix ||
                    'Chrome' === s.prefix ||
                    e.logger.error('RtcUtil:formatSdp 该机型浏览器不支持H264编码');
                  var a = [];
                  if (
                    (t.rtp &&
                      t.rtp.length &&
                      t.rtp.map(function (e) {
                        'H264' === e.codec
                          ? a.push(e.payload)
                          : 'VP8' === e.codec &&
                            t.fmtp.push({
                              payload: e.payload,
                              config:
                                'x-google-max-bitrate=2048;x-google-min-bitrate=512;x-google-start-bitrate=1024',
                            });
                      }),
                    t.fmtp &&
                      t.fmtp.length &&
                      t.fmtp.map(function (e) {
                        f
                          ? -1 != a.indexOf(e.payload) &&
                            e.config &&
                            (e.config.indexOf('x-google-min-bitrate=512') > 0 &&
                              (e.config = e.config.replace(
                                ';x-google-max-bitrate=2048;x-google-min-bitrate=512;x-google-start-bitrate=1024',
                                '',
                              )),
                            -1 === e.config.indexOf('x-google-min-bitrate=1024') &&
                              (e.config += ';x-google-min-bitrate=1024'))
                          : -1 != a.indexOf(e.payload) &&
                            e.config &&
                            (e.config.indexOf('x-google-min-bitrate=1024') > 0 &&
                              (e.config = e.config.replace(';x-google-min-bitrate=1024', '')),
                            -1 === e.config.indexOf('x-google-min-bitrate=512') &&
                              (e.config +=
                                ';x-google-max-bitrate=2048;x-google-min-bitrate=512;x-google-start-bitrate=1024'));
                      }),
                    'Firefox' === s.prefix && t.msid)
                  ) {
                    var d = t.msid.split(' ');
                    if (d[1] == E.id) {
                      d[1] = d[1].replace(
                        /([\da-zA-Z]{4})/,
                        (function (e, t, n) {
                          var r = '',
                            i = t,
                            o = [
                              '0',
                              '1',
                              '2',
                              '3',
                              '4',
                              '5',
                              '6',
                              '7',
                              '8',
                              '9',
                              'a',
                              'b',
                              'c',
                              'd',
                              'e',
                              'f',
                              'g',
                              'h',
                              'i',
                              'j',
                              'k',
                              'l',
                              'm',
                              'n',
                              'o',
                              'p',
                              'q',
                              'r',
                              's',
                              't',
                              'u',
                              'v',
                              'w',
                              'x',
                              'y',
                              'z',
                            ];
                          e && (i = Math.round(Math.random() * (n - t)) + t);
                          for (var a = 0; a < i; a++)
                            r += o[Math.round(Math.random() * (o.length - 1))];
                          return r;
                        })(!1, 4),
                      );
                    } else d[1] = E.id;
                    t.msid = d.join(' ');
                  }
                } else navigator.userAgent.toLowerCase().indexOf('se 2.x');
                if (
                  'audio' === t.type &&
                  ((t.ptime = 60), (t.maxptime = 60), t.fmtp && t.fmtp.length)
                ) {
                  var l = !1,
                    p = o ? 48e3 : 16e3;
                  t.fmtp.map(function (e) {
                    e.config &&
                      -1 !== e.config.indexOf('minptime=') &&
                      (e.config = e.config.replace(/minptime=\d+/, 'minptime=60')),
                      e.config &&
                        -1 !== e.config.indexOf('sprop-maxcapturerate=') &&
                        -1 !== e.config.indexOf('maxplaybackrate') &&
                        ((l = !0),
                        (e.config = e.config.replace(
                          /sprop-maxcapturerate=\d+/,
                          'sprop-maxcapturerate=' + p,
                        )),
                        (e.config = e.config.replace(
                          /maxplaybackrate=\d+/,
                          'maxplaybackrate=' + p,
                        ))),
                      l || (e.config += ';maxplaybackrate=' + p + ';sprop-maxcapturerate=' + p),
                      c && (e.config += ';maxaveragebitrate=131072;stereo=1;sprop-stereo=1;cbr=1');
                  });
                }
                if ('offer' === n.type) {
                  var h = t.mid;
                  g.groups &&
                    g.groups.map(function (e) {
                      if (e.mids && e.mids.split) {
                        var n = e.mids.split(' ');
                        -1 !== n.indexOf(h) &&
                          (n.splice(n.indexOf(h), 1, t.mid), (e.mids = n.join(' ')));
                      }
                    });
                }
                t.fmtp = e.limitFrame(t.fmtp);
              }),
            d
              ? (g = this.keepCodec(g, l))
              : ('weixin' === i.default.browser.ua || p) &&
                (this.logger.log('清除H264 codec'), (g = this.keepCodec(g, 'vp8'))),
            (n.sdp = a.write(g)),
            (n.sdp = n.sdp.replace(/t=([0-9 ]*)\r\n/, 't=$1\r\na=rtcp-xr:rcvr-rtt=all:10000\r\n')),
            _.length > 0 &&
              _.map(function (e) {
                var t = new RegExp('a=ssrc:' + e + '.+\\r\\n', 'gi');
                n.sdp = n.sdp.replace(t, '');
              }),
            n
          );
        },
        keepCodec: function (e, t) {
          var n = this;
          if (t && e) {
            var r = [];
            return (
              e.media.map(function (e) {
                if ('video' === e.type) {
                  if (e.rtp && e.rtp.length) {
                    var o = !1;
                    e.rtp.map(function (e) {
                      e.codec.toLowerCase() !== t || o || ((o = !0), r.push(e.payload));
                    });
                  }
                  r.length &&
                    e.fmtp &&
                    e.fmtp.length &&
                    e.fmtp.map(function (e) {
                      var t = /apt=(\d*)/gi.exec(e.config);
                      t &&
                        t.length &&
                        r.map(function (n) {
                          n === parseInt(t[t.length - 1], 10) && r.push(e.payload);
                        });
                    }),
                    n.logger.warn('保留的payloads: ', r),
                    r.length &&
                      ((e.payloads = r.join(' ')),
                      (e.fmtp = i(e.fmtp, r)),
                      (e.rtcpFb = i(e.rtcpFb, r)),
                      (e.rtp = i(e.rtp, r)));
                }
              }),
              e
            );
          }
          function i(e, t) {
            var n = [];
            if (
              (e.map(function (e) {
                t.map(function (t) {
                  e.payload === t && n.push(e);
                });
              }),
              n.length)
            )
              return n;
          }
          this.logger.log('RtcUtil:keepCodec Invalid Argument');
        },
        limitFrame: function (e) {
          return (
            e.map(function (e) {
              /42e01f/gi.test(e.config) && (e.config += ';max-fs=12288');
            }),
            e
          );
        },
        setMediaBitrates: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.sdp,
            n = e.bit,
            r = void 0 === n ? {} : n,
            i = r.video,
            o = void 0 === i ? 500 : i,
            s = r.audio,
            c = void 0 === s ? 500 : s,
            u = a.parse(t);
          return (
            u.media &&
              u.media.map(function (e) {
                e.bandwidth = [
                  {
                    type: navigator.mozGetUserMedia ? 'TIAS' : 'AS',
                    limit: 'audio' === e.type ? c : o,
                  },
                ];
              }),
            a.write(u)
          );
        },
        formatSSRCChrome: function (e, t, n) {
          return e.map(function (e, r) {
            return (e.id = t + '0' + n + '0' + Math.floor(r / 4)), (e.id -= 0), e;
          });
        },
        formatSSRCFirefox: function (e, t, n) {
          return e.map(function (e, r) {
            return (e.id = t + '0' + n + '0' + Math.floor(r / 4)), (e.id -= 0), e;
          });
        },
        formatSdpRemote: function (e, t, n) {
          var r = /Chrome/gi.test(s.prefix);
          return /Safari/gi.test(s.prefix)
            ? e
            : r
            ? this.formatSdpRemoteChrome(e, t, n)
            : this.formatSdpRemoteFirefox(e, t);
        },
        formatSdpRemoteChrome: function (e, t) {
          return (
            -1 ===
              (e = e.replace(/a=msid:.+\r\na=ssrc:\d+ cname:.+/gi, function (e) {
                var t = e.match(/a=ssrc:(\d+)/),
                  n = e.match(/a=msid:(.+) (.+)/);
                return (
                  t[1] && (e = e.replace('a=msid', 'a=ssrc:' + t[1] + ' msid')),
                  n[1] && t[1] && (e = e + '\r\na=ssrc:' + t[1] + ' mslabel:' + n[1]),
                  n[2] && t[1] && (e = e + '\r\na=ssrc:' + t[1] + ' label:' + n[2]),
                  e
                );
              })).indexOf('b=AS:1024') &&
              (e = e.replace(/m=video ([0-9./ A-Z]*)\n/g, 'm=video $1\nb=AS:1024\n')),
            e
          );
        },
        formatSdpRemoteFirefox: function (e, t) {
          if (
            ((e = e.replace(/\r\na=msid:.+\r\na=ssrc:\d+ cname:.+/gi, function (e) {
              var t = e.match(/\r\na=ssrc:\d+ cname:.+/);
              return (e = (e = e.replace(/a=ssrc:\d+ cname:.+/, '')).replace(
                'a=msid',
                t[0] + '\r\na=msid',
              ));
            })),
            t && t.sdp)
          ) {
            var n = a.parse(e),
              r = a.parse(t.sdp);
            n.media.length, r.media.length;
          }
          return (
            -1 === e.indexOf('b=AS:1024') &&
              (e = e.replace(/m=video ([0-9./ A-Z]*)\n/g, 'm=video $1\nb=AS:1024\n')),
            e
          );
        },
        parse: function (e) {
          var t = a.parse(e);
          this.logger.log('RtcUtil:parse 原始sdp\n', e),
            this.logger.log('RtcUtil:parse 处理后sdp\n', t);
        },
        updateMediaStream: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (e.fn = 'updateMediaStream'), this.fnShake(e);
        },
        _updateMediaStream: function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = t.peer,
            r = t.currStream,
            o = t.streams,
            a = void 0 === o ? [] : o;
          this.logger.log('RtcUtil:_updateMediaStream: ');
          var c = this.checkCurrStream(n),
            u = {},
            d = n,
            l = r || new MediaStream();
          a.map(function (e) {
            e.getTracks().map(function (e) {
              u[e.id] = e;
            });
          });
          var f = Object.keys(c.tracks).filter(function (e) {
            return !u[e];
          });
          this.logger.log('RtcUtil:_updateMediaStream 获取移除的列表', f);
          var p = Object.keys(u).filter(function (e) {
            return !c.tracks[e];
          });
          return (
            this.logger.log('RtcUtil:_updateMediaStream 获取新加的列表', p),
            f &&
              f.map(function (t) {
                var r = c.tracks[t].sender,
                  o = c.tracks[t].track;
                if (
                  (o && e.logger.log('RtcUtil:_updateMediaStream remove old track ', o.id),
                  i.default.browser.greaterThanOrEqualToSafari_12_1_1() ||
                    'Firefox' === s.prefix ||
                    (('Chrome' === s.prefix || 'Chrome Mobile' === s.prefix) && s.version >= 72))
                ) {
                  e.logger.log('使用不同的api，清除track');
                  var a = 'audio' === o.kind ? n.audioSender : n.videoSender;
                  a && a.replaceTrack(null);
                } else d.removeTrack(r);
                l.removeTrack(o);
              }),
            p &&
              p.map(function (t) {
                var r = u[t];
                e.logger.log('RtcUtil:_updateMediaStream add new track: ', r && r.id),
                  l.addTrack(r),
                  i.default.browser.greaterThanOrEqualToSafari_12_1_1() ||
                  'Firefox' === s.prefix ||
                  (('Chrome' === s.prefix || 'Chrome Mobile' === s.prefix) && s.version >= 72)
                    ? (e.logger.log('使用不同的api，添加track'),
                      'audio' === r.kind
                        ? n.audioSender
                          ? n.audioSender.replaceTrack(r)
                          : (n.audioSender = d.addTrack(r, l))
                        : 'video' === r.kind &&
                          (n.videoSender
                            ? (e.logger.log('RtcUtil:_updateMediaStream open the camera'),
                              n.videoSender.replaceTrack(r))
                            : (n.videoSender = d.addTrack(r, l))))
                    : 'video' === r.kind
                    ? (n.videoSender = d.addTrack(r, l))
                    : (n.audioSender = d.addTrack(r, l));
              }),
            this.checkCurrStream(n),
            Promise.resolve(l)
          );
        },
        removeTrack: function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = t.peer,
            r = t.currStream,
            i = t.tracks,
            o = void 0 === i ? [] : i;
          if (0 !== o.length) {
            var a = this.checkCurrStream(n);
            o.map(function (t) {
              a.tracks[t.id] &&
                (e.logger.log(
                  'RtcUtil:removeTrack ====remove track',
                  t,
                  t.readyState,
                  a.tracks[t.id].sender,
                ),
                r.removeTrack(t),
                n.removeTrack(a.tracks[t.id].sender));
            });
          }
        },
        checkCurrStream: function (e) {
          var t = this,
            n = {},
            r = [],
            i = e.getSenders();
          return (
            i &&
              i.map(function (e) {
                var i = e.track;
                i
                  ? ((n[i.id] = { sender: e, track: i }),
                    t.logger.log('RtcUtil: checkCurrStream --\x3e track id:', i.kind + ':' + i.id))
                  : r.push(e);
              }),
            { tracks: n, empty: r }
          );
        },
        checkMediaStatus: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.videoTrack,
            n = e.sdp,
            r = (e.uid, { video: !1 });
          return (
            (r.video = new RegExp(t.id).test(n)),
            this.logger.log('checkMediaStatus ----\x3e result', r),
            r
          );
        },
        checkMeidaExistent: function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = t.sdp,
            r = t.type,
            i = !0,
            o = a.parse(n);
          return (
            o.media &&
              o.media &&
              o.media.map(function (t) {
                t.type &&
                  t.type === r &&
                  (('sendonly' == t.direction || 'sendrecv' == t.direction) &&
                  t.ssrcs &&
                  t.ssrcs.length
                    ? (e.logger.log('对方发送 %s流', r), (i = !0))
                    : (e.logger.log('对方不发送 %s流', r), (i = !1)));
              }),
            i
          );
        },
        validMediaStream: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.sdp,
            n = e.msid,
            r = e.trackid;
          if (!n || !r) return !1;
          var i = !1;
          return n && (i = new RegExp(n).test(t)), i ? (r && (i = new RegExp(r).test(t)), i) : i;
        },
      }),
        (e.exports = t.default);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = a(n(1)),
        i = a(n(2)),
        o = n(27);
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var s = n(5),
        c = s.info.nrtcVersion,
        u = n(19),
        d = 'https://statistic.live.126.net/webrtc/stat',
        l = (function () {
          function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, r.default)(this, e);
            var n = t.appkey;
            (this.infos = {}), this.init(n), this.resetStatus();
          }
          return (
            (0, i.default)(e, [
              { key: 'resetStatus', value: function () {} },
              {
                key: 'init',
                value: function (e) {
                  this.infos = Object.assign(this.infos, {
                    interval: 30,
                    ver: 2,
                    platform: f.convertPlatform(u.os.family) + '-' + u.os.version,
                    browser: u.name + '-' + u.version,
                    sdk_ver: c || '3.6.0',
                    uid: null,
                    appkey: e,
                    time: null,
                    data: {},
                  });
                },
              },
              {
                key: 'clear',
                value: function () {
                  this.infos.data = {};
                },
              },
              {
                key: 'start',
                value: function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                  (this.infos.appkey = e.appKey || e.appkey || this.infos.appkey),
                    (this.infos.cid = e.cid),
                    (this.infos.uid = e.uid);
                },
              },
              {
                key: 'stop',
                value: function () {
                  this.send(), this.clear();
                },
              },
              {
                key: 'update',
                value: function (e) {
                  (this.infos.data['stat_' + Date.now()] = e),
                    Object.keys(this.infos.data).length === this.infos.interval && this.send();
                },
              },
              {
                key: 'send',
                value: function () {
                  var e = this;
                  0 !== Object.keys(this.infos.data).length &&
                    ((this.infos.time = Date.now()),
                    s.wssServer && (d = d.replace('statistic.live.126.net', s.wssServer)),
                    (0, o.ajax)({
                      type: 'post',
                      url: d,
                      data: this.infos,
                      header: {
                        sdktype: 'nrtc',
                        appkey: this.infos.appkey,
                        platform: 'web',
                        sdkver: c,
                      },
                    })
                      .then(function (t) {
                        e.clear();
                      })
                      .catch(function (e) {
                        console.log('err', e);
                      }));
                },
              },
            ]),
            e
          );
        })();
      t.default = l;
      var f = {
        convertNetwork: function (e) {
          return { wlan: 'wifi', lan: 'ethernet' }[e] || 'unknown';
        },
        convertPlatform: function (e) {
          var t = void 0;
          return (t = /Windows/i.test(e) ? 'Win' : e), (t = /OS X/i.test(t) ? 'Mac' : t);
        },
      };
      e.exports = t.default;
    },
    function (e, t) {
      function n(e) {
        return (
          !!e.constructor &&
          'function' == typeof e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
      }
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      e.exports = function (e) {
        return (
          null != e &&
          (n(e) ||
            (function (e) {
              return (
                'function' == typeof e.readFloatLE &&
                'function' == typeof e.slice &&
                n(e.slice(0, 0))
              );
            })(e) ||
            !!e._isBuffer)
        );
      };
    },
    function (e, t) {
      var n, r;
      (n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
        (r = {
          rotl: function (e, t) {
            return (e << t) | (e >>> (32 - t));
          },
          rotr: function (e, t) {
            return (e << (32 - t)) | (e >>> t);
          },
          endian: function (e) {
            if (e.constructor == Number)
              return (16711935 & r.rotl(e, 8)) | (4278255360 & r.rotl(e, 24));
            for (var t = 0; t < e.length; t++) e[t] = r.endian(e[t]);
            return e;
          },
          randomBytes: function (e) {
            for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
            return t;
          },
          bytesToWords: function (e) {
            for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8)
              t[r >>> 5] |= e[n] << (24 - (r % 32));
            return t;
          },
          wordsToBytes: function (e) {
            for (var t = [], n = 0; n < 32 * e.length; n += 8)
              t.push((e[n >>> 5] >>> (24 - (n % 32))) & 255);
            return t;
          },
          bytesToHex: function (e) {
            for (var t = [], n = 0; n < e.length; n++)
              t.push((e[n] >>> 4).toString(16)), t.push((15 & e[n]).toString(16));
            return t.join('');
          },
          hexToBytes: function (e) {
            for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
            return t;
          },
          bytesToBase64: function (e) {
            for (var t = [], r = 0; r < e.length; r += 3)
              for (var i = (e[r] << 16) | (e[r + 1] << 8) | e[r + 2], o = 0; o < 4; o++)
                8 * r + 6 * o <= 8 * e.length
                  ? t.push(n.charAt((i >>> (6 * (3 - o))) & 63))
                  : t.push('=');
            return t.join('');
          },
          base64ToBytes: function (e) {
            e = e.replace(/[^A-Z0-9+\/]/gi, '');
            for (var t = [], r = 0, i = 0; r < e.length; i = ++r % 4)
              0 != i &&
                t.push(
                  ((n.indexOf(e.charAt(r - 1)) & (Math.pow(2, -2 * i + 8) - 1)) << (2 * i)) |
                    (n.indexOf(e.charAt(r)) >>> (6 - 2 * i)),
                );
            return t;
          },
        }),
        (e.exports = r);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = s(n(1)),
        i = s(n(2)),
        o = n(27),
        a = s(n(155));
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var c = n(5),
        u = c.info.nrtcVersion,
        d = n(19),
        l = 'https://statistic.live.126.net/statistic/realtime/sdkinfo',
        f = 'https://statistic.live.126.net/statics/report/webrtc/networkProbeLog',
        p = (function () {
          function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, r.default)(this, e);
            var n = t.appkey,
              i = t.adapterRef;
            (this.infos = {}),
              (this.userlist = []),
              (this.localVolume = 0),
              (this.local = {}),
              (this.remote = {}),
              (this.audioBwe = { bitsSentCurrent: 0, bitsRecvCurrent: [] }),
              (this.videoBwe = { bitsSentCurrent: 0, bitsRecvCurrent: [] }),
              (this.netDetectDownData = {
                v_lost: [],
                rtt: [],
                real_v_res: [],
                real_v_kbps_n: [],
                v_fps: [],
              }),
              (this.webrtcStats = []),
              (this.remoteAudioHelperMap = {}),
              (this.publicIP = ''),
              (this.adapterRef = i),
              this.init(n),
              this.resetStatus();
          }
          return (
            (0, i.default)(e, [
              {
                key: 'init',
                value: function (e) {
                  this.infos = Object.assign(this.infos, {
                    ver: 3,
                    isp: -1,
                    sdk_ver: u || '3.6.0',
                    appkey: e,
                    interval: 60,
                    samples: 30,
                    time: null,
                    qos_algorithm: -1,
                    fec_algorithm: -1,
                    qos_scene: -1,
                    qos_strategy: -1,
                  });
                },
              },
              {
                key: 'resetStatus',
                value: function () {
                  (this.infos = Object.assign(this.infos, {
                    uid: null,
                    cid: null,
                    push_url: null,
                    turn_ip: null,
                    proxy_ip: null,
                  })),
                    (this.videoStuckReport = {}),
                    (this.audioStuckReport = {}),
                    this.clearInfoData(),
                    (this.remoteAudioHelperMap = {}),
                    (this.uidSsrcMap = {}),
                    (this.userlist = []),
                    (this.audioBwe = { bitsSentCurrent: 0, bitsRecvCurrent: [] }),
                    (this.videoBwe = { bitsSentCurrent: 0, bitsRecvCurrent: [] });
                },
              },
              {
                key: 'initInfoData',
                value: function (e) {
                  var t =
                      this.imInfo.sessionStart || this.sessionConfig.signalStartTime || Date.now(),
                    n = (this.imInfo && this.imInfo.cid) || 0,
                    r = {
                      uid: e,
                      cid: n,
                      push_url: (this.sessionConfig && this.sessionConfig.rtmpUrl) || '',
                      turn_ip: (this.imInfo && this.imInfo.turnMap) || '',
                      proxy_ip: (this.imInfo && this.imInfo.turnMap) || '',
                      session_id: (0, a.default)(n + ':' + e + ':' + t),
                      device_id: (0, o.deviceId)(),
                      p2p: !1,
                      net: -1,
                      connect_state: (this.imInfo && this.imInfo.code) || 200,
                    };
                  this.infos = Object.assign(this.infos, r);
                },
              },
              {
                key: 'clearInfoData',
                value: function () {
                  (this.localVolume = 0),
                    (this.infos = Object.assign(this.infos, {
                      a_p_volume: [],
                      rx: { audio: [], video: [] },
                      tx: {
                        a_lost: [],
                        v_lost: [],
                        rtt: [],
                        rtt_mdev: [],
                        v_cap_fps: [],
                        qos_v_fps: [],
                        v_fps: [],
                        real_v_res: [],
                        real_v_kbps: [],
                        real_v_kbps_n: [],
                        real_a_kbps: [],
                        real_a_kbps_n: [],
                        qos_v_kbps: [],
                        a_volume: [],
                        a_cap_volume: [],
                        a_codec: [],
                        a_stream_ended: [],
                        a_ssrc: [],
                        v_codec: [],
                        v_stream_ended: [],
                        v_ssrc: [],
                      },
                    }));
                },
              },
              {
                key: 'start',
                value: function (e) {
                  var t = e.imInfo,
                    n = e.sessionConfig,
                    r = e.videoConfig;
                  t &&
                    ((this.infos.appkey = this.infos.appkey),
                    (this.imInfo = t || {}),
                    (this.infos.cid = this.imInfo.cid),
                    (this.infos.uid = this.imInfo.uid),
                    (this.sessionConfig = n || {}),
                    (this.videoConfig = r || {}),
                    this.clearSecond(),
                    this.getTurnMap(),
                    this.initInfoData(this.infos.uid));
                },
              },
              {
                key: 'stop',
                value: function () {
                  this.send(), this.resetStatus();
                },
              },
              {
                key: 'clearSecond',
                value: function () {
                  this.paramSecond = {
                    upAudioCache: {},
                    upVideoCache: {},
                    downAudioCache: {},
                    downVideoCache: {},
                  };
                },
              },
              {
                key: 'getPacketLossRate',
                value: function (e, t) {
                  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                  if (!e || !t) return 0;
                  var r = parseInt(e.packetsLost) || 0,
                    i = parseInt(t.packetsLost) || 0;
                  if (i <= r) return 0;
                  var o = n ? e.packetsSent : e.packetsReceived,
                    a = n ? t.packetsSent : t.packetsReceived,
                    s = parseInt(o) || 0,
                    c = parseInt(a) || 0;
                  return c <= s
                    ? 0
                    : n
                    ? parseFloat((((i - r) / (c - s)) * 100).toFixed(1))
                    : parseFloat((((i - r) / (i - r + (c - s))) * 100).toFixed(1));
                },
              },
              {
                key: 'getVrdor',
                value: function (e, t) {
                  var n = 0,
                    r = 0;
                  if (!e || !t) return { vrdolr: n, vrdohr: r };
                  var i = parseInt(e.googInterframeDelayMax),
                    o = parseInt(t.googInterframeDelayMax);
                  if (o <= i) return { vrdolr: n, vrdohr: r };
                  var a = 0,
                    s = 0,
                    c = 0,
                    u = 0;
                  return (
                    i > 200 && i < 400 && (a = i / 2e3),
                    o > 200 && o < 400 && (s = o / 2e3),
                    i > 400 && (c = i / 2e3),
                    o > 400 && (u = o / 2e3),
                    { vrdolr: (n = a + s), vrdohr: (r = c + u) }
                  );
                },
              },
              {
                key: 'update',
                value: function (e, t) {
                  this.imInfo.netDetect && console.log('sdk数据上报更新 data: ', e);
                  var n = [],
                    r = [],
                    i = [],
                    o = [];
                  for (var a in (2 == this.webrtcStats.length && this.webrtcStats.shift(),
                  this.webrtcStats.push(e),
                  e)) {
                    var s = parseFloat(a.split('_')[3]);
                    -1 !== a.indexOf('_send_') && -1 !== a.indexOf('_audio')
                      ? (this.paramSecond.upAudioCache[s] &&
                          (e[a].alr = this.getPacketLossRate(
                            this.paramSecond.upAudioCache[s],
                            e[a],
                            !0,
                          )),
                        (this.paramSecond.upAudioCache[s] = e[a]),
                        n.push(e[a]))
                      : -1 !== a.indexOf('_send_') && -1 !== a.indexOf('_video')
                      ? (this.paramSecond.upVideoCache[s] &&
                          (e[a].vlr = this.getPacketLossRate(
                            this.paramSecond.upVideoCache[s],
                            e[a],
                            !0,
                          )),
                        Object.assign(e[a], e.bweforvideo),
                        (this.paramSecond.upVideoCache[s] = e[a]),
                        r.push(e[a]))
                      : -1 !== a.indexOf('_recv_') && -1 !== a.indexOf('_audio')
                      ? (this.paramSecond.downAudioCache[s] &&
                          (e[a].alr = this.getPacketLossRate(
                            this.paramSecond.downAudioCache[s],
                            e[a],
                          )),
                        (this.paramSecond.downAudioCache[s] = e[a]),
                        i.push(e[a]))
                      : -1 !== a.indexOf('_recv_') && -1 !== a.indexOf('_video')
                      ? (this.paramSecond.downVideoCache[s] &&
                          ((e[a].vlr = this.getPacketLossRate(
                            this.paramSecond.downVideoCache[s],
                            e[a],
                          )),
                          Object.assign(
                            e[a],
                            this.getVrdor(this.paramSecond.downVideoCache[s], e[a]),
                          )),
                        (this.paramSecond.downVideoCache[s] = e[a]),
                        o.push(e[a]))
                      : -1 !== a.indexOf('Conn-audio-1-0')
                      ? (this.publicIP = e[a] && e[a].googLocalAddress.match(/([0-9\.]+)/)[1])
                      : (this.network = e[a] && e[a].network);
                  }
                  1 !== t &&
                    t % 2 == 0 &&
                    (this.updateTxMediaInfo(n, r),
                    this.updateRxMediaInfo(i, o),
                    (Object.keys(this.infos.rx.audio).length ||
                      Object.keys(this.infos.rx.video).length ||
                      Object.keys(this.infos.tx.video).length) ===
                      this.infos.interval / 2 && this.send());
                },
              },
              {
                key: 'updateOnce',
                value: function (e) {
                  var t = e.imInfo,
                    n = e.sessionConfig,
                    r = e.rtcConnection;
                  t &&
                    ((this.imInfo = t || {}),
                    (this.sessionConfig = n || {}),
                    (this.rtcConnection = r || {}),
                    (this.videoConfig = e.videoConfig || {}),
                    this.getTurnMap(),
                    this.initInfoData(),
                    this.send());
                },
              },
              {
                key: 'updateLocalVolume',
                value: function (e) {
                  this.localVolume = 32768 * e;
                },
              },
              {
                key: 'updateLocalStreamEnable',
                value: function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                  (this.LocalAudioEnable = e), (this.localVideoEnable = t);
                },
              },
              {
                key: 'updateRemoteMap',
                value: function (e) {
                  this.remoteAudioHelperMap = e;
                },
              },
              {
                key: 'updateRxMediaInfo',
                value: function (e, t) {
                  var n = this;
                  if (this.imInfo.netDetect) {
                    var r = {
                      v_lost: t[0].vlr || 0,
                      rtt: parseFloat((t[0] && t[0].googRtt) || 0) || 0,
                      real_v_kbps_n: (t.length && t[0].bitsReceivedPerSecond) || 0,
                      v_fps: parseFloat((t[0] && t[0].googFrameRateOutput) || 0) || 0,
                      real_v_res:
                        ((t[0] && t[0].googFrameWidthReceived) || 0) +
                        'x' +
                        ((t[0] && t[0].googFrameHeightReceived) || 0),
                    };
                    for (var i in r) this.netDetectDownData[i].push(r[i]);
                  }
                  var o = {
                      u: [],
                      g: [],
                      c: [],
                      bn: [],
                      bc: [],
                      jbN: [],
                      jbP: [],
                      jbC: [],
                      jbD: [],
                      alr: [],
                      astuck: [],
                      acodec: [],
                      avolume: [],
                      assrc: [],
                    },
                    a = {
                      u: [],
                      i: [],
                      bn: [],
                      bc: [],
                      r: [],
                      f: [],
                      vrdolr: [],
                      vrdohr: [],
                      vstuck: [],
                      vJBbdmax: [],
                      vlr: [],
                      vframed: [],
                      renderDelay: [],
                      nack: [],
                      pli: [],
                      vcodec: [],
                      vssrc: [],
                    };
                  e.map(function (e) {
                    var t = null;
                    e.id && (t = parseFloat(e.id.split('_')[3])),
                      o.u.push(t),
                      o.g.push(-1),
                      o.c.push(-1),
                      o.bn.push(e.bitsReceivedPerSecond || 0),
                      o.bc.push(-1),
                      o.jbN.push(parseInt(e.googDecodingNormal) || 0),
                      o.jbP.push(parseInt(e.googDecodingPLC) || 0),
                      o.jbC.push(parseInt(e.googDecodingCNG) || 0),
                      o.jbD.push(parseInt(e.googJitterBufferMs) || 0),
                      o.alr.push(parseInt(e.alr) || 0),
                      o.acodec.push(e.googCodecName || 0),
                      o.avolume.push(parseInt(e.audioOutputLevel) || 0),
                      o.assrc.push(e.ssrc || '');
                    var r = n.audioStuckReport[t];
                    r && r.length
                      ? (void 0 === o.astuck && (o.astuck = []),
                        o.astuck.push(
                          r.reduce(function (e, t) {
                            return e + t;
                          }),
                        ),
                        (r.length = 0))
                      : o.astuck.push(0);
                  });
                  var s = e.length
                    ? Math.max.apply(
                        Math,
                        e.map(function (e) {
                          return e.audioOutputLevel;
                        }),
                      )
                    : 0;
                  this.infos.a_p_volume.push(s),
                    t.map(function (e) {
                      var t = null;
                      e.id && (t = parseFloat(e.id.split('_')[3])),
                        t && a.u.push(t),
                        a.i.push(parseFloat(e.googInterframeDelayMax)),
                        a.bn.push(e.bitsReceivedPerSecond || 0),
                        a.bc.push(-1),
                        a.r.push(
                          (e.googFrameWidthReceived || 0) + 'x' + (e.googFrameHeightReceived || 0),
                        ),
                        a.f.push(parseInt(e.googFrameRateOutput)),
                        a.vrdolr.push(e.vrdolr || 0),
                        a.vrdohr.push(e.vrdohr || 0),
                        a.vJBbdmax.push(parseInt(e.googJitterBufferMs)),
                        a.vframed.push(parseInt(e.googMaxDecodeMs)),
                        a.renderDelay.push(parseInt(e.googRenderDelayMs)),
                        a.vlr.push(parseInt(e.vlr) || 0),
                        a.nack.push(parseInt(e.googNacksSent)),
                        a.pli.push(parseInt(e.googPlisSent)),
                        a.vcodec.push(e.googCodecName || 'H264'),
                        a.vssrc.push(e.ssrc || '');
                      var r = n.videoStuckReport[t];
                      r && r.length
                        ? (a.vstuck.push(
                            r.reduce(function (e, t) {
                              return e + t;
                            }),
                          ),
                          (r.length = 0))
                        : a.vstuck.push(0);
                    }),
                    this.infos.rx.audio.push(o),
                    this.infos.rx.video.push(a);
                },
              },
              {
                key: 'getLocalMediaStats',
                value: function (e, t) {
                  var n = {
                    a_lost: (e[0] && e[0].alr) || 0,
                    v_lost: (t[0] && t[0].vlr) || 0,
                    rtt: parseInt(t[0] && t[0].googRtt) || 0,
                    rtt_mdev: -1,
                    v_cap_fps: parseInt(t[0] && t[0].googFrameRateInput) || 0,
                    qos_v_fps: parseInt(t[0] && t[0].googFrameRateInput) || 0,
                    v_fps: parseInt(t[0] && t[0].googFrameRateSent) || 0,
                    real_v_res:
                      ((t[0] && t[0].googFrameWidthSent) || 0) +
                      'x' +
                      ((t[0] && t[0].googFrameHeightSent) || 0),
                    real_v_kbps: parseFloat(t[0] && t[0].googActualEncBitrate) || 0,
                    real_v_kbps_n: parseFloat(t[0] && t[0].googTransmitBitrate) || 0,
                    real_a_kbps: -1,
                    real_a_kbps_n: parseInt(e[0] && e[0].bitsSentPerSecond) || 0,
                    qos_v_kbps: -1,
                    a_volume: parseInt(e[0] && e[0].audioInputLevel) || 0,
                    a_cap_volume: Math.round(this.localVolume) || 0,
                    a_codec: (e[0] && e[0].googCodecName) || 'opus',
                    a_stream_ended: this.LocalAudioEnable || !1,
                    a_ssrc: (e[0] && e[0].ssrc) || '',
                    v_codec: (t[0] && t[0].googCodecName) || 'h264',
                    v_stream_ended: this.localVideoEnable || !1,
                    v_ssrc: (t[0] && t[0].ssrc) || '',
                  };
                  return (
                    n.real_a_kbps_n <= 2 &&
                      this.adapterRef.instance._isWeixinBrowser() &&
                      (this.adapterRef.logger.warn('音频的上行码率: ', n.real_a_kbps_n),
                      this.adapterRef.webrtcBusiness &&
                        this.adapterRef.webrtcBusiness.selfWebRtcInstance &&
                        this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection &&
                        this.adapterRef.webrtcBusiness.selfWebRtcInstance.rtcConnection
                          .audioSender &&
                        (this.adapterRef.logger.error('上行音频没有发送，重新建立上行链路'),
                        this.adapterRef.webrtcBusiness._doIceFail4Self())),
                    n
                  );
                },
              },
              {
                key: 'updateTxMediaInfo',
                value: function (e, t) {
                  var n = this.getLocalMediaStats(e, t);
                  for (var r in n) this.infos.tx[r].push(n[r]);
                  var i = ((navigator.connection || {}).type || 'unknown').toString().toLowerCase();
                  this.infos.net = h.convertNetwork(this.network || i);
                },
              },
              {
                key: 'getTurnMap',
                value: function () {
                  if (this.imInfo) {
                    var e = this.imInfo;
                    e.serverMap
                      ? (e.serverMap.constructor === Object
                          ? (e.turnMap = e.serverMap || null)
                          : (e.turnMap = JSON.parse(e.serverMap || null)),
                        (e.turnMap = e.turnMap && e.turnMap.turnaddrs),
                        (e.turnMap = e.turnMap && e.turnMap[0]),
                        (e.turnMap = e.turnMap.constructor === Array ? e.turnMap[0] : e.turnMap),
                        (e.turnMap = e.turnMap && e.turnMap.match(/\d+\.\d+.\d+\.\d+/)),
                        (e.turnMap = e.turnMap[0]))
                      : e.relayaddrs && e.relayaddrs.length
                      ? (e.turnMap = e.relayaddrs[0].match(/\d+\.\d+.\d+\.\d+/)[0])
                      : (e.turnMap = '0.0.0.0');
                  } else console.warn('尚未连接网关，不统计');
                },
              },
              {
                key: 'send',
                value: function () {
                  var e = this;
                  this.infos.uid &&
                    this.infos.cid &&
                    (this.imInfo.netDetect ||
                      ((this.infos.time = Date.now()),
                      (this.infos.samples = this.infos.rx.audio.length),
                      c.wssServer && (l = l.replace('statistic.live.126.net', c.wssServer)),
                      (0, o.ajax)({
                        type: 'post',
                        url: l,
                        data: this.infos,
                        header: {
                          sdktype: 'nrtc',
                          appkey: this.infos.appkey,
                          platform: 'web',
                          sdkver: u,
                        },
                      })
                        .then(function (t) {
                          e.clearInfoData();
                        })
                        .catch(function (t) {
                          console.log('data uploader send', t), e.clearInfoData();
                        })));
                },
              },
              {
                key: 'updateVideoStuckData',
                value: function (e) {
                  var t = this;
                  Object.keys(e).forEach(function (n) {
                    var r = e[n],
                      i = t.videoStuckReport[n];
                    void 0 === i && (i = t.videoStuckReport[n] = []), i.push(r);
                  });
                },
              },
              {
                key: 'updateAudioStuckData',
                value: function (e) {
                  var t = this;
                  Object.keys(e).forEach(function (n) {
                    var r = e[n],
                      i = t.audioStuckReport[n];
                    void 0 === i && (i = t.audioStuckReport[n] = []), i.push(r);
                  });
                },
              },
              { key: 'updateVideoCache', value: function (e) {} },
              {
                key: 'disposalDataForNetDetect',
                value: function (e) {
                  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                    n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                  return (
                    (this.NetDetectData = {}),
                    (this.NetDetectData.cid = this.infos.cid),
                    (this.NetDetectData.user_ip = this.publicIP || '127.0.0.1'),
                    (this.NetDetectData.browser = d.name + '-' + d.version),
                    (this.NetDetectData.server_ip =
                      this.imInfo.wssArr && this.imInfo.wssArr.length && this.imInfo.wssArr[0]),
                    (this.NetDetectData.upload_network_status = []),
                    (this.NetDetectData.download_network_status = []),
                    this.imInfo.netDetect &&
                      (console.log('整理网络探测的数据: 计算RTT: ', this.infos.tx.rtt),
                      console.log('整理网络探测的数据: 计算上行帧率: ', this.infos.tx.v_fps),
                      console.log(
                        '整理网络探测的数据: 计算下行帧率: ',
                        this.netDetectDownData.v_fps,
                      ),
                      console.log('整理网络探测的数据: 计算上行丢包率: ', this.infos.tx.v_lost),
                      console.log(
                        '整理网络探测的数据: 计算下行丢包率: ',
                        this.netDetectDownData.v_lost,
                      ),
                      console.log(
                        '整理网络探测的数据: 计算上行带宽: ',
                        this.infos.tx.real_v_kbps_n,
                      ),
                      console.log(
                        '整理网络探测的数据: 计算下行带宽: ',
                        this.netDetectDownData.real_v_kbps_n,
                      )),
                    this.NetDetectData.upload_network_status.push({
                      up_rtt: h.getRealValue(this.infos.tx.rtt) || 0,
                      up_loss: parseInt(h.getRealValue(this.infos.tx.v_lost)) || 0,
                      up_bwe: h.calculateAverage(this.infos.tx.real_v_kbps_n, 0) || 0,
                      up_framerate: h.getRealValue(this.infos.tx.v_fps) || 0,
                      up_resolution: h.getRealValue(this.infos.tx.real_v_res) || '0x0',
                      codec: this.imInfo.codec,
                      network_status: '',
                      up_status: t ? 'success' : 'failed',
                    }),
                    this.NetDetectData.download_network_status.push({
                      down_rtt:
                        this.NetDetectData.upload_network_status[
                          this.NetDetectData.upload_network_status.length - 1
                        ].up_rtt || 0,
                      down_loss: parseInt(h.getRealValue(this.netDetectDownData.v_lost)) || 0,
                      down_bwe: h.calculateAverage(this.netDetectDownData.real_v_kbps_n, 0) || 0,
                      down_framerate: h.getRealValue(this.netDetectDownData.v_fps) || 0,
                      down_resolution: h.getRealValue(this.netDetectDownData.real_v_res) || '0X0',
                      codec: this.imInfo.codec,
                      network_status: '',
                      down_status: n ? 'success' : 'failed',
                    }),
                    e &&
                      (console.log(
                        'Safari自己计算的统计结果: ',
                        JSON.stringify(this.NetDetectData, null, ' '),
                      ),
                      console.log('服务器反馈后的统计结果: ', JSON.stringify(e, null, ' ')),
                      (this.NetDetectData.user_ip = e.user_ip),
                      e.upload_network_status &&
                        ((this.NetDetectData.upload_network_status[0].up_rtt =
                          e.upload_network_status.up_rtt),
                        (this.NetDetectData.upload_network_status[0].up_loss =
                          e.upload_network_status.up_loss)),
                      e.download_network_status &&
                        (this.NetDetectData.download_network_status[0].down_rtt =
                          e.download_network_status.down_rtt),
                      this.NetDetectData.download_network_status[0].down_rtt &&
                      this.NetDetectData.upload_network_status[0].up_rtt
                        ? this.NetDetectData.download_network_status[0].down_rtt >
                          this.NetDetectData.upload_network_status[0].up_rtt
                          ? (this.NetDetectData.download_network_status[0].down_rtt = this.NetDetectData.upload_network_status[0].up_rtt)
                          : (this.NetDetectData.upload_network_status[0].up_rtt = this.NetDetectData.download_network_status[0].down_rtt)
                        : this.NetDetectData.download_network_status[0].down_rtt
                        ? (this.NetDetectData.upload_network_status[0].up_rtt = this.NetDetectData.download_network_status[0].down_rtt)
                        : this.NetDetectData.upload_network_status[0].up_rtt &&
                          (this.NetDetectData.download_network_status[0].down_rtt = this.NetDetectData.upload_network_status[0].up_rtt),
                      (this.NetDetectData.upload_network_status[0].up_framerate =
                        h.calculateFrameRate(this.infos.tx.v_fps) || 0),
                      (this.NetDetectData.download_network_status[0].down_framerate =
                        h.calculateFrameRate(this.netDetectDownData.v_fps) || 0),
                      console.log(
                        'safar自己统计并且结合服务器反馈后的重合结果: ',
                        JSON.stringify(this.NetDetectData, null, ' '),
                      )),
                    (this.NetDetectData = h.assignResolution(this.NetDetectData)),
                    (this.NetDetectData = this.computeNetStatus(this.NetDetectData)),
                    (this.transportTime = 0),
                    this.sendNetDetectData(this.NetDetectData),
                    this.NetDetectData
                  );
                },
              },
              {
                key: 'computeNetStatus',
                value: function (e) {
                  if (e) {
                    if (e.download_network_status) {
                      e.download_network_status[0].down_loss > e.upload_network_status[0].up_loss
                        ? ((e.loss_rate = e.download_network_status[0].down_loss),
                          (e.download_network_status[0].down_loss =
                            e.download_network_status[0].down_loss -
                            e.upload_network_status[0].up_loss))
                        : e.download_network_status[0].down_loss -
                            e.upload_network_status[0].up_loss <=
                            3 &&
                          e.download_network_status[0].down_loss -
                            e.upload_network_status[0].up_loss >=
                            -3
                        ? (console.log('差距少于等于3'),
                          (e.download_network_status[0].down_loss = 0),
                          (e.loss_rate = e.upload_network_status[0].up_loss))
                        : (console.log('差距大'),
                          (e.download_network_status[0].down_loss = 0),
                          (e.loss_rate = e.upload_network_status[0].up_loss));
                      var t =
                        (e.loss_rate / 20) * 0.5 +
                        (e.download_network_status[0].down_rtt / 1200) * 0.25 +
                        (50 / 150) * 0.25;
                      console.log('网络探测计算结果：', t),
                        (e.download_network_status[0].network_status =
                          t <= 0.2625
                            ? '网络状况非常好，音视频通话流畅'
                            : t < 0.55
                            ? '网络状况好，音视频通话偶有卡顿'
                            : t <= 1
                            ? '网络状况差, 音频通话流畅'
                            : '网络状况非常差，音频通话偶有卡顿'),
                        (e.upload_network_status[0].up_bwe &&
                          e.upload_network_status[0].up_framerate &&
                          e.upload_network_status[0].up_rtt) ||
                          (console.log('统计信息，没有获取到上行行带宽、帧率或者時延'),
                          (e.download_network_status[0].network_status =
                            '网络状况非常糟糕，无法进行音视频通话')),
                        (e.upload_network_status[0].network_status =
                          e.download_network_status[0].network_status);
                    }
                    return e;
                  }
                  console.log('computeNetStatus: Invalid Parameter');
                },
              },
              {
                key: 'sendNetDetectData',
                value: function (e) {
                  var t = this;
                  c.wssServer && (f = f.replace('statistic.live.126.net', c.wssServer)),
                    (0, o.ajax)({ type: 'post', url: f, data: e })
                      .then(function (e) {
                        e && e.code && 200 == e.code && console.warn('网络探测结果发送成功：', e);
                      })
                      .catch(function (e) {
                        console.log('网络探测结果发送失败：', e),
                          t.transportTime < 2
                            ? (t.sendNetDetectData(t.NetDetectData), t.transportTime++)
                            : (t.transportTime = 0);
                      });
                },
              },
            ]),
            e
          );
        })();
      t.default = p;
      var h = {
        convertNetwork: function (e) {
          return { wlan: 'wifi', lan: 'ethernet' }[e] || 'unknown';
        },
        convertPlatform: function (e) {
          var t = void 0;
          return (t = /Windows/i.test(e) ? 'Win' : e), (t = /OS X/i.test(t) ? 'Mac' : t);
        },
        calculateAverage: function (e, t) {
          if (e && 0 != e.length)
            return e.length < 3 && e.length > 1
              ? e[e.length - 1] || e[e.length - 2]
              : 1 == e.length
              ? e[0]
              : ((e = e.slice(2)).sort(function (e, t) {
                  return e - t;
                }),
                0 == t ? Math.round(e.reduce(n) / e.length) : (e.reduce(n) / e.length).toFixed(t));
          function n(e, t) {
            return e + t;
          }
        },
        getRealValue: function (e) {
          if (e && 0 != e.length) {
            for (var t = e.length; t > 0; t--) if (e[t]) return e[t];
            return 0;
          }
        },
        calculateFrameRate: function (e) {
          if (!e || 0 == e.length) return 0;
          if (1 == e.length) return e[0];
          for (var t = null, n = null, r = e.length; r >= 0; r--) {
            if (n && n > e[r]) {
              t = e[r];
              break;
            }
            e[r] && !n && (n = e[r]);
          }
          return n && t ? Math.round((n - t) / 2) : 0;
        },
        assignResolution: function (e) {
          return e &&
            e.upload_network_status &&
            0 != e.upload_network_status.length &&
            e.download_network_status &&
            0 != e.download_network_status.length
            ? '0x0' != e.upload_network_status[0].up_resolution &&
              '0X0' != e.download_network_status[0].down_resolution
              ? e
              : '0x0' != e.download_network_status[0].down_resolution
              ? ((e.upload_network_status[0].up_resolution =
                  e.download_network_status[0].down_resolution),
                e)
              : '0x0' != e.upload_network_status[0].up_resolution
              ? ((e.download_network_status[0].down_resolution =
                  e.upload_network_status[0].up_resolution),
                e)
              : e
            : e;
        },
      };
      e.exports = t.default;
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = a(n(1)),
        i = a(n(2)),
        o = n(27);
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var s = n(5),
        c = s.info.nrtcVersion,
        u = 'https://statistic.live.126.net/statics/report/webrtc/global',
        d = (function () {
          function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, r.default)(this, e),
              (this.logger = t.logger || console),
              (this.data = {}),
              (this.adapterRef = t),
              this.adapterRef.instance._params.appkey
                ? (this.appkey = this.adapterRef.instance._params.appkey)
                : (this.appkey =
                    (this.adapterRef.nim &&
                      this.adapterRef.nim.options &&
                      this.adapterRef.nim.options.appKey) ||
                    this.adapterRef.imInfo.appkey),
              this.init();
          }
          return (
            (0, i.default)(e, [
              {
                key: 'init',
                value: function () {
                  (this.calling = !1),
                    (this.data = Object.assign(this.data, {
                      account: '',
                      uid: 0,
                      cid: 0,
                      deviceList: [],
                      sessionInfo: {},
                      mediaConstraint: {},
                      peerConnections: [],
                      mediaPlay: {},
                      ext: '',
                    }));
                },
              },
              {
                key: 'update',
                value: function (e) {
                  Object.assign(this.data, e);
                },
              },
              {
                key: 'send',
                value: function (e) {
                  var t = this;
                  this.logger.log('----- send apiData ------', e),
                    s.wssServer && (u = u.replace('statistic.live.126.net', s.wssServer)),
                    (0, o.ajax)({
                      type: 'post',
                      url: u,
                      data: e,
                      header: { sdktype: 'nrtc', appkey: this.appkey, platform: 'web', sdkver: c },
                    })
                      .then(function (e) {
                        t.init();
                      })
                      .catch(function (e) {
                        console.log('err', e), t.init();
                      });
                },
              },
            ]),
            e
          );
        })();
      (t.default = d), (e.exports = t.default);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = a(n(1)),
        i = a(n(2)),
        o = n(27);
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var s = n(5),
        c = s.info.nrtcVersion,
        u = 'https://statistic.live.126.net/statistic/realtime/sdkFunctioninfo',
        d = (function () {
          function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, r.default)(this, e);
            var n = t.appkey,
              i = t.platform,
              o = t.statisticServer;
            (this.apis = {}),
              (this.isRtc = /WebRTC/.test(i)),
              this.init(n, i, o),
              this.resetStatus();
          }
          return (
            (0, i.default)(e, [
              {
                key: 'init',
                value: function (e, t, n) {
                  this.apis = Object.assign(this.apis, {
                    ver: 1,
                    platform: t,
                    sdk_ver: c || 'v4.4.0',
                    uid: null,
                    appkey: e,
                    time: null,
                    statisticServer: n,
                  });
                },
              },
              {
                key: 'start',
                value: function (e) {
                  (this.calling = !0), (this.apis = Object.assign(this.apis, e));
                },
              },
              {
                key: 'resetStatus',
                value: function () {
                  (this.calling = !1),
                    (this.apis = Object.assign(this.apis, {
                      p2p: { value: 0 },
                      meeting: { value: 0 },
                      bypass: { value: 0 },
                      call_control_type: { value: 0 },
                      self_mute: { value: -1 },
                      self_mic_mute: { value: -1 },
                      set_mic: { value: -1 },
                      set_camera: { value: -1 },
                      mute_remote_audio: { value: -1 },
                      mute_remote_video: { value: -1 },
                      switch_p2p_type: { value: 0 },
                      audio_to_video: { value: 0 },
                      video_to_audio: { value: 0 },
                      set_speaker: { value: -1 },
                      net_detect: { value: this.isRtc ? -1 : 0 },
                      beautify: { value: -1 },
                      water_mark: { value: -1 },
                      audio_samples: { value: -1 },
                      video_samples: { value: -1 },
                      pre_view_mirror: { value: -1 },
                      code_mirror: { value: -1 },
                      custom_audio: { value: -1 },
                      custom_video: { value: -1 },
                      audio_mix: { value: -1 },
                      mixing_send_volume: { value: -1 },
                      seek_to_time: { value: -1 },
                      snap_shot: { value: -1 },
                      record: { value: 0 },
                      audio_record: { value: 0 },
                      display: { value: 0 },
                      android_compatibility: { value: -1 },
                      hd_audio: { value: 0 },
                      video_quality: { value: 0 },
                      fps: { value: 0 },
                      prefered_video_encoder: { value: -1 },
                      prefered_video_decoder: { value: -1 },
                      video_max_encode_bitrate: { value: this.isRtc ? -1 : 0 },
                      audio_scene: { value: -1 },
                      video_adaptive_strategy: { value: this.isRtc ? -1 : 0 },
                      ans: { value: this.isRtc ? -1 : 0 },
                      agc: { value: -1 },
                      dtx: { value: -1 },
                      aec: { value: this.isRtc ? -1 : 0 },
                      awc: { value: this.isRtc ? -1 : 0 },
                      actor: { value: 0 },
                      always_keep_calling: { value: 0 },
                      server_record_audio: { value: 0 },
                      server_record_video: { value: 0 },
                      record_module: { value: 0 },
                      record_speaker: { value: 0 },
                      server_record_single_user: { value: 0 },
                      screen_sharing_module: { value: 0 },
                      video_crop: { value: 0 },
                      switch_live_url: { value: 0 },
                      set_v_fps: { value: 15 },
                      set_video_quality: { value: 0 },
                      set_video_custom_bitrate: { value: 0 },
                      set_video_cut: { value: 1 },
                    }));
                },
              },
              {
                key: 'update',
                value: function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments[1],
                    n = e.key,
                    r = e.ext,
                    i = e.value;
                  e.constructor === String && (n = e),
                    (r = r || t),
                    this.apis[n] &&
                      ((this.apis[n].value = 'record_module' == n ? i : 1),
                      void 0 !== r && (this.apis[n].ext = r),
                      /(p2p|meeting)/.test(n) && (this.calling = !0));
                },
              },
              {
                key: 'send',
                value: function () {
                  var e = this;
                  this.calling &&
                    ((this.calling = !1),
                    (this.apis.time = Date.now()),
                    this.apis.statisticServer
                      ? (u = this.apis.statisticServer)
                      : s.wssServer && (u = u.replace('statistic.live.126.net', s.wssServer)),
                    (0, o.ajax)({
                      type: 'post',
                      url: u,
                      data: this.apis,
                      header: {
                        sdktype: 'nrtc',
                        appkey: this.apis.appkey,
                        platform: 'web',
                        sdkver: c,
                      },
                    })
                      .then(function (t) {
                        e.resetStatus();
                      })
                      .catch(function (t) {
                        console.log('ApiInvokeData: send: err', t), e.resetStatus();
                      }));
                },
              },
            ]),
            e
          );
        })();
      (t.default = d), (e.exports = t.default);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i = (t.tool = {
          merge: function () {
            var e = arguments;
            return (e[0] = Object.assign.apply(Object.assign, arguments)), e[0];
          },
          verifyOptions: function () {
            var e = arguments;
            if (e[0] && e[0].constructor === Object)
              for (var t = 1; t < arguments.length; t++) {
                var n = e[t];
                (n = n.split(' ')).map(function (t) {
                  if (void 0 === e[0][t]) throw Error('参数缺失 ' + t);
                });
              }
          },
          guid:
            ((r = function () {
              return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
            }),
            function () {
              return r() + r() + r() + r() + r() + r() + r() + r();
            }),
          sortDevices: function (e) {
            e &&
              e.length > 1 &&
              e.sort(function (e, t) {
                var n = -1 !== e.name.toLowerCase().indexOf('virtual'),
                  r = -1 !== e.path.toLowerCase().indexOf('virtual'),
                  i = -1 !== t.name.toLowerCase().indexOf('virtual'),
                  o = -1 !== t.path.toLowerCase().indexOf('virtual');
                return r ? 1 : o ? -1 : n && i ? 0 : n ? 1 : i ? -1 : 0;
              });
          },
          randomNum: function (e, t) {
            var n = t - e,
              r = Math.random();
            return 0 == Math.round(r * n)
              ? e + 1
              : Math.round(r * t) == t
              ? (index++, t - 1)
              : e + Math.round(r * n) - 1;
          },
          isString: function (e) {
            return '[object String]' === Object.prototype.toString.call(e);
          },
          isNumber: function (e) {
            return '[object Number]' === Object.prototype.toString.call(e);
          },
          isBoolean: function (e) {
            return '[object Boolean]' === Object.prototype.toString.call(e);
          },
          isObject: function (e) {
            return '[object Object]' === Object.prototype.toString.call(e);
          },
          isArray: function (e) {
            return '[object Array]' === Object.prototype.toString.call(e);
          },
          isFunction: function (e) {
            return '[object Function]' === Object.prototype.toString.call(e);
          },
          isDate: function (e) {
            return '[object Date]' === Object.prototype.toString.call(e);
          },
          isRegExp: function (e) {
            return '[object RegExp]' === Object.prototype.toString.call(e);
          },
          isNull: function (e) {
            return null === e;
          },
          isUndefined: function (e) {
            return void 0 === e;
          },
          exist: function (e) {
            return !i.isNull(e) && !i.isUndefined(e);
          },
          formatTime: function () {
            var e = new Date();
            return (
              e.getFullYear() +
              '-' +
              e.getMonth() +
              '-' +
              e.getDate() +
              ' ' +
              e.getHours() +
              ':' +
              e.getMinutes() +
              ':' +
              e.getSeconds()
            );
          },
        });
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = function (e) {
        return Object.keys(e)
          .map(function (t) {
            return (
              encodeURIComponent(t) +
              '=' +
              encodeURIComponent(/Object/i.test(e[t]) ? JSON.stringify(e[t]) : e[t])
            );
          })
          .join('&');
      };
      t.ajax = function (e) {
        if (!e || !e.url) return Promise.reject('参数不完整，无法发起请求');
        e.dataType = e.dataType || 'json';
        var t = new XMLHttpRequest();
        t.open(e.type || 'GET', e.url, !0), (t.responseType = '' + e.dataType);
        var n = e.contentType || 'application/json;charset=UTF-8';
        return (
          t.setRequestHeader('Content-type', n),
          e.header &&
            Object.keys(e.header).map(function (n) {
              t.setRequestHeader(n, e.header[n]);
            }),
          new Promise(function (i, o) {
            (t.onload = function () {
              if (t.status > 400) return Promise.reject('参数不完整，无法发起请求');
              var e = t.response;
              i(e);
            }),
              (t.onerror = function (e) {
                o(e);
              }),
              n.indexOf('x-www-form-urlencoded') >= 0
                ? e.data
                  ? t.send(r(e.data))
                  : t.send()
                : e.data
                ? t.send(JSON.stringify(e.data))
                : t.send();
          })
        );
      };
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      t.element = {
        html2node: function (e) {
          var t = document.createElement('div');
          t.innerHTML = e;
          var n = [],
            r = void 0,
            i = void 0;
          if (t.children) for (r = 0, i = t.children.length; r < i; r++) n.push(t.children[r]);
          else
            for (r = 0, i = t.childNodes.length; r < i; r++) {
              var o = t.childNodes[r];
              1 == o.nodeType && n.push(o);
            }
          return n.length > 1 ? t : n[0];
        },
        n2node: function (e) {
          return e
            ? /HTML.+Element/gi.test(e)
              ? e
              : e[0] && /HTML.+Element/gi.test(e[0])
              ? e[0]
              : null
            : null;
        },
      };
    },
    function (e, t, n) {
      'use strict';
      var r = n(17),
        i = n(19),
        o = r.getGlobal();
      function a(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
      }
      o.Object.assign ||
        (console.log('Object.assign polyfill'),
        (o.Object.assign = function () {
          for (var e = arguments, t = 1; t < e.length; t++) e[0] = a(e[0], e[t]);
          return e[0];
        })),
        (o.platform = i);
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = function (e) {
          var t = e.util;
          return (r = t.notundef), i;
        });
      var r = void 0;
      function i(e) {
        r(e.enable) && (this.enable = e.enable ? 1 : 0),
          r(e.needBadge) && (this.needBadge = e.needBadge ? 1 : 0),
          r(e.needPushNick) && (this.needPushNick = e.needPushNick ? 1 : 0),
          r(e.pushContent) && (this.pushContent = '' + e.pushContent),
          r(e.custom) && (this.custom = '' + e.custom),
          r(e.pushPayload) && (this.pushPayload = '' + e.pushPayload),
          r(e.sound) && (this.sound = '' + e.sound),
          r(e.webrtcEnable) && (this.webrtcEnable = e.webrtcEnable ? 1 : 0),
          r(e.forceKeepCalling) && (this.forceKeepCalling = e.forceKeepCalling ? 1 : 0);
      }
      e.exports = t.default;
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i,
        o,
        a = n(94),
        s = (r = a) && r.__esModule ? r : { default: r };
      var c = {
        NETCALL_TYPE_AUDIO: 1,
        NETCALL_TYPE_VIDEO: 2,
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
        NETCALL_CONTROL_COMMAND_SELF_AUDIO_INVALID: 11,
        NETCALL_CONTROL_COMMAND_SELF_ON_BACKGROUND: 12,
        NETCALL_CONTROL_COMMAND_START_NOTIFY_RECEIVED: 13,
        NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_START: 14,
        NETCALL_CONTROL_COMMAND_NOTIFY_RECORD_STOP: 15,
        DEVICE_TYPE_AUDIO_IN: 0,
        DEVICE_TYPE_AUDIO_OUT_LOCAL: 1,
        DEVICE_TYPE_AUDIO_OUT_CHAT: 2,
        DEVICE_TYPE_VIDEO: 3,
        DEVICE_STATUS_NO_CHANGE: 0,
        DEVICE_STATUS_CHANGE: 1,
        DEVICE_STATUS_WORK_REMOVE: 2,
        DEVICE_STATUS_RESET: 4,
        DEVICE_STATUS_START: 8,
        DEVICE_STATUS_END: 16,
        CHAT_VIDEO_QUALITY_NORMAL: 0,
        CHAT_VIDEO_QUALITY_LOW: 1,
        CHAT_VIDEO_QUALITY_MEDIUM: 2,
        CHAT_VIDEO_QUALITY_HIGH: 3,
        CHAT_VIDEO_QUALITY_480P: 4,
        CHAT_VIDEO_QUALITY_720P: 5,
        CHAT_VIDEO_QUALITY_540P: 6,
        CHAT_VIDEO_ENCODEMODE_NORMAL: 0,
        CHAT_VIDEO_ENCODEMODE_SMOOTH: 1,
        CHAT_VIDEO_ENCODEMODE_QUALITY: 2,
        CHAT_VIDEO_ENCODEMODE_SCREEN: 3,
        CHAT_VIDEO_FRAME_RATE_NORMAL: 0,
        CHAT_VIDEO_FRAME_RATE_5: 1,
        CHAT_VIDEO_FRAME_RATE_10: 2,
        CHAT_VIDEO_FRAME_RATE_15: 3,
        CHAT_VIDEO_FRAME_RATE_20: 4,
        CHAT_VIDEO_FRAME_RATE_25: 5,
        CHAT_VIDEO_SCALE_None: 0,
        CHAT_VIDEO_SCALE_1x1: 1,
        CHAT_VIDEO_SCALE_4x3: 2,
        CHAT_VIDEO_SCALE_16x9: 3,
        CHAT_USER_LEFT_TIMEOUT: -1,
        CHAT_USER_LEFT_NORMAL: 0,
        CHAT_NET_STATUS_VERY_GOOD: 0,
        CHAT_NET_STATUS_GOOD: 1,
        CHAT_NET_STATUS_POOR: 2,
        CHAT_NET_STATUS_BAD: 3,
        CHAT_NET_STATUS_VERY_BAD: 4,
        CHAT_NET_STATUS_VERY_BAD_VIDEO_CLOSE: -1,
        CLIENT_TYPE_AOS: 1,
        CLIENT_TYPE_IOS: 2,
        CLIENT_TYPE_PC: 4,
        CLIENT_TYPE_WINPHONE: 8,
        CLIENT_TYPE_WEB: 16,
        CLIENT_TYPE_REST: 32,
        LAYOUT_SPLITBOTTOMHORFLOATING: 0,
        LAYOUT_SPLITTOPHORFLOATING: 1,
        LAYOUT_SPLITLATTICETILE: 2,
        LAYOUT_SPLITLATTICECUTTINGTILE: 3,
        LAYOUT_SPLITCUSTOMLAYOUT: 4,
        LAYOUT_SPLITAUDIOLAYOUT: 5,
        NETDETECT_AUDIO: 0,
        NETDETECT_VIDEO: 1,
        kNRTCChatStreamEncryptTypeNone: 0,
        kNRTCChatStreamEncryptTypeAES128ECB: 2,
        kNRTCChatStreamEncryptTypeAES256CBC: 3,
        kNRTCChatStreamEncryptTypeAES256CTR: 4,
        kNRTCChatStreamEncryptTypeAES128XTS: 5,
        kNRTCChatStreamEncryptTypeAES256XTS: 6,
      };
      (c.deviceTypeMap =
        ((i = {}),
        (0, s.default)(i, c.DEVICE_TYPE_AUDIO_IN, 'audioIn'),
        (0, s.default)(i, c.DEVICE_TYPE_AUDIO_OUT_CHAT, 'audioOut'),
        (0, s.default)(i, c.DEVICE_TYPE_VIDEO, 'video'),
        i)),
        (c.getDeviceTypeStr = function (e) {
          return c.deviceTypeMap[e];
        }),
        (c.deviceStatusMap =
          ((o = {}),
          (0, s.default)(o, c.DEVICE_STATUS_NO_CHANGE, 'noChange'),
          (0, s.default)(o, c.DEVICE_STATUS_CHANGE, 'change'),
          (0, s.default)(o, c.DEVICE_STATUS_WORK_REMOVE, 'workRemove'),
          (0, s.default)(o, c.DEVICE_STATUS_RESET, 'reset'),
          (0, s.default)(o, c.DEVICE_STATUS_START, 'start'),
          (0, s.default)(o, c.DEVICE_STATUS_END, 'end'),
          o)),
        (c.getDeviceStatusStr = function (e) {
          return c.deviceStatusMap[e];
        }),
        (t.default = c),
        (e.exports = t.default);
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      'use strict';
      e.exports = {
        pushConfig: {
          1: 'enable',
          2: 'needBadge',
          3: 'needPushNick',
          4: 'pushContent',
          5: 'custom',
          6: 'pushPayload',
          7: 'sound',
          9: 'forceKeepCalling',
          10: 'webrtcEnable',
        },
        liveOption: { 1: 'liveEnable', 2: 'webrtcEnable' },
      };
    },
    function (e, t, n) {
      'use strict';
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
          webrtcEnable: 10,
        },
        liveOption: { liveEnable: 1, webrtcEnable: 2 },
      };
    },
    function (e, t, n) {
      'use strict';
      var r = n(0),
        i = n(99),
        o = r.merge({}, i.idMap, {
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
            queryAccountUidMap: 16,
          },
        }),
        a = {
          initNetcall: {
            sid: o.netcall.id,
            cid: o.netcall.initNetcall,
            params: [
              { type: 'byte', name: 'type' },
              { type: 'StrArray', name: 'accounts' },
              { type: 'String', name: 'pushContent' },
              { type: 'String', name: 'custom' },
              { type: 'Property', name: 'pushConfig' },
            ],
          },
          keepCalling: {
            sid: o.netcall.id,
            cid: o.netcall.keepCalling,
            params: [
              { type: 'byte', name: 'type' },
              { type: 'StrArray', name: 'accounts' },
              { type: 'long', name: 'channelId' },
            ],
          },
          calleeAck: {
            sid: o.netcall.id,
            cid: o.netcall.calleeAck,
            params: [
              { type: 'string', name: 'account' },
              { type: 'long', name: 'channelId' },
              { type: 'byte', name: 'type' },
              { type: 'bool', name: 'accepted' },
            ],
          },
          hangup: {
            sid: o.netcall.id,
            cid: o.netcall.hangup,
            params: [{ type: 'long', name: 'channelId' }],
          },
          netcallControl: {
            sid: o.netcall.id,
            cid: o.netcall.netcallControl,
            params: [
              { type: 'long', name: 'channelId' },
              { type: 'byte', name: 'type' },
            ],
          },
          verifyChannelId: {
            sid: o.netcall.id,
            cid: o.netcall.verifyChannelId,
            params: [
              { type: 'long', name: 'channelId' },
              { type: 'String', name: 'account' },
            ],
          },
          createChannel: {
            sid: o.netcall.id,
            cid: o.netcall.createChannel,
            params: [
              { type: 'String', name: 'channelName' },
              { type: 'String', name: 'custom' },
              { type: 'Boolean', name: 'webrtcEnable' },
              { type: 'String', name: 'rtmpConf' },
            ],
          },
          joinChannel: {
            sid: o.netcall.id,
            cid: o.netcall.joinChannel,
            params: [
              { type: 'String', name: 'channelName' },
              { type: 'Property', name: 'liveOption' },
            ],
          },
          queryAccountUidMap: {
            sid: o.netcall.id,
            cid: o.netcall.queryAccountUidMap,
            params: [
              { type: 'String', name: 'channelName' },
              { type: 'LongArray', name: 'uids' },
            ],
          },
        };
      e.exports = {
        idMap: o,
        cmdConfig: a,
        packetConfig: {
          '9_1': {
            service: 'netcall',
            cmd: 'initNetcall',
            response: [
              { type: 'Number', name: 'timetag' },
              { type: 'Number', name: 'uid' },
              { type: 'Number', name: 'channelId' },
              { type: 'StrArray', name: 'turnServerList' },
              { type: 'StrArray', name: 'sturnServerList' },
              { type: 'StrArray', name: 'proxyServerList' },
              { type: 'StrArray', name: 'keepCallingAccounts' },
              { type: 'StrLongMap', name: 'accountUidMap' },
              { type: 'String', name: 'clientConfig' },
              { type: 'String', name: 'serverMap' },
            ],
          },
          '9_2': {
            service: 'netcall',
            cmd: 'beCalled',
            response: [
              { type: 'Number', name: 'timetag' },
              { type: 'Number', name: 'type' },
              { type: 'Number', name: 'channelId' },
              { type: 'String', name: 'account' },
              { type: 'Number', name: 'uid' },
              { type: 'StrArray', name: 'turnServerList' },
              { type: 'StrArray', name: 'sturnServerList' },
              { type: 'StrArray', name: 'proxyServerList' },
              { type: 'StrLongMap', name: 'accountUidMap' },
              { type: 'String', name: 'clientConfig' },
              { type: 'String', name: 'custom' },
              { type: 'Property', name: 'pushConfig' },
              { type: 'String', name: 'serverMap' },
            ],
          },
          '9_3': {
            service: 'netcall',
            cmd: 'keepCalling',
            response: [{ type: 'StrArr', name: 'accounts' }],
          },
          '9_4': { service: 'netcall', cmd: 'calleeAck', response: [] },
          '9_5': {
            service: 'netcall',
            cmd: 'notifyCalleeAck',
            response: [
              { type: 'String', name: 'account' },
              { type: 'long', name: 'channelId' },
              { type: 'byte', name: 'type' },
              { type: 'bool', name: 'accepted' },
            ],
          },
          '9_6': { service: 'netcall', cmd: 'hangup', response: [] },
          '9_7': {
            service: 'netcall',
            cmd: 'notifyHangup',
            response: [
              { type: 'long', name: 'channelId' },
              { type: 'String', name: 'account' },
              { type: 'long', name: 'timetag' },
            ],
          },
          '9_8': { service: 'netcall', cmd: 'netcallControl', response: [] },
          '9_9': {
            service: 'netcall',
            cmd: 'notifyNetcallControl',
            response: [
              { type: 'String', name: 'account' },
              { type: 'byte', name: 'type' },
              { type: 'long', name: 'channelId' },
            ],
          },
          '9_10': { service: 'netcall', cmd: 'verifyChannelId', response: [] },
          '9_11': {
            service: 'netcall',
            cmd: 'notifyNetcallRecord',
            response: [{ type: 'Property', name: 'msg' }],
          },
          '9_12': {
            service: 'netcall',
            cmd: 'notifyCalleeAckSync',
            response: [
              { type: 'String', name: 'timetag' },
              { type: 'long', name: 'channelId' },
              { type: 'byte', name: 'type' },
              { type: 'bool', name: 'accepted' },
              { type: 'byte', name: 'fromClientType' },
            ],
          },
          '9_13': {
            service: 'netcall',
            cmd: 'createChannel',
            response: [{ type: 'long', name: 'timetag' }],
          },
          '9_14': {
            service: 'netcall',
            cmd: 'joinChannel',
            response: [
              { type: 'long', name: 'timetag' },
              { type: 'long', name: 'channelId' },
              { type: 'StrLongMap', name: 'accountUidMap' },
              { type: 'String', name: 'serverMap' },
              { type: 'String', name: 'clientConfig' },
              { type: 'String', name: 'custom' },
            ],
          },
          '9_15': {
            service: 'netcall',
            cmd: 'notifyJoin',
            response: [
              { type: 'Long', name: 'channelId' },
              { type: 'StrLongMap', name: 'accountUidMap' },
            ],
          },
          '9_16': { service: 'netcall', cmd: 'queryAccountUidMap', response: [] },
        },
      };
    },
    function (e, t, n) {
      'use strict';
      var r = {
        install: function (e) {
          var t = e.Protocol.fn;
          (t.processNetcall = function (e) {
            switch (e.cmd) {
              case 'initNetcall':
                this.onInitNetcall(e);
                break;
              case 'beCalled':
                this.onBeCalled(e);
                break;
              case 'keepCalling':
                this.onKeepCalling(e);
                break;
              case 'calleeAck':
                break;
              case 'notifyCalleeAck':
                this.onNotifyCalleeAck(e);
                break;
              case 'hangup':
                break;
              case 'notifyHangup':
                this.onNotifyHangup(e);
                break;
              case 'notifyNetcallControl':
                this.onNetcallControl(e);
                break;
              case 'notifyCalleeAckSync':
                this.onNotifyCalleeAckSync(e);
                break;
              case 'notifyNetcallRecord':
                this.onMsg(e);
                break;
              case 'createChannel':
                break;
              case 'joinChannel':
                this.joinChannel(e);
                break;
              case 'notifyJoin':
                this.notifyJoin(e);
            }
          }),
            (t.onInitNetcall = function (e) {
              if (!e.error) {
                var t = e.obj.type;
                (e.obj = e.content),
                  (e.obj.type = t),
                  (e.obj.accounts = e.obj.keepCallingAccounts),
                  this.setCurrentNetcall(e.obj.channelId),
                  this.keepCalling(e);
              }
            }),
            (t.setCurrentNetcall = function (e) {
              this.currentNetcallChannelId = e;
            }),
            (t.onKeepCalling = function (e) {
              e.error || (e.content.accounts.length && this.keepCalling(e));
            }),
            (t.keepCalling = function (e) {
              var t = this,
                n = e.obj,
                r = n.type,
                i = n.accounts,
                o = n.channelId;
              i &&
                i.length &&
                setTimeout(function () {
                  t.currentNetcallChannelId &&
                    t.currentNetcallChannelId === o &&
                    t.api.keepCalling({ type: r, accounts: i, channelId: o }).catch(function () {});
                }, 3e3);
            }),
            (t.onBeCalled = function (e) {
              e.error || this.emitAPI({ type: 'beCalled', obj: e.content });
            }),
            (t.onNotifyCalleeAck = function (e) {
              e.error || this.emitAPI({ type: 'notifyCalleeAck', obj: e.content });
            }),
            (t.onNotifyHangup = function (e) {
              e.error || this.emitAPI({ type: 'notifyHangup', obj: e.content });
            }),
            (t.onNetcallControl = function (e) {
              e.error || this.emitAPI({ type: 'netcallControl', obj: e.content });
            }),
            (t.onNotifyCalleeAckSync = function (e) {
              e.error || this.emitAPI({ type: 'notifyCalleeAckSync', obj: e.content });
            }),
            (t.notifyJoin = function (e) {
              e.error || this.emitAPI({ type: 'notifyJoin', obj: e.content });
            }),
            (t.joinChannel = function (e) {
              e.obj = e.content;
            });
        },
      };
      e.exports = r;
    },
    function (e, t, n) {
      'use strict';
      var r = n(337),
        i = {
          install: function (e) {
            var t = e.fn,
              n = e.util,
              i = r({ util: n });
            (t.initNetcall = function (e) {
              return (
                n.verifyOptions(e, 'type accounts', 'netcall::initNetcall'),
                (e.pushContent = ''),
                (e.custom = ''),
                e.pushConfig || (e.pushConfig = {}),
                (e.pushConfig.webrtcEnable = e.webrtcEnable),
                (e.pushConfig = new i(e.pushConfig)),
                this.cbAndSendCmd('initNetcall', e)
              );
            }),
              (t.keepCalling = function (e) {
                return (
                  n.verifyOptions(e, 'type accounts channelId', 'netcall::keepCalling'),
                  this.cbAndSendCmd('keepCalling', e)
                );
              }),
              (t.calleeAck = function (e) {
                return (
                  n.verifyOptions(e, 'account channelId type accepted', 'netcall::calleeAck'),
                  this.cbAndSendCmd('calleeAck', e)
                );
              }),
              (t.hangup = function (e) {
                return (
                  n.verifyOptions(e, 'channelId', 'netcall::hangup'), this.cbAndSendCmd('hangup', e)
                );
              }),
              (t.netcallControl = function (e) {
                return (
                  n.verifyOptions(e, 'channelId type', 'netcall::netcallControl'),
                  this.cbAndSendCmd('netcallControl', e)
                );
              }),
              (t.createChannel = function (e) {
                return this.cbAndSendCmd('createChannel', e);
              }),
              (t.joinChannel = function (e) {
                return (
                  n.verifyOptions(e, 'channelName', 'netcall::joinChannel'),
                  n.verifyBooleanWithDefault(e, 'liveEnable', !1, '', 'netcall::joinChannel'),
                  n.verifyBooleanWithDefault(e, 'webrtcEnable', !1, '', 'netcall::joinChannel'),
                  this.cbAndSendCmd('joinChannel', {
                    channelName: e.channelName,
                    liveOption: {
                      liveEnable: e.liveEnable ? 1 : 0,
                      webrtcEnable: e.webrtcEnable ? 1 : 0,
                    },
                  })
                );
              }),
              (t.queryAccountUidMap = function (e, t) {
                return this.cbAndSendCmd('queryAccountUidMap', { channelName: e, uids: t });
              });
          },
        };
      e.exports = i;
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (e, t, n) {
      'use strict';
      var r = a(n(1)),
        i = a(n(4)),
        o = a(n(3));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var s = void 0,
        c = n(12),
        u = n(691),
        d = n(698),
        l = n(697),
        f = (function (e) {
          function t(e) {
            (0, r.default)(this, t);
            var n = (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return s.merge(n, e), n.init(), n;
          }
          return (0, o.default)(t, e), t;
        })(c);
      f.install = function (e) {
        s = e.util;
      };
      var p = f.prototype;
      (p.init = function () {
        this.reset();
      }),
        (p.reset = function () {
          (this.width = 0), (this.height = 0);
        }),
        (p.initCanvas = function (e) {
          s.merge(this, e);
          var t = this.container || document.body,
            n = this.canvas;
          n || ((n = this.canvas = document.createElement('canvas')), t.appendChild(n)),
            (n.width = this.width),
            (n.height = this.height);
          var r = this.gl;
          if ((r || (r = this.gl = u.getWebGLContext(n)), r))
            r.viewport(0, 0, this.width, this.height),
              r.clearColor(0, 0, 0, 1),
              r.clear(r.COLOR_BUFFER_BIT),
              u.initShaders(r, d, l),
              this.initBuffer(r),
              this.initTextures(r);
          else {
            this.emit('error', { code: 'notSupportWebGl' });
          }
        }),
        (p.initBuffer = function (e) {
          (this.positionLocation = e.getAttribLocation(e.program, 'a_position')),
            (this.texCoordLocation = e.getAttribLocation(e.program, 'a_texCoord')),
            (this.texCoordBuffer = e.createBuffer());
        }),
        (p.initTextures = function (e) {
          (this.yTexture = this.createTexture(e.TEXTURE0)),
            (this.uTexture = this.createTexture(e.TEXTURE1)),
            (this.vTexture = this.createTexture(e.TEXTURE2));
          var t = e.getUniformLocation(e.program, 'Ytex');
          e.uniform1i(t, 0);
          var n = e.getUniformLocation(e.program, 'Utex');
          e.uniform1i(n, 1);
          var r = e.getUniformLocation(e.program, 'Vtex');
          e.uniform1i(r, 2);
        }),
        (p.createTexture = function (e) {
          var t = this.gl,
            n = t.createTexture();
          return (
            t.activeTexture(e),
            t.bindTexture(t.TEXTURE_2D, n),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
            n
          );
        }),
        (p.destroyTextures = function () {
          var e = this.gl;
          e &&
            (e.deleteTexture(this.yTexture),
            e.deleteTexture(this.uTexture),
            e.deleteTexture(this.vTexture)),
            (this.yTexture = null),
            (this.uTexture = null),
            (this.vTexture = null);
        }),
        (p.destroyBuffer = function () {
          var e = this.gl;
          e && this.texCoordBuffer && e.deleteBuffer(this.texCoordBuffer),
            (this.texCoordBuffer = null);
        }),
        (p.updateShaders = function () {
          var e = this.gl,
            t = void 0;
          (t = this.mirror
            ? new Float32Array([-1, 1, 1, 0, -1, -1, 1, 1, 1, 1, 0, 0, 1, -1, 0, 1])
            : new Float32Array([-1, 1, 0, 0, -1, -1, 0, 1, 1, 1, 1, 0, 1, -1, 1, 1])),
            e.bindBuffer(e.ARRAY_BUFFER, this.texCoordBuffer),
            e.bufferData(e.ARRAY_BUFFER, t, e.STATIC_DRAW);
          var n = t.BYTES_PER_ELEMENT;
          e.vertexAttribPointer(this.positionLocation, 2, e.FLOAT, !1, 4 * n, 0),
            e.vertexAttribPointer(this.texCoordLocation, 2, e.FLOAT, !1, 4 * n, 2 * n),
            e.enableVertexAttribArray(this.positionLocation),
            e.enableVertexAttribArray(this.texCoordLocation);
        }),
        (p.updateTextures = function (e) {
          var t = e.y,
            n = e.u,
            r = e.v,
            i = this.gl,
            o = this.width,
            a = this.height;
          this.updateTexture(i.TEXTURE0, this.yTexture, t, o, a),
            this.updateTexture(i.TEXTURE1, this.uTexture, n, o / 2, a / 2),
            this.updateTexture(i.TEXTURE2, this.vTexture, r, o / 2, a / 2),
            i.finish();
        }),
        (p.updateTexture = function (e, t, n, r, i) {
          var o = this.gl;
          o.activeTexture(e),
            o.bindTexture(o.TEXTURE_2D, t),
            o.texImage2D(o.TEXTURE_2D, 0, o.LUMINANCE, r, i, 0, o.LUMINANCE, o.UNSIGNED_BYTE, n);
        }),
        (p.drawImage = function (e) {
          if (!this.destroyed) {
            var t = e.width,
              n = e.height,
              r = e.y,
              i = e.u,
              o = e.v;
            (t === this.width && n === this.height) ||
              ((this.width = t),
              (this.height = n),
              this.clean(),
              this.initCanvas({ width: t, height: n }),
              this.emit('resize', {
                width: t,
                height: n,
                isRemote: this.isRemote,
                container: this.container,
              })),
              this.updateShaders(),
              this.updateTextures({ y: r, u: i, v: o });
            var a = this.gl;
            a.drawArrays(a.TRIANGLE_STRIP, 0, 4);
          }
        }),
        (p.destroy = function () {
          this.destroyed || ((this.destroyed = !0), this.clean(), this.reset());
        }),
        (p.clean = function () {
          this.destroyTextures(), this.destroyBuffer(), this.removeGl();
        }),
        (p.removeGl = function () {
          this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas),
            (this.canvas = null),
            (this.canvasInited = !1),
            (this.gl = null);
        }),
        (e.exports = f);
    },
    function (e, t, n) {
      'use strict';
      var r = u(n(65)),
        i = u(n(1)),
        o = u(n(4)),
        a = u(n(3)),
        s = n(27),
        c = u(n(703));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var d = void 0,
        l = n(12),
        f = n(702),
        p = n(5),
        h = n(701),
        m = n(699),
        _ = n(689),
        v = n(416),
        g = p.agentVersion,
        y = (function (e) {
          function t(e) {
            (0, i.default)(this, t);
            var n = (0, o.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return (
              (e.container = s.element.n2node(e.container)),
              (e.remoteContainer = s.element.n2node(e.remoteContainer)),
              n.setUtil(d),
              d.undef(e.heartbeat) && (e.heartbeat = !0),
              d.merge(n, e),
              n.init(),
              n
            );
          }
          return (0, a.default)(t, e), t;
        })(l);
      y.install = function (e) {
        (d = e.util), h.install(e), m.install(e), _.install(e);
      };
      var E = y.prototype;
      (E.init = function () {
        (this.signal = null),
          (this.signalInited = !1),
          (this.localStreamInfo = null),
          this.resetStatus(),
          this.initProtocol();
        var e = (this.nim && this.nim.options) || {};
        this.dataApi = new s.ApiInvokeData({
          appkey: this.nim.options.appKey,
          statisticServer: e.statisticServer || '',
          platform: 'PC-Agent',
        });
      }),
        (E.resetStatus = function () {
          (this.channelId = null),
            (this.channelName = null),
            (this.type = null),
            (this.target = null),
            (this.sessionMode = null),
            (this.sessionConfig = {}),
            (this.isCaller = !1),
            (this.callee = null),
            (this.remoteStreamInfo = {}),
            (this.calling = !1),
            (this.callAccepted = !1),
            (this.callerInfo = null),
            this.nim.protocol.setCurrentNetcall(),
            (this.needQueryAccountMap = {});
        }),
        (E.initProtocol = function () {
          var e = this.nim;
          (this.account = this.nim.account),
            e.on('beCalled', this.onBeCalled.bind(this)),
            e.on('notifyCalleeAck', this.onCalleeAck.bind(this)),
            e.on('notifyHangup', this.onHangup.bind(this)),
            e.on('notifyUploadLog', this.uploadLog.bind(this)),
            e.on('netcallControl', this.onNetcallControl.bind(this)),
            e.on('notifyCalleeAckSync', this.onCalleeAckSync.bind(this)),
            e.on('notifyJoin', this.onNotifyJoin.bind(this));
        }),
        (E.setStreamEncrypt = function (e, t) {
          this.signal
            ? (console.log('setStreamEncrypt: ', e, t),
              (this.signal.streamEncryptConfig.streamEncryptType = e),
              (this.signal.streamEncryptConfig.streamEncryptToken = t))
            : console.error('设置加密参数失败,请先执行initSignal');
        }),
        (E.getAccount = function () {
          return this.nim.account;
        }),
        (E.getUid = function () {
          return (this.accountUidMap && this.accountUidMap[this.nim.account]) || '-1';
        }),
        (E.isCurrentChannelId = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return this.channelId && this.channelId === e.channelId;
        }),
        (E.notCurrentChannelId = function (e) {
          return !this.isCurrentChannelId(e);
        }),
        (E.rejectWithNoSignal = function () {
          return this.resetWhenHangup(), Promise.reject({ code: 'noConnection' });
        }),
        (E.initSignal = function () {
          var e = this;
          return this.signal
            ? this.stopSignal().then(function () {
                return e._initSignal();
              })
            : this._initSignal();
        }),
        (E._initSignal = function () {
          var e = this;
          return new Promise(function (t, n) {
            var r = (e.nim && e.nim.options) || {},
              i = (e.signal = new h({
                url: f.signalUrl,
                client: e,
                kickLast: e.kickLast,
                account: e.getAccount(),
                heartbeat: e.heartbeat,
                appkey: r.appKey,
                kibanaServer: r.kibanaServer || '',
                statisticServer: r.statisticServer || '',
                reportGlobalServer: r.reportGlobalServer || '',
              }));
            i.on('init', function (r) {
              if ((e.log(r), !e.checkAgentVersion(r.version)))
                return (
                  e.log('插件版本有更新，请下载最新的插件再使用音视频功能'),
                  e.stopSignal(),
                  (r.error = '请安装最新版插件，方可使用视频功能'),
                  (r.errorType = 'agent_update'),
                  void n(r)
                );
              (e.localStreamInfo = r), (e.signalInited = !0), t();
            }),
              i.on('initError', function (t) {
                e.log(t),
                  417 === (t = t || {}).code &&
                    ((t.error = '设备被别的程序占用中, 请检查重试'), (t.errorType = 'device_busy')),
                  'noPC' === t.code &&
                    ((t.error = '请安装插件PC Agent，方可使用音视频功能'),
                    (t.errorType = 'agent_empty')),
                  n(t),
                  e.rejectWithNoSignal();
              }),
              i.on('close', function () {
                e.emit('signalClosed'), e.stopSignal();
              }),
              i.on('devices', function (t) {
                e.emit('devices', t);
              }),
              i.on('login', function (t) {
                e.emit('sessionStarted', t);
              }),
              i.on('deviceStatus', function (t) {
                e.emit('deviceStatus', t);
              }),
              i.on('userJoined', e.onUserJoin.bind(e)),
              i.on('userLeft', e.onUserLeft.bind(e)),
              i.on('logUploaded', e.onLogUploaded.bind(e)),
              i.on('netStatus', function (t) {
                var n = t.id,
                  r = t.status;
                e.emit('netStatus', { account: e.getAccountWithUid(n), status: r });
              }),
              i.on('statistics', function (t) {
                e.emit('statistics', t);
              }),
              i.on('audioVolume', function (t) {
                var n = t.self,
                  r = t.receiver,
                  i = { self: n };
                r &&
                  r.forEach(function (t) {
                    var n = t.id,
                      r = t.status;
                    i[e.getAccountWithUid(n)] = { status: r };
                  }),
                  e.emit('audioVolume', i);
              }),
              i.on('error', e.onError.bind(e)),
              i.on('recordMp4', e.onRecordMp4.bind(e)),
              i.on('heartBeatError', e.onError.bind(e));
          });
        }),
        (E.checkAgentVersion = function () {
          for (
            var e = (arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : '0.0.0.0'
              ).split('.'),
              t = g.split('.'),
              n = 0;
            n < e.length;
            n++
          ) {
            if (+e[n] > +t[n]) return !0;
            if (+e[n] < +t[n]) return !1;
          }
          return !0;
        }),
        (E.stopSignal = function () {
          var e = this;
          return (
            this.stopLocalStream(),
            this.stopRemoteStream(),
            this.signal
              ? this.signal.stopSession().then(function () {
                  e.signal.destroy(), (e.signal = null), (e.signalInited = !1);
                })
              : Promise.resolve()
          );
        }),
        (E.initNetcall = function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = t.type,
            r = t.pushConfig;
          return (
            (this.type = n),
            (this.sessionMode = 'p2p'),
            this.nim
              .initNetcall({ type: n, accounts: [this.callee], webrtcEnable: !0, pushConfig: r })
              .then(
                function (t) {
                  return (e.callerInfo = t), (e.channelId = t.channelId), Promise.resolve(t);
                },
                function (t) {
                  throw (e.resetWhenHangup(), t);
                },
              )
          );
        }),
        (E.initSession = function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (this.signalInited) {
            var n = this.isCaller ? this.callerInfo : t.beCalledInfo;
            this.parseAccountUidMap(n.accountUidMap);
            var i = this.sessionConfig || {};
            return (
              i.ans && this.dataApi.update({ key: 'ans' }),
              i.aec && this.dataApi.update({ key: 'aec' }),
              Object.assign(i, this.streamEncryptConfig),
              this.signal.startSession((0, r.default)({}, n, i)).then(function () {
                return { channelId: e.channelId };
              })
            );
          }
          return this.rejectWithNoSignal();
        }),
        (E.call = function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (
            this.dataApi.update('p2p'),
            new Promise(function (n, r) {
              if (!e.signalInited || e.calling)
                return (
                  e.resetStatus(),
                  r({
                    type: 'statusNotMatch',
                    error: '呼叫失败: 当前正在通话中或者Agent唤起失败，请排查',
                  })
                );
              var i = t.account,
                o = t.type,
                a = t.pushConfig,
                s = t.sessionConfig,
                c = void 0 === s ? {} : s;
              if (
                ((e.calling = !0),
                (e.isCaller = !0),
                (e.callee = e.target = i),
                (e.sessionConfig = c),
                c.highAudio && e.dataApi.update('hd_audio'),
                void 0 !== c.videoFrameRate &&
                  e.dataApi.update('fps', 0 == +c.videoFrameRate ? 0 : +c.videoFrameRate + 1),
                void 0 !== c.videoEncodeMode &&
                  e.dataApi.update('video_adaptive_strategy', c.videoEncodeMode || 0),
                void 0 !== c.videoBitrate &&
                  e.dataApi.update('video_max_encode_bitrate', c.videoBitrate || ''),
                void 0 !== c.recordType && e.dataApi.update('recordType', c.recordType || 0),
                c.isHostSpeaker && e.dataApi.update('isHostSpeaker'),
                void 0 !== c.videoQuality)
              ) {
                var u = c.videoQuality;
                u === v.CHAT_VIDEO_QUALITY_540P
                  ? (u = v.CHAT_VIDEO_QUALITY_720P)
                  : u === v.CHAT_VIDEO_QUALITY_720P && (u = v.CHAT_VIDEO_QUALITY_540P),
                  e.dataApi.update('video_quality', u || 0);
              }
              if (i)
                return e
                  .initNetcall({ type: o, pushConfig: a })
                  .then(function (e) {
                    n(e);
                  })
                  .catch(function (e) {
                    r(e);
                  });
              e.resetStatus(), r({ code: 'noCalleeAccount' });
            })
          );
        }),
        (E.onBeCalled = function (e) {
          this.log('beCalling', e), this.emit('beCalling', e);
        }),
        (E.response = function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          this.dataApi.update('p2p');
          var n = t.beCalledInfo;
          if (!n) return Promise.resolve();
          var r = (n.accepted = !1 !== t.accepted),
            i = (this.sessionConfig = t.sessionConfig || {});
          if (
            (i.highAudio && this.dataApi.update('hd_audio'),
            void 0 !== i.videoFrameRate &&
              this.dataApi.update('fps', 0 == +i.videoFrameRate ? 0 : +i.videoFrameRate + 1),
            void 0 !== i.videoEncodeMode &&
              this.dataApi.update('video_adaptive_strategy', i.videoEncodeMode || 0),
            void 0 !== i.videoBitrate &&
              this.dataApi.update('video_max_encode_bitrate', i.videoBitrate || ''),
            void 0 !== i.recordType && this.dataApi.update('recordType', i.recordType || 0),
            i.isHostSpeaker && this.dataApi.update('isHostSpeaker'),
            void 0 !== i.videoQuality)
          ) {
            var o = i.videoQuality;
            o === v.CHAT_VIDEO_QUALITY_540P
              ? (o = v.CHAT_VIDEO_QUALITY_720P)
              : o === v.CHAT_VIDEO_QUALITY_720P && (o = v.CHAT_VIDEO_QUALITY_540P),
              this.dataApi.update('video_quality', o || 0);
          }
          return (
            r
              ? ((this.type = n.type),
                (this.channelId = n.channelId),
                (this.target = n.account),
                (this.calling = !0))
              : (this.log('rejectNetcall', n),
                this.packNetcallRecord({
                  type: n.type,
                  channelId: n.channelId,
                  isCaller: !1,
                  target: n.account,
                  recordType: 'rejectNetcall',
                })),
            (this.sessionMode = 'p2p'),
            this.nim.calleeAck(n).then(
              function () {
                if (r) return e.initSession({ beCalledInfo: n });
              },
              function (t) {
                throw (e.log(t), t);
              },
            )
          );
        }),
        (E.onCalleeAck = function (e) {
          if (!this.notCurrentChannelId(e))
            return e.accepted
              ? this.initSession({ type: e.type })
              : (this.log('netcallRejected', e),
                this.packNetcallRecord({
                  type: e.type,
                  channelId: e.channelId,
                  isCaller: !0,
                  target: e.account,
                  recordType: 'netcallRejected',
                }),
                this.resetWhenHangup(),
                void this.emit('callRejected', e));
        }),
        (E.onUserJoin = function (e) {
          this.log('onUserJoin ', e);
          var t = e.account,
            n = e.uid;
          !t && n && (e.account = t = this.getAccountWithUid(n)),
            t
              ? this.emitUserJoin(e)
              : ((this.needQueryAccountMap[n] = e),
                this.nim.queryAccountUidMap(this.channelName, [n]));
        }),
        (E.emitUserJoin = function (e) {
          var t = e.uid,
            n = e.isMeeting;
          (this.remoteStreamInfo[t] = e),
            this.dataApi.start({ uid: this.getUid() }),
            n
              ? this.emit('joinChannel', { type: e.type, uid: e.uid, account: e.account })
              : (this.callAccepted || (this.callAccepted = !0),
                this.emit('callAccepted', { type: e.type, account: e.account, uid: e.uid }));
        }),
        (E.onUserLeft = function (e) {
          var t = this,
            n = e.account,
            r = e.uid;
          e.isMeeting
            ? (!n && r && (e.account = this.getAccountWithUid(r)),
              this.emit('leaveChannel', { account: e.account }))
            : (this.log('on user left', e),
              this.calling &&
                setTimeout(function () {
                  (e.account = t.getAccountWithUid(e.uid)), t.onHangup(e);
                }, 1e3));
        }),
        (E.onNetcallControl = function (e) {
          this.emit('control', e);
        }),
        (E.onCalleeAckSync = function (e) {
          this.emit('callerAckSync', e), this.isCurrentChannelId(e) && this.resetWhenHangup();
        }),
        (E.onNotifyJoin = function (e) {
          var t = e.accountUidMap,
            n = this.needQueryAccountMap;
          for (var r in (this.parseAccountUidMap(t), t)) {
            var i = r,
              o = t[r];
            if (o in n) {
              var a = n[o];
              (a.account = i), this.emitUserJoin(a), delete n[o];
            }
          }
        }),
        (E.onHangup = function (e) {
          this.dataApi.send(),
            this.emit('hangup', e),
            this.isCurrentChannelId(e) && this.resetWhenHangup();
        }),
        (E.hangup = function () {
          var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).channelId;
          !e && this.calling && this.channelId && (e = this.channelId),
            e && (this.dataApi.send(), this.nim.hangup({ channelId: e })),
            e === this.channelId &&
              (this.isCaller &&
                !this.callAccepted &&
                (this.log('cancelNetcallBeforeAccept', { channelId: e }),
                this.packNetcallRecord({ recordType: 'cancelNetcallBeforeAccept' })),
              this.resetWhenHangup());
        }),
        (E.packNetcallRecord = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.recordType,
            n = d.exist(e.type) ? e.type : this.type,
            r = d.exist(e.channelId) ? e.channelId : this.channelId,
            i = d.exist(e.duration) ? e.duration : 0,
            o = d.exist(e.isCaller) ? e.isCaller : this.isCaller,
            a = d.exist(e.target) ? e.target : this.target,
            s = this.getAccount(),
            c = o ? s : a,
            u = o ? a : s,
            l = +new Date();
          this.nim.protocol.onMsg({
            content: {
              msg: {
                attach: JSON.stringify({
                  data: { calltype: n, channel: r, duration: i, ids: [s, a], time: l },
                  id: t,
                }),
                from: c,
                fromClientType: o ? 16 : 0,
                fromDeviceId: '',
                fromNick: '',
                idClient: d.guid(),
                idServer: d.guid(),
                scene: 0,
                time: l,
                to: u,
                type: 5,
              },
            },
          });
        }),
        (E.resetWhenHangup = function () {
          this.resetStatus(), this.signalInited && this.signal.stopSession();
        }),
        (E.control = function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = t.command,
            r = t.channelId;
          if ((r || (r = this.channelId), n && r))
            return (
              this.dataApi.update('call_control_type'),
              this.nim.netcallControl({ channelId: r, type: n }).catch(function (t) {
                throw (e.log(t), t);
              })
            );
        }),
        (E.setVideoViewSize = function (e) {
          return (
            this.dataApi.update('video_crop'),
            this.signalInited ? this.signal.setVideoViewSize(e) : this.rejectWithNoSignal()
          );
        }),
        (E.setVideoViewRemoteSize = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return this.signalInited
            ? (e.account && (e.id = this.getUidWithAccount(e.account)),
              this.signal.setVideoViewRemoteSize(e))
            : this.rejectWithNoSignal();
        }),
        (E.setVideoScale = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return this.signalInited
            ? (e.account && (e.id = this.getUidWithAccount(e.account)),
              this.signal.setVideoScale(e))
            : this.rejectWithNoSignal();
        }),
        (E.startLocalStream = function (e) {
          var t = this;
          if (
            (this.dataApi.update('display'),
            this.signalInited && !this.stream && this.localStreamInfo)
          ) {
            var n = e || this.container,
              r = this.localStreamInfo.port;
            (this.stream = new m({
              client: this,
              url: f.genStreamUrl(r),
              container: n,
              mirror: this.mirror,
            })),
              this.stream.on('resize', function (e) {
                t.emit('streamResize', e);
              }),
              this.stream.on('error', function (e) {
                t.emit('error', e);
              });
          }
        }),
        (E.stopLocalStream = function () {
          this.stream && (this.stream.destroy(), (this.stream = null));
        }),
        (E.startRemoteStream = function () {
          var e,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          'p2p' === this.sessionMode
            ? ((e = this.getUidWithAccount(this.target)),
              this.remoteContainer ||
                this.target ||
                this.nim.logger.error(
                  '不传参数且点对点模式实例化Netcall必须设置remoteContainer与target；传参数必须包含account，node',
                ),
              !this.getRemoteStream(e) &&
                this.remoteStreamInfo[e] &&
                this.addRemoteStream(this.remoteStreamInfo[e]))
            : ((e = t.uid || this.getUidWithAccount(t.account)),
              (t.node = s.element.n2node(t.node)),
              e && t.node
                ? this.addRemoteStream(this.remoteStreamInfo[e], t.node)
                : this.nim.logger.error(
                    '不传参数且点对点模式实例化Netcall必须设置remoteContainer与target；传参数必须包含account，node',
                  ));
        }),
        (E.stopRemoteStream = function (e) {
          return e ? this.removeRemoteStream(e) : this.removeRemoteStreams();
        }),
        (E.addRemoteStream = function (e, t) {
          var n = this,
            r = e.uid,
            i = e.port;
          this.remoteStreams || (this.remoteStreams = {});
          var o = this.remoteStreams[r];
          o && o.destroy(),
            (o = this.remoteStreams[r] = new m({
              client: this,
              isRemote: !0,
              url: f.genStreamUrl(i),
              container: t || this.remoteContainer,
              mirror: this.mirrorRemote,
            })).on('resize', function (e) {
              n.emit('remoteStreamResize', e);
            }),
            o.on('error', function (e) {
              n.emit('error', e);
            });
        }),
        (E.removeRemoteStreams = function () {
          var e = this;
          this.remoteStreams &&
            Object.keys(this.remoteStreams).forEach(function (t) {
              e.remoteStreams[t].destroy();
            }),
            (this.remoteStreams = {});
        }),
        (E.removeRemoteStream = function (e) {
          var t = this.getUidWithAccount(e);
          if (!this.remoteStreams[t]) {
            throw { code: 'accountNotMatch' };
          }
          this.remoteStreams[t].destroy();
        }),
        (E.getRemoteStream = function (e) {
          var t = this.getUidWithAccount(e);
          return this.remoteStreams && this.remoteStreams[t];
        }),
        (E.suspendLocalStream = function () {
          this.stream && this.stream.suspend();
        }),
        (E.resumeLocalStream = function () {
          this.stream && this.stream.resume();
        }),
        (E.suspendRemoteStream = function (e) {
          var t = this.getRemoteStream(e || this.target);
          t && t.suspend();
        }),
        (E.resumeRemoteStream = function (e) {
          var t = this.getRemoteStream(e || this.target);
          t && t.resume();
        }),
        (E.switchVideoToAudio = function () {
          var e = this;
          return this.signalInited
            ? (this.dataApi.update('switch_p2p_type'),
              this.signal.switchVideoToAudio().then(function () {
                e.type = v.NETCALL_TYPE_AUDIO;
              }))
            : this.rejectWithNoSignal();
        }),
        (E.switchAudioToVideo = function () {
          var e = this;
          return this.signalInited
            ? (this.dataApi.update('switch_p2p_type'),
              this.signal.switchAudioToVideo().then(function () {
                e.type = v.NETCALL_TYPE_VIDEO;
              }))
            : this.rejectWithNoSignal();
        }),
        (E.getDevicesOfType = function (e) {
          return this.signalInited ? this.signal.getDevicesOfType(e) : this.rejectWithNoSignal();
        }),
        (E.getStoredDevicesOfType = function (e) {
          if (this.signalInited)
            return (
              (e = +e) === v.DEVICE_TYPE_AUDIO_OUT_LOCAL && (e = v.DEVICE_TYPE_AUDIO_OUT_CHAT),
              this.signal.devicesMap[e]
            );
          this.rejectWithNoSignal();
        }),
        (E.hasDevicesOfType = function (e) {
          return this.getStoredDevicesOfType(e);
        }),
        (E.getStartedDeviceOfType = function (e) {
          return this.signalInited ? this.signal.deviceMap[e] : this.rejectWithNoSignal();
        }),
        (E.hasStartedDeviceOfType = function (e) {
          return this.getStartedDeviceOfType(e);
        }),
        (E.stopDevice = function (e) {
          return this.signalInited
            ? this.hasStartedDeviceOfType(e)
              ? this.signal.stopDevice(e)
              : Promise.resolve()
            : this.rejectWithNoSignal();
        }),
        (E.startDevice = function (e) {
          var t = e.type,
            n = e.device;
          if (this.signalInited) {
            if (d.exist(t) && !n) {
              if (this.hasStartedDeviceOfType(t)) return Promise.resolve();
              this.hasDevicesOfType(t) && (n = e.device = this.getStoredDevicesOfType(t)[0]);
            }
            return n
              ? this.signal.startDevice(e)
              : Promise.reject((0, r.default)({ type: 'noDevice' }, e));
          }
          return this.rejectWithNoSignal();
        }),
        (E.setSessionVideoQuality = function (e) {
          if (this.signalInited) {
            if (void 0 !== e) {
              var t = e;
              t === v.CHAT_VIDEO_QUALITY_540P
                ? (t = v.CHAT_VIDEO_QUALITY_720P)
                : t === v.CHAT_VIDEO_QUALITY_720P && (t = v.CHAT_VIDEO_QUALITY_540P),
                this.dataApi.update('video_quality', t || 0);
            }
            return this.signal.setVideoQuality(e);
          }
          return this.rejectWithNoSignal();
        }),
        (E.setSessionVideoFrameRate = function (e) {
          return this.signalInited
            ? (this.dataApi.update('fps', void 0 !== e ? +e + 1 : 0),
              this.signal.setVideoFrameRate(e))
            : this.rejectWithNoSignal();
        }),
        (E.setSessionVideoBitrate = function (e) {
          return this.signalInited
            ? (this.dataApi.update('video_max_encode_bitrate', e || ''),
              this.signal.setVideoBitrate(e))
            : this.rejectWithNoSignal();
        }),
        (E.setCaptureVolume = function (e) {
          return (
            (e = void 0 === e ? 255 : e).constructor === String && (e = '0' == e ? 0 : +e || 255),
            this.signalInited ? this.signal.setCaptureVolume(e) : this.rejectWithNoSignal()
          );
        }),
        (E.setPlayVolume = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          /(Number|String)/.test(e.constructor) && (e = { volume: e });
          var t = e.volume;
          return (
            (t = void 0 === t ? 255 : t),
            this.signalInited ? this.signal.setPlayVolume(t) : this.rejectWithNoSignal()
          );
        }),
        (E.netDetect = function (e, t) {
          return (
            this.dataApi.update({ key: 'net_detect' }),
            (e = void 0 === e ? v.NETDETECT_AUDIO : e),
            (t = t || v.CHAT_VIDEO_QUALITY_480P),
            this.signalInited
              ? this.signal.netDetect({ appKey: this.nim.options.appKey, type: e, quality: t })
              : this.rejectWithNoSignal()
          );
        }),
        (E.uploadLog = function () {
          var e = this;
          this.signalInited &&
            this.nim.getSimpleNosToken().then(
              function (t) {
                e.signal.uploadLog(t);
              },
              function (t) {
                e.log(t);
              },
            );
        }),
        (E.onLogUploaded = function (e) {
          this.nim.uploadSdkLogUrl(e);
        }),
        (E.log = function () {
          var e = this.nim.logger;
          e.log.apply(e, arguments);
        }),
        (E.info = function () {
          var e = this.nim.logger;
          e.info.apply(e, arguments);
        }),
        (E.destroy = function () {}),
        (E = Object.assign(E, c.default)),
        (e.exports = y),
        n(695);
    },
    function (e, t, n) {
      'use strict';
      var r = {},
        i = (r.create3DContext = function (e, t) {
          for (
            var n = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'], r = null, i = 0;
            i < n.length;
            ++i
          ) {
            try {
              r = e.getContext(n[i], t);
            } catch (e) {}
            if (r) {
              console.log('use', n[i]);
              break;
            }
          }
          return r;
        });
      r.initShaders = function (e, t, n) {
        var r = o(e, t, n);
        return r
          ? (e.useProgram(r), (e.program = r), !0)
          : (console.log('Failed to create program'), !1);
      };
      var o = (r.createProgram = function (e, t, n) {
          var r = a(e, e.VERTEX_SHADER, t),
            i = a(e, e.FRAGMENT_SHADER, n);
          if (!r || !i) return null;
          var o = e.createProgram();
          if (!o) return null;
          if (
            (e.attachShader(o, r),
            e.attachShader(o, i),
            e.linkProgram(o),
            !e.getProgramParameter(o, e.LINK_STATUS))
          ) {
            var s = e.getProgramInfoLog(o);
            return (
              console.log('Failed to link program: ' + s),
              e.deleteProgram(o),
              e.deleteShader(i),
              e.deleteShader(r),
              null
            );
          }
          return o;
        }),
        a = (r.loadShader = function (e, t, n) {
          var r = e.createShader(t);
          return null == r
            ? (console.log('unable to create shader'), null)
            : (e.shaderSource(r, n), e.compileShader(r), r);
        });
      (r.getWebGLContext = function (e, t) {
        var n = i(e);
        return n || null;
      }),
        window.requestAnimationFrame ||
          (window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (e) {
              window.setTimeout(e, 1e3 / 60);
            }),
        window.cancelAnimationFrame ||
          (window.cancelAnimationFrame =
            window.cancelRequestAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.msCancelAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.clearTimeout),
        (e.exports = r);
    },
    ,
    ,
    ,
    function (e, t, n) {
      'use strict';
      var r,
        i = n(65),
        o = (r = i) && r.__esModule ? r : { default: r };
      var a = n(690),
        s = n(416),
        c = a.prototype,
        u = void 0;
      (c.setUtil = function (e) {
        u = e;
      }),
        (c.createChannel = function (e) {
          return (
            u.verifyOptions(e, 'channelName'),
            (e.custom = e.custom || ''),
            this.dataApi.update('meeting'),
            (e.webrtcEnable = !0),
            this.nim.createChannel(e)
          );
        }),
        (c.joinChannel = function (e) {
          var t = this;
          this.dataApi.update('meeting'), u.verifyOptions(e, 'channelName type');
          var n = e.type,
            r = e.sessionConfig,
            i = void 0 === r ? {} : r;
          if (
            ((i.bypassRtmp = e.liveEnable),
            (i.customLayout = e.sessionConfig.layout || e.sessionConfig.customLayout),
            (i.recordType = e.sessionConfig.recordType),
            (i.isHostSpeaker = e.sessionConfig.isHostSpeaker),
            e.liveEnable &&
              this.dataApi.update('bypass', void 0 !== i.splitMode ? +i.splitMode + 1 : 0),
            i.highAudio && this.dataApi.update('hd_audio'),
            void 0 !== i.videoFrameRate &&
              this.dataApi.update('fps', 0 == +i.videoFrameRate ? 0 : +i.videoFrameRate + 1),
            void 0 !== i.videoEncodeMode &&
              this.dataApi.update('video_adaptive_strategy', i.videoEncodeMode || 0),
            void 0 !== i.videoBitrate &&
              this.dataApi.update('video_max_encode_bitrate', i.videoBitrate || ''),
            void 0 !== i.recordType && this.dataApi.update('recordType', i.recordType || 0),
            i.isHostSpeaker && this.dataApi.update('isHostSpeaker'),
            void 0 !== i.videoQuality)
          ) {
            var a = i.videoQuality;
            a === s.CHAT_VIDEO_QUALITY_540P
              ? (a = s.CHAT_VIDEO_QUALITY_720P)
              : a === s.CHAT_VIDEO_QUALITY_720P && (a = s.CHAT_VIDEO_QUALITY_540P),
              this.dataApi.update('video_quality', a || 0);
          }
          if (
            (i.ans && this.dataApi.update({ key: 'ans' }),
            i.aec && this.dataApi.update({ key: 'aec' }),
            this.signalInited)
          )
            return this.nim
              .joinChannel({
                channelName: e.channelName,
                liveEnable: e.liveEnable,
                webrtcEnable: !0,
              })
              .then(function (r) {
                return (
                  (r.serverInfo = JSON.parse(r.serverMap)),
                  (t.callerInfo = r),
                  (t.channelId = r.channelId),
                  (t.channelName = e.channelName),
                  (t.sessionMode = 'meeting'),
                  t.parseAccountUidMap(r.accountUidMap),
                  (r.uid = t.getUidWithAccount(t.account)),
                  t.dataApi.start({ uid: r.uid }),
                  t.signal
                    .startSession((0, o.default)({}, r, { type: n }, e.sessionConfig), !0)
                    .then(function (e) {
                      return (e.custom = r.custom), e;
                    })
                );
              });
          return Promise.reject({ code: 'noConnection' });
        }),
        (c.leaveChannel = function () {
          if (this.signalInited) return this.dataApi.send(), this.signal.stopSession();
          return Promise.reject({ code: 'noConnection' });
        }),
        (c.changeRoleToPlayer = function () {
          return this.dataApi.update('actor'), this.signal.setRole(0);
        }),
        (c.changeRoleToAudience = function () {
          return this.signal.setRole(1);
        }),
        (c.updateRtmpUrl = function (e) {
          return this.signal.updateRtmpUrl(e);
        });
    },
    function (e, t) {
      e.exports =
        "'use strict';\n\n/* 该web worker 职能为向 websocket 发送指令及数据*/\n\nvar that = {};\n\nthat.init = function (data) {\n  if (!that.socket) {\n    var url = that.url = data.info.url;\n    var socket = that.socket = new WebSocket(url);\n    socket.onopen = function (event) {\n      postMessage({\n        cmd: 'open'\n      });\n    };\n    socket.onmessage = function (event) {\n      postMessage({\n        cmd: 'message',\n        data: event.data\n      }, [event.data]);\n    };\n    socket.onerror = function (event) {\n      postMessage({\n        cmd: 'error'\n      });\n    };\n    socket.onclose = function (event) {\n      postMessage({ // web 端被动结束\n        cmd: 'close'\n      });\n    };\n    socket.binaryType = 'arraybuffer';\n  }\n};\n\nthat.close = function () {\n  if (that.socket) {\n    that.socket.onopen = null;\n    that.socket.onmessage = null;\n    that.socket.onerror = null;\n    that.socket.onclose = null;\n    that.socket.close(); // 结束socket\n    that.socket = null;\n  }\n  self.close(); // 结束worker，web端主动\n};\n\nthat.send = function (obj) {\n  if (that.socket && that.socket.readyState === WebSocket.OPEN) {\n    that.socket.send(JSON.stringify(obj));\n  }\n};\n// 侦听主线程的worker消息\nself.addEventListener('message', function (event) {\n  var data = event.data;\n  switch (data.cmd) {\n    case 'init':\n      // worker第一步2\n      that.init(data);\n      break;\n    case 'close':\n      // web发起，结束worker及相应socket\n      that.send(data.info);\n      that.close(data);\n      break;\n    case 'msg':\n      that.send(data.info);\n      break;\n  }\n});";
    },
    function (e, t) {
      e.exports =
        'precision mediump float;\nuniform sampler2D Ytex, Utex, Vtex;\nvarying vec2 v_texCoord;\nvoid main(void) {\n  float r, g, b, y, u, v;\n  vec4 yuv, rgb;\n  y = texture2D(Ytex, v_texCoord).r;\n  u = texture2D(Utex, v_texCoord).r;\n  v = texture2D(Vtex, v_texCoord).r;\n  yuv = vec4(y, u, v, 1.0);\n  yuv = yuv - vec4(0.0625, 0.5, 0.5, 0.0);\n  yuv = mat4(\n    1.1643, 0.0, 0.0, 0.0,\n    0.0, 1.0, 0.0, 0.0,\n    0.0, 0.0, 1.0, 0.0,\n    0.0, 0.0, 0.0, 1.0\n  ) * yuv;\n  rgb = mat4(\n    1.0, 1.0, 1.0, 0.0,\n    0.0, -0.3917, 2.017, 0.0,\n    1.5958, -0.8129, 0.0, 0.0,\n    0.0, 0.0, 0.0, 1.0\n  ) * yuv;\n  gl_FragColor = rgb;\n  // y = 1.1643 * (y - 0.0625);\n  // u = u - 0.5;\n  // v = v - 0.5;\n  // r = y + 1.5958 * v;\n  // g = y - 0.39173 * u - 0.81290 * v;\n  // b = y + 2.017 * u;\n  // gl_FragColor = vec4(r, g, b, 1.0);\n}\n';
    },
    function (e, t) {
      e.exports =
        'attribute vec4 a_position;\nattribute vec2 a_texCoord;\nvarying vec2 v_texCoord;\nvoid main () {\n  gl_Position = a_position;\n  v_texCoord = a_texCoord;\n}\n';
    },
    function (e, t, n) {
      'use strict';
      var r = a(n(1)),
        i = a(n(4)),
        o = a(n(3));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var s = void 0,
        c = n(12),
        u = n(689),
        d = n(696),
        l = (function (e) {
          function t(e) {
            (0, r.default)(this, t);
            var n = (0, i.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return s.merge(n, e), n.init(), n;
          }
          return (0, o.default)(t, e), t;
        })(c);
      l.install = function (e) {
        s = e.util;
      };
      var f = l.prototype;
      (f.init = function () {
        this.reset(),
          this.initRender(),
          this.initWorker(),
          window.addEventListener('beforeunload', this.destroy.bind(this));
      }),
        (f.initRender = function () {
          var e = this;
          (this.render = new u({
            client: this.client,
            stream: this,
            isRemote: this.isRemote,
            container: this.container,
            mirror: this.mirror,
          })),
            this.render.on('resize', function (t) {
              e.emit('resize', t);
            }),
            this.render.on('error', function (t) {
              e.emit('error', t);
            });
        }),
        (f.reset = function () {
          (this.currFrameCount = 0),
            (this.width = 0),
            (this.height = 0),
            (this.timetag = 0),
            (this.worker = null),
            (this.render = null);
        }),
        (f.initWorker = function () {
          var e = this,
            t = new Blob([d], { type: 'application/javascript' });
          (this.worker = new Worker(URL.createObjectURL(t))).addEventListener('message', function (
            t,
          ) {
            var n = t.data;
            switch (n.cmd) {
              case 'open':
                e.onOpen();
                break;
              case 'error':
                e.onError();
                break;
              case 'close':
                e.onClose();
                break;
              case 'message':
                e.onMessage(n);
            }
          }),
            this.sendWorkerCmd({ cmd: 'init', info: { url: this.url } });
        }),
        (f.destroyWorker = function () {
          this.worker && this.worker.terminate();
        }),
        (f.sendWorkerCmd = function (e) {
          this.worker && this.worker.postMessage(e);
        }),
        (f.getName = function () {
          return (this.isRemote ? 'remote ' : '') + 'stream socket ' + this.url;
        }),
        (f.onOpen = function (e) {
          var t = this.getName() + ' open -> stream.js';
          this.logToConsole(t), this.logToPC(t);
        }),
        (f.startStatisticsTimer = function () {
          var e = this;
          this.statisticsTimer = setInterval(function () {
            var t = e.currFrameCount - e.lastFrameCount;
            e.sendWorkerCmd({
              cmd: 'msg',
              info: {
                cmd: 'statistics',
                info: { lastFrameCount: e.lastFrameCount, fps: t, latency: e.latency },
              },
            }),
              (e.lastFrameCount = e.currFrameCount),
              (e.latency = 0);
          }, 1e3);
        }),
        (f.onError = function (e) {
          if (!this.destroyed) {
            var t = this.getName() + ' error -> stream.js';
            this.logToConsole(t), this.logToPC(t), this.destroy();
          }
        }),
        (f.onClose = function (e) {
          this.destroy(e);
        }),
        (f.onMessage = function (e) {
          var t = e.data;
          if (!this.destroyed && t instanceof ArrayBuffer) {
            var n = t.byteLength;
            this.render && !this.suspended && this.renderFrame(t, n);
          }
        }),
        (f.renderFrame = function (e, t) {
          var n = new DataView(e),
            r = (this.width = n.getUint32(0)),
            i = (this.height = n.getUint32(4)),
            o = n.getUint32(8),
            a = n.getUint32(12);
          this.timetag = 1e3 * o + a;
          var s = r * i,
            c = s / 4,
            u = s / 4;
          if (16 + s + c + u !== t) {
            var d =
              'yuv数据长度不匹配: total ' +
              t +
              ', meta 16, width ' +
              r +
              ', height ' +
              i +
              ', yLength ' +
              s +
              ' uLength ' +
              c +
              ' vLength ' +
              u;
            return this.logToConsole(d), void this.logToPC(d);
          }
          this.currFrameCount++,
            this.scheduleRender({
              id: this.currFrameCount,
              width: r,
              height: i,
              y: new Uint8Array(e, 16, s),
              u: new Uint8Array(e, 16 + s, c),
              v: new Uint8Array(e, 16 + s + c),
            });
        }),
        (f.scheduleRender = function (e) {
          this.render && !this.suspended && this.render.drawImage(e);
        }),
        (f.suspend = function () {
          this.suspended = !0;
        }),
        (f.resume = function () {
          this.suspended = !1;
        }),
        (f.destroy = function (e) {
          this.sendWorkerCmd({ cmd: 'close', info: { cmd_type: 'on_clear_media' } }),
            (this.destroyed = !0),
            this.render && this.render.destroy(),
            this.reset();
          var t = e && e.constructor === Object ? e.code : '',
            n = this.getName() + ' destroy: code - ' + t + ' -> stream.js';
          this.logToConsole(n), this.logToPC(n);
        }),
        (f.logToConsole = function () {
          var e = this.client;
          e && e.log.apply(e, arguments);
        }),
        (f.logToPC = function () {
          var e = this.client;
          if (e) {
            var t = e.signal;
            t && t.log.apply(t, arguments);
          }
        }),
        (e.exports = l);
    },
    function (e, t, n) {
      'use strict';
      var r = {
        sortDevices: function (e) {
          e &&
            e.length > 1 &&
            e.sort(function (e, t) {
              var n = -1 !== e.name.toLowerCase().indexOf('virtual'),
                r = -1 !== e.path.toLowerCase().indexOf('virtual'),
                i = -1 !== t.name.toLowerCase().indexOf('virtual'),
                o = -1 !== t.path.toLowerCase().indexOf('virtual');
              return r ? 1 : o ? -1 : n && i ? 0 : n ? 1 : i ? -1 : 0;
            });
        },
      };
      e.exports = r;
    },
    function (e, t, n) {
      'use strict';
      var r = s(n(65)),
        i = s(n(1)),
        o = s(n(4)),
        a = s(n(3));
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var c = void 0,
        u = n(12),
        d = n(416),
        l = n(700),
        f = n(251),
        p = (function (e) {
          function t(e) {
            (0, i.default)(this, t);
            var n = (0, o.default)(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return (
              c.merge(n, e),
              n.reset(),
              window.addEventListener('beforeunload', function () {
                n.destroy();
              }),
              n
            );
          }
          return (0, a.default)(t, e), t;
        })(u);
      p.install = function (e) {
        c = e.util;
      };
      var h = p.prototype;
      (h.reset = function () {
        (this.inited = !1),
          (this.isMeeting = !1),
          (this.hasInvokePC = !1),
          (this.cmdId = 1),
          (this.cmdTasksMap = {}),
          (this.streamEncryptConfig = {}),
          (this.sessionStopped = !1),
          (this.devicesMap = {}),
          (this.deviceMap = {}),
          this.initSocket(),
          (this.audioGroup = { aec: 1, ns: 1, vad: 1, awc: 0 });
      }),
        (h.initSocket = function () {
          var e = (this.socket = new WebSocket(this.url));
          (e.onopen = this.onOpen.bind(this)),
            (e.onmessage = this.onMessage.bind(this)),
            (e.onerror = this.onError.bind(this)),
            (e.onclose = this.onClose.bind(this));
        }),
        (h.onOpen = function (e) {
          var t = this,
            n = this.heartbeat ? 1 : 0,
            r = this.getName() + ' open -> signal.js';
          (this.inited = !0),
            this.logToConsole(r),
            this.log(r),
            this.emit('open'),
            this.sendCmd({
              type: 'on_init',
              info: {
                account: this.account,
                type: this.kickLast ? 1 : 0,
                heartbeat: n,
                ext: JSON.stringify({
                  kibana_server: this.kibanaServer,
                  statistic_server: this.statisticServer,
                  report_global_server: this.reportGlobalServer,
                }),
                app_key: this.appkey,
              },
            })
              .then(this.onInit.bind(this))
              .catch(function (e) {
                t.logToConsole('init error -> signal.js', e), t.emit('initError', e);
              });
        }),
        (h.onError = function (e) {
          if (!this.destroyed && this.inited) {
            var t = this.getName() + ' error -> signal.js';
            this.logToConsole(t);
          }
        }),
        (h.onClose = function (e) {
          var t = this;
          if (!this.destroyed)
            if (this.inited) {
              var n = this.getName() + ' close -> signal.js : ' + e.code;
              this.logToConsole(n), (this.inited = !1), this.emit('close');
            } else {
              this.hasInvokePC || ((this.hasInvokePC = !0), this.invokePC());
              var r = this.backoff;
              r || (r = this.backoff = new f({ min: 1e3, max: 2e3 })),
                3 === r.attempts
                  ? this.emit('initError', { code: 'noPC' })
                  : setTimeout(function () {
                      t.initSocket();
                    }, r.duration());
            }
        }),
        (h.invokePC = function () {
          var e = document.createElement('iframe');
          (e.src = 'NIMWebAgent:invokePC'),
            document.body.appendChild(e),
            setTimeout(function () {
              e.parentNode && e.parentNode.removeChild(e);
            }, 0);
        }),
        (h.onMessage = function (e) {
          if (!this.destroyed) {
            var t = JSON.parse(e.data),
              n = t.cmd_id,
              r = t.cmd_type,
              i = t.cmd_info;
            this.shouldPrintMsg({ cmdType: r, cmdInfo: i }) &&
              'on_heartbeat_notify' !== r &&
              this.client.info('signal socket msg', t);
            var o = this.cmdTasksMap[n];
            if (o) delete this.cmdTasksMap[n], 200 === i.code ? o.resolve(i) : o.reject(i);
            else
              switch (r) {
                case 'device_status_notify':
                  this.onDeviceStatus(i);
                  break;
                case 'session_notify':
                  this.onSessionNotify(i);
                  break;
                case 'upload_log_notify':
                  this.onUploadLogNotify(i);
              }
          }
        }),
        (h.shouldPrintMsg = function (e) {
          var t = e.cmdType,
            n = e.cmdInfo;
          return 'session_notify' !== t || (!n.audio_volume && !n.net && !n.static_info);
        }),
        (h.sendCmd = function (e) {
          var t = this;
          return new Promise(function (n, i) {
            var o = 'on_heartbeat' === e.type ? 0 : t.cmdId++,
              a = (0, r.default)({ cmd_id: o, cmd_type: e.type, cmd_info: e.info || {} }, e.extra);
            t.socket && t.socket.readyState === WebSocket.OPEN
              ? ('on_heartbeat' !== e.type && t.logToConsole('send signal cmd', a),
                (t.cmdTasksMap[o] = { resolve: n, reject: i }),
                t.socket.send(JSON.stringify(a)))
              : i({ code: 'noConnection' });
          });
        }),
        (h.onInit = function (e) {
          var t = e.code,
            n = e.version,
            r = e.port,
            i = e.device_list_notify;
          200 === t &&
            (i.forEach(this.onDevices, this),
            this.emit('init', { port: r, version: n, code: t }),
            this.startHeartBeat());
        }),
        (h.startHeartBeat = function () {
          var e = this;
          this.heartBeatTimer && this.stopHeartBeat(),
            (this.heartBeatTimer = setInterval(function () {
              e.sendCmd({ type: 'on_heartbeat', info: {} }).catch(function () {
                e.emit('heartBeatError', { type: 'heartbeatError' });
              });
            }, 15e3));
        }),
        (h.stopHeartBeat = function () {
          clearInterval(this.heartBeatTimer), (this.heartBeatTimer = null);
        }),
        (h.setVideoViewSize = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = parseInt(e.width) || 0,
            n = parseInt(e.height) || 0,
            r = void 0 === e.cut ? 1 : ~~e.cut;
          return this.sendCmd({
            type: 'on_capture_video_size',
            info: { width: t, height: n, cut: r },
          });
        }),
        (h.setVideoViewRemoteSize = function (e) {
          var t = parseInt(e.width) || 0,
            n = parseInt(e.height) || 0,
            r = e.id || 0,
            i = void 0 === e.cut ? 1 : ~~e.cut;
          return this.sendCmd({
            type: 'on_rec_video_size',
            info: { id: r, width: t, height: n, cut: i },
          });
        }),
        (h.setVideoScale = function (e) {
          var t = e.type,
            n = void 0 === t ? d.CHAT_VIDEO_SCALE_None : t,
            r = e.id;
          return this.sendCmd({ type: 'on_send_video_Scale', info: { id: r, type: n } });
        }),
        (h.getDevicesOfType = function (e) {
          var t = this;
          return this.sendCmd({ type: 'on_get_devices', info: { type: e } })
            .then(function (e) {
              return (e.devices = e.devices || []), t.onDevices(e), e;
            })
            .catch(function (e) {
              throw e;
            });
        }),
        (h.onDevices = function (e) {
          var t = e.type,
            n = e.devices;
          if (n && n.length) {
            l.sortDevices(n);
            var r = d.getDeviceTypeStr(t);
            r &&
              ((this.devicesMap[t] = n), this.emit('devices', { type: t, typeStr: r, devices: n }));
          }
        }),
        (h.startAllDevices = function () {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = t.videoQuality,
            r = t.audioOutType;
          Object.keys(this.devicesMap).forEach(function (t) {
            (t = +t) === d.DEVICE_TYPE_AUDIO_OUT_CHAT &&
              r === d.DEVICE_TYPE_AUDIO_OUT_LOCAL &&
              (t = r);
            var i = e.devicesMap[t];
            e.startDevice({ device: i[0], type: t, videoQuality: n });
          });
        }),
        (h.startDevice = function (e) {
          var t = this,
            n = e.device,
            r = e.type,
            i = e.width,
            o = e.height;
          if (n) {
            var a = { type: (r = +r), path: n.path };
            return (
              r === d.DEVICE_TYPE_VIDEO &&
                ((a.width = parseInt(i) || 0), (a.height = parseInt(o) || 0)),
              (this.deviceMap[r] = n),
              this.sendCmd({ type: 'on_start_device', info: a }).catch(function () {
                throw (delete t.deviceMap[r], a);
              })
            );
          }
        }),
        (h.stopDevice = function (e) {
          var t = this,
            n = this.deviceMap[e];
          return (
            delete this.deviceMap[e],
            this.sendCmd({ type: 'on_stop_device', info: { type: e } }).catch(function () {
              t.deviceMap[e] = n;
            })
          );
        }),
        (h.onDeviceStatus = function (e) {
          var t = e.type,
            n = e.status,
            i = 1 == (1 & n),
            o = 4 == (4 & n),
            a = 16 == (16 & n);
          8 == (8 & n) &&
            ((this.deviceMap[t] = e),
            this.emit('deviceStatus', (0, r.default)({}, e, { status: 'started' }))),
            a &&
              (delete this.deviceMap[t],
              this.emit('deviceStatus', (0, r.default)({}, e, { status: 'stopped' }))),
            o &&
              ((this.deviceMap[t] = e),
              this.emit('deviceStatus', (0, r.default)({}, e, { status: 'reset' }))),
            i && this.emit('deviceStatus', (0, r.default)({}, e, { status: 'change' }));
        }),
        (h.startSession = function (e, t) {
          var n = this;
          this.sessionStopped = !1;
          var r = c.guid();
          this.sessionId = r;
          var i = e.type;
          this.type = i;
          var o = null;
          return (
            console.log('开始会话: ', this.streamEncryptConfig),
            (o =
              this.streamEncryptConfig.streamEncryptType &&
              this.streamEncryptConfig.streamEncryptToken
                ? {
                    id: e.uid,
                    cid: e.channelId,
                    type: i,
                    p2p_connect: 1,
                    stream_encrypt_type: this.streamEncryptConfig.streamEncryptType,
                    stream_encrypt_token: this.streamEncryptConfig.streamEncryptToken,
                    dispatch: e.serverMap,
                    config: e.clientConfig,
                    v_encode_mode: this.normalizeVideoEncodeMode(e.videoEncodeMode),
                    video_quality: this.normalizeVideoQuality(e.videoQuality),
                    video_record: e.recordVideo ? 1 : 0,
                    record: e.recordAudio ? 1 : 0,
                    high_rate: e.highAudio ? 1 : 0,
                    record_type: e.recordType,
                    r_host_speaker: e.isHostSpeaker ? 1 : 0,
                    frame_rate: this.normalizeVideoFrameRate(e.videoFrameRate),
                    max_video_rate: this.normalizeVideoBitrate(e.videoBitrate),
                    custom_layout: e.customLayout,
                  }
                : {
                    id: e.uid,
                    cid: e.channelId,
                    type: i,
                    p2p_connect: 1,
                    dispatch: e.serverMap,
                    config: e.clientConfig,
                    v_encode_mode: this.normalizeVideoEncodeMode(e.videoEncodeMode),
                    video_quality: this.normalizeVideoQuality(e.videoQuality),
                    video_record: e.recordVideo ? 1 : 0,
                    record: e.recordAudio ? 1 : 0,
                    high_rate: e.highAudio ? 1 : 0,
                    record_type: e.recordType,
                    r_host_speaker: e.isHostSpeaker ? 1 : 0,
                    frame_rate: this.normalizeVideoFrameRate(e.videoFrameRate),
                    max_video_rate: this.normalizeVideoBitrate(e.videoBitrate),
                    custom_layout: e.customLayout,
                  }),
            console.log('pcagent info', o),
            t &&
              ((o.meeting_mode = 1),
              (o.bypass_rtmp = e.bypassRtmp ? 1 : 0),
              (o.rtmp_url = e.rtmpUrl || ''),
              (o.rtmp_record = e.rtmpRecord ? 1 : 0),
              (o.split_mode = e.splitMode || 0),
              (o.single_record = e.singleRecord || 0)),
            o.dispatch &&
              o.dispatch.constructor !== String &&
              (o.dispatch = JSON.stringify(o.dispatch)),
            this.sendCmd({ type: 'on_start_chat', info: o, extra: { session_id: r } }).then(
              function (r) {
                var i = r.login,
                  o = r.error;
                if (o) throw o;
                return (
                  (n.isMeeting = t),
                  void 0 !== e.ns && n.audioControl({ ns: e.ns }),
                  void 0 !== e.vad && n.audioControl({ vad: e.vad }),
                  void 0 !== e.aec && n.audioControl({ aec: e.aec }),
                  { login: i }
                );
              },
            )
          );
        }),
        (h.stopSession = function () {
          return this.sessionStopped
            ? Promise.resolve()
            : ((this.sessionStopped = !0),
              (this.isMeeting = !1),
              this.sendCmd({ type: 'on_stop_chat' }));
        }),
        (h.clear = function () {
          this.sendCmd({ type: 'on_clear' });
        }),
        (h.switchVideoToAudio = function () {
          return this.sendCmd({ type: 'on_set_chat_mode', info: { type: d.NETCALL_TYPE_AUDIO } });
        }),
        (h.switchAudioToVideo = function () {
          return this.sendCmd({ type: 'on_set_chat_mode', info: { type: d.NETCALL_TYPE_VIDEO } });
        }),
        (h.logToConsole = function () {
          var e = this.client;
          e && e.log.apply(e, arguments);
        }),
        (h.log = function (e) {
          e && this.doLog({ msg: e, level: 3 });
        }),
        (h.warn = function (e) {
          e && this.doLog({ msg: e, level: 2 });
        }),
        (h.err = function (e) {
          e && this.doLog({ msg: e, level: 1 });
        }),
        (h.doLog = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.msg,
            n = e.level;
          return this.sendCmd({
            type: 'on_log',
            info: { type: n, content: '' + t },
          }).catch(function () {});
        }),
        (h.uploadLog = function (e) {
          var t = e.bucket,
            n = e.objectName,
            r = e.token;
          return this.sendCmd({
            type: 'on_upload_log',
            info: { nos_bucket: t, nos_object: n, nos_header_token: r },
          }).catch(function () {});
        }),
        (h.normalizeVideoEncodeMode = function (e) {
          return parseInt(e) || d.CHAT_VIDEO_ENCODEMODE_NORMAL;
        }),
        (h.normalizeVideoQuality = function (e) {
          return parseInt(e) || d.CHAT_VIDEO_QUALITY_480P;
        }),
        (h.setVideoQuality = function (e) {
          return this.sendCmd({
            type: 'on_set_video_quality',
            info: { type: this.normalizeVideoQuality(e) },
          });
        }),
        (h.normalizeVideoFrameRate = function (e) {
          return parseInt(e) || d.CHAT_VIDEO_FRAME_RATE_NORMAL;
        }),
        (h.setVideoFrameRate = function (e) {
          return this.sendCmd({
            type: 'on_set_video_frame_rate',
            info: { type: this.normalizeVideoFrameRate(e) },
          });
        }),
        (h.normalizeVideoBitrate = function (e) {
          return parseInt(e) || 0;
        }),
        (h.setVideoBitrate = function (e) {
          return this.sendCmd({
            type: 'on_set_video_bitrate',
            info: { code: this.normalizeVideoBitrate(e) },
          });
        }),
        (h.netDetect = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.appKey,
            n = e.type,
            r = e.quality,
            i = void 0 === r ? 0 : r;
          return this.sendCmd({ type: 'on_net_detect', info: { app_key: t, type: n, quality: i } });
        }),
        (h.normalizeVolume = function (e) {
          return (
            (e = +e),
            (c.isNumber(e) && !isNaN(e)) || (e = 255),
            e < 0 && (e = 0),
            e > 255 && (e = 255),
            e
          );
        }),
        (h.setCaptureVolume = function (e) {
          return (
            (e = this.normalizeVolume(e)),
            this.sendCmd({ type: 'on_capture_volume', info: { status: e } })
          );
        }),
        (h.setPlayVolume = function (e) {
          return (
            (e = this.normalizeVolume(e)),
            this.sendCmd({ type: 'on_play_volume', info: { status: e } })
          );
        }),
        (h.setRole = function (e) {
          return this.sendCmd({ type: 'on_set_viewer', info: { status: e } });
        }),
        (h.setAudioBlack = function (e, t) {
          return this.sendCmd({ type: 'on_set_audio_black', info: { id: e, status: t } });
        }),
        (h.setVideoBlack = function (e, t) {
          return this.sendCmd({ type: 'on_set_video_black', info: { id: e, status: t } });
        }),
        (h.updateRtmpUrl = function (e) {
          return this.sendCmd({ type: 'on_update_rtmp_url', info: { content: e } });
        }),
        (h.startRecordMp4 = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.path,
            n = e.id,
            r = void 0 === n ? '' : n,
            i = e.aac,
            o = void 0 !== i && i,
            a = e.recode,
            s = void 0 === a || a,
            c = e.width,
            u = void 0 === c ? 0 : c,
            d = e.height,
            l = void 0 === d ? 0 : d;
          return (
            console.log('startRecordMp4', o, s, u, l),
            this.sendCmd({
              type: 'on_record_mp4',
              info: {
                path: t,
                id: r,
                mp4_audio: ~~o,
                mp4_recode: !!s,
                mp4_width: +u,
                mp4_height: +l,
              },
            })
          );
        }),
        (h.stopRecordMp4 = function (e) {
          var t = e.id,
            n = void 0 === t ? 0 : t;
          return this.sendCmd({ type: 'on_stop_record_mp4', info: { id: n } });
        }),
        (h.startRecordAac = function (e) {
          var t = e.path;
          return this.sendCmd({ type: 'on_record_aac', info: { path: t } });
        }),
        (h.stopRecordAac = function () {
          return this.sendCmd({ type: 'on_stop_record_aac', info: {} });
        }),
        (h.onSessionNotify = function (e) {
          e &&
            (e.user_joined
              ? (console.log('onSessionNotify ', e),
                this.emit('userJoined', {
                  uid: e.user_joined.id,
                  port: e.user_joined.port,
                  type: this.type,
                  isMeeting: this.isMeeting,
                }))
              : e.user_left
              ? this.emit('userLeft', {
                  uid: e.user_left.id,
                  type: e.user_left.status,
                  isMeeting: this.isMeeting,
                })
              : e.net
              ? this.emit('netStatus', e.net)
              : e.static_info
              ? this.emit('statistics', e.static_info)
              : e.audio_volume
              ? this.emit('audioVolume', e.audio_volume)
              : e.error
              ? this.emit('error', e.error)
              : e.mp4_start
              ? this.emit('recordMp4', e.mp4_start, 'start')
              : e.mp4_close && this.emit('recordMp4', e.mp4_close, 'close'));
        }),
        (h.onUploadLogNotify = function (e) {
          var t = e.code,
            n = e.url;
          200 === t && this.emit('logUploaded', { url: n });
        }),
        (h.getName = function () {
          return 'signal socket ' + this.url;
        }),
        (h.destroy = function () {
          (this.destroyed = !0), this.stopHeartBeat();
          this.logToConsole('signal close -> signal.js'),
            this.socket &&
              ((this.socket.onopen = null),
              (this.socket.onmessage = null),
              (this.socket.onerror = null),
              (this.socket.onclose = null),
              this.socket.readyState === WebSocket.OPEN && (this.clear(), this.socket.close()),
              (this.socket = null));
        }),
        (h.audioControl = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (
            c.merge(this.audioGroup, e),
            this.sendCmd({ type: 'on_audio_process', info: this.audioGroup, id: ++this.cmdId })
          );
        }),
        (h.awc = function (e) {
          return this.sendCmd({
            type: 'on_audio_howling',
            info: { status: ~~e },
            id: ++this.cmdId,
          });
        }),
        (e.exports = p);
    },
    function (e, t, n) {
      'use strict';
      var r = 'wss://localhost.netease.im:',
        i = {
          baseUrl: r,
          signalUrl: r + '30000',
          streamUrl: r + '40000',
          genStreamUrl: function (e) {
            return '' + r + e;
          },
        };
      e.exports = i;
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = o(n(65)),
        i = n(27);
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var a = '//' + o(n(5)).default.roomserver + '/v1/sdk/command/rooms/';
      (t.default = {
        parseAccountUidMap: function (e) {
          var t = this;
          Object.keys(e).forEach(function (n) {
            t.addAccountUidMap({ account: n, uid: e[n] });
          });
        },
        addAccountUidMap: function (e) {
          var t = e.account,
            n = e.uid;
          this.uidAccountMap || (this.uidAccountMap = {}),
            (this.uidAccountMap[n] = t),
            this.accountUidMap || (this.accountUidMap = {}),
            (this.accountUidMap[t] = n);
        },
        getAccountWithUid: function (e) {
          if (this.uidAccountMap) return this.uidAccountMap[e];
        },
        getUidWithAccount: function (e) {
          if (this.accountUidMap) return this.accountUidMap[e];
        },
        onError: function (e) {
          this.emit('error', e);
        },
        setAudioBlack: function (e) {
          if (this.getUidWithAccount(e))
            return this.signal.setAudioBlack(this.getUidWithAccount(e), 1);
          return Promise.reject({ code: 'accountNotMatch' });
        },
        setAudioStart: function (e) {
          if (this.getUidWithAccount(e))
            return this.signal.setAudioBlack(this.getUidWithAccount(e), 0);
          return Promise.reject({ code: 'accountNotMatch' });
        },
        setVideoBlack: function (e) {
          return this.signal.setVideoBlack(this.getUidWithAccount(e), 1);
        },
        setVideoShow: function (e) {
          return this.signal.setVideoBlack(this.getUidWithAccount(e), 0);
        },
        startRecordMp4: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (
            this.dataApi.update({ key: 'record' }),
            i.tool.verifyOptions(e, 'path'),
            e.account &&
              (e.id = e.account === this.account ? 0 : this.getUidWithAccount(e.account)),
            this.signal.startRecordMp4(e)
          );
        },
        stopRecordMp4: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (
            e.account &&
              (e.id = e.account === this.account ? 0 : this.getUidWithAccount(e.account)),
            this.signal.stopRecordMp4(e)
          );
        },
        startRecordAac: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (
            this.dataApi.update({ key: 'audio_record' }),
            i.tool.verifyOptions(e, 'path'),
            this.signal.startRecordAac(e)
          );
        },
        stopRecordAac: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return this.signal.stopRecordAac(e);
        },
        onRecordMp4: function (e, t) {
          (e.type = t), this.emit('recordMp4', e);
        },
        setNetcallSession: function (e) {
          return this.calling
            ? Promise.reject({ type: 'statusNotMatch', error: '开启会话失败: 当前正在通话中' })
            : ((this.calling = !0),
              (this.channelId = e.channelId),
              (this.type = +e.netcallType),
              (this.imInfo = e),
              (this.imInfo.rtcUrls = e.rtcServerMap),
              (this.beCalledInfo = this.imInfo),
              (this.target = e.target.account),
              this.parseAccountUidMap(e.accountUidMap),
              this.signal.startSession(
                (0, r.default)({}, this.imInfo, { type: this.type }, this.imInfo.sessionConfig),
                !1,
              ));
        },
        ans: function (e) {
          return this.signal
            ? (this.dataApi.update({ key: 'ans' }),
              (this.sessionConfig.ns = ~~e),
              this.signal.audioControl({ ns: this.sessionConfig.ns }))
            : Promise.reject({ code: 'noConnection' });
        },
        aec: function (e) {
          return this.signal
            ? (this.dataApi.update({ key: 'aec' }),
              (this.sessionConfig.aec = ~~e),
              this.signal.audioControl({ aec: this.sessionConfig.aec }))
            : Promise.reject({ code: 'noConnection' });
        },
        voiceDetection: function (e) {
          return this.signal
            ? ((this.sessionConfig.vad = ~~e),
              this.signal.audioControl({ vad: this.sessionConfig.vad }))
            : Promise.reject({ code: 'noConnection' });
        },
        awc: function (e) {
          return this.signal
            ? ((this.sessionConfig.awc = ~~e), this.signal.awc(this.sessionConfig.awc))
            : Promise.reject({ code: 'noConnection' });
        },
        updateRtmpHostVideo: function (e) {
          var t = e.account,
            n = e.uid;
          if ((t && (n = this.getUidWithAccount(t)), !n))
            return Promise.reject('账号不在房间中，无法进行操作');
          var r = a + this.channelId,
            o =
              (this.callerInfo && this.callerInfo.serverInfo && this.callerInfo.serverInfo.token) ||
              '';
          return (0, i.ajax)({
            type: 'post',
            url: r,
            data: { suid: this.getUid(), cid: this.channelId, uid: +n, cmd: 10001 },
            header: { Token: o },
          }).then(function (e) {
            if (200 === e.code) return Promise.resolve();
            var t = void 0;
            switch (e.code) {
              case 404:
                t = '房间不存在';
                break;
              case 405:
                t = '目标用户不在房间中';
                break;
              case 406:
                t = '没有权限';
                break;
              case 417:
                t = '请求数据不对';
                break;
              case 600:
                t = '服务器内部错误';
                break;
              default:
                t = '请求参数不正确';
            }
            return Promise.reject(t);
          });
        },
      }),
        (e.exports = t.default);
    },
    function (e, t, n) {
      'use strict';
      var r,
        i = n(65),
        o = (r = i) && r.__esModule ? r : { default: r };
      n(336);
      var a = n(691),
        s = n(487),
        c = n(486),
        u = n(690),
        d = n(416),
        l = n(485),
        f = n(484),
        p = n(483),
        h = void 0,
        m = n(5),
        _ = (0, o.default)({ version: m.info.version, versionAgent: m.agentVersion }, d, {
          webgl: a,
          install: function (e, t) {
            s.install(e, t),
              c.install(e, t),
              e.parser.mixin({ configMap: l, serializeMap: f, unserializeMap: p }),
              u.install(e, t);
          },
          getInstance: function (e) {
            return h || (h = new u(e)), h;
          },
          destroy: function () {
            h && (h.destroy(), (h = null));
          },
        });
      e.exports = _;
    },
  ]);
});
