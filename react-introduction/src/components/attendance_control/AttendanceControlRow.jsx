import React from 'react';
function diferencia(props) {
    if (props !== undefined) {
        if (((props.exitHour - props.entranceHour) * 60) + (props.exitMinute - props.entranceMinute) < 0) {
            return "INCORRECTO";
        } else {
            return ((props.exitHour - props.entranceHour) * 60) + (props.exitMinute - props.entranceMinute);
        }
    }
}
class AttendanceControlRow extends React.Component {

    render() {
        return (
            <tr>
                <td>{this.props.entranceHour + ":" + this.props.entranceMinute} </td>
                <td>{this.props.exitHour + ":" + this.props.exitMinute} </td>
                <td>{diferencia(this.props)}</td>
            </tr>
        );
    }
}
export default AttendanceControlRow;