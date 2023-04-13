
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
// import React = require('react');
import client from 'client';
import Main from './views/Main';
import ShowOne from './components/ShowOne';
import Update from './components/Update';
import UsersList from './components/UsersList';



// FUNCTIONAL COMPONENT - accepts props as an argument and returns a react element
function App () {
  ReactDom.render(
    <App />,
    document.getElementById('react')
  )
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* User form lives in Main */}
          <Route path='/' default element={<Main/>}/>
          <Route  path="/api/users/:id" element={<ShowOne/>}/>
          <Route  path="/api/users" element={<UsersList/>}/>
          <Route path='/pirates/edit/:id' element={<Update/>} />
          {/* <Route path='*' element={<PageNotFound />} */}
           {/* <EmployeeList employees={this.state.employees}/>   */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

//  CLASS COMPONENT - creates render function to return react element. 
// class App extends React.Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {users: []};
// 	}

// 	componentDidMount() {
// 		client({method: 'GET', path: '/api/users'}).done(response => {
// 			this.setState({users: response.entity._embedded.users});
// 		});
// 	}

// 	render() {
// 		return (
//       <div className="App">
//         <BrowserRouter>
//           <Routes>
//            {/* User form lives in Main */}
//             <Route path='/' default element={<Main/>}/>
//             <Route  path="/pirates/:id" element={<ShowOne/>}/>
//             <Route  path="/pirates" element={<UsersList/>}/>
//             <Route path='/pirates/edit/:id' element={<Update/>} />
//             {/* <EmployeeList employees={this.state.employees}/>   */}
//           </Routes>
//         </BrowserRouter>
//       </div>
// 		)
// 	}
// }