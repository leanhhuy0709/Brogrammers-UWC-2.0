import { createContext, useState } from "react";
import { getConversationsList, getLastConversationMessage, getLoggedInUser, getPersonById, formatDateToInput, getConversationById } from "../controller/controller";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

  const loggedInUser = getLoggedInUser();
  const [user, setUser] = useState(loggedInUser);

  const conversationsList = getConversationsList(user.id);
  
  return <GlobalContext.Provider value={{ formatDateToInput, user, setUser, conversationsList, getLastConversationMessage, getPersonById, getConversationById }}>
    {children}
  </GlobalContext.Provider>;
};

export default GlobalContext;
