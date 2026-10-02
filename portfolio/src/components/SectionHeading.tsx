import type { ReactNode } from 'react'

type Props = {
  index: string
  eyebrow: string
  title: string
  children?: ReactNode
}

export default function SectionHeading({ index, eyebrow, title, children }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <span className="font-mono text-label-sm tracking-widest text-primary uppercase">
          // {index}. {eyebrow}
        </span>
        <span className="h-px w-20 bg-surface-container-highest" />
      </div>
      <h2 className="text-[28px]/9 font-bold tracking-tight text-primary sm:text-headline-lg">{title}</h2>
      {children && <p className="max-w-2xl text-body-md text-on-surface-variant">{children}</p>}
    </div>
  )
}
