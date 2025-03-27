import { createSlice } from '@reduxjs/toolkit';
import { addRequest, addTicket, deleteLeaveRequest, getSingleUserAttendance, getSingleUserLeaves, getTicketList, requestLogoutUpdate } from './userAPI.js'


const initialState = {
  loading: false,
  error: null,
  leaveList: [],
  attendanceList: [],
  ticketList:[]
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // ======================================= adding new item =========================================== //
      .addCase(addRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        console.log('action payload leaveeeeeeeeeeeeeeeeeeeeeeeeeeee', action.payload)

        state.loading = false;
        state.leaveList = [action.payload.data, ...state.leaveList];


      })
      .addCase(addRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ===================================== get leave list ================================================ //
      .addCase(getSingleUserLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUserLeaves.fulfilled, (state, action) => {
        console.log('action get all leaves', action.payload)
        state.loading = false;
        state.leaveList = action.payload?.data
      })
      .addCase(getSingleUserLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ============================ delete leave  request ====================================== //
      .addCase(deleteLeaveRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLeaveRequest.fulfilled, (state, action) => {
        console.log('action payload delete', action.payload)

        state.loading = false;
        state.leaveList = state.leaveList.filter(leave => leave._id !== action.payload.data?.id);

      })
      .addCase(deleteLeaveRequest.rejected, (state, action) => {
        console.log(' erroraction payload', action.payload)
        state.loading = false;
        state.error = action.payload;
      })
      // ===================================== get attendance list ================================================ //
      .addCase(getSingleUserAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUserAttendance.fulfilled, (state, action) => {
        console.log('action get all attendance', action.payload)
        state.loading = false;
        state.attendanceList = action.payload?.data
      })
      .addCase(getSingleUserAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ===================================== get attendance list ================================================ //
      .addCase(requestLogoutUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestLogoutUpdate.fulfilled, (state, action) => {
        console.log('request log out', action.payload)
        const updatedAttendance = action.payload?.data
        state.loading = false;
        state.attendanceList = state.attendanceList.map(attendance => {
          return attendance._id === updatedAttendance._id ? updatedAttendance : attendance
        }
        )
        // state.attendanceList = action.payload?.data
      })
      .addCase(requestLogoutUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        // ======================================= adding new ticket =========================================== //
        .addCase(addTicket.pending, (state) => {
          state.loading = true;
        })
        .addCase(addTicket.fulfilled, (state, action) => {
          console.log('action payload leaveeeeeeeeeeeeeeeeeeeeeeeeeeee', action.payload)
  
          state.loading = false;
          state.ticketList = [action.payload.data, ...state.ticketList];
  
  
        })
        .addCase(addTicket.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // ===================================== get leave list ================================================ //
        .addCase(getTicketList.pending, (state) => {
          state.loading = true;
        })
        .addCase(getTicketList.fulfilled, (state, action) => {
          console.log('action get all leaves', action.payload)
          state.loading = false;
          state.ticketList = action.payload?.data
        })
        .addCase(getTicketList.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

  },
});

// export const { logout } = authSlice.actions;

export default userSlice.reducer;
