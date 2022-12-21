import React from "react";

class BestCounter extends React.Component {
	constructor(props) {
		super(props);
		if (this.props.startValue) {
			this.state = { value: this.props.startValue };
		} else {
			this.state = { value: 0 };
		}
		this.increaseValue = this.increaseValue.bind(this);
		this.decreaseValue = this.decreaseValue.bind(this);
	}

	increaseValue() {
		if (this.props.maxValue > this.state.value) {
			this.setState((oldState) => ({
				value: oldState.value + 1,
			}));
		}
	}

	decreaseValue() {
		if (this.state.value > this.props.minValue) {
			this.setState((oldState) => ({
				value: oldState.value - 1,
			}));
		}
	}

	render() {
		return (
			<div>
				<p>Número: {this.state.value}</p>
				<button data-cy="increaseButton" onClick={this.increaseValue} disabled={this.state.value === this.props.maxValue}>
					Contar
				</button>
				<button data-cy="decreaseButton" onClick={this.decreaseValue} disabled={this.state.value === this.props.minValue}>
					Descontar
				</button>
			</div>
		);
	}
}

export default BestCounter;