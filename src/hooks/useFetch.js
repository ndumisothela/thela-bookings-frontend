import { useEffect, useState } from "react"; // Import necessary functions from React
import axios from "axios"; // Import Axios for making HTTP requests

const useFetch = (url) => { // Define a custom hook named useFetch that takes a URL parameter
  const [data, setData] = useState([]); // State to hold fetched data, initialized as an empty array
  const [loading, setLoading] = useState(false); // State to manage loading status, initialized as false
  const [error, setError] = useState(false); // State to hold error information, initialized as false

  useEffect(() => { // useEffect hook to fetch data when the component mounts or URL changes
    const fetchData = async () => { // Define an asynchronous function to fetch data
      setLoading(true); // Set loading state to true while fetching data
      try {
        const res = await axios.get(url); // Send GET request to specified URL using Axios
        setData(res.data); // Update data state with fetched data
      } catch (err) {
        setError(err); // If an error occurs during fetch, set error state with the error object
      }
      setLoading(false); // Set loading state back to false after fetching completes (success or error)
    };
    fetchData(); // Call the fetchData function immediately upon component mount or URL change
  }, [url]); // Dependency array ensures useEffect runs whenever the URL changes

  const reFetch = async () => { // Define a function to refetch data manually
    setLoading(true); // Set loading state to true before refetching
    try {
      const res = await axios.get(url); // Send GET request again to the same URL
      setData(res.data); // Update data state with the new fetched data
    } catch (err) {
      setError(err); // If an error occurs during refetch, set error state with the error object
    }
    setLoading(false); // Set loading state back to false after refetching completes (success or error)
  };

  return { data, loading, error, reFetch }; // Return an object containing data, loading status, error, and refetch function
};

export default useFetch; // Export the useFetch hook function to be used in other components
