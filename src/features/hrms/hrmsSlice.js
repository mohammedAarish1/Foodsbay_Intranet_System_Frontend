import { createSlice } from '@reduxjs/toolkit';
import { addHoliday, createNewEmployee, deleteEmployee, deleteHoliday, getAttendanceList, getEmployeeList, getHolidayList, getLeaveList, getLogoutRequests, getTicketList, updateEmpLogOutTime, updateEmployee, updateLeaveStatus, updateTicketStatus, verifyAttendance } from './hrmsAPI';


const initialState = {
  loading: {
    leaveList: false,
    employeesList: false,
    attendanceList: false,
    logoutRequestList: false,
    holidayList: false,
    ticketList: false
  },
  error: {
    leaveList: null,
    employeesList: null,
    attendanceList: null,
    logoutRequestList: null,
    holidayList: null,
    ticketList: null
  },
  data: {
    leaveList: [],
    employeesList: [],
    attendanceList: [],
    logoutRequestList: [],
    holidayList: [],
    ticketList: []
  },
};

const hrmsSlice = createSlice({
  name: 'hrms',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // ======================================= creating new employee =========================================== //
      .addCase(createNewEmployee.pending, (state) => {
        state.loading.employeesList = true;
      })
      .addCase(createNewEmployee.fulfilled, (state, action) => {
        console.log('action payload create employee', action.payload)
        if (action.payload?.type === 'employee') {
          state.loading.employeesList = false;
          state.data.employeesList = [action.payload.data, ...state.employeesList];
        }

      })
      .addCase(createNewEmployee.rejected, (state, action) => {
        state.loading.employeesList = false;
        state.error.employeesList = action.payload;
      })
      // ========================================= get all employee list ========================================== //
      .addCase(getEmployeeList.pending, (state) => {
        state.loading.employeesList = true;
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        console.log('action get all entries', action.payload)

        state.loading.employeesList = false;
        state.data.employeesList = action.payload?.data


      })
      .addCase(getEmployeeList.rejected, (state, action) => {
        state.loading.employeesList = false;
        state.error.employeesList = action.payload;
      })
      // =========================================== deleting an employee ========================================== //
      .addCase(deleteEmployee.pending, (state) => {
        state.loading.employeesList = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        console.log('action payload delete', action.payload)

        if (action.payload?.type === 'employee') {
          state.loading.employeesList = false;
          state.data.employeesList = state.employeesList.filter(employee => employee._id !== action.payload.data?.id);
        }

      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        console.log(' erroraction payload', action.payload)
        state.loading.employeesList = false;
        state.error.employeesList = action.payload;
      })
      // =========================================== updating the employee data ========================================== //
      .addCase(updateEmployee.pending, (state) => {
        state.loading.employeesList = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        console.log('action', action.payload.data)
        const updatedEmployee = action.payload?.data;
        if (action.payload?.type === 'employee') {
          state.loading.employeesList = false;
          state.data.employeesList = state.employeesList.map(employee => {
            return employee._id === updatedEmployee._id ? updatedEmployee : employee
          }
          )
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        console.log(' erroraction payload', action.payload)
        state.loading.employeesList = false;
        state.error.employeesList = action.payload;
      })
      // =========================================== get leave list ========================================== //
      .addCase(getLeaveList.pending, (state) => {
        state.loading.leaveList = true;
      })
      .addCase(getLeaveList.fulfilled, (state, action) => {
        console.log('action get leaves list', action.payload)
        state.loading.leaveList = false;
        state.data.leaveList = action.payload?.data

      })
      .addCase(getLeaveList.rejected, (state, action) => {
        state.loading.leaveList = false;
        state.error.leaveList = action.payload;
      })
      // =========================================== update leave status ========================================== //
      .addCase(updateLeaveStatus.pending, (state) => {
        state.loading.leaveList = true;
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        console.log('action get leaves list', action.payload)
        const udpatedLeave = action.payload.data
        state.loading.leaveList = false;

        state.data.leaveList = state.data.leaveList.map(leave => {
          console.log(leave._id === udpatedLeave._id)
          return leave._id === udpatedLeave._id ? udpatedLeave : leave
        }
        )

      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.loading.leaveList = false;
        state.error.leaveList = action.payload;
      })

      // ========================================= get attendance list ========================================== //
      .addCase(getAttendanceList.pending, (state) => {
        state.loading.attendanceList = true;
      })
      .addCase(getAttendanceList.fulfilled, (state, action) => {
        console.log('action get all entries', action.payload)
        state.loading.attendanceList = false;
        state.data.attendanceList = action.payload?.data
      })
      .addCase(getAttendanceList.rejected, (state, action) => {
        state.loading.attendanceList = false;
        state.error.attendanceList = action.payload;
      })
      // ========================================= update employee log out time ========================================== //
      .addCase(updateEmpLogOutTime.pending, (state) => {
        state.loading.attendanceList = true;
      })
      .addCase(updateEmpLogOutTime.fulfilled, (state, action) => {
        console.log('action get all entries', action.payload)
        const updatedAttendance = action.payload?.data;
        console.log('updatedAttendancewa', updatedAttendance)

        state.loading.attendanceList = false;
        state.data.attendanceList = state.data.attendanceList.map(attendance => {
          return attendance._id === updatedAttendance._id ? updatedAttendance : attendance
        })
      })
      .addCase(updateEmpLogOutTime.rejected, (state, action) => {
        state.loading.attendanceList = false;
        state.error.attendanceList = action.payload;
      })
      // ========================================= get log out request list ========================================== //
      .addCase(getLogoutRequests.pending, (state) => {
        state.loading.logoutRequestList = true;
      })
      .addCase(getLogoutRequests.fulfilled, (state, action) => {
        console.log('action get all logout request', action.payload)
        state.loading.logoutRequestList = false;
        state.data.logoutRequestList = action.payload?.data
      })
      .addCase(getLogoutRequests.rejected, (state, action) => {
        state.loading.logoutRequestList = false;
        state.error.logoutRequestList = action.payload;
      })
      // ======================================= add new holiday =========================================== //
      .addCase(addHoliday.pending, (state) => {
        state.loading.holidayList = true;
      })
      .addCase(addHoliday.fulfilled, (state, action) => {
        console.log('action payload create employee', action.payload)

        state.loading.holidayList = false;
        state.data.holidayList = [action.payload.data, ...state.data.holidayList];


      })
      .addCase(addHoliday.rejected, (state, action) => {
        state.loading.holidayList = false;
        state.error.holidayList = action.payload;
      })
      // ========================================= get holiday list ========================================== //
      .addCase(getHolidayList.pending, (state) => {
        state.loading.holidayList = true;
      })
      .addCase(getHolidayList.fulfilled, (state, action) => {
        console.log('action get all entries', action.payload)
        state.loading.holidayList = false;
        state.data.holidayList = action.payload?.data
      })
      .addCase(getHolidayList.rejected, (state, action) => {
        state.loading.holidayList = false;
        state.error.holidayList = action.payload;
      })
      // =========================================== deleting a holidya ========================================== //
      .addCase(deleteHoliday.pending, (state) => {
        state.loading.holidayList = true;
      })
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        console.log('action payload delete', action.payload)

        state.loading.holidayList = false;
        state.data.holidayList = state.data.holidayList.filter(holiday => holiday._id !== action.payload.data?.id);

      })
      .addCase(deleteHoliday.rejected, (state, action) => {
        console.log(' erroraction payload', action.payload)
        state.loading.holidayList = false;
        state.error.holidayList = action.payload;
      })
      // =========================================== attendance ========================================== //
      .addCase(verifyAttendance.pending, (state) => {
        state.loading.attendanceList = true;
      })
      .addCase(verifyAttendance.fulfilled, (state, action) => {
        // console.log('action get all entries', action.payload)
        const updatedAttendance = action.payload?.data;
        console.log('updatedAttendancewa', updatedAttendance)

        state.loading.attendanceList = false;
        state.data.attendanceList = state.data.attendanceList.map(attendance => {
          return attendance._id === updatedAttendance._id ? updatedAttendance : attendance
        })
      })
      .addCase(verifyAttendance.rejected, (state, action) => {
        console.log(' erroraction payload', action.payload)
        state.loading.holidayList = false;
        state.error.holidayList = action.payload;
      })

      // =========================================== get ticket list ========================================== //
      .addCase(getTicketList.pending, (state) => {
        state.loading.ticketList = true;
      })
      .addCase(getTicketList.fulfilled, (state, action) => {
        console.log('action get leaves list', action.payload)
        state.loading.ticketList = false;
        state.data.ticketList = action.payload?.data

      })
      .addCase(getTicketList.rejected, (state, action) => {
        state.loading.ticketList = false;
        state.error.ticketList = action.payload;
      })

        // =========================================== update leave status ========================================== //
        .addCase(updateTicketStatus.pending, (state) => {
          state.loading.ticketList = true;
        })
        .addCase(updateTicketStatus.fulfilled, (state, action) => {
          console.log('action get leaves list', action.payload)
          const udpatedLeave = action.payload.data
          state.loading.ticketList = false;
  
          state.data.ticketList = state.data.ticketList.map(leave => {
            console.log(leave._id === udpatedLeave._id)
            return leave._id === udpatedLeave._id ? udpatedLeave : leave
          }
          )
  
        })
        .addCase(updateTicketStatus.rejected, (state, action) => {
          state.loading.ticketList = false;
          state.error.ticketList = action.payload;
        })
  },
});

// export const { logout } = authSlice.actions;

export default hrmsSlice.reducer;
