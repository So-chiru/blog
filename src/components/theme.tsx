import { RootState } from '@/store'
import { setThemeSystem } from '@/store/ui/actions'
import { systemThemeUpdateHandler } from '@/utils/theme'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeState } from '@/@types/theme'

const Theme = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.ui.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.mode)

    return () => {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [theme.mode])

  useEffect(() => {
    if (!theme.matchToSystem) {
      return
    }

    const delisten = systemThemeUpdateHandler(night => {
      dispatch(setThemeSystem(night ? ThemeState.Night : ThemeState.Day))
    })

    return () => {
      delisten()
    }
  }, [theme.matchToSystem])

  return <></>
}

export default Theme
