import React from "react";
import { Link } from "react-scroll";

// Images
import ScrollToTop from '../assets/images/report/ScrollToTop.png';
import TopArrow from '../assets/images/report/Arrow2.png'

const RenewalSection = ({ userPolicy }) => {
  const policyEndDate = new Date(userPolicy.end_date);
  const today = new Date();
  const timeDifference = policyEndDate.getTime() - today.getTime();
  const daysUntilRenewal = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return (
    <>
      <div
        id="r1"
        className="relative hero min-h-screen bg-insurify-4"
        data-testid="renewal-section"
      >
        <div className="hero-content flex-col lg:flex-row">
          <h1 className="text-9xl font-bold laptop:pr-20 xs:pb-4 animate-wiggle animate-infinite">
            📆
          </h1>
          <div className="max-w-3xl mobile:text-center">
            <h1
              className="laptop:text-6xl xs:text-4xl font-bold"
              data-testid="renewal-heading"
            >
              Thanks for a Great Year!
            </h1>
            <p
              className="text-insurify-summary-text text-2xl font-bold pt-4"
              data-testid="renewal-description"
            >
              Your policy ends in{" "}
              <span className="text-insurify-purple text-5xl">
                {daysUntilRenewal}
              </span>{" "}
              days!
              <br></br>
              Ready for more? Secure another year of exceptional care and renew
              today to{" "}
              <span className="text-white" data-testid="discount-text">
                save {userPolicy.product.discount} on your next premium
              </span>
              . Don't miss out on continuous coverage and savings!
            </p>
            {/* This could be a button that starts the renewal process */}
            <a
              href="https://www.allstate.com/help-support/billing-payments"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="mt-4 bg-insurify-purple text-white font-bold py-2 px-4 rounded-box mobile:ml-0 tablet:ml-0"
                data-testid="renewal-button"
              >
                Renew Now
              </button>
            </a>
          </div>
        </div>
        {/* Navigation arrows as needed */}
        <Link
          to="0"
          smooth={true}
          duration={1500}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
        >
          <img
            src= {ScrollToTop}
            className="border-none w-18 h-8 animate-bounce"
            data-testid="scroll-to-top"
          ></img>
        </Link>
        <Link
          to="cl1"
          smooth={true}
          duration={1500}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8"
        >
          <img
            src= {TopArrow}
            className="border-none w-8 h-6"
            data-testid="top-arrow"
          ></img>
        </Link>
      </div>
    </>
  );
};

export default RenewalSection;
