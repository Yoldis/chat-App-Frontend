import { createSlice } from '@reduxjs/toolkit'
export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    iconLeftSideHover:false,
    iconLeftValue:0,
  },

  reducers: {
    onSetIconSideBarLeft:(state, {payload}) => {
        state.iconLeftValue = payload.value;
    },

    onSetHoverSideBarLeft:(state, payload) => {
        state.iconLeftSideHover = payload.value;
    },

    
  },
});
export const {onSetIconSideBarLeft, onSetHoverSideBarLeft } = uiSlice.actions;