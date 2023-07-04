import { SubmitHandler, useForm } from "react-hook-form";
import { IAccount, IFormChangePassword } from "~/types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import { ModalPortal } from "~/components";
import { changePassword, getAccountInfo } from "~/query";

type ModalProps = {
  closeModal: () => void;
};

function ChangePasswordModal(props: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<IFormChangePassword>();
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  useEffect(() => {
    getAccountInfo(parseInt(sessionStorage.getItem("id") ?? "-1")).then((response) => {
      if (response && response.length !== 0) setAccounts(response ?? []);
    });
  }, []);

  const onSubmit: SubmitHandler<IFormChangePassword> = (data) => {
    const hashOldPassword = CryptoJS.SHA256(data.oldPassword).toString();
    if (hashOldPassword !== accounts[0].password) {
      Swal.fire({
        title: "Thông báo",
        text: "Mật khẩu cũ không đúng",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Đồng ý",
        allowOutsideClick: false
      });
      return;
    }

    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận đổi mật khẩu?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        const hashNewPassword = CryptoJS.SHA256(data.newPassword).toString();
        changePassword(parseInt(sessionStorage.getItem("id") ?? "-1"), hashNewPassword).then((response) => {
          if (response && response.length !== 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Thông báo",
              text: "Đổi mật khẩu hành công",
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              timer: 4000
            });
            props.closeModal();
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Thông báo",
              text: "Xảy ra lỗi khi đổi mật khẩu",
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              timer: 4000
            });
          }
        });
      }
    });
  };

  const checkRePassword = (value: string) => {
    const password = getValues("newPassword");
    if (password) {
      return value === password || "Mật khẩu không trùng khớp";
    }
    return true;
  };

  return (
    <ModalPortal>
      <div className={"fixed left-0 top-0 z-40 h-screen w-full bg-black opacity-50"}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "fixed left-1/2 top-1/2 z-50 max-h-[95%] w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5"
        }
      >
        <p className={"mb-5 text-lg font-semibold"}>Đổi mật khẩu</p>
        <div className={"relative mb-5"}>
          <span className={"text-sm font-semibold"}>Mật khẩu cũ</span>
          <input
            id={"old-password"}
            type={"password"}
            placeholder={"Mật khẩu cũ"}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...register("oldPassword", { required: "Vui lòng nhập mật khẩu cũ" })}
            autoComplete={"off"}
          />
          {errors.oldPassword && <span className={"absolute text-xs text-red-600"}>{errors.oldPassword.message}</span>}
        </div>
        <div className={"relative mb-5"}>
          <span className={"text-sm font-semibold"}>Mật khẩu mới</span>
          <input
            type={"password"}
            id={"new-password"}
            placeholder={"Mật khẩu mới"}
            {...register("newPassword", {
              required: "Vui lòng nhập mật khẩu",
              minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
            })}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            autoComplete={"off"}
          />
          {errors.newPassword && <span className={"absolute text-xs text-red-600"}>{errors.newPassword.message}</span>}
        </div>
        <div className={"relative mb-5"}>
          <span className={"text-sm font-semibold"}>Nhập lại mật khẩu</span>
          <input
            type={"password"}
            id={"re-password"}
            placeholder={"Nhập lại mật khẩu"}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...register("rePassword", {
              required: "Vui lòng nhập lại mật khẩu",
              validate: (value) => checkRePassword(value)
            })}
            autoComplete={"off"}
          />
          {errors.rePassword && <span className={"absolute text-xs text-red-600"}>{errors.rePassword.message}</span>}
        </div>
        <div className={"mt-7 flex flex-row items-center gap-x-3"}>
          <button
            className={
              "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70 focus:outline-none"
            }
            type={"submit"}
          >
            Lưu
          </button>
          <button
            className={
              "w-32 rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70 focus:outline-none"
            }
            type={"button"}
            onClick={props.closeModal}
          >
            Đóng
          </button>
        </div>
      </form>
    </ModalPortal>
  );
}

export { ChangePasswordModal };
