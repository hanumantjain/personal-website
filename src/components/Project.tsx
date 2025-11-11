import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/utils/projects";

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-number">02</span>
          <div className="h-px flex-1 bg-border" />
          <span className="code-tag">projects.json</span>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border-b border-border pb-8 last:border-0"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>
                
                <div className="flex gap-4 md:pt-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Demo</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="code-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
