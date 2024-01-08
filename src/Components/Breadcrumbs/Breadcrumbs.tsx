import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome, FaShoppingCart } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import {Service, Order} from "../../Types";
import {useToken} from "../../hooks/users/useToken.ts";
import {useAuth} from "../../hooks/users/useAuth";
import axios from 'axios';

import {Dispatch} from "react";


const Breadcrumbs = ({ selectedService, setSelectedService }: { selectedService: Service | undefined, setSelectedService: Dispatch<Service | undefined> }) => {
    const location = useLocation();
    let currentLink = '';
    
    const topics: Record<string, string> = {
        "home": "Главная",
        "services": "Услуги",
        "profile": "Личный кабинет",
        "cart": "Корзина",
        "orders": "Мои заказы",
        "auth": "Авторизация"
    };

    const {is_authenticated, user_name, auth} = useAuth()
    const {access_token} = useToken();
    const [lastOrderId, setLastOrderId] = useState(null);
    const [serviceslen, setserviceslen] = useState(null);

    const handleCartClick = async () => {
        const servicesLength = await fetchCartData(); // Получаем количество услуг
        if (servicesLength > 0) {
            // Если есть услуги, перенаправляем на страницу заказа
            window.location.href = `/it/order/${lastOrderId}`;
        }
        // Если нет услуг, ничего не делаем
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
                setserviceslen(latestOrder.services.length)
                return latestOrder.services.length; // Возвращаем количество услуг в последнем заказе
            }
            return 0; // Возвращаем 0, если нет заказов со статусом 1
        } catch (e) {
            //console.log(e);
            return 0; // Возвращаем 0 в случае ошибки
        }
    };

    useEffect(() => {
        fetchCartData();
    }, [location.pathname, access_token]);

    

    const resetSelectedService = () => setSelectedService(undefined);

    const isServicePage = location.pathname.includes("/services/");
    const isServicesPage = location.pathname.includes("/services");

    const cartButton = isServicesPage && is_authenticated && (
        <div className="cart-button" onClick={handleCartClick}>
            <FaShoppingCart />
            <span> Корзина</span>
        </div>
    );

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
        if (currentLink.match(new RegExp('service/(d*)'))) {
            const orderId = currentLink.split('/').pop();
            if (orderId == '0') {
                return (
                    <div className={"crumb"} key={crumb}>
                        <Link to={`/service/${orderId}`}>
                            {`Создание новой услуги`}
                        </Link>
                        <FaChevronRight className={"chevron-icon"} />
                    </div>
                );  
            } else {
                return (
                    <div className={"crumb"} key={crumb}>
                        <Link to={`/service/${orderId}`}>
                        {`Редактирование услуги #${orderId}`}
                        </Link>
                        <FaChevronRight className={"chevron-icon"} />
                    </div>
                );
            }
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
            {cartButton}
        </div>
    );
};

export default Breadcrumbs; 