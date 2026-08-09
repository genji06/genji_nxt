import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";

interface SplashScreenProps {
  onFinish: () => void;
  minDuration?: number;
}

interface ParticleData {
  id: number;
  left: number;
  top: number;
  size: number;
  drift: number;
  driftX: number;
  duration: number;
  delay: number;
  baseOpacity: number;
}

const BOOT_LINES: string[] = [
  "booting jerogpt.dev",
  "loading profile → jero",
  "compiling identity...",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.9 },
  },
};

const bootLineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 0.7,
      times: [0, 0.15, 0.75, 1],
      delay: i * 0.42,
    },
  }),
};

const particleVariants: Variants = {
  animate: (custom: ParticleData) => ({
    y: [0, custom.drift, 0],
    x: [0, custom.driftX, 0],
    opacity: [
      custom.baseOpacity * 0.4,
      custom.baseOpacity,
      custom.baseOpacity * 0.4,
    ],
    transition: {
      duration: custom.duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: custom.delay,
    },
  }),
};

const ringVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 3.2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const dotVariants: Variants = {
  animate: (i: number) => ({
    opacity: [0.25, 1, 0.25],
    scale: [0.85, 1.15, 0.85],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.18,
    },
  }),
};

const PARTICLES: ParticleData[] = Array.from(
  { length: 22 },
  (_, i): ParticleData => {
    const seed = i * 137.5;

    return {
      id: i,
      left: seed % 100,
      top: (seed * 1.7) % 100,
      size: 1 + (i % 3) * 0.8,
      drift: -14 - (i % 5) * 4,
      driftX: (i % 2 === 0 ? 1 : -1) * (6 + (i % 4) * 3),
      duration: 4 + (i % 6),
      delay: (i % 7) * 0.3,
      baseOpacity: 0.25 + (i % 4) * 0.12,
    };
  }
);

function Particle({ p }: { p: ParticleData }): React.ReactElement {
  return (
    <motion.span
      custom={p}
      variants={particleVariants}
      animate="animate"
      className="absolute rounded-full bg-sky-300"
      style={{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: p.size,
        height: p.size,
        boxShadow: "0 0 6px rgba(56,189,248,0.8)",
      }}
    />
  );
}

function CircuitLines(): React.ReactElement {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.07]"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="circuit-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g stroke="url(#circuit-fade)" strokeWidth="1" fill="none">
        <path d="M0 120 H220 V260 H480 V90 H800" />
        <path d="M0 420 H160 V320 H360 V500 H620 V420 H800" />
        <path d="M100 0 V70 H60 V180" />
        <path d="M700 600 V480 H760 V380" />
      </g>

      <g fill="#38BDF8">
        <circle cx="220" cy="120" r="3" />
        <circle cx="480" cy="260" r="3" />
        <circle cx="360" cy="420" r="3" />
        <circle cx="620" cy="500" r="3" />
      </g>
    </svg>
  );
}

export default function SplashScreen({
  onFinish,
  minDuration = 2600,
}: SplashScreenProps): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

return (
  <AnimatePresence onExitComplete={onFinish}>
    {visible && (
      <motion.div
        key="splash"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0A0F1F]">

        
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(56,189,248,0.14),transparent)]" />

        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_50%_55%,rgba(56,189,248,0.10),transparent)]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}/>

        
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}/>

        <CircuitLines />

        
        <div className="pointer-events-none absolute inset-0">
          {PARTICLES.map((p) => (
            <Particle key={p.id} p={p} />
          ))}
        </div>

        
        <div className="relative z-10 flex flex-col items-center px-6 text-center">

          
          <div className="mb-6 h-5 font-mono text-[11px] tracking-wide text-sky-400/70">
            {BOOT_LINES.map((line, i) => (
              <motion.p
                key={line}
                custom={i}
                variants={bootLineVariants}
                initial="hidden"
                animate="visible"
                className="absolute left-1/2 -translate-x-1/2">
                <span className="text-sky-500/60">$</span> {line}
              </motion.p>
            ))}
          </div>


          
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="relative">
            <h1 className="relative select-none text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">

              <span className="bg-gradient-to-br from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
                Jero
              </span>

              <span className="bg-gradient-to-br from-sky-400 to-blue-500 bg-clip-text text-transparent">
                NXT
              </span>

              <span className="text-sky-500/60">
                .dev
              </span>

            </h1>

              <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-transparent via-white/60 to-transparent"

              style={{
                mixBlendMode: "overlay",
              }}
              initial={{ x: "-100%", }}
              animate={{ x: "300%", }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut", }}
            />
          </motion.div>


          
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 text-xs font-medium uppercase tracking-[0.35em] text-gray-400">
            personal ai · built by jero
          </motion.p>


          
          <div className="mt-10 flex flex-col items-center gap-4">

            <div className="relative h-10 w-10">
              <motion.span
                variants={ringVariants}
                animate="animate"
                className="absolute inset-0 rounded-full border-2 border-sky-400/20 border-t-sky-400"/>
            </div>


            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={dotVariants}
                  animate="animate"
                  className="h-1.5 w-1.5 rounded-full bg-sky-400"/>
              ))}
            </div>

          </div>

        </div>


        
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_45%,rgba(10,15,31,0.85)_100%)]" />

      </motion.div>
    )}
  </AnimatePresence>
);
}