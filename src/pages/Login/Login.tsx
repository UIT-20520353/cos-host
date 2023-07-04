import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { ISimpleAccount } from "~/types";
import { handleLogin } from "~/query/api/account-service";
import { useSessionStorage } from "~/utils";
import { useMutation } from "@tanstack/react-query";
import { LoadingModal } from "~/components";
import { useEffect } from "react";

interface FormValues {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [, setUser] = useSessionStorage("user", null);

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const { register, handleSubmit } = useForm<FormValues>();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (body: FormValues) => {
      const hashPassword = CryptoJS.SHA256(body.password).toString();
      return handleLogin(body.username, hashPassword);
    },
    onSuccess: (data: ISimpleAccount) => {
      if (data.id === -1) {
        toast("Tên đăng nhập hoặc mật khẩu không chính xác", {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false,
          type: "error"
        });
        return;
      }
      setUser({ id: data.id, name: data.name });
      navigate("/");
      toast("Đăng nhập thành công", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false,
        type: "success"
      });
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!data.username) {
      toast("Vui lòng nhập tên đăng nhập", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false,
        type: "warning"
      });
      return;
    }
    if (!data.password) {
      toast("Vui lòng nhập mật khẩu", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false,
        type: "warning"
      });
      return;
    }

    login(data);
  };

  return (
    <div className={"flex h-screen w-full items-center justify-center bg-gray-100"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-1/2 rounded-md bg-[#4F5169] px-8 pb-5 pt-7 text-center text-[#222E3D] shadow-md"}
      >
        <p className={"text-2xl font-semibold text-white"}>Đăng nhập</p>
        <div
          className={
            "relative mt-4 flex flex-row items-center justify-center gap-x-2 rounded-md bg-[#1f2029] px-4 py-2"
          }
        >
          <svg className={"h-5 w-5 fill-[#ffeba7]"} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z" />
          </svg>
          <input
            id={"user-name"}
            placeholder={"Tên đăng nhập"}
            className={
              "w-full border-0 bg-transparent py-2 text-[#d3d3d3] outline-none focus:placeholder:opacity-0 focus:placeholder:transition-opacity focus:placeholder:duration-500"
            }
            type="text"
            autoComplete={"off"}
            {...register("username")}
          />
        </div>
        <div
          className={
            "relative mt-4 flex flex-row items-center justify-center gap-x-2 rounded-md bg-[#1f2029] px-4 py-2"
          }
        >
          <svg className={"h-5 w-5 fill-[#ffeba7]"} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path>
          </svg>
          <input
            id={"password"}
            className={
              "w-full border-0 bg-transparent py-2 text-[#d3d3d3] outline-none focus:placeholder:opacity-0 focus:placeholder:transition-opacity focus:placeholder:duration-500"
            }
            type="password"
            autoComplete={"off"}
            placeholder={"Mật khẩu"}
            {...register("password")}
          />
        </div>
        <div className={"mt-4 flex flex-col items-start"}>
          <button
            className={
              "w-full rounded-md bg-[#ffeba7] py-3 font-bold uppercase text-[#1f2029] outline-none transition-colors duration-500 hover:bg-[#1f2029] hover:text-[#ffeba7]"
            }
            type={"submit"}
          >
            Đăng nhập
          </button>
        </div>
      </form>
      {isLoading && <LoadingModal title={"Đang xử lý đăng nhập"} />}
    </div>
  );
}

export default Login;
