import React, { useRef, useState, useEffect, Component } from "react";
import { ChatHeader, ChatContainer, ChatInput } from "../../component/ChatRoom";
import AdminLayout from "../../component/AdminLayout";
import ApiService from "../../service/Api.service";
import Chat from "../../component/Chatbot/Chat";
export default function ChatRoom() {
  // TODO: Implement Redux and improve theme
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const inputref = useRef(null);

  // const handleInputSubmit = async (e) => {
  //   setShow(true);
  //   e.preventDefault();
  //   console.log(inputref.current.value);
  //   if (inputref.current.value === "") return;
  //   var data = inputref.current.value;
  //   setData((cr) => [
  //     ...cr,
  //     {
  //       from: "user",
  //       message: data,
  //     },
  //   ]);

  //   inputref.current.value = "";
  //   let gaiRes = await ApiService.httpGet("/gai/chat?q=" + data);

  //   setData((cr) => [
  //     ...cr,
  //     {
  //       from: "llm",
  //       message: gaiRes,
  //     },
  //   ]);
  // };

  const handleInputSubmit = async (e) => {
    setShow(true);
    e.preventDefault();
    const userInput = inputref.current.value.trim();
    if (!userInput) return;

    setData((cr) => [
      ...cr,
      {
        from: "user",
        message: userInput,
      },
      
    ]);
    inputref.current.value = "";
    try {
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userInput }),
      });
      const responseData = await response.json();
      const answer = responseData.answer;
      setData((cr) => [
        ...cr,
   
        {
          from: "llm",
          message: answer,
        },
      ]);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
  };
  const bottomref = useRef(null);
  useEffect(() => {
    bottomref.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  //TODO add a fab to scroll up to the top
  return (
    <div>
      <div>
        <div className="tw-w-full tw-h-[100vh] tw-relative tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-col tw-min-h-[100vh] tw-overflow-y-auto tw-pb-32 tw-scrollbar-thin tw-scrollbar-thumb-gray-600 tw-scrollbar-track-theme-black tw-scrollbar-thumb-rounded-md">
            <div className="tw-text-quattrocento-sans">
              {show ? <ChatHeader initial_model="MIXTURE OF EXPERTS" /> : <></>}
            </div>
            <ChatContainer
              chatdata={data}
              // image="https://static.wixstatic.com/media/4f187b_1613ecfd7d8d41dab1b2f23fb80b5e07%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/4f187b_1613ecfd7d8d41dab1b2f23fb80b5e07%7Emv2.png"
              image="/assets/icons/moe.png"
            />

            <div ref={bottomref} />
          </div>
          <ChatInput
            input={inputref}
            handleSubmit={handleInputSubmit}
            style={{ color: "white" }}
          />
        </div>
      </div>
      {/* <div>
        <Chat />
      </div> */}
    </div>
  );
}
