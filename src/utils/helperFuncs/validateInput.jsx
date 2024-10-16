

const validateInput = (card) => {

        let errors = {}
        if(!card.cardIssuer || typeof card.cardIssuer !== "string") {
            errors.cardIssuer = "Bank is required"
        }
        if (!card.cardNumber || card.cardNumber.toString().length !== 16) {
            console.log("NUM LENGTH", card.cardNumber.toString().length); 
            errors.cardNumber = "16 numbers is required";
        }
        if(!card.cardHolder || typeof card.cardHolder !== "string") {
            errors.cardHolder = "Name is required"
        }
        if (!card.expireMonth || card.expireMonth < 1 || card.expireMonth > 12) {
            errors.expireMonth = "Valid Month is required";
        }

        const currentYear = new Date().getFullYear() % 100; 
        if (!card.expireYear || card.expireYear < currentYear) {
            errors.expireYear = "Valid Year is required";
        }
        if (!card.ccv || card.ccv < 100 || card.ccv > 999) {
            errors.ccv = "Valid 3-digit CCV is required";
        }
        
        const hasErrors = Object.keys(errors).length > 0;
        return [hasErrors, errors]

    //Validate card info and length of values.

}

export default validateInput;