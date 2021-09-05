// here intial state will be stored
// export const appState = JSON.parse(localStorage.getItem("userData"))
//   ? JSON.parse(localStorage.getItem("userData")).state
//   : [];

export const appState = {
  auth: {
    token: localStorage.getItem("Trello"),
    isAuthenticated: false,
    user: null,
  },

  Lists: [],
  loading: true,

  error: null,
};

// this is reducer code
export const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("Trello", action.value.token);
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          token: action.value.token,
          user: action.value.user,
        },
        loading: false,
      };

    case "LOAD_USER":
      console.log("load");
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          user: action.value,
        },
        loading: false,
      };

    case "LOGOUT":
    case "AUTH_ERROR":
      localStorage.removeItem("Trello");
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          token: null,
        },
        loading: false,
      };

    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      localStorage.removeItem("Trello");
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          token: null,
        },
        loading: false,
        error: action.value,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    // these all for updation of Lists
    case "ADD_CARD":
    case "REMOVE_CARD":
    case "ADD_LIST_TITLE":
      return {
        ...state,
        Lists: state.Lists.map((list) => {
          return list._id === action.value._id ? action.value : list;
        }),
      };

    case "ADD_LIST":
      return {
        ...state,
        Lists: [...state.Lists, action.value],
      };

    case "GET_LISTS":
      return {
        ...state,
        Lists: action.value,
      };

    case "REMOVE_LIST":
      return {
        ...state,
        Lists: state.Lists.filter((list) => {
          return list._id !== action.value._id;
        }),
      };
    case "MOVE_TASK":
      return {
        ...state,
        Lists: action.value,
      };

    case "CARD_INPUT":
      return {
        ...state,
        Lists: state.Lists.map((list) => {
          return list._id === action.value._id ? action.value : list;
        }),
      };

    default:
      return state;
  }
};
