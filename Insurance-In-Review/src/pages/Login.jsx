import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Images
import LoginImage from "../assets/images/login/LoginImage.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    const deployedUrl = "http://34.141.11.42:8080/login";
    const localUrl = "http://localhost:8080/login";

    try {
      // Handle promises individually to ensure both are attempted
      const requests = [
        axios
          .post(deployedUrl, { email, password })
          .catch((error) => ({ error })),
        axios.post(localUrl, { email, password }).catch((error) => ({ error })),
      ];

      const [responseDeployed, responseLocal] = await Promise.all(requests);

      // Check which response is successful
      let responseData;
      if (responseDeployed && !responseDeployed.error) {
        responseData = responseDeployed.data;
      } else if (responseLocal && !responseLocal.error) {
        responseData = responseLocal.data;
      } else {
        // If both requests fail, throw an error
        throw new Error("Login attempt failed. Please try again.");
      }

      // Proceed with login if one of them is successful
      localStorage.setItem("token", responseData.access_token);
      localStorage.setItem("userId", responseData.user.user_id);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
      setPasswordError("Incorrect email or password.");
      if (error.response && error.response.status === 500) {
        setPasswordError("Incorrect email or password.");
      }
    }
  };

  return (
    <div className="hero min-h-screen flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-insurify-login-background">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-64 w-auto" src={LoginImage} alt="Insurify" />
        <h2 className="mt-14 text-center text-5xl font-bold leading-9 tracking-tight text-insurify-grey-2">
          Log in to Insurify
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-insurify-grey-2"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 bg-insurify-input text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  emailError && "border-red-500"
                }`}
              />
              {emailError && (
                <p className="text-red text-sm mt-1">{emailError}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-insurify-grey-2"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="https://myaccountrwd.allstate.com/anon/account/recover/ForgotPassword"
                  className="font-light text-insurify-grey-2 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 bg-insurify-input text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  passwordError && "border-red-500"
                }`}
              />
              {passwordError && (
                <p className="text-red text-sm mt-1">{passwordError}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-insurify-purple px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              SIGN IN
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-insurify-grey-2">
          Don't have an account?{" "}
          <a
            href="https://myaccountrwd.allstate.com/anon/registration/user-identification?intcid=%2Fhome%2Fhome%7CNavigationHeader%7CRegisterNewAccount"
            className="font-light leading-6 text-insurify-purple hover:text-indigo-500"
          >
            register here
          </a>
        </p>
      </div>
    </div>
  );
}
