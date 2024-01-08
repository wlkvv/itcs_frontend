import "./ServiceCard.sass";
import {Service} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { useToken } from "../../../hooks/users/useToken.ts";
import { toast } from "react-toastify";
import { addServiceToOrder, setOrder } from "../../../store/cartSlice";
import { useSelector } from 'react-redux';
import {useAuth} from "../../../hooks/users/useAuth";
const ServiceCard = ({ service, isMock }: {service:Service, isMock:boolean }) => {
    const dispatch = useDispatch();
    const { access_token } = useToken();
    const img = `http://176.57.215.76:8000/api/services/${service.id}/image/`;
    const serviceIds = useSelector((state: RootState) => state.cart.serviceIds);
    const currentOrderId = useSelector((state: RootState) => state.cart.currentOrderId);
    const {is_authenticated, is_moderator, user_name, auth} = useAuth()

    const addServiceToCart = async (id) => {
        try {
          const response = await axios.post(
            `http://176.57.215.76:8000/api/services/${id}/add_to_order/`,
            {},
            {
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': access_token
              }
            }
          );
      
          const responseData = response.data;
          if (responseData && responseData.user_data && responseData.user_data.current_cart) {
            const orderId = responseData.user_data.current_cart;
        
            if (orderId !== currentOrderId) {
                dispatch(setOrder(orderId));
              }
      
            if (!serviceIds.includes(id)) {
              dispatch(addServiceToOrder(id));
              toast.success("Услуга добавлена в корзину", { icon: "⚡" });
            } else {
              toast.error("Услуга уже в корзине");
              //console.log(orderId, serviceIds)
            }
          } else {
            console.error("ID заказа не найден в ответе сервера");
            toast.error("Ошибка при обработке заказа");
          }
        } catch (error) {
          console.error(error);
          toast.error("Ошибка при добавлении в корзину");
        }
      };
      
      
      return (
          <div className="card-wrapper">
              <div className="preview">
                  <img src={isMock ? mockImage : img} alt={service.name} />
              </div>
              <div className="card-content">
                  <div className="content-top">
                      <h3 className="title">{service.name}</h3>
                  </div>
                  <div className="content-bottom">
                  <h4 className="price">{service.price} ₽</h4>
                  <Link className="button-style" to={`/services/${service.id}`}>
      Подробнее
  </Link>
  {is_authenticated && <button className="button-style" onClick={() => addServiceToCart(service.id)}>
      Добавить в корзину
  </button> }
  {is_moderator && <Link className="button-style" to={`/service/${service.id}`}>
      Редактировать услугу
  </Link> }
                  </div>
              </div>
          </div>
      );
};

export default ServiceCard;
