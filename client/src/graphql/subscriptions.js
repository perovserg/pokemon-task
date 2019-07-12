import gql from 'graphql-tag';

export const FAVOURITE_POKEMON_UPDATED_SUBSCRIPTION = gql`
    subscription {
        favouriteUpdated {
            _id
        }
    }
`;
