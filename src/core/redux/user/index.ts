import { RootState } from "../index";
import { createSelector, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from "@utils/interface";

const initialState: User = {
    _id: '',
    name: '',
    email: '',
    image: '',
    createdAt: new Date().getTime(),
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action: PayloadAction<User>) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.image = action.payload.image;
            state.createdAt = action.payload.createdAt;
        },
    },
});

export default UserSlice.reducer;
export const { userLogin } = UserSlice.actions;

// action

export const currUser = (state: RootState) => state.user;