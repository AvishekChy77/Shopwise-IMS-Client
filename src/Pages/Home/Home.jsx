import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Buisnesses from "./Buisnesses";
import Faq from "./FAQ";
import HelpLine from "./HelpLine";
import Reviews from "./Reviews";
import Services from "./Services";
import DashboardPreview from "./DashboardPreview";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ShopWise | Home</title>
      </Helmet>
      <div className=" space-y-28 mb-16">
        <Banner/>
        <Buisnesses/>
        <DashboardPreview/>
        <Services/>
        <Reviews/>
        <HelpLine/>
        <Faq/>
      </div>
    </>
  );
};

export default Home;
