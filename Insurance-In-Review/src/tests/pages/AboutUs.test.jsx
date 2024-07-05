import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import AboutUs from '../../pages/AboutUs';

test('renders heading correctly', () => {
  render(<AboutUs />);
  const aboutHeadings = screen.getAllByText(/About/i);
  const insurifyHeading = screen.getByText(/Insurify/i);

  aboutHeadings.forEach((aboutHeading) => {
    expect(aboutHeading).toBeInTheDocument();
  });

  expect(insurifyHeading).toBeInTheDocument();
});

test('renders mission content correctly', () => {
  render(<AboutUs />);
  const missionHeading = screen.getByText(/Our Vision/i);
  const missionParagraph1 = screen.getByText(/Just like your ‘Spotify Wrapped’/i);
  const missionParagraph2 = screen.getByText(/We aim to provide this service to all insurance companies/i);

  expect(missionHeading).toBeInTheDocument();
  expect(missionParagraph1).toBeInTheDocument();
  expect(missionParagraph2).toBeInTheDocument();
});

test('renders WHO, WHAT, and WHY sections correctly', () => {
  render(<AboutUs />);
  const whoSection = screen.getByText(/We are your new friend/i);
  const whatSection = screen.getByText(/We provide you a personal ‘Year in Review’/i);
  const whySection = screen.getByText(/We want to help our customers to make informed decisions/i);

  expect(whoSection).toBeInTheDocument();
  expect(whatSection).toBeInTheDocument();
  expect(whySection).toBeInTheDocument();
});
