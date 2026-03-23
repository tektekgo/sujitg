import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { GuideMeta } from "@/lib/guides";

export function GuideCards({ guides }: { guides: GuideMeta[] }) {
  if (guides.length === 0) {
    return (
      <p className="text-muted-foreground border border-dashed border-border rounded-lg p-8 text-center">
        No guides are published yet. Add <code className="text-sm text-foreground">.md</code> files
        under <code className="text-sm text-foreground">src/content/guides</code> (with a{" "}
        <code className="text-sm text-foreground">title</code> in the YAML frontmatter, or a top-level{" "}
        <code className="text-sm text-foreground"># Heading</code>).
      </p>
    );
  }

  return (
    <ul className="grid gap-4 list-none p-0 m-0 sm:grid-cols-1">
      {guides.map((g) => (
        <li key={g.slug}>
          <Card className="border-border hover:border-primary/35 transition-colors h-full">
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
                  className="hover:text-primary transition-colors inline-flex items-start gap-2"
                >
                  <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                  <span>{g.title}</span>
                </Link>
              </CardTitle>
              {g.description ? (
                <CardDescription className="text-base leading-relaxed">{g.description}</CardDescription>
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
  );
}
