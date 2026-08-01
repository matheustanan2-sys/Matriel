import Marquee from "react-fast-marquee";

export default function EditorialMarquee() {
  return (
    <section
      className="border-y border-white/10 py-8 md:py-12 bg-ink"
      aria-label="Sua empresa merece uma presença digital profissional"
      data-testid="marquee-section"
    >
      <Marquee gradient={false} speed={40} autoFill>
        <span className="font-heading text-6xl md:text-8xl font-semibold tracking-tight stroke-text px-8">
          SUA EMPRESA MERECE UMA PRESENÇA DIGITAL PROFISSIONAL
        </span>
        <span className="font-accent italic text-6xl md:text-8xl text-gold px-8">·</span>
      </Marquee>
    </section>
  );
}
