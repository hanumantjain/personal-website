import { FileText, Mail } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { achievements, experience, profile, projects, skills } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const cli = profile.handle
const prompt = `${cli}@portfolio:~$`

const link = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
    {label}
  </a>
)

const commands: Record<string, { help: string; run: () => ReactNode }> = {
  [`${cli} --help`]: {
    help: 'List available commands',
    run: () => (
      <>
        Available commands:
        {Object.entries(commands).map(([name, c]) => (
          <div key={name}>
            • <b className="text-on-surface">{name}</b> — {c.help}
          </div>
        ))}
        <div>
          • <b className="text-on-surface">clear</b> — Reset the terminal
        </div>
      </>
    ),
  },
  [`${cli} --status`]: {
    help: 'Current status and location',
    run: () => (
      <>
        [STATUS] {profile.status}
        <br />
        Role: {profile.role}
        <br />
        Location: {profile.location}
      </>
    ),
  },
  [`${cli} --skills`]: {
    help: 'Core languages and tools',
    run: () => (
      <>
        [STACK MATRIX]
        {skills.slice(0, 5).map((g) => (
          <div key={g.group}>
            • {g.group.replace(/_/g, ' ')}: {g.items.join(', ')}
          </div>
        ))}
      </>
    ),
  },
  [`${cli} --experience`]: {
    help: 'Career timeline',
    run: () => (
      <>
        [CAREER LOG]
        {experience.map((j) => (
          <div key={j.company}>
            • {j.period}: {j.role} @ {j.company}
          </div>
        ))}
        {achievements.map((a) => (
          <div key={a.title}>
            ★ {a.title}, {a.event}
          </div>
        ))}
      </>
    ),
  },
  [`${cli} --projects`]: {
    help: 'Featured projects',
    run: () => (
      <>
        [FEATURED]
        {projects
          .filter((p) => p.featured)
          .map((p) => (
            <div key={p.name}>
              • {p.name} — {p.kind}
              {p.demo && <> ({link(p.demo, 'live')})</>}
            </div>
          ))}
        <div>
          See all {projects.length} in{' '}
          <a href="#projects" className="text-primary underline underline-offset-4">
            // 02. Projects
          </a>
        </div>
      </>
    ),
  },
  [`${cli} --lab`]: {
    help: 'Open the Deploy Lab',
    run: () => {
      document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' })
      return (
        <>
          [LAB] Opening the{' '}
          <a href="#lab" className="text-primary underline underline-offset-4">
            Deploy Lab
          </a>{' '}
          — run (and break) a CI/CD pipeline.
        </>
      )
    },
  },
  [`${cli} --contact`]: {
    help: 'Email, GitHub and LinkedIn',
    run: () => (
      <>
        [CONTACT]
        <div>• Email: {link(`mailto:${profile.email}`, profile.email)}</div>
        <div>• GitHub: {link(profile.github, profile.github.replace('https://', ''))}</div>
        <div>• LinkedIn: {link(profile.linkedin, profile.linkedin.replace('https://www.', ''))}</div>
      </>
    ),
  },
  [`${cli} --resume`]: {
    help: 'Open resume (PDF)',
    run: () => {
      window.open(profile.resume, '_blank', 'noopener')
      return <>Opening {link(profile.resume, 'Hanumant_Jain_Resume.pdf')} … [OK]</>
    },
  },
}

const aliases: Record<string, string> = {
  help: `${cli} --help`,
  whoami: `${cli} --status`,
  ls: `${cli} --projects`,
  contact: `${cli} --contact`,
}

type Entry = { id: number; cmd: string; output: ReactNode; ok: boolean }

const quickRun = ['--status', '--skills', '--experience', '--contact'].map((f) => `${cli} ${f}`)

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>(() => [
    { id: 0, cmd: `${cli} --status`, output: commands[`${cli} --status`].run(), ok: true },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [entries])

  const run = (raw: string) => {
    const cmd = raw.trim().replace(/\s+/g, ' ')
    if (!cmd) return
    setHistory((h) => [cmd, ...h])
    setHistoryIndex(-1)
    setInput('')
    if (cmd === 'clear') {
      setEntries([])
      return
    }
    const resolved = commands[cmd] ?? commands[aliases[cmd]]
    setEntries((e) => [
      ...e,
      {
        id: nextId.current++,
        cmd,
        ok: !!resolved,
        output: resolved ? resolved.run() : `zsh: command not found: ${cmd}. Type '${cli} --help' for commands.`,
      },
    ])
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') run(input)
    else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const i = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(i)
      setInput(history[i])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = historyIndex - 1
      setHistoryIndex(Math.max(i, -1))
      setInput(i >= 0 ? history[i] : '')
    } else if (e.key === 'Tab' && input) {
      const match = [...Object.keys(commands), 'clear'].find((c) => c.startsWith(input))
      if (match) {
        e.preventDefault()
        setInput(match)
      }
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-[1536px] px-gutter-mobile py-16 sm:px-gutter">
      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-label-sm tracking-widest text-primary uppercase">// 06. Terminal / Contact</span>
          <h2 className="text-[28px]/9 font-bold tracking-tight text-primary sm:text-headline-lg">Let’s build something.</h2>
          <p className="max-w-2xl text-body-md text-on-surface-variant">
            Query the terminal below, or reach out directly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded bg-primary-container px-4 py-2.5 font-mono text-code-sm font-semibold text-on-primary-container shadow-[0_0_20px_rgba(0,240,255,0.35)]"
          >
            <Mail className="size-4" /> {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded bg-surface-container-high px-4 py-2.5 font-mono text-code-sm text-on-surface hover:bg-surface-bright">
            <LinkedinIcon /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded bg-surface-container-high px-4 py-2.5 font-mono text-code-sm text-on-surface hover:bg-surface-bright">
            <GithubIcon /> GitHub
          </a>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded bg-secondary-container/40 px-4 py-2.5 font-mono text-code-sm text-secondary-fixed hover:bg-secondary-container/60">
            <FileText className="size-4" /> Resume
          </a>
        </div>
      </div>

      <div className="theme-dark overflow-hidden rounded-2xl bg-surface-container-lowest shadow-2xl">
        <div className="flex items-center justify-between gap-3 bg-surface-container-high px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <span className="size-3 shrink-0 rounded-full bg-error" />
            <span className="size-3 shrink-0 rounded-full bg-secondary" />
            <span className="size-3 shrink-0 rounded-full bg-tertiary-container" />
            <span className="ml-3 truncate font-mono text-label-md text-on-surface">zsh — {cli}@portfolio:~</span>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-label-sm text-primary" aria-label="Connected">
            <span className="size-1.5 animate-ping rounded-full bg-primary" />
            <span className="hidden sm:inline">CONNECTED</span>
          </span>
        </div>

        <div className="flex min-h-[340px] flex-col justify-between gap-4 p-4 font-mono text-code-sm sm:p-6">
          <div ref={scrollRef} className="max-h-[360px] space-y-1 overflow-y-auto" aria-live="polite">
            <div className="text-on-surface-variant">
              Type <span className="font-semibold text-primary">{cli} --help</span> or use the chips below.
            </div>
            {entries.map((e) => (
              <div key={e.id}>
                <div className="flex items-center gap-2 pt-2 text-on-surface-variant">
                  <span className="font-semibold text-primary-container">{prompt}</span>
                  <span className="text-on-surface">{e.cmd}</span>
                </div>
                <div className={`pl-4 leading-relaxed ${e.ok ? 'text-tertiary-container' : 'text-error'}`}>{e.output}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-label-sm tracking-wider text-on-surface-variant uppercase">Quick run:</span>
              {quickRun.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => run(c)}
                  aria-label={c}
                  className="min-h-9 rounded bg-surface-container px-2 py-1 text-primary transition-colors hover:bg-surface-variant"
                >
                  {/* Phones show just the flag to keep the chips on one or two rows. */}
                  <span className="hidden sm:inline">{cli} </span>
                  {c.slice(cli.length + 1)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => run('clear')}
                className="min-h-9 rounded bg-surface-container px-2 py-1 text-error transition-colors hover:bg-surface-variant"
              >
                clear
              </button>
            </div>
            <label className="flex items-center gap-2 rounded-lg bg-surface-container-high px-4 py-2.5 transition-shadow focus-within:ring-1 focus-within:ring-primary-container">
              <span className="shrink-0 font-semibold text-code-md text-primary-container select-none">
                <span className="hidden sm:inline">{prompt}</span>
                <span className="sm:hidden">$</span>
              </span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal command"
                placeholder={`try: ${cli} --projects`}
                className="w-full bg-transparent text-code-md text-on-surface outline-none placeholder:text-outline-variant"
              />
              <span className="inline-block h-4 w-2 animate-pulse bg-primary select-none" />
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}
