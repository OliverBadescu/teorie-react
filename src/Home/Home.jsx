import { useEffect, useState } from "react"
import Employee from "./Employee/Employee";
import Spinner from 'react-bootstrap/Spinner';
import { getAllEmployees } from "../services/service";
import { Alert } from 'antd';

export default function Home() {


    let [employees, setEmployees] = useState([]);
    let [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);
    
    const fetchEmployees = async () =>{
        setLoading(true);
        
        const newErrors = [];

        try{
            const response = await getAllEmployees();
            if(response.success && response.body?.list){
                setEmployees(response.body.list);
            }else{
                newErrors.push("Failed to fetch employees");
            }
        }catch (err){
            newErrors.push(err.message);
        }finally{
            setLoading(false);
        }

        setError(newErrors);
    }


    useEffect(() => {

        fetchEmployees();

    }, [])




    return (
        <> 
        <div className="alert-container">
                {
                    error.length > 0&&(
                       <Alert 
                       message="Error"
                       description={error}
                       type="error"
                       showIcon
                       closable
                       />
                   )
               }
               {
                    error.length == 0 && !loading &&(
                        <Alert
                        message="Success"
                        description="Employees loaded succesfully"
                        type="success"
                        showIcon
                        closable
                        />
                    )
               }
        </div>
            <h1>Employees</h1>
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
                        loading&&(
                            <tr>
                                <td colSpan={4}>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </td>
                            </tr>
                        )
                    }
                   
                    {
                        !loading && employees.length > 0 &&
                            employees.map((em) => <Employee key={em.id} employee={em} />)
                    }

                    
                </tbody>
            </table>

            
        </>
    )

}