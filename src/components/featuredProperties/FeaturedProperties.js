import useFetch from "../../hooks/useFetch"; // Importing a custom hook named useFetch for making API requests
import "./FeaturedProperties.css"; // Importing styles specific to FeaturedProperties component

const FeaturedProperties = () => { // Define a functional component named FeaturedProperties
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4"); // Destructuring values returned by useFetch hook for fetching featured hotels data

  return (
    <div className="fp"> {/* Start of JSX: parent container with class fp */}
      {loading ? ( // Conditional rendering based on loading state
        "Loading" // Display "Loading" if data is still loading
      ) : (
        <> {/* Fragment shorthand syntax for JSX */}
          {data.map((item) => ( // Mapping through data array to render each hotel item
            <div className="fpItem" key={item._id}> {/* Container for each hotel item with unique key */}
              {item.photos && item.photos.length > 0 && ( // Conditional rendering for displaying image if photos array exists and has at least one item
                <img
                  src={item.photos[0]} // Displaying the first photo in the photos array
                  alt="" // Empty alt attribute
                  className="fpImg" // CSS class for styling the image
                />
              )}
              
              <span className="fpName">{item.name}</span> {/* Display hotel name */}
              <span className="fpCity">{item.city}</span> {/* Display hotel city */}
              <span className="fpPrice">Starting from R{item.cheapestPrice}</span> {/* Display starting price */}
              {item.rating && ( // Conditional rendering for displaying rating section if rating exists
                <div className="fpRating">
                  <button>{item.rating}</button> {/* Display rating as a button */}
                  <span>Excellent</span> {/* Static text indicating rating quality */}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties; // Export the FeaturedProperties component for use in other parts of the application
