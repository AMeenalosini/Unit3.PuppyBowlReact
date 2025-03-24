/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
import { useState } from "react";
import { useGetPuppiesQuery } from "./puppySlice";
import Searchbar from "./Searchbar";

export default function PuppyList({ setSelectedPuppyId }) {
  const { data: puppies, error, isLoading } = useGetPuppiesQuery();
  const [searchParameter, setSearchParameter] = useState("");

  console.log("puppies:", puppies);
  let animalsToDisplay = [];

  if (puppies?.data?.players) {
    console.log("players array:", puppies.data.players);
    animalsToDisplay =
    searchParameter !== "" && puppies.data.players
      ? puppies.data.players.filter(
          (animal) =>
            animal.name.toUpperCase().includes(searchParameter.toUpperCase()) ||
            animal.breed.toLowerCase().includes(searchParameter.toLowerCase())
        )
      : puppies.data.players;
  }
  

  if (error) {
    console.error("Error fetching puppies:", error);
  }

  return (
    <article>
       <Searchbar
        searchParameter={searchParameter}
        setSearchParameter={setSearchParameter}
      />
      <h2>Roster</h2>
      
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {!isLoading && animalsToDisplay.length > 0 && animalsToDisplay.map((p) => (
          console.log("puppiesmap:", animalsToDisplay),
          <li key={p.id}>
            <h3>{p.name} #{p.id}</h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button onClick={() => setSelectedPuppyId(p.id)}>See details</button>
          </li>
        ))}
        {!isLoading && (animalsToDisplay.length === 0) && <li>No puppies found.</li>}
      </ul>
    </article>
  );
}

