import { MdOutlineCancel } from "react-icons/md";

const PainelLateral = ({ titulo, handleClickFechar, children, }) => {
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen overflow-auto dark:text-gray-200 bg-white dark:bg-[#484B52] w-[75rem]" tabIndex="1">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">
            {titulo}
          </p>
          <button
            type="button"
            onClick={() => handleClickFechar(null)}
            style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PainelLateral;
