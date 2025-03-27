import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser, checkAuthStatus, handlePasswordChange } from './authAPI';

const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,  // Optionally keep the token in local storage
  isPasswordTemporary: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ========== log in user ================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('action payload login', action.payload)
        state.loading = false;
        if (action.payload?.data?.isTemporary) {
          state.isPasswordTemporary = true
        } else {
          state.user = action.payload.user;
          state.token = action.payload.accessToken;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== password change====================== //
      .addCase(handlePasswordChange.pending, (state) => {
        state.loading = true;
      })
      .addCase(handlePasswordChange.fulfilled, (state, action) => {
        console.log('action payload login', action.payload)
        state.loading = false;
        const { user, accessToken } = action.payload;
        if (user && accessToken) {
          state.user = user;
          state.token = accessToken;
        }

      })
      .addCase(handlePasswordChange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== register user ================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== refresh token-- user ================
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        console.log('action payload refresh', action.payload)
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========== log out user ================
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log('action payload logout', action.payload)
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
