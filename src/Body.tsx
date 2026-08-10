import { useState, useRef, useEffect } from "react";
import {
  ArrowUpCircleIcon,
  BookOpenIcon,
  FolderIcon,
  CodeBracketIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

import { motion, AnimatePresence } from "motion/react";

import Hero from "./Hero.tsx";
import Footer from "./Footer.tsx";
import Message from "./Message.tsx";
import { NAV_SECTIONS, type NavItemType, type NavImage} from "./Header.tsx";
import ContactPopup from "./ContactPopup.tsx";

import Coffee from "./assets/images/coffee.png";
import Laugh from "./assets/images/laugh.png";
import Music from "./assets/images/music.png";
import Peace from "./assets/images/peace.png";
import Pose from "./assets/images/pose.png";
import Stare from "./assets/images/stare.png";
import Think from "./assets/images/think.png";
import Thumb from "./assets/images/thumb.png";
import Work from "./assets/images/work.png";
import Write from "./assets/images/write.png";



type CardType = "projects" | "skills" | "music" | "contact";


type Card = {
  icon: React.ElementType;
  title: string;
  desc: string;
  question: string;
  answer: string;
  keywords?: string[];
  buttons?: string[];
  type?: CardType;
  sticker?: string;
  images?: NavImage[];
};


type PersonalType = {
  question: string;
  answer: string;
  buttons: string[];
  keywords: string[];
  sticker: string;
  type?: CardType;
  images?: NavImage[];
};


type MusicType = {
  question: string;
  answer: string;
  keywords: string[];
  type: "music";
  buttons: string[];
  images?: NavImage[];
  sticker?: string;
};


type RandomAnswerType = {
  answer: string;
  buttons: string[];
};


type PersonalQuestionType = {
  question: string;
  answer: string;
  keywords: string[];
  buttons: string[];
  type?: CardType;
  images?: NavImage[];
  sticker?: string;
};


type MessageType = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  buttons?: string[];
  images?: NavImage[];
  type?: CardType;
  sticker?: string;
};

type KeywordAnswerType = {
  answers: string[];
  keywords: string[];
  buttons?: string[];
  images?: NavImage[];
  type?: CardType;
  sticker?: string;
};


type BodyProps = {
  messages: MessageType[];
  setMessages: React.Dispatch<
    React.SetStateAction<MessageType[]>
  >;

  input: string;
  setInput: React.Dispatch<
    React.SetStateAction<string>
  >;

  addMessage: (
    role: "user" | "assistant",
    content: string,
    buttons?: string[],
    images?: NavImage[],
    type?: CardType,
    sticker?: string
  ) => void;

  isTyping: boolean;

  setIsTyping: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  usedButtons: string[];

  setUsedButtons: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};




const STICKERS = {
  coffee: Coffee,
  laugh: Laugh,
  music: Music,
  peace: Peace,
  pose: Pose,
  stare: Stare,
  think: Think,
  thumb: Thumb,
  work: Work,
  write: Write,
};




const CARDS: Card[] = [
  {
    icon: BookOpenIcon,

    title: "From Curiosity To Code",

    desc: "The story behind my growth as a developer",

    question:
`Tell me how your curiosity shape your journey as a aspiring software developer`,

answer:
`My journey in technology began with a strong **curiosity** about how systems work and how ideas can be transformed into practical solutions. 

During my first year in Information Technology, I was introduced to **programming**, which sparked my interest in building applications and developing websites that address real-world problems.

As I explored mobile, web, backend development, and UI/UX design, every project helped me **grow** my skills and mindset. Today, my curiosity continues to drive me to learn, create, and build meaningful solutions through technology.

What would you like to explore?`,

    keywords: [
      "curiosity",
      "started",
      "beginning",
      "journey",
      "growth",
      "motivation",
      "inspiration",
    ],

    buttons: [
      "Studying",
      "Built Projects",
      "Certifications",
    ],

    sticker: STICKERS.think,
  },




  {
    icon: FolderIcon,

    title: "Featured Projects",

    desc: "Real apps, real solutions, real experiences",

    question:
      `What projects showcase your skills and experience?`,

    answer:
      "I've created **projects** that turn ideas into real solutions, mobile apps, and interactive systems focused on solving **real-world problems** while helping me grow as a developer.",

    type: "projects",

    keywords: [
      "project",
      "built",
      "build",
      "systems",
      "solution",
      "create",
    ],

    buttons: [
      "Tech Stack",
      "Achievements",
      "About me",
    ],

  },




  {
    icon: CodeBracketIcon,

    title: "Building with Technology",

    desc:
      "The tools that I use to turn ideas into real solutions",

    question:
      "What technologies help you build your projects?",

    answer:
      `My development experience covers **mobile, web, backend, and design** — allowing me to build projects from concept to implementation.

For mobile applications, I work with Android development using **Java, XML, and Android Studio**, focusing on clean architecture, smooth performance, and reliable local data management with SQLite.

For web development, I use **React and TypeScript** with modern styling tools like **Tailwind CSS** and also **Bootstrap** to create responsive and interactive interfaces. I also work with Node.js backend services.

I’m continuously expanding my skills in scalable backend development, cloud deployment, and advanced Java.

What would you like to know?`,

    keywords: [
      "stack",
      "tech",
      "tools",
      "technology",
      "technologies",
      "language",
      "languages",
      "framework",
      "frameworks"
    ],

    sticker: STICKERS.write,

    buttons: [
      "Built projects",
      "Certifications",
      "Studying",
    ],

    type: "skills",
  },




  {
    icon: BriefcaseIcon,

    title:
      "Let's Connect",

    desc:
      "Open for internships, partnerships, and collaborations",

    question:
      "Are you available for opportunities?",

    answer:
      `I'm open to **internships**, collaborations, and opportunities where I can learn, contribute, and build meaningful solutions. For now, I’m still learning and continuously improving my skills as I gain more experience through different projects and experiences.

I’ve been exploring mobile, web, backend, and UI/UX development, and I’m excited to keep **growing** while connecting with people that share the same passion for technology and innovation.

What are you curious about?`,

    keywords: [
      "work",
      "internship",
      "job",
      "hire",
      "collab",
      "collaborate",
      "opportunity",
      "available",
      "connect",
    ],

    sticker: STICKERS.pose,

    buttons: [
      "About me",
      "Achievements",
      "Certifications",
    ],
  },
];


const KEYWORD_ANSWERS: KeywordAnswerType[] = [
  {
    answers: [
      "Hello! It’s nice to have you here. I’d be happy to share more about my projects, skills, and journey as a developer.\n\nWhat would you like to explore?",

      "Hey! Welcome to my portfolio. Feel free to explore my projects, technologies, experiences, and goals as I continue growing as a developer.\n\nWhere would you like to start?",

      "Hi there! Glad to have you here. There’s plenty to discover about my work, skills, and journey in technology.\n\nWhat are you curious about?",
    ],

    keywords: [
      "hello",
      "hi",
      "hey",
      "hello there",
    ],

    sticker: STICKERS.pose,


    buttons: [
      "Built projects",
      "Tech Stack",
      "About me",
    ],
  },

  {
    answers: [
  "Good to see you! Feel free to explore my portfolio and learn more about what I’ve built, the technologies I use, and where I’m heading as a developer.\n\nWhere would you like to start?",

  "Welcome! There’s plenty to explore here, from my projects and technical skills to my experiences and goals as a developer.\n\nWhat would you like to explore?",

  "Nice to have you here! You can learn more about the projects I’ve built, the technologies I work with, and my journey as I continue growing as a developer.\n\nWhat are you curious about?",

  "Hey! Feel free to take a look around and discover more about my work, skills, projects, and experiences in technology.\n\nWhere should we begin?",
],

    keywords: [
      "morning",
      "afternoon",
      "evening",
    ],
    buttons: [
      "Achievements",
      "Certifications",
      "Studying",
    ],

  },

    {
    answers: [
      "Thank you! I really appreciate that.\n\nAnyway, what would you like to explore?",

      "Aww, thank you! Glad you like it!",

      "Thank you! Still learning and improving, but I’m happy you like it.",

      "Ayy, thank you! I really appreciate that. I'm glad you like it"
    ],

    keywords: [
      "galing",
      "lupet",
      "angas",
      "wow",
      "nice",
      "solid"
    ],

    sticker: STICKERS.stare,

    buttons: [
      "Contact me",
      "Tech Stack",
      "Awards",
    ],
  },

    {
    answers: [
      "Secret po baka kilala mo. Curious yern? HAHAHAHAH",

      "Hmmmmm, bakit mo natanong? hehe secret."
    ],

    keywords: [
      "crush"
    ],

    sticker: STICKERS. peace,

    buttons: [
      "About me",
      "Contact me",
      "Awards",
    ],
  },

  {
    answers: [
      "Aba naku, tawang tawa ha. Anong i-rereply ko sa tawa mo? HAHAHAHAH eme.\n\nAnyway, what would you like to explore?",

      "Aba, may tawa! HAHAHAHA Glad you're having fun here.\n\nAnyway, what would you like to explore?"
    ],

    keywords: [
      "haha",
      "hehe",
      "lol"
    ],


    sticker: STICKERS.laugh,

    buttons: [
      "Built projects",
      "About me",
      "Achievements",
    ],
  },





];


const PERSONAL: PersonalType = {
  question:
    "Tell me about your personal side",

  answer:
`Beyond programming, I enjoy exploring different ways to express **creativity** and experience new things. I like capturing moments through photography and videography, turning simple experiences into meaningful stories through visuals.

I also enjoy **playing guitar**, which gives me a different way to relax and express myself outside of technology. Aside from creative hobbies, I love **riding different kinds of motorcycles** because it gives me a sense of adventure, freedom, and appreciation for the journey.

These hobbies allow me to stay connected with creativity, exploration, and the things that inspire me beyond the world of coding.

What interests you?`,

  sticker: STICKERS.pose,

  keywords: [
    "personal",
    "yourself",
    "life"

  ],

buttons: [
  "Music",
  "Riding",
  "Guitar",
],

};



const MUSIC: MusicType = {
  question:
    "What musics are you listening to?",

  answer:
    `My main taste still revolves around **Pop Rock**, but I have a deep appreciation for the timeless sound of 80s and 90s music. Those classic songs carry a certain warmth, emotion, and nostalgia that makes them stand out even today.

Tracks from **Journey**, iconic 80s ballads, and smooth slow R&B songs are the kind of music I can always come back to and never get tired of.

Recently, I’ve also been enjoying songs like *Joji* by Sanctuary, *It’s Not Living (If It’s Not With You)* by The 1975, and *ILYSB* by Lany, which have become part of my growing playlist

What would you like to explore?`,

  keywords: [
    "listen",
    "music",
    "musics",
    "songs",
    "playlist",
    "listening",
    "artists",
    "genres",
    "melody",
  ],

  type: "music",

  sticker: STICKERS.music,

    buttons: [
      "Guitar",
      "Photography",
      "Riding",
    ],
};


function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}





const RandomAnswer: RandomAnswerType[] = [
  {
    answer:
      getGreeting() +
      `! I may not have the exact answer, but I’d be happy to share my projects, skills, achievements, and journey as a developer.\n\nWhat would you like to explore?`,
    buttons: [
      "Built projects",
      "Tech Stack",
      "Achievements",
    ],
  },

  {
    answer:
      "I’m not sure about that topic, but I can share more about my projects, technologies, and growth as a developer.\n\nWhat would you like to know?",
    buttons: [
      "Built projects",
      "Contact me",
      "My journey",
    ],
  },

  {
    answer:
      "That’s a great question! I can tell you about my projects, skills, education, and goals as a developer.\n\nWhere would you like to start?",
    buttons: [
      "Studying",
      "Built projects",
      "About me",
    ],
  },

  {
    answer:
      "I don’t have an answer for that yet, but I’d be happy to share my projects, tech stack, experiences, and journey as a developer.\n\nWhat would you like to discover?",
    buttons: [
      "Tech Stack",
      "My journey",
      "Achievements",
    ],
  },

  {
    answer:
      "I haven’t prepared an answer for that yet, but there’s plenty to explore — from my projects and skills to my future goals.\n\nWhat are you curious about?",
    buttons: [
      "Built projects",
      "Contact me",
      "Inspiration",
    ],
  },
];




const PERSONAL_QUESTIONS: PersonalQuestionType[] = [
  {
    question:
      "Tell me about your love life",

    answer:
      `I prefer to keep my love life private, but I believe that relationships are built through trust, respect, and understanding.
      
Right now, I am focused on personal growth, my career, and becoming the best version of myself.
      
What would you like to know?`,

    keywords: [
      "love",
      "relationship",
      "girlfriend",
      "partner",
      "dating",
      "romance",
    ],

    buttons: [
      "About me",
      "My journey",
      "Contact me",
    ],
  },

  {
    question:
      "Why do you enjoy about riding motorcycles?",

    answer:
      `I enjoy riding motorcycles because it provides a sense of **freedom, adventure, and exploration**. Being on the road allows me to discover different places, appreciate the journey, and take a break from the demands of programming and development.
      
For me, riding is not simply about reaching a destination; it is also about enjoying the experience along the way.

What are you curious about?`,

    keywords: [
      "motorcycle",
      "riding",
    ],

    sticker: STICKERS.pose,

    buttons: [
      "Photography",
      "Guitar",
      "About me",
    ],
  },

  {
    question:
      "Do you play any instrument?",

    answer:
      `Yes, I play the **guitar**. I started learning it as a creative hobby outside of technology and continue to practice whenever I have the opportunity.
      
I am not a professional musician, but I enjoy learning songs, improving my skills, and playing simply for **relaxation**. It provides a creative balance to my work in technology.

What are you curious about?`,

    keywords: [
      "guitar",
      "instrument"
    ],

    buttons: [
      "Riding",
      "Guitar",
      "About me",
    ],
  },

  {
    question:
      "What got you into photography?",

    answer:
      `My interest in photography developed from my appreciation for capturing meaningful moments and transforming ordinary experiences into memorable **visual stories**.
      
I enjoy experimenting with composition, perspectives, and different angles to communicate an idea or feeling through an image. Photography has become another **creative outlet**y that allows me to explore and express my creativity beyond software development.

What would you like to discover?`,

    keywords: [
      "photography",
    ],

    buttons: [
    "About me",
    "Riding",
    "Guitar"
    ],
  },
];



const getRandomAnswer = (): RandomAnswerType => {
  const random =
    RandomAnswer[
      Math.floor(Math.random() * RandomAnswer.length)
    ];

  return {
    ...random,
    answer: `${random.answer}`,
  };
};

const getKeywordAnswer = (
  item: KeywordAnswerType
): string => {
  return item.answers[
    Math.floor(Math.random() * item.answers.length)
  ];
};



function findAnswers(
  userText: string
): (
  Card |
  MusicType |
  PersonalType |
  PersonalQuestionType |
  NavItemType |
  KeywordAnswerType
) | null {

  const text = userText
    .toLowerCase()
    .trim();

  const allAnswers: (
    Card |
    MusicType |
    PersonalType |
    PersonalQuestionType |
    NavItemType |
    KeywordAnswerType
  )[] = [
    ...KEYWORD_ANSWERS,
    MUSIC,
    PERSONAL,
    ...CARDS,
    ...NAV_SECTIONS.flatMap(
      (section) => section.items
    ),
    ...PERSONAL_QUESTIONS,
  ];

  // Get every possible keyword match
  const matches = allAnswers.filter((item) =>
    item.keywords?.some((keyword) =>
      text.includes(keyword.toLowerCase())
    )
  );

  if (matches.length === 0) {
    return null;
  }


  const bestMatch = matches.sort((a, b) => {

    const getScore = (
      item:
        | Card
        | MusicType
        | PersonalType
        | PersonalQuestionType
        | NavItemType
        | KeywordAnswerType
    ) => {
      const matchingKeywords =
        item.keywords?.filter((keyword) =>
          text.includes(keyword.toLowerCase())
        ) ?? [];

      return Math.max(
        ...matchingKeywords.map(
          (keyword) => keyword.length
        ),
        0
      );
    };

    return getScore(b) - getScore(a);
  })[0];

  return bestMatch ?? null;
}




function Body({
  messages,
  input,
  setInput,
  addMessage,
  isTyping,
  setIsTyping,
  usedButtons,
  setUsedButtons,
}: BodyProps): React.ReactElement {

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);



  const placeholders: string[] = [
    "Ask anything",
    "Want to know about Jero?",
    "Ask about my projects",
    "Discover my journney",
  ];


  const [placeholder, setPlaceHolder] = useState<string>(
    placeholders[0]
  );

  const showPlaceholder = input.length === 0;

  const [, setQuestionCount] = useState<number>(0);

  const [showContactPopup, setShowContactPopup] =
    useState<boolean>(false);

  const [showPersonalButton, setShowPersonalButton] =
    useState<boolean>(true);

    const [forceScroll, setForceScroll] = useState(false);



  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;

      setPlaceHolder(placeholders[index]);

    }, 2000);

    return () => clearInterval(interval);

  }, []);



function sendMessage(
  text: string,
  messageId: string | null = null
): void {

  const trimmed = text.trim();
  if (!trimmed) return;

  if (messageId) {
    setUsedButtons((prev) =>
      prev.includes(messageId)
        ? prev
        : [...prev, messageId]
    );

  } else {
    const assistantIds = messages
      .filter(
        (msg) =>
          msg.role === "assistant" &&
          msg.buttons
      )
      .map((msg) => msg.id);

    setUsedButtons((prev) => [
      ...prev,
      ...assistantIds.filter(
        (id) => !prev.includes(id)
      ),
    ]);
  }


  const match = findAnswers(trimmed);


  const userQuestion =
    messageId && match && "question" in match
      ? match.question
      : trimmed;

  addMessage("user", userQuestion);

  setForceScroll(true);

  setTimeout(() => {
    setForceScroll(false);
  }, 500);

  setQuestionCount((prev) => {
    const next = prev + 1;

    if (next === 5) {
      setShowContactPopup(true);

      setTimeout(() => {
        setShowContactPopup(false);
      }, 5000);
    }

    return next;
  });

  setIsTyping(true);

  setTimeout(() => {

    if (match) {

      const answer =
        "answers" in match
          ? getKeywordAnswer(match)
          : match.answer;

      addMessage(
        "assistant",
        answer,
        match.buttons,
        match.images,
        match.type,
        match.sticker
      );

    } else {

      const random = getRandomAnswer();

      addMessage(
        "assistant",
        random.answer,
        random.buttons
      );

    }

  }, 2500);
}


  function handleCardClick(
    card: Card
  ): void {

    if (isTyping) return;
    const assistantIds = messages
      .filter(
        (msg) =>
          msg.role === "assistant" &&  msg.buttons
      )
      .map((msg) => msg.id);

    setUsedButtons((prev) => [
      ...prev,
      ...assistantIds.filter(
        (id) => !prev.includes(id)
      ),
    ]);

    addMessage(
      "user",
      card.question
    );

    setIsTyping(true);
    setTimeout(() => {

        addMessage(
          "assistant",
          card.answer,
          card.buttons,
          card.images,
          card.type,
          card.sticker
        );
    }, 2500);
  }


  function handleSubmit(): void {

    if (isTyping) return;

    sendMessage(input);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.blur();
    }
  }

function handleKeyDown(
  e: React.KeyboardEvent<HTMLTextAreaElement>
): void {

  if (
    e.key === "Enter" &&
    !e.shiftKey
  ) {

    e.preventDefault();

    if (isTyping) return;

    handleSubmit();
  }

}





  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void {

    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height =`${Math.min(e.target.scrollHeight, 128)}px`;

  }





return (
  <div className="flex flex-1 h-screen bg-[#0A0F1F] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.12),transparent)] overflow-hidden">

    <div className="flex flex-col w-full h-[100dvh] min-h-0 overflow-hidden">

      {/* ONLY THIS AREA SCROLLS */}
      <div className="relative flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sky-400/40 hover:scrollbar-thumb-sky-400/60">

        {messages.length === 0 ? (
          <Hero
            cards={CARDS}
            onCardClick={handleCardClick}
          />
        ) : (
          <Message
            messages={messages}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            onFollowUp={sendMessage}
            usedButtons={usedButtons}
            forceScroll={forceScroll}
          />
        )}

      </div>

      {/* TEXTAREA + FOOTER — NOT SCROLLABLE */}
      <div className="shrink-0 w-full flex justify-center">

        <div className="flex flex-col gap-2 w-full max-w-4xl px-3 sm:px-6 pt-2 pb-2 sm:py-4">

          <div className="backdrop-blur-xl bg-white/[0.04] border border-sky-500/20 rounded-3xl sm:rounded-4xl px-4 py-3 flex flex-col gap-2 shadow-[0_0_25px_rgba(56,189,248,0.06)] transition-all duration-300 focus-within:border-sky-400/60 focus-within:shadow-[0_0_25px_rgba(56,189,248,0.25)]">

            <div className="flex flex-wrap items-center gap-2">

              <motion.button
                whileHover={{ scale: 1.00 }}
                transition={{
                  duration: 0.2
                }}
                className="font-poppins font-bold px-5 py-2 rounded-full bg-transparent border border-sky-400 text-white text-xs transition-shadow duration-300"
              >
                <span className="text-sky-500">Jero</span>
                <span className="text-gray-400">NXT</span>
                <span className="text-white">.dev</span>
              </motion.button>

              {showPersonalButton && (
                <motion.button
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => {

                    if (isTyping) return;

                    setShowPersonalButton(false);

                    const assistantIds =
                      messages
                        .filter(
                          (msg) =>
                            msg.role === "assistant" &&
                            msg.buttons
                        )
                        .map(
                          (msg) => msg.id
                        );

                    setUsedButtons((prev) => [
                      ...prev,
                      ...assistantIds.filter(
                        (id) => !prev.includes(id)
                      )
                    ]);

                    addMessage(
                      "user",
                      PERSONAL.question
                    );

                    setIsTyping(true);

                    setTimeout(() => {

                      addMessage(
                        "assistant",
                        PERSONAL.answer,
                        PERSONAL.buttons,
                        undefined,
                        undefined,
                        PERSONAL.sticker,
                      );

                    }, 2500);

                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="font-poppins font-semibold px-5 py-2 rounded-full bg-transparent border border-sky-400 text-sky-500 text-xs transition-shadow duration-300"
                >
                  Personal Side
                </motion.button>
              )}

            </div>

            <div className="relative">

              <AnimatePresence mode="wait">

                {showPlaceholder && (
                  <motion.div
                    key={placeholder}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                    className="absolute left-2 top-3 sm:top-4 text-base text-gray-500 pointer-events-none"
                  >
                    {placeholder}
                  </motion.div>
                )}

              </AnimatePresence>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                rows={1}
                className="w-full text-base px-2 py-3 sm:py-4 outline-none bg-transparent text-white resize-none overflow-hidden max-h-32"
              />

            </div>

            <div className="flex items-center justify-end">

              <button
                type="button"
                onClick={handleSubmit}
                aria-label="Send message"
                disabled={!input.trim() || isTyping}
                className="flex items-center justify-center rounded-xl text-sky-400 transition-all duration-300 hover:text-sky-300 hover:bg-sky-500/15 hover:shadow-[0_0_14px_rgba(56,189,248,0.4)] disabled:text-gray-600 disabled:hover:bg-transparent disabled:hover:shadow-none"
              >
                <ArrowUpCircleIcon className="w-8 h-8" />
              </button>

            </div>

            <ContactPopup
              className="translate-x-2 sm:translate-x-4 md:translate-x-6 lg:translate-x-10 xl:translate-x-16 2xl:translate-x-24 -translate-y-4"
              open={showContactPopup}
              onClose={() =>
                setShowContactPopup(false)
              }
            />

          </div>

          <Footer />

        </div>

      </div>

    </div>

  </div>
);
}
export default Body;