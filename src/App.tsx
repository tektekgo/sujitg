import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const Article = lazy(() => import("./pages/Article"));
const Resources = lazy(() => import("./pages/Resources"));
const GuidesIndex = lazy(() => import("./pages/GuidesIndex"));
const Guide = lazy(() => import("./pages/Guide"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
      Loading…
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog/:slug" element={<Article />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/guides" element={<GuidesIndex />} />
            <Route path="/resources/guides/:slug" element={<Guide />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
    </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
