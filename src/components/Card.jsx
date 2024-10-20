import { Link } from "react-router-dom";
import checkBankTheme from "../utils/helperFuncs/checkBankTheme";
import styles from "./globalStyles.module.css";
import bankchip from "../assets/bankchip.png";
function Card({card}) {

   
    const formatCardNumber = (number) => {
        if (!number) return '';
        const cleanNumber = number.replace(/\s+/g, ''); // Remove any existing spaces
        return cleanNumber.replace(/(\d{4})(?=\d)/g, "$1 "); // Format with spaces
    };
        
   
    
    return (
        <>
          {card.id ? (
            <Link to={`card/${card.id}`}>
                <div className={styles[checkBankTheme(card.cardIssuer)]}>
                    <div className={styles.titles}>
                        <h3 className={styles.cardholderName}>{card.cardHolder}</h3>
                        <h3 className={styles.cardIssuer}>{card.cardIssuer}</h3>
                    </div>
                    <img src={bankchip} alt="Bank Chip" className={styles.chip} />
                    <p className={styles.cardDigits}>{formatCardNumber(card.cardNumber)}</p>
                    <p className={styles.expiration}>Expire date: {card.expireMonth} / {card.expireYear}</p>    
                </div>
            </Link>
          ) : (
            <div className={styles[checkBankTheme(card.cardIssuer)]}>
                <img src={bankchip} alt="Bank Chip" className={styles.chip} />
                <h3 className={styles.cardholderName}>{card.cardHolder}</h3>
                <h3 className={styles.cardIssuer}>{card.cardIssuer}</h3>
                <p className={styles.cardDigits}>{formatCardNumber(card.cardNumber)}</p>
                <p className={styles.expiration}>Exp. date: {card.expireMonth} / {card.expireYear}</p>        
            </div>
          )}
        </>
      );
      
}

export default Card;