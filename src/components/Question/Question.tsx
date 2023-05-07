function Question() {
  return (
    <div className={"my-3 flex-1 rounded-lg border border-gray-300 bg-gray-200 p-4"}>
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
      <div className={"mb-3 flex flex-col items-start gap-y-2"}>
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
    </div>
  );
}

export default Question;
