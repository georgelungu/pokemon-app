import React, {useState, useEffect} from "react";
import './MyPokemon.css'

function MyPokemon(props)
{
    console.log("The My Pokemon Rendered with new state.")

    const [myStats, setMyStats] = useState(props.myStats);

    const z = Math.floor(Math.random() * (217 - 255 + 1)) + 217;

    // Create a function that will set turn to false in order to allow to the opponent to attack.
    function nextTurn()
    {
        props.setTurn(false)

        if (props.enemyStats.hp > 0) 
        {
            let attack = ((((2 / 5 + 2) * myStats.attack * 60 / props.enemyStats.defense) / 50) + 2) * z / 255;

            const updatedEnemyStats = {
                ...props.enemyStats,
                hp: props.enemyStats.hp - attack
            };

            props.updateEnemyStats(updatedEnemyStats); // Update enemyStats in Battle component

            console.log("ENEMY STATS AFTER A HIT IN MY POKEMON.JS: ", updatedEnemyStats.hp);
        }
        else
        {
            props.setFight(false)
            props.setUsersPokemon(prevPokemons => [...prevPokemons, props.enemyUrl])
        }
    }

    console.log("ENEMY URL: ", props.enemyUrl) // NOT WORKING AND I DONT KNOW WHY

    return (
        <div className="my-pokemon-div">
            <img className="my-pokemon-image" src={props.img} alt=""/>
            <h2 className="my-pokemon-name">{props.name}</h2>
            {/* <button onClick={props.choosePokemon}>{props.isPokemon && "Choose"}</button> */}
            {props.isPokemon && <button className="choose" onClick={props.choosePokemon}><span>Choose</span></button>}
            
            {props.turn && props.startedFight ? 
            (
                <button className="turn" onClick={nextTurn}><span>Your turn</span></button>
            )  
            : 
            null}
        </div>
    )
}

export default MyPokemon;