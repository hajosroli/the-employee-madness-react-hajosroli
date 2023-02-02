import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";

const fetchEquipments = (signal) => {
  return fetch("/api/equipment", { signal }).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setOrder] = useState('')
  
  const sorting = (col) => {
    if(order === 'ASC' || order === ''){
      const sorted = [...data].sort((a, b) => 
        a[col].toLowerCase() > b[col].toLowerCase()? 1 : -1);
      setData(sorted)
      setOrder('DSC')
      } else if(order === 'DSC'){
        const sorted = [...data].sort((a, b) => 
        a[col].toLowerCase() < b[col].toLowerCase()? 1 : -1);
      setData(sorted)
      setOrder('ASC')
      }
    }

  const handleFilter = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredEquipments = data ? data.filter(e => {
      return e.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      ||
       e.type.toLowerCase().includes(searchTerm.toLowerCase())
  }): [];
  
  const handleDelete = (id) => {
    deleteEquipment(id).catch((err) => {
      console.log(err);
    });

    setData((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchEquipments(controller.signal)
      .then((equipments) => {
        setLoading(false);
        setData(equipments);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData([]);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
  <>
  <div>
    <input 
    className="filterbytype" 
    type="text" placeholder="filter by name or type" 
    value={searchTerm} 
    onChange={handleFilter}>
    </input>
    <button onClick={() => sorting('name')}>Sort by Name</button>
    <button onClick={() => sorting('type')}>Sort by Type</button>
      
  </div>
  <EquipmentTable equipments={filteredEquipments} onDelete={handleDelete} sorting={sorting} />
  </>
  )
};

export default EquipmentList;
