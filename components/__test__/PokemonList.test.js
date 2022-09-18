import { fireEvent, render, screen } from "@testing-library/react";
import PokemonList from "../PokemonList";

describe("PokemonList", () => {
    beforeEach(() => {
        render(<PokemonList pokemonCreatures={[{name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"}]} />);
    })
    test("should display list of pokemons", () => {
        expect(screen.getByText(/Bulbasaur/)).toBeInTheDocument();
    });

    test("should show display", () => {
        fireEvent.click(screen.getByText(/Bulbasaur/));
        expect(screen.getByText(/Details:/)).toBeInTheDocument();
    })
});
