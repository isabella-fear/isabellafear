import { experience, profile } from './content/profile'
import { InkStudy } from './components/ink-study'

export default function Page() {
  return (
    <>
      <section className="introduction" aria-labelledby="greeting">
        <h1 id="greeting">Hello, I’m Isabella.</h1>
        <div className="intro-copy">
          <p>
            I’m an aspiring lawyer interested in law, constitutionalism, and
            how knowledge is interpreted and built upon over time.
          </p>
          <p>
            My path has taken me through legal work, research, and finance,
            with track and field, student leadership, and community projects
            along the way.
          </p>
        </div>
        <nav className="intro-links" aria-label="Contact and explore">
          <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={'mailto:' + profile.email}>Email</a>
          <a href="#about">About Me</a>
          <a href="#experience">Experience</a>
        </nav>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <h2 id="about-title">About Me</h2>
        <div className="about-copy">
          <p>
            I’m interested in how we make sense of ideas and how we interpret knowledge.
            Law and constitutionalism are where I hope to explore those questions as a lawyer.
          </p>
          <p>
            I studied at the University of Toronto in Political Science and Economics
            and have lived and travelled all over the world since I was born.
            I was previously a legal assistant at Francisco Fernandez
            Law Group, following research at Freedom House and an internship
            with the Civil Justice Clinic at the University of Houston Law Center.
          </p>
        </div>
      </section>

      <div className="background-columns">
        <section id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <ul className="experience-list">
            {experience.map((entry) => (
              <li key={entry.organization}>
                <details className="experience-entry">
                  <summary>
                    <span className="experience-label">
                      <span className="experience-role">{entry.role}</span>
                      <span className="experience-organization">{entry.organization}</span>
                    </span>
                    <span className="experience-year">{entry.year}</span>
                  </summary>
                  <div className="experience-details">
                    <p className="experience-meta">{entry.dates} · {entry.location}</p>
                    {entry.description ? <p>{entry.description}</p> : null}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <aside className="personal-notes" aria-label="Education">
          <section aria-labelledby="education-title">
            <h2 id="education-title">Education</h2>
            <p>University of Toronto</p>
            <p>Political Science and Economics</p>
            <p className="note-date">September 2021–April 2026</p>
            <p className="earlier-school">Copenhagen International School</p>
            <p className="note-date">August 2015–June 2020</p>
          </section>
        </aside>
      </div>
      <InkStudy />
    </>
  )
}
