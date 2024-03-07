// ChatContainer.js
import React, { useState, useRef, useEffect } from "react";
import "./chatcss.css";
import { ChatContainer, ChatInput } from "../../component/ChatRoom";
import ApiService from "../../service/Api.service";
import AndroidIcon from "@material-ui/icons/Android";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { Avatar, Fade } from "@mui/material";
const ChatsContainer = () => {
  const [data, setData] = useState([]);
  const inputRef = useRef(null);
  const chatBodyRef = useRef(null);

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") return;

    const userMessage = inputRef.current.value;

    // Update state with user's message
    setData((cr) => [
      ...cr,
      {
        from: "user",
        message: userMessage,
      },
    ]);

    // Clear the input field
    inputRef.current.value = "";

    // Fetch response from the chatbot API
    let gaiRes = await ApiService.httpGet("/gai/chat?q=" + userMessage);

    // Update state with chatbot's response
    setData((cr) => [
      ...cr,
      {
        from: "llm",
        message: gaiRes,
      },
    ]);
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      handleInputSubmit(e);
    }
  };
  useEffect(() => {
    // Scroll down when new messages are added
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [data]);

  return (
    <div
      id="chat-container"
      class="container bg-white pt-3 text-white mt-5 rounded shadow "
      style={{ width: "500px" }}
    >
      <div class="row px-4">
        <div class="col-8 p-0">
          <h2 class="text-primary">
            <i class="fas fa-comment-dots"></i>
            Aristotle Genie
          </h2>
        </div>
        <div class="col text-right pr-0">
          <i class="close-button far fa-times-circle"></i>
        </div>
        <hr class="col-12 mb-0"></hr>
      </div>
      {/* <div style={{ display: 'flex', marginLeft: '10px', position: '' }}>
        
          <div className="icon-circle">
          
            <FontAwesomeIcon icon={faRobot} size="1x" />
            
            <div className="active-indicator">
          </div>  
             
      
      <span class="text">Ask us Anything-we'll get back here</span>
      </div>
       </div> */}

      <div
        className="chat-body"
        ref={chatBodyRef}
        style={{
          overflowY: "auto",
          maxHeight: "350px",
          width: "500px",
          position: "fixed",
        }}
      >
        <ChatContainer chatdata={data} />
      </div>
      <div className="input-container  " style={{ marginTop: "400px" }}>
        <input
          type="text"
          className="text-input"
          ref={inputRef}
          placeholder="Ask a Question"
          style={{ color: "#53aef2" }}
          onKeyDown={onEnterPress}
        />

        <Button onClick={handleInputSubmit}>
          <FontAwesomeIcon
            icon={faPaperPlane}
            style={{ fontSize: "20px", color: "#53aef2" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default ChatsContainer;
