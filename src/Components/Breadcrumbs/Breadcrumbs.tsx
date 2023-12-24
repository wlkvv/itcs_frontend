import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {Service, Order} from "../../Types";

import {Dispatch} from "react";

const Breadcrumbs = ({ selectedService, setSelectedService }: { selectedService: Service | undefined, setSelectedService: Dispatch<Service | undefined> }) => {
    const location = useLocation();
    let currentLink = '';
    
    const topics: Record<string, string> = {
        "home": "Главная",
        "services": "Услуги",
        "profile": "Личный кабинет",
        "cart": "Корзина",
        "orders": "Мои заказы"
    };

    const resetSelectedService = () => setSelectedService(undefined);

    const isServicePage = location.pathname.includes("/services/");

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {
        currentLink += `/${crumb}`;

        if (Object.keys(topics).find(x => x === crumb)) {
            return (
                <div className={"crumb"} key={crumb}>
                    <Link to={currentLink} onClick={resetSelectedService}>
                        {(topics as never)[crumb]}
                    </Link>
                    <FaChevronRight className={"chevron-icon"} />
                </div>
            );
        }

        if (isServicePage) {
            return (
                <div className={"crumb"} key={crumb}>
                    <Link to={currentLink}>
                        {selectedService?.name}
                    </Link>
                    <FaChevronRight className={"chevron-icon"} />
                </div>
            );
        }

        // Добавляем breadcrumbs для страницы заказа
        if (currentLink.match(new RegExp('orders/(d*)'))) {
            const orderId = currentLink.split('/').pop();
            return (
                <div className={"crumb"} key={crumb}>
                    <Link to={`/orders/${orderId}`}>
                        {`Заказ #${orderId}`}
                    </Link>
                    <FaChevronRight className={"chevron-icon"} />
                </div>
            );
        }

        if (currentLink.match(new RegExp('order/(d*)'))) {
            const orderId = currentLink.split('/').pop();
            return (
                <div className={"crumb"} key={crumb}>
                    <Link to={`/order/${orderId}`}>
                        {`Черновик заказа #${orderId}`}
                    </Link>
                    <FaChevronRight className={"chevron-icon"} />
                </div>
            );
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">
                <div className="crumb">
                    <Link to={"/"}>
                        <FaHome className="home-icon" />
                    </Link>
                    <FaChevronRight className="chevron-icon" />
                </div>
                {crumbs}
            </div>
        </div>
    );
};

export default Breadcrumbs;