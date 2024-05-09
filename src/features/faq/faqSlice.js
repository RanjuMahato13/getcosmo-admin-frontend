import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import faqService from "./faqService";

export const getFaqs = createAsyncThunk("faq/get-faqs", async (thunkAPI) => {
  try {
    return await faqService.getFaqs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getFaq = createAsyncThunk("faq/get-faq", async (id, thunkAPI) => {
  try {
    return await faqService.getFaq(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteFaq = createAsyncThunk(
  "faq/delete-faq",
  async (id, thunkAPI) => {
    try {
      return await faqService.deleteFaq(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateFaq = createAsyncThunk(
  "faq/update-faq",
  async (faq, thunkAPI) => {
    try {
      return await faqService.updateFaq(faq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addFaq = createAsyncThunk(
  "faq/add-faq",
  async (faqData, thunkAPI) => {
    try {
      return await faqService.addFaq(faqData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  faqs: [],
  faq: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const faqSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getFaqs
      .addCase(getFaqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.faqs = action.payload;
      })
      .addCase(getFaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // getFaq
      .addCase(getFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.question = action.payload.question;
        state.answer = action.payload.answer;
      })
      .addCase(getFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // updateFaq
      .addCase(updateFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedFaq = action.payload;
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // deleteFaq
      .addCase(deleteFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedFaq = action.payload;
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // addFaq
      .addCase(addFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdFaq = action.payload;
      })
      .addCase(addFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default faqSlice.reducer;
