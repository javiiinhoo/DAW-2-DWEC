import React from 'react';
import './calendar.css';
class CalendarDay extends React.Component {
    render() {
        if (this.props.isSunday) {
            return <div className='child sunday'>{this.props.day}</div>
        } else {
            return <div className='child'>{this.props.day}</div>
        }
    }
}
export default CalendarDay;

