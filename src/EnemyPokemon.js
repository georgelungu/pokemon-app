import React, {useState} from "react";

function EnemyPokemon(props)
{
    const [enemyStats, setEnemyStats] = useState(props.enemyStats)

    const z = Math.floor(Math.random() * (217 - 255 + 1)) + 217;

    console.log(props.enemyUrl)

    function enemyTurn()
    {
        props.setTurn(true)

        if (props.myStats.hp > 0) 
        {
            let attack = ((((2 / 5 + 2) * enemyStats.attack * 60 / props.myStats.defense) / 50) + 2) * z / 255;

            const updatedMyStats = {
                ...props.enemyStats,
                hp: props.myStats.hp - attack
            };

            props.updateMyStats(updatedMyStats); // Update enemyStats in Battle component

            console.log("MY POKEMON AFTER A HIT IN MY ENEMY POKEMON.JS: ", updatedMyStats.hp);
        }
        else
        {
            props.setFight(false)
        }
    }

    return (
        <div className="enemy-pokemon-div">
            <h2 className="enemy-pokemon-name">{props.name}</h2>
            <img className="enemy-pokemon-image" src={props.img} alt=""/>
            {!props.turn && props.startedFight && enemyStats.hp > 0? 
            (
                <button onClick={enemyTurn}>Enemy turn</button>
            ) 
            : 
            props.turn && !props.startedFight ? 
            (
                <button onClick={() => props.setChosenPokemon(null)}>Back to My Pokémons</button>
            ) 
            : 
            null}
        </div>
    )
}

export default EnemyPokemon;