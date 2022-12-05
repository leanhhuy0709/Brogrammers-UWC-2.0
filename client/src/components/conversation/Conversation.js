import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import Navbar from "../navbar/Navbar";

const Conversation = () => {
  const { user, getPersonById, getConversationById } =
    useContext(GlobalContext);
  const navigate = useNavigate()
  const { id: conversationId } = useParams();
  console.log(conversationId);
  const conversation = getConversationById(conversationId);
  console.log("conversation", conversation);
  const messages = conversation.messages;
  const person = getPersonById(
    conversation.users.filter((userId) => userId !== user.id)[0]
  );

  const userIsSender = (message) => {
    console.log("isSender", message.senderId, user.id);
    if (message.senderId === user.id) return true;
    return false;
  };

  return (
    <main>
      <Navbar />
      <div className="conversation-container">
        <div className="message-info-container">
          <button className="back-button" onClick={() => navigate("/chat")}>Back</button>
          <img src={person.avatar} alt="Person avatar" />
          <h3>{`${person.firstName} ${person.lastName}`}</h3>
          <p className="position">{person.position ? "Collector" : "Janitor"}</p>
          <p className="status">{person.status ? "Online" : "Offline"}</p>
          <i className="fa-solid fa-circle-info"></i>
        </div>
        {messages.map((message, index) => {
          return (
            <div className="messages-container" key={index}>
              <img src={userIsSender(message) ? user.avatar : person.avatar} alt="Person avatar" />
              <p
                className={
                  userIsSender(message) ? "sender-message" : "receiver-message"
                }
              >
                {message.content}
              </p>
              <p className="message-timestamp">{message.timestamp}</p>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          );
        })}
        <div className="chat-input-container">
          <input type="text" className="chat-input" />
          <button className="send-message-button">Send</button>
        </div>
      </div>
    </main>
  );
};

export default Conversation;
