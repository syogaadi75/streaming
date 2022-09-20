import {
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import { apiCallBegan } from "../store/api";

const initialState = {
    id: null,
    episode: [],
    loading: false,
};

export const episodeSlice = createSlice({
    name: 'episode',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        episodeRequested: (state, action) => {
            state.loading = true;
        },

        episodeReceived: (state, action) => {
            state.episode = action.payload;
            state.loading = false;
        },

        episodeRequestFailed: (state, action) => {
            state.loading = false;
        },

        saveEpisodeId: (state, action) => {
            state.id = action.payload
        }
    },
});

export default episodeSlice.reducer;

export const { saveEpisodeId, episodeRequested, episodeReceived, episodeRequestFailed } = episodeSlice.actions;

export const loadepisode = (id) => (dispatch) => {
    const url = '/episode/' + id
    return dispatch(
        apiCallBegan({
            url,
            onStart: episodeRequested.type,
            onSuccess: episodeReceived.type,
            onError: episodeRequestFailed.type,
        })
    );
};
