import { Container, Form, FloatingLabel } from 'react-bootstrap';

import { useState } from 'react';

import DateRangePicker from './../components/DateRangePicker';

const HomePage = () => {

    const [form, setForm] = useState({'input_value': '', 'cities': []});

    async function cityFilter(value) {
        setForm({...form, ['input_value']: value });

        // value can't be an empty string so the else can reset the list
        // typeof has to be string bc after the user clicks a value in the
        // dropdown the value will be of type list and we can't query using a list
        if (value !== '' && typeof value === typeof 'String') {
            const response = await fetch("http://127.0.0.1:8000/api/fetch-cities/", {
                                             method: "POST",
                                             headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ 'search_query': value })})

            const data = await response.json();
            // set cities
            form['cities'].splice(0, form['cities'].length, ...data);

        } else {
            // reset cities
            form['cities'].length = 0;
        }

    }



    return (
        <div>
            <Container>
                <h1 className="component-headers">Book Now!!!</h1>

                <Form className="formSubmission">

                {/* a form that handles the user's username and password */}
                <Form.Group controlId='username_group'>

                    <FloatingLabel
                        controlId="location"
                        label="Where to?"
                        className="mb-3"
                    >
                        <Form.Control
                            htmlFor="location"
                            type='text'
                            value={form.input_value}
                            onChange={(e) => cityFilter(e.target.value)}
                            placeholder="Where to?"
                        ></Form.Control>
                    </FloatingLabel>
                    {/* iterate through the returned results */}
                    {form.cities.length > 0 && (
                        <ul className="close-matches">
                            {form.cities.map((city, index) => (
                                <li key={index}
                                    onClick={(e) => cityFilter(city)}
                                >
                                    {city}
                                </li>
                            ))}
                        </ul>
                    )}

                    <DateRangePicker />
                </Form.Group>
                </Form>
            </Container>
        </div>
    );
};

export default HomePage;