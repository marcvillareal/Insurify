import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../../components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Navbar component", () => {
  test("renders Navbar correctly", async () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByTestId("navbar-container")).toBeInTheDocument();
    });
  });

  test("displays login link when user is not logged in", async () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByTestId("login-link")).toBeInTheDocument();
    });
  });

  test("displays user greeting when user is logged in", async () => {
    // Set user as logged in before rendering Navbar
    localStorage.setItem("token", "fakeToken");
    render(
      <Router>
        <Navbar />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByTestId("user-greeting")).toBeInTheDocument();
    });
  });

  test("logout button calls handleLogout function", async () => {
    const removeItemSpy = jest.spyOn(
      window.localStorage.__proto__,
      "removeItem"
    );
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const logoutButton = screen.getByTestId("logout-button");
    localStorage.setItem("token", "fakeToken");
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(removeItemSpy).toHaveBeenCalledTimes(2);
    });
  });
});
