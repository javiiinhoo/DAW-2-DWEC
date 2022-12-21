import React from 'react';
import AttendanceControlRow from './AttendanceControlRow'

function rows() {
  var filas = []
  for (var i = 0; i < 5; i++) {
    var hs = Math.floor(Math.random() * 24);
    var ms = Math.floor(Math.random() * 60);
    if (ms < 10) {
      ms = "0" + ms;
    }

    var he = Math.floor(Math.random() * 24);
    var me = Math.floor(Math.random() * 60);
    if (me < 10) {
      me = "0" + me;
    }
    filas.push(<AttendanceControlRow exitHour={he}
      exitMinute={ms} entranceHour={he} entranceMinute={me} />)
  }
  return filas;
}

class AttendanceControlTable extends React.Component {

  render() {
    return (<table>
      <thead>
        <tr>
          <th>
            HORA DE ENTRADA
          </th>
          <th>
            HORA DE SALIDA
          </th>
          <th>
            MINUTOS
          </th>
        </tr>
      </thead>
      <tbody>
        {rows()}
      </tbody>
    </table>
    );
  }
}
export default AttendanceControlTable;