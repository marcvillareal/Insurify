import React from "react";
import { Link } from "react-scroll";

// Images
import BottomArrow from '../assets/images/report/Arrow.png'
import TopArrow from '../assets/images/report/Arrow2.png'

const LifeMetricsSection = ({ lifeMetrics, carMetrics, homeMetrics }) => {
  const isValidMetrics = (metrics) => {
    return metrics && Object.values(metrics).every((value) => value !== null);
  };
  const lastCheckup = new Date(lifeMetrics.last_medical_checkup);
  const today = new Date();
  const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
  return (
    <>
      <div
        id="l1"
        className="relative hero min-h-screen bg-insurify-3"
        data-testid="life-metrics-section"
      >
        <div className="hero-content flex-col lg:flex-row">
          <h1 className="text-9xl font-bold laptop:pr-20 xs:pb-4 animate-pulse animate-infinite">
            {lifeMetrics.smoker === "Yes" ? "🍎" : "🚭"}
          </h1>
          <div className="max-w-3xl mobile:text-center">
            <h1
              className="laptop:text-6xl xs:text-4xl font-bold"
              data-testid="smoke-free-heading"
            >
              {lifeMetrics.smoker === "No"
                ? "Smoke-Free and Lovin' It!"
                : lastCheckup >= oneYearAgo
                ? "Healthy, Wealthy, and Wise: Secured for Life!"
                : "Check-Up Reminder!"}
            </h1>
            <p
              className="text-insurify-summary-text text-2xl font-bold pt-4"
              data-testid="smoke-free-description"
            >
              {lifeMetrics.smoker === "No" ? (
                <>
                  Saying no to smoking means saying yes to a healthier, happier
                  life.{" "}
                  <span className="text-white">
                    {" "}
                    On average, non-smokers save 20% on their life insurance!{" "}
                  </span>
                  Keep breathing easy and enjoy the benefits of being
                  smoke-free, both for your health and your wallet!
                  {lastCheckup >= oneYearAgo && (
                    <span className="text-white" data-testid="discount-text">
                      {" "}
                      you've earned a 10% discount on your next premium.
                    </span>
                  )}
                </>
              ) : lastCheckup >= oneYearAgo ? (
                <>
                  You had your last health check less than a year ago! Well done
                  on keeping up to date with yourself,{" "}
                  <span className="text-white" data-testid="discount-text">
                    you've earned a 10% discount on your next premium.
                  </span>{" "}
                  Stay health-smart!
                </>
              ) : (
                <>
                  Over a year since your last health check? Schedule now to{" "}
                  <span className="text-white">
                    secure up to 10% off your premiums.
                  </span>{" "}
                  Your health is your wealth!
                </>
              )}
            </p>
          </div>
        </div>
        {/* Bottom Arrow */}
        <Link
          to="cl1"
          smooth={true}
          duration={1500}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
          data-testid="bottom-arrow-l1"
        >
          <img
            src= {BottomArrow}
            className="border-none w-8 h-6"
            alt="Bottom Arrow"
          />
        </Link>
        {/* Top Arrow */}
        {isValidMetrics(carMetrics) && isValidMetrics(homeMetrics) && (
          <Link
            to="h2"
            smooth={true}
            duration={1500}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8"
            data-testid="top-arrow-l1"
          >
            <img
              src= {TopArrow}
              className="border-none w-8 h-6"
              alt="Top Arrow"
            />
          </Link>
        )}

        {!isValidMetrics(carMetrics) && !isValidMetrics(homeMetrics) && (
          <Link
            to="0"
            smooth={true}
            duration={1500}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8"
            data-testid="top-arrow-l1"
          >
            <img
              src= {TopArrow}
              className="border-none w-8 h-6"
              alt="Top Arrow"
            />
          </Link>
        )}
      </div>
    </>
  );
};

export default LifeMetricsSection;
