import { Form, Button } from "react-bootstrap";

const EquipmentForm = ({ onSave, disabled, equipment, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const equipment = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(equipment);
  };

  return (
    <div className="container">
    <Form className="mt-4" onSubmit={onSubmit}>
      {equipment && (
        <Form.Control type="hidden" name="_id" defaultValue={equipment._id} />
      )}

      <Form.Group className="mb-3" controlId="equipmentName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" defaultValue={equipment ? equipment.name : ''} name="name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="equipmentType">
        <Form.Label>Type:</Form.Label>
        <Form.Control type="text" defaultValue={equipment ? equipment.type : ''} name="type" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="equipmentAmount">
        <Form.Label>Amount:</Form.Label>
        <Form.Control type="number" defaultValue={equipment ? equipment.amount : ''} name="amount" />
      </Form.Group>

      <div className="buttons mt-3">
        <Button type="submit" disabled={disabled} className="mr-2">
          {equipment ? "Update Equipment" : "Create Equipment"}
        </Button>

        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
    </div>
  );
};

export default EquipmentForm;
