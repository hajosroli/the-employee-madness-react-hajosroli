import { useState, useEffect } from "react";

const updateEmployee = (employee, empId) => {
  return fetch(`/api/employees/${empId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

export default function MissingEmployees(){
    const [employees, setEmployees] = useState([])
    console.log(employees)

    const fetchEmployees = async() => {
        const data = await fetch('http://localhost:3000/missing')
        const response = await data.json()
        setEmployees(response)
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const deleteMissing = (empId, index) => {
      
      let employee = employees[index];
      employee.present = true;
      let data = [...employees]
      data[index] = employee;
      setEmployees([...data])
      updateEmployee(employees[index], empId)
    .then(()=> (console.log('updated')))
    .then(() => fetchEmployees())
      
    }

    return (
        <div className="EmployeeTable">
        <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Delete</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <button type="button" onClick={() => deleteMissing(employee._id, index)}>Delete</button>
            </td>
        </tr>
        ))}
        </tbody>
    </table>
 </div>
        
    )
}