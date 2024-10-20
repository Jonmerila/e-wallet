import  { Link } from "react-router-dom";
import styles from "./globalStyles.module.css";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
const Navigation = () => {
    // const theme = localStorage.getItem("theme");
    // const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
    const theme = useSelector((state) => state.theme.theme);
    console.log("NAVTHEME", styles[theme]);

    // useEffect(() => {
    //     const handleStorageChange = () => {
    //         const storedTheme = localStorage.getItem("theme");
    //         if (storedTheme) {
    //             setTheme(storedTheme);
    //         }
    //     };

       
    //     window.addEventListener("storage", handleStorageChange);

        
    //     return () => {
    //         window.removeEventListener("storage", handleStorageChange);
    //     };
    // }, []);
    
    return (
    <nav className={styles[theme]}>
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/addcard">Add New Card</Link>
    </nav>
    )
}

export default Navigation;