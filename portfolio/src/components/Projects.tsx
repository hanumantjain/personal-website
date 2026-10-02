import { ArrowUpRight, Bot, Boxes, Cloud, LayoutTemplate, Search, Smartphone, X, Zap } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { categories, projects, type Accent, type Category, type Project } from '../data/portfolio'
import { GithubIcon } from './BrandIcons'
import { accentHoverShadow, accentText } from './accent'
import SectionHeading from './SectionHeading'

const categoryStyle: Record<Category, { accent: Accent; icon: typeof Cloud; label: string }> = {
  cloud: { accent: 'primary', icon: Cloud, label: 'CLOUD // FULL-STACK' },
  ai: { accent: 'secondary', icon: Bot, label: 'AI // AGENTS' },
  web3: { accent: 'tertiary', icon: Boxes, label: 'WEB3 // ON-CHAIN' },
  frontend: { accent: 'primary', icon: LayoutTemplate, label: 'FRONTEND' },
  mobile: { accent: 'tertiary', icon: Smartphone, label: 'MOBILE // ANDROID' },
}

const headerGradient: Record<Accent, string> = {
  primary: 'from-primary-container/25 via-surface-container-lowest to-surface-container-lowest',
  secondary: 'from-secondary-container/50 via-surface-container-lowest to-surface-container-lowest',
  tertiary: 'from-tertiary-container/20 via-surface-container-lowest to-surface-container-lowest',
}

function matches(p: Project, query: string) {
  const haystack = [p.name, p.kind, p.description, ...p.tech, ...(p.highlights ?? [])].join(' ').toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

function ProjectCard({ project }: { project: Project }) {
  const style = categoryStyle[project.categories[0]]
  const Icon = style.icon

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl bg-surface-container-low transition-shadow duration-300 ${accentHoverShadow[style.accent]}`}
    >
      {project.featured && (
        <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${headerGradient[style.accent]}`}>
          <div
            className="absolute inset-0 opacity-30 [--grid-line:color-mix(in_srgb,var(--color-outline)_35%,transparent)]"
            style={{
              backgroundImage:
                'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <Icon
            className={`absolute -right-4 -bottom-6 size-40 opacity-20 transition-transform duration-500 group-hover:scale-110 ${accentText[style.accent]}`}
            strokeWidth={1}
          />
          <span
            className={`absolute top-3 left-3 flex items-center gap-1.5 rounded bg-surface-container-highest/90 px-2 py-1 font-mono text-label-sm backdrop-blur-md ${accentText[style.accent]}`}
          >
            <span className="size-1.5 animate-pulse rounded-full bg-current" />
            FEATURED // {style.label}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div>
          {!project.featured && (
            <span className={`mb-2 flex items-center gap-1.5 font-mono text-label-sm ${accentText[style.accent]}`}>
              <Icon className="size-3.5" />
              {style.label}
            </span>
          )}
          <h3 className="text-headline-md font-semibold text-on-surface transition-colors group-hover:text-primary">
            {project.name}
          </h3>
          <p className="mb-3 font-mono text-code-sm text-on-surface-variant">{project.kind}</p>
          <p className="text-body-sm text-on-surface-variant">{project.description}</p>

          {project.highlights && (
            <ul className="mt-3 space-y-1.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-body-sm text-on-surface">
                  <Zap className={`mt-0.5 size-3.5 shrink-0 ${accentText[style.accent]}`} />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.tech.map((t) => (
              <li key={t} className="rounded bg-surface-container-highest px-2 py-0.5 font-mono text-code-sm text-on-surface">
                {t}
              </li>
            ))}
          </ul>
        </div>

        {(project.github || project.demo) && (
          <div className="flex items-center justify-end gap-2 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-9 items-center gap-1.5 rounded bg-surface-container px-3 py-1.5 font-mono text-label-sm text-on-surface transition-colors hover:bg-surface-variant"
                aria-label={`${project.name} source on GitHub`}
              >
                <GithubIcon className="size-3.5" />
                SOURCE
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-9 items-center gap-1 rounded bg-primary-container px-3 py-1.5 font-mono text-label-sm font-semibold text-on-primary-container transition-shadow hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                aria-label={`${project.name} live demo`}
              >
                LIVE
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  // ⌘K / Ctrl+K jumps to the project search from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.scrollIntoView({ block: 'center' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length }
    for (const p of projects) for (const cat of p.categories) c[cat] = (c[cat] ?? 0) + 1
    return c
  }, [])

  const visible = projects.filter((p) => (filter === 'all' || p.categories.includes(filter)) && matches(p, query))

  return (
    <section id="projects" className="mx-auto max-w-[1536px] px-gutter-mobile py-16 sm:px-gutter">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <SectionHeading index="02" eyebrow="Project index" title="Things I've Built">
          Full-stack products on AWS, autonomous AI agents, hackathon builds and Web3 experiments.
        </SectionHeading>

        <div className="flex w-full shrink-0 items-center rounded-lg bg-surface-container px-4 py-2.5 shadow-inner transition-colors focus-within:bg-surface-container-high lg:w-80">
          <Search className="mr-2 size-4 text-on-surface-variant" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
            placeholder="Search by name or tech…"
            aria-label="Search projects"
            className="w-full bg-transparent font-mono text-code-sm text-on-surface placeholder:text-outline focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-on-surface-variant hover:text-on-surface">
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="hidden rounded bg-surface-container-highest px-1.5 py-0.5 font-mono text-label-sm text-on-surface-variant sm:inline-block">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* One swipeable row on phones, wrapping chips from sm up. */}
      <div
        className="-mx-gutter-mobile mb-8 flex items-center gap-2 overflow-x-auto px-gutter-mobile pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        role="group"
        aria-label="Filter projects"
      >
        {categories.map((c) => {
          const active = filter === c.id
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={`flex min-h-9 shrink-0 items-center gap-2 rounded-full px-4 py-1.5 font-mono text-label-md whitespace-nowrap transition-colors ${
                active
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-bright hover:text-on-surface'
              }`}
            >
              {c.label}
              <span
                className={`rounded-full px-1.5 font-mono text-label-sm ${active ? 'bg-surface-container-lowest/20' : 'bg-surface-container-low'}`}
              >
                {String(counts[c.id] ?? 0).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </div>

      {visible.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-surface-container-low p-10 text-center font-mono text-code-md text-on-surface-variant">
          <span className="text-error">grep: no matches</span> for “{query}”.{' '}
          <button
            type="button"
            className="text-primary underline underline-offset-4"
            onClick={() => {
              setQuery('')
              setFilter('all')
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  )
}
