import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOperators = createAsyncThunk(
  'operators/fetchOperators',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
  }
);

const operatorsSlice = createSlice({
  name: 'operators',
  initialState: {
    items: [],
    selectedOperator: null,
    status: 'idle', 
  },
  reducers: {
    selectOperator: (state, action) => {
      state.selectedOperator = action.payload;
    },
    clearSelection: (state) => {
      state.selectedOperator = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperators.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOperators.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(user => ({
          id: user.id,
          name: user.name,
          codeName: user.username,
          department: user.company.name,
          email: user.email,
          status: 'Active'
        }));
      });
  },
});

export const { selectOperator, clearSelection } = operatorsSlice.actions;
export default operatorsSlice.reducer;