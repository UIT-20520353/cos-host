function ManageTeamSkeleton() {
  return (
    <div className={"mx-12 my-10 animate-pulse space-y-5"}>
      <div className={"h-10 w-1/3 rounded-lg bg-gray-300"}></div>
      <div className={"grid w-full grid-cols-2 gap-4"}>
        {[1, 2, 3, 4].map((item) => {
          return (
            <div key={`manage-team-${item}`} className={"w-full space-y-2 rounded-md bg-gray-200 p-3"}>
              <div className={"h-7 w-1/3 rounded-full bg-gray-400"}></div>
              <div className={"h-7 w-28 rounded-full bg-gray-400"}></div>
              <div className={"h-5 w-1/4 rounded-full bg-gray-400"}></div>
              <div className={"h-5 w-1/4 rounded-full bg-gray-400"}></div>
              <div className={"h-9 w-32 rounded-md bg-gray-400"}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ManageTeamSkeleton };
