import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth";
import accountReducer from "./slices/account";
import categoryReducer from "./slices/category";
import transactionReducer from "./slices/transaction";

export const PersistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  category: categoryReducer,
  transactions: transactionReducer,
});
