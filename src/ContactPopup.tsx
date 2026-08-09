import { XMarkIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "motion/react";

type ContactPopupProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

export default function ContactPopup({
  open,
  onClose,
  className = "",
}: ContactPopupProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, y: 25, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 25, scale: 0.95 }} transition={{ duration: 0.35 }} className={`fixed bottom-4 right-4 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6 z-50 w-[220px] sm:w-[250px] md:w-[270px] lg:w-[250px] rounded-2xl sm:rounded-3xl border border-blue-500/20 bg-[#171323]/95 backdrop-blur-xl p-3 sm:p-4lg:p-5 shadow-[0_0_40px_rgba(59,130,246,0.18)]
            ${className}`}>
          {/* Close */}


          <button type="button" onClick={onClose} className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-white/40 hover:text-white">
            <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>


          <p className="pr-5 mb-4 text-[11px] leading sm:text-xs sm:leading-6 lg:text-sm lg:leading-7 text-white/80">
            Enjoying the conversation?
            Reach out to Jero directly.
          </p>


          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jeromevargas194@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full
              border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs lg:text-xs font-semibold text-blue-300 transition-all duration-300  hover:bg-blue-500/20 hover:border-blue-400/40">
            Email Jero
            <ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}