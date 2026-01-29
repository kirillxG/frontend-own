import "../css/landing.css";

export default function LandingPage() {
  return (
    <main className="landing">
      <div className="landingContainer">
        <section className="hero">
          <div className="heroCopy">
            <p className="pill">Secure • Moderated • Self-hosted</p>

            <h1>A secure, moderated platform you can fully self-host.</h1>

            <p className="sub">
              Built for communities that want strong authentication, real
              moderation workflows, and complete infrastructure ownership. No
              client-side “trust me” logic.
            </p>

            <div className="heroCtas">
              <a className="btn btnPrimary" href="/register">
                Get started
              </a>
              <a className="btn btnSecondary" href="#stack">
                View stack
              </a>
            </div>

            <div className="meta">
              <div className="metaItem">
                <span className="metaK">Server-side auth</span>
                <span className="metaV">httpOnly secure cookies</span>
              </div>
              <div className="metaItem">
                <span className="metaK">Moderation</span>
                <span className="metaV">reports + review tools</span>
              </div>
              <div className="metaItem">
                <span className="metaK">Self-hosting</span>
                <span className="metaV">your infra, your rules</span>
              </div>
            </div>
          </div>

          <div className="heroCard" aria-hidden="true">
            <div className="cardTop">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
              <div className="cardTitle">Tech stack</div>
            </div>

            <div className="cardBody">
              <div className="rows">
                <div className="row">
                  <span className="rowKey">Hosting</span>
                  <span className="rowVal">Hetzner</span>
                </div>
                <div className="row">
                  <span className="rowKey">Database</span>
                  <span className="rowVal">PostgreSQL</span>
                </div>
                <div className="row">
                  <span className="rowKey">Auth</span>
                  <span className="rowVal">bcrypt + secure cookies</span>
                </div>
                <div className="row">
                  <span className="rowKey">Reverse proxy</span>
                  <span className="rowVal">Nginx</span>
                </div>
                <div className="row">
                  <span className="rowKey">Containers</span>
                  <span className="rowVal">Docker</span>
                </div>
                <div className="row">
                  <span className="rowKey">Frontend</span>
                  <span className="rowVal">React</span>
                </div>
                <div className="row">
                  <span className="rowKey">Runtime</span>
                  <span className="rowVal">Docker + Node.js</span>
                </div>
              </div>

              <div className="divider" />

              <a className="btn btnPrimary btnBlock" href="/register">
                Create account
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="security">
          <h2>Security-first, not security-flavored.</h2>
          <p className="sectionSub">
            The server is the authority. The browser gets a UI, not a permission
            system.
          </p>

          <div className="grid3">
            <div className="feature">
              <h3>Hardened sessions</h3>
              <p>
                Authentication handled server-side via httpOnly + Secure
                cookies.
              </p>
            </div>
            <div className="feature">
              <h3>Password hashing</h3>
              <p>bcrypt-based credential storage and verification.</p>
            </div>
            <div className="feature">
              <h3>Defense-in-depth</h3>
              <p>
                Nginx at the edge, strict validation, and least-privilege access
                patterns.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="moderation">
          <h2>Moderation that’s actually usable.</h2>
          <p className="sectionSub">
            Clear workflows for reviewing reports, enforcing rules, and reducing
            abuse.
          </p>

          <div className="grid3">
            <div className="feature">
              <h3>Reports & review</h3>
              <p>Flag content, triage quickly, and track outcomes.</p>
            </div>
            <div className="feature">
              <h3>Role-based tools</h3>
              <p>
                Granular permissions per object/action with dynamic adjustments.
              </p>
            </div>
            <div className="feature">
              <h3>Abuse mitigation</h3>
              <p>Rate limits, locks, and audit-friendly decisions.</p>
            </div>
          </div>
        </section>

        <section className="section" id="stack">
          <h2>Complete self-hosting on your terms.</h2>
          <p className="sectionSub">
            React frontend with Dockerized Node services behind Nginx and
            PostgreSQL on Hetzner. No vendor lock-in, no hosted dependency
            chain.
          </p>

          <div className="grid3">
            <div className="feature">
              <h3>Predictable deploy</h3>
              <p>Simple flow: Nginx → Node → PostgreSQL.</p>
            </div>
            <div className="feature">
              <h3>Operational clarity</h3>
              <p>Backups, logs, upgrades—owned and controlled by you.</p>
            </div>
            <div className="feature">
              <h3>Portable</h3>
              <p>Hetzner is the target, not the prison. Move when you want.</p>
            </div>
          </div>
        </section>

        <section className="ctaSection">
          <div className="ctaCard">
            <div>
              <h2>Start with sane defaults.</h2>
              <p className="sectionSub">
                Create an account, set roles, and run a moderated platform
                without outsourcing trust.
              </p>
            </div>
            <div className="ctaButtons">
              <a className="btn btnPrimary" href="/register">
                Create account
              </a>
              <a className="btn btnSecondary" href="/login">
                Sign in
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
