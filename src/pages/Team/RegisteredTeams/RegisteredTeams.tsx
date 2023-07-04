import { NavLink, useParams } from "react-router-dom";
import { getTeamList } from "~/query";
import { Header } from "~/components";
import RegisteredTeam from "~/components/RegisteredTeam";
import { useQuery } from "@tanstack/react-query";
import { getIdFromString } from "~/utils";
import { RegisteredTeamsSkeleton } from "~/skeletons";

function RegisteredTeams() {
  const { id } = useParams<{ id: string }>();
  const { data: teams, isLoading: isFetchingTeams } = useQuery({
    queryKey: ["manage-team", "team-list", `contest-${getIdFromString(id)}`],
    queryFn: () => {
      return getTeamList(getIdFromString(id));
    }
  });

  const onChangeValue = (value: string | null) => {
    if (value === null) return;

    // if (value === "") {
    //   const temp = [...teams];
    //   setFilteredTeams(temp);
    //   return;
    // }
    //
    // const result = teams.filter((team) => {
    //   const teamName = team.name.toUpperCase();
    //   return teamName.includes(value.toUpperCase());
    // });
    // setFilteredTeams(result);
  };

  const updateTeamList = () => {
    // handleFetchData();
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Nhập tên đội"} onChangeValue={onChangeValue} isUsed={true} />

      {isFetchingTeams && <RegisteredTeamsSkeleton />}

      {!isFetchingTeams && (
        <div className={"mx-12 my-10"}>
          <div className={"flex flex-row items-start justify-between"}>
            <p className={"text-xl font-semibold"}>Danh sách các đội đã đăng ký tham gia</p>
            <NavLink
              className={
                "rounded-md bg-gray-300 px-4 py-2 text-sm shadow-md duration-300 hover:bg-gray-600 hover:text-white"
              }
              to={"/manage-team"}
            >
              Quay lại
            </NavLink>
          </div>

          <ul className={"mt-6 grid grid-cols-3 gap-5"}>
            {teams?.length !== 0 ? (
              <>
                {teams?.map((team) => (
                  <RegisteredTeam
                    updateTeamList={updateTeamList}
                    id={team.id}
                    key={`team-${team.id}`}
                    nameTeam={team.name}
                  />
                ))}
              </>
            ) : (
              <p>Không có đội đăng ký tham gia</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RegisteredTeams;
