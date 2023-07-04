import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IFormProfile } from "~/types";
import { getAccountInfo, getInfoHost, updateAccountInfo } from "~/query";
import "./styles.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangePasswordModal, Header } from "~/components";
import { useSessionStorage } from "~/utils";

const isPhoneNumberValid = (phoneNumber: string | null): boolean | string => {
  if (!phoneNumber) return "Vui lòng nhập số điện thoại";

  const phoneRegex = /^(03[2-9]|05[2689]|07[06-9]|08[1-9]|09[0-9])[0-9]{7}$/;
  return phoneRegex.test(phoneNumber) || "Số điện thoại không hợp lệ";
};

export const isEmailValid = (value: string | null) => {
  if (!value) {
    return "Vui lòng nhập email";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "Email không hợp lệ";
};

function ProfilePage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [user] = useSessionStorage("user", null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IFormProfile>();

  useEffect(() => {
    document.title = "Thông tin tài khoản";
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });

    const dataAccount = await getAccountInfo(user.id);
    if (dataAccount) {
      setValue("name", dataAccount[0].name);
      setValue("email", dataAccount[0].email);
      setValue("address", dataAccount[0].address);
      setValue("phone", dataAccount[0].phone);

      const dataHosts = await getInfoHost(dataAccount[0].host_id);
      if (dataHosts) {
        setValue("nameHost", dataHosts[0].name);
        setValue("emailHost", dataHosts[0].email);
        setValue("phoneHost", dataHosts[0].phone);
        setValue("addressHost", dataHosts[0].address);
      }
    }
    Swal.close();
  };

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };
  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const onSubmit: SubmitHandler<IFormProfile> = (data) => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận cập nhật thông tin tài khoản?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        const user_id = parseInt(sessionStorage.getItem("id") ?? "-1");
        updateAccountInfo(user_id, data.name, data.email, data.address, data.phone).then((response) => {
          if (response && response.length !== 0) {
            Swal.fire({
              position: "center",
              timer: 5000,
              icon: "success",
              showConfirmButton: true,
              title: "Thông báo",
              text: "Cập nhật thông tin tài khoản thành công"
            });
          } else {
            Swal.fire({
              position: "center",
              timer: 5000,
              icon: "error",
              showConfirmButton: true,
              title: "Thông báo",
              text: "Xảy ra lỗi khi cập nhật thông tin tài khoản"
            });
          }
        });
      }
    });
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} isUsed={false} onChangeValue={onChangeValue} />

      <div className={"mx-12 my-10"}>
        <form onSubmit={handleSubmit(onSubmit)} className={"grid gap-y-8"}>
          <div className={"flex flex-row items-center justify-between"}>
            <p className={"text-xl font-semibold"}>Thông tin tài khoản</p>
            <button
              className={
                "rounded-md bg-gray-200 px-4 py-2 text-base font-semibold shadow-md outline-none duration-300 hover:bg-gray-300 focus:outline-none active:scale-[0.98]"
              }
              onClick={openModal}
              type={"button"}
            >
              Đổi mật khẩu
            </button>
          </div>
          <div className={"grid grid-cols-2 gap-x-4 gap-y-10"}>
            <div className={"w-full"}>
              <div className={"form__group"}>
                <input
                  id={"full-name"}
                  type={"text"}
                  className={"form__field w-full"}
                  placeholder={"Họ tên"}
                  autoComplete={"off"}
                  {...register("name", { required: "Vui lòng nhập họ tên" })}
                />
                <span className={"form__label"}>
                  Họ tên<span className={"text-red-500"}>*</span>
                </span>
                {errors.name && (
                  <span className={"absolute left-2 top-11 text-xs text-red-600"}>{errors.name.message}</span>
                )}
              </div>
            </div>
            <div className={"w-full"}>
              <div className={"form__group"}>
                <input
                  id={"email"}
                  type={"email"}
                  autoComplete={"off"}
                  className={"form__field w-full"}
                  placeholder={"Email"}
                  {...register("email", {
                    validate: (value) => isEmailValid(value) || "Email không hợp lệ"
                  })}
                />
                <span className={"form__label"}>
                  Email<span className={"text-red-500"}>*</span>
                </span>
                {errors.email && (
                  <span className={"absolute left-2 top-11 text-xs text-red-600"}>{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className={"w-full"}>
              <div className={"form__group"}>
                <input
                  id={"address"}
                  type={"text"}
                  className={"form__field w-full"}
                  placeholder={"Địa chỉ"}
                  autoComplete={"off"}
                  {...register("address", { required: "Vui lòng nhập địa chỉ" })}
                />
                <span className={"form__label"}>
                  Địa chỉ<span className={"text-red-500"}>*</span>
                </span>
                {errors.address && (
                  <span className={"absolute left-2 top-11 text-xs text-red-600"}>{errors.address.message}</span>
                )}
              </div>
            </div>
            <div className={"w-full"}>
              <div className={"form__group"}>
                <input
                  id={"phone"}
                  type={"text"}
                  autoComplete={"off"}
                  className={"form__field w-full"}
                  placeholder={"Số điện thoại"}
                  {...register("phone", { validate: (value) => isPhoneNumberValid(value) })}
                />
                <span className={"form__label"}>
                  Số điện thoại<span className={"text-red-500"}>*</span>
                </span>
                {errors.phone && (
                  <span className={"absolute left-2 top-11 text-xs text-red-600"}>{errors.phone.message}</span>
                )}
              </div>
            </div>
          </div>
          <p className={"text-xl font-semibold"}>Thông tin ban tổ chức</p>
          <div className={"grid grid-cols-2 gap-x-4 gap-y-10"}>
            <div className={"w-full"}>
              <div className={"form__group"}>
                <input
                  id={"name-host"}
                  type={"text"}
                  className={"form__field w-full"}
                  placeholder={"Tên ban tổ chức"}
                  readOnly={true}
                  {...register("nameHost")}
                />
                <span className={"form__label"}>Tên ban tổ chức</span>
              </div>
            </div>
            <div className={"w-full"}>
              <div className={"form__group"}>
                <input
                  id={"email-host"}
                  type={"email"}
                  className={"form__field w-full"}
                  placeholder={"Email"}
                  readOnly={true}
                  {...register("emailHost")}
                />
                <span className={"form__label"}>Email</span>
              </div>
            </div>
            <div className={"w-full"}>
              <div className={"form__group"}>
                <input
                  id={"address-host"}
                  type={"text"}
                  className={"form__field w-full"}
                  placeholder={"Địa chỉ"}
                  readOnly={true}
                  {...register("addressHost")}
                />
                <span className={"form__label"}>Địa chỉ</span>
              </div>
            </div>
            <div className={"w-full"}>
              <div className={"form__group"}>
                <input
                  id={"phone-host"}
                  type={"text"}
                  className={"form__field w-full"}
                  placeholder={"Số điện thoại"}
                  readOnly={true}
                  {...register("phoneHost")}
                />
                <span className={"form__label"}>Số điện thoại</span>
              </div>
            </div>
          </div>
          <button
            className={
              "rounded-md bg-gray-200 py-3 text-base font-semibold shadow-md outline-none duration-300 hover:bg-gray-300 focus:outline-none active:scale-[0.98]"
            }
            type={"submit"}
          >
            Cập nhật thông tin
          </button>
        </form>
      </div>
      {isOpenModal && <ChangePasswordModal closeModal={closeModal} />}
    </div>
  );
}

export default ProfilePage;
