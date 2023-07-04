import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { getProblemById, getTestcases, getContestById } from "~/query";
import { getIdFromString } from "~/utils";
import { AddTestcaseModal, Header, TestcaseList, ProblemForm } from "~/components";
import { DetailProblemSkeleton } from "~/skeletons";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function DetailProblem() {
  const { contestId, problemId } = useParams<{ problemId: string; contestId: string }>();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const idContestNumber = useMemo(() => {
    return getIdFromString(contestId);
  }, [contestId]);
  const idProblemNumber = useMemo(() => {
    return getIdFromString(problemId);
  }, [problemId]);

  const { data: problem, isLoading: isFetchingProblem } = useQuery({
    queryKey: ["detail-problem", `problem-${idProblemNumber}`],
    queryFn: () => {
      return getProblemById(idProblemNumber);
    }
  });
  const { data: contest, isLoading: isFetchingContest } = useQuery({
    queryKey: ["detail-contest", `contest-${idContestNumber}`],
    queryFn: () => {
      return getContestById(idContestNumber);
    }
  });
  const { data: testcases, isLoading: isFetchingTestcases } = useQuery({
    queryKey: ["detail-problem", "testcase-list", `problem-${idProblemNumber}`],
    queryFn: () => {
      return getTestcases(idProblemNumber);
    }
  });

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ["detail-problem", "testcase-list", `problem-${idProblemNumber}`] });
  };

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} onChangeValue={onChangeValue} isUsed={false} />

      {(isFetchingProblem || isFetchingContest || isFetchingTestcases) && <DetailProblemSkeleton />}

      {!isFetchingProblem && !isFetchingContest && !isFetchingTestcases && (
        <>
          <ProblemForm problem={problem} contest={contest} />
          <TestcaseList contest={contest} problem={problem} testcases={testcases} openModal={openModal} />
        </>
      )}
      {isOpen && <AddTestcaseModal problemId={getIdFromString(problemId)} closeModal={closeModal} />}
    </div>
  );
}

export default DetailProblem;
