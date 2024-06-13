import React from "react";

function RegulatoryBOTChat() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "10px",
        zIndex: 1,
      }}
    >
      <df-messenger
        project-id="moonlit-academy-420405"
        agent-id="a089aaa6-e669-4db8-b518-477c3f6cab17"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="" />
      </df-messenger>
    </div>
  );
}

export default RegulatoryBOTChat;
