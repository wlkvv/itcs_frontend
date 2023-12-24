import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "",
    email: "",
    password: "",
    showPassword: false
}

const registerSlice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {
        updateName: (state, action) => {
            state.name = action.payload
        },
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

export const { updateName, updateEmail, updatePassword, updateShowPassword } = registerSlice.actions

export default registerSlice.reducer