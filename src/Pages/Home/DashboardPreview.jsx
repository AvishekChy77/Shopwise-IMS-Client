import desktopview from "/ShopwiseDashboard.png"
const DashboardPreview = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-10">
      <div className="font-YSerif text-center space-y-4">
        <h2 className="text-3xl text-black md:text-4xl xl:text-5xl">
          Meet your next-gen inventory software
        </h2>
        <p className=" text-slate-950 text-lg xl:text-xl">
          Engineered for growth
        </p>
      </div>
      <div>
        <img className="" src={desktopview} alt="" />
      </div>
    </div>
  );
};

export default DashboardPreview;
