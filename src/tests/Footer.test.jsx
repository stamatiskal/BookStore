import { screen, render } from "@testing-library/react";
import Footer from "../components/Footer";
import { MemoryRouter } from "react-router-dom";

describe("Footer Component", () => {
  it('should display "Home" button', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const homeButton = screen.getByText("Home");
    expect(homeButton).toBeInTheDocument();
  });

  it('should display "Add your book" button', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const addButton = screen.getByText("Add your Book");
    expect(addButton).toBeInTheDocument();
  });

  it('should navigate to Home when "Home" button is clicked', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const homeButton = screen.getByText("Home");
    homeButton.click();
    expect(window.location.pathname).toBe("/Library");
  });

  it('should navigate to NewBook when "Add your book" button is clicked', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const addButton = screen.getByText("Add your Book");
    addButton.click();
    expect(window.location.pathname).toBe("/NewBook");
  });

  it('should not display "About" button', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const aboutButton = screen.queryByText("About");
    expect(aboutButton).not.toBeInTheDocument();
  });
});
