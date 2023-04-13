import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
const UsersList = (props) => {
    const [pirates, setPirates] = useState([])
    const navigate = useNavigate();
    // creates a new react component with two properties key and data. These are supplied with the values of user._links.self.href and user respectively. 
    const users = this.props.users.map(user =>
        <User key={user._links.self.href} data={user}/>
    );
    useEffect(()=>{
        axios.get("http://localhost:8000/api/users")
        .then((res)=>{
            console.log(res.data);
            setPirates(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])
    const removeFromDom = (pirateId) =>{
        axios.delete(`http://localhost:8000/api/users/delete/${pirateId}`)
        .then((res)=>{
          console.log(res);
          console.log(res.data);
          setPirates(pirates.filter(pirate=>pirate._id !== pirateId));
        }).catch((err)=>console.log(err))
      }
    const deletePirate = (pirateId)=>{
        axios.delete(`http://localhost:8000/api/users/delete/${pirateId}`)
        .then((res) => {
            removeFromDom(pirateId)
            console.log("Pirate Delete Successful")
            navigate("/pirates");
        })
        .catch((err) => console.log(err))
    }
    const cards = {
        border: '3px solid black',
        borderRadius:'35px',
        backgroundColor: 'coral',
        width:'90vw',
        margin:'40px',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
    }
    const nav = {
        border: '5px solid black',
        backgroundColor: 'brown',
        
    }
    const button={
        border:'3px solid green',
        color:'white',
        backgroundColor:'blue'
    }
    return (
        <>
        <nav className='navbar' style={nav}>
            <h3>Pirate Crew</h3>
            <Link to={`/`} style={button}>Add a Pirate</Link>
        </nav>
        <div>
            {
                pirates.map((pirates, index)=>{
                return (<div key={index} style={cards}>
                            <h2 >{pirates.firstName}</h2>
                            <img  src={pirates.image} alt='Pirate Picture Here' height='100' width='200'></img>
                            <Link to={`/pirates/${pirates._id}`} style={button}>{pirates.firstName}'s Page! </Link> 
                            <button  className="btn btn-danger" onClick={(e)=>{deletePirate(pirates._id)}} >Walk the plank mate!</button>
                        </div>)
                })
            }
        </div>
        </>
    )
}
export default UsersList;