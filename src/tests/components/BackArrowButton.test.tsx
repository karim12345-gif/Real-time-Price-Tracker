import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BackArrowButton from "../../components/BackArrowButton";

describe("BackArrowButton", () => {
  it("should navigate to '/' when clicked", async () => {
    render(
      <BrowserRouter>
        <BackArrowButton />
      </BrowserRouter>
    );

    const backButton = screen.getByRole("button");

    fireEvent.click(backButton);

    // Wait for navigation to occur
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
