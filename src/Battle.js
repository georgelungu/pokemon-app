import React, {useState} from "react";
import MyPokemon from "./MyPokemon";
import EnemyPokemon from "./EnemyPokemon";


function Battle({myPokemon, enemyPokemon})
{
    // Getting My Pokemon Stats from PROPS in order to update them.
    const [myStats, setMyStats] = useState
    ({
        hp: myPokemon.hp,
        attack: myPokemon.attack,
        defense: myPokemon.defense,
    });

    // Getting Enemy Pokemon Stats from PROPS in order to update them.
    const [enemyStats, setEnemyStats] = useState
    ({
        hp: enemyPokemon.hp,
        attack: enemyPokemon.attack,
        defense: enemyPokemon.defense,
    });

    return(
        <div>
            <MyPokemon name={myPokemon.name} img={myPokemon.img}/>
            <EnemyPokemon name={enemyPokemon.name} img={enemyPokemon.img}/>
            <button>Fight</button>
        </div>
    )
}

export default Battle;