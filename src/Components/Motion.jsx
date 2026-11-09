/* Shared animation primitives built on framer-motion */
import { motion } from "framer-motion";

export const PageTransition = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Section = ({ children, className = "" }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.08 } },
    }}
    className={className}
  >
    {children}
  </motion.section>
);

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: "easeOut" },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
