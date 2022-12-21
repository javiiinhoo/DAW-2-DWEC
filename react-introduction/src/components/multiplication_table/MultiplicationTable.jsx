import React from 'react';
import MultiplicationTableRow from './MultiplicationTableRow';

class MultiplicationTable extends React.Component {

    render() {
        const rows = [];
        function filas(number) {
            for (let i = 1; i <= 10; i++) {
                rows.push(<MultiplicationTableRow firstOperand={number} secondOperand={i} />);
            }
        }
        filas(this.props.number);
        return (
            <table>
                <thead>
                    <tr>
                        <th>PRIMER OPERANDO</th>
                        <th>SEGUNDO OPERANDO</th>
                        <th>RESULTADO</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );

    }
}

export default MultiplicationTable;