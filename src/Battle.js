import React, {useState} from "react";
import MyPokemon from "./MyPokemon";
import EnemyPokemon from "./EnemyPokemon";


function Battle({myPokemon, enemyPokemon, setChosenPokemon, setUsersPokemon})
{
    // Getting My Pokemon Stats from PROPS in order to update them.
    const [myStats, setMyStats] = useState
    ({
        url: myPokemon.url,
        hp: myPokemon.hp,
        attack: myPokemon.attack,
        defense: myPokemon.defense,
    });

    // console.log("My Pokemon Staus: ", myStats)

    // Getting Enemy Pokemon Stats from PROPS in order to update them.
    const [enemyStats, setEnemyStats] = useState
    ({
        url: enemyPokemon.url,
        hp: enemyPokemon.hp,
        attack: enemyPokemon.attack,
        defense: enemyPokemon.defense,
    });

    // State wether to tell which opponent will attack
    const [turn, setTurn] = useState(false)

    // State to specify if the fight is ongoing or not
    const [fight, setFight] = useState(false)

    // console.log("Enemy Pokemon Staus: ", enemyStats)

    function updateEnemyStats(newStats) {
        setEnemyStats({
          ...enemyStats, 
          hp: newStats.hp
        });
      }

      function updateMyStats(newStats) {
        setMyStats({
          ...myStats,
          hp: newStats.hp
        }); 
      }

    console.log("ENEMY STATS IN BATTLE.JS", enemyStats.hp)

    console.log("MY STATS IN BATTLE.JS", myStats.hp)

    // Add a function as an Event Listener to create the logic of the fight.
    function startFight()
    {
        setFight(prevState => !prevState)
        setTurn(prevState => !prevState)
    }

    return (
      <div>
        {/* {console.log("enemyUrl in Battle component:", enemyPokemon.url)} */}
        <MyPokemon
          name={myPokemon.name}
          img={myPokemon.img}
          enemyUrl={enemyStats.url}
          turn={turn}
          setTurn={setTurn}
          myStats={myStats}
          setMyStats={setMyStats}
          enemyStats={enemyStats}
          setEnemyStats={setEnemyStats}
          updateEnemyStats={updateEnemyStats} // Pass the callback function here
          setChosenPokemon={setChosenPokemon}
          startedFight={fight}
          setFight={setFight}
          setUsersPokemon={setUsersPokemon}
        />
        <EnemyPokemon
          name={enemyPokemon.name}
          img={enemyPokemon.img}
          turn={turn}
          setTurn={setTurn}
          myStats={myStats}
          setMyStats={setMyStats}
          enemyStats={enemyStats}
          setEnemyStats={setEnemyStats}
          updateMyStats={updateMyStats}
          startedFight={fight}
          setFight={setFight}
          setChosenPokemon={setChosenPokemon}
        />

        {!fight 
        ? 
        (
          <button onClick={startFight}>Fight</button>
        ) 
        : 
        !fight && enemyStats.hp < 0 ? 
        (
          <button onClick={() => setChosenPokemon(null)}>
            Back to My Pokémons
          </button>
        ) 
        : 
        null}
        {enemyStats.hp < 0 && 
        (
          <button onClick={() => setChosenPokemon(null)}>
            Back to My Pokémons
          </button>
        )}
      </div>
    );
}

export default Battle;
