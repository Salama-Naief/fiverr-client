import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

const initailState = {
  user: null,
  order: null,
};
export const Store = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, user: action.payload };
    case "USER_LOGOUT":
      return { ...state, user: null };
    case "ADD_ORDER":
      return { ...state, order: action.payload };
    default:
      return state;
  }
}

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initailState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
