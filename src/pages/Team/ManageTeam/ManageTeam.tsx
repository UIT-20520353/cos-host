import { getMyContests } from "~/query";
import { checkStatus, useSessionStorage } from "~/utils";
import { Header, OverviewContest } from "~/components";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ManageTeamSkeleton } from "~/skeletons";

function ManageTeam() {
  const [user] = useSessionStorage("cos-host", null);
  const [searchText, setSearchText] = useState<string>("");

  const { data: contests, isLoading: isFetchingContests } = useQuery({
    queryKey: ["manage-contest", "contest-list", `host-${user.id}`, searchText],
    queryFn: () => {
      return getMyContests(user.id, searchText);
    }
  });

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
    setSearchText(value);
  };

  const updateContestList = () => {
    return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Nhập tên cuộc thi"} onChangeValue={onChangeValue} isUsed={true} />

      {isFetchingContests && <ManageTeamSkeleton />}

      {!isFetchingContests && (
        <div className={"mx-12 my-10"}>
          <p className={"text-xl font-semibold"}>Danh sách các cuộc thi có thể phê duyệt</p>

          <ul className={"mt-6 grid grid-cols-2 gap-5"}>
            {contests?.length !== 0 ? (
              <>
                {contests?.map((contest) => {
                  if (checkStatus(contest.date_begin, contest.time_begin, contest.duration) !== "Đã kết thúc")
                    return (
                      <OverviewContest
                        contest={contest}
                        key={`contest-${contest.id}`}
                        id={`contest-${contest.id}`}
                        isShowAction={false}
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
      )}
    </div>
  );
}

export default ManageTeam;
