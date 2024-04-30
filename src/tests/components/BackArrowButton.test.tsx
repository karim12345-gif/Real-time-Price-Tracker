import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {DetailsPage, ReactQueryProvider} from "../../pages";


describe("Detail Page", () => {
    test("it should render back button", async () => {
        render(
            <ReactQueryProvider>
                <BrowserRouter>
                    <DetailsPage/>
                </BrowserRouter>
            </ReactQueryProvider>
        );

        const linkButton = screen.getByRole("button", {name: "Back"});
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

        const linkButton = screen.getByRole("button", {name: "Back"});
        expect(linkButton).toBeInTheDocument();

        fireEvent.click(linkButton);

        // Assert that the history reflects navigation
        expect(window.location.pathname).toBe("/");

    });
});