import { useEffect,useState} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
const UserForm = (props)=>{
    const {pirates,setPirates} = props
    const [message,setMessage]= useState('Loading...')
    const [errors,setErrors] = useState([])

    const [firstName, setFirstName]= useState('')
    const [image, setImage]= useState('')
    const [treasureChests, setTreasureChests]= useState('')
    const [catchPhrase, setCatchPhrase]= useState('')
    const [position, setPosition]= useState('')
    const [gear0, setGear0]= useState(true)
    const [gear1, setGear1]= useState(true)
    const [gear2, setGear2]= useState(true)
    
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:8000/api/')
        .then((res)=>{
            setMessage(res.data.message)
        })
        .catch(err=>console.log(err))
    },[])
    
    const onSubmitHandler = (e)=> {
        e.preventDefault();
        axios.post('http://localhost:8000/api/pirates/create',{firstName,image,treasureChests,catchPhrase,position,gear0,gear1,gear2})
        .then(res =>{
            console.log(res);
            console.log(res.data);
            setPirates([...pirates, res.data])
                
            navigate("/pirates");
        })
        .catch(err=>{
            setErrors(err.response.data.errors);
        })
    }
    const nav = {
        border: '5px solid black',
        backgroundColor: 'brown',
        
    }
    const body={
        backgroundColor:'orange',
        height:'100vh'
    }
    const button={
        border:'3px solid green',
        color:'white',
        backgroundColor:'blue'
    }
    return (
        <>
        <nav className='navbar' style={nav}>
            <h2>Join the Pirate Ship!</h2>
            <Link to={`/pirates`} style={button}>Crew Board</Link>
        </nav>
        <form className="col mx-auto" onSubmit={onSubmitHandler} style={body}>
        
            <p>
                <label className="form-label">First Name:</label><br/>
                <input className="form-control" type="text" name='firstname' value={firstName} onChange = {(e)=>setFirstName(e.target.value)}/>
                {errors.firstName ?
                    <p >{errors.firstName.message}</p>
                    :null
                }
            </p>
            <p>
                <label className="form-label">Image Url:</label><br/>
                <input className="form-control" type="text" name='type' value={pirates.image} onChange = {(e)=>setImage(e.target.value)}/>
                {errors.image ?
                    <p>{errors.image.message}</p>
                    :null
                }
            </p>
            <p>
                <label className="form-label"> Number of Treasure Chests:</label><br/>
                <input className="form-control" type="number" min='0' name='treasure_chests' value={pirates.treasureChests} onChange = {(e)=>setTreasureChests(e.target.value)}/>

                {errors.treasureChests ?
                    <p>{errors.treasureChests.message}</p>
                    :null
                }
            </p>
            
            <p>
                <label className="form-label">Catchphrase :</label><br/>
                <input className="form-control" type="text" name='catchphrase' value={pirates.catchPhrase} onChange = {(e)=>setCatchPhrase(e.target.value)}/>
                {errors.catchPhrase ?
                    <p>{errors.catchPhrase.message}</p>
                    :null
            }
            </p>
            
            <p>
                <label className="form-label">Position :</label><br/>
                <select className="form-control" name="position" id="" onChange = {(e)=>setPosition(e.target.value)}>
                    <option >Select One:</option>
                    <option value={pirates.position}>Captain</option>
                    <option value={pirates.position}>First Mate</option>
                    <option value={pirates.position}>Quarter Master</option>
                    <option value={pirates.position}>Bootswain</option>
                    <option value={pirates.position}>Powder Monkey</option>
                </select>
                {errors.position ?
                    <p>{errors.position.message}</p>
                    :null
            }
            </p>
            {errors.gear ?
                    <p>{errors.gear.message}</p>
                    :null
            }
            <div className='form-check'>
                <label className="form-check-label" htmlFor='peg'>Peg Leg
                <input className="form-check-input" id='peg' type="checkbox" name='gear0' defaultChecked value={true}  onChange = {(e)=>setGear0(e.target.value)} /></label><br/>

                <label className="form-check-label">Eye Patch
                <input className="form-check-input" type="checkbox" name='gear1' defaultChecked value={true}  onChange = {(e)=>setGear1(e.target.value)} /></label><br/>

                <label className="form-check-label">Hook Hand
                <input className="form-check-input" type="checkbox" name='gear2' defaultChecked value={true}  onChange = {(e)=>setGear2(e.target.value)} /></label><br/>
            </div>
            <button type="submit" className="btn btn-info mt-3">Add Pirate</button>
        </form>
        </>
    )
}

export default UserForm