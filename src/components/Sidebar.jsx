import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">KarateStudio</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">Events</li>
          <li>Programs</li>
          <li>Memberships</li>
          <li>Documents</li>
          <li>Payments</li>
          <li>People</li>
          <li>Communication</li>
          <li>Notifications</li>
          <li>Search</li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div>Elijah Scott</div>
        <div className="email">scotteli@hey.com</div>
      </div>
    </div>
  );
};

export default Sidebar;
