import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../redux/cardSlice";
import styles from "./globalStyles.module.css";
import Card from "./Card";
import validateInput from "../utils/helperFuncs/validateInput";
import setButtonTheme from "../utils/helperFuncs/setButtonTheme";
import currentTheme from "../utils/helperFuncs/getCurrentTheme";


function CardConfig(card) {
//    let hasErrors, errors;
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.cards.cards);
    let [errors, setErrors] = useState({});
    const theme = currentTheme();
    //Check if card is edited or created
    if(!card){}
    


    let [formData, setFormData] = useState({
        cardIssuer: "",
        cardNumber: "",
        cardHolder: "",
        expireMonth: "",
        expireYear: "",
        ccv: "",
        isActive: false,
    });

    // let [cardDisplay, setCardDisplay] = useState({});
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        // if (name === "cardNumber") {
        //     const formattedValue = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
        //     setFormData({ ...formData, [name]: formattedValue });
        // } else {
        //     setFormData({ ...formData, [name]: value });
        // }

        // setCardDisplay({ ...formData, [name]: value});
        setFormData({ ...formData, [name]: value });
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

        let highId = cards.reduce((max, card) => (card.id > max ? card.id : max), 0);
        let nextId = highId + 1;

        const newCard = {
            ...formData,
            id: nextId,
        };


        dispatch(addCard(newCard));
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
    }

    useEffect(() => {
        document.body.classList.remove('red-theme', 'dark-theme', 'color-crazy-theme');
        document.body.classList.add(`${theme}-theme`);
    }, [theme]);

    

    return (
        <>
            <h2>Card Config</h2>
            <Card card={formData} />
            <form className={`${styles.formContainer} ${theme}`} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="cardIssuer">Card Issuer:</label>
                <select
                    name="cardIssuer"
                    value={formData.cardIssuer}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                >
                    <option value="">Select a bank</option>
                    <option value="Pinnacle Bank">Pinnacle Bank</option>
                    <option value="Horizon Financial">Horizon Financial</option>
                    <option value="Silver Oak Bank">Silver Oak Bank</option>
                </select>
                {errors.cardIssuer && <span className={styles.error}>{errors.cardIssuer}</span>}
                
                <label className={styles.label} htmlFor="cardNumber">Card Number:</label>
                <input
                    placeholder="XXXX XXXX XXXX XXXX"
                    type="number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength={16}
                    required
                    className={styles.inputField}
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
                
                <label className={styles.label} htmlFor="expireMonth">Expire Month:</label>
                <input
                    type="number"
                    name="expireMonth"
                    placeholder="MM"
                    value={formData.expireMonth}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
                {errors.expireMonth && <span className={styles.error}>{errors.expireMonth}</span>}
                
                <label className={styles.label} htmlFor="expireYear">Expire Year:</label>
                <input
                    type="number"
                    name="expireYear"
                    placeholder="YY"
                    value={formData.expireYear}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
                {errors.expireYear && <span className={styles.error}>{errors.expireYear}</span>}
                
                <label className={styles.label} htmlFor="ccv">CCV:</label>
                <input
                    type="text"
                    name="ccv"
                    placeholder="XXX"
                    value={formData.ccv}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
                {errors.ccv && <span className={styles.error}>{errors.ccv}</span>}
                
                <button type="submit" className={setButtonTheme(theme)}>Add Card</button>
            </form>
        </>
    );
}

export default CardConfig;