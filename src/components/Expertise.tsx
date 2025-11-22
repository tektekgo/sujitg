import { Cloud, Shield, Users, Zap, Brain, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const expertiseAreas = [
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description: "Leading cloud-first transformations with Terraform, Ansible, and visual IaC platforms. Delivered 30% cost reduction and 400-500% speed improvements."
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Pioneering AI-powered solutions and automation strategies. Created AI-Focus.org and custom GPT solutions for enterprise deployment."
  },
  {
    icon: Shield,
    title: "Cybersecurity & Compliance",
    description: "Expert in cybersecurity strategy, risk management, and regulatory alignment for insurance and financial services."
  },
  {
    icon: Zap,
    title: "DevOps & Automation",
    description: "Built enterprise DevOps practices from the ground up. Achieved 50% reduction in deployment time and 99.99% uptime."
  },
  {
    icon: Users,
    title: "Global Team Leadership",
    description: "Scaled high-performing teams across US, Europe, and Asia. C-level collaboration with proven M&A integration experience."
  },
  {
    icon: TrendingUp,
    title: "Digital Transformation",
    description: "30+ years driving technology modernization in regulated industries. Partner to C-suite and Boards on strategic initiatives."
  }
];

export const Expertise = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden" id="expertise">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzMzNjY5OSIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Areas of <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology leadership across cloud, security, AI, and digital transformation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {expertiseAreas.map((area, index) => (
            <Card 
              key={index}
              className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-2 border-border bg-card animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-6 inline-flex p-4 bg-primary-light rounded-xl group-hover:bg-primary transition-colors duration-300">
                  <area.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
