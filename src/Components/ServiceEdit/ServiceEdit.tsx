import React, { useEffect, useState } from "react"
import Button from "../Button/Button"
import { Response } from "../../utils/types.ts";
import styles from "./serviceedit.module.scss"
import { Link, useNavigate, useParams } from "react-router-dom"
import DropDown from "../Dropdown/Dropdown"
import Option from "../../Types"
import axios from "axios"
import { toast } from "react-toastify"
import uploadIcon from "../../assets/icons/upload.png"
import {useAuth} from "../../hooks/users/useAuth";
import { useToken } from "../../hooks/users/useToken.ts";

const ServiceEdit = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    price: 0,
    time: 0,
    due_date: 0,
    status: 1,
    image: ""
  });
  const [drag, setDrag] = useState(false);
  const [imageFile, setFile] = useState<File>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {access_token} = useToken();

  useEffect(() => {
    if (id !== "0") {
      fetchServiceData();
    }
  }, [id]);

  const fetchServiceData = async () => {
    try {
      const response = await axios.get(
        `http://176.57.215.76:8000/api/services/${id}`
      );
      setService(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных об услуге", error);
    }
  };

  const createOrUpdateService = async (formData: FormData, isCreate: boolean, serviceId: string, status = null) => {
    if (status !== null) {
      // Устанавливаем статус удаления
      formData.append("status", status.toString());
    }
  
    const url = `http://176.57.215.76:8000/api/services/${serviceId}/update/`;
    try {
      const response = await axios({
        method:  "PUT",
        url: url,
        withCredentials: true,
        headers: {
          Authorization: access_token,
        },
        data: formData,
      });
      return response.data.id;
    } catch (error) {
      console.error("Ошибка при создании/обновлении/удалении услуги", error);
      throw error;
    }
  };

  const createService = async () => {
    const url = 'http://176.57.215.76:8000/api/services/create/';
    try {
      const response = await axios({
        method: "POST",
        url: url,
        withCredentials: true,
        headers: {
          Authorization: access_token,
        },
      });
  
      // Фильтрация элементов с пустым именем
      const emptyNameServices = response.data.filter(service => service.name === "");
  
      // Нахождение элемента с максимальным id
      const maxIdService = emptyNameServices.reduce((max, service) => service.id > max.id ? service : max, { id: -1 });
  
      //console.log(maxIdService.id);
      return maxIdService.id;
    } catch (error) {
      console.error("Ошибка при создании услуги", error);
      throw error;
    }
  };

  const deleteService = async () => {
    try {
      // Установить статус услуги на 'Удалена' (2)
      await createOrUpdateService(new FormData(), false, id, 2);
      toast.success("Услуга успешно удалена");
      navigate("/services/");
    } catch (error) {
      console.error("Ошибка при удалении услуги", error);
    }
  };
  

  const uploadServiceImage = async (serviceId: number) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        await axios.put(`http://176.57.215.76:8000/api/services/${serviceId}/image/`, formData, {
          withCredentials: true,
          headers: {
            Authorization: access_token,
          },
        });
        toast.success("Изображение успешно добавлено", { icon: "🚀" });
      } catch (error) {
        console.error("Ошибка при загрузке изображения", error);
      }
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    let currentServiceId = id;
    formData.append("name", service.name);
    formData.append("description", service.description);
    formData.append("price", service.price.toString());
    formData.append("time", service.time.toString());
    formData.append("due_date", service.due_date.toString());
    formData.append("status", service.status.toString());
    
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    try {
      if (id === "0") {
        // Создание новой услуги и получение её ID
        currentServiceId = await createService();
      }
      const isCreate = id === "0";
      await createOrUpdateService(formData, id === "0", currentServiceId);
      //console.log(currentServiceId);
      if (imageFile) {
        await uploadServiceImage(currentServiceId);
      }
      if (id == '0') {
        toast.success("Услуга успешно создана");
      } else {
        toast.success("Услуга успешно изменена");
      }
      navigate("/services/");
    } catch (error) {
      console.error("Ошибка при обработке формы", error);
    }
  };
  

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  return (
    <div className={styles["edit-form"]}>
      <form className={styles["edit-form__block"]} onSubmit={handleSubmit}>
        <div className={styles["edit-form__block_text"]}>
          <h1>{id === "0" ? "Создание новой услуги" : "Редактирование услуги"}</h1>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}>Название услуги:</div>
            <input
              name="name"
              type="text"
              className={styles["edit-form__block_input"]}
              placeholder="Название услуги..."
              value={service.name}
              onChange={(e) => setService({ ...service, name: e.target.value })}
              required
            />
          </div>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}>Описание услуги:</div>
            <textarea
              name="description"
              className={styles["edit-form__block_input"]}
              placeholder="Введите описание..."
              value={service.description}
              onChange={(e) => setService({ ...service, description: e.target.value })}
              required
            />
          </div>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}>Стоимость услуги:</div>
            <input
              name="price"
              type="number"
              className={styles["edit-form__block_input"]}
              placeholder="Введите стоимость..."
              value={service.price}
              onChange={(e) => setService({ ...service, price: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}>Срок выполнения услуги (дней):</div>
            <input
              name="time"
              type="number"
              className={styles["edit-form__block_input"]}
              placeholder="Срок выполнения..."
              value={service.time}
              onChange={(e) => setService({ ...service, time: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}>Срок технической поддержки (дней):</div>
            <input
              name="due_date"
              type="number"
              className={styles["edit-form__block_input"]}
              placeholder="Срок технической поддержки..."
              value={service.due_date}
              onChange={(e) => setService({ ...service, due_date: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className={styles["edit-form__block_input-form"]}>
            <div className={styles["edit-form__block_input-title"]}></div>
            <div className={styles["edit-form__block_input-form"]}>
            {id != "0" && (
      <Button type="submit">{id === "0" ? "Создать услугу" : "Обновить услугу"}</Button>
    )}
            {id != "0" && (
      <Button type="button" onClick={deleteService}>Удалить услугу</Button>
    )}
    </div>
          </div>
          {id === "0" && (
      <Button type="submit">{id === "0" ? "Создать услугу" : "Обновить услугу"}</Button>
    )}
        </div>
        {drag ? (
          <div
            onDragStart={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStartHandler}
            onDrop={onDropHandler}
            className={styles["drop-area-active"]}
          >
            {!imageFile ? (
              <div className={styles["drop-area-text"]}>Отпустите файлы</div>
            ) : (
              <div className={styles["drop-area-text"]}>Файл успешно считан🚀</div>
            )}
          </div>
        ) : (
          <div
            onDragStart={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStartHandler}
            className={styles["drop-area"]}
          >
            <div className={styles["drop-area-text"]}>Перетащите файлы</div>
            <img src={uploadIcon} alt="Upload" />
          </div>
        )}
      </form>

      {service.image && (
        <div>
          <h3>Текущее изображение услуги:</h3>
          <img src={service.image} alt="Service" />
        </div>
      )}
    </div>
  );
};

export default ServiceEdit;