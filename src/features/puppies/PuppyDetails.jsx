/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
import React from "react";
import { useParams } from "react-router-dom";
import { useGetPuppyQuery } from "./puppySlice";
import { useSelector } from "react-redux";
import { getUserId } from "../users/userSlice";

export default function PuppyDetails() {
  
  const userId = useSelector(getUserId);
  

  const { puppyId } = useParams();
  const { data, isLoading, error } = useGetPuppyQuery(puppyId);

  console.log("check", data);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Something went wrong! Please try again.</h2>
      </div>
    );
  }

  const {
    id,
    name,
    breed,
    status,
    imageUrl,
    teamId,
    team,
  } = data?.data?.player; 
  



  return (
    <section className="detail">
  
     
        <div className="detail_intro">
          <div>
            <h2>{name}</h2>
          </div>
        </div>
   
      <div className="detail_body">
        <div
          className="img_body"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div>
        <div className="flex">
            <p>Name:</p>
            <span>{name}</span>
          </div>

          <div className="flex">
            <p>Status:</p>
            <span>{status}</span>
          </div>
          
          <div className="flex">
            <p>Breed:</p>
            <span className="capitalized"> {breed}</span>
          </div>

          <div className="flex">
            <p>TeamId:</p>
            <span className="capitalized"> {teamId}</span>
          </div>
        </div>
      </div>

    </section>
  );
}


