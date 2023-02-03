import { useState, useEffect } from "react";
import  "./EmployeeForm.css";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select...")

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
      <label htmlFor="equipment">Equipment:</label>
        <div className="dropdown-container">
        <div className="dropdown-input" onClick={handleOpen}>{selected}
      {open && (
        <div className="dropdown-menu">
          {equipments.map((equipment) => (
            <li 
            defaultValue={employee ? employee.equipment : null}
            name="equipment"
            id="equipment"
            key={equipment.name} 
            className="dropdown-item" 
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
