import React, {useContext} from 'react';

import { withStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import Context from "../context";


const PokemonCard = ({ classes, pokemon, handleSetFavouritePokemon }) => {

    const { state } = useContext(Context);

    const { name, order, pokeapi_id, height, weight, sprites, stats, types} = pokemon;

    const { front_default } = sprites;

    const typeChips = types.map(type => (<Chip key={type.slot} label={type._type.name} />));

    const statChips = stats.map((stat, index) => (<Chip key={index} label={`${stat.stat.name}: ${stat.effort}`} />));

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        {name.slice(0, 1).toUpperCase()}
                    </Avatar>
                }
                title={name}
                subheader={`pokeapi id: ${pokeapi_id}`}
                action={
                    <IconButton
                        aria-label="Add to favorites"
                        onClick={() => handleSetFavouritePokemon(pokemon)}
                    >
                        <FavoriteIcon
                            style={state.currentUser.favourite_pokemon_id === pokemon._id ? {color: 'red'} : {}}
                        />
                    </IconButton>
                }
            />
            <CardMedia
                className={classes.media}
                image={front_default}
                title={name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="div">
                    {`order: ${order}, height: ${height}, weight: ${weight}`}
                    <Paper className={classes.paper}>
                        <span>types: </span>{typeChips}
                    </Paper>
                    <Paper className={classes.paper}>
                        <span>stats: </span>{statChips}
                    </Paper>
                </Typography>
            </CardContent>
        </Card>
    );
};

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: 'blue',
    },
    paper: {
        padding: 2
    },
};

export default withStyles(styles)(PokemonCard);
