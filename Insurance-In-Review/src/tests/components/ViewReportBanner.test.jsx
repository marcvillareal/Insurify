import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewReportBanner from "../../components/ViewReportBanner";

describe('ViewReportBanner component', () => {
    test('renders correctly', () => {
      const { getByTestId } = render(<ViewReportBanner />);
      const viewReportBanner = getByTestId('view-report-banner');
  
      expect(viewReportBanner).toBeInTheDocument();
    });
  
    test('renders the correct text', () => {
      const { getByText } = render(<ViewReportBanner />);
      const title = getByText('Everything you need to know about');
      const subtitle = getByText('Insurance Year in Review');
  
      expect(title).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
    });
});