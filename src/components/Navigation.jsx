import  { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/addcard">Add Card</Link>
            <Link to="/card/:id">CardID</Link>
        </nav>
    )
}

export default Navigation;