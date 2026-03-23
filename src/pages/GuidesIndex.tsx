import { Link } from "react-router-dom";
import { ResourcesHeader } from "@/components/ResourcesHeader";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllGuides } from "@/lib/guides";

export default function GuidesIndex() {
  const guides = [...getAllGuides()].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ResourcesHeader
        crumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Guides" },
        ]}
      />
      <main className="flex-grow container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Guides</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Documentation-style pages built from Markdown in the repo. Each guide has its own URL you
          can share.
        </p>

        {guides.length === 0 ? (
          <p className="text-muted-foreground border border-dashed border-border rounded-lg p-8 text-center">
            No guides yet. Add <code className="text-sm text-foreground">.md</code> files under{" "}
            <code className="text-sm text-foreground">src/content/guides</code>.
          </p>
        ) : (
          <ul className="space-y-4 list-none p-0 m-0">
            {guides.map((g) => (
              <li key={g.slug}>
                <Card className="border-border hover:border-primary/35 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {g.seriesLabel ? (
                        <Badge variant="secondary" className="text-xs font-normal">
                          {g.seriesLabel}
                        </Badge>
                      ) : null}
                      {g.role ? (
                        <Badge variant="outline" className="text-xs font-normal capitalize">
                          {g.role}
                        </Badge>
                      ) : null}
                    </div>
                    <CardTitle className="text-xl">
                      <Link
                        to={`/resources/guides/${g.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {g.title}
                      </Link>
                    </CardTitle>
                    {g.description ? (
                      <CardDescription className="text-base leading-relaxed">
                        {g.description}
                      </CardDescription>
                    ) : null}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link
                      to={`/resources/guides/${g.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Open guide →
                    </Link>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
