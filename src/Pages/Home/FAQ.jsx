import Lottie from "lottie-react";
import faq from "../../assets/faq.json";
import { Reveal, Section } from "../../Components/Motion";
import SectionHeading from "../../Components/SectionHeading";

const faqs = [
  {
    q: "What kind of business can get help from ShopWise?",
    a: "ShopWise provides services for almost any type of retail business. If you are a retail business owner you will find suitable features and services on our platform.",
  },
  {
    q: "What is accounting for e-commerce?",
    a: "ShopWise simplifies the accounting of your e-commerce business. You can download your payouts and add them to your accounts, and view individual sales orders from the Orders tab.",
  },
  {
    q: "How far back can you bring in data during the initial setup?",
    a: "Each sales channel has a time frame for importing data. You can set a close-the-books date in ShopWise Online to prevent changes before a specified date — historical data before that closing date won't be downloaded.",
  },
  {
    q: "Can I connect multiple sales channels?",
    a: "Yes, you can connect more than one sales channel. The number of stores you can connect varies by ShopWise Online version.",
  },
  {
    q: "Can a user create multiple shops?",
    a: "No, currently each user is limited to creating one shop.",
  },
  {
    q: "What are payouts?",
    a: "Payouts are the payments sent from your sales channel for completed orders. Each payout includes the sales amount, discounts/refunds, expenses, and adjustments for the orders in the payout period.",
  },
];

const Faq = () => {
  return (
    <Section className="container mx-auto max-w-3xl px-4">
      <div className="flex flex-col items-center">
        <Reveal>
          <Lottie className="w-36" animationData={faq} autoPlay={true} />
        </Reveal>
        <SectionHeading
          title={
            <>
              Frequently asked <span className="text-gradient">questions</span>
            </>
          }
          className="!mb-8"
        />
      </div>
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.05}>
            <div className="collapse collapse-arrow surface rounded-2xl">
              <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
              <div className="collapse-title font-display font-semibold text-brand-950">
                {item.q}
              </div>
              <div className="collapse-content">
                <p className="text-sm leading-relaxed text-slate-500">{item.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default Faq;
