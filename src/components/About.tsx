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
                  <div className="code-tag mb-2">Programming Languages</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Python",
                      "JavaScript (ES6+)",
                      "TypeScript",
                      "MySQL",
                      "HTML5",
                      "CSS3",
                      "MongoDB",
                      "PostgreSQL",
                    ].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
  
                <div>
                  <div className="code-tag mb-2">Frameworks & Libraries</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React.js",
                      "Next.js",
                      "Node.js",
                      "Express.js",
                      "FastAPI",
                      "Redux",
                      "Tailwind CSS",
                    ].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
  
                <div>
                  <div className="code-tag mb-2">DevOps / CI-CD Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Jenkins",
                      "GitHub Actions",
                      "Docker",
                      "AWS (EC2, S3, Lambda, RDS, IAM)",
                    ].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="code-tag mb-2">Software & Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {["Visual Studio", "Cursor", "Git", "Google Colab"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-secondary text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="code-tag mb-2">Expertise</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "REST APIs",
                      "Generative AI",
                      "Agentic AI",
                      "Responsive Web Design",
                      "Agile",
                    ].map((tech) => (
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
  