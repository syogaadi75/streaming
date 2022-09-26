import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    apiUrl: 'https://streaming-api.vercel.app',
};

export const apiSlice = createSlice({
    name: 'history',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
    },
});

export default apiSlice.reducer;
