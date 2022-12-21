import React from 'react';
class SimpleMessagesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                { message: "Aquí estamos", key: "1" },
                { message: "Vamos a triunfar", key: "2" },
            ]
        }
    }


    render() {
        return (
            <ul>
                {this.state.messages.map(object => <li key={object.key} >{object.message}</li>)}
            </ul>
        );
    }
}


export default SimpleMessagesList;


