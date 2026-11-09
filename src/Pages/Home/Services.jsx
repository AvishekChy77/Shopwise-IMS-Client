import { motion } from "framer-motion";
import { FaShippingFast } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { GoGraph } from "react-icons/go";
import { PiWarehouse } from "react-icons/pi";
import { SiBookstack } from "react-icons/si";
import { SlLocationPin } from "react-icons/sl";
import { Reveal, Section } from "../../Components/Motion";
import SectionHeading from "../../Components/SectionHeading";

const services = [
  {
    icon: <GoGraph />,
    title: "Increase sales",
    text: "Expand your business online with multi-channel inventory management. Integrate Amazon, eBay, Etsy, or Shopify and start selling your merchandise.",
  },
  {
    icon: <SiBookstack />,
    title: "Manage orders",
    text: "Handle offline and online orders in one place — purchase orders, backorders, and drop shipments inside a single application.",
  },
  {
    icon: <FaShippingFast />,
    title: "Shipping integrations",
    text: "Get real-time rates and in-transit details from major carriers, and pick the right shipping partner for every order.",
  },
  {
    icon: <SlLocationPin />,
    title: "End-to-end tracking",
    text: "Track every item or batch with serial and batch tracking — full control over movement and expiry, at all times.",
  },
  {
    icon: <GiGearStickPattern />,
    title: "Accounting & CRM",
    text: "Seamless Zoho CRM and Zoho Books integration keeps contacts, orders, and financial data in sync without breaking a sweat.",
  },
  {
    icon: <PiWarehouse />,
    title: "Warehouse management",
    text: "Check stock levels, manage inter-warehouse transfers, and generate per-warehouse reports within seconds.",
  },
];

const Services = () => {
  return (
    <Section className="container mx-auto px-4">
      <SectionHeading
        eyebrow="Everything included"
        title={
          <>
            The one-stop platform you need to <span className="text-gradient">thrive</span>
          </>
        }
        subtitle="Everything you need to succeed in one intuitive cloud system."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="surface group h-full p-7 hover:shadow-lift"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 text-2xl text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {s.icon}
              </span>
              <h3 className="font-display mt-5 text-lg font-bold text-brand-950">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default Services;
