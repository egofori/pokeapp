import { screen, render, waitFor } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
    beforeEach(() => {
        render(<Home />);
    });

    test("should render Home page", () => {
        expect(screen.getByRole("heading", { name: /Welcome to PokeApp!/ })).toBeInTheDocument();
    });

    test("should display error message", () => {
        expect(screen.getByText(/No pokemons?/)).toBeInTheDocument();
    });
});
