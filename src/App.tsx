import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className={"w-full"}>
      <Routes>
        <Route path={"/*"} element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
