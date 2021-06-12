import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomID: null,
    messageID: null,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomID = action.payload.roomID;
    },
    message: (state, action) => {
      state.roomID = action.payload.messageID;
    },
  },
});

export const { message, enterRoom } = appSlice.actions;

export const selectRoodId = (state) => state.app.roomID;
export const selectMessageId = (state) => state.app.messageID;

export default appSlice.reducer;
