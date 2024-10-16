import { Link } from "react-router-dom";

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
              <div className="card">
                <h3>{card.cardHolder}</h3>
                <h3>{card.cardIssuer}</h3>
                <p>{formatCardNumber(card.cardNumber)}</p>
                <p>Expire date: {card.expireMonth} / {card.expireYear}</p>
                <p>CCV: {card.ccv}</p>
              </div>
            </Link>
          ) : (
            <div className="card">
              <h3>{card.cardHolder}</h3>
              <h3>{card.cardIssuer}</h3>
              {formatCardNumber(card.cardNumber)}
              <p>Expire date: {card.expireMonth} / {card.expireYear}</p>
              <p>CCV: {card.ccv}</p>
            </div>
          )}
        </>
      );
      
}

export default Card;