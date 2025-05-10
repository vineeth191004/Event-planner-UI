import React, { useState, useEffect } from 'react';
import './calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', time: '', duration: '', type: 'default' });
  const [view, setView] = useState('month');

  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to load events:', err));
  }, []);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isToday = (date) => isSameDay(new Date(), date);

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const handleSaveEvent = () => {
    const newEvent = {
      ...formData,
      date: selectedDate.toISOString().split('T')[0]
    };
    setEvents([...events, newEvent]);
    setFormData({ title: '', time: '', duration: '', type: 'default' });
    setShowForm(false);
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const renderDateCell = (date) => {
    const dateEvents = getEventsForDate(date);
    return (
      <div
        className={`calendar-cell ${isToday(date) ? 'today' : ''}`}
        onClick={() => {
          setSelectedDate(date);
          setShowForm(true);
        }}
      >
        <div className="cell-date">{date.getDate()}</div>
        {dateEvents.map((event, idx) => (
          <div
            className={`calendar-event ${event.type}`}
            key={idx}
            title={`Time: ${event.time}, Duration: ${event.duration}`}
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  const renderMonthView = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = endOfMonth.getDate();
    const startDay = startOfMonth.getDay();

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const cells = [];
    for (let i = 0; i < startDay; i++) {
      cells.push(<div className="calendar-cell empty" key={`empty-${i}`}></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      cells.push(<div key={day}>{renderDateCell(date)}</div>);
    }

    return (
      <>
        <div className="calendar-header">
          <h2>{monthName} {year}</h2>
          <div className="month-nav">
            <button onClick={() => changeMonth(-1)}>←</button>
            <button onClick={() => changeMonth(1)}>→</button>
          </div>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
            <div className="calendar-day" key={idx}>{day}</div>
          ))}
          {cells}
        </div>
      </>
    );
  };

  const renderWeekView = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    return (
      <div className="calendar-week-view">
        <div className="calendar-header">
          <h2>Week of {weekDays[0].toDateString()}</h2>
        </div>
        {weekDays.map((date, idx) => (
          <div className="week-day" key={idx}>
            <strong>{date.toDateString()}</strong>
            {renderDateCell(date)}
          </div>
        ))}
      </div>
    );
  };

  const renderDayView = () => {
    const today = new Date();
    return (
      <div className="calendar-day-view">
        <div className="calendar-header">
          <h2>{today.toDateString()}</h2>
        </div>
        {renderDateCell(today)}
      </div>
    );
  };

  const renderYearView = () => {
    return (
      <div className="calendar-year-view">
        <div className="calendar-header">
          <h2>{currentDate.getFullYear()}</h2>
        </div>
        {Array.from({ length: 12 }, (_, i) => {
          const monthDate = new Date(currentDate.getFullYear(), i, 1);
          const monthEvents = events.filter(e => new Date(e.date).getMonth() === i);
          return (
            <div
              className="year-month"
              key={i}
              onClick={() => {
                setCurrentDate(new Date(currentDate.getFullYear(), i, 1));
                setView('month');
              }}
            >
              <strong>{monthDate.toLocaleString('default', { month: 'long' })}</strong><br />
              {monthEvents.length} events
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="sidebar">
        <h2>Vineeth Calendar</h2>
        <div className="sidebar-item">Events</div>
        <div className="sidebar-item">Programs</div>
        <div className="sidebar-item">Memberships</div>
        <div className="sidebar-item">Documents</div>
        <div className="sidebar-item">Payments</div>
        <div className="sidebar-item">People</div>
        <div className="sidebar-item">Communication</div>
        <div className="sidebar-item">Notifications</div>
        <div className="sidebar-item">Search</div>
      </div>

      <div className="calendar-content">
        <div className="calendar-tabs">
          {['year', 'month', 'week', 'day'].map(tab => (
            <span
              key={tab}
              className={view === tab ? 'tab-active' : ''}
              onClick={() => setView(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </span>
          ))}
        </div>

        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
        {view === 'year' && renderYearView()}

        {showForm && selectedDate && (
          <div className="event-form-overlay">
            <div className="event-form">
              <h3>Schedule Event - {selectedDate.toDateString()}</h3>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
              <input
                type="text"
                placeholder="Duration (e.g., 1h)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="default">Default</option>
                <option value="meeting">Meeting</option>
                <option value="training">Training</option>
              </select>
              <div className="form-buttons">
                <button onClick={handleSaveEvent}>Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;