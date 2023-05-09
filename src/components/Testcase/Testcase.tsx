import { BsTrash } from "react-icons/all";

type IProps = {
  id: string;
  key: string;
  title: string;
  handleDelete: (id: string) => void;
};

function Testcase(props: IProps) {
  return (
    <li
      id={props.id}
      className={"flex w-full flex-col items-start rounded-lg border border-transparent bg-gray-200 p-3"}
    >
      <div className={"flex w-full flex-row items-center justify-between"}>
        <p className={"mb-3 text-lg font-medium"}>{props.title}</p>
        <button
          type={"button"}
          className={
            "flex h-10 w-10 items-center justify-center rounded-md border border-transparent bg-gray-200 hover:bg-gray-300"
          }
          onClick={() => props.handleDelete(props.id)}
        >
          <BsTrash className={"h-5 w-5"} />
        </button>
      </div>
      <div className={"mb-3 flex w-full flex-col items-start gap-y-2"}>
        <label className={"text-sm font-medium"} htmlFor="input-1">
          Input
        </label>
        <textarea
          id={"input-1"}
          rows={5}
          className={
            "block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
        />
      </div>
      <div className={" flex w-full flex-col items-start gap-y-2"}>
        <label className={"text-sm font-medium"} htmlFor={"output-1"}>
          Output
        </label>
        <textarea
          id={"output-1"}
          rows={5}
          className={
            "block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
        />
      </div>
    </li>
  );
}

export default Testcase;
