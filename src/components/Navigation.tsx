import { useCallback, type MouseEvent } from "react";
import { NavLink } from "../components/NavLink";

const SECTIONS = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const Navigation = () => {
  const handleNavigate = useCallback((event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.history.replaceState(null, "", `#${id}`);
  }, []);

  const handleHome = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" onClick={handleHome} className="font-mono text-lg font-semibold">
          hanumant<span className="text-muted-foreground">()</span>
        </NavLink>
        
        <div className="flex items-center gap-8">
          {SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              to={`/#${section.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground"
              onClick={(event) => handleNavigate(event, section.id)}
            >
              {section.label}
            </NavLink>
          ))}
        </div>

        <div className="font-mono text-xs text-muted-foreground">
          ready to build
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
