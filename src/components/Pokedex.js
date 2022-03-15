import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokedex = props => {
    const [pokemon, setPokemon] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon");

    useEffect(() => {
        axios.get(endpoint)
            .then(response => {
                setPokemon(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
            })
    }, [endpoint]);

    return (
        <>
            <button className='btn btn-secondary w-50 mx-auto' onClick={() => setEndpoint("https://pokeapi.co/api/v2/pokemon")}>Fetch Pokemon</button>
            <ul className='list-group my-3 w-25 mx-auto'>
                {pokemon.map((mon, index) => {
                    return (
                        <li key={index} className='list-group-item'>{mon.name.charAt(0).toUpperCase().concat(mon.name.slice(1))}</li>
                    );
                })}
            </ul>
            <div className='btn-group'>
                <button className={`btn btn-primary ${prevPage ? '' : 'disabled'}`} onClick={() => setEndpoint(prevPage)}>&lt;</button>
                <button className={`btn btn-primary ${nextPage ? '' : 'disabled'}`} onClick={() => setEndpoint(nextPage)}>&gt;</button>
            </div>
        </>
    );
}

export default Pokedex;