import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCheckoutForm } from "../../store/cart/cart";
import Button from "../Button/Button";
import CloseMenu from "../Header/images/CloseMenu";
import "./CheckoutForm.css";

const CheckoutForm = () => {
  const savedInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
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
        <form>
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
