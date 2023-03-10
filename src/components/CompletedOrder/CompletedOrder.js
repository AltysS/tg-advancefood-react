import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../Button/Button";
import "./CompletedOrder.css";

const CompletedOrder = () => {
  const { orderNO } = useParams();
  const navigate = useNavigate();
  return (
    <div className="completedOrderWrapper">
      <h2>Thank you for your order</h2>
      <p>
        Ваше замовлення номер{" "}
        {<span className="completedOrderNumber">{orderNO}</span>} було прийнято.
        Наш менеджер зв'яжеться з Вами найближчим часов
      </p>
      <Button
        onClick={() => {
          navigate("/", { replace: true });
        }}
        className="completedOrderBtnHome"
      >
        Головна
      </Button>
    </div>
  );
};

export default CompletedOrder;
