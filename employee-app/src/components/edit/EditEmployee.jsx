import { Box, Typography, Grid, TextField, Button, Checkbox, FormControlLabel, } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API_ENDPOINT from '../../services/config';
import { EMPLOYEE_BY_ID, EDIT_EMPLOYEE } from '../../services/api';

const EditEmployee = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [formData, setFormData] = useState({
    empNo: '',
    empName: '',
    empAddressLine1: '',
    empAddressLine2: '',
    empAddressLine3: '',
    departmentCode: '',
    basicSalary: '',
    isActive: false,
  });

  // get Data by ID
  const fetchEmployeeData = async () => {
    console.log("id ==========>>>", id);
    try {
      const response = await API_ENDPOINT.get(`${EMPLOYEE_BY_ID}/${id}`);
      setFormData(response.data); 
      console.log("formData ==========>>>", formData);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  // Update the  data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await API_ENDPOINT.put(`${EDIT_EMPLOYEE}/${id}`, formData);
      await API_ENDPOINT.put(EDIT_EMPLOYEE, formData);
      alert('Employee updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // previous page
  const backPage = () => {
    navigate('/');
  };

  // Fetch employee data by id
  useEffect(() => {
    fetchEmployeeData();
  }, []);

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
              <ArrowBackIosIcon onClick={backPage} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Update Employee
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ height: '60px' }}></div>

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
  )
}

export default EditEmployee
