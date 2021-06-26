import ProfileCloud from '@/components/elements/ProfileCloud'

import '@/styles/loader.scss'
import { useEffect } from 'react'

import { LoaderState } from '@/@types/loader'
import { concatClass } from '@/utils/component'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'

import loaderActions from '@/store/loader/actions'

interface ProgressBarProps {
  hide: boolean
  state: LoaderState
  progress: number
}

// f: y=log(10,x+1)*0.8
const progressExpo = (t: number) => {
  return Math.log10(1 + t) * 0.8
}

const ProgressBar = ({ hide, progress, state }: ProgressBarProps) => {
  return (
    <div
      className={concatClass('progress-bar', hide && 'hide')}
      data-state={state}
      style={{
        ['--progress' as string]: progress,
        ['--state' as string]: state
      }}
    ></div>
  )
}

const Loader = () => {
  const dispatch = useDispatch()
  const loader = useSelector((state: RootState) => state.loader)

  console.dir(loader)

  // Document가 로딩될 때 수행되는 Loader Effect
  useEffect(() => {
    if (document.readyState !== 'complete') {
      dispatch(loaderActions.start())
    }

    const loaded = () => {
      dispatch(loaderActions.done())
    }
    window.addEventListener('load', loaded)

    return () => {
      window.removeEventListener('load', loaded)
    }
  })

  // Loading 상태일 때 progress를 증가하게 만드는 Effect
  useEffect(() => {
    let update: number

    if (loader.state === LoaderState.Loading) {
      update = setTimeout(() => {
        dispatch(
          loaderActions.updateProgress(
            Math.min(0.8, progressExpo((Date.now() - loader.lastChanged) / 800))
          )
        )
      }, 300)
    }

    return () => {
      if (update) {
        clearTimeout(update)
      }
    }
  }, [loader.state, loader.progress])

  // Loaded, Failed 상태가 300ms 지속되었을 때 Ready 상태로 변환하게 만드는 Effect
  useEffect(() => {
    let update: number

    if (
      loader.state === LoaderState.Loaded ||
      loader.state === LoaderState.Failed
    ) {
      update = setTimeout(() => {
        dispatch(loaderActions.ready())
      }, 300)
    }

    return () => {
      if (update) {
        clearTimeout(update)
      }
    }
  }, [loader.state])

  const hide = loader.state === LoaderState.Ready

  return (
    <div className='cloud-loader'>
      <ProfileCloud
        state={loader.state}
        hide={hide}
        style={{
          ['--progress' as string]: loader.progress
        }}
      ></ProfileCloud>
      <ProgressBar
        hide={hide}
        state={loader.state}
        progress={loader.progress}
      ></ProgressBar>
    </div>
  )
}

export default Loader
