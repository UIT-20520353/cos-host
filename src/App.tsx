import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";

function App() {
  return (
    <div className={"w-full"}>
      <Routes>
        {/*<Route path={"/login"} element={<Login />} />*/}
        <Route path={"/"} element={<Login />} />
        <Route
          path={"/admin/*"}
          element={localStorage.getItem("accessToken") === "matkhau123" ? <MainPage /> : <Navigate to={"/"} replace={true} />}
        />
      </Routes>
    </div>
  );
}

export default App;
