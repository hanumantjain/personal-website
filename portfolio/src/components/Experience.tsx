import { Activity, CircleCheck, GraduationCap, MapPin, Trophy } from 'lucide-react'
import { achievements, education, experience } from '../data/portfolio'
import { accentBg, accentGlow, accentText } from './accent'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-[1536px] px-gutter-mobile py-16 sm:px-gutter">
      <div className="pointer-events-none absolute top-1/3 left-0 -z-10 size-80 rounded-full bg-secondary-container/15 blur-3xl" />

      <SectionHeading index="04" eyebrow="Experience trace" title="Career & Education">
        Enterprise engineering at IBM and Accenture, with a CS master’s from George Washington University in between.
      </SectionHeading>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-code-md text-primary">
              <Activity className="size-4" />
              EXPERIENCE_TRACE
            </span>
            <span className="font-mono text-label-sm text-on-surface-variant">LOG_ENTRIES: {experience.length}</span>
          </div>

          <ol className="relative flex flex-col gap-6 pl-6">
            <span className="absolute top-2 bottom-6 left-2 w-0.5 bg-surface-variant" aria-hidden="true" />
            {experience.map((job) => (
              <li
                key={job.company}
                className="relative flex flex-col gap-3 rounded bg-surface-container-low p-6 transition-colors hover:bg-surface-container"
              >
                <span
                  className={`absolute top-7 -left-[23px] size-3 rounded-full ${accentBg[job.accent]} ${accentGlow[job.accent]}`}
                  aria-hidden="true"
                />
                <div>
                  <span className={`font-mono text-label-sm tracking-wider uppercase ${accentText[job.accent]}`}>
                    {job.period}
                  </span>
                  <h3 className="text-headline-md font-semibold text-on-surface">{job.role}</h3>
                  <span className="flex flex-wrap items-center gap-x-2 font-mono text-code-sm text-on-surface-variant">
                    <span>{job.company}</span>
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      <MapPin className="size-3" /> {job.location}
                    </span>
                  </span>
                </div>

                <p className="text-body-md text-on-surface-variant">{job.summary}</p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {job.metrics.map((m) => (
                    <div key={m.label} className="rounded bg-surface-container p-3">
                      <span className="font-mono text-label-sm text-primary">// {m.label}</span>
                      <div className="mt-0.5 font-mono text-code-lg font-semibold text-on-surface">{m.value}</div>
                      <span className="text-body-sm text-on-surface-variant">{m.note}</span>
                    </div>
                  ))}
                </div>

                <ul className="flex flex-col gap-1.5">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-body-sm text-on-surface-variant">
                      <CircleCheck className={`mt-0.5 size-4 shrink-0 ${accentText[job.accent]}`} />
                      {pt}
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Tech used">
                  {job.tech.map((t) => (
                    <li key={t} className="rounded bg-surface-container-high px-2 py-0.5 font-mono text-code-sm text-on-surface">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <aside className="flex flex-col gap-6 lg:col-span-5">
          <div>
            <span className="mb-6 flex items-center gap-2 font-mono text-code-md text-secondary">
              <GraduationCap className="size-4" />
              EDUCATION
            </span>
            <div className="flex flex-col gap-3">
              {education.map((e) => (
                <div key={e.school} className="rounded bg-surface-container-low p-5">
                  <span className="font-mono text-label-sm text-secondary">{e.period}</span>
                  <h3 className="mt-1 text-body-lg font-semibold text-on-surface">{e.degree}</h3>
                  <p className="font-mono text-code-sm text-on-surface-variant">
                    {e.school} • {e.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-4 flex items-center gap-2 font-mono text-code-md text-tertiary-container">
              <Trophy className="size-4" />
              ACHIEVEMENTS
            </span>
            <div className="flex flex-col gap-3">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className="flex items-start gap-3 rounded bg-surface-container-low p-5 shadow-[inset_2px_0_0_var(--color-tertiary-container)]"
                >
                  <Trophy className="mt-0.5 size-5 shrink-0 text-tertiary-container" />
                  <div>
                    <h3 className="text-body-md font-semibold text-on-surface">{a.title}</h3>
                    <p className="font-mono text-code-sm text-on-surface-variant">{a.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
