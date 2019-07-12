export const SET_FAVOURITE_POKEMON_MUTATION = `
    mutation($pokemonId: ID!) {
        setFavouritePokemon(pokemonId: $pokemonId) {
            _id
        }
    }
`;
