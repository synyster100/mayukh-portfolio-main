import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Layers3, MapPin } from "lucide-react";

import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { PROJECT_IMAGE_URLS } from "@/assets/project-images";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = getProjectBySlug(params.slug);

    return {
      meta: [
        { title: project ? `${project.title} | Project Showcase` : "Project | Showcase" },
        {
          name: "description",
          content: project
            ? project.desc
            : "Detailed project showcase from the portfolio of Md Ali Ahnaf Abid Mayukh.",
        },
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-28">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to showcase
          </Link>
          <div className="mt-10 rounded-3xl border border-border bg-card p-8">
            <h1 className="font-display text-4xl">Project not found</h1>
            <p className="mt-4 text-muted-foreground">
              The project you are looking for is not available in the current showcase.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const relatedProjects = PROJECTS.filter(
    (item) => item.category === project.category && item.slug !== project.slug,
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border bg-contours">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-18">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to portfolio
            </Link>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
                {project.year && (
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2.5 py-1 rounded-full">
                    {project.year}
                  </span>
                )}
                {project.location && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground border border-border px-2.5 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    {project.location.label}
                  </span>
                )}
              </div>

              <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight text-balance">
                {project.title}
              </h1>
              <p className="mt-6 max-w-4xl text-base md:text-lg text-muted-foreground text-pretty">
                {project.desc}
              </p>
            </div>

            <aside className="rounded-3xl border border-border bg-card/70 backdrop-blur-sm p-6 shadow-sm">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Project Snapshot
              </div>
              <div className="mt-6 space-y-5">
                <DetailBlock label="Category" value={project.category} />
                {project.year && <DetailBlock label="Timeline" value={project.year} />}
                {project.location && <DetailBlock label="Location" value={project.location.label} />}
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Tools
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-mono text-foreground/75"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {PROJECT_IMAGE_URLS[project.slug] && (
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-10">
          <div className="overflow-hidden rounded-3xl border border-border shadow-lg bg-card flex items-center justify-center">
            <img
              src={PROJECT_IMAGE_URLS[project.slug]}
              alt={project.title}
              className="w-full max-h-[600px] object-contain"
            />
          </div>
        </div>
      )}

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-8">
            <DetailSection title="Project Overview">
              <p className="text-sm md:text-base leading-7 text-foreground/85">{project.overview}</p>
            </DetailSection>

            <DetailSection title="Key Highlights">
              <ul className="space-y-4 text-sm md:text-base text-foreground/85">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection title="Workflow">
              <ul className="space-y-4 text-sm md:text-base text-foreground/85">
                {project.workflow.map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          </div>

          <div className="space-y-8">
            <DetailSection title="Deliverables">
              <div className="grid gap-3">
                {project.deliverables.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground/85"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </DetailSection>

            <DetailSection title="Project Value">
              <p className="text-sm md:text-base leading-7 text-foreground/85">{project.impact}</p>
            </DetailSection>

            {relatedProjects.length > 0 && (
              <DetailSection title="Related Projects">
                <div className="space-y-3">
                  {relatedProjects.map((item) => (
                    <Link
                      key={item.slug}
                      to="/projects/$slug"
                      params={{ slug: item.slug }}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 text-sm text-foreground hover:border-accent/40 transition-colors"
                    >
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </DetailSection>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 md:p-7">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <Layers3 className="w-3.5 h-3.5 text-accent" />
        {title}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm text-foreground/85">{value}</div>
    </div>
  );
}
