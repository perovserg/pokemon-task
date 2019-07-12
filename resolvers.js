import { AuthenticationError, PubSub } from 'apollo-server';

import Pokemon from './models/Pokemon';
import User from './models/User';

const pubsub = new PubSub();

const FAVOURITE_UPDATED = 'FAVOURITE_UPDATED';

const authenticated = next => (root, args, ctx, info) => {
    if (!ctx.currentUser) throw new AuthenticationError('You must be logged in!');
    return next(root, args, ctx, info);
};

const resolvers = {
    Query: {
        me: authenticated((root, args, ctx) => ctx.currentUser),
        getPokemons: async (root, args, ctx) => {
            // todo: pagination here
            const pokemons = await Pokemon.find({});
            return pokemons;
        }
    },
    Mutation: {
        setFavouritePokemon: authenticated(async (root, args, ctx) => {
            const userUpdated = await User.findOneAndUpdate(
                { _id: ctx.currentUser._id },
                { $set: { favourite_pokemon_id: args.pokemonId } },
                { new: true }
            );
            pubsub.publish(FAVOURITE_UPDATED, { userUpdated });
            return userUpdated;

        }),
    },
    Subscription: {
        favouriteUpdated: {
            subscribe: () => pubsub.asyncIterator(FAVOURITE_UPDATED)
        },
    },
};

export default resolvers;
