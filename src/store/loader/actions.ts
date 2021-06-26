import { LoaderState } from '@/@types/loader'

export interface LoaderReducerAction {
  type: string
  progress?: number
  state?: LoaderState
  error?: Error
}

export const updateProgress = (progress: number): LoaderReducerAction => {
  return {
    type: '@sochiru/loader/updateProgress',
    progress
  }
}

export const start = (): LoaderReducerAction => {
  return {
    type: '@sochiru/loader/start'
  }
}

export const done = (): LoaderReducerAction => {
  return {
    type: '@sochiru/loader/done'
  }
}

export const failed = (error: Error): LoaderReducerAction => {
  return {
    type: '@sochiru/loader/failed',
    error
  }
}

export const ready = (): LoaderReducerAction => {
  return {
    type: '@sochiru/loader/updateState',
    state: LoaderState.Ready
  }
}

export default { updateProgress, ready, start, done, failed }
