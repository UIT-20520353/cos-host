import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "./login.reducer";
import { IAccount } from "../../types/account.type";
import Swal from "sweetalert2";
import { getAccountList } from "../../query/api/account-service";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  useEffect(() => {
    getAccountList().then((data) => setAccounts(data ?? []));
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let login: IAccount | undefined;
    if (!accounts) {
      Swal.fire({ position: "center", title: "Lỗi mạng", timer: 2000, icon: "error", showConfirmButton: true });
      return;
    } else {
      login = accounts.find((account) => {
        if (account.username === data.username && account.password === data.password && account.roles.name === "HOST")
          return true;
      });
    }

    if (!login) {
      Swal.fire({
        position: "center",
        title: "Tài khoản hoặc mật khẩu không chính xác",
        showConfirmButton: true,
        timer: 2000,
        icon: "error"
      });
    } else {
      dispatch(userLogin({ id: login.id, name: login.name }));
      navigate("/");
      sessionStorage.setItem("id", login.id);
      sessionStorage.setItem("name", login.name);
      Swal.fire({
        position: "bottom-end",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
        toast: true
      });
    }
  };

  const clearStorage = () => {
    return;
  };

  return (
    <div className={"flex h-screen w-full items-center justify-center bg-gray-100"}>
      <form
        className={"grid w-1/2 grid-rows-4 gap-3 rounded-md bg-gray-200 p-3 shadow-md"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={"flex items-center justify-center"}>
          <p className={"text-3xl font-semibold"}>Đăng nhập</p>
        </div>
        <div className={""}>
          <span className={"mb-2 block text-sm font-semibold text-gray-900"}>Tên đăng nhập</span>
          <input
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            type="text"
            autoComplete={"off"}
            {...register("username", { required: "Tên đăng nhập không được bỏ trống" })}
          />
          {errors.username && <span className={"text-xs text-red-600"}>{errors.username.message}</span>}
        </div>
        <div className={""}>
          <span className={"mb-2 block text-sm font-semibold text-gray-900"}>Mật khẩu</span>
          <input
            id={"password"}
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            type="password"
            autoComplete={"off"}
            {...register("password", { required: "Mật khẩu không được bỏ trống" })}
          />
          {errors.password && <span className={"text-xs text-red-600"}>{errors.password.message}</span>}
        </div>
        <div className={"flex flex-col items-start gap-y-3"}>
          <button className={"w-full rounded-lg bg-[#0077b6] py-3 text-gray-100 hover:bg-[#0096c7] hover:text-white"}>
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
