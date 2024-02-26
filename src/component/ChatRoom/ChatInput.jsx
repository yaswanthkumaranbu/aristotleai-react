import React from "react";

import { IoMdSend } from "react-icons/io";

import "../../style.css";
import { useContext } from "react";
import { themeContext } from "../AdminLayout/AdminLayout";

export default function ChatInput({ input, handleSubmit }) {
  function onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  }
  const { theme } = useContext(themeContext);

  return (
    <div
      id={theme}
      className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-gradient-to-b tw-from-transparent tw-from-40%  tw-flex tw-justify-center tw-items-center  "
    >
      <form
        className=" tw-flex tw-justify-evenly tw-items-center tw-h-[60px]  tw-my-4  tw-p-2 tw-gap-2 tw-rounded-lg tw-max-w-xl tw-w-[90%] bg-gray-800"
        onSubmit={handleSubmit}
      >
        <textarea
          rows={1}
          type="text"
          className="tw-flex-1 tw-items-center tw-overflow-hidden focus:tw-outline-none tw-resize-none bg-gray-800 tw-border-none tw-pl-[10px] tw-rounded tw-transition tw-duration-300 tw-text-white"
          ref={input}
          placeholder="Ask Any Question..."
          onKeyDown={onEnterPress}
        ></textarea>
        <button type="submit" className="tw-pr-2">
          <IoMdSend size={25} className="tw-text-white  " />
        </button>
      </form>
    </div>
  );
}
