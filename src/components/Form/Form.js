import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import useTelegram from "../../hooks/useTelegram";

const Form = () => {
  const { tg } = useTelegram();
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");

  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      subject,
    };
    tg.onSendData(JSON.stringify(data));
  }, []);

  useEffect(() => {
    tg.WebApp.onEvent("mainButtonClicked", onSendData);
    return tg.WebApp.offEvent("mainButtonClicked", onSendData);
  }, []);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Надіслати дані",
    });
  }, []);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"form"}>
      <input
        value={country}
        className="input"
        type="text"
        placeholder="Країна"
        onChange={onChangeCountry}
      />
      <input
        className="input"
        type="text"
        placeholder="Вулиця"
        value={street}
        onChange={onChangeStreet}
      />
      <select value={subject} onChange={onChangeSubject} className={"select"}>
        <option value="physical">Фізична особа</option>
        <option value="legal">Юридична особа</option>
      </select>
    </div>
  );
};

export default Form;
