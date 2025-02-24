import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import sidebarReducer from './slices/sideBarSlices'
// import profileReducer from './slices/profileSlice'; 
// import hospitalReducer from './slices/hospitalSlice'; 
// import planReducer from './slices/planSlice';

const store = configureStore({
  reducer: {
    // plan: planReducer,
    // school: profileReducer,
    // employee: hospitalReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;