import React from "react";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import {
  BsGlobeEuropeAfrica,
  BsFillTelephoneFill,
  BsChatRightTextFill,
} from "react-icons/bs";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const ContactUs = () => {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row gap-12 mx-auto items-center justify-center w-11/12 max-w-maxContent mb-20 pt-[100px]">
        <section className="md:w-2/5 bg-richblack-800 p-6 flex flex-col gap-6 text-white rounded-xl self-start">
          <div className="flex flex-row gap-6">
            <BsChatRightTextFill className="text-richblack-100 text-2xl" />
            <div>
              <h1 className="font-semibold text-lg text-richblack-5">
                Chat on us
              </h1>
              <p className="text-base font-medium text-richblack-200">
                Our friendly team is here to help.
              </p>
              <p className="text-base font-medium text-richblack-200">
                @mail address
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <BsGlobeEuropeAfrica className="text-richblack-100 text-2xl" />
            <div>
              <h1 className="font-semibold text-lg text-richblack-5">
                Visit us
              </h1>
              <p className="text-base font-medium text-richblack-200">
                Come and say hello at our office HQ.
              </p>
              <p className="text-base font-medium text-richblack-200">
                Here is the location/ address
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <BsFillTelephoneFill className="text-richblack-100 text-2xl" />
            <div>
              <h1 className="font-semibold text-lg text-richblack-5">
                Call us
              </h1>
              <p className="text-base font-medium text-richblack-200">
                Mon - Fri From 8am to 5pm
              </p>
              <p className="text-base font-medium text-richblack-200">
                +123 456 7890
              </p>
            </div>
          </div>
        </section>
        {/* <section className="mx-auto flex items-center justify-center w-11/12 max-w-maxContent mb-20"> */}
        <section className="md:w-3/5 p-6 md:p-14 border border-richblack-600 rounded-xl">
          <ContactFormSection />
        </section>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
        <ReviewSlider />
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default ContactUs;
