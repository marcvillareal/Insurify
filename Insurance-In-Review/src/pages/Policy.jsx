import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

// Images
import Grid from "../assets/images/general/Grid.png";

const Policy = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // Check if user is logged in based on token presence
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // Fetch user data if logged in
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  // Function to fetch user data from both deployed and local endpoints
  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const deployedUrl = `http://34.141.11.42:8080/user/get/${userId}`;
    const localUrl = `http://localhost:8080/user/get/${userId}`;

    try {
      // Create individual promises for each request
      const deployedRequest = axios
        .get(deployedUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((err) => ({ error: err }));

      const localRequest = axios
        .get(localUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((err) => ({ error: err }));

      // Wait for both requests to settle
      const [responseDeployed, responseLocal] = await Promise.all([
        deployedRequest,
        localRequest,
      ]);

      // Check which response is successful
      let userData;
      if (responseDeployed && !responseDeployed.error) {
        userData = responseDeployed.data;
        console.log("Using deployed server data:", userData);
      } else if (responseLocal && !responseLocal.error) {
        userData = responseLocal.data;
        console.log("Using local server data due to deployed server failure.");
      } else {
        throw new Error("Both requests failed to fetch user data.");
      }

      // Set user data if one of them is successful
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to handle view PDF button click event
  const handleViewPDF = () => {
    const userId = localStorage.getItem("userId");
    const deployedUrl = `http://34.141.11.42:8080/policy/get/pdf/user/${userId}`;
    const localUrl = `http://localhost:8080/policy/get/pdf/user/${userId}`;

    window.open(deployedUrl, "_blank");

    // Optionally check if the deployed URL failed and then try the local URL
    // This can be managed by monitoring the response from the server if possible
    // For simplicity and lack of direct feedback from window.open, this is just a placeholder
  };

  // Function to handle download PDF button click event
  const handleDownloadPDF = async () => {
    const userId = localStorage.getItem("userId");
    const deployedUrl = `http://34.141.11.42:8080/policy/get/pdf/user/${userId}`;
    const localUrl = `http://localhost:8080/policy/get/pdf/user/${userId}`;

    try {
      const requests = [
        axios
          .get(deployedUrl, { responseType: "blob" })
          .catch((error) => ({ error })),
        axios
          .get(localUrl, { responseType: "blob" })
          .catch((error) => ({ error })),
      ];

      const [responseDeployed, responseLocal] = await Promise.all(requests);

      let pdfBlob;
      if (responseDeployed && !responseDeployed.error) {
        pdfBlob = new Blob([responseDeployed.data], {
          type: "application/pdf",
        });
      } else if (responseLocal && !responseLocal.error) {
        pdfBlob = new Blob([responseLocal.data], { type: "application/pdf" });
      } else {
        throw new Error("Failed to download PDF from both servers.");
      }

      // Construct a file name
      const fileName = `${firstName.replace(/\s+/g, "")}-${lastName.replace(
        /\s+/g,
        ""
      )}.pdf`;

      // Create a temporary <a> element and trigger a download
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

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
        <div className="hero-overlay bg-opacity-5" />
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="laptop:text-7xl xs:text-4xl mobile:text-3xl font-bold text-insurify-purple">
                Your <span className="text-insurify-grey">Policy</span>
              </h1>
              <p className="py-6 text-insurify-grey laptop:text-xl xs:text-md mobile:text-sm font-bold w-full animate-fade-down">
                Welcome {firstName}! To show your current insurance policy
                please click the download PDF button below or print it directly
                to your local printer.
              </p>
              <div className="max-w-lg flex justify-center items-center laptop:ml-8">
                <button
                  className="btn laptop:btn-md mobile:btn-sm bg-insurify-purple text-white font-extrabold rounded-box mr-4 w-40"
                  onClick={handleViewPDF} // Attach click event handler
                >
                  View PDF
                </button>
                <button
                  className="btn laptop:btn-md mobile:btn-sm bg-insurify-dark text-white font-extrabold rounded-box ml-4 w-40"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </button>
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
              <div className="max-w-screen-lg">
                <h1 className="laptop:text-5xl xs:text-3xl mobile:text-2xl font-bold text-insurify-grey pt-20">
                  Policy Overview
                </h1>
                <p className="text-insurify-grey text-opacity-60 laptop:text-3xl mobile:text-sm xs:text-base pb-14 pt-10">
                  In your policy document, you can expect to see a comprehensive
                  summary of all your insurance policies. This document outlines
                  the types of of coverage you have, including detailed
                  information of everything involved within each policy.
                  Instructions on how to make changes to your policies or make
                  claims, along with making changes to payment schedules if you
                  think you need to. Contact information is also provided so
                  that you can reach out and get in a call to explain any
                  concerns or questions needing answers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
