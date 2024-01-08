import {useDispatch, useSelector} from "react-redux";
import {updateEmail, updatePassword, updateShowPassword} from "../../store/users/loginSlice";

export function useLogin() {
    const email = useSelector(state => state.login.email)
    const password = useSelector(state => state.login.password)
    const showPassword = useSelector(state => state.login.showPassword)

    const dispatch = useDispatch()

    const setEmail = (value) => {
        dispatch(updateEmail(value))
    }

    const setPassword = (value) => {
        dispatch(updatePassword(value))
    }

    const setShowPassword = (value) => {
        dispatch(updateShowPassword(value))
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const cleanForm = () => {
        setEmail("")
        setPassword("")
        setShowPassword(false)
    }

    return {
        email,
        password,
        showPassword,
        setEmail,
        setPassword,
        togglePassword,
        cleanForm
    };
}
