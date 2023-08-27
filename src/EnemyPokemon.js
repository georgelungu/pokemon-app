import React from "react";

function EnemyPokemon(props)
{
    return (
        <div className="enemy-pokemon-div">
            <h2 className="enemy-pokemon-name">{props.name}</h2>
            <img className="enemy-pokemon-image" src={props.img} alt=""/>
        </div>
    )
}

export default EnemyPokemon;