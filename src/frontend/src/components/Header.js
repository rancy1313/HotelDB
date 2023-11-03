import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import { Button, Container, Form, Navbar, Nav, Card } from 'react-bootstrap';

const Header = () => {

    let navigate = useNavigate();

    const [form, setForm] = useState({'search_field_value': ''});

    const [closeMatches, setCloseMatches] = useState([]);

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

    async function closeMatch(value) {

        setForm({ 'search_field_value': value });

        if (value !== '') {
            const response = await fetch("http://127.0.0.1:8000/api/hotel-search/", {
                                             method: "POST",
                                             headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ 'search_query': value })})

            const data = await response.json();

            // top five hotels are just the first ones to match the value pattern
            const top_five_hotels = data.splice(0, 5);
            console.log(top_five_hotels);
            setCloseMatches(top_five_hotels);

        } else {
            setCloseMatches([]);
        }
    }

    function viewHotel(HOTEL_ID) {
        // reset the search bar fields
        setForm({ search_field_value: '' });
        setCloseMatches([]);

        navigate(`search-results/view-hotel/${HOTEL_ID}`);
    }

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
                        <div>
                            <Form className="d-flex">
                                <Form.Control
                                    placeholder="Search Hotels"
                                    value={form.search_field_value}
                                    onChange={(e) => closeMatch(e.target.value)}
                                ></Form.Control>
                                <Button
                                    variant="success"
                                    onClick={submitSearchData}>Search</Button>
                            </Form>
                            {closeMatches.length > 0 && (
                                <ul className="close-matches">
                                    {closeMatches.map((hotel, index) => (
                                        <li key={index}
                                            onClick={(e) => viewHotel(hotel.HOTEL_ID)}
                                        >
                                            {hotel.HOTEL_NAME}, {hotel.HOTEL_CITY} {hotel.HOTEL_STATE}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;