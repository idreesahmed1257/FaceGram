const initialState = {
  myUser: JSON.parse(localStorage.getItem("myUser")) || {},
  fbUser: JSON.parse(localStorage.getItem("fbUser")) || {},
}

console.log("Intial State", initialState);

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        myUser: action.payload
      };
    case "SET_FB_USER":
      return {
        ...state,
        fbUser: action.payload
      };
    case "CLEAR_USER":
      return {
        ...state,
        myUser: {},
        fbUser: {}
      };
    default:
      return state;
  }
};
export default userReducer;
