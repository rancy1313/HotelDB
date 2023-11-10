import HomePage from './HomePage';

import { useLocation, useNavigate } from 'react-router-dom';

import { Container, Card, Button } from 'react-bootstrap';

import { useState, useEffect } from 'react';

const SearchResults = () => {

    let navigate = useNavigate();

    // used to fetch the search results and display them on this component
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    const [searchBy, setSearchBy] = useState("All");

    // everytime there is a new search we set to search by all to view all the results
    useEffect(() => {
        setSearchBy("All");
    }, [searchResults]);

    function viewHotel(HOTEL_ID) {
        navigate(`view-hotel/${HOTEL_ID}`);
    }

    return (
        <Container>
            <h1 className="component-headers">Results Found: { searchResults.length }</h1>

            <div id="search-buttons-div">
                <Button
                    variant="primary"
                    onClick={(e) => setSearchBy("All")}
                >ALL</Button>
                <Button
                    variant="secondary"
                    onClick={(e) => setSearchBy("Name")}
                >Name</Button>
                <Button
                    variant="secondary"
                    onClick={(e) => setSearchBy("City")}
                >City</Button>
            </div>
            <ul>
                {searchResults.map((hotel, index) => (
                    <div key={ index }>
                        {
                            searchBy === "All" ? (
                                <Card style={{ width: '30rem'}}>
                                    <Card.Body>
                                        <Card.Title>{hotel.HOTEL_NAME}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {hotel.HOTEL_ADDRESS} {hotel.HOTEL_CITY}, {hotel.HOTEL_STATE} {hotel.HOTEL_ZIP}
                                        </Card.Subtitle>
                                        <Card.Text>Rating: {Math.round(hotel.RATING * 10) / 10}</Card.Text>
                                        <Card.Text>Phone: {hotel.HOTEL_PHONE_NUMBER}</Card.Text>
                                        <Button
                                            variant="info"
                                            onClick={(e) => viewHotel(hotel.HOTEL_ID)}
                                        >More Info</Button>
                                    </Card.Body>
                                </Card>
                            ) : searchBy === "Name" && hotel.IS_LIKE_SEARCH_NAME === 1 ? (
                                <Card style={{ width: '30rem'}}>
                                    <Card.Body>
                                        <Card.Title>{hotel.HOTEL_NAME}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {hotel.HOTEL_ADDRESS} {hotel.HOTEL_CITY}, {hotel.HOTEL_STATE} {hotel.HOTEL_ZIP}
                                        </Card.Subtitle>
                                        <Card.Text>Rating: {Math.round(hotel.RATING * 10) / 10}</Card.Text>
                                        <Card.Text>Phone: {hotel.HOTEL_PHONE_NUMBER}</Card.Text>
                                        <Button
                                            variant="info"
                                            onClick={(e) => viewHotel(hotel.HOTEL_ID)}
                                        >More Info</Button>
                                    </Card.Body>
                                </Card>
                            ) : searchBy === "City" && hotel.IS_LIKE_SEARCH_CITY === 1 ? (
                                <Card style={{ width: '30rem'}}>
                                    <Card.Body>
                                        <Card.Title>{hotel.HOTEL_NAME}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {hotel.HOTEL_ADDRESS} {hotel.HOTEL_CITY}, {hotel.HOTEL_STATE} {hotel.HOTEL_ZIP}
                                        </Card.Subtitle>
                                        <Card.Text>Rating: {Math.round(hotel.RATING * 10) / 10}</Card.Text>
                                        <Card.Text>Phone: {hotel.HOTEL_PHONE_NUMBER}</Card.Text>
                                        <Button
                                            variant="info"
                                            onClick={(e) => viewHotel(hotel.HOTEL_ID)}
                                        >More Info</Button>
                                    </Card.Body>
                                </Card>
                            ) : null
                        }
                    </div>
                ))}
            </ul>

        </Container>
    );
};

export default SearchResults;