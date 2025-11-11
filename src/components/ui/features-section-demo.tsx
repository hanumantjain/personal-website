import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";

type FeatureItem = {
  title: string;
  description: string;
  tech?: string[];
  githubHref?: string | null;
  demoHref?: string | null;
};

export function FeaturesSectionDemo({
  items,
  className,
}: {
  items?: FeatureItem[];
  className?: string;
}) {
  const defaultFeatures: FeatureItem[] = [
    {
      title: "Built for developers",
      description:
        "Built for engineers, developers, dreamers, thinkers and doers.",
    },
    {
      title: "Ease of use",
      description:
        "It's as easy as using an Apple, and as expensive as buying one.",
    },
    {
      title: "Pricing like no other",
      description:
        "Our prices are best in the market. No cap, no lock, no credit card required.",
    },
    {
      title: "100% Uptime guarantee",
      description: "We just cannot be taken down by anyone.",
    },
    {
      title: "Multi-tenant Architecture",
      description: "You can simply share passwords instead of buying new seats",
    },
    {
      title: "24/7 Customer Support",
      description:
        "We are available a 100% of the time. Atleast our AI Agents are.",
    },
    {
      title: "Money back guarantee",
      description:
        "If you donot like EveryAI, we will convince you to like us.",
    },
    {
      title: "And everything else",
      description: "I just ran out of copy ideas. Accept my sincere apologies",
    },
  ];

  const features = items ?? defaultFeatures;

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2  relative z-10 py-10 max-w-7xl mx-auto", className)}>
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  tech,
  githubHref,
  demoHref,
  index,
}: {
  title: string;
  description: string;
  tech?: string[];
  githubHref?: string | null;
  demoHref?: string | null;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col border-l border-r border-b md:border-r md:border-b py-10 relative group/feature border-border first:border-t",
        index % 2 === 0 && "md:border-l",
        index < 2 && "md:border-t",
      )}
    >
      {index < 2 && (
        <div className="opacity-0 group-hover/feature:opacity-70 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-50 dark:from-neutral-500 to-transparent pointer-events-none" />
      )}

      {index >= 2 && (
        <div className="opacity-0 group-hover/feature:opacity-70 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-50 dark:from-neutral-500 to-transparent pointer-events-none" />
      )}

      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-400 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed break-words relative z-10 px-10">
        {description}
      </p>
      {tech && tech.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 px-10">
          {tech.map((t) => (
            <span key={t} className="code-tag">
              {t}
            </span>
          ))}
        </div>
      )}
      {(githubHref || demoHref) && (
        <div className="mt-4 flex gap-4 px-10">
          {githubHref && (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {demoHref && (
            <a
              href={demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};


