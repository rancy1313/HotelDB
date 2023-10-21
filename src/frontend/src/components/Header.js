import { Link, useLocation } from 'react-router-dom';

import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {

    // Get the current route using React Router's useLocation
    const location = useLocation();

    // Define the links and their corresponding paths
    const navLinks = [
        { text: 'Home', path: '/' },
    ];

    return (
        <div>
            {/* Navbar to display links based on if a user is logged in */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">My Hotel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {navLinks.map((link, index) => (
                                // Render the link if the path doesn't match the current location
                                location.pathname !== link.path && (
                                    <Nav.Link key={index} as={Link} to={link.path}>{link.text}</Nav.Link>
                                )
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;