import { useEffect } from "react";
import Header from "../../components/Header";

function ManageTeam() {
  useEffect(() => {
    document.title = "Quản lý đội";
  }, []);

  return (
    <div className={"w-full"}>
      <Header />
    </div>
  );
}

export default ManageTeam;
