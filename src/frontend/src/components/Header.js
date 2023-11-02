import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { Button, Container, Form, Navbar, Nav } from 'react-bootstrap';

const Header = () => {

    let navigate = useNavigate();

    const [form, setForm] = useState({'search_field_value': ''});

    async function submitSearchData() {

        const response = await fetch("http://127.0.0.1:8000/api/hotel-search/", {
                                         method: "POST",
                                         headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ 'search_query': form.search_field_value })})


        if (response.ok) {
            const data = await response.json();

            // reset search field
            setForm({ search_field_value: '' });

            // Redirect to the results page with the search results
            navigate('/search-results', { state: { searchResults: data } });

        } else {
            console.log('handle this error')
        }

    }

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
                        <Form className="d-flex">
                            <Form.Control
                                placeholder="Search Hotels"
                                value={form.search_field_value}
                                onChange={(e) => setForm({ search_field_value: e.target.value })}
                            ></Form.Control>
                            <Button
                                variant="success"
                                onClick={submitSearchData}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;