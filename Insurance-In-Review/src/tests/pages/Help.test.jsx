import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Help from "../../pages/Help"; // Assuming the component is in the same directory

describe("Help Component", () => {
  test("renders without crashing", () => {
    render(<Help />);
  });

  test("renders FAQ section correctly", () => {
    const { getByTestId } = render(<Help />);
    const faqSection = getByTestId("faq-section");
    expect(faqSection).toBeInTheDocument();
  });

  test("renders Account section correctly", () => {
    const { getByTestId } = render(<Help />);
    const accountSection = getByTestId("account-section");
    expect(accountSection).toBeInTheDocument();
  });

  test("renders Privacy section correctly", () => {
    const { getByTestId } = render(<Help />);
    const privacySection = getByTestId("privacy-section");
    expect(privacySection).toBeInTheDocument();
  });

  test("renders Contact section correctly", () => {
    const { getByTestId } = render(<Help />);
    const contactSection = getByTestId("contact-section");
    expect(contactSection).toBeInTheDocument();
  });
});
