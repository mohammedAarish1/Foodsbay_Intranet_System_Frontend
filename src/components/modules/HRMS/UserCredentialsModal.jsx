import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Fade,
} from "@mui/material";
import Grid from '@mui/material/Grid2';

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CloseIcon } from "../../../assets/icons/icon";

const UserCredentialsModal = ({ open, onClose, userId, password }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (userId, password) => {
    const text = `User ID: ${userId} Password: ${password}`
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "50%" },
            bgcolor: "background.paper", // Uses theme background color (light/dark mode)
            borderRadius: "16px",
            boxShadow: 3,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >  <Box
          sx={{ textAlign: 'end', width: '100%' }}
        >
            <IconButton
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'rotate(90deg)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>

          </Box>


          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Employee Credentials
          </Typography>

          {password === '' ? (
            <Typography variant="body1" sx={{ color: 'green', mt: 2 }}>
              User has already changed it's password
            </Typography>
          ) : (
            <>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="User ID"
                    value={userId}
                    fullWidth
                    variant="outlined"
                    slotProps={{
                      readOnly: true,
                      sx: { backgroundColor: "action.disabledBackground" },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Password"
                    value={password}
                    fullWidth
                    variant="outlined"
                    slotProps={{
                      readOnly: true,
                      sx: { backgroundColor: "action.disabledBackground" },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                    sx={{ width: "48%", fontWeight: "bold" }}
                  >
                    Close
                  </Button> */}

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      onClick={() => handleCopy(userId, password)}
                      color={copied ? "success" : "default"}
                      sx={{ padding: "8px", backgroundColor: "action.hover" }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                    {/* <IconButton
                      onClick={() => handleCopy(password)}
                      color={copied ? "success" : "default"}
                      sx={{ padding: "8px", backgroundColor: "action.hover" }}
                    >
                      <ContentCopyIcon />
                    </IconButton> */}
                  </Box>
                </Grid>
              </Grid>

              {copied && (
                <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                  Copied to clipboard!
                </Typography>
              )}
            </>
          )}



        </Box>

      </Fade>
    </Modal>
  );
};

export default UserCredentialsModal;
