import { RootState } from '@/store'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ThemeState } from '@/@types/theme'

interface CommentComponentProps {
  theme?: string
}

export const CommentComponent = ({ theme }: CommentComponentProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref || !ref.current) {
      return
    }

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.crossOrigin = 'anonymous'
    script.async = true

    script.dataset.repo = 'So-chiru/blog-comments'
    script.dataset.repoId = 'MDEwOlJlcG9zaXRvcnkzODA1MTM1OTg='
    script.dataset.category = '블로그 댓글'
    script.dataset.categoryId = 'DIC_kwDOFq4tPs4CAGkl'
    script.dataset.mapping = 'pathname'
    script.dataset.reactionsEnabled = '1'
    script.dataset.emitMetadata = '1'
    script.dataset.theme = theme || 'github-light'

    ref.current.appendChild(script)

    return () => {
      const app = document.querySelector('.giscus')

      if (app) {
        app.parentElement!.removeChild(app)
      }
    }
  }, [ref, theme])

  return <div className='post-comments' ref={ref}></div>
}

export const CommentContainer = () => {
  const theme = useSelector((state: RootState) => state.ui.theme.mode)

  let themeString = 'github-light'

  if (theme === ThemeState.Night) {
    themeString = 'github-dark'
  }

  return <CommentComponent theme={themeString}></CommentComponent>
}

export default CommentContainer
