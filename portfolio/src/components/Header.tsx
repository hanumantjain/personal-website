import { FileText, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'
import { useTheme } from '../theme'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'lab', label: 'Lab' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Terminal / Contact' },
]

function useActiveSection() {
  const [active, setActive] = useState(sections[0].id)
  useEffect(() => {
    let frame = 0
    // Active = the last section whose top has passed 30% of the viewport
    // (or the last section once the page is scrolled to the bottom).
    const update = () => {
      frame = 0
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = sections[0].id
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.3) current = id
      }
      setActive(atBottom ? sections[sections.length - 1].id : current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return active
}

function ThemeToggle() {
  const [theme, setTheme] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  const Icon = theme === 'dark' ? Moon : Sun
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="flex size-9 items-center justify-center rounded text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
    >
      <Icon className="size-4" />
    </button>
  )
}

export default function Header() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface-container-lowest/80 shadow-[0_1px_8px_rgba(0,0,0,0.4)] backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-gutter-mobile sm:px-gutter">
        <a href="#overview" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="" className="size-8" />
          <span className="flex flex-col">
            <span className="font-mono text-code-md font-semibold tracking-tight text-primary">{profile.brand}</span>
            <span className="hidden text-label-sm text-on-surface-variant uppercase sm:inline">
              Full-Stack // Cloud Engineer
            </span>
          </span>
          <span className="ml-1 hidden items-center gap-1.5 rounded-full bg-surface-container-high px-2 py-0.5 2xl:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-tertiary-container" />
            <span className="font-mono text-label-sm text-tertiary-container">{profile.status}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-4 font-mono text-code-sm whitespace-nowrap xl:flex" aria-label="Sections">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={
                active === s.id
                  ? 'font-semibold text-primary'
                  : 'text-on-surface-variant transition-colors hover:text-on-surface'
              }
            >
              // {String(i + 1).padStart(2, '0')}. {s.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden rounded p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface md:block"
          >
            <GithubIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden rounded p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface md:block"
          >
            <LinkedinIcon />
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded bg-secondary-container px-3 py-1.5 font-mono text-label-sm text-on-secondary-container transition-colors hover:bg-secondary-container/85 sm:flex"
          >
            <FileText className="size-3.5" />
            RESUME
          </a>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded bg-surface-container text-on-surface-variant hover:text-on-surface xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-surface-container-high bg-surface-container-lowest/95 px-gutter-mobile py-3 font-mono text-code-md xl:hidden"
          aria-label="Sections"
        >
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className={`block rounded px-2 py-2.5 ${
                active === s.id ? 'bg-surface-container text-primary' : 'text-on-surface-variant'
              }`}
            >
              // {String(i + 1).padStart(2, '0')}. {s.label}
            </a>
          ))}
          <div className="mt-2 flex gap-2 border-t border-surface-container-high pt-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded px-2 py-2 text-on-surface-variant">
              <GithubIcon /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded px-2 py-2 text-on-surface-variant">
              <LinkedinIcon /> LinkedIn
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded px-2 py-2 text-secondary">
              <FileText className="size-4" /> Resume
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
