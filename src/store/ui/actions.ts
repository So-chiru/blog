import { ThemeState } from '@/@types/theme'
import { getSystemTheme } from '@/utils/theme'

export interface UIReducerAction {
  type: string
  data?: unknown
  matchToSystem?: boolean
}

export const setTheme = (state: ThemeState): UIReducerAction => {
  return {
    type: '@sochiru/ui/setTheme',
    data: state,
    matchToSystem: false
  }
}

export const setThemeSystem = (state: ThemeState): UIReducerAction => {
  return {
    type: '@sochiru/ui/setTheme',
    data: state
  }
}
export const setThemeMatchToSystem = (state: boolean): UIReducerAction => {
  return {
    type: '@sochiru/ui/setTheme',
    matchToSystem: state
  }
}

export const openSearchOverlay = (state: boolean): UIReducerAction => {
  return {
    type: '@sochiru/ui/openSearchOverlay',
    data: state
  }
}

export default {
  setTheme,
  openSearchOverlay
}
