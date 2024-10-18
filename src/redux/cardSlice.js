import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [
      {
        id: 5,
        cardIssuer: "Silver Oak Bank",
        cardNumber: "1234567891011121",
        cardHolder: "JON",
        expireMonth: "12",
        expireYear: "25",
        ccv: "123",
        isActive: false,
      },
      {
        id: 2,
        cardIssuer: "Horizon Financial",
        cardNumber: "1234567891011121",
        cardHolder: "John Doe",
        expireMonth: "12",
        expireYear: "25",
        ccv: "123",
        isActive: true,
      },
      {
        id: 1,
        cardIssuer: "Horizon Financial",
        cardNumber: "9876543210987654",
        cardHolder: "Jane Smith",
        expireMonth: "11",
        expireYear: "24",
        ccv: "456",
        isActive: false, // Inactive card
      },
    ],
  },

  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload); // add new card to state array of cards
    },
    removeCard: (state, action) => {
      console.log("STATE", state);
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload.id), //filter out card you want to remove
      };
    },
    editCard: (state, action) => {
      console.log("State before edit:", state);
      console.log("Action payload:", action.payload);

      const updatedCards = state.cards.map((card) => {
        if (card.id.toString() === action.payload.id.toString()) {
          console.log("Updating card:", card);
          return { ...card, ...action.payload };
        } else {
          return card;
        }
      });

      console.log("State after edit:", {
        ...state,
        cards: updatedCards,
      });

      return {
        ...state,
        cards: updatedCards,
      };
    },
    toggleCardActivation: (state, action) => {
      console.log("Toggling card:", action.payload.id);
      return {
        ...state,
        cards: state.cards.map(
          (c) =>
            c.id === action.payload.id ? { ...c, isActive: !c.isActive } : c // Use c instead of card
        ),
      };
    },
  },
});

export const { addCard, removeCard, editCard, toggleCardActivation } =
  cardSlice.actions;
export default cardSlice.reducer;
