import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../redux/cardSlice";
import validateInput from "../utils/helperFuncs/validateInput";
import Card from "./Card";


function CardConfig(card) {
//    let hasErrors, errors;
    const dispatch = useDispatch();
    const cards = useSelector((state) => state.cards.cards);
    let [errors, setErrors] = useState({});
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

    

    return ( 
        <>
                <h2>Card Config</h2>
                <Card card={formData}/>
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

       

        <button type="submit">Add Card</button>
        </form>
    

        </>
     );
}

export default CardConfig;