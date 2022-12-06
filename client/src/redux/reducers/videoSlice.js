import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        currentVideo: null,
        loading: false,
        error: false
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        fetchSuccess: (state, { payload }) => {
            state.currentVideo = payload;
            state.loading = false;
            state.error = false;
        },
        fetchError: (state) => {
            state.loading = false;
            state.error = true;
        }
    }
})

export const { fetchStart, fetchSuccess, fetchError } = videoSlice.actions;

export default videoSlice.reducer;