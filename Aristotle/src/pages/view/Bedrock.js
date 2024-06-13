import React, { useRef, useState, useEffect, Component } from "react";
import { ChatHeader, ChatContainer, ChatInput } from "../../component/ChatRoom";
import AdminLayout from "../../component/AdminLayout";
import ApiService from "../../service/Api.service";
import Chat from "../../component/Chatbot/Chat";
import axios from "axios";

export default function page() {
  // TODO: Implement Redux and improve theme
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const inputref = useRef(null);

  const handleInputSubmit = async (e) => {
    setShow(true);
    e.preventDefault();
    console.log(inputref.current.value);
    if (inputref.current.value === "") return;
    var data = inputref.current.value;
    setData((cr) => [
      ...cr,
      {
        from: "user",
        message: data,
      },
    ]);

    inputref.current.value = "";
    let gaiRes = await axios.get(`http://localhost:8000/bedrock/${data}`);
    let response = gaiRes;
    console.log("data from bed", response["data"]);
    setData((cr) => [
      ...cr,
      {
        from: "llm",
        message: response.data.completion,
      },
    ]);
  };

  const bottomref = useRef(null);
  useEffect(() => {
    bottomref.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  //TODO add a fab to scroll up to the top
  return (
    <div className="tw-w-full tw-h-[100vh] tw-relative tw-flex tw-flex-col">
      <div className="tw-flex tw-flex-col tw-min-h-[100vh] tw-overflow-y-auto tw-pb-32 tw-scrollbar-thin tw-scrollbar-thumb-gray-600 tw-scrollbar-track-theme-black tw-scrollbar-thumb-rounded-md">
        {show ? <ChatHeader initial_model="Bedrock" /> : <></>}
        <ChatContainer chatdata={data} image="/assets/icons/bedrock.svg" />

        <div ref={bottomref} />
      </div>
      <ChatInput
        input={inputref}
        handleSubmit={handleInputSubmit}
        style={{ color: "white" }}
      />
      <div>
        <Chat />
      </div>
    </div>
  );
}
