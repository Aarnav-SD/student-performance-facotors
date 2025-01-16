import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewRecord = ({ data = [],  openCreateModal, fetchStudents }) => {
    const navigate = useNavigate();

    const handleDelete = async (studentId) => {
        try {
            const response = await fetch(`https://spp-xzzh.onrender.com/delete_record/${studentId}`, { method: "DELETE" });
            const data = await response.json();
            if (response.ok) {
                console.log("Record deleted:", data.message);
                fetchStudents(); 
            } else {
                console.error("Error deleting record:", data.message);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handleUpdate = (studentId) => {
        navigate(`/update_student_record/${studentId}`);
    };

    const handlePredict = async (studentId) => {
        try {
            const response = await fetch(`https://spp-xzzh.onrender.com/predict/${studentId}`, { method : 'GET' });
            const predictionData = await response.json();
            console.log('Prediction Data:', predictionData);
            openCreateModal(predictionData.prediction);
        } catch (error) {
            console.error('Network Error:', error);
        } 
    }
    console.log(data)
    return (
        <div>
            <div className='header-container'>
                <button className='go-back' onClick={() => navigate('/')}><span className='left-arrow'>&larr;</span></button>
                <h2 className='view-heading'>Student Records</h2>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Hours Studied</th>
                            <th>Attendance</th>
                            <th>Parental Involvement (High, Medium, Low)</th>
                            <th>Access to Resources (High, Medium, Low)</th>
                            <th>Extracurricular Activities (Yes, No)</th>
                            <th>Sleep Hours</th>
                            <th>Previous Scores</th>
                            <th>Motivation Level (High, Medium, Low)</th>
                            <th>Internet Access (Yes, No)</th>
                            <th>Tutoring Sessions</th>
                            <th>Family Income (High, Medium, Low)</th>
                            <th>Teacher Quality (High, Medium, Low)</th>
                            <th>Peer Influence (Positive, Neutral, Negative)</th>
                            <th>Physical Activity</th>
                            <th>Learning Disabilities (Yes, No)</th>
                            <th>Distance from Home (Far, Moderate, Near)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student) => (
                            <tr key={student.id}>
                                <td>{student.hoursStudied}</td>
                                <td>{student.attendance}</td>
                                <td>{student.parentalInvolvement}</td>
                                <td>{student.accessToResources}</td>
                                <td>{student.extracurricularActivities}</td>
                                <td>{student.sleepHours}</td>
                                <td>{student.previousScores}</td>
                                <td>{student.motivationLevel}</td>
                                <td>{student.internetAccess}</td>
                                <td>{student.tutoringSessions}</td>
                                <td>{student.familyIncome}</td>
                                <td>{student.teacherQuality}</td>
                                <td>{student.peerInfluence}</td>
                                <td>{student.physicalActivity}</td>
                                <td>{student.learningDisabilities}</td>
                                <td>{student.distanceFromHome}</td>
                                <td>
                                    <button className='update-button' onClick={() => handleUpdate(student.id)}>Update</button>
                                    <button className='delete-button' onClick={() => handleDelete(student.id)}>Delete</button>
                                    <button className='predict-button' onClick={() => handlePredict(student.id)}>Predict</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default ViewRecord