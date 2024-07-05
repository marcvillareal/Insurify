import React from "react";

// Images
import Grid from "../assets/images/general/Grid.png";

const AboutUs = () => {
  return (
    <div>
      <div
        // Top Carousel
        className="hero min-h-screen relative"
        style={{
          backgroundImage: `url(${Grid}), linear-gradient(0deg, rgba(94, 23, 235, 0.9), #ffffff 50%)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-opacity-10" />
        <div className="hero min-h-screen">
          <div className="hero-content text-center mb-6 max-w-full">
            <div className="max-w-full">
              <div className="pb-20">
                <h1 className="mr-2 laptop:text-7xl mobile:text-5xl font-bold text-insurify-purple">
                  About
                </h1>
                <h1 className="laptop:text-7xl mobile:text-5xl font-bold text-insurify-grey">
                  Insurify
                </h1>
              </div>
              <div className="flex flex-nowrap justify-center max-w-screen-desktop-1600 laptop:mt-8 mobile:mt-0">
                <div className="desktop:text-4xl font-bold text-justify text-gray-700 max-w-[480px] mr-12 mobile:text-2xl animate-fade-down">
                  <span className="font-bold text-insurify-purple">WHO</span>
                  <span className="desktop:text-2xl font-semibold text-insurify-grey mobile:text-xs">
                    <p>
                      we are your new friend in helping to gain a better insight
                      into your current insurance policies so that you are on
                      top of knowing exactly what coverage you have and how your
                      actions are affecting your yearly costs.
                    </p>
                  </span>
                </div>
                <div className="desktop:text-4xl font-bold text-justify text-gray-700 max-w-[480px] mx-4 mobile:text-2xl animate-fade-down animate-delay-300">
                  <span className="font-bold text-insurify-purple">WHAT</span>
                  <span className="desktop:text-2xl font-semibold text-insurify-grey mobile:text-xs">
                    <p>
                      we provide you a personal ‘Year in Review’, displaying key
                      statistics and information based of your current policies.
                    </p>
                  </span>
                </div>
                <div className="desktop:text-4xl font-bold text-justify text-gray-700 max-w-[480px] ml-12 mobile:text-2xl animate-fade-down animate-delay-500">
                  <span className="font-bold text-insurify-purple">WHY</span>
                  <span className="desktop:text-2xl font-semibold text-insurify-grey mobile:text-xs">
                    <p>
                      we want to help our customers to make informed decisions
                      about their coverage, ensuring they have the appropriate
                      protection for their unique circumstances while offering
                      deals to save money and reduce certain risks.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div // Bottom Carousel
          className="hero"
          style={{
            backgroundImage: "url(/Circle ABSTRACT.png)",
            background:
              "linear-gradient(0deg, rgba(94, 23, 235, 0.9), #ffffff 30%)",
          }}
        >
          <div className="hero">
            <div className="hero-content text-center">
              <div className="max-w-max">
                <h1 className="laptop:text-5xl xs:text-3xl mobile:text-2xl font-bold text-insurify-grey pt-20">
                  Our Vision
                </h1>
                <p className="text-insurify-grey text-opacity-60 laptop:text-3xl xs:text-md mobile:text-md pb-8 pt-10">
                  Just like your ‘Spotify Wrapped’, we seen an opportunity to
                  come up with a creative and simplistic design to provide that
                  same review but for insurance, allowing customers to have
                  access to the summary of their coverage. Our goal is to create
                  a culture of risk awareness and resilience, where customers
                  feel confident in their insurance coverage, knowing that it is
                  tailored to their specific needs and enabling them to make
                  informed decisions on their coverage, based on changing life
                  circumstances and risk profiles.
                </p>
                <p className="text-insurify-grey text-opacity-60 laptop:text-3xl xs:text-md mobile:text-md pb-14">
                  We aim to provide this service to all insurance companies
                  around the world so that everyone has the opportunity to feel
                  safe and confident in their coverages!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
