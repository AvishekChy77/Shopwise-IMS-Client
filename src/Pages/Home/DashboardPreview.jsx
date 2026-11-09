import { motion } from "framer-motion";
import desktopview from "/ShopwiseDashboard.png";
import { Reveal, Section } from "../../Components/Motion";
import SectionHeading from "../../Components/SectionHeading";

const DashboardPreview = () => {
  return (
    <Section className="container mx-auto px-4">
      <SectionHeading
        eyebrow="Product tour"
        title={
          <>
            Meet your <span className="text-gradient">next-gen</span> inventory software
          </>
        }
        subtitle="One dashboard for products, sales, and insights — engineered for growth."
      />
      <Reveal>
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-500/20 via-transparent to-leaf-400/20 blur-2xl" />
          {/* the artwork already includes a laptop frame */}
          <img
            src={desktopview}
            alt="ShopWise dashboard preview"
            loading="lazy"
            className="w-full drop-shadow-2xl"
          />
        </motion.div>
      </Reveal>
    </Section>
  );
};

export default DashboardPreview;
