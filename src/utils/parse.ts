export const listsResponseParse = (data: PostListData) => {
  return data
}

export const validatePostID = (url: string) => {
  if (url.length < 32) {
    return false
  }

  return true
}
