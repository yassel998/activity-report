import { combineReducers } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { colDetailsReducer, userSigninReducer } from "./reducers/userReducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "rooy-auth",
  storage,
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  Colab: colDetailsReducer,
});
/*const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);*/
export default persistReducer(persistConfig, reducer);
