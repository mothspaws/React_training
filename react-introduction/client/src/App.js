import './App.css';
import React, { useContext } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from "./components/UserProvider.js";

function App() {
  // user context
  const { user, users, changeUser } = useContext(UserContext);

  // navigation
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            Kuchařka
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Kuchařka
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={() => navigate("/")}>
                  Domů
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/recipeList")}>
                  Recepty
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/recipeDetail")}>
                  Detail receptu
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/ingredientList")}>
                  Ingredience
                </Nav.Link>
                <NavDropdown align="end" title={user.fullName ?? 'Nepřihlášen'}>
                  {users.map(user => {
                    return (
                      <NavDropdown.Item key={user.id} onClick={() => changeUser(user.id)}>
                        {user.fullName} ({user.role})
                      </NavDropdown.Item>
                    );
                  })}
                  <NavDropdown.Item onClick={() => changeUser(-1)}>
                    Odhlásit se
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;