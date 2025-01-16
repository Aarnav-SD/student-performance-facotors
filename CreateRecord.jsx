import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const CreateRecord = ({ fetchStudents }) => {
    const navigate = useNavigate(); 
    const [hoursStudied, setHoursStudied] = useState(0);
    const [attendance, setAttendance] = useState(0);
    const [parentalInvolvement, setParentalInvolvement] = useState('');
    const [accessToResources, setAccessToResources] = useState('');
    const [extracurricularActivities, setExtraActivities] = useState('');
    const [sleepHours, setSleepHours] = useState(0);
    const [previousScores, setPreviousScores] = useState(0);
    const [motivationLevel, setMotivationLevel] = useState('');
    const [internetAccess, setInternetAccess] = useState('');
    const [tutoringSessions, setTutoringSessions] = useState(0);
    const [familyIncome, setFamilyIncome] = useState('');
    const [teacherQuality, setTeacherQuality] = useState('');
    const [peerInfluence, setPeerInfluence] = useState('');
    const [physicalActivity, setPhysicalActivity] = useState(0);
    const [learningDisabilities, setLearningDisabilities] = useState('');
    const [distanceFromHome, setDistanceFromHome] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            hoursStudied,
            attendance,
            parentalInvolvement,
            accessToResources,
            extracurricularActivities,
            sleepHours,
            previousScores,
            motivationLevel,
            internetAccess,
            tutoringSessions,
            familyIncome,
            teacherQuality,
            peerInfluence,
            physicalActivity,
            learningDisabilities,
            distanceFromHome
        };

        const url = "https://spp-xzzh.onrender.com/create";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, options);
        if (response.status !== 200 && response.status !== 201) {
            const text = await response.json();
            alert(text.message);
        } else {
            console.log('Record created successfully');
            console.log(data);
            fetchStudents();  
            navigate('/')
        }

        
    };
    
    const oneStyle = {
        backgroundColor : 'rgba(255, 255, 255, 0.098)',
    }
    const twoStyle = {
        backgroundColor : 'rgba(255, 255, 255, 0.108)',
    }


  return (
    <form onSubmit={onSubmit}>
      <h2 className='form-header'>Create New Record</h2>
        <div className='form-group' style={oneStyle}>
            <label htmlFor='hoursStudied'>Hours Studied:</label>
            <input 
                type='number'
                id='hoursStudied' 
                value={hoursStudied} 
                onChange={(e) => setHoursStudied(parseFloat(e.target.value))}
            />
        </div>
        <div className='form-group' style={twoStyle}>
            <label htmlFor='attendance'>Attendance:</label>
            <input 
                type='number'
                id='attendance' 
                value={attendance} 
                onChange={(e) => setAttendance(parseFloat(e.target.value))}
            />
        </div>
        <div className='form-group'style={oneStyle}>
            <label htmlFor='parentalInvolvement'>Parental Involvement(High, Medium or Low):</label>
            <input 
                type='text'
                id='parentalInvolvement' 
                value={parentalInvolvement} 
                onChange={(e) => setParentalInvolvement(e.target.value)}
            />
        </div>
        <div className='form-group' style={twoStyle}>
            <label htmlFor='accessToResources'>Access To Resources(High, Medium or Low):</label>
            <input 
                type='text'
                id='accessToResources' 
                value={accessToResources} 
                onChange={(e) => setAccessToResources(e.target.value)}
            />
        </div>
        <div className='form-group' style={oneStyle}>
            <label htmlFor='extracurricularActivities'>Extracurricular Activities(Yes or No):</label>
            <input 
                type='text'
                id='extracurricularActivities' 
                value={extracurricularActivities} 
                onChange={(e) => setExtraActivities(e.target.value)}
            />
        </div>
        <div className='form-group' style={twoStyle}>
            <label htmlFor='sleepHours'>Sleep Hours:</label>
            <input 
                type='number'
                id='sleepHours' 
                value={sleepHours} 
                onChange={(e) => setSleepHours(parseFloat(e.target.value))}
            />
        </div>
        <div className='form-group' style={oneStyle}>
            <label htmlFor='previousScores'>Previous Scores:</label>
            <input 
                type='number'
                id='previousScores' 
                value={previousScores} 
                onChange={(e) => setPreviousScores(parseFloat(e.target.value))}
            />
        </div>
        <div className='form-group' style={twoStyle}>
            <label htmlFor='motivationLevel'>Motivation Level(High, Medium or Low):</label>
            <input 
                type='text'
                id='motivationLevel' 
                value={motivationLevel} 
                onChange={(e) => setMotivationLevel(e.target.value)}
            />
        </div>
        <div className='form-group' style={oneStyle}>
            <label htmlFor='internetAccess'>Internet Access(Yes or No):</label>
            <input 
                type='text'
                id='internetAccess' 
                value={internetAccess} 
                onChange={(e) => setInternetAccess(e.target.value)}
            />
        </div>
        <div className='form-group' style={twoStyle}>
            <label htmlFor='tutoringSessions'>Tutoring Sessions:</label>
            <input 
                type='number'
                id='tutoringSessions' 
                value={tutoringSessions} 
                onChange={(e) => setTutoringSessions(parseFloat(e.target.value))}
            />
        </div>
        <div className='form-group' style={oneStyle}>
            <label htmlFor='familyIncome'>Family Income(High, Medium or Low):</label>
            <input 
                type='text'
                id='familyIncome' 
                value={familyIncome} 
                onChange={(e) => setFamilyIncome(e.target.value)}
            />
        </div>
        <div className='form-group' style={twoStyle}>
            <label htmlFor='teacherQuality'>Teacher Quality(High, Medium or Low):</label>
            <input 
                type='text'
                id='teacherQuality' 
                value={teacherQuality} 
                onChange={(e) => setTeacherQuality(e.target.value)}
            />
        </div>
        <div className='form-group' style={oneStyle}>
            <label htmlFor='peerInfluence'>Peer Influence(Positive, Neutral or Negative):</label>
            <input 
                type='text'
                id='peerInfluence' 
                value={peerInfluence} 
                onChange={(e) => setPeerInfluence(e.target.value)}
            />
        </div>
        <div className='form-group' style={twoStyle}>
            <label htmlFor='physicalActivity'>Physical Activity:</label>
            <input 
                type='number'
                id='physicalActivity' 
                value={physicalActivity} 
                onChange={(e) => setPhysicalActivity(parseFloat(e.target.value))}
            />
        </div>
        <div className='form-group' style={oneStyle}>
            <label htmlFor='learningDisabilities'>Learning Disabilities(Yes or No):</label>
            <input 
                type='text'
                id='learningDisabilities' 
                value={learningDisabilities} 
                onChange={(e) => setLearningDisabilities(e.target.value)}
            />
        </div>
        <div className='form-group' style={twoStyle}>
            <label htmlFor='distanceFromHome'>Distance From Home(Far, Moderate, Near):</label>
            <input 
                type='text'
                id='distanceFromHome' 
                value={distanceFromHome} 
                onChange={(e) => setDistanceFromHome(e.target.value)}
            />
        </div>
      <button type='submit' className='submit-button'>Submit</button> <button onClick={() => navigate('/')} className='back-button'>Back</button>
    </form>
  );
};

export default CreateRecord;