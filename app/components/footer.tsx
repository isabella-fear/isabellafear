import { profile } from '../content/profile'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <a href="#content">Back to top</a>
    </footer>
  )
}
