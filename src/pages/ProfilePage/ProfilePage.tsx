import Header from "../../components/Header";
import { useEffect } from "react";

function ProfilePage() {
  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);
  const onChangeValue = (value: string) => {};

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} onChangeValue={onChangeValue} />

      <div className={"mx-12 my-10"}></div>
    </div>
  );
}

export default ProfilePage;
