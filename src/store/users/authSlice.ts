import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	user_id: -1,
	user_name: "",
	user_email: "",
	is_authenticated: false,
	is_moderator: false,
	current_cart: -1,
}

const authSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		updateUser: (state, action) => {
			state.is_authenticated = action.payload.is_authenticated
			state.is_moderator = action.payload.is_moderator
			state.user_id = action.payload.user_id
			state.user_name = action.payload.user_name
			state.user_email = action.payload.user_email
			state.current_cart = action.payload.current_cart
		},
		cleanUser: (state) => {
			state.is_authenticated = false
			state.is_moderator = false
			state.user_id = -1
			state.user_name = ""
			state.user_email = ""
			state.current_cart = -1
		}
	}
})

export const { updateUser, cleanUser } = authSlice.actions

export default authSlice.reducer