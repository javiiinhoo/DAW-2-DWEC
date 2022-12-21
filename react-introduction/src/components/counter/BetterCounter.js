import React from 'react';
class BetterCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.startValue ?? 0};
        this.increaseValue = this.increaseValue.bind(this);
        this.decreaseValue = this.decreaseValue.bind(this);
    }
    increaseValue() {
        this.setState((oldState) => (
            {
                value: oldState.value + 1
            }
        ));
    }
    decreaseValue() {
        this.setState((oldState) => (
            {
                value: oldState.value - 1
            }
        ));
    }
    render() {
        return (
            <div>
                <p>Número: {this.state.value}</p>
                <button data-cy='increaseButton' onClick={this.increaseValue}>Contar</button>
                <button data-cy='decreaseButton' onClick={this.decreaseValue}>Descontar</button>
            </div>
        );
    }
}
export default BetterCounter;