import "../Login.sass"
import {FaEye, FaEyeSlash, FaLock} from "react-icons/fa6";
import {GrMail} from "react-icons/gr";
import {Link, useNavigate } from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";
import {variables} from "../../../utils/variables";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import {useEffect, useState} from "react";
import {useLogin} from "../../../hooks/users/useLogin";


const SignIn = () => {

	const navigate = useNavigate()

	const {email, setEmail, password, setPassword, showPassword, togglePassword, cleanForm} = useLogin()

	const { login, auth } = useAuth()

	const handleSubmit = async (e) => {

		e.preventDefault()

		const formData = new FormData()

		formData.append("email", email)
		formData.append("password", password)

		const flag = await login(formData)

		if (flag) {
			cleanForm()
			navigate("/home")
		}
	}

	const handleAuth = async () => {
		const flag = await auth()
		if (flag) {
			navigate("/home")
		}
	}

	useEffect(() => {
		handleAuth()
	}, [])

	return (
		<div className="auth-container">

			<div className="header">

				<div className="text">
					Вход
				</div>

			</div>

			<form className="inputs" onSubmit={handleSubmit}>

				<div className="input">
					<GrMail className="icon" />
					<input type="email" name="email" placeholder="Почта" value={email} onChange={(e) => setEmail(e.target.value)} required/>
				</div>

				<div className="input">
					<FaLock className="icon" />
					<input type={showPassword ? "text" : "password"} name="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required/>
					<div className="show-password-btn-wrapper">
						{showPassword && <FaEye className="show-password-btn" onClick={() => togglePassword()}/>}
						{!showPassword && <FaEyeSlash className="show-password-btn" onClick={() => togglePassword()}/>}
					</div>
				</div>

				<div className="sign-up-link-container">
					<Link to="/auth/register" style={{ textDecoration: 'none' }}>
						<span> Зарегистрироваться </span>
					</Link>
				</div>

				<CustomButton bg={variables.primary} text="Войти" />

			</form>

		</div>
	)
}

export default SignIn;