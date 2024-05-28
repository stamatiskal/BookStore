import { screen, render } from "@testing-library/react";
import Footer from "../../components/Footer";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";

describe("Footer Component", () => {
  test('should display "Add your book" button', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const addButton = screen.getByText("Add your Book");
    expect(addButton).toBeInTheDocument();
  });

  test('should not display "About" button', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const aboutButton = screen.queryByText("About");
    expect(aboutButton).not.toBeInTheDocument();
  });
});
