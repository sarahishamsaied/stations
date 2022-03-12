import React, { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,Container} from 'react-bootstrap'
export default function NavBar() {
  return <Fragment>
   <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  </Fragment>
}
