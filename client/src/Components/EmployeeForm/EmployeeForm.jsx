import { useState, useEffect } from "react";
import  "./EmployeeForm.css";
import { Form, Button, Dropdown,  } from "react-bootstrap";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments}) => {
  const [selected, setSelected] = useState("Select...")
  const [position, setPosition] = useState("")
  const [experience, setExperience] = useState("")
  console.log(position)
  console.log(experience)

  function onItemClick(equipment){
    setSelected(equipment.name)
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData)
    const entries = [...formData.entries()];
console.log(entries)
    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    if(selected !== "Select..."){
      employee.equipment =  selected;
      employee.experience = experience;
    }
console.log(employee)
    return onSave(employee);
    
  };

  return (
    <div className="container">
    <Form className="mt-4" onSubmit={onSubmit}>
      {employee && (
        <Form.Control type="hidden" name="_id" defaultValue={employee._id} />
      )}
      <Form.Group className="mb-3" controlId="employeeName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" defaultValue={employee ? employee.name : ''} name="name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="employeeLevel">
        <Form.Label>Level:</Form.Label>
        <Form.Control type="text" defaultValue={employee ? employee.level : ''} name="level" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="employeePosition">
        <Form.Label>Position:</Form.Label>
        <Form.Control type="text" defaultValue={employee ? employee.position : ''} name="position" onChange={e => setPosition(e.target.value)} />
      </Form.Group>

      {position !== "Junior" && (
        <Form.Group className="mb-3" controlId="employeeExperience">
          <Form.Label>Years of experience:</Form.Label>
          <Form.Control type="number" defaultValue={employee ? employee.experience : ''} name="experience" onChange={e => setExperience(e.target.value)} />
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="employeeStartingDate">
        <Form.Label>Starting Date:</Form.Label>
        <Form.Control type="date" defaultValue={employee ? employee.starting_date : ''} name="starting_date" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="employeeCurrentSalary">
        <Form.Label>Current Salary:</Form.Label>
        <Form.Control type="number" defaultValue={employee ? employee.current_salary : ''} name="current_salary" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="employeeDesiredSalary">
        <Form.Label>Desired Salary:</Form.Label>
        <Form.Control type="number" defaultValue={employee ? employee.desired_salary : ''} name="desired_salary" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="employeeFavColor">
        <Form.Label>Favourite Color:</Form.Label>
        <Form.Control type="color" defaultValue={employee ? employee.fav_color : ''} name="fav_color" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="employeeEquipment">
        <Form.Label>Equipment:</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-equipment">
            {selected ? selected : "Select Equipment"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {equipments.map((equipment) => (
              <Dropdown.Item key={equipment.name} onClick={() => onItemClick(equipment)}>
                {equipment.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <div className="buttons mt-3">
        <Button type="submit" disabled={disabled} className="mr-2">
          {employee ? "Update Employee" : "Create Employee"}
        </Button>

        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
    </div>
  );
};

export default EmployeeForm;
