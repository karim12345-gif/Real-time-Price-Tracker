import { render, screen } from "@testing-library/react";
import { Header } from "../../components";

describe("Header", () => {
  it("should render Real Time Prices", () => {
    render(<Header />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Real Time Prices/i);
  });
});
