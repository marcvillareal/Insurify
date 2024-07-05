import { Link } from "react-scroll";
import React from "react";

// Images
import FAQcircle from "../assets/images/help/FAQcircle.png";
import Accountcircle from "../assets/images/help/Accountcircle.png";
import Privacycircle from "../assets/images/help/Privacycircle.png";
import Contactcircle from "../assets/images/help/Contactcircle.png";
import Grid from "../assets/images/general/Grid.png";

function AccountContent({ title, items }) {
  return (
    <div className="w-1/2">
      <h1 className="mr-2 laptop:text-4xl mobile:text-xl font-bold text-center mb-5">
        <span className="text-insurify-purple">{title}</span>
      </h1>
      <div className="flex min-h-20 flex-grow card bg-white rounded-box place-items-center border border-l-insurify-dark w-full overflow-auto">
        <div className="p-4">
          {items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>  
      </div>
    </div>
  );
}

function PrivacyContent({ title, items }) {
  return (
    <div className="w-1/3">
      <h1 className="mr-2 laptop:text-4xl mobile:text-xl font-bold text-center mb-5 mobile:pt-4">
        <span className="text-insurify-purple">{title}</span>
      </h1>
      <div className="grid min-h-20 flex-grow card bg-white rounded-box place-items-center border border-l-insurify-dark">
        <div className="p-4">
          <ul className="list-disc text-center laptop:text-3xl mobile:text-xs ml-6">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Help = () => {
  const faqData = [
    {
      question: "Why do I need a 'Year in Review'?",
      answer:
        "The 'Year in Review' is feature to give you an insight into your coverage in an easy to understand and creative summary page.",
    },
    {
      question: "How often is the Review updated?",
      answer:
        "It is updated annually, gathering new data each year to display in your review.",
    },
    {
      question: "How can I access my Review?",
      answer:
        "You can access your 'Year in Review' by clicking the icon saying '2024 Review'.",
    },
    {
      question: "Can I share my review with an advisor?",
      answer:
        "Of course, your advisor can help you make informed decisions about your insurance planning with the information provided.",
    },
    {
      question: "Can other users see my Review?",
      answer:
        "No, only authorized personnel and yourself have access to your review and data.",
    },
    {
      question: "How can I use my Review?",
      answer:
        "Your review serves as a valuable tool for evaluating your insurance needs and understanding your coverage usage allowing you to make informed decisions on your current policies.",
    },
  ];

  const accountItems = [
    <p className="text-center laptop:text-3xl mobile:text-xs">
      No worries! Resetting your password is very easy.
    </p>,
    <p className="text-center laptop:text-3xl mobile:text-xs">
      Just click{" "}
      <a
        href="https://myaccountrwd.allstate.com/anon/account/recover"
        className="text-insurify-grey italic font-bold"
      >
        here
      </a>{" "}
      and you will be taken to the ‘Reset Password’ page where you will be shown
      how to reset/change your password.
    </p>,
    <p className="text-center laptop:text-3xl mobile:text-xs">
      Accessing your account to view your details can be done by clicking the
      small user icon that you see on the top right corner beside your name.
    </p>,
    <p className="text-center laptop:text-3xl mobile:text-xs">
      You can click{" "}
      <a href="/account" className="text-insurify-grey italic font-bold">
        here
      </a>{" "}
      to take you there!
    </p>,
  ];

  const privacyItems = [
    "We employ robust security measures to protect your data",
    "Use encryption to safeguard your data",
    "Access to data strictly controlled by authorized personnel",
  ];

  const dataUsageItems = [
    "To display statistics based off your current policies, creating an informative and simple review",
    "Gather data to offer tailored recommendations and pricing options",
  ];

  const dataTypesItems = [
    "Insurance history like previous claims and coverage etc.",
    "Demographic information to better understand our customer base and tailor our services accordingly.",
  ];

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
        <div className="justify-center items-start laptop:h-screen w-screen">
          <div className="hero-content text-center my-40 max-w-full">
            <div className="max-w-full">
              <h1 className="mr-2 laptop:text-7xl mobile:text-5xl font-bold">
                <span className="text-insurify-purple">Help </span>
                <span className="text-insurify-grey">Centre</span>
              </h1>
              <h2 className="mr-2 laptop:text-5xl mobile:text-3xl font-bold mt-10">
                <span className="text-insurify-grey">How can we help you?</span>
              </h2>
              <div className="laptop:flex justify-center mobile:grid grid-cols-2 mobile:mt-6 laptop:space-x-4 laptop:mt-20">
                <Link to="FAQ" smooth={true}>
                  <button className="mobile:h-20">
                    <img
                      src={FAQcircle}
                      alt="FAQ circle"
                      className="rounded-full laptop:h-52 laptop:w-52 mobile:h-32 mobile:w-32 animate-fade-down animate-delay"
                    />
                  </button>
                </Link>
                <Link to="Account" smooth={true}>
                  <button>
                    <img
                      src={Accountcircle}
                      alt="Account circle"
                      className="rounded-full laptop:h-52 laptop:w-52 mobile:h-32 mobile:w-32 animate-fade-down animate-delay-300"
                    />
                  </button>
                </Link>
                <Link to="Privacy" smooth={true}>
                  <button>
                    <img
                      src={Privacycircle}
                      alt="Privacy circle"
                      className="rounded-full laptop:h-52 laptop:w-52 mobile:h-32 mobile:w-32 animate-fade-down animate-delay-500"
                    />
                  </button>
                </Link>
                <Link to="Contact" smooth={true}>
                  <button>
                    <img
                      src={Contactcircle}
                      alt="Contact circle"
                      className="rounded-full laptop:h-52 laptop:w-52 mobile:h-32 mobile:w-32 animate-fade-down animate-delay-700"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="FAQ"
        // 2nd Carousel
        className="hero min-h-screen relative"
        style={{
          backgroundImage: `url(${Grid}), linear-gradient(0deg, rgba(94, 23, 235, 0.9), #ffffff 50%)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        data-testid="faq-section"
      >
        <div className="hero-overlay bg-opacity-10" />
        <div className="justify-center items-start laptop:h-screen w-screen">
          <div className="hero-content text-center my-12 max-w-full">
            <div className="max-w-full">
              <h1 className="mr-2 laptop:text-5xl mobile:text-3xl font-bold">
                <span className="text-insurify-grey">FAQ's</span>
              </h1>
              <h2 className="mr-2 laptop:text-3xl font-bold mt-5 mobile:text-xl">
                <span className="text-insurify-grey-2">
                  Here are some frequently asked questions about Insurify.
                </span>
              </h2>
            </div>
          </div>
          <div className="flex justify-center text-insurify-grey-2">
            <div className="flex w-11/12">
              <div className="grid grid-cols-3 gap-4">
                {faqData.map((faqItem, index) => (
                  <div key={index} className="w-full">
                    <div
                      tabIndex={0}
                      className="collapse collapse-arrow border bg-insurify-grey"
                    >
                      <div className="collapse-title laptop:text-4xl mobile:text-xs font-bold text-white">
                        {faqItem.question}
                      </div>
                      <div className="collapse-content laptop:text-3xl mobile:text-xs text-insurify-grey-2">
                        <p>{faqItem.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="Account"
        // 3rd Carousel
        className="hero min-h-screen relative"
        style={{
          backgroundImage: `url(${Grid}), linear-gradient(0deg, rgba(94, 23, 235, 0.9), #ffffff 50%)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        data-testid="account-section"
      >
        <div className="hero-overlay bg-opacity-10" />
        <div className="justify-center items-start laptop:h-screen w-screen">
          <div className="hero-content text-center my-12 max-w-full">
            <div className="max-w-full">
              <h1 className="mr-2 laptop:text-5xl mobile:text-3xl font-bold">
                <span className="text-insurify-grey">Account</span>
              </h1>
              <h2 className="mr-2 laptop:text-3xl mobile:text-xl font-bold mt-5">
                <span className="text-insurify-grey-2">
                  Here are some general account queries that most users need.
                </span>
              </h2>
            </div>
          </div>
          <div className="flex justify-center text-insurify-grey-2">
            <div className="flex w-11/12">
              <AccountContent
                title="Forgotten Password?"
                items={accountItems.slice(0, 2)}
              />
              <div className="divider divider-horizontal"></div>
              <AccountContent
                title="Accessing Account"
                items={accountItems.slice(2, 4)}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="Privacy"
        // 4th Carousel
        className="hero min-h-screen relative"
        style={{
          backgroundImage: `url(${Grid}), linear-gradient(0deg, rgba(94, 23, 235, 0.9), #ffffff 50%)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        data-testid="privacy-section"
      >
        <div className="hero min-h-screen relative">
          <div className="hero-overlay bg-opacity-10" />
          <div className="justify-center items-start laptop:h-screen w-screen">
            <div className="hero-content text-center my-12 max-w-full">
              <div className="max-w-full">
                <h1 className="mr-2 laptop:text-5xl mobile:text-3xl font-bold">
                  <span className="text-insurify-grey">Privacy</span>
                </h1>
                <h2 className="mr-2 laptop:text-3xl mobile:text-xl font-bold mt-5">
                  <span className="text-insurify-grey-2">
                    At Insurify, here is how we protect your data and respect
                    your privacy.
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex justify-center text-insurify-grey-2">
              <div className="flex w-11/12 items-center mobile:flex-col laptop:flex-row">
                <PrivacyContent title="Security of Data" items={privacyItems} />
                <div className="divider divider-horizontal"></div>
                <PrivacyContent
                  title="How we use your Data"
                  items={dataUsageItems}
                />
                <div className="divider divider-horizontal"></div>
                <PrivacyContent
                  title="Types of Data we use"
                  items={dataTypesItems}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="Contact"
        // 4th Carousel
        className="hero min-h-screen relative"
        style={{
          backgroundImage: `url(${Grid}), linear-gradient(0deg, rgba(94, 23, 235, 0.9), #ffffff 50%)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        data-testid="contact-section"
      >
        <div className="hero-overlay bg-opacity-10" />
        <div className="justify-center items-start laptop:h-screen w-screen">
          <div className="hero-content text-center py-12 max-w-full">
            <div className="max-w-full">
              <h1 className="mr-2 laptop:text-5xl mobile:text-3xl font-bold">
                <span className="text-insurify-grey">Contact Us</span>
              </h1>
              <h2 className="mr-2 laptop:text-3xl mobile:text-xl font-bold mt-12">
                <span className="text-insurify-grey-2">
                  Couldn’t find the answers you were looking for?
                </span>
                <br></br>
                <span className="text-insurify-grey-2">
                  Contact us directly using whichever option suits you best!
                </span>
              </h2>
              <div className="flex flex-nowrap justify-center max-w-screen-1600 mt-16">
                <div className="laptop:text-4xl mobile:text-xl font-bold text-justify-center mr-20">
                  <span className="font-bold text-insurify-purple">Phone</span>
                  <span className="laptop:text-3xl mobile:text-sm font-bold text-insurify-grey">
                    <p>(+44) 7653577890</p>
                  </span>
                </div>
                <div className="laptop:text-4xl mobile:text-xl font-bold text-justify-center">
                  <span className="font-bold text-insurify-purple">Email</span>
                  <span className="laptop:text-3xl mobile:text-sm text-insurify-grey">
                    <p>info@insurify.ie</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
