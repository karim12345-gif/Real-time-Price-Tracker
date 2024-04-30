import { render, screen } from "@testing-library/react";
import { Header } from "../../components";

describe("Header", () => {
  it("should render Real Time Prices", () => {
    render(<Header />);

    // ** get the heading element
    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    // ** should have the text content Real Time Prices
    expect(heading).toHaveTextContent(/Real Time Prices/i);
  });
});
