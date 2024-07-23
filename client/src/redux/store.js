import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user"
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { cartReducer } from "./reducers/cart";


const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        products: productReducer,
        cart: cartReducer,
    },
});

export default Store;