import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className=" max-w-4xl bg-white min-h-screen mx-auto flex flex-col gap-5 items-center text-lg pt-20"
      id="error-page"
    >
      <img
        className="w-1/2 md:w-1/3"
        src="https://i.ibb.co/gjfDbbC/404.webp"
        alt=""
      />
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">
        <button className="btn text-white rounded border-none mr-2 hover:text-[#FF3811] hover:bg-none bg-[#FF3811]">
          Home
        </button>
      </Link>
    </div>
  );
}
