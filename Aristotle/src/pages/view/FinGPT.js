// ChatRoom.js
import React, { useRef, useState, useEffect } from "react";
import { ChatHeader, ChatContainer, ChatInput } from "../../component/ChatRoom";
import AdminLayout from "../../component/AdminLayout";
import axios from "axios";

export default function ChatRoom() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const inputref = useRef(null);

  const handleInputSubmit = async (e) => {
    setShow(true);
    e.preventDefault();
    if (inputref.current.value === "") return;
    const userMessage = inputref.current.value;
    setData((cr) => [...cr, { from: "user", message: userMessage }]);
    inputref.current.value = "";

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/answer", {
        question: userMessage,
      });
      setData((cr) => [...cr, { from: "llm", message: response.data.answer }]);
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  };

  const bottomref = useRef(null);

  useEffect(() => {
    bottomref.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div>
      <div>
        <div className="tw-w-full tw-h-[100vh] tw-relative tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-col tw-min-h-[100vh] tw-overflow-y-auto tw-pb-32 tw-scrollbar-thin tw-scrollbar-thumb-gray-600 tw-scrollbar-track-theme-black tw-scrollbar-thumb-rounded-md">
            <div className="tw-text-quattrocento-sans">
              {show ? <ChatHeader initial_model="FINGPT " /> : <></>}
            </div>
            <ChatContainer chatdata={data} image="/assets/icons/fin.png" />
            <div ref={bottomref} />
          </div>
          <ChatInput
            input={inputref}
            handleSubmit={handleInputSubmit}
            style={{ color: "white" }}
          />
        </div>
      </div>
    </div>
  );
}
