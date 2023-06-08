import { NavLink, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { IContest } from "../../types/contest.type";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getContestById } from "../../query/api/contest-service";
import { getTeamList, getTeamMember } from "../../query/api/team-service";
import { getProblems } from "../../query/api/problem-service";
import { getAllSubmission } from "../../query/api/submission-service";

type IRanking = {
  id: number;
  name: string;
  solved: number;
};

const initialContest: IContest = {
  id: -1,
  name: "",
  description: "",
  date_begin: "",
  time_begin: "",
  duration: "",
  host_id: -1
};

const getIdNumber = (id: string | undefined): number => {
  if (!id) return -1;

  const temp = id.split("-");
  return parseInt(temp[1]);
};

function ResultContest() {
  const { id } = useParams();
  const [contest, setContest] = useState<IContest>(initialContest);
  const [teams, setTeams] = useState<IRanking[]>([]);
  const [numberProblem, setNumberProblem] = useState<number>(0);

  const handleFetchData = async () => {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });

    const contest_id = getIdNumber(id);
    const contestsResponse = await getContestById(contest_id);
    const teamsResponse = await getTeamList(contest_id);
    const problemsResponse = await getProblems(contest_id);
    const submissionsResponse = await getAllSubmission();

    if (
      !teamsResponse ||
      teamsResponse.length === 0 ||
      !problemsResponse ||
      problemsResponse.length === 0 ||
      !contestsResponse ||
      contestsResponse.length === 0 ||
      !submissionsResponse ||
      submissionsResponse.length === 0
    ) {
      Swal.close();
      return;
    }
    setContest(contestsResponse[0] ?? initialContest);
    const teamIds = teamsResponse.map((team) => team.id);
    const teamMembersResponse = await getTeamMember(teamIds);
    if (!teamMembersResponse) {
      Swal.close();
      return;
    }

    const ranking: IRanking[] = [];
    setContest(contestsResponse[0] ?? initialContest);
    for (const team of teamsResponse) {
      ranking.push({ id: team.id, name: team.name, solved: 0 });
    }
    setNumberProblem(problemsResponse.length ?? 0);
    for (const problem of problemsResponse) {
      for (const team of teamsResponse) {
        const members = teamMembersResponse.filter((member) => member.team_id === team.id);
        for (const member of members) {
          const result = submissionsResponse?.find(
            (submission) =>
              submission.account_id === member.account_id &&
              submission.status === "Accepted" &&
              submission.problem_id === problem.id
          );

          if (result) {
            ranking.forEach((rank) => {
              if (rank.id === team.id) rank.solved += 1;
            });
            break;
          }
        }
      }
    }

    const sortedRanking = ranking.sort((a, b) => b.solved - a.solved);
    setTeams(sortedRanking);

    Swal.close();
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} isUsed={false} onChangeValue={onChangeValue} />
      <div className={"mx-12 my-10"}>
        <div className={"flex flex-row items-start justify-between"}>
          <p className={"text-xl font-semibold"}>Bảng xếp hạng của cuộc thi {contest.name}</p>
          <NavLink
            className={"rounded-md bg-gray-300 px-4 py-2 text-sm duration-300 hover:bg-gray-600 hover:text-white"}
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
              {teams.map((team, index) => (
                <tr key={`team-${team.id}`} className={"border-b bg-white"}>
                  <th
                    scope={"row"}
                    className={
                      "whitespace-nowrap border border-gray-300 px-6 py-4 text-center font-medium text-gray-900"
                    }
                  >
                    {index + 1}
                  </th>
                  <td className={"border border-gray-300 px-6 py-4 text-center"}>{team.name}</td>
                  <td className={"border border-gray-300 px-6 py-4 text-center"}>
                    {team.solved}/{numberProblem}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultContest;
