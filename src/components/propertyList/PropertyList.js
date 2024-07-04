import useFetch from "../../hooks/useFetch"; // Import the useFetch custom hook to fetch data from the API
import "./PropertyList.css"; // Import the CSS file for styling the PropertyList component

const PropertyList = () => { // Define the PropertyList functional component
  const { data, loading } = useFetch("https://thela-bookings-backend.onrender.com/api/hotels/countByType"); // Use the useFetch hook to fetch data from the specified endpoint and extract data and loading state

  const images = [ // Define an array of image URLs for different property types
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  return (
    <div className="pList"> {/* Parent container with class 'pList' */}
      {loading ? ( // Check if data is still loading
        "loading" // Display 'loading' text while data is being fetched
      ) : ( // Once data is loaded
        <>
          {data && // Check if data exists
            images.map((img, i) => ( // Map over the images array and render each image with corresponding data
              <div className="pListItem" key={i}> {/* Container for each property list item with a unique key */}
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                /> {/* Image element for the property with class 'pListImg' */}
                <div className="pListTitles"> {/* Container for the titles */}
                  <h1>{data[i]?.type}</h1> {/* Render the property type */}
                  <h2>{data[i]?.count} {data[i]?.type}</h2> {/* Render the count of properties for each type */}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList; // Export the PropertyList component as the default export
