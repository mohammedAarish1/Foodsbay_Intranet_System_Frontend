import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Box } from '../components/MUI';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Notifications from '../components/common/Notifications';
import HRMSOverviewPage from '../pages/modules/HRMS/HRMSOverviewPage';
import EmployeeListPage from '../pages/modules/HRMS/EmployeeListPage';
import ComplaintsQueriesPage from '../pages/modules/HRMS/ComplaintsQueriesPage';
import EmployeeReportsPage from '../pages/modules/HRMS/EmployeeReportsPage';
import UserOverviewPage from '../pages/modules/USER/UserOverviewPage';
import UserInformationPage from '../pages/modules/USER/UserInformationPage';
import UserLeavesPage from '../pages/modules/USER/UserLeavesPage';
import LeaveRequestPage from '../pages/modules/HRMS/LeaveRequestPage';
import AttendanceLogsPage from '../pages/modules/HRMS/AttendanceLogsPage';
import UserAttendancePage from '../pages/modules/USER/UserAttendancePage';
import UserComplaintPage from '../pages/modules/USER/UserComplaintPage';
import LogoutRequestPage from '../pages/modules/HRMS/LogoutRequestPage';
import HolidayPage from '../pages/modules/HRMS/HolidayPage';
import ChangePassword from '../pages/auth/ChangePasswordPage';
import LeavePoliciesPage from '../pages/modules/HRMS/LeavePoliciesPage';
import SettingsPage from '../pages/common/SettingsPage';
import UserAddRatingPage from '../pages/modules/USER/UserAddRatingPage';
import UserMyPerformancePage from '../pages/modules/USER/UserMyPerformancePage';


const HRMSRoutes = () => {
  return (
    <DashboardLayout slots={{
      toolbarActions: Notifications,
    }}>
      <Routes>
        <Route path="/hrms" element={<HRMSOverviewPage />} />
        <Route path="/hrms/employees/list" element={<Box p={4}><EmployeeListPage /></Box>} />
        <Route path="/hrms/attendance-logs" element={<Box p={4}><AttendanceLogsPage /></Box>} />
        <Route path="/hrms/leave-requests" element={<Box p={4}><LeaveRequestPage /></Box>} />
        <Route path="/hrms/logout-requests" element={<Box p={4}><LogoutRequestPage /></Box>} />
        <Route path="/hrms/holidays" element={<Box p={4}><HolidayPage /></Box>} />
        <Route path="/hrms/employee-reports" element={<Box p={4}><EmployeeReportsPage /></Box>} />
        <Route path="/hrms/complaints-queries" element={<Box p={4}><ComplaintsQueriesPage /></Box>} />
        <Route path="/hrms/leave-policies" element={<Box p={4}><LeavePoliciesPage /></Box>} />
        <Route path="/hrms/leave-policies" element={<Box p={4}><LeavePoliciesPage /></Box>} />
        <Route path="/hrms/settings" element={<Box p={4}><SettingsPage /></Box>} />

        {/* user profile routes  */}
        <Route path="/profile/overview" element={<Box p={4}><UserOverviewPage /></Box>} />
        <Route path="/profile/personal-information" element={<Box p={4}><UserInformationPage /></Box>} />
        <Route path="/support-requests/leaves" element={<Box p={4}><UserLeavesPage /></Box>} />
        <Route path="/support-requests/complaints-queries" element={<Box p={4}><UserComplaintPage /></Box>} />
        <Route path="/profile/attendance-tracking" element={<Box p={4}><UserAttendancePage /></Box>} />
        <Route path="/profile/change-password" element={<Box p={4}><ChangePassword /></Box>} />
        <Route path="/performance-tracking/reveiw/performance" element={<Box p={4}><UserAddRatingPage /></Box>} />
        <Route path="/performance-tracking/my/performance" element={<Box p={4}><UserMyPerformancePage /></Box>} />
      </Routes>
    </DashboardLayout>
  )
}

export default HRMSRoutes;
