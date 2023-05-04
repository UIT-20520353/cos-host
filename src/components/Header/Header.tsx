import { FaSearch, VscAccount } from "react-icons/all";

function Header() {
  return (
    <div
      className={
        "flex h-16 w-full flex-row items-center justify-between border-b border-gray-200 bg-[#efefef] px-8 shadow-md"
      }
    >
      <FaSearch className={"h-8 w-8 cursor-pointer"} />
      <div className={"flex cursor-pointer flex-row items-center"}>
        <span className={"text-lg font-bold"}>Xuân Vương</span>
        <VscAccount className={"ml-5 h-8 w-8"} />
      </div>
    </div>
  );
}

export default Header;
