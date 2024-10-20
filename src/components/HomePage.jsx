import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import currentTheme from "../utils/helperFuncs/getCurrentTheme";
import setButtonTheme from "../utils/helperFuncs/setButtonTheme";
import Card from "./Card";
import { toggleCardActivation } from "../redux/cardSlice";
import styles from "./globalStyles.module.css";
function HomePage() {

    const dispatch = useDispatch();
    let theme = useSelector((state) => state.theme.theme);
    if(theme !== localStorage.getItem("theme")){
        theme = localStorage.getItem("theme");
    }
    console.log("selectorTHEME", theme);
    const cards = useSelector((state) => state.cards.cards);
   
    let activeCard = cards.find(card => card.isActive);
   

    if(!activeCard){
        activeCard = cards[0];
        dispatch(toggleCardActivation({id: activeCard.id}));
        console.log("NEW ACTIVE", activeCard);
    }
    const inactiveCards = cards.filter(card => !card.isActive);

    useEffect(() => {
        document.body.classList.remove('red-theme', 'dark-theme', 'color-crazy-theme');
        document.body.classList.add(`${theme}-theme`);
    }, [theme]);
    return ( 
    <>
        <h1>Home Page</h1>
        <div className={`container ${styles[theme]}`}>
            <div className={styles.activeContainer}>
                <h3>Active Card</h3>
                <Card card={activeCard}/>
            </div>
            <div className={styles.cardList}>
                <h3>Inactive Cards</h3>
                {inactiveCards.map((card, i) => <Card key={i} card={card}/>)}
                
            </div>
            <Link to="/addcard"><button className={setButtonTheme(theme)}>Add new card</button></Link>
        </div>
        
    </> );
}

export default HomePage;