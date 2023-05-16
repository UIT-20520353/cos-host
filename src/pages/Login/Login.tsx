import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const userName = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Truoc " + localStorage.getItem("accessToken"));
    localStorage.setItem("accessToken", "matkhau123");
    console.log("Sau " + localStorage.getItem("accessToken"));
    navigate("/admin/dashboard", { replace: true });
  };

  const clearStorage = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <div className={"flex h-screen w-full items-center justify-center bg-gray-100"}>
      <form className={"grid w-1/2 grid-rows-4 gap-3 rounded-md bg-gray-200 p-3 shadow-md"}>
        <div className={"flex items-center justify-center"}>
          <p className={"text-3xl font-semibold"}>Đăng nhập</p>
        </div>
        <div className={""}>
          <label htmlFor={"user-name"} className={"mb-2 block text-sm font-medium text-gray-900"}>
            Tên đăng nhập
          </label>
          <input
            ref={userName}
            id={"user-name"}
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            type="text"
            required={true}
          />
        </div>
        <div className={""}>
          <label htmlFor={"password"} className={"mb-2 block text-sm font-medium text-gray-900"}>
            Mật khẩu
          </label>
          <input
            id={"password"}
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            type="password"
            required={true}
          />
        </div>
        <div className={"flex flex-col items-start gap-y-3"}>
          <button
            className={"w-full rounded-lg bg-[#0077b6] py-3 text-gray-100 hover:bg-[#0096c7] hover:text-white"}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Đăng nhập
          </button>
          <button
            type={"button"}
            onClick={clearStorage}
            className={"cursor-pointer text-sm hover:font-bold hover:underline"}
          >
            Quên mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
