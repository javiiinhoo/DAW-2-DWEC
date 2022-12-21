import React from 'react';

class SimpleTable extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th >Oferta de empleo</th>
                        <th >Salario anual</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Desarrollador React</td>
                        <td>77507</td>
                    </tr>
                    <tr>
                        <td>Desarrollador iOS</td>
                        <td>42574</td>
                    </tr>
                    <tr>
                        <td>Desarrollador Android</td>
                        <td>29516</td>
                    </tr>
                </tbody>
            </table>

        );
    }

}

export default SimpleTable;
