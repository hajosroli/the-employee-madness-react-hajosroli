
import { Modal, Button } from "react-bootstrap";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function Confirmation(
    showConfirm,
    setShowConfirm,
    id,
    onDelete){
    return (
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
    )
    }


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