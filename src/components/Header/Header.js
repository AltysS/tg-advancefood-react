import React, { useEffect } from "react";
import Button from "../Button/Button";
import useTelegram from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const tg = window.Telegram.WebApp;

const Header = () => {
  const navigate = useNavigate();
  const { user, onClose } = useTelegram();

  return (
    <div className={"header"}>
      <Button onClick={navigate(-1)}>Go Back</Button>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};

export default Header;
