import axios from 'axios';
import {SET_CURRENT_PAGE, GET_DETAILS,GET_POKEMONS,GET_TYPES,GET_POKEMONS_NAME,ORDER_BY_ATACK,ORDER_BY_NAME,FILTER_BY_ORIGIN,FILTER_BY_TYPES,SHOW_ALL_POKEMONS,CLEAR_DETAIL_STATE} from '../actions-type'

export function getPokemons() {
    return async function(dispatch){
        const json = await axios('/pokemons');
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        const json = await axios('/types');
        return dispatch({
            type: GET_TYPES,
            payload: json.data
        })
    }
}

export function postPokemon (payload) {
    return async function(dispatch){
        const json = await axios.post('/pokemons',payload);
        return json
    }
}

export function getDetail(idPokemon){
    return async function (dispatch) {
        try {
            const json = await axios(`pokemons/${idPokemon}`)
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            return error
        }
    }
}

export function getPokemonsName(name){
    return async function (dispatch){
        try {
            const json = await axios(`/pokemons?name=${name}`)
            
            return dispatch({
                type: GET_POKEMONS_NAME,
                payload: json.data
                
            })
        } catch (error) {
            return error
        }
    }
}

export function orderPokemonByAtack(payload) {
    return ({
        type: ORDER_BY_ATACK,
        payload
    })
}

export function orderPokemonByName(payload) {
    return ({
        type: ORDER_BY_NAME,
        payload
    })
}

export function filterByTypes(payload) {
    return ({
        type: FILTER_BY_TYPES,
        payload
    })
}

export function filterByOrigin(payload) {
    return ({
        type: FILTER_BY_ORIGIN,
        payload
    })
}

export function showAllPokemons(payload) {
    return({
        type: SHOW_ALL_POKEMONS,
        payload
    })
}

export function clearDetailState(payload) {
    return({
        type: CLEAR_DETAIL_STATE,
        payload
    })
}

export function setCurrentPage(payload) {
    return({
        type: SET_CURRENT_PAGE,
        payload
    })
}