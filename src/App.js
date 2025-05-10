import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div style={{ display: 'flex', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '240px', padding: '20px', flex: 1 }}>
        <Calendar />
      </div>
    </div>
  );
}

export default App;
