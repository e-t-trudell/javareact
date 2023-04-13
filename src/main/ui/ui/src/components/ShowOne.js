import { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams,useNavigate, Link} from "react-router-dom";
const ShowOne = (props) => {
    // match the model for the pirates details
    const [pirates, setPirates] = useState({firstName:'', type:'', description:'',skills1:'', skills2:'', skills3:''})
    const {id} = useParams(); 
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
        .then( (res) => {
            console.log("Show me one pirate!");
            console.log(res.data);
            setPirates(res.data);
            })
        .catch( (err) => console.log(err) );
    }, []);
    
    const deletePirate = (pirateId)=>{
        console.log('deleting')
        axios.delete(`http://localhost:8000/api/pirates/delete/${pirateId}`)
        .then((res) => {
            console.log("Pirate delete successful");
            navigate("/pirates");
        })
        .catch((err) => console.log(err))
    }
    // Styled components
    const nav = {
        border: '5px solid black',
        backgroundColor: 'brown',
        
    }
    const body={
        backgroundColor:'orange',
        height:'100vh'
    }
    const about={
        backgroundColor:'white',
        
    }
    const button={
        border:'3px solid green',
        color:'white',
        backgroundColor:'blue'
    }
    return (
        <>
             <div className='navbar' style={nav}>
                <h2>{pirates.firstName}</h2> 
                <Link to={`/pirates`} style={button}>Home</Link> 
                <button className="btn btn-danger" onClick={(e)=>{deletePirate(pirates._id)}}>Sink Ship </button> 
            </div>
            <div className='row align-items-center' style={body}>
                <div className="col-6 mx-auto m-3 p-5">
                    <img src={pirates.image} alt='Pirate Picture Here' height='200' width='200'></img>
                    <h1>'{pirates.catchPhrase}.'</h1><br/>
                </div>
                <div className='col-6 mr-3 border border-primary' style={about}>
                    <h2>About</h2>
                    <p>Position: {pirates.position} </p><br/>
                    <p>Treasures: {pirates.treasureChests} </p><br/>
                    <p>Peg Leg: {String(pirates.gear0)} </p><br/>
                    <p>Eye Patch: {String(pirates.gear1)} </p><br/>
                    <p>Hook Hand: {String(pirates.gear2)} </p><br/>
                </div>
            </div>
            
            
        </>
    );

}
export default ShowOne; 