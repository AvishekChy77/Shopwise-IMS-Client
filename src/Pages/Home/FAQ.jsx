import Lottie from "lottie-react";
import faq from "../../assets/faq.json";
const Faq = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-10">
      <div className="flex flex-col items-center ">
        <Lottie className="w-40 -mb-5" animationData={faq} autoPlay={true} />
        <h2 className="text-2xl sm:text-3xl text-black md:text-4xl xl:text-5xl font-semibold">
          Frequently asked questions
        </h2>
      </div>
      <div className=" xl:w-[800px]">
        <div className="collapse collapse-arrow mb-2 bg-[#9AD0C2]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium ">
            What kind of buisness can get help from Shopwise?
          </div>
          <div className="collapse-content">
            <p>
              Shopwise provides services for almost any types of retail
              buisness. If you are a retail buisness owner you will get suitable
              features and services in our site.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow mb-2 bg-[#9AD0C2]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium ">
            What is accounting for e-commerce?
          </div>
          <div className="collapse-content">
            <p>
              Shopwise simplifies the accounting of your e-commerce business.
              With Shopwise, you can download your payouts and add them to your
              accounts. You can select the Orders tab in Shopwise to view
              individual sales orders.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow mb-2 bg-[#9AD0C2]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium ">
            How far back can you bring in data during the initial setup?
          </div>
          <div className="collapse-content">
            <p>
              Each sales channel has a time frame you can bring in data. You can
              set a close the books date in Shopwise Online to prevent changes
              to be made before a specified date. If you set this closing date,
              then you won't be able to download historical data before the
              closing date.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow mb-2 bg-[#9AD0C2]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium ">
            Can I connect multiple sales channels?
          </div>
          <div className="collapse-content">
            <p>
              Yes, you can connect to more than one sales channel. The number of
              stores you can connect with varies by Shopwise Online version. The
              table below shows how many connections each Shopwise Online
              version supports.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow mb-2 bg-[#9AD0C2]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium ">
            Can A user create multiple shops?
          </div>
          <div className="collapse-content">
            <p>No, currently Users are limited to create one shop.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow mb-2 bg-[#9AD0C2]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium ">
            What are Payouts?
          </div>
          <div className="collapse-content">
            <p>
              Payouts are the payments sent from your sales channel for your
              completed orders. The total amount of each payout will include the
              sales amount, all discounts/refunds, expenses, and adjustments for
              the orders in the payout period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
