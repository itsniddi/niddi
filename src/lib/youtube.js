const BASE = 'https://www.googleapis.com/youtube/v3';
const CACHE_KEY = 'niddi_yt_cache_v1';
const CACHE_TTL = 10 * 60 * 1000; // 10 perc – kíméli az API kvótát

const readCache = (channelId) => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, id, data } = JSON.parse(raw);
    if (id === channelId && Date.now() - at < CACHE_TTL) return data;
  } catch {
    /* nincs gyorsítótár */
  }
  return null;
};

const writeCache = (channelId, data) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), id: channelId, data }));
  } catch {
    /* nem kritikus */
  }
};

const getJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API hiba: ${res.status}`);
  return res.json();
};

export async function fetchChannelData(apiKey, channelId, maxVideos = 6) {
  const cached = readCache(channelId);
  if (cached) return cached;

  const key = encodeURIComponent(apiKey);
  const id = encodeURIComponent(channelId);

  const channel = await getJson(`${BASE}/channels?part=statistics,contentDetails&id=${id}&key=${key}`);
  const item = channel.items?.[0];
  if (!item) throw new Error('A csatorna nem található.');

  const stats = {
    subscribers: item.statistics.hiddenSubscriberCount ? null : Number(item.statistics.subscriberCount),
    views: Number(item.statistics.viewCount),
    videos: Number(item.statistics.videoCount),
  };

  const uploads = item.contentDetails?.relatedPlaylists?.uploads;
  let videos = [];

  if (uploads) {
    const list = await getJson(
      `${BASE}/playlistItems?part=contentDetails&playlistId=${encodeURIComponent(uploads)}&maxResults=${maxVideos}&key=${key}`
    );
    const ids = (list.items || []).map((v) => v.contentDetails.videoId).join(',');
    if (ids) {
      const details = await getJson(`${BASE}/videos?part=snippet,statistics&id=${ids}&key=${key}`);
      videos = (details.items || []).map((v) => {
        const t = v.snippet.thumbnails || {};
        return {
          id: v.id,
          title: v.snippet.title,
          thumbnail: (t.maxres || t.high || t.medium || t.default)?.url ?? null,
          views: Number(v.statistics?.viewCount ?? 0),
          publishedAt: v.snippet.publishedAt,
        };
      });
    }
  }

  const data = { stats, videos };
  writeCache(channelId, data);
  return data;
}
