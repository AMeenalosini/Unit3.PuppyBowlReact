/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
import { useState } from "react";
import { useGetPuppiesQuery } from "./puppySlice";
import Searchbar from "./Searchbar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeletePuppyMutation } from "./puppySlice";

export default function PuppyList({}) {
  const navigate = useNavigate();
  const { data: puppies, error, isLoading } = useGetPuppiesQuery();
  const [searchParameter, setSearchParameter] = useState("");
  const [deletePuppy] = useDeletePuppyMutation();

  if (isLoading) {
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2>Bummer, it broke. Try again in a bit.</h2>
      </section>
    );
  }

    async function removePuppy(id) {
    await deletePuppy(id);
  }

  let animalsToDisplay = [];

  if (puppies?.data?.players) {
    //console.log("players array:", puppies.data.players);
    animalsToDisplay =
    searchParameter !== "" && puppies.data.players
      ? puppies.data.players.filter(
          (animal) =>
            animal.name.toUpperCase().includes(searchParameter.toUpperCase()) ||
            animal.breed.toLowerCase().includes(searchParameter.toLowerCase())
        )
      : puppies.data.players;
  }


    return (
      <section className="puppies">
        <Searchbar
          searchParameter={searchParameter}
          setSearchParameter={setSearchParameter}
        />
        {animalsToDisplay.map((animalObj) => (
          <div className="card" key={animalObj.id}>
            <div
              className="img"
              style={{ backgroundImage: `url(${animalObj.imageUrl})` }}
            />
            <h2>{animalObj.name}</h2>
            <div className="button-group">
            <button onClick={() => navigate(`/players/${animalObj.id}`)}>
              See Details
            </button>
            <button onClick={() => removePuppy(animalObj.id)}>
              Remove from roster
            </button>
            </div>
          </div>
        ))}
      </section>
    );
  }



