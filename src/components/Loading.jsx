import React from "react";
import ReactLoading from "react-loading";

function Loading({ type, color }) {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <ReactLoading type="balls" color="#FF6F00" height={"3%"} width={"4%"} />
    </div>
  );
}

export default Loading;
