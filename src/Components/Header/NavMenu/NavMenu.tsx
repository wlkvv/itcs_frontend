import "./NavMenu.sass"
import {Link} from "react-router-dom";

const NavMenu = () => {
    return (
        <div className="menu-wrapper">

            <Link to="/services" className="menu-item">
                <span>Услуги</span>
            </Link>

            <Link to="/profile" className="menu-item">
                <span>Личный кабинет</span>
            </Link>

        </div>
    )
}

export default NavMenu;