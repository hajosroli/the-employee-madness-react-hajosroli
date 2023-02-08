import { Link } from "react-router-dom";
//import Confirmation from "../../Pages/Confirmation";
//import EmployeePresent from "../EmployeePresent";
import "./EmployeeTable.css";
import { Modal, Button } from "react-bootstrap";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'



 


const EmployeeTable = ({ 
  employees,
  onDelete,
  handleChange,
  showConfirmation,
  showConfirm,
  setShowConfirm,
  id,
  convertSalary,
  startDate
   }) => (
    <>
  <div className="EmployeeTable">
  
    <table>
    
      <thead>
        <tr>
          <th>Name</th>
          <th>Level </th>
          <th>Position </th>
          <th>Equipment</th>
          <th>Starting Date</th>
          <th>Current Salary</th>
          <th>Desired Salary</th>
          <th>Difference</th>
          <th>Favourite Color</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={employee._id} id={index}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{employee.equipment}</td>
            <td>{employee.starting_date}</td>
            
            <td>{convertSalary(employee.current_salary)}</td>
            <td>{convertSalary(employee.desired_salary)}</td>
            <td>{convertSalary(employee.desired_salary - employee.current_salary)}</td>
            <td style={{backgroundColor: (employee.fav_color)}
              }>{employee.fav_color}</td>
            <td>
              <Link to={`/kittens/${employee._id}`}>
              <button type="button">Kittens</button>
              </Link>
              </td>
            <td>
            <input type="checkbox" value={employee.present} checked={employee.present} id={index} onChange={() => handleChange(employee.present,index, employee._id)}/>
            </td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => showConfirmation(index, employee._id)}>
                Delete
              </button>
             
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <Modal show={showConfirm} onHide={!showConfirm}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Confirmation</Modal.Title>
    </Modal.Header>
    <Modal.Body><div className="alert alert-danger">Are you sure?</div></Modal.Body>
    <Modal.Footer>
      <Button variant="default" onClick={() => setShowConfirm(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={() =>onDelete(id) }>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
  </>
);

export default EmployeeTable;
//