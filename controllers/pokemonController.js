import axios from 'axios';
import Pokemon from '../models/Pokemon';

const pokeapiUrl = 'https://pokeapi.co/api/v2';

export const checkPokemonIsImported = async () => {
    let isNeedToImport = process.env.IMPORT_POKEMONS !== undefined;
    let pokemonCount;

    if (!isNeedToImport) {
        pokemonCount = (await Pokemon.find({})).length;
        isNeedToImport = pokemonCount === 0;
    }

    if (isNeedToImport) {
        pokemonCount = await importPokemonsFromAPI();
    }

    console.log(`There are ${pokemonCount} pokemons in DB.`);
};

const importPokemonsFromAPI = async () => {

    let count = 0;
    console.log(`Import pokemons from API started...`);

    let resultEvolutionChain;
    try{
        resultEvolutionChain = await axios.get(`${pokeapiUrl}/evolution-chain/?limit=500`);
        if (resultEvolutionChain.status !== 200) throw new Error(resultEvolutionChain.statusText);
    } catch (e) {
        console.error(`Something went wrong with getting 'evolution-chain' => ${e}`);
        return;
    }

    const {results} = resultEvolutionChain.data;
    const pokemonIds = results.map(({ url }) => url.split('/')[6]); //todo: rebuild to regexp

    console.log(`Get ${pokemonIds.length} pokemons from API! trying to save this heap to DB...`);

    for (let id of pokemonIds) {

        let resultPokemon;
        try {
            resultPokemon = await axios.get(`${pokeapiUrl}/pokemon/${id}`);
            if (resultPokemon.status !== 200) throw new Error(resultPokemon.statusText);
        } catch (e) {
            console.error(`Something went wrong with getting 'pokemon/${id}' => ${e}`);
            continue;
        }

        const {data} = resultPokemon;

        await new Pokemon({...data,
            pokeapi_id: data.id,
            types: data.types.map(item => ({
                slot: item.slot,
                _type: {name: item.type.name, url: item.type.url},
            })),
        }).save();
        count++;

        if (count%50 === 0) {
            console.log(`We have saved ${count} pokemons already...`);
        }
    }

    console.log('Saving pokemons to DB is complete successfully! Now we must take care of them!');

    return count;
};
