import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import OverviewContest from "../../../components/OverviewContest";
import { getMyContests } from "../../../query/api/contest-service";
import { IContest } from "../../../types/contest.type";
// import Swal from "sweetalert2";

function ManageContest() {
  const [myContests, setMyContests] = useState<IContest[]>([]);

  useEffect(() => {
    document.title = "Quản lý cuộc thi";
    getMyContests().then((data) => {
      console.log(data);
      setMyContests(data);
    });
  }, []);

  return (
    <div className={"w-full"}>
      <Header />

      <div className={"mx-12 my-10"}>
        <p className={"text-xl font-semibold"}>Danh sách cuộc thi của bạn</p>
        <ul className={"mt-6 grid grid-cols-2 gap-5"}>
          {myContests.map((contest) => {
            return (
              <OverviewContest
                name={contest.name}
                amount={6}
                date={contest.date_begin}
                time={contest.time_begin}
                key={`contest-${contest.id}`}
                id={`contest-${contest.id}`}
                isShowAction={true}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ManageContest;
