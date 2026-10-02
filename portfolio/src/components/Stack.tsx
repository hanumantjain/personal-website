import { Cpu } from 'lucide-react'
import { skills } from '../data/portfolio'
import SectionHeading from './SectionHeading'

const tone = ['text-primary-container', 'text-secondary', 'text-tertiary-container']

export default function Stack() {
  return (
    <section id="stack" className="bg-surface-container-low py-16 shadow-inner">
      <div className="mx-auto max-w-[1536px] px-gutter-mobile sm:px-gutter">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading index="05" eyebrow="Tech matrix" title="Architecture & Stack">
            The languages, frameworks and cloud services I reach for day to day.
          </SectionHeading>
          <span className="flex items-center gap-2 font-mono text-code-sm text-on-surface-variant">
            <Cpu className="size-4 text-secondary" />
            {skills.reduce((n, g) => n + g.items.length, 0)} TOOLS INDEXED
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g, i) => (
            <div key={g.group} className="rounded-xl bg-surface-container-high/60 p-5">
              <h3 className={`mb-3 font-mono text-label-sm tracking-wide ${tone[i % tone.length]}`}>// {g.group}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="rounded bg-surface-container-lowest px-2 py-1 font-mono text-code-sm text-on-surface">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
