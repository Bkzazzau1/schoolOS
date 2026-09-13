export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <span className="badge">SchoolOS AI · Web + PWA</span>
        <h1>One intelligent platform for every school.</h1>
        <p>
          SchoolOS is being built as a true multi-tenant SaaS for private schools,
          with role-aware workspaces for management, teachers, parents, students,
          finance teams and school operations.
        </p>
        <div className="cards">
          <article>
            <strong>Multi-tenant</strong>
            <span>Every school receives an isolated private workspace.</span>
          </article>
          <article>
            <strong>Role-aware</strong>
            <span>One app, different experiences based on permissions.</span>
          </article>
          <article>
            <strong>AI-native</strong>
            <span>Academic, teacher, finance and management intelligence.</span>
          </article>
        </div>
      </section>
    </main>
  );
}
