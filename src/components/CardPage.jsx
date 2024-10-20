import CardConfig from "./CardConfig";
import Card from "./Card";
import styles from "./globalStyles.module.css";
import setButtonTheme from "../utils/helperFuncs/setButtonTheme";
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
    const theme = localStorage.getItem("theme");
    const navigate = useNavigate();
    const {id} = useParams();
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

    useEffect(() => {
        console.log("uniCard value:", uniCard); 
        if (!uniCard) {
            alert("No card found on this page.");
            navigate("/"); 
        }
    }, [uniCard, navigate]);

    useEffect(() => {
        document.body.classList.remove('red-theme', 'dark-theme', 'color-crazy-theme');
        document.body.classList.add(`${theme}-theme`);
    }, [theme]);

    return ( 
        <>
           {uniCard && (
            <Card card={formData} />
        )}
        
        
            {edit && 
            <form className={`${styles.formContainer} ${theme}`} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="cardIssuer">Card Issuer:</label>
            <select
                name="cardIssuer"
                value={formData.cardIssuer}
                onChange={handleChange}
                required
                className={styles.inputField}
            >
                <option value="Bank Name">Select a bank</option>
                <option value="Pinnacle Bank">Pinnacle Bank</option>
                <option value="Horizon Financial">Horizon Financial</option>
                <option value="Silver Oak Bank">Silver Oak Bank</option>
            </select>
            {errors.cardIssuer && <span className={styles.error}>{errors.cardIssuer}</span>}
            
            <label className={styles.label} htmlFor="cardNumber">Card Number:</label>
            <input
                type="text" // Change type to "text"
                placeholder="XXXX XXXX XXXX XXXX"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => {
                    const value = e.target.value;
                    // Use regex to allow only digits and limit to 16 characters
                    if (/^\d{0,16}$/.test(value)) {
                        handleChange(e); // Call your original change handler
                    }
                }}
                className={styles.inputField}
                required
            />
            {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}
            
            <label className={styles.label} htmlFor="cardHolder">Cardholder:</label>
            <input
                type="text"
                placeholder="Name"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                required
                className={styles.inputField}
            />
            {errors.cardHolder && <span className={styles.error}>{errors.cardHolder}</span>}
            
            <label className={styles.label} htmlFor="expireMonth">Expire Month(1-12):</label>
            <input
                type="text" // Change to text
                name="expireMonth"
                placeholder="MM"
                value={formData.expireMonth}
                onChange={(e) => {
                    const value = e.target.value;
                    // Allow only 2-digit numbers
                    if (/^\d{0,2}$/.test(value)) {
                        handleChange(e);
                    }
                }}
                required
                className={styles.inputField}
            />
            {errors.expireMonth && <span className={styles.error}>{errors.expireMonth}</span>}
            
            <label className={styles.label} htmlFor="expireYear">Expire Year:</label>
            <input
                type="text" // Change to text
                name="expireYear"
                placeholder="YY"
                value={formData.expireYear}
                onChange={(e) => {
                    const value = e.target.value;
                    // Allow only 2-digit numbers
                    if (/^\d{0,2}$/.test(value)) {
                        handleChange(e);
                    }
                }}
                required
                className={styles.inputField}
            />
            {errors.expireYear && <span className={styles.error}>{errors.expireYear}</span>}
            
            <label className={styles.label} htmlFor="ccv">CCV:</label>
            <input
                type="text" // Keep as text to control input length
                name="ccv"
                placeholder="XXX"
                value={formData.ccv}
                onChange={(e) => {
                    const value = e.target.value;
                    // Allow only 3-digit numbers
                    if (/^\d{0,3}$/.test(value)) {
                        handleChange(e);
                    }
                }}
                required
                className={styles.inputField}
            />
            {errors.ccv && <span className={styles.error}>{errors.ccv}</span>}
            
            <button type="submit" className={setButtonTheme(theme)}>Done</button>
        </form>

    }

    <button onClick={handleToggle}>
        {uniCard?.isActive ? "Deactivate" : "Activate"}
    </button>
    {!edit && uniCard?.isActive == false && <button onClick={() => {editMode()}}>Edit</button>}
    {uniCard?.isActive == false && <button onClick={deleteUniCard}>Remove Card</button>}
        </>
     );
}

export default CardPage;