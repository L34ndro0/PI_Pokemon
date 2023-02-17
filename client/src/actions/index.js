import axios from 'axios';

export function getPokemons() {
    return async function(dispatch){
        const json = await axios('http://localhost:3001/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}