import React from "react";
import "../../style.css";
import { useContext } from "react";
import { themeContext } from "../AdminLayout/AdminLayout";

export default function ChatHeader({ initial_model }) {
  const { theme } = useContext(themeContext);
  return (
    <div className="tw-w-full tw-py-4 tw-flex tw-justify-center tw-items-center tw-bg-gradient-to-b tw-from-transparent tw-from-80% ">
      <h1 className="tw-text-2xl tw-font-bold" id={theme}>
        {initial_model}
      </h1>
    </div>
  );
}
