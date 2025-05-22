import { useState } from 'react';
import './App.css';
import PieChart from './PieChart';
import './PieChart.css';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState({});
  const [showChart, setShowChart] = useState(false);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (name.trim() && !students.includes(name.trim())) {
      setStudents([...students, name.trim()]);
      setName('');
    }
  };

  const handleAttendance = (student, status) => {
    setAttendance({ ...attendance, [student]: status });
  };

  const handleComplete = () => {
    setShowChart(true);
  };

  const getPieData = () => {
    const counts = { Present: 0, Absent: 0, Given: 0 };
    students.forEach((s) => {
      counts[attendance[s]] = (counts[attendance[s]] || 0) + 1;
    });
    return counts;
  };

  return (
    <div className="main-bg">
      <header className="header text-center py-4 mb-4">
        <h1 className="display-5 fw-bold">Class Attendance Dashboard</h1>
        <p className="lead">Track, manage, and visualize your class attendance easily</p>
      </header>
      <div className="container-fluid">
        <div className="row flex-lg-nowrap">
          <div className="col-12 col-lg-6 mb-4">
            <div className="card shadow-lg p-4 h-100">
              <h2 className="mb-3 text-primary">Add Student</h2>
              <form className="mb-3 d-flex" onSubmit={handleAddStudent}>
                <input
                  className="form-control me-2"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter student name"
                />
                <button className="btn btn-primary" type="submit">Add</button>
              </form>
              <h3 className="mb-2">Take Attendance</h3>
              <ul className="list-group mb-3">
                {students.map(student => (
                  <li key={student} className="list-group-item d-flex align-items-center justify-content-between">
                    <span>{student}</span>
                    <div>
                      {["Present", "Absent", "Given"].map(status => (
                        <button
                          key={status}
                          className={`btn btn-sm ms-1 ${attendance[student] === status ? 'btn-success' : 'btn-outline-secondary'}`}
                          onClick={() => handleAttendance(student, status)}
                          type="button"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              {students.length > 0 && (
                <button className="btn btn-success mb-3" onClick={handleComplete} disabled={Object.keys(attendance).length !== students.length}>
                  Complete Attendance
                </button>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
            {showChart && (
              <div className="card shadow-lg p-4 w-100">
                <h2 className="mb-4 text-success text-center">Attendance Summary</h2>
                <PieChart data={getPieData()} />
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="footer text-center py-3 mt-5">
        <div className="container">
          <span className="text-muted">&copy; {new Date().getFullYear()} Class Attendance App. Made with <span style={{color: '#e25555'}}>&hearts;</span> using MERN Stack.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
