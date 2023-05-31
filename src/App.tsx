import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./pages/Login/login.reducer";
import Dashboard from "./pages/Dashboard";
import ManageContest from "./pages/Contest/ManageContest";
import DetailContest from "./pages/Contest/DetailContest";
import ManageTeam from "./pages/Team/ManageTeam";
import RegisteredTeams from "./pages/Team/RegisteredTeams";
import ResultContest from "./pages/ResultContest";
import TeamProfile from "./pages/Team/TeamProfile";
import { RootState } from "./store/store";
import { useEffect } from "react";
import Contest from "./pages/Contest/Contest";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      dispatch(userLogin({ id: sessionStorage.getItem("id") ?? "", name: sessionStorage.getItem("name") ?? "" }));
    }
  }, []);

  return (
    <div className={"w-full"}>
      <Routes>
        <Route path={"/"} element={user.id ? <MainPage /> : <Login />}>
          <Route index={true} element={<Dashboard />} />
          <Route path={"add-contest"} element={<Contest />} />
          <Route path={"manage-contest"}>
            <Route index={true} element={<ManageContest />} />
            <Route path={":id"} element={<DetailContest />} />
          </Route>
          <Route path={"manage-team"}>
            <Route index={true} element={<ManageTeam />} />
            <Route path={":id"} element={<RegisteredTeams />} />
          </Route>
          <Route path={"result-contest/:id"} element={<ResultContest />} />
          <Route path={"team-profile/:id"} element={<TeamProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
