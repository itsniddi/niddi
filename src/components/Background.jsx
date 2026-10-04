import { motion, useScroll, useTransform } from 'framer-motion';

export default function Background() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -420]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -220]);
  const y3 = useTransform(scrollY, [0, 3000], [0, 300]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space-950">
      <motion.div
        style={{ y: y1 }}
        animate={{ x: [0, 40, -20, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-40 top-[-10%] h-[620px] w-[620px] rounded-full bg-white/10 blur-[130px]"
      />
      <motion.div
        style={{ y: y2 }}
        animate={{ x: [0, -50, 30, 0], scale: [1, 0.94, 1.1, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-48 top-[28%] h-[560px] w-[560px] rounded-full bg-white/5 blur-[140px]"
      />
      <motion.div
        style={{ y: y3 }}
        animate={{ x: [0, 30, -40, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-15%] left-[20%] h-[480px] w-[640px] rounded-full bg-white/[0.12] blur-[150px]"
      />
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 55% at 50% 30%, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 30%, #000 20%, transparent 75%)',
        }}
      />
      <div className="grain absolute inset-0 opacity-[0.07]" />
    </div>
  );
}
