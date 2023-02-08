import { useState, useEffect } from "react";

export default function TopPaid(){
    
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        const data = await fetch('http://localhost:3000/top-paid');
        const response = await data.json()
        setEmployees(response)
    }

    useEffect(() => {
        fetchEmployees()
    }, []);

    const convertSalary = (slry) => {
        let sal = slry.toString()
       
        return sal.substring(0, sal.length - 3) + "." + sal.substring(sal.length - 3, sal.length) + "$";
      } 
    

    return (
        <div className="EmployeeTable">
        <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>{convertSalary(employee.current_salary)}</td>
        </tr>
        ))}
        </tbody>
    </table>
 </div>
    )
}