import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import episodeReducer from '../features/episodeSlice';
import historyReducer from '../features/historySlice';
import api from "../middleware/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    episode: episodeReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});
