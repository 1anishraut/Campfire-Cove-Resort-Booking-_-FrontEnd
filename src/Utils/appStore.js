import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import stayReducer from "./staySlice";
import mealsReducer from "./mealsSlice"
import adventureReducer from "./adventureSlice"
import dateSlice from "./dateSlice"

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import Meals from "../Components/Admin/Meals";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  admin: adminReducer,
  stay : stayReducer,
  meals : mealsReducer,
  adventure: adventureReducer,
  dates: dateSlice
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(appStore);
export default appStore; 
