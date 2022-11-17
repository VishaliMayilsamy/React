import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetCartData = () =>{
    return async (dispatch) => {
        const fetchData = async () => {
           const response = await fetch('https://react-http-6b4a6.firebaseio.com/cart.json');
           if(!response.ok){
               throw new Error('Could not fetch cart data');
           }
           const data = await response.json();

           return data;

        };
        try{
            const cartData = await fetchData();
        }catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching Cart data failed',
              }))
        }
    }
}

export const sendCartData = (cart) =>{
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'sending...',
            message: 'Sending Cart data',
          }))

          const sendRequest = async () =>{
            const response = await fetch('https://react-http-6b4a6.firebaseio.com/cart.json', {
                method : 'PUT',
                body : JSON.stringify(cart),
               });
         
               if(!response.ok){
                 throw new Error('Sending Cart Date failed');
               }
          }

          try{
         await sendRequest();
         dispatch(uiActions.showNotification({
            status: 'Success',
            title: 'Success...',
            message: 'Sent Cart data Successfully',
          }))
          }catch(error){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending Cart data failed',
              }))
          }
      
    };
}