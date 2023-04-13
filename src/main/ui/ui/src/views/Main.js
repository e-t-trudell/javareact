import {useState} from 'react'
import UserForm from '../components/UserForm';
// import PirateList from '../components/PirateList';

const Main = (props) => {
    const [pirates, setPirates] = useState([])
    return (
    <div>
        <UserForm pirates={pirates} setPirates={setPirates}/>
        {/* <hr/>
        <PirateList pirates={pirates} setPirates={setPirates}/> */}
    </div>
    )
}
export default Main