import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Images
import Umbrella from '../assets/images/view-report/Umbrella.png'

export default function ViewReportCarousel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in based on token presence
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div data-testid="view-report-carousel">
      <div data-theme="black" className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse animate-fade-down animate-delay-700">
          <img
            src= {Umbrella}
            className="laptop:max-w-xs rounded-lg shadow-2xl"
          />
          <div>
            <p className="py-6 text-insurify-green laptop:text-base xs:text-xs font-semibold">
              <span className="font-extrabold font-insurify-inter laptop:text-7xl xs:text-5xl">
                2
              </span>
              024 Insurify Year in Review is a celebration of the year gone by
              and an invitation to join in on the fun. It’s all about the
              two-way connections that bring millions of insurers and customers
              together through insurance every day. We know that no two insurers
              are alike, so 2024 Year in Review encourages you to gaze into your
              insurance policies and show it off to the world.
            </p>
            {isLoggedIn ? (
              <NavLink to="/report">
                <button className="btn laptop:btn-primary bg-insurify-purple text-white laptop:text-base xs:text-xs laptop:ml-72"
                data-testid="logged-in"
                >
                  Click here for your 2024 Year in Review
                </button>
              </NavLink>
            ) : (
              <button
                data-testid="not-logged-in"
                className="btn btn-primary bg-insurify-purple text-white ml-72"
                disabled
              >
                Click here for your 2024 Year in Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
