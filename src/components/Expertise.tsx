import { ListOrdered, UserCog, ShieldCheck, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const differentiators = [
  {
    icon: ListOrdered,
    text: "Sequence adoption instead of chasing trends",
  },
  {
    icon: UserCog,
    text: "Define ownership and accountability",
  },
  {
    icon: ShieldCheck,
    text: "Establish governance frameworks that enable—not block—innovation",
  },
  {
    icon: GraduationCap,
    text: "Prepare teams for adoption through structure and enablement",
  },
];

export const Expertise = () => {
  return (
    <section
      className="py-24 bg-secondary relative overflow-hidden scroll-mt-20 lg:scroll-mt-24"
      id="approach"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzMzNjY5OSIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why most transformations fail
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Organizations rush to adopt new technologies—automating tasks, deploying tools, and calling it
            transformation. Without clear ownership, structure, and governance, these efforts stall, fragment,
            or fail.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What I do differently
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I focus on execution that scales:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {differentiators.map((item, index) => (
              <Card
                key={index}
                className="border-border bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
              >
                <CardContent className="p-6 flex gap-4 items-start text-left">
                  <div className="shrink-0 p-3 rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <p className="text-base text-card-foreground leading-snug pt-0.5 font-medium">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
