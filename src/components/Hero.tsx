import { Button } from "@/components/ui/button";
import { Mail, FolderKanban } from "lucide-react";
import headshot from "@/assets/headshot.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
          <div className="flex-shrink-0 animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-8 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "3s" }}></div>
              <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl"></div>
              <img
                src={headshot}
                alt="Sujit Gangadharan"
                className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-primary shadow-glow"
              />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left space-y-5 lg:space-y-6 animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              Sujit Gangadharan
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary-foreground/95 leading-tight max-w-3xl mx-auto lg:mx-0">
              CIO-Level Leadership for Enterprise Transformation
            </h2>
            <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-3xl leading-relaxed mx-auto lg:mx-0">
              I help organizations turn emerging technologies into structured, scalable enterprise
              capabilities—so transformation delivers real business value, not chaos.
            </p>
            <p className="text-xl lg:text-2xl font-medium text-primary-foreground/95 max-w-3xl leading-snug mx-auto lg:mx-0">
              Turning AI, automation, and DevOps into governed, scalable execution—without compromising
              stability or control.
            </p>
            <p className="text-base lg:text-lg text-primary-foreground/80 max-w-3xl leading-relaxed mx-auto lg:mx-0">
              <span className="block font-medium text-primary-foreground/90">
                30+ years leading enterprise technology in regulated industries.
              </span>
              <span className="block mt-2">
                Delivered 30% cost reduction, 50% faster deployments, and 99.99% uptime at scale.
              </span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-dark shadow-lg hover:shadow-primary transition-all duration-300"
                asChild
              >
                <a href="#contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Let&apos;s Talk
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary"
                asChild
              >
                <a href="#projects">
                  <FolderKanban className="mr-2 h-5 w-5" />
                  Explore My Work
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
