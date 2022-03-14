import React, { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,Container,Nav} from 'react-bootstrap'
import style from '../Navbar/NavBar.module.css'
import { useUser } from '../../Context/User.context'
export default function NavBar() {
    const {user} = useUser()
    console.log(user)
  return <Fragment>
   <Navbar bg="dark" variant="dark" className={style.navbar}>
    <Container>
    <Nav className="me-auto">
      <Nav.Link href="#home" className='text-white'>Edvora</Nav.Link>
    </Nav>
    <Nav className="ml-auto">
    <Nav.Link href="#home" className='text-white'>
        <h4 className='mt-3'>{user.name}</h4>
    </Nav.Link>
      <Nav.Link href="#home" className='text-white'>
          <img src={user.url} className = {style.userImg}alt="" />
    </Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  </Fragment>
}
