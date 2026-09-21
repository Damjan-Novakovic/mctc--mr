/* ===== Setlist — shared Firebase data layer =====
   Loaded by both creator.html and client.html.
   Requires firebase-app-compat.js + firebase-firestore-compat.js
   and firebase-config.js to be loaded first.
*/
(function (global) {
  "use strict";

  function initFirestore() {
    if (!global.firebase) {
      console.error("[Setlist] Firebase SDK did not load. Check your network/ad-blocker.");
      return null;
    }
    if (!global.FIREBASE_CONFIG || !global.FIREBASE_CONFIG.apiKey || global.FIREBASE_CONFIG.apiKey.indexOf("REPLACE") === 0) {
      console.error("[Setlist] firebase-config.js still has placeholder values. Fill in your project's config.");
      return null;
    }
    try {
      if (!global.firebase.apps.length) {
        global.firebase.initializeApp(global.FIREBASE_CONFIG);
      }
      return global.firebase.firestore();
    } catch (e) {
      console.error("[Setlist] Firebase init failed:", e);
      return null;
    }
  }

  // Pull an 11-char YouTube video id out of any common URL shape.
  function extractYoutubeId(url) {
    if (!url) return "";
    var m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|v=)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
  }

  // Generic Firestore-collection wrapper: subscribe / add / remove / update.
  function makeCollectionStore(db, name) {
    var col = db.collection(name);
    return {
      subscribe: function (cb, orderField, dir) {
        var q = orderField ? col.orderBy(orderField, dir || "asc") : col;
        return q.onSnapshot(
          function (snap) {
            cb(snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); }));
          },
          function (err) { console.error("[Setlist] " + name + " listener error:", err); }
        );
      },
      add: function (data) { return col.add(data); },
      remove: function (id) { return col.doc(id).delete(); },
      update: function (id, data) { return col.doc(id).update(data); }
    };
  }

  // Single shared document that holds the "now playing" transport state:
  // { videoId, isPlaying, positionSec, updatedAtMs, queueId }
  function playbackRef(db) {
    return db.collection("meta").doc("playback");
  }

  function fmtTime(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  global.Setlist = {
    initFirestore: initFirestore,
    extractYoutubeId: extractYoutubeId,
    makeCollectionStore: makeCollectionStore,
    playbackRef: playbackRef,
    fmtTime: fmtTime
  };
})(window);
