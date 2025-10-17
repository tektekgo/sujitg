import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Download, ExternalLink } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Ready to discuss technology leadership, digital transformation, or speaking opportunities?
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-2 border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm animate-slide-in">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 bg-primary-foreground rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Linkedin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-2">
                LinkedIn
              </h3>
              <p className="text-primary-foreground/70 mb-4">
                Connect with me professionally
              </p>
              <Button 
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <a href="https://www.linkedin.com/in/sujitg/" target="_blank" rel="noopener noreferrer">
                  Visit Profile
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-2 border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 bg-primary-foreground rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-2">
                Email
              </h3>
              <p className="text-primary-foreground/70 mb-4">
                Send me a message directly
              </p>
              <Button 
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <a href="mailto:gsujit@gmail.com">
                  gsujit@gmail.com
                  <Mail className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Card className="inline-block border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-primary-foreground mb-4 text-lg">
                Want to learn more about my experience and qualifications?
              </p>
              <Button 
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
                asChild
              >
                <a href="/resume/SujitGangadharan.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Full Resume
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
