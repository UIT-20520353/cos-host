function DetailProblemSkeleton() {
  return (
    <div className={"mx-5 mt-8 animate-pulse space-y-3 rounded-md border border-gray-200 bg-gray-100 p-3 shadow-md"}>
      <div className={"flex w-full flex-row items-center justify-between"}>
        <div className={"h-8 w-1/6 rounded-full bg-gray-300"}></div>
        <div className={"h-6 w-28 rounded-full bg-gray-300"}></div>
      </div>
      <div className={"flex flex-col items-start gap-y-1"}>
        <div className={"h-6 w-1/12 rounded-full bg-gray-300"}></div>
        <div className={"h-12 w-full rounded-xl bg-gray-300"}></div>
      </div>
      <div className={"flex flex-col items-start gap-y-1"}>
        <div className={"h-6 w-20 rounded-full bg-gray-300"}></div>
        <div className={"h-44 w-full rounded-xl bg-gray-300"}></div>
      </div>
      <div className={"flex flex-col items-start gap-y-1"}>
        <div className={"h-6 w-1/12 rounded-full bg-gray-300"}></div>
        <div className={"h-24 w-full rounded-xl bg-gray-300"}></div>
      </div>
      <div className={"flex flex-col items-start gap-y-1"}>
        <div className={"h-6 w-1/12 rounded-full bg-gray-300"}></div>
        <div className={"h-24 w-full rounded-xl bg-gray-300"}></div>
      </div>
    </div>
  );
}

export { DetailProblemSkeleton };
