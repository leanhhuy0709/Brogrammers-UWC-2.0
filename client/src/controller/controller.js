import * as api from "../model/api/api";

export const getLoggedInUser = () => {
  const loggedInUserId = localStorage.getItem("userId");
  const user = api.BackOfficerAPI.get_by_id(loggedInUserId);
  return user;
};

export const validateLogin = (username, password) => {
  const users = api.BackOfficerAPI.filter({
    username: username,
    password: password,
  });
  if (users.length) {
    return users[0];
  }
  return null;
};
