import { ArrowUpRight, Instagram, Disc, Music2, Twitch, Twitter, Youtube } from 'lucide-react';
import { SiDiscord, SiYoutube, SiTwitch, SiTiktok, SiInstagram, SiX } from '@icons-pack/react-simple-icons';
import { SOCIALS } from '../config';
import Reveal from './ui/Reveal.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import SpotlightCard from './ui/SpotlightCard.jsx';

const ICONS = {
  youtube: SiYoutube,
  twitch: SiTwitch,
  tiktok: SiTiktok,
  instagram: SiInstagram,
  discord: SiDiscord,
  x: SiX,
};

function LiveBadge({ live }) {
  if (live === undefined) return null;
  return live ? (
    <span className="flex items-center gap-2 rounded-full bg-red-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-red-300">
      <span className="live-dot h-2.5 w-2.5 rounded-full bg-red-500" />
      Élő
    </span>
  ) : (
    <span className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60">
      <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
      Offline
    </span>
  );
}

export default function Socials() {
  return (
    <section id="kozossegi-media" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Közösségi Média"
          title="Találkozzunk bárhol"
          subtitle="Kövess a kedvenc felületeden, és ne maradj le egyetlen új tartalomról sem."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOCIALS.map((s, i) => {
            const Icon = ICONS[s.key];
            return (
              <Reveal key={s.key} delay={(i % 3) * 0.08} className="h-full">
                <SpotlightCard
                  as="a"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color={`${s.accent}45`}
                  aria-label={`${s.name} – ${s.handle} (új lapon nyílik meg)`}
                  className="group flex h-full flex-col p-8 sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="grid h-16 w-16 place-items-center rounded-2xl ring-1 ring-white/15"
                      style={{
                        background: `linear-gradient(135deg, ${s.accent}40, ${s.accent}14)`,
                        color: s.accent,
                        boxShadow: `0 0 28px -6px ${s.accent}66`,
                      }}
                    >
                      <Icon size={30} />
                    </div>
                    <LiveBadge live={s.live} />
                  </div>

                  <h3 className="mt-7 text-3xl font-bold">{s.name}</h3>
                  <p className="mt-1 text-lg font-semibold" style={{ color: s.accent }}>
                    {s.handle}
                  </p>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-white/70">{s.description}</p>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <span className="text-base font-semibold text-white/80 transition-colors group-hover:text-white">
                      {s.cta}
                    </span>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight
                        size={22}
                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
