const PAGES = [
  "/imamo-tipa-kviz.html",
  "/imamo-tipa-arcade.html",
  "/imamo-tipa-film.html",
  "/imamo-tipa-dating.html",
  "/imamo-tipa-korporativni.html",
  "/imamo-tipa-osumnjiceni.html",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Anything that isn't /random → serve static files (root now serves index.html)
    if (url.pathname !== "/random") {
      return env.ASSETS.fetch(request);
    }

    // ---- /random: pick the next page from the queue ----

    const cookie = request.headers.get("Cookie") || "";
    const match = cookie.match(/tip_queue=([^;]*)/);
    let queue = [];
    let lastShown = -1;

    if (match) {
      try {
        const data = JSON.parse(decodeURIComponent(match[1]));
        queue = Array.isArray(data.q) ? data.q : [];
        lastShown = typeof data.l === "number" ? data.l : -1;
      } catch {
        /* corrupt cookie → fresh start */
      }
    }

    // Queue empty → reshuffle all 6, but make sure the first one
    // isn't the same page the visitor just saw
    if (queue.length === 0) {
      queue = shuffle([0, 1, 2, 3, 4, 5]);
      if (queue[0] === lastShown && queue.length > 1) {
        const [first, ...rest] = queue;
        const pos = 1 + Math.floor(Math.random() * rest.length);
        rest.splice(pos, 0, first);
        queue = rest;
      }
    }

    const current = queue.shift();
    const pagePath = PAGES[current];

    // Redirect to the chosen page
    const newResponse = new Response(null, {
      status: 302,
      headers: { Location: new URL(pagePath, url.origin).toString() },
    });

    // Save remaining queue + last-shown index in cookie (7 days)
    const val = encodeURIComponent(JSON.stringify({ q: queue, l: current }));
    newResponse.headers.set(
      "Set-Cookie",
      `tip_queue=${val}; Path=/; Max-Age=604800; SameSite=Lax`
    );

    return newResponse;
  },
};
