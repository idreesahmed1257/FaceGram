export const SaveDataToLocalStorage = (token, user) => {
  if (token) {
    localStorage.setItem("authToken", token);
  }
  if (user) {
    localStorage.setItem("myUser", JSON.stringify(user));
  }
};
