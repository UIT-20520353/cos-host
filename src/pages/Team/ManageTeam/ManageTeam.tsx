import { useEffect } from "react";
import Header from "../../../components/Header";
import { RiTeamFill } from "react-icons/all";
import { NavLink } from "react-router-dom";

function ManageTeam() {
  useEffect(() => {
    document.title = "Quản lý đội";
  }, []);

  return (
    <div className={"w-full"}>
      <Header />

      <div className={"mx-12 my-10"}>
        <p className={"text-xl font-semibold"}>Danh sách các cuộc thi có thể phê duyệt</p>

        <ul className={"mt-6 grid grid-cols-2 gap-5"}>
          <li
            className={
              "flex flex-row items-start justify-between rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"
            }
          >
            <div className={"pb-1"}>
              <p className={"mb-3 truncate text-lg font-medium"}>Beginner Free Contest 51</p>
              <div className={"mb-4 mt-4 flex flex-row items-center gap-x-2"}>
                <RiTeamFill className={"inline-block h-5 w-5 opacity-50"} />
                <span className={"text-sm text-gray-500"}>32 đội tham gia</span>
              </div>
              <span className={"rounded-full bg-[#fff2b2] px-4 py-2 text-sm font-semibold text-[#710000]"}>
                Chưa diễn ra
              </span>
            </div>
            <div className={"mt-2"}>
              <NavLink
                className={
                  "rounded-md bg-neutral-300 px-5 py-2.5 text-sm text-black hover:bg-neutral-400 hover:text-white"
                }
                to={"/manage-team/question-1-1"}
              >
                Chi tiết
              </NavLink>
            </div>
          </li>
          <li
            className={
              "flex flex-row items-start justify-between rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"
            }
          >
            <div className={"pb-1"}>
              <p className={"mb-3 truncate text-lg font-medium"}>Testing round 51</p>
              <div className={"mb-4 mt-4 flex flex-row items-center gap-x-2"}>
                <RiTeamFill className={"inline-block h-5 w-5 opacity-50"} />
                <span className={"text-sm text-gray-500"}>25 đội tham gia</span>
              </div>
              <span className={"rounded-full bg-[#fff2b2] px-4 py-2 text-sm font-semibold text-[#710000]"}>
                Chưa diễn ra
              </span>
            </div>
            <div className={"mt-2"}>
              <NavLink
                className={
                  "rounded-md bg-neutral-300 px-5 py-2.5 text-sm text-black hover:bg-neutral-400 hover:text-white"
                }
                to={"/manage-team/question-1-1"}
              >
                Chi tiết
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ManageTeam;
