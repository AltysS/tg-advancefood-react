import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutForm, successfulOrder } from "../../store/cart/cart";
import Button from "../Button/Button";
import {
  setCategoryLevel,
  setCategoryID,
} from "../../store/catalogue/catalogueSlice";
import CloseMenu from "../Header/images/CloseMenu";
import "./CheckoutForm.css";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const savedInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.cart.shoppingCart);
  const [name, setName] = useState(savedInfo?.name || "");
  const [surname, setSurname] = useState(savedInfo?.surname || "");
  const [nurseryName, setNurseryName] = useState(savedInfo?.nurseryName || "");
  const [deliveryAddress, setDeliveryAddress] = useState(
    savedInfo?.deliveryAddress || ""
  );
  const [telephone, setTelephone] = useState(savedInfo?.telephone || "");
  const [email, setEmail] = useState(savedInfo?.email || "");
  const [comments, setComments] = useState(savedInfo?.comments || "");

  const handleInputChange = (value, stateHandler, properyName) => {
    const localItems = JSON.parse(localStorage.getItem("userInfo")) || {
      name,
      surname,
      nurseryName,
      deliveryAddress,
      telephone,
      email,
      comments,
    };
    localItems[properyName] = value;
    stateHandler(value);
    localStorage.setItem("userInfo", JSON.stringify(localItems));
  };

  return (
    <>
      <div className="checkoutForm">
        <div className="closeCheckouMenu">
          <span onClick={() => dispatch(setCheckoutForm(false))}>
            <CloseMenu />
          </span>
        </div>
        <h2 className="checkoutFormTitle">Оформлення замовлення</h2>
        <form
          onSubmit={async (e) => {
            const userOrder = {
              name,
              surname,
              nurseryName,
              deliveryAddress,
              telephone,
              email,
              comments,
              shoppingCart,
            };
            e.preventDefault();
            try {
              // "http://localhost:4000/placeorder

              const data = await fetch(
                "https://breader.detta.com.ua:4000/placeorder",
                {
                  // mode: "no-cors",
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(userOrder),
                }
              ).then((res) => res.json());
              console.log(data);
              if (data.status === 200) {
                localStorage.removeItem("inCart");
                dispatch(successfulOrder());
                dispatch(setCategoryLevel(0));
                dispatch(setCategoryID(null));
                navigate(`/succesfullorder/${data.orderNumber}`);
              }
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <input
            onChange={(e) => {
              handleInputChange(e.target.value, setName, "name");
            }}
            value={name}
            className="checkoutFormInput"
            type="text"
            placeholder="Ім'я"
          />
          <input
            onChange={(e) => {
              handleInputChange(e.target.value, setSurname, "surname");
            }}
            value={surname}
            className="checkoutFormInput"
            type="text"
            placeholder="Прізвище"
          />
          <input
            onChange={(e) => {
              handleInputChange(e.target.value, setNurseryName, "nurseryName");
            }}
            value={nurseryName}
            className="checkoutFormInput"
            type="text"
            placeholder="Назва розплідника"
          />
          <input
            onChange={(e) => {
              handleInputChange(
                e.target.value,
                setDeliveryAddress,
                "deliveryAddress"
              );
            }}
            value={deliveryAddress}
            className="checkoutFormInput"
            type="text"
            placeholder="Адреса доставки"
          />
          <input
            onChange={(e) => {
              handleInputChange(e.target.value, setTelephone, "telephone");
            }}
            value={telephone}
            className="checkoutFormInput"
            type="text"
            placeholder="Телефон"
          />
          <input
            onChange={(e) => {
              handleInputChange(e.target.value, setEmail, "email");
            }}
            value={email}
            className="checkoutFormInput"
            type="text"
            placeholder="E-mail"
          />
          <textarea
            onChange={(e) => {
              handleInputChange(e.target.value, setComments, "comments");
            }}
            value={comments}
            className="checkoutFormCommentsArea"
            placeholder="Коментарі"
          />
          <Button className="checkoutOrderBtn" type="submit">
            {" "}
            Оформити замовлення
          </Button>
        </form>
      </div>

      <div className="modalCheckoutForm"></div>
    </>
  );
};

export default CheckoutForm;
