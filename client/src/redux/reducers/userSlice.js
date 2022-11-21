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
            state = initialState;
        }
    }
})

export const { loginStart, loginSuccess, loginError, logout } = userSlice.actions;

export default userSlice.reducer;