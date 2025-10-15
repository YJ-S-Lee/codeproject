import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CartComponent from '../component/menus/CartComponent';

const AppLayout = () => {
  const loginState = useSelector(state => state.loginSlice)
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">ReactApiSpring</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about">about</Nav.Link>
              {loginState.email ? 
                <>
                <NavDropdown title="todo" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/todo/add">add</NavDropdown.Item>
                  <NavDropdown.Item href="/todo/list">list</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="products" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/products/add">add</NavDropdown.Item>
                  <NavDropdown.Item href="/products/list">list</NavDropdown.Item>
                </NavDropdown>
                </>
                : <></>
              }
            </Nav>
            <Nav>
              {loginState.email ?
                <Nav.Link href="/member/logout">로그아웃</Nav.Link>
                : <Nav.Link href="/member/login">로그인</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt-5'>
        <Row>
          <Col md={9}><Outlet /></Col>
          <Col md={3} className='border-start'><CartComponent /></Col>
        </Row>
      </Container>
      <div className='bg-body-tertiary border-top mt-5 text-center py-2'>
        ALL RIGHT RESERVED BY © 두드림IT YJ
      </div>
    </div>
  )
}

export default AppLayout