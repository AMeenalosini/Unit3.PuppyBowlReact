/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */

import { useGetPuppyQuery, useDeletePuppyMutation } from "./puppySlice";

export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // TODO: Grab data from the `getPuppy` query

  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked
  //const { data, isLoading } = useGetPuppyQuery(selectedPuppyId, { skip: !selectedPuppyId });
  const { data: puppy, isLoading, isError } = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId,
  });
  
 // Debugging: Log API response
 console.log("Selected Puppy ID:", selectedPuppyId);
 console.log("API Response:", puppy);

 const puppy1 = puppy?.data?.player; // Ensure correct data extraction
 console.log("puppy1 :" , puppy1);
  const [deletePuppy] = useDeletePuppyMutation();

  async function removePuppy(id) {
    await deletePuppy(id);
    setSelectedPuppyId(null);
  }

  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  //  2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  } else if (isError || !puppy) {
    $details = <p>Failed to load puppy details. Please try again.</p>;
  // 3. Information about the selected puppy has returned from the API.
  }else {
    $details = (
      <>
        <h3>
          {puppy1.name} #{puppy1.id}
        </h3>
        <p>{puppy1.breed}</p>
        <p>Team {puppy1.team?.name ?? "Unassigned"}</p>
        <button onClick={() => removePuppy(puppy1.id)}>
          Remove from roster
        </button>
        <figure>
          <img src={puppy1.imageUrl} alt={puppy1.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
