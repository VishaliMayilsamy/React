import CartContext from "./cart-context";
import { useReducer } from "react";
import { act } from "@testing-library/react";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) =>{
    if(action.type === 'ADD'){
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * toHaveAccessibleDescription.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
}

const CartProvider = (props) =>{

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (items) =>{
        dispatchCartAction({type: 'ADD', item: items})
    };

    const removeItemFromCartHandler = (id) =>{
        dispatchCartAction({type: 'REMOVE', id:id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;