import React from "react";

function CustomBtn({ title }) {
  return (
    <button className="bg-green-500 translate-y-[1px] transition duration-150 ease-in-out hover:bg-green-600 text-white px-3 py-3 font-semibold rounded">
      {title}
    </button>
  );
}

export default CustomBtn;
