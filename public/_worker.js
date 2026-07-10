const PAGES = [
  "/imamo-tipa-kviz.html",
  "/imamo-tipa-arcade.html",
  "/imamo-tipa-film.html",
  "/imamo-tipa-dating.html",
  "/imamo-tipa-korporativni.html",
  "/imamo-tipa-osumnjiceni.html",
];

// stranica → ključ brojača (isti slugovi kao na indexu)
const BROJACI_MAPA = {
  "/imamo-tipa-osumnjiceni.html": "osumnjiceni",
  "/imamo-tipa-kviz.html": "misteriozni",
  "/imamo-tipa-arcade.html": "retro",
  "/imamo-tipa-dating.html": "ljubavni",
  "/imamo-tipa-film.html": "filmski",
  "/imamo-tipa-korporativni.html": "korporativni",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ---- /api/brojaci: javno stanje svih brojača ----
    if (url.pathname === "/api/brojaci") {
      let brojevi = {};
      if (env.BROJACI) {
        const slugs = Object.values(BROJACI_MAPA);
        const parovi = await Promise.all(
          slugs.map(async (s) => [
            s,
            parseInt(await env.BROJACI.get("ulazi:" + s), 10) || 0,
          ])
        );
        brojevi = Object.fromEntries(parovi);
      }
      return new Response(JSON.stringify(brojevi), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=30",
        },
      });
    }

    // ---- /random: postojeća logika nasumične stranice ----
    if (url.pathname === "/random") {
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

      const newResponse = new Response(null, {
        status: 302,
        headers: { Location: new URL(pagePath, url.origin).toString() },
      });

      const val = encodeURIComponent(JSON.stringify({ q: queue, l: current }));
      newResponse.headers.set(
        "Set-Cookie",
        `tip_queue=${val}; Path=/; Max-Age=604800; SameSite=Lax`
      );

      return newResponse;
    }

    // ---- statika + brojanje ulazaka na tematske stranice ----
    const slug = BROJACI_MAPA[url.pathname];
    if (slug && request.method === "GET" && env.BROJACI) {
      const ua = request.headers.get("User-Agent") || "";
      const cookie = request.headers.get("Cookie") || "";
      const jeBot = /bot|crawl|spider|slurp|preview|lighthouse|headless/i.test(ua);
      const vecUsao = cookie.includes("ulaz_" + slug + "=1");

      if (!jeBot && !vecUsao) {
        // uvećaj brojač u pozadini — ne usporava odgovor
        ctx.waitUntil(
          (async () => {
            const kljuc = "ulazi:" + slug;
            const n = parseInt(await env.BROJACI.get(kljuc), 10) || 0;
            await env.BROJACI.put(kljuc, String(n + 1));
          })()
        );
        // isti posjetitelj se ne broji ponovno idućih 6 sati
        const odgovor = await env.ASSETS.fetch(request);
        const novi = new Response(odgovor.body, odgovor);
        novi.headers.append(
          "Set-Cookie",
          `ulaz_${slug}=1; Path=/; Max-Age=21600; SameSite=Lax`
        );
        return novi;
      }
    }

    return env.ASSETS.fetch(request);
  },
};
