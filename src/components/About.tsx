import resume from "../assets/Hanumant_Resume.pdf";
import Marquee from "./Marquee";

 

const About = () => {
    return (
      <section id="about" className="pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 mb-6 sm:mb-8 md:mb-12">
            <span className="section-number text-[10px] sm:text-xs md:text-sm whitespace-nowrap">01</span>
            <div className="h-px flex-1 bg-border min-w-0" />
            <span className="code-tag text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">about.json</span>
          </div>
  
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">About Me</h2>
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                <p className="break-words">
                  I'm a Full Stack Developer with a passion for building modern, scalable web applications. 
                  I specialize in creating efficient solutions that balance clean code with exceptional user experiences.
                </p>
                <p className="break-words">
                  My journey in software development has led me to work with cutting-edge technologies 
                  and contribute to projects that make a real impact.
                </p>
                <p className="break-words">
                  When I'm not coding, you can find me exploring new technologies, contributing to open source, 
                  or sharing knowledge with the developer community.
                </p>
              </div>
              <div className="mt-4 sm:mt-5 md:mt-6 bg-secondary rounded-md w-fit max-w-full">
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="truncate">View Resume</span>
                </a>
              </div>
            </div>
  
            <div className="min-w-0 mt-6 md:mt-0">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6">Tech Stack</h3>
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                <div>
                  <div className="code-tag mb-1.5 sm:mb-2 w-fit text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">Programming Languages</div>
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
                  <div className="code-tag mb-1.5 sm:mb-2 w-fit text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">Frameworks & Libraries</div>
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
                  <div className="code-tag mb-1.5 sm:mb-2 w-fit text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">DevOps / CI-CD Tools</div>
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
                  <div className="code-tag mb-1.5 sm:mb-2 w-fit text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">Software & Tools</div>
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
                  <div className="code-tag mb-1.5 sm:mb-2 w-fit text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">Expertise</div>
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
  