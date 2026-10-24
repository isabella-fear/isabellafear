import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>This page isn’t here.</h1>
      <p>You can find my introduction and experience on the homepage.</p>
      <Link href="/">Back to the homepage</Link>
    </section>
  )
}
