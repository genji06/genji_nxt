
import {
  WrenchScrewdriverIcon,
  FolderIcon,
  AcademicCapIcon,
  TrophyIcon,
  DocumentCheckIcon,
  EnvelopeIcon,
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleBottomCenterIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

import type { ComponentType } from "react";

import award1 from "./assets/images/arachnos.jpg";
import award2 from "./assets/images/cyber.jpg";
import award3 from "./assets/images/codefest.jpg";
import award4 from "./assets/images/web.jpg";
import award5 from "./assets/images/speaker1.jpg";
import award6 from "./assets/images/speaker.jpg";

import { motion } from "motion/react";
import { useState, useEffect } from "react";



import Pose from "./assets/images/pose.png";
import Stare from "./assets/images/stare.png";
import Work from "./assets/images/work.png";
import Write from "./assets/images/write.png";
import Call from "./assets/images/call.png";
import Formal from "./assets/images/formal.png";




export type ItemType =
  | "skills"
  | "projects"
  | "music"
  | "contact";


export type NavImage = {
  src: string;
  description: string;
};


export type NavItemType = {
  icon: ComponentType<{
    className?: string;
  }>;

  text: string;

  question: string;

  answer: string;

  keywords?: string[];

  type?: ItemType;

  buttons?: string[];

  images?: NavImage[];
  sticker?: string;
};


export type NavSectionType = {
  label: string;

  items: NavItemType[];
};



export type MessageType = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  buttons?: string[];
  images?: NavImage[];
  type?: ItemType;
  sticker?: string;
};






export const NAV_SECTIONS: NavSectionType[] = [

  {
    label: "MY WORK",

    items: [

      {
        icon: WrenchScrewdriverIcon,

        text: "Skills & Stack",

        question:
          "What's your tech stack?",

        answer:
`My development experience covers **mobile, web, backend, and design** — allowing me to build projects from concept to implementation.

For mobile applications, I work with Android development using **Java, XML, and Android Studio**, focusing on clean architecture, smooth performance, and reliable local data management with SQLite.

For web development, I use **React and TypeScript** with modern styling tools like **Tailwind CSS** and also **Bootstrap** to create responsive and interactive interfaces. I also work with Node.js backend services.

I’m continuously expanding my skills in scalable backend development, cloud deployment, and advanced Java.

What should we explore next?`,

        keywords: [
          "skill",
          "skills",
          "stack",
          "tech",
          "technology",
          "tools",
          "tool",
          "work",
          "job"
        ],

        type: "skills",

        sticker: Work,

    buttons: [
      "Built projects",
      "Certifications",
      "My journey",
    ],
      },


      {
        icon: FolderIcon,

        text: "Projects",

        question:
          "What projects showcase your skills and experience?",

        answer:
          `I've created projects that turn ideas into real solutions, mobile apps, and interactive systems focused on solving **real-world problems** while helping me grow as a developer.
          
What are you curious about?`,

        keywords: [
          "project",
          "projects",
          "ideas",
          "built",
          "build",
        ],

        type: "projects",

        sticker: Stare,

        buttons: [
          "Tech Stack",
          "Achievements",
          "About me",
        ],
      },

    ],
  },



  {
    label: "ABOUT ME",

    items: [

      {
        icon: AcademicCapIcon,

        text: "Education",

        question:
          "What's your educational background?",

        answer:
          `I’m currently taking a Bachelor of Science in Information Technology at STI College Lipa, where I continue to develop my skills in software development, programming, and technology solutions.
          
Throughout my studies, I’ve explored **mobile, web, backend, and UI/UX development** while working on academic, personal, and competition-based projects. My education has given me opportunities to apply what I learn through hands-on experience, while continuously challenging me to explore new technologies and improve my technical skills.
          
My goal is to keep growing as a developer and apply what I learn to build practical solutions that can make a difference.

What would you like to discover?`,

        keywords: [
          "study",
          "studying",
          "education",
          "school",
          "student",
        ],

        sticker: Write,

        buttons: [
          "Tech Stack",
          "Awards",
          "About me",
        ],
      },


      {
        icon: AcademicCapIcon,

        text: "About Me",

        question:
          "Tell me about yourself",

        answer:
`I’m **Jerome Vargas**, but most people know me as *Jero*.

I’m a Bachelor of Science in Information Technology student at STI College Lipa, an aspiring software developer.

I believe good software starts with understanding the problem and creating solutions that are useful, reliable, and meaningful.

Along the way, I became a two-time CodeFest 1st Place winner, where I took on the role of backend developer, and a Regional Qualifier in the Philippine Startup Challenge X. More than the achievements, I value the growth behind them. I’m still learning, improving, and building with purpose.

What should we explore next?`,

        keywords: [
          "know",
          "about",
          "myself",
          "yourself",
          "jerome",
          "jero",
          "life",
          "me"
        ],

        sticker: Pose,


        buttons: [
          "Studying",
          "Achievements",
          "Contact me",
        ],
      },


      {
        icon: TrophyIcon,

        text: "Achievements",

        question:
          "What achievements and experiences have shaped your journey?",

        answer:
`Throughout my journey, I’ve been fortunate to participate in different competitions, projects, and leadership opportunities that helped me grow both technically and personally.

Here are some of my notable experiences:
• **1st Place** — CodeFest 2025, STI Tagisan ng Talino (STI College Lipa), an IT competition that challenged my problem-solving and development skills.

• **1st Place** — Cyber Defense Exercise Challenge TRON 2025, Philippine Army 2nd Infantry Division

• **1st Place** — CodeFest 2026, STI Tagisan ng Talino (STI College Lipa), a major STI programming competition that marked an important milestone in my growth as a developer.

• **1st Place** — Pixels to Page: Web Design Competition 2026, a web design competition that challenged my creativity, design thinking, and frontend development skills.

• **Regional Qualifier** — Philippine Startup Challenge X (DICT Region IV-A), where we presented ARACHNOS, an AI-powered spider robot designed for post-earthquake search and rescue operations.

• **Speaker** — Project GABAY-AI, an AI awareness talk at DepEd San Celestino Integrated National High School (2026)

• **Leadership Awardee / Creative Visual Specialist** — Association of Information Technology Students (A.I.T.S), STI College Lipa

While the awards and recognitions are meaningful, the experiences behind them matter even more. Each challenge helped me improve my problem-solving skills, adapt under pressure, collaborate with others, and continue growing as a developer and leader.

What would you like to know?`,

        keywords: [
          "achievement",
          "achievements",
          "achieve",
          "achieved",
          "award",
          "competition",
          "victories",
          "awards",
        ],

        sticker: Pose,

        buttons: [
          "Built projects",
          "My journey",
          "Contact Me",
        ],

        images: [

          {
            src: award1,

            description:
              "Regional Qualifier — Philippine Startup Challenge X (DICT Region IV-A), where we presented ARACHNOS, an AI-powered spider robot designed for post-earthquake search and rescue operations.",
          },


          {
            src: award2,

            description:
              "1st Place — Cyber Defense Exercise Challenge TRON 2025, Philippine Army 2nd Infantry Division.",
          },

          {
            src: award3,

            description:
              "1st Place — CodeFest 2026, STI Tagisan ng Talino (STI College Lipa), a major STI programming competition that marked an important milestone in my growth as a developer.",
          },

          {
            src: award4,

            description:
              "1st Place — Pixels to Page: Web Design Competition 2026, a web design competition that challenged my creativity, design thinking, and frontend development skills.",
          },
          

          {
            src: award5,

            description:
              "Speaker — Project GABAY-AI, an AI awareness talk at DepEd San Celestino Integrated National High School (2026).",
          },

          {
            src: award6,

            description:
              "AI Awareness Speaker — Presenting the Project GABAY-AI spider robot and explaining its features and purpose to senior high school students (2026)",
          },

        ],

      },


      {
        icon: DocumentCheckIcon,

        text: "Certifications",

        question:
          "What certifications and learning experiences have you completed?",

        answer:
          `I believe that becoming a better developer means always being willing to learn something new. These certifications and learning experiences are some of the steps I’ve taken to grow both technically and personally.

Here are some of my certifications and learning experiences that helped me improve my technical skills:

**Certifications:**
**• Java Fundamentals** — Oracle Academy (2024)
**• Hour of Code: AI Ready ASEAN** (2025)
**• Introduction to Robotics and Basic Application** (2025)
**• Digital Safety and Security Awareness** — Cisco Networking Academy (2026)

**Seminars and Conferences:**
**• BITCON 2025** — Batangas IT Conference
**• SAP X Accenture Career Talk** (2025)
**• Batang Techno Hackathon** — BatStateU CICS (2026)

What are you curious about?`,

        keywords: [
          "certificate",
          "seminar",
          "seminars",
          "credentials",
          "certifications",
          "cert",
          "certs"
        ],

        sticker: Write,

        buttons: [
          "Achievements",
          "Studying",
          "Tech Stack",
        ],
      },

    ],
  },



  {
    label: "CONNECT",

    items: [

      {
        icon: EnvelopeIcon,

        text: "Contact & Links",

        question:
          "How can I get in touch with you?",

        answer:
          `You can reach out through my social links, email, or other contact channels. 

Here are my contact links:

**• Facebook** — Jerome Visleño Vargas
**• Email** — jeromevargas194@gmail.com
**• Instagram** — @hereklein_

You can also use the buttons below to access my profiles directly:`,

        keywords: [
          "contact",
          "call",
          "email",
          "facebook",
          "instagram",
          "linkedIn",
          "linkedin",
          "tiktok",
          "number"
        ],

        sticker: Call,

        type: "contact",

        buttons: [
          "Built projects",
          "About me",
          "Certifications",
        ],
      },

    ],
  },

];







type NavItemProps = {

  icon: ComponentType<{
    className?: string;
  }>;

  item: NavItemType;

  expanded: boolean;

  onClick: () => void;

  isTyping: boolean;

  active: boolean;

};



function NavItem({
  icon: Icon,
  item,
  expanded,
  onClick,
  isTyping,
  active,

}: NavItemProps): React.ReactElement {


  return (

    <li>

<motion.button

  type="button"

  disabled={isTyping}

  onClick={onClick}

  whileHover={{
    scale: 1.02,
  }}

  transition={{
    duration: 0.2,
  }}

  className={`group flex items-center rounded-xl cursor-pointer w-full transition-all duration-200

${
  active
    ? "bg-sky-500/10 text-sky-300 shadow-[inset_0_0_20px_rgba(56,189,248,0.05)]"
    : "text-gray-300 hover:bg-sky-500/10 hover:text-sky-300"
}

${
  expanded
    ? "gap-2 justify-start px-2 py-2"
    : "justify-center h-10 px-0"
}`}

      >

<Icon
  className={`w-4 h-4 shrink-0 transition-colors duration-200
    ${
      active
        ? "text-sky-400"
        : "text-gray-400 group-hover:text-sky-400"
    }
  `}
/>


        {
          expanded &&
          (
            <span className="truncate">
              {item.text}
            </span>
          )
        }


      </motion.button>


    </li>

  );

}


type HeaderProps = {

  onNewChat: () => void;

  addMessage: (
    role: "user" | "assistant",
    content: string,
    buttons?: string[],
    images?: NavImage[],
    type?: ItemType,
    sticker?: string,
  ) => void;

  setIsTyping: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setUsedButtons: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  messages: MessageType[];

  isTyping: boolean;

};


function Header({
  onNewChat,
  addMessage,
  setIsTyping,
  setUsedButtons,
  messages,
  isTyping,

}: HeaderProps): React.ReactElement {


  const [sidebarMode, setSidebarMode] = useState<number>(
    () =>
      typeof window !== "undefined" &&
      window.innerWidth >= 768
        ? 1
        : 0
  );





const [activeItem, setActiveItem] = useState<string | null>(null);


  function handleNewChatClick(): void {

    onNewChat();

    setActiveItem(null);
    if (window.innerWidth < 768) {
      setSidebarMode(0);
    }
  }




  useEffect(() => {

    function handleResize(): void {
      const isDesktop =
        window.innerWidth >= 768;
      setSidebarMode((prev) => {


        if (isDesktop)
          return prev === 0
            ? 1
            : prev;

        return prev === 1
          ? 0
          : prev;

      });


    }



    window.addEventListener(
      "resize",
      handleResize
    );



    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

    };


  }, []);




  const expanded =
    sidebarMode === 1;


  function cycleSidebar(): void {
    const isDesktop =
      window.innerWidth >= 768;
    if (isDesktop) {
      setSidebarMode(
        (m) =>
          m === 1
            ? 2
            : 1
      );
    } else {

      setSidebarMode(
        (m) =>
          m === 1
            ? 2
            : m === 2
              ? 0
              : 1
      );
    }
  }




  function handleNavClick(
    item: NavItemType
  ): void {


    if (isTyping)
      return;

    setActiveItem(item.text);

    const assistantIds =
      messages

        .filter(
          (msg) =>
            msg.role === "assistant" &&
            msg.buttons
        )

        .map(
          (msg) =>
            msg.id
        );

    setUsedButtons(
      (prev) => [
        ...prev,
        ...assistantIds.filter(
          (id) =>
            !prev.includes(id)
        ),
      ]
    );



    addMessage(
      "user",
      item.question
    );

    setIsTyping(true);

    setTimeout(() => {
      addMessage(
        "assistant",
        item.answer,
        item.buttons,
        item.images,
        item.type,
        item.sticker
      );
    }, 2500);
    if (window.innerWidth < 768) {
      setSidebarMode(0);
    }
  }

  return (
    <>
      {
        sidebarMode === 0 && (
          <motion.button  type="button" aria-label="Open menu"
            onClick={() =>
              setSidebarMode(1)
            }

            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white/[0.04] border border-sky-500/20 backdrop-blur-xl text-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.25)]"

            whileTap={{ scale: 0.9 }}>
            <Bars3Icon className="w-4 h-4" />
          </motion.button>
        )
      }


      {
        sidebarMode === 1 &&
        window.innerWidth < 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarMode(0) }
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"/>
        )
      }






      <aside className={` bg-[#0A0F1F]/90 backdrop-blur-2xl border-r border-sky-500/10 min-h-screen md:h-screen pb-4 flex flex-col px-4 sm:px-5 py-2 overflow-hidden pt-5 transition-all duration-300 ease-in-out fixed top-0 left-0 z-40  ${ sidebarMode === 0 ? " -translate-x-full w-[260px]" : " translate-x-0" } ${ sidebarMode === 1 ? "w-[260px] " : "" } ${ sidebarMode === 2 ? "w-[70px] " : "" } md:translate-x-0 md:relative ${ expanded ? "md:w-[260px] " : "md:w-[70px] " }`}>
        <div className={`flex items-center ${ expanded ? "justify-between" : "justify-center" }`}>


          {
            expanded && (

              <div className="ml-1">
                <h1 className="font-sans-serif text-md sm:text-[15px] font-bold">
                  <span className="text-white">Jero</span>
                  <span className="text-sky-400">NXT</span>
                  <span className="text-gray-600">.dev</span>
                </h1>
                <p className="text-[10px] text-sky-400/70 tracking-[0.1em]">
                INTERACTIVE PORTFOLIO</p>
              </div>
            )
          }




          <motion.button

            type="button"

            aria-label={
              expanded
                ? "Collapse sidebar"
                : "Expand sidebar"
            }

            aria-expanded={expanded}

            animate={{
              rotate: expanded ? 0 : 180
            }}

            transition={{
              duration: 0.1
            }}

            onClick={cycleSidebar}

            whileHover={{
              scale: 1.1
            }}

            whileTap={{
              scale: 0.95
            }}

            className="p-2 rounded-md text-gray-400 transition-all duration-200 hover:bg-sky-500/10 hover:text-sky-300 shrink-0"

          >

            <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />

          </motion.button>


        </div>





        <div className="pt-4 text-gray-300 flex flex-col flex-1 gap-2">


          <div className="flex justify-center">


            <motion.button

              type="button"

              onClick={handleNewChatClick}

              whileHover={{
                scale: 1.05
              }}

              transition={{
                duration: 0.2
              }}

              className={`bg-gradient-to-r from-sky-500 to-blue-600 text-white h-9 md:h-10 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(56,189,248,0.3)] transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.55)]
              ${
                expanded
                  ? "w-full"
                  : "w-10"
              }`}

            >

              <ChatBubbleBottomCenterIcon className="w-4 h-4 shrink-0" />


              {
                expanded && (

                  <span className="text-[15px]">

                    <strong>
                      New Chat
                    </strong>

                  </span>

                )

              }


            </motion.button>


          </div>






          <nav className="flex-1">


            {
              NAV_SECTIONS.map(
                (section, index) => (

                  <div
                    key={section.label}
                    className={`mb-6 ${index !== 0 ? "border-t border-white/10" : ""} `}>


                    {
                      expanded && (

                        <p className="text-[10px] py-3 text-sky-400/60 tracking-[0.15em]">

                          {section.label}

                        </p>

                      )

                    }



                    <ul className="flex flex-col gap-1 font-sans-serif text-[15px]">


                      {
                        section.items.map(
                          (item) => (

                            <NavItem

                              key={item.text}

                              icon={item.icon}

                              item={item}

                              expanded={expanded}

                              isTyping={isTyping}

                              active={activeItem === item.text}

                              onClick={() =>
                                handleNavClick(item)
                              }

                            />

                          )
                        )
                      }


                    </ul>


                  </div>

                )
              )
            }


          </nav>
          <div
            className={`-mt-12 sm:-mt-12 md:-mt-12 lg:mb-5 pt-4 pb-4 md:pb-0 border-t border-white/10 ${
              expanded ? "" : "flex justify-center"
            }`}
          >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            flex items-center gap-2 rounded-xl border border-white/10
            bg-[#0A0F1F]/90
            p-2 md:p-2.5  
            shadow-md transition-all

            ${expanded 
              ? "w-full rounded-2xl p-2.5 gap-2" 
              : "w-10 h-10 md:w-11 md:h-11 justify-center"}
          `}
        >
            <img
              src={Formal}
              alt="Profile"
              className={`
                rounded-full object-cover shrink-0
                ${
                  expanded
                    ? "w-9 h-9"
                    : "w-7 h-7"
                }
              `}
            />

          {expanded && (
            <div className="overflow-hidden">
              <h3 className="
                text-white font-medium  
                text-xs sm:text-sm 
                truncate
              ">
                Jerome Vargas
              </h3>

              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>

                <p className="
                  text-[10px] sm:text-xs 
                  text-blue-400 truncate
                ">
                  Online
                </p>
              </div>
            </div>
          )}
        </motion.div>
          </div>


        </div>


      </aside>


    </>

  );

}



export default Header;

