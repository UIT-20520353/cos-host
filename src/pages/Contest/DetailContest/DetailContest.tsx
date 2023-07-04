import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getContestById, getProblems } from "~/query";
import { getIdFromString } from "~/utils";
import { AddProblemModal, ContestForm, Header, ProblemList } from "~/components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DetailContestSkeleton } from "~/skeletons";

function DetailContest() {
  const { contestId } = useParams<{ contestId: string }>();
  const queryClient = useQueryClient();

  const id = useMemo(() => {
    return getIdFromString(contestId);
  }, [contestId]);

  useEffect(() => {
    document.title = "Cập nhật thông tin cuộc thi";
  }, []);

  // const { data: contest, isLoading: isFetchingContest } = useQuery({
  //   queryKey: ["detail-contest", `contest-${id}`],
  //   queryFn: () => {
  //     return getContestById(id);
  //   }
  // });
  const contestResponse = useQuery({
    queryKey: ["detail-contest", `contest-${id}`],
    queryFn: () => {
      return getContestById(id);
    }
  });
  const { data: problems, isLoading: isFetchingProblems } = useQuery({
    queryKey: ["detail-contest", "problem-list", `contest-${id}`],
    queryFn: () => {
      return getProblems(id);
    }
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ["detail-contest", "problem-list", `contest-${id}`] });
  };

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Nhập tên đề thi"} isUsed={true} onChangeValue={onChangeValue} />

      {/*{(isFetchingContest || isFetchingProblems) && <DetailContestSkeleton />}*/}
      {(contestResponse.isLoading || isFetchingProblems) && <DetailContestSkeleton />}

      {!contestResponse.isLoading && !isFetchingProblems && (
        <>
          <ContestForm contest={contestResponse.data} />
          <ProblemList contest={contestResponse.data} problems={problems} openModal={openModal} />
        </>
      )}

      {isOpen && <AddProblemModal closeModal={closeModal} contestId={id} />}
    </div>
  );
}

export default DetailContest;
