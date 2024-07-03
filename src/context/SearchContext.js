import { createContext, useReducer } from "react"; // Import necessary functions from React

const INITIAL_STATE = { // Define the initial state for the context
  city: undefined, // Initially, no city is selected
  dates: [], // Initially, no dates are selected
  options: { // Initial options for the search
    adult: undefined, // Number of adults is not set initially
    children: undefined, // Number of children is not set initially
    room: undefined, // Number of rooms is not set initially
  },
};

export const SearchContext = createContext(INITIAL_STATE); // Create a context with the initial state

const SearchReducer = (state, action) => { // Define the reducer function for managing state
  switch (action.type) { // Handle different action types
    case "NEW_SEARCH": // Action type for a new search
      return action.payload; // Return the payload as the new state
    case "RESET_SEARCH": // Action type for resetting the search
      return INITIAL_STATE; // Return the initial state
    default: // Default case if action type is not recognized
      return state; // Return the current state
  }
};

export const SearchContextProvider = ({ children }) => { // Define the context provider component
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE); // Use useReducer to manage state with the reducer and initial state

  return (
    <SearchContext.Provider
      value={{
        city: state.city, // Provide city state
        dates: state.dates, // Provide dates state
        options: state.options, // Provide options state
        dispatch, // Provide dispatch function to update state
      }}
    >
      {children} {/* Render children components within the provider */}
    </SearchContext.Provider>
  );
};
