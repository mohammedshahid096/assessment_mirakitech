import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux"; // Assuming you have a Redux store provider
import { MemoryRouter } from "react-router-dom";
import Register from "./Pages/Register";
// Mocking the useDispatch function
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Register Component", () => {
  test("Successful form submission", async () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    // Mock useSelector to return appropriate state
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue({
      loading: false,
      isAuthenticated: false,
      error: null,
    });

    require("react-redux").useDispatch.mockReturnValue(mockDispatch);
    require("react-router-dom").useNavigate = () => mockNavigate;

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter the name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter the email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter the password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Sign Up"));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
