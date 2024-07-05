import React, { useState } from 'react';
import Day from '../Day/Day';
import { getDaysInMonth, getMonthName } from '../../functions/getDaysInMonth';
import './Calendar.css'

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const monthName = getMonthName(currentDate.getMonth());

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button className='calendar-handleBtn' onClick={handlePrevMonth}>&lt;</button>
                <h2>{`${monthName} ${currentDate.getFullYear()}`}</h2>
                <button className='calendar-handleBtn' onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="calendar">
                {days.map((day) => (
                    <Day key={day} day={day} month={currentDate.getMonth()} year={currentDate.getFullYear()} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;

