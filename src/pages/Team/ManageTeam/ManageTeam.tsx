import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Swal from "sweetalert2";
import { IContest } from "../../../types/contest.type";
import { getMyContests } from "../../../query/api/contest-service";
import OverviewContest from "../../../components/OverviewContest";
import { checkStatus } from "../../../utils/ValidateStatus";

function ManageTeam() {
  const [contests, setContests] = useState<IContest[]>([]);
  const [filteredContests, setFilteredContests] = useState<IContest[]>([]);

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
      setFilteredContests(dataContests ?? []);
    }

    Swal.close();
  };

  useEffect(() => {
    document.title = "Quản lý đội";
    handleFetchData();
  }, []);

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
    if (value === "") {
      const temp = [...contests];
      setFilteredContests(temp);
      return;
    }

    const result = contests.filter((contest) => {
      const nameContest = contest.name.toUpperCase();
      return nameContest.includes(value.toUpperCase());
    });
    setFilteredContests(result);
  };

  const updateContestList = () => {
    return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Nhập tên cuộc thi"} onChangeValue={onChangeValue} isUsed={true} />

      <div className={"mx-12 my-10"}>
        <p className={"text-xl font-semibold"}>Danh sách các cuộc thi có thể phê duyệt</p>

        <ul className={"mt-6 grid grid-cols-2 gap-5"}>
          {filteredContests.length !== 0 ? (
            <>
              {filteredContests.map((contest) => {
                if (checkStatus(contest.date_begin, contest.time_begin, contest.duration) !== "Đã kết thúc")
                  return (
                    <OverviewContest
                      name={contest.name}
                      date={contest.date_begin}
                      time={contest.time_begin}
                      key={`contest-${contest.id}`}
                      id={`contest-${contest.id}`}
                      isShowAction={false}
                      duration={contest.duration}
                      updateContestList={updateContestList}
                      isOverviewForManageTeam={true}
                    />
                  );
              })}
            </>
          ) : (
            <p className={"text-base font-medium"}>Không có cuộc thi để phê duyệt</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ManageTeam;
