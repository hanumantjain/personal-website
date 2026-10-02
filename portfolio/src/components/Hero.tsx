import { ArrowUpRight, Box, Cpu, Rocket, Terminal } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { heroStats, profile } from '../data/portfolio'
import { GithubIcon } from './BrandIcons'

// three.js is ~500KB, so the scene loads in its own chunk after first paint.
const CyberCore = lazy(() => import('./CyberCore'))

export default function Hero() {
  return (
    <section id="overview" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/4 -z-10 size-[600px] rounded-full bg-primary-container/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-60 right-10 -z-10 size-[500px] rounded-full bg-secondary-container/20 blur-[160px]" />

      <div className="mx-auto grid max-w-[1536px] grid-cols-1 items-center gap-10 px-gutter-mobile py-10 sm:px-gutter lg:grid-cols-12 lg:py-16">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="inline-flex flex-wrap items-center gap-2 self-start rounded-full bg-surface-container-high/90 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-tertiary-container opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-tertiary-container" />
            </span>
            <span className="hidden font-mono text-label-sm text-on-surface-variant uppercase sm:inline">{profile.location}</span>
            <span className="hidden font-mono text-code-sm text-outline-variant sm:inline">|</span>
            <span className="font-mono text-code-sm font-semibold text-primary">{profile.role.split('|')[1].trim()}</span>
          </div>

          <div>
            <p className="mb-2 font-mono text-code-md text-primary-container">
              <span className="text-on-surface-variant">$ whoami →</span> {profile.name}
            </p>
            <h1 className="text-[32px]/10 font-extrabold tracking-tight text-balance text-primary min-[400px]:text-display-mobile sm:text-display">
              {profile.headline}
            </h1>
          </div>

          <p className="max-w-2xl text-body-lg font-light text-on-surface-variant">{profile.summary}</p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="flex items-center gap-2 rounded bg-primary-container px-6 py-3 font-mono text-code-md font-semibold text-on-primary-container shadow-[0_0_24px_rgba(0,240,255,0.45)] transition-shadow hover:shadow-[0_0_32px_rgba(0,240,255,0.7)]"
            >
              <Rocket className="size-4" />
              EXPLORE PROJECTS
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded bg-surface-container-high px-6 py-3 font-mono text-code-md text-on-surface transition-colors hover:bg-surface-bright"
            >
              <GithubIcon />
              GITHUB
              <ArrowUpRight className="size-4 text-on-surface-variant" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded bg-secondary-container/30 px-4 py-3 font-mono text-code-md text-secondary-fixed transition-colors hover:bg-secondary-container/50"
            >
              <Terminal className="size-4" />
              GET IN TOUCH
            </a>
          </div>

          <dl className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end rounded bg-surface-container-lowest/80 p-3 backdrop-blur-md">
                <dt className="mt-1 font-mono text-label-sm text-on-surface-variant uppercase">&gt; {s.label}</dt>
                <dd className="font-mono text-code-lg font-bold text-primary">
                  {s.value}
                  <span className="font-light text-tertiary-container">{s.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="w-full lg:col-span-5">
          <div className="theme-dark overflow-hidden rounded-xl bg-surface-container-lowest shadow-2xl">
            <div className="flex items-center justify-between bg-surface-container-high px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-error/80" />
                <span className="size-2.5 rounded-full bg-secondary/80" />
                <span className="size-2.5 rounded-full bg-tertiary-container/80" />
                <span className="ml-2 font-mono text-label-sm text-on-surface">CORE.NODE // THREE.JS</span>
              </div>
              <span className="flex items-center gap-1 font-mono text-label-sm text-primary">
                <Cpu className="size-3.5 animate-pulse" />
                WEBGL
              </span>
            </div>
            <div className="relative h-[360px] bg-surface-container-lowest sm:h-[480px]">
              <Suspense fallback={<div className="absolute inset-0 animate-pulse bg-surface-container-lowest" />}>
                <CyberCore />
              </Suspense>
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center rounded-lg bg-surface-container-highest/80 p-2 backdrop-blur-xl">
                <span className="flex items-center gap-1.5 font-mono text-label-sm font-semibold text-on-surface uppercase">
                  <Box className="size-3.5 text-primary-container" />
                  Drag to rotate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
