function TableRow() {
  return (
    <div className={"flex w-full animate-pulse flex-row items-center gap-x-2 border border-t-0 border-black p-3"}>
      <div className={"h-5 w-20 rounded-full bg-gray-400"}></div>
      <div className={"h-5 w-full rounded-full bg-gray-400"}></div>
      <div className={"h-5 w-32 rounded-full bg-gray-400"}></div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className={"mx-5 my-8 flex flex-row items-start gap-x-5"}>
      <div className={"flex w-3/5 flex-col items-start gap-y-7"}>
        <p className={"-mb-2 text-2xl font-medium"}>Các cuộc thi sắp diễn ra</p>
        <div className={"w-full animate-pulse space-y-2"}>
          <div className={"h-5 w-1/6 rounded-full bg-gray-300"}></div>
          <div className={"h-5 w-2/3 rounded-full bg-gray-300"}></div>
        </div>
        <div className={"w-full animate-pulse space-y-2"}>
          <div className={"h-5 w-1/6 rounded-full bg-gray-300"}></div>
          <div className={"h-5 w-2/3 rounded-full bg-gray-300"}></div>
        </div>
        <div className={"w-full animate-pulse space-y-2"}>
          <div className={"h-5 w-1/6 rounded-full bg-gray-300"}></div>
          <div className={"h-5 w-2/3 rounded-full bg-gray-300"}></div>
        </div>
      </div>
      <div className={"flex w-[35%] flex-col items-center gap-y-5"}>
        <div className={"w-full rounded-md border-gray-300 bg-gray-200 p-3 shadow-md"}>
          <p className={"mb-3 text-xl font-semibold text-blue-950"}>Bảng xếp hạng các cuộc thi</p>
          <div className={"flex w-full animate-pulse flex-row items-center gap-x-2 border border-black p-3"}>
            <div className={"h-5 w-20 rounded-full bg-gray-400"}></div>
            <div className={"h-5 w-full rounded-full bg-gray-400"}></div>
            <div className={"h-5 w-32 rounded-full bg-gray-400"}></div>
          </div>
          {[1, 2, 3, 4, 5].map((item) => {
            return <TableRow key={`table-row-${item}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
