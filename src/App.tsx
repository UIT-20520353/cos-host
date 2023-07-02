import { Route, Routes } from "react-router-dom";
import MainPage from "~/pages/MainPage";
import Login from "~/pages/Login";
import Dashboard from "~/pages/Dashboard";
import ProfilePage from "~/pages/ProfilePage";
import UserPage from "~/pages/UserPage";
import Contest from "~/pages/Contest/Contest";
import DetailProblem from "~/pages/problem/DetailProblem";
import TeamProfile from "~/pages/Team/TeamProfile";
import ManageTeam from "~/pages/Team/ManageTeam";
import DetailContest from "~/pages/Contest/DetailContest";
import ManageContest from "~/pages/Contest/ManageContest";
import RegisteredTeams from "~/pages/Team/RegisteredTeams";
import ResultContest from "~/pages/ResultContest";
import { ProtectedRoute } from "~/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={"w-full"}>
      <Routes>
        <Route
          path={"/"}
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        >
          <Route index={true} element={<Dashboard />} />
          <Route path={"profile"} element={<ProfilePage />} />
          <Route path={"user/:id"} element={<UserPage />} />
          <Route path={"add-contest"} element={<Contest />} />
          <Route path={"manage-contest"}>
            <Route index={true} element={<ManageContest />} />
            <Route path={":contestId"}>
              <Route element={<DetailContest />} index={true} />
              <Route path={":problemId"} element={<DetailProblem />} />
            </Route>
          </Route>
          <Route path={"manage-team"}>
            <Route index={true} element={<ManageTeam />} />
            <Route path={":id"} element={<RegisteredTeams />} />
          </Route>
          <Route path={"result-contest/:id"} element={<ResultContest />} />
          <Route path={"team-profile/:id"} element={<TeamProfile />} />
        </Route>
        <Route path={"/login"} element={<Login />} />
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} closeOnClick={false} draggable={false} />
    </div>
  );
}

export default App;
