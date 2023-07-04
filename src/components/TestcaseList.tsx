import { IContest, IProblem, ITestcase } from "~/types";
import { OverviewTestcase } from "~/components";
import { useEffect, useState } from "react";
import { getContestStatus } from "~/utils";

interface TestcaseListProps {
  contest: IContest;
  testcases: ITestcase[];
  openModal: () => void;
  problem: IProblem;
}

function TestcaseList(props: TestcaseListProps) {
  const [statusContest, setStatusContest] = useState<string>("");
  useEffect(() => {
    const { status } = getContestStatus(props.contest.date_begin, props.contest.time_begin, props.contest.duration);
    setStatusContest(status);
  }, [props.contest, props.contest.date_begin, props.contest.date_begin, props.contest.duration]);

  const handleOpenModal = () => {
    if (!(statusContest === "Chưa bắt đầu")) return;
    props.openModal();
  };

  return (
    <div className={"mx-5 my-8"}>
      <div className={"flex flex-row items-center justify-between"}>
        <p className={"mb-3 text-xl font-semibold"}>Danh sách testcase</p>
        <button
          className={
            "rounded-md bg-gray-200 px-4 py-2 text-base font-semibold shadow-md duration-200 hover:bg-gray-300"
          }
          onClick={handleOpenModal}
        >
          Thêm testcase
        </button>
      </div>
      {props.testcases.length ? (
        <ul className={"mt-5 grid gap-5"}>
          {props.testcases.map((testcase, index) => (
            <OverviewTestcase
              key={`testcase-${testcase.id}`}
              name={index}
              testcase={testcase}
              statusContest={statusContest}
              problemId={props.problem.id}
            />
          ))}
        </ul>
      ) : (
        <p className={"text-base font-medium"}>Không có testcase</p>
      )}
    </div>
  );
}

export { TestcaseList };
