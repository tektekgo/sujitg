import { Link } from "react-router-dom";
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

export default function GuidesIndex() {
  const guides = sortGuides();

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
        <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          How-tos, walkthroughs, and reference notes in a readable, documentation-style layout. Each
          entry has its own URL for bookmarking or sharing.
        </p>

        <GuideCards guides={guides} />

        <p className="mt-10 text-sm text-muted-foreground">
          <Link to="/resources" className="text-primary hover:underline font-medium">
            ← Resources home
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
