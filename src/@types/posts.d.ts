type Color =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'

declare interface BlogPost {
  id: string
  title: string
  description?: string
  created: string
  edited: string
  tags?: {
    name: string
    id: string
    color: Color
  }[]
  background?: string
}

declare interface PostListData {
  page: number
  hasMore: boolean
  posts: BlogPost[]
}
