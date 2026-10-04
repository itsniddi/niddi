import { motion } from 'framer-motion';
import { Clapperboard, Users, Video } from 'lucide-react';
import { BADGES } from '../config';
import Reveal from './ui/Reveal.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import SpotlightCard from './ui/SpotlightCard.jsx';

const VALUES = [
  { icon: Video, title: 'Minőségi tartalom', text: 'Gondosan megtervezett videók és adások, amelyek valódi élményt adnak.' },
  { icon: Users, title: 'Élő közösség', text: 'Jófej emberek, közös játékok és segítőkész hangulat hétről hétre.' },
  { icon: Clapperboard, title: 'Átgondolt vágás', text: 'Tempós, tiszta videóvágás, hogy minden perc megérje a nézést.' },
];

const ROLE_BADGES = ['Tartalomkészítő', 'Streamer', 'Videóvágó'];

export default function About() {
  return (
    <section id="rolam" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Rólam"
          title="Ismerj meg közelebbről"
          subtitle="Tartalom, stream és vágás – egy jófej közösségért."
        />

        <div className="grid gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <SpotlightCard className="h-full p-7 sm:p-10">
              <h3 className="text-3xl font-bold sm:text-4xl">
                Szia, <span className="text-gradient">niddi</span> vagyok!
              </h3>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-white/70 sm:text-[17px]">
                <p>
                  Tartalomkészítéssel, streameléssel és videóvágással foglalkozom. A célom egyszerű: hogy minden
                  videó, élőadás és poszt egy kicsit prémiumabb élményt adjon, mint amit megszoktál.
                </p>
                <p>
                  A csatornámon gameplay videókat és streameket találsz, a Discord szerveren pedig egy befogadó
                  közösség vár, ahol mindenki jófej és segítőkész.
                </p>
                <p>
                  Ha együttműködésben, szponzorációban vagy közös projektben gondolkodsz, írj bátran a Kapcsolat
                  résznél, szívesen beszélgetek veled!
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {BADGES.map((b, i) => (
                  <motion.span
                    key={b}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
                    whileHover={{ y: -3 }}
                    className="font-minecraft rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[13px] tracking-wide text-white/90 transition-colors hover:border-neon-cyan/60 hover:text-white"
                  >
                    {b}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <SpotlightCard
              className="flex h-full flex-col items-center justify-center p-8 text-center"
              color="rgba(255, 255, 255, 0.22)"
            >
              <div className="relative z-10 grid h-44 w-44 place-items-center">
                {/* Légző ambient háttérfény az avatar mögött */}
                <span aria-hidden="true" className="avatar-glow" />
                <span
                  className="absolute inset-0 rounded-full p-[3px]"
                >
                  <img
                    src="/logo.png"
                    alt="niddi profilkép"
                    width="176"
                    height="176"
                    className="h-full w-full rounded-full object-cover"
                  />
                </span>
              </div>

              <p className="font-minecraft profile-name relative z-10 mt-8 text-5xl">niddi</p>
              <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2">
                {ROLE_BADGES.map((b) => (
                  <span
                    key={b}
                    className="font-minecraft rounded-full border border-white/10 bg-black/30 px-3.5 py-2 text-[12px] tracking-wide text-white/90"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="font-minecraft relative z-10 mt-6 flex items-center gap-2 rounded-full bg-neon-emerald/10 px-4 py-2 text-sm font-semibold text-neon-emerald ring-1 ring-neon-emerald/30">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-emerald" />
                Nyitott az együttműködésekre
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <SpotlightCard className="h-full p-7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-white/25 to-grey/25 text-white ring-1 ring-white/15">
                  <Icon size={22} />
                </div>
                <h4 className="text-xl font-bold">{title}</h4>
                <p className="mt-2 text-[15px] text-white/65">{text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
