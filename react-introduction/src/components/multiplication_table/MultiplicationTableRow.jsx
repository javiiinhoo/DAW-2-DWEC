import React from 'react';

class MultiplicationTableRow extends React.Component {

    render() {

        return (
            <tr>
                <td>{this.props.firstOperand}</td>
                <td>{this.props.secondOperand}</td>
                <td>{this.props.firstOperand * this.props.secondOperand}</td>
            </tr>);
    }
}

export default MultiplicationTableRow;