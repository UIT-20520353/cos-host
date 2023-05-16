import { useEffect } from "react";
import Header from "../../../components/Header";
import OverviewContest from "../../../components/OverviewContest";

type IContest = {
  id: string;
  name: string;
  amount: number;
  date: string;
  time: string;
};

const listContest: IContest[] = [
  {
    id: "question-1-2",
    name: "Beginner Free Contest 51",
    amount: 32,
    date: "15/04/2023",
    time: "10:00 am"
  },
  {
    id: "question-2-3",
    name: "Testing Round 49",
    amount: 25,
    date: "06/05/2023",
    time: "02:00 pm"
  },
  {
    id: "question-4-3",
    name: "Thi học sinh giỏi tin học cấp quốc gia",
    amount: 50,
    date: "30/04/2023",
    time: "05:00 am"
  }
];

function ManageContest() {
  useEffect(() => {
    document.title = "Quản lý cuộc thi";
  }, []);

  return (
    <div className={"w-full"}>
      <Header />

      <div className={"mx-12 my-10"}>
        <p className={"text-xl font-semibold"}>Danh sách cuộc thi của bạn</p>
        <ul className={"mt-6 grid grid-cols-2 gap-5"}>
          {listContest.map((contest) => {
            return (
              <OverviewContest
                name={contest.name}
                amount={contest.amount}
                date={contest.date}
                time={contest.time}
                key={contest.id}
                id={contest.id}
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
