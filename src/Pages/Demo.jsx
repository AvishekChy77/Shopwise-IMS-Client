import { Helmet } from "react-helmet-async";
import { PageTransition } from "../Components/Motion";
import SectionHeading from "../Components/SectionHeading";

const Demo = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Watch Demo</title>
      </Helmet>
      <div className="container mx-auto max-w-4xl px-4 py-14">
        <SectionHeading
          eyebrow="Product demo"
          title={
            <>
              See ShopWise <span className="text-gradient">in action</span>
            </>
          }
          subtitle="A quick tour of the dashboard, product management, and sales flow."
        />
        <div className="video-responsive overflow-hidden rounded-2xl shadow-lift">
          <iframe
            src="https://www.youtube.com/embed/sl5zEPRkp0U?si=CTIZkC6cGkVF8fEt"
            title="ShopWise demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </PageTransition>
  );
};

export default Demo;
