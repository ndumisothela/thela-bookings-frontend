import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; // Import BrowserRouter, Routes, and Route components from react-router-dom for routing

import Home from "./pages/home/Home"; // Import the Home component
import Hotel from "./pages/hotel/Hotel"; // Import the Hotel component
import List from "./pages/list/List"; // Import the List component
import Login from "./pages/login/Login"; // Import the Login component

function App() { // Define the main App component
  return (
    <BrowserRouter> {/* Wrap the routing structure with BrowserRouter for routing capabilities */}
      <Routes> {/* Define a set of routes */}
        <Route path="/" element={<Home/>}/> {/* Define a route for the home page */}
        <Route path="/hotels" element={<List/>}/> {/* Define a route for the hotel list page */}
        <Route path="/hotels/:id" element={<Hotel/>}/> {/* Define a dynamic route for individual hotel details */}
        <Route path="/login" element={<Login/>}/> {/* Define a route for the login page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App; // Export the App component as the default export
