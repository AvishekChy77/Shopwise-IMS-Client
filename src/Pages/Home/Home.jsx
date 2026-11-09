import { Helmet } from "react-helmet-async";
import { PageTransition } from "../../Components/Motion";
import Banner from "./Banner";
import Buisnesses from "./Buisnesses";
import DashboardPreview from "./DashboardPreview";
import Faq from "./FAQ";
import HelpLine from "./HelpLine";
import Reviews from "./Reviews";
import Services from "./Services";

const Home = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Home</title>
      </Helmet>
      <Banner />
      <div className="space-y-24 py-20 md:space-y-32">
        <Buisnesses />
        <DashboardPreview />
        <Services />
        <Reviews />
        <HelpLine />
        <Faq />
      </div>
    </PageTransition>
  );
};

export default Home;
