import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <span className="text-white/30 text-xs font-bold uppercase tracking-[0.22em]">{eyebrow}</span>
      <h2 className="mt-4 text-5xl font-extrabold sm:text-6xl">{title}</h2>
      {subtitle && <p className="mt-5 text-base text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
