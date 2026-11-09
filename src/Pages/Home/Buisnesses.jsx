import Marquee from "react-fast-marquee";
import { Reveal, Section } from "../../Components/Motion";

/* Styled wordmarks — the previous logo images were hosted on ImgBB,
   which now serves 503 placeholders, so these never break. */
const brands = [
  { name: "HATIL", style: "font-serif tracking-widest" },
  { name: "RFL", style: "font-black italic" },
  { name: "HALLMARK", style: "font-display tracking-[0.3em]" },
  { name: "YAMAHA", style: "font-black tracking-wide" },
  { name: "MINISO", style: "font-display font-extrabold" },
  { name: "BATA", style: "font-serif font-bold tracking-[0.25em]" },
  { name: "AARONG", style: "font-display tracking-widest" },
  { name: "WALTON", style: "font-black tracking-wide" },
];

const Buisnesses = () => {
  return (
    <Section className="container mx-auto px-4">
      <Reveal>
        <p className="mb-10 text-center text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
          Powering the best businesses in Bangladesh
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <Marquee gradient gradientColor="#f8fafc" gradientWidth={80} speed={40} pauseOnHover>
          {brands.map((b) => (
            <span
              key={b.name}
              className={`mx-10 text-2xl text-slate-300 transition-colors duration-300 hover:text-brand-700 md:text-3xl ${b.style}`}
            >
              {b.name}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </Section>
  );
};

export default Buisnesses;
