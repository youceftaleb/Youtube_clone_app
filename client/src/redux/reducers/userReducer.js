import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        loading: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        loginSuccess: (state, { payload }) => {
            state.currentUser = payload;
            state.loading = false;
            state.error = false;
        },
        loginError: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscribe: (state, { payload }) => {
            if (state.currentUser.subscriptions.includes(payload)) {
                state.currentUser.subscriptions.splice(state.currentUser.subscriptions.findIndex(channelId => channelId === payload), 1);
            } else {
                state.currentUser.subscriptions.push(payload);
            }
        }
    }
})

export const { loginStart, loginSuccess, loginError, logout, subscribe } = userSlice.actions;

export default userSlice.reducer;