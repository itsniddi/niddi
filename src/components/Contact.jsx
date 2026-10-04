import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Clock, Mail, RefreshCw, Send, Sparkles } from 'lucide-react';
import { DISCORD_WEBHOOK_URL, SITE, isPlaceholder } from '../config';
import Magnetic from './ui/Magnetic.jsx';
import Reveal from './ui/Reveal.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import SpotlightCard from './ui/SpotlightCard.jsx';

const EMPTY = { name: '', email: '', subject: '', message: '', website: '', consent: false };
const COOLDOWN_MS = 60 * 60 * 1000; // 1 üzenet / óra / böngésző
const COOLDOWN_KEY = 'niddi_contact_last';
const FIELDS = ['name', 'email', 'subject', 'message', 'consent'];

const validateField = (key, f) => {
  switch (key) {
    case 'name':
      return f.name.trim().length < 2 ? 'Add meg a neved (legalább 2 karakter).' : '';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()) ? '' : 'Érvényes e-mail címet adj meg, pl. anna@pelda.hu.';
    case 'subject':
      return f.subject.trim().length < 3 ? 'Add meg az üzenet tárgyát (legalább 3 karakter).' : '';
    case 'message':
      return f.message.trim().length < 10 ? 'Az üzenet legalább 10 karakter legyen.' : '';
    case 'consent':
      return f.consent ? '' : 'Az üzenet elküldéséhez el kell fogadnod az adatkezelési tájékoztatót.';
    default:
      return '';
  }
};

const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

const buildPayload = (f) => ({
  username: 'niddi.hu űrlap',
  allowed_mentions: { parse: [] },
  embeds: [
    {
      title: '📬 Új üzenet érkezett a weboldalról',
      color: 0x8a2be2,
      fields: [
        { name: '👤 Név', value: clip(f.name.trim(), 200), inline: true },
        { name: '✉️ E-mail cím', value: clip(f.email.trim(), 200), inline: true },
        { name: '📌 Tárgy', value: clip(f.subject.trim(), 250) },
        { name: '💬 Üzenet', value: clip(f.message.trim(), 1000) },
      ],
      footer: { text: 'niddi.hu · kapcsolati űrlap' },
      timestamp: new Date().toISOString(),
    },
  ],
});

/* Címke 6 px-re az inputtól, a hibaüzenet közvetlenül az input alatt, pirosan */
function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-white/90">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-400"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact({ onOpenLegal }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [canRetry, setCanRetry] = useState(false);

  const setError = (key, value) => setErrors((er) => ({ ...er, [key]: value }));

  const onChange = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const next = { ...form, [key]: value };
    setForm(next);
    // Azonnali visszajelzés: amint a mező érintett volt (vagy hibás volt), minden módosításnál újraellenőrizzük
    if (touched[key] || errors[key] || key === 'consent') setError(key, validateField(key, next));
  };

  const onBlur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setError(key, validateField(key, form));
  };

  const fail = (msg, retry = false) => {
    setErrorMsg(msg);
    setCanRetry(retry);
    setStatus('error');
  };

  const send = async () => {
    try {
      const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
      if (Date.now() - last < COOLDOWN_MS) {
        fail('Óránként csak egy üzenet küldhető. Kérlek, próbáld újra később!');
        return;
      }
    } catch {
      /* a localStorage nem elérhető – nem kritikus */
    }

    if (isPlaceholder(DISCORD_WEBHOOK_URL)) {
      fail(`Az űrlap jelenleg nem érhető el. Kérlek, írj nekem az ${SITE.email} címre.`);
      return;
    }

    setStatus('sending');
    setCanRetry(false);
    try {
      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(form)),
      });
      if (!res.ok) throw new Error('send-failed');
      try {
        localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      } catch {
        /* nem kritikus */
      }
      setForm(EMPTY);
      setTouched({});
      setErrors({});
      setStatus('success');
    } catch {
      fail('Nem sikerült elküldeni az üzenetet. Ellenőrizd az internetkapcsolatod, majd próbáld újra.', true);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Honeypot: a robotok kitöltik, az emberek nem látják – csendben megszakítjuk, a webhook nem hívódik meg.
    if (form.website) return;

    const all = Object.fromEntries(FIELDS.map((k) => [k, validateField(k, form)]));
    setErrors(all);
    setTouched(Object.fromEntries(FIELDS.map((k) => [k, true])));
    const firstBad = FIELDS.find((k) => all[k]);
    if (firstBad) {
      document.getElementById(firstBad)?.focus();
      return;
    }

    send();
  };

  const inputProps = (key) => ({
    id: key,
    value: form[key],
    onChange: onChange(key),
    onBlur: onBlur(key),
    'aria-invalid': !!errors[key],
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
    className: 'input-glass',
  });

  return (
    <section id="kapcsolat" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Kapcsolat"
          title="Dolgozzunk együtt"
          subtitle="Együttműködés, megkeresés vagy egy egyszerű köszönés – írj bátran, válaszolok."
        />

        <div className="grid gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <SpotlightCard className="flex h-full flex-col p-7 sm:p-9" color="rgba(0, 240, 255, 0.2)">
              <h3 className="text-3xl font-bold">Beszéljünk!</h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                Szponzoráció, közös tartalom, média megkeresés vagy ötlet – töltsd ki az űrlapot, és az üzeneted
                közvetlenül hozzám érkezik.
              </p>
              <ul className="mt-8 space-y-5 text-base">
                <li className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.07] text-neon-cyan ring-1 ring-white/15">
                    <Mail size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-white/55">E-mail</p>
                    <a href={`mailto:${SITE.email}`} className="font-semibold text-white transition hover:text-neon-cyan">
                      {SITE.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.07] text-neon-violet ring-1 ring-white/15">
                    <Clock size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-white/55">Válaszidő</p>
                    <p className="font-semibold text-white">Általában 1–2 munkanap</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.07] text-neon-emerald ring-1 ring-white/15">
                    <Sparkles size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-white/55">Miben segíthetek?</p>
                    <p className="font-semibold text-white">Együttműködés · Szponzoráció · Média</p>
                  </div>
                </li>
              </ul>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="glass relative min-h-[560px] overflow-hidden p-6 sm:p-9">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[500px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                      className="grid h-24 w-24 place-items-center rounded-full bg-neon-emerald/10 text-neon-emerald ring-1 ring-neon-emerald/40"
                      style={{ boxShadow: '0 0 60px -10px rgba(52,245,164,0.7)' }}
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <h3 className="mt-8 text-3xl font-bold">Üzenet sikeresen elküldve!</h3>
                    <p className="mt-3 max-w-sm text-base text-white/65">Köszönöm a megkeresést, hamarosan válaszolok.</p>
                    <button onClick={() => setStatus('idle')} className="btn-ghost mt-8 !px-6 !py-2.5 !text-sm">
                      Új üzenet írása
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="name" label="Név" error={errors.name}>
                        <input {...inputProps('name')} autoComplete="name" maxLength={100} placeholder="Kovács Anna" />
                      </Field>
                      <Field id="email" label="E-mail cím" error={errors.email}>
                        <input
                          {...inputProps('email')}
                          type="email"
                          autoComplete="email"
                          maxLength={150}
                          placeholder="anna@pelda.hu"
                        />
                      </Field>
                    </div>

                    <Field id="subject" label="Tárgy" error={errors.subject}>
                      <input {...inputProps('subject')} maxLength={120} placeholder="Együttműködési ajánlat" />
                    </Field>

                    <Field id="message" label="Üzenet" error={errors.message}>
                      <textarea
                        {...inputProps('message')}
                        rows={6}
                        maxLength={1500}
                        placeholder="Írd le, miben segíthetek…"
                        className="input-glass resize-none"
                      />
                      <p className="mt-1.5 text-right text-xs text-white/40">{form.message.length}/1500</p>
                    </Field>

                    {/* Honeypot – emberek számára láthatatlan, robotok kitöltik */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ display: 'none' }}
                      value={form.website}
                      onChange={onChange('website')}
                    />

                    <div>
                      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/70">
                        <input
                          id="consent"
                          type="checkbox"
                          checked={form.consent}
                          onChange={onChange('consent')}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.consent}
                          aria-describedby={errors.consent ? 'consent-error' : undefined}
                          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-violet-500"
                        />
                        <span>
                          Elfogadom az{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegal('privacy')}
                            className="font-semibold text-neon-cyan underline-offset-4 hover:underline"
                          >
                            Adatkezelési Tájékoztatót
                          </button>
                          <span aria-hidden="true" className="ml-0.5 text-red-400">*</span>
                        </span>
                      </label>
                      <AnimatePresence initial={false}>
                        {errors.consent && (
                          <motion.p
                            id="consent-error"
                            role="alert"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-400"
                          >
                            <AlertCircle size={15} className="mt-0.5 shrink-0" />
                            <span>{errors.consent}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          role="alert"
                          initial={{ opacity: 0, x: 0 }}
                          animate={{ opacity: 1, x: [0, -10, 10, -6, 6, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="flex items-start gap-3">
                            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                            <span>{errorMsg}</span>
                          </span>
                          {canRetry && (
                            <button
                              type="button"
                              onClick={send}
                              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold text-white transition hover:bg-white/20"
                            >
                              <RefreshCw size={15} /> Újrapróbálkozás
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 16 px (gap) + 8 px = 24 px távolság a gomb felett */}
                    <div className="mt-2">
                      <Magnetic strength={0.2} className="w-full sm:w-auto">
                        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto">
                          {status === 'sending' ? (
                            <span className="flex items-center gap-2">
                              Küldés folyamatban
                              <span className="flex gap-1" aria-hidden="true">
                                {[0, 1, 2].map((i) => (
                                  <motion.span
                                    key={i}
                                    className="h-1.5 w-1.5 rounded-full bg-white"
                                    animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                                  />
                                ))}
                              </span>
                            </span>
                          ) : (
                            <>
                              Üzenet küldése <Send size={17} />
                            </>
                          )}
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
