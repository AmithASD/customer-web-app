import { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Checkbox, FormControlLabel, } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ADD_EMPLOYEE } from '../../services/api';
import API_ENDPOINT from '../../services/config';


function AddEmployee() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    empNo: '',
      empName: '',
      empAddressLine1: '',
      empAddressLine2: '',
      empAddressLine3: '',
      departmentCode: '',
      dateOfJoin: new Date('2024-12-16T14:30:08.597Z'),
      dateOfBirth: new Date('2024-12-16T14:30:08.597Z'),
      basicSalary:5000,
      isActive: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  // const handleDateChange = (name, value) => {
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await API_ENDPOINT.post(ADD_EMPLOYEE, formData);
      alert('Employee updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };

  const backPage = () => {
    navigate('/')
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ArrowBackIosIcon  onClick={backPage}/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Create Employee
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{height:'60px'}}></div>

      {/* Details Form  */}
      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Employee Number */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Number"
                name="empNo"
                value={formData.empNo}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Employee Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Name"
                name="empName"
                value={formData.empName}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Address Lines */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Address Line 1"
                name="empAddressLine1"
                value={formData.empAddressLine1}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Address Line 2"
                name="empAddressLine2"
                value={formData.empAddressLine2}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Address Line 3"
                name="empAddressLine3"
                value={formData.empAddressLine3}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Department Code */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Department Code"
                name="departmentCode"
                value={formData.departmentCode}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Date of Joining */}
            {/* <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date of Joining"
                value={formData.dateOfJoin}
                onChange={(value) => handleDateChange('dateOfJoin', value)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid> */}

            {/* Date of Birth */}
            {/* <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(value) => handleDateChange('dateOfBirth', value)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid> */}

            {/* Basic Salary */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Basic Salary"
                name="basicSalary"
                type="number"
                value={formData.basicSalary}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Active Status */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    name="isActive"
                  />
                }
                label="Is Active"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default AddEmployee;
