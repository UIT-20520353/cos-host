import React from "react";
import Header from "../../../components/Header";
import RegisteredTeam from "../../../components/RegisteredTeam";

type IMember = {
  id: string;
  name: string;
};

const members: IMember[] = [
  {
    id: "user-1-1",
    name: "Trương Xuân Vương"
  },
  {
    id: "user-2-2",
    name: "Bùi Đoàn Khánh Ân"
  }
];

function RegisteredTeams() {
  return (
    <div className={"w-full"}>
      <Header />

      <div className={"mx-12 my-10"}>
        <p className={"text-xl font-semibold"}>Danh sách các đội đã đăng ký tham gia</p>
        <ul className={"mt-6 grid grid-cols-3 gap-5"}>
          <RegisteredTeam id={"team-1-2"} key={"team-1-2"} nameTeam={"Đội này mạnh"} members={members} />
          <RegisteredTeam
            id={"team-2-2"}
            key={"team-2-2"}
            nameTeam={"UIT"}
            members={members.concat([
              { id: "user-3-3", name: "Nguyễn Tấn Hậu" },
              { id: "user-4-4", name: "Nguyễn Đông Anh" }
            ])}
          />
          <RegisteredTeam id={"team-3-2"} key={"team-3-2"} nameTeam={"BKU"} members={members} />
          <RegisteredTeam id={"team-4-2"} key={"team-4-2"} nameTeam={"HCMUS"} members={members} />
        </ul>
      </div>
    </div>
  );
}

export default RegisteredTeams;
