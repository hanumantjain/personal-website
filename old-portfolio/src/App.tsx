import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Project";
import Contact from "./components/Contact";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </ThemeProvider>
  )
}

export default App
