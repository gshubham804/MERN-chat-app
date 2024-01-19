import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";

const initialState = {
  sideBar: {
    open: false,
    type: "CONTACT", // can be contact, starred, shared
  },
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
  },
});

// Reducer

export default slice.reducer;

export function ToggleSidebar() {
  return async () => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function updateSidebarType(type) {
  return async () => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}
