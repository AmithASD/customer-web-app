import { Modal, Button, Box, Typography } from '@mui/material';

const DeleteModal = ({handleClose, open, deleteEmployee }) => {
  return (
    <div>
          <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
           id="modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this employee?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={deleteEmployee} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default DeleteModal
