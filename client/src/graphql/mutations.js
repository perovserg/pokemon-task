export const SET_FAVOURITE_POKEMON_MUTATION = `
    mutation($pokemonId: String!) {
        setFavouritePokemon(pokemonId: $pokemonId) {
            _id
            name
            email
            picture
            favourite_pokemon_id
        }
    }
`;
