// ChatContainer.js
import React, { useState, useRef,useEffect } from 'react';
import './chatcss.css';
import { ChatContainer, ChatInput } from '../../component/ChatRoom';
import ApiService from '../../service/Api.service';
import AndroidIcon from '@material-ui/icons/Android';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import { Avatar, Fade } from "@mui/material";
const ChatsContainer = () => {
  const [data, setData] = useState([]);
  const inputRef = useRef(null);
  const chatBodyRef = useRef(null);

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (inputRef.current.value === '') return;

    const userMessage = inputRef.current.value;

    // Update state with user's message
    setData((cr) => [
      ...cr,
      {
        from: 'user',
        message: userMessage,
      },
    ]);

    // Clear the input field
    inputRef.current.value = '';

    // Fetch response from the chatbot API
    let gaiRes = await ApiService.httpGet('/gai/chat?q=' + userMessage);

    // Update state with chatbot's response
    setData((cr) => [
      ...cr,
      {
        from: 'llm',
        message: gaiRes,
      },
    ]);
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit(e);
    }
  };
  useEffect(() => {
    // Scroll down when new messages are added
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [data]);

  return (
    <div className="ChatContainer" style={{ backgroundColor: '#ffffff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <div className="chat-header">
        <div style={{ display: 'flex', marginLeft: '20px', position: 'relative' }}>
          <div className="icon-circle">
            <FontAwesomeIcon icon={faRobot} size="1x" />
          </div>
          <div className="active-indicator"></div>
        </div>

        <h4>Aristotle Genie</h4>
      </div>
      <div className="chat-body" ref={chatBodyRef} style={{ overflowY: 'auto', maxHeight: '300px' }}>
        <ChatContainer chatdata={data} />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          ref={inputRef}
          placeholder="Ask a Question"
          style={{ color: 'black' }}
          onKeyDown={onEnterPress}
        />
        <Button onClick={handleInputSubmit}>
          <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '20px', color: '#1f2937' }} />
        </Button>
      </div>
    </div>
  );
};

export default ChatsContainer;