import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { getMyContests } from "../../query/api/contest-service";
import { useDispatch } from "react-redux";
import { addAllContests } from "../../store/contest.reducer";

function MainPage() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    getMyContests().then((response) => {
      dispatch(addAllContests(response ?? []));
    });
  }, []);

  return (
    <div className={"flex w-full flex-row"}>
      <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className={"flex-1 bg-[#fff]"}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
