


export default  function Employee({employee}){



    return (
        <tr>
        <td>
            <a href="#">{employee.fullName}</a>
        </td>
        <td>{employee.age}</td>
        <td>{employee.gender}</td>
        <td>{employee.salary}</td>
    </tr>
    )
}