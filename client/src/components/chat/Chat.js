import Navbar from "../navbar/Navbar";
import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";

const Chat = () => {
  const { user, getPersonById, conversationsList, getLastConversationMessage } =
    useContext(GlobalContext);

  return (
    <main>
      <Navbar />
      <div className="container">
        <div className="list-container">
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
              <Link to={`/conversation/${conversation.id}`}>
                <div className="conversation-container">
                  <img src={person.avatar} alt="Person's avatar" />
                  <h3>{`${person.firstName} ${person.lastName}`}</h3>
                  <div className="last-message-container">
                    <p className="content">{lastMessageContent}</p>
                    <p className="timestamp">
                      {getLastConversationMessage(conversation.id).timestamp}
                    </p>
                  </div>
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Chat;
