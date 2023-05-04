import { useEffect } from "react";
import Header from "../../../components/Header";

function ManageContest() {
  useEffect(() => {
    document.title = "Quản lý cuộc thi";
  }, []);

  return (
    <div className={"w-full"}>
      <Header />
    </div>
  );
}

export default ManageContest;
