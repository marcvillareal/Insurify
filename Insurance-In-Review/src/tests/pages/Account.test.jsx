import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import Account from "../../pages/Account";

// Mocking axios get request
jest.mock("axios");

// Mock the navigate function
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mock useNavigate function
}));

describe("Account component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Account component when user is logged in", async () => {
    localStorage.setItem("token", "mockToken");
    localStorage.setItem("userId", "mockUserId");

    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
      },
    });

    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
    );

    // Wait for user data to be loaded
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());

    // Check if user information is displayed
    expect(screen.getByTestId("user-fullname")).toHaveTextContent("John Doe");
    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "john.doe@example.com"
    );
  });
});
