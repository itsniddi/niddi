import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ROLES } from '../config';
import { useTypewriter } from '../hooks/useTypewriter';
import { scrollToId } from '../lib/scroll';
import Magnetic from './ui/Magnetic.jsx';

const enter = (delay) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const role = useTypewriter(ROLES);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 110]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section id="kezdolap" className="relative flex min-h-[100svh] items-center justify-center px-5 pb-24 pt-32">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-5xl text-center">
        {/* <motion.div
          {...enter(0.1)}
          className="font-minecraft glass mx-auto mb-8 inline-flex items-center gap-2.5 !rounded-full px-4 py-2 text-xl font-medium text-white/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
          </span>
          <span id="greeting-label">Üdv a niddi.hu-n</span>
        </motion.div> */}

        <motion.h1
          {...enter(0.2)}
          className="text-[3rem] font-extrabold leading-[1.02] sm:text-7xl md:text-7xl lg:text-[5.6rem]"
        >
          Digitális Tartalomkészítés <span className="text-white/40">&</span>{' '}
          <span className="text-gradient">Prémium Videóvágás</span>
        </motion.h1>

        <motion.p
          {...enter(0.35)}
          aria-label={`Szerepeim: ${ROLES.join(', ')}`}
          className="mt-8 flex min-h-[2.2rem] items-center justify-center text-xl font-medium text-white/90 sm:text-2xl"
        >
          <span className="mr-2 text-muted">Én vagyok a</span>
          <span className="text-white font-minecraft">{role}</span>
          <span className="caret" aria-hidden="true" />
        </motion.p>

        <motion.p {...enter(0.45)} className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
          Videók, élő adások és egy befogadó közösség – minden egy helyen. Csatlakozz, és légy része az élménynek.
        </motion.p>

        <motion.div {...enter(0.6)} className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <button onClick={() => scrollToId('kozossegi-media')} className="btn-primary">
              Közösségi felületek
            </button>
          </Magnetic>
          <Magnetic>
            <button onClick={() => scrollToId('videok')} className="btn-ghost">
              Videóim
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId('rolam')}
        aria-label="Görgess lejjebb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 transition hover:text-white"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
