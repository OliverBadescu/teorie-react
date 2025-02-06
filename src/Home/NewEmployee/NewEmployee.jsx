import { useEffect, useState } from "react"
import { createEmployee } from "../../services/service";
import { Alert } from 'antd';



export default function NewEmployee() {

    const [addEmployee, setAddEmployee] = useState(false);


    const [formData, setFormData] = useState({
        fullName:'',
        age:'',
        gender:'',
        salary:''
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        const{name, value} = event.target;

        setFormData((prevData) =>({
            ...prevData,
            [name]: value
        }))
    }




    const handleAddEmployee = async(event) =>{
       
        event.preventDefault();
        setAddEmployee(false);

        setErrors([]);

        const  newErros=[];

        if(!formData.fullName.trim()){
            newErros.push("Title is required");
        }
        if(!formData.gender.trim()){
            newErros.push("Gender is required");
        }
        if(!formData.age.trim()){
            newErros.push("Age is required");
        }
        if(!formData.salary.trim()){
            newErros.push("Salary is required");
        }


        if(newErros.length>0){
            setErrors(newErros);
            return;
        }
        try {
            let data = await createEmployee(formData);
            setAddEmployee(true);
            setFormData({
                fullName: '',
                age: '',
                gender: '',
                salary: ''
            });
        } catch (error) {
            console.error("Error creating employee:", error);
            setErrors(["Failed to create employee. Please try again."]);
        }


    }

    return (
        <>{
               errors.length>0&&(
                    <div className = "alert-container add-employee-alert-container">
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
                addEmployee &&(
                    <div className = "alert-container add-employee-alert-container">
                        <Alert
                        message="Success"
                        description="Employee added succesfully!"
                        type="success"
                        showIcon
                        closable
                        />
                    </div>
                )
           }
            <h1>New Employee</h1>
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
                    <button className="create-employee-button" onClick={handleAddEmployee}>Create New Employee</button>
                    <button className="cancel-button">Cancel</button>
                </div>
            </form>
        </>
    );

}