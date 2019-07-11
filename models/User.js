import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String,
    favourite_pokemon_id: Number,
});

export default mongoose.model('User', UserSchema);
