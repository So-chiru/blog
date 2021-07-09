import { ThemeState } from '@/@types/theme'

export const isSystemMatch = () => {
  const systemMatch = localStorage.getItem('@sochiru/theme/system')
  return !systemMatch || systemMatch === '1'
}

export const getThemeMode = (): ThemeState => {
  const savedMode = localStorage.getItem('@sochiru/theme/mode')
  const systemMatch = isSystemMatch()

  if (systemMatch) {
    return getSystemTheme()
  }

  if (savedMode === ThemeState.Day) {
    return ThemeState.Day
  } else if (savedMode === ThemeState.Night) {
    return ThemeState.Night
  }

  return ThemeState.Day
}

export const getSystemTheme = (): ThemeState => {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (systemDark) {
    return ThemeState.Night
  }

  return ThemeState.Day
}

export const systemThemeUpdateHandler = (func: (night: boolean) => void) => {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)')

  const listener = (ev: MediaQueryListEvent) => func(ev.matches)

  systemDark.addEventListener('change', listener)

  const delisten = () => {
    systemDark.removeEventListener('change', listener)
  }

  return delisten
}
