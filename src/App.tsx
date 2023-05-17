import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className={"w-full"}>
      <Routes>
        {/*<Route path={"/login"} element={<Login />} />*/}
        <Route path={"/"} element={<Login />} />
        <Route path={"/admin/*"} element={user.id ? <MainPage /> : <Navigate to={"/"} replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
