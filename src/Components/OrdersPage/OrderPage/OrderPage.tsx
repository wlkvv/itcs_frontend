import React, { useEffect, useState } from "react";
import { Response } from "../../../utils/types.ts";
import Cookies from "universal-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import Button from "../../Button/Button";
import { Link, useParams } from "react-router-dom";
import styles from "./OrderPage.module.scss";
import { toast } from "react-toastify";
import { useToken } from "../../../hooks/users/useToken.ts";

const cookies = new Cookies();

const Order = () => {
  const { id } = useParams<{ id: string }>();
  const [orderData, setOrderData] = useState<any>(null);
  const { access_token } = useToken();

  const fetchOrderData = async () => {
    try {
      const url = `http://176.57.215.76:8000/api/orders/${id}/`;
      const response: Response = await axios(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: access_token,
        },
      });

      setOrderData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrderData();
    }
  }, [id, access_token]);

  const handleDeleteOrder = async () => {
    try {
      const url = `http://176.57.215.76:8000/api/orders/${id}/delete/`;
      await axios.delete(url, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: access_token,
        },
      });

      toast.success("Заказ успешно удален", {
        icon: "⚡",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const getStatusName = (status) => {
    switch (status) {
      case 1:
        return 'Зарегистрирован';
      case 2:
        return 'Проверяется';
      case 3:
        return 'Принято';
      case 4:
        return 'Отказано';
      case 5:
        return 'Удалено';
      default:
        return 'Неизвестный статус';
    }
  };

  function formatDate(isoString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(isoString).toLocaleString('ru-RU', options);
  }

  return (
    <div className={styles.Order__actions}>
      <Link to="/orders">
        <Button className={styles.Order__actions_back}>Назад</Button>
      </Link>

      {orderData && (
      <div className={styles.Order__details}>
        <h2>Детали заказа #{orderData.id}</h2>
        <p>Статус заказа: {getStatusName(orderData.status)}</p>
        <p>Дата создания: {formatDate(orderData.date_created)}</p>

        <div className={styles.Order__items}>
          <h3>Список услуг:</h3>
          {orderData.services.map((service: any, index: number) => (
            <div key={service.id} className={styles.Order__item}>
              <h4>{service.name}</h4>
              <img
                src={`http://176.57.215.76:8000/api/services/${service.id}/image/`}
                alt={service.name}
                style={{ maxWidth: '100px', maxHeight: '100px', marginBottom: '10px' }}
              />
              <p>{service.description}</p>
              <p>Цена: {service.price} рублей</p>
              <p>Срок выполнения: {service.time} дней</p>
              <p>Срок поддержки: {service.due_date} дней</p>
              {index !== orderData.services.length - 1 && <hr />}
            </div>
          ))}
        </div>


        </div>
      )}
    </div>
  );
};

export default Order;
