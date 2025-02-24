// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  fullName: string | null;
}

const initialState: AuthState = {
  fullName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
  },
});

export const { setFullName } = authSlice.actions;
export default authSlice.reducer;
