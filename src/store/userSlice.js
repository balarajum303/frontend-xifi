import { createSlice } from '@reduxjs/toolkit';

import { userLogin } from 'src/api/userApi';

const initialState = {
  loading: false,
  error: '',
  userData: {},
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserData: (state, action) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(userLogin.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      userData: action.payload,
    }));
    builder.addCase(userLogin.rejected, (state, action) => ({
      ...state,
      loading: false,
      userData: {},
      error: action.error.message || 'something went wrong',
    }));
  },
});

export const { setUserData } = userSlice.actions;
