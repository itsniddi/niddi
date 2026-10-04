# niddi.hu – Portfólió & tartalomkészítő oldal

Vite + React + Tailwind CSS + Framer Motion + Lucide React. Minden látható szöveg magyar.

## Indítás

```bash
npm install
npm run dev      # fejlesztői szerver
npm run build    # éles build a dist/ mappába
npm run preview  # a build helyi kipróbálása
```

## Beállítás – `src/config.js` (`CONFIG` objektum)

| Kulcs | Mire való |
|---|---|
| `CONFIG.youtube.apiKey` / `channelId` | YouTube Data API v3 kulcs és csatornaazonosító (`UC…`) |
| `CONFIG.discordWebhookUrl` | Discord webhook az űrlap üzeneteihez |
| `CONFIG.site.email` | Kapcsolati és jogi e-mail cím |
| `CONFIG.socials` | Közösségi URL-ek (youtube, twitch, tiktok, instagram, discord, twitter); a handle-ök az URL-ből készülnek, a kártyaszövegek a `SOCIAL_META`-ban vannak |

Amíg az API kulcs helyőrző, a YouTube szekció bemutató számokat és videókat mutat (a videókra kattintva a csatorna nyílik meg).

## Arculat

- Háttér: `#2b2b2b` (a logóval és a bannerrel egyező), élénk cián `#00F0FF` → elektromos lila `#8A2BE2`, finom smaragd `#34F5A4` kiemelések.
- Betűk (mind saját szerverről, `public/fonts/`): **Minecraft** (logó, nagy számok, profilkártya), **Afacad Flux** (címsorok), **Poppins** (szövegtörzs). A Minecraft betű `font-minecraft` osztállyal használható.
- Képek: `public/logo.png` (profilkép, navigáció, favicon), `public/banner.png` (megosztási kép).

## Fontos tudnivalók

- **A kliensoldali kulcsok nyilvánosak.** A YouTube kulcsot a Google Cloud Console-ban korlátozd HTTP referrerre (`https://niddi.hu/*`) és csak a YouTube Data API v3-ra. A Discord webhook URL-jével bárki tud üzenetet küldeni, ezért éles használatra érdemes egy kis szerver nélküli proxy mögé tenni (pl. Cloudflare Worker). Az űrlapban van honeypot és 60 másodperces időkorlát, de ez nem szerveroldali védelem.
- **Jogi szövegek:** a `src/data/legal.js` általános sablon. Töltsd ki a `[szögletes zárójeles]` részeket, és élesítés előtt egyeztess jogi szakemberrel.
- **Licencek:** a Minecraft betű közkincs (public domain), az Afacad Flux és a Poppins SIL OFL licenc alatt áll (`public/fonts/OFL-*.txt`).

## Szerkezet

```
public/                logó, banner, fonts/
src/
  config.js            CONFIG, linkek, bemutató adatok
  data/legal.js        GDPR, ÁSZF, Impresszum szövegek
  lib/                 YouTube API, görgetés
  hooks/useTypewriter  gépelő effekt
  components/
    Navbar, Hero, About, Socials, YouTubeSection, Contact, Footer, LegalModal, Background, ErrorBoundary
    ui/                Reveal, Magnetic, SpotlightCard, Counter, Modal, SectionHeading
```
