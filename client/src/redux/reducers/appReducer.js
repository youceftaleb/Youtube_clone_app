import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        dark_mode: true
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.dark_mode = !state.dark_mode
        },

    }
})

export const { toggleDarkMode } = appSlice.actions;

export default appSlice.reducer;