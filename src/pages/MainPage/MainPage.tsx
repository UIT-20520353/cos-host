import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "~/components";

function MainPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
