import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import updateData from '../api/postput';
function EditDialog({ open, handleClose, rowData }) {
  const [post, setPost] = React.useState(null);
  const [editedData, setEditedData] = useState(rowData);
  const handleSave = async () => {
    // try {
    //   if (editedData) {
    //     const updateddata = {title: editedData.title, address : editedData.address,description: editedData.description, price: editedData.price, area:editedData.area, isHire:editedData.isHire }; // Modify data as needed
    //     await updateData(editedData.title, editedData.description, editedData.address);
    //     console.log('blabla', updateData);
    //     handleClose();
    //   }
    // } catch (error) {
    //   console.error('Error updating data:', error);
    //   // Handle error (e.g., show an error message)
    // }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={editedData.title}
          onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          value={editedData.description}
          onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
        />
        <TextField
          label="Address"
          fullWidth
          value={editedData.address}
          onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
        />
        <TextField
          label="Area"
          fullWidth
          value={editedData.area}
          onChange={(e) => setEditedData({ ...editedData, area: e.target.value })}
        />
        <TextField
          label="Category"
          fullWidth
          value={editedData.categorylist}
          onChange={(e) => setEditedData({ ...editedData, categorylist: e.target.value })}
        />
        <TextField
          label="Price"
          fullWidth
          value={editedData.price}
          onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
        />
        <TextField
          label="Status"
          fullWidth
          value={editedData.status}
          onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
        />
        <TextField
          label="Hire Status"
          fullWidth
          value={editedData.isHire}
          onChange={(e) => setEditedData({ ...editedData, isHire: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default EditDialog;