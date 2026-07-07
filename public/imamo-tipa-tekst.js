/*  ═══════════════════════════════════════════════════
    IMAMO TIPA — zajednički tekstovi
    Sve stranice importaju ovu datoteku.
    Kad trebaš promijeniti tekst, mjenjaj SAMO ovdje.
    ═══════════════════════════════════════════════════ */
window.IMAMO_TEKST = {

  /* ---------- hero opis ---------- */
  heroOpis: "Za svaki problem imamo osobu koja ga rješava. Ozbiljan posao, neobavezne ponude i rezultati koji donose.. rezultate.",

  /* ---------- tipovi / tipkinje ---------- */
  tipovi: [
    {
      name: "Tipkinja za marketing",
      crime: "Specijalnost: nagli rast dosega",
      bio: "Zna zašto ti nitko ne lajka objave - i zna kako to popraviti. Govori fluentno \"algoritam\", a budžet za oglase troši kao da je njezin. Pažljivo, dakle."
    },
    {
      name: "Tipkinja za društvene mreže",
      crime: "Specijalnost: viralni sadržaj dok ti spavaš",
      bio: "Zna u koliko sati objaviti da te vide, a u koliko da te ignoriraju. Trend osjeti tjedan dana prije nego postane trend. Tvoj \"samo par storyja\" pretvori u strategiju."
    },
    {
      name: "Tip za web aplikacije",
      crime: "Specijalnost: aplikacije koje razumiju sve generacije",
      bio: "Piše kod brže nego što ti odgovaraš na rezervacije. Tvoja stara stranica iz 2014.? Vidio je. Ne želi razgovarati o tome."
    },
    {
      name: "Tip za video i foto",
      crime: "Specijalnost: s lakoćom pronalazi ljepši kut",
      bio: "Kamera mu je uvijek pri ruci, a dron u torbi. Objektiv, stativ, klik, klik, fotografija. Dugi klik, video. Još par klikova i montaža je gotova prije kraja smjene."
    },
    {
      name: "Tipkinja za dizajn",
      crime: "Specijalnost: Slova, boje, kompozicija. Umjetna inteligencija je se boji",
      bio: "Tvoj logo napravljen u ChatGPT-u ju osobno vrijeđa, ali dovoljno je pristojna da to ne kaže naglas. Umjesto toga — napravi novi."
    },
    {
      name: "Tip za ostalo",
      crime: "Specijalnost: u moru ljudi mi znamo tipa za sve",
      bio: "Imamo Tipa pokriva sva područja potrebna za uspješno poslovanje, no za one koji žele dodatne usluge — znamo tipa, garantirano. Javi nam se s idejom, a mi ćemo ti odgovoriti s planom."
    }
  ],

  /* ---------- kako to ide (3 koraka) ---------- */
  proces: [
    { naslov: "Javiš se",       tekst: "Mail, poziv, DM, dimni signal. Sve prolazi. Opišeš problem svojim riječima - mi prenosimo tip/kinji." },
    { naslov: "Zadužimo tipa",  tekst: "Ili tipkinju. Ili više njih odjednom, ovisno o projektu. Dobiješ plan, rok i cijenu bez sitnih slova." },
    { naslov: "Tip riješi",     tekst: "Ti unaprijediš poslovanje. Mi te dodamo na listu zadovoljnih klijenata. Jednostavno." }
  ],

  /* ---------- CTA sekcija ---------- */
  ctaNaslov: "Imaš problem?<br><em>Mi imamo tipa.</em>",
  ctaTekst: "Javi se i reci što ti treba. Konzultacije su besplatne, a tip/kinje su tipično spremni."
};

/* ---------- auto-inject po data atributima ----------
   Dodaj data-tekst="heroOpis" na element i tekst se upiše automatski.
   Za ugniježđene objekte koristi dot notaciju: data-tekst="proces.0.naslov"
   ──────────────────────────────────────────────────── */
(function(){
  function resolve(obj, path) {
    return path.split(".").reduce(function(o, k) { return o && o[k]; }, obj);
  }
  document.addEventListener("DOMContentLoaded", function() {
    var els = document.querySelectorAll("[data-tekst]");
    for (var i = 0; i < els.length; i++) {
      var val = resolve(window.IMAMO_TEKST, els[i].getAttribute("data-tekst"));
      if (val !== undefined) {
        if (els[i].hasAttribute("data-tekst-html")) {
          els[i].innerHTML = val;
        } else {
          els[i].textContent = val;
        }
      }
    }
  });
})();
