import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { useTodos } from '../../context/Todo';
import { isDayOff } from '../../functions/isDayOff';
import './Day.css'

interface DayProps {
    day: number;
    month: number;
    year: number;
}

const Day: React.FC<DayProps> = ({ day, month, year }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { todos } = useTodos();
    const date = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsModalOpen(false);
    };

    const dayOff = isDayOff(date);
    const tasksCount = todos[date]?.length;

    return (
        <div className={`day ${dayOff ? 'day-off' : ''}`} onClick={handleOpenModal}>
            <span>{day}</span>
            {tasksCount > 0 && <span className="tasks-count">*</span>}
            {isModalOpen && <Modal date={date} onClose={handleCloseModal} />}
        </div>
    );
};

export default Day;
