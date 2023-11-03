import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { Container, Card } from 'react-bootstrap';

const ViewHotel = () => {

    // retrieve hotel id for the hotel the user is trying to view its info for
    let { HOTEL_ID } = useParams();

    const [hotel, setHotel] = useState({});

    async function fetchHotelInfo() {
        const response = await fetch("http://127.0.0.1:8000/api/get-hotel/", {
                                         method: "POST",
                                         headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ 'search_query': HOTEL_ID })});
        if (response.ok) {
            const data = await response.json();
            setHotel(data);
        }

    }

    // fetch hotel info on render
    useEffect(() => {
        fetchHotelInfo();
    }, [HOTEL_ID])

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>{hotel.HOTEL_NAME}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {hotel.HOTEL_CITY}, {hotel.HOTEL_STATE} {hotel.HOTEL_ZIP}
                    </Card.Subtitle>
                    <Card.Text>{hotel.HOTEL_ADDRESS}</Card.Text>
                    <Card.Text>Phone: {hotel.HOTEL_PHONE_NUMBER}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );

};

export default ViewHotel;