import { Link } from "react-router-dom";
//import EmployeePresent from "../EmployeePresent";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, checked, setChecked, handleChange }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level </th>
          <th>Position </th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={employee._id} id={index}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
            <input type="checkbox" value={employee.present} checked={employee.present} id={index} onChange={() => handleChange(employee.present,index, employee._id)}/>
            </td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
//