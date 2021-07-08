import { RootState } from '@/store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Theme = () => {
  const mode = useSelector((state: RootState) => state.ui.theme.mode)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)

    return () => {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [mode])

  return <></>
}

export default Theme
