import { NavLink, useParams } from "react-router-dom";
import Header from "../../components/Header";

function ResultContest() {
  const { id } = useParams();

  return (
    <div className={"w-full"}>
      <Header />
      <div className={"mx-12 my-10"}>
        <div className={"flex flex-row items-start justify-between"}>
          <p className={"text-xl font-semibold"}>Bảng xếp hạng của cuộc thi {id}</p>
          <NavLink
            className={"rounded-md bg-gray-300 px-4 py-2 text-sm hover:bg-gray-800 hover:text-white"}
            to={"/admin/manage-contest"}
          >
            Quay lại
          </NavLink>
        </div>

        <div className={"mt-5 w-full"}>
          <table className={"w-full text-left text-sm text-gray-500"}>
            <thead className={"bg-gray-200 text-xs uppercase text-gray-700"}>
              <tr>
                <th scope={"col"} className={"w-32 border border-black px-6 py-3"}>
                  Thứ hạng
                </th>
                <th scope={"col"} className={"border border-black px-6 py-3"}>
                  Tên đội
                </th>
                <th scope={"col"} className={"w-36 border border-black px-6 py-3"}>
                  Tổng điểm
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={"border-b bg-white"}>
                <th
                  scope={"row"}
                  className={"whitespace-nowrap border border-gray-300 px-6 py-4 font-medium text-gray-900"}
                >
                  1
                </th>
                <td
                  className={
                    "cursor-pointer border border-gray-300 px-6 py-4 hover:font-bold hover:text-black hover:underline"
                  }
                >
                  UIT
                </td>
                <td className={"border border-gray-300 px-6 py-4"}>157</td>
              </tr>
              <tr className={"border-b bg-white"}>
                <th
                  scope={"row"}
                  className={"whitespace-nowrap border border-gray-300 px-6 py-4 font-medium text-gray-900"}
                >
                  2
                </th>
                <td
                  className={
                    "cursor-pointer border border-gray-300 px-6 py-4 hover:font-bold hover:text-black hover:underline"
                  }
                >
                  BKU
                </td>
                <td className={"border border-gray-300 px-6 py-4"}>142</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultContest;
