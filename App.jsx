import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './welcome';
import ViewRecord from './ViewRecord';
import CreateRecord from './CreateRecord';
import Predict from './Predict';
import UpdateRecord from './UpdateRecord';
import './App.css';
import './modal.css';
import './ViewRecord.css';
import './welcome.css';
import './CreateRecord.css';

function App() {
  const [students, setStudents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const fetchStudents = async () => {
    const response = await fetch("https://spp-xzzh.onrender.com/view");
    const data = await response.json();
    setStudents(data.students);
};

useEffect(() => {
    fetchStudents();
}, []);


  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  }

  const openCreateModal = (content) => {
    setModalContent(content); 
    setIsModalOpen(true);
  };


  return (
    <Router>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/create" element={<CreateRecord fetchStudents={fetchStudents} />} />
            <Route path="/view" element={<ViewRecord data={students} openCreateModal={openCreateModal} fetchStudents={fetchStudents} />} />
            <Route path="/update_student_record/:id" element={<UpdateRecord fetchStudents={fetchStudents} />} />
        </Routes>
        {isModalOpen && (
        <div className="Modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3 className="modal-title">Predicted Performance</h3>
              <div className="modal-body">
                <Predict data={modalContent} />
              </div>
              <div className="modal-footer">
                <button onClick={closeModal}>Close</button>
              </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App