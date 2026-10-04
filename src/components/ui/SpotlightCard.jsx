import { createElement, useRef } from 'react';

/**
 * Üveg kártya egérkövető "spotlight" fénnyel és ragyogó szegéllyel.
 * `as` – a renderelt elem (div, a, button …), `color` – a fény színe.
 */
export default function SpotlightCard({
  as = 'div',
  children,
  className = '',
  color = 'rgba(255, 255, 255, 0.22)',
  style,
  ...rest
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return createElement(
    as,
    {
      ref,
      onMouseMove: onMove,
      className: `glass spotlight relative overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.025] ${className}`,
      style: { '--spot': color, ...style },
      ...rest,
    },
    <span aria-hidden="true" className="spotlight-layer" />,
    children
  );
}
