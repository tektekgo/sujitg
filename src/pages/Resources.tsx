import { Link } from "react-router-dom";
import { Library } from "lucide-react";
import { ResourcesHeader } from "@/components/ResourcesHeader";
import { Footer } from "@/components/Footer";
import { GuideCards } from "@/components/GuideCards";
import { getAllGuides } from "@/lib/guides";

function sortGuides() {
  return [...getAllGuides()].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

export default function Resources() {
  const guides = sortGuides();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ResourcesHeader crumbs={[{ label: "Resources" }]} />
      <main className="flex-grow container mx-auto px-6 py-12 max-w-3xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Library className="h-10 w-10 text-primary" aria-hidden />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Resources</h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Hands-on references published here on the site—separate from the blog. These guides focus
            on detailed how-tos, practical tips, and structured information you can work through step by
            step, with stable URLs so readers can return to a section or share a link to the full write-up.
          </p>
        </div>

        <section className="space-y-4" aria-labelledby="guides-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="guides-heading" className="text-2xl font-semibold text-foreground">
              Guides
            </h2>
            {guides.length > 0 ? (
              <Link
                to="/resources/guides"
                className="text-sm font-medium text-primary hover:underline shrink-0"
              >
                Guides index →
              </Link>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground -mt-1">
            Each guide below opens a documentation-style page. Related pieces in the same series (for
            example a main walkthrough and an addendum) appear as separate cards when they are published
            as separate pages.
          </p>
          <GuideCards guides={guides} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
