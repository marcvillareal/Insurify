import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewReport from "../../pages/ViewReport";

describe("ViewReport component", () => {
  test("renders ViewReport component correctly", () => {
    const { getByTestId } = render(<ViewReport />);

    // Test that the main headings are rendered
    expect(getByTestId("insurify-heading")).toBeInTheDocument();
    expect(getByTestId("year-heading")).toBeInTheDocument();
    expect(getByTestId("year-number-heading")).toBeInTheDocument();
    expect(getByTestId("report-heading")).toBeInTheDocument();
  });

  test("renders ViewReportBanner component", () => {
    const { getByTestId } = render(<ViewReport />);
    const viewReportBanner = getByTestId("view-report-banner");

    expect(viewReportBanner).toBeInTheDocument();
  });

  test("renders ViewReportCarousel component", () => {
    const { getByTestId } = render(<ViewReport />);
    const viewReportCarousel = getByTestId("view-report-carousel");

    expect(viewReportCarousel).toBeInTheDocument();
  });
});
