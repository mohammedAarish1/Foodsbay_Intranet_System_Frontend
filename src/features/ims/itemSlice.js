import { createSlice } from '@reduxjs/toolkit';
import { createNewEntry, deleteEntry, getAllEntries, getItemHistory, updateEntry } from './itemAPI';


const initialState = {
  loading: false,
  itemList: [],
  purchaseList: [],
  salesList: [],
  salesReturnList: [],
  purchaseReturnList: [],
  defectiveProductsList: [],
  historyData:{},
  error: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // ======================================= adding new item =========================================== //
      .addCase(createNewEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewEntry.fulfilled, (state, action) => {
        console.log('action payload create', action.payload)
        if (action.payload?.type === 'purchaseEntry') {
          state.loading = false;
          state.purchaseList = [action.payload.data, ...state.purchaseList];
        }
        else if (action.payload?.type === 'salesEntry') {
          state.loading = false;
          state.salesList = [action.payload.data, ...state.salesList];
        }
        else if (action.payload?.type === 'itemEntry') {
          state.loading = false;
          state.itemList = [action.payload.data, ...state.itemList];
        }
        else if (action.payload.type === 'salesReturnEntry') {
          console.log('sales return response create',action.payload)
          state.loading = false;
          state.salesReturnList = [action.payload.data, ...state.salesReturnList];
        }
        else if (action.payload.type === 'purchaseReturnEntry') {
          console.log('purchase-retur', action.payload)
          state.loading = false;
          state.purchaseReturnList = [action.payload.data, ...state.purchaseReturnList];
        }

      })
      .addCase(createNewEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ========================================= adding new item ========================================== //
      .addCase(getAllEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEntries.fulfilled, (state, action) => {
        console.log('action get all entries', action.payload)
        if (action.payload?.type === 'purchases') {
          state.loading = false;
          state.purchaseList = action.payload?.data
        } else if (action.payload?.type === 'items') {
          state.loading = false;
          state.itemList = action.payload?.data;
        } else if (action.payload.type === 'sales-return') {
          state.loading = false,
            state.salesReturnList = action.payload?.data
        } else if (action.payload.type === 'sales') {
          state.loading = false,
            state.salesList = action.payload?.data
        } else if (action.payload.type === 'purchase-return') {
          state.loading = false,
            state.purchaseReturnList = action.payload?.data
        }
        else if (action.payload.type === 'defectiveProducts') {
          state.loading = false;
          state.defectiveProductsList = action.payload?.data?.defectiveProductsList;
        }

      })
      .addCase(getAllEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // =========================================== deleting a  item ========================================== //
      .addCase(deleteEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        console.log('action payload delete', action.payload)

        if (action.payload?.type === 'purchaseEntry') {
          state.loading = false;
          state.purchaseList = state.purchaseList.filter(item => item._id !== action.payload.data?.id);
        } else if (action.payload?.type === 'itemEntry') {
          state.loading = false;
          state.itemList = state.itemList.filter(item => item._id !== action.payload.data?.id);
        } else if (action.payload.type === 'salesEntry') {
          console.log('action sales', action.payload.data)
          state.loading = false;
          state.salesList = state.salesList.filter(item => item._id !== action.payload.data?.id);
        } else if (action.payload.type === 'salesReturnEntry') {
          state.loading = false;
          state.salesReturnList = state.salesReturnList.filter(item => item._id !== action.payload.data?.id);
        } else if (action.payload.type === 'purchaseReturnEntry') {
          state.loading = false;
          state.purchaseReturnList = state.purchaseReturnList.filter(item => item._id !== action.payload.data?.id);
        }
        else if (action.payload.type === 'defectiveProductEntry') {
          state.loading = false;
          state.defectiveProductsList = state.defectiveProductsList.filter(item => item._id !== action.payload.data?.id);
        }

      })
      .addCase(deleteEntry.rejected, (state, action) => {
        console.log(' erroraction payload', action.payload)
        state.loading = false;
        state.error = action.payload;
      })
      // =========================================== updating an item ========================================== //
      .addCase(updateEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        console.log('action', action.payload.data)
        const updatedItem = action.payload?.data;
        console.log('updatedItem', updatedItem)
        if (action.payload?.type === 'purchaseEntry') {
          state.loading = false;
          state.purchaseList = state.purchaseList.map(item => {
            return item._id === updatedItem._id ? updatedItem : item
          }
          )
        } else if (action.payload?.type === 'itemEntry') {
          state.loading = false;
          state.itemList = state.itemList.map(item =>
            item._id === updatedItem._id ? updatedItem : item
          )
        } else if (action.payload?.type === 'salesEntry') {
          state.loading = false;
          state.salesList = state.salesList.map(item =>
            item._id === updatedItem._id ? updatedItem : item
          )
        } else if (action.payload.type === 'purchaseReturnEntry') {
          state.loading = false;
          state.purchaseReturnList = state.purchaseReturnList.map(item =>
            item._id === updatedItem._id ? updatedItem : item
          )
        }
      })
      .addCase(updateEntry.rejected, (state, action) => {
        console.log(' erroraction payload', action.payload)
        state.loading = false;
        state.error = action.payload;
      })
     // ========================================= get item history ========================================== //
     .addCase(getItemHistory.pending, (state) => {
      state.loading = true;
    })
    .addCase(getItemHistory.fulfilled, (state, action) => {
      console.log('action history', action.payload)
      state.loading = false;
      state.historyData = action.payload;

    })
    .addCase(getItemHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

  },
});

// export const { logout } = authSlice.actions;

export default itemSlice.reducer;
