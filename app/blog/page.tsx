import { BlogPosts } from 'app/components/posts'
import { getBlogPosts } from './utils'
import { permanentRedirect } from 'next/navigation'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  if (getBlogPosts().length === 0) permanentRedirect('/')
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts />
    </section>
  )
}
