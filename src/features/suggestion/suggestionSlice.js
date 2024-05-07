import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import suggestionService from "./suggestionService";

export const getSuggestions = createAsyncThunk(
  "suggestion/get-suggestions",
  async (thunkAPI) => {
    try {
      return await suggestionService.getSuggestions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getASuggestion = createAsyncThunk(
  "suggestion/get-suggestion",
  async (id, thunkAPI) => {
    try {
      return await suggestionService.getSuggestion(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteASuggestion = createAsyncThunk(
  "suggestion/delete-suggestion",
  async (id, thunkAPI) => {
    try {
      return await suggestionService.deleteSuggestion(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  suggestions: [],
  suggestion: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const suggestionSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.suggestions = action.payload;
      })
      .addCase(getSuggestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getASuggestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getASuggestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.suggestion = action.payload;
      })
      .addCase(getASuggestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteASuggestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteASuggestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedSuggestion = action.payload;
      })
      .addCase(deleteASuggestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default suggestionSlice.reducer;
