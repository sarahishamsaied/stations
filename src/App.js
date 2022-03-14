import logo from './logo.svg';
import './App.css';
import {Fragment} from 'react'
import NavBar from './Components/Navbar/NavBar';
import {UserContextProvider} from './Context/User.context';
import RideDetails from './Components/Ride/RideDetails';
import RidesContainer from './Components/RidesContainer/RidesContainer';
import { Container } from 'react-bootstrap';
import { RidesContextProvider } from './Context/Rides.Context';
function App() {
  return <Fragment>
    <UserContextProvider>
      <NavBar/>
    <Container>
    <RidesContainer/>
    </Container>
    </UserContextProvider>
  </Fragment>
}

export default App;
