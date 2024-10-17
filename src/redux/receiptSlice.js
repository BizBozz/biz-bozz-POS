import { createSlice } from "@reduxjs/toolkit";

const receiptSlice = createSlice({
  name: "receipts",
  initialState: {
    selectedTable: null,
    receipts: {},
  },
  reducers: {
    selectTable(state, action) {
      state.selectedTable = action.payload;
    },
    removeTable(state, action) {
      const tableToRemove = action.payload;
      delete state.receipts[tableToRemove];
    },
    addItemToReceipt(state, action) {
      const { table, item } = action.payload;
      if (!state.receipts[table]) {
        state.receipts[table] = [];
      }
      state.receipts[table].push(item);
    },
    removeItemFromReceipt(state, action) {
      const { table, itemName } = action.payload;
      if (state.receipts[table]) {
        const index = state.receipts[table].findIndex(
          (item) => item.dishName === itemName
        );
        if (index !== -1) {
          state.receipts[table].splice(index, 1); // Remove one instance of the item
        }
      }
    },
  },
});

export const {
  selectTable,
  removeTable,
  addItemToReceipt,
  removeItemFromReceipt,
} = receiptSlice.actions;
export default receiptSlice.reducer;
