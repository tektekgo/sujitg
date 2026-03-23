import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ResourcesHeader } from "@/components/ResourcesHeader";
import { Footer } from "@/components/Footer";
import { GuideMarkdown } from "@/components/GuideMarkdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { extractToc, getAllGuides, getGuideBySlug } from "@/lib/guides";
import { ArrowLeft, BookMarked, Library, ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

function GuideBackLinks({ className }: { className?: string }) {
  return (
    <nav
      className={cn("flex flex-col gap-2 text-sm", className)}
      aria-label="Guides section navigation"
    >
      <Link
        to="/resources/guides"
        className="inline-flex items-center gap-2 font-medium text-primary hover:underline w-fit"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        All guides
      </Link>
      <Link
        to="/resources"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit"
      >
        <Library className="h-4 w-4 shrink-0" aria-hidden />
        Resources home
      </Link>
    </nav>
  );
}

export default function Guide() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const guide = slug ? getGuideBySlug(slug) : undefined;
  const toc = useMemo(() => (guide ? extractToc(guide.body) : []), [guide]);

  const relatedInSeries = useMemo(() => {
    if (!guide?.series) return [];
    return getAllGuides()
      .filter((g) => g.series === guide.series && g.slug !== guide.slug)
      .sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.title.localeCompare(b.title);
      });
  }, [guide]);

  const relatedBySlugs = useMemo(() => {
    if (!guide?.relatedSlugs?.length) return [];
    const map = new Map(getAllGuides().map((g) => [g.slug, g]));
    return guide.relatedSlugs.map((s) => map.get(s)).filter(Boolean) as ReturnType<
      typeof getAllGuides
    >;
  }, [guide]);

  useEffect(() => {
    if (guide) {
      document.title = `${guide.title} | Guides | Sujit Gangadharan`;
    }
    return () => {
      document.title = "Sujit Gangadharan | Enterprise Technology Executive & Digital Transformation Leader";
    };
  }, [guide]);

  if (!slug || !guide) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-2xl font-bold text-foreground">Guide not found</h1>
        <Button variant="outline" onClick={() => navigate("/resources/guides")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to guides
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ResourcesHeader
        crumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Guides", to: "/resources/guides" },
          { label: guide.title },
        ]}
      />

      <main className="flex-grow container mx-auto px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-12">
          {toc.length > 0 ? (
            <aside className="lg:w-56 shrink-0 order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 border border-border rounded-lg bg-card/40 p-4 space-y-4">
                <GuideBackLinks className="pb-4 border-b border-border" />
                <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                  <ListTree className="h-4 w-4 text-primary" aria-hidden />
                  On this page
                </div>
                <ul className="space-y-2 text-sm list-none m-0 p-0">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={cn(item.depth === 3 && "pl-3 border-l border-border ml-1")}
                    >
                      <a
                        href={`#${item.id}`}
                        className="text-muted-foreground hover:text-primary transition-colors leading-snug block"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            </aside>
          ) : null}

          <article className="flex-grow min-w-0 order-1 lg:order-2 max-w-3xl">
            <GuideBackLinks
              className={cn(
                "mb-6",
                toc.length > 0 ? "lg:hidden" : undefined
              )}
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {guide.seriesLabel ? (
                <Badge variant="secondary">{guide.seriesLabel}</Badge>
              ) : null}
              {guide.role ? (
                <Badge variant="outline" className="capitalize">
                  {guide.role}
                </Badge>
              ) : null}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {guide.title}
            </h1>
            {guide.description ? (
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{guide.description}</p>
            ) : null}
            {guide.updated ? (
              <p className="text-sm text-muted-foreground mb-8">Updated {guide.updated}</p>
            ) : null}

            {guide.relatedBlogId ? (
              <Card className="mb-8 border-primary/25 bg-primary/5">
                <CardContent className="p-4 flex flex-wrap items-center gap-3">
                  <BookMarked className="h-5 w-5 text-primary shrink-0" aria-hidden />
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-foreground">Related article</p>
                    <p className="text-xs text-muted-foreground">
                      Companion blog post on the same topic.
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <Link to={`/blog/${guide.relatedBlogId}`}>Open blog post</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            <div
              className={cn(
                "prose prose-invert max-w-none",
                "prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:text-foreground",
                "prose-p:text-muted-foreground prose-p:leading-relaxed",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                "prose-strong:text-foreground",
                "prose-code:text-foreground prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none",
                "prose-pre:bg-secondary prose-pre:border prose-pre:border-border",
                "prose-blockquote:border-primary prose-blockquote:text-muted-foreground",
                "prose-li:text-muted-foreground",
                "prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground"
              )}
            >
              <GuideMarkdown markdown={guide.body} />
            </div>

            {(relatedInSeries.length > 0 || relatedBySlugs.length > 0) && (
              <div className="mt-12 pt-8 border-t border-border space-y-6">
                {relatedInSeries.length > 0 ? (
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-3">More in this series</h2>
                    <ul className="space-y-2 list-none m-0 p-0">
                      {relatedInSeries.map((g) => (
                        <li key={g.slug}>
                          <Link
                            to={`/resources/guides/${g.slug}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {g.title}
                          </Link>
                          {g.role ? (
                            <span className="text-muted-foreground text-sm ml-2 capitalize">
                              ({g.role})
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {relatedBySlugs.length > 0 ? (
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-3">See also</h2>
                    <ul className="space-y-2 list-none m-0 p-0">
                      {relatedBySlugs.map((g) => (
                        <li key={g.slug}>
                          <Link
                            to={`/resources/guides/${g.slug}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {g.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
