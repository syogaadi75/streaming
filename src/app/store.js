import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import episodeReducer from '../features/episodeSlice';
import historyReducer from '../features/historySlice';
import apiReducer from '../features/apiSlice';
import api from "../middleware/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    episode: episodeReducer,
    history: historyReducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});
