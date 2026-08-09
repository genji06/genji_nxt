import { useEffect, useRef, useState } from "react";

import {
  ChevronDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "motion/react";

import Loading from "./Loading.tsx";
import Avatar from "./Avatar.tsx";
import Gallery from "./Gallery.tsx";
import MusicPlayer from "./MusicPlayer.tsx";
import Projects from "./Projects.tsx";
import Skills from "./Skills.tsx";
import ContactLinks from "./ContactLinks.tsx";


type MessageRole = "user" | "assistant";


type MessageType = {
  id: string;
  role: MessageRole;
  content?: string;
  buttons?: string[];
  images?: {
    src: string;
    description: string;
  }[];
  type?: "skills" | "projects" | "music" | "contact" | "contact";
  component?: React.ElementType;
  time?: Date;
  sticker?: string;
};


type MessageProps = {
  messages: MessageType[];
  isTyping: boolean;
  onFollowUp: (
    text: string,
    messageId?: string
  ) => void;
  usedButtons: string[];
  setIsTyping: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  forceScroll: boolean;
};



type TypewriterProps = {
  text: string;
  speed?: number;
  onComplete?: () => void;
   onTyping?: () => void;
};



function Typewriter({
  text,
  speed = 30,
  onComplete,
  onTyping,
}: TypewriterProps): React.ReactNode {

  const [displayLength, setDisplayLength] = useState(0);

  useEffect(() => {
    setDisplayLength(0);

    const interval = setInterval(() => {

      setDisplayLength(prev => {

        if (prev >= text.length) {
          clearInterval(interval);
          onComplete?.();
          return prev;
        }

        onTyping?.();

        return prev + 1;
      });

    }, speed);

    return () => clearInterval(interval);

  }, [text, speed]);

  const visibleText = text.slice(0, displayLength);

  return formatBoldTextWithTyping(
    text,
    visibleText
  );
}

function formatBoldTextWithTyping(
  fullText: string,
  visibleText: string
): React.ReactNode {

  const parts = fullText.split(
    /(\*\*.*?\*\*|\*.*?\*)/g
  );


  let currentLength = 0;


  return parts.map((part, index) => {

    const start = currentLength;
    const end = currentLength + part.length;

    currentLength = end;



    if (visibleText.length <= start) {
      return null;
    }


    const visiblePart = fullText.slice(
      start,
      Math.min(end, visibleText.length)
    );



    if (
      part.startsWith("**") &&
      part.endsWith("**")
    ) {

      return (
        <span
          key={index}
          className="font-bold"
        >
          {visiblePart
            .replace(/\*\*/g, "")}
        </span>
      );
    }



    if (
      part.startsWith("*") &&
      part.endsWith("*")
    ) {

      return (
        <span
          key={index}
          className="italic"
        >
          {visiblePart
            .replace(/\*/g, "")}
        </span>
      );
    }


    return visiblePart;
  });
}


function Message({
  messages,
  isTyping,
  onFollowUp,
  usedButtons,
  setIsTyping,
  forceScroll,
}: MessageProps): React.ReactElement {


  const bottomRef =
    useRef<HTMLDivElement | null>(null);


  const containerRef =
    useRef<HTMLDivElement | null>(null);



  const [showScrollButton, setShowScrollButton] =
    useState<boolean>(false);

const [tappedMessageId, setTappedMessageId] = useState<string | null>(null);


  const [finishedTyping, setFinishedTyping] =
    useState<Record<string, boolean>>({});


  const userScrolled =
    useRef<boolean>(false);



  const [clickedButton, setClickedButton] =
    useState<boolean>(false);



  const [typingTick, setTypingTick] =
    useState<number>(0);


useEffect(() => {

  if (messages.length === 0) return;


  if (userScrolled.current && !forceScroll) return;

  requestAnimationFrame(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });
  });

}, [messages, typingTick, forceScroll]);



  const isTypewriting =
    messages.some(
      msg =>
        msg.role === "assistant" &&
        !finishedTyping[msg.id]
    );

        useEffect(() => {

          if (!isTypewriting) {
            scrollToBottom();
          }

        }, [isTypewriting]);


  useEffect(() => {

    const container =
      containerRef.current;


    if (!container) return;



    const handleScroll = () => {

      const distanceFromBottom =
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight;



      if (distanceFromBottom > 100) {
        userScrolled.current = true;
      } else {
        userScrolled.current = false;
      }



      setShowScrollButton(
        distanceFromBottom > 150 &&
        userScrolled.current
      );

    };



    container.addEventListener(
      "scroll",
      handleScroll
    );



    return () => {

      container.removeEventListener(
        "scroll",
        handleScroll
      );

    };


  }, []);




  function scrollToBottom(): void {

    const container =
      containerRef.current;


    if (!container) return;


    userScrolled.current = false;


    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });


    setShowScrollButton(false);

  }




  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sky-400/40 hover:scrollbar-thumb-sky-400/60"
    >

      <div className="leading-relaxed tracking-[0.2px] flex flex-col gap-10 px-2 sm:px-3 lg:px-8 py-8 max-w-5xl mx-auto w-full">


        {messages.map((msg) => {



          return (
            <div
              key={msg.id} className={`flex  gap-2 ${ msg.role === "user" ? "flex-row-reverse items-end justify-start" : "flex-row items-start justify-start" }`}
            >


              <Avatar
                role={msg.role}
                className={
                  msg.role === "assistant"
                  ? "self-start mt-1 w-7 h-7"
                  : "w-7 h-7"
                }
              />


              <div
                className={`group flex flex-col w-full max-w-[85%] sm:max-w-[85%] md:max-w-xl lg:max-w-xl xl:max-w-xl min-w-0 ${
                  msg.role === "user"
                  ? "items-end"
                  : "items-start"
                }`}
              >


              {msg.content && (
                <div
                  className={`flex items-center gap-2 ${
                    msg.role === "user"
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >


                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 2,
                      scale: 0.98,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}

                    whileHover={{
                      y: -2,
                    }}

                    onClick={() => {
                      setTappedMessageId((prev) =>
                        prev === msg.id ? null : msg.id
                      );
                    }}

                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}

                    className={`leading-relaxed tracking-wide w-fit max-w-full rounded-2xl px-5 py-3 text-sm sm:text-base font-normal backdrop-blur-xl whitespace-pre-wrap break-words transition-all duration-300 ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-sky-500 to-blue-600 text-white"
                        : `bg-white/[0.04] border ${
                            tappedMessageId === msg.id
                              ? "border-sky-400/60 shadow-[0_0_22px_rgba(56,189,248,0.35)] -translate-y-1"
                              : "border-sky-500/15 hover:border-sky-400/40 hover:shadow-[0_0_18px_rgba(56,189,248,0.2)]"
                          } text-gray-200`
                    }`}
                  >

                    {msg.role === "assistant" ? (
                      <Typewriter
                        text={msg.content}
                        speed={20}

                        onTyping={() =>
                          setTypingTick(prev => prev + 1)
                        }

                        onComplete={() => {

                          setFinishedTyping(prev => ({
                            ...prev,
                            [msg.id]: true
                          }));

                          setClickedButton(false);
                          setIsTyping(false);

                        }}
                      />
                    ) : (
                      msg.content
                    )}

                    {msg.component && (
                      <div className="mt-3">
                        <msg.component />
                      </div>
                    )}

                  </motion.div>



                  {msg.role === "user" && msg.time && (
                    <span
                      className={`text-xs text-gray-400 whitespace-nowrap transition-opacity duration-200 ${
                        tappedMessageId === msg.id
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {msg.time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}

                </div>
              )}



                {msg.type === "skills" &&
                  finishedTyping[msg.id] && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.95,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}

                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}

                      className="mt-6 w-full"
                    >
                      <Skills />
                    </motion.div>

                )}



                {msg.type === "music" &&
                  finishedTyping[msg.id] && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.95,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}

                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}

                    className="mt-4 w-full max-w-xl"
                  >
                    <MusicPlayer />
                  </motion.div>

                )}



                  {msg.type === "projects" &&
                    finishedTyping[msg.id] && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.95,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}

                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}

                      className="mt-4 w-full"
                    >
                      <Projects />
                    </motion.div>

                  )}



                    {msg.images &&
                      finishedTyping[msg.id] && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 20,
                          scale: 0.95,
                        }}

                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}

                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                        }}

                        className="mt-4 w-full"
                      >
                        <Gallery images={msg.images} />
                      </motion.div>

                    )}


                    {msg.type === "contact" &&
                  finishedTyping[msg.id] && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.95,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}

                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}

                    className="mt-4 w-full"
                  >

                    <ContactLinks />

                  </motion.div>

                )}

                      {msg.role === "assistant" &&
                      msg.sticker &&
                      finishedTyping[msg.id] && (

                    <motion.img
                      src={msg.sticker}
                      alt="sticker"

                      onClick={() => {
                        setTappedMessageId((prev) =>
                          prev === msg.id ? null : msg.id
                        );
                      }}

                      initial={{
                        opacity: 0,
                      }}

                      animate={{
                        opacity: 1,
                        y: [0, -8, 0],
                      }}

                      transition={{
                        opacity: {
                          duration: 0.3,
                        },
                        y: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}

                      className={`w-42 h-42 object-contain mt-4 cursor-pointer transition-all duration-300 ${
                        tappedMessageId === msg.id
                          ? "drop-shadow-[0_0_20px_rgba(56,189,248,0.55)]"
                          : "hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.35)]"
                      }`}
                    />

                    )}



                {msg.role === "assistant" &&
                  msg.buttons &&
                  finishedTyping[msg.id] &&
                  !usedButtons.includes(msg.id) &&
                  !isTyping && (

                  <div className="flex items-center gap-2 mt-4 flex-wrap">

                    {msg.buttons.map(
                      (btn,index)=>(
                    <motion.button
                      key={index}

                      initial={{
                        opacity: 0,
                        y: 10,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      transition={{
                        duration: 0.3,
                        delay: index * 0.15,
                      }}

                      disabled={isTyping || clickedButton}

                      onClick={() => {
                        if (isTyping || clickedButton) return;

                        setClickedButton(true);

                        onFollowUp(btn, msg.id);
                      }}

                      className="
                        px-4 py-2 text-xs
                        bg-white/[0.08]
                        border border-sky-500/25
                        text-sky-300
                        rounded-2xl
                        transition-all duration-200
                        hover:bg-sky-500/10
                        hover:border-sky-400/50
                        hover:shadow-[0_0_10px_rgba(56,189,248,0.4)]
                        hover:-translate-y-0.5
                        active:scale-95
                      "
                    >

                        <div className="flex items-center justify-center gap-1">

                          <span>{btn}</span>

                          <ArrowRightIcon className="w-3 h-3 shrink-0 translate-y-[1px]"/>

                        </div>

                      </motion.button>
                    ))}

                  </div>

                )}



                  {msg.role === "assistant" &&
                    msg.time && (

                    <span
                      className={`text-xs text-gray-400 mt-1 px-1 transition-opacity duration-200 ${
                        tappedMessageId === msg.id
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {msg.time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  )}


              </div>


            </div>
          );

        })}



        {isTyping &&
          messages[messages.length - 1]?.role === "user" && (

          <div className="flex items-start gap-4 justify-start">

            <Avatar role="assistant"className="w-7 h-7"/>

            <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white/[0.04] border border-sky-500/15 backdrop-blur-xl">

              <Loading/>

            </div>

          </div>

        )}



        <div ref={bottomRef}/>

      </div>




      {showScrollButton && (

        <button
          type="button"
          onClick={scrollToBottom}
          className="sticky bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-2 rounded-full bg-[#0A0F1F]/90 border border-sky-500/30 text-sky-300 text-xs"
        >

          <ChevronDownIcon className="w-4 h-4"/>

          Scroll to bottom

        </button>

      )}

    </div>
  );
}


export default Message;