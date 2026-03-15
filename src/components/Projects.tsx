import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Smartphone, Terminal, Globe, Wrench } from "lucide-react";

type ProjectCategory = "All" | "Web Apps" | "CLI Tools" | "Mobile Apps" | "Dev Tools";

interface Project {
  title: string;
  description: string;
  problem?: string;
  approach?: string;
  outcome?: string;
  category: ProjectCategory;
  icon: typeof Globe;
  technologies: string[];
  link?: string;
  github?: string;
  status?: string;
}

const projects: Project[] = [
  {
    title: "AI-Focus.org",
    description: "Website and resource hub for AI integration and enterprise AI strategy.",
    problem: "Leaders need a clear, practical view of AI use cases and adoption paths.",
    approach: "Created and maintain a public site showcasing AI capabilities, governance, and enterprise deployment patterns.",
    outcome: "Ongoing showcase for AI advisory work and a reference for clients exploring AI strategy.",
    category: "Web Apps",
    icon: Globe,
    technologies: ["Web Development", "AI", "Enterprise"],
    link: "https://www.ai-focus.org",
  },
  {
    title: "Miles-Focus",
    description: "Mileage tracking for IRS-compliant deductions with minimal manual entry.",
    problem: "Professionals lose time and accuracy when tracking mileage for taxes manually.",
    approach: "Built a React app that imports Google Timeline data, applies IRS rates, and filters by purpose.",
    outcome: "IRS-ready Excel/PDF reports in minutes; reduces errors and audit risk.",
    category: "Web Apps",
    icon: Globe,
    technologies: ["React", "TypeScript", "Tax Tools"],
    link: "https://miles-focus.vercel.app",
    github: "https://github.com/tektekgo/miles-focus",
  },
  {
    title: "Sherlock-logs",
    description: "CLI for fast log analysis with summaries and export.",
    problem: "DevOps and developers waste time scanning raw logs for errors and patterns.",
    approach: "Designed a Python CLI with structured parsing, styled output, and export options.",
    outcome: "Faster incident triage and reusable patterns for operational visibility.",
    category: "CLI Tools",
    icon: Terminal,
    technologies: ["Python", "CLI", "DevOps"],
    github: "https://github.com/jisujit/sherlock-logs",
  },
  {
    title: "Splitbi",
    description: "Expense sharing and bill splitting for groups.",
    problem: "Friends and roommates need a simple way to track shared expenses and settle up.",
    approach: "Built a mobile-friendly PWA for shared expenses, splits, and settlements.",
    outcome: "Clear who owes what; fewer awkward conversations and missed payments.",
    category: "Mobile Apps",
    icon: Smartphone,
    technologies: ["Mobile", "Finance", "Social"],
    status: "Soon on Android & iOS App Stores",
    github: "https://github.com/tektekgo/splitly",
  },
  {
    title: "Dev Workflow Generator",
    description: "Persistent development context across coding sessions.",
    problem: "Context is lost between sessions; productivity drops when switching tasks or tools.",
    approach: "Created a generator that produces persistent context artifacts to bridge sessions and tools.",
    outcome: "Better continuity and less re-orientation for developers and teams.",
    category: "Dev Tools",
    icon: Wrench,
    technologies: ["Developer Tools", "Productivity", "Automation"],
    github: "https://github.com/jisujit/dev-workflow-generator",
  },
  {
    title: "Retirement Ready Vault",
    description: "Secure place to organize retirement info for sharing with advisors.",
    problem: "Retirement data is scattered; sharing with planners is ad hoc and insecure.",
    approach: "Built a secure app to centralize retirement information with controlled sharing.",
    outcome: "One place for key data; easier, safer handoffs to consultants and planners.",
    category: "Web Apps",
    icon: Globe,
    technologies: ["Security", "Finance", "Planning"],
    github: "https://github.com/tektekgo/Retirement-Ready-Vault",
  },
  {
    title: "Automation Analytics Dashboard",
    description: "Analytics for automation metrics and operational performance.",
    problem: "Teams run automation at scale but lack a single view of impact and health.",
    approach: "Designed a dashboard to aggregate automation metrics, KPIs, and operational insights.",
    outcome: "Visibility into automation ROI and performance for prioritization and governance.",
    category: "Web Apps",
    icon: Globe,
    technologies: ["Analytics", "Automation", "Visualization"],
    github: "https://github.com/tektekgo/automation-analytics-dashboard",
  },
];

const categories: ProjectCategory[] = ["All", "Web Apps", "CLI Tools", "Mobile Apps", "Dev Tools"];

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-24 bg-background relative overflow-hidden scroll-mt-20 lg:scroll-mt-24" id="projects">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik00MCAyMGM1LjUyMyAwIDEwIDQuNDc3IDEwIDEwcy00LjQ3NyAxMC0xMCAxMC0xMC00LjQ3Ny0xMC0xMCA0LjQ3Ny0xMCAxMC0xMHoiIHN0cm9rZT0iIzMzNjY5OSIgc3Ryb2tlLW9wYWNpdHk9Ii4wOCIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projects & <span className="text-gradient">Innovations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Side projects and tools that reflect how I work: problem-first, outcome-focused, and built to last. Each one follows a clear problem → approach → outcome path.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`
                transition-all duration-300
                ${selectedCategory === category 
                  ? "bg-primary text-primary-foreground shadow-primary" 
                  : "border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary"
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.title}
              className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-2 border-border bg-card animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mb-4 inline-flex p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300 w-fit">
                  <project.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed mb-3">
                  {project.description}
                </CardDescription>
                {project.problem != null && project.approach != null && project.outcome != null && (
                  <div className="space-y-2 text-sm text-muted-foreground border-l-2 border-primary/40 pl-3 mt-2">
                    <p><span className="font-medium text-foreground">Problem:</span> {project.problem}</p>
                    <p><span className="font-medium text-foreground">Approach:</span> {project.approach}</p>
                    <p><span className="font-medium text-foreground">Outcome:</span> {project.outcome}</p>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary"
                      className="bg-secondary/50 text-secondary-foreground border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {project.status && (
                  <div className="text-sm text-primary font-medium">
                    {project.status}
                  </div>
                )}
                
                <div className="flex gap-3 pt-2">
                  {project.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-primary/30 hover:bg-primary/10 hover:border-primary"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-primary/30 hover:bg-primary/10 hover:border-primary"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};