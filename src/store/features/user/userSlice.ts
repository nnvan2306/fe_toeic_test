import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponseType } from "../../../types/user";

interface UserState {
    user: UserResponseType | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserResponseType>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setUserSlice: (state, action: PayloadAction<UserResponseType>) => {
            state.user = action.payload;
        },
    },
});

export const { login, logout, setUserSlice } = userSlice.actions;
export default userSlice.reducer;
