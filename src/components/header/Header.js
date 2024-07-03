import { // Import specific icons from the FontAwesome library
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component to use the icons
import "./Header.css"; // Import the CSS file for styling the Header component
import { DateRange } from "react-date-range"; // Import the DateRange component from react-date-range for date selection
import { useContext, useState } from "react"; // Import hooks from React
import "react-date-range/dist/styles.css"; // Import the main CSS file for react-date-range
import "react-date-range/dist/theme/default.css"; // Import the default theme CSS file for react-date-range
import { format } from "date-fns"; // Import the format function from date-fns for date formatting
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from react-router-dom for navigation
import { SearchContext } from "../../context/SearchContext"; // Import the SearchContext to manage search-related state
import { AuthContext } from "../../context/AuthContext"; // Import the AuthContext to manage authentication-related state

const Header = ({ type }) => { // Define the Header component, accepting a 'type' prop
const [destination, setDestination] = useState(""); // Define state for the destination input
const [openDate, setOpenDate] = useState(false); // Define state to toggle the date picker visibility
const [dates, setDates] = useState([ // Define state for the selected dates
  {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
]);
const [openOptions, setOpenOptions] = useState(false); // Define state to toggle the options dropdown visibility
const [options, setOptions] = useState({ // Define state for the options (adults, children, rooms)
  adult: 1,
  children: 0,
  room: 1,
});

const navigate = useNavigate(); // Get the navigate function for programmatic navigation
const { user } = useContext(AuthContext); // Get the current user from the AuthContext

const handleOption = (name, operation) => { // Define a function to handle increment/decrement of options
  setOptions((prev) => {
    return {
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    };
  });
};

const { dispatch } = useContext(SearchContext); // Get the dispatch function from the SearchContext

const handleSearch = () => { // Define the search handler
  dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } }); // Dispatch a new search action
  navigate("/hotels", { state: { destination, dates, options } }); // Navigate to the hotels page with search parameters
};

return (
  <div className="header"> {/* Parent container with class 'header' */}
    <div
      className={
        type === "list" ? "headerContainer listMode" : "headerContainer"
      }
    > {/* Conditionally apply 'listMode' class if type is 'list' */}
      <div className="headerList"> {/* Container for header list items */}
        <div className="headerListItem active"> {/* List item with 'active' class */}
          <FontAwesomeIcon icon={faBed} /> {/* Display the bed icon */}
          <span>Stays</span> {/* Label for the list item */}
        </div>
        <div className="headerListItem"> {/* List item */}
          <FontAwesomeIcon icon={faPlane} /> {/* Display the plane icon */}
          <span>Flights</span> {/* Label for the list item */}
        </div>
        <div className="headerListItem"> {/* List item */}
          <FontAwesomeIcon icon={faCar} /> {/* Display the car icon */}
          <span>Car rentals</span> {/* Label for the list item */}
        </div>
        <div className="headerListItem"> {/* List item */}
          <FontAwesomeIcon icon={faBed} /> {/* Display the bed icon */}
          <span>Attractions</span> {/* Label for the list item */}
        </div>
        <div className="headerListItem"> {/* List item */}
          <FontAwesomeIcon icon={faTaxi} /> {/* Display the taxi icon */}
          <span>Airport taxis</span> {/* Label for the list item */}
        </div>
      </div>
      {type !== "list" && ( // Conditionally render the following block if type is not 'list'
        <>
          <h1 className="headerTitle">
            A lifetime of discounts? It's Genius.
          </h1> {/* Promotional title */}
          <p className="headerDesc">
            Get rewarded for your travels – unlock instant savings of 10% or
            more with a free Thela-booking account
          </p> {/* Promotional description */}
          {!user && <button className="headerBtn">Sign in / Register</button>} {/* Sign in / Register button if user is not logged in */}
          <div className="headerSearch"> {/* Container for the search inputs */}
            <div className="headerSearchItem"> {/* Search input for destination */}
              <FontAwesomeIcon icon={faBed} className="headerIcon" /> {/* Bed icon */}
              <input
                type="text"
                placeholder="Where are you going?"
                className="headerSearchInput"
                onChange={(e) => setDestination(e.target.value)} // Update destination state on input change
              />
            </div>
            <div className="headerSearchItem"> {/* Search input for dates */}
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" /> {/* Calendar icon */}
              <span
                onClick={() => setOpenDate(!openDate)} // Toggle date picker visibility on click
                className="headerSearchText"
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span> {/* Display formatted date range */}
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])} // Update dates state on date selection
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()} // Prevent selecting past dates
                />
              )}
            </div>
            <div className="headerSearchItem"> {/* Search input for options */}
              <FontAwesomeIcon icon={faPerson} className="headerIcon" /> {/* Person icon */}
              <span
                onClick={() => setOpenOptions(!openOptions)} // Toggle options dropdown visibility on click
                className="headerSearchText"
              >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span> {/* Display selected options */}
              {openOptions && (
                <div className="options">
                  <div className="optionItem"> {/* Option item for adults */}
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.adult <= 1} // Disable button if adult count is 1 or less
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "d")} // Decrement adult count
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.adult}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "i")} // Increment adult count
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem"> {/* Option item for children */}
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.children <= 0} // Disable button if children count is 0 or less
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "d")} // Decrement children count
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.children}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "i")} // Increment children count
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem"> {/* Option item for rooms */}
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.room <= 1} // Disable button if room count is 1 or less
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "d")} // Decrement room count
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.room}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "i")} // Increment room count
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/*Search button*/} 
            <div className="headerSearchItem"> 
              <button className="headerBtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);
};

export default Header; // Export the Header component for use in other parts of the application
