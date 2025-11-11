import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { projects } from "@/utils/projects";
import { FeaturesSectionDemo } from "./ui/features-section-demo";

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-number">03</span>
          <div className="h-px flex-1 bg-border" />
          <span className="code-tag">projects.json</span>
        </div>

        <FeaturesSectionDemo
          items={(showAll ? projects : projects.slice(0, 4)).map((p) => ({
            title: p.name,
            description: p.description,
            tech: p.tech,
            githubHref: p.github ?? null,
            demoHref: p.demo ?? null,
          }))}
          className="mb-4"
        />
        {projects.length > 4 && (
          <div className="mt-10 flex justify-center gap-3">
            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
              >
                View all projects
                <ExternalLink className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
              >
                Hide projects
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
