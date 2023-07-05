import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import employeeService from "./employeeReducer";

const initialState = {
    employeeData: [],
    isImporting: false,
    isImported: false,
    isDeleting: false,
    isDelete: false,
    isAdded: false,
    isAdding: false,
    isError: false,
};

export const uploadFile = createAsyncThunk("file/upload", async (formData, thunkAPI) => {
    try {
        return await employeeService.uploadIFile(formData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateData = createAsyncThunk("data/update", async (newData, thunkAPI) => {
    try {
        return await employeeService.updateData(newData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const addNewData = createAsyncThunk("data/add/new", async (newData, thunkAPI) => {
    try {
        return await employeeService.addNewData(newData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteSingleData = createAsyncThunk("data/delete/single", async (employeeId, thunkAPI) => {
    try {
        return await employeeService.deleteSingleData(employeeId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteMultipleData = createAsyncThunk("data/delete/multiple", async (employeeIds, thunkAPI) => {
    try {
        return await employeeService.deleteMultipleData(employeeIds);
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
                state.isImporting = true;
                state.isImported = false;
                state.isError = false;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.isImporting = false;
                state.isImported = true;
                state.isError = false;
                state.employeeData = action.payload;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.isImporting = false;
                state.isImported = false;
                state.isError = true;
            })
            .addCase(addNewData.pending, (state) => {
                state.isImporting = true;
                state.isImported = false;
                state.isError = false;
            })
            .addCase(addNewData.fulfilled, (state, action) => {
                state.isAdding = false;
                state.isAdded = true;
                state.isError = false;
                state.employeeData.push(action.payload.data);
            })
            .addCase(addNewData.rejected, (state, action) => {
                state.isImporting = false;
                state.isImported = false;
                state.isError = true;
            })
            .addCase(updateData.pending, (state) => {
                state.isImporting = true;
                state.isImported = false;
                state.isError = false;
            })
            .addCase(updateData.fulfilled, (state, action) => {
                state.isImporting = false;
                state.isImported = true;
                state.isError = false;
                for (let i = 0; i < state.employeeData.length; i++) {
                    if (state.employeeData[i].EmployeeID === Number(action.payload.newData.employeeid)) {
                        state.employeeData[i] = action.payload.newData;
                        console.log("DATA MATCHED;;;");
                        break;
                    }
                }
                console.log("NEW DATA :::: ", action.payload.newData);
            })
            .addCase(updateData.rejected, (state, action) => {
                state.isImporting = false;
                state.isImported = false;
                state.isError = true;
            })
            .addCase(deleteSingleData.pending, (state) => {
                state.isDeleting = true;
                state.isDeleted = false;
                state.isError = false;
            })
            .addCase(deleteSingleData.fulfilled, (state, action) => {
                state.isDeleting = false;
                state.isDeleted = true;
                //Filter employeeData to Remove Deleted Data from the Table
                state.employeeData = state.employeeData.filter((data) => {
                    return data.EmployeeID !== Number(action.payload.employeeId);
                });
            })
            .addCase(deleteSingleData.rejected, (state, action) => {
                state.isDeleting = false;
                state.isDeleted = false;
                state.isError = true;
            })
            .addCase(deleteMultipleData.pending, (state) => {
                state.isDeleting = true;
                state.isDeleted = false;
                state.isError = false;
            })
            .addCase(deleteMultipleData.fulfilled, (state, action) => {
                state.isDeleting = false;
                state.isDeleted = true;
                //Filter employeeData to Remove Deleted Data from the Table
                state.employeeData = state.employeeData.filter((data) => {
                    return !action.payload.return.includes(data.EmployeeID);
                });
                console.log("RETURN :", state.employeeData.length)
            })
            .addCase(deleteMultipleData.rejected, (state, action) => {
                state.isDeleting = false;
                state.isDeleted = false;
                state.isError = true;
            });
    },
});

export const {reset} = fileImportSlice.actions;
export default fileImportSlice.reducer;