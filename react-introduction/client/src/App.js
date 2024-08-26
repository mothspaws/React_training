import './App.css';
import RecipeBook from './components/RecipeBook';
import RecipeTable from './components/RecipeTable';
import { getRecipes } from './components/api/RecipeApi';
import { useState, useMemo, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
                // Zde bude rozbalovací menu se seznamem tříd
                    <Nav.Link onClick={() => navigate("/recipeList")}>
                      Recepty
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/recipeDetail")}>
                      Detail receptu
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/ingredientList")}>
                      Ingredience
                    </Nav.Link>
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