import { useState } from "react";
import { updateEmployee, deleteEmployee } from "../../services/service";
import { Alert } from 'antd';


export default function UpdateEmployee(){

        const employeeId = 26;
        const [updatedEmployee, setUpdateEmployee] = useState(false);
        const [deletedEmployee, setDeleteEmployee] = useState(false);

        const [formData, setFormData] = useState({
            fullName:'John Doe',
            age:'25',
            gender:'M',
            salary:'5000'
        });

        const [errors, setErrors] = useState([]);


        const handleChange = (event) => {
            const {name, value} = event.target;
            setFormData((prevData) =>({
                ...prevData,
                [name]: value
            }));
        };

        const handleUpdateEmployee = async(event) =>{

            event.preventDefault();
            setUpdateEmployee(false);

            const newErrors = [];

            if(!formData.fullName.trim()){
                newErrors.push("Title is required");
            }
            if(!formData.gender.trim()){
                newErrors.push("Gender is required");
            }
            if(!formData.age.trim()){
                newErrors.push("Age is required");
            }
            if(!formData.salary.trim()){
                newErrors.push("Salary is required");
            }



            if(newErrors.length > 0){
                setErrors(newErrors);
            }else{
                setErrors([]);
                let data = await updateEmployee(formData, employeeId);
                setUpdateEmployee(true);
                if(data.status === 404){
                    setErrors(["No user with this id found!"]);
                }

            }
        }

        const handleDeleteEmployee = async(event) =>{

            event.preventDefault();
            setDeleteEmployee(false);
            
            let data = await deleteEmployee(employeeId);

            if(!data.success){
                setErrors(["No user with this id found!"]);
            }else{
                setDeleteEmployee(true);
                setErrors([]);
            }

        };

        return(

        <>  
            {
               errors.length>0&&(
                  <div className = "alert-container">
                     <Alert 
                        message="Error"
                        description={
                            <div>
                                {errors.map((error, index) => (
                                    <div key={index}>{error}</div> 
                                ))}
                            </div>
                        }
                        type="error"
                        showIcon
                        closable
                        onClose={() => setErrors([])}
                        />
                  </div>
               )
           }
           {
                updatedEmployee &&(
                    <div className = "alert-container">
                        <Alert
                        message="Success"
                        description="Employee updated succesfully!"
                        type="success"
                        showIcon
                        closable
                        />
                    </div>
                )
           }
           {
                deletedEmployee &&(
                    <div className = "alert-container">
                        <Alert
                        message="Success"
                        description="Employee deleted succesfully!"
                        type="success"
                        showIcon
                        closable
                        />
                    </div>
                )
           }
            <h1>Update Employee</h1>
            <form>
                <p>
                    <label htmlFor="fullName">Full Name</label>
                    <input name="fullName" type="text" id="fullName-input" value={formData.fullName} onChange={handleChange} />
                </p>
                <p>
                    <label htmlFor="age">Age</label>
                    <input name="age" type="number" id="age-input" value={formData.age} onChange={handleChange} min={18} max={100} />
                </p>
                <p>
                    <label htmlFor="gender">Gender</label>
                    <input name="gender" type="text" id="gender-input" value={formData.gender} onChange={handleChange} />
                </p>
                <p>
                    <label htmlFor="salary">Salary</label>
                    <input name="salary" type="number" id="salary-input" value={formData.salary} onChange={handleChange}/>
                </p>
                <div className="button-container">
                    <button className="update-employee-button" onClick={handleUpdateEmployee}>Update Employee</button>
                    <button className="delete-employee-button" onClick={handleDeleteEmployee}>Delete Employee</button>
                    <button className="cancel-employee-button" onClick={null}>Cancel</button>
                </div>
            </form>
            
        </>

        );


}