import { Link } from "react-router-dom";
import { BookOpen, Library } from "lucide-react";
import { ResourcesHeader } from "@/components/ResourcesHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Resources() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ResourcesHeader
        crumbs={[{ label: "Resources" }]}
      />
      <main className="flex-grow container mx-auto px-6 py-12 max-w-3xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Library className="h-10 w-10 text-primary" aria-hidden />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Resources</h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Long-form guides and reference material—separate from the blog—so you can share direct
            links to structured, documentation-style content.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1">
          <Card className="border-border hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="h-5 w-5 text-primary" />
                Guides
              </CardTitle>
              <CardDescription>
                Step-by-step and lecture-style writeups published as Markdown on this site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                to="/resources/guides"
                className="inline-flex text-sm font-medium text-primary hover:underline"
              >
                Browse guides →
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
