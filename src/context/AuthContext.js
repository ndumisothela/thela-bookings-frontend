import { createContext, useEffect, useReducer } from "react"; // Import necessary functions from React

const INITIAL_STATE = { // Define the initial state for the context
  user: JSON.parse(localStorage.getItem("user")) || null, // Get user from localStorage if available, otherwise set to null
  loading: false, // Initial loading state is false
  error: null, // Initial error state is null
};

export const AuthContext = createContext(INITIAL_STATE); // Create a context with the initial state

const AuthReducer = (state, action) => { // Define the reducer function for managing state
  switch (action.type) { // Handle different action types
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

export const AuthContextProvider = ({ children }) => { // Define the context provider component
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); // Use useReducer to manage state with the reducer and initial state

  useEffect(() => { // useEffect hook to run side effects
    localStorage.setItem("user", JSON.stringify(state.user)); // Save user to localStorage whenever state.user changes
  }, [state.user]); // Dependency array containing state.user

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
