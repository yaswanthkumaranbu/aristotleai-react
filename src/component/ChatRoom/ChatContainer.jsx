import { Avatar, Fade } from "@mui/material";
import React, { useState, useEffect } from "react";
import useTheme from "../../context";

export default function ChatContainer({ chatdata, image, userImage }) {
  // TODO: interactive text typing
  if (chatdata.length === 0) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-flex-1">
        {/* <h1 className='tw-text-2xl tw-text-gray-500 tw-font-bold'>LLM Chat Bot</h1> */}
      </div>
    );
  }

  const [color, setColor] = useState("");
  const [colorReply, setColorReply] = useState("");

  const { theme } = useTheme();
  useEffect(() => {
    if (theme == "dark") {
      setColor("bg-gray-800");
      setColorReply("bg-gray-600");
    } else if (theme == "light") {
      setColor("bg-gray-800");
      setColorReply("bg-gray-600");
    } else if (theme == "violet") {
      setColor("tw-bg-purple-950");
      setColorReply(" tw-bg-purple-900");
    } else if (theme == "cyan") {
      setColor("tw-bg-cyan-950");
      setColorReply(" tw-bg-cyan-900");
    } else if (theme == "blue") {
      setColor("tw-bg-blue-950");
      setColorReply(" tw-bg-blue-900");
    } else if (theme == "lime") {
      setColor("tw-bg-lime-950");
      setColorReply(" tw-bg-lime-900");
    }
  }, [theme]);

  return (
    <div
      className="container1 tw-flex-col tw-mr-7 mx-auto "
      style={{ overflowY: "auto" }}
    >
      <style>
        {`
          .container1::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {chatdata.map((chat, i) => (
        <Fade in={true} timeout={800} key={i}>
          <div
            className={`tw-flex tw-w-fit tw-p-4 tw-items-center ${
              chat.from !== "llm" ? "tw-flex-row-reverse tw-float-right" : ""
            }`}
          >
            <div className="tw-mr-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Google_Messages_icon_%282022%29.svg/480px-Google_Messages_icon_%282022%29.svg.png"
                alt="Sender Avatar"
                className="avatar"
              />
            </div>
            <div
              className={`tw-flex tw-w-[160px] tw-h-[90px] tw-p-4 tw-mr-3 tw-rounded-xl ${
                chat.from !== "llm"
                  ? color + " tw-text-right  text-white "
                  : colorReply + " tw-text-left  text-white tw-mr-10"
              } tw-text-black font-Roboto`}
              style={{
                top: chat.from === "llm" ? "50px" : "50px",
                marginTop: chat.from === "llm" ? "70px" : "0",
                borderRadius: "20px", // Adding a fixed border-radius value
                border:
                  chat.from !== "llm" ? "2px solid black" : "2px solid black", // Conditional border
                height: chat.from === "llm" ? "auto" : "auto",
                width: chat.from === "llm" ? "auto" : "auto",
              }}
            >
              <p className="tw-mb-2 tw-text-quattrocento-sans">
                {chat.message}
              </p>
              <div
                className={`tw-absolute ${
                  chat.from === "llm" ? "tw-left-0" : "tw-right-0"
                } tw-top-0 tw-border-t-1 tw-border-r-4 tw-border-black tw-w-0 tw-h-0 tw-transform tw-translate-x-1/2 tw-translate-y-1/2`}
                style={{
                  transform: "translate(-50%, -50%)",
                  borderRadius: "20px",
                }}
              ></div>
            </div>
          </div>
        </Fade>
      ))}
    </div>
  );
}
