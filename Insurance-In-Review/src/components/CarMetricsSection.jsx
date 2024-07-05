import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-scroll";

// Images
import BottomArrow from '../assets/images/report/Arrow.png'
import TopArrow from '../assets/images/report/Arrow2.png'

const CarMetricsSection = ({ carMetrics, homeMetrics, lifeMetrics }) => {
  const isValidMetrics = (metrics) => {
    return metrics && Object.values(metrics).every((value) => value !== null);
  };
  return (
    <>
      <div
        id="c1"
        className="relative hero min-h-screen bg-insurify-1"
        data-testid="car-metrics-section"
      >
        <div className="hero-content flex-col lg:flex-row">
          <h1 className="text-9xl font-bold laptop:pr-20 xs:pb-4 animate-wiggle animate-infinite">
            🚗💨
          </h1>
          <div className="max-w-3xl xs:text-center">
            <h1
              className="laptop:text-6xl xs:text-4xl font-bold text-insurify-highlight"
              data-testid="average-speed-heading"
            >
              Zooming Along at {carMetrics.average_speed} MPH!
            </h1>
            <p
              className="text-insurify-summary-text text-2xl font-bold pt-4"
              data-testid="average-speed-description"
            >
              {carMetrics.average_speed <= 55 ? (
                <>
                  With an average speed of{" "}
                  <span className="text-insurify-purple">
                    {carMetrics.average_speed}
                  </span>{" "}
                  MPH,{" "}
                  <span className="text-white">
                    you're showing a 5% improvement over last year.{" "}
                  </span>
                  . Your cautious approach qualifies you for lower premiums on
                  your insurance. Great job keeping it secure and steady!
                </>
              ) : carMetrics.average_speed <= 70 ? (
                <>
                  Averaging{" "}
                  <span className="text-insurify-purple">
                    {carMetrics.average_speed}
                  </span>{" "}
                  MPH, you're navigating life's journeys with a perfect balance
                  of speed and caution.
                  <span className="text-white">
                    {" "}
                    This cautious approach qualifies you for a 10% reduction in
                    premiums.{" "}
                  </span>
                  Keep this great pace!
                </>
              ) : (
                <>
                  With an average speed of{" "}
                  <span className="text-insurify-purple">
                    {carMetrics.average_speed}
                  </span>{" "}
                  MPH, you're cruising through life's highways like a pro! While
                  you enjoy the fast lane, did you know{" "}
                  <span className="text-white">
                    reducing your average speed by just 5 MPH could lower your
                    risk of accidents and potentially reduce your insurance
                    premiums?{" "}
                  </span>
                  <br></br>
                  <br></br>
                  Boost your peace of mind with collision coverage — it's got
                  your back for repairs or replacements after any mishap!{" "}
                  <a
                    href="https://www.allstate.com/auto-insurance/collision-coverage"
                    className="text-insurify-purple"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </div>
        {/* Bottom Arrow */}
        <Link
          to="c2"
          smooth={true}
          duration={1500}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
        >
          <img
            src={BottomArrow}
            className="border-none w-8 h-6"
            data-testid="bottom-arrow"
          ></img>
        </Link>
        {/* Top Arrow */}
        <Link
          to="0"
          smooth={true}
          duration={1500}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8"
        >
          <img
            src={TopArrow}
            className="border-none w-8 h-6"
            data-testid="top-arrow"
          ></img>
        </Link>
      </div>

      <div
        id="c2"
        className="relative hero min-h-screen bg-insurify-2"
        data-testid="braking-section"
      >
        <div className="hero-content flex-col lg:flex-row">
          <h1 className="text-9xl font-bold laptop:pr-20 xs:pb-4 animate-bounce">
            🛡️
          </h1>
          <div className="max-w-4xl xs:text-center">
            <h1
              className="laptop:text-6xl xs:text-4xl font-bold"
              data-testid="brake-score-heading"
            >
              {carMetrics.braking_score <= 70
                ? "Brake Hard, Pay Hard!"
                : "Smooth Stops, Smooth Savings!"}
            </h1>
            <p
              className="text-insurify-summary-text text-2xl font-bold pt-4"
              data-testid="brake-score-description"
            >
              {carMetrics.braking_score <= 70 ? (
                <>
                  Your low braking score of{" "}
                  <span className="text-insurify-purple">
                    {carMetrics.braking_score}
                  </span>
                  points to frequent hard stops, which bumps up your risk on the
                  road—and your insurance premiums too. Smooth it out to cut
                  costs and risks. If you improve your braking score,{" "}
                  <span className="text-white">
                    you could save 5% on your premiums over the next year!
                  </span>
                </>
              ) : (
                <>
                  With a braking score of{" "}
                  <span className="text-insurify-purple">
                    {carMetrics.braking_score}
                  </span>
                  ,
                  <span className="text-white">
                    {" "}
                    you're up 15 points since last year!{" "}
                  </span>
                  Better braking = lower premiums! Keep calm, stay insured, and
                  enjoy life's adventures with peace of mind!
                </>
              )}
            </p>
          </div>
        </div>
        {/* Bottom Arrow */}
        <Link
          to="c3"
          smooth={true}
          duration={1500}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
        >
          <img
            src={BottomArrow}
            className="border-none w-8 h-6"
            data-testid="bottom-arrow"
          ></img>
        </Link>
        {/* Top Arrow */}
        <Link
          to="c1"
          smooth={true}
          duration={1500}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8"
        >
          <img
            src={TopArrow}
            className="border-none w-8 h-6"
            data-testid="top-arrow"
          ></img>
        </Link>
      </div>

      <div
        id="c3"
        className="relative hero min-h-screen bg-insurify-3"
        data-testid="miles-traveled-section"
      >
        <div className="hero-content flex-col lg:flex-row">
          <h1 className="text-9xl font-bold laptop:pr-20 xs:pb-4 animate-wiggle-more animate-infinite">
            🌟
          </h1>
          <div className="max-w-4xl xs:text-center">
            <h1 className="laptop:text-6xl xs:text-4xl font-bold">
              Miles Traveled: {carMetrics.miles_travelled}. Memories Made:
              Countless!
            </h1>
            <p
              className="text-insurify-summary-text text-2xl font-bold pt-4 xs:text-center"
              data-testid="miles-traveled-description"
            >
              Each mile contributes to your driving experience and{" "}
              <span className="text-white">
                you drove 20% more miles than last year!{" "}
              </span>
              Continue to drive with confidence, knowing that your insurance is
              there to protect the memories yet to come and the journeys ahead.
            </p>
          </div>
        </div>
        {/* Bottom Arrow */}
        {isValidMetrics(homeMetrics) && isValidMetrics(lifeMetrics) && (
          <Link
            to="h1"
            smooth={true}
            duration={1500}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
          >
            <img
              src={BottomArrow}
              className="border-none w-8 h-6"
              alt="Arrow"
              data-testid="bottom-arrow"
            ></img>
          </Link>
        )}

        {!isValidMetrics(homeMetrics) && !isValidMetrics(lifeMetrics) && (
          <Link
            to="cl1"
            smooth={true}
            duration={1500}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
          >
            <img
              src={BottomArrow}
              className="border-none w-8 h-6"
              alt="Arrow"
              data-testid="bottom-arrow"
            ></img>
          </Link>
        )}
        {/* Top Arrow */}
        <Link
          to="c2"
          smooth={true}
          duration={1500}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8"
        >
          <img
            src={TopArrow}
            className="border-none w-8 h-6"
            data-testid="top-arrow"
          ></img>
        </Link>
      </div>
    </>
  );
};

CarMetricsSection.propTypes = {
  carMetrics: PropTypes.shape({
    average_speed: PropTypes.string.isRequired,
    braking_score: PropTypes.string.isRequired,
    miles_travelled: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarMetricsSection;
