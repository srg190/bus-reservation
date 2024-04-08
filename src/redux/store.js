import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import bookingReducer from "./slices/bookingSlice";


const rootPersistConfig = {
  key: "root",
  storage, // localstorage
};

const rootReducer = combineReducers({
  booking: bookingReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
