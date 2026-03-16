import { Cloud, Shield, Users, Zap, Brain, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const expertiseAreas = [
  {
    icon: Users,
    title: "Global Team Leadership",
    description: "Scale and structure technology teams across regions. I advise on org design, C-level alignment, and M&A tech integration.",
    outcome: "Typical outcome: Clear roles, accountability, and a team that can execute at scale.",
  },
  {
    icon: Zap,
    title: "DevOps & Automation",
    description: "Establish or mature your DevOps platform and CI/CD so releases are predictable and safe—from first pipeline to full platform.",
    outcome: "Typical outcome: 50% faster deployments and 99.99% uptime where it matters.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Define AI strategy, governance, and safe rollout—from custom GPTs to enterprise automation—so AI drives value without unnecessary risk.",
    outcome: "Typical outcome: Clear AI roadmap, use-case prioritization, and deployment guardrails.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description: "Design and lead your cloud migration roadmap with Terraform, Ansible, or visual IaC—so you move fast without betting the business.",
    outcome: "Typical outcome: 30% infra cost reduction and 4–5x delivery speed within 12–18 months.",
  },
  {
    icon: TrendingUp,
    title: "Digital Transformation",
    description: "Partner with C-suite and Boards on technology modernization in regulated industries—strategy, roadmap, and execution oversight.",
    outcome: "Typical outcome: A credible, board-ready plan and a path from legacy to cloud-first.",
  },
  {
    icon: Shield,
    title: "Cybersecurity & Compliance",
    description: "Align security and risk posture with regulatory requirements. I help insurance and financial services leaders close gaps and pass audits.",
    outcome: "Typical outcome: Risk-based roadmap and audit-ready controls without over-investing.",
  },
];

export const Expertise = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden scroll-mt-20 lg:scroll-mt-24" id="expertise">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzMzNjY5OSIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How I <span className="text-gradient">Help</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Global leadership and digital transformation, with automation and AI at the center—helping organizations navigate rapid change and adopt technology with confidence.
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
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {area.description}
                </p>
                <p className="text-sm font-medium text-primary/90 border-l-2 border-primary pl-3">
                  {area.outcome}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
