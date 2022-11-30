import { createContext, useState, useEffect } from "react";
import { getLoggedInUser } from "../controller/controller";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

  const user = getLoggedInUser();      // dummy user object (if logged in), change it to false to see protectedRoutes being protected
  
  return <GlobalContext.Provider value={{user}}>
    {children}
  </GlobalContext.Provider>;
};

export default GlobalContext;
