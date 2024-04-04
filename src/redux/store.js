import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./slices/userSlice";
// import thunk from "redux-thunk";

const rootPersistConfig = {
  key: "root",
  storage, // localstorage
};

const userPersistConfig = {
  key: "user",
  storage: storageSession, // session storage
};

const rootReducer = combineReducers({
  user: userReducer,
//   notes: persistReducer(userPersistConfig, notesReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
