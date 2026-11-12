// native-bridge.js — optional helper for your website.
// Add it to your site; it only does something when the page runs inside the mobile app.
(function () {
  var C = window.Capacitor;
  var isApp = !!(C && C.isNativePlatform && C.isNativePlatform());
  var P = (C && C.Plugins) || {};
  window.AppBridge = {
    isApp: isApp,
    share: function (o) {
      if (!isApp || !P.Share) return navigator.share ? navigator.share(o) : Promise.reject("Share unavailable");
      return P.Share.share({ title: o.title, text: o.text, url: o.url });
    },
    takePhoto: function () {
      if (!isApp || !P.Camera) return Promise.reject("Camera unavailable");
      return P.Camera.getPhoto({ quality: 85, resultType: "dataUrl", source: "CAMERA" }).then(function (r) { return r.dataUrl; });
    },
    pickPhoto: function () {
      if (!isApp || !P.Camera) return Promise.reject("Gallery unavailable");
      return P.Camera.getPhoto({ quality: 85, resultType: "dataUrl", source: "PHOTOS" }).then(function (r) { return r.dataUrl; });
    },
    biometric: function (reason) {
      var B = P.NativeBiometric;
      if (!isApp || !B) return Promise.resolve(true);
      return B.verifyIdentity({ reason: reason || "Confirm it's you" }).then(function () { return true; }, function () { return false; });
    },
    features: {"push":true,"share":false,"camera":true,"upload":true,"offline":true,"deeplink":true,"biometric":false}
  };
})();
