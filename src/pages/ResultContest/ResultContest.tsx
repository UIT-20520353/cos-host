import { NavLink, useParams } from "react-router-dom";
import { countProblemByContestId, getContestById, getTeamRanks } from "~/query";
import { Header } from "~/components";
import { useQuery } from "@tanstack/react-query";
import { getIdFromString } from "~/utils";
import { ResultContestSkeleton } from "~/skeletons";

function ResultContest() {
  const { id } = useParams<{ id: string }>();

  const { data: contest, isLoading: isFetchingContest } = useQuery({
    queryKey: ["detail-contest", `contest-${getIdFromString(id)}`],
    queryFn: () => {
      return getContestById(getIdFromString(id));
    }
  });
  const { data: ranks, isLoading: isFetchingRanks } = useQuery({
    queryKey: ["result-contest", "rank-list", `contest-${getIdFromString(id)}`],
    queryFn: () => {
      return getTeamRanks(getIdFromString(id));
    }
  });

  const { data: amountProblems, isLoading: isFetchingProblems } = useQuery({
    queryKey: ["result-contest", "amount-problem", `contest-${getIdFromString(id)}`],
    queryFn: () => {
      return countProblemByContestId(getIdFromString(id));
    }
  });

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} isUsed={false} onChangeValue={onChangeValue} />

      {(isFetchingContest || isFetchingRanks || isFetchingProblems) && <ResultContestSkeleton />}

      {!isFetchingContest && !isFetchingRanks && !isFetchingProblems && (
        <div className={"mx-12 my-10"}>
          <div className={"flex flex-row items-start justify-between"}>
            <p className={"text-xl font-semibold"}>Bảng xếp hạng của cuộc thi {contest?.name}</p>
            <NavLink
              className={
                "rounded-md bg-gray-300 px-4 py-2 text-sm shadow-md duration-300 hover:bg-gray-600 hover:text-white"
              }
              to={"/manage-contest"}
            >
              Quay lại
            </NavLink>
          </div>

          <div className={"mt-5 w-full"}>
            <table className={"w-full text-left text-sm text-gray-500"}>
              <thead className={"bg-gray-200 text-xs uppercase text-gray-700"}>
                <tr>
                  <th scope={"col"} className={"w-32 border border-black px-6 py-3 text-center"}>
                    Thứ hạng
                  </th>
                  <th scope={"col"} className={"border border-black px-6 py-3 text-center"}>
                    Tên đội
                  </th>
                  <th scope={"col"} className={"w-44 border border-black px-6 py-3 text-center"}>
                    Số bài giải được
                  </th>
                </tr>
              </thead>
              <tbody>
                {ranks?.map((rank, index) => (
                  <tr key={`team-${rank.team_id}`} className={"border-b bg-white"}>
                    <th
                      scope={"row"}
                      className={
                        "whitespace-nowrap border border-gray-300 px-6 py-4 text-center font-medium text-gray-900"
                      }
                    >
                      {index + 1}
                    </th>
                    <td className={"border border-gray-300 px-6 py-4 text-center"}>{rank.team_name}</td>
                    <td className={"border border-gray-300 px-6 py-4 text-center"}>
                      {`${rank.total_score} / ${amountProblems}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultContest;
