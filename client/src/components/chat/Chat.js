import Navbar from "../navbar/Navbar";
import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import './chat.css'

const Chat = () => {
  const { user, getPersonById, conversationsList, getLastConversationMessage } =
    useContext(GlobalContext);

  return (
    <main>
      <Navbar />
      <div className="center">
        {conversationsList.map((conversation) => {
          const person = getPersonById(
            conversation.users.filter((userId) => userId !== user.id)[0]
          );
          const lastMessageContent =
            getLastConversationMessage(conversation.id).senderId === user.id
              ? `You: ${getLastConversationMessage(conversation.id).content}`
              : `${person.firstName}: ${
                  getLastConversationMessage(conversation.id).content
                }`;
          return (
            <Link to={`/conversation/${conversation.id}`} className = 'left'>
              <div className="conversation-container">
                <div className = "conversation-container-image">
                  <img className = "rounded-image-medium" src={person.avatar} alt="Person's avatar" />
                </div>
                <div className = "conversation-container-text text-black">
                <h3>{`${person.firstName} ${person.lastName}`}</h3>
                  <p className="text-black">{lastMessageContent}</p>
                  <p className="text-black">
                    {getLastConversationMessage(conversation.id).timestamp}
                  </p>
                </div>
                <div className="three-point-container"><i className="fa-solid fa-ellipsis-vertical three-point"></i></div>
        
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Chat;
