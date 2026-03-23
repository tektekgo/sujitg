import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Expertise } from "@/components/Expertise";
import { TransformationStatement } from "@/components/TransformationStatement";
import { Projects } from "@/components/Projects";
import { Speaking } from "@/components/Speaking";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen scroll-mt-0" id="home">
      <Navigation />
      <Hero />
      <Expertise />
      <TransformationStatement />
      <Projects />
      <Speaking />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
