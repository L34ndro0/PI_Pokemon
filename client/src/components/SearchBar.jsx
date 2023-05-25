import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsName ,getPokemons, showAllPokemons} from "../actions";
import styles from '../styles/searchBar.module.css'

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
   
    function handleInputChange(event){
        event.preventDefault()
        setName(event.target.value)        
    }

    function handleClick(event){
        event.preventDefault();
        dispatch(getPokemons());        
    }

    function handleSubmit(event){
        event.preventDefault()
        dispatch(getPokemonsName(name))        
    }

    function handleLimpiar(event){
        event.preventDefault()
        setName('')
        dispatch(showAllPokemons())        
    }

    return (
        <div>
            <div>
                <input type="text" placeholder="Busqueda por nombre" onChange={event => handleInputChange(event)} value={name}/>
                <button className={styles.btn} type='submit' onClick={(event => handleSubmit(event))}>Buscar</button>
                <button className={styles.btn} type='submit' onClick={(event => handleLimpiar(event))}>Limpiar</button>
            
            </div>    
            <button className={styles.btn_recargar} onClick={event => handleClick(event)}>cargar todos los personajes</button>
        </div>
        
    )

}