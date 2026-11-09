import { Reveal } from "./Motion";

const SectionHeading = ({ eyebrow, title, subtitle, className = "" }) => (
  <div className={`mx-auto mb-12 max-w-2xl text-center ${className}`}>
    {eyebrow && (
      <Reveal>
        <span className="chip mb-4">{eyebrow}</span>
      </Reveal>
    )}
    <Reveal delay={0.05}>
      <h2 className="font-display text-3xl font-bold text-brand-950 md:text-4xl">
        {title}
      </h2>
    </Reveal>
    {subtitle && (
      <Reveal delay={0.1}>
        <p className="mt-4 text-slate-500">{subtitle}</p>
      </Reveal>
    )}
  </div>
);

export default SectionHeading;
