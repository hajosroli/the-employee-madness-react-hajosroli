import { Link } from "react-router-dom";
//import Confirmation from "../../Pages/Confirmation";
//import EmployeePresent from "../EmployeePresent";
import "./EmployeeTable.css";
import { Modal, Button, Table } from "react-bootstrap";
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
    <div className="container">
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Equipment</th>
            <th>Starting Date</th>
            <th>Current Salary</th>
            <th>Desired Salary</th>
            <th>Difference</th>
            <th>Favourite Color</th>
            <th>Actions</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{employee.equipment}</td>
              <td>{employee.starting_date}</td>
              <td>{convertSalary(employee.current_salary)}</td>
              <td>{convertSalary(employee.desired_salary)}</td>
              <td>{convertSalary(employee.desired_salary - employee.current_salary)}</td>
              <td style={{ backgroundColor: employee.fav_color }}></td>
              <td>
                <Link to={`/kittens/${employee._id}`} className="btn btn-primary mr-2">Kittens</Link>
                <Link to={`/update/${employee._id}`} className="btn btn-warning mr-2">Update</Link>
                <button className="btn btn-danger" onClick={() => showConfirmation(index, employee._id)}>Delete</button>
              </td>
              <td>
                <input type="checkbox" value={employee.present} checked={employee.present} id={index} onChange={() => handleChange(employee.present, index, employee._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger">Are you sure?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => onDelete(id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  </>
);

export default EmployeeTable;
//