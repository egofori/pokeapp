import axiosClient from "./axiosClient";

// Calls the pokemon list API
export const getPokemonCreatures = async (limit, offset) => {
    const response =  await axiosClient.get("/", { params: { limit, offset }});

    return response;
};

// calls the pokemon details API
export const getPokemonDetails = async (name) => {
    const response =  await axiosClient.get(`/${name}`);

    return response;
};
