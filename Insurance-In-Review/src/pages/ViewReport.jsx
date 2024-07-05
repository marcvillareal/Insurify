import React from "react";
import ViewReportBanner from "../components/ViewReportBanner";
import ViewReportCarousel from "../components/ViewReportCarousel";

// Images
import TwentyFour from "../assets/images/general/24.png";
import InsurifyLogo from "../assets/images/general/InsurifyLogo.png"
import CircleAbstract from "../assets/images/general/CircleAbstract.png"

function ViewReport() {
  return (
    <div data-testid="view-report">
      <div data-theme="black" className="hero min-h-full relative">
        <div // Desktop
          className="hero min-h-screen flex flex-col items-center justify-end xs:invisible laptop:visible"
          style={{
            backgroundImage: `url(${TwentyFour})`,
            backgroundSize: "50%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
          }}
        />
        <div // Mobile
          className="hero min-h-screen flex flex-col items-center justify-end xs:visible laptop:invisible"
          style={{
            backgroundImage: `url(${TwentyFour})`,
            backgroundSize: "95%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div className="hero-content text-center relative z-10 pb-52">
          <div className="animate-fade-down animate-ease-linear max-w-max laptop:pb-0 xs:pb-32">
            <div className="flex items-center justify-center text-insurify-purple mb-8">
              <img
                className="tablet:h-8 xs:h-8 mdlg:h-6"
                src={InsurifyLogo}
                alt="InsurifyLogo"
              />
              <h1
                data-testid="insurify-heading"
                className="laptop:font-bold xs:font-semibold tablet:text-3xl xs:text-2xl mdlg:text-3xl ml-2 mr-4"
              >
                Insurify<span className="text-xs pt-6">®</span>
              </h1>
            </div>
            <h1
              data-testid="year-heading"
              className="laptop:text-7xl xs:text-5xl text-insurify-purple font-extrabold relative z-10"
            >
              Year in Review
            </h1>
            <h1
              data-testid="year-number-heading"
              className="laptop:text-7xl xs:text-5xl text-insurify-grey-2 font-extrabold relative z-10"
            >
              2024
            </h1>
            <h1
              data-testid="report-heading"
              className="laptop:text-7xl xs:text-5xl text-white font-extrabold relative z-10"
            >
              Report
            </h1>
          </div>
        </div>
      </div>
      <ViewReportBanner />
      <ViewReportCarousel />
      <div data-theme="black" className="hero laptop:min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse xs:py-20 laptop:py-0">
          <img
            src= {CircleAbstract}
            className="rounded-lg shadow-2xl xs:hidden laptop:block"
          />
          <div className="animate-fade-right animate-delay-700 animate-ease-in max-w-full laptop:pl-44 xs:items-center">
            <h1 className="laptop:text-6xl xs:text-4xl text-insurify-grey-2 font-extrabold">
              Find Out What's in Your
            </h1>
            <h1 className="laptop:text-6xl text-insurify-grey-2 font-extrabold pb-6 laptop:pl-60 xs:text-4xl">
              Report
            </h1>
            <div>
              <details className="collapse bg-base-200 xs:invisible laptop:visible">
                <summary className="collapse-title text-lg font-medium">
                  Click me to read more...
                </summary>
                <div className="collapse-content">
                  <ul>
                    <li>
                      - Claims Overview: Summarize claims filed and payouts for
                      Car, Life,
                      <br /> and Home insurance. Highlight trends in claim types
                      and customer satisfaction.
                    </li>
                    <li>
                      - Policy Performance: Evaluate policy renewals, premiums,
                      <br /> and coverage adjustments. Assess customer retention
                      and policy effectiveness.
                    </li>
                    <li>
                      - Market Insights: Discuss industry trends, regulatory
                      changes,
                      <br /> and emerging risks. Provide insights into consumer
                      behavior and preferences.
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewReport;
