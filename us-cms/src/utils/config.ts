
function getImgUrl(path: string): string {
  const needUrl = new URL(path, import.meta.url).href
  return needUrl
}

export {
  getImgUrl
}