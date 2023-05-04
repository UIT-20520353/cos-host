import { useEffect } from "react";
import Header from "../../components/Header";
import Notification from "../../components/Notification";

type INotification = {
  id: number;
  title: string;
  nameHost: string;
  date: string;
};

const notifications: INotification[] = [
  {
    id: 1,
    title: "Thi học sinh giỏi tin học cấp tỉnh Ninh Thuận",
    nameHost: "Trường trung học phổ thông chuyên Lê Quý Đôn",
    date: "12/03/2023"
  },
  {
    id: 2,
    title: "Thi học sinh giỏi tin học cấp quốc gia",
    nameHost: "Bộ giáo dục",
    date: "30/04/2023"
  },
  {
    id: 3,
    title: "Testing Round 49",
    nameHost: "Free contest",
    date: "06/05/2023"
  },
  {
    id: 4,
    title: "Beginner Free Contest 51",
    nameHost: "Free contest",
    date: "15/04/2023"
  }
];

function Dashboard() {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  return (
    <div className={"w-full"}>
      <Header />

      <div className={"mx-5 mt-8 flex flex-row items-start gap-x-5"}>
        <div className={"flex-1 rounded-md border border-gray-200 bg-gray-100 shadow-md"}>
          <p className={"pl-3 pt-3 text-2xl font-bold"}>Thông báo</p>

          <ul>
            {notifications.map((notification) => {
              return (
                <li key={notification.id}>
                  <Notification title={notification.title} nameHost={notification.nameHost} date={notification.date} />
                </li>
              );
            })}
          </ul>
        </div>

        <div className={"flex w-[35%] flex-col items-center gap-y-5"}>
          <div className={"w-full rounded-md border-gray-300 bg-gray-200 p-3 shadow-md"}>
            <p className={"text-xl font-semibold text-blue-950"}>Bảng xếp hạng các đội</p>
            {/*<table className={"table-auto text-left text-base"}>*/}
            {/*  <thead className={"bg-gray-50 text-sm uppercase"}>*/}
            {/*    <tr>*/}
            {/*      <th scope={"col"} className={"px-6 py-3"}>*/}
            {/*        Hạng*/}
            {/*      </th>*/}
            {/*      <th scope={"col"} className={"px-6 py-3"}>*/}
            {/*        Tên đội*/}
            {/*      </th>*/}
            {/*      <th scope={"col"} className={"px-6 py-3"}>*/}
            {/*        Điểm*/}
            {/*      </th>*/}
            {/*    </tr>*/}
            {/*  </thead>*/}
            {/*  <tbody>*/}
            {/*    <tr>*/}
            {/*      <th>1</th>*/}
            {/*      <th>Đội này mạnh</th>*/}
            {/*      <th>1250</th>*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*      <th>2</th>*/}
            {/*      <th>4 chàng tai</th>*/}
            {/*      <th>1023</th>*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*      <th>3</th>*/}
            {/*      <th>UIT</th>*/}
            {/*      <th>980</th>*/}
            {/*    </tr>*/}
            {/*  </tbody>*/}
            {/*</table>*/}

            <div className="relative overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">$2999</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      Microsoft Surface Pro
                    </th>
                    <td className="px-6 py-4">White</td>
                    <td className="px-6 py-4">Laptop PC</td>
                    <td className="px-6 py-4">$1999</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      Magic Mouse 2
                    </th>
                    <td className="px-6 py-4">Black</td>
                    <td className="px-6 py-4">Accessories</td>
                    <td className="px-6 py-4">$99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={"w-full rounded-md border-gray-300 bg-gray-200 p-3 shadow-md"}>
            <p className={"text-xl font-semibold text-blue-950"}>Bảng xếp hạng các cuộc thi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
