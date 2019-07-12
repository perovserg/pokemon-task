import {
    LOGIN_USER,
    IS_LOGGED_IN,
    SIGNOUT_USER,
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_FAILURE,
    FETCH_POKEMONS_SUCCESS,
    SET_FAVOURITE_POKEMON,
} from './eventTypes';

export default function reducer(state, { type, payload}) {

    switch (type) {

        case LOGIN_USER:
            return {
                ...state,
                currentUser: payload,
            };

        case IS_LOGGED_IN:
            return {
                ...state,
                isAuth: payload,
            };

        case SIGNOUT_USER:
            return {
                ...state,
                isAuth: false,
                currentUser: null,
            };

        case FETCH_POKEMONS_REQUEST:
            return {
                ...state,
                pokemons: [],
                isLoading: true,
                isLoaded: false,
                loadingError: null,
            };

        case FETCH_POKEMONS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                loadingError: payload,
            };

        case FETCH_POKEMONS_SUCCESS:
            return {
                ...state,
                pokemons: payload,
                isLoading: false,
                isLoaded: true,
                loadingError: null,
            };

        case SET_FAVOURITE_POKEMON:
            return {
                ...state,
                currentUser: payload,
            };

        default:
            return state;
    }

};
