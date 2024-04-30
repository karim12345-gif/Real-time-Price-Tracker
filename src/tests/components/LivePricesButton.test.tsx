import { render, screen, fireEvent } from "@testing-library/react";
import { ReactQueryProvider } from "../../pages";
import { BrowserRouter } from "react-router-dom";
import LivePricesButton from "../../components/LivePricesButton";

describe("Live Prices Button", () => {
  test("button renders with correct text", async () => {
    render(
      <ReactQueryProvider>
        <BrowserRouter>
          <LivePricesButton />
        </BrowserRouter>
      </ReactQueryProvider>
    );

    const linkButton = screen.getByRole("link", { name: "Check Live Prices" });
    expect(linkButton).toBeInTheDocument();
  });

  test("button click navigates to details page", async () => {
    render(
      <ReactQueryProvider>
        <BrowserRouter>
          <LivePricesButton />
        </BrowserRouter>
      </ReactQueryProvider>
    );

    const linkButton = screen.getByRole("link", { name: "Check Live Prices" });
    expect(linkButton).toBeInTheDocument();

    fireEvent.click(linkButton);

    // Assert that the history reflects navigation
    expect(window.location.pathname).toBe("/detailsPage");
  });
});
