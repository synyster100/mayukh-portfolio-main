import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Layers3, MapPin } from "lucide-react";

import { PROJECT_CATEGORIES, PROJECTS } from "@/data/projects";
import { PROJECT_IMAGE_URLS } from "@/assets/project-images";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Project Showcase | Md Ali Ahnaf Abid Mayukh" },
      {
        name: "description",
        content:
          "Detailed showcase of remote sensing and AutoCAD-related projects by Md Ali Ahnaf Abid Mayukh.",
      },
    ],
  }),
  component: ProjectsShowcasePage,
});

function slugifyCategory(category: string) {
  return category.toLowerCase().replaceAll(/\s+/g, "-");
}

function ProjectsShowcasePage() {
  const routerState = useRouterState();
  const hasChildRoute = routerState.matches.some((match) => 
    match.routeId.includes("$slug")
  );

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest(".glow-card") as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  // If we have a child route (i.e., we're viewing a project detail), only render the Outlet
  if (hasChildRoute) {
    return <Outlet />;
  }

  // Otherwise, render the full projects showcase
  const groupedProjects = PROJECT_CATEGORIES.map((category) => ({
    category,
    id: slugifyCategory(category),
    projects: PROJECTS.filter((project) => project.category === category),
  }));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border bg-contours">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-18">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-accent">
                Project Showcase
              </div>
              <h1 className="mt-4 font-display text-5xl md:text-7xl leading-none tracking-tight text-balance">
                Detailed project showcase for research and applied engineering work.
              </h1>
              <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground text-pretty">
                This page brings together the full project collection in two focused tracks:
                Remote Sensing and AutoCAD. Each project includes a stronger narrative,
                workflow context, tools used, and the practical value of the work.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card/70 backdrop-blur-sm p-6 shadow-sm">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Showcase Summary
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Metric value={PROJECTS.length} label="Projects" />
                <Metric value={PROJECT_CATEGORIES.length} label="Categories" />
              </div>
              <p className="mt-6 text-sm leading-6 text-muted-foreground">
                Browse by category below or scroll through the complete editorial-style
                breakdown of every featured project.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Jump to
          </span>
          {groupedProjects.map(({ category, id, projects }) => (
            <a
              key={category}
              href={`#${id}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              {category}
              <span className="text-xs text-accent">({projects.length})</span>
            </a>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-16">
          {groupedProjects.map(({ category, id, projects }) => (
            <section key={category} id={id} className="scroll-mt-24">
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-accent">
                    {category}
                  </div>
                  <h2 className="mt-3 font-display text-4xl md:text-6xl leading-none tracking-tight">
                    {category} projects
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm md:text-base text-muted-foreground">
                    {category === "Remote Sensing"
                      ? "Projects focused on geospatial observation, environmental monitoring, terrain analysis, and data-driven interpretation."
                      : "Projects grouped under the applied engineering and design showcase for planning, mapping, and urban systems analysis."}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {projects.length} project{projects.length === 1 ? "" : "s"}
                </div>
              </div>

              <div className="mt-8 grid gap-6">
                {projects.map((project) => (
                  <Link
                    key={project.title}
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="group glow-card rounded-3xl border border-border bg-card p-7 md:p-8 shadow-sm hover:border-accent/60 transition-all overflow-hidden block"
                  >
                    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                      {PROJECT_IMAGE_URLS[project.slug] && (
                        <div className="lg:col-span-2 -mx-7 -mt-7 md:-mx-8 md:-mt-8 mb-2 overflow-hidden rounded-t-3xl bg-card">
                          <img
                            src={PROJECT_IMAGE_URLS[project.slug]}
                            alt={project.title}
                            className="w-full max-h-[480px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-start justify-between gap-4">
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
                          <div className="rounded-full border border-border p-2 text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors shrink-0">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        <h3 className="mt-5 font-display text-3xl md:text-4xl leading-tight">
                          {project.title}
                        </h3>
                        <p className="mt-4 text-base text-muted-foreground">{project.desc}</p>
                        <p className="mt-5 text-sm md:text-base leading-7 text-foreground/85">
                          {project.overview}
                        </p>

                        <div className="mt-6">
                          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                            Key highlights
                          </div>
                          <ul className="mt-4 space-y-3 text-sm md:text-base text-foreground/85">
                            {project.highlights.map((highlight) => (
                              <li key={highlight} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-2xl border border-border bg-secondary/50 p-5">
                          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                            <Layers3 className="w-3.5 h-3.5 text-accent" />
                            Tools used
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tech.map((tool) => (
                              <span
                                key={tool}
                                className="rounded-full bg-background px-3 py-1.5 text-xs font-mono text-foreground/75 border border-border"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-secondary/50 p-5">
                          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                            Project value
                          </div>
                          <p className="mt-4 text-sm leading-7 text-foreground/85">
                            {project.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="font-display text-3xl leading-none">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
