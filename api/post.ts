import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

import { validatePostID } from '../src/utils/parse'

import fs from 'fs'

let indexFS = ''

export default async (req: VercelRequest, res: VercelResponse) => {
  const { postId } = req.query

  if (!indexFS) {
    indexFS = await (
      await fetch('http://' + req.headers['x-forwarded-host']!.toString() + '/')
    ).text()
  }

  try {
    if (!postId || !validatePostID(postId.toString())) {
      throw new Error('올바르지 않은 URL 입니다.')
    }

    console.time('fetch')
    const data = await fetch(
      process.env.NODE_ENV === 'production'
        ? 'https://blog-api.sochiru.pw'
        : 'http://localhost:8383' + '/post?id=' + postId
    )

    const result = await data.json()

    if (result.error) {
      throw new Error(result.error)
    }

    console.timeEnd('fetch')

    let resultString = indexFS.toString().replace(
      '<!-- SSR: SCRIPT -->',
      `
      <title>${result.title} - Sochiru Blog</title>
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