import { Avatar, Fade } from "@mui/material";
import React from "react";

export default function ChatContainer({ chatdata, image, userImage }) {
 // TODO: interactive text typing
 if (chatdata.length === 0) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-flex-1">
        {/* <h1 className='tw-text-2xl tw-text-gray-500 tw-font-bold'>LLM Chat Bot</h1> */}
      </div>
    );
 }

 return (
    <div className="tw-flex-col tw-mr-7 mx-auto">
      {chatdata.map((chat, i) => (
        <Fade in={true} timeout={800} key={i}>
          <div
            className={`tw-flex tw-w-fit tw-p-4 tw-items-center ${
              chat.from !== "llm" ? "tw-flex-row-reverse tw-float-right" : ""
            }`}
          >
            <div className="tw-mr-4">
              <Avatar
                src={chat.from === "llm" ? image : userImage}
                className="top-3 tw-mt-1"
                style={{ backgroundColor: 'grey' }}
              />
            </div>
            <div
              className={`tw-flex tw-w-[160px] tw-h-[90px] tw-p-4 tw-mr-3 tw-rounded-xl ${
                chat.from !== "llm"
                 ? "tw-text-right tw-bg-[#1f2937] text-white-500 tw-ml-10"
                 : "tw-text-left tw-bg-[#646e7f] text-black-500 tw-mr-10"
              } tw-text-white font-Roboto`}
              style={{
                top: chat.from === "llm" ? "50px" : "50px",
                marginTop: chat.from === "llm" ? "70px" : "0",
                borderRadius: chat.from !== "llm" ? "20px 0 20px 20px" : "0 20px 20px 20px",
                height:chat.from === "llm"? "auto" :"auto",
                width:chat.from === "llm"? "auto" :"auto",

              }}
            >
              <p className="tw-mb-2 tw-text-quattrocento-sans">{chat.message}</p>
              <div
                className={`tw-absolute ${
                 chat.from === "llm" ? "tw-left-0" : "tw-right-0"
                } tw-top-0 tw-border-t-1 tw-border-r-4 tw-border-theme-dark-black tw-w-0 tw-h-0 tw-transform tw-translate-x-1/2 tw-translate-y-1/2`}
                style={{
                 transform: "translate(-50%, -50%)",
                 borderRadius: "0 20px 0 0",
                }}
              ></div>
            </div>
          </div>
        </Fade>
      ))}
    </div>
 );
}