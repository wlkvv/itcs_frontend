import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./users/authSlice"
import cartReducer from '/home/student/labs_4/lab_6/src/store/cartSlice.ts';
import loginReducer from "./users/loginSlice"
import registerReducer from "./users/registerSlice"
import searchReducer from "./searchSlice";
import ordersReducer from "./ordersSlice";
import Option, { Service } from "../Types";
import filterReducer from "./filtersSlices"
import moderAppReducer from "./moderAppSlice";
import dateRangeReducer from "./dataRangeSlice";


export interface RootState {
	user: {
	  user_id: BigInteger;
	  user_email: string;
	  is_authenticated: boolean;
	  is_moderator: boolean;
	  current_cart: number;
	  cart: ReturnType<typeof cartReducer>;
	};
	search: { // Добавьте новое состояние для поиска
	  query: string;
	};
	moderApp: {
		input_value: string
		dropdown_value: Option
	  }
	  filter: {
		price_range: number[]
		input_value: string
		dropdown_value: Option
		options: Service[]
	  }
	  dateRange: {
		startDate: Date;
		endDate: Date;
	  }
	
  }
  
  export const store = configureStore({
	reducer: {
	  user: authReducer,
	  login: loginReducer,
	  register: registerReducer,
	  cart: cartReducer,
	  orders: ordersReducer,
	  search: searchReducer, 
	  moderApp: moderAppReducer,
	  filter: filterReducer,
	  dateRange: dateRangeReducer, // Добавьте новый редьюсер здесь
	},
  });
  
  export default store;
  export type AppDispatch = typeof store.dispatch;