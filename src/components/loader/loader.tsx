import ProfileCloud from '@/components/elements/ProfileCloud'

import '@/styles/loader.scss'
import { useEffect, useState } from 'react'

import { LOAD_STATE } from '@/@types/loader'
import { concatClass } from '@/utils/component'

interface ProgressBarProps {
  hide: boolean
  state: LOAD_STATE
  progress: number
}

const ProgressBar = ({ hide, progress, state }: ProgressBarProps) => {
  return (
    <div
      className={concatClass('progress-bar', hide && 'hide')}
      style={{
        ['--progress' as string]: progress,
        ['--state' as string]: state
      }}
    ></div>
  )
}

const Loader = () => {
  const [state, updateState] = useState<LOAD_STATE>(LOAD_STATE.STARTED)
  const [progress, updateProgress] = useState<number>(-1)
  const [hide, updateHide] = useState<boolean>(false)

  useEffect(() => {
    if (document.readyState !== 'complete') {
      updateProgress(0.3)
      updateState(LOAD_STATE.LOADING)
    }

    const loaded = () => {
      updateProgress(1)
      updateState(LOAD_STATE.LOADED)
    }
    window.addEventListener('load', loaded)

    return () => {
      window.removeEventListener('load', loaded)
    }
  })

  useEffect(() => {
    let update: number

    if (state === LOAD_STATE.LOADED) {
      update = setTimeout(() => {
        updateHide(true)
      }, 300)
    } else {
      updateHide(false)
    }

    return () => {
      if (update) {
        clearTimeout(update)
      }
    }
  }, [state])

  return (
    <div className='cloud-loader'>
      <ProfileCloud
        state={state}
        hide={hide}
        style={{
          ['--progress' as string]: progress
        }}
      ></ProfileCloud>
      <ProgressBar hide={hide} state={state} progress={progress}></ProgressBar>
    </div>
  )
}

export default Loader
