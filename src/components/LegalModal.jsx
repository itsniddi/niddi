import Modal from './ui/Modal.jsx';
import { LEGAL_DOCS } from '../data/legal.js';

export default function LegalModal({ docKey, onClose }) {
  const doc = docKey ? LEGAL_DOCS[docKey] : null;

  return (
    <Modal open={!!doc} onClose={onClose} title={doc?.title ?? ''}>
      {doc && (
        <article className="space-y-8 px-5 py-6 text-[15px] leading-relaxed text-muted sm:px-7 sm:py-8">
          <p className="text-xs text-white/35">Utolsó frissítés: {doc.updated}</p>
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h4 className="mb-3 text-base font-bold text-white sm:text-lg">{s.h}</h4>
              {s.p?.map((t) => (
                <p key={t} className="mb-3 last:mb-0">
                  {t}
                </p>
              ))}
              {s.list && (
                <ul className="space-y-2.5">
                  {s.list.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.rows && (
                <dl className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                  {s.rows.map(([k, v]) => (
                    <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-white/40">{k}</dt>
                      <dd className="text-white/85 sm:col-span-2">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          ))}
        </article>
      )}
    </Modal>
  );
}
