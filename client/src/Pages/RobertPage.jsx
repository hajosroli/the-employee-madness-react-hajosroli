import { useState, useEffect } from "react";

export default function RobertPage(){
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        const data = await fetch('http://localhost:3000/robert');
        const response = await data.json()
        setEmployees(response)
    }

    useEffect(() => {
        fetchEmployees()
    }, []);

    return (
        <div className="EmployeeTable">
        <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
        </tr>
        ))}
        </tbody>
    </table>
 </div>
 )
        }