import { Fragment } from 'react';
import { LEGAL_LIST } from '../data/legal.js';
import { scrollToId } from '../lib/scroll';

export default function Footer({ onOpenLegal }) {
  return (
    <footer className="relative px-5 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-3 gap-5 border-t border-white/[0.07] pt-8 text-center sm:flex-row sm:text-left">
          <button
            onClick={() => scrollToId('kezdolap')}
            aria-label="Vissza a lap tetejére"
            className="flex jusitfy-self-start items-center gap-2.5"
          >
            <img src="/logo.png" alt="" width="28" height="28" className="h-7 w-7 rounded-full" />
            <span className="font-minecraft text-white glow-text-white !font-bold text-2xl">niddi</span>
          </button>
          <p className="text-sm text-muted text-center">© 2026 niddi.hu - Minden jog fenntartva.</p>
          {/* <nav
            aria-label="Jogi dokumentumok"
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-white/45"
          >
            {LEGAL_LIST.map(({ key, label }, i) => (
              <Fragment key={key}>
                {i > 0 && <span aria-hidden="true">·</span>}
                <button
                  type="button"
                  onClick={() => onOpenLegal(key)}
                  className="rounded px-1 py-0.5 transition-colors hover:text-white"
                >
                  {label}
                </button>
              </Fragment>
            ))}
          </nav> */}
        </div>
      </div>
    </footer>
  );
}
