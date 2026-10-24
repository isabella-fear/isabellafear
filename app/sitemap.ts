import { getBlogPosts } from 'app/blog/utils'
import { profile } from './content/profile'

export const dynamic = 'force-static'

export const baseUrl = profile.url

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = (blogs.length ? ['', '/blog'] : ['']).map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
