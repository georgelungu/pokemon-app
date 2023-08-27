import React from "react";

function MyPokemon(props)
{
    return (
        <div className="my-pokemon-div">
            <h2 className="my-pokemon-name">{props.name}</h2>
            <img className="my-pokemon-image" src={props.img} alt=""/>
            <button onClick={props.choosePokemon}>{props.isPokemon && "Choose"}</button>
        </div>
    )
}

export default MyPokemon;