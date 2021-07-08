import { RootState } from '@/store'
import '@/styles/nighticon.scss'

import { RiMoonLine, RiPhoneLockLine, RiSunFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeState } from '@/@types/theme'
import { ReactNode } from 'react'
import {
  setTheme,
  setThemeMatchToSystem,
  UIReducerAction
} from '@/store/ui/actions'

interface NightIconComponentProps {
  theme: ThemeState
  system: boolean
  click: () => void
}

const Moon = <RiMoonLine></RiMoonLine>
const Sun = <RiSunFill></RiSunFill>
const System = <RiPhoneLockLine></RiPhoneLockLine>

export const NightIconComponent = ({
  theme,
  system,
  click
}: NightIconComponentProps) => {
  const themeIcon = (): ReactNode => {
    if (system) {
      return System
    }

    if (theme === ThemeState.Day) {
      return Sun
    } else if (theme === ThemeState.Night) {
      return Moon
    }
  }

  return (
    <div
      className='night-icon'
      role='button'
      tabIndex={0}
      onClick={() => click()}
    >
      <div className='icon'>{themeIcon()}</div>
    </div>
  )
}

export const NightIconContainer = () => {
  const dispatch = useDispatch()

  const theme = useSelector((state: RootState) => state.ui.theme)

  const switchTheme = () => {
    let command: UIReducerAction

    if (theme.matchToSystem) {
      command = setThemeMatchToSystem(false)
    } else {
      if (theme.mode === ThemeState.Day) {
        command = setTheme(ThemeState.Night)
      } else if (theme.mode === ThemeState.Night) {
        command = setThemeMatchToSystem(true)
      } else {
        command = setTheme(ThemeState.Day)
      }
    }

    dispatch(command)
  }

  return (
    <NightIconComponent
      theme={theme.mode}
      system={theme.matchToSystem}
      click={switchTheme}
    ></NightIconComponent>
  )
}
