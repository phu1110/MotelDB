import React, { useState, useEffect } from 'react';
import {getCategoryData} from '../../api/api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {putPost} from '../../api/api';
import Autocomplete from '@mui/material/Autocomplete';

function EditDialog({ open, handleClose, rowData }) {
  const [editedData, setEditedData] = useState(rowData);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const handleCategoryChange = (event, newValue) => {
    setEditedData({ ...editedData, categoryids: newValue.map((option) => option.id) });
  };
  const handleisHireChange = (event, newValue) => {
    setEditedData({ ...editedData, isHire: newValue });
  };
  const handlestatusChange = (event, newValue) => {
    setEditedData({ ...editedData, status: newValue });
  };
  const hirestatusOption = [
    'Chưa Được Thuê', 'Đã Được Thuê'
  ];
  const statusOption = [
    'Đã Duyệt', 'Không Chấp Nhận Duyệt', 'Đang Chờ Duyệt', 'Đã Ẩn'
  ];


  useEffect(() => {
    getCategoryData()
      .then(apiData => {
        setCategoryOptions(apiData.data);
      })
  }, []);
  const handleSave = async () => {
    try {
      if (editedData) {
        const updateddata = { title: editedData.title, address: editedData.address, description: editedData.description, price: editedData.price, area: editedData.area, isHire: editedData.isHire, status: editedData.status, categoryids: editedData.categoryids };
        await putPost(editedData.id, updateddata);
        console.log('Thành Công', putPost);
        handleClose();
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sửa Tin</DialogTitle>
      <DialogContent>
        <TextField
          label="Tiêu Đề"
          fullWidth
          value={editedData.title}
          onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
        />
        <TextField
          label="Mô Tả"
          fullWidth
          multiline
          rows={4}
          value={editedData.description}
          onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
        />
        <TextField
          label="Địa Chỉ"
          fullWidth
          value={editedData.address}
          onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
        />
        <TextField
          label="Diện Tích"
          fullWidth
          value={editedData.area}
          onChange={(e) => setEditedData({ ...editedData, area: e.target.value })}
        />
        <TextField
          label="Giá"
          fullWidth
          value={editedData.price}
          onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={statusOption}
          getOptionLabel={(option) => option}
          value={editedData.status}
          disableClearable={true}
          onChange={handlestatusChange}
          renderInput={(statusOption) => <TextField {...statusOption} label="Trạng Thái Duyệt" inputProps={{
            ...statusOption.inputProps,
            readOnly: true,
          }} />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={hirestatusOption}
          getOptionLabel={(option) => option}
          value={editedData.isHire}
          disableClearable={true}
          onChange={handleisHireChange}
          renderInput={(hirestatusOption) => <TextField {...hirestatusOption} label="Trạng Thái Thuê" inputProps={{
            ...hirestatusOption.inputProps,
            readOnly: true,
          }} />}
        />
        <Autocomplete
          multiple
          id="size-small-outlined-multi"
          options={categoryOptions}
          getOptionLabel={(option) => option.name}
          value={categoryOptions.filter((option) => editedData.categoryids.includes(option.id))}
          onChange={handleCategoryChange}
          disableClearable={true}
          renderInput={(categoryOptions) => (
            <TextField
              {...categoryOptions}
              label="Chọn Danh Mục"
              placeholder="Chọn Danh Mục"
              inputProps={{ ...categoryOptions.inputProps, readOnly: true }} />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Huỷ
        </Button>
        <Button onClick={handleSave} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default EditDialog;