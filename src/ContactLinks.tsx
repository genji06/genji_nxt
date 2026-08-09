import { EnvelopeIcon } from "@heroicons/react/24/outline";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


function ContactLinks(): React.ReactElement {

  const links = [
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "text-blue-500",
      url: "https://www.facebook.com/jerome.v.vargas"
    },

    {
      name: "Instagram",
      icon: FaInstagram,
      color: "text-pink-500",
      url: "https://www.instagram.com/hereklein_/"
    },

    {
      name: "Gmail",
      icon: EnvelopeIcon,
      color: "text-red-white",
      url:"https://mail.google.com/mail/?view=cm&fs=1&to=jeromevargas194@gmail.com"
    },

    {
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "text-blue-400",
    },
  ];


  return (
    <div className="grid grid-cols-2 gap-3">

      { links.map((link) => { const Icon = link.icon;

          return (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className=" flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-200 hover:bg-sky-500/10 hover:border-sky-400/40">
                <Icon className={` w-5 h-5 ${link.color} `}/>

                <span className="text-sm text-gray-300">
                    {link.name}
                </span>
                </a>
          );
        })
      }
    </div>
  );
}
export default ContactLinks;