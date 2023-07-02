import { Header } from "~/components";

function UserPage() {
  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} onChangeValue={onChangeValue} isUsed={false} />

      <div className={"mx-12 my-10"}>
        <p className={"text-xl font-semibold"}>Thông tin tài khoản</p>
      </div>
    </div>
  );
}

export default UserPage;
