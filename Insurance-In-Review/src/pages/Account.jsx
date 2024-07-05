import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

import UserIcon from "../assets/images/general/UserIcon.png";

const Account = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmail] = useState("");

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      // If not logged in, navigate to login page
      navigate("/login");
    } else {
      // If logged in, set isLoggedIn to true
      setIsLoggedIn(true);
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch user data if logged in
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/user/get/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const userData = response.data;
        console.log("User data:", userData);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // Navigate to login page
    navigate("/login");
    // Reload window
    window.location.reload();
  };

  return (
    <div>
      {isLoggedIn && (
        <div
          // Top Carousel
          className="hero laptop:min-h-screen flex flex-col items-center justify-end bg-white"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-10" />
          <div className="hero laptop:min-h-screen flex justify-center items-start">
            <div className="max-w-full w-full">
              <div className="laptop:my-20 max-w-full laptop:mx-32 xs:mx-5 flex justify-between items-center border-b border-insurify-grey-2">
                <h1 className="mr-2 laptop:text-3xl mobile:text-xl font-bold">
                  <span className="text-insurify-grey">Insurify Account</span>
                </h1>
                <button
                  className="md:btn btn-md xs:btn-xs bg-insurify-purple text-white font-extrabold rounded-box ml-54 w-40 relative mobile:mb-1 mobile:bg-insurify-purple mobile:text-white"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  Logout
                </button>
              </div>
              <div className="laptop:hero laptop:flex laptop:w-full laptop:min-h-screen">
                <div className="laptop:w-1/6 laptop:min-h-screen laptop:ml-32 laptop:border-r-2 laptop:border-insurify-grey-2 laptop:border-b-0 xs:w-full xs:border-b xs: border-insurify-grey-2">
                  <nav className="laptop:h-screen w-full flex flex-col justify-between xs:text-center">
                    <div className="laptop:text-left xs:max-w-full">
                      <img
                        src= {UserIcon}
                        alt="User Icon"
                        className="rounded-full laptop:h-28 laptop:w-28 laptop:block mobile:h-10 mobile:w-10 mobile:hidden"
                      />
                      <br />
                      <span
                        data-testid="user-fullname"
                        className="laptop:text-2xl xs:text-xl text-insurify-grey font-bold"
                      >
                        {firstName} {lastName}
                      </span>
                      <br />
                      <span
                        data-testid="user-email"
                        className="laptop:text-md xs:text-lg text-insurify-grey-2 font-bold"
                      >
                        {emailAddress}
                      </span>
                      <a
                        href="#"
                        className="flex laptop:items-left laptop:py-10 xs:py-5 laptop:text-2xl xs:text-base text-insurify-grey-2 font-bold hover:text-insurify-purple xs:flex-col"
                      >
                        Personal Information
                      </a>
                      <NavLink
                        to="https://myaccountrwd.allstate.com/anon/account/recover/options?intcid=%2Fhome%2Fhome%7CNavigationHeader%7CForgotPassword"
                        className="flex items-left laptop:text-2xl xs:text-base text-insurify-grey-2 font-bold hover:text-insurify-purple xs:flex-col xs:mb-5"
                      >
                        Reset Password
                      </NavLink>
                    </div>
                  </nav>
                </div>

                <div className="laptop:w-5/6 laptop:h-screen text-insurify-grey-2 xs: mt-10 xs:justify-center">
                  {/* Personal Information box */}
                  <div className="flex flex-col px-5 laptop:text-left laptop:mr-28 xs:text-center">
                    <div className="laptop:min-w-screen xs:max-w-full">
                      <h1 className="mr-2 laptop:text-3xl xs:text-xl font-bold">
                        <span className="text-insurify-grey">
                          Personal Information
                        </span>
                      </h1>
                      <h2 className="mr-2 laptop:text-xl xs:text-xs font-bold mt-5 mobile:text-lg">
                        <span className="text-insurify-grey-2">
                          Manage your personal information, including your phone
                          numbers and email address where you can be contacted.
                        </span>
                      </h2>
                    </div>
                  </div>

                  {/* Top Grids */}
                  <div className="xs:pb-20">
                    <div className="flex flex-col px-5 text-left laptop:mr-28 mt-12 xs:justify-center ">
                      <div className="min-w-screen flex">
                        {/* Name Box */}
                        <div className="xs:flex-grow w-1/3">
                          <div className="grid min-h-20 flex-grow card bg-white rounded-box place-items-start border border-l-insurify-dark">
                            <div className="p-4">
                              <h1 className="laptop:text-2xl xs:text-xs text-insurify-grey font-bold text-left">
                                Name
                              </h1>
                              <br />
                              <p className="text-left laptop:text-2xl mobile:text-xs">
                                <span className="text-left">
                                  {firstName} {lastName}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        {/* Contact Information box */}
                        <div className="flex-grow w-1/3">
                          <div className="grid min-h-20 flex-grow card bg-white rounded-box place-items-start border border-l-insurify-dark">
                            <div className="flex-grow p-4">
                              <h1 className="laptop:text-2xl xs:text-xs text-insurify-grey font-bold text-left">
                                Contact Details
                              </h1>
                              <br />
                              <p className="text-left laptop:text-2xl mobile:text-xs">
                                {emailAddress}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Grids */}
                    <div className="flex flex-col px-5 text-left laptop:mr-28 mt-12">
                      <div className="min-w-screen flex">
                        {/*Co */}
                        <div className="flex-grow w-1/3">
                          <div className="grid min-h-20 flex-grow card bg-white rounded-box place-items-start border border-l-insurify-dark">
                            <div className="flex-grow p-4">
                              <h1 className="laptop:text-2xl xs:text-xs text-insurify-grey font-bold text-left">
                                Country/Region
                              </h1>
                              <br />
                              <p className="text-left laptop:text-2xl mobile:text-xs">
                                United Kingdom
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex-grow w-1/3">
                          <div className="grid min-h-20 flex-grow card bg-white rounded-box place-items-start border border-l-insurify-dark">
                            <div className="p-4">
                              <h1 className="laptop:text-2xl xs:text-xs text-insurify-grey font-bold text-left">
                                Language
                              </h1>
                              <br />
                              <p className="text-left laptop:text-2xl mobile:text-xs">
                                English
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
