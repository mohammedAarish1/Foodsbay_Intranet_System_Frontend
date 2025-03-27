import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '../MUI'
import React from 'react'

const AlertBox = ({item,deleteDialogOpen,setDeleteDialogOpen,handleDelete}) => {
  console.log('item delete', item)
  return (
    <Dialog
    open={deleteDialogOpen}
    onClose={() => setDeleteDialogOpen(false)}
    maxWidth="xs"
    fullWidth
  >
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to delete "{item?.name||item?.employeeId}"? This action cannot be undone.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
      <Button onClick={handleDelete} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default AlertBox
