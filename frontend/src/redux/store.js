import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";


const cartPersistConfig = {
  key: "cart",
  storage,
};
const rootReducer = {
  cart: persistReducer(cartPersistConfig, cartReducer),
  auth: authReducer,
};
export const store = configureStore({
  reducer:rootReducer ,
  devTools: true,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store);