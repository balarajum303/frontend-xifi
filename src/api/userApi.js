import { createAsyncThunk } from "@reduxjs/toolkit";

import { API } from "src/service/axiosInterceptor";

export const userLogin = createAsyncThunk("user-login", async (body) => {
  try {
    const response = await API.post(`/auth/login`, body);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw err.response.data;
    } else {
      throw err.message;
    }
  }
});