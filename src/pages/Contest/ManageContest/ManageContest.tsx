import { useEffect, useState } from "react";
import { Header, OverviewContest } from "~/components";
import { useSessionStorage } from "~/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyContests } from "~/query";
import { ManageContestSkeleton } from "~/skeletons";

function ManageContest() {
  const queryClient = useQueryClient();
  const [user] = useSessionStorage("user", null);
  const [searchText, setSearchText] = useState<string>("");

  const { data: contests, isLoading: isFetchingContests } = useQuery({
    queryKey: ["manage-contest", "contest-list", `host-${user.id}`, searchText],
    queryFn: () => {
      return getMyContests(user.id, searchText);
    }
  });

  useEffect(() => {
    document.title = "Quản lý cuộc thi";
  }, []);

  const updateContestList = () => {
    queryClient.invalidateQueries({ queryKey: ["manage-contest", "contest-list", `host-${user.id}`] });
  };

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
    setSearchText(value);
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Nhập tên cuộc thi"} isUsed={true} onChangeValue={onChangeValue} />

      {isFetchingContests && <ManageContestSkeleton />}

      {!isFetchingContests && (
        <div className={"mx-12 my-10"}>
          <p className={"text-xl font-semibold"}>Danh sách cuộc thi của bạn</p>
          <ul className={"mt-6 grid grid-cols-2 gap-5"}>
            {contests?.length !== 0 ? (
              <>
                {contests?.map((contest) => {
                  return (
                    <OverviewContest
                      id={`contest-${contest.id}`}
                      key={`contest-${contest.id}`}
                      isShowAction={true}
                      updateContestList={updateContestList}
                      isOverviewForManageTeam={false}
                      contest={contest}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {searchText === "" ? (
                  <p className={"text-base font-medium"}>Bạn chưa có cuộc thi</p>
                ) : (
                  <p className={"text-base font-medium"}>Không có kết quả cần tìm</p>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ManageContest;
