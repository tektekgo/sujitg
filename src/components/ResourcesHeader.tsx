import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import sgLogo from "@/assets/sg-logo.png";

export interface Crumb {
  label: string;
  to?: string;
}

export function ResourcesHeader({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
        <Link to="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
          <img src={sgLogo} alt="Sujit G — home" className="h-10 w-10" />
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground min-w-0">
          {crumbs.map((c, i) => (
            <span key={`${c.label}-${i}`} className="flex items-center gap-1">
              {i > 0 && <span className="text-border px-0.5">/</span>}
              {c.to ? (
                <Link to={c.to} className="hover:text-primary transition-colors font-medium">
                  {c.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium truncate">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="flex-1" />
        <Button variant="ghost" size="sm" asChild className="shrink-0">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
    </header>
  );
}
