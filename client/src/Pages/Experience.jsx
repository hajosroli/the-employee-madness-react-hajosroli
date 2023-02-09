import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";


export default function Experience(){
    const {experience} = useParams()
    const [employees, setEmployees] = useState([])
    console.log(employees)
    console.log(experience)

    const fetchEmployees = (exp) => {
        return fetch(`/years-of-experience/${exp}`).then((res) => res.json())
    }

    useEffect(()=> {
        fetchEmployees(experience)
        .then((data) => {
            setEmployees(data)
        })
    }, [experience])

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
            <td>{employee.experience}</td>
        </tr>
        ))}
        </tbody>
    </table>
 </div>
    )
}