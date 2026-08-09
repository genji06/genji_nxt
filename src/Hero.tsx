import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import AIVisual from "./AIVisual";
import type { ElementType } from "react";
import  type { Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};


const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};


const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};



type Particle = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};



function useParticles(count: number): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.round(Math.random() * 100),
        left: Math.round(Math.random() * 100),
        size: 2 + Math.round(Math.random() * 3),
        delay: Math.round(Math.random() * 60) / 10,
        duration:
          Math.round((10 + Math.random() * 10) * 10) / 10,
      })),
    [count]
  );
}



type CardType = {
  icon: ElementType;
  title: string;
  desc: string;
  question: string;
  answer: string;
  keywords?: string[];
  buttons?: string[];
  type?: "projects" | "skills" | "music" | "contact";
  images?: {
    src: string;
    description: string;
  }[];
};



type InfoCardProps = {
  icon: ElementType;
  title: string;
  desc: string;
  onClick: () => void;
};



function InfoCard({
  icon: Icon,
  title,
  desc,
  onClick,
}: InfoCardProps) {

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}

      className="group border border-sky-500/20 bg-white/[0.03] backdrop-blur-xl rounded-2xl py-4 px-5 w-full shadow-[0_0_0px_rgba(56,189,248,0)] transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-500/[0.06] hover:shadow-[0_0_22px_rgba(56,189,248,0.18)]"
    >

      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer flex items-start w-full gap-3 text-left"
      >

        <Icon
          className="w-5 h-5 shrink-0 text-sky-400 transition-transform duration-300 group-hover:scale-110"
        />


        <div className="flex flex-col min-w-0">

          <span className="font-semibold text-gray-100">
            {title}
          </span>


          <p className="text-[12.5px] text-gray-400">
            {desc}
          </p>

        </div>

      </button>

    </motion.div>
  );
}



type HeroProps = {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
};



export default function Hero({
  cards,
  onCardClick,
}: HeroProps): React.ReactElement {


  const prefersReducedMotion = useReducedMotion();

  const particles = useParticles(14);



  return (
    <section className="relative flex min-h-[78vh] w-full items-center overflow-hidden bg-[#0A0F1F] px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-20">


      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />


      <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4 rounded-full" />



      {!prefersReducedMotion &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute rounded-full bg-sky-300/60"

            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
            }}

            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.8, 0.2],
            }}

            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}



      <div className="-mt-4 relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14  lg:grid-cols-[1.05fr_0.95fr]">


        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start text-left"
        >

          <motion.div
            variants={itemVariants}
            className="mt-5 mb-6 flex items-center gap-2 rounded-full border border-sky-400/20 bg-white/[0.03] px-4 py-1.5 backdrop-blur-xl"
          >

            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
            </span>


            <p className="text-[10px] font-medium tracking-[0.2em] text-sky-300/80">
              JERO-NXT.DEV — AI PORTFOLIO ASSISTANT
            </p>

          </motion.div>



          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center lg:hidden mb-4"
          >
            <div className="mt-5 mb-5 scale-[1.25] sm:scale-[1.1]">
              <AIVisual />
            </div>
          </motion.div>



          <motion.h1
            variants={titleVariants}
            className="mt-6 font-poppins text-[40px] font-bold leading-[1.28] tracking-tight text-white sm:text-[56px] lg:text-[64px]">

          <div className="flex flex-col">
              <span className="text-[42px] sm:text-[58px] lg:text-[66px]">
                Hi, I'm Jero.
              </span>

              <span className="text-[28px] sm:text-[40px] lg:text-[48px] bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                Ask me anything
              </span>
          </div>


          </motion.h1>



          <motion.p
            variants={itemVariants}
            className="font-poppins mt-2 max-w-[520px] text-[15px] leading-relaxed text-gray-400 sm:text-[16px]"
          >
            An aspiring software developer building intelligent applications through
            modern technologies, and creative problem-solving — now packaged as a
            portfolio you can actually talk to.
          </motion.p>


        </motion.div>



        <motion.div
          className="hidden lg:flex justify-end"
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.96,
          }}

          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}

          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.2,
          }}
        >

          <AIVisual />

        </motion.div>




        <div className="col-span-full  relative z-20">


          <div className="max-w-7xl mx-auto">

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-sky-300/70 mb-3 sm:mt-5 md:mt-6 lg:mt-5.5 tracking-wide">
              Try one of these to get started ↓
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {cards.map((card) => (
                <InfoCard
                  key={card.title}
                  {...card}
                  onClick={() => onCardClick(card)}
                />
              ))}
            </div>

          </div>

        </div>


      </div>

    </section>
  );
}