import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { BiUserCircle } from "react-icons/all";
import OverviewContest from "../../../components/OverviewContest";

function TeamProfile() {
  const { id } = useParams();

  return (
    <div className={"w-full"}>
      <Header />

      <div className={"mx-12 my-10"}>
        <p className={"text-xl font-semibold"}>
          Thông tin của đội <span className={"uppercase text-red-500"}>{id}</span>
        </p>

        <div className={"mt-6 rounded-md bg-gray-200 shadow-md"}>
          <p className={"px-4 py-3 text-xl font-semibold"}>Thành viên</p>
          <div className={"flex w-full flex-row items-center justify-around gap-x-3 pb-4"}>
            <div className={"flex flex-col items-center gap-y-3"}>
              <BiUserCircle className={"h-24 w-24 cursor-pointer"} />
              <p className={"cursor-pointer text-sm font-medium text-gray-600 hover:text-black hover:underline"}>
                Trương Xuân Vương
              </p>
            </div>
            <div className={"flex flex-col items-center gap-y-3"}>
              <BiUserCircle className={"h-24 w-24 cursor-pointer"} />
              <p className={"cursor-pointer text-sm font-medium text-gray-600 hover:text-black hover:underline"}>
                Bùi Đoàn Khánh Ân
              </p>
            </div>
            <div className={"flex flex-col items-center gap-y-3"}>
              <BiUserCircle className={"h-24 w-24 cursor-pointer"} />
              <p className={"cursor-pointer text-sm font-medium text-gray-600 hover:text-black hover:underline"}>
                Nguyễn Tấn Hậu
              </p>
            </div>
            <div className={"flex flex-col items-center gap-y-3"}>
              <BiUserCircle className={"h-24 w-24 cursor-pointer"} />
              <p className={"cursor-pointer text-sm font-medium text-gray-600 hover:text-black hover:underline"}>
                Trần Nam Đô
              </p>
            </div>
          </div>
        </div>
        <div className={"mt-6 w-full"}>
          <p className={"py-3 text-xl font-semibold"}>Các cuộc thi đã tham gia</p>
          <ul className={"grid grid-cols-2 gap-5"}>
            <OverviewContest
              name={"Test 1"}
              amount={25}
              date={"30/04/2023"}
              time={"08:00 am"}
              id={"contest-1-1"}
              isShowAction={false}
            />
            <OverviewContest
              name={"Test 2"}
              amount={25}
              date={"03/05/2023"}
              time={"10:00 am"}
              id={"contest-2-2"}
              isShowAction={false}
            />
            <OverviewContest
              name={"Test 3"}
              amount={25}
              date={"10/05/2023"}
              time={"01:00 pm"}
              id={"contest-3-3"}
              isShowAction={false}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamProfile;
