import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloaderContainer">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Preloader;
