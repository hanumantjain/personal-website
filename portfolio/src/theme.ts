import { useEffect, useState } from 'react'

// Dark is the default; an explicit choice is remembered in localStorage.
// index.html applies the same logic in an inline script before first paint, so there's no flash.
export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLOR = { dark: '#10141a', light: '#f5f7fa' }

function readTheme(): Theme {
  try {
    if (localStorage.getItem(STORAGE_KEY) === 'light') return 'light'
  } catch {
    // Storage can be unavailable (private mode, blocked site data); fall back to dark.
  }
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Not persisting is fine; the choice still applies for this visit.
    }
  }, [theme])

  return [theme, setTheme] as const
}
