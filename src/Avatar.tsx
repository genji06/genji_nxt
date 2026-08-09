import { UserIcon } from "@heroicons/react/24/solid";
import profile from "./assets/images/profile.png";

type AvatarProps = {
  role: "user" | "assistant";
  className?: string;
};

function Avatar({ role, className = "" }: AvatarProps): React.ReactElement {
  const isUser = role === "user";

  return (
    <div
      className={`flex items-center justify-center rounded-full shrink-0 ring-1 backdrop-blur-xl transition-shadow duration-300 ${className}
        ${
          isUser
            ? "bg-white/[0.04] ring-sky-500/25 text-gray-300"
            : "bg-gradient-to-br from-sky-400 to-blue-600 ring-sky-400/40 text-white shadow-[0_0_12px_rgba(56,189,248,0.45)]"
        }`}
    >
      {isUser ? (
        <UserIcon className="w-1/2 h-1/2" />
      ) : (
        <img src={profile} alt="Profile" className="w-full h-full rounded-full object-cover"/>
      )}
    </div>
  );
}

export default Avatar;