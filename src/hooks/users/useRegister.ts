import {useDispatch, useSelector} from "react-redux";
import {updateName, updateEmail, updatePassword, updateShowPassword} from "../../store/users/registerSlice";

export function useRegister() {
    const name = useSelector(state => state.register.name)
    const email = useSelector(state => state.register.email)
    const password = useSelector(state => state.register.password)
    const showPassword = useSelector(state => state.register.showPassword)

    const dispatch = useDispatch()

    const setName = (value) => {
        dispatch(updateName(value))
    }

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
        setName("")
        setEmail("")
        setPassword("")
        setShowPassword(false)
    }

    return {
        name,
        email,
        password,
        showPassword,
        setName,
        setEmail,
        setPassword,
        togglePassword,
        cleanForm
    };
}
