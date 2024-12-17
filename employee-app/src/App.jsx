
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EditEmployee from './components/edit/EditEmployee';
import AddEmployee from './components/add/AddEmployee';

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList/>} />
        <Route path="/add-employee" element={<AddEmployee/>} />
        <Route path="/edit-employee/:id" element={<EditEmployee/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
