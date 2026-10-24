import Link from 'next/link'
import { profile } from '../content/profile'

export function Navbar() {
  return (
    <header className="site-header">
      <Link className="site-name" href="/">{profile.name}</Link>
    </header>
  )
}
