import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './CreateRecord.css';

const UpdateRecord = ({ fetchStudents }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    hoursStudied: "",
    attendance: "",
    parentalInvolvement: "",
    accessToResources: "",
    extracurricularActivities: "",
    sleepHours: "",
    previousScores: "",
    motivationLevel: "",
    internetAccess: "",
    tutoringSessions: "",
    familyIncome: "",
    teacherQuality: "",
    peerInfluence: "",
    physicalActivity: "",
    learningDisabilities: "",
    distanceFromHome: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`https://spp-xzzh.onrender.com/view_record/${id}`);
        const data = await response.json();
        setFormData(data.student); // Ensure `data.student` contains the object with matching keys
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData((prev) => ({ ...prev, [name]: value })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://spp-xzzh.onrender.com/update_student_record/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Record updated:", result.message);
        fetchStudents();
        navigate("/view");
      } else {
        console.error("Error updating record:", result.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const oneStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.098)',
  };
  const twoStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.108)',
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='form-header'>Update Record</h2>
      {Object.keys(formData).map((field, index) => (
        <div
          key={field}
          className='form-group'
          style={index % 2 === 0 ? oneStyle : twoStyle}
        >
          <label htmlFor={field}>
            {field.replace(/([A-Z])/g, ' $1')}: 
          </label>
          <input
            type={typeof formData[field] === "number" ? "number" : "text"}
            id={field}
            name={field} 
            value={formData[field] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit" className="submit-button">Update</button>
      <button onClick={() => navigate('/')} className='back-button'>Back</button>
    </form>
  );
};

export default UpdateRecord;
