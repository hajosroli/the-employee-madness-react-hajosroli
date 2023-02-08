import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};
const fetchEquipment = () => {
  return fetch(`/api/equipment/`).then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(true);
  const [equipments, setEquipments] = useState(null) 
 console.log(equipments)

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    
    setEquipmentLoading(true)
     fetchEquipment()
        .then((data) => {
          setEquipments(data)
          setEquipmentLoading(false)
        })
        
     
      .catch((error) => {
        throw error;
      });
  }, []);

  if ( equipmentLoading) {
    return <Loading />;
  }
  return (
    <EmployeeForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
      equipments={equipments}
    />
  );
};

export default EmployeeCreator;
