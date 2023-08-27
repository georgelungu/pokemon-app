import React, {useState, useEffect} from 'react';
import Location from './Location';
import './App.css';

function App() 
{
  // State to set data of the First 20 Locations.
  const [data, setData] = useState([]);

  // State to update to FALSE if a Location was clicked.
  const [isShown, setIsShown] = useState(true)

  // State for my Pokemons that will be updated inside the Location Component.
  const [myPokemons, setMyPokemons] = useState([])

  // useEffect to fetch data and store it into state.
  useEffect(() =>
  {
    fetch("https://pokeapi.co/api/v2/location")
      .then(res => res.json())
      .then(data => 
      {
        // Transform the name values using the toTitleCase function and storing them in a separate object. 
        const transformedData = data.results.map(item => 
        ({
          ...item,
          name: toTitleCase(item.name),
        }));
        // Inserting the new objects to state without keeping the previous state or the initial state.
        setData(transformedData);
      });  
  }, []) // empty list to fetch data only one time.

  // Function to transform this names to Title Case.
  function toTitleCase(string) 
  {
    return string
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

    // Function used as Event Listener to Update the isShown state to false inside the Location Component Rendered in order to stop displaying the Locations.
    function toggleShown()
    {
        setIsShown(prevShown => !prevShown)
    }

  console.log("App Component Rendered")

  // mapping through state to create components to render.
  const list = data.map((item, index) => 
    <Location 
      name={item.name}
      url={item.url}
      key={index}
      index={index}
      click={toggleShown}
      isShown={isShown}
      myPokemons={myPokemons}
      setMyPokemons={setMyPokemons}
    />)

  return (
    <div className="App">
      {list}
    </div>
  );
}

export default App;
