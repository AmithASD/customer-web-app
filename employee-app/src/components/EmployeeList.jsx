import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { IconButton, Modal, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import MenuIcon from '@mui/icons-material/Menu';
import { DEPARTMENTS, EMPLOYEES, DELETE_EMPLOYEE } from '../services/api';
import API_ENDPOINT from '../services/config';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmpNo, setSelectedEmpNo] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchInput, setSearchInput] = useState('');


  //  Get Employee details
  const getEmployees = async () => {
    try {
      const response = await API_ENDPOINT.get(EMPLOYEES);
      // change the date type
      const formattedEmployees = response.data.map((employee) => ({
        ...employee,
        dateOfJoin: format(new Date(employee.dateOfJoin), 'yyyy-MM-dd'),
        dateOfBirth: format(new Date(employee.dateOfBirth), 'yyyy-MM-dd'),
      }));
      // setEmployees(response.data);
      setEmployees(formattedEmployees);
      setFilteredEmployees(formattedEmployees);
      console.log('employees ==================>>>>', employees);

    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  // Get Department Api Call
  const getDepartment = async () => {
    try {
      const response = await API_ENDPOINT.get(DEPARTMENTS);
      setDepartments(response.data)
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  useEffect(() => {
    getEmployees()
    getDepartment()
  }, []);

  // filters
  const handleDepartmentChange = (event) => {
    const selectedDept = event.target.value;
    setSelectedDepartment(selectedDept);
    console.log('selectedDepartment ==========>>>>', selectedDepartment);
    
    if (selectedDept) {
      const filtered = employees.filter(
        (emp) => emp.departmentCode === selectedDept
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees); 
    }
  };

  // Handle search input change
const handleSearchChange = (event) => {
  const query = event.target.value.toLowerCase(); 
  setSearchInput(query);

  if (query) {
    const filtered = employees.filter((emp) =>
      emp.empName.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  } else {
    setFilteredEmployees(employees); // Reset to all employees when search is cleared
  }
};

  // Handle Delete API Call
  const deleteEmployee = async () => {
    console.log('selectedEmpNo==========>>', selectedEmpNo);

    try {
      await API_ENDPOINT.delete(`${DELETE_EMPLOYEE}/${selectedEmpNo}`);
      setEmployees((prev) => prev.filter((emp) => emp.empNo !== selectedEmpNo));
      setOpenModal(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Open Modal and Set Employee ID
  const handleDelete = (empNo) => {
    setSelectedEmpNo(empNo);
    setOpenModal(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpenModal(false);
    setSelectedEmpNo(null);
  };

  const handleEdit = (empNo) => {
    console.log("Edit employee with empNo =========>>>", empNo);
    navigate(`/edit-employee/${empNo}`)
    // navigate("/edit-employee")
  };

  const handleStar = (empNo) => {
    console.log(`Star employee with empNo: ${empNo}`);
    // Mark the employee as starred or toggle a favorite state
  };

  const addEmployee = () => {
    navigate('/add-employee')
  }

  const columns = [
    { field: 'empNo', headerName: 'empNo', width: 70 },
    { field: 'empName', headerName: 'empName', width: 160 },
    { field: 'empAddressLine1', headerName: 'Address Line1', width: 160 },
    { field: 'empAddressLine2', headerName: 'Address Line2', width: 160 },
    { field: 'empAddressLine3', headerName: 'Address Line3', width: 160 },
    { field: 'departmentCode', headerName: 'Department', width: 120 },
    {
      field: 'dateOfJoin',
      headerName: 'Join Date',
      width: 160,
    },
    {
      field: 'dateOfBirth',
      headerName: 'B`Date',
      width: 120,
    },
    { field: 'basicSalary', headerName: 'Salary', width: 120 },
    {
      field: 'options',
      headerName: 'Options',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row.empNo)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.empNo)} color="error">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleStar(params.row.empNo)}
            style={{
              color: params.row.isActive ? 'blue' : undefined, // Conditionally set color
            }}
          >
            <StarIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
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
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Employee List
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ height: '70px' }}></div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16}>
          {/*  add Employee */}
          <Grid item xs={2}>
            <Item>
              <Box sx={{ '& > :not(style)': { m: 1 } }} style={{ border: 'none' }}>
                <Fab variant="extended" sx={{ border: 'none' }} onClick={addEmployee}>
                  <AddIcon sx={{ mr: 1 }} />
                  Employee
                </Fab>
              </Box>
            </Item>
          </Grid>

          {/* select depatment */}
          <Grid item xs={6}>
            <Item>
              <FormControl sx={{ m: 1, minWidth: 450 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Select Department</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  autoWidth
                  label="Select Department"
                >
                  {departments.map((dep) => (
                    <MenuItem
                    key={dep.departmentCode} value={dep.departmentCode}
                    >
                      {dep.departmentName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
          </Grid>

          {/* seach employee */}
          <Grid item xs={6}>
            <Item>
              <Box sx={{ width: 500, maxWidth: '100%' }}>
                <FormControl sx={{ m: 1, minWidth: 450 }}>
                  <TextField 
                  fullWidth 
                  label="Search Employee..." 
                  id="search" 
                  value={searchInput}
                  onChange={handleSearchChange}
                  />
                </FormControl>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div style={{ height: '30px' }}></div>

      {/* data table */}
      <Paper>
        <DataGrid
          rows={filteredEmployees}
          columns={columns}
          getRowId={(row) => row.empNo}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Delete Confirmation Modal */}
      <Modal open={openModal} onClose={handleClose}>
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
          <Typography id="modal-title" variant="h6" component="h2">
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
  );
};

export default EmployeeList;
