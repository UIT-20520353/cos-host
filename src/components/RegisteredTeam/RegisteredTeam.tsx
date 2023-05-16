import { FaUserAlt } from "react-icons/all";
import { NavLink } from "react-router-dom";

type IMember = {
  id: string;
  name: string;
};

type IProps = {
  id: string;
  key: string;
  nameTeam: string;
  members: IMember[];
};

function RegisteredTeam(props: IProps) {
  return (
    <li
      id={props.id}
      className={
        "flex flex-row items-start justify-between rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"
      }
    >
      <div>
        <p className={"mb-3 truncate text-lg font-semibold"}>{props.nameTeam}</p>

        <ul>
          {props.members.map((member) => (
            <li
              id={member.id}
              key={member.id}
              className={"group mt-4 flex cursor-pointer flex-row items-center gap-x-2"}
            >
              <FaUserAlt className={"inline-block h-5 w-5 opacity-50 group-hover:opacity-100"} />
              <span className={"text-sm text-gray-500 group-hover:text-black group-hover:underline"}>
                {member.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={"flex flex-col items-center gap-y-3"}>
        <NavLink
          to={`/admin/team-profile/${props.id}`}
          className={"rounded-md bg-[#78c6a3] px-4 py-2 text-sm hover:bg-[#469d89] hover:text-white"}
        >
          Chi tiết
        </NavLink>
        <button className={"rounded-md bg-[#ff8fa3] px-4 py-2 text-sm hover:bg-[#c9184a] hover:text-white"}>
          Xóa đội
        </button>
      </div>
    </li>
  );
}

export default RegisteredTeam;
