import useFetch from "../../hooks/useFetch"; // Importing a custom hook named useFetch for making API requests
import "./Featured.css"; // Importing styles specific to Featured component

const Featured = () => { // Define a functional component named Featured
  const { data, loading, error } = useFetch( // Destructuring values returned by useFetch hook for fetching hotel counts by city
    "/hotels/countByCity?cities=Pretoria,Durban,Mpumalanga"
  );

  return (
    <div className="featured"> {/* Start of JSX: parent container with class featured */}
      {loading ? ( // Conditional rendering based on loading state
        "Loading please wait" // Display "Loading please wait" if data is still loading
      ) : (
        <>
          <div className="featuredItem"> {/* Container for featured item 1 */}
            <img
              src="https://a0.muscache.com/im/pictures/miso/Hosting-43353319/original/7017cf48-60fe-45bd-9a2f-e9902503adca.jpeg?im_w=720" // Image source for Pretoria
              alt="" // Empty alt attribute
              className="featuredImg" // CSS class for styling the image
            />
            <div className="featuredTitles"> {/* Container for titles related to Pretoria */}
              <h1>Pretoria</h1> {/* Heading for Pretoria */}
              <h2>{data[0]} properties</h2> {/* Display count of properties in Pretoria */}
            </div>
          </div>

          <div className="featuredItem"> {/* Container for featured item 2 */}
            <img
              src="https://a0.muscache.com/im/pictures/d79d0555-7014-498f-b033-6f5d45837b80.jpg?im_w=720" // Image source for Durban
              alt="" // Empty alt attribute
              className="featuredImg" // CSS class for styling the image
            />
            <div className="featuredTitles"> {/* Container for titles related to Durban */}
              <h1>Durban</h1> {/* Heading for Durban */}
              <h2>{data[1]} properties</h2> {/* Display count of properties in Durban */}
            </div>
          </div>

          <div className="featuredItem"> {/* Container for featured item 3 */}
            <img
              src="https://a0.muscache.com/im/pictures/miso/Hosting-637320698046028196/original/d499b998-5af5-4be5-aaa2-7e27d8652f28.jpeg?im_w=720" // Image source for Mpumalanga
              alt="" // Empty alt attribute
              className="featuredImg" // CSS class for styling the image
            />
            <div className="featuredTitles"> {/* Container for titles related to Mpumalanga */}
              <h1>Mpumalanga</h1> {/* Heading for Mpumalanga */}
              <h2>{data[1]} properties</h2> {/* Display count of properties in Mpumalanga */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured; // Export the Featured component for use in other parts of the application
