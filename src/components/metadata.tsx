interface SiteMetadataProps {
  title: string
  type?: string
  image?: string
  description?: string
}

const createTagIfNotExists = <T extends HTMLElement>(
  query: string,
  createCb?: (tag: T) => void
): T => {
  const head = document.head

  let tag = head.querySelector(query)

  if (!tag) {
    tag = document.createElement(
      query.indexOf('[') > -1 ? query.split('[')[0] : query
    )

    if (createCb) createCb(tag as T)

    head.appendChild(tag)
  }

  return tag as T
}

const SiteMetadata = ({
  title,
  description,
  type,
  image
}: SiteMetadataProps) => {
  const titleTag = createTagIfNotExists<HTMLTitleElement>('title')
  titleTag.innerHTML = title

  document.title = title

  const titleOGTag = createTagIfNotExists<HTMLMetaElement>(
    'meta[property="og:title"]',
    tag => {
      tag.setAttribute('property', 'og:title')
    }
  )

  titleOGTag.setAttribute('content', title)

  if (description) {
    const descTag = createTagIfNotExists<HTMLMetaElement>(
      'meta[property="og:description"]',
      tag => {
        tag.setAttribute('property', 'og:description')
      }
    )

    descTag.setAttribute('content', description)
  }

  if (type) {
    const typeTag = createTagIfNotExists<HTMLMetaElement>(
      'meta[property="og:type"]',
      tag => {
        tag.setAttribute('property', 'og:type')
      }
    )

    typeTag.setAttribute('content', type)
  }

  if (image) {
    const imageTag = createTagIfNotExists<HTMLMetaElement>(
      'meta[property="og:image"]',
      tag => {
        tag.setAttribute('property', 'og:image')
      }
    )

    imageTag.setAttribute('content', image)
  }

  return <></>
}

export default SiteMetadata
