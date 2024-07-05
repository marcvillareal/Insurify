import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CarMetricsSection from "../../components/CarMetricsSection";

describe("CarMetricsSection", () => {
  const carMetrics = {
    average_speed: "65",
    braking_score: "80",
    miles_travelled: "20000",
  };

  const homeMetrics = {};
  const lifeMetrics = {};

  test("renders without crashing", () => {
    render(
      <CarMetricsSection
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
        lifeMetrics={lifeMetrics}
      />
    );
    expect(screen.getByTestId("car-metrics-section")).toBeInTheDocument();
  });

  test("displays average speed section", () => {
    render(
      <CarMetricsSection
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
        lifeMetrics={lifeMetrics}
      />
    );
    expect(screen.getByTestId("average-speed-heading")).toBeInTheDocument();
    expect(screen.getByTestId("average-speed-description")).toBeInTheDocument();
  });

  test("displays braking score section", () => {
    render(
      <CarMetricsSection
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
        lifeMetrics={lifeMetrics}
      />
    );
    expect(screen.getByTestId("brake-score-heading")).toBeInTheDocument();
    expect(screen.getByTestId("brake-score-description")).toBeInTheDocument();
  });

  test("displays miles traveled section", () => {
    render(
      <CarMetricsSection
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
        lifeMetrics={lifeMetrics}
      />
    );
    expect(screen.getByTestId("miles-traveled-section")).toBeInTheDocument();
    expect(
      screen.getByTestId("miles-traveled-description")
    ).toBeInTheDocument();
  });

  test("displays bottom arrow", () => {
    render(
      <CarMetricsSection
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
        lifeMetrics={lifeMetrics}
      />
    );
    const bottomArrows = screen.getAllByTestId("bottom-arrow");
    expect(bottomArrows.length).toBeGreaterThan(0);
  });

  test("displays top arrow", () => {
    render(
      <CarMetricsSection
        carMetrics={carMetrics}
        homeMetrics={homeMetrics}
        lifeMetrics={lifeMetrics}
      />
    );
    const topArrows = screen.getAllByTestId("top-arrow");
    expect(topArrows.length).toBeGreaterThan(0);
  });
});
