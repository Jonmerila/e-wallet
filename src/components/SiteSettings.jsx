import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { removeCard } from "../redux/cardSlice";
import currentTheme from "../utils/helperFuncs/getCurrentTheme";
import styles from "./globalStyles.module.css";
import setButtonTheme from "../utils/helperFuncs/setButtonTheme";
import { setTheme } from "../redux/themeSlice";
function SiteSettings() {

    
    const cards = useSelector(state => state.cards.cards);
    const dispatch = useDispatch();
    const activeTheme = useSelector((state) => state.theme);
    const [formSelectedTheme, setFormSelectedTheme] = useState(currentTheme());
    let [selectedTheme, setselectedTheme] = useState(currentTheme());
    console.log("selTHeme", selectedTheme);

   
    const handleTheme = (e) => {
        e.preventDefault();
        console.log("Handled theme", selectedTheme);
        setselectedTheme(formSelectedTheme);
        dispatch(setTheme(selectedTheme))
        localStorage.setItem("theme", selectedTheme);
    }

    const removeInactiveCards = () => {
        let confirm = window.confirm("Are you sure you want to delete ALL inactive cards?");
        if(confirm){
            let inactive = cards.filter((c) => c.isActive == false);
            inactive.map((c) => dispatch(removeCard(c)))
        }
        return;
    }

    

    useEffect(() => {
        document.body.classList.remove('red-theme', 'dark-theme', 'color-crazy-theme');
        document.body.classList.add(`${selectedTheme}-theme`);
    }, [selectedTheme]);


    return ( 
        <>
            <h2>Settings</h2>
            <h3>Theme Selector</h3>
            <div className={`${styles.container} ${styles[selectedTheme]}`}>
                <form action="" onSubmit={handleTheme}>
                <select 
                    name="theme" 
                    id="themeSelect" 
                    onChange={(e) => setFormSelectedTheme(e.target.value)}
                    value={formSelectedTheme}>
                    <option value="red">Red</option>
                    <option value="dark">Dark</option>
                    <option value="color-crazy">Color-crazy</option>
                </select>
                <button
                    type="submit"
                    className={setButtonTheme(selectedTheme)}
                    // onClick={}
                    >
                    Set Theme
                </button>
                </form>
                <h3>Remove all inactive cards</h3>
                <button onClick={removeInactiveCards}
                className={setButtonTheme(selectedTheme)}
                >Remove</button>
            </div>
            
        </>
     );
}

export default SiteSettings;