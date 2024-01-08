import React, { useState } from "react";
import btnDel from "../../assets/icons/btn_delete.svg";
import styles from "./CartItem.module.scss";
import { cartItemProps } from "../../utils/types.ts";


const CartItem: React.FC<cartItemProps> = ({
  id,
  name,
  description,
  price,
  image,
  onDelete,
  updateAllow,
}) => {
  const handleItemRemove = () => {
    onDelete(id);
  };

  return (
    <div className={styles.cart__item}>
      <div className={styles["cart__item-img"]}>
        <img src={image} alt="option" />
      </div>
      <div className={styles["cart__item-info"]}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className={styles["cart__item-count"]}>
      </div>
      <div className={styles["cart__item-price"]}>
        <b>{price} ₽</b>
      </div>
      {updateAllow && (
        <div onClick={handleItemRemove} className={styles["cart__item-remove"]}>
          <img src={btnDel}></img>
        </div>
      )}
    </div>
  );
};

export default CartItem;
