import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Avatar,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '../../components/MUI';
import Grid from '@mui/material/Grid2';
// Material UI Icons
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Person as PersonIcon,
  Language as LanguageIcon,
  Devices as DevicesIcon,
  Cloud as CloudIcon,
  AccountCircle as AccountCircleIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import SnackBar from '../../components/common/SnackBar';

// Tab Panel Component for settings sections
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

export default function SettingsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      smsNotifications: false,
      weeklyReports: true
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      density: 'comfortable'
    },
    security: {
      twoFactorAuth: false,
      passwordChange: '',
      passwordConfirm: '',
      sessionTimeout: 30
    },
    profile: {
      name: 'John Smith',
      email: 'john.smith@company.com',
      department: 'Production',
      role: 'Manager'
    },
    system: {
      language: 'English',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h'
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSettingsChange = (section, field, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const handleSaveSettings = () => {
    // Simulate saving settings to backend
    setTimeout(() => {
      setSnackbarMessage('Settings saved successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }, 1000);
  };

  const handleResetSettings = () => {
    // Simulate resetting settings
    setTimeout(() => {
      setSnackbarMessage('Settings have been reset to default values');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
    }, 500);
  };

  // Settings tabs for mobile view in drawer
  const settingsTabs = (
    <Tabs
      orientation={isMobile ? "vertical" : "horizontal"}
      variant={isMobile ? "scrollable" : "standard"}
      value={tabValue}
      onChange={handleTabChange}
      aria-label="Settings sections"
      sx={{
        borderRight: isMobile ? 1 : 0,
        borderColor: 'divider',
        minHeight: isMobile ? '100%' : 'auto',
        "& .MuiTab-root": {
          minWidth: isMobile ? '100%' : 160,
          textAlign: 'left',
          alignItems: 'flex-start',
          py: 2
        }
      }}
    >
      <Tab icon={<PersonIcon />} label="Profile" {...a11yProps(0)} iconPosition="start" />
      <Tab icon={<NotificationsIcon />} label="Notifications" {...a11yProps(1)} iconPosition="start" />
      <Tab icon={<PaletteIcon />} label="Appearance" {...a11yProps(2)} iconPosition="start" />
      <Tab icon={<SecurityIcon />} label="Security" {...a11yProps(3)} iconPosition="start" />
      <Tab icon={<LanguageIcon />} label="System" {...a11yProps(4)} iconPosition="start" />
    </Tabs>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar - Only shown on Mobile */}
      {isMobile && (
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              {drawerOpen ? <ArrowBackIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Settings
            </Typography>
            <IconButton color="inherit" onClick={handleSaveSettings}>
              <SaveIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ overflow: 'auto', height: '100%' }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 2 }}>
                <AccountCircleIcon />
              </Avatar>
              <Typography variant="h6">Settings</Typography>
            </Box>
            <Divider />
            {settingsTabs}
          </Box>
        </Drawer>
      )}

      {/* Main Content */}
      <Box sx={{ p: isMobile ? 1 : 3 }}>
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Grid container>
            {/* Settings Tabs - Hidden on Mobile */}
            {!isMobile && (
              <Grid size={{ xs: 12, md: 12 }} sx={{ borderRight: 1, borderColor: 'divider' }}>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Avatar
                    sx={{ width: 80, height: 80, margin: '0 auto', mb: 1 }}
                  >
                    <AccountCircleIcon sx={{ fontSize: 60 }} />
                  </Avatar>
                  <Typography variant="h6">{settings.profile.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{settings.profile.department}</Typography>
                </Box>
                <Divider />
                <Box sx={{ width: '100%' }}>
                  {settingsTabs}
                </Box>
              </Grid>
            )}

            {/* Settings Content */}
            <Grid size={{ xs: 12, md: 12 }} sx={{ bgcolor: 'background.paper' }}>
              {!isMobile && (
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h5" component="h1">Settings</Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      sx={{ mr: 2 }}
                      onClick={handleResetSettings}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveSettings}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Profile Settings */}
              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom>User Profile</Typography>
                <Grid container spacing={3}>
                  <Grid  size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      value={settings.profile.name}
                      onChange={(e) => handleSettingsChange('profile', 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      value={settings.profile.email}
                      onChange={(e) => handleSettingsChange('profile', 'email', e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Department</InputLabel>
                      <Select
                        value={settings.profile.department}
                        onChange={(e) => handleSettingsChange('profile', 'department', e.target.value)}
                        label="Department"
                      >
                        <MenuItem value="Inventory">Inventory</MenuItem>
                        <MenuItem value="Production">Production</MenuItem>
                        <MenuItem value="Quality">Quality</MenuItem>
                        <MenuItem value="Finance">Finance</MenuItem>
                        <MenuItem value="HR">Human Resources</MenuItem>
                        <MenuItem value="Assets">Asset Management</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={settings.profile.role}
                        onChange={(e) => handleSettingsChange('profile', 'role', e.target.value)}
                        label="Role"
                      >
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="Supervisor">Supervisor</MenuItem>
                        <MenuItem value="Operator">Operator</MenuItem>
                        <MenuItem value="Admin">Administrator</MenuItem>
                        <MenuItem value="Analyst">Analyst</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Notifications Settings */}
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Alerts"
                      secondary="Receive important notifications via email"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.emailAlerts}
                        onChange={(e) => handleSettingsChange('notifications', 'emailAlerts', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Push Notifications"
                      secondary="Receive alerts in your browser"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => handleSettingsChange('notifications', 'pushNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="SMS Notifications"
                      secondary="Receive urgent notifications via text message"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.smsNotifications}
                        onChange={(e) => handleSettingsChange('notifications', 'smsNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Weekly Reports"
                      secondary="Receive weekly summary reports"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.weeklyReports}
                        onChange={(e) => handleSettingsChange('notifications', 'weeklyReports', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </TabPanel>

              {/* Appearance Settings */}
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>Appearance</Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Theme</InputLabel>
                      <Select
                        value={settings.appearance.theme}
                        onChange={(e) => handleSettingsChange('appearance', 'theme', e.target.value)}
                        label="Theme"
                      >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="system">System Default</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Font Size</InputLabel>
                      <Select
                        value={settings.appearance.fontSize}
                        onChange={(e) => handleSettingsChange('appearance', 'fontSize', e.target.value)}
                        label="Font Size"
                      >
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Density</InputLabel>
                      <Select
                        value={settings.appearance.density}
                        onChange={(e) => handleSettingsChange('appearance', 'density', e.target.value)}
                        label="Density"
                      >
                        <MenuItem value="compact">Compact</MenuItem>
                        <MenuItem value="comfortable">Comfortable</MenuItem>
                        <MenuItem value="spacious">Spacious</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Security Settings */}
              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" gutterBottom>Security Settings</Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>Two-Factor Authentication</Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Switch
                            checked={settings.security.twoFactorAuth}
                            onChange={(e) => handleSettingsChange('security', 'twoFactorAuth', e.target.checked)}
                          />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {settings.security.twoFactorAuth ? 'Enabled' : 'Disabled'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" gutterBottom>Change Password</Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          type="password"
                          label="New Password"
                          variant="outlined"
                          value={settings.security.passwordChange}
                          onChange={(e) => handleSettingsChange('security', 'passwordChange', e.target.value)}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Confirm Password"
                          variant="outlined"
                          value={settings.security.passwordConfirm}
                          onChange={(e) => handleSettingsChange('security', 'passwordConfirm', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Session Timeout (minutes)</InputLabel>
                      <Select
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingsChange('security', 'sessionTimeout', e.target.value)}
                        label="Session Timeout (minutes)"
                      >
                        <MenuItem value={15}>15 minutes</MenuItem>
                        <MenuItem value={30}>30 minutes</MenuItem>
                        <MenuItem value={60}>1 hour</MenuItem>
                        <MenuItem value={120}>2 hours</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* System Settings */}
              <TabPanel value={tabValue} index={4}>
                <Typography variant="h6" gutterBottom>System Preferences</Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Language</InputLabel>
                      <Select
                        value={settings.system.language}
                        onChange={(e) => handleSettingsChange('system', 'language', e.target.value)}
                        label="Language"
                      >
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Spanish">Spanish</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                        <MenuItem value="German">German</MenuItem>
                        <MenuItem value="Chinese">Chinese</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Date Format</InputLabel>
                      <Select
                        value={settings.system.dateFormat}
                        onChange={(e) => handleSettingsChange('system', 'dateFormat', e.target.value)}
                        label="Date Format"
                      >
                        <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                        <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                        <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Time Format</InputLabel>
                      <Select
                        value={settings.system.timeFormat}
                        onChange={(e) => handleSettingsChange('system', 'timeFormat', e.target.value)}
                        label="Time Format"
                      >
                        <MenuItem value="12h">12-hour (AM/PM)</MenuItem>
                        <MenuItem value="24h">24-hour</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Action buttons for tablet and desktop */}
              {!isMobile && (
                <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    sx={{ mr: 2 }}
                    onClick={handleResetSettings}
                  >
                    Reset to Defaults
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveSettings}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <SnackBar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={() => setSnackbarOpen(false)}
      message={snackbarMessage}
      severity={snackbarSeverity}
      />
    </Box>
  );
}