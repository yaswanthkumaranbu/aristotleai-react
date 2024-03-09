import React from "react";
import { useNavigate } from "react-router-dom";
import { ChatHeader, ChatContainer, ChatInput } from "../../component/ChatRoom";
import Chat from "../../component/Chatbot/Chat";
import CharacterList from "../../component/CharacterAI/CharacterLIst";
import narendramodi from "../../component/CharacterAI/narendramodi.png";
import elonmusk from "../../component/CharacterAI/elonmusk.png";
import joebiden from "../../component/CharacterAI/joebiden.png";
import hoong from "../../component/CharacterAI/lee.png";
import "../view/comp.css";

export default function ChatRoom() {
  const navigate = useNavigate();
  const handleElon = () => {
    navigate("/characterai/chat", {
      state: { name: "Elon Musk", desc: "Hello This is Elon Musk!" },
    });
  };
  const handleBiden = () => {
    navigate("/characterai/chat", {
      state: { name: "JoeBiden", desc: "Hello I'm Joe Biden" },
    });
  };
  const handleModi = () => {
    navigate("/characterai/chat", {
      state: { name: "NarendraModi", desc: "Hello I'm Narendra Modi" },
    });
  };
  const handleHoong = () => {
    navigate("/characterai/chat", {
      state: { name: "Lee Hsien Loong", desc: "Hello I'm Lee Hsien Loong" },
    });
  };

  return (
    <div>
      <div>
        <div className="tw-w-full tw-h-[100vh] tw-relative tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-col tw-min-h-[100vh] tw-overflow-y-auto tw-pb-32 tw-scrollbar-thin tw-scrollbar-thumb-gray-600 tw-scrollbar-track-theme-black tw-scrollbar-thumb-rounded-md">
            <ChatHeader initial_model="CHARACTER AI" />
            <div className="characterList">
              <CharacterList
                Name={"Elon Musk"}
                Desc={"Tesla"}
                img={elonmusk}
                onClick={handleElon}
              />
              <CharacterList
                Name={"Joe Biden"}
                Desc={"President"}
                img={joebiden}
                onClick={handleBiden}
              />
              <CharacterList
                Name={"Narendra Modi"}
                Desc={"Prime Minister"}
                img={narendramodi}
                onClick={handleModi}
              />
              <CharacterList
                Name={"Lee Hsien Loong"}
                Desc={"Prime Minister"}
                img={hoong}
                onClick={handleHoong}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
