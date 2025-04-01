import { useState } from "react";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { Routes, Route } from "react-router-dom";

import PuppyDetails from "./features/puppies/PuppyDetails";
import PuppyList from "./features/puppies/PuppyList";
import PuppyForm from "./features/puppies/PuppyForm";

import "./App.scss";

/**
 * @component
 * This app shows a list of puppy bowl players from the API.
 * Users can view players in the roster, add a player to the roster,
 * see more details about a specific player, and remove a player from the roster.
 */
export default function App() {


  return (
    <Provider store={store}>
      <h1>Puppy Bowl</h1>
      <PuppyForm />
      <main>
        <Routes>
        <Route path="/" element={<PuppyList />} />
        <Route path="/players/:puppyId" element={<PuppyDetails />} />
      </Routes>
      </main>
    </Provider>
  );
}
