import { PURCHASE_hISTORY_REQUEST,PURCHASE_hISTORY_FAIL,PURCHASE_hISTORY_SUCCUSS } from "../contants/paymentConstants";




export const purchaseHistoryReducer = (state = {}, action) => {
    switch (action.type) {
      case PURCHASE_hISTORY_REQUEST:
        return { loading: true };
  
      case PURCHASE_hISTORY_SUCCUSS:
        return { loading: false, history: action.payload };
  
      case PURCHASE_hISTORY_FAIL:
        return { loading: false, error: action.payload };
  
      
      default:
        return state;
    }
  };