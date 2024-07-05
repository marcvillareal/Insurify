import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RenewalSection from "../../components/RenewalSection";

describe("RenewalSection", () => {
  const userPolicy = {
    end_date: "2024-04-30",
    product: {
      discount: "10%",
    },
  };

  test("renders without crashing", () => {
    render(<RenewalSection userPolicy={userPolicy} />);
    expect(screen.getByTestId("renewal-section")).toBeInTheDocument();
  });

  test("displays correct heading", () => {
    render(<RenewalSection userPolicy={userPolicy} />);
    expect(screen.getByTestId("renewal-heading")).toBeInTheDocument();
    expect(screen.getByTestId("renewal-heading")).toHaveTextContent(
      "Thanks for a Great Year!"
    );
  });

  test("displays correct description", () => {
    render(<RenewalSection userPolicy={userPolicy} />);
    expect(screen.getByTestId("renewal-description")).toBeInTheDocument();
    expect(screen.getByTestId("renewal-description")).toHaveTextContent(
      "Your policy ends in"
    );
    expect(screen.getByTestId("discount-text")).toBeInTheDocument();
    expect(screen.getByTestId("discount-text")).toHaveTextContent(
      "save 10% on your next premium"
    );
  });

  test("displays renewal button", () => {
    render(<RenewalSection userPolicy={userPolicy} />);
    expect(screen.getByTestId("renewal-button")).toBeInTheDocument();
    expect(screen.getByTestId("renewal-button")).toHaveTextContent("Renew Now");
  });

  test("displays scroll to top arrow", () => {
    render(<RenewalSection userPolicy={userPolicy} />);
    expect(screen.getByTestId("scroll-to-top")).toBeInTheDocument();
  });

  test("displays top arrow", () => {
    render(<RenewalSection userPolicy={userPolicy} />);
    expect(screen.getByTestId("top-arrow")).toBeInTheDocument();
  });
});
