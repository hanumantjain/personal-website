const About = () => {
    return (
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="section-number">01</span>
            <div className="h-px flex-1 bg-border" />
            <span className="code-tag">about.json</span>
          </div>
  
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a Full Stack Developer with a passion for building modern, scalable web applications. 
                  I specialize in creating efficient solutions that balance clean code with exceptional user experiences.
                </p>
                <p>
                  My journey in software development has led me to work with cutting-edge technologies 
                  and contribute to projects that make a real impact.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open source, 
                  or sharing knowledge with the developer community.
                </p>
              </div>
            </div>
  
            <div>
              <h3 className="text-xl font-semibold mb-6">Tech Stack</h3>
              <div className="space-y-4">
                <div>
                  <div className="code-tag mb-2">Frontend</div>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
  
                <div>
                  <div className="code-tag mb-2">Backend</div>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
  
                <div>
                  <div className="code-tag mb-2">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "Docker", "AWS", "Vercel", "Figma"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  