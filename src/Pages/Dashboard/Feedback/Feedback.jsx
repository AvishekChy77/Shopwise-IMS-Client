const Feedback = () => {
  return (
    <div id="contact" className="m-auto py-4 sm:py-16 flex flex-col items-center">
      <div>
      <h1 className=" text-center bg-gradient-to-r my-5 from-[#13547a] to-[#80d0c7] text-transparent bg-clip-text font-bold text-2xl ">
        How is it going?
      </h1>
      <h1 className=" text-center md:text-xl mb-6 sm:mb-10">Give us a feedback!</h1>
      <div className=" p-10 w-[100%] sm:w-[500px] md:w-[600px] xl:w-[740px] bg-base-300 rounded-lg shadow-lg">
        <form
          action="https://getform.io/f/8908e86b-d34d-4727-a557-591b833dc4c7"
          method="POST"
          encType="multipart/form-data"
        >
          <div className=" grid md:grid-cols-2 md:gap-4 w-full ">
            <div className="flex flex-col">
              <label className=" uppercase  text-sm py-2">Owner Name</label>
              <input
                className=" border-2 rounded-lg p-1 sm:p-3 bg-white flex w-full"
                type="text"
                name="name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className=" uppercase  text-sm py-2">Shop Name</label>
              <input
                className=" border-2 rounded-lg p-1 sm:p-3 bg-white flex w-full"
                type="text"
                name="sName"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className=" uppercase  text-sm py-2">Email</label>
            <input
              className=" border-2 rounded-lg p-1 sm:p-3 bg-white flex "
              type="email"
              name="email"
              required
            />
          </div>
          {/* <div className="flex flex-col py-2">
            <label className=" uppercase  text-sm py-2">Subject</label>
            <input
              className=" border-2 rounded-lg p-3 flex "
              type="text"
              name="subject"
            />
          </div> */}
          <div className="flex flex-col py-2">
            <label className=" uppercase  text-sm py-2">Message</label>
            <textarea
              className=" border-2 bg-white rounded-lg p-3 "
              rows={10}
              name="message"
              required
            ></textarea>
          </div>
          <button className="btn w-full text-white bg-black border-none hover:scale-105 btn-outline">
            Send Feedback
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Feedback;
