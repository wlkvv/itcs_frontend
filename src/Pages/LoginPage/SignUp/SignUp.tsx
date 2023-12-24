import "../Login.sass"
import {FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa6";
import {GrMail} from "react-icons/gr";
import {Link, useNavigate} from "react-router-dom";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import {variables} from "../../..//utils/variables";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect} from "react";
import {useRegister} from "../../../hooks/users/useRegister";

const SignUp = () => {

	const navigate = useNavigate()

	const { register, auth } = useAuth()

	const {name, setName, email, setEmail, password, setPassword, showPassword, togglePassword, cleanForm} = useRegister()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData:FormData = new FormData()

		formData.append("name", name)
		formData.append("email", email)
		formData.append("password", password)

		const flag = await register(formData)

		if (flag) {
			cleanForm()
			navigate("/auth/login")
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
	}, []);


	return (
		<div className="auth-container">

			<div className="header">

				<div className="text">
					Регистрация
				</div>

			</div>

			<form className="inputs" onSubmit={handleSubmit}>

				<div className="input">
					<FaUser className="icon" />
					<input type="text" placeholder="Имя" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
				</div>

				<div className="input">
					<GrMail className="icon" />
					<input type="email" placeholder="Почта" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
				</div>

				<div className="input">
					<FaLock className="icon" />
					<input type={showPassword ? "text" : "password"} placeholder="Пароль" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
					<div className="show-password-btn-wrapper">
						{showPassword && <FaEye className="show-password-btn" onClick={() => togglePassword()}/>}
						{!showPassword && <FaEyeSlash className="show-password-btn" onClick={() => togglePassword()}/>}
					</div>
				</div>

				<div className="sign-in-link-container">
					<Link to="/auth/login" style={{ textDecoration: 'none' }}>
						<span>Войти</span>
					</Link>
				</div>

				<CustomButton bg={variables.primary} text="Зарегестрироваться" />

			</form>

		</div>
	)
}

export default SignUp;