// ** react imports
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// ** custom pages and components
import { ReactQueryProvider } from "../../pages";
import LivePricesButton from "../../components/LivePricesButton";

describe("Live Prices Button", () => {
  test("button renders with correct text", async () => {
    // ** render the LivePriceSButton
    render(
      <ReactQueryProvider>
        <BrowserRouter>
          <LivePricesButton />
        </BrowserRouter>
      </ReactQueryProvider>
    );

    // ** get the button with the name : Check Live Prices
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

    // ** this will simulate a real click event to check the navigation
    fireEvent.click(linkButton);

    //  ** Assert that the history reflects navigation
    expect(window.location.pathname).toBe("/detailsPage");
  });
});
