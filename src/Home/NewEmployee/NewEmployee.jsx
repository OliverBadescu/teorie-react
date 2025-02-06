import { useEffect, useState } from "react"
import { createEmployee } from "../../services/service";


export default function NewEmployee() {


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
        }else{
            setErrors([]);
            let data= await createEmployee(formData);
            alert("Employee added successfully");
            setFormData({
                fullName:'',
                age:'',
                gender:'',
                salary:''
            });
        }


    }

    return (
        <>
            <h1>New Employee</h1>
            <form>
           {
               errors.length>0&&(
                  <div>
                      <h2 className="error">Oooops!</h2> 
                       <ul className="error">
                         {
                               errors.map(err=>{
                                return (<li>{err}</li>)
                            })
                         }
                       </ul>
                  </div>
               )
           }
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
                <button className="create-employee-button" onClick={handleAddEmployee}>Create New Employee</button>
                <p>
                    <a className="button" href="#">
                        Cancel
                    </a>
                </p>
            </form>
        </>
    );

}