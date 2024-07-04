// Import necessary functions from React
import { createContext, useEffect, useReducer } from "react";

// Define the initial state for the context
const INITIAL_STATE = {
  user: null,
  loading: false, // Initial loading state is false
  error: null, // Initial error state is null
};

// Attempt to parse the user data from localStorage
const userFromStorage = localStorage.getItem("user");
if (userFromStorage) {
  try {
    INITIAL_STATE.user = JSON.parse(userFromStorage);
  } catch (e) {
    console.error("Error parsing user data from localStorage", e);
    localStorage.removeItem("user");
  }
}

// Create a context with the initial state
export const AuthContext = createContext(INITIAL_STATE);

// Define the reducer function for managing state
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null, // Set user to null
        loading: true, // Set loading to true
        error: null, // Set error to null
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, // Set user to the payload from action
        loading: false, // Set loading to false
        error: null, // Set error to null
      };
    case "LOGIN_FAILURE":
      return {
        user: null, // Set user to null
        loading: false, // Set loading to false
        error: action.payload, // Set error to the payload from action
      };
    case "LOGOUT":
      return {
        user: null, // Set user to null
        loading: false, // Set loading to false
        error: null, // Set error to null
      };
    default:
      return state; // Return the current state if action type is not recognized
  }
};

// Define the context provider component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); // Use useReducer to manage state with the reducer and initial state

  useEffect(() => {
    // Save user to localStorage whenever state.user changes
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user, // Provide user state
        loading: state.loading, // Provide loading state
        error: state.error, // Provide error state
        dispatch, // Provide dispatch function to update state
      }}
    >
      {children} {/* Render children components within the provider */}
    </AuthContext.Provider>
  );
};


