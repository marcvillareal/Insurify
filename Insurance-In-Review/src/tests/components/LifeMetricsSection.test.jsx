import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LifeMetricsSection from "../../components/LifeMetricsSection";

describe("LifeMetricsSection", () => {
  const lifeMetrics = {
    smoker: "No",
    last_medical_checkup: "2023-01-15",
  };

  const carMetrics = {};
  const homeMetrics = {};

  test("renders without crashing", () => {
    render(
      <LifeMetricsSection
        lifeMetrics={lifeMetrics}
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
      />
    );
    expect(screen.getByTestId("life-metrics-section")).toBeInTheDocument();
  });

  test("displays correct text based on smoker status", () => {
    render(
      <LifeMetricsSection
        lifeMetrics={lifeMetrics}
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
      />
    );
    expect(screen.getByTestId("smoke-free-heading")).toBeInTheDocument();
    expect(screen.getByTestId("smoke-free-description")).toBeInTheDocument();
  });

  test("displays correct heading based on smoker status", () => {
    render(
      <LifeMetricsSection
        lifeMetrics={lifeMetrics}
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
      />
    );

    const heading = screen.getByTestId("smoke-free-heading");

    expect(heading).toBeInTheDocument();

    if (lifeMetrics.smoker === "No") {
      expect(heading).toHaveTextContent("Smoke-Free and Lovin' It!");
    } else {
      const lastCheckup = new Date(lifeMetrics.last_medical_checkup);
      const today = new Date();
      const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));

      if (lastCheckup >= oneYearAgo) {
        expect(heading).toHaveTextContent(
          "Healthy, Wealthy, and Wise: Secured for Life!"
        );
      } else {
        expect(heading).toHaveTextContent("Check-Up Reminder!");
      }
    }
  });

  test("displays correct bottom arrow when car and home metrics are valid", () => {
    render(
      <LifeMetricsSection
        lifeMetrics={lifeMetrics}
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
      />
    );

    const bottomArrow = screen.getByTestId("bottom-arrow-l1");
    expect(bottomArrow).toBeInTheDocument();
  });

  test("displays correct top arrow when car and home metrics are valid", () => {
    render(
      <LifeMetricsSection
        lifeMetrics={lifeMetrics}
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
      />
    );

    const topArrow = screen.getByTestId("top-arrow-l1");
    expect(topArrow).toBeInTheDocument();
  });

  test("displays correct top arrow when car and home metrics are invalid", () => {
    const invalidCarMetrics = {};
    const invalidHomeMetrics = {};

    render(
      <LifeMetricsSection
        lifeMetrics={lifeMetrics}
        carMetrics={invalidCarMetrics}
        homeMetrics={invalidHomeMetrics}
      />
    );

    const topArrow = screen.getByTestId("top-arrow-l1");
    expect(topArrow).toBeInTheDocument();
  });

  test("displays correct text when car and home metrics are invalid", () => {
    const invalidCarMetrics = {};
    const invalidHomeMetrics = {};

    render(
      <LifeMetricsSection
        lifeMetrics={lifeMetrics}
        carMetrics={invalidCarMetrics}
        homeMetrics={invalidHomeMetrics}
      />
    );

    expect(screen.getByTestId("smoke-free-heading")).toBeInTheDocument();
    expect(screen.getByTestId("smoke-free-description")).toBeInTheDocument();
  });
});
