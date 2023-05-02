import React from "react";
import logo from "../../assets/transparent-logo.svg";
import { NavLink } from "react-router-dom";
import {
  RxDashboard,
  BsArrowRightCircle,
  IoCreateOutline,
  MdContentPaste,
  AiOutlineTeam,
  IoIosLogOut
} from "react-icons/all";

type IProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const icons = [RxDashboard, IoCreateOutline, MdContentPaste, AiOutlineTeam, IoIosLogOut];

function SideBar(props: IProps) {
  const { isOpen, toggleMenu } = props;
  const menus: { id: number; title: string; address: string }[] = [
    {
      id: 1,
      title: "Trang chủ",
      address: "/"
    },
    {
      id: 2,
      title: "Tạo cuộc thi",
      address: "add-contest"
    },
    {
      id: 3,
      title: "Quản lý cuộc thi",
      address: "manage-contest"
    },
    {
      id: 4,
      title: "Quản lý đội thi",
      address: "manage-team"
    },
    {
      id: 5,
      title: "Đăng xuất",
      address: "/logout"
    }
  ];

  return (
    <div className={`flex min-h-screen ${isOpen ? "w-72" : "w-20"} flex-col items-center bg-[#EAEAEA] duration-300`}>
      <div className={"relative flex w-full cursor-pointer flex-col items-center py-11"}>
        <img src={logo} alt="Logo web" className={`${isOpen ? "w-48" : "w-14"} duration-300`} />
        <BsArrowRightCircle
          className={`absolute z-50 rounded-full bg-[#fff] ${
            isOpen ? "-right-4 top-4 h-8 w-8" : "-right-3 top-3 h-6 w-6"
          } ${isOpen && "rotate-180"} duration-300`}
          onClick={() => toggleMenu()}
        />
      </div>

      <div className={"flex w-full flex-col items-center gap-y-2"}>
        {menus.map((item) => {
          const Icon = icons[item.id - 1];
          return (
            <NavLink
              className={({ isActive }) =>
                `mt-2 flex w-4/5 cursor-pointer flex-row items-center gap-x-2 rounded-lg p-2 text-lg hover:bg-[#fff] hover:shadow-md ${
                  isActive ? "bg-[#fff] shadow-md" : "bg-[#EAEAEA]"
                }`
              }
              key={item.id}
              to={item.address}
            >
              <Icon className={`mx-3 inline-block h-6 w-6`} />
              <span className={`origin-left duration-200 ${!isOpen && "hidden text-xs"} truncate`}>{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
