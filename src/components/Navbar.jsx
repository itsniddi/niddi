import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../config';
import { scrollToId } from '../lib/scroll';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('kezdolap');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4"
    >
      <div className="relative w-full max-w-5xl">
        <nav
          aria-label="Fő navigáció"
          className={`glass flex items-center justify-between rounded-full px-3 py-2 transition-colors duration-500 sm:px-4 ${
            scrolled ? '!bg-black/45' : ''
          }`}
        >
          <button
            onClick={() => go('kezdolap')}
            aria-label="niddi – vissza a kezdőlapra"
            className="relative flex h-11 items-center gap-3 rounded-full py-1 pl-1 pr-4"
          >
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-40 blur-xl" />
            <img
              src="/logo.png"
              alt=""
              width="36"
              height="36"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-minecraft glow-text-white !font-bold text-[28px] text-white leading-none">niddi</span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === l.id ? 'text-white' : 'text-muted hover:text-white'
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="glass absolute inset-x-0 top-full mt-2 flex flex-col gap-1 bg-[#242424]/92 p-3 lg:hidden"
            >
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition ${
                      active === l.id ? 'bg-white/[0.08] text-white' : 'text-muted hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
