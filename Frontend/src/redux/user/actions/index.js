

export const setUser = userData => {
  console.log("userData", userData);
  return {
    type: "SET_USER",
    payload: userData
  };
};

export const setFbUser = fbUserData => {
  console.log("fbUserData", fbUserData);
  return {
    type: "SET_FB_USER",
    payload: fbUserData
  };
}

export const clearUser = () => {
  return {
    type: "CLEAR_USER"
  };
}
