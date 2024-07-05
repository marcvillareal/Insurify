import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-scroll";

// Images
import BackButton from "../assets/images/report/BackButton.png";
import InsurifyLogo from "../assets/images/general/InsurifyLogo.png";
import ScrollDown from "../assets/images/report/ScrollDown.png";
import TwentyFour from "../assets/images/general/24.png";

// Metrics
import CarMetricsSection from "../components/CarMetricsSection";
import HomeMetricsSection from "../components/HomeMetricsSection";
import LifeMetricsSection from "../components/LifeMetricsSection";
// Claims
import ClaimsSection from "../components/ClaimsSection";
import RenewalSection from "../components/RenewalSection";

export default function Report() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [carMetrics, setCarMetrics] = useState(null);
  const [homeMetrics, setHomeMetrics] = useState(null);
  const [lifeMetrics, setLifeMetrics] = useState(null);
  const [claims, setClaims] = useState(null);
  const [userPolicy, setUserPolicy] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setIsLoggedIn(true);
      const userId = localStorage.getItem("userId");
      const headers = { Authorization: `Bearer ${token}` };

      // URLs for the deployed and local servers
      const deployedBaseUrl = "http://34.141.11.42:8080";
      const localBaseUrl = "http://localhost:8080";

      // Define requests with individual catch to prevent one failure from blocking others
      const requests = [
        axios
          .get(`${deployedBaseUrl}/metrics/get/user/${userId}`, { headers })
          .catch((err) => ({ error: err })),
        axios
          .get(`${localBaseUrl}/metrics/get/user/${userId}`, { headers })
          .catch((err) => ({ error: err })),
        axios
          .get(`${deployedBaseUrl}/policy/get/user/${userId}`, { headers })
          .catch((err) => ({ error: err })),
        axios
          .get(`${localBaseUrl}/policy/get/user/${userId}`, { headers })
          .catch((err) => ({ error: err })),
        axios
          .get(`${deployedBaseUrl}/claims/get/user/${userId}`, { headers })
          .catch((err) => ({ error: err })),
        axios
          .get(`${localBaseUrl}/claims/get/user/${userId}`, { headers })
          .catch((err) => ({ error: err })),
      ];

      const results = await Promise.all(requests);

      // Check each response and use the first successful one for each type of data
      const metricResponse = results[0].error ? results[1] : results[0];
      const policyResponse = results[2].error ? results[3] : results[2];
      const claimsResponse = results[4].error ? results[5] : results[4];

      if (metricResponse && !metricResponse.error) {
        const metricsData = metricResponse.data;
        setCarMetrics(metricsData.car_metrics);
        setHomeMetrics(metricsData.home_metrics);
        setLifeMetrics(metricsData.life_metrics);
      }

      if (policyResponse && !policyResponse.error) {
        const policyData = policyResponse.data;
        setUserPolicy(policyData);
      }

      if (claimsResponse && !claimsResponse.error) {
        const claimsData = claimsResponse.data;
        setClaims(claimsData);
      }
    };
    
    fetchData();

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = isLoggedIn ? "hidden" : "unset";
  }, [isLoggedIn]);

  const hasValidMetrics = (metrics) => {
    return metrics && Object.values(metrics).every((value) => value !== null);
  };

  const firstSection = hasValidMetrics(carMetrics)
    ? "c1"
    : hasValidMetrics(homeMetrics)
    ? "h1"
    : hasValidMetrics(lifeMetrics)
    ? "l1"
    : null;

  const lastSection = hasValidMetrics(lifeMetrics)
    ? "l1"
    : hasValidMetrics(homeMetrics)
    ? "h2"
    : hasValidMetrics(carMetrics)
    ? "c3"
    : null;

  return (
    <>
      {isLoggedIn && firstSection && (
        <div
          id="0"
          data-theme="black"
          className="hero min-h-full relative overflow-hidden"
        >
          <div className="absolute top-10 left-10">
            <button onClick={() => navigate(-1)}>
              <img src={BackButton} alt="Back_Button" className="w-auto h-8" />
            </button>
          </div>
          <div
            className="hero min-h-screen flex flex-col items-center justify-end mobile:invisible laptop:visible"
            style={{
              backgroundImage: `url(${TwentyFour})`,
              backgroundSize: "50%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom",
            }}
          />
          <div
            className="hero min-h-screen flex flex-col items-center justify-end mobile:visible laptop:invisible mobile:pb-20"
            style={{
              backgroundImage: `url(${TwentyFour})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <div className="hero-content text-center relative z-10">
            <div className="animate-fade-down animate-ease-linear max-w-max mb-20">
              <div className="flex items-center justify-center text-insurify-purple pb-20">
                {" "}
                <img
                  className="tablet:h-8 mobile:h-8 mdlg:h-8"
                  src={InsurifyLogo}
                  alt="Insurify_Logo"
                />
                <h1 className="font-bold tablet:text-3xl mobile:text-2xl mdlg:text-3xl ml-2 mr-4">
                  Insurify<span className="text-sm pt-6">®</span>
                </h1>
              </div>
              <div className="">
                <h1 className="laptop:text-4xl xs:text-3xl mobile:text-2xl text-insurify-purple font-extrabold relative z-10 pb-2">
                  Let's Review your
                </h1>
                <h1 className="laptop:text-8xl xs:text-7xl mobile:text-5xl text-insurify-grey-2 font-extrabold relative z-10">
                  2024
                </h1>
                <h1 className="laptop:text-5xl xs:text-4xl mobile:text-2xl text-white font-extrabold relative z-10">
                  Year in Review
                </h1>
                <h1 className="laptop:text-5xl xs:text-4xl mobile:text-2xl text-white font-extrabold relative z-10">
                  Report
                </h1>
              </div>
            </div>
          </div>
          {/* Absolute positioning to place the arrow at the bottom-middle */}
          <Link
            to={firstSection}
            smooth={true}
            duration={1500}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-16"
          >
            <img
              src={ScrollDown}
              className="border-none laptop:max-w-max mobile:max-w-screen-mobile h-12 animate-fade animate-infinite animate-ease-in-out animate-alternate-reverse animate-fill-backwards"
            ></img>
          </Link>
        </div>
      )}

      {/* Sections */}
      {hasValidMetrics(carMetrics) && (
        <CarMetricsSection
          carMetrics={carMetrics}
          homeMetrics={homeMetrics}
          lifeMetrics={lifeMetrics}
        />
      )}
      {hasValidMetrics(homeMetrics) && (
        <HomeMetricsSection
          homeMetrics={homeMetrics}
          carMetrics={carMetrics}
          lifeMetrics={lifeMetrics}
        />
      )}
      {hasValidMetrics(lifeMetrics) && (
        <LifeMetricsSection
          lifeMetrics={lifeMetrics}
          homeMetrics={homeMetrics}
          carMetrics={carMetrics}
        />
      )}
      {claims && <ClaimsSection claims={claims} lastSection={lastSection} />}
      {userPolicy && <RenewalSection userPolicy={userPolicy} />}

      {/* Background Animation */}
      <ul className="circles" style={{ zIndex: 100, pointerEvents: "none" }}>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </>
  );
}
