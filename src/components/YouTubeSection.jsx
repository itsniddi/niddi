import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Eye, Film, Play, RefreshCw, Users, WifiOff } from 'lucide-react';
import { API_KEY, CHANNEL_ID, DEMO_STATS, DEMO_VIDEOS, SOCIALS, isPlaceholder } from '../config';
import { fetchChannelData } from '../lib/youtube';
import Counter from './ui/Counter.jsx';
import Magnetic from './ui/Magnetic.jsx';
import Modal from './ui/Modal.jsx';
import Reveal from './ui/Reveal.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import SpotlightCard from './ui/SpotlightCard.jsx';

const CHANNEL_URL = SOCIALS.find((s) => s.key === 'youtube')?.url ?? 'https://www.youtube.com';

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });

function StatCard({ icon: Icon, label, value, delay }) {
  return (
    <Reveal delay={delay}>
      <SpotlightCard className="px-6 py-9 text-center sm:py-11" color="rgba(255, 255, 255, 0.22)">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-white/25 to-grey/25 text-white ring-1 ring-white/15">
          <Icon size={26} />
        </div>
        <div className="font-minecraft stat-number whitespace-nowrap !font-bold text-[clamp(2.2rem,11.5vw,3.2rem)] md:text-[clamp(1.7rem,3.5vw,3.2rem)]">
          {value === null ? 'Rejtett' : <Counter value={value} />}
        </div>
        <div className="mt-5 text-base font-semibold text-white/75">{label}</div>
      </SpotlightCard>
    </Reveal>
  );
}

function VideoCard({ video, index, onPlay }) {
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <SpotlightCard
        as="button"
        type="button"
        onClick={() => onPlay(video)}
        aria-label={`Videó lejátszása: ${video.title}`}
        className="group flex h-full w-full flex-col p-3 text-left"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-space-800 ring-1 ring-white/10">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-neon-violet/40 via-space-800 to-neon-cyan/30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
            <Play size={20} fill="currentColor" className="ml-0.5" />
          </span>
        </div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-white">{video.title}</h3>
          <p className="mt-auto pt-3 text-sm text-white/55">
            {video.views.toLocaleString('hu-HU')} megtekintés · {fmtDate(video.publishedAt)}
          </p>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

/* ── Skeleton betöltők: ugyanolyan alakúak, mint a végleges kártyák ── */
function StatSkeleton() {
  return (
    <div className="glass px-6 py-9 sm:py-11" aria-hidden="true">
      <div className="shimmer mx-auto mb-6 h-14 w-14 rounded-2xl" />
      <div className="shimmer mx-auto h-12 w-3/4 rounded-xl" />
      <div className="shimmer mx-auto mt-5 h-4 w-1/2 rounded-full" />
    </div>
  );
}

function VideoSkeleton() {
  return (
    <div className="glass p-3" aria-hidden="true">
      <div className="shimmer aspect-video w-full rounded-2xl" />
      <div className="space-y-3 px-2 pb-2 pt-4">
        <div className="shimmer h-4 w-11/12 rounded-full" />
        <div className="shimmer h-4 w-2/3 rounded-full" />
        <div className="shimmer mt-5 h-3 w-1/2 rounded-full" />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div role="status" aria-live="polite" aria-label="YouTube adatok betöltése">
      <div className="grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
      <div className="mb-6 mt-14 flex items-end justify-between">
        <div className="shimmer h-8 w-56 rounded-full" />
        <div className="shimmer h-11 w-44 rounded-full" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <VideoSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <Reveal>
      <div role="alert" className="glass mx-auto flex max-w-xl flex-col items-center p-10 text-center">
        <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-amber-400/10 text-amber-300 ring-1 ring-amber-300/30">
          <WifiOff size={28} />
        </span>
        <h3 className="text-2xl font-bold">Hoppá, most nem sikerült betölteni</h3>
        <p className="mt-3 text-base text-white/65">
          A YouTube adatok pillanatnyilag nem érhetők el. Próbáld meg újra, vagy nézd meg közvetlenül a csatornát.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button onClick={onRetry} className="btn-primary">
            <RefreshCw size={17} /> Újrapróbálkozás
          </button>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Megnyitás YouTube-on <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function YouTubeSection() {
  const [state, setState] = useState({ status: 'loading', stats: null, videos: [] });
  const [playing, setPlaying] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (isPlaceholder(API_KEY) || isPlaceholder(CHANNEL_ID)) {
      setState({ status: 'demo', stats: DEMO_STATS, videos: DEMO_VIDEOS });
      return undefined;
    }
    let cancelled = false;
    setState({ status: 'loading', stats: null, videos: [] });
    fetchChannelData(API_KEY, CHANNEL_ID)
      .then((d) => !cancelled && setState({ status: 'ready', ...d }))
      .catch(() => !cancelled && setState({ status: 'error', stats: null, videos: [] }));
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  // A bemutató videók nem játszhatók le – a csatornára visz a kattintás.
  const handlePlay = useCallback((video) => {
    if (video.demo) {
      window.open(CHANNEL_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    setPlaying(video);
  }, []);

  const { status, stats, videos } = state;

  return (
    <section id="youtube" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="YouTube"
          title="A csatorna számokban"
          subtitle="Friss adatok közvetlenül a YouTube-ról, és a legújabb videók egy helyen."
        />

        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState onRetry={retry} />}

        {(status === 'ready' || status === 'demo') && (
          <>
            <div id="videok" className="grid gap-5 md:grid-cols-3">
              <StatCard icon={Users} label="Feliratkozók" value={stats.subscribers} delay={0} />
              <StatCard icon={Eye} label="Összes megtekintés" value={stats.views} delay={0.08} />
              <StatCard icon={Film} label="Videók száma" value={stats.videos} delay={0.16} />
            </div>

            <Reveal className="mb-6 mt-14 flex flex-wrap items-end justify-between gap-4">
              <h3 className="text-3xl font-bold sm:text-4xl">Legfrissebb videók</h3>
              <Magnetic strength={0.25}>
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-5 !py-2.5 !text-sm">
                  Megnyitás YouTube-on <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </Reveal>

            {videos.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((v, i) => (
                  <VideoCard key={v.id} video={v} index={i} onPlay={handlePlay} />
                ))}
              </div>
            ) : (
              <p className="text-center text-base text-white/60">Még nincsenek feltöltött videók.</p>
            )}
          </>
        )}
      </div>

      <Modal open={!!playing} onClose={() => setPlaying(null)} title={playing?.title ?? ''} size="xl">
        {playing && (
          <div className="p-3 sm:p-5">
            <iframe
              className="aspect-video w-full rounded-2xl"
              src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`}
              title={playing.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
