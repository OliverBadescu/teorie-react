import { useEffect, useState } from "react"
import Employee from "./Employee/Employee";

import { getAllEmployees } from "../services/service";

export default function Home() {


    let [employees ,setEmployees]=useState([]);


    let  loadData= async ()=>{


        let data=  await getAllEmployees();

        console.log(data);
        setEmployees(data.body.list);
    }

     useEffect(()=>{

      loadData();


     },[])
    return (
        <>
            <h1>Books</h1>
            <p><a className="button">Create New Employee</a></p>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                       employees.length>0 
                       ?(

                           employees.map(em=><Employee employee={em} />)
                       )
                       :
                       (<p>Loading</p>)

                    }
                </tbody>
            </table>
        </>
    )

}