'use client';

import { useState, useEffect } from 'react';
import './DatePicker.scss';
import { useLanguage } from '@/contexts/LanguageContext';

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
  onClose: () => void;
  selectedDate: Date | null;
}

export default function DatePicker({ onDateSelect, onClose, selectedDate }: DatePickerProps) {
  const { language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(selectedDate);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { month: 'long', year: 'numeric' });
  };

  const getDayName = (dayIndex: number) => {
    const days = language === 'vi' ? ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayIndex];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate.getTime() === today.getTime();
  };

  const isSelected = (date: Date) => {
    return selectedDay && date.toDateString() === selectedDay.toDateString();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDayClick = (date: Date) => {
    if (!isPast(date)) {
      setSelectedDay(date);
      // Remove the immediate onDateSelect call - only update internal state
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="date-picker-overlay" onClick={onClose}>
      <div className="date-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="date-picker-header">
          <button 
            type="button" 
            className="nav-button" 
            onClick={previousMonth}
          >
            ‹
          </button>
          <h3 className="month-year">{getMonthName(currentDate)}</h3>
          <button 
            type="button" 
            className="nav-button" 
            onClick={nextMonth}
          >
            ›
          </button>
        </div>
        
        <div className="date-picker-body">
          <div className="weekdays">
            {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
              <div key={dayIndex} className="weekday">
                {getDayName(dayIndex)}
              </div>
            ))}
          </div>
          
          <div className="days-grid">
            {days.map((day, index) => (
              <div
                key={index}
                className={`day-cell ${!day ? 'empty' : ''} ${day && isToday(day) ? 'today' : ''} ${day && isSelected(day) ? 'selected' : ''} ${day && isPast(day) ? 'past' : ''}`}
                onClick={() => day && handleDayClick(day)}
              >
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
        </div>
        
        <div className="date-picker-footer">
          <button 
            type="button" 
            className="cancel-button" 
            onClick={onClose}
          >
            {language === 'vi' ? 'Hủy' : 'Cancel'}
          </button>
          <button 
            type="button" 
            className="confirm-button" 
            onClick={() => {
              if (selectedDay) {
                onDateSelect(selectedDay);
              }
              onClose();
            }}
            disabled={!selectedDay}
          >
            {language === 'vi' ? 'Xác nhận' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
} 