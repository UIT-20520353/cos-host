import { FaUserAlt } from "react-icons/all";
import { ITeamMemberDetail } from "../../types/team.type";
import { useEffect, useState } from "react";
import { deleteTeamById, getTeamMemberByTeamId } from "../../query/api/team-service";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

type IProps = {
  id: number;
  nameTeam: string;
  updateTeamList: () => void;
};

function RegisteredTeam(props: IProps) {
  const [teamMembers, setTeamMembers] = useState<ITeamMemberDetail[]>([]);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    const dataMembers = await getTeamMemberByTeamId(props.id);
    if (dataMembers) setTeamMembers(dataMembers ?? []);
  };

  const handleDeleteTeam = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận xóa thông tin đội thi này khỏi cuộc thi?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTeamById(props.id).then((response) => {
          if (response) {
            props.updateTeamList();
          } else {
            Swal.fire({
              position: "center",
              timer: 5000,
              icon: "error",
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              title: "Xảy ra lỗi khi xóa đội"
            });
          }
        });
      }
    });
  };

  return (
    <li
      id={`team-${props.id}`}
      className={
        "flex flex-row items-start justify-between rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"
      }
    >
      <div>
        <p className={"mb-3 truncate text-lg font-semibold"}>{props.nameTeam}</p>

        <ul>
          {teamMembers.map((member) => (
            <li id={`member-${member.id}`} key={`member-${member.id}`} className={"group mt-4 cursor-pointer "}>
              <NavLink to={`/user/${member.account_id}`} className={"flex flex-row items-center gap-x-2"}>
                <FaUserAlt className={"inline-block h-5 w-5 opacity-50 duration-300 group-hover:opacity-100"} />
                <span className={"text-sm text-gray-500 duration-300 group-hover:text-black group-hover:underline"}>
                  {member.accounts.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={"flex flex-col items-center gap-y-3"}>
        <button
          className={
            "rounded-md bg-[#ff8fa3] px-4 py-2 text-sm font-medium duration-300 hover:bg-[#c9184a] hover:text-white"
          }
          onClick={handleDeleteTeam}
        >
          Xóa đội
        </button>
      </div>
    </li>
  );
}

export default RegisteredTeam;
