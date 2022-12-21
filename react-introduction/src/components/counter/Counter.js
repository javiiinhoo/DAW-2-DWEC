import React from 'react';
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
        this.increaseValue = this.increaseValue.bind(this);
    }
    increaseValue() {
        this.setState((oldState) => (
            {
                value: oldState.value + 1
            }
        ));
    }
    render() {
        return (
            <div>
                <p>Número: {this.state.value}</p>

                <button data-cy='issue11button' onClick={this.increaseValue}>Contar</button>
            </div>
        );
    }
}
export default Counter;