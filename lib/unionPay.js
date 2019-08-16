!(function(e) {
  "using strict";
  function n() {}
  function o() {
    function n(e, o, i, a, r) {
      return h
        ? void (h
            ? window.cordova.exec(
                e,
                function(e) {
                  t(o, e);
                },
                i,
                a,
                r
              )
            : v
            ? t(o, y.ESDK_CONFIG_FAILED)
            : window.upsdk.ready(function() {
                n(e, o, i, a, r);
              }))
        : void t(o, y.ESDK_NEED_CONFIG_DONE);
    }
    function o(o, t, i, a, r) {
      o = o || {};
      var c = {};
      e.isPlainObject(o) &&
        e.each(o, function(n, o) {
          e.isFunction(o) || (c[n] = o);
        }),
        N &&
          window.uplog &&
          window.uplog(
            ">>>> cordovaExecV2 plugin=" + i + " data = " + JSON.stringify(c)
          ),
        n(
          function(n) {
            N &&
              window.uplog &&
              window.uplog(">>>> cordovaExec plugin=" + i + " success");
            var t = o.success;
            e.isFunction(t) && (e.isFunction(a) && (n = a(n)), t(n));
          },
          function(n) {
            N &&
              window.uplog &&
              window.uplog(">>>> cordovaExec plugin=" + i + " err");
            var t = o.fail || o.cancel;
            t && (e.isFunction(r) && (n = r(n)), t(n));
          },
          t,
          i,
          [c]
        );
    }
    N && window.uplog && window.uplog("cordovaReadyCB..."),
      (w = !0),
      "undefined" != typeof s && (window.upsdk.config(s), (s = null)),
      e.extend(window.upsdk, {
        pay: function(n) {
          var i = a("pay", n, ["tn"]);
          if (i) return void t(n.fail || n.cancel, i);
          delete n.merchantId;
          var r = /\(updebug\s(\d+)\)/g.exec(g);
          e.isArray(r) && r.length >= 2 && "2" === r[1]
            ? (n.mode = "02")
            : (n.mode = "00"),
            o(n, "UPWebPay", "pay", null, function(e) {
              var n = "";
              if (e && "string" == typeof e) {
                var o = JSON.parse(e);
                o && "object" == typeof o && (e = o);
              }
              return (
                "object" == typeof e
                  ? (n = e.desc || e.msg)
                  : "string" == typeof e && (n = e),
                n || (n = "鏈煡閿欒鍘熷洜"),
                { msg: n }
              );
            });
        },
        addBankCard: function(e) {
          (e = e || {}),
            (e.scene = e.scene || "10007"),
            o(e, "UPWebBankCard", "addBankCard");
        },
        setNavigationBarTitle: function(e) {
          var o;
          (o = "string" == typeof e ? e : e && e.title),
            n(null, null, "UPWebBars", "setNavigationBarTitle", [o]);
        },
        setNavigationBarRightButton: function(n) {
          o(n, "UPWebBars", "setNavigationBarRightButton");
          var t = n && n.handler;
          e.isFunction(t) && e(document).on("rightbtnclick", t);
        },
        closeWebApp: function(e) {
          o(e, "UPWebClosePage", "closeWebApp");
        },
        showFlashInfo: function(e) {
          var o;
          (o = "string" == typeof e ? e : e && e.msg),
            o && n(null, null, "UPWebUI", "showFlashInfo", [o]);
        },
        scanQRCode: function(n) {
          o(n, "UPWebUI", "scanQRCode", function(n) {
            return e.isPlainObject(n) && n.value && (n = n.value), n;
          });
        },
        chooseImage: function(e) {
          (e.maxWidth && e.maxHeight) ||
            ((e.maxWidth = 500), (e.maxHeight = 1e3)),
            (e.sourceType = e.sourceType || "3"),
            o(e, "UPWebUI", "chooseImage", function(e) {
              "string" == typeof e && (e = JSON.parse(e));
              var n = e.url,
                o = n.lastIndexOf("."),
                t = n.substr(o + 1).trim();
              return { base64: e.base64, type: t };
            });
        },
        showSharePopup: function(e) {
          function n(n) {
            var o = {
              title: e.title,
              content: e.desc,
              desc: e.desc,
              picUrl: e.picUrl,
              imgUrl: e.picUrl,
              shareUrl:
                e.shareUrl +
                (e.shareUrl.indexOf("?") < 0
                  ? "?channel=" + n
                  : "&channel=" + n),
              channel: n
            };
            switch (n) {
              case 0:
                f && (o.content = e.content + " " + e.shareUrl);
                break;
              case 1:
                o.content = e.content + " " + e.shareUrl;
                break;
              case 3:
              case 4:
              case 5:
              case 6:
                break;
              case 7:
                f || (o.shareUrl = e.title + " " + e.shareUrl);
            }
            return o;
          }
          e.title || (e.title = ""),
            e.desc || (e.desc = ""),
            (e.content = e.desc),
            e.picUrl ||
              (e.picUrl =
                "https://wallet.95516.com/s/wl/web/402/images/common/logo.png"),
            (e.imgUrl = e.picUrl),
            e.shareUrl || (e.shareUrl = location.href),
            (window.unionpayWalletShareContent_iOS = function(e) {
              var o = n(e);
              return (
                "function" == typeof shareCallback && (o = shareCallback(e, o)),
                JSON.stringify(o)
              );
            }),
            (window.unionpayWalletShareContent_Android = function(e) {
              var o = n(e);
              "function" == typeof shareCallback && (o = shareCallback(e, o)),
                share_utils &&
                  "function" == typeof share_utils.setCommonTemplate &&
                  share_utils.setCommonTemplate(JSON.stringify(o));
            }),
            window.cordova.exec(null, null, "UPWebBars", "prefetchImage", [e]),
            window.cordova.exec(
              null,
              null,
              "UPWalletPlugin",
              "showSharePopup",
              [e]
            );
        },
        getLocationCity: function(e) {
          (e = e || {}),
            (e.type = "0"),
            o(e, "UPWalletPlugin", "fetchNativeData", function(e) {
              return "string" == typeof e && (e = JSON.parse(e)), e.cityCd;
            });
        },
        getLocationGps: function(e) {
          (e = e || {}),
            (e.type = "1"),
            o(e, "UPWalletPlugin", "fetchNativeData");
        },
        verifyPayPwd: function(e) {
          o(e, "UPWebAccount", "verifyPayPwd");
        },
        chooseFileFromAlbum: function(e) {
          o(e, "UPWebNativeInfo", "chooseFileFromAlbum");
        },
        readAlbumData: function(e) {
          o(e, "UPWebNativeInfo", "readAlbumData");
        },
        startAudioRecording: function(e) {
          o(e, "UPWebNativeInfo", "startAudioRecording");
        },
        stopAudioRecording: function(e) {
          o(e, "UPWebNativeInfo", "stopAudioRecording");
        },
        readAudioRecordingData: function(e) {
          o(e, "UPWebNativeInfo", "readAudioRecordingData");
        },
        startVideoRecording: function(e) {
          o(e, "UPWebNativeInfo", "startVideoRecording");
        },
        readVideoRecordingData: function(e) {
          o(e, "UPWebNativeInfo", "readVideoRecordingData");
        },
        readFaceVideoData: function(e) {
          o(e, "UPWebNativeInfo", "readFaceVideoData");
        },
        readFaceImageData: function(e) {
          o(e, "UPWebNativeInfo", "readFaceImageData");
        },
        noteInfoChange: function(e) {
          o(e, "UPNotesInfoPlugin", "noteInfoChange");
        },
        openRNPage: function(e) {
          o(e, "UPWebNewPage", "openRNPage");
        },
        navi: function(e) {
          o(e, "UPCarCodePlugin", "navi");
        },
        setScreenBrightness: function(e) {
          o(e, "UPCarCodePlugin", "setScreenBrightness");
        },
        getScreenBrightness: function(e) {
          o(e, "UPCarCodePlugin", "getScreenBrightness");
        },
        changeScreenShot: function(e) {
          o(e, "UPWebUI", "changeScreenShot");
        },
        monitorScreenShot: function(n) {
          o(n, "UPCarCodePlugin", "monitorScreenShot");
          var t = n && n.success;
          e.isFunction(t) &&
            e(document)
              .off("screenShotAction")
              .on("screenShotAction", t);
        },
        removeScreenShot: function(n) {
          o(n, "UPCarCodePlugin", "removeScreenShot");
          var t = n && n.success;
          e.isFunction(t) && e(document).off("screenShotAction", t);
        }
      });
  }
  function t(n, o) {
    o && "string" == typeof o && (o = { msg: o });
    var t;
    if (window.cordova)
      switch (window.cordova.errorRetStatus) {
        case window.cordova.callbackStatus.INVALID_ACTION:
          t = y.ESDK_PLUGIN_INVALID_ACTION;
          break;
        case window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION:
          t = y.ESDK_PLUGIN_CLASS_NOT_FOUND;
          break;
        case window.cordova.callbackStatus.ILLEGAL_ACCESS_EXCEPTION:
          t = y.ESDK_PLUGIN_ILLEGAL_ACCESS;
      }
    if ((t && (o = t), e.isFunction(n))) n(o);
    else if (o) {
      var a = o.errmsg || o.msg || o.desc,
        r = o.errcode || o.code;
      r && (a += " [" + r + "]"), i(a);
    }
    window.cordova &&
      (window.cordova.errorRetStatus = window.cordova.callbackStatus.OK);
  }
  function i(n) {
    N &&
      n &&
      (h && e.inArray("showFlashInfo", window.upsdk.jsApiList)
        ? window.cordova.exec(null, null, "UPWebUI", "showFlashInfo", [n])
        : alert(n));
  }
  function a(e, n, o) {
    for (var t, i = 0; i < o.length; ++i)
      if (!n[o[i]]) {
        t = o[i];
        break;
      }
    if (t) {
      var a = e + "璋冪敤鏂规硶缂哄皯鍙傛暟" + t;
      return a;
    }
    return "";
  }
  function r(n) {
    e.isFunction(d) && ("string" == typeof n && (n = { msg: n }), d(n));
  }
  function c() {
    window.upConsole = !0;
    var e = document.createElement("script");
    (e.type = "text/javascript"),
      (e.src = l),
      document.getElementsByTagName("head")[0].appendChild(e);
  }
  if (!e) return void alert("璇峰厛鍔犺浇Zepto鎴栬€卝Query锛�");
  var s,
    d,
    u,
    l,
    g = navigator.userAgent.toLowerCase(),
    p =
      new RegExp(/(com.unionpay.chsp)/).test(g) ||
      new RegExp(/(com.unionpay.mobilepay)/).test(g),
    f = new RegExp(/iphone|ipad|ipod/).test(g),
    w = !1,
    h = !1,
    v = !1,
    m = [],
    S = {},
    N = !1,
    I = /\(version\s(\d+)\)/g.exec(g),
    P = e.isArray(I) && I.length >= 2 && I[1],
    y = {
      ESDK_BAD_PARAMS: { errcode: "c00", errmsg: "鍙傛暟閿欒" },
      ESDK_CONFIG_FAILED: {
        errcode: "c01",
        errmsg: "绛惧悕鏈€氳繃, 涓嶈兘璁块棶鎻掍欢"
      },
      ESDK_PLUGIN_ILLEGAL_ACCESS: {
        errcode: "c02",
        errmsg: "ILLEGAL_ACCESS_EXCEPTION: 鏃犳潈闄愯闂鎻掍欢锛�"
      },
      ESDK_PLUGIN_INVALID_ACTION: {
        errcode: "c03",
        errmsg: "INVALID_ACTION_EXCEPTION: 鎻掍欢閲岄潰娌℃湁姝ゆ柟娉曪紒"
      },
      ESDK_PLUGIN_CLASS_NOT_FOUND: {
        errcode: "c04",
        errmsg: "CLASS_NOT_FOUND_EXCEPTION: 姝ゆ彃浠舵病鏈夊疄鐜帮紒"
      },
      ESDK_NEED_CONFIG_DONE: {
        errcode: "c05",
        errmsg: "config鎵ц鎴愬姛浠ュ悗鎵嶈兘璋冪敤鎻掍欢鏂规硶"
      },
      ESDK_NOT_IN_WALLET: {
        errcode: "c101",
        errmsg: "upsdk.js蹇呴』琚摱鑱旈挶鍖呭姞杞�"
      },
      ESDK_NEED_NEW_VERSION: {
        errcode: "c102",
        errmsg: "鎮ㄦ墜鏈轰笂閾惰仈閽卞寘鐗堟湰澶綆,璇峰畨瑁呮柊鐗堟湰!"
      }
    };
  if (
    ((window.upsdk = window.upsdk || {}),
    (window.upsdk.isInsideWallet = p),
    (window.upsdk.checkSdkSupport = (function() {
      return !!P && (f ? P >= "422" : P >= "422");
    })()),
    p)
  ) {
    var A = document.createElement("script"),
      _ = f ? "ios" : "android",
      b = /\(updebug\s(\d+)\)/g.exec(g)[1],
      U = /\(cordova\s([\d\.]+)\)/g.exec(g)[1],
      C = (function() {
        return {
          0: "https://open.95516.com/s/open/",
          2: "http://172.18.179.10/s/open/"
        }[b];
      })();
    l = C + "common/upconsole.min.js";
    var E = C + "common/cordova/" + _ + "." + U + "/cordova.js";
    if (
      (A.setAttribute("type", "text/javascript"),
      A.setAttribute("src", E),
      document.getElementsByTagName("head")[0].appendChild(A),
      f && P < 440)
    )
      if (
        (N && window.uplog && window.uplog("wait document ready"),
        "complete" === document.readyState)
      )
        e(document).on("deviceready", o);
      else
        var D = setInterval(function() {
          "complete" === document.readyState &&
            window.cordova &&
            (clearInterval(D), o());
        }, 50);
    else e(document).on("deviceready", o);
  } else o();
  var L = [
    "pay",
    "addBankCard",
    "setNavigationBarTitle",
    "setNavigationBarRightButton",
    "closeWebApp",
    "showFlashInfo",
    "scanQRCode",
    "chooseImage",
    "getLocationCity",
    "getLocationGps",
    "verifyPayPwd",
    "showSharePopup",
    "chooseFileFromAlbum",
    "readAlbumData",
    "startAudioRecording",
    "stopAudioRecording",
    "readAudioRecordingData",
    "startVideoRecording",
    "readVideoRecordingData",
    "readFaceVideoData",
    "readFaceImageData",
    "noteInfoChange",
    "openRNPage",
    "navi",
    "setScreenBrightness",
    "getScreenBrightness",
    "changeScreenShot",
    "monitorScreenShot",
    "removeScreenShot"
  ];
  (window.upsdk = window.upsdk || {}),
    e.each(L, function(e, o) {
      window.upsdk[o] = n;
    }),
    (window.upsdk.jsApiList = []),
    N && window.uplog && window.uplog("href = " + window.location.href),
    e.extend(window.upsdk, {
      config: function(n) {
        function o(n) {
          var o = {};
          return (
            e.isArray(n) &&
              e.each(n, function(n, t) {
                e.isPlainObject(t) && (o[t.plugin] = t.actions);
              }),
            o
          );
        }
        if (!e.isPlainObject(n)) return void t(null, y.ESDK_BAD_PARAMS);
        n.debug && ((N = !0), c(), delete n.debug);
        var l = a("config", n, ["appId", "nonceStr", "timestamp", "signature"]);
        if (!l && n.url) {
          var g = window.location.href.split("#")[0];
          n.url !== g &&
            (l = "绛惧悕鍥犲瓙url鍙栧€间笉姝ｇ‘, 姝ｇ‘鐨勫簲璇ユ槸" + g);
        }
        return l
          ? (t(null, l), void r(l))
          : ((l = ""),
            p ? p || (l = y.ESDK_NEED_NEW_VERSION) : (l = y.ESDK_NOT_IN_WALLET),
            l
              ? void r(l)
              : (N &&
                  window.uplog &&
                  window.uplog("config: _isResReady = " + w),
                void (w
                  ? window.cordova.exec(
                      function(n) {
                        N && window.uplog && window.uplog("config: success"),
                          (h = !0),
                          (v = !1),
                          "string" == typeof n && (n = JSON.parse(n)),
                          n.params && (n = n.params),
                          (S = (n && n.jsApiList && o(n.jsApiList)) || {});
                        var t = [];
                        e.each(S, function(n, o) {
                          e.isArray(o) && (t = t.concat(o));
                        });
                        var a = e.inArray("fetchNativeData", t);
                        a >= 0 &&
                          t.splice(a, 1, "getLocationCity", "getLocationGps"),
                          (window.upsdk.jsApiList = t),
                          N &&
                            window.uplog &&
                            window.uplog(
                              "you can use plugins:" + window.upsdk.jsApiList
                            ),
                          m.length &&
                            e.each(m, function(n, o) {
                              e.isFunction(o) && o();
                            }),
                          i("config ok");
                      },
                      function(e) {
                        N && window.uplog && window.uplog("config: err"),
                          (v = !0),
                          (h = !1),
                          (u = e),
                          d(e),
                          i("config error: " + e);
                      },
                      "UPWebSdk",
                      "config",
                      [n]
                    )
                  : (s = n))));
      },
      ready: function(n) {
        e.isFunction(n) && (h ? n() : m.push(n));
      },
      error: function(n) {
        (n = (e.isFunction(n) && n) || e.noop()), v ? n(u) : (d = n);
      }
    }),
    "undefined" != typeof define &&
      define(function() {
        return window.upsdk;
      });
})(
  "undefined" != typeof jQuery
    ? jQuery
    : "undefined" != typeof Zepto
    ? Zepto
    : void 0
);
