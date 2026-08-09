type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  github?: boolean;
};

export default function ProjectCard({
  title,
  description,
  tech,
  live,
  github,
}: ProjectCardProps): React.ReactElement {
  return (
    <div
      className="relative w-full max-w-[260px] min-h-[190px]  p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-sky-400/40 transition flex flex-col justify-between overflow-hidden">
      {/* left accent */}
      <div
        className="absolute left-0 top-0 h-full w-[3px]bg-gradient-to-b from-sky-400 to-blue-500"/>

      {/* content */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white leading-tight">
          {title}
        </h3>

        <p className="text-xs text-white/50 leading-relaxed">
          {description}
        </p>
      </div>

      {/* tech */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tech.map((item, index) => (
          <span
            key={index}
            className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10  text-white/70">
            {item}
          </span>
        ))}
      </div>

      {/* bottom actions */}
      <div className="flex justify-between items-center mt-4">
        {live ? (
        <a href={live} target="_blank" rel="noopener noreferrer" 
        className=" px-4 py-2 rounded-full text-xs border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition " > 
        ↗ Live Demo </a>
        ) : (
          <span />
        )}

        {github && (
          <span
            className="text-xs  text-white/40">
            GitHub
          </span>
        )}
      </div>
    </div>
  );
}