import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import shadeService from "./shadeService";

export const getShades = createAsyncThunk(
    "shade/get-shades",
     async(thunkAPI) => {
    try {
       return await shadeService.getShades();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
}
);
export const createShade = createAsyncThunk(
    "shade/create-shade",
    async (shadeData, thunkAPI) => {
      try {
        return await shadeService.createShade(shadeData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);
export const getAShade = createAsyncThunk(
    "shade/get-shade",
     async(id, thunkAPI) => {
    try {
       return await shadeService.getShade(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
}
);
export const updateAShade = createAsyncThunk(
    "shade/update-shade",
    async (shade, thunkAPI) => {
      try {
        return await shadeService.updateShade(shade);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);
export const deleteAShade = createAsyncThunk(
    "shade/delete-shade",
     async(id, thunkAPI) => {
    try {
       return await shadeService.deleteShade(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
}
);
export const resetState = createAction("Reset_all");
const initialState = {
    shades:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
export const shadeSlice = createSlice({
    name: "shades",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getShades.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getShades.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.shades = action.payload;
        })
        .addCase(getShades.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createShade.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createShade.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdShade = action.payload;
        })
        .addCase(createShade.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateAShade.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateAShade.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedShade = action.payload;
        })
        .addCase(updateAShade.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAShade.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAShade.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.shadeName = action.payload.title;
        })
        .addCase(getAShade.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteAShade.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteAShade.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedshade = action.payload.title;
        })
        .addCase(deleteAShade.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});
export default shadeSlice.reducer;