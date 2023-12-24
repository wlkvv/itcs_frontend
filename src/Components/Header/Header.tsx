import "./Header.sass"
import NavMenu from "./NavMenu/NavMenu";
import logo from "/home/student/labs_4/lab_4/src/assets/logo.png";



const Header = () => {
    return (
        <div className="header-wrapper">

            <div className="left-container">
            <img src={logo} alt="Logo" />
            </div>

            <div className="right-container">
                <NavMenu/>
            </div>

        </div>
    )
}

export default Header;
