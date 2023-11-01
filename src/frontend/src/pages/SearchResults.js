import HomePage from './HomePage';

import { useLocation } from 'react-router-dom';

import { Container, Card, Button } from 'react-bootstrap';

const SearchResults = () => {

    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    console.log(searchResults)

    return (
        <Container>
            <h1>Results</h1>
            <ul>
                {searchResults.map((result, index) => (
                    <Card style={{ width: '22rem'}}>
                        <Card.Body>
                            <Card.Title>{result.hotel_name}</Card.Title>
                            <Card.Text>Location: {result.hotel_location}, {result.hotel_state}. Rating: {Math.round(result.rating * 10) / 10}</Card.Text>
                            <Button variant="info">More Info</Button>
                        </Card.Body>
                    </Card>
                ))}
            </ul>
        </Container>
    );
};

export default SearchResults;