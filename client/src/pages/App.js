import React from "react";
import withRoot from "../withRoot";

import Header from '../components/Header';
import PokemonGridList from '../components/PokemonGridList';

const App = () => {
  return (
      <React.Fragment>
        <Header/>
        <PokemonGridList/>
      </React.Fragment>
  );
};

export default withRoot(App);
