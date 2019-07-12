import { createContext } from 'react';

const appContext = createContext({
    currentUser: null,
    isAuth: false,
    pokemons: [],
    isLoading: false,
    isLoaded: false,
    loadingError: null,
    pageOffset: null,
    pageLimit: null,
});

export default appContext;
