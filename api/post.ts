import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

import { validatePostID } from '../src/utils/parse'

let indexFS = ''

export default async (req: VercelRequest, res: VercelResponse) => {
  const { postId } = req.query

  if (!indexFS) {
    indexFS = await (
      await fetch('http://' + req.headers['x-forwarded-host']!.toString() + '/')
    ).text()
  }

  try {
    if (typeof postId !== 'string') {
      throw new Error(
        'postId 값이 올바르지 않습니다. (값이 여러 개, 혹은 주어지지 않음)'
      )
    }

    if (!postId || !validatePostID(postId)) {
      throw new Error('올바르지 않은 URL 입니다.')
    }

    const data = await fetch(
      (process.env.NODE_ENV === 'production'
        ? 'https://blog-api.sochiru.pw'
        : 'http://localhost:8383') +
        '/post?id=' +
        encodeURIComponent(postId)
    )

    const result = await data.json()

    if (result.error) {
      throw new Error(result.error)
    }

    if (!result.title) {
      throw new Error('서버에서 반환한 게시글이 올바르지 않습니다.')
    }

    let resultString = indexFS.toString().replace(
      '<!-- SSR: SCRIPT -->',
      `
      <title>${result.title} - Sochiru Blog</title>
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${result.title}",
        ${
          result.background
            ? `"image": [
          "${result.background}"
         ],`
            : ''
        }
        "datePublished": "${result.created}",
        "dateModified": "${result.edited}"
      }
      </script>  
      <meta property="og:title" content="${escape(result.title)}"></meta>
      <meta property="og:description" content="${escape(
        result.description
      )}"></meta>
      <meta property="og:type" content="article"></meta>
      ${
        result.background
          ? `<meta property="og:image" content="${escape(
              result.background
            )}"></meta>`
          : ''
      }
      <script>
        window.sochiruBlogPrefetch = {
          error: null,
          data: \`${escape(JSON.stringify(result))}\`
        }
  </script>`
    )

    if (resultString.indexOf('<title>sochiru</title>') > -1) {
      resultString = resultString.replace('<title>sochiru</title>', '')
    }

    res.setHeader('Content-Type', 'text/html')
    res.send(resultString)
  } catch (e) {
    res.setHeader('Content-Type', 'text/html')
    res.send(
      indexFS.toString().replace(
        '<!-- SSR: SCRIPT -->',
        `<script>
          window.sochiruBlogPrefetch = {
            error: "${escape(e.message)}"
          }
    </script>`
      )
    )
  }
}
