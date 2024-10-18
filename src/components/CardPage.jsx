import CardConfig from "./CardConfig";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { removeCard, editCard, toggleCardActivation } from "../redux/cardSlice";
import validateInput from "../utils/helperFuncs/validateInput";

function CardPage() {
    let [edit, setEdit] = useState(false);
    let [card, setCard] = useState({});
    let [errors, setErrors] = useState({});
    let [formData, setFormData] = useState({});

    

    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const cards = useSelector((state) => state.cards.cards);
    let uniCard = cards.find((c) => c.id == id);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const [validationErrors, err] = validateInput(formData);
        console.log("VALIERRORS", validationErrors);
        if (validationErrors) {
            setErrors(err);
            console.log("ERRORS FOUND", errors);
            return; 
        }
        
        setCard(formData);
        setFormData({
            cardIssuer: "",
            cardNumber: "",
            cardHolder: "",
            expireMonth: "",
            expireYear: "",
            ccv: "",
            isActive: true,
        });

            
        console.log("FORMDATA", formData);
        setErrors({});
        setEdit(!edit);
        dispatch(editCard({ ...formData, id }));
        
    }


    const deleteUniCard = () => {
        
        const confirmed = window.confirm("Are you sure you want to delete this card?");
        if (confirmed) {
        dispatch(removeCard(uniCard)); 
        navigate("/"); 
        }
    }

    const editMode = () => {
        console.log("UNICARD", uniCard);
        setEdit(!edit);
        if (uniCard) {
            const { id, ...cardWithoutId } = uniCard; // Destructure to omit id
            setFormData(cardWithoutId); 
        }
    };

    const handleToggle = () => {
        if(uniCard.isActive == false){
            const currentActive = cards.find((c) => c.isActive == true);
            console.log("Current active card", currentActive);
            dispatch(toggleCardActivation({ id: currentActive.id}))
        }
        dispatch(toggleCardActivation({ id: uniCard.id }));
    };

    useEffect(() => {
        console.log("UNI", uniCard);
        if (uniCard) {
            console.log("Setting form data...");
            setFormData({
                cardIssuer: uniCard.cardIssuer,
                cardNumber: uniCard.cardNumber,
                cardHolder: uniCard.cardHolder,
                expireMonth: uniCard.expireMonth,
                expireYear: uniCard.expireYear,
                ccv: uniCard.ccv,
                isActive: uniCard.isActive,
            });
        }
    }, [edit, uniCard]);

    return ( 
        <>
           {uniCard && (
            <Card card={formData} />
        )}
        <button onClick={handleToggle}>
            {uniCard.isActive ? "Deactivate" : "Activate"}
        </button>
        
            {edit && 
            <form onSubmit={handleSubmit}>
            <label htmlFor="cardIssuer">Card Issuer:</label>
            <select
                name="cardIssuer"
                value={formData.cardIssuer}
                onChange={handleChange}
                required
            >
                <option value="">Select a bank</option>
                <option value="Bank A">Bank A</option>
                <option value="Bank B">Bank B</option>
                <option value="Bank C">Bank C</option>
            </select>
            {errors.cardIssuer && <br /> && <span className="error">{errors.cardIssuer}</span>}
            <br />
    
            <label htmlFor="cardNumber">Card Number:</label>
            <input
                placeholder="XXXX XXXX XXXX XXXX"
                type="number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                // maxLength={16}
            />
           
             {errors.cardNumber && <br /> && <span className="error">{errors.cardNumber}</span>}
             <br />
    
            <label htmlFor="cardHolder">Cardholder:</label>
            <input
                type="text"
                placeholder="Name"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                required
            />
           
            {errors.cardHolder && <br /> && <span className="error">{errors.cardHolder}</span>}
            <br />
            <label htmlFor="expireMonth">Expire Month:</label>
            <input
                type="number"
                name="expireMonth"
                placeholder="MM"
                value={formData.expireMonth}
                onChange={handleChange}
                required
            />
            
            {errors.expireMonth && <br /> && <span className="error">{errors.expireMonth}</span>}
            <br />
    
            <label htmlFor="expireYear">Expire Year:</label>
            <input
                type="number"
                name="expireYear"
                placeholder="YY"
                value={formData.expireYear}
                onChange={handleChange}
                required
            />
             
            {errors.expireYear && <br /> && <span className="error">{errors.expireYear}</span>}
            <br />
    
            <label htmlFor="ccv">CCV:</label>
            <input
                type="text"
                name="ccv"
                placeholder="XXX"
                value={formData.ccv}
                onChange={handleChange}
                required
            />
             
            {errors.ccv && <br /> && <span className="error">{errors.ccv}</span>}
            <br />
    
           
    
            <button type="submit">Done</button>
            </form>
            
    }

    {!edit && uniCard?.isActive == false && <button onClick={() => {editMode()}}>Edit</button>}
    {uniCard?.isActive == false && <button onClick={deleteUniCard}>Remove Card</button>}
        </>
     );
}

export default CardPage;