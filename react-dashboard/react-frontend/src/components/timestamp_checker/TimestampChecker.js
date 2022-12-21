import { useState, useEffect } from 'react';

const axios = require("axios");
const TimestampChecker = (props) => {
    const [time, setTime] = useState(undefined);

    useEffect(() => {
        axios.get("http://time.akamai.com").then((response) => {
            if (props.formatDate) {
                setTime(new Date(response.data * 1000).toLocaleString());
            } else {
                setTime(response.data);
            }
        });
    });

    return (
        <div data-cy="timestampChecker">
            <p data-cy="title">Este es el timestamp según Akamai:</p>
            <p data-cy="timestamp">{time}</p>
        </div>
    );
};
export default TimestampChecker;

