#!/bin/bash
# ═══════════════════════════════════════════════════
#  sync-tekst.sh
#  Urediš imamo-tipa-tekst.js → pokreneš ovu skriptu
#  → svih 6 stranica se ažurira s novim tekstom.
# ═══════════════════════════════════════════════════

TEKST_FILE="imamo-tipa-tekst.js"
PAGES=(
  imamo-tipa-arcade.html
  imamo-tipa-dating.html
  imamo-tipa-film.html
  imamo-tipa-korporativni.html
  imamo-tipa-kviz.html
  imamo-tipa-osumnjiceni.html
)

if [ ! -f "$TEKST_FILE" ]; then
  echo "❌ Ne nalazim $TEKST_FILE u trenutnom folderu."
  exit 1
fi

TEKST_CONTENT=$(cat "$TEKST_FILE")

for page in "${PAGES[@]}"; do
  if [ ! -f "$page" ]; then
    echo "⚠  $page ne postoji, preskačem."
    continue
  fi

  # Zamijeni sve između IMAMO-TEKST-START i IMAMO-TEKST-END
  python3 -c "
import sys
with open('$page', 'r') as f:
    html = f.read()

import re
pattern = r'<!-- IMAMO-TEKST-START -->.*?<!-- IMAMO-TEKST-END -->'
replacement = '<!-- IMAMO-TEKST-START -->\n<script>\n' + open('$TEKST_FILE').read() + '\n</script>\n<!-- IMAMO-TEKST-END -->'
new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)

with open('$page', 'w') as f:
    f.write(new_html)
"

  echo "✓ $page ažuriran"
done

echo ""
echo "Gotovo! Commitaj i pushaj na GitHub → Cloudflare Pages se rebuilda automatski."
