import React, { useEffect, useState } from "react";
import Cart from "../../Components/Cart/Cart.tsx";
import  "./CartPage.sass";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const CartPage = () => {
  return (
      <Cart />
  );
};

export default CartPage;
