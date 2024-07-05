import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ViewReportCarousel from "../../components/ViewReportCarousel";

describe("ViewReportCarousel component", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(
      <Router>
        <ViewReportCarousel />
      </Router>
    );
    const viewReportCarousel = getByTestId("view-report-carousel");

    expect(viewReportCarousel).toBeInTheDocument();
  });

  test("button is clickable when user is logged in", async () => {
    // Simulate logged in state
    localStorage.setItem("token", "fakeToken");

    render(
      <Router>
        <ViewReportCarousel />
      </Router>
    );

    await waitFor(() => {
      // Assert button is clickable when logged in
      expect(
        screen.getByText(/Click here for your 2024 Year in Review/i)
      ).toBeEnabled();
    });
  });

  test("button is not clickable when user is not logged in", async () => {
    // Simulate logged out state
    localStorage.removeItem("token");

    render(
      <Router>
        <ViewReportCarousel />
      </Router>
    );

    await waitFor(() => {
      // Assert button is not clickable when logged out
      expect(
        screen.getByText(/Click here for your 2024 Year in Review/i)
      ).toBeDisabled();
    });
  });
});
