import { useEffect } from "react";
import Header from "../../../components/Header";

function AddContest() {
  useEffect(() => {
    document.title = "Tạo cuộc thi";
  }, []);

  return (
    <div className={"w-full"}>
      <Header />
    </div>
  );
}

export default AddContest;
