import React, { useEffect, useContext } from "react";
import { Subscription } from "react-apollo";

import { withStyles } from "@material-ui/core/styles";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

import PokemonCard from './PokemonCard';
import Spinner from './Spinner';

import { useClient } from "../clientGraphQL";
import { GET_POKEMONS_QUERY} from "../graphql/queries";
import { SET_FAVOURITE_POKEMON_MUTATION } from "../graphql/mutations";
import { FAVOURITE_POKEMON_UPDATED_SUBSCRIPTION } from "../graphql/subscriptions";

import Context from '../context';

import {
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_FAILURE,
    FETCH_POKEMONS_SUCCESS,
    SET_FAVOURITE_POKEMON,
} from '../eventTypes';

const PokemonGridList = ({ classes }) => {

    const mobileSize = useMediaQuery('(max-width: 650px)');

    const clientGraphQL = useClient();
    const { state, dispatch } = useContext(Context);

    useEffect(() => { getPokemons(); }, []);

    const getPokemons = async () => {
        dispatch({ type: FETCH_POKEMONS_REQUEST });
        try {
            const { getPokemons } =  await clientGraphQL.request(GET_POKEMONS_QUERY);
            dispatch({ type: FETCH_POKEMONS_SUCCESS, payload: getPokemons});
        } catch (e) {
            dispatch({ type: FETCH_POKEMONS_FAILURE, payload: e});
        }
    };

    const handleSetFavouritePokemon = async (pokemon) => {
        const variables = { pokemonId: pokemon._id };
        await clientGraphQL.request(SET_FAVOURITE_POKEMON_MUTATION, variables);
    };

    const pokemonsList = state.pokemons.map(pokemon => (
        <GridListTile key={pokemon._id} cols={1}>
            <PokemonCard
                pokemon={pokemon}
                handleSetFavouritePokemon={handleSetFavouritePokemon}
            />
        </GridListTile>
    ));

    return (
        <div className={mobileSize ? classes.rootMobile : classes.root}>
            {state.isLoading
                ? <Spinner/>
                : <GridList cellHeight={450} className={classes.gridList} cols={4}>{pokemonsList}</GridList>
            }
            <Subscription
                subscription={FAVOURITE_POKEMON_UPDATED_SUBSCRIPTION}
                onSubscriptionData={({ subscriptionData }) => {
                    const { userUpdated } = subscriptionData.data;
                    dispatch({ type: SET_FAVOURITE_POKEMON, payload: userUpdated });
                }}
            />
        </div>
    );
};

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: 'grey',
    },
    rootMobile: {
        display: 'flex',
        flexDirection: 'column-reverse',
        backgroundColor: 'grey',
    },
    gridList: {
        width: 1600,
    },
};

export default withStyles(styles)(PokemonGridList);
