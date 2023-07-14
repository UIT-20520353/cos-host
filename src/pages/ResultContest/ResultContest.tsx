import { NavLink, useParams } from "react-router-dom";
import { fetchDataRankContest, getContestById } from "~/query";
import { Header } from "~/components";
import { useQuery } from "@tanstack/react-query";
import { getIdFromString } from "~/utils";
import { ResultContestSkeleton } from "~/skeletons";
import { useEffect } from "react";

function ResultContest() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    document.title = "Kết quả cuộc thi";
  }, []);

  const { data: contest, isLoading: isFetchingContest } = useQuery({
    queryKey: ["detail-contest", `contest-${getIdFromString(id)}`],
    queryFn: () => {
      return getContestById(getIdFromString(id));
    }
  });
  const { data, isLoading: isFetchingData } = useQuery({
    queryKey: ["rank-contest", getIdFromString(id)],
    queryFn: () => {
      return fetchDataRankContest(getIdFromString(id));
    }
  });

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} isUsed={false} onChangeValue={onChangeValue} />

      {(isFetchingContest || isFetchingData) && <ResultContestSkeleton />}

      {!isFetchingContest && !isFetchingData && (
        // <div className={"mx-12 my-10"}>
        //   <div className={"flex flex-row items-start justify-between"}>
        //     <p className={"text-xl font-semibold"}>Bảng xếp hạng của cuộc thi {contest?.name}</p>
        //     <NavLink
        //       className={
        //         "rounded-md bg-gray-300 px-4 py-2 text-sm shadow-md duration-300 hover:bg-gray-600 hover:text-white"
        //       }
        //       to={"/manage-contest"}
        //     >
        //       Quay lại
        //     </NavLink>
        //   </div>
        //
        //   <div className={"mt-5 w-full"}>
        //     <table className={"w-full text-left text-sm text-gray-500"}>
        //       <thead className={"bg-gray-200 text-xs uppercase text-gray-700"}>
        //         <tr>
        //           <th scope={"col"} className={"w-32 border border-black px-6 py-3 text-center"}>
        //             Thứ hạng
        //           </th>
        //           <th scope={"col"} className={"border border-black px-6 py-3 text-center"}>
        //             Tên đội
        //           </th>
        //           <th scope={"col"} className={"w-44 border border-black px-6 py-3 text-center"}>
        //             Số bài giải được
        //           </th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {ranks?.map((rank, index) => (
        //           <tr key={`team-${rank.team_id}`} className={"border-b bg-white"}>
        //             <th
        //               scope={"row"}
        //               className={
        //                 "whitespace-nowrap border border-gray-300 px-6 py-4 text-center font-medium text-gray-900"
        //               }
        //             >
        //               {index + 1}
        //             </th>
        //             <td className={"border border-gray-300 px-6 py-4 text-center"}>{rank.team_name}</td>
        //             <td className={"border border-gray-300 px-6 py-4 text-center"}>
        //               {`${rank.total_score} / ${amountProblems}`}
        //             </td>
        //           </tr>
        //         ))}
        //       </tbody>
        //     </table>
        //   </div>
        // </div>

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
          <div className={"mx-auto mt-5 max-h-[550px] w-[1150px] overflow-y-scroll"}>
            <table className="table-auto border-separate border-spacing-1 text-center text-sm text-gray-500">
              <thead className="bg-gray-200 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="min-w-[80px] rounded border border-slate-600 px-6 py-3">
                    Hạng
                  </th>
                  <th scope="col" className="w-full min-w-[384px] rounded border border-slate-600 px-6 py-3">
                    Tên đội
                  </th>
                  {data?.problems.map((problem) => {
                    return (
                      <th
                        key={`header-problem-${problem.id}`}
                        scope="col"
                        className="min-w-[224px] rounded border border-slate-600 px-6 py-3"
                      >
                        {problem.name}
                      </th>
                    );
                  })}
                  <th scope="col" className="min-w-[128px] rounded border border-slate-600 px-6 py-3">
                    Tổng số giải được
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.teams.map((team, index) => {
                  let count = 0;
                  return (
                    <tr key={`rank-row-${index}`} className={`border-b bg-white`}>
                      <th
                        scope="row"
                        className={`whitespace-nowrap rounded border border-black px-3 py-1 font-medium text-black`}
                      >
                        {index + 1}
                      </th>
                      <td className="rounded border border-black px-3 py-1 text-base font-medium text-black">
                        {team.team_name}
                      </td>
                      {data?.problems.map((problem, index2) => {
                        const status = data?.result[`${team.team_id}-${problem.id}`];
                        if (status === "Accepted") count++;
                        return (
                          <td key={`row-${index}-${index2}`} className="text-base font-bold text-black">
                            <div
                              className={`flex h-10 w-full items-center justify-center rounded-md ${
                                status === "Accepted" && "bg-green-600"
                              } ${status === "Wrong answer" && "bg-yellow-300"} ${
                                status === "Not submit" && "bg-gray-200"
                              }`}
                            >
                              <p>{status}</p>
                            </div>
                          </td>
                        );
                      })}
                      <td className="rounded border border-black px-3 py-1 text-base font-medium text-black">
                        {count}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultContest;
