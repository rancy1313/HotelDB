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
        console.log(HOTEL_ID);
        navigate(`view-hotel/${HOTEL_ID}`);
    }

    return (
        <Container>
            <h1 className="component-headers">Results</h1>

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
                {searchResults.map((result, index) => (
                    <div key={ index }>
                        {
                            searchBy === "All" ? (
                                <Card style={{ width: '22rem'}}>
                                    <Card.Body>
                                        <Card.Title>{result.HOTEL_NAME}</Card.Title>
                                        <Card.Text>Location: {result.HOTEL_CITY}, {result.HOTEL_STATE}. Rating: {Math.round(result.RATING * 10) / 10}</Card.Text>
                                        <Button
                                            variant="info"
                                            onClick={(e) => viewHotel(result.HOTEL_ID)}
                                        >More Info</Button>
                                    </Card.Body>
                                </Card>
                            ) : searchBy === "Name" && result.IS_LIKE_SEARCH_NAME === 1 ? (
                                <Card style={{ width: '22rem'}}>
                                    <Card.Body>
                                        <Card.Title>{result.HOTEL_NAME}</Card.Title>
                                        <Card.Text>Location: {result.HOTEL_CITY}, {result.HOTEL_STATE}. Rating: {Math.round(result.RATING * 10) / 10}</Card.Text>
                                        <Button
                                            variant="info"
                                        >More Info</Button>
                                    </Card.Body>
                                </Card>
                            ) : searchBy === "City" && result.IS_LIKE_SEARCH_CITY === 1 ? (
                                <Card style={{ width: '22rem'}}>
                                    <Card.Body>
                                        <Card.Title>{result.HOTEL_NAME}</Card.Title>
                                        <Card.Text>Location: {result.HOTEL_CITY}, {result.HOTEL_STATE}. Rating: {Math.round(result.RATING * 10) / 10}</Card.Text>
                                        <Button
                                            variant="info"
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