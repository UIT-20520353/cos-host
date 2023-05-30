import { FaSearch, VscAccount } from "react-icons/all";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Header() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div
      className={
        "flex h-16 w-full flex-row items-center justify-between border-b border-gray-200 bg-[#efefef] px-8 shadow-md"
      }
    >
      <FaSearch className={"h-8 w-8 cursor-pointer"} />
      <div className={"flex cursor-pointer flex-row items-center"}>
        <span className={"text-lg font-bold"}>{user.name}</span>
        <VscAccount className={"ml-5 h-8 w-8"} />
      </div>
    </div>
  );
}

export default Header;
