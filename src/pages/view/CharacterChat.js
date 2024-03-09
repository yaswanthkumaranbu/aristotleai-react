import React, {
  useRef,
  useState,
  useEffect,
  Component,
  createContext,
} from "react";
import { ChatHeader, ChatContainer, ChatInput } from "../../component/ChatRoom";
import ApiService from "../../service/Api.service";
import AIChatContainer from "../../component/CharacterAI/AIChatContainer";
import COMP from "../../component/AdminLayout/AdminLayout";
import { useLocation } from "react-router-dom";
import Chat from "../../component/Chatbot/Chat";
import axios from "axios";
import "../../style.css";

export const themeContext = React.createContext({});

export default function CharacterChat() {
  const [theme, setTheme] = React.useState("light");

  // TODO: Implement Redux and improve theme
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const inputref = useRef(null);
  const location = useLocation();

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
    <themeContext.Provider value={{ theme }}>
      <div id={theme}>
        <COMP />
        <div
          className="  tw-w-full tw-h-[100vh] tw-relative  tw-flex tw-flex-col"
        >
          <div className="tw-flex tw-flex-col tw-min-h-[100vh] tw-overflow-y-auto tw-pb-32 tw-scrollbar-thin tw-scrollbar-thumb-gray-600 tw-scrollbar-track-theme-black tw-scrollbar-thumb-rounded-md">
            {show ? <ChatHeader initial_model={location.state.name} /> : <></>}
            <div style={{ marginLeft: "20rem", marginTop: "5rem" }}>
              <AIChatContainer
                message={location.state.desc}
                image="/assets/icons/bedrock.svg"
              />
            </div>
            <div
              style={{ width: "150vh", marginLeft: "20rem", marginTop: "10px" }}
            >
              <ChatContainer
                chatdata={data}
                image="/assets/icons/bedrock.svg"
              />
            </div>

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
      </div>
    </themeContext.Provider>
  );
}
