import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// this is did the diffrence i i have use logo inside the img src value.import logo from '../images/logocompany.svg';
// best approceh is follow
import { ReactComponent as Logo } from '../images/logocompany.svg'; // so i can simply use Logo tag in code

const Header = (props) => {
  const { title } = props;
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <Logo width={50} height={50} />
          <span>Image Upload</span>
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
