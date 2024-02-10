import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  user: {},
  sideBar: {
    open: false,
    type: "CONTACT", // can be contact, starred, shared
    snackBar: {
      open: null,
      message: null,
      severity: null,
    },
  },
  users: [],
  friends: [],
  friendRequests: [],
  chat_type: null,
  room_id: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // toggle sidebar
    toggleSidebar(state, action) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSidebarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    openSnackBar(state, action) {
      state.sideBar.snackBar.open = true;
      state.sideBar.snackBar.severity = action.payload.severity;
      state.sideBar.snackBar.message = action.payload.message;
    },
    closeSnackBar(state, action) {
      state.sideBar.snackBar.open = false;
      state.sideBar.snackBar.severity = null;
      state.sideBar.snackBar.message = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.request;
    },
    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    },
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
  },
});

// Thunk actions (middleware)

export default slice.reducer;

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function updateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

export function showSnackBar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        severity,
        message,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };
}

export const HideSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};

export const FetchUsers = () => {
  return async (dispatch, getState) => {
    await axiosInstance
      .get("/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchFriends = () => {
  return async (dispatch, getState) => {
    await axiosInstance
      .get("/user/get-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateFriends({ friends: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchRequests = () => {
  return async (dispatch, getState) => {
    await axiosInstance
      .get("/user/get-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateFriendRequests({ request: response.data.data })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const SelectConversation = ({ room_id }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ room_id }));
  };
};

export const FetchUserProfile = () => {
  return async (dispatch, getState) => {
    axiosInstance
      .get("/user/get-me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.fetchUser({ user: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// export const UpdateUserProfile = (formValues) => {
//   return async (dispatch, getState) => {
//     const file = formValues.avatar;

//     const key = v4();

//     try{
//       S3.getSignedUrl(
//         "putObject",
//         { Bucket: S3_BUCKET_NAME, Key: key, ContentType: `image/${file.type}` },
//         async (_err, presignedURL) => {
//           await fetch(presignedURL, {
//             method: "PUT",
  
//             body: file,
  
//             headers: {
//               "Content-Type": file.type,
//             },
//           });
//         }
//       );
//     }
//     catch(error) {
//       console.log(error);
//     }
//     axiosInstance
//       .patch(
//         "/user/update-me",
//         { ...formValues, avatar: key },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getState().auth.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response);
//         dispatch(slice.actions.updateUser({ user: response.data.data }));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };
