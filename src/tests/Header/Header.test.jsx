import { screen, render } from "@testing-library/react";
import { expect, test } from "vitest";
import Header from "../../components/Header";

describe("Header Component", () => {
  test('should display "Home" button', async () => {
    render(<Header />);
    const homeButton = screen.getByText("Bookstore");
    expect(homeButton).toBeInTheDocument();
  });
});
