import { CgProfile } from "react-icons/all";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocalStorage } from "~/utils";

type IProps = {
  placeHolder: string;
  onChangeValue: (value: string | null) => void;
  isUsed: boolean;
};

function Header(props: IProps) {
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const [user] = useLocalStorage("user", null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnChange = () => {
    if (!inputSearchRef.current) return;
    if (props.isUsed) props.onChangeValue(inputSearchRef.current.value);
    else props.onChangeValue(null);
  };

  return (
    <div
      className={
        "flex h-16 w-full flex-row items-center justify-between border-b border-gray-200 bg-[#efefef] px-8 shadow-md"
      }
    >
      <div>
        <input
          ref={inputSearchRef}
          type="text"
          className={
            "min-h-[50px] w-80 rounded-full border border-solid border-[#5e4dcd] bg-transparent px-4 py-0 text-[15px] text-black focus:border-[#3898EC] focus:outline-none"
          }
          onChange={handleOnChange}
          placeholder={props.placeHolder}
        />
      </div>
      <div className={"flex cursor-pointer flex-row items-center gap-x-4"}>
        <span className={"font-mono text-lg font-bold"}>{user?.name}</span>
        <div className={"relative"} onMouseLeave={() => setIsOpen(false)}>
          <button type={"button"} onMouseOver={() => setIsOpen(true)} onFocus={() => setIsOpen(true)}>
            <CgProfile className={"h-10 w-10 cursor-pointer opacity-60 duration-300 hover:opacity-100"} />
          </button>
          <div
            className={`absolute -left-40 flex ${
              !isOpen ? "hidden" : "block"
            } w-[200px] flex-col justify-center rounded-[5px] bg-gray-500 duration-300`}
          >
            <NavLink
              className={
                'relative flex cursor-pointer gap-[5px] rounded border-[none] bg-transparent p-2.5 text-[white] duration-200 before:absolute before:-left-2.5 before:top-[5px] before:h-4/5 before:w-[5px] before:rounded-[5px] before:bg-[#2F81F7] before:opacity-0 before:content-[""] hover:bg-[#21262C]'
              }
              to={"/profile"}
            >
              Thông tin tài khoản
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Header };
