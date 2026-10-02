import { Cloud, Gauge, Webhook, Workflow } from 'lucide-react'
import { pillars } from '../data/portfolio'
import { accentText } from './accent'

const icons = { cloud: Cloud, api: Webhook, gauge: Gauge, pipeline: Workflow }

export default function Pillars() {
  return (
    <section className="bg-surface-container-low py-12 shadow-inner" aria-labelledby="pillars-title">
      <div className="mx-auto max-w-[1536px] px-gutter-mobile sm:px-gutter">
        <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-label-sm tracking-widest text-primary uppercase">// What I build</span>
            <h2 id="pillars-title" className="mt-1 text-[28px]/9 font-bold tracking-tight text-primary sm:text-headline-lg">
              Engineering Focus
            </h2>
          </div>
          <span className="flex items-center gap-2 font-mono text-code-sm text-on-surface-variant">
            <span className="size-2 rounded-full bg-tertiary-container" />
            NUMBERS FROM PRODUCTION WORK
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p) => {
            const Icon = icons[p.icon]
            return (
              <article
                key={p.title}
                className="flex flex-col justify-between rounded-xl bg-surface-container-high/60 p-6 transition-colors hover:bg-surface-container-high"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`rounded bg-surface-container-lowest p-2.5 ${accentText[p.accent]}`}>
                      <Icon className="size-6" />
                    </div>
                    <span className={`rounded bg-surface-container px-2 py-0.5 font-mono text-label-sm ${accentText[p.accent]}`}>
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mb-1 text-headline-md font-semibold text-on-surface">{p.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{p.body}</p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-2 font-mono text-code-sm text-on-surface-variant">
                  <span>{p.metricLabel}</span>
                  <span className={`font-semibold ${accentText[p.accent]}`}>{p.metric}</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
