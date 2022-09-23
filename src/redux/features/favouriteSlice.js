import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFavourites } = favouriteSlice.actions;

export default favouriteSlice.reducer;
