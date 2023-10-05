import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../ReduxStore/Auth";
import { useNavigate } from "react-router-dom";


function NavbarFun() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const toggle = useSelector((state) => state.theme.toggle);
  function logoutFun() {
    dispatch(authActions.logout());
    navigate("/login");
  }
  return (
    <div id="dark">
    <Navbar
      expand="lg"
      bg={toggle ? "dark" : "light"}
      variant={toggle ? "dark" : "light"}
    >
      <Container>
        <Navbar.Brand href="#home">Authentication</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Button variant="primary" type="submit" onClick={logoutFun}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  );
}

export default NavbarFun;