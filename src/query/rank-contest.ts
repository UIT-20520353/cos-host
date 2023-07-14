import { IProblem, ITeamRank } from "~/types";
import { getProblemsByContestId, getRankContest, getTeamRanks } from "~/query";

export interface IDataRankContest {
  problem_id: number;
  problem_name: string;
  team_id: number;
  team_name: string;
  status: string;
}

export async function fetchDataRankContest(
  contestId: number
): Promise<{ problems: IProblem[]; teams: ITeamRank[]; result: { [key: string]: string } }> {
  try {
    const problems = await getProblemsByContestId(contestId);
    const teams = await getTeamRanks(contestId);
    const response = await getRankContest(contestId);

    const result: { [key: string]: string } = {};

    for (const team of teams) {
      for (const problem of problems) {
        const temp = response.filter((item) => item.problem_id === problem.id && item.team_id === team.team_id);
        if (temp.length === 0) {
          const dynamicProperty: { [key: string]: string } = { [`${team.team_id}-${problem.id}`]: "Not submit" };
          Object.assign(result, dynamicProperty);
        } else {
          let isAccepted = false;
          for (const item of temp) {
            if (item.status === "Accepted") {
              const dynamicProperty: { [key: string]: string } = { [`${team.team_id}-${problem.id}`]: "Accepted" };
              Object.assign(result, dynamicProperty);
              isAccepted = true;
              break;
            }
          }
          if (!isAccepted) {
            const dynamicProperty: { [key: string]: string } = { [`${team.team_id}-${problem.id}`]: "Wrong answer" };
            Object.assign(result, dynamicProperty);
          }
        }
      }
    }

    return { problems, teams, result };
  } catch (error) {
    console.error("fetchDataRankContest: ", error);
    return { problems: [], teams: [], result: {} };
  }
}
