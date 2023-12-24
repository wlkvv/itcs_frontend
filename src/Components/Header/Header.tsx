
import "./Header.sass"
import logo from "../../assets/logo.png"
import {useAuth} from "../../hooks/users/useAuth";
import Hamburger from "./Hamburger/Hamburger";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDesktop} from "../../utils/useDesktop";
import { RootState } from '../../store/store';
import { toast } from "react-toastify";
import {useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {useToken} from "../../hooks/users/useToken.ts";
import { useSelector } from "react-redux";
const Header = () => {
    const {is_authenticated, user_name, auth} = useAuth()
    const {isDesktopMedium} = useDesktop();
    const {logOut} = useAuth()
    const navigate = useNavigate()
    const {access_token} = useToken();
    const serviceIds = useSelector((state: RootState) => state.cart.serviceIds);
    const hasServicesInCart = serviceIds.length > 0;
    const location = useLocation();
    const currentOrderId = useSelector((state: RootState) => state.cart.currentOrderId);
    const isServicesPage = location.pathname === "/services";
    const [lastOrderId, setLastOrderId] = useState(null);
    const [ServicesCount, SetCount] = useState(null);

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
    const [hasActiveOrder, setHasActiveOrder] = useState(false);

    const checkActiveOrder = async () => {
        try {
          const response = await axios.get("http://176.57.215.76:8000/api/orders/", {
            method: "GET",
            withCredentials: true,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: access_token,
            },
          });
    
          // Проверяем наличие заказа со статусом 1
          const activeOrder = response.data.find((order) => order.status === 1);
          setHasActiveOrder(!!activeOrder);
        } catch (error) {
          console.error("Ошибка при проверке заказа:", error);
        }
      };

      const fetchCartData = async () => {
        try {
            const ordersUrl = "http://176.57.215.76:8000/api/orders/";
    
            const ordersResponse = await axios(ordersUrl, {
                method: "GET",
                withCredentials: true,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: access_token,
                },
            });
    
            const filteredOrders = ordersResponse.data.filter(
                (order) => order.status === 1
            );
    
            if (filteredOrders.length > 0) {
                const latestOrder = filteredOrders.reduce((prev, current) =>
                    prev.id > current.id ? prev : current
                );
                setLastOrderId(latestOrder.id); // Обновляем ID последнего заказа
                return latestOrder.services.length; // Возвращаем количество услуг в последнем заказе
            }
            return 0; // Возвращаем 0, если нет заказов со статусом 1
        } catch (e) {
            console.log(e);
            return 0; // Возвращаем 0 в случае ошибки
        }
    };

    
      useEffect(() => {
        checkActiveOrder();
      }, []);

      useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
      const updateServicesCount = async () => {
          const servicesCount = await fetchCartData();
          SetCount(servicesCount); // Обновляем состояние с полученным количеством услуг
      };
  
      updateServicesCount();
  }, []);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const HasServicesInCart = ServicesCount > 0;

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

                {is_authenticated && HasServicesInCart && isServicesPage && (
                  <Link to={`/order/${lastOrderId}`} className="menu-item" onClick={() => setIsOpen(false)}>
                    <span className="item">Корзина</span>
                  </Link>
                )}

                {is_authenticated && !HasServicesInCart && isServicesPage && (
                  <Link to={null} className="menu-item" onClick={() => setIsOpen(false)}>
                  <span className="item">Корзина</span>
                  </Link>
                )}

                {is_authenticated && (
                    <Link to="/orders" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span className="item">Мои заказы</span>
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

