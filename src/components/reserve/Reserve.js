import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"; // Import specific FontAwesome icon

import "./Reserve.css"; // Import the CSS file for styling the Reserve component
import useFetch from "../../hooks/useFetch"; // Import the custom useFetch hook
import { useContext, useState } from "react"; // Import useContext and useState hooks from React
import { SearchContext } from "../../context/SearchContext"; // Import the SearchContext
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

const Reserve = ({ setOpen, hotelId }) => { // Define the Reserve functional component with setOpen and hotelId as props
  const [selectedRooms, setSelectedRooms] = useState([]); // State to track selected rooms
  const { data, loading, error } = useFetch(`https://thela-bookings-backend.onrender.com/api/hotels/room/${hotelId}`); // Fetch data for rooms based on hotelId
  const { dates } = useContext(SearchContext); // Access dates from SearchContext

  const getDatesInRange = (startDate, endDate) => { // Function to get all dates in a given range
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime()); // Push each date in milliseconds
      date.setDate(date.getDate() + 1); // Increment date by one day
    }

    return dates; // Return array of dates in the range
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate); // Get all dates in the selected date range

  const isAvailable = (roomNumber) => { // Function to check if a room is available
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound; // Return true if room is available, false otherwise
  };

  const handleSelect = (e) => { // Handler for selecting/deselecting rooms
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value] // Add room to selectedRooms if checked
        : selectedRooms.filter((item) => item !== value) // Remove room from selectedRooms if unchecked
    );
  };

  const navigate = useNavigate(); // Hook for navigation

  const handleClick = async () => { // Handler for the "Reserve Now!" button click
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`https://thela-bookings-backend.onrender.com/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data; // Update room availability for selected dates
        })
      );
      setOpen(false); // Close the modal
      navigate("/"); // Navigate to home page
    } catch (err) {}
  };

  return (
    <div className="reserve"> {/* Main container for the reserve modal */}
      <div className="rContainer"> {/* Inner container */}
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)} // Close the modal on icon click
        />
        <span>Select your rooms:</span> {/* Title */}
        {data.map((item) => ( // Iterate over fetched room data
          <div className="rItem" key={item._id}> {/* Container for each room */}
            <div className="rItemInfo"> {/* Container for room information */}
              <div className="rTitle">{item.title}</div> {/* Room title */}
              <div className="rDesc">{item.desc}</div> {/* Room description */}
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b> {/* Maximum people allowed */}
              </div>
              <div className="rPrice">{item.price}</div> {/* Room price */}
            </div>
            <div className="rSelectRooms"> {/* Container for room selection checkboxes */}
              {item.roomNumbers.map((roomNumber) => ( // Iterate over room numbers
                <div className="room"> {/* Container for each room number */}
                  <label>{roomNumber.number}</label> {/* Room number label */}
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect} // Handle checkbox change
                    disabled={!isAvailable(roomNumber)} // Disable checkbox if room is not available
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton"> {/* Button to reserve selected rooms */}
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve; // Export the Reserve component as the default export
