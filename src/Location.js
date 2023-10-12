import React, {useState, useEffect} from "react";
import EnemyPokemon from "./EnemyPokemon";
import MyPokemon from "./MyPokemon"
import Battle from "./Battle";
import './Location.css';

function Location(props)
{
    // console.log("Location Component Rendered");

    // State to set the Pokemon that I choose from the list of fetched ones from the App Component.
    const [chosenPokemon, setChosenPokemon] = useState(null);

    // State to set the Enemy Pokemon when user clicked on a Location and Data was Found and Fetched.
    const [enemyPokemon, setEnemyPokemon] = useState([]);

    // State to set True when Data was fetched.
    const [encounterDataFetched, setEncounterDataFetched] = useState(false);

    // State to set True when Data was fetched and Pokemon from Area fetched was found.
    const [noPokemonEncounters, setNoPokemonEncounters] = useState(false);

    useEffect(() => 
    {
        // In App.js initially set to True. Meaning that the Location is displayed and waiting to be visited.
        if (props.isShown) 
        {
            // If the Location element is displayed, that means that the user haven't visited (fetched) any Location.
            setEncounterDataFetched(false);
            // If no Location was visited (fetched) it means that no Pokemon was searched or found.
            setNoPokemonEncounters(false);
        }
    }, [props.isShown]); // Do this every time the Location is Rendered AND props.isShown is MODIFIED.

    // State to set my Pokemons and to be able to update it.
    const [usersPokemon, setUsersPokemon] = useState(
        [
            "https://pokeapi.co/api/v2/pokemon/bulbasaur",
            "https://pokeapi.co/api/v2/pokemon/charizard",
            "https://pokeapi.co/api/v2/pokemon/poliwhirl"
        ]);

    console.log("MY POKEMONS URL'S: ", usersPokemon);

    // Event Listener Function attached to Visit Location Button.
    // Used to Fetch a Random Pokemon from the Location Visited (Clicked) and all My Pokemons.
    function fetchData(event)
    {
        // Prevent default behaviour of button. Which is a link that without preventing default it would have accessed the json needed to fetch from inside the anchor tag.
        event.preventDefault();

        // Fetching my pokemons URLs:
        const myFetchedPokemons = usersPokemon.map(url => fetch(url))

        // Gathering all promises in a single place and converting them in json format.
        Promise.all(myFetchedPokemons)
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(data => 
            {
                // Creating a new variable and storing inside an array with objects with the pokemons name and image as keys.
                const myPokemonData = data.map(item => 
                {
                    return (
                    {
                        url: item.location_area_encounters.substring(0, item.location_area_encounters.lastIndexOf("/")),
                        name: item.name, 
                        img: item.sprites.front_default,
                        hp: item.stats[0].base_stat,
                        attack: item.stats[1].base_stat,
                        defense: item.stats[2].base_stat
                    })
                })

                // Passing state from App to Location and allowing Location to update the state from inside the App.
                // The process of updating the state doesn't copy in this case the previous objects from the last or initial render.
                props.setMyPokemons(prevPokemons => [...myPokemonData])

                console.log("MY POKEMONS PROP PASSED TO LOCATION COMPONENT WHICH MANAGED TO MODIFY IT FROM HERE: ", props.myPokemons)
            })

        // declaring a variable to store the fetched pokemons from all areas of a location later.
        let pokemonsList = [];

        // Get the href attribute
        const href = event.currentTarget.getAttribute('href'); 

        // Fetch the location url the user has clicked and convert in json format.
        fetch(href)
        .then(res => res.json())
        .then(data =>
        {
            // Get all the areas from the location fetched.
            const areas = data.areas
            
            // If there is any area in the location clicked...
            if (areas.length > 0)
            {
                console.log(`The areas array have ${areas.length} elements.`)

                // Getting only the URLs from the area variable.
                const areaUrls = areas.map(area => area.url)

                // Fetching all the areas URLs.
                const promises = areaUrls.map(url => fetch(url))

                // Gathering all promises in a single place and converting them in json format.
                Promise.all(promises)
                .then(responses => Promise.all(responses.map(response => response.json())))
                .then(dataArray =>
                {
                    // Gathering all pokemon_encounters variables from the data fetched.
                    const formatData = dataArray.map(item => item.pokemon_encounters)
                    
                    // formatData is an array of arrays, where each inner array (item.pokemon_encounters) contains Pokémon encounter data. 
                    let pokemons = formatData.map(arrayInside => arrayInside.map(item => item.pokemon));

                    // Getting the actual list.
                    pokemonsList = pokemons[0]
                    // console.log("Enemy Pokemon List", pokemonsList)

                    // If there is any Pokemon in that list...
                    if (pokemonsList.length > 0) 
                    {
                        // Get a random number based on the length of pokemonsList.
                        let randomNumber = Math.floor(Math.random() * pokemonsList.length);
                        
                        // Pick a random Pokemon
                        let randomPokemon = pokemonsList[randomNumber];
            
                        // Fetch a random Pokemon and convert data into json.
                        fetch(randomPokemon.url)
                            .then(res => res.json())
                            .then(data => 
                            {
                                // Create an object based on the data fetched.
                                let choosenPokemon = 
                                {
                                    url: data.location_area_encounters.substring(0, data.location_area_encounters.lastIndexOf("/")),
                                    name: data.name,
                                    img: data.sprites.front_default,
                                    hp: data.stats[0].base_stat,
                                    attack: data.stats[1].base_stat,
                                    defense: data.stats[2].base_stat
                                    
                                };

                                // Set Enemy Pokemon state without to copy in this case the previous objects from the last or initial render.
                                setEnemyPokemon(
                                    { 
                                        url: choosenPokemon.url,
                                        name: choosenPokemon.name, 
                                        img: choosenPokemon.img, 
                                        hp: choosenPokemon.hp, 
                                        attack: choosenPokemon.attack, 
                                        defense: choosenPokemon.defense 
                                    });

                                console.log("ENEMY POKEMON ", enemyPokemon)

                                // Set it to True because Data was Fetched.
                                setEncounterDataFetched(true);
                                console.log("A fost gasit pokemon: ", noPokemonEncounters)

                                // Set it to false because a Pokemon was Found.
                                setNoPokemonEncounters(false);
                                console.log("In urma fetch-ului rezultat ", encounterDataFetched)
                            });
                    } 
                });
            } 
            else 
            {
                console.log(pokemonsList.length)
                // Set to True because NO Pokemon was Found.
                setNoPokemonEncounters(true);
                console.log("Nu a fost gasit pokemon: ", noPokemonEncounters)

                // Set to True because data was fetched even if No Pokemon was Found.
                setEncounterDataFetched(true);

                // It will log every time False because there is an useEffect that resets it at every re-render of the app.
                console.log("In urma fetch-ului...", encounterDataFetched)
            }
        })
    }

    // Function to get the Pokemon clicked from the array of My Pokemons and add it to state of Location.
    function choosePokemon(pokemon) {
        setChosenPokemon(pokemon);
    }

    // Creating an array with all My Pokemons fetched and added to state from App.
    let readyPokemons = props.myPokemons.map(item => 
    <MyPokemon 
        key ={item.name} 
        name={item.name} 
        img={item.img}
        isPokemon={enemyPokemon}
        choosePokemon={() => choosePokemon(item)} // inserting the self-referring function here to avoid using event.
    />)

    return (
        // If isShown is True, every Location is displayed.
        props.isShown === true ? 
        (
            <div id="location-card" key={props.index}>
                <h2 id="location-name">{props.name}</h2>
                <a href={props.url} onClick={fetchData}> 
                    {/* click function TO TURN FALSE props.isShown */}
                    <button id="travel" onClick={props.toggleShown}>Visit Location</button>
                </a>
            </div>
        ) 
        // Else
        : 
        (
            // If encounterDataFetched AND noPokemonEncounters ARE TRUE...
            encounterDataFetched === true && noPokemonEncounters === true ? 
            (
                <div id="empty-location">
                    <p>This location doesn't seem to have any Pokémon encounters.</p>
                     {/* click function TO TURN TRUE this time props.isShown */}
                    <button id="go-back" onClick={props.toggleShown}>Back to Locations</button>
                </div>
            ) 
            // Else
            : 
            (
                // If encounterDataFetched is TRUE AND noPokemonEncounters is FALSE (meaning that a Pokemon was found)...
                encounterDataFetched === true && noPokemonEncounters === false ? 
                (
                    <div>
                        <div>
                            {/* AND If chosenPokemon exists, is TRUE */}
                            {chosenPokemon ? 
                            (
                                <div>
                                    <Battle 
                                        enemyPokemon = {enemyPokemon} 
                                        myPokemon = {chosenPokemon} 
                                        setUsersPokemon={setUsersPokemon} 
                                        setChosenPokemon={setChosenPokemon}
                                    />
                                        {/* Update state with null argument to reset the state of a Chosen Pokemon. */}
                                        {/* <button onClick={() => setChosenPokemon(null)}>Back to My Pokémons</button> */}
                                </div>
                            ) 
                            // Else
                            : 
                            (
                                <div>
                                    <EnemyPokemon name={enemyPokemon.name} img={enemyPokemon.img} />
                                    {/* List with all my Pokemons. */}
                                    {readyPokemons}
                                    {/* click function TO TURN TRUE this time props.isShown */}
                                    <button onClick={props.toggleShown}>Back to Locations</button>
                                </div>
                            )}
                        </div>
                    </div>
                ) 
                // Else
                : 
                null
            )
        )
    );
}

export default Location;
