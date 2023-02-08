import { useState, useEffect } from "react";
import  "./EmployeeForm.css";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select...")
console.log(equipments)
console.log(open)
  useEffect(() => {
    const handler = () => setOpen(false);

    window.addEventListener("click", handler);
    return () => 
    {window.removeEventListener("click", handler)};
  })

  function handleOpen(e){
    e.stopPropagation()
    setOpen(!open)
  }

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

  employee.equipment =  selected;

console.log(employee)
    return onSave(employee);
    
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>
            <div className="control">
          <label htmlFor="starting_date">Starting Date:</label>
          <input 
          type="date" 
          defaultValue={employee ? employee.starting_date : null}
          name="starting_date"
          id="starting_date" />
        </div>
        <div className="control">
          <label htmlFor="current_salary">Current Salary:</label>
          <input 
          type="number" 
          defaultValue={employee ? employee.current_salary : null}
          name="current_salary"
          id="current_salary" />
        </div>
        <div className="control">
          <label htmlFor="desired_salary">Desired Salary:</label>
          <input 
          type="number" 
          defaultValue={employee ? employee.desired_salary : null}
          name="desired_salary"
          id="desired_salary" />
        </div>
        <div className="control">
          <label htmlFor="fav_color">Favourite Color:</label>
          <input 
          type="color" 
          defaultValue={employee ? employee.fav_color : null}
          name="fav_color"
          id="fav_color" />
        </div>
          

      <div className="control">
      <label htmlFor="equipment">Equipment:</label>
        <div className="dropdown-container">
        <div className="dropdown-input" onClick={handleOpen}>{selected}
      {open && (
        <div className="menu">
          {equipments.map((equipment) => (
            <li className="dropdown-item" 
            defaultValue={employee ? employee.equipment : null}
            name="equipment"
            id="equipment"
            key={equipment.name} 
            
            onClick={() => onItemClick(equipment)}>
              {equipment.name}
            </li>
          ))}
        </div>
      )} 
      </div>
      </div>
    
      
      
      
    </div>
      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
