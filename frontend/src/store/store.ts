import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import sidebarReducer from './slices/sideBarSlices'
import basicInfoReducer from "./slices/basicInfo";
import healthStatusReducer from "./slices/healthStatus";
import medicalHistoryReducer from "./slices/medicalHistory";
import treatmentInfoReducer from "./slices/treatmentInfo";
import labResultsReducer from "./slices/labResults";
import notesReducer from "./slices/notes";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    basicInfo: basicInfoReducer,
    healthStatus: healthStatusReducer,
    medicalHistory: medicalHistoryReducer,
    treatmentInfo: treatmentInfoReducer,
    labResults: labResultsReducer,
    notes: notesReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;