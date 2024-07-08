import React, { useRef, useState, useEffect, Component } from "react";
import { ChatHeader, ChatContainer, ChatInput } from "../../component/ChatRoom";


import UserDropdown from "../../component/RBAC_CLONE/UserDropdown";
import QueryInput from "../../component/RBAC_CLONE/QueryInput";

export default function ChatRoom() {
  const [user, setUser] = useState(null); // Initially no user is selected
  const [query, setQuery] = useState("");
  const [fileName, setFileName] = useState('');

  // TODO: Implement Redux and improve theme
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const inputref = useRef(null);

  const [statusMessage, setStatusMessage] = useState('');


  const handleFileUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5000/load_data', { // Modify endpoint to localhost:5000
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const result = await response.json();
        setFileName(file.name);
        setStatusMessage(result.message);
      } catch (error) {
        setStatusMessage(`Error uploading file: ${error.message}`);
      }
    };

    fileInput.click(); // Trigger file input dialog
  };


  const handleInputSubmit = async (e) => {
    setShow(true);
    e.preventDefault();
    // console.log(inputref.current.value);
    // if (inputref.current.value === "") return;
    var data = query;
    setData((cr) => [
      ...cr,
      {
        from: "user",
        message: data,
      },
    ]);

    setQuery("");
    let gaiRes = await fetch('http://localhost:5000/query', { // Modify endpoint to localhost:5000
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, query }), // Include user in the request body
    });
    const jsonData = await gaiRes.json();

    setData((cr) => [
      ...cr,
      {
        from: "llm",
        message: jsonData.answer,
      },
    ]);
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
              {show ? <ChatHeader initial_model="AI GOVERNANCE" /> : <></>}
            </div>
            <UserDropdown user={user} setUser={setUser} />
            <ChatContainer
              chatdata={data}
              // image="https://static.wixstatic.com/media/4f187b_1613ecfd7d8d41dab1b2f23fb80b5e07%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/4f187b_1613ecfd7d8d41dab1b2f23fb80b5e07%7Emv2.png"
              image="/assets/icons/rbac.png"
            />

            <div ref={bottomref} />
          </div>
          <div className="query-container">

            <QueryInput inputref={inputref} query={query} setQuery={setQuery} handleSubmit={handleInputSubmit} handleFileUpload={handleFileUpload} fileName={fileName} />
          </div>
          {/* <ChatInput
            input={inputref}
            handleSubmit={handleInputSubmit}
            style={{ color: "white" }}
          /> */}
        </div>
      </div>
    </div>
  );
}
