function OverviewContest() {
  return (
    <li className={"animate-pulse space-y-2 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}>
      <div className={"h-7 w-40 rounded-full bg-gray-300"}></div>
      <div className={"h-7 w-32 rounded-full bg-gray-300"}></div>
      <div className={"h-6 w-36 rounded-full bg-gray-300"}></div>
      <div className={"h-6 w-40 rounded-full bg-gray-300"}></div>
      <div className={"h-6 w-28 rounded-full bg-gray-300"}></div>
      <div className={"h-6 w-52 rounded-full bg-gray-300"}></div>
      <div className={"flex flex-row items-center gap-x-3"}>
        <div className={"h-8 w-32 rounded-lg bg-gray-300 px-4 py-2"}></div>
        <div className={"h-8 w-32 rounded-lg bg-gray-300 px-4 py-2"}></div>
        <div className={"h-8 w-32 rounded-lg bg-gray-300 px-4 py-2"}></div>
      </div>
    </li>
  );
}

function ManageContestSkeleton() {
  return (
    <div className={"mx-12 my-10"}>
      <p className={"text-xl font-semibold"}>Danh sách cuộc thi của bạn</p>
      <ul className={"mt-6 grid grid-cols-2 gap-5"}>
        {[1, 2, 3, 4].map((item) => {
          return <OverviewContest key={`overview-contest-${item}`} />;
        })}
      </ul>
    </div>
  );
}

export { ManageContestSkeleton };
