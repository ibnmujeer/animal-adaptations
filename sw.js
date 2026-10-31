// Service worker for offline play. The build fills in CACHE and FILES.
// Cache first: after the first visit, everything comes from the device.
const CACHE = 'awwfy-animal-adaptations-mvwisoll';
const PREFIX = 'awwfy-animal-adaptations-';
const FILES = ["./","./apple-touch-icon.png","./assets/a01-CKKeUNCq.webp","./assets/a02-zZ23V0oE.webp","./assets/a03-K9t2sRFc.webp","./assets/a04-DMQZx-4-.webp","./assets/a05-orG6pJhB.webp","./assets/a06-BGaoZZQM.webp","./assets/a07-4V4h6Sfa.webp","./assets/a08-CXrKQpkr.webp","./assets/a09-DSHgi9mW.webp","./assets/a10-D12dX9JB.webp","./assets/a11-Cv2s8qJs.webp","./assets/a12-_mHayDHw.webp","./assets/a13-CdnsdwdC.webp","./assets/a14-CunmcQP0.webp","./assets/a15-BykZI8R7.webp","./assets/a16-D594FZJ0.webp","./assets/a17-D7vCVz5x.webp","./assets/a18-DL2ezDCh.webp","./assets/a19-Bbytvxb_.webp","./assets/a20-C470gBWS.webp","./assets/a21-2ELGetfM.webp","./assets/a22-i5N_jZQz.webp","./assets/a23-BpXpVY1F.webp","./assets/a24-Acd3SPH7.webp","./assets/a25-Dz1GqXTh.webp","./assets/a26-Bsnf5Y02.webp","./assets/a27-CVLRLX0b.webp","./assets/a28-CBARnC8o.webp","./assets/a29-CsyHnL_x.webp","./assets/a30-ijDO0JmS.webp","./assets/a31-EQq8qnKK.webp","./assets/a32-DkDWZq7g.webp","./assets/a33-ByqKq67a.webp","./assets/a34-DvjoVNQd.webp","./assets/a35-CqcmB75f.webp","./assets/a36-Bf7pBRtY.webp","./assets/a37-CSW-vZ3y.webp","./assets/a38-i6N_t4Ve.webp","./assets/a39-dpFBZUvi.webp","./assets/a40-CVZZ9Px5.webp","./assets/a41-BeuWtqTA.webp","./assets/a42-gsJU_z0-.webp","./assets/a43-DKchXFOB.webp","./assets/a44-CVd2MifV.webp","./assets/a45-zKFCiDSc.webp","./assets/a46-BiQydqm-.webp","./assets/a47-RDx8YJEA.webp","./assets/a48-CZ1BguaP.webp","./assets/a49-DsQZtlQ9.webp","./assets/a50-CoEgKA8H.webp","./assets/a51-CjTuMiqj.webp","./assets/a52-DPA-21Vp.webp","./assets/a53-BiMOU8fV.webp","./assets/a54-wfFK7GWg.webp","./assets/a55-CvJUQPTy.webp","./assets/a56-m4aEeh7A.webp","./assets/a57-B45D4POa.webp","./assets/a58-BNmhsixl.webp","./assets/a59-CvYAdLij.webp","./assets/a60-B_aUqmoZ.webp","./assets/a61-DeB6H3rK.webp","./assets/a62-BxdoaNNu.webp","./assets/a63-v39U_nL0.webp","./assets/a64-BmfBQlz0.webp","./assets/a65-RcI3SlCZ.webp","./assets/a66-BvLKNhrB.webp","./assets/a67-CwiVZZzm.webp","./assets/a68-DB1ZDFy1.webp","./assets/a69-C4bpN3KF.webp","./assets/a70-BMlv1tge.webp","./assets/emblem-arm-bl-DLAWJ2xe.png","./assets/emblem-arm-br-krCHUBDy.png","./assets/emblem-arm-tl-Ca6DMpTX.png","./assets/emblem-arm-tr-CHjBr36Q.png","./assets/emblem-full-CsJ8-RcG.png","./assets/F01-play-WhYhtm_Q.png","./assets/F02-next--_E_f85B.png","./assets/F03-retry-DbAN3ZEn.png","./assets/F04-hint-9X9dKx1s.png","./assets/F05-undo-DJelX_sP.png","./assets/F06-pause-BqTxUt46.png","./assets/F07-menu-KcwzfFOr.png","./assets/F08-sound-on-oQHomjU7.png","./assets/F09-sound-off-C19nAHZ6.png","./assets/F10-help-9Sui-VUU.png","./assets/F11-exit-BrhP4l2_.png","./assets/fredoka-latin-600-normal-C4zohCW5.woff2","./assets/fredoka-latin-600-normal-CcrEjrB4.woff","./assets/fredoka-latin-700-normal-BOIZVyIN.woff2","./assets/fredoka-latin-700-normal-C8FeHd3X.woff","./assets/icon-world-B_irNcLi.png","./assets/index-B1UtxUmR.css","./assets/index-BlVbwL-O.js","./assets/wordmark-white-bA4KL13H.png","./favicon-32.png","./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting()),
  );
});

// A new version removes the old caches of this game.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k)),
      ))
      .then(() => self.clients.claim()),
  );
});

// Visit counting (Cloudflare Web Analytics) is network only. It is never cached, and offline it just fails quietly.
const isAnalytics = (url) => url.hostname.endsWith('cloudflareinsights.com') || url.pathname.includes('/cdn-cgi/');

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || isAnalytics(url)) return;

  event.respondWith(
    // ignoreVary: a server may send "Vary: Origin", which would make module scripts miss the cache.
    caches.match(request, { ignoreVary: true }).then((saved) => {
      if (saved) return saved;
      return fetch(request).catch(() => {
        // Offline and not saved: pages fall back to the game, other files fail honestly.
        if (request.mode === 'navigate') return caches.match('./index.html', { ignoreVary: true });
        return Response.error();
      });
    }),
  );
});
