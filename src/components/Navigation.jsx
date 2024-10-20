import  { Link } from "react-router-dom";
import styles from "./globalStyles.module.css";
import { useSelector } from "react-redux";
const Navigation = () => {
    let theme = useSelector((state) => state.theme.theme);
    return (
        <nav className={`${theme}-theme`}>
            <Link to="/">Home</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/addcard">Add</Link>
            <Link to="/card/:id">CardID</Link>
        </nav>
    )
}

export default Navigation;