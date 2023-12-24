import "./UserInfo.sass"
import {useAuth} from "/home/student/labs_4/lab_6//src/hooks/users/useAuth";
import {ImExit} from "react-icons/im";
import user_avatar from "./user.png";
import {useNavigate } from "react-router-dom";
import {logOutMessage} from "/home/student/labs_4/lab_6/src/utils/toasts";
import {useModal} from "/home/student/labs_4/lab_6/src/utils/useModal.ts";

const UserInfo = () => {

	const navigate = useNavigate()

	const {is_moderator, user_name, user_email, logOut} = useAuth()

	const {modalRef, buttonRef, isOpen, setIsOpen} = useModal()

	const doLogOut = async () => {

		await logOut()

		logOutMessage()

		navigate("/home")
	}

	return (
		<div>
			<div ref={buttonRef}>
				<img src={user_avatar} className="user-avatar" onClick={(e) => setIsOpen(!isOpen)}  alt=""/>
			</div>

			<div className={"user-info-wrapper " + (isOpen ? "open" : "")} ref={modalRef}>
				<span>Имя: {user_name}</span>
				<span>Почта: {user_email}</span>
				<span>Статус: {is_moderator ? "Модератор" : "Пользователь"}</span>

				<button onClick={doLogOut}>
					Выйти
					<ImExit />
				</button>
			</div>

		</div>
	)
}

export default UserInfo;