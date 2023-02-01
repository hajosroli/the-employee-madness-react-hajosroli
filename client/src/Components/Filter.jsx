import { useState, useEffect } from "react";

export default function Filter(){
    const [employees, setEmployees] = useState([])
    const [filters, setFilters] = useState('')
    const emp = [...employees]
    console.log(employees)
    console.log(filters)
    /*const fetchEmployees = (signal) => {
        return fetch("/api/employees", { signal }).then((res) => res.json());
      };*/
    
    async function fetchEmployees(){
       const data = await fetch("/api/employees");
       const result = await data.json()
       setEmployees(result)
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    function filtering(e){
        setFilters(e.target.value)
    }

    function filterEmployees(){
        const filtered = emp.filter(e => {
            return e.position.toLowerCase().includes(filters.toLowerCase()) || e.level.toLowerCase().includes(filters.toLowerCase())
        })
        console.log(filtered)
        setEmployees(filtered)
    }


    return (
        <>
        <div>
            <input className="filter" type="text" placeholder="filter by position or leves" onChange={filtering} onClick={filterEmployees}></input>
        </div>
        </>
    )
}



