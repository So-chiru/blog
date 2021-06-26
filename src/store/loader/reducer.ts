import { LoaderState } from '@/@types/loader'
import { LoaderReducerAction } from './actions'

interface LoaderTypes {
  state: LoaderState
  progress: number
  lastChanged: number
  error?: Error
}

const LoaderDefault: LoaderTypes = {
  state: LoaderState.Ready,
  progress: -1,
  lastChanged: 0
}

const LoaderReducer = (
  state = LoaderDefault,
  action: LoaderReducerAction
): LoaderTypes => {
  switch (action.type) {
    case '@sochiru/loader/start':
      return Object.assign({}, state, {
        state: LoaderState.Loading,
        progress: 0,
        lastChanged: Date.now()
      })
    case '@sochiru/loader/updateProgress':
      return Object.assign({}, state, {
        progress: action.progress
      })
    case '@sochiru/loader/done':
      return Object.assign({}, state, {
        state: LoaderState.Loaded,
        progress: 1,
        lastChanged: Date.now()
      })
    case '@sochiru/loader/failed':
      return Object.assign({}, state, {
        state: LoaderState.Failed,
        error: action.error,
        progress: 1,
        lastChanged: Date.now()
      })
    case '@sochiru/loader/updateState':
      return Object.assign({}, state, {
        state: action.state,
        lastChanged: Date.now()
      })
    default:
      return state
  }
}

export default LoaderReducer
