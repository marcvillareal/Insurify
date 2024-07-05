import React from "react";

// Images
import GridBackground from "../assets/images/general/Grid.png";
import MobileExample from "../assets/images/home/Top Carousel Mobile Example.png";
import ProtectionMsg from "../assets/images/home/Protection Msg.png";
import Abstract from "../assets/images/home/Abstract.png";
import AbstractTwo from "../assets/images/general/CircleAbstract.png";

const Home = () => {
  return (
    <div>
      {/* Top Carousel */}
      <div
        className="hero laptop:min-h-screen max-w-full"
        style={{ backgroundImage: `url(${GridBackground})` }}
      >
        <div className="hero-overlay bg-opacity-5" />
        <div className="hero laptop:min-h-screen">
          <div className="hero-content flex-row-reverse">
            <img
              src={MobileExample}
              className="max-w-sm rounded-lg shadow-4xl w-64 mobile:hidden mobile:w-32 mobile:-ml-6 md:w-72 tablet:-ml-80 tablet:w-64 laptop:block laptop:w-96 laptop:ml-28"
            />
            <div className="animate-fade-left xs:py-20 mobile:py-24">
              <img
                src={ProtectionMsg}
                className="laptop:max-w-s laptop:w-40 mobile:w-24 rounded-lg shadow-4xl w-30 -ml-2"
              />
              <h1 className="mr-24 text-5xl mobile:text-4xl md:text-7xl font-bold text-insurify-purple">
                Insurance
              </h1>
              <h1 className="mb-5 text-5xl mobile:text-4xl md:text-7xl font-bold text-insurify-grey">
                Year in Review
              </h1>
              <p className="mb-5 text-insurify-grey text-xl mobile:text-xs xs:text-sm md:text-xl">
                Welcome to your Insurance Snapshot! In a glance, see your <br />
                coverage highlights. Your peace of mind is our priority. Cheers
                to <br /> simplicity, security, and a future safeguarded
                effortlessly!
              </p>
              <a href="/view-report">
                <button className="btn laptop:btn-md mobile:btn-sm bg-insurify-purple text-white font-extrabold rounded-box w-40 mobile:ml-0 tablet:ml-0">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Carousel */}
      <div className="hidden mobile:block">
        <div
          className="hero max-w-full relative"
          style={{
            backgroundImage: { AbstractTwo },
            background:
              "linear-gradient(0deg, rgba(94, 23, 235, 0.9), #ffffff 40%)",
          }}
        >
          <div className="flex-col lg:flex-row-reverse md:mr-64 mobile:ml-2">
            <div>
              <h1 className="laptop:text-4xl font-bold text-insurify-grey laptop:mr-80 laptop:w-full md:text-4xl mobile:text-base mobile:pt-10 mobile:w-72">
                One App, One Location, Everything you need
              </h1>
              <p className="mb-5 laptop:pt-10 mobile:pt-4 text-insurify-grey text-xl text-opacity-50 md:text-xl mobile:text-xs">
                Mobilize Your Peace of Mind: Simplicity, Security, and Seamless
                <br />
                Safeguarding, All in One Snapshot! - Discover the app that will
                <br />
                centralize all your needs and more.
              </p>
              <a href="https://www.apple.com/uk/app-store/">
                <button className="btn laptop:btn-md mobile:btn-sm bg-insurify-purple text-white font-extrabold rounded-box ml-54 w-40 relative mobile:mb-10 mobile:bg-insurify-purple mobile:text-white">
                  get the app
                </button>
              </a>
            </div>
          </div>
          <div className="laptop:flex laptop:flex-row-reverse laptop:pl-24">
            <div className="laptop:pl-96">
              <img
                src={Abstract}
                className="pt-20 laptop:block laptop:h-full laptop:left-96 laptop:pl-96 mobile:hidden mobile:h-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
