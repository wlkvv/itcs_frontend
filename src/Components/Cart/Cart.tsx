import React, { useEffect, useState, useRef } from "react";
import CartItem from "../CartItem/CartItem";
import { Response } from "../../utils/types.ts";
import Cookies from "universal-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cartItemProps } from "../../utils/types.ts";
import styles from "./Cart.module.scss";
import Button from "../Button/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateCart } from "../../store/users/userSlice.ts";
import { toast } from "react-toastify";
import {useToken} from "../../hooks/users/useToken.ts";
import {
  addServiceToOrder,
  clearCart,
  removeServiceFromOrder,
} from "../../store/cartSlice";


const Cart = () => {
  const [cartItems, setCartItems] = useState<cartItemProps[]>([]);
  const {access_token} = useToken();
  const { id_cart } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Используем useRef для глобальной переменной
  const lastOrderIdRef = useRef<number | null>(null);

  // Функция для обновления lastOrderId
  const updateLastOrderId = (id: number) => {
    lastOrderIdRef.current = id;
  };


// В функции fetchCartData обновляем lastOrderId
const fetchCartData = async (id_cart : number) => {
  try {
    const ordersUrl = "http://176.57.215.76:8000/api/orders/";

    // Получение всех заказов
    const ordersResponse = await axios(ordersUrl, {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: access_token,
      },
      
    });
    
    // Выбор заказа с самым большим id и статусом 1
    const filteredOrders = ordersResponse.data.filter(
      (order) => order.status === 1
    );

    const latestOrder = filteredOrders.reduce((prev, current) =>
      prev.id > current.id ? prev : current
    );

    updateLastOrderId(latestOrder.id);
    const url = `http://176.57.215.76:8000/api/orders/${latestOrder.id}/`
   ;


    const response: Response = await axios(url, {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: access_token,
      },
    });

    setCartItems(response.data.services);
    const serviceIds = response.data.services.map((service) => service.id);
    dispatch(clearCart()); 
    serviceIds.forEach((serviceId) => {
      dispatch(addServiceToOrder(serviceId)); 
    });
  } catch (e) {
    console.log(e);
  }
};


  const formApplication = async (status_id: number) => {

    try {

      const updatedData = {
        status: status_id,
      }; 
      

      const response: Response = await axios(
        `http://176.57.215.76:8000/api/orders/${lastOrderIdRef.current}/update_status_user/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: false,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: access_token,
          },
        }
      );
      if (status_id === 5) { 
        dispatch(clearCart()); 
        dispatch(updateCart(-1));
        navigate("/services");
        toast.success("Корзина успешно очищена!");
        console.log(cartItems)
      }
      if (status_id === 2) {
        navigate("/services");
        toast.success("Заказ успешно оформлен!");
        dispatch(clearCart());
      }

    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      const responce = await axios(
        `http://176.57.215.76:8000/api/orders/${lastOrderIdRef.current}/delete_service/${itemId}/`,
        {
          method: "DELETE",
          withCredentials: false,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: access_token,
          },
        }
      );
      console.log(responce); 
      toast.success("Услуга удалена!");
      fetchCartData(id_cart);
      dispatch(removeServiceFromOrder(itemId));
      setCartItems(response.data.services);
    } catch (e) {
      console.log(e.response); 

    }
  };


  useEffect(() => {
    fetchCartData(id_cart);
  }, [id_cart]);

    return (
      <div className={styles.cart}>
        <div className={styles.cart__header}>
          <div className={styles.cart__header_title}>Корзина</div>
          <div
            className={styles.cart__header_clear}
            onClick={() => formApplication(5)}
          >
            Очистить корзину
          </div>
        </div>
        <div className={styles.cart__content}>
          {cartItems.map((services) => (
            <CartItem
              key={services.id}
              {...services}
              onDelete={deleteItem}
              updateAllow={true}
            />
          ))}
        </div>
        <div className={styles.cart__actions}>
          <Link to="/">
            <Button className={styles.cart__actions_back}>Назад</Button>
          </Link>

          <Button
            onClick={() => formApplication(2)}
            className={styles.cart__actions_send}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    );
};

export default Cart;
