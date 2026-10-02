import type { Accent } from '../data/portfolio'

// Full class names so Tailwind can see them at build time.
export const accentText: Record<Accent, string> = {
  primary: 'text-primary-container',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary-container',
}

export const accentBg: Record<Accent, string> = {
  primary: 'bg-primary-container',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary-container',
}

export const accentGlow: Record<Accent, string> = {
  primary: 'shadow-[0_0_8px_#00F0FF]',
  secondary: 'shadow-[0_0_8px_#8B5CF6]',
  tertiary: 'shadow-[0_0_8px_#65F2B5]',
}

export const accentHoverShadow: Record<Accent, string> = {
  primary: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]',
  secondary: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]',
  tertiary: 'hover:shadow-[0_0_30px_rgba(101,242,181,0.2)]',
}
