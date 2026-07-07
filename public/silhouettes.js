/**
 * Imamo Tipa — zajednički sustav silueta
 * Koristiti na svim stranicama: <script src="/silhouettes.js"></script>
 *
 * Ženski likovi (kraći): Marketing, Društvene mreže, Dizajn
 * Muški likovi (viši):  Web aplikacije, Video/foto, Ostalo
 *
 * SVG viewBox: 0 0 130 250
 * Ženski likovi koriste viewBox "0 12 130 250" → vizualno kraći
 */

window.IMAMO_SILHOUETTES = {
  order: ["marketing", "drustvene", "web", "video", "dizajn", "ostalo"],

  // ===== ŽENSKI LIKOVI (suknja, kraći — viewBox pomaknuto dolje) =====

  marketing: {
    gender: "f",
    viewBox: "0 12 130 250",
    body: `<circle cx="60" cy="52" r="15"/>
      <path d="M44,70 Q44,104 40,136 L82,136 Q78,104 78,70 Z"/>
      <rect x="48" y="130" width="12" height="80" rx="6"/>
      <rect x="62" y="130" width="12" height="80" rx="6"/>
      <rect x="68" y="60" width="11" height="42" rx="5" transform="rotate(-42 74 81)"/>
      <polygon points="90,32 114,20 114,54 90,44"/>
      <rect x="84" y="34" width="8" height="10" rx="2"/>`
  },

  drustvene: {
    gender: "f",
    viewBox: "0 12 130 250",
    body: `<circle cx="58" cy="52" r="15"/>
      <path d="M42,70 Q42,104 38,136 L80,136 Q76,104 76,70 Z"/>
      <rect x="48" y="130" width="12" height="80" rx="6"/>
      <rect x="62" y="130" width="12" height="80" rx="6"/>
      <rect x="70" y="64" width="10" height="40" rx="5" transform="rotate(38 76 104)"/>
      <rect x="94" y="34" width="19" height="32" rx="4"/>
      <circle cx="99" cy="20" r="4"/>
      <circle cx="107" cy="20" r="4"/>
      <path d="M96 22 L110 22 L103 31 Z"/>`
  },

  dizajn: {
    gender: "f",
    viewBox: "0 12 130 250",
    body: `<circle cx="63" cy="56" r="14"/>
      <circle cx="63" cy="38" r="8"/>
      <path d="M48,74 Q48,106 44,136 L84,136 Q80,106 80,74 Z"/>
      <rect x="52" y="130" width="11" height="78" rx="5"/>
      <rect x="67" y="130" width="11" height="78" rx="5"/>
      <rect x="70" y="94" width="22" height="28" rx="3" transform="rotate(12 81 108)"/>
      <rect x="72" y="78" width="9" height="28" rx="4" transform="rotate(-28 77 92)"/>`
  },

  // ===== MUŠKI LIKOVI (pravokutni torso, viši — standardni viewBox) =====

  web: {
    gender: "m",
    viewBox: "0 0 130 250",
    body: `<circle cx="62" cy="36" r="17"/>
      <circle cx="80" cy="48" r="8"/>
      <circle cx="86" cy="62" r="6"/>
      <rect x="44" y="54" width="38" height="78" rx="15"/>
      <rect x="48" y="128" width="13" height="92" rx="6"/>
      <rect x="65" y="128" width="13" height="92" rx="6"/>
      <rect x="22" y="88" width="28" height="16" rx="3"/>
      <rect x="34" y="60" width="12" height="36" rx="5" transform="rotate(18 40 78)"/>`
  },

  video: {
    gender: "m",
    viewBox: "0 0 130 250",
    body: `<circle cx="58" cy="32" r="17"/>
      <rect x="43" y="12" width="32" height="8" rx="3"/>
      <rect x="39" y="50" width="40" height="82" rx="16"/>
      <rect x="43" y="126" width="14" height="94" rx="6"/>
      <rect x="61" y="126" width="14" height="94" rx="6"/>
      <rect x="76" y="26" width="36" height="26" rx="4"/>
      <circle cx="118" cy="38" r="9"/>
      <rect x="72" y="48" width="12" height="32" rx="5" transform="rotate(-20 78 64)"/>`
  },

  ostalo: {
    gender: "m",
    viewBox: "0 0 130 250",
    body: `<circle cx="65" cy="34" r="18" transform="rotate(8 65 34)"/>
      <rect x="46" y="54" width="40" height="78" rx="16"/>
      <rect x="50" y="126" width="14" height="94" rx="6"/>
      <rect x="68" y="126" width="14" height="94" rx="6"/>
      <rect x="28" y="58" width="13" height="38" rx="6" transform="rotate(35 35 77)"/>
      <rect x="91" y="58" width="13" height="38" rx="6" transform="rotate(-35 97 77)"/>
      <circle cx="23" cy="58" r="8"/>
      <circle cx="109" cy="58" r="8"/>`
  }
};

/**
 * Vraća SVG inner HTML za siluetu (bez <svg> wrappera).
 * @param {string} key — "marketing"|"drustvene"|"web"|"video"|"dizajn"|"ostalo"
 * @param {string} [fill] — boja ispune, npr. "#141414", "#FFD233", "#fff"
 * @returns {string} SVG <g> sadržaj
 */
window.getSilhouette = function(key, fill) {
  const s = window.IMAMO_SILHOUETTES[key];
  if (!s) return "";
  const f = fill ? ` fill="${fill}"` : "";
  return `<g${f}>${s.body}</g>`;
};

/**
 * Vraća kompletni <svg> element kao string.
 * @param {string} key
 * @param {string} [fill]
 * @returns {string}
 */
window.getSilhouetteSVG = function(key, fill) {
  const s = window.IMAMO_SILHOUETTES[key];
  if (!s) return "";
  return `<svg viewBox="${s.viewBox}" xmlns="http://www.w3.org/2000/svg">${window.getSilhouette(key, fill)}</svg>`;
};

/**
 * Vraća niz svih silueta u standardnom redoslijedu.
 * @param {string} [fill]
 * @returns {string[]}
 */
window.getAllSilhouettes = function(fill) {
  return window.IMAMO_SILHOUETTES.order.map(function(key) {
    return window.getSilhouette(key, fill);
  });
};

/**
 * Vraća niz viewBox vrijednosti u standardnom redoslijedu.
 * @returns {string[]}
 */
window.getAllViewBoxes = function() {
  return window.IMAMO_SILHOUETTES.order.map(function(key) {
    return window.IMAMO_SILHOUETTES[key].viewBox;
  });
};
