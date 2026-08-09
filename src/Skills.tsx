interface SkillGroup {
  category: string;
  dot: string;
  badge: string;
  items: string[];
}

const skills: SkillGroup[] = [
  {
    category: "Mobile",
    dot: "bg-orange-500",
    badge: "border-orange-500/30 bg-orange-500/10 text-orange-300",
    items: ["Java", "Android", "XML"],
  },
  {
    category: "Web",
    dot: "bg-blue-500",
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML & CSS",
      "Tailwind CSS",
      "Bootstrap"
    ],
  },
  {
    category: "Backend",
    dot: "bg-fuchsia-500",
    badge: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300",
    items: ["Node.js", "PHP"],
  },
  {
    category: "Tools",
    dot: "bg-slate-400",
    badge: "border-slate-500/30 bg-slate-500/10 text-slate-300",
    items: ["VS Code"],
  },
  {
    category: "Deployment",
    dot: "bg-emerald-500",
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    items: ["Vercel", "InfinityFree"],
  },
];

export default function Skills(): React.ReactElement {
  return (
    <div className="w-full mt-2">
      <div className="space-y-4">
        {skills.map((group: SkillGroup) => (
          <div
            key={group.category}
            className="flex flex-col sm:flex-row gap-3 sm:gap-7"
          >
            {/* Category */}
            <div className="flex items-center gap-1 w-14 shrink-0">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${group.dot}`}
              />

              <span className="uppercase tracking-[0.22em] text-[9px] text-gray-500 font-semibold">
                {group.category}
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 ms-4">
              {group.items.map((item: string) => (
                <span
                  key={item}
                  className={`${group.badge} px-4 py-[4px] rounded-full border text-[12px] leading-none font-medium transition-all duration-200 hover:scale-105`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}