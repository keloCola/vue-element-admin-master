import defaultSettings from '@/settings'

const title = defaultSettings.title || '小慕书屋'
// 获取标题 如果没有就用小慕书屋
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
