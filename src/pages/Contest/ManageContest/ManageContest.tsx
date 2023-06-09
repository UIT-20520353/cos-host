import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import OverviewContest from "../../../components/OverviewContest";
import { getMyContests } from "../../../query/api/contest-service";
import { IContest } from "../../../types/contest.type";
import Swal from "sweetalert2";

function ManageContest() {
  const [contests, setContests] = useState<IContest[]>([]);
  const [filterContests, setFilterContests] = useState<IContest[]>([]);

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

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
    if (value === "") {
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
      <Header placeHolder={"Nhập tên cuộc thi"} isUsed={true} onChangeValue={onChangeValue} />

      <div className={"mx-12 my-10"}>
        <p className={"text-xl font-semibold"}>Danh sách cuộc thi của bạn</p>
        <ul className={"mt-6 grid grid-cols-2 gap-5"}>
          {filterContests.length !== 0 &&
            filterContests.map((contest) => {
              return (
                <OverviewContest
                  name={contest.name}
                  date={contest.date_begin}
                  time={contest.time_begin}
                  key={`contest-${contest.id}`}
                  id={`contest-${contest.id}`}
                  isShowAction={true}
                  duration={contest.duration}
                  updateContestList={updateContestList}
                  isOverviewForManageTeam={false}
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
