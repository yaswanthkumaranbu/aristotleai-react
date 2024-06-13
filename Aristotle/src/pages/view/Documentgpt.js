import React, { useState } from "react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const DocumentAI = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        left: "17vw",
        width: "83%",
        height: "100%",
        overflowY: "auto",
      }}
      className="cont"
    >
      <style>{`.cont::-webkit-scrollbar{
        display:none;
      }`}</style>
      <BarLoader
        css={override}
        loading={isLoading}
        color={"Green"} // You can change the color to your preference
        style={{ width: "100%" }}
      />

      <iframe
        title="Streamlit Chatbot"
        src="http://localhost:8501/"
        width="100%"
        height="900px"
        allow="fullscreen"
        style={{ border: "none", display: isLoading ? "none" : "block" }}
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default DocumentAI;