import { AiOutlinePlus, BsTrash } from "react-icons/all";
import Testcase from "../Testcase";
import { useState } from "react";

type IProps = {
  id: string;
  key: string;
  handleAdd: () => void;
  handleDelete: (id: string) => void;
};

function Question(props: IProps) {
  const [totalTestcase, setTotalTestcase] = useState<number>(0);
  const [testcases, setTestcases] = useState<string[]>(["initial"]);

  const handleAddTestcase = () => {
    setTestcases(testcases.concat(`${props.id}-testcase-${totalTestcase}-${testcases.length}`));
    setTotalTestcase((prevState) => prevState + 1);
  };

  const handleDeleteTestcase = (id: string) => {
    const result: string[] = testcases.filter((testcase) => testcase !== id);
    setTestcases(result);
  };

  return (
    <li
      id={props.id}
      className={
        "mx-5 my-8 flex flex-row items-start gap-x-3 rounded-md border border-gray-200 bg-gray-100 p-3 pb-0 shadow-md"
      }
    >
      <div className={"my-3 flex-1 p-4 pb-0"}>
        <div className={"mb-4 flex flex-col items-start gap-y-2"}>
          <label htmlFor={"name-contest"} className={"text-sm font-medium"}>
            Tên bài thi
          </label>
          <input
            type={"text"}
            id={"name-contest"}
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Tên bài thi"}
            required={true}
          />
        </div>
        <div className={"mb-3 flex flex-col items-start gap-y-2"}>
          <label htmlFor={"question"} className={"text-sm font-medium"}>
            Đề bài
          </label>
          <textarea
            id={"question"}
            placeholder={"Đề bài + giải thích usecase mẫu nếu có"}
            rows={15}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className={"mb-3 flex flex-col items-start gap-y-2"}>
          <label htmlFor={"example-input"} className={"text-sm font-medium"}>
            Input
          </label>
          <textarea
            id={"question"}
            placeholder={"Input mẫu"}
            rows={5}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className={"mb-6 flex flex-col items-start gap-y-2"}>
          <label htmlFor={"question"} className={"text-sm font-medium"}>
            Output
          </label>
          <textarea
            id={"question"}
            placeholder={"Output mẫu"}
            rows={5}
            className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className={"flex flex-col items-start gap-y-4"}>
          <button
            type={"button"}
            className={"rounded-md border border-transparent bg-gray-200 px-6 py-3 hover:bg-gray-300"}
            onClick={() => handleAddTestcase()}
          >
            Thêm test case
          </button>

          {testcases.length !== 0 && (
            <ul className={"mt-6 flex w-full flex-col items-start gap-y-4"}>
              {testcases.map((testcaseId, index) => {
                if (testcaseId !== "initial")
                  return (
                    <Testcase
                      id={testcaseId}
                      key={testcaseId}
                      title={`Testcase ${index}`}
                      handleDelete={handleDeleteTestcase}
                    />
                  );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className={"my-3 flex w-20 flex-col items-center gap-y-2"}>
        <button
          type={"button"}
          className={
            "flex h-10 w-10 items-center justify-center rounded-md border border-transparent bg-gray-200 hover:bg-gray-300"
          }
          onClick={() => props.handleAdd()}
        >
          <AiOutlinePlus className={"h-5 w-5"} />
        </button>
        <button
          type={"button"}
          className={
            "flex h-10 w-10 items-center justify-center rounded-md border border-transparent bg-gray-200 hover:bg-gray-300"
          }
          onClick={() => props.handleDelete(props.id)}
        >
          <BsTrash className={"h-5 w-5"} />
        </button>
      </div>
    </li>
  );
}

export default Question;
