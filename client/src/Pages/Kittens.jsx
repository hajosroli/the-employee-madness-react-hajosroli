import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loading from "../Components/Loading";

const createKitten = (kitten,id) => {
    return fetch(`/api/employees/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kitten),
      }).then((res) => res.json());
}


export default function Kittens(){
    const { id } = useParams()
        const [employee, setEmployee] = useState({})
        const [employeeLoading, setEmployeeLoading] = useState(true);
        const [catName, setCatName] = useState('')
        const [weight, setWeight] = useState('')
        /*const [newKitten, setNewKitten] = useState({
            name: "",
            weight: ""
        })*/
        

        console.log(employee)
        const fetchKittens = (id) => {
           return fetch(`/kittens/${id}`).then((res) => res.json())
        }

        useEffect(() => {
            setEmployeeLoading(true);
            fetchKittens(id)
                .then((data) => {
                    setEmployee(data)
                    setEmployeeLoading(false);
                })
                .catch((error) => {
                    throw error;
                  });
            
        }, [id]);

        const handleCreate = (e) => {
            const newKitten = {
                name: catName,
                weight: weight
            }
            console.log(newKitten)
            createKitten(newKitten, id)
                .then(() => {
                     console.log("created")
                })
            fetchKittens(id)
                .then((data) => {
                    setEmployee(data)
                   })
            setCatName('')
            setWeight('')
            }
           
       
       
        

        if(employeeLoading){
            return <Loading />
        }
    return (
        <div className="EmployeeTable">
            <div>{employee.name}</div>
                <div>
                    <input value={catName} placeholder="Type Name" onChange={e => setCatName(e.target.value)}></input>
                    <input value={weight} placeholder="Type Weight" onChange={e => setWeight(e.target.value)}></input>
                    <button type="button" onClick={e=> handleCreate()}>Add Kitten</button>
                </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Weight</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {employee.kittens.map(kitten => ( 
                    <tr key={kitten._id}>
                        <td>{kitten.name}</td>
                        <td>{kitten.weight}</td>

                    </tr>
    ))}
                </tbody>
            </table>
        </div>
    )
}