import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'

const PipelineRunner = lazy(() => import('./lab/PipelineRunner'))

// Same footprint as the loaded runner so the page doesn't jump when it mounts.
const placeholder = 'theme-dark h-[1400px] rounded-xl bg-surface-container-lowest md:h-[1050px] lg:h-[720px]'

export default function Lab() {
  const sectionRef = useRef<HTMLElement>(null)
  const [near, setNear] = useState(false)

  // Only load the runner once the visitor scrolls near the Lab.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), {
      rootMargin: '600px 0px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="lab" className="mx-auto max-w-[1536px] px-gutter-mobile py-16 sm:px-gutter">
      <div className="mb-8">
        <SectionHeading index="03" eyebrow="Lab" title="Deploy Lab">
          At IBM I cut deploy time by ~40% with automated Jenkins pipelines. Here’s a toy pipeline for this site you can
          run — and break. Switch between legacy and optimised, add a flaky test, or fail the health check and watch it
          roll back.
        </SectionHeading>
      </div>

      {near ? (
        <Suspense fallback={<div className={`${placeholder} animate-pulse`} />}>
          <PipelineRunner />
        </Suspense>
      ) : (
        <div className={placeholder} />
      )}
    </section>
  )
}
