import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-scroll";

// Images
import BottomArrow from '../assets/images/report/Arrow.png'
import TopArrow from '../assets/images/report/Arrow2.png'
import ScrollToTop from '../assets/images/report/ScrollToTop.png'

const HomeMetricsSection = ({ homeMetrics, carMetrics, lifeMetrics }) => {
  const isValidMetrics = (metrics) => {
    return metrics && Object.values(metrics).every((value) => value !== null);
  };

  return (
    <>
      <div
        id="h1"
        className="relative hero min-h-screen bg-insurify-1"
        data-testid="h1"
      >
        <div className="hero-content flex-col lg:flex-row">
          <h1 className="text-9xl laptop:pb-0 xs:pb-10 font-bold laptop:pr-20 animate-ping animate-duration-1000">
            🕵️‍♂️
          </h1>
          <div className="max-w-4xl mobile:text-center">
            <h1 className="laptop:text-6xl mobile:text-4xl font-bold">
              {homeMetrics.theft_incidents <= 2
                ? "Low Theft, Low Stress, Low Costs!"
                : "Thief, Thief, Go Away!"}
            </h1>
            <p
              className="text-insurify-summary-text text-2xl font-bold pt-4"
              data-testid="theft-incident-text"
            >
              {homeMetrics.theft_incidents <= 2 ? (
                <>
                  Just{" "}
                  <span className="text-insurify-purple">
                    {homeMetrics.theft_incidents}
                  </span>{" "}
                  theft incident
                  {homeMetrics.theft_incidents == 1 ? "" : "s"} mean
                  {homeMetrics.theft_incidents == 1 ? "s" : ""} you're keeping
                  things tight and secure. We love this as much as you do, and{" "}
                  <span className="text-white">
                    your vigilance saved 5% on premiums
                  </span>
                  . Stay vigilant, keep saving!
                </>
              ) : (
                <>
                  With{" "}
                  <span className="text-insurify-purple">
                    {homeMetrics.theft_incidents}
                  </span>{" "}
                  theft incident
                  {homeMetrics.theft_incidents == 1 ? "" : "s"}, your security
                  is lacking! More theft incidents spike your risk and can drive
                  up insurance rates. Time to reassess security measures—better
                  protection means potential savings.
                  <span className="text-white">
                    Lower the theft, lower the premiums!
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
        {/* Bottom Arrow */}
        <Link
          to="h2"
          smooth={true}
          duration={1500}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
          data-testid="bottom-arrow-h1"
        >
          <img
            src= {BottomArrow}
            className="blaptop:order-xs:pb-4 none w-8 h-6"
            alt="Bottom Arrow"
          />
        </Link>
        {/* Top Arrow */}
        {isValidMetrics(carMetrics) && isValidMetrics(lifeMetrics) && (
          <Link
            to="c3"
            smooth={true}
            duration={1500}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8"
            data-testid="top-arrow-h1"
          >
            <img
              src= {TopArrow}
              className="border-none w-8 h-6"
              alt="Top Arrow"
            />
          </Link>
        )}

        {!isValidMetrics(carMetrics) && !isValidMetrics(lifeMetrics) && (
          <Link
            to="0"
            smooth={true}
            duration={1500}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8"
            data-testid="top-arrow-h1"
          >
            <img
              src= {TopArrow}
              className="border-none w-8 h-6"
              alt="Top Arrow"
            />
          </Link>
        )}
      </div>

      <div
        id="h2"
        className="relative hero min-h-screen bg-insurify-2"
        data-testid="h2"
      >
        <div className="hero-content flex-col lg:flex-row">
          <h1 className="text-9xl font-bold laptop:pr-20 xs:pb-20 laptop:pb-0 animate-pulse animate-infinite">
            🔥
          </h1>
          <div className="max-w-4xl mobile:text-center">
            <h1 className="laptop:text-6xl xs:text-4xl font-bold">
              {homeMetrics.fire_incidents <= 2
                ? "Flame-Free, Fee-Free!"
                : "Fire Hazards Flaring Up!"}
            </h1>
            <p className="text-insurify-summary-text text-2xl font-bold pt-4">
              {homeMetrics.fire_incidents <= 2 ? (
                <>
                  With just{" "}
                  <span
                    className="text-insurify-purple"
                    data-testid="fire-incident-count"
                  >
                    {homeMetrics.fire_incidents}
                  </span>{" "}
                  fire incident
                  {homeMetrics.fire_incidents == 1 ? "" : "s"}, you're mastering
                  the art of prevention and protection!{" "}
                  <span className="text-white">
                    Enjoy a 5% safety discount on us!{" "}
                  </span>
                  Let's keep your home sweet home safe and secure!
                </>
              ) : (
                <>
                  With{" "}
                  <span
                    className="text-insurify-purple"
                    data-testid="fire-incident-count"
                  >
                    {homeMetrics.fire_incidents}{" "}
                  </span>
                  fire incident
                  {homeMetrics.fire_incidents == 1 ? "" : "s"}, it's time to
                  intensify your fire prevention efforts! A high number of fire
                  incidents signals a hotbed of risk, causing your insurance
                  premiums to ignite. Focus on fire safety to smother those
                  flames and your costs. Prevention is cheaper than the cure!
                </>
              )}
            </p>
          </div>
        </div>
        {/* Bottom Arrow */}
        {isValidMetrics(carMetrics) && isValidMetrics(lifeMetrics) && (
          <Link
            to="l1"
            smooth={true}
            duration={1500}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
            data-testid="bottom-arrow-h2"
          >
            <img
              src= {BottomArrow}
              className="border-none w-8 h-6"
              alt="Bottom Arrow"
            />
          </Link>
        )}

        {!isValidMetrics(carMetrics) && !isValidMetrics(lifeMetrics) && (
          <Link
            to="cl1"
            smooth={true}
            duration={1500}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
            data-testid="bottom-arrow-h2"
          >
            <img
              src= {BottomArrow}
              className="border-none w-8 h-6"
              alt="Bottom Arrow"
            />
          </Link>
        )}
        {/* Top Arrow */}
        <Link
          to="h1"
          smooth={true}
          duration={1500}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8"
          data-testid="top-arrow-h2"
        >
          <img
            src= {TopArrow}
            className="border-none w-8 h-6"
            alt="Top Arrow"
          />
        </Link>
      </div>
    </>
  );
};

HomeMetricsSection.propTypes = {
  homeMetrics: PropTypes.shape({
    theft_incidents: PropTypes.string.isRequired,
    fire_incidents: PropTypes.string.isRequired,
  }),
};

export default HomeMetricsSection;
