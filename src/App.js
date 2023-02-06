import "./App.css";
import React, { useEffect } from "react";
import useTelegram from "./hooks/useTelegram";
import AppRoutes from "./AppRoutes";

function App() {
  const { tg } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
