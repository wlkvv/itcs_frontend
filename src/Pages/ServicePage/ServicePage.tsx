import "./ServicePage.sass"
import {Dispatch, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import {iServicesMock, requestTime} from "../../Consts";
import {Service} from "../../utils/types.ts";
import mockImage from "/src/assets/mock.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import {useToken} from "../../hooks/users/useToken.ts";
import { RootState } from "../../store/store";
import { addServiceToOrder, setOrder } from "../../store/cartSlice";

const ServicePage = ({ selectedService, setSelectedService }: { selectedService: Service | undefined, setSelectedService: Dispatch<Service | undefined> }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { access_token } = useToken();
  const serviceIds = useSelector((state: RootState) => state.cart.serviceIds);
  const currentOrderId = useSelector((state: RootState) => state.cart.currentOrderId);
    const [isMock, setIsMock] = useState<boolean>(false);
    

      const addOptionToCart = async (id: number) => {
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
    useEffect(() => {
        fetchData()
    }, [])
    
    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://176.57.215.76:8000/api/services/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Service = await response.json()

            setSelectedService(service)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedService(iServicesMock.find((service:Service) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://176.57.215.76:8000/api/services/${id}/image/`



    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/services">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedService?.name}</h2>

                    <br />

                    <span>{selectedService?.description}</span>

                    <br />

                    <span>Цена: {selectedService?.price} рублей</span>

                    <br />

                    <span>Срок выполнения: {selectedService?.time} дней</span>

                    <br />

                    <span>Срок поддержки: {selectedService?.due_date} дней</span>

                </div>

                <br />
                
                <button onClick={() => addOptionToCart(Number(id))}>
					Добавить в корзину
				</button>
            </div>

        </div>
    )
}

export default ServicePage;