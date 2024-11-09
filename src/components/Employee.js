function Employee(props){
    return (
        <>
            <h3>Employee {props.name}</h3>
            <p>Role : {props.role ? props.role : "No Role"}</p>
            {props.role ? <p class="role">{props.role}</p> : <p className="norole">No Role</p> }
        </>
    )
}

export default Employee;