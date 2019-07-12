import { createContext } from 'react';

const appContext = createContext({
    currentUser: null,
    isAuth: false,
    pokemons: [],
    currentPokemon: null,
    isLoading: false,
    isLoaded: false,
    loadingError: null,
    pageOffset: null,
    pageLimit: null,
});

export default appContext;
