// ** react imports
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// ** custom pages
import { DetailsPage, ReactQueryProvider } from "../../pages";

describe("Detail Page", () => {
  test("it should render back button", async () => {
    // ** render the DetailsPage component, and allow routing
    render(
      <ReactQueryProvider>
        <BrowserRouter>
          <DetailsPage />
        </BrowserRouter>
      </ReactQueryProvider>
    );
    // ** Get the  button by its role and assert its presence
    const linkButton = screen.getByRole("button", { name: "Back" });
    // ** assert to check if LinkButton in the document
    expect(linkButton).toBeInTheDocument();
  });

  test("back button should navigate to home", async () => {
    render(
      <ReactQueryProvider>
        <BrowserRouter>
          <DetailsPage />
        </BrowserRouter>
      </ReactQueryProvider>
    );

    const linkButton = screen.getByRole("button", { name: "Back" });
    expect(linkButton).toBeInTheDocument();

    // ** this will Simulate a click event on the back button
    fireEvent.click(linkButton);

    // ** Assert that the history reflects navigation
    expect(window.location.pathname).toBe("/");
  });
});
