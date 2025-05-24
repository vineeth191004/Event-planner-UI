# 📅 Vineeth Calendar App

A custom, responsive calendar application built with React, allowing users to view, add, and manage events in **Year**, **Month**, **Week**, and **Day** views. The UI includes a sidebar for quick navigation and supports styled event categories like meetings and trainings.

---

## 🚀 Features

- 📅 Month, Week, Day, and Year views
- 🧠 Intuitive event creation with modal form
- 🎨 Styled event categories (Meeting, Training, Default)
- 🔁 Navigation between months
- 🧭 Sidebar with organizational categories
- 🎯 Current day highlighting
- 🔍 Shows events specific to selected views
- 🌐 Loads events from `events.json`

---

## 🧱 Project Structure

```

vineeth-calendar/
│
├── public/
│   └── events.json               # Static JSON file with initial events
│
├── src/
│   ├── components/
│   │   ├── Calendar.jsx          # Main calendar logic and UI
│   │   ├── Calendar.css          # Styles for calendar layout and events
│   │   ├── Sidebar.jsx           # Left sidebar navigation panel
│   │   └── Sidebar.css           # Styles for the sidebar
│
│   ├── App.js                    # Renders Calendar and Sidebar
│   └── index.js                  # React root entry point
│
├── package.json
└── README.md                    # This file

````

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/vineeth191004/Event-planner-UI.git
cd vineeth-calendar

# Install dependencies
npm install

# Start the development server
npm start
````

Your app will be running at `http://localhost:3000`.

---

## 📝 Usage

* Click on a day to add an event
* Use the top tabs to switch between views: Year | Month | Week | Day
* Events will display according to the selected view
* Sidebar is for future enhancements like filtering or categorization

---

## 📁 Sample `events.json`

```json
[
  {
    "title": "Meeting with Bob",
    "date": "2025-05-10",
    "time": "10:00",
    "duration": "1h",
    "type": "meeting"
  },
  {
    "title": "Project Kickoff - Apollo",
    "date": "2025-05-13",
    "time": "09:00",
    "duration": "2h",
    "type": "training"
  }
]
```

---

## 🎨 Styling Notes

* `Calendar.css`: Handles layout for month grid, event boxes, hover, today highlights
* `Sidebar.css`: Handles left panel with navigation categories
* You can expand with themes, dark mode, or category filters

---


