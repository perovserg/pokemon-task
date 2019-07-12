import gql from 'graphql-tag';

export const FAVOURITE_POKEMON_UPDATED_SUBSCRIPTION = gql`
    subscription {
        userUpdated {
            _id
            name
            email
            picture
            favourite_pokemon_id
        }
    }
`;
