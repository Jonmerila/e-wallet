import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Card from "./Card";
import { toggleCardActivation } from "../redux/cardSlice";
function HomePage() {

    const dispatch = useDispatch();
    const cards = useSelector((state) => state.cards.cards);
    let activeCard = cards.find(card => card.isActive);
    if(!activeCard){
        activeCard = cards[0];
        dispatch(toggleCardActivation({id: activeCard.id}));
        console.log("NEW ACTIVE", activeCard);
    }
    const inactiveCards = cards.filter(card => !card.isActive);


    return ( 
    <>
        <h1>Home Page</h1>

        <div className="activeCard">
            <p>Active Card</p>
            <Link to={`card/${activeCard.id}`}><Card card={activeCard}/></Link>
        </div>
        <div className="cardList">
            <p>Inactive Cards</p>
            {inactiveCards.map((card, i) => <Link to={`card/${card.id}`} ><Card  key={i} card={card}/></Link>)}
             
        </div>
        <Link to="/addcard"><button>Add new card</button></Link>
    </> );
}

export default HomePage;