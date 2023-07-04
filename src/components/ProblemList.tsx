import { OverviewProblem } from "~/components/OverviewProblem";
import { IContest, IProblem } from "~/types";
import { useEffect, useState } from "react";
import { getContestStatus } from "~/utils";

interface ProblemListProps {
  contest: IContest;
  problems: IProblem[];
  openModal: () => void;
}

function ProblemList(props: ProblemListProps) {
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    const { status } = getContestStatus(props.contest.date_begin, props.contest.time_begin, props.contest.duration);
    setStatus(status);
  }, [props.contest.date_begin, props.contest.time_begin, props.contest.duration]);
  const handleOpenModal = () => {
    if (status !== "Chưa bắt đầu") return;

    props.openModal();
  };

  return (
    <div className={"mx-5 mb-8"}>
      <div className={"flex flex-row items-center justify-between"}>
        <p className={"text-2xl font-semibold"}>Danh sách đề thi</p>
        <button
          className={
            "rounded-md bg-gray-200 px-4 py-2 text-base font-semibold shadow-md duration-200 hover:bg-gray-300"
          }
          onClick={handleOpenModal}
        >
          Thêm đề thi
        </button>
      </div>
      {props.problems.length ? (
        <ul className={"mt-5 grid grid-cols-3 gap-3"}>
          {props.problems.map((problem) => (
            <OverviewProblem
              key={problem.id}
              id={problem.id}
              name={problem.name}
              contest_id={problem.contest_id}
              status={status}
            />
          ))}
        </ul>
      ) : (
        <p className={"mt-5 text-base"}>Cuộc thi này chưa có đề thi</p>
      )}
    </div>
  );
}

export { ProblemList };
