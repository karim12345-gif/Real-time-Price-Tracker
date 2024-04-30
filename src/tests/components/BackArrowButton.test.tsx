import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BackArrowButton from "../../components/BackArrowButton";
import { HomePage } from "../../pages";
import userEvent from "@testing-library/user-event";

describe("Back arrow should navigate to /", () => {
  it("Renders the BackArrowButton component", () => {
    render(
      <BrowserRouter>
        <BackArrowButton />
      </BrowserRouter>
    );

    const button = screen.getByText(/Back/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });

  it("Navigates to the home page with /", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    );

    // Use 'a' tag for Link component
    const link = screen.getByRole("link", { name: /Back/i });
    fireEvent.click(link);
    await screen.findByText(/Home Page/i);
  });
});
