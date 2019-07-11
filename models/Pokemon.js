import mongoose from 'mongoose';

const PokemonSchema = new mongoose.Schema({
    pokeapi_id: Number,
    name: String,
    sprites: {
        back_default: String,
        back_female: String,
        back_shiny: String,
        back_shiny_female: String,
        front_default: String,
        front_female: String,
        front_shiny: String,
        front_shiny_female: String,
    },
    types: [
        {
            slot: Number,
            _type: { name: String, url: String }
        }
    ],
    stats: [
        {
            base_stat: Number,
            effort: Number,
            stat: {
                name: String,
                url: String,
            }
        },
    ],
    order: Number,
    height: Number,
    weight: Number,
});

export default mongoose.model('Pokemon', PokemonSchema);
