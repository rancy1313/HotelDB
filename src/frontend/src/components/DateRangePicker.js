import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = () => {
    // date range values
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // get current date to set the min date for the start date
    const currentDate = new Date();


    // date range setter functions
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    return (
        <div>
            <div>
                <label>Check-In Date: </label>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="MM/dd/yyyy"
                    minDate={currentDate}
                />
            </div>
            <div>
                <label>Check-Out Date: </label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="MM/dd/yyyy"
                />
            </div>
        </div>
    );
}


export default DateRangePicker;