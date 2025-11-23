import resume from "../assets/Hanumant_Resume.pdf";
import Marquee from "./Marquee";

 

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
              <div className="mt-6 bg-secondary rounded-md w-fit">
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Resume
                </a>
              </div>
            </div>
  
            <div>
              <h3 className="text-xl font-semibold mb-6">Tech Stack</h3>
              <div className="space-y-4">
                <div>
                  <div className="code-tag mb-2 w-fit">Programming Languages</div>
                  <Marquee
                    items={[
                      "Python",
                      "JavaScript (ES6+)",
                      "TypeScript",
                      "MySQL",
                      "HTML5",
                      "CSS3",
                      "MongoDB",
                      "PostgreSQL",
                    ]}
                    initialDuplicates={0}
                  />
                </div>
  
                <div>
                  <div className="code-tag mb-2 w-fit">Frameworks & Libraries</div>
                  <Marquee
                    items={[
                      "React.js",
                      "Next.js",
                      "Node.js",
                      "Express.js",
                      "FastAPI",
                      "Redux",
                      "Tailwind CSS",
                    ]}
                    initialDuplicates={2}
                  />
                </div>
  
                <div>
                  <div className="code-tag mb-2 w-fit">DevOps / CI-CD Tools</div>
                  <Marquee
                    items={[
                      "Jenkins",
                      "GitHub Actions",
                      "Docker",
                      "AWS (EC2, S3, Lambda, RDS, IAM)",
                    ]}
                    initialDuplicates={2}
                  />
                </div>

                <div>
                  <div className="code-tag mb-2 w-fit">Software & Tools</div>
                  <Marquee
                    items={[
                      "Visual Studio",
                      "Cursor",
                      "Git",
                      "Google Colab",
                    ]}
                    initialDuplicates={2}
                  />
                </div>

                <div>
                  <div className="code-tag mb-2 w-fit">Expertise</div>
                  <Marquee
                    items={[
                      "REST APIs",
                      "Generative AI",
                      "Agentic AI",
                      "Responsive Web Design",
                      "Agile",
                    ]}
                    initialDuplicates={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  