// ─────────────────────────────────────────────────────────────
//  KONFIGURÁCIÓ – minden szerkeszthető adat egy helyen
// ─────────────────────────────────────────────────────────────
export const CONFIG = {
  // API-k és integrációk – cseréld le a helyőrzőket a saját adataidra
  youtube: {
    apiKey: 'AIzaSyCbUWR6JxPq-siqtoUtMpa-tXH4KLwH5rg',
    channelId: 'UCqy27NFxycKCgeC8Ifisk6Q',
  },
  discordWebhookUrl: 'YOUR_DISCORD_WEBHOOK_URL',

  site: {
    name: 'niddi',
    domain: 'niddi.hu',
    email: 'hello@niddi.hu', // ← cseréld le a valós e-mail címre
  },

  // ── Közösségi linkek ────────────────────────────────────────
  // Csak ide kell beilleszteni az URL-eket – a handle-ök automatikusan az URL-ből készülnek.
  socials: {
    youtube: 'https://www.youtube.com/@niddi_',
    twitch: 'https://www.twitch.tv/niddiyt',
    tiktok: 'https://www.tiktok.com/@niddivfx',
    instagram: 'https://www.instagram.com/niddiyt',
    discord: 'https://discord.gg/vWDnJs2Yej',
    twitter: 'https://x.com/niddi1337',
  },
};

// Kártya-metaadatok (leírás, szín, gombfelirat). `configKey` → a CONFIG.socials kulcsa.
// A `live: true` az ÉLŐ jelzést kapcsolja be a kártyán.
// (Automatikus élő állapothoz Twitch/Kick API + szerveroldali proxy szükséges.)
const SOCIAL_META = [
  {
    key: 'youtube',
    configKey: 'youtube',
    name: 'YouTube',
    description: 'Gameplay videók és kulisszatitkok – iratkozz fel, hogy ne maradj le semmiről!',
    accent: '#ff4d4d',
    cta: 'Megnyitás YouTube-on',
  },
  {
    key: 'twitch',
    configKey: 'twitch',
    name: 'Twitch / Kick',
    description: 'Élő adások és közös játékok. Nézz be a chatbe, szívesen látunk!',
    accent: '#a970ff',
    cta: 'Megnyitás Twitchen',
    live: false,
  },
  {
    key: 'tiktok',
    configKey: 'tiktok',
    name: 'TikTok',
    description: 'Rövid, ütős pillanatok a videóimból – napi adag szórakozás.',
    accent: '#00F0FF',
    cta: 'Megnyitás TikTokon',
  },
  {
    key: 'instagram',
    configKey: 'instagram',
    name: 'Instagram',
    description: 'Képek, storyk és a háttérben zajló munka egy helyen.',
    accent: '#ff4fa3',
    cta: 'Megnyitás Instagramon',
  },
  {
    key: 'discord',
    configKey: 'discord',
    name: 'Discord Szerver',
    handle: 'niddi közösség',
    description: 'Csatlakozz a közösséghez: csevegés, események, nyereményjátékok.',
    accent: '#7289ff',
    cta: 'Csatlakozás a szerverhez',
  },
  {
    key: 'x',
    configKey: 'twitter',
    name: 'X / Threads',
    description: 'Gyors hírek, gondolatok és bejelentések valós időben.',
    accent: '#34F5A4',
    cta: 'Megnyitás X-en',
  },
];

// A felhasználónév az URL utolsó szakaszából (pl. https://x.com/niddi1337 → @niddi1337)
const handleFromUrl = (url, withAt) => {
  const last = (url || '').split(/[?#]/)[0].split('/').filter(Boolean).pop() || '';
  const clean = last.replace(/^@/, '');
  return clean ? (withAt ? `@${clean}` : clean) : '';
};

// Kényelmi hivatkozások a komponensek számára
export const API_KEY = CONFIG.youtube.apiKey;
export const CHANNEL_ID = CONFIG.youtube.channelId;
export const DISCORD_WEBHOOK_URL = CONFIG.discordWebhookUrl;
export const SITE = CONFIG.site;
export const SOCIALS = SOCIAL_META.map(({ configKey, handle, ...meta }) => {
  const url = CONFIG.socials[configKey];
  return { ...meta, url, handle: handle ?? handleFromUrl(url, configKey !== 'twitch') };
});

export const isPlaceholder = (v) => !v || v.startsWith('YOUR_');

export const NAV_LINKS = [
  { id: 'kezdolap', label: 'Kezdőlap' },
  { id: 'rolam', label: 'Rólam' },
  { id: 'kozossegi-media', label: 'Közösségi Média' },
  { id: 'youtube', label: 'YouTube' },
  // { id: 'kapcsolat', label: 'Kapcsolat' },
];

export const ROLES = ['Tartalomkészítő', 'Streamer', 'Videóvágó'];

export const BADGES = ['Tartalomkészítő', 'Streamer', 'Videóvágó', 'Közösségépítő'];

// Bemutató adatok – akkor jelennek meg, ha az API kulcs még nincs beállítva.
export const DEMO_STATS = { subscribers: 12480, views: 1860342, videos: 142 };
export const DEMO_VIDEOS = Array.from({ length: 6 }, (_, i) => ({
  id: `demo-${i}`,
  title: ['Új gameplay sorozat', 'Életem legnagyobb clutch-a', 'Stream kiemelések #12', 'Vágás előtt és után', 'Közösségi est összefoglaló', 'Q&A – kérdeztetek, válaszolok'][i],
  thumbnail: null,
  views: [48210, 31200, 22980, 17640, 12110, 9870][i],
  publishedAt: new Date(Date.now() - i * 6 * 86400000).toISOString(),
  demo: true,
}));
