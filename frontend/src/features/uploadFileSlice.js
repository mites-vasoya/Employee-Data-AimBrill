import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import uploadFileService from "./uploadFileReducer";

const initialState = {
    employeeData: [],
    isImporting: false,
    isImported: false,
    isError: false,
};

export const uploadFile = createAsyncThunk("file/upload", async (formData, thunkAPI) => {
    try {
        return await uploadFileService.uploadIFile(formData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const fileImportSlice = createSlice({
    name: "file", initialState, reducers: {
        reset: (state) => initialState,
    }, extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.isImporting = false;
                state.isImported = true;
                state.employeeData = action.payload;
            })
            .addCase(uploadFile.rejected, (state, action) => {
            })
    },
});

export const {reset} = fileImportSlice.actions;
export default fileImportSlice.reducer;