import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    history: [],
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        saveHistory: (state, action) => {
            state.history = action.payload
        }
    },
});

export default historySlice.reducer;

export const { saveHistory } = historySlice.actions;
