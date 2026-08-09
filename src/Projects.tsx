import ProjectCard from "./ProjectCard.tsx";


type Project = {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  github?: boolean;
};



const projects: Project[] = [

  {
    title: "BentaPh",
    description: "Online store with product browsing and ordering features.",
    tech: [
      "Bootstrap",
      "PHP",
      "InfinityFree"
    ],
    live: "http://bentaphjv.rf.gd/?i=1",
  },


  {
    title: "OrderTaker",
    description: "Simple system for taking and managing orders.",
    tech: [
      "Java",
      "Swing",
      "SQLite"
    ],
  },


  {
    title: "WAIS",
    description: "Floating widget for on-screen analysis with confidence scores.",
    tech: [
      "Java",
      "SQLite",
      "XML"
    ]
  }

];



export default function Projects(): React.ReactElement {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((project, index) => (

        <ProjectCard
          key={index}
          {...project}
        />

      ))}
    </section>
  );
}