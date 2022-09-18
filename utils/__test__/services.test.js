import axiosClient from "../axiosClient";
import { getPokemonCreatures, getPokemonDetails } from "../services";

// mocks API calls
jest.mock("../axiosClient");

describe("Services", () => {
    describe("getPokemonCreatures", () => {
        test("should return pokemon list data", async () => {
            const responseValue = {data: {result: [{name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"}]}};
            axiosClient.get.mockResolvedValueOnce(responseValue);
            const response = await getPokemonCreatures(1, 0);

            expect(response.data).toEqual(responseValue.data);
        });
    });

    describe("getPokemonDetails", () => {
        test("should return pokemon details", async () => {
            const responseValue = {data: {id: 1, name: "bulbasaur", weight: 69, height: 7}};
            axiosClient.get.mockResolvedValueOnce(responseValue);
            const response = await getPokemonDetails("bulbasaur");

            expect(response.data).toBe(responseValue.data);
        });
    });
});
