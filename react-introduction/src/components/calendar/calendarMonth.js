import React from 'react';
import CalendarDay from './CalendarDay';

class CalendarMonth extends React.Component {
    render() {
        const days = [];
        for (let i = 0; i < this.props.startWeekDay; i++) {
            days.push(<CalendarDay />)
        }
        let nextSunday = 5;
        for (let i = 1; i < this.props.numberOfDays+1; i++) {
            if (i == nextSunday) {
                days.push(<CalendarDay day={i} isSunday={true} />)
                nextSunday += 7;
            } else {
                days.push(<CalendarDay day={i} />)
            }
        }
        return <div className='calendar-month box'>{days}</div>;
    }
}
export default CalendarMonth

