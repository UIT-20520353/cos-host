import { NavLink, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProblem, ITestcase } from "~/types";
import { useEffect, useState } from "react";
import { getProblemById, updateProblem, getTestcases, getContestById } from "~/query";
import Swal from "sweetalert2";
import { checkStatus } from "~/utils";
import { Header, OverviewTestcase } from "~/components";
import AddTestcaseModal from "~/components/Modal/AddTestcaseModal";

const getProblemId = (id: string | undefined): number => {
  let temp: string[] = [];
  if (id) {
    temp = id.toString().split("-");
  }
  return parseInt(temp[1]);
};

function DetailProblem() {
  const { contestId, problemId } = useParams<{ problemId: string; contestId: string }>();
  const [testcases, setTestcases] = useState<ITestcase[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [statusContest, setStatusContest] = useState<string>("");

  const {
    register: registerProblem,
    handleSubmit: handleSubmitProblem,
    formState: { errors: errorsProblem },
    setValue: setValueProblem
  } = useForm<IProblem>();

  useEffect(() => {
    const problem_id = getProblemId(problemId);

    getContestById(getProblemId(contestId)).then((response) => {
      if (response) {
        setStatusContest(checkStatus(response[0].date_begin, response[0].time_begin, response[0].duration));
      }
    });
    getProblemById(problem_id).then((data) => {
      if (data) {
        setValueProblem("id", problem_id);
        setValueProblemForm({
          name: data[0].name,
          detail: data[0].detail,
          example_input: data[0].example_input,
          example_output: data[0].example_output,
          contest_id: data[0].contest_id
        });
      }
    });
    getTestcases(problem_id).then((data) => {
      if (data) {
        setTestcases(data ?? []);
      }
    });
  }, []);
  const updateTestcaseList = async () => {
    const problem_id = getProblemId(problemId);
    const data = await getTestcases(problem_id);
    if (data && data.length !== 0) setTestcases(data ?? []);
  };

  const onSubmitProblemForm: SubmitHandler<IProblem> = (data) => {
    Swal.fire({
      title: "Cập nhật thông tin đề thi",
      text: `Xác nhận sẽ cập nhật các thông tin của đề thi?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        updateProblem(data).then((response) => {
          if (response?.length !== 0 && response) {
            Swal.fire({
              position: "center",
              timer: 5000,
              icon: "success",
              showConfirmButton: true,
              title: "Cập nhật đề thi thành công"
            });
            setValueProblemForm({
              name: data.name,
              detail: data.detail,
              example_input: data.example_input,
              example_output: data.example_output,
              contest_id: data.contest_id
            });
          }
        });
      }
    });
  };

  const setValueProblemForm = ({
    name,
    detail,
    example_input,
    example_output,
    contest_id
  }: {
    name: string;
    detail: string;
    example_input: string;
    example_output: string;
    contest_id: number;
  }) => {
    setValueProblem("name", name);
    setValueProblem("detail", detail);
    setValueProblem("example_input", example_input);
    setValueProblem("example_output", example_output);
    setValueProblem("contest_id", contest_id);
  };
  const openModal = () => {
    if (!(statusContest === "Chưa bắt đầu")) return;

    setIsOpen(true);
  };
  const closeModal = () => {
    updateTestcaseList();
    setIsOpen(false);
  };

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} onChangeValue={onChangeValue} isUsed={false} />

      <form
        onSubmit={handleSubmitProblem(onSubmitProblemForm)}
        className={"mx-5 mt-8 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}
      >
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-2xl font-semibold"}>Thông tin đề thi</p>
          <NavLink
            to={`/manage-contest/${contestId}`}
            className={"rounded-md px-4 py-2 text-base font-semibold duration-300 hover:bg-gray-300"}
          >
            Quay lại
          </NavLink>
        </div>
        <div className={"my-4 flex flex-col items-start gap-y-2"}>
          <span className={"text-sm font-semibold"}>Tên bài thi</span>
          <input
            type={"text"}
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Tên bài thi"}
            autoComplete={"off"}
            {...registerProblem("name", { required: "Tên bài thi không được bỏ trống" })}
            readOnly={!(statusContest === "Chưa bắt đầu")}
          />
          {errorsProblem.name && <span className={"text-xs text-red-600"}>{errorsProblem.name.message}</span>}
        </div>
        <div className={"mb-4 flex flex-col items-start gap-y-2"}>
          <span className={"text-sm font-semibold"}>Đề thi</span>
          <textarea
            placeholder={"Đề thi"}
            rows={10}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...registerProblem("detail", { required: "Đề thi không được bỏ trống" })}
            autoComplete={"off"}
            readOnly={!(statusContest === "Chưa bắt đầu")}
          />
          {errorsProblem.detail && <span className={"text-xs text-red-600"}>{errorsProblem.detail.message}</span>}
        </div>
        <div className={"mb-4 flex flex-col items-start gap-y-2"}>
          <span className={"text-sm font-semibold"}>Input mẫu</span>
          <textarea
            placeholder={"Input mẫu"}
            rows={5}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...registerProblem("example_input", { required: "Input mẫu không được bỏ trống" })}
            autoComplete={"off"}
            readOnly={!(statusContest === "Chưa bắt đầu")}
          />
          {errorsProblem.example_input && (
            <span className={"text-xs text-red-600"}>{errorsProblem.example_input.message}</span>
          )}
        </div>
        <div className={"mb-4 flex flex-col items-start gap-y-2"}>
          <span className={"text-sm font-semibold"}>Output mẫu</span>
          <textarea
            id={"example_output"}
            placeholder={"Output mẫu"}
            rows={5}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...registerProblem("example_output", { required: "Output mẫu không được bỏ trống" })}
            autoComplete={"off"}
            readOnly={!(statusContest === "Chưa bắt đầu")}
          />
          {errorsProblem.example_output && (
            <span className={"text-xs text-red-600"}>{errorsProblem.example_output.message}</span>
          )}
        </div>
        {statusContest === "Chưa bắt đầu" && (
          <div>
            <button
              className={
                "w-40 rounded-lg bg-[#023e8a] py-3 text-base font-semibold text-white duration-200 hover:opacity-80"
              }
              type={"submit"}
            >
              Cập nhật
            </button>
          </div>
        )}
      </form>

      <div className={"mx-5 my-8"}>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"mb-3 text-xl font-semibold"}>Danh sách testcase</p>
          <button
            className={
              "rounded-md bg-gray-200 px-4 py-2 text-base font-semibold shadow-md duration-200 hover:bg-gray-300"
            }
            onClick={openModal}
          >
            Thêm testcase
          </button>
        </div>
        {testcases.length ? (
          <ul className={"mt-5 grid gap-5"}>
            {testcases.map((testcase, index) => (
              <OverviewTestcase
                updateTestcaseList={updateTestcaseList}
                key={`testcase-${testcase.id}`}
                name={index}
                testcase={testcase}
                statusContest={statusContest}
              />
            ))}
          </ul>
        ) : (
          <p className={"text-base font-medium"}>Không có testcase</p>
        )}
      </div>
      {isOpen && <AddTestcaseModal problemId={getProblemId(problemId)} closeModal={closeModal} />}
    </div>
  );
}

export default DetailProblem;
