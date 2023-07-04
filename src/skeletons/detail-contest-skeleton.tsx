function DetailContestSkeleton() {
  return (
    <div className={"mx-5 my-8 animate-pulse rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}>
      <div className={"flex flex-row items-center justify-between"}>
        <div className={"h-9 w-1/3 rounded-full bg-gray-300"}></div>
        <div className={"h-7 w-24 rounded-full bg-gray-300"}></div>
      </div>
      <div className={"mt-3 h-6 w-1/6 rounded-full bg-gray-300"}></div>
      <div className={"mt-3 h-12 w-full rounded-lg bg-gray-300"}></div>
      <div className={"mt-3 h-40 w-full rounded-xl bg-gray-300"}></div>
      <div className={"mt-3 grid grid-cols-3 gap-x-3"}>
        <div className={"h-12 rounded-lg bg-gray-300"}></div>
        <div className={"h-12 rounded-lg bg-gray-300"}></div>
        <div className={"h-12 rounded-lg bg-gray-300"}></div>
      </div>
      <div className={"mt-3 flex flex-row items-center gap-x-2"}>
        <div className={"h-12 w-52 rounded-lg bg-gray-300"}></div>
        <div className={"h-12 w-52 rounded-lg bg-gray-300"}></div>
      </div>
    </div>
  );
}

export default DetailContestSkeleton;
