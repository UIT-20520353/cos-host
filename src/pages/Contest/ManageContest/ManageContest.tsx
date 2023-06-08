import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import OverviewContest from "../../../components/OverviewContest";
import { getMyContests } from "../../../query/api/contest-service";
import { IContest } from "../../../types/contest.type";
import Swal from "sweetalert2";
import { ITeam } from "../../../types/team.type";
import { getTeamListByContestIds } from "../../../query/api/team-service";

function ManageContest() {
  const [contests, setContests] = useState<IContest[]>([]);
  const [filterContests, setFilterContests] = useState<IContest[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);

  const getAmount = (contest_id: number): number => {
    let amount = 0;

    teams.forEach((team) => {
      if (team.contest_id === contest_id) amount++;
    });

    return amount;
  };

  const handleFetchData = async () => {
    Swal.fire({
      title: "Đang lấy dữ liệu cuộc thi",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });

    const dataContests = await getMyContests();
    if (dataContests) {
      setContests(dataContests ?? []);
      setFilterContests(dataContests ?? []);
      const contestIds = dataContests.map((contest) => contest.id);
      const dataTeams = await getTeamListByContestIds(contestIds);
      if (dataContests) setTeams(dataTeams ?? []);
    }

    Swal.close();
  };

  useEffect(() => {
    document.title = "Quản lý cuộc thi";
    handleFetchData();
  }, []);

  const updateContestList = () => {
    getMyContests().then((response) => setContests(response ?? []));
  };

  const onChangeValue = (value: string) => {
    if (!value) {
      const temp = [...contests];
      setFilterContests(temp);
      return;
    }

    const result = contests.filter((contest) => {
      const nameContest = contest.name.toUpperCase();
      return nameContest.includes(value.toUpperCase());
    });
    setFilterContests(result);
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Nhập tên cuộc thi"} onChangeValue={onChangeValue} />

      <div className={"mx-12 my-10"}>
        <p className={"text-xl font-semibold"}>Danh sách cuộc thi của bạn</p>
        <ul className={"mt-6 grid grid-cols-2 gap-5"}>
          {filterContests.length !== 0 &&
            filterContests.map((contest) => {
              return (
                <OverviewContest
                  name={contest.name}
                  amount={getAmount(contest.id)}
                  date={contest.date_begin}
                  time={contest.time_begin}
                  key={`contest-${contest.id}`}
                  id={`contest-${contest.id}`}
                  isShowAction={true}
                  duration={contest.duration}
                  updateContestList={updateContestList}
                />
              );
            })}
          {contests.length === 0 && <p className={"text-base font-medium"}>Bạn chưa có cuộc thi</p>}
        </ul>
      </div>
    </div>
  );
}

export default ManageContest;
