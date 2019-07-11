import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        _id: ID
        name: String
        email: String
        picture: String
        favourite_pokemon_id: Int
    }
    
    type PokemonSprite {
        back_default: String
        back_female: String
        back_shiny: String
        back_shiny_female: String
        front_default: String
        front_female: String
        front_shiny: String
        front_shiny_female: String
    }
    
    type PokemonSubType {
        name: String
        url: String
    }
    
    type PokemonType {
        slot: Int
        _type: PokemonSubType
    }
    
    type PokemonSubStat {
        name: String
        url: String
    }
    
    type PokemonStat {
        base_stat: Int
        effort: Int
        stat: PokemonSubStat
    }
    
    type Pokemon {
        _id: ID
        pokeapi_id: Int
        name: String
        sprites: PokemonSprite
        types: [PokemonType]
        stats: [PokemonStat]
        order: Int
        height: Int
        weight: Int   
    }
    
    type Query {
        me: User
        getPokemons: [Pokemon!]!
    }
    
    type Mutation {
        setFavouritePokemon(userId: ID!, pokemonId: ID!): User
    }
    
    type Subscription {
        favouriteUpdated: User
    }
    
`;

export default typeDefs;
