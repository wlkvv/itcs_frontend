import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    password: "",
    showPassword: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        updateEmail: (state, action) => {
            state.email = action.payload
        },
        updatePassword: (state, action) => {
            state.password = action.payload
        },
        updateShowPassword: (state, action) => {
            state.showPassword = action.payload
        }
    }
})

export const { updateEmail, updatePassword, updateShowPassword } = loginSlice.actions

export default loginSlice.reducer