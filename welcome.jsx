import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <div className='body'>
      <div className='welcome-container'>
        <h2 className='welcome-header'>Welcome!</h2>
        <div className='button-div'>
          <button className='create-button'onClick={() => handleNavigation('/create')}>Create New Record</button>
          <button className='view-button' onClick={() => handleNavigation('/view')}>View Record</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;