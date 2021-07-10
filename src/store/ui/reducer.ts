import { getSystemTheme, getThemeMode, isSystemMatch } from '@/utils/theme'
import { ThemeState } from '@/@types/theme'
import { UIReducerAction } from './actions'

interface UITypes {
  theme: {
    mode: ThemeState
    matchToSystem: boolean
  }
  searchOverlay: boolean
}

const UIDefault: UITypes = {
  theme: {
    mode: getThemeMode(),
    matchToSystem: isSystemMatch()
  },
  searchOverlay: false
}

const ThemeHandler = (state = UIDefault, action: UIReducerAction) => {
  const obj: UITypes['theme'] = {
    mode: state.theme.mode,
    matchToSystem: state.theme.matchToSystem
  }

  if (typeof action.matchToSystem !== 'undefined') {
    obj.matchToSystem = action.matchToSystem

    if (action.matchToSystem) {
      obj.mode = getSystemTheme()
    } else {
      obj.mode = (action.data as ThemeState) || ThemeState.Day
    }
  } else {
    obj.mode = action.data as ThemeState
  }

  localStorage.setItem('@sochiru/theme/mode', obj.mode)
  localStorage.setItem('@sochiru/theme/system', obj.matchToSystem ? '1' : '0')

  return {
    ...state,
    theme: obj
  }
}

const LoaderReducer = (state = UIDefault, action: UIReducerAction): UITypes => {
  switch (action.type) {
    case '@sochiru/ui/setTheme':
      return ThemeHandler(state, action)
    case '@sochiru/ui/openSearchOverlay':
      return Object.assign({}, state, {
        searchOverlay: action.data as boolean
      })
    default:
      return state
  }
}

export default LoaderReducer
