export const TransformationStatement = () => {
  return (
    <section
      className="py-20 lg:py-24 relative scroll-mt-20 lg:scroll-mt-24 border-y border-border/60 bg-gradient-subtle"
      aria-labelledby="transformation-statement-heading"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="rounded-xl border border-primary/20 bg-card/60 backdrop-blur-sm px-8 py-10 lg:px-12 lg:py-12 shadow-card">
          <h2
            id="transformation-statement-heading"
            className="text-sm font-semibold uppercase tracking-widest text-primary mb-6 text-center"
          >
            A practical view of transformation
          </h2>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground leading-snug text-center">
            <span className="text-primary/80">&ldquo;</span>
            Most organizations don&apos;t fail because of technology—they fail because of how they adopt it.
            That&apos;s what I fix.
            <span className="text-primary/80">&rdquo;</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
