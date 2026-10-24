import { experience, leadership, profile } from './content/profile'
import { InkStudy } from './components/ink-study'

export default function Page() {
  return (
    <>
      <section className="introduction" aria-labelledby="greeting">
        <h1 id="greeting">Hello, I’m <em>Isabella.</em></h1>
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

        <aside className="personal-notes" aria-label="Education and life beyond work">
          <section aria-labelledby="beyond-title">
            <h2 id="beyond-title">Beyond work</h2>
            <p>
              Track and field was part of my university life with the Varsity
              Blues. I’ve also been involved in student-led consulting,
              fundraising, and supporting women’s representation in sport.
            </p>
            <details className="quiet-details">
              <summary>Community &amp; leadership</summary>
              <div className="community-details">
                <h3>SheIS Sports Network</h3>
                <p className="note-date">Volunteer · December 2022–September 2023</p>
                <p>Researched sports laws and athlete information while supporting the representation of female athletes.</p>
                <h3>Team Peru</h3>
                <p className="note-date">Fundraising Coordinator · August 2018–December 2019</p>
                <p>Organized fundraising events supporting Kiya Survivors: Mama Cocha.</p>
                <h3>Model United Nations</h3>
                <p className="note-date">Deputy Secretary General · February–October 2019</p>
                <p>Helped host Copenhagen International School’s three-day “Borders” conference, chaired the General Assembly, and directed the staff team.</p>
                <h3>Student leadership</h3>
                <ul className="leadership-list">
                  {leadership.map(([role, organization]) => (
                    <li key={organization}><span>{role}</span><span>{organization}</span></li>
                  ))}
                </ul>
              </div>
            </details>
          </section>

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
