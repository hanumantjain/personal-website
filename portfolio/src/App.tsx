import { useEffect } from 'react'
import Experience from './components/Experience'
import Header from './components/Header'
import Hero from './components/Hero'
import Lab from './components/Lab'
import Pillars from './components/Pillars'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Terminal from './components/Terminal'
import { profile } from './data/portfolio'

const year = new Date().getFullYear()

export default function App() {
  // The page renders after load, so the browser's own jump to #section finds nothing; redo it once mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <>
      <a
        href="#projects"
        className="sr-only z-[60] rounded bg-primary-container px-3 py-2 text-on-primary-container focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to projects
      </a>
      <Header />
      <main className="pt-16">
        <Hero />
        <Pillars />
        <Projects />
        <Lab />
        <Experience />
        <Stack />
        <Terminal />
      </main>
      <footer className="border-t border-surface-container-high">
        <div className="mx-auto max-w-[1536px] px-gutter-mobile py-6 text-center font-mono text-code-sm text-on-surface-variant sm:px-gutter">
          © {year} {profile.name}
        </div>
      </footer>
    </>
  )
}
