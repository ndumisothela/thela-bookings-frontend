import "./ThankYou.css";
import {Link} from "react-router-dom";

const ThankYou =()=>{
    return(
        <div className="thanks">
            <h1 className="ty">Thank You</h1>
        <p className="see">See you soon </p>
        <Link to="/">
        <button>HOME</button>
        </Link>
        </div>
        
    )
}
export default ThankYou;