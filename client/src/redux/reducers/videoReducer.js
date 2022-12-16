import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        currentVideo: null,
        loading: false,
        error: false,
        comments: []
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
        },
        fetchComments: (state, { payload }) => {
            state.comments = payload;
        },
        deleteComments: (state) => {
            state.comments = [];
        },
        deleteOneComment: (state, { payload }) => {
            const index = state.comments.findIndex(comment => comment._id === payload);
            if (index !== -1) {
                state.comments.splice(index, 1);
            }
        },
        editComment: (state, { payload }) => {
            const index = state.comments.findIndex(comment => comment._id === payload[0]);
            if (index !== -1) {
                state.comments[index].text = payload[1];
            }
        },
        Like: (state, { payload }) => {
            if (!state.currentVideo.likes.includes(payload)) {
                state.currentVideo.likes.push(payload);
                const index = state.currentVideo.dislikes.findIndex(userId => userId === payload);
                if (index !== -1) {
                    state.currentVideo.dislikes.splice(index, 1);
                }
            } else {
                state.currentVideo.likes.splice(state.currentVideo.likes.findIndex(userId => userId === payload), 1);
            }
        },
        Dislike: (state, { payload }) => {
            if (!state.currentVideo.dislikes.includes(payload)) {
                state.currentVideo.dislikes.push(payload);
                const index = state.currentVideo.likes.findIndex(userId => userId === payload);
                if (index !== -1) {
                    state.currentVideo.likes.splice(index, 1);
                }
            } else {
                state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex(userId => userId === payload), 1);
            }
        },
        addComment: (state, { payload }) => {
            state.comments.push(payload);
        }
    }
})

export const { fetchStart, fetchSuccess, fetchError, Like, Dislike, fetchComments, addComment, deleteComments, deleteOneComment, editComment } = videoSlice.actions;

export default videoSlice.reducer;