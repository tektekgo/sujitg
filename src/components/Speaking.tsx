import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Calendar, MapPin, Award, ExternalLink, Download } from "lucide-react";
import speakingHero from "@/assets/speaking-hero.jpg";
import gsdcCertificate from "@/assets/gsdc-certificate.png";
import gsdcBadge from "@/assets/gsdc-advisor-badge.png";

const engagements = [
  {
    event: "GSDC Global AI Tools Challenge 2025",
    title: "Keynote Speaker & Knowledge Advisor",
    topic: "Data & Analytics - Turning Spreadsheets into Dashboards with AI in Seconds",
    date: "October 2025",
    location: "Global Virtual Event",
    featured: true,
    certificate: gsdcCertificate,
    badge: gsdcBadge
  },
  {
    event: "Autocon 4 - Leadership Track",
    title: "Case Study Presentation",
    topic: "From Vision to Reality: Building an Enterprise Automation Platform in Banking",
    date: "November 2025",
    location: "Network Automation Forum",
    featured: true,
    achievements: ["66% efficiency improvement", "3,500 hours saved"],
    links: [
      { 
        label: "PacketPushers Review", 
        url: "https://www.linkedin.com/posts/andrewconrymurray_autocon4-activity-7397408153874845696-d2xr"
      },
      {
        label: "Download Presentation",
        url: "/presentations/VisionToReality_Sujit_Final2.pptx"
      }
    ]
  },
  {
    event: "DevOps Summit",
    title: "Panel Discussion",
    topic: "Scaling DevOps Across Global Teams",
    date: "2023",
    location: "Jacksonville, FL"
  },
  {
    event: "Cloud Strategy Forum",
    title: "Technical Workshop",
    topic: "Infrastructure as Code: From Concept to 400% Efficiency Gains",
    date: "2023",
    location: "Virtual"
  }
];

export const Speaking = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="speaking">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-background"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik00MCAxMGwxMCAyMC0xMCAyMC0xMC0yMHoiIHN0cm9rZT0iIzMzNjY5OSIgc3Ryb2tlLW9wYWNpdHk9Ii4wMyIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Speaking <span className="text-gradient">Engagements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sharing insights on automation, cloud transformation, and enterprise technology leadership
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-primary animate-scale-in">
            <img 
              src={speakingHero} 
              alt="Speaking at technology conference" 
              className="w-full h-64 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <Badge className="mb-3 bg-primary text-primary-foreground">Featured</Badge>
              <h3 className="text-3xl font-bold text-foreground mb-2">Autocon 4 Keynote Speaker</h3>
              <p className="text-lg text-foreground/80">AI-Powered Automation in Enterprise Infrastructure</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {engagements.map((engagement, index) => (
            <Card 
              key={index}
              className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border animate-slide-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-6">
                {engagement.featured && (
                  <Badge className="mb-3 bg-primary text-primary-foreground">
                    <Mic className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                
                <h3 className="text-xl font-bold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                  {engagement.event}
                </h3>
                
                <p className="text-sm font-semibold text-primary mb-2">
                  {engagement.title}
                </p>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {engagement.topic}
                </p>
                
                {engagement.achievements && (
                  <div className="mb-4 space-y-1">
                    {engagement.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {engagement.certificate && engagement.badge && (
                  <div className="flex gap-3 mb-4">
                    <div className="group/cert relative cursor-pointer">
                      <img 
                        src={engagement.certificate} 
                        alt="Speaker Certificate"
                        className="h-16 w-16 object-cover rounded-lg shadow-sm border border-border hover:shadow-glow transition-all"
                      />
                      <Award className="absolute -top-1 -right-1 h-5 w-5 text-primary" />
                    </div>
                    <div className="group/badge relative cursor-pointer">
                      <img 
                        src={engagement.badge} 
                        alt="Knowledge Advisor Badge"
                        className="h-16 w-16 object-contain rounded-lg hover:scale-110 transition-transform"
                      />
                    </div>
                  </div>
                )}
                
                {engagement.links && (
                  <div className="mb-4 space-y-2">
                    {engagement.links.map((link, i) => (
                      <a 
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        {link.label.includes("Download") ? (
                          <Download className="h-4 w-4" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {engagement.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {engagement.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
