import React, { useState, useEffect } from 'react';
import fetchCategoryFromApi from '../api/categoryget'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import updateData from '../api/postput';
import Autocomplete from '@mui/material/Autocomplete';

function EditDialog({ open, handleClose, rowData }) {
  const [editedData, setEditedData] = useState(rowData);

  const handleCategoryChange = (event, newValue) => {
    setEditedData({ ...editedData, categoryids: newValue.map((option) => option.id) });
  };


  const [categoryOptions, setData] = useState([]);
  useEffect(() => {
    fetchCategoryFromApi()
      .then(apiData => {
        setData(apiData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleSave = async () => {
    try {
      if (editedData) {
        const updateddata = { title: editedData.title, address: editedData.address, description: editedData.description, price: editedData.price, area: editedData.area, isHire: editedData.isHire, status: editedData.status, categoryids: editedData.categoryids};
        await updateData(editedData.id, updateddata);
        console.log('Thành Công', updateData);
        handleClose();
      }
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle error (e.g., show an error message)
    }
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
        <Autocomplete
          multiple
          id="size-small-outlined-multi"
          options={categoryOptions}
          getOptionLabel={(option) => option.name}
          value={categoryOptions.filter((option) => editedData.categoryids.includes(option.id))}
          onChange={handleCategoryChange}
          renderInput={(categoryOptions) => (
            <TextField
              {...categoryOptions}
              label="Select Categories"
              placeholder="Select Categories"
            />
          )}
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