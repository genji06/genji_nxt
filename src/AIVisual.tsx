import React from "react";
import type { Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import Avatar from "./Avatar.tsx";


const QUESTION: string = "Who is Jero?";

const ANSWER: string =
  "An aspiring software developer turning ideas into meaningful applications.";

const floatVariants: Variants = {
  animate: {
    y: [0, -14, 0],
    rotate: [0, 1.2, 0, -1.2, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const ringVariants: Variants =  {
  animate: {
    rotate: 360,
    transition: {
      duration: 24,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function AIVisual(): React.ReactElement {
  const prefersReducedMotion = useReducedMotion();

  const [typed, setTyped] = useState<string>("");

  const indexRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(ANSWER);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      if (indexRef.current < ANSWER.length) {
        indexRef.current += 1;

        setTyped(ANSWER.slice(0, indexRef.current));

        timeout = setTimeout(startTyping, 90);
      } else {
        timeout = setTimeout(() => {
          indexRef.current = 0;
          setTyped("");
          startTyping();
        }, 3000);
      }
    };

    timeout = setTimeout(startTyping, 2000);

    return () => clearTimeout(timeout);

  }, [prefersReducedMotion]);


  return (
    <div
      className="relative mx-auto flex h-[180px] w-[180px] sm:h-[280px] sm:w-[280px] lg:h-[360px] lg:w-[320px] items-center justify-center">

      <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-[90px]" />

      <motion.div
        variants={ringVariants}
        animate={prefersReducedMotion ? undefined : "animate"}
        className="absolute h-[190px] w-[190px] rounded-full border-5 border-sky-100/15 sm:h-[240px] sm:w-[240px] md:h-[320px] md:w-[320px] lg:h-[380px] lg:w-[380px]">
        <span
          className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-sky-100 shadow-[0_0_10px_3px_rgba(56,189,248,0.7)]"/>
      </motion.div>


      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: -360,
                transition: {
                  duration: 34,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
        }
        className="absolute h-[150px] w-[150px] rounded-full border-2 border-dashed border-sky-400/10 sm:h-[190px] sm:w-[190px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px]"/>


      <motion.div
        variants={floatVariants}
        animate={prefersReducedMotion ? undefined : "animate"}
        className="relative z-10 w-[140px] rounded-lg border border-sky-400/15 bg-white/[0.04] p-2 shadow-[0_8px_40px_rgba(2,6,23,0.6)] backdrop-blur-2xl sm:w-[200px] sm:rounded-xl sm:p-3 md:w-[260px] md:rounded-2xl md:p-4 g:w-[320px]">

        <div
          className="mb-1.5 flex items-center gap-1 border-b border-white/5 pb-1.5 sm:mb-3 sm:gap-2 sm:pb-3">

          <span className="relative flex h-1.5 w-1.5 shrink-0 sm:h-2 sm:w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400 sm:h-2 sm:w-2" />
          </span>


          <p
            className="truncate text-[6px] font-medium tracking-[0.08em] text-sky-300/80 sm:text-[9px] sm:tracking-[0.15em] md:text-[11px]">
            JERO — ONLINE
          </p>


            <Avatar
              role="assistant"
              className="ml-auto h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10"/>
        </div>


        <div className="flex flex-col gap-1 sm:gap-2.5">

          <div
            className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-sky-500/15 px-1.5 py-1 text-[7px] text-sky-100 sm:rounded-xl sm:px-3 sm:py-2 sm:text-[10px] md:text-[12.5px]">
            {QUESTION}
          </div>


          <div
            className="mr-auto min-h-[26px] max-w-[90%] rounded-lg rounded-tl-sm bg-white/[0.05] px-1.5 py-1 text-[7px] leading-relaxed text-gray-300 sm:min-h-[52px] sm:rounded-xl sm:px-3 sm:py-2 sm:text-[10px] md:text-[12.5px]">
            {typed}

            <span
              className="ml-0.5 inline-block h-2 w-[1.5px] translate-y-[1px] animate-pulse bg-sky-400 sm:h-3 sm:w-[2px]"/>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

