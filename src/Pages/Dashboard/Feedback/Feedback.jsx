import { PageTransition } from "../../../Components/Motion";
import SectionHeading from "../../../Components/SectionHeading";

const Feedback = () => {
  return (
    <PageTransition>
      <div id="contact" className="container mx-auto max-w-2xl px-4 py-14">
        <SectionHeading
          eyebrow="How is it going?"
          title={
            <>
              Give us your <span className="text-gradient">feedback</span>
            </>
          }
          subtitle="Tell us what's working and what we should improve."
        />
        <form
          action="https://getform.io/f/8908e86b-d34d-4727-a557-591b833dc4c7"
          method="POST"
          encType="multipart/form-data"
          className="surface p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="label-modern">Owner name</label>
              <input className="input-modern" type="text" name="name" required />
            </div>
            <div>
              <label className="label-modern">Shop name</label>
              <input className="input-modern" type="text" name="sName" />
            </div>
          </div>
          <div className="mt-5">
            <label className="label-modern">Email</label>
            <input className="input-modern" type="email" name="email" required />
          </div>
          <div className="mt-5">
            <label className="label-modern">Message</label>
            <textarea
              className="input-modern min-h-40"
              rows={8}
              name="message"
              required
            ></textarea>
          </div>
          <button className="btn-brand mt-6 w-full">Send feedback</button>
        </form>
      </div>
    </PageTransition>
  );
};

export default Feedback;
