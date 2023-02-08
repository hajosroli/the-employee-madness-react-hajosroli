import { useState, useEffect} from "react"
import Loading from "../Components/Loading";

const createTool = (tool) => {
    return fetch("/tools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tool),
    }).then((res) => res.json());
  };

  const deleteTool = (name) => {
    return fetch(`/tools/${name}`, {
        method: "DELETE"  
    }).then((res) => res.json())
  }
export default function Tools(){
    const [tools, setTools] = useState([]);
    const [query, setQuery] = useState('');
    const [name, setName] = useState('')
    const [weight, setWeight] = useState('')
    const [toolsLoading, setToolsLoading] = useState(true);


    /*const fetchTools = async() => {
        const data = await fetch('http://localhost:3000/tools')
        const response = await data.json()
        setTools(response)
    }*/
    const fetchTools = () => {
        return fetch(`/tools`).then((res) => res.json());
      };

    

    useEffect(() => {
    
        setToolsLoading(true)
         fetchTools()
            .then((data) => {
                setTools(data)
                setToolsLoading(false)
            })
          .catch((error) => {
            throw error;
          });
      }, []);

    const filteredTools = tools ? 
    tools.filter(tool => {
        return tool.name.toLowerCase().includes(query.toLowerCase())}): null;
    
    const handleFilter = (e, index) => {
        setQuery(e.target.value)
    }

    const submitTool = (e) => {
        const newTool = [...tools,
        {
            name: name,
            weight: weight
        }]
        createTool(newTool)
        .then(() => setTools(newTool))
        .then(() => fetchTools())
        .then(() => console.log("created"))
     setName('')
     setWeight('')
    }

    const handleDeleteTool = (name) => {
        deleteTool(name).catch((err) => {
            console.log(err)
        })
        
        setTools((tools) => {
            return tools.filter(tool => tool.name !== name)
        })

    }

if (toolsLoading){
  return  <Loading />
}
    
    return (
        <div className="EmployeeTable">
            
            <div>
                <input 
                className="filterTools"
                value={name}
                id="name"
                onChange={e => setName(e.target.value)}
                placeholder="Name" ></input>
            </div>
            <div>
                <input 
                className="filterTools"
                value={weight}
                id="weight"
                onChange={e => setWeight(e.target.value)}
                placeholder="Weight" ></input>
            </div>
            <button onClick={e => submitTool(e)}>Create Tool</button>
            
            <div>
                <input 
                className="filterTools"
                value={query}
                name="filter"
                
                onChange={e => handleFilter(e)}
                placeholder="Filter Tools" ></input>
            </div>
            
           
        <table>
            
      <thead>
        <tr>
          <th>Name</th>
          <th>Weight</th>
         
        </tr>
      </thead>
      <tbody>
        {filteredTools.map((tool, index) => (
          <tr key={index}>
            <td>{tool.name}</td>
            <td>{tool.weight}</td>
            
            <td>
              <button type="button" onClick={()=> handleDeleteTool(tool.name)}>Delete</button>
            </td>
        </tr>
        ))}
        </tbody>
    </table>
 </div>
    )
}