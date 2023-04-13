import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams,useNavigate,Link } from "react-router-dom";

const Update = (props) => {
    const [pirates, setPirates] = useState({firstName:'', type:'', description:'',skills0:'', skills1:'', skills2:''})
    const [firstName, setFirstName]= useState('')
    const [type, setType]= useState('')
    const [description, setDescription]= useState('')
    const [skills0, setSkills0]= useState('')
    const [skills1, setSkills1]= useState('')
    const [skills2, setSkills2]= useState('')
    const [errors,setErrors] = useState([])
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/pirates/' + id)
            .then((res) => {
                console.log('Get a pirate to update:');
                console.log(res.data);
                setPirates(res.data);
            })
            .catch((err) => console.log(err))
    }, [])
    const updatePirate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/pirates/edit/' + id,{firstName,type,description,skills0,skills1,skills2})
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setPirates(res.data)
                
                navigate("/pirates");
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
                console.log(errors);
            })
    }
    return (
        <div>
            <Link to={`/pirates`}>Home</Link>
            <h1>Update a Pirate</h1>
            <form onSubmit={updatePirate}>
            <p>
                <label className="form-label">First Name:</label><br/>
                <input className="form-control" type="text" name='firstname' value={pirates.firstName} onChange = {(e)=>setFirstName(e.target.value)}/>
                {errors.firstName ?
                    <p>{errors.firstName.message}</p>
                    :null
                }
            </p>
            <p>
                <label className="form-label">Type:</label><br/>
                <input className="form-control" type="text" name='type' value={pirates.type} onChange = {(e)=>setType(e.target.value)}/>
                {errors.type ?
                    <p>{errors.type.message}</p>
                    :null
                }
            </p>
            <p>
                <label className="form-label"> Description:</label><br/>
                <input className="form-control" type="text" name='description' value={pirates.description} onChange = {(e)=>setDescription(e.target.value)}/>
                {errors.description ?
                    <p>{errors.description.message}</p>
                    :null
                }
            </p>
            {errors.skills0 ?
                    <p>{errors.skills0.message}</p>
                    :null
                }
            <p>
                <label className="form-label">First Skill (Optional):</label><br/>
                <input className="form-control" type="text" name='skills0' value={pirates.skills0} onChange = {(e)=>setSkills0(e.target.value)}/>
                
            </p>
            {errors.skills1 ?
                    <p>{errors.skills1.message}</p>
                    :null
            }
            <p>
                <label className="form-label">Second Skill (Optional):</label><br/>
                <input className="form-control" type="text" name='skills1' value={pirates.skills1} onChange = {(e)=>setSkills1(e.target.value)}/>
                
            </p>
            {errors.skills2 ?
                    <p>{errors.skills2.message}</p>
                    :null
            }
            <p>
                <label className="form-label">Third Skill (Optional):</label><br/>
                <input className="form-control" type="text" name='skills2' value={pirates.skills2} onChange = {(e)=>setSkills2(e.target.value)}/>
                
            </p>
            
            
            <button type="submit" className="btn btn-info mt-3">Update Pirates</button>
            </form> 
        </div>
    )
}
export default Update;