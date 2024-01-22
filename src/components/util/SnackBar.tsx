const SnackBar = ({ message, type }: any) => {
  if (type === "success" || type === "login") {
    return (
      <div className="hx-w-[400px] hx-fixed hx-top-[120px] hx-flex hx-justify-center hx-right-0">
        <p className="hx-fixed hx-bg-green-500/95 hx-text-white hx-py-[8px] hx-px-[16px] hx-rounded-[4px] hx-drop-shadow-2xl hx-text-[12px]">
          {message}
        </p>
      </div>
    );
  } else if (type === "logout") {
    return (
      <div className="hx-w-[400px] hx-fixed hx-top-[120px] hx-flex hx-justify-center hx-right-0">
        <p className="hx-fixed hx-bg-[#E0E0E0]/95 !hx-text-black hx-py-[8px] hx-px-[16px] hx-rounded-[4px] hx-drop-shadow-2xl hx-text-[12px]">
          {message}
        </p>
      </div>
    );
  } else if (type === "clipboard") {
    return (
      <div className="hx-w-[400px] hx-fixed hx-top-[120px] hx-flex hx-justify-center hx-right-0">
        <p className="hx-fixed hx-bg-[#068fcc]/95 hx-text-white hx-py-[8px] hx-px-[16px] hx-rounded-[4px] hx-drop-shadow-2xl hx-text-[12px]">
          {message}
        </p>
      </div>
    );
  } else if (type === "error") {
    return (
      <div className="hx-w-[400px] hx-fixed hx-top-[120px] hx-flex hx-justify-center hx-right-0">
        <p className="hx-fixed hx-bg-red-500/95 hx-text-white hx-py-[8px] hx-px-[16px] hx-rounded-[4px] hx-drop-shadow-2xl hx-text-[12px]">
          {message}
        </p>
      </div>
    );
  } else {
    return (
      <div className="hx-w-[400px] hx-fixed hx-top-[120px] hx-flex hx-justify-center hx-right-0">
        <div className="hx-fixed hx-bg-yellow-500/95 hx-text-white hx-py-[8px] hx-px-[16px] hx-rounded-[4px] hx-drop-shadow-2xl">
          {message}
        </div>
      </div>
    );
  }
};

export default SnackBar;
