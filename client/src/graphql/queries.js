export const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
    favourite_pokemon_id
  }
}
`;

export const GET_POKEMONS_QUERY = `
{
    getPokemons {
        _id
        pokeapi_id
        name
        sprites {
            back_default
            back_female
            back_shiny
            back_shiny_female
            front_default
            front_female
            front_shiny
            front_shiny_female
        }
        types {
            slot
            _type {
                name
                url
            }
        }
        stats {
            base_stat
            effort
            stat {
                name
                url
            }
        }
        order
        height
        weight
    }     
}
`;
