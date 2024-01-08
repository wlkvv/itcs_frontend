
import "./Header.sass"
import logo from "../../assets/logo.png"
import {useAuth} from "../../hooks/users/useAuth";
import Hamburger from "./Hamburger/Hamburger";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDesktop} from "../../utils/useDesktop";
import { toast } from "react-toastify";
import {useNavigate, useLocation } from "react-router-dom";
import {useToken} from "../../hooks/users/useToken.ts";
const Header = () => {
    const {is_authenticated, user_name, auth} = useAuth()
    const {isDesktopMedium} = useDesktop();
    const {logOut, is_moderator} = useAuth()
    const navigate = useNavigate()
    const {access_token} = useToken();

    useEffect(() => {
        auth()
    }, []);
    const doLogOut = async () => {

		await logOut()

        toast.info(`Вы вышли из аккаунта`, {
            position: toast.POSITION.BOTTOM_RIGHT
        })

		navigate("/home")
	}

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className={"profile-menu-wrapper"}>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>
            <div className="logo">
            <img src={logo} alt="logo" />
            </div>


                <Link to="/" className="menu-item" onClick={(e) => setIsOpen(false)}>
                    <span className="item">Главная</span>
                </Link>

                <Link to="/services" className="menu-item" onClick={(e) => setIsOpen(false)}>
                    <span className="item">Услуги</span>
                </Link>

                {is_authenticated && !is_moderator && (
                    <Link to="/orders" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span className="item">Мои заказы</span>
                    </Link>
                )}

                {is_authenticated && is_moderator && (
                    <Link to="/orders" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span className="item">Заказы</span>
                    </Link>
                )}

                {!is_authenticated &&
                    <Link to="/auth" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span className="item">Вход</span>
                    </Link>
                }
                
                {is_authenticated &&
                    <Link to="/home" className="menu-item" onClick={doLogOut}>
                        <span className="item">Выход</span>
                    </Link>
                }

 
                { is_authenticated  && <span className="item">Привет, {user_name}!</span>}

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}

export default Header;

