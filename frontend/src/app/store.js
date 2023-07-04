import {configureStore} from '@reduxjs/toolkit';
import uploadFileReducer from "../features/uploadFileSlice";

export const store = configureStore({
    reducer: {
        uploadFile: uploadFileReducer,
    },
});
