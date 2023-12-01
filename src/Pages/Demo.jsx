import { Helmet } from "react-helmet-async";

const Demo = () => {
  return (
    <>
      <Helmet>
        <title>ShopWise | Watch Demo</title>
      </Helmet>
      <div className="video-responsive">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/sl5zEPRkp0U?si=CTIZkC6cGkVF8fEt"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
};

export default Demo;
