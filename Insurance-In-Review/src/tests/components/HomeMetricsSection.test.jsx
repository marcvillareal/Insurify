import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomeMetricsSection from "../../components/HomeMetricsSection";

describe("HomeMetricsSection", () => {
  const homeMetrics = {
    theft_incidents: "1",
    fire_incidents: "2",
  };

  test("renders without crashing", () => {
    render(
      <HomeMetricsSection
        homeMetrics={homeMetrics}
        carMetrics={{}}
        lifeMetrics={{}}
      />
    );
    expect(screen.getByTestId("h1")).toBeInTheDocument();
    expect(screen.getByTestId("h2")).toBeInTheDocument();
  });

  test("displays correct text based on theft incidents", () => {
    render(
      <HomeMetricsSection
        homeMetrics={{ theft_incidents: "1", fire_incidents: "2" }}
        carMetrics={{}}
        lifeMetrics={{}}
      />
    );
    expect(screen.getByText(/5% on premiums/i)).toBeInTheDocument();
    expect(
      screen.getByText(/vigilance saved 5% on premiums/i)
    ).toBeInTheDocument();
  });

  test("displays correct text based on fire incidents", () => {
    render(
      <HomeMetricsSection
        homeMetrics={{ theft_incidents: "1", fire_incidents: "3" }}
        carMetrics={{}}
        lifeMetrics={{}}
      />
    );
    expect(screen.getByText(/Fire Hazards Flaring Up!/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /A high number of fire incidents signals a hotbed of risk/i
      )
    ).toBeInTheDocument();
  });

  test("renders correct fire incident count", () => {
    render(
      <HomeMetricsSection
        homeMetrics={{ theft_incidents: "1", fire_incidents: "3" }}
        carMetrics={{}}
        lifeMetrics={{}}
      />
    );

    const fireIncidentCount = screen.getByTestId("fire-incident-count");
    expect(fireIncidentCount).toHaveTextContent("3");
  });

  test("renders correct safety discount message", () => {
    render(
      <HomeMetricsSection
        homeMetrics={{ theft_incidents: "1", fire_incidents: "2" }}
        carMetrics={{}}
        lifeMetrics={{}}
      />
    );
    expect(
      screen.getByText(/Enjoy a 5% safety discount on us!/i)
    ).toBeInTheDocument();
  });
});
