import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { orderPokemonByAtack ,  filterByTypes, filterByOrigin, orderPokemonByName,setCurrentPage } from "../actions";
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import { getPokemons, getTypes } from "../actions";
import styles from '../styles/home.module.css'


export default function Home () {
    
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const allTypes = useSelector((state) => state.types)
    const [order ,SetOrder] = useState('')
    const currentPage = useSelector((state) => state.currentPage)
    const [pokemonsPerPage] = useState(12);   
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon) 

    const paginado = (pageNumber) => {
        dispatch( setCurrentPage(pageNumber));
    }    
    
    useEffect ( () => {                
        dispatch(getPokemons());
        dispatch(getTypes());                     
    },[dispatch])
   
  

    function handleOrderAtack(event){        
        console.log(order)
        dispatch(orderPokemonByAtack(event.target.value))
        dispatch( setCurrentPage(1))
        SetOrder(`Ordenando ${event.target.value}`)
    }

    function handleOrderName(event){
        dispatch(orderPokemonByName(event.target.value))
        dispatch( setCurrentPage(1))
        SetOrder(`Ordenando ${event.target.value}`)
    }

    function handleFilterTypes(event){
        dispatch(filterByTypes(event.target.value))
        dispatch( setCurrentPage(1))
    }

    function handleFilterByOrigin(event) {
        dispatch(filterByOrigin(event.target.value))
        dispatch( setCurrentPage(1))
    }
    
    if (!currentPokemons.length) {
        return (
            <div className={styles.loading}>
                <img className={styles.loading_image} src="https://usagif.com/wp-content/uploads/loading-6.gif" alt="" />
                <h1 className={styles.loading_texto}>loading...</h1>
            </div>
        )
    }
    
   
    return (        
        <div className={styles.home}>
            
            <div className={styles.searchBar}>

                <div className={styles.searchBar_black}>
                    <div className={styles.container_ord_filt}>                    
                        <div className={styles.content_filt_ord}>    
                        <label className={styles.etiquetas_ord_filt} >Ordenar</label>
                            <div>
                            <label className={styles.etiquetas_ord_filt}> por nombre: </label>
                                <select className={styles.select_ord_filt} onChange={event => handleOrderName(event)}>
                                    <option value="seleccionar">Seleccionar</option>
                                    <option value="ascendente">A-Z</option>
                                    <option value="descendente">Z-A</option>
                                </select>
                            </div>
                            <div>
                            <label className={styles.etiquetas_ord_filt}> por ataque: </label>    
                            <select className={styles.select_ord_filt} onChange={event => handleOrderAtack(event)}>
                                <option value="seleccionar">Seleccionar</option>
                                <option value="ascendente">Menor a Mayor</option>
                                <option value="descendente">Mayor a Menor</option>
                            </select>
                            </div>
                        </div>                                    
                        <div className={styles.content_filt_ord}>
                            <label className={styles.etiquetas_ord_filt}>Filtrar</label>
                            <div>
                                <label className={styles.etiquetas_ord_filt}>por origen: </label>
                                <select className={styles.select_ord_filt} onChange={event => handleFilterByOrigin(event)} >
                                    <option value="All">All</option>
                                    <option value="createInDb">Created</option>
                                    <option value="Api">Api</option>
                                </select>
                            </div>
                            <div>
                                <label className={styles.etiquetas_ord_filt} >por tipo:    </label>
                                <select className={styles.select_ord_filt} onChange={event => handleFilterTypes(event) }>    
                                    <option value="All">All</option>
                                    {allTypes?.map((type,index) => {
                                        return(
                                            <option value={type.nombre} key={index}>{type.nombre}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>                
                    </div>
                </div>                

                <div className={styles.searchBar_chocolate}>
                    <div>
                        <Link to= '/pokemons' className={styles.chocolate_link}>Crear pokemon</Link>
                    </div>
                    <div>
                        <SearchBar/>       
                    </div>                
                </div>                
            </div>
            
            <div>                
                <div className={styles.paginado}> 
                    <p>Paginas!</p>            
                    <Paginado className={styles.paginado} pokemonsPerPage= {pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} currentPage={currentPage}/>                
                </div>                
                
                <div className={styles.containerCards}>
                {                
                currentPokemons?.map( (poke) => {                
                    return(                    
                        <div className={styles.card}>
                            <Link className={styles.container_card} to={`/detail/${poke.id}`}>    
                                <Card nombre={poke.nombre} image={poke.imagen} tipo={poke.type} key={poke.id}/>
                            </Link>
                        </div>

                    )
                })
                }    
                </div>
            </div>
        </div>
    )
}
