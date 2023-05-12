// import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { AiOutlinePlus } from "react-icons/all";
import { useState } from "react";

type ITimeContest = {
  value: string;
  text: string;
};

const listTimeContest: ITimeContest[] = [
  {
    value: "0.5",
    text: "30 phút"
  },
  {
    value: "1",
    text: "1 giờ"
  },
  {
    value: "1.5",
    text: "1 giờ 30 phút"
  },
  {
    value: "2",
    text: "2 giờ"
  },
  {
    value: "2.5",
    text: "2 giờ 30 phút"
  },
  {
    value: "3",
    text: "3 giờ"
  },
  {
    value: "3.5",
    text: "3 giờ 30 phút"
  },
  {
    value: "4",
    text: "4 giờ"
  },
  {
    value: "4.5",
    text: "4 giờ 30 phút"
  },
  {
    value: "5",
    text: "5 giờ"
  },
  {
    value: "5.5",
    text: "5 giờ 30 phút"
  }
];

function DetailContest() {
  // const { id } = useParams();
  const [totalQuestion, setTotalQuestion] = useState<number>(0);
  const [questions, setQuestions] = useState<string[]>(["initial"]);

  const handleAddQuestion = () => {
    setQuestions(questions.concat(`question-${totalQuestion}-${questions.length}`));
    setTotalQuestion((prevState) => prevState + 1);
  };

  return (
    <div className={"w-full"}>
      <Header />

      <form>
        <div className={"mx-5 my-8 rounded-md border border-gray-200 bg-gray-100 shadow-md"}>
          <div className={"p-3"}>
            <p className={"p-3 pb-0 text-3xl font-semibold"}>Thông tin cuộc thi</p>
            <div className={"p-4 pb-0"}>
              <p className={"mb-3 text-lg font-medium"}>Thông tin cuộc thi</p>
              <div className="mb-3">
                <input
                  type={"text"}
                  id={"name-contest"}
                  className={
                    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  }
                  placeholder={"Tên cuộc thi"}
                  required={true}
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder={"Mô tả ngắn gọn về cuộc thi"}
                  rows={5}
                  className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className={"mb-3 flex flex-row items-center justify-between gap-x-6"}>
                <div className={"inline-block flex-1"}>
                  <label className={"mb-2 block text-sm font-medium text-gray-900"} htmlFor={"pickDate"}>
                    Ngày bắt đầu
                  </label>
                  <input
                    id={"pickDate"}
                    type={"date"}
                    className={
                      "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                  />
                </div>
                <div className={"inline-block flex-1"}>
                  <label className={"mb-2 block text-sm font-medium text-gray-900"} htmlFor={"pickTime"}>
                    Giớ bắt đầu
                  </label>
                  <input
                    id={"pickTime"}
                    type="time"
                    className={
                      "inline-block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                  />
                </div>
                <div className={"inline-block flex-1"}>
                  <label htmlFor={"timeContest"} className={"mb-2 block text-sm font-medium text-gray-900"}>
                    Thời gian thi
                  </label>
                  <select
                    id={"timeContest"}
                    className={
                      "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                  >
                    {listTimeContest.map((item) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className={"p-4 pb-0"}>
              <p className={"text-lg font-medium"}>Đề thi</p>
              <div className={"mt-3 flex flex-row items-center gap-x-2"}>
                <button
                  type={"button"}
                  className={
                    "flex h-10 w-10 items-center justify-center rounded-md border border-transparent bg-gray-200 hover:bg-gray-300"
                  }
                  onClick={() => handleAddQuestion()}
                >
                  <AiOutlinePlus className={"h-5 w-5"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DetailContest;
