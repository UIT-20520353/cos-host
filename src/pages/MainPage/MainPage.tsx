import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Dashboard from "../Dashboard";
import AddContest from "../Contest/AddContest";
import ManageContest from "../Contest/ManageContest";
import ManageTeam from "../Team/ManageTeam";
import DetailContest from "../Contest/DetailContest";
import RegisteredTeams from "../Team/RegisteredTeams";
import ResultContest from "../ResultContest";
import TeamProfile from "../Team/TeamProfile";

function MainPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={"flex w-full flex-row"}>
      <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className={"flex-1 bg-[#fff]"}>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/add-contest"} element={<AddContest />} />
          <Route path={"/manage-contest"}>
            <Route index={true} element={<ManageContest />} />
            <Route path={":id"} element={<DetailContest />} />
          </Route>
          <Route path={"/manage-team"}>
            <Route index={true} element={<ManageTeam />} />
            <Route path={":id"} element={<RegisteredTeams />} />
          </Route>
          <Route path={"/result-contest/:id"} element={<ResultContest />} />
          <Route path={"/team-profile/:id"} element={<TeamProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainPage;
