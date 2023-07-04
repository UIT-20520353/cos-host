import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Header, AddTestcase } from "~/components";
import AddContest from "~/pages/Contest/AddContest";
import AddProblem from "~/pages/problem/AddProblem";
import { toast } from "react-toastify";

function Contest() {
  useEffect(() => {
    document.title = "Tạo cuộc thi";
  }, []);

  const [isAddContest, setIsAddContest] = useState<boolean>(false);
  const [isAddProblem, setIsAddProblem] = useState<boolean>(false);
  const [isAddTestcase, setIsAddTestcase] = useState<boolean>(false);

  const handleOpenAddContestForm = () => {
    if (isAddContest) {
      toast("Không thể tạo hai cuộc thi cùng lúc", {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }
    if (isAddProblem) {
      toast("Không thể tạo cuộc thi cùng lúc với tạo đề thi", {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }
    if (isAddTestcase) {
      toast("Không thể tạo cuộc thi cùng lúc với tạo testcase", {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }

    setIsAddContest(true);
  };
  const handleCloseAddContestForm = () => {
    Swal.fire({
      title: "Đóng form tạo cuộc thi?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) setIsAddContest(false);
    });
  };

  const handleOpenAddProblemForm = () => {
    if (isAddProblem) {
      toast("Không thể tạo hai đề thi cùng lúc", {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }
    if (isAddContest) {
      toast("Không thể tạo đề thi cùng lúc với tạo cuộc thi", {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }
    if (isAddTestcase) {
      toast("Không thể tạo đề thi cùng lúc với tạo testcase", {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }
    setIsAddProblem(true);
  };
  const handleCloseAddProblemForm = () => {
    Swal.fire({
      title: "Đóng form tạo đề thi?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) setIsAddProblem(false);
    });
  };
  const handleOpenAddTestcaseForm = () => {
    if (isAddTestcase) {
      toast("Không thể tạo hai testcase cùng lúc", {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }
    if (isAddContest) {
      toast("Không thể tạo testcase cùng lúc với tạo cuộc thi", {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }
    if (isAddProblem) {
      toast("Không thể tạo testcase cùng lúc với tạo đề thi", {
        type: "warning",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }
    setIsAddTestcase(true);
  };
  const handleCloseAddTestcaseForm = () => {
    Swal.fire({
      title: "Đóng form tạo testcase?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) setIsAddTestcase(false);
    });
  };

  const onChangeValue = (value: string | null) => {
    if (!value) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Nhập tên cuộc thi"} isUsed={false} onChangeValue={onChangeValue} />
      <div className={"mx-10 my-8"}>
        <p className={"text-3xl font-semibold"}>Tạo cuộc thi</p>
        <div className={"mt-8 flex w-full flex-row items-center gap-x-3"}>
          <button
            className={
              "w-48 rounded-md bg-gray-200 py-3 text-base font-semibold shadow-md duration-200 hover:bg-gray-300"
            }
            onClick={handleOpenAddContestForm}
          >
            Thêm cuộc thi mới
          </button>
          <button
            className={
              "w-48 rounded-md bg-gray-200 py-3 text-base font-semibold shadow-md duration-200 hover:bg-gray-300"
            }
            onClick={handleOpenAddProblemForm}
          >
            Thêm đề thi mới
          </button>
          {/*<button*/}
          {/*  className={*/}
          {/*    "w-48 rounded-md bg-gray-200 py-3 text-base font-semibold shadow-md duration-200 hover:bg-gray-300"*/}
          {/*  }*/}
          {/*  onClick={handleOpenAddTestcaseForm}*/}
          {/*>*/}
          {/*  Thêm testcase mới*/}
          {/*</button>*/}
        </div>
        {isAddContest && <AddContest closeAddContestForm={handleCloseAddContestForm} />}
        {isAddProblem && <AddProblem closeAddForm={handleCloseAddProblemForm} />}
        {/*{isAddTestcase && <AddTestcase closeAddTestcaseForm={handleCloseAddTestcaseForm} />}*/}
      </div>
    </div>
  );
}

export default Contest;
