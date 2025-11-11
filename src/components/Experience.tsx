interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    company: "George Washington University",
    role: "Frontend Developer",
    period: "March 2025 - Present",
    description: [
      "Designed and deployed full-stack applications on AWS EC2 with AWS RDS for reliable database management and 99.999% uptime.",
      "Containerized applications using Docker, enabling 40% faster deployment cycles.",
      "Designed CI/CD pipelines with GitHub Actions, reducing release times by 50%.",
      "Built full-stack application with React.js, Node.js, Express.js, PostgreSQL, and Tailwind CSS, supporting 500+ concurrent users and 20% faster load times.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-number">02</span>
          <div className="h-px flex-1 bg-border" />
          <span className="code-tag">experience.json</span>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="border-l-2 border-border pl-6 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent ring-2 ring-border" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
                </div>

                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
