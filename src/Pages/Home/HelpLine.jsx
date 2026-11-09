import { motion } from "framer-motion";
import { FaHeadset } from "react-icons/fa";
import { LuMonitor } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Reveal, Section } from "../../Components/Motion";
import SectionHeading from "../../Components/SectionHeading";

const HelpLine = () => {
  return (
    <Section className="container mx-auto px-4">
      <SectionHeading
        eyebrow="We're here for you"
        title={
          <>
            Helping businesses <span className="text-gradient">do more</span>
          </>
        }
      />
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <Reveal>
          <motion.div
            whileHover={{ y: -6 }}
            className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 p-9 text-white shadow-lift"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-leaf-400/20 blur-2xl" />
            <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-2xl">
              <FaHeadset />
            </span>
            <h3 className="font-display mt-5 text-2xl font-bold text-leaf-300">
              Talk to sales
            </h3>
            <p className="mt-3 text-sm text-white/70">
              Give us a call if you need help picking the ShopWise product for your
              business.
            </p>
            <p className="mt-4 font-display text-xl font-bold">1-527-937-1751</p>
            <p className="text-xs text-white/60">Mon–Fri, 5 AM to 6 PM GMT</p>
          </motion.div>
        </Reveal>
        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ y: -6 }}
            className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 p-9 text-white shadow-lift"
          >
            <div className="pointer-events-none absolute -left-10 -bottom-10 size-40 rounded-full bg-brand-400/30 blur-2xl" />
            <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-2xl">
              <LuMonitor />
            </span>
            <h3 className="font-display mt-5 text-2xl font-bold text-leaf-300">
              Visit our support hub
            </h3>
            <p className="mt-3 text-sm text-white/70">
              Find help articles, video tutorials, and connect with other businesses in
              our online community.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/watchDemo"
                className="rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-brand-900"
              >
                Watch demo
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 shadow-soft transition hover:bg-leaf-300"
              >
                Sign up today
              </Link>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
};

export default HelpLine;
